# Check Commands

Status: Draft baseline for Factory 1.0

## Purpose

Record standard local checks. Product repos may add their own commands.

## Tool Checks

```bash
node --version
npm --version
pnpm --version
git --version
gh --version
uv --version
claude --version
docker --version
ollama --version
trivy --version
gitleaks version
pre-commit --version
actionlint --version
markdownlint-cli2 --version
lychee --version
```

## Repo Checks

```bash
gitleaks detect --source .
trivy fs .
markdownlint-cli2 "**/*.md"
```

## Factory Dry Run

```bash
pnpm factory:dry-run
pnpm factory:dry-run:blocker
```

## Project Jarvis

```bash
pnpm jarvis
```

## Rule

Do not treat passing tools as product acceptance. They are supporting evidence only.
