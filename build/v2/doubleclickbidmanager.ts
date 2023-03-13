// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * DoubleClick Bid Manager API Client for Deno
 * ===========================================
 * 
 * DoubleClick Bid Manager API allows users to manage and create campaigns and reports.
 * 
 * Docs: https://developers.google.com/bid-manager/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * DoubleClick Bid Manager API allows users to manage and create campaigns and
 * reports.
 */
export class DoubleClickBidManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://doubleclickbidmanager.googleapis.com/v2/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a query.
   *
   */
  async queriesCreate(req: Query): Promise<Query> {
    const url = new URL(`${this.#baseUrl}queries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Query;
  }

  /**
   * Deletes a query as well as the associated reports.
   *
   * @param queryId Required. ID of query to delete.
   */
  async queriesDelete(queryId: bigint): Promise<void> {
    queryId = String(queryId);
    const url = new URL(`${this.#baseUrl}queries/${ queryId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a query.
   *
   * @param queryId Required. ID of query to retrieve.
   */
  async queriesGet(queryId: bigint): Promise<Query> {
    queryId = String(queryId);
    const url = new URL(`${this.#baseUrl}queries/${ queryId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Query;
  }

  /**
   * Lists queries created by the current user.
   *
   */
  async queriesList(opts: QueriesListOptions = {}): Promise<ListQueriesResponse> {
    const url = new URL(`${this.#baseUrl}queries`);
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListQueriesResponse;
  }

  /**
   * Retrieves a report.
   *
   * @param queryId Required. ID of the query the report is associated with.
   * @param reportId Required. ID of the report to retrieve.
   */
  async queriesReportsGet(queryId: bigint, reportId: bigint): Promise<Report> {
    queryId = String(queryId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}queries/${ queryId }/reports/${ reportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Report;
  }

  /**
   * Lists reports associated with a query.
   *
   * @param queryId Required. ID of the query with which the reports are associated.
   */
  async queriesReportsList(queryId: bigint, opts: QueriesReportsListOptions = {}): Promise<ListReportsResponse> {
    queryId = String(queryId);
    const url = new URL(`${this.#baseUrl}queries/${ queryId }/reports`);
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListReportsResponse;
  }

  /**
   * Runs a stored query to generate a report.
   *
   * @param queryId Required. ID of query to run.
   */
  async queriesRun(queryId: bigint, req: RunQueryRequest, opts: QueriesRunOptions = {}): Promise<Report> {
    queryId = String(queryId);
    const url = new URL(`${this.#baseUrl}queries/${ queryId }:run`);
    if (opts.synchronous !== undefined) {
      url.searchParams.append("synchronous", String(opts.synchronous));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Report;
  }
}

/**
 * A channel grouping defines a set of rules that can be used to categorize
 * events in a path report.
 */
export interface ChannelGrouping {
  /**
   * The name to apply to an event that does not match any of the rules in the
   * channel grouping.
   */
  fallbackName?: string;
  /**
   * Channel Grouping name.
   */
  name?: string;
  /**
   * Rules within Channel Grouping. There is a limit of 100 rules that can be
   * set per channel grouping.
   */
  rules?: Rule[];
}

/**
 * Report data range.
 */
export interface DataRange {
  /**
   * The ending date for the data that is shown in the report. Note,
   * `customEndDate` is required if `range` is `CUSTOM_DATES` and ignored
   * otherwise.
   */
  customEndDate?: Date;
  /**
   * The starting data for the data that is shown in the report. Note,
   * `customStartDate` is required if `range` is `CUSTOM_DATES` and ignored
   * otherwise.
   */
  customStartDate?: Date;
  /**
   * Report data range used to generate the report.
   */
  range?:  | "RANGE_UNSPECIFIED" | "CUSTOM_DATES" | "CURRENT_DAY" | "PREVIOUS_DAY" | "WEEK_TO_DATE" | "MONTH_TO_DATE" | "QUARTER_TO_DATE" | "YEAR_TO_DATE" | "PREVIOUS_WEEK" | "PREVIOUS_MONTH" | "PREVIOUS_QUARTER" | "PREVIOUS_YEAR" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS" | "LAST_365_DAYS" | "ALL_TIME" | "LAST_14_DAYS" | "LAST_60_DAYS";
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface Date {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
}

/**
 * DisjunctiveMatchStatement that OR's all contained filters.
 */
export interface DisjunctiveMatchStatement {
  /**
   * Filters. There is a limit of 100 filters that can be set per disjunctive
   * match statement.
   */
  eventFilters?: EventFilter[];
}

/**
 * Defines the type of filter to be applied to the path, a DV360 event
 * dimension filter.
 */
export interface EventFilter {
  /**
   * Filter on a dimension.
   */
  dimensionFilter?: PathQueryOptionsFilter;
}

/**
 * Filter used to match traffic data in your report.
 */
export interface FilterPair {
  /**
   * Filter type.
   */
  type?: string;
  /**
   * Filter value.
   */
  value?: string;
}

export interface ListQueriesResponse {
  /**
   * A token, which can be sent as page_token to retrieve the next page of
   * queries. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of queries.
   */
  queries?: Query[];
}

export interface ListReportsResponse {
  /**
   * A token, which can be sent as page_token to retrieve the next page of
   * reports. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Retrieved reports.
   */
  reports?: Report[];
}

/**
 * Additional query options.
 */
export interface Options {
  /**
   * Set to true and filter your report by `FILTER_INSERTION_ORDER` or
   * `FILTER_LINE_ITEM` to include data for audience lists specifically targeted
   * by those items.
   */
  includeOnlyTargetedUserLists?: boolean;
  /**
   * Options that contain Path Filters and Custom Channel Groupings.
   */
  pathQueryOptions?: PathQueryOptions;
}

/**
 * Parameters of a query or report.
 */
export interface Parameters {
  /**
   * Filters used to match traffic data in your report.
   */
  filters?: FilterPair[];
  /**
   * Data is grouped by the filters listed in this field.
   */
  groupBys?: string[];
  /**
   * Metrics to include as columns in your report.
   */
  metrics?: string[];
  /**
   * Additional query options.
   */
  options?: Options;
  /**
   * The type of the report. The type of the report will dictate what
   * dimesions, filters, and metrics can be used.
   */
  type?:  | "REPORT_TYPE_UNSPECIFIED" | "STANDARD" | "INVENTORY_AVAILABILITY" | "AUDIENCE_COMPOSITION" | "FLOODLIGHT" | "YOUTUBE" | "GRP" | "YOUTUBE_PROGRAMMATIC_GUARANTEED" | "REACH" | "UNIQUE_REACH_AUDIENCE" | "FULL_PATH" | "PATH_ATTRIBUTION";
}

/**
 * Path filters specify which paths to include in a report. A path is the
 * result of combining DV360 events based on User ID to create a workflow of
 * users' actions. When a path filter is set, the resulting report will only
 * include paths that match the specified event at the specified position. All
 * other paths will be excluded.
 */
export interface PathFilter {
  /**
   * Filter on an event to be applied to some part of the path.
   */
  eventFilters?: EventFilter[];
  /**
   * The position of the path the filter should match to (first, last, or any
   * event in path).
   */
  pathMatchPosition?:  | "PATH_MATCH_POSITION_UNSPECIFIED" | "ANY" | "FIRST" | "LAST";
}

/**
 * Path Query Options for Report Options.
 */
export interface PathQueryOptions {
  /**
   * Custom Channel Groupings.
   */
  channelGrouping?: ChannelGrouping;
  /**
   * Path Filters. There is a limit of 100 path filters that can be set per
   * report.
   */
  pathFilters?: PathFilter[];
}

/**
 * Dimension filter on path events.
 */
export interface PathQueryOptionsFilter {
  /**
   * Dimension the filter is applied to.
   */
  filter?: string;
  /**
   * Match logic of the filter.
   */
  match?:  | "UNKNOWN" | "EXACT" | "PARTIAL" | "BEGINS_WITH" | "WILDCARD_EXPRESSION";
  /**
   * Values to filter on.
   */
  values?: string[];
}

/**
 * Additional options for DoubleClickBidManager#queriesList.
 */
export interface QueriesListOptions {
  /**
   * Name of a field used to order results. The default sorting order is
   * ascending. To specify descending order for a field, append a " desc"
   * suffix. For example "metadata.title desc". Sorting is only supported for
   * the following fields: * `queryId` * `metadata.title`
   */
  orderBy?: string;
  /**
   * Maximum number of results per page. Must be between `1` and `100`.
   * Defaults to `100` if unspecified.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous list call. Provide this to retrieve
   * the subsequent page of queries.
   */
  pageToken?: string;
}

/**
 * Additional options for DoubleClickBidManager#queriesReportsList.
 */
export interface QueriesReportsListOptions {
  /**
   * Name of a field used to order results. The default sorting order is
   * ascending. To specify descending order for a field, append a " desc"
   * suffix. For example "key.reportId desc". Sorting is only supported for the
   * following fields: * `key.reportId`
   */
  orderBy?: string;
  /**
   * Maximum number of results per page. Must be between `1` and `100`.
   * Defaults to `100` if unspecified.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous list call. Provide this to retrieve
   * the subsequent page of reports.
   */
  pageToken?: string;
}

/**
 * Additional options for DoubleClickBidManager#queriesRun.
 */
export interface QueriesRunOptions {
  /**
   * Whether the query should be run synchronously. When true, this method will
   * not return until the query has finished running. When false or not
   * specified, this method will return immediately.
   */
  synchronous?: boolean;
}

/**
 * Represents a query.
 */
export interface Query {
  /**
   * Query metadata.
   */
  metadata?: QueryMetadata;
  /**
   * Query parameters.
   */
  params?: Parameters;
  /**
   * Output only. Query ID.
   */
  readonly queryId?: bigint;
  /**
   * Information on how often and when to run a query. If `ONE_TIME` is set to
   * the frequency field, the query will only be run at the time of creation.
   */
  schedule?: QuerySchedule;
}

/**
 * Query metadata.
 */
export interface QueryMetadata {
  /**
   * Range of report data. All reports will be based on the same time zone as
   * used by the advertiser.
   */
  dataRange?: DataRange;
  /**
   * Format of the generated report.
   */
  format?:  | "FORMAT_UNSPECIFIED" | "CSV" | "XLSX";
  /**
   * Whether to send an email notification when a report is ready. Defaults to
   * false.
   */
  sendNotification?: boolean;
  /**
   * List of email addresses which are sent email notifications when the report
   * is finished. Separate from send_notification.
   */
  shareEmailAddress?: string[];
  /**
   * Query title. It is used to name the reports generated from this query.
   */
  title?: string;
}

/**
 * Information on when and how frequently to run a query.
 */
export interface QuerySchedule {
  /**
   * Date to periodically run the query until. Not applicable to `ONE_TIME`
   * frequency.
   */
  endDate?: Date;
  /**
   * How often the query is run.
   */
  frequency?:  | "FREQUENCY_UNSPECIFIED" | "ONE_TIME" | "DAILY" | "WEEKLY" | "SEMI_MONTHLY" | "MONTHLY" | "QUARTERLY" | "YEARLY";
  /**
   * Canonical timezone code for report generation time. Defaults to
   * `America/New_York`.
   */
  nextRunTimezoneCode?: string;
  /**
   * When to start running the query. Not applicable to `ONE_TIME` frequency.
   */
  startDate?: Date;
}

/**
 * Represents a report.
 */
export interface Report {
  /**
   * Key used to identify a report.
   */
  key?: ReportKey;
  /**
   * Report metadata.
   */
  metadata?: ReportMetadata;
  /**
   * Report parameters.
   */
  params?: Parameters;
}

/**
 * Key used to identify a report.
 */
export interface ReportKey {
  /**
   * Output only. Query ID.
   */
  readonly queryId?: bigint;
  /**
   * Output only. Report ID.
   */
  readonly reportId?: bigint;
}

/**
 * Report metadata.
 */
export interface ReportMetadata {
  /**
   * Output only. The path to the location in Google Cloud Storage where the
   * report is stored.
   */
  readonly googleCloudStoragePath?: string;
  /**
   * The ending time for the data that is shown in the report.
   */
  reportDataEndDate?: Date;
  /**
   * The starting time for the data that is shown in the report.
   */
  reportDataStartDate?: Date;
  /**
   * Report status.
   */
  status?: ReportStatus;
}

/**
 * Report status.
 */
export interface ReportStatus {
  /**
   * Output only. The time when this report either completed successfully or
   * failed.
   */
  readonly finishTime?: Date;
  /**
   * The file type of the report.
   */
  format?:  | "FORMAT_UNSPECIFIED" | "CSV" | "XLSX";
  /**
   * Output only. The state of the report.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "QUEUED" | "RUNNING" | "DONE" | "FAILED";
}

/**
 * A Rule defines a name, and a boolean expression in [conjunctive normal form]
 * (http://mathworld.wolfram.com/ConjunctiveNormalForm.html){.external} that can
 * be applied to a path event to determine if that name should be applied.
 */
export interface Rule {
  /**
   * DisjunctiveMatchStatements within a Rule. DisjunctiveMatchStatement OR's
   * all contained filters.
   */
  disjunctiveMatchStatements?: DisjunctiveMatchStatement[];
  /**
   * Rule name.
   */
  name?: string;
}

/**
 * Request to run a stored query to generate a report.
 */
export interface RunQueryRequest {
  /**
   * Report data range used to generate the report. If unspecified, the
   * original parent query's data range is used.
   */
  dataRange?: DataRange;
}