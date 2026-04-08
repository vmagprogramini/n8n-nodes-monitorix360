import type { INodePropertyOptions } from 'n8n-workflow';

import { serverOperationOptions } from './operations/server/serverOperations';
import { teamOperationOptions } from './operations/team/teamOperations';
import { websiteOperationOptions } from './operations/website/websiteOperations';

type OptionWithRoutingOutput = INodePropertyOptions & { output?: unknown };

/**
 * Hidden `operation` must keep routing (and output) only. If `action` / `description` stay here,
 * n8n lists them again in the side panel on top of Team/Website/Server operation fields — full
 * duplicate of every action for each resource.
 */
function prefixValuesRoutingOnly(
	resourcePrefix: 'team' | 'server' | 'website',
	options: INodePropertyOptions[],
): INodePropertyOptions[] {
	return options.map((opt) => {
		const copy = {
			...opt,
			value: `${resourcePrefix}_${String(opt.value)}`,
		} as OptionWithRoutingOutput;
		delete copy.action;
		delete copy.description;
		delete copy.builderHint;
		return copy as INodePropertyOptions;
	});
}

/** Visible dropdowns: no routing/output (declarative engine reads the hidden `operation` only). */
export function stripRoutingForVisible(options: INodePropertyOptions[]): INodePropertyOptions[] {
	return options.map((o) => {
		const copy = { ...(o as OptionWithRoutingOutput) };
		delete copy.routing;
		delete copy.output;
		return copy as INodePropertyOptions;
	});
}

/** Prefixed values for the hidden `operation` matcher; no duplicate `action` text for the UI. */
export const monitorix360HiddenOperationOptions: INodePropertyOptions[] = [
	...prefixValuesRoutingOnly('team', teamOperationOptions),
	...prefixValuesRoutingOnly('website', websiteOperationOptions),
	...prefixValuesRoutingOnly('server', serverOperationOptions),
];

export const visibleTeamOperationOptions = stripRoutingForVisible(teamOperationOptions);
export const visibleServerOperationOptions = stripRoutingForVisible(serverOperationOptions);
export const visibleWebsiteOperationOptions = stripRoutingForVisible(websiteOperationOptions);
