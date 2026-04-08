import type { IDataObject, INodePropertyOptions } from 'n8n-workflow';

function mapWebsiteOrServerItem(item: IDataObject): INodePropertyOptions | null {
	const id = item.id ?? item.websiteId ?? item.serverId ?? item.uuid;
	if (id === undefined || id === null) return null;
	const value = String(id);
	const name =
		typeof item.name === 'string' && item.name.length > 0
			? item.name
			: typeof item.title === 'string' && item.title.length > 0
				? item.title
				: typeof item.displayName === 'string' && item.displayName.length > 0
					? item.displayName
					: typeof item.hostname === 'string' && item.hostname.length > 0
						? item.hostname
						: typeof item.url === 'string' && item.url.length > 0
							? item.url
							: typeof item.domain === 'string' && item.domain.length > 0
								? item.domain
								: value;
	const urlHint =
		typeof item.url === 'string' && item.url.length > 0
			? item.url
			: typeof item.hostname === 'string' && item.hostname.length > 0
				? item.hostname
				: undefined;
	return {
		name,
		value,
		action: name,
		description: urlHint ? `${urlHint} (${value})` : `ID: ${value}`,
	};
}

function extractListItems(response: unknown): unknown[] {
	if (Array.isArray(response)) return response;
	if (!response || typeof response !== 'object') return [];
	const o = response as IDataObject;
	for (const key of ['items', 'data', 'results', 'records', 'rows'] as const) {
		const v = o[key];
		if (Array.isArray(v)) return v;
	}
	const results = o.results;
	if (results && typeof results === 'object') {
		const ro = results as IDataObject;
		for (const key of ['items', 'data', 'records'] as const) {
			const v = ro[key];
			if (Array.isArray(v)) return v;
		}
	}
	return [];
}

/**
 * Maps GET /teams/{teamId}/websites or /servers list JSON to dropdown options.
 */
export function mapWebsiteServerListResponse(response: unknown): INodePropertyOptions[] {
	const items = extractListItems(response);
	const options: INodePropertyOptions[] = [];
	for (const item of items) {
		if (!item || typeof item !== 'object') continue;
		const opt = mapWebsiteOrServerItem(item as IDataObject);
		if (opt) options.push(opt);
	}
	return options.sort((a, b) => String(a.name).localeCompare(String(b.name)));
}
