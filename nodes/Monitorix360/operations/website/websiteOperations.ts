import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsDateRange, qsGridify, qsResponseTimes } from '../../helpers/routing';

const WebsiteGetAll = 'website_getAll';
const WebsiteGetById = 'website_getById';
const WebsiteGetResponseTimes = 'website_getResponseTimes';
const WebsiteGetPorts = 'website_getPorts';
const WebsiteGetMaintenanceWindows = 'website_getMaintenanceWindows';
const WebsiteGetEvents = 'website_getEvents';
const WebsiteGetAlertPreferences = 'website_getAlertPreferences';

export const websiteOperationsNeedingTeamId = [
	WebsiteGetAll,
	WebsiteGetById,
	WebsiteGetResponseTimes,
	WebsiteGetPorts,
	WebsiteGetMaintenanceWindows,
	WebsiteGetEvents,
	WebsiteGetAlertPreferences,
];

export const websiteOperationsNeedingWebsiteId = [
	WebsiteGetById,
	WebsiteGetResponseTimes,
	WebsiteGetPorts,
	WebsiteGetMaintenanceWindows,
	WebsiteGetEvents,
	WebsiteGetAlertPreferences,
];

/**
 * Get all websites for a team (options)
 */
const websiteGetAll: INodePropertyOptions = {
	name: 'Get Websites',
	action: 'List websites for a team',
	description: 'Returns all websites monitored under the selected team',
	value: WebsiteGetAll,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites',
		},
	},
};

/**
 * Get a website by ID (options)
 */
const websiteGetById: INodePropertyOptions = {
	name: 'Get Website Details',
	action: 'Get website by ID',
	description: 'Returns full details for a single website',
	value: WebsiteGetById,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}',
		},
	},
};

/**
 * Get response times for a website (options)
 */
const websiteGetResponseTimes: INodePropertyOptions = {
	name: 'Get Response Times',
	value: WebsiteGetResponseTimes,
	action: 'Get response times for a website',
	description:
		'Retrieves historical response time data for a website. Optionally filters by start and end date to get response times within a specific time range.',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/response-times',
			qs: qsResponseTimes,
		},
	},
};

const websiteGetPorts: INodePropertyOptions = {
	name: 'Get Ports',
	action: 'List monitored ports for a website',
	description: 'Returns paginated custom and detected ports for the website',
	value: WebsiteGetPorts,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/ports',
			qs: qsGridify,
		},
	},
};

const websiteGetMaintenanceWindows: INodePropertyOptions = {
	name: 'Get Maintenance Windows',
	action: 'List website maintenance windows',
	description: 'Returns scheduled maintenance windows that exclude downtime from SLA',
	value: WebsiteGetMaintenanceWindows,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/maintenance-windows',
		},
	},
};

const websiteGetEvents: INodePropertyOptions = {
	name: 'Get Events',
	action: 'List website events',
	description: 'Returns maintenance, certificate, and SLA-related events; optional date range',
	value: WebsiteGetEvents,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/events',
			qs: qsDateRange,
		},
	},
};

const websiteGetAlertPreferences: INodePropertyOptions = {
	name: 'Get Alert Preferences',
	action: 'Get website alert preferences',
	description: 'Returns alert preferences configured for the website',
	value: WebsiteGetAlertPreferences,
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/alert-preferences',
		},
	},
};

/**
 * Website operation for websites (node properties)
 */
export const websiteOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['website'],
		},
	},
	default: WebsiteGetAll,
	options: [
		websiteGetAll,
		websiteGetById,
		websiteGetResponseTimes,
		websiteGetPorts,
		websiteGetMaintenanceWindows,
		websiteGetEvents,
		websiteGetAlertPreferences,
	],
};

/**
 * Website operation options for websites (options)
 */
export const websiteOperationOptions: INodePropertyOptions[] = [
	websiteGetAll,
	websiteGetById,
	websiteGetResponseTimes,
	websiteGetPorts,
	websiteGetMaintenanceWindows,
	websiteGetEvents,
	websiteGetAlertPreferences,
];