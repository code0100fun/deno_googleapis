// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * AdSense Host API Client for Deno
 * ================================
 * 
 * Generates performance reports, generates ad codes, and provides publisher management capabilities for AdSense Hosts.
 * 
 * Docs: https://developers.google.com/adsense/host/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Generates performance reports, generates ad codes, and provides publisher
 * management capabilities for AdSense Hosts.
 */
export class AdSenseHost {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/adsensehost/v4.1/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Get information about one of the ad clients in the specified publisher's
   * AdSense account.
   *
   * @param accountId Account which contains the ad client.
   * @param adClientId Ad client to get.
   */
  async accountsAdclientsGet(accountId: string, adClientId: string): Promise<AdClient> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClient;
  }

  /**
   * List all hosted ad clients in the specified hosted account.
   *
   * @param accountId Account for which to list ad clients.
   */
  async accountsAdclientsList(accountId: string, opts: AccountsAdclientsListOptions = {}): Promise<AdClients> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClients;
  }

  /**
   * Delete the specified ad unit from the specified publisher AdSense account.
   *
   * @param accountId Account which contains the ad unit.
   * @param adClientId Ad client for which to get ad unit.
   * @param adUnitId Ad unit to delete.
   */
  async accountsAdunitsDelete(accountId: string, adClientId: string, adUnitId: string): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits/${ adUnitId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as AdUnit;
  }

  /**
   * Get the specified host ad unit in this AdSense account.
   *
   * @param accountId Account which contains the ad unit.
   * @param adClientId Ad client for which to get ad unit.
   * @param adUnitId Ad unit to get.
   */
  async accountsAdunitsGet(accountId: string, adClientId: string, adUnitId: string): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits/${ adUnitId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdUnit;
  }

  /**
   * Get ad code for the specified ad unit, attaching the specified host custom
   * channels.
   *
   * @param accountId Account which contains the ad client.
   * @param adClientId Ad client with contains the ad unit.
   * @param adUnitId Ad unit to get the code for.
   */
  async accountsAdunitsGetAdCode(accountId: string, adClientId: string, adUnitId: string, opts: AccountsAdunitsGetAdCodeOptions = {}): Promise<AdCode> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits/${ adUnitId }/adcode`);
    if (opts.hostCustomChannelId !== undefined) {
      url.searchParams.append("hostCustomChannelId", String(opts.hostCustomChannelId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdCode;
  }

  /**
   * Insert the supplied ad unit into the specified publisher AdSense account.
   *
   * @param accountId Account which will contain the ad unit.
   * @param adClientId Ad client into which to insert the ad unit.
   */
  async accountsAdunitsInsert(accountId: string, adClientId: string, req: AdUnit): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AdUnit;
  }

  /**
   * List all ad units in the specified publisher's AdSense account.
   *
   * @param accountId Account which contains the ad client.
   * @param adClientId Ad client for which to list ad units.
   */
  async accountsAdunitsList(accountId: string, adClientId: string, opts: AccountsAdunitsListOptions = {}): Promise<AdUnits> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits`);
    if (opts.includeInactive !== undefined) {
      url.searchParams.append("includeInactive", String(opts.includeInactive));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdUnits;
  }

  /**
   * Update the supplied ad unit in the specified publisher AdSense account.
   * This method supports patch semantics.
   *
   * @param accountId Account which contains the ad client.
   * @param adClientId Ad client which contains the ad unit.
   */
  async accountsAdunitsPatch(accountId: string, adClientId: string, req: AdUnit, opts: AccountsAdunitsPatchOptions = {}): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits`);
    if (opts.adUnitId !== undefined) {
      url.searchParams.append("adUnitId", String(opts.adUnitId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as AdUnit;
  }

  /**
   * Update the supplied ad unit in the specified publisher AdSense account.
   *
   * @param accountId Account which contains the ad client.
   * @param adClientId Ad client which contains the ad unit.
   */
  async accountsAdunitsUpdate(accountId: string, adClientId: string, req: AdUnit): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/adclients/${ adClientId }/adunits`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as AdUnit;
  }

  /**
   * Get information about the selected associated AdSense account.
   *
   * @param accountId Account to get information about.
   */
  async accountsGet(accountId: string): Promise<Account> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Account;
  }

  /**
   * List hosted accounts associated with this AdSense account by ad client id.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<Accounts> {
    const url = new URL(`${this.#baseUrl}accounts`);
    if (opts.filterAdClientId !== undefined) {
      url.searchParams.append("filterAdClientId", String(opts.filterAdClientId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Accounts;
  }

  /**
   * Generate an AdSense report based on the report request sent in the query
   * parameters. Returns the result as JSON; to retrieve output in CSV format
   * specify "alt=csv" as a query parameter.
   *
   * @param accountId Hosted account upon which to report.
   */
  async accountsReportsGenerate(accountId: string, opts: AccountsReportsGenerateOptions = {}): Promise<Report> {
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/reports`);
    if (opts.dimension !== undefined) {
      url.searchParams.append("dimension", String(opts.dimension));
    }
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.metric !== undefined) {
      url.searchParams.append("metric", String(opts.metric));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReport(data);
  }

  /**
   * Get information about one of the ad clients in the Host AdSense account.
   *
   * @param adClientId Ad client to get.
   */
  async adclientsGet(adClientId: string): Promise<AdClient> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClient;
  }

  /**
   * List all host ad clients in this AdSense account.
   *
   */
  async adclientsList(opts: AdclientsListOptions = {}): Promise<AdClients> {
    const url = new URL(`${this.#baseUrl}adclients`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClients;
  }

  /**
   * Create an association session for initiating an association with an
   * AdSense user.
   *
   */
  async associationsessionsStart(opts: AssociationsessionsStartOptions = {}): Promise<AssociationSession> {
    const url = new URL(`${this.#baseUrl}associationsessions/start`);
    if (opts.callbackUrl !== undefined) {
      url.searchParams.append("callbackUrl", String(opts.callbackUrl));
    }
    if (opts.productCode !== undefined) {
      url.searchParams.append("productCode", String(opts.productCode));
    }
    if (opts.userLocale !== undefined) {
      url.searchParams.append("userLocale", String(opts.userLocale));
    }
    if (opts.websiteLocale !== undefined) {
      url.searchParams.append("websiteLocale", String(opts.websiteLocale));
    }
    if (opts.websiteUrl !== undefined) {
      url.searchParams.append("websiteUrl", String(opts.websiteUrl));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AssociationSession;
  }

  /**
   * Verify an association session after the association callback returns from
   * AdSense signup.
   *
   */
  async associationsessionsVerify(opts: AssociationsessionsVerifyOptions = {}): Promise<AssociationSession> {
    const url = new URL(`${this.#baseUrl}associationsessions/verify`);
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AssociationSession;
  }

  /**
   * Delete a specific custom channel from the host AdSense account.
   *
   * @param adClientId Ad client from which to delete the custom channel.
   * @param customChannelId Custom channel to delete.
   */
  async customchannelsDelete(adClientId: string, customChannelId: string): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels/${ customChannelId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as CustomChannel;
  }

  /**
   * Get a specific custom channel from the host AdSense account.
   *
   * @param adClientId Ad client from which to get the custom channel.
   * @param customChannelId Custom channel to get.
   */
  async customchannelsGet(adClientId: string, customChannelId: string): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels/${ customChannelId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomChannel;
  }

  /**
   * Add a new custom channel to the host AdSense account.
   *
   * @param adClientId Ad client to which the new custom channel will be added.
   */
  async customchannelsInsert(adClientId: string, req: CustomChannel): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomChannel;
  }

  /**
   * List all host custom channels in this AdSense account.
   *
   * @param adClientId Ad client for which to list custom channels.
   */
  async customchannelsList(adClientId: string, opts: CustomchannelsListOptions = {}): Promise<CustomChannels> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomChannels;
  }

  /**
   * Update a custom channel in the host AdSense account. This method supports
   * patch semantics.
   *
   * @param adClientId Ad client in which the custom channel will be updated.
   */
  async customchannelsPatch(adClientId: string, req: CustomChannel, opts: CustomchannelsPatchOptions = {}): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels`);
    if (opts.customChannelId !== undefined) {
      url.searchParams.append("customChannelId", String(opts.customChannelId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CustomChannel;
  }

  /**
   * Update a custom channel in the host AdSense account.
   *
   * @param adClientId Ad client in which the custom channel will be updated.
   */
  async customchannelsUpdate(adClientId: string, req: CustomChannel): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/customchannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as CustomChannel;
  }

  /**
   * Generate an AdSense report based on the report request sent in the query
   * parameters. Returns the result as JSON; to retrieve output in CSV format
   * specify "alt=csv" as a query parameter.
   *
   */
  async reportsGenerate(opts: ReportsGenerateOptions = {}): Promise<Report> {
    const url = new URL(`${this.#baseUrl}reports`);
    if (opts.dimension !== undefined) {
      url.searchParams.append("dimension", String(opts.dimension));
    }
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.metric !== undefined) {
      url.searchParams.append("metric", String(opts.metric));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReport(data);
  }

  /**
   * Delete a URL channel from the host AdSense account.
   *
   * @param adClientId Ad client from which to delete the URL channel.
   * @param urlChannelId URL channel to delete.
   */
  async urlchannelsDelete(adClientId: string, urlChannelId: string): Promise<UrlChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/urlchannels/${ urlChannelId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as UrlChannel;
  }

  /**
   * Add a new URL channel to the host AdSense account.
   *
   * @param adClientId Ad client to which the new URL channel will be added.
   */
  async urlchannelsInsert(adClientId: string, req: UrlChannel): Promise<UrlChannel> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/urlchannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UrlChannel;
  }

  /**
   * List all host URL channels in the host AdSense account.
   *
   * @param adClientId Ad client for which to list URL channels.
   */
  async urlchannelsList(adClientId: string, opts: UrlchannelsListOptions = {}): Promise<UrlChannels> {
    const url = new URL(`${this.#baseUrl}adclients/${ adClientId }/urlchannels`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UrlChannels;
  }
}

export interface Account {
  /**
   * Unique identifier of this account.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#account.
   */
  kind?: string;
  /**
   * Name of this account.
   */
  name?: string;
  /**
   * Approval status of this account. One of: PENDING, APPROVED, DISABLED.
   */
  status?: string;
}

export interface Accounts {
  /**
   * ETag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The accounts returned in this list response.
   */
  items?: Account[];
  /**
   * Kind of list this is, in this case adsensehost#accounts.
   */
  kind?: string;
}

/**
 * Additional options for AdSenseHost#accountsAdclientsList.
 */
export interface AccountsAdclientsListOptions {
  /**
   * The maximum number of ad clients to include in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * A continuation token, used to page through ad clients. To retrieve the
   * next page, set this parameter to the value of "nextPageToken" from the
   * previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSenseHost#accountsAdunitsGetAdCode.
 */
export interface AccountsAdunitsGetAdCodeOptions {
  /**
   * Host custom channel to attach to the ad code.
   */
  hostCustomChannelId?: string;
}

/**
 * Additional options for AdSenseHost#accountsAdunitsList.
 */
export interface AccountsAdunitsListOptions {
  /**
   * Whether to include inactive ad units. Default: true.
   */
  includeInactive?: boolean;
  /**
   * The maximum number of ad units to include in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * A continuation token, used to page through ad units. To retrieve the next
   * page, set this parameter to the value of "nextPageToken" from the previous
   * response.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSenseHost#accountsAdunitsPatch.
 */
export interface AccountsAdunitsPatchOptions {
  /**
   * Ad unit to get.
   */
  adUnitId: string;
}

/**
 * Additional options for AdSenseHost#accountsList.
 */
export interface AccountsListOptions {
  /**
   * Ad clients to list accounts for.
   */
  filterAdClientId: string;
}

/**
 * Additional options for AdSenseHost#accountsReportsGenerate.
 */
export interface AccountsReportsGenerateOptions {
  /**
   * Dimensions to base the report on.
   */
  dimension?: string;
  /**
   * End of the date range to report on in "YYYY-MM-DD" format, inclusive.
   */
  endDate: string;
  /**
   * Filters to be run on the report.
   */
  filter?: string;
  /**
   * Optional locale to use for translating report output to a local language.
   * Defaults to "en_US" if not specified.
   */
  locale?: string;
  /**
   * The maximum number of rows of report data to return.
   */
  maxResults?: number;
  /**
   * Numeric columns to include in the report.
   */
  metric?: string;
  /**
   * The name of a dimension or metric to sort the resulting report on,
   * optionally prefixed with "+" to sort ascending or "-" to sort descending.
   * If no prefix is specified, the column is sorted ascending.
   */
  sort?: string;
  /**
   * Start of the date range to report on in "YYYY-MM-DD" format, inclusive.
   */
  startDate: string;
  /**
   * Index of the first row of report data to return.
   */
  startIndex?: number;
}

export interface AdClient {
  /**
   * Whether this ad client is opted in to ARC.
   */
  arcOptIn?: boolean;
  /**
   * Unique identifier of this ad client.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#adClient.
   */
  kind?: string;
  /**
   * This ad client's product code, which corresponds to the PRODUCT_CODE
   * report dimension.
   */
  productCode?: string;
  /**
   * Whether this ad client supports being reported on.
   */
  supportsReporting?: boolean;
}

export interface AdClients {
  /**
   * ETag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The ad clients returned in this list response.
   */
  items?: AdClient[];
  /**
   * Kind of list this is, in this case adsensehost#adClients.
   */
  kind?: string;
  /**
   * Continuation token used to page through ad clients. To retrieve the next
   * page of results, set the next request's "pageToken" value to this.
   */
  nextPageToken?: string;
}

/**
 * Additional options for AdSenseHost#adclientsList.
 */
export interface AdclientsListOptions {
  /**
   * The maximum number of ad clients to include in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * A continuation token, used to page through ad clients. To retrieve the
   * next page, set this parameter to the value of "nextPageToken" from the
   * previous response.
   */
  pageToken?: string;
}

export interface AdCode {
  /**
   * The ad code snippet.
   */
  adCode?: string;
  /**
   * Kind this is, in this case adsensehost#adCode.
   */
  kind?: string;
}

export interface AdStyle {
  /**
   * The colors included in the style. These are represented as six hexadecimal
   * characters, similar to HTML color codes, but without the leading hash.
   */
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    title?: string;
    url?: string;
  };
  /**
   * The style of the corners in the ad (deprecated: never populated, ignored).
   */
  corners?: string;
  /**
   * The font which is included in the style.
   */
  font?: {
    family?: string;
    size?: string;
  };
  /**
   * Kind this is, in this case adsensehost#adStyle.
   */
  kind?: string;
}

export interface AdUnit {
  /**
   * Identity code of this ad unit, not necessarily unique across ad clients.
   */
  code?: string;
  /**
   * Settings specific to content ads (AFC) and highend mobile content ads
   * (AFMC - deprecated).
   */
  contentAdsSettings?: {
    backupOption?: {
      color?: string;
      type?: string;
      url?: string;
    };
    size?: string;
    type?: string;
  };
  /**
   * Custom style information specific to this ad unit.
   */
  customStyle?: AdStyle;
  /**
   * Unique identifier of this ad unit. This should be considered an opaque
   * identifier; it is not safe to rely on it being in any particular format.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#adUnit.
   */
  kind?: string;
  /**
   * Settings specific to WAP mobile content ads (AFMC - deprecated).
   */
  mobileContentAdsSettings?: {
    markupLanguage?: string;
    scriptingLanguage?: string;
    size?: string;
    type?: string;
  };
  /**
   * Name of this ad unit.
   */
  name?: string;
  /**
   * Status of this ad unit. Possible values are: NEW: Indicates that the ad
   * unit was created within the last seven days and does not yet have any
   * activity associated with it. ACTIVE: Indicates that there has been activity
   * on this ad unit in the last seven days. INACTIVE: Indicates that there has
   * been no activity on this ad unit in the last seven days.
   */
  status?: string;
}

export interface AdUnits {
  /**
   * ETag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The ad units returned in this list response.
   */
  items?: AdUnit[];
  /**
   * Kind of list this is, in this case adsensehost#adUnits.
   */
  kind?: string;
  /**
   * Continuation token used to page through ad units. To retrieve the next
   * page of results, set the next request's "pageToken" value to this.
   */
  nextPageToken?: string;
}

export interface AssociationSession {
  /**
   * Hosted account id of the associated publisher after association. Present
   * if status is ACCEPTED.
   */
  accountId?: string;
  /**
   * Unique identifier of this association session.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#associationSession.
   */
  kind?: string;
  /**
   * The products to associate with the user. Options: AFC, AFG, AFV, AFS
   * (deprecated), AFMC (deprecated)
   */
  productCodes?: string[];
  /**
   * Redirect URL of this association session. Used to redirect users into the
   * AdSense association flow.
   */
  redirectUrl?: string;
  /**
   * Status of the completed association, available once the association
   * callback token has been verified. One of ACCEPTED, REJECTED, or ERROR.
   */
  status?: string;
  /**
   * The preferred locale of the user themselves when going through the AdSense
   * association flow.
   */
  userLocale?: string;
  /**
   * The locale of the user's hosted website.
   */
  websiteLocale?: string;
  /**
   * The URL of the user's hosted website.
   */
  websiteUrl?: string;
}

/**
 * Additional options for AdSenseHost#associationsessionsStart.
 */
export interface AssociationsessionsStartOptions {
  /**
   * The URL to redirect the user to once association is completed. It receives
   * a token parameter that can then be used to retrieve the associated account.
   */
  callbackUrl?: string;
  /**
   * Products to associate with the user.
   */
  productCode:  | "AFC" | "AFG" | "AFMC" | "AFS" | "AFV";
  /**
   * The preferred locale of the user.
   */
  userLocale?: string;
  /**
   * The locale of the user's hosted website.
   */
  websiteLocale?: string;
  /**
   * The URL of the user's hosted website.
   */
  websiteUrl: string;
}

/**
 * Additional options for AdSenseHost#associationsessionsVerify.
 */
export interface AssociationsessionsVerifyOptions {
  /**
   * The token returned to the association callback URL.
   */
  token: string;
}

export interface CustomChannel {
  /**
   * Code of this custom channel, not necessarily unique across ad clients.
   */
  code?: string;
  /**
   * Unique identifier of this custom channel. This should be considered an
   * opaque identifier; it is not safe to rely on it being in any particular
   * format.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#customChannel.
   */
  kind?: string;
  /**
   * Name of this custom channel.
   */
  name?: string;
}

export interface CustomChannels {
  /**
   * ETag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The custom channels returned in this list response.
   */
  items?: CustomChannel[];
  /**
   * Kind of list this is, in this case adsensehost#customChannels.
   */
  kind?: string;
  /**
   * Continuation token used to page through custom channels. To retrieve the
   * next page of results, set the next request's "pageToken" value to this.
   */
  nextPageToken?: string;
}

/**
 * Additional options for AdSenseHost#customchannelsList.
 */
export interface CustomchannelsListOptions {
  /**
   * The maximum number of custom channels to include in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * A continuation token, used to page through custom channels. To retrieve
   * the next page, set this parameter to the value of "nextPageToken" from the
   * previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSenseHost#customchannelsPatch.
 */
export interface CustomchannelsPatchOptions {
  /**
   * Custom channel to get.
   */
  customChannelId: string;
}

export interface Report {
  /**
   * The averages of the report. This is the same length as any other row in
   * the report; cells corresponding to dimension columns are empty.
   */
  averages?: string[];
  /**
   * The header information of the columns requested in the report. This is a
   * list of headers; one for each dimension in the request, followed by one for
   * each metric in the request.
   */
  headers?: {
    currency?: string;
    name?: string;
    type?: string;
  }[];
  /**
   * Kind this is, in this case adsensehost#report.
   */
  kind?: string;
  /**
   * The output rows of the report. Each row is a list of cells; one for each
   * dimension in the request, followed by one for each metric in the request.
   * The dimension cells contain strings, and the metric cells contain numbers.
   */
  rows?: string[][];
  /**
   * The total number of rows matched by the report request. Fewer rows may be
   * returned in the response due to being limited by the row count requested or
   * the report row limit.
   */
  totalMatchedRows?: bigint;
  /**
   * The totals of the report. This is the same length as any other row in the
   * report; cells corresponding to dimension columns are empty.
   */
  totals?: string[];
  /**
   * Any warnings associated with generation of the report.
   */
  warnings?: string[];
}

function serializeReport(data: any): Report {
  return {
    ...data,
    totalMatchedRows: data["totalMatchedRows"] !== undefined ? String(data["totalMatchedRows"]) : undefined,
  };
}

function deserializeReport(data: any): Report {
  return {
    ...data,
    totalMatchedRows: data["totalMatchedRows"] !== undefined ? BigInt(data["totalMatchedRows"]) : undefined,
  };
}

/**
 * Additional options for AdSenseHost#reportsGenerate.
 */
export interface ReportsGenerateOptions {
  /**
   * Dimensions to base the report on.
   */
  dimension?: string;
  /**
   * End of the date range to report on in "YYYY-MM-DD" format, inclusive.
   */
  endDate: string;
  /**
   * Filters to be run on the report.
   */
  filter?: string;
  /**
   * Optional locale to use for translating report output to a local language.
   * Defaults to "en_US" if not specified.
   */
  locale?: string;
  /**
   * The maximum number of rows of report data to return.
   */
  maxResults?: number;
  /**
   * Numeric columns to include in the report.
   */
  metric?: string;
  /**
   * The name of a dimension or metric to sort the resulting report on,
   * optionally prefixed with "+" to sort ascending or "-" to sort descending.
   * If no prefix is specified, the column is sorted ascending.
   */
  sort?: string;
  /**
   * Start of the date range to report on in "YYYY-MM-DD" format, inclusive.
   */
  startDate: string;
  /**
   * Index of the first row of report data to return.
   */
  startIndex?: number;
}

export interface UrlChannel {
  /**
   * Unique identifier of this URL channel. This should be considered an opaque
   * identifier; it is not safe to rely on it being in any particular format.
   */
  id?: string;
  /**
   * Kind of resource this is, in this case adsensehost#urlChannel.
   */
  kind?: string;
  /**
   * URL Pattern of this URL channel. Does not include "http://" or "https://".
   * Example: www.example.com/home
   */
  urlPattern?: string;
}

export interface UrlChannels {
  /**
   * ETag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The URL channels returned in this list response.
   */
  items?: UrlChannel[];
  /**
   * Kind of list this is, in this case adsensehost#urlChannels.
   */
  kind?: string;
  /**
   * Continuation token used to page through URL channels. To retrieve the next
   * page of results, set the next request's "pageToken" value to this.
   */
  nextPageToken?: string;
}

/**
 * Additional options for AdSenseHost#urlchannelsList.
 */
export interface UrlchannelsListOptions {
  /**
   * The maximum number of URL channels to include in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * A continuation token, used to page through URL channels. To retrieve the
   * next page, set this parameter to the value of "nextPageToken" from the
   * previous response.
   */
  pageToken?: string;
}