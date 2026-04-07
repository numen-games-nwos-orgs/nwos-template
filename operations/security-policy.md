# Security Policy

## Classification Levels

| Level | Description | Who can access |
| --- | --- | --- |
| Public | Open information | Anyone |
| Internal | Company-wide | All agents and oracles |
| Confidential | Restricted | Named individuals only |

## Rules

1. Never commit credentials, API keys, or secrets to this repository.
2. Sensitive data goes in the designated secrets manager, never in git.
3. All agent actions are logged and auditable via git history.
4. Canon documents cannot be modified without a formal ADR in `decisions/`.

## Incident Response

If an agent detects a security issue:
1. Stop current operation
2. Document the issue in `reports/`
3. Notify the Oracle immediately
4. Do not attempt to fix without authorization
