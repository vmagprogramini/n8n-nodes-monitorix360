import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsGridify, qsGridifyAndDates } from '../../helpers/routing';

const ServerSlaGetConfigurations = 'serverSla_getSlaConfigurations';
const ServerSlaGetBreaches = 'serverSla_getSlaBreaches';

export const serverSlaOperationsNeedingTeamId = [ServerSlaGetConfigurations, ServerSlaGetBreaches];

export const serverSlaOperationsNeedingServerId = [ServerSlaGetConfigurations, ServerSlaGetBreaches];

export const serverSlaOperations: INodePropertyOptions[] = [
	{
		name: 'Get SLA Configurations',
		action: 'List server SLA configurations',
		description: 'Paginated SLA configuration definitions for the server.',
		value: ServerSlaGetConfigurations,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla-configurations',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get SLA Breaches',
		action: 'List server SLA breaches',
		description: 'Paginated SLA breach records with optional date filters.',
		value: ServerSlaGetBreaches,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
];

export const serverSlaOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['serverSla'],
		},
	},
	default: ServerSlaGetConfigurations,
	options: serverSlaOperations,
};
