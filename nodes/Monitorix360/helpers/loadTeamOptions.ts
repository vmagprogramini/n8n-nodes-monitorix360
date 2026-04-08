import type { IDataObject, INodePropertyOptions } from 'n8n-workflow';

function mapTeamItem(team: IDataObject): INodePropertyOptions | null {
	const id = team.id ?? team.teamId ?? team.uuid;
	if (id === undefined || id === null) return null;
	const value = String(id);
	const name =
		typeof team.name === 'string' && team.name.length > 0
			? team.name
			: typeof team.title === 'string' && team.title.length > 0
				? team.title
				: typeof team.displayName === 'string' && team.displayName.length > 0
					? team.displayName
					: value;
	return {
		name,
		value,
		action: name,
		description: `Team ID: ${value}`,
	};
}

/**
 * Maps GET /users/profile JSON to dropdown options (same `teams` array as Team → Get Many).
 */
export function mapTeamsFromProfileResponse(response: unknown): INodePropertyOptions[] {
	if (!response || typeof response !== 'object') return [];
	const teams = (response as IDataObject).teams;
	if (!Array.isArray(teams)) return [];
	const options: INodePropertyOptions[] = [];
	for (const item of teams) {
		if (!item || typeof item !== 'object') continue;
		const opt = mapTeamItem(item as IDataObject);
		if (opt) options.push(opt);
	}
	return options.sort((a, b) => String(a.name).localeCompare(String(b.name)));
}
