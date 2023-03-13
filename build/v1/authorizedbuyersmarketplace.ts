// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Authorized Buyers Marketplace API Client for Deno
 * =================================================
 * 
 * The Authorized Buyers Marketplace API lets buyers programmatically discover inventory; propose, retrieve and negotiate deals with publishers.
 * 
 * Docs: https://developers.google.com/authorized-buyers/apis/marketplace/reference/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Authorized Buyers Marketplace API lets buyers programmatically discover
 * inventory; propose, retrieve and negotiate deals with publishers.
 */
export class AuthorizedBuyersMarketplace {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://authorizedbuyersmarketplace.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists finalized deals. Use the URL path
   * "/v1/buyers/{accountId}/finalizedDeals" to list finalized deals for the
   * current buyer and its clients. Bidders can use the URL path
   * "/v1/bidders/{accountId}/finalizedDeals" to list finalized deals for the
   * bidder, its buyers and all their clients.
   *
   * @param parent Required. The buyer to list the finalized deals for, in the format: `buyers/{accountId}`. When used to list finalized deals for a bidder, its buyers and clients, in the format `bidders/{accountId}`.
   */
  async biddersFinalizedDealsList(parent: string, opts: BiddersFinalizedDealsListOptions = {}): Promise<ListFinalizedDealsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/finalizedDeals`);
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
    return deserializeListFinalizedDealsResponse(data);
  }

  /**
   * Gets an auction package given its name.
   *
   * @param name Required. Name of auction package to get. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}`
   */
  async buyersAuctionPackagesGet(name: string): Promise<AuctionPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AuctionPackage;
  }

  /**
   * List the auction packages subscribed by a buyer and its clients.
   *
   * @param parent Required. Name of the parent buyer that can access the auction package. Format: `buyers/{accountId}`
   */
  async buyersAuctionPackagesList(parent: string, opts: BuyersAuctionPackagesListOptions = {}): Promise<ListAuctionPackagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/auctionPackages`);
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
    return data as ListAuctionPackagesResponse;
  }

  /**
   * Subscribe to the auction package for the specified buyer. Once subscribed,
   * the bidder will receive a call out for inventory matching the auction
   * package targeting criteria with the auction package deal ID and the
   * specified buyer.
   *
   * @param name Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}`
   */
  async buyersAuctionPackagesSubscribe(name: string, req: SubscribeAuctionPackageRequest): Promise<AuctionPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:subscribe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AuctionPackage;
  }

  /**
   * Subscribe the specified clients of the buyer to the auction package. If a
   * client in the list does not belong to the buyer, an error response will be
   * returned, and all of the following clients in the list will not be
   * subscribed. Subscribing an already subscribed client will have no effect.
   *
   * @param auctionPackage Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}`
   */
  async buyersAuctionPackagesSubscribeClients(auctionPackage: string, req: SubscribeClientsRequest): Promise<AuctionPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ auctionPackage }:subscribeClients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AuctionPackage;
  }

  /**
   * Unsubscribe from the auction package for the specified buyer. Once
   * unsubscribed, the bidder will no longer receive a call out for the auction
   * package deal ID and the specified buyer.
   *
   * @param name Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}`
   */
  async buyersAuctionPackagesUnsubscribe(name: string, req: UnsubscribeAuctionPackageRequest): Promise<AuctionPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:unsubscribe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AuctionPackage;
  }

  /**
   * Unsubscribe from the auction package for the specified clients of the
   * buyer. Unsubscribing a client that is not subscribed will have no effect.
   *
   * @param auctionPackage Required. Name of the auction package. Format: `buyers/{accountId}/auctionPackages/{auctionPackageId}`
   */
  async buyersAuctionPackagesUnsubscribeClients(auctionPackage: string, req: UnsubscribeClientsRequest): Promise<AuctionPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ auctionPackage }:unsubscribeClients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AuctionPackage;
  }

  /**
   * Activates an existing client. The state of the client will be updated to
   * "ACTIVE". This method has no effect if the client is already in "ACTIVE"
   * state.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}`
   */
  async buyersClientsActivate(name: string, req: ActivateClientRequest): Promise<Client> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Client;
  }

  /**
   * Creates a new client.
   *
   * @param parent Required. The name of the buyer. Format: `buyers/{accountId}`
   */
  async buyersClientsCreate(parent: string, req: Client): Promise<Client> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Client;
  }

  /**
   * Deactivates an existing client. The state of the client will be updated to
   * "INACTIVE". This method has no effect if the client is already in
   * "INACTIVE" state.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}`
   */
  async buyersClientsDeactivate(name: string, req: DeactivateClientRequest): Promise<Client> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deactivate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Client;
  }

  /**
   * Gets a client with a given resource name.
   *
   * @param name Required. Format: `buyers/{accountId}/clients/{clientAccountId}`
   */
  async buyersClientsGet(name: string): Promise<Client> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Client;
  }

  /**
   * Lists all the clients for the current buyer.
   *
   * @param parent Required. The name of the buyer. Format: `buyers/{accountId}`
   */
  async buyersClientsList(parent: string, opts: BuyersClientsListOptions = {}): Promise<ListClientsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clients`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as ListClientsResponse;
  }

  /**
   * Updates an existing client.
   *
   * @param name Output only. The resource name of the client. Format: `buyers/{accountId}/clients/{clientAccountId}`
   */
  async buyersClientsPatch(name: string, req: Client, opts: BuyersClientsPatchOptions = {}): Promise<Client> {
    opts = serializeBuyersClientsPatchOptions(opts);
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
    return data as Client;
  }

  /**
   * Activates an existing client user. The state of the client user will be
   * updated from "INACTIVE" to "ACTIVE". This method has no effect if the
   * client user is already in "ACTIVE" state. An error will be returned if the
   * client user to activate is still in "INVITED" state.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}`
   */
  async buyersClientsUsersActivate(name: string, req: ActivateClientUserRequest): Promise<ClientUser> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ClientUser;
  }

  /**
   * Creates a new client user in "INVITED" state. An email invitation will be
   * sent to the new user, once accepted the user will become active.
   *
   * @param parent Required. The name of the client. Format: `buyers/{accountId}/clients/{clientAccountId}`
   */
  async buyersClientsUsersCreate(parent: string, req: ClientUser): Promise<ClientUser> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/users`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ClientUser;
  }

  /**
   * Deactivates an existing client user. The state of the client user will be
   * updated from "ACTIVE" to "INACTIVE". This method has no effect if the
   * client user is already in "INACTIVE" state. An error will be returned if
   * the client user to deactivate is still in "INVITED" state.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}`
   */
  async buyersClientsUsersDeactivate(name: string, req: DeactivateClientUserRequest): Promise<ClientUser> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deactivate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ClientUser;
  }

  /**
   * Deletes an existing client user. The client user will lose access to the
   * Authorized Buyers UI. Note that if a client user is deleted, the user's
   * access to the UI can't be restored unless a new client user is created and
   * activated.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}`
   */
  async buyersClientsUsersDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves an existing client user.
   *
   * @param name Required. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}/clientUsers/{userId}`
   */
  async buyersClientsUsersGet(name: string): Promise<ClientUser> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ClientUser;
  }

  /**
   * Lists all client users for a specified client.
   *
   * @param parent Required. The name of the client. Format: `buyers/{buyerAccountId}/clients/{clientAccountId}`
   */
  async buyersClientsUsersList(parent: string, opts: BuyersClientsUsersListOptions = {}): Promise<ListClientUsersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/users`);
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
    return data as ListClientUsersResponse;
  }

  /**
   * Add creative to be used in the bidding process for a finalized deal. For
   * programmatic guaranteed deals, it's recommended that you associate at least
   * one approved creative with the deal before calling SetReadyToServe, to help
   * reduce the number of bid responses filtered because they don't contain
   * approved creatives. Creatives successfully added to a deal can be found in
   * the Realtime-bidding Creatives API creative.deal_ids. This method only
   * applies to programmatic guaranteed deals. Maximum number of 1000 creatives
   * can be added to a finalized deal.
   *
   * @param deal Required. Name of the finalized deal in the format of: `buyers/{accountId}/finalizedDeals/{dealId}`
   */
  async buyersFinalizedDealsAddCreative(deal: string, req: AddCreativeRequest): Promise<FinalizedDeal> {
    const url = new URL(`${this.#baseUrl}v1/${ deal }:addCreative`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinalizedDeal(data);
  }

  /**
   * Gets a finalized deal given its name.
   *
   * @param name Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}`
   */
  async buyersFinalizedDealsGet(name: string): Promise<FinalizedDeal> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFinalizedDeal(data);
  }

  /**
   * Lists finalized deals. Use the URL path
   * "/v1/buyers/{accountId}/finalizedDeals" to list finalized deals for the
   * current buyer and its clients. Bidders can use the URL path
   * "/v1/bidders/{accountId}/finalizedDeals" to list finalized deals for the
   * bidder, its buyers and all their clients.
   *
   * @param parent Required. The buyer to list the finalized deals for, in the format: `buyers/{accountId}`. When used to list finalized deals for a bidder, its buyers and clients, in the format `bidders/{accountId}`.
   */
  async buyersFinalizedDealsList(parent: string, opts: BuyersFinalizedDealsListOptions = {}): Promise<ListFinalizedDealsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/finalizedDeals`);
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
    return deserializeListFinalizedDealsResponse(data);
  }

  /**
   * Pauses serving of the given finalized deal. This call only pauses the
   * serving status, and does not affect other fields of the finalized deal.
   * Calling this method for an already paused deal has no effect. This method
   * only applies to programmatic guaranteed deals.
   *
   * @param name Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}`
   */
  async buyersFinalizedDealsPause(name: string, req: PauseFinalizedDealRequest): Promise<FinalizedDeal> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinalizedDeal(data);
  }

  /**
   * Resumes serving of the given finalized deal. Calling this method for an
   * running deal has no effect. If a deal is initially paused by the seller,
   * calling this method will not resume serving of the deal until the seller
   * also resumes the deal. This method only applies to programmatic guaranteed
   * deals.
   *
   * @param name Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}`
   */
  async buyersFinalizedDealsResume(name: string, req: ResumeFinalizedDealRequest): Promise<FinalizedDeal> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinalizedDeal(data);
  }

  /**
   * Sets the given finalized deal as ready to serve. By default, deals are set
   * as ready to serve as soon as they're finalized. If you want to opt out of
   * the default behavior, and manually indicate that deals are ready to serve,
   * ask your Technical Account Manager to add you to the allowlist. If you
   * choose to use this method, finalized deals belonging to the bidder and its
   * child seats don't start serving until after you call `setReadyToServe`, and
   * after the deals become active. For example, you can use this method to
   * delay receiving bid requests until your creative is ready. This method only
   * applies to programmatic guaranteed deals.
   *
   * @param deal Required. Format: `buyers/{accountId}/finalizedDeals/{dealId}`
   */
  async buyersFinalizedDealsSetReadyToServe(deal: string, req: SetReadyToServeRequest): Promise<FinalizedDeal> {
    const url = new URL(`${this.#baseUrl}v1/${ deal }:setReadyToServe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinalizedDeal(data);
  }

  /**
   * Accepts the proposal at the given revision number. If the revision number
   * in the request is behind the latest from the server, an error message will
   * be returned. This call updates the Proposal.state from
   * `BUYER_ACCEPTANCE_REQUESTED` to `FINALIZED`; it has no side effect if the
   * Proposal.state is already `FINALIZED` and throws exception if the
   * Proposal.state is not either `BUYER_ACCEPTANCE_REQUESTED` or `FINALIZED`.
   * Accepting a proposal means the buyer understands and accepts the
   * Proposal.terms_and_conditions proposed by the seller.
   *
   * @param name Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}`
   */
  async buyersProposalsAccept(name: string, req: AcceptProposalRequest): Promise<Proposal> {
    req = serializeAcceptProposalRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:accept`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Proposal;
  }

  /**
   * Creates a note for this proposal and sends to the seller.
   *
   * @param proposal Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}`
   */
  async buyersProposalsAddNote(proposal: string, req: AddNoteRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v1/${ proposal }:addNote`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Proposal;
  }

  /**
   * Cancels an ongoing negotiation on a proposal. This does not cancel or end
   * serving for the deals if the proposal has been finalized. If the proposal
   * has not been finalized before, calling this method will set the
   * Proposal.state to `TERMINATED` and increment the
   * Proposal.proposal_revision. If the proposal has been finalized before and
   * is under renegotiation now, calling this method will reset the
   * Proposal.state to `FINALIZED` and increment the Proposal.proposal_revision.
   * This method does not support private auction proposals whose
   * Proposal.deal_type is 'PRIVATE_AUCTION'.
   *
   * @param proposal Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}`
   */
  async buyersProposalsCancelNegotiation(proposal: string, req: CancelNegotiationRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v1/${ proposal }:cancelNegotiation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Proposal;
  }

  /**
   * Batch updates multiple deals in the same proposal.
   *
   * @param parent Required. The name of the proposal containing the deals to batch update. Format: buyers/{accountId}/proposals/{proposalId}
   */
  async buyersProposalsDealsBatchUpdate(parent: string, req: BatchUpdateDealsRequest): Promise<BatchUpdateDealsResponse> {
    req = serializeBatchUpdateDealsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deals:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchUpdateDealsResponse(data);
  }

  /**
   * Gets a deal given its name. The deal is returned at its head revision.
   *
   * @param name Required. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId}
   */
  async buyersProposalsDealsGet(name: string): Promise<Deal> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeal(data);
  }

  /**
   * Lists all deals in a proposal. To retrieve only the finalized revision
   * deals regardless if a deal is being renegotiated, see the FinalizedDeals
   * resource.
   *
   * @param parent Required. The name of the proposal containing the deals to retrieve. Format: buyers/{accountId}/proposals/{proposalId}
   */
  async buyersProposalsDealsList(parent: string, opts: BuyersProposalsDealsListOptions = {}): Promise<ListDealsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deals`);
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
    return deserializeListDealsResponse(data);
  }

  /**
   * Updates the given deal at the buyer known revision number. If the server
   * revision has advanced since the passed-in proposal.proposal_revision an
   * ABORTED error message will be returned. The revision number is incremented
   * by the server whenever the proposal or its constituent deals are updated.
   * Note: The revision number is kept at a proposal level. The buyer of the API
   * is expected to keep track of the revision number after the last update
   * operation and send it in as part of the next update request. This way, if
   * there are further changes on the server (for example, seller making new
   * updates), then the server can detect conflicts and reject the proposed
   * changes.
   *
   * @param name Immutable. The unique identifier of the deal. Auto-generated by the server when a deal is created. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId}
   */
  async buyersProposalsDealsPatch(name: string, req: Deal, opts: BuyersProposalsDealsPatchOptions = {}): Promise<Deal> {
    req = serializeDeal(req);
    opts = serializeBuyersProposalsDealsPatchOptions(opts);
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
    return deserializeDeal(data);
  }

  /**
   * Gets a proposal using its name. The proposal is returned at most recent
   * revision. revision.
   *
   * @param name Required. Name of the proposal. Format: `buyers/{accountId}/proposals/{proposalId}`
   */
  async buyersProposalsGet(name: string): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Proposal;
  }

  /**
   * Lists proposals. A filter expression (list filter syntax) may be specified
   * to filter the results. This will not list finalized versions of proposals
   * that are being renegotiated; to retrieve these use the finalizedProposals
   * resource.
   *
   * @param parent Required. Parent that owns the collection of proposals Format: `buyers/{accountId}`
   */
  async buyersProposalsList(parent: string, opts: BuyersProposalsListOptions = {}): Promise<ListProposalsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/proposals`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as ListProposalsResponse;
  }

  /**
   * Updates the proposal at the given revision number. If the revision number
   * in the request is behind the latest from the server, an error message will
   * be returned. See FieldMask for how to use FieldMask. Only fields specified
   * in the UpdateProposalRequest.update_mask will be updated; Fields noted as
   * 'Immutable' or 'Output only' yet specified in the
   * UpdateProposalRequest.update_mask will be ignored and left unchanged.
   * Updating a private auction proposal is not allowed and will result in an
   * error.
   *
   * @param name Immutable. The name of the proposal serving as a unique identifier. Format: buyers/{accountId}/proposals/{proposalId}
   */
  async buyersProposalsPatch(name: string, req: Proposal, opts: BuyersProposalsPatchOptions = {}): Promise<Proposal> {
    opts = serializeBuyersProposalsPatchOptions(opts);
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
    return data as Proposal;
  }

  /**
   * Sends a request for proposal (RFP) to a publisher to initiate the
   * negotiation regarding certain inventory. In the RFP, buyers can specify the
   * deal type, deal terms, start and end dates, targeting, and a message to the
   * publisher. Once the RFP is sent, a proposal in `SELLER_REVIEW_REQUESTED`
   * state will be created and returned in the response. The publisher may
   * review your request and respond with detailed deals in the proposal.
   *
   * @param buyer Required. The current buyer who is sending the RFP in the format: `buyers/{accountId}`.
   */
  async buyersProposalsSendRfp(buyer: string, req: SendRfpRequest): Promise<Proposal> {
    req = serializeSendRfpRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ buyer }/proposals:sendRfp`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Proposal;
  }

  /**
   * Gets the requested publisher profile by name.
   *
   * @param name Required. Name of the publisher profile. Format: `buyers/{buyerId}/publisherProfiles/{publisherProfileId}`
   */
  async buyersPublisherProfilesGet(name: string): Promise<PublisherProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PublisherProfile;
  }

  /**
   * Lists publisher profiles. The returned publisher profiles aren't in any
   * defined order. The order of the results might change. A new publisher
   * profile can appear in any place in the list of returned results.
   *
   * @param parent Required. Parent that owns the collection of publisher profiles Format: `buyers/{buyerId}`
   */
  async buyersPublisherProfilesList(parent: string, opts: BuyersPublisherProfilesListOptions = {}): Promise<ListPublisherProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/publisherProfiles`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as ListPublisherProfilesResponse;
  }
}

/**
 * Request to accept a proposal. Accepting a proposal implies acceptance of the
 * publisher terms_and_conditions, if any.
 */
export interface AcceptProposalRequest {
  /**
   * The last known client revision number of the proposal.
   */
  proposalRevision?: bigint;
}

function serializeAcceptProposalRequest(data: any): AcceptProposalRequest {
  return {
    ...data,
    proposalRevision: data["proposalRevision"] !== undefined ? String(data["proposalRevision"]) : undefined,
  };
}

function deserializeAcceptProposalRequest(data: any): AcceptProposalRequest {
  return {
    ...data,
    proposalRevision: data["proposalRevision"] !== undefined ? BigInt(data["proposalRevision"]) : undefined,
  };
}

/**
 * Request message for activating a client.
 */
export interface ActivateClientRequest {
}

/**
 * Request message for activating a client user.
 */
export interface ActivateClientUserRequest {
}

/**
 * Request message for adding creative to be used in the bidding process for
 * the finalized deal.
 */
export interface AddCreativeRequest {
  /**
   * Name of the creative to add to the finalized deal, in the format
   * `buyers/{buyerAccountId}/creatives/{creativeId}`. See creative.name.
   */
  creative?: string;
}

/**
 * Request to add a note.
 */
export interface AddNoteRequest {
  /**
   * The note to add.
   */
  note?: Note;
}

/**
 * Represents size of a single ad slot, or a creative.
 */
export interface AdSize {
  /**
   * The height of the ad slot in pixels. This field will be present only when
   * size type is `PIXEL`.
   */
  height?: bigint;
  /**
   * The type of the ad slot size.
   */
  type?:  | "TYPE_UNSPECIFIED" | "PIXEL" | "INTERSTITIAL" | "NATIVE" | "FLUID";
  /**
   * The width of the ad slot in pixels. This field will be present only when
   * size type is `PIXEL`.
   */
  width?: bigint;
}

function serializeAdSize(data: any): AdSize {
  return {
    ...data,
    height: data["height"] !== undefined ? String(data["height"]) : undefined,
    width: data["width"] !== undefined ? String(data["width"]) : undefined,
  };
}

function deserializeAdSize(data: any): AdSize {
  return {
    ...data,
    height: data["height"] !== undefined ? BigInt(data["height"]) : undefined,
    width: data["width"] !== undefined ? BigInt(data["width"]) : undefined,
  };
}

/**
 * Defines a segment of inventory that buyer wants to buy. It's created by
 * buyer and could be shared with multiple buyers.
 */
export interface AuctionPackage {
  /**
   * Output only. Time the auction package was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The buyer that created this auction package. Format:
   * `buyers/{buyerAccountId}`
   */
  readonly creator?: string;
  /**
   * Output only. A description of the auction package.
   */
  readonly description?: string;
  /**
   * The display_name assigned to the auction package.
   */
  displayName?: string;
  /**
   * Immutable. The unique identifier for the auction package. Format:
   * `buyers/{accountId}/auctionPackages/{auctionPackageId}` The
   * auction_package_id part of name is sent in the BidRequest to all RTB
   * bidders and is returned as deal_id by the bidder in the BidResponse.
   */
  name?: string;
  /**
   * Output only. The list of clients of the current buyer that are subscribed
   * to the AuctionPackage. Format:
   * `buyers/{buyerAccountId}/clients/{clientAccountId}`
   */
  readonly subscribedClients?: string[];
  /**
   * Output only. Time the auction package was last updated. This value is only
   * increased when this auction package is updated but never when a buyer
   * subscribed.
   */
  readonly updateTime?: Date;
}

/**
 * Request message for batch updating deals.
 */
export interface BatchUpdateDealsRequest {
  /**
   * Required. List of request messages to update deals.
   */
  requests?: UpdateDealRequest[];
}

function serializeBatchUpdateDealsRequest(data: any): BatchUpdateDealsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeUpdateDealRequest(item))) : undefined,
  };
}

function deserializeBatchUpdateDealsRequest(data: any): BatchUpdateDealsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeUpdateDealRequest(item))) : undefined,
  };
}

/**
 * Response message for batch updating deals.
 */
export interface BatchUpdateDealsResponse {
  /**
   * Deals updated.
   */
  deals?: Deal[];
}

function serializeBatchUpdateDealsResponse(data: any): BatchUpdateDealsResponse {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (serializeDeal(item))) : undefined,
  };
}

function deserializeBatchUpdateDealsResponse(data: any): BatchUpdateDealsResponse {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (deserializeDeal(item))) : undefined,
  };
}

/**
 * Additional options for
 * AuthorizedBuyersMarketplace#biddersFinalizedDealsList.
 */
export interface BiddersFinalizedDealsListOptions {
  /**
   * Optional query string using the [Cloud API list filtering
   * syntax](https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters)
   * Supported columns for filtering are: * deal.displayName * deal.dealType *
   * deal.createTime * deal.updateTime * deal.flightStartTime *
   * deal.flightEndTime * dealServingStatus
   */
  filter?: string;
  /**
   * An optional query string to sort finalized deals using the [Cloud API
   * sorting
   * syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order).
   * If no sort order is specified, results will be returned in an arbitrary
   * order. Supported columns for sorting are: * deal.displayName *
   * deal.createTime * deal.updateTime * deal.flightStartTime *
   * deal.flightEndTime * rtbMetrics.bidRequests7Days * rtbMetrics.bids7Days *
   * rtbMetrics.adImpressions7Days * rtbMetrics.bidRate7Days *
   * rtbMetrics.filteredBidRate7Days * rtbMetrics.mustBidRateCurrentMonth
   * Example: 'deal.displayName, deal.updateTime desc'
   */
  orderBy?: string;
  /**
   * Requested page size. The server may return fewer results than requested.
   * If requested more than 500, the server will return 500 results per page. If
   * unspecified, the server will pick a default page size of 100.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListFinalizedDealsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AuthorizedBuyersMarketplace#buyersAuctionPackagesList.
 */
export interface BuyersAuctionPackagesListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * Max allowed page size is 500.
   */
  pageSize?: number;
  /**
   * The page token as returned. ListAuctionPackagesResponse.nextPageToken
   */
  pageToken?: string;
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersClientsList.
 */
export interface BuyersClientsListOptions {
  /**
   * Query string using the [Filtering
   * Syntax](https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters)
   * Supported fields for filtering are: * partnerClientId Use this field to
   * filter the clients by the partnerClientId. For example, if the
   * partnerClientId of the client is "1234", the value of this field should be
   * `partnerClientId = "1234"`, in order to get only the client whose
   * partnerClientId is "1234" in the response.
   */
  filter?: string;
  /**
   * Requested page size. If left blank, a default page size of 500 will be
   * applied.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListClientsResponse.nextPageToken returned from the
   * previous call to the list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersClientsPatch.
 */
export interface BuyersClientsPatchOptions {
  /**
   * List of fields to be updated. If empty or unspecified, the service will
   * update all fields populated in the update request excluding the output only
   * fields and primitive fields with default value. Note that explicit field
   * mask is required in order to reset a primitive field back to its default
   * value, for example, false for boolean fields, 0 for integer fields. A
   * special field mask consisting of a single path "*" can be used to indicate
   * full replacement(the equivalent of PUT method), updatable fields unset or
   * unspecified in the input will be cleared or set to default value. Output
   * only fields will be ignored regardless of the value of updateMask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBuyersClientsPatchOptions(data: any): BuyersClientsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBuyersClientsPatchOptions(data: any): BuyersClientsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersClientsUsersList.
 */
export interface BuyersClientsUsersListOptions {
  /**
   * Requested page size. If left blank, a default page size of 500 will be
   * applied.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListClientUsersResponse.nextPageToken returned from
   * the previous call to the list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersFinalizedDealsList.
 */
export interface BuyersFinalizedDealsListOptions {
  /**
   * Optional query string using the [Cloud API list filtering
   * syntax](https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters)
   * Supported columns for filtering are: * deal.displayName * deal.dealType *
   * deal.createTime * deal.updateTime * deal.flightStartTime *
   * deal.flightEndTime * dealServingStatus
   */
  filter?: string;
  /**
   * An optional query string to sort finalized deals using the [Cloud API
   * sorting
   * syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order).
   * If no sort order is specified, results will be returned in an arbitrary
   * order. Supported columns for sorting are: * deal.displayName *
   * deal.createTime * deal.updateTime * deal.flightStartTime *
   * deal.flightEndTime * rtbMetrics.bidRequests7Days * rtbMetrics.bids7Days *
   * rtbMetrics.adImpressions7Days * rtbMetrics.bidRate7Days *
   * rtbMetrics.filteredBidRate7Days * rtbMetrics.mustBidRateCurrentMonth
   * Example: 'deal.displayName, deal.updateTime desc'
   */
  orderBy?: string;
  /**
   * Requested page size. The server may return fewer results than requested.
   * If requested more than 500, the server will return 500 results per page. If
   * unspecified, the server will pick a default page size of 100.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListFinalizedDealsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersProposalsDealsList.
 */
export interface BuyersProposalsDealsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If requested more than 500, the server will return 500 results per page. If
   * unspecified, the server will pick a default page size of 100.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListDealsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AuthorizedBuyersMarketplace#buyersProposalsDealsPatch.
 */
export interface BuyersProposalsDealsPatchOptions {
  /**
   * List of fields to be updated. If empty or unspecified, the service will
   * update all fields populated in the update request excluding the output only
   * fields and primitive fields with default value. Note that explicit field
   * mask is required in order to reset a primitive field back to its default
   * value, for example, false for boolean fields, 0 for integer fields. A
   * special field mask consisting of a single path "*" can be used to indicate
   * full replacement(the equivalent of PUT method), updatable fields unset or
   * unspecified in the input will be cleared or set to default value. Output
   * only fields will be ignored regardless of the value of updateMask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBuyersProposalsDealsPatchOptions(data: any): BuyersProposalsDealsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBuyersProposalsDealsPatchOptions(data: any): BuyersProposalsDealsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersProposalsList.
 */
export interface BuyersProposalsListOptions {
  /**
   * Optional query string using the [Cloud API list filtering
   * syntax](https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters)
   * Supported columns for filtering are: * displayName * dealType * updateTime
   * * state
   */
  filter?: string;
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will put a size of 500.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListProposalsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for AuthorizedBuyersMarketplace#buyersProposalsPatch.
 */
export interface BuyersProposalsPatchOptions {
  /**
   * List of fields to be updated. If empty or unspecified, the service will
   * update all fields populated in the update request excluding the output only
   * fields and primitive fields with default value. Note that explicit field
   * mask is required in order to reset a primitive field back to its default
   * value, for example, false for boolean fields, 0 for integer fields. A
   * special field mask consisting of a single path "*" can be used to indicate
   * full replacement(the equivalent of PUT method), updatable fields unset or
   * unspecified in the input will be cleared or set to default value. Output
   * only fields will be ignored regardless of the value of updateMask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBuyersProposalsPatchOptions(data: any): BuyersProposalsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBuyersProposalsPatchOptions(data: any): BuyersProposalsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * AuthorizedBuyersMarketplace#buyersPublisherProfilesList.
 */
export interface BuyersPublisherProfilesListOptions {
  /**
   * Optional query string using the [Cloud API list filtering]
   * (https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters)
   * syntax.
   */
  filter?: string;
  /**
   * Requested page size. The server may return fewer results than requested.
   * If requested more than 500, the server will return 500 results per page. If
   * unspecified, the server will pick a default page size of 100.
   */
  pageSize?: number;
  /**
   * The page token as returned from a previous ListPublisherProfilesResponse.
   */
  pageToken?: string;
}

/**
 * Request to cancel an ongoing negotiation.
 */
export interface CancelNegotiationRequest {
}

/**
 * A client represents an agency, a brand, or an advertiser customer of the
 * buyer. Based on the client's role, its client users will have varying levels
 * of restricted access to the Marketplace and certain other sections of the
 * Authorized Buyers UI.
 */
export interface Client {
  /**
   * Required. Display name shown to publishers. Must be unique for clients
   * without partnerClientId specified. Maximum length of 255 characters is
   * allowed.
   */
  displayName?: string;
  /**
   * Output only. The resource name of the client. Format:
   * `buyers/{accountId}/clients/{clientAccountId}`
   */
  readonly name?: string;
  /**
   * Arbitrary unique identifier provided by the buyer. This field can be used
   * to associate a client with an identifier in the namespace of the buyer,
   * lookup clients by that identifier and verify whether an Authorized Buyers
   * account of the client already exists. If present, must be unique across all
   * the clients.
   */
  partnerClientId?: string;
  /**
   * Required. The role assigned to the client. Each role implies a set of
   * permissions granted to the client.
   */
  role?:  | "CLIENT_ROLE_UNSPECIFIED" | "CLIENT_DEAL_VIEWER" | "CLIENT_DEAL_NEGOTIATOR" | "CLIENT_DEAL_APPROVER";
  /**
   * Whether the client will be visible to sellers.
   */
  sellerVisible?: boolean;
  /**
   * Output only. The state of the client.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE";
}

/**
 * A user of a client who has restricted access to the Marketplace and certain
 * other sections of the Authorized Buyers UI based on the role granted to the
 * associated client.
 */
export interface ClientUser {
  /**
   * Required. The client user's email address that has to be unique across all
   * users for the same client.
   */
  email?: string;
  /**
   * Output only. The resource name of the client user. Format:
   * `buyers/{accountId}/clients/{clientAccountId}/users/{userId}`
   */
  readonly name?: string;
  /**
   * Output only. The state of the client user.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "INVITED" | "ACTIVE" | "INACTIVE";
}

/**
 * Contains information on how a buyer or seller can be reached.
 */
export interface Contact {
  /**
   * The display_name of the contact.
   */
  displayName?: string;
  /**
   * Email address for the contact.
   */
  email?: string;
}

/**
 * Message captures data about the creatives in the deal.
 */
export interface CreativeRequirements {
  /**
   * Output only. The format of the creative, only applicable for programmatic
   * guaranteed and preferred deals.
   */
  readonly creativeFormat?:  | "CREATIVE_FORMAT_UNSPECIFIED" | "DISPLAY" | "VIDEO";
  /**
   * Output only. Specifies the creative pre-approval policy.
   */
  readonly creativePreApprovalPolicy?:  | "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED" | "SELLER_PRE_APPROVAL_REQUIRED" | "SELLER_PRE_APPROVAL_NOT_REQUIRED";
  /**
   * Output only. Specifies whether the creative is safeFrame compatible.
   */
  readonly creativeSafeFrameCompatibility?:  | "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE";
  /**
   * Output only. The max duration of the video creative in milliseconds. only
   * applicable for deals with video creatives.
   */
  readonly maxAdDurationMs?: bigint;
  /**
   * Output only. Specifies the creative source for programmatic deals.
   * PUBLISHER means creative is provided by seller and ADVERTISER means
   * creative is provided by the buyer.
   */
  readonly programmaticCreativeSource?:  | "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED" | "ADVERTISER" | "PUBLISHER";
  /**
   * Output only. Skippable video ads allow viewers to skip ads after 5
   * seconds. Only applicable for deals with video creatives.
   */
  readonly skippableAdType?:  | "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "SKIPPABLE" | "INSTREAM_SELECT" | "NOT_SKIPPABLE" | "ANY";
}

/**
 * Generic targeting used for targeting dimensions that contains a list of
 * included and excluded numeric IDs. This cannot be filtered using list filter
 * syntax.
 */
export interface CriteriaTargeting {
  /**
   * A list of numeric IDs to be excluded.
   */
  excludedCriteriaIds?: bigint[];
  /**
   * A list of numeric IDs to be included.
   */
  targetedCriteriaIds?: bigint[];
}

function serializeCriteriaTargeting(data: any): CriteriaTargeting {
  return {
    ...data,
    excludedCriteriaIds: data["excludedCriteriaIds"] !== undefined ? data["excludedCriteriaIds"].map((item: any) => (String(item))) : undefined,
    targetedCriteriaIds: data["targetedCriteriaIds"] !== undefined ? data["targetedCriteriaIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCriteriaTargeting(data: any): CriteriaTargeting {
  return {
    ...data,
    excludedCriteriaIds: data["excludedCriteriaIds"] !== undefined ? data["excludedCriteriaIds"].map((item: any) => (BigInt(item))) : undefined,
    targetedCriteriaIds: data["targetedCriteriaIds"] !== undefined ? data["targetedCriteriaIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Defines targeting for a period of time on a specific week day.
 */
export interface DayPart {
  /**
   * Day of week for the period.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically
   * equivalent to 0, but is supported since in some cases there may need to be
   * differentiation made between midnight on one day and midnight on the next
   * day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only
   * acceptable minute value for hour 24. Seconds and nanos are ignored.
   */
  endTime?: TimeOfDay;
  /**
   * Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically
   * equivalent to 0, but is supported since in some cases there may need to be
   * differentiation made between midnight on one day and midnight on the next
   * day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only
   * acceptable minute value for hour 24. Seconds and nanos are ignored.
   */
  startTime?: TimeOfDay;
}

/**
 * Represents Daypart targeting.
 */
export interface DayPartTargeting {
  /**
   * The targeted weekdays and times
   */
  dayParts?: DayPart[];
  /**
   * The time zone type of the day parts
   */
  timeZoneType?:  | "TIME_ZONE_TYPE_UNSPECIFIED" | "SELLER" | "USER";
}

/**
 * Request message for disabling a client.
 */
export interface DeactivateClientRequest {
}

/**
 * Request message for deactivating a client user.
 */
export interface DeactivateClientUserRequest {
}

/**
 * A deal represents a segment of inventory for displaying ads that contains
 * the terms and targeting information that is used for serving as well as the
 * deal stats and status. Note: A proposal may contain multiple deals.
 */
export interface Deal {
  /**
   * Output only. When the client field is populated, this field refers to the
   * buyer who creates and manages the client buyer and gets billed on behalf of
   * the client buyer; when the buyer field is populated, this field is the same
   * value as buyer. Format : `buyers/{buyerAccountId}`
   */
  readonly billedBuyer?: string;
  /**
   * Output only. Refers to a buyer in The Realtime-bidding API. Format:
   * `buyers/{buyerAccountId}`
   */
  readonly buyer?: string;
  /**
   * Output only. Refers to a Client. Format:
   * `buyers/{buyerAccountId}/clients/{clientAccountid}`
   */
  readonly client?: string;
  /**
   * Output only. The time of the deal creation.
   */
  readonly createTime?: Date;
  /**
   * Output only. Metadata about the creatives of this deal.
   */
  readonly creativeRequirements?: CreativeRequirements;
  /**
   * Output only. Type of deal.
   */
  readonly dealType?:  | "DEAL_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED";
  /**
   * Output only. Specifies the pacing set by the publisher.
   */
  readonly deliveryControl?: DeliveryControl;
  /**
   * Output only. Free text description for the deal terms.
   */
  readonly description?: string;
  /**
   * Output only. The name of the deal. Maximum length of 255 unicode
   * characters is allowed. Control characters are not allowed. Buyers cannot
   * update this field. Note: Not to be confused with name, which is a unique
   * identifier of the deal.
   */
  readonly displayName?: string;
  /**
   * Specified by buyers in request for proposal (RFP) to notify publisher the
   * total estimated spend for the proposal. Publishers will receive this
   * information and send back proposed deals accordingly.
   */
  estimatedGrossSpend?: Money;
  /**
   * Proposed flight end time of the deal. This will generally be stored in a
   * granularity of a second. A value is not necessary for Private Auction
   * deals.
   */
  flightEndTime?: Date;
  /**
   * Proposed flight start time of the deal. This will generally be stored in
   * the granularity of one second since deal serving starts at seconds
   * boundary. Any time specified with more granularity (for example, in
   * milliseconds) will be truncated towards the start of time in seconds.
   */
  flightStartTime?: Date;
  /**
   * Immutable. The unique identifier of the deal. Auto-generated by the server
   * when a deal is created. Format:
   * buyers/{accountId}/proposals/{proposalId}/deals/{dealId}
   */
  name?: string;
  /**
   * The terms for preferred deals.
   */
  preferredDealTerms?: PreferredDealTerms;
  /**
   * The terms for private auction deals.
   */
  privateAuctionTerms?: PrivateAuctionTerms;
  /**
   * The terms for programmatic guaranteed deals.
   */
  programmaticGuaranteedTerms?: ProgrammaticGuaranteedTerms;
  /**
   * Output only. The revision number for the proposal and is the same value as
   * proposal.proposal_revision. Each update to deal causes the proposal
   * revision number to auto-increment. The buyer keeps track of the last
   * revision number they know of and pass it in when making an update. If the
   * head revision number on the server has since incremented, then an ABORTED
   * error is returned during the update operation to let the buyer know that a
   * subsequent update was made.
   */
  readonly proposalRevision?: bigint;
  /**
   * Immutable. Reference to the seller on the deal. Format:
   * `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}`
   */
  publisherProfile?: string;
  /**
   * Output only. Time zone of the seller used to mark the boundaries of a day
   * for daypart targeting and CPD billing.
   */
  readonly sellerTimeZone?: TimeZone;
  /**
   * Specifies the subset of inventory targeted by the deal. Can be updated by
   * the buyer before the deal is finalized.
   */
  targeting?: MarketplaceTargeting;
  /**
   * Output only. The time when the deal was last updated.
   */
  readonly updateTime?: Date;
}

function serializeDeal(data: any): Deal {
  return {
    ...data,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? serializeMoney(data["estimatedGrossSpend"]) : undefined,
    flightEndTime: data["flightEndTime"] !== undefined ? data["flightEndTime"].toISOString() : undefined,
    flightStartTime: data["flightStartTime"] !== undefined ? data["flightStartTime"].toISOString() : undefined,
    preferredDealTerms: data["preferredDealTerms"] !== undefined ? serializePreferredDealTerms(data["preferredDealTerms"]) : undefined,
    privateAuctionTerms: data["privateAuctionTerms"] !== undefined ? serializePrivateAuctionTerms(data["privateAuctionTerms"]) : undefined,
    programmaticGuaranteedTerms: data["programmaticGuaranteedTerms"] !== undefined ? serializeProgrammaticGuaranteedTerms(data["programmaticGuaranteedTerms"]) : undefined,
    targeting: data["targeting"] !== undefined ? serializeMarketplaceTargeting(data["targeting"]) : undefined,
  };
}

function deserializeDeal(data: any): Deal {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? deserializeMoney(data["estimatedGrossSpend"]) : undefined,
    flightEndTime: data["flightEndTime"] !== undefined ? new Date(data["flightEndTime"]) : undefined,
    flightStartTime: data["flightStartTime"] !== undefined ? new Date(data["flightStartTime"]) : undefined,
    preferredDealTerms: data["preferredDealTerms"] !== undefined ? deserializePreferredDealTerms(data["preferredDealTerms"]) : undefined,
    privateAuctionTerms: data["privateAuctionTerms"] !== undefined ? deserializePrivateAuctionTerms(data["privateAuctionTerms"]) : undefined,
    programmaticGuaranteedTerms: data["programmaticGuaranteedTerms"] !== undefined ? deserializeProgrammaticGuaranteedTerms(data["programmaticGuaranteedTerms"]) : undefined,
    proposalRevision: data["proposalRevision"] !== undefined ? BigInt(data["proposalRevision"]) : undefined,
    targeting: data["targeting"] !== undefined ? deserializeMarketplaceTargeting(data["targeting"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Information related to deal pausing.
 */
export interface DealPausingInfo {
  /**
   * The reason for the pausing of the deal; empty for active deals.
   */
  pauseReason?: string;
  /**
   * The party that first paused the deal; unspecified for active deals.
   */
  pauseRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * Whether pausing is consented between buyer and seller for the deal.
   */
  pausingConsented?: boolean;
}

/**
 * Message contains details about how the deal will be paced.
 */
export interface DeliveryControl {
  /**
   * Output only. Specifies roadblocking in a main companion lineitem.
   */
  readonly companionDeliveryType?:  | "COMPANION_DELIVERY_TYPE_UNSPECIFIED" | "DELIVERY_OPTIONAL" | "DELIVERY_AT_LEAST_ONE" | "DELIVERY_ALL";
  /**
   * Output only. Specifies strategy to use for selecting a creative when
   * multiple creatives of the same size are available.
   */
  readonly creativeRotationType?:  | "CREATIVE_ROTATION_TYPE_UNSPECIFIED" | "ROTATION_EVEN" | "ROTATION_OPTIMIZED" | "ROTATION_MANUAL" | "ROTATION_SEQUENTIAL";
  /**
   * Output only. Specifies how the impression delivery will be paced.
   */
  readonly deliveryRateType?:  | "DELIVERY_RATE_TYPE_UNSPECIFIED" | "EVENLY" | "FRONT_LOADED" | "AS_FAST_AS_POSSIBLE";
  /**
   * Output only. Specifies any frequency caps. Cannot be filtered within
   * ListDealsRequest.
   */
  readonly frequencyCap?: FrequencyCap[];
  /**
   * Output only. Specifies the roadblocking type in display creatives.
   */
  readonly roadblockingType?:  | "ROADBLOCKING_TYPE_UNSPECIFIED" | "ONLY_ONE" | "ONE_OR_MORE" | "AS_MANY_AS_POSSIBLE" | "ALL_ROADBLOCK" | "CREATIVE_SET";
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
 * A finalized deal is a snapshot of the deal when both buyer and seller accept
 * the deal. The buyer or seller can update the deal after it's been finalized
 * and renegotiate on the deal targeting, terms and other fields, while at the
 * same time the finalized snapshot of the deal can still be retrieved using
 * this API. The finalized deal contains a copy of the deal as it existed when
 * most recently finalized, as well as fields related to deal serving such as
 * pause/resume status, RTB metrics, and more.
 */
export interface FinalizedDeal {
  /**
   * A copy of the Deal made upon finalization. During renegotiation, this will
   * reflect the last finalized deal before renegotiation was initiated.
   */
  deal?: Deal;
  /**
   * Information related to deal pausing for the deal.
   */
  dealPausingInfo?: DealPausingInfo;
  /**
   * Serving status of the deal.
   */
  dealServingStatus?:  | "DEAL_SERVING_STATUS_UNSPECIFIED" | "ACTIVE" | "ENDED" | "PAUSED_BY_BUYER" | "PAUSED_BY_SELLER";
  /**
   * The resource name of the finalized deal. Format:
   * `buyers/{accountId}/finalizeddeals/{finalizedDealId}`
   */
  name?: string;
  /**
   * Whether the Programmatic Guaranteed deal is ready for serving.
   */
  readyToServe?: boolean;
  /**
   * Real-time bidding metrics for this deal.
   */
  rtbMetrics?: RtbMetrics;
}

function serializeFinalizedDeal(data: any): FinalizedDeal {
  return {
    ...data,
    deal: data["deal"] !== undefined ? serializeDeal(data["deal"]) : undefined,
    rtbMetrics: data["rtbMetrics"] !== undefined ? serializeRtbMetrics(data["rtbMetrics"]) : undefined,
  };
}

function deserializeFinalizedDeal(data: any): FinalizedDeal {
  return {
    ...data,
    deal: data["deal"] !== undefined ? deserializeDeal(data["deal"]) : undefined,
    rtbMetrics: data["rtbMetrics"] !== undefined ? deserializeRtbMetrics(data["rtbMetrics"]) : undefined,
  };
}

/**
 * Represents a list of targeted and excluded mobile application IDs that
 * publishers own. Android App ID, for example, com.google.android.apps.maps,
 * can be found in Google Play Store URL. iOS App ID (which is a number) can be
 * found at the end of iTunes store URL. First party mobile applications is
 * either included or excluded.
 */
export interface FirstPartyMobileApplicationTargeting {
  /**
   * A list of application IDs to be excluded.
   */
  excludedAppIds?: string[];
  /**
   * A list of application IDs to be included.
   */
  targetedAppIds?: string[];
}

/**
 * Message contains details about publisher-set frequency caps of the delivery.
 */
export interface FrequencyCap {
  /**
   * The maximum number of impressions that can be served to a user within the
   * specified time period.
   */
  maxImpressions?: number;
  /**
   * The amount of time, in the units specified by time_unit_type. Defines the
   * amount of time over which impressions per user are counted and capped.
   */
  timeUnitsCount?: number;
  /**
   * The time unit. Along with num_time_units defines the amount of time over
   * which impressions per user are counted and capped.
   */
  timeUnitType?:  | "TIME_UNIT_TYPE_UNSPECIFIED" | "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "LIFETIME" | "POD" | "STREAM";
}

/**
 * Represents the size of an ad unit that can be targeted on a bid request.
 */
export interface InventorySizeTargeting {
  /**
   * A list of inventory sizes to be excluded.
   */
  excludedInventorySizes?: AdSize[];
  /**
   * A list of inventory sizes to be included.
   */
  targetedInventorySizes?: AdSize[];
}

function serializeInventorySizeTargeting(data: any): InventorySizeTargeting {
  return {
    ...data,
    excludedInventorySizes: data["excludedInventorySizes"] !== undefined ? data["excludedInventorySizes"].map((item: any) => (serializeAdSize(item))) : undefined,
    targetedInventorySizes: data["targetedInventorySizes"] !== undefined ? data["targetedInventorySizes"].map((item: any) => (serializeAdSize(item))) : undefined,
  };
}

function deserializeInventorySizeTargeting(data: any): InventorySizeTargeting {
  return {
    ...data,
    excludedInventorySizes: data["excludedInventorySizes"] !== undefined ? data["excludedInventorySizes"].map((item: any) => (deserializeAdSize(item))) : undefined,
    targetedInventorySizes: data["targetedInventorySizes"] !== undefined ? data["targetedInventorySizes"].map((item: any) => (deserializeAdSize(item))) : undefined,
  };
}

/**
 * Targeting of the inventory types a bid request can originate from.
 */
export interface InventoryTypeTargeting {
  /**
   * The list of targeted inventory types for the bid request.
   */
  inventoryTypes?:  | "INVENTORY_TYPE_UNSPECIFIED" | "BROWSER" | "MOBILE_APP" | "VIDEO_PLAYER"[];
}

/**
 * Response message for listing auction packages.
 */
export interface ListAuctionPackagesResponse {
  /**
   * The list of auction packages.
   */
  auctionPackages?: AuctionPackage[];
  /**
   * Continuation token for fetching the next page of results. Pass this value
   * in the ListAuctionPackagesRequest.pageToken field in the subsequent call to
   * the `ListAuctionPackages` method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for the list method.
 */
export interface ListClientsResponse {
  /**
   * The returned list of clients.
   */
  clients?: Client[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListClientsRequest.pageToken field in the subsequent call to the list
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for the list method.
 */
export interface ListClientUsersResponse {
  /**
   * The returned list of client users.
   */
  clientUsers?: ClientUser[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListClientUsersRequest.pageToken field in the subsequent call to the list
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for listing deals in a proposal.
 */
export interface ListDealsResponse {
  /**
   * The list of deals.
   */
  deals?: Deal[];
  /**
   * Token to fetch the next page of results.
   */
  nextPageToken?: string;
}

function serializeListDealsResponse(data: any): ListDealsResponse {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (serializeDeal(item))) : undefined,
  };
}

function deserializeListDealsResponse(data: any): ListDealsResponse {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (deserializeDeal(item))) : undefined,
  };
}

/**
 * Response message for listing finalized deals.
 */
export interface ListFinalizedDealsResponse {
  /**
   * The list of finalized deals.
   */
  finalizedDeals?: FinalizedDeal[];
  /**
   * Token to fetch the next page of results.
   */
  nextPageToken?: string;
}

function serializeListFinalizedDealsResponse(data: any): ListFinalizedDealsResponse {
  return {
    ...data,
    finalizedDeals: data["finalizedDeals"] !== undefined ? data["finalizedDeals"].map((item: any) => (serializeFinalizedDeal(item))) : undefined,
  };
}

function deserializeListFinalizedDealsResponse(data: any): ListFinalizedDealsResponse {
  return {
    ...data,
    finalizedDeals: data["finalizedDeals"] !== undefined ? data["finalizedDeals"].map((item: any) => (deserializeFinalizedDeal(item))) : undefined,
  };
}

/**
 * Response message for listing proposals.
 */
export interface ListProposalsResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of proposals.
   */
  proposals?: Proposal[];
}

/**
 * Response message for profiles visible to the buyer.
 */
export interface ListPublisherProfilesResponse {
  /**
   * Token to fetch the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of matching publisher profiles.
   */
  publisherProfiles?: PublisherProfile[];
}

/**
 * Targeting represents different criteria that can be used to target
 * inventory. For example, they can choose to target inventory only if the user
 * is in the US. Multiple types of targeting are always applied as a logical
 * AND, unless noted otherwise.
 */
export interface MarketplaceTargeting {
  /**
   * Daypart targeting information.
   */
  daypartTargeting?: DayPartTargeting;
  /**
   * Output only. Geo criteria IDs to be included/excluded.
   */
  readonly geoTargeting?: CriteriaTargeting;
  /**
   * Output only. Inventory sizes to be included/excluded.
   */
  readonly inventorySizeTargeting?: InventorySizeTargeting;
  /**
   * Output only. Inventory type targeting information.
   */
  readonly inventoryTypeTargeting?: InventoryTypeTargeting;
  /**
   * Output only. Placement targeting information, for example, URL, mobile
   * applications.
   */
  readonly placementTargeting?: PlacementTargeting;
  /**
   * Output only. Technology targeting information, for example, operating
   * system, device category.
   */
  readonly technologyTargeting?: TechnologyTargeting;
  /**
   * Buyer user list targeting information. User lists can be uploaded using
   * https://developers.google.com/authorized-buyers/rtb/bulk-uploader.
   */
  userListTargeting?: CriteriaTargeting;
  /**
   * Output only. Video targeting information.
   */
  readonly videoTargeting?: VideoTargeting;
}

function serializeMarketplaceTargeting(data: any): MarketplaceTargeting {
  return {
    ...data,
    userListTargeting: data["userListTargeting"] !== undefined ? serializeCriteriaTargeting(data["userListTargeting"]) : undefined,
  };
}

function deserializeMarketplaceTargeting(data: any): MarketplaceTargeting {
  return {
    ...data,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeCriteriaTargeting(data["geoTargeting"]) : undefined,
    inventorySizeTargeting: data["inventorySizeTargeting"] !== undefined ? deserializeInventorySizeTargeting(data["inventorySizeTargeting"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? deserializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
    userListTargeting: data["userListTargeting"] !== undefined ? deserializeCriteriaTargeting(data["userListTargeting"]) : undefined,
  };
}

/**
 * Mobile application targeting settings.
 */
export interface MobileApplicationTargeting {
  /**
   * Publisher owned apps to be targeted or excluded by the publisher to
   * display the ads in.
   */
  firstPartyTargeting?: FirstPartyMobileApplicationTargeting;
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * A text note attached to the proposal to facilitate the communication between
 * buyers and sellers.
 */
export interface Note {
  /**
   * Output only. When this note was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The role who created the note.
   */
  readonly creatorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * The text of the note. Maximum length is 1024 characters.
   */
  note?: string;
}

/**
 * Represents targeting information for operating systems.
 */
export interface OperatingSystemTargeting {
  /**
   * IDs of operating systems to be included/excluded.
   */
  operatingSystemCriteria?: CriteriaTargeting;
  /**
   * IDs of operating system versions to be included/excluded.
   */
  operatingSystemVersionCriteria?: CriteriaTargeting;
}

function serializeOperatingSystemTargeting(data: any): OperatingSystemTargeting {
  return {
    ...data,
    operatingSystemCriteria: data["operatingSystemCriteria"] !== undefined ? serializeCriteriaTargeting(data["operatingSystemCriteria"]) : undefined,
    operatingSystemVersionCriteria: data["operatingSystemVersionCriteria"] !== undefined ? serializeCriteriaTargeting(data["operatingSystemVersionCriteria"]) : undefined,
  };
}

function deserializeOperatingSystemTargeting(data: any): OperatingSystemTargeting {
  return {
    ...data,
    operatingSystemCriteria: data["operatingSystemCriteria"] !== undefined ? deserializeCriteriaTargeting(data["operatingSystemCriteria"]) : undefined,
    operatingSystemVersionCriteria: data["operatingSystemVersionCriteria"] !== undefined ? deserializeCriteriaTargeting(data["operatingSystemVersionCriteria"]) : undefined,
  };
}

/**
 * Request message for pausing a finalized deal.
 */
export interface PauseFinalizedDealRequest {
  /**
   * The reason to pause the finalized deal, will be displayed to the seller.
   * Maximum length is 1000 characters.
   */
  reason?: string;
}

/**
 * Represents targeting about where the ads can appear, for example, certain
 * sites or mobile applications. Different placement targeting types will be
 * logically OR'ed.
 */
export interface PlacementTargeting {
  /**
   * Mobile application targeting information in a deal. This doesn't apply to
   * Auction Packages.
   */
  mobileApplicationTargeting?: MobileApplicationTargeting;
  /**
   * URLs to be included/excluded.
   */
  uriTargeting?: UriTargeting;
}

/**
 * Pricing terms for Preferred Deals.
 */
export interface PreferredDealTerms {
  /**
   * Fixed price for the deal.
   */
  fixedPrice?: Price;
}

function serializePreferredDealTerms(data: any): PreferredDealTerms {
  return {
    ...data,
    fixedPrice: data["fixedPrice"] !== undefined ? serializePrice(data["fixedPrice"]) : undefined,
  };
}

function deserializePreferredDealTerms(data: any): PreferredDealTerms {
  return {
    ...data,
    fixedPrice: data["fixedPrice"] !== undefined ? deserializePrice(data["fixedPrice"]) : undefined,
  };
}

/**
 * Represents a price and a pricing type for a deal.
 */
export interface Price {
  /**
   * The actual price with currency specified.
   */
  amount?: Money;
  /**
   * The pricing type for the deal.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CPM" | "CPD";
}

function serializePrice(data: any): Price {
  return {
    ...data,
    amount: data["amount"] !== undefined ? serializeMoney(data["amount"]) : undefined,
  };
}

function deserializePrice(data: any): Price {
  return {
    ...data,
    amount: data["amount"] !== undefined ? deserializeMoney(data["amount"]) : undefined,
  };
}

/**
 * Pricing terms for Private Auctions.
 */
export interface PrivateAuctionTerms {
  /**
   * The minimum price buyer has to bid to compete in the private auction.
   */
  floorPrice?: Price;
  /**
   * Output only. True if open auction buyers are allowed to compete with
   * invited buyers in this private auction.
   */
  readonly openAuctionAllowed?: boolean;
}

function serializePrivateAuctionTerms(data: any): PrivateAuctionTerms {
  return {
    ...data,
    floorPrice: data["floorPrice"] !== undefined ? serializePrice(data["floorPrice"]) : undefined,
  };
}

function deserializePrivateAuctionTerms(data: any): PrivateAuctionTerms {
  return {
    ...data,
    floorPrice: data["floorPrice"] !== undefined ? deserializePrice(data["floorPrice"]) : undefined,
  };
}

/**
 * Buyers are allowed to store certain types of private data in a proposal or
 * deal.
 */
export interface PrivateData {
  /**
   * A buyer specified reference ID. This can be queried in the list operations
   * (max-length: 1024 unicode code units).
   */
  referenceId?: string;
}

/**
 * Pricing terms for Programmatic Guaranteed Deals.
 */
export interface ProgrammaticGuaranteedTerms {
  /**
   * Fixed price for the deal.
   */
  fixedPrice?: Price;
  /**
   * Count of guaranteed looks.
   */
  guaranteedLooks?: bigint;
  /**
   * The lifetime impression cap for CPM Sponsorship deals. Deal will stop
   * serving when cap is reached.
   */
  impressionCap?: bigint;
  /**
   * Daily minimum looks for CPD deal types.
   */
  minimumDailyLooks?: bigint;
  /**
   * For sponsorship deals, this is the percentage of the seller's eligible
   * impressions that the deal will serve until the cap is reached. Valid value
   * is within range 0~100.
   */
  percentShareOfVoice?: bigint;
  /**
   * The reservation type for a Programmatic Guaranteed deal. This indicates
   * whether the number of impressions is fixed, or a percent of available
   * impressions. If not specified, the default reservation type is STANDARD.
   */
  reservationType?:  | "RESERVATION_TYPE_UNSPECIFIED" | "STANDARD" | "SPONSORSHIP";
}

function serializeProgrammaticGuaranteedTerms(data: any): ProgrammaticGuaranteedTerms {
  return {
    ...data,
    fixedPrice: data["fixedPrice"] !== undefined ? serializePrice(data["fixedPrice"]) : undefined,
    guaranteedLooks: data["guaranteedLooks"] !== undefined ? String(data["guaranteedLooks"]) : undefined,
    impressionCap: data["impressionCap"] !== undefined ? String(data["impressionCap"]) : undefined,
    minimumDailyLooks: data["minimumDailyLooks"] !== undefined ? String(data["minimumDailyLooks"]) : undefined,
    percentShareOfVoice: data["percentShareOfVoice"] !== undefined ? String(data["percentShareOfVoice"]) : undefined,
  };
}

function deserializeProgrammaticGuaranteedTerms(data: any): ProgrammaticGuaranteedTerms {
  return {
    ...data,
    fixedPrice: data["fixedPrice"] !== undefined ? deserializePrice(data["fixedPrice"]) : undefined,
    guaranteedLooks: data["guaranteedLooks"] !== undefined ? BigInt(data["guaranteedLooks"]) : undefined,
    impressionCap: data["impressionCap"] !== undefined ? BigInt(data["impressionCap"]) : undefined,
    minimumDailyLooks: data["minimumDailyLooks"] !== undefined ? BigInt(data["minimumDailyLooks"]) : undefined,
    percentShareOfVoice: data["percentShareOfVoice"] !== undefined ? BigInt(data["percentShareOfVoice"]) : undefined,
  };
}

/**
 * Represents a proposal in the Marketplace. A proposal is the unit of
 * negotiation between a seller and a buyer.
 */
export interface Proposal {
  /**
   * Output only. When the client field is populated, this field refers to the
   * buyer who creates and manages the client buyer and gets billed on behalf of
   * the client buyer; when the buyer field is populated, this field is the same
   * value as buyer. Format : `buyers/{buyerAccountId}`
   */
  readonly billedBuyer?: string;
  /**
   * Output only. Refers to a buyer in The Realtime-bidding API. Format:
   * `buyers/{buyerAccountId}`
   */
  readonly buyer?: string;
  /**
   * Contact information for the buyer.
   */
  buyerContacts?: Contact[];
  /**
   * Buyer private data (hidden from seller).
   */
  buyerPrivateData?: PrivateData;
  /**
   * Output only. Refers to a Client. Format:
   * `buyers/{buyerAccountId}/clients/{clientAccountid}`
   */
  readonly client?: string;
  /**
   * Output only. Type of deal the proposal contains.
   */
  readonly dealType?:  | "DEAL_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED";
  /**
   * Output only. The descriptive name for the proposal. Maximum length of 255
   * unicode characters is allowed. Control characters are not allowed. Buyers
   * cannot update this field. Note: Not to be confused with name, which is a
   * unique identifier of the proposal.
   */
  readonly displayName?: string;
  /**
   * Output only. True if the proposal was previously finalized and is now
   * being renegotiated.
   */
  readonly isRenegotiating?: boolean;
  /**
   * Output only. The role of the last user that either updated the proposal or
   * left a comment.
   */
  readonly lastUpdaterOrCommentorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * Immutable. The name of the proposal serving as a unique identifier.
   * Format: buyers/{accountId}/proposals/{proposalId}
   */
  name?: string;
  /**
   * A list of notes from the buyer and the seller attached to this proposal.
   */
  notes?: Note[];
  /**
   * Output only. Indicates whether the buyer/seller created the proposal.
   */
  readonly originatorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * Whether pausing is allowed for the proposal. This is a negotiable term
   * between buyers and publishers.
   */
  pausingConsented?: boolean;
  /**
   * Output only. The revision number for the proposal. Each update to the
   * proposal or deal causes the proposal revision number to auto-increment. The
   * buyer keeps track of the last revision number they know of and pass it in
   * when making an update. If the head revision number on the server has since
   * incremented, then an ABORTED error is returned during the update operation
   * to let the buyer know that a subsequent update was made.
   */
  readonly proposalRevision?: bigint;
  /**
   * Immutable. Reference to the seller on the proposal. Format:
   * `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}` Note: This
   * field may be set only when creating the resource. Modifying this field
   * while updating the resource will result in an error.
   */
  publisherProfile?: string;
  /**
   * Output only. Contact information for the seller.
   */
  readonly sellerContacts?: Contact[];
  /**
   * Output only. Indicates the state of the proposal.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "BUYER_REVIEW_REQUESTED" | "SELLER_REVIEW_REQUESTED" | "BUYER_ACCEPTANCE_REQUESTED" | "FINALIZED" | "TERMINATED";
  /**
   * Output only. The terms and conditions associated with this proposal.
   * Accepting a proposal implies acceptance of this field. This is created by
   * the seller, the buyer can only view it.
   */
  readonly termsAndConditions?: string;
  /**
   * Output only. The time when the proposal was last revised.
   */
  readonly updateTime?: Date;
}

/**
 * The values in the publisher profile are supplied by the publisher. All
 * fields are not filterable unless stated otherwise.
 */
export interface PublisherProfile {
  /**
   * Description on the publisher's audience.
   */
  audienceDescription?: string;
  /**
   * Contact information for direct reservation deals. This is free text
   * entered by the publisher and may include information like names, phone
   * numbers and email addresses.
   */
  directDealsContact?: string;
  /**
   * Display name of the publisher profile. Can be used to filter the response
   * of the publisherProfiles.list method.
   */
  displayName?: string;
  /**
   * The list of domains represented in this publisher profile. Empty if this
   * is a parent profile. These are top private domains, meaning that these will
   * not contain a string like "photos.google.co.uk/123", but will instead
   * contain "google.co.uk". Can be used to filter the response of the
   * publisherProfiles.list method.
   */
  domains?: string[];
  /**
   * Indicates if this profile is the parent profile of the seller. A parent
   * profile represents all the inventory from the seller, as opposed to child
   * profile that is created to brand a portion of inventory. One seller has
   * only one parent publisher profile, and can have multiple child profiles.
   * See https://support.google.com/admanager/answer/6035806 for details. Can be
   * used to filter the response of the publisherProfiles.list method by setting
   * the filter to "is_parent: true".
   */
  isParent?: boolean;
  /**
   * A Google public URL to the logo for this publisher profile. The logo is
   * stored as a PNG, JPG, or GIF image.
   */
  logoUrl?: string;
  /**
   * URL to additional marketing and sales materials.
   */
  mediaKitUrl?: string;
  /**
   * The list of apps represented in this publisher profile. Empty if this is a
   * parent profile.
   */
  mobileApps?: PublisherProfileMobileApplication[];
  /**
   * Name of the publisher profile. Format:
   * `buyers/{buyer}/publisherProfiles/{publisher_profile}`
   */
  name?: string;
  /**
   * Overview of the publisher.
   */
  overview?: string;
  /**
   * Statement explaining what's unique about publisher's business, and why
   * buyers should partner with the publisher.
   */
  pitchStatement?: string;
  /**
   * Contact information for programmatic deals. This is free text entered by
   * the publisher and may include information like names, phone numbers and
   * email addresses.
   */
  programmaticDealsContact?: string;
  /**
   * A unique identifying code for the seller. This value is the same for all
   * of the seller's parent and child publisher profiles. Can be used to filter
   * the response of the publisherProfiles.list method.
   */
  publisherCode?: string;
  /**
   * URL to a sample content page.
   */
  samplePageUrl?: string;
  /**
   * Up to three key metrics and rankings. For example, "#1 Mobile News Site
   * for 20 Straight Months".
   */
  topHeadlines?: string[];
}

/**
 * A mobile application that contains a external app ID, name, and app store.
 */
export interface PublisherProfileMobileApplication {
  /**
   * The app store the app belongs to. Can be used to filter the response of
   * the publisherProfiles.list method.
   */
  appStore?:  | "APP_STORE_TYPE_UNSPECIFIED" | "APPLE_ITUNES" | "GOOGLE_PLAY" | "ROKU" | "AMAZON_FIRE_TV" | "PLAYSTATION" | "XBOX" | "SAMSUNG_TV" | "AMAZON" | "OPPO" | "SAMSUNG" | "VIVO" | "XIAOMI";
  /**
   * The external ID for the app from its app store. Can be used to filter the
   * response of the publisherProfiles.list method.
   */
  externalAppId?: string;
  /**
   * The name of the app.
   */
  name?: string;
}

/**
 * Request message for resuming a finalized deal.
 */
export interface ResumeFinalizedDealRequest {
}

/**
 * Real-time bidding metrics. For what each metric means refer to [Report
 * metrics](https://support.google.com/adxbuyer/answer/6115195#report-metrics)
 */
export interface RtbMetrics {
  /**
   * Ad impressions in last 7 days.
   */
  adImpressions7Days?: bigint;
  /**
   * Bid rate in last 7 days, calculated by (bids / bid requests).
   */
  bidRate7Days?: number;
  /**
   * Bid requests in last 7 days.
   */
  bidRequests7Days?: bigint;
  /**
   * Bids in last 7 days.
   */
  bids7Days?: bigint;
  /**
   * Filtered bid rate in last 7 days, calculated by (filtered bids / bids).
   */
  filteredBidRate7Days?: number;
  /**
   * Must bid rate for current month.
   */
  mustBidRateCurrentMonth?: number;
}

function serializeRtbMetrics(data: any): RtbMetrics {
  return {
    ...data,
    adImpressions7Days: data["adImpressions7Days"] !== undefined ? String(data["adImpressions7Days"]) : undefined,
    bidRequests7Days: data["bidRequests7Days"] !== undefined ? String(data["bidRequests7Days"]) : undefined,
    bids7Days: data["bids7Days"] !== undefined ? String(data["bids7Days"]) : undefined,
  };
}

function deserializeRtbMetrics(data: any): RtbMetrics {
  return {
    ...data,
    adImpressions7Days: data["adImpressions7Days"] !== undefined ? BigInt(data["adImpressions7Days"]) : undefined,
    bidRequests7Days: data["bidRequests7Days"] !== undefined ? BigInt(data["bidRequests7Days"]) : undefined,
    bids7Days: data["bids7Days"] !== undefined ? BigInt(data["bids7Days"]) : undefined,
  };
}

/**
 * Request to send an RFP. All fields in this request are proposed to publisher
 * and subject to changes by publisher during later negotiation.
 */
export interface SendRfpRequest {
  /**
   * Contact information for the buyer.
   */
  buyerContacts?: Contact[];
  /**
   * If the current buyer is sending the RFP on behalf of its client, use this
   * field to specify the name of the client in the format:
   * `buyers/{accountId}/clients/{clientAccountid}`.
   */
  client?: string;
  /**
   * Required. The display name of the proposal being created by this RFP.
   */
  displayName?: string;
  /**
   * Specified by buyers in request for proposal (RFP) to notify publisher the
   * total estimated spend for the proposal. Publishers will receive this
   * information and send back proposed deals accordingly.
   */
  estimatedGrossSpend?: Money;
  /**
   * Required. Proposed flight end time of the RFP. A timestamp in RFC3339 UTC
   * "Zulu" format. Note that the specified value will be truncated to a
   * granularity of one second.
   */
  flightEndTime?: Date;
  /**
   * Required. Proposed flight start time of the RFP. A timestamp in RFC3339
   * UTC "Zulu" format. Note that the specified value will be truncated to a
   * granularity of one second.
   */
  flightStartTime?: Date;
  /**
   * Geo criteria IDs to be targeted. Refer to Geo tables.
   */
  geoTargeting?: CriteriaTargeting;
  /**
   * Inventory sizes to be targeted.
   */
  inventorySizeTargeting?: InventorySizeTargeting;
  /**
   * A message that is sent to the publisher. Maximum length is 1024
   * characters.
   */
  note?: string;
  /**
   * The terms for preferred deals.
   */
  preferredDealTerms?: PreferredDealTerms;
  /**
   * The terms for programmatic guaranteed deals.
   */
  programmaticGuaranteedTerms?: ProgrammaticGuaranteedTerms;
  /**
   * Required. The profile of the publisher who will receive this RFP in the
   * format: `buyers/{accountId}/publisherProfiles/{publisherProfileId}`.
   */
  publisherProfile?: string;
}

function serializeSendRfpRequest(data: any): SendRfpRequest {
  return {
    ...data,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? serializeMoney(data["estimatedGrossSpend"]) : undefined,
    flightEndTime: data["flightEndTime"] !== undefined ? data["flightEndTime"].toISOString() : undefined,
    flightStartTime: data["flightStartTime"] !== undefined ? data["flightStartTime"].toISOString() : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? serializeCriteriaTargeting(data["geoTargeting"]) : undefined,
    inventorySizeTargeting: data["inventorySizeTargeting"] !== undefined ? serializeInventorySizeTargeting(data["inventorySizeTargeting"]) : undefined,
    preferredDealTerms: data["preferredDealTerms"] !== undefined ? serializePreferredDealTerms(data["preferredDealTerms"]) : undefined,
    programmaticGuaranteedTerms: data["programmaticGuaranteedTerms"] !== undefined ? serializeProgrammaticGuaranteedTerms(data["programmaticGuaranteedTerms"]) : undefined,
  };
}

function deserializeSendRfpRequest(data: any): SendRfpRequest {
  return {
    ...data,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? deserializeMoney(data["estimatedGrossSpend"]) : undefined,
    flightEndTime: data["flightEndTime"] !== undefined ? new Date(data["flightEndTime"]) : undefined,
    flightStartTime: data["flightStartTime"] !== undefined ? new Date(data["flightStartTime"]) : undefined,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeCriteriaTargeting(data["geoTargeting"]) : undefined,
    inventorySizeTargeting: data["inventorySizeTargeting"] !== undefined ? deserializeInventorySizeTargeting(data["inventorySizeTargeting"]) : undefined,
    preferredDealTerms: data["preferredDealTerms"] !== undefined ? deserializePreferredDealTerms(data["preferredDealTerms"]) : undefined,
    programmaticGuaranteedTerms: data["programmaticGuaranteedTerms"] !== undefined ? deserializeProgrammaticGuaranteedTerms(data["programmaticGuaranteedTerms"]) : undefined,
  };
}

/**
 * Request message for setting ready to serve for a finalized deal.
 */
export interface SetReadyToServeRequest {
}

/**
 * Request message for SubscribeAuctionPackage.
 */
export interface SubscribeAuctionPackageRequest {
}

/**
 * Request message for SubscribeAuctionPackageClients.
 */
export interface SubscribeClientsRequest {
  /**
   * Optional. A list of client buyers to subscribe to the auction package,
   * with client buyer in the format
   * `buyers/{accountId}/clients/{clientAccountId}`. The current buyer will be
   * subscribed to the auction package regardless of the list contents if not
   * already.
   */
  clients?: string[];
}

/**
 * Represents targeting about various types of technology.
 */
export interface TechnologyTargeting {
  /**
   * IDs of device capabilities to be included/excluded.
   */
  deviceCapabilityTargeting?: CriteriaTargeting;
  /**
   * IDs of device categories to be included/excluded.
   */
  deviceCategoryTargeting?: CriteriaTargeting;
  /**
   * Operating system related targeting information.
   */
  operatingSystemTargeting?: OperatingSystemTargeting;
}

function serializeTechnologyTargeting(data: any): TechnologyTargeting {
  return {
    ...data,
    deviceCapabilityTargeting: data["deviceCapabilityTargeting"] !== undefined ? serializeCriteriaTargeting(data["deviceCapabilityTargeting"]) : undefined,
    deviceCategoryTargeting: data["deviceCategoryTargeting"] !== undefined ? serializeCriteriaTargeting(data["deviceCategoryTargeting"]) : undefined,
    operatingSystemTargeting: data["operatingSystemTargeting"] !== undefined ? serializeOperatingSystemTargeting(data["operatingSystemTargeting"]) : undefined,
  };
}

function deserializeTechnologyTargeting(data: any): TechnologyTargeting {
  return {
    ...data,
    deviceCapabilityTargeting: data["deviceCapabilityTargeting"] !== undefined ? deserializeCriteriaTargeting(data["deviceCapabilityTargeting"]) : undefined,
    deviceCategoryTargeting: data["deviceCategoryTargeting"] !== undefined ? deserializeCriteriaTargeting(data["deviceCategoryTargeting"]) : undefined,
    operatingSystemTargeting: data["operatingSystemTargeting"] !== undefined ? deserializeOperatingSystemTargeting(data["operatingSystemTargeting"]) : undefined,
  };
}

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
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
 * Request message for UnsubscribeAuctionPackage.
 */
export interface UnsubscribeAuctionPackageRequest {
}

/**
 * Request message for UnsubscribeAuctionPackage.
 */
export interface UnsubscribeClientsRequest {
  /**
   * Optional. A list of client buyers to unsubscribe from the auction package,
   * with client buyer in the format
   * `buyers/{accountId}/clients/{clientAccountId}`.
   */
  clients?: string[];
}

/**
 * Request message for updating the deal at the given revision number.
 */
export interface UpdateDealRequest {
  /**
   * Required. The deal to update. The deal's `name` field is used to identify
   * the deal to be updated. Note: proposal_revision will have to be provided
   * within the resource or else an error will be thrown. Format:
   * buyers/{accountId}/proposals/{proposalId}/deals/{dealId}
   */
  deal?: Deal;
  /**
   * List of fields to be updated. If empty or unspecified, the service will
   * update all fields populated in the update request excluding the output only
   * fields and primitive fields with default value. Note that explicit field
   * mask is required in order to reset a primitive field back to its default
   * value, for example, false for boolean fields, 0 for integer fields. A
   * special field mask consisting of a single path "*" can be used to indicate
   * full replacement(the equivalent of PUT method), updatable fields unset or
   * unspecified in the input will be cleared or set to default value. Output
   * only fields will be ignored regardless of the value of updateMask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateDealRequest(data: any): UpdateDealRequest {
  return {
    ...data,
    deal: data["deal"] !== undefined ? serializeDeal(data["deal"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateDealRequest(data: any): UpdateDealRequest {
  return {
    ...data,
    deal: data["deal"] !== undefined ? deserializeDeal(data["deal"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Represents a list of targeted and excluded URLs (for example, google.com).
 * For Private Auction Deals, URLs are either included or excluded. For
 * Programmatic Guaranteed and Preferred Deals, this doesn't apply.
 */
export interface UriTargeting {
  /**
   * A list of URLs to be excluded.
   */
  excludedUris?: string[];
  /**
   * A list of URLs to be included.
   */
  targetedUris?: string[];
}

/**
 * Represents targeting information about video.
 */
export interface VideoTargeting {
  /**
   * A list of video positions to be excluded. When this field is populated,
   * the targeted_position_types field must be empty.
   */
  excludedPositionTypes?:  | "POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL"[];
  /**
   * A list of video positions to be included. When this field is populated,
   * the excluded_position_types field must be empty.
   */
  targetedPositionTypes?:  | "POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL"[];
}