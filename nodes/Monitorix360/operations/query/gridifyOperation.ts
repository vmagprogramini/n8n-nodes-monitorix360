import type { INodeProperties } from 'n8n-workflow';

/** Gridify paging (page, pageSize, orderBy, filter). */
const opsGridifyPaging = [
	'website_getPorts',
	'website_getSlaConfigurations',
	'website_getSlaBreaches',
	'website_getReportsAvailability',
	'website_getReportsCertificates',
	'website_getReportsDns',
	'website_getReportsPageSpeed',
	'website_getReportsSecurity',
	'server_getPorts',
	'server_getCertificates',
	'server_getUsers',
	'serverReport_getCpuMetrics',
	'serverReport_getDiskMetrics',
	'serverReport_getMemoryMetrics',
	'serverReport_getNetworkMetrics',
	'serverSla_getSlaConfigurations',
	'serverSla_getSlaBreaches',
	'team_getMembers',
	'serverSla_getSlaBreachesByConfiguration',
	'website_getSlaBreachesByConfiguration',
	'monitoredTask_getAll',
	'monitoredTask_getEvents',
	'monitoredTask_getSlaBreaches',
	'monitoredTask_getSlaBreachesByConfiguration',
	'monitoredTask_getSlaConfigurations',
	'expiringSecret_getAll',
	'alert_getServerAlerts',
	'alert_getWebsiteAlerts',
	'teamTask_getAll',
];

const opsDateRange = [
	'website_getResponseTimes',
	'website_getSlaBreaches',
	'website_getReportsAvailability',
	'website_getReportsCertificates',
	'website_getReportsDns',
	'website_getReportsPageSpeed',
	'website_getEvents',
	'server_getEvents',
	'serverSla_getSlaBreaches',
	'serverUsage_getCpuUsage',
	'serverUsage_getDiskUsage',
	'serverUsage_getMemoryUsage',
	'serverUsage_getNetworkUsage',
	'notifications_getAll',
	'notifications_getServers',
	'notifications_getWebsites',
	'team_getEvents',
	'serverSla_getSlaBreachesByConfiguration',
	'website_getSlaBreachesByConfiguration',
	'website_getSlaReport',
	'monitoredTask_getReport',
	'monitoredTask_getTeamReport',
	'monitoredTask_getEvents',
	'monitoredTask_getSlaBreaches',
	'monitoredTask_getSlaBreachesByConfiguration',
	'monitoredTask_getSlaReport',
	'monitoredTask_getReportPdf',
	'serverSla_getSlaReport',
	'expiringSecret_getEvents',
];

const opsSlaReportLang = [
	'website_getSlaReport',
	'monitoredTask_getReportPdf',
	'monitoredTask_getSlaReport',
	'serverSla_getSlaReport',
];

const opsMaxDataPoints = [
	'website_getResponseTimes',
	'serverUsage_getCpuUsage',
	'serverUsage_getDiskUsage',
	'serverUsage_getMemoryUsage',
	'serverUsage_getNetworkUsage',
];

const opsUsageType = [
	'serverUsage_getCpuUsage',
	'serverUsage_getDiskUsage',
	'serverUsage_getMemoryUsage',
	'serverUsage_getNetworkUsage',
];

const opsNotificationLimit = ['notifications_getAll', 'notifications_getServers', 'notifications_getWebsites'];

const opsStatusHeatmap = ['monitoredTask_getStatusHeatmap', 'monitoredTask_getTeamStatusHeatmap'];

const opsEventTypes = ['monitoredTask_getEvents', 'expiringSecret_getEvents'];

const opsPageSpeedStrategy = ['website_getPageSpeedLast'];

/** Operation parameter values are already prefixed (e.g. website_getResponseTimes). Do not prefix again. */
const queryPageProperty: INodeProperties = {
	displayName: 'Query: Page',
	name: 'queryPage',
	type: 'number',
	default: 1,
	description: 'Gridify page number (1-based)',
	displayOptions: {
		show: {
			operation: [...opsGridifyPaging],
		},
	},
};

const queryPageSizeProperty: INodeProperties = {
	displayName: 'Query: Page Size',
	name: 'queryPageSize',
	type: 'number',
	default: 20,
	description: 'Gridify page size',
	displayOptions: {
		show: {
			operation: [...opsGridifyPaging],
		},
	},
};

const queryOrderByProperty: INodeProperties = {
	displayName: 'Query: Order By',
	name: 'queryOrderBy',
	type: 'string',
	default: '',
	description: 'Gridify order-by expression',
	displayOptions: {
		show: {
			operation: [...opsGridifyPaging],
		},
	},
};

const queryFilterProperty: INodeProperties = {
	displayName: 'Query: Filter',
	name: 'queryFilter',
	type: 'string',
	default: '',
	description: 'Gridify filter expression',
	displayOptions: {
		show: {
			operation: [...opsGridifyPaging],
		},
	},
};

const queryStartDateProperty: INodeProperties = {
	displayName: 'Query: Start Date',
	name: 'queryStartDate',
	type: 'dateTime',
	required: true,
	default: '={{ $now.minus(7, "days") }}',
	description:
		'Start of range (defaults to 7 days ago). Required whenever this field is shown.',
	displayOptions: {
		show: {
			operation: [...opsDateRange],
		},
	},
};

const queryEndDateProperty: INodeProperties = {
	displayName: 'Query: End Date',
	name: 'queryEndDate',
	type: 'dateTime',
	required: true,
	default: '={{ $now }}',
	description: 'End of range (defaults to now). Required whenever this field is shown.',
	displayOptions: {
		show: {
			operation: [...opsDateRange],
		},
	},
};

const queryMaxDataPointsProperty: INodeProperties = {
	displayName: 'Query: Max Data Points',
	name: 'queryMaxDataPoints',
	type: 'number',
	default: 500,
	description: 'Cap number of points returned (response times and server usage series)',
	displayOptions: {
		show: {
			operation: [...opsMaxDataPoints],
		},
	},
};

const queryUsageTypeProperty: INodeProperties = {
	displayName: 'Query: Usage Type',
	name: 'queryUsageType',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Stacked', value: 'Stacked' },
		{ name: 'NotStacked', value: 'NotStacked' },
	],
	default: 'Stacked',
	description: 'CPU/disk/network usage aggregation (API enum UsageType)',
	displayOptions: {
		show: {
			operation: [...opsUsageType],
		},
	},
};

const queryLimitProperty: INodeProperties = {
	displayName: 'Query: Limit',
	name: 'queryLimit',
	type: 'number',
	default: 50,
	description: 'Max number of notification results',
	displayOptions: {
		show: {
			operation: [...opsNotificationLimit],
		},
	},
};

const queryLangProperty: INodeProperties = {
	displayName: 'Query: Language',
	name: 'queryLang',
	type: 'string',
	default: '',
	placeholder: 'en',
	description:
		'Report language code (e.g. en, fr, es). Optional; falls back to Accept-Language or user locale.',
	displayOptions: {
		show: {
			operation: [...opsSlaReportLang],
		},
	},
};

const queryDaysProperty: INodeProperties = {
	displayName: 'Query: Days',
	name: 'queryDays',
	type: 'number',
	default: 30,
	description: 'Number of days for the status heatmap (default 30)',
	displayOptions: {
		show: {
			operation: [...opsStatusHeatmap],
		},
	},
};

const queryBucketProperty: INodeProperties = {
	displayName: 'Query: Bucket',
	name: 'queryBucket',
	type: 'string',
	default: 'day',
	description: 'Heatmap bucket size (default day)',
	displayOptions: {
		show: {
			operation: [...opsStatusHeatmap],
		},
	},
};

const queryEventTypesProperty: INodeProperties = {
	displayName: 'Query: Event Types',
	name: 'queryEventTypes',
	type: 'string',
	default: '',
	description: 'Optional comma-separated event type filter',
	displayOptions: {
		show: {
			operation: [...opsEventTypes],
		},
	},
};

const queryPageSpeedStrategyProperty: INodeProperties = {
	displayName: 'Query: PageSpeed Strategy',
	name: 'queryPageSpeedStrategy',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Desktop', value: 'Desktop' },
		{ name: 'Mobile', value: 'Mobile' },
	],
	default: 'Desktop',
	description: 'PageSpeed measurement strategy',
	displayOptions: {
		show: {
			operation: [...opsPageSpeedStrategy],
		},
	},
};

/** Gridify / date-range / usage / notification query fields (see helpers/routing.ts). */
export const gridifyQueryProperties: INodeProperties[] = [
	queryPageProperty,
	queryPageSizeProperty,
	queryOrderByProperty,
	queryFilterProperty,
	queryStartDateProperty,
	queryEndDateProperty,
	queryMaxDataPointsProperty,
	queryUsageTypeProperty,
	queryLimitProperty,
	queryLangProperty,
	queryDaysProperty,
	queryBucketProperty,
	queryEventTypesProperty,
	queryPageSpeedStrategyProperty,
];
