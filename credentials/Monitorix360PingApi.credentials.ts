import type {
	IAuthenticateGeneric,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class Monitorix360PingApi implements ICredentialType {
	name = 'monitorix360PingApi';

	displayName = 'Monitorix360 Ping API';

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
			default: 'https://api.dev.monitorix360.com',
			placeholder: 'https://api.dev.monitorix360.com',
			description: 'Root URL of the API instance (no trailing slash).',
		},
		{
			displayName: 'Ping Secret',
			name: 'pingSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Optional secret sent as X-Monitorix-Ping-Secret when the monitored task requires ping authentication.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Monitorix-Ping-Secret': '={{$credentials.pingSecret || undefined}}',
			},
		},
	};
}
