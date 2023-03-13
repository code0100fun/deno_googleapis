// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Analytics Data API Client for Deno
 * =========================================
 * 
 * Accesses report data in Google Analytics.
 * 
 * Docs: https://developers.google.com/analytics/devguides/reporting/data/v1/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Accesses report data in Google Analytics.
 */
export class AnalyticsData {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://analyticsdata.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns multiple pivot reports in a batch. All reports must be for the
   * same GA4 Property.
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). This property must be specified for the batch. The property within RunPivotReportRequest may either be unspecified or consistent with this property. Example: properties/1234
   */
  async propertiesBatchRunPivotReports(property: string, req: BatchRunPivotReportsRequest): Promise<BatchRunPivotReportsResponse> {
    req = serializeBatchRunPivotReportsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:batchRunPivotReports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchRunPivotReportsResponse;
  }

  /**
   * Returns multiple reports in a batch. All reports must be for the same GA4
   * Property.
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). This property must be specified for the batch. The property within RunReportRequest may either be unspecified or consistent with this property. Example: properties/1234
   */
  async propertiesBatchRunReports(property: string, req: BatchRunReportsRequest): Promise<BatchRunReportsResponse> {
    req = serializeBatchRunReportsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:batchRunReports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchRunReportsResponse;
  }

  /**
   * This compatibility method lists dimensions and metrics that can be added
   * to a report request and maintain compatibility. This method fails if the
   * request's dimensions and metrics are incompatible. In Google Analytics,
   * reports fail if they request incompatible dimensions and/or metrics; in
   * that case, you will need to remove dimensions and/or metrics from the
   * incompatible report until the report is compatible. The Realtime and Core
   * reports have different compatibility rules. This method checks
   * compatibility for Core reports.
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). `property` should be the same value as in your `runReport` request. Example: properties/1234
   */
  async propertiesCheckCompatibility(property: string, req: CheckCompatibilityRequest): Promise<CheckCompatibilityResponse> {
    req = serializeCheckCompatibilityRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:checkCompatibility`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckCompatibilityResponse;
  }

  /**
   * Returns metadata for dimensions and metrics available in reporting
   * methods. Used to explore the dimensions and metrics. In this method, a
   * Google Analytics GA4 Property Identifier is specified in the request, and
   * the metadata response includes Custom dimensions and metrics as well as
   * Universal metadata. For example if a custom metric with parameter name
   * `levels_unlocked` is registered to a property, the Metadata response will
   * contain `customEvent:levels_unlocked`. Universal metadata are dimensions
   * and metrics applicable to any property such as `country` and `totalUsers`.
   *
   * @param name Required. The resource name of the metadata to retrieve. This name field is specified in the URL path and not URL parameters. Property is a numeric Google Analytics GA4 Property identifier. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Example: properties/1234/metadata Set the Property ID to 0 for dimensions and metrics common to all properties. In this special mode, this method will not return custom dimensions and metrics.
   */
  async propertiesGetMetadata(name: string): Promise<Metadata> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Metadata;
  }

  /**
   * Returns a customized pivot report of your Google Analytics event data.
   * Pivot reports are more advanced and expressive formats than regular
   * reports. In a pivot report, dimensions are only visible if they are
   * included in a pivot. Multiple pivots can be specified to further dissect
   * your data.
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234
   */
  async propertiesRunPivotReport(property: string, req: RunPivotReportRequest): Promise<RunPivotReportResponse> {
    req = serializeRunPivotReportRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:runPivotReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RunPivotReportResponse;
  }

  /**
   * Returns a customized report of realtime event data for your property.
   * Events appear in realtime reports seconds after they have been sent to the
   * Google Analytics. Realtime reports show events and usage data for the
   * periods of time ranging from the present moment to 30 minutes ago (up to 60
   * minutes for Google Analytics 360 properties). For a guide to constructing
   * realtime requests & understanding responses, see [Creating a Realtime
   * Report](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics).
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Example: properties/1234
   */
  async propertiesRunRealtimeReport(property: string, req: RunRealtimeReportRequest): Promise<RunRealtimeReportResponse> {
    req = serializeRunRealtimeReportRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:runRealtimeReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RunRealtimeReportResponse;
  }

  /**
   * Returns a customized report of your Google Analytics event data. Reports
   * contain statistics derived from data collected by the Google Analytics
   * tracking code. The data returned from the API is as a table with columns
   * for the requested dimensions and metrics. Metrics are individual
   * measurements of user activity on your property, such as active users or
   * event count. Dimensions break down metrics across some common criteria,
   * such as country or event name. For a guide to constructing requests &
   * understanding responses, see [Creating a
   * Report](https://developers.google.com/analytics/devguides/reporting/data/v1/basics).
   *
   * @param property A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234
   */
  async propertiesRunReport(property: string, req: RunReportRequest): Promise<RunReportResponse> {
    req = serializeRunReportRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:runReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RunReportResponse;
  }
}

/**
 * A metric actively restricted in creating the report.
 */
export interface ActiveMetricRestriction {
  /**
   * The name of the restricted metric.
   */
  metricName?: string;
  /**
   * The reason for this metric's restriction.
   */
  restrictedMetricTypes?:  | "RESTRICTED_METRIC_TYPE_UNSPECIFIED" | "COST_DATA" | "REVENUE_DATA"[];
}

/**
 * The batch request containing multiple pivot report requests.
 */
export interface BatchRunPivotReportsRequest {
  /**
   * Individual requests. Each request has a separate pivot report response.
   * Each batch request is allowed up to 5 requests.
   */
  requests?: RunPivotReportRequest[];
}

function serializeBatchRunPivotReportsRequest(data: any): BatchRunPivotReportsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeRunPivotReportRequest(item))) : undefined,
  };
}

function deserializeBatchRunPivotReportsRequest(data: any): BatchRunPivotReportsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeRunPivotReportRequest(item))) : undefined,
  };
}

/**
 * The batch response containing multiple pivot reports.
 */
export interface BatchRunPivotReportsResponse {
  /**
   * Identifies what kind of resource this message is. This `kind` is always
   * the fixed string "analyticsData#batchRunPivotReports". Useful to
   * distinguish between response types in JSON.
   */
  kind?: string;
  /**
   * Individual responses. Each response has a separate pivot report request.
   */
  pivotReports?: RunPivotReportResponse[];
}

/**
 * The batch request containing multiple report requests.
 */
export interface BatchRunReportsRequest {
  /**
   * Individual requests. Each request has a separate report response. Each
   * batch request is allowed up to 5 requests.
   */
  requests?: RunReportRequest[];
}

function serializeBatchRunReportsRequest(data: any): BatchRunReportsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeRunReportRequest(item))) : undefined,
  };
}

function deserializeBatchRunReportsRequest(data: any): BatchRunReportsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeRunReportRequest(item))) : undefined,
  };
}

/**
 * The batch response containing multiple reports.
 */
export interface BatchRunReportsResponse {
  /**
   * Identifies what kind of resource this message is. This `kind` is always
   * the fixed string "analyticsData#batchRunReports". Useful to distinguish
   * between response types in JSON.
   */
  kind?: string;
  /**
   * Individual responses. Each response has a separate report request.
   */
  reports?: RunReportResponse[];
}

/**
 * To express that the result needs to be between two numbers (inclusive).
 */
export interface BetweenFilter {
  /**
   * Begins with this number.
   */
  fromValue?: NumericValue;
  /**
   * Ends with this number.
   */
  toValue?: NumericValue;
}

function serializeBetweenFilter(data: any): BetweenFilter {
  return {
    ...data,
    fromValue: data["fromValue"] !== undefined ? serializeNumericValue(data["fromValue"]) : undefined,
    toValue: data["toValue"] !== undefined ? serializeNumericValue(data["toValue"]) : undefined,
  };
}

function deserializeBetweenFilter(data: any): BetweenFilter {
  return {
    ...data,
    fromValue: data["fromValue"] !== undefined ? deserializeNumericValue(data["fromValue"]) : undefined,
    toValue: data["toValue"] !== undefined ? deserializeNumericValue(data["toValue"]) : undefined,
  };
}

/**
 * Used to convert a dimension value to a single case.
 */
export interface CaseExpression {
  /**
   * Name of a dimension. The name must refer back to a name in dimensions
   * field of the request.
   */
  dimensionName?: string;
}

/**
 * The request for compatibility information for a report's dimensions and
 * metrics. Check compatibility provides a preview of the compatibility of a
 * report; fields shared with the `runReport` request should be the same values
 * as in your `runReport` request.
 */
export interface CheckCompatibilityRequest {
  /**
   * Filters the dimensions and metrics in the response to just this
   * compatibility. Commonly used as `”compatibilityFilter”: “COMPATIBLE”` to
   * only return compatible dimensions & metrics.
   */
  compatibilityFilter?:  | "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE";
  /**
   * The filter clause of dimensions. `dimensionFilter` should be the same
   * value as in your `runReport` request.
   */
  dimensionFilter?: FilterExpression;
  /**
   * The dimensions in this report. `dimensions` should be the same value as in
   * your `runReport` request.
   */
  dimensions?: Dimension[];
  /**
   * The filter clause of metrics. `metricFilter` should be the same value as
   * in your `runReport` request
   */
  metricFilter?: FilterExpression;
  /**
   * The metrics in this report. `metrics` should be the same value as in your
   * `runReport` request.
   */
  metrics?: Metric[];
}

function serializeCheckCompatibilityRequest(data: any): CheckCompatibilityRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? serializeFilterExpression(data["dimensionFilter"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? serializeFilterExpression(data["metricFilter"]) : undefined,
  };
}

function deserializeCheckCompatibilityRequest(data: any): CheckCompatibilityRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? deserializeFilterExpression(data["dimensionFilter"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? deserializeFilterExpression(data["metricFilter"]) : undefined,
  };
}

/**
 * The compatibility response with the compatibility of each dimension &
 * metric.
 */
export interface CheckCompatibilityResponse {
  /**
   * The compatibility of each dimension.
   */
  dimensionCompatibilities?: DimensionCompatibility[];
  /**
   * The compatibility of each metric.
   */
  metricCompatibilities?: MetricCompatibility[];
}

/**
 * Defines a cohort selection criteria. A cohort is a group of users who share
 * a common characteristic. For example, users with the same `firstSessionDate`
 * belong to the same cohort.
 */
export interface Cohort {
  /**
   * The cohort selects users whose first touch date is between start date and
   * end date defined in the `dateRange`. This `dateRange` does not specify the
   * full date range of event data that is present in a cohort report. In a
   * cohort report, this `dateRange` is extended by the granularity and offset
   * present in the `cohortsRange`; event data for the extended reporting date
   * range is present in a cohort report. In a cohort request, this `dateRange`
   * is required and the `dateRanges` in the `RunReportRequest` or
   * `RunPivotReportRequest` must be unspecified. This `dateRange` should
   * generally be aligned with the cohort's granularity. If `CohortsRange` uses
   * daily granularity, this `dateRange` can be a single day. If `CohortsRange`
   * uses weekly granularity, this `dateRange` can be aligned to a week
   * boundary, starting at Sunday and ending Saturday. If `CohortsRange` uses
   * monthly granularity, this `dateRange` can be aligned to a month, starting
   * at the first and ending on the last day of the month.
   */
  dateRange?: DateRange;
  /**
   * Dimension used by the cohort. Required and only supports
   * `firstSessionDate`.
   */
  dimension?: string;
  /**
   * Assigns a name to this cohort. The dimension `cohort` is valued to this
   * name in a report response. If set, cannot begin with `cohort_` or
   * `RESERVED_`. If not set, cohorts are named by their zero based index
   * `cohort_0`, `cohort_1`, etc.
   */
  name?: string;
}

/**
 * Optional settings of a cohort report.
 */
export interface CohortReportSettings {
  /**
   * If true, accumulates the result from first touch day to the end day. Not
   * supported in `RunReportRequest`.
   */
  accumulate?: boolean;
}

/**
 * The specification of cohorts for a cohort report. Cohort reports create a
 * time series of user retention for the cohort. For example, you could select
 * the cohort of users that were acquired in the first week of September and
 * follow that cohort for the next six weeks. Selecting the users acquired in
 * the first week of September cohort is specified in the `cohort` object.
 * Following that cohort for the next six weeks is specified in the
 * `cohortsRange` object. For examples, see [Cohort Report
 * Examples](https://developers.google.com/analytics/devguides/reporting/data/v1/advanced#cohort_report_examples).
 * The report response could show a weekly time series where say your app has
 * retained 60% of this cohort after three weeks and 25% of this cohort after
 * six weeks. These two percentages can be calculated by the metric
 * `cohortActiveUsers/cohortTotalUsers` and will be separate rows in the report.
 */
export interface CohortSpec {
  /**
   * Optional settings for a cohort report.
   */
  cohortReportSettings?: CohortReportSettings;
  /**
   * Defines the selection criteria to group users into cohorts. Most cohort
   * reports define only a single cohort. If multiple cohorts are specified,
   * each cohort can be recognized in the report by their name.
   */
  cohorts?: Cohort[];
  /**
   * Cohort reports follow cohorts over an extended reporting date range. This
   * range specifies an offset duration to follow the cohorts over.
   */
  cohortsRange?: CohortsRange;
}

/**
 * Configures the extended reporting date range for a cohort report. Specifies
 * an offset duration to follow the cohorts over.
 */
export interface CohortsRange {
  /**
   * Required. `endOffset` specifies the end date of the extended reporting
   * date range for a cohort report. `endOffset` can be any positive integer but
   * is commonly set to 5 to 10 so that reports contain data on the cohort for
   * the next several granularity time periods. If `granularity` is `DAILY`, the
   * `endDate` of the extended reporting date range is `endDate` of the cohort
   * plus `endOffset` days. If `granularity` is `WEEKLY`, the `endDate` of the
   * extended reporting date range is `endDate` of the cohort plus `endOffset *
   * 7` days. If `granularity` is `MONTHLY`, the `endDate` of the extended
   * reporting date range is `endDate` of the cohort plus `endOffset * 30` days.
   */
  endOffset?: number;
  /**
   * Required. The granularity used to interpret the `startOffset` and
   * `endOffset` for the extended reporting date range for a cohort report.
   */
  granularity?:  | "GRANULARITY_UNSPECIFIED" | "DAILY" | "WEEKLY" | "MONTHLY";
  /**
   * `startOffset` specifies the start date of the extended reporting date
   * range for a cohort report. `startOffset` is commonly set to 0 so that
   * reports contain data from the acquisition of the cohort forward. If
   * `granularity` is `DAILY`, the `startDate` of the extended reporting date
   * range is `startDate` of the cohort plus `startOffset` days. If
   * `granularity` is `WEEKLY`, the `startDate` of the extended reporting date
   * range is `startDate` of the cohort plus `startOffset * 7` days. If
   * `granularity` is `MONTHLY`, the `startDate` of the extended reporting date
   * range is `startDate` of the cohort plus `startOffset * 30` days.
   */
  startOffset?: number;
}

/**
 * Used to combine dimension values to a single dimension.
 */
export interface ConcatenateExpression {
  /**
   * The delimiter placed between dimension names. Delimiters are often single
   * characters such as "|" or "," but can be longer strings. If a dimension
   * value contains the delimiter, both will be present in response with no
   * distinction. For example if dimension 1 value = "US,FR", dimension 2 value
   * = "JP", and delimiter = ",", then the response will contain "US,FR,JP".
   */
  delimiter?: string;
  /**
   * Names of dimensions. The names must refer back to names in the dimensions
   * field of the request.
   */
  dimensionNames?: string[];
}

/**
 * A contiguous set of days: startDate, startDate + 1, ..., endDate. Requests
 * are allowed up to 4 date ranges.
 */
export interface DateRange {
  /**
   * The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be
   * before `start_date`. The format `NdaysAgo`, `yesterday`, or `today` is also
   * accepted, and in that case, the date is inferred based on the property's
   * reporting time zone.
   */
  endDate?: string;
  /**
   * Assigns a name to this date range. The dimension `dateRange` is valued to
   * this name in a report response. If set, cannot begin with `date_range_` or
   * `RESERVED_`. If not set, date ranges are named by their zero based index in
   * the request: `date_range_0`, `date_range_1`, etc.
   */
  name?: string;
  /**
   * The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot
   * be after `end_date`. The format `NdaysAgo`, `yesterday`, or `today` is also
   * accepted, and in that case, the date is inferred based on the property's
   * reporting time zone.
   */
  startDate?: string;
}

/**
 * Dimensions are attributes of your data. For example, the dimension city
 * indicates the city from which an event originates. Dimension values in report
 * responses are strings; for example, the city could be "Paris" or "New York".
 * Requests are allowed up to 9 dimensions.
 */
export interface Dimension {
  /**
   * One dimension can be the result of an expression of multiple dimensions.
   * For example, dimension "country, city": concatenate(country, ", ", city).
   */
  dimensionExpression?: DimensionExpression;
  /**
   * The name of the dimension. See the [API
   * Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions)
   * for the list of dimension names. If `dimensionExpression` is specified,
   * `name` can be any string that you would like within the allowed character
   * set. For example if a `dimensionExpression` concatenates `country` and
   * `city`, you could call that dimension `countryAndCity`. Dimension names
   * that you choose must match the regular expression `^[a-zA-Z0-9_]$`.
   * Dimensions are referenced by `name` in `dimensionFilter`, `orderBys`,
   * `dimensionExpression`, and `pivots`.
   */
  name?: string;
}

/**
 * The compatibility for a single dimension.
 */
export interface DimensionCompatibility {
  /**
   * The compatibility of this dimension. If the compatibility is COMPATIBLE,
   * this dimension can be successfully added to the report.
   */
  compatibility?:  | "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE";
  /**
   * The dimension metadata contains the API name for this compatibility
   * information. The dimension metadata also contains other helpful information
   * like the UI name and description.
   */
  dimensionMetadata?: DimensionMetadata;
}

/**
 * Used to express a dimension which is the result of a formula of multiple
 * dimensions. Example usages: 1) lower_case(dimension) 2)
 * concatenate(dimension1, symbol, dimension2).
 */
export interface DimensionExpression {
  /**
   * Used to combine dimension values to a single dimension. For example,
   * dimension "country, city": concatenate(country, ", ", city).
   */
  concatenate?: ConcatenateExpression;
  /**
   * Used to convert a dimension value to lower case.
   */
  lowerCase?: CaseExpression;
  /**
   * Used to convert a dimension value to upper case.
   */
  upperCase?: CaseExpression;
}

/**
 * Describes a dimension column in the report. Dimensions requested in a report
 * produce column entries within rows and DimensionHeaders. However, dimensions
 * used exclusively within filters or expressions do not produce columns in a
 * report; correspondingly, those dimensions do not produce headers.
 */
export interface DimensionHeader {
  /**
   * The dimension's name.
   */
  name?: string;
}

/**
 * Explains a dimension.
 */
export interface DimensionMetadata {
  /**
   * This dimension's name. Useable in [Dimension](#Dimension)'s `name`. For
   * example, `eventName`.
   */
  apiName?: string;
  /**
   * The display name of the category that this dimension belongs to. Similar
   * dimensions and metrics are categorized together.
   */
  category?: string;
  /**
   * True if the dimension is a custom dimension for this property.
   */
  customDefinition?: boolean;
  /**
   * Still usable but deprecated names for this dimension. If populated, this
   * dimension is available by either `apiName` or one of `deprecatedApiNames`
   * for a period of time. After the deprecation period, the dimension will be
   * available only by `apiName`.
   */
  deprecatedApiNames?: string[];
  /**
   * Description of how this dimension is used and calculated.
   */
  description?: string;
  /**
   * This dimension's name within the Google Analytics user interface. For
   * example, `Event name`.
   */
  uiName?: string;
}

/**
 * Sorts by dimension values.
 */
export interface DimensionOrderBy {
  /**
   * A dimension name in the request to order by.
   */
  dimensionName?: string;
  /**
   * Controls the rule for dimension value ordering.
   */
  orderType?:  | "ORDER_TYPE_UNSPECIFIED" | "ALPHANUMERIC" | "CASE_INSENSITIVE_ALPHANUMERIC" | "NUMERIC";
}

/**
 * The value of a dimension.
 */
export interface DimensionValue {
  /**
   * Value as a string if the dimension type is a string.
   */
  value?: string;
}

/**
 * An expression to filter dimension or metric values.
 */
export interface Filter {
  /**
   * A filter for two values.
   */
  betweenFilter?: BetweenFilter;
  /**
   * The dimension name or metric name. In most methods, dimensions & metrics
   * can be used for the first time in this field. However in a
   * RunPivotReportRequest, this field must be additionally specified by name in
   * the RunPivotReportRequest's dimensions or metrics.
   */
  fieldName?: string;
  /**
   * A filter for in list values.
   */
  inListFilter?: InListFilter;
  /**
   * A filter for numeric or date values.
   */
  numericFilter?: NumericFilter;
  /**
   * Strings related filter.
   */
  stringFilter?: StringFilter;
}

function serializeFilter(data: any): Filter {
  return {
    ...data,
    betweenFilter: data["betweenFilter"] !== undefined ? serializeBetweenFilter(data["betweenFilter"]) : undefined,
    numericFilter: data["numericFilter"] !== undefined ? serializeNumericFilter(data["numericFilter"]) : undefined,
  };
}

function deserializeFilter(data: any): Filter {
  return {
    ...data,
    betweenFilter: data["betweenFilter"] !== undefined ? deserializeBetweenFilter(data["betweenFilter"]) : undefined,
    numericFilter: data["numericFilter"] !== undefined ? deserializeNumericFilter(data["numericFilter"]) : undefined,
  };
}

/**
 * To express dimension or metric filters. The fields in the same
 * FilterExpression need to be either all dimensions or all metrics.
 */
export interface FilterExpression {
  /**
   * The FilterExpressions in and_group have an AND relationship.
   */
  andGroup?: FilterExpressionList;
  /**
   * A primitive filter. In the same FilterExpression, all of the filter's
   * field names need to be either all dimensions or all metrics.
   */
  filter?: Filter;
  /**
   * The FilterExpression is NOT of not_expression.
   */
  notExpression?: FilterExpression;
  /**
   * The FilterExpressions in or_group have an OR relationship.
   */
  orGroup?: FilterExpressionList;
}

function serializeFilterExpression(data: any): FilterExpression {
  return {
    ...data,
    andGroup: data["andGroup"] !== undefined ? serializeFilterExpressionList(data["andGroup"]) : undefined,
    filter: data["filter"] !== undefined ? serializeFilter(data["filter"]) : undefined,
    notExpression: data["notExpression"] !== undefined ? serializeFilterExpression(data["notExpression"]) : undefined,
    orGroup: data["orGroup"] !== undefined ? serializeFilterExpressionList(data["orGroup"]) : undefined,
  };
}

function deserializeFilterExpression(data: any): FilterExpression {
  return {
    ...data,
    andGroup: data["andGroup"] !== undefined ? deserializeFilterExpressionList(data["andGroup"]) : undefined,
    filter: data["filter"] !== undefined ? deserializeFilter(data["filter"]) : undefined,
    notExpression: data["notExpression"] !== undefined ? deserializeFilterExpression(data["notExpression"]) : undefined,
    orGroup: data["orGroup"] !== undefined ? deserializeFilterExpressionList(data["orGroup"]) : undefined,
  };
}

/**
 * A list of filter expressions.
 */
export interface FilterExpressionList {
  /**
   * A list of filter expressions.
   */
  expressions?: FilterExpression[];
}

function serializeFilterExpressionList(data: any): FilterExpressionList {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? data["expressions"].map((item: any) => (serializeFilterExpression(item))) : undefined,
  };
}

function deserializeFilterExpressionList(data: any): FilterExpressionList {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? data["expressions"].map((item: any) => (deserializeFilterExpression(item))) : undefined,
  };
}

/**
 * The result needs to be in a list of string values.
 */
export interface InListFilter {
  /**
   * If true, the string value is case sensitive.
   */
  caseSensitive?: boolean;
  /**
   * The list of string values. Must be non-empty.
   */
  values?: string[];
}

/**
 * The dimensions and metrics currently accepted in reporting methods.
 */
export interface Metadata {
  /**
   * The dimension descriptions.
   */
  dimensions?: DimensionMetadata[];
  /**
   * The metric descriptions.
   */
  metrics?: MetricMetadata[];
  /**
   * Resource name of this metadata.
   */
  name?: string;
}

/**
 * The quantitative measurements of a report. For example, the metric
 * `eventCount` is the total number of events. Requests are allowed up to 10
 * metrics.
 */
export interface Metric {
  /**
   * A mathematical expression for derived metrics. For example, the metric
   * Event count per user is `eventCount/totalUsers`.
   */
  expression?: string;
  /**
   * Indicates if a metric is invisible in the report response. If a metric is
   * invisible, the metric will not produce a column in the response, but can be
   * used in `metricFilter`, `orderBys`, or a metric `expression`.
   */
  invisible?: boolean;
  /**
   * The name of the metric. See the [API
   * Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics)
   * for the list of metric names. If `expression` is specified, `name` can be
   * any string that you would like within the allowed character set. For
   * example if `expression` is `screenPageViews/sessions`, you could call that
   * metric's name = `viewsPerSession`. Metric names that you choose must match
   * the regular expression `^[a-zA-Z0-9_]$`. Metrics are referenced by `name`
   * in `metricFilter`, `orderBys`, and metric `expression`.
   */
  name?: string;
}

/**
 * The compatibility for a single metric.
 */
export interface MetricCompatibility {
  /**
   * The compatibility of this metric. If the compatibility is COMPATIBLE, this
   * metric can be successfully added to the report.
   */
  compatibility?:  | "COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE";
  /**
   * The metric metadata contains the API name for this compatibility
   * information. The metric metadata also contains other helpful information
   * like the UI name and description.
   */
  metricMetadata?: MetricMetadata;
}

/**
 * Describes a metric column in the report. Visible metrics requested in a
 * report produce column entries within rows and MetricHeaders. However, metrics
 * used exclusively within filters or expressions do not produce columns in a
 * report; correspondingly, those metrics do not produce headers.
 */
export interface MetricHeader {
  /**
   * The metric's name.
   */
  name?: string;
  /**
   * The metric's data type.
   */
  type?:  | "METRIC_TYPE_UNSPECIFIED" | "TYPE_INTEGER" | "TYPE_FLOAT" | "TYPE_SECONDS" | "TYPE_MILLISECONDS" | "TYPE_MINUTES" | "TYPE_HOURS" | "TYPE_STANDARD" | "TYPE_CURRENCY" | "TYPE_FEET" | "TYPE_MILES" | "TYPE_METERS" | "TYPE_KILOMETERS";
}

/**
 * Explains a metric.
 */
export interface MetricMetadata {
  /**
   * A metric name. Useable in [Metric](#Metric)'s `name`. For example,
   * `eventCount`.
   */
  apiName?: string;
  /**
   * If reasons are specified, your access is blocked to this metric for this
   * property. API requests from you to this property for this metric will
   * succeed; however, the report will contain only zeros for this metric. API
   * requests with metric filters on blocked metrics will fail. If reasons are
   * empty, you have access to this metric. To learn more, see [Access and
   * data-restriction
   * management](https://support.google.com/analytics/answer/10851388).
   */
  blockedReasons?:  | "BLOCKED_REASON_UNSPECIFIED" | "NO_REVENUE_METRICS" | "NO_COST_METRICS"[];
  /**
   * The display name of the category that this metrics belongs to. Similar
   * dimensions and metrics are categorized together.
   */
  category?: string;
  /**
   * True if the metric is a custom metric for this property.
   */
  customDefinition?: boolean;
  /**
   * Still usable but deprecated names for this metric. If populated, this
   * metric is available by either `apiName` or one of `deprecatedApiNames` for
   * a period of time. After the deprecation period, the metric will be
   * available only by `apiName`.
   */
  deprecatedApiNames?: string[];
  /**
   * Description of how this metric is used and calculated.
   */
  description?: string;
  /**
   * The mathematical expression for this derived metric. Can be used in
   * [Metric](#Metric)'s `expression` field for equivalent reports. Most metrics
   * are not expressions, and for non-expressions, this field is empty.
   */
  expression?: string;
  /**
   * The type of this metric.
   */
  type?:  | "METRIC_TYPE_UNSPECIFIED" | "TYPE_INTEGER" | "TYPE_FLOAT" | "TYPE_SECONDS" | "TYPE_MILLISECONDS" | "TYPE_MINUTES" | "TYPE_HOURS" | "TYPE_STANDARD" | "TYPE_CURRENCY" | "TYPE_FEET" | "TYPE_MILES" | "TYPE_METERS" | "TYPE_KILOMETERS";
  /**
   * This metric's name within the Google Analytics user interface. For
   * example, `Event count`.
   */
  uiName?: string;
}

/**
 * Sorts by metric values.
 */
export interface MetricOrderBy {
  /**
   * A metric name in the request to order by.
   */
  metricName?: string;
}

/**
 * The value of a metric.
 */
export interface MetricValue {
  /**
   * Measurement value. See MetricHeader for type.
   */
  value?: string;
}

/**
 * A contiguous set of minutes: startMinutesAgo, startMinutesAgo + 1, ...,
 * endMinutesAgo. Requests are allowed up to 2 minute ranges.
 */
export interface MinuteRange {
  /**
   * The inclusive end minute for the query as a number of minutes before now.
   * Cannot be before `startMinutesAgo`. For example, `"endMinutesAgo": 15`
   * specifies the report should include event data from prior to 15 minutes
   * ago. If unspecified, `endMinutesAgo` is defaulted to 0. Standard Analytics
   * properties can request any minute in the last 30 minutes of event data
   * (`endMinutesAgo <= 29`), and 360 Analytics properties can request any
   * minute in the last 60 minutes of event data (`endMinutesAgo <= 59`).
   */
  endMinutesAgo?: number;
  /**
   * Assigns a name to this minute range. The dimension `dateRange` is valued
   * to this name in a report response. If set, cannot begin with `date_range_`
   * or `RESERVED_`. If not set, minute ranges are named by their zero based
   * index in the request: `date_range_0`, `date_range_1`, etc.
   */
  name?: string;
  /**
   * The inclusive start minute for the query as a number of minutes before
   * now. For example, `"startMinutesAgo": 29` specifies the report should
   * include event data from 29 minutes ago and after. Cannot be after
   * `endMinutesAgo`. If unspecified, `startMinutesAgo` is defaulted to 29.
   * Standard Analytics properties can request up to the last 30 minutes of
   * event data (`startMinutesAgo <= 29`), and 360 Analytics properties can
   * request up to the last 60 minutes of event data (`startMinutesAgo <= 59`).
   */
  startMinutesAgo?: number;
}

/**
 * Filters for numeric or date values.
 */
export interface NumericFilter {
  /**
   * The operation type for this filter.
   */
  operation?:  | "OPERATION_UNSPECIFIED" | "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL";
  /**
   * A numeric value or a date value.
   */
  value?: NumericValue;
}

function serializeNumericFilter(data: any): NumericFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeNumericValue(data["value"]) : undefined,
  };
}

function deserializeNumericFilter(data: any): NumericFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeNumericValue(data["value"]) : undefined,
  };
}

/**
 * To represent a number.
 */
export interface NumericValue {
  /**
   * Double value
   */
  doubleValue?: number;
  /**
   * Integer value
   */
  int64Value?: bigint;
}

function serializeNumericValue(data: any): NumericValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeNumericValue(data: any): NumericValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * Order bys define how rows will be sorted in the response. For example,
 * ordering rows by descending event count is one ordering, and ordering rows by
 * the event name string is a different ordering.
 */
export interface OrderBy {
  /**
   * If true, sorts by descending order.
   */
  desc?: boolean;
  /**
   * Sorts results by a dimension's values.
   */
  dimension?: DimensionOrderBy;
  /**
   * Sorts results by a metric's values.
   */
  metric?: MetricOrderBy;
  /**
   * Sorts results by a metric's values within a pivot column group.
   */
  pivot?: PivotOrderBy;
}

/**
 * Describes the visible dimension columns and rows in the report response.
 */
export interface Pivot {
  /**
   * Dimension names for visible columns in the report response. Including
   * "dateRange" produces a date range column; for each row in the response,
   * dimension values in the date range column will indicate the corresponding
   * date range from the request.
   */
  fieldNames?: string[];
  /**
   * The number of unique combinations of dimension values to return in this
   * pivot. The `limit` parameter is required. A `limit` of 10,000 is common for
   * single pivot requests. The product of the `limit` for each `pivot` in a
   * `RunPivotReportRequest` must not exceed 100,000. For example, a two pivot
   * request with `limit: 1000` in each pivot will fail because the product is
   * `1,000,000`.
   */
  limit?: bigint;
  /**
   * Aggregate the metrics by dimensions in this pivot using the specified
   * metric_aggregations.
   */
  metricAggregations?:  | "METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT"[];
  /**
   * The row count of the start row. The first row is counted as row 0.
   */
  offset?: bigint;
  /**
   * Specifies how dimensions are ordered in the pivot. In the first Pivot, the
   * OrderBys determine Row and PivotDimensionHeader ordering; in subsequent
   * Pivots, the OrderBys determine only PivotDimensionHeader ordering.
   * Dimensions specified in these OrderBys must be a subset of
   * Pivot.field_names.
   */
  orderBys?: OrderBy[];
}

function serializePivot(data: any): Pivot {
  return {
    ...data,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
    offset: data["offset"] !== undefined ? String(data["offset"]) : undefined,
  };
}

function deserializePivot(data: any): Pivot {
  return {
    ...data,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
    offset: data["offset"] !== undefined ? BigInt(data["offset"]) : undefined,
  };
}

/**
 * Summarizes dimension values from a row for this pivot.
 */
export interface PivotDimensionHeader {
  /**
   * Values of multiple dimensions in a pivot.
   */
  dimensionValues?: DimensionValue[];
}

/**
 * Dimensions' values in a single pivot.
 */
export interface PivotHeader {
  /**
   * The size is the same as the cardinality of the corresponding dimension
   * combinations.
   */
  pivotDimensionHeaders?: PivotDimensionHeader[];
  /**
   * The cardinality of the pivot. The total number of rows for this pivot's
   * fields regardless of how the parameters `offset` and `limit` are specified
   * in the request.
   */
  rowCount?: number;
}

/**
 * Sorts by a pivot column group.
 */
export interface PivotOrderBy {
  /**
   * In the response to order by, order rows by this column. Must be a metric
   * name from the request.
   */
  metricName?: string;
  /**
   * Used to select a dimension name and value pivot. If multiple pivot
   * selections are given, the sort occurs on rows where all pivot selection
   * dimension name and value pairs match the row's dimension name and value
   * pair.
   */
  pivotSelections?: PivotSelection[];
}

/**
 * A pair of dimension names and values. Rows with this dimension pivot pair
 * are ordered by the metric's value. For example if pivots = {{"browser",
 * "Chrome"}} and metric_name = "Sessions", then the rows will be sorted based
 * on Sessions in Chrome.
 * ---------|----------|----------------|----------|---------------- | Chrome |
 * Chrome | Safari | Safari
 * ---------|----------|----------------|----------|---------------- Country |
 * Sessions | Pages/Sessions | Sessions | Pages/Sessions
 * ---------|----------|----------------|----------|---------------- US | 2 | 2
 * | 3 | 1 ---------|----------|----------------|----------|----------------
 * Canada | 3 | 1 | 4 | 1
 * ---------|----------|----------------|----------|----------------
 */
export interface PivotSelection {
  /**
   * Must be a dimension name from the request.
   */
  dimensionName?: string;
  /**
   * Order by only when the named dimension is this value.
   */
  dimensionValue?: string;
}

/**
 * Current state of all quotas for this Analytics Property. If any quota for a
 * property is exhausted, all requests to that property will return Resource
 * Exhausted errors.
 */
export interface PropertyQuota {
  /**
   * Standard Analytics Properties can send up to 10 concurrent requests;
   * Analytics 360 Properties can use up to 50 concurrent requests.
   */
  concurrentRequests?: QuotaStatus;
  /**
   * Analytics Properties can send up to 120 requests with potentially
   * thresholded dimensions per hour. In a batch request, each report request is
   * individually counted for this quota if the request contains potentially
   * thresholded dimensions.
   */
  potentiallyThresholdedRequestsPerHour?: QuotaStatus;
  /**
   * Standard Analytics Properties and cloud project pairs can have up to 10
   * server errors per hour; Analytics 360 Properties and cloud project pairs
   * can have up to 50 server errors per hour.
   */
  serverErrorsPerProjectPerHour?: QuotaStatus;
  /**
   * Standard Analytics Properties can use up to 25,000 tokens per day;
   * Analytics 360 Properties can use 250,000 tokens per day. Most requests
   * consume fewer than 10 tokens.
   */
  tokensPerDay?: QuotaStatus;
  /**
   * Standard Analytics Properties can use up to 5,000 tokens per hour;
   * Analytics 360 Properties can use 50,000 tokens per hour. An API request
   * consumes a single number of tokens, and that number is deducted from all of
   * the hourly, daily, and per project hourly quotas.
   */
  tokensPerHour?: QuotaStatus;
  /**
   * Analytics Properties can use up to 25% of their tokens per project per
   * hour. This amounts to standard Analytics Properties can use up to 1,250
   * tokens per project per hour, and Analytics 360 Properties can use 12,500
   * tokens per project per hour. An API request consumes a single number of
   * tokens, and that number is deducted from all of the hourly, daily, and per
   * project hourly quotas.
   */
  tokensPerProjectPerHour?: QuotaStatus;
}

/**
 * Current state for a particular quota group.
 */
export interface QuotaStatus {
  /**
   * Quota consumed by this request.
   */
  consumed?: number;
  /**
   * Quota remaining after this request.
   */
  remaining?: number;
}

/**
 * Response's metadata carrying additional information about the report
 * content.
 */
export interface ResponseMetaData {
  /**
   * The currency code used in this report. Intended to be used in formatting
   * currency metrics like `purchaseRevenue` for visualization. If currency_code
   * was specified in the request, this response parameter will echo the request
   * parameter; otherwise, this response parameter is the property's current
   * currency_code. Currency codes are string encodings of currency types from
   * the ISO 4217 standard (https://en.wikipedia.org/wiki/ISO_4217); for example
   * "USD", "EUR", "JPY". To learn more, see
   * https://support.google.com/analytics/answer/9796179.
   */
  currencyCode?: string;
  /**
   * If true, indicates some buckets of dimension combinations are rolled into
   * "(other)" row. This can happen for high cardinality reports. The metadata
   * parameter dataLossFromOtherRow is populated based on the aggregated data
   * table used in the report. The parameter will be accurately populated
   * regardless of the filters and limits in the report. For example, the
   * (other) row could be dropped from the report because the request contains a
   * filter on sessionSource = google. This parameter will still be populated if
   * data loss from other row was present in the input aggregate data used to
   * generate this report. To learn more, see [About the (other) row and data
   * sampling](https://support.google.com/analytics/answer/13208658#reports).
   */
  dataLossFromOtherRow?: boolean;
  /**
   * If empty reason is specified, the report is empty for this reason.
   */
  emptyReason?: string;
  /**
   * Describes the schema restrictions actively enforced in creating this
   * report. To learn more, see [Access and data-restriction
   * management](https://support.google.com/analytics/answer/10851388).
   */
  schemaRestrictionResponse?: SchemaRestrictionResponse;
  /**
   * If `subjectToThresholding` is true, this report is subject to thresholding
   * and only returns data that meets the minimum aggregation thresholds. It is
   * possible for a request to be subject to thresholding thresholding and no
   * data is absent from the report, and this happens when all data is above the
   * thresholds. To learn more, see [Data
   * thresholds](https://support.google.com/analytics/answer/9383630) and [About
   * Demographics and
   * Interests](https://support.google.com/analytics/answer/2799357).
   */
  subjectToThresholding?: boolean;
  /**
   * The property's current timezone. Intended to be used to interpret
   * time-based dimensions like `hour` and `minute`. Formatted as strings from
   * the IANA Time Zone database (https://www.iana.org/time-zones); for example
   * "America/New_York" or "Asia/Tokyo".
   */
  timeZone?: string;
}

/**
 * Report data for each row. For example if RunReportRequest contains: ```none
 * "dimensions": [ { "name": "eventName" }, { "name": "countryId" } ],
 * "metrics": [ { "name": "eventCount" } ] ``` One row with 'in_app_purchase' as
 * the eventName, 'JP' as the countryId, and 15 as the eventCount, would be:
 * ```none "dimensionValues": [ { "value": "in_app_purchase" }, { "value": "JP"
 * } ], "metricValues": [ { "value": "15" } ] ```
 */
export interface Row {
  /**
   * List of requested dimension values. In a PivotReport, dimension_values are
   * only listed for dimensions included in a pivot.
   */
  dimensionValues?: DimensionValue[];
  /**
   * List of requested visible metric values.
   */
  metricValues?: MetricValue[];
}

/**
 * The request to generate a pivot report.
 */
export interface RunPivotReportRequest {
  /**
   * Cohort group associated with this request. If there is a cohort group in
   * the request the 'cohort' dimension must be present.
   */
  cohortSpec?: CohortSpec;
  /**
   * A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the
   * field is empty, the report uses the property's default currency.
   */
  currencyCode?: string;
  /**
   * The date range to retrieve event data for the report. If multiple date
   * ranges are specified, event data from each date range is used in the
   * report. A special dimension with field name "dateRange" can be included in
   * a Pivot's field names; if included, the report compares between date
   * ranges. In a cohort request, this `dateRanges` must be unspecified.
   */
  dateRanges?: DateRange[];
  /**
   * The filter clause of dimensions. Dimensions must be requested to be used
   * in this filter. Metrics cannot be used in this filter.
   */
  dimensionFilter?: FilterExpression;
  /**
   * The dimensions requested. All defined dimensions must be used by one of
   * the following: dimension_expression, dimension_filter, pivots, order_bys.
   */
  dimensions?: Dimension[];
  /**
   * If false or unspecified, each row with all metrics equal to 0 will not be
   * returned. If true, these rows will be returned if they are not separately
   * removed by a filter. Regardless of this `keep_empty_rows` setting, only
   * data recorded by the Google Analytics (GA4) property can be displayed in a
   * report. For example if a property never logs a `purchase` event, then a
   * query for the `eventName` dimension and `eventCount` metric will not have a
   * row eventName: "purchase" and eventCount: 0.
   */
  keepEmptyRows?: boolean;
  /**
   * The filter clause of metrics. Applied at post aggregation phase, similar
   * to SQL having-clause. Metrics must be requested to be used in this filter.
   * Dimensions cannot be used in this filter.
   */
  metricFilter?: FilterExpression;
  /**
   * The metrics requested, at least one metric needs to be specified. All
   * defined metrics must be used by one of the following: metric_expression,
   * metric_filter, order_bys.
   */
  metrics?: Metric[];
  /**
   * Describes the visual format of the report's dimensions in columns or rows.
   * The union of the fieldNames (dimension names) in all pivots must be a
   * subset of dimension names defined in Dimensions. No two pivots can share a
   * dimension. A dimension is only visible if it appears in a pivot.
   */
  pivots?: Pivot[];
  /**
   * A Google Analytics GA4 property identifier whose events are tracked.
   * Specified in the URL path and not the body. To learn more, see [where to
   * find your Property
   * ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id).
   * Within a batch request, this property should either be unspecified or
   * consistent with the batch-level property. Example: properties/1234
   */
  property?: string;
  /**
   * Toggles whether to return the current state of this Analytics Property's
   * quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   */
  returnPropertyQuota?: boolean;
}

function serializeRunPivotReportRequest(data: any): RunPivotReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? serializeFilterExpression(data["dimensionFilter"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? serializeFilterExpression(data["metricFilter"]) : undefined,
    pivots: data["pivots"] !== undefined ? data["pivots"].map((item: any) => (serializePivot(item))) : undefined,
  };
}

function deserializeRunPivotReportRequest(data: any): RunPivotReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? deserializeFilterExpression(data["dimensionFilter"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? deserializeFilterExpression(data["metricFilter"]) : undefined,
    pivots: data["pivots"] !== undefined ? data["pivots"].map((item: any) => (deserializePivot(item))) : undefined,
  };
}

/**
 * The response pivot report table corresponding to a pivot request.
 */
export interface RunPivotReportResponse {
  /**
   * Aggregation of metric values. Can be totals, minimums, or maximums. The
   * returned aggregations are controlled by the metric_aggregations in the
   * pivot. The type of aggregation returned in each row is shown by the
   * dimension_values which are set to "RESERVED_".
   */
  aggregates?: Row[];
  /**
   * Describes dimension columns. The number of DimensionHeaders and ordering
   * of DimensionHeaders matches the dimensions present in rows.
   */
  dimensionHeaders?: DimensionHeader[];
  /**
   * Identifies what kind of resource this message is. This `kind` is always
   * the fixed string "analyticsData#runPivotReport". Useful to distinguish
   * between response types in JSON.
   */
  kind?: string;
  /**
   * Metadata for the report.
   */
  metadata?: ResponseMetaData;
  /**
   * Describes metric columns. The number of MetricHeaders and ordering of
   * MetricHeaders matches the metrics present in rows.
   */
  metricHeaders?: MetricHeader[];
  /**
   * Summarizes the columns and rows created by a pivot. Each pivot in the
   * request produces one header in the response. If we have a request like
   * this: "pivots": [{ "fieldNames": ["country", "city"] }, { "fieldNames":
   * "eventName" }] We will have the following `pivotHeaders` in the response:
   * "pivotHeaders" : [{ "dimensionHeaders": [{ "dimensionValues": [ { "value":
   * "United Kingdom" }, { "value": "London" } ] }, { "dimensionValues": [ {
   * "value": "Japan" }, { "value": "Osaka" } ] }] }, { "dimensionHeaders": [{
   * "dimensionValues": [{ "value": "session_start" }] }, { "dimensionValues":
   * [{ "value": "scroll" }] }] }]
   */
  pivotHeaders?: PivotHeader[];
  /**
   * This Analytics Property's quota state including this request.
   */
  propertyQuota?: PropertyQuota;
  /**
   * Rows of dimension value combinations and metric values in the report.
   */
  rows?: Row[];
}

/**
 * The request to generate a realtime report.
 */
export interface RunRealtimeReportRequest {
  /**
   * The filter clause of dimensions. Metrics cannot be used in this filter.
   */
  dimensionFilter?: FilterExpression;
  /**
   * The dimensions requested and displayed.
   */
  dimensions?: Dimension[];
  /**
   * The number of rows to return. If unspecified, 10,000 rows are returned.
   * The API returns a maximum of 100,000 rows per request, no matter how many
   * you ask for. `limit` must be positive. The API can also return fewer rows
   * than the requested `limit`, if there aren't as many dimension values as the
   * `limit`. For instance, there are fewer than 300 possible values for the
   * dimension `country`, so when reporting on only `country`, you can't get
   * more than 300 rows, even if you set `limit` to a higher value.
   */
  limit?: bigint;
  /**
   * Aggregation of metrics. Aggregated metric values will be shown in rows
   * where the dimension_values are set to "RESERVED_(MetricAggregation)".
   */
  metricAggregations?:  | "METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT"[];
  /**
   * The filter clause of metrics. Applied at post aggregation phase, similar
   * to SQL having-clause. Dimensions cannot be used in this filter.
   */
  metricFilter?: FilterExpression;
  /**
   * The metrics requested and displayed.
   */
  metrics?: Metric[];
  /**
   * The minute ranges of event data to read. If unspecified, one minute range
   * for the last 30 minutes will be used. If multiple minute ranges are
   * requested, each response row will contain a zero based minute range index.
   * If two minute ranges overlap, the event data for the overlapping minutes is
   * included in the response rows for both minute ranges.
   */
  minuteRanges?: MinuteRange[];
  /**
   * Specifies how rows are ordered in the response.
   */
  orderBys?: OrderBy[];
  /**
   * Toggles whether to return the current state of this Analytics Property's
   * Realtime quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   */
  returnPropertyQuota?: boolean;
}

function serializeRunRealtimeReportRequest(data: any): RunRealtimeReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? serializeFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? serializeFilterExpression(data["metricFilter"]) : undefined,
  };
}

function deserializeRunRealtimeReportRequest(data: any): RunRealtimeReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? deserializeFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? deserializeFilterExpression(data["metricFilter"]) : undefined,
  };
}

/**
 * The response realtime report table corresponding to a request.
 */
export interface RunRealtimeReportResponse {
  /**
   * Describes dimension columns. The number of DimensionHeaders and ordering
   * of DimensionHeaders matches the dimensions present in rows.
   */
  dimensionHeaders?: DimensionHeader[];
  /**
   * Identifies what kind of resource this message is. This `kind` is always
   * the fixed string "analyticsData#runRealtimeReport". Useful to distinguish
   * between response types in JSON.
   */
  kind?: string;
  /**
   * If requested, the maximum values of metrics.
   */
  maximums?: Row[];
  /**
   * Describes metric columns. The number of MetricHeaders and ordering of
   * MetricHeaders matches the metrics present in rows.
   */
  metricHeaders?: MetricHeader[];
  /**
   * If requested, the minimum values of metrics.
   */
  minimums?: Row[];
  /**
   * This Analytics Property's Realtime quota state including this request.
   */
  propertyQuota?: PropertyQuota;
  /**
   * The total number of rows in the query result. `rowCount` is independent of
   * the number of rows returned in the response and the `limit` request
   * parameter. For example if a query returns 175 rows and includes `limit` of
   * 50 in the API request, the response will contain `rowCount` of 175 but only
   * 50 rows.
   */
  rowCount?: number;
  /**
   * Rows of dimension value combinations and metric values in the report.
   */
  rows?: Row[];
  /**
   * If requested, the totaled values of metrics.
   */
  totals?: Row[];
}

/**
 * The request to generate a report.
 */
export interface RunReportRequest {
  /**
   * Cohort group associated with this request. If there is a cohort group in
   * the request the 'cohort' dimension must be present.
   */
  cohortSpec?: CohortSpec;
  /**
   * A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the
   * field is empty, the report uses the property's default currency.
   */
  currencyCode?: string;
  /**
   * Date ranges of data to read. If multiple date ranges are requested, each
   * response row will contain a zero based date range index. If two date ranges
   * overlap, the event data for the overlapping days is included in the
   * response rows for both date ranges. In a cohort request, this `dateRanges`
   * must be unspecified.
   */
  dateRanges?: DateRange[];
  /**
   * Dimension filters let you ask for only specific dimension values in the
   * report. To learn more, see [Fundamentals of Dimension
   * Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters)
   * for examples. Metrics cannot be used in this filter.
   */
  dimensionFilter?: FilterExpression;
  /**
   * The dimensions requested and displayed.
   */
  dimensions?: Dimension[];
  /**
   * If false or unspecified, each row with all metrics equal to 0 will not be
   * returned. If true, these rows will be returned if they are not separately
   * removed by a filter. Regardless of this `keep_empty_rows` setting, only
   * data recorded by the Google Analytics (GA4) property can be displayed in a
   * report. For example if a property never logs a `purchase` event, then a
   * query for the `eventName` dimension and `eventCount` metric will not have a
   * row eventName: "purchase" and eventCount: 0.
   */
  keepEmptyRows?: boolean;
  /**
   * The number of rows to return. If unspecified, 10,000 rows are returned.
   * The API returns a maximum of 100,000 rows per request, no matter how many
   * you ask for. `limit` must be positive. The API can also return fewer rows
   * than the requested `limit`, if there aren't as many dimension values as the
   * `limit`. For instance, there are fewer than 300 possible values for the
   * dimension `country`, so when reporting on only `country`, you can't get
   * more than 300 rows, even if you set `limit` to a higher value. To learn
   * more about this pagination parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  limit?: bigint;
  /**
   * Aggregation of metrics. Aggregated metric values will be shown in rows
   * where the dimension_values are set to "RESERVED_(MetricAggregation)".
   */
  metricAggregations?:  | "METRIC_AGGREGATION_UNSPECIFIED" | "TOTAL" | "MINIMUM" | "MAXIMUM" | "COUNT"[];
  /**
   * The filter clause of metrics. Applied after aggregating the report's rows,
   * similar to SQL having-clause. Dimensions cannot be used in this filter.
   */
  metricFilter?: FilterExpression;
  /**
   * The metrics requested and displayed.
   */
  metrics?: Metric[];
  /**
   * The row count of the start row. The first row is counted as row 0. When
   * paging, the first request does not specify offset; or equivalently, sets
   * offset to 0; the first request returns the first `limit` of rows. The
   * second request sets offset to the `limit` of the first request; the second
   * request returns the second `limit` of rows. To learn more about this
   * pagination parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  offset?: bigint;
  /**
   * Specifies how rows are ordered in the response.
   */
  orderBys?: OrderBy[];
  /**
   * A Google Analytics GA4 property identifier whose events are tracked.
   * Specified in the URL path and not the body. To learn more, see [where to
   * find your Property
   * ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id).
   * Within a batch request, this property should either be unspecified or
   * consistent with the batch-level property. Example: properties/1234
   */
  property?: string;
  /**
   * Toggles whether to return the current state of this Analytics Property's
   * quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   */
  returnPropertyQuota?: boolean;
}

function serializeRunReportRequest(data: any): RunReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? serializeFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? serializeFilterExpression(data["metricFilter"]) : undefined,
    offset: data["offset"] !== undefined ? String(data["offset"]) : undefined,
  };
}

function deserializeRunReportRequest(data: any): RunReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? deserializeFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? deserializeFilterExpression(data["metricFilter"]) : undefined,
    offset: data["offset"] !== undefined ? BigInt(data["offset"]) : undefined,
  };
}

/**
 * The response report table corresponding to a request.
 */
export interface RunReportResponse {
  /**
   * Describes dimension columns. The number of DimensionHeaders and ordering
   * of DimensionHeaders matches the dimensions present in rows.
   */
  dimensionHeaders?: DimensionHeader[];
  /**
   * Identifies what kind of resource this message is. This `kind` is always
   * the fixed string "analyticsData#runReport". Useful to distinguish between
   * response types in JSON.
   */
  kind?: string;
  /**
   * If requested, the maximum values of metrics.
   */
  maximums?: Row[];
  /**
   * Metadata for the report.
   */
  metadata?: ResponseMetaData;
  /**
   * Describes metric columns. The number of MetricHeaders and ordering of
   * MetricHeaders matches the metrics present in rows.
   */
  metricHeaders?: MetricHeader[];
  /**
   * If requested, the minimum values of metrics.
   */
  minimums?: Row[];
  /**
   * This Analytics Property's quota state including this request.
   */
  propertyQuota?: PropertyQuota;
  /**
   * The total number of rows in the query result. `rowCount` is independent of
   * the number of rows returned in the response, the `limit` request parameter,
   * and the `offset` request parameter. For example if a query returns 175 rows
   * and includes `limit` of 50 in the API request, the response will contain
   * `rowCount` of 175 but only 50 rows. To learn more about this pagination
   * parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  rowCount?: number;
  /**
   * Rows of dimension value combinations and metric values in the report.
   */
  rows?: Row[];
  /**
   * If requested, the totaled values of metrics.
   */
  totals?: Row[];
}

/**
 * The schema restrictions actively enforced in creating this report. To learn
 * more, see [Access and data-restriction
 * management](https://support.google.com/analytics/answer/10851388).
 */
export interface SchemaRestrictionResponse {
  /**
   * All restrictions actively enforced in creating the report. For example,
   * `purchaseRevenue` always has the restriction type `REVENUE_DATA`. However,
   * this active response restriction is only populated if the user's custom
   * role disallows access to `REVENUE_DATA`.
   */
  activeMetricRestrictions?: ActiveMetricRestriction[];
}

/**
 * The filter for string
 */
export interface StringFilter {
  /**
   * If true, the string value is case sensitive.
   */
  caseSensitive?: boolean;
  /**
   * The match type for this filter.
   */
  matchType?:  | "MATCH_TYPE_UNSPECIFIED" | "EXACT" | "BEGINS_WITH" | "ENDS_WITH" | "CONTAINS" | "FULL_REGEXP" | "PARTIAL_REGEXP";
  /**
   * The string value used for the matching.
   */
  value?: string;
}