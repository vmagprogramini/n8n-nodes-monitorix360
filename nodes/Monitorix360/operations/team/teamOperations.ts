import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsGridify } from '../../helpers/routing';

const TeamGetMembers = 'team_getMembers';

export const teamOperationsNeedingTeamId = ['team_getById', TeamGetMembers];

const teamGetAll: INodePropertyOptions = {
	name: 'Get Many',
	action: 'List all teams for the current user',
	description: 'Reads GET /users/profile and returns the teams array.',
	value: 'team_getAll',
	routing: {
		request: {
			method: 'GET',
			url: '/users/profile',
		},
		output: {
			postReceive: [
				{
					type: 'rootProperty',
					properties: {
						property: 'teams',
					},
				},
			],
		},
	},
};

const teamGetById: INodePropertyOptions = {
	name: 'Get By ID',
	action: 'Get team by ID',
	description: 'Returns a single team record.',
	value: 'team_getById',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}',
		},
	},
};

const teamGetMembers: INodePropertyOptions = {
	name: 'Get Members',
	action: 'List team members',
	description: 'Returns paginated members with roles for the team.',
	value: TeamGetMembers,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/members',
			qs: qsGridify,
		},
	},
};

export const teamOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['team'],
		},
	},
	default: 'team_getAll',
	options: [teamGetAll, teamGetById, teamGetMembers],
};

export const teamOperationOptions: INodePropertyOptions[] = [teamGetAll, teamGetById, teamGetMembers];