import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { qsGridify, qsGridifyAndDates } from "../../helpers/routing";

const WebsiteGetSlaConfigurations = "website_getSlaConfigurations";
const WebsiteGetSlaBreaches = "website_getSlaBreaches";

/**
 * Operations needing team ID
 */
export const websiteSlaOperationsNeedingTeamId = [
	WebsiteGetSlaConfigurations,
	WebsiteGetSlaBreaches,
]

/**
 * Operations needing website ID
 */
export const websiteSlaOperationsNeedingWebsiteId = [
	WebsiteGetSlaConfigurations,
	WebsiteGetSlaBreaches,
]

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
		name: 'Get SLA Breaches',
		value: WebsiteGetSlaBreaches,
		action: 'Get website SLA breaches',
		description: 'Retrieves a paginated list of SLA breach records for a website, optionally filtered by date range',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/sla/breaches',
				qs: qsGridifyAndDates,
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