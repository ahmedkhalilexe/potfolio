---
title: "Inovask CLI & Schema-Driven Architecture"
tagline: "Developer Tooling & Zero-Code Schema UI Pipeline"
role: "Software Engineer (CLI & Core Architecture)"
period: "Oct 2025 – Present"
status: "Production"
featured: true
order: 2
tags: ["Node.js", "React.js", "Docker", "Docker Compose", "Cypress", "TypeScript", "CLI", "System Architecture"]
metrics:
  - "Test pass rate: 50% → 100%"
  - "Codebase refactored: ~40%"
  - "0 hardcoded UI components"
  - "Full multi-tenant container orchestration"
architectureType: "Schema-Driven Compiler & CLI Generator"
---

# Inovask: CLI Tooling & Schema-Driven Generated Frontend

> **TL;DR**: Orchestrated the developer tooling CLI and architected a two-phase schema-driven rendering engine where tenant web applications are dynamically generated from configuration schemas with zero custom UI coding, alongside lifting automated test reliability to 100%.

---

## 1. The Challenge

In multi-tenant SaaS platforms, onboarding new enterprise tenants often forces teams into one of two anti-patterns:
1. **Fork-and-Modify**: Each tenant gets a cloned UI repository, rapidly drifting into maintenance hell and breaking shared upgrades.
2. **Monolithic Spaghetti**: Giant conditional statements (`if (tenant === 'Acme') { ... }`) scattered throughout the client bundle, bloating bundle sizes and leaking intellectual property.

Inovask needed a platform where:
- A developer can run a single CLI command to scaffold an entire isolated environment (frontend, backend, database containers).
- The frontend dynamically builds itself entirely from a tenant's schema—tables, inputs, forms, and localization—with **zero hardcoded markup or copy**.

---

## 2. Two-Phase Schema Pipeline Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TWO-PHASE DYNAMIC UI RENDERING PIPELINE                  │
└─────────────────────────────────────────────────────────────────────────────┘

  Tenant Configuration Schema (YAML / JSON)
  ├── schemas/models.json
  ├── schemas/inputs.json
  ├── schemas/tables.json
  └── locales/{lang}.json
            │
            │ Ingested via CLI / Runtime Provider
            ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                        PHASE 1: RESOLUTION & LOAD                       │
  │                                                                         │
  │  1. Resolve Dependency Graph: Validate referenced models & foreign keys │
  │  2. Compute Field Permissions: Role-based field masking & validation    │
  │  3. Compile Form State Tree: Map input schemas to typed form state      │
  │  4. Interpolate Locales: Deep-link dictionary tokens to UI slots        │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │
                                       │ Emits Normalized Blueprint AST
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                         PHASE 2: RENDER & MOUNT                         │
  │                                                                         │
  │  ┌───────────────────────┐  ┌──────────────────────┐  ┌──────────────┐  │
  │  │ Component Registry    │  │ Table Grid Engine    │  │ Modal Bridge │  │
  │  │  - Input Adapters     │  │  - Virtualized Rows  │  │  - Dynamic   │  │
  │  │  - Validation Rules   │  │  - Column Projection │  │    Workflows │  │
  │  └───────────┬───────────┘  └──────────┬───────────┘  └──────┬───────┘  │
  │              │                         │                     │          │
  │              └─────────────────────────┴─────────────────────┘          │
  │                                        │                                │
  │                                        ▼                                │
  │                 React Virtual DOM (100% Config-Driven)                  │
  │                 [ Zero Hardcoded Copy / Zero UI Drift ]                 │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. CLI Orchestration Engine

I owned the platform's developer CLI from the ground up:
- **Command Syntax & Scaffolding**: Built high-speed CLI subcommands (`inovask init`, `inovask scaffold`, `inovask env:up`).
- **Template Generation**: Synthesizes environment configurations, Docker Compose definitions, and proxy routing rules on the fly.
- **Docker Compose Orchestration**: Bootstraps PostgreSQL, Redis, backend microservices, and client frontends into an isolated network per tenant in seconds.

```text
$ inovask tenant:bootstrap --tenant=tenant-beta --with-db

[✔] Validating schema definitions... OK
[✔] Resolving dynamic table mappings (14 entities found)... OK
[✔] Generating Docker Compose network: inovask_tenant_beta... OK
[✔] Starting container services:
    ├── db-postgres-12        [healthy]
    ├── redis-cache           [healthy]
    ├── core-api-gateway      [running: :8080]
    └── generated-web-client  [running: :3000]

→ Tenant application ready at: http://tenant-beta.local:3000
```

---

## 4. Engineering Impact & Testing Renaissance

### Raising Cypress E2E Pass Rate from ~50% to 100%
Prior to the overhaul, flakiness in end-to-end testing resulted in ignored test suites and frequent regression escapes:
- **Race Condition Remediation**: Replaced arbitrary `cy.wait(3000)` timeouts with network route interceptors (`cy.intercept()`) and deterministic state hooks.
- **Dual-Token Authentication Pipeline**: Implemented and tested an architecture balancing secure HTTP-only cookies with in-memory token refreshes, safeguarding against XSS and session hijacking.
- **40% Codebase Restructure**: Modularized legacy monolithic components into single-responsibility modules, cutting technical debt and increasing release confidence across releases.
