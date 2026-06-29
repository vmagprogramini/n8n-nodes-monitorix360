import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsGridify } from '../../helpers/routing';

const TeamTaskGetAll = 'teamTask_getAll';
const TeamTaskGetById = 'teamTask_getById';

export const teamTaskOperationsNeedingTeamId = [TeamTaskGetAll, TeamTaskGetById];

export const teamTaskOperationsNeedingTaskId = [TeamTaskGetById];

export const teamTaskOperations: INodePropertyOptions[] = [
	{
		name: 'Get Tasks',
		value: TeamTaskGetAll,
		action: 'List team tasks',
		description: 'Returns paginated tasks for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/tasks',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Task By ID',
		value: TeamTaskGetById,
		action: 'Get team task by ID',
		description: 'Returns a single team task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/tasks/{{$parameter.taskId}}',
			},
		},
	},
];

export const teamTaskOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['teamTask'],
		},
	},
	default: TeamTaskGetAll,
	options: teamTaskOperations,
};
