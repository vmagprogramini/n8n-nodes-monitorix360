import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsGridify } from '../../helpers/routing';

const AlertGetServerAlerts = 'alert_getServerAlerts';
const AlertGetWebsiteAlerts = 'alert_getWebsiteAlerts';

export const alertOperationsNeedingTeamId = [AlertGetServerAlerts, AlertGetWebsiteAlerts];

export const alertOperations: INodePropertyOptions[] = [
	{
		name: 'Get Server Alerts',
		value: AlertGetServerAlerts,
		action: 'List server alerts for a team',
		description: 'Returns paginated server alert definitions for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/server-alerts',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Website Alerts',
		value: AlertGetWebsiteAlerts,
		action: 'List website alerts for a team',
		description: 'Returns paginated website alert definitions for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/website-alerts',
				qs: qsGridify,
			},
		},
	},
];

export const alertOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['alert'],
		},
	},
	default: AlertGetServerAlerts,
	options: alertOperations,
};
