import type { INodeProperties } from 'n8n-workflow';

import { monitoredTaskOperationsNeedingMonitoredTaskId } from '../operations/monitoredTask/monitoredTaskOperations';

export const monitoredTaskIdOption: INodeProperties = {
	displayName: 'Monitored Task ID',
	name: 'monitoredTaskId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getMonitoredTasks',
		loadOptionsDependsOn: ['resource', 'operation', 'teamId'],
	},
	description:
		'Monitored task UUID. Choose from the list or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	displayOptions: {
		show: {
			resource: ['monitoredTask'],
			operation: [...monitoredTaskOperationsNeedingMonitoredTaskId],
		},
	},
};
