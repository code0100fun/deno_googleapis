// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Business Calls API Client for Deno
 * ==============================================
 * 
 * The My Business Business Calls API manages business calls information of a location on Google and collect insights like the number of missed calls to their location. Additional information about Business calls can be found at https://support.google.com/business/answer/9688285?p=call_history. If the Google Business Profile links to a Google Ads account and call history is turned on, calls that last longer than a specific time, and that can be attributed to an ad interaction, will show in the linked Google Ads account under the "Calls from Ads" conversion. If smart bidding and call conversions are used in the optimization strategy, there could be a change in ad spend. Learn more about smart bidding. To view and perform actions on a location's calls, you need to be a `OWNER`, `CO_OWNER` or `MANAGER` of the location. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Business Calls API manages business calls information of a
 * location on Google and collect insights like the number of missed calls to
 * their location. Additional information about Business calls can be found at
 * https://support.google.com/business/answer/9688285?p=call_history. If the
 * Google Business Profile links to a Google Ads account and call history is
 * turned on, calls that last longer than a specific time, and that can be
 * attributed to an ad interaction, will show in the linked Google Ads account
 * under the "Calls from Ads" conversion. If smart bidding and call conversions
 * are used in the optimization strategy, there could be a change in ad spend.
 * Learn more about smart bidding. To view and perform actions on a location's
 * calls, you need to be a `OWNER`, `CO_OWNER` or `MANAGER` of the location.
 * Note - If you have a quota of 0 after enabling the API, please request for
 * GBP API access.
 */
export class MyBusinessBusinessCalls {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessbusinesscalls.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns insights for Business calls for a location.
   *
   * @param parent Required. The parent location to fetch calls insights for. Format: locations/{location_id}
   */
  async locationsBusinesscallsinsightsList(parent: string, opts: LocationsBusinesscallsinsightsListOptions = {}): Promise<ListBusinessCallsInsightsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/businesscallsinsights`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as ListBusinessCallsInsightsResponse;
  }

  /**
   * Returns the Business calls settings resource for the given location.
   *
   * @param name Required. The BusinessCallsSettings to get. The `name` field is used to identify the business call settings to get. Format: locations/{location_id}/businesscallssettings.
   */
  async locationsGetBusinesscallssettings(name: string): Promise<BusinessCallsSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBusinessCallsSettings(data);
  }

  /**
   * Updates the Business call settings for the specified location.
   *
   * @param name Required. The resource name of the calls settings. Format: locations/{location}/businesscallssettings
   */
  async locationsUpdateBusinesscallssettings(name: string, req: BusinessCallsSettings, opts: LocationsUpdateBusinesscallssettingsOptions = {}): Promise<BusinessCallsSettings> {
    req = serializeBusinessCallsSettings(req);
    opts = serializeLocationsUpdateBusinesscallssettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeBusinessCallsSettings(data);
  }
}

/**
 * Metrics aggregated over the input time range.
 */
export interface AggregateMetrics {
  /**
   * Total count of answered calls.
   */
  answeredCallsCount?: number;
  /**
   * End date for this metric.
   */
  endDate?: Date;
  /**
   * A list of metrics by hour of day.
   */
  hourlyMetrics?: HourlyMetrics[];
  /**
   * Total count of missed calls.
   */
  missedCallsCount?: number;
  /**
   * Date for this metric. If metric is monthly, only year and month are used.
   */
  startDate?: Date;
  /**
   * A list of metrics by day of week.
   */
  weekdayMetrics?: WeekDayMetrics[];
}

/**
 * Insights for calls made to a location.
 */
export interface BusinessCallsInsights {
  /**
   * Metric for the time range based on start_date and end_date.
   */
  aggregateMetrics?: AggregateMetrics;
  /**
   * The metric for which the value applies.
   */
  metricType?:  | "METRIC_TYPE_UNSPECIFIED" | "AGGREGATE_COUNT";
  /**
   * Required. The resource name of the calls insights. Format:
   * locations/{location}/businesscallsinsights
   */
  name?: string;
}

/**
 * Business calls settings for a location.
 */
export interface BusinessCallsSettings {
  /**
   * Required. The state of this location's enrollment in Business calls.
   */
  callsState?:  | "CALLS_STATE_UNSPECIFIED" | "ENABLED" | "DISABLED";
  /**
   * Input only. Time when the end user provided consent to the API user to
   * enable business calls.
   */
  consentTime?: Date;
  /**
   * Required. The resource name of the calls settings. Format:
   * locations/{location}/businesscallssettings
   */
  name?: string;
}

function serializeBusinessCallsSettings(data: any): BusinessCallsSettings {
  return {
    ...data,
    consentTime: data["consentTime"] !== undefined ? data["consentTime"].toISOString() : undefined,
  };
}

function deserializeBusinessCallsSettings(data: any): BusinessCallsSettings {
  return {
    ...data,
    consentTime: data["consentTime"] !== undefined ? new Date(data["consentTime"]) : undefined,
  };
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
 * Metrics for an hour.
 */
export interface HourlyMetrics {
  /**
   * Hour of the day. Allowed values are 0-23.
   */
  hour?: number;
  /**
   * Total count of missed calls for this hour.
   */
  missedCallsCount?: number;
}

/**
 * Response message for ListBusinessCallsInsights.
 */
export interface ListBusinessCallsInsightsResponse {
  /**
   * A collection of business calls insights for the location.
   */
  businessCallsInsights?: BusinessCallsInsights[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages. Some of the
   * metric_types (e.g, AGGREGATE_COUNT) returns a single page. For these
   * metrics, the next_page_token will be empty.
   */
  nextPageToken?: string;
}

/**
 * Additional options for
 * MyBusinessBusinessCalls#locationsBusinesscallsinsightsList.
 */
export interface LocationsBusinesscallsinsightsListOptions {
  /**
   * Optional. A filter constraining the calls insights to return. The response
   * includes only entries that match the filter. If the MetricType is not
   * provided, AGGREGATE_COUNT is returned. If no end_date is provided, the last
   * date for which data is available is used. If no start_date is provided, we
   * will default to the first date for which data is available, which is
   * currently 6 months. If start_date is before the date when data is
   * available, data is returned starting from the date when it is available. At
   * this time we support following filters. 1. start_date="DATE" where date is
   * in YYYY-MM-DD format. 2. end_date="DATE" where date is in YYYY-MM-DD
   * format. 3. metric_type=XYZ where XYZ is a valid MetricType. 4.
   * Conjunctions(AND) of all of the above. e.g., "start_date=2021-08-01 AND
   * end_date=2021-08-10 AND metric_type=AGGREGATE_COUNT" The AGGREGATE_COUNT
   * metric_type ignores the DD part of the date.
   */
  filter?: string;
  /**
   * Optional. The maximum number of BusinessCallsInsights to return. If
   * unspecified, at most 20 will be returned. Some of the metric_types(e.g,
   * AGGREGATE_COUNT) returns a single page. For these metrics, the page_size is
   * ignored.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `ListBusinessCallsInsights` call. Provide this to retrieve the subsequent
   * page. When paginating, all other parameters provided to
   * `ListBusinessCallsInsights` must match the call that provided the page
   * token. Some of the metric_types (e.g, AGGREGATE_COUNT) returns a single
   * page. For these metrics, the pake_token is ignored.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * MyBusinessBusinessCalls#locationsUpdateBusinesscallssettings.
 */
export interface LocationsUpdateBusinesscallssettingsOptions {
  /**
   * Required. The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsUpdateBusinesscallssettingsOptions(data: any): LocationsUpdateBusinesscallssettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsUpdateBusinesscallssettingsOptions(data: any): LocationsUpdateBusinesscallssettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Metrics for a week day.
 */
export interface WeekDayMetrics {
  /**
   * Day of the week. Allowed values are Sunday - Saturday.
   */
  day?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Total count of missed calls for this hour.
   */
  missedCallsCount?: number;
}