# Product Security Checklist

Status: Draft baseline for Factory 1.0

## Purpose

Provide a product-level security checklist before release.

## Checklist

- [ ] Data classified.
- [ ] Secrets stored outside source code.
- [ ] `.env.example` contains placeholders only.
- [ ] Auth required where needed.
- [ ] Roles/permissions reviewed.
- [ ] Tenant/workspace isolation reviewed where applicable.
- [ ] User input validated.
- [ ] File uploads/imports validated where applicable.
- [ ] Dependency scan reviewed.
- [ ] Secret scan reviewed.
- [ ] Security-sensitive mutations audited where applicable.
- [ ] Critical findings resolved or accepted by human owner.
