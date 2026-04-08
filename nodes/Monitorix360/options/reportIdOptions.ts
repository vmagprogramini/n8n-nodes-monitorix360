import type { INodeProperties } from 'n8n-workflow';

import { websiteReportOperationsNeedingReportId } from '../operations/website/websiteReportOperations';

export const reportIdOption: INodeProperties = {
	displayName: 'Report ID',
	name: 'reportId',
	type: 'string',
	required: true,
	default: '',
	description:
		'Report UUID from **Get Reports: Page Speed** or **Get Reports: Security** list endpoints.',
	displayOptions: {
		show: {
			resource: ['websiteReport'],
			operation: [...websiteReportOperationsNeedingReportId],
		},
	},
};
