# Dependency Security Policy

Status: Draft baseline for Factory 1.0

## Purpose

Control third-party packages and reduce supply-chain risk.

## Rules

- Prefer established packages with active maintenance.
- Avoid unnecessary dependencies.
- Review packages that touch auth, payments, files, AI, secrets, data, or deployment.
- Run vulnerability scans before release.
- Record major dependency decisions in the evidence record or ADR.

## Blockers

- Unknown package required for critical security path.
- Package with unresolved critical vulnerability.
- Package requiring suspicious install scripts without review.
