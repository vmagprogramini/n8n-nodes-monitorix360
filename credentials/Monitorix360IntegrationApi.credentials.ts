import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class Monitorix360IntegrationApi implements ICredentialType {
	name = 'monitorix360IntegrationApi';

	displayName = 'Monitorix360 Integration API';

	icon: Icon = {
		light: 'file:../nodes/Monitorix360/monitorix360.svg',
		dark: 'file:../nodes/Monitorix360/monitorix360.dark.svg',
	};

	documentationUrl =
		'https://github.com/vmagprogramini/n8n-nodes-monitorix360#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.dev.monitorix.com',
			placeholder: 'https://api.dev.monitorix.com',
			description:
				'Root URL of the Api instance (no trailing slash).',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Integration API key sent as Authorization: Monitorix-Integration followed by the key value.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Monitorix-Integration {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/users/profile',
			method: 'GET',
		},
	};
}
