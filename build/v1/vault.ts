// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Vault API Client for Deno
 * ================================
 * 
 * Retention and eDiscovery for Google Workspace. To work with Vault resources, the account must have the [required Vault privileges](https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege. For example, to download an export, an account needs the **Manage Exports** privilege and the matter shared with them. 
 * 
 * Docs: https://developers.google.com/vault
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Retention and eDiscovery for Google Workspace. To work with Vault resources,
 * the account must have the [required Vault
 * privileges](https://support.google.com/vault/answer/2799699) and access to
 * the matter. To access a matter, the account must have created the matter,
 * have the matter shared with them, or have the **View All Matters** privilege.
 * For example, to download an export, an account needs the **Manage Exports**
 * privilege and the matter shared with them.
 */
export class Vault {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://vault.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Adds an account as a matter collaborator.
   *
   * @param matterId The matter ID.
   */
  async mattersAddPermissions(matterId: string, req: AddMatterPermissionsRequest): Promise<MatterPermission> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:addPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MatterPermission;
  }

  /**
   * Closes the specified matter. Returns the matter with updated state.
   *
   * @param matterId The matter ID.
   */
  async mattersClose(matterId: string, req: CloseMatterRequest): Promise<CloseMatterResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:close`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CloseMatterResponse;
  }

  /**
   * Counts the accounts processed by the specified query.
   *
   * @param matterId The matter ID.
   */
  async mattersCount(matterId: string, req: CountArtifactsRequest): Promise<Operation> {
    req = serializeCountArtifactsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:count`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a matter with the given name and description. The initial state is
   * open, and the owner is the method caller. Returns the created matter with
   * default view.
   *
   */
  async mattersCreate(req: Matter): Promise<Matter> {
    const url = new URL(`${this.#baseUrl}v1/matters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Matter;
  }

  /**
   * Deletes the specified matter. Returns the matter with updated state.
   *
   * @param matterId The matter ID
   */
  async mattersDelete(matterId: string): Promise<Matter> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Matter;
  }

  /**
   * Creates an export.
   *
   * @param matterId The matter ID.
   */
  async mattersExportsCreate(matterId: string, req: Export): Promise<Export> {
    req = serializeExport(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/exports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeExport(data);
  }

  /**
   * Deletes an export.
   *
   * @param exportId The export ID.
   * @param matterId The matter ID.
   */
  async mattersExportsDelete(exportId: string, matterId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/exports/${ exportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an export.
   *
   * @param exportId The export ID.
   * @param matterId The matter ID.
   */
  async mattersExportsGet(exportId: string, matterId: string): Promise<Export> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/exports/${ exportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeExport(data);
  }

  /**
   * Lists details about the exports in the specified matter.
   *
   * @param matterId The matter ID.
   */
  async mattersExportsList(matterId: string, opts: MattersExportsListOptions = {}): Promise<ListExportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/exports`);
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
    return deserializeListExportsResponse(data);
  }

  /**
   * Gets the specified matter.
   *
   * @param matterId The matter ID.
   */
  async mattersGet(matterId: string, opts: MattersGetOptions = {}): Promise<Matter> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Matter;
  }

  /**
   * Adds an account to a hold. Accounts can be added only to a hold that does
   * not have an organizational unit set. If you try to add an account to an
   * organizational unit-based hold, an error is returned.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsAccountsCreate(holdId: string, matterId: string, req: HeldAccount): Promise<HeldAccount> {
    req = serializeHeldAccount(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }/accounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHeldAccount(data);
  }

  /**
   * Removes an account from a hold.
   *
   * @param accountId The ID of the account to remove from the hold.
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsAccountsDelete(accountId: string, holdId: string, matterId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }/accounts/${ accountId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the accounts covered by a hold. This can list only
   * individually-specified accounts covered by the hold. If the hold covers an
   * organizational unit, use the [Admin
   * SDK](https://developers.google.com/admin-sdk/). to list the members of the
   * organizational unit on hold.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsAccountsList(holdId: string, matterId: string): Promise<ListHeldAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }/accounts`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListHeldAccountsResponse(data);
  }

  /**
   * Adds accounts to a hold. Returns a list of accounts that have been
   * successfully added. Accounts can be added only to an existing account-based
   * hold.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsAddHeldAccounts(holdId: string, matterId: string, req: AddHeldAccountsRequest): Promise<AddHeldAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }:addHeldAccounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAddHeldAccountsResponse(data);
  }

  /**
   * Creates a hold in the specified matter.
   *
   * @param matterId The matter ID.
   */
  async mattersHoldsCreate(matterId: string, req: Hold): Promise<Hold> {
    req = serializeHold(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHold(data);
  }

  /**
   * Removes the specified hold and releases the accounts or organizational
   * unit covered by the hold. If the data is not preserved by another hold or
   * retention rule, it might be purged.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsDelete(holdId: string, matterId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified hold.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsGet(holdId: string, matterId: string, opts: MattersHoldsGetOptions = {}): Promise<Hold> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHold(data);
  }

  /**
   * Lists the holds in a matter.
   *
   * @param matterId The matter ID.
   */
  async mattersHoldsList(matterId: string, opts: MattersHoldsListOptions = {}): Promise<ListHoldsResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds`);
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
    return deserializeListHoldsResponse(data);
  }

  /**
   * Removes the specified accounts from a hold. Returns a list of statuses in
   * the same order as the request.
   *
   * @param holdId The hold ID.
   * @param matterId The matter ID.
   */
  async mattersHoldsRemoveHeldAccounts(holdId: string, matterId: string, req: RemoveHeldAccountsRequest): Promise<RemoveHeldAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }:removeHeldAccounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RemoveHeldAccountsResponse;
  }

  /**
   * Updates the scope (organizational unit or accounts) and query parameters
   * of a hold. You cannot add accounts to a hold that covers an organizational
   * unit, nor can you add organizational units to a hold that covers individual
   * accounts. If you try, the unsupported values are ignored.
   *
   * @param holdId The ID of the hold.
   * @param matterId The matter ID.
   */
  async mattersHoldsUpdate(holdId: string, matterId: string, req: Hold): Promise<Hold> {
    req = serializeHold(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/holds/${ holdId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeHold(data);
  }

  /**
   * Lists matters the requestor has access to.
   *
   */
  async mattersList(opts: MattersListOptions = {}): Promise<ListMattersResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.state !== undefined) {
      url.searchParams.append("state", String(opts.state));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListMattersResponse;
  }

  /**
   * Removes an account as a matter collaborator.
   *
   * @param matterId The matter ID.
   */
  async mattersRemovePermissions(matterId: string, req: RemoveMatterPermissionsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:removePermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Reopens the specified matter. Returns the matter with updated state.
   *
   * @param matterId The matter ID.
   */
  async mattersReopen(matterId: string, req: ReopenMatterRequest): Promise<ReopenMatterResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:reopen`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReopenMatterResponse;
  }

  /**
   * Creates a saved query.
   *
   * @param matterId The ID of the matter to create the saved query in.
   */
  async mattersSavedQueriesCreate(matterId: string, req: SavedQuery): Promise<SavedQuery> {
    req = serializeSavedQuery(req);
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/savedQueries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSavedQuery(data);
  }

  /**
   * Deletes the specified saved query.
   *
   * @param matterId The ID of the matter to delete the saved query from.
   * @param savedQueryId ID of the saved query to delete.
   */
  async mattersSavedQueriesDelete(matterId: string, savedQueryId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/savedQueries/${ savedQueryId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves the specified saved query.
   *
   * @param matterId The ID of the matter to get the saved query from.
   * @param savedQueryId ID of the saved query to retrieve.
   */
  async mattersSavedQueriesGet(matterId: string, savedQueryId: string): Promise<SavedQuery> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/savedQueries/${ savedQueryId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSavedQuery(data);
  }

  /**
   * Lists the saved queries in a matter.
   *
   * @param matterId The ID of the matter to get the saved queries for.
   */
  async mattersSavedQueriesList(matterId: string, opts: MattersSavedQueriesListOptions = {}): Promise<ListSavedQueriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }/savedQueries`);
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
    return deserializeListSavedQueriesResponse(data);
  }

  /**
   * Undeletes the specified matter. Returns the matter with updated state.
   *
   * @param matterId The matter ID.
   */
  async mattersUndelete(matterId: string, req: UndeleteMatterRequest): Promise<Matter> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Matter;
  }

  /**
   * Updates the specified matter. This updates only the name and description
   * of the matter, identified by matter ID. Changes to any other fields are
   * ignored. Returns the default view of the matter.
   *
   * @param matterId The matter ID.
   */
  async mattersUpdate(matterId: string, req: Matter): Promise<Matter> {
    const url = new URL(`${this.#baseUrl}v1/matters/${ matterId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Matter;
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
  async operationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async operationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the
   * `name` binding allows API services to override the binding to use different
   * resource name schemes, such as `users/*\/operations`. To override the
   * binding, API services can add a binding such as
   * `"/v1/{name=users/*}/operations"` to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async operationsList(name: string, opts: OperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }
}

/**
 * The results count for each account.
 */
export interface AccountCount {
  /**
   * Account owner.
   */
  account?: UserInfo;
  /**
   * The number of results (messages or files) found for this account.
   */
  count?: bigint;
}

function serializeAccountCount(data: any): AccountCount {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeAccountCount(data: any): AccountCount {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * An error that occurred when querying a specific account
 */
export interface AccountCountError {
  /**
   * Account owner.
   */
  account?: UserInfo;
  /**
   * Account query error.
   */
  errorType?:  | "ERROR_TYPE_UNSPECIFIED" | "WILDCARD_TOO_BROAD" | "TOO_MANY_TERMS" | "LOCATION_UNAVAILABLE" | "UNKNOWN" | "DEADLINE_EXCEEDED";
}

/**
 * The accounts to search
 */
export interface AccountInfo {
  /**
   * A set of accounts to search.
   */
  emails?: string[];
}

/**
 * The status of each account creation, and the **HeldAccount**, if successful.
 */
export interface AddHeldAccountResult {
  /**
   * Returned when the account was successfully created.
   */
  account?: HeldAccount;
  /**
   * Reports the request status. If it failed, returns an error message.
   */
  status?: Status;
}

function serializeAddHeldAccountResult(data: any): AddHeldAccountResult {
  return {
    ...data,
    account: data["account"] !== undefined ? serializeHeldAccount(data["account"]) : undefined,
  };
}

function deserializeAddHeldAccountResult(data: any): AddHeldAccountResult {
  return {
    ...data,
    account: data["account"] !== undefined ? deserializeHeldAccount(data["account"]) : undefined,
  };
}

/**
 * Add a list of accounts to a hold.
 */
export interface AddHeldAccountsRequest {
  /**
   * A comma-separated list of the account IDs of the accounts to add to the
   * hold. Specify either **emails** or **account_ids**, but not both.
   */
  accountIds?: string[];
  /**
   * A comma-separated list of the emails of the accounts to add to the hold.
   * Specify either **emails** or **account_ids**, but not both.
   */
  emails?: string[];
}

/**
 * Response for batch create held accounts.
 */
export interface AddHeldAccountsResponse {
  /**
   * The list of responses, in the same order as the batch request.
   */
  responses?: AddHeldAccountResult[];
}

function serializeAddHeldAccountsResponse(data: any): AddHeldAccountsResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeAddHeldAccountResult(item))) : undefined,
  };
}

function deserializeAddHeldAccountsResponse(data: any): AddHeldAccountsResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeAddHeldAccountResult(item))) : undefined,
  };
}

/**
 * Add an account with the permission specified. The role cannot be owner. If
 * an account already has a role in the matter, the existing role is
 * overwritten.
 */
export interface AddMatterPermissionsRequest {
  /**
   * Only relevant if **sendEmails** is **true**. To CC the requestor in the
   * email message, set to **true**. To not CC requestor, set to **false**.
   */
  ccMe?: boolean;
  /**
   * The account and its role to add.
   */
  matterPermission?: MatterPermission;
  /**
   * To send a notification email to the added account, set to **true**. To not
   * send a notification email, set to **false**.
   */
  sendEmails?: boolean;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Close a matter by ID.
 */
export interface CloseMatterRequest {
}

/**
 * Response to a CloseMatterRequest.
 */
export interface CloseMatterResponse {
  /**
   * The updated matter, with state **CLOSED**.
   */
  matter?: Matter;
}

/**
 * The export file in Cloud Storage
 */
export interface CloudStorageFile {
  /**
   * The name of the Cloud Storage bucket for the export file. You can use this
   * value in the [Cloud Storage JSON or XML
   * APIs](https://cloud.google.com/storage/docs/apis), but not to list the
   * bucket contents. Instead, you can [get individual export
   * files](https://cloud.google.com/storage/docs/json_api/v1/objects/get) by
   * object name.
   */
  bucketName?: string;
  /**
   * The md5 hash of the file.
   */
  md5Hash?: string;
  /**
   * The name of the Cloud Storage object for the export file. You can use this
   * value in the [Cloud Storage JSON or XML
   * APIs](https://cloud.google.com/storage/docs/apis).
   */
  objectName?: string;
  /**
   * The export file size.
   */
  size?: bigint;
}

function serializeCloudStorageFile(data: any): CloudStorageFile {
  return {
    ...data,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
  };
}

function deserializeCloudStorageFile(data: any): CloudStorageFile {
  return {
    ...data,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
  };
}

/**
 * Export sink for Cloud Storage files.
 */
export interface CloudStorageSink {
  /**
   * Output only. The exported files in Cloud Storage.
   */
  files?: CloudStorageFile[];
}

function serializeCloudStorageSink(data: any): CloudStorageSink {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeCloudStorageFile(item))) : undefined,
  };
}

function deserializeCloudStorageSink(data: any): CloudStorageSink {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeCloudStorageFile(item))) : undefined,
  };
}

/**
 * Service-specific options for holds.
 */
export interface CorpusQuery {
  /**
   * Service-specific options for Drive holds. If set, **CorpusType** must be
   * **DRIVE**.
   */
  driveQuery?: HeldDriveQuery;
  /**
   * Service-specific options for Groups holds. If set, **CorpusType** must be
   * **GROUPS**.
   */
  groupsQuery?: HeldGroupsQuery;
  /**
   * Service-specific options for Chat holds. If set, **CorpusType** must be
   * **HANGOUTS_CHAT**.
   */
  hangoutsChatQuery?: HeldHangoutsChatQuery;
  /**
   * Service-specific options for Gmail holds. If set, **CorpusType** must be
   * **MAIL**.
   */
  mailQuery?: HeldMailQuery;
  /**
   * Service-specific options for Voice holds. If set, **CorpusType** must be
   * **VOICE**.
   */
  voiceQuery?: HeldVoiceQuery;
}

function serializeCorpusQuery(data: any): CorpusQuery {
  return {
    ...data,
    groupsQuery: data["groupsQuery"] !== undefined ? serializeHeldGroupsQuery(data["groupsQuery"]) : undefined,
    mailQuery: data["mailQuery"] !== undefined ? serializeHeldMailQuery(data["mailQuery"]) : undefined,
  };
}

function deserializeCorpusQuery(data: any): CorpusQuery {
  return {
    ...data,
    groupsQuery: data["groupsQuery"] !== undefined ? deserializeHeldGroupsQuery(data["groupsQuery"]) : undefined,
    mailQuery: data["mailQuery"] !== undefined ? deserializeHeldMailQuery(data["mailQuery"]) : undefined,
  };
}

/**
 * Long running operation metadata for CountArtifacts.
 */
export interface CountArtifactsMetadata {
  /**
   * End time of count operation. Available when operation is done.
   */
  endTime?: Date;
  /**
   * The matter ID of the associated matter.
   */
  matterId?: string;
  /**
   * The search query from the request.
   */
  query?: Query;
  /**
   * Creation time of count operation.
   */
  startTime?: Date;
}

function serializeCountArtifactsMetadata(data: any): CountArtifactsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCountArtifactsMetadata(data: any): CountArtifactsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Count artifacts request.
 */
export interface CountArtifactsRequest {
  /**
   * The search query.
   */
  query?: Query;
  /**
   * Sets the granularity of the count results.
   */
  view?:  | "COUNT_RESULT_VIEW_UNSPECIFIED" | "TOTAL_COUNT" | "ALL";
}

function serializeCountArtifactsRequest(data: any): CountArtifactsRequest {
  return {
    ...data,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
  };
}

function deserializeCountArtifactsRequest(data: any): CountArtifactsRequest {
  return {
    ...data,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
  };
}

/**
 * Definition of the response for method CountArtifacts.
 */
export interface CountArtifactsResponse {
  /**
   * Count metrics for Groups.
   */
  groupsCountResult?: GroupsCountResult;
  /**
   * Count metrics for Gmail and classic Hangouts.
   */
  mailCountResult?: MailCountResult;
  /**
   * Total count of messages.
   */
  totalCount?: bigint;
}

function serializeCountArtifactsResponse(data: any): CountArtifactsResponse {
  return {
    ...data,
    groupsCountResult: data["groupsCountResult"] !== undefined ? serializeGroupsCountResult(data["groupsCountResult"]) : undefined,
    mailCountResult: data["mailCountResult"] !== undefined ? serializeMailCountResult(data["mailCountResult"]) : undefined,
    totalCount: data["totalCount"] !== undefined ? String(data["totalCount"]) : undefined,
  };
}

function deserializeCountArtifactsResponse(data: any): CountArtifactsResponse {
  return {
    ...data,
    groupsCountResult: data["groupsCountResult"] !== undefined ? deserializeGroupsCountResult(data["groupsCountResult"]) : undefined,
    mailCountResult: data["mailCountResult"] !== undefined ? deserializeMailCountResult(data["mailCountResult"]) : undefined,
    totalCount: data["totalCount"] !== undefined ? BigInt(data["totalCount"]) : undefined,
  };
}

/**
 * Options for Drive exports.
 */
export interface DriveExportOptions {
  /**
   * To include access level information for users with [indirect
   * access](https://support.google.com/vault/answer/6099459#metadata) to files,
   * set to **true**.
   */
  includeAccessInfo?: boolean;
}

/**
 * Additional options for Drive search
 */
export interface DriveOptions {
  /**
   * Set whether the results include only content encrypted with [Google
   * Workspace Client-side encryption](https://support.google.com/a?p=cse_ov)
   * content, only unencrypted content, or both. Defaults to both. Currently
   * supported for Drive.
   */
  clientSideEncryptedOption?:  | "CLIENT_SIDE_ENCRYPTED_OPTION_UNSPECIFIED" | "CLIENT_SIDE_ENCRYPTED_OPTION_ANY" | "CLIENT_SIDE_ENCRYPTED_OPTION_ENCRYPTED" | "CLIENT_SIDE_ENCRYPTED_OPTION_UNENCRYPTED";
  /**
   * Set to **true** to include shared drives.
   */
  includeSharedDrives?: boolean;
  /**
   * Set to true to include Team Drive.
   */
  includeTeamDrives?: boolean;
  /**
   * Search the current version of the Drive file, but export the contents of
   * the last version saved before 12:00 AM UTC on the specified date. Enter the
   * date in UTC.
   */
  versionDate?: Date;
}

function serializeDriveOptions(data: any): DriveOptions {
  return {
    ...data,
    versionDate: data["versionDate"] !== undefined ? data["versionDate"].toISOString() : undefined,
  };
}

function deserializeDriveOptions(data: any): DriveOptions {
  return {
    ...data,
    versionDate: data["versionDate"] !== undefined ? new Date(data["versionDate"]) : undefined,
  };
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
 * An export. To work with Vault resources, the account must have the [required
 * Vault privileges](https://support.google.com/vault/answer/2799699) and access
 * to the matter. To access a matter, the account must have created the matter,
 * have the matter shared with them, or have the **View All Matters** privilege.
 */
export interface Export {
  /**
   * Output only. The sink for export files in Cloud Storage.
   */
  cloudStorageSink?: CloudStorageSink;
  /**
   * Output only. The time when the export was created.
   */
  createTime?: Date;
  /**
   * Additional export options.
   */
  exportOptions?: ExportOptions;
  /**
   * Output only. The generated export ID.
   */
  id?: string;
  /**
   * Output only. The matter ID.
   */
  matterId?: string;
  /**
   * The export name. Don't use special characters (~!$'(),;@:/?) in the name,
   * they can prevent you from downloading exports.
   */
  name?: string;
  /**
   * The query parameters used to create the export.
   */
  query?: Query;
  /**
   * Output only. The requester of the export.
   */
  requester?: UserInfo;
  /**
   * Output only. Details about the export progress and size.
   */
  stats?: ExportStats;
  /**
   * Output only. The status of the export.
   */
  status?:  | "EXPORT_STATUS_UNSPECIFIED" | "COMPLETED" | "FAILED" | "IN_PROGRESS";
}

function serializeExport(data: any): Export {
  return {
    ...data,
    cloudStorageSink: data["cloudStorageSink"] !== undefined ? serializeCloudStorageSink(data["cloudStorageSink"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
    stats: data["stats"] !== undefined ? serializeExportStats(data["stats"]) : undefined,
  };
}

function deserializeExport(data: any): Export {
  return {
    ...data,
    cloudStorageSink: data["cloudStorageSink"] !== undefined ? deserializeCloudStorageSink(data["cloudStorageSink"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
    stats: data["stats"] !== undefined ? deserializeExportStats(data["stats"]) : undefined,
  };
}

/**
 * Additional options for exports
 */
export interface ExportOptions {
  /**
   * Options for Drive exports.
   */
  driveOptions?: DriveExportOptions;
  /**
   * Options for Groups exports.
   */
  groupsOptions?: GroupsExportOptions;
  /**
   * Options for Chat exports.
   */
  hangoutsChatOptions?: HangoutsChatExportOptions;
  /**
   * Options for Gmail exports.
   */
  mailOptions?: MailExportOptions;
  /**
   * The requested data region for the export.
   */
  region?:  | "EXPORT_REGION_UNSPECIFIED" | "ANY" | "US" | "EUROPE";
  /**
   * Options for Voice exports.
   */
  voiceOptions?: VoiceExportOptions;
}

/**
 * Progress information for an export.
 */
export interface ExportStats {
  /**
   * The number of messages or files already processed for export.
   */
  exportedArtifactCount?: bigint;
  /**
   * The size of export in bytes.
   */
  sizeInBytes?: bigint;
  /**
   * The number of messages or files to be exported.
   */
  totalArtifactCount?: bigint;
}

function serializeExportStats(data: any): ExportStats {
  return {
    ...data,
    exportedArtifactCount: data["exportedArtifactCount"] !== undefined ? String(data["exportedArtifactCount"]) : undefined,
    sizeInBytes: data["sizeInBytes"] !== undefined ? String(data["sizeInBytes"]) : undefined,
    totalArtifactCount: data["totalArtifactCount"] !== undefined ? String(data["totalArtifactCount"]) : undefined,
  };
}

function deserializeExportStats(data: any): ExportStats {
  return {
    ...data,
    exportedArtifactCount: data["exportedArtifactCount"] !== undefined ? BigInt(data["exportedArtifactCount"]) : undefined,
    sizeInBytes: data["sizeInBytes"] !== undefined ? BigInt(data["sizeInBytes"]) : undefined,
    totalArtifactCount: data["totalArtifactCount"] !== undefined ? BigInt(data["totalArtifactCount"]) : undefined,
  };
}

/**
 * Groups specific count metrics.
 */
export interface GroupsCountResult {
  /**
   * Error occurred when querying these accounts.
   */
  accountCountErrors?: AccountCountError[];
  /**
   * Subtotal count per matching account that have more than zero messages.
   */
  accountCounts?: AccountCount[];
  /**
   * Total number of accounts that can be queried and have more than zero
   * messages.
   */
  matchingAccountsCount?: bigint;
  /**
   * When **DataScope** is **HELD_DATA**, these accounts in the request are not
   * queried because they are not on hold. For other data scope, this field is
   * not set.
   */
  nonQueryableAccounts?: string[];
  /**
   * Total number of accounts involved in this count operation.
   */
  queriedAccountsCount?: bigint;
}

function serializeGroupsCountResult(data: any): GroupsCountResult {
  return {
    ...data,
    accountCounts: data["accountCounts"] !== undefined ? data["accountCounts"].map((item: any) => (serializeAccountCount(item))) : undefined,
    matchingAccountsCount: data["matchingAccountsCount"] !== undefined ? String(data["matchingAccountsCount"]) : undefined,
    queriedAccountsCount: data["queriedAccountsCount"] !== undefined ? String(data["queriedAccountsCount"]) : undefined,
  };
}

function deserializeGroupsCountResult(data: any): GroupsCountResult {
  return {
    ...data,
    accountCounts: data["accountCounts"] !== undefined ? data["accountCounts"].map((item: any) => (deserializeAccountCount(item))) : undefined,
    matchingAccountsCount: data["matchingAccountsCount"] !== undefined ? BigInt(data["matchingAccountsCount"]) : undefined,
    queriedAccountsCount: data["queriedAccountsCount"] !== undefined ? BigInt(data["queriedAccountsCount"]) : undefined,
  };
}

/**
 * Options for Groups exports.
 */
export interface GroupsExportOptions {
  /**
   * The file format for exported messages.
   */
  exportFormat?:  | "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST";
}

/**
 * Options for Chat exports.
 */
export interface HangoutsChatExportOptions {
  /**
   * The file format for exported messages.
   */
  exportFormat?:  | "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST";
}

/**
 * The Chat spaces to search
 */
export interface HangoutsChatInfo {
  /**
   * A list of Chat spaces IDs, as provided by the [Chat
   * API](https://developers.google.com/chat). There is a limit of exporting
   * from 500 Chat spaces per request.
   */
  roomId?: string[];
}

/**
 * Additional options for Google Chat search
 */
export interface HangoutsChatOptions {
  /**
   * For searches by account or organizational unit, set to **true** to include
   * rooms.
   */
  includeRooms?: boolean;
}

/**
 * An account covered by a hold. This structure is immutable. It can be an
 * individual account or a Google Group, depending on the service. To work with
 * Vault resources, the account must have the [required Vault privileges]
 * (https://support.google.com/vault/answer/2799699) and access to the matter.
 * To access a matter, the account must have created the matter, have the matter
 * shared with them, or have the **View All Matters** privilege.
 */
export interface HeldAccount {
  /**
   * The account ID, as provided by the [Admin
   * SDK](https://developers.google.com/admin-sdk/).
   */
  accountId?: string;
  /**
   * The primary email address of the account. If used as an input, this takes
   * precedence over **accountId**.
   */
  email?: string;
  /**
   * Output only. The first name of the account holder.
   */
  firstName?: string;
  /**
   * Output only. When the account was put on hold.
   */
  holdTime?: Date;
  /**
   * Output only. The last name of the account holder.
   */
  lastName?: string;
}

function serializeHeldAccount(data: any): HeldAccount {
  return {
    ...data,
    holdTime: data["holdTime"] !== undefined ? data["holdTime"].toISOString() : undefined,
  };
}

function deserializeHeldAccount(data: any): HeldAccount {
  return {
    ...data,
    holdTime: data["holdTime"] !== undefined ? new Date(data["holdTime"]) : undefined,
  };
}

/**
 * Options for Drive holds.
 */
export interface HeldDriveQuery {
  /**
   * To include files in shared drives in the hold, set to **true**.
   */
  includeSharedDriveFiles?: boolean;
  /**
   * To include files in Team Drives in the hold, set to **true**.
   */
  includeTeamDriveFiles?: boolean;
}

/**
 * Query options for group holds.
 */
export interface HeldGroupsQuery {
  /**
   * The end time for the query. Specify in GMT. The value is rounded to 12 AM
   * on the specified date.
   */
  endTime?: Date;
  /**
   * The start time for the query. Specify in GMT. The value is rounded to 12
   * AM on the specified date.
   */
  startTime?: Date;
  /**
   * The [search operators](https://support.google.com/vault/answer/2474474)
   * used to refine the messages covered by the hold.
   */
  terms?: string;
}

function serializeHeldGroupsQuery(data: any): HeldGroupsQuery {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeHeldGroupsQuery(data: any): HeldGroupsQuery {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Options for Chat holds.
 */
export interface HeldHangoutsChatQuery {
  /**
   * To include messages in Chat spaces the user was a member of, set to
   * **true**.
   */
  includeRooms?: boolean;
}

/**
 * Query options for Gmail holds.
 */
export interface HeldMailQuery {
  /**
   * The end time for the query. Specify in GMT. The value is rounded to 12 AM
   * on the specified date.
   */
  endTime?: Date;
  /**
   * The start time for the query. Specify in GMT. The value is rounded to 12
   * AM on the specified date.
   */
  startTime?: Date;
  /**
   * The [search operators](https://support.google.com/vault/answer/2474474)
   * used to refine the messages covered by the hold.
   */
  terms?: string;
}

function serializeHeldMailQuery(data: any): HeldMailQuery {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeHeldMailQuery(data: any): HeldMailQuery {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The organizational unit covered by a hold. This structure is immutable.
 */
export interface HeldOrgUnit {
  /**
   * When the organizational unit was put on hold. This property is immutable.
   */
  holdTime?: Date;
  /**
   * The organizational unit's immutable ID as provided by the [Admin
   * SDK](https://developers.google.com/admin-sdk/).
   */
  orgUnitId?: string;
}

function serializeHeldOrgUnit(data: any): HeldOrgUnit {
  return {
    ...data,
    holdTime: data["holdTime"] !== undefined ? data["holdTime"].toISOString() : undefined,
  };
}

function deserializeHeldOrgUnit(data: any): HeldOrgUnit {
  return {
    ...data,
    holdTime: data["holdTime"] !== undefined ? new Date(data["holdTime"]) : undefined,
  };
}

/**
 * Options for Voice holds.
 */
export interface HeldVoiceQuery {
  /**
   * A list of data types covered by the hold. Should be non-empty. Order does
   * not matter and duplicates are ignored.
   */
  coveredData?:  | "COVERED_DATA_UNSPECIFIED" | "TEXT_MESSAGES" | "VOICEMAILS" | "CALL_LOGS"[];
}

/**
 * A hold. A hold prevents the specified Google Workspace service from purging
 * data for specific accounts or all members of an organizational unit. To work
 * with Vault resources, the account must have the [required Vault privileges]
 * (https://support.google.com/vault/answer/2799699) and access to the matter.
 * To access a matter, the account must have created the matter, have the matter
 * shared with them, or have the **View All Matters** privilege.
 */
export interface Hold {
  /**
   * If set, the hold applies to the specified accounts and **orgUnit** must be
   * empty.
   */
  accounts?: HeldAccount[];
  /**
   * The service to be searched.
   */
  corpus?:  | "CORPUS_TYPE_UNSPECIFIED" | "DRIVE" | "MAIL" | "GROUPS" | "HANGOUTS_CHAT" | "VOICE";
  /**
   * The unique immutable ID of the hold. Assigned during creation.
   */
  holdId?: string;
  /**
   * The name of the hold.
   */
  name?: string;
  /**
   * If set, the hold applies to all members of the organizational unit and
   * **accounts** must be empty. This property is mutable. For Groups holds, set
   * **accounts**.
   */
  orgUnit?: HeldOrgUnit;
  /**
   * Service-specific options. If set, **CorpusQuery** must match
   * **CorpusType**.
   */
  query?: CorpusQuery;
  /**
   * The last time this hold was modified.
   */
  updateTime?: Date;
}

function serializeHold(data: any): Hold {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (serializeHeldAccount(item))) : undefined,
    orgUnit: data["orgUnit"] !== undefined ? serializeHeldOrgUnit(data["orgUnit"]) : undefined,
    query: data["query"] !== undefined ? serializeCorpusQuery(data["query"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeHold(data: any): Hold {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (deserializeHeldAccount(item))) : undefined,
    orgUnit: data["orgUnit"] !== undefined ? deserializeHeldOrgUnit(data["orgUnit"]) : undefined,
    query: data["query"] !== undefined ? deserializeCorpusQuery(data["query"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The exports for a matter.
 */
export interface ListExportsResponse {
  /**
   * The list of exports.
   */
  exports?: Export[];
  /**
   * Page token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
}

function serializeListExportsResponse(data: any): ListExportsResponse {
  return {
    ...data,
    exports: data["exports"] !== undefined ? data["exports"].map((item: any) => (serializeExport(item))) : undefined,
  };
}

function deserializeListExportsResponse(data: any): ListExportsResponse {
  return {
    ...data,
    exports: data["exports"] !== undefined ? data["exports"].map((item: any) => (deserializeExport(item))) : undefined,
  };
}

/**
 * Returns a list of the accounts covered by a hold.
 */
export interface ListHeldAccountsResponse {
  /**
   * The held accounts on a hold.
   */
  accounts?: HeldAccount[];
}

function serializeListHeldAccountsResponse(data: any): ListHeldAccountsResponse {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (serializeHeldAccount(item))) : undefined,
  };
}

function deserializeListHeldAccountsResponse(data: any): ListHeldAccountsResponse {
  return {
    ...data,
    accounts: data["accounts"] !== undefined ? data["accounts"].map((item: any) => (deserializeHeldAccount(item))) : undefined,
  };
}

/**
 * The holds for a matter.
 */
export interface ListHoldsResponse {
  /**
   * The list of holds.
   */
  holds?: Hold[];
  /**
   * Page token to retrieve the next page of results in the list. If this is
   * empty, then there are no more holds to list.
   */
  nextPageToken?: string;
}

function serializeListHoldsResponse(data: any): ListHoldsResponse {
  return {
    ...data,
    holds: data["holds"] !== undefined ? data["holds"].map((item: any) => (serializeHold(item))) : undefined,
  };
}

function deserializeListHoldsResponse(data: any): ListHoldsResponse {
  return {
    ...data,
    holds: data["holds"] !== undefined ? data["holds"].map((item: any) => (deserializeHold(item))) : undefined,
  };
}

/**
 * Provides the list of matters.
 */
export interface ListMattersResponse {
  /**
   * List of matters.
   */
  matters?: Matter[];
  /**
   * Page token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * Definition of the response for method ListSaveQuery.
 */
export interface ListSavedQueriesResponse {
  /**
   * Page token to retrieve the next page of results in the list. If this is
   * empty, then there are no more saved queries to list.
   */
  nextPageToken?: string;
  /**
   * List of saved queries.
   */
  savedQueries?: SavedQuery[];
}

function serializeListSavedQueriesResponse(data: any): ListSavedQueriesResponse {
  return {
    ...data,
    savedQueries: data["savedQueries"] !== undefined ? data["savedQueries"].map((item: any) => (serializeSavedQuery(item))) : undefined,
  };
}

function deserializeListSavedQueriesResponse(data: any): ListSavedQueriesResponse {
  return {
    ...data,
    savedQueries: data["savedQueries"] !== undefined ? data["savedQueries"].map((item: any) => (deserializeSavedQuery(item))) : undefined,
  };
}

/**
 * Gmail and classic Hangouts-specific count metrics.
 */
export interface MailCountResult {
  /**
   * Errors occurred when querying these accounts.
   */
  accountCountErrors?: AccountCountError[];
  /**
   * Subtotal count per matching account that have more than zero messages.
   */
  accountCounts?: AccountCount[];
  /**
   * Total number of accounts that can be queried and have more than zero
   * messages.
   */
  matchingAccountsCount?: bigint;
  /**
   * When **DataScope** is **HELD_DATA** and when account emails are passed in
   * explicitly, the list of accounts in the request that are not queried
   * because they are not on hold in the matter. For other data scopes, this
   * field is not set.
   */
  nonQueryableAccounts?: string[];
  /**
   * Total number of accounts involved in this count operation.
   */
  queriedAccountsCount?: bigint;
}

function serializeMailCountResult(data: any): MailCountResult {
  return {
    ...data,
    accountCounts: data["accountCounts"] !== undefined ? data["accountCounts"].map((item: any) => (serializeAccountCount(item))) : undefined,
    matchingAccountsCount: data["matchingAccountsCount"] !== undefined ? String(data["matchingAccountsCount"]) : undefined,
    queriedAccountsCount: data["queriedAccountsCount"] !== undefined ? String(data["queriedAccountsCount"]) : undefined,
  };
}

function deserializeMailCountResult(data: any): MailCountResult {
  return {
    ...data,
    accountCounts: data["accountCounts"] !== undefined ? data["accountCounts"].map((item: any) => (deserializeAccountCount(item))) : undefined,
    matchingAccountsCount: data["matchingAccountsCount"] !== undefined ? BigInt(data["matchingAccountsCount"]) : undefined,
    queriedAccountsCount: data["queriedAccountsCount"] !== undefined ? BigInt(data["queriedAccountsCount"]) : undefined,
  };
}

/**
 * Options for Gmail exports.
 */
export interface MailExportOptions {
  /**
   * The file format for exported messages.
   */
  exportFormat?:  | "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST";
  /**
   * To export confidential mode content, set to **true**.
   */
  showConfidentialModeContent?: boolean;
  /**
   * To use the new export system, set to **true**.
   */
  useNewExport?: boolean;
}

/**
 * Additional options for Gmail search
 */
export interface MailOptions {
  /**
   * Set to **true** to exclude drafts.
   */
  excludeDrafts?: boolean;
}

/**
 * Represents a matter. To work with Vault resources, the account must have the
 * [required Vault privileges] (https://support.google.com/vault/answer/2799699)
 * and access to the matter. To access a matter, the account must have created
 * the matter, have the matter shared with them, or have the **View All
 * Matters** privilege.
 */
export interface Matter {
  /**
   * An optional description for the matter.
   */
  description?: string;
  /**
   * The matter ID, which is generated by the server. Leave blank when creating
   * a matter.
   */
  matterId?: string;
  /**
   * Lists the users and their permission for the matter. Currently there is no
   * programmer defined limit on the number of permissions a matter can have.
   */
  matterPermissions?: MatterPermission[];
  /**
   * The name of the matter.
   */
  name?: string;
  /**
   * The state of the matter.
   */
  state?:  | "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | "DELETED";
}

/**
 * Users can be matter owners or collaborators. Each matter has only one owner.
 * All others users who can access the matter are collaborators. When an account
 * is purged, its corresponding MatterPermission resources cease to exist.
 */
export interface MatterPermission {
  /**
   * The account ID, as provided by the [Admin
   * SDK](https://developers.google.com/admin-sdk/).
   */
  accountId?: string;
  /**
   * The user's role for the matter.
   */
  role?:  | "ROLE_UNSPECIFIED" | "COLLABORATOR" | "OWNER";
}

/**
 * Additional options for Vault#mattersExportsList.
 */
export interface MattersExportsListOptions {
  /**
   * The number of exports to return in the response.
   */
  pageSize?: number;
  /**
   * The pagination token as returned in the response.
   */
  pageToken?: string;
}

/**
 * Additional options for Vault#mattersGet.
 */
export interface MattersGetOptions {
  /**
   * Specifies how much information about the matter to return in the response.
   */
  view?:  | "VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Vault#mattersHoldsGet.
 */
export interface MattersHoldsGetOptions {
  /**
   * The amount of detail to return for a hold.
   */
  view?:  | "HOLD_VIEW_UNSPECIFIED" | "BASIC_HOLD" | "FULL_HOLD";
}

/**
 * Additional options for Vault#mattersHoldsList.
 */
export interface MattersHoldsListOptions {
  /**
   * The number of holds to return in the response, between 0 and 100
   * inclusive. Leaving this empty, or as 0, is the same as **page_size** = 100.
   */
  pageSize?: number;
  /**
   * The pagination token as returned in the response. An empty token means
   * start from the beginning.
   */
  pageToken?: string;
  /**
   * The amount of detail to return for a hold.
   */
  view?:  | "HOLD_VIEW_UNSPECIFIED" | "BASIC_HOLD" | "FULL_HOLD";
}

/**
 * Additional options for Vault#mattersList.
 */
export interface MattersListOptions {
  /**
   * The number of matters to return in the response. Default and maximum are
   * 100.
   */
  pageSize?: number;
  /**
   * The pagination token as returned in the response.
   */
  pageToken?: string;
  /**
   * If set, lists only matters with the specified state. The default lists
   * matters of all states.
   */
  state?:  | "STATE_UNSPECIFIED" | "OPEN" | "CLOSED" | "DELETED";
  /**
   * Specifies how much information about the matter to return in response.
   */
  view?:  | "VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Vault#mattersSavedQueriesList.
 */
export interface MattersSavedQueriesListOptions {
  /**
   * The maximum number of saved queries to return.
   */
  pageSize?: number;
  /**
   * The pagination token as returned in the previous response. An empty token
   * means start from the beginning.
   */
  pageToken?: string;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: Status;
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
 * Additional options for Vault#operationsList.
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
 * The organizational unit to search
 */
export interface OrgUnitInfo {
  /**
   * The name of the organizational unit to search, as provided by the [Admin
   * SDK Directory API](https://developers.google.com/admin-sdk/directory/).
   */
  orgUnitId?: string;
}

/**
 * The query definition used for search and export.
 */
export interface Query {
  /**
   * Required when **SearchMethod** is **ACCOUNT**.
   */
  accountInfo?: AccountInfo;
  /**
   * The Google Workspace service to search.
   */
  corpus?:  | "CORPUS_TYPE_UNSPECIFIED" | "DRIVE" | "MAIL" | "GROUPS" | "HANGOUTS_CHAT" | "VOICE";
  /**
   * The data source to search.
   */
  dataScope?:  | "DATA_SCOPE_UNSPECIFIED" | "ALL_DATA" | "HELD_DATA" | "UNPROCESSED_DATA";
  /**
   * Set Drive search-specific options.
   */
  driveOptions?: DriveOptions;
  /**
   * The end time for the search query. Specify in GMT. The value is rounded to
   * 12 AM on the specified date.
   */
  endTime?: Date;
  /**
   * Required when **SearchMethod** is **ROOM**. (read-only)
   */
  hangoutsChatInfo?: HangoutsChatInfo;
  /**
   * Set Chat search-specific options. (read-only)
   */
  hangoutsChatOptions?: HangoutsChatOptions;
  /**
   * Set Gmail search-specific options.
   */
  mailOptions?: MailOptions;
  /**
   * The entity to search. This field replaces **searchMethod** to support
   * shared drives. When **searchMethod** is **TEAM_DRIVE**, the response of
   * this field is **SHARED_DRIVE**.
   */
  method?:  | "SEARCH_METHOD_UNSPECIFIED" | "ACCOUNT" | "ORG_UNIT" | "TEAM_DRIVE" | "ENTIRE_ORG" | "ROOM" | "SITES_URL" | "SHARED_DRIVE";
  /**
   * Required when **SearchMethod** is **ORG_UNIT**.
   */
  orgUnitInfo?: OrgUnitInfo;
  /**
   * The search method to use.
   */
  searchMethod?:  | "SEARCH_METHOD_UNSPECIFIED" | "ACCOUNT" | "ORG_UNIT" | "TEAM_DRIVE" | "ENTIRE_ORG" | "ROOM" | "SITES_URL" | "SHARED_DRIVE";
  /**
   * Required when **SearchMethod** is **SHARED_DRIVE**.
   */
  sharedDriveInfo?: SharedDriveInfo;
  /**
   * Required when **SearchMethod** is **SITES_URL**.
   */
  sitesUrlInfo?: SitesUrlInfo;
  /**
   * The start time for the search query. Specify in GMT. The value is rounded
   * to 12 AM on the specified date.
   */
  startTime?: Date;
  /**
   * Required when **SearchMethod** is **TEAM_DRIVE**.
   */
  teamDriveInfo?: TeamDriveInfo;
  /**
   * Service-specific [search
   * operators](https://support.google.com/vault/answer/2474474) to filter
   * search results.
   */
  terms?: string;
  /**
   * The time zone name. It should be an IANA TZ name, such as
   * "America/Los_Angeles". For a list of time zone names, see [Time
   * Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For
   * more information about how Vault uses time zones, see [the Vault help
   * center](https://support.google.com/vault/answer/6092995#time).
   */
  timeZone?: string;
  /**
   * Set Voice search-specific options.
   */
  voiceOptions?: VoiceOptions;
}

function serializeQuery(data: any): Query {
  return {
    ...data,
    driveOptions: data["driveOptions"] !== undefined ? serializeDriveOptions(data["driveOptions"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeQuery(data: any): Query {
  return {
    ...data,
    driveOptions: data["driveOptions"] !== undefined ? deserializeDriveOptions(data["driveOptions"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Remove a list of accounts from a hold.
 */
export interface RemoveHeldAccountsRequest {
  /**
   * The account IDs of the accounts to remove from the hold.
   */
  accountIds?: string[];
}

/**
 * Response for batch delete held accounts.
 */
export interface RemoveHeldAccountsResponse {
  /**
   * A list of statuses for the deleted accounts. Results have the same order
   * as the request.
   */
  statuses?: Status[];
}

/**
 * Remove an account as a matter collaborator.
 */
export interface RemoveMatterPermissionsRequest {
  /**
   * The account ID.
   */
  accountId?: string;
}

/**
 * Reopen a matter by ID.
 */
export interface ReopenMatterRequest {
}

/**
 * Response to a ReopenMatterRequest.
 */
export interface ReopenMatterResponse {
  /**
   * The updated matter, with state **OPEN**.
   */
  matter?: Matter;
}

/**
 * The definition of a saved query. To work with Vault resources, the account
 * must have the [required Vault
 * privileges](https://support.google.com/vault/answer/2799699) and access to
 * the matter. To access a matter, the account must have created the matter,
 * have the matter shared with them, or have the **View All Matters** privilege.
 */
export interface SavedQuery {
  /**
   * Output only. The server-generated timestamp when the saved query was
   * created.
   */
  createTime?: Date;
  /**
   * The name of the saved query.
   */
  displayName?: string;
  /**
   * Output only. The matter ID of the matter the saved query is saved in. The
   * server does not use this field during create and always uses matter ID in
   * the URL.
   */
  matterId?: string;
  /**
   * The search parameters of the saved query.
   */
  query?: Query;
  /**
   * A unique identifier for the saved query.
   */
  savedQueryId?: string;
}

function serializeSavedQuery(data: any): SavedQuery {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
  };
}

function deserializeSavedQuery(data: any): SavedQuery {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
  };
}

/**
 * The shared drives to search
 */
export interface SharedDriveInfo {
  /**
   * A list of shared drive IDs, as provided by the [Drive
   * API](https://developers.google.com/drive).
   */
  sharedDriveIds?: string[];
}

/**
 * The published site URLs of new Google Sites to search
 */
export interface SitesUrlInfo {
  /**
   * A list of published site URLs.
   */
  urls?: string[];
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface Status {
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
 * Team Drives to search
 */
export interface TeamDriveInfo {
  /**
   * List of Team Drive IDs, as provided by the [Drive
   * API](https://developers.google.com/drive).
   */
  teamDriveIds?: string[];
}

/**
 * Undelete a matter by ID.
 */
export interface UndeleteMatterRequest {
}

/**
 * User's information.
 */
export interface UserInfo {
  /**
   * The displayed name of the user.
   */
  displayName?: string;
  /**
   * The email address of the user.
   */
  email?: string;
}

/**
 * The options for Voice exports.
 */
export interface VoiceExportOptions {
  /**
   * The file format for exported text messages.
   */
  exportFormat?:  | "EXPORT_FORMAT_UNSPECIFIED" | "MBOX" | "PST";
}

/**
 * Additional options for Voice search
 */
export interface VoiceOptions {
  /**
   * Datatypes to search
   */
  coveredData?:  | "COVERED_DATA_UNSPECIFIED" | "TEXT_MESSAGES" | "VOICEMAILS" | "CALL_LOGS"[];
}