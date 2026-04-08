import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { qsGridify, qsGridifyAndDates } from "../../helpers/routing";

const WebsiteGetReportsAvailability = "website_getReportsAvailability";
const WebsiteGetReportsCertificates = "website_getReportsCertificates";
const WebsiteGetReportsDns = "website_getReportsDns";
const WebsiteGetReportsPageSpeed = "website_getReportsPageSpeed";
const WebsiteGetReportsPageSpeedById = "website_getReportsPageSpeedById";
const WebsiteGetReportsSecurity = "website_getReportsSecurity";
const WebsiteGetReportsSecurityById = "website_getReportsSecurityById";

/**
 * Operations needing team ID
 */
export const websiteReportOperationsNeedingTeamId = [
	WebsiteGetReportsAvailability,
	WebsiteGetReportsCertificates,
	WebsiteGetReportsDns,
	WebsiteGetReportsPageSpeed,
	WebsiteGetReportsPageSpeedById,
	WebsiteGetReportsSecurity,
	WebsiteGetReportsSecurityById,
];

/**
 * Operations needing website ID
 */
export const websiteReportOperationsNeedingWebsiteId = [
	WebsiteGetReportsAvailability,
	WebsiteGetReportsCertificates,
	WebsiteGetReportsDns,
	WebsiteGetReportsPageSpeed,
	WebsiteGetReportsPageSpeedById,
	WebsiteGetReportsSecurity,
	WebsiteGetReportsSecurityById,
];

/** Page speed by ID and security by ID include reportId in the path. */
export const websiteReportOperationsNeedingReportId = [
	WebsiteGetReportsPageSpeedById,
	WebsiteGetReportsSecurityById,
];

/**
 * Report operations for websites (options)
 */
export const websiteReportOperations: INodePropertyOptions[] = [
	{
		name: 'Get Reports: Availability',
		value: WebsiteGetReportsAvailability,
		action: 'Get website availability reports',
		description: 'Retrieves the availability reports of a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/availability',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get Reports: Certificates',
		value: WebsiteGetReportsCertificates,
		action: 'Get website certificate reports',
		description: 'Retrieves the certificate reports of a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/certificates',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get Reports: DNS',
		value: WebsiteGetReportsDns,
		action: 'Get website DNS reports',
		description: 'Retrieves the DNS reports of a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/dns',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get Reports: Page Speed',
		value: WebsiteGetReportsPageSpeed,
		action: 'Get website page speed reports',
		description: 'Retrieves the page speed reports of a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/page-speed',
				qs: qsGridifyAndDates,
			},
		},
	},
	{
		name: 'Get Reports: Page Speed By ID',
		value: WebsiteGetReportsPageSpeedById,
		action: 'Get page speed report by ID',
		description: 'Retrieves detailed information about a specific page speed report by its ID for a website, including performance, seo, accessibility, best practices, and core web vitals',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/page-speed/{{$parameter.reportId}}',
			},
		},
	},
	{
		name: 'Get Reports: Security',
		value: WebsiteGetReportsSecurity,
		action: 'Get website security reports',
		description: 'Retrieves the security reports of a website',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/security',
				qs: qsGridify,
			},
		},
	},
	{
		name: 'Get Reports: Security By ID',
		value: WebsiteGetReportsSecurityById,
		action: 'Get security report by ID',
		description: 'Retrieves detailed information about a specific security report by its ID for a website, including vulnerability details and scan summary',
		routing: {
			request: {
				method: 'GET',
				url: '=/teams/{{$parameter.teamId}}/websites/{{$parameter.websiteId}}/reports/security/{{$parameter.reportId}}',
			},
		},
	},
];

/**
 * Report operation for websites (node properties)
 */
export const websiteReportOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['websiteReport'],
        },
    },
    default: WebsiteGetReportsAvailability,
    options: websiteReportOperations,
};

/**
 * Report operation options for websites (options)
 */
export const websiteReportOperationOptions: INodePropertyOptions[] = [
	...websiteReportOperations,
];