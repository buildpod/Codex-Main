# Secrets Policy

Status: Draft baseline for Factory 1.0

## Purpose

Prevent API keys, tokens, credentials, and private customer data from leaking into code, logs, prompts, screenshots, or repositories.

## Rules

- Never paste secrets into AI chats.
- Never commit `.env` files.
- Use `.env.example` for placeholder names only.
- Store real secrets in approved local or cloud secret managers.
- Run secret scanning before commits and releases.
- Rotate any secret that appears in chat, logs, Git history, screenshots, or public files.

## Secret Examples

- API keys
- Database passwords
- OAuth client secrets
- Service-role keys
- Private SSH keys
- Production tokens
