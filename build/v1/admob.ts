// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * AdMob API Client for Deno
 * =========================
 * 
 * The AdMob API allows publishers to programmatically get information about their AdMob account. 
 * 
 * Docs: https://developers.google.com/admob/api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The AdMob API allows publishers to programmatically get information about
 * their AdMob account.
 */
export class AdMob {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://admob.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * List the ad units under the specified AdMob account.
   *
   * @param parent Required. Resource name of the account to list ad units for. Example: accounts/pub-9876543210987654
   */
  async accountsAdUnitsList(parent: string, opts: AccountsAdUnitsListOptions = {}): Promise<ListAdUnitsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/adUnits`);
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
    return data as ListAdUnitsResponse;
  }

  /**
   * List the apps under the specified AdMob account.
   *
   * @param parent Required. Resource name of the account to list apps for. Example: accounts/pub-9876543210987654
   */
  async accountsAppsList(parent: string, opts: AccountsAppsListOptions = {}): Promise<ListAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps`);
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
    return data as ListAppsResponse;
  }

  /**
   * Gets information about the specified AdMob publisher account.
   *
   * @param name Resource name of the publisher account to retrieve. Example: accounts/pub-9876543210987654
   */
  async accountsGet(name: string): Promise<PublisherAccount> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PublisherAccount;
  }

  /**
   * Lists the AdMob publisher account that was most recently signed in to from
   * the AdMob UI. For more information, see
   * https://support.google.com/admob/answer/10243672.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<ListPublisherAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/accounts`);
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
    return data as ListPublisherAccountsResponse;
  }

  /**
   * Generates an AdMob mediation report based on the provided report
   * specification. Returns result of a server-side streaming RPC. The result is
   * returned in a sequence of responses.
   *
   * @param parent Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654
   */
  async accountsMediationReportGenerate(parent: string, req: GenerateMediationReportRequest): Promise<GenerateMediationReportResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/mediationReport:generate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateMediationReportResponse(data);
  }

  /**
   * Generates an AdMob Network report based on the provided report
   * specification. Returns result of a server-side streaming RPC. The result is
   * returned in a sequence of responses.
   *
   * @param parent Resource name of the account to generate the report for. Example: accounts/pub-9876543210987654
   */
  async accountsNetworkReportGenerate(parent: string, req: GenerateNetworkReportRequest): Promise<GenerateNetworkReportResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/networkReport:generate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateNetworkReportResponse(data);
  }
}

/**
 * Additional options for AdMob#accountsAdUnitsList.
 */
export interface AccountsAdUnitsListOptions {
  /**
   * The maximum number of ad units to return. If unspecified or 0, at most
   * 10,000 ad units will be returned. The maximum value is 20,000; values above
   * 20,000 will be coerced to 20,000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAdUnitsResponse`; indicates that this
   * is a continuation of a prior `ListAdUnits` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for AdMob#accountsAppsList.
 */
export interface AccountsAppsListOptions {
  /**
   * The maximum number of apps to return. If unspecified or 0, at most 10,000
   * apps will be returned. The maximum value is 20,000; values above 20,000
   * will be coerced to 20,000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAppsResponse`; indicates that this is
   * a continuation of a prior `ListApps` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for AdMob#accountsList.
 */
export interface AccountsListOptions {
  /**
   * Maximum number of accounts to return.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListPublisherAccountsResponse`; indicates
   * that this is a continuation of a prior `ListPublisherAccounts` call, and
   * that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Describes an AdMob ad unit.
 */
export interface AdUnit {
  /**
   * AdFormat of the ad unit. Possible values are as follows: "APP_OPEN" - App
   * Open ad format. "BANNER" - Banner ad format. "BANNER_INTERSTITIAL" - Legacy
   * format that can be used as either banner or interstitial. This format can
   * no longer be created but can be targeted by mediation groups.
   * "INTERSTITIAL" - A full screen ad. Supported ad types are "RICH_MEDIA" and
   * "VIDEO". "NATIVE" - Native ad format. "REWARDED" - An ad that, once viewed,
   * gets a callback verifying the view so that a reward can be given to the
   * user. Supported ad types are "RICH_MEDIA" (interactive) and video where
   * video can not be excluded. "REWARDED_INTERSTITIAL" - Rewarded Interstitial
   * ad format. Only supports video ad type. See
   * https://support.google.com/admob/answer/9884467.
   */
  adFormat?: string;
  /**
   * Ad media type supported by this ad unit. Possible values as follows:
   * "RICH_MEDIA" - Text, image, and other non-video media. "VIDEO" - Video
   * media.
   */
  adTypes?: string[];
  /**
   * The externally visible ID of the ad unit which can be used to integrate
   * with the AdMob SDK. This is a read only property. Example:
   * ca-app-pub-9876543210987654/0123456789
   */
  adUnitId?: string;
  /**
   * The externally visible ID of the app this ad unit is associated with.
   * Example: ca-app-pub-9876543210987654~0123456789
   */
  appId?: string;
  /**
   * The display name of the ad unit as shown in the AdMob UI, which is
   * provided by the user. The maximum length allowed is 80 characters.
   */
  displayName?: string;
  /**
   * Resource name for this ad unit. Format is
   * accounts/{publisher_id}/adUnits/{ad_unit_id_fragment} Example:
   * accounts/pub-9876543210987654/adUnits/0123456789
   */
  name?: string;
}

/**
 * Describes an AdMob app for a specific platform (For example: Android or
 * iOS).
 */
export interface App {
  /**
   * Output only. The approval state for the app.
   */
  readonly appApprovalState?:  | "APP_APPROVAL_STATE_UNSPECIFIED" | "ACTION_REQUIRED" | "IN_REVIEW" | "APPROVED";
  /**
   * The externally visible ID of the app which can be used to integrate with
   * the AdMob SDK. This is a read only property. Example:
   * ca-app-pub-9876543210987654~0123456789
   */
  appId?: string;
  /**
   * Immutable. The information for an app that is linked to an app store. This
   * field is present if and only if the app is linked to an app store.
   */
  linkedAppInfo?: AppLinkedAppInfo;
  /**
   * The information for an app that is not linked to any app store. After an
   * app is linked, this information is still retrivable. If no name is provided
   * for the app upon creation, a placeholder name will be used.
   */
  manualAppInfo?: AppManualAppInfo;
  /**
   * Resource name for this app. Format is
   * accounts/{publisher_id}/apps/{app_id_fragment} Example:
   * accounts/pub-9876543210987654/apps/0123456789
   */
  name?: string;
  /**
   * Describes the platform of the app. Limited to "IOS" and "ANDROID".
   */
  platform?: string;
}

/**
 * Information from the app store if the app is linked to an app store.
 */
export interface AppLinkedAppInfo {
  /**
   * The app store ID of the app; present if and only if the app is linked to
   * an app store. If the app is added to the Google Play store, it will be the
   * application ID of the app. For example: "com.example.myapp". See
   * https://developer.android.com/studio/build/application-id. If the app is
   * added to the Apple App Store, it will be app store ID. For example
   * "105169111". Note that setting the app store id is considered an
   * irreversible action. Once an app is linked, it cannot be unlinked.
   */
  appStoreId?: string;
  /**
   * Output only. Display name of the app as it appears in the app store. This
   * is an output-only field, and may be empty if the app cannot be found in the
   * store.
   */
  readonly displayName?: string;
}

/**
 * Information provided for manual apps which are not linked to an application
 * store (Example: Google Play, App Store).
 */
export interface AppManualAppInfo {
  /**
   * The display name of the app as shown in the AdMob UI, which is provided by
   * the user. The maximum length allowed is 80 characters.
   */
  displayName?: string;
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
 * Specification of a single date range. Both dates are inclusive.
 */
export interface DateRange {
  /**
   * End date of the date range, inclusive. Must be greater than or equal to
   * the start date.
   */
  endDate?: Date;
  /**
   * Start date of the date range, inclusive. Must be less than or equal to the
   * end date.
   */
  startDate?: Date;
}

/**
 * Request to generate an AdMob mediation report.
 */
export interface GenerateMediationReportRequest {
  /**
   * Network report specification.
   */
  reportSpec?: MediationReportSpec;
}

/**
 * The streaming response for the AdMob mediation report where the first
 * response contains the report header, then a stream of row responses, and
 * finally a footer as the last response message. For example: [{ "header": {
 * "date_range": { "start_date": {"year": 2018, "month": 9, "day": 1},
 * "end_date": {"year": 2018, "month": 9, "day": 1} }, "localization_settings":
 * { "currency_code": "USD", "language_code": "en-US" } } }, { "row": {
 * "dimension_values": { "DATE": {"value": "20180918"}, "APP": { "value":
 * "ca-app-pub-8123415297019784~1001342552", "display_label": "My app name!" }
 * }, "metric_values": { "ESTIMATED_EARNINGS": {"decimal_value": "1324746"} } }
 * }, { "footer": {"matching_row_count": 1} }]
 */
export interface GenerateMediationReportResponse {
  /**
   * Additional information about the generated report, such as warnings about
   * the data.
   */
  footer?: ReportFooter;
  /**
   * Report generation settings that describes the report contents, such as the
   * report date range and localization settings.
   */
  header?: ReportHeader;
  /**
   * Actual report data.
   */
  row?: ReportRow;
}

function serializeGenerateMediationReportResponse(data: any): GenerateMediationReportResponse {
  return {
    ...data,
    footer: data["footer"] !== undefined ? serializeReportFooter(data["footer"]) : undefined,
    row: data["row"] !== undefined ? serializeReportRow(data["row"]) : undefined,
  };
}

function deserializeGenerateMediationReportResponse(data: any): GenerateMediationReportResponse {
  return {
    ...data,
    footer: data["footer"] !== undefined ? deserializeReportFooter(data["footer"]) : undefined,
    row: data["row"] !== undefined ? deserializeReportRow(data["row"]) : undefined,
  };
}

/**
 * Request to generate an AdMob Network report.
 */
export interface GenerateNetworkReportRequest {
  /**
   * Network report specification.
   */
  reportSpec?: NetworkReportSpec;
}

/**
 * The streaming response for the AdMob Network report where the first response
 * contains the report header, then a stream of row responses, and finally a
 * footer as the last response message. For example: [{ "header": { "dateRange":
 * { "startDate": {"year": 2018, "month": 9, "day": 1}, "endDate": {"year":
 * 2018, "month": 9, "day": 1} }, "localizationSettings": { "currencyCode":
 * "USD", "languageCode": "en-US" } } }, { "row": { "dimensionValues": { "DATE":
 * {"value": "20180918"}, "APP": { "value":
 * "ca-app-pub-8123415297019784~1001342552", displayLabel: "My app name!" } },
 * "metricValues": { "ESTIMATED_EARNINGS": {"microsValue": 6500000} } } }, {
 * "footer": {"matchingRowCount": 1} }]
 */
export interface GenerateNetworkReportResponse {
  /**
   * Additional information about the generated report, such as warnings about
   * the data.
   */
  footer?: ReportFooter;
  /**
   * Report generation settings that describes the report contents, such as the
   * report date range and localization settings.
   */
  header?: ReportHeader;
  /**
   * Actual report data.
   */
  row?: ReportRow;
}

function serializeGenerateNetworkReportResponse(data: any): GenerateNetworkReportResponse {
  return {
    ...data,
    footer: data["footer"] !== undefined ? serializeReportFooter(data["footer"]) : undefined,
    row: data["row"] !== undefined ? serializeReportRow(data["row"]) : undefined,
  };
}

function deserializeGenerateNetworkReportResponse(data: any): GenerateNetworkReportResponse {
  return {
    ...data,
    footer: data["footer"] !== undefined ? deserializeReportFooter(data["footer"]) : undefined,
    row: data["row"] !== undefined ? deserializeReportRow(data["row"]) : undefined,
  };
}

/**
 * Response for the ad units list request.
 */
export interface ListAdUnitsResponse {
  /**
   * The resulting ad units for the requested account.
   */
  adUnits?: AdUnit[];
  /**
   * If not empty, indicates that there may be more ad units for the request;
   * this value should be passed in a new `ListAdUnitsRequest`.
   */
  nextPageToken?: string;
}

/**
 * Response for the apps list request.
 */
export interface ListAppsResponse {
  /**
   * The resulting apps for the requested account.
   */
  apps?: App[];
  /**
   * If not empty, indicates that there may be more apps for the request; this
   * value should be passed in a new `ListAppsRequest`.
   */
  nextPageToken?: string;
}

/**
 * Response for the publisher account list request.
 */
export interface ListPublisherAccountsResponse {
  /**
   * Publisher that the client credentials can access.
   */
  account?: PublisherAccount[];
  /**
   * If not empty, indicates that there might be more accounts for the request;
   * you must pass this value in a new `ListPublisherAccountsRequest`.
   */
  nextPageToken?: string;
}

/**
 * Localization settings for reports, such as currency and language. It affects
 * how metrics are calculated.
 */
export interface LocalizationSettings {
  /**
   * Currency code of the earning related metrics, which is the 3-letter code
   * defined in ISO 4217. The daily average rate is used for the currency
   * conversion. Defaults to the account currency code if unspecified.
   */
  currencyCode?: string;
  /**
   * Language used for any localized text, such as some dimension value display
   * labels. The language tag defined in the IETF BCP47. Defaults to 'en-US' if
   * unspecified.
   */
  languageCode?: string;
}

/**
 * The specification for generating an AdMob Mediation report. For example, the
 * specification to get observed ECPM sliced by ad source and app for the 'US'
 * and 'CN' countries can look like the following example: { "date_range": {
 * "start_date": {"year": 2021, "month": 9, "day": 1}, "end_date": {"year":
 * 2021, "month": 9, "day": 30} }, "dimensions": ["AD_SOURCE", "APP",
 * "COUNTRY"], "metrics": ["OBSERVED_ECPM"], "dimension_filters": [ {
 * "dimension": "COUNTRY", "matches_any": {"values": [{"value": "US", "value":
 * "CN"}]} } ], "sort_conditions": [ {"dimension":"APP", order: "ASCENDING"} ],
 * "localization_settings": { "currency_code": "USD", "language_code": "en-US" }
 * } For a better understanding, you can treat the preceding specification like
 * the following pseudo SQL: SELECT AD_SOURCE, APP, COUNTRY, OBSERVED_ECPM FROM
 * MEDIATION_REPORT WHERE DATE >= '2021-09-01' AND DATE <= '2021-09-30' AND
 * COUNTRY IN ('US', 'CN') GROUP BY AD_SOURCE, APP, COUNTRY ORDER BY APP ASC;
 */
export interface MediationReportSpec {
  /**
   * The date range for which the report is generated.
   */
  dateRange?: DateRange;
  /**
   * Describes which report rows to match based on their dimension values.
   */
  dimensionFilters?: MediationReportSpecDimensionFilter[];
  /**
   * List of dimensions of the report. The value combination of these
   * dimensions determines the row of the report. If no dimensions are
   * specified, the report returns a single row of requested metrics for the
   * entire account.
   */
  dimensions?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION"[];
  /**
   * Localization settings of the report.
   */
  localizationSettings?: LocalizationSettings;
  /**
   * Maximum number of report data rows to return. If the value is not set, the
   * API returns as many rows as possible, up to 100000. Acceptable values are
   * 1-100000, inclusive. Values larger than 100000 return an error.
   */
  maxReportRows?: number;
  /**
   * List of metrics of the report. A report must specify at least one metric.
   */
  metrics?:  | "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "MATCHED_REQUESTS" | "MATCH_RATE" | "OBSERVED_ECPM"[];
  /**
   * Describes the sorting of report rows. The order of the condition in the
   * list defines its precedence; the earlier the condition, the higher its
   * precedence. If no sort conditions are specified, the row ordering is
   * undefined.
   */
  sortConditions?: MediationReportSpecSortCondition[];
  /**
   * A report time zone. Accepts an IANA TZ name values, such as
   * "America/Los_Angeles." If no time zone is defined, the account default
   * takes effect. Check default value by the get account action. **Warning:**
   * The "America/Los_Angeles" is the only supported value at the moment.
   */
  timeZone?: string;
}

/**
 * Describes which report rows to match based on their dimension values.
 */
export interface MediationReportSpecDimensionFilter {
  /**
   * Applies the filter criterion to the specified dimension.
   */
  dimension?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION";
  /**
   * Matches a row if its value for the specified dimension is in one of the
   * values specified in this condition.
   */
  matchesAny?: StringList;
}

/**
 * Sorting direction to be applied on a dimension or a metric.
 */
export interface MediationReportSpecSortCondition {
  /**
   * Sort by the specified dimension.
   */
  dimension?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_SOURCE" | "AD_SOURCE_INSTANCE" | "AD_UNIT" | "APP" | "MEDIATION_GROUP" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION";
  /**
   * Sort by the specified metric.
   */
  metric?:  | "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "MATCHED_REQUESTS" | "MATCH_RATE" | "OBSERVED_ECPM";
  /**
   * Sorting order of the dimension or metric.
   */
  order?:  | "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
}

/**
 * The specification for generating an AdMob Network report. For example, the
 * specification to get clicks and estimated earnings for only the 'US' and 'CN'
 * countries can look like the following example: { 'date_range': {
 * 'start_date': {'year': 2021, 'month': 9, 'day': 1}, 'end_date': {'year':
 * 2021, 'month': 9, 'day': 30} }, 'dimensions': ['DATE', 'APP', 'COUNTRY'],
 * 'metrics': ['CLICKS', 'ESTIMATED_EARNINGS'], 'dimension_filters': [ {
 * 'dimension': 'COUNTRY', 'matches_any': {'values': [{'value': 'US', 'value':
 * 'CN'}]} } ], 'sort_conditions': [ {'dimension':'APP', order: 'ASCENDING'},
 * {'metric':'CLICKS', order: 'DESCENDING'} ], 'localization_settings': {
 * 'currency_code': 'USD', 'language_code': 'en-US' } } For a better
 * understanding, you can treat the preceding specification like the following
 * pseudo SQL: SELECT DATE, APP, COUNTRY, CLICKS, ESTIMATED_EARNINGS FROM
 * NETWORK_REPORT WHERE DATE >= '2021-09-01' AND DATE <= '2021-09-30' AND
 * COUNTRY IN ('US', 'CN') GROUP BY DATE, APP, COUNTRY ORDER BY APP ASC, CLICKS
 * DESC;
 */
export interface NetworkReportSpec {
  /**
   * The date range for which the report is generated.
   */
  dateRange?: DateRange;
  /**
   * Describes which report rows to match based on their dimension values.
   */
  dimensionFilters?: NetworkReportSpecDimensionFilter[];
  /**
   * List of dimensions of the report. The value combination of these
   * dimensions determines the row of the report. If no dimensions are
   * specified, the report returns a single row of requested metrics for the
   * entire account.
   */
  dimensions?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION"[];
  /**
   * Localization settings of the report.
   */
  localizationSettings?: LocalizationSettings;
  /**
   * Maximum number of report data rows to return. If the value is not set, the
   * API returns as many rows as possible, up to 100000. Acceptable values are
   * 1-100000, inclusive. Values larger than 100000 return an error.
   */
  maxReportRows?: number;
  /**
   * List of metrics of the report. A report must specify at least one metric.
   */
  metrics?:  | "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "IMPRESSION_RPM" | "MATCHED_REQUESTS" | "MATCH_RATE" | "SHOW_RATE"[];
  /**
   * Describes the sorting of report rows. The order of the condition in the
   * list defines its precedence; the earlier the condition, the higher its
   * precedence. If no sort conditions are specified, the row ordering is
   * undefined.
   */
  sortConditions?: NetworkReportSpecSortCondition[];
  /**
   * A report time zone. Accepts an IANA TZ name values, such as
   * "America/Los_Angeles." If no time zone is defined, the account default
   * takes effect. Check default value by the get account action. **Warning:**
   * The "America/Los_Angeles" is the only supported value at the moment.
   */
  timeZone?: string;
}

/**
 * Describes which report rows to match based on their dimension values.
 */
export interface NetworkReportSpecDimensionFilter {
  /**
   * Applies the filter criterion to the specified dimension.
   */
  dimension?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION";
  /**
   * Matches a row if its value for the specified dimension is in one of the
   * values specified in this condition.
   */
  matchesAny?: StringList;
}

/**
 * Sorting direction to be applied on a dimension or a metric.
 */
export interface NetworkReportSpecSortCondition {
  /**
   * Sort by the specified dimension.
   */
  dimension?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "MONTH" | "WEEK" | "AD_UNIT" | "APP" | "AD_TYPE" | "COUNTRY" | "FORMAT" | "PLATFORM" | "MOBILE_OS_VERSION" | "GMA_SDK_VERSION" | "APP_VERSION_NAME" | "SERVING_RESTRICTION";
  /**
   * Sort by the specified metric.
   */
  metric?:  | "METRIC_UNSPECIFIED" | "AD_REQUESTS" | "CLICKS" | "ESTIMATED_EARNINGS" | "IMPRESSIONS" | "IMPRESSION_CTR" | "IMPRESSION_RPM" | "MATCHED_REQUESTS" | "MATCH_RATE" | "SHOW_RATE";
  /**
   * Sorting order of the dimension or metric.
   */
  order?:  | "SORT_ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
}

/**
 * A publisher account contains information relevant to the use of this API,
 * such as the time zone used for the reports.
 */
export interface PublisherAccount {
  /**
   * Currency code of the earning-related metrics, which is the 3-letter code
   * defined in ISO 4217. The daily average rate is used for the currency
   * conversion.
   */
  currencyCode?: string;
  /**
   * Resource name of this account. Format is accounts/{publisher_id}.
   */
  name?: string;
  /**
   * The unique ID by which this publisher account can be identified in the API
   * requests (for example, pub-1234567890).
   */
  publisherId?: string;
  /**
   * The time zone that is used in reports that are generated for this account.
   * The value is a time-zone ID as specified by the CLDR project, for example,
   * "America/Los_Angeles".
   */
  reportingTimeZone?: string;
}

/**
 * Groups data available after report generation, for example, warnings and row
 * counts. Always sent as the last message in the stream response.
 */
export interface ReportFooter {
  /**
   * Total number of rows that matched the request. Warning: This count does
   * NOT always match the number of rows in the response. Do not make that
   * assumption when processing the response.
   */
  matchingRowCount?: bigint;
  /**
   * Warnings associated with generation of the report.
   */
  warnings?: ReportWarning[];
}

function serializeReportFooter(data: any): ReportFooter {
  return {
    ...data,
    matchingRowCount: data["matchingRowCount"] !== undefined ? String(data["matchingRowCount"]) : undefined,
  };
}

function deserializeReportFooter(data: any): ReportFooter {
  return {
    ...data,
    matchingRowCount: data["matchingRowCount"] !== undefined ? BigInt(data["matchingRowCount"]) : undefined,
  };
}

/**
 * Groups data helps to treat the generated report. Always sent as a first
 * message in the stream response.
 */
export interface ReportHeader {
  /**
   * The date range for which the report is generated. This is identical to the
   * range specified in the report request.
   */
  dateRange?: DateRange;
  /**
   * Localization settings of the report. This is identical to the settings in
   * the report request.
   */
  localizationSettings?: LocalizationSettings;
  /**
   * The report time zone. The value is a time-zone ID as specified by the CLDR
   * project, for example, "America/Los_Angeles".
   */
  reportingTimeZone?: string;
}

/**
 * A row of the returning report.
 */
export interface ReportRow {
  /**
   * Map of dimension values in a row, with keys as enum name of the
   * dimensions.
   */
  dimensionValues?: {
    [key: string]: ReportRowDimensionValue
  };
  /**
   * Map of metric values in a row, with keys as enum name of the metrics. If a
   * metric being requested has no value returned, the map will not include it.
   */
  metricValues?: {
    [key: string]: ReportRowMetricValue
  };
}

function serializeReportRow(data: any): ReportRow {
  return {
    ...data,
    metricValues: data["metricValues"] !== undefined ? Object.fromEntries(Object.entries(data["metricValues"]).map(([k, v]: [string, any]) => ([k, serializeReportRowMetricValue(v)]))) : undefined,
  };
}

function deserializeReportRow(data: any): ReportRow {
  return {
    ...data,
    metricValues: data["metricValues"] !== undefined ? Object.fromEntries(Object.entries(data["metricValues"]).map(([k, v]: [string, any]) => ([k, deserializeReportRowMetricValue(v)]))) : undefined,
  };
}

/**
 * Representation of a dimension value.
 */
export interface ReportRowDimensionValue {
  /**
   * The localized string representation of the value. If unspecified, the
   * display label should be derived from the value.
   */
  displayLabel?: string;
  /**
   * Dimension value in the format specified in the report's spec Dimension
   * enum.
   */
  value?: string;
}

/**
 * Representation of a metric value.
 */
export interface ReportRowMetricValue {
  /**
   * Double precision (approximate) decimal values. Rates are from 0 to 1.
   */
  doubleValue?: number;
  /**
   * Metric integer value.
   */
  integerValue?: bigint;
  /**
   * Amount in micros. One million is equivalent to one unit. Currency value is
   * in the unit (USD, EUR or other) specified by the request. For example,
   * $6.50 whould be represented as 6500000 micros.
   */
  microsValue?: bigint;
}

function serializeReportRowMetricValue(data: any): ReportRowMetricValue {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? String(data["integerValue"]) : undefined,
    microsValue: data["microsValue"] !== undefined ? String(data["microsValue"]) : undefined,
  };
}

function deserializeReportRowMetricValue(data: any): ReportRowMetricValue {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? BigInt(data["integerValue"]) : undefined,
    microsValue: data["microsValue"] !== undefined ? BigInt(data["microsValue"]) : undefined,
  };
}

/**
 * Warnings associated with generation of the report.
 */
export interface ReportWarning {
  /**
   * Describes the details of the warning message, in English.
   */
  description?: string;
  /**
   * Type of the warning.
   */
  type?:  | "TYPE_UNSPECIFIED" | "DATA_BEFORE_ACCOUNT_TIMEZONE_CHANGE" | "DATA_DELAYED" | "OTHER" | "REPORT_CURRENCY_NOT_ACCOUNT_CURRENCY";
}

/**
 * List of string values.
 */
export interface StringList {
  /**
   * The string values.
   */
  values?: string[];
}