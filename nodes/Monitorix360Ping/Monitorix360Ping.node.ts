import {
	NodeConnectionTypes,
	type IHttpRequestMethods,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { pingPostReceive } from './helpers/pingPostReceive';

const CREDENTIAL_TYPE = 'monitorix360PingApi';

const dynamicHttpMethod = '={{$parameter.httpMethod}}' as IHttpRequestMethods;

const pingBody =
	'={{ $parameter.httpMethod === "POST" && $parameter.sendJsonBody ? $parameter.jsonBody : undefined }}';

export class Monitorix360Ping implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Monitorix 360 Ping',
		name: 'monitorix360Ping',
		icon: {
			light: 'file:../Monitorix360/monitorix360.svg',
			dark: 'file:../Monitorix360/monitorix360.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description:
			'Send monitored-task heartbeat pings (start, success, or fail) to the Monitorix Web.Api ping endpoints.',
		defaults: {
			name: 'Monitorix 360 Ping',
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Start',
						value: 'ping_start',
						action: 'Record task start ping',
						description:
							'POST or GET /ping/{token}/start. POST may include an optional JSON object or array body (max 4 KB).',
						routing: {
							request: {
								method: dynamicHttpMethod,
								url: '=/ping/{{$parameter.pingToken}}/start',
								body: pingBody,
							},
							output: {
								postReceive: [pingPostReceive],
							},
						},
					},
					{
						name: 'Success',
						value: 'ping_success',
						action: 'Record task success ping',
						description:
							'POST or GET /ping/{token}/success. POST may include an optional JSON object or array body (max 4 KB).',
						routing: {
							request: {
								method: dynamicHttpMethod,
								url: '=/ping/{{$parameter.pingToken}}/success',
								body: pingBody,
							},
							output: {
								postReceive: [pingPostReceive],
							},
						},
					},
					{
						name: 'Fail',
						value: 'ping_fail',
						action: 'Record task failure ping',
						description:
							'POST or GET /ping/{token}/fail. POST may include an optional JSON object or array body (max 4 KB).',
						routing: {
							request: {
								method: dynamicHttpMethod,
								url: '=/ping/{{$parameter.pingToken}}/fail',
								body: pingBody,
							},
							output: {
								postReceive: [pingPostReceive],
							},
						},
					},
				],
				default: 'ping_start',
			},
			{
				displayName: 'Ping Token',
				name: 'pingToken',
				type: 'string',
				required: true,
				default: '',
				description: 'Monitored-task ping token (path segment in /ping/{token}/...)',
			},
			{
				displayName: 'HTTP Method',
				name: 'httpMethod',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'POST', value: 'POST' },
					{ name: 'GET', value: 'GET' },
				],
				default: 'POST',
				description:
					'POST is recommended. Optional JSON body (object or array) is only sent when Send JSON Body is enabled.',
			},
			{
				displayName: 'Send JSON Body',
				name: 'sendJsonBody',
				type: 'boolean',
				default: false,
				description: 'Whether to include a JSON body on the POST request',
				displayOptions: {
					show: {
						httpMethod: ['POST'],
					},
				},
			},
			{
				displayName: 'JSON Body',
				name: 'jsonBody',
				type: 'json',
				default: {},
				description:
					'Optional caller metadata as a JSON object or array (max 4 KB). Sent only when Send JSON Body is enabled.',
				displayOptions: {
					show: {
						httpMethod: ['POST'],
						sendJsonBody: [true],
					},
				},
			},
		],
	};
}
