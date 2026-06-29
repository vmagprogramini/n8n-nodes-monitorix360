import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

import { qsOptionalTeamId } from '../../helpers/routing';

const UserGetExpiringSecretAlertPreferences = 'user_getExpiringSecretAlertPreferences';
const UserGetMonitoredTaskAlertPreferences = 'user_getMonitoredTaskAlertPreferences';
const UserGetServerAlertPreferences = 'user_getServerAlertPreferences';
const UserGetWebsiteAlertPreferences = 'user_getWebsiteAlertPreferences';

export const userOperationsNeedingOptionalTeamId = [
	UserGetExpiringSecretAlertPreferences,
	UserGetMonitoredTaskAlertPreferences,
];

export const userPreferenceOperations: INodePropertyOptions[] = [
	{
		name: 'Get Expiring Secret Alert Preferences',
		value: UserGetExpiringSecretAlertPreferences,
		action: 'Get expiring secret alert preferences',
		description: 'Returns user alert preferences for expiring secrets; optional team filter',
		routing: {
			request: {
				method: 'GET',
				url: '/users/me/expiring-secret-alert-preferences',
				qs: qsOptionalTeamId,
			},
		},
	},
	{
		name: 'Get Monitored Task Alert Preferences',
		value: UserGetMonitoredTaskAlertPreferences,
		action: 'Get monitored task alert preferences',
		description: 'Returns user alert preferences for monitored tasks; optional team filter',
		routing: {
			request: {
				method: 'GET',
				url: '/users/me/monitored-task-alert-preferences',
				qs: qsOptionalTeamId,
			},
		},
	},
	{
		name: 'Get Server Alert Preferences',
		value: UserGetServerAlertPreferences,
		action: 'Get server alert preferences',
		description: 'Returns the authenticated user server alert preferences',
		routing: {
			request: {
				method: 'GET',
				url: '/users/server-alert-preferences',
			},
		},
	},
	{
		name: 'Get Website Alert Preferences',
		value: UserGetWebsiteAlertPreferences,
		action: 'Get website alert preferences',
		description: 'Returns the authenticated user website alert preferences',
		routing: {
			request: {
				method: 'GET',
				url: '/users/website-alert-preferences',
			},
		},
	},
];

export const userPreferenceOperation: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['userPreference'],
		},
	},
	default: UserGetExpiringSecretAlertPreferences,
	options: userPreferenceOperations,
};
