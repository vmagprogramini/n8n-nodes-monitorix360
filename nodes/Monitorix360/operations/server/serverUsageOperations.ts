import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsUsageSeries } from '../../helpers/routing';

const ServerUsageGetCpuUsage = 'serverUsage_getCpuUsage';
const ServerUsageGetDiskUsage = 'serverUsage_getDiskUsage';
const ServerUsageGetDiskSpace = 'serverUsage_getDiskSpace';
const ServerUsageGetMemoryUsage = 'serverUsage_getMemoryUsage';
const ServerUsageGetNetworkUsage = 'serverUsage_getNetworkUsage';

export const serverUsageOperationsNeedingTeamId = [
	ServerUsageGetCpuUsage,
	ServerUsageGetDiskUsage,
	ServerUsageGetDiskSpace,
	ServerUsageGetMemoryUsage,
	ServerUsageGetNetworkUsage,
];

export const serverUsageOperationsNeedingServerId = [
	ServerUsageGetCpuUsage,
	ServerUsageGetDiskUsage,
	ServerUsageGetDiskSpace,
	ServerUsageGetMemoryUsage,
	ServerUsageGetNetworkUsage,
];

export const serverUsageOperations: INodePropertyOptions[] = [
	{
		name: 'Get CPU Usage',
		action: 'Get CPU usage time series',
		description: 'CPU usage over the selected range; requires start/end dates, optional usage type and max data points.',
		value: ServerUsageGetCpuUsage,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/usages/cpu',
				qs: qsUsageSeries,
			},
		},
	},
	{
		name: 'Get Disk Usage',
		action: 'Get disk I/O usage time series',
		description: 'Disk read/write rates over the selected range; requires start/end dates.',
		value: ServerUsageGetDiskUsage,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/usages/disk',
				qs: qsUsageSeries,
			},
		},
	},
	{
		name: 'Get Disk Space',
		action: 'Get current disk space snapshot',
		description: 'Latest disk/partition usage and free space from the most recent report.',
		value: ServerUsageGetDiskSpace,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/usages/disk-space',
			},
		},
	},
	{
		name: 'Get Memory Usage',
		action: 'Get memory usage time series',
		description: 'Memory usage over the selected range; requires start/end dates.',
		value: ServerUsageGetMemoryUsage,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/usages/memory',
				qs: qsUsageSeries,
			},
		},
	},
	{
		name: 'Get Network Usage',
		action: 'Get network usage time series',
		description: 'Network throughput over the selected range; requires start/end dates.',
		value: ServerUsageGetNetworkUsage,
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/servers/{{$parameter.serverId}}/usages/network',
				qs: qsUsageSeries,
			},
		},
	},
];

export const serverUsageOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['serverUsage'],
		},
	},
	default: ServerUsageGetCpuUsage,
	options: serverUsageOperations,
};
