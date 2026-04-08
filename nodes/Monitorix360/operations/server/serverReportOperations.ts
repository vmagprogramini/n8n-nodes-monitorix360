import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsGridify } from '../../helpers/routing';

const ServerReportGetCpuMetrics = 'serverReport_getCpuMetrics';
const ServerReportGetDiskMetrics = 'serverReport_getDiskMetrics';
const ServerReportGetMemoryMetrics = 'serverReport_getMemoryMetrics';
const ServerReportGetNetworkMetrics = 'serverReport_getNetworkMetrics';

export const serverReportOperationsNeedingTeamId = [
	ServerReportGetCpuMetrics,
	ServerReportGetDiskMetrics,
	ServerReportGetMemoryMetrics,
	ServerReportGetNetworkMetrics,
];

export const serverReportOperationsNeedingServerId = [
	ServerReportGetCpuMetrics,
	ServerReportGetDiskMetrics,
	ServerReportGetMemoryMetrics,
	ServerReportGetNetworkMetrics,
];

export const serverReportOperations: INodePropertyOptions[] = [
	{
		name: 'Get CPU Metrics',
		action: 'List CPU metrics reports',
		description: 'Paginated CPU metrics reports for the server (Gridify)',
		value: ServerReportGetCpuMetrics,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/reports/cpu',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Disk Metrics',
		action: 'List disk metrics reports',
		description: 'Paginated disk metrics reports for the server (Gridify)',
		value: ServerReportGetDiskMetrics,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/reports/disk',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Memory Metrics',
		action: 'List memory metrics reports',
		description: 'Paginated memory metrics reports for the server (Gridify)',
		value: ServerReportGetMemoryMetrics,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/reports/memory',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Network Metrics',
		action: 'List network metrics reports',
		description: 'Paginated network metrics reports for the server (Gridify)',
		value: ServerReportGetNetworkMetrics,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/reports/network',
				qs: qsGridify,
			},
		},
	},
];

export const serverReportOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['serverReport'],
		},
	},
	default: ServerReportGetCpuMetrics,
	options: serverReportOperations,
};
