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
import { slaConfigurationIdOption } from './options/slaConfigurationIdOptions';
import { websiteReportOperation } from './operations/website/websiteReportOperations';
import { serverReportOperation } from './operations/server/serverReportOperations';
import { serverUsageOperation } from './operations/server/serverUsageOperations';
import { serverSlaOperation } from './operations/server/serverSlaOperations';
import { notificationsOperation } from './operations/notifications/notificationsOperations';
import { gridifyQueryProperties } from './operations/query/gridifyOperation';
import { userPreferenceOperation } from './operations/user/userPreferenceOperations';
import { monitoredTaskOperation } from './operations/monitoredTask/monitoredTaskOperations';
import { expiringSecretOperation } from './operations/expiringSecret/expiringSecretOperations';
import { alertOperation } from './operations/alert/alertOperations';
import { teamTaskOperation } from './operations/task/teamTaskOperations';
import { webhookOperation } from './operations/webhook/webhookOperations';
import { optionalTeamIdOption } from './options/optionalTeamIdOptions';
import { monitoredTaskIdOption } from './options/monitoredTaskIdOptions';
import { expiringSecretIdOption } from './options/expiringSecretIdOptions';
import { taskIdOption } from './options/taskIdOptions';
import { webhookIdOption } from './options/webhookIdOptions';
import { webhookServerFilterOption } from './options/webhookServerFilterOptions';
import { webhookWebsiteFilterOption } from './options/webhookWebsiteFilterOptions';

const CREDENTIAL_TYPE = 'monitorix360IntegrationApi';

async function getBaseUrlAndCredentialType(this: ILoadOptionsFunctions): Promise<{
	baseUrl: string;
	credentialType: string;
}> {
	const credentials = await this.getCredentials(CREDENTIAL_TYPE);
	const baseUrl = String(credentials.baseUrl ?? '').replace(/\/$/, '');
	return { baseUrl, credentialType: CREDENTIAL_TYPE };
}

export class Monitorix360 implements INodeType {
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
			async getMonitoredTasks(this: ILoadOptionsFunctions) {
				const teamId = String(this.getCurrentNodeParameter('teamId') ?? '').trim();
				if (!teamId) return [];
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: `/teams/${teamId}/monitored-tasks`,
					headers: {
						Accept: 'application/json',
					},
					json: true,
				});
				return mapWebsiteServerListResponse(response);
			},
			async getExpiringSecrets(this: ILoadOptionsFunctions) {
				const teamId = String(this.getCurrentNodeParameter('teamId') ?? '').trim();
				if (!teamId) return [];
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: `/teams/${teamId}/expiring-secrets`,
					headers: {
						Accept: 'application/json',
					},
					json: true,
				});
				return mapWebsiteServerListResponse(response);
			},
			async getTeamTasks(this: ILoadOptionsFunctions) {
				const teamId = String(this.getCurrentNodeParameter('teamId') ?? '').trim();
				if (!teamId) return [];
				const { baseUrl, credentialType } = await getBaseUrlAndCredentialType.call(this);
				const response = await this.helpers.httpRequestWithAuthentication.call(this, credentialType, {
					method: 'GET',
					baseURL: baseUrl,
					url: `/teams/${teamId}/tasks`,
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
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
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
					{ name: 'Alert', value: 'alert' },
					{ name: 'Expiring Secret', value: 'expiringSecret' },
					{ name: 'Monitored Task', value: 'monitoredTask' },
					{ name: 'Notification', value: 'notifications' },
					{ name: 'Server', value: 'server' },
					{ name: 'Server Report', value: 'serverReport' },
					{ name: 'Server SLA', value: 'serverSla' },
					{ name: 'Server Usage', value: 'serverUsage' },
					{ name: 'Team', value: 'team' },
					{ name: 'Team Task', value: 'teamTask' },
					{ name: 'User Preference', value: 'userPreference' },
					{ name: 'Webhook', value: 'webhook' },
					{ name: 'Website', value: 'website' },
					{ name: 'Website Report', value: 'websiteReport' },
					{ name: 'Website SLA', value: 'websiteSla' },
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
			userPreferenceOperation,
			monitoredTaskOperation,
			expiringSecretOperation,
			alertOperation,
			teamTaskOperation,
			webhookOperation,
			teamOption,
			websiteOption,
			serverOption,
			reportIdOption,
			slaConfigurationIdOption,
			optionalTeamIdOption,
			monitoredTaskIdOption,
			expiringSecretIdOption,
			taskIdOption,
			webhookIdOption,
			webhookServerFilterOption,
			webhookWebsiteFilterOption,
			...gridifyQueryProperties,
		],
	};
}
