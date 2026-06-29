import type { INodeProperties } from 'n8n-workflow';

import { webhookOperationsNeedingWebhookId } from '../operations/webhook/webhookOperations';

export const webhookIdOption: INodeProperties = {
	displayName: 'Webhook ID',
	name: 'webhookId',
	type: 'string',
	required: true,
	default: '',
	description: 'Webhook UUID from the list webhooks operation',
	displayOptions: {
		show: {
			resource: ['webhook'],
			operation: [...webhookOperationsNeedingWebhookId],
		},
	},
};
