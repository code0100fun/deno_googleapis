// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Search Console API Client for Deno
 * =========================================
 * 
 * The Search Console API provides access to both Search Console data (verified users only) and to public information on an URL basis (anyone)
 * 
 * Docs: https://developers.google.com/webmaster-tools/search-console-api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Search Console API provides access to both Search Console data (verified
 * users only) and to public information on an URL basis (anyone)
 */
export class SearchConsole {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://searchconsole.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Query your data with filters and parameters that you define. Returns zero
   * or more rows grouped by the row keys that you define. You must define a
   * date range of one or more days. When date is one of the group by values,
   * any days without data are omitted from the result list. If you need to know
   * which days have data, issue a broad date range query grouped by date for
   * any metric, and see which day rows are returned.
   *
   * @param siteUrl The site's URL, including protocol. For example: `http://www.example.com/`.
   */
  async searchanalyticsQuery(siteUrl: string, req: SearchAnalyticsQueryRequest): Promise<SearchAnalyticsQueryResponse> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }/searchAnalytics/query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SearchAnalyticsQueryResponse;
  }

  /**
   * Deletes a sitemap from the Sitemaps report. Does not stop Google from
   * crawling this sitemap or the URLs that were previously crawled in the
   * deleted sitemap.
   *
   * @param feedpath The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`.
   * @param siteUrl The site's URL, including protocol. For example: `http://www.example.com/`.
   */
  async sitemapsDelete(feedpath: string, siteUrl: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }/sitemaps/${ feedpath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves information about a specific sitemap.
   *
   * @param feedpath The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`.
   * @param siteUrl The site's URL, including protocol. For example: `http://www.example.com/`.
   */
  async sitemapsGet(feedpath: string, siteUrl: string): Promise<WmxSitemap> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }/sitemaps/${ feedpath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWmxSitemap(data);
  }

  /**
   * Lists the [sitemaps-entries](/webmaster-tools/v3/sitemaps) submitted for
   * this site, or included in the sitemap index file (if `sitemapIndex` is
   * specified in the request).
   *
   * @param siteUrl The site's URL, including protocol. For example: `http://www.example.com/`.
   */
  async sitemapsList(siteUrl: string, opts: SitemapsListOptions = {}): Promise<SitemapsListResponse> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }/sitemaps`);
    if (opts.sitemapIndex !== undefined) {
      url.searchParams.append("sitemapIndex", String(opts.sitemapIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSitemapsListResponse(data);
  }

  /**
   * Submits a sitemap for a site.
   *
   * @param feedpath The URL of the actual sitemap. For example: `http://www.example.com/sitemap.xml`.
   * @param siteUrl The site's URL, including protocol. For example: `http://www.example.com/`.
   */
  async sitemapsSubmit(feedpath: string, siteUrl: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }/sitemaps/${ feedpath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
    });
  }

  /**
   * Adds a site to the set of the user's sites in Search Console.
   *
   * @param siteUrl The URL of the site to add.
   */
  async sitesAdd(siteUrl: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
    });
  }

  /**
   * Removes a site from the set of the user's Search Console sites.
   *
   * @param siteUrl The URI of the property as defined in Search Console. **Examples:** `http://www.example.com/` or `sc-domain:example.com`.
   */
  async sitesDelete(siteUrl: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves information about specific site.
   *
   * @param siteUrl The URI of the property as defined in Search Console. **Examples:** `http://www.example.com/` or `sc-domain:example.com`.
   */
  async sitesGet(siteUrl: string): Promise<WmxSite> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites/${ siteUrl }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WmxSite;
  }

  /**
   * Lists the user's Search Console sites.
   *
   */
  async sitesList(): Promise<SitesListResponse> {
    const url = new URL(`${this.#baseUrl}webmasters/v3/sites`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SitesListResponse;
  }

  /**
   * Index inspection.
   *
   */
  async urlInspectionIndexInspect(req: InspectUrlIndexRequest): Promise<InspectUrlIndexResponse> {
    const url = new URL(`${this.#baseUrl}v1/urlInspection/index:inspect`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeInspectUrlIndexResponse(data);
  }

  /**
   * Runs Mobile-Friendly Test for a given URL.
   *
   */
  async urlTestingToolsMobileFriendlyTestRun(req: RunMobileFriendlyTestRequest): Promise<RunMobileFriendlyTestResponse> {
    const url = new URL(`${this.#baseUrl}v1/urlTestingTools/mobileFriendlyTest:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRunMobileFriendlyTestResponse(data);
  }
}

/**
 * AMP inspection result of the live page or the current information from
 * Google's index, depending on whether you requested a live inspection or not.
 */
export interface AmpInspectionResult {
  /**
   * Index status of the AMP URL.
   */
  ampIndexStatusVerdict?:  | "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL";
  /**
   * URL of the AMP that was inspected. If the submitted URL is a desktop page
   * that refers to an AMP version, the AMP version will be inspected.
   */
  ampUrl?: string;
  /**
   * Whether or not the page blocks indexing through a noindex rule.
   */
  indexingState?:  | "AMP_INDEXING_STATE_UNSPECIFIED" | "AMP_INDEXING_ALLOWED" | "BLOCKED_DUE_TO_NOINDEX" | "BLOCKED_DUE_TO_EXPIRED_UNAVAILABLE_AFTER";
  /**
   * A list of zero or more AMP issues found for the inspected URL.
   */
  issues?: AmpIssue[];
  /**
   * Last time this AMP version was crawled by Google. Absent if the URL was
   * never crawled successfully.
   */
  lastCrawlTime?: Date;
  /**
   * Whether or not Google could fetch the AMP.
   */
  pageFetchState?:  | "PAGE_FETCH_STATE_UNSPECIFIED" | "SUCCESSFUL" | "SOFT_404" | "BLOCKED_ROBOTS_TXT" | "NOT_FOUND" | "ACCESS_DENIED" | "SERVER_ERROR" | "REDIRECT_ERROR" | "ACCESS_FORBIDDEN" | "BLOCKED_4XX" | "INTERNAL_CRAWL_ERROR" | "INVALID_URL";
  /**
   * Whether or not the page is blocked to Google by a robots.txt rule.
   */
  robotsTxtState?:  | "ROBOTS_TXT_STATE_UNSPECIFIED" | "ALLOWED" | "DISALLOWED";
  /**
   * The status of the most severe error on the page. If a page has both
   * warnings and errors, the page status is error. Error status means the page
   * cannot be shown in Search results.
   */
  verdict?:  | "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL";
}

function serializeAmpInspectionResult(data: any): AmpInspectionResult {
  return {
    ...data,
    lastCrawlTime: data["lastCrawlTime"] !== undefined ? data["lastCrawlTime"].toISOString() : undefined,
  };
}

function deserializeAmpInspectionResult(data: any): AmpInspectionResult {
  return {
    ...data,
    lastCrawlTime: data["lastCrawlTime"] !== undefined ? new Date(data["lastCrawlTime"]) : undefined,
  };
}

/**
 * AMP issue.
 */
export interface AmpIssue {
  /**
   * Brief description of this issue.
   */
  issueMessage?: string;
  /**
   * Severity of this issue: WARNING or ERROR.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR";
}

export interface ApiDataRow {
  clicks?: number;
  ctr?: number;
  impressions?: number;
  keys?: string[];
  position?: number;
}

/**
 * A filter test to be applied to each row in the data set, where a match can
 * return the row. Filters are string comparisons, and values and dimension
 * names are not case-sensitive. Individual filters are either AND'ed or OR'ed
 * within their parent filter group, according to the group's group type. You do
 * not need to group by a specified dimension to filter against it.
 */
export interface ApiDimensionFilter {
  dimension?:  | "QUERY" | "PAGE" | "COUNTRY" | "DEVICE" | "SEARCH_APPEARANCE";
  expression?: string;
  operator?:  | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_CONTAINS" | "INCLUDING_REGEX" | "EXCLUDING_REGEX";
}

/**
 * A set of dimension value filters to test against each row. Only rows that
 * pass all filter groups will be returned. All results within a filter group
 * are either AND'ed or OR'ed together, depending on the group type selected.
 * All filter groups are AND'ed together.
 */
export interface ApiDimensionFilterGroup {
  filters?: ApiDimensionFilter[];
  groupType?:  | "AND";
}

/**
 * Blocked resource.
 */
export interface BlockedResource {
  /**
   * URL of the blocked resource.
   */
  url?: string;
}

/**
 * Rich Results items grouped by type.
 */
export interface DetectedItems {
  /**
   * List of Rich Results items.
   */
  items?: Item[];
  /**
   * Rich Results type
   */
  richResultType?: string;
}

/**
 * Describe image data.
 */
export interface Image {
  /**
   * Image data in format determined by the mime type. Currently, the format
   * will always be "image/png", but this might change in the future.
   */
  data?: Uint8Array;
  /**
   * The mime-type of the image data.
   */
  mimeType?: string;
}

function serializeImage(data: any): Image {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeImage(data: any): Image {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Results of index status inspection for either the live page or the version
 * in Google's index, depending on whether you requested a live inspection or
 * not. For more information, see the [Index coverage report
 * documentation](https://support.google.com/webmasters/answer/7440203).
 */
export interface IndexStatusInspectionResult {
  /**
   * Could Google find and index the page. More details about page indexing
   * appear in 'indexing_state'.
   */
  coverageState?: string;
  /**
   * Primary crawler that was used by Google to crawl your site.
   */
  crawledAs?:  | "CRAWLING_USER_AGENT_UNSPECIFIED" | "DESKTOP" | "MOBILE";
  /**
   * The URL of the page that Google selected as canonical. If the page was not
   * indexed, this field is absent.
   */
  googleCanonical?: string;
  /**
   * Whether or not the page blocks indexing through a noindex rule.
   */
  indexingState?:  | "INDEXING_STATE_UNSPECIFIED" | "INDEXING_ALLOWED" | "BLOCKED_BY_META_TAG" | "BLOCKED_BY_HTTP_HEADER" | "BLOCKED_BY_ROBOTS_TXT";
  /**
   * Last time this URL was crawled by Google using the [primary
   * crawler](https://support.google.com/webmasters/answer/7440203#primary_crawler).
   * Absent if the URL was never crawled successfully.
   */
  lastCrawlTime?: Date;
  /**
   * Whether or not Google could retrieve the page from your server. Equivalent
   * to ["page
   * fetch"](https://support.google.com/webmasters/answer/9012289#index_coverage)
   * in the URL inspection report.
   */
  pageFetchState?:  | "PAGE_FETCH_STATE_UNSPECIFIED" | "SUCCESSFUL" | "SOFT_404" | "BLOCKED_ROBOTS_TXT" | "NOT_FOUND" | "ACCESS_DENIED" | "SERVER_ERROR" | "REDIRECT_ERROR" | "ACCESS_FORBIDDEN" | "BLOCKED_4XX" | "INTERNAL_CRAWL_ERROR" | "INVALID_URL";
  /**
   * URLs that link to the inspected URL, directly and indirectly.
   */
  referringUrls?: string[];
  /**
   * Whether or not the page is blocked to Google by a robots.txt rule.
   */
  robotsTxtState?:  | "ROBOTS_TXT_STATE_UNSPECIFIED" | "ALLOWED" | "DISALLOWED";
  /**
   * Any sitemaps that this URL was listed in, as known by Google. Not
   * guaranteed to be an exhaustive list, especially if Google did not discover
   * this URL through a sitemap. Absent if no sitemaps were found.
   */
  sitemap?: string[];
  /**
   * The URL that your page or site [declares as
   * canonical](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls?#define-canonical).
   * If you did not declare a canonical URL, this field is absent.
   */
  userCanonical?: string;
  /**
   * High level verdict about whether the URL *is* indexed (indexed status), or
   * *can be* indexed (live inspection).
   */
  verdict?:  | "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL";
}

function serializeIndexStatusInspectionResult(data: any): IndexStatusInspectionResult {
  return {
    ...data,
    lastCrawlTime: data["lastCrawlTime"] !== undefined ? data["lastCrawlTime"].toISOString() : undefined,
  };
}

function deserializeIndexStatusInspectionResult(data: any): IndexStatusInspectionResult {
  return {
    ...data,
    lastCrawlTime: data["lastCrawlTime"] !== undefined ? new Date(data["lastCrawlTime"]) : undefined,
  };
}

/**
 * Index inspection request.
 */
export interface InspectUrlIndexRequest {
  /**
   * Required. URL to inspect. Must be under the property specified in
   * "site_url".
   */
  inspectionUrl?: string;
  /**
   * Optional. An [IETF
   * BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language code
   * representing the requested language for translated issue messages, e.g.
   * "en-US", "or "de-CH". Default value is "en-US".
   */
  languageCode?: string;
  /**
   * Required. The URL of the property as defined in Search Console.
   * **Examples:** `http://www.example.com/` for a URL-prefix property, or
   * `sc-domain:example.com` for a Domain property.
   */
  siteUrl?: string;
}

/**
 * Index-Status inspection response.
 */
export interface InspectUrlIndexResponse {
  /**
   * URL inspection results.
   */
  inspectionResult?: UrlInspectionResult;
}

function serializeInspectUrlIndexResponse(data: any): InspectUrlIndexResponse {
  return {
    ...data,
    inspectionResult: data["inspectionResult"] !== undefined ? serializeUrlInspectionResult(data["inspectionResult"]) : undefined,
  };
}

function deserializeInspectUrlIndexResponse(data: any): InspectUrlIndexResponse {
  return {
    ...data,
    inspectionResult: data["inspectionResult"] !== undefined ? deserializeUrlInspectionResult(data["inspectionResult"]) : undefined,
  };
}

/**
 * A specific rich result found on the page.
 */
export interface Item {
  /**
   * A list of zero or more rich result issues found for this instance.
   */
  issues?: RichResultsIssue[];
  /**
   * The user-provided name of this item.
   */
  name?: string;
}

/**
 * Mobile-friendly issue.
 */
export interface MobileFriendlyIssue {
  /**
   * Rule violated.
   */
  rule?:  | "MOBILE_FRIENDLY_RULE_UNSPECIFIED" | "USES_INCOMPATIBLE_PLUGINS" | "CONFIGURE_VIEWPORT" | "FIXED_WIDTH_VIEWPORT" | "SIZE_CONTENT_TO_VIEWPORT" | "USE_LEGIBLE_FONT_SIZES" | "TAP_TARGETS_TOO_CLOSE";
}

/**
 * Mobile-usability inspection results.
 */
export interface MobileUsabilityInspectionResult {
  /**
   * A list of zero or more mobile-usability issues detected for this URL.
   */
  issues?: MobileUsabilityIssue[];
  /**
   * High-level mobile-usability inspection result for this URL.
   */
  verdict?:  | "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL";
}

/**
 * Mobile-usability issue.
 */
export interface MobileUsabilityIssue {
  /**
   * Mobile-usability issue type.
   */
  issueType?:  | "MOBILE_USABILITY_ISSUE_TYPE_UNSPECIFIED" | "USES_INCOMPATIBLE_PLUGINS" | "CONFIGURE_VIEWPORT" | "FIXED_WIDTH_VIEWPORT" | "SIZE_CONTENT_TO_VIEWPORT" | "USE_LEGIBLE_FONT_SIZES" | "TAP_TARGETS_TOO_CLOSE";
  /**
   * Additional information regarding the issue.
   */
  message?: string;
  /**
   * Not returned; reserved for future use.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR";
}

/**
 * Information about a resource with issue.
 */
export interface ResourceIssue {
  /**
   * Describes a blocked resource issue.
   */
  blockedResource?: BlockedResource;
}

/**
 * Rich-Results inspection result, including any rich results found at this
 * URL.
 */
export interface RichResultsInspectionResult {
  /**
   * A list of zero or more rich results detected on this page. Rich results
   * that cannot even be parsed due to syntactic issues will not be listed here.
   */
  detectedItems?: DetectedItems[];
  /**
   * High-level rich results inspection result for this URL.
   */
  verdict?:  | "VERDICT_UNSPECIFIED" | "PASS" | "PARTIAL" | "FAIL" | "NEUTRAL";
}

/**
 * Severity and status of a single issue affecting a single rich result
 * instance on a page.
 */
export interface RichResultsIssue {
  /**
   * Rich Results issue type.
   */
  issueMessage?: string;
  /**
   * Severity of this issue: WARNING, or ERROR. Items with an issue of status
   * ERROR cannot appear with rich result features in Google Search results.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR";
}

/**
 * Mobile-friendly test request.
 */
export interface RunMobileFriendlyTestRequest {
  /**
   * Whether or not screenshot is requested. Default is false.
   */
  requestScreenshot?: boolean;
  /**
   * URL for inspection.
   */
  url?: string;
}

/**
 * Mobile-friendly test response, including mobile-friendly issues and resource
 * issues.
 */
export interface RunMobileFriendlyTestResponse {
  /**
   * Test verdict, whether the page is mobile friendly or not.
   */
  mobileFriendliness?:  | "MOBILE_FRIENDLY_TEST_RESULT_UNSPECIFIED" | "MOBILE_FRIENDLY" | "NOT_MOBILE_FRIENDLY";
  /**
   * List of mobile-usability issues.
   */
  mobileFriendlyIssues?: MobileFriendlyIssue[];
  /**
   * Information about embedded resources issues.
   */
  resourceIssues?: ResourceIssue[];
  /**
   * Screenshot of the requested URL.
   */
  screenshot?: Image;
  /**
   * Final state of the test, can be either complete or an error.
   */
  testStatus?: TestStatus;
}

function serializeRunMobileFriendlyTestResponse(data: any): RunMobileFriendlyTestResponse {
  return {
    ...data,
    screenshot: data["screenshot"] !== undefined ? serializeImage(data["screenshot"]) : undefined,
  };
}

function deserializeRunMobileFriendlyTestResponse(data: any): RunMobileFriendlyTestResponse {
  return {
    ...data,
    screenshot: data["screenshot"] !== undefined ? deserializeImage(data["screenshot"]) : undefined,
  };
}

export interface SearchAnalyticsQueryRequest {
  /**
   * [Optional; Default is \"auto\"] How data is aggregated. If aggregated by
   * property, all data for the same property is aggregated; if aggregated by
   * page, all data is aggregated by canonical URI. If you filter or group by
   * page, choose AUTO; otherwise you can aggregate either by property or by
   * page, depending on how you want your data calculated; see the help
   * documentation to learn how data is calculated differently by site versus by
   * page. **Note:** If you group or filter by page, you cannot aggregate by
   * property. If you specify any value other than AUTO, the aggregation type in
   * the result will match the requested type, or if you request an invalid
   * type, you will get an error. The API will never change your aggregation
   * type if the requested type is invalid.
   */
  aggregationType?:  | "AUTO" | "BY_PROPERTY" | "BY_PAGE";
  /**
   * The data state to be fetched, can be full or all, the latter including
   * full and partial data.
   */
  dataState?:  | "DATA_STATE_UNSPECIFIED" | "FINAL" | "ALL";
  /**
   * [Optional] Zero or more filters to apply to the dimension grouping values;
   * for example, 'query contains \"buy\"' to see only data where the query
   * string contains the substring \"buy\" (not case-sensitive). You can filter
   * by a dimension without grouping by it.
   */
  dimensionFilterGroups?: ApiDimensionFilterGroup[];
  /**
   * [Optional] Zero or more dimensions to group results by. Dimensions are the
   * group-by values in the Search Analytics page. Dimensions are combined to
   * create a unique row key for each row. Results are grouped in the order that
   * you supply these dimensions.
   */
  dimensions?:  | "DATE" | "QUERY" | "PAGE" | "COUNTRY" | "DEVICE" | "SEARCH_APPEARANCE"[];
  /**
   * [Required] End date of the requested date range, in YYYY-MM-DD format, in
   * PST (UTC - 8:00). Must be greater than or equal to the start date. This
   * value is included in the range.
   */
  endDate?: string;
  /**
   * [Optional; Default is 1000] The maximum number of rows to return. Must be
   * a number from 1 to 25,000 (inclusive).
   */
  rowLimit?: number;
  /**
   * [Optional; Default is \"web\"] The search type to filter for.
   */
  searchType?:  | "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "DISCOVER" | "GOOGLE_NEWS";
  /**
   * [Required] Start date of the requested date range, in YYYY-MM-DD format,
   * in PST time (UTC - 8:00). Must be less than or equal to the end date. This
   * value is included in the range.
   */
  startDate?: string;
  /**
   * [Optional; Default is 0] Zero-based index of the first row in the
   * response. Must be a non-negative number.
   */
  startRow?: number;
  /**
   * Optional. [Optional; Default is \"web\"] Type of report: search type, or
   * either Discover or Gnews.
   */
  type?:  | "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "DISCOVER" | "GOOGLE_NEWS";
}

/**
 * A list of rows, one per result, grouped by key. Metrics in each row are
 * aggregated for all data grouped by that key either by page or property, as
 * specified by the aggregation type parameter.
 */
export interface SearchAnalyticsQueryResponse {
  /**
   * How the results were aggregated.
   */
  responseAggregationType?:  | "AUTO" | "BY_PROPERTY" | "BY_PAGE";
  /**
   * A list of rows grouped by the key values in the order given in the query.
   */
  rows?: ApiDataRow[];
}

/**
 * Additional options for SearchConsole#sitemapsList.
 */
export interface SitemapsListOptions {
  /**
   * A URL of a site's sitemap index. For example:
   * `http://www.example.com/sitemapindex.xml`.
   */
  sitemapIndex?: string;
}

/**
 * List of sitemaps.
 */
export interface SitemapsListResponse {
  /**
   * Contains detailed information about a specific URL submitted as a
   * [sitemap](https://support.google.com/webmasters/answer/156184).
   */
  sitemap?: WmxSitemap[];
}

function serializeSitemapsListResponse(data: any): SitemapsListResponse {
  return {
    ...data,
    sitemap: data["sitemap"] !== undefined ? data["sitemap"].map((item: any) => (serializeWmxSitemap(item))) : undefined,
  };
}

function deserializeSitemapsListResponse(data: any): SitemapsListResponse {
  return {
    ...data,
    sitemap: data["sitemap"] !== undefined ? data["sitemap"].map((item: any) => (deserializeWmxSitemap(item))) : undefined,
  };
}

/**
 * List of sites with access level information.
 */
export interface SitesListResponse {
  /**
   * Contains permission level information about a Search Console site. For
   * more information, see [Permissions in Search
   * Console](https://support.google.com/webmasters/answer/2451999).
   */
  siteEntry?: WmxSite[];
}

/**
 * Final state of the test, including error details if necessary.
 */
export interface TestStatus {
  /**
   * Error details if applicable.
   */
  details?: string;
  /**
   * Status of the test.
   */
  status?:  | "TEST_STATUS_UNSPECIFIED" | "COMPLETE" | "INTERNAL_ERROR" | "PAGE_UNREACHABLE";
}

/**
 * URL inspection result, including all inspection results.
 */
export interface UrlInspectionResult {
  /**
   * Result of the AMP analysis. Absent if the page is not an AMP page.
   */
  ampResult?: AmpInspectionResult;
  /**
   * Result of the index status analysis.
   */
  indexStatusResult?: IndexStatusInspectionResult;
  /**
   * Link to Search Console URL inspection.
   */
  inspectionResultLink?: string;
  /**
   * Result of the Mobile usability analysis.
   */
  mobileUsabilityResult?: MobileUsabilityInspectionResult;
  /**
   * Result of the Rich Results analysis. Absent if there are no rich results
   * found.
   */
  richResultsResult?: RichResultsInspectionResult;
}

function serializeUrlInspectionResult(data: any): UrlInspectionResult {
  return {
    ...data,
    ampResult: data["ampResult"] !== undefined ? serializeAmpInspectionResult(data["ampResult"]) : undefined,
    indexStatusResult: data["indexStatusResult"] !== undefined ? serializeIndexStatusInspectionResult(data["indexStatusResult"]) : undefined,
  };
}

function deserializeUrlInspectionResult(data: any): UrlInspectionResult {
  return {
    ...data,
    ampResult: data["ampResult"] !== undefined ? deserializeAmpInspectionResult(data["ampResult"]) : undefined,
    indexStatusResult: data["indexStatusResult"] !== undefined ? deserializeIndexStatusInspectionResult(data["indexStatusResult"]) : undefined,
  };
}

/**
 * Contains permission level information about a Search Console site. For more
 * information, see [Permissions in Search
 * Console](https://support.google.com/webmasters/answer/2451999).
 */
export interface WmxSite {
  /**
   * The user's permission level for the site.
   */
  permissionLevel?:  | "SITE_PERMISSION_LEVEL_UNSPECIFIED" | "SITE_OWNER" | "SITE_FULL_USER" | "SITE_RESTRICTED_USER" | "SITE_UNVERIFIED_USER";
  /**
   * The URL of the site.
   */
  siteUrl?: string;
}

/**
 * Contains detailed information about a specific URL submitted as a
 * [sitemap](https://support.google.com/webmasters/answer/156184).
 */
export interface WmxSitemap {
  /**
   * The various content types in the sitemap.
   */
  contents?: WmxSitemapContent[];
  /**
   * Number of errors in the sitemap. These are issues with the sitemap itself
   * that need to be fixed before it can be processed correctly.
   */
  errors?: bigint;
  /**
   * If true, the sitemap has not been processed.
   */
  isPending?: boolean;
  /**
   * If true, the sitemap is a collection of sitemaps.
   */
  isSitemapsIndex?: boolean;
  /**
   * Date & time in which this sitemap was last downloaded. Date format is in
   * RFC 3339 format (yyyy-mm-dd).
   */
  lastDownloaded?: Date;
  /**
   * Date & time in which this sitemap was submitted. Date format is in RFC
   * 3339 format (yyyy-mm-dd).
   */
  lastSubmitted?: Date;
  /**
   * The url of the sitemap.
   */
  path?: string;
  /**
   * The type of the sitemap. For example: `rssFeed`.
   */
  type?:  | "NOT_SITEMAP" | "URL_LIST" | "SITEMAP" | "RSS_FEED" | "ATOM_FEED" | "PATTERN_SITEMAP" | "OCEANFRONT";
  /**
   * Number of warnings for the sitemap. These are generally non-critical
   * issues with URLs in the sitemaps.
   */
  warnings?: bigint;
}

function serializeWmxSitemap(data: any): WmxSitemap {
  return {
    ...data,
    contents: data["contents"] !== undefined ? data["contents"].map((item: any) => (serializeWmxSitemapContent(item))) : undefined,
    errors: data["errors"] !== undefined ? String(data["errors"]) : undefined,
    lastDownloaded: data["lastDownloaded"] !== undefined ? data["lastDownloaded"].toISOString() : undefined,
    lastSubmitted: data["lastSubmitted"] !== undefined ? data["lastSubmitted"].toISOString() : undefined,
    warnings: data["warnings"] !== undefined ? String(data["warnings"]) : undefined,
  };
}

function deserializeWmxSitemap(data: any): WmxSitemap {
  return {
    ...data,
    contents: data["contents"] !== undefined ? data["contents"].map((item: any) => (deserializeWmxSitemapContent(item))) : undefined,
    errors: data["errors"] !== undefined ? BigInt(data["errors"]) : undefined,
    lastDownloaded: data["lastDownloaded"] !== undefined ? new Date(data["lastDownloaded"]) : undefined,
    lastSubmitted: data["lastSubmitted"] !== undefined ? new Date(data["lastSubmitted"]) : undefined,
    warnings: data["warnings"] !== undefined ? BigInt(data["warnings"]) : undefined,
  };
}

/**
 * Information about the various content types in the sitemap.
 */
export interface WmxSitemapContent {
  /**
   * *Deprecated; do not use.*
   */
  indexed?: bigint;
  /**
   * The number of URLs in the sitemap (of the content type).
   */
  submitted?: bigint;
  /**
   * The specific type of content in this sitemap. For example: `web`.
   */
  type?:  | "WEB" | "IMAGE" | "VIDEO" | "NEWS" | "MOBILE" | "ANDROID_APP" | "PATTERN" | "IOS_APP" | "DATA_FEED_ELEMENT";
}

function serializeWmxSitemapContent(data: any): WmxSitemapContent {
  return {
    ...data,
    indexed: data["indexed"] !== undefined ? String(data["indexed"]) : undefined,
    submitted: data["submitted"] !== undefined ? String(data["submitted"]) : undefined,
  };
}

function deserializeWmxSitemapContent(data: any): WmxSitemapContent {
  return {
    ...data,
    indexed: data["indexed"] !== undefined ? BigInt(data["indexed"]) : undefined,
    submitted: data["submitted"] !== undefined ? BigInt(data["submitted"]) : undefined,
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
