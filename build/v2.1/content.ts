// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Content API for Shopping Client for Deno
 * ========================================
 * 
 * Manage your product listings and accounts for Google Shopping
 * 
 * Docs: https://developers.google.com/shopping-content/v2/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manage your product listings and accounts for Google Shopping
 */
export class Content {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://shoppingcontent.googleapis.com/content/v2.1/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns information about the authenticated user.
   *
   */
  async accountsAuthinfo(): Promise<AccountsAuthInfoResponse> {
    const url = new URL(`${this.#baseUrl}accounts/authinfo`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountsAuthInfoResponse(data);
  }

  /**
   * Claims the website of a Merchant Center sub-account. Merchant accounts
   * with approved third-party CSSs aren't required to claim a website.
   *
   * @param accountId The ID of the account whose website is claimed.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountsClaimwebsite(accountId: bigint, merchantId: bigint, opts: AccountsClaimwebsiteOptions = {}): Promise<AccountsClaimWebsiteResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/claimwebsite`);
    if (opts.overwrite !== undefined) {
      url.searchParams.append("overwrite", String(opts.overwrite));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AccountsClaimWebsiteResponse;
  }

  /**
   * Uploads credentials for the Merchant Center account. If credentials
   * already exist for this Merchant Center account and purpose, this method
   * updates them.
   *
   * @param accountId Required. The merchant id of the account these credentials belong to.
   */
  async accountsCredentialsCreate(accountId: bigint, req: AccountCredentials): Promise<AccountCredentials> {
    accountId = String(accountId);
    req = serializeAccountCredentials(req);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/credentials`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountCredentials(data);
  }

  /**
   * Retrieves, inserts, updates, and deletes multiple Merchant Center
   * (sub-)accounts in a single request.
   *
   */
  async accountsCustombatch(req: AccountsCustomBatchRequest): Promise<AccountsCustomBatchResponse> {
    req = serializeAccountsCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}accounts/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountsCustomBatchResponse(data);
  }

  /**
   * Deletes a Merchant Center sub-account.
   *
   * @param accountId The ID of the account.
   * @param merchantId The ID of the managing account. This must be a multi-client account, and accountId must be the ID of a sub-account of this account.
   */
  async accountsDelete(accountId: bigint, merchantId: bigint, opts: AccountsDeleteOptions = {}): Promise<void> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a Merchant Center account.
   *
   * @param accountId The ID of the account.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountsGet(accountId: bigint, merchantId: bigint, opts: AccountsGetOptions = {}): Promise<Account> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccount(data);
  }

  /**
   * Creates a Merchant Center sub-account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async accountsInsert(merchantId: bigint, req: Account): Promise<Account> {
    merchantId = String(merchantId);
    req = serializeAccount(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccount(data);
  }

  /**
   * Creates a new label, not assigned to any account.
   *
   * @param accountId Required. The id of the account this label belongs to.
   */
  async accountsLabelsCreate(accountId: bigint, req: AccountLabel): Promise<AccountLabel> {
    accountId = String(accountId);
    req = serializeAccountLabel(req);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/labels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountLabel(data);
  }

  /**
   * Deletes a label and removes it from all accounts to which it was assigned.
   *
   * @param accountId Required. The id of the account that owns the label.
   * @param labelId Required. The id of the label to delete.
   */
  async accountsLabelsDelete(accountId: bigint, labelId: bigint): Promise<void> {
    accountId = String(accountId);
    labelId = String(labelId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/labels/${ labelId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Lists the labels assigned to an account.
   *
   * @param accountId Required. The account id for whose labels are to be listed.
   */
  async accountsLabelsList(accountId: bigint, opts: AccountsLabelsListOptions = {}): Promise<ListAccountLabelsResponse> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/labels`);
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
    return deserializeListAccountLabelsResponse(data);
  }

  /**
   * Updates a label.
   *
   * @param accountId Required. The id of the account this label belongs to.
   * @param labelId Required. The id of the label to update.
   */
  async accountsLabelsPatch(accountId: bigint, labelId: bigint, req: AccountLabel): Promise<AccountLabel> {
    accountId = String(accountId);
    labelId = String(labelId);
    req = serializeAccountLabel(req);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/labels/${ labelId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAccountLabel(data);
  }

  /**
   * Performs an action on a link between two Merchant Center accounts, namely
   * accountId and linkedAccountId.
   *
   * @param accountId The ID of the account that should be linked.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountsLink(accountId: bigint, merchantId: bigint, req: AccountsLinkRequest): Promise<AccountsLinkResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/link`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AccountsLinkResponse;
  }

  /**
   * Lists the sub-accounts in your Merchant Center account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async accountsList(merchantId: bigint, opts: AccountsListOptions = {}): Promise<AccountsListResponse> {
    merchantId = String(merchantId);
    opts = serializeAccountsListOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts`);
    if (opts.label !== undefined) {
      url.searchParams.append("label", String(opts.label));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountsListResponse(data);
  }

  /**
   * Returns the list of accounts linked to your Merchant Center account.
   *
   * @param accountId The ID of the account for which to list links.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountsListlinks(accountId: bigint, merchantId: bigint, opts: AccountsListlinksOptions = {}): Promise<AccountsListLinksResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/listlinks`);
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
    return data as AccountsListLinksResponse;
  }

  /**
   * Request verification code to start phone verification.
   *
   * @param accountId Required. The ID of the account.
   * @param merchantId Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account.
   */
  async accountsRequestphoneverification(accountId: bigint, merchantId: bigint, req: RequestPhoneVerificationRequest): Promise<RequestPhoneVerificationResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/requestphoneverification`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RequestPhoneVerificationResponse;
  }

  /**
   * Links return carrier to a merchant account.
   *
   * @param accountId Required. The Merchant Center Account Id under which the Return Carrier is to be linked.
   */
  async accountsReturncarrierCreate(accountId: bigint, req: AccountReturnCarrier): Promise<AccountReturnCarrier> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/returncarrier`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AccountReturnCarrier;
  }

  /**
   * Delete a return carrier in the merchant account.
   *
   * @param accountId Required. The Merchant Center Account Id under which the Return Carrier is to be linked.
   * @param carrierAccountId Required. The Google-provided unique carrier ID, used to update the resource.
   */
  async accountsReturncarrierDelete(accountId: bigint, carrierAccountId: bigint): Promise<void> {
    accountId = String(accountId);
    carrierAccountId = String(carrierAccountId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/returncarrier/${ carrierAccountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Lists available return carriers in the merchant account.
   *
   * @param accountId Required. The Merchant Center Account Id under which the Return Carrier is to be linked.
   */
  async accountsReturncarrierList(accountId: bigint): Promise<ListAccountReturnCarrierResponse> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/returncarrier`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAccountReturnCarrierResponse;
  }

  /**
   * Updates a return carrier in the merchant account.
   *
   * @param accountId Required. The Merchant Center Account Id under which the Return Carrier is to be linked.
   * @param carrierAccountId Required. The Google-provided unique carrier ID, used to update the resource.
   */
  async accountsReturncarrierPatch(accountId: bigint, carrierAccountId: bigint, req: AccountReturnCarrier): Promise<AccountReturnCarrier> {
    accountId = String(accountId);
    carrierAccountId = String(carrierAccountId);
    const url = new URL(`${this.#baseUrl}accounts/${ accountId }/returncarrier/${ carrierAccountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as AccountReturnCarrier;
  }

  /**
   * Retrieves multiple Merchant Center account statuses in a single request.
   *
   */
  async accountstatusesCustombatch(req: AccountstatusesCustomBatchRequest): Promise<AccountstatusesCustomBatchResponse> {
    req = serializeAccountstatusesCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}accountstatuses/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountstatusesCustomBatchResponse(data);
  }

  /**
   * Retrieves the status of a Merchant Center account. No itemLevelIssues are
   * returned for multi-client accounts.
   *
   * @param accountId The ID of the account.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountstatusesGet(accountId: bigint, merchantId: bigint, opts: AccountstatusesGetOptions = {}): Promise<AccountStatus> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accountstatuses/${ accountId }`);
    if (opts.destinations !== undefined) {
      url.searchParams.append("destinations", String(opts.destinations));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountStatus(data);
  }

  /**
   * Lists the statuses of the sub-accounts in your Merchant Center account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async accountstatusesList(merchantId: bigint, opts: AccountstatusesListOptions = {}): Promise<AccountstatusesListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accountstatuses`);
    if (opts.destinations !== undefined) {
      url.searchParams.append("destinations", String(opts.destinations));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountstatusesListResponse(data);
  }

  /**
   * Updates a Merchant Center account. Any fields that are not provided are
   * deleted from the resource.
   *
   * @param accountId The ID of the account.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accountsUpdate(accountId: bigint, merchantId: bigint, req: Account): Promise<Account> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    req = serializeAccount(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAccount(data);
  }

  /**
   * Updates labels that are assigned to the Merchant Center account by CSS
   * user.
   *
   * @param accountId The ID of the account whose labels are updated.
   * @param merchantId The ID of the managing account.
   */
  async accountsUpdatelabels(accountId: bigint, merchantId: bigint, req: AccountsUpdateLabelsRequest): Promise<AccountsUpdateLabelsResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    req = serializeAccountsUpdateLabelsRequest(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/updatelabels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AccountsUpdateLabelsResponse;
  }

  /**
   * Validates verification code to verify phone number for the account. If
   * successful this will overwrite the value of
   * `accounts.businessinformation.phoneNumber`. Only verified phone number will
   * replace an existing verified phone number.
   *
   * @param accountId Required. The ID of the account.
   * @param merchantId Required. The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account.
   */
  async accountsVerifyphonenumber(accountId: bigint, merchantId: bigint, req: VerifyPhoneNumberRequest): Promise<VerifyPhoneNumberResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounts/${ accountId }/verifyphonenumber`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as VerifyPhoneNumberResponse;
  }

  /**
   * Retrieves and updates tax settings of multiple accounts in a single
   * request.
   *
   */
  async accounttaxCustombatch(req: AccounttaxCustomBatchRequest): Promise<AccounttaxCustomBatchResponse> {
    req = serializeAccounttaxCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}accounttax/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccounttaxCustomBatchResponse(data);
  }

  /**
   * Retrieves the tax settings of the account.
   *
   * @param accountId The ID of the account for which to get/update account tax settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accounttaxGet(accountId: bigint, merchantId: bigint): Promise<AccountTax> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounttax/${ accountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountTax(data);
  }

  /**
   * Lists the tax settings of the sub-accounts in your Merchant Center
   * account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async accounttaxList(merchantId: bigint, opts: AccounttaxListOptions = {}): Promise<AccounttaxListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounttax`);
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
    return deserializeAccounttaxListResponse(data);
  }

  /**
   * Updates the tax settings of the account. Any fields that are not provided
   * are deleted from the resource.
   *
   * @param accountId The ID of the account for which to get/update account tax settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async accounttaxUpdate(accountId: bigint, merchantId: bigint, req: AccountTax): Promise<AccountTax> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    req = serializeAccountTax(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/accounttax/${ accountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAccountTax(data);
  }

  /**
   * Reactivates the BoG program in your Merchant Center account. Moves the
   * program to the active state when allowed, for example, when paused. This
   * method is only available to selected merchants.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsActivate(merchantId: bigint, regionCode: string, req: ActivateBuyOnGoogleProgramRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }/activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Retrieves a status of the BoG program for your Merchant Center account.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The Program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsGet(merchantId: bigint, regionCode: string): Promise<BuyOnGoogleProgramStatus> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BuyOnGoogleProgramStatus;
  }

  /**
   * Onboards the BoG program in your Merchant Center account. By using this
   * method, you agree to the [Terms of
   * Service](https://merchants.google.com/mc/termsofservice/transactions/US/latest).
   * Calling this method is only possible if the authenticated account is the
   * same as the merchant id in the request. Calling this method multiple times
   * will only accept Terms of Service if the latest version is not currently
   * signed.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsOnboard(merchantId: bigint, regionCode: string, req: OnboardBuyOnGoogleProgramRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }/onboard`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Updates the status of the BoG program for your Merchant Center account.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsPatch(merchantId: bigint, regionCode: string, req: BuyOnGoogleProgramStatus, opts: BuyongoogleprogramsPatchOptions = {}): Promise<BuyOnGoogleProgramStatus> {
    merchantId = String(merchantId);
    opts = serializeBuyongoogleprogramsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as BuyOnGoogleProgramStatus;
  }

  /**
   * Pauses the BoG program in your Merchant Center account. This method is
   * only available to selected merchants.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsPause(merchantId: bigint, regionCode: string, req: PauseBuyOnGoogleProgramRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }/pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Requests review and then activates the BoG program in your Merchant Center
   * account for the first time. Moves the program to the REVIEW_PENDING state.
   * This method is only available to selected merchants.
   *
   * @param merchantId Required. The ID of the account.
   * @param regionCode Required. The program region code [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Currently only US is available.
   */
  async buyongoogleprogramsRequestreview(merchantId: bigint, regionCode: string, req: RequestReviewBuyOnGoogleProgramRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/buyongoogleprograms/${ regionCode }/requestreview`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Uploads a collection to your Merchant Center account. If a collection with
   * the same collectionId already exists, this method updates that entry. In
   * each update, the collection is completely replaced by the fields in the
   * body of the update request.
   *
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionsCreate(merchantId: bigint, req: Collection): Promise<Collection> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collections`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Collection;
  }

  /**
   * Deletes a collection from your Merchant Center account.
   *
   * @param collectionId Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection.
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionsDelete(collectionId: string, merchantId: bigint): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collections/${ collectionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a collection from your Merchant Center account.
   *
   * @param collectionId Required. The REST ID of the collection.
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionsGet(collectionId: string, merchantId: bigint): Promise<Collection> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collections/${ collectionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Collection;
  }

  /**
   * Lists the collections in your Merchant Center account. The response might
   * contain fewer items than specified by page_size. Rely on next_page_token to
   * determine if there are more items to be requested.
   *
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionsList(merchantId: bigint, opts: CollectionsListOptions = {}): Promise<ListCollectionsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collections`);
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
    return data as ListCollectionsResponse;
  }

  /**
   * Gets the status of a collection from your Merchant Center account.
   *
   * @param collectionId Required. The collectionId of the collection. CollectionId is the same as the REST ID of the collection.
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionstatusesGet(collectionId: string, merchantId: bigint): Promise<CollectionStatus> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collectionstatuses/${ collectionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CollectionStatus;
  }

  /**
   * Lists the statuses of the collections in your Merchant Center account.
   *
   * @param merchantId Required. The ID of the account that contains the collection. This account cannot be a multi-client account.
   */
  async collectionstatusesList(merchantId: bigint, opts: CollectionstatusesListOptions = {}): Promise<ListCollectionStatusesResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/collectionstatuses`);
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
    return data as ListCollectionStatusesResponse;
  }

  /**
   * Creates a new conversion source.
   *
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesCreate(merchantId: bigint, req: ConversionSource): Promise<ConversionSource> {
    merchantId = String(merchantId);
    req = serializeConversionSource(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConversionSource(data);
  }

  /**
   * Archives an existing conversion source. It will be recoverable for 30
   * days. This archiving behavior is not typical in the Content API and unique
   * to this service.
   *
   * @param conversionSourceId Required. The ID of the conversion source to be deleted.
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesDelete(conversionSourceId: string, merchantId: bigint): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources/${ conversionSourceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Fetches a conversion source.
   *
   * @param conversionSourceId Required. The REST ID of the collection.
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesGet(conversionSourceId: string, merchantId: bigint): Promise<ConversionSource> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources/${ conversionSourceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConversionSource(data);
  }

  /**
   * Retrieves the list of conversion sources the caller has access to.
   *
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesList(merchantId: bigint, opts: ConversionsourcesListOptions = {}): Promise<ListConversionSourcesResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListConversionSourcesResponse(data);
  }

  /**
   * Updates information of an existing conversion source.
   *
   * @param conversionSourceId Required. The ID of the conversion source to be updated.
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesPatch(conversionSourceId: string, merchantId: bigint, req: ConversionSource, opts: ConversionsourcesPatchOptions = {}): Promise<ConversionSource> {
    merchantId = String(merchantId);
    req = serializeConversionSource(req);
    opts = serializeConversionsourcesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources/${ conversionSourceId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeConversionSource(data);
  }

  /**
   * Re-enables an archived conversion source.
   *
   * @param conversionSourceId Required. The ID of the conversion source to be undeleted.
   * @param merchantId Required. The ID of the account that owns the new conversion source.
   */
  async conversionsourcesUndelete(conversionSourceId: string, merchantId: bigint, req: UndeleteConversionSourceRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/conversionsources/${ conversionSourceId }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Retrieves a single CSS domain by ID.
   *
   * @param cssDomainId Required. The ID of the CSS domain to return.
   * @param cssGroupId Required. The ID of the managing account. If this parameter is not the same as [cssDomainId](#cssDomainId), then this ID must be a CSS group ID and `cssDomainId` must be the ID of a CSS domain affiliated with this group.
   */
  async cssesGet(cssDomainId: bigint, cssGroupId: bigint): Promise<Css> {
    cssDomainId = String(cssDomainId);
    cssGroupId = String(cssGroupId);
    const url = new URL(`${this.#baseUrl}${ cssGroupId }/csses/${ cssDomainId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCss(data);
  }

  /**
   * Lists CSS domains affiliated with a CSS group.
   *
   * @param cssGroupId Required. The CSS group ID of CSS domains to be listed.
   */
  async cssesList(cssGroupId: bigint, opts: CssesListOptions = {}): Promise<ListCssesResponse> {
    cssGroupId = String(cssGroupId);
    const url = new URL(`${this.#baseUrl}${ cssGroupId }/csses`);
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
    return deserializeListCssesResponse(data);
  }

  /**
   * Updates labels that are assigned to a CSS domain by its CSS group.
   *
   * @param cssDomainId Required. The ID of the updated CSS domain.
   * @param cssGroupId Required. The CSS group ID of the updated CSS domain.
   */
  async cssesUpdatelabels(cssDomainId: bigint, cssGroupId: bigint, req: LabelIds): Promise<Css> {
    cssDomainId = String(cssDomainId);
    cssGroupId = String(cssGroupId);
    req = serializeLabelIds(req);
    const url = new URL(`${this.#baseUrl}${ cssGroupId }/csses/${ cssDomainId }/updatelabels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCss(data);
  }

  /**
   * Deletes, fetches, gets, inserts and updates multiple datafeeds in a single
   * request.
   *
   */
  async datafeedsCustombatch(req: DatafeedsCustomBatchRequest): Promise<DatafeedsCustomBatchResponse> {
    req = serializeDatafeedsCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}datafeeds/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDatafeedsCustomBatchResponse(data);
  }

  /**
   * Deletes a datafeed configuration from your Merchant Center account.
   *
   * @param datafeedId The ID of the datafeed.
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedsDelete(datafeedId: bigint, merchantId: bigint): Promise<void> {
    datafeedId = String(datafeedId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds/${ datafeedId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Invokes a fetch for the datafeed in your Merchant Center account. If you
   * need to call this method more than once per day, we recommend you use the
   * [Products
   * service](https://developers.google.com/shopping-content/reference/rest/v2.1/products)
   * to update your product data.
   *
   * @param datafeedId The ID of the datafeed to be fetched.
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedsFetchnow(datafeedId: bigint, merchantId: bigint): Promise<DatafeedsFetchNowResponse> {
    datafeedId = String(datafeedId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds/${ datafeedId }/fetchNow`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as DatafeedsFetchNowResponse;
  }

  /**
   * Retrieves a datafeed configuration from your Merchant Center account.
   *
   * @param datafeedId The ID of the datafeed.
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedsGet(datafeedId: bigint, merchantId: bigint): Promise<Datafeed> {
    datafeedId = String(datafeedId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds/${ datafeedId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDatafeed(data);
  }

  /**
   * Registers a datafeed configuration with your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedsInsert(merchantId: bigint, req: Datafeed): Promise<Datafeed> {
    merchantId = String(merchantId);
    req = serializeDatafeed(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDatafeed(data);
  }

  /**
   * Lists the configurations for datafeeds in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the datafeeds. This account cannot be a multi-client account.
   */
  async datafeedsList(merchantId: bigint, opts: DatafeedsListOptions = {}): Promise<DatafeedsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds`);
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
    return deserializeDatafeedsListResponse(data);
  }

  /**
   * Gets multiple Merchant Center datafeed statuses in a single request.
   *
   */
  async datafeedstatusesCustombatch(req: DatafeedstatusesCustomBatchRequest): Promise<DatafeedstatusesCustomBatchResponse> {
    req = serializeDatafeedstatusesCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}datafeedstatuses/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDatafeedstatusesCustomBatchResponse(data);
  }

  /**
   * Retrieves the status of a datafeed from your Merchant Center account.
   *
   * @param datafeedId The ID of the datafeed.
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedstatusesGet(datafeedId: bigint, merchantId: bigint, opts: DatafeedstatusesGetOptions = {}): Promise<DatafeedStatus> {
    datafeedId = String(datafeedId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeedstatuses/${ datafeedId }`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.feedLabel !== undefined) {
      url.searchParams.append("feedLabel", String(opts.feedLabel));
    }
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDatafeedStatus(data);
  }

  /**
   * Lists the statuses of the datafeeds in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the datafeeds. This account cannot be a multi-client account.
   */
  async datafeedstatusesList(merchantId: bigint, opts: DatafeedstatusesListOptions = {}): Promise<DatafeedstatusesListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeedstatuses`);
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
    return deserializeDatafeedstatusesListResponse(data);
  }

  /**
   * Updates a datafeed configuration of your Merchant Center account. Any
   * fields that are not provided are deleted from the resource.
   *
   * @param datafeedId The ID of the datafeed.
   * @param merchantId The ID of the account that manages the datafeed. This account cannot be a multi-client account.
   */
  async datafeedsUpdate(datafeedId: bigint, merchantId: bigint, req: Datafeed): Promise<Datafeed> {
    datafeedId = String(datafeedId);
    merchantId = String(merchantId);
    req = serializeDatafeed(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/datafeeds/${ datafeedId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeDatafeed(data);
  }

  /**
   * Retrieves the status and review eligibility for the free listing program.
   * Returns errors and warnings if they require action to resolve, will become
   * disapprovals, or impact impressions. Use `accountstatuses` to view all
   * issues for an account.
   *
   * @param merchantId Required. The ID of the account.
   */
  async freelistingsprogramGet(merchantId: bigint): Promise<FreeListingsProgramStatus> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/freelistingsprogram`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFreeListingsProgramStatus(data);
  }

  /**
   * Requests a review of free listings in a specific region. This method is
   * only available to selected merchants.
   *
   * @param merchantId Required. The ID of the account.
   */
  async freelistingsprogramRequestreview(merchantId: bigint, req: RequestReviewFreeListingsRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/freelistingsprogram/requestreview`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Retrieves and/or updates the LIA settings of multiple accounts in a single
   * request.
   *
   */
  async liasettingsCustombatch(req: LiasettingsCustomBatchRequest): Promise<LiasettingsCustomBatchResponse> {
    req = serializeLiasettingsCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}liasettings/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLiasettingsCustomBatchResponse(data);
  }

  /**
   * Retrieves the LIA settings of the account.
   *
   * @param accountId The ID of the account for which to get or update LIA settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsGet(accountId: bigint, merchantId: bigint): Promise<LiaSettings> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiaSettings(data);
  }

  /**
   * Retrieves the list of accessible Business Profiles.
   *
   * @param accountId The ID of the account for which to retrieve accessible Business Profiles.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsGetaccessiblegmbaccounts(accountId: bigint, merchantId: bigint): Promise<LiasettingsGetAccessibleGmbAccountsResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }/accessiblegmbaccounts`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiasettingsGetAccessibleGmbAccountsResponse(data);
  }

  /**
   * Lists the LIA settings of the sub-accounts in your Merchant Center
   * account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async liasettingsList(merchantId: bigint, opts: LiasettingsListOptions = {}): Promise<LiasettingsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings`);
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
    return deserializeLiasettingsListResponse(data);
  }

  /**
   * Retrieves the list of POS data providers that have active settings for the
   * all eiligible countries.
   *
   */
  async liasettingsListposdataproviders(): Promise<LiasettingsListPosDataProvidersResponse> {
    const url = new URL(`${this.#baseUrl}liasettings/posdataproviders`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiasettingsListPosDataProvidersResponse(data);
  }

  /**
   * Requests access to a specified Business Profile.
   *
   * @param accountId The ID of the account for which Business Profile access is requested.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsRequestgmbaccess(accountId: bigint, merchantId: bigint, opts: LiasettingsRequestgmbaccessOptions = {}): Promise<LiasettingsRequestGmbAccessResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }/requestgmbaccess`);
    if (opts.gmbEmail !== undefined) {
      url.searchParams.append("gmbEmail", String(opts.gmbEmail));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as LiasettingsRequestGmbAccessResponse;
  }

  /**
   * Requests inventory validation for the specified country.
   *
   * @param accountId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param country The country for which inventory validation is requested.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsRequestinventoryverification(accountId: bigint, country: string, merchantId: bigint): Promise<LiasettingsRequestInventoryVerificationResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }/requestinventoryverification/${ country }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as LiasettingsRequestInventoryVerificationResponse;
  }

  /**
   * Sets the inventory verification contract for the specified country.
   *
   * @param accountId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsSetinventoryverificationcontact(accountId: bigint, merchantId: bigint, opts: LiasettingsSetinventoryverificationcontactOptions = {}): Promise<LiasettingsSetInventoryVerificationContactResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }/setinventoryverificationcontact`);
    if (opts.contactEmail !== undefined) {
      url.searchParams.append("contactEmail", String(opts.contactEmail));
    }
    if (opts.contactName !== undefined) {
      url.searchParams.append("contactName", String(opts.contactName));
    }
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as LiasettingsSetInventoryVerificationContactResponse;
  }

  /**
   * Sets the POS data provider for the specified country.
   *
   * @param accountId The ID of the account for which to retrieve accessible Business Profiles.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsSetposdataprovider(accountId: bigint, merchantId: bigint, opts: LiasettingsSetposdataproviderOptions = {}): Promise<LiasettingsSetPosDataProviderResponse> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    opts = serializeLiasettingsSetposdataproviderOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }/setposdataprovider`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.posDataProviderId !== undefined) {
      url.searchParams.append("posDataProviderId", String(opts.posDataProviderId));
    }
    if (opts.posExternalAccountId !== undefined) {
      url.searchParams.append("posExternalAccountId", String(opts.posExternalAccountId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as LiasettingsSetPosDataProviderResponse;
  }

  /**
   * Updates the LIA settings of the account. Any fields that are not provided
   * are deleted from the resource.
   *
   * @param accountId The ID of the account for which to get or update LIA settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async liasettingsUpdate(accountId: bigint, merchantId: bigint, req: LiaSettings): Promise<LiaSettings> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    req = serializeLiaSettings(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/liasettings/${ accountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLiaSettings(data);
  }

  /**
   * Updates local inventory for multiple products or stores in a single
   * request.
   *
   */
  async localinventoryCustombatch(req: LocalinventoryCustomBatchRequest): Promise<LocalinventoryCustomBatchResponse> {
    req = serializeLocalinventoryCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}localinventory/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LocalinventoryCustomBatchResponse;
  }

  /**
   * Updates the local inventory of a product in your Merchant Center account.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product for which to update local inventory.
   */
  async localinventoryInsert(merchantId: bigint, productId: string, req: LocalInventory): Promise<LocalInventory> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products/${ productId }/localinventory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LocalInventory;
  }

  /**
   * Creates a charge invoice for a shipment group, and triggers a charge
   * capture for orderinvoice enabled orders.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async orderinvoicesCreatechargeinvoice(merchantId: bigint, orderId: string, req: OrderinvoicesCreateChargeInvoiceRequest): Promise<OrderinvoicesCreateChargeInvoiceResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderinvoices/${ orderId }/createChargeInvoice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrderinvoicesCreateChargeInvoiceResponse;
  }

  /**
   * Creates a refund invoice for one or more shipment groups, and triggers a
   * refund for orderinvoice enabled orders. This can only be used for line
   * items that have previously been charged using `createChargeInvoice`. All
   * amounts (except for the summary) are incremental with respect to the
   * previous invoice.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async orderinvoicesCreaterefundinvoice(merchantId: bigint, orderId: string, req: OrderinvoicesCreateRefundInvoiceRequest): Promise<OrderinvoicesCreateRefundInvoiceResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderinvoices/${ orderId }/createRefundInvoice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrderinvoicesCreateRefundInvoiceResponse;
  }

  /**
   * Retrieves a report for disbursements from your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   */
  async orderreportsListdisbursements(merchantId: bigint, opts: OrderreportsListdisbursementsOptions = {}): Promise<OrderreportsListDisbursementsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreports/disbursements`);
    if (opts.disbursementEndDate !== undefined) {
      url.searchParams.append("disbursementEndDate", String(opts.disbursementEndDate));
    }
    if (opts.disbursementStartDate !== undefined) {
      url.searchParams.append("disbursementStartDate", String(opts.disbursementStartDate));
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
    return deserializeOrderreportsListDisbursementsResponse(data);
  }

  /**
   * Retrieves a list of transactions for a disbursement from your Merchant
   * Center account.
   *
   * @param disbursementId The Google-provided ID of the disbursement (found in Wallet).
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   */
  async orderreportsListtransactions(disbursementId: string, merchantId: bigint, opts: OrderreportsListtransactionsOptions = {}): Promise<OrderreportsListTransactionsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreports/disbursements/${ disbursementId }/transactions`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.transactionEndDate !== undefined) {
      url.searchParams.append("transactionEndDate", String(opts.transactionEndDate));
    }
    if (opts.transactionStartDate !== undefined) {
      url.searchParams.append("transactionStartDate", String(opts.transactionStartDate));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrderreportsListTransactionsResponse(data);
  }

  /**
   * Acks an order return in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param returnId The ID of the return.
   */
  async orderreturnsAcknowledge(merchantId: bigint, returnId: string, req: OrderreturnsAcknowledgeRequest): Promise<OrderreturnsAcknowledgeResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns/${ returnId }/acknowledge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrderreturnsAcknowledgeResponse;
  }

  /**
   * Create return in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   */
  async orderreturnsCreateorderreturn(merchantId: bigint, req: OrderreturnsCreateOrderReturnRequest): Promise<OrderreturnsCreateOrderReturnResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns/createOrderReturn`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrderreturnsCreateOrderReturnResponse;
  }

  /**
   * Retrieves an order return from your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param returnId Merchant order return ID generated by Google.
   */
  async orderreturnsGet(merchantId: bigint, returnId: string): Promise<MerchantOrderReturn> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns/${ returnId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MerchantOrderReturn;
  }

  /**
   * Links a return shipping label to a return id. You can only create one
   * return label per return id. Since the label is sent to the buyer, the
   * linked return label cannot be updated or deleted. If you try to create
   * multiple return shipping labels for a single return id, every create
   * request except the first will fail.
   *
   * @param merchantId Required. The merchant the Return Shipping Label belongs to.
   * @param returnId Required. Provide the Google-generated merchant order return ID.
   */
  async orderreturnsLabelsCreate(merchantId: bigint, returnId: string, req: ReturnShippingLabel): Promise<ReturnShippingLabel> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns/${ returnId }/labels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReturnShippingLabel;
  }

  /**
   * Lists order returns in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   */
  async orderreturnsList(merchantId: bigint, opts: OrderreturnsListOptions = {}): Promise<OrderreturnsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns`);
    if (opts.acknowledged !== undefined) {
      url.searchParams.append("acknowledged", String(opts.acknowledged));
    }
    if (opts.createdEndDate !== undefined) {
      url.searchParams.append("createdEndDate", String(opts.createdEndDate));
    }
    if (opts.createdStartDate !== undefined) {
      url.searchParams.append("createdStartDate", String(opts.createdStartDate));
    }
    if (opts.googleOrderIds !== undefined) {
      url.searchParams.append("googleOrderIds", String(opts.googleOrderIds));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.shipmentStates !== undefined) {
      url.searchParams.append("shipmentStates", String(opts.shipmentStates));
    }
    if (opts.shipmentStatus !== undefined) {
      url.searchParams.append("shipmentStatus", String(opts.shipmentStatus));
    }
    if (opts.shipmentTrackingNumbers !== undefined) {
      url.searchParams.append("shipmentTrackingNumbers", String(opts.shipmentTrackingNumbers));
    }
    if (opts.shipmentTypes !== undefined) {
      url.searchParams.append("shipmentTypes", String(opts.shipmentTypes));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as OrderreturnsListResponse;
  }

  /**
   * Processes return in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param returnId The ID of the return.
   */
  async orderreturnsProcess(merchantId: bigint, returnId: string, req: OrderreturnsProcessRequest): Promise<OrderreturnsProcessResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orderreturns/${ returnId }/process`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrderreturnsProcessResponse;
  }

  /**
   * Marks an order as acknowledged.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersAcknowledge(merchantId: bigint, orderId: string, req: OrdersAcknowledgeRequest): Promise<OrdersAcknowledgeResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/acknowledge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersAcknowledgeResponse;
  }

  /**
   * Sandbox only. Moves a test order from state "`inProgress`" to state
   * "`pendingShipment`".
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the test order to modify.
   */
  async ordersAdvancetestorder(merchantId: bigint, orderId: string): Promise<OrdersAdvanceTestOrderResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/testorders/${ orderId }/advance`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as OrdersAdvanceTestOrderResponse;
  }

  /**
   * Cancels all line items in an order, making a full refund.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order to cancel.
   */
  async ordersCancel(merchantId: bigint, orderId: string, req: OrdersCancelRequest): Promise<OrdersCancelResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersCancelResponse;
  }

  /**
   * Cancels a line item, making a full refund.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersCancellineitem(merchantId: bigint, orderId: string, req: OrdersCancelLineItemRequest): Promise<OrdersCancelLineItemResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/cancelLineItem`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersCancelLineItemResponse;
  }

  /**
   * Sandbox only. Cancels a test order for customer-initiated cancellation.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the test order to cancel.
   */
  async ordersCanceltestorderbycustomer(merchantId: bigint, orderId: string, req: OrdersCancelTestOrderByCustomerRequest): Promise<OrdersCancelTestOrderByCustomerResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/testorders/${ orderId }/cancelByCustomer`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersCancelTestOrderByCustomerResponse;
  }

  /**
   * Capture funds from the customer for the current order total. This method
   * should be called after the merchant verifies that they are able and ready
   * to start shipping the order. This method blocks until a response is
   * received from the payment processsor. If this method succeeds, the merchant
   * is guaranteed to receive funds for the order after shipment. If the request
   * fails, it can be retried or the order may be cancelled. This method cannot
   * be called after the entire order is already shipped. A rejected error code
   * is returned when the payment service provider has declined the charge. This
   * indicates a problem between the PSP and either the merchant's or customer's
   * account. Sometimes this error will be resolved by the customer. We
   * recommend retrying these errors once per day or cancelling the order with
   * reason `failedToCaptureFunds` if the items cannot be held.
   *
   * @param merchantId Required. The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId Required. The ID of the Order.
   */
  async ordersCaptureOrder(merchantId: bigint, orderId: string, req: CaptureOrderRequest): Promise<CaptureOrderResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/captureOrder`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CaptureOrderResponse;
  }

  /**
   * Sandbox only. Creates a test order.
   *
   * @param merchantId The ID of the account that should manage the order. This cannot be a multi-client account.
   */
  async ordersCreatetestorder(merchantId: bigint, req: OrdersCreateTestOrderRequest): Promise<OrdersCreateTestOrderResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/testorders`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersCreateTestOrderResponse;
  }

  /**
   * Sandbox only. Creates a test return.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersCreatetestreturn(merchantId: bigint, orderId: string, req: OrdersCreateTestReturnRequest): Promise<OrdersCreateTestReturnResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/testreturn`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersCreateTestReturnResponse;
  }

  /**
   * Retrieves an order from your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersGet(merchantId: bigint, orderId: string): Promise<Order> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrder(data);
  }

  /**
   * Retrieves an order using merchant order ID.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param merchantOrderId The merchant order ID to be looked for.
   */
  async ordersGetbymerchantorderid(merchantId: bigint, merchantOrderId: string): Promise<OrdersGetByMerchantOrderIdResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/ordersbymerchantid/${ merchantOrderId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrdersGetByMerchantOrderIdResponse(data);
  }

  /**
   * Sandbox only. Retrieves an order template that can be used to quickly
   * create a new order in sandbox.
   *
   * @param merchantId The ID of the account that should manage the order. This cannot be a multi-client account.
   * @param templateName The name of the template to retrieve.
   */
  async ordersGettestordertemplate(merchantId: bigint, templateName:  | "TEMPLATE1" | "TEMPLATE2" | "TEMPLATE1A" | "TEMPLATE1B" | "TEMPLATE3" | "TEMPLATE4", opts: OrdersGettestordertemplateOptions = {}): Promise<OrdersGetTestOrderTemplateResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/testordertemplates/${ templateName }`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as OrdersGetTestOrderTemplateResponse;
  }

  /**
   * Deprecated. Notifies that item return and refund was handled directly by
   * merchant outside of Google payments processing (for example, cash refund
   * done in store). Note: We recommend calling the returnrefundlineitem method
   * to refund in-store returns. We will issue the refund directly to the
   * customer. This helps to prevent possible differences arising between
   * merchant and Google transaction records. We also recommend having the point
   * of sale system communicate with Google to ensure that customers do not
   * receive a double refund by first refunding through Google then through an
   * in-store return.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersInstorerefundlineitem(merchantId: bigint, orderId: string, req: OrdersInStoreRefundLineItemRequest): Promise<OrdersInStoreRefundLineItemResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/inStoreRefundLineItem`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersInStoreRefundLineItemResponse;
  }

  /**
   * Lists the orders in your Merchant Center account.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   */
  async ordersList(merchantId: bigint, opts: OrdersListOptions = {}): Promise<OrdersListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders`);
    if (opts.acknowledged !== undefined) {
      url.searchParams.append("acknowledged", String(opts.acknowledged));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.placedDateEnd !== undefined) {
      url.searchParams.append("placedDateEnd", String(opts.placedDateEnd));
    }
    if (opts.placedDateStart !== undefined) {
      url.searchParams.append("placedDateStart", String(opts.placedDateStart));
    }
    if (opts.statuses !== undefined) {
      url.searchParams.append("statuses", String(opts.statuses));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrdersListResponse(data);
  }

  /**
   * Issues a partial or total refund for items and shipment.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order to refund.
   */
  async ordersRefunditem(merchantId: bigint, orderId: string, req: OrdersRefundItemRequest): Promise<OrdersRefundItemResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/refunditem`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersRefundItemResponse;
  }

  /**
   * Issues a partial or total refund for an order.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order to refund.
   */
  async ordersRefundorder(merchantId: bigint, orderId: string, req: OrdersRefundOrderRequest): Promise<OrdersRefundOrderResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/refundorder`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersRefundOrderResponse;
  }

  /**
   * Rejects return on an line item.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersRejectreturnlineitem(merchantId: bigint, orderId: string, req: OrdersRejectReturnLineItemRequest): Promise<OrdersRejectReturnLineItemResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/rejectReturnLineItem`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersRejectReturnLineItemResponse;
  }

  /**
   * Returns and refunds a line item. Note that this method can only be called
   * on fully shipped orders. The Orderreturns API is the preferred way to
   * handle returns after you receive a return from a customer. You can use
   * Orderreturns.list or Orderreturns.get to search for the return, and then
   * use Orderreturns.processreturn to issue the refund. If the return cannot be
   * found, then we recommend using this API to issue a refund.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersReturnrefundlineitem(merchantId: bigint, orderId: string, req: OrdersReturnRefundLineItemRequest): Promise<OrdersReturnRefundLineItemResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/returnRefundLineItem`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersReturnRefundLineItemResponse;
  }

  /**
   * Sets (or overrides if it already exists) merchant provided annotations in
   * the form of key-value pairs. A common use case would be to supply us with
   * additional structured information about a line item that cannot be provided
   * through other methods. Submitted key-value pairs can be retrieved as part
   * of the orders resource.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersSetlineitemmetadata(merchantId: bigint, orderId: string, req: OrdersSetLineItemMetadataRequest): Promise<OrdersSetLineItemMetadataResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/setLineItemMetadata`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersSetLineItemMetadataResponse;
  }

  /**
   * Marks line item(s) as shipped.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersShiplineitems(merchantId: bigint, orderId: string, req: OrdersShipLineItemsRequest): Promise<OrdersShipLineItemsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/shipLineItems`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersShipLineItemsResponse;
  }

  /**
   * Updates ship by and delivery by dates for a line item.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersUpdatelineitemshippingdetails(merchantId: bigint, orderId: string, req: OrdersUpdateLineItemShippingDetailsRequest): Promise<OrdersUpdateLineItemShippingDetailsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/updateLineItemShippingDetails`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersUpdateLineItemShippingDetailsResponse;
  }

  /**
   * Updates the merchant order ID for a given order.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersUpdatemerchantorderid(merchantId: bigint, orderId: string, req: OrdersUpdateMerchantOrderIdRequest): Promise<OrdersUpdateMerchantOrderIdResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/updateMerchantOrderId`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersUpdateMerchantOrderIdResponse;
  }

  /**
   * Updates a shipment's status, carrier, and/or tracking ID.
   *
   * @param merchantId The ID of the account that manages the order. This cannot be a multi-client account.
   * @param orderId The ID of the order.
   */
  async ordersUpdateshipment(merchantId: bigint, orderId: string, req: OrdersUpdateShipmentRequest): Promise<OrdersUpdateShipmentResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/orders/${ orderId }/updateShipment`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as OrdersUpdateShipmentResponse;
  }

  /**
   * Creates new order tracking signal.
   *
   * @param merchantId The ID of the merchant for which the order signal is created.
   */
  async ordertrackingsignalsCreate(merchantId: bigint, req: OrderTrackingSignal): Promise<OrderTrackingSignal> {
    merchantId = String(merchantId);
    req = serializeOrderTrackingSignal(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/ordertrackingsignals`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOrderTrackingSignal(data);
  }

  /**
   * Batches multiple POS-related calls in a single request.
   *
   */
  async posCustombatch(req: PosCustomBatchRequest): Promise<PosCustomBatchResponse> {
    req = serializePosCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}pos/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePosCustomBatchResponse(data);
  }

  /**
   * Deletes a store for the given merchant.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param storeCode A store code that is unique per merchant.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posDelete(merchantId: bigint, storeCode: string, targetMerchantId: bigint): Promise<void> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/store/${ storeCode }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves information about the given store.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param storeCode A store code that is unique per merchant.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posGet(merchantId: bigint, storeCode: string, targetMerchantId: bigint): Promise<PosStore> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/store/${ storeCode }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PosStore;
  }

  /**
   * Creates a store for the given merchant.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posInsert(merchantId: bigint, targetMerchantId: bigint, req: PosStore): Promise<PosStore> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/store`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as PosStore;
  }

  /**
   * Submit inventory for the given merchant.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posInventory(merchantId: bigint, targetMerchantId: bigint, req: PosInventoryRequest): Promise<PosInventoryResponse> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    req = serializePosInventoryRequest(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/inventory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePosInventoryResponse(data);
  }

  /**
   * Lists the stores of the target merchant.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posList(merchantId: bigint, targetMerchantId: bigint): Promise<PosListResponse> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/store`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PosListResponse;
  }

  /**
   * Submit a sale event for the given merchant.
   *
   * @param merchantId The ID of the POS or inventory data provider.
   * @param targetMerchantId The ID of the target merchant.
   */
  async posSale(merchantId: bigint, targetMerchantId: bigint, req: PosSaleRequest): Promise<PosSaleResponse> {
    merchantId = String(merchantId);
    targetMerchantId = String(targetMerchantId);
    req = serializePosSaleRequest(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pos/${ targetMerchantId }/sale`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePosSaleResponse(data);
  }

  /**
   * Creates or updates the delivery time of a product.
   *
   * @param merchantId The Google merchant ID of the account that contains the product. This account cannot be a multi-client account.
   */
  async productdeliverytimeCreate(merchantId: bigint, req: ProductDeliveryTime): Promise<ProductDeliveryTime> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productdeliverytime`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ProductDeliveryTime;
  }

  /**
   * Deletes the delivery time of a product.
   *
   * @param merchantId Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`.
   */
  async productdeliverytimeDelete(merchantId: bigint, productId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productdeliverytime/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets `productDeliveryTime` by `productId`.
   *
   * @param merchantId Required. The Google merchant ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId Required. The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`.
   */
  async productdeliverytimeGet(merchantId: bigint, productId: string): Promise<ProductDeliveryTime> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productdeliverytime/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductDeliveryTime;
  }

  /**
   * Retrieves, inserts, and deletes multiple products in a single request.
   *
   */
  async productsCustombatch(req: ProductsCustomBatchRequest): Promise<ProductsCustomBatchResponse> {
    req = serializeProductsCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}products/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProductsCustomBatchResponse(data);
  }

  /**
   * Deletes a product from your Merchant Center account.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product.
   */
  async productsDelete(merchantId: bigint, productId: string, opts: ProductsDeleteOptions = {}): Promise<void> {
    merchantId = String(merchantId);
    opts = serializeProductsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products/${ productId }`);
    if (opts.feedId !== undefined) {
      url.searchParams.append("feedId", String(opts.feedId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a product from your Merchant Center account.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product.
   */
  async productsGet(merchantId: bigint, productId: string): Promise<Product> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProduct(data);
  }

  /**
   * Uploads a product to your Merchant Center account. If an item with the
   * same channel, contentLanguage, offerId, and targetCountry already exists,
   * this method updates that entry.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   */
  async productsInsert(merchantId: bigint, req: Product, opts: ProductsInsertOptions = {}): Promise<Product> {
    merchantId = String(merchantId);
    req = serializeProduct(req);
    opts = serializeProductsInsertOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products`);
    if (opts.feedId !== undefined) {
      url.searchParams.append("feedId", String(opts.feedId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProduct(data);
  }

  /**
   * Lists the products in your Merchant Center account. The response might
   * contain fewer items than specified by maxResults. Rely on nextPageToken to
   * determine if there are more items to be requested.
   *
   * @param merchantId The ID of the account that contains the products. This account cannot be a multi-client account.
   */
  async productsList(merchantId: bigint, opts: ProductsListOptions = {}): Promise<ProductsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products`);
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
    return deserializeProductsListResponse(data);
  }

  /**
   * Gets the statuses of multiple products in a single request.
   *
   */
  async productstatusesCustombatch(req: ProductstatusesCustomBatchRequest): Promise<ProductstatusesCustomBatchResponse> {
    req = serializeProductstatusesCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}productstatuses/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ProductstatusesCustomBatchResponse;
  }

  /**
   * Gets the status of a product from your Merchant Center account.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product.
   */
  async productstatusesGet(merchantId: bigint, productId: string, opts: ProductstatusesGetOptions = {}): Promise<ProductStatus> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productstatuses/${ productId }`);
    if (opts.destinations !== undefined) {
      url.searchParams.append("destinations", String(opts.destinations));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductStatus;
  }

  /**
   * Lists the statuses of the products in your Merchant Center account.
   *
   * @param merchantId The ID of the account that contains the products. This account cannot be a multi-client account.
   */
  async productstatusesList(merchantId: bigint, opts: ProductstatusesListOptions = {}): Promise<ProductstatusesListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productstatuses`);
    if (opts.destinations !== undefined) {
      url.searchParams.append("destinations", String(opts.destinations));
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
    return data as ProductstatusesListResponse;
  }

  /**
   * Lists the metrics report for a given Repricing product.
   *
   * @param merchantId Required. Id of the merchant who owns the Repricing rule.
   * @param productId Required. Id of the Repricing product. Also known as the [REST_ID](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.id)
   */
  async productstatusesRepricingreportsList(merchantId: bigint, productId: string, opts: ProductstatusesRepricingreportsListOptions = {}): Promise<ListRepricingProductReportsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/productstatuses/${ productId }/repricingreports`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.ruleId !== undefined) {
      url.searchParams.append("ruleId", String(opts.ruleId));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListRepricingProductReportsResponse(data);
  }

  /**
   * Updates an existing product in your Merchant Center account. Only updates
   * attributes provided in the request.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product for which to update.
   */
  async productsUpdate(merchantId: bigint, productId: string, req: Product, opts: ProductsUpdateOptions = {}): Promise<Product> {
    merchantId = String(merchantId);
    req = serializeProduct(req);
    opts = serializeProductsUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products/${ productId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeProduct(data);
  }

  /**
   * Inserts a promotion for your Merchant Center account. If the promotion
   * already exists, then it updates the promotion instead. To [end or delete]
   * (https://developers.google.com/shopping-content/guides/promotions#end_a_promotion)
   * a promotion update the time period of the promotion to a time that has
   * already passed.
   *
   * @param merchantId Required. The ID of the account that contains the collection.
   */
  async promotionsCreate(merchantId: bigint, req: Promotion): Promise<Promotion> {
    merchantId = String(merchantId);
    req = serializePromotion(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/promotions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePromotion(data);
  }

  /**
   * Retrieves a promotion from your Merchant Center account.
   *
   * @param id Required. REST ID of the promotion to retrieve.
   * @param merchantId Required. The ID of the account that contains the collection.
   */
  async promotionsGet(id: string, merchantId: bigint): Promise<Promotion> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/promotions/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePromotion(data);
  }

  /**
   * Retrieves a Merchant Center account's pubsub notification settings.
   *
   * @param merchantId The ID of the account for which to get pubsub notification settings.
   */
  async pubsubnotificationsettingsGet(merchantId: bigint): Promise<PubsubNotificationSettings> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pubsubnotificationsettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PubsubNotificationSettings;
  }

  /**
   * Register a Merchant Center account for pubsub notifications. Note that
   * cloud topic name shouldn't be provided as part of the request.
   *
   * @param merchantId The ID of the account.
   */
  async pubsubnotificationsettingsUpdate(merchantId: bigint, req: PubsubNotificationSettings): Promise<PubsubNotificationSettings> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/pubsubnotificationsettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as PubsubNotificationSettings;
  }

  /**
   * Lists the daily call quota and usage per method for your Merchant Center
   * account.
   *
   * @param merchantId Required. The ID of the account that has quota. This account must be an admin.
   */
  async quotasList(merchantId: bigint, opts: QuotasListOptions = {}): Promise<ListMethodQuotasResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/quotas`);
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
    return deserializeListMethodQuotasResponse(data);
  }

  /**
   * Updates regional inventory for multiple products or regions in a single
   * request.
   *
   */
  async regionalinventoryCustombatch(req: RegionalinventoryCustomBatchRequest): Promise<RegionalinventoryCustomBatchResponse> {
    req = serializeRegionalinventoryCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}regionalinventory/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RegionalinventoryCustomBatchResponse;
  }

  /**
   * Updates the regional inventory of a product in your Merchant Center
   * account. If a regional inventory with the same region ID already exists,
   * this method updates that entry.
   *
   * @param merchantId The ID of the account that contains the product. This account cannot be a multi-client account.
   * @param productId The REST ID of the product for which to update the regional inventory.
   */
  async regionalinventoryInsert(merchantId: bigint, productId: string, req: RegionalInventory): Promise<RegionalInventory> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/products/${ productId }/regionalinventory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RegionalInventory;
  }

  /**
   * Creates a region definition in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant for which to create region definition.
   */
  async regionsCreate(merchantId: bigint, req: Region, opts: RegionsCreateOptions = {}): Promise<Region> {
    merchantId = String(merchantId);
    req = serializeRegion(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/regions`);
    if (opts.regionId !== undefined) {
      url.searchParams.append("regionId", String(opts.regionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRegion(data);
  }

  /**
   * Deletes a region definition from your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant for which to delete region definition.
   * @param regionId Required. The id of the region to delete.
   */
  async regionsDelete(merchantId: bigint, regionId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/regions/${ regionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a region defined in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve region definition.
   * @param regionId Required. The id of the region to retrieve.
   */
  async regionsGet(merchantId: bigint, regionId: string): Promise<Region> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/regions/${ regionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRegion(data);
  }

  /**
   * Lists the regions in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant for which to list region definitions.
   */
  async regionsList(merchantId: bigint, opts: RegionsListOptions = {}): Promise<ListRegionsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/regions`);
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
    return deserializeListRegionsResponse(data);
  }

  /**
   * Updates a region definition in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant for which to update region definition.
   * @param regionId Required. The id of the region to update.
   */
  async regionsPatch(merchantId: bigint, regionId: string, req: Region, opts: RegionsPatchOptions = {}): Promise<Region> {
    merchantId = String(merchantId);
    req = serializeRegion(req);
    opts = serializeRegionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}${ merchantId }/regions/${ regionId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRegion(data);
  }

  /**
   * Retrieves merchant performance mertrics matching the search query and
   * optionally segmented by selected dimensions.
   *
   * @param merchantId Required. Id of the merchant making the call. Must be a standalone account or an MCA subaccount.
   */
  async reportsSearch(merchantId: bigint, req: SearchRequest): Promise<SearchResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/reports/search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchResponse(data);
  }

  /**
   * Creates a repricing rule for your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant who owns the repricing rule.
   */
  async repricingrulesCreate(merchantId: bigint, req: RepricingRule, opts: RepricingrulesCreateOptions = {}): Promise<RepricingRule> {
    merchantId = String(merchantId);
    req = serializeRepricingRule(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules`);
    if (opts.ruleId !== undefined) {
      url.searchParams.append("ruleId", String(opts.ruleId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRepricingRule(data);
  }

  /**
   * Deletes a repricing rule in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant who owns the repricing rule.
   * @param ruleId Required. The id of the rule to Delete.
   */
  async repricingrulesDelete(merchantId: bigint, ruleId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules/${ ruleId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a repricing rule from your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant who owns the repricing rule.
   * @param ruleId Required. The id of the rule to retrieve.
   */
  async repricingrulesGet(merchantId: bigint, ruleId: string): Promise<RepricingRule> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules/${ ruleId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRepricingRule(data);
  }

  /**
   * Lists the repricing rules in your Merchant Center account.
   *
   * @param merchantId Required. The id of the merchant who owns the repricing rule.
   */
  async repricingrulesList(merchantId: bigint, opts: RepricingrulesListOptions = {}): Promise<ListRepricingRulesResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules`);
    if (opts.countryCode !== undefined) {
      url.searchParams.append("countryCode", String(opts.countryCode));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return deserializeListRepricingRulesResponse(data);
  }

  /**
   * Updates a repricing rule in your Merchant Center account. All mutable
   * fields will be overwritten in each update request. In each update, you must
   * provide all required mutable fields, or an error will be thrown. If you do
   * not provide an optional field in the update request, if that field
   * currently exists, it will be deleted from the rule.
   *
   * @param merchantId Required. The id of the merchant who owns the repricing rule.
   * @param ruleId Required. The id of the rule to update.
   */
  async repricingrulesPatch(merchantId: bigint, ruleId: string, req: RepricingRule): Promise<RepricingRule> {
    merchantId = String(merchantId);
    req = serializeRepricingRule(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules/${ ruleId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRepricingRule(data);
  }

  /**
   * Lists the metrics report for a given Repricing rule.
   *
   * @param merchantId Required. Id of the merchant who owns the Repricing rule.
   * @param ruleId Required. Id of the Repricing rule.
   */
  async repricingrulesRepricingreportsList(merchantId: bigint, ruleId: string, opts: RepricingrulesRepricingreportsListOptions = {}): Promise<ListRepricingRuleReportsResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/repricingrules/${ ruleId }/repricingreports`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListRepricingRuleReportsResponse(data);
  }

  /**
   * Batches multiple return address related calls in a single request.
   *
   */
  async returnaddressCustombatch(req: ReturnaddressCustomBatchRequest): Promise<ReturnaddressCustomBatchResponse> {
    req = serializeReturnaddressCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}returnaddress/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReturnaddressCustomBatchResponse;
  }

  /**
   * Deletes a return address for the given Merchant Center account.
   *
   * @param merchantId The Merchant Center account from which to delete the given return address.
   * @param returnAddressId Return address ID generated by Google.
   */
  async returnaddressDelete(merchantId: bigint, returnAddressId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnaddress/${ returnAddressId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a return address of the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to get a return address for.
   * @param returnAddressId Return address ID generated by Google.
   */
  async returnaddressGet(merchantId: bigint, returnAddressId: string): Promise<ReturnAddress> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnaddress/${ returnAddressId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ReturnAddress;
  }

  /**
   * Inserts a return address for the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to insert a return address for.
   */
  async returnaddressInsert(merchantId: bigint, req: ReturnAddress): Promise<ReturnAddress> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnaddress`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReturnAddress;
  }

  /**
   * Lists the return addresses of the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to list return addresses for.
   */
  async returnaddressList(merchantId: bigint, opts: ReturnaddressListOptions = {}): Promise<ReturnaddressListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnaddress`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
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
    return data as ReturnaddressListResponse;
  }

  /**
   * Batches multiple return policy related calls in a single request.
   *
   */
  async returnpolicyCustombatch(req: ReturnpolicyCustomBatchRequest): Promise<ReturnpolicyCustomBatchResponse> {
    req = serializeReturnpolicyCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}returnpolicy/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReturnpolicyCustomBatchResponse(data);
  }

  /**
   * Deletes a return policy for the given Merchant Center account.
   *
   * @param merchantId The Merchant Center account from which to delete the given return policy.
   * @param returnPolicyId Return policy ID generated by Google.
   */
  async returnpolicyDelete(merchantId: bigint, returnPolicyId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicy/${ returnPolicyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a return policy of the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to get a return policy for.
   * @param returnPolicyId Return policy ID generated by Google.
   */
  async returnpolicyGet(merchantId: bigint, returnPolicyId: string): Promise<ReturnPolicy> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicy/${ returnPolicyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReturnPolicy(data);
  }

  /**
   * Inserts a return policy for the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to insert a return policy for.
   */
  async returnpolicyInsert(merchantId: bigint, req: ReturnPolicy): Promise<ReturnPolicy> {
    merchantId = String(merchantId);
    req = serializeReturnPolicy(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReturnPolicy(data);
  }

  /**
   * Lists the return policies of the Merchant Center account.
   *
   * @param merchantId The Merchant Center account to list return policies for.
   */
  async returnpolicyList(merchantId: bigint): Promise<ReturnpolicyListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicy`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReturnpolicyListResponse(data);
  }

  /**
   * Creates a new return policy.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve the return policy online object.
   */
  async returnpolicyonlineCreate(merchantId: bigint, req: ReturnPolicyOnline): Promise<ReturnPolicyOnline> {
    merchantId = String(merchantId);
    req = serializeReturnPolicyOnline(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicyonline`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReturnPolicyOnline(data);
  }

  /**
   * Deletes an existing return policy.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve the return policy online object.
   * @param returnPolicyId Required. The id of the return policy to delete.
   */
  async returnpolicyonlineDelete(merchantId: bigint, returnPolicyId: string): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicyonline/${ returnPolicyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets an existing return policy.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve the return policy online object.
   * @param returnPolicyId Required. The id of the return policy to retrieve.
   */
  async returnpolicyonlineGet(merchantId: bigint, returnPolicyId: string): Promise<ReturnPolicyOnline> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicyonline/${ returnPolicyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReturnPolicyOnline(data);
  }

  /**
   * Lists all existing return policies.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve the return policy online object.
   */
  async returnpolicyonlineList(merchantId: bigint): Promise<ListReturnPolicyOnlineResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicyonline`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListReturnPolicyOnlineResponse(data);
  }

  /**
   * Updates an existing return policy.
   *
   * @param merchantId Required. The id of the merchant for which to retrieve the return policy online object.
   * @param returnPolicyId Required. The id of the return policy to update.
   */
  async returnpolicyonlinePatch(merchantId: bigint, returnPolicyId: string, req: ReturnPolicyOnline): Promise<ReturnPolicyOnline> {
    merchantId = String(merchantId);
    req = serializeReturnPolicyOnline(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/returnpolicyonline/${ returnPolicyId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeReturnPolicyOnline(data);
  }

  /**
   * Retrieves a settlement report from your Merchant Center account.
   *
   * @param merchantId The Merchant Center account of the settlement report.
   * @param settlementId The Google-provided ID of the settlement.
   */
  async settlementreportsGet(merchantId: bigint, settlementId: string): Promise<SettlementReport> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/settlementreports/${ settlementId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SettlementReport;
  }

  /**
   * Retrieves a list of settlement reports from your Merchant Center account.
   *
   * @param merchantId The Merchant Center account to list settlements for.
   */
  async settlementreportsList(merchantId: bigint, opts: SettlementreportsListOptions = {}): Promise<SettlementreportsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/settlementreports`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.transferEndDate !== undefined) {
      url.searchParams.append("transferEndDate", String(opts.transferEndDate));
    }
    if (opts.transferStartDate !== undefined) {
      url.searchParams.append("transferStartDate", String(opts.transferStartDate));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SettlementreportsListResponse;
  }

  /**
   * Retrieves a list of transactions for the settlement.
   *
   * @param merchantId The Merchant Center account to list transactions for.
   * @param settlementId The Google-provided ID of the settlement.
   */
  async settlementtransactionsList(merchantId: bigint, settlementId: string, opts: SettlementtransactionsListOptions = {}): Promise<SettlementtransactionsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/settlementreports/${ settlementId }/transactions`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.transactionIds !== undefined) {
      url.searchParams.append("transactionIds", String(opts.transactionIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SettlementtransactionsListResponse;
  }

  /**
   * Retrieves and updates the shipping settings of multiple accounts in a
   * single request.
   *
   */
  async shippingsettingsCustombatch(req: ShippingsettingsCustomBatchRequest): Promise<ShippingsettingsCustomBatchResponse> {
    req = serializeShippingsettingsCustomBatchRequest(req);
    const url = new URL(`${this.#baseUrl}shippingsettings/batch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeShippingsettingsCustomBatchResponse(data);
  }

  /**
   * Retrieves the shipping settings of the account.
   *
   * @param accountId The ID of the account for which to get/update shipping settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async shippingsettingsGet(accountId: bigint, merchantId: bigint): Promise<ShippingSettings> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/shippingsettings/${ accountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeShippingSettings(data);
  }

  /**
   * Retrieves supported carriers and carrier services for an account.
   *
   * @param merchantId The ID of the account for which to retrieve the supported carriers.
   */
  async shippingsettingsGetsupportedcarriers(merchantId: bigint): Promise<ShippingsettingsGetSupportedCarriersResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/supportedCarriers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ShippingsettingsGetSupportedCarriersResponse;
  }

  /**
   * Retrieves supported holidays for an account.
   *
   * @param merchantId The ID of the account for which to retrieve the supported holidays.
   */
  async shippingsettingsGetsupportedholidays(merchantId: bigint): Promise<ShippingsettingsGetSupportedHolidaysResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/supportedHolidays`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeShippingsettingsGetSupportedHolidaysResponse(data);
  }

  /**
   * Retrieves supported pickup services for an account.
   *
   * @param merchantId The ID of the account for which to retrieve the supported pickup services.
   */
  async shippingsettingsGetsupportedpickupservices(merchantId: bigint): Promise<ShippingsettingsGetSupportedPickupServicesResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/supportedPickupServices`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ShippingsettingsGetSupportedPickupServicesResponse;
  }

  /**
   * Lists the shipping settings of the sub-accounts in your Merchant Center
   * account.
   *
   * @param merchantId The ID of the managing account. This must be a multi-client account.
   */
  async shippingsettingsList(merchantId: bigint, opts: ShippingsettingsListOptions = {}): Promise<ShippingsettingsListResponse> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/shippingsettings`);
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
    return deserializeShippingsettingsListResponse(data);
  }

  /**
   * Updates the shipping settings of the account. Any fields that are not
   * provided are deleted from the resource.
   *
   * @param accountId The ID of the account for which to get/update shipping settings.
   * @param merchantId The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and `accountId` must be the ID of a sub-account of this account.
   */
  async shippingsettingsUpdate(accountId: bigint, merchantId: bigint, req: ShippingSettings): Promise<ShippingSettings> {
    accountId = String(accountId);
    merchantId = String(merchantId);
    req = serializeShippingSettings(req);
    const url = new URL(`${this.#baseUrl}${ merchantId }/shippingsettings/${ accountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeShippingSettings(data);
  }

  /**
   * Retrieves the status and review eligibility for the Shopping Ads program.
   * Returns errors and warnings if they require action to resolve, will become
   * disapprovals, or impact impressions. Use `accountstatuses` to view all
   * issues for an account.
   *
   * @param merchantId Required. The ID of the account.
   */
  async shoppingadsprogramGet(merchantId: bigint): Promise<ShoppingAdsProgramStatus> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/shoppingadsprogram`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeShoppingAdsProgramStatus(data);
  }

  /**
   * Requests a review of Shopping ads in a specific region. This method is
   * only available to selected merchants.
   *
   * @param merchantId Required. The ID of the account.
   */
  async shoppingadsprogramRequestreview(merchantId: bigint, req: RequestReviewShoppingAdsRequest): Promise<void> {
    merchantId = String(merchantId);
    const url = new URL(`${this.#baseUrl}${ merchantId }/shoppingadsprogram/requestreview`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }
}

/**
 * Account data. After the creation of a new account it may take a few minutes
 * before it's fully operational. The methods delete, insert, and update require
 * the admin role.
 */
export interface Account {
  /**
   * Output only. How the account is managed. Acceptable values are: -
   * "`manual`" - "`automatic`"
   */
  readonly accountManagement?: string;
  /**
   * Linked Ads accounts that are active or pending approval. To create a new
   * link request, add a new link with status `active` to the list. It will
   * remain in a `pending` state until approved or rejected either in the Ads
   * interface or through the Google Ads API. To delete an active link, or to
   * cancel a link request, remove it from the list.
   */
  adsLinks?: AccountAdsLink[];
  /**
   * Indicates whether the merchant sells adult content.
   */
  adultContent?: boolean;
  /**
   * The automatic improvements of the account can be used to automatically
   * update items, improve images and shipping. Each section inside
   * AutomaticImprovements is updated separately.
   */
  automaticImprovements?: AccountAutomaticImprovements;
  /**
   * Automatically created label IDs that are assigned to the account by CSS
   * Center.
   */
  automaticLabelIds?: bigint[];
  /**
   * The business information of the account.
   */
  businessInformation?: AccountBusinessInformation;
  /**
   * Settings for conversion tracking.
   */
  conversionSettings?: AccountConversionSettings;
  /**
   * ID of CSS the account belongs to.
   */
  cssId?: bigint;
  /**
   * The Business Profile which is linked or in the process of being linked
   * with the Merchant Center account.
   */
  googleMyBusinessLink?: AccountGoogleMyBusinessLink;
  /**
   * Required. 64-bit Merchant Center account ID.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#account`".
   */
  kind?: string;
  /**
   * Manually created label IDs that are assigned to the account by CSS.
   */
  labelIds?: bigint[];
  /**
   * Required. Display name for the account.
   */
  name?: string;
  /**
   * Client-specific, locally-unique, internal ID for the child account.
   */
  sellerId?: string;
  /**
   * Users with access to the account. Every account (except for subaccounts)
   * must have at least one admin user.
   */
  users?: AccountUser[];
  /**
   * The merchant's website.
   */
  websiteUrl?: string;
  /**
   * Linked YouTube channels that are active or pending approval. To create a
   * new link request, add a new link with status `active` to the list. It will
   * remain in a `pending` state until approved or rejected in the YT Creator
   * Studio interface. To delete an active link, or to cancel a link request,
   * remove it from the list.
   */
  youtubeChannelLinks?: AccountYouTubeChannelLink[];
}

function serializeAccount(data: any): Account {
  return {
    ...data,
    adsLinks: data["adsLinks"] !== undefined ? data["adsLinks"].map((item: any) => (serializeAccountAdsLink(item))) : undefined,
    automaticLabelIds: data["automaticLabelIds"] !== undefined ? data["automaticLabelIds"].map((item: any) => (String(item))) : undefined,
    cssId: data["cssId"] !== undefined ? String(data["cssId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeAccount(data: any): Account {
  return {
    ...data,
    adsLinks: data["adsLinks"] !== undefined ? data["adsLinks"].map((item: any) => (deserializeAccountAdsLink(item))) : undefined,
    automaticLabelIds: data["automaticLabelIds"] !== undefined ? data["automaticLabelIds"].map((item: any) => (BigInt(item))) : undefined,
    cssId: data["cssId"] !== undefined ? BigInt(data["cssId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface AccountAddress {
  /**
   * CLDR country code (for example, "US"). All MCA sub-accounts inherit the
   * country of their parent MCA by default, however the country can be updated
   * for individual sub-accounts.
   */
  country?: string;
  /**
   * City, town or commune. May also include dependent localities or
   * sublocalities (for example, neighborhoods or suburbs).
   */
  locality?: string;
  /**
   * Postal code or ZIP (for example, "94043").
   */
  postalCode?: string;
  /**
   * Top-level administrative subdivision of the country. For example, a state
   * like California ("CA") or a province like Quebec ("QC").
   */
  region?: string;
  /**
   * Street-level part of the address. Use `\n` to add a second line.
   */
  streetAddress?: string;
}

export interface AccountAdsLink {
  /**
   * Customer ID of the Ads account.
   */
  adsId?: bigint;
  /**
   * Status of the link between this Merchant Center account and the Ads
   * account. Upon retrieval, it represents the actual status of the link and
   * can be either `active` if it was approved in Google Ads or `pending` if
   * it's pending approval. Upon insertion, it represents the *intended* status
   * of the link. Re-uploading a link with status `active` when it's still
   * pending or with status `pending` when it's already active will have no
   * effect: the status will remain unchanged. Re-uploading a link with
   * deprecated status `inactive` is equivalent to not submitting the link at
   * all and will delete the link if it was active or cancel the link request if
   * it was pending. Acceptable values are: - "`active`" - "`pending`"
   */
  status?: string;
}

function serializeAccountAdsLink(data: any): AccountAdsLink {
  return {
    ...data,
    adsId: data["adsId"] !== undefined ? String(data["adsId"]) : undefined,
  };
}

function deserializeAccountAdsLink(data: any): AccountAdsLink {
  return {
    ...data,
    adsId: data["adsId"] !== undefined ? BigInt(data["adsId"]) : undefined,
  };
}

/**
 * The automatic improvements of the account can be used to automatically
 * update items, improve images and shipping.
 */
export interface AccountAutomaticImprovements {
  /**
   * This improvement will attempt to automatically correct submitted images if
   * they don't meet the [image
   * requirements](https://support.google.com/merchants/answer/6324350), for
   * example, removing overlays. If successful, the image will be replaced and
   * approved. This improvement is only applied to images of disapproved offers.
   * For more information see: [Automatic image
   * improvements](https://support.google.com/merchants/answer/9242973) This
   * field is only updated (cleared) if provided.
   */
  imageImprovements?: AccountImageImprovements;
  /**
   * Turning on [item
   * updates](https://support.google.com/merchants/answer/3246284) allows Google
   * to automatically update items for you. When item updates are on, Google
   * uses the structured data markup on the website and advanced data extractors
   * to update the price and availability of the items. When the item updates
   * are off, items with mismatched data aren't shown. This field is only
   * updated (cleared) if provided.
   */
  itemUpdates?: AccountItemUpdates;
  /**
   * Not available for MCAs
   * [accounts](https://support.google.com/merchants/answer/188487). By turning
   * on [automatic shipping
   * improvements](https://support.google.com/merchants/answer/10027038), you
   * are allowing Google to improve the accuracy of your delivery times shown to
   * shoppers using Google. More accurate delivery times, especially when
   * faster, typically lead to better conversion rates. Google will improve your
   * estimated delivery times based on various factors: - Delivery address of an
   * order - Current handling time and shipping time settings - Estimated
   * weekdays or business days - Parcel tracking data This field is only updated
   * (cleared) if provided.
   */
  shippingImprovements?: AccountShippingImprovements;
}

export interface AccountBusinessInformation {
  /**
   * The address of the business. Use `\n` to add a second address line.
   */
  address?: AccountAddress;
  /**
   * The customer service information of the business.
   */
  customerService?: AccountCustomerService;
  /**
   * The 10-digit [Korean business registration
   * number](https://support.google.com/merchants/answer/9037766) separated with
   * dashes in the format: XXX-XX-XXXXX. This field will only be updated if
   * explicitly set.
   */
  koreanBusinessRegistrationNumber?: string;
  /**
   * The phone number of the business in
   * [E.164](https://en.wikipedia.org/wiki/E.164) format. This can only be
   * updated if a verified phone number is not already set. To replace a
   * verified phone number use the `Accounts.requestphoneverification` and
   * `Accounts.verifyphonenumber`.
   */
  phoneNumber?: string;
  /**
   * Verification status of the phone number of the business. This status is
   * read only and can be updated only by successful phone verification.
   * Acceptable values are: - "`verified`" - "`unverified`"
   */
  phoneVerificationStatus?: string;
}

/**
 * Settings for conversion tracking.
 */
export interface AccountConversionSettings {
  /**
   * When enabled, free listing URLs have a parameter to enable conversion
   * tracking for products owned by the current merchant account. See
   * [auto-tagging](https://support.google.com/merchants/answer/11127659).
   */
  freeListingsAutoTaggingEnabled?: boolean;
}

/**
 * Credentials allowing Google to call a partner's API on behalf of a merchant.
 */
export interface AccountCredentials {
  /**
   * An OAuth access token.
   */
  accessToken?: string;
  /**
   * The amount of time, in seconds, after which the access token is no longer
   * valid.
   */
  expiresIn?: bigint;
  /**
   * Indicates to Google how Google should use these OAuth tokens.
   */
  purpose?:  | "ACCOUNT_CREDENTIALS_PURPOSE_UNSPECIFIED" | "SHOPIFY_ORDER_MANAGEMENT" | "SHOPIFY_INTEGRATION";
}

function serializeAccountCredentials(data: any): AccountCredentials {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeAccountCredentials(data: any): AccountCredentials {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
}

export interface AccountCustomerService {
  /**
   * Customer service email.
   */
  email?: string;
  /**
   * Customer service phone number.
   */
  phoneNumber?: string;
  /**
   * Customer service URL.
   */
  url?: string;
}

export interface AccountGoogleMyBusinessLink {
  /**
   * The ID of the Business Profile. If this is provided, then `gmbEmail` is
   * ignored. The value of this field should match the `accountId` used by the
   * Business Profile API.
   */
  gmbAccountId?: string;
  /**
   * The Business Profile email address of a specific account within a Business
   * Profile. A sample account within a Business Profile could be a business
   * account with set of locations, managed under the Business Profile.
   */
  gmbEmail?: string;
  /**
   * Status of the link between this Merchant Center account and the Business
   * Profile. Acceptable values are: - "`active`" - "`pending`"
   */
  status?: string;
}

export interface AccountIdentifier {
  /**
   * The aggregator ID, set for aggregators and subaccounts (in that case, it
   * represents the aggregator of the subaccount).
   */
  aggregatorId?: bigint;
  /**
   * The merchant account ID, set for individual accounts and subaccounts.
   */
  merchantId?: bigint;
}

function serializeAccountIdentifier(data: any): AccountIdentifier {
  return {
    ...data,
    aggregatorId: data["aggregatorId"] !== undefined ? String(data["aggregatorId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeAccountIdentifier(data: any): AccountIdentifier {
  return {
    ...data,
    aggregatorId: data["aggregatorId"] !== undefined ? BigInt(data["aggregatorId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * This improvement will attempt to automatically correct submitted images if
 * they don't meet the [image
 * requirements](https://support.google.com/merchants/answer/6324350), for
 * example, removing overlays. If successful, the image will be replaced and
 * approved. This improvement is only applied to images of disapproved offers.
 * For more information see: [Automatic image
 * improvements](https://support.google.com/merchants/answer/9242973)
 */
export interface AccountImageImprovements {
  /**
   * Determines how the images should be automatically updated. If this field
   * is not present, then the settings will be deleted. If there are no settings
   * for subaccount, they are inherited from aggregator.
   */
  accountImageImprovementsSettings?: AccountImageImprovementsSettings;
  /**
   * Output only. The effective value of allow_automatic_image_improvements. If
   * account_image_improvements_settings is present, then this value is the
   * same. Otherwise, it represents the inherited value of the parent account.
   * Read-only.
   */
  readonly effectiveAllowAutomaticImageImprovements?: boolean;
}

/**
 * Settings for the Automatic Image Improvements.
 */
export interface AccountImageImprovementsSettings {
  /**
   * Enables automatic image improvements.
   */
  allowAutomaticImageImprovements?: boolean;
}

/**
 * Turning on [item
 * updates](https://support.google.com/merchants/answer/3246284) allows Google
 * to automatically update items for you. When item updates are on, Google uses
 * the structured data markup on the website and advanced data extractors to
 * update the price and availability of the items. When the item updates are
 * off, items with mismatched data aren't shown.
 */
export interface AccountItemUpdates {
  /**
   * Determines which attributes of the items should be automatically updated.
   * If this field is not present, then the settings will be deleted. If there
   * are no settings for subaccount, they are inherited from aggregator.
   */
  accountItemUpdatesSettings?: AccountItemUpdatesSettings;
  /**
   * Output only. The effective value of allow_availability_updates. If
   * account_item_updates_settings is present, then this value is the same.
   * Otherwise, it represents the inherited value of the parent account.
   * Read-only.
   */
  readonly effectiveAllowAvailabilityUpdates?: boolean;
  /**
   * Output only. The effective value of allow_condition_updates. If
   * account_item_updates_settings is present, then this value is the same.
   * Otherwise, it represents the inherited value of the parent account.
   * Read-only.
   */
  readonly effectiveAllowConditionUpdates?: boolean;
  /**
   * Output only. The effective value of allow_price_updates. If
   * account_item_updates_settings is present, then this value is the same.
   * Otherwise, it represents the inherited value of the parent account.
   * Read-only.
   */
  readonly effectiveAllowPriceUpdates?: boolean;
  /**
   * Output only. The effective value of allow_strict_availability_updates. If
   * account_item_updates_settings is present, then this value is the same.
   * Otherwise, it represents the inherited value of the parent account.
   * Read-only.
   */
  readonly effectiveAllowStrictAvailabilityUpdates?: boolean;
}

/**
 * Settings for the Automatic Item Updates.
 */
export interface AccountItemUpdatesSettings {
  /**
   * If availability updates are enabled, any previous availability values get
   * overwritten if Google finds an out-of-stock annotation on the offer's page.
   * If additionally `allow_availability_updates` field is set to true, values
   * get overwritten if Google finds an in-stock annotation on the offer’s page.
   */
  allowAvailabilityUpdates?: boolean;
  /**
   * If condition updates are enabled, Google always updates item condition
   * with the condition detected from the details of your product.
   */
  allowConditionUpdates?: boolean;
  /**
   * If price updates are enabled, Google always updates the active price with
   * the crawled information.
   */
  allowPriceUpdates?: boolean;
  /**
   * If allow_availability_updates is enabled, items are automatically updated
   * in all your Shopping target countries. By default, availability updates
   * will only be applied to items that are 'out of stock' on your website but
   * 'in stock' on Shopping. Set this to true to also update items that are 'in
   * stock' on your website, but 'out of stock' on Google Shopping. In order for
   * this field to have an effect, you must also allow availability updates.
   */
  allowStrictAvailabilityUpdates?: boolean;
}

/**
 * Label assigned by CSS domain or CSS group to one of its sub-accounts.
 */
export interface AccountLabel {
  /**
   * Immutable. The ID of account this label belongs to.
   */
  accountId?: bigint;
  /**
   * The description of this label.
   */
  description?: string;
  /**
   * Output only. The ID of the label.
   */
  readonly labelId?: bigint;
  /**
   * Output only. The type of this label.
   */
  readonly labelType?:  | "LABEL_TYPE_UNSPECIFIED" | "MANUAL" | "AUTOMATIC";
  /**
   * The display name of this label.
   */
  name?: string;
}

function serializeAccountLabel(data: any): AccountLabel {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
  };
}

function deserializeAccountLabel(data: any): AccountLabel {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    labelId: data["labelId"] !== undefined ? BigInt(data["labelId"]) : undefined,
  };
}

/**
 * The return carrier information. This service is designed for merchants
 * enrolled in the Buy on Google program.
 */
export interface AccountReturnCarrier {
  /**
   * Output only. Immutable. The Google-provided unique carrier ID, used to
   * update the resource.
   */
  readonly carrierAccountId?: bigint;
  /**
   * Name of the carrier account.
   */
  carrierAccountName?: string;
  /**
   * Number of the carrier account.
   */
  carrierAccountNumber?: string;
  /**
   * The carrier code enum. Accepts the values FEDEX or UPS.
   */
  carrierCode?:  | "CARRIER_CODE_UNSPECIFIED" | "FEDEX" | "UPS";
}

export interface AccountsAuthInfoResponse {
  /**
   * The account identifiers corresponding to the authenticated user. - For an
   * individual account: only the merchant ID is defined - For an aggregator:
   * only the aggregator ID is defined - For a subaccount of an MCA: both the
   * merchant ID and the aggregator ID are defined.
   */
  accountIdentifiers?: AccountIdentifier[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsAuthInfoResponse`".
   */
  kind?: string;
}

function serializeAccountsAuthInfoResponse(data: any): AccountsAuthInfoResponse {
  return {
    ...data,
    accountIdentifiers: data["accountIdentifiers"] !== undefined ? data["accountIdentifiers"].map((item: any) => (serializeAccountIdentifier(item))) : undefined,
  };
}

function deserializeAccountsAuthInfoResponse(data: any): AccountsAuthInfoResponse {
  return {
    ...data,
    accountIdentifiers: data["accountIdentifiers"] !== undefined ? data["accountIdentifiers"].map((item: any) => (deserializeAccountIdentifier(item))) : undefined,
  };
}

/**
 * Additional options for Content#accountsClaimwebsite.
 */
export interface AccountsClaimwebsiteOptions {
  /**
   * Only available to selected merchants, for example multi-client accounts
   * (MCAs) and their sub-accounts. When set to `True`, this option removes any
   * existing claim on the requested website and replaces it with a claim from
   * the account that makes the request.
   */
  overwrite?: boolean;
}

export interface AccountsClaimWebsiteResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsClaimWebsiteResponse`".
   */
  kind?: string;
}

export interface AccountsCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: AccountsCustomBatchRequestEntry[];
}

function serializeAccountsCustomBatchRequest(data: any): AccountsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccountsCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeAccountsCustomBatchRequest(data: any): AccountsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccountsCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accounts request.
 */
export interface AccountsCustomBatchRequestEntry {
  /**
   * The account to create or update. Only defined if the method is `insert` or
   * `update`.
   */
  account?: Account;
  /**
   * The ID of the targeted account. Only defined if the method is not
   * `insert`.
   */
  accountId?: bigint;
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * Whether the account should be deleted if the account has offers. Only
   * applicable if the method is `delete`.
   */
  force?: boolean;
  /**
   * Label IDs for the 'updatelabels' request.
   */
  labelIds?: bigint[];
  /**
   * Details about the `link` request.
   */
  linkRequest?: AccountsCustomBatchRequestEntryLinkRequest;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`claimWebsite`" -
   * "`delete`" - "`get`" - "`insert`" - "`link`" - "`update`"
   */
  method?: string;
  /**
   * Only applicable if the method is `claimwebsite`. Indicates whether or not
   * to take the claim from another account in case there is a conflict.
   */
  overwrite?: boolean;
  /**
   * Controls which fields are visible. Only applicable if the method is 'get'.
   */
  view?: string;
}

function serializeAccountsCustomBatchRequestEntry(data: any): AccountsCustomBatchRequestEntry {
  return {
    ...data,
    account: data["account"] !== undefined ? serializeAccount(data["account"]) : undefined,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (String(item))) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeAccountsCustomBatchRequestEntry(data: any): AccountsCustomBatchRequestEntry {
  return {
    ...data,
    account: data["account"] !== undefined ? deserializeAccount(data["account"]) : undefined,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (BigInt(item))) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface AccountsCustomBatchRequestEntryLinkRequest {
  /**
   * Action to perform for this link. The `"request"` action is only available
   * to select merchants. Acceptable values are: - "`approve`" - "`remove`" -
   * "`request`"
   */
  action?: string;
  /**
   * The ID of the linked account.
   */
  linkedAccountId?: string;
  /**
   * Type of the link between the two accounts. Acceptable values are: -
   * "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`"
   */
  linkType?: string;
  /**
   * Provided services. Acceptable values are: -
   * "`shoppingAdsProductManagement`" - "`shoppingActionsProductManagement`" -
   * "`shoppingActionsOrderManagement`" - "`paymentProcessing`"
   */
  services?: string[];
}

export interface AccountsCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: AccountsCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsCustomBatchResponse`".
   */
  kind?: string;
}

function serializeAccountsCustomBatchResponse(data: any): AccountsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccountsCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeAccountsCustomBatchResponse(data: any): AccountsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccountsCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accounts response.
 */
export interface AccountsCustomBatchResponseEntry {
  /**
   * The retrieved, created, or updated account. Not defined if the method was
   * `delete`, `claimwebsite` or `link`.
   */
  account?: Account;
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsCustomBatchResponseEntry`"
   */
  kind?: string;
}

function serializeAccountsCustomBatchResponseEntry(data: any): AccountsCustomBatchResponseEntry {
  return {
    ...data,
    account: data["account"] !== undefined ? serializeAccount(data["account"]) : undefined,
  };
}

function deserializeAccountsCustomBatchResponseEntry(data: any): AccountsCustomBatchResponseEntry {
  return {
    ...data,
    account: data["account"] !== undefined ? deserializeAccount(data["account"]) : undefined,
  };
}

/**
 * Additional options for Content#accountsDelete.
 */
export interface AccountsDeleteOptions {
  /**
   * Option to delete sub-accounts with products. The default value is false.
   */
  force?: boolean;
}

/**
 * Additional options for Content#accountsGet.
 */
export interface AccountsGetOptions {
  /**
   * Controls which fields will be populated. Acceptable values are: "merchant"
   * and "css". The default value is "merchant".
   */
  view?:  | "MERCHANT" | "CSS";
}

/**
 * Not available for MCAs
 * [accounts](https://support.google.com/merchants/answer/188487). By turning on
 * [automatic shipping
 * improvements](https://support.google.com/merchants/answer/10027038), you are
 * allowing Google to improve the accuracy of your delivery times shown to
 * shoppers using Google. More accurate delivery times, especially when faster,
 * typically lead to better conversion rates. Google will improve your estimated
 * delivery times based on various factors: * Delivery address of an order *
 * Current handling time and shipping time settings * Estimated weekdays or
 * business days * Parcel tracking data
 */
export interface AccountShippingImprovements {
  /**
   * Enables automatic shipping improvements.
   */
  allowShippingImprovements?: boolean;
}

/**
 * Additional options for Content#accountsLabelsList.
 */
export interface AccountsLabelsListOptions {
  /**
   * The maximum number of labels to return. The service may return fewer than
   * this value. If unspecified, at most 50 labels will be returned. The maximum
   * value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAccountLabels` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAccountLabels` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

export interface AccountsLinkRequest {
  /**
   * Action to perform for this link. The `"request"` action is only available
   * to select merchants. Acceptable values are: - "`approve`" - "`remove`" -
   * "`request`"
   */
  action?: string;
  /**
   * Additional information required for `eCommercePlatform` link type.
   */
  eCommercePlatformLinkInfo?: ECommercePlatformLinkInfo;
  /**
   * The ID of the linked account.
   */
  linkedAccountId?: string;
  /**
   * Type of the link between the two accounts. Acceptable values are: -
   * "`channelPartner`" - "`eCommercePlatform`" - "`paymentServiceProvider`"
   */
  linkType?: string;
  /**
   * Additional information required for `paymentServiceProvider` link type.
   */
  paymentServiceProviderLinkInfo?: PaymentServiceProviderLinkInfo;
  /**
   * Acceptable values are: - "`shoppingAdsProductManagement`" -
   * "`shoppingActionsProductManagement`" - "`shoppingActionsOrderManagement`" -
   * "`paymentProcessing`"
   */
  services?: string[];
}

export interface AccountsLinkResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsLinkResponse`".
   */
  kind?: string;
}

/**
 * Additional options for Content#accountsListlinks.
 */
export interface AccountsListlinksOptions {
  /**
   * The maximum number of links to return in the response, used for
   * pagination. The minimum allowed value is 5 results per page. If provided
   * value is lower than 5, it will be automatically increased to 5.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface AccountsListLinksResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsListLinksResponse`".
   */
  kind?: string;
  /**
   * The list of available links.
   */
  links?: LinkedAccount[];
  /**
   * The token for the retrieval of the next page of links.
   */
  nextPageToken?: string;
}

/**
 * Additional options for Content#accountsList.
 */
export interface AccountsListOptions {
  /**
   * If view is set to "css", only return accounts that are assigned label with
   * given ID.
   */
  label?: bigint;
  /**
   * The maximum number of accounts to return in the response, used for paging.
   */
  maxResults?: number;
  /**
   * If set, only the accounts with the given name (case sensitive) will be
   * returned.
   */
  name?: string;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * Controls which fields will be populated. Acceptable values are: "merchant"
   * and "css". The default value is "merchant".
   */
  view?:  | "MERCHANT" | "CSS";
}

function serializeAccountsListOptions(data: any): AccountsListOptions {
  return {
    ...data,
    label: data["label"] !== undefined ? String(data["label"]) : undefined,
  };
}

function deserializeAccountsListOptions(data: any): AccountsListOptions {
  return {
    ...data,
    label: data["label"] !== undefined ? BigInt(data["label"]) : undefined,
  };
}

export interface AccountsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of accounts.
   */
  nextPageToken?: string;
  resources?: Account[];
}

function serializeAccountsListResponse(data: any): AccountsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeAccount(item))) : undefined,
  };
}

function deserializeAccountsListResponse(data: any): AccountsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeAccount(item))) : undefined,
  };
}

/**
 * The status of an account, that is, information about its products, which is
 * computed offline and not returned immediately at insertion time.
 */
export interface AccountStatus {
  /**
   * The ID of the account for which the status is reported.
   */
  accountId?: string;
  /**
   * A list of account level issues.
   */
  accountLevelIssues?: AccountStatusAccountLevelIssue[];
  /**
   * How the account is managed. Acceptable values are: - "`manual`" -
   * "`automatic`"
   */
  accountManagement?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountStatus`"
   */
  kind?: string;
  /**
   * List of product-related data by channel, destination, and country. Data in
   * this field may be delayed by up to 30 minutes.
   */
  products?: AccountStatusProducts[];
  /**
   * Whether the account's website is claimed or not.
   */
  websiteClaimed?: boolean;
}

function serializeAccountStatus(data: any): AccountStatus {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (serializeAccountStatusProducts(item))) : undefined,
  };
}

function deserializeAccountStatus(data: any): AccountStatus {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (deserializeAccountStatusProducts(item))) : undefined,
  };
}

export interface AccountStatusAccountLevelIssue {
  /**
   * Country for which this issue is reported.
   */
  country?: string;
  /**
   * The destination the issue applies to. If this field is empty then the
   * issue applies to all available destinations.
   */
  destination?: string;
  /**
   * Additional details about the issue.
   */
  detail?: string;
  /**
   * The URL of a web page to help resolving this issue.
   */
  documentation?: string;
  /**
   * Issue identifier.
   */
  id?: string;
  /**
   * Severity of the issue. Acceptable values are: - "`critical`" - "`error`" -
   * "`suggestion`"
   */
  severity?: string;
  /**
   * Short description of the issue.
   */
  title?: string;
}

export interface AccountstatusesCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: AccountstatusesCustomBatchRequestEntry[];
}

function serializeAccountstatusesCustomBatchRequest(data: any): AccountstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccountstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeAccountstatusesCustomBatchRequest(data: any): AccountstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccountstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accountstatuses request.
 */
export interface AccountstatusesCustomBatchRequestEntry {
  /**
   * The ID of the (sub-)account whose status to get.
   */
  accountId?: bigint;
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string[];
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`"
   */
  method?: string;
}

function serializeAccountstatusesCustomBatchRequestEntry(data: any): AccountstatusesCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeAccountstatusesCustomBatchRequestEntry(data: any): AccountstatusesCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface AccountstatusesCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: AccountstatusesCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountstatusesCustomBatchResponse`".
   */
  kind?: string;
}

function serializeAccountstatusesCustomBatchResponse(data: any): AccountstatusesCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccountstatusesCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeAccountstatusesCustomBatchResponse(data: any): AccountstatusesCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccountstatusesCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accountstatuses response.
 */
export interface AccountstatusesCustomBatchResponseEntry {
  /**
   * The requested account status. Defined if and only if the request was
   * successful.
   */
  accountStatus?: AccountStatus;
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
}

function serializeAccountstatusesCustomBatchResponseEntry(data: any): AccountstatusesCustomBatchResponseEntry {
  return {
    ...data,
    accountStatus: data["accountStatus"] !== undefined ? serializeAccountStatus(data["accountStatus"]) : undefined,
  };
}

function deserializeAccountstatusesCustomBatchResponseEntry(data: any): AccountstatusesCustomBatchResponseEntry {
  return {
    ...data,
    accountStatus: data["accountStatus"] !== undefined ? deserializeAccountStatus(data["accountStatus"]) : undefined,
  };
}

/**
 * Additional options for Content#accountstatusesGet.
 */
export interface AccountstatusesGetOptions {
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string;
}

/**
 * Additional options for Content#accountstatusesList.
 */
export interface AccountstatusesListOptions {
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string;
  /**
   * The maximum number of account statuses to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * If set, only the accounts with the given name (case sensitive) will be
   * returned.
   */
  name?: string;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface AccountstatusesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountstatusesListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of account statuses.
   */
  nextPageToken?: string;
  resources?: AccountStatus[];
}

function serializeAccountstatusesListResponse(data: any): AccountstatusesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeAccountStatus(item))) : undefined,
  };
}

function deserializeAccountstatusesListResponse(data: any): AccountstatusesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeAccountStatus(item))) : undefined,
  };
}

export interface AccountStatusItemLevelIssue {
  /**
   * The attribute's name, if the issue is caused by a single attribute.
   */
  attributeName?: string;
  /**
   * The error code of the issue.
   */
  code?: string;
  /**
   * A short issue description in English.
   */
  description?: string;
  /**
   * A detailed issue description in English.
   */
  detail?: string;
  /**
   * The URL of a web page to help with resolving this issue.
   */
  documentation?: string;
  /**
   * Number of items with this issue.
   */
  numItems?: bigint;
  /**
   * Whether the issue can be resolved by the merchant.
   */
  resolution?: string;
  /**
   * How this issue affects serving of the offer.
   */
  servability?: string;
}

function serializeAccountStatusItemLevelIssue(data: any): AccountStatusItemLevelIssue {
  return {
    ...data,
    numItems: data["numItems"] !== undefined ? String(data["numItems"]) : undefined,
  };
}

function deserializeAccountStatusItemLevelIssue(data: any): AccountStatusItemLevelIssue {
  return {
    ...data,
    numItems: data["numItems"] !== undefined ? BigInt(data["numItems"]) : undefined,
  };
}

export interface AccountStatusProducts {
  /**
   * The channel the data applies to. Acceptable values are: - "`local`" -
   * "`online`"
   */
  channel?: string;
  /**
   * The country the data applies to.
   */
  country?: string;
  /**
   * The destination the data applies to.
   */
  destination?: string;
  /**
   * List of item-level issues.
   */
  itemLevelIssues?: AccountStatusItemLevelIssue[];
  /**
   * Aggregated product statistics.
   */
  statistics?: AccountStatusStatistics;
}

function serializeAccountStatusProducts(data: any): AccountStatusProducts {
  return {
    ...data,
    itemLevelIssues: data["itemLevelIssues"] !== undefined ? data["itemLevelIssues"].map((item: any) => (serializeAccountStatusItemLevelIssue(item))) : undefined,
    statistics: data["statistics"] !== undefined ? serializeAccountStatusStatistics(data["statistics"]) : undefined,
  };
}

function deserializeAccountStatusProducts(data: any): AccountStatusProducts {
  return {
    ...data,
    itemLevelIssues: data["itemLevelIssues"] !== undefined ? data["itemLevelIssues"].map((item: any) => (deserializeAccountStatusItemLevelIssue(item))) : undefined,
    statistics: data["statistics"] !== undefined ? deserializeAccountStatusStatistics(data["statistics"]) : undefined,
  };
}

export interface AccountStatusStatistics {
  /**
   * Number of active offers.
   */
  active?: bigint;
  /**
   * Number of disapproved offers.
   */
  disapproved?: bigint;
  /**
   * Number of expiring offers.
   */
  expiring?: bigint;
  /**
   * Number of pending offers.
   */
  pending?: bigint;
}

function serializeAccountStatusStatistics(data: any): AccountStatusStatistics {
  return {
    ...data,
    active: data["active"] !== undefined ? String(data["active"]) : undefined,
    disapproved: data["disapproved"] !== undefined ? String(data["disapproved"]) : undefined,
    expiring: data["expiring"] !== undefined ? String(data["expiring"]) : undefined,
    pending: data["pending"] !== undefined ? String(data["pending"]) : undefined,
  };
}

function deserializeAccountStatusStatistics(data: any): AccountStatusStatistics {
  return {
    ...data,
    active: data["active"] !== undefined ? BigInt(data["active"]) : undefined,
    disapproved: data["disapproved"] !== undefined ? BigInt(data["disapproved"]) : undefined,
    expiring: data["expiring"] !== undefined ? BigInt(data["expiring"]) : undefined,
    pending: data["pending"] !== undefined ? BigInt(data["pending"]) : undefined,
  };
}

export interface AccountsUpdateLabelsRequest {
  /**
   * The IDs of labels that should be assigned to the account.
   */
  labelIds?: bigint[];
}

function serializeAccountsUpdateLabelsRequest(data: any): AccountsUpdateLabelsRequest {
  return {
    ...data,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeAccountsUpdateLabelsRequest(data: any): AccountsUpdateLabelsRequest {
  return {
    ...data,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface AccountsUpdateLabelsResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountsUpdateLabelsResponse`".
   */
  kind?: string;
}

/**
 * The tax settings of a merchant account. All methods require the admin role.
 */
export interface AccountTax {
  /**
   * Required. The ID of the account to which these account tax settings
   * belong.
   */
  accountId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accountTax`".
   */
  kind?: string;
  /**
   * Tax rules. Updating the tax rules will enable "US" taxes (not reversible).
   * Defining no rules is equivalent to not charging tax at all.
   */
  rules?: AccountTaxTaxRule[];
}

function serializeAccountTax(data: any): AccountTax {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeAccountTaxTaxRule(item))) : undefined,
  };
}

function deserializeAccountTax(data: any): AccountTax {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeAccountTaxTaxRule(item))) : undefined,
  };
}

export interface AccounttaxCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: AccounttaxCustomBatchRequestEntry[];
}

function serializeAccounttaxCustomBatchRequest(data: any): AccounttaxCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccounttaxCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeAccounttaxCustomBatchRequest(data: any): AccounttaxCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccounttaxCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accounttax request.
 */
export interface AccounttaxCustomBatchRequestEntry {
  /**
   * The ID of the account for which to get/update account tax settings.
   */
  accountId?: bigint;
  /**
   * The account tax settings to update. Only defined if the method is
   * `update`.
   */
  accountTax?: AccountTax;
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`" -
   * "`update`"
   */
  method?: string;
}

function serializeAccounttaxCustomBatchRequestEntry(data: any): AccounttaxCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    accountTax: data["accountTax"] !== undefined ? serializeAccountTax(data["accountTax"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeAccounttaxCustomBatchRequestEntry(data: any): AccounttaxCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    accountTax: data["accountTax"] !== undefined ? deserializeAccountTax(data["accountTax"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface AccounttaxCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: AccounttaxCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accounttaxCustomBatchResponse`".
   */
  kind?: string;
}

function serializeAccounttaxCustomBatchResponse(data: any): AccounttaxCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeAccounttaxCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeAccounttaxCustomBatchResponse(data: any): AccounttaxCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeAccounttaxCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch accounttax response.
 */
export interface AccounttaxCustomBatchResponseEntry {
  /**
   * The retrieved or updated account tax settings.
   */
  accountTax?: AccountTax;
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accounttaxCustomBatchResponseEntry`"
   */
  kind?: string;
}

function serializeAccounttaxCustomBatchResponseEntry(data: any): AccounttaxCustomBatchResponseEntry {
  return {
    ...data,
    accountTax: data["accountTax"] !== undefined ? serializeAccountTax(data["accountTax"]) : undefined,
  };
}

function deserializeAccounttaxCustomBatchResponseEntry(data: any): AccounttaxCustomBatchResponseEntry {
  return {
    ...data,
    accountTax: data["accountTax"] !== undefined ? deserializeAccountTax(data["accountTax"]) : undefined,
  };
}

/**
 * Additional options for Content#accounttaxList.
 */
export interface AccounttaxListOptions {
  /**
   * The maximum number of tax settings to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface AccounttaxListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#accounttaxListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of account tax settings.
   */
  nextPageToken?: string;
  resources?: AccountTax[];
}

function serializeAccounttaxListResponse(data: any): AccounttaxListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeAccountTax(item))) : undefined,
  };
}

function deserializeAccounttaxListResponse(data: any): AccounttaxListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeAccountTax(item))) : undefined,
  };
}

/**
 * Tax calculation rule to apply in a state or province (US only).
 */
export interface AccountTaxTaxRule {
  /**
   * Country code in which tax is applicable.
   */
  country?: string;
  /**
   * Required. State (or province) is which the tax is applicable, described by
   * its location ID (also called criteria ID).
   */
  locationId?: bigint;
  /**
   * Explicit tax rate in percent, represented as a floating point number
   * without the percentage character. Must not be negative.
   */
  ratePercent?: string;
  /**
   * If true, shipping charges are also taxed.
   */
  shippingTaxed?: boolean;
  /**
   * Whether the tax rate is taken from a global tax table or specified
   * explicitly.
   */
  useGlobalRate?: boolean;
}

function serializeAccountTaxTaxRule(data: any): AccountTaxTaxRule {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? String(data["locationId"]) : undefined,
  };
}

function deserializeAccountTaxTaxRule(data: any): AccountTaxTaxRule {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? BigInt(data["locationId"]) : undefined,
  };
}

export interface AccountUser {
  /**
   * Whether user is an admin.
   */
  admin?: boolean;
  /**
   * User's email address.
   */
  emailAddress?: string;
  /**
   * Whether user is an order manager.
   */
  orderManager?: boolean;
  /**
   * Whether user can access payment statements.
   */
  paymentsAnalyst?: boolean;
  /**
   * Whether user can manage payment settings.
   */
  paymentsManager?: boolean;
  /**
   * Whether user is a reporting manager.
   */
  reportingManager?: boolean;
}

export interface AccountYouTubeChannelLink {
  /**
   * Channel ID.
   */
  channelId?: string;
  /**
   * Status of the link between this Merchant Center account and the YouTube
   * channel. Upon retrieval, it represents the actual status of the link and
   * can be either `active` if it was approved in YT Creator Studio or `pending`
   * if it's pending approval. Upon insertion, it represents the *intended*
   * status of the link. Re-uploading a link with status `active` when it's
   * still pending or with status `pending` when it's already active will have
   * no effect: the status will remain unchanged. Re-uploading a link with
   * deprecated status `inactive` is equivalent to not submitting the link at
   * all and will delete the link if it was active or cancel the link request if
   * it was pending.
   */
  status?: string;
}

/**
 * Request message for the ActivateProgram method.
 */
export interface ActivateBuyOnGoogleProgramRequest {
}

export interface Address {
  /**
   * Required. Top-level administrative subdivision of the country. For
   * example, a state like California ("CA") or a province like Quebec ("QC").
   */
  administrativeArea?: string;
  /**
   * Required. City, town or commune. May also include dependent localities or
   * sublocalities (for example, neighborhoods or suburbs).
   */
  city?: string;
  /**
   * Required. [CLDR country
   * code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml)
   * (for example, "US").
   */
  country?: string;
  /**
   * Required. Postal code or ZIP (for example, "94043").
   */
  postalCode?: string;
  /**
   * Street-level part of the address. Use `\n` to add a second line.
   */
  streetAddress?: string;
}

export interface Amount {
  /**
   * [required] The pre-tax or post-tax price depending on the location of the
   * order.
   */
  priceAmount?: Price;
  /**
   * [required] Tax value.
   */
  taxAmount?: Price;
}

/**
 * Represents attribution settings for conversion sources receiving
 * pre-attribution data.
 */
export interface AttributionSettings {
  /**
   * Required. Lookback windows (in days) used for attribution in this source.
   * Supported values are 7, 30, 60, 90.
   */
  attributionLookbackWindowInDays?: number;
  /**
   * Required. Attribution model.
   */
  attributionModel?:  | "ATTRIBUTION_MODEL_UNSPECIFIED" | "CROSS_CHANNEL_LAST_CLICK" | "ADS_PREFERRED_LAST_CLICK" | "CROSS_CHANNEL_DATA_DRIVEN" | "CROSS_CHANNEL_FIRST_CLICK" | "CROSS_CHANNEL_LINEAR" | "CROSS_CHANNEL_POSITION_BASED" | "CROSS_CHANNEL_TIME_DECAY";
  /**
   * Immutable. Unordered list. List of different conversion types a conversion
   * event can be classified as. A standard "purchase" type will be
   * automatically created if this list is empty at creation time.
   */
  conversionType?: AttributionSettingsConversionType[];
}

/**
 * Message representing a types of conversion events
 */
export interface AttributionSettingsConversionType {
  /**
   * Output only. Option indicating if the type should be included in Merchant
   * Center reporting.
   */
  readonly includeInReporting?: boolean;
  /**
   * Output only. Conversion event name, as it'll be reported by the client.
   */
  readonly name?: string;
}

/**
 * Fields related to the [Best sellers
 * reports](https://support.google.com/merchants/answer/9488679).
 */
export interface BestSellers {
  /**
   * Google product category ID to calculate the ranking for, represented in
   * [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436). If a
   * `WHERE` condition on `best_sellers.category_id` is not specified in the
   * query, rankings for all top-level categories are returned.
   */
  categoryId?: bigint;
  /**
   * Country where the ranking is calculated. A `WHERE` condition on
   * `best_sellers.country_code` is required in the query.
   */
  countryCode?: string;
  /**
   * Popularity rank in the previous week or month.
   */
  previousRank?: bigint;
  /**
   * Estimated demand in relation to the item with the highest popularity rank
   * in the same category and country in the previous week or month.
   */
  previousRelativeDemand?:  | "RELATIVE_DEMAND_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  /**
   * Popularity on Shopping ads and free listings, in the selected category and
   * country, based on the estimated number of units sold.
   */
  rank?: bigint;
  /**
   * Estimated demand in relation to the item with the highest popularity rank
   * in the same category and country.
   */
  relativeDemand?:  | "RELATIVE_DEMAND_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  /**
   * Change in the estimated demand. Whether it rose, sank or remained flat.
   */
  relativeDemandChange?:  | "RELATIVE_DEMAND_CHANGE_TYPE_UNSPECIFIED" | "SINKER" | "FLAT" | "RISER";
  /**
   * Report date. The value of this field can only be one of the following: *
   * The first day of the week (Monday) for weekly reports. * The first day of
   * the month for monthly reports. If a `WHERE` condition on
   * `best_sellers.report_date` is not specified in the query, the latest
   * available weekly or monthly report is returned.
   */
  reportDate?: Date;
  /**
   * Granularity of the report. The ranking can be done over a week or a month
   * timeframe. A `WHERE` condition on `best_sellers.report_granularity` is
   * required in the query.
   */
  reportGranularity?:  | "REPORT_GRANULARITY_UNSPECIFIED" | "WEEKLY" | "MONTHLY";
}

function serializeBestSellers(data: any): BestSellers {
  return {
    ...data,
    categoryId: data["categoryId"] !== undefined ? String(data["categoryId"]) : undefined,
    previousRank: data["previousRank"] !== undefined ? String(data["previousRank"]) : undefined,
    rank: data["rank"] !== undefined ? String(data["rank"]) : undefined,
  };
}

function deserializeBestSellers(data: any): BestSellers {
  return {
    ...data,
    categoryId: data["categoryId"] !== undefined ? BigInt(data["categoryId"]) : undefined,
    previousRank: data["previousRank"] !== undefined ? BigInt(data["previousRank"]) : undefined,
    rank: data["rank"] !== undefined ? BigInt(data["rank"]) : undefined,
  };
}

/**
 * Brand fields. Values are only set for fields requested explicitly in the
 * request's search query.
 */
export interface Brand {
  /**
   * Name of the brand.
   */
  name?: string;
}

export interface BusinessDayConfig {
  /**
   * Regular business days, such as '"monday"'. May not be empty.
   */
  businessDays?: string[];
}

/**
 * Additional options for Content#buyongoogleprogramsPatch.
 */
export interface BuyongoogleprogramsPatchOptions {
  /**
   * The list of fields to update. If the update mask is not provided, then all
   * the fields set in buyOnGoogleProgramStatus will be updated. Clearing fields
   * is only possible if update mask is provided.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBuyongoogleprogramsPatchOptions(data: any): BuyongoogleprogramsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBuyongoogleprogramsPatchOptions(data: any): BuyongoogleprogramsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response message for the GetProgramStatus method.
 */
export interface BuyOnGoogleProgramStatus {
  /**
   * The business models in which merchant participates.
   */
  businessModel?:  | "BUSINESS_MODEL_UNSPECIFIED" | "MANUFACTURER" | "IMPORTER" | "RESELLER" | "OTHER"[];
  /**
   * The customer service pending email. After verification this field becomes
   * empty.
   */
  customerServicePendingEmail?: string;
  /**
   * The pending phone number specified for BuyOnGoogle program. It might be
   * different than account level phone number. In order to update this field
   * the customer_service_pending_phone_region_code must also be set. After
   * verification this field becomes empty.
   */
  customerServicePendingPhoneNumber?: string;
  /**
   * Two letter country code for the pending phone number, for example `CA` for
   * Canadian numbers. See the [ISO 3166-1
   * alpha-2](https://wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
   * officially assigned codes. In order to update this field the
   * customer_service_pending_phone_number must also be set. After verification
   * this field becomes empty.
   */
  customerServicePendingPhoneRegionCode?: string;
  /**
   * Output only. The customer service verified email.
   */
  readonly customerServiceVerifiedEmail?: string;
  /**
   * Output only. The verified phone number specified for BuyOnGoogle program.
   * It might be different than account level phone number.
   */
  readonly customerServiceVerifiedPhoneNumber?: string;
  /**
   * Output only. Two letter country code for the verified phone number, for
   * example `CA` for Canadian numbers. See the [ISO 3166-1
   * alpha-2](https://wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
   * officially assigned codes.
   */
  readonly customerServiceVerifiedPhoneRegionCode?: string;
  /**
   * The channels through which the merchant is selling.
   */
  onlineSalesChannel?:  | "ONLINE_SALES_CHANNEL_UNSPECIFIED" | "GOOGLE_EXCLUSIVE" | "GOOGLE_AND_OTHER_WEBSITES";
  /**
   * Output only. The current participation stage for the program.
   */
  readonly participationStage?:  | "PROGRAM_PARTICIPATION_STAGE_UNSPECIFIED" | "NOT_ELIGIBLE" | "ELIGIBLE" | "ONBOARDING" | "ELIGIBLE_FOR_REVIEW" | "PENDING_REVIEW" | "REVIEW_DISAPPROVED" | "ACTIVE" | "PAUSED";
}

/**
 * Request message for the CaptureOrder method.
 */
export interface CaptureOrderRequest {
}

/**
 * Response message for the CaptureOrder method.
 */
export interface CaptureOrderResponse {
  /**
   * The status of the execution. Only defined if the request was successful.
   * Acceptable values are: * "duplicate" * "executed"
   */
  executionStatus?:  | "EXECUTION_STATUS_UNSPECIFIED" | "EXECUTED" | "DUPLICATE";
}

export interface CarrierRate {
  /**
   * Carrier service, such as `"UPS"` or `"Fedex"`. The list of supported
   * carriers can be retrieved through the `getSupportedCarriers` method.
   * Required.
   */
  carrierName?: string;
  /**
   * Carrier service, such as `"ground"` or `"2 days"`. The list of supported
   * services for a carrier can be retrieved through the `getSupportedCarriers`
   * method. Required.
   */
  carrierService?: string;
  /**
   * Additive shipping rate modifier. Can be negative. For example `{ "value":
   * "1", "currency" : "USD" }` adds $1 to the rate, `{ "value": "-3",
   * "currency" : "USD" }` removes $3 from the rate. Optional.
   */
  flatAdjustment?: Price;
  /**
   * Name of the carrier rate. Must be unique per rate group. Required.
   */
  name?: string;
  /**
   * Shipping origin for this carrier rate. Required.
   */
  originPostalCode?: string;
  /**
   * Multiplicative shipping rate modifier as a number in decimal notation. Can
   * be negative. For example `"5.4"` increases the rate by 5.4%, `"-3"`
   * decreases the rate by 3%. Optional.
   */
  percentageAdjustment?: string;
}

export interface CarriersCarrier {
  /**
   * The CLDR country code of the carrier (for example, "US"). Always present.
   */
  country?: string;
  /**
   * A list of services supported for EDD (Estimated Delivery Date)
   * calculation. This is the list of valid values for
   * WarehouseBasedDeliveryTime.carrierService.
   */
  eddServices?: string[];
  /**
   * The name of the carrier (for example, `"UPS"`). Always present.
   */
  name?: string;
  /**
   * A list of supported services (for example, `"ground"`) for that carrier.
   * Contains at least one service. This is the list of valid values for
   * CarrierRate.carrierService.
   */
  services?: string[];
}

/**
 * The collection message.
 */
export interface Collection {
  /**
   * Label that you assign to a collection to help organize bidding and
   * reporting in Shopping campaigns. [Custom
   * label](https://support.google.com/merchants/answer/9674217)
   */
  customLabel0?: string;
  /**
   * Label that you assign to a collection to help organize bidding and
   * reporting in Shopping campaigns.
   */
  customLabel1?: string;
  /**
   * Label that you assign to a collection to help organize bidding and
   * reporting in Shopping campaigns.
   */
  customLabel2?: string;
  /**
   * Label that you assign to a collection to help organize bidding and
   * reporting in Shopping campaigns.
   */
  customLabel3?: string;
  /**
   * Label that you assign to a collection to help organize bidding and
   * reporting in Shopping campaigns.
   */
  customLabel4?: string;
  /**
   * This identifies one or more products associated with the collection. Used
   * as a lookup to the corresponding product ID in your product feeds. Provide
   * a maximum of 100 featuredProduct (for collections). Provide up to 10
   * featuredProduct (for Shoppable Images only) with ID and X and Y
   * coordinates. [featured_product
   * attribute](https://support.google.com/merchants/answer/9703736)
   */
  featuredProduct?: CollectionFeaturedProduct[];
  /**
   * Your collection's name. [headline
   * attribute](https://support.google.com/merchants/answer/9673580)
   */
  headline?: string[];
  /**
   * Required. The REST ID of the collection. Content API methods that operate
   * on collections take this as their collectionId parameter. The REST ID for a
   * collection is of the form collectionId. [id
   * attribute](https://support.google.com/merchants/answer/9649290)
   */
  id?: string;
  /**
   * The URL of a collection’s image. [image_link
   * attribute](https://support.google.com/merchants/answer/9703236)
   */
  imageLink?: string[];
  /**
   * The language of a collection and the language of any featured products
   * linked to the collection. [language
   * attribute](https://support.google.com/merchants/answer/9673781)
   */
  language?: string;
  /**
   * A collection’s landing page. URL directly linking to your collection's
   * page on your website. [link
   * attribute](https://support.google.com/merchants/answer/9673983)
   */
  link?: string;
  /**
   * A collection’s mobile-optimized landing page when you have a different URL
   * for mobile and desktop traffic. [mobile_link
   * attribute](https://support.google.com/merchants/answer/9646123)
   */
  mobileLink?: string;
  /**
   * [product_country
   * attribute](https://support.google.com/merchants/answer/9674155)
   */
  productCountry?: string;
}

/**
 * The message for FeaturedProduct.
 * [FeaturedProduct](https://support.google.com/merchants/answer/9703736)
 */
export interface CollectionFeaturedProduct {
  /**
   * The unique identifier for the product item.
   */
  offerId?: string;
  /**
   * Required. X-coordinate of the product callout on the Shoppable Image.
   */
  x?: number;
  /**
   * Required. Y-coordinate of the product callout on the Shoppable Image.
   */
  y?: number;
}

/**
 * Additional options for Content#collectionsList.
 */
export interface CollectionsListOptions {
  /**
   * The maximum number of collections to return in the response, used for
   * paging. Defaults to 50; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Token (if provided) to retrieve the subsequent page. All other parameters
   * must match the original call that provided the page token.
   */
  pageToken?: string;
}

/**
 * The collectionstatus message.
 */
export interface CollectionStatus {
  /**
   * A list of all issues associated with the collection.
   */
  collectionLevelIssuses?: CollectionStatusItemLevelIssue[];
  /**
   * Date on which the collection has been created in [ISO
   * 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and
   * offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"
   */
  creationDate?: string;
  /**
   * The intended destinations for the collection.
   */
  destinationStatuses?: CollectionStatusDestinationStatus[];
  /**
   * Required. The ID of the collection for which status is reported.
   */
  id?: string;
  /**
   * Date on which the collection has been last updated in [ISO
   * 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and
   * offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"
   */
  lastUpdateDate?: string;
}

/**
 * Destination status message.
 */
export interface CollectionStatusDestinationStatus {
  /**
   * Country codes (ISO 3166-1 alpha-2) where the collection is approved.
   */
  approvedCountries?: string[];
  /**
   * The name of the destination
   */
  destination?: string;
  /**
   * Country codes (ISO 3166-1 alpha-2) where the collection is disapproved.
   */
  disapprovedCountries?: string[];
  /**
   * Country codes (ISO 3166-1 alpha-2) where the collection is pending
   * approval.
   */
  pendingCountries?: string[];
  /**
   * The status for the specified destination in the collections target
   * country.
   */
  status?: string;
}

/**
 * Additional options for Content#collectionstatusesList.
 */
export interface CollectionstatusesListOptions {
  /**
   * The maximum number of collection statuses to return in the response, used
   * for paging. Defaults to 50; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Token (if provided) to retrieve the subsequent page. All other parameters
   * must match the original call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Issue associated with the collection.
 */
export interface CollectionStatusItemLevelIssue {
  /**
   * Country codes (ISO 3166-1 alpha-2) where issue applies to the offer.
   */
  applicableCountries?: string[];
  /**
   * The attribute's name, if the issue is caused by a single attribute.
   */
  attributeName?: string;
  /**
   * The error code of the issue.
   */
  code?: string;
  /**
   * A short issue description in English.
   */
  description?: string;
  /**
   * The destination the issue applies to.
   */
  destination?: string;
  /**
   * A detailed issue description in English.
   */
  detail?: string;
  /**
   * The URL of a web page to help with resolving this issue.
   */
  documentation?: string;
  /**
   * Whether the issue can be resolved by the merchant.
   */
  resolution?: string;
  /**
   * How this issue affects the serving of the collection.
   */
  servability?: string;
}

/**
 * Represents a conversion source owned by a Merchant account. A merchant
 * account can have up to 200 conversion sources.
 */
export interface ConversionSource {
  /**
   * Output only. Generated by the Content API upon creation of a new
   * `ConversionSource`. Format: [a-z]{4}:.+ The four characters before the
   * colon represent the type of conversio source. Content after the colon
   * represents the ID of the conversion source within that type. The ID of two
   * different conversion sources might be the same across different types. The
   * following type prefixes are supported: - galk: For GoogleAnalyticsLink
   * sources. - mcdn: For MerchantCenterDestination sources.
   */
  readonly conversionSourceId?: string;
  /**
   * Output only. The time when an archived conversion source becomes
   * permanently deleted and is no longer available to undelete.
   */
  readonly expireTime?: Date;
  /**
   * Immutable. Conversion Source of type "Link to Google Analytics Property".
   */
  googleAnalyticsLink?: GoogleAnalyticsLink;
  /**
   * Conversion Source of type "Merchant Center Tag Destination".
   */
  merchantCenterDestination?: MerchantCenterDestination;
  /**
   * Output only. Current state of this conversion source. Can't be edited
   * through the API.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PENDING";
}

function serializeConversionSource(data: any): ConversionSource {
  return {
    ...data,
    googleAnalyticsLink: data["googleAnalyticsLink"] !== undefined ? serializeGoogleAnalyticsLink(data["googleAnalyticsLink"]) : undefined,
  };
}

function deserializeConversionSource(data: any): ConversionSource {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    googleAnalyticsLink: data["googleAnalyticsLink"] !== undefined ? deserializeGoogleAnalyticsLink(data["googleAnalyticsLink"]) : undefined,
  };
}

/**
 * Additional options for Content#conversionsourcesList.
 */
export interface ConversionsourcesListOptions {
  /**
   * The maximum number of conversion sources to return in a page. If no
   * `page_size` is specified, `100` is used as the default value. The maximum
   * value is `200`. Values above `200` will be coerced to `200`. Regardless of
   * pagination, at most `200` conversion sources are returned in total.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
  /**
   * If true, also returns archived conversion sources.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Content#conversionsourcesPatch.
 */
export interface ConversionsourcesPatchOptions {
  /**
   * Required. List of fields being updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeConversionsourcesPatchOptions(data: any): ConversionsourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeConversionsourcesPatchOptions(data: any): ConversionsourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Information about CSS domain.
 */
export interface Css {
  /**
   * Output only. Immutable. The CSS domain ID.
   */
  readonly cssDomainId?: bigint;
  /**
   * Output only. Immutable. The ID of the CSS group this CSS domain is
   * affiliated with. Only populated for CSS group users.
   */
  readonly cssGroupId?: bigint;
  /**
   * Output only. Immutable. The CSS domain's display name, used when space is
   * constrained.
   */
  readonly displayName?: string;
  /**
   * Output only. Immutable. The CSS domain's full name.
   */
  readonly fullName?: string;
  /**
   * Output only. Immutable. The CSS domain's homepage.
   */
  readonly homepageUri?: string;
  /**
   * A list of label IDs that are assigned to this CSS domain by its CSS group.
   * Only populated for CSS group users.
   */
  labelIds?: bigint[];
}

function serializeCss(data: any): Css {
  return {
    ...data,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCss(data: any): Css {
  return {
    ...data,
    cssDomainId: data["cssDomainId"] !== undefined ? BigInt(data["cssDomainId"]) : undefined,
    cssGroupId: data["cssGroupId"] !== undefined ? BigInt(data["cssGroupId"]) : undefined,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Additional options for Content#cssesList.
 */
export interface CssesListOptions {
  /**
   * The maximum number of CSS domains to return. The service may return fewer
   * than this value. If unspecified, at most 50 CSS domains will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListCsses` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListCsses` must match the call that provided the page token.
   */
  pageToken?: string;
}

export interface CustomAttribute {
  /**
   * Subattributes within this attribute group. Exactly one of value or
   * groupValues must be provided.
   */
  groupValues?: CustomAttribute[];
  /**
   * The name of the attribute. Underscores will be replaced by spaces upon
   * insertion.
   */
  name?: string;
  /**
   * The value of the attribute.
   */
  value?: string;
}

export interface CustomerReturnReason {
  /**
   * Description of the reason.
   */
  description?: string;
  /**
   * Code of the return reason. Acceptable values are: - "`betterPriceFound`" -
   * "`changedMind`" - "`damagedOrDefectiveItem`" - "`didNotMatchDescription`" -
   * "`doesNotFit`" - "`expiredItem`" - "`incorrectItemReceived`" -
   * "`noLongerNeeded`" - "`notSpecified`" - "`orderedWrongItem`" - "`other`" -
   * "`qualityNotExpected`" - "`receivedTooLate`" - "`undeliverable`"
   */
  reasonCode?: string;
}

export interface CutoffTime {
  /**
   * Hour of the cutoff time until which an order has to be placed to be
   * processed in the same day. Required.
   */
  hour?: number;
  /**
   * Minute of the cutoff time until which an order has to be placed to be
   * processed in the same day. Required.
   */
  minute?: number;
  /**
   * Timezone identifier for the cutoff time (for example, "Europe/Zurich").
   * List of identifiers. Required.
   */
  timezone?: string;
}

/**
 * Datafeed configuration data.
 */
export interface Datafeed {
  /**
   * The two-letter ISO 639-1 language in which the attributes are defined in
   * the data feed.
   */
  attributeLanguage?: string;
  /**
   * Required. The type of data feed. For product inventory feeds, only feeds
   * for local stores, not online stores, are supported. Acceptable values are:
   * - "`local products`" - "`product inventory`" - "`products`"
   */
  contentType?: string;
  /**
   * Fetch schedule for the feed file.
   */
  fetchSchedule?: DatafeedFetchSchedule;
  /**
   * Required. The filename of the feed. All feeds must have a unique file
   * name.
   */
  fileName?: string;
  /**
   * Format of the feed file.
   */
  format?: DatafeedFormat;
  /**
   * Required for update. The ID of the data feed.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeed`"
   */
  kind?: string;
  /**
   * Required for insert. A descriptive name of the data feed.
   */
  name?: string;
  /**
   * The targets this feed should apply to (country, language, destinations).
   */
  targets?: DatafeedTarget[];
}

function serializeDatafeed(data: any): Datafeed {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeDatafeed(data: any): Datafeed {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * The required fields vary based on the frequency of fetching. For a monthly
 * fetch schedule, day_of_month and hour are required. For a weekly fetch
 * schedule, weekday and hour are required. For a daily fetch schedule, only
 * hour is required.
 */
export interface DatafeedFetchSchedule {
  /**
   * The day of the month the feed file should be fetched (1-31).
   */
  dayOfMonth?: number;
  /**
   * The URL where the feed file can be fetched. Google Merchant Center will
   * support automatic scheduled uploads using the HTTP, HTTPS, FTP, or SFTP
   * protocols, so the value will need to be a valid link using one of those
   * four protocols.
   */
  fetchUrl?: string;
  /**
   * The hour of the day the feed file should be fetched (0-23).
   */
  hour?: number;
  /**
   * The minute of the hour the feed file should be fetched (0-59). Read-only.
   */
  minuteOfHour?: number;
  /**
   * An optional password for fetch_url.
   */
  password?: string;
  /**
   * Whether the scheduled fetch is paused or not.
   */
  paused?: boolean;
  /**
   * Time zone used for schedule. UTC by default. For example,
   * "America/Los_Angeles".
   */
  timeZone?: string;
  /**
   * An optional user name for fetch_url.
   */
  username?: string;
  /**
   * The day of the week the feed file should be fetched. Acceptable values
   * are: - "`monday`" - "`tuesday`" - "`wednesday`" - "`thursday`" - "`friday`"
   * - "`saturday`" - "`sunday`"
   */
  weekday?: string;
}

export interface DatafeedFormat {
  /**
   * Delimiter for the separation of values in a delimiter-separated values
   * feed. If not specified, the delimiter will be auto-detected. Ignored for
   * non-DSV data feeds. Acceptable values are: - "`pipe`" - "`tab`" - "`tilde`"
   * 
   */
  columnDelimiter?: string;
  /**
   * Character encoding scheme of the data feed. If not specified, the encoding
   * will be auto-detected. Acceptable values are: - "`latin-1`" - "`utf-16be`"
   * - "`utf-16le`" - "`utf-8`" - "`windows-1252`"
   */
  fileEncoding?: string;
  /**
   * Specifies how double quotes are interpreted. If not specified, the mode
   * will be auto-detected. Ignored for non-DSV data feeds. Acceptable values
   * are: - "`normal character`" - "`value quoting`"
   */
  quotingMode?: string;
}

export interface DatafeedsCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: DatafeedsCustomBatchRequestEntry[];
}

function serializeDatafeedsCustomBatchRequest(data: any): DatafeedsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDatafeedsCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeDatafeedsCustomBatchRequest(data: any): DatafeedsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDatafeedsCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch datafeeds request.
 */
export interface DatafeedsCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The data feed to insert.
   */
  datafeed?: Datafeed;
  /**
   * The ID of the data feed to get, delete or fetch.
   */
  datafeedId?: bigint;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`delete`" -
   * "`fetchNow`" - "`get`" - "`insert`" - "`update`"
   */
  method?: string;
}

function serializeDatafeedsCustomBatchRequestEntry(data: any): DatafeedsCustomBatchRequestEntry {
  return {
    ...data,
    datafeed: data["datafeed"] !== undefined ? serializeDatafeed(data["datafeed"]) : undefined,
    datafeedId: data["datafeedId"] !== undefined ? String(data["datafeedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeDatafeedsCustomBatchRequestEntry(data: any): DatafeedsCustomBatchRequestEntry {
  return {
    ...data,
    datafeed: data["datafeed"] !== undefined ? deserializeDatafeed(data["datafeed"]) : undefined,
    datafeedId: data["datafeedId"] !== undefined ? BigInt(data["datafeedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface DatafeedsCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: DatafeedsCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedsCustomBatchResponse`".
   */
  kind?: string;
}

function serializeDatafeedsCustomBatchResponse(data: any): DatafeedsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDatafeedsCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeDatafeedsCustomBatchResponse(data: any): DatafeedsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDatafeedsCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch datafeeds response.
 */
export interface DatafeedsCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * The requested data feed. Defined if and only if the request was
   * successful.
   */
  datafeed?: Datafeed;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
}

function serializeDatafeedsCustomBatchResponseEntry(data: any): DatafeedsCustomBatchResponseEntry {
  return {
    ...data,
    datafeed: data["datafeed"] !== undefined ? serializeDatafeed(data["datafeed"]) : undefined,
  };
}

function deserializeDatafeedsCustomBatchResponseEntry(data: any): DatafeedsCustomBatchResponseEntry {
  return {
    ...data,
    datafeed: data["datafeed"] !== undefined ? deserializeDatafeed(data["datafeed"]) : undefined,
  };
}

export interface DatafeedsFetchNowResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedsFetchNowResponse`".
   */
  kind?: string;
}

/**
 * Additional options for Content#datafeedsList.
 */
export interface DatafeedsListOptions {
  /**
   * The maximum number of products to return in the response, used for paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface DatafeedsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of datafeeds.
   */
  nextPageToken?: string;
  resources?: Datafeed[];
}

function serializeDatafeedsListResponse(data: any): DatafeedsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeDatafeed(item))) : undefined,
  };
}

function deserializeDatafeedsListResponse(data: any): DatafeedsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeDatafeed(item))) : undefined,
  };
}

/**
 * The status of a datafeed, that is, the result of the last retrieval of the
 * datafeed computed asynchronously when the feed processing is finished.
 */
export interface DatafeedStatus {
  /**
   * The country for which the status is reported, represented as a CLDR
   * territory code.
   */
  country?: string;
  /**
   * The ID of the feed for which the status is reported.
   */
  datafeedId?: bigint;
  /**
   * The list of errors occurring in the feed.
   */
  errors?: DatafeedStatusError[];
  /**
   * The feed label status is reported for.
   */
  feedLabel?: string;
  /**
   * The number of items in the feed that were processed.
   */
  itemsTotal?: bigint;
  /**
   * The number of items in the feed that were valid.
   */
  itemsValid?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedStatus`"
   */
  kind?: string;
  /**
   * The two-letter ISO 639-1 language for which the status is reported.
   */
  language?: string;
  /**
   * The last date at which the feed was uploaded.
   */
  lastUploadDate?: string;
  /**
   * The processing status of the feed. Acceptable values are: - "`"`failure`":
   * The feed could not be processed or all items had errors.`" - "`in
   * progress`": The feed is being processed. - "`none`": The feed has not yet
   * been processed. For example, a feed that has never been uploaded will have
   * this processing status. - "`success`": The feed was processed successfully,
   * though some items might have had errors.
   */
  processingStatus?: string;
  /**
   * The list of errors occurring in the feed.
   */
  warnings?: DatafeedStatusError[];
}

function serializeDatafeedStatus(data: any): DatafeedStatus {
  return {
    ...data,
    datafeedId: data["datafeedId"] !== undefined ? String(data["datafeedId"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeDatafeedStatusError(item))) : undefined,
    itemsTotal: data["itemsTotal"] !== undefined ? String(data["itemsTotal"]) : undefined,
    itemsValid: data["itemsValid"] !== undefined ? String(data["itemsValid"]) : undefined,
    warnings: data["warnings"] !== undefined ? data["warnings"].map((item: any) => (serializeDatafeedStatusError(item))) : undefined,
  };
}

function deserializeDatafeedStatus(data: any): DatafeedStatus {
  return {
    ...data,
    datafeedId: data["datafeedId"] !== undefined ? BigInt(data["datafeedId"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeDatafeedStatusError(item))) : undefined,
    itemsTotal: data["itemsTotal"] !== undefined ? BigInt(data["itemsTotal"]) : undefined,
    itemsValid: data["itemsValid"] !== undefined ? BigInt(data["itemsValid"]) : undefined,
    warnings: data["warnings"] !== undefined ? data["warnings"].map((item: any) => (deserializeDatafeedStatusError(item))) : undefined,
  };
}

/**
 * An error occurring in the feed, like "invalid price".
 */
export interface DatafeedStatusError {
  /**
   * The code of the error, for example, "validation/invalid_value".
   */
  code?: string;
  /**
   * The number of occurrences of the error in the feed.
   */
  count?: bigint;
  /**
   * A list of example occurrences of the error, grouped by product.
   */
  examples?: DatafeedStatusExample[];
  /**
   * The error message, for example, "Invalid price".
   */
  message?: string;
}

function serializeDatafeedStatusError(data: any): DatafeedStatusError {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    examples: data["examples"] !== undefined ? data["examples"].map((item: any) => (serializeDatafeedStatusExample(item))) : undefined,
  };
}

function deserializeDatafeedStatusError(data: any): DatafeedStatusError {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    examples: data["examples"] !== undefined ? data["examples"].map((item: any) => (deserializeDatafeedStatusExample(item))) : undefined,
  };
}

export interface DatafeedstatusesCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: DatafeedstatusesCustomBatchRequestEntry[];
}

function serializeDatafeedstatusesCustomBatchRequest(data: any): DatafeedstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDatafeedstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeDatafeedstatusesCustomBatchRequest(data: any): DatafeedstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDatafeedstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch datafeedstatuses request.
 */
export interface DatafeedstatusesCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * Deprecated. Use `feedLabel` instead. The country to get the datafeed
   * status for. If this parameter is provided, then `language` must also be
   * provided. Note that for multi-target datafeeds this parameter is required.
   */
  country?: string;
  /**
   * The ID of the data feed to get.
   */
  datafeedId?: bigint;
  /**
   * The feed label to get the datafeed status for. If this parameter is
   * provided, then `language` must also be provided. Note that for multi-target
   * datafeeds this parameter is required.
   */
  feedLabel?: string;
  /**
   * The language to get the datafeed status for. If this parameter is provided
   * then `country` must also be provided. Note that for multi-target datafeeds
   * this parameter is required.
   */
  language?: string;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`"
   */
  method?: string;
}

function serializeDatafeedstatusesCustomBatchRequestEntry(data: any): DatafeedstatusesCustomBatchRequestEntry {
  return {
    ...data,
    datafeedId: data["datafeedId"] !== undefined ? String(data["datafeedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeDatafeedstatusesCustomBatchRequestEntry(data: any): DatafeedstatusesCustomBatchRequestEntry {
  return {
    ...data,
    datafeedId: data["datafeedId"] !== undefined ? BigInt(data["datafeedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface DatafeedstatusesCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: DatafeedstatusesCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedstatusesCustomBatchResponse`".
   */
  kind?: string;
}

function serializeDatafeedstatusesCustomBatchResponse(data: any): DatafeedstatusesCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDatafeedstatusesCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeDatafeedstatusesCustomBatchResponse(data: any): DatafeedstatusesCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDatafeedstatusesCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch datafeedstatuses response.
 */
export interface DatafeedstatusesCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * The requested data feed status. Defined if and only if the request was
   * successful.
   */
  datafeedStatus?: DatafeedStatus;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
}

function serializeDatafeedstatusesCustomBatchResponseEntry(data: any): DatafeedstatusesCustomBatchResponseEntry {
  return {
    ...data,
    datafeedStatus: data["datafeedStatus"] !== undefined ? serializeDatafeedStatus(data["datafeedStatus"]) : undefined,
  };
}

function deserializeDatafeedstatusesCustomBatchResponseEntry(data: any): DatafeedstatusesCustomBatchResponseEntry {
  return {
    ...data,
    datafeedStatus: data["datafeedStatus"] !== undefined ? deserializeDatafeedStatus(data["datafeedStatus"]) : undefined,
  };
}

/**
 * Additional options for Content#datafeedstatusesGet.
 */
export interface DatafeedstatusesGetOptions {
  /**
   * Deprecated. Use `feedLabel` instead. The country to get the datafeed
   * status for. If this parameter is provided then `language` must also be
   * provided. Note that this parameter is required for feeds targeting multiple
   * countries and languages, since a feed may have a different status for each
   * target.
   */
  country?: string;
  /**
   * The feed label to get the datafeed status for. If this parameter is
   * provided then `language` must also be provided. Note that this parameter is
   * required for feeds targeting multiple countries and languages, since a feed
   * may have a different status for each target.
   */
  feedLabel?: string;
  /**
   * The language to get the datafeed status for. If this parameter is provided
   * then `country` must also be provided. Note that this parameter is required
   * for feeds targeting multiple countries and languages, since a feed may have
   * a different status for each target.
   */
  language?: string;
}

/**
 * Additional options for Content#datafeedstatusesList.
 */
export interface DatafeedstatusesListOptions {
  /**
   * The maximum number of products to return in the response, used for paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface DatafeedstatusesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#datafeedstatusesListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of datafeed statuses.
   */
  nextPageToken?: string;
  resources?: DatafeedStatus[];
}

function serializeDatafeedstatusesListResponse(data: any): DatafeedstatusesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeDatafeedStatus(item))) : undefined,
  };
}

function deserializeDatafeedstatusesListResponse(data: any): DatafeedstatusesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeDatafeedStatus(item))) : undefined,
  };
}

/**
 * An example occurrence for a particular error.
 */
export interface DatafeedStatusExample {
  /**
   * The ID of the example item.
   */
  itemId?: string;
  /**
   * Line number in the data feed where the example is found.
   */
  lineNumber?: bigint;
  /**
   * The problematic value.
   */
  value?: string;
}

function serializeDatafeedStatusExample(data: any): DatafeedStatusExample {
  return {
    ...data,
    lineNumber: data["lineNumber"] !== undefined ? String(data["lineNumber"]) : undefined,
  };
}

function deserializeDatafeedStatusExample(data: any): DatafeedStatusExample {
  return {
    ...data,
    lineNumber: data["lineNumber"] !== undefined ? BigInt(data["lineNumber"]) : undefined,
  };
}

export interface DatafeedTarget {
  /**
   * Deprecated. Use `feedLabel` instead. The country where the items in the
   * feed will be included in the search index, represented as a CLDR territory
   * code.
   */
  country?: string;
  /**
   * The list of destinations to exclude for this target (corresponds to
   * cleared check boxes in Merchant Center). Products that are excluded from
   * all destinations for more than 7 days are automatically deleted.
   */
  excludedDestinations?: string[];
  /**
   * Feed label for the DatafeedTarget. Either `country` or `feedLabel` is
   * required. If both `feedLabel` and `country` is specified, the values must
   * match. Must be less than or equal to 20 uppercase letters (A-Z), numbers
   * (0-9), and dashes (-).
   */
  feedLabel?: string;
  /**
   * The list of destinations to include for this target (corresponds to
   * checked check boxes in Merchant Center). Default destinations are always
   * included unless provided in `excludedDestinations`.
   */
  includedDestinations?: string[];
  /**
   * The two-letter ISO 639-1 language of the items in the feed. Must be a
   * valid language for `targets[].country`.
   */
  language?: string;
  /**
   * The countries where the items may be displayed. Represented as a CLDR
   * territory code. Will be ignored for "product inventory" feeds.
   */
  targetCountries?: string[];
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
export interface DateTime {
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
  timeZone?: TimeZone;
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

function serializeDateTime(data: any): DateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

function deserializeDateTime(data: any): DateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

/**
 * A delivery area for the product. Only one of `countryCode` or
 * `postalCodeRange` must be set.
 */
export interface DeliveryArea {
  /**
   * Required. The country that the product can be delivered to. Submit a
   * [unicode CLDR
   * region](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml)
   * such as `US` or `CH`.
   */
  countryCode?: string;
  /**
   * A postal code, postal code range or postal code prefix that defines this
   * area. Limited to US and AUS.
   */
  postalCodeRange?: DeliveryAreaPostalCodeRange;
  /**
   * A state, territory, or prefecture. This is supported for the United
   * States, Australia, and Japan. Provide a subdivision code from the ISO
   * 3166-2 code tables ([US](https://en.wikipedia.org/wiki/ISO_3166-2:US),
   * [AU](https://en.wikipedia.org/wiki/ISO_3166-2:AU), or
   * [JP](https://en.wikipedia.org/wiki/ISO_3166-2:JP)) without country prefix
   * (for example, `"NY"`, `"NSW"`, `"03"`).
   */
  regionCode?: string;
}

/**
 * A range of postal codes that defines the delivery area. Only set
 * `firstPostalCode` when specifying a single postal code.
 */
export interface DeliveryAreaPostalCodeRange {
  /**
   * Required. A postal code or a pattern of the form prefix* denoting the
   * inclusive lower bound of the range defining the area. Examples values:
   * `"94108"`, `"9410*"`, `"9*"`.
   */
  firstPostalCode?: string;
  /**
   * A postal code or a pattern of the form prefix* denoting the inclusive
   * upper bound of the range defining the area (for example [070* - 078*]
   * results in the range [07000 - 07899]). It must have the same length as
   * `firstPostalCode`: if `firstPostalCode` is a postal code then
   * `lastPostalCode` must be a postal code too; if firstPostalCode is a pattern
   * then `lastPostalCode` must be a pattern with the same prefix length.
   * Ignored if not set, then the area is defined as being all the postal codes
   * matching `firstPostalCode`.
   */
  lastPostalCode?: string;
}

export interface DeliveryTime {
  /**
   * Business days cutoff time definition. If not configured the cutoff time
   * will be defaulted to 8AM PST.
   */
  cutoffTime?: CutoffTime;
  /**
   * The business days during which orders can be handled. If not provided,
   * Monday to Friday business days will be assumed.
   */
  handlingBusinessDayConfig?: BusinessDayConfig;
  /**
   * Holiday cutoff definitions. If configured, they specify order cutoff times
   * for holiday-specific shipping.
   */
  holidayCutoffs?: HolidayCutoff[];
  /**
   * Maximum number of business days spent before an order is shipped. 0 means
   * same day shipped, 1 means next day shipped. Must be greater than or equal
   * to `minHandlingTimeInDays`.
   */
  maxHandlingTimeInDays?: number;
  /**
   * Maximum number of business days that are spent in transit. 0 means same
   * day delivery, 1 means next day delivery. Must be greater than or equal to
   * `minTransitTimeInDays`.
   */
  maxTransitTimeInDays?: number;
  /**
   * Minimum number of business days spent before an order is shipped. 0 means
   * same day shipped, 1 means next day shipped.
   */
  minHandlingTimeInDays?: number;
  /**
   * Minimum number of business days that are spent in transit. 0 means same
   * day delivery, 1 means next day delivery. Either
   * `{min,max}TransitTimeInDays` or `transitTimeTable` must be set, but not
   * both.
   */
  minTransitTimeInDays?: number;
  /**
   * The business days during which orders can be in-transit. If not provided,
   * Monday to Friday business days will be assumed.
   */
  transitBusinessDayConfig?: BusinessDayConfig;
  /**
   * Transit time table, number of business days spent in transit based on row
   * and column dimensions. Either `{min,max}TransitTimeInDays` or
   * `transitTimeTable` can be set, but not both.
   */
  transitTimeTable?: TransitTable;
  /**
   * Indicates that the delivery time should be calculated per warehouse
   * (shipping origin location) based on the settings of the selected carrier.
   * When set, no other transit time related field in DeliveryTime should be
   * set.
   */
  warehouseBasedDeliveryTimes?: WarehouseBasedDeliveryTime[];
}

/**
 * Additional information required for E_COMMERCE_PLATFORM link type.
 */
export interface ECommercePlatformLinkInfo {
  /**
   * The id used by the third party service provider to identify the merchant.
   */
  externalAccountId?: string;
}

/**
 * An error returned by the API.
 */
export interface Error {
  /**
   * The domain of the error.
   */
  domain?: string;
  /**
   * A description of the error.
   */
  message?: string;
  /**
   * The error code.
   */
  reason?: string;
}

/**
 * A list of errors returned by a failed batch entry.
 */
export interface Errors {
  /**
   * The HTTP status of the first error in `errors`.
   */
  code?: number;
  /**
   * A list of errors.
   */
  errors?: Error[];
  /**
   * The message of the first error in `errors`.
   */
  message?: string;
}

/**
 * Response message for GetFreeListingsProgramStatus.
 */
export interface FreeListingsProgramStatus {
  /**
   * State of the program. `ENABLED` if there are offers for at least one
   * region.
   */
  globalState?:  | "PROGRAM_STATE_UNSPECIFIED" | "NOT_ENABLED" | "NO_OFFERS_UPLOADED" | "ENABLED";
  /**
   * Status of the program in each region. Regions with the same status and
   * review eligibility are grouped together in `regionCodes`.
   */
  regionStatuses?: FreeListingsProgramStatusRegionStatus[];
}

function serializeFreeListingsProgramStatus(data: any): FreeListingsProgramStatus {
  return {
    ...data,
    regionStatuses: data["regionStatuses"] !== undefined ? data["regionStatuses"].map((item: any) => (serializeFreeListingsProgramStatusRegionStatus(item))) : undefined,
  };
}

function deserializeFreeListingsProgramStatus(data: any): FreeListingsProgramStatus {
  return {
    ...data,
    regionStatuses: data["regionStatuses"] !== undefined ? data["regionStatuses"].map((item: any) => (deserializeFreeListingsProgramStatusRegionStatus(item))) : undefined,
  };
}

/**
 * Status of program and region.
 */
export interface FreeListingsProgramStatusRegionStatus {
  /**
   * Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`.
   * Only visible when your eligibilityStatus is WARNING. In [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`.
   */
  disapprovalDate?: string;
  /**
   * Eligibility status of the standard free listing program.
   */
  eligibilityStatus?:  | "STATE_UNSPECIFIED" | "APPROVED" | "DISAPPROVED" | "WARNING" | "UNDER_REVIEW" | "PENDING_REVIEW" | "ONBOARDING";
  /**
   * Issues that must be fixed to be eligible for review.
   */
  onboardingIssues?: string[];
  /**
   * The two-letter [ISO 3166-1
   * alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all
   * the regions with the same `eligibilityStatus` and `reviewEligibility`.
   */
  regionCodes?: string[];
  /**
   * If a program is eligible for review in a specific region. Only visible if
   * `eligibilityStatus` is `DISAPPROVED`.
   */
  reviewEligibilityStatus?:  | "REVIEW_ELIGIBILITY_UNSPECIFIED" | "ELIGIBLE" | "INELIGIBLE";
  /**
   * Review ineligibility reason if account is not eligible for review.
   */
  reviewIneligibilityReason?:  | "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED" | "ONBOARDING_ISSUES" | "NOT_ENOUGH_OFFERS" | "IN_COOLDOWN_PERIOD" | "ALREADY_UNDER_REVIEW" | "NO_REVIEW_REQUIRED" | "WILL_BE_REVIEWED_AUTOMATICALLY" | "IS_RETIRED" | "ALREADY_REVIEWED";
  /**
   * Reason a program in a specific region isn’t eligible for review. Only
   * visible if `reviewEligibilityStatus` is `INELIGIBLE`.
   */
  reviewIneligibilityReasonDescription?: string;
  /**
   * Additional information for ineligibility. If `reviewIneligibilityReason`
   * is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is
   * provided.
   */
  reviewIneligibilityReasonDetails?: FreeListingsProgramStatusReviewIneligibilityReasonDetails;
  /**
   * Issues evaluated in the review process. Fix all issues before requesting a
   * review.
   */
  reviewIssues?: string[];
}

function serializeFreeListingsProgramStatusRegionStatus(data: any): FreeListingsProgramStatusRegionStatus {
  return {
    ...data,
    reviewIneligibilityReasonDetails: data["reviewIneligibilityReasonDetails"] !== undefined ? serializeFreeListingsProgramStatusReviewIneligibilityReasonDetails(data["reviewIneligibilityReasonDetails"]) : undefined,
  };
}

function deserializeFreeListingsProgramStatusRegionStatus(data: any): FreeListingsProgramStatusRegionStatus {
  return {
    ...data,
    reviewIneligibilityReasonDetails: data["reviewIneligibilityReasonDetails"] !== undefined ? deserializeFreeListingsProgramStatusReviewIneligibilityReasonDetails(data["reviewIneligibilityReasonDetails"]) : undefined,
  };
}

/**
 * Additional details for review ineligibility reasons.
 */
export interface FreeListingsProgramStatusReviewIneligibilityReasonDetails {
  /**
   * This timestamp represents end of cooldown period for review ineligbility
   * reason `IN_COOLDOWN_PERIOD`.
   */
  cooldownTime?: Date;
}

function serializeFreeListingsProgramStatusReviewIneligibilityReasonDetails(data: any): FreeListingsProgramStatusReviewIneligibilityReasonDetails {
  return {
    ...data,
    cooldownTime: data["cooldownTime"] !== undefined ? data["cooldownTime"].toISOString() : undefined,
  };
}

function deserializeFreeListingsProgramStatusReviewIneligibilityReasonDetails(data: any): FreeListingsProgramStatusReviewIneligibilityReasonDetails {
  return {
    ...data,
    cooldownTime: data["cooldownTime"] !== undefined ? new Date(data["cooldownTime"]) : undefined,
  };
}

export interface GmbAccounts {
  /**
   * The ID of the Merchant Center account.
   */
  accountId?: bigint;
  /**
   * A list of Business Profiles which are available to the merchant.
   */
  gmbAccounts?: GmbAccountsGmbAccount[];
}

function serializeGmbAccounts(data: any): GmbAccounts {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    gmbAccounts: data["gmbAccounts"] !== undefined ? data["gmbAccounts"].map((item: any) => (serializeGmbAccountsGmbAccount(item))) : undefined,
  };
}

function deserializeGmbAccounts(data: any): GmbAccounts {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    gmbAccounts: data["gmbAccounts"] !== undefined ? data["gmbAccounts"].map((item: any) => (deserializeGmbAccountsGmbAccount(item))) : undefined,
  };
}

export interface GmbAccountsGmbAccount {
  /**
   * The email which identifies the Business Profile.
   */
  email?: string;
  /**
   * Number of listings under this account.
   */
  listingCount?: bigint;
  /**
   * The name of the Business Profile.
   */
  name?: string;
  /**
   * The type of the Business Profile (User or Business).
   */
  type?: string;
}

function serializeGmbAccountsGmbAccount(data: any): GmbAccountsGmbAccount {
  return {
    ...data,
    listingCount: data["listingCount"] !== undefined ? String(data["listingCount"]) : undefined,
  };
}

function deserializeGmbAccountsGmbAccount(data: any): GmbAccountsGmbAccount {
  return {
    ...data,
    listingCount: data["listingCount"] !== undefined ? BigInt(data["listingCount"]) : undefined,
  };
}

/**
 * "Google Analytics Link" sources can be used to get conversion data from an
 * existing Google Analytics property into the linked Merchant Center account.
 */
export interface GoogleAnalyticsLink {
  /**
   * Output only. Attribution settings for the linked Google Analytics
   * property.
   */
  readonly attributionSettings?: AttributionSettings;
  /**
   * Required. Immutable. ID of the Google Analytics property the merchant is
   * linked to.
   */
  propertyId?: bigint;
  /**
   * Output only. Name of the Google Analytics property the merchant is linked
   * to.
   */
  readonly propertyName?: string;
}

function serializeGoogleAnalyticsLink(data: any): GoogleAnalyticsLink {
  return {
    ...data,
    propertyId: data["propertyId"] !== undefined ? String(data["propertyId"]) : undefined,
  };
}

function deserializeGoogleAnalyticsLink(data: any): GoogleAnalyticsLink {
  return {
    ...data,
    propertyId: data["propertyId"] !== undefined ? BigInt(data["propertyId"]) : undefined,
  };
}

/**
 * A non-empty list of row or column headers for a table. Exactly one of
 * `prices`, `weights`, `numItems`, `postalCodeGroupNames`, or `location` must
 * be set.
 */
export interface Headers {
  /**
   * A list of location ID sets. Must be non-empty. Can only be set if all
   * other fields are not set.
   */
  locations?: LocationIdSet[];
  /**
   * A list of inclusive number of items upper bounds. The last value can be
   * `"infinity"`. For example `["10", "50", "infinity"]` represents the headers
   * "<= 10 items", "<= 50 items", and "> 50 items". Must be non-empty. Can only
   * be set if all other fields are not set.
   */
  numberOfItems?: string[];
  /**
   * A list of postal group names. The last value can be `"all other
   * locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The
   * referred postal code groups must match the delivery country of the service.
   * Must be non-empty. Can only be set if all other fields are not set.
   */
  postalCodeGroupNames?: string[];
  /**
   * A list of inclusive order price upper bounds. The last price's value can
   * be `"infinity"`. For example `[{"value": "10", "currency": "USD"},
   * {"value": "500", "currency": "USD"}, {"value": "infinity", "currency":
   * "USD"}]` represents the headers "<= $10", "<= $500", and "> $500". All
   * prices within a service must have the same currency. Must be non-empty. Can
   * only be set if all other fields are not set.
   */
  prices?: Price[];
  /**
   * A list of inclusive order weight upper bounds. The last weight's value can
   * be `"infinity"`. For example `[{"value": "10", "unit": "kg"}, {"value":
   * "50", "unit": "kg"}, {"value": "infinity", "unit": "kg"}]` represents the
   * headers "<= 10kg", "<= 50kg", and "> 50kg". All weights within a service
   * must have the same unit. Must be non-empty. Can only be set if all other
   * fields are not set.
   */
  weights?: Weight[];
}

export interface HolidayCutoff {
  /**
   * Date of the order deadline, in ISO 8601 format. For example, "2016-11-29"
   * for 29th November 2016. Required.
   */
  deadlineDate?: string;
  /**
   * Hour of the day on the deadline date until which the order has to be
   * placed to qualify for the delivery guarantee. Possible values are: 0
   * (midnight), 1, ..., 12 (noon), 13, ..., 23. Required.
   */
  deadlineHour?: number;
  /**
   * Timezone identifier for the deadline hour (for example, "Europe/Zurich").
   * List of identifiers. Required.
   */
  deadlineTimezone?: string;
  /**
   * Unique identifier for the holiday. Required.
   */
  holidayId?: string;
  /**
   * Date on which the deadline will become visible to consumers in ISO 8601
   * format. For example, "2016-10-31" for 31st October 2016. Required.
   */
  visibleFromDate?: string;
}

export interface HolidaysHoliday {
  /**
   * The CLDR territory code of the country in which the holiday is available.
   * For example, "US", "DE", "GB". A holiday cutoff can only be configured in a
   * shipping settings service with matching delivery country. Always present.
   */
  countryCode?: string;
  /**
   * Date of the holiday, in ISO 8601 format. For example, "2016-12-25" for
   * Christmas 2016. Always present.
   */
  date?: string;
  /**
   * Date on which the order has to arrive at the customer's, in ISO 8601
   * format. For example, "2016-12-24" for 24th December 2016. Always present.
   */
  deliveryGuaranteeDate?: string;
  /**
   * Hour of the day in the delivery location's timezone on the guaranteed
   * delivery date by which the order has to arrive at the customer's. Possible
   * values are: 0 (midnight), 1, ..., 12 (noon), 13, ..., 23. Always present.
   */
  deliveryGuaranteeHour?: bigint;
  /**
   * Unique identifier for the holiday to be used when configuring holiday
   * cutoffs. Always present.
   */
  id?: string;
  /**
   * The holiday type. Always present. Acceptable values are: - "`Christmas`" -
   * "`Easter`" - "`Father's Day`" - "`Halloween`" - "`Independence Day (USA)`"
   * - "`Mother's Day`" - "`Thanksgiving`" - "`Valentine's Day`"
   */
  type?: string;
}

function serializeHolidaysHoliday(data: any): HolidaysHoliday {
  return {
    ...data,
    deliveryGuaranteeHour: data["deliveryGuaranteeHour"] !== undefined ? String(data["deliveryGuaranteeHour"]) : undefined,
  };
}

function deserializeHolidaysHoliday(data: any): HolidaysHoliday {
  return {
    ...data,
    deliveryGuaranteeHour: data["deliveryGuaranteeHour"] !== undefined ? BigInt(data["deliveryGuaranteeHour"]) : undefined,
  };
}

/**
 * Map of inapplicability details.
 */
export interface InapplicabilityDetails {
  /**
   * Count of this inapplicable reason code.
   */
  inapplicableCount?: bigint;
  /**
   * Reason code this rule was not applicable.
   */
  inapplicableReason?:  | "INAPPLICABLE_REASON_UNSPECIFIED" | "CANNOT_BEAT_BUYBOX_WINNER" | "ALREADY_WINNING_BUYBOX" | "TRIUMPHED_OVER_BY_SAME_TYPE_RULE" | "TRIUMPHED_OVER_BY_OTHER_RULE_ON_OFFER" | "RESTRICTIONS_NOT_MET" | "UNCATEGORIZED" | "INVALID_AUTO_PRICE_MIN" | "INVALID_FLOOR_CONFIG";
}

function serializeInapplicabilityDetails(data: any): InapplicabilityDetails {
  return {
    ...data,
    inapplicableCount: data["inapplicableCount"] !== undefined ? String(data["inapplicableCount"]) : undefined,
  };
}

function deserializeInapplicabilityDetails(data: any): InapplicabilityDetails {
  return {
    ...data,
    inapplicableCount: data["inapplicableCount"] !== undefined ? BigInt(data["inapplicableCount"]) : undefined,
  };
}

export interface Installment {
  /**
   * The amount the buyer has to pay per month.
   */
  amount?: Price;
  /**
   * The number of installments the buyer has to pay.
   */
  months?: bigint;
}

function serializeInstallment(data: any): Installment {
  return {
    ...data,
    months: data["months"] !== undefined ? String(data["months"]) : undefined,
  };
}

function deserializeInstallment(data: any): Installment {
  return {
    ...data,
    months: data["months"] !== undefined ? BigInt(data["months"]) : undefined,
  };
}

export interface InvoiceSummary {
  /**
   * Summary of the total amounts of the additional charges.
   */
  additionalChargeSummaries?: InvoiceSummaryAdditionalChargeSummary[];
  /**
   * [required] Total price for the product.
   */
  productTotal?: Amount;
}

export interface InvoiceSummaryAdditionalChargeSummary {
  /**
   * [required] Total additional charge for this type.
   */
  totalAmount?: Amount;
  /**
   * [required] Type of the additional charge. Acceptable values are: -
   * "`shipping`"
   */
  type?: string;
}

/**
 * The IDs of labels that should be assigned to the CSS domain.
 */
export interface LabelIds {
  /**
   * The list of label IDs.
   */
  labelIds?: bigint[];
}

function serializeLabelIds(data: any): LabelIds {
  return {
    ...data,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeLabelIds(data: any): LabelIds {
  return {
    ...data,
    labelIds: data["labelIds"] !== undefined ? data["labelIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface LiaAboutPageSettings {
  /**
   * The status of the verification process for the About page. Acceptable
   * values are: - "`active`" - "`inactive`" - "`pending`"
   */
  status?: string;
  /**
   * The URL for the About page.
   */
  url?: string;
}

export interface LiaCountrySettings {
  /**
   * The settings for the About page.
   */
  about?: LiaAboutPageSettings;
  /**
   * Required. CLDR country code (for example, "US").
   */
  country?: string;
  /**
   * The status of the "Merchant hosted local storefront" feature.
   */
  hostedLocalStorefrontActive?: boolean;
  /**
   * LIA inventory verification settings.
   */
  inventory?: LiaInventorySettings;
  /**
   * LIA "On Display To Order" settings.
   */
  onDisplayToOrder?: LiaOnDisplayToOrderSettings;
  /**
   * The POS data provider linked with this country.
   */
  posDataProvider?: LiaPosDataProvider;
  /**
   * The status of the "Store pickup" feature.
   */
  storePickupActive?: boolean;
}

function serializeLiaCountrySettings(data: any): LiaCountrySettings {
  return {
    ...data,
    posDataProvider: data["posDataProvider"] !== undefined ? serializeLiaPosDataProvider(data["posDataProvider"]) : undefined,
  };
}

function deserializeLiaCountrySettings(data: any): LiaCountrySettings {
  return {
    ...data,
    posDataProvider: data["posDataProvider"] !== undefined ? deserializeLiaPosDataProvider(data["posDataProvider"]) : undefined,
  };
}

export interface LiaInventorySettings {
  /**
   * The email of the contact for the inventory verification process.
   */
  inventoryVerificationContactEmail?: string;
  /**
   * The name of the contact for the inventory verification process.
   */
  inventoryVerificationContactName?: string;
  /**
   * The status of the verification contact. Acceptable values are: -
   * "`active`" - "`inactive`" - "`pending`"
   */
  inventoryVerificationContactStatus?: string;
  /**
   * The status of the inventory verification process. Acceptable values are: -
   * "`active`" - "`inactive`" - "`pending`"
   */
  status?: string;
}

export interface LiaOnDisplayToOrderSettings {
  /**
   * Shipping cost and policy URL.
   */
  shippingCostPolicyUrl?: string;
  /**
   * The status of the ?On display to order? feature. Acceptable values are: -
   * "`active`" - "`inactive`" - "`pending`"
   */
  status?: string;
}

export interface LiaPosDataProvider {
  /**
   * The ID of the POS data provider.
   */
  posDataProviderId?: bigint;
  /**
   * The account ID by which this merchant is known to the POS data provider.
   */
  posExternalAccountId?: string;
}

function serializeLiaPosDataProvider(data: any): LiaPosDataProvider {
  return {
    ...data,
    posDataProviderId: data["posDataProviderId"] !== undefined ? String(data["posDataProviderId"]) : undefined,
  };
}

function deserializeLiaPosDataProvider(data: any): LiaPosDataProvider {
  return {
    ...data,
    posDataProviderId: data["posDataProviderId"] !== undefined ? BigInt(data["posDataProviderId"]) : undefined,
  };
}

/**
 * Local Inventory ads (LIA) settings. All methods except listposdataproviders
 * require the admin role.
 */
export interface LiaSettings {
  /**
   * The ID of the account to which these LIA settings belong. Ignored upon
   * update, always present in get request responses.
   */
  accountId?: bigint;
  /**
   * The LIA settings for each country.
   */
  countrySettings?: LiaCountrySettings[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liaSettings`"
   */
  kind?: string;
}

function serializeLiaSettings(data: any): LiaSettings {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    countrySettings: data["countrySettings"] !== undefined ? data["countrySettings"].map((item: any) => (serializeLiaCountrySettings(item))) : undefined,
  };
}

function deserializeLiaSettings(data: any): LiaSettings {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    countrySettings: data["countrySettings"] !== undefined ? data["countrySettings"].map((item: any) => (deserializeLiaCountrySettings(item))) : undefined,
  };
}

export interface LiasettingsCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: LiasettingsCustomBatchRequestEntry[];
}

function serializeLiasettingsCustomBatchRequest(data: any): LiasettingsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLiasettingsCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeLiasettingsCustomBatchRequest(data: any): LiasettingsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLiasettingsCustomBatchRequestEntry(item))) : undefined,
  };
}

export interface LiasettingsCustomBatchRequestEntry {
  /**
   * The ID of the account for which to get/update account LIA settings.
   */
  accountId?: bigint;
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * Inventory validation contact email. Required only for
   * SetInventoryValidationContact.
   */
  contactEmail?: string;
  /**
   * Inventory validation contact name. Required only for
   * SetInventoryValidationContact.
   */
  contactName?: string;
  /**
   * The country code. Required only for RequestInventoryVerification.
   */
  country?: string;
  /**
   * The Business Profile. Required only for RequestGmbAccess.
   */
  gmbEmail?: string;
  /**
   * The account Lia settings to update. Only defined if the method is
   * `update`.
   */
  liaSettings?: LiaSettings;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`" -
   * "`getAccessibleGmbAccounts`" - "`requestGmbAccess`" -
   * "`requestInventoryVerification`" - "`setInventoryVerificationContact`" -
   * "`update`"
   */
  method?: string;
  /**
   * The ID of POS data provider. Required only for SetPosProvider.
   */
  posDataProviderId?: bigint;
  /**
   * The account ID by which this merchant is known to the POS provider.
   */
  posExternalAccountId?: string;
}

function serializeLiasettingsCustomBatchRequestEntry(data: any): LiasettingsCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    liaSettings: data["liaSettings"] !== undefined ? serializeLiaSettings(data["liaSettings"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    posDataProviderId: data["posDataProviderId"] !== undefined ? String(data["posDataProviderId"]) : undefined,
  };
}

function deserializeLiasettingsCustomBatchRequestEntry(data: any): LiasettingsCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    liaSettings: data["liaSettings"] !== undefined ? deserializeLiaSettings(data["liaSettings"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    posDataProviderId: data["posDataProviderId"] !== undefined ? BigInt(data["posDataProviderId"]) : undefined,
  };
}

export interface LiasettingsCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: LiasettingsCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsCustomBatchResponse`".
   */
  kind?: string;
}

function serializeLiasettingsCustomBatchResponse(data: any): LiasettingsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLiasettingsCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeLiasettingsCustomBatchResponse(data: any): LiasettingsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLiasettingsCustomBatchResponseEntry(item))) : undefined,
  };
}

export interface LiasettingsCustomBatchResponseEntry {
  /**
   * The ID of the request entry to which this entry responds.
   */
  batchId?: number;
  /**
   * A list of errors defined if, and only if, the request failed.
   */
  errors?: Errors;
  /**
   * The list of accessible Business Profiles.
   */
  gmbAccounts?: GmbAccounts;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The retrieved or updated Lia settings.
   */
  liaSettings?: LiaSettings;
  /**
   * The list of POS data providers.
   */
  posDataProviders?: PosDataProviders[];
}

function serializeLiasettingsCustomBatchResponseEntry(data: any): LiasettingsCustomBatchResponseEntry {
  return {
    ...data,
    gmbAccounts: data["gmbAccounts"] !== undefined ? serializeGmbAccounts(data["gmbAccounts"]) : undefined,
    liaSettings: data["liaSettings"] !== undefined ? serializeLiaSettings(data["liaSettings"]) : undefined,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (serializePosDataProviders(item))) : undefined,
  };
}

function deserializeLiasettingsCustomBatchResponseEntry(data: any): LiasettingsCustomBatchResponseEntry {
  return {
    ...data,
    gmbAccounts: data["gmbAccounts"] !== undefined ? deserializeGmbAccounts(data["gmbAccounts"]) : undefined,
    liaSettings: data["liaSettings"] !== undefined ? deserializeLiaSettings(data["liaSettings"]) : undefined,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (deserializePosDataProviders(item))) : undefined,
  };
}

export interface LiasettingsGetAccessibleGmbAccountsResponse {
  /**
   * The ID of the Merchant Center account.
   */
  accountId?: bigint;
  /**
   * A list of Business Profiles which are available to the merchant.
   */
  gmbAccounts?: GmbAccountsGmbAccount[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsGetAccessibleGmbAccountsResponse`".
   */
  kind?: string;
}

function serializeLiasettingsGetAccessibleGmbAccountsResponse(data: any): LiasettingsGetAccessibleGmbAccountsResponse {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    gmbAccounts: data["gmbAccounts"] !== undefined ? data["gmbAccounts"].map((item: any) => (serializeGmbAccountsGmbAccount(item))) : undefined,
  };
}

function deserializeLiasettingsGetAccessibleGmbAccountsResponse(data: any): LiasettingsGetAccessibleGmbAccountsResponse {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    gmbAccounts: data["gmbAccounts"] !== undefined ? data["gmbAccounts"].map((item: any) => (deserializeGmbAccountsGmbAccount(item))) : undefined,
  };
}

/**
 * Additional options for Content#liasettingsList.
 */
export interface LiasettingsListOptions {
  /**
   * The maximum number of LIA settings to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface LiasettingsListPosDataProvidersResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsListPosDataProvidersResponse`".
   */
  kind?: string;
  /**
   * The list of POS data providers for each eligible country
   */
  posDataProviders?: PosDataProviders[];
}

function serializeLiasettingsListPosDataProvidersResponse(data: any): LiasettingsListPosDataProvidersResponse {
  return {
    ...data,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (serializePosDataProviders(item))) : undefined,
  };
}

function deserializeLiasettingsListPosDataProvidersResponse(data: any): LiasettingsListPosDataProvidersResponse {
  return {
    ...data,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (deserializePosDataProviders(item))) : undefined,
  };
}

export interface LiasettingsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of LIA settings.
   */
  nextPageToken?: string;
  resources?: LiaSettings[];
}

function serializeLiasettingsListResponse(data: any): LiasettingsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeLiaSettings(item))) : undefined,
  };
}

function deserializeLiasettingsListResponse(data: any): LiasettingsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeLiaSettings(item))) : undefined,
  };
}

/**
 * Additional options for Content#liasettingsRequestgmbaccess.
 */
export interface LiasettingsRequestgmbaccessOptions {
  /**
   * The email of the Business Profile.
   */
  gmbEmail: string;
}

export interface LiasettingsRequestGmbAccessResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsRequestGmbAccessResponse`".
   */
  kind?: string;
}

export interface LiasettingsRequestInventoryVerificationResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsRequestInventoryVerificationResponse`".
   */
  kind?: string;
}

/**
 * Additional options for Content#liasettingsSetinventoryverificationcontact.
 */
export interface LiasettingsSetinventoryverificationcontactOptions {
  /**
   * The email of the inventory verification contact.
   */
  contactEmail: string;
  /**
   * The name of the inventory verification contact.
   */
  contactName: string;
  /**
   * The country for which inventory verification is requested.
   */
  country: string;
  /**
   * The language for which inventory verification is requested.
   */
  language: string;
}

export interface LiasettingsSetInventoryVerificationContactResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsSetInventoryVerificationContactResponse`".
   */
  kind?: string;
}

/**
 * Additional options for Content#liasettingsSetposdataprovider.
 */
export interface LiasettingsSetposdataproviderOptions {
  /**
   * The country for which the POS data provider is selected.
   */
  country: string;
  /**
   * The ID of POS data provider.
   */
  posDataProviderId?: bigint;
  /**
   * The account ID by which this merchant is known to the POS data provider.
   */
  posExternalAccountId?: string;
}

function serializeLiasettingsSetposdataproviderOptions(data: any): LiasettingsSetposdataproviderOptions {
  return {
    ...data,
    posDataProviderId: data["posDataProviderId"] !== undefined ? String(data["posDataProviderId"]) : undefined,
  };
}

function deserializeLiasettingsSetposdataproviderOptions(data: any): LiasettingsSetposdataproviderOptions {
  return {
    ...data,
    posDataProviderId: data["posDataProviderId"] !== undefined ? BigInt(data["posDataProviderId"]) : undefined,
  };
}

export interface LiasettingsSetPosDataProviderResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#liasettingsSetPosDataProviderResponse`".
   */
  kind?: string;
}

export interface LinkedAccount {
  /**
   * The ID of the linked account.
   */
  linkedAccountId?: string;
  /**
   * List of provided services.
   */
  services?: LinkService[];
}

export interface LinkService {
  /**
   * Service provided to or by the linked account. Acceptable values are: -
   * "`shoppingActionsOrderManagement`" - "`shoppingActionsProductManagement`" -
   * "`shoppingAdsProductManagement`" - "`paymentProcessing`"
   */
  service?: string;
  /**
   * Status of the link Acceptable values are: - "`active`" - "`inactive`" -
   * "`pending`"
   */
  status?: string;
}

/**
 * Response message for the `ListAccountLabels` method.
 */
export interface ListAccountLabelsResponse {
  /**
   * The labels from the specified account.
   */
  accountLabels?: AccountLabel[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListAccountLabelsResponse(data: any): ListAccountLabelsResponse {
  return {
    ...data,
    accountLabels: data["accountLabels"] !== undefined ? data["accountLabels"].map((item: any) => (serializeAccountLabel(item))) : undefined,
  };
}

function deserializeListAccountLabelsResponse(data: any): ListAccountLabelsResponse {
  return {
    ...data,
    accountLabels: data["accountLabels"] !== undefined ? data["accountLabels"].map((item: any) => (deserializeAccountLabel(item))) : undefined,
  };
}

/**
 * Response for listing account return carriers.
 */
export interface ListAccountReturnCarrierResponse {
  /**
   * List of all available account return carriers for the merchant.
   */
  accountReturnCarriers?: AccountReturnCarrier[];
}

/**
 * Response message for the ListCollections method.
 */
export interface ListCollectionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The collections listed.
   */
  resources?: Collection[];
}

/**
 * Response message for the ListCollectionStatuses method.
 */
export interface ListCollectionStatusesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The collectionstatuses listed.
   */
  resources?: CollectionStatus[];
}

/**
 * Response message for the ListConversionSources method.
 */
export interface ListConversionSourcesResponse {
  /**
   * List of conversion sources.
   */
  conversionSources?: ConversionSource[];
  /**
   * Token to be used to fetch the next results page.
   */
  nextPageToken?: string;
}

function serializeListConversionSourcesResponse(data: any): ListConversionSourcesResponse {
  return {
    ...data,
    conversionSources: data["conversionSources"] !== undefined ? data["conversionSources"].map((item: any) => (serializeConversionSource(item))) : undefined,
  };
}

function deserializeListConversionSourcesResponse(data: any): ListConversionSourcesResponse {
  return {
    ...data,
    conversionSources: data["conversionSources"] !== undefined ? data["conversionSources"].map((item: any) => (deserializeConversionSource(item))) : undefined,
  };
}

/**
 * The response message for the `ListCsses` method
 */
export interface ListCssesResponse {
  /**
   * The CSS domains affiliated with the specified CSS group.
   */
  csses?: Css[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListCssesResponse(data: any): ListCssesResponse {
  return {
    ...data,
    csses: data["csses"] !== undefined ? data["csses"].map((item: any) => (serializeCss(item))) : undefined,
  };
}

function deserializeListCssesResponse(data: any): ListCssesResponse {
  return {
    ...data,
    csses: data["csses"] !== undefined ? data["csses"].map((item: any) => (deserializeCss(item))) : undefined,
  };
}

/**
 * Response message for the ListMethodQuotas method.
 */
export interface ListMethodQuotasResponse {
  /**
   * The current quota usage and limits per each method.
   */
  methodQuotas?: MethodQuota[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListMethodQuotasResponse(data: any): ListMethodQuotasResponse {
  return {
    ...data,
    methodQuotas: data["methodQuotas"] !== undefined ? data["methodQuotas"].map((item: any) => (serializeMethodQuota(item))) : undefined,
  };
}

function deserializeListMethodQuotasResponse(data: any): ListMethodQuotasResponse {
  return {
    ...data,
    methodQuotas: data["methodQuotas"] !== undefined ? data["methodQuotas"].map((item: any) => (deserializeMethodQuota(item))) : undefined,
  };
}

/**
 * Response message for the `ListRegions` method.
 */
export interface ListRegionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The regions from the specified merchant.
   */
  regions?: Region[];
}

function serializeListRegionsResponse(data: any): ListRegionsResponse {
  return {
    ...data,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (serializeRegion(item))) : undefined,
  };
}

function deserializeListRegionsResponse(data: any): ListRegionsResponse {
  return {
    ...data,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (deserializeRegion(item))) : undefined,
  };
}

/**
 * Response message for the ListRepricingProductReports method.
 */
export interface ListRepricingProductReportsResponse {
  /**
   * A token for retrieving the next page. Its absence means there is no
   * subsequent page.
   */
  nextPageToken?: string;
  /**
   * Periodic reports for the given Repricing product.
   */
  repricingProductReports?: RepricingProductReport[];
}

function serializeListRepricingProductReportsResponse(data: any): ListRepricingProductReportsResponse {
  return {
    ...data,
    repricingProductReports: data["repricingProductReports"] !== undefined ? data["repricingProductReports"].map((item: any) => (serializeRepricingProductReport(item))) : undefined,
  };
}

function deserializeListRepricingProductReportsResponse(data: any): ListRepricingProductReportsResponse {
  return {
    ...data,
    repricingProductReports: data["repricingProductReports"] !== undefined ? data["repricingProductReports"].map((item: any) => (deserializeRepricingProductReport(item))) : undefined,
  };
}

/**
 * Response message for the ListRepricingRuleReports method.
 */
export interface ListRepricingRuleReportsResponse {
  /**
   * A token for retrieving the next page. Its absence means there is no
   * subsequent page.
   */
  nextPageToken?: string;
  /**
   * Daily reports for the given Repricing rule.
   */
  repricingRuleReports?: RepricingRuleReport[];
}

function serializeListRepricingRuleReportsResponse(data: any): ListRepricingRuleReportsResponse {
  return {
    ...data,
    repricingRuleReports: data["repricingRuleReports"] !== undefined ? data["repricingRuleReports"].map((item: any) => (serializeRepricingRuleReport(item))) : undefined,
  };
}

function deserializeListRepricingRuleReportsResponse(data: any): ListRepricingRuleReportsResponse {
  return {
    ...data,
    repricingRuleReports: data["repricingRuleReports"] !== undefined ? data["repricingRuleReports"].map((item: any) => (deserializeRepricingRuleReport(item))) : undefined,
  };
}

/**
 * Response message for the `ListRepricingRules` method.
 */
export interface ListRepricingRulesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The rules from the specified merchant.
   */
  repricingRules?: RepricingRule[];
}

function serializeListRepricingRulesResponse(data: any): ListRepricingRulesResponse {
  return {
    ...data,
    repricingRules: data["repricingRules"] !== undefined ? data["repricingRules"].map((item: any) => (serializeRepricingRule(item))) : undefined,
  };
}

function deserializeListRepricingRulesResponse(data: any): ListRepricingRulesResponse {
  return {
    ...data,
    repricingRules: data["repricingRules"] !== undefined ? data["repricingRules"].map((item: any) => (deserializeRepricingRule(item))) : undefined,
  };
}

/**
 * Response message for the `ListReturnPolicyOnline` method.
 */
export interface ListReturnPolicyOnlineResponse {
  /**
   * The retrieved return policies.
   */
  returnPolicies?: ReturnPolicyOnline[];
}

function serializeListReturnPolicyOnlineResponse(data: any): ListReturnPolicyOnlineResponse {
  return {
    ...data,
    returnPolicies: data["returnPolicies"] !== undefined ? data["returnPolicies"].map((item: any) => (serializeReturnPolicyOnline(item))) : undefined,
  };
}

function deserializeListReturnPolicyOnlineResponse(data: any): ListReturnPolicyOnlineResponse {
  return {
    ...data,
    returnPolicies: data["returnPolicies"] !== undefined ? data["returnPolicies"].map((item: any) => (deserializeReturnPolicyOnline(item))) : undefined,
  };
}

/**
 * Local inventory resource. For accepted attribute values, see the local
 * product inventory feed specification.
 */
export interface LocalInventory {
  /**
   * Availability of the product. For accepted attribute values, see the local
   * product inventory feed specification.
   */
  availability?: string;
  /**
   * A list of custom (merchant-provided) attributes. Can also be used to
   * submit any attribute of the feed specification in its generic form, for
   * example, `{ "name": "size type", "value": "regular" }`.
   */
  customAttributes?: CustomAttribute[];
  /**
   * In-store product location.
   */
  instoreProductLocation?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#localInventory`"
   */
  kind?: string;
  /**
   * Supported pickup method for this offer. Unless the value is "not
   * supported", this field must be submitted together with `pickupSla`. For
   * accepted attribute values, see the local product inventory feed
   * specification.
   */
  pickupMethod?: string;
  /**
   * Expected date that an order will be ready for pickup relative to the order
   * date. Must be submitted together with `pickupMethod`. For accepted
   * attribute values, see the local product inventory feed specification.
   */
  pickupSla?: string;
  /**
   * Price of the product.
   */
  price?: Price;
  /**
   * Quantity of the product. Must be nonnegative.
   */
  quantity?: number;
  /**
   * Sale price of the product. Mandatory if `sale_price_effective_date` is
   * defined.
   */
  salePrice?: Price;
  /**
   * A date range represented by a pair of ISO 8601 dates separated by a space,
   * comma, or slash. Both dates may be specified as 'null' if undecided.
   */
  salePriceEffectiveDate?: string;
  /**
   * Required. Store code of this local inventory resource.
   */
  storeCode?: string;
}

export interface LocalinventoryCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: LocalinventoryCustomBatchRequestEntry[];
}

function serializeLocalinventoryCustomBatchRequest(data: any): LocalinventoryCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLocalinventoryCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeLocalinventoryCustomBatchRequest(data: any): LocalinventoryCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLocalinventoryCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * Batch entry encoding a single local inventory update request.
 */
export interface LocalinventoryCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * Local inventory of the product.
   */
  localInventory?: LocalInventory;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * Method of the batch request entry. Acceptable values are: - "`insert`"
   */
  method?: string;
  /**
   * The ID of the product for which to update local inventory.
   */
  productId?: string;
}

function serializeLocalinventoryCustomBatchRequestEntry(data: any): LocalinventoryCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeLocalinventoryCustomBatchRequestEntry(data: any): LocalinventoryCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface LocalinventoryCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: LocalinventoryCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#localinventoryCustomBatchResponse`".
   */
  kind?: string;
}

/**
 * Batch entry encoding a single local inventory update response.
 */
export interface LocalinventoryCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#localinventoryCustomBatchResponseEntry`"
   */
  kind?: string;
}

export interface LocationIdSet {
  /**
   * A non-empty list of location IDs. They must all be of the same location
   * type (for example, state).
   */
  locationIds?: string[];
}

export interface LoyaltyPoints {
  /**
   * Name of loyalty points program. It is recommended to limit the name to 12
   * full-width characters or 24 Roman characters.
   */
  name?: string;
  /**
   * The retailer's loyalty points in absolute value.
   */
  pointsValue?: bigint;
  /**
   * The ratio of a point when converted to currency. Google assumes currency
   * based on Merchant Center settings. If ratio is left out, it defaults to
   * 1.0.
   */
  ratio?: number;
}

function serializeLoyaltyPoints(data: any): LoyaltyPoints {
  return {
    ...data,
    pointsValue: data["pointsValue"] !== undefined ? String(data["pointsValue"]) : undefined,
  };
}

function deserializeLoyaltyPoints(data: any): LoyaltyPoints {
  return {
    ...data,
    pointsValue: data["pointsValue"] !== undefined ? BigInt(data["pointsValue"]) : undefined,
  };
}

/**
 * "Merchant Center Destination" sources can be used to send conversion events
 * from a website using a Google tag directly to a Merchant Center account where
 * the source is created.
 */
export interface MerchantCenterDestination {
  /**
   * Required. Attribution settings being used for the Merchant Center
   * Destination.
   */
  attributionSettings?: AttributionSettings;
  /**
   * Required. Three-letter currency code (ISO 4217). The currency code defines
   * in which currency the conversions sent to this destination will be reported
   * in Merchant Center.
   */
  currencyCode?: string;
  /**
   * Output only. Merchant Center Destination ID.
   */
  readonly destinationId?: string;
  /**
   * Required. Merchant-specified display name for the destination. This is the
   * name that identifies the conversion source within the Merchant Center UI.
   * Limited to 64 characters.
   */
  displayName?: string;
}

/**
 * Order return. Production access (all methods) requires the order manager
 * role. Sandbox access does not.
 */
export interface MerchantOrderReturn {
  /**
   * The date of creation of the return, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * Merchant defined order ID.
   */
  merchantOrderId?: string;
  /**
   * Google order ID.
   */
  orderId?: string;
  /**
   * Order return ID generated by Google.
   */
  orderReturnId?: string;
  /**
   * Items of the return.
   */
  returnItems?: MerchantOrderReturnItem[];
  /**
   * Information about shipping costs.
   */
  returnPricingInfo?: ReturnPricingInfo;
  /**
   * Shipments of the return.
   */
  returnShipments?: ReturnShipment[];
}

export interface MerchantOrderReturnItem {
  /**
   * The reason that the customer chooses to return an item.
   */
  customerReturnReason?: CustomerReturnReason;
  /**
   * Product level item ID. If the returned items are of the same product, they
   * will have the same ID.
   */
  itemId?: string;
  /**
   * The reason that the merchant chose to reject an item return.
   */
  merchantRejectionReason?: MerchantRejectionReason;
  /**
   * The reason that merchant chooses to accept a return item.
   */
  merchantReturnReason?: RefundReason;
  /**
   * Product data from the time of the order placement.
   */
  product?: OrderLineItemProduct;
  /**
   * Maximum amount that can be refunded for this return item.
   */
  refundableAmount?: MonetaryAmount;
  /**
   * Unit level ID for the return item. Different units of the same product
   * will have different IDs.
   */
  returnItemId?: string;
  /**
   * IDs of the return shipments that this return item belongs to.
   */
  returnShipmentIds?: string[];
  /**
   * ID of the original shipment group. Provided for shipments with invoice
   * support.
   */
  shipmentGroupId?: string;
  /**
   * ID of the shipment unit assigned by the merchant. Provided for shipments
   * with invoice support.
   */
  shipmentUnitId?: string;
  /**
   * State of the item. Acceptable values are: - "`canceled`" - "`new`" -
   * "`received`" - "`refunded`" - "`rejected`"
   */
  state?: string;
}

export interface MerchantRejectionReason {
  /**
   * Description of the reason.
   */
  description?: string;
  /**
   * Code of the rejection reason.
   */
  reasonCode?: string;
}

/**
 * The quota information per method in the Content API. Includes only methods
 * with current usage greater than zero for your account.
 */
export interface MethodQuota {
  /**
   * The method name, for example `products.list`. Method name does not contain
   * version because quota can be shared between different API versions of the
   * same method.
   */
  method?: string;
  /**
   * The current quota limit per day, meaning the maximum number of calls for
   * the method.
   */
  quotaLimit?: bigint;
  /**
   * The current quota usage, meaning the number of calls already made to the
   * method.
   */
  quotaUsage?: bigint;
}

function serializeMethodQuota(data: any): MethodQuota {
  return {
    ...data,
    quotaLimit: data["quotaLimit"] !== undefined ? String(data["quotaLimit"]) : undefined,
    quotaUsage: data["quotaUsage"] !== undefined ? String(data["quotaUsage"]) : undefined,
  };
}

function deserializeMethodQuota(data: any): MethodQuota {
  return {
    ...data,
    quotaLimit: data["quotaLimit"] !== undefined ? BigInt(data["quotaLimit"]) : undefined,
    quotaUsage: data["quotaUsage"] !== undefined ? BigInt(data["quotaUsage"]) : undefined,
  };
}

/**
 * Performance metrics. Values are only set for metrics requested explicitly in
 * the request's search query.
 */
export interface Metrics {
  /**
   * Average order size - the average number of items in an order. **This
   * metric cannot be segmented by product dimensions and
   * customer_country_code.**
   */
  aos?: number;
  /**
   * Average order value in micros (1 millionth of a standard unit, 1 USD =
   * 1000000 micros) - the average value (total price of items) of all placed
   * orders. The currency of the returned value is stored in the currency_code
   * segment. If this metric is selected, 'segments.currency_code' is
   * automatically added to the SELECT clause in the search query (unless it is
   * explicitly selected by the user) and the currency_code segment is populated
   * in the response. **This metric cannot be segmented by product dimensions
   * and customer_country_code.**
   */
  aovMicros?: number;
  /**
   * Number of clicks.
   */
  clicks?: bigint;
  /**
   * Number of conversions divided by the number of clicks, reported on the
   * impression date. The metric is currently available only for the
   * FREE_PRODUCT_LISTING program.
   */
  conversionRate?: number;
  /**
   * Number of conversions attributed to the product, reported on the
   * conversion date. Depending on the attribution model, a conversion might be
   * distributed across multiple clicks, where each click gets its own credit
   * assigned. This metric is a sum of all such credits. The metric is currently
   * available only for the FREE_PRODUCT_LISTING program.
   */
  conversions?: number;
  /**
   * Value of conversions in micros (1 millionth of a standard unit, 1 USD =
   * 1000000 micros) attributed to the product, reported on the conversion date.
   * The metric is currently available only for the FREE_PRODUCT_LISTING
   * program. The currency of the returned value is stored in the currency_code
   * segment. If this metric is selected, 'segments.currency_code' is
   * automatically added to the SELECT clause in the search query (unless it is
   * explicitly selected by the user) and the currency_code segment is populated
   * in the response.
   */
  conversionValueMicros?: bigint;
  /**
   * Click-through rate - the number of clicks merchant's products receive
   * (clicks) divided by the number of times the products are shown
   * (impressions).
   */
  ctr?: number;
  /**
   * Average number of days between an order being placed and the order being
   * fully shipped, reported on the last shipment date. **This metric cannot be
   * segmented by product dimensions and customer_country_code.**
   */
  daysToShip?: number;
  /**
   * Number of times merchant's products are shown.
   */
  impressions?: bigint;
  /**
   * Average number of days between an item being ordered and the item being
   * **This metric cannot be segmented by customer_country_code.**
   */
  itemDaysToShip?: number;
  /**
   * Percentage of shipped items in relation to all finalized items (shipped or
   * rejected by the merchant; unshipped items are not taken into account),
   * reported on the order date. Item fill rate is lowered by merchant
   * rejections. **This metric cannot be segmented by customer_country_code.**
   */
  itemFillRate?: number;
  /**
   * Number of ordered items. Excludes customer cancellations that happened
   * within 30 minutes of placing the order. **This metric cannot be segmented
   * by customer_country_code.**
   */
  orderedItems?: bigint;
  /**
   * Total price of ordered items in micros (1 millionth of a standard unit, 1
   * USD = 1000000 micros). Excludes shipping, taxes (US only), and customer
   * cancellations that happened within 30 minutes of placing the order. The
   * currency of the returned value is stored in the currency_code segment. If
   * this metric is selected, 'segments.currency_code' is automatically added to
   * the SELECT clause in the search query (unless it is explicitly selected by
   * the user) and the currency_code segment is populated in the response.
   * **This metric cannot be segmented by customer_country_code.**
   */
  orderedItemSalesMicros?: bigint;
  /**
   * Number of placed orders. Excludes customer cancellations that happened
   * within 30 minutes of placing the order. **This metric cannot be segmented
   * by product dimensions and customer_country_code.**
   */
  orders?: bigint;
  /**
   * Number of ordered items canceled by the merchant, reported on the order
   * date. **This metric cannot be segmented by customer_country_code.**
   */
  rejectedItems?: bigint;
  /**
   * Number of ordered items sent back for return, reported on the date when
   * the merchant accepted the return. **This metric cannot be segmented by
   * customer_country_code.**
   */
  returnedItems?: bigint;
  /**
   * Total price of returned items divided by the total price of shipped items,
   * reported on the order date. If this metric is selected,
   * 'segments.currency_code' is automatically added to the SELECT clause in the
   * search query (unless it is explicitly selected by the user) and the
   * currency_code segment is populated in the response. **This metric cannot be
   * segmented by customer_country_code.**
   */
  returnRate?: number;
  /**
   * Total price of ordered items sent back for return in micros (1 millionth
   * of a standard unit, 1 USD = 1000000 micros), reported on the date when the
   * merchant accepted the return. The currency of the returned value is stored
   * in the currency_code segment. If this metric is selected,
   * 'segments.currency_code' is automatically added to the SELECT clause in the
   * search query (unless it is explicitly selected by the user) and the
   * currency_code segment is populated in the response. **This metric cannot be
   * segmented by customer_country_code.**
   */
  returnsMicros?: bigint;
  /**
   * Number of shipped items, reported on the shipment date. **This metric
   * cannot be segmented by customer_country_code.**
   */
  shippedItems?: bigint;
  /**
   * Total price of shipped items in micros (1 millionth of a standard unit, 1
   * USD = 1000000 micros), reported on the order date. Excludes shipping and
   * taxes (US only). The currency of the returned value is stored in the
   * currency_code segment. If this metric is selected, 'segments.currency_code'
   * is automatically added to the SELECT clause in the search query (unless it
   * is explicitly selected by the user) and the currency_code segment is
   * populated in the response. **This metric cannot be segmented by
   * customer_country_code.**
   */
  shippedItemSalesMicros?: bigint;
  /**
   * Number of fully shipped orders, reported on the last shipment date. **This
   * metric cannot be segmented by product dimensions and
   * customer_country_code.**
   */
  shippedOrders?: bigint;
  /**
   * Number of ordered items not shipped up until the end of the queried day.
   * If a multi-day period is specified in the search query, the returned value
   * is the average number of unshipped items over the days in the queried
   * period. **This metric cannot be segmented by customer_country_code.**
   */
  unshippedItems?: number;
  /**
   * Number of orders not shipped or partially shipped up until the end of the
   * queried day. If a multi-day period is specified in the search query, the
   * returned value is the average number of unshipped orders over the days in
   * the queried period. **This metric cannot be segmented by product dimensions
   * and customer_country_code.**
   */
  unshippedOrders?: number;
}

function serializeMetrics(data: any): Metrics {
  return {
    ...data,
    clicks: data["clicks"] !== undefined ? String(data["clicks"]) : undefined,
    conversionValueMicros: data["conversionValueMicros"] !== undefined ? String(data["conversionValueMicros"]) : undefined,
    impressions: data["impressions"] !== undefined ? String(data["impressions"]) : undefined,
    orderedItems: data["orderedItems"] !== undefined ? String(data["orderedItems"]) : undefined,
    orderedItemSalesMicros: data["orderedItemSalesMicros"] !== undefined ? String(data["orderedItemSalesMicros"]) : undefined,
    orders: data["orders"] !== undefined ? String(data["orders"]) : undefined,
    rejectedItems: data["rejectedItems"] !== undefined ? String(data["rejectedItems"]) : undefined,
    returnedItems: data["returnedItems"] !== undefined ? String(data["returnedItems"]) : undefined,
    returnsMicros: data["returnsMicros"] !== undefined ? String(data["returnsMicros"]) : undefined,
    shippedItems: data["shippedItems"] !== undefined ? String(data["shippedItems"]) : undefined,
    shippedItemSalesMicros: data["shippedItemSalesMicros"] !== undefined ? String(data["shippedItemSalesMicros"]) : undefined,
    shippedOrders: data["shippedOrders"] !== undefined ? String(data["shippedOrders"]) : undefined,
  };
}

function deserializeMetrics(data: any): Metrics {
  return {
    ...data,
    clicks: data["clicks"] !== undefined ? BigInt(data["clicks"]) : undefined,
    conversionValueMicros: data["conversionValueMicros"] !== undefined ? BigInt(data["conversionValueMicros"]) : undefined,
    impressions: data["impressions"] !== undefined ? BigInt(data["impressions"]) : undefined,
    orderedItems: data["orderedItems"] !== undefined ? BigInt(data["orderedItems"]) : undefined,
    orderedItemSalesMicros: data["orderedItemSalesMicros"] !== undefined ? BigInt(data["orderedItemSalesMicros"]) : undefined,
    orders: data["orders"] !== undefined ? BigInt(data["orders"]) : undefined,
    rejectedItems: data["rejectedItems"] !== undefined ? BigInt(data["rejectedItems"]) : undefined,
    returnedItems: data["returnedItems"] !== undefined ? BigInt(data["returnedItems"]) : undefined,
    returnsMicros: data["returnsMicros"] !== undefined ? BigInt(data["returnsMicros"]) : undefined,
    shippedItems: data["shippedItems"] !== undefined ? BigInt(data["shippedItems"]) : undefined,
    shippedItemSalesMicros: data["shippedItemSalesMicros"] !== undefined ? BigInt(data["shippedItemSalesMicros"]) : undefined,
    shippedOrders: data["shippedOrders"] !== undefined ? BigInt(data["shippedOrders"]) : undefined,
  };
}

export interface MinimumOrderValueTable {
  storeCodeSetWithMovs?: MinimumOrderValueTableStoreCodeSetWithMov[];
}

/**
 * A list of store code sets sharing the same minimum order value. At least two
 * sets are required and the last one must be empty, which signifies 'MOV for
 * all other stores'. Each store code can only appear once across all the sets.
 * All prices within a service must have the same currency.
 */
export interface MinimumOrderValueTableStoreCodeSetWithMov {
  /**
   * A list of unique store codes or empty for the catch all.
   */
  storeCodes?: string[];
  /**
   * The minimum order value for the given stores.
   */
  value?: Price;
}

export interface MonetaryAmount {
  /**
   * The pre-tax or post-tax price depends on the location of the order. - For
   * countries (for example, "US". where price attribute excludes tax, this
   * field corresponds to the pre-tax value. - For coutries (for example,
   * "France") where price attribute includes tax, this field corresponds to the
   * post-tax value .
   */
  priceAmount?: Price;
  /**
   * Tax value, present only for countries where price attribute excludes tax
   * (for example, "US". No tax is referenced as 0 value with the corresponding
   * `currency`.
   */
  taxAmount?: Price;
}

/**
 * Request message for the OnboardProgram method.
 */
export interface OnboardBuyOnGoogleProgramRequest {
  /**
   * The customer service email.
   */
  customerServiceEmail?: string;
}

/**
 * Order. Production access (all methods) requires the order manager role.
 * Sandbox access does not.
 */
export interface Order {
  /**
   * Whether the order was acknowledged.
   */
  acknowledged?: boolean;
  /**
   * List of key-value pairs that are attached to a given order.
   */
  annotations?: OrderOrderAnnotation[];
  /**
   * The billing address.
   */
  billingAddress?: OrderAddress;
  /**
   * The details of the customer who placed the order.
   */
  customer?: OrderCustomer;
  /**
   * Delivery details for shipments of type `delivery`.
   */
  deliveryDetails?: OrderDeliveryDetails;
  /**
   * The REST ID of the order. Globally unique.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#order`"
   */
  kind?: string;
  /**
   * Line items that are ordered.
   */
  lineItems?: OrderLineItem[];
  merchantId?: bigint;
  /**
   * Merchant-provided ID of the order.
   */
  merchantOrderId?: string;
  /**
   * The net amount for the order (price part). For example, if an order was
   * originally for $100 and a refund was issued for $20, the net amount will be
   * $80.
   */
  netPriceAmount?: Price;
  /**
   * The net amount for the order (tax part). Note that in certain cases due to
   * taxable base adjustment `netTaxAmount` might not match to a sum of tax
   * field across all lineItems and refunds.
   */
  netTaxAmount?: Price;
  /**
   * The status of the payment. Acceptable values are: - "`paymentCaptured`" -
   * "`paymentRejected`" - "`paymentSecured`" - "`pendingAuthorization`"
   */
  paymentStatus?: string;
  /**
   * Pickup details for shipments of type `pickup`.
   */
  pickupDetails?: OrderPickupDetails;
  /**
   * The date when the order was placed, in ISO 8601 format.
   */
  placedDate?: string;
  /**
   * Promotions associated with the order. To determine which promotions apply
   * to which products, check the `Promotions[].appliedItems[].lineItemId` field
   * against the `LineItems[].id` field for each promotion. If a promotion is
   * applied to more than 1 offerId, divide the discount value by the number of
   * affected offers to determine how much discount to apply to each offerId.
   * Examples: 1. To calculate price paid by the customer for a single line item
   * including the discount: For each promotion, subtract the
   * `LineItems[].adjustments[].priceAdjustment.value` amount from the
   * `LineItems[].Price.value`. 2. To calculate price paid by the customer for a
   * single line item including the discount in case of multiple quantity: For
   * each promotion, divide the
   * `LineItems[].adjustments[].priceAdjustment.value` by the quantity of
   * products then subtract the resulting value from the
   * `LineItems[].Product.Price.value` for each quantity item. Only 1 promotion
   * can be applied to an offerId in a given order. To refund an item which had
   * a promotion applied to it, make sure to refund the amount after first
   * subtracting the promotion discount from the item price. More details about
   * the program are here.
   */
  promotions?: OrderPromotion[];
  /**
   * Refunds for the order.
   */
  refunds?: OrderRefund[];
  /**
   * Shipments of the order.
   */
  shipments?: OrderShipment[];
  /**
   * The total cost of shipping for all items.
   */
  shippingCost?: Price;
  /**
   * The tax for the total shipping cost.
   */
  shippingCostTax?: Price;
  /**
   * The status of the order. Acceptable values are: - "`canceled`" -
   * "`delivered`" - "`inProgress`" - "`partiallyDelivered`" -
   * "`partiallyReturned`" - "`partiallyShipped`" - "`pendingShipment`" -
   * "`returned`" - "`shipped`"
   */
  status?: string;
  /**
   * The party responsible for collecting and remitting taxes. Acceptable
   * values are: - "`marketplaceFacilitator`" - "`merchant`"
   */
  taxCollector?: string;
}

function serializeOrder(data: any): Order {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeOrder(data: any): Order {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface OrderAddress {
  /**
   * CLDR country code (for example, "US").
   */
  country?: string;
  /**
   * Strings representing the lines of the printed label for mailing the order,
   * for example: John Smith 1600 Amphitheatre Parkway Mountain View, CA, 94043
   * United States
   */
  fullAddress?: string[];
  /**
   * Whether the address is a post office box.
   */
  isPostOfficeBox?: boolean;
  /**
   * City, town or commune. May also include dependent localities or
   * sublocalities (for example, neighborhoods or suburbs).
   */
  locality?: string;
  /**
   * Postal Code or ZIP (for example, "94043").
   */
  postalCode?: string;
  /**
   * Name of the recipient.
   */
  recipientName?: string;
  /**
   * Top-level administrative subdivision of the country. For example, a state
   * like California ("CA") or a province like Quebec ("QC").
   */
  region?: string;
  /**
   * Street-level part of the address. Use `\n` to add a second line.
   */
  streetAddress?: string[];
}

export interface OrderCancellation {
  /**
   * The actor that created the cancellation. Acceptable values are: -
   * "`customer`" - "`googleBot`" - "`googleCustomerService`" -
   * "`googlePayments`" - "`googleSabre`" - "`merchant`"
   */
  actor?: string;
  /**
   * Date on which the cancellation has been created, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * The quantity that was canceled.
   */
  quantity?: number;
  /**
   * The reason for the cancellation. Orders that are canceled with a
   * noInventory reason will lead to the removal of the product from Buy on
   * Google until you make an update to that product. This won't affect your
   * Shopping ads. Acceptable values are: - "`autoPostInternal`" -
   * "`autoPostInvalidBillingAddress`" - "`autoPostNoInventory`" -
   * "`autoPostPriceError`" - "`autoPostUndeliverableShippingAddress`" -
   * "`couponAbuse`" - "`customerCanceled`" - "`customerInitiatedCancel`" -
   * "`customerSupportRequested`" - "`failToPushOrderGoogleError`" -
   * "`failToPushOrderMerchantError`" -
   * "`failToPushOrderMerchantFulfillmentError`" - "`failToPushOrderToMerchant`"
   * - "`failToPushOrderToMerchantOutOfStock`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`merchantDidNotShipOnTime`" -
   * "`noInventory`" - "`orderTimeout`" - "`other`" - "`paymentAbuse`" -
   * "`paymentDeclined`" - "`priceError`" - "`returnRefundAbuse`" -
   * "`shippingPriceError`" - "`taxError`" - "`undeliverableShippingAddress`" -
   * "`unsupportedPoBoxAddress`" - "`failedToCaptureFunds`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrderCustomer {
  /**
   * Full name of the customer.
   */
  fullName?: string;
  /**
   * Email address for the merchant to send value-added tax or invoice
   * documentation of the order. Only the last document sent is made available
   * to the customer. For more information, see About automated VAT invoicing
   * for Buy on Google.
   */
  invoiceReceivingEmail?: string;
  /**
   * Loyalty program information.
   */
  loyaltyInfo?: OrderCustomerLoyaltyInfo;
  /**
   * Customer's marketing preferences. Contains the marketing opt-in
   * information that is current at the time that the merchant call. User
   * preference selections can change from one order to the next so preferences
   * must be checked with every order.
   */
  marketingRightsInfo?: OrderCustomerMarketingRightsInfo;
}

export interface OrderCustomerLoyaltyInfo {
  /**
   * The loyalty card/membership number.
   */
  loyaltyNumber?: string;
  /**
   * Name of card/membership holder, this field will be populated when
   */
  name?: string;
}

export interface OrderCustomerMarketingRightsInfo {
  /**
   * Last known customer selection regarding marketing preferences. In certain
   * cases this selection might not be known, so this field would be empty. If a
   * customer selected `granted` in their most recent order, they can be
   * subscribed to marketing emails. Customers who have chosen `denied` must not
   * be subscribed, or must be unsubscribed if already opted-in. Acceptable
   * values are: - "`denied`" - "`granted`"
   */
  explicitMarketingPreference?: string;
  /**
   * Timestamp when last time marketing preference was updated. Could be empty,
   * if user wasn't offered a selection yet.
   */
  lastUpdatedTimestamp?: string;
  /**
   * Email address that can be used for marketing purposes. The field may be
   * empty even if `explicitMarketingPreference` is 'granted'. This happens when
   * retrieving an old order from the customer who deleted their account.
   */
  marketingEmailAddress?: string;
}

export interface OrderDeliveryDetails {
  /**
   * The delivery address
   */
  address?: OrderAddress;
  /**
   * The phone number of the person receiving the delivery.
   */
  phoneNumber?: string;
}

export interface OrderinvoicesCreateChargeInvoiceRequest {
  /**
   * [required] The ID of the invoice.
   */
  invoiceId?: string;
  /**
   * [required] Invoice summary.
   */
  invoiceSummary?: InvoiceSummary;
  /**
   * [required] Invoice details per line item.
   */
  lineItemInvoices?: ShipmentInvoiceLineItemInvoice[];
  /**
   * [required] The ID of the operation, unique across all operations for a
   * given order.
   */
  operationId?: string;
  /**
   * [required] ID of the shipment group. It is assigned by the merchant in the
   * `shipLineItems` method and is used to group multiple line items that have
   * the same kind of shipping charges.
   */
  shipmentGroupId?: string;
}

export interface OrderinvoicesCreateChargeInvoiceResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderinvoicesCreateChargeInvoiceResponse`".
   */
  kind?: string;
}

export interface OrderinvoicesCreateRefundInvoiceRequest {
  /**
   * [required] The ID of the invoice.
   */
  invoiceId?: string;
  /**
   * [required] The ID of the operation, unique across all operations for a
   * given order.
   */
  operationId?: string;
  /**
   * Option to create a refund-only invoice. Exactly one of `refundOnlyOption`
   * or `returnOption` must be provided.
   */
  refundOnlyOption?: OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceRefundOption;
  /**
   * Option to create an invoice for a refund and mark all items within the
   * invoice as returned. Exactly one of `refundOnlyOption` or `returnOption`
   * must be provided.
   */
  returnOption?: OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceReturnOption;
  /**
   * Invoice details for different shipment groups.
   */
  shipmentInvoices?: ShipmentInvoice[];
}

export interface OrderinvoicesCreateRefundInvoiceResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderinvoicesCreateRefundInvoiceResponse`".
   */
  kind?: string;
}

export interface OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceRefundOption {
  /**
   * Optional description of the refund reason.
   */
  description?: string;
  /**
   * [required] Reason for the refund. Acceptable values are: - "`adjustment`"
   * - "`autoPostInternal`" - "`autoPostInvalidBillingAddress`" -
   * "`autoPostNoInventory`" - "`autoPostPriceError`" -
   * "`autoPostUndeliverableShippingAddress`" - "`couponAbuse`" -
   * "`courtesyAdjustment`" - "`customerCanceled`" -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`customerSupportRequested`" - "`deliveredLateByCarrier`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`failToPushOrderGoogleError`" -
   * "`failToPushOrderMerchantError`" -
   * "`failToPushOrderMerchantFulfillmentError`" - "`failToPushOrderToMerchant`"
   * - "`failToPushOrderToMerchantOutOfStock`" - "`feeAdjustment`" -
   * "`invalidCoupon`" - "`lateShipmentCredit`" - "`malformedShippingAddress`" -
   * "`merchantDidNotShipOnTime`" - "`noInventory`" - "`orderTimeout`" -
   * "`other`" - "`paymentAbuse`" - "`paymentDeclined`" - "`priceAdjustment`" -
   * "`priceError`" - "`productArrivedDamaged`" - "`productNotAsDescribed`" -
   * "`promoReallocation`" - "`qualityNotAsExpected`" - "`returnRefundAbuse`" -
   * "`shippingCostAdjustment`" - "`shippingPriceError`" - "`taxAdjustment`" -
   * "`taxError`" - "`undeliverableShippingAddress`" -
   * "`unsupportedPoBoxAddress`" - "`wrongProductShipped`"
   */
  reason?: string;
}

export interface OrderinvoicesCustomBatchRequestEntryCreateRefundInvoiceReturnOption {
  /**
   * Optional description of the return reason.
   */
  description?: string;
  /**
   * [required] Reason for the return. Acceptable values are: -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`other`" - "`productArrivedDamaged`" -
   * "`productNotAsDescribed`" - "`qualityNotAsExpected`" -
   * "`undeliverableShippingAddress`" - "`unsupportedPoBoxAddress`" -
   * "`wrongProductShipped`"
   */
  reason?: string;
}

export interface OrderLineItem {
  /**
   * Price and tax adjustments applied on the line item.
   */
  adjustments?: OrderLineItemAdjustment[];
  /**
   * Annotations that are attached to the line item.
   */
  annotations?: OrderMerchantProvidedAnnotation[];
  /**
   * Cancellations of the line item.
   */
  cancellations?: OrderCancellation[];
  /**
   * The ID of the line item.
   */
  id?: string;
  /**
   * Total price for the line item. For example, if two items for $10 are
   * purchased, the total price will be $20.
   */
  price?: Price;
  /**
   * Product data as seen by customer from the time of the order placement.
   * Note that certain attributes values (for example, title or gtin) might be
   * reformatted and no longer match values submitted through product feed.
   */
  product?: OrderLineItemProduct;
  /**
   * Number of items canceled.
   */
  quantityCanceled?: number;
  /**
   * Number of items delivered.
   */
  quantityDelivered?: number;
  /**
   * Number of items ordered.
   */
  quantityOrdered?: number;
  /**
   * Number of items pending.
   */
  quantityPending?: number;
  /**
   * Number of items ready for pickup.
   */
  quantityReadyForPickup?: number;
  /**
   * Number of items returned.
   */
  quantityReturned?: number;
  /**
   * Number of items shipped.
   */
  quantityShipped?: number;
  /**
   * Number of items undeliverable.
   */
  quantityUndeliverable?: number;
  /**
   * Details of the return policy for the line item.
   */
  returnInfo?: OrderLineItemReturnInfo;
  /**
   * Returns of the line item.
   */
  returns?: OrderReturn[];
  /**
   * Details of the requested shipping for the line item.
   */
  shippingDetails?: OrderLineItemShippingDetails;
  /**
   * Total tax amount for the line item. For example, if two items are
   * purchased, and each have a cost tax of $2, the total tax amount will be $4.
   */
  tax?: Price;
}

export interface OrderLineItemAdjustment {
  /**
   * Adjustment for total price of the line item.
   */
  priceAdjustment?: Price;
  /**
   * Adjustment for total tax of the line item.
   */
  taxAdjustment?: Price;
  /**
   * Type of this adjustment. Acceptable values are: - "`promotion`"
   */
  type?: string;
}

export interface OrderLineItemProduct {
  /**
   * Brand of the item.
   */
  brand?: string;
  /**
   * Condition or state of the item. Acceptable values are: - "`new`" -
   * "`refurbished`" - "`used`"
   */
  condition?: string;
  /**
   * The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Associated fees at order creation time.
   */
  fees?: OrderLineItemProductFee[];
  /**
   * Global Trade Item Number (GTIN) of the item.
   */
  gtin?: string;
  /**
   * The REST ID of the product.
   */
  id?: string;
  /**
   * URL of an image of the item.
   */
  imageLink?: string;
  /**
   * Shared identifier for all variants of the same product.
   */
  itemGroupId?: string;
  /**
   * Manufacturer Part Number (MPN) of the item.
   */
  mpn?: string;
  /**
   * An identifier of the item.
   */
  offerId?: string;
  /**
   * Price of the item.
   */
  price?: Price;
  /**
   * URL to the cached image shown to the user when order was placed.
   */
  shownImage?: string;
  /**
   * The CLDR territory code of the target country of the product.
   */
  targetCountry?: string;
  /**
   * The title of the product.
   */
  title?: string;
  /**
   * Variant attributes for the item. These are dimensions of the product, such
   * as color, gender, material, pattern, and size. You can find a comprehensive
   * list of variant attributes here.
   */
  variantAttributes?: OrderLineItemProductVariantAttribute[];
}

export interface OrderLineItemProductFee {
  /**
   * Amount of the fee.
   */
  amount?: Price;
  /**
   * Name of the fee.
   */
  name?: string;
}

export interface OrderLineItemProductVariantAttribute {
  /**
   * The dimension of the variant.
   */
  dimension?: string;
  /**
   * The value for the dimension.
   */
  value?: string;
}

export interface OrderLineItemReturnInfo {
  /**
   * Required. How many days later the item can be returned.
   */
  daysToReturn?: number;
  /**
   * Required. Whether the item is returnable.
   */
  isReturnable?: boolean;
  /**
   * Required. URL of the item return policy.
   */
  policyUrl?: string;
}

export interface OrderLineItemShippingDetails {
  /**
   * Required. The delivery by date, in ISO 8601 format.
   */
  deliverByDate?: string;
  /**
   * Required. Details of the shipping method.
   */
  method?: OrderLineItemShippingDetailsMethod;
  /**
   * The promised time in minutes in which the order will be ready for pickup.
   * This only applies to buy-online-pickup-in-store same-day order.
   */
  pickupPromiseInMinutes?: number;
  /**
   * Required. The ship by date, in ISO 8601 format.
   */
  shipByDate?: string;
  /**
   * Type of shipment. Indicates whether `deliveryDetails` or `pickupDetails`
   * is applicable for this shipment. Acceptable values are: - "`delivery`" -
   * "`pickup`"
   */
  type?: string;
}

export interface OrderLineItemShippingDetailsMethod {
  /**
   * The carrier for the shipping. Optional. See `shipments[].carrier` for a
   * list of acceptable values.
   */
  carrier?: string;
  /**
   * Required. Maximum transit time.
   */
  maxDaysInTransit?: number;
  /**
   * Required. The name of the shipping method.
   */
  methodName?: string;
  /**
   * Required. Minimum transit time.
   */
  minDaysInTransit?: number;
}

export interface OrderMerchantProvidedAnnotation {
  /**
   * Key for additional merchant provided (as key-value pairs) annotation about
   * the line item.
   */
  key?: string;
  /**
   * Value for additional merchant provided (as key-value pairs) annotation
   * about the line item.
   */
  value?: string;
}

export interface OrderOrderAnnotation {
  /**
   * Key for additional google provided (as key-value pairs) annotation.
   */
  key?: string;
  /**
   * Value for additional google provided (as key-value pairs) annotation.
   */
  value?: string;
}

export interface OrderPickupDetails {
  /**
   * Address of the pickup location where the shipment should be sent. Note
   * that `recipientName` in the address is the name of the business at the
   * pickup location.
   */
  address?: OrderAddress;
  /**
   * Collectors authorized to pick up shipment from the pickup location.
   */
  collectors?: OrderPickupDetailsCollector[];
  /**
   * ID of the pickup location.
   */
  locationId?: string;
  /**
   * The pickup type of this order. Acceptable values are: - "`merchantStore`"
   * - "`merchantStoreCurbside`" - "`merchantStoreLocker`" -
   * "`thirdPartyPickupPoint`" - "`thirdPartyLocker`"
   */
  pickupType?: string;
}

export interface OrderPickupDetailsCollector {
  /**
   * Name of the person picking up the shipment.
   */
  name?: string;
  /**
   * Phone number of the person picking up the shipment.
   */
  phoneNumber?: string;
}

export interface OrderPromotion {
  /**
   * Items that this promotion may be applied to. If empty, there are no
   * restrictions on applicable items and quantity. This field will also be
   * empty for shipping promotions because shipping is not tied to any specific
   * item.
   */
  applicableItems?: OrderPromotionItem[];
  /**
   * Items that this promotion have been applied to. Do not provide for
   * `orders.createtestorder`. This field will be empty for shipping promotions
   * because shipping is not tied to any specific item.
   */
  appliedItems?: OrderPromotionItem[];
  /**
   * Promotion end time in ISO 8601 format. Date, time, and offset required,
   * for example, "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z".
   */
  endTime?: string;
  /**
   * Required. The party funding the promotion. Only `merchant` is supported
   * for `orders.createtestorder`. Acceptable values are: - "`google`" -
   * "`merchant`"
   */
  funder?: string;
  /**
   * Required. This field is used to identify promotions within merchants' own
   * systems.
   */
  merchantPromotionId?: string;
  /**
   * Estimated discount applied to price. Amount is pre-tax or post-tax
   * depending on location of order.
   */
  priceValue?: Price;
  /**
   * A short title of the promotion to be shown on the checkout page. Do not
   * provide for `orders.createtestorder`.
   */
  shortTitle?: string;
  /**
   * Promotion start time in ISO 8601 format. Date, time, and offset required,
   * for example, "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z".
   */
  startTime?: string;
  /**
   * Required. The category of the promotion. Only `moneyOff` is supported for
   * `orders.createtestorder`. Acceptable values are: - "`buyMGetMoneyOff`" -
   * "`buyMGetNMoneyOff`" - "`buyMGetNPercentOff`" - "`buyMGetPercentOff`" -
   * "`freeGift`" - "`freeGiftWithItemId`" - "`freeGiftWithValue`" -
   * "`freeShippingOvernight`" - "`freeShippingStandard`" -
   * "`freeShippingTwoDay`" - "`moneyOff`" - "`percentOff`" - "`rewardPoints`" -
   * "`salePrice`"
   */
  subtype?: string;
  /**
   * Estimated discount applied to tax (if allowed by law). Do not provide for
   * `orders.createtestorder`.
   */
  taxValue?: Price;
  /**
   * Required. The title of the promotion.
   */
  title?: string;
  /**
   * Required. The scope of the promotion. Only `product` is supported for
   * `orders.createtestorder`. Acceptable values are: - "`product`" -
   * "`shipping`"
   */
  type?: string;
}

export interface OrderPromotionItem {
  /**
   * The line item ID of a product. Do not provide for
   * `orders.createtestorder`.
   */
  lineItemId?: string;
  /**
   * Required. Offer ID of a product. Only for `orders.createtestorder`.
   */
  offerId?: string;
  /**
   * `orders.createtestorder`.
   */
  productId?: string;
  /**
   * The quantity of the associated product. Do not provide for
   * `orders.createtestorder`.
   */
  quantity?: number;
}

export interface OrderRefund {
  /**
   * The actor that created the refund. Acceptable values are: - "`customer`" -
   * "`googleBot`" - "`googleCustomerService`" - "`googlePayments`" -
   * "`googleSabre`" - "`merchant`"
   */
  actor?: string;
  /**
   * The amount that is refunded.
   */
  amount?: Price;
  /**
   * Date on which the item has been created, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * The reason for the refund. Acceptable values are: - "`adjustment`" -
   * "`autoPostInternal`" - "`autoPostInvalidBillingAddress`" -
   * "`autoPostNoInventory`" - "`autoPostPriceError`" -
   * "`autoPostUndeliverableShippingAddress`" - "`couponAbuse`" -
   * "`courtesyAdjustment`" - "`customerCanceled`" -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`customerSupportRequested`" - "`deliveredLateByCarrier`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`failToPushOrderGoogleError`" -
   * "`failToPushOrderMerchantError`" -
   * "`failToPushOrderMerchantFulfillmentError`" - "`failToPushOrderToMerchant`"
   * - "`failToPushOrderToMerchantOutOfStock`" - "`feeAdjustment`" -
   * "`invalidCoupon`" - "`lateShipmentCredit`" - "`malformedShippingAddress`" -
   * "`merchantDidNotShipOnTime`" - "`noInventory`" - "`orderTimeout`" -
   * "`other`" - "`paymentAbuse`" - "`paymentDeclined`" - "`priceAdjustment`" -
   * "`priceError`" - "`productArrivedDamaged`" - "`productNotAsDescribed`" -
   * "`promoReallocation`" - "`qualityNotAsExpected`" - "`returnRefundAbuse`" -
   * "`shippingCostAdjustment`" - "`shippingPriceError`" - "`taxAdjustment`" -
   * "`taxError`" - "`undeliverableShippingAddress`" -
   * "`unsupportedPoBoxAddress`" - "`wrongProductShipped`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

/**
 * Order disbursement. All methods require the payment analyst role.
 */
export interface OrderReportDisbursement {
  /**
   * The disbursement amount.
   */
  disbursementAmount?: Price;
  /**
   * The disbursement date, in ISO 8601 format.
   */
  disbursementCreationDate?: string;
  /**
   * The date the disbursement was initiated, in ISO 8601 format.
   */
  disbursementDate?: string;
  /**
   * The ID of the disbursement.
   */
  disbursementId?: string;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
}

function serializeOrderReportDisbursement(data: any): OrderReportDisbursement {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeOrderReportDisbursement(data: any): OrderReportDisbursement {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * Additional options for Content#orderreportsListdisbursements.
 */
export interface OrderreportsListdisbursementsOptions {
  /**
   * The last date which disbursements occurred. In ISO 8601 format. Default:
   * current date.
   */
  disbursementEndDate?: string;
  /**
   * The first date which disbursements occurred. In ISO 8601 format.
   */
  disbursementStartDate?: string;
  /**
   * The maximum number of disbursements to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface OrderreportsListDisbursementsResponse {
  /**
   * The list of disbursements.
   */
  disbursements?: OrderReportDisbursement[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreportsListDisbursementsResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of disbursements.
   */
  nextPageToken?: string;
}

function serializeOrderreportsListDisbursementsResponse(data: any): OrderreportsListDisbursementsResponse {
  return {
    ...data,
    disbursements: data["disbursements"] !== undefined ? data["disbursements"].map((item: any) => (serializeOrderReportDisbursement(item))) : undefined,
  };
}

function deserializeOrderreportsListDisbursementsResponse(data: any): OrderreportsListDisbursementsResponse {
  return {
    ...data,
    disbursements: data["disbursements"] !== undefined ? data["disbursements"].map((item: any) => (deserializeOrderReportDisbursement(item))) : undefined,
  };
}

/**
 * Additional options for Content#orderreportsListtransactions.
 */
export interface OrderreportsListtransactionsOptions {
  /**
   * The maximum number of disbursements to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * The last date in which transaction occurred. In ISO 8601 format. Default:
   * current date.
   */
  transactionEndDate?: string;
  /**
   * The first date in which transaction occurred. In ISO 8601 format.
   */
  transactionStartDate?: string;
}

export interface OrderreportsListTransactionsResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreportsListTransactionsResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of transactions.
   */
  nextPageToken?: string;
  /**
   * The list of transactions.
   */
  transactions?: OrderReportTransaction[];
}

function serializeOrderreportsListTransactionsResponse(data: any): OrderreportsListTransactionsResponse {
  return {
    ...data,
    transactions: data["transactions"] !== undefined ? data["transactions"].map((item: any) => (serializeOrderReportTransaction(item))) : undefined,
  };
}

function deserializeOrderreportsListTransactionsResponse(data: any): OrderreportsListTransactionsResponse {
  return {
    ...data,
    transactions: data["transactions"] !== undefined ? data["transactions"].map((item: any) => (deserializeOrderReportTransaction(item))) : undefined,
  };
}

export interface OrderReportTransaction {
  /**
   * The disbursement amount.
   */
  disbursementAmount?: Price;
  /**
   * The date the disbursement was created, in ISO 8601 format.
   */
  disbursementCreationDate?: string;
  /**
   * The date the disbursement was initiated, in ISO 8601 format.
   */
  disbursementDate?: string;
  /**
   * The ID of the disbursement.
   */
  disbursementId?: string;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * Merchant-provided ID of the order.
   */
  merchantOrderId?: string;
  /**
   * The ID of the order.
   */
  orderId?: string;
  /**
   * Total amount for the items.
   */
  productAmount?: ProductAmount;
  /**
   * The date of the transaction, in ISO 8601 format.
   */
  transactionDate?: string;
}

function serializeOrderReportTransaction(data: any): OrderReportTransaction {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeOrderReportTransaction(data: any): OrderReportTransaction {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface OrderReturn {
  /**
   * The actor that created the refund. Acceptable values are: - "`customer`" -
   * "`googleBot`" - "`googleCustomerService`" - "`googlePayments`" -
   * "`googleSabre`" - "`merchant`"
   */
  actor?: string;
  /**
   * Date on which the item has been created, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * Quantity that is returned.
   */
  quantity?: number;
  /**
   * The reason for the return. Acceptable values are: -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`other`" - "`productArrivedDamaged`" -
   * "`productNotAsDescribed`" - "`qualityNotAsExpected`" -
   * "`undeliverableShippingAddress`" - "`unsupportedPoBoxAddress`" -
   * "`wrongProductShipped`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrderreturnsAcknowledgeRequest {
  /**
   * [required] The ID of the operation, unique across all operations for a
   * given order return.
   */
  operationId?: string;
}

export interface OrderreturnsAcknowledgeResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreturnsAcknowledgeResponse`".
   */
  kind?: string;
}

export interface OrderreturnsCreateOrderReturnRequest {
  /**
   * The list of line items to return.
   */
  lineItems?: OrderreturnsLineItem[];
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The ID of the order.
   */
  orderId?: string;
  /**
   * The way of the package being returned.
   */
  returnMethodType?: string;
}

export interface OrderreturnsCreateOrderReturnResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreturnsCreateOrderReturnResponse`".
   */
  kind?: string;
  /**
   * Created order return.
   */
  orderReturn?: MerchantOrderReturn;
}

export interface OrderreturnsLineItem {
  /**
   * The ID of the line item. This value is assigned by Google when an order is
   * created. Either lineItemId or productId is required.
   */
  lineItemId?: string;
  /**
   * The ID of the product to cancel. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity of this line item.
   */
  quantity?: number;
}

/**
 * Additional options for Content#orderreturnsList.
 */
export interface OrderreturnsListOptions {
  /**
   * Obtains order returns that match the acknowledgement status. When set to
   * true, obtains order returns that have been acknowledged. When false,
   * obtains order returns that have not been acknowledged. When not provided,
   * obtains order returns regardless of their acknowledgement status. We
   * recommend using this filter set to `false`, in conjunction with the
   * `acknowledge` call, such that only un-acknowledged order returns are
   * returned.
   */
  acknowledged?: boolean;
  /**
   * Obtains order returns created before this date (inclusively), in ISO 8601
   * format.
   */
  createdEndDate?: string;
  /**
   * Obtains order returns created after this date (inclusively), in ISO 8601
   * format.
   */
  createdStartDate?: string;
  /**
   * Obtains order returns with the specified order ids. If this parameter is
   * provided, createdStartDate, createdEndDate, shipmentType, shipmentStatus,
   * shipmentState and acknowledged parameters must be not set. Note: if
   * googleOrderId and shipmentTrackingNumber parameters are provided, the
   * obtained results will include all order returns that either match the
   * specified order id or the specified tracking number.
   */
  googleOrderIds?: string;
  /**
   * The maximum number of order returns to return in the response, used for
   * paging. The default value is 25 returns per page, and the maximum allowed
   * value is 250 returns per page.
   */
  maxResults?: number;
  /**
   * Return the results in the specified order.
   */
  orderBy?:  | "RETURN_CREATION_TIME_DESC" | "RETURN_CREATION_TIME_ASC";
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * Obtains order returns that match any shipment state provided in this
   * parameter. When this parameter is not provided, order returns are obtained
   * regardless of their shipment states.
   */
  shipmentStates?:  | "NEW" | "SHIPPED" | "COMPLETED" | "UNDELIVERABLE" | "PENDING";
  /**
   * Obtains order returns that match any shipment status provided in this
   * parameter. When this parameter is not provided, order returns are obtained
   * regardless of their shipment statuses.
   */
  shipmentStatus?:  | "NEW" | "IN_PROGRESS" | "PROCESSED";
  /**
   * Obtains order returns with the specified tracking numbers. If this
   * parameter is provided, createdStartDate, createdEndDate, shipmentType,
   * shipmentStatus, shipmentState and acknowledged parameters must be not set.
   * Note: if googleOrderId and shipmentTrackingNumber parameters are provided,
   * the obtained results will include all order returns that either match the
   * specified order id or the specified tracking number.
   */
  shipmentTrackingNumbers?: string;
  /**
   * Obtains order returns that match any shipment type provided in this
   * parameter. When this parameter is not provided, order returns are obtained
   * regardless of their shipment types.
   */
  shipmentTypes?:  | "BY_MAIL" | "RETURNLESS" | "CONTACT_CUSTOMER_SUPPORT";
}

export interface OrderreturnsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreturnsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of returns.
   */
  nextPageToken?: string;
  resources?: MerchantOrderReturn[];
}

export interface OrderreturnsPartialRefund {
  /**
   * The pre-tax or post-tax amount to be refunded, depending on the location
   * of the order.
   */
  priceAmount?: Price;
  /**
   * Tax amount to be refunded. Note: This has different meaning depending on
   * the location of the order.
   */
  taxAmount?: Price;
}

export interface OrderreturnsProcessRequest {
  /**
   * Option to charge the customer return shipping cost.
   */
  fullChargeReturnShippingCost?: boolean;
  /**
   * [required] The ID of the operation, unique across all operations for a
   * given order return.
   */
  operationId?: string;
  /**
   * Refunds for original shipping fee.
   */
  refundShippingFee?: OrderreturnsRefundOperation;
  /**
   * The list of items to return.
   */
  returnItems?: OrderreturnsReturnItem[];
}

export interface OrderreturnsProcessResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#orderreturnsProcessResponse`".
   */
  kind?: string;
}

export interface OrderreturnsRefundOperation {
  /**
   * If true, the item will be fully refunded. Allowed only when payment_type
   * is FOP. Merchant can choose this refund option to indicate the full
   * remaining amount of corresponding object to be refunded to the customer
   * through FOP.
   */
  fullRefund?: boolean;
  /**
   * If this is set, the item will be partially refunded. Merchant can choose
   * this refund option to specify the customized amount that to be refunded to
   * the customer.
   */
  partialRefund?: OrderreturnsPartialRefund;
  /**
   * The payment way of issuing refund. Default value is ORIGINAL_FOP if not
   * set.
   */
  paymentType?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
  /**
   * Code of the refund reason.
   */
  returnRefundReason?: string;
}

export interface OrderreturnsRejectOperation {
  /**
   * The reason for the return.
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrderreturnsReturnItem {
  /**
   * Refunds the item.
   */
  refund?: OrderreturnsRefundOperation;
  /**
   * Rejects the item.
   */
  reject?: OrderreturnsRejectOperation;
  /**
   * Unit level ID for the return item. Different units of the same product
   * will have different IDs.
   */
  returnItemId?: string;
}

export interface OrdersAcknowledgeRequest {
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
}

export interface OrdersAcknowledgeResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersAcknowledgeResponse`".
   */
  kind?: string;
}

export interface OrdersAdvanceTestOrderResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersAdvanceTestOrderResponse`".
   */
  kind?: string;
}

export interface OrdersCancelLineItemRequest {
  /**
   * The ID of the line item to cancel. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The ID of the product to cancel. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity to cancel.
   */
  quantity?: number;
  /**
   * The reason for the cancellation. Acceptable values are: -
   * "`customerInitiatedCancel`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`noInventory`" - "`other`" - "`priceError`"
   * - "`shippingPriceError`" - "`taxError`" - "`undeliverableShippingAddress`"
   * - "`unsupportedPoBoxAddress`" - "`failedToCaptureFunds`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrdersCancelLineItemResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersCancelLineItemResponse`".
   */
  kind?: string;
}

export interface OrdersCancelRequest {
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The reason for the cancellation. Acceptable values are: -
   * "`customerInitiatedCancel`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`noInventory`" - "`other`" - "`priceError`"
   * - "`shippingPriceError`" - "`taxError`" - "`undeliverableShippingAddress`"
   * - "`unsupportedPoBoxAddress`" - "`failedToCaptureFunds`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrdersCancelResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersCancelResponse`".
   */
  kind?: string;
}

export interface OrdersCancelTestOrderByCustomerRequest {
  /**
   * The reason for the cancellation. Acceptable values are: - "`changedMind`"
   * - "`orderedWrongItem`" - "`other`"
   */
  reason?: string;
}

export interface OrdersCancelTestOrderByCustomerResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersCancelTestOrderByCustomerResponse`".
   */
  kind?: string;
}

export interface OrdersCreateTestOrderRequest {
  /**
   * The CLDR territory code of the country of the test order to create.
   * Affects the currency and addresses of orders created through
   * `template_name`, or the addresses of orders created through `test_order`.
   * Acceptable values are: - "`US`" - "`FR`" Defaults to "`US`".
   */
  country?: string;
  /**
   * The test order template to use. Specify as an alternative to `testOrder`
   * as a shortcut for retrieving a template and then creating an order using
   * that template. Acceptable values are: - "`template1`" - "`template1a`" -
   * "`template1b`" - "`template2`" - "`template3`"
   */
  templateName?: string;
  /**
   * The test order to create.
   */
  testOrder?: TestOrder;
}

export interface OrdersCreateTestOrderResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersCreateTestOrderResponse`".
   */
  kind?: string;
  /**
   * The ID of the newly created test order.
   */
  orderId?: string;
}

export interface OrdersCreateTestReturnRequest {
  /**
   * Returned items.
   */
  items?: OrdersCustomBatchRequestEntryCreateTestReturnReturnItem[];
}

export interface OrdersCreateTestReturnResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersCreateTestReturnResponse`".
   */
  kind?: string;
  /**
   * The ID of the newly created test order return.
   */
  returnId?: string;
}

export interface OrdersCustomBatchRequestEntryCreateTestReturnReturnItem {
  /**
   * The ID of the line item to return.
   */
  lineItemId?: string;
  /**
   * Quantity that is returned.
   */
  quantity?: number;
}

export interface OrdersCustomBatchRequestEntryRefundItemItem {
  /**
   * The total amount that is refunded. (for example, refunding $5 each for 2
   * products should be done by setting quantity to 2 and amount to 10$) In case
   * of multiple refunds, this should be the amount you currently want to refund
   * to the customer.
   */
  amount?: MonetaryAmount;
  /**
   * If true, the full item will be refunded. If this is true, amount shouldn't
   * be provided and will be ignored.
   */
  fullRefund?: boolean;
  /**
   * The ID of the line item. Either lineItemId or productId is required.
   */
  lineItemId?: string;
  /**
   * The ID of the product. This is the REST ID used in the products service.
   * Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The number of products that are refunded.
   */
  quantity?: number;
}

export interface OrdersCustomBatchRequestEntryRefundItemShipping {
  /**
   * The amount that is refunded. If this is not the first refund for the
   * shipment, this should be the newly refunded amount.
   */
  amount?: Price;
  /**
   * If set to true, all shipping costs for the order will be refunded. If this
   * is true, amount shouldn't be provided and will be ignored. If set to false,
   * submit the amount of the partial shipping refund, excluding the shipping
   * tax. The shipping tax is calculated and handled on Google's side.
   */
  fullRefund?: boolean;
}

export interface OrdersCustomBatchRequestEntryShipLineItemsShipmentInfo {
  /**
   * The carrier handling the shipment. See `shipments[].carrier` in the Orders
   * resource representation for a list of acceptable values.
   */
  carrier?: string;
  /**
   * Required. The ID of the shipment. This is assigned by the merchant and is
   * unique to each shipment.
   */
  shipmentId?: string;
  /**
   * The tracking ID for the shipment.
   */
  trackingId?: string;
}

/**
 * ScheduledDeliveryDetails used to update the scheduled delivery order.
 */
export interface OrdersCustomBatchRequestEntryUpdateShipmentScheduledDeliveryDetails {
  /**
   * The phone number of the carrier fulfilling the delivery. The phone number
   * should be formatted as the international notation in
   */
  carrierPhoneNumber?: string;
  /**
   * The date a shipment is scheduled for delivery, in ISO 8601 format.
   */
  scheduledDate?: string;
}

export interface OrdersGetByMerchantOrderIdResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersGetByMerchantOrderIdResponse`".
   */
  kind?: string;
  /**
   * The requested order.
   */
  order?: Order;
}

function serializeOrdersGetByMerchantOrderIdResponse(data: any): OrdersGetByMerchantOrderIdResponse {
  return {
    ...data,
    order: data["order"] !== undefined ? serializeOrder(data["order"]) : undefined,
  };
}

function deserializeOrdersGetByMerchantOrderIdResponse(data: any): OrdersGetByMerchantOrderIdResponse {
  return {
    ...data,
    order: data["order"] !== undefined ? deserializeOrder(data["order"]) : undefined,
  };
}

/**
 * Additional options for Content#ordersGettestordertemplate.
 */
export interface OrdersGettestordertemplateOptions {
  /**
   * The country of the template to retrieve. Defaults to "`US`".
   */
  country?: string;
}

export interface OrdersGetTestOrderTemplateResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersGetTestOrderTemplateResponse`".
   */
  kind?: string;
  /**
   * The requested test order template.
   */
  template?: TestOrder;
}

export interface OrderShipment {
  /**
   * The carrier handling the shipment. For supported carriers, Google includes
   * the carrier name and tracking URL in emails to customers. For select
   * supported carriers, Google also automatically updates the shipment status
   * based on the provided shipment ID. *Note:* You can also use unsupported
   * carriers, but emails to customers won't include the carrier name or
   * tracking URL, and there will be no automatic order status updates.
   * Supported carriers for "US" are: - "`ups`" (United Parcel Service)
   * *automatic status updates* - "`usps`" (United States Postal Service)
   * *automatic status updates* - "`fedex`" (FedEx) *automatic status updates *
   * - "`dhl`" (DHL eCommerce) *automatic status updates* (US only) - "`ontrac`"
   * (OnTrac) *automatic status updates * - "`dhl express`" (DHL Express) -
   * "`deliv`" (Deliv) - "`dynamex`" (TForce) - "`lasership`" (LaserShip) -
   * "`mpx`" (Military Parcel Xpress) - "`uds`" (United Delivery Service) -
   * "`efw`" (Estes Forwarding Worldwide) - "`jd logistics`" (JD Logistics) -
   * "`yunexpress`" (YunExpress) - "`china post`" (China Post) - "`china ems`"
   * (China Post Express Mail Service) - "`singapore post`" (Singapore Post) -
   * "`pos malaysia`" (Pos Malaysia) - "`postnl`" (PostNL) - "`ptt`" (PTT
   * Turkish Post) - "`eub`" (ePacket) - "`chukou1`" (Chukou1 Logistics) -
   * "`bestex`" (Best Express) - "`canada post`" (Canada Post) - "`purolator`"
   * (Purolator) - "`canpar`" (Canpar) - "`india post`" (India Post) - "`blue
   * dart`" (Blue Dart) - "`delhivery`" (Delhivery) - "`dtdc`" (DTDC) - "`tpc
   * india`" (TPC India) - "`lso`" (Lone Star Overnight) - "`tww`" (Team
   * Worldwide) - "`deliver-it`" (Deliver-IT) - "`cdl last mile`" (CDL Last
   * Mile) Supported carriers for FR are: - "`la poste`" (La Poste) *automatic
   * status updates * - "`colissimo`" (Colissimo by La Poste) *automatic status
   * updates* - "`ups`" (United Parcel Service) *automatic status updates * -
   * "`chronopost`" (Chronopost by La Poste) - "`gls`" (General Logistics
   * Systems France) - "`dpd`" (DPD Group by GeoPost) - "`bpost`" (Belgian Post
   * Group) - "`colis prive`" (Colis Privé) - "`boxtal`" (Boxtal) - "`geodis`"
   * (GEODIS) - "`tnt`" (TNT) - "`db schenker`" (DB Schenker) - "`aramex`"
   * (Aramex)
   */
  carrier?: string;
  /**
   * Date on which the shipment has been created, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * Date on which the shipment has been delivered, in ISO 8601 format. Present
   * only if `status` is `delivered`
   */
  deliveryDate?: string;
  /**
   * The ID of the shipment.
   */
  id?: string;
  /**
   * The line items that are shipped.
   */
  lineItems?: OrderShipmentLineItemShipment[];
  /**
   * Delivery details of the shipment if scheduling is needed.
   */
  scheduledDeliveryDetails?: OrderShipmentScheduledDeliveryDetails;
  /**
   * The shipment group ID of the shipment. This is set in shiplineitems
   * request.
   */
  shipmentGroupId?: string;
  /**
   * The status of the shipment. Acceptable values are: - "`delivered`" -
   * "`readyForPickup`" - "`shipped`" - "`undeliverable`"
   */
  status?: string;
  /**
   * The tracking ID for the shipment.
   */
  trackingId?: string;
}

export interface OrderShipmentLineItemShipment {
  /**
   * The ID of the line item that is shipped. This value is assigned by Google
   * when an order is created. Either lineItemId or productId is required.
   */
  lineItemId?: string;
  /**
   * The ID of the product to ship. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity that is shipped.
   */
  quantity?: number;
}

export interface OrderShipmentScheduledDeliveryDetails {
  /**
   * The phone number of the carrier fulfilling the delivery. The phone number
   * is formatted as the international notation in ITU-T Recommendation E.123
   * (for example, "+41 44 668 1800").
   */
  carrierPhoneNumber?: string;
  /**
   * The date a shipment is scheduled for delivery, in ISO 8601 format.
   */
  scheduledDate?: string;
}

export interface OrdersInStoreRefundLineItemRequest {
  /**
   * The ID of the line item to return. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The amount to be refunded. This may be pre-tax or post-tax depending on
   * the location of the order. Required.
   */
  priceAmount?: Price;
  /**
   * The ID of the product to return. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity to return and refund.
   */
  quantity?: number;
  /**
   * The reason for the return. Acceptable values are: -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`other`" - "`productArrivedDamaged`" -
   * "`productNotAsDescribed`" - "`qualityNotAsExpected`" -
   * "`undeliverableShippingAddress`" - "`unsupportedPoBoxAddress`" -
   * "`wrongProductShipped`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
  /**
   * The amount of tax to be refunded. Required.
   */
  taxAmount?: Price;
}

export interface OrdersInStoreRefundLineItemResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersInStoreRefundLineItemResponse`".
   */
  kind?: string;
}

/**
 * Additional options for Content#ordersList.
 */
export interface OrdersListOptions {
  /**
   * Obtains orders that match the acknowledgement status. When set to true,
   * obtains orders that have been acknowledged. When false, obtains orders that
   * have not been acknowledged. We recommend using this filter set to `false`,
   * in conjunction with the `acknowledge` call, such that only un-acknowledged
   * orders are returned.
   */
  acknowledged?: boolean;
  /**
   * The maximum number of orders to return in the response, used for paging.
   * The default value is 25 orders per page, and the maximum allowed value is
   * 250 orders per page.
   */
  maxResults?: number;
  /**
   * Order results by placement date in descending or ascending order.
   * Acceptable values are: - placedDateAsc - placedDateDesc
   */
  orderBy?: string;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * Obtains orders placed before this date (exclusively), in ISO 8601 format.
   */
  placedDateEnd?: string;
  /**
   * Obtains orders placed after this date (inclusively), in ISO 8601 format.
   */
  placedDateStart?: string;
  /**
   * Obtains orders that match any of the specified statuses. Note that
   * `active` is a shortcut for `pendingShipment` and `partiallyShipped`, and
   * `completed` is a shortcut for `shipped`, `partiallyDelivered`, `delivered`,
   * `partiallyReturned`, `returned`, and `canceled`.
   */
  statuses?:  | "ACTIVE" | "COMPLETED" | "CANCELED" | "IN_PROGRESS" | "PENDING_SHIPMENT" | "PARTIALLY_SHIPPED" | "SHIPPED" | "PARTIALLY_DELIVERED" | "DELIVERED" | "PARTIALLY_RETURNED" | "RETURNED";
}

export interface OrdersListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of orders.
   */
  nextPageToken?: string;
  resources?: Order[];
}

function serializeOrdersListResponse(data: any): OrdersListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeOrder(item))) : undefined,
  };
}

function deserializeOrdersListResponse(data: any): OrdersListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeOrder(item))) : undefined,
  };
}

export interface OrdersRefundItemRequest {
  /**
   * The items that are refunded. Either Item or Shipping must be provided in
   * the request.
   */
  items?: OrdersCustomBatchRequestEntryRefundItemItem[];
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The reason for the refund. Acceptable values are: -
   * "`shippingCostAdjustment`" - "`priceAdjustment`" - "`taxAdjustment`" -
   * "`feeAdjustment`" - "`courtesyAdjustment`" - "`adjustment`" -
   * "`customerCancelled`" - "`noInventory`" - "`productNotAsDescribed`" -
   * "`undeliverableShippingAddress`" - "`wrongProductShipped`" -
   * "`lateShipmentCredit`" - "`deliveredLateByCarrier`" -
   * "`productArrivedDamaged`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
  /**
   * The refund on shipping. Optional, but either Item or Shipping must be
   * provided in the request.
   */
  shipping?: OrdersCustomBatchRequestEntryRefundItemShipping;
}

export interface OrdersRefundItemResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersRefundItemResponse`".
   */
  kind?: string;
}

export interface OrdersRefundOrderRequest {
  /**
   * The amount that is refunded. If this is not the first refund for the
   * order, this should be the newly refunded amount.
   */
  amount?: MonetaryAmount;
  /**
   * If true, the full order will be refunded, including shipping. If this is
   * true, amount shouldn't be provided and will be ignored.
   */
  fullRefund?: boolean;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The reason for the refund. Acceptable values are: - "`courtesyAdjustment`"
   * - "`other`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrdersRefundOrderResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersRefundOrderResponse`".
   */
  kind?: string;
}

export interface OrdersRejectReturnLineItemRequest {
  /**
   * The ID of the line item to return. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The ID of the product to return. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity to return and refund.
   */
  quantity?: number;
  /**
   * The reason for the return. Acceptable values are: - "`damagedOrUsed`" -
   * "`missingComponent`" - "`notEligible`" - "`other`" - "`outOfReturnWindow`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
}

export interface OrdersRejectReturnLineItemResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersRejectReturnLineItemResponse`".
   */
  kind?: string;
}

export interface OrdersReturnRefundLineItemRequest {
  /**
   * The ID of the line item to return. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The amount to be refunded. This may be pre-tax or post-tax depending on
   * the location of the order. If omitted, refundless return is assumed.
   */
  priceAmount?: Price;
  /**
   * The ID of the product to return. This is the REST ID used in the products
   * service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * The quantity to return and refund. Quantity is required.
   */
  quantity?: number;
  /**
   * The reason for the return. Acceptable values are: -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`invalidCoupon`" -
   * "`malformedShippingAddress`" - "`other`" - "`productArrivedDamaged`" -
   * "`productNotAsDescribed`" - "`qualityNotAsExpected`" -
   * "`undeliverableShippingAddress`" - "`unsupportedPoBoxAddress`" -
   * "`wrongProductShipped`"
   */
  reason?: string;
  /**
   * The explanation of the reason.
   */
  reasonText?: string;
  /**
   * The amount of tax to be refunded. Optional, but if filled, then
   * priceAmount must be set. Calculated automatically if not provided.
   */
  taxAmount?: Price;
}

export interface OrdersReturnRefundLineItemResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersReturnRefundLineItemResponse`".
   */
  kind?: string;
}

export interface OrdersSetLineItemMetadataRequest {
  annotations?: OrderMerchantProvidedAnnotation[];
  /**
   * The ID of the line item to set metadata. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The ID of the product to set metadata. This is the REST ID used in the
   * products service. Either lineItemId or productId is required.
   */
  productId?: string;
}

export interface OrdersSetLineItemMetadataResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersSetLineItemMetadataResponse`".
   */
  kind?: string;
}

export interface OrdersShipLineItemsRequest {
  /**
   * Line items to ship.
   */
  lineItems?: OrderShipmentLineItemShipment[];
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * ID of the shipment group. Required for orders that use the orderinvoices
   * service.
   */
  shipmentGroupId?: string;
  /**
   * Shipment information. This field is repeated because a single line item
   * can be shipped in several packages (and have several tracking IDs).
   */
  shipmentInfos?: OrdersCustomBatchRequestEntryShipLineItemsShipmentInfo[];
}

export interface OrdersShipLineItemsResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersShipLineItemsResponse`".
   */
  kind?: string;
}

export interface OrdersUpdateLineItemShippingDetailsRequest {
  /**
   * Updated delivery by date, in ISO 8601 format. If not specified only ship
   * by date is updated. Provided date should be within 1 year timeframe and
   * can't be a date in the past.
   */
  deliverByDate?: string;
  /**
   * The ID of the line item to set metadata. Either lineItemId or productId is
   * required.
   */
  lineItemId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * The ID of the product to set metadata. This is the REST ID used in the
   * products service. Either lineItemId or productId is required.
   */
  productId?: string;
  /**
   * Updated ship by date, in ISO 8601 format. If not specified only deliver by
   * date is updated. Provided date should be within 1 year timeframe and can't
   * be a date in the past.
   */
  shipByDate?: string;
}

export interface OrdersUpdateLineItemShippingDetailsResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersUpdateLineItemShippingDetailsResponse`".
   */
  kind?: string;
}

export interface OrdersUpdateMerchantOrderIdRequest {
  /**
   * The merchant order id to be assigned to the order. Must be unique per
   * merchant.
   */
  merchantOrderId?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
}

export interface OrdersUpdateMerchantOrderIdResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersUpdateMerchantOrderIdResponse`".
   */
  kind?: string;
}

export interface OrdersUpdateShipmentRequest {
  /**
   * The carrier handling the shipment. Not updated if missing. See
   * `shipments[].carrier` in the Orders resource representation for a list of
   * acceptable values.
   */
  carrier?: string;
  /**
   * Date on which the shipment has been delivered, in ISO 8601 format.
   * Optional and can be provided only if `status` is `delivered`.
   */
  deliveryDate?: string;
  /**
   * Date after which the pickup will expire, in ISO 8601 format. Required only
   * when order is buy-online-pickup-in-store(BOPIS) and `status` is `ready for
   * pickup`.
   */
  lastPickupDate?: string;
  /**
   * The ID of the operation. Unique across all operations for a given order.
   */
  operationId?: string;
  /**
   * Date on which the shipment has been ready for pickup, in ISO 8601 format.
   * Optional and can be provided only if `status` is `ready for pickup`.
   */
  readyPickupDate?: string;
  /**
   * Delivery details of the shipment if scheduling is needed.
   */
  scheduledDeliveryDetails?: OrdersCustomBatchRequestEntryUpdateShipmentScheduledDeliveryDetails;
  /**
   * The ID of the shipment.
   */
  shipmentId?: string;
  /**
   * New status for the shipment. Not updated if missing. Acceptable values
   * are: - "`delivered`" - "`undeliverable`" - "`readyForPickup`"
   */
  status?: string;
  /**
   * The tracking ID for the shipment. Not updated if missing.
   */
  trackingId?: string;
  /**
   * Date on which the shipment has been undeliverable, in ISO 8601 format.
   * Optional and can be provided only if `status` is `undeliverable`.
   */
  undeliveredDate?: string;
}

export interface OrdersUpdateShipmentResponse {
  /**
   * The status of the execution. Acceptable values are: - "`duplicate`" -
   * "`executed`"
   */
  executionStatus?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#ordersUpdateShipmentResponse`".
   */
  kind?: string;
}

/**
 * Represents a merchant trade from which signals are extracted, e.g. shipping.
 */
export interface OrderTrackingSignal {
  /**
   * The shipping fee of the order; this value should be set to zero in the
   * case of free shipping.
   */
  customerShippingFee?: PriceAmount;
  /**
   * Required. The delivery postal code, as a continuous string without spaces
   * or dashes, e.g. "95016". This field will be anonymized in returned
   * OrderTrackingSignal creation response.
   */
  deliveryPostalCode?: string;
  /**
   * Required. The [CLDR territory code]
   * (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the
   * shipping destination.
   */
  deliveryRegionCode?: string;
  /**
   * Information about line items in the order.
   */
  lineItems?: OrderTrackingSignalLineItemDetails[];
  /**
   * The Google merchant ID of this order tracking signal. This value is
   * optional. If left unset, the caller's merchant ID is used. You must request
   * access in order to provide data on behalf of another merchant. For more
   * information, see [Submitting Order Tracking
   * Signals](/shopping-content/guides/order-tracking-signals).
   */
  merchantId?: bigint;
  /**
   * Required. The time when the order was created on the merchant side.
   * Include the year and timezone string, if available.
   */
  orderCreatedTime?: DateTime;
  /**
   * Required. The ID of the order on the merchant side. This field will be
   * hashed in returned OrderTrackingSignal creation response.
   */
  orderId?: string;
  /**
   * Output only. The ID that uniquely identifies this order tracking signal.
   */
  readonly orderTrackingSignalId?: bigint;
  /**
   * The mapping of the line items to the shipment information.
   */
  shipmentLineItemMapping?: OrderTrackingSignalShipmentLineItemMapping[];
  /**
   * The shipping information for the order.
   */
  shippingInfo?: OrderTrackingSignalShippingInfo[];
}

function serializeOrderTrackingSignal(data: any): OrderTrackingSignal {
  return {
    ...data,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (serializeOrderTrackingSignalLineItemDetails(item))) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    orderCreatedTime: data["orderCreatedTime"] !== undefined ? serializeDateTime(data["orderCreatedTime"]) : undefined,
    shipmentLineItemMapping: data["shipmentLineItemMapping"] !== undefined ? data["shipmentLineItemMapping"].map((item: any) => (serializeOrderTrackingSignalShipmentLineItemMapping(item))) : undefined,
    shippingInfo: data["shippingInfo"] !== undefined ? data["shippingInfo"].map((item: any) => (serializeOrderTrackingSignalShippingInfo(item))) : undefined,
  };
}

function deserializeOrderTrackingSignal(data: any): OrderTrackingSignal {
  return {
    ...data,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (deserializeOrderTrackingSignalLineItemDetails(item))) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    orderCreatedTime: data["orderCreatedTime"] !== undefined ? deserializeDateTime(data["orderCreatedTime"]) : undefined,
    orderTrackingSignalId: data["orderTrackingSignalId"] !== undefined ? BigInt(data["orderTrackingSignalId"]) : undefined,
    shipmentLineItemMapping: data["shipmentLineItemMapping"] !== undefined ? data["shipmentLineItemMapping"].map((item: any) => (deserializeOrderTrackingSignalShipmentLineItemMapping(item))) : undefined,
    shippingInfo: data["shippingInfo"] !== undefined ? data["shippingInfo"].map((item: any) => (deserializeOrderTrackingSignalShippingInfo(item))) : undefined,
  };
}

/**
 * The line items of the order.
 */
export interface OrderTrackingSignalLineItemDetails {
  /**
   * Brand of the product.
   */
  brand?: string;
  /**
   * The Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. The ID for this line item.
   */
  lineItemId?: string;
  /**
   * The manufacturer part number.
   */
  mpn?: string;
  /**
   * Plain text description of this product (deprecated: Please use
   * product_title instead).
   */
  productDescription?: string;
  /**
   * Required. The Content API REST ID of the product, in the form
   * channel:contentLanguage:targetCountry:offerId.
   */
  productId?: string;
  /**
   * Plain text title of this product.
   */
  productTitle?: string;
  /**
   * The quantity of the line item in the order.
   */
  quantity?: bigint;
  /**
   * Merchant SKU for this item (deprecated).
   */
  sku?: string;
  /**
   * Universal product code for this item (deprecated: Please use GTIN
   * instead).
   */
  upc?: string;
}

function serializeOrderTrackingSignalLineItemDetails(data: any): OrderTrackingSignalLineItemDetails {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializeOrderTrackingSignalLineItemDetails(data: any): OrderTrackingSignalLineItemDetails {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

/**
 * Represents how many items are in the shipment for the given shipment_id and
 * line_item_id.
 */
export interface OrderTrackingSignalShipmentLineItemMapping {
  /**
   * Required. The line item ID.
   */
  lineItemId?: string;
  /**
   * The line item quantity in the shipment.
   */
  quantity?: bigint;
  /**
   * Required. The shipment ID. This field will be hashed in returned
   * OrderTrackingSignal creation response.
   */
  shipmentId?: string;
}

function serializeOrderTrackingSignalShipmentLineItemMapping(data: any): OrderTrackingSignalShipmentLineItemMapping {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializeOrderTrackingSignalShipmentLineItemMapping(data: any): OrderTrackingSignalShipmentLineItemMapping {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

/**
 * The shipping information for the order.
 */
export interface OrderTrackingSignalShippingInfo {
  /**
   * The time when the shipment was actually delivered. Include the year and
   * timezone string, if available. This field is required, if one of the
   * following fields is absent: tracking_id or carrier_name.
   */
  actualDeliveryTime?: DateTime;
  /**
   * The name of the shipping carrier for the delivery. This field is required
   * if one of the following fields is absent: earliest_delivery_promise_time,
   * latest_delivery_promise_time, and actual_delivery_time.
   */
  carrierName?: string;
  /**
   * The service type for fulfillment, e.g., GROUND, FIRST_CLASS, etc.
   */
  carrierServiceName?: string;
  /**
   * The earliest delivery promised time. Include the year and timezone string,
   * if available. This field is required, if one of the following fields is
   * absent: tracking_id or carrier_name.
   */
  earliestDeliveryPromiseTime?: DateTime;
  /**
   * The latest delivery promised time. Include the year and timezone string,
   * if available. This field is required, if one of the following fields is
   * absent: tracking_id or carrier_name.
   */
  latestDeliveryPromiseTime?: DateTime;
  /**
   * The origin postal code, as a continuous string without spaces or dashes,
   * e.g. "95016". This field will be anonymized in returned OrderTrackingSignal
   * creation response.
   */
  originPostalCode?: string;
  /**
   * The [CLDR territory code]
   * (http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) for the
   * shipping origin.
   */
  originRegionCode?: string;
  /**
   * Required. The shipment ID. This field will be hashed in returned
   * OrderTrackingSignal creation response.
   */
  shipmentId?: string;
  /**
   * The time when the shipment was shipped. Include the year and timezone
   * string, if available.
   */
  shippedTime?: DateTime;
  /**
   * The status of the shipment.
   */
  shippingStatus?:  | "SHIPPING_STATE_UNSPECIFIED" | "SHIPPED" | "DELIVERED";
  /**
   * The tracking ID of the shipment. This field is required if one of the
   * following fields is absent: earliest_delivery_promise_time,
   * latest_delivery_promise_time, and actual_delivery_time.
   */
  trackingId?: string;
}

function serializeOrderTrackingSignalShippingInfo(data: any): OrderTrackingSignalShippingInfo {
  return {
    ...data,
    actualDeliveryTime: data["actualDeliveryTime"] !== undefined ? serializeDateTime(data["actualDeliveryTime"]) : undefined,
    earliestDeliveryPromiseTime: data["earliestDeliveryPromiseTime"] !== undefined ? serializeDateTime(data["earliestDeliveryPromiseTime"]) : undefined,
    latestDeliveryPromiseTime: data["latestDeliveryPromiseTime"] !== undefined ? serializeDateTime(data["latestDeliveryPromiseTime"]) : undefined,
    shippedTime: data["shippedTime"] !== undefined ? serializeDateTime(data["shippedTime"]) : undefined,
  };
}

function deserializeOrderTrackingSignalShippingInfo(data: any): OrderTrackingSignalShippingInfo {
  return {
    ...data,
    actualDeliveryTime: data["actualDeliveryTime"] !== undefined ? deserializeDateTime(data["actualDeliveryTime"]) : undefined,
    earliestDeliveryPromiseTime: data["earliestDeliveryPromiseTime"] !== undefined ? deserializeDateTime(data["earliestDeliveryPromiseTime"]) : undefined,
    latestDeliveryPromiseTime: data["latestDeliveryPromiseTime"] !== undefined ? deserializeDateTime(data["latestDeliveryPromiseTime"]) : undefined,
    shippedTime: data["shippedTime"] !== undefined ? deserializeDateTime(data["shippedTime"]) : undefined,
  };
}

/**
 * Request message for the PauseProgram method.
 */
export interface PauseBuyOnGoogleProgramRequest {
}

/**
 * Additional information required for PAYMENT_SERVICE_PROVIDER link type.
 */
export interface PaymentServiceProviderLinkInfo {
  /**
   * The business country of the merchant account as identified by the third
   * party service provider.
   */
  externalAccountBusinessCountry?: string;
  /**
   * The id used by the third party service provider to identify the merchant.
   */
  externalAccountId?: string;
}

export interface PickupCarrierService {
  /**
   * The name of the pickup carrier (for example, `"UPS"`). Required.
   */
  carrierName?: string;
  /**
   * The name of the pickup service (for example, `"Access point"`). Required.
   */
  serviceName?: string;
}

export interface PickupServicesPickupService {
  /**
   * The name of the carrier (for example, `"UPS"`). Always present.
   */
  carrierName?: string;
  /**
   * The CLDR country code of the carrier (for example, "US"). Always present.
   */
  country?: string;
  /**
   * The name of the pickup service (for example, `"Access point"`). Always
   * present.
   */
  serviceName?: string;
}

export interface PosCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: PosCustomBatchRequestEntry[];
}

function serializePosCustomBatchRequest(data: any): PosCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializePosCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializePosCustomBatchRequest(data: any): PosCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializePosCustomBatchRequestEntry(item))) : undefined,
  };
}

export interface PosCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The inventory to submit. This should be set only if the method is
   * `inventory`.
   */
  inventory?: PosInventory;
  /**
   * The ID of the POS data provider.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`delete`" -
   * "`get`" - "`insert`" - "`inventory`" - "`sale`"
   */
  method?: string;
  /**
   * The sale information to submit. This should be set only if the method is
   * `sale`.
   */
  sale?: PosSale;
  /**
   * The store information to submit. This should be set only if the method is
   * `insert`.
   */
  store?: PosStore;
  /**
   * The store code. This should be set only if the method is `delete` or
   * `get`.
   */
  storeCode?: string;
  /**
   * The ID of the account for which to get/submit data.
   */
  targetMerchantId?: bigint;
}

function serializePosCustomBatchRequestEntry(data: any): PosCustomBatchRequestEntry {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? serializePosInventory(data["inventory"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    sale: data["sale"] !== undefined ? serializePosSale(data["sale"]) : undefined,
    targetMerchantId: data["targetMerchantId"] !== undefined ? String(data["targetMerchantId"]) : undefined,
  };
}

function deserializePosCustomBatchRequestEntry(data: any): PosCustomBatchRequestEntry {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? deserializePosInventory(data["inventory"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    sale: data["sale"] !== undefined ? deserializePosSale(data["sale"]) : undefined,
    targetMerchantId: data["targetMerchantId"] !== undefined ? BigInt(data["targetMerchantId"]) : undefined,
  };
}

export interface PosCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: PosCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posCustomBatchResponse`".
   */
  kind?: string;
}

function serializePosCustomBatchResponse(data: any): PosCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializePosCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializePosCustomBatchResponse(data: any): PosCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializePosCustomBatchResponseEntry(item))) : undefined,
  };
}

export interface PosCustomBatchResponseEntry {
  /**
   * The ID of the request entry to which this entry responds.
   */
  batchId?: number;
  /**
   * A list of errors defined if, and only if, the request failed.
   */
  errors?: Errors;
  /**
   * The updated inventory information.
   */
  inventory?: PosInventory;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The updated sale information.
   */
  sale?: PosSale;
  /**
   * The retrieved or updated store information.
   */
  store?: PosStore;
}

function serializePosCustomBatchResponseEntry(data: any): PosCustomBatchResponseEntry {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? serializePosInventory(data["inventory"]) : undefined,
    sale: data["sale"] !== undefined ? serializePosSale(data["sale"]) : undefined,
  };
}

function deserializePosCustomBatchResponseEntry(data: any): PosCustomBatchResponseEntry {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? deserializePosInventory(data["inventory"]) : undefined,
    sale: data["sale"] !== undefined ? deserializePosSale(data["sale"]) : undefined,
  };
}

export interface PosDataProviders {
  /**
   * Country code.
   */
  country?: string;
  /**
   * A list of POS data providers.
   */
  posDataProviders?: PosDataProvidersPosDataProvider[];
}

function serializePosDataProviders(data: any): PosDataProviders {
  return {
    ...data,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (serializePosDataProvidersPosDataProvider(item))) : undefined,
  };
}

function deserializePosDataProviders(data: any): PosDataProviders {
  return {
    ...data,
    posDataProviders: data["posDataProviders"] !== undefined ? data["posDataProviders"].map((item: any) => (deserializePosDataProvidersPosDataProvider(item))) : undefined,
  };
}

export interface PosDataProvidersPosDataProvider {
  /**
   * The display name of Pos data Provider.
   */
  displayName?: string;
  /**
   * The full name of this POS data Provider.
   */
  fullName?: string;
  /**
   * The ID of the account.
   */
  providerId?: bigint;
}

function serializePosDataProvidersPosDataProvider(data: any): PosDataProvidersPosDataProvider {
  return {
    ...data,
    providerId: data["providerId"] !== undefined ? String(data["providerId"]) : undefined,
  };
}

function deserializePosDataProvidersPosDataProvider(data: any): PosDataProvidersPosDataProvider {
  return {
    ...data,
    providerId: data["providerId"] !== undefined ? BigInt(data["providerId"]) : undefined,
  };
}

/**
 * The absolute quantity of an item available at the given store.
 */
export interface PosInventory {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posInventory`"
   */
  kind?: string;
  /**
   * Required. The current price of the item.
   */
  price?: Price;
  /**
   * Required. The available quantity of the item.
   */
  quantity?: bigint;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosInventory(data: any): PosInventory {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosInventory(data: any): PosInventory {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

export interface PosInventoryRequest {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Required. The current price of the item.
   */
  price?: Price;
  /**
   * Required. The available quantity of the item.
   */
  quantity?: bigint;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosInventoryRequest(data: any): PosInventoryRequest {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosInventoryRequest(data: any): PosInventoryRequest {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

export interface PosInventoryResponse {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posInventoryResponse`".
   */
  kind?: string;
  /**
   * Required. The current price of the item.
   */
  price?: Price;
  /**
   * Required. The available quantity of the item.
   */
  quantity?: bigint;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosInventoryResponse(data: any): PosInventoryResponse {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosInventoryResponse(data: any): PosInventoryResponse {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

export interface PosListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posListResponse`".
   */
  kind?: string;
  resources?: PosStore[];
}

/**
 * The change of the available quantity of an item at the given store.
 */
export interface PosSale {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posSale`"
   */
  kind?: string;
  /**
   * Required. The price of the item.
   */
  price?: Price;
  /**
   * Required. The relative change of the available quantity. Negative for
   * items returned.
   */
  quantity?: bigint;
  /**
   * A unique ID to group items from the same sale event.
   */
  saleId?: string;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosSale(data: any): PosSale {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosSale(data: any): PosSale {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

export interface PosSaleRequest {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Required. The price of the item.
   */
  price?: Price;
  /**
   * Required. The relative change of the available quantity. Negative for
   * items returned.
   */
  quantity?: bigint;
  /**
   * A unique ID to group items from the same sale event.
   */
  saleId?: string;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosSaleRequest(data: any): PosSaleRequest {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosSaleRequest(data: any): PosSaleRequest {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

export interface PosSaleResponse {
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Global Trade Item Number.
   */
  gtin?: string;
  /**
   * Required. A unique identifier for the item.
   */
  itemId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posSaleResponse`".
   */
  kind?: string;
  /**
   * Required. The price of the item.
   */
  price?: Price;
  /**
   * Required. The relative change of the available quantity. Negative for
   * items returned.
   */
  quantity?: bigint;
  /**
   * A unique ID to group items from the same sale event.
   */
  saleId?: string;
  /**
   * Required. The identifier of the merchant's store. Either a `storeCode`
   * inserted through the API or the code of the store in a Business Profile.
   */
  storeCode?: string;
  /**
   * Required. The CLDR territory code for the item.
   */
  targetCountry?: string;
  /**
   * Required. The inventory timestamp, in ISO 8601 format.
   */
  timestamp?: string;
}

function serializePosSaleResponse(data: any): PosSaleResponse {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializePosSaleResponse(data: any): PosSaleResponse {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

/**
 * Store resource.
 */
export interface PosStore {
  /**
   * The business type of the store.
   */
  gcidCategory?: string[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#posStore`"
   */
  kind?: string;
  /**
   * The store phone number.
   */
  phoneNumber?: string;
  /**
   * The Google Place Id of the store location.
   */
  placeId?: string;
  /**
   * Required. The street address of the store.
   */
  storeAddress?: string;
  /**
   * Required. A store identifier that is unique for the given merchant.
   */
  storeCode?: string;
  /**
   * The merchant or store name.
   */
  storeName?: string;
  /**
   * The website url for the store or merchant.
   */
  websiteUrl?: string;
}

export interface PostalCodeGroup {
  /**
   * The CLDR territory code of the country the postal code group applies to.
   * Required.
   */
  country?: string;
  /**
   * The name of the postal code group, referred to in headers. Required.
   */
  name?: string;
  /**
   * A range of postal codes. Required.
   */
  postalCodeRanges?: PostalCodeRange[];
}

export interface PostalCodeRange {
  /**
   * A postal code or a pattern of the form `prefix*` denoting the inclusive
   * lower bound of the range defining the area. Examples values: `"94108"`,
   * `"9410*"`, `"9*"`. Required.
   */
  postalCodeRangeBegin?: string;
  /**
   * A postal code or a pattern of the form `prefix*` denoting the inclusive
   * upper bound of the range defining the area. It must have the same length as
   * `postalCodeRangeBegin`: if `postalCodeRangeBegin` is a postal code then
   * `postalCodeRangeEnd` must be a postal code too; if `postalCodeRangeBegin`
   * is a pattern then `postalCodeRangeEnd` must be a pattern with the same
   * prefix length. Optional: if not set, then the area is defined as being all
   * the postal codes matching `postalCodeRangeBegin`.
   */
  postalCodeRangeEnd?: string;
}

export interface Price {
  /**
   * The currency of the price.
   */
  currency?: string;
  /**
   * The price represented as a number.
   */
  value?: string;
}

/**
 * The price represented as a number and currency.
 */
export interface PriceAmount {
  /**
   * The currency of the price.
   */
  currency?: string;
  /**
   * The price represented as a number.
   */
  value?: string;
}

/**
 * Price competitiveness fields requested by the merchant in the query. Field
 * values are only set if the merchant queries
 * `PriceCompetitivenessProductView`.
 * https://support.google.com/merchants/answer/9626903
 */
export interface PriceCompetitiveness {
  /**
   * The price benchmark currency (ISO 4217 code).
   */
  benchmarkPriceCurrencyCode?: string;
  /**
   * The latest available price benchmark in micros (1 millionth of a standard
   * unit, 1 USD = 1000000 micros) for the product's catalog in the benchmark
   * country.
   */
  benchmarkPriceMicros?: bigint;
  /**
   * The country of the price benchmark (ISO 3166 code).
   */
  countryCode?: string;
}

function serializePriceCompetitiveness(data: any): PriceCompetitiveness {
  return {
    ...data,
    benchmarkPriceMicros: data["benchmarkPriceMicros"] !== undefined ? String(data["benchmarkPriceMicros"]) : undefined,
  };
}

function deserializePriceCompetitiveness(data: any): PriceCompetitiveness {
  return {
    ...data,
    benchmarkPriceMicros: data["benchmarkPriceMicros"] !== undefined ? BigInt(data["benchmarkPriceMicros"]) : undefined,
  };
}

/**
 * Price insights fields requested by the merchant in the query. Field values
 * are only set if the merchant queries `PriceInsightsProductView`.
 * https://support.google.com/merchants/answer/11916926
 */
export interface PriceInsights {
  /**
   * The predicted change in clicks as a fraction after introducing the
   * suggested price compared to current active price. For example, 0.05 is a 5%
   * predicted increase in clicks.
   */
  predictedClicksChangeFraction?: number;
  /**
   * The predicted change in conversions as a fraction after introducing the
   * suggested price compared to current active price. For example, 0.05 is a 5%
   * predicted increase in conversions).
   */
  predictedConversionsChangeFraction?: number;
  /**
   * The predicted change in gross profit as a fraction after introducing the
   * suggested price compared to current active price. For example, 0.05 is a 5%
   * predicted increase in gross profit.
   */
  predictedGrossProfitChangeFraction?: number;
  /**
   * The predicted change in impressions as a fraction after introducing the
   * suggested price compared to current active price. For example, 0.05 is a 5%
   * predicted increase in impressions.
   */
  predictedImpressionsChangeFraction?: number;
  /**
   * The predicted monthly gross profit change currency (ISO 4217 code).
   */
  predictedMonthlyGrossProfitChangeCurrencyCode?: string;
  /**
   * The predicted change in gross profit in micros (1 millionth of a standard
   * unit, 1 USD = 1000000 micros) after introducing the suggested price for a
   * month compared to current active price.
   */
  predictedMonthlyGrossProfitChangeMicros?: bigint;
  /**
   * The suggested price currency (ISO 4217 code).
   */
  suggestedPriceCurrencyCode?: string;
  /**
   * The latest suggested price in micros (1 millionth of a standard unit, 1
   * USD = 1000000 micros) for the product.
   */
  suggestedPriceMicros?: bigint;
}

function serializePriceInsights(data: any): PriceInsights {
  return {
    ...data,
    predictedMonthlyGrossProfitChangeMicros: data["predictedMonthlyGrossProfitChangeMicros"] !== undefined ? String(data["predictedMonthlyGrossProfitChangeMicros"]) : undefined,
    suggestedPriceMicros: data["suggestedPriceMicros"] !== undefined ? String(data["suggestedPriceMicros"]) : undefined,
  };
}

function deserializePriceInsights(data: any): PriceInsights {
  return {
    ...data,
    predictedMonthlyGrossProfitChangeMicros: data["predictedMonthlyGrossProfitChangeMicros"] !== undefined ? BigInt(data["predictedMonthlyGrossProfitChangeMicros"]) : undefined,
    suggestedPriceMicros: data["suggestedPriceMicros"] !== undefined ? BigInt(data["suggestedPriceMicros"]) : undefined,
  };
}

/**
 * Required product attributes are primarily defined by the product data
 * specification. See the Product Data Specification Help Center article for
 * information. Product data. After inserting, updating, or deleting a product,
 * it may take several minutes before changes take effect.
 */
export interface Product {
  /**
   * Additional URLs of images of the item.
   */
  additionalImageLinks?: string[];
  /**
   * Additional cut of the item. Used together with size_type to represent
   * combined size types for apparel items.
   */
  additionalSizeType?: string;
  /**
   * Used to group items in an arbitrary way. Only for CPA%, discouraged
   * otherwise.
   */
  adsGrouping?: string;
  /**
   * Similar to ads_grouping, but only works on CPC.
   */
  adsLabels?: string[];
  /**
   * Allows advertisers to override the item URL when the product is shown
   * within the context of Product Ads.
   */
  adsRedirect?: string;
  /**
   * Should be set to true if the item is targeted towards adults.
   */
  adult?: boolean;
  /**
   * Target age group of the item.
   */
  ageGroup?: string;
  /**
   * Availability status of the item.
   */
  availability?: string;
  /**
   * The day a pre-ordered product becomes available for delivery, in ISO 8601
   * format.
   */
  availabilityDate?: string;
  /**
   * Brand of the item.
   */
  brand?: string;
  /**
   * URL for the canonical version of your item's landing page.
   */
  canonicalLink?: string;
  /**
   * Required. The item's channel (online or local). Acceptable values are: -
   * "`local`" - "`online`"
   */
  channel?: string;
  /**
   * Color of the item.
   */
  color?: string;
  /**
   * Condition or state of the item.
   */
  condition?: string;
  /**
   * Required. The two-letter ISO 639-1 language code for the item.
   */
  contentLanguage?: string;
  /**
   * Cost of goods sold. Used for gross profit reporting.
   */
  costOfGoodsSold?: Price;
  /**
   * A list of custom (merchant-provided) attributes. It can also be used for
   * submitting any attribute of the feed specification in its generic form (for
   * example, `{ "name": "size type", "value": "regular" }`). This is useful for
   * submitting attributes not explicitly exposed by the API, such as additional
   * attributes used for Buy on Google (formerly known as Shopping Actions).
   */
  customAttributes?: CustomAttribute[];
  /**
   * Custom label 0 for custom grouping of items in a Shopping campaign.
   */
  customLabel0?: string;
  /**
   * Custom label 1 for custom grouping of items in a Shopping campaign.
   */
  customLabel1?: string;
  /**
   * Custom label 2 for custom grouping of items in a Shopping campaign.
   */
  customLabel2?: string;
  /**
   * Custom label 3 for custom grouping of items in a Shopping campaign.
   */
  customLabel3?: string;
  /**
   * Custom label 4 for custom grouping of items in a Shopping campaign.
   */
  customLabel4?: string;
  /**
   * Description of the item.
   */
  description?: string;
  /**
   * An identifier for an item for dynamic remarketing campaigns.
   */
  displayAdsId?: string;
  /**
   * URL directly to your item's landing page for dynamic remarketing
   * campaigns.
   */
  displayAdsLink?: string;
  /**
   * Advertiser-specified recommendations.
   */
  displayAdsSimilarIds?: string[];
  /**
   * Title of an item for dynamic remarketing campaigns.
   */
  displayAdsTitle?: string;
  /**
   * Offer margin for dynamic remarketing campaigns.
   */
  displayAdsValue?: number;
  /**
   * The energy efficiency class as defined in EU directive 2010/30/EU.
   */
  energyEfficiencyClass?: string;
  /**
   * The list of destinations to exclude for this target (corresponds to
   * cleared check boxes in Merchant Center). Products that are excluded from
   * all destinations for more than 7 days are automatically deleted.
   */
  excludedDestinations?: string[];
  /**
   * Date on which the item should expire, as specified upon insertion, in ISO
   * 8601 format. The actual expiration date in Google Shopping is exposed in
   * `productstatuses` as `googleExpirationDate` and might be earlier if
   * `expirationDate` is too far in the future.
   */
  expirationDate?: string;
  /**
   * Required for multi-seller accounts. Use this attribute if you're a
   * marketplace uploading products for various sellers to your multi-seller
   * account.
   */
  externalSellerId?: string;
  /**
   * Feed label for the item. Either `targetCountry` or `feedLabel` is
   * required. Must be less than or equal to 20 uppercase letters (A-Z), numbers
   * (0-9), and dashes (-).
   */
  feedLabel?: string;
  /**
   * Target gender of the item.
   */
  gender?: string;
  /**
   * Google's category of the item (see [Google product
   * taxonomy](https://support.google.com/merchants/answer/1705911)). When
   * querying products, this field will contain the user provided value. There
   * is currently no way to get back the auto assigned google product categories
   * through the API.
   */
  googleProductCategory?: string;
  /**
   * Global Trade Item Number (GTIN) of the item.
   */
  gtin?: string;
  /**
   * The REST ID of the product. Content API methods that operate on products
   * take this as their `productId` parameter. The REST ID for a product has one
   * of the 2 forms channel:contentLanguage: targetCountry: offerId or
   * channel:contentLanguage:feedLabel: offerId.
   */
  id?: string;
  /**
   * False when the item does not have unique product identifiers appropriate
   * to its category, such as GTIN, MPN, and brand. Required according to the
   * Unique Product Identifier Rules for all target countries except for Canada.
   */
  identifierExists?: boolean;
  /**
   * URL of an image of the item.
   */
  imageLink?: string;
  /**
   * The list of destinations to include for this target (corresponds to
   * checked check boxes in Merchant Center). Default destinations are always
   * included unless provided in `excludedDestinations`.
   */
  includedDestinations?: string[];
  /**
   * Number and amount of installments to pay for an item.
   */
  installment?: Installment;
  /**
   * Whether the item is a merchant-defined bundle. A bundle is a custom
   * grouping of different products sold by a merchant for a single price.
   */
  isBundle?: boolean;
  /**
   * Shared identifier for all variants of the same product.
   */
  itemGroupId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#product`"
   */
  kind?: string;
  /**
   * Additional URLs of lifestyle images of the item, used to explicitly
   * identify images that showcase your item in a real-world context. See the
   * Help Center article for more information.
   */
  lifestyleImageLinks?: string[];
  /**
   * URL directly linking to your item's page on your website.
   */
  link?: string;
  /**
   * URL template for merchant hosted local storefront.
   */
  linkTemplate?: string;
  /**
   * Loyalty points that users receive after purchasing the item. Japan only.
   */
  loyaltyPoints?: LoyaltyPoints;
  /**
   * The material of which the item is made.
   */
  material?: string;
  /**
   * The energy efficiency class as defined in EU directive 2010/30/EU.
   */
  maxEnergyEfficiencyClass?: string;
  /**
   * Maximal product handling time (in business days).
   */
  maxHandlingTime?: bigint;
  /**
   * The energy efficiency class as defined in EU directive 2010/30/EU.
   */
  minEnergyEfficiencyClass?: string;
  /**
   * Minimal product handling time (in business days).
   */
  minHandlingTime?: bigint;
  /**
   * URL for the mobile-optimized version of your item's landing page.
   */
  mobileLink?: string;
  /**
   * URL template for merchant hosted local storefront optimized for mobile
   * devices.
   */
  mobileLinkTemplate?: string;
  /**
   * Manufacturer Part Number (MPN) of the item.
   */
  mpn?: string;
  /**
   * The number of identical products in a merchant-defined multipack.
   */
  multipack?: bigint;
  /**
   * Required. A unique identifier for the item. Leading and trailing
   * whitespaces are stripped and multiple whitespaces are replaced by a single
   * whitespace upon submission. Only valid unicode characters are accepted. See
   * the products feed specification for details. *Note:* Content API methods
   * that operate on products take the REST ID of the product, *not* this
   * identifier.
   */
  offerId?: string;
  /**
   * The item's pattern (for example, polka dots).
   */
  pattern?: string;
  /**
   * Publication of this item should be temporarily paused. Acceptable values
   * are: - "`ads`"
   */
  pause?: string;
  /**
   * The pick up option for the item. Acceptable values are: - "`buy`" -
   * "`reserve`" - "`ship to store`" - "`not supported`"
   */
  pickupMethod?: string;
  /**
   * Item store pickup timeline. Acceptable values are: - "`same day`" - "`next
   * day`" - "`2-day`" - "`3-day`" - "`4-day`" - "`5-day`" - "`6-day`" -
   * "`7-day`" - "`multi-week`"
   */
  pickupSla?: string;
  /**
   * Price of the item.
   */
  price?: Price;
  /**
   * Technical specification or additional product details.
   */
  productDetails?: ProductProductDetail[];
  /**
   * The height of the product in the units provided. The value must be between
   * 0 (exclusive) and 3000 (inclusive).
   */
  productHeight?: ProductDimension;
  /**
   * Bullet points describing the most relevant highlights of a product.
   */
  productHighlights?: string[];
  /**
   * The length of the product in the units provided. The value must be between
   * 0 (exclusive) and 3000 (inclusive).
   */
  productLength?: ProductDimension;
  /**
   * Categories of the item (formatted as in product data specification).
   */
  productTypes?: string[];
  /**
   * The weight of the product in the units provided. The value must be between
   * 0 (exclusive) and 2000 (inclusive).
   */
  productWeight?: ProductWeight;
  /**
   * The width of the product in the units provided. The value must be between
   * 0 (exclusive) and 3000 (inclusive).
   */
  productWidth?: ProductDimension;
  /**
   * The unique ID of a promotion.
   */
  promotionIds?: string[];
  /**
   * Advertised sale price of the item.
   */
  salePrice?: Price;
  /**
   * Date range during which the item is on sale (see product data
   * specification ).
   */
  salePriceEffectiveDate?: string;
  /**
   * The quantity of the product that is available for selling on Google.
   * Supported only for online products.
   */
  sellOnGoogleQuantity?: bigint;
  /**
   * Shipping rules.
   */
  shipping?: ProductShipping[];
  /**
   * Height of the item for shipping.
   */
  shippingHeight?: ProductShippingDimension;
  /**
   * The shipping label of the product, used to group product in account-level
   * shipping rules.
   */
  shippingLabel?: string;
  /**
   * Length of the item for shipping.
   */
  shippingLength?: ProductShippingDimension;
  /**
   * Weight of the item for shipping.
   */
  shippingWeight?: ProductShippingWeight;
  /**
   * Width of the item for shipping.
   */
  shippingWidth?: ProductShippingDimension;
  /**
   * List of country codes (ISO 3166-1 alpha-2) to exclude the offer from
   * Shopping Ads destination. Countries from this list are removed from
   * countries configured in MC feed settings.
   */
  shoppingAdsExcludedCountries?: string[];
  /**
   * Size of the item. Only one value is allowed. For variants with different
   * sizes, insert a separate product for each size with the same `itemGroupId`
   * value (see size definition).
   */
  sizes?: string[];
  /**
   * System in which the size is specified. Recommended for apparel items.
   */
  sizeSystem?: string;
  /**
   * The cut of the item. Recommended for apparel items.
   */
  sizeType?: string;
  /**
   * The source of the offer, that is, how the offer was created. Acceptable
   * values are: - "`api`" - "`crawl`" - "`feed`"
   */
  source?: string;
  /**
   * Number of periods (months or years) and amount of payment per period for
   * an item with an associated subscription contract.
   */
  subscriptionCost?: ProductSubscriptionCost;
  /**
   * Required. The CLDR territory code for the item's country of sale.
   */
  targetCountry?: string;
  /**
   * The tax category of the product, used to configure detailed tax nexus in
   * account-level tax settings.
   */
  taxCategory?: string;
  /**
   * Tax information.
   */
  taxes?: ProductTax[];
  /**
   * Title of the item.
   */
  title?: string;
  /**
   * The transit time label of the product, used to group product in
   * account-level transit time tables.
   */
  transitTimeLabel?: string;
  /**
   * The preference of the denominator of the unit price.
   */
  unitPricingBaseMeasure?: ProductUnitPricingBaseMeasure;
  /**
   * The measure and dimension of an item.
   */
  unitPricingMeasure?: ProductUnitPricingMeasure;
}

function serializeProduct(data: any): Product {
  return {
    ...data,
    installment: data["installment"] !== undefined ? serializeInstallment(data["installment"]) : undefined,
    loyaltyPoints: data["loyaltyPoints"] !== undefined ? serializeLoyaltyPoints(data["loyaltyPoints"]) : undefined,
    maxHandlingTime: data["maxHandlingTime"] !== undefined ? String(data["maxHandlingTime"]) : undefined,
    minHandlingTime: data["minHandlingTime"] !== undefined ? String(data["minHandlingTime"]) : undefined,
    multipack: data["multipack"] !== undefined ? String(data["multipack"]) : undefined,
    sellOnGoogleQuantity: data["sellOnGoogleQuantity"] !== undefined ? String(data["sellOnGoogleQuantity"]) : undefined,
    shipping: data["shipping"] !== undefined ? data["shipping"].map((item: any) => (serializeProductShipping(item))) : undefined,
    subscriptionCost: data["subscriptionCost"] !== undefined ? serializeProductSubscriptionCost(data["subscriptionCost"]) : undefined,
    taxes: data["taxes"] !== undefined ? data["taxes"].map((item: any) => (serializeProductTax(item))) : undefined,
    unitPricingBaseMeasure: data["unitPricingBaseMeasure"] !== undefined ? serializeProductUnitPricingBaseMeasure(data["unitPricingBaseMeasure"]) : undefined,
  };
}

function deserializeProduct(data: any): Product {
  return {
    ...data,
    installment: data["installment"] !== undefined ? deserializeInstallment(data["installment"]) : undefined,
    loyaltyPoints: data["loyaltyPoints"] !== undefined ? deserializeLoyaltyPoints(data["loyaltyPoints"]) : undefined,
    maxHandlingTime: data["maxHandlingTime"] !== undefined ? BigInt(data["maxHandlingTime"]) : undefined,
    minHandlingTime: data["minHandlingTime"] !== undefined ? BigInt(data["minHandlingTime"]) : undefined,
    multipack: data["multipack"] !== undefined ? BigInt(data["multipack"]) : undefined,
    sellOnGoogleQuantity: data["sellOnGoogleQuantity"] !== undefined ? BigInt(data["sellOnGoogleQuantity"]) : undefined,
    shipping: data["shipping"] !== undefined ? data["shipping"].map((item: any) => (deserializeProductShipping(item))) : undefined,
    subscriptionCost: data["subscriptionCost"] !== undefined ? deserializeProductSubscriptionCost(data["subscriptionCost"]) : undefined,
    taxes: data["taxes"] !== undefined ? data["taxes"].map((item: any) => (deserializeProductTax(item))) : undefined,
    unitPricingBaseMeasure: data["unitPricingBaseMeasure"] !== undefined ? deserializeProductUnitPricingBaseMeasure(data["unitPricingBaseMeasure"]) : undefined,
  };
}

export interface ProductAmount {
  /**
   * The pre-tax or post-tax price depending on the location of the order.
   */
  priceAmount?: Price;
  /**
   * Remitted tax value.
   */
  remittedTaxAmount?: Price;
  /**
   * Tax value.
   */
  taxAmount?: Price;
}

/**
 * Product cluster fields. A product cluster is a grouping for different offers
 * that represent the same product. Values are only set for fields requested
 * explicitly in the request's search query.
 */
export interface ProductCluster {
  /**
   * Brand of the product cluster.
   */
  brand?: string;
  /**
   * Tells if there is at least one product of the brand currently `IN_STOCK`
   * in your product feed across multiple countries, all products are
   * `OUT_OF_STOCK` in your product feed, or `NOT_IN_INVENTORY`. The field
   * doesn't take the Best Sellers report country filter into account.
   */
  brandInventoryStatus?:  | "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY";
  /**
   * Product category (1st level) of the product cluster, represented in
   * Google's product taxonomy.
   */
  categoryL1?: string;
  /**
   * Product category (2nd level) of the product cluster, represented in
   * Google's product taxonomy.
   */
  categoryL2?: string;
  /**
   * Product category (3rd level) of the product cluster, represented in
   * Google's product taxonomy.
   */
  categoryL3?: string;
  /**
   * Product category (4th level) of the product cluster, represented in
   * Google's product taxonomy.
   */
  categoryL4?: string;
  /**
   * Product category (5th level) of the product cluster, represented in
   * Google's product taxonomy.
   */
  categoryL5?: string;
  /**
   * Tells whether the product cluster is `IN_STOCK` in your product feed
   * across multiple countries, `OUT_OF_STOCK` in your product feed, or
   * `NOT_IN_INVENTORY` at all. The field doesn't take the Best Sellers report
   * country filter into account.
   */
  inventoryStatus?:  | "INVENTORY_STATUS_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "NOT_IN_INVENTORY";
  /**
   * Title of the product cluster.
   */
  title?: string;
  /**
   * GTINs of example variants of the product cluster.
   */
  variantGtins?: string[];
}

/**
 * The estimated days to deliver a product after an order is placed. Only
 * authorized shipping signals partners working with a merchant can use this
 * resource. Merchants should use the
 * [`products`](https://developers.google.com/shopping-content/reference/rest/v2.1/products#productshipping)
 * resource instead.
 */
export interface ProductDeliveryTime {
  /**
   * Required. A set of associations between `DeliveryArea` and `DeliveryTime`
   * entries. The total number of `areaDeliveryTimes` can be at most 100.
   */
  areaDeliveryTimes?: ProductDeliveryTimeAreaDeliveryTime[];
  /**
   * Required. The `id` of the product.
   */
  productId?: ProductId;
}

/**
 * A pairing of `DeliveryArea` associated with a `DeliveryTime` for this
 * product.
 */
export interface ProductDeliveryTimeAreaDeliveryTime {
  /**
   * Required. The delivery area associated with `deliveryTime` for this
   * product.
   */
  deliveryArea?: DeliveryArea;
  /**
   * Required. The delivery time associated with `deliveryArea` for this
   * product.
   */
  deliveryTime?: ProductDeliveryTimeAreaDeliveryTimeDeliveryTime;
}

/**
 * A delivery time for this product.
 */
export interface ProductDeliveryTimeAreaDeliveryTimeDeliveryTime {
  /**
   * Required. The maximum number of business days (inclusive) between when an
   * order is placed and when the product ships. If a product ships in the same
   * day, set this value to 0.
   */
  maxHandlingTimeDays?: number;
  /**
   * Required. The maximum number of business days (inclusive) between when the
   * product ships and when the product is delivered.
   */
  maxTransitTimeDays?: number;
  /**
   * Required. The minimum number of business days (inclusive) between when an
   * order is placed and when the product ships. If a product ships in the same
   * day, set this value to 0.
   */
  minHandlingTimeDays?: number;
  /**
   * Required. The minimum number of business days (inclusive) between when the
   * product ships and when the product is delivered.
   */
  minTransitTimeDays?: number;
}

export interface ProductDimension {
  /**
   * Required. The length units. Acceptable values are: - "`in`" - "`cm`"
   */
  unit?: string;
  /**
   * Required. The length value represented as a number. The value can have a
   * maximum precision of four decimal places.
   */
  value?: number;
}

/**
 * The Content API ID of the product.
 */
export interface ProductId {
  /**
   * The Content API ID of the product, in the form
   * `channel:contentLanguage:targetCountry:offerId`.
   */
  productId?: string;
}

export interface ProductProductDetail {
  /**
   * The name of the product detail.
   */
  attributeName?: string;
  /**
   * The value of the product detail.
   */
  attributeValue?: string;
  /**
   * The section header used to group a set of product details.
   */
  sectionName?: string;
}

export interface ProductsCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: ProductsCustomBatchRequestEntry[];
}

function serializeProductsCustomBatchRequest(data: any): ProductsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeProductsCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeProductsCustomBatchRequest(data: any): ProductsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeProductsCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch products request.
 */
export interface ProductsCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The Content API Supplemental Feed ID. If present then product insertion or
   * deletion applies to a supplemental feed instead of primary Content API
   * feed.
   */
  feedId?: bigint;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`delete`" -
   * "`get`" - "`insert`" - "`update`"
   */
  method?: string;
  /**
   * The product to insert or update. Only required if the method is `insert`
   * or `update`. If the `update` method is used with `updateMask` only to
   * delete a field, then this isn't required. For example, setting `salePrice`
   * on the `updateMask` and not providing a `product` will result in an
   * existing sale price on the product specified by `productId` being deleted.
   */
  product?: Product;
  /**
   * The ID of the product to get or mutate. Only defined if the method is
   * `get`, `delete`, or `update`.
   */
  productId?: string;
  /**
   * The comma-separated list of product attributes to be updated. Example:
   * `"title,salePrice"`. Attributes specified in the update mask without a
   * value specified in the body will be deleted from the product. *You must
   * specify the update mask to delete attributes.* Only top-level product
   * attributes can be updated. If not defined, product attributes with set
   * values will be updated and other attributes will stay unchanged. Only
   * defined if the method is `update`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProductsCustomBatchRequestEntry(data: any): ProductsCustomBatchRequestEntry {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? String(data["feedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    product: data["product"] !== undefined ? serializeProduct(data["product"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProductsCustomBatchRequestEntry(data: any): ProductsCustomBatchRequestEntry {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? BigInt(data["feedId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    product: data["product"] !== undefined ? deserializeProduct(data["product"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

export interface ProductsCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: ProductsCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productsCustomBatchResponse`".
   */
  kind?: string;
}

function serializeProductsCustomBatchResponse(data: any): ProductsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeProductsCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeProductsCustomBatchResponse(data: any): ProductsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeProductsCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch products response.
 */
export interface ProductsCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productsCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The inserted product. Only defined if the method is `insert` and if the
   * request was successful.
   */
  product?: Product;
}

function serializeProductsCustomBatchResponseEntry(data: any): ProductsCustomBatchResponseEntry {
  return {
    ...data,
    product: data["product"] !== undefined ? serializeProduct(data["product"]) : undefined,
  };
}

function deserializeProductsCustomBatchResponseEntry(data: any): ProductsCustomBatchResponseEntry {
  return {
    ...data,
    product: data["product"] !== undefined ? deserializeProduct(data["product"]) : undefined,
  };
}

/**
 * Additional options for Content#productsDelete.
 */
export interface ProductsDeleteOptions {
  /**
   * The Content API Supplemental Feed ID. If present then product deletion
   * applies to the data in a supplemental feed. If absent, entire product will
   * be deleted.
   */
  feedId?: bigint;
}

function serializeProductsDeleteOptions(data: any): ProductsDeleteOptions {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? String(data["feedId"]) : undefined,
  };
}

function deserializeProductsDeleteOptions(data: any): ProductsDeleteOptions {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? BigInt(data["feedId"]) : undefined,
  };
}

export interface ProductShipping {
  /**
   * The CLDR territory code of the country to which an item will ship.
   */
  country?: string;
  /**
   * The location where the shipping is applicable, represented by a location
   * group name.
   */
  locationGroupName?: string;
  /**
   * The numeric ID of a location that the shipping rate applies to as defined
   * in the Google Ads API.
   */
  locationId?: bigint;
  /**
   * Maximum handling time (inclusive) between when the order is received and
   * shipped in business days. 0 means that the order is shipped on the same day
   * as it's received if it happens before the cut-off time. Both
   * maxHandlingTime and maxTransitTime are required if providing shipping
   * speeds.
   */
  maxHandlingTime?: bigint;
  /**
   * Maximum transit time (inclusive) between when the order has shipped and
   * when it's delivered in business days. 0 means that the order is delivered
   * on the same day as it ships. Both maxHandlingTime and maxTransitTime are
   * required if providing shipping speeds.
   */
  maxTransitTime?: bigint;
  /**
   * Minimum handling time (inclusive) between when the order is received and
   * shipped in business days. 0 means that the order is shipped on the same day
   * as it's received if it happens before the cut-off time. minHandlingTime can
   * only be present together with maxHandlingTime; but it's not required if
   * maxHandlingTime is present.
   */
  minHandlingTime?: bigint;
  /**
   * Minimum transit time (inclusive) between when the order has shipped and
   * when it's delivered in business days. 0 means that the order is delivered
   * on the same day as it ships. minTransitTime can only be present together
   * with maxTransitTime; but it's not required if maxTransitTime is present.
   */
  minTransitTime?: bigint;
  /**
   * The postal code range that the shipping rate applies to, represented by a
   * postal code, a postal code prefix followed by a * wildcard, a range between
   * two postal codes or two postal code prefixes of equal length.
   */
  postalCode?: string;
  /**
   * Fixed shipping price, represented as a number.
   */
  price?: Price;
  /**
   * The geographic region to which a shipping rate applies.
   */
  region?: string;
  /**
   * A free-form description of the service class or delivery speed.
   */
  service?: string;
}

function serializeProductShipping(data: any): ProductShipping {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? String(data["locationId"]) : undefined,
    maxHandlingTime: data["maxHandlingTime"] !== undefined ? String(data["maxHandlingTime"]) : undefined,
    maxTransitTime: data["maxTransitTime"] !== undefined ? String(data["maxTransitTime"]) : undefined,
    minHandlingTime: data["minHandlingTime"] !== undefined ? String(data["minHandlingTime"]) : undefined,
    minTransitTime: data["minTransitTime"] !== undefined ? String(data["minTransitTime"]) : undefined,
  };
}

function deserializeProductShipping(data: any): ProductShipping {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? BigInt(data["locationId"]) : undefined,
    maxHandlingTime: data["maxHandlingTime"] !== undefined ? BigInt(data["maxHandlingTime"]) : undefined,
    maxTransitTime: data["maxTransitTime"] !== undefined ? BigInt(data["maxTransitTime"]) : undefined,
    minHandlingTime: data["minHandlingTime"] !== undefined ? BigInt(data["minHandlingTime"]) : undefined,
    minTransitTime: data["minTransitTime"] !== undefined ? BigInt(data["minTransitTime"]) : undefined,
  };
}

export interface ProductShippingDimension {
  /**
   * The unit of value.
   */
  unit?: string;
  /**
   * The dimension of the product used to calculate the shipping cost of the
   * item.
   */
  value?: number;
}

export interface ProductShippingWeight {
  /**
   * The unit of value.
   */
  unit?: string;
  /**
   * The weight of the product used to calculate the shipping cost of the item.
   */
  value?: number;
}

/**
 * Additional options for Content#productsInsert.
 */
export interface ProductsInsertOptions {
  /**
   * The Content API Supplemental Feed ID. If present then product insertion
   * applies to the data in a supplemental feed.
   */
  feedId?: bigint;
}

function serializeProductsInsertOptions(data: any): ProductsInsertOptions {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? String(data["feedId"]) : undefined,
  };
}

function deserializeProductsInsertOptions(data: any): ProductsInsertOptions {
  return {
    ...data,
    feedId: data["feedId"] !== undefined ? BigInt(data["feedId"]) : undefined,
  };
}

/**
 * Additional options for Content#productsList.
 */
export interface ProductsListOptions {
  /**
   * The maximum number of products to return in the response, used for paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface ProductsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of products.
   */
  nextPageToken?: string;
  resources?: Product[];
}

function serializeProductsListResponse(data: any): ProductsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeProduct(item))) : undefined,
  };
}

function deserializeProductsListResponse(data: any): ProductsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeProduct(item))) : undefined,
  };
}

/**
 * The status of a product, that is, information about a product computed
 * asynchronously.
 */
export interface ProductStatus {
  /**
   * Date on which the item has been created, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * The intended destinations for the product.
   */
  destinationStatuses?: ProductStatusDestinationStatus[];
  /**
   * Date on which the item expires in Google Shopping, in ISO 8601 format.
   */
  googleExpirationDate?: string;
  /**
   * A list of all issues associated with the product.
   */
  itemLevelIssues?: ProductStatusItemLevelIssue[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productStatus`"
   */
  kind?: string;
  /**
   * Date on which the item has been last updated, in ISO 8601 format.
   */
  lastUpdateDate?: string;
  /**
   * The link to the product.
   */
  link?: string;
  /**
   * The ID of the product for which status is reported.
   */
  productId?: string;
  /**
   * The title of the product.
   */
  title?: string;
}

export interface ProductStatusDestinationStatus {
  /**
   * List of country codes (ISO 3166-1 alpha-2) where the offer is approved.
   */
  approvedCountries?: string[];
  /**
   * The name of the destination
   */
  destination?: string;
  /**
   * List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved.
   */
  disapprovedCountries?: string[];
  /**
   * List of country codes (ISO 3166-1 alpha-2) where the offer is pending
   * approval.
   */
  pendingCountries?: string[];
  /**
   * Destination approval status in `targetCountry` of the offer.
   */
  status?: string;
}

export interface ProductstatusesCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: ProductstatusesCustomBatchRequestEntry[];
}

function serializeProductstatusesCustomBatchRequest(data: any): ProductstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeProductstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeProductstatusesCustomBatchRequest(data: any): ProductstatusesCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeProductstatusesCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch productstatuses request.
 */
export interface ProductstatusesCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string[];
  /**
   * Deprecated: Setting this field has no effect and attributes are never
   * included.
   */
  includeAttributes?: boolean;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`"
   */
  method?: string;
  /**
   * The ID of the product whose status to get.
   */
  productId?: string;
}

function serializeProductstatusesCustomBatchRequestEntry(data: any): ProductstatusesCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeProductstatusesCustomBatchRequestEntry(data: any): ProductstatusesCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface ProductstatusesCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: ProductstatusesCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productstatusesCustomBatchResponse`".
   */
  kind?: string;
}

/**
 * A batch entry encoding a single non-batch productstatuses response.
 */
export interface ProductstatusesCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productstatusesCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The requested product status. Only defined if the request was successful.
   */
  productStatus?: ProductStatus;
}

/**
 * Additional options for Content#productstatusesGet.
 */
export interface ProductstatusesGetOptions {
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string;
}

/**
 * Additional options for Content#productstatusesList.
 */
export interface ProductstatusesListOptions {
  /**
   * If set, only issues for the specified destinations are returned, otherwise
   * only issues for the Shopping destination.
   */
  destinations?: string;
  /**
   * The maximum number of product statuses to return in the response, used for
   * paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface ProductstatusesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#productstatusesListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of products statuses.
   */
  nextPageToken?: string;
  resources?: ProductStatus[];
}

/**
 * Additional options for Content#productstatusesRepricingreportsList.
 */
export interface ProductstatusesRepricingreportsListOptions {
  /**
   * Gets Repricing reports on and before this date in the merchant's timezone.
   * You can only retrieve data up to 7 days ago (default) or earlier. Format is
   * YYYY-MM-DD.
   */
  endDate?: string;
  /**
   * Maximum number of days of reports to return. There can be more than one
   * rule report returned per day. For example, if 3 rule types got applied to
   * the same product within a 24-hour period, then a page_size of 1 will return
   * 3 rule reports. The page size defaults to 50 and values above 1000 are
   * coerced to 1000. This service may return fewer days of reports than this
   * value, for example, if the time between your start and end date is less
   * than the page size.
   */
  pageSize?: number;
  /**
   * Token (if provided) to retrieve the subsequent page. All other parameters
   * must match the original call that provided the page token.
   */
  pageToken?: string;
  /**
   * Id of the Repricing rule. If specified, only gets this rule's reports.
   */
  ruleId?: string;
  /**
   * Gets Repricing reports on and after this date in the merchant's timezone,
   * up to one year ago. Do not use a start date later than 7 days ago
   * (default). Format is YYYY-MM-DD.
   */
  startDate?: string;
}

export interface ProductStatusItemLevelIssue {
  /**
   * List of country codes (ISO 3166-1 alpha-2) where issue applies to the
   * offer.
   */
  applicableCountries?: string[];
  /**
   * The attribute's name, if the issue is caused by a single attribute.
   */
  attributeName?: string;
  /**
   * The error code of the issue.
   */
  code?: string;
  /**
   * A short issue description in English.
   */
  description?: string;
  /**
   * The destination the issue applies to.
   */
  destination?: string;
  /**
   * A detailed issue description in English.
   */
  detail?: string;
  /**
   * The URL of a web page to help with resolving this issue.
   */
  documentation?: string;
  /**
   * Whether the issue can be resolved by the merchant.
   */
  resolution?: string;
  /**
   * How this issue affects serving of the offer.
   */
  servability?: string;
}

export interface ProductSubscriptionCost {
  /**
   * The amount the buyer has to pay per subscription period.
   */
  amount?: Price;
  /**
   * The type of subscription period.
   */
  period?: string;
  /**
   * The number of subscription periods the buyer has to pay.
   */
  periodLength?: bigint;
}

function serializeProductSubscriptionCost(data: any): ProductSubscriptionCost {
  return {
    ...data,
    periodLength: data["periodLength"] !== undefined ? String(data["periodLength"]) : undefined,
  };
}

function deserializeProductSubscriptionCost(data: any): ProductSubscriptionCost {
  return {
    ...data,
    periodLength: data["periodLength"] !== undefined ? BigInt(data["periodLength"]) : undefined,
  };
}

/**
 * Additional options for Content#productsUpdate.
 */
export interface ProductsUpdateOptions {
  /**
   * The comma-separated list of product attributes to be updated. Example:
   * `"title,salePrice"`. Attributes specified in the update mask without a
   * value specified in the body will be deleted from the product. *You must
   * specify the update mask to delete attributes.* Only top-level product
   * attributes can be updated. If not defined, product attributes with set
   * values will be updated and other attributes will stay unchanged.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProductsUpdateOptions(data: any): ProductsUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProductsUpdateOptions(data: any): ProductsUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

export interface ProductTax {
  /**
   * The country within which the item is taxed, specified as a CLDR territory
   * code.
   */
  country?: string;
  /**
   * The numeric ID of a location that the tax rate applies to as defined in
   * the Google Ads API.
   */
  locationId?: bigint;
  /**
   * The postal code range that the tax rate applies to, represented by a ZIP
   * code, a ZIP code prefix using * wildcard, a range between two ZIP codes or
   * two ZIP code prefixes of equal length. Examples: 94114, 94*, 94002-95460,
   * 94*-95*.
   */
  postalCode?: string;
  /**
   * The percentage of tax rate that applies to the item price.
   */
  rate?: number;
  /**
   * The geographic region to which the tax rate applies.
   */
  region?: string;
  /**
   * Should be set to true if tax is charged on shipping.
   */
  taxShip?: boolean;
}

function serializeProductTax(data: any): ProductTax {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? String(data["locationId"]) : undefined,
  };
}

function deserializeProductTax(data: any): ProductTax {
  return {
    ...data,
    locationId: data["locationId"] !== undefined ? BigInt(data["locationId"]) : undefined,
  };
}

export interface ProductUnitPricingBaseMeasure {
  /**
   * The unit of the denominator.
   */
  unit?: string;
  /**
   * The denominator of the unit price.
   */
  value?: bigint;
}

function serializeProductUnitPricingBaseMeasure(data: any): ProductUnitPricingBaseMeasure {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeProductUnitPricingBaseMeasure(data: any): ProductUnitPricingBaseMeasure {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

export interface ProductUnitPricingMeasure {
  /**
   * The unit of the measure.
   */
  unit?: string;
  /**
   * The measure of an item.
   */
  value?: number;
}

/**
 * Product fields. Values are only set for fields requested explicitly in the
 * request's search query.
 */
export interface ProductView {
  /**
   * Aggregated destination status.
   */
  aggregatedDestinationStatus?:  | "AGGREGATED_STATUS_UNSPECIFIED" | "NOT_ELIGIBLE_OR_DISAPPROVED" | "PENDING" | "ELIGIBLE_LIMITED" | "ELIGIBLE";
  /**
   * Availability of the product.
   */
  availability?: string;
  /**
   * Brand of the product.
   */
  brand?: string;
  /**
   * First level of the product category in [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  categoryL1?: string;
  /**
   * Second level of the product category in [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  categoryL2?: string;
  /**
   * Third level of the product category in [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  categoryL3?: string;
  /**
   * Fourth level of the product category in [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  categoryL4?: string;
  /**
   * Fifth level of the product category in [Google's product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  categoryL5?: string;
  /**
   * Channel of the product (online versus local).
   */
  channel?:  | "CHANNEL_UNSPECIFIED" | "LOCAL" | "ONLINE";
  /**
   * Condition of the product.
   */
  condition?: string;
  /**
   * The time the merchant created the product in timestamp seconds.
   */
  creationTime?: Date;
  /**
   * Product price currency code (for example, ISO 4217). Absent if product
   * price is not available.
   */
  currencyCode?: string;
  /**
   * Expiration date for the product. Specified on insertion.
   */
  expirationDate?: Date;
  /**
   * GTIN of the product.
   */
  gtin?: string[];
  /**
   * The REST ID of the product, in the form of
   * channel:contentLanguage:targetCountry:offerId. Content API methods that
   * operate on products take this as their productId parameter. Should always
   * be included in the SELECT clause.
   */
  id?: string;
  /**
   * Item group ID provided by the merchant for grouping variants together.
   */
  itemGroupId?: string;
  /**
   * List of item issues for the product.
   */
  itemIssues?: ProductViewItemIssue[];
  /**
   * Language code of the product in BCP 47 format.
   */
  languageCode?: string;
  /**
   * Merchant-provided id of the product.
   */
  offerId?: string;
  /**
   * Product price specified as micros (1 millionth of a standard unit, 1 USD =
   * 1000000 micros) in the product currency. Absent in case the information
   * about the price of the product is not available.
   */
  priceMicros?: bigint;
  /**
   * First level of the product type in merchant's own [product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  productTypeL1?: string;
  /**
   * Second level of the product type in merchant's own [product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  productTypeL2?: string;
  /**
   * Third level of the product type in merchant's own [product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  productTypeL3?: string;
  /**
   * Fourth level of the product type in merchant's own [product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  productTypeL4?: string;
  /**
   * Fifth level of the product type in merchant's own [product
   * taxonomy](https://support.google.com/merchants/answer/6324436).
   */
  productTypeL5?: string;
  /**
   * The normalized shipping label specified in the feed
   */
  shippingLabel?: string;
  /**
   * Title of the product.
   */
  title?: string;
}

function serializeProductView(data: any): ProductView {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    priceMicros: data["priceMicros"] !== undefined ? String(data["priceMicros"]) : undefined,
  };
}

function deserializeProductView(data: any): ProductView {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    priceMicros: data["priceMicros"] !== undefined ? BigInt(data["priceMicros"]) : undefined,
  };
}

/**
 * Item issue associated with the product.
 */
export interface ProductViewItemIssue {
  /**
   * Item issue type.
   */
  issueType?: ProductViewItemIssueItemIssueType;
  /**
   * Item issue resolution.
   */
  resolution?:  | "UNKNOWN" | "MERCHANT_ACTION" | "PENDING_PROCESSING";
  /**
   * Item issue severity.
   */
  severity?: ProductViewItemIssueItemIssueSeverity;
}

/**
 * Issue severity for all affected regions in a destination.
 */
export interface ProductViewItemIssueIssueSeverityPerDestination {
  /**
   * List of demoted countries in the destination.
   */
  demotedCountries?: string[];
  /**
   * Issue destination.
   */
  destination?: string;
  /**
   * List of disapproved countries in the destination.
   */
  disapprovedCountries?: string[];
}

/**
 * Severity of an issue per destination in a region, and aggregated severity.
 */
export interface ProductViewItemIssueItemIssueSeverity {
  /**
   * Severity of an issue aggregated for destination.
   */
  aggregatedSeverity?:  | "AGGREGATED_ISSUE_SEVERITY_UNSPECIFIED" | "DISAPPROVED" | "DEMOTED" | "PENDING";
  /**
   * Item issue severity for every destination.
   */
  severityPerDestination?: ProductViewItemIssueIssueSeverityPerDestination[];
}

/**
 * Type of the item issue.
 */
export interface ProductViewItemIssueItemIssueType {
  /**
   * Canonical attribute name for attribute-specific issues.
   */
  canonicalAttribute?: string;
}

export interface ProductWeight {
  /**
   * Required. The weight unit. Acceptable values are: - "`g`" - "`kg`" -
   * "`oz`" - "`lb`"
   */
  unit?: string;
  /**
   * Required. The weight represented as a number. The weight can have a
   * maximum precision of four decimal places.
   */
  value?: number;
}

/**
 * Represents a promotion. See the following articles for more details. *
 * [Promotions feed
 * specification](https://support.google.com/merchants/answer/2906014) * [Local
 * promotions feed
 * specification](https://support.google.com/merchants/answer/10146130) *
 * [Promotions on Buy on Google product data
 * specification](https://support.google.com/merchants/answer/9173673)
 */
export interface Promotion {
  /**
   * Product filter by brand for the promotion.
   */
  brand?: string[];
  /**
   * Product filter by brand exclusion for the promotion.
   */
  brandExclusion?: string[];
  /**
   * Required. The content language used as part of the unique identifier. `en`
   * content language is available for all target countries. `fr` content
   * language is available for `CA` and `FR` target countries. `de` content
   * language is available for `DE` target country. `nl` content language is
   * available for `NL` target country. `it` content language is available for
   * `IT` target country. `pt` content language is available for `BR` target
   * country. `ja` content language is available for `JP` target country. `ko`
   * content language is available for `KR` target country.
   */
  contentLanguage?: string;
  /**
   * Required. Coupon value type for the promotion.
   */
  couponValueType?:  | "COUPON_VALUE_TYPE_UNSPECIFIED" | "MONEY_OFF" | "PERCENT_OFF" | "BUY_M_GET_N_MONEY_OFF" | "BUY_M_GET_N_PERCENT_OFF" | "BUY_M_GET_MONEY_OFF" | "BUY_M_GET_PERCENT_OFF" | "FREE_GIFT" | "FREE_GIFT_WITH_VALUE" | "FREE_GIFT_WITH_ITEM_ID" | "FREE_SHIPPING_STANDARD" | "FREE_SHIPPING_OVERNIGHT" | "FREE_SHIPPING_TWO_DAY";
  /**
   * Free gift description for the promotion.
   */
  freeGiftDescription?: string;
  /**
   * Free gift item ID for the promotion.
   */
  freeGiftItemId?: string;
  /**
   * Free gift value for the promotion.
   */
  freeGiftValue?: PriceAmount;
  /**
   * Generic redemption code for the promotion. To be used with the `offerType`
   * field.
   */
  genericRedemptionCode?: string;
  /**
   * The number of items discounted in the promotion.
   */
  getThisQuantityDiscounted?: number;
  /**
   * Required. Output only. The REST promotion ID to uniquely identify the
   * promotion. Content API methods that operate on promotions take this as
   * their `promotionId` parameter. The REST ID for a promotion is of the form
   * channel:contentLanguage:targetCountry:promotionId The `channel` field has a
   * value of `"online"`, `"in_store"`, or `"online_in_store"`.
   */
  readonly id?: string;
  /**
   * Product filter by item group ID for the promotion.
   */
  itemGroupId?: string[];
  /**
   * Product filter by item group ID exclusion for the promotion.
   */
  itemGroupIdExclusion?: string[];
  /**
   * Product filter by item ID for the promotion.
   */
  itemId?: string[];
  /**
   * Product filter by item ID exclusion for the promotion.
   */
  itemIdExclusion?: string[];
  /**
   * Maximum purchase quantity for the promotion.
   */
  limitQuantity?: number;
  /**
   * Maximum purchase value for the promotion.
   */
  limitValue?: PriceAmount;
  /**
   * Required. Long title for the promotion.
   */
  longTitle?: string;
  /**
   * Minimum purchase amount for the promotion.
   */
  minimumPurchaseAmount?: PriceAmount;
  /**
   * Minimum purchase quantity for the promotion.
   */
  minimumPurchaseQuantity?: number;
  /**
   * Cost cap for the promotion.
   */
  moneyBudget?: PriceAmount;
  /**
   * The money off amount offered in the promotion.
   */
  moneyOffAmount?: PriceAmount;
  /**
   * Required. Type of the promotion.
   */
  offerType?:  | "OFFER_TYPE_UNSPECIFIED" | "NO_CODE" | "GENERIC_CODE";
  /**
   * Order limit for the promotion.
   */
  orderLimit?: number;
  /**
   * The percentage discount offered in the promotion.
   */
  percentOff?: number;
  /**
   * Required. Applicability of the promotion to either all products or only
   * specific products.
   */
  productApplicability?:  | "PRODUCT_APPLICABILITY_UNSPECIFIED" | "ALL_PRODUCTS" | "SPECIFIC_PRODUCTS";
  /**
   * Product filter by product type for the promotion.
   */
  productType?: string[];
  /**
   * Product filter by product type exclusion for the promotion.
   */
  productTypeExclusion?: string[];
  /**
   * Destination ID for the promotion.
   */
  promotionDestinationIds?: string[];
  /**
   * String representation of the promotion display dates. Deprecated. Use
   * `promotion_display_time_period` instead.
   */
  promotionDisplayDates?: string;
  /**
   * `TimePeriod` representation of the promotion's display dates.
   */
  promotionDisplayTimePeriod?: TimePeriod;
  /**
   * String representation of the promotion effective dates. Deprecated. Use
   * `promotion_effective_time_period` instead.
   */
  promotionEffectiveDates?: string;
  /**
   * Required. `TimePeriod` representation of the promotion's effective dates.
   */
  promotionEffectiveTimePeriod?: TimePeriod;
  /**
   * Required. The user provided promotion ID to uniquely identify the
   * promotion.
   */
  promotionId?: string;
  /**
   * Output only. The current status of the promotion.
   */
  readonly promotionStatus?: PromotionPromotionStatus;
  /**
   * URL to the page on the merchant's site where the promotion shows. Local
   * Inventory ads promotions throw an error if no promo url is included. URL is
   * used to confirm that the promotion is valid and can be redeemed.
   */
  promotionUrl?: string;
  /**
   * Required. Redemption channel for the promotion. At least one channel is
   * required.
   */
  redemptionChannel?:  | "REDEMPTION_CHANNEL_UNSPECIFIED" | "IN_STORE" | "ONLINE"[];
  /**
   * Shipping service names for the promotion.
   */
  shippingServiceNames?: string[];
  /**
   * Whether the promotion applies to all stores, or only specified stores.
   * Local Inventory ads promotions throw an error if no store applicability is
   * included. An INVALID_ARGUMENT error is thrown if store_applicability is set
   * to ALL_STORES and store_code or score_code_exclusion is set to a value.
   */
  storeApplicability?:  | "STORE_APPLICABILITY_UNSPECIFIED" | "ALL_STORES" | "SPECIFIC_STORES";
  /**
   * Store codes to include for the promotion.
   */
  storeCode?: string[];
  /**
   * Store codes to exclude for the promotion.
   */
  storeCodeExclusion?: string[];
  /**
   * Required. The target country used as part of the unique identifier. Can be
   * `AU`, `CA`, `DE`, `FR`, `GB`, `IN`, `US`, `BR`, `ES`, `NL`, `JP`, `IT` or
   * `KR`.
   */
  targetCountry?: string;
}

function serializePromotion(data: any): Promotion {
  return {
    ...data,
    promotionDisplayTimePeriod: data["promotionDisplayTimePeriod"] !== undefined ? serializeTimePeriod(data["promotionDisplayTimePeriod"]) : undefined,
    promotionEffectiveTimePeriod: data["promotionEffectiveTimePeriod"] !== undefined ? serializeTimePeriod(data["promotionEffectiveTimePeriod"]) : undefined,
  };
}

function deserializePromotion(data: any): Promotion {
  return {
    ...data,
    promotionDisplayTimePeriod: data["promotionDisplayTimePeriod"] !== undefined ? deserializeTimePeriod(data["promotionDisplayTimePeriod"]) : undefined,
    promotionEffectiveTimePeriod: data["promotionEffectiveTimePeriod"] !== undefined ? deserializeTimePeriod(data["promotionEffectiveTimePeriod"]) : undefined,
  };
}

/**
 * The status of the promotion.
 */
export interface PromotionPromotionStatus {
  /**
   * Date on which the promotion has been created in [ISO
   * 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and
   * offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"
   */
  creationDate?: string;
  /**
   * The intended destinations for the promotion.
   */
  destinationStatuses?: PromotionPromotionStatusDestinationStatus[];
  /**
   * Date on which the promotion status has been last updated in [ISO
   * 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and
   * offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"
   */
  lastUpdateDate?: string;
  /**
   * A list of issues associated with the promotion.
   */
  promotionIssue?: PromotionPromotionStatusPromotionIssue[];
}

/**
 * The destination status of the promotion.
 */
export interface PromotionPromotionStatusDestinationStatus {
  /**
   * The name of the destination.
   */
  destination?: string;
  /**
   * The status for the specified destination.
   */
  status?:  | "STATE_UNSPECIFIED" | "IN_REVIEW" | "REJECTED" | "LIVE" | "STOPPED" | "EXPIRED" | "PENDING";
}

/**
 * The issue associated with the promotion.
 */
export interface PromotionPromotionStatusPromotionIssue {
  /**
   * Code of the issue.
   */
  code?: string;
  /**
   * Explanation of the issue.
   */
  detail?: string;
}

/**
 * Settings for Pub/Sub notifications, all methods require that the caller is a
 * direct user of the merchant center account.
 */
export interface PubsubNotificationSettings {
  /**
   * Cloud pub/sub topic to which notifications are sent (read-only).
   */
  cloudTopicName?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#pubsubNotificationSettings`"
   */
  kind?: string;
  /**
   * List of event types. Acceptable values are: - "`orderPendingShipment`"
   */
  registeredEvents?: string[];
}

/**
 * Additional options for Content#quotasList.
 */
export interface QuotasListOptions {
  /**
   * The maximum number of quotas to return in the response, used for paging.
   * Defaults to 500; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Token (if provided) to retrieve the subsequent page. All other parameters
   * must match the original call that provided the page token.
   */
  pageToken?: string;
}

export interface RateGroup {
  /**
   * A list of shipping labels defining the products to which this rate group
   * applies to. This is a disjunction: only one of the labels has to match for
   * the rate group to apply. May only be empty for the last rate group of a
   * service. Required.
   */
  applicableShippingLabels?: string[];
  /**
   * A list of carrier rates that can be referred to by `mainTable` or
   * `singleValue`.
   */
  carrierRates?: CarrierRate[];
  /**
   * A table defining the rate group, when `singleValue` is not expressive
   * enough. Can only be set if `singleValue` is not set.
   */
  mainTable?: Table;
  /**
   * Name of the rate group. Optional. If set has to be unique within shipping
   * service.
   */
  name?: string;
  /**
   * The value of the rate group (for example, flat rate $10). Can only be set
   * if `mainTable` and `subtables` are not set.
   */
  singleValue?: Value;
  /**
   * A list of subtables referred to by `mainTable`. Can only be set if
   * `mainTable` is set.
   */
  subtables?: Table[];
}

export interface RefundReason {
  /**
   * Description of the reason.
   */
  description?: string;
  /**
   * Code of the refund reason. Acceptable values are: - "`adjustment`" -
   * "`autoPostInternal`" - "`autoPostInvalidBillingAddress`" -
   * "`autoPostNoInventory`" - "`autoPostPriceError`" -
   * "`autoPostUndeliverableShippingAddress`" - "`couponAbuse`" -
   * "`courtesyAdjustment`" - "`customerCanceled`" -
   * "`customerDiscretionaryReturn`" - "`customerInitiatedMerchantCancel`" -
   * "`customerSupportRequested`" - "`deliveredLateByCarrier`" -
   * "`deliveredTooLate`" - "`expiredItem`" - "`failToPushOrderGoogleError`" -
   * "`failToPushOrderMerchantError`" -
   * "`failToPushOrderMerchantFulfillmentError`" - "`failToPushOrderToMerchant`"
   * - "`failToPushOrderToMerchantOutOfStock`" - "`feeAdjustment`" -
   * "`invalidCoupon`" - "`lateShipmentCredit`" - "`malformedShippingAddress`" -
   * "`merchantDidNotShipOnTime`" - "`noInventory`" - "`orderTimeout`" -
   * "`other`" - "`paymentAbuse`" - "`paymentDeclined`" - "`priceAdjustment`" -
   * "`priceError`" - "`productArrivedDamaged`" - "`productNotAsDescribed`" -
   * "`promoReallocation`" - "`qualityNotAsExpected`" - "`returnRefundAbuse`" -
   * "`shippingCostAdjustment`" - "`shippingPriceError`" - "`taxAdjustment`" -
   * "`taxError`" - "`undeliverableShippingAddress`" -
   * "`unsupportedPoBoxAddress`" - "`wrongProductShipped`"
   */
  reasonCode?: string;
}

/**
 * Represents a geographic region that you can use as a target with both the
 * `RegionalInventory` and `ShippingSettings` services. You can define regions
 * as collections of either postal codes or, in some countries, using predefined
 * geotargets.
 */
export interface Region {
  /**
   * The display name of the region.
   */
  displayName?: string;
  /**
   * A list of geotargets that defines the region area.
   */
  geotargetArea?: RegionGeoTargetArea;
  /**
   * Output only. Immutable. Merchant that owns the region.
   */
  readonly merchantId?: bigint;
  /**
   * A list of postal codes that defines the region area.
   */
  postalCodeArea?: RegionPostalCodeArea;
  /**
   * Output only. Indicates if the region is eligible to use in the Regional
   * Inventory configuration.
   */
  readonly regionalInventoryEligible?: boolean;
  /**
   * Output only. Immutable. The ID uniquely identifying each region.
   */
  readonly regionId?: string;
  /**
   * Output only. Indicates if the region is eligible to use in the Shipping
   * Services configuration.
   */
  readonly shippingEligible?: boolean;
}

function serializeRegion(data: any): Region {
  return {
    ...data,
    geotargetArea: data["geotargetArea"] !== undefined ? serializeRegionGeoTargetArea(data["geotargetArea"]) : undefined,
  };
}

function deserializeRegion(data: any): Region {
  return {
    ...data,
    geotargetArea: data["geotargetArea"] !== undefined ? deserializeRegionGeoTargetArea(data["geotargetArea"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * Regional inventory resource. contains the regional name and all attributes
 * which are overridden for the specified region.
 */
export interface RegionalInventory {
  /**
   * The availability of the product.
   */
  availability?: string;
  /**
   * A list of custom (merchant-provided) attributes. It can also be used for
   * submitting any attribute of the feed specification in its generic form.
   */
  customAttributes?: CustomAttribute[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#regionalInventory`".
   */
  kind?: string;
  /**
   * The price of the product.
   */
  price?: Price;
  /**
   * The ID uniquely identifying each region.
   */
  regionId?: string;
  /**
   * The sale price of the product. Mandatory if `sale_price_effective_date` is
   * defined.
   */
  salePrice?: Price;
  /**
   * A date range represented by a pair of ISO 8601 dates separated by a space,
   * comma, or slash. Both dates might be specified as 'null' if undecided.
   */
  salePriceEffectiveDate?: string;
}

export interface RegionalinventoryCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: RegionalinventoryCustomBatchRequestEntry[];
}

function serializeRegionalinventoryCustomBatchRequest(data: any): RegionalinventoryCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeRegionalinventoryCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeRegionalinventoryCustomBatchRequest(data: any): RegionalinventoryCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeRegionalinventoryCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch regional inventory request.
 */
export interface RegionalinventoryCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * Method of the batch request entry. Acceptable values are: - "`insert`"
   */
  method?: string;
  /**
   * The ID of the product for which to update price and availability.
   */
  productId?: string;
  /**
   * Price and availability of the product.
   */
  regionalInventory?: RegionalInventory;
}

function serializeRegionalinventoryCustomBatchRequestEntry(data: any): RegionalinventoryCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeRegionalinventoryCustomBatchRequestEntry(data: any): RegionalinventoryCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface RegionalinventoryCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: RegionalinventoryCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#regionalinventoryCustomBatchResponse`".
   */
  kind?: string;
}

/**
 * A batch entry encoding a single non-batch regional inventory response.
 */
export interface RegionalinventoryCustomBatchResponseEntry {
  /**
   * The ID of the request entry this entry responds to.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#regionalinventoryCustomBatchResponseEntry`".
   */
  kind?: string;
  /**
   * Price and availability of the product.
   */
  regionalInventory?: RegionalInventory;
}

/**
 * A list of geotargets that defines the region area.
 */
export interface RegionGeoTargetArea {
  /**
   * Required. A non-empty list of [location
   * IDs](https://developers.google.com/adwords/api/docs/appendix/geotargeting).
   * They must all be of the same location type (e.g., state).
   */
  geotargetCriteriaIds?: bigint[];
}

function serializeRegionGeoTargetArea(data: any): RegionGeoTargetArea {
  return {
    ...data,
    geotargetCriteriaIds: data["geotargetCriteriaIds"] !== undefined ? data["geotargetCriteriaIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeRegionGeoTargetArea(data: any): RegionGeoTargetArea {
  return {
    ...data,
    geotargetCriteriaIds: data["geotargetCriteriaIds"] !== undefined ? data["geotargetCriteriaIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A list of postal codes that defines the region area. Note: All regions
 * defined using postal codes are accessible via the account's
 * `ShippingSettings.postalCodeGroups` resource.
 */
export interface RegionPostalCodeArea {
  /**
   * Required. A range of postal codes.
   */
  postalCodes?: RegionPostalCodeAreaPostalCodeRange[];
  /**
   * Required. CLDR territory code or the country the postal code group applies
   * to.
   */
  regionCode?: string;
}

/**
 * A range of postal codes that defines the region area.
 */
export interface RegionPostalCodeAreaPostalCodeRange {
  /**
   * Required. A postal code or a pattern of the form prefix* denoting the
   * inclusive lower bound of the range defining the area. Examples values:
   * "94108", "9410*", "9*".
   */
  begin?: string;
  /**
   * Optional. A postal code or a pattern of the form prefix* denoting the
   * inclusive upper bound of the range defining the area. It must have the same
   * length as postalCodeRangeBegin: if postalCodeRangeBegin is a postal code
   * then postalCodeRangeEnd must be a postal code too; if postalCodeRangeBegin
   * is a pattern then postalCodeRangeEnd must be a pattern with the same prefix
   * length. Optional: if not set, then the area is defined as being all the
   * postal codes matching postalCodeRangeBegin.
   */
  end?: string;
}

/**
 * Additional options for Content#regionsCreate.
 */
export interface RegionsCreateOptions {
  /**
   * Required. The id of the region to create.
   */
  regionId?: string;
}

/**
 * Additional options for Content#regionsList.
 */
export interface RegionsListOptions {
  /**
   * The maximum number of regions to return. The service may return fewer than
   * this value. If unspecified, at most 50 rules will be returned. The maximum
   * value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListRegions` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListRegions` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Content#regionsPatch.
 */
export interface RegionsPatchOptions {
  /**
   * Optional. The comma-separated field mask indicating the fields to update.
   * Example: `"displayName,postalCodeArea.regionCode"`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeRegionsPatchOptions(data: any): RegionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeRegionsPatchOptions(data: any): RegionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Result row returned from the search query.
 */
export interface ReportRow {
  /**
   * Best sellers fields requested by the merchant in the query. Field values
   * are only set if the merchant queries `BestSellersProductClusterView` or
   * `BestSellersBrandView`.
   */
  bestSellers?: BestSellers;
  /**
   * Brand fields requested by the merchant in the query. Field values are only
   * set if the merchant queries `BestSellersBrandView`.
   */
  brand?: Brand;
  /**
   * Metrics requested by the merchant in the query. Metric values are only set
   * for metrics requested explicitly in the query.
   */
  metrics?: Metrics;
  /**
   * Price competitiveness fields requested by the merchant in the query. Field
   * values are only set if the merchant queries
   * `PriceCompetitivenessProductView`.
   */
  priceCompetitiveness?: PriceCompetitiveness;
  /**
   * Price insights fields requested by the merchant in the query. Field values
   * are only set if the merchant queries `PriceInsightsProductView`.
   */
  priceInsights?: PriceInsights;
  /**
   * Product cluster fields requested by the merchant in the query. Field
   * values are only set if the merchant queries
   * `BestSellersProductClusterView`.
   */
  productCluster?: ProductCluster;
  /**
   * Product fields requested by the merchant in the query. Field values are
   * only set if the merchant queries `ProductView`.
   */
  productView?: ProductView;
  /**
   * Segmentation dimensions requested by the merchant in the query. Dimension
   * values are only set for dimensions requested explicitly in the query.
   */
  segments?: Segments;
}

function serializeReportRow(data: any): ReportRow {
  return {
    ...data,
    bestSellers: data["bestSellers"] !== undefined ? serializeBestSellers(data["bestSellers"]) : undefined,
    metrics: data["metrics"] !== undefined ? serializeMetrics(data["metrics"]) : undefined,
    priceCompetitiveness: data["priceCompetitiveness"] !== undefined ? serializePriceCompetitiveness(data["priceCompetitiveness"]) : undefined,
    priceInsights: data["priceInsights"] !== undefined ? serializePriceInsights(data["priceInsights"]) : undefined,
    productView: data["productView"] !== undefined ? serializeProductView(data["productView"]) : undefined,
  };
}

function deserializeReportRow(data: any): ReportRow {
  return {
    ...data,
    bestSellers: data["bestSellers"] !== undefined ? deserializeBestSellers(data["bestSellers"]) : undefined,
    metrics: data["metrics"] !== undefined ? deserializeMetrics(data["metrics"]) : undefined,
    priceCompetitiveness: data["priceCompetitiveness"] !== undefined ? deserializePriceCompetitiveness(data["priceCompetitiveness"]) : undefined,
    priceInsights: data["priceInsights"] !== undefined ? deserializePriceInsights(data["priceInsights"]) : undefined,
    productView: data["productView"] !== undefined ? deserializeProductView(data["productView"]) : undefined,
  };
}

/**
 * Resource that represents a daily Repricing product report. Each report
 * contains stats for a single type of Repricing rule for a single product on a
 * given day. If there are multiple rules of the same type for the product on
 * that day, the report lists all the rules by rule ids, combines the stats, and
 * paginates the results by date. To retrieve the stats of a particular rule,
 * provide the rule_id in the request.
 */
export interface RepricingProductReport {
  /**
   * Total count of Repricer applications. This value captures how many times
   * the rule of this type was applied to this product during this reporting
   * period.
   */
  applicationCount?: bigint;
  /**
   * Stats specific to buybox winning rules for product report (deprecated).
   */
  buyboxWinningProductStats?: RepricingProductReportBuyboxWinningProductStats;
  /**
   * Date of the stats in this report. The report starts and ends according to
   * the merchant's timezone.
   */
  date?: Date;
  /**
   * Maximum displayed price after repriced during this reporting period.
   */
  highWatermark?: PriceAmount;
  /**
   * List of all reasons the rule did not apply to the product during the
   * specified reporting period.
   */
  inapplicabilityDetails?: InapplicabilityDetails[];
  /**
   * Minimum displayed price after repriced during this reporting period.
   */
  lowWatermark?: PriceAmount;
  /**
   * Total unit count of impacted products ordered while the rule was active on
   * the date of the report. This count includes all orders that were started
   * while the rule was active, even if the rule was no longer active when the
   * order was completed.
   */
  orderItemCount?: number;
  /**
   * Ids of the Repricing rule for this report.
   */
  ruleIds?: string[];
  /**
   * Total GMV generated by impacted products while the rule was active on the
   * date of the report. This value includes all orders that were started while
   * the rule was active, even if the rule was no longer active when the order
   * was completed.
   */
  totalGmv?: PriceAmount;
  /**
   * Type of the rule.
   */
  type?:  | "REPRICING_RULE_TYPE_UNSPECIFIED" | "TYPE_STATS_BASED" | "TYPE_COGS_BASED" | "TYPE_SALES_VOLUME_BASED" | "TYPE_COMPETITIVE_PRICE";
}

function serializeRepricingProductReport(data: any): RepricingProductReport {
  return {
    ...data,
    applicationCount: data["applicationCount"] !== undefined ? String(data["applicationCount"]) : undefined,
    inapplicabilityDetails: data["inapplicabilityDetails"] !== undefined ? data["inapplicabilityDetails"].map((item: any) => (serializeInapplicabilityDetails(item))) : undefined,
  };
}

function deserializeRepricingProductReport(data: any): RepricingProductReport {
  return {
    ...data,
    applicationCount: data["applicationCount"] !== undefined ? BigInt(data["applicationCount"]) : undefined,
    inapplicabilityDetails: data["inapplicabilityDetails"] !== undefined ? data["inapplicabilityDetails"].map((item: any) => (deserializeInapplicabilityDetails(item))) : undefined,
  };
}

/**
 * Stats specific to buybox winning rules for product report.
 */
export interface RepricingProductReportBuyboxWinningProductStats {
  /**
   * Number of times this product won the buybox with these rules during this
   * time period.
   */
  buyboxWinsCount?: number;
}

/**
 * Represents a repricing rule. A repricing rule is used by shopping serving to
 * adjust transactable offer prices if conditions are met.
 */
export interface RepricingRule {
  /**
   * The rule definition for TYPE_COGS_BASED. Required when the rule type is
   * TYPE_COGS_BASED.
   */
  cogsBasedRule?: RepricingRuleCostOfGoodsSaleRule;
  /**
   * Required. Immutable. [CLDR country
   * code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml)
   * (e.g. "US").
   */
  countryCode?: string;
  /**
   * Required. Time period when the rule should take effect.
   */
  effectiveTimePeriod?: RepricingRuleEffectiveTime;
  /**
   * Required. Match criteria for the eligible offers.
   */
  eligibleOfferMatcher?: RepricingRuleEligibleOfferMatcher;
  /**
   * Required. Immutable. The two-letter ISO 639-1 language code associated
   * with the repricing rule.
   */
  languageCode?: string;
  /**
   * Output only. Immutable. Merchant that owns the repricing rule.
   */
  readonly merchantId?: bigint;
  /**
   * Represents whether a rule is paused. A paused rule will behave like a
   * non-paused rule within CRUD operations, with the major difference that a
   * paused rule will not be evaluated and will have no effect on offers.
   */
  paused?: boolean;
  /**
   * Required. Restriction of the rule appliance.
   */
  restriction?: RepricingRuleRestriction;
  /**
   * Output only. Immutable. The ID to uniquely identify each repricing rule.
   */
  readonly ruleId?: string;
  /**
   * The rule definition for TYPE_STATS_BASED. Required when the rule type is
   * TYPE_STATS_BASED.
   */
  statsBasedRule?: RepricingRuleStatsBasedRule;
  /**
   * The title for the rule.
   */
  title?: string;
  /**
   * Required. Immutable. The type of the rule.
   */
  type?:  | "REPRICING_RULE_TYPE_UNSPECIFIED" | "TYPE_STATS_BASED" | "TYPE_COGS_BASED" | "TYPE_SALES_VOLUME_BASED" | "TYPE_COMPETITIVE_PRICE";
}

function serializeRepricingRule(data: any): RepricingRule {
  return {
    ...data,
    effectiveTimePeriod: data["effectiveTimePeriod"] !== undefined ? serializeRepricingRuleEffectiveTime(data["effectiveTimePeriod"]) : undefined,
  };
}

function deserializeRepricingRule(data: any): RepricingRule {
  return {
    ...data,
    effectiveTimePeriod: data["effectiveTimePeriod"] !== undefined ? deserializeRepricingRuleEffectiveTime(data["effectiveTimePeriod"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * A repricing rule that changes the sale price based on cost of goods sale.
 */
export interface RepricingRuleCostOfGoodsSaleRule {
  /**
   * The percent change against the COGS. Ex: 20 would mean to set the adjusted
   * price 1.2X of the COGS data.
   */
  percentageDelta?: number;
  /**
   * The price delta against the COGS. E.g. 2 means $2 more of the COGS.
   */
  priceDelta?: string;
}

export interface RepricingRuleEffectiveTime {
  /**
   * A list of fixed time periods combined with OR. The maximum number of
   * entries is limited to 5.
   */
  fixedTimePeriods?: RepricingRuleEffectiveTimeFixedTimePeriod[];
}

function serializeRepricingRuleEffectiveTime(data: any): RepricingRuleEffectiveTime {
  return {
    ...data,
    fixedTimePeriods: data["fixedTimePeriods"] !== undefined ? data["fixedTimePeriods"].map((item: any) => (serializeRepricingRuleEffectiveTimeFixedTimePeriod(item))) : undefined,
  };
}

function deserializeRepricingRuleEffectiveTime(data: any): RepricingRuleEffectiveTime {
  return {
    ...data,
    fixedTimePeriods: data["fixedTimePeriods"] !== undefined ? data["fixedTimePeriods"].map((item: any) => (deserializeRepricingRuleEffectiveTimeFixedTimePeriod(item))) : undefined,
  };
}

/**
 * Definition of a fixed time period.
 */
export interface RepricingRuleEffectiveTimeFixedTimePeriod {
  /**
   * The end time (exclusive) of the period. It can only be hour granularity.
   */
  endTime?: Date;
  /**
   * The start time (inclusive) of the period. It can only be hour granularity.
   */
  startTime?: Date;
}

function serializeRepricingRuleEffectiveTimeFixedTimePeriod(data: any): RepricingRuleEffectiveTimeFixedTimePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeRepricingRuleEffectiveTimeFixedTimePeriod(data: any): RepricingRuleEffectiveTimeFixedTimePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Matcher that specifies eligible offers. When the USE_FEED_ATTRIBUTE option
 * is selected, only the repricing_rule_id attribute on the product feed is used
 * to specify offer-rule mapping. When the CUSTOM_FILTER option is selected,
 * only the *_matcher fields are used to filter the offers for offer-rule
 * mapping. If the CUSTOM_FILTER option is selected, an offer needs to satisfy
 * each custom filter matcher to be eligible for a rule. Size limit: the sum of
 * the number of entries in all the matchers should not exceed 20. For example,
 * there can be 15 product ids and 5 brands, but not 10 product ids and 11
 * brands.
 */
export interface RepricingRuleEligibleOfferMatcher {
  /**
   * Filter by the brand.
   */
  brandMatcher?: RepricingRuleEligibleOfferMatcherStringMatcher;
  /**
   * Filter by the item group id.
   */
  itemGroupIdMatcher?: RepricingRuleEligibleOfferMatcherStringMatcher;
  /**
   * Determines whether to use the custom matchers or the product feed
   * attribute "repricing_rule_id" to specify offer-rule mapping.
   */
  matcherOption?:  | "MATCHER_OPTION_UNSPECIFIED" | "MATCHER_OPTION_CUSTOM_FILTER" | "MATCHER_OPTION_USE_FEED_ATTRIBUTE" | "MATCHER_OPTION_ALL_PRODUCTS";
  /**
   * Filter by the offer id.
   */
  offerIdMatcher?: RepricingRuleEligibleOfferMatcherStringMatcher;
  /**
   * When true, the rule won't be applied to offers with active promotions.
   */
  skipWhenOnPromotion?: boolean;
}

/**
 * Matcher by string attributes.
 */
export interface RepricingRuleEligibleOfferMatcherStringMatcher {
  /**
   * String attributes, as long as such attribute of an offer is one of the
   * string attribute values, the offer is considered as passing the matcher.
   * The string matcher checks an offer for inclusivity in the string
   * attributes, not equality. Only literal string matching is supported, no
   * regex.
   */
  strAttributes?: string[];
}

/**
 * Resource that represents a daily Repricing rule report. Next ID: 11
 */
export interface RepricingRuleReport {
  /**
   * Stats specific to buybox winning rules for rule report (deprecated).
   */
  buyboxWinningRuleStats?: RepricingRuleReportBuyboxWinningRuleStats;
  /**
   * Date of the stats in this report. The report starts and ends according to
   * the merchant's timezone.
   */
  date?: Date;
  /**
   * List of product ids that are impacted by this rule during this reporting
   * period. Out of stock products and products not searched for by customers
   * are examples of non-impacted products.
   */
  impactedProducts?: string[];
  /**
   * List of all reasons the rule did not apply to the inapplicable products
   * during the specified reporting period.
   */
  inapplicabilityDetails?: InapplicabilityDetails[];
  /**
   * List of product ids that are inapplicable to this rule during this
   * reporting period. To get the inapplicable reason for a specific product,
   * see RepricingProductReport.
   */
  inapplicableProducts?: string[];
  /**
   * Total unit count of impacted products ordered while the rule was active on
   * the date of the report. This count includes all orders that were started
   * while the rule was active, even if the rule was no longer active when the
   * order was completed.
   */
  orderItemCount?: number;
  /**
   * Id of the Repricing rule for this report.
   */
  ruleId?: string;
  /**
   * Total GMV generated by impacted products while the rule was active on the
   * date of the report. This value includes all orders that were started while
   * the rule was active, even if the rule was no longer active when the order
   * was completed.
   */
  totalGmv?: PriceAmount;
  /**
   * Type of the rule.
   */
  type?:  | "REPRICING_RULE_TYPE_UNSPECIFIED" | "TYPE_STATS_BASED" | "TYPE_COGS_BASED" | "TYPE_SALES_VOLUME_BASED" | "TYPE_COMPETITIVE_PRICE";
}

function serializeRepricingRuleReport(data: any): RepricingRuleReport {
  return {
    ...data,
    inapplicabilityDetails: data["inapplicabilityDetails"] !== undefined ? data["inapplicabilityDetails"].map((item: any) => (serializeInapplicabilityDetails(item))) : undefined,
  };
}

function deserializeRepricingRuleReport(data: any): RepricingRuleReport {
  return {
    ...data,
    inapplicabilityDetails: data["inapplicabilityDetails"] !== undefined ? data["inapplicabilityDetails"].map((item: any) => (deserializeInapplicabilityDetails(item))) : undefined,
  };
}

/**
 * Stats specific to buybox winning rules for rule report.
 */
export interface RepricingRuleReportBuyboxWinningRuleStats {
  /**
   * Number of unique products that won the buybox with this rule during this
   * period of time.
   */
  buyboxWonProductCount?: number;
}

/**
 * Definition of a rule restriction. At least one of the following needs to be
 * true: (1) use_auto_pricing_min_price is true (2) floor.price_delta exists (3)
 * floor.percentage_delta exists If floor.price_delta and floor.percentage_delta
 * are both set on a rule, the highest value will be chosen by the Repricer. In
 * other words, for a product with a price of $50, if the
 * `floor.percentage_delta` is "-10" and the floor.price_delta is "-12", the
 * offer price will only be lowered $5 (10% lower than the original offer
 * price).
 */
export interface RepricingRuleRestriction {
  /**
   * The inclusive floor lower bound. The repricing rule only applies when new
   * price >= floor.
   */
  floor?: RepricingRuleRestrictionBoundary;
  /**
   * If true, use the AUTO_PRICING_MIN_PRICE offer attribute as the lower bound
   * of the rule. If use_auto_pricing_min_price is true, then only offers with
   * `AUTO_PRICING_MIN_PRICE` existing on the offer will get Repricer treatment,
   * even if a floor value is set on the rule. Also, if
   * use_auto_pricing_min_price is true, the floor restriction will be ignored.
   */
  useAutoPricingMinPrice?: boolean;
}

/**
 * Definition of a boundary.
 */
export interface RepricingRuleRestrictionBoundary {
  /**
   * The percentage delta relative to the offer selling price. This field is
   * signed. It must be negative in floor. When it is used in floor, it should
   * be > -100. For example, if an offer is selling at $10 and this field is -30
   * in floor, the repricing rule only applies if the calculated new price is >=
   * $7.
   */
  percentageDelta?: number;
  /**
   * The price micros relative to the offer selling price. This field is
   * signed. It must be negative in floor. For example, if an offer is selling
   * at $10 and this field is -$2 in floor, the repricing rule only applies if
   * the calculated new price is >= $8.
   */
  priceDelta?: string;
}

/**
 * Additional options for Content#repricingrulesCreate.
 */
export interface RepricingrulesCreateOptions {
  /**
   * Required. The id of the rule to create.
   */
  ruleId?: string;
}

/**
 * Additional options for Content#repricingrulesList.
 */
export interface RepricingrulesListOptions {
  /**
   * [CLDR country
   * code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml)
   * (e.g. "US"), used as a filter on repricing rules.
   */
  countryCode?: string;
  /**
   * The two-letter ISO 639-1 language code associated with the repricing rule,
   * used as a filter.
   */
  languageCode?: string;
  /**
   * The maximum number of repricing rules to return. The service may return
   * fewer than this value. If unspecified, at most 50 rules will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListRepricingRules` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListRepricingRules` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for Content#repricingrulesRepricingreportsList.
 */
export interface RepricingrulesRepricingreportsListOptions {
  /**
   * Gets Repricing reports on and before this date in the merchant's timezone.
   * You can only retrieve data up to 7 days ago (default) or earlier. Format:
   * YYYY-MM-DD.
   */
  endDate?: string;
  /**
   * Maximum number of daily reports to return. Each report includes data from
   * a single 24-hour period. The page size defaults to 50 and values above 1000
   * are coerced to 1000. This service may return fewer days than this value,
   * for example, if the time between your start and end date is less than page
   * size.
   */
  pageSize?: number;
  /**
   * Token (if provided) to retrieve the subsequent page. All other parameters
   * must match the original call that provided the page token.
   */
  pageToken?: string;
  /**
   * Gets Repricing reports on and after this date in the merchant's timezone,
   * up to one year ago. Do not use a start date later than 7 days ago
   * (default). Format: YYYY-MM-DD.
   */
  startDate?: string;
}

/**
 * Definition of stats based rule.
 */
export interface RepricingRuleStatsBasedRule {
  /**
   * The percent change against the price target. Valid from 0 to 100
   * inclusively.
   */
  percentageDelta?: number;
  /**
   * The price delta against the above price target. A positive value means the
   * price should be adjusted to be above statistical measure, and a negative
   * value means below. Currency code must not be included.
   */
  priceDelta?: string;
}

/**
 * Request message for the RequestPhoneVerification method.
 */
export interface RequestPhoneVerificationRequest {
  /**
   * Language code [IETF BCP 47 syntax](https://tools.ietf.org/html/bcp47) (for
   * example, en-US). Language code is used to provide localized `SMS` and
   * `PHONE_CALL`. Default language used is en-US if not provided.
   */
  languageCode?: string;
  /**
   * Phone number to be verified.
   */
  phoneNumber?: string;
  /**
   * Required. Two letter country code for the phone number, for example `CA`
   * for Canadian numbers. See the [ISO 3166-1
   * alpha-2](https://wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
   * officially assigned codes.
   */
  phoneRegionCode?: string;
  /**
   * Verification method to receive verification code.
   */
  phoneVerificationMethod?:  | "PHONE_VERIFICATION_METHOD_UNSPECIFIED" | "SMS" | "PHONE_CALL";
}

/**
 * Response message for the RequestPhoneVerification method.
 */
export interface RequestPhoneVerificationResponse {
  /**
   * The verification ID to use in subsequent calls to `verifyphonenumber`.
   */
  verificationId?: string;
}

/**
 * Request message for the RequestReviewProgram method.
 */
export interface RequestReviewBuyOnGoogleProgramRequest {
}

/**
 * Request message for the RequestReviewFreeListings Program method.
 */
export interface RequestReviewFreeListingsRequest {
  /**
   * The code [ISO 3166-1
   * alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country
   * for which review is to be requested.
   */
  regionCode?: string;
}

/**
 * Request message for the RequestReviewShoppingAds program method.
 */
export interface RequestReviewShoppingAdsRequest {
  /**
   * The code [ISO 3166-1
   * alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country
   * for which review is to be requested.
   */
  regionCode?: string;
}

/**
 * Return address resource.
 */
export interface ReturnAddress {
  /**
   * Required. The address.
   */
  address?: ReturnAddressAddress;
  /**
   * Required. The country of sale where the return address is applicable.
   */
  country?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnAddress`"
   */
  kind?: string;
  /**
   * Required. The user-defined label of the return address. For the default
   * address, use the label "default".
   */
  label?: string;
  /**
   * Required. The merchant's contact phone number regarding the return.
   */
  phoneNumber?: string;
  /**
   * Return address ID generated by Google.
   */
  returnAddressId?: string;
}

export interface ReturnAddressAddress {
  /**
   * CLDR country code (for example, "US").
   */
  country?: string;
  /**
   * City, town or commune. May also include dependent localities or
   * sublocalities (for example, neighborhoods or suburbs).
   */
  locality?: string;
  /**
   * Postal code or ZIP (for example, "94043").
   */
  postalCode?: string;
  /**
   * Name of the recipient to address returns to.
   */
  recipientName?: string;
  /**
   * Top-level administrative subdivision of the country. For example, a state
   * like California ("CA") or a province like Quebec ("QC").
   */
  region?: string;
  /**
   * Street-level part of the address. May be up to two lines, each line
   * specified as an array element.
   */
  streetAddress?: string[];
}

export interface ReturnaddressCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: ReturnaddressCustomBatchRequestEntry[];
}

function serializeReturnaddressCustomBatchRequest(data: any): ReturnaddressCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeReturnaddressCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeReturnaddressCustomBatchRequest(data: any): ReturnaddressCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeReturnaddressCustomBatchRequestEntry(item))) : undefined,
  };
}

export interface ReturnaddressCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The Merchant Center account ID.
   */
  merchantId?: bigint;
  /**
   * Method of the batch request entry. Acceptable values are: - "`delete`" -
   * "`get`" - "`insert`"
   */
  method?: string;
  /**
   * The return address to submit. This should be set only if the method is
   * `insert`.
   */
  returnAddress?: ReturnAddress;
  /**
   * The return address ID. This should be set only if the method is `delete`
   * or `get`.
   */
  returnAddressId?: string;
}

function serializeReturnaddressCustomBatchRequestEntry(data: any): ReturnaddressCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeReturnaddressCustomBatchRequestEntry(data: any): ReturnaddressCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

export interface ReturnaddressCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: ReturnaddressCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnaddressCustomBatchResponse`".
   */
  kind?: string;
}

export interface ReturnaddressCustomBatchResponseEntry {
  /**
   * The ID of the request entry to which this entry responds.
   */
  batchId?: number;
  /**
   * A list of errors defined if, and only if, the request failed.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnaddressCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The retrieved return address.
   */
  returnAddress?: ReturnAddress;
}

/**
 * Additional options for Content#returnaddressList.
 */
export interface ReturnaddressListOptions {
  /**
   * List only return addresses applicable to the given country of sale. When
   * omitted, all return addresses are listed.
   */
  country?: string;
  /**
   * The maximum number of addresses in the response, used for paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface ReturnaddressListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnaddressListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of addresses.
   */
  nextPageToken?: string;
  resources?: ReturnAddress[];
}

/**
 * Return policy resource.
 */
export interface ReturnPolicy {
  /**
   * Required. The country of sale where the return policy is applicable.
   */
  country?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnPolicy`"
   */
  kind?: string;
  /**
   * Required. The user-defined label of the return policy. For the default
   * policy, use the label "default".
   */
  label?: string;
  /**
   * Required. The name of the policy as shown in Merchant Center.
   */
  name?: string;
  /**
   * Return reasons that will incur return fees.
   */
  nonFreeReturnReasons?: string[];
  /**
   * Required. The policy.
   */
  policy?: ReturnPolicyPolicy;
  /**
   * Return policy ID generated by Google.
   */
  returnPolicyId?: string;
  /**
   * The return shipping fee that will apply to non free return reasons.
   */
  returnShippingFee?: Price;
  /**
   * An optional list of seasonal overrides.
   */
  seasonalOverrides?: ReturnPolicySeasonalOverride[];
}

function serializeReturnPolicy(data: any): ReturnPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeReturnPolicyPolicy(data["policy"]) : undefined,
    seasonalOverrides: data["seasonalOverrides"] !== undefined ? data["seasonalOverrides"].map((item: any) => (serializeReturnPolicySeasonalOverride(item))) : undefined,
  };
}

function deserializeReturnPolicy(data: any): ReturnPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeReturnPolicyPolicy(data["policy"]) : undefined,
    seasonalOverrides: data["seasonalOverrides"] !== undefined ? data["seasonalOverrides"].map((item: any) => (deserializeReturnPolicySeasonalOverride(item))) : undefined,
  };
}

export interface ReturnpolicyCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: ReturnpolicyCustomBatchRequestEntry[];
}

function serializeReturnpolicyCustomBatchRequest(data: any): ReturnpolicyCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeReturnpolicyCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeReturnpolicyCustomBatchRequest(data: any): ReturnpolicyCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeReturnpolicyCustomBatchRequestEntry(item))) : undefined,
  };
}

export interface ReturnpolicyCustomBatchRequestEntry {
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The Merchant Center account ID.
   */
  merchantId?: bigint;
  /**
   * Method of the batch request entry. Acceptable values are: - "`delete`" -
   * "`get`" - "`insert`"
   */
  method?: string;
  /**
   * The return policy to submit. This should be set only if the method is
   * `insert`.
   */
  returnPolicy?: ReturnPolicy;
  /**
   * The return policy ID. This should be set only if the method is `delete` or
   * `get`.
   */
  returnPolicyId?: string;
}

function serializeReturnpolicyCustomBatchRequestEntry(data: any): ReturnpolicyCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    returnPolicy: data["returnPolicy"] !== undefined ? serializeReturnPolicy(data["returnPolicy"]) : undefined,
  };
}

function deserializeReturnpolicyCustomBatchRequestEntry(data: any): ReturnpolicyCustomBatchRequestEntry {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    returnPolicy: data["returnPolicy"] !== undefined ? deserializeReturnPolicy(data["returnPolicy"]) : undefined,
  };
}

export interface ReturnpolicyCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: ReturnpolicyCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnpolicyCustomBatchResponse`".
   */
  kind?: string;
}

function serializeReturnpolicyCustomBatchResponse(data: any): ReturnpolicyCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeReturnpolicyCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeReturnpolicyCustomBatchResponse(data: any): ReturnpolicyCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeReturnpolicyCustomBatchResponseEntry(item))) : undefined,
  };
}

export interface ReturnpolicyCustomBatchResponseEntry {
  /**
   * The ID of the request entry to which this entry responds.
   */
  batchId?: number;
  /**
   * A list of errors defined if, and only if, the request failed.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnpolicyCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The retrieved return policy.
   */
  returnPolicy?: ReturnPolicy;
}

function serializeReturnpolicyCustomBatchResponseEntry(data: any): ReturnpolicyCustomBatchResponseEntry {
  return {
    ...data,
    returnPolicy: data["returnPolicy"] !== undefined ? serializeReturnPolicy(data["returnPolicy"]) : undefined,
  };
}

function deserializeReturnpolicyCustomBatchResponseEntry(data: any): ReturnpolicyCustomBatchResponseEntry {
  return {
    ...data,
    returnPolicy: data["returnPolicy"] !== undefined ? deserializeReturnPolicy(data["returnPolicy"]) : undefined,
  };
}

export interface ReturnpolicyListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#returnpolicyListResponse`".
   */
  kind?: string;
  resources?: ReturnPolicy[];
}

function serializeReturnpolicyListResponse(data: any): ReturnpolicyListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeReturnPolicy(item))) : undefined,
  };
}

function deserializeReturnpolicyListResponse(data: any): ReturnpolicyListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeReturnPolicy(item))) : undefined,
  };
}

/**
 * Return policy online object. This is currently used to represent return
 * policies for ads and free listings programs.
 */
export interface ReturnPolicyOnline {
  /**
   * The countries of sale where the return policy is applicable. The values
   * must be a valid 2 letter ISO 3166 code, e.g. "US".
   */
  countries?: string[];
  /**
   * The item conditions that are accepted for returns. This is required to not
   * be empty unless the type of return policy is noReturns.
   */
  itemConditions?:  | "ITEM_CONDITION_UNSPECIFIED" | "NEW" | "USED"[];
  /**
   * The unique user-defined label of the return policy. The same label cannot
   * be used in different return policies for the same country. Policies with
   * the label 'default' will apply to all products, unless a product specifies
   * a return_policy_label attribute.
   */
  label?: string;
  /**
   * The name of the policy as shown in Merchant Center.
   */
  name?: string;
  /**
   * The return policy.
   */
  policy?: ReturnPolicyOnlinePolicy;
  /**
   * The restocking fee that applies to all return reason categories. This
   * would be treated as a free restocking fee if the value is not set.
   */
  restockingFee?: ReturnPolicyOnlineRestockingFee;
  /**
   * The return methods of how customers can return an item. This value is
   * required to not be empty unless the type of return policy is noReturns.
   */
  returnMethods?:  | "RETURN_METHOD_UNSPECIFIED" | "BY_MAIL" | "IN_STORE" | "AT_A_KIOSK"[];
  /**
   * Output only. Return policy ID generated by Google.
   */
  readonly returnPolicyId?: string;
  /**
   * The return policy uri. This can used by Google to do a sanity check for
   * the policy.
   */
  returnPolicyUri?: string;
  /**
   * The return reason category information. This required to not be empty
   * unless the type of return policy is noReturns.
   */
  returnReasonCategoryInfo?: ReturnPolicyOnlineReturnReasonCategoryInfo[];
}

function serializeReturnPolicyOnline(data: any): ReturnPolicyOnline {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeReturnPolicyOnlinePolicy(data["policy"]) : undefined,
  };
}

function deserializeReturnPolicyOnline(data: any): ReturnPolicyOnline {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeReturnPolicyOnlinePolicy(data["policy"]) : undefined,
  };
}

/**
 * The available policies.
 */
export interface ReturnPolicyOnlinePolicy {
  /**
   * The number of days items can be returned after delivery, where one day is
   * defined to be 24 hours after the delivery timestamp. Required for
   * `numberOfDaysAfterDelivery` returns.
   */
  days?: bigint;
  /**
   * Policy type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "NUMBER_OF_DAYS_AFTER_DELIVERY" | "NO_RETURNS" | "LIFETIME_RETURNS";
}

function serializeReturnPolicyOnlinePolicy(data: any): ReturnPolicyOnlinePolicy {
  return {
    ...data,
    days: data["days"] !== undefined ? String(data["days"]) : undefined,
  };
}

function deserializeReturnPolicyOnlinePolicy(data: any): ReturnPolicyOnlinePolicy {
  return {
    ...data,
    days: data["days"] !== undefined ? BigInt(data["days"]) : undefined,
  };
}

/**
 * The restocking fee. This can either be a fixed fee or a micro percent.
 */
export interface ReturnPolicyOnlineRestockingFee {
  /**
   * Fixed restocking fee.
   */
  fixedFee?: PriceAmount;
  /**
   * Percent of total price in micros. 15,000,000 means 15% of the total price
   * would be charged.
   */
  microPercent?: number;
}

/**
 * The return reason category info wrapper.
 */
export interface ReturnPolicyOnlineReturnReasonCategoryInfo {
  /**
   * The corresponding return label source.
   */
  returnLabelSource?:  | "RETURN_LABEL_SOURCE_UNSPECIFIED" | "DOWNLOAD_AND_PRINT" | "IN_THE_BOX" | "CUSTOMER_RESPONSIBILITY";
  /**
   * The return reason category.
   */
  returnReasonCategory?:  | "RETURN_REASON_CATEGORY_UNSPECIFIED" | "BUYER_REMORSE" | "ITEM_DEFECT";
  /**
   * The corresponding return shipping fee. This is only applicable when
   * returnLabelSource is not the customer's responsibility.
   */
  returnShippingFee?: ReturnPolicyOnlineReturnShippingFee;
}

/**
 * The return shipping fee. This can either be a fixed fee or a boolean to
 * indicate that the customer pays the actual shipping cost.
 */
export interface ReturnPolicyOnlineReturnShippingFee {
  /**
   * Fixed return shipping fee amount. This value is only applicable when type
   * is FIXED. We will treat the return shipping fee as free if type is FIXED
   * and this value is not set.
   */
  fixedFee?: PriceAmount;
  /**
   * Type of return shipping fee.
   */
  type?:  | "TYPE_UNSPECIFIED" | "FIXED" | "CUSTOMER_PAYING_ACTUAL_FEE";
}

export interface ReturnPolicyPolicy {
  /**
   * Required. Last day for returning the items. In ISO 8601 format. When
   * specifying the return window like this, set the policy type to
   * "lastReturnDate". Use this for seasonal overrides only.
   */
  lastReturnDate?: string;
  /**
   * The number of days items can be returned after delivery, where one day is
   * defined to be 24 hours after the delivery timestamp. When specifying the
   * return window like this, set the policy type to
   * "numberOfDaysAfterDelivery". Acceptable values are 30, 45, 60, 90, 100,
   * 180, 270 and 365 for the default policy. Additional policies further allow
   * 14, 15, 21 and 28 days, but note that for most items a minimum of 30 days
   * is required for returns. Exceptions may be made for electronics. A policy
   * of less than 30 days can only be applied to those items.
   */
  numberOfDays?: bigint;
  /**
   * Policy type. Use "lastReturnDate" for seasonal overrides only. Note that
   * for most items a minimum of 30 days is required for returns. Exceptions may
   * be made for electronics or non-returnable items such as food, perishables,
   * and living things. A policy of less than 30 days can only be applied to
   * those items. Acceptable values are: - "`lastReturnDate`" -
   * "`lifetimeReturns`" - "`noReturns`" - "`numberOfDaysAfterDelivery`"
   */
  type?: string;
}

function serializeReturnPolicyPolicy(data: any): ReturnPolicyPolicy {
  return {
    ...data,
    numberOfDays: data["numberOfDays"] !== undefined ? String(data["numberOfDays"]) : undefined,
  };
}

function deserializeReturnPolicyPolicy(data: any): ReturnPolicyPolicy {
  return {
    ...data,
    numberOfDays: data["numberOfDays"] !== undefined ? BigInt(data["numberOfDays"]) : undefined,
  };
}

export interface ReturnPolicySeasonalOverride {
  /**
   * Required. Last day on which the override applies. In ISO 8601 format.
   */
  endDate?: string;
  /**
   * Required. The name of the seasonal override as shown in Merchant Center.
   */
  name?: string;
  /**
   * Required. The policy which is in effect during that time.
   */
  policy?: ReturnPolicyPolicy;
  /**
   * Required. First day on which the override applies. In ISO 8601 format.
   */
  startDate?: string;
}

function serializeReturnPolicySeasonalOverride(data: any): ReturnPolicySeasonalOverride {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeReturnPolicyPolicy(data["policy"]) : undefined,
  };
}

function deserializeReturnPolicySeasonalOverride(data: any): ReturnPolicySeasonalOverride {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeReturnPolicyPolicy(data["policy"]) : undefined,
  };
}

export interface ReturnPricingInfo {
  /**
   * Default option for whether merchant should charge the customer for return
   * shipping costs, based on customer selected return reason and merchant's
   * return policy for the items being returned.
   */
  chargeReturnShippingFee?: boolean;
  /**
   * Maximum return shipping costs that may be charged to the customer
   * depending on merchant's assessment of the return reason and the merchant's
   * return policy for the items being returned.
   */
  maxReturnShippingFee?: MonetaryAmount;
  /**
   * Total amount that can be refunded for the items in this return. It
   * represents the total amount received by the merchant for the items, after
   * applying merchant coupons.
   */
  refundableItemsTotalAmount?: MonetaryAmount;
  /**
   * Maximum amount that can be refunded for the original shipping fee.
   */
  refundableShippingAmount?: MonetaryAmount;
  /**
   * Total amount already refunded by the merchant. It includes all types of
   * refunds (items, shipping, etc.) Not provided if no refund has been applied
   * yet.
   */
  totalRefundedAmount?: MonetaryAmount;
}

export interface ReturnShipment {
  /**
   * The date of creation of the shipment, in ISO 8601 format.
   */
  creationDate?: string;
  /**
   * The date of delivery of the shipment, in ISO 8601 format.
   */
  deliveryDate?: string;
  /**
   * Type of the return method. Acceptable values are: - "`byMail`" -
   * "`contactCustomerSupport`" - "`returnless`" - "`inStore`"
   */
  returnMethodType?: string;
  /**
   * Shipment ID generated by Google.
   */
  shipmentId?: string;
  /**
   * Tracking information of the shipment. One return shipment might be handled
   * by several shipping carriers sequentially.
   */
  shipmentTrackingInfos?: ShipmentTrackingInfo[];
  /**
   * The date of shipping of the shipment, in ISO 8601 format.
   */
  shippingDate?: string;
  /**
   * State of the shipment. Acceptable values are: - "`completed`" - "`new`" -
   * "`shipped`" - "`undeliverable`" - "`pending`"
   */
  state?: string;
}

/**
 * Return shipping label for a Buy on Google merchant-managed return.
 */
export interface ReturnShippingLabel {
  /**
   * Name of the carrier.
   */
  carrier?: string;
  /**
   * The URL for the return shipping label in PDF format
   */
  labelUri?: string;
  /**
   * The tracking id of this return label.
   */
  trackingId?: string;
}

export interface Row {
  /**
   * The list of cells that constitute the row. Must have the same length as
   * `columnHeaders` for two-dimensional tables, a length of 1 for
   * one-dimensional tables. Required.
   */
  cells?: Value[];
}

/**
 * Request message for the ReportService.Search method.
 */
export interface SearchRequest {
  /**
   * Number of ReportRows to retrieve in a single page. Defaults to the maximum
   * of 1000. Values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * Token of the page to retrieve. If not specified, the first page of results
   * is returned. In order to request the next page of results, the value
   * obtained from `next_page_token` in the previous response should be used.
   */
  pageToken?: string;
  /**
   * Required. Query that defines performance metrics to retrieve and
   * dimensions according to which the metrics are to be segmented. For details
   * on how to construct your query, see the [Query Language
   * guide](https://developers.google.com/shopping-content/guides/reports/query-language/overview).
   */
  query?: string;
}

/**
 * Response message for the ReportService.Search method.
 */
export interface SearchResponse {
  /**
   * Token which can be sent as `page_token` to retrieve the next page. If
   * omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Rows that matched the search query.
   */
  results?: ReportRow[];
}

function serializeSearchResponse(data: any): SearchResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeReportRow(item))) : undefined,
  };
}

function deserializeSearchResponse(data: any): SearchResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeReportRow(item))) : undefined,
  };
}

/**
 * Dimensions according to which metrics are segmented in the response. Values
 * of product dimensions, such as `offer_id`, reflect the state of a product at
 * the time of the corresponding event, for example, impression or order.
 * Segment fields cannot be selected in queries without also selecting at least
 * one metric field. Values are only set for dimensions requested explicitly in
 * the request's search query.
 */
export interface Segments {
  /**
   * Brand of the product.
   */
  brand?: string;
  /**
   * [Product category (1st
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in Google's product taxonomy.
   */
  categoryL1?: string;
  /**
   * [Product category (2nd
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in Google's product taxonomy.
   */
  categoryL2?: string;
  /**
   * [Product category (3rd
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in Google's product taxonomy.
   */
  categoryL3?: string;
  /**
   * [Product category (4th
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in Google's product taxonomy.
   */
  categoryL4?: string;
  /**
   * [Product category (5th
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in Google's product taxonomy.
   */
  categoryL5?: string;
  /**
   * Currency in which price metrics are represented, for example, if you
   * select `ordered_item_sales_micros`, the returned value will be represented
   * by this currency.
   */
  currencyCode?: string;
  /**
   * Code of the country where the customer is located at the time of the
   * event. Represented in the ISO 3166 format. If the customer country cannot
   * be determined, a special 'ZZ' code is returned.
   */
  customerCountryCode?: string;
  /**
   * Custom label 0 for custom grouping of products.
   */
  customLabel0?: string;
  /**
   * Custom label 1 for custom grouping of products.
   */
  customLabel1?: string;
  /**
   * Custom label 2 for custom grouping of products.
   */
  customLabel2?: string;
  /**
   * Custom label 3 for custom grouping of products.
   */
  customLabel3?: string;
  /**
   * Custom label 4 for custom grouping of products.
   */
  customLabel4?: string;
  /**
   * Date in the merchant timezone to which metrics apply.
   */
  date?: Date;
  /**
   * Merchant-provided id of the product.
   */
  offerId?: string;
  /**
   * [Product type (1st
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in merchant's own product taxonomy.
   */
  productTypeL1?: string;
  /**
   * [Product type (2nd
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in merchant's own product taxonomy.
   */
  productTypeL2?: string;
  /**
   * [Product type (3rd
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in merchant's own product taxonomy.
   */
  productTypeL3?: string;
  /**
   * [Product type (4th
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in merchant's own product taxonomy.
   */
  productTypeL4?: string;
  /**
   * [Product type (5th
   * level)](https://developers.google.com/shopping-content/guides/reports/segmentation#category_and_product_type)
   * in merchant's own product taxonomy.
   */
  productTypeL5?: string;
  /**
   * Program to which metrics apply, for example, Free Product Listing.
   */
  program?:  | "PROGRAM_UNSPECIFIED" | "SHOPPING_ADS" | "FREE_PRODUCT_LISTING" | "FREE_LOCAL_PRODUCT_LISTING" | "BUY_ON_GOOGLE_LISTING";
  /**
   * Title of the product.
   */
  title?: string;
  /**
   * First day of the week (Monday) of the metrics date in the merchant
   * timezone.
   */
  week?: Date;
}

export interface Service {
  /**
   * A boolean exposing the active status of the shipping service. Required.
   */
  active?: boolean;
  /**
   * The CLDR code of the currency to which this service applies. Must match
   * that of the prices in rate groups.
   */
  currency?: string;
  /**
   * The CLDR territory code of the country to which the service applies.
   * Required.
   */
  deliveryCountry?: string;
  /**
   * Time spent in various aspects from order to the delivery of the product.
   * Required.
   */
  deliveryTime?: DeliveryTime;
  /**
   * Eligibility for this service. Acceptable values are: - "`All scenarios`" -
   * "`All scenarios except Shopping Actions`" - "`Shopping Actions`"
   */
  eligibility?: string;
  /**
   * Minimum order value for this service. If set, indicates that customers
   * will have to spend at least this amount. All prices within a service must
   * have the same currency. Cannot be set together with
   * minimum_order_value_table.
   */
  minimumOrderValue?: Price;
  /**
   * Table of per store minimum order values for the pickup fulfillment type.
   * Cannot be set together with minimum_order_value.
   */
  minimumOrderValueTable?: MinimumOrderValueTable;
  /**
   * Free-form name of the service. Must be unique within target account.
   * Required.
   */
  name?: string;
  /**
   * The carrier-service pair delivering items to collection points. The list
   * of supported pickup services can be retrieved through the
   * `getSupportedPickupServices` method. Required if and only if the service
   * delivery type is `pickup`.
   */
  pickupService?: PickupCarrierService;
  /**
   * Shipping rate group definitions. Only the last one is allowed to have an
   * empty `applicableShippingLabels`, which means "everything else". The other
   * `applicableShippingLabels` must not overlap.
   */
  rateGroups?: RateGroup[];
  /**
   * Type of locations this service ships orders to. Acceptable values are: -
   * "`delivery`" - "`pickup`"
   */
  shipmentType?: string;
}

/**
 * Settlement reports detail order-level and item-level credits and debits
 * between you and Google.
 */
export interface SettlementReport {
  /**
   * The end date on which all transactions are included in the report, in ISO
   * 8601 format.
   */
  endDate?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#settlementReport`"
   */
  kind?: string;
  /**
   * The residual amount from the previous invoice. This is set only if the
   * previous invoices are not paid because of negative balance.
   */
  previousBalance?: Price;
  /**
   * The ID of the settlement report.
   */
  settlementId?: string;
  /**
   * The start date on which all transactions are included in the report, in
   * ISO 8601 format.
   */
  startDate?: string;
  /**
   * The money due to the merchant.
   */
  transferAmount?: Price;
  /**
   * Date on which transfer for this payment was initiated by Google, in ISO
   * 8601 format.
   */
  transferDate?: string;
  /**
   * The list of bank identifiers used for the transfer. For example, Trace ID
   * for Federal Automated Clearing House (ACH). This may also be known as the
   * Wire ID.
   */
  transferIds?: string[];
}

/**
 * Additional options for Content#settlementreportsList.
 */
export interface SettlementreportsListOptions {
  /**
   * The maximum number of settlements to return in the response, used for
   * paging. The default value is 200 returns per page, and the maximum allowed
   * value is 5000 returns per page.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * Obtains settlements which have transactions before this date
   * (inclusively), in ISO 8601 format.
   */
  transferEndDate?: string;
  /**
   * Obtains settlements which have transactions after this date (inclusively),
   * in ISO 8601 format.
   */
  transferStartDate?: string;
}

export interface SettlementreportsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#settlementreportsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of returns.
   */
  nextPageToken?: string;
  resources?: SettlementReport[];
}

/**
 * Settlement transactions give a detailed breakdown of the settlement report.
 */
export interface SettlementTransaction {
  /**
   * The amount for the transaction.
   */
  amount?: SettlementTransactionAmount;
  /**
   * Identifiers of the transaction.
   */
  identifiers?: SettlementTransactionIdentifiers;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#settlementTransaction`"
   */
  kind?: string;
  /**
   * Details of the transaction.
   */
  transaction?: SettlementTransactionTransaction;
}

export interface SettlementTransactionAmount {
  commission?: SettlementTransactionAmountCommission;
  /**
   * The description of the event. Acceptable values are: - "`taxWithhold`" -
   * "`principal`" - "`principalAdjustment`" - "`shippingFee`" -
   * "`merchantRemittedSalesTax`" - "`googleRemittedSalesTax`" -
   * "`merchantCoupon`" - "`merchantCouponTax`" -
   * "`merchantRemittedDisposalTax`" - "`googleRemittedDisposalTax`" -
   * "`merchantRemittedRedemptionFee`" - "`googleRemittedRedemptionFee`" -
   * "`eeeEcoFee`" - "`furnitureEcoFee`" - "`copyPrivateFee`" -
   * "`eeeEcoFeeCommission`" - "`furnitureEcoFeeCommission`" -
   * "`copyPrivateFeeCommission`" - "`principalRefund`" - "`principalRefundTax`"
   * - "`itemCommission`" - "`adjustmentCommission`" - "`shippingFeeCommission`"
   * - "`commissionRefund`" - "`damaged`" - "`damagedOrDefectiveItem`" -
   * "`expiredItem`" - "`faultyItem`" - "`incorrectItemReceived`" -
   * "`itemMissing`" - "`qualityNotExpected`" - "`receivedTooLate`" -
   * "`storePackageMissing`" - "`transitPackageMissing`" -
   * "`unsuccessfulDeliveryUndeliverable`" - "`wrongChargeInStore`" -
   * "`wrongItem`" - "`returns`" - "`undeliverable`" -
   * "`issueRelatedRefundAndReplacementAmountDescription`" -
   * "`refundFromMerchant`" - "`returnLabelShippingFee`" - "`lumpSumCorrection`"
   * - "`pspFee`" - "`principalRefundDoesNotFit`" -
   * "`principalRefundOrderedWrongItem`" - "`principalRefundQualityNotExpected`"
   * - "`principalRefundBetterPriceFound`" - "`principalRefundNoLongerNeeded`" -
   * "`principalRefundChangedMind`" - "`principalRefundReceivedTooLate`" -
   * "`principalRefundIncorrectItemReceived`" -
   * "`principalRefundDamagedOrDefectiveItem`" -
   * "`principalRefundDidNotMatchDescription`" - "`principalRefundExpiredItem`"
   */
  description?: string;
  /**
   * The amount that contributes to the line item price.
   */
  transactionAmount?: Price;
  /**
   * The type of the amount. Acceptable values are: - "`itemPrice`" -
   * "`orderPrice`" - "`refund`" - "`earlyRefund`" - "`courtesyRefund`" -
   * "`returnRefund`" - "`returnLabelShippingFeeAmount`" -
   * "`lumpSumCorrectionAmount`"
   */
  type?: string;
}

export interface SettlementTransactionAmountCommission {
  /**
   * The category of the commission. Acceptable values are: -
   * "`animalsAndPetSupplies`" - "`dogCatFoodAndCatLitter`" -
   * "`apparelAndAccessories`" - "`shoesHandbagsAndSunglasses`" -
   * "`costumesAndAccessories`" - "`jewelry`" - "`watches`" -
   * "`hobbiesArtsAndCrafts`" - "`homeAndGarden`" -
   * "`entertainmentCollectibles`" - "`collectibleCoins`" -
   * "`sportsCollectibles`" - "`sportingGoods`" - "`toysAndGames`" -
   * "`musicalInstruments`" - "`giftCards`" - "`babyAndToddler`" -
   * "`babyFoodWipesAndDiapers`" - "`businessAndIndustrial`" -
   * "`camerasOpticsAndPhotography`" - "`consumerElectronics`" -
   * "`electronicsAccessories`" - "`personalComputers`" - "`videoGameConsoles`"
   * - "`foodAndGrocery`" - "`beverages`" - "`tobaccoProducts`" - "`furniture`"
   * - "`hardware`" - "`buildingMaterials`" - "`tools`" -
   * "`healthAndPersonalCare`" - "`beauty`" - "`householdSupplies`" -
   * "`kitchenAndDining`" - "`majorAppliances`" - "`luggageAndBags`" - "`media`"
   * - "`officeSupplies`" - "`softwareAndVideoGames`" -
   * "`vehiclePartsAndAccessories`" - "`vehicleTiresAndWheels`" - "`vehicles`" -
   * "`everythingElse`"
   */
  category?: string;
  /**
   * Rate of the commission in percentage.
   */
  rate?: string;
}

export interface SettlementTransactionIdentifiers {
  /**
   * The identifier of the adjustments, if it's available.
   */
  adjustmentId?: string;
  /**
   * The merchant provided order ID.
   */
  merchantOrderId?: string;
  /**
   * The identifier of the item.
   */
  orderItemId?: string;
  /**
   * The unique ID of the settlement transaction entry.
   */
  settlementEntryId?: string;
  /**
   * The shipment ids for the item.
   */
  shipmentIds?: string[];
  /**
   * The Google transaction ID.
   */
  transactionId?: string;
}

/**
 * Additional options for Content#settlementtransactionsList.
 */
export interface SettlementtransactionsListOptions {
  /**
   * The maximum number of transactions to return in the response, used for
   * paging. The default value is 200 transactions per page, and the maximum
   * allowed value is 5000 transactions per page.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * The list of transactions to return. If not set, all transactions will be
   * returned.
   */
  transactionIds?: string;
}

export interface SettlementtransactionsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#settlementtransactionsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of returns.
   */
  nextPageToken?: string;
  resources?: SettlementTransaction[];
}

export interface SettlementTransactionTransaction {
  /**
   * The time on which the event occurred in ISO 8601 format.
   */
  postDate?: string;
  /**
   * The type of the transaction that occurred. Acceptable values are: -
   * "`order`" - "`reversal`" - "`orderRefund`" - "`reversalRefund`" -
   * "`issueRelatedRefundAndReplacement`" -
   * "`returnLabelShippingFeeTransaction`" -
   * "`reversalIssueRelatedRefundAndReplacement`" -
   * "`reversalReturnLabelShippingFeeTransaction`" -
   * "`lumpSumCorrectionTransaction`"
   */
  type?: string;
}

export interface ShipmentInvoice {
  /**
   * [required] Invoice summary.
   */
  invoiceSummary?: InvoiceSummary;
  /**
   * [required] Invoice details per line item.
   */
  lineItemInvoices?: ShipmentInvoiceLineItemInvoice[];
  /**
   * [required] ID of the shipment group. It is assigned by the merchant in the
   * `shipLineItems` method and is used to group multiple line items that have
   * the same kind of shipping charges.
   */
  shipmentGroupId?: string;
}

export interface ShipmentInvoiceLineItemInvoice {
  /**
   * ID of the line item. Either lineItemId or productId must be set.
   */
  lineItemId?: string;
  /**
   * ID of the product. This is the REST ID used in the products service.
   * Either lineItemId or productId must be set.
   */
  productId?: string;
  /**
   * [required] The shipment unit ID is assigned by the merchant and defines
   * individual quantities within a line item. The same ID can be assigned to
   * units that are the same while units that differ must be assigned a
   * different ID (for example: free or promotional units).
   */
  shipmentUnitIds?: string[];
  /**
   * [required] Invoice details for a single unit.
   */
  unitInvoice?: UnitInvoice;
}

export interface ShipmentTrackingInfo {
  /**
   * The shipping carrier that handles the package. Acceptable values are: -
   * "`boxtal`" - "`bpost`" - "`chronopost`" - "`colisPrive`" - "`colissimo`" -
   * "`cxt`" - "`deliv`" - "`dhl`" - "`dpd`" - "`dynamex`" - "`eCourier`" -
   * "`easypost`" - "`efw`" - "`fedex`" - "`fedexSmartpost`" - "`geodis`" -
   * "`gls`" - "`googleCourier`" - "`gsx`" - "`jdLogistics`" - "`laPoste`" -
   * "`lasership`" - "`manual`" - "`mpx`" - "`onTrac`" - "`other`" - "`tnt`" -
   * "`uds`" - "`ups`" - "`usps`"
   */
  carrier?: string;
  /**
   * The tracking number for the package.
   */
  trackingNumber?: string;
}

/**
 * The merchant account's shipping settings. All methods except
 * getsupportedcarriers and getsupportedholidays require the admin role.
 */
export interface ShippingSettings {
  /**
   * The ID of the account to which these account shipping settings belong.
   * Ignored upon update, always present in get request responses.
   */
  accountId?: bigint;
  /**
   * A list of postal code groups that can be referred to in `services`.
   * Optional.
   */
  postalCodeGroups?: PostalCodeGroup[];
  /**
   * The target account's list of services. Optional.
   */
  services?: Service[];
  /**
   * Optional. A list of warehouses which can be referred to in `services`.
   */
  warehouses?: Warehouse[];
}

function serializeShippingSettings(data: any): ShippingSettings {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    warehouses: data["warehouses"] !== undefined ? data["warehouses"].map((item: any) => (serializeWarehouse(item))) : undefined,
  };
}

function deserializeShippingSettings(data: any): ShippingSettings {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    warehouses: data["warehouses"] !== undefined ? data["warehouses"].map((item: any) => (deserializeWarehouse(item))) : undefined,
  };
}

export interface ShippingsettingsCustomBatchRequest {
  /**
   * The request entries to be processed in the batch.
   */
  entries?: ShippingsettingsCustomBatchRequestEntry[];
}

function serializeShippingsettingsCustomBatchRequest(data: any): ShippingsettingsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeShippingsettingsCustomBatchRequestEntry(item))) : undefined,
  };
}

function deserializeShippingsettingsCustomBatchRequest(data: any): ShippingsettingsCustomBatchRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeShippingsettingsCustomBatchRequestEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch shippingsettings request.
 */
export interface ShippingsettingsCustomBatchRequestEntry {
  /**
   * The ID of the account for which to get/update account shipping settings.
   */
  accountId?: bigint;
  /**
   * An entry ID, unique within the batch request.
   */
  batchId?: number;
  /**
   * The ID of the managing account.
   */
  merchantId?: bigint;
  /**
   * The method of the batch entry. Acceptable values are: - "`get`" -
   * "`update`"
   */
  method?: string;
  /**
   * The account shipping settings to update. Only defined if the method is
   * `update`.
   */
  shippingSettings?: ShippingSettings;
}

function serializeShippingsettingsCustomBatchRequestEntry(data: any): ShippingsettingsCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
    shippingSettings: data["shippingSettings"] !== undefined ? serializeShippingSettings(data["shippingSettings"]) : undefined,
  };
}

function deserializeShippingsettingsCustomBatchRequestEntry(data: any): ShippingsettingsCustomBatchRequestEntry {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
    shippingSettings: data["shippingSettings"] !== undefined ? deserializeShippingSettings(data["shippingSettings"]) : undefined,
  };
}

export interface ShippingsettingsCustomBatchResponse {
  /**
   * The result of the execution of the batch requests.
   */
  entries?: ShippingsettingsCustomBatchResponseEntry[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsCustomBatchResponse`".
   */
  kind?: string;
}

function serializeShippingsettingsCustomBatchResponse(data: any): ShippingsettingsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeShippingsettingsCustomBatchResponseEntry(item))) : undefined,
  };
}

function deserializeShippingsettingsCustomBatchResponse(data: any): ShippingsettingsCustomBatchResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeShippingsettingsCustomBatchResponseEntry(item))) : undefined,
  };
}

/**
 * A batch entry encoding a single non-batch shipping settings response.
 */
export interface ShippingsettingsCustomBatchResponseEntry {
  /**
   * The ID of the request entry to which this entry responds.
   */
  batchId?: number;
  /**
   * A list of errors for failed custombatch entries. *Note:* Schema errors
   * fail the whole request.
   */
  errors?: Errors;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsCustomBatchResponseEntry`"
   */
  kind?: string;
  /**
   * The retrieved or updated account shipping settings.
   */
  shippingSettings?: ShippingSettings;
}

function serializeShippingsettingsCustomBatchResponseEntry(data: any): ShippingsettingsCustomBatchResponseEntry {
  return {
    ...data,
    shippingSettings: data["shippingSettings"] !== undefined ? serializeShippingSettings(data["shippingSettings"]) : undefined,
  };
}

function deserializeShippingsettingsCustomBatchResponseEntry(data: any): ShippingsettingsCustomBatchResponseEntry {
  return {
    ...data,
    shippingSettings: data["shippingSettings"] !== undefined ? deserializeShippingSettings(data["shippingSettings"]) : undefined,
  };
}

export interface ShippingsettingsGetSupportedCarriersResponse {
  /**
   * A list of supported carriers. May be empty.
   */
  carriers?: CarriersCarrier[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsGetSupportedCarriersResponse`".
   */
  kind?: string;
}

export interface ShippingsettingsGetSupportedHolidaysResponse {
  /**
   * A list of holidays applicable for delivery guarantees. May be empty.
   */
  holidays?: HolidaysHoliday[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsGetSupportedHolidaysResponse`".
   */
  kind?: string;
}

function serializeShippingsettingsGetSupportedHolidaysResponse(data: any): ShippingsettingsGetSupportedHolidaysResponse {
  return {
    ...data,
    holidays: data["holidays"] !== undefined ? data["holidays"].map((item: any) => (serializeHolidaysHoliday(item))) : undefined,
  };
}

function deserializeShippingsettingsGetSupportedHolidaysResponse(data: any): ShippingsettingsGetSupportedHolidaysResponse {
  return {
    ...data,
    holidays: data["holidays"] !== undefined ? data["holidays"].map((item: any) => (deserializeHolidaysHoliday(item))) : undefined,
  };
}

export interface ShippingsettingsGetSupportedPickupServicesResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsGetSupportedPickupServicesResponse`".
   */
  kind?: string;
  /**
   * A list of supported pickup services. May be empty.
   */
  pickupServices?: PickupServicesPickupService[];
}

/**
 * Additional options for Content#shippingsettingsList.
 */
export interface ShippingsettingsListOptions {
  /**
   * The maximum number of shipping settings to return in the response, used
   * for paging.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

export interface ShippingsettingsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#shippingsettingsListResponse`".
   */
  kind?: string;
  /**
   * The token for the retrieval of the next page of shipping settings.
   */
  nextPageToken?: string;
  resources?: ShippingSettings[];
}

function serializeShippingsettingsListResponse(data: any): ShippingsettingsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeShippingSettings(item))) : undefined,
  };
}

function deserializeShippingsettingsListResponse(data: any): ShippingsettingsListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeShippingSettings(item))) : undefined,
  };
}

/**
 * Response message for GetShoppingAdsProgramStatus.
 */
export interface ShoppingAdsProgramStatus {
  /**
   * State of the program. `ENABLED` if there are offers for at least one
   * region.
   */
  globalState?:  | "PROGRAM_STATE_UNSPECIFIED" | "NOT_ENABLED" | "NO_OFFERS_UPLOADED" | "ENABLED";
  /**
   * Status of the program in each region. Regions with the same status and
   * review eligibility are grouped together in `regionCodes`.
   */
  regionStatuses?: ShoppingAdsProgramStatusRegionStatus[];
}

function serializeShoppingAdsProgramStatus(data: any): ShoppingAdsProgramStatus {
  return {
    ...data,
    regionStatuses: data["regionStatuses"] !== undefined ? data["regionStatuses"].map((item: any) => (serializeShoppingAdsProgramStatusRegionStatus(item))) : undefined,
  };
}

function deserializeShoppingAdsProgramStatus(data: any): ShoppingAdsProgramStatus {
  return {
    ...data,
    regionStatuses: data["regionStatuses"] !== undefined ? data["regionStatuses"].map((item: any) => (deserializeShoppingAdsProgramStatusRegionStatus(item))) : undefined,
  };
}

/**
 * Status of program and region.
 */
export interface ShoppingAdsProgramStatusRegionStatus {
  /**
   * Date by which eligibilityStatus will go from `WARNING` to `DISAPPROVED`.
   * Only visible when your eligibilityStatus is WARNING. In [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DD`.
   */
  disapprovalDate?: string;
  /**
   * Eligibility status of the Shopping Ads program.
   */
  eligibilityStatus?:  | "STATE_UNSPECIFIED" | "APPROVED" | "DISAPPROVED" | "WARNING" | "UNDER_REVIEW" | "PENDING_REVIEW" | "ONBOARDING";
  /**
   * Issues that must be fixed to be eligible for review.
   */
  onboardingIssues?: string[];
  /**
   * The two-letter [ISO 3166-1
   * alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes for all
   * the regions with the same `eligibilityStatus` and `reviewEligibility`.
   */
  regionCodes?: string[];
  /**
   * If a program is eligible for review in a specific region. Only visible if
   * `eligibilityStatus` is `DISAPPROVED`.
   */
  reviewEligibilityStatus?:  | "REVIEW_ELIGIBILITY_UNSPECIFIED" | "ELIGIBLE" | "INELIGIBLE";
  /**
   * Review ineligibility reason if account is not eligible for review.
   */
  reviewIneligibilityReason?:  | "REVIEW_INELIGIBILITY_REASON_UNSPECIFIED" | "ONBOARDING_ISSUES" | "NOT_ENOUGH_OFFERS" | "IN_COOLDOWN_PERIOD" | "ALREADY_UNDER_REVIEW" | "NO_REVIEW_REQUIRED" | "WILL_BE_REVIEWED_AUTOMATICALLY" | "IS_RETIRED" | "ALREADY_REVIEWED";
  /**
   * Reason a program in a specific region isn’t eligible for review. Only
   * visible if `reviewEligibilityStatus` is `INELIGIBLE`.
   */
  reviewIneligibilityReasonDescription?: string;
  /**
   * Additional information for ineligibility. If `reviewIneligibilityReason`
   * is `IN_COOLDOWN_PERIOD`, a timestamp for the end of the cooldown period is
   * provided.
   */
  reviewIneligibilityReasonDetails?: ShoppingAdsProgramStatusReviewIneligibilityReasonDetails;
  /**
   * Issues evaluated in the review process. Fix all issues before requesting a
   * review.
   */
  reviewIssues?: string[];
}

function serializeShoppingAdsProgramStatusRegionStatus(data: any): ShoppingAdsProgramStatusRegionStatus {
  return {
    ...data,
    reviewIneligibilityReasonDetails: data["reviewIneligibilityReasonDetails"] !== undefined ? serializeShoppingAdsProgramStatusReviewIneligibilityReasonDetails(data["reviewIneligibilityReasonDetails"]) : undefined,
  };
}

function deserializeShoppingAdsProgramStatusRegionStatus(data: any): ShoppingAdsProgramStatusRegionStatus {
  return {
    ...data,
    reviewIneligibilityReasonDetails: data["reviewIneligibilityReasonDetails"] !== undefined ? deserializeShoppingAdsProgramStatusReviewIneligibilityReasonDetails(data["reviewIneligibilityReasonDetails"]) : undefined,
  };
}

/**
 * Additional details for review ineligibility reasons.
 */
export interface ShoppingAdsProgramStatusReviewIneligibilityReasonDetails {
  /**
   * This timestamp represents end of cooldown period for review ineligbility
   * reason `IN_COOLDOWN_PERIOD`.
   */
  cooldownTime?: Date;
}

function serializeShoppingAdsProgramStatusReviewIneligibilityReasonDetails(data: any): ShoppingAdsProgramStatusReviewIneligibilityReasonDetails {
  return {
    ...data,
    cooldownTime: data["cooldownTime"] !== undefined ? data["cooldownTime"].toISOString() : undefined,
  };
}

function deserializeShoppingAdsProgramStatusReviewIneligibilityReasonDetails(data: any): ShoppingAdsProgramStatusReviewIneligibilityReasonDetails {
  return {
    ...data,
    cooldownTime: data["cooldownTime"] !== undefined ? new Date(data["cooldownTime"]) : undefined,
  };
}

export interface Table {
  /**
   * Headers of the table's columns. Optional: if not set then the table has
   * only one dimension.
   */
  columnHeaders?: Headers;
  /**
   * Name of the table. Required for subtables, ignored for the main table.
   */
  name?: string;
  /**
   * Headers of the table's rows. Required.
   */
  rowHeaders?: Headers;
  /**
   * The list of rows that constitute the table. Must have the same length as
   * `rowHeaders`. Required.
   */
  rows?: Row[];
}

export interface TestOrder {
  /**
   * Overrides the predefined delivery details if provided.
   */
  deliveryDetails?: TestOrderDeliveryDetails;
  /**
   * Whether the orderinvoices service should support this order.
   */
  enableOrderinvoices?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "`content#testOrder`"
   */
  kind?: string;
  /**
   * Required. Line items that are ordered. At least one line item must be
   * provided.
   */
  lineItems?: TestOrderLineItem[];
  /**
   * Restricted. Do not use.
   */
  notificationMode?: string;
  /**
   * Overrides the predefined pickup details if provided.
   */
  pickupDetails?: TestOrderPickupDetails;
  /**
   * Required. The billing address. Acceptable values are: - "`dwight`" -
   * "`jim`" - "`pam`"
   */
  predefinedBillingAddress?: string;
  /**
   * Required. Identifier of one of the predefined delivery addresses for the
   * delivery. Acceptable values are: - "`dwight`" - "`jim`" - "`pam`"
   */
  predefinedDeliveryAddress?: string;
  /**
   * Required. Email address of the customer. Acceptable values are: -
   * "`pog.dwight.schrute@gmail.com`" - "`pog.jim.halpert@gmail.com`" -
   * "`penpog.pam.beesly@gmail.comding`"
   */
  predefinedEmail?: string;
  /**
   * Identifier of one of the predefined pickup details. Required for orders
   * containing line items with shipping type `pickup`. Acceptable values are: -
   * "`dwight`" - "`jim`" - "`pam`"
   */
  predefinedPickupDetails?: string;
  /**
   * Promotions associated with the order.
   */
  promotions?: OrderPromotion[];
  /**
   * Required. The price of shipping for all items. Shipping tax is
   * automatically calculated for orders where marketplace facilitator tax laws
   * are applicable. Otherwise, tax settings from Merchant Center are applied.
   * Note that shipping is not taxed in certain states.
   */
  shippingCost?: Price;
  /**
   * Required. The requested shipping option. Acceptable values are: -
   * "`economy`" - "`expedited`" - "`oneDay`" - "`sameDay`" - "`standard`" -
   * "`twoDay`"
   */
  shippingOption?: string;
}

export interface TestOrderAddress {
  /**
   * CLDR country code (for example, "US").
   */
  country?: string;
  /**
   * Strings representing the lines of the printed label for mailing the order,
   * for example: John Smith 1600 Amphitheatre Parkway Mountain View, CA, 94043
   * United States
   */
  fullAddress?: string[];
  /**
   * Whether the address is a post office box.
   */
  isPostOfficeBox?: boolean;
  /**
   * City, town or commune. May also include dependent localities or
   * sublocalities (for example, neighborhoods or suburbs).
   */
  locality?: string;
  /**
   * Postal Code or ZIP (for example, "94043").
   */
  postalCode?: string;
  /**
   * Name of the recipient.
   */
  recipientName?: string;
  /**
   * Top-level administrative subdivision of the country. For example, a state
   * like California ("CA") or a province like Quebec ("QC").
   */
  region?: string;
  /**
   * Street-level part of the address. Use `\n` to add a second line.
   */
  streetAddress?: string[];
}

export interface TestOrderDeliveryDetails {
  /**
   * The delivery address
   */
  address?: TestOrderAddress;
  /**
   * Whether the order is scheduled delivery order.
   */
  isScheduledDelivery?: boolean;
  /**
   * The phone number of the person receiving the delivery.
   */
  phoneNumber?: string;
}

export interface TestOrderLineItem {
  /**
   * Required. Product data from the time of the order placement.
   */
  product?: TestOrderLineItemProduct;
  /**
   * Required. Number of items ordered.
   */
  quantityOrdered?: number;
  /**
   * Required. Details of the return policy for the line item.
   */
  returnInfo?: OrderLineItemReturnInfo;
  /**
   * Required. Details of the requested shipping for the line item.
   */
  shippingDetails?: OrderLineItemShippingDetails;
}

export interface TestOrderLineItemProduct {
  /**
   * Required. Brand of the item.
   */
  brand?: string;
  /**
   * Required. Condition or state of the item. Acceptable values are: - "`new`"
   * 
   */
  condition?: string;
  /**
   * Required. The two-letter ISO 639-1 language code for the item. Acceptable
   * values are: - "`en`" - "`fr`"
   */
  contentLanguage?: string;
  /**
   * Fees for the item. Optional.
   */
  fees?: OrderLineItemProductFee[];
  /**
   * Global Trade Item Number (GTIN) of the item. Optional.
   */
  gtin?: string;
  /**
   * Required. URL of an image of the item.
   */
  imageLink?: string;
  /**
   * Shared identifier for all variants of the same product. Optional.
   */
  itemGroupId?: string;
  /**
   * Manufacturer Part Number (MPN) of the item. Optional.
   */
  mpn?: string;
  /**
   * Required. An identifier of the item.
   */
  offerId?: string;
  /**
   * Required. The price for the product. Tax is automatically calculated for
   * orders where marketplace facilitator tax laws are applicable. Otherwise,
   * tax settings from Merchant Center are applied.
   */
  price?: Price;
  /**
   * Required. The CLDR territory code of the target country of the product.
   */
  targetCountry?: string;
  /**
   * Required. The title of the product.
   */
  title?: string;
  /**
   * Variant attributes for the item. Optional.
   */
  variantAttributes?: OrderLineItemProductVariantAttribute[];
}

export interface TestOrderPickupDetails {
  /**
   * Required. Code of the location defined by provider or merchant.
   */
  locationCode?: string;
  /**
   * Required. Pickup location address.
   */
  pickupLocationAddress?: TestOrderAddress;
  /**
   * Pickup location type. Acceptable values are: - "`locker`" - "`store`" -
   * "`curbside`"
   */
  pickupLocationType?: string;
  /**
   * Required. all pickup persons set by users.
   */
  pickupPersons?: TestOrderPickupDetailsPickupPerson[];
}

export interface TestOrderPickupDetailsPickupPerson {
  /**
   * Required. Full name of the pickup person.
   */
  name?: string;
  /**
   * Required. The phone number of the person picking up the items.
   */
  phoneNumber?: string;
}

/**
 * A message that represents a time period.
 */
export interface TimePeriod {
  /**
   * The ending timestamp.
   */
  endTime?: Date;
  /**
   * The starting timestamp.
   */
  startTime?: Date;
}

function serializeTimePeriod(data: any): TimePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimePeriod(data: any): TimePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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

export interface TransitTable {
  /**
   * A list of postal group names. The last value can be `"all other
   * locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The
   * referred postal code groups must match the delivery country of the service.
   */
  postalCodeGroupNames?: string[];
  rows?: TransitTableTransitTimeRow[];
  /**
   * A list of transit time labels. The last value can be `"all other labels"`.
   * Example: `["food", "electronics", "all other labels"]`.
   */
  transitTimeLabels?: string[];
}

export interface TransitTableTransitTimeRow {
  values?: TransitTableTransitTimeRowTransitTimeValue[];
}

export interface TransitTableTransitTimeRowTransitTimeValue {
  /**
   * Must be greater than or equal to `minTransitTimeInDays`.
   */
  maxTransitTimeInDays?: number;
  /**
   * Transit time range (min-max) in business days. 0 means same day delivery,
   * 1 means next day delivery.
   */
  minTransitTimeInDays?: number;
}

/**
 * Request message for the UndeleteConversionSource method.
 */
export interface UndeleteConversionSourceRequest {
}

export interface UnitInvoice {
  /**
   * Additional charges for a unit, for example, shipping costs.
   */
  additionalCharges?: UnitInvoiceAdditionalCharge[];
  /**
   * [required] Pre-tax or post-tax price of one unit depending on the locality
   * of the order. *Note:* Invoicing works on a per unit basis. The `unitPrice`
   * is the price of a single unit, and will be multiplied by the number of
   * entries in `shipmentUnitId`.
   */
  unitPrice?: Price;
  /**
   * Tax amounts to apply to the unit price.
   */
  unitPriceTaxes?: UnitInvoiceTaxLine[];
}

export interface UnitInvoiceAdditionalCharge {
  /**
   * [required] Amount of the additional charge per unit. *Note:* Invoicing
   * works on a per unit bases. The `additionalChargeAmount` is the amount
   * charged per unit, and will be multiplied by the number of entries in
   * `shipmentUnitID`.
   */
  additionalChargeAmount?: Amount;
  /**
   * [required] Type of the additional charge. Acceptable values are: -
   * "`shipping`"
   */
  type?: string;
}

export interface UnitInvoiceTaxLine {
  /**
   * [required] Tax amount for the tax type.
   */
  taxAmount?: Price;
  /**
   * Optional name of the tax type. This should only be provided if `taxType`
   * is `otherFeeTax`.
   */
  taxName?: string;
  /**
   * [required] Type of the tax. Acceptable values are: - "`otherFee`" -
   * "`otherFeeTax`" - "`sales`"
   */
  taxType?: string;
}

/**
 * The single value of a rate group or the value of a rate group table's cell.
 * Exactly one of `noShipping`, `flatRate`, `pricePercentage`,
 * `carrierRateName`, `subtableName` must be set.
 */
export interface Value {
  /**
   * The name of a carrier rate referring to a carrier rate defined in the same
   * rate group. Can only be set if all other fields are not set.
   */
  carrierRateName?: string;
  /**
   * A flat rate. Can only be set if all other fields are not set.
   */
  flatRate?: Price;
  /**
   * If true, then the product can't ship. Must be true when set, can only be
   * set if all other fields are not set.
   */
  noShipping?: boolean;
  /**
   * A percentage of the price represented as a number in decimal notation (for
   * example, `"5.4"`). Can only be set if all other fields are not set.
   */
  pricePercentage?: string;
  /**
   * The name of a subtable. Can only be set in table cells (not for single
   * values), and only if all other fields are not set.
   */
  subtableName?: string;
}

/**
 * Request message for the VerifyPhoneNumber method.
 */
export interface VerifyPhoneNumberRequest {
  /**
   * Verification method used to receive verification code.
   */
  phoneVerificationMethod?:  | "PHONE_VERIFICATION_METHOD_UNSPECIFIED" | "SMS" | "PHONE_CALL";
  /**
   * The verification code that was sent to the phone number for validation.
   */
  verificationCode?: string;
  /**
   * The verification ID returned by `requestphoneverification`.
   */
  verificationId?: string;
}

/**
 * Response message for the VerifyPhoneNumber method.
 */
export interface VerifyPhoneNumberResponse {
  /**
   * Verified phone number if verification is successful. This phone number can
   * only be replaced by another verified phone number.
   */
  verifiedPhoneNumber?: string;
}

/**
 * A fulfillment warehouse, which stores and handles inventory.
 */
export interface Warehouse {
  /**
   * Business days of the warehouse. If not set, will be Monday to Friday by
   * default.
   */
  businessDayConfig?: BusinessDayConfig;
  /**
   * Required. The latest time of day that an order can be accepted and begin
   * processing. Later orders will be processed in the next day. The time is
   * based on the warehouse postal code.
   */
  cutoffTime?: WarehouseCutoffTime;
  /**
   * Required. The number of days it takes for this warehouse to pack up and
   * ship an item. This is on the warehouse level, but can be overridden on the
   * offer level based on the attributes of an item.
   */
  handlingDays?: bigint;
  /**
   * Required. The name of the warehouse. Must be unique within account.
   */
  name?: string;
  /**
   * Required. Shipping address of the warehouse.
   */
  shippingAddress?: Address;
}

function serializeWarehouse(data: any): Warehouse {
  return {
    ...data,
    handlingDays: data["handlingDays"] !== undefined ? String(data["handlingDays"]) : undefined,
  };
}

function deserializeWarehouse(data: any): Warehouse {
  return {
    ...data,
    handlingDays: data["handlingDays"] !== undefined ? BigInt(data["handlingDays"]) : undefined,
  };
}

export interface WarehouseBasedDeliveryTime {
  /**
   * Required. Carrier, such as `"UPS"` or `"Fedex"`. The list of supported
   * carriers can be retrieved through the `listSupportedCarriers` method.
   */
  carrier?: string;
  /**
   * Required. Carrier service, such as `"ground"` or `"2 days"`. The list of
   * supported services for a carrier can be retrieved through the
   * `listSupportedCarriers` method. The name of the service must be in the
   * eddSupportedServices list.
   */
  carrierService?: string;
  /**
   * Shipping origin's state.
   */
  originAdministrativeArea?: string;
  /**
   * Shipping origin's city.
   */
  originCity?: string;
  /**
   * Shipping origin's country represented as a [CLDR territory
   * code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml).
   */
  originCountry?: string;
  /**
   * Shipping origin.
   */
  originPostalCode?: string;
  /**
   * Shipping origin's street address.
   */
  originStreetAddress?: string;
  /**
   * The name of the warehouse. Warehouse name need to be matched with name. If
   * warehouseName is set, the below fields will be ignored. The warehouse info
   * will be read from warehouse.
   */
  warehouseName?: string;
}

export interface WarehouseCutoffTime {
  /**
   * Required. Hour (24-hour clock) of the cutoff time until which an order has
   * to be placed to be processed in the same day by the warehouse. Hour is
   * based on the timezone of warehouse.
   */
  hour?: number;
  /**
   * Required. Minute of the cutoff time until which an order has to be placed
   * to be processed in the same day by the warehouse. Minute is based on the
   * timezone of warehouse.
   */
  minute?: number;
}

export interface Weight {
  /**
   * Required. The weight unit. Acceptable values are: - "`kg`" - "`lb`"
   */
  unit?: string;
  /**
   * Required. The weight represented as a number. The weight can have a
   * maximum precision of four decimal places.
   */
  value?: string;
}