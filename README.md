# n8n-nodes-monitorix360

[n8n](https://n8n.io/) community nodes for **Monitorix360** — manage teams, websites, servers, reports, SLA, usage, and notifications via the Monitorix integration API (same style of credentials as the Monitorix360 Zapier app).

[Installation](#installation) · [Credentials](#credentials) · [Development](#development) · [Publishing](#publish-to-npm) · [License](#license)

## Installation

Install as a [community node](https://docs.n8n.io/integrations/community-nodes/installation/) from npm:

- Package name: `n8n-nodes-monitorix360`

In the n8n UI: **Settings → Community nodes → Install** and enter the package name, or follow the CLI/docker instructions in the n8n docs for your deployment.

## Credentials

Create **Monitorix360 Integration API** credentials in n8n:

| Field     | Description |
| --------- | ----------- |
| **Base URL** | Root URL of your Monitorix API instance (no trailing slash). |
| **API Key**  | Integration API key; request header is `Monitorix-Integration` followed by your key. |

Use **Test** to call `GET /users/profile` and verify the key and URL.

## Operations

The **Monitorix 360** node exposes resources including Team, Website, Server, website/server reports and SLA, server usage, notifications, and Gridify-style queries. Configure **Resource** and **Operation** in the node panel.

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
