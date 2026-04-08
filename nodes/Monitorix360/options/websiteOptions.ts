import type { INodeProperties } from 'n8n-workflow';

import { notificationResources, websiteResources } from '../helpers/resource';
import { notificationsOperationsNeedingWebsiteId } from '../operations/notifications/notificationsOperations';
import { websiteOperationsNeedingWebsiteId } from '../operations/website/websiteOperations';
import { websiteReportOperationsNeedingWebsiteId } from '../operations/website/websiteReportOperations';
import { websiteSlaOperationsNeedingWebsiteId } from '../operations/website/websiteSlaOperations';

export const websiteOption: INodeProperties = {
	displayName: 'Website Name or ID',
	name: 'websiteId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getWebsites',
		loadOptionsDependsOn: ['resource', 'operation', 'teamId'],
	},
	description: 'Choose a website from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	displayOptions: {
		show: {
			resource: [...websiteResources, ...notificationResources],
			operation: [
				...websiteOperationsNeedingWebsiteId,
				...websiteSlaOperationsNeedingWebsiteId,
				...websiteReportOperationsNeedingWebsiteId,
				...notificationsOperationsNeedingWebsiteId,
			],
		},
	},
};
