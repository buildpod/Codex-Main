# Permissions And Access Policy

Status: Draft baseline for Factory 1.0

## Purpose

This policy defines what tools and agents may do on the local machine, in
GitHub, and in deployment environments.

## Human Approval Required

- Installing new tools.
- Deleting files or folders.
- Running destructive Git commands.
- Pushing to remote repositories.
- Creating pull requests.
- Creating public repositories.
- Triggering preview, staging, or production deployments.
- Accessing or changing secrets.
- Making high-impact architecture, security, data, or release decisions.

## Standing Permission

Codex may prepare GitHub and deployment work when requested. This includes
checking status, creating local branches, editing files, running tests, preparing
commits, drafting pull request text, and preparing deployment commands.

Codex may not complete high-impact external actions until the human owner
approves the specific action.

## Codex

Allowed:

- Read Factory and product files when needed.
- Create and edit Factory files after approval or clear user request.
- Run local checks and tests.
- Prepare commits, pull requests, and deployment steps when requested.

Not allowed without approval:

- Delete files.
- Push code.
- Create pull requests.
- Deploy preview/staging/production.
- Use secrets.
- Add new tools.
- Make repositories public.
- Force push or rewrite shared history.

## Claude Code

Allowed:

- Assist with implementation and review in approved repositories.

Not allowed without approval:

- Make final release/security decisions.
- Push/deploy.
- Use secrets.

## GitHub And Deployment Boundary

| Action | Codex May Prepare | Codex May Execute After Approval |
| --- | --- | --- |
| Git status/diff/log | Yes | Yes |
| Create local branch | Yes | Yes |
| Stage files | Yes | Yes, after requested scope is clear |
| Commit | Yes | Yes, after requested scope is clear |
| Push branch | Yes | Yes, after explicit approval |
| Create pull request | Yes | Yes, after explicit approval |
| Merge pull request | Yes | Yes, after explicit approval |
| Preview deployment | Yes | Yes, after explicit approval |
| Staging deployment | Yes | Yes, after explicit approval |
| Production deployment | Yes | Yes, after release gates and approval |
| Force push | No | Only with explicit emergency approval |
| Delete repo/branch | No | Only with explicit approval |
| Make repo public | No | Only with explicit approval |

## Local Tools

Security scanners, linters, and test tools may run locally. Their output is
evidence, not final approval.
