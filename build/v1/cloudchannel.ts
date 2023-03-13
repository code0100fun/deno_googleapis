// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Channel API Client for Deno
 * =================================
 * 
 * The Cloud Channel API enables Google Cloud partners to have a single unified resale platform and APIs across all of Google Cloud including GCP, Workspace, Maps and Chrome.
 * 
 * Docs: https://cloud.google.com/channel
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Cloud Channel API enables Google Cloud partners to have a single unified
 * resale platform and APIs across all of Google Cloud including GCP, Workspace,
 * Maps and Chrome.
 */
export class CloudChannel {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudchannel.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a ChannelPartnerRepricingConfig. Call this method to set
   * modifications for a specific ChannelPartner's bill. You can only create
   * configs if the RepricingConfig.effective_invoice_month is a future month.
   * If needed, you can create a config for the current month, with some
   * restrictions. When creating a config for a future month, make sure there
   * are no existing configs for that RepricingConfig.effective_invoice_month.
   * The following restrictions are for creating configs in the current month. *
   * This functionality is reserved for recovering from an erroneous config, and
   * should not be used for regular business cases. * The new config will not
   * modify exports used with other configs. Changes to the config may be
   * immediate, but may take up to 24 hours. * There is a limit of ten configs
   * for any ChannelPartner or RepricingConfig.effective_invoice_month. * The
   * contained ChannelPartnerRepricingConfig.repricing_config vaule must be
   * different from the value used in the current config for a ChannelPartner.
   * Possible Error Codes: * PERMISSION_DENIED: If the account making the
   * request and the account being queried are different. * INVALID_ARGUMENT:
   * Missing or invalid required parameters in the request. Also displays if the
   * updated config is for the current month or past months. * NOT_FOUND: The
   * ChannelPartnerRepricingConfig specified does not exist or is not associated
   * with the given account. * INTERNAL: Any non-user error related to technical
   * issues in the backend. In this case, contact Cloud Channel support. Return
   * Value: If successful, the updated ChannelPartnerRepricingConfig resource,
   * otherwise returns an error.
   *
   * @param parent Required. The resource name of the ChannelPartner that will receive the repricing config. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}
   */
  async accountsChannelPartnerLinksChannelPartnerRepricingConfigsCreate(parent: string, req: GoogleCloudChannelV1ChannelPartnerRepricingConfig): Promise<GoogleCloudChannelV1ChannelPartnerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelPartnerRepricingConfigs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1ChannelPartnerRepricingConfig;
  }

  /**
   * Deletes the given ChannelPartnerRepricingConfig permanently. You can only
   * delete configs if their RepricingConfig.effective_invoice_month is set to a
   * date after the current month. Possible error codes: * PERMISSION_DENIED:
   * The account making the request does not own this customer. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * FAILED_PRECONDITION: The ChannelPartnerRepricingConfig is active or in the
   * past. * NOT_FOUND: No ChannelPartnerRepricingConfig found for the name in
   * the request.
   *
   * @param name Required. The resource name of the channel partner repricing config rule to delete.
   */
  async accountsChannelPartnerLinksChannelPartnerRepricingConfigsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets information about how a Distributor modifies their bill before
   * sending it to a ChannelPartner. Possible Error Codes: * PERMISSION_DENIED:
   * If the account making the request and the account being queried are
   * different. * NOT_FOUND: The ChannelPartnerRepricingConfig was not found. *
   * INTERNAL: Any non-user error related to technical issues in the backend. In
   * this case, contact Cloud Channel support. Return Value: If successful, the
   * ChannelPartnerRepricingConfig resource, otherwise returns an error.
   *
   * @param name Required. The resource name of the ChannelPartnerRepricingConfig Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}.
   */
  async accountsChannelPartnerLinksChannelPartnerRepricingConfigsGet(name: string): Promise<GoogleCloudChannelV1ChannelPartnerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudChannelV1ChannelPartnerRepricingConfig;
  }

  /**
   * Lists information about how a Reseller modifies their bill before sending
   * it to a ChannelPartner. Possible Error Codes: * PERMISSION_DENIED: If the
   * account making the request and the account being queried are different. *
   * NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is
   * not associated with the given account. * INTERNAL: Any non-user error
   * related to technical issues in the backend. In this case, contact Cloud
   * Channel support. Return Value: If successful, the
   * ChannelPartnerRepricingConfig resources. The data for each resource is
   * displayed in the ascending order of: * channel partner ID *
   * RepricingConfig.effective_invoice_month *
   * ChannelPartnerRepricingConfig.update_time If unsuccessful, returns an
   * error.
   *
   * @param parent Required. The resource name of the account's ChannelPartnerLink. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}. Supports accounts/{account_id}/channelPartnerLinks/- to retrieve configs for all channel partners.
   */
  async accountsChannelPartnerLinksChannelPartnerRepricingConfigsList(parent: string, opts: AccountsChannelPartnerLinksChannelPartnerRepricingConfigsListOptions = {}): Promise<GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelPartnerRepricingConfigs`);
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
    return data as GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse;
  }

  /**
   * Updates a ChannelPartnerRepricingConfig. Call this method to set
   * modifications for a specific ChannelPartner's bill. This method overwrites
   * the existing CustomerRepricingConfig. You can only update configs if the
   * RepricingConfig.effective_invoice_month is a future month. To make changes
   * to configs for the current month, use CreateChannelPartnerRepricingConfig,
   * taking note of its restrictions. You cannot update the
   * RepricingConfig.effective_invoice_month. When updating a config in the
   * future: * This config must already exist. Possible Error Codes: *
   * PERMISSION_DENIED: If the account making the request and the account being
   * queried are different. * INVALID_ARGUMENT: Missing or invalid required
   * parameters in the request. Also displays if the updated config is for the
   * current month or past months. * NOT_FOUND: The
   * ChannelPartnerRepricingConfig specified does not exist or is not associated
   * with the given account. * INTERNAL: Any non-user error related to technical
   * issues in the backend. In this case, contact Cloud Channel support. Return
   * Value: If successful, the updated ChannelPartnerRepricingConfig resource,
   * otherwise returns an error.
   *
   * @param name Output only. Resource name of the ChannelPartnerRepricingConfig. Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}.
   */
  async accountsChannelPartnerLinksChannelPartnerRepricingConfigsPatch(name: string, req: GoogleCloudChannelV1ChannelPartnerRepricingConfig): Promise<GoogleCloudChannelV1ChannelPartnerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudChannelV1ChannelPartnerRepricingConfig;
  }

  /**
   * Initiates a channel partner link between a distributor and a reseller, or
   * between resellers in an n-tier reseller channel. Invited partners need to
   * follow the invite_link_uri provided in the response to accept. After
   * accepting the invitation, a link is set up between the two parties. You
   * must be a distributor to call this method. Possible error codes: *
   * PERMISSION_DENIED: The reseller account making the request is different
   * from the reseller account in the API request. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * ALREADY_EXISTS: The
   * ChannelPartnerLink sent in the request already exists. * NOT_FOUND: No
   * Cloud Identity customer exists for provided domain. * INTERNAL: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. * UNKNOWN: Any non-user error related to a technical issue
   * in the backend. Contact Cloud Channel support. Return value: The new
   * ChannelPartnerLink resource.
   *
   * @param parent Required. Create a channel partner link for the provided reseller account's resource name. Parent uses the format: accounts/{account_id}
   */
  async accountsChannelPartnerLinksCreate(parent: string, req: GoogleCloudChannelV1ChannelPartnerLink): Promise<GoogleCloudChannelV1ChannelPartnerLink> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelPartnerLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1ChannelPartnerLink;
  }

  /**
   * Creates a new Customer resource under the reseller or distributor account.
   * Possible error codes: * PERMISSION_DENIED: The reseller account making the
   * request is different from the reseller account in the API request. *
   * INVALID_ARGUMENT: * Required request parameters are missing or invalid. *
   * Domain field value doesn't match the primary email domain. Return value:
   * The newly created Customer resource.
   *
   * @param parent Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id}
   */
  async accountsChannelPartnerLinksCustomersCreate(parent: string, req: GoogleCloudChannelV1Customer): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Deletes the given Customer permanently. Possible error codes: *
   * PERMISSION_DENIED: The account making the request does not own this
   * customer. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * FAILED_PRECONDITION: The customer has existing entitlements. *
   * NOT_FOUND: No Customer resource found for the name in the request.
   *
   * @param name Required. The resource name of the customer to delete.
   */
  async accountsChannelPartnerLinksCustomersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Returns the requested Customer resource. Possible error codes: *
   * PERMISSION_DENIED: The reseller account making the request is different
   * from the reseller account in the API request. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * NOT_FOUND: The customer
   * resource doesn't exist. Usually the result of an invalid name parameter.
   * Return value: The Customer resource.
   *
   * @param name Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsChannelPartnerLinksCustomersGet(name: string): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Imports a Customer from the Cloud Identity associated with the provided
   * Cloud Identity ID or domain before a TransferEntitlements call. If a linked
   * Customer already exists and overwrite_if_exists is true, it will update
   * that Customer's data. Possible error codes: * PERMISSION_DENIED: The
   * reseller account making the request is different from the reseller account
   * in the API request. * NOT_FOUND: Cloud Identity doesn't exist or was
   * deleted. * INVALID_ARGUMENT: Required parameters are missing, or the
   * auth_token is expired or invalid. * ALREADY_EXISTS: A customer already
   * exists and has conflicting critical fields. Requires an overwrite. Return
   * value: The Customer.
   *
   * @param parent Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id}
   */
  async accountsChannelPartnerLinksCustomersImport(parent: string, req: GoogleCloudChannelV1ImportCustomerRequest): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * List Customers. Possible error codes: * PERMISSION_DENIED: The reseller
   * account making the request is different from the reseller account in the
   * API request. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. Return value: List of Customers, or an empty list if there are no
   * customers.
   *
   * @param parent Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}.
   */
  async accountsChannelPartnerLinksCustomersList(parent: string, opts: AccountsChannelPartnerLinksCustomersListOptions = {}): Promise<GoogleCloudChannelV1ListCustomersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
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
    return data as GoogleCloudChannelV1ListCustomersResponse;
  }

  /**
   * Updates an existing Customer resource for the reseller or distributor.
   * Possible error codes: * PERMISSION_DENIED: The reseller account making the
   * request is different from the reseller account in the API request. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: No Customer resource found for the name in the request. Return
   * value: The updated Customer resource.
   *
   * @param name Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsChannelPartnerLinksCustomersPatch(name: string, req: GoogleCloudChannelV1Customer, opts: AccountsChannelPartnerLinksCustomersPatchOptions = {}): Promise<GoogleCloudChannelV1Customer> {
    opts = serializeAccountsChannelPartnerLinksCustomersPatchOptions(opts);
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
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Returns the requested ChannelPartnerLink resource. You must be a
   * distributor to call this method. Possible error codes: * PERMISSION_DENIED:
   * The reseller account making the request is different from the reseller
   * account in the API request. * INVALID_ARGUMENT: Required request parameters
   * are missing or invalid. * NOT_FOUND: ChannelPartnerLink resource not found
   * because of an invalid channel partner link name. Return value: The
   * ChannelPartnerLink resource.
   *
   * @param name Required. The resource name of the channel partner link to retrieve. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner.
   */
  async accountsChannelPartnerLinksGet(name: string, opts: AccountsChannelPartnerLinksGetOptions = {}): Promise<GoogleCloudChannelV1ChannelPartnerLink> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudChannelV1ChannelPartnerLink;
  }

  /**
   * List ChannelPartnerLinks belonging to a distributor. You must be a
   * distributor to call this method. Possible error codes: * PERMISSION_DENIED:
   * The reseller account making the request is different from the reseller
   * account in the API request. * INVALID_ARGUMENT: Required request parameters
   * are missing or invalid. Return value: The list of the distributor account's
   * ChannelPartnerLink resources.
   *
   * @param parent Required. The resource name of the reseller account for listing channel partner links. Parent uses the format: accounts/{account_id}
   */
  async accountsChannelPartnerLinksList(parent: string, opts: AccountsChannelPartnerLinksListOptions = {}): Promise<GoogleCloudChannelV1ListChannelPartnerLinksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelPartnerLinks`);
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
    return data as GoogleCloudChannelV1ListChannelPartnerLinksResponse;
  }

  /**
   * Updates a channel partner link. Distributors call this method to change a
   * link's status. For example, to suspend a partner link. You must be a
   * distributor to call this method. Possible error codes: * PERMISSION_DENIED:
   * The reseller account making the request is different from the reseller
   * account in the API request. * INVALID_ARGUMENT: * Required request
   * parameters are missing or invalid. * Link state cannot change from invited
   * to active or suspended. * Cannot send reseller_cloud_identity_id,
   * invite_url, or name in update mask. * NOT_FOUND: ChannelPartnerLink
   * resource not found. * INTERNAL: Any non-user error related to a technical
   * issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. Return value: The updated ChannelPartnerLink resource.
   *
   * @param name Required. The resource name of the channel partner link to cancel. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner.
   */
  async accountsChannelPartnerLinksPatch(name: string, req: GoogleCloudChannelV1UpdateChannelPartnerLinkRequest): Promise<GoogleCloudChannelV1ChannelPartnerLink> {
    req = serializeGoogleCloudChannelV1UpdateChannelPartnerLinkRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudChannelV1ChannelPartnerLink;
  }

  /**
   * Confirms the existence of Cloud Identity accounts based on the domain and
   * if the Cloud Identity accounts are owned by the reseller. Possible error
   * codes: * PERMISSION_DENIED: The reseller account making the request is
   * different from the reseller account in the API request. * INVALID_ARGUMENT:
   * Required request parameters are missing or invalid. * INVALID_VALUE:
   * Invalid domain value in the request. Return value: A list of
   * CloudIdentityCustomerAccount resources for the domain (may be empty) Note:
   * in the v1alpha1 version of the API, a NOT_FOUND error returns if no
   * CloudIdentityCustomerAccount resources match the domain.
   *
   * @param parent Required. The reseller account's resource name. Parent uses the format: accounts/{account_id}
   */
  async accountsCheckCloudIdentityAccountsExist(parent: string, req: GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest): Promise<GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:checkCloudIdentityAccountsExist`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse;
  }

  /**
   * Creates a new Customer resource under the reseller or distributor account.
   * Possible error codes: * PERMISSION_DENIED: The reseller account making the
   * request is different from the reseller account in the API request. *
   * INVALID_ARGUMENT: * Required request parameters are missing or invalid. *
   * Domain field value doesn't match the primary email domain. Return value:
   * The newly created Customer resource.
   *
   * @param parent Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id}
   */
  async accountsCustomersCreate(parent: string, req: GoogleCloudChannelV1Customer): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Creates a CustomerRepricingConfig. Call this method to set modifications
   * for a specific customer's bill. You can only create configs if the
   * RepricingConfig.effective_invoice_month is a future month. If needed, you
   * can create a config for the current month, with some restrictions. When
   * creating a config for a future month, make sure there are no existing
   * configs for that RepricingConfig.effective_invoice_month. The following
   * restrictions are for creating configs in the current month. * This
   * functionality is reserved for recovering from an erroneous config, and
   * should not be used for regular business cases. * The new config will not
   * modify exports used with other configs. Changes to the config may be
   * immediate, but may take up to 24 hours. * There is a limit of ten configs
   * for any RepricingConfig.EntitlementGranularity.entitlement or
   * RepricingConfig.effective_invoice_month. * The contained
   * CustomerRepricingConfig.repricing_config vaule must be different from the
   * value used in the current config for a
   * RepricingConfig.EntitlementGranularity.entitlement. Possible Error Codes: *
   * PERMISSION_DENIED: If the account making the request and the account being
   * queried are different. * INVALID_ARGUMENT: Missing or invalid required
   * parameters in the request. Also displays if the updated config is for the
   * current month or past months. * NOT_FOUND: The CustomerRepricingConfig
   * specified does not exist or is not associated with the given account. *
   * INTERNAL: Any non-user error related to technical issues in the backend. In
   * this case, contact Cloud Channel support. Return Value: If successful, the
   * updated CustomerRepricingConfig resource, otherwise returns an error.
   *
   * @param parent Required. The resource name of the customer that will receive this repricing config. Parent uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersCustomerRepricingConfigsCreate(parent: string, req: GoogleCloudChannelV1CustomerRepricingConfig): Promise<GoogleCloudChannelV1CustomerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customerRepricingConfigs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1CustomerRepricingConfig;
  }

  /**
   * Deletes the given CustomerRepricingConfig permanently. You can only delete
   * configs if their RepricingConfig.effective_invoice_month is set to a date
   * after the current month. Possible error codes: * PERMISSION_DENIED: The
   * account making the request does not own this customer. * INVALID_ARGUMENT:
   * Required request parameters are missing or invalid. * FAILED_PRECONDITION:
   * The CustomerRepricingConfig is active or in the past. * NOT_FOUND: No
   * CustomerRepricingConfig found for the name in the request.
   *
   * @param name Required. The resource name of the customer repricing config rule to delete. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}.
   */
  async accountsCustomersCustomerRepricingConfigsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets information about how a Reseller modifies their bill before sending
   * it to a Customer. Possible Error Codes: * PERMISSION_DENIED: If the account
   * making the request and the account being queried are different. *
   * NOT_FOUND: The CustomerRepricingConfig was not found. * INTERNAL: Any
   * non-user error related to technical issues in the backend. In this case,
   * contact Cloud Channel support. Return Value: If successful, the
   * CustomerRepricingConfig resource, otherwise returns an error.
   *
   * @param name Required. The resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}.
   */
  async accountsCustomersCustomerRepricingConfigsGet(name: string): Promise<GoogleCloudChannelV1CustomerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudChannelV1CustomerRepricingConfig;
  }

  /**
   * Lists information about how a Reseller modifies their bill before sending
   * it to a Customer. Possible Error Codes: * PERMISSION_DENIED: If the account
   * making the request and the account being queried are different. *
   * NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not
   * associated with the given account. * INTERNAL: Any non-user error related
   * to technical issues in the backend. In this case, contact Cloud Channel
   * support. Return Value: If successful, the CustomerRepricingConfig
   * resources. The data for each resource is displayed in the ascending order
   * of: * customer ID * RepricingConfig.EntitlementGranularity.entitlement *
   * RepricingConfig.effective_invoice_month *
   * CustomerRepricingConfig.update_time If unsuccessful, returns an error.
   *
   * @param parent Required. The resource name of the customer. Parent uses the format: accounts/{account_id}/customers/{customer_id}. Supports accounts/{account_id}/customers/- to retrieve configs for all customers.
   */
  async accountsCustomersCustomerRepricingConfigsList(parent: string, opts: AccountsCustomersCustomerRepricingConfigsListOptions = {}): Promise<GoogleCloudChannelV1ListCustomerRepricingConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customerRepricingConfigs`);
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
    return data as GoogleCloudChannelV1ListCustomerRepricingConfigsResponse;
  }

  /**
   * Updates a CustomerRepricingConfig. Call this method to set modifications
   * for a specific customer's bill. This method overwrites the existing
   * CustomerRepricingConfig. You can only update configs if the
   * RepricingConfig.effective_invoice_month is a future month. To make changes
   * to configs for the current month, use CreateCustomerRepricingConfig, taking
   * note of its restrictions. You cannot update the
   * RepricingConfig.effective_invoice_month. When updating a config in the
   * future: * This config must already exist. Possible Error Codes: *
   * PERMISSION_DENIED: If the account making the request and the account being
   * queried are different. * INVALID_ARGUMENT: Missing or invalid required
   * parameters in the request. Also displays if the updated config is for the
   * current month or past months. * NOT_FOUND: The CustomerRepricingConfig
   * specified does not exist or is not associated with the given account. *
   * INTERNAL: Any non-user error related to technical issues in the backend. In
   * this case, contact Cloud Channel support. Return Value: If successful, the
   * updated CustomerRepricingConfig resource, otherwise returns an error.
   *
   * @param name Output only. Resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}.
   */
  async accountsCustomersCustomerRepricingConfigsPatch(name: string, req: GoogleCloudChannelV1CustomerRepricingConfig): Promise<GoogleCloudChannelV1CustomerRepricingConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudChannelV1CustomerRepricingConfig;
  }

  /**
   * Deletes the given Customer permanently. Possible error codes: *
   * PERMISSION_DENIED: The account making the request does not own this
   * customer. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * FAILED_PRECONDITION: The customer has existing entitlements. *
   * NOT_FOUND: No Customer resource found for the name in the request.
   *
   * @param name Required. The resource name of the customer to delete.
   */
  async accountsCustomersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Activates a previously suspended entitlement. Entitlements suspended for
   * pending ToS acceptance can't be activated using this method. An entitlement
   * activation is a long-running operation and it updates the state of the
   * customer entitlement. Possible error codes: * PERMISSION_DENIED: The
   * reseller account making the request is different from the reseller account
   * in the API request. * INVALID_ARGUMENT: Required request parameters are
   * missing or invalid. * NOT_FOUND: Entitlement resource not found. *
   * SUSPENSION_NOT_RESELLER_INITIATED: Can only activate reseller-initiated
   * suspensions and entitlements that have accepted the TOS. * NOT_SUSPENDED:
   * Can only activate suspended entitlements not in an ACTIVE state. *
   * INTERNAL: Any non-user error related to a technical issue in the backend.
   * Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a
   * technical issue in the backend. Contact Cloud Channel support. Return
   * value: The ID of a long-running operation. To get the results of the
   * operation, call the GetOperation method of CloudChannelOperationsService.
   * The Operation metadata will contain an instance of OperationMetadata.
   *
   * @param name Required. The resource name of the entitlement to activate. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsActivate(name: string, req: GoogleCloudChannelV1ActivateEntitlementRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Cancels a previously fulfilled entitlement. An entitlement cancellation is
   * a long-running operation. Possible error codes: * PERMISSION_DENIED: The
   * reseller account making the request is different from the reseller account
   * in the API request. * FAILED_PRECONDITION: There are Google Cloud projects
   * linked to the Google Cloud entitlement's Cloud Billing subaccount. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: Entitlement resource not found. * DELETION_TYPE_NOT_ALLOWED:
   * Cancel is only allowed for Google Workspace add-ons, or entitlements for
   * Google Cloud's development platform. * INTERNAL: Any non-user error related
   * to a technical issue in the backend. Contact Cloud Channel support. *
   * UNKNOWN: Any non-user error related to a technical issue in the backend.
   * Contact Cloud Channel support. Return value: The ID of a long-running
   * operation. To get the results of the operation, call the GetOperation
   * method of CloudChannelOperationsService. The response will contain
   * google.protobuf.Empty on success. The Operation metadata will contain an
   * instance of OperationMetadata.
   *
   * @param name Required. The resource name of the entitlement to cancel. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsCancel(name: string, req: GoogleCloudChannelV1CancelEntitlementRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates the Offer for an existing customer entitlement. An entitlement
   * update is a long-running operation and it updates the entitlement as a
   * result of fulfillment. Possible error codes: * PERMISSION_DENIED: The
   * customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * NOT_FOUND: Offer or
   * Entitlement resource not found. * INTERNAL: Any non-user error related to a
   * technical issue in the backend. Contact Cloud Channel support. * UNKNOWN:
   * Any non-user error related to a technical issue in the backend. Contact
   * Cloud Channel support. Return value: The ID of a long-running operation. To
   * get the results of the operation, call the GetOperation method of
   * CloudChannelOperationsService. The Operation metadata will contain an
   * instance of OperationMetadata.
   *
   * @param name Required. The resource name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsChangeOffer(name: string, req: GoogleCloudChannelV1ChangeOfferRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1ChangeOfferRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:changeOffer`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Change parameters of the entitlement. An entitlement update is a
   * long-running operation and it updates the entitlement as a result of
   * fulfillment. Possible error codes: * PERMISSION_DENIED: The customer
   * doesn't belong to the reseller. * INVALID_ARGUMENT: Required request
   * parameters are missing or invalid. For example, the number of seats being
   * changed is greater than the allowed number of max seats, or decreasing
   * seats for a commitment based plan. * NOT_FOUND: Entitlement resource not
   * found. * INTERNAL: Any non-user error related to a technical issue in the
   * backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error
   * related to a technical issue in the backend. Contact Cloud Channel support.
   * Return value: The ID of a long-running operation. To get the results of the
   * operation, call the GetOperation method of CloudChannelOperationsService.
   * The Operation metadata will contain an instance of OperationMetadata.
   *
   * @param name Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsChangeParameters(name: string, req: GoogleCloudChannelV1ChangeParametersRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1ChangeParametersRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:changeParameters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates the renewal settings for an existing customer entitlement. An
   * entitlement update is a long-running operation and it updates the
   * entitlement as a result of fulfillment. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: Entitlement resource not found. * NOT_COMMITMENT_PLAN: Renewal
   * Settings are only applicable for a commitment plan. Can't enable or disable
   * renewals for non-commitment plans. * INTERNAL: Any non-user error related
   * to a technical issue in the backend. Contact Cloud Channel support. *
   * UNKNOWN: Any non-user error related to a technical issue in the backend.
   * Contact Cloud Channel support. Return value: The ID of a long-running
   * operation. To get the results of the operation, call the GetOperation
   * method of CloudChannelOperationsService. The Operation metadata will
   * contain an instance of OperationMetadata.
   *
   * @param name Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsChangeRenewalSettings(name: string, req: GoogleCloudChannelV1ChangeRenewalSettingsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:changeRenewalSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates an entitlement for a customer. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: * Required request parameters are missing or invalid. *
   * There is already a customer entitlement for a SKU from the same product
   * family. * INVALID_VALUE: Make sure the OfferId is valid. If it is, contact
   * Google Channel support for further troubleshooting. * NOT_FOUND: The
   * customer or offer resource was not found. * ALREADY_EXISTS: * The SKU was
   * already purchased for the customer. * The customer's primary email already
   * exists. Retry after changing the customer's primary contact email. *
   * CONDITION_NOT_MET or FAILED_PRECONDITION: * The domain required for
   * purchasing a SKU has not been verified. * A pre-requisite SKU required to
   * purchase an Add-On SKU is missing. For example, Google Workspace Business
   * Starter is required to purchase Vault or Drive. * (Developer accounts only)
   * Reseller and resold domain must meet the following naming requirements: *
   * Domain names must start with goog-test. * Domain names must include the
   * reseller domain. * INTERNAL: Any non-user error related to a technical
   * issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. Return value: The ID of a long-running operation. To get
   * the results of the operation, call the GetOperation method of
   * CloudChannelOperationsService. The Operation metadata will contain an
   * instance of OperationMetadata.
   *
   * @param parent Required. The resource name of the reseller's customer account in which to create the entitlement. Parent uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersEntitlementsCreate(parent: string, req: GoogleCloudChannelV1CreateEntitlementRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1CreateEntitlementRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entitlements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Returns the requested Entitlement resource. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: The customer entitlement was not found. Return value: The
   * requested Entitlement resource.
   *
   * @param name Required. The resource name of the entitlement to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsGet(name: string): Promise<GoogleCloudChannelV1Entitlement> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudChannelV1Entitlement(data);
  }

  /**
   * Lists Entitlements belonging to a customer. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid.
   * Return value: A list of the customer's Entitlements.
   *
   * @param parent Required. The resource name of the reseller's customer account to list entitlements for. Parent uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersEntitlementsList(parent: string, opts: AccountsCustomersEntitlementsListOptions = {}): Promise<GoogleCloudChannelV1ListEntitlementsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entitlements`);
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
    return deserializeGoogleCloudChannelV1ListEntitlementsResponse(data);
  }

  /**
   * List entitlement history. Possible error codes: * PERMISSION_DENIED: The
   * reseller account making the request and the provided reseller account are
   * different. * INVALID_ARGUMENT: Missing or invalid required fields in the
   * request. * NOT_FOUND: The parent resource doesn't exist. Usually the result
   * of an invalid name parameter. * INTERNAL: Any non-user error related to a
   * technical issue in the backend. In this case, contact CloudChannel support.
   * * UNKNOWN: Any non-user error related to a technical issue in the backend.
   * In this case, contact Cloud Channel support. Return value: List of
   * EntitlementChanges.
   *
   * @param parent Required. The resource name of the entitlement for which to list entitlement changes. The `-` wildcard may be used to match entitlements across a customer. Formats: * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} * accounts/{account_id}/customers/{customer_id}/entitlements/-
   */
  async accountsCustomersEntitlementsListEntitlementChanges(parent: string, opts: AccountsCustomersEntitlementsListEntitlementChangesOptions = {}): Promise<GoogleCloudChannelV1ListEntitlementChangesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:listEntitlementChanges`);
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
    return deserializeGoogleCloudChannelV1ListEntitlementChangesResponse(data);
  }

  /**
   * Returns the requested Offer resource. Possible error codes: *
   * PERMISSION_DENIED: The entitlement doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: Entitlement or offer was not found. Return value: The Offer
   * resource.
   *
   * @param entitlement Required. The resource name of the entitlement to retrieve the Offer. Entitlement uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsLookupOffer(entitlement: string): Promise<GoogleCloudChannelV1Offer> {
    const url = new URL(`${this.#baseUrl}v1/${ entitlement }:lookupOffer`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudChannelV1Offer(data);
  }

  /**
   * Starts paid service for a trial entitlement. Starts paid service for a
   * trial entitlement immediately. This method is only applicable if a plan is
   * set up for a trial entitlement but has some trial days remaining. Possible
   * error codes: * PERMISSION_DENIED: The customer doesn't belong to the
   * reseller. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * NOT_FOUND: Entitlement resource not found. *
   * FAILED_PRECONDITION/NOT_IN_TRIAL: This method only works for entitlement on
   * trial plans. * INTERNAL: Any non-user error related to a technical issue in
   * the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error
   * related to a technical issue in the backend. Contact Cloud Channel support.
   * Return value: The ID of a long-running operation. To get the results of the
   * operation, call the GetOperation method of CloudChannelOperationsService.
   * The Operation metadata will contain an instance of OperationMetadata.
   *
   * @param name Required. The name of the entitlement to start a paid service for. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsStartPaidService(name: string, req: GoogleCloudChannelV1StartPaidServiceRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:startPaidService`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Suspends a previously fulfilled entitlement. An entitlement suspension is
   * a long-running operation. Possible error codes: * PERMISSION_DENIED: The
   * customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * NOT_FOUND: Entitlement
   * resource not found. * NOT_ACTIVE: Entitlement is not active. * INTERNAL:
   * Any non-user error related to a technical issue in the backend. Contact
   * Cloud Channel support. * UNKNOWN: Any non-user error related to a technical
   * issue in the backend. Contact Cloud Channel support. Return value: The ID
   * of a long-running operation. To get the results of the operation, call the
   * GetOperation method of CloudChannelOperationsService. The Operation
   * metadata will contain an instance of OperationMetadata.
   *
   * @param name Required. The resource name of the entitlement to suspend. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  async accountsCustomersEntitlementsSuspend(name: string, req: GoogleCloudChannelV1SuspendEntitlementRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:suspend`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Returns the requested Customer resource. Possible error codes: *
   * PERMISSION_DENIED: The reseller account making the request is different
   * from the reseller account in the API request. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * NOT_FOUND: The customer
   * resource doesn't exist. Usually the result of an invalid name parameter.
   * Return value: The Customer resource.
   *
   * @param name Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersGet(name: string): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Imports a Customer from the Cloud Identity associated with the provided
   * Cloud Identity ID or domain before a TransferEntitlements call. If a linked
   * Customer already exists and overwrite_if_exists is true, it will update
   * that Customer's data. Possible error codes: * PERMISSION_DENIED: The
   * reseller account making the request is different from the reseller account
   * in the API request. * NOT_FOUND: Cloud Identity doesn't exist or was
   * deleted. * INVALID_ARGUMENT: Required parameters are missing, or the
   * auth_token is expired or invalid. * ALREADY_EXISTS: A customer already
   * exists and has conflicting critical fields. Requires an overwrite. Return
   * value: The Customer.
   *
   * @param parent Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id}
   */
  async accountsCustomersImport(parent: string, req: GoogleCloudChannelV1ImportCustomerRequest): Promise<GoogleCloudChannelV1Customer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * List Customers. Possible error codes: * PERMISSION_DENIED: The reseller
   * account making the request is different from the reseller account in the
   * API request. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. Return value: List of Customers, or an empty list if there are no
   * customers.
   *
   * @param parent Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}.
   */
  async accountsCustomersList(parent: string, opts: AccountsCustomersListOptions = {}): Promise<GoogleCloudChannelV1ListCustomersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
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
    return data as GoogleCloudChannelV1ListCustomersResponse;
  }

  /**
   * Lists the following: * Offers that you can purchase for a customer. *
   * Offers that you can change for an entitlement. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid.
   *
   * @param customer Required. The resource name of the customer to list Offers for. Format: accounts/{account_id}/customers/{customer_id}.
   */
  async accountsCustomersListPurchasableOffers(customer: string, opts: AccountsCustomersListPurchasableOffersOptions = {}): Promise<GoogleCloudChannelV1ListPurchasableOffersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }:listPurchasableOffers`);
    if (opts["changeOfferPurchase.entitlement"] !== undefined) {
      url.searchParams.append("changeOfferPurchase.entitlement", String(opts["changeOfferPurchase.entitlement"]));
    }
    if (opts["changeOfferPurchase.newSku"] !== undefined) {
      url.searchParams.append("changeOfferPurchase.newSku", String(opts["changeOfferPurchase.newSku"]));
    }
    if (opts["createEntitlementPurchase.sku"] !== undefined) {
      url.searchParams.append("createEntitlementPurchase.sku", String(opts["createEntitlementPurchase.sku"]));
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
    return deserializeGoogleCloudChannelV1ListPurchasableOffersResponse(data);
  }

  /**
   * Lists the following: * SKUs that you can purchase for a customer * SKUs
   * that you can upgrade or downgrade for an entitlement. Possible error codes:
   * * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid.
   *
   * @param customer Required. The resource name of the customer to list SKUs for. Format: accounts/{account_id}/customers/{customer_id}.
   */
  async accountsCustomersListPurchasableSkus(customer: string, opts: AccountsCustomersListPurchasableSkusOptions = {}): Promise<GoogleCloudChannelV1ListPurchasableSkusResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }:listPurchasableSkus`);
    if (opts["changeOfferPurchase.changeType"] !== undefined) {
      url.searchParams.append("changeOfferPurchase.changeType", String(opts["changeOfferPurchase.changeType"]));
    }
    if (opts["changeOfferPurchase.entitlement"] !== undefined) {
      url.searchParams.append("changeOfferPurchase.entitlement", String(opts["changeOfferPurchase.entitlement"]));
    }
    if (opts["createEntitlementPurchase.product"] !== undefined) {
      url.searchParams.append("createEntitlementPurchase.product", String(opts["createEntitlementPurchase.product"]));
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
    return data as GoogleCloudChannelV1ListPurchasableSkusResponse;
  }

  /**
   * Updates an existing Customer resource for the reseller or distributor.
   * Possible error codes: * PERMISSION_DENIED: The reseller account making the
   * request is different from the reseller account in the API request. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: No Customer resource found for the name in the request. Return
   * value: The updated Customer resource.
   *
   * @param name Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersPatch(name: string, req: GoogleCloudChannelV1Customer, opts: AccountsCustomersPatchOptions = {}): Promise<GoogleCloudChannelV1Customer> {
    opts = serializeAccountsCustomersPatchOptions(opts);
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
    return data as GoogleCloudChannelV1Customer;
  }

  /**
   * Creates a Cloud Identity for the given customer using the customer's
   * information, or the information provided here. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: The customer was not found. * ALREADY_EXISTS: The customer's
   * primary email already exists. Retry after changing the customer's primary
   * contact email. * INTERNAL: Any non-user error related to a technical issue
   * in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user
   * error related to a technical issue in the backend. Contact Cloud Channel
   * support. Return value: The ID of a long-running operation. To get the
   * results of the operation, call the GetOperation method of
   * CloudChannelOperationsService. The Operation metadata contains an instance
   * of OperationMetadata.
   *
   * @param customer Required. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersProvisionCloudIdentity(customer: string, req: GoogleCloudChannelV1ProvisionCloudIdentityRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }:provisionCloudIdentity`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Transfers customer entitlements to new reseller. Possible error codes: *
   * PERMISSION_DENIED: The customer doesn't belong to the reseller. *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid. *
   * NOT_FOUND: The customer or offer resource was not found. * ALREADY_EXISTS:
   * The SKU was already transferred for the customer. * CONDITION_NOT_MET or
   * FAILED_PRECONDITION: * The SKU requires domain verification to transfer,
   * but the domain is not verified. * An Add-On SKU (example, Vault or Drive)
   * is missing the pre-requisite SKU (example, G Suite Basic). * (Developer
   * accounts only) Reseller and resold domain must meet the following naming
   * requirements: * Domain names must start with goog-test. * Domain names must
   * include the reseller domain. * Specify all transferring entitlements. *
   * INTERNAL: Any non-user error related to a technical issue in the backend.
   * Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a
   * technical issue in the backend. Contact Cloud Channel support. Return
   * value: The ID of a long-running operation. To get the results of the
   * operation, call the GetOperation method of CloudChannelOperationsService.
   * The Operation metadata will contain an instance of OperationMetadata.
   *
   * @param parent Required. The resource name of the reseller's customer account that will receive transferred entitlements. Parent uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersTransferEntitlements(parent: string, req: GoogleCloudChannelV1TransferEntitlementsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1TransferEntitlementsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:transferEntitlements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Transfers customer entitlements from their current reseller to Google.
   * Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to
   * the reseller. * INVALID_ARGUMENT: Required request parameters are missing
   * or invalid. * NOT_FOUND: The customer or offer resource was not found. *
   * ALREADY_EXISTS: The SKU was already transferred for the customer. *
   * CONDITION_NOT_MET or FAILED_PRECONDITION: * The SKU requires domain
   * verification to transfer, but the domain is not verified. * An Add-On SKU
   * (example, Vault or Drive) is missing the pre-requisite SKU (example, G
   * Suite Basic). * (Developer accounts only) Reseller and resold domain must
   * meet the following naming requirements: * Domain names must start with
   * goog-test. * Domain names must include the reseller domain. * INTERNAL: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. * UNKNOWN: Any non-user error related to a technical issue
   * in the backend. Contact Cloud Channel support. Return value: The ID of a
   * long-running operation. To get the results of the operation, call the
   * GetOperation method of CloudChannelOperationsService. The response will
   * contain google.protobuf.Empty on success. The Operation metadata will
   * contain an instance of OperationMetadata.
   *
   * @param parent Required. The resource name of the reseller's customer account where the entitlements transfer from. Parent uses the format: accounts/{account_id}/customers/{customer_id}
   */
  async accountsCustomersTransferEntitlementsToGoogle(parent: string, req: GoogleCloudChannelV1TransferEntitlementsToGoogleRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1TransferEntitlementsToGoogleRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:transferEntitlementsToGoogle`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists service accounts with subscriber privileges on the Cloud Pub/Sub
   * topic created for this Channel Services account. Possible error codes: *
   * PERMISSION_DENIED: The reseller account making the request and the provided
   * reseller account are different, or the impersonated user is not a super
   * admin. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. * UNKNOWN: Any non-user error related to a technical issue
   * in the backend. Contact Cloud Channel support. Return value: A list of
   * service email addresses.
   *
   * @param account Required. Resource name of the account.
   */
  async accountsListSubscribers(account: string, opts: AccountsListSubscribersOptions = {}): Promise<GoogleCloudChannelV1ListSubscribersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ account }:listSubscribers`);
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
    return data as GoogleCloudChannelV1ListSubscribersResponse;
  }

  /**
   * List TransferableOffers of a customer based on Cloud Identity ID or
   * Customer Name in the request. Use this method when a reseller gets the
   * entitlement information of an unowned customer. The reseller should provide
   * the customer's Cloud Identity ID or Customer Name. Possible error codes: *
   * PERMISSION_DENIED: * The customer doesn't belong to the reseller and has no
   * auth token. * The customer provided incorrect reseller information when
   * generating auth token. * The reseller account making the request is
   * different from the reseller account in the query. * INVALID_ARGUMENT:
   * Required request parameters are missing or invalid. Return value: List of
   * TransferableOffer for the given customer and SKU.
   *
   * @param parent Required. The resource name of the reseller's account.
   */
  async accountsListTransferableOffers(parent: string, req: GoogleCloudChannelV1ListTransferableOffersRequest): Promise<GoogleCloudChannelV1ListTransferableOffersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:listTransferableOffers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudChannelV1ListTransferableOffersResponse(data);
  }

  /**
   * List TransferableSkus of a customer based on the Cloud Identity ID or
   * Customer Name in the request. Use this method to list the entitlements
   * information of an unowned customer. You should provide the customer's Cloud
   * Identity ID or Customer Name. Possible error codes: * PERMISSION_DENIED: *
   * The customer doesn't belong to the reseller and has no auth token. * The
   * supplied auth token is invalid. * The reseller account making the request
   * is different from the reseller account in the query. * INVALID_ARGUMENT:
   * Required request parameters are missing or invalid. Return value: A list of
   * the customer's TransferableSku.
   *
   * @param parent Required. The reseller account's resource name. Parent uses the format: accounts/{account_id}
   */
  async accountsListTransferableSkus(parent: string, req: GoogleCloudChannelV1ListTransferableSkusRequest): Promise<GoogleCloudChannelV1ListTransferableSkusResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:listTransferableSkus`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1ListTransferableSkusResponse;
  }

  /**
   * Lists the Offers the reseller can sell. Possible error codes: *
   * INVALID_ARGUMENT: Required request parameters are missing or invalid.
   *
   * @param parent Required. The resource name of the reseller account from which to list Offers. Parent uses the format: accounts/{account_id}.
   */
  async accountsOffersList(parent: string, opts: AccountsOffersListOptions = {}): Promise<GoogleCloudChannelV1ListOffersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/offers`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    if (opts.showFutureOffers !== undefined) {
      url.searchParams.append("showFutureOffers", String(opts.showFutureOffers));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudChannelV1ListOffersResponse(data);
  }

  /**
   * Registers a service account with subscriber privileges on the Cloud
   * Pub/Sub topic for this Channel Services account. After you create a
   * subscriber, you get the events through SubscriberEvent Possible error
   * codes: * PERMISSION_DENIED: The reseller account making the request and the
   * provided reseller account are different, or the impersonated user is not a
   * super admin. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * INTERNAL: Any non-user error related to a technical issue in the
   * backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error
   * related to a technical issue in the backend. Contact Cloud Channel support.
   * Return value: The topic name with the registered service email address.
   *
   * @param account Required. Resource name of the account.
   */
  async accountsRegister(account: string, req: GoogleCloudChannelV1RegisterSubscriberRequest): Promise<GoogleCloudChannelV1RegisterSubscriberResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ account }:register`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1RegisterSubscriberResponse;
  }

  /**
   * Retrieves data generated by CloudChannelReportsService.RunReportJob.
   *
   * @param reportJob Required. The report job created by CloudChannelReportsService.RunReportJob. Report_job uses the format: accounts/{account_id}/reportJobs/{report_job_id}
   */
  async accountsReportJobsFetchReportResults(reportJob: string, req: GoogleCloudChannelV1FetchReportResultsRequest): Promise<GoogleCloudChannelV1FetchReportResultsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ reportJob }:fetchReportResults`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudChannelV1FetchReportResultsResponse(data);
  }

  /**
   * Lists the reports that RunReportJob can run. These reports include an ID,
   * a description, and the list of columns that will be in the result.
   *
   * @param parent Required. The resource name of the partner account to list available reports for. Parent uses the format: accounts/{account_id}
   */
  async accountsReportsList(parent: string, opts: AccountsReportsListOptions = {}): Promise<GoogleCloudChannelV1ListReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reports`);
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
    return data as GoogleCloudChannelV1ListReportsResponse;
  }

  /**
   * Begins generation of data for a given report. The report identifier is a
   * UID (for example, `613bf59q`). Possible error codes: * PERMISSION_DENIED:
   * The user doesn't have access to this report. * INVALID_ARGUMENT: Required
   * request parameters are missing or invalid. * NOT_FOUND: The report
   * identifier was not found. * INTERNAL: Any non-user error related to a
   * technical issue in the backend. Contact Cloud Channel support. * UNKNOWN:
   * Any non-user error related to a technical issue in the backend. Contact
   * Cloud Channel support. Return value: The ID of a long-running operation. To
   * get the results of the operation, call the GetOperation method of
   * CloudChannelOperationsService. The Operation metadata contains an instance
   * of OperationMetadata. To get the results of report generation, call
   * CloudChannelReportsService.FetchReportResults with the
   * RunReportJobResponse.report_job.
   *
   * @param name Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id}
   */
  async accountsReportsRun(name: string, req: GoogleCloudChannelV1RunReportJobRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudChannelV1RunReportJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Unregisters a service account with subscriber privileges on the Cloud
   * Pub/Sub topic created for this Channel Services account. If there are no
   * service accounts left with subscriber privileges, this deletes the topic.
   * You can call ListSubscribers to check for these accounts. Possible error
   * codes: * PERMISSION_DENIED: The reseller account making the request and the
   * provided reseller account are different, or the impersonated user is not a
   * super admin. * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any
   * non-user error related to a technical issue in the backend. Contact Cloud
   * Channel support. * UNKNOWN: Any non-user error related to a technical issue
   * in the backend. Contact Cloud Channel support. Return value: The topic name
   * that unregistered the service email address. Returns a success response if
   * the service email address wasn't registered with the topic.
   *
   * @param account Required. Resource name of the account.
   */
  async accountsUnregister(account: string, req: GoogleCloudChannelV1UnregisterSubscriberRequest): Promise<GoogleCloudChannelV1UnregisterSubscriberResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ account }:unregister`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudChannelV1UnregisterSubscriberResponse;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async operationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async operationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async operationsList(name: string, opts: OperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Lists the Products the reseller is authorized to sell. Possible error
   * codes: * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid.
   *
   */
  async productsList(opts: ProductsListOptions = {}): Promise<GoogleCloudChannelV1ListProductsResponse> {
    const url = new URL(`${this.#baseUrl}v1/products`);
    if (opts.account !== undefined) {
      url.searchParams.append("account", String(opts.account));
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
    return data as GoogleCloudChannelV1ListProductsResponse;
  }

  /**
   * Lists the SKUs for a product the reseller is authorized to sell. Possible
   * error codes: * INVALID_ARGUMENT: Required request parameters are missing or
   * invalid.
   *
   * @param parent Required. The resource name of the Product to list SKUs for. Parent uses the format: products/{product_id}. Supports products/- to retrieve SKUs for all products.
   */
  async productsSkusList(parent: string, opts: ProductsSkusListOptions = {}): Promise<GoogleCloudChannelV1ListSkusResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/skus`);
    if (opts.account !== undefined) {
      url.searchParams.append("account", String(opts.account));
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
    return data as GoogleCloudChannelV1ListSkusResponse;
  }
}

/**
 * Additional options for
 * CloudChannel#accountsChannelPartnerLinksChannelPartnerRepricingConfigsList.
 */
export interface AccountsChannelPartnerLinksChannelPartnerRepricingConfigsListOptions {
  /**
   * Optional. A filter for
   * [CloudChannelService.ListChannelPartnerRepricingConfigs] results
   * (channel_partner_link only). You can use this filter when you support a
   * BatchGet-like query. To use the filter, you must set
   * `parent=accounts/{account_id}/channelPartnerLinks/-`. Example:
   * `channel_partner_link = accounts/account_id/channelPartnerLinks/c1` OR
   * `channel_partner_link = accounts/account_id/channelPartnerLinks/c2`.
   */
  filter?: string;
  /**
   * Optional. The maximum number of repricing configs to return. The service
   * may return fewer than this value. If unspecified, returns a maximum of 50
   * rules. The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results beyond the first page.
   * Obtained through ListChannelPartnerRepricingConfigsResponse.next_page_token
   * of the previous CloudChannelService.ListChannelPartnerRepricingConfigs
   * call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudChannel#accountsChannelPartnerLinksCustomersList.
 */
export interface AccountsChannelPartnerLinksCustomersListOptions {
  /**
   * Optional. Filters applied to the [CloudChannelService.ListCustomers]
   * results. See
   * https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers
   * for more information.
   */
  filter?: string;
  /**
   * Optional. The maximum number of customers to return. The service may
   * return fewer than this value. If unspecified, returns at most 10 customers.
   * The maximum value is 50.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results other than the first page.
   * Obtained through ListCustomersResponse.next_page_token of the previous
   * CloudChannelService.ListCustomers call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudChannel#accountsChannelPartnerLinksCustomersPatch.
 */
export interface AccountsChannelPartnerLinksCustomersPatchOptions {
  /**
   * The update mask that applies to the resource. Optional.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsChannelPartnerLinksCustomersPatchOptions(data: any): AccountsChannelPartnerLinksCustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsChannelPartnerLinksCustomersPatchOptions(data: any): AccountsChannelPartnerLinksCustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudChannel#accountsChannelPartnerLinksGet.
 */
export interface AccountsChannelPartnerLinksGetOptions {
  /**
   * Optional. The level of granularity the ChannelPartnerLink will display.
   */
  view?:  | "UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for CloudChannel#accountsChannelPartnerLinksList.
 */
export interface AccountsChannelPartnerLinksListOptions {
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, server will pick a default size (25). The
   * maximum value is 200; the server will coerce values above 200.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   * Obtained using ListChannelPartnerLinksResponse.next_page_token of the
   * previous CloudChannelService.ListChannelPartnerLinks call.
   */
  pageToken?: string;
  /**
   * Optional. The level of granularity the ChannelPartnerLink will display.
   */
  view?:  | "UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for
 * CloudChannel#accountsCustomersCustomerRepricingConfigsList.
 */
export interface AccountsCustomersCustomerRepricingConfigsListOptions {
  /**
   * Optional. A filter for [CloudChannelService.ListCustomerRepricingConfigs]
   * results (customer only). You can use this filter when you support a
   * BatchGet-like query. To use the filter, you must set
   * `parent=accounts/{account_id}/customers/-`. Example: customer =
   * accounts/account_id/customers/c1 OR customer =
   * accounts/account_id/customers/c2.
   */
  filter?: string;
  /**
   * Optional. The maximum number of repricing configs to return. The service
   * may return fewer than this value. If unspecified, returns a maximum of 50
   * rules. The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results beyond the first page.
   * Obtained through ListCustomerRepricingConfigsResponse.next_page_token of
   * the previous CloudChannelService.ListCustomerRepricingConfigs call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudChannel#accountsCustomersEntitlementsListEntitlementChanges.
 */
export interface AccountsCustomersEntitlementsListEntitlementChangesOptions {
  /**
   * Optional. Filters applied to the list results.
   */
  filter?: string;
  /**
   * Optional. The maximum number of entitlement changes to return. The service
   * may return fewer than this value. If unspecified, returns at most 10
   * entitlement changes. The maximum value is 50; the server will coerce values
   * above 50.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * CloudChannelService.ListEntitlementChanges call. Provide this to retrieve
   * the subsequent page. When paginating, all other parameters provided to
   * CloudChannelService.ListEntitlementChanges must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsCustomersEntitlementsList.
 */
export interface AccountsCustomersEntitlementsListOptions {
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, return at most 50 entitlements. The maximum
   * value is 100; the server will coerce values above 100.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   * Obtained using ListEntitlementsResponse.next_page_token of the previous
   * CloudChannelService.ListEntitlements call.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsCustomersList.
 */
export interface AccountsCustomersListOptions {
  /**
   * Optional. Filters applied to the [CloudChannelService.ListCustomers]
   * results. See
   * https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers
   * for more information.
   */
  filter?: string;
  /**
   * Optional. The maximum number of customers to return. The service may
   * return fewer than this value. If unspecified, returns at most 10 customers.
   * The maximum value is 50.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results other than the first page.
   * Obtained through ListCustomersResponse.next_page_token of the previous
   * CloudChannelService.ListCustomers call.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsCustomersListPurchasableOffers.
 */
export interface AccountsCustomersListPurchasableOffersOptions {
  /**
   * Required. Resource name of the entitlement. Format:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  ["changeOfferPurchase.entitlement"]?: string;
  /**
   * Optional. Resource name of the new target SKU. Provide this SKU when
   * upgrading or downgrading an entitlement. Format:
   * products/{product_id}/skus/{sku_id}
   */
  ["changeOfferPurchase.newSku"]?: string;
  /**
   * Required. SKU that the result should be restricted to. Format:
   * products/{product_id}/skus/{sku_id}.
   */
  ["createEntitlementPurchase.sku"]?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, returns at most 100 Offers. The maximum value is
   * 1000; the server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsCustomersListPurchasableSkus.
 */
export interface AccountsCustomersListPurchasableSkusOptions {
  /**
   * Required. Change Type for the entitlement.
   */
  ["changeOfferPurchase.changeType"]?:  | "CHANGE_TYPE_UNSPECIFIED" | "UPGRADE" | "DOWNGRADE";
  /**
   * Required. Resource name of the entitlement. Format:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  ["changeOfferPurchase.entitlement"]?: string;
  /**
   * Required. List SKUs belonging to this Product. Format:
   * products/{product_id}. Supports products/- to retrieve SKUs for all
   * products.
   */
  ["createEntitlementPurchase.product"]?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, returns at most 100 SKUs. The maximum value is
   * 1000; the server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsCustomersPatch.
 */
export interface AccountsCustomersPatchOptions {
  /**
   * The update mask that applies to the resource. Optional.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsCustomersPatchOptions(data: any): AccountsCustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsCustomersPatchOptions(data: any): AccountsCustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudChannel#accountsListSubscribers.
 */
export interface AccountsListSubscribersOptions {
  /**
   * Optional. The maximum number of service accounts to return. The service
   * may return fewer than this value. If unspecified, returns at most 100
   * service accounts. The maximum value is 1000; the server will coerce values
   * above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListSubscribers` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListSubscribers` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#accountsOffersList.
 */
export interface AccountsOffersListOptions {
  /**
   * Optional. The expression to filter results by name (name of the Offer),
   * sku.name (name of the SKU), or sku.product.name (name of the Product).
   * Example 1: sku.product.name=products/p1 AND sku.name!=products/p1/skus/s1
   * Example 2: name=accounts/a1/offers/o1
   */
  filter?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, returns at most 500 Offers. The maximum value is
   * 1000; the server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   */
  pageToken?: string;
  /**
   * Optional. A boolean flag that determines if a response returns future
   * offers 30 days from now. If the show_future_offers is true, the response
   * will only contain offers that are scheduled to be available 30 days from
   * now.
   */
  showFutureOffers?: boolean;
}

/**
 * Additional options for CloudChannel#accountsReportsList.
 */
export interface AccountsReportsListOptions {
  /**
   * Optional. The BCP-47 language code, such as "en-US". If specified, the
   * response is localized to the corresponding language code if the original
   * data sources support it. Default is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size of the report. The server might return fewer
   * results than requested. If unspecified, returns 20 reports. The maximum
   * value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token that specifies a page of results beyond the first page.
   * Obtained through ListReportsResponse.next_page_token of the previous
   * CloudChannelReportsService.ListReports call.
   */
  pageToken?: string;
}

/**
 * Request message for CloudChannelService.ActivateEntitlement.
 */
export interface GoogleCloudChannelV1ActivateEntitlementRequest {
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

/**
 * Information needed to create an Admin User for Google Workspace.
 */
export interface GoogleCloudChannelV1AdminUser {
  /**
   * Primary email of the admin user.
   */
  email?: string;
  /**
   * Family name of the admin user.
   */
  familyName?: string;
  /**
   * Given name of the admin user.
   */
  givenName?: string;
}

/**
 * Association links that an entitlement has to other entitlements.
 */
export interface GoogleCloudChannelV1alpha1AssociationInfo {
  /**
   * The name of the base entitlement, for which this entitlement is an add-on.
   */
  baseEntitlement?: string;
}

/**
 * Represents Pub/Sub messages about updates to a Channel Partner. You can
 * retrieve updated values through the ChannelPartnerLinks API.
 */
export interface GoogleCloudChannelV1alpha1ChannelPartnerEvent {
  /**
   * Resource name for the Channel Partner Link. Channel_partner uses the
   * format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}
   */
  channelPartner?: string;
  /**
   * Type of event performed on the Channel Partner.
   */
  eventType?:  | "TYPE_UNSPECIFIED" | "LINK_STATE_CHANGED" | "PARTNER_ADVANTAGE_INFO_CHANGED";
}

/**
 * The definition of a report column. Specifies the data properties in the
 * corresponding position of the report rows.
 */
export interface GoogleCloudChannelV1alpha1Column {
  /**
   * The unique name of the column (for example, customer_domain,
   * channel_partner, customer_cost). You can use column IDs in
   * RunReportJobRequest.filter. To see all reports and their columns, call
   * CloudChannelReportsService.ListReports.
   */
  columnId?: string;
  /**
   * The type of the values for this column.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING" | "INT" | "DECIMAL" | "MONEY" | "DATE" | "DATE_TIME";
  /**
   * The column's display name.
   */
  displayName?: string;
}

/**
 * Commitment settings for commitment-based offers.
 */
export interface GoogleCloudChannelV1alpha1CommitmentSettings {
  /**
   * Output only. Commitment end timestamp.
   */
  readonly endTime?: Date;
  /**
   * Optional. Renewal settings applicable for a commitment-based Offer.
   */
  renewalSettings?: GoogleCloudChannelV1alpha1RenewalSettings;
  /**
   * Output only. Commitment start timestamp.
   */
  readonly startTime?: Date;
}

/**
 * Represents Pub/Sub message content describing customer update.
 */
export interface GoogleCloudChannelV1alpha1CustomerEvent {
  /**
   * Resource name of the customer. Format:
   * accounts/{account_id}/customers/{customer_id}
   */
  customer?: string;
  /**
   * Type of event which happened on the customer.
   */
  eventType?:  | "TYPE_UNSPECIFIED" | "PRIMARY_DOMAIN_CHANGED" | "PRIMARY_DOMAIN_VERIFIED";
}

/**
 * A representation of usage or invoice date ranges.
 */
export interface GoogleCloudChannelV1alpha1DateRange {
  /**
   * The latest invoice date (exclusive). If your product uses monthly
   * invoices, and this value is not the beginning of a month, this will adjust
   * the date to the first day of the following month.
   */
  invoiceEndDate?: GoogleTypeDate;
  /**
   * The earliest invoice date (inclusive). If your product uses monthly
   * invoices, and this value is not the beginning of a month, this will adjust
   * the date to the first day of the given month.
   */
  invoiceStartDate?: GoogleTypeDate;
  /**
   * The latest usage date time (exclusive). If you use time groupings (daily,
   * weekly, etc), each group uses midnight to midnight (Pacific time). The
   * usage end date is rounded down to include all usage from the specified
   * date. We recommend that clients pass `usage_start_date_time` in Pacific
   * time.
   */
  usageEndDateTime?: GoogleTypeDateTime;
  /**
   * The earliest usage date time (inclusive). If you use time groupings
   * (daily, weekly, etc), each group uses midnight to midnight (Pacific time).
   * The usage start date is rounded down to include all usage from the
   * specified date. We recommend that clients pass `usage_start_date_time` in
   * Pacific time.
   */
  usageStartDateTime?: GoogleTypeDateTime;
}

function serializeGoogleCloudChannelV1alpha1DateRange(data: any): GoogleCloudChannelV1alpha1DateRange {
  return {
    ...data,
    usageEndDateTime: data["usageEndDateTime"] !== undefined ? serializeGoogleTypeDateTime(data["usageEndDateTime"]) : undefined,
    usageStartDateTime: data["usageStartDateTime"] !== undefined ? serializeGoogleTypeDateTime(data["usageStartDateTime"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1DateRange(data: any): GoogleCloudChannelV1alpha1DateRange {
  return {
    ...data,
    usageEndDateTime: data["usageEndDateTime"] !== undefined ? deserializeGoogleTypeDateTime(data["usageEndDateTime"]) : undefined,
    usageStartDateTime: data["usageStartDateTime"] !== undefined ? deserializeGoogleTypeDateTime(data["usageStartDateTime"]) : undefined,
  };
}

/**
 * An entitlement is a representation of a customer's ability to use a service.
 */
export interface GoogleCloudChannelV1alpha1Entitlement {
  /**
   * The current number of users that are assigned a license for the product
   * defined in provisioned_service.skuId. Read-only. Deprecated: Use
   * `parameters` instead.
   */
  assignedUnits?: number;
  /**
   * Association information to other entitlements.
   */
  associationInfo?: GoogleCloudChannelV1alpha1AssociationInfo;
  /**
   * Cloud Identity ID of a channel partner who will be the direct reseller for
   * the customer's order. This field is generally used in 2-tier ordering,
   * where the order is placed by a top-level distributor on behalf of their
   * channel partner or reseller. Required for distributors. Deprecated:
   * `channel_partner_id` has been moved to the Customer.
   */
  channelPartnerId?: string;
  /**
   * Commitment settings for a commitment-based Offer. Required for commitment
   * based offers.
   */
  commitmentSettings?: GoogleCloudChannelV1alpha1CommitmentSettings;
  /**
   * Output only. The time at which the entitlement is created.
   */
  readonly createTime?: Date;
  /**
   * Maximum number of units for a non commitment-based Offer, such as
   * Flexible, Trial or Free entitlements. For commitment-based entitlements,
   * this is a read-only field, which only the internal support team can update.
   * Deprecated: Use `parameters` instead.
   */
  maxUnits?: number;
  /**
   * Output only. Resource name of an entitlement in the form:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}.
   */
  readonly name?: string;
  /**
   * Number of units for a commitment-based Offer. For example, for seat-based
   * Offers, this would be the number of seats; for license-based Offers, this
   * would be the number of licenses. Required for creating commitment-based
   * Offers. Deprecated: Use `parameters` instead.
   */
  numUnits?: number;
  /**
   * Required. The offer resource name for which the entitlement is to be
   * created. Takes the form: accounts/{account_id}/offers/{offer_id}.
   */
  offer?: string;
  /**
   * Extended entitlement parameters. When creating an entitlement, valid
   * parameter names and values are defined in the Offer.parameter_definitions.
   * For Google Workspace, the following Parameters may be accepted as input: -
   * max_units: The maximum assignable units for a flexible offer OR -
   * num_units: The total commitment for commitment-based offers The response
   * may additionally include the following output-only Parameters: -
   * assigned_units: The number of licenses assigned to users. For GCP billing
   * subaccounts, the following Parameter may be accepted as input: -
   * display_name: The display name of the billing subaccount.
   */
  parameters?: GoogleCloudChannelV1alpha1Parameter[];
  /**
   * Output only. Service provisioning details for the entitlement.
   */
  readonly provisionedService?: GoogleCloudChannelV1alpha1ProvisionedService;
  /**
   * Output only. Current provisioning state of the entitlement.
   */
  readonly provisioningState?:  | "PROVISIONING_STATE_UNSPECIFIED" | "ACTIVE" | "CANCELED" | "COMPLETE" | "PENDING" | "SUSPENDED";
  /**
   * Optional. This purchase order (PO) information is for resellers to use for
   * their company tracking usage. If a purchaseOrderId value is given, it
   * appears in the API responses and shows up in the invoice. The property
   * accepts up to 80 plain text characters. This is only supported for Google
   * Workspace entitlements.
   */
  purchaseOrderId?: string;
  /**
   * Output only. Enumerable of all current suspension reasons for an
   * entitlement.
   */
  readonly suspensionReasons?:  | "SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER"[];
  /**
   * Output only. Settings for trial offers.
   */
  readonly trialSettings?: GoogleCloudChannelV1alpha1TrialSettings;
  /**
   * Output only. The time at which the entitlement is updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudChannelV1alpha1Entitlement(data: any): GoogleCloudChannelV1alpha1Entitlement {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudChannelV1alpha1Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1Entitlement(data: any): GoogleCloudChannelV1alpha1Entitlement {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudChannelV1alpha1Parameter(item))) : undefined,
    trialSettings: data["trialSettings"] !== undefined ? deserializeGoogleCloudChannelV1alpha1TrialSettings(data["trialSettings"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents Pub/Sub message content describing entitlement update.
 */
export interface GoogleCloudChannelV1alpha1EntitlementEvent {
  /**
   * Resource name of an entitlement of the form:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  entitlement?: string;
  /**
   * Type of event which happened on the entitlement.
   */
  eventType?:  | "TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SERVICE_STARTED" | "LICENSE_ASSIGNMENT_CHANGED" | "LICENSE_CAP_CHANGED";
}

/**
 * Provides contextual information about a google.longrunning.Operation.
 */
export interface GoogleCloudChannelV1alpha1OperationMetadata {
  /**
   * The RPC that initiated this Long Running Operation.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE_ENTITLEMENT" | "CHANGE_QUANTITY" | "CHANGE_RENEWAL_SETTINGS" | "CHANGE_PLAN" | "START_PAID_SERVICE" | "CHANGE_SKU" | "ACTIVATE_ENTITLEMENT" | "SUSPEND_ENTITLEMENT" | "CANCEL_ENTITLEMENT" | "TRANSFER_ENTITLEMENTS" | "TRANSFER_ENTITLEMENTS_TO_GOOGLE" | "CHANGE_OFFER" | "CHANGE_PARAMETERS" | "PROVISION_CLOUD_IDENTITY";
}

/**
 * Definition for extended entitlement parameters.
 */
export interface GoogleCloudChannelV1alpha1Parameter {
  /**
   * Output only. Specifies whether this parameter is allowed to be changed.
   * For example, for a Google Workspace Business Starter entitlement in
   * commitment plan, num_units is editable when entitlement is active.
   */
  readonly editable?: boolean;
  /**
   * Name of the parameter.
   */
  name?: string;
  /**
   * Value of the parameter.
   */
  value?: GoogleCloudChannelV1alpha1Value;
}

function serializeGoogleCloudChannelV1alpha1Parameter(data: any): GoogleCloudChannelV1alpha1Parameter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeGoogleCloudChannelV1alpha1Value(data["value"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1Parameter(data: any): GoogleCloudChannelV1alpha1Parameter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeGoogleCloudChannelV1alpha1Value(data["value"]) : undefined,
  };
}

/**
 * Represents period in days/months/years.
 */
export interface GoogleCloudChannelV1alpha1Period {
  /**
   * Total duration of Period Type defined.
   */
  duration?: number;
  /**
   * Period Type.
   */
  periodType?:  | "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR";
}

/**
 * Service provisioned for an entitlement.
 */
export interface GoogleCloudChannelV1alpha1ProvisionedService {
  /**
   * Output only. The product pertaining to the provisioning resource as
   * specified in the Offer.
   */
  readonly productId?: string;
  /**
   * Output only. Provisioning ID of the entitlement. For Google Workspace,
   * this is the underlying Subscription ID. For Google Cloud Platform, this is
   * the Billing Account ID of the billing subaccount."
   */
  readonly provisioningId?: string;
  /**
   * Output only. The SKU pertaining to the provisioning resource as specified
   * in the Offer.
   */
  readonly skuId?: string;
}

/**
 * Renewal settings for renewable Offers.
 */
export interface GoogleCloudChannelV1alpha1RenewalSettings {
  /**
   * If true, disables commitment-based offer on renewal and switches to
   * flexible or pay as you go. Deprecated: Use `payment_plan` instead.
   */
  disableCommitment?: boolean;
  /**
   * If false, the plan will be completed at the end date.
   */
  enableRenewal?: boolean;
  /**
   * Describes how frequently the reseller will be billed, such as once per
   * month.
   */
  paymentCycle?: GoogleCloudChannelV1alpha1Period;
  /**
   * Set if enable_renewal=true. Deprecated: Use `payment_cycle` instead.
   */
  paymentOption?:  | "PAYMENT_OPTION_UNSPECIFIED" | "ANNUAL" | "MONTHLY";
  /**
   * Describes how a reseller will be billed.
   */
  paymentPlan?:  | "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE";
  /**
   * If true and enable_renewal = true, the unit (for example seats or
   * licenses) will be set to the number of active units at renewal time.
   */
  resizeUnitCount?: boolean;
}

/**
 * The ID and description of a report that was used to generate report data.
 * For example, "GCP Daily Spend", "Google Workspace License Activity", etc.
 */
export interface GoogleCloudChannelV1alpha1Report {
  /**
   * The list of columns included in the report. This defines the schema of the
   * report results.
   */
  columns?: GoogleCloudChannelV1alpha1Column[];
  /**
   * A description of other aspects of the report, such as the products it
   * supports.
   */
  description?: string;
  /**
   * A human-readable name for this report.
   */
  displayName?: string;
  /**
   * Required. The report's resource name. Specifies the account and report
   * used to generate report data. The report_id identifier is a UID (for
   * example, `613bf59q`). Name uses the format:
   * accounts/{account_id}/reports/{report_id}
   */
  name?: string;
}

/**
 * The result of a RunReportJob operation. Contains the name to use in
 * FetchReportResultsRequest.report_job and the status of the operation.
 */
export interface GoogleCloudChannelV1alpha1ReportJob {
  /**
   * Required. The resource name of a report job. Name uses the format:
   * `accounts/{account_id}/reportJobs/{report_job_id}`
   */
  name?: string;
  /**
   * The current status of report generation.
   */
  reportStatus?: GoogleCloudChannelV1alpha1ReportStatus;
}

function serializeGoogleCloudChannelV1alpha1ReportJob(data: any): GoogleCloudChannelV1alpha1ReportJob {
  return {
    ...data,
    reportStatus: data["reportStatus"] !== undefined ? serializeGoogleCloudChannelV1alpha1ReportStatus(data["reportStatus"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1ReportJob(data: any): GoogleCloudChannelV1alpha1ReportJob {
  return {
    ...data,
    reportStatus: data["reportStatus"] !== undefined ? deserializeGoogleCloudChannelV1alpha1ReportStatus(data["reportStatus"]) : undefined,
  };
}

/**
 * The features describing the data. Returned by
 * CloudChannelReportsService.RunReportJob and
 * CloudChannelReportsService.FetchReportResults.
 */
export interface GoogleCloudChannelV1alpha1ReportResultsMetadata {
  /**
   * The date range of reported usage.
   */
  dateRange?: GoogleCloudChannelV1alpha1DateRange;
  /**
   * The usage dates immediately preceding `date_range` with the same duration.
   * Use this to calculate trending usage and costs. This is only populated if
   * you request trending data. For example, if `date_range` is July 1-15,
   * `preceding_date_range` will be June 16-30.
   */
  precedingDateRange?: GoogleCloudChannelV1alpha1DateRange;
  /**
   * Details of the completed report.
   */
  report?: GoogleCloudChannelV1alpha1Report;
  /**
   * The total number of rows of data in the final report.
   */
  rowCount?: bigint;
}

function serializeGoogleCloudChannelV1alpha1ReportResultsMetadata(data: any): GoogleCloudChannelV1alpha1ReportResultsMetadata {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? serializeGoogleCloudChannelV1alpha1DateRange(data["dateRange"]) : undefined,
    precedingDateRange: data["precedingDateRange"] !== undefined ? serializeGoogleCloudChannelV1alpha1DateRange(data["precedingDateRange"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1ReportResultsMetadata(data: any): GoogleCloudChannelV1alpha1ReportResultsMetadata {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? deserializeGoogleCloudChannelV1alpha1DateRange(data["dateRange"]) : undefined,
    precedingDateRange: data["precedingDateRange"] !== undefined ? deserializeGoogleCloudChannelV1alpha1DateRange(data["precedingDateRange"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
}

/**
 * Status of a report generation process.
 */
export interface GoogleCloudChannelV1alpha1ReportStatus {
  /**
   * The report generation's completion time.
   */
  endTime?: Date;
  /**
   * The report generation's start time.
   */
  startTime?: Date;
  /**
   * The current state of the report generation process.
   */
  state?:  | "STATE_UNSPECIFIED" | "STARTED" | "WRITING" | "AVAILABLE" | "FAILED";
}

function serializeGoogleCloudChannelV1alpha1ReportStatus(data: any): GoogleCloudChannelV1alpha1ReportStatus {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1ReportStatus(data: any): GoogleCloudChannelV1alpha1ReportStatus {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Response message for CloudChannelReportsService.RunReportJob.
 */
export interface GoogleCloudChannelV1alpha1RunReportJobResponse {
  /**
   * Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve
   * the report's results.
   */
  reportJob?: GoogleCloudChannelV1alpha1ReportJob;
  /**
   * The metadata for the report's results (display name, columns, row count,
   * and date range). If you view this before the operation finishes, you may
   * see incomplete data.
   */
  reportMetadata?: GoogleCloudChannelV1alpha1ReportResultsMetadata;
}

function serializeGoogleCloudChannelV1alpha1RunReportJobResponse(data: any): GoogleCloudChannelV1alpha1RunReportJobResponse {
  return {
    ...data,
    reportJob: data["reportJob"] !== undefined ? serializeGoogleCloudChannelV1alpha1ReportJob(data["reportJob"]) : undefined,
    reportMetadata: data["reportMetadata"] !== undefined ? serializeGoogleCloudChannelV1alpha1ReportResultsMetadata(data["reportMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1RunReportJobResponse(data: any): GoogleCloudChannelV1alpha1RunReportJobResponse {
  return {
    ...data,
    reportJob: data["reportJob"] !== undefined ? deserializeGoogleCloudChannelV1alpha1ReportJob(data["reportJob"]) : undefined,
    reportMetadata: data["reportMetadata"] !== undefined ? deserializeGoogleCloudChannelV1alpha1ReportResultsMetadata(data["reportMetadata"]) : undefined,
  };
}

/**
 * Represents information which resellers will get as part of notification from
 * Pub/Sub.
 */
export interface GoogleCloudChannelV1alpha1SubscriberEvent {
  /**
   * Channel Partner event sent as part of Pub/Sub event to partners.
   */
  channelPartnerEvent?: GoogleCloudChannelV1alpha1ChannelPartnerEvent;
  /**
   * Customer event sent as part of Pub/Sub event to partners.
   */
  customerEvent?: GoogleCloudChannelV1alpha1CustomerEvent;
  /**
   * Entitlement event sent as part of Pub/Sub event to partners.
   */
  entitlementEvent?: GoogleCloudChannelV1alpha1EntitlementEvent;
}

/**
 * Response message for CloudChannelService.TransferEntitlements. This is put
 * in the response field of google.longrunning.Operation.
 */
export interface GoogleCloudChannelV1alpha1TransferEntitlementsResponse {
  /**
   * The transferred entitlements.
   */
  entitlements?: GoogleCloudChannelV1alpha1Entitlement[];
}

function serializeGoogleCloudChannelV1alpha1TransferEntitlementsResponse(data: any): GoogleCloudChannelV1alpha1TransferEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeGoogleCloudChannelV1alpha1Entitlement(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1TransferEntitlementsResponse(data: any): GoogleCloudChannelV1alpha1TransferEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeGoogleCloudChannelV1alpha1Entitlement(item))) : undefined,
  };
}

/**
 * Settings for trial offers.
 */
export interface GoogleCloudChannelV1alpha1TrialSettings {
  /**
   * Date when the trial ends. The value is in milliseconds using the UNIX
   * Epoch format. See an example [Epoch
   * converter](https://www.epochconverter.com).
   */
  endTime?: Date;
  /**
   * Determines if the entitlement is in a trial or not: * `true` - The
   * entitlement is in trial. * `false` - The entitlement is not in trial.
   */
  trial?: boolean;
}

function serializeGoogleCloudChannelV1alpha1TrialSettings(data: any): GoogleCloudChannelV1alpha1TrialSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1TrialSettings(data: any): GoogleCloudChannelV1alpha1TrialSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Data type and value of a parameter.
 */
export interface GoogleCloudChannelV1alpha1Value {
  /**
   * Represents a boolean value.
   */
  boolValue?: boolean;
  /**
   * Represents a double value.
   */
  doubleValue?: number;
  /**
   * Represents an int64 value.
   */
  int64Value?: bigint;
  /**
   * Represents an 'Any' proto value.
   */
  protoValue?: {
    [key: string]: any
  };
  /**
   * Represents a string value.
   */
  stringValue?: string;
}

function serializeGoogleCloudChannelV1alpha1Value(data: any): GoogleCloudChannelV1alpha1Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1alpha1Value(data: any): GoogleCloudChannelV1alpha1Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * Association links that an entitlement has to other entitlements.
 */
export interface GoogleCloudChannelV1AssociationInfo {
  /**
   * The name of the base entitlement, for which this entitlement is an add-on.
   */
  baseEntitlement?: string;
}

/**
 * Request message for CloudChannelService.CancelEntitlement.
 */
export interface GoogleCloudChannelV1CancelEntitlementRequest {
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

/**
 * Request message for CloudChannelService.ChangeOffer.
 */
export interface GoogleCloudChannelV1ChangeOfferRequest {
  /**
   * Required. New Offer. Format: accounts/{account_id}/offers/{offer_id}.
   */
  offer?: string;
  /**
   * Optional. Parameters needed to purchase the Offer. To view the available
   * Parameters refer to the Offer.parameter_definitions from the desired offer.
   */
  parameters?: GoogleCloudChannelV1Parameter[];
  /**
   * Optional. Purchase order id provided by the reseller.
   */
  purchaseOrderId?: string;
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

function serializeGoogleCloudChannelV1ChangeOfferRequest(data: any): GoogleCloudChannelV1ChangeOfferRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ChangeOfferRequest(data: any): GoogleCloudChannelV1ChangeOfferRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelService.ChangeParametersRequest.
 */
export interface GoogleCloudChannelV1ChangeParametersRequest {
  /**
   * Required. Entitlement parameters to update. You can only change editable
   * parameters. To view the available Parameters for a request, refer to the
   * Offer.parameter_definitions from the desired offer.
   */
  parameters?: GoogleCloudChannelV1Parameter[];
  /**
   * Optional. Purchase order ID provided by the reseller.
   */
  purchaseOrderId?: string;
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

function serializeGoogleCloudChannelV1ChangeParametersRequest(data: any): GoogleCloudChannelV1ChangeParametersRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ChangeParametersRequest(data: any): GoogleCloudChannelV1ChangeParametersRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelService.ChangeRenewalSettings.
 */
export interface GoogleCloudChannelV1ChangeRenewalSettingsRequest {
  /**
   * Required. New renewal settings.
   */
  renewalSettings?: GoogleCloudChannelV1RenewalSettings;
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

/**
 * Entity representing a link between distributors and their indirect resellers
 * in an n-tier resale channel.
 */
export interface GoogleCloudChannelV1ChannelPartnerLink {
  /**
   * Output only. Cloud Identity info of the channel partner (IR).
   */
  readonly channelPartnerCloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
  /**
   * Output only. Timestamp of when the channel partner link is created.
   */
  readonly createTime?: Date;
  /**
   * Output only. URI of the web page where partner accepts the link
   * invitation.
   */
  readonly inviteLinkUri?: string;
  /**
   * Required. State of the channel partner link.
   */
  linkState?:  | "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED" | "INVITED" | "ACTIVE" | "REVOKED" | "SUSPENDED";
  /**
   * Output only. Resource name for the channel partner link, in the format
   * accounts/{account_id}/channelPartnerLinks/{id}.
   */
  readonly name?: string;
  /**
   * Output only. Public identifier that a customer must use to generate a
   * transfer token to move to this distributor-reseller combination.
   */
  readonly publicId?: string;
  /**
   * Required. Cloud Identity ID of the linked reseller.
   */
  resellerCloudIdentityId?: string;
  /**
   * Output only. Timestamp of when the channel partner link is updated.
   */
  readonly updateTime?: Date;
}

/**
 * Configuration for how a distributor will rebill a channel partner (also
 * known as a distributor-authorized reseller).
 */
export interface GoogleCloudChannelV1ChannelPartnerRepricingConfig {
  /**
   * Output only. Resource name of the ChannelPartnerRepricingConfig. Format:
   * accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}.
   */
  readonly name?: string;
  /**
   * Required. The configuration for bill modifications made by a reseller
   * before sending it to ChannelPartner.
   */
  repricingConfig?: GoogleCloudChannelV1RepricingConfig;
  /**
   * Output only. Timestamp of an update to the repricing rule. If
   * `update_time` is after RepricingConfig.effective_invoice_month then it
   * indicates this was set mid-month.
   */
  readonly updateTime?: Date;
}

/**
 * Request message for CloudChannelService.CheckCloudIdentityAccountsExist.
 */
export interface GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest {
  /**
   * Required. Domain to fetch for Cloud Identity account customer.
   */
  domain?: string;
}

/**
 * Response message for CloudChannelService.CheckCloudIdentityAccountsExist.
 */
export interface GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse {
  /**
   * The Cloud Identity accounts associated with the domain.
   */
  cloudIdentityAccounts?: GoogleCloudChannelV1CloudIdentityCustomerAccount[];
}

/**
 * Entity representing a Cloud Identity account that may be associated with a
 * Channel Services API partner.
 */
export interface GoogleCloudChannelV1CloudIdentityCustomerAccount {
  /**
   * If existing = true, the Cloud Identity ID of the customer.
   */
  customerCloudIdentityId?: string;
  /**
   * If owned = true, the name of the customer that owns the Cloud Identity
   * account. Customer_name uses the format:
   * accounts/{account_id}/customers/{customer_id}
   */
  customerName?: string;
  /**
   * Returns true if a Cloud Identity account exists for a specific domain.
   */
  existing?: boolean;
  /**
   * Returns true if the Cloud Identity account is associated with a customer
   * of the Channel Services partner.
   */
  owned?: boolean;
}

/**
 * Cloud Identity information for the Cloud Channel Customer.
 */
export interface GoogleCloudChannelV1CloudIdentityInfo {
  /**
   * Output only. URI of Customer's Admin console dashboard.
   */
  readonly adminConsoleUri?: string;
  /**
   * The alternate email.
   */
  alternateEmail?: string;
  /**
   * CustomerType indicates verification type needed for using services.
   */
  customerType?:  | "CUSTOMER_TYPE_UNSPECIFIED" | "DOMAIN" | "TEAM";
  /**
   * Edu information about the customer.
   */
  eduData?: GoogleCloudChannelV1EduData;
  /**
   * Output only. Whether the domain is verified. This field is not returned
   * for a Customer's cloud_identity_info resource. Partners can use the
   * domains.get() method of the Workspace SDK's Directory API, or listen to the
   * PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of
   * their resolve Workspace customers.
   */
  readonly isDomainVerified?: boolean;
  /**
   * Language code.
   */
  languageCode?: string;
  /**
   * Phone number associated with the Cloud Identity.
   */
  phoneNumber?: string;
  /**
   * Output only. The primary domain name.
   */
  readonly primaryDomain?: string;
}

/**
 * The definition of a report column. Specifies the data properties in the
 * corresponding position of the report rows.
 */
export interface GoogleCloudChannelV1Column {
  /**
   * The unique name of the column (for example, customer_domain,
   * channel_partner, customer_cost). You can use column IDs in
   * RunReportJobRequest.filter. To see all reports and their columns, call
   * CloudChannelReportsService.ListReports.
   */
  columnId?: string;
  /**
   * The type of the values for this column.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING" | "INT" | "DECIMAL" | "MONEY" | "DATE" | "DATE_TIME";
  /**
   * The column's display name.
   */
  displayName?: string;
}

/**
 * Commitment settings for commitment-based offers.
 */
export interface GoogleCloudChannelV1CommitmentSettings {
  /**
   * Output only. Commitment end timestamp.
   */
  readonly endTime?: Date;
  /**
   * Optional. Renewal settings applicable for a commitment-based Offer.
   */
  renewalSettings?: GoogleCloudChannelV1RenewalSettings;
  /**
   * Output only. Commitment start timestamp.
   */
  readonly startTime?: Date;
}

/**
 * Specifies the override to conditionally apply.
 */
export interface GoogleCloudChannelV1ConditionalOverride {
  /**
   * Required. Information about the applied override's adjustment.
   */
  adjustment?: GoogleCloudChannelV1RepricingAdjustment;
  /**
   * Required. The RebillingBasis to use for the applied override. Shows the
   * relative cost based on your repricing costs.
   */
  rebillingBasis?:  | "REBILLING_BASIS_UNSPECIFIED" | "COST_AT_LIST" | "DIRECT_CUSTOMER_COST";
  /**
   * Required. Specifies the condition which, if met, will apply the override.
   */
  repricingCondition?: GoogleCloudChannelV1RepricingCondition;
}

/**
 * Represents the constraints for buying the Offer.
 */
export interface GoogleCloudChannelV1Constraints {
  /**
   * Represents constraints required to purchase the Offer for a customer.
   */
  customerConstraints?: GoogleCloudChannelV1CustomerConstraints;
}

/**
 * Contact information for a customer account.
 */
export interface GoogleCloudChannelV1ContactInfo {
  /**
   * Output only. The customer account contact's display name, formatted as a
   * combination of the customer's first and last name.
   */
  readonly displayName?: string;
  /**
   * The customer account's contact email. Required for entitlements that
   * create admin.google.com accounts, and serves as the customer's username for
   * those accounts. Use this email to invite Team customers.
   */
  email?: string;
  /**
   * The customer account contact's first name. Optional for Team customers.
   */
  firstName?: string;
  /**
   * The customer account contact's last name. Optional for Team customers.
   */
  lastName?: string;
  /**
   * The customer account's contact phone number.
   */
  phone?: string;
  /**
   * Optional. The customer account contact's job title.
   */
  title?: string;
}

/**
 * Request message for CloudChannelService.CreateEntitlement
 */
export interface GoogleCloudChannelV1CreateEntitlementRequest {
  /**
   * Required. The entitlement to create.
   */
  entitlement?: GoogleCloudChannelV1Entitlement;
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

function serializeGoogleCloudChannelV1CreateEntitlementRequest(data: any): GoogleCloudChannelV1CreateEntitlementRequest {
  return {
    ...data,
    entitlement: data["entitlement"] !== undefined ? serializeGoogleCloudChannelV1Entitlement(data["entitlement"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1CreateEntitlementRequest(data: any): GoogleCloudChannelV1CreateEntitlementRequest {
  return {
    ...data,
    entitlement: data["entitlement"] !== undefined ? deserializeGoogleCloudChannelV1Entitlement(data["entitlement"]) : undefined,
  };
}

/**
 * Entity representing a customer of a reseller or distributor.
 */
export interface GoogleCloudChannelV1Customer {
  /**
   * Secondary contact email. You need to provide an alternate email to create
   * different domains if a primary contact email already exists. Users will
   * receive a notification with credentials when you create an admin.google.com
   * account. Secondary emails are also recovery email addresses. Alternate
   * emails are optional when you create Team customers.
   */
  alternateEmail?: string;
  /**
   * Cloud Identity ID of the customer's channel partner. Populated only if a
   * channel partner exists for this customer.
   */
  channelPartnerId?: string;
  /**
   * Output only. The customer's Cloud Identity ID if the customer has a Cloud
   * Identity resource.
   */
  readonly cloudIdentityId?: string;
  /**
   * Output only. Cloud Identity information for the customer. Populated only
   * if a Cloud Identity account exists for this customer.
   */
  readonly cloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
  /**
   * Optional. External CRM ID for the customer. Populated only if a CRM ID
   * exists for this customer.
   */
  correlationId?: string;
  /**
   * Output only. Time when the customer was created.
   */
  readonly createTime?: Date;
  /**
   * Required. The customer's primary domain. Must match the primary contact
   * email's domain.
   */
  domain?: string;
  /**
   * Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Output only. Resource name of the customer. Format:
   * accounts/{account_id}/customers/{customer_id}
   */
  readonly name?: string;
  /**
   * Required. Name of the organization that the customer entity represents.
   */
  orgDisplayName?: string;
  /**
   * Required. The organization address for the customer. To enforce US laws
   * and embargoes, we require a region and zip code. You must provide valid
   * addresses for every customer. To set the customer's language, use the
   * Customer-level language code.
   */
  orgPostalAddress?: GoogleTypePostalAddress;
  /**
   * Primary contact info.
   */
  primaryContactInfo?: GoogleCloudChannelV1ContactInfo;
  /**
   * Output only. Time when the customer was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Represents constraints required to purchase the Offer for a customer.
 */
export interface GoogleCloudChannelV1CustomerConstraints {
  /**
   * Allowed Customer Type.
   */
  allowedCustomerTypes?:  | "CUSTOMER_TYPE_UNSPECIFIED" | "DOMAIN" | "TEAM"[];
  /**
   * Allowed geographical regions of the customer.
   */
  allowedRegions?: string[];
  /**
   * Allowed Promotional Order Type. Present for Promotional offers.
   */
  promotionalOrderTypes?:  | "PROMOTIONAL_TYPE_UNSPECIFIED" | "NEW_UPGRADE" | "TRANSFER" | "PROMOTION_SWITCH"[];
}

/**
 * Represents Pub/Sub message content describing customer update.
 */
export interface GoogleCloudChannelV1CustomerEvent {
  /**
   * Resource name of the customer. Format:
   * accounts/{account_id}/customers/{customer_id}
   */
  customer?: string;
  /**
   * Type of event which happened on the customer.
   */
  eventType?:  | "TYPE_UNSPECIFIED" | "PRIMARY_DOMAIN_CHANGED" | "PRIMARY_DOMAIN_VERIFIED";
}

/**
 * Configuration for how a reseller will reprice a Customer.
 */
export interface GoogleCloudChannelV1CustomerRepricingConfig {
  /**
   * Output only. Resource name of the CustomerRepricingConfig. Format:
   * accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}.
   */
  readonly name?: string;
  /**
   * Required. The configuration for bill modifications made by a reseller
   * before sending it to customers.
   */
  repricingConfig?: GoogleCloudChannelV1RepricingConfig;
  /**
   * Output only. Timestamp of an update to the repricing rule. If
   * `update_time` is after RepricingConfig.effective_invoice_month then it
   * indicates this was set mid-month.
   */
  readonly updateTime?: Date;
}

/**
 * A representation of usage or invoice date ranges.
 */
export interface GoogleCloudChannelV1DateRange {
  /**
   * The latest invoice date (exclusive). If your product uses monthly
   * invoices, and this value is not the beginning of a month, this will adjust
   * the date to the first day of the following month.
   */
  invoiceEndDate?: GoogleTypeDate;
  /**
   * The earliest invoice date (inclusive). If your product uses monthly
   * invoices, and this value is not the beginning of a month, this will adjust
   * the date to the first day of the given month.
   */
  invoiceStartDate?: GoogleTypeDate;
  /**
   * The latest usage date time (exclusive). If you use time groupings (daily,
   * weekly, etc), each group uses midnight to midnight (Pacific time). The
   * usage end date is rounded down to include all usage from the specified
   * date. We recommend that clients pass `usage_start_date_time` in Pacific
   * time.
   */
  usageEndDateTime?: GoogleTypeDateTime;
  /**
   * The earliest usage date time (inclusive). If you use time groupings
   * (daily, weekly, etc), each group uses midnight to midnight (Pacific time).
   * The usage start date is rounded down to include all usage from the
   * specified date. We recommend that clients pass `usage_start_date_time` in
   * Pacific time.
   */
  usageStartDateTime?: GoogleTypeDateTime;
}

function serializeGoogleCloudChannelV1DateRange(data: any): GoogleCloudChannelV1DateRange {
  return {
    ...data,
    usageEndDateTime: data["usageEndDateTime"] !== undefined ? serializeGoogleTypeDateTime(data["usageEndDateTime"]) : undefined,
    usageStartDateTime: data["usageStartDateTime"] !== undefined ? serializeGoogleTypeDateTime(data["usageStartDateTime"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1DateRange(data: any): GoogleCloudChannelV1DateRange {
  return {
    ...data,
    usageEndDateTime: data["usageEndDateTime"] !== undefined ? deserializeGoogleTypeDateTime(data["usageEndDateTime"]) : undefined,
    usageStartDateTime: data["usageStartDateTime"] !== undefined ? deserializeGoogleTypeDateTime(data["usageStartDateTime"]) : undefined,
  };
}

/**
 * Required Edu Attributes
 */
export interface GoogleCloudChannelV1EduData {
  /**
   * Size of the institute.
   */
  instituteSize?:  | "INSTITUTE_SIZE_UNSPECIFIED" | "SIZE_1_100" | "SIZE_101_500" | "SIZE_501_1000" | "SIZE_1001_2000" | "SIZE_2001_5000" | "SIZE_5001_10000" | "SIZE_10001_OR_MORE";
  /**
   * Designated institute type of customer.
   */
  instituteType?:  | "INSTITUTE_TYPE_UNSPECIFIED" | "K12" | "UNIVERSITY";
  /**
   * Web address for the edu customer's institution.
   */
  website?: string;
}

/**
 * An entitlement is a representation of a customer's ability to use a service.
 */
export interface GoogleCloudChannelV1Entitlement {
  /**
   * Association information to other entitlements.
   */
  associationInfo?: GoogleCloudChannelV1AssociationInfo;
  /**
   * Commitment settings for a commitment-based Offer. Required for commitment
   * based offers.
   */
  commitmentSettings?: GoogleCloudChannelV1CommitmentSettings;
  /**
   * Output only. The time at which the entitlement is created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Resource name of an entitlement in the form:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}.
   */
  readonly name?: string;
  /**
   * Required. The offer resource name for which the entitlement is to be
   * created. Takes the form: accounts/{account_id}/offers/{offer_id}.
   */
  offer?: string;
  /**
   * Extended entitlement parameters. When creating an entitlement, valid
   * parameter names and values are defined in the Offer.parameter_definitions.
   * For Google Workspace, the following Parameters may be accepted as input: -
   * max_units: The maximum assignable units for a flexible offer OR -
   * num_units: The total commitment for commitment-based offers The response
   * may additionally include the following output-only Parameters: -
   * assigned_units: The number of licenses assigned to users. For GCP billing
   * subaccounts, the following Parameter may be accepted as input: -
   * display_name: The display name of the billing subaccount.
   */
  parameters?: GoogleCloudChannelV1Parameter[];
  /**
   * Output only. Service provisioning details for the entitlement.
   */
  readonly provisionedService?: GoogleCloudChannelV1ProvisionedService;
  /**
   * Output only. Current provisioning state of the entitlement.
   */
  readonly provisioningState?:  | "PROVISIONING_STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED";
  /**
   * Optional. This purchase order (PO) information is for resellers to use for
   * their company tracking usage. If a purchaseOrderId value is given, it
   * appears in the API responses and shows up in the invoice. The property
   * accepts up to 80 plain text characters. This is only supported for Google
   * Workspace entitlements.
   */
  purchaseOrderId?: string;
  /**
   * Output only. Enumerable of all current suspension reasons for an
   * entitlement.
   */
  readonly suspensionReasons?:  | "SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER"[];
  /**
   * Output only. Settings for trial offers.
   */
  readonly trialSettings?: GoogleCloudChannelV1TrialSettings;
  /**
   * Output only. The time at which the entitlement is updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudChannelV1Entitlement(data: any): GoogleCloudChannelV1Entitlement {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1Entitlement(data: any): GoogleCloudChannelV1Entitlement {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudChannelV1Parameter(item))) : undefined,
    trialSettings: data["trialSettings"] !== undefined ? deserializeGoogleCloudChannelV1TrialSettings(data["trialSettings"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Change event entry for Entitlement order history
 */
export interface GoogleCloudChannelV1EntitlementChange {
  /**
   * The Entitlement's activation reason
   */
  activationReason?:  | "ACTIVATION_REASON_UNSPECIFIED" | "RESELLER_REVOKED_SUSPENSION" | "CUSTOMER_ACCEPTED_PENDING_TOS" | "RENEWAL_SETTINGS_CHANGED" | "OTHER_ACTIVATION_REASON";
  /**
   * Cancellation reason for the Entitlement.
   */
  cancellationReason?:  | "CANCELLATION_REASON_UNSPECIFIED" | "SERVICE_TERMINATED" | "RELATIONSHIP_ENDED" | "PARTIAL_TRANSFER";
  /**
   * The change action type.
   */
  changeType?:  | "CHANGE_TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SUBSCRIPTION_STARTED" | "LICENSE_CAP_CHANGED" | "SUSPENSION_DETAILS_CHANGED" | "TRIAL_END_DATE_EXTENDED" | "TRIAL_STARTED";
  /**
   * The submitted time of the change.
   */
  createTime?: Date;
  /**
   * Required. Resource name of an entitlement in the form:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  entitlement?: string;
  /**
   * Required. Resource name of the Offer at the time of change. Takes the
   * form: accounts/{account_id}/offers/{offer_id}.
   */
  offer?: string;
  /**
   * Human-readable identifier that shows what operator made a change. When the
   * operator_type is RESELLER, this is the user's email address. For all other
   * operator types, this is empty.
   */
  operator?: string;
  /**
   * Operator type responsible for the change.
   */
  operatorType?:  | "OPERATOR_TYPE_UNSPECIFIED" | "CUSTOMER_SERVICE_REPRESENTATIVE" | "SYSTEM" | "CUSTOMER" | "RESELLER";
  /**
   * e.g. purchase_number change reason, entered by CRS.
   */
  otherChangeReason?: string;
  /**
   * Extended parameters, such as: purchase_order_number, gcp_details;
   * internal_correlation_id, long_running_operation_id, order_id; etc.
   */
  parameters?: GoogleCloudChannelV1Parameter[];
  /**
   * Service provisioned for an Entitlement.
   */
  provisionedService?: GoogleCloudChannelV1ProvisionedService;
  /**
   * Suspension reason for the Entitlement.
   */
  suspensionReason?:  | "SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER";
}

function serializeGoogleCloudChannelV1EntitlementChange(data: any): GoogleCloudChannelV1EntitlementChange {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1EntitlementChange(data: any): GoogleCloudChannelV1EntitlementChange {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudChannelV1Parameter(item))) : undefined,
  };
}

/**
 * Represents Pub/Sub message content describing entitlement update.
 */
export interface GoogleCloudChannelV1EntitlementEvent {
  /**
   * Resource name of an entitlement of the form:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  entitlement?: string;
  /**
   * Type of event which happened on the entitlement.
   */
  eventType?:  | "TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SERVICE_STARTED" | "LICENSE_ASSIGNMENT_CHANGED" | "LICENSE_CAP_CHANGED";
}

/**
 * Request message for CloudChannelReportsService.FetchReportResults.
 */
export interface GoogleCloudChannelV1FetchReportResultsRequest {
  /**
   * Optional. Requested page size of the report. The server may return fewer
   * results than requested. If you don't specify a page size, the server uses a
   * sensible default (may change over time). The maximum value is 30,000; the
   * server will change larger values to 30,000.
   */
  pageSize?: number;
  /**
   * Optional. A token that specifies a page of results beyond the first page.
   * Obtained through FetchReportResultsResponse.next_page_token of the previous
   * CloudChannelReportsService.FetchReportResults call.
   */
  pageToken?: string;
}

/**
 * Response message for CloudChannelReportsService.FetchReportResults. Contains
 * a tabular representation of the report results.
 */
export interface GoogleCloudChannelV1FetchReportResultsResponse {
  /**
   * Pass this token to FetchReportResultsRequest.page_token to retrieve the
   * next page of results.
   */
  nextPageToken?: string;
  /**
   * The metadata for the report results (display name, columns, row count, and
   * date ranges).
   */
  reportMetadata?: GoogleCloudChannelV1ReportResultsMetadata;
  /**
   * The report's lists of values. Each row follows the settings and ordering
   * of the columns from `report_metadata`.
   */
  rows?: GoogleCloudChannelV1Row[];
}

function serializeGoogleCloudChannelV1FetchReportResultsResponse(data: any): GoogleCloudChannelV1FetchReportResultsResponse {
  return {
    ...data,
    reportMetadata: data["reportMetadata"] !== undefined ? serializeGoogleCloudChannelV1ReportResultsMetadata(data["reportMetadata"]) : undefined,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGoogleCloudChannelV1Row(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1FetchReportResultsResponse(data: any): GoogleCloudChannelV1FetchReportResultsResponse {
  return {
    ...data,
    reportMetadata: data["reportMetadata"] !== undefined ? deserializeGoogleCloudChannelV1ReportResultsMetadata(data["reportMetadata"]) : undefined,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGoogleCloudChannelV1Row(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelService.ImportCustomer
 */
export interface GoogleCloudChannelV1ImportCustomerRequest {
  /**
   * Optional. The super admin of the resold customer generates this token to
   * authorize a reseller to access their Cloud Identity and purchase
   * entitlements on their behalf. You can omit this token after authorization.
   * See https://support.google.com/a/answer/7643790 for more details.
   */
  authToken?: string;
  /**
   * Optional. Cloud Identity ID of a channel partner who will be the direct
   * reseller for the customer's order. This field is required for 2-tier
   * transfer scenarios and can be provided via the request Parent binding as
   * well.
   */
  channelPartnerId?: string;
  /**
   * Required. Customer's Cloud Identity ID
   */
  cloudIdentityId?: string;
  /**
   * Optional. Specifies the customer that will receive imported Cloud Identity
   * information. Format: accounts/{account_id}/customers/{customer_id}
   */
  customer?: string;
  /**
   * Required. Customer domain.
   */
  domain?: string;
  /**
   * Required. Choose to overwrite an existing customer if found. This must be
   * set to true if there is an existing customer with a conflicting region code
   * or domain.
   */
  overwriteIfExists?: boolean;
}

/**
 * Response message for CloudChannelService.ListChannelPartnerLinks.
 */
export interface GoogleCloudChannelV1ListChannelPartnerLinksResponse {
  /**
   * The Channel partner links for a reseller.
   */
  channelPartnerLinks?: GoogleCloudChannelV1ChannelPartnerLink[];
  /**
   * A token to retrieve the next page of results. Pass to
   * ListChannelPartnerLinksRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
}

/**
 * Response message for CloudChannelService.ListChannelPartnerRepricingConfigs.
 */
export interface GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse {
  /**
   * The repricing configs for this channel partner.
   */
  channelPartnerRepricingConfigs?: GoogleCloudChannelV1ChannelPartnerRepricingConfig[];
  /**
   * A token to retrieve the next page of results. Pass to
   * ListChannelPartnerRepricingConfigsRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
}

/**
 * Response message for CloudChannelService.ListCustomerRepricingConfigs.
 */
export interface GoogleCloudChannelV1ListCustomerRepricingConfigsResponse {
  /**
   * The repricing configs for this channel partner.
   */
  customerRepricingConfigs?: GoogleCloudChannelV1CustomerRepricingConfig[];
  /**
   * A token to retrieve the next page of results. Pass to
   * ListCustomerRepricingConfigsRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
}

/**
 * Response message for CloudChannelService.ListCustomers.
 */
export interface GoogleCloudChannelV1ListCustomersResponse {
  /**
   * The customers belonging to a reseller or distributor.
   */
  customers?: GoogleCloudChannelV1Customer[];
  /**
   * A token to retrieve the next page of results. Pass to
   * ListCustomersRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
}

/**
 * Response message for CloudChannelService.ListEntitlementChanges
 */
export interface GoogleCloudChannelV1ListEntitlementChangesResponse {
  /**
   * The list of entitlement changes.
   */
  entitlementChanges?: GoogleCloudChannelV1EntitlementChange[];
  /**
   * A token to list the next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudChannelV1ListEntitlementChangesResponse(data: any): GoogleCloudChannelV1ListEntitlementChangesResponse {
  return {
    ...data,
    entitlementChanges: data["entitlementChanges"] !== undefined ? data["entitlementChanges"].map((item: any) => (serializeGoogleCloudChannelV1EntitlementChange(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ListEntitlementChangesResponse(data: any): GoogleCloudChannelV1ListEntitlementChangesResponse {
  return {
    ...data,
    entitlementChanges: data["entitlementChanges"] !== undefined ? data["entitlementChanges"].map((item: any) => (deserializeGoogleCloudChannelV1EntitlementChange(item))) : undefined,
  };
}

/**
 * Response message for CloudChannelService.ListEntitlements.
 */
export interface GoogleCloudChannelV1ListEntitlementsResponse {
  /**
   * The reseller customer's entitlements.
   */
  entitlements?: GoogleCloudChannelV1Entitlement[];
  /**
   * A token to list the next page of results. Pass to
   * ListEntitlementsRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudChannelV1ListEntitlementsResponse(data: any): GoogleCloudChannelV1ListEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ListEntitlementsResponse(data: any): GoogleCloudChannelV1ListEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

/**
 * Response message for ListOffers.
 */
export interface GoogleCloudChannelV1ListOffersResponse {
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of Offers requested.
   */
  offers?: GoogleCloudChannelV1Offer[];
}

function serializeGoogleCloudChannelV1ListOffersResponse(data: any): GoogleCloudChannelV1ListOffersResponse {
  return {
    ...data,
    offers: data["offers"] !== undefined ? data["offers"].map((item: any) => (serializeGoogleCloudChannelV1Offer(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ListOffersResponse(data: any): GoogleCloudChannelV1ListOffersResponse {
  return {
    ...data,
    offers: data["offers"] !== undefined ? data["offers"].map((item: any) => (deserializeGoogleCloudChannelV1Offer(item))) : undefined,
  };
}

/**
 * Response message for ListProducts.
 */
export interface GoogleCloudChannelV1ListProductsResponse {
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * List of Products requested.
   */
  products?: GoogleCloudChannelV1Product[];
}

/**
 * Response message for ListPurchasableOffers.
 */
export interface GoogleCloudChannelV1ListPurchasableOffersResponse {
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of Offers requested.
   */
  purchasableOffers?: GoogleCloudChannelV1PurchasableOffer[];
}

function serializeGoogleCloudChannelV1ListPurchasableOffersResponse(data: any): GoogleCloudChannelV1ListPurchasableOffersResponse {
  return {
    ...data,
    purchasableOffers: data["purchasableOffers"] !== undefined ? data["purchasableOffers"].map((item: any) => (serializeGoogleCloudChannelV1PurchasableOffer(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ListPurchasableOffersResponse(data: any): GoogleCloudChannelV1ListPurchasableOffersResponse {
  return {
    ...data,
    purchasableOffers: data["purchasableOffers"] !== undefined ? data["purchasableOffers"].map((item: any) => (deserializeGoogleCloudChannelV1PurchasableOffer(item))) : undefined,
  };
}

/**
 * Response message for ListPurchasableSkus.
 */
export interface GoogleCloudChannelV1ListPurchasableSkusResponse {
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of SKUs requested.
   */
  purchasableSkus?: GoogleCloudChannelV1PurchasableSku[];
}

/**
 * Response message for CloudChannelReportsService.ListReports.
 */
export interface GoogleCloudChannelV1ListReportsResponse {
  /**
   * Pass this token to FetchReportResultsRequest.page_token to retrieve the
   * next page of results.
   */
  nextPageToken?: string;
  /**
   * The reports available to the partner.
   */
  reports?: GoogleCloudChannelV1Report[];
}

/**
 * Response message for ListSkus.
 */
export interface GoogleCloudChannelV1ListSkusResponse {
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of SKUs requested.
   */
  skus?: GoogleCloudChannelV1Sku[];
}

/**
 * Response Message for ListSubscribers.
 */
export interface GoogleCloudChannelV1ListSubscribersResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of service accounts which have subscriber access to the topic.
   */
  serviceAccounts?: string[];
  /**
   * Name of the topic registered with the reseller.
   */
  topic?: string;
}

/**
 * Request message for CloudChannelService.ListTransferableOffers
 */
export interface GoogleCloudChannelV1ListTransferableOffersRequest {
  /**
   * Customer's Cloud Identity ID
   */
  cloudIdentityId?: string;
  /**
   * A reseller should create a customer and use the resource name of that
   * customer here.
   */
  customerName?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Requested page size. Server might return fewer results than requested. If
   * unspecified, returns at most 100 offers. The maximum value is 1000; the
   * server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * A token for a page of results other than the first page. Obtained using
   * ListTransferableOffersResponse.next_page_token of the previous
   * CloudChannelService.ListTransferableOffers call.
   */
  pageToken?: string;
  /**
   * Required. The SKU to look up Offers for.
   */
  sku?: string;
}

/**
 * Response message for CloudChannelService.ListTransferableOffers.
 */
export interface GoogleCloudChannelV1ListTransferableOffersResponse {
  /**
   * A token to retrieve the next page of results. Pass to
   * ListTransferableOffersRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
  /**
   * Information about Offers for a customer that can be used for transfer.
   */
  transferableOffers?: GoogleCloudChannelV1TransferableOffer[];
}

function serializeGoogleCloudChannelV1ListTransferableOffersResponse(data: any): GoogleCloudChannelV1ListTransferableOffersResponse {
  return {
    ...data,
    transferableOffers: data["transferableOffers"] !== undefined ? data["transferableOffers"].map((item: any) => (serializeGoogleCloudChannelV1TransferableOffer(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ListTransferableOffersResponse(data: any): GoogleCloudChannelV1ListTransferableOffersResponse {
  return {
    ...data,
    transferableOffers: data["transferableOffers"] !== undefined ? data["transferableOffers"].map((item: any) => (deserializeGoogleCloudChannelV1TransferableOffer(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelService.ListTransferableSkus
 */
export interface GoogleCloudChannelV1ListTransferableSkusRequest {
  /**
   * Optional. The super admin of the resold customer generates this token to
   * authorize a reseller to access their Cloud Identity and purchase
   * entitlements on their behalf. You can omit this token after authorization.
   * See https://support.google.com/a/answer/7643790 for more details.
   */
  authToken?: string;
  /**
   * Customer's Cloud Identity ID
   */
  cloudIdentityId?: string;
  /**
   * A reseller is required to create a customer and use the resource name of
   * the created customer here. Customer_name uses the format:
   * accounts/{account_id}/customers/{customer_id}
   */
  customerName?: string;
  /**
   * The BCP-47 language code. For example, "en-US". The response will localize
   * in the corresponding language code, if specified. The default value is
   * "en-US". Optional.
   */
  languageCode?: string;
  /**
   * The requested page size. Server might return fewer results than requested.
   * If unspecified, returns at most 100 SKUs. The maximum value is 1000; the
   * server will coerce values above 1000. Optional.
   */
  pageSize?: number;
  /**
   * A token for a page of results other than the first page. Obtained using
   * ListTransferableSkusResponse.next_page_token of the previous
   * CloudChannelService.ListTransferableSkus call. Optional.
   */
  pageToken?: string;
}

/**
 * Response message for CloudChannelService.ListTransferableSkus.
 */
export interface GoogleCloudChannelV1ListTransferableSkusResponse {
  /**
   * A token to retrieve the next page of results. Pass to
   * ListTransferableSkusRequest.page_token to obtain that page.
   */
  nextPageToken?: string;
  /**
   * Information about existing SKUs for a customer that needs a transfer.
   */
  transferableSkus?: GoogleCloudChannelV1TransferableSku[];
}

/**
 * Represents the marketing information for a Product, SKU or Offer.
 */
export interface GoogleCloudChannelV1MarketingInfo {
  /**
   * Default logo.
   */
  defaultLogo?: GoogleCloudChannelV1Media;
  /**
   * Human readable description. Description can contain HTML.
   */
  description?: string;
  /**
   * Human readable name.
   */
  displayName?: string;
}

/**
 * Represents media information.
 */
export interface GoogleCloudChannelV1Media {
  /**
   * URL of the media.
   */
  content?: string;
  /**
   * Title of the media.
   */
  title?: string;
  /**
   * Type of the media.
   */
  type?:  | "MEDIA_TYPE_UNSPECIFIED" | "MEDIA_TYPE_IMAGE";
}

/**
 * Represents an offer made to resellers for purchase. An offer is associated
 * with a Sku, has a plan for payment, a price, and defines the constraints for
 * buying.
 */
export interface GoogleCloudChannelV1Offer {
  /**
   * Constraints on transacting the Offer.
   */
  constraints?: GoogleCloudChannelV1Constraints;
  /**
   * The deal code of the offer to get a special promotion or discount.
   */
  dealCode?: string;
  /**
   * Output only. End of the Offer validity time.
   */
  readonly endTime?: Date;
  /**
   * Marketing information for the Offer.
   */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
  /**
   * Resource Name of the Offer. Format:
   * accounts/{account_id}/offers/{offer_id}
   */
  name?: string;
  /**
   * Parameters required to use current Offer to purchase.
   */
  parameterDefinitions?: GoogleCloudChannelV1ParameterDefinition[];
  /**
   * Describes the payment plan for the Offer.
   */
  plan?: GoogleCloudChannelV1Plan;
  /**
   * Price for each monetizable resource type.
   */
  priceByResources?: GoogleCloudChannelV1PriceByResource[];
  /**
   * SKU the offer is associated with.
   */
  sku?: GoogleCloudChannelV1Sku;
  /**
   * Start of the Offer validity time.
   */
  startTime?: Date;
}

function serializeGoogleCloudChannelV1Offer(data: any): GoogleCloudChannelV1Offer {
  return {
    ...data,
    parameterDefinitions: data["parameterDefinitions"] !== undefined ? data["parameterDefinitions"].map((item: any) => (serializeGoogleCloudChannelV1ParameterDefinition(item))) : undefined,
    priceByResources: data["priceByResources"] !== undefined ? data["priceByResources"].map((item: any) => (serializeGoogleCloudChannelV1PriceByResource(item))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudChannelV1Offer(data: any): GoogleCloudChannelV1Offer {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    parameterDefinitions: data["parameterDefinitions"] !== undefined ? data["parameterDefinitions"].map((item: any) => (deserializeGoogleCloudChannelV1ParameterDefinition(item))) : undefined,
    priceByResources: data["priceByResources"] !== undefined ? data["priceByResources"].map((item: any) => (deserializeGoogleCloudChannelV1PriceByResource(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Provides contextual information about a google.longrunning.Operation.
 */
export interface GoogleCloudChannelV1OperationMetadata {
  /**
   * The RPC that initiated this Long Running Operation.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE_ENTITLEMENT" | "CHANGE_RENEWAL_SETTINGS" | "START_PAID_SERVICE" | "ACTIVATE_ENTITLEMENT" | "SUSPEND_ENTITLEMENT" | "CANCEL_ENTITLEMENT" | "TRANSFER_ENTITLEMENTS" | "TRANSFER_ENTITLEMENTS_TO_GOOGLE" | "CHANGE_OFFER" | "CHANGE_PARAMETERS" | "PROVISION_CLOUD_IDENTITY";
}

/**
 * Definition for extended entitlement parameters.
 */
export interface GoogleCloudChannelV1Parameter {
  /**
   * Output only. Specifies whether this parameter is allowed to be changed.
   * For example, for a Google Workspace Business Starter entitlement in
   * commitment plan, num_units is editable when entitlement is active.
   */
  readonly editable?: boolean;
  /**
   * Name of the parameter.
   */
  name?: string;
  /**
   * Value of the parameter.
   */
  value?: GoogleCloudChannelV1Value;
}

function serializeGoogleCloudChannelV1Parameter(data: any): GoogleCloudChannelV1Parameter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeGoogleCloudChannelV1Value(data["value"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1Parameter(data: any): GoogleCloudChannelV1Parameter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeGoogleCloudChannelV1Value(data["value"]) : undefined,
  };
}

/**
 * Parameter's definition. Specifies what parameter is required to use the
 * current Offer to purchase.
 */
export interface GoogleCloudChannelV1ParameterDefinition {
  /**
   * If not empty, parameter values must be drawn from this list. For example,
   * [us-west1, us-west2, ...] Applicable to STRING parameter type.
   */
  allowedValues?: GoogleCloudChannelV1Value[];
  /**
   * Maximum value of the parameter, if applicable. Inclusive. For example,
   * maximum seats when purchasing Google Workspace Business Standard.
   * Applicable to INT64 and DOUBLE parameter types.
   */
  maxValue?: GoogleCloudChannelV1Value;
  /**
   * Minimal value of the parameter, if applicable. Inclusive. For example,
   * minimal commitment when purchasing Anthos is 0.01. Applicable to INT64 and
   * DOUBLE parameter types.
   */
  minValue?: GoogleCloudChannelV1Value;
  /**
   * Name of the parameter.
   */
  name?: string;
  /**
   * If set to true, parameter is optional to purchase this Offer.
   */
  optional?: boolean;
  /**
   * Data type of the parameter. Minimal value, Maximum value and allowed
   * values will use specified data type here.
   */
  parameterType?:  | "PARAMETER_TYPE_UNSPECIFIED" | "INT64" | "STRING" | "DOUBLE";
}

function serializeGoogleCloudChannelV1ParameterDefinition(data: any): GoogleCloudChannelV1ParameterDefinition {
  return {
    ...data,
    allowedValues: data["allowedValues"] !== undefined ? data["allowedValues"].map((item: any) => (serializeGoogleCloudChannelV1Value(item))) : undefined,
    maxValue: data["maxValue"] !== undefined ? serializeGoogleCloudChannelV1Value(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? serializeGoogleCloudChannelV1Value(data["minValue"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ParameterDefinition(data: any): GoogleCloudChannelV1ParameterDefinition {
  return {
    ...data,
    allowedValues: data["allowedValues"] !== undefined ? data["allowedValues"].map((item: any) => (deserializeGoogleCloudChannelV1Value(item))) : undefined,
    maxValue: data["maxValue"] !== undefined ? deserializeGoogleCloudChannelV1Value(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? deserializeGoogleCloudChannelV1Value(data["minValue"]) : undefined,
  };
}

/**
 * An adjustment that applies a flat markup or markdown to an entire bill.
 */
export interface GoogleCloudChannelV1PercentageAdjustment {
  /**
   * The percentage of the bill to adjust. For example: Mark down by 1% =>
   * "-1.00" Mark up by 1% => "1.00" Pass-Through => "0.00"
   */
  percentage?: GoogleTypeDecimal;
}

/**
 * Represents period in days/months/years.
 */
export interface GoogleCloudChannelV1Period {
  /**
   * Total duration of Period Type defined.
   */
  duration?: number;
  /**
   * Period Type.
   */
  periodType?:  | "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR";
}

/**
 * The payment plan for the Offer. Describes how to make a payment.
 */
export interface GoogleCloudChannelV1Plan {
  /**
   * Reseller Billing account to charge after an offer transaction. Only
   * present for Google Cloud Platform offers.
   */
  billingAccount?: string;
  /**
   * Describes how frequently the reseller will be billed, such as once per
   * month.
   */
  paymentCycle?: GoogleCloudChannelV1Period;
  /**
   * Describes how a reseller will be billed.
   */
  paymentPlan?:  | "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE";
  /**
   * Specifies when the payment needs to happen.
   */
  paymentType?:  | "PAYMENT_TYPE_UNSPECIFIED" | "PREPAY" | "POSTPAY";
  /**
   * Present for Offers with a trial period. For trial-only Offers, a paid
   * service needs to start before the trial period ends for continued service.
   * For Regular Offers with a trial period, the regular pricing goes into
   * effect when trial period ends, or if paid service is started before the end
   * of the trial period.
   */
  trialPeriod?: GoogleCloudChannelV1Period;
}

/**
 * Represents the price of the Offer.
 */
export interface GoogleCloudChannelV1Price {
  /**
   * Base price.
   */
  basePrice?: GoogleTypeMoney;
  /**
   * Discount percentage, represented as decimal. For example, a 20% discount
   * will be represent as 0.2.
   */
  discount?: number;
  /**
   * Effective Price after applying the discounts.
   */
  effectivePrice?: GoogleTypeMoney;
  /**
   * Link to external price list, such as link to Google Voice rate card.
   */
  externalPriceUri?: string;
}

function serializeGoogleCloudChannelV1Price(data: any): GoogleCloudChannelV1Price {
  return {
    ...data,
    basePrice: data["basePrice"] !== undefined ? serializeGoogleTypeMoney(data["basePrice"]) : undefined,
    effectivePrice: data["effectivePrice"] !== undefined ? serializeGoogleTypeMoney(data["effectivePrice"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1Price(data: any): GoogleCloudChannelV1Price {
  return {
    ...data,
    basePrice: data["basePrice"] !== undefined ? deserializeGoogleTypeMoney(data["basePrice"]) : undefined,
    effectivePrice: data["effectivePrice"] !== undefined ? deserializeGoogleTypeMoney(data["effectivePrice"]) : undefined,
  };
}

/**
 * Represents price by resource type.
 */
export interface GoogleCloudChannelV1PriceByResource {
  /**
   * Price of the Offer. Present if there are no price phases.
   */
  price?: GoogleCloudChannelV1Price;
  /**
   * Specifies the price by time range.
   */
  pricePhases?: GoogleCloudChannelV1PricePhase[];
  /**
   * Resource Type. Example: SEAT
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "SEAT" | "MAU" | "GB" | "LICENSED_USER" | "MINUTES" | "IAAS_USAGE" | "SUBSCRIPTION";
}

function serializeGoogleCloudChannelV1PriceByResource(data: any): GoogleCloudChannelV1PriceByResource {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeGoogleCloudChannelV1Price(data["price"]) : undefined,
    pricePhases: data["pricePhases"] !== undefined ? data["pricePhases"].map((item: any) => (serializeGoogleCloudChannelV1PricePhase(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1PriceByResource(data: any): GoogleCloudChannelV1PriceByResource {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeGoogleCloudChannelV1Price(data["price"]) : undefined,
    pricePhases: data["pricePhases"] !== undefined ? data["pricePhases"].map((item: any) => (deserializeGoogleCloudChannelV1PricePhase(item))) : undefined,
  };
}

/**
 * Specifies the price by the duration of months. For example, a 20% discount
 * for the first six months, then a 10% discount starting on the seventh month.
 */
export interface GoogleCloudChannelV1PricePhase {
  /**
   * Defines first period for the phase.
   */
  firstPeriod?: number;
  /**
   * Defines first period for the phase.
   */
  lastPeriod?: number;
  /**
   * Defines the phase period type.
   */
  periodType?:  | "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR";
  /**
   * Price of the phase. Present if there are no price tiers.
   */
  price?: GoogleCloudChannelV1Price;
  /**
   * Price by the resource tiers.
   */
  priceTiers?: GoogleCloudChannelV1PriceTier[];
}

function serializeGoogleCloudChannelV1PricePhase(data: any): GoogleCloudChannelV1PricePhase {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeGoogleCloudChannelV1Price(data["price"]) : undefined,
    priceTiers: data["priceTiers"] !== undefined ? data["priceTiers"].map((item: any) => (serializeGoogleCloudChannelV1PriceTier(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1PricePhase(data: any): GoogleCloudChannelV1PricePhase {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeGoogleCloudChannelV1Price(data["price"]) : undefined,
    priceTiers: data["priceTiers"] !== undefined ? data["priceTiers"].map((item: any) => (deserializeGoogleCloudChannelV1PriceTier(item))) : undefined,
  };
}

/**
 * Defines price at resource tier level. For example, an offer with following
 * definition : * Tier 1: Provide 25% discount for all seats between 1 and 25. *
 * Tier 2: Provide 10% discount for all seats between 26 and 100. * Tier 3:
 * Provide flat 15% discount for all seats above 100. Each of these tiers is
 * represented as a PriceTier.
 */
export interface GoogleCloudChannelV1PriceTier {
  /**
   * First resource for which the tier price applies.
   */
  firstResource?: number;
  /**
   * Last resource for which the tier price applies.
   */
  lastResource?: number;
  /**
   * Price of the tier.
   */
  price?: GoogleCloudChannelV1Price;
}

function serializeGoogleCloudChannelV1PriceTier(data: any): GoogleCloudChannelV1PriceTier {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeGoogleCloudChannelV1Price(data["price"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1PriceTier(data: any): GoogleCloudChannelV1PriceTier {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeGoogleCloudChannelV1Price(data["price"]) : undefined,
  };
}

/**
 * A Product is the entity a customer uses when placing an order. For example,
 * Google Workspace, Google Voice, etc.
 */
export interface GoogleCloudChannelV1Product {
  /**
   * Marketing information for the product.
   */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
  /**
   * Resource Name of the Product. Format: products/{product_id}
   */
  name?: string;
}

/**
 * Request message for CloudChannelService.ProvisionCloudIdentity
 */
export interface GoogleCloudChannelV1ProvisionCloudIdentityRequest {
  /**
   * CloudIdentity-specific customer information.
   */
  cloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
  /**
   * Admin user information.
   */
  user?: GoogleCloudChannelV1AdminUser;
  /**
   * Validate the request and preview the review, but do not post it.
   */
  validateOnly?: boolean;
}

/**
 * Service provisioned for an entitlement.
 */
export interface GoogleCloudChannelV1ProvisionedService {
  /**
   * Output only. The product pertaining to the provisioning resource as
   * specified in the Offer.
   */
  readonly productId?: string;
  /**
   * Output only. Provisioning ID of the entitlement. For Google Workspace,
   * this is the underlying Subscription ID. For Google Cloud Platform, this is
   * the Billing Account ID of the billing subaccount."
   */
  readonly provisioningId?: string;
  /**
   * Output only. The SKU pertaining to the provisioning resource as specified
   * in the Offer.
   */
  readonly skuId?: string;
}

/**
 * Offer that you can purchase for a customer. This is used in the
 * ListPurchasableOffer API response.
 */
export interface GoogleCloudChannelV1PurchasableOffer {
  /**
   * Offer.
   */
  offer?: GoogleCloudChannelV1Offer;
}

function serializeGoogleCloudChannelV1PurchasableOffer(data: any): GoogleCloudChannelV1PurchasableOffer {
  return {
    ...data,
    offer: data["offer"] !== undefined ? serializeGoogleCloudChannelV1Offer(data["offer"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1PurchasableOffer(data: any): GoogleCloudChannelV1PurchasableOffer {
  return {
    ...data,
    offer: data["offer"] !== undefined ? deserializeGoogleCloudChannelV1Offer(data["offer"]) : undefined,
  };
}

/**
 * SKU that you can purchase. This is used in ListPurchasableSku API response.
 */
export interface GoogleCloudChannelV1PurchasableSku {
  /**
   * SKU
   */
  sku?: GoogleCloudChannelV1Sku;
}

/**
 * Request Message for RegisterSubscriber.
 */
export interface GoogleCloudChannelV1RegisterSubscriberRequest {
  /**
   * Required. Service account that provides subscriber access to the
   * registered topic.
   */
  serviceAccount?: string;
}

/**
 * Response Message for RegisterSubscriber.
 */
export interface GoogleCloudChannelV1RegisterSubscriberResponse {
  /**
   * Name of the topic the subscriber will listen to.
   */
  topic?: string;
}

/**
 * Renewal settings for renewable Offers.
 */
export interface GoogleCloudChannelV1RenewalSettings {
  /**
   * If false, the plan will be completed at the end date.
   */
  enableRenewal?: boolean;
  /**
   * Describes how frequently the reseller will be billed, such as once per
   * month.
   */
  paymentCycle?: GoogleCloudChannelV1Period;
  /**
   * Describes how a reseller will be billed.
   */
  paymentPlan?:  | "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE";
  /**
   * If true and enable_renewal = true, the unit (for example seats or
   * licenses) will be set to the number of active units at renewal time.
   */
  resizeUnitCount?: boolean;
}

/**
 * The ID and description of a report that was used to generate report data.
 * For example, "GCP Daily Spend", "Google Workspace License Activity", etc.
 */
export interface GoogleCloudChannelV1Report {
  /**
   * The list of columns included in the report. This defines the schema of the
   * report results.
   */
  columns?: GoogleCloudChannelV1Column[];
  /**
   * A description of other aspects of the report, such as the products it
   * supports.
   */
  description?: string;
  /**
   * A human-readable name for this report.
   */
  displayName?: string;
  /**
   * Required. The report's resource name. Specifies the account and report
   * used to generate report data. The report_id identifier is a UID (for
   * example, `613bf59q`). Name uses the format:
   * accounts/{account_id}/reports/{report_id}
   */
  name?: string;
}

/**
 * The result of a RunReportJob operation. Contains the name to use in
 * FetchReportResultsRequest.report_job and the status of the operation.
 */
export interface GoogleCloudChannelV1ReportJob {
  /**
   * Required. The resource name of a report job. Name uses the format:
   * `accounts/{account_id}/reportJobs/{report_job_id}`
   */
  name?: string;
  /**
   * The current status of report generation.
   */
  reportStatus?: GoogleCloudChannelV1ReportStatus;
}

function serializeGoogleCloudChannelV1ReportJob(data: any): GoogleCloudChannelV1ReportJob {
  return {
    ...data,
    reportStatus: data["reportStatus"] !== undefined ? serializeGoogleCloudChannelV1ReportStatus(data["reportStatus"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ReportJob(data: any): GoogleCloudChannelV1ReportJob {
  return {
    ...data,
    reportStatus: data["reportStatus"] !== undefined ? deserializeGoogleCloudChannelV1ReportStatus(data["reportStatus"]) : undefined,
  };
}

/**
 * The features describing the data. Returned by
 * CloudChannelReportsService.RunReportJob and
 * CloudChannelReportsService.FetchReportResults.
 */
export interface GoogleCloudChannelV1ReportResultsMetadata {
  /**
   * The date range of reported usage.
   */
  dateRange?: GoogleCloudChannelV1DateRange;
  /**
   * The usage dates immediately preceding `date_range` with the same duration.
   * Use this to calculate trending usage and costs. This is only populated if
   * you request trending data. For example, if `date_range` is July 1-15,
   * `preceding_date_range` will be June 16-30.
   */
  precedingDateRange?: GoogleCloudChannelV1DateRange;
  /**
   * Details of the completed report.
   */
  report?: GoogleCloudChannelV1Report;
  /**
   * The total number of rows of data in the final report.
   */
  rowCount?: bigint;
}

function serializeGoogleCloudChannelV1ReportResultsMetadata(data: any): GoogleCloudChannelV1ReportResultsMetadata {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? serializeGoogleCloudChannelV1DateRange(data["dateRange"]) : undefined,
    precedingDateRange: data["precedingDateRange"] !== undefined ? serializeGoogleCloudChannelV1DateRange(data["precedingDateRange"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ReportResultsMetadata(data: any): GoogleCloudChannelV1ReportResultsMetadata {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? deserializeGoogleCloudChannelV1DateRange(data["dateRange"]) : undefined,
    precedingDateRange: data["precedingDateRange"] !== undefined ? deserializeGoogleCloudChannelV1DateRange(data["precedingDateRange"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
}

/**
 * Status of a report generation process.
 */
export interface GoogleCloudChannelV1ReportStatus {
  /**
   * The report generation's completion time.
   */
  endTime?: Date;
  /**
   * The report generation's start time.
   */
  startTime?: Date;
  /**
   * The current state of the report generation process.
   */
  state?:  | "STATE_UNSPECIFIED" | "STARTED" | "WRITING" | "AVAILABLE" | "FAILED";
}

function serializeGoogleCloudChannelV1ReportStatus(data: any): GoogleCloudChannelV1ReportStatus {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudChannelV1ReportStatus(data: any): GoogleCloudChannelV1ReportStatus {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A single report value.
 */
export interface GoogleCloudChannelV1ReportValue {
  /**
   * A value of type `google.type.DateTime` (year, month, day, hour, minute,
   * second, and UTC offset or timezone.)
   */
  dateTimeValue?: GoogleTypeDateTime;
  /**
   * A value of type `google.type.Date` (year, month, day).
   */
  dateValue?: GoogleTypeDate;
  /**
   * A value of type `google.type.Decimal`, representing non-integer numeric
   * values.
   */
  decimalValue?: GoogleTypeDecimal;
  /**
   * A value of type `int`.
   */
  intValue?: bigint;
  /**
   * A value of type `google.type.Money` (currency code, whole units, decimal
   * units).
   */
  moneyValue?: GoogleTypeMoney;
  /**
   * A value of type `string`.
   */
  stringValue?: string;
}

function serializeGoogleCloudChannelV1ReportValue(data: any): GoogleCloudChannelV1ReportValue {
  return {
    ...data,
    dateTimeValue: data["dateTimeValue"] !== undefined ? serializeGoogleTypeDateTime(data["dateTimeValue"]) : undefined,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? serializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1ReportValue(data: any): GoogleCloudChannelV1ReportValue {
  return {
    ...data,
    dateTimeValue: data["dateTimeValue"] !== undefined ? deserializeGoogleTypeDateTime(data["dateTimeValue"]) : undefined,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? deserializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

/**
 * A type that represents the various adjustments you can apply to a bill.
 */
export interface GoogleCloudChannelV1RepricingAdjustment {
  /**
   * Flat markup or markdown on an entire bill.
   */
  percentageAdjustment?: GoogleCloudChannelV1PercentageAdjustment;
}

/**
 * Represents the various repricing conditions you can use for a conditional
 * override.
 */
export interface GoogleCloudChannelV1RepricingCondition {
  /**
   * SKU Group condition for override.
   */
  skuGroupCondition?: GoogleCloudChannelV1SkuGroupCondition;
}

/**
 * Configuration for repricing a Google bill over a period of time.
 */
export interface GoogleCloudChannelV1RepricingConfig {
  /**
   * Required. Information about the adjustment.
   */
  adjustment?: GoogleCloudChannelV1RepricingAdjustment;
  /**
   * Applies the repricing configuration at the channel partner level. This is
   * the only supported value for ChannelPartnerRepricingConfig.
   */
  channelPartnerGranularity?: GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity;
  /**
   * The conditional overrides to apply for this configuration. If you list
   * multiple overrides, only the first valid override is used. If you don't
   * list any overrides, the API uses the normal adjustment and rebilling basis.
   */
  conditionalOverrides?: GoogleCloudChannelV1ConditionalOverride[];
  /**
   * Required. The YearMonth when these adjustments activate. The Day field
   * needs to be "0" since we only accept YearMonth repricing boundaries.
   */
  effectiveInvoiceMonth?: GoogleTypeDate;
  /**
   * Applies the repricing configuration at the entitlement level. This is the
   * only supported value for CustomerRepricingConfig.
   */
  entitlementGranularity?: GoogleCloudChannelV1RepricingConfigEntitlementGranularity;
  /**
   * Required. The RebillingBasis to use for this bill. Specifies the relative
   * cost based on repricing costs you will apply.
   */
  rebillingBasis?:  | "REBILLING_BASIS_UNSPECIFIED" | "COST_AT_LIST" | "DIRECT_CUSTOMER_COST";
}

/**
 * Applies the repricing configuration at the channel partner level. The
 * channel partner value is derived from the resource name. Takes an empty json
 * object.
 */
export interface GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity {
}

/**
 * Applies the repricing configuration at the entitlement level.
 */
export interface GoogleCloudChannelV1RepricingConfigEntitlementGranularity {
  /**
   * Resource name of the entitlement. Format:
   * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}
   */
  entitlement?: string;
}

/**
 * A row of report values.
 */
export interface GoogleCloudChannelV1Row {
  /**
   * The list of values in the row.
   */
  values?: GoogleCloudChannelV1ReportValue[];
}

function serializeGoogleCloudChannelV1Row(data: any): GoogleCloudChannelV1Row {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeGoogleCloudChannelV1ReportValue(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1Row(data: any): GoogleCloudChannelV1Row {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeGoogleCloudChannelV1ReportValue(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelReportsService.RunReportJob.
 */
export interface GoogleCloudChannelV1RunReportJobRequest {
  /**
   * Optional. The range of usage or invoice dates to include in the result.
   */
  dateRange?: GoogleCloudChannelV1DateRange;
  /**
   * Optional. A structured string that defines conditions on dimension columns
   * to restrict the report output. Filters support logical operators (AND, OR,
   * NOT) and conditional operators (=, !=, <, >, <=, and >=) using `column_id`
   * as keys. For example: `(customer:"accounts/C123abc/customers/S456def" OR
   * customer:"accounts/C123abc/customers/S789ghi") AND invoice_start_date.year
   * >= 2022`
   */
  filter?: string;
  /**
   * Optional. The BCP-47 language code, such as "en-US". If specified, the
   * response is localized to the corresponding language code if the original
   * data sources support it. Default is "en-US".
   */
  languageCode?: string;
}

function serializeGoogleCloudChannelV1RunReportJobRequest(data: any): GoogleCloudChannelV1RunReportJobRequest {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? serializeGoogleCloudChannelV1DateRange(data["dateRange"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1RunReportJobRequest(data: any): GoogleCloudChannelV1RunReportJobRequest {
  return {
    ...data,
    dateRange: data["dateRange"] !== undefined ? deserializeGoogleCloudChannelV1DateRange(data["dateRange"]) : undefined,
  };
}

/**
 * Response message for CloudChannelReportsService.RunReportJob.
 */
export interface GoogleCloudChannelV1RunReportJobResponse {
  /**
   * Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve
   * the report's results.
   */
  reportJob?: GoogleCloudChannelV1ReportJob;
  /**
   * The metadata for the report's results (display name, columns, row count,
   * and date range). If you view this before the operation finishes, you may
   * see incomplete data.
   */
  reportMetadata?: GoogleCloudChannelV1ReportResultsMetadata;
}

function serializeGoogleCloudChannelV1RunReportJobResponse(data: any): GoogleCloudChannelV1RunReportJobResponse {
  return {
    ...data,
    reportJob: data["reportJob"] !== undefined ? serializeGoogleCloudChannelV1ReportJob(data["reportJob"]) : undefined,
    reportMetadata: data["reportMetadata"] !== undefined ? serializeGoogleCloudChannelV1ReportResultsMetadata(data["reportMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1RunReportJobResponse(data: any): GoogleCloudChannelV1RunReportJobResponse {
  return {
    ...data,
    reportJob: data["reportJob"] !== undefined ? deserializeGoogleCloudChannelV1ReportJob(data["reportJob"]) : undefined,
    reportMetadata: data["reportMetadata"] !== undefined ? deserializeGoogleCloudChannelV1ReportResultsMetadata(data["reportMetadata"]) : undefined,
  };
}

/**
 * Represents a product's purchasable Stock Keeping Unit (SKU). SKUs represent
 * the different variations of the product. For example, Google Workspace
 * Business Standard and Google Workspace Business Plus are Google Workspace
 * product SKUs.
 */
export interface GoogleCloudChannelV1Sku {
  /**
   * Marketing information for the SKU.
   */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
  /**
   * Resource Name of the SKU. Format: products/{product_id}/skus/{sku_id}
   */
  name?: string;
  /**
   * Product the SKU is associated with.
   */
  product?: GoogleCloudChannelV1Product;
}

/**
 * A condition that applies the override if a line item SKU is found in the SKU
 * group.
 */
export interface GoogleCloudChannelV1SkuGroupCondition {
  /**
   * Specifies a SKU group (https://cloud.google.com/skus/sku-groups). Resource
   * name of SKU group. Format: accounts/{account}/skuGroups/{sku_group}.
   * Example: "accounts/C01234/skuGroups/3d50fd57-3157-4577-a5a9-a219b8490041".
   */
  skuGroup?: string;
}

/**
 * Request message for CloudChannelService.StartPaidService.
 */
export interface GoogleCloudChannelV1StartPaidServiceRequest {
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

/**
 * Represents information which resellers will get as part of notification from
 * Pub/Sub.
 */
export interface GoogleCloudChannelV1SubscriberEvent {
  /**
   * Customer event sent as part of Pub/Sub event to partners.
   */
  customerEvent?: GoogleCloudChannelV1CustomerEvent;
  /**
   * Entitlement event sent as part of Pub/Sub event to partners.
   */
  entitlementEvent?: GoogleCloudChannelV1EntitlementEvent;
}

/**
 * Request message for CloudChannelService.SuspendEntitlement.
 */
export interface GoogleCloudChannelV1SuspendEntitlementRequest {
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

/**
 * TransferableOffer represents an Offer that can be used in Transfer.
 * Read-only.
 */
export interface GoogleCloudChannelV1TransferableOffer {
  /**
   * Offer with parameter constraints updated to allow the Transfer.
   */
  offer?: GoogleCloudChannelV1Offer;
}

function serializeGoogleCloudChannelV1TransferableOffer(data: any): GoogleCloudChannelV1TransferableOffer {
  return {
    ...data,
    offer: data["offer"] !== undefined ? serializeGoogleCloudChannelV1Offer(data["offer"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1TransferableOffer(data: any): GoogleCloudChannelV1TransferableOffer {
  return {
    ...data,
    offer: data["offer"] !== undefined ? deserializeGoogleCloudChannelV1Offer(data["offer"]) : undefined,
  };
}

/**
 * TransferableSku represents information a reseller needs to view existing
 * provisioned services for a customer that they do not own. Read-only.
 */
export interface GoogleCloudChannelV1TransferableSku {
  /**
   * Optional. The customer to transfer has an entitlement with the populated
   * legacy SKU.
   */
  legacySku?: GoogleCloudChannelV1Sku;
  /**
   * The SKU pertaining to the provisioning resource as specified in the Offer.
   */
  sku?: GoogleCloudChannelV1Sku;
  /**
   * Describes the transfer eligibility of a SKU.
   */
  transferEligibility?: GoogleCloudChannelV1TransferEligibility;
}

/**
 * Specifies transfer eligibility of a SKU.
 */
export interface GoogleCloudChannelV1TransferEligibility {
  /**
   * Localized description if reseller is not eligible to transfer the SKU.
   */
  description?: string;
  /**
   * Specified the reason for ineligibility.
   */
  ineligibilityReason?:  | "REASON_UNSPECIFIED" | "PENDING_TOS_ACCEPTANCE" | "SKU_NOT_ELIGIBLE" | "SKU_SUSPENDED";
  /**
   * Whether reseller is eligible to transfer the SKU.
   */
  isEligible?: boolean;
}

/**
 * Request message for CloudChannelService.TransferEntitlements.
 */
export interface GoogleCloudChannelV1TransferEntitlementsRequest {
  /**
   * The super admin of the resold customer generates this token to authorize a
   * reseller to access their Cloud Identity and purchase entitlements on their
   * behalf. You can omit this token after authorization. See
   * https://support.google.com/a/answer/7643790 for more details.
   */
  authToken?: string;
  /**
   * Required. The new entitlements to create or transfer.
   */
  entitlements?: GoogleCloudChannelV1Entitlement[];
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

function serializeGoogleCloudChannelV1TransferEntitlementsRequest(data: any): GoogleCloudChannelV1TransferEntitlementsRequest {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1TransferEntitlementsRequest(data: any): GoogleCloudChannelV1TransferEntitlementsRequest {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

/**
 * Response message for CloudChannelService.TransferEntitlements. This is put
 * in the response field of google.longrunning.Operation.
 */
export interface GoogleCloudChannelV1TransferEntitlementsResponse {
  /**
   * The transferred entitlements.
   */
  entitlements?: GoogleCloudChannelV1Entitlement[];
}

function serializeGoogleCloudChannelV1TransferEntitlementsResponse(data: any): GoogleCloudChannelV1TransferEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1TransferEntitlementsResponse(data: any): GoogleCloudChannelV1TransferEntitlementsResponse {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

/**
 * Request message for CloudChannelService.TransferEntitlementsToGoogle.
 */
export interface GoogleCloudChannelV1TransferEntitlementsToGoogleRequest {
  /**
   * Required. The entitlements to transfer to Google.
   */
  entitlements?: GoogleCloudChannelV1Entitlement[];
  /**
   * Optional. You can specify an optional unique request ID, and if you need
   * to retry your request, the server will know to ignore the request if it's
   * complete. For example, you make an initial request and the request times
   * out. If you make the request again with the same request ID, the server can
   * check if it received the original operation with the same request ID. If it
   * did, it will ignore the second request. The request ID must be a valid
   * [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero
   * UUID is not supported (`00000000-0000-0000-0000-000000000000`).
   */
  requestId?: string;
}

function serializeGoogleCloudChannelV1TransferEntitlementsToGoogleRequest(data: any): GoogleCloudChannelV1TransferEntitlementsToGoogleRequest {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

function deserializeGoogleCloudChannelV1TransferEntitlementsToGoogleRequest(data: any): GoogleCloudChannelV1TransferEntitlementsToGoogleRequest {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeGoogleCloudChannelV1Entitlement(item))) : undefined,
  };
}

/**
 * Settings for trial offers.
 */
export interface GoogleCloudChannelV1TrialSettings {
  /**
   * Date when the trial ends. The value is in milliseconds using the UNIX
   * Epoch format. See an example [Epoch
   * converter](https://www.epochconverter.com).
   */
  endTime?: Date;
  /**
   * Determines if the entitlement is in a trial or not: * `true` - The
   * entitlement is in trial. * `false` - The entitlement is not in trial.
   */
  trial?: boolean;
}

function serializeGoogleCloudChannelV1TrialSettings(data: any): GoogleCloudChannelV1TrialSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudChannelV1TrialSettings(data: any): GoogleCloudChannelV1TrialSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Request Message for UnregisterSubscriber.
 */
export interface GoogleCloudChannelV1UnregisterSubscriberRequest {
  /**
   * Required. Service account to unregister from subscriber access to the
   * topic.
   */
  serviceAccount?: string;
}

/**
 * Response Message for UnregisterSubscriber.
 */
export interface GoogleCloudChannelV1UnregisterSubscriberResponse {
  /**
   * Name of the topic the service account subscriber access was removed from.
   */
  topic?: string;
}

/**
 * Request message for CloudChannelService.UpdateChannelPartnerLink
 */
export interface GoogleCloudChannelV1UpdateChannelPartnerLinkRequest {
  /**
   * Required. The channel partner link to update. Only
   * channel_partner_link.link_state is allowed for updates.
   */
  channelPartnerLink?: GoogleCloudChannelV1ChannelPartnerLink;
  /**
   * Required. The update mask that applies to the resource. The only allowable
   * value for an update mask is channel_partner_link.link_state.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleCloudChannelV1UpdateChannelPartnerLinkRequest(data: any): GoogleCloudChannelV1UpdateChannelPartnerLinkRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleCloudChannelV1UpdateChannelPartnerLinkRequest(data: any): GoogleCloudChannelV1UpdateChannelPartnerLinkRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Data type and value of a parameter.
 */
export interface GoogleCloudChannelV1Value {
  /**
   * Represents a boolean value.
   */
  boolValue?: boolean;
  /**
   * Represents a double value.
   */
  doubleValue?: number;
  /**
   * Represents an int64 value.
   */
  int64Value?: bigint;
  /**
   * Represents an 'Any' proto value.
   */
  protoValue?: {
    [key: string]: any
  };
  /**
   * Represents a string value.
   */
  stringValue?: string;
}

function serializeGoogleCloudChannelV1Value(data: any): GoogleCloudChannelV1Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeGoogleCloudChannelV1Value(data: any): GoogleCloudChannelV1Value {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface GoogleLongrunningCancelOperationRequest {
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
  /**
   * Service-specific metadata associated with the operation. It typically
   * contains progress information and common metadata such as create time. Some
   * services might not provide such metadata. Any method that returns a
   * long-running operation should document the metadata type, if any.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The server-assigned name, which is only unique within the same service
   * that originally returns it. If you use the default HTTP mapping, the `name`
   * should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as `Delete`, the response is
   * `google.protobuf.Empty`. If the original method is standard
   * `Get`/`Create`/`Update`, the response should be the resource. For other
   * methods, the response should have the type `XxxResponse`, where `Xxx` is
   * the original method name. For example, if the original method name is
   * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
  /**
   * The status code, which should be an enum value of google.rpc.Code.
   */
  code?: number;
  /**
   * A list of messages that carry the error details. There is a common set of
   * message types for APIs to use.
   */
  details?: {
    [key: string]: any
  }[];
  /**
   * A developer-facing error message, which should be in English. Any
   * user-facing error message should be localized and sent in the
   * google.rpc.Status.details field, or localized by the client.
   */
  message?: string;
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
export interface GoogleTypeDate {
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
export interface GoogleTypeDateTime {
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
  timeZone?: GoogleTypeTimeZone;
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

function serializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

function deserializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

/**
 * A representation of a decimal value, such as 2.5. Clients may convert values
 * into language-native decimal formats, such as Java's BigDecimal or Python's
 * decimal.Decimal. [BigDecimal]:
 * https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html
 * [decimal.Decimal]: https://docs.python.org/3/library/decimal.html
 */
export interface GoogleTypeDecimal {
  /**
   * The decimal value, as a string. The string representation consists of an
   * optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of
   * zero or more decimal digits ("the integer"), optionally followed by a
   * fraction, optionally followed by an exponent. An empty string **should** be
   * interpreted as `0`. The fraction consists of a decimal point followed by
   * zero or more decimal digits. The string must contain at least one digit in
   * either the integer or the fraction. The number formed by the sign, the
   * integer and the fraction is referred to as the significand. The exponent
   * consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one
   * or more decimal digits. Services **should** normalize decimal values before
   * storing them by: - Removing an explicitly-provided `+` sign (`+2.5` ->
   * `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). -
   * Coercing the exponent character to upper-case, with explicit sign (`2.5e8`
   * -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` ->
   * `2.5`). Services **may** perform additional normalization based on its own
   * needs and the internal decimal implementation selected, such as shifting
   * the decimal point and exponent value together (example: `2.5E-1` <->
   * `0.25`). Additionally, services **may** preserve trailing zeroes in the
   * fraction to indicate increased precision, but are not required to do so.
   * Note that only the `.` character is supported to divide the integer and the
   * fraction; `,` **should not** be supported regardless of locale.
   * Additionally, thousand separators **should not** be supported. If a service
   * does support them, values **must** be normalized. The ENBF grammar is:
   * DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-';
   * Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E')
   * [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' |
   * '8' | '9' }; Services **should** clearly document the range of supported
   * values, the maximum supported precision (total number of digits), and, if
   * applicable, the scale (number of digits after the decimal point), as well
   * as how it behaves when receiving out-of-bounds values. Services **may**
   * choose to accept values passed as input even when the value has a higher
   * precision or scale than the service supports, and **should** round the
   * value to fit the supported scale. Alternatively, the service **may** error
   * with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be
   * lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT`
   * in gRPC) if the service receives a value outside of the supported range.
   */
  value?: string;
}

/**
 * Represents an amount of money with its currency type.
 */
export interface GoogleTypeMoney {
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

function serializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar. It is not intended to model geographical locations (roads,
 * towns, mountains). In typical usage an address would be created via user
 * input or from importing existing data, depending on the type of process.
 * Advice on address input / editing: - Use an internationalization-ready
 * address widget such as https://github.com/google/libaddressinput) - Users
 * should not be presented with UI elements for input or editing of fields
 * outside countries where that field is used. For more guidance on how to use
 * this schema, please see: https://support.google.com/business/answer/6397478
 */
export interface GoogleTypePostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address.
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g. "Austin, TX"), it
   * is important that the line order is clear. The order of address lines
   * should be "envelope order" for the country/region of the address. In places
   * where this can vary (e.g. Japan), address_language is used to make it
   * explicit (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for
   * small-to-large). This way, the most specific line of an address can be
   * selected based on the language. The minimum permitted structural
   * representation of an address consists of a region_code with all remaining
   * information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic
   * reasoning could be made about any of the address components until it was at
   * least partially resolved. Creating an address only containing a region_code
   * and address_lines, and then geocoding is the recommended way to handle
   * completely unstructured addresses (as opposed to guessing which parts of
   * the address should be localities or administrative areas).
   */
  addressLines?: string[];
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region. For example, this can be a state, a
   * province, an oblast, or a prefecture. Specifically, for Spain this is the
   * province and not the autonomous community (e.g. "Barcelona" and not
   * "Catalonia"). Many countries don't use an administrative area in postal
   * addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if known).
   * This is often the UI language of the input form or is expected to match one
   * of the languages used in the address' country/region, or their
   * transliterated equivalents. This can affect formatting in certain
   * countries, but is not critical to the correctness of the data and will
   * never affect any validation or other non-formatting related operations. If
   * this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town. In regions of the world where
   * localities are not well defined or do not fit into this structure well,
   * leave locality empty and use address_lines.
   */
  locality?: string;
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?: string;
  /**
   * Optional. The recipient at the address. This field may, under certain
   * circumstances, contain multiline information. For example, it might contain
   * "care of" information.
   */
  recipients?: string[];
  /**
   * Required. CLDR region code of the country/region of the address. This is
   * never inferred and it is up to the user to ensure the value is correct. See
   * https://cldr.unicode.org/ and
   * https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which
   * is the latest revision. All new revisions **must** be backward compatible
   * with old revisions.
   */
  revision?: number;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in
   * most regions. Where it is used, the value is either a string like "CEDEX",
   * optionally followed by a number (e.g. "CEDEX 7"), or just a number alone,
   * representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?: string;
  /**
   * Optional. Sublocality of the address. For example, this can be
   * neighborhoods, boroughs, districts.
   */
  sublocality?: string;
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface GoogleTypeTimeZone {
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
 * Additional options for CloudChannel#operationsList.
 */
export interface OperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#productsList.
 */
export interface ProductsListOptions {
  /**
   * Required. The resource name of the reseller account. Format:
   * accounts/{account_id}.
   */
  account?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, returns at most 100 Products. The maximum value
   * is 1000; the server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudChannel#productsSkusList.
 */
export interface ProductsSkusListOptions {
  /**
   * Required. Resource name of the reseller. Format: accounts/{account_id}.
   */
  account?: string;
  /**
   * Optional. The BCP-47 language code. For example, "en-US". The response
   * will localize in the corresponding language code, if specified. The default
   * value is "en-US".
   */
  languageCode?: string;
  /**
   * Optional. Requested page size. Server might return fewer results than
   * requested. If unspecified, returns at most 100 SKUs. The maximum value is
   * 1000; the server will coerce values above 1000.
   */
  pageSize?: number;
  /**
   * Optional. A token for a page of results other than the first page.
   * Optional.
   */
  pageToken?: string;
}