import type { INodeProperties } from 'n8n-workflow';

import { serverSlaOperationsNeedingSlaConfigurationId } from '../operations/server/serverSlaOperations';
import { monitoredTaskOperationsNeedingSlaConfigurationId } from '../operations/monitoredTask/monitoredTaskOperations';
import { websiteSlaOperationsNeedingSlaConfigurationId } from '../operations/website/websiteSlaOperations';

export const slaConfigurationIdOption: INodeProperties = {
	displayName: 'SLA Configuration ID',
	name: 'slaConfigurationId',
	type: 'string',
	required: true,
	default: '',
	description: 'SLA configuration UUID from **Get SLA Configurations**',
	displayOptions: {
		show: {
			operation: [
				...serverSlaOperationsNeedingSlaConfigurationId,
				...websiteSlaOperationsNeedingSlaConfigurationId,
				...monitoredTaskOperationsNeedingSlaConfigurationId,
			],
		},
	},
};