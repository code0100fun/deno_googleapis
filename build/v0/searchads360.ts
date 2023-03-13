// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Search Ads 360 Reporting API Client for Deno
 * ============================================
 * 
 * The Search Ads 360 API allows developers to automate downloading reports from Search Ads 360.
 * 
 * Docs: https://developers.google.com/search-ads/reporting
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Search Ads 360 API allows developers to automate downloading reports
 * from Search Ads 360.
 */
export class SearchAds360 {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://searchads360.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the requested custom column in full detail.
   *
   * @param resourceName Required. The resource name of the custom column to fetch.
   */
  async customersCustomColumnsGet(resourceName: string): Promise<GoogleAdsSearchads360V0Resources__CustomColumn> {
    const url = new URL(`${this.#baseUrl}v0/${ resourceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAdsSearchads360V0Resources__CustomColumn;
  }

  /**
   * Returns all the custom columns associated with the customer in full
   * detail.
   *
   * @param customerId Required. The ID of the customer to apply the CustomColumn list operation to.
   */
  async customersCustomColumnsList(customerId: string): Promise<GoogleAdsSearchads360V0Services__ListCustomColumnsResponse> {
    const url = new URL(`${this.#baseUrl}v0/customers/${ customerId }/customColumns`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAdsSearchads360V0Services__ListCustomColumnsResponse;
  }

  /**
   * Returns all rows that match the search query. List of thrown errors:
   * [AuthenticationError]() [AuthorizationError]() [HeaderError]()
   * [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
   *
   * @param customerId Required. The ID of the customer being queried.
   */
  async customersSearchAds360Search(customerId: string, req: GoogleAdsSearchads360V0Services__SearchSearchAds360Request): Promise<GoogleAdsSearchads360V0Services__SearchSearchAds360Response> {
    const url = new URL(`${this.#baseUrl}v0/customers/${ customerId }/searchAds360:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360Response(data);
  }

  /**
   * Returns all rows that match the search stream query. List of thrown
   * errors: [AuthenticationError]() [AuthorizationError]() [HeaderError]()
   * [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
   *
   * @param customerId Required. The ID of the customer being queried.
   */
  async customersSearchAds360SearchStream(customerId: string, req: GoogleAdsSearchads360V0Services__SearchSearchAds360StreamRequest): Promise<GoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse> {
    const url = new URL(`${this.#baseUrl}v0/customers/${ customerId }/searchAds360:searchStream`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse(data);
  }

  /**
   * Returns just the requested field. List of thrown errors:
   * [AuthenticationError]() [AuthorizationError]() [HeaderError]()
   * [InternalError]() [QuotaError]() [RequestError]()
   *
   * @param resourceName Required. The resource name of the field to get.
   */
  async searchAds360FieldsGet(resourceName: string): Promise<GoogleAdsSearchads360V0Resources__SearchAds360Field> {
    const url = new URL(`${this.#baseUrl}v0/${ resourceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAdsSearchads360V0Resources__SearchAds360Field;
  }

  /**
   * Returns all fields that match the search query. List of thrown errors:
   * [AuthenticationError]() [AuthorizationError]() [HeaderError]()
   * [InternalError]() [QueryError]() [QuotaError]() [RequestError]()
   *
   */
  async searchAds360FieldsSearch(req: GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest): Promise<GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse> {
    const url = new URL(`${this.#baseUrl}v0/searchAds360Fields:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse(data);
  }
}

/**
 * An age range criterion.
 */
export interface GoogleAdsSearchads360V0Common__AgeRangeInfo {
  /**
   * Type of the age range.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_UP" | "AGE_RANGE_UNDETERMINED";
}

/**
 * A mapping that can be used by custom parameter tags in a
 * `tracking_url_template`, `final_urls`, or `mobile_final_urls`.
 */
export interface GoogleAdsSearchads360V0Common__CustomParameter {
  /**
   * The key matching the parameter tag name.
   */
  key?: string;
  /**
   * The value to be substituted.
   */
  value?: string;
}

/**
 * A device criterion.
 */
export interface GoogleAdsSearchads360V0Common__DeviceInfo {
  /**
   * Type of the device.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "MOBILE" | "TABLET" | "DESKTOP" | "CONNECTED_TV" | "OTHER";
}

/**
 * An automated bidding strategy that raises bids for clicks that seem more
 * likely to lead to a conversion and lowers them for clicks where they seem
 * less likely. This bidding strategy is deprecated and cannot be created
 * anymore. Use ManualCpc with enhanced_cpc_enabled set to true for equivalent
 * functionality.
 */
export interface GoogleAdsSearchads360V0Common__EnhancedCpc {
}

/**
 * A rule specifying the maximum number of times an ad (or some set of ads) can
 * be shown to a user over a particular time period.
 */
export interface GoogleAdsSearchads360V0Common__FrequencyCapEntry {
}

/**
 * A gender criterion.
 */
export interface GoogleAdsSearchads360V0Common__GenderInfo {
  /**
   * Type of the gender.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "MALE" | "FEMALE" | "UNDETERMINED";
}

/**
 * A keyword criterion.
 */
export interface GoogleAdsSearchads360V0Common__KeywordInfo {
  /**
   * The match type of the keyword.
   */
  matchType?:  | "UNSPECIFIED" | "UNKNOWN" | "EXACT" | "PHRASE" | "BROAD";
  /**
   * The text of the keyword (at most 80 characters and 10 words).
   */
  text?: string;
}

/**
 * A language criterion.
 */
export interface GoogleAdsSearchads360V0Common__LanguageInfo {
  /**
   * The language constant resource name.
   */
  languageConstant?: string;
}

/**
 * A listing group criterion.
 */
export interface GoogleAdsSearchads360V0Common__ListingGroupInfo {
  /**
   * Type of the listing group.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "SUBDIVISION" | "UNIT";
}

/**
 * A radius around a list of locations specified through a feed.
 */
export interface GoogleAdsSearchads360V0Common__LocationGroupInfo {
  /**
   * FeedItemSets whose FeedItems are targeted. If multiple IDs are specified,
   * then all items that appear in at least one set are targeted. This field
   * cannot be used with geo_target_constants. This is optional and can only be
   * set in CREATE operations.
   */
  feedItemSets?: string[];
  /**
   * Geo target constant(s) restricting the scope of the geographic area within
   * the feed. Currently only one geo target constant is allowed.
   */
  geoTargetConstants?: string[];
  /**
   * Distance in units specifying the radius around targeted locations. This is
   * required and must be set in CREATE operations.
   */
  radius?: bigint;
  /**
   * Unit of the radius. Miles and meters are supported for geo target
   * constants. Milli miles and meters are supported for feed item sets. This is
   * required and must be set in CREATE operations.
   */
  radiusUnits?:  | "UNSPECIFIED" | "UNKNOWN" | "METERS" | "MILES" | "MILLI_MILES";
}

function serializeGoogleAdsSearchads360V0Common__LocationGroupInfo(data: any): GoogleAdsSearchads360V0Common__LocationGroupInfo {
  return {
    ...data,
    radius: data["radius"] !== undefined ? String(data["radius"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__LocationGroupInfo(data: any): GoogleAdsSearchads360V0Common__LocationGroupInfo {
  return {
    ...data,
    radius: data["radius"] !== undefined ? BigInt(data["radius"]) : undefined,
  };
}

/**
 * A location criterion.
 */
export interface GoogleAdsSearchads360V0Common__LocationInfo {
  /**
   * The geo target constant resource name.
   */
  geoTargetConstant?: string;
}

/**
 * Manual bidding strategy that allows advertiser to set the bid per
 * advertiser-specified action.
 */
export interface GoogleAdsSearchads360V0Common__ManualCpa {
}

/**
 * Manual click-based bidding where user pays per click.
 */
export interface GoogleAdsSearchads360V0Common__ManualCpc {
  /**
   * Whether bids are to be enhanced based on conversion optimizer data.
   */
  enhancedCpcEnabled?: boolean;
}

/**
 * Manual impression-based bidding where user pays per thousand impressions.
 */
export interface GoogleAdsSearchads360V0Common__ManualCpm {
}

/**
 * An automated bidding strategy to help get the most conversions for your
 * campaigns while spending your budget.
 */
export interface GoogleAdsSearchads360V0Common__MaximizeConversions {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. Mutable for portfolio bidding
   * strategies only.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * Minimum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. Mutable for portfolio bidding
   * strategies only.
   */
  cpcBidFloorMicros?: bigint;
  /**
   * The target cost-per-action (CPA) option. This is the average amount that
   * you would like to spend per conversion action specified in micro units of
   * the bidding strategy's currency. If set, the bid strategy will get as many
   * conversions as possible at or below the target cost-per-action. If the
   * target CPA is not set, the bid strategy will aim to achieve the lowest
   * possible CPA given the budget.
   */
  targetCpaMicros?: bigint;
}

function serializeGoogleAdsSearchads360V0Common__MaximizeConversions(data: any): GoogleAdsSearchads360V0Common__MaximizeConversions {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? String(data["cpcBidFloorMicros"]) : undefined,
    targetCpaMicros: data["targetCpaMicros"] !== undefined ? String(data["targetCpaMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__MaximizeConversions(data: any): GoogleAdsSearchads360V0Common__MaximizeConversions {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? BigInt(data["cpcBidFloorMicros"]) : undefined,
    targetCpaMicros: data["targetCpaMicros"] !== undefined ? BigInt(data["targetCpaMicros"]) : undefined,
  };
}

/**
 * An automated bidding strategy to help get the most conversion value for your
 * campaigns while spending your budget.
 */
export interface GoogleAdsSearchads360V0Common__MaximizeConversionValue {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. Mutable for portfolio bidding
   * strategies only.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * Minimum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. Mutable for portfolio bidding
   * strategies only.
   */
  cpcBidFloorMicros?: bigint;
  /**
   * The target return on ad spend (ROAS) option. If set, the bid strategy will
   * maximize revenue while averaging the target return on ad spend. If the
   * target ROAS is high, the bid strategy may not be able to spend the full
   * budget. If the target ROAS is not set, the bid strategy will aim to achieve
   * the highest possible ROAS for the budget.
   */
  targetRoas?: number;
}

function serializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data: any): GoogleAdsSearchads360V0Common__MaximizeConversionValue {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? String(data["cpcBidFloorMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data: any): GoogleAdsSearchads360V0Common__MaximizeConversionValue {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? BigInt(data["cpcBidFloorMicros"]) : undefined,
  };
}

/**
 * Metrics data.
 */
export interface GoogleAdsSearchads360V0Common__Metrics {
  /**
   * The percent of your ad impressions that are shown as the very first ad
   * above the organic search results.
   */
  absoluteTopImpressionPercentage?: number;
  /**
   * The total number of conversions. This includes all conversions regardless
   * of the value of include_in_conversions_metric.
   */
  allConversions?: number;
  /**
   * The total number of conversions. This includes all conversions regardless
   * of the value of include_in_conversions_metric. When this column is selected
   * with date, the values in date column means the conversion date. Details for
   * the by_conversion_date columns are available at
   * https://support.google.com/sa360/answer/9250611.
   */
  allConversionsByConversionDate?: number;
  /**
   * The number of times people clicked the "Call" button to call a store
   * during or after clicking an ad. This number doesn't include whether or not
   * calls were connected, or the duration of any calls. This metric applies to
   * feed items only.
   */
  allConversionsFromClickToCall?: number;
  /**
   * The number of times people clicked a "Get directions" button to navigate
   * to a store after clicking an ad. This metric applies to feed items only.
   */
  allConversionsFromDirections?: number;
  /**
   * All conversions from interactions (as oppose to view through conversions)
   * divided by the number of ad interactions.
   */
  allConversionsFromInteractionsRate?: number;
  /**
   * The value of all conversions from interactions divided by the total number
   * of interactions.
   */
  allConversionsFromInteractionsValuePerInteraction?: number;
  /**
   * The number of times people clicked a link to view a store's menu after
   * clicking an ad. This metric applies to feed items only.
   */
  allConversionsFromMenu?: number;
  /**
   * The number of times people placed an order at a store after clicking an
   * ad. This metric applies to feed items only.
   */
  allConversionsFromOrder?: number;
  /**
   * The number of other conversions (for example, posting a review or saving a
   * location for a store) that occurred after people clicked an ad. This metric
   * applies to feed items only.
   */
  allConversionsFromOtherEngagement?: number;
  /**
   * Estimated number of times people visited a store after clicking an ad.
   * This metric applies to feed items only.
   */
  allConversionsFromStoreVisit?: number;
  /**
   * The number of times that people were taken to a store's URL after clicking
   * an ad. This metric applies to feed items only.
   */
  allConversionsFromStoreWebsite?: number;
  /**
   * The value of all conversions.
   */
  allConversionsValue?: number;
  /**
   * The value of all conversions. When this column is selected with date, the
   * values in date column means the conversion date. Details for the
   * by_conversion_date columns are available at
   * https://support.google.com/sa360/answer/9250611.
   */
  allConversionsValueByConversionDate?: number;
  /**
   * The value of all conversions divided by the total cost of ad interactions
   * (such as clicks for text ads or views for video ads).
   */
  allConversionsValuePerCost?: number;
  /**
   * The average amount you pay per interaction. This amount is the total cost
   * of your ads divided by the total number of interactions.
   */
  averageCost?: number;
  /**
   * The total cost of all clicks divided by the total number of clicks
   * received.
   */
  averageCpc?: number;
  /**
   * Average cost-per-thousand impressions (CPM).
   */
  averageCpm?: number;
  /**
   * The number of clicks.
   */
  clicks?: bigint;
  /**
   * The number of client account conversions. This only includes conversion
   * actions which include_in_client_account_conversions_metric attribute is set
   * to true. If you use conversion-based bidding, your bid strategies will
   * optimize for these conversions.
   */
  clientAccountConversions?: number;
  /**
   * The value of client account conversions. This only includes conversion
   * actions which include_in_client_account_conversions_metric attribute is set
   * to true. If you use conversion-based bidding, your bid strategies will
   * optimize for these conversions.
   */
  clientAccountConversionsValue?: number;
  /**
   * The total number of view-through conversions. These happen when a customer
   * sees an image or rich media ad, then later completes a conversion on your
   * site without interacting with (for example, clicking on) another ad.
   */
  clientAccountViewThroughConversions?: bigint;
  /**
   * The estimated percent of times that your ad was eligible to show on the
   * Display Network but didn't because your budget was too low. Note: Content
   * budget lost impression share is reported in the range of 0 to 0.9. Any
   * value above 0.9 is reported as 0.9001.
   */
  contentBudgetLostImpressionShare?: number;
  /**
   * The impressions you've received on the Display Network divided by the
   * estimated number of impressions you were eligible to receive. Note: Content
   * impression share is reported in the range of 0.1 to 1. Any value below 0.1
   * is reported as 0.0999.
   */
  contentImpressionShare?: number;
  /**
   * The estimated percentage of impressions on the Display Network that your
   * ads didn't receive due to poor Ad Rank. Note: Content rank lost impression
   * share is reported in the range of 0 to 0.9. Any value above 0.9 is reported
   * as 0.9001.
   */
  contentRankLostImpressionShare?: number;
  /**
   * The number of conversions. This only includes conversion actions which
   * include_in_conversions_metric attribute is set to true. If you use
   * conversion-based bidding, your bid strategies will optimize for these
   * conversions.
   */
  conversions?: number;
  /**
   * The sum of conversions by conversion date for biddable conversion types.
   * Can be fractional due to attribution modeling. When this column is selected
   * with date, the values in date column means the conversion date.
   */
  conversionsByConversionDate?: number;
  /**
   * Average biddable conversions (from interaction) per conversion eligible
   * interaction. Shows how often, on average, an ad interaction leads to a
   * biddable conversion.
   */
  conversionsFromInteractionsRate?: number;
  /**
   * The value of conversions from interactions divided by the number of ad
   * interactions. This only includes conversion actions which
   * include_in_conversions_metric attribute is set to true. If you use
   * conversion-based bidding, your bid strategies will optimize for these
   * conversions.
   */
  conversionsFromInteractionsValuePerInteraction?: number;
  /**
   * The sum of conversion values for the conversions included in the
   * "conversions" field. This metric is useful only if you entered a value for
   * your conversion actions.
   */
  conversionsValue?: number;
  /**
   * The sum of biddable conversions value by conversion date. When this column
   * is selected with date, the values in date column means the conversion date.
   */
  conversionsValueByConversionDate?: number;
  /**
   * The value of biddable conversion divided by the total cost of conversion
   * eligible interactions.
   */
  conversionsValuePerCost?: number;
  /**
   * The sum of your cost-per-click (CPC) and cost-per-thousand impressions
   * (CPM) costs during this period.
   */
  costMicros?: bigint;
  /**
   * The cost of ad interactions divided by all conversions.
   */
  costPerAllConversions?: number;
  /**
   * Average conversion eligible cost per biddable conversion.
   */
  costPerConversion?: number;
  /**
   * The cost of ad interactions divided by current model attributed
   * conversions. This only includes conversion actions which
   * include_in_conversions_metric attribute is set to true. If you use
   * conversion-based bidding, your bid strategies will optimize for these
   * conversions.
   */
  costPerCurrentModelAttributedConversion?: number;
  /**
   * Conversions from when a customer clicks on an ad on one device, then
   * converts on a different device or browser. Cross-device conversions are
   * already included in all_conversions.
   */
  crossDeviceConversions?: number;
  /**
   * The sum of the value of cross-device conversions.
   */
  crossDeviceConversionsValue?: number;
  /**
   * The number of clicks your ad receives (Clicks) divided by the number of
   * times your ad is shown (Impressions).
   */
  ctr?: number;
  /**
   * The creative historical quality score.
   */
  historicalCreativeQualityScore?:  | "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE";
  /**
   * The quality of historical landing page experience.
   */
  historicalLandingPageQualityScore?:  | "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE";
  /**
   * The historical quality score.
   */
  historicalQualityScore?: bigint;
  /**
   * The historical search predicted click through rate (CTR).
   */
  historicalSearchPredictedCtr?:  | "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE";
  /**
   * Count of how often your ad has appeared on a search results page or
   * website on the Google Network.
   */
  impressions?: bigint;
  /**
   * The types of payable and free interactions.
   */
  interactionEventTypes?:  | "UNSPECIFIED" | "UNKNOWN" | "CLICK" | "ENGAGEMENT" | "VIDEO_VIEW" | "NONE"[];
  /**
   * How often people interact with your ad after it is shown to them. This is
   * the number of interactions divided by the number of times your ad is shown.
   */
  interactionRate?: number;
  /**
   * The number of interactions. An interaction is the main user action
   * associated with an ad format-clicks for text and shopping ads, views for
   * video ads, and so on.
   */
  interactions?: bigint;
  /**
   * The percentage of clicks filtered out of your total number of clicks
   * (filtered + non-filtered clicks) during the reporting period.
   */
  invalidClickRate?: number;
  /**
   * Number of clicks Google considers illegitimate and doesn't charge you for.
   */
  invalidClicks?: bigint;
  /**
   * The percentage of mobile clicks that go to a mobile-friendly page.
   */
  mobileFriendlyClicksPercentage?: number;
  /**
   * The percentage of the customer's Shopping or Search ad impressions that
   * are shown in the most prominent Shopping position. See
   * https://support.google.com/sa360/answer/9566729 for details. Any value
   * below 0.1 is reported as 0.0999.
   */
  searchAbsoluteTopImpressionShare?: number;
  /**
   * The number estimating how often your ad wasn't the very first ad above the
   * organic search results due to a low budget. Note: Search budget lost
   * absolute top impression share is reported in the range of 0 to 0.9. Any
   * value above 0.9 is reported as 0.9001.
   */
  searchBudgetLostAbsoluteTopImpressionShare?: number;
  /**
   * The estimated percent of times that your ad was eligible to show on the
   * Search Network but didn't because your budget was too low. Note: Search
   * budget lost impression share is reported in the range of 0 to 0.9. Any
   * value above 0.9 is reported as 0.9001.
   */
  searchBudgetLostImpressionShare?: number;
  /**
   * The number estimating how often your ad didn't show anywhere above the
   * organic search results due to a low budget. Note: Search budget lost top
   * impression share is reported in the range of 0 to 0.9. Any value above 0.9
   * is reported as 0.9001.
   */
  searchBudgetLostTopImpressionShare?: number;
  /**
   * The number of clicks you've received on the Search Network divided by the
   * estimated number of clicks you were eligible to receive. Note: Search click
   * share is reported in the range of 0.1 to 1. Any value below 0.1 is reported
   * as 0.0999.
   */
  searchClickShare?: number;
  /**
   * The impressions you've received divided by the estimated number of
   * impressions you were eligible to receive on the Search Network for search
   * terms that matched your keywords exactly (or were close variants of your
   * keyword), regardless of your keyword match types. Note: Search exact match
   * impression share is reported in the range of 0.1 to 1. Any value below 0.1
   * is reported as 0.0999.
   */
  searchExactMatchImpressionShare?: number;
  /**
   * The impressions you've received on the Search Network divided by the
   * estimated number of impressions you were eligible to receive. Note: Search
   * impression share is reported in the range of 0.1 to 1. Any value below 0.1
   * is reported as 0.0999.
   */
  searchImpressionShare?: number;
  /**
   * The number estimating how often your ad wasn't the very first ad above the
   * organic search results due to poor Ad Rank. Note: Search rank lost absolute
   * top impression share is reported in the range of 0 to 0.9. Any value above
   * 0.9 is reported as 0.9001.
   */
  searchRankLostAbsoluteTopImpressionShare?: number;
  /**
   * The estimated percentage of impressions on the Search Network that your
   * ads didn't receive due to poor Ad Rank. Note: Search rank lost impression
   * share is reported in the range of 0 to 0.9. Any value above 0.9 is reported
   * as 0.9001.
   */
  searchRankLostImpressionShare?: number;
  /**
   * The number estimating how often your ad didn't show anywhere above the
   * organic search results due to poor Ad Rank. Note: Search rank lost top
   * impression share is reported in the range of 0 to 0.9. Any value above 0.9
   * is reported as 0.9001.
   */
  searchRankLostTopImpressionShare?: number;
  /**
   * The impressions you've received in the top location (anywhere above the
   * organic search results) compared to the estimated number of impressions you
   * were eligible to receive in the top location. Note: Search top impression
   * share is reported in the range of 0.1 to 1. Any value below 0.1 is reported
   * as 0.0999.
   */
  searchTopImpressionShare?: number;
  /**
   * The percent of your ad impressions that are shown anywhere above the
   * organic search results.
   */
  topImpressionPercentage?: number;
  /**
   * The value of all conversions divided by the number of all conversions.
   */
  valuePerAllConversions?: number;
  /**
   * The value of all conversions divided by the number of all conversions.
   * When this column is selected with date, the values in date column means the
   * conversion date. Details for the by_conversion_date columns are available
   * at https://support.google.com/sa360/answer/9250611.
   */
  valuePerAllConversionsByConversionDate?: number;
  /**
   * The value of biddable conversion divided by the number of biddable
   * conversions. Shows how much, on average, each of the biddable conversions
   * is worth.
   */
  valuePerConversion?: number;
  /**
   * Biddable conversions value by conversion date divided by biddable
   * conversions by conversion date. Shows how much, on average, each of the
   * biddable conversions is worth (by conversion date). When this column is
   * selected with date, the values in date column means the conversion date.
   */
  valuePerConversionsByConversionDate?: number;
}

function serializeGoogleAdsSearchads360V0Common__Metrics(data: any): GoogleAdsSearchads360V0Common__Metrics {
  return {
    ...data,
    clicks: data["clicks"] !== undefined ? String(data["clicks"]) : undefined,
    clientAccountViewThroughConversions: data["clientAccountViewThroughConversions"] !== undefined ? String(data["clientAccountViewThroughConversions"]) : undefined,
    costMicros: data["costMicros"] !== undefined ? String(data["costMicros"]) : undefined,
    historicalQualityScore: data["historicalQualityScore"] !== undefined ? String(data["historicalQualityScore"]) : undefined,
    impressions: data["impressions"] !== undefined ? String(data["impressions"]) : undefined,
    interactions: data["interactions"] !== undefined ? String(data["interactions"]) : undefined,
    invalidClicks: data["invalidClicks"] !== undefined ? String(data["invalidClicks"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__Metrics(data: any): GoogleAdsSearchads360V0Common__Metrics {
  return {
    ...data,
    clicks: data["clicks"] !== undefined ? BigInt(data["clicks"]) : undefined,
    clientAccountViewThroughConversions: data["clientAccountViewThroughConversions"] !== undefined ? BigInt(data["clientAccountViewThroughConversions"]) : undefined,
    costMicros: data["costMicros"] !== undefined ? BigInt(data["costMicros"]) : undefined,
    historicalQualityScore: data["historicalQualityScore"] !== undefined ? BigInt(data["historicalQualityScore"]) : undefined,
    impressions: data["impressions"] !== undefined ? BigInt(data["impressions"]) : undefined,
    interactions: data["interactions"] !== undefined ? BigInt(data["interactions"]) : undefined,
    invalidClicks: data["invalidClicks"] !== undefined ? BigInt(data["invalidClicks"]) : undefined,
  };
}

/**
 * A bidding strategy where bids are a fraction of the advertised price for
 * some good or service.
 */
export interface GoogleAdsSearchads360V0Common__PercentCpc {
  /**
   * Maximum bid limit that can be set by the bid strategy. This is an optional
   * field entered by the advertiser and specified in local micros. Note: A zero
   * value is interpreted in the same way as having bid_ceiling undefined.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * Adjusts the bid for each auction upward or downward, depending on the
   * likelihood of a conversion. Individual bids may exceed
   * cpc_bid_ceiling_micros, but the average bid amount for a campaign should
   * not.
   */
  enhancedCpcEnabled?: boolean;
}

function serializeGoogleAdsSearchads360V0Common__PercentCpc(data: any): GoogleAdsSearchads360V0Common__PercentCpc {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__PercentCpc(data: any): GoogleAdsSearchads360V0Common__PercentCpc {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
  };
}

/**
 * Settings for Real-Time Bidding, a feature only available for campaigns
 * targeting the Ad Exchange network.
 */
export interface GoogleAdsSearchads360V0Common__RealTimeBiddingSetting {
  /**
   * Whether the campaign is opted in to real-time bidding.
   */
  optIn?: boolean;
}

/**
 * Segment only fields.
 */
export interface GoogleAdsSearchads360V0Common__Segments {
  /**
   * Resource name of the conversion action.
   */
  conversionAction?: string;
  /**
   * Conversion action category.
   */
  conversionActionCategory?:  | "UNSPECIFIED" | "UNKNOWN" | "DEFAULT" | "PAGE_VIEW" | "PURCHASE" | "SIGNUP" | "LEAD" | "DOWNLOAD" | "ADD_TO_CART" | "BEGIN_CHECKOUT" | "SUBSCRIBE_PAID" | "PHONE_CALL_LEAD" | "IMPORTED_LEAD" | "SUBMIT_LEAD_FORM" | "BOOK_APPOINTMENT" | "REQUEST_QUOTE" | "GET_DIRECTIONS" | "OUTBOUND_CLICK" | "CONTACT" | "ENGAGEMENT" | "STORE_VISIT" | "STORE_SALE" | "QUALIFIED_LEAD" | "CONVERTED_LEAD";
  /**
   * Conversion action name.
   */
  conversionActionName?: string;
  /**
   * Date to which metrics apply. yyyy-MM-dd format, for example, 2018-04-17.
   */
  date?: string;
  /**
   * Day of the week, for example, MONDAY.
   */
  dayOfWeek?:  | "UNSPECIFIED" | "UNKNOWN" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Device to which metrics apply.
   */
  device?:  | "UNSPECIFIED" | "UNKNOWN" | "MOBILE" | "TABLET" | "DESKTOP" | "CONNECTED_TV" | "OTHER";
  /**
   * Month as represented by the date of the first day of a month. Formatted as
   * yyyy-MM-dd.
   */
  month?: string;
  /**
   * Quarter as represented by the date of the first day of a quarter. Uses the
   * calendar year for quarters, for example, the second quarter of 2018 starts
   * on 2018-04-01. Formatted as yyyy-MM-dd.
   */
  quarter?: string;
  /**
   * Week as defined as Monday through Sunday, and represented by the date of
   * Monday. Formatted as yyyy-MM-dd.
   */
  week?: string;
  /**
   * Year, formatted as yyyy.
   */
  year?: number;
}

/**
 * An automated bid strategy that sets bids to help get as many conversions as
 * possible at the target cost-per-acquisition (CPA) you set.
 */
export interface GoogleAdsSearchads360V0Common__TargetCpa {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. This should only be set for
   * portfolio bid strategies.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * Minimum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. This should only be set for
   * portfolio bid strategies.
   */
  cpcBidFloorMicros?: bigint;
  /**
   * Average CPA target. This target should be greater than or equal to minimum
   * billable unit based on the currency for the account.
   */
  targetCpaMicros?: bigint;
}

function serializeGoogleAdsSearchads360V0Common__TargetCpa(data: any): GoogleAdsSearchads360V0Common__TargetCpa {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? String(data["cpcBidFloorMicros"]) : undefined,
    targetCpaMicros: data["targetCpaMicros"] !== undefined ? String(data["targetCpaMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__TargetCpa(data: any): GoogleAdsSearchads360V0Common__TargetCpa {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? BigInt(data["cpcBidFloorMicros"]) : undefined,
    targetCpaMicros: data["targetCpaMicros"] !== undefined ? BigInt(data["targetCpaMicros"]) : undefined,
  };
}

/**
 * Target CPM (cost per thousand impressions) is an automated bidding strategy
 * that sets bids to optimize performance given the target CPM you set.
 */
export interface GoogleAdsSearchads360V0Common__TargetCpm {
}

/**
 * An automated bidding strategy that sets bids so that a certain percentage of
 * search ads are shown at the top of the first page (or other targeted
 * location).
 */
export interface GoogleAdsSearchads360V0Common__TargetImpressionShare {
  /**
   * The highest CPC bid the automated bidding system is permitted to specify.
   * This is a required field entered by the advertiser that sets the ceiling
   * and specified in local micros.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * The targeted location on the search results page.
   */
  location?:  | "UNSPECIFIED" | "UNKNOWN" | "ANYWHERE_ON_PAGE" | "TOP_OF_PAGE" | "ABSOLUTE_TOP_OF_PAGE";
  /**
   * The chosen fraction of ads to be shown in the targeted location in micros.
   * For example, 1% equals 10,000.
   */
  locationFractionMicros?: bigint;
}

function serializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data: any): GoogleAdsSearchads360V0Common__TargetImpressionShare {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    locationFractionMicros: data["locationFractionMicros"] !== undefined ? String(data["locationFractionMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data: any): GoogleAdsSearchads360V0Common__TargetImpressionShare {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    locationFractionMicros: data["locationFractionMicros"] !== undefined ? BigInt(data["locationFractionMicros"]) : undefined,
  };
}

/**
 * An automated bidding strategy that sets bids based on the target fraction of
 * auctions where the advertiser should outrank a specific competitor. This
 * strategy is deprecated.
 */
export interface GoogleAdsSearchads360V0Common__TargetOutrankShare {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy.
   */
  cpcBidCeilingMicros?: bigint;
}

function serializeGoogleAdsSearchads360V0Common__TargetOutrankShare(data: any): GoogleAdsSearchads360V0Common__TargetOutrankShare {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__TargetOutrankShare(data: any): GoogleAdsSearchads360V0Common__TargetOutrankShare {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
  };
}

/**
 * An automated bidding strategy that helps you maximize revenue while
 * averaging a specific target return on ad spend (ROAS).
 */
export interface GoogleAdsSearchads360V0Common__TargetRoas {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. This should only be set for
   * portfolio bid strategies.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * Minimum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy. This should only be set for
   * portfolio bid strategies.
   */
  cpcBidFloorMicros?: bigint;
  /**
   * Required. The chosen revenue (based on conversion data) per unit of spend.
   * Value must be between 0.01 and 1000.0, inclusive.
   */
  targetRoas?: number;
}

function serializeGoogleAdsSearchads360V0Common__TargetRoas(data: any): GoogleAdsSearchads360V0Common__TargetRoas {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? String(data["cpcBidFloorMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__TargetRoas(data: any): GoogleAdsSearchads360V0Common__TargetRoas {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    cpcBidFloorMicros: data["cpcBidFloorMicros"] !== undefined ? BigInt(data["cpcBidFloorMicros"]) : undefined,
  };
}

/**
 * An automated bid strategy that sets your bids to help get as many clicks as
 * possible within your budget.
 */
export interface GoogleAdsSearchads360V0Common__TargetSpend {
  /**
   * Maximum bid limit that can be set by the bid strategy. The limit applies
   * to all keywords managed by the strategy.
   */
  cpcBidCeilingMicros?: bigint;
  /**
   * The spend target under which to maximize clicks. A TargetSpend bidder will
   * attempt to spend the smaller of this value or the natural throttling spend
   * amount. If not specified, the budget is used as the spend target. This
   * field is deprecated and should no longer be used. See
   * https://ads-developers.googleblog.com/2020/05/reminder-about-sunset-creation-of.html
   * for details.
   */
  targetSpendMicros?: bigint;
}

function serializeGoogleAdsSearchads360V0Common__TargetSpend(data: any): GoogleAdsSearchads360V0Common__TargetSpend {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? String(data["cpcBidCeilingMicros"]) : undefined,
    targetSpendMicros: data["targetSpendMicros"] !== undefined ? String(data["targetSpendMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__TargetSpend(data: any): GoogleAdsSearchads360V0Common__TargetSpend {
  return {
    ...data,
    cpcBidCeilingMicros: data["cpcBidCeilingMicros"] !== undefined ? BigInt(data["cpcBidCeilingMicros"]) : undefined,
    targetSpendMicros: data["targetSpendMicros"] !== undefined ? BigInt(data["targetSpendMicros"]) : undefined,
  };
}

/**
 * A generic data container.
 */
export interface GoogleAdsSearchads360V0Common__Value {
  /**
   * A boolean.
   */
  booleanValue?: boolean;
  /**
   * A double.
   */
  doubleValue?: number;
  /**
   * A float.
   */
  floatValue?: number;
  /**
   * An int64.
   */
  int64Value?: bigint;
  /**
   * A string.
   */
  stringValue?: string;
}

function serializeGoogleAdsSearchads360V0Common__Value(data: any): GoogleAdsSearchads360V0Common__Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Common__Value(data: any): GoogleAdsSearchads360V0Common__Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * Logical expression for targeting webpages of an advertiser's website.
 */
export interface GoogleAdsSearchads360V0Common__WebpageConditionInfo {
  /**
   * Argument of webpage targeting condition.
   */
  argument?: string;
  /**
   * Operand of webpage targeting condition.
   */
  operand?:  | "UNSPECIFIED" | "UNKNOWN" | "URL" | "CATEGORY" | "PAGE_TITLE" | "PAGE_CONTENT" | "CUSTOM_LABEL";
  /**
   * Operator of webpage targeting condition.
   */
  operator?:  | "UNSPECIFIED" | "UNKNOWN" | "EQUALS" | "CONTAINS";
}

/**
 * Represents a criterion for targeting webpages of an advertiser's website.
 */
export interface GoogleAdsSearchads360V0Common__WebpageInfo {
  /**
   * Conditions, or logical expressions, for webpage targeting. The list of
   * webpage targeting conditions are and-ed together when evaluated for
   * targeting. An empty list of conditions indicates all pages of the
   * campaign's website are targeted. This field is required for CREATE
   * operations and is prohibited on UPDATE operations.
   */
  conditions?: GoogleAdsSearchads360V0Common__WebpageConditionInfo[];
  /**
   * Website criteria coverage percentage. This is the computed percentage of
   * website coverage based on the website target, negative website target and
   * negative keywords in the ad group and campaign. For instance, when coverage
   * returns as 1, it indicates it has 100% coverage. This field is read-only.
   */
  coveragePercentage?: number;
  /**
   * The name of the criterion that is defined by this parameter. The name
   * value will be used for identifying, sorting and filtering criteria with
   * this type of parameters. This field is required for CREATE operations and
   * is prohibited on UPDATE operations.
   */
  criterionName?: string;
}

/**
 * The error reason represented by type and enum.
 */
export interface GoogleAdsSearchads360V0Errors__ErrorCode {
  /**
   * Indicates failure to properly authenticate user.
   */
  authenticationError?:  | "UNSPECIFIED" | "UNKNOWN" | "AUTHENTICATION_ERROR" | "CLIENT_CUSTOMER_ID_INVALID" | "CUSTOMER_NOT_FOUND" | "GOOGLE_ACCOUNT_DELETED" | "GOOGLE_ACCOUNT_COOKIE_INVALID" | "GOOGLE_ACCOUNT_AUTHENTICATION_FAILED" | "GOOGLE_ACCOUNT_USER_AND_ADS_USER_MISMATCH" | "LOGIN_COOKIE_REQUIRED" | "NOT_ADS_USER" | "OAUTH_TOKEN_INVALID" | "OAUTH_TOKEN_EXPIRED" | "OAUTH_TOKEN_DISABLED" | "OAUTH_TOKEN_REVOKED" | "OAUTH_TOKEN_HEADER_INVALID" | "LOGIN_COOKIE_INVALID" | "USER_ID_INVALID" | "TWO_STEP_VERIFICATION_NOT_ENROLLED" | "ADVANCED_PROTECTION_NOT_ENROLLED";
  /**
   * An error encountered when trying to authorize a user.
   */
  authorizationError?:  | "UNSPECIFIED" | "UNKNOWN" | "USER_PERMISSION_DENIED" | "PROJECT_DISABLED" | "AUTHORIZATION_ERROR" | "ACTION_NOT_PERMITTED" | "INCOMPLETE_SIGNUP" | "CUSTOMER_NOT_ENABLED" | "MISSING_TOS" | "INVALID_LOGIN_CUSTOMER_ID_SERVING_CUSTOMER_ID_COMBINATION" | "SERVICE_ACCESS_DENIED" | "ACCESS_DENIED_FOR_ACCOUNT_TYPE" | "METRIC_ACCESS_DENIED";
  /**
   * The reasons for the date error
   */
  dateError?:  | "UNSPECIFIED" | "UNKNOWN" | "INVALID_FIELD_VALUES_IN_DATE" | "INVALID_FIELD_VALUES_IN_DATE_TIME" | "INVALID_STRING_DATE" | "INVALID_STRING_DATE_TIME_MICROS" | "INVALID_STRING_DATE_TIME_SECONDS" | "INVALID_STRING_DATE_TIME_SECONDS_WITH_OFFSET" | "EARLIER_THAN_MINIMUM_DATE" | "LATER_THAN_MAXIMUM_DATE" | "DATE_RANGE_MINIMUM_DATE_LATER_THAN_MAXIMUM_DATE" | "DATE_RANGE_MINIMUM_AND_MAXIMUM_DATES_BOTH_NULL";
  /**
   * The reasons for the date range error
   */
  dateRangeError?:  | "UNSPECIFIED" | "UNKNOWN" | "INVALID_DATE" | "START_DATE_AFTER_END_DATE" | "CANNOT_SET_DATE_TO_PAST" | "AFTER_MAXIMUM_ALLOWABLE_DATE" | "CANNOT_MODIFY_START_DATE_IF_ALREADY_STARTED";
  /**
   * The reasons for the distinct error
   */
  distinctError?:  | "UNSPECIFIED" | "UNKNOWN" | "DUPLICATE_ELEMENT" | "DUPLICATE_TYPE";
  /**
   * The reasons for the header error.
   */
  headerError?:  | "UNSPECIFIED" | "UNKNOWN" | "INVALID_USER_SELECTED_CUSTOMER_ID" | "INVALID_LOGIN_CUSTOMER_ID";
  /**
   * An unexpected server-side error.
   */
  internalError?:  | "UNSPECIFIED" | "UNKNOWN" | "INTERNAL_ERROR" | "ERROR_CODE_NOT_PUBLISHED" | "TRANSIENT_ERROR" | "DEADLINE_EXCEEDED";
  /**
   * An error with the query
   */
  queryError?:  | "UNSPECIFIED" | "UNKNOWN" | "QUERY_ERROR" | "BAD_ENUM_CONSTANT" | "BAD_ESCAPE_SEQUENCE" | "BAD_FIELD_NAME" | "BAD_LIMIT_VALUE" | "BAD_NUMBER" | "BAD_OPERATOR" | "BAD_PARAMETER_NAME" | "BAD_PARAMETER_VALUE" | "BAD_RESOURCE_TYPE_IN_FROM_CLAUSE" | "BAD_SYMBOL" | "BAD_VALUE" | "DATE_RANGE_TOO_WIDE" | "DATE_RANGE_TOO_NARROW" | "EXPECTED_AND" | "EXPECTED_BY" | "EXPECTED_DIMENSION_FIELD_IN_SELECT_CLAUSE" | "EXPECTED_FILTERS_ON_DATE_RANGE" | "EXPECTED_FROM" | "EXPECTED_LIST" | "EXPECTED_REFERENCED_FIELD_IN_SELECT_CLAUSE" | "EXPECTED_SELECT" | "EXPECTED_SINGLE_VALUE" | "EXPECTED_VALUE_WITH_BETWEEN_OPERATOR" | "INVALID_DATE_FORMAT" | "MISALIGNED_DATE_FOR_FILTER" | "INVALID_STRING_VALUE" | "INVALID_VALUE_WITH_BETWEEN_OPERATOR" | "INVALID_VALUE_WITH_DURING_OPERATOR" | "INVALID_VALUE_WITH_LIKE_OPERATOR" | "OPERATOR_FIELD_MISMATCH" | "PROHIBITED_EMPTY_LIST_IN_CONDITION" | "PROHIBITED_ENUM_CONSTANT" | "PROHIBITED_FIELD_COMBINATION_IN_SELECT_CLAUSE" | "PROHIBITED_FIELD_IN_ORDER_BY_CLAUSE" | "PROHIBITED_FIELD_IN_SELECT_CLAUSE" | "PROHIBITED_FIELD_IN_WHERE_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_FROM_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_SELECT_CLAUSE" | "PROHIBITED_RESOURCE_TYPE_IN_WHERE_CLAUSE" | "PROHIBITED_METRIC_IN_SELECT_OR_WHERE_CLAUSE" | "PROHIBITED_SEGMENT_IN_SELECT_OR_WHERE_CLAUSE" | "PROHIBITED_SEGMENT_WITH_METRIC_IN_SELECT_OR_WHERE_CLAUSE" | "LIMIT_VALUE_TOO_LOW" | "PROHIBITED_NEWLINE_IN_STRING" | "PROHIBITED_VALUE_COMBINATION_IN_LIST" | "PROHIBITED_VALUE_COMBINATION_WITH_BETWEEN_OPERATOR" | "STRING_NOT_TERMINATED" | "TOO_MANY_SEGMENTS" | "UNEXPECTED_END_OF_QUERY" | "UNEXPECTED_FROM_CLAUSE" | "UNRECOGNIZED_FIELD" | "UNEXPECTED_INPUT" | "REQUESTED_METRICS_FOR_MANAGER" | "FILTER_HAS_TOO_MANY_VALUES";
  /**
   * An error with the amonut of quota remaining.
   */
  quotaError?:  | "UNSPECIFIED" | "UNKNOWN" | "RESOURCE_EXHAUSTED" | "ACCESS_PROHIBITED" | "RESOURCE_TEMPORARILY_EXHAUSTED";
  /**
   * An error caused by the request
   */
  requestError?:  | "UNSPECIFIED" | "UNKNOWN" | "RESOURCE_NAME_MISSING" | "RESOURCE_NAME_MALFORMED" | "BAD_RESOURCE_ID" | "INVALID_PRODUCT_NAME" | "INVALID_CUSTOMER_ID" | "OPERATION_REQUIRED" | "RESOURCE_NOT_FOUND" | "INVALID_PAGE_TOKEN" | "EXPIRED_PAGE_TOKEN" | "INVALID_PAGE_SIZE" | "REQUIRED_FIELD_MISSING" | "IMMUTABLE_FIELD" | "TOO_MANY_MUTATE_OPERATIONS" | "CANNOT_BE_EXECUTED_BY_MANAGER_ACCOUNT" | "CANNOT_MODIFY_FOREIGN_FIELD" | "INVALID_ENUM_VALUE" | "LOGIN_CUSTOMER_ID_PARAMETER_MISSING" | "LOGIN_OR_LINKED_CUSTOMER_ID_PARAMETER_REQUIRED" | "VALIDATE_ONLY_REQUEST_HAS_PAGE_TOKEN" | "CANNOT_RETURN_SUMMARY_ROW_FOR_REQUEST_WITHOUT_METRICS" | "CANNOT_RETURN_SUMMARY_ROW_FOR_VALIDATE_ONLY_REQUESTS" | "INCONSISTENT_RETURN_SUMMARY_ROW_VALUE" | "TOTAL_RESULTS_COUNT_NOT_ORIGINALLY_REQUESTED" | "RPC_DEADLINE_TOO_SHORT" | "PRODUCT_NOT_SUPPORTED";
  /**
   * The reasons for the size limit error
   */
  sizeLimitError?:  | "UNSPECIFIED" | "UNKNOWN" | "REQUEST_SIZE_LIMIT_EXCEEDED" | "RESPONSE_SIZE_LIMIT_EXCEEDED";
}

/**
 * Additional error details.
 */
export interface GoogleAdsSearchads360V0Errors__ErrorDetails {
  /**
   * Details on the quota error, including the scope (account or developer),
   * the rate bucket name and the retry delay.
   */
  quotaErrorDetails?: GoogleAdsSearchads360V0Errors__QuotaErrorDetails;
  /**
   * The error code that should have been returned, but wasn't. This is used
   * when the error code is not published in the client specified version.
   */
  unpublishedErrorCode?: string;
}

function serializeGoogleAdsSearchads360V0Errors__ErrorDetails(data: any): GoogleAdsSearchads360V0Errors__ErrorDetails {
  return {
    ...data,
    quotaErrorDetails: data["quotaErrorDetails"] !== undefined ? serializeGoogleAdsSearchads360V0Errors__QuotaErrorDetails(data["quotaErrorDetails"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Errors__ErrorDetails(data: any): GoogleAdsSearchads360V0Errors__ErrorDetails {
  return {
    ...data,
    quotaErrorDetails: data["quotaErrorDetails"] !== undefined ? deserializeGoogleAdsSearchads360V0Errors__QuotaErrorDetails(data["quotaErrorDetails"]) : undefined,
  };
}

/**
 * Describes the part of the request proto that caused the error.
 */
export interface GoogleAdsSearchads360V0Errors__ErrorLocation {
  /**
   * A field path that indicates which field was invalid in the request.
   */
  fieldPathElements?: GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement[];
}

/**
 * Additional quota error details when there is QuotaError.
 */
export interface GoogleAdsSearchads360V0Errors__QuotaErrorDetails {
  /**
   * The high level description of the quota bucket. Examples are "Get requests
   * for standard access" or "Requests per account".
   */
  rateName?: string;
  /**
   * The rate scope of the quota limit.
   */
  rateScope?:  | "UNSPECIFIED" | "UNKNOWN" | "ACCOUNT" | "DEVELOPER";
  /**
   * Backoff period that customers should wait before sending next request.
   */
  retryDelay?: number /* Duration */;
}

function serializeGoogleAdsSearchads360V0Errors__QuotaErrorDetails(data: any): GoogleAdsSearchads360V0Errors__QuotaErrorDetails {
  return {
    ...data,
    retryDelay: data["retryDelay"] !== undefined ? data["retryDelay"] : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Errors__QuotaErrorDetails(data: any): GoogleAdsSearchads360V0Errors__QuotaErrorDetails {
  return {
    ...data,
    retryDelay: data["retryDelay"] !== undefined ? data["retryDelay"] : undefined,
  };
}

/**
 * SearchAds360-specific error.
 */
export interface GoogleAdsSearchads360V0Errors__SearchAds360Error {
  /**
   * Additional error details, which are returned by certain error codes. Most
   * error codes do not include details.
   */
  details?: GoogleAdsSearchads360V0Errors__ErrorDetails;
  /**
   * An enum value that indicates which error occurred.
   */
  errorCode?: GoogleAdsSearchads360V0Errors__ErrorCode;
  /**
   * Describes the part of the request proto that caused the error.
   */
  location?: GoogleAdsSearchads360V0Errors__ErrorLocation;
  /**
   * A human-readable description of the error.
   */
  message?: string;
  /**
   * The value that triggered the error.
   */
  trigger?: GoogleAdsSearchads360V0Common__Value;
}

function serializeGoogleAdsSearchads360V0Errors__SearchAds360Error(data: any): GoogleAdsSearchads360V0Errors__SearchAds360Error {
  return {
    ...data,
    details: data["details"] !== undefined ? serializeGoogleAdsSearchads360V0Errors__ErrorDetails(data["details"]) : undefined,
    trigger: data["trigger"] !== undefined ? serializeGoogleAdsSearchads360V0Common__Value(data["trigger"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Errors__SearchAds360Error(data: any): GoogleAdsSearchads360V0Errors__SearchAds360Error {
  return {
    ...data,
    details: data["details"] !== undefined ? deserializeGoogleAdsSearchads360V0Errors__ErrorDetails(data["details"]) : undefined,
    trigger: data["trigger"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__Value(data["trigger"]) : undefined,
  };
}

/**
 * Describes how a Search Ads 360 API call failed. It's returned inside
 * google.rpc.Status.details when a call fails.
 */
export interface GoogleAdsSearchads360V0Errors__SearchAds360Failure {
  /**
   * The list of errors that occurred.
   */
  errors?: GoogleAdsSearchads360V0Errors__SearchAds360Error[];
  /**
   * The unique ID of the request that is used for debugging purposes.
   */
  requestId?: string;
}

function serializeGoogleAdsSearchads360V0Errors__SearchAds360Failure(data: any): GoogleAdsSearchads360V0Errors__SearchAds360Failure {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleAdsSearchads360V0Errors__SearchAds360Error(item))) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Errors__SearchAds360Failure(data: any): GoogleAdsSearchads360V0Errors__SearchAds360Failure {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleAdsSearchads360V0Errors__SearchAds360Error(item))) : undefined,
  };
}

/**
 * A part of a field path.
 */
export interface GoogleAdsSearchads360V0Errors_ErrorLocation_FieldPathElement {
  /**
   * The name of a field or a oneof
   */
  fieldName?: string;
  /**
   * If field_name is a repeated field, this is the element that failed
   */
  index?: number;
}

/**
 * An ad group.
 */
export interface GoogleAdsSearchads360V0Resources__AdGroup {
  /**
   * The ad rotation mode of the ad group.
   */
  adRotationMode?:  | "UNSPECIFIED" | "UNKNOWN" | "OPTIMIZE" | "ROTATE_FOREVER";
  /**
   * The maximum CPC (cost-per-click) bid.
   */
  cpcBidMicros?: bigint;
  /**
   * Output only. The ID of the ad group.
   */
  readonly id?: bigint;
  /**
   * The name of the ad group. This field is required and should not be empty
   * when creating new ad groups. It must contain fewer than 255 UTF-8
   * full-width characters. It must not contain any null (code point 0x0), NL
   * line feed (code point 0xA) or carriage return (code point 0xD) characters.
   */
  name?: string;
  /**
   * Immutable. The resource name of the ad group. Ad group resource names have
   * the form: `customers/{customer_id}/adGroups/{ad_group_id}`
   */
  resourceName?: string;
  /**
   * The status of the ad group.
   */
  status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";
  /**
   * Immutable. The type of the ad group.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "SEARCH_STANDARD" | "DISPLAY_STANDARD" | "SHOPPING_PRODUCT_ADS" | "SHOPPING_SHOWCASE_ADS" | "HOTEL_ADS" | "SHOPPING_SMART_ADS" | "VIDEO_BUMPER" | "VIDEO_TRUE_VIEW_IN_STREAM" | "VIDEO_TRUE_VIEW_IN_DISPLAY" | "VIDEO_NON_SKIPPABLE_IN_STREAM" | "VIDEO_OUTSTREAM" | "SEARCH_DYNAMIC_ADS" | "SHOPPING_COMPARISON_LISTING_ADS" | "PROMOTED_HOTEL_ADS" | "VIDEO_RESPONSIVE" | "VIDEO_EFFICIENT_REACH" | "SMART_CAMPAIGN_ADS";
}

function serializeGoogleAdsSearchads360V0Resources__AdGroup(data: any): GoogleAdsSearchads360V0Resources__AdGroup {
  return {
    ...data,
    cpcBidMicros: data["cpcBidMicros"] !== undefined ? String(data["cpcBidMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__AdGroup(data: any): GoogleAdsSearchads360V0Resources__AdGroup {
  return {
    ...data,
    cpcBidMicros: data["cpcBidMicros"] !== undefined ? BigInt(data["cpcBidMicros"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Represents an ad group bid modifier.
 */
export interface GoogleAdsSearchads360V0Resources__AdGroupBidModifier {
  /**
   * The modifier for the bid when the criterion matches. The modifier must be
   * in the range: 0.1 - 10.0. The range is 1.0 - 6.0 for PreferredContent. Use
   * 0 to opt out of a Device type.
   */
  bidModifier?: number;
  /**
   * Immutable. The resource name of the ad group bid modifier. Ad group bid
   * modifier resource names have the form:
   * `customers/{customer_id}/adGroupBidModifiers/{ad_group_id}~{criterion_id}`
   */
  resourceName?: string;
}

/**
 * An ad group criterion.
 */
export interface GoogleAdsSearchads360V0Resources__AdGroupCriterion {
  /**
   * Immutable. The ad group to which the criterion belongs.
   */
  adGroup?: string;
  /**
   * Immutable. Age range.
   */
  ageRange?: GoogleAdsSearchads360V0Common__AgeRangeInfo;
  /**
   * The modifier for the bid when the criterion matches. The modifier must be
   * in the range: 0.1 - 10.0. Most targetable criteria types support modifiers.
   */
  bidModifier?: number;
  /**
   * The CPC (cost-per-click) bid.
   */
  cpcBidMicros?: bigint;
  /**
   * Output only. The ID of the criterion.
   */
  readonly criterionId?: bigint;
  /**
   * Output only. The effective CPC (cost-per-click) bid.
   */
  readonly effectiveCpcBidMicros?: bigint;
  /**
   * Output only. The Engine Status for ad group criterion.
   */
  readonly engineStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "AD_GROUP_CRITERION_ELIGIBLE" | "AD_GROUP_CRITERION_INAPPROPRIATE_FOR_CAMPAIGN" | "AD_GROUP_CRITERION_INVALID_MOBILE_SEARCH" | "AD_GROUP_CRITERION_INVALID_PC_SEARCH" | "AD_GROUP_CRITERION_INVALID_SEARCH" | "AD_GROUP_CRITERION_LOW_SEARCH_VOLUME" | "AD_GROUP_CRITERION_MOBILE_URL_UNDER_REVIEW" | "AD_GROUP_CRITERION_PARTIALLY_INVALID" | "AD_GROUP_CRITERION_TO_BE_ACTIVATED" | "AD_GROUP_CRITERION_UNDER_REVIEW" | "AD_GROUP_CRITERION_NOT_REVIEWED" | "AD_GROUP_CRITERION_ON_HOLD" | "AD_GROUP_CRITERION_PENDING_REVIEW" | "AD_GROUP_CRITERION_PAUSED" | "AD_GROUP_CRITERION_REMOVED" | "AD_GROUP_CRITERION_APPROVED" | "AD_GROUP_CRITERION_DISAPPROVED" | "AD_GROUP_CRITERION_SERVING" | "AD_GROUP_CRITERION_ACCOUNT_PAUSED";
  /**
   * The list of possible final URLs after all cross-domain redirects for the
   * ad.
   */
  finalUrls?: string[];
  /**
   * URL template for appending params to final URL.
   */
  finalUrlSuffix?: string;
  /**
   * Immutable. Gender.
   */
  gender?: GoogleAdsSearchads360V0Common__GenderInfo;
  /**
   * Immutable. Keyword.
   */
  keyword?: GoogleAdsSearchads360V0Common__KeywordInfo;
  /**
   * Output only. The datetime when this ad group criterion was last modified.
   * The datetime is in the customer's time zone and in "yyyy-MM-dd
   * HH:mm:ss.ssssss" format.
   */
  readonly lastModifiedTime?: string;
  /**
   * Immutable. Listing group.
   */
  listingGroup?: GoogleAdsSearchads360V0Common__ListingGroupInfo;
  /**
   * Output only. Information regarding the quality of the criterion.
   */
  readonly qualityInfo?: GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo;
  /**
   * Immutable. The resource name of the ad group criterion. Ad group criterion
   * resource names have the form:
   * `customers/{customer_id}/adGroupCriteria/{ad_group_id}~{criterion_id}`
   */
  resourceName?: string;
  /**
   * The status of the criterion. This is the status of the ad group criterion
   * entity, set by the client. Note: UI reports may incorporate additional
   * information that affects whether a criterion is eligible to run. In some
   * cases a criterion that's REMOVED in the API can still show as enabled in
   * the UI. For example, campaigns by default show to users of all age ranges
   * unless excluded. The UI will show each age range as "enabled", since
   * they're eligible to see the ads; but AdGroupCriterion.status will show
   * "removed", since no positive criterion was added.
   */
  status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";
  /**
   * The URL template for constructing a tracking URL.
   */
  trackingUrlTemplate?: string;
  /**
   * Output only. The type of the criterion.
   */
  readonly type?:  | "UNSPECIFIED" | "UNKNOWN" | "KEYWORD" | "PLACEMENT" | "MOBILE_APP_CATEGORY" | "MOBILE_APPLICATION" | "DEVICE" | "LOCATION" | "LISTING_GROUP" | "AD_SCHEDULE" | "AGE_RANGE" | "GENDER" | "INCOME_RANGE" | "PARENTAL_STATUS" | "YOUTUBE_VIDEO" | "YOUTUBE_CHANNEL" | "USER_LIST" | "PROXIMITY" | "TOPIC" | "LISTING_SCOPE" | "LANGUAGE" | "IP_BLOCK" | "CONTENT_LABEL" | "CARRIER" | "USER_INTEREST" | "WEBPAGE" | "OPERATING_SYSTEM_VERSION" | "APP_PAYMENT_MODEL" | "MOBILE_DEVICE" | "CUSTOM_AFFINITY" | "CUSTOM_INTENT" | "LOCATION_GROUP" | "CUSTOM_AUDIENCE" | "COMBINED_AUDIENCE" | "KEYWORD_THEME" | "AUDIENCE" | "LOCAL_SERVICE_ID";
  /**
   * Immutable. Webpage
   */
  webpage?: GoogleAdsSearchads360V0Common__WebpageInfo;
}

function serializeGoogleAdsSearchads360V0Resources__AdGroupCriterion(data: any): GoogleAdsSearchads360V0Resources__AdGroupCriterion {
  return {
    ...data,
    cpcBidMicros: data["cpcBidMicros"] !== undefined ? String(data["cpcBidMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__AdGroupCriterion(data: any): GoogleAdsSearchads360V0Resources__AdGroupCriterion {
  return {
    ...data,
    cpcBidMicros: data["cpcBidMicros"] !== undefined ? BigInt(data["cpcBidMicros"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? BigInt(data["criterionId"]) : undefined,
    effectiveCpcBidMicros: data["effectiveCpcBidMicros"] !== undefined ? BigInt(data["effectiveCpcBidMicros"]) : undefined,
  };
}

/**
 * A bidding strategy.
 */
export interface GoogleAdsSearchads360V0Resources__BiddingStrategy {
  /**
   * Output only. The number of campaigns attached to this bidding strategy.
   * This field is read-only.
   */
  readonly campaignCount?: bigint;
  /**
   * Immutable. The currency used by the bidding strategy (ISO 4217
   * three-letter code). For bidding strategies in manager customers, this
   * currency can be set on creation and defaults to the manager customer's
   * currency. For serving customers, this field cannot be set; all strategies
   * in a serving customer implicitly use the serving customer's currency. In
   * all cases the effective_currency_code field returns the currency used by
   * the strategy.
   */
  currencyCode?: string;
  /**
   * Output only. The currency used by the bidding strategy (ISO 4217
   * three-letter code). For bidding strategies in manager customers, this is
   * the currency set by the advertiser when creating the strategy. For serving
   * customers, this is the customer's currency_code. Bidding strategy metrics
   * are reported in this currency. This field is read-only.
   */
  readonly effectiveCurrencyCode?: string;
  /**
   * A bidding strategy that raises bids for clicks that seem more likely to
   * lead to a conversion and lowers them for clicks where they seem less
   * likely.
   */
  enhancedCpc?: GoogleAdsSearchads360V0Common__EnhancedCpc;
  /**
   * Output only. The ID of the bidding strategy.
   */
  readonly id?: bigint;
  /**
   * An automated bidding strategy to help get the most conversions for your
   * campaigns while spending your budget.
   */
  maximizeConversions?: GoogleAdsSearchads360V0Common__MaximizeConversions;
  /**
   * An automated bidding strategy to help get the most conversion value for
   * your campaigns while spending your budget.
   */
  maximizeConversionValue?: GoogleAdsSearchads360V0Common__MaximizeConversionValue;
  /**
   * The name of the bidding strategy. All bidding strategies within an account
   * must be named distinctly. The length of this string should be between 1 and
   * 255, inclusive, in UTF-8 bytes, (trimmed).
   */
  name?: string;
  /**
   * Output only. The number of non-removed campaigns attached to this bidding
   * strategy. This field is read-only.
   */
  readonly nonRemovedCampaignCount?: bigint;
  /**
   * Immutable. The resource name of the bidding strategy. Bidding strategy
   * resource names have the form:
   * `customers/{customer_id}/biddingStrategies/{bidding_strategy_id}`
   */
  resourceName?: string;
  /**
   * Output only. The status of the bidding strategy. This field is read-only.
   */
  readonly status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED";
  /**
   * A bidding strategy that sets bids to help get as many conversions as
   * possible at the target cost-per-acquisition (CPA) you set.
   */
  targetCpa?: GoogleAdsSearchads360V0Common__TargetCpa;
  /**
   * A bidding strategy that automatically optimizes towards a chosen
   * percentage of impressions.
   */
  targetImpressionShare?: GoogleAdsSearchads360V0Common__TargetImpressionShare;
  /**
   * A bidding strategy that sets bids based on the target fraction of auctions
   * where the advertiser should outrank a specific competitor. This field is
   * deprecated. Creating a new bidding strategy with this field or attaching
   * bidding strategies with this field to a campaign will fail. Mutates to
   * strategies that already have this scheme populated are allowed.
   */
  targetOutrankShare?: GoogleAdsSearchads360V0Common__TargetOutrankShare;
  /**
   * A bidding strategy that helps you maximize revenue while averaging a
   * specific target Return On Ad Spend (ROAS).
   */
  targetRoas?: GoogleAdsSearchads360V0Common__TargetRoas;
  /**
   * A bid strategy that sets your bids to help get as many clicks as possible
   * within your budget.
   */
  targetSpend?: GoogleAdsSearchads360V0Common__TargetSpend;
  /**
   * Output only. The type of the bidding strategy. Create a bidding strategy
   * by setting the bidding scheme. This field is read-only.
   */
  readonly type?:  | "UNSPECIFIED" | "UNKNOWN" | "COMMISSION" | "ENHANCED_CPC" | "INVALID" | "MANUAL_CPA" | "MANUAL_CPC" | "MANUAL_CPM" | "MANUAL_CPV" | "MAXIMIZE_CONVERSIONS" | "MAXIMIZE_CONVERSION_VALUE" | "PAGE_ONE_PROMOTED" | "PERCENT_CPC" | "TARGET_CPA" | "TARGET_CPM" | "TARGET_IMPRESSION_SHARE" | "TARGET_OUTRANK_SHARE" | "TARGET_ROAS" | "TARGET_SPEND";
}

function serializeGoogleAdsSearchads360V0Resources__BiddingStrategy(data: any): GoogleAdsSearchads360V0Resources__BiddingStrategy {
  return {
    ...data,
    maximizeConversions: data["maximizeConversions"] !== undefined ? serializeGoogleAdsSearchads360V0Common__MaximizeConversions(data["maximizeConversions"]) : undefined,
    maximizeConversionValue: data["maximizeConversionValue"] !== undefined ? serializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data["maximizeConversionValue"]) : undefined,
    targetCpa: data["targetCpa"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetCpa(data["targetCpa"]) : undefined,
    targetImpressionShare: data["targetImpressionShare"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data["targetImpressionShare"]) : undefined,
    targetOutrankShare: data["targetOutrankShare"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetOutrankShare(data["targetOutrankShare"]) : undefined,
    targetRoas: data["targetRoas"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetRoas(data["targetRoas"]) : undefined,
    targetSpend: data["targetSpend"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetSpend(data["targetSpend"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__BiddingStrategy(data: any): GoogleAdsSearchads360V0Resources__BiddingStrategy {
  return {
    ...data,
    campaignCount: data["campaignCount"] !== undefined ? BigInt(data["campaignCount"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    maximizeConversions: data["maximizeConversions"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__MaximizeConversions(data["maximizeConversions"]) : undefined,
    maximizeConversionValue: data["maximizeConversionValue"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data["maximizeConversionValue"]) : undefined,
    nonRemovedCampaignCount: data["nonRemovedCampaignCount"] !== undefined ? BigInt(data["nonRemovedCampaignCount"]) : undefined,
    targetCpa: data["targetCpa"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetCpa(data["targetCpa"]) : undefined,
    targetImpressionShare: data["targetImpressionShare"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data["targetImpressionShare"]) : undefined,
    targetOutrankShare: data["targetOutrankShare"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetOutrankShare(data["targetOutrankShare"]) : undefined,
    targetRoas: data["targetRoas"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetRoas(data["targetRoas"]) : undefined,
    targetSpend: data["targetSpend"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetSpend(data["targetSpend"]) : undefined,
  };
}

/**
 * A campaign.
 */
export interface GoogleAdsSearchads360V0Resources__Campaign {
  /**
   * The ad serving optimization status of the campaign.
   */
  adServingOptimizationStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "OPTIMIZE" | "CONVERSION_OPTIMIZE" | "ROTATE" | "ROTATE_INDEFINITELY" | "UNAVAILABLE";
  /**
   * Immutable. Optional refinement to `advertising_channel_type`. Must be a
   * valid sub-type of the parent channel type. Can be set only when creating
   * campaigns. After campaign is created, the field can not be changed.
   */
  advertisingChannelSubType?:  | "UNSPECIFIED" | "UNKNOWN" | "SEARCH_MOBILE_APP" | "DISPLAY_MOBILE_APP" | "SEARCH_EXPRESS" | "DISPLAY_EXPRESS" | "SHOPPING_SMART_ADS" | "DISPLAY_GMAIL_AD" | "DISPLAY_SMART_CAMPAIGN" | "VIDEO_OUTSTREAM" | "VIDEO_ACTION" | "VIDEO_NON_SKIPPABLE" | "APP_CAMPAIGN" | "APP_CAMPAIGN_FOR_ENGAGEMENT" | "LOCAL_CAMPAIGN" | "SHOPPING_COMPARISON_LISTING_ADS" | "SMART_CAMPAIGN" | "VIDEO_SEQUENCE" | "APP_CAMPAIGN_FOR_PRE_REGISTRATION" | "VIDEO_REACH_TARGET_FREQUENCY";
  /**
   * Immutable. The primary serving target for ads within the campaign. The
   * targeting options can be refined in `network_settings`. This field is
   * required and should not be empty when creating new campaigns. Can be set
   * only when creating campaigns. After the campaign is created, the field can
   * not be changed.
   */
  advertisingChannelType?:  | "UNSPECIFIED" | "UNKNOWN" | "SEARCH" | "DISPLAY" | "SHOPPING" | "HOTEL" | "VIDEO" | "MULTI_CHANNEL" | "LOCAL" | "SMART" | "PERFORMANCE_MAX" | "LOCAL_SERVICES" | "DISCOVERY";
  /**
   * Portfolio bidding strategy used by campaign.
   */
  biddingStrategy?: string;
  /**
   * Output only. The system status of the campaign's bidding strategy.
   */
  readonly biddingStrategySystemStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "LEARNING_NEW" | "LEARNING_SETTING_CHANGE" | "LEARNING_BUDGET_CHANGE" | "LEARNING_COMPOSITION_CHANGE" | "LEARNING_CONVERSION_TYPE_CHANGE" | "LEARNING_CONVERSION_SETTING_CHANGE" | "LIMITED_BY_CPC_BID_CEILING" | "LIMITED_BY_CPC_BID_FLOOR" | "LIMITED_BY_DATA" | "LIMITED_BY_BUDGET" | "LIMITED_BY_LOW_PRIORITY_SPEND" | "LIMITED_BY_LOW_QUALITY" | "LIMITED_BY_INVENTORY" | "MISCONFIGURED_ZERO_ELIGIBILITY" | "MISCONFIGURED_CONVERSION_TYPES" | "MISCONFIGURED_CONVERSION_SETTINGS" | "MISCONFIGURED_SHARED_BUDGET" | "MISCONFIGURED_STRATEGY_TYPE" | "PAUSED" | "UNAVAILABLE" | "MULTIPLE_LEARNING" | "MULTIPLE_LIMITED" | "MULTIPLE_MISCONFIGURED" | "MULTIPLE";
  /**
   * Output only. The type of bidding strategy. A bidding strategy can be
   * created by setting either the bidding scheme to create a standard bidding
   * strategy or the `bidding_strategy` field to create a portfolio bidding
   * strategy. This field is read-only.
   */
  readonly biddingStrategyType?:  | "UNSPECIFIED" | "UNKNOWN" | "COMMISSION" | "ENHANCED_CPC" | "INVALID" | "MANUAL_CPA" | "MANUAL_CPC" | "MANUAL_CPM" | "MANUAL_CPV" | "MAXIMIZE_CONVERSIONS" | "MAXIMIZE_CONVERSION_VALUE" | "PAGE_ONE_PROMOTED" | "PERCENT_CPC" | "TARGET_CPA" | "TARGET_CPM" | "TARGET_IMPRESSION_SHARE" | "TARGET_OUTRANK_SHARE" | "TARGET_ROAS" | "TARGET_SPEND";
  /**
   * The budget of the campaign.
   */
  campaignBudget?: string;
  /**
   * Output only. Timestamp of the campaign's creation time, formatted in ISO
   * 8601.
   */
  readonly createTime?: string;
  /**
   * The setting for controlling Dynamic Search Ads (DSA).
   */
  dynamicSearchAdsSetting?: GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting;
  /**
   * The last day of the campaign in serving customer's timezone in YYYY-MM-DD
   * format. On create, defaults to 2037-12-30, which means the campaign will
   * run indefinitely. To set an existing campaign to run indefinitely, set this
   * field to 2037-12-30.
   */
  endDate?: string;
  /**
   * Output only. ID of the campaign in the external engine account. This field
   * is for non-Google Ads account only, for example, Yahoo Japan, Microsoft,
   * Baidu etc. For Google Ads entity, use "campaign.id" instead.
   */
  readonly engineId?: string;
  /**
   * The asset field types that should be excluded from this campaign. Asset
   * links with these field types will not be inherited by this campaign from
   * the upper level.
   */
  excludedParentAssetFieldTypes?:  | "UNSPECIFIED" | "UNKNOWN" | "HEADLINE" | "DESCRIPTION" | "MANDATORY_AD_TEXT" | "MARKETING_IMAGE" | "MEDIA_BUNDLE" | "YOUTUBE_VIDEO" | "BOOK_ON_GOOGLE" | "LEAD_FORM" | "PROMOTION" | "CALLOUT" | "STRUCTURED_SNIPPET" | "SITELINK" | "MOBILE_APP" | "HOTEL_CALLOUT" | "CALL" | "PRICE" | "LONG_HEADLINE" | "BUSINESS_NAME" | "SQUARE_MARKETING_IMAGE" | "PORTRAIT_MARKETING_IMAGE" | "LOGO" | "LANDSCAPE_LOGO" | "VIDEO" | "CALL_TO_ACTION_SELECTION" | "AD_IMAGE"[];
  /**
   * Suffix used to append query parameters to landing pages that are served
   * with parallel tracking.
   */
  finalUrlSuffix?: string;
  /**
   * A list that limits how often each user will see this campaign's ads.
   */
  frequencyCaps?: GoogleAdsSearchads360V0Common__FrequencyCapEntry[];
  /**
   * The setting for ads geotargeting.
   */
  geoTargetTypeSetting?: GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting;
  /**
   * Output only. The ID of the campaign.
   */
  readonly id?: bigint;
  /**
   * Output only. The resource names of labels attached to this campaign.
   */
  readonly labels?: string[];
  /**
   * Output only. The datetime when this campaign was last modified. The
   * datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss"
   * format.
   */
  readonly lastModifiedTime?: string;
  /**
   * Standard Manual CPA bidding strategy. Manual bidding strategy that allows
   * advertiser to set the bid per advertiser-specified action. Supported only
   * for Local Services campaigns.
   */
  manualCpa?: GoogleAdsSearchads360V0Common__ManualCpa;
  /**
   * Standard Manual CPC bidding strategy. Manual click-based bidding where
   * user pays per click.
   */
  manualCpc?: GoogleAdsSearchads360V0Common__ManualCpc;
  /**
   * Standard Manual CPM bidding strategy. Manual impression-based bidding
   * where user pays per thousand impressions.
   */
  manualCpm?: GoogleAdsSearchads360V0Common__ManualCpm;
  /**
   * Standard Maximize Conversions bidding strategy that automatically
   * maximizes number of conversions while spending your budget.
   */
  maximizeConversions?: GoogleAdsSearchads360V0Common__MaximizeConversions;
  /**
   * Standard Maximize Conversion Value bidding strategy that automatically
   * sets bids to maximize revenue while spending your budget.
   */
  maximizeConversionValue?: GoogleAdsSearchads360V0Common__MaximizeConversionValue;
  /**
   * The name of the campaign. This field is required and should not be empty
   * when creating new campaigns. It must not contain any null (code point 0x0),
   * NL line feed (code point 0xA) or carriage return (code point 0xD)
   * characters.
   */
  name?: string;
  /**
   * The network settings for the campaign.
   */
  networkSettings?: GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings;
  /**
   * Optimization goal setting for this campaign, which includes a set of
   * optimization goal types.
   */
  optimizationGoalSetting?: GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting;
  /**
   * Standard Percent Cpc bidding strategy where bids are a fraction of the
   * advertised price for some good or service.
   */
  percentCpc?: GoogleAdsSearchads360V0Common__PercentCpc;
  /**
   * Settings for Real-Time Bidding, a feature only available for campaigns
   * targeting the Ad Exchange network.
   */
  realTimeBiddingSetting?: GoogleAdsSearchads360V0Common__RealTimeBiddingSetting;
  /**
   * Immutable. The resource name of the campaign. Campaign resource names have
   * the form: `customers/{customer_id}/campaigns/{campaign_id}`
   */
  resourceName?: string;
  /**
   * Selective optimization setting for this campaign, which includes a set of
   * conversion actions to optimize this campaign towards.
   */
  selectiveOptimization?: GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization;
  /**
   * Output only. The ad serving status of the campaign.
   */
  readonly servingStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "SERVING" | "NONE" | "ENDED" | "PENDING" | "SUSPENDED";
  /**
   * The setting for controlling Shopping campaigns.
   */
  shoppingSetting?: GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting;
  /**
   * The date when campaign started in serving customer's timezone in
   * YYYY-MM-DD format.
   */
  startDate?: string;
  /**
   * The status of the campaign. When a new campaign is added, the status
   * defaults to ENABLED.
   */
  status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";
  /**
   * Standard Target CPA bidding strategy that automatically sets bids to help
   * get as many conversions as possible at the target cost-per-acquisition
   * (CPA) you set.
   */
  targetCpa?: GoogleAdsSearchads360V0Common__TargetCpa;
  /**
   * A bidding strategy that automatically optimizes cost per thousand
   * impressions.
   */
  targetCpm?: GoogleAdsSearchads360V0Common__TargetCpm;
  /**
   * Target Impression Share bidding strategy. An automated bidding strategy
   * that sets bids to achieve a chosen percentage of impressions.
   */
  targetImpressionShare?: GoogleAdsSearchads360V0Common__TargetImpressionShare;
  /**
   * Standard Target ROAS bidding strategy that automatically maximizes revenue
   * while averaging a specific target return on ad spend (ROAS).
   */
  targetRoas?: GoogleAdsSearchads360V0Common__TargetRoas;
  /**
   * Standard Target Spend bidding strategy that automatically sets your bids
   * to help get as many clicks as possible within your budget.
   */
  targetSpend?: GoogleAdsSearchads360V0Common__TargetSpend;
  /**
   * Output only. Campaign-level settings for tracking information.
   */
  readonly trackingSetting?: GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting;
  /**
   * The URL template for constructing a tracking URL.
   */
  trackingUrlTemplate?: string;
  /**
   * The list of mappings used to substitute custom parameter tags in a
   * `tracking_url_template`, `final_urls`, or `mobile_final_urls`.
   */
  urlCustomParameters?: GoogleAdsSearchads360V0Common__CustomParameter[];
  /**
   * Represents opting out of URL expansion to more targeted URLs. If opted out
   * (true), only the final URLs in the asset group or URLs specified in the
   * advertiser's Google Merchant Center or business data feeds are targeted. If
   * opted in (false), the entire domain will be targeted. This field can only
   * be set for Performance Max campaigns, where the default value is false.
   */
  urlExpansionOptOut?: boolean;
}

function serializeGoogleAdsSearchads360V0Resources__Campaign(data: any): GoogleAdsSearchads360V0Resources__Campaign {
  return {
    ...data,
    maximizeConversions: data["maximizeConversions"] !== undefined ? serializeGoogleAdsSearchads360V0Common__MaximizeConversions(data["maximizeConversions"]) : undefined,
    maximizeConversionValue: data["maximizeConversionValue"] !== undefined ? serializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data["maximizeConversionValue"]) : undefined,
    percentCpc: data["percentCpc"] !== undefined ? serializeGoogleAdsSearchads360V0Common__PercentCpc(data["percentCpc"]) : undefined,
    shoppingSetting: data["shoppingSetting"] !== undefined ? serializeGoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting(data["shoppingSetting"]) : undefined,
    targetCpa: data["targetCpa"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetCpa(data["targetCpa"]) : undefined,
    targetImpressionShare: data["targetImpressionShare"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data["targetImpressionShare"]) : undefined,
    targetRoas: data["targetRoas"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetRoas(data["targetRoas"]) : undefined,
    targetSpend: data["targetSpend"] !== undefined ? serializeGoogleAdsSearchads360V0Common__TargetSpend(data["targetSpend"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__Campaign(data: any): GoogleAdsSearchads360V0Resources__Campaign {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    maximizeConversions: data["maximizeConversions"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__MaximizeConversions(data["maximizeConversions"]) : undefined,
    maximizeConversionValue: data["maximizeConversionValue"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__MaximizeConversionValue(data["maximizeConversionValue"]) : undefined,
    percentCpc: data["percentCpc"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__PercentCpc(data["percentCpc"]) : undefined,
    shoppingSetting: data["shoppingSetting"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting(data["shoppingSetting"]) : undefined,
    targetCpa: data["targetCpa"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetCpa(data["targetCpa"]) : undefined,
    targetImpressionShare: data["targetImpressionShare"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetImpressionShare(data["targetImpressionShare"]) : undefined,
    targetRoas: data["targetRoas"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetRoas(data["targetRoas"]) : undefined,
    targetSpend: data["targetSpend"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__TargetSpend(data["targetSpend"]) : undefined,
  };
}

/**
 * A campaign budget.
 */
export interface GoogleAdsSearchads360V0Resources__CampaignBudget {
  /**
   * The amount of the budget, in the local currency for the account. Amount is
   * specified in micros, where one million is equivalent to one currency unit.
   * Monthly spend is capped at 30.4 times this amount.
   */
  amountMicros?: bigint;
  /**
   * The delivery method that determines the rate at which the campaign budget
   * is spent. Defaults to STANDARD if unspecified in a create operation.
   */
  deliveryMethod?:  | "UNSPECIFIED" | "UNKNOWN" | "STANDARD" | "ACCELERATED";
  /**
   * Immutable. Period over which to spend the budget. Defaults to DAILY if not
   * specified.
   */
  period?:  | "UNSPECIFIED" | "UNKNOWN" | "DAILY" | "FIXED_DAILY" | "CUSTOM_PERIOD";
  /**
   * Immutable. The resource name of the campaign budget. Campaign budget
   * resource names have the form:
   * `customers/{customer_id}/campaignBudgets/{campaign_budget_id}`
   */
  resourceName?: string;
}

function serializeGoogleAdsSearchads360V0Resources__CampaignBudget(data: any): GoogleAdsSearchads360V0Resources__CampaignBudget {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__CampaignBudget(data: any): GoogleAdsSearchads360V0Resources__CampaignBudget {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
  };
}

/**
 * A campaign criterion.
 */
export interface GoogleAdsSearchads360V0Resources__CampaignCriterion {
  /**
   * The modifier for the bids when the criterion matches. The modifier must be
   * in the range: 0.1 - 10.0. Most targetable criteria types support modifiers.
   * Use 0 to opt out of a Device type.
   */
  bidModifier?: number;
  /**
   * Output only. The ID of the criterion. This field is ignored during mutate.
   */
  readonly criterionId?: bigint;
  /**
   * Immutable. Device.
   */
  device?: GoogleAdsSearchads360V0Common__DeviceInfo;
  /**
   * Output only. The display name of the criterion. This field is ignored for
   * mutates.
   */
  readonly displayName?: string;
  /**
   * Immutable. Language.
   */
  language?: GoogleAdsSearchads360V0Common__LanguageInfo;
  /**
   * Immutable. Location.
   */
  location?: GoogleAdsSearchads360V0Common__LocationInfo;
  /**
   * Immutable. Location Group
   */
  locationGroup?: GoogleAdsSearchads360V0Common__LocationGroupInfo;
  /**
   * Immutable. Whether to target (`false`) or exclude (`true`) the criterion.
   */
  negative?: boolean;
  /**
   * Immutable. The resource name of the campaign criterion. Campaign criterion
   * resource names have the form:
   * `customers/{customer_id}/campaignCriteria/{campaign_id}~{criterion_id}`
   */
  resourceName?: string;
  /**
   * Output only. The type of the criterion.
   */
  readonly type?:  | "UNSPECIFIED" | "UNKNOWN" | "KEYWORD" | "PLACEMENT" | "MOBILE_APP_CATEGORY" | "MOBILE_APPLICATION" | "DEVICE" | "LOCATION" | "LISTING_GROUP" | "AD_SCHEDULE" | "AGE_RANGE" | "GENDER" | "INCOME_RANGE" | "PARENTAL_STATUS" | "YOUTUBE_VIDEO" | "YOUTUBE_CHANNEL" | "USER_LIST" | "PROXIMITY" | "TOPIC" | "LISTING_SCOPE" | "LANGUAGE" | "IP_BLOCK" | "CONTENT_LABEL" | "CARRIER" | "USER_INTEREST" | "WEBPAGE" | "OPERATING_SYSTEM_VERSION" | "APP_PAYMENT_MODEL" | "MOBILE_DEVICE" | "CUSTOM_AFFINITY" | "CUSTOM_INTENT" | "LOCATION_GROUP" | "CUSTOM_AUDIENCE" | "COMBINED_AUDIENCE" | "KEYWORD_THEME" | "AUDIENCE" | "LOCAL_SERVICE_ID";
}

function serializeGoogleAdsSearchads360V0Resources__CampaignCriterion(data: any): GoogleAdsSearchads360V0Resources__CampaignCriterion {
  return {
    ...data,
    locationGroup: data["locationGroup"] !== undefined ? serializeGoogleAdsSearchads360V0Common__LocationGroupInfo(data["locationGroup"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__CampaignCriterion(data: any): GoogleAdsSearchads360V0Resources__CampaignCriterion {
  return {
    ...data,
    criterionId: data["criterionId"] !== undefined ? BigInt(data["criterionId"]) : undefined,
    locationGroup: data["locationGroup"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__LocationGroupInfo(data["locationGroup"]) : undefined,
  };
}

/**
 * A conversion action.
 */
export interface GoogleAdsSearchads360V0Resources__ConversionAction {
  /**
   * App ID for an app conversion action.
   */
  appId?: string;
  /**
   * Settings related to this conversion action's attribution model.
   */
  attributionModelSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings;
  /**
   * The category of conversions reported for this conversion action.
   */
  category?:  | "UNSPECIFIED" | "UNKNOWN" | "DEFAULT" | "PAGE_VIEW" | "PURCHASE" | "SIGNUP" | "LEAD" | "DOWNLOAD" | "ADD_TO_CART" | "BEGIN_CHECKOUT" | "SUBSCRIBE_PAID" | "PHONE_CALL_LEAD" | "IMPORTED_LEAD" | "SUBMIT_LEAD_FORM" | "BOOK_APPOINTMENT" | "REQUEST_QUOTE" | "GET_DIRECTIONS" | "OUTBOUND_CLICK" | "CONTACT" | "ENGAGEMENT" | "STORE_VISIT" | "STORE_SALE" | "QUALIFIED_LEAD" | "CONVERTED_LEAD";
  /**
   * The maximum number of days that may elapse between an interaction (for
   * example, a click) and a conversion event.
   */
  clickThroughLookbackWindowDays?: bigint;
  /**
   * Output only. Timestamp of the Floodlight activity's creation, formatted in
   * ISO 8601.
   */
  readonly creationTime?: string;
  /**
   * Output only. Floodlight settings for Floodlight conversion types.
   */
  readonly floodlightSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings;
  /**
   * Output only. The ID of the conversion action.
   */
  readonly id?: bigint;
  /**
   * Whether this conversion action should be included in the
   * "client_account_conversions" metric.
   */
  includeInClientAccountConversionsMetric?: boolean;
  /**
   * Output only. Whether this conversion action should be included in the
   * "conversions" metric.
   */
  readonly includeInConversionsMetric?: boolean;
  /**
   * The name of the conversion action. This field is required and should not
   * be empty when creating new conversion actions.
   */
  name?: string;
  /**
   * Output only. The resource name of the conversion action owner customer, or
   * null if this is a system-defined conversion action.
   */
  readonly ownerCustomer?: string;
  /**
   * If a conversion action's primary_for_goal bit is false, the conversion
   * action is non-biddable for all campaigns regardless of their customer
   * conversion goal or campaign conversion goal. However, custom conversion
   * goals do not respect primary_for_goal, so if a campaign has a custom
   * conversion goal configured with a primary_for_goal = false conversion
   * action, that conversion action is still biddable. By default,
   * primary_for_goal will be true if not set. In V9, primary_for_goal can only
   * be set to false after creation through an 'update' operation because it's
   * not declared as optional.
   */
  primaryForGoal?: boolean;
  /**
   * Immutable. The resource name of the conversion action. Conversion action
   * resource names have the form:
   * `customers/{customer_id}/conversionActions/{conversion_action_id}`
   */
  resourceName?: string;
  /**
   * The status of this conversion action for conversion event accrual.
   */
  status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "REMOVED" | "HIDDEN";
  /**
   * Immutable. The type of this conversion action.
   */
  type?:  | "UNSPECIFIED" | "UNKNOWN" | "AD_CALL" | "CLICK_TO_CALL" | "GOOGLE_PLAY_DOWNLOAD" | "GOOGLE_PLAY_IN_APP_PURCHASE" | "UPLOAD_CALLS" | "UPLOAD_CLICKS" | "WEBPAGE" | "WEBSITE_CALL" | "STORE_SALES_DIRECT_UPLOAD" | "STORE_SALES" | "FIREBASE_ANDROID_FIRST_OPEN" | "FIREBASE_ANDROID_IN_APP_PURCHASE" | "FIREBASE_ANDROID_CUSTOM" | "FIREBASE_IOS_FIRST_OPEN" | "FIREBASE_IOS_IN_APP_PURCHASE" | "FIREBASE_IOS_CUSTOM" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_FIRST_OPEN" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_IN_APP_PURCHASE" | "THIRD_PARTY_APP_ANALYTICS_ANDROID_CUSTOM" | "THIRD_PARTY_APP_ANALYTICS_IOS_FIRST_OPEN" | "THIRD_PARTY_APP_ANALYTICS_IOS_IN_APP_PURCHASE" | "THIRD_PARTY_APP_ANALYTICS_IOS_CUSTOM" | "ANDROID_APP_PRE_REGISTRATION" | "ANDROID_INSTALLS_ALL_OTHER_APPS" | "FLOODLIGHT_ACTION" | "FLOODLIGHT_TRANSACTION" | "GOOGLE_HOSTED" | "LEAD_FORM_SUBMIT" | "SALESFORCE" | "SEARCH_ADS_360" | "SMART_CAMPAIGN_AD_CLICKS_TO_CALL" | "SMART_CAMPAIGN_MAP_CLICKS_TO_CALL" | "SMART_CAMPAIGN_MAP_DIRECTIONS" | "SMART_CAMPAIGN_TRACKED_CALLS" | "STORE_VISITS";
  /**
   * Settings related to the value for conversion events associated with this
   * conversion action.
   */
  valueSettings?: GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings;
}

function serializeGoogleAdsSearchads360V0Resources__ConversionAction(data: any): GoogleAdsSearchads360V0Resources__ConversionAction {
  return {
    ...data,
    clickThroughLookbackWindowDays: data["clickThroughLookbackWindowDays"] !== undefined ? String(data["clickThroughLookbackWindowDays"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources__ConversionAction(data: any): GoogleAdsSearchads360V0Resources__ConversionAction {
  return {
    ...data,
    clickThroughLookbackWindowDays: data["clickThroughLookbackWindowDays"] !== undefined ? BigInt(data["clickThroughLookbackWindowDays"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * A collection of customer-wide settings related to Search Ads 360 Conversion
 * Tracking.
 */
export interface GoogleAdsSearchads360V0Resources__ConversionTrackingSetting {
  /**
   * Output only. Whether the customer has accepted customer data terms. If
   * using cross-account conversion tracking, this value is inherited from the
   * manager. This field is read-only. For more information, see
   * https://support.google.com/adspolicy/answer/7475709.
   */
  readonly acceptedCustomerDataTerms?: boolean;
  /**
   * Output only. The conversion tracking id used for this account. This id
   * doesn't indicate whether the customer uses conversion tracking
   * (conversion_tracking_status does). This field is read-only.
   */
  readonly conversionTrackingId?: bigint;
  /**
   * Output only. Conversion tracking status. It indicates whether the customer
   * is using conversion tracking, and who is the conversion tracking owner of
   * this customer. If this customer is using cross-account conversion tracking,
   * the value returned will differ based on the `login-customer-id` of the
   * request.
   */
  readonly conversionTrackingStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "NOT_CONVERSION_TRACKED" | "CONVERSION_TRACKING_MANAGED_BY_SELF" | "CONVERSION_TRACKING_MANAGED_BY_THIS_MANAGER" | "CONVERSION_TRACKING_MANAGED_BY_ANOTHER_MANAGER";
  /**
   * Output only. The conversion tracking id of the customer's manager. This is
   * set when the customer is opted into cross-account conversion tracking, and
   * it overrides conversion_tracking_id.
   */
  readonly crossAccountConversionTrackingId?: bigint;
  /**
   * Output only. Whether the customer is opted-in for enhanced conversions for
   * leads. If using cross-account conversion tracking, this value is inherited
   * from the manager. This field is read-only.
   */
  readonly enhancedConversionsForLeadsEnabled?: boolean;
  /**
   * Output only. The resource name of the customer where conversions are
   * created and managed. This field is read-only.
   */
  readonly googleAdsConversionCustomer?: string;
  /**
   * Output only. The conversion tracking id of the customer's manager. This is
   * set when the customer is opted into conversion tracking, and it overrides
   * conversion_tracking_id. This field can only be managed through the Google
   * Ads UI. This field is read-only.
   */
  readonly googleAdsCrossAccountConversionTrackingId?: bigint;
}

/**
 * A custom column. See Search Ads 360 custom column at
 * https://support.google.com/sa360/answer/9633916
 */
export interface GoogleAdsSearchads360V0Resources__CustomColumn {
  /**
   * Output only. User-defined description of the custom column.
   */
  readonly description?: string;
  /**
   * Output only. ID of the custom column.
   */
  readonly id?: bigint;
  /**
   * Output only. User-defined name of the custom column.
   */
  readonly name?: string;
  /**
   * Output only. True when the custom column is available to be used in the
   * query of SearchAds360Service.Search and SearchAds360Service.SearchStream.
   */
  readonly queryable?: boolean;
  /**
   * Output only. The list of the referenced system columns of this custom
   * column. For example, A custom column "sum of impressions and clicks" has
   * referenced system columns of {"metrics.clicks", "metrics.impressions"}.
   */
  readonly referencedSystemColumns?: string[];
  /**
   * Output only. True when the custom column is referring to one or more
   * attributes.
   */
  readonly referencesAttributes?: boolean;
  /**
   * Output only. True when the custom column is referring to one or more
   * metrics.
   */
  readonly referencesMetrics?: boolean;
  /**
   * Immutable. The resource name of the custom column. Custom column resource
   * names have the form:
   * `customers/{customer_id}/customColumns/{custom_column_id}`
   */
  resourceName?: string;
  /**
   * Output only. The type of the result value of the custom column.
   */
  readonly valueType?:  | "UNSPECIFIED" | "UNKNOWN" | "STRING" | "INT64" | "DOUBLE" | "BOOLEAN";
}

/**
 * A customer.
 */
export interface GoogleAdsSearchads360V0Resources__Customer {
  /**
   * Output only. Account status, for example, Enabled, Paused, Removed, etc.
   */
  readonly accountStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "SUSPENDED" | "REMOVED" | "DRAFT";
  /**
   * Output only. Engine account type, for example, Google Ads, Microsoft
   * Advertising, Yahoo Japan, Baidu, Facebook, Engine Track, etc.
   */
  readonly accountType?:  | "UNSPECIFIED" | "UNKNOWN" | "BAIDU" | "ENGINE_TRACK" | "FACEBOOK" | "FACEBOOK_GATEWAY" | "GOOGLE_ADS" | "MICROSOFT" | "SEARCH_ADS_360" | "YAHOO_JAPAN";
  /**
   * Whether auto-tagging is enabled for the customer.
   */
  autoTaggingEnabled?: boolean;
  /**
   * Output only. Conversion tracking setting for a customer.
   */
  readonly conversionTrackingSetting?: GoogleAdsSearchads360V0Resources__ConversionTrackingSetting;
  /**
   * Immutable. The currency in which the account operates. A subset of the
   * currency codes from the ISO 4217 standard is supported.
   */
  currencyCode?: string;
  /**
   * Optional, non-unique descriptive name of the customer.
   */
  descriptiveName?: string;
  /**
   * Output only. DoubleClick Campaign Manager (DCM) setting for a manager
   * customer.
   */
  readonly doubleClickCampaignManagerSetting?: GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting;
  /**
   * Output only. ID of the account in the external engine account.
   */
  readonly engineId?: string;
  /**
   * The URL template for appending params to the final URL
   */
  finalUrlSuffix?: string;
  /**
   * Output only. The ID of the customer.
   */
  readonly id?: bigint;
  /**
   * Output only. The datetime when this customer was last modified. The
   * datetime is in the customer's time zone and in "yyyy-MM-dd HH:mm:ss.ssssss"
   * format.
   */
  readonly lastModifiedTime?: string;
  /**
   * Output only. Whether the customer is a manager.
   */
  readonly manager?: boolean;
  /**
   * Immutable. The resource name of the customer. Customer resource names have
   * the form: `customers/{customer_id}`
   */
  resourceName?: string;
  /**
   * Output only. The status of the customer.
   */
  readonly status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "CANCELED" | "SUSPENDED" | "CLOSED";
  /**
   * Immutable. The local timezone ID of the customer.
   */
  timeZone?: string;
  /**
   * The URL template for constructing a tracking URL out of parameters.
   */
  trackingUrlTemplate?: string;
}

/**
 * A link between the given customer and a client customer. CustomerClients
 * only exist for manager customers. All direct and indirect client customers
 * are included, as well as the manager itself.
 */
export interface GoogleAdsSearchads360V0Resources__CustomerClient {
  /**
   * Output only. The resource names of the labels owned by the requesting
   * customer that are applied to the client customer. Label resource names have
   * the form: `customers/{customer_id}/labels/{label_id}`
   */
  readonly appliedLabels?: string[];
  /**
   * Output only. The resource name of the client-customer which is linked to
   * the given customer. Read only.
   */
  readonly clientCustomer?: string;
  /**
   * Output only. Currency code (for example, 'USD', 'EUR') for the client.
   * Read only.
   */
  readonly currencyCode?: string;
  /**
   * Output only. Descriptive name for the client. Read only.
   */
  readonly descriptiveName?: string;
  /**
   * Output only. Specifies whether this is a hidden account. Read only.
   */
  readonly hidden?: boolean;
  /**
   * Output only. The ID of the client customer. Read only.
   */
  readonly id?: bigint;
  /**
   * Output only. Distance between given customer and client. For self link,
   * the level value will be 0. Read only.
   */
  readonly level?: bigint;
  /**
   * Output only. Identifies if the client is a manager. Read only.
   */
  readonly manager?: boolean;
  /**
   * Output only. The resource name of the customer client. CustomerClient
   * resource names have the form:
   * `customers/{customer_id}/customerClients/{client_customer_id}`
   */
  readonly resourceName?: string;
  /**
   * Output only. The status of the client customer. Read only.
   */
  readonly status?:  | "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "CANCELED" | "SUSPENDED" | "CLOSED";
  /**
   * Output only. Identifies if the client is a test account. Read only.
   */
  readonly testAccount?: boolean;
  /**
   * Output only. Common Locale Data Repository (CLDR) string representation of
   * the time zone of the client, for example, America/Los_Angeles. Read only.
   */
  readonly timeZone?: string;
}

/**
 * Represents customer-manager link relationship.
 */
export interface GoogleAdsSearchads360V0Resources__CustomerManagerLink {
  /**
   * Output only. The manager customer linked to the customer.
   */
  readonly managerCustomer?: string;
  /**
   * Output only. ID of the customer-manager link. This field is read only.
   */
  readonly managerLinkId?: bigint;
  /**
   * Immutable. Name of the resource. CustomerManagerLink resource names have
   * the form:
   * `customers/{customer_id}/customerManagerLinks/{manager_customer_id}~{manager_link_id}`
   */
  resourceName?: string;
  /**
   * Status of the link between the customer and the manager.
   */
  status?:  | "UNSPECIFIED" | "UNKNOWN" | "ACTIVE" | "INACTIVE" | "PENDING" | "REFUSED" | "CANCELED";
}

/**
 * DoubleClick Campaign Manager (DCM) setting for a manager customer.
 */
export interface GoogleAdsSearchads360V0Resources__DoubleClickCampaignManagerSetting {
  /**
   * Output only. ID of the Campaign Manager advertiser associated with this
   * customer.
   */
  readonly advertiserId?: bigint;
  /**
   * Output only. ID of the Campaign Manager network associated with this
   * customer.
   */
  readonly networkId?: bigint;
  /**
   * Output only. Time zone of the Campaign Manager network associated with
   * this customer in IANA Time Zone Database format, such as America/New_York.
   */
  readonly timeZone?: string;
}

/**
 * A keyword view.
 */
export interface GoogleAdsSearchads360V0Resources__KeywordView {
  /**
   * Output only. The resource name of the keyword view. Keyword view resource
   * names have the form:
   * `customers/{customer_id}/keywordViews/{ad_group_id}~{criterion_id}`
   */
  readonly resourceName?: string;
}

/**
 * A product group view.
 */
export interface GoogleAdsSearchads360V0Resources__ProductGroupView {
  /**
   * Output only. The resource name of the product group view. Product group
   * view resource names have the form:
   * `customers/{customer_id}/productGroupViews/{ad_group_id}~{criterion_id}`
   */
  readonly resourceName?: string;
}

/**
 * A field or resource (artifact) used by SearchAds360Service.
 */
export interface GoogleAdsSearchads360V0Resources__SearchAds360Field {
  /**
   * Output only. The names of all resources that are selectable with the
   * described artifact. Fields from these resources do not segment metrics when
   * included in search queries. This field is only set for artifacts whose
   * category is RESOURCE.
   */
  readonly attributeResources?: string[];
  /**
   * Output only. The category of the artifact.
   */
  readonly category?:  | "UNSPECIFIED" | "UNKNOWN" | "RESOURCE" | "ATTRIBUTE" | "SEGMENT" | "METRIC";
  /**
   * Output only. This field determines the operators that can be used with the
   * artifact in WHERE clauses.
   */
  readonly dataType?:  | "UNSPECIFIED" | "UNKNOWN" | "BOOLEAN" | "DATE" | "DOUBLE" | "ENUM" | "FLOAT" | "INT32" | "INT64" | "MESSAGE" | "RESOURCE_NAME" | "STRING" | "UINT64";
  /**
   * Output only. Values the artifact can assume if it is a field of type ENUM.
   * This field is only set for artifacts of category SEGMENT or ATTRIBUTE.
   */
  readonly enumValues?: string[];
  /**
   * Output only. Whether the artifact can be used in a WHERE clause in search
   * queries.
   */
  readonly filterable?: boolean;
  /**
   * Output only. Whether the field artifact is repeated.
   */
  readonly isRepeated?: boolean;
  /**
   * Output only. This field lists the names of all metrics that are selectable
   * with the described artifact when it is used in the FROM clause. It is only
   * set for artifacts whose category is RESOURCE.
   */
  readonly metrics?: string[];
  /**
   * Output only. The name of the artifact.
   */
  readonly name?: string;
  /**
   * Output only. The resource name of the artifact. Artifact resource names
   * have the form: `SearchAds360Fields/{name}`
   */
  readonly resourceName?: string;
  /**
   * Output only. This field lists the names of all artifacts, whether a
   * segment or another resource, that segment metrics when included in search
   * queries and when the described artifact is used in the FROM clause. It is
   * only set for artifacts whose category is RESOURCE.
   */
  readonly segments?: string[];
  /**
   * Output only. Whether the artifact can be used in a SELECT clause in search
   * queries.
   */
  readonly selectable?: boolean;
  /**
   * Output only. The names of all resources, segments, and metrics that are
   * selectable with the described artifact.
   */
  readonly selectableWith?: string[];
  /**
   * Output only. Whether the artifact can be used in a ORDER BY clause in
   * search queries.
   */
  readonly sortable?: boolean;
  /**
   * Output only. The URL of proto describing the artifact's data type.
   */
  readonly typeUrl?: string;
}

/**
 * A container for ad group criterion quality information.
 */
export interface GoogleAdsSearchads360V0Resources_AdGroupCriterion_QualityInfo {
  /**
   * Output only. The quality score. This field may not be populated if Google
   * does not have enough information to determine a value.
   */
  readonly qualityScore?: number;
}

/**
 * The setting for controlling Dynamic Search Ads (DSA).
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_DynamicSearchAdsSetting {
  /**
   * Required. The Internet domain name that this setting represents, for
   * example, "google.com" or "www.google.com".
   */
  domainName?: string;
  /**
   * Required. The language code specifying the language of the domain, for
   * example, "en".
   */
  languageCode?: string;
  /**
   * Whether the campaign uses advertiser supplied URLs exclusively.
   */
  useSuppliedUrlsOnly?: boolean;
}

/**
 * Represents a collection of settings related to ads geotargeting.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_GeoTargetTypeSetting {
  /**
   * The setting used for negative geotargeting in this particular campaign.
   */
  negativeGeoTargetType?:  | "UNSPECIFIED" | "UNKNOWN" | "PRESENCE_OR_INTEREST" | "PRESENCE";
  /**
   * The setting used for positive geotargeting in this particular campaign.
   */
  positiveGeoTargetType?:  | "UNSPECIFIED" | "UNKNOWN" | "PRESENCE_OR_INTEREST" | "SEARCH_INTEREST" | "PRESENCE";
}

/**
 * The network settings for the campaign.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_NetworkSettings {
  /**
   * Whether ads will be served on specified placements in the Google Display
   * Network. Placements are specified using the Placement criterion.
   */
  targetContentNetwork?: boolean;
  /**
   * Whether ads will be served with google.com search results.
   */
  targetGoogleSearch?: boolean;
  /**
   * Whether ads will be served on the Google Partner Network. This is
   * available only to some select Google partner accounts.
   */
  targetPartnerSearchNetwork?: boolean;
  /**
   * Whether ads will be served on partner sites in the Google Search Network
   * (requires `target_google_search` to also be `true`).
   */
  targetSearchNetwork?: boolean;
}

/**
 * Optimization goal setting for this campaign, which includes a set of
 * optimization goal types.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_OptimizationGoalSetting {
  /**
   * The list of optimization goal types.
   */
  optimizationGoalTypes?:  | "UNSPECIFIED" | "UNKNOWN" | "CALL_CLICKS" | "DRIVING_DIRECTIONS" | "APP_PRE_REGISTRATION"[];
}

/**
 * Selective optimization setting for this campaign, which includes a set of
 * conversion actions to optimize this campaign towards.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_SelectiveOptimization {
  /**
   * The selected set of conversion actions for optimizing this campaign.
   */
  conversionActions?: string[];
}

/**
 * The setting for Shopping campaigns. Defines the universe of products that
 * can be advertised by the campaign, and how this campaign interacts with other
 * Shopping campaigns.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting {
  /**
   * Priority of the campaign. Campaigns with numerically higher priorities
   * take precedence over those with lower priorities. This field is required
   * for Shopping campaigns, with values between 0 and 2, inclusive. This field
   * is optional for Smart Shopping campaigns, but must be equal to 3 if set.
   */
  campaignPriority?: number;
  /**
   * Whether to include local products.
   */
  enableLocal?: boolean;
  /**
   * Feed label of products to include in the campaign. Only one of feed_label
   * or sales_country can be set. If used instead of sales_country, the
   * feed_label field accepts country codes in the same format for example:
   * 'XX'. Otherwise can be any string used for feed label in Google Merchant
   * Center.
   */
  feedLabel?: string;
  /**
   * Immutable. ID of the Merchant Center account. This field is required for
   * create operations. This field is immutable for Shopping campaigns.
   */
  merchantId?: bigint;
  /**
   * Sales country of products to include in the campaign.
   */
  salesCountry?: string;
  /**
   * Immutable. Whether to target Vehicle Listing inventory.
   */
  useVehicleInventory?: boolean;
}

function serializeGoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting(data: any): GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting(data: any): GoogleAdsSearchads360V0Resources_Campaign_ShoppingSetting {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * Campaign-level settings for tracking information.
 */
export interface GoogleAdsSearchads360V0Resources_Campaign_TrackingSetting {
  /**
   * Output only. The url used for dynamic tracking.
   */
  readonly trackingUrl?: string;
}

/**
 * Settings related to this conversion action's attribution model.
 */
export interface GoogleAdsSearchads360V0Resources_ConversionAction_AttributionModelSettings {
  /**
   * The attribution model type of this conversion action.
   */
  attributionModel?:  | "UNSPECIFIED" | "UNKNOWN" | "EXTERNAL" | "GOOGLE_ADS_LAST_CLICK" | "GOOGLE_SEARCH_ATTRIBUTION_FIRST_CLICK" | "GOOGLE_SEARCH_ATTRIBUTION_LINEAR" | "GOOGLE_SEARCH_ATTRIBUTION_TIME_DECAY" | "GOOGLE_SEARCH_ATTRIBUTION_POSITION_BASED" | "GOOGLE_SEARCH_ATTRIBUTION_DATA_DRIVEN";
  /**
   * Output only. The status of the data-driven attribution model for the
   * conversion action.
   */
  readonly dataDrivenModelStatus?:  | "UNSPECIFIED" | "UNKNOWN" | "AVAILABLE" | "STALE" | "EXPIRED" | "NEVER_GENERATED";
}

/**
 * Settings related to a Floodlight conversion action.
 */
export interface GoogleAdsSearchads360V0Resources_ConversionAction_FloodlightSettings {
  /**
   * Output only. String used to identify a Floodlight activity group when
   * reporting conversions.
   */
  readonly activityGroupTag?: string;
  /**
   * Output only. ID of the Floodlight activity in DoubleClick Campaign Manager
   * (DCM).
   */
  readonly activityId?: bigint;
  /**
   * Output only. String used to identify a Floodlight activity when reporting
   * conversions.
   */
  readonly activityTag?: string;
}

/**
 * Settings related to the value for conversion events associated with this
 * conversion action.
 */
export interface GoogleAdsSearchads360V0Resources_ConversionAction_ValueSettings {
  /**
   * Controls whether the default value and default currency code are used in
   * place of the value and currency code specified in conversion events for
   * this conversion action.
   */
  alwaysUseDefaultValue?: boolean;
  /**
   * The currency code to use when conversion events for this conversion action
   * are sent with an invalid or missing currency code, or when this conversion
   * action is configured to always use the default value.
   */
  defaultCurrencyCode?: string;
  /**
   * The value to use when conversion events for this conversion action are
   * sent with an invalid, disallowed or missing value, or when this conversion
   * action is configured to always use the default value.
   */
  defaultValue?: number;
}

/**
 * Message for custom column header.
 */
export interface GoogleAdsSearchads360V0Services__CustomColumnHeader {
  /**
   * The custom column ID.
   */
  id?: bigint;
  /**
   * The user defined name of the custom column.
   */
  name?: string;
  /**
   * True when the custom column references metrics.
   */
  referencesMetrics?: boolean;
}

function serializeGoogleAdsSearchads360V0Services__CustomColumnHeader(data: any): GoogleAdsSearchads360V0Services__CustomColumnHeader {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Services__CustomColumnHeader(data: any): GoogleAdsSearchads360V0Services__CustomColumnHeader {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Response message for fetching all custom columns associated with a customer.
 */
export interface GoogleAdsSearchads360V0Services__ListCustomColumnsResponse {
  /**
   * The CustomColumns owned by the provided customer.
   */
  customColumns?: GoogleAdsSearchads360V0Resources__CustomColumn[];
}

/**
 * A returned row from the query.
 */
export interface GoogleAdsSearchads360V0Services__SearchAds360Row {
  /**
   * The ad group referenced in the query.
   */
  adGroup?: GoogleAdsSearchads360V0Resources__AdGroup;
  /**
   * The bid modifier referenced in the query.
   */
  adGroupBidModifier?: GoogleAdsSearchads360V0Resources__AdGroupBidModifier;
  /**
   * The criterion referenced in the query.
   */
  adGroupCriterion?: GoogleAdsSearchads360V0Resources__AdGroupCriterion;
  /**
   * The bidding strategy referenced in the query.
   */
  biddingStrategy?: GoogleAdsSearchads360V0Resources__BiddingStrategy;
  /**
   * The campaign referenced in the query.
   */
  campaign?: GoogleAdsSearchads360V0Resources__Campaign;
  /**
   * The campaign budget referenced in the query.
   */
  campaignBudget?: GoogleAdsSearchads360V0Resources__CampaignBudget;
  /**
   * The campaign criterion referenced in the query.
   */
  campaignCriterion?: GoogleAdsSearchads360V0Resources__CampaignCriterion;
  /**
   * The conversion action referenced in the query.
   */
  conversionAction?: GoogleAdsSearchads360V0Resources__ConversionAction;
  /**
   * The custom columns.
   */
  customColumns?: GoogleAdsSearchads360V0Common__Value[];
  /**
   * The customer referenced in the query.
   */
  customer?: GoogleAdsSearchads360V0Resources__Customer;
  /**
   * The CustomerClient referenced in the query.
   */
  customerClient?: GoogleAdsSearchads360V0Resources__CustomerClient;
  /**
   * The CustomerManagerLink referenced in the query.
   */
  customerManagerLink?: GoogleAdsSearchads360V0Resources__CustomerManagerLink;
  /**
   * The keyword view referenced in the query.
   */
  keywordView?: GoogleAdsSearchads360V0Resources__KeywordView;
  /**
   * The metrics.
   */
  metrics?: GoogleAdsSearchads360V0Common__Metrics;
  /**
   * The product group view referenced in the query.
   */
  productGroupView?: GoogleAdsSearchads360V0Resources__ProductGroupView;
  /**
   * The segments.
   */
  segments?: GoogleAdsSearchads360V0Common__Segments;
}

function serializeGoogleAdsSearchads360V0Services__SearchAds360Row(data: any): GoogleAdsSearchads360V0Services__SearchAds360Row {
  return {
    ...data,
    adGroup: data["adGroup"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__AdGroup(data["adGroup"]) : undefined,
    adGroupCriterion: data["adGroupCriterion"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__AdGroupCriterion(data["adGroupCriterion"]) : undefined,
    biddingStrategy: data["biddingStrategy"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__BiddingStrategy(data["biddingStrategy"]) : undefined,
    campaign: data["campaign"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__Campaign(data["campaign"]) : undefined,
    campaignBudget: data["campaignBudget"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__CampaignBudget(data["campaignBudget"]) : undefined,
    campaignCriterion: data["campaignCriterion"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__CampaignCriterion(data["campaignCriterion"]) : undefined,
    conversionAction: data["conversionAction"] !== undefined ? serializeGoogleAdsSearchads360V0Resources__ConversionAction(data["conversionAction"]) : undefined,
    customColumns: data["customColumns"] !== undefined ? data["customColumns"].map((item: any) => (serializeGoogleAdsSearchads360V0Common__Value(item))) : undefined,
    metrics: data["metrics"] !== undefined ? serializeGoogleAdsSearchads360V0Common__Metrics(data["metrics"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Services__SearchAds360Row(data: any): GoogleAdsSearchads360V0Services__SearchAds360Row {
  return {
    ...data,
    adGroup: data["adGroup"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__AdGroup(data["adGroup"]) : undefined,
    adGroupCriterion: data["adGroupCriterion"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__AdGroupCriterion(data["adGroupCriterion"]) : undefined,
    biddingStrategy: data["biddingStrategy"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__BiddingStrategy(data["biddingStrategy"]) : undefined,
    campaign: data["campaign"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__Campaign(data["campaign"]) : undefined,
    campaignBudget: data["campaignBudget"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__CampaignBudget(data["campaignBudget"]) : undefined,
    campaignCriterion: data["campaignCriterion"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__CampaignCriterion(data["campaignCriterion"]) : undefined,
    conversionAction: data["conversionAction"] !== undefined ? deserializeGoogleAdsSearchads360V0Resources__ConversionAction(data["conversionAction"]) : undefined,
    customColumns: data["customColumns"] !== undefined ? data["customColumns"].map((item: any) => (deserializeGoogleAdsSearchads360V0Common__Value(item))) : undefined,
    metrics: data["metrics"] !== undefined ? deserializeGoogleAdsSearchads360V0Common__Metrics(data["metrics"]) : undefined,
  };
}

/**
 * Request message for SearchAds360FieldService.SearchSearchAds360Fields.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsRequest {
  /**
   * Number of elements to retrieve in a single page. When too large a page is
   * requested, the server may decide to further limit the number of returned
   * resources.
   */
  pageSize?: number;
  /**
   * Token of the page to retrieve. If not specified, the first page of results
   * will be returned. Use the value obtained from `next_page_token` in the
   * previous response in order to request the next page of results.
   */
  pageToken?: string;
  /**
   * Required. The query string.
   */
  query?: string;
}

/**
 * Response message for SearchAds360FieldService.SearchSearchAds360Fields.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse {
  /**
   * Pagination token used to retrieve the next page of results. Pass the
   * content of this string as the `page_token` attribute of the next request.
   * `next_page_token` is not returned for the last page.
   */
  nextPageToken?: string;
  /**
   * The list of fields that matched the query.
   */
  results?: GoogleAdsSearchads360V0Resources__SearchAds360Field[];
  /**
   * Total number of results that match the query ignoring the LIMIT clause.
   */
  totalResultsCount?: bigint;
}

function serializeGoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse {
  return {
    ...data,
    totalResultsCount: data["totalResultsCount"] !== undefined ? String(data["totalResultsCount"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360FieldsResponse {
  return {
    ...data,
    totalResultsCount: data["totalResultsCount"] !== undefined ? BigInt(data["totalResultsCount"]) : undefined,
  };
}

/**
 * Request message for SearchAds360Service.Search.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360Request {
  /**
   * Number of elements to retrieve in a single page. When too large a page is
   * requested, the server may decide to further limit the number of returned
   * resources.
   */
  pageSize?: number;
  /**
   * Token of the page to retrieve. If not specified, the first page of results
   * will be returned. Use the value obtained from `next_page_token` in the
   * previous response in order to request the next page of results.
   */
  pageToken?: string;
  /**
   * Required. The query string.
   */
  query?: string;
  /**
   * If true, the total number of results that match the query ignoring the
   * LIMIT clause will be included in the response. Default is false.
   */
  returnTotalResultsCount?: boolean;
  /**
   * Determines whether a summary row will be returned. By default, summary row
   * is not returned. If requested, the summary row will be sent in a response
   * by itself after all other query results are returned.
   */
  summaryRowSetting?:  | "UNSPECIFIED" | "UNKNOWN" | "NO_SUMMARY_ROW" | "SUMMARY_ROW_WITH_RESULTS" | "SUMMARY_ROW_ONLY";
  /**
   * If true, the request is validated but not executed.
   */
  validateOnly?: boolean;
}

/**
 * Response message for SearchAds360Service.Search.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360Response {
  /**
   * The headers of the custom columns in the results.
   */
  customColumnHeaders?: GoogleAdsSearchads360V0Services__CustomColumnHeader[];
  /**
   * FieldMask that represents what fields were requested by the user.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Pagination token used to retrieve the next page of results. Pass the
   * content of this string as the `page_token` attribute of the next request.
   * `next_page_token` is not returned for the last page.
   */
  nextPageToken?: string;
  /**
   * The list of rows that matched the query.
   */
  results?: GoogleAdsSearchads360V0Services__SearchAds360Row[];
  /**
   * Summary row that contains summary of metrics in results. Summary of
   * metrics means aggregation of metrics across all results, here aggregation
   * could be sum, average, rate, etc.
   */
  summaryRow?: GoogleAdsSearchads360V0Services__SearchAds360Row;
  /**
   * Total number of results that match the query ignoring the LIMIT clause.
   */
  totalResultsCount?: bigint;
}

function serializeGoogleAdsSearchads360V0Services__SearchSearchAds360Response(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360Response {
  return {
    ...data,
    customColumnHeaders: data["customColumnHeaders"] !== undefined ? data["customColumnHeaders"].map((item: any) => (serializeGoogleAdsSearchads360V0Services__CustomColumnHeader(item))) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleAdsSearchads360V0Services__SearchAds360Row(item))) : undefined,
    summaryRow: data["summaryRow"] !== undefined ? serializeGoogleAdsSearchads360V0Services__SearchAds360Row(data["summaryRow"]) : undefined,
    totalResultsCount: data["totalResultsCount"] !== undefined ? String(data["totalResultsCount"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360Response(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360Response {
  return {
    ...data,
    customColumnHeaders: data["customColumnHeaders"] !== undefined ? data["customColumnHeaders"].map((item: any) => (deserializeGoogleAdsSearchads360V0Services__CustomColumnHeader(item))) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleAdsSearchads360V0Services__SearchAds360Row(item))) : undefined,
    summaryRow: data["summaryRow"] !== undefined ? deserializeGoogleAdsSearchads360V0Services__SearchAds360Row(data["summaryRow"]) : undefined,
    totalResultsCount: data["totalResultsCount"] !== undefined ? BigInt(data["totalResultsCount"]) : undefined,
  };
}

/**
 * Request message for SearchAds360Service.SearchStream.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360StreamRequest {
  /**
   * The number of rows that are returned in each stream response batch. When
   * too large batch is requested, the server may decide to further limit the
   * number of returned rows.
   */
  batchSize?: number;
  /**
   * Required. The query string.
   */
  query?: string;
  /**
   * Determines whether a summary row will be returned. By default, summary row
   * is not returned. If requested, the summary row will be sent in a response
   * by itself after all other query results are returned.
   */
  summaryRowSetting?:  | "UNSPECIFIED" | "UNKNOWN" | "NO_SUMMARY_ROW" | "SUMMARY_ROW_WITH_RESULTS" | "SUMMARY_ROW_ONLY";
}

/**
 * Response message for SearchAds360Service.SearchStream.
 */
export interface GoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse {
  /**
   * The headers of the custom columns in the results.
   */
  customColumnHeaders?: GoogleAdsSearchads360V0Services__CustomColumnHeader[];
  /**
   * FieldMask that represents what fields were requested by the user.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * The unique id of the request that is used for debugging purposes.
   */
  requestId?: string;
  /**
   * The list of rows that matched the query.
   */
  results?: GoogleAdsSearchads360V0Services__SearchAds360Row[];
  /**
   * Summary row that contains summary of metrics in results. Summary of
   * metrics means aggregation of metrics across all results, here aggregation
   * could be sum, average, rate, etc.
   */
  summaryRow?: GoogleAdsSearchads360V0Services__SearchAds360Row;
}

function serializeGoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse {
  return {
    ...data,
    customColumnHeaders: data["customColumnHeaders"] !== undefined ? data["customColumnHeaders"].map((item: any) => (serializeGoogleAdsSearchads360V0Services__CustomColumnHeader(item))) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleAdsSearchads360V0Services__SearchAds360Row(item))) : undefined,
    summaryRow: data["summaryRow"] !== undefined ? serializeGoogleAdsSearchads360V0Services__SearchAds360Row(data["summaryRow"]) : undefined,
  };
}

function deserializeGoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse(data: any): GoogleAdsSearchads360V0Services__SearchSearchAds360StreamResponse {
  return {
    ...data,
    customColumnHeaders: data["customColumnHeaders"] !== undefined ? data["customColumnHeaders"].map((item: any) => (deserializeGoogleAdsSearchads360V0Services__CustomColumnHeader(item))) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleAdsSearchads360V0Services__SearchAds360Row(item))) : undefined,
    summaryRow: data["summaryRow"] !== undefined ? deserializeGoogleAdsSearchads360V0Services__SearchAds360Row(data["summaryRow"]) : undefined,
  };
}