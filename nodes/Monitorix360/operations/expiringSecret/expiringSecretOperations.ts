import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsExpiringSecretEvents, qsGridify } from '../../helpers/routing';

const ExpiringSecretGetAll = 'expiringSecret_getAll';
const ExpiringSecretGetById = 'expiringSecret_getById';
const ExpiringSecretGetEvents = 'expiringSecret_getEvents';

export const expiringSecretOperationsNeedingTeamId = [
	ExpiringSecretGetAll,
	ExpiringSecretGetById,
	ExpiringSecretGetEvents,
];

export const expiringSecretOperationsNeedingExpiringSecretId = [
	ExpiringSecretGetById,
	ExpiringSecretGetEvents,
];

export const expiringSecretOperations: INodePropertyOptions[] = [
	{
		name: 'Get Expiring Secrets',
		value: ExpiringSecretGetAll,
		action: 'List expiring secrets',
		description: 'Returns paginated expiring secrets for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/expiring-secrets',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Expiring Secret By ID',
		value: ExpiringSecretGetById,
		action: 'Get expiring secret by ID',
		description: 'Returns a single expiring secret record',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/expiring-secrets/{{$parameter.expiringSecretId}}',
			},
		},
	},
	{
		name: 'Get Expiring Secret Events',
		value: ExpiringSecretGetEvents,
		action: 'List expiring secret events',
		description: 'Returns events for an expiring secret with optional date and event-type filters',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/expiring-secrets/{{$parameter.expiringSecretId}}/events',
				qs: qsExpiringSecretEvents,
			},
		},
	},
];

export const expiringSecretOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['expiringSecret'],
		},
	},
	default: ExpiringSecretGetAll,
	options: expiringSecretOperations,
};
