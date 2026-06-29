import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { slaReportPostReceive } from '../../helpers/slaReportPostReceive';
import { qsGridify, qsGridifyAndDates, qsSlaReport } from '../../helpers/routing';

const WebsiteGetSlaConfigurations = 'website_getSlaConfigurations';
const WebsiteGetSlaBreaches = 'website_getSlaBreaches';
const WebsiteGetSla = 'website_getSla';
const WebsiteGetSlaBreachesByConfiguration = 'website_getSlaBreachesByConfiguration';
const WebsiteGetSlaReport = 'website_getSlaReport';

/**
 * Operations needing team ID
 */
export const websiteSlaOperationsNeedingTeamId = [
	WebsiteGetSlaConfigurations,
	WebsiteGetSlaBreaches,
	WebsiteGetSla,
	WebsiteGetSlaBreachesByConfiguration,
	WebsiteGetSlaReport,
];

/**
 * Operations needing website ID
 */
export const websiteSlaOperationsNeedingWebsiteId = [
	WebsiteGetSlaConfigurations,
	WebsiteGetSlaBreaches,
	WebsiteGetSla,
	WebsiteGetSlaBreachesByConfiguration,
	WebsiteGetSlaReport,
];

export const websiteSlaOperationsNeedingSlaConfigurationId = [WebsiteGetSlaBreachesByConfiguration];

/**
 * SLA operations for websites (options)
 */
export const websiteSlaOperations: INodePropertyOptions[] = [
	{
		name: 'Get SLA Configurations',
		value: WebsiteGetSlaConfigurations,
		action: 'Get SLA configurations for a website',
		description: 'Retrieves all SLA configurations for a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla-configurations',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get SLA',
		value: WebsiteGetSla,
		action: 'Get website SLA configurations',
		description: 'Retrieves SLA configurations for a website (alternate route)',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla',
			},
		},
	},
	{
		name: 'Get SLA Breaches',
		value: WebsiteGetSlaBreaches,
		action: 'Get website SLA breaches',
		description:
			'Retrieves a paginated list of SLA breach records for a website, optionally filtered by date range',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get SLA Breaches By Configuration',
		value: WebsiteGetSlaBreachesByConfiguration,
		action: 'Get website SLA breaches for a configuration',
		description:
			'Retrieves paginated SLA breach records for a specific SLA configuration, optionally filtered by date range',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla-configurations/{{$parameter.slaConfigurationId}}/breaches',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get SLA Report',
		value: WebsiteGetSlaReport,
		action: 'Download website SLA report PDF',
		description:
			'Generates and downloads a customer-facing SLA report in PDF format. Language via query or Accept-Language; period defaults to current month if dates omitted.',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla/report',
				qs: qsSlaReport,
				returnFullResponse: true,
				encoding: 'arraybuffer',
			},
			output: {
				postReceive: [slaReportPostReceive],
			},
		},
	},
];

/**
 * SLA operation for websites (node properties)
 */
export const websiteSlaOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['websiteSla'],
		},
	},
	default: WebsiteGetSlaConfigurations,
	options: websiteSlaOperations,
};
