// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Developer Reporting API Client for Deno
 * ===================================================
 * 
 * 
 * 
 * Docs: https://developers.google.com/play/developer/reporting
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class PlayDeveloperReporting {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://playdeveloperreporting.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists anomalies in any of the datasets.
   *
   * @param parent Required. Parent app for which anomalies were detected. Format: apps/{app}
   */
  async anomaliesList(parent: string, opts: AnomaliesListOptions = {}): Promise<GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/anomalies`);
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
    return deserializeGooglePlayDeveloperReportingV1beta1ListAnomaliesResponse(data);
  }

  /**
   * Describes the properties of the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/anrRateMetricSet
   */
  async vitalsAnrrateGet(name: string): Promise<GooglePlayDeveloperReportingV1beta1AnrRateMetricSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePlayDeveloperReportingV1beta1AnrRateMetricSet(data);
  }

  /**
   * Queries the metrics in the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/anrRateMetricSet
   */
  async vitalsAnrrateQuery(name: string, req: GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest): Promise<GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse> {
    req = serializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse(data);
  }

  /**
   * Describes the properties of the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/crashRateMetricSet
   */
  async vitalsCrashrateGet(name: string): Promise<GooglePlayDeveloperReportingV1beta1CrashRateMetricSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePlayDeveloperReportingV1beta1CrashRateMetricSet(data);
  }

  /**
   * Queries the metrics in the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/crashRateMetricSet
   */
  async vitalsCrashrateQuery(name: string, req: GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest): Promise<GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse> {
    req = serializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse(data);
  }

  /**
   * Describes the properties of the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet
   */
  async vitalsExcessivewakeuprateGet(name: string): Promise<GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet(data);
  }

  /**
   * Queries the metrics in the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet
   */
  async vitalsExcessivewakeuprateQuery(name: string, req: GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest): Promise<GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse> {
    req = serializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse(data);
  }

  /**
   * Describes the properties of the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet
   */
  async vitalsStuckbackgroundwakelockrateGet(name: string): Promise<GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet(data);
  }

  /**
   * Queries the metrics in the metric set.
   *
   * @param name Required. The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet
   */
  async vitalsStuckbackgroundwakelockrateQuery(name: string, req: GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest): Promise<GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse> {
    req = serializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse(data);
  }
}

/**
 * Additional options for PlayDeveloperReporting#anomaliesList.
 */
export interface AnomaliesListOptions {
  /**
   * Filtering criteria for anomalies. For basic filter guidance, please check:
   * https://google.aip.dev/160. **Supported functions:** *
   * `activeBetween(startTime, endTime)`: If specified, only list anomalies that
   * were active in between `startTime` (inclusive) and `endTime` (exclusive).
   * Both parameters are expected to conform to an RFC-3339 formatted string
   * (e.g. `2012-04-21T11:30:00-04:00`). UTC offsets are supported. Both
   * `startTime` and `endTime` accept the special value `UNBOUNDED`, to signify
   * intervals with no lower or upper bound, respectively. Examples: *
   * `activeBetween("2021-04-21T11:30:00Z", "2021-07-21T00:00:00Z")` *
   * `activeBetween(UNBOUNDED, "2021-11-21T00:00:00-04:00")` *
   * `activeBetween("2021-07-21T00:00:00-04:00", UNBOUNDED)`
   */
  filter?: string;
  /**
   * Maximum size of the returned data. If unspecified, at most 10 anomalies
   * will be returned. The maximum value is 100; values above 100 will be
   * coerced to 100.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListErrorReports` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListErrorReports` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Represents an anomaly detected in a dataset. Our anomaly detection systems
 * flag datapoints in a time series that fall outside of and expected range
 * derived from historical data. Although those expected ranges have an upper
 * and a lower bound, we only flag anomalies when the data has become
 * unexpectedly _worse_, which usually corresponds to the case where the metric
 * crosses the upper bound. Multiple contiguous datapoints in a timeline outside
 * of the expected range will be grouped into a single anomaly. Therefore, an
 * anomaly represents effectively a segment of a metric's timeline. The
 * information stored in the `timeline_spec`, `dimensions` and `metric` can be
 * used to fetch a full timeline with extended ragne for context. **Required
 * permissions**: to access this resource, the calling user needs the _View app
 * information (read-only)_ permission for the app.
 */
export interface GooglePlayDeveloperReportingV1beta1Anomaly {
  /**
   * Combination of dimensions in which the anomaly was detected.
   */
  dimensions?: GooglePlayDeveloperReportingV1beta1DimensionValue[];
  /**
   * Metric where the anomaly was detected, together with the anomalous value.
   */
  metric?: GooglePlayDeveloperReportingV1beta1MetricValue;
  /**
   * Metric set resource where the anomaly was detected.
   */
  metricSet?: string;
  /**
   * Name of the anomaly. Format: apps/{app}/anomalies/{anomaly}
   */
  name?: string;
  /**
   * Timeline specification that covers the anomaly period.
   */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
}

function serializeGooglePlayDeveloperReportingV1beta1Anomaly(data: any): GooglePlayDeveloperReportingV1beta1Anomaly {
  return {
    ...data,
    dimensions: data["dimensions"] !== undefined ? data["dimensions"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1DimensionValue(item))) : undefined,
    timelineSpec: data["timelineSpec"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1Anomaly(data: any): GooglePlayDeveloperReportingV1beta1Anomaly {
  return {
    ...data,
    dimensions: data["dimensions"] !== undefined ? data["dimensions"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1DimensionValue(item))) : undefined,
    timelineSpec: data["timelineSpec"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

/**
 * Singleton resource representing the set of ANR (Application not responding)
 * metrics. This metric set contains ANRs data combined with usage data to
 * produce a normalized metric independent of user counts. **Supported
 * aggregation periods:** * DAILY: metrics are aggregated in calendar date
 * intervals. Due to historical constraints, the only supported timezone is
 * `America/Los_Angeles`. **Supported metrics:** * `anrRate`
 * (`google.type.Decimal`): Percentage of distinct users in the aggregation
 * period that experienced at least one ANR. * `anrRate7dUserWeighted`
 * (`google.type.Decimal`): Rolling average value of `anrRate` in the last 7
 * days. The daily values are weighted by the count of distinct users for the
 * day. * `anrRate28dUserWeighted` (`google.type.Decimal`): Rolling average
 * value of `anrRate` in the last 28 days. The daily values are weighted by the
 * count of distinct users for the day. * `userPerceivedAnrRate`
 * (`google.type.Decimal`): Percentage of distinct users in the aggregation
 * period that experienced at least one user-perceived ANR. User-perceived ANRs
 * are currently those of 'Input dispatching' type. *
 * `userPerceivedAnrRate7dUserWeighted` (`google.type.Decimal`): Rolling average
 * value of `userPerceivedAnrRate` in the last 7 days. The daily values are
 * weighted by the count of distinct users for the day. *
 * `userPerceivedAnrRate28dUserWeighted` (`google.type.Decimal`): Rolling
 * average value of `userPerceivedAnrRate` in the last 28 days. The daily values
 * are weighted by the count of distinct users for the day. * `distinctUsers`
 * (`google.type.Decimal`): Count of distinct users in the aggregation period
 * that were used as normalization value for the `anrRate` and
 * `userPerceivedAnrRate` metrics. A user is counted in this metric if they used
 * the app in the foreground during the aggregation period. Care must be taken
 * not to aggregate this count further, as it may result in users being counted
 * multiple times. **Supported dimensions:** * `apiLevel` (string): the API
 * level of Android that was running on the user's device. * `versionCode`
 * (int64): version of the app that was running on the user's device. *
 * `deviceModel` (string): unique identifier of the user's device model. *
 * `deviceType` (string): the type (also known as form factor) of the user's
 * device. * `countryCode` (string): the country or region of the user's device
 * based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US
 * for the United States). * `deviceRamBucket` (int64): RAM of the device, in
 * MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the
 * device's primary system-on-chip, e.g., Samsung.
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
 * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
 * e.g., "Exynos 2100".
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
 * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
 * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
 * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
 * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
 * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
 * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
 * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
 * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
 * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
 * device, e.g., mdpi, hdpi. **Required permissions**: to access this resource,
 * the calling user needs the _View app information (read-only)_ permission for
 * the app. **Related metric sets:** * vitals.errors contains unnormalized
 * version (absolute counts) of crashes. * vitals.errors contains normalized
 * metrics about crashes, another stability metric.
 */
export interface GooglePlayDeveloperReportingV1beta1AnrRateMetricSet {
  /**
   * Summary about data freshness in this resource.
   */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
  /**
   * The resource name. Format: apps/{app}/anrRateMetricSet
   */
  name?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1AnrRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1AnrRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1AnrRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1AnrRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

/**
 * Singleton resource representing the set of crashrate metrics. This metric
 * set contains crashes data combined with usage data to produce a normalized
 * metric independent of user counts. **Supported aggregation periods:** *
 * DAILY: metrics are aggregated in calendar date intervals. Due to historical
 * constraints, the only supported timezone is `America/Los_Angeles`.
 * **Supported metrics:** * `crashRate` (`google.type.Decimal`): Percentage of
 * distinct users in the aggregation period that experienced at least one crash.
 * * `crashRate7dUserWeighted` (`google.type.Decimal`): Rolling average value of
 * `crashRate` in the last 7 days. The daily values are weighted by the count of
 * distinct users for the day. * `crashRate28dUserWeighted`
 * (`google.type.Decimal`): Rolling average value of `crashRate` in the last 28
 * days. The daily values are weighted by the count of distinct users for the
 * day. * `userPerceivedCrashRate` (`google.type.Decimal`): Percentage of
 * distinct users in the aggregation period that experienced at least one crash
 * while they were actively using your app (a user-perceived crash). An app is
 * considered to be in active use if it is displaying any activity or executing
 * any foreground service. * `userPerceivedCrashRate7dUserWeighted`
 * (`google.type.Decimal`): Rolling average value of `userPerceivedCrashRate` in
 * the last 7 days. The daily values are weighted by the count of distinct users
 * for the day. * `userPerceivedCrashRate28dUserWeighted`
 * (`google.type.Decimal`): Rolling average value of `userPerceivedCrashRate` in
 * the last 28 days. The daily values are weighted by the count of distinct
 * users for the day. * `distinctUsers` (`google.type.Decimal`): Count of
 * distinct users in the aggregation period that were used as normalization
 * value for the `crashRate` and `userPerceivedCrashRate` metrics. A user is
 * counted in this metric if they used the app actively during the aggregation
 * period. An app is considered to be in active use if it is displaying any
 * activity or executing any foreground service. Care must be taken not to
 * aggregate this count further, as it may result in users being counted
 * multiple times. **Supported dimensions:** * `apiLevel` (string): the API
 * level of Android that was running on the user's device. * `versionCode`
 * (int64): version of the app that was running on the user's device. *
 * `deviceModel` (string): unique identifier of the user's device model. *
 * `deviceType` (string): the type (also known as form factor) of the user's
 * device. * `countryCode` (string): the country or region of the user's device
 * based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US
 * for the United States). * `deviceRamBucket` (int64): RAM of the device, in
 * MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the
 * device's primary system-on-chip, e.g., Samsung.
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
 * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
 * e.g., "Exynos 2100".
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
 * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
 * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
 * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
 * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
 * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
 * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
 * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
 * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
 * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
 * device, e.g., mdpi, hdpi. **Required permissions**: to access this resource,
 * the calling user needs the _View app information (read-only)_ permission for
 * the app. **Related metric sets:** * vitals.errors contains unnormalized
 * version (absolute counts) of crashes. * vitals.errors contains normalized
 * metrics about ANRs, another stability metric.
 */
export interface GooglePlayDeveloperReportingV1beta1CrashRateMetricSet {
  /**
   * Summary about data freshness in this resource.
   */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
  /**
   * The resource name. Format: apps/{app}/crashRateMetricSet
   */
  name?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1CrashRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1CrashRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1CrashRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1CrashRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

/**
 * Represents the value of a single dimension.
 */
export interface GooglePlayDeveloperReportingV1beta1DimensionValue {
  /**
   * Name of the dimension.
   */
  dimension?: string;
  /**
   * Actual value, represented as an int64.
   */
  int64Value?: bigint;
  /**
   * Actual value, represented as a string.
   */
  stringValue?: string;
  /**
   * Optional. Human-friendly label for the value, always in English. For
   * example, 'Spain' for the 'ES' country code. Whereas the dimension value is
   * stable, this value label is subject to change. Do not assume that the
   * (value, value_label) relationship is stable. For example, the ISO country
   * code 'MK' changed its name recently to 'North Macedonia'.
   */
  valueLabel?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1DimensionValue(data: any): GooglePlayDeveloperReportingV1beta1DimensionValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1DimensionValue(data: any): GooglePlayDeveloperReportingV1beta1DimensionValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * Singleton resource representing the set of Excessive Weakeups metrics. This
 * metric set contains AlarmManager wakeup counts data combined with process
 * state data to produce a normalized metric independent of user counts.
 * **Supported aggregation periods:** * DAILY: metrics are aggregated in
 * calendar date intervals. Due to historical constraints, the only supported
 * timezone is `America/Los_Angeles`. **Supported metrics:** *
 * `excessiveWakeupRate` (`google.type.Decimal`): Percentage of distinct users
 * in the aggregation period that had more than 10 wakeups per hour. *
 * `excessiveWakeupRate7dUserWeighted` (`google.type.Decimal`): Rolling average
 * value of `excessiveWakeupRate` in the last 7 days. The daily values are
 * weighted by the count of distinct users for the day. *
 * `excessiveWakeupRate28dUserWeighted` (`google.type.Decimal`): Rolling average
 * value of `excessiveWakeupRate` in the last 28 days. The daily values are
 * weighted by the count of distinct users for the day. * `distinctUsers`
 * (`google.type.Decimal`): Count of distinct users in the aggregation period
 * that were used as normalization value for the `excessiveWakeupRate` metric. A
 * user is counted in this metric if they app was doing any work on the device,
 * i.e., not just active foreground usage but also background work. Care must be
 * taken not to aggregate this count further, as it may result in users being
 * counted multiple times. **Supported dimensions:** * `apiLevel` (string): the
 * API level of Android that was running on the user's device. * `versionCode`
 * (int64): version of the app that was running on the user's device. *
 * `deviceModel` (string): unique identifier of the user's device model. *
 * `deviceType` (string): the type (also known as form factor) of the user's
 * device. * `countryCode` (string): the country or region of the user's device
 * based on their IP address, represented as a 2-letter ISO-3166 code (e.g. US
 * for the United States). * `deviceRamBucket` (int64): RAM of the device, in
 * MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string): Make of the
 * device's primary system-on-chip, e.g., Samsung.
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
 * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
 * e.g., "Exynos 2100".
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
 * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
 * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
 * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
 * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
 * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
 * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
 * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
 * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
 * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
 * device, e.g., mdpi, hdpi. **Required permissions**: to access this resource,
 * the calling user needs the _View app information (read-only)_ permission for
 * the app.
 */
export interface GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet {
  /**
   * Summary about data freshness in this resource.
   */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
  /**
   * The resource name. Format: apps/{app}/excessiveWakeupRateMetricSet
   */
  name?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1ExcessiveWakeupRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

/**
 * Represents the latest available time that can be requested in a
 * TimelineSpec. Different aggregation periods have different freshness. For
 * example, `DAILY` aggregation may lag behind `HOURLY` in cases where such
 * aggregation is computed only once at the end of the day.
 */
export interface GooglePlayDeveloperReportingV1beta1FreshnessInfo {
  /**
   * Information about data freshness for every supported aggregation period.
   * This field has set semantics, keyed by the `aggregation_period` field.
   */
  freshnesses?: GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness[];
}

function serializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data: any): GooglePlayDeveloperReportingV1beta1FreshnessInfo {
  return {
    ...data,
    freshnesses: data["freshnesses"] !== undefined ? data["freshnesses"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data: any): GooglePlayDeveloperReportingV1beta1FreshnessInfo {
  return {
    ...data,
    freshnesses: data["freshnesses"] !== undefined ? data["freshnesses"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness(item))) : undefined,
  };
}

/**
 * Information about data freshness for a single aggregation period.
 */
export interface GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness {
  /**
   * Aggregation period for which data is available.
   */
  aggregationPeriod?:  | "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY";
  /**
   * Latest end time for which data is available, for the aggregation period.
   * The time is specified in the metric set's default timezone. *Note:* time
   * ranges in TimelineSpec are represented as `start_time, end_time)`. For
   * example, if the latest available timeline data point for a `DAILY`
   * aggregation period is `2021-06-23 00:00:00 America/Los_Angeles`, the value
   * of this field would be `2021-06-24 00:00:00 America/Los_Angeles` so it can
   * be easily reused in [TimelineSpec.end_time.
   */
  latestEndTime?: GoogleTypeDateTime;
}

function serializeGooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness(data: any): GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness {
  return {
    ...data,
    latestEndTime: data["latestEndTime"] !== undefined ? serializeGoogleTypeDateTime(data["latestEndTime"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness(data: any): GooglePlayDeveloperReportingV1beta1FreshnessInfoFreshness {
  return {
    ...data,
    latestEndTime: data["latestEndTime"] !== undefined ? deserializeGoogleTypeDateTime(data["latestEndTime"]) : undefined,
  };
}

/**
 * Response with a list of anomalies in datasets.
 */
export interface GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse {
  /**
   * Anomalies that were found.
   */
  anomalies?: GooglePlayDeveloperReportingV1beta1Anomaly[];
  /**
   * Continuation token to fetch the next page of data.
   */
  nextPageToken?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1ListAnomaliesResponse(data: any): GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse {
  return {
    ...data,
    anomalies: data["anomalies"] !== undefined ? data["anomalies"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1Anomaly(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1ListAnomaliesResponse(data: any): GooglePlayDeveloperReportingV1beta1ListAnomaliesResponse {
  return {
    ...data,
    anomalies: data["anomalies"] !== undefined ? data["anomalies"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1Anomaly(item))) : undefined,
  };
}

/**
 * Represents a row of dimensions and metrics.
 */
export interface GooglePlayDeveloperReportingV1beta1MetricsRow {
  /**
   * Granularity of the aggregation period of the row.
   */
  aggregationPeriod?:  | "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY";
  /**
   * Dimension columns in the row.
   */
  dimensions?: GooglePlayDeveloperReportingV1beta1DimensionValue[];
  /**
   * Metric columns in the row.
   */
  metrics?: GooglePlayDeveloperReportingV1beta1MetricValue[];
  /**
   * Starting date (and time for hourly aggregation) of the period covered by
   * this row.
   */
  startTime?: GoogleTypeDateTime;
}

function serializeGooglePlayDeveloperReportingV1beta1MetricsRow(data: any): GooglePlayDeveloperReportingV1beta1MetricsRow {
  return {
    ...data,
    dimensions: data["dimensions"] !== undefined ? data["dimensions"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1DimensionValue(item))) : undefined,
    startTime: data["startTime"] !== undefined ? serializeGoogleTypeDateTime(data["startTime"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1MetricsRow(data: any): GooglePlayDeveloperReportingV1beta1MetricsRow {
  return {
    ...data,
    dimensions: data["dimensions"] !== undefined ? data["dimensions"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1DimensionValue(item))) : undefined,
    startTime: data["startTime"] !== undefined ? deserializeGoogleTypeDateTime(data["startTime"]) : undefined,
  };
}

/**
 * Represents the value of a metric.
 */
export interface GooglePlayDeveloperReportingV1beta1MetricValue {
  /**
   * Actual value, represented as a decimal number.
   */
  decimalValue?: GoogleTypeDecimal;
  /**
   * Name of the metric.
   */
  metric?: string;
}

/**
 * Request message for QueryAnrRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest {
  /**
   * Dimensions to slice the metrics by. **Supported dimensions:** * `apiLevel`
   * (string): the API level of Android that was running on the user's device. *
   * `versionCode` (int64): version of the app that was running on the user's
   * device. * `deviceModel` (string): unique identifier of the user's device
   * model. * `deviceType` (string): the type (also known as form factor) of the
   * user's device. * `countryCode` (string): the country or region of the
   * user's device based on their IP address, represented as a 2-letter ISO-3166
   * code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of
   * the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string):
   * Make of the device's primary system-on-chip, e.g., Samsung.
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
   * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
   * e.g., "Exynos 2100".
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
   * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
   * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
   * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
   * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
   * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
   * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
   * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
   * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
   * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
   * device, e.g., mdpi, hdpi.
   */
  dimensions?: string[];
  /**
   * Filters to apply to data. The filtering expression follows
   * [AIP-160](https://google.aip.dev/160) standard and supports filtering by
   * equality of all breakdown dimensions.
   */
  filter?: string;
  /**
   * Metrics to aggregate. **Supported metrics:** * `anrRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that experienced at least one ANR. * `anrRate7dUserWeighted`
   * (`google.type.Decimal`): Rolling average value of `anrRate` in the last 7
   * days. The daily values are weighted by the count of distinct users for the
   * day. * `anrRate28dUserWeighted` (`google.type.Decimal`): Rolling average
   * value of `anrRate` in the last 28 days. The daily values are weighted by
   * the count of distinct users for the day. * `userPerceivedAnrRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that experienced at least one user-perceived ANR. User-perceived
   * ANRs are currently those of 'Input dispatching' type. *
   * `userPerceivedAnrRate7dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `userPerceivedAnrRate` in the last 7 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `userPerceivedAnrRate28dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `userPerceivedAnrRate` in the last 28 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the
   * aggregation period that were used as normalization value for the `anrRate`
   * and `userPerceivedAnrRate` metrics. A user is counted in this metric if
   * they used the app in the foreground during the aggregation period. Care
   * must be taken not to aggregate this count further, as it may result in
   * users being counted multiple times.
   */
  metrics?: string[];
  /**
   * Maximum size of the returned data. If unspecified, at most 1000 rows will
   * be returned. The maximum value is 100,000; values above 100,000 will be
   * coerced to 100,000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to the
   * request must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Specification of the timeline aggregation parameters. **Supported
   * aggregation periods:** * DAILY: metrics are aggregated in calendar date
   * intervals. Due to historical constraints, the default and only supported
   * timezone is `America/Los_Angeles`.
   */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /**
   * User view to select. The output data will correspond to the selected view.
   * **Supported values:** * `OS_PUBLIC` To select data from all publicly
   * released Android versions. This is the default. Supports all the above
   * dimensions. * `APP_TESTERS` To select data from users who have opted in to
   * be testers. Supports all the above dimensions. * `OS_BETA` To select data
   * from beta android versions only, excluding data from released android
   * versions. Only the following dimensions are supported: * `versionCode`
   * (int64): version of the app that was running on the user's device. *
   * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004".
   */
  userCohort?:  | "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS";
}

function serializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

/**
 * Response message for QueryAnrRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse {
  /**
   * Continuation token to fetch the next page of data.
   */
  nextPageToken?: string;
  /**
   * Returned rows of data.
   */
  rows?: GooglePlayDeveloperReportingV1beta1MetricsRow[];
}

function serializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryAnrRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

/**
 * Request message for QueryCrashRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest {
  /**
   * Dimensions to slice the metrics by. **Supported dimensions:** * `apiLevel`
   * (string): the API level of Android that was running on the user's device. *
   * `versionCode` (int64): version of the app that was running on the user's
   * device. * `deviceModel` (string): unique identifier of the user's device
   * model. * `deviceType` (string): the type (also known as form factor) of the
   * user's device. * `countryCode` (string): the country or region of the
   * user's device based on their IP address, represented as a 2-letter ISO-3166
   * code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of
   * the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string):
   * Make of the device's primary system-on-chip, e.g., Samsung.
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
   * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
   * e.g., "Exynos 2100".
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
   * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
   * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
   * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
   * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
   * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
   * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
   * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
   * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
   * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
   * device, e.g., mdpi, hdpi.
   */
  dimensions?: string[];
  /**
   * Filters to apply to data. The filtering expression follows
   * [AIP-160](https://google.aip.dev/160) standard and supports filtering by
   * equality of all breakdown dimensions.
   */
  filter?: string;
  /**
   * Metrics to aggregate. **Supported metrics:** * `crashRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that experienced at least one crash. * `crashRate7dUserWeighted`
   * (`google.type.Decimal`): Rolling average value of `crashRate` in the last 7
   * days. The daily values are weighted by the count of distinct users for the
   * day. * `crashRate28dUserWeighted` (`google.type.Decimal`): Rolling average
   * value of `crashRate` in the last 28 days. The daily values are weighted by
   * the count of distinct users for the day. * `userPerceivedCrashRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that experienced at least one crash while they were actively using
   * your app (a user-perceived crash). An app is considered to be in active use
   * if it is displaying any activity or executing any foreground service. *
   * `userPerceivedCrashRate7dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `userPerceivedCrashRate` in the last 7 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `userPerceivedCrashRate28dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `userPerceivedCrashRate` in the last 28 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the
   * aggregation period that were used as normalization value for the
   * `crashRate` and `userPerceivedCrashRate` metrics. A user is counted in this
   * metric if they used the app actively during the aggregation period. An app
   * is considered to be in active use if it is displaying any activity or
   * executing any foreground service. Care must be taken not to aggregate this
   * count further, as it may result in users being counted multiple times.
   */
  metrics?: string[];
  /**
   * Maximum size of the returned data. If unspecified, at most 1000 rows will
   * be returned. The maximum value is 100,000; values above 100,000 will be
   * coerced to 100,000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to the
   * request must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Specification of the timeline aggregation parameters. **Supported
   * aggregation periods:** * DAILY: metrics are aggregated in calendar date
   * intervals. Due to historical constraints, the default and only supported
   * timezone is `America/Los_Angeles`.
   */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /**
   * User view to select. The output data will correspond to the selected view.
   * **Supported values:** * `OS_PUBLIC` To select data from all publicly
   * released Android versions. This is the default. Supports all the above
   * dimensions. * `APP_TESTERS` To select data from users who have opted in to
   * be testers. Supports all the above dimensions. * `OS_BETA` To select data
   * from beta android versions only, excluding data from released android
   * versions. Only the following dimensions are supported: * `versionCode`
   * (int64): version of the app that was running on the user's device. *
   * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004".
   */
  userCohort?:  | "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS";
}

function serializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

/**
 * Response message for QueryCrashRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse {
  /**
   * Continuation token to fetch the next page of data.
   */
  nextPageToken?: string;
  /**
   * Returned rows of data.
   */
  rows?: GooglePlayDeveloperReportingV1beta1MetricsRow[];
}

function serializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryCrashRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

/**
 * Request message for QueryExcessiveWakeupRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest {
  /**
   * Dimensions to slice the data by. **Supported dimensions:** * `apiLevel`
   * (string): the API level of Android that was running on the user's device. *
   * `versionCode` (int64): version of the app that was running on the user's
   * device. * `deviceModel` (string): unique identifier of the user's device
   * model. * `deviceType` (string): the type (also known as form factor) of the
   * user's device. * `countryCode` (string): the country or region of the
   * user's device based on their IP address, represented as a 2-letter ISO-3166
   * code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of
   * the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string):
   * Make of the device's primary system-on-chip, e.g., Samsung.
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
   * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
   * e.g., "Exynos 2100".
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
   * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
   * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
   * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
   * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
   * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
   * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
   * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
   * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
   * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
   * device, e.g., mdpi, hdpi.
   */
  dimensions?: string[];
  /**
   * Filters to apply to data. The filtering expression follows
   * [AIP-160](https://google.aip.dev/160) standard and supports filtering by
   * equality of all breakdown dimensions.
   */
  filter?: string;
  /**
   * Metrics to aggregate. **Supported metrics:** * `excessiveWakeupRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that had more than 10 wakeups per hour. *
   * `excessiveWakeupRate7dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `excessiveWakeupRate` in the last 7 days. The daily values
   * are weighted by the count of distinct users for the day. *
   * `excessiveWakeupRate28dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `excessiveWakeupRate` in the last 28 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the
   * aggregation period that were used as normalization value for the
   * `excessiveWakeupRate` metric. A user is counted in this metric if they app
   * was doing any work on the device, i.e., not just active foreground usage
   * but also background work. Care must be taken not to aggregate this count
   * further, as it may result in users being counted multiple times.
   */
  metrics?: string[];
  /**
   * Maximum size of the returned data. If unspecified, at most 1000 rows will
   * be returned. The maximum value is 100000; values above 100000 will be
   * coerced to 100000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to the
   * request must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Specification of the timeline aggregation parameters. **Supported
   * aggregation periods:** * DAILY: metrics are aggregated in calendar date
   * intervals. Due to historical constraints, the only supported timezone is
   * `America/Los_Angeles`.
   */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /**
   * User view to select. The output data will correspond to the selected view.
   * **Supported values:** * `OS_PUBLIC` To select data from all publicly
   * released Android versions. This is the default. Supports all the above
   * dimensions. * `APP_TESTERS` To select data from users who have opted in to
   * be testers. Supports all the above dimensions. * `OS_BETA` To select data
   * from beta android versions only, excluding data from released android
   * versions. Only the following dimensions are supported: * `versionCode`
   * (int64): version of the app that was running on the user's device. *
   * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004".
   */
  userCohort?:  | "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS";
}

function serializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

/**
 * Response message for QueryExcessiveWakeupRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse {
  /**
   * Continuation token to fetch the next page of data.
   */
  nextPageToken?: string;
  /**
   * Returned rows of data.
   */
  rows?: GooglePlayDeveloperReportingV1beta1MetricsRow[];
}

function serializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryExcessiveWakeupRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

/**
 * Request message for QueryStuckBackgroundWakelockRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest {
  /**
   * Dimensions to slice the data by. **Supported dimensions:** * `apiLevel`
   * (string): the API level of Android that was running on the user's device. *
   * `versionCode` (int64): version of the app that was running on the user's
   * device. * `deviceModel` (string): unique identifier of the user's device
   * model. * `deviceType` (string): the type (also known as form factor) of the
   * user's device. * `countryCode` (string): the country or region of the
   * user's device based on their IP address, represented as a 2-letter ISO-3166
   * code (e.g. US for the United States). * `deviceRamBucket` (int64): RAM of
   * the device, in MB, in buckets (3GB, 4GB, etc.). * `deviceSocMake` (string):
   * Make of the device's primary system-on-chip, e.g., Samsung.
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
   * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
   * e.g., "Exynos 2100".
   * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
   * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
   * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
   * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
   * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
   * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
   * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
   * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
   * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
   * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
   * device, e.g., mdpi, hdpi.
   */
  dimensions?: string[];
  /**
   * Filters to apply to data. The filtering expression follows
   * [AIP-160](https://google.aip.dev/160) standard and supports filtering by
   * equality of all breakdown dimensions.
   */
  filter?: string;
  /**
   * Metrics to aggregate. **Supported metrics:** * `stuckBgWakelockRate`
   * (`google.type.Decimal`): Percentage of distinct users in the aggregation
   * period that had a wakelock held in the background for longer than 1 hour. *
   * `stuckBgWakelockRate7dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `stuckBgWakelockRate` in the last 7 days. The daily values
   * are weighted by the count of distinct users for the day. *
   * `stuckBgWakelockRate28dUserWeighted` (`google.type.Decimal`): Rolling
   * average value of `stuckBgWakelockRate` in the last 28 days. The daily
   * values are weighted by the count of distinct users for the day. *
   * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the
   * aggregation period that were used as normalization value for the
   * `stuckBgWakelockRate` metric. A user is counted in this metric if they app
   * was doing any work on the device, i.e., not just active foreground usage
   * but also background work. Care must be taken not to aggregate this count
   * further, as it may result in users being counted multiple times.
   */
  metrics?: string[];
  /**
   * Maximum size of the returned data. If unspecified, at most 1000 rows will
   * be returned. The maximum value is 100000; values above 100000 will be
   * coerced to 100000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to the
   * request must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Specification of the timeline aggregation parameters. **Supported
   * aggregation periods:** * DAILY: metrics are aggregated in calendar date
   * intervals. Due to historical constraints, the only supported timezone is
   * `America/Los_Angeles`.
   */
  timelineSpec?: GooglePlayDeveloperReportingV1beta1TimelineSpec;
  /**
   * User view to select. The output data will correspond to the selected view.
   * **Supported values:** * `OS_PUBLIC` To select data from all publicly
   * released Android versions. This is the default. Supports all the above
   * dimensions. * `APP_TESTERS` To select data from users who have opted in to
   * be testers. Supports all the above dimensions. * `OS_BETA` To select data
   * from beta android versions only, excluding data from released android
   * versions. Only the following dimensions are supported: * `versionCode`
   * (int64): version of the app that was running on the user's device. *
   * `osBuild` (string): OS build of the user's device, e.g., "T1B2.220916.004".
   */
  userCohort?:  | "USER_COHORT_UNSPECIFIED" | "OS_PUBLIC" | "OS_BETA" | "APP_TESTERS";
}

function serializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest(data: any): GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetRequest {
  return {
    ...data,
    timelineSpec: data["timelineSpec"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data["timelineSpec"]) : undefined,
  };
}

/**
 * Response message for QueryStuckBackgroundWakelockRateMetricSet.
 */
export interface GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse {
  /**
   * Continuation token to fetch the next page of data.
   */
  nextPageToken?: string;
  /**
   * Returned rows of data.
   */
  rows?: GooglePlayDeveloperReportingV1beta1MetricsRow[];
}

function serializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse(data: any): GooglePlayDeveloperReportingV1beta1QueryStuckBackgroundWakelockRateMetricSetResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGooglePlayDeveloperReportingV1beta1MetricsRow(item))) : undefined,
  };
}

/**
 * Singleton resource representing the set of Stuck Background Wakelocks
 * metrics. This metric set contains PowerManager wakelock duration data
 * combined with process state data to produce a normalized metric independent
 * of user counts. **Supported aggregation periods:** * DAILY: metrics are
 * aggregated in calendar date intervals. Due to historical constraints, the
 * only supported timezone is `America/Los_Angeles`. **Supported metrics:** *
 * `stuckBgWakelockRate` (`google.type.Decimal`): Percentage of distinct users
 * in the aggregation period that had a wakelock held in the background for
 * longer than 1 hour. * `stuckBgWakelockRate7dUserWeighted`
 * (`google.type.Decimal`): Rolling average value of `stuckBgWakelockRate` in
 * the last 7 days. The daily values are weighted by the count of distinct users
 * for the day. * `stuckBgWakelockRate28dUserWeighted` (`google.type.Decimal`):
 * Rolling average value of `stuckBgWakelockRate` in the last 28 days. The daily
 * values are weighted by the count of distinct users for the day. *
 * `distinctUsers` (`google.type.Decimal`): Count of distinct users in the
 * aggregation period that were used as normalization value for the
 * `stuckBgWakelockRate` metric. A user is counted in this metric if their app
 * was doing any work on the device, i.e., not just active foreground usage but
 * also background work. Care must be taken not to aggregate this count further,
 * as it may result in users being counted multiple times. **Supported
 * dimensions:** * `apiLevel` (string): the API level of Android that was
 * running on the user's device. * `versionCode` (int64): version of the app
 * that was running on the user's device. * `deviceModel` (string): unique
 * identifier of the user's device model. * `deviceType` (string): the type
 * (also known as form factor) of the user's device. * `countryCode` (string):
 * the country or region of the user's device based on their IP address,
 * represented as a 2-letter ISO-3166 code (e.g. US for the United States). *
 * `deviceRamBucket` (int64): RAM of the device, in MB, in buckets (3GB, 4GB,
 * etc.). * `deviceSocMake` (string): Make of the device's primary
 * system-on-chip, e.g., Samsung.
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MANUFACTURER)
 * * `deviceSocModel` (string): Model of the device's primary system-on-chip,
 * e.g., "Exynos 2100".
 * [Reference](https://developer.android.com/reference/android/os/Build#SOC_MODEL)
 * * `deviceCpuMake` (string): Make of the device's CPU, e.g., Qualcomm. *
 * `deviceCpuModel` (string): Model of the device's CPU, e.g., "Kryo 240". *
 * `deviceGpuMake` (string): Make of the device's GPU, e.g., ARM. *
 * `deviceGpuModel` (string): Model of the device's GPU, e.g., Mali. *
 * `deviceGpuVersion` (string): Version of the device's GPU, e.g., T750. *
 * `deviceVulkanVersion` (string): Vulkan version of the device, e.g.,
 * "4198400". * `deviceGlEsVersion` (string): OpenGL ES version of the device,
 * e.g., "196610". * `deviceScreenSize` (string): Screen size of the device,
 * e.g., NORMAL, LARGE. * `deviceScreenDpi` (string): Screen density of the
 * device, e.g., mdpi, hdpi. **Required permissions**: to access this resource,
 * the calling user needs the _View app information (read-only)_ permission for
 * the app.
 */
export interface GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet {
  /**
   * Summary about data freshness in this resource.
   */
  freshnessInfo?: GooglePlayDeveloperReportingV1beta1FreshnessInfo;
  /**
   * The resource name. Format: apps/{app}/stuckBackgroundWakelockRateMetricSet
   */
  name?: string;
}

function serializeGooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? serializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet(data: any): GooglePlayDeveloperReportingV1beta1StuckBackgroundWakelockRateMetricSet {
  return {
    ...data,
    freshnessInfo: data["freshnessInfo"] !== undefined ? deserializeGooglePlayDeveloperReportingV1beta1FreshnessInfo(data["freshnessInfo"]) : undefined,
  };
}

/**
 * Specification of the time-related aggregation parameters of a timeline.
 * Timelines have an aggregation period (`DAILY`, `HOURLY`, etc) which defines
 * how events are aggregated in metrics. The points in a timeline are defined by
 * the starting DateTime of the aggregation period. The duration is implicit in
 * the AggregationPeriod. Hourly aggregation periods, when supported by a metric
 * set, are always specified in UTC to avoid ambiguities around daylight saving
 * time transitions, where an hour is skipped when adopting DST, and repeated
 * when abandoning DST. For example, the timestamp '2021-11-07 01:00:00
 * America/Los_Angeles' is ambiguous since it can correspond to '2021-11-07
 * 08:00:00 UTC' or '2021-11-07 09:00:00 UTC'. Daily aggregation periods require
 * specifying a timezone which will determine the precise instants of the start
 * and the end of the day. Not all metric sets support all timezones, so make
 * sure to check which timezones are supported by the metric set you want to
 * query.
 */
export interface GooglePlayDeveloperReportingV1beta1TimelineSpec {
  /**
   * Type of the aggregation period of the datapoints in the timeline.
   * Intervals are identified by the date and time at the start of the interval.
   */
  aggregationPeriod?:  | "AGGREGATION_PERIOD_UNSPECIFIED" | "HOURLY" | "DAILY";
  /**
   * Ending datapoint of the timeline (exclusive). See start_time for
   * restrictions. The timezone of the end point must match the timezone of the
   * start point.
   */
  endTime?: GoogleTypeDateTime;
  /**
   * Starting datapoint of the timeline (inclusive). Must be aligned to the
   * aggregation period as follows: * HOURLY: the 'minutes', 'seconds' and
   * 'nanos' fields must be unset. The time_zone can be left unset (defaults to
   * UTC) or set explicitly to "UTC". Setting any other utc_offset or timezone
   * id will result in a validation error. * DAILY: the 'hours', 'minutes',
   * 'seconds' and 'nanos' fields must be unset. Different metric sets support
   * different timezones. It can be left unset to use the default timezone
   * specified by the metric set. The timezone of the end point must match the
   * timezone of the start point.
   */
  startTime?: GoogleTypeDateTime;
}

function serializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data: any): GooglePlayDeveloperReportingV1beta1TimelineSpec {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? serializeGoogleTypeDateTime(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? serializeGoogleTypeDateTime(data["startTime"]) : undefined,
  };
}

function deserializeGooglePlayDeveloperReportingV1beta1TimelineSpec(data: any): GooglePlayDeveloperReportingV1beta1TimelineSpec {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? deserializeGoogleTypeDateTime(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? deserializeGoogleTypeDateTime(data["startTime"]) : undefined,
  };
}

/**
 * Represents civil time (or occasionally physical time). This type can
 * represent a civil time in one of a few possible ways: * When utc_offset is
 * set and time_zone is unset: a civil time on a calendar day with a particular
 * offset from UTC. * When time_zone is set and utc_offset is unset: a civil
 * time on a calendar day in a particular time zone. * When neither time_zone
 * nor utc_offset is set: a civil time on a calendar day in local time. The date
 * is relative to the Proleptic Gregorian Calendar. If year, month, or day are
 * 0, the DateTime is considered not to have a specific year, month, or day
 * respectively. This type may also be used to represent a physical time if all
 * the date and time fields are set and either case of the `time_offset` oneof
 * is set. Consider using `Timestamp` message for physical time instead. If your
 * use case also would like to store the user's timezone, that can be done in
 * another field. This type is more flexible than some applications may want.
 * Make sure to document and validate your application's limitations.
 */
export interface GoogleTypeDateTime {
  /**
   * Optional. Day of month. Must be from 1 to 31 and valid for the year and
   * month, or 0 if specifying a datetime without a day.
   */
  day?: number;
  /**
   * Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults
   * to 0 (midnight). An API may choose to allow the value "24:00:00" for
   * scenarios like business closing time.
   */
  hours?: number;
  /**
   * Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.
   */
  minutes?: number;
  /**
   * Optional. Month of year. Must be from 1 to 12, or 0 if specifying a
   * datetime without a month.
   */
  month?: number;
  /**
   * Optional. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999, defaults to 0.
   */
  nanos?: number;
  /**
   * Optional. Seconds of minutes of the time. Must normally be from 0 to 59,
   * defaults to 0. An API may allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
  /**
   * Time zone.
   */
  timeZone?: GoogleTypeTimeZone;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours. For
   * example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.
   */
  utcOffset?: number /* Duration */;
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year?: number;
}

function serializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

function deserializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

/**
 * A representation of a decimal value, such as 2.5. Clients may convert values
 * into language-native decimal formats, such as Java's BigDecimal or Python's
 * decimal.Decimal. [BigDecimal]:
 * https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html
 * [decimal.Decimal]: https://docs.python.org/3/library/decimal.html
 */
export interface GoogleTypeDecimal {
  /**
   * The decimal value, as a string. The string representation consists of an
   * optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of
   * zero or more decimal digits ("the integer"), optionally followed by a
   * fraction, optionally followed by an exponent. An empty string **should** be
   * interpreted as `0`. The fraction consists of a decimal point followed by
   * zero or more decimal digits. The string must contain at least one digit in
   * either the integer or the fraction. The number formed by the sign, the
   * integer and the fraction is referred to as the significand. The exponent
   * consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one
   * or more decimal digits. Services **should** normalize decimal values before
   * storing them by: - Removing an explicitly-provided `+` sign (`+2.5` ->
   * `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). -
   * Coercing the exponent character to upper-case, with explicit sign (`2.5e8`
   * -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` ->
   * `2.5`). Services **may** perform additional normalization based on its own
   * needs and the internal decimal implementation selected, such as shifting
   * the decimal point and exponent value together (example: `2.5E-1` <->
   * `0.25`). Additionally, services **may** preserve trailing zeroes in the
   * fraction to indicate increased precision, but are not required to do so.
   * Note that only the `.` character is supported to divide the integer and the
   * fraction; `,` **should not** be supported regardless of locale.
   * Additionally, thousand separators **should not** be supported. If a service
   * does support them, values **must** be normalized. The ENBF grammar is:
   * DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-';
   * Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E')
   * [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' |
   * '8' | '9' }; Services **should** clearly document the range of supported
   * values, the maximum supported precision (total number of digits), and, if
   * applicable, the scale (number of digits after the decimal point), as well
   * as how it behaves when receiving out-of-bounds values. Services **may**
   * choose to accept values passed as input even when the value has a higher
   * precision or scale than the service supports, and **should** round the
   * value to fit the supported scale. Alternatively, the service **may** error
   * with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be
   * lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT`
   * in gRPC) if the service receives a value outside of the supported range.
   */
  value?: string;
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface GoogleTypeTimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}