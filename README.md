# n8n-nodes-monitorix360

[n8n](https://n8n.io/) community nodes for **Monitorix360** — manage teams, websites, servers, reports, SLA, usage, and notifications via the Monitorix integration API (same style of credentials as the Monitorix360 Zapier app).

[Installation](#installation) · [Nodes](#nodes) · [Credentials](#credentials) · [Development](#development) · [Publishing](#publish-to-npm) · [License](#license)

## Installation

Install as a [community node](https://docs.n8n.io/integrations/community-nodes/installation/) from npm:

- Package name: `@admin_programini/n8n-nodes-monitorix360`

In the n8n UI: **Settings → Community nodes → Install** and enter the package name, or follow the CLI/docker instructions in the n8n docs for your deployment.

## Nodes

This package includes one community node:

| Node | Purpose |
| ---- | ------- |
| **Monitorix 360** | Full integration API — teams, websites, servers, reports, SLA, alerts, webhooks, monitored-task heartbeat pings, and more. |

## Credentials

### Monitorix360 Integration API

Used when **Resource** is anything other than **Ping**.

| Field | Description |
| ----- | ----------- |
| **Base URL** | Root URL of your Monitorix API instance (no trailing slash). |
| **API Key** | Integration API key; sent as `Authorization: Monitorix-Integration {key}`. |

Use **Test** to call `GET /users/profile` and verify the key and URL.

### Monitorix360 Ping API

Used when **Resource** is **Ping**.

| Field | Description |
| ----- | ----------- |
| **Base URL** | Root URL of your Monitorix API instance (no trailing slash). |
| **Ping Secret** | Optional value sent as `X-Monitorix-Ping-Secret` when the monitored task requires ping authentication. |

## Operations

Configure **Resource** and **Operation** in the node panel. Available resources:

- **Alert** — list and manage alerts
- **Expiring Secret** — list expiring secrets
- **Monitored Task** — list monitored tasks
- **Notification** — list notifications
- **Ping** — heartbeat pings for monitored tasks (`start`, `success`, `fail`)
- **Server** — CRUD and list servers
- **Server Report** — generate and download server reports (PDF)
- **Server SLA** — SLA configurations and breach reports
- **Server Usage** — server usage metrics
- **Team** — list teams
- **Team Task** — list team tasks
- **User Preference** — read user preferences
- **Webhook** — list and manage webhooks
- **Website** — CRUD and list websites
- **Website Report** — generate and download website reports (PDF)
- **Website SLA** — SLA configurations and breach reports

Many list operations support **Gridify**-style query parameters (filter, sort, page) when enabled on the operation.

### Ping resource

Send heartbeat pings for a monitored task using its **Ping Token**:

| Operation | Endpoint |
| --------- | -------- |
| **Start** | `POST` or `GET` `/ping/{token}/start` |
| **Success** | `POST` or `GET` `/ping/{token}/success` |
| **Fail** | `POST` or `GET` `/ping/{token}/fail` |

`POST` is recommended. You can optionally attach a JSON object or array body (max 4 KB) on `POST` requests.

## Migration from 0.1.2

The standalone **Monitorix 360 Ping** node was removed in 0.1.3 to comply with n8n's one-regular-node-per-package rule. Update existing workflows to use **Monitorix 360** with **Resource** set to **Ping** and the same operation and parameters as before.

## Compatibility

- Intended for current n8n community node requirements (`n8nNodesApiVersion` 1).
- Requires a running Monitorix Web API that supports the integration endpoints used by this package.

## Development

Prerequisites: Node.js (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Other scripts:

| Script           | Description        |
| ---------------- | ------------------ |
| `npm run build`  | Production build to `dist/` |
| `npm run lint`   | Lint               |
| `npm run lint:fix` | Lint with fixes  |
| `npm run release` | Version bump, tag, push (triggers publish workflow) |

## Publish to npm

Publishing runs from [`.github/workflows/publish.yml`](.github/workflows/publish.yml) on version tags, with npm provenance (required for n8n community nodes from May 1, 2026).

### One-time setup

In [npmjs.com](https://www.npmjs.com) package settings → **Publish access → Trusted Publishers**, add:

- **Repository owner**: `vmagprogramini` (or your GitHub user/org)
- **Repository name**: `n8n-nodes-monitorix360`
- **Workflow name**: `publish.yml`

You can omit `NPM_TOKEN` if you use trusted publishing (OIDC). Alternatively, set an npm granular token as the `NPM_TOKEN` repository secret; see comments in `publish.yml`.

### Release

```bash
npm run release
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [This repository](https://github.com/vmagprogramini/n8n-nodes-monitorix360)

## License

[MIT](LICENSE.md)
