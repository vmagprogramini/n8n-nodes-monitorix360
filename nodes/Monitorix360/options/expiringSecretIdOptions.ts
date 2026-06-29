import type { INodeProperties } from 'n8n-workflow';

import { expiringSecretOperationsNeedingExpiringSecretId } from '../operations/expiringSecret/expiringSecretOperations';

export const expiringSecretIdOption: INodeProperties = {
	displayName: 'Expiring Secret Name or ID',
	name: 'expiringSecretId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getExpiringSecrets',
		loadOptionsDependsOn: ['resource', 'operation', 'teamId'],
	},
	description:
		'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	displayOptions: {
		show: {
			resource: ['expiringSecret'],
			operation: [...expiringSecretOperationsNeedingExpiringSecretId],
		},
	},
};
