import type { INodeProperties } from 'n8n-workflow';

import { webhookOperationsNeedingServerIdFilter } from '../operations/webhook/webhookOperations';

export const webhookServerFilterOption: INodeProperties = {
	displayName: 'Server ID Filter',
	name: 'serverId',
	type: 'string',
	default: '',
	description: 'Optional server ID to filter server webhooks',
	displayOptions: {
		show: {
			resource: ['webhook'],
			operation: [...webhookOperationsNeedingServerIdFilter],
		},
	},
};
