import type { INodeProperties } from 'n8n-workflow';

import { notificationResources, serverResources } from '../helpers/resource';
import { notificationsOperationsNeedingServerId } from '../operations/notifications/notificationsOperations';
import { serverReportOperationsNeedingServerId } from '../operations/server/serverReportOperations';
import { serverOperationsNeedingServerId } from '../operations/server/serverOperations';
import { serverSlaOperationsNeedingServerId } from '../operations/server/serverSlaOperations';
import { serverUsageOperationsNeedingServerId } from '../operations/server/serverUsageOperations';

export const serverOption: INodeProperties = {
	displayName: 'Server Name or ID',
	name: 'serverId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getServers',
		loadOptionsDependsOn: ['resource', 'operation', 'teamId'],
	},
	description: 'Choose a server from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	displayOptions: {
		show: {
			resource: [...serverResources, ...notificationResources],
			operation: [
				...serverOperationsNeedingServerId,
				...serverReportOperationsNeedingServerId,
				...serverUsageOperationsNeedingServerId,
				...serverSlaOperationsNeedingServerId,
				...notificationsOperationsNeedingServerId,
			],
		},
	},
};
