# Default Architecture

Status: Draft baseline for Factory 1.0

## Purpose

Define the default architecture Factory should use unless a product charter approves a different path.

## Default Stack

| Layer | Default |
| --- | --- |
| Web app | Next.js, TypeScript |
| Mobile app | Expo/React Native when needed |
| Styling/UI | Product-specific design system, accessible components |
| Database | Postgres |
| Local services | OrbStack/Docker |
| Auth | Product-specific approved provider or module |
| Payments | Stripe when direct SaaS billing is needed |
| Tests | Unit, integration, Playwright/E2E where relevant |
| CI | GitHub Actions |
| Deployment | Product-specific, approved before release |

## Architecture Principles

- Keep domain logic separate from UI and infrastructure.
- Do not let UI talk directly to persistence when a service/API boundary is required.
- Use tenant/workspace isolation for multi-tenant products.
- Keep imports behind adapters.
- Use explicit data contracts for APIs/imports/exports.
- Record important architecture decisions.

## Rule

Deviation from the default architecture requires an architecture decision record.
