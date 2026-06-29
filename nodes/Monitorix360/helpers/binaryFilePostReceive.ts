import type {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';

export function createBinaryFilePostReceive(fileName: string, fallbackMimeType = 'application/octet-stream') {
	return async function binaryFilePostReceive(
		this: IExecuteSingleFunctions,
		_items: INodeExecutionData[],
		responseData: IN8nHttpFullResponse,
	): Promise<INodeExecutionData[]> {
		const body = responseData.body as Buffer;
		const contentType =
			(responseData.headers?.['content-type'] as string | undefined) ?? fallbackMimeType;
		const binaryData = await this.helpers.prepareBinaryData(body, fileName, contentType);
		return [{ json: {}, binary: { data: binaryData } }];
	};
}

export const pdfReportPostReceive = createBinaryFilePostReceive('report.pdf', 'application/pdf');

export const excelReportPostReceive = createBinaryFilePostReceive(
	'security-report.xlsx',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
);
