# Backup And Recovery Policy

Status: Draft baseline for Factory 1.0

## Purpose

Protect Factory knowledge, product work, and evidence from accidental loss.

## Rules

- Keep controlled Factory files under `~/BuildPod`.
- Use Git repositories for important Factory/product work.
- Keep exports and old drafts in `archive/`.
- Do not rely on Downloads or Desktop for controlled files.
- Back up repositories before major restructuring.

## Recovery Events

- Deleted file.
- Broken repo.
- Leaked secret.
- Failed tool install.
- Corrupted local database.
