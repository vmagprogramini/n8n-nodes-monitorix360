import {
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { mapTeamsFromProfileResponse } from './helpers/loadTeamOptions';
import { mapWebsiteServerListResponse } from './helpers/loadWebsiteServerOptions';
import { teamOperation } from './operations/team/teamOperations';
import { websiteOperation } from './operations/website/websiteOperations';
import { serverOperation } from './operations/server/serverOperations';
import { websiteSlaOperation } from './operations/website/websiteSlaOperations';
import { teamOption } from './options/teamOptions';
import { serverOption } from './options/serverOptions';
import { websiteOption } from './options/websiteOptions';
import { reportIdOption } from './options/reportIdOptions';
import { websiteReportOperation } from './operations/website/websiteReportOperations';
import { serverReportOperation } from './operations/server/serverReportOperations';
import { serverUsageOperation } from './operations/server/serverUsageOperations';
import { serverSlaOperation } from './operations/server/serverSlaOperations';
import { notificationsOperation } from './operations/notifications/notificationsOperations';
import { gridifyQueryProperties } from './operations/query/gridifyOperation';

const CREDENTIAL_TYPE = 'monitorix360IntegrationApi';

async function getBaseUrlAndCredentialType(this: ILoadOptionsFunctions): Promise<{
	baseUrl: string;
	credentialType: string;
}> {
	const credentials = await this.getCredentials(CREDENTIAL_TYPE);
	const baseUrl = String(credentials.baseUrl ?? '').replace(/\/$/, '');
	return { baseUrl, credentialType: CREDENTIAL_TYPE };
}

export class Monitorix implements INodeType {
	methods = {
		loadOptions: {
			async getTeams(this: ILoadOptionsFunctions) {
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: '/users/profile',
					headers: {
						Accept: 'application/json',
					},
					json: true,
				});
				return mapTeamsFromProfileResponse(response);
			},
			async getWebsites(this: ILoadOptionsFunctions) {
				const teamId = String(this.getCurrentNodeParameter('teamId') ?? '').trim();
				if (!teamId) return [];
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: `/teams/${teamId}/websites`,
					headers: {
						Accept: 'application/json',
					},
					json: true,
				});
				return mapWebsiteServerListResponse(response);
			},
			async getServers(this: ILoadOptionsFunctions) {
				const teamId = String(this.getCurrentNodeParameter('teamId') ?? '').trim();
				if (!teamId) return [];
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: `/teams/${teamId}/servers`,
					headers: {
						Accept: 'application/json',
					},
					json: true,
				});
				return mapWebsiteServerListResponse(response);
			},
		},
	};

	description: INodeTypeDescription = {
		displayName: 'Monitorix 360',
		name: 'monitorix360',
		icon: {
			light: 'file:monitorix360.svg',
			dark: 'file:monitorix360.dark.svg',
		},
		group: ['transform'],
		version: 3,
		description:
			'Call the Monitorix Web.Api — websites, servers and teams (integration API key, same credentials as Monitorix360 Zapier app).',
		defaults: {
			name: 'Monitorix 360',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: CREDENTIAL_TYPE,
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Team', value: 'team' },
					{ name: 'Website', value: 'website' },
					{ name: 'Server', value: 'server' },
					{ name: 'Website SLA', value: 'websiteSla' },
					{ name: 'Website Report', value: 'websiteReport' },
					{ name: 'Server Report', value: 'serverReport' },
					{ name: 'Server Usage', value: 'serverUsage' },
					{ name: 'Server SLA', value: 'serverSla' },
					{ name: 'Notifications', value: 'notifications' },
				],
				default: 'website',
			},		
			teamOperation,
			websiteOperation,
			serverOperation,
			websiteSlaOperation,
			websiteReportOperation,
			serverReportOperation,
			serverUsageOperation,
			serverSlaOperation,
			notificationsOperation,
			teamOption,
			websiteOption,
			serverOption,
			reportIdOption,
			...gridifyQueryProperties,
		],
	};
}
