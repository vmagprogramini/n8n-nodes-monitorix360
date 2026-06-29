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
	items: INodeExecutionData[],
	responseData: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	void items;
	void responseData;
	const operation = this.getNodeParameter('operation') as string;
	const status = operationToStatus[operation] ?? operation;
	return [{ json: { success: true, status } }];
}
