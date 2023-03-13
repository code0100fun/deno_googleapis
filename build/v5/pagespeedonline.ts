// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * PageSpeed Insights API Client for Deno
 * ======================================
 * 
 * The PageSpeed Insights API lets you analyze the performance of your website with a simple API. It offers tailored suggestions for how you can optimize your site, and lets you easily integrate PageSpeed Insights analysis into your development tools and workflow. 
 * 
 * Docs: https://developers.google.com/speed/docs/insights/v5/about
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The PageSpeed Insights API lets you analyze the performance of your website
 * with a simple API. It offers tailored suggestions for how you can optimize
 * your site, and lets you easily integrate PageSpeed Insights analysis into
 * your development tools and workflow.
 */
export class PageSpeedonline {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://pagespeedonline.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Runs PageSpeed analysis on the page at the specified URL, and returns
   * PageSpeed scores, a list of suggestions to make that page faster, and other
   * information.
   *
   */
  async pagespeedapiRunpagespeed(opts: PagespeedapiRunpagespeedOptions = {}): Promise<PagespeedApiPagespeedResponseV5> {
    const url = new URL(`${this.#baseUrl}pagespeedonline/v5/runPagespeed`);
    if (opts.captchaToken !== undefined) {
      url.searchParams.append("captchaToken", String(opts.captchaToken));
    }
    if (opts.category !== undefined) {
      url.searchParams.append("category", String(opts.category));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.strategy !== undefined) {
      url.searchParams.append("strategy", String(opts.strategy));
    }
    if (opts.url !== undefined) {
      url.searchParams.append("url", String(opts.url));
    }
    if (opts.utm_campaign !== undefined) {
      url.searchParams.append("utm_campaign", String(opts.utm_campaign));
    }
    if (opts.utm_source !== undefined) {
      url.searchParams.append("utm_source", String(opts.utm_source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PagespeedApiPagespeedResponseV5;
  }
}

/**
 * A light reference to an audit by id, used to group and weight audits in a
 * given category.
 */
export interface AuditRefs {
  /**
   * The conventional acronym for the audit/metric.
   */
  acronym?: string;
  /**
   * The category group that the audit belongs to (optional).
   */
  group?: string;
  /**
   * The audit ref id.
   */
  id?: string;
  /**
   * Any audit IDs closely relevant to this one.
   */
  relevantAudits?: string[];
  /**
   * The weight this audit's score has on the overall category score.
   */
  weight?: number;
}

/**
 * A proportion of data in the total distribution, bucketed by a min/max
 * percentage. Each bucket's range is bounded by min <= x < max, In millisecond.
 */
export interface Bucket {
  /**
   * Upper bound for a bucket's range.
   */
  max?: number;
  /**
   * Lower bound for a bucket's range.
   */
  min?: number;
  /**
   * The proportion of data in this bucket.
   */
  proportion?: number;
}

/**
 * The categories in a Lighthouse run.
 */
export interface Categories {
  /**
   * The accessibility category, containing all accessibility related audits.
   */
  accessibility?: LighthouseCategoryV5;
  /**
   * The best practices category, containing all best practices related audits.
   */
  best-practices?: LighthouseCategoryV5;
  /**
   * The performance category, containing all performance related audits.
   */
  performance?: LighthouseCategoryV5;
  /**
   * The Progressive-Web-App (PWA) category, containing all pwa related audits.
   */
  pwa?: LighthouseCategoryV5;
  /**
   * The Search-Engine-Optimization (SEO) category, containing all seo related
   * audits.
   */
  seo?: LighthouseCategoryV5;
}

/**
 * Message containing a category
 */
export interface CategoryGroupV5 {
  /**
   * The description of what the category is grouping
   */
  description?: string;
  /**
   * The human readable title of the group
   */
  title?: string;
}

/**
 * Message containing the configuration settings for the Lighthouse run.
 */
export interface ConfigSettings {
  /**
   * How Lighthouse was run, e.g. from the Chrome extension or from the npm
   * module.
   */
  channel?: string;
  /**
   * The form factor the emulation should use. This field is deprecated,
   * form_factor should be used instead.
   */
  emulatedFormFactor?: string;
  /**
   * How Lighthouse should interpret this run in regards to scoring performance
   * metrics and skipping mobile-only tests in desktop.
   */
  formFactor?: string;
  /**
   * The locale setting.
   */
  locale?: string;
  /**
   * List of categories of audits the run should conduct.
   */
  onlyCategories?: any;
}

/**
 * Message containing environment configuration for a Lighthouse run.
 */
export interface Environment {
  /**
   * The benchmark index number that indicates rough device class.
   */
  benchmarkIndex?: number;
  /**
   * The user agent string of the version of Chrome used.
   */
  hostUserAgent?: string;
  /**
   * The user agent string that was sent over the network.
   */
  networkUserAgent?: string;
}

/**
 * Message containing the i18n data for the LHR - Version 1.
 */
export interface I18n {
  /**
   * Internationalized strings that are formatted to the locale in
   * configSettings.
   */
  rendererFormattedStrings?: RendererFormattedStrings;
}

/**
 * An audit's result object in a Lighthouse result.
 */
export interface LighthouseAuditResultV5 {
  /**
   * The description of the audit.
   */
  description?: string;
  /**
   * Freeform details section of the audit.
   */
  details?: {
    [key: string]: any
  };
  /**
   * The value that should be displayed on the UI for this audit.
   */
  displayValue?: string;
  /**
   * An error message from a thrown error inside the audit.
   */
  errorMessage?: string;
  /**
   * An explanation of the errors in the audit.
   */
  explanation?: string;
  /**
   * The audit's id.
   */
  id?: string;
  /**
   * The unit of the numeric_value field. Used to format the numeric value for
   * display.
   */
  numericUnit?: string;
  /**
   * A numeric value that has a meaning specific to the audit, e.g. the number
   * of nodes in the DOM or the timestamp of a specific load event. More
   * information can be found in the audit details, if present.
   */
  numericValue?: number;
  /**
   * The score of the audit, can be null.
   */
  score?: any;
  /**
   * The enumerated score display mode.
   */
  scoreDisplayMode?: string;
  /**
   * The human readable title.
   */
  title?: string;
  /**
   * Possible warnings that occurred in the audit, can be null.
   */
  warnings?: any;
}

/**
 * A Lighthouse category.
 */
export interface LighthouseCategoryV5 {
  /**
   * An array of references to all the audit members of this category.
   */
  auditRefs?: AuditRefs[];
  /**
   * A more detailed description of the category and its importance.
   */
  description?: string;
  /**
   * The string identifier of the category.
   */
  id?: string;
  /**
   * A description for the manual audits in the category.
   */
  manualDescription?: string;
  /**
   * The overall score of the category, the weighted average of all its audits.
   * (The category's score, can be null.)
   */
  score?: any;
  /**
   * The human-friendly name of the category.
   */
  title?: string;
}

/**
 * The Lighthouse result object.
 */
export interface LighthouseResultV5 {
  /**
   * Map of audits in the LHR.
   */
  audits?: {
    [key: string]: LighthouseAuditResultV5
  };
  /**
   * Map of categories in the LHR.
   */
  categories?: Categories;
  /**
   * Map of category groups in the LHR.
   */
  categoryGroups?: {
    [key: string]: CategoryGroupV5
  };
  /**
   * The configuration settings for this LHR.
   */
  configSettings?: ConfigSettings;
  /**
   * Environment settings that were used when making this LHR.
   */
  environment?: Environment;
  /**
   * The time that this run was fetched.
   */
  fetchTime?: string;
  /**
   * The final resolved url that was audited.
   */
  finalUrl?: string;
  /**
   * The internationalization strings that are required to render the LHR.
   */
  i18n?: I18n;
  /**
   * The lighthouse version that was used to generate this LHR.
   */
  lighthouseVersion?: string;
  /**
   * The original requested url.
   */
  requestedUrl?: string;
  /**
   * A top-level error message that, if present, indicates a serious enough
   * problem that this Lighthouse result may need to be discarded.
   */
  runtimeError?: RuntimeError;
  /**
   * List of all run warnings in the LHR. Will always output to at least `[]`.
   */
  runWarnings?: any[];
  /**
   * The Stack Pack advice strings.
   */
  stackPacks?: StackPack[];
  /**
   * Timing information for this LHR.
   */
  timing?: Timing;
  /**
   * The user agent that was used to run this LHR.
   */
  userAgent?: string;
}

/**
 * The CrUX loading experience object that contains CrUX data breakdowns.
 */
export interface PagespeedApiLoadingExperienceV5 {
  /**
   * The url, pattern or origin which the metrics are on.
   */
  id?: string;
  /**
   * The requested URL, which may differ from the resolved "id".
   */
  initial_url?: string;
  /**
   * The map of .
   */
  metrics?: {
    [key: string]: UserPageLoadMetricV5
  };
  /**
   * True if the result is an origin fallback from a page, false otherwise.
   */
  origin_fallback?: boolean;
  /**
   * The human readable speed "category" of the id.
   */
  overall_category?: string;
}

/**
 * The Pagespeed API response object.
 */
export interface PagespeedApiPagespeedResponseV5 {
  /**
   * The UTC timestamp of this analysis.
   */
  analysisUTCTimestamp?: string;
  /**
   * The captcha verify result
   */
  captchaResult?: string;
  /**
   * Canonicalized and final URL for the document, after following page
   * redirects (if any).
   */
  id?: string;
  /**
   * Kind of result.
   */
  kind?: string;
  /**
   * Lighthouse response for the audit url as an object.
   */
  lighthouseResult?: LighthouseResultV5;
  /**
   * Metrics of end users' page loading experience.
   */
  loadingExperience?: PagespeedApiLoadingExperienceV5;
  /**
   * Metrics of the aggregated page loading experience of the origin
   */
  originLoadingExperience?: PagespeedApiLoadingExperienceV5;
  /**
   * The version of PageSpeed used to generate these results.
   */
  version?: PagespeedVersion;
}

/**
 * Additional options for PageSpeedonline#pagespeedapiRunpagespeed.
 */
export interface PagespeedapiRunpagespeedOptions {
  /**
   * The captcha token passed when filling out a captcha.
   */
  captchaToken?: string;
  /**
   * A Lighthouse category to run; if none are given, only Performance category
   * will be run
   */
  category?:  | "CATEGORY_UNSPECIFIED" | "ACCESSIBILITY" | "BEST_PRACTICES" | "PERFORMANCE" | "PWA" | "SEO";
  /**
   * The locale used to localize formatted results
   */
  locale?: string;
  /**
   * The analysis strategy (desktop or mobile) to use, and desktop is the
   * default
   */
  strategy?:  | "STRATEGY_UNSPECIFIED" | "DESKTOP" | "MOBILE";
  /**
   * Required. The URL to fetch and analyze
   */
  url: string;
  /**
   * Campaign name for analytics.
   */
  utm_campaign?: string;
  /**
   * Campaign source for analytics.
   */
  utm_source?: string;
}

/**
 * The Pagespeed Version object.
 */
export interface PagespeedVersion {
  /**
   * The major version number of PageSpeed used to generate these results.
   */
  major?: string;
  /**
   * The minor version number of PageSpeed used to generate these results.
   */
  minor?: string;
}

/**
 * Message holding the formatted strings used in the renderer.
 */
export interface RendererFormattedStrings {
  /**
   * The tooltip text on an expandable chevron icon.
   */
  auditGroupExpandTooltip?: string;
  /**
   * Text link pointing to the Lighthouse scoring calculator. This link
   * immediately follows a sentence stating the performance score is calculated
   * from the perf metrics.
   */
  calculatorLink?: string;
  /**
   * The label for the initial request in a critical request chain.
   */
  crcInitialNavigation?: string;
  /**
   * The label for values shown in the summary of critical request chains.
   */
  crcLongestDurationLabel?: string;
  /**
   * Option in a dropdown menu that copies the Lighthouse JSON object to the
   * system clipboard.
   */
  dropdownCopyJSON?: string;
  /**
   * Option in a dropdown menu that toggles the themeing of the report between
   * Light(default) and Dark themes.
   */
  dropdownDarkTheme?: string;
  /**
   * Option in a dropdown menu that opens a full Lighthouse report in a print
   * dialog.
   */
  dropdownPrintExpanded?: string;
  /**
   * Option in a dropdown menu that opens a small, summary report in a print
   * dialog.
   */
  dropdownPrintSummary?: string;
  /**
   * Option in a dropdown menu that saves the current report as a new GitHub
   * Gist.
   */
  dropdownSaveGist?: string;
  /**
   * Option in a dropdown menu that saves the Lighthouse report HTML locally to
   * the system as a '.html' file.
   */
  dropdownSaveHTML?: string;
  /**
   * Option in a dropdown menu that saves the Lighthouse JSON object to the
   * local system as a '.json' file.
   */
  dropdownSaveJSON?: string;
  /**
   * Option in a dropdown menu that opens the current report in the Lighthouse
   * Viewer Application.
   */
  dropdownViewer?: string;
  /**
   * The label shown next to an audit or metric that has had an error.
   */
  errorLabel?: string;
  /**
   * The error string shown next to an erroring audit.
   */
  errorMissingAuditInfo?: string;
  /**
   * Label for button to create an issue against the Lighthouse GitHub project.
   */
  footerIssue?: string;
  /**
   * The title of the lab data performance category.
   */
  labDataTitle?: string;
  /**
   * The disclaimer shown under performance explaining that the network can
   * vary.
   */
  lsPerformanceCategoryDescription?: string;
  /**
   * The heading shown above a list of audits that were not computerd in the
   * run.
   */
  manualAuditsGroupTitle?: string;
  /**
   * The heading shown above a list of audits that do not apply to a page.
   */
  notApplicableAuditsGroupTitle?: string;
  /**
   * The heading for the estimated page load savings opportunity of an audit.
   */
  opportunityResourceColumnLabel?: string;
  /**
   * The heading for the estimated page load savings of opportunity audits.
   */
  opportunitySavingsColumnLabel?: string;
  /**
   * The heading that is shown above a list of audits that are passing.
   */
  passedAuditsGroupTitle?: string;
  /**
   * Descriptive explanation for emulation setting when emulating a generic
   * desktop form factor, as opposed to a mobile-device like form factor.
   */
  runtimeDesktopEmulation?: string;
  /**
   * Descriptive explanation for emulation setting when emulating a Nexus 5X
   * mobile device.
   */
  runtimeMobileEmulation?: string;
  /**
   * Descriptive explanation for emulation setting when no device emulation is
   * set.
   */
  runtimeNoEmulation?: string;
  /**
   * Label for a row in a table that shows the version of the Axe library used
   */
  runtimeSettingsAxeVersion?: string;
  /**
   * Label for a row in a table that shows the estimated CPU power of the
   * machine running Lighthouse. Example row values: 532, 1492, 783.
   */
  runtimeSettingsBenchmark?: string;
  /**
   * Label for a row in a table that shows in what tool Lighthouse is being run
   * (e.g. The lighthouse CLI, Chrome DevTools, Lightrider, WebPageTest, etc).
   */
  runtimeSettingsChannel?: string;
  /**
   * Label for a row in a table that describes the CPU throttling conditions
   * that were used during a Lighthouse run, if any.
   */
  runtimeSettingsCPUThrottling?: string;
  /**
   * Label for a row in a table that describes the kind of device that was
   * emulated for the Lighthouse run. Example values for row elements: 'No
   * Emulation', 'Emulated Desktop', etc.
   */
  runtimeSettingsDevice?: string;
  /**
   * Label for a row in a table that shows the time at which a Lighthouse run
   * was conducted; formatted as a timestamp, e.g. Jan 1, 1970 12:00 AM UTC.
   */
  runtimeSettingsFetchTime?: string;
  /**
   * Label for a row in a table that describes the network throttling
   * conditions that were used during a Lighthouse run, if any.
   */
  runtimeSettingsNetworkThrottling?: string;
  /**
   * Title of the Runtime settings table in a Lighthouse report. Runtime
   * settings are the environment configurations that a specific report used at
   * auditing time.
   */
  runtimeSettingsTitle?: string;
  /**
   * Label for a row in a table that shows the User Agent that was detected on
   * the Host machine that ran Lighthouse.
   */
  runtimeSettingsUA?: string;
  /**
   * Label for a row in a table that shows the User Agent that was used to send
   * out all network requests during the Lighthouse run.
   */
  runtimeSettingsUANetwork?: string;
  /**
   * Label for a row in a table that shows the URL that was audited during a
   * Lighthouse run.
   */
  runtimeSettingsUrl?: string;
  /**
   * Descriptive explanation for a runtime setting that is set to an unknown
   * value.
   */
  runtimeUnknown?: string;
  /**
   * The label that explains the score gauges scale (0-49, 50-89, 90-100).
   */
  scorescaleLabel?: string;
  /**
   * Label preceding a radio control for filtering the list of audits. The
   * radio choices are various performance metrics (FCP, LCP, TBT), and if
   * chosen, the audits in the report are hidden if they are not relevant to the
   * selected metric.
   */
  showRelevantAudits?: string;
  /**
   * The label for the button to show only a few lines of a snippet
   */
  snippetCollapseButtonLabel?: string;
  /**
   * The label for the button to show all lines of a snippet
   */
  snippetExpandButtonLabel?: string;
  /**
   * This label is for a filter checkbox above a table of items
   */
  thirdPartyResourcesLabel?: string;
  /**
   * Descriptive explanation for environment throttling that was provided by
   * the runtime environment instead of provided by Lighthouse throttling.
   */
  throttlingProvided?: string;
  /**
   * The label shown preceding important warnings that may have invalidated an
   * entire report.
   */
  toplevelWarningsMessage?: string;
  /**
   * The disclaimer shown below a performance metric value.
   */
  varianceDisclaimer?: string;
  /**
   * Label for a button that opens the Treemap App
   */
  viewTreemapLabel?: string;
  /**
   * The heading that is shown above a list of audits that have warnings
   */
  warningAuditsGroupTitle?: string;
  /**
   * The label shown above a bulleted list of warnings.
   */
  warningHeader?: string;
}

/**
 * Message containing a runtime error config.
 */
export interface RuntimeError {
  /**
   * The enumerated Lighthouse Error code.
   */
  code?: string;
  /**
   * A human readable message explaining the error code.
   */
  message?: string;
}

/**
 * Message containing Stack Pack information.
 */
export interface StackPack {
  /**
   * The stack pack advice strings.
   */
  descriptions?: {
    [key: string]: string
  };
  /**
   * The stack pack icon data uri.
   */
  iconDataURL?: string;
  /**
   * The stack pack id.
   */
  id?: string;
  /**
   * The stack pack title.
   */
  title?: string;
}

/**
 * Message containing the performance timing data for the Lighthouse run.
 */
export interface Timing {
  /**
   * The total duration of Lighthouse's run.
   */
  total?: number;
}

/**
 * A CrUX metric object for a single metric and form factor.
 */
export interface UserPageLoadMetricV5 {
  /**
   * The category of the specific time metric.
   */
  category?: string;
  /**
   * Metric distributions. Proportions should sum up to 1.
   */
  distributions?: Bucket[];
  /**
   * Identifies the form factor of the metric being collected.
   */
  formFactor?: string;
  /**
   * The median number of the metric, in millisecond.
   */
  median?: number;
  /**
   * Identifies the type of the metric.
   */
  metricId?: string;
  /**
   * We use this field to store certain percentile value for this metric. For
   * v4, this field contains pc50. For v5, this field contains pc90.
   */
  percentile?: number;
}