---
title: "Notiq"
tagline: "High-Throughput Multi-Tenant Notification Engine"
role: "Creator & Full Stack Systems Engineer"
period: "In Progress"
status: "In Progress"
featured: true
order: 1
tags: ["Bun", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL", "Knex", "Docker Compose", "Clean Architecture", "DDD"]
metrics:
  - "Target: Sub-5s delivery SLA"
  - "Target: 99.9% uptime reliability"
  - "Decoupled async worker pool"
  - "Per-tenant strict rate limiting"
architectureType: "Event-Driven Distributed Worker System"
---

# Notiq: Multi-Tenant Notification Engine

> **TL;DR**: An event-driven, multi-tenant notification infrastructure engineered to decouple synchronous tenant ingestion from asynchronous multi-channel delivery (Email, In-App, SMS) using RabbitMQ, Redis, and Bun.

---

## 1. The Engineering Problem

Modern SaaS platforms require multi-channel notifications (transactional emails, push alerts, in-app notifications, and SMS). When notification delivery is coupled with HTTP request/response lifecycles, two major failures happen:
1. **Network Cascades & Latency**: External gateway outages (SendGrid, Twilio, APNs) stall application threads and cause cascading timeouts.
2. **No Tenant Isolation**: A single tenant blasting marketing emails can saturate worker threads, starving critical transactional alerts (e.g. password resets) of other tenants.

**Notiq was designed to solve this with:**
- Strict **asynchronous decoupling** via AMQP message brokers.
- **Multi-tenant data isolation** and template inheritance.
- **Dead-letter queuing (DLQ)** with exponential backoff retry policies.
- Per-tenant token-bucket **rate limiting** backed by Redis.

---

## 2. High-Level System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             SYSTEM TOPOLOGY                                 │
└─────────────────────────────────────────────────────────────────────────────┘

  [Tenant Applications]
           │
           │ HTTP POST /v1/notifications (Bearer Token / API Key)
           ▼
  ┌─────────────────────────────────────────────────────────┐
  │                 Ingestion Gateway (Bun)                 │
  │   - Tenant Auth & Scope Validation                      │
  │   - Payload Schema Validation (Zod)                     │
  │   - Redis Rate Limiter (Token Bucket per Tenant)        │
  └────────────────────────┬────────────────────────────────┘
                           │
                           │ AMQP Publish (Exchange: notiq.events.direct)
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │                   RabbitMQ Message Broker               │
  │                                                         │
  │  ┌───────────────┐  ┌───────────────┐  ┌─────────────┐  │
  │  │ queue.email   │  │ queue.inapp   │  │ queue.sms   │  │
  │  └───────┬───────┘  └───────┬───────┘  └──────┬──────┘  │
  │          │                  │                 │         │
  │   [x-dead-letter-exchange: notiq.dlx]         │         │
  └──────────┼──────────────────┼─────────────────┼─────────┘
             │                  │                 │
             ▼                  ▼                 ▼
     ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
     │ Email Worker │   │ InApp Worker │   │  SMS Worker  │
     │  (Consumer)  │   │  (Consumer)  │   │  (Consumer)  │
     └───────┬──────┘   └───────┬──────┘   └──────┬───────┘
             │                  │                 │
             ├──────────────────┴─────────────────┤
             ▼                                    ▼
  ┌───────────────────────┐            ┌────────────────────┐
  │ PostgreSQL (Storage)  │            │ External Gateways  │
  │ - Delivery Logs       │            │ - SES / SendGrid   │
  │ - Multi-Tenant Schemas│            │ - WebSockets       │
  │ - Versioned Templates │            │ - Twilio / SMS     │
  └───────────────────────┘            └────────────────────┘
```

---

## 3. Core Architectural Decisions

### A. Domain-Driven Design (DDD) & Clean Architecture
The codebase strictly adheres to Hexagonal / Clean Architecture boundaries:
- **Domain Layer**: Core business entities (`Notification`, `Tenant`, `ChannelPreference`, `TemplateVersion`). Zero dependencies on frameworks or libraries.
- **Application Layer**: Use-cases (`DispatchNotification`, `RegisterSubscriberPreferences`, `RenderTemplate`).
- **Infrastructure Layer**: Knex PostgreSQL adapters, RabbitMQ connection pools, Redis cache managers, and 3rd-party provider implementations.

### B. Two-Tier Data Isolation
Each tenant shares the primary database cluster, but queries enforce strict tenancy boundaries via:
1. `tenant_id` foreign keys indexed with composite B-trees (`tenant_id, created_at DESC`).
2. Row-level filtering at the repository layer, preventing data leakage across organizational tenants.

### C. Queue Topology & Failure Resilience
```text
           ┌──────────────────────┐
           │   Incoming Event     │
           └──────────┬───────────┘
                      ▼
           ┌──────────────────────┐
    ┌─────►│  Worker Execution    │
    │      └──────────┬───────────┘
    │                 │
    │         Success?│
    │        ┌────────┴────────┐
    │        ▼                 ▼
    │      [YES]              [NO]
    │        │                 │
    │   Ack Message       Retry Count < Max?
    │        │            ┌────┴────┐
    │   Save Log:         ▼         ▼
    │   "DELIVERED"     [YES]      [NO]
    │                     │         │
    │                Nack & Sleep   Publish to DLQ
    └────────────────(Exp Backoff)  (Dead Letter Queue)
                                    Alert Ops & Persist Status: "FAILED"
```

---

## 4. Key Engineering Implementation

### Dead Letter Handling & Retry Policy
```typescript
export async function handleDeliveryFailure(
  channel: Channel,
  msg: Message,
  err: Error,
  maxRetries = 3
) {
  const headers = msg.properties.headers || {};
  const currentRetries = (headers['x-retry-count'] as number) || 0;

  if (currentRetries < maxRetries) {
    const nextRetry = currentRetries + 1;
    const backoffDelayMs = Math.pow(2, nextRetry) * 1000;

    console.warn(`[Retry #${nextRetry}] Backoff: ${backoffDelayMs}ms for ID ${msg.properties.messageId}`);

    // Re-publish to retry exchange with delay
    channel.publish(
      'notiq.retry.exchange',
      msg.fields.routingKey,
      msg.content,
      {
        ...msg.properties,
        headers: { ...headers, 'x-retry-count': nextRetry }
      }
    );
    channel.ack(msg);
  } else {
    // Escalate to DLQ for forensic inspection
    channel.sendToQueue('notiq.dlq.permanent_failures', msg.content, {
      ...msg.properties,
      headers: { ...headers, 'x-failure-reason': err.message }
    });
    channel.ack(msg);
  }
}
```

---

## 5. Roadmap & Performance Milestones
- [x] Ingestion API scaffolded on **Bun + TypeScript** with sub-10ms response times.
- [x] RabbitMQ exchange topology and per-channel consumer workers.
- [x] PostgreSQL relational schema for tenant subscriptions and template versioning.
- [ ] Dead-letter automated alerting via Prometheus/Grafana metrics.
- [ ] Real-time websocket delivery stream for In-App subscriber notifications.
