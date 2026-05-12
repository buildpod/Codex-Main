# Security Baseline

Status: Draft baseline for Factory 1.0

## Purpose

Define minimum security expectations for Factory-created products.

## Product Baseline

- Authentication for non-public apps.
- Role/permission model for sensitive actions.
- Tenant/workspace isolation for multi-tenant products.
- No secrets in frontend code.
- Audit or evidence events for sensitive mutations.
- Dependency and vulnerability scan before release.
- Input validation on imports, forms, APIs, and file uploads.
- Secure defaults for local, development, staging, and production.

## Release Blockers

- Known critical vulnerability without documented acceptance.
- Exposed secret.
- Cross-tenant data access risk.
- Missing approval for security-sensitive changes.
