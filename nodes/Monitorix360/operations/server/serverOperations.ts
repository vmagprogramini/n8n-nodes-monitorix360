import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsDateRange, qsGridify } from '../../helpers/routing';

export const serverOperationsNeedingTeamId = [
	'server_getAll',
	'server_getById',
	'server_getPorts',
	'server_getMaintenanceWindows',
	'server_getEvents',
	'server_getCertificates',
	'server_getUsers',
	'server_getAlertPreferences',
	'server_getIdentityMismatches',
];

export const serverOperationsNeedingServerId = [
	'server_getById',
	'server_getPorts',
	'server_getMaintenanceWindows',
	'server_getEvents',
	'server_getCertificates',
	'server_getUsers',
	'server_getAlertPreferences',
	'server_getIdentityMismatches',
];

const serverGetAll: INodePropertyOptions = {
	name: 'Get Servers',
	action: 'List servers for a team',
	description: 'Returns all servers monitored under the selected team',
	value: 'server_getAll',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers',
		},
	},
};

const serverGetById: INodePropertyOptions = {
	name: 'Get Server Details',
	action: 'Get server by ID',
	description: 'Returns full details for a single server',
	value: 'server_getById',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}',
		},
	},
};

const serverGetPorts: INodePropertyOptions = {
	name: 'Get Ports',
	action: 'List monitored ports for a server',
	description: 'Returns paginated ports configured for the server',
	value: 'server_getPorts',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/ports',
			qs: qsGridify,
		},
	},
};

const serverGetMaintenanceWindows: INodePropertyOptions = {
	name: 'Get Maintenance Windows',
	action: 'List server maintenance windows',
	description: 'Returns maintenance windows when monitoring jobs are paused',
	value: 'server_getMaintenanceWindows',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/maintenance-windows',
		},
	},
};

const serverGetEvents: INodePropertyOptions = {
	name: 'Get Events',
	action: 'List server events',
	description: 'Returns maintenance, certificate, and SLA-related events; optional date range',
	value: 'server_getEvents',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/events',
			qs: qsDateRange,
		},
	},
};

const serverGetCertificates: INodePropertyOptions = {
	name: 'Get Certificates',
	action: 'List server certificate reports',
	description: 'Returns paginated certificate data from the latest server reports',
	value: 'server_getCertificates',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/certificates',
			qs: qsGridify,
		},
	},
};

const serverGetUsers: INodePropertyOptions = {
	name: 'Get Users',
	action: 'List users from latest server report',
	description: 'Returns paginated user accounts seen in the latest report',
	value: 'server_getUsers',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/users',
			qs: qsGridify,
		},
	},
};

const serverGetAlertPreferences: INodePropertyOptions = {
	name: 'Get Alert Preferences',
	action: 'Get server alert preferences',
	description: 'Returns alert preferences configured for the server',
	value: 'server_getAlertPreferences',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/alert-preferences',
		},
	},
};

const serverGetIdentityMismatches: INodePropertyOptions = {
	name: 'Get Identity Mismatches',
	action: 'List server identity mismatches',
	description: 'Returns identity mismatch snapshots for the server',
	value: 'server_getIdentityMismatches',
	routing: {
		request: {
			method: 'GET',
			url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/identity-mismatches',
		},
	},
};

export const serverOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['server'],
		},
	},
	default: 'server_getAll',
	options: [
		serverGetAll,
		serverGetById,
		serverGetPorts,
		serverGetMaintenanceWindows,
		serverGetEvents,
		serverGetCertificates,
		serverGetUsers,
		serverGetAlertPreferences,
		serverGetIdentityMismatches,
	],
};

export const serverOperationOptions: INodePropertyOptions[] = [
	serverGetAll,
	serverGetById,
	serverGetPorts,
	serverGetMaintenanceWindows,
	serverGetEvents,
	serverGetCertificates,
	serverGetUsers,
	serverGetAlertPreferences,
	serverGetIdentityMismatches,
];
