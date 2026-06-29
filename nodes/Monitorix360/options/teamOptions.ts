import type { INodeProperties } from 'n8n-workflow';

import {
	alertResources,
	expiringSecretResources,
	monitoredTaskResources,
	notificationResources,
	serverResources,
	teamResources,
	teamTaskResources,
	webhookResources,
	websiteResources,
} from '../helpers/resource';
import { alertOperationsNeedingTeamId } from '../operations/alert/alertOperations';
import { expiringSecretOperationsNeedingTeamId } from '../operations/expiringSecret/expiringSecretOperations';
import { monitoredTaskOperationsNeedingTeamId } from '../operations/monitoredTask/monitoredTaskOperations';
import { notificationsOperationsNeedingTeamId } from '../operations/notifications/notificationsOperations';
import { serverReportOperationsNeedingTeamId } from '../operations/server/serverReportOperations';
import { serverOperationsNeedingTeamId } from '../operations/server/serverOperations';
import { serverSlaOperationsNeedingTeamId } from '../operations/server/serverSlaOperations';
import { serverUsageOperationsNeedingTeamId } from '../operations/server/serverUsageOperations';
import { teamTaskOperationsNeedingTeamId } from '../operations/task/teamTaskOperations';
import { teamOperationsNeedingTeamId } from '../operations/team/teamOperations';
import { webhookOperationsNeedingTeamId } from '../operations/webhook/webhookOperations';
import { websiteOperationsNeedingTeamId } from '../operations/website/websiteOperations';
import { websiteReportOperationsNeedingTeamId } from '../operations/website/websiteReportOperations';
import { websiteSlaOperationsNeedingTeamId } from '../operations/website/websiteSlaOperations';

const teamScopedResources = [
	...teamResources,
	...websiteResources,
	...serverResources,
	...notificationResources,
	...monitoredTaskResources,
	...expiringSecretResources,
	...alertResources,
	...teamTaskResources,
	...webhookResources,
];

const teamScopedOperations = [
	...websiteOperationsNeedingTeamId,
	...serverOperationsNeedingTeamId,
	...teamOperationsNeedingTeamId,
	...websiteSlaOperationsNeedingTeamId,
	...websiteReportOperationsNeedingTeamId,
	...serverReportOperationsNeedingTeamId,
	...serverUsageOperationsNeedingTeamId,
	...serverSlaOperationsNeedingTeamId,
	...notificationsOperationsNeedingTeamId,
	...monitoredTaskOperationsNeedingTeamId,
	...expiringSecretOperationsNeedingTeamId,
	...alertOperationsNeedingTeamId,
	...teamTaskOperationsNeedingTeamId,
	...webhookOperationsNeedingTeamId,
];

export const teamOption: INodeProperties = {
	displayName: 'Team Name or ID',
	name: 'teamId',
	type: 'options',
	required: true,
	default: '',
	typeOptions: {
		loadOptionsMethod: 'getTeams',
		loadOptionsDependsOn: ['resource', 'operation'],
	},
	description:
		'Choose a team from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	displayOptions: {
		show: {
			resource: teamScopedResources,
			operation: teamScopedOperations,
		},
		hide: {
			operation: ['team_getAll'],
		},
	},
};
