import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { pdfReportPostReceive } from '../../helpers/binaryFilePostReceive';
import {
	qsFromToRange,
	qsGridify,
	qsGridifyAndDates,
	qsMonitoredTaskEvents,
	qsReportPdf,
	qsSlaReportPdf,
	qsStatusHeatmap,
} from '../../helpers/routing';

const MonitoredTaskGetBadges = 'monitoredTask_getBadges';
const MonitoredTaskGetAll = 'monitoredTask_getAll';
const MonitoredTaskGetById = 'monitoredTask_getById';
const MonitoredTaskGetEvents = 'monitoredTask_getEvents';
const MonitoredTaskGetMaintenanceWindows = 'monitoredTask_getMaintenanceWindows';
const MonitoredTaskGetReport = 'monitoredTask_getReport';
const MonitoredTaskGetReportPdf = 'monitoredTask_getReportPdf';
const MonitoredTaskGetSla = 'monitoredTask_getSla';
const MonitoredTaskGetSlaBreaches = 'monitoredTask_getSlaBreaches';
const MonitoredTaskGetSlaBreachesByConfiguration = 'monitoredTask_getSlaBreachesByConfiguration';
const MonitoredTaskGetStatusHeatmap = 'monitoredTask_getStatusHeatmap';
const MonitoredTaskGetSlaReport = 'monitoredTask_getSlaReport';
const MonitoredTaskGetSlaConfigurations = 'monitoredTask_getSlaConfigurations';
const MonitoredTaskGetTeamReport = 'monitoredTask_getTeamReport';
const MonitoredTaskGetTeamStatusHeatmap = 'monitoredTask_getTeamStatusHeatmap';

export const monitoredTaskOperationsNeedingTeamId = [
	MonitoredTaskGetBadges,
	MonitoredTaskGetAll,
	MonitoredTaskGetById,
	MonitoredTaskGetEvents,
	MonitoredTaskGetMaintenanceWindows,
	MonitoredTaskGetReport,
	MonitoredTaskGetReportPdf,
	MonitoredTaskGetSla,
	MonitoredTaskGetSlaBreaches,
	MonitoredTaskGetSlaBreachesByConfiguration,
	MonitoredTaskGetStatusHeatmap,
	MonitoredTaskGetSlaReport,
	MonitoredTaskGetSlaConfigurations,
	MonitoredTaskGetTeamReport,
	MonitoredTaskGetTeamStatusHeatmap,
];

export const monitoredTaskOperationsNeedingMonitoredTaskId = [
	MonitoredTaskGetById,
	MonitoredTaskGetEvents,
	MonitoredTaskGetMaintenanceWindows,
	MonitoredTaskGetReport,
	MonitoredTaskGetReportPdf,
	MonitoredTaskGetSla,
	MonitoredTaskGetSlaBreaches,
	MonitoredTaskGetSlaBreachesByConfiguration,
	MonitoredTaskGetStatusHeatmap,
	MonitoredTaskGetSlaReport,
	MonitoredTaskGetSlaConfigurations,
];

export const monitoredTaskOperationsNeedingSlaConfigurationId = [
	MonitoredTaskGetSlaBreachesByConfiguration,
];

const binaryPdfRouting = {
	returnFullResponse: true,
	encoding: 'arraybuffer' as const,
};

export const monitoredTaskOperations: INodePropertyOptions[] = [
	{
		name: 'Get Badges',
		value: MonitoredTaskGetBadges,
		action: 'List monitored task badges',
		description: 'Returns monitored task badge counts for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-task-badges',
			},
		},
	},
	{
		name: 'Get Monitored Tasks',
		value: MonitoredTaskGetAll,
		action: 'List monitored tasks',
		description: 'Returns paginated monitored tasks for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Monitored Task By ID',
		value: MonitoredTaskGetById,
		action: 'Get monitored task by ID',
		description: 'Returns a single monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}',
			},
		},
	},
	{
		name: 'Get Events',
		value: MonitoredTaskGetEvents,
		action: 'List monitored task events',
		description: 'Returns paginated events for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/events',
				qs: qsMonitoredTaskEvents,
			},
		},
	},
	{
		name: 'Get Maintenance Windows',
		value: MonitoredTaskGetMaintenanceWindows,
		action: 'List monitored task maintenance windows',
		description: 'Returns maintenance windows for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/maintenance-windows',
			},
		},
	},
	{
		name: 'Get Execution Report',
		value: MonitoredTaskGetReport,
		action: 'Get monitored task execution report',
		description: 'Returns execution report data for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/report',
				qs: qsFromToRange,
			},
		},
	},
	{
		name: 'Get Execution Report PDF',
		value: MonitoredTaskGetReportPdf,
		action: 'Download monitored task execution report PDF',
		description: 'Downloads execution report as PDF',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/report/pdf',
				qs: qsReportPdf,
				...binaryPdfRouting,
			},
			output: {
				postReceive: [pdfReportPostReceive],
			},
		},
	},
	{
		name: 'Get SLA',
		value: MonitoredTaskGetSla,
		action: 'Get monitored task SLA status',
		description: 'Returns SLA status for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/sla',
			},
		},
	},
	{
		name: 'Get SLA Breaches',
		value: MonitoredTaskGetSlaBreaches,
		action: 'List monitored task SLA breaches',
		description: 'Returns paginated SLA breaches for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/sla/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get SLA Breaches By Configuration',
		value: MonitoredTaskGetSlaBreachesByConfiguration,
		action: 'List SLA breaches for a configuration',
		description: 'Returns SLA breaches for a specific monitored task SLA configuration',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/sla-configurations/{{$parameter.slaConfigurationId}}/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get Status Heatmap',
		value: MonitoredTaskGetStatusHeatmap,
		action: 'Get monitored task status heatmap',
		description: 'Returns status heatmap for a single monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/status-heatmap',
				qs: qsStatusHeatmap,
			},
		},
	},
	{
		name: 'Get SLA Report PDF',
		value: MonitoredTaskGetSlaReport,
		action: 'Download monitored task SLA report PDF',
		description: 'Downloads SLA report PDF for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/sla/report',
				qs: qsSlaReportPdf,
				...binaryPdfRouting,
			},
			output: {
				postReceive: [pdfReportPostReceive],
			},
		},
	},
	{
		name: 'Get SLA Configurations',
		value: MonitoredTaskGetSlaConfigurations,
		action: 'List monitored task SLA configurations',
		description: 'Returns paginated SLA configurations for a monitored task',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/{{$parameter.monitoredTaskId}}/sla-configurations',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Team Execution Report',
		value: MonitoredTaskGetTeamReport,
		action: 'Get team monitored tasks report',
		description: 'Returns aggregated execution report for all monitored tasks in the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/report',
				qs: qsFromToRange,
			},
		},
	},
	{
		name: 'Get Team Status Heatmap',
		value: MonitoredTaskGetTeamStatusHeatmap,
		action: 'Get team monitored task status heatmap',
		description: 'Returns status heatmap aggregated across monitored tasks for the team',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/monitored-tasks/status-heatmap',
				qs: qsStatusHeatmap,
			},
		},
	},
];

export const monitoredTaskOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['monitoredTask'],
		},
	},
	default: MonitoredTaskGetAll,
	options: monitoredTaskOperations,
};
