import type { INodeProperties } from 'n8n-workflow';

import { userOperationsNeedingOptionalTeamId } from '../operations/user/userPreferenceOperations';

export const optionalTeamIdOption: INodeProperties = {
	displayName: 'Team ID Filter',
	name: 'optionalTeamId',
	type: 'string',
	default: '',
	description: 'Optional team ID to scope user alert preferences',
	displayOptions: {
		show: {
			resource: ['userPreference'],
			operation: [...userOperationsNeedingOptionalTeamId],
		},
	},
};
