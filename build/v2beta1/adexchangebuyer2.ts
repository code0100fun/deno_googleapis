// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Ad Exchange Buyer API II Client for Deno
 * ========================================
 * 
 * Accesses the latest features for managing Authorized Buyers accounts, Real-Time Bidding configurations and auction metrics, and Marketplace programmatic deals.
 * 
 * Docs: https://developers.google.com/authorized-buyers/apis/reference/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Accesses the latest features for managing Authorized Buyers accounts,
 * Real-Time Bidding configurations and auction metrics, and Marketplace
 * programmatic deals.
 */
export class AdExchangeBuyer2 {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://adexchangebuyer.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new client buyer.
   *
   * @param accountId Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to create a client for. (required)
   */
  async accountsClientsCreate(accountId: bigint, req: Client): Promise<Client> {
    accountId = String(accountId);
    req = serializeClient(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeClient(data);
  }

  /**
   * Gets a client buyer with a given client account ID.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer to retrieve. (required)
   */
  async accountsClientsGet(accountId: bigint, clientAccountId: bigint): Promise<Client> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeClient(data);
  }

  /**
   * Creates and sends out an email invitation to access an Ad Exchange client
   * buyer account.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer that the user should be associated with. (required)
   */
  async accountsClientsInvitationsCreate(accountId: bigint, clientAccountId: bigint, req: ClientUserInvitation): Promise<ClientUserInvitation> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    req = serializeClientUserInvitation(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/invitations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeClientUserInvitation(data);
  }

  /**
   * Retrieves an existing client user invitation.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer that the user invitation to be retrieved is associated with. (required)
   * @param invitationId Numerical identifier of the user invitation to retrieve. (required)
   */
  async accountsClientsInvitationsGet(accountId: bigint, clientAccountId: bigint, invitationId: bigint): Promise<ClientUserInvitation> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    invitationId = String(invitationId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/invitations/${ invitationId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeClientUserInvitation(data);
  }

  /**
   * Lists all the client users invitations for a client with a given account
   * ID.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer to list invitations for. (required) You must either specify a string representation of a numerical account identifier or the `-` character to list all the invitations for all the clients of a given sponsor buyer.
   */
  async accountsClientsInvitationsList(accountId: bigint, clientAccountId: string, opts: AccountsClientsInvitationsListOptions = {}): Promise<ListClientUserInvitationsResponse> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/invitations`);
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
    return deserializeListClientUserInvitationsResponse(data);
  }

  /**
   * Lists all the clients for the current sponsor buyer.
   *
   * @param accountId Unique numerical account ID of the sponsor buyer to list the clients for.
   */
  async accountsClientsList(accountId: bigint, opts: AccountsClientsListOptions = {}): Promise<ListClientsResponse> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.partnerClientId !== undefined) {
      url.searchParams.append("partnerClientId", String(opts.partnerClientId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListClientsResponse(data);
  }

  /**
   * Updates an existing client buyer.
   *
   * @param accountId Unique numerical account ID for the buyer of which the client buyer is a customer; the sponsor buyer to update a client for. (required)
   * @param clientAccountId Unique numerical account ID of the client to update. (required)
   */
  async accountsClientsUpdate(accountId: bigint, clientAccountId: bigint, req: Client): Promise<Client> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    req = serializeClient(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeClient(data);
  }

  /**
   * Retrieves an existing client user.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer that the user to be retrieved is associated with. (required)
   * @param userId Numerical identifier of the user to retrieve. (required)
   */
  async accountsClientsUsersGet(accountId: bigint, clientAccountId: bigint, userId: bigint): Promise<ClientUser> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    userId = String(userId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeClientUser(data);
  }

  /**
   * Lists all the known client users for a specified sponsor buyer account ID.
   *
   * @param accountId Numerical account ID of the sponsor buyer of the client to list users for. (required)
   * @param clientAccountId The account ID of the client buyer to list users for. (required) You must specify either a string representation of a numerical account identifier or the `-` character to list all the client users for all the clients of a given sponsor buyer.
   */
  async accountsClientsUsersList(accountId: bigint, clientAccountId: string, opts: AccountsClientsUsersListOptions = {}): Promise<ListClientUsersResponse> {
    accountId = String(accountId);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/users`);
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
    return deserializeListClientUsersResponse(data);
  }

  /**
   * Updates an existing client user. Only the user status can be changed on
   * update.
   *
   * @param accountId Numerical account ID of the client's sponsor buyer. (required)
   * @param clientAccountId Numerical account ID of the client buyer that the user to be retrieved is associated with. (required)
   * @param userId Numerical identifier of the user to retrieve. (required)
   */
  async accountsClientsUsersUpdate(accountId: bigint, clientAccountId: bigint, userId: bigint, req: ClientUser): Promise<ClientUser> {
    accountId = String(accountId);
    clientAccountId = String(clientAccountId);
    userId = String(userId);
    req = serializeClientUser(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/clients/${ clientAccountId }/users/${ userId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeClientUser(data);
  }

  /**
   * Creates a creative.
   *
   * @param accountId The account that this creative belongs to. Can be used to filter the response of the creatives.list method.
   */
  async accountsCreativesCreate(accountId: string, req: Creative, opts: AccountsCreativesCreateOptions = {}): Promise<Creative> {
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives`);
    if (opts.duplicateIdMode !== undefined) {
      url.searchParams.append("duplicateIdMode", String(opts.duplicateIdMode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Associate an existing deal with a creative.
   *
   * @param accountId The account the creative belongs to.
   * @param creativeId The ID of the creative associated with the deal.
   */
  async accountsCreativesDealAssociationsAdd(accountId: string, creativeId: string, req: AddDealAssociationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }/dealAssociations:add`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * List all creative-deal associations.
   *
   * @param accountId The account to list the associations from. Specify "-" to list all creatives the current user has access to.
   * @param creativeId The creative ID to list the associations from. Specify "-" to list all creatives under the above account.
   */
  async accountsCreativesDealAssociationsList(accountId: string, creativeId: string, opts: AccountsCreativesDealAssociationsListOptions = {}): Promise<ListDealAssociationsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }/dealAssociations`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDealAssociationsResponse;
  }

  /**
   * Remove the association between a deal and a creative.
   *
   * @param accountId The account the creative belongs to.
   * @param creativeId The ID of the creative associated with the deal.
   */
  async accountsCreativesDealAssociationsRemove(accountId: string, creativeId: string, req: RemoveDealAssociationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }/dealAssociations:remove`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Gets a creative.
   *
   * @param accountId The account the creative belongs to.
   * @param creativeId The ID of the creative to retrieve.
   */
  async accountsCreativesGet(accountId: string, creativeId: string): Promise<Creative> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreative(data);
  }

  /**
   * Lists creatives.
   *
   * @param accountId The account to list the creatives from. Specify "-" to list all creatives the current user has access to.
   */
  async accountsCreativesList(accountId: string, opts: AccountsCreativesListOptions = {}): Promise<ListCreativesResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListCreativesResponse(data);
  }

  /**
   * Stops watching a creative. Will stop push notifications being sent to the
   * topics when the creative changes status.
   *
   * @param accountId The account of the creative to stop notifications for.
   * @param creativeId The creative ID of the creative to stop notifications for. Specify "-" to specify stopping account level notifications.
   */
  async accountsCreativesStopWatching(accountId: string, creativeId: string, req: StopWatchingCreativeRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }:stopWatching`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a creative.
   *
   * @param accountId The account that this creative belongs to. Can be used to filter the response of the creatives.list method.
   * @param creativeId The buyer-defined creative ID of this creative. Can be used to filter the response of the creatives.list method.
   */
  async accountsCreativesUpdate(accountId: string, creativeId: string, req: Creative): Promise<Creative> {
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Watches a creative. Will result in push notifications being sent to the
   * topic when the creative changes status.
   *
   * @param accountId The account of the creative to watch.
   * @param creativeId The creative ID to watch for status changes. Specify "-" to watch all creatives under the above account. If both creative-level and account-level notifications are sent, only a single notification will be sent to the creative-level notification topic.
   */
  async accountsCreativesWatch(accountId: string, creativeId: string, req: WatchCreativeRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/creatives/${ creativeId }:watch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * List finalized proposals, regardless if a proposal is being renegotiated.
   * A filter expression (PQL query) may be specified to filter the results. The
   * notes will not be returned.
   *
   * @param accountId Account ID of the buyer.
   */
  async accountsFinalizedProposalsList(accountId: string, opts: AccountsFinalizedProposalsListOptions = {}): Promise<ListProposalsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/finalizedProposals`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.filterSyntax !== undefined) {
      url.searchParams.append("filterSyntax", String(opts.filterSyntax));
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
    return deserializeListProposalsResponse(data);
  }

  /**
   * Update given deals to pause serving. This method will set the
   * `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to true for all
   * listed deals in the request. Currently, this method only applies to PG and
   * PD deals. For PA deals, call accounts.proposals.pause endpoint. It is a
   * no-op to pause already-paused deals. It is an error to call
   * PauseProposalDeals for deals which are not part of the proposal of
   * proposal_id or which are not finalized or renegotiating.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The proposal_id of the proposal containing the deals.
   */
  async accountsFinalizedProposalsPause(accountId: string, proposalId: string, req: PauseProposalDealsRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/finalizedProposals/${ proposalId }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Update given deals to resume serving. This method will set the
   * `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to false for all
   * listed deals in the request. Currently, this method only applies to PG and
   * PD deals. For PA deals, call accounts.proposals.resume endpoint. It is a
   * no-op to resume running deals or deals paused by the other party. It is an
   * error to call ResumeProposalDeals for deals which are not part of the
   * proposal of proposal_id or which are not finalized or renegotiating.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The proposal_id of the proposal containing the deals.
   */
  async accountsFinalizedProposalsResume(accountId: string, proposalId: string, req: ResumeProposalDealsRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/finalizedProposals/${ proposalId }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Gets the requested product by ID.
   *
   * @param accountId Account ID of the buyer.
   * @param productId The ID for the product to get the head revision for.
   */
  async accountsProductsGet(accountId: string, productId: string): Promise<Product> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/products/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProduct(data);
  }

  /**
   * List all products visible to the buyer (optionally filtered by the
   * specified PQL query).
   *
   * @param accountId Account ID of the buyer.
   */
  async accountsProductsList(accountId: string, opts: AccountsProductsListOptions = {}): Promise<ListProductsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/products`);
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
    return deserializeListProductsResponse(data);
  }

  /**
   * Mark the proposal as accepted at the given revision number. If the number
   * does not match the server's revision number an `ABORTED` error message will
   * be returned. This call updates the proposal_state from `PROPOSED` to
   * `BUYER_ACCEPTED`, or from `SELLER_ACCEPTED` to `FINALIZED`. Upon calling
   * this endpoint, the buyer implicitly agrees to the terms and conditions
   * optionally set within the proposal by the publisher.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to accept.
   */
  async accountsProposalsAccept(accountId: string, proposalId: string, req: AcceptProposalRequest): Promise<Proposal> {
    req = serializeAcceptProposalRequest(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:accept`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Create a new note and attach it to the proposal. The note is assigned a
   * unique ID by the server. The proposal revision number will not increase
   * when associated with a new note.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to attach the note to.
   */
  async accountsProposalsAddNote(accountId: string, proposalId: string, req: AddNoteRequest): Promise<Note> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:addNote`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Note;
  }

  /**
   * Cancel an ongoing negotiation on a proposal. This does not cancel or end
   * serving for the deals if the proposal has been finalized, but only cancels
   * a negotiation unilaterally.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to cancel negotiation for.
   */
  async accountsProposalsCancelNegotiation(accountId: string, proposalId: string, req: CancelNegotiationRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:cancelNegotiation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * You can opt-in to manually update proposals to indicate that setup is
   * complete. By default, proposal setup is automatically completed after their
   * deals are finalized. Contact your Technical Account Manager to opt in.
   * Buyers can call this method when the proposal has been finalized, and all
   * the required creatives have been uploaded using the Creatives API. This
   * call updates the `is_setup_completed` field on the deals in the proposal,
   * and notifies the seller. The server then advances the revision number of
   * the most recent proposal. To mark an individual deal as ready to serve,
   * call `buyers.finalizedDeals.setReadyToServe` in the Marketplace API.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to mark as setup completed.
   */
  async accountsProposalsCompleteSetup(accountId: string, proposalId: string, req: CompleteSetupRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:completeSetup`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Create the given proposal. Each created proposal and any deals it contains
   * are assigned a unique ID by the server.
   *
   * @param accountId Account ID of the buyer.
   */
  async accountsProposalsCreate(accountId: string, req: Proposal): Promise<Proposal> {
    req = serializeProposal(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Gets a proposal given its ID. The proposal is returned at its head
   * revision.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The unique ID of the proposal
   */
  async accountsProposalsGet(accountId: string, proposalId: string): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProposal(data);
  }

  /**
   * List proposals. A filter expression (PQL query) may be specified to filter
   * the results. To retrieve all finalized proposals, regardless if a proposal
   * is being renegotiated, see the FinalizedProposals resource. Note that
   * Bidder/ChildSeat relationships differ from the usual behavior. A Bidder
   * account can only see its child seats' proposals by specifying the
   * ChildSeat's accountId in the request path.
   *
   * @param accountId Account ID of the buyer.
   */
  async accountsProposalsList(accountId: string, opts: AccountsProposalsListOptions = {}): Promise<ListProposalsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.filterSyntax !== undefined) {
      url.searchParams.append("filterSyntax", String(opts.filterSyntax));
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
    return deserializeListProposalsResponse(data);
  }

  /**
   * Update the given proposal to pause serving. This method will set the
   * `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to true for all
   * deals in the proposal. It is a no-op to pause an already-paused proposal.
   * It is an error to call PauseProposal for a proposal that is not finalized
   * or renegotiating.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to pause.
   */
  async accountsProposalsPause(accountId: string, proposalId: string, req: PauseProposalRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Update the given proposal to resume serving. This method will set the
   * `DealServingMetadata.DealPauseStatus.has_buyer_paused` bit to false for all
   * deals in the proposal. Note that if the `has_seller_paused` bit is also
   * set, serving will not resume until the seller also resumes. It is a no-op
   * to resume an already-running proposal. It is an error to call
   * ResumeProposal for a proposal that is not finalized or renegotiating.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The ID of the proposal to resume.
   */
  async accountsProposalsResume(accountId: string, proposalId: string, req: ResumeProposalRequest): Promise<Proposal> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Update the given proposal at the client known revision number. If the
   * server revision has advanced since the passed-in
   * `proposal.proposal_revision`, an `ABORTED` error message will be returned.
   * Only the buyer-modifiable fields of the proposal will be updated. Note that
   * the deals in the proposal will be updated to match the passed-in copy. If a
   * passed-in deal does not have a `deal_id`, the server will assign a new
   * unique ID and create the deal. If passed-in deal has a `deal_id`, it will
   * be updated to match the passed-in copy. Any existing deals not present in
   * the passed-in proposal will be deleted. It is an error to pass in a deal
   * with a `deal_id` not present at head.
   *
   * @param accountId Account ID of the buyer.
   * @param proposalId The unique ID of the proposal.
   */
  async accountsProposalsUpdate(accountId: string, proposalId: string, req: Proposal): Promise<Proposal> {
    req = serializeProposal(req);
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/proposals/${ proposalId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeProposal(data);
  }

  /**
   * Gets the requested publisher profile by id.
   *
   * @param accountId Account ID of the buyer.
   * @param publisherProfileId The id for the publisher profile to get.
   */
  async accountsPublisherProfilesGet(accountId: string, publisherProfileId: string): Promise<PublisherProfile> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/publisherProfiles/${ publisherProfileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PublisherProfile;
  }

  /**
   * List all publisher profiles visible to the buyer
   *
   * @param accountId Account ID of the buyer.
   */
  async accountsPublisherProfilesList(accountId: string, opts: AccountsPublisherProfilesListOptions = {}): Promise<ListPublisherProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/accounts/${ accountId }/publisherProfiles`);
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

  /**
   * Lists all metrics that are measured in terms of number of bids.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsBidMetricsList(filterSetName: string, opts: BiddersAccountsFilterSetsBidMetricsListOptions = {}): Promise<ListBidMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidMetrics`);
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
    return deserializeListBidMetricsResponse(data);
  }

  /**
   * List all errors that occurred in bid responses, with the number of bid
   * responses affected for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsBidResponseErrorsList(filterSetName: string, opts: BiddersAccountsFilterSetsBidResponseErrorsListOptions = {}): Promise<ListBidResponseErrorsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidResponseErrors`);
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
    return deserializeListBidResponseErrorsResponse(data);
  }

  /**
   * List all reasons for which bid responses were considered to have no
   * applicable bids, with the number of bid responses affected for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsBidResponsesWithoutBidsList(filterSetName: string, opts: BiddersAccountsFilterSetsBidResponsesWithoutBidsListOptions = {}): Promise<ListBidResponsesWithoutBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidResponsesWithoutBids`);
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
    return deserializeListBidResponsesWithoutBidsResponse(data);
  }

  /**
   * Creates the specified filter set for the account with the given account
   * ID.
   *
   * @param ownerName Name of the owner (bidder or account) of the filter set to be created. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456`
   */
  async biddersAccountsFilterSetsCreate(ownerName: string, req: FilterSet, opts: BiddersAccountsFilterSetsCreateOptions = {}): Promise<FilterSet> {
    req = serializeFilterSet(req);
    const url = new URL(`${this.#baseUrl}v2beta1/${ ownerName }/filterSets`);
    if (opts.isTransient !== undefined) {
      url.searchParams.append("isTransient", String(opts.isTransient));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFilterSet(data);
  }

  /**
   * Deletes the requested filter set from the account with the given account
   * ID.
   *
   * @param name Full name of the resource to delete. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * List all reasons that caused a bid request not to be sent for an
   * impression, with the number of bid requests not sent for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsFilteredBidRequestsList(filterSetName: string, opts: BiddersAccountsFilterSetsFilteredBidRequestsListOptions = {}): Promise<ListFilteredBidRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBidRequests`);
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
    return deserializeListFilteredBidRequestsResponse(data);
  }

  /**
   * List all creatives associated with a specific reason for which bids were
   * filtered, with the number of bids filtered for each creative.
   *
   * @param creativeStatusId The ID of the creative status for which to retrieve a breakdown by creative. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes).
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsFilteredBidsCreativesList(creativeStatusId: number, filterSetName: string, opts: BiddersAccountsFilterSetsFilteredBidsCreativesListOptions = {}): Promise<ListCreativeStatusBreakdownByCreativeResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids/${ creativeStatusId }/creatives`);
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
    return deserializeListCreativeStatusBreakdownByCreativeResponse(data);
  }

  /**
   * List all details associated with a specific reason for which bids were
   * filtered, with the number of bids filtered for each detail.
   *
   * @param creativeStatusId The ID of the creative status for which to retrieve a breakdown by detail. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). Details are only available for statuses 10, 14, 15, 17, 18, 19, 86, and 87.
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsFilteredBidsDetailsList(creativeStatusId: number, filterSetName: string, opts: BiddersAccountsFilterSetsFilteredBidsDetailsListOptions = {}): Promise<ListCreativeStatusBreakdownByDetailResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids/${ creativeStatusId }/details`);
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
    return deserializeListCreativeStatusBreakdownByDetailResponse(data);
  }

  /**
   * List all reasons for which bids were filtered, with the number of bids
   * filtered for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsFilteredBidsList(filterSetName: string, opts: BiddersAccountsFilterSetsFilteredBidsListOptions = {}): Promise<ListFilteredBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids`);
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
    return deserializeListFilteredBidsResponse(data);
  }

  /**
   * Retrieves the requested filter set for the account with the given account
   * ID.
   *
   * @param name Full name of the resource being requested. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsGet(name: string): Promise<FilterSet> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFilterSet(data);
  }

  /**
   * Lists all metrics that are measured in terms of number of impressions.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsImpressionMetricsList(filterSetName: string, opts: BiddersAccountsFilterSetsImpressionMetricsListOptions = {}): Promise<ListImpressionMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/impressionMetrics`);
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
    return deserializeListImpressionMetricsResponse(data);
  }

  /**
   * Lists all filter sets for the account with the given account ID.
   *
   * @param ownerName Name of the owner (bidder or account) of the filter sets to be listed. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456`
   */
  async biddersAccountsFilterSetsList(ownerName: string, opts: BiddersAccountsFilterSetsListOptions = {}): Promise<ListFilterSetsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ ownerName }/filterSets`);
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
    return deserializeListFilterSetsResponse(data);
  }

  /**
   * List all reasons for which bids lost in the auction, with the number of
   * bids that lost for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsLosingBidsList(filterSetName: string, opts: BiddersAccountsFilterSetsLosingBidsListOptions = {}): Promise<ListLosingBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/losingBids`);
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
    return deserializeListLosingBidsResponse(data);
  }

  /**
   * List all reasons for which winning bids were not billable, with the number
   * of bids not billed for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersAccountsFilterSetsNonBillableWinningBidsList(filterSetName: string, opts: BiddersAccountsFilterSetsNonBillableWinningBidsListOptions = {}): Promise<ListNonBillableWinningBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/nonBillableWinningBids`);
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
    return deserializeListNonBillableWinningBidsResponse(data);
  }

  /**
   * Lists all metrics that are measured in terms of number of bids.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsBidMetricsList(filterSetName: string, opts: BiddersFilterSetsBidMetricsListOptions = {}): Promise<ListBidMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidMetrics`);
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
    return deserializeListBidMetricsResponse(data);
  }

  /**
   * List all errors that occurred in bid responses, with the number of bid
   * responses affected for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsBidResponseErrorsList(filterSetName: string, opts: BiddersFilterSetsBidResponseErrorsListOptions = {}): Promise<ListBidResponseErrorsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidResponseErrors`);
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
    return deserializeListBidResponseErrorsResponse(data);
  }

  /**
   * List all reasons for which bid responses were considered to have no
   * applicable bids, with the number of bid responses affected for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsBidResponsesWithoutBidsList(filterSetName: string, opts: BiddersFilterSetsBidResponsesWithoutBidsListOptions = {}): Promise<ListBidResponsesWithoutBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/bidResponsesWithoutBids`);
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
    return deserializeListBidResponsesWithoutBidsResponse(data);
  }

  /**
   * Creates the specified filter set for the account with the given account
   * ID.
   *
   * @param ownerName Name of the owner (bidder or account) of the filter set to be created. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456`
   */
  async biddersFilterSetsCreate(ownerName: string, req: FilterSet, opts: BiddersFilterSetsCreateOptions = {}): Promise<FilterSet> {
    req = serializeFilterSet(req);
    const url = new URL(`${this.#baseUrl}v2beta1/${ ownerName }/filterSets`);
    if (opts.isTransient !== undefined) {
      url.searchParams.append("isTransient", String(opts.isTransient));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFilterSet(data);
  }

  /**
   * Deletes the requested filter set from the account with the given account
   * ID.
   *
   * @param name Full name of the resource to delete. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * List all reasons that caused a bid request not to be sent for an
   * impression, with the number of bid requests not sent for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsFilteredBidRequestsList(filterSetName: string, opts: BiddersFilterSetsFilteredBidRequestsListOptions = {}): Promise<ListFilteredBidRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBidRequests`);
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
    return deserializeListFilteredBidRequestsResponse(data);
  }

  /**
   * List all creatives associated with a specific reason for which bids were
   * filtered, with the number of bids filtered for each creative.
   *
   * @param creativeStatusId The ID of the creative status for which to retrieve a breakdown by creative. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes).
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsFilteredBidsCreativesList(creativeStatusId: number, filterSetName: string, opts: BiddersFilterSetsFilteredBidsCreativesListOptions = {}): Promise<ListCreativeStatusBreakdownByCreativeResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids/${ creativeStatusId }/creatives`);
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
    return deserializeListCreativeStatusBreakdownByCreativeResponse(data);
  }

  /**
   * List all details associated with a specific reason for which bids were
   * filtered, with the number of bids filtered for each detail.
   *
   * @param creativeStatusId The ID of the creative status for which to retrieve a breakdown by detail. See [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes). Details are only available for statuses 10, 14, 15, 17, 18, 19, 86, and 87.
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsFilteredBidsDetailsList(creativeStatusId: number, filterSetName: string, opts: BiddersFilterSetsFilteredBidsDetailsListOptions = {}): Promise<ListCreativeStatusBreakdownByDetailResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids/${ creativeStatusId }/details`);
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
    return deserializeListCreativeStatusBreakdownByDetailResponse(data);
  }

  /**
   * List all reasons for which bids were filtered, with the number of bids
   * filtered for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsFilteredBidsList(filterSetName: string, opts: BiddersFilterSetsFilteredBidsListOptions = {}): Promise<ListFilteredBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/filteredBids`);
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
    return deserializeListFilteredBidsResponse(data);
  }

  /**
   * Retrieves the requested filter set for the account with the given account
   * ID.
   *
   * @param name Full name of the resource being requested. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsGet(name: string): Promise<FilterSet> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFilterSet(data);
  }

  /**
   * Lists all metrics that are measured in terms of number of impressions.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsImpressionMetricsList(filterSetName: string, opts: BiddersFilterSetsImpressionMetricsListOptions = {}): Promise<ListImpressionMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/impressionMetrics`);
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
    return deserializeListImpressionMetricsResponse(data);
  }

  /**
   * Lists all filter sets for the account with the given account ID.
   *
   * @param ownerName Name of the owner (bidder or account) of the filter sets to be listed. For example: - For a bidder-level filter set for bidder 123: `bidders/123` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456`
   */
  async biddersFilterSetsList(ownerName: string, opts: BiddersFilterSetsListOptions = {}): Promise<ListFilterSetsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ ownerName }/filterSets`);
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
    return deserializeListFilterSetsResponse(data);
  }

  /**
   * List all reasons for which bids lost in the auction, with the number of
   * bids that lost for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsLosingBidsList(filterSetName: string, opts: BiddersFilterSetsLosingBidsListOptions = {}): Promise<ListLosingBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/losingBids`);
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
    return deserializeListLosingBidsResponse(data);
  }

  /**
   * List all reasons for which winning bids were not billable, with the number
   * of bids not billed for each reason.
   *
   * @param filterSetName Name of the filter set that should be applied to the requested metrics. For example: - For a bidder-level filter set for bidder 123: `bidders/123/filterSets/abc` - For an account-level filter set for the buyer account representing bidder 123: `bidders/123/accounts/123/filterSets/abc` - For an account-level filter set for the child seat buyer account 456 whose bidder is 123: `bidders/123/accounts/456/filterSets/abc`
   */
  async biddersFilterSetsNonBillableWinningBidsList(filterSetName: string, opts: BiddersFilterSetsNonBillableWinningBidsListOptions = {}): Promise<ListNonBillableWinningBidsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta1/${ filterSetName }/nonBillableWinningBids`);
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
    return deserializeListNonBillableWinningBidsResponse(data);
  }
}

/**
 * An absolute date range, specified by its start date and end date. The
 * supported range of dates begins 30 days before today and ends today. Validity
 * checked upon filter set creation. If a filter set with an absolute date range
 * is run at a later date more than 30 days after start_date, it will fail.
 */
export interface AbsoluteDateRange {
  /**
   * The end date of the range (inclusive). Must be within the 30 days leading
   * up to current date, and must be equal to or after start_date.
   */
  endDate?: Date;
  /**
   * The start date of the range (inclusive). Must be within the 30 days
   * leading up to current date, and must be equal to or before end_date.
   */
  startDate?: Date;
}

/**
 * Request to accept a proposal.
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
 * Additional options for AdExchangeBuyer2#accountsClientsInvitationsList.
 */
export interface AccountsClientsInvitationsListOptions {
  /**
   * Requested page size. Server may return fewer clients than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListClientUserInvitationsResponse.nextPageToken
   * returned from the previous call to the clients.invitations.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsClientsList.
 */
export interface AccountsClientsListOptions {
  /**
   * Requested page size. The server may return fewer clients than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListClientsResponse.nextPageToken returned from the
   * previous call to the accounts.clients.list method.
   */
  pageToken?: string;
  /**
   * Optional unique identifier (from the standpoint of an Ad Exchange sponsor
   * buyer partner) of the client to return. If specified, at most one client
   * will be returned in the response.
   */
  partnerClientId?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsClientsUsersList.
 */
export interface AccountsClientsUsersListOptions {
  /**
   * Requested page size. The server may return fewer clients than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListClientUsersResponse.nextPageToken returned from
   * the previous call to the accounts.clients.users.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsCreativesCreate.
 */
export interface AccountsCreativesCreateOptions {
  /**
   * Indicates if multiple creatives can share an ID or not. Default is
   * NO_DUPLICATES (one ID per creative).
   */
  duplicateIdMode?:  | "NO_DUPLICATES" | "FORCE_ENABLE_DUPLICATE_IDS";
}

/**
 * Additional options for
 * AdExchangeBuyer2#accountsCreativesDealAssociationsList.
 */
export interface AccountsCreativesDealAssociationsListOptions {
  /**
   * Requested page size. Server may return fewer associations than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListDealAssociationsResponse.next_page_token returned
   * from the previous call to 'ListDealAssociations' method.
   */
  pageToken?: string;
  /**
   * An optional query string to filter deal associations. If no filter is
   * specified, all associations will be returned. Supported queries are: -
   * accountId=*account_id_string* - creativeId=*creative_id_string* -
   * dealsId=*deals_id_string* - dealsStatus:{approved, conditionally_approved,
   * disapproved, not_checked} - openAuctionStatus:{approved,
   * conditionally_approved, disapproved, not_checked} Example: 'dealsId=12345
   * AND dealsStatus:disapproved'
   */
  query?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsCreativesList.
 */
export interface AccountsCreativesListOptions {
  /**
   * Requested page size. The server may return fewer creatives than requested
   * (due to timeout constraint) even if more are available through another
   * call. If unspecified, server will pick an appropriate default. Acceptable
   * values are 1 to 1000, inclusive.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListCreativesResponse.next_page_token returned from
   * the previous call to 'ListCreatives' method.
   */
  pageToken?: string;
  /**
   * An optional query string to filter creatives. If no filter is specified,
   * all active creatives will be returned. Supported queries are: -
   * accountId=*account_id_string* - creativeId=*creative_id_string* -
   * dealsStatus: {approved, conditionally_approved, disapproved, not_checked} -
   * openAuctionStatus: {approved, conditionally_approved, disapproved,
   * not_checked} - attribute: {a numeric attribute from the list of attributes}
   * - disapprovalReason: {a reason from DisapprovalReason} Example:
   * 'accountId=12345 AND (dealsStatus:disapproved AND
   * disapprovalReason:unacceptable_content) OR attribute:47'
   */
  query?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsFinalizedProposalsList.
 */
export interface AccountsFinalizedProposalsListOptions {
  /**
   * An optional PQL filter query used to query for proposals. Nested repeated
   * fields, such as proposal.deals.targetingCriterion, cannot be filtered.
   */
  filter?: string;
  /**
   * Syntax the filter is written in. Current implementation defaults to PQL
   * but in the future it will be LIST_FILTER.
   */
  filterSyntax?:  | "FILTER_SYNTAX_UNSPECIFIED" | "PQL" | "LIST_FILTER";
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListProposalsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsProductsList.
 */
export interface AccountsProductsListOptions {
  /**
   * An optional PQL query used to query for products. See
   * https://developers.google.com/ad-manager/docs/pqlreference for
   * documentation about PQL and examples. Nested repeated fields, such as
   * product.targetingCriterion.inclusions, cannot be filtered.
   */
  filter?: string;
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListProductsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsProposalsList.
 */
export interface AccountsProposalsListOptions {
  /**
   * An optional PQL filter query used to query for proposals. Nested repeated
   * fields, such as proposal.deals.targetingCriterion, cannot be filtered.
   */
  filter?: string;
  /**
   * Syntax the filter is written in. Current implementation defaults to PQL
   * but in the future it will be LIST_FILTER.
   */
  filterSyntax?:  | "FILTER_SYNTAX_UNSPECIFIED" | "PQL" | "LIST_FILTER";
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The page token as returned from ListProposalsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#accountsPublisherProfilesList.
 */
export interface AccountsPublisherProfilesListOptions {
  /**
   * Specify the number of results to include per page.
   */
  pageSize?: number;
  /**
   * The page token as return from ListPublisherProfilesResponse.
   */
  pageToken?: string;
}

/**
 * A request for associating a deal and a creative.
 */
export interface AddDealAssociationRequest {
  /**
   * The association between a creative and a deal that should be added.
   */
  association?: CreativeDealAssociation;
}

/**
 * Request message for adding a note to a given proposal.
 */
export interface AddNoteRequest {
  /**
   * Details of the note to add.
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
   * The size type of the ad slot.
   */
  sizeType?:  | "SIZE_TYPE_UNSPECIFIED" | "PIXEL" | "INTERSTITIAL" | "NATIVE" | "FLUID";
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
 * Detected ad technology provider information.
 */
export interface AdTechnologyProviders {
  /**
   * The detected ad technology provider IDs for this creative. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for
   * mapping of provider ID to provided name, a privacy policy URL, and a list
   * of domains which can be attributed to the provider. If the creative
   * contains provider IDs that are outside of those listed in the
   * `BidRequest.adslot.consented_providers_settings.consented_providers` field
   * on the (Google bid
   * protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto]
   * and the
   * `BidRequest.user.ext.consented_providers_settings.consented_providers`
   * field on the (OpenRTB
   * protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto],
   * and a bid is submitted with that creative for an impression that will serve
   * to an EEA user, the bid will be filtered before the auction.
   */
  detectedProviderIds?: bigint[];
  /**
   * Whether the creative contains an unidentified ad technology provider. If
   * true for a given creative, any bid submitted with that creative for an
   * impression that will serve to an EEA user will be filtered before the
   * auction.
   */
  hasUnidentifiedProvider?: boolean;
}

function serializeAdTechnologyProviders(data: any): AdTechnologyProviders {
  return {
    ...data,
    detectedProviderIds: data["detectedProviderIds"] !== undefined ? data["detectedProviderIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeAdTechnologyProviders(data: any): AdTechnologyProviders {
  return {
    ...data,
    detectedProviderIds: data["detectedProviderIds"] !== undefined ? data["detectedProviderIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Output only. The app type the restriction applies to for mobile device.
 */
export interface AppContext {
  /**
   * The app types this restriction applies to.
   */
  appTypes?:  | "NATIVE" | "WEB"[];
}

/**
 * Output only. The auction type the restriction applies to.
 */
export interface AuctionContext {
  /**
   * The auction types this restriction applies to.
   */
  auctionTypes?:  | "OPEN_AUCTION" | "DIRECT_DEALS"[];
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsBidMetricsList.
 */
export interface BiddersAccountsFilterSetsBidMetricsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidMetricsResponse.nextPageToken returned from the
   * previous call to the bidMetrics.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsBidResponseErrorsList.
 */
export interface BiddersAccountsFilterSetsBidResponseErrorsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidResponseErrorsResponse.nextPageToken returned
   * from the previous call to the bidResponseErrors.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsBidResponsesWithoutBidsList.
 */
export interface BiddersAccountsFilterSetsBidResponsesWithoutBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidResponsesWithoutBidsResponse.nextPageToken
   * returned from the previous call to the bidResponsesWithoutBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersAccountsFilterSetsCreate.
 */
export interface BiddersAccountsFilterSetsCreateOptions {
  /**
   * Whether the filter set is transient, or should be persisted indefinitely.
   * By default, filter sets are not transient. If transient, it will be
   * available for at least 1 hour after creation.
   */
  isTransient?: boolean;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsFilteredBidRequestsList.
 */
export interface BiddersAccountsFilterSetsFilteredBidRequestsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilteredBidRequestsResponse.nextPageToken returned
   * from the previous call to the filteredBidRequests.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsFilteredBidsCreativesList.
 */
export interface BiddersAccountsFilterSetsFilteredBidsCreativesListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of
   * ListCreativeStatusBreakdownByCreativeResponse.nextPageToken returned from
   * the previous call to the filteredBids.creatives.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsFilteredBidsDetailsList.
 */
export interface BiddersAccountsFilterSetsFilteredBidsDetailsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of
   * ListCreativeStatusBreakdownByDetailResponse.nextPageToken returned from the
   * previous call to the filteredBids.details.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsFilteredBidsList.
 */
export interface BiddersAccountsFilterSetsFilteredBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilteredBidsResponse.nextPageToken returned from
   * the previous call to the filteredBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsImpressionMetricsList.
 */
export interface BiddersAccountsFilterSetsImpressionMetricsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListImpressionMetricsResponse.nextPageToken returned
   * from the previous call to the impressionMetrics.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersAccountsFilterSetsList.
 */
export interface BiddersAccountsFilterSetsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilterSetsResponse.nextPageToken returned from the
   * previous call to the accounts.filterSets.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsLosingBidsList.
 */
export interface BiddersAccountsFilterSetsLosingBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListLosingBidsResponse.nextPageToken returned from the
   * previous call to the losingBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersAccountsFilterSetsNonBillableWinningBidsList.
 */
export interface BiddersAccountsFilterSetsNonBillableWinningBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListNonBillableWinningBidsResponse.nextPageToken
   * returned from the previous call to the nonBillableWinningBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersFilterSetsBidMetricsList.
 */
export interface BiddersFilterSetsBidMetricsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidMetricsResponse.nextPageToken returned from the
   * previous call to the bidMetrics.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsBidResponseErrorsList.
 */
export interface BiddersFilterSetsBidResponseErrorsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidResponseErrorsResponse.nextPageToken returned
   * from the previous call to the bidResponseErrors.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsBidResponsesWithoutBidsList.
 */
export interface BiddersFilterSetsBidResponsesWithoutBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBidResponsesWithoutBidsResponse.nextPageToken
   * returned from the previous call to the bidResponsesWithoutBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersFilterSetsCreate.
 */
export interface BiddersFilterSetsCreateOptions {
  /**
   * Whether the filter set is transient, or should be persisted indefinitely.
   * By default, filter sets are not transient. If transient, it will be
   * available for at least 1 hour after creation.
   */
  isTransient?: boolean;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsFilteredBidRequestsList.
 */
export interface BiddersFilterSetsFilteredBidRequestsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilteredBidRequestsResponse.nextPageToken returned
   * from the previous call to the filteredBidRequests.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsFilteredBidsCreativesList.
 */
export interface BiddersFilterSetsFilteredBidsCreativesListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of
   * ListCreativeStatusBreakdownByCreativeResponse.nextPageToken returned from
   * the previous call to the filteredBids.creatives.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsFilteredBidsDetailsList.
 */
export interface BiddersFilterSetsFilteredBidsDetailsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of
   * ListCreativeStatusBreakdownByDetailResponse.nextPageToken returned from the
   * previous call to the filteredBids.details.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersFilterSetsFilteredBidsList.
 */
export interface BiddersFilterSetsFilteredBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilteredBidsResponse.nextPageToken returned from
   * the previous call to the filteredBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsImpressionMetricsList.
 */
export interface BiddersFilterSetsImpressionMetricsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListImpressionMetricsResponse.nextPageToken returned
   * from the previous call to the impressionMetrics.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersFilterSetsList.
 */
export interface BiddersFilterSetsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListFilterSetsResponse.nextPageToken returned from the
   * previous call to the accounts.filterSets.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for AdExchangeBuyer2#biddersFilterSetsLosingBidsList.
 */
export interface BiddersFilterSetsLosingBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListLosingBidsResponse.nextPageToken returned from the
   * previous call to the losingBids.list method.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AdExchangeBuyer2#biddersFilterSetsNonBillableWinningBidsList.
 */
export interface BiddersFilterSetsNonBillableWinningBidsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListNonBillableWinningBidsResponse.nextPageToken
   * returned from the previous call to the nonBillableWinningBids.list method.
   */
  pageToken?: string;
}

/**
 * The set of metrics that are measured in numbers of bids, representing how
 * many bids with the specified dimension values were considered eligible at
 * each stage of the bidding funnel;
 */
export interface BidMetricsRow {
  /**
   * The number of bids that Ad Exchange received from the buyer.
   */
  bids?: MetricValue;
  /**
   * The number of bids that were permitted to compete in the auction.
   */
  bidsInAuction?: MetricValue;
  /**
   * The number of bids for which the buyer was billed.
   */
  billedImpressions?: MetricValue;
  /**
   * The number of bids that won the auction.
   */
  impressionsWon?: MetricValue;
  /**
   * The number of bids for which the corresponding impression was measurable
   * for viewability (as defined by Active View).
   */
  measurableImpressions?: MetricValue;
  /**
   * The number of bids that won the auction and also won the mediation
   * waterfall (if any).
   */
  reachedQueries?: MetricValue;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
  /**
   * The number of bids for which the corresponding impression was viewable (as
   * defined by Active View).
   */
  viewableImpressions?: MetricValue;
}

function serializeBidMetricsRow(data: any): BidMetricsRow {
  return {
    ...data,
    bids: data["bids"] !== undefined ? serializeMetricValue(data["bids"]) : undefined,
    bidsInAuction: data["bidsInAuction"] !== undefined ? serializeMetricValue(data["bidsInAuction"]) : undefined,
    billedImpressions: data["billedImpressions"] !== undefined ? serializeMetricValue(data["billedImpressions"]) : undefined,
    impressionsWon: data["impressionsWon"] !== undefined ? serializeMetricValue(data["impressionsWon"]) : undefined,
    measurableImpressions: data["measurableImpressions"] !== undefined ? serializeMetricValue(data["measurableImpressions"]) : undefined,
    reachedQueries: data["reachedQueries"] !== undefined ? serializeMetricValue(data["reachedQueries"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
    viewableImpressions: data["viewableImpressions"] !== undefined ? serializeMetricValue(data["viewableImpressions"]) : undefined,
  };
}

function deserializeBidMetricsRow(data: any): BidMetricsRow {
  return {
    ...data,
    bids: data["bids"] !== undefined ? deserializeMetricValue(data["bids"]) : undefined,
    bidsInAuction: data["bidsInAuction"] !== undefined ? deserializeMetricValue(data["bidsInAuction"]) : undefined,
    billedImpressions: data["billedImpressions"] !== undefined ? deserializeMetricValue(data["billedImpressions"]) : undefined,
    impressionsWon: data["impressionsWon"] !== undefined ? deserializeMetricValue(data["impressionsWon"]) : undefined,
    measurableImpressions: data["measurableImpressions"] !== undefined ? deserializeMetricValue(data["measurableImpressions"]) : undefined,
    reachedQueries: data["reachedQueries"] !== undefined ? deserializeMetricValue(data["reachedQueries"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
    viewableImpressions: data["viewableImpressions"] !== undefined ? deserializeMetricValue(data["viewableImpressions"]) : undefined,
  };
}

/**
 * The number of impressions with the specified dimension values that were
 * considered to have no applicable bids, as described by the specified status.
 */
export interface BidResponseWithoutBidsStatusRow {
  /**
   * The number of impressions for which there was a bid response with the
   * specified status.
   */
  impressionCount?: MetricValue;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
  /**
   * The status specifying why the bid responses were considered to have no
   * applicable bids.
   */
  status?:  | "STATUS_UNSPECIFIED" | "RESPONSES_WITHOUT_BIDS" | "RESPONSES_WITHOUT_BIDS_FOR_ACCOUNT" | "RESPONSES_WITHOUT_BIDS_FOR_DEAL";
}

function serializeBidResponseWithoutBidsStatusRow(data: any): BidResponseWithoutBidsStatusRow {
  return {
    ...data,
    impressionCount: data["impressionCount"] !== undefined ? serializeMetricValue(data["impressionCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeBidResponseWithoutBidsStatusRow(data: any): BidResponseWithoutBidsStatusRow {
  return {
    ...data,
    impressionCount: data["impressionCount"] !== undefined ? deserializeMetricValue(data["impressionCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * Represents a buyer of inventory. Each buyer is identified by a unique
 * Authorized Buyers account ID.
 */
export interface Buyer {
  /**
   * Authorized Buyers account ID of the buyer.
   */
  accountId?: string;
}

/**
 * The number of impressions with the specified dimension values where the
 * corresponding bid request or bid response was not successful, as described by
 * the specified callout status.
 */
export interface CalloutStatusRow {
  /**
   * The ID of the callout status. See
   * [callout-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/callout-status-codes).
   */
  calloutStatusId?: number;
  /**
   * The number of impressions for which there was a bid request or bid
   * response with the specified callout status.
   */
  impressionCount?: MetricValue;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
}

function serializeCalloutStatusRow(data: any): CalloutStatusRow {
  return {
    ...data,
    impressionCount: data["impressionCount"] !== undefined ? serializeMetricValue(data["impressionCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeCalloutStatusRow(data: any): CalloutStatusRow {
  return {
    ...data,
    impressionCount: data["impressionCount"] !== undefined ? deserializeMetricValue(data["impressionCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * Request to cancel an ongoing negotiation.
 */
export interface CancelNegotiationRequest {
}

/**
 * A client resource represents a client buyer—an agency, a brand, or an
 * advertiser customer of the sponsor buyer. Users associated with the client
 * buyer have restricted access to the Marketplace and certain other sections of
 * the Authorized Buyers UI based on the role granted to the client buyer. All
 * fields are required unless otherwise specified.
 */
export interface Client {
  /**
   * The globally-unique numerical ID of the client. The value of this field is
   * ignored in create and update operations.
   */
  clientAccountId?: bigint;
  /**
   * Name used to represent this client to publishers. You may have multiple
   * clients that map to the same entity, but for each client the combination of
   * `clientName` and entity must be unique. You can specify this field as
   * empty. Maximum length of 255 characters is allowed.
   */
  clientName?: string;
  /**
   * Numerical identifier of the client entity. The entity can be an
   * advertiser, a brand, or an agency. This identifier is unique among all the
   * entities with the same type. The value of this field is ignored if the
   * entity type is not provided. A list of all known advertisers with their
   * identifiers is available in the
   * [advertisers.txt](https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt)
   * file. A list of all known brands with their identifiers is available in the
   * [brands.txt](https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt)
   * file. A list of all known agencies with their identifiers is available in
   * the
   * [agencies.txt](https://storage.googleapis.com/adx-rtb-dictionaries/agencies.txt)
   * file.
   */
  entityId?: bigint;
  /**
   * The name of the entity. This field is automatically fetched based on the
   * type and ID. The value of this field is ignored in create and update
   * operations.
   */
  entityName?: string;
  /**
   * An optional field for specifying the type of the client entity:
   * `ADVERTISER`, `BRAND`, or `AGENCY`.
   */
  entityType?:  | "ENTITY_TYPE_UNSPECIFIED" | "ADVERTISER" | "BRAND" | "AGENCY" | "ENTITY_TYPE_UNCLASSIFIED";
  /**
   * Optional arbitrary unique identifier of this client buyer from the
   * standpoint of its Ad Exchange sponsor buyer. This field can be used to
   * associate a client buyer with the identifier in the namespace of its
   * sponsor buyer, lookup client buyers by that identifier and verify whether
   * an Ad Exchange counterpart of a given client buyer already exists. If
   * present, must be unique among all the client buyers for its Ad Exchange
   * sponsor buyer.
   */
  partnerClientId?: string;
  /**
   * The role which is assigned to the client buyer. Each role implies a set of
   * permissions granted to the client. Must be one of `CLIENT_DEAL_VIEWER`,
   * `CLIENT_DEAL_NEGOTIATOR` or `CLIENT_DEAL_APPROVER`.
   */
  role?:  | "CLIENT_ROLE_UNSPECIFIED" | "CLIENT_DEAL_VIEWER" | "CLIENT_DEAL_NEGOTIATOR" | "CLIENT_DEAL_APPROVER";
  /**
   * The status of the client buyer.
   */
  status?:  | "CLIENT_STATUS_UNSPECIFIED" | "DISABLED" | "ACTIVE";
  /**
   * Whether the client buyer will be visible to sellers.
   */
  visibleToSeller?: boolean;
}

function serializeClient(data: any): Client {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? String(data["clientAccountId"]) : undefined,
    entityId: data["entityId"] !== undefined ? String(data["entityId"]) : undefined,
  };
}

function deserializeClient(data: any): Client {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? BigInt(data["clientAccountId"]) : undefined,
    entityId: data["entityId"] !== undefined ? BigInt(data["entityId"]) : undefined,
  };
}

/**
 * A client user is created under a client buyer and has restricted access to
 * the Marketplace and certain other sections of the Authorized Buyers UI based
 * on the role granted to the associated client buyer. The only way a new client
 * user can be created is through accepting an email invitation (see the
 * accounts.clients.invitations.create method). All fields are required unless
 * otherwise specified.
 */
export interface ClientUser {
  /**
   * Numerical account ID of the client buyer with which the user is
   * associated; the buyer must be a client of the current sponsor buyer. The
   * value of this field is ignored in an update operation.
   */
  clientAccountId?: bigint;
  /**
   * User's email address. The value of this field is ignored in an update
   * operation.
   */
  email?: string;
  /**
   * The status of the client user.
   */
  status?:  | "USER_STATUS_UNSPECIFIED" | "PENDING" | "ACTIVE" | "DISABLED";
  /**
   * The unique numerical ID of the client user that has accepted an
   * invitation. The value of this field is ignored in an update operation.
   */
  userId?: bigint;
}

function serializeClientUser(data: any): ClientUser {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? String(data["clientAccountId"]) : undefined,
    userId: data["userId"] !== undefined ? String(data["userId"]) : undefined,
  };
}

function deserializeClientUser(data: any): ClientUser {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? BigInt(data["clientAccountId"]) : undefined,
    userId: data["userId"] !== undefined ? BigInt(data["userId"]) : undefined,
  };
}

/**
 * An invitation for a new client user to get access to the Authorized Buyers
 * UI. All fields are required unless otherwise specified.
 */
export interface ClientUserInvitation {
  /**
   * Numerical account ID of the client buyer that the invited user is
   * associated with. The value of this field is ignored in create operations.
   */
  clientAccountId?: bigint;
  /**
   * The email address to which the invitation is sent. Email addresses should
   * be unique among all client users under each sponsor buyer.
   */
  email?: string;
  /**
   * The unique numerical ID of the invitation that is sent to the user. The
   * value of this field is ignored in create operations.
   */
  invitationId?: bigint;
}

function serializeClientUserInvitation(data: any): ClientUserInvitation {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? String(data["clientAccountId"]) : undefined,
    invitationId: data["invitationId"] !== undefined ? String(data["invitationId"]) : undefined,
  };
}

function deserializeClientUserInvitation(data: any): ClientUserInvitation {
  return {
    ...data,
    clientAccountId: data["clientAccountId"] !== undefined ? BigInt(data["clientAccountId"]) : undefined,
    invitationId: data["invitationId"] !== undefined ? BigInt(data["invitationId"]) : undefined,
  };
}

/**
 * Request message for indicating that the proposal's setup step is complete.
 */
export interface CompleteSetupRequest {
}

/**
 * Contains information on how a buyer or seller can be reached.
 */
export interface ContactInformation {
  /**
   * Email address for the contact.
   */
  email?: string;
  /**
   * The name of the contact.
   */
  name?: string;
}

/**
 * Output only. Shows any corrections that were applied to this creative.
 */
export interface Correction {
  /**
   * The contexts for the correction.
   */
  contexts?: ServingContext[];
  /**
   * Additional details about what was corrected.
   */
  details?: string[];
  /**
   * The type of correction that was applied to the creative.
   */
  type?:  | "CORRECTION_TYPE_UNSPECIFIED" | "VENDOR_IDS_ADDED" | "SSL_ATTRIBUTE_REMOVED" | "FLASH_FREE_ATTRIBUTE_REMOVED" | "FLASH_FREE_ATTRIBUTE_ADDED" | "REQUIRED_ATTRIBUTE_ADDED" | "REQUIRED_VENDOR_ADDED" | "SSL_ATTRIBUTE_ADDED" | "IN_BANNER_VIDEO_ATTRIBUTE_ADDED" | "MRAID_ATTRIBUTE_ADDED" | "FLASH_ATTRIBUTE_REMOVED" | "VIDEO_IN_SNIPPET_ATTRIBUTE_ADDED";
}

/**
 * A creative and its classification data.
 */
export interface Creative {
  /**
   * The account that this creative belongs to. Can be used to filter the
   * response of the creatives.list method.
   */
  accountId?: string;
  /**
   * The link to AdChoices destination page.
   */
  adChoicesDestinationUrl?: string;
  /**
   * Output only. The detected ad technology providers.
   */
  adTechnologyProviders?: AdTechnologyProviders;
  /**
   * The name of the company being advertised in the creative.
   */
  advertiserName?: string;
  /**
   * The agency ID for this creative.
   */
  agencyId?: bigint;
  /**
   * Output only. The last update timestamp of the creative through the API.
   */
  apiUpdateTime?: Date;
  /**
   * All attributes for the ads that may be shown from this creative. Can be
   * used to filter the response of the creatives.list method.
   */
  attributes?:  | "ATTRIBUTE_UNSPECIFIED" | "IMAGE_RICH_MEDIA" | "ADOBE_FLASH_FLV" | "IS_TAGGED" | "IS_COOKIE_TARGETED" | "IS_USER_INTEREST_TARGETED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_LEFT" | "EXPANDING_DIRECTION_UP_RIGHT" | "EXPANDING_DIRECTION_DOWN_LEFT" | "EXPANDING_DIRECTION_DOWN_RIGHT" | "CREATIVE_TYPE_HTML" | "CREATIVE_TYPE_VAST_VIDEO" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL" | "EXPANDING_ACTION_ROLLOVER_TO_EXPAND" | "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_MRAID" | "RICH_MEDIA_CAPABILITY_TYPE_FLASH" | "RICH_MEDIA_CAPABILITY_TYPE_HTML5" | "SKIPPABLE_INSTREAM_VIDEO" | "RICH_MEDIA_CAPABILITY_TYPE_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL" | "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL" | "NON_SKIPPABLE_INSTREAM_VIDEO" | "NATIVE_ELIGIBILITY_ELIGIBLE" | "NON_VPAID" | "NATIVE_ELIGIBILITY_NOT_ELIGIBLE" | "ANY_INTERSTITIAL" | "NON_INTERSTITIAL" | "IN_BANNER_VIDEO" | "RENDERING_SIZELESS_ADX" | "OMSDK_1_0"[];
  /**
   * The set of destination URLs for the creative.
   */
  clickThroughUrls?: string[];
  /**
   * Output only. Shows any corrections that were applied to this creative.
   */
  corrections?: Correction[];
  /**
   * The buyer-defined creative ID of this creative. Can be used to filter the
   * response of the creatives.list method.
   */
  creativeId?: string;
  /**
   * Output only. The top-level deals status of this creative. If disapproved,
   * an entry for 'auctionType=DIRECT_DEALS' (or 'ALL') in serving_restrictions
   * will also exist. Note that this may be nuanced with other contextual
   * restrictions, in which case, it may be preferable to read from
   * serving_restrictions directly. Can be used to filter the response of the
   * creatives.list method.
   */
  dealsStatus?:  | "STATUS_UNSPECIFIED" | "NOT_CHECKED" | "CONDITIONALLY_APPROVED" | "APPROVED" | "DISAPPROVED" | "PENDING_REVIEW" | "STATUS_TYPE_UNSPECIFIED";
  /**
   * The set of declared destination URLs for the creative.
   */
  declaredClickThroughUrls?: string[];
  /**
   * Output only. Detected advertiser IDs, if any.
   */
  detectedAdvertiserIds?: bigint[];
  /**
   * Output only. The detected domains for this creative.
   */
  detectedDomains?: string[];
  /**
   * Output only. The detected languages for this creative. The order is
   * arbitrary. The codes are 2 or 5 characters and are documented at
   * https://developers.google.com/adwords/api/docs/appendix/languagecodes.
   */
  detectedLanguages?: string[];
  /**
   * Output only. Detected product categories, if any. See the
   * ad-product-categories.txt file in the technical documentation for a list of
   * IDs.
   */
  detectedProductCategories?: number[];
  /**
   * Output only. Detected sensitive categories, if any. See the
   * ad-sensitive-categories.txt file in the technical documentation for a list
   * of IDs. You should use these IDs along with the excluded-sensitive-category
   * field in the bid request to filter your bids.
   */
  detectedSensitiveCategories?: number[];
  /**
   * An HTML creative.
   */
  html?: HtmlContent;
  /**
   * The set of URLs to be called to record an impression.
   */
  impressionTrackingUrls?: string[];
  /**
   * A native creative.
   */
  native?: NativeContent;
  /**
   * Output only. The top-level open auction status of this creative. If
   * disapproved, an entry for 'auctionType = OPEN_AUCTION' (or 'ALL') in
   * serving_restrictions will also exist. Note that this may be nuanced with
   * other contextual restrictions, in which case, it may be preferable to read
   * from serving_restrictions directly. Can be used to filter the response of
   * the creatives.list method.
   */
  openAuctionStatus?:  | "STATUS_UNSPECIFIED" | "NOT_CHECKED" | "CONDITIONALLY_APPROVED" | "APPROVED" | "DISAPPROVED" | "PENDING_REVIEW" | "STATUS_TYPE_UNSPECIFIED";
  /**
   * All restricted categories for the ads that may be shown from this
   * creative.
   */
  restrictedCategories?:  | "NO_RESTRICTED_CATEGORIES" | "ALCOHOL"[];
  /**
   * Output only. The granular status of this ad in specific contexts. A
   * context here relates to where something ultimately serves (for example, a
   * physical location, a platform, an HTTPS versus HTTP request, or the type of
   * auction).
   */
  servingRestrictions?: ServingRestriction[];
  /**
   * All vendor IDs for the ads that may be shown from this creative. See
   * https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for
   * possible values.
   */
  vendorIds?: number[];
  /**
   * Output only. The version of this creative.
   */
  version?: number;
  /**
   * A video creative.
   */
  video?: VideoContent;
}

function serializeCreative(data: any): Creative {
  return {
    ...data,
    adTechnologyProviders: data["adTechnologyProviders"] !== undefined ? serializeAdTechnologyProviders(data["adTechnologyProviders"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? String(data["agencyId"]) : undefined,
    apiUpdateTime: data["apiUpdateTime"] !== undefined ? data["apiUpdateTime"].toISOString() : undefined,
    detectedAdvertiserIds: data["detectedAdvertiserIds"] !== undefined ? data["detectedAdvertiserIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCreative(data: any): Creative {
  return {
    ...data,
    adTechnologyProviders: data["adTechnologyProviders"] !== undefined ? deserializeAdTechnologyProviders(data["adTechnologyProviders"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? BigInt(data["agencyId"]) : undefined,
    apiUpdateTime: data["apiUpdateTime"] !== undefined ? new Date(data["apiUpdateTime"]) : undefined,
    detectedAdvertiserIds: data["detectedAdvertiserIds"] !== undefined ? data["detectedAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * The association between a creative and a deal.
 */
export interface CreativeDealAssociation {
  /**
   * The account the creative belongs to.
   */
  accountId?: string;
  /**
   * The ID of the creative associated with the deal.
   */
  creativeId?: string;
  /**
   * The externalDealId for the deal associated with the creative.
   */
  dealsId?: string;
}

/**
 * Represents creative restrictions associated to Programmatic Guaranteed/
 * Preferred Deal in Ad Manager. This doesn't apply to Private Auction and AdX
 * Preferred Deals.
 */
export interface CreativeRestrictions {
  /**
   * The format of the environment that the creatives will be displayed in.
   */
  creativeFormat?:  | "CREATIVE_FORMAT_UNSPECIFIED" | "DISPLAY" | "VIDEO";
  creativeSpecifications?: CreativeSpecification[];
  /**
   * Skippable video ads allow viewers to skip ads after 5 seconds.
   */
  skippableAdType?:  | "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "SKIPPABLE" | "INSTREAM_SELECT" | "NOT_SKIPPABLE";
}

function serializeCreativeRestrictions(data: any): CreativeRestrictions {
  return {
    ...data,
    creativeSpecifications: data["creativeSpecifications"] !== undefined ? data["creativeSpecifications"].map((item: any) => (serializeCreativeSpecification(item))) : undefined,
  };
}

function deserializeCreativeRestrictions(data: any): CreativeRestrictions {
  return {
    ...data,
    creativeSpecifications: data["creativeSpecifications"] !== undefined ? data["creativeSpecifications"].map((item: any) => (deserializeCreativeSpecification(item))) : undefined,
  };
}

/**
 * Specifies the size of the creative.
 */
export interface CreativeSize {
  /**
   * What formats are allowed by the publisher. If this repeated field is empty
   * then all formats are allowed. For example, if this field contains
   * AllowedFormatType.AUDIO then the publisher only allows an audio ad (without
   * any video).
   */
  allowedFormats?:  | "UNKNOWN" | "AUDIO"[];
  /**
   * For video creatives specifies the sizes of companion ads (if present).
   * Companion sizes may be filled in only when creative_size_type = VIDEO
   */
  companionSizes?: Size[];
  /**
   * The creative size type.
   */
  creativeSizeType?:  | "CREATIVE_SIZE_TYPE_UNSPECIFIED" | "REGULAR" | "INTERSTITIAL" | "VIDEO" | "NATIVE";
  /**
   * Output only. The native template for this creative. It will have a value
   * only if creative_size_type = CreativeSizeType.NATIVE.
   */
  nativeTemplate?:  | "UNKNOWN_NATIVE_TEMPLATE" | "NATIVE_CONTENT_AD" | "NATIVE_APP_INSTALL_AD" | "NATIVE_VIDEO_CONTENT_AD" | "NATIVE_VIDEO_APP_INSTALL_AD";
  /**
   * For regular or video creative size type, specifies the size of the
   * creative
   */
  size?: Size;
  /**
   * The type of skippable ad for this creative. It will have a value only if
   * creative_size_type = CreativeSizeType.VIDEO.
   */
  skippableAdType?:  | "SKIPPABLE_AD_TYPE_UNSPECIFIED" | "GENERIC" | "INSTREAM_SELECT" | "NOT_SKIPPABLE";
}

/**
 * Represents information for a creative that is associated with a Programmatic
 * Guaranteed/Preferred Deal in Ad Manager.
 */
export interface CreativeSpecification {
  /**
   * Companion sizes may be filled in only when this is a video creative.
   */
  creativeCompanionSizes?: AdSize[];
  /**
   * The size of the creative.
   */
  creativeSize?: AdSize;
}

function serializeCreativeSpecification(data: any): CreativeSpecification {
  return {
    ...data,
    creativeCompanionSizes: data["creativeCompanionSizes"] !== undefined ? data["creativeCompanionSizes"].map((item: any) => (serializeAdSize(item))) : undefined,
    creativeSize: data["creativeSize"] !== undefined ? serializeAdSize(data["creativeSize"]) : undefined,
  };
}

function deserializeCreativeSpecification(data: any): CreativeSpecification {
  return {
    ...data,
    creativeCompanionSizes: data["creativeCompanionSizes"] !== undefined ? data["creativeCompanionSizes"].map((item: any) => (deserializeAdSize(item))) : undefined,
    creativeSize: data["creativeSize"] !== undefined ? deserializeAdSize(data["creativeSize"]) : undefined,
  };
}

/**
 * The number of bids with the specified dimension values that did not win the
 * auction (either were filtered pre-auction or lost the auction), as described
 * by the specified creative status.
 */
export interface CreativeStatusRow {
  /**
   * The number of bids with the specified status.
   */
  bidCount?: MetricValue;
  /**
   * The ID of the creative status. See
   * [creative-status-codes](https://developers.google.com/authorized-buyers/rtb/downloads/creative-status-codes).
   */
  creativeStatusId?: number;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
}

function serializeCreativeStatusRow(data: any): CreativeStatusRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? serializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeCreativeStatusRow(data: any): CreativeStatusRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? deserializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * Generic targeting used for targeting dimensions that contains a list of
 * included and excluded numeric IDs.
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
 * Daypart targeting message that specifies if the ad can be shown only during
 * certain parts of a day/week.
 */
export interface DayPart {
  /**
   * The day of the week to target. If unspecified, applicable to all days.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * The ending time of the day for the ad to show (minute level granularity).
   * The end time is exclusive. This field is not available for filtering in PQL
   * queries.
   */
  endTime?: TimeOfDay;
  /**
   * The starting time of day for the ad to show (minute level granularity).
   * The start time is inclusive. This field is not available for filtering in
   * PQL queries.
   */
  startTime?: TimeOfDay;
}

/**
 * Specifies the day part targeting criteria.
 */
export interface DayPartTargeting {
  /**
   * A list of day part targeting criterion.
   */
  dayParts?: DayPart[];
  /**
   * The timezone to use for interpreting the day part targeting.
   */
  timeZoneType?:  | "TIME_ZONE_SOURCE_UNSPECIFIED" | "PUBLISHER" | "USER";
}

/**
 * A deal represents a segment of inventory for displaying ads on. A proposal
 * can contain multiple deals. A deal contains the terms and targeting
 * information that is used for serving.
 */
export interface Deal {
  /**
   * Proposed flight end time of the deal. This will generally be stored in a
   * granularity of a second. A value is not required for Private Auction deals
   * or Preferred Deals.
   */
  availableEndTime?: Date;
  /**
   * Optional. Proposed flight start time of the deal. This will generally be
   * stored in the granularity of one second since deal serving starts at
   * seconds boundary. Any time specified with more granularity (for example, in
   * milliseconds) will be truncated towards the start of time in seconds.
   */
  availableStartTime?: Date;
  /**
   * Buyer private data (hidden from seller).
   */
  buyerPrivateData?: PrivateData;
  /**
   * The product ID from which this deal was created. Note: This field may be
   * set only when creating the resource. Modifying this field while updating
   * the resource will result in an error.
   */
  createProductId?: string;
  /**
   * Optional. Revision number of the product that the deal was created from.
   * If present on create, and the server `product_revision` has advanced since
   * the passed-in `create_product_revision`, an `ABORTED` error will be
   * returned. Note: This field may be set only when creating the resource.
   * Modifying this field while updating the resource will result in an error.
   */
  createProductRevision?: bigint;
  /**
   * Output only. The time of the deal creation.
   */
  readonly createTime?: Date;
  /**
   * Output only. Specifies the creative pre-approval policy.
   */
  readonly creativePreApprovalPolicy?:  | "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED" | "SELLER_PRE_APPROVAL_REQUIRED" | "SELLER_PRE_APPROVAL_NOT_REQUIRED";
  /**
   * Output only. Restricitions about the creatives associated with the deal
   * (for example, size) This is available for Programmatic Guaranteed/Preferred
   * Deals in Ad Manager.
   */
  readonly creativeRestrictions?: CreativeRestrictions;
  /**
   * Output only. Specifies whether the creative is safeFrame compatible.
   */
  readonly creativeSafeFrameCompatibility?:  | "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED" | "COMPATIBLE" | "INCOMPATIBLE";
  /**
   * Output only. A unique deal ID for the deal (server-assigned).
   */
  readonly dealId?: string;
  /**
   * Output only. Metadata about the serving status of this deal.
   */
  readonly dealServingMetadata?: DealServingMetadata;
  /**
   * The negotiable terms of the deal.
   */
  dealTerms?: DealTerms;
  /**
   * The set of fields around delivery control that are interesting for a buyer
   * to see but are non-negotiable. These are set by the publisher.
   */
  deliveryControl?: DeliveryControl;
  /**
   * Description for the deal terms.
   */
  description?: string;
  /**
   * The name of the deal.
   */
  displayName?: string;
  /**
   * Output only. The external deal ID assigned to this deal once the deal is
   * finalized. This is the deal ID that shows up in serving/reporting etc.
   */
  readonly externalDealId?: string;
  /**
   * Output only. True, if the buyside inventory setup is complete for this
   * deal.
   */
  readonly isSetupComplete?: boolean;
  /**
   * Output only. Specifies the creative source for programmatic deals.
   * PUBLISHER means creative is provided by seller and ADVERTISER means
   * creative is provided by buyer.
   */
  readonly programmaticCreativeSource?:  | "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED" | "ADVERTISER" | "PUBLISHER";
  /**
   * Output only. ID of the proposal that this deal is part of.
   */
  readonly proposalId?: string;
  /**
   * Output only. Seller contact information for the deal.
   */
  readonly sellerContacts?: ContactInformation[];
  /**
   * The syndication product associated with the deal. Note: This field may be
   * set only when creating the resource. Modifying this field while updating
   * the resource will result in an error.
   */
  syndicationProduct?:  | "SYNDICATION_PRODUCT_UNSPECIFIED" | "CONTENT" | "MOBILE" | "VIDEO" | "GAMES";
  /**
   * Output only. Specifies the subset of inventory targeted by the deal.
   */
  readonly targeting?: MarketplaceTargeting;
  /**
   * The shared targeting visible to buyers and sellers. Each shared targeting
   * entity is AND'd together.
   */
  targetingCriterion?: TargetingCriteria[];
  /**
   * Output only. The time when the deal was last updated.
   */
  readonly updateTime?: Date;
  /**
   * The web property code for the seller copied over from the product.
   */
  webPropertyCode?: string;
}

function serializeDeal(data: any): Deal {
  return {
    ...data,
    availableEndTime: data["availableEndTime"] !== undefined ? data["availableEndTime"].toISOString() : undefined,
    availableStartTime: data["availableStartTime"] !== undefined ? data["availableStartTime"].toISOString() : undefined,
    createProductRevision: data["createProductRevision"] !== undefined ? String(data["createProductRevision"]) : undefined,
    dealTerms: data["dealTerms"] !== undefined ? serializeDealTerms(data["dealTerms"]) : undefined,
    targetingCriterion: data["targetingCriterion"] !== undefined ? data["targetingCriterion"].map((item: any) => (serializeTargetingCriteria(item))) : undefined,
  };
}

function deserializeDeal(data: any): Deal {
  return {
    ...data,
    availableEndTime: data["availableEndTime"] !== undefined ? new Date(data["availableEndTime"]) : undefined,
    availableStartTime: data["availableStartTime"] !== undefined ? new Date(data["availableStartTime"]) : undefined,
    createProductRevision: data["createProductRevision"] !== undefined ? BigInt(data["createProductRevision"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    creativeRestrictions: data["creativeRestrictions"] !== undefined ? deserializeCreativeRestrictions(data["creativeRestrictions"]) : undefined,
    dealTerms: data["dealTerms"] !== undefined ? deserializeDealTerms(data["dealTerms"]) : undefined,
    targeting: data["targeting"] !== undefined ? deserializeMarketplaceTargeting(data["targeting"]) : undefined,
    targetingCriterion: data["targetingCriterion"] !== undefined ? data["targetingCriterion"].map((item: any) => (deserializeTargetingCriteria(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Tracks which parties (if any) have paused a deal. The deal is considered
 * paused if either hasBuyerPaused or hasSellPaused is true.
 */
export interface DealPauseStatus {
  /**
   * The buyer's reason for pausing, if the buyer paused the deal.
   */
  buyerPauseReason?: string;
  /**
   * The role of the person who first paused this deal.
   */
  firstPausedBy?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * True, if the buyer has paused the deal unilaterally.
   */
  hasBuyerPaused?: boolean;
  /**
   * True, if the seller has paused the deal unilaterally.
   */
  hasSellerPaused?: boolean;
  /**
   * The seller's reason for pausing, if the seller paused the deal.
   */
  sellerPauseReason?: string;
}

/**
 * Message captures metadata about the serving status of a deal.
 */
export interface DealServingMetadata {
  /**
   * Output only. Tracks which parties (if any) have paused a deal.
   */
  readonly dealPauseStatus?: DealPauseStatus;
}

/**
 * The deal terms specify the details of a Product/deal. They specify things
 * like price per buyer, the type of pricing model (for example, fixed price,
 * auction) and expected impressions from the publisher.
 */
export interface DealTerms {
  /**
   * Visibility of the URL in bid requests. (default: BRANDED)
   */
  brandingType?:  | "BRANDING_TYPE_UNSPECIFIED" | "BRANDED" | "SEMI_TRANSPARENT";
  /**
   * Publisher provided description for the terms.
   */
  description?: string;
  /**
   * Non-binding estimate of the estimated gross spend for this deal. Can be
   * set by buyer or seller.
   */
  estimatedGrossSpend?: Price;
  /**
   * Non-binding estimate of the impressions served per day. Can be set by
   * buyer or seller.
   */
  estimatedImpressionsPerDay?: bigint;
  /**
   * The terms for guaranteed fixed price deals.
   */
  guaranteedFixedPriceTerms?: GuaranteedFixedPriceTerms;
  /**
   * The terms for non-guaranteed auction deals.
   */
  nonGuaranteedAuctionTerms?: NonGuaranteedAuctionTerms;
  /**
   * The terms for non-guaranteed fixed price deals.
   */
  nonGuaranteedFixedPriceTerms?: NonGuaranteedFixedPriceTerms;
  /**
   * The time zone name. For deals with Cost Per Day billing, defines the time
   * zone used to mark the boundaries of a day. It should be an IANA TZ name,
   * such as "America/Los_Angeles". For more information, see
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
   */
  sellerTimeZone?: string;
}

function serializeDealTerms(data: any): DealTerms {
  return {
    ...data,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? serializePrice(data["estimatedGrossSpend"]) : undefined,
    estimatedImpressionsPerDay: data["estimatedImpressionsPerDay"] !== undefined ? String(data["estimatedImpressionsPerDay"]) : undefined,
    guaranteedFixedPriceTerms: data["guaranteedFixedPriceTerms"] !== undefined ? serializeGuaranteedFixedPriceTerms(data["guaranteedFixedPriceTerms"]) : undefined,
    nonGuaranteedAuctionTerms: data["nonGuaranteedAuctionTerms"] !== undefined ? serializeNonGuaranteedAuctionTerms(data["nonGuaranteedAuctionTerms"]) : undefined,
    nonGuaranteedFixedPriceTerms: data["nonGuaranteedFixedPriceTerms"] !== undefined ? serializeNonGuaranteedFixedPriceTerms(data["nonGuaranteedFixedPriceTerms"]) : undefined,
  };
}

function deserializeDealTerms(data: any): DealTerms {
  return {
    ...data,
    estimatedGrossSpend: data["estimatedGrossSpend"] !== undefined ? deserializePrice(data["estimatedGrossSpend"]) : undefined,
    estimatedImpressionsPerDay: data["estimatedImpressionsPerDay"] !== undefined ? BigInt(data["estimatedImpressionsPerDay"]) : undefined,
    guaranteedFixedPriceTerms: data["guaranteedFixedPriceTerms"] !== undefined ? deserializeGuaranteedFixedPriceTerms(data["guaranteedFixedPriceTerms"]) : undefined,
    nonGuaranteedAuctionTerms: data["nonGuaranteedAuctionTerms"] !== undefined ? deserializeNonGuaranteedAuctionTerms(data["nonGuaranteedAuctionTerms"]) : undefined,
    nonGuaranteedFixedPriceTerms: data["nonGuaranteedFixedPriceTerms"] !== undefined ? deserializeNonGuaranteedFixedPriceTerms(data["nonGuaranteedFixedPriceTerms"]) : undefined,
  };
}

/**
 * Message contains details about how the deals will be paced.
 */
export interface DeliveryControl {
  /**
   * Output only. Specified the creative blocking levels to be applied.
   */
  readonly creativeBlockingLevel?:  | "CREATIVE_BLOCKING_LEVEL_UNSPECIFIED" | "PUBLISHER_BLOCKING_RULES" | "ADX_POLICY_BLOCKING_ONLY";
  /**
   * Output only. Specifies how the impression delivery will be paced.
   */
  readonly deliveryRateType?:  | "DELIVERY_RATE_TYPE_UNSPECIFIED" | "EVENLY" | "FRONT_LOADED" | "AS_FAST_AS_POSSIBLE";
  /**
   * Output only. Specifies any frequency caps.
   */
  readonly frequencyCaps?: FrequencyCap[];
}

/**
 * Output only. The reason and details for a disapproval.
 */
export interface Disapproval {
  /**
   * Additional details about the reason for disapproval.
   */
  details?: string[];
  /**
   * The categorized reason for disapproval.
   */
  reason?:  | "LENGTH_OF_IMAGE_ANIMATION" | "BROKEN_URL" | "MEDIA_NOT_FUNCTIONAL" | "INVALID_FOURTH_PARTY_CALL" | "INCORRECT_REMARKETING_DECLARATION" | "LANDING_PAGE_ERROR" | "AD_SIZE_DOES_NOT_MATCH_AD_SLOT" | "NO_BORDER" | "FOURTH_PARTY_BROWSER_COOKIES" | "LSO_OBJECTS" | "BLANK_CREATIVE" | "DESTINATION_URLS_UNDECLARED" | "PROBLEM_WITH_CLICK_MACRO" | "INCORRECT_AD_TECHNOLOGY_DECLARATION" | "INCORRECT_DESTINATION_URL_DECLARATION" | "EXPANDABLE_INCORRECT_DIRECTION" | "EXPANDABLE_DIRECTION_NOT_SUPPORTED" | "EXPANDABLE_INVALID_VENDOR" | "EXPANDABLE_FUNCTIONALITY" | "VIDEO_INVALID_VENDOR" | "VIDEO_UNSUPPORTED_LENGTH" | "VIDEO_UNSUPPORTED_FORMAT" | "VIDEO_FUNCTIONALITY" | "LANDING_PAGE_DISABLED" | "MALWARE_SUSPECTED" | "ADULT_IMAGE_OR_VIDEO" | "INACCURATE_AD_TEXT" | "COUNTERFEIT_DESIGNER_GOODS" | "POP_UP" | "INVALID_RTB_PROTOCOL_USAGE" | "RAW_IP_ADDRESS_IN_SNIPPET" | "UNACCEPTABLE_CONTENT_SOFTWARE" | "UNAUTHORIZED_COOKIE_ON_GOOGLE_DOMAIN" | "UNDECLARED_FLASH_OBJECTS" | "INVALID_SSL_DECLARATION" | "DIRECT_DOWNLOAD_IN_AD" | "MAXIMUM_DOWNLOAD_SIZE_EXCEEDED" | "DESTINATION_URL_SITE_NOT_CRAWLABLE" | "BAD_URL_LEGAL_DISAPPROVAL" | "PHARMA_GAMBLING_ALCOHOL_NOT_ALLOWED" | "DYNAMIC_DNS_AT_DESTINATION_URL" | "POOR_IMAGE_OR_VIDEO_QUALITY" | "UNACCEPTABLE_IMAGE_CONTENT" | "INCORRECT_IMAGE_LAYOUT" | "IRRELEVANT_IMAGE_OR_VIDEO" | "DESTINATION_SITE_DOES_NOT_ALLOW_GOING_BACK" | "MISLEADING_CLAIMS_IN_AD" | "RESTRICTED_PRODUCTS" | "UNACCEPTABLE_CONTENT" | "AUTOMATED_AD_CLICKING" | "INVALID_URL_PROTOCOL" | "UNDECLARED_RESTRICTED_CONTENT" | "INVALID_REMARKETING_LIST_USAGE" | "DESTINATION_SITE_NOT_CRAWLABLE_ROBOTS_TXT" | "CLICK_TO_DOWNLOAD_NOT_AN_APP" | "INACCURATE_REVIEW_EXTENSION" | "SEXUALLY_EXPLICIT_CONTENT" | "GAINING_AN_UNFAIR_ADVANTAGE" | "GAMING_THE_GOOGLE_NETWORK" | "DANGEROUS_PRODUCTS_KNIVES" | "DANGEROUS_PRODUCTS_EXPLOSIVES" | "DANGEROUS_PRODUCTS_GUNS" | "DANGEROUS_PRODUCTS_DRUGS" | "DANGEROUS_PRODUCTS_TOBACCO" | "DANGEROUS_PRODUCTS_WEAPONS" | "UNCLEAR_OR_IRRELEVANT_AD" | "PROFESSIONAL_STANDARDS" | "DYSFUNCTIONAL_PROMOTION" | "INVALID_INTEREST_BASED_AD" | "MISUSE_OF_PERSONAL_INFORMATION" | "OMISSION_OF_RELEVANT_INFORMATION" | "UNAVAILABLE_PROMOTIONS" | "MISLEADING_PROMOTIONS" | "INAPPROPRIATE_CONTENT" | "SENSITIVE_EVENTS" | "SHOCKING_CONTENT" | "ENABLING_DISHONEST_BEHAVIOR" | "TECHNICAL_REQUIREMENTS" | "RESTRICTED_POLITICAL_CONTENT" | "UNSUPPORTED_CONTENT" | "INVALID_BIDDING_METHOD" | "VIDEO_TOO_LONG" | "VIOLATES_JAPANESE_PHARMACY_LAW" | "UNACCREDITED_PET_PHARMACY" | "ABORTION" | "CONTRACEPTIVES" | "NEED_CERTIFICATES_TO_ADVERTISE_IN_CHINA" | "KCDSP_REGISTRATION" | "NOT_FAMILY_SAFE" | "CLINICAL_TRIAL_RECRUITMENT" | "MAXIMUM_NUMBER_OF_HTTP_CALLS_EXCEEDED" | "MAXIMUM_NUMBER_OF_COOKIES_EXCEEDED" | "PERSONAL_LOANS" | "UNSUPPORTED_FLASH_CONTENT" | "MISUSE_BY_OMID_SCRIPT" | "NON_WHITELISTED_OMID_VENDOR" | "DESTINATION_EXPERIENCE" | "UNSUPPORTED_LANGUAGE" | "NON_SSL_COMPLIANT" | "TEMPORARY_PAUSE" | "BAIL_BONDS" | "EXPERIMENTAL_MEDICAL_TREATMENT";
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
 * The number of filtered bids with the specified dimension values that have
 * the specified creative.
 */
export interface FilteredBidCreativeRow {
  /**
   * The number of bids with the specified creative.
   */
  bidCount?: MetricValue;
  /**
   * The ID of the creative.
   */
  creativeId?: string;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
}

function serializeFilteredBidCreativeRow(data: any): FilteredBidCreativeRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? serializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeFilteredBidCreativeRow(data: any): FilteredBidCreativeRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? deserializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * The number of filtered bids with the specified dimension values, among those
 * filtered due to the requested filtering reason (for example, creative
 * status), that have the specified detail.
 */
export interface FilteredBidDetailRow {
  /**
   * The number of bids with the specified detail.
   */
  bidCount?: MetricValue;
  /**
   * The ID of the detail, can be numeric or text. The associated value can be
   * looked up in the dictionary file corresponding to the DetailType in the
   * response message.
   */
  detail?: string;
  /**
   * Note: this field will be deprecated, use "detail" field instead. When
   * "detail" field represents an integer value, this field is populated as the
   * same integer value "detail" field represents, otherwise this field will be
   * 0. The ID of the detail. The associated value can be looked up in the
   * dictionary file corresponding to the DetailType in the response message.
   */
  detailId?: number;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
}

function serializeFilteredBidDetailRow(data: any): FilteredBidDetailRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? serializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeFilteredBidDetailRow(data: any): FilteredBidDetailRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? deserializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * A set of filters that is applied to a request for data. Within a filter set,
 * an AND operation is performed across the filters represented by each field.
 * An OR operation is performed across the filters represented by the multiple
 * values of a repeated field, for example, "format=VIDEO AND deal_id=12 AND
 * (seller_network_id=34 OR seller_network_id=56)".
 */
export interface FilterSet {
  /**
   * An absolute date range, defined by a start date and an end date.
   * Interpreted relative to Pacific time zone.
   */
  absoluteDateRange?: AbsoluteDateRange;
  /**
   * The set of dimensions along which to break down the response; may be
   * empty. If multiple dimensions are requested, the breakdown is along the
   * Cartesian product of the requested dimensions.
   */
  breakdownDimensions?:  | "BREAKDOWN_DIMENSION_UNSPECIFIED" | "PUBLISHER_IDENTIFIER"[];
  /**
   * The ID of the creative on which to filter; optional. This field may be set
   * only for a filter set that accesses account-level troubleshooting data, for
   * example, one whose name matches the `bidders/*\/accounts/*\/filterSets/*`
   * pattern.
   */
  creativeId?: string;
  /**
   * The ID of the deal on which to filter; optional. This field may be set
   * only for a filter set that accesses account-level troubleshooting data, for
   * example, one whose name matches the `bidders/*\/accounts/*\/filterSets/*`
   * pattern.
   */
  dealId?: bigint;
  /**
   * The environment on which to filter; optional.
   */
  environment?:  | "ENVIRONMENT_UNSPECIFIED" | "WEB" | "APP";
  /**
   * Creative format bidded on or allowed to bid on, can be empty.
   */
  format?:  | "FORMAT_UNSPECIFIED" | "NATIVE_DISPLAY" | "NATIVE_VIDEO" | "NON_NATIVE_DISPLAY" | "NON_NATIVE_VIDEO";
  /**
   * Creative formats bidded on or allowed to bid on, can be empty. Although
   * this field is a list, it can only be populated with a single item. A HTTP
   * 400 bad request error will be returned in the response if you specify
   * multiple items.
   */
  formats?:  | "FORMAT_UNSPECIFIED" | "NATIVE_DISPLAY" | "NATIVE_VIDEO" | "NON_NATIVE_DISPLAY" | "NON_NATIVE_VIDEO"[];
  /**
   * A user-defined name of the filter set. Filter set names must be unique
   * globally and match one of the patterns: - `bidders/*\/filterSets/*` (for
   * accessing bidder-level troubleshooting data) -
   * `bidders/*\/accounts/*\/filterSets/*` (for accessing account-level
   * troubleshooting data) This field is required in create operations.
   */
  name?: string;
  /**
   * The list of platforms on which to filter; may be empty. The filters
   * represented by multiple platforms are ORed together (for example, if
   * non-empty, results must match any one of the platforms).
   */
  platforms?:  | "PLATFORM_UNSPECIFIED" | "DESKTOP" | "TABLET" | "MOBILE"[];
  /**
   * For Open Bidding partners only. The list of publisher identifiers on which
   * to filter; may be empty. The filters represented by multiple publisher
   * identifiers are ORed together.
   */
  publisherIdentifiers?: string[];
  /**
   * An open-ended realtime time range, defined by the aggregation start
   * timestamp.
   */
  realtimeTimeRange?: RealtimeTimeRange;
  /**
   * A relative date range, defined by an offset from today and a duration.
   * Interpreted relative to Pacific time zone.
   */
  relativeDateRange?: RelativeDateRange;
  /**
   * For Authorized Buyers only. The list of IDs of the seller (publisher)
   * networks on which to filter; may be empty. The filters represented by
   * multiple seller network IDs are ORed together (for example, if non-empty,
   * results must match any one of the publisher networks). See
   * [seller-network-ids](https://developers.google.com/authorized-buyers/rtb/downloads/seller-network-ids)
   * file for the set of existing seller network IDs.
   */
  sellerNetworkIds?: number[];
  /**
   * The granularity of time intervals if a time series breakdown is preferred;
   * optional.
   */
  timeSeriesGranularity?:  | "TIME_SERIES_GRANULARITY_UNSPECIFIED" | "HOURLY" | "DAILY";
}

function serializeFilterSet(data: any): FilterSet {
  return {
    ...data,
    dealId: data["dealId"] !== undefined ? String(data["dealId"]) : undefined,
    realtimeTimeRange: data["realtimeTimeRange"] !== undefined ? serializeRealtimeTimeRange(data["realtimeTimeRange"]) : undefined,
  };
}

function deserializeFilterSet(data: any): FilterSet {
  return {
    ...data,
    dealId: data["dealId"] !== undefined ? BigInt(data["dealId"]) : undefined,
    realtimeTimeRange: data["realtimeTimeRange"] !== undefined ? deserializeRealtimeTimeRange(data["realtimeTimeRange"]) : undefined,
  };
}

/**
 * Represents a list of targeted and excluded mobile application IDs that
 * publishers own. Mobile application IDs are from App Store and Google Play
 * Store. Android App ID, for example, com.google.android.apps.maps, can be
 * found in Google Play Store URL. iOS App ID (which is a number) can be found
 * at the end of iTunes store URL. First party mobile applications is either
 * included or excluded.
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
 * Frequency cap.
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
  numTimeUnits?: number;
  /**
   * The time unit. Along with num_time_units defines the amount of time over
   * which impressions per user are counted and capped.
   */
  timeUnitType?:  | "TIME_UNIT_TYPE_UNSPECIFIED" | "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "LIFETIME" | "POD" | "STREAM";
}

/**
 * Terms for Programmatic Guaranteed Deals.
 */
export interface GuaranteedFixedPriceTerms {
  /**
   * Fixed price for the specified buyer.
   */
  fixedPrices?: PricePerBuyer[];
  /**
   * Guaranteed impressions as a percentage. This is the percentage of
   * guaranteed looks that the buyer is guaranteeing to buy.
   */
  guaranteedImpressions?: bigint;
  /**
   * Count of guaranteed looks. Required for deal, optional for product.
   */
  guaranteedLooks?: bigint;
  /**
   * The lifetime impression cap for CPM sponsorship deals. The deal will stop
   * serving when the cap is reached.
   */
  impressionCap?: bigint;
  /**
   * Daily minimum looks for CPD deal types.
   */
  minimumDailyLooks?: bigint;
  /**
   * For sponsorship deals, this is the percentage of the seller's eligible
   * impressions that the deal will serve until the cap is reached.
   */
  percentShareOfVoice?: bigint;
  /**
   * The reservation type for a Programmatic Guaranteed deal. This indicates
   * whether the number of impressions is fixed, or a percent of available
   * impressions. If not specified, the default reservation type is STANDARD.
   */
  reservationType?:  | "RESERVATION_TYPE_UNSPECIFIED" | "STANDARD" | "SPONSORSHIP";
}

function serializeGuaranteedFixedPriceTerms(data: any): GuaranteedFixedPriceTerms {
  return {
    ...data,
    fixedPrices: data["fixedPrices"] !== undefined ? data["fixedPrices"].map((item: any) => (serializePricePerBuyer(item))) : undefined,
    guaranteedImpressions: data["guaranteedImpressions"] !== undefined ? String(data["guaranteedImpressions"]) : undefined,
    guaranteedLooks: data["guaranteedLooks"] !== undefined ? String(data["guaranteedLooks"]) : undefined,
    impressionCap: data["impressionCap"] !== undefined ? String(data["impressionCap"]) : undefined,
    minimumDailyLooks: data["minimumDailyLooks"] !== undefined ? String(data["minimumDailyLooks"]) : undefined,
    percentShareOfVoice: data["percentShareOfVoice"] !== undefined ? String(data["percentShareOfVoice"]) : undefined,
  };
}

function deserializeGuaranteedFixedPriceTerms(data: any): GuaranteedFixedPriceTerms {
  return {
    ...data,
    fixedPrices: data["fixedPrices"] !== undefined ? data["fixedPrices"].map((item: any) => (deserializePricePerBuyer(item))) : undefined,
    guaranteedImpressions: data["guaranteedImpressions"] !== undefined ? BigInt(data["guaranteedImpressions"]) : undefined,
    guaranteedLooks: data["guaranteedLooks"] !== undefined ? BigInt(data["guaranteedLooks"]) : undefined,
    impressionCap: data["impressionCap"] !== undefined ? BigInt(data["impressionCap"]) : undefined,
    minimumDailyLooks: data["minimumDailyLooks"] !== undefined ? BigInt(data["minimumDailyLooks"]) : undefined,
    percentShareOfVoice: data["percentShareOfVoice"] !== undefined ? BigInt(data["percentShareOfVoice"]) : undefined,
  };
}

/**
 * HTML content for a creative.
 */
export interface HtmlContent {
  /**
   * The height of the HTML snippet in pixels.
   */
  height?: number;
  /**
   * The HTML snippet that displays the ad when inserted in the web page.
   */
  snippet?: string;
  /**
   * The width of the HTML snippet in pixels.
   */
  width?: number;
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
 * The set of metrics that are measured in numbers of impressions, representing
 * how many impressions with the specified dimension values were considered
 * eligible at each stage of the bidding funnel.
 */
export interface ImpressionMetricsRow {
  /**
   * The number of impressions available to the buyer on Ad Exchange. In some
   * cases this value may be unavailable.
   */
  availableImpressions?: MetricValue;
  /**
   * The number of impressions for which Ad Exchange sent the buyer a bid
   * request.
   */
  bidRequests?: MetricValue;
  /**
   * The number of impressions that match the buyer's inventory pretargeting.
   */
  inventoryMatches?: MetricValue;
  /**
   * The number of impressions for which Ad Exchange received a response from
   * the buyer that contained at least one applicable bid.
   */
  responsesWithBids?: MetricValue;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
  /**
   * The number of impressions for which the buyer successfully sent a response
   * to Ad Exchange.
   */
  successfulResponses?: MetricValue;
}

function serializeImpressionMetricsRow(data: any): ImpressionMetricsRow {
  return {
    ...data,
    availableImpressions: data["availableImpressions"] !== undefined ? serializeMetricValue(data["availableImpressions"]) : undefined,
    bidRequests: data["bidRequests"] !== undefined ? serializeMetricValue(data["bidRequests"]) : undefined,
    inventoryMatches: data["inventoryMatches"] !== undefined ? serializeMetricValue(data["inventoryMatches"]) : undefined,
    responsesWithBids: data["responsesWithBids"] !== undefined ? serializeMetricValue(data["responsesWithBids"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
    successfulResponses: data["successfulResponses"] !== undefined ? serializeMetricValue(data["successfulResponses"]) : undefined,
  };
}

function deserializeImpressionMetricsRow(data: any): ImpressionMetricsRow {
  return {
    ...data,
    availableImpressions: data["availableImpressions"] !== undefined ? deserializeMetricValue(data["availableImpressions"]) : undefined,
    bidRequests: data["bidRequests"] !== undefined ? deserializeMetricValue(data["bidRequests"]) : undefined,
    inventoryMatches: data["inventoryMatches"] !== undefined ? deserializeMetricValue(data["inventoryMatches"]) : undefined,
    responsesWithBids: data["responsesWithBids"] !== undefined ? deserializeMetricValue(data["responsesWithBids"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
    successfulResponses: data["successfulResponses"] !== undefined ? deserializeMetricValue(data["successfulResponses"]) : undefined,
  };
}

/**
 * Represents the size of an ad unit that can be targeted on an ad request. It
 * only applies to Private Auction, AdX Preferred Deals and Auction Packages.
 * This targeting does not apply to Programmatic Guaranteed and Preferred Deals
 * in Ad Manager.
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
 * Response message for listing the metrics that are measured in number of
 * bids.
 */
export interface ListBidMetricsResponse {
  /**
   * List of rows, each containing a set of bid metrics.
   */
  bidMetricsRows?: BidMetricsRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListBidMetricsRequest.pageToken field in the subsequent call to the
   * bidMetrics.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListBidMetricsResponse(data: any): ListBidMetricsResponse {
  return {
    ...data,
    bidMetricsRows: data["bidMetricsRows"] !== undefined ? data["bidMetricsRows"].map((item: any) => (serializeBidMetricsRow(item))) : undefined,
  };
}

function deserializeListBidMetricsResponse(data: any): ListBidMetricsResponse {
  return {
    ...data,
    bidMetricsRows: data["bidMetricsRows"] !== undefined ? data["bidMetricsRows"].map((item: any) => (deserializeBidMetricsRow(item))) : undefined,
  };
}

/**
 * Response message for listing all reasons that bid responses resulted in an
 * error.
 */
export interface ListBidResponseErrorsResponse {
  /**
   * List of rows, with counts of bid responses aggregated by callout status.
   */
  calloutStatusRows?: CalloutStatusRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListBidResponseErrorsRequest.pageToken field in the subsequent call to the
   * bidResponseErrors.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListBidResponseErrorsResponse(data: any): ListBidResponseErrorsResponse {
  return {
    ...data,
    calloutStatusRows: data["calloutStatusRows"] !== undefined ? data["calloutStatusRows"].map((item: any) => (serializeCalloutStatusRow(item))) : undefined,
  };
}

function deserializeListBidResponseErrorsResponse(data: any): ListBidResponseErrorsResponse {
  return {
    ...data,
    calloutStatusRows: data["calloutStatusRows"] !== undefined ? data["calloutStatusRows"].map((item: any) => (deserializeCalloutStatusRow(item))) : undefined,
  };
}

/**
 * Response message for listing all reasons that bid responses were considered
 * to have no applicable bids.
 */
export interface ListBidResponsesWithoutBidsResponse {
  /**
   * List of rows, with counts of bid responses without bids aggregated by
   * status.
   */
  bidResponseWithoutBidsStatusRows?: BidResponseWithoutBidsStatusRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListBidResponsesWithoutBidsRequest.pageToken field in the subsequent call
   * to the bidResponsesWithoutBids.list method to retrieve the next page of
   * results.
   */
  nextPageToken?: string;
}

function serializeListBidResponsesWithoutBidsResponse(data: any): ListBidResponsesWithoutBidsResponse {
  return {
    ...data,
    bidResponseWithoutBidsStatusRows: data["bidResponseWithoutBidsStatusRows"] !== undefined ? data["bidResponseWithoutBidsStatusRows"].map((item: any) => (serializeBidResponseWithoutBidsStatusRow(item))) : undefined,
  };
}

function deserializeListBidResponsesWithoutBidsResponse(data: any): ListBidResponsesWithoutBidsResponse {
  return {
    ...data,
    bidResponseWithoutBidsStatusRows: data["bidResponseWithoutBidsStatusRows"] !== undefined ? data["bidResponseWithoutBidsStatusRows"].map((item: any) => (deserializeBidResponseWithoutBidsStatusRow(item))) : undefined,
  };
}

export interface ListClientsResponse {
  /**
   * The returned list of clients.
   */
  clients?: Client[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListClientsRequest.pageToken field in the subsequent call to the
   * accounts.clients.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListClientsResponse(data: any): ListClientsResponse {
  return {
    ...data,
    clients: data["clients"] !== undefined ? data["clients"].map((item: any) => (serializeClient(item))) : undefined,
  };
}

function deserializeListClientsResponse(data: any): ListClientsResponse {
  return {
    ...data,
    clients: data["clients"] !== undefined ? data["clients"].map((item: any) => (deserializeClient(item))) : undefined,
  };
}

export interface ListClientUserInvitationsResponse {
  /**
   * The returned list of client users.
   */
  invitations?: ClientUserInvitation[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListClientUserInvitationsRequest.pageToken field in the subsequent call to
   * the clients.invitations.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListClientUserInvitationsResponse(data: any): ListClientUserInvitationsResponse {
  return {
    ...data,
    invitations: data["invitations"] !== undefined ? data["invitations"].map((item: any) => (serializeClientUserInvitation(item))) : undefined,
  };
}

function deserializeListClientUserInvitationsResponse(data: any): ListClientUserInvitationsResponse {
  return {
    ...data,
    invitations: data["invitations"] !== undefined ? data["invitations"].map((item: any) => (deserializeClientUserInvitation(item))) : undefined,
  };
}

export interface ListClientUsersResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListClientUsersRequest.pageToken field in the subsequent call to the
   * clients.invitations.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The returned list of client users.
   */
  users?: ClientUser[];
}

function serializeListClientUsersResponse(data: any): ListClientUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeClientUser(item))) : undefined,
  };
}

function deserializeListClientUsersResponse(data: any): ListClientUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeClientUser(item))) : undefined,
  };
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
   * ListCreativesRequest.page_token field in the subsequent call to
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
 * Response message for listing all creatives associated with a given filtered
 * bid reason.
 */
export interface ListCreativeStatusBreakdownByCreativeResponse {
  /**
   * List of rows, with counts of bids with a given creative status aggregated
   * by creative.
   */
  filteredBidCreativeRows?: FilteredBidCreativeRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListCreativeStatusBreakdownByCreativeRequest.pageToken field in the
   * subsequent call to the filteredBids.creatives.list method to retrieve the
   * next page of results.
   */
  nextPageToken?: string;
}

function serializeListCreativeStatusBreakdownByCreativeResponse(data: any): ListCreativeStatusBreakdownByCreativeResponse {
  return {
    ...data,
    filteredBidCreativeRows: data["filteredBidCreativeRows"] !== undefined ? data["filteredBidCreativeRows"].map((item: any) => (serializeFilteredBidCreativeRow(item))) : undefined,
  };
}

function deserializeListCreativeStatusBreakdownByCreativeResponse(data: any): ListCreativeStatusBreakdownByCreativeResponse {
  return {
    ...data,
    filteredBidCreativeRows: data["filteredBidCreativeRows"] !== undefined ? data["filteredBidCreativeRows"].map((item: any) => (deserializeFilteredBidCreativeRow(item))) : undefined,
  };
}

/**
 * Response message for listing all details associated with a given filtered
 * bid reason.
 */
export interface ListCreativeStatusBreakdownByDetailResponse {
  /**
   * The type of detail that the detail IDs represent.
   */
  detailType?:  | "DETAIL_TYPE_UNSPECIFIED" | "CREATIVE_ATTRIBUTE" | "VENDOR" | "SENSITIVE_CATEGORY" | "PRODUCT_CATEGORY" | "DISAPPROVAL_REASON" | "POLICY_TOPIC" | "ATP_VENDOR" | "VENDOR_DOMAIN" | "GVL_ID";
  /**
   * List of rows, with counts of bids with a given creative status aggregated
   * by detail.
   */
  filteredBidDetailRows?: FilteredBidDetailRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListCreativeStatusBreakdownByDetailRequest.pageToken field in the
   * subsequent call to the filteredBids.details.list method to retrieve the
   * next page of results.
   */
  nextPageToken?: string;
}

function serializeListCreativeStatusBreakdownByDetailResponse(data: any): ListCreativeStatusBreakdownByDetailResponse {
  return {
    ...data,
    filteredBidDetailRows: data["filteredBidDetailRows"] !== undefined ? data["filteredBidDetailRows"].map((item: any) => (serializeFilteredBidDetailRow(item))) : undefined,
  };
}

function deserializeListCreativeStatusBreakdownByDetailResponse(data: any): ListCreativeStatusBreakdownByDetailResponse {
  return {
    ...data,
    filteredBidDetailRows: data["filteredBidDetailRows"] !== undefined ? data["filteredBidDetailRows"].map((item: any) => (deserializeFilteredBidDetailRow(item))) : undefined,
  };
}

/**
 * A response for listing creative and deal associations
 */
export interface ListDealAssociationsResponse {
  /**
   * The list of associations.
   */
  associations?: CreativeDealAssociation[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListDealAssociationsRequest.page_token field in the subsequent call to
   * 'ListDealAssociation' method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for listing all reasons that bid requests were filtered and
 * not sent to the buyer.
 */
export interface ListFilteredBidRequestsResponse {
  /**
   * List of rows, with counts of filtered bid requests aggregated by callout
   * status.
   */
  calloutStatusRows?: CalloutStatusRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListFilteredBidRequestsRequest.pageToken field in the subsequent call to
   * the filteredBidRequests.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListFilteredBidRequestsResponse(data: any): ListFilteredBidRequestsResponse {
  return {
    ...data,
    calloutStatusRows: data["calloutStatusRows"] !== undefined ? data["calloutStatusRows"].map((item: any) => (serializeCalloutStatusRow(item))) : undefined,
  };
}

function deserializeListFilteredBidRequestsResponse(data: any): ListFilteredBidRequestsResponse {
  return {
    ...data,
    calloutStatusRows: data["calloutStatusRows"] !== undefined ? data["calloutStatusRows"].map((item: any) => (deserializeCalloutStatusRow(item))) : undefined,
  };
}

/**
 * Response message for listing all reasons that bids were filtered from the
 * auction.
 */
export interface ListFilteredBidsResponse {
  /**
   * List of rows, with counts of filtered bids aggregated by filtering reason
   * (for example, creative status).
   */
  creativeStatusRows?: CreativeStatusRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListFilteredBidsRequest.pageToken field in the subsequent call to the
   * filteredBids.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListFilteredBidsResponse(data: any): ListFilteredBidsResponse {
  return {
    ...data,
    creativeStatusRows: data["creativeStatusRows"] !== undefined ? data["creativeStatusRows"].map((item: any) => (serializeCreativeStatusRow(item))) : undefined,
  };
}

function deserializeListFilteredBidsResponse(data: any): ListFilteredBidsResponse {
  return {
    ...data,
    creativeStatusRows: data["creativeStatusRows"] !== undefined ? data["creativeStatusRows"].map((item: any) => (deserializeCreativeStatusRow(item))) : undefined,
  };
}

/**
 * Response message for listing filter sets.
 */
export interface ListFilterSetsResponse {
  /**
   * The filter sets belonging to the buyer.
   */
  filterSets?: FilterSet[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListFilterSetsRequest.pageToken field in the subsequent call to the
   * accounts.filterSets.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListFilterSetsResponse(data: any): ListFilterSetsResponse {
  return {
    ...data,
    filterSets: data["filterSets"] !== undefined ? data["filterSets"].map((item: any) => (serializeFilterSet(item))) : undefined,
  };
}

function deserializeListFilterSetsResponse(data: any): ListFilterSetsResponse {
  return {
    ...data,
    filterSets: data["filterSets"] !== undefined ? data["filterSets"].map((item: any) => (deserializeFilterSet(item))) : undefined,
  };
}

/**
 * Response message for listing the metrics that are measured in number of
 * impressions.
 */
export interface ListImpressionMetricsResponse {
  /**
   * List of rows, each containing a set of impression metrics.
   */
  impressionMetricsRows?: ImpressionMetricsRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListImpressionMetricsRequest.pageToken field in the subsequent call to the
   * impressionMetrics.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListImpressionMetricsResponse(data: any): ListImpressionMetricsResponse {
  return {
    ...data,
    impressionMetricsRows: data["impressionMetricsRows"] !== undefined ? data["impressionMetricsRows"].map((item: any) => (serializeImpressionMetricsRow(item))) : undefined,
  };
}

function deserializeListImpressionMetricsResponse(data: any): ListImpressionMetricsResponse {
  return {
    ...data,
    impressionMetricsRows: data["impressionMetricsRows"] !== undefined ? data["impressionMetricsRows"].map((item: any) => (deserializeImpressionMetricsRow(item))) : undefined,
  };
}

/**
 * Response message for listing all reasons that bids lost in the auction.
 */
export interface ListLosingBidsResponse {
  /**
   * List of rows, with counts of losing bids aggregated by loss reason (for
   * example, creative status).
   */
  creativeStatusRows?: CreativeStatusRow[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListLosingBidsRequest.pageToken field in the subsequent call to the
   * losingBids.list method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListLosingBidsResponse(data: any): ListLosingBidsResponse {
  return {
    ...data,
    creativeStatusRows: data["creativeStatusRows"] !== undefined ? data["creativeStatusRows"].map((item: any) => (serializeCreativeStatusRow(item))) : undefined,
  };
}

function deserializeListLosingBidsResponse(data: any): ListLosingBidsResponse {
  return {
    ...data,
    creativeStatusRows: data["creativeStatusRows"] !== undefined ? data["creativeStatusRows"].map((item: any) => (deserializeCreativeStatusRow(item))) : undefined,
  };
}

/**
 * Response message for listing all reasons for which a buyer was not billed
 * for a winning bid.
 */
export interface ListNonBillableWinningBidsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListNonBillableWinningBidsRequest.pageToken field in the subsequent call to
   * the nonBillableWinningBids.list method to retrieve the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * List of rows, with counts of bids not billed aggregated by reason.
   */
  nonBillableWinningBidStatusRows?: NonBillableWinningBidStatusRow[];
}

function serializeListNonBillableWinningBidsResponse(data: any): ListNonBillableWinningBidsResponse {
  return {
    ...data,
    nonBillableWinningBidStatusRows: data["nonBillableWinningBidStatusRows"] !== undefined ? data["nonBillableWinningBidStatusRows"].map((item: any) => (serializeNonBillableWinningBidStatusRow(item))) : undefined,
  };
}

function deserializeListNonBillableWinningBidsResponse(data: any): ListNonBillableWinningBidsResponse {
  return {
    ...data,
    nonBillableWinningBidStatusRows: data["nonBillableWinningBidStatusRows"] !== undefined ? data["nonBillableWinningBidStatusRows"].map((item: any) => (deserializeNonBillableWinningBidStatusRow(item))) : undefined,
  };
}

/**
 * Response message for listing products visible to the buyer.
 */
export interface ListProductsResponse {
  /**
   * List pagination support.
   */
  nextPageToken?: string;
  /**
   * The list of matching products at their head revision number.
   */
  products?: Product[];
}

function serializeListProductsResponse(data: any): ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (serializeProduct(item))) : undefined,
  };
}

function deserializeListProductsResponse(data: any): ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (deserializeProduct(item))) : undefined,
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

function serializeListProposalsResponse(data: any): ListProposalsResponse {
  return {
    ...data,
    proposals: data["proposals"] !== undefined ? data["proposals"].map((item: any) => (serializeProposal(item))) : undefined,
  };
}

function deserializeListProposalsResponse(data: any): ListProposalsResponse {
  return {
    ...data,
    proposals: data["proposals"] !== undefined ? data["proposals"].map((item: any) => (deserializeProposal(item))) : undefined,
  };
}

/**
 * Response message for profiles visible to the buyer.
 */
export interface ListPublisherProfilesResponse {
  /**
   * List pagination support
   */
  nextPageToken?: string;
  /**
   * The list of matching publisher profiles.
   */
  publisherProfiles?: PublisherProfile[];
}

/**
 * Output only. The Geo criteria the restriction applies to.
 */
export interface LocationContext {
  /**
   * IDs representing the geo location for this context. Refer to the
   * [geo-table.csv](https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv)
   * file for different geo criteria IDs.
   */
  geoCriteriaIds?: number[];
}

/**
 * Targeting represents different criteria that can be used by advertisers to
 * target ad inventory. For example, they can choose to target ad requests only
 * if the user is in the US. Multiple types of targeting are always applied as a
 * logical AND, unless noted otherwise.
 */
export interface MarketplaceTargeting {
  /**
   * Geo criteria IDs to be included/excluded.
   */
  geoTargeting?: CriteriaTargeting;
  /**
   * Inventory sizes to be included/excluded.
   */
  inventorySizeTargeting?: InventorySizeTargeting;
  /**
   * Placement targeting information, for example, URL, mobile applications.
   */
  placementTargeting?: PlacementTargeting;
  /**
   * Technology targeting information, for example, operating system, device
   * category.
   */
  technologyTargeting?: TechnologyTargeting;
  /**
   * Video targeting information.
   */
  videoTargeting?: VideoTargeting;
}

function serializeMarketplaceTargeting(data: any): MarketplaceTargeting {
  return {
    ...data,
    geoTargeting: data["geoTargeting"] !== undefined ? serializeCriteriaTargeting(data["geoTargeting"]) : undefined,
    inventorySizeTargeting: data["inventorySizeTargeting"] !== undefined ? serializeInventorySizeTargeting(data["inventorySizeTargeting"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? serializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

function deserializeMarketplaceTargeting(data: any): MarketplaceTargeting {
  return {
    ...data,
    geoTargeting: data["geoTargeting"] !== undefined ? deserializeCriteriaTargeting(data["geoTargeting"]) : undefined,
    inventorySizeTargeting: data["inventorySizeTargeting"] !== undefined ? deserializeInventorySizeTargeting(data["inventorySizeTargeting"]) : undefined,
    technologyTargeting: data["technologyTargeting"] !== undefined ? deserializeTechnologyTargeting(data["technologyTargeting"]) : undefined,
  };
}

/**
 * A metric value, with an expected value and a variance; represents a count
 * that may be either exact or estimated (for example, when sampled).
 */
export interface MetricValue {
  /**
   * The expected value of the metric.
   */
  value?: bigint;
  /**
   * The variance (for example, square of the standard deviation) of the metric
   * value. If value is exact, variance is 0. Can be used to calculate margin of
   * error as a percentage of value, using the following formula, where Z is the
   * standard constant that depends on the preferred size of the confidence
   * interval (for example, for 90% confidence interval, use Z = 1.645):
   * marginOfError = 100 * Z * sqrt(variance) / value
   */
  variance?: bigint;
}

function serializeMetricValue(data: any): MetricValue {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
    variance: data["variance"] !== undefined ? String(data["variance"]) : undefined,
  };
}

function deserializeMetricValue(data: any): MetricValue {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
    variance: data["variance"] !== undefined ? BigInt(data["variance"]) : undefined,
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
   * The URL to the app store to purchase/download the promoted app.
   */
  storeUrl?: string;
  /**
   * The URL to fetch a native video ad.
   */
  videoUrl?: string;
}

/**
 * The number of winning bids with the specified dimension values for which the
 * buyer was not billed, as described by the specified status.
 */
export interface NonBillableWinningBidStatusRow {
  /**
   * The number of bids with the specified status.
   */
  bidCount?: MetricValue;
  /**
   * The values of all dimensions associated with metric values in this row.
   */
  rowDimensions?: RowDimensions;
  /**
   * The status specifying why the winning bids were not billed.
   */
  status?:  | "STATUS_UNSPECIFIED" | "AD_NOT_RENDERED" | "INVALID_IMPRESSION" | "FATAL_VAST_ERROR" | "LOST_IN_MEDIATION";
}

function serializeNonBillableWinningBidStatusRow(data: any): NonBillableWinningBidStatusRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? serializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? serializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

function deserializeNonBillableWinningBidStatusRow(data: any): NonBillableWinningBidStatusRow {
  return {
    ...data,
    bidCount: data["bidCount"] !== undefined ? deserializeMetricValue(data["bidCount"]) : undefined,
    rowDimensions: data["rowDimensions"] !== undefined ? deserializeRowDimensions(data["rowDimensions"]) : undefined,
  };
}

/**
 * Terms for Private Auctions. Note that Private Auctions can be created only
 * by the seller, but they can be returned in a get or list request.
 */
export interface NonGuaranteedAuctionTerms {
  /**
   * True if open auction buyers are allowed to compete with invited buyers in
   * this private auction.
   */
  autoOptimizePrivateAuction?: boolean;
  /**
   * Reserve price for the specified buyer.
   */
  reservePricesPerBuyer?: PricePerBuyer[];
}

function serializeNonGuaranteedAuctionTerms(data: any): NonGuaranteedAuctionTerms {
  return {
    ...data,
    reservePricesPerBuyer: data["reservePricesPerBuyer"] !== undefined ? data["reservePricesPerBuyer"].map((item: any) => (serializePricePerBuyer(item))) : undefined,
  };
}

function deserializeNonGuaranteedAuctionTerms(data: any): NonGuaranteedAuctionTerms {
  return {
    ...data,
    reservePricesPerBuyer: data["reservePricesPerBuyer"] !== undefined ? data["reservePricesPerBuyer"].map((item: any) => (deserializePricePerBuyer(item))) : undefined,
  };
}

/**
 * Terms for Preferred Deals.
 */
export interface NonGuaranteedFixedPriceTerms {
  /**
   * Fixed price for the specified buyer.
   */
  fixedPrices?: PricePerBuyer[];
}

function serializeNonGuaranteedFixedPriceTerms(data: any): NonGuaranteedFixedPriceTerms {
  return {
    ...data,
    fixedPrices: data["fixedPrices"] !== undefined ? data["fixedPrices"].map((item: any) => (serializePricePerBuyer(item))) : undefined,
  };
}

function deserializeNonGuaranteedFixedPriceTerms(data: any): NonGuaranteedFixedPriceTerms {
  return {
    ...data,
    fixedPrices: data["fixedPrices"] !== undefined ? data["fixedPrices"].map((item: any) => (deserializePricePerBuyer(item))) : undefined,
  };
}

/**
 * A proposal may be associated to several notes.
 */
export interface Note {
  /**
   * Output only. The timestamp for when this note was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The role of the person (buyer/seller) creating the note.
   */
  readonly creatorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * The actual note to attach. (max-length: 1024 unicode code units) Note:
   * This field may be set only when creating the resource. Modifying this field
   * while updating the resource will result in an error.
   */
  note?: string;
  /**
   * Output only. The unique ID for the note.
   */
  readonly noteId?: string;
  /**
   * Output only. The revision number of the proposal when the note is created.
   */
  readonly proposalRevision?: bigint;
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
 * Request message to pause serving for finalized deals.
 */
export interface PauseProposalDealsRequest {
  /**
   * The external_deal_id's of the deals to be paused. If empty, all the deals
   * in the proposal will be paused.
   */
  externalDealIds?: string[];
  /**
   * The reason why the deals are being paused. This human readable message
   * will be displayed in the seller's UI. (Max length: 1000 unicode code
   * units.)
   */
  reason?: string;
}

/**
 * Request message to pause serving for an already-finalized proposal.
 */
export interface PauseProposalRequest {
  /**
   * The reason why the proposal is being paused. This human readable message
   * will be displayed in the seller's UI. (Max length: 1000 unicode code
   * units.)
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
  urlTargeting?: UrlTargeting;
}

/**
 * Output only. The type of platform the restriction applies to.
 */
export interface PlatformContext {
  /**
   * The platforms this restriction applies to.
   */
  platforms?:  | "DESKTOP" | "ANDROID" | "IOS"[];
}

/**
 * Represents a price and a pricing type for a product / deal.
 */
export interface Price {
  /**
   * The actual price with currency specified.
   */
  amount?: Money;
  /**
   * The pricing type for the deal/product. (default: CPM)
   */
  pricingType?:  | "PRICING_TYPE_UNSPECIFIED" | "COST_PER_MILLE" | "COST_PER_DAY";
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
 * Used to specify pricing rules for buyers/advertisers. Each PricePerBuyer in
 * a product can become 0 or 1 deals. To check if there is a PricePerBuyer for a
 * particular buyer or buyer/advertiser pair, we look for the most specific
 * matching rule - we first look for a rule matching the buyer and advertiser,
 * next a rule with the buyer but an empty advertiser list, and otherwise look
 * for a matching rule where no buyer is set.
 */
export interface PricePerBuyer {
  /**
   * The list of advertisers for this price when associated with this buyer. If
   * empty, all advertisers with this buyer pay this price.
   */
  advertiserIds?: string[];
  /**
   * The buyer who will pay this price. If unset, all buyers can pay this price
   * (if the advertisers match, and there's no more specific rule matching the
   * buyer).
   */
  buyer?: Buyer;
  /**
   * The specified price.
   */
  price?: Price;
}

function serializePricePerBuyer(data: any): PricePerBuyer {
  return {
    ...data,
    price: data["price"] !== undefined ? serializePrice(data["price"]) : undefined,
  };
}

function deserializePricePerBuyer(data: any): PricePerBuyer {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializePrice(data["price"]) : undefined,
  };
}

/**
 * Buyers are allowed to store certain types of private data in a
 * proposal/deal.
 */
export interface PrivateData {
  /**
   * A buyer or seller specified reference ID. This can be queried in the list
   * operations (max-length: 1024 unicode code units).
   */
  referenceId?: string;
}

/**
 * A product is a segment of inventory that a seller wants to sell. It is
 * associated with certain terms and targeting information which helps the buyer
 * know more about the inventory.
 */
export interface Product {
  /**
   * The proposed end time for the deal. The field will be truncated to the
   * order of seconds during serving.
   */
  availableEndTime?: Date;
  /**
   * Inventory availability dates. The start time will be truncated to seconds
   * during serving. Thus, a field specified as 3:23:34.456 (HH:mm:ss.SSS) will
   * be truncated to 3:23:34 when serving.
   */
  availableStartTime?: Date;
  /**
   * Creation time.
   */
  createTime?: Date;
  /**
   * Optional contact information for the creator of this product.
   */
  creatorContacts?: ContactInformation[];
  /**
   * The display name for this product as set by the seller.
   */
  displayName?: string;
  /**
   * If the creator has already signed off on the product, then the buyer can
   * finalize the deal by accepting the product as is. When copying to a
   * proposal, if any of the terms are changed, then auto_finalize is
   * automatically set to false.
   */
  hasCreatorSignedOff?: boolean;
  /**
   * The unique ID for the product.
   */
  productId?: string;
  /**
   * The revision number of the product (auto-assigned by Marketplace).
   */
  productRevision?: bigint;
  /**
   * An ID which can be used by the Publisher Profile API to get more
   * information about the seller that created this product.
   */
  publisherProfileId?: string;
  /**
   * Information about the seller that created this product.
   */
  seller?: Seller;
  /**
   * The syndication product associated with the deal.
   */
  syndicationProduct?:  | "SYNDICATION_PRODUCT_UNSPECIFIED" | "CONTENT" | "MOBILE" | "VIDEO" | "GAMES";
  /**
   * Targeting that is shared between the buyer and the seller. Each targeting
   * criterion has a specified key and for each key there is a list of inclusion
   * value or exclusion values.
   */
  targetingCriterion?: TargetingCriteria[];
  /**
   * The negotiable terms of the deal.
   */
  terms?: DealTerms;
  /**
   * Time of last update.
   */
  updateTime?: Date;
  /**
   * The web-property code for the seller. This needs to be copied as is when
   * adding a new deal to a proposal.
   */
  webPropertyCode?: string;
}

function serializeProduct(data: any): Product {
  return {
    ...data,
    availableEndTime: data["availableEndTime"] !== undefined ? data["availableEndTime"].toISOString() : undefined,
    availableStartTime: data["availableStartTime"] !== undefined ? data["availableStartTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    productRevision: data["productRevision"] !== undefined ? String(data["productRevision"]) : undefined,
    targetingCriterion: data["targetingCriterion"] !== undefined ? data["targetingCriterion"].map((item: any) => (serializeTargetingCriteria(item))) : undefined,
    terms: data["terms"] !== undefined ? serializeDealTerms(data["terms"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeProduct(data: any): Product {
  return {
    ...data,
    availableEndTime: data["availableEndTime"] !== undefined ? new Date(data["availableEndTime"]) : undefined,
    availableStartTime: data["availableStartTime"] !== undefined ? new Date(data["availableStartTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    productRevision: data["productRevision"] !== undefined ? BigInt(data["productRevision"]) : undefined,
    targetingCriterion: data["targetingCriterion"] !== undefined ? data["targetingCriterion"].map((item: any) => (deserializeTargetingCriteria(item))) : undefined,
    terms: data["terms"] !== undefined ? deserializeDealTerms(data["terms"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents a proposal in the Marketplace. A proposal is the unit of
 * negotiation between a seller and a buyer and contains deals which are served.
 * Note: You can't update, create, or otherwise modify Private Auction deals
 * through the API. Fields are updatable unless noted otherwise.
 */
export interface Proposal {
  /**
   * Output only. Reference to the buyer that will get billed for this
   * proposal.
   */
  readonly billedBuyer?: Buyer;
  /**
   * Reference to the buyer on the proposal. Note: This field may be set only
   * when creating the resource. Modifying this field while updating the
   * resource will result in an error.
   */
  buyer?: Buyer;
  /**
   * Contact information for the buyer.
   */
  buyerContacts?: ContactInformation[];
  /**
   * Private data for buyer. (hidden from seller).
   */
  buyerPrivateData?: PrivateData;
  /**
   * The deals associated with this proposal. For Private Auction proposals
   * (whose deals have NonGuaranteedAuctionTerms), there will only be one deal.
   */
  deals?: Deal[];
  /**
   * The name for the proposal.
   */
  displayName?: string;
  /**
   * Output only. True if the proposal is being renegotiated.
   */
  readonly isRenegotiating?: boolean;
  /**
   * Output only. True, if the buyside inventory setup is complete for this
   * proposal.
   */
  readonly isSetupComplete?: boolean;
  /**
   * Output only. The role of the last user that either updated the proposal or
   * left a comment.
   */
  readonly lastUpdaterOrCommentorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * Output only. The notes associated with this proposal.
   */
  readonly notes?: Note[];
  /**
   * Output only. Indicates whether the buyer/seller created the proposal.
   */
  readonly originatorRole?:  | "BUYER_SELLER_ROLE_UNSPECIFIED" | "BUYER" | "SELLER";
  /**
   * Output only. Private auction ID if this proposal is a private auction
   * proposal.
   */
  readonly privateAuctionId?: string;
  /**
   * Output only. The unique ID of the proposal.
   */
  readonly proposalId?: string;
  /**
   * Output only. The revision number for the proposal. Each update to the
   * proposal or the deal causes the proposal revision number to auto-increment.
   * The buyer keeps track of the last revision number they know of and pass it
   * in when making an update. If the head revision number on the server has
   * since incremented, then an ABORTED error is returned during the update
   * operation to let the buyer know that a subsequent update was made.
   */
  readonly proposalRevision?: bigint;
  /**
   * Output only. The current state of the proposal.
   */
  readonly proposalState?:  | "PROPOSAL_STATE_UNSPECIFIED" | "PROPOSED" | "BUYER_ACCEPTED" | "SELLER_ACCEPTED" | "CANCELED" | "FINALIZED";
  /**
   * Reference to the seller on the proposal. Note: This field may be set only
   * when creating the resource. Modifying this field while updating the
   * resource will result in an error.
   */
  seller?: Seller;
  /**
   * Output only. Contact information for the seller.
   */
  readonly sellerContacts?: ContactInformation[];
  /**
   * Output only. The terms and conditions set by the publisher for this
   * proposal.
   */
  readonly termsAndConditions?: string;
  /**
   * Output only. The time when the proposal was last revised.
   */
  readonly updateTime?: Date;
}

function serializeProposal(data: any): Proposal {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (serializeDeal(item))) : undefined,
  };
}

function deserializeProposal(data: any): Proposal {
  return {
    ...data,
    deals: data["deals"] !== undefined ? data["deals"].map((item: any) => (deserializeDeal(item))) : undefined,
    proposalRevision: data["proposalRevision"] !== undefined ? BigInt(data["proposalRevision"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents a publisher profile
 * (https://support.google.com/admanager/answer/6035806) in Marketplace. All
 * fields are read only. All string fields are free-form text entered by the
 * publisher unless noted otherwise.
 */
export interface PublisherProfile {
  /**
   * Description on the publisher's audience.
   */
  audienceDescription?: string;
  /**
   * Statement explaining what's unique about publisher's business, and why
   * buyers should partner with the publisher.
   */
  buyerPitchStatement?: string;
  /**
   * Contact information for direct reservation deals. This is free text
   * entered by the publisher and may include information like names, phone
   * numbers and email addresses.
   */
  directDealsContact?: string;
  /**
   * Name of the publisher profile.
   */
  displayName?: string;
  /**
   * The list of domains represented in this publisher profile. Empty if this
   * is a parent profile. These are top private domains, meaning that these will
   * not contain a string like "photos.google.co.uk/123", but will instead
   * contain "google.co.uk".
   */
  domains?: string[];
  /**
   * URL to publisher's Google+ page.
   */
  googlePlusUrl?: string;
  /**
   * Indicates if this profile is the parent profile of the seller. A parent
   * profile represents all the inventory from the seller, as opposed to child
   * profile that is created to brand a portion of inventory. One seller should
   * have only one parent publisher profile, and can have multiple child
   * profiles. Publisher profiles for the same seller will have same value of
   * field google.ads.adexchange.buyer.v2beta1.PublisherProfile.seller. See
   * https://support.google.com/admanager/answer/6035806 for details.
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
   * Overview of the publisher.
   */
  overview?: string;
  /**
   * Contact information for programmatic deals. This is free text entered by
   * the publisher and may include information like names, phone numbers and
   * email addresses.
   */
  programmaticDealsContact?: string;
  /**
   * Unique ID for publisher profile.
   */
  publisherProfileId?: string;
  /**
   * URL to a publisher rate card.
   */
  rateCardInfoUrl?: string;
  /**
   * URL to a sample content page.
   */
  samplePageUrl?: string;
  /**
   * Seller of the publisher profile.
   */
  seller?: Seller;
  /**
   * Up to three key metrics and rankings. Max 100 characters each. For example
   * "#1 Mobile News Site for 20 Straight Months".
   */
  topHeadlines?: string[];
}

/**
 * A mobile application that contains a external app ID, name, and app store.
 */
export interface PublisherProfileMobileApplication {
  /**
   * The app store the app belongs to.
   */
  appStore?:  | "APP_STORE_TYPE_UNSPECIFIED" | "APPLE_ITUNES" | "GOOGLE_PLAY" | "ROKU" | "AMAZON_FIRETV" | "PLAYSTATION" | "XBOX" | "SAMSUNG_TV" | "AMAZON" | "OPPO" | "SAMSUNG" | "VIVO" | "XIAOMI";
  /**
   * The external ID for the app from its app store.
   */
  externalAppId?: string;
  /**
   * The name of the app.
   */
  name?: string;
}

/**
 * An open-ended realtime time range specified by the start timestamp. For
 * filter sets that specify a realtime time range RTB metrics continue to be
 * aggregated throughout the lifetime of the filter set.
 */
export interface RealtimeTimeRange {
  /**
   * The start timestamp of the real-time RTB metrics aggregation.
   */
  startTimestamp?: Date;
}

function serializeRealtimeTimeRange(data: any): RealtimeTimeRange {
  return {
    ...data,
    startTimestamp: data["startTimestamp"] !== undefined ? data["startTimestamp"].toISOString() : undefined,
  };
}

function deserializeRealtimeTimeRange(data: any): RealtimeTimeRange {
  return {
    ...data,
    startTimestamp: data["startTimestamp"] !== undefined ? new Date(data["startTimestamp"]) : undefined,
  };
}

/**
 * A relative date range, specified by an offset and a duration. The supported
 * range of dates begins 30 days before today and ends today, for example, the
 * limits for these values are: offset_days >= 0 duration_days >= 1 offset_days
 * + duration_days <= 30
 */
export interface RelativeDateRange {
  /**
   * The number of days in the requested date range, for example, for a range
   * spanning today: 1. For a range spanning the last 7 days: 7.
   */
  durationDays?: number;
  /**
   * The end date of the filter set, specified as the number of days before
   * today, for example, for a range where the last date is today: 0.
   */
  offsetDays?: number;
}

/**
 * A request for removing the association between a deal and a creative.
 */
export interface RemoveDealAssociationRequest {
  /**
   * The association between a creative and a deal that should be removed.
   */
  association?: CreativeDealAssociation;
}

/**
 * Request message to resume (unpause) serving for already-finalized deals.
 */
export interface ResumeProposalDealsRequest {
  /**
   * The external_deal_id's of the deals to resume. If empty, all the deals in
   * the proposal will be resumed.
   */
  externalDealIds?: string[];
}

/**
 * Request message to resume (unpause) serving for an already-finalized
 * proposal.
 */
export interface ResumeProposalRequest {
}

/**
 * A response may include multiple rows, breaking down along various
 * dimensions. Encapsulates the values of all dimensions for a given row.
 */
export interface RowDimensions {
  /**
   * The publisher identifier for this row, if a breakdown by
   * [BreakdownDimension.PUBLISHER_IDENTIFIER](https://developers.google.com/authorized-buyers/apis/reference/rest/v2beta1/bidders.accounts.filterSets#FilterSet.BreakdownDimension)
   * was requested.
   */
  publisherIdentifier?: string;
  /**
   * The time interval that this row represents.
   */
  timeInterval?: TimeInterval;
}

function serializeRowDimensions(data: any): RowDimensions {
  return {
    ...data,
    timeInterval: data["timeInterval"] !== undefined ? serializeTimeInterval(data["timeInterval"]) : undefined,
  };
}

function deserializeRowDimensions(data: any): RowDimensions {
  return {
    ...data,
    timeInterval: data["timeInterval"] !== undefined ? deserializeTimeInterval(data["timeInterval"]) : undefined,
  };
}

/**
 * Output only. A security context.
 */
export interface SecurityContext {
  /**
   * The security types in this context.
   */
  securities?:  | "INSECURE" | "SSL"[];
}

/**
 * Represents a seller of inventory. Each seller is identified by a unique Ad
 * Manager account ID.
 */
export interface Seller {
  /**
   * The unique ID for the seller. The seller fills in this field. The seller
   * account ID is then available to buyer in the product.
   */
  accountId?: string;
  /**
   * Output only. Ad manager network code for the seller.
   */
  readonly subAccountId?: string;
}

/**
 * The serving context for this restriction.
 */
export interface ServingContext {
  /**
   * Matches all contexts.
   */
  all?:  | "SIMPLE_CONTEXT";
  /**
   * Matches impressions for a particular app type.
   */
  appType?: AppContext;
  /**
   * Matches impressions for a particular auction type.
   */
  auctionType?: AuctionContext;
  /**
   * Matches impressions coming from users *or* publishers in a specific
   * location.
   */
  location?: LocationContext;
  /**
   * Matches impressions coming from a particular platform.
   */
  platform?: PlatformContext;
  /**
   * Matches impressions for a particular security type.
   */
  securityType?: SecurityContext;
}

/**
 * Output only. A representation of the status of an ad in a specific context.
 * A context here relates to where something ultimately serves (for example, a
 * user or publisher geo, a platform, an HTTPS versus HTTP request, or the type
 * of auction).
 */
export interface ServingRestriction {
  /**
   * The contexts for the restriction.
   */
  contexts?: ServingContext[];
  /**
   * Disapproval bound to this restriction. Only present if status=DISAPPROVED.
   * Can be used to filter the response of the creatives.list method.
   */
  disapproval?: Disapproval;
  /**
   * Any disapprovals bound to this restriction. Only present if
   * status=DISAPPROVED. Can be used to filter the response of the
   * creatives.list method. Deprecated; use disapproval field instead.
   */
  disapprovalReasons?: Disapproval[];
  /**
   * The status of the creative in this context (for example, it has been
   * explicitly disapproved or is pending review).
   */
  status?:  | "STATUS_UNSPECIFIED" | "DISAPPROVAL" | "PENDING_REVIEW";
}

/**
 * Message depicting the size of the creative. The units of width and height
 * depend on the type of the targeting.
 */
export interface Size {
  /**
   * The height of the creative.
   */
  height?: number;
  /**
   * The width of the creative
   */
  width?: number;
}

/**
 * A request for stopping notifications for changes to creative Status.
 */
export interface StopWatchingCreativeRequest {
}

/**
 * Advertisers can target different attributes of an ad slot. For example, they
 * can choose to show ads only if the user is in the U.S. Such targeting
 * criteria can be specified as part of Shared Targeting.
 */
export interface TargetingCriteria {
  /**
   * The list of values to exclude from targeting. Each value is AND'd
   * together.
   */
  exclusions?: TargetingValue[];
  /**
   * The list of value to include as part of the targeting. Each value is OR'd
   * together.
   */
  inclusions?: TargetingValue[];
  /**
   * The key representing the shared targeting criterion. Targeting criteria
   * defined by Google ad servers will begin with GOOG_. Third parties may
   * define their own keys. A list of permissible keys along with the acceptable
   * values will be provided as part of the external documentation.
   */
  key?: string;
}

function serializeTargetingCriteria(data: any): TargetingCriteria {
  return {
    ...data,
    exclusions: data["exclusions"] !== undefined ? data["exclusions"].map((item: any) => (serializeTargetingValue(item))) : undefined,
    inclusions: data["inclusions"] !== undefined ? data["inclusions"].map((item: any) => (serializeTargetingValue(item))) : undefined,
  };
}

function deserializeTargetingCriteria(data: any): TargetingCriteria {
  return {
    ...data,
    exclusions: data["exclusions"] !== undefined ? data["exclusions"].map((item: any) => (deserializeTargetingValue(item))) : undefined,
    inclusions: data["inclusions"] !== undefined ? data["inclusions"].map((item: any) => (deserializeTargetingValue(item))) : undefined,
  };
}

/**
 * A polymorphic targeting value used as part of Shared Targeting.
 */
export interface TargetingValue {
  /**
   * The creative size value to include/exclude. Filled in when key =
   * GOOG_CREATIVE_SIZE
   */
  creativeSizeValue?: CreativeSize;
  /**
   * The daypart targeting to include / exclude. Filled in when the key is
   * GOOG_DAYPART_TARGETING. The definition of this targeting is derived from
   * the structure used by Ad Manager.
   */
  dayPartTargetingValue?: DayPartTargeting;
  /**
   * The long value to include/exclude.
   */
  longValue?: bigint;
  /**
   * The string value to include/exclude.
   */
  stringValue?: string;
}

function serializeTargetingValue(data: any): TargetingValue {
  return {
    ...data,
    longValue: data["longValue"] !== undefined ? String(data["longValue"]) : undefined,
  };
}

function deserializeTargetingValue(data: any): TargetingValue {
  return {
    ...data,
    longValue: data["longValue"] !== undefined ? BigInt(data["longValue"]) : undefined,
  };
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
 * An interval of time, with an absolute start and end.
 */
export interface TimeInterval {
  /**
   * The timestamp marking the end of the range (exclusive) for which data is
   * included.
   */
  endTime?: Date;
  /**
   * The timestamp marking the start of the range (inclusive) for which data is
   * included.
   */
  startTime?: Date;
}

function serializeTimeInterval(data: any): TimeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeInterval(data: any): TimeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
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
 * Represents a list of targeted and excluded URLs (for example, google.com).
 * For Private Auction and AdX Preferred Deals, URLs are either included or
 * excluded. For Programmatic Guaranteed and Preferred Deals, this doesn't
 * apply.
 */
export interface UrlTargeting {
  /**
   * A list of URLs to be excluded.
   */
  excludedUrls?: string[];
  /**
   * A list of URLs to be included.
   */
  targetedUrls?: string[];
}

/**
 * Video content for a creative.
 */
export interface VideoContent {
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
 * Represents targeting information about video.
 */
export interface VideoTargeting {
  /**
   * A list of video positions to be excluded. Position types can either be
   * included or excluded (XOR).
   */
  excludedPositionTypes?:  | "POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL"[];
  /**
   * A list of video positions to be included. When the included list is
   * present, the excluded list must be empty. When the excluded list is
   * present, the included list must be empty.
   */
  targetedPositionTypes?:  | "POSITION_TYPE_UNSPECIFIED" | "PREROLL" | "MIDROLL" | "POSTROLL"[];
}

/**
 * A request for watching changes to creative Status.
 */
export interface WatchCreativeRequest {
  /**
   * The Pub/Sub topic to publish notifications to. This topic must already
   * exist and must give permission to ad-exchange-buyside-reports@google.com to
   * write to the topic. This should be the full resource name in
   * "projects/{project_id}/topics/{topic_id}" format.
   */
  topic?: string;
}