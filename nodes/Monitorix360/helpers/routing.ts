import type { IDataObject } from 'n8n-workflow';

/**
 * Omit empty optional query values so ASP.NET can bind `DateTime?` (empty string fails binding).
 * `undefined` is dropped from the request query string.
 */
const emptyToUndefined = (param: string): string => `={{ $parameter.${param} || undefined }}`;

/**
 * Optional date range query params: omit when unset; when set, force ISO string (Luxon from `dateTime` fields).
 */
const dateTimeParamToIsoOrUndefined = (param: string): string =>
	`={{ $parameter.${param} ? ($parameter.${param}.toISO ? $parameter.${param}.toISO() : String($parameter.${param})) : undefined }}`;

/** Gridify: page, pageSize, orderBy, filter */
export const qsGridify: IDataObject = {
	page: '={{ $parameter.queryPage }}',
	pageSize: '={{ $parameter.queryPageSize }}',
	orderBy: emptyToUndefined('queryOrderBy'),
	filter: emptyToUndefined('queryFilter'),
};

export const qsDateRange: IDataObject = {
	startDate: dateTimeParamToIsoOrUndefined('queryStartDate'),
	endDate: dateTimeParamToIsoOrUndefined('queryEndDate'),
};

export const qsGridifyAndDates: IDataObject = {
	...qsGridify,
	...qsDateRange,
};

export const qsResponseTimes: IDataObject = {
	...qsDateRange,
	maxDataPoints: emptyToUndefined('queryMaxDataPoints'),
};

/**
 * Serialize a node `dateTime` param for query strings. n8n passes Luxon DateTime; raw objects are
 * often dropped from the URL, which makes ASP.NET report missing required `DateTime startDate`.
 */
const dateTimeParamToIso = (param: string, fallbackExpr: string): string =>
	`={{ $parameter.${param} ? ($parameter.${param}.toISO ? $parameter.${param}.toISO() : String($parameter.${param})) : ${fallbackExpr} }}`;

/**
 * Server usage CPU/disk/memory/network: API requires non-nullable startDate/endDate.
 * Fall back to last 7 days → now when parameters are blank (same defaults as the node fields).
 */
export const qsUsageSeries: IDataObject = {
	startDate: dateTimeParamToIso('queryStartDate', '$now.minus(7, "days").toISO()'),
	endDate: dateTimeParamToIso('queryEndDate', '$now.toISO()'),
	type: emptyToUndefined('queryUsageType'),
	maxDataPoints: emptyToUndefined('queryMaxDataPoints'),
};

/** Alert occurrences: date range + limit (team / server / website notification endpoints). */
export const qsNotificationsScoped: IDataObject = {
	...qsDateRange,
	limit: emptyToUndefined('queryLimit'),
};

/** Website SLA report PDF: optional date range and language. */
export const qsSlaReport: IDataObject = {
	...qsDateRange,
	lang: emptyToUndefined('queryLang'),
};

/** Monitored task execution reports: from / to query params. */
export const qsFromToRange: IDataObject = {
	from: dateTimeParamToIsoOrUndefined('queryStartDate'),
	to: dateTimeParamToIsoOrUndefined('queryEndDate'),
};

/** SLA report PDF endpoints using start / end / lang query params. */
export const qsSlaReportPdf: IDataObject = {
	start: dateTimeParamToIsoOrUndefined('queryStartDate'),
	end: dateTimeParamToIsoOrUndefined('queryEndDate'),
	lang: emptyToUndefined('queryLang'),
};

export const qsMonitoredTaskEvents: IDataObject = {
	...qsGridify,
	...qsDateRange,
	eventTypes: emptyToUndefined('queryEventTypes'),
};

export const qsExpiringSecretEvents: IDataObject = {
	page: '={{ $parameter.queryPage }}',
	pageSize: '={{ $parameter.queryPageSize }}',
	startDate: dateTimeParamToIsoOrUndefined('queryStartDate'),
	endDate: dateTimeParamToIsoOrUndefined('queryEndDate'),
	eventTypes: emptyToUndefined('queryEventTypes'),
};

export const qsStatusHeatmap: IDataObject = {
	days: emptyToUndefined('queryDays'),
	bucket: emptyToUndefined('queryBucket'),
};

export const qsPageSpeedLast: IDataObject = {
	strategy: emptyToUndefined('queryPageSpeedStrategy'),
};

export const qsOptionalTeamId: IDataObject = {
	teamId: emptyToUndefined('optionalTeamId'),
};

export const qsWebhookServerFilter: IDataObject = {
	serverId: emptyToUndefined('serverId'),
};

export const qsWebhookWebsiteFilter: IDataObject = {
	websiteId: emptyToUndefined('websiteId'),
};

/** Monitored task execution report PDF: from / to / lang. */
export const qsReportPdf: IDataObject = {
	...qsFromToRange,
	lang: emptyToUndefined('queryLang'),
};
