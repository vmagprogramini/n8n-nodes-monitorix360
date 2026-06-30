import type { INodeProperties } from 'n8n-workflow';

import { pingResources } from '../helpers/resource';

const pingResourceDisplay = {
	show: {
		resource: pingResources,
	},
};

export const pingTokenOption: INodeProperties = {
	displayName: 'Ping Token',
	name: 'pingToken',
	type: 'string',
	typeOptions: { password: true },
	required: true,
	default: '',
	description: 'Monitored-task ping token (path segment in /ping/{token}/...)',
	displayOptions: pingResourceDisplay,
};

export const pingHttpMethodOption: INodeProperties = {
	displayName: 'HTTP Method',
	name: 'httpMethod',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'POST', value: 'POST' },
		{ name: 'GET', value: 'GET' },
	],
	default: 'POST',
	description:
		'POST is recommended. Optional JSON body (object or array) is only sent when Send JSON Body is enabled.',
	displayOptions: pingResourceDisplay,
};

export const pingSendJsonBodyOption: INodeProperties = {
	displayName: 'Send JSON Body',
	name: 'sendJsonBody',
	type: 'boolean',
	default: false,
	description: 'Whether to include a JSON body on the POST request',
	displayOptions: {
		show: {
			resource: pingResources,
			httpMethod: ['POST'],
		},
	},
};

export const pingJsonBodyOption: INodeProperties = {
	displayName: 'JSON Body',
	name: 'jsonBody',
	type: 'json',
	default: {},
	description:
		'Optional caller metadata as a JSON object or array (max 4 KB). Sent only when Send JSON Body is enabled.',
	displayOptions: {
		show: {
			resource: pingResources,
			httpMethod: ['POST'],
			sendJsonBody: [true],
		},
	},
};
