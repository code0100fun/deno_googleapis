// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Chrome UX Report API Client for Deno
 * ====================================
 * 
 * The Chrome UX Report API lets you view real user experience data for millions of websites. 
 * 
 * Docs: https://developers.google.com/web/tools/chrome-user-experience-report/api/reference
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Chrome UX Report API lets you view real user experience data for
 * millions of websites.
 */
export class ChromeUXReport {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://chromeuxreport.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Queries the Chrome User Experience Report for a timeseries `history
   * record` for a given site. Returns a `history record` that contains one or
   * more `metric timeseries` corresponding to performance data about the
   * requested site.
   *
   */
  async recordsQueryHistoryRecord(req: QueryHistoryRequest): Promise<QueryHistoryResponse> {
    const url = new URL(`${this.#baseUrl}v1/records:queryHistoryRecord`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as QueryHistoryResponse;
  }

  /**
   * Queries the Chrome User Experience for a single `record` for a given site.
   * Returns a `record` that contains one or more `metrics` corresponding to
   * performance data about the requested site.
   *
   */
  async recordsQueryRecord(req: QueryRequest): Promise<QueryResponse> {
    const url = new URL(`${this.#baseUrl}v1/records:queryRecord`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as QueryResponse;
  }
}

/**
 * A bin is a discrete portion of data spanning from start to end, or if no end
 * is given, then from start to +inf. A bin's start and end values are given in
 * the value type of the metric it represents. For example, "first contentful
 * paint" is measured in milliseconds and exposed as ints, therefore its metric
 * bins will use int32s for its start and end types. However, "cumulative layout
 * shift" is measured in unitless decimals and is exposed as a decimal encoded
 * as a string, therefore its metric bins will use strings for its value type.
 */
export interface Bin {
  /**
   * The proportion of users that experienced this bin's value for the given
   * metric.
   */
  density?: number;
  /**
   * End is the end of the data bin. If end is not populated, then the bin has
   * no end and is valid from start to +inf.
   */
  end?: any;
  /**
   * Start is the beginning of the data bin.
   */
  start?: any;
}

/**
 * The collection period is a date range which includes the `first` and `last`
 * day.
 */
export interface CollectionPeriod {
  /**
   * The first day in the collection period, inclusive.
   */
  firstDate?: Date;
  /**
   * The last day in the collection period, inclusive.
   */
  lastDate?: Date;
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
 * Key defines all the dimensions that identify this record as unique.
 */
export interface HistoryKey {
  /**
   * The form factor is the device class that all users used to access the site
   * for this record. If the form factor is unspecified, then aggregated data
   * over all form factors will be returned.
   */
  formFactor?:  | "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET";
  /**
   * Origin specifies the origin that this record is for. Note: When specifying
   * an origin, data for loads under this origin over all pages are aggregated
   * into origin level user experience data.
   */
  origin?: string;
  /**
   * Url specifies a specific url that this record is for. This url should be
   * normalized, following the normalization actions taken in the request to
   * increase the chances of successful lookup. Note: When specifying a "url"
   * only data for that specific url will be aggregated.
   */
  url?: string;
}

/**
 * HistoryRecord is a timeseries of Chrome UX Report data. It contains user
 * experience statistics for a single url pattern and a set of dimensions.
 */
export interface HistoryRecord {
  /**
   * The collection periods indicate when each of the data points reflected in
   * the time series data in metrics was collected. Note that all the time
   * series share the same collection periods, and it is enforced in the CrUX
   * pipeline that every time series has the same number of data points.
   */
  collectionPeriods?: CollectionPeriod[];
  /**
   * Key defines all of the unique querying parameters needed to look up a user
   * experience history record.
   */
  key?: HistoryKey;
  /**
   * Metrics is the map of user experience time series data available for the
   * record defined in the key field. Metrics are keyed on the metric name.
   * Allowed key values: ["first_contentful_paint", "first_input_delay",
   * "largest_contentful_paint", "cumulative_layout_shift",
   * "experimental_time_to_first_byte",
   * "experimental_interaction_to_next_paint"]
   */
  metrics?: {
    [key: string]: MetricTimeseries
  };
}

/**
 * Key defines all the dimensions that identify this record as unique.
 */
export interface Key {
  /**
   * The effective connection type is the general connection class that all
   * users experienced for this record. This field uses the values ["offline",
   * "slow-2G", "2G", "3G", "4G"] as specified in:
   * https://wicg.github.io/netinfo/#effective-connection-types If the effective
   * connection type is unspecified, then aggregated data over all effective
   * connection types will be returned.
   */
  effectiveConnectionType?: string;
  /**
   * The form factor is the device class that all users used to access the site
   * for this record. If the form factor is unspecified, then aggregated data
   * over all form factors will be returned.
   */
  formFactor?:  | "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET";
  /**
   * Origin specifies the origin that this record is for. Note: When specifying
   * an origin, data for loads under this origin over all pages are aggregated
   * into origin level user experience data.
   */
  origin?: string;
  /**
   * Url specifies a specific url that this record is for. Note: When
   * specifying a "url" only data for that specific url will be aggregated.
   */
  url?: string;
}

/**
 * A `metric` is a set of user experience data for a single web performance
 * metric, like "first contentful paint". It contains a summary histogram of
 * real world Chrome usage as a series of `bins`.
 */
export interface Metric {
  /**
   * The histogram of user experiences for a metric. The histogram will have at
   * least one bin and the densities of all bins will add up to ~1.
   */
  histogram?: Bin[];
  /**
   * Commonly useful percentiles of the Metric. The value type for the
   * percentiles will be the same as the value types given for the Histogram
   * bins.
   */
  percentiles?: Percentiles;
}

/**
 * A `metric timeseries` is a set of user experience data for a single web
 * performance metric, like "first contentful paint". It contains a summary
 * histogram of real world Chrome usage as a series of `bins`, where each bin
 * has density values for a particular time period.
 */
export interface MetricTimeseries {
  /**
   * The histogram of user experiences for a metric. The histogram will have at
   * least one bin and the densities of all bins will add up to ~1, for each
   * timeseries entry.
   */
  histogramTimeseries?: TimeseriesBin[];
  /**
   * Commonly useful percentiles of the Metric. The value type for the
   * percentiles will be the same as the value types given for the Histogram
   * bins.
   */
  percentilesTimeseries?: TimeseriesPercentiles;
}

/**
 * Percentiles contains synthetic values of a metric at a given statistical
 * percentile. These are used for estimating a metric's value as experienced by
 * a percentage of users out of the total number of users.
 */
export interface Percentiles {
  /**
   * 75% of users experienced the given metric at or below this value.
   */
  p75?: any;
}

/**
 * Request payload sent by a physical web client. This request includes all
 * necessary context to load a particular user experience history record.
 */
export interface QueryHistoryRequest {
  /**
   * The form factor is a query dimension that specifies the device class that
   * the record's data should belong to. Note: If no form factor is specified,
   * then a special record with aggregated data over all form factors will be
   * returned.
   */
  formFactor?:  | "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET";
  /**
   * The metrics that should be included in the response. If none are specified
   * then any metrics found will be returned. Allowed values:
   * ["first_contentful_paint", "first_input_delay", "largest_contentful_paint",
   * "cumulative_layout_shift", "experimental_time_to_first_byte",
   * "experimental_interaction_to_next_paint"]
   */
  metrics?: string[];
  /**
   * The url pattern "origin" refers to a url pattern that is the origin of a
   * website. Examples: "https://example.com", "https://cloud.google.com"
   */
  origin?: string;
  /**
   * The url pattern "url" refers to a url pattern that is any arbitrary url.
   * Examples: "https://example.com/",
   * "https://cloud.google.com/why-google-cloud/"
   */
  url?: string;
}

/**
 * Response payload sent back to a physical web client. This response contains
 * the record found based on the identiers present in a `QueryHistoryRequest`.
 * The returned response will have a history record, and sometimes details on
 * normalization actions taken on the request that were necessary to make the
 * request successful.
 */
export interface QueryHistoryResponse {
  /**
   * The record that was found.
   */
  record?: HistoryRecord;
  /**
   * These are details about automated normalization actions that were taken in
   * order to make the requested `url_pattern` valid.
   */
  urlNormalizationDetails?: UrlNormalization;
}

/**
 * Request payload sent by a physical web client. This request includes all
 * necessary context to load a particular user experience record.
 */
export interface QueryRequest {
  /**
   * The effective connection type is a query dimension that specifies the
   * effective network class that the record's data should belong to. This field
   * uses the values ["offline", "slow-2G", "2G", "3G", "4G"] as specified in:
   * https://wicg.github.io/netinfo/#effective-connection-types Note: If no
   * effective connection type is specified, then a special record with
   * aggregated data over all effective connection types will be returned.
   */
  effectiveConnectionType?: string;
  /**
   * The form factor is a query dimension that specifies the device class that
   * the record's data should belong to. Note: If no form factor is specified,
   * then a special record with aggregated data over all form factors will be
   * returned.
   */
  formFactor?:  | "ALL_FORM_FACTORS" | "PHONE" | "DESKTOP" | "TABLET";
  /**
   * The metrics that should be included in the response. If none are specified
   * then any metrics found will be returned. Allowed values:
   * ["first_contentful_paint", "first_input_delay", "largest_contentful_paint",
   * "cumulative_layout_shift", "experimental_time_to_first_byte",
   * "experimental_interaction_to_next_paint"]
   */
  metrics?: string[];
  /**
   * The url pattern "origin" refers to a url pattern that is the origin of a
   * website. Examples: "https://example.com", "https://cloud.google.com"
   */
  origin?: string;
  /**
   * The url pattern "url" refers to a url pattern that is any arbitrary url.
   * Examples: "https://example.com/",
   * "https://cloud.google.com/why-google-cloud/"
   */
  url?: string;
}

/**
 * Response payload sent back to a physical web client. This response contains
 * the record found based on the identiers present in a `QueryRequest`. The
 * returned response will have a record, and sometimes details on normalization
 * actions taken on the request that were necessary to make the request
 * successful.
 */
export interface QueryResponse {
  /**
   * The record that was found.
   */
  record?: Record;
  /**
   * These are details about automated normalization actions that were taken in
   * order to make the requested `url_pattern` valid.
   */
  urlNormalizationDetails?: UrlNormalization;
}

/**
 * Record is a single Chrome UX report data record. It contains use experience
 * statistics for a single url pattern and set of dimensions.
 */
export interface Record {
  /**
   * The collection period indicates when the data reflected in this record was
   * collected.
   */
  collectionPeriod?: CollectionPeriod;
  /**
   * Key defines all of the unique querying parameters needed to look up a user
   * experience record.
   */
  key?: Key;
  /**
   * Metrics is the map of user experience data available for the record
   * defined in the key field. Metrics are keyed on the metric name. Allowed key
   * values: ["first_contentful_paint", "first_input_delay",
   * "largest_contentful_paint", "cumulative_layout_shift",
   * "experimental_time_to_first_byte",
   * "experimental_interaction_to_next_paint"]
   */
  metrics?: {
    [key: string]: Metric
  };
}

/**
 * A bin is a discrete portion of data spanning from start to end, or if no end
 * is given, then from start to +inf. A bin's start and end values are given in
 * the value type of the metric it represents. For example, "first contentful
 * paint" is measured in milliseconds and exposed as ints, therefore its metric
 * bins will use int32s for its start and end types. However, "cumulative layout
 * shift" is measured in unitless decimals and is exposed as a decimal encoded
 * as a string, therefore its metric bins will use strings for its value type.
 */
export interface TimeseriesBin {
  /**
   * The proportion of users that experienced this bin's value for the given
   * metric in a given collection period; the index for each of these entries
   * corresponds to an entry in the CollectionPeriods field in the HistoryRecord
   * message, which describes when the density was observed in the field. Thus,
   * the length of this list of densities is equal to the length of the
   * CollectionPeriods field in the HistoryRecord message.
   */
  densities?: number[];
  /**
   * End is the end of the data bin. If end is not populated, then the bin has
   * no end and is valid from start to +inf.
   */
  end?: any;
  /**
   * Start is the beginning of the data bin.
   */
  start?: any;
}

/**
 * Percentiles contains synthetic values of a metric at a given statistical
 * percentile. These are used for estimating a metric's value as experienced by
 * a percentage of users out of the total number of users.
 */
export interface TimeseriesPercentiles {
  /**
   * 75% of users experienced the given metric at or below this value. The
   * length of this list of densities is equal to the length of the
   * CollectionPeriods field in the HistoryRecord message, which describes when
   * the density was observed in the field.
   */
  p75s?: any[];
}

/**
 * Object representing the normalization actions taken to normalize a url to
 * achieve a higher chance of successful lookup. These are simple automated
 * changes that are taken when looking up the provided `url_patten` would be
 * known to fail. Complex actions like following redirects are not handled.
 */
export interface UrlNormalization {
  /**
   * The URL after any normalization actions. This is a valid user experience
   * URL that could reasonably be looked up.
   */
  normalizedUrl?: string;
  /**
   * The original requested URL prior to any normalization actions.
   */
  originalUrl?: string;
}