# Data Classification

Status: Draft baseline for Factory 1.0

## Purpose

Classify data so Factory knows what can be shared with tools, models, repositories, and humans.

## Classes

| Class | Meaning | AI/Tool Handling |
| --- | --- | --- |
| Public | Safe to publish | May be used in tools. |
| Internal | BuildPod internal only | Use with approved tools. |
| Confidential | Business-sensitive | Minimize sharing; avoid unnecessary cloud use. |
| Personal | Identifies a person | Requires privacy review. |
| Regulated | GxP, legal, financial, health, or customer-controlled records | Requires explicit approval and evidence controls. |

## Rule

Unknown data is treated as Confidential until classified.
