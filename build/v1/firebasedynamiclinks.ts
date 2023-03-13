// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase Dynamic Links API Client for Deno
 * ==========================================
 * 
 * Programmatically creates and manages Firebase Dynamic Links.
 * 
 * Docs: https://firebase.google.com/docs/dynamic-links/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Programmatically creates and manages Firebase Dynamic Links.
 */
export class FirebaseDynamicLinks {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebasedynamiclinks.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a managed short Dynamic Link given either a valid long Dynamic
   * Link or details such as Dynamic Link domain, Android and iOS app
   * information. The created short Dynamic Link will not expire. This differs
   * from CreateShortDynamicLink in the following ways: - The request will also
   * contain a name for the link (non unique name for the front end). - The
   * response must be authenticated with an auth token (generated with the admin
   * service account). - The link will appear in the FDL list of links in the
   * console front end. The Dynamic Link domain in the request must be owned by
   * requester's Firebase project.
   *
   */
  async managedShortLinksCreate(req: CreateManagedShortLinkRequest): Promise<CreateManagedShortLinkResponse> {
    const url = new URL(`${this.#baseUrl}v1/managedShortLinks:create`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreateManagedShortLinkResponse(data);
  }

  /**
   * Creates a short Dynamic Link given either a valid long Dynamic Link or
   * details such as Dynamic Link domain, Android and iOS app information. The
   * created short Dynamic Link will not expire. Repeated calls with the same
   * long Dynamic Link or Dynamic Link information will produce the same short
   * Dynamic Link. The Dynamic Link domain in the request must be owned by
   * requester's Firebase project.
   *
   */
  async shortLinksCreate(req: CreateShortDynamicLinkRequest): Promise<CreateShortDynamicLinkResponse> {
    const url = new URL(`${this.#baseUrl}v1/shortLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CreateShortDynamicLinkResponse;
  }

  /**
   * Fetches analytics stats of a short Dynamic Link for a given duration.
   * Metrics include number of clicks, redirects, installs, app first opens, and
   * app reopens.
   *
   * @param dynamicLink Dynamic Link URL. e.g. https://abcd.app.goo.gl/wxyz
   */
  async v1GetLinkStats(dynamicLink: string, opts: V1GetLinkStatsOptions = {}): Promise<DynamicLinkStats> {
    opts = serializeV1GetLinkStatsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ dynamicLink }/linkStats`);
    if (opts.durationDays !== undefined) {
      url.searchParams.append("durationDays", String(opts.durationDays));
    }
    if (opts.sdkVersion !== undefined) {
      url.searchParams.append("sdkVersion", String(opts.sdkVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDynamicLinkStats(data);
  }

  /**
   * Get iOS strong/weak-match info for post-install attribution.
   *
   */
  async v1InstallAttribution(req: GetIosPostInstallAttributionRequest): Promise<GetIosPostInstallAttributionResponse> {
    req = serializeGetIosPostInstallAttributionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/installAttribution`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetIosPostInstallAttributionResponse;
  }

  /**
   * Get iOS reopen attribution for app universal link open deeplinking.
   *
   */
  async v1ReopenAttribution(req: GetIosReopenAttributionRequest): Promise<GetIosReopenAttributionResponse> {
    const url = new URL(`${this.#baseUrl}v1/reopenAttribution`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetIosReopenAttributionResponse;
  }
}

/**
 * Tracking parameters supported by Dynamic Link.
 */
export interface AnalyticsInfo {
  /**
   * Google Play Campaign Measurements.
   */
  googlePlayAnalytics?: GooglePlayAnalytics;
  /**
   * iTunes Connect App Analytics.
   */
  itunesConnectAnalytics?: ITunesConnectAnalytics;
}

/**
 * Android related attributes to the Dynamic Link.
 */
export interface AndroidInfo {
  /**
   * Link to open on Android if the app is not installed.
   */
  androidFallbackLink?: string;
  /**
   * If specified, this overrides the ‘link’ parameter on Android.
   */
  androidLink?: string;
  /**
   * Minimum version code for the Android app. If the installed app’s version
   * code is lower, then the user is taken to the Play Store.
   */
  androidMinPackageVersionCode?: string;
  /**
   * Android package name of the app.
   */
  androidPackageName?: string;
}

/**
 * Request to create a managed Short Dynamic Link.
 */
export interface CreateManagedShortLinkRequest {
  /**
   * Information about the Dynamic Link to be shortened. [Learn
   * more](https://firebase.google.com/docs/reference/dynamic-links/link-shortener).
   */
  dynamicLinkInfo?: DynamicLinkInfo;
  /**
   * Full long Dynamic Link URL with desired query parameters specified. For
   * example,
   * "https://sample.app.goo.gl/?link=http://www.google.com&apn=com.sample",
   * [Learn
   * more](https://firebase.google.com/docs/reference/dynamic-links/link-shortener).
   */
  longDynamicLink?: string;
  /**
   * Link name to associate with the link. It's used for marketer to identify
   * manually-created links in the Firebase console
   * (https://console.firebase.google.com/). Links must be named to be tracked.
   */
  name?: string;
  /**
   * Google SDK version. Version takes the form "$major.$minor.$patch"
   */
  sdkVersion?: string;
  /**
   * Short Dynamic Link suffix. Optional.
   */
  suffix?: Suffix;
}

/**
 * Response to create a short Dynamic Link.
 */
export interface CreateManagedShortLinkResponse {
  /**
   * Short Dynamic Link value. e.g. https://abcd.app.goo.gl/wxyz
   */
  managedShortLink?: ManagedShortLink;
  /**
   * Preview link to show the link flow chart. (debug info.)
   */
  previewLink?: string;
  /**
   * Information about potential warnings on link creation.
   */
  warning?: DynamicLinkWarning[];
}

function serializeCreateManagedShortLinkResponse(data: any): CreateManagedShortLinkResponse {
  return {
    ...data,
    managedShortLink: data["managedShortLink"] !== undefined ? serializeManagedShortLink(data["managedShortLink"]) : undefined,
  };
}

function deserializeCreateManagedShortLinkResponse(data: any): CreateManagedShortLinkResponse {
  return {
    ...data,
    managedShortLink: data["managedShortLink"] !== undefined ? deserializeManagedShortLink(data["managedShortLink"]) : undefined,
  };
}

/**
 * Request to create a short Dynamic Link.
 */
export interface CreateShortDynamicLinkRequest {
  /**
   * Information about the Dynamic Link to be shortened. [Learn
   * more](https://firebase.google.com/docs/reference/dynamic-links/link-shortener).
   */
  dynamicLinkInfo?: DynamicLinkInfo;
  /**
   * Full long Dynamic Link URL with desired query parameters specified. For
   * example,
   * "https://sample.app.goo.gl/?link=http://www.google.com&apn=com.sample",
   * [Learn
   * more](https://firebase.google.com/docs/reference/dynamic-links/link-shortener).
   */
  longDynamicLink?: string;
  /**
   * Google SDK version. Version takes the form "$major.$minor.$patch"
   */
  sdkVersion?: string;
  /**
   * Short Dynamic Link suffix. Optional.
   */
  suffix?: Suffix;
}

/**
 * Response to create a short Dynamic Link.
 */
export interface CreateShortDynamicLinkResponse {
  /**
   * Preview link to show the link flow chart. (debug info.)
   */
  previewLink?: string;
  /**
   * Short Dynamic Link value. e.g. https://abcd.app.goo.gl/wxyz
   */
  shortLink?: string;
  /**
   * Information about potential warnings on link creation.
   */
  warning?: DynamicLinkWarning[];
}

/**
 * Desktop related attributes to the Dynamic Link.
 */
export interface DesktopInfo {
  /**
   * Link to open on desktop.
   */
  desktopFallbackLink?: string;
}

/**
 * Signals associated with the device making the request.
 */
export interface DeviceInfo {
  /**
   * Device model name.
   */
  deviceModelName?: string;
  /**
   * Device language code setting.
   */
  languageCode?: string;
  /**
   * Device language code setting obtained by executing JavaScript code in
   * WebView.
   */
  languageCodeFromWebview?: string;
  /**
   * Device language code raw setting. iOS does returns language code in
   * different format than iOS WebView. For example WebView returns en_US, but
   * iOS returns en-US. Field below will return raw value returned by iOS.
   */
  languageCodeRaw?: string;
  /**
   * Device display resolution height.
   */
  screenResolutionHeight?: bigint;
  /**
   * Device display resolution width.
   */
  screenResolutionWidth?: bigint;
  /**
   * Device timezone setting.
   */
  timezone?: string;
}

function serializeDeviceInfo(data: any): DeviceInfo {
  return {
    ...data,
    screenResolutionHeight: data["screenResolutionHeight"] !== undefined ? String(data["screenResolutionHeight"]) : undefined,
    screenResolutionWidth: data["screenResolutionWidth"] !== undefined ? String(data["screenResolutionWidth"]) : undefined,
  };
}

function deserializeDeviceInfo(data: any): DeviceInfo {
  return {
    ...data,
    screenResolutionHeight: data["screenResolutionHeight"] !== undefined ? BigInt(data["screenResolutionHeight"]) : undefined,
    screenResolutionWidth: data["screenResolutionWidth"] !== undefined ? BigInt(data["screenResolutionWidth"]) : undefined,
  };
}

/**
 * Dynamic Link event stat.
 */
export interface DynamicLinkEventStat {
  /**
   * The number of times this event occurred.
   */
  count?: bigint;
  /**
   * Link event.
   */
  event?:  | "DYNAMIC_LINK_EVENT_UNSPECIFIED" | "CLICK" | "REDIRECT" | "APP_INSTALL" | "APP_FIRST_OPEN" | "APP_RE_OPEN";
  /**
   * Requested platform.
   */
  platform?:  | "DYNAMIC_LINK_PLATFORM_UNSPECIFIED" | "ANDROID" | "IOS" | "DESKTOP" | "OTHER";
}

function serializeDynamicLinkEventStat(data: any): DynamicLinkEventStat {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeDynamicLinkEventStat(data: any): DynamicLinkEventStat {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Information about a Dynamic Link.
 */
export interface DynamicLinkInfo {
  /**
   * Parameters used for tracking. See all tracking parameters in the
   * [documentation](https://firebase.google.com/docs/dynamic-links/create-manually).
   */
  analyticsInfo?: AnalyticsInfo;
  /**
   * Android related information. See Android related parameters in the
   * [documentation](https://firebase.google.com/docs/dynamic-links/create-manually).
   */
  androidInfo?: AndroidInfo;
  /**
   * Desktop related information. See desktop related parameters in the
   * [documentation](https://firebase.google.com/docs/dynamic-links/create-manually).
   */
  desktopInfo?: DesktopInfo;
  /**
   * E.g. https://maps.app.goo.gl, https://maps.page.link, https://g.co/maps
   * More examples can be found in description of getNormalizedUriPrefix in
   * j/c/g/firebase/dynamiclinks/uri/DdlDomain.java Will fallback to
   * dynamic_link_domain is this field is missing
   */
  domainUriPrefix?: string;
  /**
   * Dynamic Links domain that the project owns, e.g. abcd.app.goo.gl [Learn
   * more](https://firebase.google.com/docs/dynamic-links/android/receive) on
   * how to set up Dynamic Link domain associated with your Firebase project.
   * Required if missing domain_uri_prefix.
   */
  dynamicLinkDomain?: string;
  /**
   * iOS related information. See iOS related parameters in the
   * [documentation](https://firebase.google.com/docs/dynamic-links/create-manually).
   */
  iosInfo?: IosInfo;
  /**
   * The link your app will open, You can specify any URL your app can handle.
   * This link must be a well-formatted URL, be properly URL-encoded, and use
   * the HTTP or HTTPS scheme. See 'link' parameters in the
   * [documentation](https://firebase.google.com/docs/dynamic-links/create-manually).
   * Required.
   */
  link?: string;
  /**
   * Information of navigation behavior of a Firebase Dynamic Links.
   */
  navigationInfo?: NavigationInfo;
  /**
   * Parameters for social meta tag params. Used to set meta tag data for link
   * previews on social sites.
   */
  socialMetaTagInfo?: SocialMetaTagInfo;
}

/**
 * Analytics stats of a Dynamic Link for a given timeframe.
 */
export interface DynamicLinkStats {
  /**
   * Dynamic Link event stats.
   */
  linkEventStats?: DynamicLinkEventStat[];
}

function serializeDynamicLinkStats(data: any): DynamicLinkStats {
  return {
    ...data,
    linkEventStats: data["linkEventStats"] !== undefined ? data["linkEventStats"].map((item: any) => (serializeDynamicLinkEventStat(item))) : undefined,
  };
}

function deserializeDynamicLinkStats(data: any): DynamicLinkStats {
  return {
    ...data,
    linkEventStats: data["linkEventStats"] !== undefined ? data["linkEventStats"].map((item: any) => (deserializeDynamicLinkEventStat(item))) : undefined,
  };
}

/**
 * Dynamic Links warning messages.
 */
export interface DynamicLinkWarning {
  /**
   * The warning code.
   */
  warningCode?:  | "CODE_UNSPECIFIED" | "NOT_IN_PROJECT_ANDROID_PACKAGE_NAME" | "NOT_INTEGER_ANDROID_PACKAGE_MIN_VERSION" | "UNNECESSARY_ANDROID_PACKAGE_MIN_VERSION" | "NOT_URI_ANDROID_LINK" | "UNNECESSARY_ANDROID_LINK" | "NOT_URI_ANDROID_FALLBACK_LINK" | "BAD_URI_SCHEME_ANDROID_FALLBACK_LINK" | "NOT_IN_PROJECT_IOS_BUNDLE_ID" | "NOT_IN_PROJECT_IPAD_BUNDLE_ID" | "UNNECESSARY_IOS_URL_SCHEME" | "NOT_NUMERIC_IOS_APP_STORE_ID" | "UNNECESSARY_IOS_APP_STORE_ID" | "NOT_URI_IOS_FALLBACK_LINK" | "BAD_URI_SCHEME_IOS_FALLBACK_LINK" | "NOT_URI_IPAD_FALLBACK_LINK" | "BAD_URI_SCHEME_IPAD_FALLBACK_LINK" | "BAD_DEBUG_PARAM" | "BAD_AD_PARAM" | "DEPRECATED_PARAM" | "UNRECOGNIZED_PARAM" | "TOO_LONG_PARAM" | "NOT_URI_SOCIAL_IMAGE_LINK" | "BAD_URI_SCHEME_SOCIAL_IMAGE_LINK" | "NOT_URI_SOCIAL_URL" | "BAD_URI_SCHEME_SOCIAL_URL" | "LINK_LENGTH_TOO_LONG" | "LINK_WITH_FRAGMENTS" | "NOT_MATCHING_IOS_BUNDLE_ID_AND_STORE_ID";
  /**
   * The document describing the warning, and helps resolve.
   */
  warningDocumentLink?: string;
  /**
   * The warning message to help developers improve their requests.
   */
  warningMessage?: string;
}

/**
 * Request for iSDK to execute strong match flow for post-install attribution.
 * This is meant for iOS requests only. Requests from other platforms will not
 * be honored.
 */
export interface GetIosPostInstallAttributionRequest {
  /**
   * App installation epoch time (https://en.wikipedia.org/wiki/Unix_time).
   * This is a client signal for a more accurate weak match.
   */
  appInstallationTime?: bigint;
  /**
   * APP bundle ID.
   */
  bundleId?: string;
  /**
   * Device information.
   */
  device?: DeviceInfo;
  /**
   * iOS version, ie: 9.3.5. Consider adding "build".
   */
  iosVersion?: string;
  /**
   * App post install attribution retrieval information. Disambiguates
   * mechanism (iSDK or developer invoked) to retrieve payload from clicked
   * link.
   */
  retrievalMethod?:  | "UNKNOWN_PAYLOAD_RETRIEVAL_METHOD" | "IMPLICIT_WEAK_MATCH" | "EXPLICIT_WEAK_MATCH" | "EXPLICIT_STRONG_AFTER_WEAK_MATCH";
  /**
   * Google SDK version. Version takes the form "$major.$minor.$patch"
   */
  sdkVersion?: string;
  /**
   * Possible unique matched link that server need to check before performing
   * fingerprint match. If passed link is short server need to expand the link.
   * If link is long server need to vslidate the link.
   */
  uniqueMatchLinkToCheck?: string;
  /**
   * Strong match page information. Disambiguates between default UI and custom
   * page to present when strong match succeeds/fails to find cookie.
   */
  visualStyle?:  | "UNKNOWN_VISUAL_STYLE" | "DEFAULT_STYLE" | "CUSTOM_STYLE";
}

function serializeGetIosPostInstallAttributionRequest(data: any): GetIosPostInstallAttributionRequest {
  return {
    ...data,
    appInstallationTime: data["appInstallationTime"] !== undefined ? String(data["appInstallationTime"]) : undefined,
    device: data["device"] !== undefined ? serializeDeviceInfo(data["device"]) : undefined,
  };
}

function deserializeGetIosPostInstallAttributionRequest(data: any): GetIosPostInstallAttributionRequest {
  return {
    ...data,
    appInstallationTime: data["appInstallationTime"] !== undefined ? BigInt(data["appInstallationTime"]) : undefined,
    device: data["device"] !== undefined ? deserializeDeviceInfo(data["device"]) : undefined,
  };
}

/**
 * Response for iSDK to execute strong match flow for post-install attribution.
 */
export interface GetIosPostInstallAttributionResponse {
  /**
   * The minimum version for app, specified by dev through ?imv= parameter.
   * Return to iSDK to allow app to evaluate if current version meets this.
   */
  appMinimumVersion?: string;
  /**
   * The confidence of the returned attribution.
   */
  attributionConfidence?:  | "UNKNOWN_ATTRIBUTION_CONFIDENCE" | "WEAK" | "DEFAULT" | "UNIQUE";
  /**
   * The deep-link attributed post-install via one of several techniques
   * (fingerprint, copy unique).
   */
  deepLink?: string;
  /**
   * User-agent specific custom-scheme URIs for iSDK to open. This will be set
   * according to the user-agent tha the click was originally made in. There is
   * no Safari-equivalent custom-scheme open URLs. ie:
   * googlechrome://www.example.com ie:
   * firefox://open-url?url=http://www.example.com ie: opera-http://example.com
   */
  externalBrowserDestinationLink?: string;
  /**
   * The link to navigate to update the app if min version is not met. This is
   * either (in order): 1) fallback link (from ?ifl= parameter, if specified by
   * developer) or 2) AppStore URL (from ?isi= parameter, if specified), or 3)
   * the payload link (from required link= parameter).
   */
  fallbackLink?: string;
  /**
   * Invitation ID attributed post-install via one of several techniques
   * (fingerprint, copy unique).
   */
  invitationId?: string;
  /**
   * Instruction for iSDK to attemmpt to perform strong match. For instance, if
   * browser does not support/allow cookie or outside of support browsers, this
   * will be false.
   */
  isStrongMatchExecutable?: boolean;
  /**
   * Describes why match failed, ie: "discarded due to low confidence". This
   * message will be publicly visible.
   */
  matchMessage?: string;
  /**
   * Entire FDL (short or long) attributed post-install via one of several
   * techniques (fingerprint, copy unique).
   */
  requestedLink?: string;
  /**
   * Which IP version the request was made from.
   */
  requestIpVersion?:  | "UNKNOWN_IP_VERSION" | "IP_V4" | "IP_V6";
  /**
   * The entire FDL, expanded from a short link. It is the same as the
   * requested_link, if it is long. Parameters from this should not be used
   * directly (ie: server can default utm_[campaign|medium|source] to a value
   * when requested_link lack them, server determine the best fallback_link when
   * requested_link specifies >1 fallback links).
   */
  resolvedLink?: string;
  /**
   * Scion campaign value to be propagated by iSDK to Scion at post-install.
   */
  utmCampaign?: string;
  /**
   * Scion content value to be propagated by iSDK to Scion at app-reopen.
   */
  utmContent?: string;
  /**
   * Scion medium value to be propagated by iSDK to Scion at post-install.
   */
  utmMedium?: string;
  /**
   * Scion source value to be propagated by iSDK to Scion at post-install.
   */
  utmSource?: string;
  /**
   * Scion term value to be propagated by iSDK to Scion at app-reopen.
   */
  utmTerm?: string;
}

/**
 * Request for iSDK to get reopen attribution for app universal link open
 * deeplinking. This endpoint is meant for only iOS requests.
 */
export interface GetIosReopenAttributionRequest {
  /**
   * APP bundle ID.
   */
  bundleId?: string;
  /**
   * FDL link to be verified from an app universal link open. The FDL link can
   * be one of: 1) short FDL. e.g. .page.link/, or 2) long FDL. e.g.
   * .page.link/?{query params}, or 3) Invite FDL. e.g. .page.link/i/
   */
  requestedLink?: string;
  /**
   * Google SDK version. Version takes the form "$major.$minor.$patch"
   */
  sdkVersion?: string;
}

/**
 * Response for iSDK to get reopen attribution for app universal link open
 * deeplinking. This endpoint is meant for only iOS requests.
 */
export interface GetIosReopenAttributionResponse {
  /**
   * The deep-link attributed the app universal link open. For both regular FDL
   * links and invite FDL links.
   */
  deepLink?: string;
  /**
   * Optional invitation ID, for only invite typed requested FDL links.
   */
  invitationId?: string;
  /**
   * FDL input value of the "&imv=" parameter, minimum app version to be
   * returned to Google Firebase SDK running on iOS-9.
   */
  iosMinAppVersion?: string;
  /**
   * The entire FDL, expanded from a short link. It is the same as the
   * requested_link, if it is long.
   */
  resolvedLink?: string;
  /**
   * Scion campaign value to be propagated by iSDK to Scion at app-reopen.
   */
  utmCampaign?: string;
  /**
   * Scion content value to be propagated by iSDK to Scion at app-reopen.
   */
  utmContent?: string;
  /**
   * Scion medium value to be propagated by iSDK to Scion at app-reopen.
   */
  utmMedium?: string;
  /**
   * Scion source value to be propagated by iSDK to Scion at app-reopen.
   */
  utmSource?: string;
  /**
   * Scion term value to be propagated by iSDK to Scion at app-reopen.
   */
  utmTerm?: string;
}

/**
 * Parameters for Google Play Campaign Measurements. [Learn
 * more](https://developers.google.com/analytics/devguides/collection/android/v4/campaigns#campaign-params)
 */
export interface GooglePlayAnalytics {
  /**
   * Deprecated; FDL SDK does not process nor log it.
   */
  gclid?: string;
  /**
   * Campaign name; used for keyword analysis to identify a specific product
   * promotion or strategic campaign.
   */
  utmCampaign?: string;
  /**
   * Campaign content; used for A/B testing and content-targeted ads to
   * differentiate ads or links that point to the same URL.
   */
  utmContent?: string;
  /**
   * Campaign medium; used to identify a medium such as email or
   * cost-per-click.
   */
  utmMedium?: string;
  /**
   * Campaign source; used to identify a search engine, newsletter, or other
   * source.
   */
  utmSource?: string;
  /**
   * Campaign term; used with paid search to supply the keywords for ads.
   */
  utmTerm?: string;
}

/**
 * iOS related attributes to the Dynamic Link..
 */
export interface IosInfo {
  /**
   * iOS App Store ID.
   */
  iosAppStoreId?: string;
  /**
   * iOS bundle ID of the app.
   */
  iosBundleId?: string;
  /**
   * Custom (destination) scheme to use for iOS. By default, we’ll use the
   * bundle ID as the custom scheme. Developer can override this behavior using
   * this param.
   */
  iosCustomScheme?: string;
  /**
   * Link to open on iOS if the app is not installed.
   */
  iosFallbackLink?: string;
  /**
   * iPad bundle ID of the app.
   */
  iosIpadBundleId?: string;
  /**
   * If specified, this overrides the ios_fallback_link value on iPads.
   */
  iosIpadFallbackLink?: string;
  /**
   * iOS minimum version.
   */
  iosMinimumVersion?: string;
}

/**
 * Parameters for iTunes Connect App Analytics.
 */
export interface ITunesConnectAnalytics {
  /**
   * Affiliate token used to create affiliate-coded links.
   */
  at?: string;
  /**
   * Campaign text that developers can optionally add to any link in order to
   * track sales from a specific marketing campaign.
   */
  ct?: string;
  /**
   * iTune media types, including music, podcasts, audiobooks and so on.
   */
  mt?: string;
  /**
   * Provider token that enables analytics for Dynamic Links from within iTunes
   * Connect.
   */
  pt?: string;
}

/**
 * Managed Short Link.
 */
export interface ManagedShortLink {
  /**
   * Creation timestamp of the short link.
   */
  creationTime?: Date;
  /**
   * Attributes that have been flagged about this short url.
   */
  flaggedAttribute?:  | "UNSPECIFIED_ATTRIBUTE" | "SPAM"[];
  /**
   * Full Dyamic Link info
   */
  info?: DynamicLinkInfo;
  /**
   * Short durable link url, for example, "https://sample.app.goo.gl/xyz123".
   * Required.
   */
  link?: string;
  /**
   * Link name defined by the creator. Required.
   */
  linkName?: string;
  /**
   * Visibility status of link.
   */
  visibility?:  | "UNSPECIFIED_VISIBILITY" | "UNARCHIVED" | "ARCHIVED" | "NEVER_SHOWN";
}

function serializeManagedShortLink(data: any): ManagedShortLink {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
  };
}

function deserializeManagedShortLink(data: any): ManagedShortLink {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
  };
}

/**
 * Information of navigation behavior.
 */
export interface NavigationInfo {
  /**
   * If this option is on, FDL click will be forced to redirect rather than
   * show an interstitial page.
   */
  enableForcedRedirect?: boolean;
}

/**
 * Parameters for social meta tag params. Used to set meta tag data for link
 * previews on social sites.
 */
export interface SocialMetaTagInfo {
  /**
   * A short description of the link. Optional.
   */
  socialDescription?: string;
  /**
   * An image url string. Optional.
   */
  socialImageLink?: string;
  /**
   * Title to be displayed. Optional.
   */
  socialTitle?: string;
}

/**
 * Short Dynamic Link suffix.
 */
export interface Suffix {
  /**
   * Only applies to Option.CUSTOM.
   */
  customSuffix?: string;
  /**
   * Suffix option.
   */
  option?:  | "OPTION_UNSPECIFIED" | "UNGUESSABLE" | "SHORT" | "CUSTOM";
}

/**
 * Additional options for FirebaseDynamicLinks#v1GetLinkStats.
 */
export interface V1GetLinkStatsOptions {
  /**
   * The span of time requested in days.
   */
  durationDays?: bigint;
  /**
   * Google SDK version. Version takes the form "$major.$minor.$patch"
   */
  sdkVersion?: string;
}

function serializeV1GetLinkStatsOptions(data: any): V1GetLinkStatsOptions {
  return {
    ...data,
    durationDays: data["durationDays"] !== undefined ? String(data["durationDays"]) : undefined,
  };
}

function deserializeV1GetLinkStatsOptions(data: any): V1GetLinkStatsOptions {
  return {
    ...data,
    durationDays: data["durationDays"] !== undefined ? BigInt(data["durationDays"]) : undefined,
  };
}