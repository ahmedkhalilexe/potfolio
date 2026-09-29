---
title: "ISO Voyage: Full-Stack Platform Modernization"
tagline: "Rapid Legacy Refactoring & Real-Time B2B Messaging Engine"
role: "Full Stack Developer (Freelance Contract)"
period: "Jun 2025 – Jan 2026"
status: "Completed"
featured: false
order: 4
tags: ["Next.js", "React.js", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Docker", "Redis", "Git"]
metrics:
  - "+50% Feature delivery acceleration"
  - "~50% Frontend codebase rebuilt"
  - "~30% Improvement in user flow completion"
  - "Zero-downtime contract handover"
architectureType: "Modernized Monolith & Caching Layer"
---

# ISO Voyage: Modernization & B2B Communication System

> **TL;DR**: Stepped into an in-flight client engagement, rescued velocity by rebuilding one frontend application from scratch, refactored 50% of the codebase, and engineered high-reliability B2B in-app communication flows.

---

## 1. Context & The Rescue Mission

ISO Voyage is a travel and booking infrastructure provider. When I joined the team 3 months into their contract, feature velocity had stalled due to mounting technical debt, brittle state management, and tightly coupled frontend code.

### Priorities:
1. Re-architect one of the two core frontend client applications from scratch.
2. Refactor existing spaghetti logic across React/Next.js and Express + Prisma backend.
3. Accelerate remaining deliverables to hit contract handover on schedule.

---

## 2. Technical Interventions

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                      REFACTORED APPLICATION TOPOLOGY                         │
└─────────────────────────────────────────────────────────────────────────────┘

  [Web Clients / Next.js]
  ├── Customer Booking Portal (Modernized)
  └── B2B Partner Admin Dashboard (Rebuilt from scratch)
            │
            │ RESTful Endpoints / Session Auth
            ▼
  ┌─────────────────────────────────────────────────────────┐
  │                 Express.js Core Service                 │
  │   - Modular Controller-Service Split                    │
  │   - Request Validation Pipeline                         │
  │   - Redis Caching Layer for Frequent Route Lookups      │
  └────────────────────────┬────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
  ┌───────────────────┐         ┌────────────────────┐
  │  Redis Cache      │         │ PostgreSQL / Prisma│
  │  - Session store  │         │ - Relational Data  │
  │  - Rate limiting  │         │ - Migrations & ACID│
  └───────────────────┘         └────────────────────┘
```

---

## 3. Key Achievements

- **50% Velocity Jump**: Standardized reusable UI primitives and custom data hooks, allowing the team to ship features in half the time previously required.
- **B2B In-App Messaging**: Engineered resilient communication flows between corporate clients and dispatchers, reducing customer support drop-offs by ~30%.
- **Redis Query Acceleration**: Introduced a caching strategy for static lookup entities (destinations, partner catalogs), eliminating redundant database hits.
- **Clean Handover**: Authored thorough technical documentation, Dockerized local developer environments, and handed off the platform cleanly to the internal engineering team.
