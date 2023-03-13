// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Real-time Bidding API Client for Deno
 * =====================================
 * 
 * Allows external bidders to manage their RTB integration with Google. This includes managing bidder endpoints, QPS quotas, configuring what ad inventory to receive via pretargeting, submitting creatives for verification, and accessing creative metadata such as approval status.
 * 
 * Docs: https://developers.google.com/authorized-buyers/apis/realtimebidding/reference/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Allows external bidders to manage their RTB integration with Google. This
 * includes managing bidder endpoints, QPS quotas, configuring what ad inventory
 * to receive via pretargeting, submitting creatives for verification, and
 * accessing creative metadata such as approval status.
 */
export class realtimeBidding {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://realtimebidding.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists creatives as they are at the time of the initial request. This call
   * may take multiple hours to complete. For large, paginated requests, this
   * method returns a snapshot of creatives at the time of request for the first
   * page. `lastStatusUpdate` and `creativeServingDecision` may be outdated for
   * creatives on sequential pages. We recommend [Google Cloud
   * Pub/Sub](//cloud.google.com/pubsub/docs/overview) to view the latest
   * status.
   *
   * @param parent Required. Name of the parent buyer that owns the creatives. The pattern for this resource is either `buyers/{buyerAccountId}` or `bidders/{bidderAccountId}`. For `buyers/{buyerAccountId}`, the `buyerAccountId` can be one of the following: 1. The ID of the buyer that is accessing their own creatives. 2. The ID of the child seat buyer under a bidder account. So for listing creatives pertaining to the child seat buyer (`456`) under bidder account (`123`), you would use the pattern: `buyers/456`. 3. The ID of the bidder itself. So for listing creatives pertaining to bidder (`123`), you would use `buyers/123`. If you want to access all creatives pertaining to both the bidder and all of its child seat accounts, you would use `bidders/{bidderAccountId}`, for example, for all creatives pertaining to bidder (`123`), use `bidders/123`.
   */
  async biddersCreativesList(parent: string, opts: BiddersCreativesListOptions = {}): Promise<ListCreativesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/creatives`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
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
    return deserializeListCreativesResponse(data);
  }

  /**
   * Watches all creatives pertaining to a bidder. It is sufficient to invoke
   * this endpoint once per bidder. A Pub/Sub topic will be created and
   * notifications will be pushed to the topic when any of the bidder's
   * creatives change status. All of the bidder's service accounts will have
   * access to read from the topic. Subsequent invocations of this method will
   * return the existing Pub/Sub configuration.
   *
   * @param parent Required. To watch all creatives pertaining to the bidder and all its child seat accounts, the bidder must follow the pattern `bidders/{bidderAccountId}`.
   */
  async biddersCreativesWatch(parent: string, req: WatchCreativesRequest): Promise<WatchCreativesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/creatives:watch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WatchCreativesResponse;
  }

  /**
   * Gets a bidder endpoint by its name.
   *
   * @param name Required. Name of the bidder endpoint to get. Format: `bidders/{bidderAccountId}/endpoints/{endpointId}`
   */
  async biddersEndpointsGet(name: string): Promise<Endpoint> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEndpoint(data);
  }

  /**
   * Lists all the bidder's endpoints.
   *
   * @param parent Required. Name of the bidder whose endpoints will be listed. Format: `bidders/{bidderAccountId}`
   */
  async biddersEndpointsList(parent: string, opts: BiddersEndpointsListOptions = {}): Promise<ListEndpointsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpoints`);
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
    return deserializeListEndpointsResponse(data);
  }

  /**
   * Updates a bidder's endpoint.
   *
   * @param name Output only. Name of the endpoint resource that must follow the pattern `bidders/{bidderAccountId}/endpoints/{endpointId}`, where {bidderAccountId} is the account ID of the bidder who operates this endpoint, and {endpointId} is a unique ID assigned by the server.
   */
  async biddersEndpointsPatch(name: string, req: Endpoint, opts: BiddersEndpointsPatchOptions = {}): Promise<Endpoint> {
    req = serializeEndpoint(req);
    opts = serializeBiddersEndpointsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeEndpoint(data);
  }

  /**
   * Gets a bidder account by its name.
   *
   * @param name Required. Name of the bidder to get. Format: `bidders/{bidderAccountId}`
   */
  async biddersGet(name: string): Promise<Bidder> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bidder;
  }

  /**
   * Lists all the bidder accounts that belong to the caller.
   *
   */
  async biddersList(opts: BiddersListOptions = {}): Promise<ListBiddersResponse> {
    const url = new URL(`${this.#baseUrl}v1/bidders`);
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
    return data as ListBiddersResponse;
  }

  /**
   * Activates a pretargeting configuration.
   *
   * @param name Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsActivate(name: string, req: ActivatePretargetingConfigRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Adds targeted apps to the pretargeting configuration.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsAddTargetedApps(pretargetingConfig: string, req: AddTargetedAppsRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:addTargetedApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Adds targeted publishers to the pretargeting config.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsAddTargetedPublishers(pretargetingConfig: string, req: AddTargetedPublishersRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:addTargetedPublishers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Adds targeted sites to the pretargeting configuration.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsAddTargetedSites(pretargetingConfig: string, req: AddTargetedSitesRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:addTargetedSites`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Creates a pretargeting configuration. A pretargeting configuration's state
   * (PretargetingConfig.state) is active upon creation, and it will start to
   * affect traffic shortly after. A bidder may create a maximum of 10
   * pretargeting configurations. Attempts to exceed this maximum results in a
   * 400 bad request error.
   *
   * @param parent Required. Name of the bidder to create the pretargeting configuration for. Format: bidders/{bidderAccountId}
   */
  async biddersPretargetingConfigsCreate(parent: string, req: PretargetingConfig): Promise<PretargetingConfig> {
    req = serializePretargetingConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/pretargetingConfigs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Deletes a pretargeting configuration.
   *
   * @param name Required. The name of the pretargeting configuration to delete. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a pretargeting configuration.
   *
   * @param name Required. Name of the pretargeting configuration to get. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsGet(name: string): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Lists all pretargeting configurations for a single bidder.
   *
   * @param parent Required. Name of the bidder whose pretargeting configurations will be listed. Format: bidders/{bidderAccountId}
   */
  async biddersPretargetingConfigsList(parent: string, opts: BiddersPretargetingConfigsListOptions = {}): Promise<ListPretargetingConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/pretargetingConfigs`);
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
    return deserializeListPretargetingConfigsResponse(data);
  }

  /**
   * Updates a pretargeting configuration.
   *
   * @param name Output only. Name of the pretargeting configuration that must follow the pattern `bidders/{bidder_account_id}/pretargetingConfigs/{config_id}`
   */
  async biddersPretargetingConfigsPatch(name: string, req: PretargetingConfig, opts: BiddersPretargetingConfigsPatchOptions = {}): Promise<PretargetingConfig> {
    req = serializePretargetingConfig(req);
    opts = serializeBiddersPretargetingConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Removes targeted apps from the pretargeting configuration.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsRemoveTargetedApps(pretargetingConfig: string, req: RemoveTargetedAppsRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:removeTargetedApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Removes targeted publishers from the pretargeting config.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsRemoveTargetedPublishers(pretargetingConfig: string, req: RemoveTargetedPublishersRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:removeTargetedPublishers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Removes targeted sites from the pretargeting configuration.
   *
   * @param pretargetingConfig Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsRemoveTargetedSites(pretargetingConfig: string, req: RemoveTargetedSitesRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ pretargetingConfig }:removeTargetedSites`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Suspends a pretargeting configuration.
   *
   * @param name Required. The name of the pretargeting configuration. Format: bidders/{bidderAccountId}/pretargetingConfig/{configId}
   */
  async biddersPretargetingConfigsSuspend(name: string, req: SuspendPretargetingConfigRequest): Promise<PretargetingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:suspend`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePretargetingConfig(data);
  }

  /**
   * Batch approves multiple publisher connections.
   *
   * @param parent Required. The bidder for whom publisher connections will be approved. Format: `bidders/{bidder}` where `{bidder}` is the account ID of the bidder.
   */
  async biddersPublisherConnectionsBatchApprove(parent: string, req: BatchApprovePublisherConnectionsRequest): Promise<BatchApprovePublisherConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/publisherConnections:batchApprove`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchApprovePublisherConnectionsResponse;
  }

  /**
   * Batch rejects multiple publisher connections.
   *
   * @param parent Required. The bidder for whom publisher connections will be rejected. Format: `bidders/{bidder}` where `{bidder}` is the account ID of the bidder.
   */
  async biddersPublisherConnectionsBatchReject(parent: string, req: BatchRejectPublisherConnectionsRequest): Promise<BatchRejectPublisherConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/publisherConnections:batchReject`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchRejectPublisherConnectionsResponse;
  }

  /**
   * Gets a publisher connection.
   *
   * @param name Required. Name of the publisher whose connection information is to be retrieved. In the pattern `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt publisher ID. See publisherConnection.name.
   */
  async biddersPublisherConnectionsGet(name: string): Promise<PublisherConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PublisherConnection;
  }

  /**
   * Lists publisher connections for a given bidder.
   *
   * @param parent Required. Name of the bidder for which publishers have initiated connections. The pattern for this resource is `bidders/{bidder}` where `{bidder}` represents the account ID of the bidder.
   */
  async biddersPublisherConnectionsList(parent: string, opts: BiddersPublisherConnectionsListOptions = {}): Promise<ListPublisherConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/publisherConnections`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
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
    return data as ListPublisherConnectionsResponse;
  }

  /**
   * Creates a creative.
   *
   * @param parent Required. The name of the parent buyer that the new creative belongs to that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns a creative. For a bidder accessing creatives on behalf of a child seat buyer, `{buyerAccountId}` should represent the account ID of the child seat buyer.
   */
  async buyersCreativesCreate(parent: string, req: Creative): Promise<Creative> {
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/creatives`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Gets a creative.
   *
   * @param name Required. Name of the creative to retrieve. See creative.name.
   */
  async buyersCreativesGet(name: string, opts: BuyersCreativesGetOptions = {}): Promise<Creative> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreative(data);
  }

  /**
   * Lists creatives as they are at the time of the initial request. This call
   * may take multiple hours to complete. For large, paginated requests, this
   * method returns a snapshot of creatives at the time of request for the first
   * page. `lastStatusUpdate` and `creativeServingDecision` may be outdated for
   * creatives on sequential pages. We recommend [Google Cloud
   * Pub/Sub](//cloud.google.com/pubsub/docs/overview) to view the latest
   * status.
   *
   * @param parent Required. Name of the parent buyer that owns the creatives. The pattern for this resource is either `buyers/{buyerAccountId}` or `bidders/{bidderAccountId}`. For `buyers/{buyerAccountId}`, the `buyerAccountId` can be one of the following: 1. The ID of the buyer that is accessing their own creatives. 2. The ID of the child seat buyer under a bidder account. So for listing creatives pertaining to the child seat buyer (`456`) under bidder account (`123`), you would use the pattern: `buyers/456`. 3. The ID of the bidder itself. So for listing creatives pertaining to bidder (`123`), you would use `buyers/123`. If you want to access all creatives pertaining to both the bidder and all of its child seat accounts, you would use `bidders/{bidderAccountId}`, for example, for all creatives pertaining to bidder (`123`), use `bidders/123`.
   */
  async buyersCreativesList(parent: string, opts: BuyersCreativesListOptions = {}): Promise<ListCreativesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/creatives`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
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
    return deserializeListCreativesResponse(data);
  }

  /**
   * Updates a creative.
   *
   * @param name Output only. Name of the creative. Follows the pattern `buyers/{buyer}/creatives/{creative}`, where `{buyer}` represents the account ID of the buyer who owns the creative, and `{creative}` is the buyer-specific creative ID that references this creative in the bid response.
   */
  async buyersCreativesPatch(name: string, req: Creative, opts: BuyersCreativesPatchOptions = {}): Promise<Creative> {
    req = serializeCreative(req);
    opts = serializeBuyersCreativesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Gets a buyer account by its name.
   *
   * @param name Required. Name of the buyer to get. Format: `buyers/{buyerId}`
   */
  async buyersGet(name: string): Promise<Buyer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Buyer;
  }

  /**
   * Gets remarketing tag for a buyer. A remarketing tag is a piece of
   * JavaScript code that can be placed on a web page. When a user visits a page
   * containing a remarketing tag, Google adds the user to a user list.
   *
   * @param name Required. To fetch remarketing tag for an account, name must follow the pattern `buyers/{accountId}` where `{accountId}` represents ID of a buyer that owns the remarketing tag. For a bidder accessing remarketing tag on behalf of a child seat buyer, `{accountId}` should represent the ID of the child seat buyer. To fetch remarketing tag for a specific user list, name must follow the pattern `buyers/{accountId}/userLists/{userListId}`. See UserList.name.
   */
  async buyersGetRemarketingTag(name: string): Promise<GetRemarketingTagResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getRemarketingTag`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetRemarketingTagResponse;
  }

  /**
   * Lists all buyer account information the calling buyer user or service
   * account is permissioned to manage.
   *
   */
  async buyersList(opts: BuyersListOptions = {}): Promise<ListBuyersResponse> {
    const url = new URL(`${this.#baseUrl}v1/buyers`);
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
    return data as ListBuyersResponse;
  }

  /**
   * Change the status of a user list to CLOSED. This prevents new users from
   * being added to the user list.
   *
   * @param name Required. The name of the user list to close. See UserList.name
   */
  async buyersUserListsClose(name: string, req: CloseUserListRequest): Promise<UserList> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:close`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUserList(data);
  }

  /**
   * Create a new user list.
   *
   * @param parent Required. The name of the parent buyer of the user list to be retrieved that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns user lists. For a bidder accessing user lists on behalf of a child seat buyer , `{buyerAccountId}` should represent the account ID of the child seat buyer.
   */
  async buyersUserListsCreate(parent: string, req: UserList): Promise<UserList> {
    req = serializeUserList(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/userLists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUserList(data);
  }

  /**
   * Gets a user list by its name.
   *
   * @param name Required. The name of the user list to be retrieved. See UserList.name.
   */
  async buyersUserListsGet(name: string): Promise<UserList> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserList(data);
  }

  /**
   * Gets remarketing tag for a buyer. A remarketing tag is a piece of
   * JavaScript code that can be placed on a web page. When a user visits a page
   * containing a remarketing tag, Google adds the user to a user list.
   *
   * @param name Required. To fetch remarketing tag for an account, name must follow the pattern `buyers/{accountId}` where `{accountId}` represents ID of a buyer that owns the remarketing tag. For a bidder accessing remarketing tag on behalf of a child seat buyer, `{accountId}` should represent the ID of the child seat buyer. To fetch remarketing tag for a specific user list, name must follow the pattern `buyers/{accountId}/userLists/{userListId}`. See UserList.name.
   */
  async buyersUserListsGetRemarketingTag(name: string): Promise<GetRemarketingTagResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getRemarketingTag`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetRemarketingTagResponse;
  }

  /**
   * Lists the user lists visible to the current user.
   *
   * @param parent Required. The name of the parent buyer for the user lists to be returned that must follow the pattern `buyers/{buyerAccountId}`, where `{buyerAccountId}` represents the account ID of the buyer who owns user lists. For a bidder accessing user lists on behalf of a child seat buyer , `{buyerAccountId}` should represent the account ID of the child seat buyer.
   */
  async buyersUserListsList(parent: string, opts: BuyersUserListsListOptions = {}): Promise<ListUserListsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/userLists`);
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
    return deserializeListUserListsResponse(data);
  }

  /**
   * Change the status of a user list to OPEN. This allows new users to be
   * added to the user list.
   *
   * @param name Required. The name of the user list to open. See UserList.name
   */
  async buyersUserListsOpen(name: string, req: OpenUserListRequest): Promise<UserList> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:open`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUserList(data);
  }

  /**
   * Update the given user list. Only user lists with URLRestrictions can be
   * updated.
   *
   * @param name Output only. Name of the user list that must follow the pattern `buyers/{buyer}/userLists/{user_list}`, where `{buyer}` represents the account ID of the buyer who owns the user list. For a bidder accessing user lists on behalf of a child seat buyer, `{buyer}` represents the account ID of the child seat buyer. `{user_list}` is an int64 identifier assigned by Google to uniquely identify a user list.
   */
  async buyersUserListsUpdate(name: string, req: UserList): Promise<UserList> {
    req = serializeUserList(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeUserList(data);
  }
}

/**
 * A request to activate a pretargeting configuration. Sets the configuration's
 * state to ACTIVE.
 */
export interface ActivatePretargetingConfigRequest {
}

/**
 * A request to start targeting the provided app IDs in a specific pretargeting
 * configuration. The pretargeting configuration itself specifies how these apps
 * are targeted. in PretargetingConfig.appTargeting.mobileAppTargeting.
 */
export interface AddTargetedAppsRequest {
  /**
   * A list of app IDs to target in the pretargeting configuration. These
   * values will be added to the list of targeted app IDs in
   * PretargetingConfig.appTargeting.mobileAppTargeting.values.
   */
  appIds?: string[];
  /**
   * Required. The targeting mode that should be applied to the list of app
   * IDs. If there are existing targeted app IDs, must be equal to the existing
   * PretargetingConfig.appTargeting.mobileAppTargeting.targetingMode or a 400
   * bad request error will be returned.
   */
  targetingMode?:  | "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE";
}

/**
 * A request to start targeting the provided publishers in a specific
 * pretargeting configuration. The pretargeting configuration itself specifies
 * how these publishers are targeted in PretargetingConfig.publisherTargeting.
 */
export interface AddTargetedPublishersRequest {
  /**
   * A list of publisher IDs to target in the pretargeting configuration. These
   * values will be added to the list of targeted publisher IDs in
   * PretargetingConfig.publisherTargeting.values. Publishers are identified by
   * their publisher ID from ads.txt / app-ads.txt. See
   * https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for
   * more details.
   */
  publisherIds?: string[];
  /**
   * Required. The targeting mode that should be applied to the list of
   * publisher IDs. If are existing publisher IDs, must be equal to the existing
   * PretargetingConfig.publisherTargeting.targetingMode or a 400 bad request
   * error will be returned.
   */
  targetingMode?:  | "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE";
}

/**
 * A request to start targeting the provided sites in a specific pretargeting
 * configuration. The pretargeting configuration itself specifies how these
 * sites are targeted in PretargetingConfig.webTargeting.
 */
export interface AddTargetedSitesRequest {
  /**
   * A list of site URLs to target in the pretargeting configuration. These
   * values will be added to the list of targeted URLs in
   * PretargetingConfig.webTargeting.values.
   */
  sites?: string[];
  /**
   * Required. The targeting mode that should be applied to the list of site
   * URLs. If there are existing targeted sites, must be equal to the existing
   * PretargetingConfig.webTargeting.targetingMode or a 400 bad request error
   * will be returned.
   */
  targetingMode?:  | "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE";
}

/**
 * The list of detected Ad Technology Providers for this creative. Bids placed
 * for inventory that will serve to EEA or UK users are expected to comply with
 * GDPR requirements. You must ensure that the creatives used in such bids
 * should contain only user consented ad technology providers as indicated in
 * the bid request. Google reserves the right to filter non-compliant bids. User
 * consented ad technology providers can be found in the [Google
 * Protocol](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto)
 * with the `BidRequest.adslot.consented_providers_settings` field, and can be
 * found as an [OpenRTB
 * extension](https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto)
 * with the `BidRequest.user.ext.consented_providers_settings` and
 * `BidRequest.user.ext.consent` fields. See
 * https://support.google.com/authorizedbuyers/answer/9789378 for additional
 * information about the Google TCF v2 integration.
 */
export interface AdTechnologyProviders {
  /**
   * The detected IAB Global Vendor List (GVL) IDs for this creative. See the
   * IAB Global Vendor List at
   * https://vendor-list.consensu.org/v2/vendor-list.json for details about the
   * vendors.
   */
  detectedGvlIds?: bigint[];
  /**
   * The detected [Google Ad Tech Providers
   * (ATP)](https://support.google.com/admanager/answer/9012903) for this
   * creative. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for
   * mapping of provider ID to provided name, a privacy policy URL, and a list
   * of domains which can be attributed to the provider.
   */
  detectedProviderIds?: bigint[];
  /**
   * Domains of detected unidentified ad technology providers (if any). You
   * must ensure that the creatives used in bids placed for inventory that will
   * serve to EEA or UK users does not contain unidentified ad technology
   * providers. Google reserves the right to filter non-compliant bids.
   */
  unidentifiedProviderDomains?: string[];
}

function serializeAdTechnologyProviders(data: any): AdTechnologyProviders {
  return {
    ...data,
    detectedGvlIds: data["detectedGvlIds"] !== undefined ? data["detectedGvlIds"].map((item: any) => (String(item))) : undefined,
    detectedProviderIds: data["detectedProviderIds"] !== undefined ? data["detectedProviderIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeAdTechnologyProviders(data: any): AdTechnologyProviders {
  return {
    ...data,
    detectedGvlIds: data["detectedGvlIds"] !== undefined ? data["detectedGvlIds"].map((item: any) => (BigInt(item))) : undefined,
    detectedProviderIds: data["detectedProviderIds"] !== undefined ? data["detectedProviderIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Detected advertiser and brand information.
 */
export interface AdvertiserAndBrand {
  /**
   * See https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt
   * for the list of possible values. Can be used to filter the response of the
   * creatives.list method.
   */
  advertiserId?: bigint;
  /**
   * Advertiser name. Can be used to filter the response of the creatives.list
   * method.
   */
  advertiserName?: string;
  /**
   * Detected brand ID or zero if no brand has been detected. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt for the list
   * of possible values. Can be used to filter the response of the
   * creatives.list method.
   */
  brandId?: bigint;
  /**
   * Brand name. Can be used to filter the response of the creatives.list
   * method.
   */
  brandName?: string;
}

function serializeAdvertiserAndBrand(data: any): AdvertiserAndBrand {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    brandId: data["brandId"] !== undefined ? String(data["brandId"]) : undefined,
  };
}

function deserializeAdvertiserAndBrand(data: any): AdvertiserAndBrand {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    brandId: data["brandId"] !== undefined ? BigInt(data["brandId"]) : undefined,
  };
}

/**
 * A subset of app inventory to target. Bid requests that match criteria in at
 * least one of the specified dimensions will be sent.
 */
export interface AppTargeting {
  /**
   * Lists of included and excluded mobile app categories as defined in
   * https://developers.google.com/adwords/api/docs/appendix/mobileappcategories.csv.
   */
  mobileAppCategoryTargeting?: NumericTargetingDimension;
  /**
   * Targeted app IDs. App IDs can refer to those found in an app store or ones
   * that are not published in an app store. A maximum of 30,000 app IDs can be
   * targeted.
   */
  mobileAppTargeting?: StringTargetingDimension;
}

function serializeAppTargeting(data: any): AppTargeting {
  return {
    ...data,
    mobileAppCategoryTargeting: data["mobileAppCategoryTargeting"] !== undefined ? serializeNumericTargetingDimension(data["mobileAppCategoryTargeting"]) : undefined,
  };
}

function deserializeAppTargeting(data: any): AppTargeting {
  return {
    ...data,
    mobileAppCategoryTargeting: data["mobileAppCategoryTargeting"] !== undefined ? deserializeNumericTargetingDimension(data["mobileAppCategoryTargeting"]) : undefined,
  };
}

/**
 * A request to approve a batch of publisher connections.
 */
export interface BatchApprovePublisherConnectionsRequest {
  /**
   * Required. The names of the publishers with which connections will be
   * approved. In the pattern
   * `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the
   * account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt
   * publisher ID.
   */
  names?: string[];
}

/**
 * A response for the request to approve a batch of publisher connections.
 */
export interface BatchApprovePublisherConnectionsResponse {
  /**
   * The publisher connections that have been approved.
   */
  publisherConnections?: PublisherConnection[];
}

/**
 * A request to reject a batch of publisher connections.
 */
export interface BatchRejectPublisherConnectionsRequest {
  /**
   * Required. The names of the publishers with whom connection will be
   * rejected. In the pattern
   * `bidders/{bidder}/publisherConnections/{publisher}` where `{bidder}` is the
   * account ID of the bidder, and `{publisher}` is the ads.txt/app-ads.txt
   * publisher ID.
   */
  names?: string[];
}

/**
 * A response for the request to reject a batch of publisher connections.
 */
export interface BatchRejectPublisherConnectionsResponse {
  /**
   * The publisher connections that have been rejected.
   */
  publisherConnections?: PublisherConnection[];
}

/**
 * Bidder settings.
 */
export interface Bidder {
  /**
   * Output only. An option to bypass pretargeting for private auctions and
   * preferred deals. When true, bid requests from these nonguaranteed deals
   * will always be sent. When false, bid requests will be subject to regular
   * pretargeting configurations. Programmatic Guaranteed deals will always be
   * sent to the bidder, regardless of the value for this flag. Auction packages
   * are not impacted by this value and are subject to the regular pretargeting
   * configurations.
   */
  readonly bypassNonguaranteedDealsPretargeting?: boolean;
  /**
   * Output only. The buyer's network ID used for cookie matching. This ID
   * corresponds to the `google_nid` parameter in the URL used in cookie match
   * requests. Refer to
   * https://developers.google.com/authorized-buyers/rtb/cookie-guide for
   * further information.
   */
  readonly cookieMatchingNetworkId?: string;
  /**
   * Output only. The base URL used in cookie match requests. Refer to
   * https://developers.google.com/authorized-buyers/rtb/cookie-guide for
   * further information.
   */
  readonly cookieMatchingUrl?: string;
  /**
   * Output only. The billing ID for the deals pretargeting config. This
   * billing ID is sent on the bid request for guaranteed and nonguaranteed
   * deals matched in pretargeting.
   */
  readonly dealsBillingId?: string;
  /**
   * Output only. Name of the bidder resource that must follow the pattern
   * `bidders/{bidderAccountId}`, where `{bidderAccountId}` is the account ID of
   * the bidder whose information is to be received. One can get their account
   * ID on the Authorized Buyers or Open Bidding UI, or by contacting their
   * Google account manager.
   */
  readonly name?: string;
}

/**
 * Additional options for realtimeBidding#biddersCreativesList.
 */
export interface BiddersCreativesListOptions {
  /**
   * Query string to filter creatives. If no filter is specified, all active
   * creatives will be returned. Example: 'accountId=12345 AND
   * (dealsStatus:DISAPPROVED AND disapprovalReason:UNACCEPTABLE_CONTENT) OR
   * declaredAttributes:IS_COOKIE_TARGETED'
   */
  filter?: string;
  /**
   * Requested page size. The server may return fewer creatives than requested
   * (due to timeout constraint) even if more are available through another
   * call. If unspecified, server will pick an appropriate default. Acceptable
   * values are 1 to 1000, inclusive.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListCreativesResponse.nextPageToken returned from the
   * previous call to the 'ListCreatives' method. Page tokens for continued
   * pages are valid for up to five hours, counting from the call to
   * 'ListCreatives' for the first page.
   */
  pageToken?: string;
  /**
   * Controls the amount of information included in the response. By default
   * only creativeServingDecision is included. To retrieve the entire creative
   * resource (including the declared fields and the creative content) specify
   * the view as "FULL".
   */
  view?:  | "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL";
}

/**
 * Additional options for realtimeBidding#biddersEndpointsList.
 */
export interface BiddersEndpointsListOptions {
  /**
   * The maximum number of endpoints to return. If unspecified, at most 100
   * endpoints will be returned. The maximum value is 500; values above 500 will
   * be coerced to 500.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. This value
   * is received from a previous `ListEndpoints` call in
   * ListEndpointsResponse.nextPageToken.
   */
  pageToken?: string;
}

/**
 * Additional options for realtimeBidding#biddersEndpointsPatch.
 */
export interface BiddersEndpointsPatchOptions {
  /**
   * Field mask to use for partial in-place updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBiddersEndpointsPatchOptions(data: any): BiddersEndpointsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBiddersEndpointsPatchOptions(data: any): BiddersEndpointsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for realtimeBidding#biddersList.
 */
export interface BiddersListOptions {
  /**
   * The maximum number of bidders to return. If unspecified, at most 100
   * bidders will be returned. The maximum value is 500; values above 500 will
   * be coerced to 500.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. This value
   * is received from a previous `ListBidders` call in
   * ListBiddersResponse.nextPageToken.
   */
  pageToken?: string;
}

/**
 * Additional options for realtimeBidding#biddersPretargetingConfigsList.
 */
export interface BiddersPretargetingConfigsListOptions {
  /**
   * The maximum number of pretargeting configurations to return. If
   * unspecified, at most 10 pretargeting configurations will be returned. The
   * maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. This value
   * is received from a previous `ListPretargetingConfigs` call in
   * ListPretargetingConfigsResponse.nextPageToken.
   */
  pageToken?: string;
}

/**
 * Additional options for realtimeBidding#biddersPretargetingConfigsPatch.
 */
export interface BiddersPretargetingConfigsPatchOptions {
  /**
   * Field mask to use for partial in-place updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBiddersPretargetingConfigsPatchOptions(data: any): BiddersPretargetingConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBiddersPretargetingConfigsPatchOptions(data: any): BiddersPretargetingConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for realtimeBidding#biddersPublisherConnectionsList.
 */
export interface BiddersPublisherConnectionsListOptions {
  /**
   * Query string to filter publisher connections. Connections can be filtered
   * by `displayName`, `publisherPlatform`, and `biddingState`. If no filter is
   * specified, all publisher connections will be returned. Example:
   * 'displayName="Great Publisher*" AND publisherPlatform=ADMOB AND
   * biddingState != PENDING' See https://google.aip.dev/160 for more
   * information about filtering syntax.
   */
  filter?: string;
  /**
   * Order specification by which results should be sorted. If no sort order is
   * specified, the results will be returned in alphabetic order based on the
   * publisher's publisher code. Results can be sorted by `createTime`. Example:
   * 'createTime DESC'.
   */
  orderBy?: string;
  /**
   * Requested page size. The server may return fewer results than requested
   * (due to timeout constraint) even if more are available through another
   * call. If unspecified, the server will pick an appropriate default.
   * Acceptable values are 1 to 5000, inclusive.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListPublisherConnectionsResponse.nextPageToken
   * returned from the previous call to the 'ListPublisherConnections' method.
   */
  pageToken?: string;
}

/**
 * RTB Buyer account information.
 */
export interface Buyer {
  /**
   * Output only. The number of creatives that this buyer submitted through the
   * API or bid with in the last 30 days. This is counted against the maximum
   * number of active creatives.
   */
  readonly activeCreativeCount?: bigint;
  /**
   * Output only. The name of the bidder resource that is responsible for
   * receiving bidding traffic for this account. The bidder name must follow the
   * pattern `bidders/{bidderAccountId}`, where `{bidderAccountId}` is the
   * account ID of the bidder receiving traffic for this buyer.
   */
  readonly bidder?: string;
  /**
   * Output only. A list of billing IDs associated with this account. These IDs
   * appear on: 1. A bid request, to signal which buyers are eligible to bid on
   * a given opportunity, and which pretargeting configurations were matched for
   * each eligible buyer. 2. The bid response, to attribute a winning impression
   * to a specific account for billing, reporting, policy and publisher block
   * enforcement.
   */
  readonly billingIds?: string[];
  /**
   * Output only. The diplay name associated with this buyer account, as
   * visible to sellers.
   */
  readonly displayName?: string;
  /**
   * Output only. The maximum number of active creatives that this buyer can
   * have.
   */
  readonly maximumActiveCreativeCount?: bigint;
  /**
   * Output only. Name of the buyer resource that must follow the pattern
   * `buyers/{buyerAccountId}`, where `{buyerAccountId}` is the account ID of
   * the buyer account whose information is to be received. One can get their
   * account ID on the Authorized Buyers or Open Bidding UI, or by contacting
   * their Google account manager.
   */
  readonly name?: string;
}

/**
 * Additional options for realtimeBidding#buyersCreativesGet.
 */
export interface BuyersCreativesGetOptions {
  /**
   * Controls the amount of information included in the response. By default
   * only creativeServingDecision is included. To retrieve the entire creative
   * resource (including the declared fields and the creative content) specify
   * the view as "FULL".
   */
  view?:  | "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL";
}

/**
 * Additional options for realtimeBidding#buyersCreativesList.
 */
export interface BuyersCreativesListOptions {
  /**
   * Query string to filter creatives. If no filter is specified, all active
   * creatives will be returned. Example: 'accountId=12345 AND
   * (dealsStatus:DISAPPROVED AND disapprovalReason:UNACCEPTABLE_CONTENT) OR
   * declaredAttributes:IS_COOKIE_TARGETED'
   */
  filter?: string;
  /**
   * Requested page size. The server may return fewer creatives than requested
   * (due to timeout constraint) even if more are available through another
   * call. If unspecified, server will pick an appropriate default. Acceptable
   * values are 1 to 1000, inclusive.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListCreativesResponse.nextPageToken returned from the
   * previous call to the 'ListCreatives' method. Page tokens for continued
   * pages are valid for up to five hours, counting from the call to
   * 'ListCreatives' for the first page.
   */
  pageToken?: string;
  /**
   * Controls the amount of information included in the response. By default
   * only creativeServingDecision is included. To retrieve the entire creative
   * resource (including the declared fields and the creative content) specify
   * the view as "FULL".
   */
  view?:  | "CREATIVE_VIEW_UNSPECIFIED" | "SERVING_DECISION_ONLY" | "FULL";
}

/**
 * Additional options for realtimeBidding#buyersCreativesPatch.
 */
export interface BuyersCreativesPatchOptions {
  /**
   * Field mask to use for partial in-place updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBuyersCreativesPatchOptions(data: any): BuyersCreativesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBuyersCreativesPatchOptions(data: any): BuyersCreativesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for realtimeBidding#buyersList.
 */
export interface BuyersListOptions {
  /**
   * The maximum number of buyers to return. If unspecified, at most 100 buyers
   * will be returned. The maximum value is 500; values above 500 will be
   * coerced to 500.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. This value
   * is received from a previous `ListBuyers` call in
   * ListBuyersResponse.nextPageToken.
   */
  pageToken?: string;
}

/**
 * Additional options for realtimeBidding#buyersUserListsList.
 */
export interface BuyersUserListsListOptions {
  /**
   * The number of results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation page token (as received from a previous response).
   */
  pageToken?: string;
}

/**
 * A request to close a specified user list.
 */
export interface CloseUserListRequest {
}

/**
 * A creative and its classification data.
 */
export interface Creative {
  /**
   * Output only. ID of the buyer account that this creative is owned by. Can
   * be used to filter the response of the creatives.list method with equality
   * and inequality check.
   */
  readonly accountId?: bigint;
  /**
   * The link to AdChoices destination page. This is only supported for native
   * ads.
   */
  adChoicesDestinationUrl?: string;
  /**
   * The name of the company being advertised in the creative. Can be used to
   * filter the response of the creatives.list method.
   */
  advertiserName?: string;
  /**
   * The agency ID for this creative.
   */
  agencyId?: bigint;
  /**
   * Output only. The last update timestamp of the creative through the API.
   */
  readonly apiUpdateTime?: Date;
  /**
   * Output only. The format of this creative. Can be used to filter the
   * response of the creatives.list method.
   */
  readonly creativeFormat?:  | "CREATIVE_FORMAT_UNSPECIFIED" | "HTML" | "VIDEO" | "NATIVE";
  /**
   * Buyer-specific creative ID that references this creative in bid responses.
   * This field is Ignored in update operations. Can be used to filter the
   * response of the creatives.list method. The maximum length of the creative
   * ID is 128 bytes.
   */
  creativeId?: string;
  /**
   * Output only. Top level status and detected attributes of a creative (for
   * example domain, language, advertiser, product category, etc.) that affect
   * whether (status) and where (context) a creative will be allowed to serve.
   */
  readonly creativeServingDecision?: CreativeServingDecision;
  /**
   * Output only. IDs of all of the deals with which this creative has been
   * used in bidding. Can be used to filter the response of the creatives.list
   * method.
   */
  readonly dealIds?: string[];
  /**
   * All declared attributes for the ads that may be shown from this creative.
   * Can be used to filter the response of the creatives.list method. If the
   * `excluded_attribute` field of a [bid
   * request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto")
   * contains one of the attributes that were declared or detected for a given
   * creative, and a bid is submitted with that creative, the bid will be
   * filtered before the auction.
   */
  declaredAttributes?:  | "ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0"[];
  /**
   * The set of declared destination URLs for the creative. Can be used to
   * filter the response of the creatives.list method.
   */
  declaredClickThroughUrls?: string[];
  /**
   * All declared restricted categories for the ads that may be shown from this
   * creative. Can be used to filter the response of the creatives.list method.
   */
  declaredRestrictedCategories?:  | "RESTRICTED_CATEGORY_UNSPECIFIED" | "ALCOHOL"[];
  /**
   * IDs for the declared ad technology vendors that may be used by this
   * creative. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for
   * possible values. Can be used to filter the response of the creatives.list
   * method.
   */
  declaredVendorIds?: number[];
  /**
   * An HTML creative.
   */
  html?: HtmlContent;
  /**
   * The set of URLs to be called to record an impression.
   */
  impressionTrackingUrls?: string[];
  /**
   * Output only. Name of the creative. Follows the pattern
   * `buyers/{buyer}/creatives/{creative}`, where `{buyer}` represents the
   * account ID of the buyer who owns the creative, and `{creative}` is the
   * buyer-specific creative ID that references this creative in the bid
   * response.
   */
  readonly name?: string;
  /**
   * A native creative.
   */
  native?: NativeContent;
  /**
   * Experimental field that can be used during the [FLEDGE Origin
   * Trial](/authorized-buyers/rtb/fledge-origin-trial). The URL to fetch an
   * interest group ad used in [TURTLEDOVE on-device
   * auction](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups").
   * This should be unique among all creatives for a given `accountId`. This URL
   * should be the same as the URL returned by
   * [generateBid()](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#32-on-device-bidding).
   */
  renderUrl?: string;
  /**
   * All restricted categories for the ads that may be shown from this
   * creative.
   */
  restrictedCategories?:  | "RESTRICTED_CATEGORY_UNSPECIFIED" | "ALCOHOL"[];
  /**
   * Output only. The version of the creative. Version for a new creative is 1
   * and it increments during subsequent creative updates.
   */
  readonly version?: number;
  /**
   * A video creative.
   */
  video?: VideoContent;
}

function serializeCreative(data: any): Creative {
  return {
    ...data,
    agencyId: data["agencyId"] !== undefined ? String(data["agencyId"]) : undefined,
  };
}

function deserializeCreative(data: any): Creative {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? BigInt(data["agencyId"]) : undefined,
    apiUpdateTime: data["apiUpdateTime"] !== undefined ? new Date(data["apiUpdateTime"]) : undefined,
    creativeServingDecision: data["creativeServingDecision"] !== undefined ? deserializeCreativeServingDecision(data["creativeServingDecision"]) : undefined,
  };
}

/**
 * The dimensions of a creative. This applies to only HTML and Native
 * creatives.
 */
export interface CreativeDimensions {
  /**
   * The height of the creative in pixels.
   */
  height?: bigint;
  /**
   * The width of the creative in pixels.
   */
  width?: bigint;
}

function serializeCreativeDimensions(data: any): CreativeDimensions {
  return {
    ...data,
    height: data["height"] !== undefined ? String(data["height"]) : undefined,
    width: data["width"] !== undefined ? String(data["width"]) : undefined,
  };
}

function deserializeCreativeDimensions(data: any): CreativeDimensions {
  return {
    ...data,
    height: data["height"] !== undefined ? BigInt(data["height"]) : undefined,
    width: data["width"] !== undefined ? BigInt(data["width"]) : undefined,
  };
}

/**
 * Top level status and detected attributes of a creative.
 */
export interface CreativeServingDecision {
  /**
   * The detected ad technology providers.
   */
  adTechnologyProviders?: AdTechnologyProviders;
  /**
   * The policy compliance of this creative in China. When approved or
   * disapproved, this applies to both deals and open auction in China. When
   * pending review, this creative is allowed to serve for deals but not for
   * open auction.
   */
  chinaPolicyCompliance?: PolicyCompliance;
  /**
   * Policy compliance of this creative when bidding on Programmatic Guaranteed
   * and Preferred Deals (outside of Russia and China).
   */
  dealsPolicyCompliance?: PolicyCompliance;
  /**
   * Detected advertisers and brands.
   */
  detectedAdvertisers?: AdvertiserAndBrand[];
  /**
   * Publisher-excludable attributes that were detected for this creative. Can
   * be used to filter the response of the creatives.list method. If the
   * `excluded_attribute` field of a [bid
   * request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto)
   * contains one of the attributes that were declared or detected for a given
   * creative, and a bid is submitted with that creative, the bid will be
   * filtered before the auction.
   */
  detectedAttributes?:  | "ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0"[];
  /**
   * The set of detected destination URLs for the creative. Can be used to
   * filter the response of the creatives.list method.
   */
  detectedClickThroughUrls?: string[];
  /**
   * The detected domains for this creative.
   */
  detectedDomains?: string[];
  /**
   * The detected languages for this creative. The order is arbitrary. The
   * codes are 2 or 5 characters and are documented at
   * https://developers.google.com/adwords/api/docs/appendix/languagecodes. Can
   * be used to filter the response of the creatives.list method.
   */
  detectedLanguages?: string[];
  /**
   * Detected product categories, if any. See the ad-product-categories.txt
   * file in the technical documentation for a list of IDs. Can be used to
   * filter the response of the creatives.list method.
   */
  detectedProductCategories?: number[];
  /**
   * Detected sensitive categories, if any. Can be used to filter the response
   * of the creatives.list method. See the ad-sensitive-categories.txt file in
   * the technical documentation for a list of IDs. You should use these IDs
   * along with the excluded-sensitive-category field in the bid request to
   * filter your bids.
   */
  detectedSensitiveCategories?: number[];
  /**
   * IDs of the ad technology vendors that were detected to be used by this
   * creative. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for
   * possible values. Can be used to filter the response of the creatives.list
   * method. If the `allowed_vendor_type` field of a [bid
   * request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto)
   * does not contain one of the vendor type IDs that were declared or detected
   * for a given creative, and a bid is submitted with that creative, the bid
   * will be filtered before the auction.
   */
  detectedVendorIds?: number[];
  /**
   * The last time the creative status was updated. Can be used to filter the
   * response of the creatives.list method.
   */
  lastStatusUpdate?: Date;
  /**
   * Policy compliance of this creative when bidding in open auction, private
   * auction, or auction packages (outside of Russia and China).
   */
  networkPolicyCompliance?: PolicyCompliance;
  /**
   * Policy compliance of this creative when bidding in Open Bidding (outside
   * of Russia and China). For the list of platform policies, see:
   * https://support.google.com/platformspolicy/answer/3013851.
   */
  platformPolicyCompliance?: PolicyCompliance;
  /**
   * The policy compliance of this creative in Russia. When approved or
   * disapproved, this applies to both deals and open auction in Russia. When
   * pending review, this creative is allowed to serve for deals but not for
   * open auction.
   */
  russiaPolicyCompliance?: PolicyCompliance;
}

function serializeCreativeServingDecision(data: any): CreativeServingDecision {
  return {
    ...data,
    adTechnologyProviders: data["adTechnologyProviders"] !== undefined ? serializeAdTechnologyProviders(data["adTechnologyProviders"]) : undefined,
    chinaPolicyCompliance: data["chinaPolicyCompliance"] !== undefined ? serializePolicyCompliance(data["chinaPolicyCompliance"]) : undefined,
    dealsPolicyCompliance: data["dealsPolicyCompliance"] !== undefined ? serializePolicyCompliance(data["dealsPolicyCompliance"]) : undefined,
    detectedAdvertisers: data["detectedAdvertisers"] !== undefined ? data["detectedAdvertisers"].map((item: any) => (serializeAdvertiserAndBrand(item))) : undefined,
    lastStatusUpdate: data["lastStatusUpdate"] !== undefined ? data["lastStatusUpdate"].toISOString() : undefined,
    networkPolicyCompliance: data["networkPolicyCompliance"] !== undefined ? serializePolicyCompliance(data["networkPolicyCompliance"]) : undefined,
    platformPolicyCompliance: data["platformPolicyCompliance"] !== undefined ? serializePolicyCompliance(data["platformPolicyCompliance"]) : undefined,
    russiaPolicyCompliance: data["russiaPolicyCompliance"] !== undefined ? serializePolicyCompliance(data["russiaPolicyCompliance"]) : undefined,
  };
}

function deserializeCreativeServingDecision(data: any): CreativeServingDecision {
  return {
    ...data,
    adTechnologyProviders: data["adTechnologyProviders"] !== undefined ? deserializeAdTechnologyProviders(data["adTechnologyProviders"]) : undefined,
    chinaPolicyCompliance: data["chinaPolicyCompliance"] !== undefined ? deserializePolicyCompliance(data["chinaPolicyCompliance"]) : undefined,
    dealsPolicyCompliance: data["dealsPolicyCompliance"] !== undefined ? deserializePolicyCompliance(data["dealsPolicyCompliance"]) : undefined,
    detectedAdvertisers: data["detectedAdvertisers"] !== undefined ? data["detectedAdvertisers"].map((item: any) => (deserializeAdvertiserAndBrand(item))) : undefined,
    lastStatusUpdate: data["lastStatusUpdate"] !== undefined ? new Date(data["lastStatusUpdate"]) : undefined,
    networkPolicyCompliance: data["networkPolicyCompliance"] !== undefined ? deserializePolicyCompliance(data["networkPolicyCompliance"]) : undefined,
    platformPolicyCompliance: data["platformPolicyCompliance"] !== undefined ? deserializePolicyCompliance(data["platformPolicyCompliance"]) : undefined,
    russiaPolicyCompliance: data["russiaPolicyCompliance"] !== undefined ? deserializePolicyCompliance(data["russiaPolicyCompliance"]) : undefined,
  };
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
 * Evidence that the creative's destination URL was not crawlable by Google.
 */
export interface DestinationNotCrawlableEvidence {
  /**
   * Destination URL that was attempted to be crawled.
   */
  crawledUrl?: string;
  /**
   * Approximate time of the crawl.
   */
  crawlTime?: Date;
  /**
   * Reason of destination not crawlable.
   */
  reason?:  | "REASON_UNSPECIFIED" | "UNREACHABLE_ROBOTS" | "TIMEOUT_ROBOTS" | "ROBOTED_DENIED" | "UNKNOWN";
}

function serializeDestinationNotCrawlableEvidence(data: any): DestinationNotCrawlableEvidence {
  return {
    ...data,
    crawlTime: data["crawlTime"] !== undefined ? data["crawlTime"].toISOString() : undefined,
  };
}

function deserializeDestinationNotCrawlableEvidence(data: any): DestinationNotCrawlableEvidence {
  return {
    ...data,
    crawlTime: data["crawlTime"] !== undefined ? new Date(data["crawlTime"]) : undefined,
  };
}

/**
 * Evidence of the creative's destination URL not functioning properly or
 * having been incorrectly set up.
 */
export interface DestinationNotWorkingEvidence {
  /**
   * DNS lookup errors.
   */
  dnsError?:  | "DNS_ERROR_UNSPECIFIED" | "ERROR_DNS" | "GOOGLE_CRAWLER_DNS_ISSUE";
  /**
   * The full non-working URL.
   */
  expandedUrl?: string;
  /**
   * HTTP error code (for example, 404 or 5xx)
   */
  httpError?: number;
  /**
   * Page was crawled successfully, but was detected as either a page with no
   * content or an error page.
   */
  invalidPage?:  | "INVALID_PAGE_UNSPECIFIED" | "EMPTY_OR_ERROR_PAGE";
  /**
   * Approximate time when the ad destination was last checked.
   */
  lastCheckTime?: Date;
  /**
   * Platform of the non-working URL.
   */
  platform?:  | "PLATFORM_UNSPECIFIED" | "PERSONAL_COMPUTER" | "ANDROID" | "IOS";
  /**
   * HTTP redirect chain error.
   */
  redirectionError?:  | "REDIRECTION_ERROR_UNSPECIFIED" | "TOO_MANY_REDIRECTS" | "INVALID_REDIRECT" | "EMPTY_REDIRECT" | "REDIRECT_ERROR_UNKNOWN";
  /**
   * Rejected because of malformed URLs or invalid requests.
   */
  urlRejected?:  | "URL_REJECTED_UNSPECIFIED" | "BAD_REQUEST" | "MALFORMED_URL" | "URL_REJECTED_UNKNOWN";
}

function serializeDestinationNotWorkingEvidence(data: any): DestinationNotWorkingEvidence {
  return {
    ...data,
    lastCheckTime: data["lastCheckTime"] !== undefined ? data["lastCheckTime"].toISOString() : undefined,
  };
}

function deserializeDestinationNotWorkingEvidence(data: any): DestinationNotWorkingEvidence {
  return {
    ...data,
    lastCheckTime: data["lastCheckTime"] !== undefined ? new Date(data["lastCheckTime"]) : undefined,
  };
}

/**
 * The full landing page URL of the destination.
 */
export interface DestinationUrlEvidence {
  /**
   * The full landing page URL of the destination.
   */
  destinationUrl?: string;
}

/**
 * Number of HTTP calls made by a creative, broken down by domain.
 */
export interface DomainCallEvidence {
  /**
   * Breakdown of the most frequent domains called through HTTP by the
   * creative.
   */
  topHttpCallDomains?: DomainCalls[];
  /**
   * The total number of HTTP calls made by the creative, including but not
   * limited to the number of calls in the top_http_call_domains.
   */
  totalHttpCallCount?: number;
}

/**
 * The number of HTTP calls made to the given domain.
 */
export interface DomainCalls {
  /**
   * The domain name.
   */
  domain?: string;
  /**
   * Number of HTTP calls made to the domain.
   */
  httpCallCount?: number;
}

/**
 * Total download size and URL-level download size breakdown for resources in a
 * creative.
 */
export interface DownloadSizeEvidence {
  /**
   * Download size broken down by URLs with the top download size.
   */
  topUrlDownloadSizeBreakdowns?: UrlDownloadSize[];
  /**
   * Total download size (in kilobytes) for all the resources in the creative.
   */
  totalDownloadSizeKb?: number;
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
 * Bidder endpoint that receives bid requests.
 */
export interface Endpoint {
  /**
   * The protocol that the bidder endpoint is using.
   */
  bidProtocol?:  | "BID_PROTOCOL_UNSPECIFIED" | "GOOGLE_RTB" | "OPENRTB_JSON" | "OPENRTB_PROTOBUF";
  /**
   * The maximum number of queries per second allowed to be sent to this
   * server.
   */
  maximumQps?: bigint;
  /**
   * Output only. Name of the endpoint resource that must follow the pattern
   * `bidders/{bidderAccountId}/endpoints/{endpointId}`, where {bidderAccountId}
   * is the account ID of the bidder who operates this endpoint, and
   * {endpointId} is a unique ID assigned by the server.
   */
  readonly name?: string;
  /**
   * The trading location that bid requests should be sent from. See
   * https://developers.google.com/authorized-buyers/rtb/peer-guide#trading-locations
   * for further information.
   */
  tradingLocation?:  | "TRADING_LOCATION_UNSPECIFIED" | "US_WEST" | "US_EAST" | "EUROPE" | "ASIA";
  /**
   * Output only. The URL that bid requests should be sent to.
   */
  readonly url?: string;
}

function serializeEndpoint(data: any): Endpoint {
  return {
    ...data,
    maximumQps: data["maximumQps"] !== undefined ? String(data["maximumQps"]) : undefined,
  };
}

function deserializeEndpoint(data: any): Endpoint {
  return {
    ...data,
    maximumQps: data["maximumQps"] !== undefined ? BigInt(data["maximumQps"]) : undefined,
  };
}

/**
 * Response for a request to get remarketing tag.
 */
export interface GetRemarketingTagResponse {
  /**
   * A HTML tag that can be placed on the advertiser's page to add users to a
   * user list. For more information and code samples on using snippet on your
   * website refer to [Tag your site for remarketing](
   * https://support.google.com/google-ads/answer/2476688).
   */
  snippet?: string;
}

/**
 * HTML content for a creative.
 */
export interface HtmlContent {
  /**
   * The height of the HTML snippet in pixels. Can be used to filter the
   * response of the creatives.list method.
   */
  height?: number;
  /**
   * The HTML snippet that displays the ad when inserted in the web page.
   */
  snippet?: string;
  /**
   * The width of the HTML snippet in pixels. Can be used to filter the
   * response of the creatives.list method.
   */
  width?: number;
}

/**
 * HTTP calls made by a creative that resulted in policy violations.
 */
export interface HttpCallEvidence {
  /**
   * URLs of HTTP calls made by the creative.
   */
  urls?: string[];
}

/**
 * Evidence for HTTP cookie-related policy violations.
 */
export interface HttpCookieEvidence {
  /**
   * Names of cookies that violate Google policies. For TOO_MANY_COOKIES
   * policy, this will be the cookie names of top domains with the largest
   * number of cookies. For other policies, this will be all the cookie names
   * that violate the policy.
   */
  cookieNames?: string[];
  /**
   * The largest number of cookies set by a creative. If this field is set,
   * cookie_names above will be set to the cookie names of top domains with the
   * largest number of cookies. This field will only be set for TOO_MANY_COOKIES
   * policy.
   */
  maxCookieCount?: number;
}

/**
 * An image resource. You may provide a larger image than was requested, so
 * long as the aspect ratio is preserved.
 */
export interface Image {
  /**
   * Image height in pixels.
   */
  height?: number;
  /**
   * The URL of the image.
   */
  url?: string;
  /**
   * Image width in pixels.
   */
  width?: number;
}

/**
 * A response containing bidders.
 */
export interface ListBiddersResponse {
  /**
   * List of bidders.
   */
  bidders?: Bidder[];
  /**
   * A token which can be passed to a subsequent call to the `ListBidders`
   * method to retrieve the next page of results in
   * ListBiddersRequest.pageToken.
   */
  nextPageToken?: string;
}

/**
 * A response containing buyer account information.
 */
export interface ListBuyersResponse {
  /**
   * List of buyers.
   */
  buyers?: Buyer[];
  /**
   * A token which can be passed to a subsequent call to the `ListBuyers`
   * method to retrieve the next page of results in ListBuyersRequest.pageToken.
   */
  nextPageToken?: string;
}

/**
 * A response for listing creatives.
 */
export interface ListCreativesResponse {
  /**
   * The list of creatives.
   */
  creatives?: Creative[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListCreativesRequest.pageToken field in the subsequent call to the
   * `ListCreatives` method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListCreativesResponse(data: any): ListCreativesResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (serializeCreative(item))) : undefined,
  };
}

function deserializeListCreativesResponse(data: any): ListCreativesResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (deserializeCreative(item))) : undefined,
  };
}

/**
 * A response containing bidder endpoints.
 */
export interface ListEndpointsResponse {
  /**
   * List of bidder endpoints.
   */
  endpoints?: Endpoint[];
  /**
   * A token which can be passed to a subsequent call to the `ListEndpoints`
   * method to retrieve the next page of results in
   * ListEndpointsRequest.pageToken.
   */
  nextPageToken?: string;
}

function serializeListEndpointsResponse(data: any): ListEndpointsResponse {
  return {
    ...data,
    endpoints: data["endpoints"] !== undefined ? data["endpoints"].map((item: any) => (serializeEndpoint(item))) : undefined,
  };
}

function deserializeListEndpointsResponse(data: any): ListEndpointsResponse {
  return {
    ...data,
    endpoints: data["endpoints"] !== undefined ? data["endpoints"].map((item: any) => (deserializeEndpoint(item))) : undefined,
  };
}

/**
 * A response containing pretargeting configurations.
 */
export interface ListPretargetingConfigsResponse {
  /**
   * A token which can be passed to a subsequent call to the
   * `ListPretargetingConfigs` method to retrieve the next page of results in
   * ListPretargetingConfigsRequest.pageToken.
   */
  nextPageToken?: string;
  /**
   * List of pretargeting configurations.
   */
  pretargetingConfigs?: PretargetingConfig[];
}

function serializeListPretargetingConfigsResponse(data: any): ListPretargetingConfigsResponse {
  return {
    ...data,
    pretargetingConfigs: data["pretargetingConfigs"] !== undefined ? data["pretargetingConfigs"].map((item: any) => (serializePretargetingConfig(item))) : undefined,
  };
}

function deserializeListPretargetingConfigsResponse(data: any): ListPretargetingConfigsResponse {
  return {
    ...data,
    pretargetingConfigs: data["pretargetingConfigs"] !== undefined ? data["pretargetingConfigs"].map((item: any) => (deserializePretargetingConfig(item))) : undefined,
  };
}

/**
 * A response to a request for listing publisher connections.
 */
export interface ListPublisherConnectionsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListPublisherConnectionsRequest.pageToken field in the subsequent call to
   * the `ListPublisherConnections` method to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of publisher connections.
   */
  publisherConnections?: PublisherConnection[];
}

/**
 * The list user list response.
 */
export interface ListUserListsResponse {
  /**
   * The continuation page token to send back to the server in a subsequent
   * request. Due to a currently known issue, it is recommended that the caller
   * keep invoking the list method till the time a next page token is not
   * returned (even if the result set is empty).
   */
  nextPageToken?: string;
  /**
   * List of user lists from the search.
   */
  userLists?: UserList[];
}

function serializeListUserListsResponse(data: any): ListUserListsResponse {
  return {
    ...data,
    userLists: data["userLists"] !== undefined ? data["userLists"].map((item: any) => (serializeUserList(item))) : undefined,
  };
}

function deserializeListUserListsResponse(data: any): ListUserListsResponse {
  return {
    ...data,
    userLists: data["userLists"] !== undefined ? data["userLists"].map((item: any) => (deserializeUserList(item))) : undefined,
  };
}

/**
 * Information about each media file in the VAST.
 */
export interface MediaFile {
  /**
   * Bitrate of the video file, in Kbps. Can be used to filter the response of
   * the creatives.list method.
   */
  bitrate?: bigint;
  /**
   * The MIME type of this media file. Can be used to filter the response of
   * the creatives.list method.
   */
  mimeType?:  | "VIDEO_MIME_TYPE_UNSPECIFIED" | "MIME_VIDEO_XFLV" | "MIME_VIDEO_WEBM" | "MIME_VIDEO_MP4" | "MIME_VIDEO_OGG" | "MIME_VIDEO_YT_HOSTED" | "MIME_VIDEO_X_MS_WMV" | "MIME_VIDEO_3GPP" | "MIME_VIDEO_MOV" | "MIME_APPLICATION_SWF" | "MIME_APPLICATION_SURVEY" | "MIME_APPLICATION_JAVASCRIPT" | "MIME_APPLICATION_SILVERLIGHT" | "MIME_APPLICATION_MPEGURL" | "MIME_APPLICATION_MPEGDASH" | "MIME_AUDIO_MP4A" | "MIME_AUDIO_MP3" | "MIME_AUDIO_OGG";
}

function serializeMediaFile(data: any): MediaFile {
  return {
    ...data,
    bitrate: data["bitrate"] !== undefined ? String(data["bitrate"]) : undefined,
  };
}

function deserializeMediaFile(data: any): MediaFile {
  return {
    ...data,
    bitrate: data["bitrate"] !== undefined ? BigInt(data["bitrate"]) : undefined,
  };
}

/**
 * Native content for a creative.
 */
export interface NativeContent {
  /**
   * The name of the advertiser or sponsor, to be displayed in the ad creative.
   */
  advertiserName?: string;
  /**
   * The app icon, for app download ads.
   */
  appIcon?: Image;
  /**
   * A long description of the ad.
   */
  body?: string;
  /**
   * A label for the button that the user is supposed to click.
   */
  callToAction?: string;
  /**
   * The URL that the browser/SDK will load when the user clicks the ad.
   */
  clickLinkUrl?: string;
  /**
   * The URL to use for click tracking.
   */
  clickTrackingUrl?: string;
  /**
   * A short title for the ad.
   */
  headline?: string;
  /**
   * A large image.
   */
  image?: Image;
  /**
   * A smaller image, for the advertiser's logo.
   */
  logo?: Image;
  /**
   * The price of the promoted app including currency info.
   */
  priceDisplayText?: string;
  /**
   * The app rating in the app store. Must be in the range [0-5].
   */
  starRating?: number;
  /**
   * The URL to fetch a native video ad.
   */
  videoUrl?: string;
  /**
   * The contents of a VAST document for a native video ad.
   */
  videoVastXml?: string;
}

/**
 * Generic targeting used for targeting dimensions that contain a list of
 * included and excluded numeric IDs used in app, user list, geo, and vertical
 * id targeting.
 */
export interface NumericTargetingDimension {
  /**
   * The IDs excluded in a configuration.
   */
  excludedIds?: bigint[];
  /**
   * The IDs included in a configuration.
   */
  includedIds?: bigint[];
}

function serializeNumericTargetingDimension(data: any): NumericTargetingDimension {
  return {
    ...data,
    excludedIds: data["excludedIds"] !== undefined ? data["excludedIds"].map((item: any) => (String(item))) : undefined,
    includedIds: data["includedIds"] !== undefined ? data["includedIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeNumericTargetingDimension(data: any): NumericTargetingDimension {
  return {
    ...data,
    excludedIds: data["excludedIds"] !== undefined ? data["excludedIds"].map((item: any) => (BigInt(item))) : undefined,
    includedIds: data["includedIds"] !== undefined ? data["includedIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A request to open a specified user list.
 */
export interface OpenUserListRequest {
}

/**
 * Policy compliance of the creative for a transaction type or a region.
 */
export interface PolicyCompliance {
  /**
   * Serving status for the given transaction type (for example, open auction,
   * deals) or region (for example, China, Russia). Can be used to filter the
   * response of the creatives.list method.
   */
  status?:  | "STATUS_UNSPECIFIED" | "PENDING_REVIEW" | "DISAPPROVED" | "APPROVED" | "CERTIFICATE_REQUIRED";
  /**
   * Topics related to the policy compliance for this transaction type (for
   * example, open auction, deals) or region (for example, China, Russia).
   * Topics may be present only if status is DISAPPROVED.
   */
  topics?: PolicyTopicEntry[];
}

function serializePolicyCompliance(data: any): PolicyCompliance {
  return {
    ...data,
    topics: data["topics"] !== undefined ? data["topics"].map((item: any) => (serializePolicyTopicEntry(item))) : undefined,
  };
}

function deserializePolicyCompliance(data: any): PolicyCompliance {
  return {
    ...data,
    topics: data["topics"] !== undefined ? data["topics"].map((item: any) => (deserializePolicyTopicEntry(item))) : undefined,
  };
}

/**
 * Each policy topic entry will represent a violation of a policy topic for a
 * creative, with the policy topic information and optional evidence for the
 * policy violation.
 */
export interface PolicyTopicEntry {
  /**
   * Pieces of evidence associated with this policy topic entry.
   */
  evidences?: PolicyTopicEvidence[];
  /**
   * URL of the help center article describing this policy topic.
   */
  helpCenterUrl?: string;
  /**
   * Policy topic this entry refers to. For example, "ALCOHOL",
   * "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible
   * policy topics is not fixed for a particular API version and may change at
   * any time. Can be used to filter the response of the creatives.list method
   */
  policyTopic?: string;
}

function serializePolicyTopicEntry(data: any): PolicyTopicEntry {
  return {
    ...data,
    evidences: data["evidences"] !== undefined ? data["evidences"].map((item: any) => (serializePolicyTopicEvidence(item))) : undefined,
  };
}

function deserializePolicyTopicEntry(data: any): PolicyTopicEntry {
  return {
    ...data,
    evidences: data["evidences"] !== undefined ? data["evidences"].map((item: any) => (deserializePolicyTopicEvidence(item))) : undefined,
  };
}

/**
 * Evidence associated with a policy topic entry.
 */
export interface PolicyTopicEvidence {
  /**
   * The creative's destination URL was not crawlable by Google.
   */
  destinationNotCrawlable?: DestinationNotCrawlableEvidence;
  /**
   * The creative's destination URL did not function properly or was
   * incorrectly set up.
   */
  destinationNotWorking?: DestinationNotWorkingEvidence;
  /**
   * URL of the actual landing page.
   */
  destinationUrl?: DestinationUrlEvidence;
  /**
   * Number of HTTP calls made by the creative, broken down by domain.
   */
  domainCall?: DomainCallEvidence;
  /**
   * Total download size and URL-level download size breakdown for resources in
   * a creative.
   */
  downloadSize?: DownloadSizeEvidence;
  /**
   * HTTP calls made by the creative that resulted in policy violations.
   */
  httpCall?: HttpCallEvidence;
  /**
   * Evidence for HTTP cookie-related policy violations.
   */
  httpCookie?: HttpCookieEvidence;
}

function serializePolicyTopicEvidence(data: any): PolicyTopicEvidence {
  return {
    ...data,
    destinationNotCrawlable: data["destinationNotCrawlable"] !== undefined ? serializeDestinationNotCrawlableEvidence(data["destinationNotCrawlable"]) : undefined,
    destinationNotWorking: data["destinationNotWorking"] !== undefined ? serializeDestinationNotWorkingEvidence(data["destinationNotWorking"]) : undefined,
  };
}

function deserializePolicyTopicEvidence(data: any): PolicyTopicEvidence {
  return {
    ...data,
    destinationNotCrawlable: data["destinationNotCrawlable"] !== undefined ? deserializeDestinationNotCrawlableEvidence(data["destinationNotCrawlable"]) : undefined,
    destinationNotWorking: data["destinationNotWorking"] !== undefined ? deserializeDestinationNotWorkingEvidence(data["destinationNotWorking"]) : undefined,
  };
}

/**
 * Pretargeting configuration: a set of targeting dimensions applied at the
 * pretargeting stage of the RTB funnel. These control which inventory a bidder
 * will receive bid requests for.
 */
export interface PretargetingConfig {
  /**
   * Targeting modes included by this configuration. A bid request must allow
   * all the specified targeting modes. An unset value allows all bid requests
   * to be sent, regardless of which targeting modes they allow.
   */
  allowedUserTargetingModes?:  | "USER_TARGETING_MODE_UNSPECIFIED" | "REMARKETING_ADS" | "INTEREST_BASED_TARGETING"[];
  /**
   * Targeting on a subset of app inventory. If APP is listed in
   * targeted_environments, the specified targeting is applied. A maximum of
   * 30,000 app IDs can be targeted. An unset value for targeting allows all
   * app-based bid requests to be sent. Apps can either be targeting positively
   * (bid requests will be sent only if the destination app is listed in the
   * targeting dimension) or negatively (bid requests will be sent only if the
   * destination app is not listed in the targeting dimension).
   */
  appTargeting?: AppTargeting;
  /**
   * Output only. The identifier that corresponds to this pretargeting
   * configuration that helps buyers track and attribute their spend across
   * their own arbitrary divisions. If a bid request matches more than one
   * configuration, the buyer chooses which billing_id to attribute each of
   * their bids.
   */
  readonly billingId?: bigint;
  /**
   * The diplay name associated with this configuration. This name must be
   * unique among all the pretargeting configurations a bidder has.
   */
  displayName?: string;
  /**
   * The sensitive content category label IDs excluded in this configuration.
   * Bid requests for inventory with any of the specified content label IDs will
   * not be sent. Refer to this file
   * https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for
   * category IDs.
   */
  excludedContentLabelIds?: bigint[];
  /**
   * The geos included or excluded in this configuration defined in
   * https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv
   */
  geoTargeting?: NumericTargetingDimension;
  /**
   * Creative dimensions included by this configuration. Only bid requests
   * eligible for at least one of the specified creative dimensions will be
   * sent. An unset value allows all bid requests to be sent, regardless of
   * creative dimension.
   */
  includedCreativeDimensions?: CreativeDimensions[];
  /**
   * Environments that are being included. Bid requests will not be sent for a
   * given environment if it is not included. Further restrictions can be
   * applied to included environments to target only a subset of its inventory.
   * An unset value includes all environments.
   */
  includedEnvironments?:  | "ENVIRONMENT_UNSPECIFIED" | "APP" | "WEB"[];
  /**
   * Creative formats included by this configuration. Only bid requests
   * eligible for at least one of the specified creative formats will be sent.
   * An unset value will allow all bid requests to be sent, regardless of
   * format.
   */
  includedFormats?:  | "CREATIVE_FORMAT_UNSPECIFIED" | "HTML" | "VAST" | "NATIVE"[];
  /**
   * The languages included in this configuration, represented by their
   * language code. See
   * https://developers.google.com/adwords/api/docs/appendix/languagecodes.
   */
  includedLanguages?: string[];
  /**
   * The mobile operating systems included in this configuration as defined in
   * https://storage.googleapis.com/adx-rtb-dictionaries/mobile-os.csv
   */
  includedMobileOperatingSystemIds?: bigint[];
  /**
   * The platforms included by this configration. Bid requests for devices with
   * the specified platform types will be sent. An unset value allows all bid
   * requests to be sent, regardless of platform.
   */
  includedPlatforms?:  | "PLATFORM_UNSPECIFIED" | "PERSONAL_COMPUTER" | "PHONE" | "TABLET" | "CONNECTED_TV"[];
  /**
   * User identifier types included in this configuration. At least one of the
   * user identifier types specified in this list must be available for the bid
   * request to be sent.
   */
  includedUserIdTypes?:  | "USER_ID_TYPE_UNSPECIFIED" | "HOSTED_MATCH_DATA" | "GOOGLE_COOKIE" | "DEVICE_ID"[];
  /**
   * The interstitial targeting specified for this configuration. The unset
   * value will allow bid requests to be sent regardless of whether they are for
   * interstitials or not.
   */
  interstitialTargeting?:  | "INTERSTITIAL_TARGETING_UNSPECIFIED" | "ONLY_INTERSTITIAL_REQUESTS" | "ONLY_NON_INTERSTITIAL_REQUESTS";
  /**
   * Output only. Existing included or excluded geos that are invalid.
   * Previously targeted geos may become invalid due to privacy restrictions.
   */
  readonly invalidGeoIds?: bigint[];
  /**
   * The maximum QPS threshold for this configuration. The bidder should
   * receive no more than this number of bid requests matching this
   * configuration per second across all their bidding endpoints among all
   * trading locations. Further information available at
   * https://developers.google.com/authorized-buyers/rtb/peer-guide
   */
  maximumQps?: bigint;
  /**
   * The targeted minimum viewability decile, ranging in values [0, 10]. A
   * value of 5 means that the configuration will only match adslots for which
   * we predict at least 50% viewability. Values > 10 will be rounded down to
   * 10. An unset value or a value of 0 indicates that bid requests will be sent
   * regardless of viewability.
   */
  minimumViewabilityDecile?: number;
  /**
   * Output only. Name of the pretargeting configuration that must follow the
   * pattern `bidders/{bidder_account_id}/pretargetingConfigs/{config_id}`
   */
  readonly name?: string;
  /**
   * Targeting on a subset of publisher inventory. Publishers can either be
   * targeted positively (bid requests will be sent only if the publisher is
   * listed in the targeting dimension) or negatively (bid requests will be sent
   * only if the publisher is not listed in the targeting dimension). A maximum
   * of 10,000 publisher IDs can be targeted. Publisher IDs are found in
   * [ads.txt](https://iabtechlab.com/ads-txt/) /
   * [app-ads.txt](https://iabtechlab.com/app-ads-txt/) and in bid requests in
   * the `BidRequest.publisher_id` field on the [Google RTB
   * protocol](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto)
   * or the `BidRequest.site.publisher.id` / `BidRequest.app.publisher.id` field
   * on the [OpenRTB
   * protocol](https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto).
   * Publisher IDs will be returned in the order that they were entered.
   */
  publisherTargeting?: StringTargetingDimension;
  /**
   * Output only. The state of this pretargeting configuration.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED";
  /**
   * The remarketing lists included or excluded in this configuration as
   * defined in UserList.
   */
  userListTargeting?: NumericTargetingDimension;
  /**
   * The verticals included or excluded in this configuration as defined in
   * https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals
   */
  verticalTargeting?: NumericTargetingDimension;
  /**
   * Targeting on a subset of site inventory. If WEB is listed in
   * included_environments, the specified targeting is applied. A maximum of
   * 50,000 site URLs can be targeted. An unset value for targeting allows all
   * web-based bid requests to be sent. Sites can either be targeting positively
   * (bid requests will be sent only if the destination site is listed in the
   * targeting dimension) or negatively (bid requests will be sent only if the
   * destination site is not listed in the pretargeting configuration).
   */
  webTargeting?: StringTargetingDimension;
}

function serializePretargetingConfig(data: any): PretargetingConfig {
  return {
    ...data,
    appTargeting: data["appTargeting"] !== undefined ? serializeAppTargeting(data["appTargeting"]) : undefined,
    excludedContentLabelIds: data["excludedContentLabelIds"] !== undefined ? data["excludedContentLabelIds"].map((item: any) => (String(item))) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? serializeNumericTargetingDimension(data["geoTargeting"]) : undefined,
    includedCreativeDimensions: data["includedCreativeDimensions"] !== undefined ? data["includedCreativeDimensions"].map((item: any) => (serializeCreativeDimensions(item))) : undefined,
    includedMobileOperatingSystemIds: data["includedMobileOperatingSystemIds"] !== undefined ? data["includedMobileOperatingSystemIds"].map((item: any) => (String(item))) : undefined,
    maximumQps: data["maximumQps"] !== undefined ? String(data["maximumQps"]) : undefined,
    userListTargeting: data["userListTargeting"] !== undefined ? serializeNumericTargetingDimension(data["userListTargeting"]) : undefined,
    verticalTargeting: data["verticalTargeting"] !== undefined ? serializeNumericTargetingDimension(data["verticalTargeting"]) : undefined,
  };
}

function deserializePretargetingConfig(data: any): PretargetingConfig {
  return {
    ...data,
    appTargeting: data["appTargeting"] !== undefined ? deserializeAppTargeting(data["appTargeting"]) : undefined,
    billingId: data["billingId"] !== undefined ? BigInt(data["billingId"]) : undefined,
    excludedContentLabelIds: data["excludedContentLabelIds"] !== undefined ? data["excludedContentLabelIds"].map((item: any) => (BigInt(item))) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeNumericTargetingDimension(data["geoTargeting"]) : undefined,
    includedCreativeDimensions: data["includedCreativeDimensions"] !== undefined ? data["includedCreativeDimensions"].map((item: any) => (deserializeCreativeDimensions(item))) : undefined,
    includedMobileOperatingSystemIds: data["includedMobileOperatingSystemIds"] !== undefined ? data["includedMobileOperatingSystemIds"].map((item: any) => (BigInt(item))) : undefined,
    invalidGeoIds: data["invalidGeoIds"] !== undefined ? data["invalidGeoIds"].map((item: any) => (BigInt(item))) : undefined,
    maximumQps: data["maximumQps"] !== undefined ? BigInt(data["maximumQps"]) : undefined,
    userListTargeting: data["userListTargeting"] !== undefined ? deserializeNumericTargetingDimension(data["userListTargeting"]) : undefined,
    verticalTargeting: data["verticalTargeting"] !== undefined ? deserializeNumericTargetingDimension(data["verticalTargeting"]) : undefined,
  };
}

/**
 * An Open Bidding exchange's connection to a publisher. This is initiated by
 * the publisher for the bidder to review. If approved by the bidder, this means
 * that the bidder agrees to receive bid requests from the publisher.
 */
export interface PublisherConnection {
  /**
   * Whether the publisher has been approved by the bidder.
   */
  biddingState?:  | "STATE_UNSPECIFIED" | "PENDING" | "REJECTED" | "APPROVED";
  /**
   * Output only. The time at which the publisher initiated a connection with
   * the bidder (irrespective of if or when the bidder approves it). This is
   * subsequently updated if the publisher revokes and re-initiates the
   * connection.
   */
  readonly createTime?: Date;
  /**
   * Output only. Publisher display name.
   */
  readonly displayName?: string;
  /**
   * Output only. Name of the publisher connection. This follows the pattern
   * `bidders/{bidder}/publisherConnections/{publisher}`, where `{bidder}`
   * represents the account ID of the bidder, and `{publisher}` is the
   * ads.txt/app-ads.txt publisher ID.
   */
  readonly name?: string;
  /**
   * Output only. Whether the publisher is an Ad Manager or AdMob publisher.
   */
  readonly publisherPlatform?:  | "PUBLISHER_PLATFORM_UNSPECIFIED" | "GOOGLE_AD_MANAGER" | "ADMOB";
}

/**
 * A request to stop targeting the provided apps in a specific pretargeting
 * configuration. The pretargeting configuration itself specifies how these apps
 * are targeted. in PretargetingConfig.appTargeting.mobileAppTargeting.
 */
export interface RemoveTargetedAppsRequest {
  /**
   * A list of app IDs to stop targeting in the pretargeting configuration.
   * These values will be removed from the list of targeted app IDs in
   * PretargetingConfig.appTargeting.mobileAppTargeting.values.
   */
  appIds?: string[];
}

/**
 * A request to stop targeting publishers in a specific configuration. The
 * pretargeting configuration itself specifies how these publishers are targeted
 * in PretargetingConfig.publisherTargeting.
 */
export interface RemoveTargetedPublishersRequest {
  /**
   * A list of publisher IDs to stop targeting in the pretargeting
   * configuration. These values will be removed from the list of targeted
   * publisher IDs in PretargetingConfig.publisherTargeting.values. Publishers
   * are identified by their publisher ID from ads.txt / app-ads.txt. See
   * https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for
   * more details.
   */
  publisherIds?: string[];
}

/**
 * A request to stop targeting sites in a specific pretargeting configuration.
 * The pretargeting configuration itself specifies how these sites are targeted
 * in PretargetingConfig.webTargeting.
 */
export interface RemoveTargetedSitesRequest {
  /**
   * A list of site URLs to stop targeting in the pretargeting configuration.
   * These values will be removed from the list of targeted URLs in
   * PretargetingConfig.webTargeting.values.
   */
  sites?: string[];
}

/**
 * Generic targeting with string values used in app, website and publisher
 * targeting.
 */
export interface StringTargetingDimension {
  /**
   * How the items in this list should be targeted.
   */
  targetingMode?:  | "TARGETING_MODE_UNSPECIFIED" | "INCLUSIVE" | "EXCLUSIVE";
  /**
   * The values specified.
   */
  values?: string[];
}

/**
 * A request to suspend a pretargeting configuration. Sets the configuration's
 * state to SUSPENDED.
 */
export interface SuspendPretargetingConfigRequest {
}

/**
 * The URL-level breakdown for the download size.
 */
export interface UrlDownloadSize {
  /**
   * Download size of the URL in kilobytes.
   */
  downloadSizeKb?: number;
  /**
   * The normalized URL with query parameters and fragment removed.
   */
  normalizedUrl?: string;
}

/**
 * Represents the URL restriction (for the URL captured by the pixel callback)
 * for a user list.
 */
export interface UrlRestriction {
  /**
   * End date (if specified) of the URL restriction. End date should be later
   * than the start date for the date range to be valid.
   */
  endDate?: Date;
  /**
   * The restriction type for the specified URL.
   */
  restrictionType?:  | "RESTRICTION_TYPE_UNSPECIFIED" | "CONTAINS" | "EQUALS" | "STARTS_WITH" | "ENDS_WITH" | "DOES_NOT_EQUAL" | "DOES_NOT_CONTAIN" | "DOES_NOT_START_WITH" | "DOES_NOT_END_WITH";
  /**
   * Start date (if specified) of the URL restriction.
   */
  startDate?: Date;
  /**
   * Required. The URL to use for applying the restriction on the user list.
   */
  url?: string;
}

/**
 * Represents an Authorized Buyers user list. Authorized Buyers can
 * create/update/list user lists. Once a user list is created in the system,
 * Authorized Buyers can add users to the user list using the bulk uploader API.
 * Alternatively, users can be added by hosting a tag on the advertiser's page.
 */
export interface UserList {
  /**
   * The description for the user list.
   */
  description?: string;
  /**
   * Required. Display name of the user list. This must be unique across all
   * user lists for a given account.
   */
  displayName?: string;
  /**
   * Required. The number of days a user's cookie stays on the user list. The
   * field must be between 0 and 540 inclusive.
   */
  membershipDurationDays?: bigint;
  /**
   * Output only. Name of the user list that must follow the pattern
   * `buyers/{buyer}/userLists/{user_list}`, where `{buyer}` represents the
   * account ID of the buyer who owns the user list. For a bidder accessing user
   * lists on behalf of a child seat buyer, `{buyer}` represents the account ID
   * of the child seat buyer. `{user_list}` is an int64 identifier assigned by
   * Google to uniquely identify a user list.
   */
  readonly name?: string;
  /**
   * Output only. The status of the user list. A new user list starts out as
   * open.
   */
  readonly status?:  | "STATUS_UNSPECIFIED" | "OPEN" | "CLOSED";
  /**
   * Required. The URL restriction for the user list.
   */
  urlRestriction?: UrlRestriction;
}

function serializeUserList(data: any): UserList {
  return {
    ...data,
    membershipDurationDays: data["membershipDurationDays"] !== undefined ? String(data["membershipDurationDays"]) : undefined,
  };
}

function deserializeUserList(data: any): UserList {
  return {
    ...data,
    membershipDurationDays: data["membershipDurationDays"] !== undefined ? BigInt(data["membershipDurationDays"]) : undefined,
  };
}

/**
 * Video content for a creative.
 */
export interface VideoContent {
  /**
   * Output only. Video metadata.
   */
  readonly videoMetadata?: VideoMetadata;
  /**
   * The URL to fetch a video ad.
   */
  videoUrl?: string;
  /**
   * The contents of a VAST document for a video ad. This document should
   * conform to the VAST 2.0 or 3.0 standard.
   */
  videoVastXml?: string;
}

/**
 * Video metadata for a creative.
 */
export interface VideoMetadata {
  /**
   * The duration of the ad. Can be used to filter the response of the
   * creatives.list method.
   */
  duration?: number /* Duration */;
  /**
   * Is this a valid VAST ad? Can be used to filter the response of the
   * creatives.list method.
   */
  isValidVast?: boolean;
  /**
   * Is this a VPAID ad? Can be used to filter the response of the
   * creatives.list method.
   */
  isVpaid?: boolean;
  /**
   * The list of all media files declared in the VAST. If there are multiple
   * VASTs in a wrapper chain, this includes the media files from the deepest
   * one in the chain.
   */
  mediaFiles?: MediaFile[];
  /**
   * The minimum duration that the user has to watch before being able to skip
   * this ad. If the field is not set, the ad is not skippable. If the field is
   * set, the ad is skippable. Can be used to filter the response of the
   * creatives.list method.
   */
  skipOffset?: number /* Duration */;
  /**
   * The maximum VAST version across all wrapped VAST documents. Can be used to
   * filter the response of the creatives.list method.
   */
  vastVersion?:  | "VAST_VERSION_UNSPECIFIED" | "VAST_VERSION_1_0" | "VAST_VERSION_2_0" | "VAST_VERSION_3_0" | "VAST_VERSION_4_0";
}

function serializeVideoMetadata(data: any): VideoMetadata {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    mediaFiles: data["mediaFiles"] !== undefined ? data["mediaFiles"].map((item: any) => (serializeMediaFile(item))) : undefined,
    skipOffset: data["skipOffset"] !== undefined ? data["skipOffset"] : undefined,
  };
}

function deserializeVideoMetadata(data: any): VideoMetadata {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    mediaFiles: data["mediaFiles"] !== undefined ? data["mediaFiles"].map((item: any) => (deserializeMediaFile(item))) : undefined,
    skipOffset: data["skipOffset"] !== undefined ? data["skipOffset"] : undefined,
  };
}

/**
 * A request to receive push notifications when any of the creatives belonging
 * to the bidder changes status.
 */
export interface WatchCreativesRequest {
}

/**
 * A response for the request to receive push notification when a bidder's
 * creatives change status.
 */
export interface WatchCreativesResponse {
  /**
   * The Pub/Sub subscription that can be used to pull creative status
   * notifications. This would be of the format
   * `projects/{project_id}/subscriptions/{subscription_id}`. Subscription is
   * created with pull delivery. All service accounts belonging to the bidder
   * will have read access to this subscription. Subscriptions that are inactive
   * for more than 90 days will be disabled. Use watchCreatives to re-enable the
   * subscription.
   */
  subscription?: string;
  /**
   * The Pub/Sub topic that will be used to publish creative serving status
   * notifications. This would be of the format
   * `projects/{project_id}/topics/{topic_id}`.
   */
  topic?: string;
}