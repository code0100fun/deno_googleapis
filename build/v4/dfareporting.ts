// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Campaign Manager 360 API Client for Deno
 * ========================================
 * 
 * Build applications to efficiently manage large or complex trafficking, reporting, and attribution workflows for Campaign Manager 360.
 * 
 * Docs: https://developers.google.com/doubleclick-advertisers/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Build applications to efficiently manage large or complex trafficking,
 * reporting, and attribution workflows for Campaign Manager 360.
 */
export class dfareporting {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dfareporting.googleapis.com/dfareporting/v4/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the account's active ad summary by account ID.
   *
   * @param profileId User profile ID associated with this request.
   * @param summaryAccountId Account ID.
   */
  async accountActiveAdSummariesGet(profileId: bigint, summaryAccountId: bigint): Promise<AccountActiveAdSummary> {
    profileId = String(profileId);
    summaryAccountId = String(summaryAccountId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountActiveAdSummaries/${ summaryAccountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountActiveAdSummary(data);
  }

  /**
   * Gets one account permission group by ID.
   *
   * @param id Account permission group ID.
   * @param profileId User profile ID associated with this request.
   */
  async accountPermissionGroupsGet(id: bigint, profileId: bigint): Promise<AccountPermissionGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountPermissionGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountPermissionGroup(data);
  }

  /**
   * Retrieves the list of account permission groups.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountPermissionGroupsList(profileId: bigint): Promise<AccountPermissionGroupsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountPermissionGroups`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountPermissionGroupsListResponse(data);
  }

  /**
   * Gets one account permission by ID.
   *
   * @param id Account permission ID.
   * @param profileId User profile ID associated with this request.
   */
  async accountPermissionsGet(id: bigint, profileId: bigint): Promise<AccountPermission> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountPermissions/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountPermission(data);
  }

  /**
   * Retrieves the list of account permissions.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountPermissionsList(profileId: bigint): Promise<AccountPermissionsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountPermissions`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountPermissionsListResponse(data);
  }

  /**
   * Gets one account by ID.
   *
   * @param id Account ID.
   * @param profileId User profile ID associated with this request.
   */
  async accountsGet(id: bigint, profileId: bigint): Promise<Account> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accounts/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccount(data);
  }

  /**
   * Retrieves the list of accounts, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountsList(profileId: bigint, opts: AccountsListOptions = {}): Promise<AccountsListResponse> {
    profileId = String(profileId);
    opts = serializeAccountsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accounts`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountsListResponse(data);
  }

  /**
   * Updates an existing account. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountsPatch(profileId: bigint, req: Account, opts: AccountsPatchOptions = {}): Promise<Account> {
    profileId = String(profileId);
    req = serializeAccount(req);
    opts = serializeAccountsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accounts`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAccount(data);
  }

  /**
   * Updates an existing account.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountsUpdate(profileId: bigint, req: Account): Promise<Account> {
    profileId = String(profileId);
    req = serializeAccount(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAccount(data);
  }

  /**
   * Gets one account user profile by ID.
   *
   * @param id User profile ID.
   * @param profileId User profile ID associated with this request.
   */
  async accountUserProfilesGet(id: bigint, profileId: bigint): Promise<AccountUserProfile> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountUserProfiles/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountUserProfile(data);
  }

  /**
   * Inserts a new account user profile.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountUserProfilesInsert(profileId: bigint, req: AccountUserProfile): Promise<AccountUserProfile> {
    profileId = String(profileId);
    req = serializeAccountUserProfile(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountUserProfiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountUserProfile(data);
  }

  /**
   * Retrieves a list of account user profiles, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountUserProfilesList(profileId: bigint, opts: AccountUserProfilesListOptions = {}): Promise<AccountUserProfilesListResponse> {
    profileId = String(profileId);
    opts = serializeAccountUserProfilesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountUserProfiles`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    if (opts.userRoleId !== undefined) {
      url.searchParams.append("userRoleId", String(opts.userRoleId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccountUserProfilesListResponse(data);
  }

  /**
   * Updates an existing account user profile. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountUserProfilesPatch(profileId: bigint, req: AccountUserProfile, opts: AccountUserProfilesPatchOptions = {}): Promise<AccountUserProfile> {
    profileId = String(profileId);
    req = serializeAccountUserProfile(req);
    opts = serializeAccountUserProfilesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountUserProfiles`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAccountUserProfile(data);
  }

  /**
   * Updates an existing account user profile.
   *
   * @param profileId User profile ID associated with this request.
   */
  async accountUserProfilesUpdate(profileId: bigint, req: AccountUserProfile): Promise<AccountUserProfile> {
    profileId = String(profileId);
    req = serializeAccountUserProfile(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/accountUserProfiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAccountUserProfile(data);
  }

  /**
   * Gets one ad by ID.
   *
   * @param id Ad ID.
   * @param profileId User profile ID associated with this request.
   */
  async adsGet(id: bigint, profileId: bigint): Promise<Ad> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/ads/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAd(data);
  }

  /**
   * Inserts a new ad.
   *
   * @param profileId User profile ID associated with this request.
   */
  async adsInsert(profileId: bigint, req: Ad): Promise<Ad> {
    profileId = String(profileId);
    req = serializeAd(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/ads`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAd(data);
  }

  /**
   * Retrieves a list of ads, possibly filtered. This method supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async adsList(profileId: bigint, opts: AdsListOptions = {}): Promise<AdsListResponse> {
    profileId = String(profileId);
    opts = serializeAdsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/ads`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.archived !== undefined) {
      url.searchParams.append("archived", String(opts.archived));
    }
    if (opts.audienceSegmentIds !== undefined) {
      url.searchParams.append("audienceSegmentIds", String(opts.audienceSegmentIds));
    }
    if (opts.campaignIds !== undefined) {
      url.searchParams.append("campaignIds", String(opts.campaignIds));
    }
    if (opts.compatibility !== undefined) {
      url.searchParams.append("compatibility", String(opts.compatibility));
    }
    if (opts.creativeIds !== undefined) {
      url.searchParams.append("creativeIds", String(opts.creativeIds));
    }
    if (opts.creativeOptimizationConfigurationIds !== undefined) {
      url.searchParams.append("creativeOptimizationConfigurationIds", String(opts.creativeOptimizationConfigurationIds));
    }
    if (opts.dynamicClickTracker !== undefined) {
      url.searchParams.append("dynamicClickTracker", String(opts.dynamicClickTracker));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.landingPageIds !== undefined) {
      url.searchParams.append("landingPageIds", String(opts.landingPageIds));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.overriddenEventTagId !== undefined) {
      url.searchParams.append("overriddenEventTagId", String(opts.overriddenEventTagId));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.placementIds !== undefined) {
      url.searchParams.append("placementIds", String(opts.placementIds));
    }
    if (opts.remarketingListIds !== undefined) {
      url.searchParams.append("remarketingListIds", String(opts.remarketingListIds));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sizeIds !== undefined) {
      url.searchParams.append("sizeIds", String(opts.sizeIds));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.sslCompliant !== undefined) {
      url.searchParams.append("sslCompliant", String(opts.sslCompliant));
    }
    if (opts.sslRequired !== undefined) {
      url.searchParams.append("sslRequired", String(opts.sslRequired));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdsListResponse(data);
  }

  /**
   * Updates an existing ad. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async adsPatch(profileId: bigint, req: Ad, opts: AdsPatchOptions = {}): Promise<Ad> {
    profileId = String(profileId);
    req = serializeAd(req);
    opts = serializeAdsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/ads`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAd(data);
  }

  /**
   * Updates an existing ad.
   *
   * @param profileId User profile ID associated with this request.
   */
  async adsUpdate(profileId: bigint, req: Ad): Promise<Ad> {
    profileId = String(profileId);
    req = serializeAd(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/ads`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAd(data);
  }

  /**
   * Deletes an existing advertiser group.
   *
   * @param id Advertiser group ID.
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one advertiser group by ID.
   *
   * @param id Advertiser group ID.
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsGet(id: bigint, profileId: bigint): Promise<AdvertiserGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertiserGroup(data);
  }

  /**
   * Inserts a new advertiser group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsInsert(profileId: bigint, req: AdvertiserGroup): Promise<AdvertiserGroup> {
    profileId = String(profileId);
    req = serializeAdvertiserGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAdvertiserGroup(data);
  }

  /**
   * Retrieves a list of advertiser groups, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsList(profileId: bigint, opts: AdvertiserGroupsListOptions = {}): Promise<AdvertiserGroupsListResponse> {
    profileId = String(profileId);
    opts = serializeAdvertiserGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertiserGroupsListResponse(data);
  }

  /**
   * Updates an existing advertiser group. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsPatch(profileId: bigint, req: AdvertiserGroup, opts: AdvertiserGroupsPatchOptions = {}): Promise<AdvertiserGroup> {
    profileId = String(profileId);
    req = serializeAdvertiserGroup(req);
    opts = serializeAdvertiserGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAdvertiserGroup(data);
  }

  /**
   * Updates an existing advertiser group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserGroupsUpdate(profileId: bigint, req: AdvertiserGroup): Promise<AdvertiserGroup> {
    profileId = String(profileId);
    req = serializeAdvertiserGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAdvertiserGroup(data);
  }

  /**
   * Retrieves a list of invoices for a particular issue month. The api only
   * works if the billing profile invoice level is set to either advertiser or
   * campaign non-consolidated invoice level.
   *
   * @param advertiserId Advertiser ID of this invoice.
   * @param profileId User profile ID associated with this request.
   */
  async advertiserInvoicesList(advertiserId: bigint, profileId: bigint, opts: AdvertiserInvoicesListOptions = {}): Promise<AdvertiserInvoicesListResponse> {
    advertiserId = String(advertiserId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers/${ advertiserId }/invoices`);
    if (opts.issueMonth !== undefined) {
      url.searchParams.append("issueMonth", String(opts.issueMonth));
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
    return deserializeAdvertiserInvoicesListResponse(data);
  }

  /**
   * Gets one landing page by ID.
   *
   * @param id Landing page ID.
   * @param profileId User profile ID associated with this request.
   */
  async advertiserLandingPagesGet(id: bigint, profileId: bigint): Promise<LandingPage> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserLandingPages/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLandingPage(data);
  }

  /**
   * Inserts a new landing page.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserLandingPagesInsert(profileId: bigint, req: LandingPage): Promise<LandingPage> {
    profileId = String(profileId);
    req = serializeLandingPage(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserLandingPages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLandingPage(data);
  }

  /**
   * Retrieves a list of landing pages.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserLandingPagesList(profileId: bigint, opts: AdvertiserLandingPagesListOptions = {}): Promise<AdvertiserLandingPagesListResponse> {
    profileId = String(profileId);
    opts = serializeAdvertiserLandingPagesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserLandingPages`);
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.archived !== undefined) {
      url.searchParams.append("archived", String(opts.archived));
    }
    if (opts.campaignIds !== undefined) {
      url.searchParams.append("campaignIds", String(opts.campaignIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertiserLandingPagesListResponse(data);
  }

  /**
   * Updates an existing advertiser landing page. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserLandingPagesPatch(profileId: bigint, req: LandingPage, opts: AdvertiserLandingPagesPatchOptions = {}): Promise<LandingPage> {
    profileId = String(profileId);
    req = serializeLandingPage(req);
    opts = serializeAdvertiserLandingPagesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserLandingPages`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeLandingPage(data);
  }

  /**
   * Updates an existing landing page.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertiserLandingPagesUpdate(profileId: bigint, req: LandingPage): Promise<LandingPage> {
    profileId = String(profileId);
    req = serializeLandingPage(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertiserLandingPages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLandingPage(data);
  }

  /**
   * Gets one advertiser by ID.
   *
   * @param id Advertiser ID.
   * @param profileId User profile ID associated with this request.
   */
  async advertisersGet(id: bigint, profileId: bigint): Promise<Advertiser> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Inserts a new advertiser.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertisersInsert(profileId: bigint, req: Advertiser): Promise<Advertiser> {
    profileId = String(profileId);
    req = serializeAdvertiser(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Retrieves a list of advertisers, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertisersList(profileId: bigint, opts: AdvertisersListOptions = {}): Promise<AdvertisersListResponse> {
    profileId = String(profileId);
    opts = serializeAdvertisersListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers`);
    if (opts.advertiserGroupIds !== undefined) {
      url.searchParams.append("advertiserGroupIds", String(opts.advertiserGroupIds));
    }
    if (opts.floodlightConfigurationIds !== undefined) {
      url.searchParams.append("floodlightConfigurationIds", String(opts.floodlightConfigurationIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.includeAdvertisersWithoutGroupsOnly !== undefined) {
      url.searchParams.append("includeAdvertisersWithoutGroupsOnly", String(opts.includeAdvertisersWithoutGroupsOnly));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.onlyParent !== undefined) {
      url.searchParams.append("onlyParent", String(opts.onlyParent));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertisersListResponse(data);
  }

  /**
   * Updates an existing advertiser. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertisersPatch(profileId: bigint, req: Advertiser, opts: AdvertisersPatchOptions = {}): Promise<Advertiser> {
    profileId = String(profileId);
    req = serializeAdvertiser(req);
    opts = serializeAdvertisersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Updates an existing advertiser.
   *
   * @param profileId User profile ID associated with this request.
   */
  async advertisersUpdate(profileId: bigint, req: Advertiser): Promise<Advertiser> {
    profileId = String(profileId);
    req = serializeAdvertiser(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/advertisers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Inserts a new billing assignment and returns the new assignment. Only one
   * of advertiser_id or campaign_id is support per request. If the new
   * assignment has no effect (assigning a campaign to the parent advertiser
   * billing profile or assigning an advertiser to the account billing profile),
   * no assignment will be returned.
   *
   * @param billingProfileId Billing profile ID of this billing assignment.
   * @param profileId User profile ID associated with this request.
   */
  async billingAssignmentsInsert(billingProfileId: bigint, profileId: bigint, req: BillingAssignment): Promise<BillingAssignment> {
    billingProfileId = String(billingProfileId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles/${ billingProfileId }/billingAssignments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BillingAssignment;
  }

  /**
   * Retrieves a list of billing assignments.
   *
   * @param billingProfileId Billing profile ID of this billing assignment.
   * @param profileId User profile ID associated with this request.
   */
  async billingAssignmentsList(billingProfileId: bigint, profileId: bigint): Promise<BillingAssignmentsListResponse> {
    billingProfileId = String(billingProfileId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles/${ billingProfileId }/billingAssignments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BillingAssignmentsListResponse;
  }

  /**
   * Gets one billing profile by ID.
   *
   * @param id Billing Profile ID.
   * @param profileId User profile ID associated with this request.
   */
  async billingProfilesGet(id: bigint, profileId: bigint): Promise<BillingProfile> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBillingProfile(data);
  }

  /**
   * Retrieves a list of billing profiles, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async billingProfilesList(profileId: bigint, opts: BillingProfilesListOptions = {}): Promise<BillingProfilesListResponse> {
    profileId = String(profileId);
    opts = serializeBillingProfilesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles`);
    if (opts.currency_code !== undefined) {
      url.searchParams.append("currency_code", String(opts.currency_code));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.onlySuggestion !== undefined) {
      url.searchParams.append("onlySuggestion", String(opts.onlySuggestion));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.subaccountIds !== undefined) {
      url.searchParams.append("subaccountIds", String(opts.subaccountIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBillingProfilesListResponse(data);
  }

  /**
   * Updates an existing billing profile.
   *
   * @param profileId User profile ID associated with this request.
   */
  async billingProfilesUpdate(profileId: bigint, req: BillingProfile): Promise<BillingProfile> {
    profileId = String(profileId);
    req = serializeBillingProfile(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeBillingProfile(data);
  }

  /**
   * Retrieves a list of billing rates. This method supports paging.
   *
   * @param billingProfileId Billing profile ID of this billing rate.
   * @param profileId User profile ID associated with this request.
   */
  async billingRatesList(billingProfileId: bigint, profileId: bigint): Promise<BillingRatesListResponse> {
    billingProfileId = String(billingProfileId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/billingProfiles/${ billingProfileId }/billingRates`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBillingRatesListResponse(data);
  }

  /**
   * Retrieves a list of browsers.
   *
   * @param profileId User profile ID associated with this request.
   */
  async browsersList(profileId: bigint): Promise<BrowsersListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/browsers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBrowsersListResponse(data);
  }

  /**
   * Associates a creative with the specified campaign. This method creates a
   * default ad with dimensions matching the creative in the campaign if such a
   * default ad does not exist already.
   *
   * @param campaignId Campaign ID in this association.
   * @param profileId User profile ID associated with this request.
   */
  async campaignCreativeAssociationsInsert(campaignId: bigint, profileId: bigint, req: CampaignCreativeAssociation): Promise<CampaignCreativeAssociation> {
    campaignId = String(campaignId);
    profileId = String(profileId);
    req = serializeCampaignCreativeAssociation(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns/${ campaignId }/campaignCreativeAssociations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCampaignCreativeAssociation(data);
  }

  /**
   * Retrieves the list of creative IDs associated with the specified campaign.
   * This method supports paging.
   *
   * @param campaignId Campaign ID in this association.
   * @param profileId User profile ID associated with this request.
   */
  async campaignCreativeAssociationsList(campaignId: bigint, profileId: bigint, opts: CampaignCreativeAssociationsListOptions = {}): Promise<CampaignCreativeAssociationsListResponse> {
    campaignId = String(campaignId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns/${ campaignId }/campaignCreativeAssociations`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCampaignCreativeAssociationsListResponse(data);
  }

  /**
   * Gets one campaign by ID.
   *
   * @param id Campaign ID.
   * @param profileId User profile ID associated with this request.
   */
  async campaignsGet(id: bigint, profileId: bigint): Promise<Campaign> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCampaign(data);
  }

  /**
   * Inserts a new campaign.
   *
   * @param profileId User profile ID associated with this request.
   */
  async campaignsInsert(profileId: bigint, req: Campaign): Promise<Campaign> {
    profileId = String(profileId);
    req = serializeCampaign(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCampaign(data);
  }

  /**
   * Retrieves a list of campaigns, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async campaignsList(profileId: bigint, opts: CampaignsListOptions = {}): Promise<CampaignsListResponse> {
    profileId = String(profileId);
    opts = serializeCampaignsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns`);
    if (opts.advertiserGroupIds !== undefined) {
      url.searchParams.append("advertiserGroupIds", String(opts.advertiserGroupIds));
    }
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.archived !== undefined) {
      url.searchParams.append("archived", String(opts.archived));
    }
    if (opts.atLeastOneOptimizationActivity !== undefined) {
      url.searchParams.append("atLeastOneOptimizationActivity", String(opts.atLeastOneOptimizationActivity));
    }
    if (opts.excludedIds !== undefined) {
      url.searchParams.append("excludedIds", String(opts.excludedIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.overriddenEventTagId !== undefined) {
      url.searchParams.append("overriddenEventTagId", String(opts.overriddenEventTagId));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCampaignsListResponse(data);
  }

  /**
   * Updates an existing campaign. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async campaignsPatch(profileId: bigint, req: Campaign, opts: CampaignsPatchOptions = {}): Promise<Campaign> {
    profileId = String(profileId);
    req = serializeCampaign(req);
    opts = serializeCampaignsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCampaign(data);
  }

  /**
   * Updates an existing campaign.
   *
   * @param profileId User profile ID associated with this request.
   */
  async campaignsUpdate(profileId: bigint, req: Campaign): Promise<Campaign> {
    profileId = String(profileId);
    req = serializeCampaign(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/campaigns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCampaign(data);
  }

  /**
   * Gets one change log by ID.
   *
   * @param id Change log ID.
   * @param profileId User profile ID associated with this request.
   */
  async changeLogsGet(id: bigint, profileId: bigint): Promise<ChangeLog> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/changeLogs/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChangeLog(data);
  }

  /**
   * Retrieves a list of change logs. This method supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async changeLogsList(profileId: bigint, opts: ChangeLogsListOptions = {}): Promise<ChangeLogsListResponse> {
    profileId = String(profileId);
    opts = serializeChangeLogsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/changeLogs`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxChangeTime !== undefined) {
      url.searchParams.append("maxChangeTime", String(opts.maxChangeTime));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.minChangeTime !== undefined) {
      url.searchParams.append("minChangeTime", String(opts.minChangeTime));
    }
    if (opts.objectIds !== undefined) {
      url.searchParams.append("objectIds", String(opts.objectIds));
    }
    if (opts.objectType !== undefined) {
      url.searchParams.append("objectType", String(opts.objectType));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.userProfileIds !== undefined) {
      url.searchParams.append("userProfileIds", String(opts.userProfileIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChangeLogsListResponse(data);
  }

  /**
   * Retrieves a list of cities, possibly filtered.
   *
   * @param profileId User profile ID associated with this request.
   */
  async citiesList(profileId: bigint, opts: CitiesListOptions = {}): Promise<CitiesListResponse> {
    profileId = String(profileId);
    opts = serializeCitiesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/cities`);
    if (opts.countryDartIds !== undefined) {
      url.searchParams.append("countryDartIds", String(opts.countryDartIds));
    }
    if (opts.dartIds !== undefined) {
      url.searchParams.append("dartIds", String(opts.dartIds));
    }
    if (opts.namePrefix !== undefined) {
      url.searchParams.append("namePrefix", String(opts.namePrefix));
    }
    if (opts.regionDartIds !== undefined) {
      url.searchParams.append("regionDartIds", String(opts.regionDartIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCitiesListResponse(data);
  }

  /**
   * Gets one connection type by ID.
   *
   * @param id Connection type ID.
   * @param profileId User profile ID associated with this request.
   */
  async connectionTypesGet(id: bigint, profileId: bigint): Promise<ConnectionType> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/connectionTypes/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConnectionType(data);
  }

  /**
   * Retrieves a list of connection types.
   *
   * @param profileId User profile ID associated with this request.
   */
  async connectionTypesList(profileId: bigint): Promise<ConnectionTypesListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/connectionTypes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConnectionTypesListResponse(data);
  }

  /**
   * Deletes an existing content category.
   *
   * @param id Content category ID.
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one content category by ID.
   *
   * @param id Content category ID.
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesGet(id: bigint, profileId: bigint): Promise<ContentCategory> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeContentCategory(data);
  }

  /**
   * Inserts a new content category.
   *
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesInsert(profileId: bigint, req: ContentCategory): Promise<ContentCategory> {
    profileId = String(profileId);
    req = serializeContentCategory(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeContentCategory(data);
  }

  /**
   * Retrieves a list of content categories, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesList(profileId: bigint, opts: ContentCategoriesListOptions = {}): Promise<ContentCategoriesListResponse> {
    profileId = String(profileId);
    opts = serializeContentCategoriesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeContentCategoriesListResponse(data);
  }

  /**
   * Updates an existing content category. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesPatch(profileId: bigint, req: ContentCategory, opts: ContentCategoriesPatchOptions = {}): Promise<ContentCategory> {
    profileId = String(profileId);
    req = serializeContentCategory(req);
    opts = serializeContentCategoriesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeContentCategory(data);
  }

  /**
   * Updates an existing content category.
   *
   * @param profileId User profile ID associated with this request.
   */
  async contentCategoriesUpdate(profileId: bigint, req: ContentCategory): Promise<ContentCategory> {
    profileId = String(profileId);
    req = serializeContentCategory(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/contentCategories`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeContentCategory(data);
  }

  /**
   * Inserts conversions.
   *
   * @param profileId User profile ID associated with this request.
   */
  async conversionsBatchinsert(profileId: bigint, req: ConversionsBatchInsertRequest): Promise<ConversionsBatchInsertResponse> {
    profileId = String(profileId);
    req = serializeConversionsBatchInsertRequest(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/conversions/batchinsert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConversionsBatchInsertResponse(data);
  }

  /**
   * Updates existing conversions.
   *
   * @param profileId User profile ID associated with this request.
   */
  async conversionsBatchupdate(profileId: bigint, req: ConversionsBatchUpdateRequest): Promise<ConversionsBatchUpdateResponse> {
    profileId = String(profileId);
    req = serializeConversionsBatchUpdateRequest(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/conversions/batchupdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConversionsBatchUpdateResponse(data);
  }

  /**
   * Gets one country by ID.
   *
   * @param dartId Country DART ID.
   * @param profileId User profile ID associated with this request.
   */
  async countriesGet(dartId: bigint, profileId: bigint): Promise<Country> {
    dartId = String(dartId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/countries/${ dartId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCountry(data);
  }

  /**
   * Retrieves a list of countries.
   *
   * @param profileId User profile ID associated with this request.
   */
  async countriesList(profileId: bigint): Promise<CountriesListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/countries`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCountriesListResponse(data);
  }

  /**
   * Inserts a new creative asset.
   *
   * @param advertiserId Advertiser ID of this creative. This is a required field.
   * @param profileId User profile ID associated with this request.
   */
  async creativeAssetsInsert(advertiserId: bigint, profileId: bigint, req: CreativeAssetMetadata): Promise<CreativeAssetMetadata> {
    advertiserId = String(advertiserId);
    profileId = String(profileId);
    req = serializeCreativeAssetMetadata(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeAssets/${ advertiserId }/creativeAssets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreativeAssetMetadata(data);
  }

  /**
   * Deletes an existing creative field.
   *
   * @param id Creative Field ID
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one creative field by ID.
   *
   * @param id Creative Field ID
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsGet(id: bigint, profileId: bigint): Promise<CreativeField> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeField(data);
  }

  /**
   * Inserts a new creative field.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsInsert(profileId: bigint, req: CreativeField): Promise<CreativeField> {
    profileId = String(profileId);
    req = serializeCreativeField(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreativeField(data);
  }

  /**
   * Retrieves a list of creative fields, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsList(profileId: bigint, opts: CreativeFieldsListOptions = {}): Promise<CreativeFieldsListResponse> {
    profileId = String(profileId);
    opts = serializeCreativeFieldsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields`);
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeFieldsListResponse(data);
  }

  /**
   * Updates an existing creative field. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsPatch(profileId: bigint, req: CreativeField, opts: CreativeFieldsPatchOptions = {}): Promise<CreativeField> {
    profileId = String(profileId);
    req = serializeCreativeField(req);
    opts = serializeCreativeFieldsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCreativeField(data);
  }

  /**
   * Updates an existing creative field.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldsUpdate(profileId: bigint, req: CreativeField): Promise<CreativeField> {
    profileId = String(profileId);
    req = serializeCreativeField(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCreativeField(data);
  }

  /**
   * Deletes an existing creative field value.
   *
   * @param creativeFieldId Creative field ID for this creative field value.
   * @param id Creative Field Value ID
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesDelete(creativeFieldId: bigint, id: bigint, profileId: bigint): Promise<void> {
    creativeFieldId = String(creativeFieldId);
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one creative field value by ID.
   *
   * @param creativeFieldId Creative field ID for this creative field value.
   * @param id Creative Field Value ID
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesGet(creativeFieldId: bigint, id: bigint, profileId: bigint): Promise<CreativeFieldValue> {
    creativeFieldId = String(creativeFieldId);
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeFieldValue(data);
  }

  /**
   * Inserts a new creative field value.
   *
   * @param creativeFieldId Creative field ID for this creative field value.
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesInsert(creativeFieldId: bigint, profileId: bigint, req: CreativeFieldValue): Promise<CreativeFieldValue> {
    creativeFieldId = String(creativeFieldId);
    profileId = String(profileId);
    req = serializeCreativeFieldValue(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreativeFieldValue(data);
  }

  /**
   * Retrieves a list of creative field values, possibly filtered. This method
   * supports paging.
   *
   * @param creativeFieldId Creative field ID for this creative field value.
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesList(creativeFieldId: bigint, profileId: bigint, opts: CreativeFieldValuesListOptions = {}): Promise<CreativeFieldValuesListResponse> {
    creativeFieldId = String(creativeFieldId);
    profileId = String(profileId);
    opts = serializeCreativeFieldValuesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeFieldValuesListResponse(data);
  }

  /**
   * Updates an existing creative field value. This method supports patch
   * semantics.
   *
   * @param creativeFieldId CreativeField ID.
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesPatch(creativeFieldId: bigint, profileId: bigint, req: CreativeFieldValue, opts: CreativeFieldValuesPatchOptions = {}): Promise<CreativeFieldValue> {
    creativeFieldId = String(creativeFieldId);
    profileId = String(profileId);
    req = serializeCreativeFieldValue(req);
    opts = serializeCreativeFieldValuesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCreativeFieldValue(data);
  }

  /**
   * Updates an existing creative field value.
   *
   * @param creativeFieldId Creative field ID for this creative field value.
   * @param profileId User profile ID associated with this request.
   */
  async creativeFieldValuesUpdate(creativeFieldId: bigint, profileId: bigint, req: CreativeFieldValue): Promise<CreativeFieldValue> {
    creativeFieldId = String(creativeFieldId);
    profileId = String(profileId);
    req = serializeCreativeFieldValue(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeFields/${ creativeFieldId }/creativeFieldValues`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCreativeFieldValue(data);
  }

  /**
   * Gets one creative group by ID.
   *
   * @param id Creative group ID.
   * @param profileId User profile ID associated with this request.
   */
  async creativeGroupsGet(id: bigint, profileId: bigint): Promise<CreativeGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeGroup(data);
  }

  /**
   * Inserts a new creative group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeGroupsInsert(profileId: bigint, req: CreativeGroup): Promise<CreativeGroup> {
    profileId = String(profileId);
    req = serializeCreativeGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreativeGroup(data);
  }

  /**
   * Retrieves a list of creative groups, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeGroupsList(profileId: bigint, opts: CreativeGroupsListOptions = {}): Promise<CreativeGroupsListResponse> {
    profileId = String(profileId);
    opts = serializeCreativeGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeGroups`);
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.groupNumber !== undefined) {
      url.searchParams.append("groupNumber", String(opts.groupNumber));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativeGroupsListResponse(data);
  }

  /**
   * Updates an existing creative group. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeGroupsPatch(profileId: bigint, req: CreativeGroup, opts: CreativeGroupsPatchOptions = {}): Promise<CreativeGroup> {
    profileId = String(profileId);
    req = serializeCreativeGroup(req);
    opts = serializeCreativeGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeGroups`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCreativeGroup(data);
  }

  /**
   * Updates an existing creative group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativeGroupsUpdate(profileId: bigint, req: CreativeGroup): Promise<CreativeGroup> {
    profileId = String(profileId);
    req = serializeCreativeGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creativeGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCreativeGroup(data);
  }

  /**
   * Gets one creative by ID.
   *
   * @param id Creative ID.
   * @param profileId User profile ID associated with this request.
   */
  async creativesGet(id: bigint, profileId: bigint): Promise<Creative> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creatives/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreative(data);
  }

  /**
   * Inserts a new creative.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativesInsert(profileId: bigint, req: Creative): Promise<Creative> {
    profileId = String(profileId);
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creatives`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Retrieves a list of creatives, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativesList(profileId: bigint, opts: CreativesListOptions = {}): Promise<CreativesListResponse> {
    profileId = String(profileId);
    opts = serializeCreativesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creatives`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.archived !== undefined) {
      url.searchParams.append("archived", String(opts.archived));
    }
    if (opts.campaignId !== undefined) {
      url.searchParams.append("campaignId", String(opts.campaignId));
    }
    if (opts.companionCreativeIds !== undefined) {
      url.searchParams.append("companionCreativeIds", String(opts.companionCreativeIds));
    }
    if (opts.creativeFieldIds !== undefined) {
      url.searchParams.append("creativeFieldIds", String(opts.creativeFieldIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.renderingIds !== undefined) {
      url.searchParams.append("renderingIds", String(opts.renderingIds));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sizeIds !== undefined) {
      url.searchParams.append("sizeIds", String(opts.sizeIds));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.studioCreativeId !== undefined) {
      url.searchParams.append("studioCreativeId", String(opts.studioCreativeId));
    }
    if (opts.types !== undefined) {
      url.searchParams.append("types", String(opts.types));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreativesListResponse(data);
  }

  /**
   * Updates an existing creative. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativesPatch(profileId: bigint, req: Creative, opts: CreativesPatchOptions = {}): Promise<Creative> {
    profileId = String(profileId);
    req = serializeCreative(req);
    opts = serializeCreativesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creatives`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Updates an existing creative.
   *
   * @param profileId User profile ID associated with this request.
   */
  async creativesUpdate(profileId: bigint, req: Creative): Promise<Creative> {
    profileId = String(profileId);
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/creatives`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Retrieves list of report dimension values for a list of filters.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   */
  async dimensionValuesQuery(profileId: bigint, req: DimensionValueRequest, opts: DimensionValuesQueryOptions = {}): Promise<DimensionValueList> {
    profileId = String(profileId);
    req = serializeDimensionValueRequest(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/dimensionvalues/query`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DimensionValueList;
  }

  /**
   * Gets one directory site by ID.
   *
   * @param id Directory site ID.
   * @param profileId User profile ID associated with this request.
   */
  async directorySitesGet(id: bigint, profileId: bigint): Promise<DirectorySite> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/directorySites/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDirectorySite(data);
  }

  /**
   * Inserts a new directory site.
   *
   * @param profileId User profile ID associated with this request.
   */
  async directorySitesInsert(profileId: bigint, req: DirectorySite): Promise<DirectorySite> {
    profileId = String(profileId);
    req = serializeDirectorySite(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/directorySites`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDirectorySite(data);
  }

  /**
   * Retrieves a list of directory sites, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async directorySitesList(profileId: bigint, opts: DirectorySitesListOptions = {}): Promise<DirectorySitesListResponse> {
    profileId = String(profileId);
    opts = serializeDirectorySitesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/directorySites`);
    if (opts.acceptsInStreamVideoPlacements !== undefined) {
      url.searchParams.append("acceptsInStreamVideoPlacements", String(opts.acceptsInStreamVideoPlacements));
    }
    if (opts.acceptsInterstitialPlacements !== undefined) {
      url.searchParams.append("acceptsInterstitialPlacements", String(opts.acceptsInterstitialPlacements));
    }
    if (opts.acceptsPublisherPaidPlacements !== undefined) {
      url.searchParams.append("acceptsPublisherPaidPlacements", String(opts.acceptsPublisherPaidPlacements));
    }
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.dfpNetworkCode !== undefined) {
      url.searchParams.append("dfpNetworkCode", String(opts.dfpNetworkCode));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDirectorySitesListResponse(data);
  }

  /**
   * Deletes an existing dynamic targeting key.
   *
   * @param objectId ID of the object of this dynamic targeting key. This is a required field.
   * @param profileId User profile ID associated with this request.
   */
  async dynamicTargetingKeysDelete(objectId: bigint, profileId: bigint, opts: DynamicTargetingKeysDeleteOptions = {}): Promise<void> {
    objectId = String(objectId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/dynamicTargetingKeys/${ objectId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.objectType !== undefined) {
      url.searchParams.append("objectType", String(opts.objectType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new dynamic targeting key. Keys must be created at the
   * advertiser level before being assigned to the advertiser's ads, creatives,
   * or placements. There is a maximum of 1000 keys per advertiser, out of which
   * a maximum of 20 keys can be assigned per ad, creative, or placement.
   *
   * @param profileId User profile ID associated with this request.
   */
  async dynamicTargetingKeysInsert(profileId: bigint, req: DynamicTargetingKey): Promise<DynamicTargetingKey> {
    profileId = String(profileId);
    req = serializeDynamicTargetingKey(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/dynamicTargetingKeys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDynamicTargetingKey(data);
  }

  /**
   * Retrieves a list of dynamic targeting keys.
   *
   * @param profileId User profile ID associated with this request.
   */
  async dynamicTargetingKeysList(profileId: bigint, opts: DynamicTargetingKeysListOptions = {}): Promise<DynamicTargetingKeysListResponse> {
    profileId = String(profileId);
    opts = serializeDynamicTargetingKeysListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/dynamicTargetingKeys`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    if (opts.objectId !== undefined) {
      url.searchParams.append("objectId", String(opts.objectId));
    }
    if (opts.objectType !== undefined) {
      url.searchParams.append("objectType", String(opts.objectType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDynamicTargetingKeysListResponse(data);
  }

  /**
   * Deletes an existing event tag.
   *
   * @param id Event tag ID.
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one event tag by ID.
   *
   * @param id Event tag ID.
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsGet(id: bigint, profileId: bigint): Promise<EventTag> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEventTag(data);
  }

  /**
   * Inserts a new event tag.
   *
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsInsert(profileId: bigint, req: EventTag): Promise<EventTag> {
    profileId = String(profileId);
    req = serializeEventTag(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEventTag(data);
  }

  /**
   * Retrieves a list of event tags, possibly filtered.
   *
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsList(profileId: bigint, opts: EventTagsListOptions = {}): Promise<EventTagsListResponse> {
    profileId = String(profileId);
    opts = serializeEventTagsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags`);
    if (opts.adId !== undefined) {
      url.searchParams.append("adId", String(opts.adId));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.campaignId !== undefined) {
      url.searchParams.append("campaignId", String(opts.campaignId));
    }
    if (opts.definitionsOnly !== undefined) {
      url.searchParams.append("definitionsOnly", String(opts.definitionsOnly));
    }
    if (opts.enabled !== undefined) {
      url.searchParams.append("enabled", String(opts.enabled));
    }
    if (opts.eventTagTypes !== undefined) {
      url.searchParams.append("eventTagTypes", String(opts.eventTagTypes));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEventTagsListResponse(data);
  }

  /**
   * Updates an existing event tag. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsPatch(profileId: bigint, req: EventTag, opts: EventTagsPatchOptions = {}): Promise<EventTag> {
    profileId = String(profileId);
    req = serializeEventTag(req);
    opts = serializeEventTagsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeEventTag(data);
  }

  /**
   * Updates an existing event tag.
   *
   * @param profileId User profile ID associated with this request.
   */
  async eventTagsUpdate(profileId: bigint, req: EventTag): Promise<EventTag> {
    profileId = String(profileId);
    req = serializeEventTag(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/eventTags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeEventTag(data);
  }

  /**
   * Retrieves a report file by its report ID and file ID. This method supports
   * media download.
   *
   * @param fileId The ID of the report file.
   * @param reportId The ID of the report.
   */
  async filesGet(fileId: bigint, reportId: bigint): Promise<File> {
    fileId = String(fileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}reports/${ reportId }/files/${ fileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFile(data);
  }

  /**
   * Lists files for a user profile.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   */
  async filesList(profileId: bigint, opts: FilesListOptions = {}): Promise<FileList> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/files`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.scope !== undefined) {
      url.searchParams.append("scope", String(opts.scope));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFileList(data);
  }

  /**
   * Deletes an existing floodlight activity.
   *
   * @param id Floodlight activity ID.
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Generates a tag for a floodlight activity.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesGeneratetag(profileId: bigint, opts: FloodlightActivitiesGeneratetagOptions = {}): Promise<FloodlightActivitiesGenerateTagResponse> {
    profileId = String(profileId);
    opts = serializeFloodlightActivitiesGeneratetagOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities/generatetag`);
    if (opts.floodlightActivityId !== undefined) {
      url.searchParams.append("floodlightActivityId", String(opts.floodlightActivityId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as FloodlightActivitiesGenerateTagResponse;
  }

  /**
   * Gets one floodlight activity by ID.
   *
   * @param id Floodlight activity ID.
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesGet(id: bigint, profileId: bigint): Promise<FloodlightActivity> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightActivity(data);
  }

  /**
   * Inserts a new floodlight activity.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesInsert(profileId: bigint, req: FloodlightActivity): Promise<FloodlightActivity> {
    profileId = String(profileId);
    req = serializeFloodlightActivity(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFloodlightActivity(data);
  }

  /**
   * Retrieves a list of floodlight activities, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesList(profileId: bigint, opts: FloodlightActivitiesListOptions = {}): Promise<FloodlightActivitiesListResponse> {
    profileId = String(profileId);
    opts = serializeFloodlightActivitiesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.floodlightActivityGroupIds !== undefined) {
      url.searchParams.append("floodlightActivityGroupIds", String(opts.floodlightActivityGroupIds));
    }
    if (opts.floodlightActivityGroupName !== undefined) {
      url.searchParams.append("floodlightActivityGroupName", String(opts.floodlightActivityGroupName));
    }
    if (opts.floodlightActivityGroupTagString !== undefined) {
      url.searchParams.append("floodlightActivityGroupTagString", String(opts.floodlightActivityGroupTagString));
    }
    if (opts.floodlightActivityGroupType !== undefined) {
      url.searchParams.append("floodlightActivityGroupType", String(opts.floodlightActivityGroupType));
    }
    if (opts.floodlightConfigurationId !== undefined) {
      url.searchParams.append("floodlightConfigurationId", String(opts.floodlightConfigurationId));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.tagString !== undefined) {
      url.searchParams.append("tagString", String(opts.tagString));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightActivitiesListResponse(data);
  }

  /**
   * Updates an existing floodlight activity. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesPatch(profileId: bigint, req: FloodlightActivity, opts: FloodlightActivitiesPatchOptions = {}): Promise<FloodlightActivity> {
    profileId = String(profileId);
    req = serializeFloodlightActivity(req);
    opts = serializeFloodlightActivitiesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeFloodlightActivity(data);
  }

  /**
   * Updates an existing floodlight activity.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivitiesUpdate(profileId: bigint, req: FloodlightActivity): Promise<FloodlightActivity> {
    profileId = String(profileId);
    req = serializeFloodlightActivity(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeFloodlightActivity(data);
  }

  /**
   * Gets one floodlight activity group by ID.
   *
   * @param id Floodlight activity Group ID.
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivityGroupsGet(id: bigint, profileId: bigint): Promise<FloodlightActivityGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivityGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightActivityGroup(data);
  }

  /**
   * Inserts a new floodlight activity group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivityGroupsInsert(profileId: bigint, req: FloodlightActivityGroup): Promise<FloodlightActivityGroup> {
    profileId = String(profileId);
    req = serializeFloodlightActivityGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivityGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFloodlightActivityGroup(data);
  }

  /**
   * Retrieves a list of floodlight activity groups, possibly filtered. This
   * method supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivityGroupsList(profileId: bigint, opts: FloodlightActivityGroupsListOptions = {}): Promise<FloodlightActivityGroupsListResponse> {
    profileId = String(profileId);
    opts = serializeFloodlightActivityGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivityGroups`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.floodlightConfigurationId !== undefined) {
      url.searchParams.append("floodlightConfigurationId", String(opts.floodlightConfigurationId));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightActivityGroupsListResponse(data);
  }

  /**
   * Updates an existing floodlight activity group. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivityGroupsPatch(profileId: bigint, req: FloodlightActivityGroup, opts: FloodlightActivityGroupsPatchOptions = {}): Promise<FloodlightActivityGroup> {
    profileId = String(profileId);
    req = serializeFloodlightActivityGroup(req);
    opts = serializeFloodlightActivityGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivityGroups`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeFloodlightActivityGroup(data);
  }

  /**
   * Updates an existing floodlight activity group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightActivityGroupsUpdate(profileId: bigint, req: FloodlightActivityGroup): Promise<FloodlightActivityGroup> {
    profileId = String(profileId);
    req = serializeFloodlightActivityGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightActivityGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeFloodlightActivityGroup(data);
  }

  /**
   * Gets one floodlight configuration by ID.
   *
   * @param id Floodlight configuration ID.
   * @param profileId User profile ID associated with this request.
   */
  async floodlightConfigurationsGet(id: bigint, profileId: bigint): Promise<FloodlightConfiguration> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightConfigurations/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightConfiguration(data);
  }

  /**
   * Retrieves a list of floodlight configurations, possibly filtered.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightConfigurationsList(profileId: bigint, opts: FloodlightConfigurationsListOptions = {}): Promise<FloodlightConfigurationsListResponse> {
    profileId = String(profileId);
    opts = serializeFloodlightConfigurationsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightConfigurations`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFloodlightConfigurationsListResponse(data);
  }

  /**
   * Updates an existing floodlight configuration. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightConfigurationsPatch(profileId: bigint, req: FloodlightConfiguration, opts: FloodlightConfigurationsPatchOptions = {}): Promise<FloodlightConfiguration> {
    profileId = String(profileId);
    req = serializeFloodlightConfiguration(req);
    opts = serializeFloodlightConfigurationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightConfigurations`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeFloodlightConfiguration(data);
  }

  /**
   * Updates an existing floodlight configuration.
   *
   * @param profileId User profile ID associated with this request.
   */
  async floodlightConfigurationsUpdate(profileId: bigint, req: FloodlightConfiguration): Promise<FloodlightConfiguration> {
    profileId = String(profileId);
    req = serializeFloodlightConfiguration(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/floodlightConfigurations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeFloodlightConfiguration(data);
  }

  /**
   * Gets one inventory item by ID.
   *
   * @param id Inventory item ID.
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for order documents.
   */
  async inventoryItemsGet(id: bigint, profileId: bigint, projectId: bigint): Promise<InventoryItem> {
    id = String(id);
    profileId = String(profileId);
    projectId = String(projectId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/inventoryItems/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInventoryItem(data);
  }

  /**
   * Retrieves a list of inventory items, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for order documents.
   */
  async inventoryItemsList(profileId: bigint, projectId: bigint, opts: InventoryItemsListOptions = {}): Promise<InventoryItemsListResponse> {
    profileId = String(profileId);
    projectId = String(projectId);
    opts = serializeInventoryItemsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/inventoryItems`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.inPlan !== undefined) {
      url.searchParams.append("inPlan", String(opts.inPlan));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderId !== undefined) {
      url.searchParams.append("orderId", String(opts.orderId));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.siteId !== undefined) {
      url.searchParams.append("siteId", String(opts.siteId));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInventoryItemsListResponse(data);
  }

  /**
   * Retrieves a list of languages.
   *
   * @param profileId User profile ID associated with this request.
   */
  async languagesList(profileId: bigint): Promise<LanguagesListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/languages`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLanguagesListResponse(data);
  }

  /**
   * Retrieves a list of metros.
   *
   * @param profileId User profile ID associated with this request.
   */
  async metrosList(profileId: bigint): Promise<MetrosListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/metros`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMetrosListResponse(data);
  }

  /**
   * Gets one mobile app by ID.
   *
   * @param id Mobile app ID.
   * @param profileId User profile ID associated with this request.
   */
  async mobileAppsGet(id: string, profileId: bigint): Promise<MobileApp> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/mobileApps/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MobileApp;
  }

  /**
   * Retrieves list of available mobile apps.
   *
   * @param profileId User profile ID associated with this request.
   */
  async mobileAppsList(profileId: bigint, opts: MobileAppsListOptions = {}): Promise<MobileAppsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/mobileApps`);
    if (opts.directories !== undefined) {
      url.searchParams.append("directories", String(opts.directories));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MobileAppsListResponse;
  }

  /**
   * Gets one mobile carrier by ID.
   *
   * @param id Mobile carrier ID.
   * @param profileId User profile ID associated with this request.
   */
  async mobileCarriersGet(id: bigint, profileId: bigint): Promise<MobileCarrier> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/mobileCarriers/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMobileCarrier(data);
  }

  /**
   * Retrieves a list of mobile carriers.
   *
   * @param profileId User profile ID associated with this request.
   */
  async mobileCarriersList(profileId: bigint): Promise<MobileCarriersListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/mobileCarriers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMobileCarriersListResponse(data);
  }

  /**
   * Gets one operating system by DART ID.
   *
   * @param dartId Operating system DART ID.
   * @param profileId User profile ID associated with this request.
   */
  async operatingSystemsGet(dartId: bigint, profileId: bigint): Promise<OperatingSystem> {
    dartId = String(dartId);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/operatingSystems/${ dartId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperatingSystem(data);
  }

  /**
   * Retrieves a list of operating systems.
   *
   * @param profileId User profile ID associated with this request.
   */
  async operatingSystemsList(profileId: bigint): Promise<OperatingSystemsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/operatingSystems`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperatingSystemsListResponse(data);
  }

  /**
   * Gets one operating system version by ID.
   *
   * @param id Operating system version ID.
   * @param profileId User profile ID associated with this request.
   */
  async operatingSystemVersionsGet(id: bigint, profileId: bigint): Promise<OperatingSystemVersion> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/operatingSystemVersions/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperatingSystemVersion(data);
  }

  /**
   * Retrieves a list of operating system versions.
   *
   * @param profileId User profile ID associated with this request.
   */
  async operatingSystemVersionsList(profileId: bigint): Promise<OperatingSystemVersionsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/operatingSystemVersions`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperatingSystemVersionsListResponse(data);
  }

  /**
   * Gets one order document by ID.
   *
   * @param id Order document ID.
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for order documents.
   */
  async orderDocumentsGet(id: bigint, profileId: bigint, projectId: bigint): Promise<OrderDocument> {
    id = String(id);
    profileId = String(profileId);
    projectId = String(projectId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/orderDocuments/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrderDocument(data);
  }

  /**
   * Retrieves a list of order documents, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for order documents.
   */
  async orderDocumentsList(profileId: bigint, projectId: bigint, opts: OrderDocumentsListOptions = {}): Promise<OrderDocumentsListResponse> {
    profileId = String(profileId);
    projectId = String(projectId);
    opts = serializeOrderDocumentsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/orderDocuments`);
    if (opts.approved !== undefined) {
      url.searchParams.append("approved", String(opts.approved));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderId !== undefined) {
      url.searchParams.append("orderId", String(opts.orderId));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.siteId !== undefined) {
      url.searchParams.append("siteId", String(opts.siteId));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrderDocumentsListResponse(data);
  }

  /**
   * Gets one order by ID.
   *
   * @param id Order ID.
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for orders.
   */
  async ordersGet(id: bigint, profileId: bigint, projectId: bigint): Promise<Order> {
    id = String(id);
    profileId = String(profileId);
    projectId = String(projectId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/orders/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrder(data);
  }

  /**
   * Retrieves a list of orders, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   * @param projectId Project ID for orders.
   */
  async ordersList(profileId: bigint, projectId: bigint, opts: OrdersListOptions = {}): Promise<OrdersListResponse> {
    profileId = String(profileId);
    projectId = String(projectId);
    opts = serializeOrdersListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ projectId }/orders`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.siteId !== undefined) {
      url.searchParams.append("siteId", String(opts.siteId));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOrdersListResponse(data);
  }

  /**
   * Gets one placement group by ID.
   *
   * @param id Placement group ID.
   * @param profileId User profile ID associated with this request.
   */
  async placementGroupsGet(id: bigint, profileId: bigint): Promise<PlacementGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacementGroup(data);
  }

  /**
   * Inserts a new placement group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementGroupsInsert(profileId: bigint, req: PlacementGroup): Promise<PlacementGroup> {
    profileId = String(profileId);
    req = serializePlacementGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlacementGroup(data);
  }

  /**
   * Retrieves a list of placement groups, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementGroupsList(profileId: bigint, opts: PlacementGroupsListOptions = {}): Promise<PlacementGroupsListResponse> {
    profileId = String(profileId);
    opts = serializePlacementGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementGroups`);
    if (opts.activeStatus !== undefined) {
      url.searchParams.append("activeStatus", String(opts.activeStatus));
    }
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.campaignIds !== undefined) {
      url.searchParams.append("campaignIds", String(opts.campaignIds));
    }
    if (opts.contentCategoryIds !== undefined) {
      url.searchParams.append("contentCategoryIds", String(opts.contentCategoryIds));
    }
    if (opts.directorySiteIds !== undefined) {
      url.searchParams.append("directorySiteIds", String(opts.directorySiteIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxEndDate !== undefined) {
      url.searchParams.append("maxEndDate", String(opts.maxEndDate));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.maxStartDate !== undefined) {
      url.searchParams.append("maxStartDate", String(opts.maxStartDate));
    }
    if (opts.minEndDate !== undefined) {
      url.searchParams.append("minEndDate", String(opts.minEndDate));
    }
    if (opts.minStartDate !== undefined) {
      url.searchParams.append("minStartDate", String(opts.minStartDate));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.placementGroupType !== undefined) {
      url.searchParams.append("placementGroupType", String(opts.placementGroupType));
    }
    if (opts.placementStrategyIds !== undefined) {
      url.searchParams.append("placementStrategyIds", String(opts.placementStrategyIds));
    }
    if (opts.pricingTypes !== undefined) {
      url.searchParams.append("pricingTypes", String(opts.pricingTypes));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.siteIds !== undefined) {
      url.searchParams.append("siteIds", String(opts.siteIds));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacementGroupsListResponse(data);
  }

  /**
   * Updates an existing placement group. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementGroupsPatch(profileId: bigint, req: PlacementGroup, opts: PlacementGroupsPatchOptions = {}): Promise<PlacementGroup> {
    profileId = String(profileId);
    req = serializePlacementGroup(req);
    opts = serializePlacementGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementGroups`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePlacementGroup(data);
  }

  /**
   * Updates an existing placement group.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementGroupsUpdate(profileId: bigint, req: PlacementGroup): Promise<PlacementGroup> {
    profileId = String(profileId);
    req = serializePlacementGroup(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePlacementGroup(data);
  }

  /**
   * Generates tags for a placement.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementsGeneratetags(profileId: bigint, opts: PlacementsGeneratetagsOptions = {}): Promise<PlacementsGenerateTagsResponse> {
    profileId = String(profileId);
    opts = serializePlacementsGeneratetagsOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements/generatetags`);
    if (opts.campaignId !== undefined) {
      url.searchParams.append("campaignId", String(opts.campaignId));
    }
    if (opts.placementIds !== undefined) {
      url.searchParams.append("placementIds", String(opts.placementIds));
    }
    if (opts.tagFormats !== undefined) {
      url.searchParams.append("tagFormats", String(opts.tagFormats));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializePlacementsGenerateTagsResponse(data);
  }

  /**
   * Gets one placement by ID.
   *
   * @param id Placement ID.
   * @param profileId User profile ID associated with this request.
   */
  async placementsGet(id: bigint, profileId: bigint): Promise<Placement> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacement(data);
  }

  /**
   * Inserts a new placement.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementsInsert(profileId: bigint, req: Placement): Promise<Placement> {
    profileId = String(profileId);
    req = serializePlacement(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlacement(data);
  }

  /**
   * Retrieves a list of placements, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementsList(profileId: bigint, opts: PlacementsListOptions = {}): Promise<PlacementsListResponse> {
    profileId = String(profileId);
    opts = serializePlacementsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements`);
    if (opts.activeStatus !== undefined) {
      url.searchParams.append("activeStatus", String(opts.activeStatus));
    }
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.campaignIds !== undefined) {
      url.searchParams.append("campaignIds", String(opts.campaignIds));
    }
    if (opts.compatibilities !== undefined) {
      url.searchParams.append("compatibilities", String(opts.compatibilities));
    }
    if (opts.contentCategoryIds !== undefined) {
      url.searchParams.append("contentCategoryIds", String(opts.contentCategoryIds));
    }
    if (opts.directorySiteIds !== undefined) {
      url.searchParams.append("directorySiteIds", String(opts.directorySiteIds));
    }
    if (opts.groupIds !== undefined) {
      url.searchParams.append("groupIds", String(opts.groupIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxEndDate !== undefined) {
      url.searchParams.append("maxEndDate", String(opts.maxEndDate));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.maxStartDate !== undefined) {
      url.searchParams.append("maxStartDate", String(opts.maxStartDate));
    }
    if (opts.minEndDate !== undefined) {
      url.searchParams.append("minEndDate", String(opts.minEndDate));
    }
    if (opts.minStartDate !== undefined) {
      url.searchParams.append("minStartDate", String(opts.minStartDate));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.paymentSource !== undefined) {
      url.searchParams.append("paymentSource", String(opts.paymentSource));
    }
    if (opts.placementStrategyIds !== undefined) {
      url.searchParams.append("placementStrategyIds", String(opts.placementStrategyIds));
    }
    if (opts.pricingTypes !== undefined) {
      url.searchParams.append("pricingTypes", String(opts.pricingTypes));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.siteIds !== undefined) {
      url.searchParams.append("siteIds", String(opts.siteIds));
    }
    if (opts.sizeIds !== undefined) {
      url.searchParams.append("sizeIds", String(opts.sizeIds));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacementsListResponse(data);
  }

  /**
   * Updates an existing placement. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementsPatch(profileId: bigint, req: Placement, opts: PlacementsPatchOptions = {}): Promise<Placement> {
    profileId = String(profileId);
    req = serializePlacement(req);
    opts = serializePlacementsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePlacement(data);
  }

  /**
   * Deletes an existing placement strategy.
   *
   * @param id Placement strategy ID.
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one placement strategy by ID.
   *
   * @param id Placement strategy ID.
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesGet(id: bigint, profileId: bigint): Promise<PlacementStrategy> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacementStrategy(data);
  }

  /**
   * Inserts a new placement strategy.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesInsert(profileId: bigint, req: PlacementStrategy): Promise<PlacementStrategy> {
    profileId = String(profileId);
    req = serializePlacementStrategy(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlacementStrategy(data);
  }

  /**
   * Retrieves a list of placement strategies, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesList(profileId: bigint, opts: PlacementStrategiesListOptions = {}): Promise<PlacementStrategiesListResponse> {
    profileId = String(profileId);
    opts = serializePlacementStrategiesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlacementStrategiesListResponse(data);
  }

  /**
   * Updates an existing placement strategy. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesPatch(profileId: bigint, req: PlacementStrategy, opts: PlacementStrategiesPatchOptions = {}): Promise<PlacementStrategy> {
    profileId = String(profileId);
    req = serializePlacementStrategy(req);
    opts = serializePlacementStrategiesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePlacementStrategy(data);
  }

  /**
   * Updates an existing placement strategy.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementStrategiesUpdate(profileId: bigint, req: PlacementStrategy): Promise<PlacementStrategy> {
    profileId = String(profileId);
    req = serializePlacementStrategy(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placementStrategies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePlacementStrategy(data);
  }

  /**
   * Updates an existing placement.
   *
   * @param profileId User profile ID associated with this request.
   */
  async placementsUpdate(profileId: bigint, req: Placement): Promise<Placement> {
    profileId = String(profileId);
    req = serializePlacement(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/placements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePlacement(data);
  }

  /**
   * Gets one platform type by ID.
   *
   * @param id Platform type ID.
   * @param profileId User profile ID associated with this request.
   */
  async platformTypesGet(id: bigint, profileId: bigint): Promise<PlatformType> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/platformTypes/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlatformType(data);
  }

  /**
   * Retrieves a list of platform types.
   *
   * @param profileId User profile ID associated with this request.
   */
  async platformTypesList(profileId: bigint): Promise<PlatformTypesListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/platformTypes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlatformTypesListResponse(data);
  }

  /**
   * Gets one postal code by ID.
   *
   * @param code Postal code ID.
   * @param profileId User profile ID associated with this request.
   */
  async postalCodesGet(code: string, profileId: bigint): Promise<PostalCode> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/postalCodes/${ code }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostalCode(data);
  }

  /**
   * Retrieves a list of postal codes.
   *
   * @param profileId User profile ID associated with this request.
   */
  async postalCodesList(profileId: bigint): Promise<PostalCodesListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/postalCodes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostalCodesListResponse(data);
  }

  /**
   * Gets one project by ID.
   *
   * @param id Project ID.
   * @param profileId User profile ID associated with this request.
   */
  async projectsGet(id: bigint, profileId: bigint): Promise<Project> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProject(data);
  }

  /**
   * Retrieves a list of projects, possibly filtered. This method supports
   * paging .
   *
   * @param profileId User profile ID associated with this request.
   */
  async projectsList(profileId: bigint, opts: ProjectsListOptions = {}): Promise<ProjectsListResponse> {
    profileId = String(profileId);
    opts = serializeProjectsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/projects`);
    if (opts.advertiserIds !== undefined) {
      url.searchParams.append("advertiserIds", String(opts.advertiserIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProjectsListResponse(data);
  }

  /**
   * Retrieves a list of regions.
   *
   * @param profileId User profile ID associated with this request.
   */
  async regionsList(profileId: bigint): Promise<RegionsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/regions`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRegionsListResponse(data);
  }

  /**
   * Gets one remarketing list by ID.
   *
   * @param id Remarketing list ID.
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListsGet(id: bigint, profileId: bigint): Promise<RemarketingList> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingLists/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRemarketingList(data);
  }

  /**
   * Gets one remarketing list share by remarketing list ID.
   *
   * @param profileId User profile ID associated with this request.
   * @param remarketingListId Remarketing list ID.
   */
  async remarketingListSharesGet(profileId: bigint, remarketingListId: bigint): Promise<RemarketingListShare> {
    profileId = String(profileId);
    remarketingListId = String(remarketingListId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingListShares/${ remarketingListId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRemarketingListShare(data);
  }

  /**
   * Updates an existing remarketing list share. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListSharesPatch(profileId: bigint, req: RemarketingListShare, opts: RemarketingListSharesPatchOptions = {}): Promise<RemarketingListShare> {
    profileId = String(profileId);
    req = serializeRemarketingListShare(req);
    opts = serializeRemarketingListSharesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingListShares`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRemarketingListShare(data);
  }

  /**
   * Updates an existing remarketing list share.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListSharesUpdate(profileId: bigint, req: RemarketingListShare): Promise<RemarketingListShare> {
    profileId = String(profileId);
    req = serializeRemarketingListShare(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingListShares`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeRemarketingListShare(data);
  }

  /**
   * Inserts a new remarketing list.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListsInsert(profileId: bigint, req: RemarketingList): Promise<RemarketingList> {
    profileId = String(profileId);
    req = serializeRemarketingList(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingLists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRemarketingList(data);
  }

  /**
   * Retrieves a list of remarketing lists, possibly filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListsList(profileId: bigint, opts: RemarketingListsListOptions = {}): Promise<RemarketingListsListResponse> {
    profileId = String(profileId);
    opts = serializeRemarketingListsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingLists`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.floodlightActivityId !== undefined) {
      url.searchParams.append("floodlightActivityId", String(opts.floodlightActivityId));
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
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRemarketingListsListResponse(data);
  }

  /**
   * Updates an existing remarketing list. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListsPatch(profileId: bigint, req: RemarketingList, opts: RemarketingListsPatchOptions = {}): Promise<RemarketingList> {
    profileId = String(profileId);
    req = serializeRemarketingList(req);
    opts = serializeRemarketingListsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingLists`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRemarketingList(data);
  }

  /**
   * Updates an existing remarketing list.
   *
   * @param profileId User profile ID associated with this request.
   */
  async remarketingListsUpdate(profileId: bigint, req: RemarketingList): Promise<RemarketingList> {
    profileId = String(profileId);
    req = serializeRemarketingList(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/remarketingLists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeRemarketingList(data);
  }

  /**
   * Returns the fields that are compatible to be selected in the respective
   * sections of a report criteria, given the fields already selected in the
   * input report and user permissions.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   */
  async reportsCompatibleFieldsQuery(profileId: bigint, req: Report): Promise<CompatibleFields> {
    profileId = String(profileId);
    req = serializeReport(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/compatiblefields/query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CompatibleFields;
  }

  /**
   * Deletes a report by its ID.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsDelete(profileId: bigint, reportId: bigint): Promise<void> {
    profileId = String(profileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a report file by its report ID and file ID. This method supports
   * media download.
   *
   * @param fileId The ID of the report file.
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsFilesGet(fileId: bigint, profileId: bigint, reportId: bigint): Promise<File> {
    fileId = String(fileId);
    profileId = String(profileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }/files/${ fileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFile(data);
  }

  /**
   * Lists files for a report.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the parent report.
   */
  async reportsFilesList(profileId: bigint, reportId: bigint, opts: ReportsFilesListOptions = {}): Promise<FileList> {
    profileId = String(profileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }/files`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFileList(data);
  }

  /**
   * Retrieves a report by its ID.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsGet(profileId: bigint, reportId: bigint): Promise<Report> {
    profileId = String(profileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReport(data);
  }

  /**
   * Creates a report.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   */
  async reportsInsert(profileId: bigint, req: Report): Promise<Report> {
    profileId = String(profileId);
    req = serializeReport(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReport(data);
  }

  /**
   * Retrieves list of reports.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   */
  async reportsList(profileId: bigint, opts: ReportsListOptions = {}): Promise<ReportList> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.scope !== undefined) {
      url.searchParams.append("scope", String(opts.scope));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReportList(data);
  }

  /**
   * Updates an existing report. This method supports patch semantics.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsPatch(profileId: bigint, reportId: bigint, req: Report): Promise<Report> {
    profileId = String(profileId);
    reportId = String(reportId);
    req = serializeReport(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeReport(data);
  }

  /**
   * Runs a report.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsRun(profileId: bigint, reportId: bigint, opts: ReportsRunOptions = {}): Promise<File> {
    profileId = String(profileId);
    reportId = String(reportId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }/run`);
    if (opts.synchronous !== undefined) {
      url.searchParams.append("synchronous", String(opts.synchronous));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeFile(data);
  }

  /**
   * Updates a report.
   *
   * @param profileId The Campaign Manager 360 user profile ID.
   * @param reportId The ID of the report.
   */
  async reportsUpdate(profileId: bigint, reportId: bigint, req: Report): Promise<Report> {
    profileId = String(profileId);
    reportId = String(reportId);
    req = serializeReport(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/reports/${ reportId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeReport(data);
  }

  /**
   * Gets one site by ID.
   *
   * @param id Site ID.
   * @param profileId User profile ID associated with this request.
   */
  async sitesGet(id: bigint, profileId: bigint): Promise<Site> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sites/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSite(data);
  }

  /**
   * Inserts a new site.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sitesInsert(profileId: bigint, req: Site): Promise<Site> {
    profileId = String(profileId);
    req = serializeSite(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sites`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSite(data);
  }

  /**
   * Retrieves a list of sites, possibly filtered. This method supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sitesList(profileId: bigint, opts: SitesListOptions = {}): Promise<SitesListResponse> {
    profileId = String(profileId);
    opts = serializeSitesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sites`);
    if (opts.acceptsInStreamVideoPlacements !== undefined) {
      url.searchParams.append("acceptsInStreamVideoPlacements", String(opts.acceptsInStreamVideoPlacements));
    }
    if (opts.acceptsInterstitialPlacements !== undefined) {
      url.searchParams.append("acceptsInterstitialPlacements", String(opts.acceptsInterstitialPlacements));
    }
    if (opts.acceptsPublisherPaidPlacements !== undefined) {
      url.searchParams.append("acceptsPublisherPaidPlacements", String(opts.acceptsPublisherPaidPlacements));
    }
    if (opts.adWordsSite !== undefined) {
      url.searchParams.append("adWordsSite", String(opts.adWordsSite));
    }
    if (opts.approved !== undefined) {
      url.searchParams.append("approved", String(opts.approved));
    }
    if (opts.campaignIds !== undefined) {
      url.searchParams.append("campaignIds", String(opts.campaignIds));
    }
    if (opts.directorySiteIds !== undefined) {
      url.searchParams.append("directorySiteIds", String(opts.directorySiteIds));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    if (opts.unmappedSite !== undefined) {
      url.searchParams.append("unmappedSite", String(opts.unmappedSite));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSitesListResponse(data);
  }

  /**
   * Updates an existing site. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sitesPatch(profileId: bigint, req: Site, opts: SitesPatchOptions = {}): Promise<Site> {
    profileId = String(profileId);
    req = serializeSite(req);
    opts = serializeSitesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sites`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSite(data);
  }

  /**
   * Updates an existing site.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sitesUpdate(profileId: bigint, req: Site): Promise<Site> {
    profileId = String(profileId);
    req = serializeSite(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sites`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeSite(data);
  }

  /**
   * Gets one size by ID.
   *
   * @param id Size ID.
   * @param profileId User profile ID associated with this request.
   */
  async sizesGet(id: bigint, profileId: bigint): Promise<Size> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sizes/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSize(data);
  }

  /**
   * Inserts a new size.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sizesInsert(profileId: bigint, req: Size): Promise<Size> {
    profileId = String(profileId);
    req = serializeSize(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sizes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSize(data);
  }

  /**
   * Retrieves a list of sizes, possibly filtered. Retrieved sizes are globally
   * unique and may include values not currently in use by your account. Due to
   * this, the list of sizes returned by this method may differ from the list
   * seen in the Trafficking UI.
   *
   * @param profileId User profile ID associated with this request.
   */
  async sizesList(profileId: bigint, opts: SizesListOptions = {}): Promise<SizesListResponse> {
    profileId = String(profileId);
    opts = serializeSizesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/sizes`);
    if (opts.height !== undefined) {
      url.searchParams.append("height", String(opts.height));
    }
    if (opts.iabStandard !== undefined) {
      url.searchParams.append("iabStandard", String(opts.iabStandard));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.width !== undefined) {
      url.searchParams.append("width", String(opts.width));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSizesListResponse(data);
  }

  /**
   * Gets one subaccount by ID.
   *
   * @param id Subaccount ID.
   * @param profileId User profile ID associated with this request.
   */
  async subaccountsGet(id: bigint, profileId: bigint): Promise<Subaccount> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/subaccounts/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubaccount(data);
  }

  /**
   * Inserts a new subaccount.
   *
   * @param profileId User profile ID associated with this request.
   */
  async subaccountsInsert(profileId: bigint, req: Subaccount): Promise<Subaccount> {
    profileId = String(profileId);
    req = serializeSubaccount(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/subaccounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubaccount(data);
  }

  /**
   * Gets a list of subaccounts, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async subaccountsList(profileId: bigint, opts: SubaccountsListOptions = {}): Promise<SubaccountsListResponse> {
    profileId = String(profileId);
    opts = serializeSubaccountsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/subaccounts`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubaccountsListResponse(data);
  }

  /**
   * Updates an existing subaccount. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async subaccountsPatch(profileId: bigint, req: Subaccount, opts: SubaccountsPatchOptions = {}): Promise<Subaccount> {
    profileId = String(profileId);
    req = serializeSubaccount(req);
    opts = serializeSubaccountsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/subaccounts`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSubaccount(data);
  }

  /**
   * Updates an existing subaccount.
   *
   * @param profileId User profile ID associated with this request.
   */
  async subaccountsUpdate(profileId: bigint, req: Subaccount): Promise<Subaccount> {
    profileId = String(profileId);
    req = serializeSubaccount(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/subaccounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeSubaccount(data);
  }

  /**
   * Gets one remarketing list by ID.
   *
   * @param id Remarketing list ID.
   * @param profileId User profile ID associated with this request.
   */
  async targetableRemarketingListsGet(id: bigint, profileId: bigint): Promise<TargetableRemarketingList> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetableRemarketingLists/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTargetableRemarketingList(data);
  }

  /**
   * Retrieves a list of targetable remarketing lists, possibly filtered. This
   * method supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async targetableRemarketingListsList(profileId: bigint, opts: TargetableRemarketingListsListOptions = {}): Promise<TargetableRemarketingListsListResponse> {
    profileId = String(profileId);
    opts = serializeTargetableRemarketingListsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetableRemarketingLists`);
    if (opts.active !== undefined) {
      url.searchParams.append("active", String(opts.active));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
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
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTargetableRemarketingListsListResponse(data);
  }

  /**
   * Gets one targeting template by ID.
   *
   * @param id Targeting template ID.
   * @param profileId User profile ID associated with this request.
   */
  async targetingTemplatesGet(id: bigint, profileId: bigint): Promise<TargetingTemplate> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetingTemplates/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTargetingTemplate(data);
  }

  /**
   * Inserts a new targeting template.
   *
   * @param profileId User profile ID associated with this request.
   */
  async targetingTemplatesInsert(profileId: bigint, req: TargetingTemplate): Promise<TargetingTemplate> {
    profileId = String(profileId);
    req = serializeTargetingTemplate(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetingTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTargetingTemplate(data);
  }

  /**
   * Retrieves a list of targeting templates, optionally filtered. This method
   * supports paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async targetingTemplatesList(profileId: bigint, opts: TargetingTemplatesListOptions = {}): Promise<TargetingTemplatesListResponse> {
    profileId = String(profileId);
    opts = serializeTargetingTemplatesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetingTemplates`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTargetingTemplatesListResponse(data);
  }

  /**
   * Updates an existing targeting template. This method supports patch
   * semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async targetingTemplatesPatch(profileId: bigint, req: TargetingTemplate, opts: TargetingTemplatesPatchOptions = {}): Promise<TargetingTemplate> {
    profileId = String(profileId);
    req = serializeTargetingTemplate(req);
    opts = serializeTargetingTemplatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetingTemplates`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTargetingTemplate(data);
  }

  /**
   * Updates an existing targeting template.
   *
   * @param profileId User profile ID associated with this request.
   */
  async targetingTemplatesUpdate(profileId: bigint, req: TargetingTemplate): Promise<TargetingTemplate> {
    profileId = String(profileId);
    req = serializeTargetingTemplate(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/targetingTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeTargetingTemplate(data);
  }

  /**
   * Gets one user profile by ID.
   *
   * @param profileId The user profile ID.
   */
  async userProfilesGet(profileId: bigint): Promise<UserProfile> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserProfile(data);
  }

  /**
   * Retrieves list of user profiles for a user.
   *
   */
  async userProfilesList(): Promise<UserProfileList> {
    const url = new URL(`${this.#baseUrl}userprofiles`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserProfileList(data);
  }

  /**
   * Gets one user role permission group by ID.
   *
   * @param id User role permission group ID.
   * @param profileId User profile ID associated with this request.
   */
  async userRolePermissionGroupsGet(id: bigint, profileId: bigint): Promise<UserRolePermissionGroup> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRolePermissionGroups/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRolePermissionGroup(data);
  }

  /**
   * Gets a list of all supported user role permission groups.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolePermissionGroupsList(profileId: bigint): Promise<UserRolePermissionGroupsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRolePermissionGroups`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRolePermissionGroupsListResponse(data);
  }

  /**
   * Gets one user role permission by ID.
   *
   * @param id User role permission ID.
   * @param profileId User profile ID associated with this request.
   */
  async userRolePermissionsGet(id: bigint, profileId: bigint): Promise<UserRolePermission> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRolePermissions/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRolePermission(data);
  }

  /**
   * Gets a list of user role permissions, possibly filtered.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolePermissionsList(profileId: bigint, opts: UserRolePermissionsListOptions = {}): Promise<UserRolePermissionsListResponse> {
    profileId = String(profileId);
    opts = serializeUserRolePermissionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRolePermissions`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRolePermissionsListResponse(data);
  }

  /**
   * Deletes an existing user role.
   *
   * @param id User role ID.
   * @param profileId User profile ID associated with this request.
   */
  async userRolesDelete(id: bigint, profileId: bigint): Promise<void> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets one user role by ID.
   *
   * @param id User role ID.
   * @param profileId User profile ID associated with this request.
   */
  async userRolesGet(id: bigint, profileId: bigint): Promise<UserRole> {
    id = String(id);
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRole(data);
  }

  /**
   * Inserts a new user role.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolesInsert(profileId: bigint, req: UserRole): Promise<UserRole> {
    profileId = String(profileId);
    req = serializeUserRole(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUserRole(data);
  }

  /**
   * Retrieves a list of user roles, possibly filtered. This method supports
   * paging.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolesList(profileId: bigint, opts: UserRolesListOptions = {}): Promise<UserRolesListResponse> {
    profileId = String(profileId);
    opts = serializeUserRolesListOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles`);
    if (opts.accountUserRoleOnly !== undefined) {
      url.searchParams.append("accountUserRoleOnly", String(opts.accountUserRoleOnly));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.searchString !== undefined) {
      url.searchParams.append("searchString", String(opts.searchString));
    }
    if (opts.sortField !== undefined) {
      url.searchParams.append("sortField", String(opts.sortField));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.subaccountId !== undefined) {
      url.searchParams.append("subaccountId", String(opts.subaccountId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserRolesListResponse(data);
  }

  /**
   * Updates an existing user role. This method supports patch semantics.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolesPatch(profileId: bigint, req: UserRole, opts: UserRolesPatchOptions = {}): Promise<UserRole> {
    profileId = String(profileId);
    req = serializeUserRole(req);
    opts = serializeUserRolesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeUserRole(data);
  }

  /**
   * Updates an existing user role.
   *
   * @param profileId User profile ID associated with this request.
   */
  async userRolesUpdate(profileId: bigint, req: UserRole): Promise<UserRole> {
    profileId = String(profileId);
    req = serializeUserRole(req);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/userRoles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeUserRole(data);
  }

  /**
   * Gets one video format by ID.
   *
   * @param id Video format ID.
   * @param profileId User profile ID associated with this request.
   */
  async videoFormatsGet(id: number, profileId: bigint): Promise<VideoFormat> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/videoFormats/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVideoFormat(data);
  }

  /**
   * Lists available video formats.
   *
   * @param profileId User profile ID associated with this request.
   */
  async videoFormatsList(profileId: bigint): Promise<VideoFormatsListResponse> {
    profileId = String(profileId);
    const url = new URL(`${this.#baseUrl}userprofiles/${ profileId }/videoFormats`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVideoFormatsListResponse(data);
  }
}

/**
 * Contains properties of a Campaign Manager account.
 */
export interface Account {
  /**
   * Account permissions assigned to this account.
   */
  accountPermissionIds?: bigint[];
  /**
   * Profile for this account. This is a read-only field that can be left
   * blank.
   */
  accountProfile?:  | "ACCOUNT_PROFILE_BASIC" | "ACCOUNT_PROFILE_STANDARD";
  /**
   * Whether this account is active.
   */
  active?: boolean;
  /**
   * Maximum number of active ads allowed for this account.
   */
  activeAdsLimitTier?:  | "ACTIVE_ADS_TIER_40K" | "ACTIVE_ADS_TIER_75K" | "ACTIVE_ADS_TIER_100K" | "ACTIVE_ADS_TIER_200K" | "ACTIVE_ADS_TIER_300K" | "ACTIVE_ADS_TIER_500K" | "ACTIVE_ADS_TIER_750K" | "ACTIVE_ADS_TIER_1M";
  /**
   * Whether to serve creatives with Active View tags. If disabled, viewability
   * data will not be available for any impressions.
   */
  activeViewOptOut?: boolean;
  /**
   * User role permissions available to the user roles of this account.
   */
  availablePermissionIds?: bigint[];
  /**
   * ID of the country associated with this account.
   */
  countryId?: bigint;
  /**
   * ID of currency associated with this account. This is a required field.
   * Acceptable values are: - "1" for USD - "2" for GBP - "3" for ESP - "4" for
   * SEK - "5" for CAD - "6" for JPY - "7" for DEM - "8" for AUD - "9" for FRF -
   * "10" for ITL - "11" for DKK - "12" for NOK - "13" for FIM - "14" for ZAR -
   * "15" for IEP - "16" for NLG - "17" for EUR - "18" for KRW - "19" for TWD -
   * "20" for SGD - "21" for CNY - "22" for HKD - "23" for NZD - "24" for MYR -
   * "25" for BRL - "26" for PTE - "28" for CLP - "29" for TRY - "30" for ARS -
   * "31" for PEN - "32" for ILS - "33" for CHF - "34" for VEF - "35" for COP -
   * "36" for GTQ - "37" for PLN - "39" for INR - "40" for THB - "41" for IDR -
   * "42" for CZK - "43" for RON - "44" for HUF - "45" for RUB - "46" for AED -
   * "47" for BGN - "48" for HRK - "49" for MXN - "50" for NGN - "51" for EGP
   */
  currencyId?: bigint;
  /**
   * Default placement dimensions for this account.
   */
  defaultCreativeSizeId?: bigint;
  /**
   * Description of this account.
   */
  description?: string;
  /**
   * ID of this account. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#account".
   */
  kind?: string;
  /**
   * Locale of this account. Acceptable values are: - "cs" (Czech) - "de"
   * (German) - "en" (English) - "en-GB" (English United Kingdom) - "es"
   * (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko"
   * (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) -
   * "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW"
   * (Chinese Traditional)
   */
  locale?: string;
  /**
   * Maximum image size allowed for this account, in kilobytes. Value must be
   * greater than or equal to 1.
   */
  maximumImageSize?: bigint;
  /**
   * Name of this account. This is a required field, and must be less than 128
   * characters long and be globally unique.
   */
  name?: string;
  /**
   * Whether campaigns created in this account will be enabled for Nielsen OCR
   * reach ratings by default.
   */
  nielsenOcrEnabled?: boolean;
  /**
   * Reporting configuration of this account.
   */
  reportsConfiguration?: ReportsConfiguration;
  /**
   * Share Path to Conversion reports with Twitter.
   */
  shareReportsWithTwitter?: boolean;
  /**
   * File size limit in kilobytes of Rich Media teaser creatives. Acceptable
   * values are 1 to 10240, inclusive.
   */
  teaserSizeLimit?: bigint;
}

function serializeAccount(data: any): Account {
  return {
    ...data,
    accountPermissionIds: data["accountPermissionIds"] !== undefined ? data["accountPermissionIds"].map((item: any) => (String(item))) : undefined,
    availablePermissionIds: data["availablePermissionIds"] !== undefined ? data["availablePermissionIds"].map((item: any) => (String(item))) : undefined,
    countryId: data["countryId"] !== undefined ? String(data["countryId"]) : undefined,
    currencyId: data["currencyId"] !== undefined ? String(data["currencyId"]) : undefined,
    defaultCreativeSizeId: data["defaultCreativeSizeId"] !== undefined ? String(data["defaultCreativeSizeId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    maximumImageSize: data["maximumImageSize"] !== undefined ? String(data["maximumImageSize"]) : undefined,
    reportsConfiguration: data["reportsConfiguration"] !== undefined ? serializeReportsConfiguration(data["reportsConfiguration"]) : undefined,
    teaserSizeLimit: data["teaserSizeLimit"] !== undefined ? String(data["teaserSizeLimit"]) : undefined,
  };
}

function deserializeAccount(data: any): Account {
  return {
    ...data,
    accountPermissionIds: data["accountPermissionIds"] !== undefined ? data["accountPermissionIds"].map((item: any) => (BigInt(item))) : undefined,
    availablePermissionIds: data["availablePermissionIds"] !== undefined ? data["availablePermissionIds"].map((item: any) => (BigInt(item))) : undefined,
    countryId: data["countryId"] !== undefined ? BigInt(data["countryId"]) : undefined,
    currencyId: data["currencyId"] !== undefined ? BigInt(data["currencyId"]) : undefined,
    defaultCreativeSizeId: data["defaultCreativeSizeId"] !== undefined ? BigInt(data["defaultCreativeSizeId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    maximumImageSize: data["maximumImageSize"] !== undefined ? BigInt(data["maximumImageSize"]) : undefined,
    reportsConfiguration: data["reportsConfiguration"] !== undefined ? deserializeReportsConfiguration(data["reportsConfiguration"]) : undefined,
    teaserSizeLimit: data["teaserSizeLimit"] !== undefined ? BigInt(data["teaserSizeLimit"]) : undefined,
  };
}

/**
 * Gets a summary of active ads in an account.
 */
export interface AccountActiveAdSummary {
  /**
   * ID of the account.
   */
  accountId?: bigint;
  /**
   * Ads that have been activated for the account
   */
  activeAds?: bigint;
  /**
   * Maximum number of active ads allowed for the account.
   */
  activeAdsLimitTier?:  | "ACTIVE_ADS_TIER_40K" | "ACTIVE_ADS_TIER_75K" | "ACTIVE_ADS_TIER_100K" | "ACTIVE_ADS_TIER_200K" | "ACTIVE_ADS_TIER_300K" | "ACTIVE_ADS_TIER_500K" | "ACTIVE_ADS_TIER_750K" | "ACTIVE_ADS_TIER_1M";
  /**
   * Ads that can be activated for the account.
   */
  availableAds?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountActiveAdSummary".
   */
  kind?: string;
}

function serializeAccountActiveAdSummary(data: any): AccountActiveAdSummary {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    activeAds: data["activeAds"] !== undefined ? String(data["activeAds"]) : undefined,
    availableAds: data["availableAds"] !== undefined ? String(data["availableAds"]) : undefined,
  };
}

function deserializeAccountActiveAdSummary(data: any): AccountActiveAdSummary {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    activeAds: data["activeAds"] !== undefined ? BigInt(data["activeAds"]) : undefined,
    availableAds: data["availableAds"] !== undefined ? BigInt(data["availableAds"]) : undefined,
  };
}

/**
 * AccountPermissions contains information about a particular account
 * permission. Some features of Campaign Manager require an account permission
 * to be present in the account.
 */
export interface AccountPermission {
  /**
   * Account profiles associated with this account permission. Possible values
   * are: - "ACCOUNT_PROFILE_BASIC" - "ACCOUNT_PROFILE_STANDARD"
   */
  accountProfiles?:  | "ACCOUNT_PROFILE_BASIC" | "ACCOUNT_PROFILE_STANDARD"[];
  /**
   * ID of this account permission.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountPermission".
   */
  kind?: string;
  /**
   * Administrative level required to enable this account permission.
   */
  level?:  | "USER" | "ADMINISTRATOR";
  /**
   * Name of this account permission.
   */
  name?: string;
  /**
   * Permission group of this account permission.
   */
  permissionGroupId?: bigint;
}

function serializeAccountPermission(data: any): AccountPermission {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    permissionGroupId: data["permissionGroupId"] !== undefined ? String(data["permissionGroupId"]) : undefined,
  };
}

function deserializeAccountPermission(data: any): AccountPermission {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    permissionGroupId: data["permissionGroupId"] !== undefined ? BigInt(data["permissionGroupId"]) : undefined,
  };
}

/**
 * AccountPermissionGroups contains a mapping of permission group IDs to names.
 * A permission group is a grouping of account permissions.
 */
export interface AccountPermissionGroup {
  /**
   * ID of this account permission group.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountPermissionGroup".
   */
  kind?: string;
  /**
   * Name of this account permission group.
   */
  name?: string;
}

function serializeAccountPermissionGroup(data: any): AccountPermissionGroup {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeAccountPermissionGroup(data: any): AccountPermissionGroup {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Account Permission Group List Response
 */
export interface AccountPermissionGroupsListResponse {
  /**
   * Account permission group collection.
   */
  accountPermissionGroups?: AccountPermissionGroup[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountPermissionGroupsListResponse".
   */
  kind?: string;
}

function serializeAccountPermissionGroupsListResponse(data: any): AccountPermissionGroupsListResponse {
  return {
    ...data,
    accountPermissionGroups: data["accountPermissionGroups"] !== undefined ? data["accountPermissionGroups"].map((item: any) => (serializeAccountPermissionGroup(item))) : undefined,
  };
}

function deserializeAccountPermissionGroupsListResponse(data: any): AccountPermissionGroupsListResponse {
  return {
    ...data,
    accountPermissionGroups: data["accountPermissionGroups"] !== undefined ? data["accountPermissionGroups"].map((item: any) => (deserializeAccountPermissionGroup(item))) : undefined,
  };
}

/**
 * Account Permission List Response
 */
export interface AccountPermissionsListResponse {
  /**
   * Account permission collection.
   */
  accountPermissions?: AccountPermission[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountPermissionsListResponse".
   */
  kind?: string;
}

function serializeAccountPermissionsListResponse(data: any): AccountPermissionsListResponse {
  return {
    ...data,
    accountPermissions: data["accountPermissions"] !== undefined ? data["accountPermissions"].map((item: any) => (serializeAccountPermission(item))) : undefined,
  };
}

function deserializeAccountPermissionsListResponse(data: any): AccountPermissionsListResponse {
  return {
    ...data,
    accountPermissions: data["accountPermissions"] !== undefined ? data["accountPermissions"].map((item: any) => (deserializeAccountPermission(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#accountsList.
 */
export interface AccountsListOptions {
  /**
   * Select only active accounts. Don't set this field to select both active
   * and non-active accounts.
   */
  active?: boolean;
  /**
   * Select only accounts with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "account*2015" will return objects with names like "account June
   * 2015", "account April 2015", or simply "account 2015". Most of the searches
   * also add wildcards implicitly at the start and the end of the search
   * string. For example, a search string of "account" will match objects with
   * name "my account", "account 2015", or simply "account".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeAccountsListOptions(data: any): AccountsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeAccountsListOptions(data: any): AccountsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Account List Response
 */
export interface AccountsListResponse {
  /**
   * Account collection.
   */
  accounts?: Account[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAccountsListResponse(data: any): AccountsListResponse {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (serializeAccount(item))) : undefined,
  };
}

function deserializeAccountsListResponse(data: any): AccountsListResponse {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (deserializeAccount(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#accountsPatch.
 */
export interface AccountsPatchOptions {
  /**
   * Account ID.
   */
  id: bigint;
}

function serializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * AccountUserProfiles contains properties of a Campaign Manager user profile.
 * This resource is specifically for managing user profiles, whereas
 * UserProfiles is for accessing the API.
 */
export interface AccountUserProfile {
  /**
   * Account ID of the user profile. This is a read-only field that can be left
   * blank.
   */
  accountId?: bigint;
  /**
   * Whether this user profile is active. This defaults to false, and must be
   * set true on insert for the user profile to be usable.
   */
  active?: boolean;
  /**
   * Filter that describes which advertisers are visible to the user profile.
   */
  advertiserFilter?: ObjectFilter;
  /**
   * Filter that describes which campaigns are visible to the user profile.
   */
  campaignFilter?: ObjectFilter;
  /**
   * Comments for this user profile.
   */
  comments?: string;
  /**
   * Email of the user profile. The email addresss must be linked to a Google
   * Account. This field is required on insertion and is read-only after
   * insertion.
   */
  email?: string;
  /**
   * ID of the user profile. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountUserProfile".
   */
  kind?: string;
  /**
   * Locale of the user profile. This is a required field. Acceptable values
   * are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English
   * United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja"
   * (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) -
   * "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese
   * Simplified) - "zh-TW" (Chinese Traditional)
   */
  locale?: string;
  /**
   * Name of the user profile. This is a required field. Must be less than 64
   * characters long, must be globally unique, and cannot contain whitespace or
   * any of the following characters: "&;<>"#%,".
   */
  name?: string;
  /**
   * Filter that describes which sites are visible to the user profile.
   */
  siteFilter?: ObjectFilter;
  /**
   * Subaccount ID of the user profile. This is a read-only field that can be
   * left blank.
   */
  subaccountId?: bigint;
  /**
   * Trafficker type of this user profile. This is a read-only field.
   */
  traffickerType?:  | "INTERNAL_NON_TRAFFICKER" | "INTERNAL_TRAFFICKER" | "EXTERNAL_TRAFFICKER";
  /**
   * User type of the user profile. This is a read-only field that can be left
   * blank.
   */
  userAccessType?:  | "NORMAL_USER" | "SUPER_USER" | "INTERNAL_ADMINISTRATOR" | "READ_ONLY_SUPER_USER";
  /**
   * Filter that describes which user roles are visible to the user profile.
   */
  userRoleFilter?: ObjectFilter;
  /**
   * User role ID of the user profile. This is a required field.
   */
  userRoleId?: bigint;
}

function serializeAccountUserProfile(data: any): AccountUserProfile {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserFilter: data["advertiserFilter"] !== undefined ? serializeObjectFilter(data["advertiserFilter"]) : undefined,
    campaignFilter: data["campaignFilter"] !== undefined ? serializeObjectFilter(data["campaignFilter"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    siteFilter: data["siteFilter"] !== undefined ? serializeObjectFilter(data["siteFilter"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    userRoleFilter: data["userRoleFilter"] !== undefined ? serializeObjectFilter(data["userRoleFilter"]) : undefined,
    userRoleId: data["userRoleId"] !== undefined ? String(data["userRoleId"]) : undefined,
  };
}

function deserializeAccountUserProfile(data: any): AccountUserProfile {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserFilter: data["advertiserFilter"] !== undefined ? deserializeObjectFilter(data["advertiserFilter"]) : undefined,
    campaignFilter: data["campaignFilter"] !== undefined ? deserializeObjectFilter(data["campaignFilter"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    siteFilter: data["siteFilter"] !== undefined ? deserializeObjectFilter(data["siteFilter"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    userRoleFilter: data["userRoleFilter"] !== undefined ? deserializeObjectFilter(data["userRoleFilter"]) : undefined,
    userRoleId: data["userRoleId"] !== undefined ? BigInt(data["userRoleId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#accountUserProfilesList.
 */
export interface AccountUserProfilesListOptions {
  /**
   * Select only active user profiles.
   */
  active?: boolean;
  /**
   * Select only user profiles with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name, ID or email. Wildcards (*) are
   * allowed. For example, "user profile*2015" will return objects with names
   * like "user profile June 2015", "user profile April 2015", or simply "user
   * profile 2015". Most of the searches also add wildcards implicitly at the
   * start and the end of the search string. For example, a search string of
   * "user profile" will match objects with name "my user profile", "user
   * profile 2015", or simply "user profile".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only user profiles with the specified subaccount ID.
   */
  subaccountId?: bigint;
  /**
   * Select only user profiles with the specified user role ID.
   */
  userRoleId?: bigint;
}

function serializeAccountUserProfilesListOptions(data: any): AccountUserProfilesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    userRoleId: data["userRoleId"] !== undefined ? String(data["userRoleId"]) : undefined,
  };
}

function deserializeAccountUserProfilesListOptions(data: any): AccountUserProfilesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    userRoleId: data["userRoleId"] !== undefined ? BigInt(data["userRoleId"]) : undefined,
  };
}

/**
 * Account User Profile List Response
 */
export interface AccountUserProfilesListResponse {
  /**
   * Account user profile collection.
   */
  accountUserProfiles?: AccountUserProfile[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#accountUserProfilesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAccountUserProfilesListResponse(data: any): AccountUserProfilesListResponse {
  return {
    ...data,
    accountUserProfiles: data["accountUserProfiles"] !== undefined ? data["accountUserProfiles"].map((item: any) => (serializeAccountUserProfile(item))) : undefined,
  };
}

function deserializeAccountUserProfilesListResponse(data: any): AccountUserProfilesListResponse {
  return {
    ...data,
    accountUserProfiles: data["accountUserProfiles"] !== undefined ? data["accountUserProfiles"].map((item: any) => (deserializeAccountUserProfile(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#accountUserProfilesPatch.
 */
export interface AccountUserProfilesPatchOptions {
  /**
   * AccountUserProfile ID.
   */
  id: bigint;
}

function serializeAccountUserProfilesPatchOptions(data: any): AccountUserProfilesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAccountUserProfilesPatchOptions(data: any): AccountUserProfilesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents an activity group.
 */
export interface Activities {
  /**
   * List of activity filters. The dimension values need to be all either of
   * type "dfa:activity" or "dfa:activityGroup".
   */
  filters?: DimensionValue[];
  /**
   * The kind of resource this is, in this case dfareporting#activities.
   */
  kind?: string;
  /**
   * List of names of floodlight activity metrics.
   */
  metricNames?: string[];
}

/**
 * Contains properties of a Campaign Manager ad.
 */
export interface Ad {
  /**
   * Account ID of this ad. This is a read-only field that can be left blank.
   */
  accountId?: bigint;
  /**
   * Whether this ad is active. When true, archived must be false.
   */
  active?: boolean;
  /**
   * Advertiser ID of this ad. This is a required field on insertion.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Whether this ad is archived. When true, active must be false.
   */
  archived?: boolean;
  /**
   * Audience segment ID that is being targeted for this ad. Applicable when
   * type is AD_SERVING_STANDARD_AD.
   */
  audienceSegmentId?: bigint;
  /**
   * Campaign ID of this ad. This is a required field on insertion.
   */
  campaignId?: bigint;
  /**
   * Dimension value for the ID of the campaign. This is a read-only,
   * auto-generated field.
   */
  campaignIdDimensionValue?: DimensionValue;
  /**
   * Click-through URL for this ad. This is a required field on insertion.
   * Applicable when type is AD_SERVING_CLICK_TRACKER.
   */
  clickThroughUrl?: ClickThroughUrl;
  /**
   * Click-through URL suffix properties for this ad. Applies to the URL in the
   * ad or (if overriding ad properties) the URL in the creative.
   */
  clickThroughUrlSuffixProperties?: ClickThroughUrlSuffixProperties;
  /**
   * Comments for this ad.
   */
  comments?: string;
  /**
   * Compatibility of this ad. Applicable when type is AD_SERVING_DEFAULT_AD.
   * DISPLAY and DISPLAY_INTERSTITIAL refer to either rendering on desktop or on
   * mobile devices or in mobile apps for regular or interstitial ads,
   * respectively. APP and APP_INTERSTITIAL are only used for existing default
   * ads. New mobile placements must be assigned DISPLAY or DISPLAY_INTERSTITIAL
   * and default ads created for those placements will be limited to those
   * compatibility types. IN_STREAM_VIDEO refers to rendering in-stream video
   * ads developed with the VAST standard.
   */
  compatibility?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO";
  /**
   * Information about the creation of this ad. This is a read-only field.
   */
  createInfo?: LastModifiedInfo;
  /**
   * Creative group assignments for this ad. Applicable when type is
   * AD_SERVING_CLICK_TRACKER. Only one assignment per creative group number is
   * allowed for a maximum of two assignments.
   */
  creativeGroupAssignments?: CreativeGroupAssignment[];
  /**
   * Creative rotation for this ad. Applicable when type is
   * AD_SERVING_DEFAULT_AD, AD_SERVING_STANDARD_AD, or AD_SERVING_TRACKING. When
   * type is AD_SERVING_DEFAULT_AD, this field should have exactly one
   * creativeAssignment .
   */
  creativeRotation?: CreativeRotation;
  /**
   * Time and day targeting information for this ad. This field must be left
   * blank if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  dayPartTargeting?: DayPartTargeting;
  /**
   * Default click-through event tag properties for this ad.
   */
  defaultClickThroughEventTagProperties?: DefaultClickThroughEventTagProperties;
  /**
   * Delivery schedule information for this ad. Applicable when type is
   * AD_SERVING_STANDARD_AD or AD_SERVING_TRACKING. This field along with
   * subfields priority and impressionRatio are required on insertion when type
   * is AD_SERVING_STANDARD_AD.
   */
  deliverySchedule?: DeliverySchedule;
  /**
   * Whether this ad is a dynamic click tracker. Applicable when type is
   * AD_SERVING_CLICK_TRACKER. This is a required field on insert, and is
   * read-only after insert.
   */
  dynamicClickTracker?: boolean;
  endTime?: Date;
  /**
   * Event tag overrides for this ad.
   */
  eventTagOverrides?: EventTagOverride[];
  /**
   * Geographical targeting information for this ad. This field must be left
   * blank if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  geoTargeting?: GeoTargeting;
  /**
   * ID of this ad. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this ad. This is a read-only, auto-generated
   * field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Key-value targeting information for this ad. This field must be left blank
   * if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  keyValueTargetingExpression?: KeyValueTargetingExpression;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#ad".
   */
  kind?: string;
  /**
   * Language targeting information for this ad. This field must be left blank
   * if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  languageTargeting?: LanguageTargeting;
  /**
   * Information about the most recent modification of this ad. This is a
   * read-only field.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Name of this ad. This is a required field and must be less than 256
   * characters long.
   */
  name?: string;
  /**
   * Placement assignments for this ad.
   */
  placementAssignments?: PlacementAssignment[];
  /**
   * Remarketing list targeting expression for this ad. This field must be left
   * blank if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  remarketingListExpression?: ListTargetingExpression;
  /**
   * Size of this ad. Applicable when type is AD_SERVING_DEFAULT_AD.
   */
  size?: Size;
  /**
   * Whether this ad is ssl compliant. This is a read-only field that is
   * auto-generated when the ad is inserted or updated.
   */
  sslCompliant?: boolean;
  /**
   * Whether this ad requires ssl. This is a read-only field that is
   * auto-generated when the ad is inserted or updated.
   */
  sslRequired?: boolean;
  startTime?: Date;
  /**
   * Subaccount ID of this ad. This is a read-only field that can be left
   * blank.
   */
  subaccountId?: bigint;
  /**
   * Targeting template ID, used to apply preconfigured targeting information
   * to this ad. This cannot be set while any of dayPartTargeting, geoTargeting,
   * keyValueTargetingExpression, languageTargeting, remarketingListExpression,
   * or technologyTargeting are set. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  targetingTemplateId?: bigint;
  /**
   * Technology platform targeting information for this ad. This field must be
   * left blank if the ad is using a targeting template. Applicable when type is
   * AD_SERVING_STANDARD_AD.
   */
  technologyTargeting?: TechnologyTargeting;
  /**
   * Type of ad. This is a required field on insertion. Note that default ads (
   * AD_SERVING_DEFAULT_AD) cannot be created directly (see Creative resource).
   */
  type?:  | "AD_SERVING_STANDARD_AD" | "AD_SERVING_DEFAULT_AD" | "AD_SERVING_CLICK_TRACKER" | "AD_SERVING_TRACKING" | "AD_SERVING_BRAND_SAFE_AD";
}

function serializeAd(data: any): Ad {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    audienceSegmentId: data["audienceSegmentId"] !== undefined ? String(data["audienceSegmentId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? serializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? serializeLastModifiedInfo(data["createInfo"]) : undefined,
    creativeGroupAssignments: data["creativeGroupAssignments"] !== undefined ? data["creativeGroupAssignments"].map((item: any) => (serializeCreativeGroupAssignment(item))) : undefined,
    creativeRotation: data["creativeRotation"] !== undefined ? serializeCreativeRotation(data["creativeRotation"]) : undefined,
    defaultClickThroughEventTagProperties: data["defaultClickThroughEventTagProperties"] !== undefined ? serializeDefaultClickThroughEventTagProperties(data["defaultClickThroughEventTagProperties"]) : undefined,
    deliverySchedule: data["deliverySchedule"] !== undefined ? serializeDeliverySchedule(data["deliverySchedule"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    eventTagOverrides: data["eventTagOverrides"] !== undefined ? data["eventTagOverrides"].map((item: any) => (serializeEventTagOverride(item))) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? serializeGeoTargeting(data["geoTargeting"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    languageTargeting: data["languageTargeting"] !== undefined ? serializeLanguageTargeting(data["languageTargeting"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementAssignments: data["placementAssignments"] !== undefined ? data["placementAssignments"].map((item: any) => (serializePlacementAssignment(item))) : undefined,
    size: data["size"] !== undefined ? serializeSize(data["size"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    targetingTemplateId: data["targetingTemplateId"] !== undefined ? String(data["targetingTemplateId"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? serializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

function deserializeAd(data: any): Ad {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    audienceSegmentId: data["audienceSegmentId"] !== undefined ? BigInt(data["audienceSegmentId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? deserializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? deserializeLastModifiedInfo(data["createInfo"]) : undefined,
    creativeGroupAssignments: data["creativeGroupAssignments"] !== undefined ? data["creativeGroupAssignments"].map((item: any) => (deserializeCreativeGroupAssignment(item))) : undefined,
    creativeRotation: data["creativeRotation"] !== undefined ? deserializeCreativeRotation(data["creativeRotation"]) : undefined,
    defaultClickThroughEventTagProperties: data["defaultClickThroughEventTagProperties"] !== undefined ? deserializeDefaultClickThroughEventTagProperties(data["defaultClickThroughEventTagProperties"]) : undefined,
    deliverySchedule: data["deliverySchedule"] !== undefined ? deserializeDeliverySchedule(data["deliverySchedule"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    eventTagOverrides: data["eventTagOverrides"] !== undefined ? data["eventTagOverrides"].map((item: any) => (deserializeEventTagOverride(item))) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeGeoTargeting(data["geoTargeting"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    languageTargeting: data["languageTargeting"] !== undefined ? deserializeLanguageTargeting(data["languageTargeting"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementAssignments: data["placementAssignments"] !== undefined ? data["placementAssignments"].map((item: any) => (deserializePlacementAssignment(item))) : undefined,
    size: data["size"] !== undefined ? deserializeSize(data["size"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    targetingTemplateId: data["targetingTemplateId"] !== undefined ? BigInt(data["targetingTemplateId"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? deserializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

/**
 * Campaign ad blocking settings.
 */
export interface AdBlockingConfiguration {
  /**
   * Whether this campaign has enabled ad blocking. When true, ad blocking is
   * enabled for placements in the campaign, but this may be overridden by site
   * and placement settings. When false, ad blocking is disabled for all
   * placements under the campaign, regardless of site and placement settings.
   */
  enabled?: boolean;
}

/**
 * Additional options for dfareporting#adsList.
 */
export interface AdsListOptions {
  /**
   * Select only active ads.
   */
  active?: boolean;
  /**
   * Select only ads with this advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * Select only archived ads.
   */
  archived?: boolean;
  /**
   * Select only ads with these audience segment IDs.
   */
  audienceSegmentIds?: bigint;
  /**
   * Select only ads with these campaign IDs.
   */
  campaignIds?: bigint;
  /**
   * Select default ads with the specified compatibility. Applicable when type
   * is AD_SERVING_DEFAULT_AD. DISPLAY and DISPLAY_INTERSTITIAL refer to
   * rendering either on desktop or on mobile devices for regular or
   * interstitial ads, respectively. APP and APP_INTERSTITIAL are for rendering
   * in mobile apps. IN_STREAM_VIDEO refers to rendering an in-stream video ads
   * developed with the VAST standard.
   */
  compatibility?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO";
  /**
   * Select only ads with these creative IDs assigned.
   */
  creativeIds?: bigint;
  /**
   * Select only ads with these creative optimization configuration IDs.
   */
  creativeOptimizationConfigurationIds?: bigint;
  /**
   * Select only dynamic click trackers. Applicable when type is
   * AD_SERVING_CLICK_TRACKER. If true, select dynamic click trackers. If false,
   * select static click trackers. Leave unset to select both.
   */
  dynamicClickTracker?: boolean;
  /**
   * Select only ads with these IDs.
   */
  ids?: bigint;
  /**
   * Select only ads with these landing page IDs.
   */
  landingPageIds?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only ads with this event tag override ID.
   */
  overriddenEventTagId?: bigint;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only ads with these placement IDs assigned.
   */
  placementIds?: bigint;
  /**
   * Select only ads whose list targeting expression use these remarketing list
   * IDs.
   */
  remarketingListIds?: bigint;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "ad*2015" will return objects with names like "ad June 2015", "ad
   * April 2015", or simply "ad 2015". Most of the searches also add wildcards
   * implicitly at the start and the end of the search string. For example, a
   * search string of "ad" will match objects with name "my ad", "ad 2015", or
   * simply "ad".
   */
  searchString?: string;
  /**
   * Select only ads with these size IDs.
   */
  sizeIds?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only ads that are SSL-compliant.
   */
  sslCompliant?: boolean;
  /**
   * Select only ads that require SSL.
   */
  sslRequired?: boolean;
  /**
   * Select only ads with these types.
   */
  type?:  | "AD_SERVING_STANDARD_AD" | "AD_SERVING_DEFAULT_AD" | "AD_SERVING_CLICK_TRACKER" | "AD_SERVING_TRACKING" | "AD_SERVING_BRAND_SAFE_AD";
}

function serializeAdsListOptions(data: any): AdsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    audienceSegmentIds: data["audienceSegmentIds"] !== undefined ? String(data["audienceSegmentIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? String(data["campaignIds"]) : undefined,
    creativeIds: data["creativeIds"] !== undefined ? String(data["creativeIds"]) : undefined,
    creativeOptimizationConfigurationIds: data["creativeOptimizationConfigurationIds"] !== undefined ? String(data["creativeOptimizationConfigurationIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    landingPageIds: data["landingPageIds"] !== undefined ? String(data["landingPageIds"]) : undefined,
    overriddenEventTagId: data["overriddenEventTagId"] !== undefined ? String(data["overriddenEventTagId"]) : undefined,
    placementIds: data["placementIds"] !== undefined ? String(data["placementIds"]) : undefined,
    remarketingListIds: data["remarketingListIds"] !== undefined ? String(data["remarketingListIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? String(data["sizeIds"]) : undefined,
  };
}

function deserializeAdsListOptions(data: any): AdsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    audienceSegmentIds: data["audienceSegmentIds"] !== undefined ? BigInt(data["audienceSegmentIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? BigInt(data["campaignIds"]) : undefined,
    creativeIds: data["creativeIds"] !== undefined ? BigInt(data["creativeIds"]) : undefined,
    creativeOptimizationConfigurationIds: data["creativeOptimizationConfigurationIds"] !== undefined ? BigInt(data["creativeOptimizationConfigurationIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    landingPageIds: data["landingPageIds"] !== undefined ? BigInt(data["landingPageIds"]) : undefined,
    overriddenEventTagId: data["overriddenEventTagId"] !== undefined ? BigInt(data["overriddenEventTagId"]) : undefined,
    placementIds: data["placementIds"] !== undefined ? BigInt(data["placementIds"]) : undefined,
    remarketingListIds: data["remarketingListIds"] !== undefined ? BigInt(data["remarketingListIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? BigInt(data["sizeIds"]) : undefined,
  };
}

/**
 * Ad List Response
 */
export interface AdsListResponse {
  /**
   * Ad collection.
   */
  ads?: Ad[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#adsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAdsListResponse(data: any): AdsListResponse {
  return {
    ...data,
    ads: data["ads"] !== undefined ? data["ads"].map((item: any) => (serializeAd(item))) : undefined,
  };
}

function deserializeAdsListResponse(data: any): AdsListResponse {
  return {
    ...data,
    ads: data["ads"] !== undefined ? data["ads"].map((item: any) => (deserializeAd(item))) : undefined,
  };
}

/**
 * Ad Slot
 */
export interface AdSlot {
  /**
   * Comment for this ad slot.
   */
  comment?: string;
  /**
   * Ad slot compatibility. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering
   * either on desktop, mobile devices or in mobile apps for regular or
   * interstitial ads respectively. APP and APP_INTERSTITIAL are for rendering
   * in mobile apps. IN_STREAM_VIDEO refers to rendering in in-stream video ads
   * developed with the VAST standard.
   */
  compatibility?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO";
  /**
   * Height of this ad slot.
   */
  height?: bigint;
  /**
   * ID of the placement from an external platform that is linked to this ad
   * slot.
   */
  linkedPlacementId?: bigint;
  /**
   * Name of this ad slot.
   */
  name?: string;
  /**
   * Payment source type of this ad slot.
   */
  paymentSourceType?:  | "PLANNING_PAYMENT_SOURCE_TYPE_AGENCY_PAID" | "PLANNING_PAYMENT_SOURCE_TYPE_PUBLISHER_PAID";
  /**
   * Primary ad slot of a roadblock inventory item.
   */
  primary?: boolean;
  /**
   * Width of this ad slot.
   */
  width?: bigint;
}

function serializeAdSlot(data: any): AdSlot {
  return {
    ...data,
    height: data["height"] !== undefined ? String(data["height"]) : undefined,
    linkedPlacementId: data["linkedPlacementId"] !== undefined ? String(data["linkedPlacementId"]) : undefined,
    width: data["width"] !== undefined ? String(data["width"]) : undefined,
  };
}

function deserializeAdSlot(data: any): AdSlot {
  return {
    ...data,
    height: data["height"] !== undefined ? BigInt(data["height"]) : undefined,
    linkedPlacementId: data["linkedPlacementId"] !== undefined ? BigInt(data["linkedPlacementId"]) : undefined,
    width: data["width"] !== undefined ? BigInt(data["width"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#adsPatch.
 */
export interface AdsPatchOptions {
  /**
   * Ad ID.
   */
  id: bigint;
}

function serializeAdsPatchOptions(data: any): AdsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAdsPatchOptions(data: any): AdsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Contains properties of a Campaign Manager advertiser.
 */
export interface Advertiser {
  /**
   * Account ID of this advertiser.This is a read-only field that can be left
   * blank.
   */
  accountId?: bigint;
  /**
   * ID of the advertiser group this advertiser belongs to. You can group
   * advertisers for reporting purposes, allowing you to see aggregated
   * information for all advertisers in each group.
   */
  advertiserGroupId?: bigint;
  /**
   * Suffix added to click-through URL of ad creative associations under this
   * advertiser. Must be less than 129 characters long.
   */
  clickThroughUrlSuffix?: string;
  /**
   * ID of the click-through event tag to apply by default to the landing pages
   * of this advertiser's campaigns.
   */
  defaultClickThroughEventTagId?: bigint;
  /**
   * Default email address used in sender field for tag emails.
   */
  defaultEmail?: string;
  /**
   * Floodlight configuration ID of this advertiser. The floodlight
   * configuration ID will be created automatically, so on insert this field
   * should be left blank. This field can be set to another advertiser's
   * floodlight configuration ID in order to share that advertiser's floodlight
   * configuration with this advertiser, so long as: - This advertiser's
   * original floodlight configuration is not already associated with floodlight
   * activities or floodlight activity groups. - This advertiser's original
   * floodlight configuration is not already shared with another advertiser.
   */
  floodlightConfigurationId?: bigint;
  /**
   * Dimension value for the ID of the floodlight configuration. This is a
   * read-only, auto-generated field.
   */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /**
   * ID of this advertiser. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this advertiser. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertiser".
   */
  kind?: string;
  /**
   * Measurement partner advertiser link for tag wrapping.
   */
  measurementPartnerLink?: MeasurementPartnerAdvertiserLink;
  /**
   * Name of this advertiser. This is a required field and must be less than
   * 256 characters long and unique among advertisers of the same account.
   */
  name?: string;
  /**
   * Original floodlight configuration before any sharing occurred. Set the
   * floodlightConfigurationId of this advertiser to
   * originalFloodlightConfigurationId to unshare the advertiser's current
   * floodlight configuration. You cannot unshare an advertiser's floodlight
   * configuration if the shared configuration has activities associated with
   * any campaign or placement.
   */
  originalFloodlightConfigurationId?: bigint;
  /**
   * Status of this advertiser.
   */
  status?:  | "APPROVED" | "ON_HOLD";
  /**
   * Subaccount ID of this advertiser.This is a read-only field that can be
   * left blank.
   */
  subaccountId?: bigint;
  /**
   * Suspension status of this advertiser.
   */
  suspended?: boolean;
}

function serializeAdvertiser(data: any): Advertiser {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserGroupId: data["advertiserGroupId"] !== undefined ? String(data["advertiserGroupId"]) : undefined,
    defaultClickThroughEventTagId: data["defaultClickThroughEventTagId"] !== undefined ? String(data["defaultClickThroughEventTagId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    originalFloodlightConfigurationId: data["originalFloodlightConfigurationId"] !== undefined ? String(data["originalFloodlightConfigurationId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeAdvertiser(data: any): Advertiser {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserGroupId: data["advertiserGroupId"] !== undefined ? BigInt(data["advertiserGroupId"]) : undefined,
    defaultClickThroughEventTagId: data["defaultClickThroughEventTagId"] !== undefined ? BigInt(data["defaultClickThroughEventTagId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    originalFloodlightConfigurationId: data["originalFloodlightConfigurationId"] !== undefined ? BigInt(data["originalFloodlightConfigurationId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Groups advertisers together so that reports can be generated for the entire
 * group at once.
 */
export interface AdvertiserGroup {
  /**
   * Account ID of this advertiser group. This is a read-only field that can be
   * left blank.
   */
  accountId?: bigint;
  /**
   * ID of this advertiser group. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertiserGroup".
   */
  kind?: string;
  /**
   * Name of this advertiser group. This is a required field and must be less
   * than 256 characters long and unique among advertiser groups of the same
   * account.
   */
  name?: string;
}

function serializeAdvertiserGroup(data: any): AdvertiserGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeAdvertiserGroup(data: any): AdvertiserGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#advertiserGroupsList.
 */
export interface AdvertiserGroupsListOptions {
  /**
   * Select only advertiser groups with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "advertiser*2015" will return objects with names like "advertiser
   * group June 2015", "advertiser group April 2015", or simply "advertiser
   * group 2015". Most of the searches also add wildcards implicitly at the
   * start and the end of the search string. For example, a search string of
   * "advertisergroup" will match objects with name "my advertisergroup",
   * "advertisergroup 2015", or simply "advertisergroup".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeAdvertiserGroupsListOptions(data: any): AdvertiserGroupsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeAdvertiserGroupsListOptions(data: any): AdvertiserGroupsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Advertiser Group List Response
 */
export interface AdvertiserGroupsListResponse {
  /**
   * Advertiser group collection.
   */
  advertiserGroups?: AdvertiserGroup[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertiserGroupsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAdvertiserGroupsListResponse(data: any): AdvertiserGroupsListResponse {
  return {
    ...data,
    advertiserGroups: data["advertiserGroups"] !== undefined ? data["advertiserGroups"].map((item: any) => (serializeAdvertiserGroup(item))) : undefined,
  };
}

function deserializeAdvertiserGroupsListResponse(data: any): AdvertiserGroupsListResponse {
  return {
    ...data,
    advertiserGroups: data["advertiserGroups"] !== undefined ? data["advertiserGroups"].map((item: any) => (deserializeAdvertiserGroup(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#advertiserGroupsPatch.
 */
export interface AdvertiserGroupsPatchOptions {
  /**
   * AdvertiserGroup ID.
   */
  id: bigint;
}

function serializeAdvertiserGroupsPatchOptions(data: any): AdvertiserGroupsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAdvertiserGroupsPatchOptions(data: any): AdvertiserGroupsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Additional options for dfareporting#advertiserInvoicesList.
 */
export interface AdvertiserInvoicesListOptions {
  /**
   * Month for which invoices are needed in the format YYYYMM. Required field
   */
  issueMonth?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
}

/**
 * Invoice List Response
 */
export interface AdvertiserInvoicesListResponse {
  /**
   * Invoice collection
   */
  invoices?: Invoice[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertiserInvoicesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAdvertiserInvoicesListResponse(data: any): AdvertiserInvoicesListResponse {
  return {
    ...data,
    invoices: data["invoices"] !== undefined ? data["invoices"].map((item: any) => (serializeInvoice(item))) : undefined,
  };
}

function deserializeAdvertiserInvoicesListResponse(data: any): AdvertiserInvoicesListResponse {
  return {
    ...data,
    invoices: data["invoices"] !== undefined ? data["invoices"].map((item: any) => (deserializeInvoice(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#advertiserLandingPagesList.
 */
export interface AdvertiserLandingPagesListOptions {
  /**
   * Select only landing pages that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only archived landing pages. Don't set this field to select both
   * archived and non-archived landing pages.
   */
  archived?: boolean;
  /**
   * Select only landing pages that are associated with these campaigns.
   */
  campaignIds?: bigint;
  /**
   * Select only landing pages with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for landing pages by name or ID. Wildcards (*) are
   * allowed. For example, "landingpage*2017" will return landing pages with
   * names like "landingpage July 2017", "landingpage March 2017", or simply
   * "landingpage 2017". Most of the searches also add wildcards implicitly at
   * the start and the end of the search string. For example, a search string of
   * "landingpage" will match campaigns with name "my landingpage", "landingpage
   * 2015", or simply "landingpage".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only landing pages that belong to this subaccount.
   */
  subaccountId?: bigint;
}

function serializeAdvertiserLandingPagesListOptions(data: any): AdvertiserLandingPagesListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? String(data["campaignIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeAdvertiserLandingPagesListOptions(data: any): AdvertiserLandingPagesListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? BigInt(data["campaignIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Landing Page List Response
 */
export interface AdvertiserLandingPagesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertiserLandingPagesListResponse".
   */
  kind?: string;
  /**
   * Landing page collection
   */
  landingPages?: LandingPage[];
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAdvertiserLandingPagesListResponse(data: any): AdvertiserLandingPagesListResponse {
  return {
    ...data,
    landingPages: data["landingPages"] !== undefined ? data["landingPages"].map((item: any) => (serializeLandingPage(item))) : undefined,
  };
}

function deserializeAdvertiserLandingPagesListResponse(data: any): AdvertiserLandingPagesListResponse {
  return {
    ...data,
    landingPages: data["landingPages"] !== undefined ? data["landingPages"].map((item: any) => (deserializeLandingPage(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#advertiserLandingPagesPatch.
 */
export interface AdvertiserLandingPagesPatchOptions {
  /**
   * LandingPage ID.
   */
  id: bigint;
}

function serializeAdvertiserLandingPagesPatchOptions(data: any): AdvertiserLandingPagesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAdvertiserLandingPagesPatchOptions(data: any): AdvertiserLandingPagesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Additional options for dfareporting#advertisersList.
 */
export interface AdvertisersListOptions {
  /**
   * Select only advertisers with these advertiser group IDs.
   */
  advertiserGroupIds?: bigint;
  /**
   * Select only advertisers with these floodlight configuration IDs.
   */
  floodlightConfigurationIds?: bigint;
  /**
   * Select only advertisers with these IDs.
   */
  ids?: bigint;
  /**
   * Select only advertisers which do not belong to any advertiser group.
   */
  includeAdvertisersWithoutGroupsOnly?: boolean;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only advertisers which use another advertiser's floodlight
   * configuration.
   */
  onlyParent?: boolean;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "advertiser*2015" will return objects with names like "advertiser
   * June 2015", "advertiser April 2015", or simply "advertiser 2015". Most of
   * the searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "advertiser" will match
   * objects with name "my advertiser", "advertiser 2015", or simply
   * "advertiser" .
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only advertisers with the specified status.
   */
  status?:  | "APPROVED" | "ON_HOLD";
  /**
   * Select only advertisers with these subaccount IDs.
   */
  subaccountId?: bigint;
}

function serializeAdvertisersListOptions(data: any): AdvertisersListOptions {
  return {
    ...data,
    advertiserGroupIds: data["advertiserGroupIds"] !== undefined ? String(data["advertiserGroupIds"]) : undefined,
    floodlightConfigurationIds: data["floodlightConfigurationIds"] !== undefined ? String(data["floodlightConfigurationIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeAdvertisersListOptions(data: any): AdvertisersListOptions {
  return {
    ...data,
    advertiserGroupIds: data["advertiserGroupIds"] !== undefined ? BigInt(data["advertiserGroupIds"]) : undefined,
    floodlightConfigurationIds: data["floodlightConfigurationIds"] !== undefined ? BigInt(data["floodlightConfigurationIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Advertiser List Response
 */
export interface AdvertisersListResponse {
  /**
   * Advertiser collection.
   */
  advertisers?: Advertiser[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#advertisersListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeAdvertisersListResponse(data: any): AdvertisersListResponse {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? data["advertisers"].map((item: any) => (serializeAdvertiser(item))) : undefined,
  };
}

function deserializeAdvertisersListResponse(data: any): AdvertisersListResponse {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? data["advertisers"].map((item: any) => (deserializeAdvertiser(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#advertisersPatch.
 */
export interface AdvertisersPatchOptions {
  /**
   * Advertiser ID.
   */
  id: bigint;
}

function serializeAdvertisersPatchOptions(data: any): AdvertisersPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeAdvertisersPatchOptions(data: any): AdvertisersPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Audience Segment.
 */
export interface AudienceSegment {
  /**
   * Weight allocated to this segment. The weight assigned will be understood
   * in proportion to the weights assigned to other segments in the same segment
   * group. Acceptable values are 1 to 1000, inclusive.
   */
  allocation?: number;
  /**
   * ID of this audience segment. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Name of this audience segment. This is a required field and must be less
   * than 65 characters long.
   */
  name?: string;
}

function serializeAudienceSegment(data: any): AudienceSegment {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeAudienceSegment(data: any): AudienceSegment {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Audience Segment Group.
 */
export interface AudienceSegmentGroup {
  /**
   * Audience segments assigned to this group. The number of segments must be
   * between 2 and 100.
   */
  audienceSegments?: AudienceSegment[];
  /**
   * ID of this audience segment group. This is a read-only, auto-generated
   * field.
   */
  id?: bigint;
  /**
   * Name of this audience segment group. This is a required field and must be
   * less than 65 characters long.
   */
  name?: string;
}

function serializeAudienceSegmentGroup(data: any): AudienceSegmentGroup {
  return {
    ...data,
    audienceSegments: data["audienceSegments"] !== undefined ? data["audienceSegments"].map((item: any) => (serializeAudienceSegment(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeAudienceSegmentGroup(data: any): AudienceSegmentGroup {
  return {
    ...data,
    audienceSegments: data["audienceSegments"] !== undefined ? data["audienceSegments"].map((item: any) => (deserializeAudienceSegment(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * List account, subaccount, advertiser, and campaign associated with a given
 * Billing Profile.
 */
export interface BillingAssignment {
  /**
   * ID of the account associated with the billing assignment.This is a
   * read-only, auto-generated field.
   */
  accountId?: string;
  /**
   * ID of the advertiser associated with the billing assignment.Wildcard (*)
   * means this assignment is not limited to a single advertiser
   */
  advertiserId?: string;
  /**
   * ID of the campaign associated with the billing assignment. Wildcard (*)
   * means this assignment is not limited to a single campaign
   */
  campaignId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#billingAssignment".
   */
  kind?: string;
  /**
   * ID of the subaccount associated with the billing assignment.Wildcard (*)
   * means this assignment is not limited to a single subaccountThis is a
   * read-only, auto-generated field.
   */
  subaccountId?: string;
}

/**
 * Billing assignment List Response
 */
export interface BillingAssignmentsListResponse {
  /**
   * Billing assignments collection.
   */
  billingAssignments?: BillingAssignment[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#billingAssignmentsListResponse".
   */
  kind?: string;
}

/**
 * Contains properties of a Campaign Manager Billing Profile.
 */
export interface BillingProfile {
  /**
   * Consolidated invoice option for this billing profile. Used to get a
   * single, consolidated invoice across the chosen invoice level.
   */
  consolidatedInvoice?: boolean;
  /**
   * Country code of this billing profile.This is a read-only field.
   */
  countryCode?: string;
  /**
   * Billing currency code in ISO 4217 format.This is a read-only field.
   */
  currencyCode?: string;
  /**
   * ID of this billing profile. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Invoice level for this billing profile. Used to group fees into separate
   * invoices by account, advertiser, or campaign.
   */
  invoiceLevel?:  | "ACCOUNT_LEVEL" | "ADVERTISER_LEVEL" | "CAMPAIGN_LEVEL";
  /**
   * True if the billing profile is the account default profile. This is a
   * read-only field.
   */
  isDefault?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#billingProfile".
   */
  kind?: string;
  /**
   * Name of this billing profile. This is a required field and must be less
   * than 256 characters long and must be unique among billing profile in the
   * same account.
   */
  name?: string;
  /**
   * The ID of the payment account the billing profile belongs to. This is a
   * read-only field.
   */
  paymentsAccountId?: string;
  /**
   * The ID of the payment customer the billing profile belongs to. This is a
   * read-only field.
   */
  paymentsCustomerId?: string;
  /**
   * Purchase order (PO) for this billing profile. This PO number is used in
   * the invoices for all of the advertisers in this billing profile.
   */
  purchaseOrder?: string;
  /**
   * The ID of the secondary payment customer the billing profile belongs to.
   * This is a read-only field.
   */
  secondaryPaymentsCustomerId?: string;
  /**
   * Status of this billing profile.This is a read-only field.
   */
  status?:  | "UNDER_REVIEW" | "ACTIVE" | "ARCHIVED";
}

function serializeBillingProfile(data: any): BillingProfile {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeBillingProfile(data: any): BillingProfile {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#billingProfilesList.
 */
export interface BillingProfilesListOptions {
  /**
   * Select only billing profile with currency.
   */
  currency_code?: string;
  /**
   * Select only billing profile with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Allows searching for billing profiles by name. Wildcards (*) are allowed.
   * For example, "profile*2020" will return objects with names like "profile
   * June 2020", "profile April 2020", or simply "profile 2020". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "profile" will match objects
   * with name "my profile", "profile 2021", or simply "profile".
   */
  name?: string;
  /**
   * Select only billing profile which is suggested for the currency_code &
   * subaccount_id using the Billing Suggestion API.
   */
  onlySuggestion?: boolean;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only billing profile with the specified status.
   */
  status?:  | "UNDER_REVIEW" | "ACTIVE" | "ARCHIVED";
  /**
   * Select only billing profile with the specified subaccount.When
   * only_suggestion is true, only a single subaccount_id is supported.
   */
  subaccountIds?: bigint;
}

function serializeBillingProfilesListOptions(data: any): BillingProfilesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountIds: data["subaccountIds"] !== undefined ? String(data["subaccountIds"]) : undefined,
  };
}

function deserializeBillingProfilesListOptions(data: any): BillingProfilesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountIds: data["subaccountIds"] !== undefined ? BigInt(data["subaccountIds"]) : undefined,
  };
}

/**
 * Billing profile List Response
 */
export interface BillingProfilesListResponse {
  /**
   * Billing profiles collection.
   */
  billingProfiles?: BillingProfile[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#billingProfilesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeBillingProfilesListResponse(data: any): BillingProfilesListResponse {
  return {
    ...data,
    billingProfiles: data["billingProfiles"] !== undefined ? data["billingProfiles"].map((item: any) => (serializeBillingProfile(item))) : undefined,
  };
}

function deserializeBillingProfilesListResponse(data: any): BillingProfilesListResponse {
  return {
    ...data,
    billingProfiles: data["billingProfiles"] !== undefined ? data["billingProfiles"].map((item: any) => (deserializeBillingProfile(item))) : undefined,
  };
}

export interface BillingRate {
  /**
   * Billing currency code in ISO 4217 format.
   */
  currencyCode?: string;
  /**
   * End date of this billing rate.
   */
  endDate?: string;
  /**
   * ID of this billing rate.
   */
  id?: bigint;
  /**
   * Name of this billing rate. This must be less than 256 characters long.
   */
  name?: string;
  /**
   * Flat rate in micros of this billing rate. This cannot co-exist with tiered
   * rate.
   */
  rateInMicros?: bigint;
  /**
   * Start date of this billing rate.
   */
  startDate?: string;
  /**
   * Tiered rate of this billing rate. This cannot co-exist with flat rate.
   */
  tieredRates?: BillingRateTieredRate[];
  /**
   * Type of this billing rate.
   */
  type?:  | "AD_SERVING" | "CLICKS" | "MINIMUM_SERVICE" | "PATH_TO_CONVERSION" | "RICH_MEDIA_INPAGE" | "RICH_MEDIA_EXPANDING" | "RICH_MEDIA_FLOATING" | "RICH_MEDIA_VIDEO" | "RICH_MEDIA_TEASER" | "RICH_MEDIA_VPAID" | "INSTREAM_VIDEO" | "PIXEL" | "TRACKING" | "TRAFFICKING_FEATURE" | "CUSTOM_REPORTS" | "EXPOSURE_TO_CONVERSION" | "DATA_TRANSFER" | "DATA_TRANSFER_SETUP" | "STARTUP" | "STATEMENT_OF_WORK" | "PROVIDED_LIST" | "PROVIDED_LIST_SETUP" | "ENHANCED_FORMATS" | "TRACKING_AD_IMPRESSIONS" | "TRACKING_AD_CLICKS" | "NIELSEN_DIGITAL_AD_RATINGS_FEE" | "INSTREAM_VIDEO_REDIRECT" | "INSTREAM_VIDEO_VPAID" | "DISPLAY_AD_SERVING" | "VIDEO_AD_SERVING" | "AUDIO_AD_SERVING" | "ADVANCED_DISPLAY_AD_SERVING";
  /**
   * Unit of measure for this billing rate.
   */
  unitOfMeasure?:  | "CPM" | "CPC" | "EA" | "P2C";
}

function serializeBillingRate(data: any): BillingRate {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    rateInMicros: data["rateInMicros"] !== undefined ? String(data["rateInMicros"]) : undefined,
    tieredRates: data["tieredRates"] !== undefined ? data["tieredRates"].map((item: any) => (serializeBillingRateTieredRate(item))) : undefined,
  };
}

function deserializeBillingRate(data: any): BillingRate {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    rateInMicros: data["rateInMicros"] !== undefined ? BigInt(data["rateInMicros"]) : undefined,
    tieredRates: data["tieredRates"] !== undefined ? data["tieredRates"].map((item: any) => (deserializeBillingRateTieredRate(item))) : undefined,
  };
}

/**
 * Billing Rate List Response
 */
export interface BillingRatesListResponse {
  /**
   * Billing rates collection.
   */
  billingRates?: BillingRate[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#billingRatesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeBillingRatesListResponse(data: any): BillingRatesListResponse {
  return {
    ...data,
    billingRates: data["billingRates"] !== undefined ? data["billingRates"].map((item: any) => (serializeBillingRate(item))) : undefined,
  };
}

function deserializeBillingRatesListResponse(data: any): BillingRatesListResponse {
  return {
    ...data,
    billingRates: data["billingRates"] !== undefined ? data["billingRates"].map((item: any) => (deserializeBillingRate(item))) : undefined,
  };
}

export interface BillingRateTieredRate {
  /**
   * The maximum for this tier range.
   */
  highValue?: bigint;
  /**
   * The minimum for this tier range.
   */
  lowValue?: bigint;
  /**
   * Rate in micros for this tier.
   */
  rateInMicros?: bigint;
}

function serializeBillingRateTieredRate(data: any): BillingRateTieredRate {
  return {
    ...data,
    highValue: data["highValue"] !== undefined ? String(data["highValue"]) : undefined,
    lowValue: data["lowValue"] !== undefined ? String(data["lowValue"]) : undefined,
    rateInMicros: data["rateInMicros"] !== undefined ? String(data["rateInMicros"]) : undefined,
  };
}

function deserializeBillingRateTieredRate(data: any): BillingRateTieredRate {
  return {
    ...data,
    highValue: data["highValue"] !== undefined ? BigInt(data["highValue"]) : undefined,
    lowValue: data["lowValue"] !== undefined ? BigInt(data["lowValue"]) : undefined,
    rateInMicros: data["rateInMicros"] !== undefined ? BigInt(data["rateInMicros"]) : undefined,
  };
}

/**
 * Contains information about a browser that can be targeted by ads.
 */
export interface Browser {
  /**
   * ID referring to this grouping of browser and version numbers. This is the
   * ID used for targeting.
   */
  browserVersionId?: bigint;
  /**
   * DART ID of this browser. This is the ID used when generating reports.
   */
  dartId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#browser".
   */
  kind?: string;
  /**
   * Major version number (leftmost number) of this browser. For example, for
   * Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may
   * be used to target any version number, and a question mark (?) may be used
   * to target cases where the version number cannot be identified. For example,
   * Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome
   * 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox ?.? targets cases where
   * the ad server knows the browser is Firefox but can't tell which version it
   * is.
   */
  majorVersion?: string;
  /**
   * Minor version number (number after first dot on left) of this browser. For
   * example, for Chrome 5.0.375.86 beta, this field should be set to 0. An
   * asterisk (*) may be used to target any version number, and a question mark
   * (?) may be used to target cases where the version number cannot be
   * identified. For example, Chrome *.* targets any version of Chrome: 1.2,
   * 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0.
   * Firefox ?.? targets cases where the ad server knows the browser is Firefox
   * but can't tell which version it is.
   */
  minorVersion?: string;
  /**
   * Name of this browser.
   */
  name?: string;
}

function serializeBrowser(data: any): Browser {
  return {
    ...data,
    browserVersionId: data["browserVersionId"] !== undefined ? String(data["browserVersionId"]) : undefined,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
  };
}

function deserializeBrowser(data: any): Browser {
  return {
    ...data,
    browserVersionId: data["browserVersionId"] !== undefined ? BigInt(data["browserVersionId"]) : undefined,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
  };
}

/**
 * Browser List Response
 */
export interface BrowsersListResponse {
  /**
   * Browser collection.
   */
  browsers?: Browser[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#browsersListResponse".
   */
  kind?: string;
}

function serializeBrowsersListResponse(data: any): BrowsersListResponse {
  return {
    ...data,
    browsers: data["browsers"] !== undefined ? data["browsers"].map((item: any) => (serializeBrowser(item))) : undefined,
  };
}

function deserializeBrowsersListResponse(data: any): BrowsersListResponse {
  return {
    ...data,
    browsers: data["browsers"] !== undefined ? data["browsers"].map((item: any) => (deserializeBrowser(item))) : undefined,
  };
}

/**
 * Contains properties of a Campaign Manager campaign.
 */
export interface Campaign {
  /**
   * Account ID of this campaign. This is a read-only field that can be left
   * blank.
   */
  accountId?: bigint;
  /**
   * Ad blocking settings for this campaign.
   */
  adBlockingConfiguration?: AdBlockingConfiguration;
  /**
   * Additional creative optimization configurations for the campaign.
   */
  additionalCreativeOptimizationConfigurations?: CreativeOptimizationConfiguration[];
  /**
   * Advertiser group ID of the associated advertiser.
   */
  advertiserGroupId?: bigint;
  /**
   * Advertiser ID of this campaign. This is a required field.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the advertiser ID of this campaign. This is a
   * read-only, auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Whether this campaign has been archived.
   */
  archived?: boolean;
  /**
   * Audience segment groups assigned to this campaign. Cannot have more than
   * 300 segment groups.
   */
  audienceSegmentGroups?: AudienceSegmentGroup[];
  /**
   * Billing invoice code included in the Campaign Manager client billing
   * invoices associated with the campaign.
   */
  billingInvoiceCode?: string;
  /**
   * Click-through URL suffix override properties for this campaign.
   */
  clickThroughUrlSuffixProperties?: ClickThroughUrlSuffixProperties;
  /**
   * Arbitrary comments about this campaign. Must be less than 256 characters
   * long.
   */
  comment?: string;
  /**
   * Information about the creation of this campaign. This is a read-only
   * field.
   */
  createInfo?: LastModifiedInfo;
  /**
   * List of creative group IDs that are assigned to the campaign.
   */
  creativeGroupIds?: bigint[];
  /**
   * Creative optimization configuration for the campaign.
   */
  creativeOptimizationConfiguration?: CreativeOptimizationConfiguration;
  /**
   * Click-through event tag ID override properties for this campaign.
   */
  defaultClickThroughEventTagProperties?: DefaultClickThroughEventTagProperties;
  /**
   * The default landing page ID for this campaign.
   */
  defaultLandingPageId?: bigint;
  endDate?: Date;
  /**
   * Overrides that can be used to activate or deactivate advertiser event
   * tags.
   */
  eventTagOverrides?: EventTagOverride[];
  /**
   * External ID for this campaign.
   */
  externalId?: string;
  /**
   * ID of this campaign. This is a read-only auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this campaign. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#campaign".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this campaign. This is a
   * read-only field.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Measurement partner campaign link for tag wrapping.
   */
  measurementPartnerLink?: MeasurementPartnerCampaignLink;
  /**
   * Name of this campaign. This is a required field and must be less than 512
   * characters long and unique among campaigns of the same advertiser.
   */
  name?: string;
  startDate?: Date;
  /**
   * Subaccount ID of this campaign. This is a read-only field that can be left
   * blank.
   */
  subaccountId?: bigint;
}

function serializeCampaign(data: any): Campaign {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    additionalCreativeOptimizationConfigurations: data["additionalCreativeOptimizationConfigurations"] !== undefined ? data["additionalCreativeOptimizationConfigurations"].map((item: any) => (serializeCreativeOptimizationConfiguration(item))) : undefined,
    advertiserGroupId: data["advertiserGroupId"] !== undefined ? String(data["advertiserGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    audienceSegmentGroups: data["audienceSegmentGroups"] !== undefined ? data["audienceSegmentGroups"].map((item: any) => (serializeAudienceSegmentGroup(item))) : undefined,
    createInfo: data["createInfo"] !== undefined ? serializeLastModifiedInfo(data["createInfo"]) : undefined,
    creativeGroupIds: data["creativeGroupIds"] !== undefined ? data["creativeGroupIds"].map((item: any) => (String(item))) : undefined,
    creativeOptimizationConfiguration: data["creativeOptimizationConfiguration"] !== undefined ? serializeCreativeOptimizationConfiguration(data["creativeOptimizationConfiguration"]) : undefined,
    defaultClickThroughEventTagProperties: data["defaultClickThroughEventTagProperties"] !== undefined ? serializeDefaultClickThroughEventTagProperties(data["defaultClickThroughEventTagProperties"]) : undefined,
    defaultLandingPageId: data["defaultLandingPageId"] !== undefined ? String(data["defaultLandingPageId"]) : undefined,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    eventTagOverrides: data["eventTagOverrides"] !== undefined ? data["eventTagOverrides"].map((item: any) => (serializeEventTagOverride(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeCampaign(data: any): Campaign {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    additionalCreativeOptimizationConfigurations: data["additionalCreativeOptimizationConfigurations"] !== undefined ? data["additionalCreativeOptimizationConfigurations"].map((item: any) => (deserializeCreativeOptimizationConfiguration(item))) : undefined,
    advertiserGroupId: data["advertiserGroupId"] !== undefined ? BigInt(data["advertiserGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    audienceSegmentGroups: data["audienceSegmentGroups"] !== undefined ? data["audienceSegmentGroups"].map((item: any) => (deserializeAudienceSegmentGroup(item))) : undefined,
    createInfo: data["createInfo"] !== undefined ? deserializeLastModifiedInfo(data["createInfo"]) : undefined,
    creativeGroupIds: data["creativeGroupIds"] !== undefined ? data["creativeGroupIds"].map((item: any) => (BigInt(item))) : undefined,
    creativeOptimizationConfiguration: data["creativeOptimizationConfiguration"] !== undefined ? deserializeCreativeOptimizationConfiguration(data["creativeOptimizationConfiguration"]) : undefined,
    defaultClickThroughEventTagProperties: data["defaultClickThroughEventTagProperties"] !== undefined ? deserializeDefaultClickThroughEventTagProperties(data["defaultClickThroughEventTagProperties"]) : undefined,
    defaultLandingPageId: data["defaultLandingPageId"] !== undefined ? BigInt(data["defaultLandingPageId"]) : undefined,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    eventTagOverrides: data["eventTagOverrides"] !== undefined ? data["eventTagOverrides"].map((item: any) => (deserializeEventTagOverride(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Identifies a creative which has been associated with a given campaign.
 */
export interface CampaignCreativeAssociation {
  /**
   * ID of the creative associated with the campaign. This is a required field.
   */
  creativeId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#campaignCreativeAssociation".
   */
  kind?: string;
}

function serializeCampaignCreativeAssociation(data: any): CampaignCreativeAssociation {
  return {
    ...data,
    creativeId: data["creativeId"] !== undefined ? String(data["creativeId"]) : undefined,
  };
}

function deserializeCampaignCreativeAssociation(data: any): CampaignCreativeAssociation {
  return {
    ...data,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#campaignCreativeAssociationsList.
 */
export interface CampaignCreativeAssociationsListOptions {
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Campaign Creative Association List Response
 */
export interface CampaignCreativeAssociationsListResponse {
  /**
   * Campaign creative association collection
   */
  campaignCreativeAssociations?: CampaignCreativeAssociation[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#campaignCreativeAssociationsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCampaignCreativeAssociationsListResponse(data: any): CampaignCreativeAssociationsListResponse {
  return {
    ...data,
    campaignCreativeAssociations: data["campaignCreativeAssociations"] !== undefined ? data["campaignCreativeAssociations"].map((item: any) => (serializeCampaignCreativeAssociation(item))) : undefined,
  };
}

function deserializeCampaignCreativeAssociationsListResponse(data: any): CampaignCreativeAssociationsListResponse {
  return {
    ...data,
    campaignCreativeAssociations: data["campaignCreativeAssociations"] !== undefined ? data["campaignCreativeAssociations"].map((item: any) => (deserializeCampaignCreativeAssociation(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#campaignsList.
 */
export interface CampaignsListOptions {
  /**
   * Select only campaigns whose advertisers belong to these advertiser groups.
   */
  advertiserGroupIds?: bigint;
  /**
   * Select only campaigns that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only archived campaigns. Don't set this field to select both
   * archived and non-archived campaigns.
   */
  archived?: boolean;
  /**
   * Select only campaigns that have at least one optimization activity.
   */
  atLeastOneOptimizationActivity?: boolean;
  /**
   * Exclude campaigns with these IDs.
   */
  excludedIds?: bigint;
  /**
   * Select only campaigns with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only campaigns that have overridden this event tag ID.
   */
  overriddenEventTagId?: bigint;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for campaigns by name or ID. Wildcards (*) are allowed.
   * For example, "campaign*2015" will return campaigns with names like
   * "campaign June 2015", "campaign April 2015", or simply "campaign 2015".
   * Most of the searches also add wildcards implicitly at the start and the end
   * of the search string. For example, a search string of "campaign" will match
   * campaigns with name "my campaign", "campaign 2015", or simply "campaign".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only campaigns that belong to this subaccount.
   */
  subaccountId?: bigint;
}

function serializeCampaignsListOptions(data: any): CampaignsListOptions {
  return {
    ...data,
    advertiserGroupIds: data["advertiserGroupIds"] !== undefined ? String(data["advertiserGroupIds"]) : undefined,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    excludedIds: data["excludedIds"] !== undefined ? String(data["excludedIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    overriddenEventTagId: data["overriddenEventTagId"] !== undefined ? String(data["overriddenEventTagId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeCampaignsListOptions(data: any): CampaignsListOptions {
  return {
    ...data,
    advertiserGroupIds: data["advertiserGroupIds"] !== undefined ? BigInt(data["advertiserGroupIds"]) : undefined,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    excludedIds: data["excludedIds"] !== undefined ? BigInt(data["excludedIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    overriddenEventTagId: data["overriddenEventTagId"] !== undefined ? BigInt(data["overriddenEventTagId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Campaign List Response
 */
export interface CampaignsListResponse {
  /**
   * Campaign collection.
   */
  campaigns?: Campaign[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#campaignsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCampaignsListResponse(data: any): CampaignsListResponse {
  return {
    ...data,
    campaigns: data["campaigns"] !== undefined ? data["campaigns"].map((item: any) => (serializeCampaign(item))) : undefined,
  };
}

function deserializeCampaignsListResponse(data: any): CampaignsListResponse {
  return {
    ...data,
    campaigns: data["campaigns"] !== undefined ? data["campaigns"].map((item: any) => (deserializeCampaign(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#campaignsPatch.
 */
export interface CampaignsPatchOptions {
  /**
   * Campaign ID.
   */
  id: bigint;
}

function serializeCampaignsPatchOptions(data: any): CampaignsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeCampaignsPatchOptions(data: any): CampaignsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents a summarized campaign information associated with this invoice.
 */
export interface CampaignSummary {
  /**
   * Campaign billing invoice code.
   */
  billingInvoiceCode?: string;
  /**
   * Campaign ID.
   */
  campaignId?: bigint;
  /**
   * The pre-tax amount for this campaign, in micros of the invoice's currency.
   */
  preTaxAmountMicros?: bigint;
  /**
   * The tax amount for this campaign, in micros of the invoice's currency.
   */
  taxAmountMicros?: bigint;
  /**
   * The total amount of charges for this campaign, in micros of the invoice's
   * currency.
   */
  totalAmountMicros?: bigint;
}

function serializeCampaignSummary(data: any): CampaignSummary {
  return {
    ...data,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    preTaxAmountMicros: data["preTaxAmountMicros"] !== undefined ? String(data["preTaxAmountMicros"]) : undefined,
    taxAmountMicros: data["taxAmountMicros"] !== undefined ? String(data["taxAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? String(data["totalAmountMicros"]) : undefined,
  };
}

function deserializeCampaignSummary(data: any): CampaignSummary {
  return {
    ...data,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    preTaxAmountMicros: data["preTaxAmountMicros"] !== undefined ? BigInt(data["preTaxAmountMicros"]) : undefined,
    taxAmountMicros: data["taxAmountMicros"] !== undefined ? BigInt(data["taxAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? BigInt(data["totalAmountMicros"]) : undefined,
  };
}

/**
 * Describes a change that a user has made to a resource.
 */
export interface ChangeLog {
  /**
   * Account ID of the modified object.
   */
  accountId?: bigint;
  /**
   * Action which caused the change.
   */
  action?: string;
  changeTime?: Date;
  /**
   * Field name of the object which changed.
   */
  fieldName?: string;
  /**
   * ID of this change log.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#changeLog".
   */
  kind?: string;
  /**
   * New value of the object field.
   */
  newValue?: string;
  /**
   * ID of the object of this change log. The object could be a campaign,
   * placement, ad, or other type.
   */
  objectId?: bigint;
  /**
   * Object type of the change log.
   */
  objectType?: string;
  /**
   * Old value of the object field.
   */
  oldValue?: string;
  /**
   * Subaccount ID of the modified object.
   */
  subaccountId?: bigint;
  /**
   * Transaction ID of this change log. When a single API call results in many
   * changes, each change will have a separate ID in the change log but will
   * share the same transactionId.
   */
  transactionId?: bigint;
  /**
   * ID of the user who modified the object.
   */
  userProfileId?: bigint;
  /**
   * User profile name of the user who modified the object.
   */
  userProfileName?: string;
}

function serializeChangeLog(data: any): ChangeLog {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    changeTime: data["changeTime"] !== undefined ? data["changeTime"].toISOString() : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    objectId: data["objectId"] !== undefined ? String(data["objectId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    transactionId: data["transactionId"] !== undefined ? String(data["transactionId"]) : undefined,
    userProfileId: data["userProfileId"] !== undefined ? String(data["userProfileId"]) : undefined,
  };
}

function deserializeChangeLog(data: any): ChangeLog {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    changeTime: data["changeTime"] !== undefined ? new Date(data["changeTime"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    objectId: data["objectId"] !== undefined ? BigInt(data["objectId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    transactionId: data["transactionId"] !== undefined ? BigInt(data["transactionId"]) : undefined,
    userProfileId: data["userProfileId"] !== undefined ? BigInt(data["userProfileId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#changeLogsList.
 */
export interface ChangeLogsListOptions {
  /**
   * Select only change logs with the specified action.
   */
  action?:  | "ACTION_CREATE" | "ACTION_UPDATE" | "ACTION_DELETE" | "ACTION_ENABLE" | "ACTION_DISABLE" | "ACTION_ADD" | "ACTION_REMOVE" | "ACTION_MARK_AS_DEFAULT" | "ACTION_ASSOCIATE" | "ACTION_ASSIGN" | "ACTION_UNASSIGN" | "ACTION_SEND" | "ACTION_LINK" | "ACTION_UNLINK" | "ACTION_PUSH" | "ACTION_EMAIL_TAGS" | "ACTION_SHARE";
  /**
   * Select only change logs with these IDs.
   */
  ids?: bigint;
  /**
   * Select only change logs whose change time is before the specified
   * maxChangeTime.The time should be formatted as an RFC3339 date/time string.
   * For example, for 10:54 PM on July 18th, 2015, in the America/New York time
   * zone, the format is "2015-07-18T22:54:00-04:00". In other words, the year,
   * month, day, the letter T, the hour (24-hour clock system), minute, second,
   * and then the time zone offset.
   */
  maxChangeTime?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only change logs whose change time is after the specified
   * minChangeTime.The time should be formatted as an RFC3339 date/time string.
   * For example, for 10:54 PM on July 18th, 2015, in the America/New York time
   * zone, the format is "2015-07-18T22:54:00-04:00". In other words, the year,
   * month, day, the letter T, the hour (24-hour clock system), minute, second,
   * and then the time zone offset.
   */
  minChangeTime?: string;
  /**
   * Select only change logs with these object IDs.
   */
  objectIds?: bigint;
  /**
   * Select only change logs with the specified object type.
   */
  objectType?:  | "OBJECT_ADVERTISER" | "OBJECT_FLOODLIGHT_CONFIGURATION" | "OBJECT_AD" | "OBJECT_FLOODLIGHT_ACTVITY" | "OBJECT_CAMPAIGN" | "OBJECT_FLOODLIGHT_ACTIVITY_GROUP" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT" | "OBJECT_DFA_SITE" | "OBJECT_USER_ROLE" | "OBJECT_USER_PROFILE" | "OBJECT_ADVERTISER_GROUP" | "OBJECT_ACCOUNT" | "OBJECT_SUBACCOUNT" | "OBJECT_RICHMEDIA_CREATIVE" | "OBJECT_INSTREAM_CREATIVE" | "OBJECT_MEDIA_ORDER" | "OBJECT_CONTENT_CATEGORY" | "OBJECT_PLACEMENT_STRATEGY" | "OBJECT_SD_SITE" | "OBJECT_SIZE" | "OBJECT_CREATIVE_GROUP" | "OBJECT_CREATIVE_ASSET" | "OBJECT_USER_PROFILE_FILTER" | "OBJECT_LANDING_PAGE" | "OBJECT_CREATIVE_FIELD" | "OBJECT_REMARKETING_LIST" | "OBJECT_PROVIDED_LIST_CLIENT" | "OBJECT_EVENT_TAG" | "OBJECT_CREATIVE_BUNDLE" | "OBJECT_BILLING_ACCOUNT_GROUP" | "OBJECT_BILLING_FEATURE" | "OBJECT_RATE_CARD" | "OBJECT_ACCOUNT_BILLING_FEATURE" | "OBJECT_BILLING_MINIMUM_FEE" | "OBJECT_BILLING_PROFILE" | "OBJECT_PLAYSTORE_LINK" | "OBJECT_TARGETING_TEMPLATE" | "OBJECT_SEARCH_LIFT_STUDY" | "OBJECT_FLOODLIGHT_DV360_LINK" | "OBJECT_ADVERTISER_CUSTOMER_LINK";
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only change logs whose object ID, user name, old or new values
   * match the search string.
   */
  searchString?: string;
  /**
   * Select only change logs with these user profile IDs.
   */
  userProfileIds?: bigint;
}

function serializeChangeLogsListOptions(data: any): ChangeLogsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    objectIds: data["objectIds"] !== undefined ? String(data["objectIds"]) : undefined,
    userProfileIds: data["userProfileIds"] !== undefined ? String(data["userProfileIds"]) : undefined,
  };
}

function deserializeChangeLogsListOptions(data: any): ChangeLogsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    objectIds: data["objectIds"] !== undefined ? BigInt(data["objectIds"]) : undefined,
    userProfileIds: data["userProfileIds"] !== undefined ? BigInt(data["userProfileIds"]) : undefined,
  };
}

/**
 * Change Log List Response
 */
export interface ChangeLogsListResponse {
  /**
   * Change log collection.
   */
  changeLogs?: ChangeLog[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#changeLogsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeChangeLogsListResponse(data: any): ChangeLogsListResponse {
  return {
    ...data,
    changeLogs: data["changeLogs"] !== undefined ? data["changeLogs"].map((item: any) => (serializeChangeLog(item))) : undefined,
  };
}

function deserializeChangeLogsListResponse(data: any): ChangeLogsListResponse {
  return {
    ...data,
    changeLogs: data["changeLogs"] !== undefined ? data["changeLogs"].map((item: any) => (deserializeChangeLog(item))) : undefined,
  };
}

/**
 * Represents a DfaReporting channel grouping.
 */
export interface ChannelGrouping {
  /**
   * ChannelGrouping fallback name.
   */
  fallbackName?: string;
  /**
   * The kind of resource this is, in this case dfareporting#channelGrouping.
   */
  kind?: string;
  /**
   * ChannelGrouping name.
   */
  name?: string;
  /**
   * The rules contained within this channel grouping.
   */
  rules?: ChannelGroupingRule[];
}

function serializeChannelGrouping(data: any): ChannelGrouping {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeChannelGroupingRule(item))) : undefined,
  };
}

function deserializeChannelGrouping(data: any): ChannelGrouping {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeChannelGroupingRule(item))) : undefined,
  };
}

/**
 * Represents a DfaReporting channel grouping rule.
 */
export interface ChannelGroupingRule {
  /**
   * The disjunctive match statements contained within this rule.
   */
  disjunctiveMatchStatements?: DisjunctiveMatchStatement[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#channelGroupingRule.
   */
  kind?: string;
  /**
   * Rule name.
   */
  name?: string;
}

function serializeChannelGroupingRule(data: any): ChannelGroupingRule {
  return {
    ...data,
    disjunctiveMatchStatements: data["disjunctiveMatchStatements"] !== undefined ? data["disjunctiveMatchStatements"].map((item: any) => (serializeDisjunctiveMatchStatement(item))) : undefined,
  };
}

function deserializeChannelGroupingRule(data: any): ChannelGroupingRule {
  return {
    ...data,
    disjunctiveMatchStatements: data["disjunctiveMatchStatements"] !== undefined ? data["disjunctiveMatchStatements"].map((item: any) => (deserializeDisjunctiveMatchStatement(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#citiesList.
 */
export interface CitiesListOptions {
  /**
   * Select only cities from these countries.
   */
  countryDartIds?: bigint;
  /**
   * Select only cities with these DART IDs.
   */
  dartIds?: bigint;
  /**
   * Select only cities with names starting with this prefix.
   */
  namePrefix?: string;
  /**
   * Select only cities from these regions.
   */
  regionDartIds?: bigint;
}

function serializeCitiesListOptions(data: any): CitiesListOptions {
  return {
    ...data,
    countryDartIds: data["countryDartIds"] !== undefined ? String(data["countryDartIds"]) : undefined,
    dartIds: data["dartIds"] !== undefined ? String(data["dartIds"]) : undefined,
    regionDartIds: data["regionDartIds"] !== undefined ? String(data["regionDartIds"]) : undefined,
  };
}

function deserializeCitiesListOptions(data: any): CitiesListOptions {
  return {
    ...data,
    countryDartIds: data["countryDartIds"] !== undefined ? BigInt(data["countryDartIds"]) : undefined,
    dartIds: data["dartIds"] !== undefined ? BigInt(data["dartIds"]) : undefined,
    regionDartIds: data["regionDartIds"] !== undefined ? BigInt(data["regionDartIds"]) : undefined,
  };
}

/**
 * City List Response
 */
export interface CitiesListResponse {
  /**
   * City collection.
   */
  cities?: City[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#citiesListResponse".
   */
  kind?: string;
}

function serializeCitiesListResponse(data: any): CitiesListResponse {
  return {
    ...data,
    cities: data["cities"] !== undefined ? data["cities"].map((item: any) => (serializeCity(item))) : undefined,
  };
}

function deserializeCitiesListResponse(data: any): CitiesListResponse {
  return {
    ...data,
    cities: data["cities"] !== undefined ? data["cities"].map((item: any) => (deserializeCity(item))) : undefined,
  };
}

/**
 * Contains information about a city that can be targeted by ads.
 */
export interface City {
  /**
   * Country code of the country to which this city belongs.
   */
  countryCode?: string;
  /**
   * DART ID of the country to which this city belongs.
   */
  countryDartId?: bigint;
  /**
   * DART ID of this city. This is the ID used for targeting and generating
   * reports.
   */
  dartId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#city".
   */
  kind?: string;
  /**
   * Metro region code of the metro region (DMA) to which this city belongs.
   */
  metroCode?: string;
  /**
   * ID of the metro region (DMA) to which this city belongs.
   */
  metroDmaId?: bigint;
  /**
   * Name of this city.
   */
  name?: string;
  /**
   * Region code of the region to which this city belongs.
   */
  regionCode?: string;
  /**
   * DART ID of the region to which this city belongs.
   */
  regionDartId?: bigint;
}

function serializeCity(data: any): City {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? String(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
    metroDmaId: data["metroDmaId"] !== undefined ? String(data["metroDmaId"]) : undefined,
    regionDartId: data["regionDartId"] !== undefined ? String(data["regionDartId"]) : undefined,
  };
}

function deserializeCity(data: any): City {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? BigInt(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
    metroDmaId: data["metroDmaId"] !== undefined ? BigInt(data["metroDmaId"]) : undefined,
    regionDartId: data["regionDartId"] !== undefined ? BigInt(data["regionDartId"]) : undefined,
  };
}

/**
 * Creative Click Tag.
 */
export interface ClickTag {
  /**
   * Parameter value for the specified click tag. This field contains a
   * click-through url.
   */
  clickThroughUrl?: CreativeClickThroughUrl;
  /**
   * Advertiser event name associated with the click tag. This field is used by
   * DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY
   * when the primary asset type is not HTML_IMAGE.
   */
  eventName?: string;
  /**
   * Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY
   * creative assets, this field must match the value of the creative asset's
   * creativeAssetId.name field.
   */
  name?: string;
}

function serializeClickTag(data: any): ClickTag {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? serializeCreativeClickThroughUrl(data["clickThroughUrl"]) : undefined,
  };
}

function deserializeClickTag(data: any): ClickTag {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? deserializeCreativeClickThroughUrl(data["clickThroughUrl"]) : undefined,
  };
}

/**
 * Click-through URL
 */
export interface ClickThroughUrl {
  /**
   * Read-only convenience field representing the actual URL that will be used
   * for this click-through. The URL is computed as follows: - If
   * defaultLandingPage is enabled then the campaign's default landing page URL
   * is assigned to this field. - If defaultLandingPage is not enabled and a
   * landingPageId is specified then that landing page's URL is assigned to this
   * field. - If neither of the above cases apply, then the
   * customClickThroughUrl is assigned to this field.
   */
  computedClickThroughUrl?: string;
  /**
   * Custom click-through URL. Applicable if the defaultLandingPage field is
   * set to false and the landingPageId field is left unset.
   */
  customClickThroughUrl?: string;
  /**
   * Whether the campaign default landing page is used.
   */
  defaultLandingPage?: boolean;
  /**
   * ID of the landing page for the click-through URL. Applicable if the
   * defaultLandingPage field is set to false.
   */
  landingPageId?: bigint;
}

function serializeClickThroughUrl(data: any): ClickThroughUrl {
  return {
    ...data,
    landingPageId: data["landingPageId"] !== undefined ? String(data["landingPageId"]) : undefined,
  };
}

function deserializeClickThroughUrl(data: any): ClickThroughUrl {
  return {
    ...data,
    landingPageId: data["landingPageId"] !== undefined ? BigInt(data["landingPageId"]) : undefined,
  };
}

/**
 * Click Through URL Suffix settings.
 */
export interface ClickThroughUrlSuffixProperties {
  /**
   * Click-through URL suffix to apply to all ads in this entity's scope. Must
   * be less than 128 characters long.
   */
  clickThroughUrlSuffix?: string;
  /**
   * Whether this entity should override the inherited click-through URL suffix
   * with its own defined value.
   */
  overrideInheritedSuffix?: boolean;
}

/**
 * Companion Click-through override.
 */
export interface CompanionClickThroughOverride {
  /**
   * Click-through URL of this companion click-through override.
   */
  clickThroughUrl?: ClickThroughUrl;
  /**
   * ID of the creative for this companion click-through override.
   */
  creativeId?: bigint;
}

function serializeCompanionClickThroughOverride(data: any): CompanionClickThroughOverride {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? serializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    creativeId: data["creativeId"] !== undefined ? String(data["creativeId"]) : undefined,
  };
}

function deserializeCompanionClickThroughOverride(data: any): CompanionClickThroughOverride {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? deserializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
  };
}

/**
 * Companion Settings
 */
export interface CompanionSetting {
  /**
   * Whether companions are disabled for this placement.
   */
  companionsDisabled?: boolean;
  /**
   * Allowlist of companion sizes to be served to this placement. Set this list
   * to null or empty to serve all companion sizes.
   */
  enabledSizes?: Size[];
  /**
   * Whether to serve only static images as companions.
   */
  imageOnly?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#companionSetting".
   */
  kind?: string;
}

function serializeCompanionSetting(data: any): CompanionSetting {
  return {
    ...data,
    enabledSizes: data["enabledSizes"] !== undefined ? data["enabledSizes"].map((item: any) => (serializeSize(item))) : undefined,
  };
}

function deserializeCompanionSetting(data: any): CompanionSetting {
  return {
    ...data,
    enabledSizes: data["enabledSizes"] !== undefined ? data["enabledSizes"].map((item: any) => (deserializeSize(item))) : undefined,
  };
}

/**
 * Represents a response to the queryCompatibleFields method.
 */
export interface CompatibleFields {
  /**
   * Contains items that are compatible to be selected for a report of type
   * "CROSS_DIMENSION_REACH".
   */
  crossDimensionReachReportCompatibleFields?: CrossDimensionReachReportCompatibleFields;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "FLOODLIGHT".
   */
  floodlightReportCompatibleFields?: FloodlightReportCompatibleFields;
  /**
   * The kind of resource this is, in this case dfareporting#compatibleFields.
   */
  kind?: string;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "PATH_ATTRIBUTION".
   */
  pathAttributionReportCompatibleFields?: PathReportCompatibleFields;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "PATH".
   */
  pathReportCompatibleFields?: PathReportCompatibleFields;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "PATH_TO_CONVERSION".
   */
  pathToConversionReportCompatibleFields?: PathToConversionReportCompatibleFields;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "REACH".
   */
  reachReportCompatibleFields?: ReachReportCompatibleFields;
  /**
   * Contains items that are compatible to be selected for a report of type
   * "STANDARD".
   */
  reportCompatibleFields?: ReportCompatibleFields;
}

/**
 * Contains information about an internet connection type that can be targeted
 * by ads. Clients can use the connection type to target mobile vs. broadband
 * users.
 */
export interface ConnectionType {
  /**
   * ID of this connection type.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#connectionType".
   */
  kind?: string;
  /**
   * Name of this connection type.
   */
  name?: string;
}

function serializeConnectionType(data: any): ConnectionType {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeConnectionType(data: any): ConnectionType {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Connection Type List Response
 */
export interface ConnectionTypesListResponse {
  /**
   * Collection of connection types such as broadband and mobile.
   */
  connectionTypes?: ConnectionType[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#connectionTypesListResponse".
   */
  kind?: string;
}

function serializeConnectionTypesListResponse(data: any): ConnectionTypesListResponse {
  return {
    ...data,
    connectionTypes: data["connectionTypes"] !== undefined ? data["connectionTypes"].map((item: any) => (serializeConnectionType(item))) : undefined,
  };
}

function deserializeConnectionTypesListResponse(data: any): ConnectionTypesListResponse {
  return {
    ...data,
    connectionTypes: data["connectionTypes"] !== undefined ? data["connectionTypes"].map((item: any) => (deserializeConnectionType(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#contentCategoriesList.
 */
export interface ContentCategoriesListOptions {
  /**
   * Select only content categories with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "contentcategory*2015" will return objects with names like
   * "contentcategory June 2015", "contentcategory April 2015", or simply
   * "contentcategory 2015". Most of the searches also add wildcards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "contentcategory" will match objects with name "my contentcategory",
   * "contentcategory 2015", or simply "contentcategory".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeContentCategoriesListOptions(data: any): ContentCategoriesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeContentCategoriesListOptions(data: any): ContentCategoriesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Content Category List Response
 */
export interface ContentCategoriesListResponse {
  /**
   * Content category collection.
   */
  contentCategories?: ContentCategory[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#contentCategoriesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeContentCategoriesListResponse(data: any): ContentCategoriesListResponse {
  return {
    ...data,
    contentCategories: data["contentCategories"] !== undefined ? data["contentCategories"].map((item: any) => (serializeContentCategory(item))) : undefined,
  };
}

function deserializeContentCategoriesListResponse(data: any): ContentCategoriesListResponse {
  return {
    ...data,
    contentCategories: data["contentCategories"] !== undefined ? data["contentCategories"].map((item: any) => (deserializeContentCategory(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#contentCategoriesPatch.
 */
export interface ContentCategoriesPatchOptions {
  /**
   * ContentCategory ID.
   */
  id: bigint;
}

function serializeContentCategoriesPatchOptions(data: any): ContentCategoriesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeContentCategoriesPatchOptions(data: any): ContentCategoriesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Organizes placements according to the contents of their associated webpages.
 */
export interface ContentCategory {
  /**
   * Account ID of this content category. This is a read-only field that can be
   * left blank.
   */
  accountId?: bigint;
  /**
   * ID of this content category. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#contentCategory".
   */
  kind?: string;
  /**
   * Name of this content category. This is a required field and must be less
   * than 256 characters long and unique among content categories of the same
   * account.
   */
  name?: string;
}

function serializeContentCategory(data: any): ContentCategory {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeContentCategory(data: any): ContentCategory {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * A Conversion represents when a user successfully performs a desired action
 * after seeing an ad.
 */
export interface Conversion {
  /**
   * Whether this particular request may come from a user under the age of 13,
   * under COPPA compliance.
   */
  childDirectedTreatment?: boolean;
  /**
   * Custom floodlight variables. This field may only be used when calling
   * batchinsert; it is not supported by batchupdate.
   */
  customVariables?: CustomFloodlightVariable[];
  /**
   * The display click ID. This field is mutually exclusive with
   * encryptedUserId, encryptedUserIdCandidates[], matchId, mobileDeviceId,
   * gclid, and impressionId. This or encryptedUserId or
   * encryptedUserIdCandidates[] or matchId or mobileDeviceId or gclid or
   * impressionId is a required field.
   */
  dclid?: string;
  /**
   * The alphanumeric encrypted user ID. When set, encryptionInfo should also
   * be specified. This field is mutually exclusive with
   * encryptedUserIdCandidates[], matchId, mobileDeviceId, gclid, dclid, and
   * impressionId. This or encryptedUserIdCandidates[] or matchId or
   * mobileDeviceId or gclid or dclid or impressionId is a required field.
   */
  encryptedUserId?: string;
  /**
   * A list of the alphanumeric encrypted user IDs. Any user ID with exposure
   * prior to the conversion timestamp will be used in the inserted conversion.
   * If no such user ID is found then the conversion will be rejected with
   * INVALID_ARGUMENT error. When set, encryptionInfo should also be specified.
   * This field may only be used when calling batchinsert; it is not supported
   * by batchupdate. This field is mutually exclusive with encryptedUserId,
   * matchId, mobileDeviceId, gclid dclid, and impressionId. This or
   * encryptedUserId or matchId or mobileDeviceId or gclid or dclid or
   * impressionId is a required field.
   */
  encryptedUserIdCandidates?: string[];
  /**
   * Floodlight Activity ID of this conversion. This is a required field.
   */
  floodlightActivityId?: bigint;
  /**
   * Floodlight Configuration ID of this conversion. This is a required field.
   */
  floodlightConfigurationId?: bigint;
  /**
   * The Google click ID. This field is mutually exclusive with
   * encryptedUserId, encryptedUserIdCandidates[], matchId, mobileDeviceId,
   * dclid, and impressionId. This or encryptedUserId or
   * encryptedUserIdCandidates[] or matchId or mobileDeviceId or dclid or
   * impressionId is a required field.
   */
  gclid?: string;
  /**
   * The impression ID. This field is mutually exclusive with encryptedUserId,
   * encryptedUserIdCandidates[], matchId, mobileDeviceId, and gclid. One of
   * these identifiers must be set.
   */
  impressionId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversion".
   */
  kind?: string;
  /**
   * Whether Limit Ad Tracking is enabled. When set to true, the conversion
   * will be used for reporting but not targeting. This will prevent
   * remarketing.
   */
  limitAdTracking?: boolean;
  /**
   * The match ID field. A match ID is your own first-party identifier that has
   * been synced with Google using the match ID feature in Floodlight. This
   * field is mutually exclusive with encryptedUserId,
   * encryptedUserIdCandidates[],mobileDeviceId, gclid, dclid, and impressionId.
   * This or encryptedUserId orencryptedUserIdCandidates[] or mobileDeviceId or
   * gclid or dclid or impressionIdis a required field.
   */
  matchId?: string;
  /**
   * The mobile device ID. This field is mutually exclusive with
   * encryptedUserId, encryptedUserIdCandidates[], matchId, gclid, dclid, and
   * impressionId. This or encryptedUserId or encryptedUserIdCandidates[] or
   * matchId or gclid or dclid or impressionId is a required field.
   */
  mobileDeviceId?: string;
  /**
   * Whether the conversion was for a non personalized ad.
   */
  nonPersonalizedAd?: boolean;
  /**
   * The ordinal of the conversion. Use this field to control how conversions
   * of the same user and day are de-duplicated. This is a required field.
   */
  ordinal?: string;
  /**
   * The quantity of the conversion.
   */
  quantity?: bigint;
  /**
   * The timestamp of conversion, in Unix epoch micros. This is a required
   * field.
   */
  timestampMicros?: bigint;
  /**
   * Whether this particular request may come from a user under the age of 16
   * (may differ by country), under compliance with the European Union's General
   * Data Protection Regulation (GDPR).
   */
  treatmentForUnderage?: boolean;
  /**
   * The value of the conversion.
   */
  value?: number;
}

function serializeConversion(data: any): Conversion {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
    timestampMicros: data["timestampMicros"] !== undefined ? String(data["timestampMicros"]) : undefined,
  };
}

function deserializeConversion(data: any): Conversion {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
    timestampMicros: data["timestampMicros"] !== undefined ? BigInt(data["timestampMicros"]) : undefined,
  };
}

/**
 * The error code and description for a conversion that failed to insert or
 * update.
 */
export interface ConversionError {
  /**
   * The error code.
   */
  code?:  | "INVALID_ARGUMENT" | "INTERNAL" | "PERMISSION_DENIED" | "NOT_FOUND";
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionError".
   */
  kind?: string;
  /**
   * A description of the error.
   */
  message?: string;
}

/**
 * Insert Conversions Request.
 */
export interface ConversionsBatchInsertRequest {
  /**
   * The set of conversions to insert.
   */
  conversions?: Conversion[];
  /**
   * Describes how encryptedUserId or encryptedUserIdCandidates[] is encrypted.
   * This is a required field if encryptedUserId or encryptedUserIdCandidates[]
   * is used.
   */
  encryptionInfo?: EncryptionInfo;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionsBatchInsertRequest".
   */
  kind?: string;
}

function serializeConversionsBatchInsertRequest(data: any): ConversionsBatchInsertRequest {
  return {
    ...data,
    conversions: data["conversions"] !== undefined ? data["conversions"].map((item: any) => (serializeConversion(item))) : undefined,
    encryptionInfo: data["encryptionInfo"] !== undefined ? serializeEncryptionInfo(data["encryptionInfo"]) : undefined,
  };
}

function deserializeConversionsBatchInsertRequest(data: any): ConversionsBatchInsertRequest {
  return {
    ...data,
    conversions: data["conversions"] !== undefined ? data["conversions"].map((item: any) => (deserializeConversion(item))) : undefined,
    encryptionInfo: data["encryptionInfo"] !== undefined ? deserializeEncryptionInfo(data["encryptionInfo"]) : undefined,
  };
}

/**
 * Insert Conversions Response.
 */
export interface ConversionsBatchInsertResponse {
  /**
   * Indicates that some or all conversions failed to insert.
   */
  hasFailures?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionsBatchInsertResponse".
   */
  kind?: string;
  /**
   * The insert status of each conversion. Statuses are returned in the same
   * order that conversions are inserted.
   */
  status?: ConversionStatus[];
}

function serializeConversionsBatchInsertResponse(data: any): ConversionsBatchInsertResponse {
  return {
    ...data,
    status: data["status"] !== undefined ? data["status"].map((item: any) => (serializeConversionStatus(item))) : undefined,
  };
}

function deserializeConversionsBatchInsertResponse(data: any): ConversionsBatchInsertResponse {
  return {
    ...data,
    status: data["status"] !== undefined ? data["status"].map((item: any) => (deserializeConversionStatus(item))) : undefined,
  };
}

/**
 * Update Conversions Request.
 */
export interface ConversionsBatchUpdateRequest {
  /**
   * The set of conversions to update.
   */
  conversions?: Conversion[];
  /**
   * Describes how encryptedUserId is encrypted. This is a required field if
   * encryptedUserId is used.
   */
  encryptionInfo?: EncryptionInfo;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionsBatchUpdateRequest".
   */
  kind?: string;
}

function serializeConversionsBatchUpdateRequest(data: any): ConversionsBatchUpdateRequest {
  return {
    ...data,
    conversions: data["conversions"] !== undefined ? data["conversions"].map((item: any) => (serializeConversion(item))) : undefined,
    encryptionInfo: data["encryptionInfo"] !== undefined ? serializeEncryptionInfo(data["encryptionInfo"]) : undefined,
  };
}

function deserializeConversionsBatchUpdateRequest(data: any): ConversionsBatchUpdateRequest {
  return {
    ...data,
    conversions: data["conversions"] !== undefined ? data["conversions"].map((item: any) => (deserializeConversion(item))) : undefined,
    encryptionInfo: data["encryptionInfo"] !== undefined ? deserializeEncryptionInfo(data["encryptionInfo"]) : undefined,
  };
}

/**
 * Update Conversions Response.
 */
export interface ConversionsBatchUpdateResponse {
  /**
   * Indicates that some or all conversions failed to update.
   */
  hasFailures?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionsBatchUpdateResponse".
   */
  kind?: string;
  /**
   * The update status of each conversion. Statuses are returned in the same
   * order that conversions are updated.
   */
  status?: ConversionStatus[];
}

function serializeConversionsBatchUpdateResponse(data: any): ConversionsBatchUpdateResponse {
  return {
    ...data,
    status: data["status"] !== undefined ? data["status"].map((item: any) => (serializeConversionStatus(item))) : undefined,
  };
}

function deserializeConversionsBatchUpdateResponse(data: any): ConversionsBatchUpdateResponse {
  return {
    ...data,
    status: data["status"] !== undefined ? data["status"].map((item: any) => (deserializeConversionStatus(item))) : undefined,
  };
}

/**
 * The original conversion that was inserted or updated and whether there were
 * any errors.
 */
export interface ConversionStatus {
  /**
   * The original conversion that was inserted or updated.
   */
  conversion?: Conversion;
  /**
   * A list of errors related to this conversion.
   */
  errors?: ConversionError[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#conversionStatus".
   */
  kind?: string;
}

function serializeConversionStatus(data: any): ConversionStatus {
  return {
    ...data,
    conversion: data["conversion"] !== undefined ? serializeConversion(data["conversion"]) : undefined,
  };
}

function deserializeConversionStatus(data: any): ConversionStatus {
  return {
    ...data,
    conversion: data["conversion"] !== undefined ? deserializeConversion(data["conversion"]) : undefined,
  };
}

/**
 * Country List Response
 */
export interface CountriesListResponse {
  /**
   * Country collection.
   */
  countries?: Country[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#countriesListResponse".
   */
  kind?: string;
}

function serializeCountriesListResponse(data: any): CountriesListResponse {
  return {
    ...data,
    countries: data["countries"] !== undefined ? data["countries"].map((item: any) => (serializeCountry(item))) : undefined,
  };
}

function deserializeCountriesListResponse(data: any): CountriesListResponse {
  return {
    ...data,
    countries: data["countries"] !== undefined ? data["countries"].map((item: any) => (deserializeCountry(item))) : undefined,
  };
}

/**
 * Contains information about a country that can be targeted by ads.
 */
export interface Country {
  /**
   * Country code.
   */
  countryCode?: string;
  /**
   * DART ID of this country. This is the ID used for targeting and generating
   * reports.
   */
  dartId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#country".
   */
  kind?: string;
  /**
   * Name of this country.
   */
  name?: string;
  /**
   * Whether ad serving supports secure servers in this country.
   */
  sslEnabled?: boolean;
}

function serializeCountry(data: any): Country {
  return {
    ...data,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
  };
}

function deserializeCountry(data: any): Country {
  return {
    ...data,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
  };
}

/**
 * Contains properties of a Creative.
 */
export interface Creative {
  /**
   * Account ID of this creative. This field, if left unset, will be
   * auto-generated for both insert and update operations. Applicable to all
   * creative types.
   */
  accountId?: bigint;
  /**
   * Whether the creative is active. Applicable to all creative types.
   */
  active?: boolean;
  /**
   * Additional sizes associated with a responsive creative. When inserting or
   * updating a creative either the size ID field or size width and height
   * fields can be used. Applicable to DISPLAY creatives when the primary asset
   * type is HTML_IMAGE.
   */
  additionalSizes?: Size[];
  /**
   * Ad parameters user for VPAID creative. This is a read-only field.
   * Applicable to the following creative types: all VPAID.
   */
  adParameters?: string;
  /**
   * Keywords for a Rich Media creative. Keywords let you customize the
   * creative settings of a Rich Media ad running on your site without having to
   * contact the advertiser. You can use keywords to dynamically change the look
   * or functionality of a creative. Applicable to the following creative types:
   * all RICH_MEDIA, and all VPAID.
   */
  adTagKeys?: string[];
  /**
   * Advertiser ID of this creative. This is a required field. Applicable to
   * all creative types.
   */
  advertiserId?: bigint;
  /**
   * Whether script access is allowed for this creative. This is a read-only
   * and deprecated field which will automatically be set to true on update.
   * Applicable to the following creative types: FLASH_INPAGE.
   */
  allowScriptAccess?: boolean;
  /**
   * Whether the creative is archived. Applicable to all creative types.
   */
  archived?: boolean;
  /**
   * Type of artwork used for the creative. This is a read-only field.
   * Applicable to the following creative types: all RICH_MEDIA, and all VPAID.
   */
  artworkType?:  | "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE";
  /**
   * Source application where creative was authored. Presently, only DBM
   * authored creatives will have this field set. Applicable to all creative
   * types.
   */
  authoringSource?:  | "CREATIVE_AUTHORING_SOURCE_DCM" | "CREATIVE_AUTHORING_SOURCE_DBM" | "CREATIVE_AUTHORING_SOURCE_STUDIO" | "CREATIVE_AUTHORING_SOURCE_GWD" | "CREATIVE_AUTHORING_SOURCE_ACS";
  /**
   * Authoring tool for HTML5 banner creatives. This is a read-only field.
   * Applicable to the following creative types: HTML5_BANNER.
   */
  authoringTool?:  | "NINJA" | "SWIFFY";
  /**
   * Whether images are automatically advanced for image gallery creatives.
   * Applicable to the following creative types: DISPLAY_IMAGE_GALLERY.
   */
  autoAdvanceImages?: boolean;
  /**
   * The 6-character HTML color code, beginning with #, for the background of
   * the window area where the Flash file is displayed. Default is white.
   * Applicable to the following creative types: FLASH_INPAGE.
   */
  backgroundColor?: string;
  /**
   * Click-through URL for backup image. Applicable to ENHANCED_BANNER when the
   * primary asset type is not HTML_IMAGE.
   */
  backupImageClickThroughUrl?: CreativeClickThroughUrl;
  /**
   * List of feature dependencies that will cause a backup image to be served
   * if the browser that serves the ad does not support them. Feature
   * dependencies are features that a browser must be able to support in order
   * to render your HTML5 creative asset correctly. This field is initially
   * auto-generated to contain all features detected by Campaign Manager for all
   * the assets of this creative and can then be modified by the client. To
   * reset this field, copy over all the creativeAssets' detected features.
   * Applicable to the following creative types: HTML5_BANNER. Applicable to
   * DISPLAY when the primary asset type is not HTML_IMAGE.
   */
  backupImageFeatures?:  | "CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE"[];
  /**
   * Reporting label used for HTML5 banner backup image. Applicable to the
   * following creative types: DISPLAY when the primary asset type is not
   * HTML_IMAGE.
   */
  backupImageReportingLabel?: string;
  /**
   * Target window for backup image. Applicable to the following creative
   * types: FLASH_INPAGE and HTML5_BANNER. Applicable to DISPLAY when the
   * primary asset type is not HTML_IMAGE.
   */
  backupImageTargetWindow?: TargetWindow;
  /**
   * Click tags of the creative. For DISPLAY, FLASH_INPAGE, and HTML5_BANNER
   * creatives, this is a subset of detected click tags for the assets
   * associated with this creative. After creating a flash asset, detected click
   * tags will be returned in the creativeAssetMetadata. When inserting the
   * creative, populate the creative clickTags field using the
   * creativeAssetMetadata.clickTags field. For DISPLAY_IMAGE_GALLERY creatives,
   * there should be exactly one entry in this list for each image creative
   * asset. A click tag is matched with a corresponding creative asset by
   * matching the clickTag.name field with the
   * creativeAsset.assetIdentifier.name field. Applicable to the following
   * creative types: DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER.
   * Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.
   */
  clickTags?: ClickTag[];
  /**
   * Industry standard ID assigned to creative for reach and frequency.
   * Applicable to INSTREAM_VIDEO_REDIRECT creatives.
   */
  commercialId?: string;
  /**
   * List of companion creatives assigned to an in-Stream video creative.
   * Acceptable values include IDs of existing flash and image creatives.
   * Applicable to the following creative types: all VPAID, all INSTREAM_AUDIO
   * and all INSTREAM_VIDEO with dynamicAssetSelection set to false.
   */
  companionCreatives?: bigint[];
  /**
   * Compatibilities associated with this creative. This is a read-only field.
   * DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on
   * mobile devices or in mobile apps for regular or interstitial ads,
   * respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps.
   * Only pre-existing creatives may have these compatibilities since new
   * creatives will either be assigned DISPLAY or DISPLAY_INTERSTITIAL instead.
   * IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with
   * the VAST standard. IN_STREAM_AUDIO refers to rendering in in-stream audio
   * ads developed with the VAST standard. Applicable to all creative types.
   * Acceptable values are: - "APP" - "APP_INTERSTITIAL" - "IN_STREAM_VIDEO" -
   * "IN_STREAM_AUDIO" - "DISPLAY" - "DISPLAY_INTERSTITIAL"
   */
  compatibility?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO"[];
  /**
   * Whether Flash assets associated with the creative need to be automatically
   * converted to HTML5. This flag is enabled by default and users can choose to
   * disable it if they don't want the system to generate and use HTML5 asset
   * for this creative. Applicable to the following creative type: FLASH_INPAGE.
   * Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.
   */
  convertFlashToHtml5?: boolean;
  /**
   * List of counter events configured for the creative. For
   * DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated
   * from clickTags. Applicable to the following creative types:
   * DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID.
   */
  counterCustomEvents?: CreativeCustomEvent[];
  /**
   * Assets associated with a creative. Applicable to all but the following
   * creative types: INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and
   * REDIRECT
   */
  creativeAssets?: CreativeAsset[];
  /**
   * Required if dynamicAssetSelection is true.
   */
  creativeAssetSelection?: CreativeAssetSelection;
  /**
   * Creative field assignments for this creative. Applicable to all creative
   * types.
   */
  creativeFieldAssignments?: CreativeFieldAssignment[];
  /**
   * Custom key-values for a Rich Media creative. Key-values let you customize
   * the creative settings of a Rich Media ad running on your site without
   * having to contact the advertiser. You can use key-values to dynamically
   * change the look or functionality of a creative. Applicable to the following
   * creative types: all RICH_MEDIA, and all VPAID.
   */
  customKeyValues?: string[];
  /**
   * Set this to true to enable the use of rules to target individual assets in
   * this creative. When set to true creativeAssetSelection must be set. This
   * also controls asset-level companions. When this is true, companion
   * creatives should be assigned to creative assets. Learn more. Applicable to
   * INSTREAM_VIDEO creatives.
   */
  dynamicAssetSelection?: boolean;
  /**
   * List of exit events configured for the creative. For DISPLAY and
   * DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated
   * from clickTags, For DISPLAY, an event is also created from the
   * backupImageReportingLabel. Applicable to the following creative types:
   * DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY
   * when the primary asset type is not HTML_IMAGE.
   */
  exitCustomEvents?: CreativeCustomEvent[];
  /**
   * OpenWindow FSCommand of this creative. This lets the SWF file communicate
   * with either Flash Player or the program hosting Flash Player, such as a web
   * browser. This is only triggered if allowScriptAccess field is true.
   * Applicable to the following creative types: FLASH_INPAGE.
   */
  fsCommand?: FsCommand;
  /**
   * HTML code for the creative. This is a required field when applicable. This
   * field is ignored if htmlCodeLocked is true. Applicable to the following
   * creative types: all CUSTOM, FLASH_INPAGE, and HTML5_BANNER, and all
   * RICH_MEDIA.
   */
  htmlCode?: string;
  /**
   * Whether HTML code is generated by Campaign Manager or manually entered.
   * Set to true to ignore changes to htmlCode. Applicable to the following
   * creative types: FLASH_INPAGE and HTML5_BANNER.
   */
  htmlCodeLocked?: boolean;
  /**
   * ID of this creative. This is a read-only, auto-generated field. Applicable
   * to all creative types.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this creative. This is a read-only field.
   * Applicable to all creative types.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creative".
   */
  kind?: string;
  /**
   * Creative last modification information. This is a read-only field.
   * Applicable to all creative types.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Latest Studio trafficked creative ID associated with rich media and VPAID
   * creatives. This is a read-only field. Applicable to the following creative
   * types: all RICH_MEDIA, and all VPAID.
   */
  latestTraffickedCreativeId?: bigint;
  /**
   * Description of the audio or video ad. Applicable to the following creative
   * types: all INSTREAM_VIDEO, INSTREAM_AUDIO, and all VPAID.
   */
  mediaDescription?: string;
  /**
   * Creative audio or video duration in seconds. This is a read-only field.
   * Applicable to the following creative types: INSTREAM_VIDEO, INSTREAM_AUDIO,
   * all RICH_MEDIA, and all VPAID.
   */
  mediaDuration?: number;
  /**
   * Name of the creative. This is a required field and must be less than 256
   * characters long. Applicable to all creative types.
   */
  name?: string;
  /**
   * Online behavioral advertising icon to be added to the creative. Applicable
   * to the following creative types: all INSTREAM_VIDEO.
   */
  obaIcon?: ObaIcon;
  /**
   * Override CSS value for rich media creatives. Applicable to the following
   * creative types: all RICH_MEDIA.
   */
  overrideCss?: string;
  /**
   * Amount of time to play the video before counting a view. Applicable to the
   * following creative types: all INSTREAM_VIDEO.
   */
  progressOffset?: VideoOffset;
  /**
   * URL of hosted image or hosted video or another ad tag. For
   * INSTREAM_VIDEO_REDIRECT creatives this is the in-stream video redirect URL.
   * The standard for a VAST (Video Ad Serving Template) ad response allows for
   * a redirect link to another VAST 2.0 or 3.0 call. This is a required field
   * when applicable. Applicable to the following creative types:
   * DISPLAY_REDIRECT, INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and
   * INSTREAM_VIDEO_REDIRECT
   */
  redirectUrl?: string;
  /**
   * ID of current rendering version. This is a read-only field. Applicable to
   * all creative types.
   */
  renderingId?: bigint;
  /**
   * Dimension value for the rendering ID of this creative. This is a read-only
   * field. Applicable to all creative types.
   */
  renderingIdDimensionValue?: DimensionValue;
  /**
   * The minimum required Flash plugin version for this creative. For example,
   * 11.2.202.235. This is a read-only field. Applicable to the following
   * creative types: all RICH_MEDIA, and all VPAID.
   */
  requiredFlashPluginVersion?: string;
  /**
   * The internal Flash version for this creative as calculated by Studio. This
   * is a read-only field. Applicable to the following creative types:
   * FLASH_INPAGE all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the
   * primary asset type is not HTML_IMAGE.
   */
  requiredFlashVersion?: number;
  /**
   * Size associated with this creative. When inserting or updating a creative
   * either the size ID field or size width and height fields can be used. This
   * is a required field when applicable; however for IMAGE, FLASH_INPAGE
   * creatives, and for DISPLAY creatives with a primary asset of type
   * HTML_IMAGE, if left blank, this field will be automatically set using the
   * actual size of the associated image assets. Applicable to the following
   * creative types: DISPLAY, DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER,
   * IMAGE, and all RICH_MEDIA.
   */
  size?: Size;
  /**
   * Amount of time to play the video before the skip button appears.
   * Applicable to the following creative types: all INSTREAM_VIDEO.
   */
  skipOffset?: VideoOffset;
  /**
   * Whether the user can choose to skip the creative. Applicable to the
   * following creative types: all INSTREAM_VIDEO and all VPAID.
   */
  skippable?: boolean;
  /**
   * Whether the creative is SSL-compliant. This is a read-only field.
   * Applicable to all creative types.
   */
  sslCompliant?: boolean;
  /**
   * Whether creative should be treated as SSL compliant even if the system
   * scan shows it's not. Applicable to all creative types.
   */
  sslOverride?: boolean;
  /**
   * Studio advertiser ID associated with rich media and VPAID creatives. This
   * is a read-only field. Applicable to the following creative types: all
   * RICH_MEDIA, and all VPAID.
   */
  studioAdvertiserId?: bigint;
  /**
   * Studio creative ID associated with rich media and VPAID creatives. This is
   * a read-only field. Applicable to the following creative types: all
   * RICH_MEDIA, and all VPAID.
   */
  studioCreativeId?: bigint;
  /**
   * Studio trafficked creative ID associated with rich media and VPAID
   * creatives. This is a read-only field. Applicable to the following creative
   * types: all RICH_MEDIA, and all VPAID.
   */
  studioTraffickedCreativeId?: bigint;
  /**
   * Subaccount ID of this creative. This field, if left unset, will be
   * auto-generated for both insert and update operations. Applicable to all
   * creative types.
   */
  subaccountId?: bigint;
  /**
   * Third-party URL used to record backup image impressions. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  thirdPartyBackupImageImpressionsUrl?: string;
  /**
   * Third-party URL used to record rich media impressions. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  thirdPartyRichMediaImpressionsUrl?: string;
  /**
   * Third-party URLs for tracking in-stream creative events. Applicable to the
   * following creative types: all INSTREAM_VIDEO, all INSTREAM_AUDIO, and all
   * VPAID.
   */
  thirdPartyUrls?: ThirdPartyTrackingUrl[];
  /**
   * List of timer events configured for the creative. For
   * DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated
   * from clickTags. Applicable to the following creative types:
   * DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY
   * when the primary asset is not HTML_IMAGE.
   */
  timerCustomEvents?: CreativeCustomEvent[];
  /**
   * Combined size of all creative assets. This is a read-only field.
   * Applicable to the following creative types: all RICH_MEDIA, and all VPAID.
   */
  totalFileSize?: bigint;
  /**
   * Type of this creative. This is a required field. Applicable to all
   * creative types. *Note:* FLASH_INPAGE, HTML5_BANNER, and IMAGE are only used
   * for existing creatives. New creatives should use DISPLAY as a replacement
   * for these types.
   */
  type?:  | "IMAGE" | "DISPLAY_REDIRECT" | "CUSTOM_DISPLAY" | "INTERNAL_REDIRECT" | "CUSTOM_DISPLAY_INTERSTITIAL" | "INTERSTITIAL_INTERNAL_REDIRECT" | "TRACKING_TEXT" | "RICH_MEDIA_DISPLAY_BANNER" | "RICH_MEDIA_INPAGE_FLOATING" | "RICH_MEDIA_IM_EXPAND" | "RICH_MEDIA_DISPLAY_EXPANDING" | "RICH_MEDIA_DISPLAY_INTERSTITIAL" | "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL" | "RICH_MEDIA_MOBILE_IN_APP" | "FLASH_INPAGE" | "INSTREAM_VIDEO" | "VPAID_LINEAR_VIDEO" | "VPAID_NON_LINEAR_VIDEO" | "INSTREAM_VIDEO_REDIRECT" | "RICH_MEDIA_PEEL_DOWN" | "HTML5_BANNER" | "DISPLAY" | "DISPLAY_IMAGE_GALLERY" | "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO" | "INSTREAM_AUDIO";
  /**
   * A Universal Ad ID as per the VAST 4.0 spec. Applicable to the following
   * creative types: INSTREAM_AUDIO and INSTREAM_VIDEO and VPAID.
   */
  universalAdId?: UniversalAdId;
  /**
   * The version number helps you keep track of multiple versions of your
   * creative in your reports. The version number will always be auto-generated
   * during insert operations to start at 1. For tracking creatives the version
   * cannot be incremented and will always remain at 1. For all other creative
   * types the version can be incremented only by 1 during update operations. In
   * addition, the version will be automatically incremented by 1 when
   * undergoing Rich Media creative merging. Applicable to all creative types.
   */
  version?: number;
}

function serializeCreative(data: any): Creative {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (serializeSize(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    backupImageClickThroughUrl: data["backupImageClickThroughUrl"] !== undefined ? serializeCreativeClickThroughUrl(data["backupImageClickThroughUrl"]) : undefined,
    clickTags: data["clickTags"] !== undefined ? data["clickTags"].map((item: any) => (serializeClickTag(item))) : undefined,
    companionCreatives: data["companionCreatives"] !== undefined ? data["companionCreatives"].map((item: any) => (String(item))) : undefined,
    counterCustomEvents: data["counterCustomEvents"] !== undefined ? data["counterCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
    creativeAssets: data["creativeAssets"] !== undefined ? data["creativeAssets"].map((item: any) => (serializeCreativeAsset(item))) : undefined,
    creativeAssetSelection: data["creativeAssetSelection"] !== undefined ? serializeCreativeAssetSelection(data["creativeAssetSelection"]) : undefined,
    creativeFieldAssignments: data["creativeFieldAssignments"] !== undefined ? data["creativeFieldAssignments"].map((item: any) => (serializeCreativeFieldAssignment(item))) : undefined,
    exitCustomEvents: data["exitCustomEvents"] !== undefined ? data["exitCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    latestTraffickedCreativeId: data["latestTraffickedCreativeId"] !== undefined ? String(data["latestTraffickedCreativeId"]) : undefined,
    obaIcon: data["obaIcon"] !== undefined ? serializeObaIcon(data["obaIcon"]) : undefined,
    renderingId: data["renderingId"] !== undefined ? String(data["renderingId"]) : undefined,
    size: data["size"] !== undefined ? serializeSize(data["size"]) : undefined,
    studioAdvertiserId: data["studioAdvertiserId"] !== undefined ? String(data["studioAdvertiserId"]) : undefined,
    studioCreativeId: data["studioCreativeId"] !== undefined ? String(data["studioCreativeId"]) : undefined,
    studioTraffickedCreativeId: data["studioTraffickedCreativeId"] !== undefined ? String(data["studioTraffickedCreativeId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    timerCustomEvents: data["timerCustomEvents"] !== undefined ? data["timerCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
    totalFileSize: data["totalFileSize"] !== undefined ? String(data["totalFileSize"]) : undefined,
  };
}

function deserializeCreative(data: any): Creative {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (deserializeSize(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    backupImageClickThroughUrl: data["backupImageClickThroughUrl"] !== undefined ? deserializeCreativeClickThroughUrl(data["backupImageClickThroughUrl"]) : undefined,
    clickTags: data["clickTags"] !== undefined ? data["clickTags"].map((item: any) => (deserializeClickTag(item))) : undefined,
    companionCreatives: data["companionCreatives"] !== undefined ? data["companionCreatives"].map((item: any) => (BigInt(item))) : undefined,
    counterCustomEvents: data["counterCustomEvents"] !== undefined ? data["counterCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
    creativeAssets: data["creativeAssets"] !== undefined ? data["creativeAssets"].map((item: any) => (deserializeCreativeAsset(item))) : undefined,
    creativeAssetSelection: data["creativeAssetSelection"] !== undefined ? deserializeCreativeAssetSelection(data["creativeAssetSelection"]) : undefined,
    creativeFieldAssignments: data["creativeFieldAssignments"] !== undefined ? data["creativeFieldAssignments"].map((item: any) => (deserializeCreativeFieldAssignment(item))) : undefined,
    exitCustomEvents: data["exitCustomEvents"] !== undefined ? data["exitCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    latestTraffickedCreativeId: data["latestTraffickedCreativeId"] !== undefined ? BigInt(data["latestTraffickedCreativeId"]) : undefined,
    obaIcon: data["obaIcon"] !== undefined ? deserializeObaIcon(data["obaIcon"]) : undefined,
    renderingId: data["renderingId"] !== undefined ? BigInt(data["renderingId"]) : undefined,
    size: data["size"] !== undefined ? deserializeSize(data["size"]) : undefined,
    studioAdvertiserId: data["studioAdvertiserId"] !== undefined ? BigInt(data["studioAdvertiserId"]) : undefined,
    studioCreativeId: data["studioCreativeId"] !== undefined ? BigInt(data["studioCreativeId"]) : undefined,
    studioTraffickedCreativeId: data["studioTraffickedCreativeId"] !== undefined ? BigInt(data["studioTraffickedCreativeId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    timerCustomEvents: data["timerCustomEvents"] !== undefined ? data["timerCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
    totalFileSize: data["totalFileSize"] !== undefined ? BigInt(data["totalFileSize"]) : undefined,
  };
}

/**
 * Creative Asset.
 */
export interface CreativeAsset {
  /**
   * Whether ActionScript3 is enabled for the flash asset. This is a read-only
   * field. Applicable to the following creative type: FLASH_INPAGE. Applicable
   * to DISPLAY when the primary asset type is not HTML_IMAGE.
   */
  actionScript3?: boolean;
  /**
   * Whether the video or audio asset is active. This is a read-only field for
   * VPAID_NON_LINEAR_VIDEO assets. Applicable to the following creative types:
   * INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.
   */
  active?: boolean;
  /**
   * Additional sizes associated with this creative asset. HTML5 asset
   * generated by compatible software such as GWD will be able to support more
   * sizes this creative asset can render.
   */
  additionalSizes?: Size[];
  /**
   * Possible alignments for an asset. This is a read-only field. Applicable to
   * the following creative types:
   * RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL .
   */
  alignment?:  | "ALIGNMENT_TOP" | "ALIGNMENT_RIGHT" | "ALIGNMENT_BOTTOM" | "ALIGNMENT_LEFT";
  /**
   * Artwork type of rich media creative. This is a read-only field. Applicable
   * to the following creative types: all RICH_MEDIA.
   */
  artworkType?:  | "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE";
  /**
   * Identifier of this asset. This is the same identifier returned during
   * creative asset insert operation. This is a required field. Applicable to
   * all but the following creative types: all REDIRECT and TRACKING_TEXT.
   */
  assetIdentifier?: CreativeAssetId;
  /**
   * Audio stream bit rate in kbps. This is a read-only field. Applicable to
   * the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.
   */
  audioBitRate?: number;
  /**
   * Audio sample bit rate in hertz. This is a read-only field. Applicable to
   * the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.
   */
  audioSampleRate?: number;
  /**
   * Exit event configured for the backup image. Applicable to the following
   * creative types: all RICH_MEDIA.
   */
  backupImageExit?: CreativeCustomEvent;
  /**
   * Detected bit-rate for audio or video asset. This is a read-only field.
   * Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO
   * and all VPAID.
   */
  bitRate?: number;
  /**
   * Rich media child asset type. This is a read-only field. Applicable to the
   * following creative types: all VPAID.
   */
  childAssetType?:  | "CHILD_ASSET_TYPE_FLASH" | "CHILD_ASSET_TYPE_VIDEO" | "CHILD_ASSET_TYPE_IMAGE" | "CHILD_ASSET_TYPE_DATA";
  /**
   * Size of an asset when collapsed. This is a read-only field. Applicable to
   * the following creative types: all RICH_MEDIA and all VPAID. Additionally,
   * applicable to assets whose displayType is ASSET_DISPLAY_TYPE_EXPANDING or
   * ASSET_DISPLAY_TYPE_PEEL_DOWN.
   */
  collapsedSize?: Size;
  /**
   * List of companion creatives assigned to an in-stream video creative asset.
   * Acceptable values include IDs of existing flash and image creatives.
   * Applicable to INSTREAM_VIDEO creative type with dynamicAssetSelection set
   * to true.
   */
  companionCreativeIds?: bigint[];
  /**
   * Custom start time in seconds for making the asset visible. Applicable to
   * the following creative types: all RICH_MEDIA. Value must be greater than or
   * equal to 0.
   */
  customStartTimeValue?: number;
  /**
   * List of feature dependencies for the creative asset that are detected by
   * Campaign Manager. Feature dependencies are features that a browser must be
   * able to support in order to render your HTML5 creative correctly. This is a
   * read-only, auto-generated field. Applicable to the following creative
   * types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is
   * not HTML_IMAGE.
   */
  detectedFeatures?:  | "CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE"[];
  /**
   * Type of rich media asset. This is a read-only field. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  displayType?:  | "ASSET_DISPLAY_TYPE_INPAGE" | "ASSET_DISPLAY_TYPE_FLOATING" | "ASSET_DISPLAY_TYPE_OVERLAY" | "ASSET_DISPLAY_TYPE_EXPANDING" | "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH" | "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH_EXPANDING" | "ASSET_DISPLAY_TYPE_PEEL_DOWN" | "ASSET_DISPLAY_TYPE_VPAID_LINEAR" | "ASSET_DISPLAY_TYPE_VPAID_NON_LINEAR" | "ASSET_DISPLAY_TYPE_BACKDROP";
  /**
   * Duration in seconds for which an asset will be displayed. Applicable to
   * the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and
   * VPAID_LINEAR_VIDEO. Value must be greater than or equal to 1.
   */
  duration?: number;
  /**
   * Duration type for which an asset will be displayed. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  durationType?:  | "ASSET_DURATION_TYPE_AUTO" | "ASSET_DURATION_TYPE_NONE" | "ASSET_DURATION_TYPE_CUSTOM";
  /**
   * Detected expanded dimension for video asset. This is a read-only field.
   * Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.
   */
  expandedDimension?: Size;
  /**
   * File size associated with this creative asset. This is a read-only field.
   * Applicable to all but the following creative types: all REDIRECT and
   * TRACKING_TEXT.
   */
  fileSize?: bigint;
  /**
   * Flash version of the asset. This is a read-only field. Applicable to the
   * following creative types: FLASH_INPAGE, all RICH_MEDIA, and all VPAID.
   * Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.
   */
  flashVersion?: number;
  /**
   * Video frame rate for video asset in frames per second. This is a read-only
   * field. Applicable to the following creative types: INSTREAM_VIDEO and all
   * VPAID.
   */
  frameRate?: number;
  /**
   * Whether to hide Flash objects flag for an asset. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  hideFlashObjects?: boolean;
  /**
   * Whether to hide selection boxes flag for an asset. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  hideSelectionBoxes?: boolean;
  /**
   * Whether the asset is horizontally locked. This is a read-only field.
   * Applicable to the following creative types: all RICH_MEDIA.
   */
  horizontallyLocked?: boolean;
  /**
   * Numeric ID of this creative asset. This is a required field and should not
   * be modified. Applicable to all but the following creative types: all
   * REDIRECT and TRACKING_TEXT.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of the asset. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Detected duration for audio or video asset. This is a read-only field.
   * Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO
   * and all VPAID.
   */
  mediaDuration?: number;
  /**
   * Detected MIME type for audio or video asset. This is a read-only field.
   * Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO
   * and all VPAID.
   */
  mimeType?: string;
  /**
   * Offset position for an asset in collapsed mode. This is a read-only field.
   * Applicable to the following creative types: all RICH_MEDIA and all VPAID.
   * Additionally, only applicable to assets whose displayType is
   * ASSET_DISPLAY_TYPE_EXPANDING or ASSET_DISPLAY_TYPE_PEEL_DOWN.
   */
  offset?: OffsetPosition;
  /**
   * Orientation of video asset. This is a read-only, auto-generated field.
   */
  orientation?:  | "LANDSCAPE" | "PORTRAIT" | "SQUARE";
  /**
   * Whether the backup asset is original or changed by the user in Campaign
   * Manager. Applicable to the following creative types: all RICH_MEDIA.
   */
  originalBackup?: boolean;
  /**
   * Whether this asset is used as a polite load asset.
   */
  politeLoad?: boolean;
  /**
   * Offset position for an asset. Applicable to the following creative types:
   * all RICH_MEDIA.
   */
  position?: OffsetPosition;
  /**
   * Offset left unit for an asset. This is a read-only field. Applicable to
   * the following creative types: all RICH_MEDIA.
   */
  positionLeftUnit?:  | "OFFSET_UNIT_PIXEL" | "OFFSET_UNIT_PERCENT" | "OFFSET_UNIT_PIXEL_FROM_CENTER";
  /**
   * Offset top unit for an asset. This is a read-only field if the asset
   * displayType is ASSET_DISPLAY_TYPE_OVERLAY. Applicable to the following
   * creative types: all RICH_MEDIA.
   */
  positionTopUnit?:  | "OFFSET_UNIT_PIXEL" | "OFFSET_UNIT_PERCENT" | "OFFSET_UNIT_PIXEL_FROM_CENTER";
  /**
   * Progressive URL for video asset. This is a read-only field. Applicable to
   * the following creative types: INSTREAM_VIDEO and all VPAID.
   */
  progressiveServingUrl?: string;
  /**
   * Whether the asset pushes down other content. Applicable to the following
   * creative types: all RICH_MEDIA. Additionally, only applicable when the
   * asset offsets are 0, the collapsedSize.width matches size.width, and the
   * collapsedSize.height is less than size.height.
   */
  pushdown?: boolean;
  /**
   * Pushdown duration in seconds for an asset. Applicable to the following
   * creative types: all RICH_MEDIA.Additionally, only applicable when the asset
   * pushdown field is true, the offsets are 0, the collapsedSize.width matches
   * size.width, and the collapsedSize.height is less than size.height.
   * Acceptable values are 0 to 9.99, inclusive.
   */
  pushdownDuration?: number;
  /**
   * Role of the asset in relation to creative. Applicable to all but the
   * following creative types: all REDIRECT and TRACKING_TEXT. This is a
   * required field. PRIMARY applies to DISPLAY, FLASH_INPAGE, HTML5_BANNER,
   * IMAGE, DISPLAY_IMAGE_GALLERY, all RICH_MEDIA (which may contain multiple
   * primary assets), and all VPAID creatives. BACKUP_IMAGE applies to
   * FLASH_INPAGE, HTML5_BANNER, all RICH_MEDIA, and all VPAID creatives.
   * Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.
   * ADDITIONAL_IMAGE and ADDITIONAL_FLASH apply to FLASH_INPAGE creatives.
   * OTHER refers to assets from sources other than Campaign Manager, such as
   * Studio uploaded assets, applicable to all RICH_MEDIA and all VPAID
   * creatives. PARENT_VIDEO refers to videos uploaded by the user in Campaign
   * Manager and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO
   * creatives. TRANSCODED_VIDEO refers to videos transcoded by Campaign Manager
   * from PARENT_VIDEO assets and is applicable to INSTREAM_VIDEO and
   * VPAID_LINEAR_VIDEO creatives. ALTERNATE_VIDEO refers to the Campaign
   * Manager representation of child asset videos from Studio, and is applicable
   * to VPAID_LINEAR_VIDEO creatives. These cannot be added or removed within
   * Campaign Manager. For VPAID_LINEAR_VIDEO creatives, PARENT_VIDEO,
   * TRANSCODED_VIDEO and ALTERNATE_VIDEO assets that are marked active serve as
   * backup in case the VPAID creative cannot be served. Only PARENT_VIDEO
   * assets can be added or removed for an INSTREAM_VIDEO or VPAID_LINEAR_VIDEO
   * creative. PARENT_AUDIO refers to audios uploaded by the user in Campaign
   * Manager and is applicable to INSTREAM_AUDIO creatives. TRANSCODED_AUDIO
   * refers to audios transcoded by Campaign Manager from PARENT_AUDIO assets
   * and is applicable to INSTREAM_AUDIO creatives.
   */
  role?:  | "PRIMARY" | "BACKUP_IMAGE" | "ADDITIONAL_IMAGE" | "ADDITIONAL_FLASH" | "PARENT_VIDEO" | "TRANSCODED_VIDEO" | "OTHER" | "ALTERNATE_VIDEO" | "PARENT_AUDIO" | "TRANSCODED_AUDIO";
  /**
   * Size associated with this creative asset. This is a required field when
   * applicable; however for IMAGE and FLASH_INPAGE, creatives if left blank,
   * this field will be automatically set using the actual size of the
   * associated image asset. Applicable to the following creative types:
   * DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER, IMAGE, and all
   * RICH_MEDIA. Applicable to DISPLAY when the primary asset type is not
   * HTML_IMAGE.
   */
  size?: Size;
  /**
   * Whether the asset is SSL-compliant. This is a read-only field. Applicable
   * to all but the following creative types: all REDIRECT and TRACKING_TEXT.
   */
  sslCompliant?: boolean;
  /**
   * Initial wait time type before making the asset visible. Applicable to the
   * following creative types: all RICH_MEDIA.
   */
  startTimeType?:  | "ASSET_START_TIME_TYPE_NONE" | "ASSET_START_TIME_TYPE_CUSTOM";
  /**
   * Streaming URL for video asset. This is a read-only field. Applicable to
   * the following creative types: INSTREAM_VIDEO and all VPAID.
   */
  streamingServingUrl?: string;
  /**
   * Whether the asset is transparent. Applicable to the following creative
   * types: all RICH_MEDIA. Additionally, only applicable to HTML5 assets.
   */
  transparency?: boolean;
  /**
   * Whether the asset is vertically locked. This is a read-only field.
   * Applicable to the following creative types: all RICH_MEDIA.
   */
  verticallyLocked?: boolean;
  /**
   * Window mode options for flash assets. Applicable to the following creative
   * types: FLASH_INPAGE, RICH_MEDIA_DISPLAY_EXPANDING, RICH_MEDIA_IM_EXPAND,
   * RICH_MEDIA_DISPLAY_BANNER, and RICH_MEDIA_INPAGE_FLOATING.
   */
  windowMode?:  | "OPAQUE" | "WINDOW" | "TRANSPARENT";
  /**
   * zIndex value of an asset. Applicable to the following creative types: all
   * RICH_MEDIA.Additionally, only applicable to assets whose displayType is NOT
   * one of the following types: ASSET_DISPLAY_TYPE_INPAGE or
   * ASSET_DISPLAY_TYPE_OVERLAY. Acceptable values are -999999999 to 999999999,
   * inclusive.
   */
  zIndex?: number;
  /**
   * File name of zip file. This is a read-only field. Applicable to the
   * following creative types: HTML5_BANNER.
   */
  zipFilename?: string;
  /**
   * Size of zip file. This is a read-only field. Applicable to the following
   * creative types: HTML5_BANNER.
   */
  zipFilesize?: string;
}

function serializeCreativeAsset(data: any): CreativeAsset {
  return {
    ...data,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (serializeSize(item))) : undefined,
    backupImageExit: data["backupImageExit"] !== undefined ? serializeCreativeCustomEvent(data["backupImageExit"]) : undefined,
    collapsedSize: data["collapsedSize"] !== undefined ? serializeSize(data["collapsedSize"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? data["companionCreativeIds"].map((item: any) => (String(item))) : undefined,
    expandedDimension: data["expandedDimension"] !== undefined ? serializeSize(data["expandedDimension"]) : undefined,
    fileSize: data["fileSize"] !== undefined ? String(data["fileSize"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    size: data["size"] !== undefined ? serializeSize(data["size"]) : undefined,
  };
}

function deserializeCreativeAsset(data: any): CreativeAsset {
  return {
    ...data,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (deserializeSize(item))) : undefined,
    backupImageExit: data["backupImageExit"] !== undefined ? deserializeCreativeCustomEvent(data["backupImageExit"]) : undefined,
    collapsedSize: data["collapsedSize"] !== undefined ? deserializeSize(data["collapsedSize"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? data["companionCreativeIds"].map((item: any) => (BigInt(item))) : undefined,
    expandedDimension: data["expandedDimension"] !== undefined ? deserializeSize(data["expandedDimension"]) : undefined,
    fileSize: data["fileSize"] !== undefined ? BigInt(data["fileSize"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    size: data["size"] !== undefined ? deserializeSize(data["size"]) : undefined,
  };
}

/**
 * Creative Asset ID.
 */
export interface CreativeAssetId {
  /**
   * Name of the creative asset. This is a required field while inserting an
   * asset. After insertion, this assetIdentifier is used to identify the
   * uploaded asset. Characters in the name must be alphanumeric or one of the
   * following: ".-_ ". Spaces are allowed.
   */
  name?: string;
  /**
   * Type of asset to upload. This is a required field. FLASH and IMAGE are no
   * longer supported for new uploads. All image assets should use HTML_IMAGE.
   */
  type?:  | "IMAGE" | "FLASH" | "VIDEO" | "HTML" | "HTML_IMAGE" | "AUDIO";
}

/**
 * CreativeAssets contains properties of a creative asset file which will be
 * uploaded or has already been uploaded. Refer to the creative sample code for
 * how to upload assets and insert a creative.
 */
export interface CreativeAssetMetadata {
  /**
   * ID of the creative asset. This is a required field.
   */
  assetIdentifier?: CreativeAssetId;
  /**
   * List of detected click tags for assets. This is a read-only,
   * auto-generated field. This field is empty for a rich media asset.
   */
  clickTags?: ClickTag[];
  /**
   * List of counter events configured for the asset. This is a read-only,
   * auto-generated field and only applicable to a rich media asset.
   */
  counterCustomEvents?: CreativeCustomEvent[];
  /**
   * List of feature dependencies for the creative asset that are detected by
   * Campaign Manager. Feature dependencies are features that a browser must be
   * able to support in order to render your HTML5 creative correctly. This is a
   * read-only, auto-generated field.
   */
  detectedFeatures?:  | "CSS_FONT_FACE" | "CSS_BACKGROUND_SIZE" | "CSS_BORDER_IMAGE" | "CSS_BORDER_RADIUS" | "CSS_BOX_SHADOW" | "CSS_FLEX_BOX" | "CSS_HSLA" | "CSS_MULTIPLE_BGS" | "CSS_OPACITY" | "CSS_RGBA" | "CSS_TEXT_SHADOW" | "CSS_ANIMATIONS" | "CSS_COLUMNS" | "CSS_GENERATED_CONTENT" | "CSS_GRADIENTS" | "CSS_REFLECTIONS" | "CSS_TRANSFORMS" | "CSS_TRANSFORMS3D" | "CSS_TRANSITIONS" | "APPLICATION_CACHE" | "CANVAS" | "CANVAS_TEXT" | "DRAG_AND_DROP" | "HASH_CHANGE" | "HISTORY" | "AUDIO" | "VIDEO" | "INDEXED_DB" | "INPUT_ATTR_AUTOCOMPLETE" | "INPUT_ATTR_AUTOFOCUS" | "INPUT_ATTR_LIST" | "INPUT_ATTR_PLACEHOLDER" | "INPUT_ATTR_MAX" | "INPUT_ATTR_MIN" | "INPUT_ATTR_MULTIPLE" | "INPUT_ATTR_PATTERN" | "INPUT_ATTR_REQUIRED" | "INPUT_ATTR_STEP" | "INPUT_TYPE_SEARCH" | "INPUT_TYPE_TEL" | "INPUT_TYPE_URL" | "INPUT_TYPE_EMAIL" | "INPUT_TYPE_DATETIME" | "INPUT_TYPE_DATE" | "INPUT_TYPE_MONTH" | "INPUT_TYPE_WEEK" | "INPUT_TYPE_TIME" | "INPUT_TYPE_DATETIME_LOCAL" | "INPUT_TYPE_NUMBER" | "INPUT_TYPE_RANGE" | "INPUT_TYPE_COLOR" | "LOCAL_STORAGE" | "POST_MESSAGE" | "SESSION_STORAGE" | "WEB_SOCKETS" | "WEB_SQL_DATABASE" | "WEB_WORKERS" | "GEO_LOCATION" | "INLINE_SVG" | "SMIL" | "SVG_HREF" | "SVG_CLIP_PATHS" | "TOUCH" | "WEBGL" | "SVG_FILTERS" | "SVG_FE_IMAGE"[];
  /**
   * List of exit events configured for the asset. This is a read-only,
   * auto-generated field and only applicable to a rich media asset.
   */
  exitCustomEvents?: CreativeCustomEvent[];
  /**
   * Numeric ID of the asset. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the numeric ID of the asset. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeAssetMetadata".
   */
  kind?: string;
  /**
   * True if the uploaded asset is a rich media asset. This is a read-only,
   * auto-generated field.
   */
  richMedia?: boolean;
  /**
   * List of timer events configured for the asset. This is a read-only,
   * auto-generated field and only applicable to a rich media asset.
   */
  timerCustomEvents?: CreativeCustomEvent[];
  /**
   * Rules validated during code generation that generated a warning. This is a
   * read-only, auto-generated field. Possible values are: - "ADMOB_REFERENCED"
   * - "ASSET_FORMAT_UNSUPPORTED_DCM" - "ASSET_INVALID" - "CLICK_TAG_HARD_CODED"
   * - "CLICK_TAG_INVALID" - "CLICK_TAG_IN_GWD" - "CLICK_TAG_MISSING" -
   * "CLICK_TAG_MORE_THAN_ONE" - "CLICK_TAG_NON_TOP_LEVEL" -
   * "COMPONENT_UNSUPPORTED_DCM" - "ENABLER_UNSUPPORTED_METHOD_DCM" -
   * "EXTERNAL_FILE_REFERENCED" - "FILE_DETAIL_EMPTY" - "FILE_TYPE_INVALID" -
   * "GWD_PROPERTIES_INVALID" - "HTML5_FEATURE_UNSUPPORTED" -
   * "LINKED_FILE_NOT_FOUND" - "MAX_FLASH_VERSION_11" - "MRAID_REFERENCED" -
   * "NOT_SSL_COMPLIANT" - "ORPHANED_ASSET" - "PRIMARY_HTML_MISSING" -
   * "SVG_INVALID" - "ZIP_INVALID"
   */
  warnedValidationRules?:  | "CLICK_TAG_NON_TOP_LEVEL" | "CLICK_TAG_MISSING" | "CLICK_TAG_MORE_THAN_ONE" | "CLICK_TAG_INVALID" | "ORPHANED_ASSET" | "PRIMARY_HTML_MISSING" | "EXTERNAL_FILE_REFERENCED" | "MRAID_REFERENCED" | "ADMOB_REFERENCED" | "FILE_TYPE_INVALID" | "ZIP_INVALID" | "LINKED_FILE_NOT_FOUND" | "MAX_FLASH_VERSION_11" | "NOT_SSL_COMPLIANT" | "FILE_DETAIL_EMPTY" | "ASSET_INVALID" | "GWD_PROPERTIES_INVALID" | "ENABLER_UNSUPPORTED_METHOD_DCM" | "ASSET_FORMAT_UNSUPPORTED_DCM" | "COMPONENT_UNSUPPORTED_DCM" | "HTML5_FEATURE_UNSUPPORTED" | "CLICK_TAG_IN_GWD" | "CLICK_TAG_HARD_CODED" | "SVG_INVALID" | "CLICK_TAG_IN_RICH_MEDIA" | "MISSING_ENABLER_REFERENCE"[];
}

function serializeCreativeAssetMetadata(data: any): CreativeAssetMetadata {
  return {
    ...data,
    clickTags: data["clickTags"] !== undefined ? data["clickTags"].map((item: any) => (serializeClickTag(item))) : undefined,
    counterCustomEvents: data["counterCustomEvents"] !== undefined ? data["counterCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
    exitCustomEvents: data["exitCustomEvents"] !== undefined ? data["exitCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    timerCustomEvents: data["timerCustomEvents"] !== undefined ? data["timerCustomEvents"].map((item: any) => (serializeCreativeCustomEvent(item))) : undefined,
  };
}

function deserializeCreativeAssetMetadata(data: any): CreativeAssetMetadata {
  return {
    ...data,
    clickTags: data["clickTags"] !== undefined ? data["clickTags"].map((item: any) => (deserializeClickTag(item))) : undefined,
    counterCustomEvents: data["counterCustomEvents"] !== undefined ? data["counterCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
    exitCustomEvents: data["exitCustomEvents"] !== undefined ? data["exitCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    timerCustomEvents: data["timerCustomEvents"] !== undefined ? data["timerCustomEvents"].map((item: any) => (deserializeCreativeCustomEvent(item))) : undefined,
  };
}

/**
 * Encapsulates the list of rules for asset selection and a default asset in
 * case none of the rules match. Applicable to INSTREAM_VIDEO creatives.
 */
export interface CreativeAssetSelection {
  /**
   * A creativeAssets[].id. This should refer to one of the parent assets in
   * this creative, and will be served if none of the rules match. This is a
   * required field.
   */
  defaultAssetId?: bigint;
  /**
   * Rules determine which asset will be served to a viewer. Rules will be
   * evaluated in the order in which they are stored in this list. This list
   * must contain at least one rule. Applicable to INSTREAM_VIDEO creatives.
   */
  rules?: Rule[];
}

function serializeCreativeAssetSelection(data: any): CreativeAssetSelection {
  return {
    ...data,
    defaultAssetId: data["defaultAssetId"] !== undefined ? String(data["defaultAssetId"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeRule(item))) : undefined,
  };
}

function deserializeCreativeAssetSelection(data: any): CreativeAssetSelection {
  return {
    ...data,
    defaultAssetId: data["defaultAssetId"] !== undefined ? BigInt(data["defaultAssetId"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeRule(item))) : undefined,
  };
}

/**
 * Creative Assignment.
 */
export interface CreativeAssignment {
  /**
   * Whether this creative assignment is active. When true, the creative will
   * be included in the ad's rotation.
   */
  active?: boolean;
  /**
   * Whether applicable event tags should fire when this creative assignment is
   * rendered. If this value is unset when the ad is inserted or updated, it
   * will default to true for all creative types EXCEPT for INTERNAL_REDIRECT,
   * INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO.
   */
  applyEventTags?: boolean;
  /**
   * Click-through URL of the creative assignment.
   */
  clickThroughUrl?: ClickThroughUrl;
  /**
   * Companion creative overrides for this creative assignment. Applicable to
   * video ads.
   */
  companionCreativeOverrides?: CompanionClickThroughOverride[];
  /**
   * Creative group assignments for this creative assignment. Only one
   * assignment per creative group number is allowed for a maximum of two
   * assignments.
   */
  creativeGroupAssignments?: CreativeGroupAssignment[];
  /**
   * ID of the creative to be assigned. This is a required field.
   */
  creativeId?: bigint;
  /**
   * Dimension value for the ID of the creative. This is a read-only,
   * auto-generated field.
   */
  creativeIdDimensionValue?: DimensionValue;
  endTime?: Date;
  /**
   * Rich media exit overrides for this creative assignment. Applicable when
   * the creative type is any of the following: - DISPLAY - RICH_MEDIA_INPAGE -
   * RICH_MEDIA_INPAGE_FLOATING - RICH_MEDIA_IM_EXPAND - RICH_MEDIA_EXPANDING -
   * RICH_MEDIA_INTERSTITIAL_FLOAT - RICH_MEDIA_MOBILE_IN_APP -
   * RICH_MEDIA_MULTI_FLOATING - RICH_MEDIA_PEEL_DOWN - VPAID_LINEAR -
   * VPAID_NON_LINEAR
   */
  richMediaExitOverrides?: RichMediaExitOverride[];
  /**
   * Sequence number of the creative assignment, applicable when the rotation
   * type is CREATIVE_ROTATION_TYPE_SEQUENTIAL. Acceptable values are 1 to
   * 65535, inclusive.
   */
  sequence?: number;
  /**
   * Whether the creative to be assigned is SSL-compliant. This is a read-only
   * field that is auto-generated when the ad is inserted or updated.
   */
  sslCompliant?: boolean;
  startTime?: Date;
  /**
   * Weight of the creative assignment, applicable when the rotation type is
   * CREATIVE_ROTATION_TYPE_RANDOM. Value must be greater than or equal to 1.
   */
  weight?: number;
}

function serializeCreativeAssignment(data: any): CreativeAssignment {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? serializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    companionCreativeOverrides: data["companionCreativeOverrides"] !== undefined ? data["companionCreativeOverrides"].map((item: any) => (serializeCompanionClickThroughOverride(item))) : undefined,
    creativeGroupAssignments: data["creativeGroupAssignments"] !== undefined ? data["creativeGroupAssignments"].map((item: any) => (serializeCreativeGroupAssignment(item))) : undefined,
    creativeId: data["creativeId"] !== undefined ? String(data["creativeId"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    richMediaExitOverrides: data["richMediaExitOverrides"] !== undefined ? data["richMediaExitOverrides"].map((item: any) => (serializeRichMediaExitOverride(item))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCreativeAssignment(data: any): CreativeAssignment {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? deserializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    companionCreativeOverrides: data["companionCreativeOverrides"] !== undefined ? data["companionCreativeOverrides"].map((item: any) => (deserializeCompanionClickThroughOverride(item))) : undefined,
    creativeGroupAssignments: data["creativeGroupAssignments"] !== undefined ? data["creativeGroupAssignments"].map((item: any) => (deserializeCreativeGroupAssignment(item))) : undefined,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    richMediaExitOverrides: data["richMediaExitOverrides"] !== undefined ? data["richMediaExitOverrides"].map((item: any) => (deserializeRichMediaExitOverride(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Click-through URL
 */
export interface CreativeClickThroughUrl {
  /**
   * Read-only convenience field representing the actual URL that will be used
   * for this click-through. The URL is computed as follows: - If landingPageId
   * is specified then that landing page's URL is assigned to this field. -
   * Otherwise, the customClickThroughUrl is assigned to this field.
   */
  computedClickThroughUrl?: string;
  /**
   * Custom click-through URL. Applicable if the landingPageId field is left
   * unset.
   */
  customClickThroughUrl?: string;
  /**
   * ID of the landing page for the click-through URL.
   */
  landingPageId?: bigint;
}

function serializeCreativeClickThroughUrl(data: any): CreativeClickThroughUrl {
  return {
    ...data,
    landingPageId: data["landingPageId"] !== undefined ? String(data["landingPageId"]) : undefined,
  };
}

function deserializeCreativeClickThroughUrl(data: any): CreativeClickThroughUrl {
  return {
    ...data,
    landingPageId: data["landingPageId"] !== undefined ? BigInt(data["landingPageId"]) : undefined,
  };
}

/**
 * Creative Custom Event.
 */
export interface CreativeCustomEvent {
  /**
   * Unique ID of this event used by Reporting and Data Transfer. This is a
   * read-only field.
   */
  advertiserCustomEventId?: bigint;
  /**
   * User-entered name for the event.
   */
  advertiserCustomEventName?: string;
  /**
   * Type of the event. This is a read-only field.
   */
  advertiserCustomEventType?:  | "ADVERTISER_EVENT_TIMER" | "ADVERTISER_EVENT_EXIT" | "ADVERTISER_EVENT_COUNTER";
  /**
   * Artwork label column, used to link events in Campaign Manager back to
   * events in Studio. This is a required field and should not be modified after
   * insertion.
   */
  artworkLabel?: string;
  /**
   * Artwork type used by the creative.This is a read-only field.
   */
  artworkType?:  | "ARTWORK_TYPE_FLASH" | "ARTWORK_TYPE_HTML5" | "ARTWORK_TYPE_MIXED" | "ARTWORK_TYPE_IMAGE";
  /**
   * Exit click-through URL for the event. This field is used only for exit
   * events.
   */
  exitClickThroughUrl?: CreativeClickThroughUrl;
  /**
   * ID of this event. This is a required field and should not be modified
   * after insertion.
   */
  id?: bigint;
  /**
   * Properties for rich media popup windows. This field is used only for exit
   * events.
   */
  popupWindowProperties?: PopupWindowProperties;
  /**
   * Target type used by the event.
   */
  targetType?:  | "TARGET_BLANK" | "TARGET_TOP" | "TARGET_SELF" | "TARGET_PARENT" | "TARGET_POPUP";
  /**
   * Video reporting ID, used to differentiate multiple videos in a single
   * creative. This is a read-only field.
   */
  videoReportingId?: string;
}

function serializeCreativeCustomEvent(data: any): CreativeCustomEvent {
  return {
    ...data,
    advertiserCustomEventId: data["advertiserCustomEventId"] !== undefined ? String(data["advertiserCustomEventId"]) : undefined,
    exitClickThroughUrl: data["exitClickThroughUrl"] !== undefined ? serializeCreativeClickThroughUrl(data["exitClickThroughUrl"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    popupWindowProperties: data["popupWindowProperties"] !== undefined ? serializePopupWindowProperties(data["popupWindowProperties"]) : undefined,
  };
}

function deserializeCreativeCustomEvent(data: any): CreativeCustomEvent {
  return {
    ...data,
    advertiserCustomEventId: data["advertiserCustomEventId"] !== undefined ? BigInt(data["advertiserCustomEventId"]) : undefined,
    exitClickThroughUrl: data["exitClickThroughUrl"] !== undefined ? deserializeCreativeClickThroughUrl(data["exitClickThroughUrl"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    popupWindowProperties: data["popupWindowProperties"] !== undefined ? deserializePopupWindowProperties(data["popupWindowProperties"]) : undefined,
  };
}

/**
 * Contains properties of a creative field.
 */
export interface CreativeField {
  /**
   * Account ID of this creative field. This is a read-only field that can be
   * left blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this creative field. This is a required field on
   * insertion.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * ID of this creative field. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeField".
   */
  kind?: string;
  /**
   * Name of this creative field. This is a required field and must be less
   * than 256 characters long and unique among creative fields of the same
   * advertiser.
   */
  name?: string;
  /**
   * Subaccount ID of this creative field. This is a read-only field that can
   * be left blank.
   */
  subaccountId?: bigint;
}

function serializeCreativeField(data: any): CreativeField {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeCreativeField(data: any): CreativeField {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Creative Field Assignment.
 */
export interface CreativeFieldAssignment {
  /**
   * ID of the creative field.
   */
  creativeFieldId?: bigint;
  /**
   * ID of the creative field value.
   */
  creativeFieldValueId?: bigint;
}

function serializeCreativeFieldAssignment(data: any): CreativeFieldAssignment {
  return {
    ...data,
    creativeFieldId: data["creativeFieldId"] !== undefined ? String(data["creativeFieldId"]) : undefined,
    creativeFieldValueId: data["creativeFieldValueId"] !== undefined ? String(data["creativeFieldValueId"]) : undefined,
  };
}

function deserializeCreativeFieldAssignment(data: any): CreativeFieldAssignment {
  return {
    ...data,
    creativeFieldId: data["creativeFieldId"] !== undefined ? BigInt(data["creativeFieldId"]) : undefined,
    creativeFieldValueId: data["creativeFieldValueId"] !== undefined ? BigInt(data["creativeFieldValueId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeFieldsList.
 */
export interface CreativeFieldsListOptions {
  /**
   * Select only creative fields that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only creative fields with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for creative fields by name or ID. Wildcards (*) are
   * allowed. For example, "creativefield*2015" will return creative fields with
   * names like "creativefield June 2015", "creativefield April 2015", or simply
   * "creativefield 2015". Most of the searches also add wild-cards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "creativefield" will match creative fields with the name "my
   * creativefield", "creativefield 2015", or simply "creativefield".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeCreativeFieldsListOptions(data: any): CreativeFieldsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeCreativeFieldsListOptions(data: any): CreativeFieldsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Creative Field List Response
 */
export interface CreativeFieldsListResponse {
  /**
   * Creative field collection.
   */
  creativeFields?: CreativeField[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeFieldsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCreativeFieldsListResponse(data: any): CreativeFieldsListResponse {
  return {
    ...data,
    creativeFields: data["creativeFields"] !== undefined ? data["creativeFields"].map((item: any) => (serializeCreativeField(item))) : undefined,
  };
}

function deserializeCreativeFieldsListResponse(data: any): CreativeFieldsListResponse {
  return {
    ...data,
    creativeFields: data["creativeFields"] !== undefined ? data["creativeFields"].map((item: any) => (deserializeCreativeField(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeFieldsPatch.
 */
export interface CreativeFieldsPatchOptions {
  /**
   * CreativeField ID.
   */
  id: bigint;
}

function serializeCreativeFieldsPatchOptions(data: any): CreativeFieldsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeCreativeFieldsPatchOptions(data: any): CreativeFieldsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Contains properties of a creative field value.
 */
export interface CreativeFieldValue {
  /**
   * ID of this creative field value. This is a read-only, auto-generated
   * field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeFieldValue".
   */
  kind?: string;
  /**
   * Value of this creative field value. It needs to be less than 256
   * characters in length and unique per creative field.
   */
  value?: string;
}

function serializeCreativeFieldValue(data: any): CreativeFieldValue {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeCreativeFieldValue(data: any): CreativeFieldValue {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeFieldValuesList.
 */
export interface CreativeFieldValuesListOptions {
  /**
   * Select only creative field values with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for creative field values by their values. Wildcards
   * (e.g. *) are not allowed.
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "VALUE";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeCreativeFieldValuesListOptions(data: any): CreativeFieldValuesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeCreativeFieldValuesListOptions(data: any): CreativeFieldValuesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Creative Field Value List Response
 */
export interface CreativeFieldValuesListResponse {
  /**
   * Creative field value collection.
   */
  creativeFieldValues?: CreativeFieldValue[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeFieldValuesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCreativeFieldValuesListResponse(data: any): CreativeFieldValuesListResponse {
  return {
    ...data,
    creativeFieldValues: data["creativeFieldValues"] !== undefined ? data["creativeFieldValues"].map((item: any) => (serializeCreativeFieldValue(item))) : undefined,
  };
}

function deserializeCreativeFieldValuesListResponse(data: any): CreativeFieldValuesListResponse {
  return {
    ...data,
    creativeFieldValues: data["creativeFieldValues"] !== undefined ? data["creativeFieldValues"].map((item: any) => (deserializeCreativeFieldValue(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeFieldValuesPatch.
 */
export interface CreativeFieldValuesPatchOptions {
  /**
   * CreativeFieldValue ID.
   */
  id: bigint;
}

function serializeCreativeFieldValuesPatchOptions(data: any): CreativeFieldValuesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeCreativeFieldValuesPatchOptions(data: any): CreativeFieldValuesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Contains properties of a creative group.
 */
export interface CreativeGroup {
  /**
   * Account ID of this creative group. This is a read-only field that can be
   * left blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this creative group. This is a required field on
   * insertion.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Subgroup of the creative group. Assign your creative groups to a subgroup
   * in order to filter or manage them more easily. This field is required on
   * insertion and is read-only after insertion. Acceptable values are 1 to 2,
   * inclusive.
   */
  groupNumber?: number;
  /**
   * ID of this creative group. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeGroup".
   */
  kind?: string;
  /**
   * Name of this creative group. This is a required field and must be less
   * than 256 characters long and unique among creative groups of the same
   * advertiser.
   */
  name?: string;
  /**
   * Subaccount ID of this creative group. This is a read-only field that can
   * be left blank.
   */
  subaccountId?: bigint;
}

function serializeCreativeGroup(data: any): CreativeGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeCreativeGroup(data: any): CreativeGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Creative Group Assignment.
 */
export interface CreativeGroupAssignment {
  /**
   * ID of the creative group to be assigned.
   */
  creativeGroupId?: bigint;
  /**
   * Creative group number of the creative group assignment.
   */
  creativeGroupNumber?:  | "CREATIVE_GROUP_ONE" | "CREATIVE_GROUP_TWO";
}

function serializeCreativeGroupAssignment(data: any): CreativeGroupAssignment {
  return {
    ...data,
    creativeGroupId: data["creativeGroupId"] !== undefined ? String(data["creativeGroupId"]) : undefined,
  };
}

function deserializeCreativeGroupAssignment(data: any): CreativeGroupAssignment {
  return {
    ...data,
    creativeGroupId: data["creativeGroupId"] !== undefined ? BigInt(data["creativeGroupId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeGroupsList.
 */
export interface CreativeGroupsListOptions {
  /**
   * Select only creative groups that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only creative groups that belong to this subgroup.
   */
  groupNumber?: number;
  /**
   * Select only creative groups with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for creative groups by name or ID. Wildcards (*) are
   * allowed. For example, "creativegroup*2015" will return creative groups with
   * names like "creativegroup June 2015", "creativegroup April 2015", or simply
   * "creativegroup 2015". Most of the searches also add wild-cards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "creativegroup" will match creative groups with the name "my
   * creativegroup", "creativegroup 2015", or simply "creativegroup".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeCreativeGroupsListOptions(data: any): CreativeGroupsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeCreativeGroupsListOptions(data: any): CreativeGroupsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Creative Group List Response
 */
export interface CreativeGroupsListResponse {
  /**
   * Creative group collection.
   */
  creativeGroups?: CreativeGroup[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativeGroupsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCreativeGroupsListResponse(data: any): CreativeGroupsListResponse {
  return {
    ...data,
    creativeGroups: data["creativeGroups"] !== undefined ? data["creativeGroups"].map((item: any) => (serializeCreativeGroup(item))) : undefined,
  };
}

function deserializeCreativeGroupsListResponse(data: any): CreativeGroupsListResponse {
  return {
    ...data,
    creativeGroups: data["creativeGroups"] !== undefined ? data["creativeGroups"].map((item: any) => (deserializeCreativeGroup(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativeGroupsPatch.
 */
export interface CreativeGroupsPatchOptions {
  /**
   * CreativeGroup ID.
   */
  id: bigint;
}

function serializeCreativeGroupsPatchOptions(data: any): CreativeGroupsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeCreativeGroupsPatchOptions(data: any): CreativeGroupsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Creative optimization settings.
 */
export interface CreativeOptimizationConfiguration {
  /**
   * ID of this creative optimization config. This field is auto-generated when
   * the campaign is inserted or updated. It can be null for existing campaigns.
   */
  id?: bigint;
  /**
   * Name of this creative optimization config. This is a required field and
   * must be less than 129 characters long.
   */
  name?: string;
  /**
   * List of optimization activities associated with this configuration.
   */
  optimizationActivitys?: OptimizationActivity[];
  /**
   * Optimization model for this configuration.
   */
  optimizationModel?:  | "CLICK" | "POST_CLICK" | "POST_IMPRESSION" | "POST_CLICK_AND_IMPRESSION" | "VIDEO_COMPLETION";
}

function serializeCreativeOptimizationConfiguration(data: any): CreativeOptimizationConfiguration {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    optimizationActivitys: data["optimizationActivitys"] !== undefined ? data["optimizationActivitys"].map((item: any) => (serializeOptimizationActivity(item))) : undefined,
  };
}

function deserializeCreativeOptimizationConfiguration(data: any): CreativeOptimizationConfiguration {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    optimizationActivitys: data["optimizationActivitys"] !== undefined ? data["optimizationActivitys"].map((item: any) => (deserializeOptimizationActivity(item))) : undefined,
  };
}

/**
 * Creative Rotation.
 */
export interface CreativeRotation {
  /**
   * Creative assignments in this creative rotation.
   */
  creativeAssignments?: CreativeAssignment[];
  /**
   * Creative optimization configuration that is used by this ad. It should
   * refer to one of the existing optimization configurations in the ad's
   * campaign. If it is unset or set to 0, then the campaign's default
   * optimization configuration will be used for this ad.
   */
  creativeOptimizationConfigurationId?: bigint;
  /**
   * Type of creative rotation. Can be used to specify whether to use
   * sequential or random rotation.
   */
  type?:  | "CREATIVE_ROTATION_TYPE_SEQUENTIAL" | "CREATIVE_ROTATION_TYPE_RANDOM";
  /**
   * Strategy for calculating weights. Used with CREATIVE_ROTATION_TYPE_RANDOM.
   */
  weightCalculationStrategy?:  | "WEIGHT_STRATEGY_EQUAL" | "WEIGHT_STRATEGY_CUSTOM" | "WEIGHT_STRATEGY_HIGHEST_CTR" | "WEIGHT_STRATEGY_OPTIMIZED";
}

function serializeCreativeRotation(data: any): CreativeRotation {
  return {
    ...data,
    creativeAssignments: data["creativeAssignments"] !== undefined ? data["creativeAssignments"].map((item: any) => (serializeCreativeAssignment(item))) : undefined,
    creativeOptimizationConfigurationId: data["creativeOptimizationConfigurationId"] !== undefined ? String(data["creativeOptimizationConfigurationId"]) : undefined,
  };
}

function deserializeCreativeRotation(data: any): CreativeRotation {
  return {
    ...data,
    creativeAssignments: data["creativeAssignments"] !== undefined ? data["creativeAssignments"].map((item: any) => (deserializeCreativeAssignment(item))) : undefined,
    creativeOptimizationConfigurationId: data["creativeOptimizationConfigurationId"] !== undefined ? BigInt(data["creativeOptimizationConfigurationId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativesList.
 */
export interface CreativesListOptions {
  /**
   * Select only active creatives. Leave blank to select active and inactive
   * creatives.
   */
  active?: boolean;
  /**
   * Select only creatives with this advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * Select only archived creatives. Leave blank to select archived and
   * unarchived creatives.
   */
  archived?: boolean;
  /**
   * Select only creatives with this campaign ID.
   */
  campaignId?: bigint;
  /**
   * Select only in-stream video creatives with these companion IDs.
   */
  companionCreativeIds?: bigint;
  /**
   * Select only creatives with these creative field IDs.
   */
  creativeFieldIds?: bigint;
  /**
   * Select only creatives with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only creatives with these rendering IDs.
   */
  renderingIds?: bigint;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "creative*2015" will return objects with names like "creative June
   * 2015", "creative April 2015", or simply "creative 2015". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "creative" will match
   * objects with name "my creative", "creative 2015", or simply "creative".
   */
  searchString?: string;
  /**
   * Select only creatives with these size IDs.
   */
  sizeIds?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only creatives corresponding to this Studio creative ID.
   */
  studioCreativeId?: bigint;
  /**
   * Select only creatives with these creative types.
   */
  types?:  | "IMAGE" | "DISPLAY_REDIRECT" | "CUSTOM_DISPLAY" | "INTERNAL_REDIRECT" | "CUSTOM_DISPLAY_INTERSTITIAL" | "INTERSTITIAL_INTERNAL_REDIRECT" | "TRACKING_TEXT" | "RICH_MEDIA_DISPLAY_BANNER" | "RICH_MEDIA_INPAGE_FLOATING" | "RICH_MEDIA_IM_EXPAND" | "RICH_MEDIA_DISPLAY_EXPANDING" | "RICH_MEDIA_DISPLAY_INTERSTITIAL" | "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL" | "RICH_MEDIA_MOBILE_IN_APP" | "FLASH_INPAGE" | "INSTREAM_VIDEO" | "VPAID_LINEAR_VIDEO" | "VPAID_NON_LINEAR_VIDEO" | "INSTREAM_VIDEO_REDIRECT" | "RICH_MEDIA_PEEL_DOWN" | "HTML5_BANNER" | "DISPLAY" | "DISPLAY_IMAGE_GALLERY" | "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO" | "INSTREAM_AUDIO";
}

function serializeCreativesListOptions(data: any): CreativesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? String(data["companionCreativeIds"]) : undefined,
    creativeFieldIds: data["creativeFieldIds"] !== undefined ? String(data["creativeFieldIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    renderingIds: data["renderingIds"] !== undefined ? String(data["renderingIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? String(data["sizeIds"]) : undefined,
    studioCreativeId: data["studioCreativeId"] !== undefined ? String(data["studioCreativeId"]) : undefined,
  };
}

function deserializeCreativesListOptions(data: any): CreativesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? BigInt(data["companionCreativeIds"]) : undefined,
    creativeFieldIds: data["creativeFieldIds"] !== undefined ? BigInt(data["creativeFieldIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    renderingIds: data["renderingIds"] !== undefined ? BigInt(data["renderingIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? BigInt(data["sizeIds"]) : undefined,
    studioCreativeId: data["studioCreativeId"] !== undefined ? BigInt(data["studioCreativeId"]) : undefined,
  };
}

/**
 * Creative List Response
 */
export interface CreativesListResponse {
  /**
   * Creative collection.
   */
  creatives?: Creative[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#creativesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeCreativesListResponse(data: any): CreativesListResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (serializeCreative(item))) : undefined,
  };
}

function deserializeCreativesListResponse(data: any): CreativesListResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (deserializeCreative(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#creativesPatch.
 */
export interface CreativesPatchOptions {
  /**
   * Creative ID.
   */
  id: bigint;
}

function serializeCreativesPatchOptions(data: any): CreativesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeCreativesPatchOptions(data: any): CreativesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "CROSS_DIMENSION_REACH".
 */
export interface CrossDimensionReachReportCompatibleFields {
  /**
   * Dimensions which are compatible to be selected in the "breakdown" section
   * of the report.
   */
  breakdown?: Dimension[];
  /**
   * Dimensions which are compatible to be selected in the "dimensionFilters"
   * section of the report.
   */
  dimensionFilters?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#crossDimensionReachReportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
  /**
   * Metrics which are compatible to be selected in the "overlapMetricNames"
   * section of the report.
   */
  overlapMetrics?: Metric[];
}

/**
 * A custom floodlight variable. This field may only be used when calling
 * batchinsert; it is not supported by batchupdate.
 */
export interface CustomFloodlightVariable {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#customFloodlightVariable".
   */
  kind?: string;
  /**
   * The type of custom floodlight variable to supply a value for. These map to
   * the "u[1-20]=" in the tags.
   */
  type?:  | "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100";
  /**
   * The value of the custom floodlight variable. The length of string must not
   * exceed 100 characters.
   */
  value?: string;
}

/**
 * Represents a Custom Rich Media Events group.
 */
export interface CustomRichMediaEvents {
  /**
   * List of custom rich media event IDs. Dimension values must be all of type
   * dfa:richMediaEventTypeIdAndName.
   */
  filteredEventIds?: DimensionValue[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#customRichMediaEvents.
   */
  kind?: string;
}

/**
 * Custom Viewability Metric
 */
export interface CustomViewabilityMetric {
  /**
   * Configuration of the custom viewability metric.
   */
  configuration?: CustomViewabilityMetricConfiguration;
  /**
   * ID of the custom viewability metric.
   */
  id?: bigint;
  /**
   * Name of the custom viewability metric.
   */
  name?: string;
}

function serializeCustomViewabilityMetric(data: any): CustomViewabilityMetric {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeCustomViewabilityMetric(data: any): CustomViewabilityMetric {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * The attributes, like playtime and percent onscreen, that define the Custom
 * Viewability Metric.
 */
export interface CustomViewabilityMetricConfiguration {
  /**
   * Whether the video must be audible to count an impression.
   */
  audible?: boolean;
  /**
   * The time in milliseconds the video must play for the Custom Viewability
   * Metric to count an impression. If both this and timePercent are specified,
   * the earlier of the two will be used.
   */
  timeMillis?: number;
  /**
   * The percentage of video that must play for the Custom Viewability Metric
   * to count an impression. If both this and timeMillis are specified, the
   * earlier of the two will be used.
   */
  timePercent?: number;
  /**
   * The percentage of video that must be on screen for the Custom Viewability
   * Metric to count an impression.
   */
  viewabilityPercent?: number;
}

/**
 * Represents a date range.
 */
export interface DateRange {
  endDate?: Date;
  /**
   * The kind of resource this is, in this case dfareporting#dateRange.
   */
  kind?: string;
  /**
   * The date range relative to the date of when the report is run.
   */
  relativeDateRange?:  | "TODAY" | "YESTERDAY" | "WEEK_TO_DATE" | "MONTH_TO_DATE" | "QUARTER_TO_DATE" | "YEAR_TO_DATE" | "PREVIOUS_WEEK" | "PREVIOUS_MONTH" | "PREVIOUS_QUARTER" | "PREVIOUS_YEAR" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS" | "LAST_365_DAYS" | "LAST_24_MONTHS" | "LAST_14_DAYS" | "LAST_60_DAYS";
  startDate?: Date;
}

function serializeDateRange(data: any): DateRange {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
  };
}

function deserializeDateRange(data: any): DateRange {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
  };
}

/**
 * Day Part Targeting.
 */
export interface DayPartTargeting {
  /**
   * Days of the week when the ad will serve. Acceptable values are: - "SUNDAY"
   * - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY"
   */
  daysOfWeek?:  | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"[];
  /**
   * Hours of the day when the ad will serve, where 0 is midnight to 1 AM and
   * 23 is 11 PM to midnight. Can be specified with days of week, in which case
   * the ad would serve during these hours on the specified days. For example if
   * Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm
   * (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays,
   * and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive.
   */
  hoursOfDay?: number[];
  /**
   * Whether or not to use the user's local time. If false, the America/New
   * York time zone applies.
   */
  userLocalTime?: boolean;
}

/**
 * Contains information about a landing page deep link.
 */
export interface DeepLink {
  /**
   * The URL of the mobile app being linked to.
   */
  appUrl?: string;
  /**
   * The fallback URL. This URL will be served to users who do not have the
   * mobile app installed.
   */
  fallbackUrl?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#deepLink".
   */
  kind?: string;
  /**
   * The mobile app targeted by this deep link.
   */
  mobileApp?: MobileApp;
  /**
   * Ads served to users on these remarketing lists will use this deep link.
   * Applicable when mobileApp.directory is APPLE_APP_STORE.
   */
  remarketingListIds?: bigint[];
}

function serializeDeepLink(data: any): DeepLink {
  return {
    ...data,
    remarketingListIds: data["remarketingListIds"] !== undefined ? data["remarketingListIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeDeepLink(data: any): DeepLink {
  return {
    ...data,
    remarketingListIds: data["remarketingListIds"] !== undefined ? data["remarketingListIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Properties of inheriting and overriding the default click-through event tag.
 * A campaign may override the event tag defined at the advertiser level, and an
 * ad may also override the campaign's setting further.
 */
export interface DefaultClickThroughEventTagProperties {
  /**
   * ID of the click-through event tag to apply to all ads in this entity's
   * scope.
   */
  defaultClickThroughEventTagId?: bigint;
  /**
   * Whether this entity should override the inherited default click-through
   * event tag with its own defined value.
   */
  overrideInheritedEventTag?: boolean;
}

function serializeDefaultClickThroughEventTagProperties(data: any): DefaultClickThroughEventTagProperties {
  return {
    ...data,
    defaultClickThroughEventTagId: data["defaultClickThroughEventTagId"] !== undefined ? String(data["defaultClickThroughEventTagId"]) : undefined,
  };
}

function deserializeDefaultClickThroughEventTagProperties(data: any): DefaultClickThroughEventTagProperties {
  return {
    ...data,
    defaultClickThroughEventTagId: data["defaultClickThroughEventTagId"] !== undefined ? BigInt(data["defaultClickThroughEventTagId"]) : undefined,
  };
}

/**
 * Delivery Schedule.
 */
export interface DeliverySchedule {
  /**
   * Limit on the number of times an individual user can be served the ad
   * within a specified period of time.
   */
  frequencyCap?: FrequencyCap;
  /**
   * Whether or not hard cutoff is enabled. If true, the ad will not serve
   * after the end date and time. Otherwise the ad will continue to be served
   * until it has reached its delivery goals.
   */
  hardCutoff?: boolean;
  /**
   * Impression ratio for this ad. This ratio determines how often each ad is
   * served relative to the others. For example, if ad A has an impression ratio
   * of 1 and ad B has an impression ratio of 3, then Campaign Manager will
   * serve ad B three times as often as ad A. Acceptable values are 1 to 10,
   * inclusive.
   */
  impressionRatio?: bigint;
  /**
   * Serving priority of an ad, with respect to other ads. The lower the
   * priority number, the greater the priority with which it is served.
   */
  priority?:  | "AD_PRIORITY_01" | "AD_PRIORITY_02" | "AD_PRIORITY_03" | "AD_PRIORITY_04" | "AD_PRIORITY_05" | "AD_PRIORITY_06" | "AD_PRIORITY_07" | "AD_PRIORITY_08" | "AD_PRIORITY_09" | "AD_PRIORITY_10" | "AD_PRIORITY_11" | "AD_PRIORITY_12" | "AD_PRIORITY_13" | "AD_PRIORITY_14" | "AD_PRIORITY_15" | "AD_PRIORITY_16";
}

function serializeDeliverySchedule(data: any): DeliverySchedule {
  return {
    ...data,
    frequencyCap: data["frequencyCap"] !== undefined ? serializeFrequencyCap(data["frequencyCap"]) : undefined,
    impressionRatio: data["impressionRatio"] !== undefined ? String(data["impressionRatio"]) : undefined,
  };
}

function deserializeDeliverySchedule(data: any): DeliverySchedule {
  return {
    ...data,
    frequencyCap: data["frequencyCap"] !== undefined ? deserializeFrequencyCap(data["frequencyCap"]) : undefined,
    impressionRatio: data["impressionRatio"] !== undefined ? BigInt(data["impressionRatio"]) : undefined,
  };
}

/**
 * Google Ad Manager Settings
 */
export interface DfpSettings {
  /**
   * Ad Manager network code for this directory site.
   */
  dfpNetworkCode?: string;
  /**
   * Ad Manager network name for this directory site.
   */
  dfpNetworkName?: string;
  /**
   * Whether this directory site accepts programmatic placements.
   */
  programmaticPlacementAccepted?: boolean;
  /**
   * Whether this directory site is available only via Publisher Portal.
   */
  publisherPortalOnly?: boolean;
  /**
   * Whether this directory site accepts publisher-paid tags.
   */
  pubPaidPlacementAccepted?: boolean;
}

/**
 * Represents a dimension.
 */
export interface Dimension {
  /**
   * The kind of resource this is, in this case dfareporting#dimension.
   */
  kind?: string;
  /**
   * The dimension name, e.g. advertiser
   */
  name?: string;
}

/**
 * Represents a dimension filter.
 */
export interface DimensionFilter {
  /**
   * The name of the dimension to filter.
   */
  dimensionName?: string;
  /**
   * The kind of resource this is, in this case dfareporting#dimensionFilter.
   */
  kind?: string;
  /**
   * The value of the dimension to filter.
   */
  value?: string;
}

/**
 * Represents a DimensionValue resource.
 */
export interface DimensionValue {
  /**
   * The name of the dimension.
   */
  dimensionName?: string;
  /**
   * The eTag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The ID associated with the value if available.
   */
  id?: string;
  /**
   * The kind of resource this is, in this case dfareporting#dimensionValue.
   */
  kind?: string;
  /**
   * Determines how the 'value' field is matched when filtering. If not
   * specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed
   * as a placeholder for variable length character sequences, and it can be
   * escaped with a backslash. Note, only paid search dimensions
   * ('dfa:paidSearch*') allow a matchType other than EXACT.
   */
  matchType?:  | "EXACT" | "BEGINS_WITH" | "CONTAINS" | "WILDCARD_EXPRESSION";
  /**
   * The value of the dimension.
   */
  value?: string;
}

/**
 * Represents the list of DimensionValue resources.
 */
export interface DimensionValueList {
  /**
   * The eTag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The dimension values returned in this response.
   */
  items?: DimensionValue[];
  /**
   * The kind of list this is, in this case dfareporting#dimensionValueList.
   */
  kind?: string;
  /**
   * Continuation token used to page through dimension values. To retrieve the
   * next page of results, set the next request's "pageToken" to the value of
   * this field. The page token is only valid for a limited amount of time and
   * should not be persisted.
   */
  nextPageToken?: string;
}

/**
 * Represents a DimensionValuesRequest.
 */
export interface DimensionValueRequest {
  /**
   * The name of the dimension for which values should be requested.
   */
  dimensionName?: string;
  endDate?: Date;
  /**
   * The list of filters by which to filter values. The filters are ANDed.
   */
  filters?: DimensionFilter[];
  /**
   * The kind of request this is, in this case
   * dfareporting#dimensionValueRequest .
   */
  kind?: string;
  startDate?: Date;
}

function serializeDimensionValueRequest(data: any): DimensionValueRequest {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
  };
}

function deserializeDimensionValueRequest(data: any): DimensionValueRequest {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#dimensionValuesQuery.
 */
export interface DimensionValuesQueryOptions {
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous result page.
   */
  pageToken?: string;
}

/**
 * DirectorySites contains properties of a website from the Site Directory.
 * Sites need to be added to an account via the Sites resource before they can
 * be assigned to a placement.
 */
export interface DirectorySite {
  /**
   * ID of this directory site. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this directory site. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Tag types for regular placements. Acceptable values are: - "STANDARD" -
   * "IFRAME_JAVASCRIPT_INPAGE" - "INTERNAL_REDIRECT_INPAGE" -
   * "JAVASCRIPT_INPAGE"
   */
  inpageTagFormats?:  | "STANDARD" | "IFRAME_JAVASCRIPT_INPAGE" | "INTERNAL_REDIRECT_INPAGE" | "JAVASCRIPT_INPAGE"[];
  /**
   * Tag types for interstitial placements. Acceptable values are: -
   * "IFRAME_JAVASCRIPT_INTERSTITIAL" - "INTERNAL_REDIRECT_INTERSTITIAL" -
   * "JAVASCRIPT_INTERSTITIAL"
   */
  interstitialTagFormats?:  | "IFRAME_JAVASCRIPT_INTERSTITIAL" | "INTERNAL_REDIRECT_INTERSTITIAL" | "JAVASCRIPT_INTERSTITIAL"[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#directorySite".
   */
  kind?: string;
  /**
   * Name of this directory site.
   */
  name?: string;
  /**
   * Directory site settings.
   */
  settings?: DirectorySiteSettings;
  /**
   * URL of this directory site.
   */
  url?: string;
}

function serializeDirectorySite(data: any): DirectorySite {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeDirectorySite(data: any): DirectorySite {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Directory Site Settings
 */
export interface DirectorySiteSettings {
  /**
   * Whether this directory site has disabled active view creatives.
   */
  activeViewOptOut?: boolean;
  /**
   * Directory site Ad Manager settings.
   */
  dfpSettings?: DfpSettings;
  /**
   * Whether this site accepts in-stream video ads.
   */
  instreamVideoPlacementAccepted?: boolean;
  /**
   * Whether this site accepts interstitial ads.
   */
  interstitialPlacementAccepted?: boolean;
}

/**
 * Additional options for dfareporting#directorySitesList.
 */
export interface DirectorySitesListOptions {
  /**
   * This search filter is no longer supported and will have no effect on the
   * results returned.
   */
  acceptsInStreamVideoPlacements?: boolean;
  /**
   * This search filter is no longer supported and will have no effect on the
   * results returned.
   */
  acceptsInterstitialPlacements?: boolean;
  /**
   * Select only directory sites that accept publisher paid placements. This
   * field can be left blank.
   */
  acceptsPublisherPaidPlacements?: boolean;
  /**
   * Select only active directory sites. Leave blank to retrieve both active
   * and inactive directory sites.
   */
  active?: boolean;
  /**
   * Select only directory sites with this Ad Manager network code.
   */
  dfpNetworkCode?: string;
  /**
   * Select only directory sites with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name, ID or URL. Wildcards (*) are
   * allowed. For example, "directory site*2015" will return objects with names
   * like "directory site June 2015", "directory site April 2015", or simply
   * "directory site 2015". Most of the searches also add wildcards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "directory site" will match objects with name "my directory site",
   * "directory site 2015" or simply, "directory site".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeDirectorySitesListOptions(data: any): DirectorySitesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeDirectorySitesListOptions(data: any): DirectorySitesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Directory Site List Response
 */
export interface DirectorySitesListResponse {
  /**
   * Directory site collection.
   */
  directorySites?: DirectorySite[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#directorySitesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeDirectorySitesListResponse(data: any): DirectorySitesListResponse {
  return {
    ...data,
    directorySites: data["directorySites"] !== undefined ? data["directorySites"].map((item: any) => (serializeDirectorySite(item))) : undefined,
  };
}

function deserializeDirectorySitesListResponse(data: any): DirectorySitesListResponse {
  return {
    ...data,
    directorySites: data["directorySites"] !== undefined ? data["directorySites"].map((item: any) => (deserializeDirectorySite(item))) : undefined,
  };
}

/**
 * Represents a Disjunctive Match Statement resource, which is a conjunction
 * (and) of disjunctive (or) boolean statements.
 */
export interface DisjunctiveMatchStatement {
  /**
   * The event filters contained within this disjunctive match statement.
   */
  eventFilters?: EventFilter[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#disjunctiveMatchStatement.
   */
  kind?: string;
}

function serializeDisjunctiveMatchStatement(data: any): DisjunctiveMatchStatement {
  return {
    ...data,
    eventFilters: data["eventFilters"] !== undefined ? data["eventFilters"].map((item: any) => (serializeEventFilter(item))) : undefined,
  };
}

function deserializeDisjunctiveMatchStatement(data: any): DisjunctiveMatchStatement {
  return {
    ...data,
    eventFilters: data["eventFilters"] !== undefined ? data["eventFilters"].map((item: any) => (deserializeEventFilter(item))) : undefined,
  };
}

/**
 * Contains properties of a dynamic targeting key. Dynamic targeting keys are
 * unique, user-friendly labels, created at the advertiser level in DCM, that
 * can be assigned to ads, creatives, and placements and used for targeting with
 * Studio dynamic creatives. Use these labels instead of numeric Campaign
 * Manager IDs (such as placement IDs) to save time and avoid errors in your
 * dynamic feeds.
 */
export interface DynamicTargetingKey {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#dynamicTargetingKey".
   */
  kind?: string;
  /**
   * Name of this dynamic targeting key. This is a required field. Must be less
   * than 256 characters long and cannot contain commas. All characters are
   * converted to lowercase.
   */
  name?: string;
  /**
   * ID of the object of this dynamic targeting key. This is a required field.
   */
  objectId?: bigint;
  /**
   * Type of the object of this dynamic targeting key. This is a required
   * field.
   */
  objectType?:  | "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT";
}

function serializeDynamicTargetingKey(data: any): DynamicTargetingKey {
  return {
    ...data,
    objectId: data["objectId"] !== undefined ? String(data["objectId"]) : undefined,
  };
}

function deserializeDynamicTargetingKey(data: any): DynamicTargetingKey {
  return {
    ...data,
    objectId: data["objectId"] !== undefined ? BigInt(data["objectId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#dynamicTargetingKeysDelete.
 */
export interface DynamicTargetingKeysDeleteOptions {
  /**
   * Name of this dynamic targeting key. This is a required field. Must be less
   * than 256 characters long and cannot contain commas. All characters are
   * converted to lowercase.
   */
  name: string;
  /**
   * Type of the object of this dynamic targeting key. This is a required
   * field.
   */
  objectType:  | "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT";
}

/**
 * Additional options for dfareporting#dynamicTargetingKeysList.
 */
export interface DynamicTargetingKeysListOptions {
  /**
   * Select only dynamic targeting keys whose object has this advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * Select only dynamic targeting keys exactly matching these names.
   */
  names?: string;
  /**
   * Select only dynamic targeting keys with this object ID.
   */
  objectId?: bigint;
  /**
   * Select only dynamic targeting keys with this object type.
   */
  objectType?:  | "OBJECT_ADVERTISER" | "OBJECT_AD" | "OBJECT_CREATIVE" | "OBJECT_PLACEMENT";
}

function serializeDynamicTargetingKeysListOptions(data: any): DynamicTargetingKeysListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    objectId: data["objectId"] !== undefined ? String(data["objectId"]) : undefined,
  };
}

function deserializeDynamicTargetingKeysListOptions(data: any): DynamicTargetingKeysListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    objectId: data["objectId"] !== undefined ? BigInt(data["objectId"]) : undefined,
  };
}

/**
 * Dynamic Targeting Key List Response
 */
export interface DynamicTargetingKeysListResponse {
  /**
   * Dynamic targeting key collection.
   */
  dynamicTargetingKeys?: DynamicTargetingKey[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#dynamicTargetingKeysListResponse".
   */
  kind?: string;
}

function serializeDynamicTargetingKeysListResponse(data: any): DynamicTargetingKeysListResponse {
  return {
    ...data,
    dynamicTargetingKeys: data["dynamicTargetingKeys"] !== undefined ? data["dynamicTargetingKeys"].map((item: any) => (serializeDynamicTargetingKey(item))) : undefined,
  };
}

function deserializeDynamicTargetingKeysListResponse(data: any): DynamicTargetingKeysListResponse {
  return {
    ...data,
    dynamicTargetingKeys: data["dynamicTargetingKeys"] !== undefined ? data["dynamicTargetingKeys"].map((item: any) => (deserializeDynamicTargetingKey(item))) : undefined,
  };
}

/**
 * A description of how user IDs are encrypted.
 */
export interface EncryptionInfo {
  /**
   * The encryption entity ID. This should match the encryption configuration
   * for ad serving or Data Transfer.
   */
  encryptionEntityId?: bigint;
  /**
   * The encryption entity type. This should match the encryption configuration
   * for ad serving or Data Transfer.
   */
  encryptionEntityType?:  | "ENCRYPTION_ENTITY_TYPE_UNKNOWN" | "DCM_ACCOUNT" | "DCM_ADVERTISER" | "DBM_PARTNER" | "DBM_ADVERTISER" | "ADWORDS_CUSTOMER" | "DFP_NETWORK_CODE";
  /**
   * Describes whether the encrypted cookie was received from ad serving (the
   * %m macro) or from Data Transfer.
   */
  encryptionSource?:  | "ENCRYPTION_SCOPE_UNKNOWN" | "AD_SERVING" | "DATA_TRANSFER";
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#encryptionInfo".
   */
  kind?: string;
}

function serializeEncryptionInfo(data: any): EncryptionInfo {
  return {
    ...data,
    encryptionEntityId: data["encryptionEntityId"] !== undefined ? String(data["encryptionEntityId"]) : undefined,
  };
}

function deserializeEncryptionInfo(data: any): EncryptionInfo {
  return {
    ...data,
    encryptionEntityId: data["encryptionEntityId"] !== undefined ? BigInt(data["encryptionEntityId"]) : undefined,
  };
}

/**
 * Represents a DfaReporting event filter.
 */
export interface EventFilter {
  /**
   * The dimension filter contained within this EventFilter.
   */
  dimensionFilter?: PathReportDimensionValue;
  /**
   * The kind of resource this is, in this case dfareporting#eventFilter.
   */
  kind?: string;
  /**
   * Filter on a custom variable.
   */
  uvarFilter?: UvarFilter;
}

function serializeEventFilter(data: any): EventFilter {
  return {
    ...data,
    uvarFilter: data["uvarFilter"] !== undefined ? serializeUvarFilter(data["uvarFilter"]) : undefined,
  };
}

function deserializeEventFilter(data: any): EventFilter {
  return {
    ...data,
    uvarFilter: data["uvarFilter"] !== undefined ? deserializeUvarFilter(data["uvarFilter"]) : undefined,
  };
}

/**
 * Contains properties of an event tag.
 */
export interface EventTag {
  /**
   * Account ID of this event tag. This is a read-only field that can be left
   * blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this event tag. This field or the campaignId field is
   * required on insertion.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Campaign ID of this event tag. This field or the advertiserId field is
   * required on insertion.
   */
  campaignId?: bigint;
  /**
   * Dimension value for the ID of the campaign. This is a read-only,
   * auto-generated field.
   */
  campaignIdDimensionValue?: DimensionValue;
  /**
   * Whether this event tag should be automatically enabled for all of the
   * advertiser's campaigns and ads.
   */
  enabledByDefault?: boolean;
  /**
   * Whether to remove this event tag from ads that are trafficked through
   * Display & Video 360 to Ad Exchange. This may be useful if the event tag
   * uses a pixel that is unapproved for Ad Exchange bids on one or more
   * networks, such as the Google Display Network.
   */
  excludeFromAdxRequests?: boolean;
  /**
   * ID of this event tag. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#eventTag".
   */
  kind?: string;
  /**
   * Name of this event tag. This is a required field and must be less than 256
   * characters long.
   */
  name?: string;
  /**
   * Site filter type for this event tag. If no type is specified then the
   * event tag will be applied to all sites.
   */
  siteFilterType?:  | "ALLOWLIST" | "BLOCKLIST";
  /**
   * Filter list of site IDs associated with this event tag. The siteFilterType
   * determines whether this is a allowlist or blocklist filter.
   */
  siteIds?: bigint[];
  /**
   * Whether this tag is SSL-compliant or not. This is a read-only field.
   */
  sslCompliant?: boolean;
  /**
   * Status of this event tag. Must be ENABLED for this event tag to fire. This
   * is a required field.
   */
  status?:  | "ENABLED" | "DISABLED";
  /**
   * Subaccount ID of this event tag. This is a read-only field that can be
   * left blank.
   */
  subaccountId?: bigint;
  /**
   * Event tag type. Can be used to specify whether to use a third-party pixel,
   * a third-party JavaScript URL, or a third-party click-through URL for either
   * impression or click tracking. This is a required field.
   */
  type?:  | "IMPRESSION_IMAGE_EVENT_TAG" | "IMPRESSION_JAVASCRIPT_EVENT_TAG" | "CLICK_THROUGH_EVENT_TAG";
  /**
   * Payload URL for this event tag. The URL on a click-through event tag
   * should have a landing page URL appended to the end of it. This field is
   * required on insertion.
   */
  url?: string;
  /**
   * Number of times the landing page URL should be URL-escaped before being
   * appended to the click-through event tag URL. Only applies to click-through
   * event tags as specified by the event tag type.
   */
  urlEscapeLevels?: number;
}

function serializeEventTag(data: any): EventTag {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? data["siteIds"].map((item: any) => (String(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeEventTag(data: any): EventTag {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? data["siteIds"].map((item: any) => (BigInt(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Event tag override information.
 */
export interface EventTagOverride {
  /**
   * Whether this override is enabled.
   */
  enabled?: boolean;
  /**
   * ID of this event tag override. This is a read-only, auto-generated field.
   */
  id?: bigint;
}

function serializeEventTagOverride(data: any): EventTagOverride {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeEventTagOverride(data: any): EventTagOverride {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#eventTagsList.
 */
export interface EventTagsListOptions {
  /**
   * Select only event tags that belong to this ad.
   */
  adId?: bigint;
  /**
   * Select only event tags that belong to this advertiser.
   */
  advertiserId?: bigint;
  /**
   * Select only event tags that belong to this campaign.
   */
  campaignId?: bigint;
  /**
   * Examine only the specified campaign or advertiser's event tags for
   * matching selector criteria. When set to false, the parent advertiser and
   * parent campaign of the specified ad or campaign is examined as well. In
   * addition, when set to false, the status field is examined as well, along
   * with the enabledByDefault field. This parameter can not be set to true when
   * adId is specified as ads do not define their own even tags.
   */
  definitionsOnly?: boolean;
  /**
   * Select only enabled event tags. What is considered enabled or disabled
   * depends on the definitionsOnly parameter. When definitionsOnly is set to
   * true, only the specified advertiser or campaign's event tags'
   * enabledByDefault field is examined. When definitionsOnly is set to false,
   * the specified ad or specified campaign's parent advertiser's or parent
   * campaign's event tags' enabledByDefault and status fields are examined as
   * well.
   */
  enabled?: boolean;
  /**
   * Select only event tags with the specified event tag types. Event tag types
   * can be used to specify whether to use a third-party pixel, a third-party
   * JavaScript URL, or a third-party click-through URL for either impression or
   * click tracking.
   */
  eventTagTypes?:  | "IMPRESSION_IMAGE_EVENT_TAG" | "IMPRESSION_JAVASCRIPT_EVENT_TAG" | "CLICK_THROUGH_EVENT_TAG";
  /**
   * Select only event tags with these IDs.
   */
  ids?: bigint;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "eventtag*2015" will return objects with names like "eventtag June
   * 2015", "eventtag April 2015", or simply "eventtag 2015". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "eventtag" will match
   * objects with name "my eventtag", "eventtag 2015", or simply "eventtag".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeEventTagsListOptions(data: any): EventTagsListOptions {
  return {
    ...data,
    adId: data["adId"] !== undefined ? String(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeEventTagsListOptions(data: any): EventTagsListOptions {
  return {
    ...data,
    adId: data["adId"] !== undefined ? BigInt(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Event Tag List Response
 */
export interface EventTagsListResponse {
  /**
   * Event tag collection.
   */
  eventTags?: EventTag[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#eventTagsListResponse".
   */
  kind?: string;
}

function serializeEventTagsListResponse(data: any): EventTagsListResponse {
  return {
    ...data,
    eventTags: data["eventTags"] !== undefined ? data["eventTags"].map((item: any) => (serializeEventTag(item))) : undefined,
  };
}

function deserializeEventTagsListResponse(data: any): EventTagsListResponse {
  return {
    ...data,
    eventTags: data["eventTags"] !== undefined ? data["eventTags"].map((item: any) => (deserializeEventTag(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#eventTagsPatch.
 */
export interface EventTagsPatchOptions {
  /**
   * EventTag ID.
   */
  id: bigint;
}

function serializeEventTagsPatchOptions(data: any): EventTagsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeEventTagsPatchOptions(data: any): EventTagsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents a File resource. A file contains the metadata for a report run.
 * It shows the status of the run and holds the URLs to the generated report
 * data if the run is finished and the status is "REPORT_AVAILABLE".
 */
export interface File {
  /**
   * The date range for which the file has report data. The date range will
   * always be the absolute date range for which the report is run.
   */
  dateRange?: DateRange;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The filename of the file.
   */
  fileName?: string;
  /**
   * The output format of the report. Only available once the file is
   * available.
   */
  format?:  | "CSV" | "EXCEL";
  /**
   * The unique ID of this report file.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#file".
   */
  kind?: string;
  /**
   * The timestamp in milliseconds since epoch when this file was last
   * modified.
   */
  lastModifiedTime?: bigint;
  /**
   * The ID of the report this file was generated from.
   */
  reportId?: bigint;
  /**
   * The status of the report file.
   */
  status?:  | "PROCESSING" | "REPORT_AVAILABLE" | "FAILED" | "CANCELLED" | "QUEUED";
  /**
   * The URLs where the completed report file can be downloaded.
   */
  urls?: {
    apiUrl?: string;
    browserUrl?: string;
  };
}

function serializeFile(data: any): File {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? serializeDateRange(data["dateRange"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? String(data["lastModifiedTime"]) : undefined,
    reportId: data["reportId"] !== undefined ? String(data["reportId"]) : undefined,
  };
}

function deserializeFile(data: any): File {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? deserializeDateRange(data["dateRange"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? BigInt(data["lastModifiedTime"]) : undefined,
    reportId: data["reportId"] !== undefined ? BigInt(data["reportId"]) : undefined,
  };
}

/**
 * List of files for a report.
 */
export interface FileList {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The files returned in this response.
   */
  items?: File[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#fileList".
   */
  kind?: string;
  /**
   * Continuation token used to page through files. To retrieve the next page
   * of results, set the next request's "pageToken" to the value of this field.
   * The page token is only valid for a limited amount of time and should not be
   * persisted.
   */
  nextPageToken?: string;
}

function serializeFileList(data: any): FileList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeFile(item))) : undefined,
  };
}

function deserializeFileList(data: any): FileList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeFile(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#filesList.
 */
export interface FilesListOptions {
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous result page.
   */
  pageToken?: string;
  /**
   * The scope that defines which results are returned.
   */
  scope?:  | "ALL" | "MINE" | "SHARED_WITH_ME";
  /**
   * The field by which to sort the list.
   */
  sortField?:  | "ID" | "LAST_MODIFIED_TIME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Flight
 */
export interface Flight {
  endDate?: Date;
  /**
   * Rate or cost of this flight.
   */
  rateOrCost?: bigint;
  startDate?: Date;
  /**
   * Units of this flight.
   */
  units?: bigint;
}

function serializeFlight(data: any): Flight {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    rateOrCost: data["rateOrCost"] !== undefined ? String(data["rateOrCost"]) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeFlight(data: any): Flight {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    rateOrCost: data["rateOrCost"] !== undefined ? BigInt(data["rateOrCost"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightActivitiesGeneratetag.
 */
export interface FloodlightActivitiesGeneratetagOptions {
  /**
   * Floodlight activity ID for which we want to generate a tag.
   */
  floodlightActivityId?: bigint;
}

function serializeFloodlightActivitiesGeneratetagOptions(data: any): FloodlightActivitiesGeneratetagOptions {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
  };
}

function deserializeFloodlightActivitiesGeneratetagOptions(data: any): FloodlightActivitiesGeneratetagOptions {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
  };
}

/**
 * Floodlight Activity GenerateTag Response
 */
export interface FloodlightActivitiesGenerateTagResponse {
  /**
   * Generated tag for this Floodlight activity. For global site tags, this is
   * the event snippet.
   */
  floodlightActivityTag?: string;
  /**
   * The global snippet section of a global site tag. The global site tag sets
   * new cookies on your domain, which will store a unique identifier for a user
   * or the ad click that brought the user to your site. Learn more.
   */
  globalSiteTagGlobalSnippet?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightActivitiesGenerateTagResponse".
   */
  kind?: string;
}

/**
 * Additional options for dfareporting#floodlightActivitiesList.
 */
export interface FloodlightActivitiesListOptions {
  /**
   * Select only floodlight activities for the specified advertiser ID. Must
   * specify either ids, advertiserId, or floodlightConfigurationId for a
   * non-empty result.
   */
  advertiserId?: bigint;
  /**
   * Select only floodlight activities with the specified floodlight activity
   * group IDs.
   */
  floodlightActivityGroupIds?: bigint;
  /**
   * Select only floodlight activities with the specified floodlight activity
   * group name.
   */
  floodlightActivityGroupName?: string;
  /**
   * Select only floodlight activities with the specified floodlight activity
   * group tag string.
   */
  floodlightActivityGroupTagString?: string;
  /**
   * Select only floodlight activities with the specified floodlight activity
   * group type.
   */
  floodlightActivityGroupType?:  | "COUNTER" | "SALE";
  /**
   * Select only floodlight activities for the specified floodlight
   * configuration ID. Must specify either ids, advertiserId, or
   * floodlightConfigurationId for a non-empty result.
   */
  floodlightConfigurationId?: bigint;
  /**
   * Select only floodlight activities with the specified IDs. Must specify
   * either ids, advertiserId, or floodlightConfigurationId for a non-empty
   * result.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "floodlightactivity*2015" will return objects with names like
   * "floodlightactivity June 2015", "floodlightactivity April 2015", or simply
   * "floodlightactivity 2015". Most of the searches also add wildcards
   * implicitly at the start and the end of the search string. For example, a
   * search string of "floodlightactivity" will match objects with name "my
   * floodlightactivity activity", "floodlightactivity 2015", or simply
   * "floodlightactivity".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only floodlight activities with the specified tag string.
   */
  tagString?: string;
}

function serializeFloodlightActivitiesListOptions(data: any): FloodlightActivitiesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    floodlightActivityGroupIds: data["floodlightActivityGroupIds"] !== undefined ? String(data["floodlightActivityGroupIds"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeFloodlightActivitiesListOptions(data: any): FloodlightActivitiesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    floodlightActivityGroupIds: data["floodlightActivityGroupIds"] !== undefined ? BigInt(data["floodlightActivityGroupIds"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Floodlight Activity List Response
 */
export interface FloodlightActivitiesListResponse {
  /**
   * Floodlight activity collection.
   */
  floodlightActivities?: FloodlightActivity[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightActivitiesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeFloodlightActivitiesListResponse(data: any): FloodlightActivitiesListResponse {
  return {
    ...data,
    floodlightActivities: data["floodlightActivities"] !== undefined ? data["floodlightActivities"].map((item: any) => (serializeFloodlightActivity(item))) : undefined,
  };
}

function deserializeFloodlightActivitiesListResponse(data: any): FloodlightActivitiesListResponse {
  return {
    ...data,
    floodlightActivities: data["floodlightActivities"] !== undefined ? data["floodlightActivities"].map((item: any) => (deserializeFloodlightActivity(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightActivitiesPatch.
 */
export interface FloodlightActivitiesPatchOptions {
  /**
   * FloodlightActivity ID.
   */
  id: bigint;
}

function serializeFloodlightActivitiesPatchOptions(data: any): FloodlightActivitiesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeFloodlightActivitiesPatchOptions(data: any): FloodlightActivitiesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Contains properties of a Floodlight activity.
 */
export interface FloodlightActivity {
  /**
   * Account ID of this floodlight activity. This is a read-only field that can
   * be left blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this floodlight activity. If this field is left blank,
   * the value will be copied over either from the activity group's advertiser
   * or the existing activity's advertiser.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Whether the activity is enabled for attribution.
   */
  attributionEnabled?: boolean;
  /**
   * Code type used for cache busting in the generated tag. Applicable only
   * when floodlightActivityGroupType is COUNTER and countingMethod is
   * STANDARD_COUNTING or UNIQUE_COUNTING.
   */
  cacheBustingType?:  | "JAVASCRIPT" | "ACTIVE_SERVER_PAGE" | "JSP" | "PHP" | "COLD_FUSION";
  /**
   * Counting method for conversions for this floodlight activity. This is a
   * required field.
   */
  countingMethod?:  | "STANDARD_COUNTING" | "UNIQUE_COUNTING" | "SESSION_COUNTING" | "TRANSACTIONS_COUNTING" | "ITEMS_SOLD_COUNTING";
  /**
   * Dynamic floodlight tags.
   */
  defaultTags?: FloodlightActivityDynamicTag[];
  /**
   * URL where this tag will be deployed. If specified, must be less than 256
   * characters long.
   */
  expectedUrl?: string;
  /**
   * Floodlight activity group ID of this floodlight activity. This is a
   * required field.
   */
  floodlightActivityGroupId?: bigint;
  /**
   * Name of the associated floodlight activity group. This is a read-only
   * field.
   */
  floodlightActivityGroupName?: string;
  /**
   * Tag string of the associated floodlight activity group. This is a
   * read-only field.
   */
  floodlightActivityGroupTagString?: string;
  /**
   * Type of the associated floodlight activity group. This is a read-only
   * field.
   */
  floodlightActivityGroupType?:  | "COUNTER" | "SALE";
  /**
   * Floodlight configuration ID of this floodlight activity. If this field is
   * left blank, the value will be copied over either from the activity group's
   * floodlight configuration or from the existing activity's floodlight
   * configuration.
   */
  floodlightConfigurationId?: bigint;
  /**
   * Dimension value for the ID of the floodlight configuration. This is a
   * read-only, auto-generated field.
   */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /**
   * The type of Floodlight tag this activity will generate. This is a required
   * field.
   */
  floodlightTagType?:  | "IFRAME" | "IMAGE" | "GLOBAL_SITE_TAG";
  /**
   * ID of this floodlight activity. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this floodlight activity. This is a
   * read-only, auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightActivity".
   */
  kind?: string;
  /**
   * Name of this floodlight activity. This is a required field. Must be less
   * than 129 characters long and cannot contain quotes.
   */
  name?: string;
  /**
   * General notes or implementation instructions for the tag.
   */
  notes?: string;
  /**
   * Publisher dynamic floodlight tags.
   */
  publisherTags?: FloodlightActivityPublisherDynamicTag[];
  /**
   * Whether this tag should use SSL.
   */
  secure?: boolean;
  /**
   * Whether the floodlight activity is SSL-compliant. This is a read-only
   * field, its value detected by the system from the floodlight tags.
   */
  sslCompliant?: boolean;
  /**
   * Whether this floodlight activity must be SSL-compliant.
   */
  sslRequired?: boolean;
  /**
   * The status of the activity. This can only be set to ACTIVE or
   * ARCHIVED_AND_DISABLED. The ARCHIVED status is no longer supported and
   * cannot be set for Floodlight activities. The DISABLED_POLICY status
   * indicates that a Floodlight activity is violating Google policy. Contact
   * your account manager for more information.
   */
  status?:  | "ACTIVE" | "ARCHIVED_AND_DISABLED" | "ARCHIVED" | "DISABLED_POLICY";
  /**
   * Subaccount ID of this floodlight activity. This is a read-only field that
   * can be left blank.
   */
  subaccountId?: bigint;
  /**
   * Tag format type for the floodlight activity. If left blank, the tag format
   * will default to HTML.
   */
  tagFormat?:  | "HTML" | "XHTML";
  /**
   * Value of the cat= parameter in the floodlight tag, which the ad servers
   * use to identify the activity. This is optional: if empty, a new tag string
   * will be generated for you. This string must be 1 to 8 characters long, with
   * valid characters being a-z0-9[ _ ]. This tag string must also be unique
   * among activities of the same activity group. This field is read-only after
   * insertion.
   */
  tagString?: string;
  /**
   * List of the user-defined variables used by this conversion tag. These map
   * to the "u[1-100]=" in the tags. Each of these can have a user defined type.
   * Acceptable values are U1 to U100, inclusive.
   */
  userDefinedVariableTypes?:  | "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100"[];
}

function serializeFloodlightActivity(data: any): FloodlightActivity {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    defaultTags: data["defaultTags"] !== undefined ? data["defaultTags"].map((item: any) => (serializeFloodlightActivityDynamicTag(item))) : undefined,
    floodlightActivityGroupId: data["floodlightActivityGroupId"] !== undefined ? String(data["floodlightActivityGroupId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    publisherTags: data["publisherTags"] !== undefined ? data["publisherTags"].map((item: any) => (serializeFloodlightActivityPublisherDynamicTag(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeFloodlightActivity(data: any): FloodlightActivity {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    defaultTags: data["defaultTags"] !== undefined ? data["defaultTags"].map((item: any) => (deserializeFloodlightActivityDynamicTag(item))) : undefined,
    floodlightActivityGroupId: data["floodlightActivityGroupId"] !== undefined ? BigInt(data["floodlightActivityGroupId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    publisherTags: data["publisherTags"] !== undefined ? data["publisherTags"].map((item: any) => (deserializeFloodlightActivityPublisherDynamicTag(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Dynamic Tag
 */
export interface FloodlightActivityDynamicTag {
  /**
   * ID of this dynamic tag. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Name of this tag.
   */
  name?: string;
  /**
   * Tag code.
   */
  tag?: string;
}

function serializeFloodlightActivityDynamicTag(data: any): FloodlightActivityDynamicTag {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeFloodlightActivityDynamicTag(data: any): FloodlightActivityDynamicTag {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Contains properties of a Floodlight activity group.
 */
export interface FloodlightActivityGroup {
  /**
   * Account ID of this floodlight activity group. This is a read-only field
   * that can be left blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this floodlight activity group. If this field is left
   * blank, the value will be copied over either from the floodlight
   * configuration's advertiser or from the existing activity group's
   * advertiser.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Floodlight configuration ID of this floodlight activity group. This is a
   * required field.
   */
  floodlightConfigurationId?: bigint;
  /**
   * Dimension value for the ID of the floodlight configuration. This is a
   * read-only, auto-generated field.
   */
  floodlightConfigurationIdDimensionValue?: DimensionValue;
  /**
   * ID of this floodlight activity group. This is a read-only, auto-generated
   * field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this floodlight activity group. This is a
   * read-only, auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightActivityGroup".
   */
  kind?: string;
  /**
   * Name of this floodlight activity group. This is a required field. Must be
   * less than 65 characters long and cannot contain quotes.
   */
  name?: string;
  /**
   * Subaccount ID of this floodlight activity group. This is a read-only field
   * that can be left blank.
   */
  subaccountId?: bigint;
  /**
   * Value of the type= parameter in the floodlight tag, which the ad servers
   * use to identify the activity group that the activity belongs to. This is
   * optional: if empty, a new tag string will be generated for you. This string
   * must be 1 to 8 characters long, with valid characters being a-z0-9[ _ ].
   * This tag string must also be unique among activity groups of the same
   * floodlight configuration. This field is read-only after insertion.
   */
  tagString?: string;
  /**
   * Type of the floodlight activity group. This is a required field that is
   * read-only after insertion.
   */
  type?:  | "COUNTER" | "SALE";
}

function serializeFloodlightActivityGroup(data: any): FloodlightActivityGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeFloodlightActivityGroup(data: any): FloodlightActivityGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightActivityGroupsList.
 */
export interface FloodlightActivityGroupsListOptions {
  /**
   * Select only floodlight activity groups with the specified advertiser ID.
   * Must specify either advertiserId or floodlightConfigurationId for a
   * non-empty result.
   */
  advertiserId?: bigint;
  /**
   * Select only floodlight activity groups with the specified floodlight
   * configuration ID. Must specify either advertiserId, or
   * floodlightConfigurationId for a non-empty result.
   */
  floodlightConfigurationId?: bigint;
  /**
   * Select only floodlight activity groups with the specified IDs. Must
   * specify either advertiserId or floodlightConfigurationId for a non-empty
   * result.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "floodlightactivitygroup*2015" will return objects with names like
   * "floodlightactivitygroup June 2015", "floodlightactivitygroup April 2015",
   * or simply "floodlightactivitygroup 2015". Most of the searches also add
   * wildcards implicitly at the start and the end of the search string. For
   * example, a search string of "floodlightactivitygroup" will match objects
   * with name "my floodlightactivitygroup activity", "floodlightactivitygroup
   * 2015", or simply "floodlightactivitygroup".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only floodlight activity groups with the specified floodlight
   * activity group type.
   */
  type?:  | "COUNTER" | "SALE";
}

function serializeFloodlightActivityGroupsListOptions(data: any): FloodlightActivityGroupsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? String(data["floodlightConfigurationId"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeFloodlightActivityGroupsListOptions(data: any): FloodlightActivityGroupsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    floodlightConfigurationId: data["floodlightConfigurationId"] !== undefined ? BigInt(data["floodlightConfigurationId"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Floodlight Activity Group List Response
 */
export interface FloodlightActivityGroupsListResponse {
  /**
   * Floodlight activity group collection.
   */
  floodlightActivityGroups?: FloodlightActivityGroup[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightActivityGroupsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeFloodlightActivityGroupsListResponse(data: any): FloodlightActivityGroupsListResponse {
  return {
    ...data,
    floodlightActivityGroups: data["floodlightActivityGroups"] !== undefined ? data["floodlightActivityGroups"].map((item: any) => (serializeFloodlightActivityGroup(item))) : undefined,
  };
}

function deserializeFloodlightActivityGroupsListResponse(data: any): FloodlightActivityGroupsListResponse {
  return {
    ...data,
    floodlightActivityGroups: data["floodlightActivityGroups"] !== undefined ? data["floodlightActivityGroups"].map((item: any) => (deserializeFloodlightActivityGroup(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightActivityGroupsPatch.
 */
export interface FloodlightActivityGroupsPatchOptions {
  /**
   * FloodlightActivityGroup ID.
   */
  id: bigint;
}

function serializeFloodlightActivityGroupsPatchOptions(data: any): FloodlightActivityGroupsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeFloodlightActivityGroupsPatchOptions(data: any): FloodlightActivityGroupsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Publisher Dynamic Tag
 */
export interface FloodlightActivityPublisherDynamicTag {
  /**
   * Whether this tag is applicable only for click-throughs.
   */
  clickThrough?: boolean;
  /**
   * Directory site ID of this dynamic tag. This is a write-only field that can
   * be used as an alternative to the siteId field. When this resource is
   * retrieved, only the siteId field will be populated.
   */
  directorySiteId?: bigint;
  /**
   * Dynamic floodlight tag.
   */
  dynamicTag?: FloodlightActivityDynamicTag;
  /**
   * Site ID of this dynamic tag.
   */
  siteId?: bigint;
  /**
   * Dimension value for the ID of the site. This is a read-only,
   * auto-generated field.
   */
  siteIdDimensionValue?: DimensionValue;
  /**
   * Whether this tag is applicable only for view-throughs.
   */
  viewThrough?: boolean;
}

function serializeFloodlightActivityPublisherDynamicTag(data: any): FloodlightActivityPublisherDynamicTag {
  return {
    ...data,
    directorySiteId: data["directorySiteId"] !== undefined ? String(data["directorySiteId"]) : undefined,
    dynamicTag: data["dynamicTag"] !== undefined ? serializeFloodlightActivityDynamicTag(data["dynamicTag"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
  };
}

function deserializeFloodlightActivityPublisherDynamicTag(data: any): FloodlightActivityPublisherDynamicTag {
  return {
    ...data,
    directorySiteId: data["directorySiteId"] !== undefined ? BigInt(data["directorySiteId"]) : undefined,
    dynamicTag: data["dynamicTag"] !== undefined ? deserializeFloodlightActivityDynamicTag(data["dynamicTag"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
  };
}

/**
 * Contains properties of a Floodlight configuration.
 */
export interface FloodlightConfiguration {
  /**
   * Account ID of this floodlight configuration. This is a read-only field
   * that can be left blank.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of the parent advertiser of this floodlight configuration.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Whether advertiser data is shared with Google Analytics.
   */
  analyticsDataSharingEnabled?: boolean;
  /**
   * Custom Viewability metric for the floodlight configuration.
   */
  customViewabilityMetric?: CustomViewabilityMetric;
  /**
   * Whether the exposure-to-conversion report is enabled. This report shows
   * detailed pathway information on up to 10 of the most recent ad exposures
   * seen by a user before converting.
   */
  exposureToConversionEnabled?: boolean;
  /**
   * Day that will be counted as the first day of the week in reports. This is
   * a required field.
   */
  firstDayOfWeek?:  | "MONDAY" | "SUNDAY";
  /**
   * ID of this floodlight configuration. This is a read-only, auto-generated
   * field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this floodlight configuration. This is a
   * read-only, auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Whether in-app attribution tracking is enabled.
   */
  inAppAttributionTrackingEnabled?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightConfiguration".
   */
  kind?: string;
  /**
   * Lookback window settings for this floodlight configuration.
   */
  lookbackConfiguration?: LookbackConfiguration;
  /**
   * Types of attribution options for natural search conversions.
   */
  naturalSearchConversionAttributionOption?:  | "EXCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION" | "INCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION" | "INCLUDE_NATURAL_SEARCH_TIERED_CONVERSION_ATTRIBUTION";
  /**
   * Settings for Campaign Manager Omniture integration.
   */
  omnitureSettings?: OmnitureSettings;
  /**
   * Subaccount ID of this floodlight configuration. This is a read-only field
   * that can be left blank.
   */
  subaccountId?: bigint;
  /**
   * Configuration settings for dynamic and image floodlight tags.
   */
  tagSettings?: TagSettings;
  /**
   * List of third-party authentication tokens enabled for this configuration.
   */
  thirdPartyAuthenticationTokens?: ThirdPartyAuthenticationToken[];
  /**
   * List of user defined variables enabled for this configuration.
   */
  userDefinedVariableConfigurations?: UserDefinedVariableConfiguration[];
}

function serializeFloodlightConfiguration(data: any): FloodlightConfiguration {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    customViewabilityMetric: data["customViewabilityMetric"] !== undefined ? serializeCustomViewabilityMetric(data["customViewabilityMetric"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeFloodlightConfiguration(data: any): FloodlightConfiguration {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    customViewabilityMetric: data["customViewabilityMetric"] !== undefined ? deserializeCustomViewabilityMetric(data["customViewabilityMetric"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightConfigurationsList.
 */
export interface FloodlightConfigurationsListOptions {
  /**
   * Set of IDs of floodlight configurations to retrieve. Required field;
   * otherwise an empty list will be returned.
   */
  ids?: bigint;
}

function serializeFloodlightConfigurationsListOptions(data: any): FloodlightConfigurationsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeFloodlightConfigurationsListOptions(data: any): FloodlightConfigurationsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Floodlight Configuration List Response
 */
export interface FloodlightConfigurationsListResponse {
  /**
   * Floodlight configuration collection.
   */
  floodlightConfigurations?: FloodlightConfiguration[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#floodlightConfigurationsListResponse".
   */
  kind?: string;
}

function serializeFloodlightConfigurationsListResponse(data: any): FloodlightConfigurationsListResponse {
  return {
    ...data,
    floodlightConfigurations: data["floodlightConfigurations"] !== undefined ? data["floodlightConfigurations"].map((item: any) => (serializeFloodlightConfiguration(item))) : undefined,
  };
}

function deserializeFloodlightConfigurationsListResponse(data: any): FloodlightConfigurationsListResponse {
  return {
    ...data,
    floodlightConfigurations: data["floodlightConfigurations"] !== undefined ? data["floodlightConfigurations"].map((item: any) => (deserializeFloodlightConfiguration(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#floodlightConfigurationsPatch.
 */
export interface FloodlightConfigurationsPatchOptions {
  /**
   * FloodlightConfiguration ID.
   */
  id: bigint;
}

function serializeFloodlightConfigurationsPatchOptions(data: any): FloodlightConfigurationsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeFloodlightConfigurationsPatchOptions(data: any): FloodlightConfigurationsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "FlOODLIGHT".
 */
export interface FloodlightReportCompatibleFields {
  /**
   * Dimensions which are compatible to be selected in the "dimensionFilters"
   * section of the report.
   */
  dimensionFilters?: Dimension[];
  /**
   * Dimensions which are compatible to be selected in the "dimensions" section
   * of the report.
   */
  dimensions?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#floodlightReportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
}

/**
 * Frequency Cap.
 */
export interface FrequencyCap {
  /**
   * Duration of time, in seconds, for this frequency cap. The maximum duration
   * is 90 days. Acceptable values are 1 to 7776000, inclusive.
   */
  duration?: bigint;
  /**
   * Number of times an individual user can be served the ad within the
   * specified duration. Acceptable values are 1 to 15, inclusive.
   */
  impressions?: bigint;
}

function serializeFrequencyCap(data: any): FrequencyCap {
  return {
    ...data,
    duration: data["duration"] !== undefined ? String(data["duration"]) : undefined,
    impressions: data["impressions"] !== undefined ? String(data["impressions"]) : undefined,
  };
}

function deserializeFrequencyCap(data: any): FrequencyCap {
  return {
    ...data,
    duration: data["duration"] !== undefined ? BigInt(data["duration"]) : undefined,
    impressions: data["impressions"] !== undefined ? BigInt(data["impressions"]) : undefined,
  };
}

/**
 * FsCommand.
 */
export interface FsCommand {
  /**
   * Distance from the left of the browser.Applicable when positionOption is
   * DISTANCE_FROM_TOP_LEFT_CORNER.
   */
  left?: number;
  /**
   * Position in the browser where the window will open.
   */
  positionOption?:  | "CENTERED" | "DISTANCE_FROM_TOP_LEFT_CORNER";
  /**
   * Distance from the top of the browser. Applicable when positionOption is
   * DISTANCE_FROM_TOP_LEFT_CORNER.
   */
  top?: number;
  /**
   * Height of the window.
   */
  windowHeight?: number;
  /**
   * Width of the window.
   */
  windowWidth?: number;
}

/**
 * Geographical Targeting.
 */
export interface GeoTargeting {
  /**
   * Cities to be targeted. For each city only dartId is required. The other
   * fields are populated automatically when the ad is inserted or updated. If
   * targeting a city, do not target or exclude the country of the city, and do
   * not target the metro or region of the city.
   */
  cities?: City[];
  /**
   * Countries to be targeted or excluded from targeting, depending on the
   * setting of the excludeCountries field. For each country only dartId is
   * required. The other fields are populated automatically when the ad is
   * inserted or updated. If targeting or excluding a country, do not target
   * regions, cities, metros, or postal codes in the same country.
   */
  countries?: Country[];
  /**
   * Whether or not to exclude the countries in the countries field from
   * targeting. If false, the countries field refers to countries which will be
   * targeted by the ad.
   */
  excludeCountries?: boolean;
  /**
   * Metros to be targeted. For each metro only dmaId is required. The other
   * fields are populated automatically when the ad is inserted or updated. If
   * targeting a metro, do not target or exclude the country of the metro.
   */
  metros?: Metro[];
  /**
   * Postal codes to be targeted. For each postal code only id is required. The
   * other fields are populated automatically when the ad is inserted or
   * updated. If targeting a postal code, do not target or exclude the country
   * of the postal code.
   */
  postalCodes?: PostalCode[];
  /**
   * Regions to be targeted. For each region only dartId is required. The other
   * fields are populated automatically when the ad is inserted or updated. If
   * targeting a region, do not target or exclude the country of the region.
   */
  regions?: Region[];
}

function serializeGeoTargeting(data: any): GeoTargeting {
  return {
    ...data,
    cities: data["cities"] !== undefined ? data["cities"].map((item: any) => (serializeCity(item))) : undefined,
    countries: data["countries"] !== undefined ? data["countries"].map((item: any) => (serializeCountry(item))) : undefined,
    metros: data["metros"] !== undefined ? data["metros"].map((item: any) => (serializeMetro(item))) : undefined,
    postalCodes: data["postalCodes"] !== undefined ? data["postalCodes"].map((item: any) => (serializePostalCode(item))) : undefined,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (serializeRegion(item))) : undefined,
  };
}

function deserializeGeoTargeting(data: any): GeoTargeting {
  return {
    ...data,
    cities: data["cities"] !== undefined ? data["cities"].map((item: any) => (deserializeCity(item))) : undefined,
    countries: data["countries"] !== undefined ? data["countries"].map((item: any) => (deserializeCountry(item))) : undefined,
    metros: data["metros"] !== undefined ? data["metros"].map((item: any) => (deserializeMetro(item))) : undefined,
    postalCodes: data["postalCodes"] !== undefined ? data["postalCodes"].map((item: any) => (deserializePostalCode(item))) : undefined,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (deserializeRegion(item))) : undefined,
  };
}

/**
 * Represents a buy from the Planning inventory store.
 */
export interface InventoryItem {
  /**
   * Account ID of this inventory item.
   */
  accountId?: bigint;
  /**
   * Ad slots of this inventory item. If this inventory item represents a
   * standalone placement, there will be exactly one ad slot. If this inventory
   * item represents a placement group, there will be more than one ad slot,
   * each representing one child placement in that placement group.
   */
  adSlots?: AdSlot[];
  /**
   * Advertiser ID of this inventory item.
   */
  advertiserId?: bigint;
  /**
   * Content category ID of this inventory item.
   */
  contentCategoryId?: bigint;
  /**
   * Estimated click-through rate of this inventory item.
   */
  estimatedClickThroughRate?: bigint;
  /**
   * Estimated conversion rate of this inventory item.
   */
  estimatedConversionRate?: bigint;
  /**
   * ID of this inventory item.
   */
  id?: bigint;
  /**
   * Whether this inventory item is in plan.
   */
  inPlan?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#inventoryItem".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this inventory item.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Name of this inventory item. For standalone inventory items, this is the
   * same name as that of its only ad slot. For group inventory items, this can
   * differ from the name of any of its ad slots.
   */
  name?: string;
  /**
   * Negotiation channel ID of this inventory item.
   */
  negotiationChannelId?: bigint;
  /**
   * Order ID of this inventory item.
   */
  orderId?: bigint;
  /**
   * Placement strategy ID of this inventory item.
   */
  placementStrategyId?: bigint;
  /**
   * Pricing of this inventory item.
   */
  pricing?: Pricing;
  /**
   * Project ID of this inventory item.
   */
  projectId?: bigint;
  /**
   * RFP ID of this inventory item.
   */
  rfpId?: bigint;
  /**
   * ID of the site this inventory item is associated with.
   */
  siteId?: bigint;
  /**
   * Subaccount ID of this inventory item.
   */
  subaccountId?: bigint;
  /**
   * Type of inventory item.
   */
  type?:  | "PLANNING_PLACEMENT_TYPE_REGULAR" | "PLANNING_PLACEMENT_TYPE_CREDIT";
}

function serializeInventoryItem(data: any): InventoryItem {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    adSlots: data["adSlots"] !== undefined ? data["adSlots"].map((item: any) => (serializeAdSlot(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? String(data["contentCategoryId"]) : undefined,
    estimatedClickThroughRate: data["estimatedClickThroughRate"] !== undefined ? String(data["estimatedClickThroughRate"]) : undefined,
    estimatedConversionRate: data["estimatedConversionRate"] !== undefined ? String(data["estimatedConversionRate"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    negotiationChannelId: data["negotiationChannelId"] !== undefined ? String(data["negotiationChannelId"]) : undefined,
    orderId: data["orderId"] !== undefined ? String(data["orderId"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? String(data["placementStrategyId"]) : undefined,
    pricing: data["pricing"] !== undefined ? serializePricing(data["pricing"]) : undefined,
    projectId: data["projectId"] !== undefined ? String(data["projectId"]) : undefined,
    rfpId: data["rfpId"] !== undefined ? String(data["rfpId"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeInventoryItem(data: any): InventoryItem {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    adSlots: data["adSlots"] !== undefined ? data["adSlots"].map((item: any) => (deserializeAdSlot(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? BigInt(data["contentCategoryId"]) : undefined,
    estimatedClickThroughRate: data["estimatedClickThroughRate"] !== undefined ? BigInt(data["estimatedClickThroughRate"]) : undefined,
    estimatedConversionRate: data["estimatedConversionRate"] !== undefined ? BigInt(data["estimatedConversionRate"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    negotiationChannelId: data["negotiationChannelId"] !== undefined ? BigInt(data["negotiationChannelId"]) : undefined,
    orderId: data["orderId"] !== undefined ? BigInt(data["orderId"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? BigInt(data["placementStrategyId"]) : undefined,
    pricing: data["pricing"] !== undefined ? deserializePricing(data["pricing"]) : undefined,
    projectId: data["projectId"] !== undefined ? BigInt(data["projectId"]) : undefined,
    rfpId: data["rfpId"] !== undefined ? BigInt(data["rfpId"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#inventoryItemsList.
 */
export interface InventoryItemsListOptions {
  /**
   * Select only inventory items with these IDs.
   */
  ids?: bigint;
  /**
   * Select only inventory items that are in plan.
   */
  inPlan?: boolean;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only inventory items that belong to specified orders.
   */
  orderId?: bigint;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only inventory items that are associated with these sites.
   */
  siteId?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only inventory items with this type.
   */
  type?:  | "PLANNING_PLACEMENT_TYPE_REGULAR" | "PLANNING_PLACEMENT_TYPE_CREDIT";
}

function serializeInventoryItemsListOptions(data: any): InventoryItemsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    orderId: data["orderId"] !== undefined ? String(data["orderId"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
  };
}

function deserializeInventoryItemsListOptions(data: any): InventoryItemsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    orderId: data["orderId"] !== undefined ? BigInt(data["orderId"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
  };
}

/**
 * Inventory item List Response
 */
export interface InventoryItemsListResponse {
  /**
   * Inventory item collection
   */
  inventoryItems?: InventoryItem[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#inventoryItemsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

function serializeInventoryItemsListResponse(data: any): InventoryItemsListResponse {
  return {
    ...data,
    inventoryItems: data["inventoryItems"] !== undefined ? data["inventoryItems"].map((item: any) => (serializeInventoryItem(item))) : undefined,
  };
}

function deserializeInventoryItemsListResponse(data: any): InventoryItemsListResponse {
  return {
    ...data,
    inventoryItems: data["inventoryItems"] !== undefined ? data["inventoryItems"].map((item: any) => (deserializeInventoryItem(item))) : undefined,
  };
}

/**
 * Contains information about a single invoice
 */
export interface Invoice {
  /**
   * The list of summarized campaign information associated with this invoice.
   */
  campaign_summaries?: CampaignSummary[];
  /**
   * The originally issued invoice that is being adjusted by this invoice, if
   * applicable. May appear on invoice PDF as *Reference invoice number*.
   */
  correctedInvoiceId?: string;
  /**
   * Invoice currency code in ISO 4217 format.
   */
  currencyCode?: string;
  /**
   * The invoice due date.
   */
  dueDate?: string;
  /**
   * ID of this invoice.
   */
  id?: string;
  /**
   * The type of invoice document.
   */
  invoiceType?:  | "INVOICE_TYPE_UNSPECIFIED" | "INVOICE_TYPE_CREDIT" | "INVOICE_TYPE_INVOICE";
  /**
   * The date when the invoice was issued.
   */
  issueDate?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#invoice".
   */
  kind?: string;
  /**
   * The ID of the payments account the invoice belongs to. Appears on the
   * invoice PDF as *Billing Account Number*.
   */
  paymentsAccountId?: string;
  /**
   * The ID of the payments profile the invoice belongs to. Appears on the
   * invoice PDF as *Billing ID*.
   */
  paymentsProfileId?: string;
  /**
   * The URL to download a PDF copy of the invoice. Note that this URL is user
   * specific and requires a valid OAuth 2.0 access token to access. The access
   * token must be provided in an *Authorization: Bearer* HTTP header. The URL
   * will only be usable for 7 days from when the api is called.
   */
  pdfUrl?: string;
  /**
   * Purchase order number associated with the invoice.
   */
  purchaseOrderNumber?: string;
  /**
   * The originally issued invoice(s) that is being cancelled by this invoice,
   * if applicable. May appear on invoice PDF as *Replaced invoice numbers*.
   * Note: There may be multiple replaced invoices due to consolidation of
   * multiple invoices into a single invoice.
   */
  replacedInvoiceIds?: string[];
  /**
   * The invoice service end date.
   */
  serviceEndDate?: string;
  /**
   * The invoice service start date.
   */
  serviceStartDate?: string;
  /**
   * The pre-tax subtotal amount, in micros of the invoice's currency.
   */
  subtotalAmountMicros?: bigint;
  /**
   * The invoice total amount, in micros of the invoice's currency.
   */
  totalAmountMicros?: bigint;
  /**
   * The sum of all taxes in invoice, in micros of the invoice's currency.
   */
  totalTaxAmountMicros?: bigint;
}

function serializeInvoice(data: any): Invoice {
  return {
    ...data,
    campaign_summaries: data["campaign_summaries"] !== undefined ? data["campaign_summaries"].map((item: any) => (serializeCampaignSummary(item))) : undefined,
    subtotalAmountMicros: data["subtotalAmountMicros"] !== undefined ? String(data["subtotalAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? String(data["totalAmountMicros"]) : undefined,
    totalTaxAmountMicros: data["totalTaxAmountMicros"] !== undefined ? String(data["totalTaxAmountMicros"]) : undefined,
  };
}

function deserializeInvoice(data: any): Invoice {
  return {
    ...data,
    campaign_summaries: data["campaign_summaries"] !== undefined ? data["campaign_summaries"].map((item: any) => (deserializeCampaignSummary(item))) : undefined,
    subtotalAmountMicros: data["subtotalAmountMicros"] !== undefined ? BigInt(data["subtotalAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? BigInt(data["totalAmountMicros"]) : undefined,
    totalTaxAmountMicros: data["totalTaxAmountMicros"] !== undefined ? BigInt(data["totalTaxAmountMicros"]) : undefined,
  };
}

/**
 * Key Value Targeting Expression.
 */
export interface KeyValueTargetingExpression {
  /**
   * Keyword expression being targeted by the ad.
   */
  expression?: string;
}

/**
 * Contains information about where a user's browser is taken after the user
 * clicks an ad.
 */
export interface LandingPage {
  /**
   * Advertiser ID of this landing page. This is a required field.
   */
  advertiserId?: bigint;
  /**
   * Whether this landing page has been archived.
   */
  archived?: boolean;
  /**
   * Links that will direct the user to a mobile app, if installed.
   */
  deepLinks?: DeepLink[];
  /**
   * ID of this landing page. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#landingPage".
   */
  kind?: string;
  /**
   * Name of this landing page. This is a required field. It must be less than
   * 256 characters long.
   */
  name?: string;
  /**
   * URL of this landing page. This is a required field.
   */
  url?: string;
}

function serializeLandingPage(data: any): LandingPage {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    deepLinks: data["deepLinks"] !== undefined ? data["deepLinks"].map((item: any) => (serializeDeepLink(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeLandingPage(data: any): LandingPage {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    deepLinks: data["deepLinks"] !== undefined ? data["deepLinks"].map((item: any) => (deserializeDeepLink(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Contains information about a language that can be targeted by ads.
 */
export interface Language {
  /**
   * Language ID of this language. This is the ID used for targeting and
   * generating reports.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#language".
   */
  kind?: string;
  /**
   * Format of language code is an ISO 639 two-letter language code optionally
   * followed by an underscore followed by an ISO 3166 code. Examples are "en"
   * for English or "zh_CN" for Simplified Chinese.
   */
  languageCode?: string;
  /**
   * Name of this language.
   */
  name?: string;
}

function serializeLanguage(data: any): Language {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeLanguage(data: any): Language {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Language List Response
 */
export interface LanguagesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#languagesListResponse".
   */
  kind?: string;
  /**
   * Language collection.
   */
  languages?: Language[];
}

function serializeLanguagesListResponse(data: any): LanguagesListResponse {
  return {
    ...data,
    languages: data["languages"] !== undefined ? data["languages"].map((item: any) => (serializeLanguage(item))) : undefined,
  };
}

function deserializeLanguagesListResponse(data: any): LanguagesListResponse {
  return {
    ...data,
    languages: data["languages"] !== undefined ? data["languages"].map((item: any) => (deserializeLanguage(item))) : undefined,
  };
}

/**
 * Language Targeting.
 */
export interface LanguageTargeting {
  /**
   * Languages that this ad targets. For each language only languageId is
   * required. The other fields are populated automatically when the ad is
   * inserted or updated.
   */
  languages?: Language[];
}

function serializeLanguageTargeting(data: any): LanguageTargeting {
  return {
    ...data,
    languages: data["languages"] !== undefined ? data["languages"].map((item: any) => (serializeLanguage(item))) : undefined,
  };
}

function deserializeLanguageTargeting(data: any): LanguageTargeting {
  return {
    ...data,
    languages: data["languages"] !== undefined ? data["languages"].map((item: any) => (deserializeLanguage(item))) : undefined,
  };
}

/**
 * Modification timestamp.
 */
export interface LastModifiedInfo {
  /**
   * Timestamp of the last change in milliseconds since epoch.
   */
  time?: bigint;
}

function serializeLastModifiedInfo(data: any): LastModifiedInfo {
  return {
    ...data,
    time: data["time"] !== undefined ? String(data["time"]) : undefined,
  };
}

function deserializeLastModifiedInfo(data: any): LastModifiedInfo {
  return {
    ...data,
    time: data["time"] !== undefined ? BigInt(data["time"]) : undefined,
  };
}

/**
 * A group clause made up of list population terms representing constraints
 * joined by ORs.
 */
export interface ListPopulationClause {
  /**
   * Terms of this list population clause. Each clause is made up of list
   * population terms representing constraints and are joined by ORs.
   */
  terms?: ListPopulationTerm[];
}

function serializeListPopulationClause(data: any): ListPopulationClause {
  return {
    ...data,
    terms: data["terms"] !== undefined ? data["terms"].map((item: any) => (serializeListPopulationTerm(item))) : undefined,
  };
}

function deserializeListPopulationClause(data: any): ListPopulationClause {
  return {
    ...data,
    terms: data["terms"] !== undefined ? data["terms"].map((item: any) => (deserializeListPopulationTerm(item))) : undefined,
  };
}

/**
 * Remarketing List Population Rule.
 */
export interface ListPopulationRule {
  /**
   * Floodlight activity ID associated with this rule. This field can be left
   * blank.
   */
  floodlightActivityId?: bigint;
  /**
   * Name of floodlight activity associated with this rule. This is a
   * read-only, auto-generated field.
   */
  floodlightActivityName?: string;
  /**
   * Clauses that make up this list population rule. Clauses are joined by
   * ANDs, and the clauses themselves are made up of list population terms which
   * are joined by ORs.
   */
  listPopulationClauses?: ListPopulationClause[];
}

function serializeListPopulationRule(data: any): ListPopulationRule {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
    listPopulationClauses: data["listPopulationClauses"] !== undefined ? data["listPopulationClauses"].map((item: any) => (serializeListPopulationClause(item))) : undefined,
  };
}

function deserializeListPopulationRule(data: any): ListPopulationRule {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
    listPopulationClauses: data["listPopulationClauses"] !== undefined ? data["listPopulationClauses"].map((item: any) => (deserializeListPopulationClause(item))) : undefined,
  };
}

/**
 * Remarketing List Population Rule Term.
 */
export interface ListPopulationTerm {
  /**
   * Will be true if the term should check if the user is in the list and false
   * if the term should check if the user is not in the list. This field is only
   * relevant when type is set to LIST_MEMBERSHIP_TERM. False by default.
   */
  contains?: boolean;
  /**
   * Whether to negate the comparison result of this term during rule
   * evaluation. This field is only relevant when type is left unset or set to
   * CUSTOM_VARIABLE_TERM or REFERRER_TERM.
   */
  negation?: boolean;
  /**
   * Comparison operator of this term. This field is only relevant when type is
   * left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.
   */
  operator?:  | "NUM_EQUALS" | "NUM_LESS_THAN" | "NUM_LESS_THAN_EQUAL" | "NUM_GREATER_THAN" | "NUM_GREATER_THAN_EQUAL" | "STRING_EQUALS" | "STRING_CONTAINS";
  /**
   * ID of the list in question. This field is only relevant when type is set
   * to LIST_MEMBERSHIP_TERM.
   */
  remarketingListId?: bigint;
  /**
   * List population term type determines the applicable fields in this object.
   * If left unset or set to CUSTOM_VARIABLE_TERM, then variableName,
   * variableFriendlyName, operator, value, and negation are applicable. If set
   * to LIST_MEMBERSHIP_TERM then remarketingListId and contains are applicable.
   * If set to REFERRER_TERM then operator, value, and negation are applicable.
   */
  type?:  | "CUSTOM_VARIABLE_TERM" | "LIST_MEMBERSHIP_TERM" | "REFERRER_TERM";
  /**
   * Literal to compare the variable to. This field is only relevant when type
   * is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.
   */
  value?: string;
  /**
   * Friendly name of this term's variable. This is a read-only, auto-generated
   * field. This field is only relevant when type is left unset or set to
   * CUSTOM_VARIABLE_TERM.
   */
  variableFriendlyName?: string;
  /**
   * Name of the variable (U1, U2, etc.) being compared in this term. This
   * field is only relevant when type is set to null, CUSTOM_VARIABLE_TERM or
   * REFERRER_TERM.
   */
  variableName?: string;
}

function serializeListPopulationTerm(data: any): ListPopulationTerm {
  return {
    ...data,
    remarketingListId: data["remarketingListId"] !== undefined ? String(data["remarketingListId"]) : undefined,
  };
}

function deserializeListPopulationTerm(data: any): ListPopulationTerm {
  return {
    ...data,
    remarketingListId: data["remarketingListId"] !== undefined ? BigInt(data["remarketingListId"]) : undefined,
  };
}

/**
 * Remarketing List Targeting Expression.
 */
export interface ListTargetingExpression {
  /**
   * Expression describing which lists are being targeted by the ad.
   */
  expression?: string;
}

/**
 * Lookback configuration settings.
 */
export interface LookbackConfiguration {
  /**
   * Lookback window, in days, from the last time a given user clicked on one
   * of your ads. If you enter 0, clicks will not be considered as triggering
   * events for floodlight tracking. If you leave this field blank, the default
   * value for your account will be used. Acceptable values are 0 to 90,
   * inclusive.
   */
  clickDuration?: number;
  /**
   * Lookback window, in days, from the last time a given user viewed one of
   * your ads. If you enter 0, impressions will not be considered as triggering
   * events for floodlight tracking. If you leave this field blank, the default
   * value for your account will be used. Acceptable values are 0 to 90,
   * inclusive.
   */
  postImpressionActivitiesDuration?: number;
}

export interface MeasurementPartnerAdvertiserLink {
  /**
   * .
   */
  linkStatus?:  | "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING";
  /**
   * Measurement partner used for tag wrapping.
   */
  measurementPartner?:  | "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY";
  /**
   * .
   */
  partnerAdvertiserId?: string;
}

export interface MeasurementPartnerCampaignLink {
  /**
   * .
   */
  linkStatus?:  | "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING";
  /**
   * Measurement partner used for tag wrapping.
   */
  measurementPartner?:  | "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY";
  /**
   * Partner campaign ID needed for establishing linking with Measurement
   * partner.
   */
  partnerCampaignId?: string;
}

/**
 * Placement tag wrapping
 */
export interface MeasurementPartnerWrappingData {
  /**
   * Placement wrapping status.
   */
  linkStatus?:  | "MEASUREMENT_PARTNER_UNLINKED" | "MEASUREMENT_PARTNER_LINKED" | "MEASUREMENT_PARTNER_LINK_PENDING" | "MEASUREMENT_PARTNER_LINK_FAILURE" | "MEASUREMENT_PARTNER_LINK_OPT_OUT" | "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING" | "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING" | "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING";
  /**
   * Measurement partner used for wrapping the placement.
   */
  measurementPartner?:  | "NONE" | "INTEGRAL_AD_SCIENCE" | "DOUBLE_VERIFY";
  /**
   * Measurement mode for the wrapped placement.
   */
  tagWrappingMode?:  | "NONE" | "BLOCKING" | "MONITORING" | "MONITORING_READ_ONLY" | "VIDEO_PIXEL_MONITORING" | "TRACKING" | "VPAID_MONITORING" | "VPAID_BLOCKING" | "NON_VPAID_MONITORING" | "VPAID_ONLY_MONITORING" | "VPAID_ONLY_BLOCKING" | "VPAID_ONLY_FILTERING" | "VPAID_FILTERING" | "NON_VPAID_FILTERING";
  /**
   * Tag provided by the measurement partner during wrapping.
   */
  wrappedTag?: string;
}

/**
 * Represents a metric.
 */
export interface Metric {
  /**
   * The kind of resource this is, in this case dfareporting#metric.
   */
  kind?: string;
  /**
   * The metric name, e.g. dfa:impressions
   */
  name?: string;
}

/**
 * Contains information about a metro region that can be targeted by ads.
 */
export interface Metro {
  /**
   * Country code of the country to which this metro region belongs.
   */
  countryCode?: string;
  /**
   * DART ID of the country to which this metro region belongs.
   */
  countryDartId?: bigint;
  /**
   * DART ID of this metro region.
   */
  dartId?: bigint;
  /**
   * DMA ID of this metro region. This is the ID used for targeting and
   * generating reports, and is equivalent to metro_code.
   */
  dmaId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#metro".
   */
  kind?: string;
  /**
   * Metro code of this metro region. This is equivalent to dma_id.
   */
  metroCode?: string;
  /**
   * Name of this metro region.
   */
  name?: string;
}

function serializeMetro(data: any): Metro {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? String(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
    dmaId: data["dmaId"] !== undefined ? String(data["dmaId"]) : undefined,
  };
}

function deserializeMetro(data: any): Metro {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? BigInt(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
    dmaId: data["dmaId"] !== undefined ? BigInt(data["dmaId"]) : undefined,
  };
}

/**
 * Metro List Response
 */
export interface MetrosListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#metrosListResponse".
   */
  kind?: string;
  /**
   * Metro collection.
   */
  metros?: Metro[];
}

function serializeMetrosListResponse(data: any): MetrosListResponse {
  return {
    ...data,
    metros: data["metros"] !== undefined ? data["metros"].map((item: any) => (serializeMetro(item))) : undefined,
  };
}

function deserializeMetrosListResponse(data: any): MetrosListResponse {
  return {
    ...data,
    metros: data["metros"] !== undefined ? data["metros"].map((item: any) => (deserializeMetro(item))) : undefined,
  };
}

/**
 * Contains information about a mobile app. Used as a landing page deep link.
 */
export interface MobileApp {
  /**
   * Mobile app directory.
   */
  directory?:  | "UNKNOWN" | "APPLE_APP_STORE" | "GOOGLE_PLAY_STORE" | "ROKU_APP_STORE" | "AMAZON_FIRETV_APP_STORE" | "PLAYSTATION_APP_STORE" | "APPLE_TV_APP_STORE" | "XBOX_APP_STORE" | "SAMSUNG_TV_APP_STORE" | "ANDROID_TV_APP_STORE" | "GENERIC_CTV_APP_STORE";
  /**
   * ID of this mobile app.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#mobileApp".
   */
  kind?: string;
  /**
   * Publisher name.
   */
  publisherName?: string;
  /**
   * Title of this mobile app.
   */
  title?: string;
}

/**
 * Additional options for dfareporting#mobileAppsList.
 */
export interface MobileAppsListOptions {
  /**
   * Select only apps from these directories.
   */
  directories?:  | "UNKNOWN" | "APPLE_APP_STORE" | "GOOGLE_PLAY_STORE" | "ROKU_APP_STORE" | "AMAZON_FIRETV_APP_STORE" | "PLAYSTATION_APP_STORE" | "APPLE_TV_APP_STORE" | "XBOX_APP_STORE" | "SAMSUNG_TV_APP_STORE" | "ANDROID_TV_APP_STORE" | "GENERIC_CTV_APP_STORE";
  /**
   * Select only apps with these IDs.
   */
  ids?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "app*2015" will return objects with names like "app Jan 2018",
   * "app Jan 2018", or simply "app 2018". Most of the searches also add
   * wildcards implicitly at the start and the end of the search string. For
   * example, a search string of "app" will match objects with name "my app",
   * "app 2018", or simply "app".
   */
  searchString?: string;
}

/**
 * Mobile app List Response
 */
export interface MobileAppsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#mobileAppsListResponse".
   */
  kind?: string;
  /**
   * Mobile apps collection.
   */
  mobileApps?: MobileApp[];
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
}

/**
 * Contains information about a mobile carrier that can be targeted by ads.
 */
export interface MobileCarrier {
  /**
   * Country code of the country to which this mobile carrier belongs.
   */
  countryCode?: string;
  /**
   * DART ID of the country to which this mobile carrier belongs.
   */
  countryDartId?: bigint;
  /**
   * ID of this mobile carrier.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#mobileCarrier".
   */
  kind?: string;
  /**
   * Name of this mobile carrier.
   */
  name?: string;
}

function serializeMobileCarrier(data: any): MobileCarrier {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? String(data["countryDartId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeMobileCarrier(data: any): MobileCarrier {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? BigInt(data["countryDartId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Mobile Carrier List Response
 */
export interface MobileCarriersListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#mobileCarriersListResponse".
   */
  kind?: string;
  /**
   * Mobile carrier collection.
   */
  mobileCarriers?: MobileCarrier[];
}

function serializeMobileCarriersListResponse(data: any): MobileCarriersListResponse {
  return {
    ...data,
    mobileCarriers: data["mobileCarriers"] !== undefined ? data["mobileCarriers"].map((item: any) => (serializeMobileCarrier(item))) : undefined,
  };
}

function deserializeMobileCarriersListResponse(data: any): MobileCarriersListResponse {
  return {
    ...data,
    mobileCarriers: data["mobileCarriers"] !== undefined ? data["mobileCarriers"].map((item: any) => (deserializeMobileCarrier(item))) : undefined,
  };
}

/**
 * Online Behavioral Advertiser icon.
 */
export interface ObaIcon {
  /**
   * URL to redirect to when an OBA icon is clicked.
   */
  iconClickThroughUrl?: string;
  /**
   * URL to track click when an OBA icon is clicked.
   */
  iconClickTrackingUrl?: string;
  /**
   * URL to track view when an OBA icon is clicked.
   */
  iconViewTrackingUrl?: string;
  /**
   * Identifies the industry initiative that the icon supports. For example,
   * AdChoices.
   */
  program?: string;
  /**
   * OBA icon resource URL. Campaign Manager only supports image and JavaScript
   * icons. Learn more
   */
  resourceUrl?: string;
  /**
   * OBA icon size.
   */
  size?: Size;
  /**
   * OBA icon x coordinate position. Accepted values are left or right.
   */
  xPosition?: string;
  /**
   * OBA icon y coordinate position. Accepted values are top or bottom.
   */
  yPosition?: string;
}

function serializeObaIcon(data: any): ObaIcon {
  return {
    ...data,
    size: data["size"] !== undefined ? serializeSize(data["size"]) : undefined,
  };
}

function deserializeObaIcon(data: any): ObaIcon {
  return {
    ...data,
    size: data["size"] !== undefined ? deserializeSize(data["size"]) : undefined,
  };
}

/**
 * Object Filter.
 */
export interface ObjectFilter {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#objectFilter".
   */
  kind?: string;
  /**
   * Applicable when status is ASSIGNED. The user has access to objects with
   * these object IDs.
   */
  objectIds?: bigint[];
  /**
   * Status of the filter. NONE means the user has access to none of the
   * objects. ALL means the user has access to all objects. ASSIGNED means the
   * user has access to the objects with IDs in the objectIds list.
   */
  status?:  | "NONE" | "ASSIGNED" | "ALL";
}

function serializeObjectFilter(data: any): ObjectFilter {
  return {
    ...data,
    objectIds: data["objectIds"] !== undefined ? data["objectIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeObjectFilter(data: any): ObjectFilter {
  return {
    ...data,
    objectIds: data["objectIds"] !== undefined ? data["objectIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Offset Position.
 */
export interface OffsetPosition {
  /**
   * Offset distance from left side of an asset or a window.
   */
  left?: number;
  /**
   * Offset distance from top side of an asset or a window.
   */
  top?: number;
}

/**
 * Omniture Integration Settings.
 */
export interface OmnitureSettings {
  /**
   * Whether placement cost data will be sent to Omniture. This property can be
   * enabled only if omnitureIntegrationEnabled is true.
   */
  omnitureCostDataEnabled?: boolean;
  /**
   * Whether Omniture integration is enabled. This property can be enabled only
   * when the "Advanced Ad Serving" account setting is enabled.
   */
  omnitureIntegrationEnabled?: boolean;
}

/**
 * Contains information about an operating system that can be targeted by ads.
 */
export interface OperatingSystem {
  /**
   * DART ID of this operating system. This is the ID used for targeting.
   */
  dartId?: bigint;
  /**
   * Whether this operating system is for desktop.
   */
  desktop?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#operatingSystem".
   */
  kind?: string;
  /**
   * Whether this operating system is for mobile.
   */
  mobile?: boolean;
  /**
   * Name of this operating system.
   */
  name?: string;
}

function serializeOperatingSystem(data: any): OperatingSystem {
  return {
    ...data,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
  };
}

function deserializeOperatingSystem(data: any): OperatingSystem {
  return {
    ...data,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
  };
}

/**
 * Operating System List Response
 */
export interface OperatingSystemsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#operatingSystemsListResponse".
   */
  kind?: string;
  /**
   * Operating system collection.
   */
  operatingSystems?: OperatingSystem[];
}

function serializeOperatingSystemsListResponse(data: any): OperatingSystemsListResponse {
  return {
    ...data,
    operatingSystems: data["operatingSystems"] !== undefined ? data["operatingSystems"].map((item: any) => (serializeOperatingSystem(item))) : undefined,
  };
}

function deserializeOperatingSystemsListResponse(data: any): OperatingSystemsListResponse {
  return {
    ...data,
    operatingSystems: data["operatingSystems"] !== undefined ? data["operatingSystems"].map((item: any) => (deserializeOperatingSystem(item))) : undefined,
  };
}

/**
 * Contains information about a particular version of an operating system that
 * can be targeted by ads.
 */
export interface OperatingSystemVersion {
  /**
   * ID of this operating system version.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#operatingSystemVersion".
   */
  kind?: string;
  /**
   * Major version (leftmost number) of this operating system version.
   */
  majorVersion?: string;
  /**
   * Minor version (number after the first dot) of this operating system
   * version.
   */
  minorVersion?: string;
  /**
   * Name of this operating system version.
   */
  name?: string;
  /**
   * Operating system of this operating system version.
   */
  operatingSystem?: OperatingSystem;
}

function serializeOperatingSystemVersion(data: any): OperatingSystemVersion {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    operatingSystem: data["operatingSystem"] !== undefined ? serializeOperatingSystem(data["operatingSystem"]) : undefined,
  };
}

function deserializeOperatingSystemVersion(data: any): OperatingSystemVersion {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    operatingSystem: data["operatingSystem"] !== undefined ? deserializeOperatingSystem(data["operatingSystem"]) : undefined,
  };
}

/**
 * Operating System Version List Response
 */
export interface OperatingSystemVersionsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#operatingSystemVersionsListResponse".
   */
  kind?: string;
  /**
   * Operating system version collection.
   */
  operatingSystemVersions?: OperatingSystemVersion[];
}

function serializeOperatingSystemVersionsListResponse(data: any): OperatingSystemVersionsListResponse {
  return {
    ...data,
    operatingSystemVersions: data["operatingSystemVersions"] !== undefined ? data["operatingSystemVersions"].map((item: any) => (serializeOperatingSystemVersion(item))) : undefined,
  };
}

function deserializeOperatingSystemVersionsListResponse(data: any): OperatingSystemVersionsListResponse {
  return {
    ...data,
    operatingSystemVersions: data["operatingSystemVersions"] !== undefined ? data["operatingSystemVersions"].map((item: any) => (deserializeOperatingSystemVersion(item))) : undefined,
  };
}

/**
 * Creative optimization activity.
 */
export interface OptimizationActivity {
  /**
   * Floodlight activity ID of this optimization activity. This is a required
   * field.
   */
  floodlightActivityId?: bigint;
  /**
   * Dimension value for the ID of the floodlight activity. This is a
   * read-only, auto-generated field.
   */
  floodlightActivityIdDimensionValue?: DimensionValue;
  /**
   * Weight associated with this optimization. The weight assigned will be
   * understood in proportion to the weights assigned to the other optimization
   * activities. Value must be greater than or equal to 1.
   */
  weight?: number;
}

function serializeOptimizationActivity(data: any): OptimizationActivity {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
  };
}

function deserializeOptimizationActivity(data: any): OptimizationActivity {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
  };
}

/**
 * Describes properties of a Planning order.
 */
export interface Order {
  /**
   * Account ID of this order.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this order.
   */
  advertiserId?: bigint;
  /**
   * IDs for users that have to approve documents created for this order.
   */
  approverUserProfileIds?: bigint[];
  /**
   * Buyer invoice ID associated with this order.
   */
  buyerInvoiceId?: string;
  /**
   * Name of the buyer organization.
   */
  buyerOrganizationName?: string;
  /**
   * Comments in this order.
   */
  comments?: string;
  /**
   * Contacts for this order.
   */
  contacts?: OrderContact[];
  /**
   * ID of this order. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#order".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this order.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Name of this order.
   */
  name?: string;
  /**
   * Notes of this order.
   */
  notes?: string;
  /**
   * ID of the terms and conditions template used in this order.
   */
  planningTermId?: bigint;
  /**
   * Project ID of this order.
   */
  projectId?: bigint;
  /**
   * Seller order ID associated with this order.
   */
  sellerOrderId?: string;
  /**
   * Name of the seller organization.
   */
  sellerOrganizationName?: string;
  /**
   * Site IDs this order is associated with.
   */
  siteId?: bigint[];
  /**
   * Free-form site names this order is associated with.
   */
  siteNames?: string[];
  /**
   * Subaccount ID of this order.
   */
  subaccountId?: bigint;
  /**
   * Terms and conditions of this order.
   */
  termsAndConditions?: string;
}

function serializeOrder(data: any): Order {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    approverUserProfileIds: data["approverUserProfileIds"] !== undefined ? data["approverUserProfileIds"].map((item: any) => (String(item))) : undefined,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (serializeOrderContact(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    planningTermId: data["planningTermId"] !== undefined ? String(data["planningTermId"]) : undefined,
    projectId: data["projectId"] !== undefined ? String(data["projectId"]) : undefined,
    siteId: data["siteId"] !== undefined ? data["siteId"].map((item: any) => (String(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeOrder(data: any): Order {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    approverUserProfileIds: data["approverUserProfileIds"] !== undefined ? data["approverUserProfileIds"].map((item: any) => (BigInt(item))) : undefined,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (deserializeOrderContact(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    planningTermId: data["planningTermId"] !== undefined ? BigInt(data["planningTermId"]) : undefined,
    projectId: data["projectId"] !== undefined ? BigInt(data["projectId"]) : undefined,
    siteId: data["siteId"] !== undefined ? data["siteId"].map((item: any) => (BigInt(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Contact of an order.
 */
export interface OrderContact {
  /**
   * Free-form information about this contact. It could be any information
   * related to this contact in addition to type, title, name, and signature
   * user profile ID.
   */
  contactInfo?: string;
  /**
   * Name of this contact.
   */
  contactName?: string;
  /**
   * Title of this contact.
   */
  contactTitle?: string;
  /**
   * Type of this contact.
   */
  contactType?:  | "PLANNING_ORDER_CONTACT_BUYER_CONTACT" | "PLANNING_ORDER_CONTACT_BUYER_BILLING_CONTACT" | "PLANNING_ORDER_CONTACT_SELLER_CONTACT";
  /**
   * ID of the user profile containing the signature that will be embedded into
   * order documents.
   */
  signatureUserProfileId?: bigint;
}

function serializeOrderContact(data: any): OrderContact {
  return {
    ...data,
    signatureUserProfileId: data["signatureUserProfileId"] !== undefined ? String(data["signatureUserProfileId"]) : undefined,
  };
}

function deserializeOrderContact(data: any): OrderContact {
  return {
    ...data,
    signatureUserProfileId: data["signatureUserProfileId"] !== undefined ? BigInt(data["signatureUserProfileId"]) : undefined,
  };
}

/**
 * Contains properties of a Planning order document.
 */
export interface OrderDocument {
  /**
   * Account ID of this order document.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this order document.
   */
  advertiserId?: bigint;
  /**
   * The amended order document ID of this order document. An order document
   * can be created by optionally amending another order document so that the
   * change history can be preserved.
   */
  amendedOrderDocumentId?: bigint;
  /**
   * IDs of users who have approved this order document.
   */
  approvedByUserProfileIds?: bigint[];
  /**
   * Whether this order document is cancelled.
   */
  cancelled?: boolean;
  /**
   * Information about the creation of this order document.
   */
  createdInfo?: LastModifiedInfo;
  effectiveDate?: Date;
  /**
   * ID of this order document.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#orderDocument".
   */
  kind?: string;
  /**
   * List of email addresses that received the last sent document.
   */
  lastSentRecipients?: string[];
  lastSentTime?: Date;
  /**
   * ID of the order from which this order document is created.
   */
  orderId?: bigint;
  /**
   * Project ID of this order document.
   */
  projectId?: bigint;
  /**
   * Whether this order document has been signed.
   */
  signed?: boolean;
  /**
   * Subaccount ID of this order document.
   */
  subaccountId?: bigint;
  /**
   * Title of this order document.
   */
  title?: string;
  /**
   * Type of this order document
   */
  type?:  | "PLANNING_ORDER_TYPE_INSERTION_ORDER" | "PLANNING_ORDER_TYPE_CHANGE_ORDER";
}

function serializeOrderDocument(data: any): OrderDocument {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    amendedOrderDocumentId: data["amendedOrderDocumentId"] !== undefined ? String(data["amendedOrderDocumentId"]) : undefined,
    approvedByUserProfileIds: data["approvedByUserProfileIds"] !== undefined ? data["approvedByUserProfileIds"].map((item: any) => (String(item))) : undefined,
    createdInfo: data["createdInfo"] !== undefined ? serializeLastModifiedInfo(data["createdInfo"]) : undefined,
    effectiveDate: data["effectiveDate"] !== undefined ? data["effectiveDate"].toISOString() : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastSentTime: data["lastSentTime"] !== undefined ? data["lastSentTime"].toISOString() : undefined,
    orderId: data["orderId"] !== undefined ? String(data["orderId"]) : undefined,
    projectId: data["projectId"] !== undefined ? String(data["projectId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeOrderDocument(data: any): OrderDocument {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    amendedOrderDocumentId: data["amendedOrderDocumentId"] !== undefined ? BigInt(data["amendedOrderDocumentId"]) : undefined,
    approvedByUserProfileIds: data["approvedByUserProfileIds"] !== undefined ? data["approvedByUserProfileIds"].map((item: any) => (BigInt(item))) : undefined,
    createdInfo: data["createdInfo"] !== undefined ? deserializeLastModifiedInfo(data["createdInfo"]) : undefined,
    effectiveDate: data["effectiveDate"] !== undefined ? new Date(data["effectiveDate"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastSentTime: data["lastSentTime"] !== undefined ? new Date(data["lastSentTime"]) : undefined,
    orderId: data["orderId"] !== undefined ? BigInt(data["orderId"]) : undefined,
    projectId: data["projectId"] !== undefined ? BigInt(data["projectId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#orderDocumentsList.
 */
export interface OrderDocumentsListOptions {
  /**
   * Select only order documents that have been approved by at least one user.
   */
  approved?: boolean;
  /**
   * Select only order documents with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only order documents for specified orders.
   */
  orderId?: bigint;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for order documents by name or ID. Wildcards (*) are
   * allowed. For example, "orderdocument*2015" will return order documents with
   * names like "orderdocument June 2015", "orderdocument April 2015", or simply
   * "orderdocument 2015". Most of the searches also add wildcards implicitly at
   * the start and the end of the search string. For example, a search string of
   * "orderdocument" will match order documents with name "my orderdocument",
   * "orderdocument 2015", or simply "orderdocument".
   */
  searchString?: string;
  /**
   * Select only order documents that are associated with these sites.
   */
  siteId?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeOrderDocumentsListOptions(data: any): OrderDocumentsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    orderId: data["orderId"] !== undefined ? String(data["orderId"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
  };
}

function deserializeOrderDocumentsListOptions(data: any): OrderDocumentsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    orderId: data["orderId"] !== undefined ? BigInt(data["orderId"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
  };
}

/**
 * Order document List Response
 */
export interface OrderDocumentsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#orderDocumentsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Order document collection
   */
  orderDocuments?: OrderDocument[];
}

function serializeOrderDocumentsListResponse(data: any): OrderDocumentsListResponse {
  return {
    ...data,
    orderDocuments: data["orderDocuments"] !== undefined ? data["orderDocuments"].map((item: any) => (serializeOrderDocument(item))) : undefined,
  };
}

function deserializeOrderDocumentsListResponse(data: any): OrderDocumentsListResponse {
  return {
    ...data,
    orderDocuments: data["orderDocuments"] !== undefined ? data["orderDocuments"].map((item: any) => (deserializeOrderDocument(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#ordersList.
 */
export interface OrdersListOptions {
  /**
   * Select only orders with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for orders by name or ID. Wildcards (*) are allowed. For
   * example, "order*2015" will return orders with names like "order June 2015",
   * "order April 2015", or simply "order 2015". Most of the searches also add
   * wildcards implicitly at the start and the end of the search string. For
   * example, a search string of "order" will match orders with name "my order",
   * "order 2015", or simply "order".
   */
  searchString?: string;
  /**
   * Select only orders that are associated with these site IDs.
   */
  siteId?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeOrdersListOptions(data: any): OrdersListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
  };
}

function deserializeOrdersListOptions(data: any): OrdersListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
  };
}

/**
 * Order List Response
 */
export interface OrdersListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#ordersListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Order collection.
   */
  orders?: Order[];
}

function serializeOrdersListResponse(data: any): OrdersListResponse {
  return {
    ...data,
    orders: data["orders"] !== undefined ? data["orders"].map((item: any) => (serializeOrder(item))) : undefined,
  };
}

function deserializeOrdersListResponse(data: any): OrdersListResponse {
  return {
    ...data,
    orders: data["orders"] !== undefined ? data["orders"].map((item: any) => (deserializeOrder(item))) : undefined,
  };
}

/**
 * Represents a DfaReporting path filter.
 */
export interface PathFilter {
  /**
   * Event filters in path report.
   */
  eventFilters?: EventFilter[];
  /**
   * The kind of resource this is, in this case dfareporting#pathFilter.
   */
  kind?: string;
  /**
   * Determines how the 'value' field is matched when filtering. If not
   * specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed
   * as a placeholder for variable length character sequences, and it can be
   * escaped with a backslash. Note, only paid search dimensions
   * ('dfa:paidSearch*') allow a matchType other than EXACT.
   */
  pathMatchPosition?:  | "PATH_MATCH_POSITION_UNSPECIFIED" | "ANY" | "FIRST" | "LAST";
}

function serializePathFilter(data: any): PathFilter {
  return {
    ...data,
    eventFilters: data["eventFilters"] !== undefined ? data["eventFilters"].map((item: any) => (serializeEventFilter(item))) : undefined,
  };
}

function deserializePathFilter(data: any): PathFilter {
  return {
    ...data,
    eventFilters: data["eventFilters"] !== undefined ? data["eventFilters"].map((item: any) => (deserializeEventFilter(item))) : undefined,
  };
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "PATH".
 */
export interface PathReportCompatibleFields {
  /**
   * Dimensions which are compatible to be selected in the "channelGroupings"
   * section of the report.
   */
  channelGroupings?: Dimension[];
  /**
   * Dimensions which are compatible to be selected in the "dimensions" section
   * of the report.
   */
  dimensions?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#pathReportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
  /**
   * Dimensions which are compatible to be selected in the "pathFilters"
   * section of the report.
   */
  pathFilters?: Dimension[];
}

/**
 * Represents a PathReportDimensionValue resource.
 */
export interface PathReportDimensionValue {
  /**
   * The name of the dimension.
   */
  dimensionName?: string;
  /**
   * The possible ID's associated with the value if available.
   */
  ids?: string[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#pathReportDimensionValue.
   */
  kind?: string;
  /**
   * Determines how the 'value' field is matched when filtering. If not
   * specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed
   * as a placeholder for variable length character sequences, and it can be
   * escaped with a backslash. Note, only paid search dimensions
   * ('dfa:paidSearch*') allow a matchType other than EXACT.
   */
  matchType?:  | "EXACT" | "BEGINS_WITH" | "CONTAINS" | "WILDCARD_EXPRESSION";
  /**
   * The possible values of the dimension.
   */
  values?: string[];
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "PATH_TO_CONVERSION".
 */
export interface PathToConversionReportCompatibleFields {
  /**
   * Conversion dimensions which are compatible to be selected in the
   * "conversionDimensions" section of the report.
   */
  conversionDimensions?: Dimension[];
  /**
   * Custom floodlight variables which are compatible to be selected in the
   * "customFloodlightVariables" section of the report.
   */
  customFloodlightVariables?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#pathToConversionReportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
  /**
   * Per-interaction dimensions which are compatible to be selected in the
   * "perInteractionDimensions" section of the report.
   */
  perInteractionDimensions?: Dimension[];
}

/**
 * Contains properties of a placement.
 */
export interface Placement {
  /**
   * Account ID of this placement. This field can be left blank.
   */
  accountId?: bigint;
  /**
   * Whether this placement is active, inactive, archived or permanently
   * archived.
   */
  activeStatus?:  | "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED";
  /**
   * Whether this placement opts out of ad blocking. When true, ad blocking is
   * disabled for this placement. When false, the campaign and site settings
   * take effect.
   */
  adBlockingOptOut?: boolean;
  /**
   * Additional sizes associated with this placement. When inserting or
   * updating a placement, only the size ID field is used.
   */
  additionalSizes?: Size[];
  /**
   * Advertiser ID of this placement. This field can be left blank.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Campaign ID of this placement. This field is a required field on
   * insertion.
   */
  campaignId?: bigint;
  /**
   * Dimension value for the ID of the campaign. This is a read-only,
   * auto-generated field.
   */
  campaignIdDimensionValue?: DimensionValue;
  /**
   * Comments for this placement.
   */
  comment?: string;
  /**
   * Placement compatibility. DISPLAY and DISPLAY_INTERSTITIAL refer to
   * rendering on desktop, on mobile devices or in mobile apps for regular or
   * interstitial ads respectively. APP and APP_INTERSTITIAL are no longer
   * allowed for new placement insertions. Instead, use DISPLAY or
   * DISPLAY_INTERSTITIAL. IN_STREAM_VIDEO refers to rendering in in-stream
   * video ads developed with the VAST standard. This field is required on
   * insertion.
   */
  compatibility?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO";
  /**
   * ID of the content category assigned to this placement.
   */
  contentCategoryId?: bigint;
  /**
   * Information about the creation of this placement. This is a read-only
   * field.
   */
  createInfo?: LastModifiedInfo;
  /**
   * Directory site ID of this placement. On insert, you must set either this
   * field or the siteId field to specify the site associated with this
   * placement. This is a required field that is read-only after insertion.
   */
  directorySiteId?: bigint;
  /**
   * Dimension value for the ID of the directory site. This is a read-only,
   * auto-generated field.
   */
  directorySiteIdDimensionValue?: DimensionValue;
  /**
   * External ID for this placement.
   */
  externalId?: string;
  /**
   * ID of this placement. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this placement. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Key name of this placement. This is a read-only, auto-generated field.
   */
  keyName?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placement".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this placement. This is
   * a read-only field.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Lookback window settings for this placement.
   */
  lookbackConfiguration?: LookbackConfiguration;
  /**
   * Name of this placement.This is a required field and must be less than or
   * equal to 512 characters long.
   */
  name?: string;
  /**
   * Measurement partner provided settings for a wrapped placement.
   */
  partnerWrappingData?: MeasurementPartnerWrappingData;
  /**
   * Whether payment was approved for this placement. This is a read-only field
   * relevant only to publisher-paid placements.
   */
  paymentApproved?: boolean;
  /**
   * Payment source for this placement. This is a required field that is
   * read-only after insertion.
   */
  paymentSource?:  | "PLACEMENT_AGENCY_PAID" | "PLACEMENT_PUBLISHER_PAID";
  /**
   * ID of this placement's group, if applicable.
   */
  placementGroupId?: bigint;
  /**
   * Dimension value for the ID of the placement group. This is a read-only,
   * auto-generated field.
   */
  placementGroupIdDimensionValue?: DimensionValue;
  /**
   * ID of the placement strategy assigned to this placement.
   */
  placementStrategyId?: bigint;
  /**
   * Pricing schedule of this placement. This field is required on insertion,
   * specifically subfields startDate, endDate and pricingType.
   */
  pricingSchedule?: PricingSchedule;
  /**
   * Whether this placement is the primary placement of a roadblock (placement
   * group). You cannot change this field from true to false. Setting this field
   * to true will automatically set the primary field on the original primary
   * placement of the roadblock to false, and it will automatically set the
   * roadblock's primaryPlacementId field to the ID of this placement.
   */
  primary?: boolean;
  /**
   * Information about the last publisher update. This is a read-only field.
   */
  publisherUpdateInfo?: LastModifiedInfo;
  /**
   * Site ID associated with this placement. On insert, you must set either
   * this field or the directorySiteId field to specify the site associated with
   * this placement. This is a required field that is read-only after insertion.
   */
  siteId?: bigint;
  /**
   * Dimension value for the ID of the site. This is a read-only,
   * auto-generated field.
   */
  siteIdDimensionValue?: DimensionValue;
  /**
   * Size associated with this placement. When inserting or updating a
   * placement, only the size ID field is used. This field is required on
   * insertion.
   */
  size?: Size;
  /**
   * Whether creatives assigned to this placement must be SSL-compliant.
   */
  sslRequired?: boolean;
  /**
   * Third-party placement status.
   */
  status?:  | "PENDING_REVIEW" | "PAYMENT_ACCEPTED" | "PAYMENT_REJECTED" | "ACKNOWLEDGE_REJECTION" | "ACKNOWLEDGE_ACCEPTANCE" | "DRAFT";
  /**
   * Subaccount ID of this placement. This field can be left blank.
   */
  subaccountId?: bigint;
  /**
   * Tag formats to generate for this placement. This field is required on
   * insertion. Acceptable values are: - "PLACEMENT_TAG_STANDARD" -
   * "PLACEMENT_TAG_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_IFRAME_ILAYER" -
   * "PLACEMENT_TAG_INTERNAL_REDIRECT" - "PLACEMENT_TAG_JAVASCRIPT" -
   * "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" -
   * "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" -
   * "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" - "PLACEMENT_TAG_CLICK_COMMANDS" -
   * "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" -
   * "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" -
   * "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" - "PLACEMENT_TAG_TRACKING" -
   * "PLACEMENT_TAG_TRACKING_IFRAME" - "PLACEMENT_TAG_TRACKING_JAVASCRIPT"
   */
  tagFormats?:  | "PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT"[];
  /**
   * Tag settings for this placement.
   */
  tagSetting?: TagSetting;
  /**
   * Whether Verification and ActiveView are disabled for in-stream video
   * creatives for this placement. The same setting videoActiveViewOptOut exists
   * on the site level -- the opt out occurs if either of these settings are
   * true. These settings are distinct from
   * DirectorySites.settings.activeViewOptOut or
   * Sites.siteSettings.activeViewOptOut which only apply to display ads.
   * However, Accounts.activeViewOptOut opts out both video traffic, as well as
   * display ads, from Verification and ActiveView.
   */
  videoActiveViewOptOut?: boolean;
  /**
   * A collection of settings which affect video creatives served through this
   * placement. Applicable to placements with IN_STREAM_VIDEO compatibility.
   */
  videoSettings?: VideoSettings;
  /**
   * VPAID adapter setting for this placement. Controls which VPAID format the
   * measurement adapter will use for in-stream video creatives assigned to this
   * placement. *Note:* Flash is no longer supported. This field now defaults to
   * HTML5 when the following values are provided: FLASH, BOTH.
   */
  vpaidAdapterChoice?:  | "DEFAULT" | "FLASH" | "HTML5" | "BOTH";
  /**
   * Whether this placement opts out of tag wrapping.
   */
  wrappingOptOut?: boolean;
}

function serializePlacement(data: any): Placement {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (serializeSize(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? String(data["contentCategoryId"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? serializeLastModifiedInfo(data["createInfo"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? String(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementGroupId: data["placementGroupId"] !== undefined ? String(data["placementGroupId"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? String(data["placementStrategyId"]) : undefined,
    pricingSchedule: data["pricingSchedule"] !== undefined ? serializePricingSchedule(data["pricingSchedule"]) : undefined,
    publisherUpdateInfo: data["publisherUpdateInfo"] !== undefined ? serializeLastModifiedInfo(data["publisherUpdateInfo"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
    size: data["size"] !== undefined ? serializeSize(data["size"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    videoSettings: data["videoSettings"] !== undefined ? serializeVideoSettings(data["videoSettings"]) : undefined,
  };
}

function deserializePlacement(data: any): Placement {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    additionalSizes: data["additionalSizes"] !== undefined ? data["additionalSizes"].map((item: any) => (deserializeSize(item))) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? BigInt(data["contentCategoryId"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? deserializeLastModifiedInfo(data["createInfo"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? BigInt(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementGroupId: data["placementGroupId"] !== undefined ? BigInt(data["placementGroupId"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? BigInt(data["placementStrategyId"]) : undefined,
    pricingSchedule: data["pricingSchedule"] !== undefined ? deserializePricingSchedule(data["pricingSchedule"]) : undefined,
    publisherUpdateInfo: data["publisherUpdateInfo"] !== undefined ? deserializeLastModifiedInfo(data["publisherUpdateInfo"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
    size: data["size"] !== undefined ? deserializeSize(data["size"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    videoSettings: data["videoSettings"] !== undefined ? deserializeVideoSettings(data["videoSettings"]) : undefined,
  };
}

/**
 * Placement Assignment.
 */
export interface PlacementAssignment {
  /**
   * Whether this placement assignment is active. When true, the placement will
   * be included in the ad's rotation.
   */
  active?: boolean;
  /**
   * ID of the placement to be assigned. This is a required field.
   */
  placementId?: bigint;
  /**
   * Dimension value for the ID of the placement. This is a read-only,
   * auto-generated field.
   */
  placementIdDimensionValue?: DimensionValue;
  /**
   * Whether the placement to be assigned requires SSL. This is a read-only
   * field that is auto-generated when the ad is inserted or updated.
   */
  sslRequired?: boolean;
}

function serializePlacementAssignment(data: any): PlacementAssignment {
  return {
    ...data,
    placementId: data["placementId"] !== undefined ? String(data["placementId"]) : undefined,
  };
}

function deserializePlacementAssignment(data: any): PlacementAssignment {
  return {
    ...data,
    placementId: data["placementId"] !== undefined ? BigInt(data["placementId"]) : undefined,
  };
}

/**
 * Contains properties of a package or roadblock.
 */
export interface PlacementGroup {
  /**
   * Account ID of this placement group. This is a read-only field that can be
   * left blank.
   */
  accountId?: bigint;
  /**
   * Whether this placement group is active, inactive, archived or permanently
   * archived.
   */
  activeStatus?:  | "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED";
  /**
   * Advertiser ID of this placement group. This is a required field on
   * insertion.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Campaign ID of this placement group. This field is required on insertion.
   */
  campaignId?: bigint;
  /**
   * Dimension value for the ID of the campaign. This is a read-only,
   * auto-generated field.
   */
  campaignIdDimensionValue?: DimensionValue;
  /**
   * IDs of placements which are assigned to this placement group. This is a
   * read-only, auto-generated field.
   */
  childPlacementIds?: bigint[];
  /**
   * Comments for this placement group.
   */
  comment?: string;
  /**
   * ID of the content category assigned to this placement group.
   */
  contentCategoryId?: bigint;
  /**
   * Information about the creation of this placement group. This is a
   * read-only field.
   */
  createInfo?: LastModifiedInfo;
  /**
   * Directory site ID associated with this placement group. On insert, you
   * must set either this field or the site_id field to specify the site
   * associated with this placement group. This is a required field that is
   * read-only after insertion.
   */
  directorySiteId?: bigint;
  /**
   * Dimension value for the ID of the directory site. This is a read-only,
   * auto-generated field.
   */
  directorySiteIdDimensionValue?: DimensionValue;
  /**
   * External ID for this placement.
   */
  externalId?: string;
  /**
   * ID of this placement group. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this placement group. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementGroup".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this placement group.
   * This is a read-only field.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Name of this placement group. This is a required field and must be less
   * than 256 characters long.
   */
  name?: string;
  /**
   * Type of this placement group. A package is a simple group of placements
   * that acts as a single pricing point for a group of tags. A roadblock is a
   * group of placements that not only acts as a single pricing point, but also
   * assumes that all the tags in it will be served at the same time. A
   * roadblock requires one of its assigned placements to be marked as primary
   * for reporting. This field is required on insertion.
   */
  placementGroupType?:  | "PLACEMENT_PACKAGE" | "PLACEMENT_ROADBLOCK";
  /**
   * ID of the placement strategy assigned to this placement group.
   */
  placementStrategyId?: bigint;
  /**
   * Pricing schedule of this placement group. This field is required on
   * insertion.
   */
  pricingSchedule?: PricingSchedule;
  /**
   * ID of the primary placement, used to calculate the media cost of a
   * roadblock (placement group). Modifying this field will automatically modify
   * the primary field on all affected roadblock child placements.
   */
  primaryPlacementId?: bigint;
  /**
   * Dimension value for the ID of the primary placement. This is a read-only,
   * auto-generated field.
   */
  primaryPlacementIdDimensionValue?: DimensionValue;
  /**
   * Site ID associated with this placement group. On insert, you must set
   * either this field or the directorySiteId field to specify the site
   * associated with this placement group. This is a required field that is
   * read-only after insertion.
   */
  siteId?: bigint;
  /**
   * Dimension value for the ID of the site. This is a read-only,
   * auto-generated field.
   */
  siteIdDimensionValue?: DimensionValue;
  /**
   * Subaccount ID of this placement group. This is a read-only field that can
   * be left blank.
   */
  subaccountId?: bigint;
}

function serializePlacementGroup(data: any): PlacementGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    childPlacementIds: data["childPlacementIds"] !== undefined ? data["childPlacementIds"].map((item: any) => (String(item))) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? String(data["contentCategoryId"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? serializeLastModifiedInfo(data["createInfo"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? String(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? String(data["placementStrategyId"]) : undefined,
    pricingSchedule: data["pricingSchedule"] !== undefined ? serializePricingSchedule(data["pricingSchedule"]) : undefined,
    primaryPlacementId: data["primaryPlacementId"] !== undefined ? String(data["primaryPlacementId"]) : undefined,
    siteId: data["siteId"] !== undefined ? String(data["siteId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializePlacementGroup(data: any): PlacementGroup {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    childPlacementIds: data["childPlacementIds"] !== undefined ? data["childPlacementIds"].map((item: any) => (BigInt(item))) : undefined,
    contentCategoryId: data["contentCategoryId"] !== undefined ? BigInt(data["contentCategoryId"]) : undefined,
    createInfo: data["createInfo"] !== undefined ? deserializeLastModifiedInfo(data["createInfo"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? BigInt(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    placementStrategyId: data["placementStrategyId"] !== undefined ? BigInt(data["placementStrategyId"]) : undefined,
    pricingSchedule: data["pricingSchedule"] !== undefined ? deserializePricingSchedule(data["pricingSchedule"]) : undefined,
    primaryPlacementId: data["primaryPlacementId"] !== undefined ? BigInt(data["primaryPlacementId"]) : undefined,
    siteId: data["siteId"] !== undefined ? BigInt(data["siteId"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#placementGroupsList.
 */
export interface PlacementGroupsListOptions {
  /**
   * Select only placements with these active statuses.
   */
  activeStatus?:  | "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED";
  /**
   * Select only placement groups that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only placement groups that belong to these campaigns.
   */
  campaignIds?: bigint;
  /**
   * Select only placement groups that are associated with these content
   * categories.
   */
  contentCategoryIds?: bigint;
  /**
   * Select only placement groups that are associated with these directory
   * sites.
   */
  directorySiteIds?: bigint;
  /**
   * Select only placement groups with these IDs.
   */
  ids?: bigint;
  /**
   * Select only placements or placement groups whose end date is on or before
   * the specified maxEndDate. The date should be formatted as "yyyy-MM-dd".
   */
  maxEndDate?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only placements or placement groups whose start date is on or
   * before the specified maxStartDate. The date should be formatted as
   * "yyyy-MM-dd".
   */
  maxStartDate?: string;
  /**
   * Select only placements or placement groups whose end date is on or after
   * the specified minEndDate. The date should be formatted as "yyyy-MM-dd".
   */
  minEndDate?: string;
  /**
   * Select only placements or placement groups whose start date is on or after
   * the specified minStartDate. The date should be formatted as "yyyy-MM-dd".
   */
  minStartDate?: string;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only placement groups belonging with this group type. A package is
   * a simple group of placements that acts as a single pricing point for a
   * group of tags. A roadblock is a group of placements that not only acts as a
   * single pricing point but also assumes that all the tags in it will be
   * served at the same time. A roadblock requires one of its assigned
   * placements to be marked as primary for reporting.
   */
  placementGroupType?:  | "PLACEMENT_PACKAGE" | "PLACEMENT_ROADBLOCK";
  /**
   * Select only placement groups that are associated with these placement
   * strategies.
   */
  placementStrategyIds?: bigint;
  /**
   * Select only placement groups with these pricing types.
   */
  pricingTypes?:  | "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW";
  /**
   * Allows searching for placement groups by name or ID. Wildcards (*) are
   * allowed. For example, "placement*2015" will return placement groups with
   * names like "placement group June 2015", "placement group May 2015", or
   * simply "placements 2015". Most of the searches also add wildcards
   * implicitly at the start and the end of the search string. For example, a
   * search string of "placementgroup" will match placement groups with name "my
   * placementgroup", "placementgroup 2015", or simply "placementgroup".
   */
  searchString?: string;
  /**
   * Select only placement groups that are associated with these sites.
   */
  siteIds?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializePlacementGroupsListOptions(data: any): PlacementGroupsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? String(data["campaignIds"]) : undefined,
    contentCategoryIds: data["contentCategoryIds"] !== undefined ? String(data["contentCategoryIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? String(data["directorySiteIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    placementStrategyIds: data["placementStrategyIds"] !== undefined ? String(data["placementStrategyIds"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? String(data["siteIds"]) : undefined,
  };
}

function deserializePlacementGroupsListOptions(data: any): PlacementGroupsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? BigInt(data["campaignIds"]) : undefined,
    contentCategoryIds: data["contentCategoryIds"] !== undefined ? BigInt(data["contentCategoryIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? BigInt(data["directorySiteIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    placementStrategyIds: data["placementStrategyIds"] !== undefined ? BigInt(data["placementStrategyIds"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? BigInt(data["siteIds"]) : undefined,
  };
}

/**
 * Placement Group List Response
 */
export interface PlacementGroupsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementGroupsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Placement group collection.
   */
  placementGroups?: PlacementGroup[];
}

function serializePlacementGroupsListResponse(data: any): PlacementGroupsListResponse {
  return {
    ...data,
    placementGroups: data["placementGroups"] !== undefined ? data["placementGroups"].map((item: any) => (serializePlacementGroup(item))) : undefined,
  };
}

function deserializePlacementGroupsListResponse(data: any): PlacementGroupsListResponse {
  return {
    ...data,
    placementGroups: data["placementGroups"] !== undefined ? data["placementGroups"].map((item: any) => (deserializePlacementGroup(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#placementGroupsPatch.
 */
export interface PlacementGroupsPatchOptions {
  /**
   * PlacementGroup ID.
   */
  id: bigint;
}

function serializePlacementGroupsPatchOptions(data: any): PlacementGroupsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializePlacementGroupsPatchOptions(data: any): PlacementGroupsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Additional options for dfareporting#placementsGeneratetags.
 */
export interface PlacementsGeneratetagsOptions {
  /**
   * Generate placements belonging to this campaign. This is a required field.
   */
  campaignId?: bigint;
  /**
   * Generate tags for these placements.
   */
  placementIds?: bigint;
  /**
   * Tag formats to generate for these placements. *Note:*
   * PLACEMENT_TAG_STANDARD can only be generated for 1x1 placements.
   */
  tagFormats?:  | "PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT";
}

function serializePlacementsGeneratetagsOptions(data: any): PlacementsGeneratetagsOptions {
  return {
    ...data,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    placementIds: data["placementIds"] !== undefined ? String(data["placementIds"]) : undefined,
  };
}

function deserializePlacementsGeneratetagsOptions(data: any): PlacementsGeneratetagsOptions {
  return {
    ...data,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    placementIds: data["placementIds"] !== undefined ? BigInt(data["placementIds"]) : undefined,
  };
}

/**
 * Placement GenerateTags Response
 */
export interface PlacementsGenerateTagsResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementsGenerateTagsResponse".
   */
  kind?: string;
  /**
   * Set of generated tags for the specified placements.
   */
  placementTags?: PlacementTag[];
}

function serializePlacementsGenerateTagsResponse(data: any): PlacementsGenerateTagsResponse {
  return {
    ...data,
    placementTags: data["placementTags"] !== undefined ? data["placementTags"].map((item: any) => (serializePlacementTag(item))) : undefined,
  };
}

function deserializePlacementsGenerateTagsResponse(data: any): PlacementsGenerateTagsResponse {
  return {
    ...data,
    placementTags: data["placementTags"] !== undefined ? data["placementTags"].map((item: any) => (deserializePlacementTag(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#placementsList.
 */
export interface PlacementsListOptions {
  /**
   * Select only placements with these active statuses.
   */
  activeStatus?:  | "PLACEMENT_STATUS_UNKNOWN" | "PLACEMENT_STATUS_ACTIVE" | "PLACEMENT_STATUS_INACTIVE" | "PLACEMENT_STATUS_ARCHIVED" | "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED";
  /**
   * Select only placements that belong to these advertisers.
   */
  advertiserIds?: bigint;
  /**
   * Select only placements that belong to these campaigns.
   */
  campaignIds?: bigint;
  /**
   * Select only placements that are associated with these compatibilities.
   * DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on
   * mobile devices for regular or interstitial ads respectively. APP and
   * APP_INTERSTITIAL are for rendering in mobile apps. IN_STREAM_VIDEO refers
   * to rendering in in-stream video ads developed with the VAST standard.
   */
  compatibilities?:  | "DISPLAY" | "DISPLAY_INTERSTITIAL" | "APP" | "APP_INTERSTITIAL" | "IN_STREAM_VIDEO" | "IN_STREAM_AUDIO";
  /**
   * Select only placements that are associated with these content categories.
   */
  contentCategoryIds?: bigint;
  /**
   * Select only placements that are associated with these directory sites.
   */
  directorySiteIds?: bigint;
  /**
   * Select only placements that belong to these placement groups.
   */
  groupIds?: bigint;
  /**
   * Select only placements with these IDs.
   */
  ids?: bigint;
  /**
   * Select only placements or placement groups whose end date is on or before
   * the specified maxEndDate. The date should be formatted as "yyyy-MM-dd".
   */
  maxEndDate?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Select only placements or placement groups whose start date is on or
   * before the specified maxStartDate. The date should be formatted as
   * "yyyy-MM-dd".
   */
  maxStartDate?: string;
  /**
   * Select only placements or placement groups whose end date is on or after
   * the specified minEndDate. The date should be formatted as "yyyy-MM-dd".
   */
  minEndDate?: string;
  /**
   * Select only placements or placement groups whose start date is on or after
   * the specified minStartDate. The date should be formatted as "yyyy-MM-dd".
   */
  minStartDate?: string;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Select only placements with this payment source.
   */
  paymentSource?:  | "PLACEMENT_AGENCY_PAID" | "PLACEMENT_PUBLISHER_PAID";
  /**
   * Select only placements that are associated with these placement
   * strategies.
   */
  placementStrategyIds?: bigint;
  /**
   * Select only placements with these pricing types.
   */
  pricingTypes?:  | "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW";
  /**
   * Allows searching for placements by name or ID. Wildcards (*) are allowed.
   * For example, "placement*2015" will return placements with names like
   * "placement June 2015", "placement May 2015", or simply "placements 2015".
   * Most of the searches also add wildcards implicitly at the start and the end
   * of the search string. For example, a search string of "placement" will
   * match placements with name "my placement", "placement 2015", or simply
   * "placement" .
   */
  searchString?: string;
  /**
   * Select only placements that are associated with these sites.
   */
  siteIds?: bigint;
  /**
   * Select only placements that are associated with these sizes.
   */
  sizeIds?: bigint;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializePlacementsListOptions(data: any): PlacementsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? String(data["campaignIds"]) : undefined,
    contentCategoryIds: data["contentCategoryIds"] !== undefined ? String(data["contentCategoryIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? String(data["directorySiteIds"]) : undefined,
    groupIds: data["groupIds"] !== undefined ? String(data["groupIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    placementStrategyIds: data["placementStrategyIds"] !== undefined ? String(data["placementStrategyIds"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? String(data["siteIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? String(data["sizeIds"]) : undefined,
  };
}

function deserializePlacementsListOptions(data: any): PlacementsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? BigInt(data["campaignIds"]) : undefined,
    contentCategoryIds: data["contentCategoryIds"] !== undefined ? BigInt(data["contentCategoryIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? BigInt(data["directorySiteIds"]) : undefined,
    groupIds: data["groupIds"] !== undefined ? BigInt(data["groupIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    placementStrategyIds: data["placementStrategyIds"] !== undefined ? BigInt(data["placementStrategyIds"]) : undefined,
    siteIds: data["siteIds"] !== undefined ? BigInt(data["siteIds"]) : undefined,
    sizeIds: data["sizeIds"] !== undefined ? BigInt(data["sizeIds"]) : undefined,
  };
}

/**
 * Placement List Response
 */
export interface PlacementsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Placement collection.
   */
  placements?: Placement[];
}

function serializePlacementsListResponse(data: any): PlacementsListResponse {
  return {
    ...data,
    placements: data["placements"] !== undefined ? data["placements"].map((item: any) => (serializePlacement(item))) : undefined,
  };
}

function deserializePlacementsListResponse(data: any): PlacementsListResponse {
  return {
    ...data,
    placements: data["placements"] !== undefined ? data["placements"].map((item: any) => (deserializePlacement(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#placementsPatch.
 */
export interface PlacementsPatchOptions {
  /**
   * Placement ID.
   */
  id: bigint;
}

function serializePlacementsPatchOptions(data: any): PlacementsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializePlacementsPatchOptions(data: any): PlacementsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Additional options for dfareporting#placementStrategiesList.
 */
export interface PlacementStrategiesListOptions {
  /**
   * Select only placement strategies with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "placementstrategy*2015" will return objects with names like
   * "placementstrategy June 2015", "placementstrategy April 2015", or simply
   * "placementstrategy 2015". Most of the searches also add wildcards
   * implicitly at the start and the end of the search string. For example, a
   * search string of "placementstrategy" will match objects with name "my
   * placementstrategy", "placementstrategy 2015", or simply
   * "placementstrategy".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializePlacementStrategiesListOptions(data: any): PlacementStrategiesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializePlacementStrategiesListOptions(data: any): PlacementStrategiesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Placement Strategy List Response
 */
export interface PlacementStrategiesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementStrategiesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Placement strategy collection.
   */
  placementStrategies?: PlacementStrategy[];
}

function serializePlacementStrategiesListResponse(data: any): PlacementStrategiesListResponse {
  return {
    ...data,
    placementStrategies: data["placementStrategies"] !== undefined ? data["placementStrategies"].map((item: any) => (serializePlacementStrategy(item))) : undefined,
  };
}

function deserializePlacementStrategiesListResponse(data: any): PlacementStrategiesListResponse {
  return {
    ...data,
    placementStrategies: data["placementStrategies"] !== undefined ? data["placementStrategies"].map((item: any) => (deserializePlacementStrategy(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#placementStrategiesPatch.
 */
export interface PlacementStrategiesPatchOptions {
  /**
   * PlacementStrategy ID.
   */
  id: bigint;
}

function serializePlacementStrategiesPatchOptions(data: any): PlacementStrategiesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializePlacementStrategiesPatchOptions(data: any): PlacementStrategiesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Contains properties of a placement strategy.
 */
export interface PlacementStrategy {
  /**
   * Account ID of this placement strategy.This is a read-only field that can
   * be left blank.
   */
  accountId?: bigint;
  /**
   * ID of this placement strategy. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#placementStrategy".
   */
  kind?: string;
  /**
   * Name of this placement strategy. This is a required field. It must be less
   * than 256 characters long and unique among placement strategies of the same
   * account.
   */
  name?: string;
}

function serializePlacementStrategy(data: any): PlacementStrategy {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializePlacementStrategy(data: any): PlacementStrategy {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Placement Tag
 */
export interface PlacementTag {
  /**
   * Placement ID
   */
  placementId?: bigint;
  /**
   * Tags generated for this placement.
   */
  tagDatas?: TagData[];
}

function serializePlacementTag(data: any): PlacementTag {
  return {
    ...data,
    placementId: data["placementId"] !== undefined ? String(data["placementId"]) : undefined,
    tagDatas: data["tagDatas"] !== undefined ? data["tagDatas"].map((item: any) => (serializeTagData(item))) : undefined,
  };
}

function deserializePlacementTag(data: any): PlacementTag {
  return {
    ...data,
    placementId: data["placementId"] !== undefined ? BigInt(data["placementId"]) : undefined,
    tagDatas: data["tagDatas"] !== undefined ? data["tagDatas"].map((item: any) => (deserializeTagData(item))) : undefined,
  };
}

/**
 * Contains information about a platform type that can be targeted by ads.
 */
export interface PlatformType {
  /**
   * ID of this platform type.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#platformType".
   */
  kind?: string;
  /**
   * Name of this platform type.
   */
  name?: string;
}

function serializePlatformType(data: any): PlatformType {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializePlatformType(data: any): PlatformType {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Platform Type List Response
 */
export interface PlatformTypesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#platformTypesListResponse".
   */
  kind?: string;
  /**
   * Platform type collection.
   */
  platformTypes?: PlatformType[];
}

function serializePlatformTypesListResponse(data: any): PlatformTypesListResponse {
  return {
    ...data,
    platformTypes: data["platformTypes"] !== undefined ? data["platformTypes"].map((item: any) => (serializePlatformType(item))) : undefined,
  };
}

function deserializePlatformTypesListResponse(data: any): PlatformTypesListResponse {
  return {
    ...data,
    platformTypes: data["platformTypes"] !== undefined ? data["platformTypes"].map((item: any) => (deserializePlatformType(item))) : undefined,
  };
}

/**
 * Popup Window Properties.
 */
export interface PopupWindowProperties {
  /**
   * Popup dimension for a creative. This is a read-only field. Applicable to
   * the following creative types: all RICH_MEDIA and all VPAID
   */
  dimension?: Size;
  /**
   * Upper-left corner coordinates of the popup window. Applicable if
   * positionType is COORDINATES.
   */
  offset?: OffsetPosition;
  /**
   * Popup window position either centered or at specific coordinate.
   */
  positionType?:  | "CENTER" | "COORDINATES";
  /**
   * Whether to display the browser address bar.
   */
  showAddressBar?: boolean;
  /**
   * Whether to display the browser menu bar.
   */
  showMenuBar?: boolean;
  /**
   * Whether to display the browser scroll bar.
   */
  showScrollBar?: boolean;
  /**
   * Whether to display the browser status bar.
   */
  showStatusBar?: boolean;
  /**
   * Whether to display the browser tool bar.
   */
  showToolBar?: boolean;
  /**
   * Title of popup window.
   */
  title?: string;
}

function serializePopupWindowProperties(data: any): PopupWindowProperties {
  return {
    ...data,
    dimension: data["dimension"] !== undefined ? serializeSize(data["dimension"]) : undefined,
  };
}

function deserializePopupWindowProperties(data: any): PopupWindowProperties {
  return {
    ...data,
    dimension: data["dimension"] !== undefined ? deserializeSize(data["dimension"]) : undefined,
  };
}

/**
 * Contains information about a postal code that can be targeted by ads.
 */
export interface PostalCode {
  /**
   * Postal code. This is equivalent to the id field.
   */
  code?: string;
  /**
   * Country code of the country to which this postal code belongs.
   */
  countryCode?: string;
  /**
   * DART ID of the country to which this postal code belongs.
   */
  countryDartId?: bigint;
  /**
   * ID of this postal code.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#postalCode".
   */
  kind?: string;
}

function serializePostalCode(data: any): PostalCode {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? String(data["countryDartId"]) : undefined,
  };
}

function deserializePostalCode(data: any): PostalCode {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? BigInt(data["countryDartId"]) : undefined,
  };
}

/**
 * Postal Code List Response
 */
export interface PostalCodesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#postalCodesListResponse".
   */
  kind?: string;
  /**
   * Postal code collection.
   */
  postalCodes?: PostalCode[];
}

function serializePostalCodesListResponse(data: any): PostalCodesListResponse {
  return {
    ...data,
    postalCodes: data["postalCodes"] !== undefined ? data["postalCodes"].map((item: any) => (serializePostalCode(item))) : undefined,
  };
}

function deserializePostalCodesListResponse(data: any): PostalCodesListResponse {
  return {
    ...data,
    postalCodes: data["postalCodes"] !== undefined ? data["postalCodes"].map((item: any) => (deserializePostalCode(item))) : undefined,
  };
}

/**
 * Pricing Information
 */
export interface Pricing {
  /**
   * Cap cost type of this inventory item.
   */
  capCostType?:  | "PLANNING_PLACEMENT_CAP_COST_TYPE_NONE" | "PLANNING_PLACEMENT_CAP_COST_TYPE_MONTHLY" | "PLANNING_PLACEMENT_CAP_COST_TYPE_CUMULATIVE";
  endDate?: Date;
  /**
   * Flights of this inventory item. A flight (a.k.a. pricing period)
   * represents the inventory item pricing information for a specific period of
   * time.
   */
  flights?: Flight[];
  /**
   * Group type of this inventory item if it represents a placement group. Is
   * null otherwise. There are two type of placement groups:
   * PLANNING_PLACEMENT_GROUP_TYPE_PACKAGE is a simple group of inventory items
   * that acts as a single pricing point for a group of tags.
   * PLANNING_PLACEMENT_GROUP_TYPE_ROADBLOCK is a group of inventory items that
   * not only acts as a single pricing point, but also assumes that all the tags
   * in it will be served at the same time. A roadblock requires one of its
   * assigned inventory items to be marked as primary.
   */
  groupType?:  | "PLANNING_PLACEMENT_GROUP_TYPE_PACKAGE" | "PLANNING_PLACEMENT_GROUP_TYPE_ROADBLOCK";
  /**
   * Pricing type of this inventory item.
   */
  pricingType?:  | "PLANNING_PLACEMENT_PRICING_TYPE_IMPRESSIONS" | "PLANNING_PLACEMENT_PRICING_TYPE_CPM" | "PLANNING_PLACEMENT_PRICING_TYPE_CLICKS" | "PLANNING_PLACEMENT_PRICING_TYPE_CPC" | "PLANNING_PLACEMENT_PRICING_TYPE_CPA" | "PLANNING_PLACEMENT_PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PLANNING_PLACEMENT_PRICING_TYPE_FLAT_RATE_CLICKS" | "PLANNING_PLACEMENT_PRICING_TYPE_CPM_ACTIVEVIEW";
  startDate?: Date;
}

function serializePricing(data: any): Pricing {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    flights: data["flights"] !== undefined ? data["flights"].map((item: any) => (serializeFlight(item))) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
  };
}

function deserializePricing(data: any): Pricing {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    flights: data["flights"] !== undefined ? data["flights"].map((item: any) => (deserializeFlight(item))) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
  };
}

/**
 * Pricing Schedule
 */
export interface PricingSchedule {
  /**
   * Placement cap cost option.
   */
  capCostOption?:  | "CAP_COST_NONE" | "CAP_COST_MONTHLY" | "CAP_COST_CUMULATIVE";
  endDate?: Date;
  /**
   * Whether this placement is flighted. If true, pricing periods will be
   * computed automatically.
   */
  flighted?: boolean;
  /**
   * Floodlight activity ID associated with this placement. This field should
   * be set when placement pricing type is set to PRICING_TYPE_CPA.
   */
  floodlightActivityId?: bigint;
  /**
   * Pricing periods for this placement.
   */
  pricingPeriods?: PricingSchedulePricingPeriod[];
  /**
   * Placement pricing type. This field is required on insertion.
   */
  pricingType?:  | "PRICING_TYPE_CPM" | "PRICING_TYPE_CPC" | "PRICING_TYPE_CPA" | "PRICING_TYPE_FLAT_RATE_IMPRESSIONS" | "PRICING_TYPE_FLAT_RATE_CLICKS" | "PRICING_TYPE_CPM_ACTIVEVIEW";
  startDate?: Date;
  testingStartDate?: Date;
}

function serializePricingSchedule(data: any): PricingSchedule {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
    pricingPeriods: data["pricingPeriods"] !== undefined ? data["pricingPeriods"].map((item: any) => (serializePricingSchedulePricingPeriod(item))) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
    testingStartDate: data["testingStartDate"] !== undefined ? data["testingStartDate"].toISOString() : undefined,
  };
}

function deserializePricingSchedule(data: any): PricingSchedule {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
    pricingPeriods: data["pricingPeriods"] !== undefined ? data["pricingPeriods"].map((item: any) => (deserializePricingSchedulePricingPeriod(item))) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
    testingStartDate: data["testingStartDate"] !== undefined ? new Date(data["testingStartDate"]) : undefined,
  };
}

/**
 * Pricing Period
 */
export interface PricingSchedulePricingPeriod {
  endDate?: Date;
  /**
   * Comments for this pricing period.
   */
  pricingComment?: string;
  /**
   * Rate or cost of this pricing period in nanos (i.e., multipled by
   * 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive.
   */
  rateOrCostNanos?: bigint;
  startDate?: Date;
  /**
   * Units of this pricing period. Acceptable values are 0 to 10000000000,
   * inclusive.
   */
  units?: bigint;
}

function serializePricingSchedulePricingPeriod(data: any): PricingSchedulePricingPeriod {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    rateOrCostNanos: data["rateOrCostNanos"] !== undefined ? String(data["rateOrCostNanos"]) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializePricingSchedulePricingPeriod(data: any): PricingSchedulePricingPeriod {
  return {
    ...data,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    rateOrCostNanos: data["rateOrCostNanos"] !== undefined ? BigInt(data["rateOrCostNanos"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Contains properties of a Planning project.
 */
export interface Project {
  /**
   * Account ID of this project.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this project.
   */
  advertiserId?: bigint;
  /**
   * Audience age group of this project.
   */
  audienceAgeGroup?:  | "PLANNING_AUDIENCE_AGE_18_24" | "PLANNING_AUDIENCE_AGE_25_34" | "PLANNING_AUDIENCE_AGE_35_44" | "PLANNING_AUDIENCE_AGE_45_54" | "PLANNING_AUDIENCE_AGE_55_64" | "PLANNING_AUDIENCE_AGE_65_OR_MORE" | "PLANNING_AUDIENCE_AGE_UNKNOWN";
  /**
   * Audience gender of this project.
   */
  audienceGender?:  | "PLANNING_AUDIENCE_GENDER_MALE" | "PLANNING_AUDIENCE_GENDER_FEMALE";
  /**
   * Budget of this project in the currency specified by the current account.
   * The value stored in this field represents only the non-fractional amount.
   * For example, for USD, the smallest value that can be represented by this
   * field is 1 US dollar.
   */
  budget?: bigint;
  /**
   * Client billing code of this project.
   */
  clientBillingCode?: string;
  /**
   * Name of the project client.
   */
  clientName?: string;
  endDate?: Date;
  /**
   * ID of this project. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#project".
   */
  kind?: string;
  /**
   * Information about the most recent modification of this project.
   */
  lastModifiedInfo?: LastModifiedInfo;
  /**
   * Name of this project.
   */
  name?: string;
  /**
   * Overview of this project.
   */
  overview?: string;
  startDate?: Date;
  /**
   * Subaccount ID of this project.
   */
  subaccountId?: bigint;
  /**
   * Number of clicks that the advertiser is targeting.
   */
  targetClicks?: bigint;
  /**
   * Number of conversions that the advertiser is targeting.
   */
  targetConversions?: bigint;
  /**
   * CPA that the advertiser is targeting.
   */
  targetCpaNanos?: bigint;
  /**
   * CPC that the advertiser is targeting.
   */
  targetCpcNanos?: bigint;
  /**
   * vCPM from Active View that the advertiser is targeting.
   */
  targetCpmActiveViewNanos?: bigint;
  /**
   * CPM that the advertiser is targeting.
   */
  targetCpmNanos?: bigint;
  /**
   * Number of impressions that the advertiser is targeting.
   */
  targetImpressions?: bigint;
}

function serializeProject(data: any): Project {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    budget: data["budget"] !== undefined ? String(data["budget"]) : undefined,
    endDate: data["endDate"] !== undefined ? data["endDate"].toISOString() : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? serializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    startDate: data["startDate"] !== undefined ? data["startDate"].toISOString() : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    targetClicks: data["targetClicks"] !== undefined ? String(data["targetClicks"]) : undefined,
    targetConversions: data["targetConversions"] !== undefined ? String(data["targetConversions"]) : undefined,
    targetCpaNanos: data["targetCpaNanos"] !== undefined ? String(data["targetCpaNanos"]) : undefined,
    targetCpcNanos: data["targetCpcNanos"] !== undefined ? String(data["targetCpcNanos"]) : undefined,
    targetCpmActiveViewNanos: data["targetCpmActiveViewNanos"] !== undefined ? String(data["targetCpmActiveViewNanos"]) : undefined,
    targetCpmNanos: data["targetCpmNanos"] !== undefined ? String(data["targetCpmNanos"]) : undefined,
    targetImpressions: data["targetImpressions"] !== undefined ? String(data["targetImpressions"]) : undefined,
  };
}

function deserializeProject(data: any): Project {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    budget: data["budget"] !== undefined ? BigInt(data["budget"]) : undefined,
    endDate: data["endDate"] !== undefined ? new Date(data["endDate"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedInfo: data["lastModifiedInfo"] !== undefined ? deserializeLastModifiedInfo(data["lastModifiedInfo"]) : undefined,
    startDate: data["startDate"] !== undefined ? new Date(data["startDate"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    targetClicks: data["targetClicks"] !== undefined ? BigInt(data["targetClicks"]) : undefined,
    targetConversions: data["targetConversions"] !== undefined ? BigInt(data["targetConversions"]) : undefined,
    targetCpaNanos: data["targetCpaNanos"] !== undefined ? BigInt(data["targetCpaNanos"]) : undefined,
    targetCpcNanos: data["targetCpcNanos"] !== undefined ? BigInt(data["targetCpcNanos"]) : undefined,
    targetCpmActiveViewNanos: data["targetCpmActiveViewNanos"] !== undefined ? BigInt(data["targetCpmActiveViewNanos"]) : undefined,
    targetCpmNanos: data["targetCpmNanos"] !== undefined ? BigInt(data["targetCpmNanos"]) : undefined,
    targetImpressions: data["targetImpressions"] !== undefined ? BigInt(data["targetImpressions"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#projectsList.
 */
export interface ProjectsListOptions {
  /**
   * Select only projects with these advertiser IDs.
   */
  advertiserIds?: bigint;
  /**
   * Select only projects with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for projects by name or ID. Wildcards (*) are allowed.
   * For example, "project*2015" will return projects with names like "project
   * June 2015", "project April 2015", or simply "project 2015". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "project" will match
   * projects with name "my project", "project 2015", or simply "project".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeProjectsListOptions(data: any): ProjectsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? String(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeProjectsListOptions(data: any): ProjectsListOptions {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? BigInt(data["advertiserIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Project List Response
 */
export interface ProjectsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#projectsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Project collection.
   */
  projects?: Project[];
}

function serializeProjectsListResponse(data: any): ProjectsListResponse {
  return {
    ...data,
    projects: data["projects"] !== undefined ? data["projects"].map((item: any) => (serializeProject(item))) : undefined,
  };
}

function deserializeProjectsListResponse(data: any): ProjectsListResponse {
  return {
    ...data,
    projects: data["projects"] !== undefined ? data["projects"].map((item: any) => (deserializeProject(item))) : undefined,
  };
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "REACH".
 */
export interface ReachReportCompatibleFields {
  /**
   * Dimensions which are compatible to be selected in the "dimensionFilters"
   * section of the report.
   */
  dimensionFilters?: Dimension[];
  /**
   * Dimensions which are compatible to be selected in the "dimensions" section
   * of the report.
   */
  dimensions?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#reachReportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
  /**
   * Metrics which are compatible to be selected as activity metrics to pivot
   * on in the "activities" section of the report.
   */
  pivotedActivityMetrics?: Metric[];
  /**
   * Metrics which are compatible to be selected in the
   * "reachByFrequencyMetricNames" section of the report.
   */
  reachByFrequencyMetrics?: Metric[];
}

/**
 * Represents a recipient.
 */
export interface Recipient {
  /**
   * The delivery type for the recipient.
   */
  deliveryType?:  | "LINK" | "ATTACHMENT";
  /**
   * The email address of the recipient.
   */
  email?: string;
  /**
   * The kind of resource this is, in this case dfareporting#recipient.
   */
  kind?: string;
}

/**
 * Contains information about a region that can be targeted by ads.
 */
export interface Region {
  /**
   * Country code of the country to which this region belongs.
   */
  countryCode?: string;
  /**
   * DART ID of the country to which this region belongs.
   */
  countryDartId?: bigint;
  /**
   * DART ID of this region.
   */
  dartId?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#region".
   */
  kind?: string;
  /**
   * Name of this region.
   */
  name?: string;
  /**
   * Region code.
   */
  regionCode?: string;
}

function serializeRegion(data: any): Region {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? String(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? String(data["dartId"]) : undefined,
  };
}

function deserializeRegion(data: any): Region {
  return {
    ...data,
    countryDartId: data["countryDartId"] !== undefined ? BigInt(data["countryDartId"]) : undefined,
    dartId: data["dartId"] !== undefined ? BigInt(data["dartId"]) : undefined,
  };
}

/**
 * Region List Response
 */
export interface RegionsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#regionsListResponse".
   */
  kind?: string;
  /**
   * Region collection.
   */
  regions?: Region[];
}

function serializeRegionsListResponse(data: any): RegionsListResponse {
  return {
    ...data,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (serializeRegion(item))) : undefined,
  };
}

function deserializeRegionsListResponse(data: any): RegionsListResponse {
  return {
    ...data,
    regions: data["regions"] !== undefined ? data["regions"].map((item: any) => (deserializeRegion(item))) : undefined,
  };
}

/**
 * Contains properties of a remarketing list. Remarketing enables you to create
 * lists of users who have performed specific actions on a site, then target ads
 * to members of those lists. This resource can be used to manage remarketing
 * lists that are owned by your advertisers. To see all remarketing lists that
 * are visible to your advertisers, including those that are shared to your
 * advertiser or account, use the TargetableRemarketingLists resource.
 */
export interface RemarketingList {
  /**
   * Account ID of this remarketing list. This is a read-only, auto-generated
   * field that is only returned in GET requests.
   */
  accountId?: bigint;
  /**
   * Whether this remarketing list is active.
   */
  active?: boolean;
  /**
   * Dimension value for the advertiser ID that owns this remarketing list.
   * This is a required field.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Remarketing list description.
   */
  description?: string;
  /**
   * Remarketing list ID. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#remarketingList".
   */
  kind?: string;
  /**
   * Number of days that a user should remain in the remarketing list without
   * an impression. Acceptable values are 1 to 540, inclusive.
   */
  lifeSpan?: bigint;
  /**
   * Rule used to populate the remarketing list with users.
   */
  listPopulationRule?: ListPopulationRule;
  /**
   * Number of users currently in the list. This is a read-only field.
   */
  listSize?: bigint;
  /**
   * Product from which this remarketing list was originated.
   */
  listSource?:  | "REMARKETING_LIST_SOURCE_OTHER" | "REMARKETING_LIST_SOURCE_ADX" | "REMARKETING_LIST_SOURCE_DFP" | "REMARKETING_LIST_SOURCE_XFP" | "REMARKETING_LIST_SOURCE_DFA" | "REMARKETING_LIST_SOURCE_GA" | "REMARKETING_LIST_SOURCE_YOUTUBE" | "REMARKETING_LIST_SOURCE_DBM" | "REMARKETING_LIST_SOURCE_GPLUS" | "REMARKETING_LIST_SOURCE_DMP" | "REMARKETING_LIST_SOURCE_PLAY_STORE";
  /**
   * Name of the remarketing list. This is a required field. Must be no greater
   * than 128 characters long.
   */
  name?: string;
  /**
   * Subaccount ID of this remarketing list. This is a read-only,
   * auto-generated field that is only returned in GET requests.
   */
  subaccountId?: bigint;
}

function serializeRemarketingList(data: any): RemarketingList {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lifeSpan: data["lifeSpan"] !== undefined ? String(data["lifeSpan"]) : undefined,
    listPopulationRule: data["listPopulationRule"] !== undefined ? serializeListPopulationRule(data["listPopulationRule"]) : undefined,
    listSize: data["listSize"] !== undefined ? String(data["listSize"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeRemarketingList(data: any): RemarketingList {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lifeSpan: data["lifeSpan"] !== undefined ? BigInt(data["lifeSpan"]) : undefined,
    listPopulationRule: data["listPopulationRule"] !== undefined ? deserializeListPopulationRule(data["listPopulationRule"]) : undefined,
    listSize: data["listSize"] !== undefined ? BigInt(data["listSize"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Contains properties of a remarketing list's sharing information. Sharing
 * allows other accounts or advertisers to target to your remarketing lists.
 * This resource can be used to manage remarketing list sharing to other
 * accounts and advertisers.
 */
export interface RemarketingListShare {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#remarketingListShare".
   */
  kind?: string;
  /**
   * Remarketing list ID. This is a read-only, auto-generated field.
   */
  remarketingListId?: bigint;
  /**
   * Accounts that the remarketing list is shared with.
   */
  sharedAccountIds?: bigint[];
  /**
   * Advertisers that the remarketing list is shared with.
   */
  sharedAdvertiserIds?: bigint[];
}

function serializeRemarketingListShare(data: any): RemarketingListShare {
  return {
    ...data,
    remarketingListId: data["remarketingListId"] !== undefined ? String(data["remarketingListId"]) : undefined,
    sharedAccountIds: data["sharedAccountIds"] !== undefined ? data["sharedAccountIds"].map((item: any) => (String(item))) : undefined,
    sharedAdvertiserIds: data["sharedAdvertiserIds"] !== undefined ? data["sharedAdvertiserIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeRemarketingListShare(data: any): RemarketingListShare {
  return {
    ...data,
    remarketingListId: data["remarketingListId"] !== undefined ? BigInt(data["remarketingListId"]) : undefined,
    sharedAccountIds: data["sharedAccountIds"] !== undefined ? data["sharedAccountIds"].map((item: any) => (BigInt(item))) : undefined,
    sharedAdvertiserIds: data["sharedAdvertiserIds"] !== undefined ? data["sharedAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#remarketingListSharesPatch.
 */
export interface RemarketingListSharesPatchOptions {
  /**
   * RemarketingList ID.
   */
  id: bigint;
}

function serializeRemarketingListSharesPatchOptions(data: any): RemarketingListSharesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeRemarketingListSharesPatchOptions(data: any): RemarketingListSharesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Additional options for dfareporting#remarketingListsList.
 */
export interface RemarketingListsListOptions {
  /**
   * Select only active or only inactive remarketing lists.
   */
  active?: boolean;
  /**
   * Select only remarketing lists owned by this advertiser.
   */
  advertiserId: bigint;
  /**
   * Select only remarketing lists that have this floodlight activity ID.
   */
  floodlightActivityId?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "remarketing list*2015" will return objects with names like
   * "remarketing list June 2015", "remarketing list April 2015", or simply
   * "remarketing list 2015". Most of the searches also add wildcards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "remarketing list" will match objects with name "my remarketing list",
   * "remarketing list 2015", or simply "remarketing list".
   */
  name?: string;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeRemarketingListsListOptions(data: any): RemarketingListsListOptions {
  return {
    ...data,
    advertiserId: String(data["advertiserId"]),
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
  };
}

function deserializeRemarketingListsListOptions(data: any): RemarketingListsListOptions {
  return {
    ...data,
    advertiserId: BigInt(data["advertiserId"]),
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
  };
}

/**
 * Remarketing list response
 */
export interface RemarketingListsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#remarketingListsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Remarketing list collection.
   */
  remarketingLists?: RemarketingList[];
}

function serializeRemarketingListsListResponse(data: any): RemarketingListsListResponse {
  return {
    ...data,
    remarketingLists: data["remarketingLists"] !== undefined ? data["remarketingLists"].map((item: any) => (serializeRemarketingList(item))) : undefined,
  };
}

function deserializeRemarketingListsListResponse(data: any): RemarketingListsListResponse {
  return {
    ...data,
    remarketingLists: data["remarketingLists"] !== undefined ? data["remarketingLists"].map((item: any) => (deserializeRemarketingList(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#remarketingListsPatch.
 */
export interface RemarketingListsPatchOptions {
  /**
   * RemarketingList ID.
   */
  id: bigint;
}

function serializeRemarketingListsPatchOptions(data: any): RemarketingListsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeRemarketingListsPatchOptions(data: any): RemarketingListsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Represents a Report resource.
 */
export interface Report {
  /**
   * The account ID to which this report belongs.
   */
  accountId?: bigint;
  /**
   * The report criteria for a report of type "STANDARD".
   */
  criteria?: {
    activities?: Activities;
    customRichMediaEvents?: CustomRichMediaEvents;
    dateRange?: DateRange;
    dimensionFilters?: DimensionValue[];
    dimensions?: SortedDimension[];
    metricNames?: string[];
  };
  /**
   * The report criteria for a report of type "CROSS_DIMENSION_REACH".
   */
  crossDimensionReachCriteria?: {
    breakdown?: SortedDimension[];
    dateRange?: DateRange;
    dimension?:  | "ADVERTISER" | "CAMPAIGN" | "SITE_BY_ADVERTISER" | "SITE_BY_CAMPAIGN";
    dimensionFilters?: DimensionValue[];
    metricNames?: string[];
    overlapMetricNames?: string[];
    pivoted?: boolean;
  };
  /**
   * The report's email delivery settings.
   */
  delivery?: {
    emailOwner?: boolean;
    emailOwnerDeliveryType?:  | "LINK" | "ATTACHMENT";
    message?: string;
    recipients?: Recipient[];
  };
  /**
   * The eTag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The filename used when generating report files for this report.
   */
  fileName?: string;
  /**
   * The report criteria for a report of type "FLOODLIGHT".
   */
  floodlightCriteria?: {
    customRichMediaEvents?: DimensionValue[];
    dateRange?: DateRange;
    dimensionFilters?: DimensionValue[];
    dimensions?: SortedDimension[];
    floodlightConfigId?: DimensionValue;
    metricNames?: string[];
    reportProperties?: {
      includeAttributedIPConversions?: boolean;
      includeUnattributedCookieConversions?: boolean;
      includeUnattributedIPConversions?: boolean;
    };
  };
  /**
   * The output format of the report. If not specified, default format is
   * "CSV". Note that the actual format in the completed report file might
   * differ if for instance the report's size exceeds the format's capabilities.
   * "CSV" will then be the fallback format.
   */
  format?:  | "CSV" | "EXCEL";
  /**
   * The unique ID identifying this report resource.
   */
  id?: bigint;
  /**
   * The kind of resource this is, in this case dfareporting#report.
   */
  kind?: string;
  /**
   * The timestamp (in milliseconds since epoch) of when this report was last
   * modified.
   */
  lastModifiedTime?: bigint;
  /**
   * The name of the report.
   */
  name?: string;
  /**
   * The user profile id of the owner of this report.
   */
  ownerProfileId?: bigint;
  /**
   * The report criteria for a report of type "PATH_ATTRIBUTION".
   */
  pathAttributionCriteria?: {
    activityFilters?: DimensionValue[];
    customChannelGrouping?: ChannelGrouping;
    dateRange?: DateRange;
    dimensions?: SortedDimension[];
    floodlightConfigId?: DimensionValue;
    metricNames?: string[];
    pathFilters?: PathFilter[];
  };
  /**
   * The report criteria for a report of type "PATH".
   */
  pathCriteria?: {
    activityFilters?: DimensionValue[];
    customChannelGrouping?: ChannelGrouping;
    dateRange?: DateRange;
    dimensions?: SortedDimension[];
    floodlightConfigId?: DimensionValue;
    metricNames?: string[];
    pathFilters?: PathFilter[];
  };
  /**
   * The report criteria for a report of type "PATH_TO_CONVERSION".
   */
  pathToConversionCriteria?: {
    activityFilters?: DimensionValue[];
    conversionDimensions?: SortedDimension[];
    customFloodlightVariables?: SortedDimension[];
    customRichMediaEvents?: DimensionValue[];
    dateRange?: DateRange;
    floodlightConfigId?: DimensionValue;
    metricNames?: string[];
    perInteractionDimensions?: SortedDimension[];
    reportProperties?: {
      clicksLookbackWindow?: number;
      impressionsLookbackWindow?: number;
      includeAttributedIPConversions?: boolean;
      includeUnattributedCookieConversions?: boolean;
      includeUnattributedIPConversions?: boolean;
      maximumClickInteractions?: number;
      maximumImpressionInteractions?: number;
      maximumInteractionGap?: number;
      pivotOnInteractionPath?: boolean;
    };
  };
  /**
   * The report criteria for a report of type "REACH".
   */
  reachCriteria?: {
    activities?: Activities;
    customRichMediaEvents?: CustomRichMediaEvents;
    dateRange?: DateRange;
    dimensionFilters?: DimensionValue[];
    dimensions?: SortedDimension[];
    enableAllDimensionCombinations?: boolean;
    metricNames?: string[];
    reachByFrequencyMetricNames?: string[];
  };
  /**
   * The report's schedule. Can only be set if the report's 'dateRange' is a
   * relative date range and the relative date range is not "TODAY".
   */
  schedule?: {
    active?: boolean;
    every?: number;
    expirationDate?: Date;
    repeats?: string;
    repeatsOnWeekDays?:  | "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY"[];
    runsOnDayOfMonth?:  | "DAY_OF_MONTH" | "WEEK_OF_MONTH";
    startDate?: Date;
  };
  /**
   * The subaccount ID to which this report belongs if applicable.
   */
  subAccountId?: bigint;
  /**
   * The type of the report.
   */
  type?:  | "STANDARD" | "REACH" | "PATH_TO_CONVERSION" | "CROSS_DIMENSION_REACH" | "FLOODLIGHT" | "PATH" | "PATH_ATTRIBUTION";
}

function serializeReport(data: any): Report {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    criteria: data["criteria"] !== undefined ? {
      ...data["criteria"],
      dateRange: data["criteria"]["dateRange"] !== undefined ? serializeDateRange(data["criteria"]["dateRange"]) : undefined,
    } : undefined,
    crossDimensionReachCriteria: data["crossDimensionReachCriteria"] !== undefined ? {
      ...data["crossDimensionReachCriteria"],
      dateRange: data["crossDimensionReachCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["crossDimensionReachCriteria"]["dateRange"]) : undefined,
    } : undefined,
    floodlightCriteria: data["floodlightCriteria"] !== undefined ? {
      ...data["floodlightCriteria"],
      dateRange: data["floodlightCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["floodlightCriteria"]["dateRange"]) : undefined,
    } : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? String(data["lastModifiedTime"]) : undefined,
    ownerProfileId: data["ownerProfileId"] !== undefined ? String(data["ownerProfileId"]) : undefined,
    pathAttributionCriteria: data["pathAttributionCriteria"] !== undefined ? {
      ...data["pathAttributionCriteria"],
      customChannelGrouping: data["pathAttributionCriteria"]["customChannelGrouping"] !== undefined ? serializeChannelGrouping(data["pathAttributionCriteria"]["customChannelGrouping"]) : undefined,
      dateRange: data["pathAttributionCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["pathAttributionCriteria"]["dateRange"]) : undefined,
      pathFilters: data["pathAttributionCriteria"]["pathFilters"] !== undefined ? data["pathAttributionCriteria"]["pathFilters"].map((item: any) => (serializePathFilter(item))) : undefined,
    } : undefined,
    pathCriteria: data["pathCriteria"] !== undefined ? {
      ...data["pathCriteria"],
      customChannelGrouping: data["pathCriteria"]["customChannelGrouping"] !== undefined ? serializeChannelGrouping(data["pathCriteria"]["customChannelGrouping"]) : undefined,
      dateRange: data["pathCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["pathCriteria"]["dateRange"]) : undefined,
      pathFilters: data["pathCriteria"]["pathFilters"] !== undefined ? data["pathCriteria"]["pathFilters"].map((item: any) => (serializePathFilter(item))) : undefined,
    } : undefined,
    pathToConversionCriteria: data["pathToConversionCriteria"] !== undefined ? {
      ...data["pathToConversionCriteria"],
      dateRange: data["pathToConversionCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["pathToConversionCriteria"]["dateRange"]) : undefined,
    } : undefined,
    reachCriteria: data["reachCriteria"] !== undefined ? {
      ...data["reachCriteria"],
      dateRange: data["reachCriteria"]["dateRange"] !== undefined ? serializeDateRange(data["reachCriteria"]["dateRange"]) : undefined,
    } : undefined,
    schedule: data["schedule"] !== undefined ? {
      ...data["schedule"],
      expirationDate: data["schedule"]["expirationDate"] !== undefined ? data["schedule"]["expirationDate"].toISOString() : undefined,
      startDate: data["schedule"]["startDate"] !== undefined ? data["schedule"]["startDate"].toISOString() : undefined,
    } : undefined,
    subAccountId: data["subAccountId"] !== undefined ? String(data["subAccountId"]) : undefined,
  };
}

function deserializeReport(data: any): Report {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    criteria: data["criteria"] !== undefined ? {
      ...data["criteria"],
      dateRange: data["criteria"]["dateRange"] !== undefined ? deserializeDateRange(data["criteria"]["dateRange"]) : undefined,
    } : undefined,
    crossDimensionReachCriteria: data["crossDimensionReachCriteria"] !== undefined ? {
      ...data["crossDimensionReachCriteria"],
      dateRange: data["crossDimensionReachCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["crossDimensionReachCriteria"]["dateRange"]) : undefined,
    } : undefined,
    floodlightCriteria: data["floodlightCriteria"] !== undefined ? {
      ...data["floodlightCriteria"],
      dateRange: data["floodlightCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["floodlightCriteria"]["dateRange"]) : undefined,
    } : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? BigInt(data["lastModifiedTime"]) : undefined,
    ownerProfileId: data["ownerProfileId"] !== undefined ? BigInt(data["ownerProfileId"]) : undefined,
    pathAttributionCriteria: data["pathAttributionCriteria"] !== undefined ? {
      ...data["pathAttributionCriteria"],
      customChannelGrouping: data["pathAttributionCriteria"]["customChannelGrouping"] !== undefined ? deserializeChannelGrouping(data["pathAttributionCriteria"]["customChannelGrouping"]) : undefined,
      dateRange: data["pathAttributionCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["pathAttributionCriteria"]["dateRange"]) : undefined,
      pathFilters: data["pathAttributionCriteria"]["pathFilters"] !== undefined ? data["pathAttributionCriteria"]["pathFilters"].map((item: any) => (deserializePathFilter(item))) : undefined,
    } : undefined,
    pathCriteria: data["pathCriteria"] !== undefined ? {
      ...data["pathCriteria"],
      customChannelGrouping: data["pathCriteria"]["customChannelGrouping"] !== undefined ? deserializeChannelGrouping(data["pathCriteria"]["customChannelGrouping"]) : undefined,
      dateRange: data["pathCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["pathCriteria"]["dateRange"]) : undefined,
      pathFilters: data["pathCriteria"]["pathFilters"] !== undefined ? data["pathCriteria"]["pathFilters"].map((item: any) => (deserializePathFilter(item))) : undefined,
    } : undefined,
    pathToConversionCriteria: data["pathToConversionCriteria"] !== undefined ? {
      ...data["pathToConversionCriteria"],
      dateRange: data["pathToConversionCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["pathToConversionCriteria"]["dateRange"]) : undefined,
    } : undefined,
    reachCriteria: data["reachCriteria"] !== undefined ? {
      ...data["reachCriteria"],
      dateRange: data["reachCriteria"]["dateRange"] !== undefined ? deserializeDateRange(data["reachCriteria"]["dateRange"]) : undefined,
    } : undefined,
    schedule: data["schedule"] !== undefined ? {
      ...data["schedule"],
      expirationDate: data["schedule"]["expirationDate"] !== undefined ? new Date(data["schedule"]["expirationDate"]) : undefined,
      startDate: data["schedule"]["startDate"] !== undefined ? new Date(data["schedule"]["startDate"]) : undefined,
    } : undefined,
    subAccountId: data["subAccountId"] !== undefined ? BigInt(data["subAccountId"]) : undefined,
  };
}

/**
 * Represents fields that are compatible to be selected for a report of type
 * "STANDARD".
 */
export interface ReportCompatibleFields {
  /**
   * Dimensions which are compatible to be selected in the "dimensionFilters"
   * section of the report.
   */
  dimensionFilters?: Dimension[];
  /**
   * Dimensions which are compatible to be selected in the "dimensions" section
   * of the report.
   */
  dimensions?: Dimension[];
  /**
   * The kind of resource this is, in this case
   * dfareporting#reportCompatibleFields.
   */
  kind?: string;
  /**
   * Metrics which are compatible to be selected in the "metricNames" section
   * of the report.
   */
  metrics?: Metric[];
  /**
   * Metrics which are compatible to be selected as activity metrics to pivot
   * on in the "activities" section of the report.
   */
  pivotedActivityMetrics?: Metric[];
}

/**
 * Represents the list of reports.
 */
export interface ReportList {
  /**
   * The eTag of this response for caching purposes.
   */
  etag?: string;
  /**
   * The reports returned in this response.
   */
  items?: Report[];
  /**
   * The kind of list this is, in this case dfareporting#reportList.
   */
  kind?: string;
  /**
   * Continuation token used to page through reports. To retrieve the next page
   * of results, set the next request's "pageToken" to the value of this field.
   * The page token is only valid for a limited amount of time and should not be
   * persisted.
   */
  nextPageToken?: string;
}

function serializeReportList(data: any): ReportList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeReport(item))) : undefined,
  };
}

function deserializeReportList(data: any): ReportList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeReport(item))) : undefined,
  };
}

/**
 * Reporting Configuration
 */
export interface ReportsConfiguration {
  /**
   * Whether the exposure to conversion report is enabled. This report shows
   * detailed pathway information on up to 10 of the most recent ad exposures
   * seen by a user before converting.
   */
  exposureToConversionEnabled?: boolean;
  /**
   * Default lookback windows for new advertisers in this account.
   */
  lookbackConfiguration?: LookbackConfiguration;
  /**
   * Report generation time zone ID of this account. This is a required field
   * that can only be changed by a superuser. Acceptable values are: - "1" for
   * "America/New_York" - "2" for "Europe/London" - "3" for "Europe/Paris" - "4"
   * for "Africa/Johannesburg" - "5" for "Asia/Jerusalem" - "6" for
   * "Asia/Shanghai" - "7" for "Asia/Hong_Kong" - "8" for "Asia/Tokyo" - "9" for
   * "Australia/Sydney" - "10" for "Asia/Dubai" - "11" for "America/Los_Angeles"
   * - "12" for "Pacific/Auckland" - "13" for "America/Sao_Paulo" - "16" for
   * "America/Asuncion" - "17" for "America/Chicago" - "18" for "America/Denver"
   * - "19" for "America/St_Johns" - "20" for "Asia/Dhaka" - "21" for
   * "Asia/Jakarta" - "22" for "Asia/Kabul" - "23" for "Asia/Karachi" - "24" for
   * "Asia/Calcutta" - "25" for "Asia/Pyongyang" - "26" for "Asia/Rangoon" -
   * "27" for "Atlantic/Cape_Verde" - "28" for "Atlantic/South_Georgia" - "29"
   * for "Australia/Adelaide" - "30" for "Australia/Lord_Howe" - "31" for
   * "Europe/Moscow" - "32" for "Pacific/Kiritimati" - "35" for
   * "Pacific/Norfolk" - "36" for "Pacific/Tongatapu"
   */
  reportGenerationTimeZoneId?: bigint;
}

function serializeReportsConfiguration(data: any): ReportsConfiguration {
  return {
    ...data,
    reportGenerationTimeZoneId: data["reportGenerationTimeZoneId"] !== undefined ? String(data["reportGenerationTimeZoneId"]) : undefined,
  };
}

function deserializeReportsConfiguration(data: any): ReportsConfiguration {
  return {
    ...data,
    reportGenerationTimeZoneId: data["reportGenerationTimeZoneId"] !== undefined ? BigInt(data["reportGenerationTimeZoneId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#reportsFilesList.
 */
export interface ReportsFilesListOptions {
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous result page.
   */
  pageToken?: string;
  /**
   * The field by which to sort the list.
   */
  sortField?:  | "ID" | "LAST_MODIFIED_TIME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Additional options for dfareporting#reportsList.
 */
export interface ReportsListOptions {
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous result page.
   */
  pageToken?: string;
  /**
   * The scope that defines which results are returned.
   */
  scope?:  | "ALL" | "MINE";
  /**
   * The field by which to sort the list.
   */
  sortField?:  | "ID" | "LAST_MODIFIED_TIME" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Additional options for dfareporting#reportsRun.
 */
export interface ReportsRunOptions {
  /**
   * If set and true, tries to run the report synchronously.
   */
  synchronous?: boolean;
}

/**
 * Rich Media Exit Override.
 */
export interface RichMediaExitOverride {
  /**
   * Click-through URL of this rich media exit override. Applicable if the
   * enabled field is set to true.
   */
  clickThroughUrl?: ClickThroughUrl;
  /**
   * Whether to use the clickThroughUrl. If false, the creative-level exit will
   * be used.
   */
  enabled?: boolean;
  /**
   * ID for the override to refer to a specific exit in the creative.
   */
  exitId?: bigint;
}

function serializeRichMediaExitOverride(data: any): RichMediaExitOverride {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? serializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    exitId: data["exitId"] !== undefined ? String(data["exitId"]) : undefined,
  };
}

function deserializeRichMediaExitOverride(data: any): RichMediaExitOverride {
  return {
    ...data,
    clickThroughUrl: data["clickThroughUrl"] !== undefined ? deserializeClickThroughUrl(data["clickThroughUrl"]) : undefined,
    exitId: data["exitId"] !== undefined ? BigInt(data["exitId"]) : undefined,
  };
}

/**
 * A rule associates an asset with a targeting template for asset-level
 * targeting. Applicable to INSTREAM_VIDEO creatives.
 */
export interface Rule {
  /**
   * A creativeAssets[].id. This should refer to one of the parent assets in
   * this creative. This is a required field.
   */
  assetId?: bigint;
  /**
   * A user-friendly name for this rule. This is a required field.
   */
  name?: string;
  /**
   * A targeting template ID. The targeting from the targeting template will be
   * used to determine whether this asset should be served. This is a required
   * field.
   */
  targetingTemplateId?: bigint;
}

function serializeRule(data: any): Rule {
  return {
    ...data,
    assetId: data["assetId"] !== undefined ? String(data["assetId"]) : undefined,
    targetingTemplateId: data["targetingTemplateId"] !== undefined ? String(data["targetingTemplateId"]) : undefined,
  };
}

function deserializeRule(data: any): Rule {
  return {
    ...data,
    assetId: data["assetId"] !== undefined ? BigInt(data["assetId"]) : undefined,
    targetingTemplateId: data["targetingTemplateId"] !== undefined ? BigInt(data["targetingTemplateId"]) : undefined,
  };
}

/**
 * Contains properties of a site.
 */
export interface Site {
  /**
   * Account ID of this site. This is a read-only field that can be left blank.
   */
  accountId?: bigint;
  /**
   * Whether this site is approved.
   */
  approved?: boolean;
  /**
   * Directory site associated with this site. This is a required field that is
   * read-only after insertion.
   */
  directorySiteId?: bigint;
  /**
   * Dimension value for the ID of the directory site. This is a read-only,
   * auto-generated field.
   */
  directorySiteIdDimensionValue?: DimensionValue;
  /**
   * ID of this site. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Dimension value for the ID of this site. This is a read-only,
   * auto-generated field.
   */
  idDimensionValue?: DimensionValue;
  /**
   * Key name of this site. This is a read-only, auto-generated field.
   */
  keyName?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#site".
   */
  kind?: string;
  /**
   * Name of this site.This is a required field. Must be less than 128
   * characters long. If this site is under a subaccount, the name must be
   * unique among sites of the same subaccount. Otherwise, this site is a
   * top-level site, and the name must be unique among top-level sites of the
   * same account.
   */
  name?: string;
  /**
   * Site contacts.
   */
  siteContacts?: SiteContact[];
  /**
   * Site-wide settings.
   */
  siteSettings?: SiteSettings;
  /**
   * Subaccount ID of this site. This is a read-only field that can be left
   * blank.
   */
  subaccountId?: bigint;
  /**
   * Default video settings for new placements created under this site. This
   * value will be used to populate the placements.videoSettings field, when no
   * value is specified for the new placement.
   */
  videoSettings?: SiteVideoSettings;
}

function serializeSite(data: any): Site {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? String(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    siteContacts: data["siteContacts"] !== undefined ? data["siteContacts"].map((item: any) => (serializeSiteContact(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    videoSettings: data["videoSettings"] !== undefined ? serializeSiteVideoSettings(data["videoSettings"]) : undefined,
  };
}

function deserializeSite(data: any): Site {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    directorySiteId: data["directorySiteId"] !== undefined ? BigInt(data["directorySiteId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    siteContacts: data["siteContacts"] !== undefined ? data["siteContacts"].map((item: any) => (deserializeSiteContact(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    videoSettings: data["videoSettings"] !== undefined ? deserializeSiteVideoSettings(data["videoSettings"]) : undefined,
  };
}

/**
 * Companion Settings
 */
export interface SiteCompanionSetting {
  /**
   * Whether companions are disabled for this site template.
   */
  companionsDisabled?: boolean;
  /**
   * Allowlist of companion sizes to be served via this site template. Set this
   * list to null or empty to serve all companion sizes.
   */
  enabledSizes?: Size[];
  /**
   * Whether to serve only static images as companions.
   */
  imageOnly?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#siteCompanionSetting".
   */
  kind?: string;
}

function serializeSiteCompanionSetting(data: any): SiteCompanionSetting {
  return {
    ...data,
    enabledSizes: data["enabledSizes"] !== undefined ? data["enabledSizes"].map((item: any) => (serializeSize(item))) : undefined,
  };
}

function deserializeSiteCompanionSetting(data: any): SiteCompanionSetting {
  return {
    ...data,
    enabledSizes: data["enabledSizes"] !== undefined ? data["enabledSizes"].map((item: any) => (deserializeSize(item))) : undefined,
  };
}

/**
 * Site Contact
 */
export interface SiteContact {
  /**
   * Address of this site contact.
   */
  address?: string;
  /**
   * Site contact type.
   */
  contactType?:  | "SALES_PERSON" | "TRAFFICKER";
  /**
   * Email address of this site contact. This is a required field.
   */
  email?: string;
  /**
   * First name of this site contact.
   */
  firstName?: string;
  /**
   * ID of this site contact. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Last name of this site contact.
   */
  lastName?: string;
  /**
   * Primary phone number of this site contact.
   */
  phone?: string;
  /**
   * Title or designation of this site contact.
   */
  title?: string;
}

function serializeSiteContact(data: any): SiteContact {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeSiteContact(data: any): SiteContact {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Site Settings
 */
export interface SiteSettings {
  /**
   * Whether active view creatives are disabled for this site.
   */
  activeViewOptOut?: boolean;
  /**
   * Whether this site opts out of ad blocking. When true, ad blocking is
   * disabled for all placements under the site, regardless of the individual
   * placement settings. When false, the campaign and placement settings take
   * effect.
   */
  adBlockingOptOut?: boolean;
  /**
   * Whether new cookies are disabled for this site.
   */
  disableNewCookie?: boolean;
  /**
   * Configuration settings for dynamic and image floodlight tags.
   */
  tagSetting?: TagSetting;
  /**
   * Whether Verification and ActiveView for in-stream video creatives are
   * disabled by default for new placements created under this site. This value
   * will be used to populate the placement.videoActiveViewOptOut field, when no
   * value is specified for the new placement.
   */
  videoActiveViewOptOutTemplate?: boolean;
  /**
   * Default VPAID adapter setting for new placements created under this site.
   * This value will be used to populate the placements.vpaidAdapterChoice
   * field, when no value is specified for the new placement. Controls which
   * VPAID format the measurement adapter will use for in-stream video creatives
   * assigned to the placement. The publisher's specifications will typically
   * determine this setting. For VPAID creatives, the adapter format will match
   * the VPAID format (HTML5 VPAID creatives use the HTML5 adapter). *Note:*
   * Flash is no longer supported. This field now defaults to HTML5 when the
   * following values are provided: FLASH, BOTH.
   */
  vpaidAdapterChoiceTemplate?:  | "DEFAULT" | "FLASH" | "HTML5" | "BOTH";
}

/**
 * Skippable Settings
 */
export interface SiteSkippableSetting {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#siteSkippableSetting".
   */
  kind?: string;
  /**
   * Amount of time to play videos served to this site template before counting
   * a view. Applicable when skippable is true.
   */
  progressOffset?: VideoOffset;
  /**
   * Amount of time to play videos served to this site before the skip button
   * should appear. Applicable when skippable is true.
   */
  skipOffset?: VideoOffset;
  /**
   * Whether the user can skip creatives served to this site. This will act as
   * default for new placements created under this site.
   */
  skippable?: boolean;
}

/**
 * Additional options for dfareporting#sitesList.
 */
export interface SitesListOptions {
  /**
   * This search filter is no longer supported and will have no effect on the
   * results returned.
   */
  acceptsInStreamVideoPlacements?: boolean;
  /**
   * This search filter is no longer supported and will have no effect on the
   * results returned.
   */
  acceptsInterstitialPlacements?: boolean;
  /**
   * Select only sites that accept publisher paid placements.
   */
  acceptsPublisherPaidPlacements?: boolean;
  /**
   * Select only AdWords sites.
   */
  adWordsSite?: boolean;
  /**
   * Select only approved sites.
   */
  approved?: boolean;
  /**
   * Select only sites with these campaign IDs.
   */
  campaignIds?: bigint;
  /**
   * Select only sites with these directory site IDs.
   */
  directorySiteIds?: bigint;
  /**
   * Select only sites with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name, ID or keyName. Wildcards (*) are
   * allowed. For example, "site*2015" will return objects with names like "site
   * June 2015", "site April 2015", or simply "site 2015". Most of the searches
   * also add wildcards implicitly at the start and the end of the search
   * string. For example, a search string of "site" will match objects with name
   * "my site", "site 2015", or simply "site".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only sites with this subaccount ID.
   */
  subaccountId?: bigint;
  /**
   * Select only sites that have not been mapped to a directory site.
   */
  unmappedSite?: boolean;
}

function serializeSitesListOptions(data: any): SitesListOptions {
  return {
    ...data,
    campaignIds: data["campaignIds"] !== undefined ? String(data["campaignIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? String(data["directorySiteIds"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeSitesListOptions(data: any): SitesListOptions {
  return {
    ...data,
    campaignIds: data["campaignIds"] !== undefined ? BigInt(data["campaignIds"]) : undefined,
    directorySiteIds: data["directorySiteIds"] !== undefined ? BigInt(data["directorySiteIds"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Site List Response
 */
export interface SitesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#sitesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Site collection.
   */
  sites?: Site[];
}

function serializeSitesListResponse(data: any): SitesListResponse {
  return {
    ...data,
    sites: data["sites"] !== undefined ? data["sites"].map((item: any) => (serializeSite(item))) : undefined,
  };
}

function deserializeSitesListResponse(data: any): SitesListResponse {
  return {
    ...data,
    sites: data["sites"] !== undefined ? data["sites"].map((item: any) => (deserializeSite(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#sitesPatch.
 */
export interface SitesPatchOptions {
  /**
   * Site ID.
   */
  id: bigint;
}

function serializeSitesPatchOptions(data: any): SitesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeSitesPatchOptions(data: any): SitesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Transcode Settings
 */
export interface SiteTranscodeSetting {
  /**
   * Allowlist of video formats to be served to this site template. Set this
   * list to null or empty to serve all video formats.
   */
  enabledVideoFormats?: number[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#siteTranscodeSetting".
   */
  kind?: string;
}

/**
 * Video Settings
 */
export interface SiteVideoSettings {
  /**
   * Settings for the companion creatives of video creatives served to this
   * site.
   */
  companionSettings?: SiteCompanionSetting;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#siteVideoSettings".
   */
  kind?: string;
  /**
   * Whether OBA icons are enabled for this placement.
   */
  obaEnabled?: boolean;
  /**
   * Settings for the OBA icon of video creatives served to this site. This
   * will act as default for new placements created under this site.
   */
  obaSettings?: ObaIcon;
  /**
   * Orientation of a site template used for video. This will act as default
   * for new placements created under this site.
   */
  orientation?:  | "ANY" | "LANDSCAPE" | "PORTRAIT";
  /**
   * Publisher specification ID used to identify site-associated publisher
   * requirements and automatically populate transcode settings. If publisher
   * specification ID is specified, it will take precedence over transcode
   * settings.
   */
  publisherSpecificationId?: bigint;
  /**
   * Settings for the skippability of video creatives served to this site. This
   * will act as default for new placements created under this site.
   */
  skippableSettings?: SiteSkippableSetting;
  /**
   * Settings for the transcodes of video creatives served to this site. This
   * will act as default for new placements created under this site.
   */
  transcodeSettings?: SiteTranscodeSetting;
}

function serializeSiteVideoSettings(data: any): SiteVideoSettings {
  return {
    ...data,
    companionSettings: data["companionSettings"] !== undefined ? serializeSiteCompanionSetting(data["companionSettings"]) : undefined,
    obaSettings: data["obaSettings"] !== undefined ? serializeObaIcon(data["obaSettings"]) : undefined,
    publisherSpecificationId: data["publisherSpecificationId"] !== undefined ? String(data["publisherSpecificationId"]) : undefined,
  };
}

function deserializeSiteVideoSettings(data: any): SiteVideoSettings {
  return {
    ...data,
    companionSettings: data["companionSettings"] !== undefined ? deserializeSiteCompanionSetting(data["companionSettings"]) : undefined,
    obaSettings: data["obaSettings"] !== undefined ? deserializeObaIcon(data["obaSettings"]) : undefined,
    publisherSpecificationId: data["publisherSpecificationId"] !== undefined ? BigInt(data["publisherSpecificationId"]) : undefined,
  };
}

/**
 * Represents the dimensions of ads, placements, creatives, or creative assets.
 */
export interface Size {
  /**
   * Height of this size. Acceptable values are 0 to 32767, inclusive.
   */
  height?: number;
  /**
   * IAB standard size. This is a read-only, auto-generated field.
   */
  iab?: boolean;
  /**
   * ID of this size. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#size".
   */
  kind?: string;
  /**
   * Width of this size. Acceptable values are 0 to 32767, inclusive.
   */
  width?: number;
}

function serializeSize(data: any): Size {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeSize(data: any): Size {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#sizesList.
 */
export interface SizesListOptions {
  /**
   * Select only sizes with this height.
   */
  height?: number;
  /**
   * Select only IAB standard sizes.
   */
  iabStandard?: boolean;
  /**
   * Select only sizes with these IDs.
   */
  ids?: bigint;
  /**
   * Select only sizes with this width.
   */
  width?: number;
}

function serializeSizesListOptions(data: any): SizesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeSizesListOptions(data: any): SizesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Size List Response
 */
export interface SizesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#sizesListResponse".
   */
  kind?: string;
  /**
   * Size collection.
   */
  sizes?: Size[];
}

function serializeSizesListResponse(data: any): SizesListResponse {
  return {
    ...data,
    sizes: data["sizes"] !== undefined ? data["sizes"].map((item: any) => (serializeSize(item))) : undefined,
  };
}

function deserializeSizesListResponse(data: any): SizesListResponse {
  return {
    ...data,
    sizes: data["sizes"] !== undefined ? data["sizes"].map((item: any) => (deserializeSize(item))) : undefined,
  };
}

/**
 * Skippable Settings
 */
export interface SkippableSetting {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#skippableSetting".
   */
  kind?: string;
  /**
   * Amount of time to play videos served to this placement before counting a
   * view. Applicable when skippable is true.
   */
  progressOffset?: VideoOffset;
  /**
   * Amount of time to play videos served to this placement before the skip
   * button should appear. Applicable when skippable is true.
   */
  skipOffset?: VideoOffset;
  /**
   * Whether the user can skip creatives served to this placement.
   */
  skippable?: boolean;
}

/**
 * Represents a sorted dimension.
 */
export interface SortedDimension {
  /**
   * The kind of resource this is, in this case dfareporting#sortedDimension.
   */
  kind?: string;
  /**
   * The name of the dimension.
   */
  name?: string;
  /**
   * An optional sort order for the dimension column.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Contains properties of a Campaign Manager subaccount.
 */
export interface Subaccount {
  /**
   * ID of the account that contains this subaccount. This is a read-only field
   * that can be left blank.
   */
  accountId?: bigint;
  /**
   * IDs of the available user role permissions for this subaccount.
   */
  availablePermissionIds?: bigint[];
  /**
   * ID of this subaccount. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#subaccount".
   */
  kind?: string;
  /**
   * Name of this subaccount. This is a required field. Must be less than 128
   * characters long and be unique among subaccounts of the same account.
   */
  name?: string;
}

function serializeSubaccount(data: any): Subaccount {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    availablePermissionIds: data["availablePermissionIds"] !== undefined ? data["availablePermissionIds"].map((item: any) => (String(item))) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeSubaccount(data: any): Subaccount {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    availablePermissionIds: data["availablePermissionIds"] !== undefined ? data["availablePermissionIds"].map((item: any) => (BigInt(item))) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#subaccountsList.
 */
export interface SubaccountsListOptions {
  /**
   * Select only subaccounts with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "subaccount*2015" will return objects with names like "subaccount
   * June 2015", "subaccount April 2015", or simply "subaccount 2015". Most of
   * the searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "subaccount" will match
   * objects with name "my subaccount", "subaccount 2015", or simply
   * "subaccount" .
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeSubaccountsListOptions(data: any): SubaccountsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeSubaccountsListOptions(data: any): SubaccountsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Subaccount List Response
 */
export interface SubaccountsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#subaccountsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Subaccount collection.
   */
  subaccounts?: Subaccount[];
}

function serializeSubaccountsListResponse(data: any): SubaccountsListResponse {
  return {
    ...data,
    subaccounts: data["subaccounts"] !== undefined ? data["subaccounts"].map((item: any) => (serializeSubaccount(item))) : undefined,
  };
}

function deserializeSubaccountsListResponse(data: any): SubaccountsListResponse {
  return {
    ...data,
    subaccounts: data["subaccounts"] !== undefined ? data["subaccounts"].map((item: any) => (deserializeSubaccount(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#subaccountsPatch.
 */
export interface SubaccountsPatchOptions {
  /**
   * Subaccount ID.
   */
  id: bigint;
}

function serializeSubaccountsPatchOptions(data: any): SubaccountsPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeSubaccountsPatchOptions(data: any): SubaccountsPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Placement Tag Data
 */
export interface TagData {
  /**
   * Ad associated with this placement tag. Applicable only when format is
   * PLACEMENT_TAG_TRACKING.
   */
  adId?: bigint;
  /**
   * Tag string to record a click.
   */
  clickTag?: string;
  /**
   * Creative associated with this placement tag. Applicable only when format
   * is PLACEMENT_TAG_TRACKING.
   */
  creativeId?: bigint;
  /**
   * TagData tag format of this tag.
   */
  format?:  | "PLACEMENT_TAG_STANDARD" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_IFRAME_ILAYER" | "PLACEMENT_TAG_INTERNAL_REDIRECT" | "PLACEMENT_TAG_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" | "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" | "PLACEMENT_TAG_CLICK_COMMANDS" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" | "PLACEMENT_TAG_TRACKING" | "PLACEMENT_TAG_TRACKING_IFRAME" | "PLACEMENT_TAG_TRACKING_JAVASCRIPT" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" | "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY" | "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" | "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT";
  /**
   * Tag string for serving an ad.
   */
  impressionTag?: string;
}

function serializeTagData(data: any): TagData {
  return {
    ...data,
    adId: data["adId"] !== undefined ? String(data["adId"]) : undefined,
    creativeId: data["creativeId"] !== undefined ? String(data["creativeId"]) : undefined,
  };
}

function deserializeTagData(data: any): TagData {
  return {
    ...data,
    adId: data["adId"] !== undefined ? BigInt(data["adId"]) : undefined,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
  };
}

/**
 * Tag Settings
 */
export interface TagSetting {
  /**
   * Additional key-values to be included in tags. Each key-value pair must be
   * of the form key=value, and pairs must be separated by a semicolon (;). Keys
   * and values must not contain commas. For example, id=2;color=red is a valid
   * value for this field.
   */
  additionalKeyValues?: string;
  /**
   * Whether static landing page URLs should be included in the tags. This
   * setting applies only to placements.
   */
  includeClickThroughUrls?: boolean;
  /**
   * Whether click-tracking string should be included in the tags.
   */
  includeClickTracking?: boolean;
  /**
   * Option specifying how keywords are embedded in ad tags. This setting can
   * be used to specify whether keyword placeholders are inserted in placement
   * tags for this site. Publishers can then add keywords to those placeholders.
   */
  keywordOption?:  | "PLACEHOLDER_WITH_LIST_OF_KEYWORDS" | "IGNORE" | "GENERATE_SEPARATE_TAG_FOR_EACH_KEYWORD";
}

/**
 * Dynamic and Image Tag Settings.
 */
export interface TagSettings {
  /**
   * Whether dynamic floodlight tags are enabled.
   */
  dynamicTagEnabled?: boolean;
  /**
   * Whether image tags are enabled.
   */
  imageTagEnabled?: boolean;
}

/**
 * Contains properties of a targetable remarketing list. Remarketing enables
 * you to create lists of users who have performed specific actions on a site,
 * then target ads to members of those lists. This resource is a read-only view
 * of a remarketing list to be used to faciliate targeting ads to specific
 * lists. Remarketing lists that are owned by your advertisers and those that
 * are shared to your advertisers or account are accessible via this resource.
 * To manage remarketing lists that are owned by your advertisers, use the
 * RemarketingLists resource.
 */
export interface TargetableRemarketingList {
  /**
   * Account ID of this remarketing list. This is a read-only, auto-generated
   * field that is only returned in GET requests.
   */
  accountId?: bigint;
  /**
   * Whether this targetable remarketing list is active.
   */
  active?: boolean;
  /**
   * Dimension value for the advertiser ID that owns this targetable
   * remarketing list.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Targetable remarketing list description.
   */
  description?: string;
  /**
   * Targetable remarketing list ID.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#targetableRemarketingList".
   */
  kind?: string;
  /**
   * Number of days that a user should remain in the targetable remarketing
   * list without an impression.
   */
  lifeSpan?: bigint;
  /**
   * Number of users currently in the list. This is a read-only field.
   */
  listSize?: bigint;
  /**
   * Product from which this targetable remarketing list was originated.
   */
  listSource?:  | "REMARKETING_LIST_SOURCE_OTHER" | "REMARKETING_LIST_SOURCE_ADX" | "REMARKETING_LIST_SOURCE_DFP" | "REMARKETING_LIST_SOURCE_XFP" | "REMARKETING_LIST_SOURCE_DFA" | "REMARKETING_LIST_SOURCE_GA" | "REMARKETING_LIST_SOURCE_YOUTUBE" | "REMARKETING_LIST_SOURCE_DBM" | "REMARKETING_LIST_SOURCE_GPLUS" | "REMARKETING_LIST_SOURCE_DMP" | "REMARKETING_LIST_SOURCE_PLAY_STORE";
  /**
   * Name of the targetable remarketing list. Is no greater than 128 characters
   * long.
   */
  name?: string;
  /**
   * Subaccount ID of this remarketing list. This is a read-only,
   * auto-generated field that is only returned in GET requests.
   */
  subaccountId?: bigint;
}

function serializeTargetableRemarketingList(data: any): TargetableRemarketingList {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    lifeSpan: data["lifeSpan"] !== undefined ? String(data["lifeSpan"]) : undefined,
    listSize: data["listSize"] !== undefined ? String(data["listSize"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeTargetableRemarketingList(data: any): TargetableRemarketingList {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    lifeSpan: data["lifeSpan"] !== undefined ? BigInt(data["lifeSpan"]) : undefined,
    listSize: data["listSize"] !== undefined ? BigInt(data["listSize"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#targetableRemarketingListsList.
 */
export interface TargetableRemarketingListsListOptions {
  /**
   * Select only active or only inactive targetable remarketing lists.
   */
  active?: boolean;
  /**
   * Select only targetable remarketing lists targetable by these advertisers.
   */
  advertiserId: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "remarketing list*2015" will return objects with names like
   * "remarketing list June 2015", "remarketing list April 2015", or simply
   * "remarketing list 2015". Most of the searches also add wildcards implicitly
   * at the start and the end of the search string. For example, a search string
   * of "remarketing list" will match objects with name "my remarketing list",
   * "remarketing list 2015", or simply "remarketing list".
   */
  name?: string;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeTargetableRemarketingListsListOptions(data: any): TargetableRemarketingListsListOptions {
  return {
    ...data,
    advertiserId: String(data["advertiserId"]),
  };
}

function deserializeTargetableRemarketingListsListOptions(data: any): TargetableRemarketingListsListOptions {
  return {
    ...data,
    advertiserId: BigInt(data["advertiserId"]),
  };
}

/**
 * Targetable remarketing list response
 */
export interface TargetableRemarketingListsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#targetableRemarketingListsListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Targetable remarketing list collection.
   */
  targetableRemarketingLists?: TargetableRemarketingList[];
}

function serializeTargetableRemarketingListsListResponse(data: any): TargetableRemarketingListsListResponse {
  return {
    ...data,
    targetableRemarketingLists: data["targetableRemarketingLists"] !== undefined ? data["targetableRemarketingLists"].map((item: any) => (serializeTargetableRemarketingList(item))) : undefined,
  };
}

function deserializeTargetableRemarketingListsListResponse(data: any): TargetableRemarketingListsListResponse {
  return {
    ...data,
    targetableRemarketingLists: data["targetableRemarketingLists"] !== undefined ? data["targetableRemarketingLists"].map((item: any) => (deserializeTargetableRemarketingList(item))) : undefined,
  };
}

/**
 * Contains properties of a targeting template. A targeting template
 * encapsulates targeting information which can be reused across multiple ads.
 */
export interface TargetingTemplate {
  /**
   * Account ID of this targeting template. This field, if left unset, will be
   * auto-generated on insert and is read-only after insert.
   */
  accountId?: bigint;
  /**
   * Advertiser ID of this targeting template. This is a required field on
   * insert and is read-only after insert.
   */
  advertiserId?: bigint;
  /**
   * Dimension value for the ID of the advertiser. This is a read-only,
   * auto-generated field.
   */
  advertiserIdDimensionValue?: DimensionValue;
  /**
   * Time and day targeting criteria.
   */
  dayPartTargeting?: DayPartTargeting;
  /**
   * Geographical targeting criteria.
   */
  geoTargeting?: GeoTargeting;
  /**
   * ID of this targeting template. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Key-value targeting criteria.
   */
  keyValueTargetingExpression?: KeyValueTargetingExpression;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#targetingTemplate".
   */
  kind?: string;
  /**
   * Language targeting criteria.
   */
  languageTargeting?: LanguageTargeting;
  /**
   * Remarketing list targeting criteria.
   */
  listTargetingExpression?: ListTargetingExpression;
  /**
   * Name of this targeting template. This field is required. It must be less
   * than 256 characters long and unique within an advertiser.
   */
  name?: string;
  /**
   * Subaccount ID of this targeting template. This field, if left unset, will
   * be auto-generated on insert and is read-only after insert.
   */
  subaccountId?: bigint;
  /**
   * Technology platform targeting criteria.
   */
  technologyTargeting?: TechnologyTargeting;
}

function serializeTargetingTemplate(data: any): TargetingTemplate {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? serializeGeoTargeting(data["geoTargeting"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    languageTargeting: data["languageTargeting"] !== undefined ? serializeLanguageTargeting(data["languageTargeting"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? serializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

function deserializeTargetingTemplate(data: any): TargetingTemplate {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeGeoTargeting(data["geoTargeting"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    languageTargeting: data["languageTargeting"] !== undefined ? deserializeLanguageTargeting(data["languageTargeting"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? deserializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

/**
 * Additional options for dfareporting#targetingTemplatesList.
 */
export interface TargetingTemplatesListOptions {
  /**
   * Select only targeting templates with this advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * Select only targeting templates with these IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "template*2015" will return objects with names like "template June
   * 2015", "template April 2015", or simply "template 2015". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "template" will match
   * objects with name "my template", "template 2015", or simply "template".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

function serializeTargetingTemplatesListOptions(data: any): TargetingTemplatesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeTargetingTemplatesListOptions(data: any): TargetingTemplatesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * Targeting Template List Response
 */
export interface TargetingTemplatesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#targetingTemplatesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * Targeting template collection.
   */
  targetingTemplates?: TargetingTemplate[];
}

function serializeTargetingTemplatesListResponse(data: any): TargetingTemplatesListResponse {
  return {
    ...data,
    targetingTemplates: data["targetingTemplates"] !== undefined ? data["targetingTemplates"].map((item: any) => (serializeTargetingTemplate(item))) : undefined,
  };
}

function deserializeTargetingTemplatesListResponse(data: any): TargetingTemplatesListResponse {
  return {
    ...data,
    targetingTemplates: data["targetingTemplates"] !== undefined ? data["targetingTemplates"].map((item: any) => (deserializeTargetingTemplate(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#targetingTemplatesPatch.
 */
export interface TargetingTemplatesPatchOptions {
  /**
   * TargetingTemplate ID.
   */
  id: bigint;
}

function serializeTargetingTemplatesPatchOptions(data: any): TargetingTemplatesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeTargetingTemplatesPatchOptions(data: any): TargetingTemplatesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Target Window.
 */
export interface TargetWindow {
  /**
   * User-entered value.
   */
  customHtml?: string;
  /**
   * Type of browser window for which the backup image of the flash creative
   * can be displayed.
   */
  targetWindowOption?:  | "NEW_WINDOW" | "CURRENT_WINDOW" | "CUSTOM";
}

/**
 * Technology Targeting.
 */
export interface TechnologyTargeting {
  /**
   * Browsers that this ad targets. For each browser either set
   * browserVersionId or dartId along with the version numbers. If both are
   * specified, only browserVersionId will be used. The other fields are
   * populated automatically when the ad is inserted or updated.
   */
  browsers?: Browser[];
  /**
   * Connection types that this ad targets. For each connection type only id is
   * required. The other fields are populated automatically when the ad is
   * inserted or updated.
   */
  connectionTypes?: ConnectionType[];
  /**
   * Mobile carriers that this ad targets. For each mobile carrier only id is
   * required, and the other fields are populated automatically when the ad is
   * inserted or updated. If targeting a mobile carrier, do not set targeting
   * for any zip codes.
   */
  mobileCarriers?: MobileCarrier[];
  /**
   * Operating systems that this ad targets. To target specific versions, use
   * operatingSystemVersions. For each operating system only dartId is required.
   * The other fields are populated automatically when the ad is inserted or
   * updated. If targeting an operating system, do not set targeting for
   * operating system versions for the same operating system.
   */
  operatingSystems?: OperatingSystem[];
  /**
   * Operating system versions that this ad targets. To target all versions,
   * use operatingSystems. For each operating system version, only id is
   * required. The other fields are populated automatically when the ad is
   * inserted or updated. If targeting an operating system version, do not set
   * targeting for the corresponding operating system in operatingSystems.
   */
  operatingSystemVersions?: OperatingSystemVersion[];
  /**
   * Platform types that this ad targets. For example, desktop, mobile, or
   * tablet. For each platform type, only id is required, and the other fields
   * are populated automatically when the ad is inserted or updated.
   */
  platformTypes?: PlatformType[];
}

function serializeTechnologyTargeting(data: any): TechnologyTargeting {
  return {
    ...data,
    browsers: data["browsers"] !== undefined ? data["browsers"].map((item: any) => (serializeBrowser(item))) : undefined,
    connectionTypes: data["connectionTypes"] !== undefined ? data["connectionTypes"].map((item: any) => (serializeConnectionType(item))) : undefined,
    mobileCarriers: data["mobileCarriers"] !== undefined ? data["mobileCarriers"].map((item: any) => (serializeMobileCarrier(item))) : undefined,
    operatingSystems: data["operatingSystems"] !== undefined ? data["operatingSystems"].map((item: any) => (serializeOperatingSystem(item))) : undefined,
    operatingSystemVersions: data["operatingSystemVersions"] !== undefined ? data["operatingSystemVersions"].map((item: any) => (serializeOperatingSystemVersion(item))) : undefined,
    platformTypes: data["platformTypes"] !== undefined ? data["platformTypes"].map((item: any) => (serializePlatformType(item))) : undefined,
  };
}

function deserializeTechnologyTargeting(data: any): TechnologyTargeting {
  return {
    ...data,
    browsers: data["browsers"] !== undefined ? data["browsers"].map((item: any) => (deserializeBrowser(item))) : undefined,
    connectionTypes: data["connectionTypes"] !== undefined ? data["connectionTypes"].map((item: any) => (deserializeConnectionType(item))) : undefined,
    mobileCarriers: data["mobileCarriers"] !== undefined ? data["mobileCarriers"].map((item: any) => (deserializeMobileCarrier(item))) : undefined,
    operatingSystems: data["operatingSystems"] !== undefined ? data["operatingSystems"].map((item: any) => (deserializeOperatingSystem(item))) : undefined,
    operatingSystemVersions: data["operatingSystemVersions"] !== undefined ? data["operatingSystemVersions"].map((item: any) => (deserializeOperatingSystemVersion(item))) : undefined,
    platformTypes: data["platformTypes"] !== undefined ? data["platformTypes"].map((item: any) => (deserializePlatformType(item))) : undefined,
  };
}

/**
 * Third Party Authentication Token
 */
export interface ThirdPartyAuthenticationToken {
  /**
   * Name of the third-party authentication token.
   */
  name?: string;
  /**
   * Value of the third-party authentication token. This is a read-only,
   * auto-generated field.
   */
  value?: string;
}

/**
 * Third-party Tracking URL.
 */
export interface ThirdPartyTrackingUrl {
  /**
   * Third-party URL type for in-stream video and in-stream audio creatives.
   */
  thirdPartyUrlType?:  | "IMPRESSION" | "CLICK_TRACKING" | "VIDEO_START" | "VIDEO_FIRST_QUARTILE" | "VIDEO_MIDPOINT" | "VIDEO_THIRD_QUARTILE" | "VIDEO_COMPLETE" | "VIDEO_MUTE" | "VIDEO_PAUSE" | "VIDEO_REWIND" | "VIDEO_FULLSCREEN" | "VIDEO_STOP" | "VIDEO_CUSTOM" | "SURVEY" | "RICH_MEDIA_IMPRESSION" | "RICH_MEDIA_RM_IMPRESSION" | "RICH_MEDIA_BACKUP_IMPRESSION" | "VIDEO_SKIP" | "VIDEO_PROGRESS";
  /**
   * URL for the specified third-party URL type.
   */
  url?: string;
}

/**
 * Transcode Settings
 */
export interface TranscodeSetting {
  /**
   * Allowlist of video formats to be served to this placement. Set this list
   * to null or empty to serve all video formats.
   */
  enabledVideoFormats?: number[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#transcodeSetting".
   */
  kind?: string;
}

/**
 * A Universal Ad ID as per the VAST 4.0 spec. Applicable to the following
 * creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID.
 */
export interface UniversalAdId {
  /**
   * Registry used for the Ad ID value.
   */
  registry?:  | "OTHER" | "AD_ID_OFFICIAL" | "CLEARCAST" | "DCM";
  /**
   * ID value for this creative. Only alphanumeric characters and the following
   * symbols are valid: "_/\-". Maximum length is 64 characters. Read only when
   * registry is DCM.
   */
  value?: string;
}

/**
 * User Defined Variable configuration.
 */
export interface UserDefinedVariableConfiguration {
  /**
   * Data type for the variable. This is a required field.
   */
  dataType?:  | "STRING" | "NUMBER";
  /**
   * User-friendly name for the variable which will appear in reports. This is
   * a required field, must be less than 64 characters long, and cannot contain
   * the following characters: ""<>".
   */
  reportName?: string;
  /**
   * Variable name in the tag. This is a required field.
   */
  variableType?:  | "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9" | "U10" | "U11" | "U12" | "U13" | "U14" | "U15" | "U16" | "U17" | "U18" | "U19" | "U20" | "U21" | "U22" | "U23" | "U24" | "U25" | "U26" | "U27" | "U28" | "U29" | "U30" | "U31" | "U32" | "U33" | "U34" | "U35" | "U36" | "U37" | "U38" | "U39" | "U40" | "U41" | "U42" | "U43" | "U44" | "U45" | "U46" | "U47" | "U48" | "U49" | "U50" | "U51" | "U52" | "U53" | "U54" | "U55" | "U56" | "U57" | "U58" | "U59" | "U60" | "U61" | "U62" | "U63" | "U64" | "U65" | "U66" | "U67" | "U68" | "U69" | "U70" | "U71" | "U72" | "U73" | "U74" | "U75" | "U76" | "U77" | "U78" | "U79" | "U80" | "U81" | "U82" | "U83" | "U84" | "U85" | "U86" | "U87" | "U88" | "U89" | "U90" | "U91" | "U92" | "U93" | "U94" | "U95" | "U96" | "U97" | "U98" | "U99" | "U100";
}

/**
 * A UserProfile resource lets you list all DFA user profiles that are
 * associated with a Google user account. The profile_id needs to be specified
 * in other API requests.
 */
export interface UserProfile {
  /**
   * The account ID to which this profile belongs.
   */
  accountId?: bigint;
  /**
   * The account name this profile belongs to.
   */
  accountName?: string;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userProfile".
   */
  kind?: string;
  /**
   * The unique ID of the user profile.
   */
  profileId?: bigint;
  /**
   * The sub account ID this profile belongs to if applicable.
   */
  subAccountId?: bigint;
  /**
   * The sub account name this profile belongs to if applicable.
   */
  subAccountName?: string;
  /**
   * The user name.
   */
  userName?: string;
}

function serializeUserProfile(data: any): UserProfile {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    profileId: data["profileId"] !== undefined ? String(data["profileId"]) : undefined,
    subAccountId: data["subAccountId"] !== undefined ? String(data["subAccountId"]) : undefined,
  };
}

function deserializeUserProfile(data: any): UserProfile {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    profileId: data["profileId"] !== undefined ? BigInt(data["profileId"]) : undefined,
    subAccountId: data["subAccountId"] !== undefined ? BigInt(data["subAccountId"]) : undefined,
  };
}

/**
 * Represents the list of user profiles.
 */
export interface UserProfileList {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The user profiles returned in this response.
   */
  items?: UserProfile[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userProfileList".
   */
  kind?: string;
}

function serializeUserProfileList(data: any): UserProfileList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeUserProfile(item))) : undefined,
  };
}

function deserializeUserProfileList(data: any): UserProfileList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeUserProfile(item))) : undefined,
  };
}

/**
 * Contains properties of auser role, which is used to manage user access.
 */
export interface UserRole {
  /**
   * Account ID of this user role. This is a read-only field that can be left
   * blank.
   */
  accountId?: bigint;
  /**
   * Whether this is a default user role. Default user roles are created by the
   * system for the account/subaccount and cannot be modified or deleted. Each
   * default user role comes with a basic set of preassigned permissions.
   */
  defaultUserRole?: boolean;
  /**
   * ID of this user role. This is a read-only, auto-generated field.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRole".
   */
  kind?: string;
  /**
   * Name of this user role. This is a required field. Must be less than 256
   * characters long. If this user role is under a subaccount, the name must be
   * unique among sites of the same subaccount. Otherwise, this user role is a
   * top-level user role, and the name must be unique among top-level user roles
   * of the same account.
   */
  name?: string;
  /**
   * ID of the user role that this user role is based on or copied from. This
   * is a required field.
   */
  parentUserRoleId?: bigint;
  /**
   * List of permissions associated with this user role.
   */
  permissions?: UserRolePermission[];
  /**
   * Subaccount ID of this user role. This is a read-only field that can be
   * left blank.
   */
  subaccountId?: bigint;
}

function serializeUserRole(data: any): UserRole {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    parentUserRoleId: data["parentUserRoleId"] !== undefined ? String(data["parentUserRoleId"]) : undefined,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (serializeUserRolePermission(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeUserRole(data: any): UserRole {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    parentUserRoleId: data["parentUserRoleId"] !== undefined ? BigInt(data["parentUserRoleId"]) : undefined,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (deserializeUserRolePermission(item))) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * Contains properties of a user role permission.
 */
export interface UserRolePermission {
  /**
   * Levels of availability for a user role permission.
   */
  availability?:  | "NOT_AVAILABLE_BY_DEFAULT" | "ACCOUNT_BY_DEFAULT" | "SUBACCOUNT_AND_ACCOUNT_BY_DEFAULT" | "ACCOUNT_ALWAYS" | "SUBACCOUNT_AND_ACCOUNT_ALWAYS" | "USER_PROFILE_ONLY";
  /**
   * ID of this user role permission.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRolePermission".
   */
  kind?: string;
  /**
   * Name of this user role permission.
   */
  name?: string;
  /**
   * ID of the permission group that this user role permission belongs to.
   */
  permissionGroupId?: bigint;
}

function serializeUserRolePermission(data: any): UserRolePermission {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    permissionGroupId: data["permissionGroupId"] !== undefined ? String(data["permissionGroupId"]) : undefined,
  };
}

function deserializeUserRolePermission(data: any): UserRolePermission {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    permissionGroupId: data["permissionGroupId"] !== undefined ? BigInt(data["permissionGroupId"]) : undefined,
  };
}

/**
 * Represents a grouping of related user role permissions.
 */
export interface UserRolePermissionGroup {
  /**
   * ID of this user role permission.
   */
  id?: bigint;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRolePermissionGroup".
   */
  kind?: string;
  /**
   * Name of this user role permission group.
   */
  name?: string;
}

function serializeUserRolePermissionGroup(data: any): UserRolePermissionGroup {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeUserRolePermissionGroup(data: any): UserRolePermissionGroup {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * User Role Permission Group List Response
 */
export interface UserRolePermissionGroupsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRolePermissionGroupsListResponse".
   */
  kind?: string;
  /**
   * User role permission group collection.
   */
  userRolePermissionGroups?: UserRolePermissionGroup[];
}

function serializeUserRolePermissionGroupsListResponse(data: any): UserRolePermissionGroupsListResponse {
  return {
    ...data,
    userRolePermissionGroups: data["userRolePermissionGroups"] !== undefined ? data["userRolePermissionGroups"].map((item: any) => (serializeUserRolePermissionGroup(item))) : undefined,
  };
}

function deserializeUserRolePermissionGroupsListResponse(data: any): UserRolePermissionGroupsListResponse {
  return {
    ...data,
    userRolePermissionGroups: data["userRolePermissionGroups"] !== undefined ? data["userRolePermissionGroups"].map((item: any) => (deserializeUserRolePermissionGroup(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#userRolePermissionsList.
 */
export interface UserRolePermissionsListOptions {
  /**
   * Select only user role permissions with these IDs.
   */
  ids?: bigint;
}

function serializeUserRolePermissionsListOptions(data: any): UserRolePermissionsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
  };
}

function deserializeUserRolePermissionsListOptions(data: any): UserRolePermissionsListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
  };
}

/**
 * User Role Permission List Response
 */
export interface UserRolePermissionsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRolePermissionsListResponse".
   */
  kind?: string;
  /**
   * User role permission collection.
   */
  userRolePermissions?: UserRolePermission[];
}

function serializeUserRolePermissionsListResponse(data: any): UserRolePermissionsListResponse {
  return {
    ...data,
    userRolePermissions: data["userRolePermissions"] !== undefined ? data["userRolePermissions"].map((item: any) => (serializeUserRolePermission(item))) : undefined,
  };
}

function deserializeUserRolePermissionsListResponse(data: any): UserRolePermissionsListResponse {
  return {
    ...data,
    userRolePermissions: data["userRolePermissions"] !== undefined ? data["userRolePermissions"].map((item: any) => (deserializeUserRolePermission(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#userRolesList.
 */
export interface UserRolesListOptions {
  /**
   * Select only account level user roles not associated with any specific
   * subaccount.
   */
  accountUserRoleOnly?: boolean;
  /**
   * Select only user roles with the specified IDs.
   */
  ids?: bigint;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Value of the nextPageToken from the previous result page.
   */
  pageToken?: string;
  /**
   * Allows searching for objects by name or ID. Wildcards (*) are allowed. For
   * example, "userrole*2015" will return objects with names like "userrole June
   * 2015", "userrole April 2015", or simply "userrole 2015". Most of the
   * searches also add wildcards implicitly at the start and the end of the
   * search string. For example, a search string of "userrole" will match
   * objects with name "my userrole", "userrole 2015", or simply "userrole".
   */
  searchString?: string;
  /**
   * Field by which to sort the list.
   */
  sortField?:  | "ID" | "NAME";
  /**
   * Order of sorted results.
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
  /**
   * Select only user roles that belong to this subaccount.
   */
  subaccountId?: bigint;
}

function serializeUserRolesListOptions(data: any): UserRolesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? String(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? String(data["subaccountId"]) : undefined,
  };
}

function deserializeUserRolesListOptions(data: any): UserRolesListOptions {
  return {
    ...data,
    ids: data["ids"] !== undefined ? BigInt(data["ids"]) : undefined,
    subaccountId: data["subaccountId"] !== undefined ? BigInt(data["subaccountId"]) : undefined,
  };
}

/**
 * User Role List Response
 */
export interface UserRolesListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#userRolesListResponse".
   */
  kind?: string;
  /**
   * Pagination token to be used for the next list operation.
   */
  nextPageToken?: string;
  /**
   * User role collection.
   */
  userRoles?: UserRole[];
}

function serializeUserRolesListResponse(data: any): UserRolesListResponse {
  return {
    ...data,
    userRoles: data["userRoles"] !== undefined ? data["userRoles"].map((item: any) => (serializeUserRole(item))) : undefined,
  };
}

function deserializeUserRolesListResponse(data: any): UserRolesListResponse {
  return {
    ...data,
    userRoles: data["userRoles"] !== undefined ? data["userRoles"].map((item: any) => (deserializeUserRole(item))) : undefined,
  };
}

/**
 * Additional options for dfareporting#userRolesPatch.
 */
export interface UserRolesPatchOptions {
  /**
   * UserRole ID.
   */
  id: bigint;
}

function serializeUserRolesPatchOptions(data: any): UserRolesPatchOptions {
  return {
    ...data,
    id: String(data["id"]),
  };
}

function deserializeUserRolesPatchOptions(data: any): UserRolesPatchOptions {
  return {
    ...data,
    id: BigInt(data["id"]),
  };
}

/**
 * Defines the filtering on a single uvar.
 */
export interface UvarFilter {
  /**
   * Return rows which don't match this filter.
   */
  complement?: boolean;
  /**
   * Custom variable index the filter is applied to.
   */
  index?: bigint;
  /**
   * The kind of resource this is, in this case dfareporting#uvarFilter.
   */
  kind?: string;
  /**
   * Indicates how the filter should be matched to the values.
   */
  match?:  | "UNSPECIFIED" | "EXACT" | "CONTAINS";
  /**
   * Values to filter on.
   */
  values?: string[];
}

function serializeUvarFilter(data: any): UvarFilter {
  return {
    ...data,
    index: data["index"] !== undefined ? String(data["index"]) : undefined,
  };
}

function deserializeUvarFilter(data: any): UvarFilter {
  return {
    ...data,
    index: data["index"] !== undefined ? BigInt(data["index"]) : undefined,
  };
}

/**
 * Contains information about supported video formats.
 */
export interface VideoFormat {
  /**
   * File type of the video format.
   */
  fileType?:  | "FLV" | "THREEGPP" | "MP4" | "WEBM" | "M3U8";
  /**
   * ID of the video format.
   */
  id?: number;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#videoFormat".
   */
  kind?: string;
  /**
   * The resolution of this video format.
   */
  resolution?: Size;
  /**
   * The target bit rate of this video format.
   */
  targetBitRate?: number;
}

function serializeVideoFormat(data: any): VideoFormat {
  return {
    ...data,
    resolution: data["resolution"] !== undefined ? serializeSize(data["resolution"]) : undefined,
  };
}

function deserializeVideoFormat(data: any): VideoFormat {
  return {
    ...data,
    resolution: data["resolution"] !== undefined ? deserializeSize(data["resolution"]) : undefined,
  };
}

/**
 * Video Format List Response
 */
export interface VideoFormatsListResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#videoFormatsListResponse".
   */
  kind?: string;
  /**
   * Video format collection.
   */
  videoFormats?: VideoFormat[];
}

function serializeVideoFormatsListResponse(data: any): VideoFormatsListResponse {
  return {
    ...data,
    videoFormats: data["videoFormats"] !== undefined ? data["videoFormats"].map((item: any) => (serializeVideoFormat(item))) : undefined,
  };
}

function deserializeVideoFormatsListResponse(data: any): VideoFormatsListResponse {
  return {
    ...data,
    videoFormats: data["videoFormats"] !== undefined ? data["videoFormats"].map((item: any) => (deserializeVideoFormat(item))) : undefined,
  };
}

/**
 * Video Offset
 */
export interface VideoOffset {
  /**
   * Duration, as a percentage of video duration. Do not set when offsetSeconds
   * is set. Acceptable values are 0 to 100, inclusive.
   */
  offsetPercentage?: number;
  /**
   * Duration, in seconds. Do not set when offsetPercentage is set. Acceptable
   * values are 0 to 86399, inclusive.
   */
  offsetSeconds?: number;
}

/**
 * Video Settings
 */
export interface VideoSettings {
  /**
   * Settings for the companion creatives of video creatives served to this
   * placement.
   */
  companionSettings?: CompanionSetting;
  /**
   * Duration of a video placement in seconds.
   */
  durationSeconds?: number;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "dfareporting#videoSettings".
   */
  kind?: string;
  /**
   * Whether OBA icons are enabled for this placement.
   */
  obaEnabled?: boolean;
  /**
   * Settings for the OBA icon of video creatives served to this placement. If
   * this object is provided, the creative-level OBA settings will be
   * overridden.
   */
  obaSettings?: ObaIcon;
  /**
   * Orientation of a video placement. If this value is set, placement will
   * return assets matching the specified orientation.
   */
  orientation?:  | "ANY" | "LANDSCAPE" | "PORTRAIT";
  /**
   * Publisher specification ID of a video placement.
   */
  publisherSpecificationId?: bigint;
  /**
   * Settings for the skippability of video creatives served to this placement.
   * If this object is provided, the creative-level skippable settings will be
   * overridden.
   */
  skippableSettings?: SkippableSetting;
  /**
   * Settings for the transcodes of video creatives served to this placement.
   * If this object is provided, the creative-level transcode settings will be
   * overridden.
   */
  transcodeSettings?: TranscodeSetting;
}

function serializeVideoSettings(data: any): VideoSettings {
  return {
    ...data,
    companionSettings: data["companionSettings"] !== undefined ? serializeCompanionSetting(data["companionSettings"]) : undefined,
    obaSettings: data["obaSettings"] !== undefined ? serializeObaIcon(data["obaSettings"]) : undefined,
    publisherSpecificationId: data["publisherSpecificationId"] !== undefined ? String(data["publisherSpecificationId"]) : undefined,
  };
}

function deserializeVideoSettings(data: any): VideoSettings {
  return {
    ...data,
    companionSettings: data["companionSettings"] !== undefined ? deserializeCompanionSetting(data["companionSettings"]) : undefined,
    obaSettings: data["obaSettings"] !== undefined ? deserializeObaIcon(data["obaSettings"]) : undefined,
    publisherSpecificationId: data["publisherSpecificationId"] !== undefined ? BigInt(data["publisherSpecificationId"]) : undefined,
  };
}