import type {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';

const operationToStatus: Record<string, string> = {
	ping_start: 'start',
	ping_success: 'success',
	ping_fail: 'fail',
};

export async function pingPostReceive(
	this: IExecuteSingleFunctions,
	_items: INodeExecutionData[],
	_responseData: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation') as string;
	const status = operationToStatus[operation] ?? operation;
	return [{ json: { success: true, status } }];
}
