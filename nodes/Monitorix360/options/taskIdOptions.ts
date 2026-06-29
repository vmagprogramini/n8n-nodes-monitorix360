import type { INodeProperties } from 'n8n-workflow';

import { teamTaskOperationsNeedingTaskId } from '../operations/task/teamTaskOperations';

export const taskIdOption: INodeProperties = {
	displayName: 'Task ID',
	name: 'taskId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getTeamTasks',
		loadOptionsDependsOn: ['resource', 'operation', 'teamId'],
	},
	description:
		'Team task UUID. Choose from the list or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	displayOptions: {
		show: {
			resource: ['teamTask'],
			operation: [...teamTaskOperationsNeedingTaskId],
		},
	},
};
