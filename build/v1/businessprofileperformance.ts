// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Business Profile Performance API Client for Deno
 * ================================================
 * 
 * The Business Profile Performance API allows merchants to fetch performance reports about their business profile on Google. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Business Profile Performance API allows merchants to fetch performance
 * reports about their business profile on Google. Note - If you have a quota of
 * 0 after enabling the API, please request for GBP API access.
 */
export class BusinessProfilePerformance {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://businessprofileperformance.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the values for each date from a given time range and optionally
   * the sub entity type, where applicable, that are associated with the
   * specific daily metrics. Example request: `GET
   * https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries?dailyMetrics=WEBSITE_CLICKS&dailyMetrics=CALL_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31`
   *
   * @param location Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id.
   */
  async locationsFetchMultiDailyMetricsTimeSeries(location: string, opts: LocationsFetchMultiDailyMetricsTimeSeriesOptions = {}): Promise<FetchMultiDailyMetricsTimeSeriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }:fetchMultiDailyMetricsTimeSeries`);
    if (opts.dailyMetrics !== undefined) {
      url.searchParams.append("dailyMetrics", String(opts.dailyMetrics));
    }
    if (opts["dailyRange.endDate.day"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.day", String(opts["dailyRange.endDate.day"]));
    }
    if (opts["dailyRange.endDate.month"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.month", String(opts["dailyRange.endDate.month"]));
    }
    if (opts["dailyRange.endDate.year"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.year", String(opts["dailyRange.endDate.year"]));
    }
    if (opts["dailyRange.startDate.day"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.day", String(opts["dailyRange.startDate.day"]));
    }
    if (opts["dailyRange.startDate.month"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.month", String(opts["dailyRange.startDate.month"]));
    }
    if (opts["dailyRange.startDate.year"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.year", String(opts["dailyRange.startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFetchMultiDailyMetricsTimeSeriesResponse(data);
  }

  /**
   * Returns the values for each date from a given time range that are
   * associated with the specific daily metric. Example request: `GET
   * https://businessprofileperformance.googleapis.com/v1/locations/12345:getDailyMetricsTimeSeries?dailyMetric=WEBSITE_CLICKS&daily_range.start_date.year=2022&daily_range.start_date.month=1&daily_range.start_date.day=1&daily_range.end_date.year=2022&daily_range.end_date.month=3&daily_range.end_date.day=31`
   *
   * @param name Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id.
   */
  async locationsGetDailyMetricsTimeSeries(name: string, opts: LocationsGetDailyMetricsTimeSeriesOptions = {}): Promise<GetDailyMetricsTimeSeriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getDailyMetricsTimeSeries`);
    if (opts.dailyMetric !== undefined) {
      url.searchParams.append("dailyMetric", String(opts.dailyMetric));
    }
    if (opts["dailyRange.endDate.day"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.day", String(opts["dailyRange.endDate.day"]));
    }
    if (opts["dailyRange.endDate.month"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.month", String(opts["dailyRange.endDate.month"]));
    }
    if (opts["dailyRange.endDate.year"] !== undefined) {
      url.searchParams.append("dailyRange.endDate.year", String(opts["dailyRange.endDate.year"]));
    }
    if (opts["dailyRange.startDate.day"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.day", String(opts["dailyRange.startDate.day"]));
    }
    if (opts["dailyRange.startDate.month"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.month", String(opts["dailyRange.startDate.month"]));
    }
    if (opts["dailyRange.startDate.year"] !== undefined) {
      url.searchParams.append("dailyRange.startDate.year", String(opts["dailyRange.startDate.year"]));
    }
    if (opts["dailySubEntityType.dayOfWeek"] !== undefined) {
      url.searchParams.append("dailySubEntityType.dayOfWeek", String(opts["dailySubEntityType.dayOfWeek"]));
    }
    if (opts["dailySubEntityType.timeOfDay.hours"] !== undefined) {
      url.searchParams.append("dailySubEntityType.timeOfDay.hours", String(opts["dailySubEntityType.timeOfDay.hours"]));
    }
    if (opts["dailySubEntityType.timeOfDay.minutes"] !== undefined) {
      url.searchParams.append("dailySubEntityType.timeOfDay.minutes", String(opts["dailySubEntityType.timeOfDay.minutes"]));
    }
    if (opts["dailySubEntityType.timeOfDay.nanos"] !== undefined) {
      url.searchParams.append("dailySubEntityType.timeOfDay.nanos", String(opts["dailySubEntityType.timeOfDay.nanos"]));
    }
    if (opts["dailySubEntityType.timeOfDay.seconds"] !== undefined) {
      url.searchParams.append("dailySubEntityType.timeOfDay.seconds", String(opts["dailySubEntityType.timeOfDay.seconds"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetDailyMetricsTimeSeriesResponse(data);
  }

  /**
   * Returns the search keywords used to find a business in search or maps.
   * Each search keyword is accompanied by impressions which are aggregated on a
   * monthly basis. Example request: `GET
   * https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly?monthly_range.start_month.year=2022&monthly_range.start_month.month=1&monthly_range.end_month.year=2022&monthly_range.end_month.month=3`
   *
   * @param parent Required. The location for which the time series should be fetched. Format: locations/{location_id} where location_id is an unobfuscated listing id.
   */
  async locationsSearchkeywordsImpressionsMonthlyList(parent: string, opts: LocationsSearchkeywordsImpressionsMonthlyListOptions = {}): Promise<ListSearchKeywordImpressionsMonthlyResponse> {
    opts = serializeLocationsSearchkeywordsImpressionsMonthlyListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/searchkeywords/impressions/monthly`);
    if (opts["monthlyRange.endMonth.day"] !== undefined) {
      url.searchParams.append("monthlyRange.endMonth.day", String(opts["monthlyRange.endMonth.day"]));
    }
    if (opts["monthlyRange.endMonth.month"] !== undefined) {
      url.searchParams.append("monthlyRange.endMonth.month", String(opts["monthlyRange.endMonth.month"]));
    }
    if (opts["monthlyRange.endMonth.year"] !== undefined) {
      url.searchParams.append("monthlyRange.endMonth.year", String(opts["monthlyRange.endMonth.year"]));
    }
    if (opts["monthlyRange.startMonth.day"] !== undefined) {
      url.searchParams.append("monthlyRange.startMonth.day", String(opts["monthlyRange.startMonth.day"]));
    }
    if (opts["monthlyRange.startMonth.month"] !== undefined) {
      url.searchParams.append("monthlyRange.startMonth.month", String(opts["monthlyRange.startMonth.month"]));
    }
    if (opts["monthlyRange.startMonth.year"] !== undefined) {
      url.searchParams.append("monthlyRange.startMonth.year", String(opts["monthlyRange.startMonth.year"]));
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
    return deserializeListSearchKeywordImpressionsMonthlyResponse(data);
  }
}

/**
 * Represents a single datapoint, where each datapoint is a
 * DailyMetric-DailySubEntityType-TimeSeries tuple.
 */
export interface DailyMetricTimeSeries {
  /**
   * The DailyMetric that the TimeSeries represents.
   */
  dailyMetric?:  | "DAILY_METRIC_UNKNOWN" | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS" | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH" | "BUSINESS_IMPRESSIONS_MOBILE_MAPS" | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH" | "BUSINESS_CONVERSATIONS" | "BUSINESS_DIRECTION_REQUESTS" | "CALL_CLICKS" | "WEBSITE_CLICKS" | "BUSINESS_BOOKINGS" | "BUSINESS_FOOD_ORDERS" | "BUSINESS_FOOD_MENU_CLICKS";
  /**
   * The DailySubEntityType that the TimeSeries represents. Will not be present
   * when breakdown does not exist.
   */
  dailySubEntityType?: DailySubEntityType;
  /**
   * List of datapoints where each datapoint is a date-value pair.
   */
  timeSeries?: TimeSeries;
}

function serializeDailyMetricTimeSeries(data: any): DailyMetricTimeSeries {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? serializeTimeSeries(data["timeSeries"]) : undefined,
  };
}

function deserializeDailyMetricTimeSeries(data: any): DailyMetricTimeSeries {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? deserializeTimeSeries(data["timeSeries"]) : undefined,
  };
}

/**
 * Represents all possible subentity types that are associated with
 * DailyMetrics.
 */
export interface DailySubEntityType {
  /**
   * Represents the day of the week. Eg: MONDAY.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Represents the time of the day in 24 hour format. Eg: 13:34:20
   */
  timeOfDay?: TimeOfDay;
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
 * Represents a single datapoint in the timeseries, where each datapoint is a
 * date-value pair.
 */
export interface DatedValue {
  /**
   * The date that the datapoint corresponds to. This represents a month value
   * if the day field is not set.
   */
  date?: Date;
  /**
   * The value of the datapoint.
   */
  value?: bigint;
}

function serializeDatedValue(data: any): DatedValue {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeDatedValue(data: any): DatedValue {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * Represents the response for FetchMultiDailyMetricsTimeSeries.
 */
export interface FetchMultiDailyMetricsTimeSeriesResponse {
  /**
   * DailyMetrics and their corresponding time series.
   */
  multiDailyMetricTimeSeries?: MultiDailyMetricTimeSeries[];
}

function serializeFetchMultiDailyMetricsTimeSeriesResponse(data: any): FetchMultiDailyMetricsTimeSeriesResponse {
  return {
    ...data,
    multiDailyMetricTimeSeries: data["multiDailyMetricTimeSeries"] !== undefined ? data["multiDailyMetricTimeSeries"].map((item: any) => (serializeMultiDailyMetricTimeSeries(item))) : undefined,
  };
}

function deserializeFetchMultiDailyMetricsTimeSeriesResponse(data: any): FetchMultiDailyMetricsTimeSeriesResponse {
  return {
    ...data,
    multiDailyMetricTimeSeries: data["multiDailyMetricTimeSeries"] !== undefined ? data["multiDailyMetricTimeSeries"].map((item: any) => (deserializeMultiDailyMetricTimeSeries(item))) : undefined,
  };
}

/**
 * Represents the response for GetDailyMetricsTimeSeries.
 */
export interface GetDailyMetricsTimeSeriesResponse {
  /**
   * The daily time series.
   */
  timeSeries?: TimeSeries;
}

function serializeGetDailyMetricsTimeSeriesResponse(data: any): GetDailyMetricsTimeSeriesResponse {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? serializeTimeSeries(data["timeSeries"]) : undefined,
  };
}

function deserializeGetDailyMetricsTimeSeriesResponse(data: any): GetDailyMetricsTimeSeriesResponse {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? deserializeTimeSeries(data["timeSeries"]) : undefined,
  };
}

/**
 * Represents an insights value.
 */
export interface InsightsValue {
  /**
   * Represents the threshold below which the actual value falls.
   */
  threshold?: bigint;
  /**
   * Represents the actual value.
   */
  value?: bigint;
}

function serializeInsightsValue(data: any): InsightsValue {
  return {
    ...data,
    threshold: data["threshold"] !== undefined ? String(data["threshold"]) : undefined,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeInsightsValue(data: any): InsightsValue {
  return {
    ...data,
    threshold: data["threshold"] !== undefined ? BigInt(data["threshold"]) : undefined,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * Represents the response for ListSearchKeywordImpressionsMonthly.
 */
export interface ListSearchKeywordImpressionsMonthlyResponse {
  /**
   * A token indicating the last paginated result returned. This can be used by
   * succeeding requests to get the next "page" of keywords. It will only be
   * present when there are more results to be returned.
   */
  nextPageToken?: Uint8Array;
  /**
   * Search terms which have been used to find a business.
   */
  searchKeywordsCounts?: SearchKeywordCount[];
}

function serializeListSearchKeywordImpressionsMonthlyResponse(data: any): ListSearchKeywordImpressionsMonthlyResponse {
  return {
    ...data,
    nextPageToken: data["nextPageToken"] !== undefined ? encodeBase64(data["nextPageToken"]) : undefined,
    searchKeywordsCounts: data["searchKeywordsCounts"] !== undefined ? data["searchKeywordsCounts"].map((item: any) => (serializeSearchKeywordCount(item))) : undefined,
  };
}

function deserializeListSearchKeywordImpressionsMonthlyResponse(data: any): ListSearchKeywordImpressionsMonthlyResponse {
  return {
    ...data,
    nextPageToken: data["nextPageToken"] !== undefined ? decodeBase64(data["nextPageToken"] as string) : undefined,
    searchKeywordsCounts: data["searchKeywordsCounts"] !== undefined ? data["searchKeywordsCounts"].map((item: any) => (deserializeSearchKeywordCount(item))) : undefined,
  };
}

/**
 * Additional options for
 * BusinessProfilePerformance#locationsFetchMultiDailyMetricsTimeSeries.
 */
export interface LocationsFetchMultiDailyMetricsTimeSeriesOptions {
  /**
   * Required. The metrics to retrieve time series for.
   */
  dailyMetrics?:  | "DAILY_METRIC_UNKNOWN" | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS" | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH" | "BUSINESS_IMPRESSIONS_MOBILE_MAPS" | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH" | "BUSINESS_CONVERSATIONS" | "BUSINESS_DIRECTION_REQUESTS" | "CALL_CLICKS" | "WEBSITE_CLICKS" | "BUSINESS_BOOKINGS" | "BUSINESS_FOOD_ORDERS" | "BUSINESS_FOOD_MENU_CLICKS";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["dailyRange.endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["dailyRange.endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["dailyRange.endDate.year"]?: number;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["dailyRange.startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["dailyRange.startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["dailyRange.startDate.year"]?: number;
}

/**
 * Additional options for
 * BusinessProfilePerformance#locationsGetDailyMetricsTimeSeries.
 */
export interface LocationsGetDailyMetricsTimeSeriesOptions {
  /**
   * Required. The metric to retrieve time series.
   */
  dailyMetric?:  | "DAILY_METRIC_UNKNOWN" | "BUSINESS_IMPRESSIONS_DESKTOP_MAPS" | "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH" | "BUSINESS_IMPRESSIONS_MOBILE_MAPS" | "BUSINESS_IMPRESSIONS_MOBILE_SEARCH" | "BUSINESS_CONVERSATIONS" | "BUSINESS_DIRECTION_REQUESTS" | "CALL_CLICKS" | "WEBSITE_CLICKS" | "BUSINESS_BOOKINGS" | "BUSINESS_FOOD_ORDERS" | "BUSINESS_FOOD_MENU_CLICKS";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["dailyRange.endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["dailyRange.endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["dailyRange.endDate.year"]?: number;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["dailyRange.startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["dailyRange.startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["dailyRange.startDate.year"]?: number;
  /**
   * Represents the day of the week. Eg: MONDAY.
   */
  ["dailySubEntityType.dayOfWeek"]?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  ["dailySubEntityType.timeOfDay.hours"]?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  ["dailySubEntityType.timeOfDay.minutes"]?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  ["dailySubEntityType.timeOfDay.nanos"]?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  ["dailySubEntityType.timeOfDay.seconds"]?: number;
}

/**
 * Additional options for
 * BusinessProfilePerformance#locationsSearchkeywordsImpressionsMonthlyList.
 */
export interface LocationsSearchkeywordsImpressionsMonthlyListOptions {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["monthlyRange.endMonth.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["monthlyRange.endMonth.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["monthlyRange.endMonth.year"]?: number;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["monthlyRange.startMonth.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["monthlyRange.startMonth.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["monthlyRange.startMonth.year"]?: number;
  /**
   * Optional. The number of results requested. The default page size is 100.
   * Page size can be set to a maximum of 100.
   */
  pageSize?: number;
  /**
   * Optional. A token indicating the next paginated result to be returned.
   */
  pageToken?: Uint8Array;
}

function serializeLocationsSearchkeywordsImpressionsMonthlyListOptions(data: any): LocationsSearchkeywordsImpressionsMonthlyListOptions {
  return {
    ...data,
    pageToken: data["pageToken"] !== undefined ? encodeBase64(data["pageToken"]) : undefined,
  };
}

function deserializeLocationsSearchkeywordsImpressionsMonthlyListOptions(data: any): LocationsSearchkeywordsImpressionsMonthlyListOptions {
  return {
    ...data,
    pageToken: data["pageToken"] !== undefined ? decodeBase64(data["pageToken"] as string) : undefined,
  };
}

/**
 * Represents a list of tuples of DailyMetric-DailySubEntityType-TimeSeries.
 */
export interface MultiDailyMetricTimeSeries {
  /**
   * List of DailyMetric-TimeSeries pairs.
   */
  dailyMetricTimeSeries?: DailyMetricTimeSeries[];
}

function serializeMultiDailyMetricTimeSeries(data: any): MultiDailyMetricTimeSeries {
  return {
    ...data,
    dailyMetricTimeSeries: data["dailyMetricTimeSeries"] !== undefined ? data["dailyMetricTimeSeries"].map((item: any) => (serializeDailyMetricTimeSeries(item))) : undefined,
  };
}

function deserializeMultiDailyMetricTimeSeries(data: any): MultiDailyMetricTimeSeries {
  return {
    ...data,
    dailyMetricTimeSeries: data["dailyMetricTimeSeries"] !== undefined ? data["dailyMetricTimeSeries"].map((item: any) => (deserializeDailyMetricTimeSeries(item))) : undefined,
  };
}

/**
 * Represents a single search keyword and its value.
 */
export interface SearchKeywordCount {
  /**
   * One of either: 1) The sum of the number of unique users that used the
   * keyword in a month, aggregated for each month requested. 2) A threshold
   * that indicates that the actual value is below this threshold.
   */
  insightsValue?: InsightsValue;
  /**
   * The lower-cased string that the user entered.
   */
  searchKeyword?: string;
}

function serializeSearchKeywordCount(data: any): SearchKeywordCount {
  return {
    ...data,
    insightsValue: data["insightsValue"] !== undefined ? serializeInsightsValue(data["insightsValue"]) : undefined,
  };
}

function deserializeSearchKeywordCount(data: any): SearchKeywordCount {
  return {
    ...data,
    insightsValue: data["insightsValue"] !== undefined ? deserializeInsightsValue(data["insightsValue"]) : undefined,
  };
}

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Represents a timeseries.
 */
export interface TimeSeries {
  /**
   * List of datapoints in the timeseries, where each datapoint is a date-value
   * pair.
   */
  datedValues?: DatedValue[];
}

function serializeTimeSeries(data: any): TimeSeries {
  return {
    ...data,
    datedValues: data["datedValues"] !== undefined ? data["datedValues"].map((item: any) => (serializeDatedValue(item))) : undefined,
  };
}

function deserializeTimeSeries(data: any): TimeSeries {
  return {
    ...data,
    datedValues: data["datedValues"] !== undefined ? data["datedValues"].map((item: any) => (deserializeDatedValue(item))) : undefined,
  };
}

function decodeBase64(b64: string): Uint8Array {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

const base64abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
function encodeBase64(uint8: Uint8Array): string {
  let result = "", i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }
  return result;
}
