# Tool Registry

Status: Draft baseline for Factory 1.0

## Purpose

This registry controls which tools Factory may use and why.

## Status Values

- Approved Now: allowed for Factory 1.0 work.
- Approved Later: useful, but not needed yet.
- Optional: available for experiments only.
- Rejected For Now: do not use without a new decision.

## Approved Now

| Tool | Purpose | Owner Function | Risk Control |
| --- | --- | --- | --- |
| Codex | Primary coding and Factory setup partner | Factory owner | Must cite files and changes. |
| Claude Code | Secondary coding/review partner | Factory owner | Use for review or alternate implementation only. |
| Git | Version control | Engineering | No destructive commands without approval. |
| GitHub CLI | GitHub auth, repos, PRs, issues | Engineering | Human approves push/PR decisions. |
| Node/npm/pnpm | Web app development runtime | Engineering | Dependencies require review. |
| uv | Python tooling | Engineering | Project-local use preferred. |
| OrbStack/Docker | Local services and databases | Platform | No production secrets in local containers. |
| Trivy | Vulnerability, secret, config, and dependency scanning | Security | Findings reviewed before release. |
| Gitleaks | Secret scanning | Security | Blocks leaked credentials. |
| pre-commit | Local pre-commit checks | Engineering | Hooks must not hide or rewrite logic silently. |
| actionlint | GitHub Actions linting | DevOps | Used when CI files exist. |
| markdownlint-cli2 | Markdown quality checks | Documentation | Advisory unless release docs require it. |
| lychee | Link checking | Documentation | Used when docs contain external links. |

## Optional

| Tool | Purpose | Decision |
| --- | --- | --- |
| Ollama | Local/private model experiments | Optional scratch assistant only. |
| Promptfoo | AI prompt/eval testing | Use when Factory builds AI prompts/features. |

## Rejected For Now

| Tool Type | Reason |
| --- | --- |
| Extra agent frameworks | Adds complexity before Factory baseline exists. |
| Large local models | Not suitable for current 24GB memory workflow. |
| Extra coding agents | Codex and Claude Code are enough for Factory 1.0. |

## Tool Decision Rule

No new tool may be added unless it records purpose, need-now/later status, owner, risk, alternative, and decision.
