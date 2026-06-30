import type { IHttpRequestMethods, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { pingPostReceive } from '../../helpers/pingPostReceive';

const dynamicHttpMethod = '={{$parameter.httpMethod}}' as IHttpRequestMethods;

const pingBody =
	'={{ $parameter.httpMethod === "POST" && $parameter.sendJsonBody ? $parameter.jsonBody : undefined }}';

const pingStart: INodePropertyOptions = {
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
};

const pingSuccess: INodePropertyOptions = {
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
};

const pingFail: INodePropertyOptions = {
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
};

export const pingOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['ping'],
		},
	},
	default: 'ping_start',
	options: [pingStart, pingSuccess, pingFail],
};
