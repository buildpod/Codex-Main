# Git And GitHub Policy

Status: Draft baseline for Factory 1.0

## Purpose

Define safe Git and GitHub usage for Factory and product work.

## Rules

- Use Git for controlled Factory and product work.
- Commit small, understandable changes.
- Do not push secrets, `.env`, generated credentials, or private customer data.
- Use branches for product work.
- Human owner approves public repos, pushes, releases, and PR creation.

## Default Workflow

1. Check status and diff.
2. Run relevant tests/checks.
3. Stage only intended files.
4. Commit with a clear message.
5. Push branch after human approval.
6. Create pull request after human approval.
7. Merge only after review, checks, and human approval.

## Branching

- Factory branches should use `codex/` by default.
- Product branches should include the product or ticket name.
- Do not mix unrelated Factory and product changes in one branch.

## Push And Pull Request Rules

- Codex may prepare commits and PR text when requested.
- Codex may push only after explicit human approval.
- Codex may create PRs only after explicit human approval.
- PRs must summarize scope, tests/checks, risks, and evidence.
- Production release PRs must link release gate evidence.

## Deployment Rules

- Preview/staging deployments require explicit human approval.
- Production deployments require release gates and explicit human approval.
- Deployment commands must not expose secrets in logs.
- Failed deployments must create an evidence or incident note.

## Forbidden Without Explicit Approval

- `git reset --hard`
- Force push
- Deleting branches
- Making repositories public
- Publishing packages
- Deploying production
- Changing GitHub secrets
- Changing billing, domain, or organization settings
