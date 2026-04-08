import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsNotificationsScoped } from '../../helpers/routing';

const NotificationsGetAll = 'notifications_getAll';
const NotificationsGetServers = 'notifications_getServers';
const NotificationsGetWebsites = 'notifications_getWebsites';

export const notificationsOperationsNeedingTeamId = [
	NotificationsGetAll,
	NotificationsGetServers,
	NotificationsGetWebsites,
];

export const notificationsOperationsNeedingServerId = [NotificationsGetServers];

export const notificationsOperationsNeedingWebsiteId = [NotificationsGetWebsites];

export const notificationsOperations: INodePropertyOptions[] = [
	{
		name: 'Get All (Team)',
		action: 'List team-wide alert occurrences',
		description: 'Alert occurrences for the whole team; optional date range and limit',
		value: NotificationsGetAll,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/notifications',
				qs: qsNotificationsScoped,
			},
		},
	},
	{
		name: 'Get By Server',
		action: 'List server alert occurrences',
		description: 'Alert occurrences scoped to one server; optional date range and limit',
		value: NotificationsGetServers,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/notifications',
				qs: qsNotificationsScoped,
			},
		},
	},
	{
		name: 'Get By Website',
		action: 'List website alert occurrences',
		description: 'Alert occurrences scoped to one website; optional date range and limit',
		value: NotificationsGetWebsites,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/notifications',
				qs: qsNotificationsScoped,
			},
		},
	},
];

export const notificationsOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['notifications'],
		},
	},
	default: NotificationsGetAll,
	options: notificationsOperations,
};
