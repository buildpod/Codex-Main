# BuildPodFactory

BuildPodFactory is the private Factory workspace for creating future products. It is not the product being sold.

## Current Apps

- `Jarvis`: Factory command UI and agent status dashboard.
- `PlayPatch Kids`: Product 001, a paid-app-shaped kids activity app prototype.

## Run Locally

```bash
pnpm jarvis
```

Open `http://localhost:4173`.

```bash
pnpm playpatch
```

Open `http://localhost:4273`.

## Checks

```bash
pnpm jarvis:check
pnpm jarvis:smoke
pnpm playpatch:check
pnpm playpatch:smoke
```

## Factory Rule

The Factory helps build and govern products. Products should pass market, security, evidence, and release gates before deployment.
