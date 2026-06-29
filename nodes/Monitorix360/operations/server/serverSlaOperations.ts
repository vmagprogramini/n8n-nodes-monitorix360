import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { pdfReportPostReceive } from '../../helpers/binaryFilePostReceive';
import { qsGridify, qsGridifyAndDates, qsSlaReportPdf } from '../../helpers/routing';

const ServerSlaGetConfigurations = 'serverSla_getSlaConfigurations';
const ServerSlaGetBreaches = 'serverSla_getSlaBreaches';
const ServerSlaGetSla = 'serverSla_getSla';
const ServerSlaGetSlaBreachesByConfiguration = 'serverSla_getSlaBreachesByConfiguration';
const ServerSlaGetSlaReport = 'serverSla_getSlaReport';

export const serverSlaOperationsNeedingTeamId = [
	ServerSlaGetConfigurations,
	ServerSlaGetBreaches,
	ServerSlaGetSla,
	ServerSlaGetSlaBreachesByConfiguration,
	ServerSlaGetSlaReport,
];

export const serverSlaOperationsNeedingServerId = [
	ServerSlaGetConfigurations,
	ServerSlaGetBreaches,
	ServerSlaGetSla,
	ServerSlaGetSlaBreachesByConfiguration,
	ServerSlaGetSlaReport,
];

export const serverSlaOperationsNeedingSlaConfigurationId = [ServerSlaGetSlaBreachesByConfiguration];

export const serverSlaOperations: INodePropertyOptions[] = [
	{
		name: 'Get SLA Configurations',
		action: 'List server SLA configurations',
		description: 'Paginated SLA configuration definitions for the server',
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
		name: 'Get SLA',
		action: 'Get server SLA configurations',
		description: 'Retrieves SLA configurations for a server (alternate route)',
		value: ServerSlaGetSla,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla',
			},
		},
	},
	{
		name: 'Get SLA Breaches',
		action: 'List server SLA breaches',
		description: 'Paginated SLA breach records with optional date filters',
		value: ServerSlaGetBreaches,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get SLA Breaches By Configuration',
		action: 'List server SLA breaches for a configuration',
		description:
			'Paginated SLA breach records for a specific SLA configuration, optionally filtered by date range',
		value: ServerSlaGetSlaBreachesByConfiguration,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla-configurations/{{$parameter.slaConfigurationId}}/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get SLA Report PDF',
		action: 'Download server SLA report PDF',
		description: 'Generates and downloads a customer-facing SLA report PDF for the server',
		value: ServerSlaGetSlaReport,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/sla/report',
				qs: qsSlaReportPdf,
				returnFullResponse: true,
				encoding: 'arraybuffer',
			},
			output: {
				postReceive: [pdfReportPostReceive],
			},
		},
	},
];

export const serverSlaOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['serverSla'],
		},
	},
	default: ServerSlaGetConfigurations,
	options: serverSlaOperations,
};
