import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsWebhookServerFilter, qsWebhookWebsiteFilter } from '../../helpers/routing';

const WebhookGetServers = 'webhook_getServers';
const WebhookGetServerById = 'webhook_getServerById';
const WebhookGetWebsites = 'webhook_getWebsites';
const WebhookGetWebsiteById = 'webhook_getWebsiteById';

export const webhookOperationsNeedingTeamId = [
	WebhookGetServers,
	WebhookGetServerById,
	WebhookGetWebsites,
	WebhookGetWebsiteById,
];

export const webhookOperationsNeedingWebhookId = [WebhookGetServerById, WebhookGetWebsiteById];

export const webhookOperationsNeedingServerIdFilter = [WebhookGetServers];

export const webhookOperationsNeedingWebsiteIdFilter = [WebhookGetWebsites];

export const webhookOperations: INodePropertyOptions[] = [
	{
		name: 'Get Server Webhooks',
		value: WebhookGetServers,
		action: 'List server webhooks',
		description: 'Returns server webhooks for the team; optional serverId filter',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/webhooks/servers',
				qs: qsWebhookServerFilter,
			},
		},
	},
	{
		name: 'Get Server Webhook By ID',
		value: WebhookGetServerById,
		action: 'Get server webhook by ID',
		description: 'Returns a single server webhook',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/webhooks/servers/{{$parameter.webhookId}}',
			},
		},
	},
	{
		name: 'Get Website Webhooks',
		value: WebhookGetWebsites,
		action: 'List website webhooks',
		description: 'Returns website webhooks for the team; optional websiteId filter',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/webhooks/websites',
				qs: qsWebhookWebsiteFilter,
			},
		},
	},
	{
		name: 'Get Website Webhook By ID',
		value: WebhookGetWebsiteById,
		action: 'Get website webhook by ID',
		description: 'Returns a single website webhook',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/webhooks/websites/{{$parameter.webhookId}}',
			},
		},
	},
];

export const webhookOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['webhook'],
		},
	},
	default: WebhookGetServers,
	options: webhookOperations,
};
