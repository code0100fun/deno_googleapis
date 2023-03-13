// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * AdSense Management API Client for Deno
 * ======================================
 * 
 * The AdSense Management API allows publishers to access their inventory and run earnings and performance reports.
 * 
 * Docs: https://developers.google.com/adsense/management/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The AdSense Management API allows publishers to access their inventory and
 * run earnings and performance reports.
 */
export class AdSense {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://adsense.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an ad unit. This method can only be used by projects enabled for
   * the [AdSense for
   * Platforms](https://developers.google.com/adsense/platforms/) product. Note
   * that ad units can only be created for ad clients with an "AFC" product
   * code. For more info see the [AdClient
   * resource](/adsense/management/reference/rest/v2/accounts.adclients). For
   * now, this method can only be used to create `DISPLAY` ad units. See:
   * https://support.google.com/adsense/answer/9183566
   *
   * @param parent Required. Ad client to create an ad unit under. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsAdunitsCreate(parent: string, req: AdUnit): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/adunits`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AdUnit;
  }

  /**
   * Gets an ad unit from a specified account and ad client.
   *
   * @param name Required. AdUnit to get information about. Format: accounts/{account}/adclients/{adclient}/adunits/{adunit}
   */
  async accountsAdclientsAdunitsGet(name: string): Promise<AdUnit> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdUnit;
  }

  /**
   * Gets the ad unit code for a given ad unit. For more information, see
   * [About the AdSense code](https://support.google.com/adsense/answer/9274634)
   * and [Where to place the ad code in your
   * HTML](https://support.google.com/adsense/answer/9190028).
   *
   * @param name Required. Name of the adunit for which to get the adcode. Format: accounts/{account}/adclients/{adclient}/adunits/{adunit}
   */
  async accountsAdclientsAdunitsGetAdcode(name: string): Promise<AdUnitAdCode> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/adcode`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdUnitAdCode;
  }

  /**
   * Lists all ad units under a specified account and ad client.
   *
   * @param parent Required. The ad client which owns the collection of ad units. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsAdunitsList(parent: string, opts: AccountsAdclientsAdunitsListOptions = {}): Promise<ListAdUnitsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/adunits`);
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
   * Lists all the custom channels available for an ad unit.
   *
   * @param parent Required. The ad unit which owns the collection of custom channels. Format: accounts/{account}/adclients/{adclient}/adunits/{adunit}
   */
  async accountsAdclientsAdunitsListLinkedCustomChannels(parent: string, opts: AccountsAdclientsAdunitsListLinkedCustomChannelsOptions = {}): Promise<ListLinkedCustomChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }:listLinkedCustomChannels`);
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
    return data as ListLinkedCustomChannelsResponse;
  }

  /**
   * Updates an ad unit. This method can only be used by projects enabled for
   * the [AdSense for
   * Platforms](https://developers.google.com/adsense/platforms/) product. For
   * now, this method can only be used to update `DISPLAY` ad units. See:
   * https://support.google.com/adsense/answer/9183566
   *
   * @param name Output only. Resource name of the ad unit. Format: accounts/{account}/adclients/{adclient}/adunits/{adunit}
   */
  async accountsAdclientsAdunitsPatch(name: string, req: AdUnit, opts: AccountsAdclientsAdunitsPatchOptions = {}): Promise<AdUnit> {
    opts = serializeAccountsAdclientsAdunitsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a custom channel. This method can only be used by projects enabled
   * for the [AdSense for
   * Platforms](https://developers.google.com/adsense/platforms/) product.
   *
   * @param parent Required. The ad client to create a custom channel under. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsCustomchannelsCreate(parent: string, req: CustomChannel): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/customchannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomChannel;
  }

  /**
   * Deletes a custom channel. This method can only be used by projects enabled
   * for the [AdSense for
   * Platforms](https://developers.google.com/adsense/platforms/) product.
   *
   * @param name Required. Name of the custom channel to delete. Format: accounts/{account}/adclients/{adclient}/customchannels/{customchannel}
   */
  async accountsAdclientsCustomchannelsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about the selected custom channel.
   *
   * @param name Required. Name of the custom channel. Format: accounts/{account}/adclients/{adclient}/customchannels/{customchannel}
   */
  async accountsAdclientsCustomchannelsGet(name: string): Promise<CustomChannel> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomChannel;
  }

  /**
   * Lists all the custom channels available in an ad client.
   *
   * @param parent Required. The ad client which owns the collection of custom channels. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsCustomchannelsList(parent: string, opts: AccountsAdclientsCustomchannelsListOptions = {}): Promise<ListCustomChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/customchannels`);
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
    return data as ListCustomChannelsResponse;
  }

  /**
   * Lists all the ad units available for a custom channel.
   *
   * @param parent Required. The custom channel which owns the collection of ad units. Format: accounts/{account}/adclients/{adclient}/customchannels/{customchannel}
   */
  async accountsAdclientsCustomchannelsListLinkedAdUnits(parent: string, opts: AccountsAdclientsCustomchannelsListLinkedAdUnitsOptions = {}): Promise<ListLinkedAdUnitsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }:listLinkedAdUnits`);
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
    return data as ListLinkedAdUnitsResponse;
  }

  /**
   * Updates a custom channel. This method can only be used by projects enabled
   * for the [AdSense for
   * Platforms](https://developers.google.com/adsense/platforms/) product.
   *
   * @param name Output only. Resource name of the custom channel. Format: accounts/{account}/adclients/{adclient}/customchannels/{customchannel}
   */
  async accountsAdclientsCustomchannelsPatch(name: string, req: CustomChannel, opts: AccountsAdclientsCustomchannelsPatchOptions = {}): Promise<CustomChannel> {
    opts = serializeAccountsAdclientsCustomchannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Gets the ad client from the given resource name.
   *
   * @param name Required. The name of the ad client to retrieve. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsGet(name: string): Promise<AdClient> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClient;
  }

  /**
   * Gets the AdSense code for a given ad client. This returns what was
   * previously known as the 'auto ad code'. This is only supported for ad
   * clients with a product_code of AFC. For more information, see [About the
   * AdSense code](https://support.google.com/adsense/answer/9274634).
   *
   * @param name Required. Name of the ad client for which to get the adcode. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsGetAdcode(name: string): Promise<AdClientAdCode> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/adcode`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdClientAdCode;
  }

  /**
   * Lists all the ad clients available in an account.
   *
   * @param parent Required. The account which owns the collection of ad clients. Format: accounts/{account}
   */
  async accountsAdclientsList(parent: string, opts: AccountsAdclientsListOptions = {}): Promise<ListAdClientsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/adclients`);
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
    return data as ListAdClientsResponse;
  }

  /**
   * Gets information about the selected url channel.
   *
   * @param name Required. The name of the url channel to retrieve. Format: accounts/{account}/adclients/{adclient}/urlchannels/{urlchannel}
   */
  async accountsAdclientsUrlchannelsGet(name: string): Promise<UrlChannel> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UrlChannel;
  }

  /**
   * Lists active url channels.
   *
   * @param parent Required. The ad client which owns the collection of url channels. Format: accounts/{account}/adclients/{adclient}
   */
  async accountsAdclientsUrlchannelsList(parent: string, opts: AccountsAdclientsUrlchannelsListOptions = {}): Promise<ListUrlChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/urlchannels`);
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
    return data as ListUrlChannelsResponse;
  }

  /**
   * Lists all the alerts available in an account.
   *
   * @param parent Required. The account which owns the collection of alerts. Format: accounts/{account}
   */
  async accountsAlertsList(parent: string, opts: AccountsAlertsListOptions = {}): Promise<ListAlertsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/alerts`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAlertsResponse;
  }

  /**
   * Gets information about the selected AdSense account.
   *
   * @param name Required. Account to get information about. Format: accounts/{account}
   */
  async accountsGet(name: string): Promise<Account> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Account;
  }

  /**
   * Gets the ad blocking recovery tag of an account.
   *
   * @param name Required. The name of the account to get the tag for. Format: accounts/{account}
   */
  async accountsGetAdBlockingRecoveryTag(name: string): Promise<AdBlockingRecoveryTag> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/adBlockingRecoveryTag`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdBlockingRecoveryTag;
  }

  /**
   * Lists all accounts available to this user.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<ListAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v2/accounts`);
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
    return data as ListAccountsResponse;
  }

  /**
   * Lists all accounts directly managed by the given AdSense account.
   *
   * @param parent Required. The parent account, which owns the child accounts. Format: accounts/{account}
   */
  async accountsListChildAccounts(parent: string, opts: AccountsListChildAccountsOptions = {}): Promise<ListChildAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }:listChildAccounts`);
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
    return data as ListChildAccountsResponse;
  }

  /**
   * Lists all the payments available for an account.
   *
   * @param parent Required. The account which owns the collection of payments. Format: accounts/{account}
   */
  async accountsPaymentsList(parent: string): Promise<ListPaymentsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/payments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListPaymentsResponse;
  }

  /**
   * Generates an ad hoc report.
   *
   * @param account Required. The account which owns the collection of reports. Format: accounts/{account}
   */
  async accountsReportsGenerate(account: string, opts: AccountsReportsGenerateOptions = {}): Promise<ReportResult> {
    const url = new URL(`${this.#baseUrl}v2/${ account }/reports:generate`);
    if (opts.currencyCode !== undefined) {
      url.searchParams.append("currencyCode", String(opts.currencyCode));
    }
    if (opts.dateRange !== undefined) {
      url.searchParams.append("dateRange", String(opts.dateRange));
    }
    if (opts.dimensions !== undefined) {
      url.searchParams.append("dimensions", String(opts.dimensions));
    }
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.metrics !== undefined) {
      url.searchParams.append("metrics", String(opts.metrics));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.reportingTimeZone !== undefined) {
      url.searchParams.append("reportingTimeZone", String(opts.reportingTimeZone));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReportResult(data);
  }

  /**
   * Generates a csv formatted ad hoc report.
   *
   * @param account Required. The account which owns the collection of reports. Format: accounts/{account}
   */
  async accountsReportsGenerateCsv(account: string, opts: AccountsReportsGenerateCsvOptions = {}): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v2/${ account }/reports:generateCsv`);
    if (opts.currencyCode !== undefined) {
      url.searchParams.append("currencyCode", String(opts.currencyCode));
    }
    if (opts.dateRange !== undefined) {
      url.searchParams.append("dateRange", String(opts.dateRange));
    }
    if (opts.dimensions !== undefined) {
      url.searchParams.append("dimensions", String(opts.dimensions));
    }
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.metrics !== undefined) {
      url.searchParams.append("metrics", String(opts.metrics));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.reportingTimeZone !== undefined) {
      url.searchParams.append("reportingTimeZone", String(opts.reportingTimeZone));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the saved report from the given resource name.
   *
   * @param name Required. The name of the saved report to retrieve. Format: accounts/{account}/reports/{report}
   */
  async accountsReportsGetSaved(name: string): Promise<SavedReport> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/saved`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SavedReport;
  }

  /**
   * Generates a saved report.
   *
   * @param name Required. Name of the saved report. Format: accounts/{account}/reports/{report}
   */
  async accountsReportsSavedGenerate(name: string, opts: AccountsReportsSavedGenerateOptions = {}): Promise<ReportResult> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/saved:generate`);
    if (opts.currencyCode !== undefined) {
      url.searchParams.append("currencyCode", String(opts.currencyCode));
    }
    if (opts.dateRange !== undefined) {
      url.searchParams.append("dateRange", String(opts.dateRange));
    }
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.reportingTimeZone !== undefined) {
      url.searchParams.append("reportingTimeZone", String(opts.reportingTimeZone));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReportResult(data);
  }

  /**
   * Generates a csv formatted saved report.
   *
   * @param name Required. Name of the saved report. Format: accounts/{account}/reports/{report}
   */
  async accountsReportsSavedGenerateCsv(name: string, opts: AccountsReportsSavedGenerateCsvOptions = {}): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/saved:generateCsv`);
    if (opts.currencyCode !== undefined) {
      url.searchParams.append("currencyCode", String(opts.currencyCode));
    }
    if (opts.dateRange !== undefined) {
      url.searchParams.append("dateRange", String(opts.dateRange));
    }
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.reportingTimeZone !== undefined) {
      url.searchParams.append("reportingTimeZone", String(opts.reportingTimeZone));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Lists saved reports.
   *
   * @param parent Required. The account which owns the collection of reports. Format: accounts/{account}
   */
  async accountsReportsSavedList(parent: string, opts: AccountsReportsSavedListOptions = {}): Promise<ListSavedReportsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/reports/saved`);
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
    return data as ListSavedReportsResponse;
  }

  /**
   * Gets information about the selected site.
   *
   * @param name Required. Name of the site. Format: accounts/{account}/sites/{site}
   */
  async accountsSitesGet(name: string): Promise<Site> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Site;
  }

  /**
   * Lists all the sites available in an account.
   *
   * @param parent Required. The account which owns the collection of sites. Format: accounts/{account}
   */
  async accountsSitesList(parent: string, opts: AccountsSitesListOptions = {}): Promise<ListSitesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sites`);
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
    return data as ListSitesResponse;
  }
}

/**
 * Representation of an account.
 */
export interface Account {
  /**
   * Output only. Creation time of the account.
   */
  readonly createTime?: Date;
  /**
   * Output only. Display name of this account.
   */
  readonly displayName?: string;
  /**
   * Output only. Resource name of the account. Format: accounts/pub-[0-9]+
   */
  readonly name?: string;
  /**
   * Output only. Outstanding tasks that need to be completed as part of the
   * sign-up process for a new account. e.g. "billing-profile-creation",
   * "phone-pin-verification".
   */
  readonly pendingTasks?: string[];
  /**
   * Output only. Whether this account is premium.
   */
  readonly premium?: boolean;
  /**
   * Output only. State of the account.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "READY" | "NEEDS_ATTENTION" | "CLOSED";
  /**
   * The account time zone, as used by reporting. For more information, see
   * [changing the time zone of your
   * reports](https://support.google.com/adsense/answer/9830725).
   */
  timeZone?: TimeZone;
}

/**
 * Additional options for
 * AdSense#accountsAdclientsAdunitsListLinkedCustomChannels.
 */
export interface AccountsAdclientsAdunitsListLinkedCustomChannelsOptions {
  /**
   * The maximum number of custom channels to include in the response, used for
   * paging. If unspecified, at most 10000 custom channels will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListLinkedCustomChannels` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListLinkedCustomChannels` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAdclientsAdunitsList.
 */
export interface AccountsAdclientsAdunitsListOptions {
  /**
   * The maximum number of ad units to include in the response, used for
   * paging. If unspecified, at most 10000 ad units will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAdUnits` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAdUnits` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAdclientsAdunitsPatch.
 */
export interface AccountsAdclientsAdunitsPatchOptions {
  /**
   * The list of fields to update. If empty, a full update is performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsAdclientsAdunitsPatchOptions(data: any): AccountsAdclientsAdunitsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsAdclientsAdunitsPatchOptions(data: any): AccountsAdclientsAdunitsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * AdSense#accountsAdclientsCustomchannelsListLinkedAdUnits.
 */
export interface AccountsAdclientsCustomchannelsListLinkedAdUnitsOptions {
  /**
   * The maximum number of ad units to include in the response, used for
   * paging. If unspecified, at most 10000 ad units will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListLinkedAdUnits` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListLinkedAdUnits` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAdclientsCustomchannelsList.
 */
export interface AccountsAdclientsCustomchannelsListOptions {
  /**
   * The maximum number of custom channels to include in the response, used for
   * paging. If unspecified, at most 10000 custom channels will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListCustomChannels` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListCustomChannels` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAdclientsCustomchannelsPatch.
 */
export interface AccountsAdclientsCustomchannelsPatchOptions {
  /**
   * The list of fields to update. If empty, a full update is performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsAdclientsCustomchannelsPatchOptions(data: any): AccountsAdclientsCustomchannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsAdclientsCustomchannelsPatchOptions(data: any): AccountsAdclientsCustomchannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AdSense#accountsAdclientsList.
 */
export interface AccountsAdclientsListOptions {
  /**
   * The maximum number of ad clients to include in the response, used for
   * paging. If unspecified, at most 10000 ad clients will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAdClients` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAdClients` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAdclientsUrlchannelsList.
 */
export interface AccountsAdclientsUrlchannelsListOptions {
  /**
   * The maximum number of url channels to include in the response, used for
   * paging. If unspecified, at most 10000 url channels will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListUrlChannels` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListUrlChannels` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsAlertsList.
 */
export interface AccountsAlertsListOptions {
  /**
   * The language to use for translating alert messages. If unspecified, this
   * defaults to the user's display language. If the given language is not
   * supported, alerts will be returned in English. The language is specified as
   * an [IETF BCP-47 language
   * code](https://en.wikipedia.org/wiki/IETF_language_tag).
   */
  languageCode?: string;
}

/**
 * Additional options for AdSense#accountsListChildAccounts.
 */
export interface AccountsListChildAccountsOptions {
  /**
   * The maximum number of accounts to include in the response, used for
   * paging. If unspecified, at most 10000 accounts will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAccounts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAccounts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsList.
 */
export interface AccountsListOptions {
  /**
   * The maximum number of accounts to include in the response, used for
   * paging. If unspecified, at most 10000 accounts will be returned. The
   * maximum value is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAccounts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAccounts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsReportsGenerateCsv.
 */
export interface AccountsReportsGenerateCsvOptions {
  /**
   * The [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) to
   * use when reporting on monetary metrics. Defaults to the account's currency
   * if not set.
   */
  currencyCode?: string;
  /**
   * Date range of the report, if unset the range will be considered CUSTOM.
   */
  dateRange?:  | "REPORTING_DATE_RANGE_UNSPECIFIED" | "CUSTOM" | "TODAY" | "YESTERDAY" | "MONTH_TO_DATE" | "YEAR_TO_DATE" | "LAST_7_DAYS" | "LAST_30_DAYS";
  /**
   * Dimensions to base the report on.
   */
  dimensions?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "WEEK" | "MONTH" | "ACCOUNT_NAME" | "AD_CLIENT_ID" | "HOSTED_AD_CLIENT_ID" | "PRODUCT_NAME" | "PRODUCT_CODE" | "AD_UNIT_NAME" | "AD_UNIT_ID" | "AD_UNIT_SIZE_NAME" | "AD_UNIT_SIZE_CODE" | "CUSTOM_CHANNEL_NAME" | "CUSTOM_CHANNEL_ID" | "OWNED_SITE_DOMAIN_NAME" | "OWNED_SITE_ID" | "URL_CHANNEL_NAME" | "URL_CHANNEL_ID" | "BUYER_NETWORK_NAME" | "BUYER_NETWORK_ID" | "BID_TYPE_NAME" | "BID_TYPE_CODE" | "CREATIVE_SIZE_NAME" | "CREATIVE_SIZE_CODE" | "DOMAIN_NAME" | "DOMAIN_CODE" | "COUNTRY_NAME" | "COUNTRY_CODE" | "PLATFORM_TYPE_NAME" | "PLATFORM_TYPE_CODE" | "TARGETING_TYPE_NAME" | "TARGETING_TYPE_CODE" | "CONTENT_PLATFORM_NAME" | "CONTENT_PLATFORM_CODE" | "AD_PLACEMENT_NAME" | "AD_PLACEMENT_CODE" | "REQUESTED_AD_TYPE_NAME" | "REQUESTED_AD_TYPE_CODE" | "SERVED_AD_TYPE_NAME" | "SERVED_AD_TYPE_CODE" | "AD_FORMAT_NAME" | "AD_FORMAT_CODE" | "CUSTOM_SEARCH_STYLE_NAME" | "CUSTOM_SEARCH_STYLE_ID" | "DOMAIN_REGISTRANT" | "WEBSEARCH_QUERY_STRING";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * A list of [filters](/adsense/management/reporting/filtering) to apply to
   * the report. All provided filters must match in order for the data to be
   * included in the report.
   */
  filters?: string;
  /**
   * The language to use for translating report output. If unspecified, this
   * defaults to English ("en"). If the given language is not supported, report
   * output will be returned in English. The language is specified as an [IETF
   * BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag).
   */
  languageCode?: string;
  /**
   * The maximum number of rows of report data to return. Reports producing
   * more rows than the requested limit will be truncated. If unset, this
   * defaults to 100,000 rows for `Reports.GenerateReport` and 1,000,000 rows
   * for `Reports.GenerateCsvReport`, which are also the maximum values
   * permitted here. Report truncation can be identified (for
   * `Reports.GenerateReport` only) by comparing the number of rows returned to
   * the value returned in `total_matched_rows`.
   */
  limit?: number;
  /**
   * Required. Reporting metrics.
   */
  metrics?:  | "METRIC_UNSPECIFIED" | "PAGE_VIEWS" | "AD_REQUESTS" | "MATCHED_AD_REQUESTS" | "TOTAL_IMPRESSIONS" | "IMPRESSIONS" | "INDIVIDUAL_AD_IMPRESSIONS" | "CLICKS" | "PAGE_VIEWS_SPAM_RATIO" | "AD_REQUESTS_SPAM_RATIO" | "MATCHED_AD_REQUESTS_SPAM_RATIO" | "IMPRESSIONS_SPAM_RATIO" | "INDIVIDUAL_AD_IMPRESSIONS_SPAM_RATIO" | "CLICKS_SPAM_RATIO" | "AD_REQUESTS_COVERAGE" | "PAGE_VIEWS_CTR" | "AD_REQUESTS_CTR" | "MATCHED_AD_REQUESTS_CTR" | "IMPRESSIONS_CTR" | "INDIVIDUAL_AD_IMPRESSIONS_CTR" | "ACTIVE_VIEW_MEASURABILITY" | "ACTIVE_VIEW_VIEWABILITY" | "ACTIVE_VIEW_TIME" | "ESTIMATED_EARNINGS" | "PAGE_VIEWS_RPM" | "AD_REQUESTS_RPM" | "MATCHED_AD_REQUESTS_RPM" | "IMPRESSIONS_RPM" | "INDIVIDUAL_AD_IMPRESSIONS_RPM" | "COST_PER_CLICK" | "ADS_PER_IMPRESSION" | "TOTAL_EARNINGS" | "WEBSEARCH_RESULT_PAGES";
  /**
   * The name of a dimension or metric to sort the resulting report on, can be
   * prefixed with "+" to sort ascending or "-" to sort descending. If no prefix
   * is specified, the column is sorted ascending.
   */
  orderBy?: string;
  /**
   * Timezone in which to generate the report. If unspecified, this defaults to
   * the account timezone. For more information, see [changing the time zone of
   * your reports](https://support.google.com/adsense/answer/9830725).
   */
  reportingTimeZone?:  | "REPORTING_TIME_ZONE_UNSPECIFIED" | "ACCOUNT_TIME_ZONE" | "GOOGLE_TIME_ZONE";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for AdSense#accountsReportsGenerate.
 */
export interface AccountsReportsGenerateOptions {
  /**
   * The [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) to
   * use when reporting on monetary metrics. Defaults to the account's currency
   * if not set.
   */
  currencyCode?: string;
  /**
   * Date range of the report, if unset the range will be considered CUSTOM.
   */
  dateRange?:  | "REPORTING_DATE_RANGE_UNSPECIFIED" | "CUSTOM" | "TODAY" | "YESTERDAY" | "MONTH_TO_DATE" | "YEAR_TO_DATE" | "LAST_7_DAYS" | "LAST_30_DAYS";
  /**
   * Dimensions to base the report on.
   */
  dimensions?:  | "DIMENSION_UNSPECIFIED" | "DATE" | "WEEK" | "MONTH" | "ACCOUNT_NAME" | "AD_CLIENT_ID" | "HOSTED_AD_CLIENT_ID" | "PRODUCT_NAME" | "PRODUCT_CODE" | "AD_UNIT_NAME" | "AD_UNIT_ID" | "AD_UNIT_SIZE_NAME" | "AD_UNIT_SIZE_CODE" | "CUSTOM_CHANNEL_NAME" | "CUSTOM_CHANNEL_ID" | "OWNED_SITE_DOMAIN_NAME" | "OWNED_SITE_ID" | "URL_CHANNEL_NAME" | "URL_CHANNEL_ID" | "BUYER_NETWORK_NAME" | "BUYER_NETWORK_ID" | "BID_TYPE_NAME" | "BID_TYPE_CODE" | "CREATIVE_SIZE_NAME" | "CREATIVE_SIZE_CODE" | "DOMAIN_NAME" | "DOMAIN_CODE" | "COUNTRY_NAME" | "COUNTRY_CODE" | "PLATFORM_TYPE_NAME" | "PLATFORM_TYPE_CODE" | "TARGETING_TYPE_NAME" | "TARGETING_TYPE_CODE" | "CONTENT_PLATFORM_NAME" | "CONTENT_PLATFORM_CODE" | "AD_PLACEMENT_NAME" | "AD_PLACEMENT_CODE" | "REQUESTED_AD_TYPE_NAME" | "REQUESTED_AD_TYPE_CODE" | "SERVED_AD_TYPE_NAME" | "SERVED_AD_TYPE_CODE" | "AD_FORMAT_NAME" | "AD_FORMAT_CODE" | "CUSTOM_SEARCH_STYLE_NAME" | "CUSTOM_SEARCH_STYLE_ID" | "DOMAIN_REGISTRANT" | "WEBSEARCH_QUERY_STRING";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * A list of [filters](/adsense/management/reporting/filtering) to apply to
   * the report. All provided filters must match in order for the data to be
   * included in the report.
   */
  filters?: string;
  /**
   * The language to use for translating report output. If unspecified, this
   * defaults to English ("en"). If the given language is not supported, report
   * output will be returned in English. The language is specified as an [IETF
   * BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag).
   */
  languageCode?: string;
  /**
   * The maximum number of rows of report data to return. Reports producing
   * more rows than the requested limit will be truncated. If unset, this
   * defaults to 100,000 rows for `Reports.GenerateReport` and 1,000,000 rows
   * for `Reports.GenerateCsvReport`, which are also the maximum values
   * permitted here. Report truncation can be identified (for
   * `Reports.GenerateReport` only) by comparing the number of rows returned to
   * the value returned in `total_matched_rows`.
   */
  limit?: number;
  /**
   * Required. Reporting metrics.
   */
  metrics?:  | "METRIC_UNSPECIFIED" | "PAGE_VIEWS" | "AD_REQUESTS" | "MATCHED_AD_REQUESTS" | "TOTAL_IMPRESSIONS" | "IMPRESSIONS" | "INDIVIDUAL_AD_IMPRESSIONS" | "CLICKS" | "PAGE_VIEWS_SPAM_RATIO" | "AD_REQUESTS_SPAM_RATIO" | "MATCHED_AD_REQUESTS_SPAM_RATIO" | "IMPRESSIONS_SPAM_RATIO" | "INDIVIDUAL_AD_IMPRESSIONS_SPAM_RATIO" | "CLICKS_SPAM_RATIO" | "AD_REQUESTS_COVERAGE" | "PAGE_VIEWS_CTR" | "AD_REQUESTS_CTR" | "MATCHED_AD_REQUESTS_CTR" | "IMPRESSIONS_CTR" | "INDIVIDUAL_AD_IMPRESSIONS_CTR" | "ACTIVE_VIEW_MEASURABILITY" | "ACTIVE_VIEW_VIEWABILITY" | "ACTIVE_VIEW_TIME" | "ESTIMATED_EARNINGS" | "PAGE_VIEWS_RPM" | "AD_REQUESTS_RPM" | "MATCHED_AD_REQUESTS_RPM" | "IMPRESSIONS_RPM" | "INDIVIDUAL_AD_IMPRESSIONS_RPM" | "COST_PER_CLICK" | "ADS_PER_IMPRESSION" | "TOTAL_EARNINGS" | "WEBSEARCH_RESULT_PAGES";
  /**
   * The name of a dimension or metric to sort the resulting report on, can be
   * prefixed with "+" to sort ascending or "-" to sort descending. If no prefix
   * is specified, the column is sorted ascending.
   */
  orderBy?: string;
  /**
   * Timezone in which to generate the report. If unspecified, this defaults to
   * the account timezone. For more information, see [changing the time zone of
   * your reports](https://support.google.com/adsense/answer/9830725).
   */
  reportingTimeZone?:  | "REPORTING_TIME_ZONE_UNSPECIFIED" | "ACCOUNT_TIME_ZONE" | "GOOGLE_TIME_ZONE";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for AdSense#accountsReportsSavedGenerateCsv.
 */
export interface AccountsReportsSavedGenerateCsvOptions {
  /**
   * The [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) to
   * use when reporting on monetary metrics. Defaults to the account's currency
   * if not set.
   */
  currencyCode?: string;
  /**
   * Date range of the report, if unset the range will be considered CUSTOM.
   */
  dateRange?:  | "REPORTING_DATE_RANGE_UNSPECIFIED" | "CUSTOM" | "TODAY" | "YESTERDAY" | "MONTH_TO_DATE" | "YEAR_TO_DATE" | "LAST_7_DAYS" | "LAST_30_DAYS";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * The language to use for translating report output. If unspecified, this
   * defaults to English ("en"). If the given language is not supported, report
   * output will be returned in English. The language is specified as an [IETF
   * BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag).
   */
  languageCode?: string;
  /**
   * Timezone in which to generate the report. If unspecified, this defaults to
   * the account timezone. For more information, see [changing the time zone of
   * your reports](https://support.google.com/adsense/answer/9830725).
   */
  reportingTimeZone?:  | "REPORTING_TIME_ZONE_UNSPECIFIED" | "ACCOUNT_TIME_ZONE" | "GOOGLE_TIME_ZONE";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for AdSense#accountsReportsSavedGenerate.
 */
export interface AccountsReportsSavedGenerateOptions {
  /**
   * The [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) to
   * use when reporting on monetary metrics. Defaults to the account's currency
   * if not set.
   */
  currencyCode?: string;
  /**
   * Date range of the report, if unset the range will be considered CUSTOM.
   */
  dateRange?:  | "REPORTING_DATE_RANGE_UNSPECIFIED" | "CUSTOM" | "TODAY" | "YESTERDAY" | "MONTH_TO_DATE" | "YEAR_TO_DATE" | "LAST_7_DAYS" | "LAST_30_DAYS";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * The language to use for translating report output. If unspecified, this
   * defaults to English ("en"). If the given language is not supported, report
   * output will be returned in English. The language is specified as an [IETF
   * BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag).
   */
  languageCode?: string;
  /**
   * Timezone in which to generate the report. If unspecified, this defaults to
   * the account timezone. For more information, see [changing the time zone of
   * your reports](https://support.google.com/adsense/answer/9830725).
   */
  reportingTimeZone?:  | "REPORTING_TIME_ZONE_UNSPECIFIED" | "ACCOUNT_TIME_ZONE" | "GOOGLE_TIME_ZONE";
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for AdSense#accountsReportsSavedList.
 */
export interface AccountsReportsSavedListOptions {
  /**
   * The maximum number of reports to include in the response, used for paging.
   * If unspecified, at most 10000 reports will be returned. The maximum value
   * is 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListPayments` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListPayments` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AdSense#accountsSitesList.
 */
export interface AccountsSitesListOptions {
  /**
   * The maximum number of sites to include in the response, used for paging.
   * If unspecified, at most 10000 sites will be returned. The maximum value is
   * 10000; values above 10000 will be coerced to 10000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSites` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListSites` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Representation of an ad blocking recovery tag. See
 * https://support.google.com/adsense/answer/11575177.
 */
export interface AdBlockingRecoveryTag {
  /**
   * Error protection code that can be used in conjunction with the tag. It'll
   * display a message to users if an [ad blocking extension blocks their access
   * to your site](https://support.google.com/adsense/answer/11575480).
   */
  errorProtectionCode?: string;
  /**
   * The ad blocking recovery tag. Note that the message generated by the tag
   * can be blocked by an ad blocking extension. If this is not your desired
   * outcome, then you'll need to use it in conjunction with the error
   * protection code.
   */
  tag?: string;
}

/**
 * Representation of an ad client. An ad client represents a user's
 * subscription with a specific AdSense product.
 */
export interface AdClient {
  /**
   * Output only. Resource name of the ad client. Format:
   * accounts/{account}/adclients/{adclient}
   */
  readonly name?: string;
  /**
   * Output only. Reporting product code of the ad client. For example, "AFC"
   * for AdSense for Content. Corresponds to the `PRODUCT_CODE` dimension, and
   * present only if the ad client supports reporting.
   */
  readonly productCode?: string;
  /**
   * Output only. Unique ID of the ad client as used in the `AD_CLIENT_ID`
   * reporting dimension. Present only if the ad client supports reporting.
   */
  readonly reportingDimensionId?: string;
  /**
   * Output only. State of the ad client.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "READY" | "GETTING_READY" | "REQUIRES_REVIEW";
}

/**
 * Representation of the AdSense code for a given ad client. For more
 * information, see [About the AdSense
 * code](https://support.google.com/adsense/answer/9274634).
 */
export interface AdClientAdCode {
  /**
   * Output only. The AdSense code snippet to add to the head of an HTML page.
   */
  readonly adCode?: string;
  /**
   * Output only. The AdSense code snippet to add to the body of an AMP page.
   */
  readonly ampBody?: string;
  /**
   * Output only. The AdSense code snippet to add to the head of an AMP page.
   */
  readonly ampHead?: string;
}

/**
 * Representation of an ad unit. An ad unit represents a saved ad unit with a
 * specific set of ad settings that have been customized within an account.
 */
export interface AdUnit {
  /**
   * Required. Settings specific to content ads (AFC).
   */
  contentAdsSettings?: ContentAdsSettings;
  /**
   * Required. Display name of the ad unit, as provided when the ad unit was
   * created.
   */
  displayName?: string;
  /**
   * Output only. Resource name of the ad unit. Format:
   * accounts/{account}/adclients/{adclient}/adunits/{adunit}
   */
  readonly name?: string;
  /**
   * Output only. Unique ID of the ad unit as used in the `AD_UNIT_ID`
   * reporting dimension.
   */
  readonly reportingDimensionId?: string;
  /**
   * State of the ad unit.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED";
}

/**
 * Representation of the ad unit code for a given ad unit. For more
 * information, see [About the AdSense
 * code](https://support.google.com/adsense/answer/9274634) and [Where to place
 * the ad code in your HTML](https://support.google.com/adsense/answer/9190028).
 */
export interface AdUnitAdCode {
  /**
   * Output only. The code snippet to add to the body of an HTML page.
   */
  readonly adCode?: string;
}

/**
 * Representation of an alert.
 */
export interface Alert {
  /**
   * Output only. The localized alert message. This may contain HTML markup,
   * such as phrase elements or links.
   */
  readonly message?: string;
  /**
   * Output only. Resource name of the alert. Format:
   * accounts/{account}/alerts/{alert}
   */
  readonly name?: string;
  /**
   * Output only. Severity of this alert.
   */
  readonly severity?:  | "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "SEVERE";
  /**
   * Output only. Type of alert. This identifies the broad type of this alert,
   * and provides a stable machine-readable identifier that will not be
   * translated. For example, "payment-hold".
   */
  readonly type?: string;
}

/**
 * Cell representation.
 */
export interface Cell {
  /**
   * Value in the cell. The dimension cells contain strings, and the metric
   * cells contain numbers.
   */
  value?: string;
}

/**
 * Settings specific to content ads (AFC).
 */
export interface ContentAdsSettings {
  /**
   * Required. Size of the ad unit. e.g. "728x90", "1x3" (for responsive ad
   * units).
   */
  size?: string;
  /**
   * Required. Type of the ad unit.
   */
  type?:  | "TYPE_UNSPECIFIED" | "DISPLAY" | "FEED" | "ARTICLE" | "MATCHED_CONTENT" | "LINK";
}

/**
 * Representation of a custom channel.
 */
export interface CustomChannel {
  /**
   * Whether the custom channel is active and collecting data. See
   * https://support.google.com/adsense/answer/10077192.
   */
  active?: boolean;
  /**
   * Required. Display name of the custom channel.
   */
  displayName?: string;
  /**
   * Output only. Resource name of the custom channel. Format:
   * accounts/{account}/adclients/{adclient}/customchannels/{customchannel}
   */
  readonly name?: string;
  /**
   * Output only. Unique ID of the custom channel as used in the
   * `CUSTOM_CHANNEL_ID` reporting dimension.
   */
  readonly reportingDimensionId?: string;
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * The header information of the columns requested in the report.
 */
export interface Header {
  /**
   * The [ISO-4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) of
   * this column. Only present if the header type is METRIC_CURRENCY.
   */
  currencyCode?: string;
  /**
   * Required. Name of the header.
   */
  name?: string;
  /**
   * Required. Type of the header.
   */
  type?:  | "HEADER_TYPE_UNSPECIFIED" | "DIMENSION" | "METRIC_TALLY" | "METRIC_RATIO" | "METRIC_CURRENCY" | "METRIC_MILLISECONDS" | "METRIC_DECIMAL";
}

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or an
 * HTML page. This message can be used both in streaming and non-streaming API
 * methods in the request as well as the response. It can be used as a top-level
 * request field, which is convenient if one wants to extract parameters from
 * either the URL or HTTP template into the request fields and also want access
 * to the raw HTTP body. Example: message GetResourceRequest { // A unique
 * request id. string request_id = 1; // The raw HTTP body is bound to this
 * field. google.api.HttpBody http_body = 2; } service ResourceService { rpc
 * GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc
 * UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); }
 * Example with streaming methods: service CaldavService { rpc
 * GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody);
 * rpc UpdateCalendar(stream google.api.HttpBody) returns (stream
 * google.api.HttpBody); } Use of this type only changes how the request and
 * response bodies are handled, all other features will continue to work
 * unchanged.
 */
export interface HttpBody {
  /**
   * The HTTP Content-Type header value specifying the content type of the
   * body.
   */
  contentType?: string;
  /**
   * The HTTP request/response body as raw binary.
   */
  data?: Uint8Array;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   */
  extensions?: {
    [key: string]: any
  }[];
}

function serializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Response definition for the account list rpc.
 */
export interface ListAccountsResponse {
  /**
   * The accounts returned in this list response.
   */
  accounts?: Account[];
  /**
   * Continuation token used to page through accounts. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the ad client list rpc.
 */
export interface ListAdClientsResponse {
  /**
   * The ad clients returned in this list response.
   */
  adClients?: AdClient[];
  /**
   * Continuation token used to page through ad clients. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the adunit list rpc.
 */
export interface ListAdUnitsResponse {
  /**
   * The ad units returned in the list response.
   */
  adUnits?: AdUnit[];
  /**
   * Continuation token used to page through ad units. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the alerts list rpc.
 */
export interface ListAlertsResponse {
  /**
   * The alerts returned in this list response.
   */
  alerts?: Alert[];
}

/**
 * Response definition for the child account list rpc.
 */
export interface ListChildAccountsResponse {
  /**
   * The accounts returned in this list response.
   */
  accounts?: Account[];
  /**
   * Continuation token used to page through accounts. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the custom channel list rpc.
 */
export interface ListCustomChannelsResponse {
  /**
   * The custom channels returned in this list response.
   */
  customChannels?: CustomChannel[];
  /**
   * Continuation token used to page through alerts. To retrieve the next page
   * of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the ad units linked to a custom channel list rpc.
 */
export interface ListLinkedAdUnitsResponse {
  /**
   * The ad units returned in the list response.
   */
  adUnits?: AdUnit[];
  /**
   * Continuation token used to page through ad units. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the custom channels linked to an adunit list rpc.
 */
export interface ListLinkedCustomChannelsResponse {
  /**
   * The custom channels returned in this list response.
   */
  customChannels?: CustomChannel[];
  /**
   * Continuation token used to page through alerts. To retrieve the next page
   * of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
}

/**
 * Response definition for the payments list rpc.
 */
export interface ListPaymentsResponse {
  /**
   * The payments returned in this list response.
   */
  payments?: Payment[];
}

/**
 * Response definition for the saved reports list rpc.
 */
export interface ListSavedReportsResponse {
  /**
   * Continuation token used to page through reports. To retrieve the next page
   * of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
  /**
   * The reports returned in this list response.
   */
  savedReports?: SavedReport[];
}

/**
 * Response definition for the sites list rpc.
 */
export interface ListSitesResponse {
  /**
   * Continuation token used to page through sites. To retrieve the next page
   * of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
  /**
   * The sites returned in this list response.
   */
  sites?: Site[];
}

/**
 * Response definition for the url channels list rpc.
 */
export interface ListUrlChannelsResponse {
  /**
   * Continuation token used to page through url channels. To retrieve the next
   * page of the results, set the next request's "page_token" value to this.
   */
  nextPageToken?: string;
  /**
   * The url channels returned in this list response.
   */
  urlChannels?: UrlChannel[];
}

/**
 * Representation of an unpaid or paid payment. See [Payment timelines for
 * AdSense](https://support.google.com/adsense/answer/7164703) for more
 * information about payments and the [YouTube homepage and payments
 * account](https://support.google.com/adsense/answer/11622510) article for
 * information about dedicated payments accounts for YouTube.
 */
export interface Payment {
  /**
   * Output only. The amount of unpaid or paid earnings, as a formatted string,
   * including the currency. E.g. "¥1,235 JPY", "$1,234.57", "£87.65".
   */
  readonly amount?: string;
  /**
   * Output only. For paid earnings, the date that the payment was credited.
   * For unpaid earnings, this field is empty. Payment dates are always returned
   * in the billing timezone (America/Los_Angeles).
   */
  readonly date?: Date;
  /**
   * Output only. Resource name of the payment. Format: -
   * accounts/{account}/payments/unpaid for unpaid (current) AdSense earnings. -
   * accounts/{account}/payments/youtube-unpaid for unpaid (current) YouTube
   * earnings. - accounts/{account}/payments/yyyy-MM-dd for paid AdSense
   * earnings. - accounts/{account}/payments/youtube-yyyy-MM-dd for paid YouTube
   * earnings.
   */
  readonly name?: string;
}

/**
 * Result of a generated report.
 */
export interface ReportResult {
  /**
   * The averages of the report. This is the same length as any other row in
   * the report; cells corresponding to dimension columns are empty.
   */
  averages?: Row;
  /**
   * Required. End date of the range (inclusive).
   */
  endDate?: Date;
  /**
   * The header information; one for each dimension in the request, followed by
   * one for each metric in the request.
   */
  headers?: Header[];
  /**
   * The output rows of the report. Each row is a list of cells; one for each
   * dimension in the request, followed by one for each metric in the request.
   */
  rows?: Row[];
  /**
   * Required. Start date of the range (inclusive).
   */
  startDate?: Date;
  /**
   * The total number of rows matched by the report request.
   */
  totalMatchedRows?: bigint;
  /**
   * The totals of the report. This is the same length as any other row in the
   * report; cells corresponding to dimension columns are empty.
   */
  totals?: Row;
  /**
   * Any warnings associated with generation of the report. These warnings are
   * always returned in English.
   */
  warnings?: string[];
}

function serializeReportResult(data: any): ReportResult {
  return {
    ...data,
    totalMatchedRows: data["totalMatchedRows"] !== undefined ? String(data["totalMatchedRows"]) : undefined,
  };
}

function deserializeReportResult(data: any): ReportResult {
  return {
    ...data,
    totalMatchedRows: data["totalMatchedRows"] !== undefined ? BigInt(data["totalMatchedRows"]) : undefined,
  };
}

/**
 * Row representation.
 */
export interface Row {
  /**
   * Cells in the row.
   */
  cells?: Cell[];
}

/**
 * Representation of a saved report.
 */
export interface SavedReport {
  /**
   * Output only. Resource name of the report. Format:
   * accounts/{account}/reports/{report}
   */
  readonly name?: string;
  /**
   * Report title as specified by publisher.
   */
  title?: string;
}

/**
 * Representation of a Site.
 */
export interface Site {
  /**
   * Whether auto ads is turned on for the site.
   */
  autoAdsEnabled?: boolean;
  /**
   * Domain (or subdomain) of the site, e.g. "example.com" or
   * "www.example.com". This is used in the `OWNED_SITE_DOMAIN_NAME` reporting
   * dimension.
   */
  domain?: string;
  /**
   * Output only. Resource name of a site. Format:
   * accounts/{account}/sites/{site}
   */
  readonly name?: string;
  /**
   * Output only. Unique ID of the site as used in the `OWNED_SITE_ID`
   * reporting dimension.
   */
  readonly reportingDimensionId?: string;
  /**
   * Output only. State of a site.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "REQUIRES_REVIEW" | "GETTING_READY" | "READY" | "NEEDS_ATTENTION";
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface TimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}

/**
 * Representation of a URL channel. URL channels allow you to track the
 * performance of particular pages in your site; see [URL
 * channels](https://support.google.com/adsense/answer/2923836) for more
 * information.
 */
export interface UrlChannel {
  /**
   * Output only. Resource name of the URL channel. Format:
   * accounts/{account}/adclients/{adclient}/urlchannels/{urlchannel}
   */
  readonly name?: string;
  /**
   * Output only. Unique ID of the custom channel as used in the
   * `URL_CHANNEL_ID` reporting dimension.
   */
  readonly reportingDimensionId?: string;
  /**
   * URI pattern of the channel. Does not include "http://" or "https://".
   * Example: www.example.com/home
   */
  uriPattern?: string;
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
