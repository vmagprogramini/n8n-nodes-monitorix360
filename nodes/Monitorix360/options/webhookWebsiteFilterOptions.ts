import type { INodeProperties } from 'n8n-workflow';

import { webhookOperationsNeedingWebsiteIdFilter } from '../operations/webhook/webhookOperations';

export const webhookWebsiteFilterOption: INodeProperties = {
	displayName: 'Website ID Filter',
	name: 'websiteId',
	type: 'string',
	default: '',
	description: 'Optional website ID to filter website webhooks',
	displayOptions: {
		show: {
			resource: ['webhook'],
			operation: [...webhookOperationsNeedingWebsiteIdFilter],
		},
	},
};
