// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Search API Client for Deno
 * ================================
 * 
 * Cloud Search provides cloud-based search capabilities over Google Workspace data. The Cloud Search API allows indexing of non-Google Workspace data into Cloud Search.
 * 
 * Docs: https://developers.google.com/cloud-search/docs/guides/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Cloud Search provides cloud-based search capabilities over Google Workspace
 * data. The Cloud Search API allows indexing of non-Google Workspace data into
 * Cloud Search.
 */
export class CloudSearch {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudsearch.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Checks whether an item is accessible by specified principal. Principal
   * must be a user; groups and domain values aren't supported. **Note:** This
   * API requires an admin account to execute.
   *
   * @param name Item name, format: datasources/{source_id}/items/{item_id}
   */
  async debugDatasourcesItemsCheckAccess(name: string, req: Principal, opts: DebugDatasourcesItemsCheckAccessOptions = {}): Promise<CheckAccessResponse> {
    const url = new URL(`${this.#baseUrl}v1/debug/${ name }:checkAccess`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckAccessResponse;
  }

  /**
   * Fetches the item whose viewUrl exactly matches that of the URL provided in
   * the request. **Note:** This API requires an admin account to execute.
   *
   * @param name Source name, format: datasources/{source_id}
   */
  async debugDatasourcesItemsSearchByViewUrl(name: string, req: SearchItemsByViewUrlRequest): Promise<SearchItemsByViewUrlResponse> {
    const url = new URL(`${this.#baseUrl}v1/debug/${ name }/items:searchByViewUrl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchItemsByViewUrlResponse(data);
  }

  /**
   * List all unmapped identities for a specific item. **Note:** This API
   * requires an admin account to execute.
   *
   * @param parent The name of the item, in the following format: datasources/{source_id}/items/{ID}
   */
  async debugDatasourcesItemsUnmappedidsList(parent: string, opts: DebugDatasourcesItemsUnmappedidsListOptions = {}): Promise<ListUnmappedIdentitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/debug/${ parent }/unmappedids`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
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
    return data as ListUnmappedIdentitiesResponse;
  }

  /**
   * Lists names of items associated with an unmapped identity. **Note:** This
   * API requires an admin account to execute.
   *
   * @param parent The name of the identity source, in the following format: identitysources/{source_id}}
   */
  async debugIdentitysourcesItemsListForunmappedidentity(parent: string, opts: DebugIdentitysourcesItemsListForunmappedidentityOptions = {}): Promise<ListItemNamesForUnmappedIdentityResponse> {
    const url = new URL(`${this.#baseUrl}v1/debug/${ parent }/items:forunmappedidentity`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    if (opts.groupResourceName !== undefined) {
      url.searchParams.append("groupResourceName", String(opts.groupResourceName));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.userResourceName !== undefined) {
      url.searchParams.append("userResourceName", String(opts.userResourceName));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListItemNamesForUnmappedIdentityResponse;
  }

  /**
   * Lists unmapped user identities for an identity source. **Note:** This API
   * requires an admin account to execute.
   *
   * @param parent The name of the identity source, in the following format: identitysources/{source_id}
   */
  async debugIdentitysourcesUnmappedidsList(parent: string, opts: DebugIdentitysourcesUnmappedidsListOptions = {}): Promise<ListUnmappedIdentitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/debug/${ parent }/unmappedids`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resolutionStatusCode !== undefined) {
      url.searchParams.append("resolutionStatusCode", String(opts.resolutionStatusCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListUnmappedIdentitiesResponse;
  }

  /**
   * Deletes the schema of a data source. **Note:** This API requires an admin
   * or service account to execute.
   *
   * @param name The name of the data source to delete Schema. Format: datasources/{source_id}
   */
  async indexingDatasourcesDeleteSchema(name: string, opts: IndexingDatasourcesDeleteSchemaOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/schema`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the schema of a data source. **Note:** This API requires an admin or
   * service account to execute.
   *
   * @param name The name of the data source to get Schema. Format: datasources/{source_id}
   */
  async indexingDatasourcesGetSchema(name: string, opts: IndexingDatasourcesGetSchemaOptions = {}): Promise<Schema> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/schema`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSchema(data);
  }

  /**
   * Deletes Item resource for the specified resource name. This API requires
   * an admin or service account to execute. The service account used is the one
   * whitelisted in the corresponding data source.
   *
   * @param name Required. The name of the item to delete. Format: datasources/{source_id}/items/{item_id}
   */
  async indexingDatasourcesItemsDelete(name: string, opts: IndexingDatasourcesItemsDeleteOptions = {}): Promise<Operation> {
    opts = serializeIndexingDatasourcesItemsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }`);
    if (opts.connectorName !== undefined) {
      url.searchParams.append("connectorName", String(opts.connectorName));
    }
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    if (opts.mode !== undefined) {
      url.searchParams.append("mode", String(opts.mode));
    }
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Deletes all items in a queue. This method is useful for deleting stale
   * items. This API requires an admin or service account to execute. The
   * service account used is the one whitelisted in the corresponding data
   * source.
   *
   * @param name The name of the Data Source to delete items in a queue. Format: datasources/{source_id}
   */
  async indexingDatasourcesItemsDeleteQueueItems(name: string, req: DeleteQueueItemsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/items:deleteQueueItems`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets Item resource by item name. This API requires an admin or service
   * account to execute. The service account used is the one whitelisted in the
   * corresponding data source.
   *
   * @param name The name of the item to get info. Format: datasources/{source_id}/items/{item_id}
   */
  async indexingDatasourcesItemsGet(name: string, opts: IndexingDatasourcesItemsGetOptions = {}): Promise<Item> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }`);
    if (opts.connectorName !== undefined) {
      url.searchParams.append("connectorName", String(opts.connectorName));
    }
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeItem(data);
  }

  /**
   * Updates Item ACL, metadata, and content. It will insert the Item if it
   * does not exist. This method does not support partial updates. Fields with
   * no provided values are cleared out in the Cloud Search index. This API
   * requires an admin or service account to execute. The service account used
   * is the one whitelisted in the corresponding data source.
   *
   * @param name The name of the Item. Format: datasources/{source_id}/items/{item_id} This is a required field. The maximum length is 1536 characters.
   */
  async indexingDatasourcesItemsIndex(name: string, req: IndexItemRequest): Promise<Operation> {
    req = serializeIndexItemRequest(req);
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }:index`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists all or a subset of Item resources. This API requires an admin or
   * service account to execute. The service account used is the one whitelisted
   * in the corresponding data source.
   *
   * @param name The name of the Data Source to list Items. Format: datasources/{source_id}
   */
  async indexingDatasourcesItemsList(name: string, opts: IndexingDatasourcesItemsListOptions = {}): Promise<ListItemsResponse> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/items`);
    if (opts.brief !== undefined) {
      url.searchParams.append("brief", String(opts.brief));
    }
    if (opts.connectorName !== undefined) {
      url.searchParams.append("connectorName", String(opts.connectorName));
    }
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
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
    return deserializeListItemsResponse(data);
  }

  /**
   * Polls for unreserved items from the indexing queue and marks a set as
   * reserved, starting with items that have the oldest timestamp from the
   * highest priority ItemStatus. The priority order is as follows: ERROR
   * MODIFIED NEW_ITEM ACCEPTED Reserving items ensures that polling from other
   * threads cannot create overlapping sets. After handling the reserved items,
   * the client should put items back into the unreserved state, either by
   * calling index, or by calling push with the type REQUEUE. Items
   * automatically become available (unreserved) after 4 hours even if no update
   * or push method is called. This API requires an admin or service account to
   * execute. The service account used is the one whitelisted in the
   * corresponding data source.
   *
   * @param name The name of the Data Source to poll items. Format: datasources/{source_id}
   */
  async indexingDatasourcesItemsPoll(name: string, req: PollItemsRequest): Promise<PollItemsResponse> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/items:poll`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePollItemsResponse(data);
  }

  /**
   * Pushes an item onto a queue for later polling and updating. This API
   * requires an admin or service account to execute. The service account used
   * is the one whitelisted in the corresponding data source.
   *
   * @param name The name of the item to push into the indexing queue. Format: datasources/{source_id}/items/{ID} This is a required field. The maximum length is 1536 characters.
   */
  async indexingDatasourcesItemsPush(name: string, req: PushItemRequest): Promise<Item> {
    req = serializePushItemRequest(req);
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }:push`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeItem(data);
  }

  /**
   * Unreserves all items from a queue, making them all eligible to be polled.
   * This method is useful for resetting the indexing queue after a connector
   * has been restarted. This API requires an admin or service account to
   * execute. The service account used is the one whitelisted in the
   * corresponding data source.
   *
   * @param name The name of the Data Source to unreserve all items. Format: datasources/{source_id}
   */
  async indexingDatasourcesItemsUnreserve(name: string, req: UnreserveItemsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/items:unreserve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates an upload session for uploading item content. For items smaller
   * than 100 KB, it's easier to embed the content inline within an index
   * request. This API requires an admin or service account to execute. The
   * service account used is the one whitelisted in the corresponding data
   * source.
   *
   * @param name The name of the Item to start a resumable upload. Format: datasources/{source_id}/items/{item_id}. The maximum length is 1536 bytes.
   */
  async indexingDatasourcesItemsUpload(name: string, req: StartUploadItemRequest): Promise<UploadItemRef> {
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }:upload`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadItemRef;
  }

  /**
   * Updates the schema of a data source. This method does not perform
   * incremental updates to the schema. Instead, this method updates the schema
   * by overwriting the entire schema. **Note:** This API requires an admin or
   * service account to execute.
   *
   * @param name The name of the data source to update Schema. Format: datasources/{source_id}
   */
  async indexingDatasourcesUpdateSchema(name: string, req: UpdateSchemaRequest): Promise<Operation> {
    req = serializeUpdateSchemaRequest(req);
    const url = new URL(`${this.#baseUrl}v1/indexing/${ name }/schema`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Uploads media for indexing. The upload endpoint supports direct and
   * resumable upload protocols and is intended for large items that can not be
   * [inlined during index
   * requests](https://developers.google.com/cloud-search/docs/reference/rest/v1/indexing.datasources.items#itemcontent).
   * To index large content: 1. Call indexing.datasources.items.upload with the
   * item name to begin an upload session and retrieve the UploadItemRef. 1.
   * Call media.upload to upload the content, as a streaming request, using the
   * same resource name from the UploadItemRef from step 1. 1. Call
   * indexing.datasources.items.index to index the item. Populate the
   * [ItemContent](/cloud-search/docs/reference/rest/v1/indexing.datasources.items#ItemContent)
   * with the UploadItemRef from step 1. For additional information, see [Create
   * a content connector using the REST
   * API](https://developers.google.com/cloud-search/docs/guides/content-connector#rest).
   * **Note:** This API requires a service account to execute.
   *
   * @param resourceName Name of the media that is being downloaded. See ReadRequest.resource_name.
   */
  async mediaUpload(resourceName: string, req: Media): Promise<Media> {
    const url = new URL(`${this.#baseUrl}v1/media/${ resourceName }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Media;
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
  async operationsLroList(name: string, opts: OperationsLroListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/lro`);
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

  /**
   * The Cloud Search Query API provides the search method, which returns the
   * most relevant results from a user query. The results can come from Google
   * Workspace apps, such as Gmail or Google Drive, or they can come from data
   * that you have indexed from a third party. **Note:** This API requires a
   * standard end user account to execute. A service account can't perform Query
   * API requests directly; to use a service account to perform queries, set up
   * [Google Workspace domain-wide delegation of
   * authority](https://developers.google.com/cloud-search/docs/guides/delegation/).
   *
   */
  async querySearch(req: SearchRequest): Promise<SearchResponse> {
    req = serializeSearchRequest(req);
    const url = new URL(`${this.#baseUrl}v1/query/search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchResponse(data);
  }

  /**
   * Returns list of sources that user can use for Search and Suggest APIs.
   * **Note:** This API requires a standard end user account to execute. A
   * service account can't perform Query API requests directly; to use a service
   * account to perform queries, set up [Google Workspace domain-wide delegation
   * of
   * authority](https://developers.google.com/cloud-search/docs/guides/delegation/).
   *
   */
  async querySourcesList(opts: QuerySourcesListOptions = {}): Promise<ListQuerySourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/query/sources`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts["requestOptions.debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("requestOptions.debugOptions.enableDebugging", String(opts["requestOptions.debugOptions.enableDebugging"]));
    }
    if (opts["requestOptions.languageCode"] !== undefined) {
      url.searchParams.append("requestOptions.languageCode", String(opts["requestOptions.languageCode"]));
    }
    if (opts["requestOptions.searchApplicationId"] !== undefined) {
      url.searchParams.append("requestOptions.searchApplicationId", String(opts["requestOptions.searchApplicationId"]));
    }
    if (opts["requestOptions.timeZone"] !== undefined) {
      url.searchParams.append("requestOptions.timeZone", String(opts["requestOptions.timeZone"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListQuerySourcesResponse;
  }

  /**
   * Provides suggestions for autocompleting the query. **Note:** This API
   * requires a standard end user account to execute. A service account can't
   * perform Query API requests directly; to use a service account to perform
   * queries, set up [Google Workspace domain-wide delegation of
   * authority](https://developers.google.com/cloud-search/docs/guides/delegation/).
   *
   */
  async querySuggest(req: SuggestRequest): Promise<SuggestResponse> {
    req = serializeSuggestRequest(req);
    const url = new URL(`${this.#baseUrl}v1/query/suggest`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SuggestResponse;
  }

  /**
   * Creates a datasource. **Note:** This API requires an admin account to
   * execute.
   *
   */
  async settingsDatasourcesCreate(req: DataSource): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/settings/datasources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a datasource. **Note:** This API requires an admin account to
   * execute.
   *
   * @param name The name of the datasource. Format: datasources/{source_id}.
   */
  async settingsDatasourcesDelete(name: string, opts: SettingsDatasourcesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a datasource. **Note:** This API requires an admin account to
   * execute.
   *
   * @param name The name of the datasource resource. Format: datasources/{source_id}.
   */
  async settingsDatasourcesGet(name: string, opts: SettingsDatasourcesGetOptions = {}): Promise<DataSource> {
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DataSource;
  }

  /**
   * Lists datasources. **Note:** This API requires an admin account to
   * execute.
   *
   */
  async settingsDatasourcesList(opts: SettingsDatasourcesListOptions = {}): Promise<ListDataSourceResponse> {
    const url = new URL(`${this.#baseUrl}v1/settings/datasources`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
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
    return data as ListDataSourceResponse;
  }

  /**
   * Updates a datasource. **Note:** This API requires an admin account to
   * execute.
   *
   * @param name The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.
   */
  async settingsDatasourcesPatch(name: string, req: DataSource, opts: SettingsDatasourcesPatchOptions = {}): Promise<Operation> {
    opts = serializeSettingsDatasourcesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a datasource. **Note:** This API requires an admin account to
   * execute.
   *
   * @param name The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.
   */
  async settingsDatasourcesUpdate(name: string, req: UpdateDataSourceRequest): Promise<Operation> {
    req = serializeUpdateDataSourceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Get customer settings. **Note:** This API requires an admin account to
   * execute.
   *
   */
  async settingsGetCustomer(): Promise<CustomerSettings> {
    const url = new URL(`${this.#baseUrl}v1/settings/customer`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomerSettings;
  }

  /**
   * Creates a search application. **Note:** This API requires an admin account
   * to execute.
   *
   */
  async settingsSearchapplicationsCreate(req: SearchApplication): Promise<Operation> {
    req = serializeSearchApplication(req);
    const url = new URL(`${this.#baseUrl}v1/settings/searchapplications`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a search application. **Note:** This API requires an admin account
   * to execute.
   *
   * @param name The name of the search application to be deleted. Format: applications/{application_id}.
   */
  async settingsSearchapplicationsDelete(name: string, opts: SettingsSearchapplicationsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the specified search application. **Note:** This API requires an
   * admin account to execute.
   *
   * @param name The name of the search application. Format: searchapplications/{application_id}.
   */
  async settingsSearchapplicationsGet(name: string, opts: SettingsSearchapplicationsGetOptions = {}): Promise<SearchApplication> {
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchApplication(data);
  }

  /**
   * Lists all search applications. **Note:** This API requires an admin
   * account to execute.
   *
   */
  async settingsSearchapplicationsList(opts: SettingsSearchapplicationsListOptions = {}): Promise<ListSearchApplicationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/settings/searchapplications`);
    if (opts["debugOptions.enableDebugging"] !== undefined) {
      url.searchParams.append("debugOptions.enableDebugging", String(opts["debugOptions.enableDebugging"]));
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
    return deserializeListSearchApplicationsResponse(data);
  }

  /**
   * Updates a search application. **Note:** This API requires an admin account
   * to execute.
   *
   * @param name The name of the Search Application. Format: searchapplications/{application_id}.
   */
  async settingsSearchapplicationsPatch(name: string, req: SearchApplication, opts: SettingsSearchapplicationsPatchOptions = {}): Promise<Operation> {
    req = serializeSearchApplication(req);
    opts = serializeSettingsSearchapplicationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Resets a search application to default settings. This will return an empty
   * response. **Note:** This API requires an admin account to execute.
   *
   * @param name The name of the search application to be reset. Format: applications/{application_id}.
   */
  async settingsSearchapplicationsReset(name: string, req: ResetSearchApplicationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }:reset`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a search application. **Note:** This API requires an admin account
   * to execute.
   *
   * @param name The name of the Search Application. Format: searchapplications/{application_id}.
   */
  async settingsSearchapplicationsUpdate(name: string, req: SearchApplication, opts: SettingsSearchapplicationsUpdateOptions = {}): Promise<Operation> {
    req = serializeSearchApplication(req);
    opts = serializeSettingsSearchapplicationsUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/settings/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Update customer settings. **Note:** This API requires an admin account to
   * execute.
   *
   */
  async settingsUpdateCustomer(req: CustomerSettings, opts: SettingsUpdateCustomerOptions = {}): Promise<Operation> {
    opts = serializeSettingsUpdateCustomerOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/settings/customer`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets indexed item statistics aggreggated across all data sources. This API
   * only returns statistics for previous dates; it doesn't return statistics
   * for the current day. **Note:** This API requires a standard end user
   * account to execute.
   *
   */
  async statsGetIndex(opts: StatsGetIndexOptions = {}): Promise<GetCustomerIndexStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/index`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetCustomerIndexStatsResponse(data);
  }

  /**
   * Get the query statistics for customer. **Note:** This API requires a
   * standard end user account to execute.
   *
   */
  async statsGetQuery(opts: StatsGetQueryOptions = {}): Promise<GetCustomerQueryStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/query`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetCustomerQueryStatsResponse(data);
  }

  /**
   * Get search application stats for customer. **Note:** This API requires a
   * standard end user account to execute.
   *
   */
  async statsGetSearchapplication(opts: StatsGetSearchapplicationOptions = {}): Promise<GetCustomerSearchApplicationStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/searchapplication`);
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
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
    return deserializeGetCustomerSearchApplicationStatsResponse(data);
  }

  /**
   * Get the # of search sessions, % of successful sessions with a click query
   * statistics for customer. **Note:** This API requires a standard end user
   * account to execute.
   *
   */
  async statsGetSession(opts: StatsGetSessionOptions = {}): Promise<GetCustomerSessionStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/session`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetCustomerSessionStatsResponse(data);
  }

  /**
   * Get the users statistics for customer. **Note:** This API requires a
   * standard end user account to execute.
   *
   */
  async statsGetUser(opts: StatsGetUserOptions = {}): Promise<GetCustomerUserStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/user`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetCustomerUserStatsResponse(data);
  }

  /**
   * Gets indexed item statistics for a single data source. **Note:** This API
   * requires a standard end user account to execute.
   *
   * @param name The resource id of the data source to retrieve statistics for, in the following format: "datasources/{source_id}"
   */
  async statsIndexDatasourcesGet(name: string, opts: StatsIndexDatasourcesGetOptions = {}): Promise<GetDataSourceIndexStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/index/${ name }`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetDataSourceIndexStatsResponse(data);
  }

  /**
   * Get the query statistics for search application. **Note:** This API
   * requires a standard end user account to execute.
   *
   * @param name The resource id of the search application query stats, in the following format: searchapplications/{application_id}
   */
  async statsQuerySearchapplicationsGet(name: string, opts: StatsQuerySearchapplicationsGetOptions = {}): Promise<GetSearchApplicationQueryStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/query/${ name }`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetSearchApplicationQueryStatsResponse(data);
  }

  /**
   * Get the # of search sessions, % of successful sessions with a click query
   * statistics for search application. **Note:** This API requires a standard
   * end user account to execute.
   *
   * @param name The resource id of the search application session stats, in the following format: searchapplications/{application_id}
   */
  async statsSessionSearchapplicationsGet(name: string, opts: StatsSessionSearchapplicationsGetOptions = {}): Promise<GetSearchApplicationSessionStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/session/${ name }`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetSearchApplicationSessionStatsResponse(data);
  }

  /**
   * Get the users statistics for search application. **Note:** This API
   * requires a standard end user account to execute.
   *
   * @param name The resource id of the search application session stats, in the following format: searchapplications/{application_id}
   */
  async statsUserSearchapplicationsGet(name: string, opts: StatsUserSearchapplicationsGetOptions = {}): Promise<GetSearchApplicationUserStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/stats/user/${ name }`);
    if (opts["fromDate.day"] !== undefined) {
      url.searchParams.append("fromDate.day", String(opts["fromDate.day"]));
    }
    if (opts["fromDate.month"] !== undefined) {
      url.searchParams.append("fromDate.month", String(opts["fromDate.month"]));
    }
    if (opts["fromDate.year"] !== undefined) {
      url.searchParams.append("fromDate.year", String(opts["fromDate.year"]));
    }
    if (opts["toDate.day"] !== undefined) {
      url.searchParams.append("toDate.day", String(opts["toDate.day"]));
    }
    if (opts["toDate.month"] !== undefined) {
      url.searchParams.append("toDate.month", String(opts["toDate.month"]));
    }
    if (opts["toDate.year"] !== undefined) {
      url.searchParams.append("toDate.year", String(opts["toDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetSearchApplicationUserStatsResponse(data);
  }

  /**
   * Enables `third party` support in Google Cloud Search. **Note:** This API
   * requires an admin account to execute.
   *
   */
  async v1InitializeCustomer(req: InitializeCustomerRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1:initializeCustomer`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }
}

/**
 * Abuse reporting configuration outlining what is supported in this
 * conference.
 */
export interface AbuseReportingConfig {
  /**
   * Whether the current call may include video recordings in its abuse
   * reports.
   */
  recordingAllowed?: boolean;
  /**
   * Whether the current call may include user generated content (chat, polls,
   * Q&A...) in its abuse reports.
   */
  writtenUgcAllowed?: boolean;
}

/**
 * Information about how devices in a meeting have acked for a
 * session/operation.
 */
export interface AckInfo {
  /**
   * Output only. Number of meeting devices that have not acked yet.
   */
  readonly unackedDeviceCount?: number;
  /**
   * Output only. IDs of meeting devices (at most ten are provided) that have
   * not acked yet.
   */
  readonly unackedDeviceIds?: string[];
}

/**
 * The request set by clients to instruct Backend how the user intend to fix
 * the ACL. Technically it's not a request to ACL Fixer, because Backend uses
 * /DriveService.Share to modify Drive ACLs.
 */
export interface AclFixRequest {
  /**
   * For Spaces messages: This field is ignored. For DMs messages: The list of
   * email addresses that should be added to the Drive item's ACL. In general,
   * the list should not be empty when the boolean "should_fix" field is set;
   * otherwise, the list should be empty. During transition - when clients do
   * not specify this field but the "should_fix" is true, we follow the legacy
   * behavior: share to all users in the DM regardless of emails. This behavior
   * is being phased out.
   */
  recipientEmails?: string[];
  role?:  | "UNKNOWN" | "READER" | "COMMENTER" | "WRITER";
  /**
   * Whether to attempt to fix the ACL by adding the room or DM members to the
   * Drive file's ACL.
   */
  shouldFix?: boolean;
}

/**
 * The message reconstructed based on information in the response of
 * /PermissionFixOptionsService.Query (or the Apiary API that wraps it).
 * Indicates the ability of the requester to change the access to the Drive file
 * for the room roster or the DM members. Used in
 * GetMessagePreviewMetadataResponse only.
 */
export interface AclFixStatus {
  fixability?:  | "UNKNOWN" | "ALREADY_ACCESSIBLE" | "CAN_FIX" | "CANNOT_FIX" | "ACL_FIXER_ERROR";
  /**
   * List of recipient email addresses for which access can be granted. This
   * field contains the same email addresses from the GetMessagePreviewMetadata
   * request if all recipients can be successfully added to the ACL as
   * determined by Drive ACL Fixer. For now, the field is non-empty if and only
   * if the "fixability" value is "CAN_FIX".
   */
  fixableEmailAddress?: string[];
  /**
   * List of recipient email addresses for which an out-of-domain-sharing
   * warning must be shown, stating that these email addresses are not in the
   * Google Apps organization that the requested item belong to. Empty if all
   * recipients are in the same Google Apps organization.
   */
  outOfDomainWarningEmailAddress?: string[];
}

/**
 * Next tag: 4
 */
export interface AclInfo {
  /**
   * Number of groups which have at least read access to the document.
   */
  groupsCount?: number;
  /**
   * The scope to which the content was shared.
   */
  scope?:  | "LIMITED" | "DASHER_DOMAIN_WITH_LINK" | "DASHER_DOMAIN" | "PUBLIC_WITH_LINK" | "PUBLIC" | "TEAM_DRIVE";
  /**
   * Number of users which have at least read access to the document.
   */
  usersCount?: number;
}

/**
 * List of string parameters that developers can specify when the above action
 * method (in apps script) is invoked. An example use case is for 3 snooze
 * buttons: snooze now, snooze 1 day, snooze next week. Developers can have
 * action method = snooze() and pass the snooze type and snooze time in list of
 * string parameters.
 */
export interface ActionParameter {
  key?: string;
  value?: string;
}

export interface AddonComposeUiActionMarkup {
  type?:  | "UNSPECIFIED" | "DISMISS";
}

/**
 * Earlier we used to populate just the affected_members list and inferred the
 * new membership state (roles didn't exist back then) from the Type.
 * go/dynamite-finra required backend to know the previous membership state to
 * reconstruct membership history. The proper solution involved cleaning up up
 * Type enum, but it was used in many, many places. This was added as a stop-gap
 * solution to unblock FINRA without breaking everything. Later role update and
 * target audience update started relying on this to communicate information to
 * clients about what transition happened. So this is now required to be
 * populated and should be in sync with affected_members for new messages.
 */
export interface AffectedMembership {
  affectedMember?: MemberId;
  priorMembershipRole?:  | "ROLE_UNKNOWN" | "ROLE_NONE" | "ROLE_INVITEE" | "ROLE_MEMBER" | "ROLE_OWNER";
  priorMembershipState?:  | "MEMBER_UNKNOWN" | "MEMBER_INVITED" | "MEMBER_JOINED" | "MEMBER_NOT_A_MEMBER" | "MEMBER_FAILED";
  targetMembershipRole?:  | "ROLE_UNKNOWN" | "ROLE_NONE" | "ROLE_INVITEE" | "ROLE_MEMBER" | "ROLE_OWNER";
}

function serializeAffectedMembership(data: any): AffectedMembership {
  return {
    ...data,
    affectedMember: data["affectedMember"] !== undefined ? serializeMemberId(data["affectedMember"]) : undefined,
  };
}

function deserializeAffectedMembership(data: any): AffectedMembership {
  return {
    ...data,
    affectedMember: data["affectedMember"] !== undefined ? deserializeMemberId(data["affectedMember"]) : undefined,
  };
}

/**
 * Represents a principal who has authenticated as any kind of user which the
 * application understands. This is typically used for "wiki-like" security,
 * where anyone is allowed access so long as they can be held accountable for
 * that access. Since the purpose is knowing whom to blame, it is up to the
 * application to decide what kinds of users it knows how to blame. For example,
 * an application might choose to include GAIA users in "all authenticated
 * users", but not include MDB users. Nothing here.
 */
export interface AllAuthenticatedUsersProto {
}

/**
 * NOTE WHEN ADDING NEW PROTO FIELDS: Be sure to add datapol annotations to new
 * fields with potential PII, so they get scrubbed when logging protos for
 * errors. NEXT TAG: 31
 */
export interface Annotation {
  babelPlaceholderMetadata?: BabelPlaceholderMetadata;
  /**
   * 
   * LINT.ThenChange(//depot/google3/java/com/google/apps/dynamite/v1/backend/action/common/SystemMessageHelper.java)
   */
  cardCapabilityMetadata?: CardCapabilityMetadata;
  /**
   * Whether the annotation should be rendered as a preview chip. If this is
   * missing or unspecified, fallback to should_not_render on the metadata.
   */
  chipRenderType?:  | "CHIP_RENDER_TYPE_UNSPECIFIED" | "RENDER" | "RENDER_IF_POSSIBLE" | "DO_NOT_RENDER";
  consentedAppUnfurlMetadata?: ConsentedAppUnfurlMetadata;
  customEmojiMetadata?: CustomEmojiMetadata;
  dataLossPreventionMetadata?: DataLossPreventionMetadata;
  /**
   * Chip annotations
   */
  driveMetadata?: DriveMetadata;
  formatMetadata?: FormatMetadata;
  groupRetentionSettingsUpdated?: GroupRetentionSettingsUpdatedMetaData;
  /**
   * Metadata for 1P integrations like tasks, calendar. These are supported
   * only through integration server as 1P integrations use the integration API
   * (which in turn uses backend API with special permissions) to post messages.
   * Clients should never set this. LINT.IfChange
   */
  gsuiteIntegrationMetadata?: GsuiteIntegrationMetadata;
  incomingWebhookChangedMetadata?: IncomingWebhookChangedMetadata;
  /**
   * The inline render format of this annotation. go/drive-smart-chips-chat-v2.
   */
  inlineRenderFormat?:  | "INLINE_RENDER_FORMAT_UNSPECIFIED" | "SMART_CHIP";
  /**
   * 
   * LINT.ThenChange(//depot/google3/java/com/google/apps/dynamite/v1/backend/action/common/SystemMessageHelper.java)
   */
  integrationConfigUpdated?: IntegrationConfigUpdatedMetadata;
  /**
   * Additional interaction data for this annotation.
   */
  interactionData?: InteractionData;
  /**
   * Length of the text_body substring beginning from start_index the
   * Annotation corresponds to.
   */
  length?: number;
  /**
   * * A client-assigned ID for this annotation. This is helpful in matching
   * the back-filled annotations to the original annotations on client side,
   * without having to re-parse the message. There is no guarantee an annotation
   * has a local_id, it's a purely client used and controlled field with no
   * guarantee of uniqueness.
   */
  localId?: string;
  /**
   * Metadata for system messages. Clients should never set this. LINT.IfChange
   */
  membershipChanged?: MembershipChangedMetadata;
  readReceiptsSettingsMetadata?: ReadReceiptsSettingsUpdatedMetadata;
  /**
   * Metadata that defines all of the required features that must be rendered
   * in the message. Clients can use this to see whether they support the entire
   * message, or show a fallback chip otherwise. See
   * go/message-quoting-client-to-server for details. LINT.ThenChange(
   * //depot/google3/java/com/google/apps/dynamite/v1/allshared/parser/AnnotationSanitizer.java,
   * //depot/google3/java/com/google/apps/dynamite/v1/backend/action/common/SystemMessageHelper.java,
   * //depot/google3/java/com/google/caribou/eli/mediation/chat/AnnotationConverter.java
   * )
   */
  requiredMessageFeaturesMetadata?: RequiredMessageFeaturesMetadata;
  roomUpdated?: RoomUpdatedMetadata;
  /**
   * Whether or not the annotation is invalidated by the server. Example of
   * situations for invalidation include: when the URL is malformed, or when
   * Drive item ID is rejected by Drive Service.
   */
  serverInvalidated?: boolean;
  slashCommandMetadata?: SlashCommandMetadata;
  /**
   * Start index (0-indexed) of the Message text the Annotation corresponds to,
   * inclusive.
   */
  startIndex?: number;
  /**
   * Type of the Annotation.
   */
  type?:  | "TYPE_UNSPECIFIED" | "URL" | "DRIVE_FILE" | "DRIVE_DOC" | "DRIVE_SHEET" | "DRIVE_SLIDE" | "DRIVE_FORM" | "USER_MENTION" | "SLASH_COMMAND" | "CONSENTED_APP_UNFURL" | "VIDEO" | "FORMAT_DATA" | "IMAGE" | "PDF" | "VIDEO_CALL" | "UPLOAD_METADATA" | "GSUITE_INTEGRATION" | "CUSTOM_EMOJI" | "CARD_CAPABILITY" | "DATA_LOSS_PREVENTION" | "REQUIRED_MESSAGE_FEATURES_METADATA" | "MEMBERSHIP_CHANGED" | "ROOM_UPDATED" | "GROUP_RETENTION_SETTINGS_UPDATED" | "BABEL_PLACEHOLDER" | "READ_RECEIPTS_SETTINGS_UPDATED" | "INCOMING_WEBHOOK_CHANGED" | "INTEGRATION_CONFIG_UPDATED" | "INVITATION";
  /**
   * * A unique server-assigned ID for this annotation. This is helpful in
   * matching annotation objects when fetched from service. All uploads should
   * have a unique_id after the message they are attached to is successfully
   * sent. Url annotations that originally were uploads (i.e. policy violations)
   * will have a unique_id after the message they are attached to is
   * successfully sent. No other url annotations should have a unique_id. All
   * drive annotations should have a unique_id after the message they are
   * attached to is successfully sent.
   */
  uniqueId?: string;
  uploadMetadata?: UploadMetadata;
  urlMetadata?: UrlMetadata;
  /**
   * Metadata that clients can set for annotations. LINT.IfChange In-text
   * annotations
   */
  userMentionMetadata?: UserMentionMetadata;
  videoCallMetadata?: VideoCallMetadata;
  youtubeMetadata?: YoutubeMetadata;
}

function serializeAnnotation(data: any): Annotation {
  return {
    ...data,
    consentedAppUnfurlMetadata: data["consentedAppUnfurlMetadata"] !== undefined ? serializeConsentedAppUnfurlMetadata(data["consentedAppUnfurlMetadata"]) : undefined,
    customEmojiMetadata: data["customEmojiMetadata"] !== undefined ? serializeCustomEmojiMetadata(data["customEmojiMetadata"]) : undefined,
    driveMetadata: data["driveMetadata"] !== undefined ? serializeDriveMetadata(data["driveMetadata"]) : undefined,
    groupRetentionSettingsUpdated: data["groupRetentionSettingsUpdated"] !== undefined ? serializeGroupRetentionSettingsUpdatedMetaData(data["groupRetentionSettingsUpdated"]) : undefined,
    gsuiteIntegrationMetadata: data["gsuiteIntegrationMetadata"] !== undefined ? serializeGsuiteIntegrationMetadata(data["gsuiteIntegrationMetadata"]) : undefined,
    incomingWebhookChangedMetadata: data["incomingWebhookChangedMetadata"] !== undefined ? serializeIncomingWebhookChangedMetadata(data["incomingWebhookChangedMetadata"]) : undefined,
    integrationConfigUpdated: data["integrationConfigUpdated"] !== undefined ? serializeIntegrationConfigUpdatedMetadata(data["integrationConfigUpdated"]) : undefined,
    membershipChanged: data["membershipChanged"] !== undefined ? serializeMembershipChangedMetadata(data["membershipChanged"]) : undefined,
    roomUpdated: data["roomUpdated"] !== undefined ? serializeRoomUpdatedMetadata(data["roomUpdated"]) : undefined,
    slashCommandMetadata: data["slashCommandMetadata"] !== undefined ? serializeSlashCommandMetadata(data["slashCommandMetadata"]) : undefined,
    uploadMetadata: data["uploadMetadata"] !== undefined ? serializeUploadMetadata(data["uploadMetadata"]) : undefined,
    urlMetadata: data["urlMetadata"] !== undefined ? serializeUrlMetadata(data["urlMetadata"]) : undefined,
    userMentionMetadata: data["userMentionMetadata"] !== undefined ? serializeUserMentionMetadata(data["userMentionMetadata"]) : undefined,
    videoCallMetadata: data["videoCallMetadata"] !== undefined ? serializeVideoCallMetadata(data["videoCallMetadata"]) : undefined,
  };
}

function deserializeAnnotation(data: any): Annotation {
  return {
    ...data,
    consentedAppUnfurlMetadata: data["consentedAppUnfurlMetadata"] !== undefined ? deserializeConsentedAppUnfurlMetadata(data["consentedAppUnfurlMetadata"]) : undefined,
    customEmojiMetadata: data["customEmojiMetadata"] !== undefined ? deserializeCustomEmojiMetadata(data["customEmojiMetadata"]) : undefined,
    driveMetadata: data["driveMetadata"] !== undefined ? deserializeDriveMetadata(data["driveMetadata"]) : undefined,
    groupRetentionSettingsUpdated: data["groupRetentionSettingsUpdated"] !== undefined ? deserializeGroupRetentionSettingsUpdatedMetaData(data["groupRetentionSettingsUpdated"]) : undefined,
    gsuiteIntegrationMetadata: data["gsuiteIntegrationMetadata"] !== undefined ? deserializeGsuiteIntegrationMetadata(data["gsuiteIntegrationMetadata"]) : undefined,
    incomingWebhookChangedMetadata: data["incomingWebhookChangedMetadata"] !== undefined ? deserializeIncomingWebhookChangedMetadata(data["incomingWebhookChangedMetadata"]) : undefined,
    integrationConfigUpdated: data["integrationConfigUpdated"] !== undefined ? deserializeIntegrationConfigUpdatedMetadata(data["integrationConfigUpdated"]) : undefined,
    membershipChanged: data["membershipChanged"] !== undefined ? deserializeMembershipChangedMetadata(data["membershipChanged"]) : undefined,
    roomUpdated: data["roomUpdated"] !== undefined ? deserializeRoomUpdatedMetadata(data["roomUpdated"]) : undefined,
    slashCommandMetadata: data["slashCommandMetadata"] !== undefined ? deserializeSlashCommandMetadata(data["slashCommandMetadata"]) : undefined,
    uploadMetadata: data["uploadMetadata"] !== undefined ? deserializeUploadMetadata(data["uploadMetadata"]) : undefined,
    urlMetadata: data["urlMetadata"] !== undefined ? deserializeUrlMetadata(data["urlMetadata"]) : undefined,
    userMentionMetadata: data["userMentionMetadata"] !== undefined ? deserializeUserMentionMetadata(data["userMentionMetadata"]) : undefined,
    videoCallMetadata: data["videoCallMetadata"] !== undefined ? deserializeVideoCallMetadata(data["videoCallMetadata"]) : undefined,
  };
}

/**
 * Identifier of an App.
 */
export interface AppId {
  /**
   * Enum indicating the type of App this is.
   */
  appType?:  | "APP_TYPE_UNSPECIFIED" | "APP" | "GSUITE_APP" | "INCOMING_WEBHOOK";
  /**
   * Enum indicating which 1P App this is when app_type is GSUITE_APP.
   * Determined & set by the 1P API as a convenience for all users of this
   * identifier(Eg. clients, chime, backend etc.) to map to 1P properties.
   */
  gsuiteAppType?:  | "GSUITE_APP_TYPE_UNSPECIFIED" | "TASKS_APP" | "CALENDAR_APP" | "DOCS_APP" | "SHEETS_APP" | "SLIDES_APP" | "MEET_APP" | "ASSISTIVE_SUGGESTION_APP" | "CONTACTS_APP" | "ACTIVITY_FEED_APP" | "DRIVE_APP" | "CHAT_IN_MEET_APP";
  /**
   * Numeric identifier of the App. Set to Project number for 1/3P Apps. For
   * Webhook, this is WebhookId. Determined & set by the 1P API from App
   * credentials on the side channel.
   */
  id?: bigint;
}

function serializeAppId(data: any): AppId {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeAppId(data: any): AppId {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Next Id: 7
 */
export interface AppsDynamiteSharedActivityFeedAnnotationData {
  /**
   * Timestamp of when the Activity Feed message that contains this annotation
   * was created. This is roughly when the activity happened, such as when a
   * reaction happened, but will have at least some small delay, since the
   * Activity Feed message is created asynchronously after. This timestamp
   * should only be used for display when the activity create time is not
   * available in the Chat UI, like the time of a reaction.
   */
  activityFeedMessageCreateTime?: Date;
  /**
   * Unique id of the Activity Feed message used by clients to implement
   * click-to-source. This is the same messageId as the top-level id field for
   * the Activity Feed item.
   */
  activityFeedMessageId?: MessageId;
  chatItem?: AppsDynamiteSharedChatItem;
  /**
   * Only populated on read path and should not be persisted in storage.
   */
  sharedUserInfo?: UserInfo;
  /**
   * Use shared_user_info instead.
   */
  userInfo?: AppsDynamiteSharedActivityFeedAnnotationDataUserInfo;
}

function serializeAppsDynamiteSharedActivityFeedAnnotationData(data: any): AppsDynamiteSharedActivityFeedAnnotationData {
  return {
    ...data,
    activityFeedMessageCreateTime: data["activityFeedMessageCreateTime"] !== undefined ? data["activityFeedMessageCreateTime"].toISOString() : undefined,
    chatItem: data["chatItem"] !== undefined ? serializeAppsDynamiteSharedChatItem(data["chatItem"]) : undefined,
    sharedUserInfo: data["sharedUserInfo"] !== undefined ? serializeUserInfo(data["sharedUserInfo"]) : undefined,
    userInfo: data["userInfo"] !== undefined ? serializeAppsDynamiteSharedActivityFeedAnnotationDataUserInfo(data["userInfo"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedActivityFeedAnnotationData(data: any): AppsDynamiteSharedActivityFeedAnnotationData {
  return {
    ...data,
    activityFeedMessageCreateTime: data["activityFeedMessageCreateTime"] !== undefined ? new Date(data["activityFeedMessageCreateTime"]) : undefined,
    chatItem: data["chatItem"] !== undefined ? deserializeAppsDynamiteSharedChatItem(data["chatItem"]) : undefined,
    sharedUserInfo: data["sharedUserInfo"] !== undefined ? deserializeUserInfo(data["sharedUserInfo"]) : undefined,
    userInfo: data["userInfo"] !== undefined ? deserializeAppsDynamiteSharedActivityFeedAnnotationDataUserInfo(data["userInfo"]) : undefined,
  };
}

/**
 * UserId of the AF item updater to show and the updater count to show.
 */
export interface AppsDynamiteSharedActivityFeedAnnotationDataUserInfo {
  /**
   * Describes how updater_count_to_show should be used.
   */
  updaterCountDisplayType?:  | "UPDATER_COUNT_DISPLAY_TYPE_UNSPECIFIED" | "EXACT_COUNT" | "NONZERO_COUNT";
  /**
   * The number of updaters for clients to show, currently set to the total
   * number of updaters minus the one set in updater_to_show.
   */
  updaterCountToShow?: number;
  /**
   * The updater for clients to show.
   */
  updaterToShow?: UserId;
}

function serializeAppsDynamiteSharedActivityFeedAnnotationDataUserInfo(data: any): AppsDynamiteSharedActivityFeedAnnotationDataUserInfo {
  return {
    ...data,
    updaterToShow: data["updaterToShow"] !== undefined ? serializeUserId(data["updaterToShow"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedActivityFeedAnnotationDataUserInfo(data: any): AppsDynamiteSharedActivityFeedAnnotationDataUserInfo {
  return {
    ...data,
    updaterToShow: data["updaterToShow"] !== undefined ? deserializeUserId(data["updaterToShow"]) : undefined,
  };
}

/**
 * Optional field for apps overriding display info
 */
export interface AppsDynamiteSharedAppProfile {
  /**
   * Displayed user avatar emoji.
   */
  avatarEmoji?: string;
  /**
   * Displayed user avatar url.
   */
  avatarUrl?: string;
  /**
   * Displayed user name.
   */
  name?: string;
}

/**
 * This is the internal version of the API proto at
 * google3/google/chat/v1/gsuite_message_integration.proto Data used to render
 * Assistant suggestions. See go/bullseye-rendering.
 */
export interface AppsDynamiteSharedAssistantAnnotationData {
  /**
   * The suggestion to render in the card.
   */
  suggestion?: AppsDynamiteSharedAssistantSuggestion;
  /**
   * Set when the initial query was unfulfillable. Only an on-demand
   * unfulfillable query will result in a response (not a proactive query). 1.
   * On-demand: user explicitly invokes the bot 2. Proactive: bot makes
   * proactive suggestion (when available) by listening to all user messages.
   */
  unfulfillable?: AppsDynamiteSharedAssistantUnfulfillableRequest;
}

function serializeAppsDynamiteSharedAssistantAnnotationData(data: any): AppsDynamiteSharedAssistantAnnotationData {
  return {
    ...data,
    suggestion: data["suggestion"] !== undefined ? serializeAppsDynamiteSharedAssistantSuggestion(data["suggestion"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedAssistantAnnotationData(data: any): AppsDynamiteSharedAssistantAnnotationData {
  return {
    ...data,
    suggestion: data["suggestion"] !== undefined ? deserializeAppsDynamiteSharedAssistantSuggestion(data["suggestion"]) : undefined,
  };
}

/**
 * Represents info regarding suggestion debug information.
 */
export interface AppsDynamiteSharedAssistantDebugContext {
  /**
   * The query that triggered the resulting suggestion.
   */
  query?: string;
}

/**
 * Data needed to render feedback on the Assistant card
 */
export interface AppsDynamiteSharedAssistantFeedbackContext {
  /**
   * Specifies a list of feedback chips to show
   */
  feedbackChips?: AppsDynamiteSharedAssistantFeedbackContextFeedbackChip[];
  /**
   * Whether the thumbs feedback is provided
   */
  thumbsFeedback?:  | "THUMBS_FEEDBACK_UNSPECIFIED" | "NONE_SELECTED" | "UP" | "DOWN";
}

/**
 * Suggestion chips for users to indicate positive or negative feedback
 */
export interface AppsDynamiteSharedAssistantFeedbackContextFeedbackChip {
  /**
   * What type of chip to display
   */
  feedbackChipType?:  | "FEEDBACK_CHIP_TYPE_UNSPECIFIED" | "WRONG_TRIGGER" | "WRONG_FILE" | "CORRECT_TRIGGER" | "CORRECT_FILE" | "DISRUPTIVE" | "OTHER";
  /**
   * Whether the chip has been selected
   */
  state?:  | "FEEDBACK_CHIP_STATE_UNSPECIFIED" | "SELECTED" | "UNSELECTED";
}

/**
 * Session context specific for Assistant suggestions.
 */
export interface AppsDynamiteSharedAssistantSessionContext {
  /**
   * Unique identifier populated by the contextual request handler for each
   * vertical (Ex: File Suggestions, Smart Scheduling, etc.) that can be used to
   * track sessions end-to-end. May span multiple users (sender-specific).
   */
  contextualSessionId?: string;
}

/**
 * Data for an Assistant suggestion.
 */
export interface AppsDynamiteSharedAssistantSuggestion {
  /**
   * Info regarding suggestion debug information.
   */
  debugContext?: AppsDynamiteSharedAssistantDebugContext;
  /**
   * Data for rendering feedback.
   */
  feedbackContext?: AppsDynamiteSharedAssistantFeedbackContext;
  /**
   * Suggestion type that suggests documents (docs, slides, sheets).
   */
  findDocumentSuggestion?: AppsDynamiteSharedFindDocumentSuggestion;
  /**
   * String representation of the suggestions provided.
   */
  serializedSuggestions?: string;
  /**
   * Session context specific to the Assistant suggestion.
   */
  sessionContext?: AppsDynamiteSharedAssistantSessionContext;
}

function serializeAppsDynamiteSharedAssistantSuggestion(data: any): AppsDynamiteSharedAssistantSuggestion {
  return {
    ...data,
    findDocumentSuggestion: data["findDocumentSuggestion"] !== undefined ? serializeAppsDynamiteSharedFindDocumentSuggestion(data["findDocumentSuggestion"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedAssistantSuggestion(data: any): AppsDynamiteSharedAssistantSuggestion {
  return {
    ...data,
    findDocumentSuggestion: data["findDocumentSuggestion"] !== undefined ? deserializeAppsDynamiteSharedFindDocumentSuggestion(data["findDocumentSuggestion"]) : undefined,
  };
}

/**
 * Data for a response to an unfulfillable request.
 */
export interface AppsDynamiteSharedAssistantUnfulfillableRequest {
}

export interface AppsDynamiteSharedAvatarInfo {
  emoji?: AppsDynamiteSharedEmoji;
}

function serializeAppsDynamiteSharedAvatarInfo(data: any): AppsDynamiteSharedAvatarInfo {
  return {
    ...data,
    emoji: data["emoji"] !== undefined ? serializeAppsDynamiteSharedEmoji(data["emoji"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedAvatarInfo(data: any): AppsDynamiteSharedAvatarInfo {
  return {
    ...data,
    emoji: data["emoji"] !== undefined ? deserializeAppsDynamiteSharedEmoji(data["emoji"]) : undefined,
  };
}

/**
 * Metadata used only in Dynamite backend for uploaded attachments.
 */
export interface AppsDynamiteSharedBackendUploadMetadata {
  /**
   * Blobstore path for the uploaded attachment
   */
  blobPath?: string;
  /**
   * The original file name for the content, not the full path.
   */
  contentName?: string;
  /**
   * Scotty reported content size by default.
   * http://google3/uploader/agent/scotty_agent.proto?l=101&rcl=140889785
   */
  contentSize?: bigint;
  /**
   * Type is from Scotty's best_guess by default:
   * http://google3/uploader/agent/scotty_agent.proto?l=51&rcl=140889785
   */
  contentType?: string;
  /**
   * The results of the Data Loss Prevention (DLP) scan of the attachment.
   * DEPRECATED: use dlp_scan_summary instead.
   */
  dlpScanOutcome?:  | "SCAN_UNKNOWN_OUTCOME" | "SCAN_SUCCEEDED_NO_VIOLATION" | "SCAN_SUCCEEDED_BLOCK" | "SCAN_SUCCEEDED_WARN" | "SCAN_SUCCEEDED_AUDIT_ONLY" | "SCAN_FAILURE_EXCEPTION" | "SCAN_FAILURE_RULE_FETCH_FAILED" | "SCAN_FAILURE_TIMEOUT" | "SCAN_FAILURE_ALL_RULES_FAILED" | "SCAN_FAILURE_ILLEGAL_STATE_FOR_ATTACHMENTS" | "SCAN_SKIPPED_EXPERIMENT_DISABLED" | "SCAN_SKIPPED_CONSUMER" | "SCAN_SKIPPED_NON_HUMAN_USER" | "SCAN_SKIPPED_NO_MESSAGE" | "SCAN_SKIPPED_USER_ACKNOWLEDGED_WARNING" | "SCAN_SKIPPED_MESSAGE_FROM_UNSUPPORTED_ORIGIN" | "SCAN_SKIPPED_MESSAGE_SENT_DURING_SPACE_MIGRATION" | "SCAN_RULE_EVALUATION_SKIPPED_NO_RULES_FOUND" | "SCAN_RULE_EVALUATION_SKIPPED_NO_APPLICABLE_RULES_FOR_ACTION_PARAMS" | "SCAN_RULE_EVALUATION_SKIPPED_NO_APPLICABLE_RULES_FOR_TRIGGER" | "SCAN_RULE_EVALUATION_SKIPPED_CHANGELING_PERMANENT_ERROR" | "SCAN_RULE_EVALUATION_SKIPPED_CHANGELING_EMPTY_RESPONSE" | "SCAN_RULE_EVALUATION_SKIPPED_UNSUPPORTED_FILE_TYPE" | "SCAN_SUCCEEDED_WITH_FAILURES_NO_VIOLATION" | "SCAN_SUCCEEDED_WITH_FAILURES_BLOCK" | "SCAN_SUCCEEDED_WITH_FAILURES_WARN" | "SCAN_SUCCEEDED_WITH_FAILURES_AUDIT_ONLY";
  /**
   * Summary of a Data Loss Prevention (DLP) scan of the attachment.
   * Attachments are evaluated in the backend when they are uploaded.
   */
  dlpScanSummary?: DlpScanSummary;
  /**
   * GroupId to which this attachment is uploaded.
   */
  groupId?: GroupId;
  /**
   * If the uploaded file is a video that has been transcoded on the client
   * side Next tag: 18
   */
  isClientSideTranscodedVideo?: boolean;
  /**
   * Original dimension of the content. Only set for image attachments.
   */
  originalDimension?: AppsDynamiteSharedDimension;
  /**
   * The message id of a quote reply referencing this attachment. When present,
   * this attachment has been quoted in a reply message. Normally, the
   * attachment is fetched through the message id in the blob_path, but in the
   * case of a quote reply, the blob_path would contain the quoted message id.
   * Thus this message id field is needed to fetch the quote reply message
   * instead. This field is conditionally populated at read time for quotes and
   * never persisted in storage. See go/message-quoting-attachments for more
   * context.
   */
  quoteReplyMessageId?: MessageId;
  /**
   * The SHA256 hash of the attachment bytes.
   */
  sha256?: Uint8Array;
  /**
   * User IP address at upload time. Ex. "123.1.2.3". Used by Ares abuse
   * scanning.
   */
  uploadIp?: string;
  /**
   * Timestamp of when user finished uploading the content.
   */
  uploadTimestampUsec?: bigint;
  /**
   * VideoID of the video attachments. This ID shall meets the Youtube ID
   * format of 16 hex characters. For example, '4c14b8825af6059b' is a valid ID.
   */
  videoId?: string;
  /**
   * Full Blobstore ID for the video thumbnail.
   */
  videoThumbnailBlobId?: string;
  /**
   * Result for a virus scan.
   */
  virusScanResult?:  | "UNKNOWN_VIRUS_SCAN_RESULT" | "CLEAN" | "INFECTED" | "ERROR" | "POLICY_VIOLATION";
}

function serializeAppsDynamiteSharedBackendUploadMetadata(data: any): AppsDynamiteSharedBackendUploadMetadata {
  return {
    ...data,
    contentSize: data["contentSize"] !== undefined ? String(data["contentSize"]) : undefined,
    sha256: data["sha256"] !== undefined ? encodeBase64(data["sha256"]) : undefined,
    uploadTimestampUsec: data["uploadTimestampUsec"] !== undefined ? String(data["uploadTimestampUsec"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedBackendUploadMetadata(data: any): AppsDynamiteSharedBackendUploadMetadata {
  return {
    ...data,
    contentSize: data["contentSize"] !== undefined ? BigInt(data["contentSize"]) : undefined,
    sha256: data["sha256"] !== undefined ? decodeBase64(data["sha256"] as string) : undefined,
    uploadTimestampUsec: data["uploadTimestampUsec"] !== undefined ? BigInt(data["uploadTimestampUsec"]) : undefined,
  };
}

export interface AppsDynamiteSharedCalendarEventAnnotationData {
  calendarEvent?: AppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent;
  /**
   * Notification about the creation of an event.
   */
  eventCreation?: AppsDynamiteSharedCalendarEventAnnotationDataEventCreation;
}

function serializeAppsDynamiteSharedCalendarEventAnnotationData(data: any): AppsDynamiteSharedCalendarEventAnnotationData {
  return {
    ...data,
    calendarEvent: data["calendarEvent"] !== undefined ? serializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent(data["calendarEvent"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedCalendarEventAnnotationData(data: any): AppsDynamiteSharedCalendarEventAnnotationData {
  return {
    ...data,
    calendarEvent: data["calendarEvent"] !== undefined ? deserializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent(data["calendarEvent"]) : undefined,
  };
}

export interface AppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent {
  /**
   * The end time of the event.
   */
  endTime?: AppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime;
  /**
   * ID of the event.
   */
  eventId?: string;
  /**
   * The start time of the event.
   */
  startTime?: AppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime;
  /**
   * Title of the event (at the time the message was generated).
   */
  title?: string;
}

function serializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent(data: any): AppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? serializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? serializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data["startTime"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent(data: any): AppsDynamiteSharedCalendarEventAnnotationDataCalendarEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? deserializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? deserializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data["startTime"]) : undefined,
  };
}

export interface AppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime {
  /**
   * All day event.
   */
  allDay?: Date;
  /**
   * Non all day event.
   */
  timed?: Date;
}

function serializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data: any): AppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime {
  return {
    ...data,
    timed: data["timed"] !== undefined ? data["timed"].toISOString() : undefined,
  };
}

function deserializeAppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime(data: any): AppsDynamiteSharedCalendarEventAnnotationDataCalendarEventTime {
  return {
    ...data,
    timed: data["timed"] !== undefined ? new Date(data["timed"]) : undefined,
  };
}

/**
 * Creation of an event (no extra data for now).
 */
export interface AppsDynamiteSharedCalendarEventAnnotationDataEventCreation {
}

/**
 * Data used to render Meet or Google Voice chips in Chat. See
 * go/dynamite-calling-artifacts-in-chat.
 */
export interface AppsDynamiteSharedCallAnnotationData {
  /**
   * Timestamp when the call ended. Used to render the call ended system
   * message.
   */
  callEndedTimestamp?: Date;
  /**
   * Required. Call metadata required to create the call artifacts. For now,
   * the metadata contains only the call id to identify the call. This field
   * allows additional data (e.g. voice call type) to be added if needed in the
   * future.
   */
  callMetadata?: AppsDynamiteSharedCallMetadata;
  /**
   * Required. Indicates the call status for the space. Used to determine the
   * chip's state.
   */
  callStatus?:  | "CALL_STATUS_UNSPECIFIED" | "CALL_STARTED" | "CALL_MISSED" | "CALL_ENDED";
}

function serializeAppsDynamiteSharedCallAnnotationData(data: any): AppsDynamiteSharedCallAnnotationData {
  return {
    ...data,
    callEndedTimestamp: data["callEndedTimestamp"] !== undefined ? data["callEndedTimestamp"].toISOString() : undefined,
  };
}

function deserializeAppsDynamiteSharedCallAnnotationData(data: any): AppsDynamiteSharedCallAnnotationData {
  return {
    ...data,
    callEndedTimestamp: data["callEndedTimestamp"] !== undefined ? new Date(data["callEndedTimestamp"]) : undefined,
  };
}

/**
 * Metadata required to generate call artifacts. This can either be the
 * metadata for a Meet or, in the future, Google Voice call.
 */
export interface AppsDynamiteSharedCallMetadata {
  /**
   * Metadata specific for the Meet call.
   */
  meetMetadata?: AppsDynamiteSharedMeetMetadata;
}

/**
 * Card click which identifies one suggestion provided by the app/bot.
 */
export interface AppsDynamiteSharedCardClickSuggestion {
  /**
   * Identify the button/action that created the suggestion. A simple example
   * would be a card button within the stream, or the id which can identify a
   * specific suggestion.
   */
  actionId?: string;
  /**
   * The message_id for the message that was posted by the app/bot.
   */
  suggestionMessageId?: MessageId;
}

/**
 * Next Id: 5
 */
export interface AppsDynamiteSharedChatItem {
  /**
   * Information needed to render the specific type of feed item.
   */
  activityInfo?: AppsDynamiteSharedChatItemActivityInfo[];
  /**
   * Only populated on read path and should not be persisted in storage.
   */
  groupInfo?: AppsDynamiteSharedChatItemGroupInfo;
  /**
   * Additional information about the original chat message that isn't captured
   * in the top-level message proto.
   */
  messageInfo?: AppsDynamiteSharedMessageInfo;
}

function serializeAppsDynamiteSharedChatItem(data: any): AppsDynamiteSharedChatItem {
  return {
    ...data,
    groupInfo: data["groupInfo"] !== undefined ? serializeAppsDynamiteSharedChatItemGroupInfo(data["groupInfo"]) : undefined,
    messageInfo: data["messageInfo"] !== undefined ? serializeAppsDynamiteSharedMessageInfo(data["messageInfo"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedChatItem(data: any): AppsDynamiteSharedChatItem {
  return {
    ...data,
    groupInfo: data["groupInfo"] !== undefined ? deserializeAppsDynamiteSharedChatItemGroupInfo(data["groupInfo"]) : undefined,
    messageInfo: data["messageInfo"] !== undefined ? deserializeAppsDynamiteSharedMessageInfo(data["messageInfo"]) : undefined,
  };
}

export interface AppsDynamiteSharedChatItemActivityInfo {
  feedItemNudge?: AppsDynamiteSharedChatItemActivityInfoFeedItemNudge;
  feedItemReactions?: AppsDynamiteSharedChatItemActivityInfoFeedItemReactions;
  feedItemThreadReply?: AppsDynamiteSharedChatItemActivityInfoFeedItemThreadReply;
  feedItemUserMention?: AppsDynamiteSharedChatItemActivityInfoFeedItemUserMention;
}

/**
 * Existence of this attribute indicates that the AF item is for a message
 * nudge item.
 */
export interface AppsDynamiteSharedChatItemActivityInfoFeedItemNudge {
  /**
   * Nudge type of the nudge feed item.
   */
  nudgeType?:  | "UNDEFINED" | "REPLY" | "FOLLOW_UP";
}

/**
 * Existence of this attribute indicates that the AF item is for message
 * reactions, but it is intentionally left empty since the list of reactions can
 * be found in the top-level Message.Reactions.
 */
export interface AppsDynamiteSharedChatItemActivityInfoFeedItemReactions {
}

/**
 * Existence of this attribute indicates that the AF item is for thread reply.
 */
export interface AppsDynamiteSharedChatItemActivityInfoFeedItemThreadReply {
  /**
   * Reply type of the thread reply feed item. The field is not persisted in
   * storage. It's populated when constructing Activity Feed payload.
   */
  replyType?:  | "UNSPECIFIED" | "ROOT" | "FOLLOWER";
}

/**
 * Existence of this attribute indicates that the AF item is for a user mention
 * item.
 */
export interface AppsDynamiteSharedChatItemActivityInfoFeedItemUserMention {
  /**
   * User mention type
   */
  type?:  | "TYPE_UNSPECIFIED" | "DIRECT" | "ALL";
}

/**
 * Information about the space that the item originated from. This will be used
 * to display Activity Feed items from rooms, and only contain the necessary
 * information, such as the space name and group attributes. NEXT TAG: 6
 */
export interface AppsDynamiteSharedChatItemGroupInfo {
  /**
   * This is needed to determine what type of group the source message came
   * from to support click-to-source.
   */
  attributeCheckerGroupType?:  | "ATTRIBUTE_CHECKER_GROUP_TYPE_UNSPECIFIED" | "ONE_TO_ONE_HUMAN_DM" | "ONE_TO_ONE_BOT_DM" | "IMMUTABLE_MEMBERSHIP_GROUP_DM" | "FLAT_ROOM" | "THREADED_ROOM" | "IMMUTABLE_MEMBERSHIP_HUMAN_DM" | "POST_ROOM" | "ACTIVITY_FEED";
  groupName?: string;
  /**
   * Timestamp of when the group containing the message has been read by the
   * user.
   */
  groupReadTimeUsec?: bigint;
  /**
   * Indicates whether the group has inline replies enabled. If enabled,
   * clients will render the space with inline replies.
   */
  inlineThreadingEnabled?: boolean;
}

function serializeAppsDynamiteSharedChatItemGroupInfo(data: any): AppsDynamiteSharedChatItemGroupInfo {
  return {
    ...data,
    groupReadTimeUsec: data["groupReadTimeUsec"] !== undefined ? String(data["groupReadTimeUsec"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedChatItemGroupInfo(data: any): AppsDynamiteSharedChatItemGroupInfo {
  return {
    ...data,
    groupReadTimeUsec: data["groupReadTimeUsec"] !== undefined ? BigInt(data["groupReadTimeUsec"]) : undefined,
  };
}

/**
 * Denotes a type of content report a user can send.
 */
export interface AppsDynamiteSharedContentReportType {
  /**
   * Required. Google-defined system violation, covering the most common
   * violations.
   */
  systemViolation?:  | "VIOLATION_UNSPECIFIED" | "HARASSMENT" | "DISCRIMINATION" | "EXPLICIT_CONTENT" | "SPAM" | "CONFIDENTIAL_INFORMATION" | "SENSITIVE_INFORMATION" | "FRAUD" | "MALWARE" | "ILLEGAL_ACTIVITIES" | "OTHER";
}

/**
 * Proto representation of a custom emoji. May be used in both APIs and in
 * Spanner, but certain fields should be restricted to one or the other. See the
 * per-field documentation for details. NEXT_TAG: 14
 */
export interface AppsDynamiteSharedCustomEmoji {
  /**
   * ID for the underlying image data in Blobstore. This field should *only* be
   * present in Spanner or within the server, but should not be exposed in
   * public APIs.
   */
  blobId?: string;
  /**
   * Content type of the file used to upload the emoji. Used for takeout.
   * Written to Spanner when the emoji is created.
   */
  contentType?: string;
  /**
   * Time when the Emoji was created, in microseconds. This field may be
   * present in Spanner, within the server, or in public APIs.
   */
  createTimeMicros?: bigint;
  /**
   * This field should *never* be persisted to Spanner.
   */
  creatorUserId?: UserId;
  /**
   * Time when the emoji was deleted, in microseconds. This field may be
   * present in Spanner, within the server, or in public APIs. Only present if
   * the emoji has been deleted.
   */
  deleteTimeMicros?: bigint;
  /**
   * Output only. A short-lived URL clients can use for directly accessing a
   * custom emoji image. This field is intended for API consumption, and should
   * *never* be persisted to Spanner.
   */
  readonly ephemeralUrl?: string;
  /**
   * This field should *never* be persisted to Spanner.
   */
  ownerCustomerId?: CustomerId;
  /**
   * Opaque token that clients use to construct the URL for accessing the
   * custom emoji’s image data. This field is intended for API consumption, and
   * should *never* be persisted to Spanner.
   */
  readToken?: string;
  /**
   * User-provided, human-readable ID for the custom emoji. Users are expected
   * to observe this field in the UI instead of the UUID. This shortcode should
   * be unique within an organization, but has no global uniqueness guarantees,
   * unlike the UUID. This field should *never* be persisted to Spanner.
   */
  shortcode?: string;
  /**
   * Snapshot of the current state of the emoji, which may differ from the
   * source-of-truth in the CustomEmojis table. This field should *never* be
   * persisted to Spanner.
   */
  state?:  | "EMOJI_STATE_UNSPECIFIED" | "EMOJI_ENABLED" | "EMOJI_SYSTEM_DISABLED" | "EMOJI_HIDDEN" | "EMOJI_DELETED";
  updateTimeMicros?: bigint;
  /**
   * Unique key for a custom emoji resource. Required. This field is *always*
   * populated.
   */
  uuid?: string;
}

function serializeAppsDynamiteSharedCustomEmoji(data: any): AppsDynamiteSharedCustomEmoji {
  return {
    ...data,
    createTimeMicros: data["createTimeMicros"] !== undefined ? String(data["createTimeMicros"]) : undefined,
    creatorUserId: data["creatorUserId"] !== undefined ? serializeUserId(data["creatorUserId"]) : undefined,
    deleteTimeMicros: data["deleteTimeMicros"] !== undefined ? String(data["deleteTimeMicros"]) : undefined,
    updateTimeMicros: data["updateTimeMicros"] !== undefined ? String(data["updateTimeMicros"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedCustomEmoji(data: any): AppsDynamiteSharedCustomEmoji {
  return {
    ...data,
    createTimeMicros: data["createTimeMicros"] !== undefined ? BigInt(data["createTimeMicros"]) : undefined,
    creatorUserId: data["creatorUserId"] !== undefined ? deserializeUserId(data["creatorUserId"]) : undefined,
    deleteTimeMicros: data["deleteTimeMicros"] !== undefined ? BigInt(data["deleteTimeMicros"]) : undefined,
    updateTimeMicros: data["updateTimeMicros"] !== undefined ? BigInt(data["updateTimeMicros"]) : undefined,
  };
}

/**
 * Dimension for the uploaded attachments.
 */
export interface AppsDynamiteSharedDimension {
  height?: number;
  width?: number;
}

/**
 * LINT.IfChange
 */
export interface AppsDynamiteSharedDlpMetricsMetadata {
  /**
   * [required] Describes the DLP status of message send and attachment upload
   * events.
   */
  dlpStatus?:  | "DLP_STATUS_UNKNOWN" | "DLP_DISABLED" | "DLP_ENABLED_NO_RULE_FETCH" | "DLP_ENABLED_RULES_FETCHED_NO_RULES" | "DLP_ENABLED_RULES_FETCHED_NO_APPLICABLE_RULES" | "DLP_ENABLED_RULES_FETCHED_AND_EVALUATED" | "DLP_ENABLED_SCAN_TIMEOUT" | "DLP_ENABLED_SCAN_FAILED";
}

/**
 * Data for rendering a document.
 */
export interface AppsDynamiteSharedDocument {
  /**
   * Unique file ID.
   */
  fileId?: string;
  /**
   * Justification to explain why this document is being suggested.
   */
  justification?: AppsDynamiteSharedJustification;
  /**
   * Time the document was last modified.
   */
  lastModifiedTime?: Date;
  /**
   * Used to determine which icon to render (e.g. docs, slides, sheets)
   */
  mimeType?: string;
  /**
   * Title of the document.
   */
  title?: string;
  /**
   * URL of the document.
   */
  url?: string;
}

function serializeAppsDynamiteSharedDocument(data: any): AppsDynamiteSharedDocument {
  return {
    ...data,
    justification: data["justification"] !== undefined ? serializeAppsDynamiteSharedJustification(data["justification"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? data["lastModifiedTime"].toISOString() : undefined,
  };
}

function deserializeAppsDynamiteSharedDocument(data: any): AppsDynamiteSharedDocument {
  return {
    ...data,
    justification: data["justification"] !== undefined ? deserializeAppsDynamiteSharedJustification(data["justification"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? new Date(data["lastModifiedTime"]) : undefined,
  };
}

export interface AppsDynamiteSharedEmoji {
  /**
   * A custom emoji.
   */
  customEmoji?: AppsDynamiteSharedCustomEmoji;
  /**
   * A basic emoji represented by a unicode string.
   */
  unicode?: string;
}

function serializeAppsDynamiteSharedEmoji(data: any): AppsDynamiteSharedEmoji {
  return {
    ...data,
    customEmoji: data["customEmoji"] !== undefined ? serializeAppsDynamiteSharedCustomEmoji(data["customEmoji"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedEmoji(data: any): AppsDynamiteSharedEmoji {
  return {
    ...data,
    customEmoji: data["customEmoji"] !== undefined ? deserializeAppsDynamiteSharedCustomEmoji(data["customEmoji"]) : undefined,
  };
}

/**
 * Data for a FindDocument suggestion type.
 */
export interface AppsDynamiteSharedFindDocumentSuggestion {
  /**
   * List of documents to render as suggestions.
   */
  documentSuggestions?: AppsDynamiteSharedDocument[];
  /**
   * Whether to show the action buttons in the card for the suggestions.
   */
  showActionButtons?: boolean;
}

function serializeAppsDynamiteSharedFindDocumentSuggestion(data: any): AppsDynamiteSharedFindDocumentSuggestion {
  return {
    ...data,
    documentSuggestions: data["documentSuggestions"] !== undefined ? data["documentSuggestions"].map((item: any) => (serializeAppsDynamiteSharedDocument(item))) : undefined,
  };
}

function deserializeAppsDynamiteSharedFindDocumentSuggestion(data: any): AppsDynamiteSharedFindDocumentSuggestion {
  return {
    ...data,
    documentSuggestions: data["documentSuggestions"] !== undefined ? data["documentSuggestions"].map((item: any) => (deserializeAppsDynamiteSharedDocument(item))) : undefined,
  };
}

/**
 * NEXT TAG: 3 A GroupDetails proto will store the information pertaining to
 * single Group.
 */
export interface AppsDynamiteSharedGroupDetails {
  /**
   * A simple text that describes the purpose of a single Group, the general
   * theme of the topics to be posted and/or the denominator of the Group
   * participants.
   */
  description?: string;
  /**
   * A simple text describing the rules and expectations from members when
   * participating in conversation.
   */
  guidelines?: string;
}

export interface AppsDynamiteSharedGroupVisibility {
  state?:  | "UNKNOWN" | "PRIVATE" | "PUBLIC";
}

/**
 * Data for rendering a justification for a document.
 */
export interface AppsDynamiteSharedJustification {
  /**
   * Time the action took place.
   */
  actionTime?: Date;
  /**
   * Type of action performed on the document.
   */
  actionType?:  | "ACTION_TYPE_UNSPECIFIED" | "COMMENTED" | "CREATED" | "EDITED" | "PRESENTED" | "SHARED" | "VIEWED" | "COMMENT_RESOLVED" | "SENT";
  /**
   * Owner of the document.
   */
  documentOwner?: AppsDynamiteSharedJustificationPerson;
  /**
   * Words or phrases from the user's query that describes the document
   * content. (Ex: Users query is "Can you share the document about Bullseye?"
   * the extracted topic would be "Bullseye").
   */
  topics?: string[];
}

function serializeAppsDynamiteSharedJustification(data: any): AppsDynamiteSharedJustification {
  return {
    ...data,
    actionTime: data["actionTime"] !== undefined ? data["actionTime"].toISOString() : undefined,
    documentOwner: data["documentOwner"] !== undefined ? serializeAppsDynamiteSharedJustificationPerson(data["documentOwner"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedJustification(data: any): AppsDynamiteSharedJustification {
  return {
    ...data,
    actionTime: data["actionTime"] !== undefined ? new Date(data["actionTime"]) : undefined,
    documentOwner: data["documentOwner"] !== undefined ? deserializeAppsDynamiteSharedJustificationPerson(data["documentOwner"]) : undefined,
  };
}

/**
 * Data for rendering a person associated with a document.
 */
export interface AppsDynamiteSharedJustificationPerson {
  /**
   * Whether the person is the recipient of the suggestions.
   */
  isRecipient?: boolean;
  /**
   * Obfuscated user ID.
   */
  user?: UserId;
}

function serializeAppsDynamiteSharedJustificationPerson(data: any): AppsDynamiteSharedJustificationPerson {
  return {
    ...data,
    user: data["user"] !== undefined ? serializeUserId(data["user"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedJustificationPerson(data: any): AppsDynamiteSharedJustificationPerson {
  return {
    ...data,
    user: data["user"] !== undefined ? deserializeUserId(data["user"]) : undefined,
  };
}

/**
 * Metadata specific for a Meet call that are required to generate call
 * artifacts.
 */
export interface AppsDynamiteSharedMeetMetadata {
  /**
   * Required. A globally unique code (e.g. "cxv-zbgj-wzw") that points to a
   * meeting space. Note: Meeting codes may be regenerated, which will cause old
   * meeting codes to become invalid.
   */
  meetingCode?: string;
  /**
   * Required. A URL, in the format "https://meet.google.com/*" (e.g.
   * https://meet.google.com/cxv-zbgj-wzw), to identify and access the meeting
   * space.
   */
  meetingUrl?: string;
}

/**
 * Information that references a Dynamite chat message. This is only used for
 * Activity Feed messages.
 */
export interface AppsDynamiteSharedMessageInfo {
  /**
   * Id of the source chat message. This is kept here because the top-level
   * message ID to refers the AF message ID.
   */
  messageId?: MessageId;
  /**
   * The type of the source chat message.
   */
  messageType?:  | "MESSAGE_TYPE_UNSPECIFIED" | "INLINE_REPLY";
  /**
   * Timestamp of when the topic containing the message has been read by the
   * user. This is populated if the message references an inline reply, in which
   * case the space may be marked as read but the topic still has unread
   * messages.
   */
  topicReadTimeUsec?: bigint;
}

function serializeAppsDynamiteSharedMessageInfo(data: any): AppsDynamiteSharedMessageInfo {
  return {
    ...data,
    topicReadTimeUsec: data["topicReadTimeUsec"] !== undefined ? String(data["topicReadTimeUsec"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedMessageInfo(data: any): AppsDynamiteSharedMessageInfo {
  return {
    ...data,
    topicReadTimeUsec: data["topicReadTimeUsec"] !== undefined ? BigInt(data["topicReadTimeUsec"]) : undefined,
  };
}

/**
 * The payload(restricted to 1P applications) to be stored with a specific
 * message.
 */
export interface AppsDynamiteSharedMessageIntegrationPayload {
  /**
   * Pantheon project number used to identify the calling app.
   */
  projectNumber?: bigint;
  tasksMessageIntegrationPayload?: AppsDynamiteSharedTasksMessageIntegrationPayload;
  /**
   * An enum indicating which 1P application's payload this is. This field is
   * required to add 1P payload.
   */
  type?:  | "PAYLOAD_TYPE_UNSPECIFIED" | "TASKS";
}

function serializeAppsDynamiteSharedMessageIntegrationPayload(data: any): AppsDynamiteSharedMessageIntegrationPayload {
  return {
    ...data,
    projectNumber: data["projectNumber"] !== undefined ? String(data["projectNumber"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedMessageIntegrationPayload(data: any): AppsDynamiteSharedMessageIntegrationPayload {
  return {
    ...data,
    projectNumber: data["projectNumber"] !== undefined ? BigInt(data["projectNumber"]) : undefined,
  };
}

/**
 * Contains info about the entity that something is, or is owned by.
 */
export interface AppsDynamiteSharedOrganizationInfo {
  consumerInfo?: AppsDynamiteSharedOrganizationInfoConsumerInfo;
  customerInfo?: AppsDynamiteSharedOrganizationInfoCustomerInfo;
}

/**
 * Intentionally empty. Used to disambiguate consumer and customer use cases in
 * oneof below.
 */
export interface AppsDynamiteSharedOrganizationInfoConsumerInfo {
}

export interface AppsDynamiteSharedOrganizationInfoCustomerInfo {
  customerId?: CustomerId;
}

/**
 * Stores the suggestion provided by apps/bots.
 */
export interface AppsDynamiteSharedOriginAppSuggestion {
  appId?: AppId;
  cardClickSuggestion?: AppsDynamiteSharedCardClickSuggestion;
}

function serializeAppsDynamiteSharedOriginAppSuggestion(data: any): AppsDynamiteSharedOriginAppSuggestion {
  return {
    ...data,
    appId: data["appId"] !== undefined ? serializeAppId(data["appId"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedOriginAppSuggestion(data: any): AppsDynamiteSharedOriginAppSuggestion {
  return {
    ...data,
    appId: data["appId"] !== undefined ? deserializeAppId(data["appId"]) : undefined,
  };
}

export interface AppsDynamiteSharedPhoneNumber {
  /**
   * The phone number type, e.g., work, mobile, etc.
   */
  type?: string;
  /**
   * The actual phone number.
   */
  value?: string;
}

export interface AppsDynamiteSharedReaction {
  /**
   * The total number of users who have reacted.
   */
  count?: number;
  /**
   * When the first emoji of this type was added.
   */
  createTimestamp?: bigint;
  /**
   * Whether the current user reacted using this emoji. Note: Unlike most
   * properties of messages, this is different per-user.
   */
  currentUserParticipated?: boolean;
  emoji?: AppsDynamiteSharedEmoji;
}

function serializeAppsDynamiteSharedReaction(data: any): AppsDynamiteSharedReaction {
  return {
    ...data,
    createTimestamp: data["createTimestamp"] !== undefined ? String(data["createTimestamp"]) : undefined,
    emoji: data["emoji"] !== undefined ? serializeAppsDynamiteSharedEmoji(data["emoji"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedReaction(data: any): AppsDynamiteSharedReaction {
  return {
    ...data,
    createTimestamp: data["createTimestamp"] !== undefined ? BigInt(data["createTimestamp"]) : undefined,
    emoji: data["emoji"] !== undefined ? deserializeAppsDynamiteSharedEmoji(data["emoji"]) : undefined,
  };
}

/**
 * The settings of retention period of a message or topic.
 */
export interface AppsDynamiteSharedRetentionSettings {
  /**
   * The timestamp after which the message/topic should be removed, in
   * microseconds since the epoch, when state == EPHEMERAL_ONE_DAY. The value
   * should not be set in other cases.
   */
  expiryTimestamp?: bigint;
  /**
   * The retention state.
   */
  state?:  | "UNKNOWN_RETENTION_STATE" | "PERMANENT" | "EPHEMERAL_ONE_DAY";
}

function serializeAppsDynamiteSharedRetentionSettings(data: any): AppsDynamiteSharedRetentionSettings {
  return {
    ...data,
    expiryTimestamp: data["expiryTimestamp"] !== undefined ? String(data["expiryTimestamp"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedRetentionSettings(data: any): AppsDynamiteSharedRetentionSettings {
  return {
    ...data,
    expiryTimestamp: data["expiryTimestamp"] !== undefined ? BigInt(data["expiryTimestamp"]) : undefined,
  };
}

/**
 * Contains info on membership count for member types: HUMAN_USER, APP_USER &
 * ROSTER_MEMBER different states: INVITED, JOINED
 */
export interface AppsDynamiteSharedSegmentedMembershipCount {
  /**
   * count of members with given type and state
   */
  membershipCount?: number;
  membershipState?:  | "MEMBER_UNKNOWN" | "MEMBER_INVITED" | "MEMBER_JOINED" | "MEMBER_NOT_A_MEMBER" | "MEMBER_FAILED";
  memberType?:  | "MEMBER_TYPE_UNSPECIFIED" | "HUMAN_USER" | "ROSTER_MEMBER";
}

export interface AppsDynamiteSharedSegmentedMembershipCounts {
  value?: AppsDynamiteSharedSegmentedMembershipCount[];
}

/**
 * Defines the representation of a single matching space.
 */
export interface AppsDynamiteSharedSpaceInfo {
  avatarInfo?: AppsDynamiteSharedAvatarInfo;
  avatarUrl?: string;
  description?: string;
  groupId?: GroupId;
  /**
   * The email address of the user that invited the calling user to the room,
   * if available. This field will only be populated for direct invites, it will
   * be empty if the user was indirectly invited to the group.
   */
  inviterEmail?: string;
  /**
   * Whether this is a space that enables guest access
   */
  isExternal?: boolean;
  name?: string;
  /**
   * Deprecated. Use segmented_membership_counts instead which also includes
   * other counts such as rosters.
   */
  numMembers?: number;
  /**
   * Member counts object with types of members and their respective counts.
   */
  segmentedMembershipCounts?: AppsDynamiteSharedSegmentedMembershipCounts;
  /**
   * searching user's membership state in this space
   */
  userMembershipState?:  | "MEMBER_UNKNOWN" | "MEMBER_INVITED" | "MEMBER_JOINED" | "MEMBER_NOT_A_MEMBER" | "MEMBER_FAILED";
}

function serializeAppsDynamiteSharedSpaceInfo(data: any): AppsDynamiteSharedSpaceInfo {
  return {
    ...data,
    avatarInfo: data["avatarInfo"] !== undefined ? serializeAppsDynamiteSharedAvatarInfo(data["avatarInfo"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedSpaceInfo(data: any): AppsDynamiteSharedSpaceInfo {
  return {
    ...data,
    avatarInfo: data["avatarInfo"] !== undefined ? deserializeAppsDynamiteSharedAvatarInfo(data["avatarInfo"]) : undefined,
  };
}

/**
 * This is the internal version of the API proto at
 * google3/google/chat/v1/gsuite_message_integration.proto
 */
export interface AppsDynamiteSharedTasksAnnotationData {
  assigneeChange?: AppsDynamiteSharedTasksAnnotationDataAssigneeChange;
  completionChange?: AppsDynamiteSharedTasksAnnotationDataCompletionChange;
  creation?: AppsDynamiteSharedTasksAnnotationDataCreation;
  deletionChange?: AppsDynamiteSharedTasksAnnotationDataDeletionChange;
  /**
   * ID of task. Will be used to create deep links to Tasks.
   */
  taskId?: string;
  /**
   * Task properties after the update has been applied.
   */
  taskProperties?: AppsDynamiteSharedTasksAnnotationDataTaskProperties;
  userDefinedMessage?: AppsDynamiteSharedTasksAnnotationDataUserDefinedMessage;
}

function serializeAppsDynamiteSharedTasksAnnotationData(data: any): AppsDynamiteSharedTasksAnnotationData {
  return {
    ...data,
    assigneeChange: data["assigneeChange"] !== undefined ? serializeAppsDynamiteSharedTasksAnnotationDataAssigneeChange(data["assigneeChange"]) : undefined,
    taskProperties: data["taskProperties"] !== undefined ? serializeAppsDynamiteSharedTasksAnnotationDataTaskProperties(data["taskProperties"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedTasksAnnotationData(data: any): AppsDynamiteSharedTasksAnnotationData {
  return {
    ...data,
    assigneeChange: data["assigneeChange"] !== undefined ? deserializeAppsDynamiteSharedTasksAnnotationDataAssigneeChange(data["assigneeChange"]) : undefined,
    taskProperties: data["taskProperties"] !== undefined ? deserializeAppsDynamiteSharedTasksAnnotationDataTaskProperties(data["taskProperties"]) : undefined,
  };
}

export interface AppsDynamiteSharedTasksAnnotationDataAssigneeChange {
  /**
   * Obfuscated user ID of previous assignee. Not set if the task was
   * originally not assigned.
   */
  oldAssignee?: UserId;
}

function serializeAppsDynamiteSharedTasksAnnotationDataAssigneeChange(data: any): AppsDynamiteSharedTasksAnnotationDataAssigneeChange {
  return {
    ...data,
    oldAssignee: data["oldAssignee"] !== undefined ? serializeUserId(data["oldAssignee"]) : undefined,
  };
}

function deserializeAppsDynamiteSharedTasksAnnotationDataAssigneeChange(data: any): AppsDynamiteSharedTasksAnnotationDataAssigneeChange {
  return {
    ...data,
    oldAssignee: data["oldAssignee"] !== undefined ? deserializeUserId(data["oldAssignee"]) : undefined,
  };
}

export interface AppsDynamiteSharedTasksAnnotationDataCompletionChange {
}

export interface AppsDynamiteSharedTasksAnnotationDataCreation {
}

export interface AppsDynamiteSharedTasksAnnotationDataDeletionChange {
}

/**
 * All relevant task properties for a Chat message.
 */
export interface AppsDynamiteSharedTasksAnnotationDataTaskProperties {
  /**
   * Obfuscated user ID of new assignee. Not set if the task doesn't have an
   * assignee.
   */
  assignee?: UserId;
  /**
   * Whether the task is marked as completed.
   */
  completed?: boolean;
  /**
   * Whether the task is marked as deleted.
   */
  deleted?: boolean;
  /**
   * The description of the task. If Task original description's length is
   * greater than 1024, then Task BE sends the truncated description to Dynamite
   * Integration Server.
   */
  description?: string;
  /**
   * Set if the task has a date but no time. Source of truth in Tasks BE:
   * http://shortn/_wyT7eB4Ixv
   */
  startDate?: Date;
  /**
   * Set if the task has both a date and a time. Source of truth in Tasks BE:
   * http://shortn/_u6cr0F5ttE
   */
  startTime?: Date;
  /**
   * The title of the task.
   */
  title?: string;
}

function serializeAppsDynamiteSharedTasksAnnotationDataTaskProperties(data: any): AppsDynamiteSharedTasksAnnotationDataTaskProperties {
  return {
    ...data,
    assignee: data["assignee"] !== undefined ? serializeUserId(data["assignee"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeAppsDynamiteSharedTasksAnnotationDataTaskProperties(data: any): AppsDynamiteSharedTasksAnnotationDataTaskProperties {
  return {
    ...data,
    assignee: data["assignee"] !== undefined ? deserializeUserId(data["assignee"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Used for task card attachments on custom user messages that should be kept
 * as is without generating an i18n event message, e.g. the user starts a
 * conversation from an existing task. IMPORTANT: please don't populate this
 * field yet as it could break existing flows until it's implemented. See code
 * at http://shortn/_CM74CdENMx used by http://shortn/_5o85POJY8Q.
 */
export interface AppsDynamiteSharedTasksAnnotationDataUserDefinedMessage {
}

/**
 * A payload containing Tasks metadata for rendering a live card. Currently not
 * used by the Tasks integration.
 */
export interface AppsDynamiteSharedTasksMessageIntegrationPayload {
}

/**
 * User-block relationship
 */
export interface AppsDynamiteSharedUserBlockRelationship {
  hasBlockedRequester?: boolean;
  isBlockedByRequester?: boolean;
}

/**
 * Reference to a transcoded video attachment.
 */
export interface AppsDynamiteSharedVideoReference {
  /**
   * Available transcode format. Value is defined in
   * video/storage/proto/content_header.proto
   */
  format?: number[];
  /**
   * Transcode status
   */
  status?:  | "UNKNOWN_STATUS" | "SUCCESS" | "ERROR" | "NOT_APPLICABLE" | "THUMBNAIL_SUCCESS" | "GO_LIVE_SUCCESS";
}

/**
 * An action that describes the behavior when the form is submitted. For
 * example, an Apps Script can be invoked to handle the form.
 */
export interface AppsDynamiteStorageAction {
  /**
   * Apps Script function to invoke when the containing element is
   * clicked/activated.
   */
  function?: string;
  interaction?:  | "INTERACTION_UNSPECIFIED" | "OPEN_DIALOG";
  loadIndicator?:  | "SPINNER" | "NONE";
  /**
   * List of action parameters.
   */
  parameters?: AppsDynamiteStorageActionActionParameter[];
  /**
   * Indicates whether form values persist after the action. The default value
   * is `false`. If `true`, form values remain after the action is triggered.
   * When using
   * [LoadIndicator.NONE](workspace/add-ons/reference/rpc/google.apps.card.v1#loadindicator)
   * for actions, `persist_values` = `true`is recommended, as it ensures that
   * any changes made by the user after form or on change actions are sent to
   * the server are not overwritten by the response. If `false`, the form values
   * are cleared when the action is triggered. When `persist_values` is set to
   * `false`, it is strongly recommended that the card use
   * [LoadIndicator.SPINNER](workspace/add-ons/reference/rpc/google.apps.card.v1#loadindicator)
   * for all actions, as this locks the UI to ensure no changes are made by the
   * user while the action is being processed.
   */
  persistValues?: boolean;
}

/**
 * List of string parameters to supply when the action method is invoked. For
 * example, consider three snooze buttons: snooze now, snooze 1 day, snooze next
 * week. You might use action method = snooze(), passing the snooze type and
 * snooze time in the list of string parameters.
 */
export interface AppsDynamiteStorageActionActionParameter {
  /**
   * The name of the parameter for the action script.
   */
  key?: string;
  /**
   * The value of the parameter.
   */
  value?: string;
}

/**
 * Represents the complete border style applied to widgets.
 */
export interface AppsDynamiteStorageBorderStyle {
  /**
   * The corner radius for the border.
   */
  cornerRadius?: number;
  /**
   * The colors to use when the type is `BORDER_TYPE_STROKE`.
   */
  strokeColor?: Color;
  /**
   * The border type.
   */
  type?:  | "BORDER_TYPE_UNSPECIFIED" | "NO_BORDER" | "STROKE";
}

/**
 * A button. Can be a text button or an image button.
 */
export interface AppsDynamiteStorageButton {
  /**
   * The alternative text used for accessibility. Has no effect when an icon is
   * set; use `icon.alt_text` instead.
   */
  altText?: string;
  /**
   * If set, the button is filled with a solid background.
   */
  color?: Color;
  /**
   * If true, the button is displayed in a disabled state and doesn't respond
   * to user actions.
   */
  disabled?: boolean;
  /**
   * The icon image.
   */
  icon?: AppsDynamiteStorageIcon;
  /**
   * The action to perform when the button is clicked.
   */
  onClick?: AppsDynamiteStorageOnClick;
  /**
   * The text of the button.
   */
  text?: string;
}

/**
 * A list of buttons layed out horizontally.
 */
export interface AppsDynamiteStorageButtonList {
  buttons?: AppsDynamiteStorageButton[];
}

/**
 * A card is a UI element that can contain UI widgets such as text and images.
 * For more information, see Cards . For example, the following JSON creates a
 * card that has a header with the name, position, icons, and link for a
 * contact, followed by a section with contact information like email and phone
 * number. ``` { "header": { "title": "Heba Salam", "subtitle": "Software
 * Engineer", "imageStyle": "ImageStyle.AVATAR", "imageUrl":
 * "https://example.com/heba_salam.png", "imageAltText": "Avatar for Heba Salam"
 * }, "sections" : [ { "header": "Contact Info", "widgets": [ {
 * "decorated_text": { "icon": { "knownIcon": "EMAIL" }, "content":
 * "heba.salam@example.com" } }, { "decoratedText": { "icon": { "knownIcon":
 * "PERSON" }, "content": "Online" } }, { "decoratedText": { "icon": {
 * "knownIcon": "PHONE" }, "content": "+1 (555) 555-1234" } }, { "buttons": [ {
 * "textButton": { "text": "Share", }, "onClick": { "openLink": { "url":
 * "https://example.com/share" } } }, { "textButton": { "text": "Edit", },
 * "onClick": { "action": { "function": "goToView", "parameters": [ { "key":
 * "viewType", "value": "EDIT" } ], "loadIndicator": "LoadIndicator.SPINNER" } }
 * } ] } ], "collapsible": true, "uncollapsibleWidgetsCount": 3 } ],
 * "cardActions": [ { "actionLabel": "Send Feedback", "onClick": { "openLink": {
 * "url": "https://example.com/feedback" } } } ], "name":
 * "contact-card-K3wB6arF2H9L" } ```
 */
export interface AppsDynamiteStorageCard {
  /**
   * The actions of this card. They are added to a card's generated toolbar
   * menu. For example, the following JSON constructs a card action menu with
   * Settings and Send Feedback options: ``` "card_actions": [ { "actionLabel":
   * "Setting", "onClick": { "action": { "functionName": "goToView",
   * "parameters": [ { "key": "viewType", "value": "SETTING" } ],
   * "loadIndicator": "LoadIndicator.SPINNER" } } }, { "actionLabel": "Send
   * Feedback", "onClick": { "openLink": { "url": "https://example.com/feedback"
   * } } } ] ```
   */
  cardActions?: AppsDynamiteStorageCardCardAction[];
  /**
   * The header of the card. A header usually contains a title and an image.
   */
  header?: AppsDynamiteStorageCardCardHeader;
  /**
   * Name of the card, which is used as a identifier for the card in card
   * navigation.
   */
  name?: string;
  /**
   * Sections are separated by a line divider.
   */
  sections?: AppsDynamiteStorageCardSection[];
}

function serializeAppsDynamiteStorageCard(data: any): AppsDynamiteStorageCard {
  return {
    ...data,
    sections: data["sections"] !== undefined ? data["sections"].map((item: any) => (serializeAppsDynamiteStorageCardSection(item))) : undefined,
  };
}

function deserializeAppsDynamiteStorageCard(data: any): AppsDynamiteStorageCard {
  return {
    ...data,
    sections: data["sections"] !== undefined ? data["sections"].map((item: any) => (deserializeAppsDynamiteStorageCardSection(item))) : undefined,
  };
}

/**
 * A card action is the action associated with the card. For example, an
 * invoice card might include actions such as delete invoice, email invoice, or
 * open the invoice in a browser.
 */
export interface AppsDynamiteStorageCardCardAction {
  /**
   * The label that displays as the action menu item.
   */
  actionLabel?: string;
  /**
   * The onclick action for this action item.
   */
  onClick?: AppsDynamiteStorageOnClick;
}

export interface AppsDynamiteStorageCardCardHeader {
  /**
   * The alternative text of this image which is used for accessibility.
   */
  imageAltText?: string;
  /**
   * The image's type.
   */
  imageType?:  | "SQUARE" | "CIRCLE";
  /**
   * The URL of the image in the card header.
   */
  imageUrl?: string;
  /**
   * The subtitle of the card header.
   */
  subtitle?: string;
  /**
   * The title of the card header. The title must be specified. The header has
   * a fixed height: if both a title and subtitle are specified, each takes up
   * one line. If only the title is specified, it takes up both lines.
   */
  title?: string;
}

/**
 * A section contains a collection of widgets that are rendered vertically in
 * the order that they are specified. Across all platforms, cards have a narrow
 * fixed width, so there is currently no need for layout properties, for
 * example, float.
 */
export interface AppsDynamiteStorageCardSection {
  /**
   * Indicates whether this section is collapsible. If a section is
   * collapsible, the description must be given.
   */
  collapsible?: boolean;
  /**
   * The header of the section. Formatted text is supported.
   */
  header?: string;
  /**
   * The number of uncollapsible widgets. For example, when a section contains
   * five widgets and the `numUncollapsibleWidget` is set to `2`, the first two
   * widgets are always shown and the last three are collapsed as default. The
   * `numUncollapsibleWidget` is taken into account only when collapsible is set
   * to `true`.
   */
  uncollapsibleWidgetsCount?: number;
  /**
   * A section must contain at least 1 widget.
   */
  widgets?: AppsDynamiteStorageWidget[];
}

function serializeAppsDynamiteStorageCardSection(data: any): AppsDynamiteStorageCardSection {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (serializeAppsDynamiteStorageWidget(item))) : undefined,
  };
}

function deserializeAppsDynamiteStorageCardSection(data: any): AppsDynamiteStorageCardSection {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (deserializeAppsDynamiteStorageWidget(item))) : undefined,
  };
}

/**
 * Represents a Columns widget that displays a single row of columns.
 */
export interface AppsDynamiteStorageColumns {
  /**
   * Each card supports up to 2 columns.
   */
  columnItems?: AppsDynamiteStorageColumnsColumn[];
  /**
   * Controls how the column resizes based on screen width.
   */
  wrapStyle?:  | "WRAP_STYLE_UNSPECIFIED" | "NOWRAP" | "WRAP";
}

function serializeAppsDynamiteStorageColumns(data: any): AppsDynamiteStorageColumns {
  return {
    ...data,
    columnItems: data["columnItems"] !== undefined ? data["columnItems"].map((item: any) => (serializeAppsDynamiteStorageColumnsColumn(item))) : undefined,
  };
}

function deserializeAppsDynamiteStorageColumns(data: any): AppsDynamiteStorageColumns {
  return {
    ...data,
    columnItems: data["columnItems"] !== undefined ? data["columnItems"].map((item: any) => (deserializeAppsDynamiteStorageColumnsColumn(item))) : undefined,
  };
}

/**
 * Represents a Column that consists of widgets stacked vertically.
 */
export interface AppsDynamiteStorageColumnsColumn {
  /**
   * The horizontal alignment of the column.
   */
  horizontalAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "START" | "CENTER" | "END";
  /**
   * Specifies how the column content is sized horizontally.
   */
  horizontalSizeStyle?:  | "HORIZONTAL_SIZE_STYLE_UNSPECIFIED" | "FILL_AVAILABLE_SPACE" | "FILL_MINIMUM_SPACE";
  /**
   * The vertical alignment of the column.
   */
  verticalAlignment?:  | "VERTICAL_ALIGNMENT_UNSPECIFIED" | "CENTER" | "TOP" | "BOTTOM";
  /**
   * LINT.ThenChange(//depot/google3/google/apps/card/v1/card.proto) Array of
   * widgets included in the column.
   */
  widgets?: AppsDynamiteStorageColumnsColumnWidgets[];
}

function serializeAppsDynamiteStorageColumnsColumn(data: any): AppsDynamiteStorageColumnsColumn {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (serializeAppsDynamiteStorageColumnsColumnWidgets(item))) : undefined,
  };
}

function deserializeAppsDynamiteStorageColumnsColumn(data: any): AppsDynamiteStorageColumnsColumn {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (deserializeAppsDynamiteStorageColumnsColumnWidgets(item))) : undefined,
  };
}

/**
 * LINT.IfChange The `column` widget can contain these widgets.
 */
export interface AppsDynamiteStorageColumnsColumnWidgets {
  /**
   * ButtonList widget.
   */
  buttonList?: AppsDynamiteStorageButtonList;
  /**
   * DateTimePicker widget.
   */
  dateTimePicker?: AppsDynamiteStorageDateTimePicker;
  /**
   * DecoratedText widget.
   */
  decoratedText?: AppsDynamiteStorageDecoratedText;
  /**
   * Image widget.
   */
  image?: AppsDynamiteStorageImage;
  /**
   * SelectionInput widget.
   */
  selectionInput?: AppsDynamiteStorageSelectionInput;
  /**
   * TextInput widget.
   */
  textInput?: AppsDynamiteStorageTextInput;
  /**
   * Text paragraph widget.
   */
  textParagraph?: AppsDynamiteStorageTextParagraph;
}

function serializeAppsDynamiteStorageColumnsColumnWidgets(data: any): AppsDynamiteStorageColumnsColumnWidgets {
  return {
    ...data,
    dateTimePicker: data["dateTimePicker"] !== undefined ? serializeAppsDynamiteStorageDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

function deserializeAppsDynamiteStorageColumnsColumnWidgets(data: any): AppsDynamiteStorageColumnsColumnWidgets {
  return {
    ...data,
    dateTimePicker: data["dateTimePicker"] !== undefined ? deserializeAppsDynamiteStorageDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

/**
 * The widget that lets users to specify a date and time.
 */
export interface AppsDynamiteStorageDateTimePicker {
  /**
   * The label for the field that displays to the user.
   */
  label?: string;
  /**
   * The name of the text input that's used in formInput, and uniquely
   * identifies this input.
   */
  name?: string;
  /**
   * Triggered when the user clicks Save or Clear from the date/time picker
   * dialog. This is only triggered if the value changed as a result of the
   * Save/Clear operation.
   */
  onChangeAction?: AppsDynamiteStorageAction;
  /**
   * The number representing the time zone offset from UTC, in minutes. If set,
   * the `value_ms_epoch` is displayed in the specified time zone. If not set,
   * it uses the user's time zone setting on the client side.
   */
  timezoneOffsetDate?: number;
  /**
   * The type of the date/time picker.
   */
  type?:  | "DATE_AND_TIME" | "DATE_ONLY" | "TIME_ONLY";
  /**
   * The value to display as the default value before user input or previous
   * user input. It is represented in milliseconds (Epoch time). For
   * `DATE_AND_TIME` type, the full epoch value is used. For `DATE_ONLY` type,
   * only date of the epoch time is used. For `TIME_ONLY` type, only time of the
   * epoch time is used. For example, you can set epoch time to `3 * 60 * 60 *
   * 1000` to represent 3am.
   */
  valueMsEpoch?: bigint;
}

function serializeAppsDynamiteStorageDateTimePicker(data: any): AppsDynamiteStorageDateTimePicker {
  return {
    ...data,
    valueMsEpoch: data["valueMsEpoch"] !== undefined ? String(data["valueMsEpoch"]) : undefined,
  };
}

function deserializeAppsDynamiteStorageDateTimePicker(data: any): AppsDynamiteStorageDateTimePicker {
  return {
    ...data,
    valueMsEpoch: data["valueMsEpoch"] !== undefined ? BigInt(data["valueMsEpoch"]) : undefined,
  };
}

/**
 * A widget that displays text with optional decorations such as a label above
 * or below the text, an icon in front of the text, a selection widget or a
 * button after the text.
 */
export interface AppsDynamiteStorageDecoratedText {
  /**
   * The formatted text label that shows below the main text.
   */
  bottomLabel?: string;
  /**
   * A button that can be clicked to trigger an action.
   */
  button?: AppsDynamiteStorageButton;
  /**
   * An icon displayed after the text.
   */
  endIcon?: AppsDynamiteStorageIcon;
  /**
   * Deprecated in favor of start_icon.
   */
  icon?: AppsDynamiteStorageIcon;
  /**
   * Only the top and bottom label and content region are clickable.
   */
  onClick?: AppsDynamiteStorageOnClick;
  /**
   * The icon displayed in front of the text.
   */
  startIcon?: AppsDynamiteStorageIcon;
  /**
   * A switch widget can be clicked to change its state or trigger an action.
   */
  switchControl?: AppsDynamiteStorageDecoratedTextSwitchControl;
  /**
   * Required. The main widget formatted text. See Text formatting for details.
   */
  text?: string;
  /**
   * The formatted text label that shows above the main text.
   */
  topLabel?: string;
  /**
   * The wrap text setting. If `true`, the text is wrapped and displayed in
   * multiline. Otherwise, the text is truncated.
   */
  wrapText?: boolean;
}

export interface AppsDynamiteStorageDecoratedTextSwitchControl {
  /**
   * The control type, either switch or checkbox.
   */
  controlType?:  | "SWITCH" | "CHECKBOX" | "CHECK_BOX";
  /**
   * The name of the switch widget that's used in formInput.
   */
  name?: string;
  /**
   * The action when the switch state is changed.
   */
  onChangeAction?: AppsDynamiteStorageAction;
  /**
   * If the switch is selected.
   */
  selected?: boolean;
  /**
   * The value is what is passed back in the callback.
   */
  value?: string;
}

/**
 * A divider that appears in between widgets.
 */
export interface AppsDynamiteStorageDivider {
}

/**
 * Represents a Grid widget that displays items in a configurable grid layout.
 */
export interface AppsDynamiteStorageGrid {
  /**
   * The border style to apply to each grid item.
   */
  borderStyle?: AppsDynamiteStorageBorderStyle;
  /**
   * The number of columns to display in the grid. A default value is used if
   * this field isn't specified, and that default value is different depending
   * on where the grid is shown (dialog versus companion).
   */
  columnCount?: number;
  /**
   * The items to display in the grid.
   */
  items?: AppsDynamiteStorageGridGridItem[];
  /**
   * This callback is reused by each individual grid item, but with the item's
   * identifier and index in the items list added to the callback's parameters.
   */
  onClick?: AppsDynamiteStorageOnClick;
  /**
   * The text that displays in the grid header.
   */
  title?: string;
}

/**
 * Represents a single item in the grid layout.
 */
export interface AppsDynamiteStorageGridGridItem {
  /**
   * A user-specified identifier for this grid item. This identifier is
   * returned in the parent Grid's onClick callback parameters.
   */
  id?: string;
  /**
   * The image that displays in the grid item.
   */
  image?: AppsDynamiteStorageImageComponent;
  /**
   * The layout to use for the grid item.
   */
  layout?:  | "GRID_ITEM_LAYOUT_UNSPECIFIED" | "TEXT_BELOW" | "TEXT_ABOVE";
  /**
   * The grid item's subtitle.
   */
  subtitle?: string;
  /**
   * The horizontal alignment of the grid item's text.
   */
  textAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "START" | "CENTER" | "END";
  /**
   * The grid item's title.
   */
  title?: string;
}

export interface AppsDynamiteStorageIcon {
  /**
   * The description of the icon, used for accessibility. The default value is
   * provided if you don't specify one.
   */
  altText?: string;
  /**
   * The icon specified by a URL.
   */
  iconUrl?: string;
  /**
   * The crop style applied to the image. In some cases, applying a `CIRCLE`
   * crop causes the image to be drawn larger than a standard icon.
   */
  imageType?:  | "SQUARE" | "CIRCLE";
  /**
   * The icon specified by the string name of a list of known icons
   */
  knownIcon?: string;
}

/**
 * An image that is specified by a URL and can have an onClick action.
 */
export interface AppsDynamiteStorageImage {
  /**
   * The alternative text of this image, used for accessibility.
   */
  altText?: string;
  /**
   * An image URL.
   */
  imageUrl?: string;
  onClick?: AppsDynamiteStorageOnClick;
}

export interface AppsDynamiteStorageImageComponent {
  /**
   * The accessibility label for the image.
   */
  altText?: string;
  /**
   * The border style to apply to the image.
   */
  borderStyle?: AppsDynamiteStorageBorderStyle;
  /**
   * The crop style to apply to the image.
   */
  cropStyle?: AppsDynamiteStorageImageCropStyle;
  /**
   * The image URL.
   */
  imageUri?: string;
}

/**
 * Represents the crop style applied to an image.
 */
export interface AppsDynamiteStorageImageCropStyle {
  /**
   * The aspect ratio to use if the crop type is `RECTANGLE_CUSTOM`.
   */
  aspectRatio?: number;
  /**
   * The crop type.
   */
  type?:  | "IMAGE_CROP_TYPE_UNSPECIFIED" | "SQUARE" | "CIRCLE" | "RECTANGLE_CUSTOM" | "RECTANGLE_4_3";
}

export interface AppsDynamiteStorageOnClick {
  /**
   * If specified, an action is triggered by this onClick.
   */
  action?: AppsDynamiteStorageAction;
  /**
   * Triggers host app action on click directly without invoking form actions.
   * This is currently not available to end-users and is used internal only.
   */
  hostAppAction?: HostAppActionMarkup;
  /**
   * An add-on triggers this action when the action needs to open a link. This
   * differs from the open_link above in that this needs to talk to server to
   * get the link. Thus some preparation work is required for web client to do
   * before the open link action response comes back.
   */
  openDynamicLinkAction?: AppsDynamiteStorageAction;
  /**
   * If specified, this onClick triggers an open link action.
   */
  openLink?: AppsDynamiteStorageOpenLink;
}

export interface AppsDynamiteStorageOpenLink {
  /**
   * Represents the platform specific uri/intent to open on each client. For
   * example: A companion_url will open in a companion window on the web. An iOS
   * URL and android intent will open in the corresponding hosting apps. If
   * these platform specific URLs can't be handled correctly, i.e. if the
   * companion isn't supported on web and the hosting apps aren't available on
   * the mobile platforms then the `uri` will open in a new browser window on
   * all the platforms.
   */
  appUri?: AppsDynamiteStorageOpenLinkAppUri;
  onClose?:  | "NOTHING" | "RELOAD";
  openAs?:  | "FULL_SIZE" | "OVERLAY";
  /**
   * The URL to open.
   */
  url?: string;
}

/**
 * Represents the platform specific uri/intent to open for each client.
 */
export interface AppsDynamiteStorageOpenLinkAppUri {
  /**
   * An intent object to be opened in the corresponding android hosting app.
   */
  androidIntent?: AppsDynamiteStorageOpenLinkAppUriIntent;
  /**
   * A companion uri string to be opened in the chat companion window. on the
   * web.
   */
  companionUri?: string;
  /**
   * A uri string to be opened in the corresponding iOS hosting app.
   */
  iosUri?: string;
}

/**
 * Android intent.
 */
export interface AppsDynamiteStorageOpenLinkAppUriIntent {
  /**
   * A list of extra data for the android intent. For example, for a calendar
   * event edit intent, the event title information can be passed as extra data.
   */
  extraData?: AppsDynamiteStorageOpenLinkAppUriIntentExtraData[];
  /**
   * An android intent action string for the {@link android.content.Intent}
   * object. For example: for the view intent action type, a valid value will be
   * android.content.Intent.ACTION_VIEW.
   */
  intentAction?: string;
}

/**
 * Extra data for an android intent. Valid keys are defined in the hosting app
 * contract.
 */
export interface AppsDynamiteStorageOpenLinkAppUriIntentExtraData {
  /**
   * A key for the intent extra data.
   */
  key?: string;
  /**
   * Value for the given extra data key.
   */
  value?: string;
}

/**
 * A widget that creates a UI item (for example, a drop-down list) with options
 * for users to select.
 */
export interface AppsDynamiteStorageSelectionInput {
  items?: AppsDynamiteStorageSelectionInputSelectionItem[];
  /**
   * The label displayed ahead of the switch control.
   */
  label?: string;
  /**
   * The name of the text input which is used in formInput.
   */
  name?: string;
  /**
   * If specified, the form is submitted when the selection changes. If not
   * specified, you must specify a separate button.
   */
  onChangeAction?: AppsDynamiteStorageAction;
  type?:  | "CHECK_BOX" | "RADIO_BUTTON" | "SWITCH" | "DROPDOWN" | "MULTI_SELECT";
}

/**
 * The item in the switch control. A radio button, at most one of the items is
 * selected.
 */
export interface AppsDynamiteStorageSelectionInputSelectionItem {
  /**
   * If more than one item is selected for `RADIO_BUTTON` and `DROPDOWN`, the
   * first selected item is treated as selected and the ones after are ignored.
   */
  selected?: boolean;
  /**
   * The text to be displayed.
   */
  text?: string;
  /**
   * The value associated with this item. The client should use this as a form
   * input value.
   */
  value?: string;
}

/**
 * A container wrapping elements necessary for showing suggestion items used in
 * text input autocomplete.
 */
export interface AppsDynamiteStorageSuggestions {
  /**
   * A list of suggestions items which will be used in are used in
   * autocomplete.
   */
  items?: AppsDynamiteStorageSuggestionsSuggestionItem[];
}

/**
 * A suggestion item. Only supports text for now.
 */
export interface AppsDynamiteStorageSuggestionsSuggestionItem {
  text?: string;
}

/**
 * A text input is a UI item where users can input text. A text input can also
 * have an onChange action and suggestions.
 */
export interface AppsDynamiteStorageTextInput {
  /**
   * The refresh function that returns suggestions based on the user's input
   * text. If the callback is not specified, autocomplete is done in client side
   * based on the initial suggestion items.
   */
  autoCompleteAction?: AppsDynamiteStorageAction;
  /**
   * The hint text.
   */
  hintText?: string;
  /**
   * The initial suggestions made before any user input.
   */
  initialSuggestions?: AppsDynamiteStorageSuggestions;
  /**
   * At least one of label and hintText must be specified.
   */
  label?: string;
  /**
   * The name of the text input which is used in formInput.
   */
  name?: string;
  /**
   * The onChange action, for example, invoke a function.
   */
  onChangeAction?: AppsDynamiteStorageAction;
  /**
   * The style of the text, for example, a single line or multiple lines.
   */
  type?:  | "SINGLE_LINE" | "MULTIPLE_LINE";
  /**
   * The default value when there is no input from the user.
   */
  value?: string;
}

/**
 * A paragraph of text that supports formatting. See [Text
 * formatting](workspace/add-ons/concepts/widgets#text_formatting") for details.
 */
export interface AppsDynamiteStorageTextParagraph {
  /**
   * The text that's shown in the widget.
   */
  text?: string;
}

/**
 * A widget is a UI element that presents texts, images, etc.
 */
export interface AppsDynamiteStorageWidget {
  /**
   * A list of buttons. For example, the following JSON creates two buttons.
   * The first is a filled text button and the second is an image button that
   * opens a link: ``` "buttonList": { "buttons": [ "button": { "text": "Edit",
   * "Color": { "Red": 255 "Green": 255 "Blue": 255 } "disabled": true },
   * "button": { "icon": { "knownIcon": "INVITE" "altText": "check calendar" },
   * "onClick": { "openLink": { "url": "https://example.com/calendar" } } }, ] }
   * ```
   */
  buttonList?: AppsDynamiteStorageButtonList;
  /**
   * Displays a single row of columns with widgets stacked vertically in each
   * column. For example, the following JSON creates a 2 column widget each
   * containing a single item. ``` "columns": { "wrapStyle": "WRAP",
   * "columnItems": [ { "horizontalSizeStyle": "FILL_AVAILABLE_SPACE",
   * "horizontalAlignment": "CENTER", "verticalAlignment" : "CENTER", "widgets":
   * [ { "textParagraph": { "text": "First column text paragraph", } } ] }, {
   * "horizontalSizeStyle": "FILL_AVAILABLE_SPACE", "horizontalAlignment":
   * "CENTER", "verticalAlignment" : "CENTER", "widgets": [ { "textParagraph": {
   * "text": "Second column text paragraph", } } ] }, ] } } ```
   */
  columns?: AppsDynamiteStorageColumns;
  /**
   * Displays a selection/input widget for date/time. For example, the
   * following JSON creates a date/time picker for an appointment time: ```
   * "date_time_picker": { "name": "appointment_time", "label": "Book your
   * appointment at:", "type": "DateTimePickerType.DATE_AND_TIME",
   * "valueMsEpoch": "796435200000" } ```
   */
  dateTimePicker?: AppsDynamiteStorageDateTimePicker;
  /**
   * Displays a decorated text item in this widget. For example, the following
   * JSON creates a decorated text widget showing email address: ```
   * "decoratedText": { "icon": { "knownIcon": "EMAIL" }, "topLabel": "Email
   * Address", "content": "heba.salam@example.com", "bottomLabel": "This is a
   * new Email address!", "switchWidget": { "name":
   * "has_send_welcome_email_to_heba_salam", "selected": false, "controlType":
   * "ControlType.CHECKBOX" } } ```
   */
  decoratedText?: AppsDynamiteStorageDecoratedText;
  /**
   * Displays a divider. For example, the following JSON creates a divider: ```
   * "divider": { } ```
   */
  divider?: AppsDynamiteStorageDivider;
  /**
   * Displays a grid with a collection of items. For example, the following
   * JSON creates a 2 column grid with a single item: ``` "grid": { "title": "A
   * fine collection of items", "numColumns": 2, "borderStyle": { "type":
   * "STROKE", "cornerRadius": 4.0 }, "items": [ "image": { "imageUri":
   * "https://www.example.com/image.png", "cropStyle": { "type": "SQUARE" },
   * "borderStyle": { "type": "STROKE" } }, "title": "An item", "textAlignment":
   * "CENTER" ], "onClick": { "openLink": { "url":"https://www.example.com" } }
   * } ```
   */
  grid?: AppsDynamiteStorageGrid;
  /**
   * The horizontal alignment of this widget.
   */
  horizontalAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "START" | "CENTER" | "END";
  /**
   * Displays an image in this widget. For example, the following JSON creates
   * an image with alternative text: ``` "image": { "imageUrl":
   * "https://example.com/heba_salam.png" "altText": "Avatar for Heba Salam" }
   * ```
   */
  image?: AppsDynamiteStorageImage;
  /**
   * Displays a switch control in this widget. For example, the following JSON
   * creates a dropdown selection for size: ``` "switchControl": { "name":
   * "size", "label": "Size" "type": "SelectionType.DROPDOWN", "items": [ {
   * "text": "S", "value": "small", "selected": false }, { "text": "M", "value":
   * "medium", "selected": true }, { "text": "L", "value": "large", "selected":
   * false }, { "text": "XL", "value": "extra_large", "selected": false } ] }
   * ```
   */
  selectionInput?: AppsDynamiteStorageSelectionInput;
  /**
   * Displays a text input in this widget. For example, the following JSON
   * creates a text input for mail address: ``` "textInput": { "name":
   * "mailing_address", "label": "Mailing Address" } ``` As another example, the
   * following JSON creates a text input for programming language with static
   * suggestions: ``` "textInput": { "name": "preferred_programing_language",
   * "label": "Preferred Language", "initialSuggestions": { "items": [ { "text":
   * "C++" }, { "text": "Java" }, { "text": "JavaScript" }, { "text": "Python" }
   * ] } } ```
   */
  textInput?: AppsDynamiteStorageTextInput;
  /**
   * Displays a text paragraph in this widget. For example, the following JSON
   * creates a bolded text: ``` "textParagraph": { "text": " *bold text*" } ```
   */
  textParagraph?: AppsDynamiteStorageTextParagraph;
}

function serializeAppsDynamiteStorageWidget(data: any): AppsDynamiteStorageWidget {
  return {
    ...data,
    columns: data["columns"] !== undefined ? serializeAppsDynamiteStorageColumns(data["columns"]) : undefined,
    dateTimePicker: data["dateTimePicker"] !== undefined ? serializeAppsDynamiteStorageDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

function deserializeAppsDynamiteStorageWidget(data: any): AppsDynamiteStorageWidget {
  return {
    ...data,
    columns: data["columns"] !== undefined ? deserializeAppsDynamiteStorageColumns(data["columns"]) : undefined,
    dateTimePicker: data["dateTimePicker"] !== undefined ? deserializeAppsDynamiteStorageDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

/**
 * Interactive objects inside a message. Documentation: -
 * https://api.slack.com/docs/message-buttons
 */
export interface AppsDynamiteV1ApiCompatV1Action {
  /**
   * Confirmation dialog config.
   */
  confirm?: AppsDynamiteV1ApiCompatV1ActionConfirm;
  /**
   * Unique identifier for this action.
   */
  name?: string;
  /**
   * Button style ("default", "primary", or "danger").
   */
  style?: string;
  /**
   * User-facing label for the action.
   */
  text?: string;
  /**
   * Action type - currently only "button".
   */
  type?: string;
  /**
   * Payload for this action. Will be sent to the action handler along with
   * name.
   */
  value?: string;
}

/**
 * Confirmation dialog config.
 */
export interface AppsDynamiteV1ApiCompatV1ActionConfirm {
  /**
   * "Cancel" button label.
   */
  dismiss_text?: string;
  /**
   * "OK" button label.
   */
  ok_text?: string;
  /**
   * Confirmation dialog body text.
   */
  text?: string;
  /**
   * Confirmation dialog title.
   */
  title?: string;
}

/**
 * Richly formatted attachments. Documentation: -
 * https://api.slack.com/docs/message-attachments
 */
export interface AppsDynamiteV1ApiCompatV1Attachment {
  /**
   * Array of actions (currently only buttons).
   */
  actions?: AppsDynamiteV1ApiCompatV1Action[];
  /**
   * Undocumented - used in interactive button examples. The only valid value
   * appears to be "default".
   */
  attachment_type?: string;
  /**
   * Avatar URL for the user.
   */
  author_icon?: string;
  /**
   * URL that the user name should link to.
   */
  author_link?: string;
  /**
   * User name to display as the author of the message.
   */
  author_name?: string;
  /**
   * Unique identifier for the collection of buttons within this attachment.
   * Will be sent back to the action handler URL when a button is clicked.
   */
  callback_id?: string;
  /**
   * A color "bar" to display to the left of the attachment.
   */
  color?: string;
  /**
   * Fallback plain-text string for clients that don't support attachments.
   */
  fallback?: string;
  /**
   * Columns of text inside the attachment body.
   */
  fields?: AppsDynamiteV1ApiCompatV1Field[];
  /**
   * A string displayed at the bottom of the attachment.
   */
  footer?: string;
  /**
   * Avatar URL displayed to the left of the footer.
   */
  footer_icon?: string;
  /**
   * URL of an image to display in an image chip.
   */
  image_url?: string;
  /**
   * List of fields to apply formatting to.
   */
  mrkdwn_in?: string[];
  /**
   * A string to show above the attachment.
   */
  pretext?: string;
  /**
   * Main text.
   */
  text?: string;
  /**
   * URL of a thumbnail image to display to the right of the attachment body.
   */
  thumb_url?: string;
  /**
   * Title string of this attachment.
   */
  title?: string;
  /**
   * URL that the title string should link to.
   */
  title_link?: string;
  /**
   * UNIX timestamp of the attachment.
   */
  ts?: number;
}

/**
 * A column of text in an attachment. Documentation: -
 * https://api.slack.com/docs/message-attachments
 */
export interface AppsDynamiteV1ApiCompatV1Field {
  /**
   * Whether the field can be shown side-by-side with another field.
   */
  short?: boolean;
  /**
   * The heading text, shown in bold.
   */
  title?: string;
  /**
   * The text value of the field.
   */
  value?: string;
}

export interface AppsExtensionsMarkupCalendarClientActionMarkupAddAttachmentsActionMarkup {
  addonAttachments?: AppsExtensionsMarkupCalendarClientActionMarkupAddAttachmentsActionMarkupAddonAttachment[];
}

export interface AppsExtensionsMarkupCalendarClientActionMarkupAddAttachmentsActionMarkupAddonAttachment {
  /**
   * Link to the resource's icon.
   */
  iconUrl?: string;
  /**
   * MIME type of the content in resource_url.
   */
  mimeType?: string;
  resourceUrl?: string;
  /**
   * Title of the attachment.
   */
  title?: string;
}

/**
 * Markup that defines conference data associated to a Google Calendar event.
 */
export interface AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkup {
  /**
   * Unique identifier for this conference data. Maximum 512 characters long.
   */
  conferenceId?: string;
  /**
   * An identifier of the conferencing solution. Must match a value from the
   * deployment's `calendar.conferenceSolution.id` field.
   */
  conferenceSolutionId?: string;
  /**
   * Entry points to the conference. Maximum 300 entry points are allowed.
   */
  entryPoints?: AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupEntryPointMarkup[];
  /**
   * If set, it means an error occurred during conference creation.
   */
  error?: AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupError;
  /**
   * Additional notes (such as instructions from the administrator, legal
   * notices) to display to the user. Can contain HTML. Max length 2048
   * characters.
   */
  note?: string;
  /**
   * Additional add-on parameters. Maximum 300 parameters are allowed.
   */
  parameters?: AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupParameter[];
}

/**
 * A way to join the conference.
 */
export interface AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupEntryPointMarkup {
  /**
   * An access code for accessing the conference. Maximum 128 characters long.
   */
  accessCode?: string;
  /**
   * Features of the entry point, such as being toll or toll-free. One entry
   * point can have multiple features.
   */
  features?:  | "UNKNOWN_FEATURE" | "TOLL" | "TOLL_FREE"[];
  /**
   * The label of the entry point to display to the user. Maximum 512
   * characters long.
   */
  label?: string;
  /**
   * A meeting code for accessing the conference. Maximum 128 characters long.
   */
  meetingCode?: string;
  /**
   * A passcode for accessing the conference. Maximum 128 characters long.
   */
  passcode?: string;
  /**
   * A password for accessing the conference. Maximum 128 characters long.
   */
  password?: string;
  /**
   * A PIN for accessing the conference. Maximum 128 characters long.
   */
  pin?: string;
  /**
   * The CLDR/ISO 3166 region code for the country associated with this entry
   * point. Applicable only to `Type.PHONE`.
   */
  regionCode?: string;
  /**
   * The type of the entry point. Required.
   */
  type?:  | "UNKNOWN" | "VIDEO" | "PHONE" | "MORE" | "SIP";
  /**
   * A URI for joining the conference. Supports tel: and http(s): and should be
   * at most 1300 characters long. Required.
   */
  uri?: string;
}

/**
 * Represents an error that occurred during conference creation.
 */
export interface AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupError {
  /**
   * If the error type is `AUTHENTICATION`, the add-on can provide a URL
   * allowing users to log in. Maximum 1300 characters long.
   */
  authenticationUrl?: string;
  /**
   * The type of error. Required.
   */
  type?:  | "UNKNOWN" | "AUTHENTICATION" | "TEMPORARY" | "PERMANENT" | "PERMISSION_DENIED" | "CONFERENCE_SOLUTION_FORBIDDEN";
}

/**
 * Solution-specific parameters that are persisted with the event data and, if
 * an update or delete is needed, are passed to the add-on. For example: `[{key:
 * 'sessionKey', value: '123'}, {key: 'meetingId', value: '456'}]`
 */
export interface AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkupParameter {
  /**
   * The key of the parameter. Maximum 50 characters long. Required.
   */
  key?: string;
  /**
   * The value of the parameter. Maximum 1024 characters long. Required.
   */
  value?: string;
}

export interface AppsExtensionsMarkupCalendarClientActionMarkupEditAttendeesActionMarkup {
  /**
   * A list of attendees to add to the Google Calendar event.
   */
  addAttendeeEmails?: string[];
}

export interface AppsExtensionsMarkupCalendarClientActionMarkupEditConferenceDataActionMarkup {
  /**
   * The conference data to add to the Google Calendar event.
   */
  conferenceData?: AppsExtensionsMarkupCalendarClientActionMarkupConferenceDataMarkup;
}

/**
 * Attachments that follow the message text.
 */
export interface Attachment {
  /**
   * Revised version of Gmail AddOn attachment approved by API design review.
   */
  addOnData?: GoogleChatV1ContextualAddOnMarkup;
  /**
   * The userId for the bot/app that created this data, to be used for
   * attribution of attachments when the attachment was not created by the
   * message sender.
   */
  appId?: UserId;
  /**
   * To identify an attachment within repeated in a message
   */
  attachmentId?: string;
  /**
   * Card AddOn attachment with the possibility for specifying editable
   * widgets.
   */
  cardAddOnData?: AppsDynamiteStorageCard;
  /**
   * Deprecated version of Gmail AddOn attachment.
   */
  deprecatedAddOnData?: ContextualAddOnMarkup;
  /**
   * Slack attachment.
   */
  slackData?: AppsDynamiteV1ApiCompatV1Attachment;
  /**
   * The height of image url as fetched by fife. This field is asynchronously
   * filled.
   */
  slackDataImageUrlHeight?: number;
}

function serializeAttachment(data: any): Attachment {
  return {
    ...data,
    appId: data["appId"] !== undefined ? serializeUserId(data["appId"]) : undefined,
    cardAddOnData: data["cardAddOnData"] !== undefined ? serializeAppsDynamiteStorageCard(data["cardAddOnData"]) : undefined,
    deprecatedAddOnData: data["deprecatedAddOnData"] !== undefined ? serializeContextualAddOnMarkup(data["deprecatedAddOnData"]) : undefined,
  };
}

function deserializeAttachment(data: any): Attachment {
  return {
    ...data,
    appId: data["appId"] !== undefined ? deserializeUserId(data["appId"]) : undefined,
    cardAddOnData: data["cardAddOnData"] !== undefined ? deserializeAppsDynamiteStorageCard(data["cardAddOnData"]) : undefined,
    deprecatedAddOnData: data["deprecatedAddOnData"] !== undefined ? deserializeContextualAddOnMarkup(data["deprecatedAddOnData"]) : undefined,
  };
}

/**
 * An Attribute is a piece of data attached an Item. Attributes are opaque to
 * the Starbox and have no effect on, nor are they effected by, message storage,
 * indexing, or search.
 */
export interface Attribute {
  /**
   * The name of the attribute. Required - If a write is attempted with an
   * empty string, the server will return an error.
   */
  name?: string;
  value?: CaribouAttributeValue;
}

function serializeAttribute(data: any): Attribute {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeCaribouAttributeValue(data["value"]) : undefined,
  };
}

function deserializeAttribute(data: any): Attribute {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeCaribouAttributeValue(data["value"]) : undefined,
  };
}

/**
 * An attribute was deleted from some (subset of the) messages in this thread.
 */
export interface AttributeRemoved {
  attributeId?: string;
  messageKeys?: MultiKey[];
}

function serializeAttributeRemoved(data: any): AttributeRemoved {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
  };
}

function deserializeAttributeRemoved(data: any): AttributeRemoved {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
  };
}

export interface Attributes {
  attribute?: Attribute[];
}

function serializeAttributes(data: any): Attributes {
  return {
    ...data,
    attribute: data["attribute"] !== undefined ? data["attribute"].map((item: any) => (serializeAttribute(item))) : undefined,
  };
}

function deserializeAttributes(data: any): Attributes {
  return {
    ...data,
    attribute: data["attribute"] !== undefined ? data["attribute"].map((item: any) => (deserializeAttribute(item))) : undefined,
  };
}

/**
 * An attribute was added to some (subset of the) messages in this thread.
 */
export interface AttributeSet {
  attributeId?: string;
  /**
   * The serialized attribute_value as persisted in the storage layer. The
   * application is responsible for deserializing it to an Attribute.Value if
   * appropriate.
   */
  attributeValue?: Uint8Array;
  messageKeys?: MultiKey[];
}

function serializeAttributeSet(data: any): AttributeSet {
  return {
    ...data,
    attributeValue: data["attributeValue"] !== undefined ? encodeBase64(data["attributeValue"]) : undefined,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
  };
}

function deserializeAttributeSet(data: any): AttributeSet {
  return {
    ...data,
    attributeValue: data["attributeValue"] !== undefined ? decodeBase64(data["attributeValue"] as string) : undefined,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
  };
}

/**
 * Represents the settings for Cloud audit logging
 */
export interface AuditLoggingSettings {
  /**
   * Indicates whether audit logging is on/off for admin activity read APIs
   * i.e. Get/List DataSources, Get/List SearchApplications etc.
   */
  logAdminReadActions?: boolean;
  /**
   * Indicates whether audit logging is on/off for data access read APIs i.e.
   * ListItems, GetItem etc.
   */
  logDataReadActions?: boolean;
  /**
   * Indicates whether audit logging is on/off for data access write APIs i.e.
   * IndexItem etc.
   */
  logDataWriteActions?: boolean;
  /**
   * The resource name of the GCP Project to store audit logs. Cloud audit
   * logging will be enabled after project_name has been updated through
   * CustomerService. Format: projects/{project_id}
   */
  project?: string;
}

/**
 * A combination of an identifier for a Drive resource (e.g. file, folder, or
 * drive) and any secrets needed to access it. The secrets should never be
 * logged, and this proto annotates those secret fields to ensure that they are
 * not. Clients are encouraged to use this proto rather than defining their own,
 * to ensure that secrets are correctly annotated.
 */
export interface AuthorizedItemId {
  /**
   * Serialized ID of the Drive resource
   */
  id?: string;
  /**
   * Resource key of the Drive item. This field should be unset if, depending
   * on the context, the item does not have a resource key, or if none was
   * specified. This must never be logged.
   */
  resourceKey?: string;
}

export interface AutoComplete {
  items?: AutoCompleteItem[];
}

export interface AutoCompleteItem {
  text?: string;
}

/**
 * Container for Babel (Hangouts Classic) only message properties. The
 * properties here will not be consumed by Dynamite clients. They are relevant
 * only for Hangouts Classic.
 */
export interface BabelMessageProps {
  /**
   * Babel clients locally generate this ID to dedupe against the async fanout.
   */
  clientGeneratedId?: bigint;
  /**
   * Stores additional Babel-specific properties (such as event metadata).
   */
  contentExtension?: ChatContentExtension;
  /**
   * Stores the delivery source of messages (such as phone number for SMS).
   */
  deliveryMedium?: DeliveryMedium;
  /**
   * Primary identifier used by Hangouts Classic for its events (messages).
   */
  eventId?: string;
  /**
   * Stores message segments (text content) and attachments (media URLs).
   */
  messageContent?: ChatConserverMessageContent;
  /**
   * Whether or not these message properties were backfilled by go/dinnertrain.
   */
  wasUpdatedByBackfill?: boolean;
}

function serializeBabelMessageProps(data: any): BabelMessageProps {
  return {
    ...data,
    clientGeneratedId: data["clientGeneratedId"] !== undefined ? String(data["clientGeneratedId"]) : undefined,
    contentExtension: data["contentExtension"] !== undefined ? serializeChatContentExtension(data["contentExtension"]) : undefined,
    messageContent: data["messageContent"] !== undefined ? serializeChatConserverMessageContent(data["messageContent"]) : undefined,
  };
}

function deserializeBabelMessageProps(data: any): BabelMessageProps {
  return {
    ...data,
    clientGeneratedId: data["clientGeneratedId"] !== undefined ? BigInt(data["clientGeneratedId"]) : undefined,
    contentExtension: data["contentExtension"] !== undefined ? deserializeChatContentExtension(data["contentExtension"]) : undefined,
    messageContent: data["messageContent"] !== undefined ? deserializeChatConserverMessageContent(data["messageContent"]) : undefined,
  };
}

/**
 * Annotation metadata for Babel-only items that signals which type of
 * placeholder message should be displayed in Babel clients.
 */
export interface BabelPlaceholderMetadata {
  deleteMetadata?: DeleteMetadata;
  editMetadata?: EditMetadata;
  hangoutVideoMetadata?: HangoutVideoEventMetadata;
}

/**
 * Used to provide a search operator for boolean properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched.
 */
export interface BooleanOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * boolean property. For example, if operatorName is *closed* and the
   * property's name is *isClosed*, then queries like *closed:<value>* show
   * results only where the value of the property named *isClosed* matches
   * *<value>*. By contrast, a search that uses the same *<value>* without an
   * operator returns all items where *<value>* matches the value of any String
   * properties or text within the content field for the item. The operator name
   * can only contain lowercase letters (a-z). The maximum length is 32
   * characters.
   */
  operatorName?: string;
}

/**
 * The options for boolean properties.
 */
export interface BooleanPropertyOptions {
  /**
   * If set, describes how the boolean should be used as a search operator.
   */
  operatorOptions?: BooleanOperatorOptions;
}

/**
 * Represents a complete border style that can be applied to widgets.
 */
export interface BorderStyle {
  /**
   * The corner radius for the border.
   */
  cornerRadius?: number;
  /**
   * The colors to use when the type is STROKE.
   */
  strokeColor?: string;
  /**
   * The border type.
   */
  type?:  | "BORDER_TYPE_NOT_SET" | "NO_BORDER" | "STROKE";
}

/**
 * Bot-specific profile information.
 */
export interface BotInfo {
  appAllowlistStatus?:  | "UNSPECIFIED_STATUS" | "ALLOWED" | "ALL_APPS_DISABLED_BY_ADMIN" | "APP_NOT_ALLOWLISTED_BY_ADMIN";
  /**
   * Identifier of the application associated with the bot.
   */
  appId?: AppId;
  /**
   * URL for the avatar picture of the User in dynamite. This field should be
   * populated if the request is FetchBotCategories/ListBotCatalogEntries
   */
  botAvatarUrl?: string;
  /**
   * Non-unique, user-defined display name of the Bot. This field should be
   * populated if the request is FetchBotCategories/ListBotCatalogEntries.
   */
  botName?: string;
  /**
   * Short description for the bot.
   */
  description?: string;
  /**
   * Name of bot developer.
   */
  developerName?: string;
  /**
   * URL for the banner image in GSuite Market Place. The banner will be
   * 220x140.
   */
  marketPlaceBannerUrl?: string;
  /**
   * Indicates whether bot is enabled/disabled.
   */
  status?:  | "UNKNOWN_STATUS" | "ENABLED" | "DISABLED_BY_DEVELOPER";
  /**
   * The supported uses are limited according to the user that made the
   * request. If the user does not have permission to use the bot, the list will
   * be empty. This could occur for non whitelisted bots in the catalog.
   */
  supportedUses?:  | "UNKNOWN" | "CAN_ADD_TO_DM" | "CAN_ADD_TO_ROOM" | "CAN_ADD_TO_HUMAN_DM"[];
  /**
   * If the app supports a home screen.
   */
  supportHomeScreen?: boolean;
  /**
   * Urls with additional information related to the bot. This field should
   * always be set even if all the fields within it are empty, so that it is
   * convenient for clients to work with this field in javascript.
   */
  supportUrls?: SupportUrls;
}

function serializeBotInfo(data: any): BotInfo {
  return {
    ...data,
    appId: data["appId"] !== undefined ? serializeAppId(data["appId"]) : undefined,
  };
}

function deserializeBotInfo(data: any): BotInfo {
  return {
    ...data,
    appId: data["appId"] !== undefined ? deserializeAppId(data["appId"]) : undefined,
  };
}

/**
 * Information about a bot response, branched from shared/bot_response.proto
 * without frontend User proto as we never store it.
 */
export interface BotResponse {
  botId?: UserId;
  requiredAction?:  | "UNKNOWN_SETUP_TYPE" | "CONFIGURATION" | "AUTHENTICATION";
  responseType?:  | "UNKNOWN_RESPONSE_TYPE" | "ERROR" | "SETUP_REQUIRED" | "DISABLED_BY_ADMIN" | "DISABLED_BY_DEVELOPER" | "PRIVATE" | "APP_SUGGESTION";
  /**
   * URL for setting up bot.
   */
  setupUrl?: string;
}

function serializeBotResponse(data: any): BotResponse {
  return {
    ...data,
    botId: data["botId"] !== undefined ? serializeUserId(data["botId"]) : undefined,
  };
}

function deserializeBotResponse(data: any): BotResponse {
  return {
    ...data,
    botId: data["botId"] !== undefined ? deserializeUserId(data["botId"]) : undefined,
  };
}

/**
 * Broadcast access information of a meeting space.
 */
export interface BroadcastAccess {
  /**
   * The policy that controls the broadcast's viewer access.
   */
  accessPolicy?:  | "BROADCASTING_ACCESS_POLICY_UNSPECIFIED" | "ORGANIZATION" | "PUBLIC";
  /**
   * A URL that can be used to access the broadcast of the meeting. This field
   * will be empty if broadcast is not enabled. It will be populated by the
   * backend. Clients cannot modify the value.
   */
  viewUrl?: string;
}

/**
 * Information about a broadcast session.
 */
export interface BroadcastSessionInfo {
  /**
   * A unique server-generated ID for the broadcast session.
   */
  broadcastSessionId?: string;
  /**
   * Output only. Current broadcast session's statistics.
   */
  readonly broadcastStats?: BroadcastStats;
  /**
   * Input only. Deprecated field, should not be used.
   */
  ingestionId?: string;
  /**
   * Broadcast session's state information.
   */
  sessionStateInfo?: SessionStateInfo;
}

/**
 * Statistics of the broadcast session.
 */
export interface BroadcastStats {
  /**
   * Estimated concurrent viewer count.
   */
  estimatedViewerCount?: bigint;
}

function serializeBroadcastStats(data: any): BroadcastStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? String(data["estimatedViewerCount"]) : undefined,
  };
}

function deserializeBroadcastStats(data: any): BroadcastStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? BigInt(data["estimatedViewerCount"]) : undefined,
  };
}

export interface Button {
  imageButton?: ImageButton;
  textButton?: TextButton;
}

export interface CalendarClientActionMarkup {
  /**
   * An action that adds attachments to the Google Calendar event.
   */
  addAttachmentsActionMarkup?: AppsExtensionsMarkupCalendarClientActionMarkupAddAttachmentsActionMarkup;
  /**
   * An action that adds attendees to the Google Calendar event.
   */
  editAttendeesActionMarkup?: AppsExtensionsMarkupCalendarClientActionMarkupEditAttendeesActionMarkup;
  /**
   * An action that adds conference data to the Google Calendar event.
   */
  editConferenceDataActionMarkup?: AppsExtensionsMarkupCalendarClientActionMarkupEditConferenceDataActionMarkup;
}

/**
 * Contains information regarding an ongoing conference (aka call) for a
 * meeting space.
 */
export interface CallInfo {
  /**
   * Abuse reporting configuration for the ongoing conference.
   */
  abuseReportingConfig?: AbuseReportingConfig;
  /**
   * Output only. Display name of the owner of artifacts generated in this
   * conference. The expected use of this in clients is to present info like
   * "This recording will be sent to John Doe's Drive". This field can be empty
   * if preferred display name determination fails for any reason.
   */
  readonly artifactOwner?: UserDisplayInfo;
  /**
   * Output only. Documents attached to an ongoing conference.
   */
  readonly attachedDocuments?: DocumentInfo[];
  /**
   * List of available access types of the conference.
   */
  availableAccessTypes?:  | "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_OPEN" | "ACCESS_TYPE_TRUSTED" | "ACCESS_TYPE_RESTRICTED" | "ACCESS_TYPE_CLOSED"[];
  /**
   * Output only. The set of reactions that clients are allowed to send and can
   * expect to receive. Note that a device in the conference should have the
   * MAY_SEND_REACTIONS privilege to be able to send reactions.
   */
  readonly availableReactions?: ReactionInfo[];
  /**
   * Information about active broadcast session in the ongoing conference.
   */
  broadcastSessionInfo?: BroadcastSessionInfo;
  /**
   * Output only. The calendar event ID of a Google Calendar event that the
   * meeting space is associated with. If the meeting space is not associated
   * with an event in Google Calendar, this field is empty. For recurring
   * events, it refers to the recurring instance associated with the current
   * call, as determined by the server.
   */
  readonly calendarEventId?: string;
  /**
   * The current co-activity session, or unset if there is none in progress. A
   * co-activity session can be initiated by devices in JOINED state . Initiator
   * of the co-activity is expected to populate this field to start the session.
   * Once clients detect that the co-activity has finished, any JOINED device
   * can clear this field to end the co-activity session. In the case of
   * switching activities, the initiator of the new activity merely needs to
   * override this with the new co-activity data, and all connected clients are
   * expected to handle the transition gracefully.
   */
  coActivity?: CoActivity;
  /**
   * The current collaboration session, or unset if no collaboration is in
   * progress.
   */
  collaboration?: Collaboration;
  /**
   * CSE information for the ongoing conference.
   */
  cseInfo?: CseInfo;
  /**
   * Output only. The maximum number of devices that may be in the joined state
   * simultaneously in this conference. This can be used by clients to guess
   * whether it will be possible to join, but the only way to know is to try to
   * join. It can also be used to inform users about the limit that is in
   * effect. This limit is normally set when the conference is created and not
   * changed during the lifetime of the conference. But there are some cases
   * where it may change, so clients should be aware that the information may be
   * stale.
   */
  readonly maxJoinedDevices?: number;
  /**
   * Output only. The name or description of the organization or domain that
   * the organizer belongs to. The expected use of this in clients is to present
   * messages like "John Doe (outside of Google.com) is trying to join this
   * call", where "Google.com" is the organization name. The field will be empty
   * if the organization name could not be determined, possibly because of a
   * backend error.
   */
  readonly organizationName?: string;
  /**
   * Paygate information to clients.
   */
  paygateInfo?: PaygateInfo;
  /**
   * The current presenter in the call, or unset if there is no current
   * presenter. Clients can set this to change the presenter.
   */
  presenter?: Presenter;
  /**
   * Deprecated, use RecordingSessionInfo instead. Info about recording for
   * this conference. This will always be set in server responses, with a valid
   * recording status. This is superseded by streaming_sessions field, which
   * contains the same information about this recording as well as additional
   * information about other application type at the same time. This will be
   * deprecated and removed at some point.
   */
  recordingInfo?: RecordingInfo;
  /**
   * Information about active recording session in the ongoing conference.
   */
  recordingSessionInfo?: RecordingSessionInfo;
  /**
   * Settings of the ongoing conference.
   */
  settings?: CallSettings;
  /**
   * Output only. Info about streaming sessions (recording or broadcast) for
   * this conference. This should contain all active sessions. Currently, it's
   * guaranteed to have at most one recording and at most one broadcast (at most
   * two sessions in total). For each application type (recording or broadcast),
   * latest inactive session is included if there's no active one.
   */
  readonly streamingSessions?: StreamingSessionInfo[];
  /**
   * Information about active transcription session in the ongoing conference.
   */
  transcriptionSessionInfo?: TranscriptionSessionInfo;
  /**
   * The number of devices viewing the conference - MeetingDevices that are in
   * VIEWER role and JOINED state in the conference.
   */
  viewerCount?: number;
  /**
   * Information about active YouTube broadcast sessions in the ongoing
   * conference.
   */
  youTubeBroadcastSessionInfos?: YouTubeBroadcastSessionInfo[];
}

function serializeCallInfo(data: any): CallInfo {
  return {
    ...data,
    cseInfo: data["cseInfo"] !== undefined ? serializeCseInfo(data["cseInfo"]) : undefined,
    paygateInfo: data["paygateInfo"] !== undefined ? serializePaygateInfo(data["paygateInfo"]) : undefined,
    youTubeBroadcastSessionInfos: data["youTubeBroadcastSessionInfos"] !== undefined ? data["youTubeBroadcastSessionInfos"].map((item: any) => (serializeYouTubeBroadcastSessionInfo(item))) : undefined,
  };
}

function deserializeCallInfo(data: any): CallInfo {
  return {
    ...data,
    cseInfo: data["cseInfo"] !== undefined ? deserializeCseInfo(data["cseInfo"]) : undefined,
    paygateInfo: data["paygateInfo"] !== undefined ? deserializePaygateInfo(data["paygateInfo"]) : undefined,
    streamingSessions: data["streamingSessions"] !== undefined ? data["streamingSessions"].map((item: any) => (deserializeStreamingSessionInfo(item))) : undefined,
    youTubeBroadcastSessionInfos: data["youTubeBroadcastSessionInfos"] !== undefined ? data["youTubeBroadcastSessionInfos"].map((item: any) => (deserializeYouTubeBroadcastSessionInfo(item))) : undefined,
  };
}

/**
 * Effective settings of the ongoing conference.
 */
export interface CallSettings {
  /**
   * Indicates whether the access lock is currently on or off.
   */
  accessLock?: boolean;
  /**
   * The current access type of the conference.
   */
  accessType?:  | "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_OPEN" | "ACCESS_TYPE_TRUSTED" | "ACCESS_TYPE_RESTRICTED" | "ACCESS_TYPE_CLOSED";
  /**
   * Whether users can join this conference before a host (Host or Cohost).
   */
  allowJoiningBeforeHost?: boolean;
  /**
   * Indicates whether the attendance report is currently enabled or disabled.
   */
  attendanceReportEnabled?: boolean;
  /**
   * Indicates whether the audio lock is currently on or off.
   */
  audioLock?: boolean;
  /**
   * Indicates whether the chat lock is currently on or off.
   */
  chatLock?: boolean;
  /**
   * Whether Client-side Encryption is enabled for this conference.
   */
  cseEnabled?: boolean;
  /**
   * Indicates whether moderation is currently on or off.
   */
  moderationEnabled?: boolean;
  /**
   * Indicates whether the present lock is currently on or off.
   */
  presentLock?: boolean;
  /**
   * Indicates whether the reactions lock is currently on or off.
   */
  reactionsLock?: boolean;
  /**
   * Indicates whether the video lock is currently on or off.
   */
  videoLock?: boolean;
}

/**
 * Represents a principal which possesses a particular secret string whose
 * cryptographic hash is specified here. CapTokens ("Capability Tokens") are
 * used in ACLProto. It's expected that ACLs with CapTokenHolders will strongly
 * enforce them by Keystore-wrapping crypto keys for the corresponding
 * CapTokens.
 */
export interface CapTokenHolderProto {
  /**
   * The hash of the corresponding capability token. The value is defined to be
   * identical to the one in acl.proto's CapTokenMetadata: 10-byte prefix of
   * HMAC-SHA1 of the token. The HMAC key is the following fixed (non-secret)
   * 512-bit value: 79b1c8f4 82baf523 b8a9ab4a e960f438 c45be041 11f1f222
   * e8a3f64d aeb05e3d c3576acc ec649194 aede422c 4e48e0d1 ff21234a a6ed6b49
   * a7fa592e efd7bba3
   */
  tokenHmacSha1Prefix?: Uint8Array;
}

function serializeCapTokenHolderProto(data: any): CapTokenHolderProto {
  return {
    ...data,
    tokenHmacSha1Prefix: data["tokenHmacSha1Prefix"] !== undefined ? encodeBase64(data["tokenHmacSha1Prefix"]) : undefined,
  };
}

function deserializeCapTokenHolderProto(data: any): CapTokenHolderProto {
  return {
    ...data,
    tokenHmacSha1Prefix: data["tokenHmacSha1Prefix"] !== undefined ? decodeBase64(data["tokenHmacSha1Prefix"] as string) : undefined,
  };
}

export interface Card {
  cardActions?: CardAction[];
  displayStyle?:  | "DISPLAY_STYLE_UNSPECIFIED" | "PEEK" | "REPLACE";
  fixedFooter?: FixedFooter;
  header?: CardHeader;
  /**
   * Name of the card used in CardNavigation.pop_to_card_name.
   */
  name?: string;
  /**
   * When displaying contextual content, the peek card header acts as a
   * placeholder so that the user can navigate forward between the homepage
   * cards and the contextual cards.
   */
  peekCardHeader?: CardHeader;
  sections?: Section[];
}

function serializeCard(data: any): Card {
  return {
    ...data,
    sections: data["sections"] !== undefined ? data["sections"].map((item: any) => (serializeSection(item))) : undefined,
  };
}

function deserializeCard(data: any): Card {
  return {
    ...data,
    sections: data["sections"] !== undefined ? data["sections"].map((item: any) => (deserializeSection(item))) : undefined,
  };
}

/**
 * When an AddOn Card is shown in detailed view, a card action is the action
 * associated with the card. For an invoice card, a typical action would be:
 * delete invoice, email invoice or open the invoice in browser.
 */
export interface CardAction {
  /**
   * The label used to be displayed in the action menu item.
   */
  actionLabel?: string;
  onClick?: OnClick;
}

export interface CardCapabilityMetadata {
  /**
   * NEXT TAG : 2
   */
  requiredCapabilities?:  | "UNKNOWN" | "SUPPORTS_BASE_CARDS"[];
}

export interface CardHeader {
  /**
   * The alternative text of this image which will be used for accessibility.
   */
  imageAltText?: string;
  imageStyle?:  | "CROP_TYPE_NOT_SET" | "SQUARE" | "CIRCLE" | "RECTANGLE_CUSTOM" | "RECTANGLE_4_3";
  imageUrl?: string;
  subtitle?: string;
  /**
   * The title must be specified. The header has a fixed height: if both a
   * title and subtitle is specified, each will take up 1 line. If only the
   * title is specified, it will take up both lines. The header is rendered in
   * collapsed and detailed view.
   */
  title?: string;
}

export interface CaribouAttributeValue {
  /**
   * Tags 1 through 15 are reserved for the most commonly used fields.
   */
  booleanValue?: boolean;
  intValue?: number;
  longValue?: bigint;
  /**
   * Generally, applications should avoid storing raw bytes and instead store
   * structured data as protocol buffer extensions. This both reduces the amount
   * of ad-hoc attribute parsing code as well as eliminates an intermediate copy
   * of the data when deserializing the value. The rawByteValue field is mainly
   * provided for compatibility with attributes stored before the introduction
   * of the Attribute.Value.
   */
  rawByteValue?: Uint8Array;
  stringValue?: string;
}

function serializeCaribouAttributeValue(data: any): CaribouAttributeValue {
  return {
    ...data,
    longValue: data["longValue"] !== undefined ? String(data["longValue"]) : undefined,
    rawByteValue: data["rawByteValue"] !== undefined ? encodeBase64(data["rawByteValue"]) : undefined,
  };
}

function deserializeCaribouAttributeValue(data: any): CaribouAttributeValue {
  return {
    ...data,
    longValue: data["longValue"] !== undefined ? BigInt(data["longValue"]) : undefined,
    rawByteValue: data["rawByteValue"] !== undefined ? decodeBase64(data["rawByteValue"] as string) : undefined,
  };
}

/**
 * Actions handled by Chat Clients.
 */
export interface ChatClientActionMarkup {
}

/**
 * Metadata used as inputs to the localization that is performed on
 * Dynamite-originated messages that are incompatible with Hangouts clients. See
 * go/localization-of-system-messages for more details.
 */
export interface ChatConserverDynamitePlaceholderMetadata {
  attachmentMetadata?: ChatConserverDynamitePlaceholderMetadataAttachmentMetadata;
  botMessageMetadata?: ChatConserverDynamitePlaceholderMetadataBotMessageMetadata;
  calendarEventMetadata?: ChatConserverDynamitePlaceholderMetadataCalendarEventMetadata;
  deleteMetadata?: ChatConserverDynamitePlaceholderMetadataDeleteMetadata;
  editMetadata?: ChatConserverDynamitePlaceholderMetadataEditMetadata;
  /**
   * The space URL embedded in the localized string.
   */
  spaceUrl?: string;
  tasksMetadata?: ChatConserverDynamitePlaceholderMetadataTasksMetadata;
  videoCallMetadata?: ChatConserverDynamitePlaceholderMetadataVideoCallMetadata;
}

/**
 * An attachment uploaded in Dynamite and its filename.
 */
export interface ChatConserverDynamitePlaceholderMetadataAttachmentMetadata {
  filename?: string;
}

/**
 * A bot sent a message in Dynamite.
 */
export interface ChatConserverDynamitePlaceholderMetadataBotMessageMetadata {
}

/**
 * A Calendar event message in Dynamite.
 */
export interface ChatConserverDynamitePlaceholderMetadataCalendarEventMetadata {
}

/**
 * A message was deleted in Dynamite.
 */
export interface ChatConserverDynamitePlaceholderMetadataDeleteMetadata {
}

/**
 * An edit was made in Dynamite.
 */
export interface ChatConserverDynamitePlaceholderMetadataEditMetadata {
}

/**
 * A Tasks message in Dynamite.
 */
export interface ChatConserverDynamitePlaceholderMetadataTasksMetadata {
}

/**
 * A Meet initiated in Dynamite and its URL.
 */
export interface ChatConserverDynamitePlaceholderMetadataVideoCallMetadata {
  meetingUrl?: string;
}

/**
 * The content of a chat message, which includes 0 or more segments along with
 * 0 or more embeds, which represent various attachment types (like photos).
 */
export interface ChatConserverMessageContent {
  /**
   * Items attached to this message, such as photos. This should *NOT* be set
   * by clients. It will be automatically set from media uploaded along with
   * this request and using the information provided in existing_media.
   */
  attachment?: SocialCommonAttachmentAttachment[];
  /**
   * The text part of the message content. Segments are concatenated together
   * to yield the full message. A message can have zero or more segments.
   */
  segment?: Segment[];
}

function serializeChatConserverMessageContent(data: any): ChatConserverMessageContent {
  return {
    ...data,
    attachment: data["attachment"] !== undefined ? data["attachment"].map((item: any) => (serializeSocialCommonAttachmentAttachment(item))) : undefined,
    segment: data["segment"] !== undefined ? data["segment"].map((item: any) => (serializeSegment(item))) : undefined,
  };
}

function deserializeChatConserverMessageContent(data: any): ChatConserverMessageContent {
  return {
    ...data,
    attachment: data["attachment"] !== undefined ? data["attachment"].map((item: any) => (deserializeSocialCommonAttachmentAttachment(item))) : undefined,
    segment: data["segment"] !== undefined ? data["segment"].map((item: any) => (deserializeSegment(item))) : undefined,
  };
}

/**
 * NEXT ID: 12
 */
export interface ChatContentExtension {
  /**
   * Annotations to decorate this event.
   */
  annotation?: EventAnnotation[];
  /**
   * This metadata informs how the placeholder string will be localized
   * dynamically in Hangouts. See go/localization-of-system-messages. This is
   * only used as part of REGULAR_CHAT_MESSAGE events.
   */
  dynamitePlaceholderMetadata?: ChatConserverDynamitePlaceholderMetadata;
  /**
   * Is this event OnTR or OffTR? Since some events can be ON_THE_RECORD and
   * have an expiration_timestamp (for example enterprise retention users) we
   * need to store the otr status.
   */
  eventOtrStatus?:  | "OFF_THE_RECORD" | "ON_THE_RECORD";
  /**
   * Group-link sharing toggle event.
   */
  groupLinkSharingModificationEvent?: GroupLinkSharingModificationEvent;
  /**
   * Audio/video Hangout event.
   */
  hangoutEvent?: HangoutEvent;
  /**
   * Invite accepted events. Note: this is only used ephemerally to sync to
   * Gmail. No actual cent is stored in Papyrus.
   */
  inviteAcceptedEvent?: InviteAcceptedEvent;
  /**
   * Join/leave events.
   */
  membershipChangeEvent?: MembershipChangeEvent;
  /**
   * Metadata for off-the-record message.
   */
  otrChatMessageEvent?: OtrChatMessageEvent;
  otrModificationEvent?: OtrModificationEvent;
  renameEvent?: RenameEvent;
}

function serializeChatContentExtension(data: any): ChatContentExtension {
  return {
    ...data,
    hangoutEvent: data["hangoutEvent"] !== undefined ? serializeHangoutEvent(data["hangoutEvent"]) : undefined,
    inviteAcceptedEvent: data["inviteAcceptedEvent"] !== undefined ? serializeInviteAcceptedEvent(data["inviteAcceptedEvent"]) : undefined,
    membershipChangeEvent: data["membershipChangeEvent"] !== undefined ? serializeMembershipChangeEvent(data["membershipChangeEvent"]) : undefined,
    otrChatMessageEvent: data["otrChatMessageEvent"] !== undefined ? serializeOtrChatMessageEvent(data["otrChatMessageEvent"]) : undefined,
  };
}

function deserializeChatContentExtension(data: any): ChatContentExtension {
  return {
    ...data,
    hangoutEvent: data["hangoutEvent"] !== undefined ? deserializeHangoutEvent(data["hangoutEvent"]) : undefined,
    inviteAcceptedEvent: data["inviteAcceptedEvent"] !== undefined ? deserializeInviteAcceptedEvent(data["inviteAcceptedEvent"]) : undefined,
    membershipChangeEvent: data["membershipChangeEvent"] !== undefined ? deserializeMembershipChangeEvent(data["membershipChangeEvent"]) : undefined,
    otrChatMessageEvent: data["otrChatMessageEvent"] !== undefined ? deserializeOtrChatMessageEvent(data["otrChatMessageEvent"]) : undefined,
  };
}

/**
 * Represents the invitees or other users associated with a Babel Chat (see
 * http://goto/babel). Corresponds to GroupType CHAT in
 * //social/graph/storage/proto/data.proto.
 */
export interface ChatProto {
  /**
   * Chat IDs consist of alphanumeric characters and colons. Currently
   * required.
   */
  chatId?: string;
  /**
   * The type of Chat members to consider, e.g. "all members" vs. "invitee"
   * These are defined by legacy_relation_id values in
   * social.graph.storage.EdgeTypeEnum.EdgeType enum options in
   * social/graph/storage/proto/id.proto. See chat.pb (defined in
   * production/config/cdd/socialgraph/mixer_config/prod/node_type_config) for
   * all valid edge types associated with chat. Currently required.
   */
  memberType?: number;
}

export interface CheckAccessResponse {
  /**
   * Returns true if principal has access. Returns false otherwise.
   */
  hasAccess?: boolean;
}

/**
 * Represents a Google+ Circle. Currently (12/2011), a Circle is identical to
 * the ContactGroup with matching parameters, but Circle must only be used for
 * true Circles and not other Focus groups, and should be preferred over
 * ContactGroup where applicable. Soon it may become more efficient to check
 * membership in a Circle than in a ContactGroup (see http://go/superglue).
 * Support for this principal type is currently (12/2011) incomplete -- e.g.,
 * Keystore does not support it yet (see b/5703421).
 */
export interface CircleProto {
  /**
   * Circle ID is unique only relative to the owner's Gaia ID. Currently
   * required.
   */
  circleId?: bigint;
  /**
   * The owner of the circle. Currently required.
   */
  ownerGaiaId?: bigint;
  /**
   * If present, then tests for membership in this circle must use data known
   * to be at least as fresh as the given (FBS-assigned) timestamp. See
   * http://go/fbs-consistent-read-after-important-write Before using this, be
   * sure that any service checking authorization against this circle supports
   * checking consistency timestamps. For example, as of 12/2011, Keystore only
   * supports this for the Moonshine configuration, and in others authorization
   * checks will fail if the timestamp is present.
   */
  requiredConsistencyTimestampUsec?: bigint;
}

function serializeCircleProto(data: any): CircleProto {
  return {
    ...data,
    circleId: data["circleId"] !== undefined ? String(data["circleId"]) : undefined,
    ownerGaiaId: data["ownerGaiaId"] !== undefined ? String(data["ownerGaiaId"]) : undefined,
    requiredConsistencyTimestampUsec: data["requiredConsistencyTimestampUsec"] !== undefined ? String(data["requiredConsistencyTimestampUsec"]) : undefined,
  };
}

function deserializeCircleProto(data: any): CircleProto {
  return {
    ...data,
    circleId: data["circleId"] !== undefined ? BigInt(data["circleId"]) : undefined,
    ownerGaiaId: data["ownerGaiaId"] !== undefined ? BigInt(data["ownerGaiaId"]) : undefined,
    requiredConsistencyTimestampUsec: data["requiredConsistencyTimestampUsec"] !== undefined ? BigInt(data["requiredConsistencyTimestampUsec"]) : undefined,
  };
}

/**
 * Represents the context of the client on behalf of which a HistoryRecord is
 * produced. The ClientContext message can be used to hold context about the
 * service client (e.g. the internal server making fusebox requests) or the user
 * client (e.g. the IP address of the end user).
 */
export interface ClientContext {
  /**
   * The client operation to which this history record belongs. The notion of a
   * client operation is provided to keep track of client operations which might
   * span multiple transactions in the lower level.
   */
  clientOperationId?: string;
  /**
   * E.g. "pinto", "imap", "bigtop", "upload"
   */
  clientType?: string;
  /**
   * Contains information about the session which created this history record.
   * This will be empty if the history record was generated by an internal
   * request.
   */
  sessionContext?: SessionContext;
  /**
   * Textual representation of the user's IP address, if available.
   */
  userIp?: string;
}

function serializeClientContext(data: any): ClientContext {
  return {
    ...data,
    sessionContext: data["sessionContext"] !== undefined ? serializeSessionContext(data["sessionContext"]) : undefined,
  };
}

function deserializeClientContext(data: any): ClientContext {
  return {
    ...data,
    sessionContext: data["sessionContext"] !== undefined ? deserializeSessionContext(data["sessionContext"]) : undefined,
  };
}

/**
 * Principal associated with a Cloud Principal representing third party user.
 */
export interface CloudPrincipalProto {
  /**
   * Format: "{identity-pool}:{subject}#" Details:
   * go/cloud-principal-identifiers
   */
  id?: string;
}

/**
 * ClusterInfo contains clustering related information for a particular thread
 * that would be sent as part of the conversation view. Today, this information
 * would be used by iOS notification server to identify whether the thread
 * belongs to a cluster. If the thread belongs to a grouped cluster, it would
 * identify whether the cluster is throttled.
 */
export interface ClusterInfo {
  /**
   * IDs of the highest priority clusters to which the thread belongs to. If
   * this field is not present, the thread does not belong to any cluster and
   * would be shown in the inbox, unclustered.
   */
  clusterId?: string[];
  /**
   * If the thread belongs to a grouped cluster and all of those clusters are
   * throttled, then this field is set to true.
   */
  throttled?: boolean;
}

/**
 * Metadata about a co-activity session.
 */
export interface CoActivity {
  /**
   * The title of the activity in this co-activity session. For example, this
   * might be the title of the video being co-watched, or the name of the round
   * of a game being co-played.
   */
  activityTitle?: string;
  /**
   * Identifies the app handling this co-activity.
   */
  coActivityApp?:  | "CO_ACTIVITY_APP_UNSPECIFIED" | "CO_ACTIVITY_APP_YOU_TUBE_MAIN" | "CO_ACTIVITY_APP_SPOTIFY" | "CO_ACTIVITY_APP_UNO" | "CO_ACTIVITY_APP_HEADSUP" | "CO_ACTIVITY_APP_KAHOOT" | "CO_ACTIVITY_APP_GQUEUES" | "CO_ACTIVITY_APP_YOU_TUBE_MUSIC" | "CO_ACTIVITY_APP_SAMSUNG_NOTES" | "CO_ACTIVITY_APP_HAPPY_AARDVARK";
}

/**
 * Information about a collaboration session.
 */
export interface Collaboration {
  /**
   * The attachment being collaborated on.
   */
  attachmentId?: string;
  /**
   * Display info of the user who initiated the collaboration session.
   */
  initiator?: UserDisplayInfo;
  /**
   * The uri of the artifact being collaborated on.
   */
  uri?: string;
}

/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript. This reference page doesn't carry
 * information about the absolute color space that should be used to interpret
 * the RGB value (e.g. sRGB, Adobe RGB, DCI-P3, BT.2020, etc.). By default,
 * applications should assume the sRGB color space. When color equality needs to
 * be decided, implementations, unless documented otherwise, treat two colors as
 * equal if all their red, green, blue, and alpha values each differ by at most
 * 1e-5. Example (Java): import com.google.type.Color; // ... public static
 * java.awt.Color fromProto(Color protocolor) { float alpha =
 * protocolor.hasAlpha() ? protocolor.getAlpha().getValue() : 1.0; return new
 * java.awt.Color( protocolor.getRed(), protocolor.getGreen(),
 * protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color
 * color) { float red = (float) color.getRed(); float green = (float)
 * color.getGreen(); float blue = (float) color.getBlue(); float denominator =
 * 255.0; Color.Builder resultBuilder = Color .newBuilder() .setRed(red /
 * denominator) .setGreen(green / denominator) .setBlue(blue / denominator); int
 * alpha = color.getAlpha(); if (alpha != 255) { result.setAlpha( FloatValue
 * .newBuilder() .setValue(((float) alpha) / denominator) .build()); } return
 * resultBuilder.build(); } // ... Example (iOS / Obj-C): // ... static UIColor*
 * fromProto(Color* protocolor) { float red = [protocolor red]; float green =
 * [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper
 * = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper != nil) { alpha =
 * [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green
 * blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat
 * red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue
 * alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result
 * setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <=
 * 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result
 * autorelease]; return result; } // ... Example (JavaScript): // ... var
 * protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0;
 * var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0;
 * var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255);
 * var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return
 * rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value ||
 * 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(',
 * rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor =
 * function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green
 * << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 -
 * hexString.length; var resultBuilder = ['#']; for (var i = 0; i <
 * missingZeros; i++) { resultBuilder.push('0'); }
 * resultBuilder.push(hexString); return resultBuilder.join(''); }; // ...
 */
export interface Color {
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation: `pixel color = alpha *
   * (this color) + (1.0 - alpha) * (background color)` This means that a value
   * of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to
   * a completely transparent color. This uses a wrapper message rather than a
   * simple float scalar so that it is possible to distinguish between a default
   * value and the value being unset. If omitted, this color object is rendered
   * as a solid color (as if the alpha value had been explicitly given a value
   * of 1.0).
   */
  alpha?: number;
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number;
}

/**
 * An individual instance (or "tag") of a label configured as a communal type
 * that's associated with a message.
 */
export interface CommunalLabelTag {
  /**
   * Gaia ID of the user who added the tag, if any. Not present for any tags
   * automatically created by server-side processing.
   */
  creatorUserId?: bigint;
  /**
   * A string ID representing the label. Possible ID values are documented at
   * go/chat-labels-howto:ids. Example: "^*t_p" for "Pinned".
   */
  labelId?: string;
}

function serializeCommunalLabelTag(data: any): CommunalLabelTag {
  return {
    ...data,
    creatorUserId: data["creatorUserId"] !== undefined ? String(data["creatorUserId"]) : undefined,
  };
}

function deserializeCommunalLabelTag(data: any): CommunalLabelTag {
  return {
    ...data,
    creatorUserId: data["creatorUserId"] !== undefined ? BigInt(data["creatorUserId"]) : undefined,
  };
}

export interface CompositeFilter {
  /**
   * The logic operator of the sub filter.
   */
  logicOperator?:  | "AND" | "OR" | "NOT";
  /**
   * Sub filters.
   */
  subFilters?: Filter[];
}

function serializeCompositeFilter(data: any): CompositeFilter {
  return {
    ...data,
    subFilters: data["subFilters"] !== undefined ? data["subFilters"].map((item: any) => (serializeFilter(item))) : undefined,
  };
}

function deserializeCompositeFilter(data: any): CompositeFilter {
  return {
    ...data,
    subFilters: data["subFilters"] !== undefined ? data["subFilters"].map((item: any) => (deserializeFilter(item))) : undefined,
  };
}

/**
 * Annotation metadata app unfurl consent.
 */
export interface ConsentedAppUnfurlMetadata {
  /**
   * Client specified AppId, which will not be sanitized and is untrusted.
   */
  clientSpecifiedAppId?: UserId;
}

function serializeConsentedAppUnfurlMetadata(data: any): ConsentedAppUnfurlMetadata {
  return {
    ...data,
    clientSpecifiedAppId: data["clientSpecifiedAppId"] !== undefined ? serializeUserId(data["clientSpecifiedAppId"]) : undefined,
  };
}

function deserializeConsentedAppUnfurlMetadata(data: any): ConsentedAppUnfurlMetadata {
  return {
    ...data,
    clientSpecifiedAppId: data["clientSpecifiedAppId"] !== undefined ? deserializeUserId(data["clientSpecifiedAppId"]) : undefined,
  };
}

/**
 * A group of contacts for a given user, as described in
 * http://cs/p#google3/focus/backend/proto/backend.proto Historically (and in
 * still-existing ACLs), this was used to represent Google+ circles as well as
 * contact groups, but this use is now deprecated. New code should use the
 * CIRCLE principal type to represent Google+ circles.
 */
export interface ContactGroupProto {
  /**
   * Group ID is unique only relative to the owner's Gaia ID.
   */
  groupId?: bigint;
  ownerGaiaId?: bigint;
  /**
   * If present, then tests for membership in this ContactGroup must use data
   * known to be at least as fresh as the given (FBS-assigned) timestamp. See
   * http://go/fbs-consistent-read-after-important-write Before using this, be
   * sure that any service checking authorization against this group supports
   * checking consistency timestamps. For example, as of 12/2011, Keystore only
   * supports this for the Moonshine configuration, and in others authorization
   * checks will fail if the timestamp is present.
   */
  requiredConsistencyTimestampUsec?: bigint;
}

function serializeContactGroupProto(data: any): ContactGroupProto {
  return {
    ...data,
    groupId: data["groupId"] !== undefined ? String(data["groupId"]) : undefined,
    ownerGaiaId: data["ownerGaiaId"] !== undefined ? String(data["ownerGaiaId"]) : undefined,
    requiredConsistencyTimestampUsec: data["requiredConsistencyTimestampUsec"] !== undefined ? String(data["requiredConsistencyTimestampUsec"]) : undefined,
  };
}

function deserializeContactGroupProto(data: any): ContactGroupProto {
  return {
    ...data,
    groupId: data["groupId"] !== undefined ? BigInt(data["groupId"]) : undefined,
    ownerGaiaId: data["ownerGaiaId"] !== undefined ? BigInt(data["ownerGaiaId"]) : undefined,
    requiredConsistencyTimestampUsec: data["requiredConsistencyTimestampUsec"] !== undefined ? BigInt(data["requiredConsistencyTimestampUsec"]) : undefined,
  };
}

export interface ContentReport {
  /**
   * The time at which the report is generated. Always populated when it is in
   * a response.
   */
  reportCreateTimestamp?: Date;
  /**
   * User ID of the reporter. Always populated when it is in a response.
   */
  reporterUserId?: UserId;
  /**
   * Additional user-provided justification on the report. Optional.
   */
  reportJustification?: ContentReportJustification;
  /**
   * Type of the report. Always populated when it is in a response.
   */
  reportType?: AppsDynamiteSharedContentReportType;
  /**
   * Create timestamp of the revisions of the message when it's reported.
   * Always populated when it is in a response.
   */
  revisionCreateTimestamp?: Date;
}

function serializeContentReport(data: any): ContentReport {
  return {
    ...data,
    reportCreateTimestamp: data["reportCreateTimestamp"] !== undefined ? data["reportCreateTimestamp"].toISOString() : undefined,
    reporterUserId: data["reporterUserId"] !== undefined ? serializeUserId(data["reporterUserId"]) : undefined,
    revisionCreateTimestamp: data["revisionCreateTimestamp"] !== undefined ? data["revisionCreateTimestamp"].toISOString() : undefined,
  };
}

function deserializeContentReport(data: any): ContentReport {
  return {
    ...data,
    reportCreateTimestamp: data["reportCreateTimestamp"] !== undefined ? new Date(data["reportCreateTimestamp"]) : undefined,
    reporterUserId: data["reporterUserId"] !== undefined ? deserializeUserId(data["reporterUserId"]) : undefined,
    revisionCreateTimestamp: data["revisionCreateTimestamp"] !== undefined ? new Date(data["revisionCreateTimestamp"]) : undefined,
  };
}

export interface ContentReportJustification {
  /**
   * Optional. User-generated free-text justification for the content report.
   */
  userJustification?: string;
}

/**
 * Summarized info of content reports. Usually less expensive to fetch than to
 * fetch all detailed reports. Set only when the request asks for it.
 */
export interface ContentReportSummary {
  /**
   * Total number of reports attached to this (revision of) message.
   */
  numberReports?: number;
  /**
   * Totoal number of reports attached to all revisions of this message (i.e.
   * since creation). Set only when the request asks for it.
   */
  numberReportsAllRevisions?: number;
}

/**
 * A named attribute associated with an item which can be used for influencing
 * the ranking of the item based on the context in the request.
 */
export interface ContextAttribute {
  /**
   * The name of the attribute. It should not be empty. The maximum length is
   * 32 characters. The name must start with a letter and can only contain
   * letters (A-Z, a-z) or numbers (0-9). The name will be normalized
   * (lower-cased) before being matched.
   */
  name?: string;
  /**
   * Text values of the attribute. The maximum number of elements is 10. The
   * maximum length of an element in the array is 32 characters. The value will
   * be normalized (lower-cased) before being matched.
   */
  values?: string[];
}

/**
 * The markup for developers to specify the contents of a contextual AddOn. A
 * contextual AddOn is triggered in context of an email. For that email, there
 * can be N items that are associated with the email (e.g. contacts, sales lead,
 * meeting information). Each item is represented as a "card". A card has two
 * views, collapsed and detailed. If there are more than 1 card, the cards are
 * show as a list of collapsed views. The end user can expand into the detailed
 * view for each of those cards. In the detailed view, developers have the
 * freedom to use a variety of "widgets" to construct it. The model here is to
 * restrict (make consistent for end users) the navigation of the N cards but
 * providing developers the freedom to build the detailed view that can best
 * represent their use case/content. Go http://go/aoig-widgets1 to see the
 * mocks. Post v1, we plan to support new AddOn use cases that will require
 * different and separate 'templates'. For example, a compose triggered AddOn
 * which will support a new set of use cases with different user interaction
 * patterns. As a result, we will likely need a very different template than
 * this one.
 */
export interface ContextualAddOnMarkup {
  /**
   * A card must contain a header and at least 1 section.
   */
  cards?: Card[];
  /**
   * Deprecated.
   */
  toolbar?: Toolbar;
}

function serializeContextualAddOnMarkup(data: any): ContextualAddOnMarkup {
  return {
    ...data,
    cards: data["cards"] !== undefined ? data["cards"].map((item: any) => (serializeCard(item))) : undefined,
  };
}

function deserializeContextualAddOnMarkup(data: any): ContextualAddOnMarkup {
  return {
    ...data,
    cards: data["cards"] !== undefined ? data["cards"].map((item: any) => (deserializeCard(item))) : undefined,
  };
}

/**
 * Information needed for Client-side Encryption.
 */
export interface CseInfo {
  /**
   * CSE domain name claimed by the meeting owner's company. This field is
   * expected to be used for display purposes only, i.e., "Extra encryption
   * added by $cse_domain". It can differ from the `cse_domain` as defined
   * elsewhere on the User, in the case of cross-domain meetings.
   */
  cseDomain?: string;
  /**
   * The wrapped CSE key used by this conference.
   */
  wrappedKey?: Uint8Array;
}

function serializeCseInfo(data: any): CseInfo {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? encodeBase64(data["wrappedKey"]) : undefined,
  };
}

function deserializeCseInfo(data: any): CseInfo {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? decodeBase64(data["wrappedKey"] as string) : undefined,
  };
}

export interface CustomEmojiMetadata {
  customEmoji?: AppsDynamiteSharedCustomEmoji;
}

function serializeCustomEmojiMetadata(data: any): CustomEmojiMetadata {
  return {
    ...data,
    customEmoji: data["customEmoji"] !== undefined ? serializeAppsDynamiteSharedCustomEmoji(data["customEmoji"]) : undefined,
  };
}

function deserializeCustomEmojiMetadata(data: any): CustomEmojiMetadata {
  return {
    ...data,
    customEmoji: data["customEmoji"] !== undefined ? deserializeAppsDynamiteSharedCustomEmoji(data["customEmoji"]) : undefined,
  };
}

/**
 * Represents a GSuite customer ID. Obfuscated with CustomerIdObfuscator.
 */
export interface CustomerId {
  customerId?: string;
}

/**
 * Aggregation of items by status code as of the specified date.
 */
export interface CustomerIndexStats {
  /**
   * The date for which statistics were calculated.
   */
  date?: Date;
  /**
   * Number of items aggregrated by status code.
   */
  itemCountByStatus?: ItemCountByStatus[];
}

function serializeCustomerIndexStats(data: any): CustomerIndexStats {
  return {
    ...data,
    itemCountByStatus: data["itemCountByStatus"] !== undefined ? data["itemCountByStatus"].map((item: any) => (serializeItemCountByStatus(item))) : undefined,
  };
}

function deserializeCustomerIndexStats(data: any): CustomerIndexStats {
  return {
    ...data,
    itemCountByStatus: data["itemCountByStatus"] !== undefined ? data["itemCountByStatus"].map((item: any) => (deserializeItemCountByStatus(item))) : undefined,
  };
}

export interface CustomerQueryStats {
  /**
   * The date for which query stats were calculated. Stats calculated on the
   * next day close to midnight are returned.
   */
  date?: Date;
  queryCountByStatus?: QueryCountByStatus[];
}

function serializeCustomerQueryStats(data: any): CustomerQueryStats {
  return {
    ...data,
    queryCountByStatus: data["queryCountByStatus"] !== undefined ? data["queryCountByStatus"].map((item: any) => (serializeQueryCountByStatus(item))) : undefined,
  };
}

function deserializeCustomerQueryStats(data: any): CustomerQueryStats {
  return {
    ...data,
    queryCountByStatus: data["queryCountByStatus"] !== undefined ? data["queryCountByStatus"].map((item: any) => (deserializeQueryCountByStatus(item))) : undefined,
  };
}

/**
 * Search application stats for a customer for the given date.
 */
export interface CustomerSearchApplicationStats {
  /**
   * The count of search applications for the date.
   */
  count?: bigint;
  /**
   * The date for which search application stats were calculated.
   */
  date?: Date;
}

function serializeCustomerSearchApplicationStats(data: any): CustomerSearchApplicationStats {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeCustomerSearchApplicationStats(data: any): CustomerSearchApplicationStats {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

export interface CustomerSessionStats {
  /**
   * The date for which session stats were calculated. Stats are calculated on
   * the following day, close to midnight PST, and then returned.
   */
  date?: Date;
  /**
   * The count of search sessions on the day
   */
  searchSessionsCount?: bigint;
}

function serializeCustomerSessionStats(data: any): CustomerSessionStats {
  return {
    ...data,
    searchSessionsCount: data["searchSessionsCount"] !== undefined ? String(data["searchSessionsCount"]) : undefined,
  };
}

function deserializeCustomerSessionStats(data: any): CustomerSessionStats {
  return {
    ...data,
    searchSessionsCount: data["searchSessionsCount"] !== undefined ? BigInt(data["searchSessionsCount"]) : undefined,
  };
}

/**
 * Represents settings at a customer level.
 */
export interface CustomerSettings {
  /**
   * Audit Logging settings for the customer. If update_mask is empty then this
   * field will be updated based on UpdateCustomerSettings request.
   */
  auditLoggingSettings?: AuditLoggingSettings;
  /**
   * VPC SC settings for the customer. If update_mask is empty then this field
   * will be updated based on UpdateCustomerSettings request.
   */
  vpcSettings?: VPCSettings;
}

export interface CustomerUserStats {
  /**
   * The date for which session stats were calculated. Stats calculated on the
   * next day close to midnight are returned.
   */
  date?: Date;
  /**
   * The count of unique active users in the past one day
   */
  oneDayActiveUsersCount?: bigint;
  /**
   * The count of unique active users in the past seven days
   */
  sevenDaysActiveUsersCount?: bigint;
  /**
   * The count of unique active users in the past thirty days
   */
  thirtyDaysActiveUsersCount?: bigint;
}

function serializeCustomerUserStats(data: any): CustomerUserStats {
  return {
    ...data,
    oneDayActiveUsersCount: data["oneDayActiveUsersCount"] !== undefined ? String(data["oneDayActiveUsersCount"]) : undefined,
    sevenDaysActiveUsersCount: data["sevenDaysActiveUsersCount"] !== undefined ? String(data["sevenDaysActiveUsersCount"]) : undefined,
    thirtyDaysActiveUsersCount: data["thirtyDaysActiveUsersCount"] !== undefined ? String(data["thirtyDaysActiveUsersCount"]) : undefined,
  };
}

function deserializeCustomerUserStats(data: any): CustomerUserStats {
  return {
    ...data,
    oneDayActiveUsersCount: data["oneDayActiveUsersCount"] !== undefined ? BigInt(data["oneDayActiveUsersCount"]) : undefined,
    sevenDaysActiveUsersCount: data["sevenDaysActiveUsersCount"] !== undefined ? BigInt(data["sevenDaysActiveUsersCount"]) : undefined,
    thirtyDaysActiveUsersCount: data["thirtyDaysActiveUsersCount"] !== undefined ? BigInt(data["thirtyDaysActiveUsersCount"]) : undefined,
  };
}

/**
 * The result of a user running a custom function.
 */
export interface CustomFunctionReturnValueMarkup {
  /**
   * The error message to show to the user if something went wrong.
   */
  errorMessage?: string;
  /**
   * The value that resulted from running the custom function.
   */
  value?: any;
}

/**
 * Annotation metadata for Data Loss Prevention that pertains to DLP violation
 * on message send or edit events. It is used for client -> BE communication and
 * other downstream process in BE (e.g. storage and audit logging), and it
 * should never be returned to the client.
 */
export interface DataLossPreventionMetadata {
  /**
   * The DLP scan summary that should only be set after the message is scanned
   * in the Chat backend.
   */
  dlpScanSummary?: DlpScanSummary;
  /**
   * Flag set by client on message resend to bypass WARN violation.
   */
  warnAcknowledged?: boolean;
}

/**
 * Datasource is a logical namespace for items to be indexed. All items must
 * belong to a datasource. This is the prerequisite before items can be indexed
 * into Cloud Search.
 */
export interface DataSource {
  /**
   * If true, sets the datasource to read-only mode. In read-only mode, the
   * Indexing API rejects any requests to index or delete items in this source.
   * Enabling read-only mode does not stop the processing of previously accepted
   * data.
   */
  disableModifications?: boolean;
  /**
   * Disable serving any search or assist results.
   */
  disableServing?: boolean;
  /**
   * Required. Display name of the datasource The maximum length is 300
   * characters.
   */
  displayName?: string;
  /**
   * List of service accounts that have indexing access.
   */
  indexingServiceAccounts?: string[];
  /**
   * This field restricts visibility to items at the datasource level. Items
   * within the datasource are restricted to the union of users and groups
   * included in this field. Note that, this does not ensure access to a
   * specific item, as users need to have ACL permissions on the contained
   * items. This ensures a high level access on the entire datasource, and that
   * the individual items are not shared outside this visibility.
   */
  itemsVisibility?: GSuitePrincipal[];
  /**
   * The name of the datasource resource. Format: datasources/{source_id}. The
   * name is ignored when creating a datasource.
   */
  name?: string;
  /**
   * IDs of the Long Running Operations (LROs) currently running for this
   * schema.
   */
  operationIds?: string[];
  /**
   * Can a user request to get thumbnail URI for Items indexed in this data
   * source.
   */
  returnThumbnailUrls?: boolean;
  /**
   * A short name or alias for the source. This value will be used to match the
   * 'source' operator. For example, if the short name is *<value>* then queries
   * like *source:<value>* will only return results for this source. The value
   * must be unique across all datasources. The value must only contain
   * alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google'
   * and cannot be one of the following: mail, gmail, docs, drive, groups,
   * sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length
   * is 32 characters.
   */
  shortName?: string;
}

/**
 * Aggregation of items by status code as of the specified date.
 */
export interface DataSourceIndexStats {
  /**
   * The date for which index stats were calculated. If the date of request is
   * not the current date then stats calculated on the next day are returned.
   * Stats are calculated close to mid night in this case. If date of request is
   * current date, then real time stats are returned.
   */
  date?: Date;
  /**
   * Number of items aggregrated by status code.
   */
  itemCountByStatus?: ItemCountByStatus[];
}

function serializeDataSourceIndexStats(data: any): DataSourceIndexStats {
  return {
    ...data,
    itemCountByStatus: data["itemCountByStatus"] !== undefined ? data["itemCountByStatus"].map((item: any) => (serializeItemCountByStatus(item))) : undefined,
  };
}

function deserializeDataSourceIndexStats(data: any): DataSourceIndexStats {
  return {
    ...data,
    itemCountByStatus: data["itemCountByStatus"] !== undefined ? data["itemCountByStatus"].map((item: any) => (deserializeItemCountByStatus(item))) : undefined,
  };
}

/**
 * Restriction on Datasource.
 */
export interface DataSourceRestriction {
  /**
   * Filter options restricting the results. If multiple filters are present,
   * they are grouped by object type before joining. Filters with the same
   * object type are joined conjunctively, then the resulting expressions are
   * joined disjunctively. The maximum number of elements is 20. NOTE: Suggest
   * API supports only few filters at the moment: "objecttype", "type" and
   * "mimetype". For now, schema specific filters cannot be used to filter
   * suggestions.
   */
  filterOptions?: FilterOptions[];
  /**
   * The source of restriction.
   */
  source?: Source;
}

function serializeDataSourceRestriction(data: any): DataSourceRestriction {
  return {
    ...data,
    filterOptions: data["filterOptions"] !== undefined ? data["filterOptions"].map((item: any) => (serializeFilterOptions(item))) : undefined,
  };
}

function deserializeDataSourceRestriction(data: any): DataSourceRestriction {
  return {
    ...data,
    filterOptions: data["filterOptions"] !== undefined ? data["filterOptions"].map((item: any) => (deserializeFilterOptions(item))) : undefined,
  };
}

/**
 * Represents a whole calendar date, for example a date of birth. The time of
 * day and time zone are either specified elsewhere or are not significant. The
 * date is relative to the [Proleptic Gregorian
 * Calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar). The
 * date must be a valid calendar date between the year 1 and 9999.
 */
export interface Date {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  day?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  month?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  year?: number;
}

/**
 * Optional. Provides a search operator for date properties. Search operators
 * let users restrict the query to specific fields relevant to the type of item
 * being searched.
 */
export interface DateOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * date property using the greater-than operator. For example, if
   * greaterThanOperatorName is *closedafter* and the property's name is
   * *closeDate*, then queries like *closedafter:<value>* show results only
   * where the value of the property named *closeDate* is later than *<value>*.
   * The operator name can only contain lowercase letters (a-z). The maximum
   * length is 32 characters.
   */
  greaterThanOperatorName?: string;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * date property using the less-than operator. For example, if
   * lessThanOperatorName is *closedbefore* and the property's name is
   * *closeDate*, then queries like *closedbefore:<value>* show results only
   * where the value of the property named *closeDate* is earlier than
   * *<value>*. The operator name can only contain lowercase letters (a-z). The
   * maximum length is 32 characters.
   */
  lessThanOperatorName?: string;
  /**
   * Indicates the actual string required in the query in order to isolate the
   * date property. For example, suppose an issue tracking schema object has a
   * property named *closeDate* that specifies an operator with an operatorName
   * of *closedon*. For searches on that data, queries like *closedon:<value>*
   * show results only where the value of the *closeDate* property matches
   * *<value>*. By contrast, a search that uses the same *<value>* without an
   * operator returns all items where *<value>* matches the value of any String
   * properties or text within the content field for the indexed datasource. The
   * operator name can only contain lowercase letters (a-z). The maximum length
   * is 32 characters.
   */
  operatorName?: string;
}

/**
 * The options for date properties.
 */
export interface DatePropertyOptions {
  /**
   * If set, describes how the date should be used as a search operator.
   */
  operatorOptions?: DateOperatorOptions;
}

export interface DateTimePicker {
  /**
   * The label for the field, which is displayed to the user.
   */
  label?: string;
  /**
   * The name of the text field which is used in FormInput, and uniquely
   * identifies this input.
   */
  name?: string;
  /**
   * Triggered when the user clicks on the Save, or Clear button from the date
   * / time picker dialog. Will only be triggered if the value changed as a
   * result of the Save / Clear operation.
   */
  onChange?: FormAction;
  /**
   * The number representing the time-zone offset from UTC, in minutes. If set,
   * the value_ms_epoch will be displayed in the specified time zone. If not
   * set, it will use the user's timezone setting in client side.
   */
  timezoneOffsetDate?: number;
  /**
   * The type of the DateTimePicker.
   */
  type?:  | "UNSPECIFIED_TYPE" | "DATE_AND_TIME" | "DATE_ONLY" | "TIME_ONLY";
  /**
   * The value to display which can be the default value before user input or
   * previous user input. It is represented in milliseconds (Epoch time). - For
   * DATE_AND_TIME type, the full epoch value is used. - For DATE_ONLY type,
   * only date of the epoch time is used. - For TIME_ONLY type, only time of the
   * epoch time is used. For example, you can set epoch time to 3 * 60 * 60 *
   * 1000 to represent 3am.
   */
  valueMsEpoch?: bigint;
}

function serializeDateTimePicker(data: any): DateTimePicker {
  return {
    ...data,
    valueMsEpoch: data["valueMsEpoch"] !== undefined ? String(data["valueMsEpoch"]) : undefined,
  };
}

function deserializeDateTimePicker(data: any): DateTimePicker {
  return {
    ...data,
    valueMsEpoch: data["valueMsEpoch"] !== undefined ? BigInt(data["valueMsEpoch"]) : undefined,
  };
}

/**
 * List of date values.
 */
export interface DateValues {
  values?: Date[];
}

/**
 * Additional options for CloudSearch#debugDatasourcesItemsCheckAccess.
 */
export interface DebugDatasourcesItemsCheckAccessOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#debugDatasourcesItemsUnmappedidsList.
 */
export interface DebugDatasourcesItemsUnmappedidsListOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Maximum number of items to fetch in a request. Defaults to 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudSearch#debugIdentitysourcesItemsListForunmappedidentity.
 */
export interface DebugIdentitysourcesItemsListForunmappedidentityOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  groupResourceName?: string;
  /**
   * Maximum number of items to fetch in a request. Defaults to 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
  userResourceName?: string;
}

/**
 * Additional options for CloudSearch#debugIdentitysourcesUnmappedidsList.
 */
export interface DebugIdentitysourcesUnmappedidsListOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Maximum number of items to fetch in a request. Defaults to 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
  /**
   * Limit users selection to this status.
   */
  resolutionStatusCode?:  | "CODE_UNSPECIFIED" | "NOT_FOUND" | "IDENTITY_SOURCE_NOT_FOUND" | "IDENTITY_SOURCE_MISCONFIGURED" | "TOO_MANY_MAPPINGS_FOUND" | "INTERNAL_ERROR";
}

/**
 * Shared request debug options for all cloudsearch RPC methods.
 */
export interface DebugOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  enableDebugging?: boolean;
}

/**
 * Deep-linking data is used to construct a deep-link URI for an activity or
 * frame's embed, such that on click, the user is taken to the right place in a
 * mobile app. If the app is not installed, the user is taken to the app store.
 * If not on mobile, an analogous web uri is used.
 */
export interface DeepLinkData {
  /**
   * Application ID (or project ID) from Google API Console.
   */
  appId?: bigint;
  /**
   * The data for a Google API Console client is entered by a developer during
   * client registration and is stored in PackagingService.
   */
  client?: PackagingServiceClient[];
  /**
   * The ID for non-URL content. Embeds may either have no analogous web
   * presence or prefer a native mobile experience if supported. In the case of
   * no web presence, instead of setting the "url" field of an embed, such
   * developers will set this field and other content fields, e.g. thumbnail,
   * title, description. If set, this field is used to construct the deep-link
   * URI. Note that the native experience is preferred over the web link and the
   * web link is used as a fallback.
   */
  deepLinkId?: string;
  /**
   * Analogous web presence. Used as desktop fallback or when no native link
   * data is present.
   */
  url?: string;
}

function serializeDeepLinkData(data: any): DeepLinkData {
  return {
    ...data,
    appId: data["appId"] !== undefined ? String(data["appId"]) : undefined,
  };
}

function deserializeDeepLinkData(data: any): DeepLinkData {
  return {
    ...data,
    appId: data["appId"] !== undefined ? BigInt(data["appId"]) : undefined,
  };
}

/**
 * A message delete in Dynamite inserts a Babel-only item containing this
 * field. This is only inserted for messages before the source-of-truth flip.
 * See go/hsc-message-deletions for more details.
 */
export interface DeleteMetadata {
}

export interface DeleteQueueItemsRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * The name of a queue to delete items from.
   */
  queue?: string;
}

export interface DeliveryMedium {
  /**
   * Describes the medium the cent was sent/received. For example, if I receive
   * an SMS via GV, the medium_type will be GV.
   */
  mediumType?:  | "UNKNOWN_MEDIUM" | "BABEL_MEDIUM" | "GOOGLE_VOICE_MEDIUM" | "LOCAL_SMS_MEDIUM";
  /**
   * In the case of multiple GV/native numbers, this defines the exact number
   * to send from. It is used to differentiate mediums that have the same type,
   * but different addresses (e.g. two android phones).
   */
  selfPhone?: VoicePhoneNumber;
}

/**
 * A reference to a top-level property within the object that should be
 * displayed in search results. The values of the chosen properties is displayed
 * in the search results along with the display label for that property if one
 * is specified. If a display label is not specified, only the values is shown.
 */
export interface DisplayedProperty {
  /**
   * The name of the top-level property as defined in a property definition for
   * the object. If the name is not a defined property in the schema, an error
   * is given when attempting to update the schema.
   */
  propertyName?: string;
}

export interface Divider {
}

/**
 * A summary of a DLP scan event. This is a summary and should contain the
 * minimum amount of data required to identify and process DLP scans. It is
 * written to Starcast and encoded & returned to the client on attachment
 * upload.
 */
export interface DlpScanSummary {
  /**
   * The scan ID of the corresponding {@link DlpViolationScanRecord} in the
   * {@link EphemeralDlpScans} Spanner table. This can be used to fetch
   * additional details about the scan, e.g. for audit logging.
   */
  scanId?: string;
  /**
   * Indicates that was no attempt to scan a message or attachment because it
   * was not applicable in the given context (e.g. atomic mutuate). If this is
   * true, scan_outcome should not be set. This flag is used to identify
   * messages that DLP did not attempt to scan for monitoring scan coverage.
   * Contents that DLP attempted to scan but skipped can be identified by
   * DlpScanOutcome.SCAN_SKIPPED_* reasons. DEPRECATED: The prober can determine
   * this from the context.
   */
  scanNotApplicableForContext?: boolean;
  /**
   * The outcome of a DLP Scan. If this is set, scan_not_applicable_for_context
   * should not be true.
   */
  scanOutcome?:  | "SCAN_UNKNOWN_OUTCOME" | "SCAN_SUCCEEDED_NO_VIOLATION" | "SCAN_SUCCEEDED_BLOCK" | "SCAN_SUCCEEDED_WARN" | "SCAN_SUCCEEDED_AUDIT_ONLY" | "SCAN_FAILURE_EXCEPTION" | "SCAN_FAILURE_RULE_FETCH_FAILED" | "SCAN_FAILURE_TIMEOUT" | "SCAN_FAILURE_ALL_RULES_FAILED" | "SCAN_FAILURE_ILLEGAL_STATE_FOR_ATTACHMENTS" | "SCAN_SKIPPED_EXPERIMENT_DISABLED" | "SCAN_SKIPPED_CONSUMER" | "SCAN_SKIPPED_NON_HUMAN_USER" | "SCAN_SKIPPED_NO_MESSAGE" | "SCAN_SKIPPED_USER_ACKNOWLEDGED_WARNING" | "SCAN_SKIPPED_MESSAGE_FROM_UNSUPPORTED_ORIGIN" | "SCAN_SKIPPED_MESSAGE_SENT_DURING_SPACE_MIGRATION" | "SCAN_RULE_EVALUATION_SKIPPED_NO_RULES_FOUND" | "SCAN_RULE_EVALUATION_SKIPPED_NO_APPLICABLE_RULES_FOR_ACTION_PARAMS" | "SCAN_RULE_EVALUATION_SKIPPED_NO_APPLICABLE_RULES_FOR_TRIGGER" | "SCAN_RULE_EVALUATION_SKIPPED_CHANGELING_PERMANENT_ERROR" | "SCAN_RULE_EVALUATION_SKIPPED_CHANGELING_EMPTY_RESPONSE" | "SCAN_RULE_EVALUATION_SKIPPED_UNSUPPORTED_FILE_TYPE" | "SCAN_SUCCEEDED_WITH_FAILURES_NO_VIOLATION" | "SCAN_SUCCEEDED_WITH_FAILURES_BLOCK" | "SCAN_SUCCEEDED_WITH_FAILURES_WARN" | "SCAN_SUCCEEDED_WITH_FAILURES_AUDIT_ONLY";
}

export interface DmId {
  /**
   * Unique server assigned Id, per Direct Message Space.
   */
  dmId?: string;
}

/**
 * Information on a document attached to an active conference.
 */
export interface DocumentInfo {
  /**
   * A whiteboard document.
   */
  whiteboardInfo?: WhiteboardInfo;
}

/**
 * Used to provide a search operator for double properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched.
 */
export interface DoubleOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to use the
   * double property in sorting or as a facet. The operator name can only
   * contain lowercase letters (a-z). The maximum length is 32 characters.
   */
  operatorName?: string;
}

/**
 * The options for double properties.
 */
export interface DoublePropertyOptions {
  /**
   * If set, describes how the double should be used as a search operator.
   */
  operatorOptions?: DoubleOperatorOptions;
}

/**
 * List of double values.
 */
export interface DoubleValues {
  values?: number[];
}

export interface DriveClientActionMarkup {
  requestFileScope?: RequestFileScope;
}

/**
 * Drive follow-up search restricts (e.g. "followup:suggestions").
 */
export interface DriveFollowUpRestrict {
  type?:  | "UNSPECIFIED" | "FOLLOWUP_SUGGESTIONS" | "FOLLOWUP_ACTION_ITEMS";
}

/**
 * Drive location search restricts (e.g. "is:starred").
 */
export interface DriveLocationRestrict {
  type?:  | "UNSPECIFIED" | "TRASHED" | "STARRED";
}

/**
 * Annotation metadata for Drive artifacts.
 */
export interface DriveMetadata {
  aclFixRequest?: AclFixRequest;
  aclFixStatus?: AclFixStatus;
  /**
   * Can the current user edit this resource
   */
  canEdit?: boolean;
  /**
   * Can the current user share this resource
   */
  canShare?: boolean;
  /**
   * Can the current user view this resource
   */
  canView?: boolean;
  /**
   * DriveAction for organizing this file in Drive. If the user does not have
   * access to the Drive file, the value will be
   * DriveAction.DRIVE_ACTION_UNSPECIFIED. This field is only set when part of a
   * FileResult in a ListFilesResponse.
   */
  driveAction?:  | "DRIVE_ACTION_UNSPECIFIED" | "ADD_TO_DRIVE" | "ORGANIZE" | "ADD_SHORTCUT" | "ADD_ANOTHER_SHORTCUT";
  driveState?:  | "DRIVE_STATE_UNSPECIFIED" | "IN_MY_DRIVE" | "IN_TEAM_DRIVE" | "SHARED_IN_DRIVE" | "NOT_IN_DRIVE";
  /**
   * Output only. Trusted Resource URL for drive file embedding.
   */
  readonly embedUrl?: TrustedResourceUrlProto;
  /**
   * Indicates whether the Drive link contains an encrypted doc ID. If true,
   * Dynamite should not attempt to query the doc ID in Drive Service. See
   * go/docid-encryption for details.
   */
  encryptedDocId?: boolean;
  /**
   * This is deprecated and unneeded. TODO (b/182479059): Remove this.
   */
  encryptedResourceKey?: string;
  /**
   * External mimetype of the Drive Resource (Useful for creating Drive URL)
   * See: http://b/35219462
   */
  externalMimetype?: string;
  /**
   * Drive resource ID of the artifact.
   */
  id?: string;
  /**
   * Deprecated. Whether the setting to restrict downloads is enabled for this
   * file. This was previously used to determine whether to hide the download
   * and print buttons in the UI, but is no longer used by clients, because
   * Projector now independently queries Drive to ensure that we have the most
   * up-to-date value.
   */
  isDownloadRestricted?: boolean;
  /**
   * If the current user is the Drive file's owner. The field is currently only
   * set for Annotations for the ListFiles action (as opposed to fetching
   * Topics/Messages with Drive annotations).
   */
  isOwner?: boolean;
  /**
   * Only present if this DriveMetadata is converted from an UploadMetadata.
   */
  legacyUploadMetadata?: LegacyUploadMetadata;
  /**
   * Mimetype of the Drive Resource
   */
  mimetype?: string;
  /**
   * The display name of the organization owning the Drive item.
   */
  organizationDisplayName?: string;
  /**
   * Shortcut ID of this drive file in the shared drive, which is associated
   * with a named room this file was shared in. Shortcuts will not be created
   * for DMs or unnamed rooms. This is populated after the DriveMetadata is
   * migrated to shared drive. go/chat-shared-drive-uploads.
   */
  shortcutAuthorizedItemId?: AuthorizedItemId;
  /**
   * If this field is set to true, server should still contact external
   * backends to get metadata for search but clients should not render this
   * chip.
   */
  shouldNotRender?: boolean;
  /**
   * Thumbnail image of the Drive Resource
   */
  thumbnailHeight?: number;
  /**
   * Thumbnail image of the Drive Resource
   */
  thumbnailUrl?: string;
  /**
   * Thumbnail image of the Drive Resource
   */
  thumbnailWidth?: number;
  /**
   * Title of the Drive Resource
   */
  title?: string;
  /**
   * Url string fragment that generally indicates the specific location in the
   * linked file. Example: #header=h.123abc456. If the fragment is not present
   * this will not be present and therefore default to an empty string. The "#"
   * will not be included.
   */
  urlFragment?: string;
  /**
   * This is considered SPII and should not be logged.
   */
  wrappedResourceKey?: WrappedResourceKey;
}

function serializeDriveMetadata(data: any): DriveMetadata {
  return {
    ...data,
    legacyUploadMetadata: data["legacyUploadMetadata"] !== undefined ? serializeLegacyUploadMetadata(data["legacyUploadMetadata"]) : undefined,
  };
}

function deserializeDriveMetadata(data: any): DriveMetadata {
  return {
    ...data,
    legacyUploadMetadata: data["legacyUploadMetadata"] !== undefined ? deserializeLegacyUploadMetadata(data["legacyUploadMetadata"]) : undefined,
  };
}

/**
 * Drive mime-type search restricts (e.g. "type:pdf").
 */
export interface DriveMimeTypeRestrict {
  type?:  | "UNSPECIFIED" | "PDF" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "FORM" | "DRAWING" | "SCRIPT" | "MAP" | "IMAGE" | "AUDIO" | "VIDEO" | "FOLDER" | "ARCHIVE" | "SITE";
}

/**
 * The time span search restrict (e.g. "after:2017-09-11 before:2017-09-12").
 */
export interface DriveTimeSpanRestrict {
  type?:  | "UNSPECIFIED" | "TODAY" | "YESTERDAY" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS";
}

/**
 * This is the proto for holding message level scoring information. This data
 * is used for logging in query-api server and for testing purposes.
 */
export interface DynamiteMessagesScoringInfo {
  commonContactCount?: bigint;
  commonCountToContactListCountRatio?: number;
  commonCountToMembershipCountRatio?: number;
  creatorGaiaId?: bigint;
  creatorInSearcherContactList?: boolean;
  crowdingMultiplier?: number;
  dasContactCount?: bigint;
  finalScore?: number;
  freshnessScore?: number;
  joinedSpaceAffinityScore?: number;
  lastReadTimestampAgeInDays?: number;
  messageAgeInDays?: number;
  messageSenderAffinityScore?: number;
  spaceId?: bigint;
  spaceMembershipCount?: bigint;
  topicalityScore?: number;
  unjoinedSpaceAffinityScore?: number;
}

function serializeDynamiteMessagesScoringInfo(data: any): DynamiteMessagesScoringInfo {
  return {
    ...data,
    commonContactCount: data["commonContactCount"] !== undefined ? String(data["commonContactCount"]) : undefined,
    creatorGaiaId: data["creatorGaiaId"] !== undefined ? String(data["creatorGaiaId"]) : undefined,
    dasContactCount: data["dasContactCount"] !== undefined ? String(data["dasContactCount"]) : undefined,
    spaceId: data["spaceId"] !== undefined ? String(data["spaceId"]) : undefined,
    spaceMembershipCount: data["spaceMembershipCount"] !== undefined ? String(data["spaceMembershipCount"]) : undefined,
  };
}

function deserializeDynamiteMessagesScoringInfo(data: any): DynamiteMessagesScoringInfo {
  return {
    ...data,
    commonContactCount: data["commonContactCount"] !== undefined ? BigInt(data["commonContactCount"]) : undefined,
    creatorGaiaId: data["creatorGaiaId"] !== undefined ? BigInt(data["creatorGaiaId"]) : undefined,
    dasContactCount: data["dasContactCount"] !== undefined ? BigInt(data["dasContactCount"]) : undefined,
    spaceId: data["spaceId"] !== undefined ? BigInt(data["spaceId"]) : undefined,
    spaceMembershipCount: data["spaceMembershipCount"] !== undefined ? BigInt(data["spaceMembershipCount"]) : undefined,
  };
}

/**
 * This is the proto for holding space level scoring information. This data is
 * used for logging in query-api server and for testing purposes.
 */
export interface DynamiteSpacesScoringInfo {
  affinityScore?: number;
  commonContactCountAffinityScore?: number;
  contactsIntersectionCount?: number;
  finalScore?: number;
  freshnessScore?: number;
  joinedSpacesAffinityScore?: number;
  lastMessagePostedTimestampSecs?: bigint;
  lastReadTimestampSecs?: bigint;
  memberMetadataCount?: number;
  messageScore?: number;
  numAucContacts?: bigint;
  smallContactListAffinityScore?: number;
  smallUnjoinedSpacesAffinityScore?: number;
  spaceAgeInDays?: number;
  spaceCreationTimestampSecs?: bigint;
  topicalityScore?: number;
}

function serializeDynamiteSpacesScoringInfo(data: any): DynamiteSpacesScoringInfo {
  return {
    ...data,
    lastMessagePostedTimestampSecs: data["lastMessagePostedTimestampSecs"] !== undefined ? String(data["lastMessagePostedTimestampSecs"]) : undefined,
    lastReadTimestampSecs: data["lastReadTimestampSecs"] !== undefined ? String(data["lastReadTimestampSecs"]) : undefined,
    numAucContacts: data["numAucContacts"] !== undefined ? String(data["numAucContacts"]) : undefined,
    spaceCreationTimestampSecs: data["spaceCreationTimestampSecs"] !== undefined ? String(data["spaceCreationTimestampSecs"]) : undefined,
  };
}

function deserializeDynamiteSpacesScoringInfo(data: any): DynamiteSpacesScoringInfo {
  return {
    ...data,
    lastMessagePostedTimestampSecs: data["lastMessagePostedTimestampSecs"] !== undefined ? BigInt(data["lastMessagePostedTimestampSecs"]) : undefined,
    lastReadTimestampSecs: data["lastReadTimestampSecs"] !== undefined ? BigInt(data["lastReadTimestampSecs"]) : undefined,
    numAucContacts: data["numAucContacts"] !== undefined ? BigInt(data["numAucContacts"]) : undefined,
    spaceCreationTimestampSecs: data["spaceCreationTimestampSecs"] !== undefined ? BigInt(data["spaceCreationTimestampSecs"]) : undefined,
  };
}

/**
 * A message edit in Dynamite inserts a Babel-only item containing this field.
 */
export interface EditMetadata {
}

export interface EditorClientActionMarkup {
  requestFileScopeForActiveDocument?: RequestFileScopeForActiveDocument;
}

/**
 * A person's email address.
 */
export interface EmailAddress {
  /**
   * If the value of type is custom, this property contains the custom type
   * string.
   */
  customType?: string;
  /**
   * The email address.
   */
  emailAddress?: string;
  /**
   * The URL to send email.
   */
  emailUrl?: string;
  /**
   * Indicates if this is the user's primary email. Only one entry can be
   * marked as primary.
   */
  primary?: boolean;
  /**
   * The type of the email account. Acceptable values are: "custom", "home",
   * "other", "work".
   */
  type?: string;
}

/**
 * Represents a verified owner of the given email address. Note that a single
 * address may have many owners, and a single user may own many addresses. (All
 * lower-case, in display form -- see com.google.gaia.client.GaiaEmail)
 */
export interface EmailOwnerProto {
  email?: string;
}

/**
 * Represents an embedded object in an update. This is a wrapper class that can
 * contain a single specific item proto in an extension field. Think of it as a
 * base class like `Message` in Java. Each item proto must declare that it
 * extends this proto: message ExampleObject { option (item_type) =
 * EXAMPLE_OBJECT; extend EmbedClientItem { optional ExampleObject
 * example_object = ; } } See go/es-embeds for details.
 */
export interface EmbedClientItem {
  /**
   * The canonical ID of the embed. If absent, the canonical ID is equal to the
   * ID; if present, then the canonical ID represents an "equivalence class" of
   * embeds which really refer to the same object. (For example, the URLs
   * http://www.foo.com/ and http://foo.com/ refer to the same object) This
   * field may be updated periodically by background processes.
   */
  canonicalId?: string;
  /**
   * Deep-linking data to take the user to the right place in a mobile app.
   * This is only used for preview and attribution. Links that are specific to a
   * given embed type should live on that specific embed's proto by using Link.
   * See http://goto.google.com/mariana-design.
   */
  deepLinkData?: DeepLinkData;
  /**
   * The ID of the embed. This corresponds to the schema.org ID, as represented
   * in the ItemScope.id field.
   */
  id?: string;
  /**
   * The provenance of the embed, populated when the embed originated from a
   * web fetch. The provenance captures information about the web page the embed
   * had originated, like the URL that was retrieved and the retrieved URL's
   * canonical form. This is useful in the case where the URL shared by the URL
   * redirects (e.g., in the case of a shortened URL).
   */
  provenance?: Provenance;
  /**
   * The ID used to identify the embed during rendering. This field will match
   * ID, if set, otherwise it will be the ID of the parent activity. This field
   * is only populated on the server for client use and is not persisted to
   * storage.
   */
  renderId?: string;
  /**
   * Signature of the embed, used for verification.
   */
  signature?: string;
  /**
   * Transient generic data that will not be saved on the server.
   */
  transientData?: TransientData;
  /**
   * The first value in `type` determines which extension field will be set.
   * When creating an EmbedClientItem, you only need to set the first (primary)
   * type in this field. When the server receives the item, it will populate the
   * full type list using the parent annotations in the ItemType enum.
   */
  type?:  | "UNKNOWN" | "ACTION_V2" | "ADD_ACTION_V2" | "AGGREGATE_RATING_V2" | "ARTICLE_V2" | "ASSESS_ACTION_V2" | "AUDIO_OBJECT_V2" | "BASIC_INTERACTION_V2" | "BLOG_POSTING_V2" | "BLOG_V2" | "BOOK_V2" | "BUY_ACTION_V2" | "CHECK_IN_ACTION_V2" | "CHECKIN_V2" | "COLLEXION_V2" | "COMMENT_ACTION_V2" | "COMMENT_V2" | "COMMUNICATE_ACTION_V2" | "CONSUME_ACTION_V2" | "CREATE_ACTION_V2" | "CREATIVE_WORK_V2" | "DISCOVER_ACTION_V2" | "DOCUMENT_OBJECT_V2" | "DRAWING_OBJECT_V2" | "DRIVE_OBJECT_V2" | "EMOTISHARE_V2" | "ENTRY_POINT_V2" | "EVENT_TIME_V2" | "EVENT_V2" | "FILE_OBJECT_V2" | "FIND_ACTION_V2" | "FINANCIAL_QUOTE_V2" | "FORM_OBJECT_V2" | "GEO_COORDINATES_V2" | "GOOGLE_OFFER_V2" | "HANGOUT_CHAT_MESSAGE" | "HANGOUT_QUOTE" | "HANGOUT_V2" | "HOA_PLUS_EVENT_V2" | "IMAGE_OBJECT_V2" | "INTERACT_ACTION_V2" | "INTERACTION_V2" | "LISTEN_ACTION_V2" | "LOCAL_BUSINESS_V2" | "LOCAL_PLUS_PHOTO_ALBUM_V2" | "MAGAZINE_V2" | "MEDIA_OBJECT_V2" | "MOBILE_APPLICATION_V2" | "MOVIE_V2" | "MUSIC_ALBUM_V2" | "MUSIC_GROUP_V2" | "MUSIC_PLAYLIST_V2" | "MUSIC_RECORDING_V2" | "NEWS_ARTICLE_V2" | "OFFER_V2" | "ORGANIZATION_V2" | "ORGANIZE_ACTION_V2" | "PERSON_V2" | "PLACE_REVIEW_V2" | "PLACE_V2" | "PLAN_ACTION_V2" | "PLAY_MUSIC_ALBUM_V2" | "PLAY_MUSIC_TRACK_V2" | "PLAY_OBJECT_V2" | "PLUS_AUDIO_V2" | "PLUS_EVENT_V2" | "PLUS_MEDIA_COLLECTION_V2" | "PLUS_MEDIA_OBJECT_V2" | "PLUS_PAGE_V2" | "PLUS_PHOTOS_ADDED_TO_COLLECTION_V2" | "PLUS_PHOTO_ALBUM_V2" | "PLUS_PHOTO_COLLECTION_V2" | "PLUS_PHOTO_V2" | "PLUS_POST_V2" | "PLUS_RESHARE_V2" | "PLUS_SOFTWARE_APPLICATION_V2" | "POLL_OPTION_V2" | "POLL_V2" | "POSTAL_ADDRESS_V2" | "PRESENTATION_OBJECT_V2" | "PRODUCT_REVIEW_V2" | "RATING_V2" | "REACT_ACTION_V2" | "RESERVATION_V2" | "RESERVE_ACTION_V2" | "REVIEW_V2" | "REVIEW_ACTION_V2" | "SOFTWARE_APPLICATION_V2" | "SPREADSHEET_OBJECT_V2" | "SQUARE_INVITE_V2" | "SQUARE_V2" | "STICKER_V2" | "STORY_V2" | "THING_V2" | "TRADE_ACTION_V2" | "DEPRECATED_TOUR_OBJECT_V2" | "TV_EPISODE_V2" | "TV_SERIES_V2" | "UPDATE_ACTION_V2" | "VIEW_ACTION_V2" | "VIDEO_OBJECT_V2" | "VIDEO_GALLERY_V2" | "WANT_ACTION_V2" | "WEB_PAGE_V2" | "WRITE_ACTION_V2" | "YOUTUBE_CHANNEL_V2" | "GOOGLE_USER_PHOTO_V2" | "GOOGLE_USER_PHOTO_ALBUM" | "GOOGLE_PHOTO_RECIPE" | "THING" | "CREATIVE_WORK" | "EVENT" | "INTANGIBLE" | "ORGANIZATION" | "PERSON" | "PLACE" | "PRODUCT" | "ARTICLE" | "BLOG_POSTING" | "NEWS_ARTICLE" | "SCHOLARLY_ARTICLE" | "BLOG" | "BOOK" | "COMMENT" | "ITEM_LIST" | "MAP" | "MEDIA_OBJECT" | "AUDIO_OBJECT" | "IMAGE_OBJECT" | "MUSIC_VIDEO_OBJECT" | "VIDEO_OBJECT" | "MOVIE" | "MUSIC_PLAYLIST" | "MUSIC_ALBUM" | "MUSIC_RECORDING" | "PAINTING" | "PHOTOGRAPH" | "RECIPE" | "REVIEW" | "SCULPTURE" | "SOFTWARE_APPLICATION" | "MOBILE_APPLICATION" | "WEB_APPLICATION" | "TV_EPISODE" | "TV_SEASON" | "TV_SERIES" | "WEB_PAGE" | "ABOUT_PAGE" | "CHECKOUT_PAGE" | "COLLECTION_PAGE" | "IMAGE_GALLERY" | "VIDEO_GALLERY" | "CONTACT_PAGE" | "ITEM_PAGE" | "PROFILE_PAGE" | "SEARCH_RESULTS_PAGE" | "WEB_PAGE_ELEMENT" | "SITE_NAVIGATION_ELEMENT" | "TABLE" | "WP_AD_BLOCK" | "WP_FOOTER" | "WP_HEADER" | "WP_SIDEBAR" | "APP_INVITE" | "EMOTISHARE" | "BUSINESS_EVENT" | "CHILDRENS_EVENT" | "COMEDY_EVENT" | "DANCE_EVENT" | "EDUCATION_EVENT" | "FESTIVAL" | "FOOD_EVENT" | "LITERARY_EVENT" | "MUSIC_EVENT" | "SALE_EVENT" | "SOCIAL_EVENT" | "SPORTS_EVENT" | "THEATER_EVENT" | "VISUAL_ARTS_EVENT" | "RESERVATION" | "TRAVEL_EVENT" | "CORPORATION" | "EDUCATIONAL_ORGANIZATION" | "COLLEGE_OR_UNIVERSITY" | "ELEMENTARY_SCHOOL" | "HIGH_SCHOOL" | "MIDDLE_SCHOOL" | "PRESCHOOL" | "SCHOOL" | "GOVERNMENT_ORGANIZATION" | "LOCAL_BUSINESS" | "ANIMAL_SHELTER" | "AUTOMOTIVE_BUSINESS" | "AUTO_BODY_SHOP" | "AUTO_DEALER" | "AUTO_PARTS_STORE" | "AUTO_RENTAL" | "AUTO_REPAIR" | "AUTO_WASH" | "GAS_STATION" | "MOTORCYCLE_DEALER" | "MOTORCYCLE_REPAIR" | "CHILD_CARE" | "DRY_CLEANING_OR_LAUNDRY" | "EMERGENCY_SERVICE" | "FIRE_STATION" | "HOSPITAL" | "POLICE_STATION" | "EMPLOYMENT_AGENGY" | "ENTERTAINMENT_BUSINESS" | "ADULT_ENTERTAINMENT" | "AMUSEMENT_PARK" | "ART_GALLERY" | "CASINO" | "COMEDY_CLUB" | "MOVIE_THEATER" | "NIGHT_CLUB" | "FINANCIAL_SERVICE" | "ACCOUNTING_SERVICE" | "AUTOMATED_TELLER" | "BANK_OR_CREDIT_UNION" | "INSURANCE_AGENCY" | "FOOD_ESTABLISHMENT" | "BAKERY" | "BAR_OR_PUB" | "BREWERY" | "CAFE_OR_COFFEE_SHOP" | "FAST_FOOD_RESTAURANT" | "ICE_CREAM_SHOP" | "RESTAURANT" | "WINERY" | "GOVERNMENT_OFFICE" | "POST_OFFICE" | "HEALTH_AND_BEAUTY_BUSINESS" | "BEAUTY_SALON" | "DAY_SPA" | "HAIR_SALON" | "HEALTH_CLUB" | "NAIL_SALON" | "TATTOO_PARLOR" | "HOME_AND_CONSTRUCTION_BUSINESS" | "ELECTRICIAN" | "GENERAL_CONTRACTOR" | "HVAC_BUSINESS" | "HOUSE_PAINTER" | "LOCKSMITH" | "MOVING_COMPANY" | "PLUMBER" | "ROOFING_CONTRACTOR" | "INTERNET_CAFE" | "LIBRARY" | "LODGING_BUSINESS" | "BED_AND_BREAKFAST" | "HOSTEL" | "HOTEL" | "MOTEL" | "MEDICAL_ORGANIZATION" | "DENTIST" | "MEDICAL_CLINIC" | "OPTICIAN" | "PHARMACY" | "PHYSICIAN" | "VETERINARY_CARE" | "PROFESSIONAL_SERVICE" | "ATTORNEY" | "NOTARY" | "RADIO_STATION" | "REAL_ESTATE_AGENT" | "RECYCLING_CENTER" | "SELF_STORAGE" | "SHOPPING_CENTER" | "SPORTS_ACTIVITY_LOCATION" | "BOWLING_ALLEY" | "EXERCISE_GYM" | "GOLF_COURSE" | "PUBLIC_SWIMMING_POOL" | "SKI_RESORT" | "SPORTS_CLUB" | "STADIUM_OR_ARENA" | "TENNIS_COMPLEX" | "STORE" | "BIKE_STORE" | "BOOK_STORE" | "CLOTHING_STORE" | "COMPUTER_STORE" | "CONVENIENCE_STORE" | "DEPARTMENT_STORE" | "ELECTRONICS_STORE" | "FLORIST" | "FURNITURE_STORE" | "GARDEN_STORE" | "GROCERY_STORE" | "HARDWARE_STORE" | "HOBBY_SHOP" | "HOME_GOODS_STORE" | "JEWELRY_STORE" | "LIQUOR_STORE" | "MENS_CLOTHING_STORE" | "MOBILE_PHONE_STORE" | "MOVIE_RENTAL_STORE" | "MUSIC_STORE" | "OFFICE_EQUIPMENT_STORE" | "OUTLET_STORE" | "PAWN_SHOP" | "PET_STORE" | "SHOE_STORE" | "SPORTING_GOODS_STORE" | "TIRE_SHOP" | "TOY_STORE" | "WHOLESALE_STORE" | "TELEVISION_STATION" | "TOURIST_INFORMATION_CENTER" | "TRAVEL_AGENCY" | "PERFORMING_GROUP" | "MUSIC_GROUP" | "ADMINISTRATIVE_AREA" | "CITY" | "COUNTRY" | "STATE" | "CIVIC_STRUCTURE" | "AIRPORT" | "AQUARIUM" | "BEACH" | "BUS_STATION" | "BUS_STOP" | "CAMPGROUND" | "CEMETERY" | "CREMATORIUM" | "EVENT_VENUE" | "GOVERNMENT_BUILDING" | "CITY_HALL" | "COURTHOUSE" | "DEFENCE_ESTABLISHMENT" | "EMBASSY" | "LEGISLATIVE_BUILDING" | "MUSEUM" | "MUSIC_VENUE" | "PARK" | "PARKING_FACILITY" | "PERFORMING_ARTS_THEATER" | "PLACE_OF_WORSHIP" | "BUDDHIST_TEMPLE" | "CATHOLIC_CHURCH" | "CHURCH" | "HINDU_TEMPLE" | "MOSQUE" | "SYNAGOGUE" | "PLAYGROUND" | "R_V_PARK" | "RESIDENCE" | "APARTMENT_COMPLEX" | "GATED_RESIDENCE_COMMUNITY" | "SINGLE_FAMILY_RESIDENCE" | "TOURIST_ATTRACTION" | "SUBWAY_STATION" | "TAXI_STAND" | "TRAIN_STATION" | "ZOO" | "LANDFORM" | "BODY_OF_WATER" | "CANAL" | "LAKE_BODY_OF_WATER" | "OCEAN_BODY_OF_WATER" | "POND" | "RESERVOIR" | "RIVER_BODY_OF_WATER" | "SEA_BODY_OF_WATER" | "WATERFALL" | "CONTINENT" | "MOUNTAIN" | "VOLCANO" | "LANDMARKS_OR_HISTORICAL_BUILDINGS" | "USER_INTERACTION" | "USER_PLUS_ONES" | "ENUMERATION" | "BOOK_FORMAT_TYPE" | "ITEM_AVAILABILITY" | "OFFER_ITEM_CONDITION" | "JOB_POSTING" | "LANGUAGE" | "OFFER" | "QUANTITY" | "DISTANCE" | "DURATION" | "ENERGY" | "MASS" | "RATING" | "AGGREGATE_RATING" | "STRUCTURED_VALUE" | "CONTACT_POINT" | "POSTAL_ADDRESS" | "GEO_COORDINATES" | "GEO_SHAPE" | "NUTRITION_INFORMATION" | "PRESENTATION_OBJECT" | "DOCUMENT_OBJECT" | "SPREADSHEET_OBJECT" | "FORM_OBJECT" | "DRAWING_OBJECT" | "PLACE_REVIEW" | "FILE_OBJECT" | "PLAY_MUSIC_TRACK" | "PLAY_MUSIC_ALBUM" | "MAGAZINE" | "CAROUSEL_FRAME" | "PLUS_EVENT" | "HANGOUT" | "HANGOUT_BROADCAST" | "HANGOUT_CONSUMER" | "CHECKIN" | "EXAMPLE_OBJECT" | "SQUARE" | "SQUARE_INVITE" | "PLUS_PHOTO" | "PLUS_PHOTO_ALBUM" | "LOCAL_PLUS_PHOTO_ALBUM" | "PRODUCT_REVIEW" | "FINANCIAL_QUOTE" | "DEPRECATED_TOUR_OBJECT" | "PLUS_PAGE" | "GOOGLE_CHART" | "PLUS_PHOTOS_ADDED_TO_COLLECTION" | "RECOMMENDED_PEOPLE" | "PLUS_POST" | "DATE" | "DRIVE_OBJECT_COLLECTION" | "NEWS_MEDIA_ORGANIZATION" | "DYNAMITE_ATTACHMENT_METADATA" | "DYNAMITE_MESSAGE_METADATA"[];
}

function serializeEmbedClientItem(data: any): EmbedClientItem {
  return {
    ...data,
    deepLinkData: data["deepLinkData"] !== undefined ? serializeDeepLinkData(data["deepLinkData"]) : undefined,
    provenance: data["provenance"] !== undefined ? serializeProvenance(data["provenance"]) : undefined,
  };
}

function deserializeEmbedClientItem(data: any): EmbedClientItem {
  return {
    ...data,
    deepLinkData: data["deepLinkData"] !== undefined ? deserializeDeepLinkData(data["deepLinkData"]) : undefined,
    provenance: data["provenance"] !== undefined ? deserializeProvenance(data["provenance"]) : undefined,
  };
}

/**
 * Used to provide a search operator for enum properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched. For example, if you provide no operator for
 * a *priority* enum property with possible values *p0* and *p1*, a query that
 * contains the term *p0* returns items that have *p0* as the value of the
 * *priority* property, as well as any items that contain the string *p0* in
 * other fields. If you provide an operator name for the enum, such as
 * *priority*, then search users can use that operator to refine results to only
 * items that have *p0* as this property's value, with the query *priority:p0*.
 */
export interface EnumOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * enum property. For example, if operatorName is *priority* and the
   * property's name is *priorityVal*, then queries like *priority:<value>* show
   * results only where the value of the property named *priorityVal* matches
   * *<value>*. By contrast, a search that uses the same *<value>* without an
   * operator returns all items where *<value>* matches the value of any String
   * properties or text within the content field for the item. The operator name
   * can only contain lowercase letters (a-z). The maximum length is 32
   * characters.
   */
  operatorName?: string;
}

/**
 * The options for enum properties, which allow you to define a restricted set
 * of strings to match user queries, set rankings for those string values, and
 * define an operator name to be paired with those strings so that users can
 * narrow results to only items with a specific value. For example, for items in
 * a request tracking system with priority information, you could define *p0* as
 * an allowable enum value and tie this enum to the operator name *priority* so
 * that search users could add *priority:p0* to their query to restrict the set
 * of results to only those items indexed with the value *p0*.
 */
export interface EnumPropertyOptions {
  /**
   * If set, describes how the enum should be used as a search operator.
   */
  operatorOptions?: EnumOperatorOptions;
  /**
   * Used to specify the ordered ranking for the enumeration that determines
   * how the integer values provided in the possible EnumValuePairs are used to
   * rank results. If specified, integer values must be provided for all
   * possible EnumValuePair values given for this property. Can only be used if
   * isRepeatable is false.
   */
  orderedRanking?:  | "NO_ORDER" | "ASCENDING" | "DESCENDING";
  /**
   * The list of possible values for the enumeration property. All
   * EnumValuePairs must provide a string value. If you specify an integer value
   * for one EnumValuePair, then all possible EnumValuePairs must provide an
   * integer value. Both the string value and integer value must be unique over
   * all possible values. Once set, possible values cannot be removed or
   * modified. If you supply an ordered ranking and think you might insert
   * additional enum values in the future, leave gaps in the initial integer
   * values to allow adding a value in between previously registered values. The
   * maximum number of elements is 100.
   */
  possibleValues?: EnumValuePair[];
}

/**
 * The enumeration value pair defines two things: a required string value and
 * an optional integer value. The string value defines the necessary query term
 * required to retrieve that item, such as *p0* for a priority item. The integer
 * value determines the ranking of that string value relative to other
 * enumerated values for the same property. For example, you might associate
 * *p0* with *0* and define another enum pair such as *p1* and *1*. You must use
 * the integer value in combination with ordered ranking to set the ranking of a
 * given value relative to other enumerated values for the same property name.
 * Here, a ranking order of DESCENDING for *priority* properties results in a
 * ranking boost for items indexed with a value of *p0* compared to items
 * indexed with a value of *p1*. Without a specified ranking order, the integer
 * value has no effect on item ranking.
 */
export interface EnumValuePair {
  /**
   * The integer value of the EnumValuePair which must be non-negative.
   * Optional.
   */
  integerValue?: number;
  /**
   * The string value of the EnumValuePair. The maximum length is 32
   * characters.
   */
  stringValue?: string;
}

/**
 * List of enum values.
 */
export interface EnumValues {
  /**
   * The maximum allowable length for string values is 32 characters.
   */
  values?: string[];
}

/**
 * Error information about the response.
 */
export interface ErrorInfo {
  errorMessages?: ErrorMessage[];
}

/**
 * Error message per source response.
 */
export interface ErrorMessage {
  errorMessage?: string;
  source?: Source;
}

export interface EventAnnotation {
  type?: number;
  value?: string;
}

/**
 * Represents the invitees or other users associated with a Google+ Event (see
 * http://goto/events-backend-design).
 */
export interface EventProto {
  /**
   * Event IDs consist of alphanumeric characters and colons. Currently
   * required.
   */
  eventId?: string;
  /**
   * The type of Event members to consider, e.g. "all members" vs. "owners" vs.
   * "admins". These are defined by legacy_relation_id values in
   * social.graph.storage.EdgeTypeEnum.EdgeType enum options in
   * social/graph/storage/proto/id.proto. See event.pb (defined in
   * production/config/cdd/socialgraph/mixer_config/prod/node_type_config) for
   * all valid edge types associated with event. Currently required.
   */
  memberType?: number;
}

/**
 * A bucket in a facet is the basic unit of operation. A bucket can comprise
 * either a single value OR a contiguous range of values, depending on the type
 * of the field bucketed. FacetBucket is currently used only for returning the
 * response object.
 */
export interface FacetBucket {
  /**
   * Number of results that match the bucket value. Counts are only returned
   * for searches when count accuracy is ensured. Cloud Search does not
   * guarantee facet counts for any query and facet counts might be present only
   * intermittently, even for identical queries. Do not build dependencies on
   * facet count existence; instead use facet ount percentages which are always
   * returned.
   */
  count?: number;
  /**
   * Filter to be passed in the search request if the corresponding bucket is
   * selected.
   */
  filter?: Filter;
  /**
   * Percent of results that match the bucket value. The returned value is
   * between (0-100], and is rounded down to an integer if fractional. If the
   * value is not explicitly returned, it represents a percentage value that
   * rounds to 0. Percentages are returned for all searches, but are an
   * estimate. Because percentages are always returned, you should render
   * percentages instead of counts.
   */
  percentage?: number;
  value?: Value;
}

function serializeFacetBucket(data: any): FacetBucket {
  return {
    ...data,
    filter: data["filter"] !== undefined ? serializeFilter(data["filter"]) : undefined,
    value: data["value"] !== undefined ? serializeValue(data["value"]) : undefined,
  };
}

function deserializeFacetBucket(data: any): FacetBucket {
  return {
    ...data,
    filter: data["filter"] !== undefined ? deserializeFilter(data["filter"]) : undefined,
    value: data["value"] !== undefined ? deserializeValue(data["value"]) : undefined,
  };
}

/**
 * Specifies operators to return facet results for. There will be one
 * FacetResult for every source_name/object_type/operator_name combination.
 */
export interface FacetOptions {
  /**
   * If set, describes integer faceting options for the given integer property.
   * The corresponding integer property in the schema should be marked
   * isFacetable. The number of buckets returned would be minimum of this and
   * num_facet_buckets.
   */
  integerFacetingOptions?: IntegerFacetingOptions;
  /**
   * Maximum number of facet buckets that should be returned for this facet.
   * Defaults to 10. Maximum value is 100.
   */
  numFacetBuckets?: number;
  /**
   * If object_type is set, only those objects of that type will be used to
   * compute facets. If empty, then all objects will be used to compute facets.
   */
  objectType?: string;
  /**
   * The name of the operator chosen for faceting. @see
   * cloudsearch.SchemaPropertyOptions
   */
  operatorName?: string;
  /**
   * Source name to facet on. Format: datasources/{source_id} If empty, all
   * data sources will be used.
   */
  sourceName?: string;
}

function serializeFacetOptions(data: any): FacetOptions {
  return {
    ...data,
    integerFacetingOptions: data["integerFacetingOptions"] !== undefined ? serializeIntegerFacetingOptions(data["integerFacetingOptions"]) : undefined,
  };
}

function deserializeFacetOptions(data: any): FacetOptions {
  return {
    ...data,
    integerFacetingOptions: data["integerFacetingOptions"] !== undefined ? deserializeIntegerFacetingOptions(data["integerFacetingOptions"]) : undefined,
  };
}

/**
 * Source specific facet response
 */
export interface FacetResult {
  /**
   * FacetBuckets for values in response containing at least a single result
   * with the corresponding filter.
   */
  buckets?: FacetBucket[];
  /**
   * Object type for which facet results are returned. Can be empty.
   */
  objectType?: string;
  /**
   * The name of the operator chosen for faceting. @see
   * cloudsearch.SchemaPropertyOptions
   */
  operatorName?: string;
  /**
   * Source name for which facet results are returned. Will not be empty.
   */
  sourceName?: string;
}

function serializeFacetResult(data: any): FacetResult {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (serializeFacetBucket(item))) : undefined,
  };
}

function deserializeFacetResult(data: any): FacetResult {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (deserializeFacetBucket(item))) : undefined,
  };
}

export interface FieldViolation {
  /**
   * The description of the error.
   */
  description?: string;
  /**
   * Path of field with violation.
   */
  field?: string;
}

/**
 * A generic way of expressing filters in a query, which supports two
 * approaches: **1. Setting a ValueFilter.** The name must match an
 * operator_name defined in the schema for your data source. **2. Setting a
 * CompositeFilter.** The filters are evaluated using the logical operator. The
 * top-level operators can only be either an AND or a NOT. AND can appear only
 * at the top-most level. OR can appear only under a top-level AND.
 */
export interface Filter {
  compositeFilter?: CompositeFilter;
  valueFilter?: ValueFilter;
}

function serializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? serializeCompositeFilter(data["compositeFilter"]) : undefined,
    valueFilter: data["valueFilter"] !== undefined ? serializeValueFilter(data["valueFilter"]) : undefined,
  };
}

function deserializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? deserializeCompositeFilter(data["compositeFilter"]) : undefined,
    valueFilter: data["valueFilter"] !== undefined ? deserializeValueFilter(data["valueFilter"]) : undefined,
  };
}

/**
 * A filter was created.
 */
export interface FilterCreated {
}

/**
 * A filter was deleted.
 */
export interface FilterDeleted {
}

/**
 * Filter options to be applied on query.
 */
export interface FilterOptions {
  /**
   * Generic filter to restrict the search, such as `lang:en`, `site:xyz`.
   */
  filter?: Filter;
  /**
   * If object_type is set, only objects of that type are returned. This should
   * correspond to the name of the object that was registered within the
   * definition of schema. The maximum length is 256 characters.
   */
  objectType?: string;
}

function serializeFilterOptions(data: any): FilterOptions {
  return {
    ...data,
    filter: data["filter"] !== undefined ? serializeFilter(data["filter"]) : undefined,
  };
}

function deserializeFilterOptions(data: any): FilterOptions {
  return {
    ...data,
    filter: data["filter"] !== undefined ? deserializeFilter(data["filter"]) : undefined,
  };
}

/**
 * HistoryRecord for changes associated with a filter, namely: FILTER_CREATED
 * FILTER_DELETED
 */
export interface FilterUpdate {
  filterCreated?: FilterCreated;
  filterDeleted?: FilterDeleted;
  filterId?: string;
}

/**
 * A persistent (sticky) footer that is added to the bottom of the card.
 */
export interface FixedFooter {
  buttons?: Button[];
  primaryButton?: TextButton;
  secondaryButton?: TextButton;
}

export interface Folder {
  /**
   * Folder mapping id.
   */
  id?: bigint;
  /**
   * One for each copy of the message in the IMAP folder.
   */
  message?: ImapsyncFolderAttributeFolderMessage[];
}

function serializeFolder(data: any): Folder {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    message: data["message"] !== undefined ? data["message"].map((item: any) => (serializeImapsyncFolderAttributeFolderMessage(item))) : undefined,
  };
}

function deserializeFolder(data: any): Folder {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    message: data["message"] !== undefined ? data["message"].map((item: any) => (deserializeImapsyncFolderAttributeFolderMessage(item))) : undefined,
  };
}

/**
 * This is the content of //imapsync/folder attribute.
 */
export interface FolderAttribute {
  /**
   * List of all IMAP folders where the message presents.
   */
  folder?: Folder[];
}

function serializeFolderAttribute(data: any): FolderAttribute {
  return {
    ...data,
    folder: data["folder"] !== undefined ? data["folder"].map((item: any) => (serializeFolder(item))) : undefined,
  };
}

function deserializeFolderAttribute(data: any): FolderAttribute {
  return {
    ...data,
    folder: data["folder"] !== undefined ? data["folder"].map((item: any) => (deserializeFolder(item))) : undefined,
  };
}

export interface FormAction {
  /**
   * Apps script function that should be invoked in the developer's apps script
   * when the containing element is clicked/activated.
   */
  actionMethodName?: string;
  loadIndicator?:  | "SPINNER" | "NONE";
  parameters?: ActionParameter[];
  /**
   * Indicates whether form values persist after the action. When false, the
   * Apps Script is responsible for persisting values, by setting any form field
   * values using the formInputs in the event. Disabling this behavior can be
   * used if the add-on needs the ability to clear form fields, for example, as
   * with persistent values, there is no means for clearing existing values.
   * When disabling persistent values, it is strongly recommended that the
   * add-on use LoadIndicator.SPINNER for all events, as this locks the UI to
   * ensure no changes are made by the user while the action is being processed.
   * When using LoadIndicator.NONE for any of the actions, persistent values are
   * recommended, as it ensures that any changes made by the user after form /
   * on change actions are sent to the server are not overwritten by the
   * response. Persistent values disabled by default. While we recommend
   * persistent values be used in the typical use case, we do not enable by
   * default, as doing so would change the current behavior of existing add-ons
   * in prod.
   */
  persistValues?: boolean;
}

/**
 * Annotation metadata for markup formatting
 */
export interface FormatMetadata {
  /**
   * Font color is set if and only if format_type is FONT_COLOR. The components
   * are stored as (alpha << 24) | (red << 16) | (green << 8) | blue. Clients
   * should always set the alpha component to 0xFF. NEXT TAG: 3
   */
  fontColor?: number;
  /**
   * 
   * LINT.ThenChange(//depot/google3/apps/dynamite/v1/web/datakeys/annotated_span.proto)
   */
  formatType?:  | "TYPE_UNSPECIFIED" | "BOLD" | "ITALIC" | "STRIKE" | "SOURCE_CODE" | "MONOSPACE" | "HIDDEN" | "MONOSPACE_BLOCK" | "UNDERLINE" | "FONT_COLOR" | "BULLETED_LIST" | "BULLETED_LIST_ITEM" | "CLIENT_HIDDEN";
}

/**
 * Formatting information for a segment.
 */
export interface Formatting {
  bold?: boolean;
  /**
   * This indicates that the segment should be rendered as highlighted or
   * visually emphasized.
   */
  highlight?: boolean;
  italics?: boolean;
  strikethrough?: boolean;
  /**
   * If set, this indicates that the segment should be rendered with the
   * specified style. The absence of an explicit style represents "no style",
   * i.e. the segment can be rendered with the default style chosen by the
   * application.
   */
  style?:  | "UNKNOWN_STYLE" | "HEADING_1" | "HEADING_2" | "HEADING_3" | "HEADING_4";
  underline?: boolean;
}

/**
 * Indicates which freshness property to use when adjusting search ranking for
 * an item. Fresher, more recent dates indicate higher quality. Use the
 * freshness option property that best works with your data. For fileshare
 * documents, last modified time is most relevant. For calendar event data, the
 * time when the event occurs is a more relevant freshness indicator. In this
 * way, calendar events that occur closer to the time of the search query are
 * considered higher quality and ranked accordingly.
 */
export interface FreshnessOptions {
  /**
   * The duration after which an object should be considered stale. The default
   * value is 180 days (in seconds).
   */
  freshnessDuration?: number /* Duration */;
  /**
   * This property indicates the freshness level of the object in the index. If
   * set, this property must be a top-level property within the property
   * definitions and it must be a timestamp type or date type. Otherwise, the
   * Indexing API uses updateTime as the freshness indicator. The maximum length
   * is 256 characters. When a property is used to calculate freshness, the
   * value defaults to 2 years from the current time.
   */
  freshnessProperty?: string;
}

function serializeFreshnessOptions(data: any): FreshnessOptions {
  return {
    ...data,
    freshnessDuration: data["freshnessDuration"] !== undefined ? data["freshnessDuration"] : undefined,
  };
}

function deserializeFreshnessOptions(data: any): FreshnessOptions {
  return {
    ...data,
    freshnessDuration: data["freshnessDuration"] !== undefined ? data["freshnessDuration"] : undefined,
  };
}

/**
 * The Item message is the read interface for user data (traditionally referred
 * to as a "message", such as a mail message or a chat message, but generalized
 * to encompass other types such as tasks) and stored in Tingle. Each Item is
 * associated with a single Thread. An Item contains three classes of data. (1):
 * Item "fields" are common to items of all message types (e.g. mail, chat,
 * task, etc.) and are identified by the ItemFieldSpec.FetchType enum when
 * fetching Items. (2): Item "attributes" represent data associated with an Item
 * that is stored on behalf of the client but to which the fusebox and storage
 * layers are otherwise agnostic. (3): Item "parts" are application-defined
 * protocol buffers that affect how the Item is indexed. Item parts are
 * referenced as extensions to the ItemParts message. By default the application
 * specifies the index terms associated with an Item part. For performance
 * sensitive applications, the storage layer can be modified to understand and
 * index data types natively.
 */
export interface FuseboxItem {
  attributes?: Attributes;
  /**
   * The creation time of the Item in micro seconds.
   */
  creationTimeMicroseconds?: bigint;
  history?: History;
  /**
   * The key is used to refer to an item. Note that every field of the MultiKey
   * is unique to the Item, and thus the Item can be looked up by any of the
   * fields.
   */
  itemKey?: MultiKey;
  labels?: Labels;
  /**
   * The modification time of the Item in micro seconds. Modifications to the
   * message include label addition, deletion, etc.
   */
  lastModificationTimeUs?: bigint;
  /**
   * go/lockpicker Locker counterpart of references.
   */
  lockerReferences?: References;
  matchInfo?: MatchInfo;
  /**
   * Type-specific data are represented as extensions to the ItemParts message.
   */
  parts?: ItemParts;
  /**
   * The read timestamp at which this item was read. This is a temporary field
   * used to check if two items streamed during dual reading were read at the
   * same timestamp. This will be populated by Fusebox RPCs. "DO NOT USE UNLESS
   * YOU TALK TO FUSEBOX TEAM (gmail-fusebox@)".
   */
  readTs?: bigint;
  /**
   * References to attachments, video attachments in Youtube and Hangout
   * messages.
   */
  references?: References;
  /**
   * The snippet is a brief bit of text describing this item.
   */
  snippet?: string;
  /**
   * The key of the Thread with which this Item is associated.
   */
  threadKey?: MultiKey;
  /**
   * A base64 encoded and encrypted string generated from the Gaia Id and the
   * thread id. Used to generate the permalink for this thread, exposed from
   * Gmail API.
   */
  threadLocator?: string;
  triggers?: Triggers;
  /**
   * The latest history operation id that resulted in a mutation of the item.
   */
  version?: bigint;
}

function serializeFuseboxItem(data: any): FuseboxItem {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? serializeAttributes(data["attributes"]) : undefined,
    creationTimeMicroseconds: data["creationTimeMicroseconds"] !== undefined ? String(data["creationTimeMicroseconds"]) : undefined,
    history: data["history"] !== undefined ? serializeHistory(data["history"]) : undefined,
    itemKey: data["itemKey"] !== undefined ? serializeMultiKey(data["itemKey"]) : undefined,
    lastModificationTimeUs: data["lastModificationTimeUs"] !== undefined ? String(data["lastModificationTimeUs"]) : undefined,
    lockerReferences: data["lockerReferences"] !== undefined ? serializeReferences(data["lockerReferences"]) : undefined,
    readTs: data["readTs"] !== undefined ? String(data["readTs"]) : undefined,
    references: data["references"] !== undefined ? serializeReferences(data["references"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? serializeMultiKey(data["threadKey"]) : undefined,
    triggers: data["triggers"] !== undefined ? serializeTriggers(data["triggers"]) : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeFuseboxItem(data: any): FuseboxItem {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? deserializeAttributes(data["attributes"]) : undefined,
    creationTimeMicroseconds: data["creationTimeMicroseconds"] !== undefined ? BigInt(data["creationTimeMicroseconds"]) : undefined,
    history: data["history"] !== undefined ? deserializeHistory(data["history"]) : undefined,
    itemKey: data["itemKey"] !== undefined ? deserializeMultiKey(data["itemKey"]) : undefined,
    lastModificationTimeUs: data["lastModificationTimeUs"] !== undefined ? BigInt(data["lastModificationTimeUs"]) : undefined,
    lockerReferences: data["lockerReferences"] !== undefined ? deserializeReferences(data["lockerReferences"]) : undefined,
    readTs: data["readTs"] !== undefined ? BigInt(data["readTs"]) : undefined,
    references: data["references"] !== undefined ? deserializeReferences(data["references"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? deserializeMultiKey(data["threadKey"]) : undefined,
    triggers: data["triggers"] !== undefined ? deserializeTriggers(data["triggers"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * In the context of a search, the MatchInfo contains information about which
 * Items matched the query.
 */
export interface FuseboxItemThreadMatchInfo {
  /**
   * If SearchQuery.Options.Clustering is present, the query will be treated as
   * a cluster query, and this field may be populated with the cluster ID of the
   * cluster to which this thread belongs, if any. The cluster ID will be a
   * label on the message.
   */
  clusterId?: string;
  /**
   * The server id of the last item that matched the query. This is always set,
   * regardless of the compute_matching_items_per_thread option. This is the
   * value by which search results are sorted, in descending (i.e. newest first)
   * order.
   */
  lastMatchingItemId?: bigint;
  /**
   * The MultiKey of the last item that matched the query. This is always set,
   * regardless of the compute_matching_items_per_thread option. This is the
   * value by which search results are sorted, in descending (i.e. newest first)
   * order.
   */
  lastMatchingItemKey?: MultiKey;
  /**
   * If SearchQuery.Options.compute_matching_items_per_thread, this field will
   * contain the keys of all items that matched the query, in ascending order.
   * Note that this option requires extra computation.
   */
  matchingItemKey?: MultiKey[];
  /**
   * The rank of this ItemThread in the result set of the query. This rank may
   * be used to sort ItemThreads in proper order. Ranks are specific to a query,
   * and stable for a given query at a specific time.
   */
  rank?: Rank;
}

function serializeFuseboxItemThreadMatchInfo(data: any): FuseboxItemThreadMatchInfo {
  return {
    ...data,
    lastMatchingItemId: data["lastMatchingItemId"] !== undefined ? String(data["lastMatchingItemId"]) : undefined,
    lastMatchingItemKey: data["lastMatchingItemKey"] !== undefined ? serializeMultiKey(data["lastMatchingItemKey"]) : undefined,
    matchingItemKey: data["matchingItemKey"] !== undefined ? data["matchingItemKey"].map((item: any) => (serializeMultiKey(item))) : undefined,
    rank: data["rank"] !== undefined ? serializeRank(data["rank"]) : undefined,
  };
}

function deserializeFuseboxItemThreadMatchInfo(data: any): FuseboxItemThreadMatchInfo {
  return {
    ...data,
    lastMatchingItemId: data["lastMatchingItemId"] !== undefined ? BigInt(data["lastMatchingItemId"]) : undefined,
    lastMatchingItemKey: data["lastMatchingItemKey"] !== undefined ? deserializeMultiKey(data["lastMatchingItemKey"]) : undefined,
    matchingItemKey: data["matchingItemKey"] !== undefined ? data["matchingItemKey"].map((item: any) => (deserializeMultiKey(item))) : undefined,
    rank: data["rank"] !== undefined ? deserializeRank(data["rank"]) : undefined,
  };
}

/**
 * If the Value field is not set this means the pref did not exist.
 */
export interface FuseboxPrefUpdatePreState {
  value?: Uint8Array;
}

function serializeFuseboxPrefUpdatePreState(data: any): FuseboxPrefUpdatePreState {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeFuseboxPrefUpdatePreState(data: any): FuseboxPrefUpdatePreState {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

export interface GaiaGroupProto {
  groupId?: bigint;
}

function serializeGaiaGroupProto(data: any): GaiaGroupProto {
  return {
    ...data,
    groupId: data["groupId"] !== undefined ? String(data["groupId"]) : undefined,
  };
}

function deserializeGaiaGroupProto(data: any): GaiaGroupProto {
  return {
    ...data,
    groupId: data["groupId"] !== undefined ? BigInt(data["groupId"]) : undefined,
  };
}

/**
 * A Gaia account, which may represent a user, device, service account, etc.
 * For prod (@prod.google.com) accounts, use MdbUserProto instead.
 */
export interface GaiaUserProto {
  userId?: bigint;
}

function serializeGaiaUserProto(data: any): GaiaUserProto {
  return {
    ...data,
    userId: data["userId"] !== undefined ? String(data["userId"]) : undefined,
  };
}

function deserializeGaiaUserProto(data: any): GaiaUserProto {
  return {
    ...data,
    userId: data["userId"] !== undefined ? BigInt(data["userId"]) : undefined,
  };
}

/**
 * Details on the third-party interoperability settings for the meeting space.
 */
export interface GatewayAccess {
  /**
   * Whether third-party gateway accesses are enabled for this meeting space.
   * If enabled, the actual access code can be retrieved by calling the
   * GetGatewayAccess RPC method.
   */
  enabled?: boolean;
}

/**
 * Details how to join the conference via a SIP gateway.
 */
export interface GatewaySipAccess {
  /**
   * Permanent numeric code for manual entry on specially configured devices,
   * currently the same as the PSTN "Universal pin".
   */
  sipAccessCode?: string;
  /**
   * The SIP URI the conference can be reached through. The string is on one of
   * the formats: "sip:@" "sips:@" where currently is the 13-digit universal pin
   * (with the future option to support using a Meet meeting code as well), and
   * is a valid address to be resolved using a DNS SRV lookup, or a dotted quad.
   */
  uri?: string;
}

export interface GetCustomerIndexStatsResponse {
  /**
   * Average item count for the given date range for which billing is done.
   */
  averageIndexedItemCount?: bigint;
  /**
   * Summary of indexed item counts, one for each day in the requested range.
   */
  stats?: CustomerIndexStats[];
}

function serializeGetCustomerIndexStatsResponse(data: any): GetCustomerIndexStatsResponse {
  return {
    ...data,
    averageIndexedItemCount: data["averageIndexedItemCount"] !== undefined ? String(data["averageIndexedItemCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeCustomerIndexStats(item))) : undefined,
  };
}

function deserializeGetCustomerIndexStatsResponse(data: any): GetCustomerIndexStatsResponse {
  return {
    ...data,
    averageIndexedItemCount: data["averageIndexedItemCount"] !== undefined ? BigInt(data["averageIndexedItemCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeCustomerIndexStats(item))) : undefined,
  };
}

export interface GetCustomerQueryStatsResponse {
  stats?: CustomerQueryStats[];
  /**
   * Total successful query count (status code 200) for the given date range.
   */
  totalQueryCount?: bigint;
}

function serializeGetCustomerQueryStatsResponse(data: any): GetCustomerQueryStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeCustomerQueryStats(item))) : undefined,
    totalQueryCount: data["totalQueryCount"] !== undefined ? String(data["totalQueryCount"]) : undefined,
  };
}

function deserializeGetCustomerQueryStatsResponse(data: any): GetCustomerQueryStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeCustomerQueryStats(item))) : undefined,
    totalQueryCount: data["totalQueryCount"] !== undefined ? BigInt(data["totalQueryCount"]) : undefined,
  };
}

/**
 * Response format for search application stats for a customer.
 */
export interface GetCustomerSearchApplicationStatsResponse {
  /**
   * Average search application count for the given date range.
   */
  averageSearchApplicationCount?: bigint;
  /**
   * Search application stats by date.
   */
  stats?: CustomerSearchApplicationStats[];
}

function serializeGetCustomerSearchApplicationStatsResponse(data: any): GetCustomerSearchApplicationStatsResponse {
  return {
    ...data,
    averageSearchApplicationCount: data["averageSearchApplicationCount"] !== undefined ? String(data["averageSearchApplicationCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeCustomerSearchApplicationStats(item))) : undefined,
  };
}

function deserializeGetCustomerSearchApplicationStatsResponse(data: any): GetCustomerSearchApplicationStatsResponse {
  return {
    ...data,
    averageSearchApplicationCount: data["averageSearchApplicationCount"] !== undefined ? BigInt(data["averageSearchApplicationCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeCustomerSearchApplicationStats(item))) : undefined,
  };
}

export interface GetCustomerSessionStatsResponse {
  stats?: CustomerSessionStats[];
}

function serializeGetCustomerSessionStatsResponse(data: any): GetCustomerSessionStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeCustomerSessionStats(item))) : undefined,
  };
}

function deserializeGetCustomerSessionStatsResponse(data: any): GetCustomerSessionStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeCustomerSessionStats(item))) : undefined,
  };
}

export interface GetCustomerUserStatsResponse {
  stats?: CustomerUserStats[];
}

function serializeGetCustomerUserStatsResponse(data: any): GetCustomerUserStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeCustomerUserStats(item))) : undefined,
  };
}

function deserializeGetCustomerUserStatsResponse(data: any): GetCustomerUserStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeCustomerUserStats(item))) : undefined,
  };
}

export interface GetDataSourceIndexStatsResponse {
  /**
   * Average item count for the given date range for which billing is done.
   */
  averageIndexedItemCount?: bigint;
  /**
   * Summary of indexed item counts, one for each day in the requested range.
   */
  stats?: DataSourceIndexStats[];
}

function serializeGetDataSourceIndexStatsResponse(data: any): GetDataSourceIndexStatsResponse {
  return {
    ...data,
    averageIndexedItemCount: data["averageIndexedItemCount"] !== undefined ? String(data["averageIndexedItemCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeDataSourceIndexStats(item))) : undefined,
  };
}

function deserializeGetDataSourceIndexStatsResponse(data: any): GetDataSourceIndexStatsResponse {
  return {
    ...data,
    averageIndexedItemCount: data["averageIndexedItemCount"] !== undefined ? BigInt(data["averageIndexedItemCount"]) : undefined,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeDataSourceIndexStats(item))) : undefined,
  };
}

/**
 * Response format for getting query stats for a search application between
 * given dates.
 */
export interface GetSearchApplicationQueryStatsResponse {
  /**
   * Query stats per date for a search application.
   */
  stats?: SearchApplicationQueryStats[];
  /**
   * Total successful query count (status code 200) for the given date range.
   */
  totalQueryCount?: bigint;
}

function serializeGetSearchApplicationQueryStatsResponse(data: any): GetSearchApplicationQueryStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeSearchApplicationQueryStats(item))) : undefined,
    totalQueryCount: data["totalQueryCount"] !== undefined ? String(data["totalQueryCount"]) : undefined,
  };
}

function deserializeGetSearchApplicationQueryStatsResponse(data: any): GetSearchApplicationQueryStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeSearchApplicationQueryStats(item))) : undefined,
    totalQueryCount: data["totalQueryCount"] !== undefined ? BigInt(data["totalQueryCount"]) : undefined,
  };
}

export interface GetSearchApplicationSessionStatsResponse {
  stats?: SearchApplicationSessionStats[];
}

function serializeGetSearchApplicationSessionStatsResponse(data: any): GetSearchApplicationSessionStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeSearchApplicationSessionStats(item))) : undefined,
  };
}

function deserializeGetSearchApplicationSessionStatsResponse(data: any): GetSearchApplicationSessionStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeSearchApplicationSessionStats(item))) : undefined,
  };
}

export interface GetSearchApplicationUserStatsResponse {
  stats?: SearchApplicationUserStats[];
}

function serializeGetSearchApplicationUserStatsResponse(data: any): GetSearchApplicationUserStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (serializeSearchApplicationUserStats(item))) : undefined,
  };
}

function deserializeGetSearchApplicationUserStatsResponse(data: any): GetSearchApplicationUserStatsResponse {
  return {
    ...data,
    stats: data["stats"] !== undefined ? data["stats"].map((item: any) => (deserializeSearchApplicationUserStats(item))) : undefined,
  };
}

export interface GmailClientActionMarkup {
  addonComposeUiActionMarkup?: AddonComposeUiActionMarkup;
  openCreatedDraftActionMarkup?: OpenCreatedDraftActionMarkup;
  taskAction?: TaskActionMarkup;
  updateDraftActionMarkup?: UpdateDraftActionMarkup;
}

/**
 * The markup for developers to specify the contents of a contextual AddOn.
 */
export interface GoogleChatV1ContextualAddOnMarkup {
  /**
   * A list of cards. A card must contain a header and at least 1 section.
   */
  cards?: GoogleChatV1ContextualAddOnMarkupCard[];
}

/**
 * A card is a UI element that can contain UI widgets such as texts, images.
 */
export interface GoogleChatV1ContextualAddOnMarkupCard {
  /**
   * The actions of this card.
   */
  cardActions?: GoogleChatV1ContextualAddOnMarkupCardCardAction[];
  /**
   * The header of the card. A header usually contains a title and an image.
   */
  header?: GoogleChatV1ContextualAddOnMarkupCardCardHeader;
  /**
   * Name of the card.
   */
  name?: string;
  /**
   * Sections are separated by a line divider.
   */
  sections?: GoogleChatV1ContextualAddOnMarkupCardSection[];
}

/**
 * A card action is the action associated with the card. For an invoice card, a
 * typical action would be: delete invoice, email invoice or open the invoice in
 * browser. Not supported by Google Chat apps.
 */
export interface GoogleChatV1ContextualAddOnMarkupCardCardAction {
  /**
   * The label used to be displayed in the action menu item.
   */
  actionLabel?: string;
  /**
   * The onclick action for this action item.
   */
  onClick?: GoogleChatV1WidgetMarkupOnClick;
}

export interface GoogleChatV1ContextualAddOnMarkupCardCardHeader {
  /**
   * The image's type (e.g. square border or circular border).
   */
  imageStyle?:  | "IMAGE_STYLE_UNSPECIFIED" | "IMAGE" | "AVATAR";
  /**
   * The URL of the image in the card header.
   */
  imageUrl?: string;
  /**
   * The subtitle of the card header.
   */
  subtitle?: string;
  /**
   * The title must be specified. The header has a fixed height: if both a
   * title and subtitle is specified, each will take up 1 line. If only the
   * title is specified, it will take up both lines.
   */
  title?: string;
}

/**
 * A section contains a collection of widgets that are rendered (vertically) in
 * the order that they are specified. Across all platforms, cards have a narrow
 * fixed width, so there is currently no need for layout properties (e.g.
 * float).
 */
export interface GoogleChatV1ContextualAddOnMarkupCardSection {
  /**
   * The header of the section, text formatted supported.
   */
  header?: string;
  /**
   * A section must contain at least 1 widget.
   */
  widgets?: GoogleChatV1WidgetMarkup[];
}

/**
 * A widget is a UI element that presents texts, images, etc.
 */
export interface GoogleChatV1WidgetMarkup {
  /**
   * A list of buttons. Buttons is also oneof data and only one of these fields
   * should be set.
   */
  buttons?: GoogleChatV1WidgetMarkupButton[];
  /**
   * Display an image in this widget.
   */
  image?: GoogleChatV1WidgetMarkupImage;
  /**
   * Display a key value item in this widget.
   */
  keyValue?: GoogleChatV1WidgetMarkupKeyValue;
  /**
   * Display a text paragraph in this widget.
   */
  textParagraph?: GoogleChatV1WidgetMarkupTextParagraph;
}

/**
 * A button. Can be a text button or an image button.
 */
export interface GoogleChatV1WidgetMarkupButton {
  /**
   * A button with image and onclick action.
   */
  imageButton?: GoogleChatV1WidgetMarkupImageButton;
  /**
   * A button with text and onclick action.
   */
  textButton?: GoogleChatV1WidgetMarkupTextButton;
}

/**
 * A form action describes the behavior when the form is submitted. For
 * example, an Apps Script can be invoked to handle the form.
 */
export interface GoogleChatV1WidgetMarkupFormAction {
  /**
   * The method name is used to identify which part of the form triggered the
   * form submission. This information is echoed back to the Chat app as part of
   * the card click event. The same method name can be used for several elements
   * that trigger a common behavior if desired.
   */
  actionMethodName?: string;
  /**
   * List of action parameters.
   */
  parameters?: GoogleChatV1WidgetMarkupFormActionActionParameter[];
}

/**
 * List of string parameters to supply when the action method is invoked. For
 * example, consider three snooze buttons: snooze now, snooze 1 day, snooze next
 * week. You might use action method = snooze(), passing the snooze type and
 * snooze time in the list of string parameters.
 */
export interface GoogleChatV1WidgetMarkupFormActionActionParameter {
  /**
   * The name of the parameter for the action script.
   */
  key?: string;
  /**
   * The value of the parameter.
   */
  value?: string;
}

/**
 * An image that is specified by a URL and can have an onclick action.
 */
export interface GoogleChatV1WidgetMarkupImage {
  /**
   * The aspect ratio of this image (width/height). This field allows clients
   * to reserve the right height for the image while waiting for it to load.
   * It's not meant to override the native aspect ratio of the image. If unset,
   * the server fills it by prefetching the image.
   */
  aspectRatio?: number;
  /**
   * The URL of the image.
   */
  imageUrl?: string;
  /**
   * The onclick action.
   */
  onClick?: GoogleChatV1WidgetMarkupOnClick;
}

/**
 * An image button with an onclick action.
 */
export interface GoogleChatV1WidgetMarkupImageButton {
  /**
   * The icon specified by an enum that indices to an icon provided by Chat
   * API.
   */
  icon?:  | "ICON_UNSPECIFIED" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  /**
   * The icon specified by a URL.
   */
  iconUrl?: string;
  /**
   * The name of this image_button which will be used for accessibility.
   * Default value will be provided if developers don't specify.
   */
  name?: string;
  /**
   * The onclick action.
   */
  onClick?: GoogleChatV1WidgetMarkupOnClick;
}

/**
 * A UI element contains a key (label) and a value (content). And this element
 * may also contain some actions such as onclick button.
 */
export interface GoogleChatV1WidgetMarkupKeyValue {
  /**
   * The text of the bottom label. Formatted text supported.
   */
  bottomLabel?: string;
  /**
   * A button that can be clicked to trigger an action.
   */
  button?: GoogleChatV1WidgetMarkupButton;
  /**
   * The text of the content. Formatted text supported and always required.
   */
  content?: string;
  /**
   * If the content should be multiline.
   */
  contentMultiline?: boolean;
  /**
   * An enum value that will be replaced by the Chat API with the corresponding
   * icon image.
   */
  icon?:  | "ICON_UNSPECIFIED" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  /**
   * The icon specified by a URL.
   */
  iconUrl?: string;
  /**
   * The onclick action. Only the top label, bottom label and content region
   * are clickable.
   */
  onClick?: GoogleChatV1WidgetMarkupOnClick;
  /**
   * The text of the top label. Formatted text supported.
   */
  topLabel?: string;
}

/**
 * An onclick action (e.g. open a link).
 */
export interface GoogleChatV1WidgetMarkupOnClick {
  /**
   * A form action will be triggered by this onclick if specified.
   */
  action?: GoogleChatV1WidgetMarkupFormAction;
  /**
   * This onclick triggers an open link action if specified.
   */
  openLink?: GoogleChatV1WidgetMarkupOpenLink;
}

/**
 * A link that opens a new window.
 */
export interface GoogleChatV1WidgetMarkupOpenLink {
  /**
   * The URL to open.
   */
  url?: string;
}

/**
 * A button with text and onclick action.
 */
export interface GoogleChatV1WidgetMarkupTextButton {
  /**
   * The onclick action of the button.
   */
  onClick?: GoogleChatV1WidgetMarkupOnClick;
  /**
   * The text of the button.
   */
  text?: string;
}

/**
 * A paragraph of text. Formatted text supported.
 */
export interface GoogleChatV1WidgetMarkupTextParagraph {
  text?: string;
}

/**
 * The corpus specific metadata for office-type documents, from Google Docs and
 * other sources. This message is passed to the scorer and beyond. Next tag: 9
 */
export interface GoogleDocsMetadata {
  /**
   * Contains number of users and groups which can access the document.
   */
  aclInfo?: AclInfo;
  /**
   * The conceptual type (presentation, document, etc.) of this document.
   */
  documentType?:  | "UNKNOWN" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "PDF" | "IMAGE" | "BINARY_BLOB" | "FUSION_TABLE" | "FOLDER" | "DRAWING" | "VIDEO" | "FORM" | "DRAFT_SITE" | "DRAFT_SITE_PAGE" | "JAM" | "SHORTCUT" | "SCRIPT";
  /**
   * The file extension of the document. NOTE: As of October 2018 this field is
   * not backfilled for old documents.
   */
  fileExtension?: string;
  /**
   * The last time this document was modified, in seconds since epoch. Only
   * counts content modifications.
   */
  lastContentModifiedTimestamp?: bigint;
  /**
   * Contains number of subscribers for the document.
   */
  numSubscribers?: number;
  /**
   * Size of untruncated viewers list.
   */
  numViewers?: number;
  /**
   * Additional per-result information, akin to Gmail's SingleThreadResponse.
   * Note: GWS no longer seems to use this field, but there's still one
   * reference to it for Scribe, so we can't remove it.
   */
  resultInfo?: GoogleDocsResultInfo;
  /**
   * Contains additional information about the document depending on its type.
   */
  typeInfo?: TypeInfo;
}

function serializeGoogleDocsMetadata(data: any): GoogleDocsMetadata {
  return {
    ...data,
    lastContentModifiedTimestamp: data["lastContentModifiedTimestamp"] !== undefined ? String(data["lastContentModifiedTimestamp"]) : undefined,
    resultInfo: data["resultInfo"] !== undefined ? serializeGoogleDocsResultInfo(data["resultInfo"]) : undefined,
  };
}

function deserializeGoogleDocsMetadata(data: any): GoogleDocsMetadata {
  return {
    ...data,
    lastContentModifiedTimestamp: data["lastContentModifiedTimestamp"] !== undefined ? BigInt(data["lastContentModifiedTimestamp"]) : undefined,
    resultInfo: data["resultInfo"] !== undefined ? deserializeGoogleDocsResultInfo(data["resultInfo"]) : undefined,
  };
}

/**
 * A message containing information about a specific result. This information
 * is passed to the scorer and beyond; in particular, GWS relies on it to format
 * the result in the UI. Split from GoogleDocsMetadata in case we later want to
 * reuse the message.
 */
export interface GoogleDocsResultInfo {
  /**
   * The SHA1 hash of the object in Drive, if any.
   */
  attachmentSha1?: string;
  /**
   * The storage identifier for the object in Cosmo. This field is intended to
   * used by Stratus/Moonshine integration only. It should not be exposed
   * externally (please refer to encrypted_id for that purpose).
   */
  cosmoId?: Id;
  /**
   * For Cosmo objects, the Cosmo namespace the object was in. This allows
   * downstream clients to identify whether a document was created in Writely or
   * Kix, Presently or Punch, or whether it was uploaded from GDrive. See
   * storage_cosmo.Id.NAME_SPACE for a list of all Cosmo name spaces.
   */
  cosmoNameSpace?: number;
  /**
   * The encrypted (user-visible) id of this object. Knowing the id is
   * sufficient to create a canonical URL for this document.
   */
  encryptedId?: string;
  /**
   * The mimetype of the document.
   */
  mimeType?: string;
  /**
   * The visibility indicator in the UI will be based upon this.
   */
  shareScope?: ShareScope;
}

function serializeGoogleDocsResultInfo(data: any): GoogleDocsResultInfo {
  return {
    ...data,
    cosmoId: data["cosmoId"] !== undefined ? serializeId(data["cosmoId"]) : undefined,
  };
}

function deserializeGoogleDocsResultInfo(data: any): GoogleDocsResultInfo {
  return {
    ...data,
    cosmoId: data["cosmoId"] !== undefined ? deserializeId(data["cosmoId"]) : undefined,
  };
}

export interface Grid {
  /**
   * The border style to apply to each grid item.
   */
  borderStyle?: BorderStyle;
  /**
   * The items to display in the grid.
   */
  items?: GridItem[];
  /**
   * The number of columns to display in the grid. Note that a default value
   * will be used if this field is not specified, and that default value will be
   * different depending on where the grid is shown (dialog vs companion).
   */
  numColumns?: number;
  /**
   * This callback will be reused by each individual GridItem, but with the
   * item's identifier and index in the items list added to the callback's
   * parameters.
   */
  onClick?: OnClick;
  /**
   * The text to display in the grid header.
   */
  title?: string;
}

export interface GridItem {
  /**
   * A user-specified identifier for this grid item. This identifier will be
   * returned in the parent Grid's on_click callback's parameters.
   */
  identifier?: string;
  image?: ImageComponent;
  layout?:  | "NOT_SET" | "TEXT_BELOW" | "TEXT_ABOVE";
  subtitle?: string;
  textAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "START" | "CENTER" | "END";
  /**
   * Text properties.
   */
  title?: string;
}

export interface GroupDetailsUpdatedMetadata {
  newGroupDetails?: AppsDynamiteSharedGroupDetails;
  prevGroupDetails?: AppsDynamiteSharedGroupDetails;
}

/**
 * Id representing a group that could be a space, a chat, or a direct message
 * space. Which ID is set here will determine which group
 */
export interface GroupId {
  /**
   * Unique, immutable ID of the Direct Message Space
   */
  dmId?: DmId;
  /**
   * Unique, immutable ID of the Space
   */
  spaceId?: SpaceId;
}

export interface GroupLinkSharingModificationEvent {
  newStatus?:  | "UNKNOWN_LINK_SHARING_STATUS" | "LINK_SHARING_ON" | "LINK_SHARING_OFF" | "NOT_AVAILABLE";
}

export interface GroupRetentionSettingsUpdatedMetaData {
  /**
   * The user who triggered the retention settings update
   */
  initiator?: UserId;
  /**
   * The updated space retention settings
   */
  retentionSettings?: AppsDynamiteSharedRetentionSettings;
}

function serializeGroupRetentionSettingsUpdatedMetaData(data: any): GroupRetentionSettingsUpdatedMetaData {
  return {
    ...data,
    initiator: data["initiator"] !== undefined ? serializeUserId(data["initiator"]) : undefined,
    retentionSettings: data["retentionSettings"] !== undefined ? serializeAppsDynamiteSharedRetentionSettings(data["retentionSettings"]) : undefined,
  };
}

function deserializeGroupRetentionSettingsUpdatedMetaData(data: any): GroupRetentionSettingsUpdatedMetaData {
  return {
    ...data,
    initiator: data["initiator"] !== undefined ? deserializeUserId(data["initiator"]) : undefined,
    retentionSettings: data["retentionSettings"] !== undefined ? deserializeAppsDynamiteSharedRetentionSettings(data["retentionSettings"]) : undefined,
  };
}

/**
 * Annotation metadata for an GsuiteIntegration artifact.
 */
export interface GsuiteIntegrationMetadata {
  activityFeedData?: AppsDynamiteSharedActivityFeedAnnotationData;
  assistantData?: AppsDynamiteSharedAssistantAnnotationData;
  calendarEventData?: AppsDynamiteSharedCalendarEventAnnotationData;
  /**
   * Data used to render call artifacts.
   */
  callData?: AppsDynamiteSharedCallAnnotationData;
  clientType?:  | "UNKNOWN_CLIENT_TYPE" | "MEET" | "TASKS" | "CALENDAR_EVENT" | "ASSISTANT" | "ACTIVITY_FEED_SERVICE";
  /**
   * A list of all strings that are to be indexed for this 1P chip. Each string
   * in this list would be the contents of a single string field in the 1P chip.
   * Eg. For Tasks[title = “hello world”, description = “good bye”]. If we want
   * to index only the title, this would be set to [“hello world”]. If both
   * title and description, then this would be [“hello world”, “good bye”].
   * Please make sure that the contents of this field is a subset of strings
   * that are rendered as part of the 1P Chip.
   */
  indexableTexts?: string[];
  tasksData?: AppsDynamiteSharedTasksAnnotationData;
}

function serializeGsuiteIntegrationMetadata(data: any): GsuiteIntegrationMetadata {
  return {
    ...data,
    activityFeedData: data["activityFeedData"] !== undefined ? serializeAppsDynamiteSharedActivityFeedAnnotationData(data["activityFeedData"]) : undefined,
    assistantData: data["assistantData"] !== undefined ? serializeAppsDynamiteSharedAssistantAnnotationData(data["assistantData"]) : undefined,
    calendarEventData: data["calendarEventData"] !== undefined ? serializeAppsDynamiteSharedCalendarEventAnnotationData(data["calendarEventData"]) : undefined,
    callData: data["callData"] !== undefined ? serializeAppsDynamiteSharedCallAnnotationData(data["callData"]) : undefined,
    tasksData: data["tasksData"] !== undefined ? serializeAppsDynamiteSharedTasksAnnotationData(data["tasksData"]) : undefined,
  };
}

function deserializeGsuiteIntegrationMetadata(data: any): GsuiteIntegrationMetadata {
  return {
    ...data,
    activityFeedData: data["activityFeedData"] !== undefined ? deserializeAppsDynamiteSharedActivityFeedAnnotationData(data["activityFeedData"]) : undefined,
    assistantData: data["assistantData"] !== undefined ? deserializeAppsDynamiteSharedAssistantAnnotationData(data["assistantData"]) : undefined,
    calendarEventData: data["calendarEventData"] !== undefined ? deserializeAppsDynamiteSharedCalendarEventAnnotationData(data["calendarEventData"]) : undefined,
    callData: data["callData"] !== undefined ? deserializeAppsDynamiteSharedCallAnnotationData(data["callData"]) : undefined,
    tasksData: data["tasksData"] !== undefined ? deserializeAppsDynamiteSharedTasksAnnotationData(data["tasksData"]) : undefined,
  };
}

export interface GSuitePrincipal {
  /**
   * This principal represents all users of the Google Workspace domain of the
   * customer.
   */
  gsuiteDomain?: boolean;
  /**
   * This principal references a Google Workspace group name.
   */
  gsuiteGroupEmail?: string;
  /**
   * This principal references a Google Workspace user account.
   */
  gsuiteUserEmail?: string;
}

export interface HangoutEvent {
  hangoutDurationSecs?: bigint;
  mediaType?:  | "AUDIO_VIDEO" | "AUDIO_ONLY" | "PUSH_TO_TALK";
  participantId?: StoredParticipantId[];
  type?:  | "START_HANGOUT" | "JOIN_HANGOUT" | "LEAVE_HANGOUT" | "END_HANGOUT" | "HANGOUT_COMING_SOON" | "ONGOING_HANGOUT";
}

function serializeHangoutEvent(data: any): HangoutEvent {
  return {
    ...data,
    hangoutDurationSecs: data["hangoutDurationSecs"] !== undefined ? String(data["hangoutDurationSecs"]) : undefined,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (serializeStoredParticipantId(item))) : undefined,
  };
}

function deserializeHangoutEvent(data: any): HangoutEvent {
  return {
    ...data,
    hangoutDurationSecs: data["hangoutDurationSecs"] !== undefined ? BigInt(data["hangoutDurationSecs"]) : undefined,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (deserializeStoredParticipantId(item))) : undefined,
  };
}

/**
 * A message representing the Hangout video start/end events in Babel
 */
export interface HangoutVideoEventMetadata {
  hangoutVideoType?:  | "UNKNOWN_HANGOUT_VIDEO_EVENT_TYPE" | "VIDEO_START" | "VIDEO_END";
}

/**
 * Hashtag metadata, for HASHTAG segments. For a hashtag, the "text" field
 * should contain the display text, and the search_text field should represent
 * the topic being referenced, without the hash symbol; for example, we might
 * have: text = "#Google" hashtag_data.search_text = "Google" Another example:
 * text = "#pikachu" hashtag_data.search_text = "Pokemon" Both strings should be
 * considered part of the searchable text. In go/sbe, both are indexed and
 * searchable.
 */
export interface HashtagData {
  searchText?: string;
}

/**
 * The most recent history records associated with the item.
 */
export interface History {
  record?: HistoryRecord[];
}

function serializeHistory(data: any): History {
  return {
    ...data,
    record: data["record"] !== undefined ? data["record"].map((item: any) => (serializeHistoryRecord(item))) : undefined,
  };
}

function deserializeHistory(data: any): History {
  return {
    ...data,
    record: data["record"] !== undefined ? data["record"].map((item: any) => (deserializeHistoryRecord(item))) : undefined,
  };
}

export interface HistoryRecord {
  /**
   * This will almost always be set, but there are corner cases in which the
   * information is not available, and thus applications must handle its absence
   * appropriately.
   */
  clientContext?: ClientContext;
  filterUpdate?: FilterUpdate;
  imapUpdate?: ImapUpdate;
  labelUpdate?: LabelUpdate;
  prefUpdate?: PrefUpdate;
  /**
   * Each HistoryRecord has a unique id. Ids are monotonically increasing, and
   * not necessarily contiguous.
   */
  recordId?: bigint;
  threadUpdate?: ThreadUpdate;
  /**
   * This will almost always be set, but there are corner cases in which the
   * information is not available, and thus applications must handle its absence
   * appropriately.
   */
  transactionContext?: TransactionContext;
  txnDebugInfo?: TransactionDebugInfo;
  type?:  | "UNKNOWN" | "INTERNAL" | "MESSAGE_ADDED" | "MESSAGE_DELETED" | "LABEL_ADDED" | "LABEL_REMOVED" | "ATTRIBUTE_SET" | "ATTRIBUTE_REMOVED" | "THREAD_KEY_SET" | "LABEL_CREATED" | "LABEL_DELETED" | "LABEL_RENAMED" | "LABEL_UPDATED" | "PREF_WRITTEN" | "PREF_DELETED" | "FILTER_CREATED" | "FILTER_DELETED" | "IMAP_UIDS_REASSIGN" | "TOPIC_STATE_UPDATED" | "TXN_DEBUG_INFO";
}

function serializeHistoryRecord(data: any): HistoryRecord {
  return {
    ...data,
    clientContext: data["clientContext"] !== undefined ? serializeClientContext(data["clientContext"]) : undefined,
    imapUpdate: data["imapUpdate"] !== undefined ? serializeImapUpdate(data["imapUpdate"]) : undefined,
    prefUpdate: data["prefUpdate"] !== undefined ? serializePrefUpdate(data["prefUpdate"]) : undefined,
    recordId: data["recordId"] !== undefined ? String(data["recordId"]) : undefined,
    threadUpdate: data["threadUpdate"] !== undefined ? serializeThreadUpdate(data["threadUpdate"]) : undefined,
    transactionContext: data["transactionContext"] !== undefined ? serializeTransactionContext(data["transactionContext"]) : undefined,
  };
}

function deserializeHistoryRecord(data: any): HistoryRecord {
  return {
    ...data,
    clientContext: data["clientContext"] !== undefined ? deserializeClientContext(data["clientContext"]) : undefined,
    imapUpdate: data["imapUpdate"] !== undefined ? deserializeImapUpdate(data["imapUpdate"]) : undefined,
    prefUpdate: data["prefUpdate"] !== undefined ? deserializePrefUpdate(data["prefUpdate"]) : undefined,
    recordId: data["recordId"] !== undefined ? BigInt(data["recordId"]) : undefined,
    threadUpdate: data["threadUpdate"] !== undefined ? deserializeThreadUpdate(data["threadUpdate"]) : undefined,
    transactionContext: data["transactionContext"] !== undefined ? deserializeTransactionContext(data["transactionContext"]) : undefined,
  };
}

/**
 * Actions handled by individual host apps.
 */
export interface HostAppActionMarkup {
  /**
   * Actions handled by Calendar.
   */
  calendarAction?: CalendarClientActionMarkup;
  /**
   * Actions handled by Chat.
   */
  chatAction?: ChatClientActionMarkup;
  /**
   * Actions handled by Drive.
   */
  driveAction?: DriveClientActionMarkup;
  /**
   * Actions handled by Docs, Sheets, or Slides.
   */
  editorAction?: EditorClientActionMarkup;
  /**
   * Actions handled by Gmail.
   */
  gmailAction?: GmailClientActionMarkup;
  /**
   * Actions handled by Sheets.
   */
  sheetsAction?: SheetsClientActionMarkup;
}

/**
 * Represents a single host. Optionally, the MDB owner of the host can be
 * specified.
 */
export interface HostProto {
  /**
   * Lower-case, fully qualified hostname.
   */
  hostName?: string;
  /**
   * If present, then any checks that compare this Principal to LOAS peer info
   * must confirm the peer's machine owner is equal to 'host_owner'. If absent,
   * then any peer machine owner is acceptable.
   */
  hostOwner?: string;
}

/**
 * Used to provide a search operator for html properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched.
 */
export interface HtmlOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * html property. For example, if operatorName is *subject* and the property's
   * name is *subjectLine*, then queries like *subject:<value>* show results
   * only where the value of the property named *subjectLine* matches *<value>*.
   * By contrast, a search that uses the same *<value>* without an operator
   * return all items where *<value>* matches the value of any html properties
   * or text within the content field for the item. The operator name can only
   * contain lowercase letters (a-z). The maximum length is 32 characters.
   */
  operatorName?: string;
}

/**
 * The options for html properties.
 */
export interface HtmlPropertyOptions {
  /**
   * If set, describes how the property should be used as a search operator.
   */
  operatorOptions?: HtmlOperatorOptions;
  /**
   * Indicates the search quality importance of the tokens within the field
   * when used for retrieval. Can only be set to DEFAULT or NONE.
   */
  retrievalImportance?: RetrievalImportance;
}

/**
 * List of html values.
 */
export interface HtmlValues {
  /**
   * The maximum allowable length for html values is 2048 characters.
   */
  values?: string[];
}

export interface IconImage {
  /**
   * The alternative text of this icon_url which will be used for
   * accessibility.
   */
  altText?: string;
  icon?:  | "NONE" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EDIT" | "EDIT_NOTE" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "OPEN_IN_NEW" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  iconUrl?: string;
  /**
   * The image cropping style. Note that icons with a CIRCLE style are rendered
   * larger than the default icon size.
   */
  imageStyle?:  | "CROP_TYPE_NOT_SET" | "SQUARE" | "CIRCLE" | "RECTANGLE_CUSTOM" | "RECTANGLE_4_3";
}

/**
 * Identifies a particular object, including both Users and DirEntries. This Id
 * is unique across the entire server instance, such as the production or qa
 * instance.
 */
export interface Id {
  /**
   * The User account in which the DirEntry was originally created. If
   * name_space==GAIA, then it's the gaia_id of the user this id is referring
   * to.
   */
  creatorUserId?: bigint;
  /**
   * The local identifier for the DirEntry (local to the creator's account).
   * local_id + app_name is guaranteed to be unique within the creator account,
   * but not across all User accounts. The string is case sensitive. Ignore if
   * name_space==GAIA. NB For name_space==COSMO, all local_id's should be
   * defined in
   * google3/java/com/google/storage/cosmo/server/api/SpecialObjectIds.java as
   * they have a special predefined meaning. See
   * cosmo.client.CosmoIdFactory.createObjectId(long,String) for IMPORTANT
   * recommendations when generating IDs.
   */
  localId?: string;
  /**
   * The name space in which this id is unique (typically the application that
   * created it). Values should be drawn from the above enum, but for
   * experimentation, use values greater than 1000.
   */
  nameSpace?: number;
}

function serializeId(data: any): Id {
  return {
    ...data,
    creatorUserId: data["creatorUserId"] !== undefined ? String(data["creatorUserId"]) : undefined,
  };
}

function deserializeId(data: any): Id {
  return {
    ...data,
    creatorUserId: data["creatorUserId"] !== undefined ? BigInt(data["creatorUserId"]) : undefined,
  };
}

export interface Image {
  /**
   * The alternative text of this image which will be used for accessibility.
   */
  altText?: string;
  /**
   * The aspect ratio of this image (width/height).
   */
  aspectRatio?: number;
  /**
   * Image url specified by developers. Server side, we will wrap with FIFE so
   * client apps can configure size/cropping/etc.
   */
  imageUrl?: string;
  onClick?: OnClick;
}

export interface ImageButton {
  icon?:  | "NONE" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EDIT" | "EDIT_NOTE" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "OPEN_IN_NEW" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  iconUrl?: string;
  name?: string;
  onClick?: OnClick;
}

/**
 * NOTE: Through future refactoring work, this image component will eventually
 * be used in the Image widget, and will likely replace the Icon proto as well.
 */
export interface ImageComponent {
  altText?: string;
  borderStyle?: BorderStyle;
  cropStyle?: ImageCropStyle;
  imageUrl?: string;
}

/**
 * Represents a crop style that can be applied to an image.
 */
export interface ImageCropStyle {
  /**
   * The aspect ratio to use if the crop type is RECTANGLE_CUSTOM.
   */
  aspectRatio?: number;
  /**
   * The crop type.
   */
  type?:  | "CROP_TYPE_NOT_SET" | "SQUARE" | "CIRCLE" | "RECTANGLE_CUSTOM" | "RECTANGLE_4_3";
}

/**
 * This is deprecated and please use KeyValue.
 */
export interface ImageKeyValue {
  icon?:  | "NONE" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EDIT" | "EDIT_NOTE" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "OPEN_IN_NEW" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  iconUrl?: string;
  onClick?: OnClick;
  text?: string;
}

export interface ImapSessionContext {
  app?:  | "OTHER_APP" | "CHROME" | "FIREFOX" | "MSIE" | "SAFARI" | "OPERA" | "EDGE" | "MSIE_COMPATIBILITY" | "OTHER_BROWSER" | "SAMSUNG_BROWSER" | "UC_BROWSER" | "ANDROID_BROWSER" | "YANDEX_BROWSER" | "SILK_BROWSER" | "COC_COC_BROWSER" | "MAX_BROWSER_APP_VALUE" | "GMAIL_APP" | "GMAIL_INBOX_APP" | "ANDROID_EMAIL_APP" | "SAMSUNG_MAIL_APP" | "MOTO_EMAIL_APP" | "BOXER_APP" | "LIMILABS_MAIL_DLL" | "BIS_APP" | "OUTLOOK_MAIL_APP" | "APPLE_NATIVE_APP" | "CHROME_WEBVIEW_APP" | "SAFARI_WEBVIEW_APP" | "CHROME_SYNC_APP" | "GSA_APP" | "GMM_APP" | "CALENDAR_APP" | "PLUS_APP" | "HANGOUTS_APP" | "HANGOUTS_MEET_APP" | "JAMBOARD_APP" | "VOICE_APP" | "PHOTOS_APP" | "DRIVE_SYNC_APP" | "DRIVE_APP" | "DOCS_APP" | "SHEETS_APP" | "SLIDES_APP" | "KEEP_APP" | "WHATS_APP_IN_DRIVE_APP" | "TRANSLATE_APP" | "YOUTUBE_APP" | "YOUTUBE_MUSIC_APP" | "YOUTUBE_GAMING_APP" | "YOUTUBE_KIDS_APP" | "YOUTUBE_CAPTURE_APP" | "YOUTUBE_CREATOR_APP" | "YOUTUBE_GO_APP" | "YOUTUBE_TV_APP" | "YOUTUBE_VR_APP" | "PLAY_APP" | "PLAY_MUSIC_APP" | "PLAY_BOOKS_APP" | "PLAY_MOVIES_APP" | "PLAY_NEWSSTAND_APP" | "PLAY_GAMES_APP" | "POKEMON_GO_APP" | "ALLO_APP" | "DUO_APP" | "CLASSROOM_APP" | "TRIPS_APP" | "GOOGLE_PAY_APP" | "WAZE_APP" | "ASSISTANT_APP" | "GBOARD_APP" | "NEWS_APP" | "HOME_APP" | "EARTH_APP" | "STREET_VIEW_APP" | "TEZ_APP" | "GOOGLE_ANALYTICS_APP" | "ADSENSE_APP" | "ADWORDS_APP" | "EXPRESS_APP" | "WEAR_APP" | "GOOGLE_MY_BUSINESS_APP" | "FAMILY_LINK_APP" | "OPINION_REWARDS_APP" | "WALLET_APP" | "ARTS_AND_CULTURE_APP" | "ANDROID_DEVICE_MANAGER_APP" | "GOOGLE_GO_APP" | "FILES_GO_APP" | "DATALLY_APP" | "WIFI_APP" | "STADIA_APP" | "BATTLESTAR_APP" | "SMART_LOCK_APP" | "LOGDOG_APP" | "DEPRECATED_MAC_OSX_MAIL_APP" | "DEPRECATED_IOS_MAIL_APP";
  /**
   * User agent information
   */
  deviceType?:  | "UNKNOWN" | "PC" | "MOBILE" | "TABLET" | "PORTABLE_MEDIA_PLAYER" | "TV" | "GAME_CONSOLE" | "MEDIA_PLAYER" | "SMART_SPEAKER" | "SMART_DISPLAY" | "CONNECTED_HOME_OTHER" | "WEARABLE" | "GLASS" | "CAR" | "VR_HEADSET";
  /**
   * As agreed with Bond team, this holds the fingerprint of any "aguid" or
   * "guid" provided by the ID command. The fingerprint should be calculated by
   * fingerprint2011. Note that not all clients will provide aguid or guid
   * through ID command.
   */
  guidFingerprint?: bigint;
  os?:  | "UNKNOWN_OS" | "ANDROID_OS" | "IOS_OS" | "BLACKBERRY_OS" | "WIN_PHONE_OS" | "FIRE_OS" | "MAX_MOBILE_OS_VALUE" | "WINDOWS_OS" | "LINUX_OS" | "MAC_OS" | "CHROME_OS" | "PLAYSTATION_OS" | "XBOX_OS" | "TIZEN_OS" | "APPLE_TV_OS" | "KAI_OS" | "ANDROID_THINGS_OS" | "CAST_OS" | "STADIA_OS";
  osVersion?: OsVersion;
  possiblyTrimmedModel?: PossiblyTrimmedModel;
}

function serializeImapSessionContext(data: any): ImapSessionContext {
  return {
    ...data,
    guidFingerprint: data["guidFingerprint"] !== undefined ? String(data["guidFingerprint"]) : undefined,
  };
}

function deserializeImapSessionContext(data: any): ImapSessionContext {
  return {
    ...data,
    guidFingerprint: data["guidFingerprint"] !== undefined ? BigInt(data["guidFingerprint"]) : undefined,
  };
}

/**
 * Message delete history record extension that exports //imapsync/folder
 * attribute of deleted messages which have ^is label.
 */
export interface ImapSyncDelete {
  /**
   * Contains the value of //imapsync/folder attribute of deleted message.
   */
  mappings?: FolderAttribute;
  msgId?: bigint;
}

function serializeImapSyncDelete(data: any): ImapSyncDelete {
  return {
    ...data,
    mappings: data["mappings"] !== undefined ? serializeFolderAttribute(data["mappings"]) : undefined,
    msgId: data["msgId"] !== undefined ? String(data["msgId"]) : undefined,
  };
}

function deserializeImapSyncDelete(data: any): ImapSyncDelete {
  return {
    ...data,
    mappings: data["mappings"] !== undefined ? deserializeFolderAttribute(data["mappings"]) : undefined,
    msgId: data["msgId"] !== undefined ? BigInt(data["msgId"]) : undefined,
  };
}

export interface ImapsyncFolderAttributeFolderMessage {
  /**
   * Flags of the message. Represents unseen and flagged state.
   */
  flags?: ImapsyncFolderAttributeFolderMessageFlags;
  /**
   * UID of the message.
   */
  uid?: bigint;
}

function serializeImapsyncFolderAttributeFolderMessage(data: any): ImapsyncFolderAttributeFolderMessage {
  return {
    ...data,
    uid: data["uid"] !== undefined ? String(data["uid"]) : undefined,
  };
}

function deserializeImapsyncFolderAttributeFolderMessage(data: any): ImapsyncFolderAttributeFolderMessage {
  return {
    ...data,
    uid: data["uid"] !== undefined ? BigInt(data["uid"]) : undefined,
  };
}

export interface ImapsyncFolderAttributeFolderMessageFlags {
  /**
   * Flagged state of the message.
   */
  flagged?: boolean;
  /**
   * Seen state of the message.
   */
  seen?: boolean;
}

export interface ImapUidsReassign {
  /**
   * Label
   */
  labelId?: string;
  /**
   * The message Ids
   */
  messageId?: bigint[];
}

function serializeImapUidsReassign(data: any): ImapUidsReassign {
  return {
    ...data,
    messageId: data["messageId"] !== undefined ? data["messageId"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeImapUidsReassign(data: any): ImapUidsReassign {
  return {
    ...data,
    messageId: data["messageId"] !== undefined ? data["messageId"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * HistoryRecord for changes associated with IMAP, namely: IMAP_UIDS_REASSIGN
 */
export interface ImapUpdate {
  imapUidsReassign?: ImapUidsReassign;
}

function serializeImapUpdate(data: any): ImapUpdate {
  return {
    ...data,
    imapUidsReassign: data["imapUidsReassign"] !== undefined ? serializeImapUidsReassign(data["imapUidsReassign"]) : undefined,
  };
}

function deserializeImapUpdate(data: any): ImapUpdate {
  return {
    ...data,
    imapUidsReassign: data["imapUidsReassign"] !== undefined ? deserializeImapUidsReassign(data["imapUidsReassign"]) : undefined,
  };
}

/**
 * Annotation metadata to display system messages for incoming webhook events.
 * Next Tag: 7
 */
export interface IncomingWebhookChangedMetadata {
  /**
   * The webhook name at the time of the change. Used in Spanner storage, BE
   * API responses and FE API responses.
   */
  incomingWebhookName?: string;
  /**
   * The user id of the user whose action triggered this system message. Used
   * in Spanner storage, BE API responses and FE API responses.
   */
  initiatorId?: UserId;
  /**
   * Complete profile when ListTopicsRequest FetchOptions.USER is set.
   * Otherwise, only the id will be filled in. Used in FE API responses.
   */
  initiatorProfile?: User;
  /**
   * The webhook id of the incoming webhook in question. This field should not
   * be used to load webhook information dynamically and is only present for
   * debugging purposes. Used in Spanner storage, BE API responses and FE API
   * responses.
   */
  obfuscatedIncomingWebhookId?: string;
  /**
   * Only populated for UPDATED_NAME and UPDATED_NAME_AND_AVATAR events, where
   * the webhook name was changed. Used in Spanner storage, BE API responses and
   * FE API responses.
   */
  oldIncomingWebhookName?: string;
  /**
   * Used in Spanner storage, BE API responses and FE API responses.
   */
  type?:  | "UNSPECIFIED" | "ADDED" | "UPDATED" | "REMOVED" | "UPDATED_NAME" | "UPDATED_AVATAR" | "UPDATED_NAME_AND_AVATAR";
}

function serializeIncomingWebhookChangedMetadata(data: any): IncomingWebhookChangedMetadata {
  return {
    ...data,
    initiatorId: data["initiatorId"] !== undefined ? serializeUserId(data["initiatorId"]) : undefined,
    initiatorProfile: data["initiatorProfile"] !== undefined ? serializeUser(data["initiatorProfile"]) : undefined,
  };
}

function deserializeIncomingWebhookChangedMetadata(data: any): IncomingWebhookChangedMetadata {
  return {
    ...data,
    initiatorId: data["initiatorId"] !== undefined ? deserializeUserId(data["initiatorId"]) : undefined,
    initiatorProfile: data["initiatorProfile"] !== undefined ? deserializeUser(data["initiatorProfile"]) : undefined,
  };
}

/**
 * Additional options for CloudSearch#indexingDatasourcesDeleteSchema.
 */
export interface IndexingDatasourcesDeleteSchemaOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#indexingDatasourcesGetSchema.
 */
export interface IndexingDatasourcesGetSchemaOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#indexingDatasourcesItemsDelete.
 */
export interface IndexingDatasourcesItemsDeleteOptions {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Required. The RequestMode for this request.
   */
  mode?:  | "UNSPECIFIED" | "SYNCHRONOUS" | "ASYNCHRONOUS";
  /**
   * Required. The incremented version of the item to delete from the index.
   * The indexing system stores the version from the datasource as a byte string
   * and compares the Item version in the index to the version of the queued
   * Item using lexical ordering. Cloud Search Indexing won't delete any queued
   * item with a version value that is less than or equal to the version of the
   * currently indexed item. The maximum length for this field is 1024 bytes.
   * For information on how item version affects the deletion process, refer to
   * [Handle revisions after manual
   * deletes](https://developers.google.com/cloud-search/docs/guides/operations).
   */
  version?: Uint8Array;
}

function serializeIndexingDatasourcesItemsDeleteOptions(data: any): IndexingDatasourcesItemsDeleteOptions {
  return {
    ...data,
    version: data["version"] !== undefined ? encodeBase64(data["version"]) : undefined,
  };
}

function deserializeIndexingDatasourcesItemsDeleteOptions(data: any): IndexingDatasourcesItemsDeleteOptions {
  return {
    ...data,
    version: data["version"] !== undefined ? decodeBase64(data["version"] as string) : undefined,
  };
}

/**
 * Additional options for CloudSearch#indexingDatasourcesItemsGet.
 */
export interface IndexingDatasourcesItemsGetOptions {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#indexingDatasourcesItemsList.
 */
export interface IndexingDatasourcesItemsListOptions {
  /**
   * When set to true, the indexing system only populates the following fields:
   * name, version, queue. metadata.hash, metadata.title,
   * metadata.sourceRepositoryURL, metadata.objectType, metadata.createTime,
   * metadata.updateTime, metadata.contentLanguage, metadata.mimeType,
   * structured_data.hash, content.hash, itemType, itemStatus.code,
   * itemStatus.processingError.code, itemStatus.repositoryError.type, If this
   * value is false, then all the fields are populated in Item.
   */
  brief?: boolean;
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Maximum number of items to fetch in a request. The max value is 1000 when
   * brief is true. The max value is 10 if brief is false. The default value is
   * 10
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

export interface IndexItemOptions {
  /**
   * Specifies if the index request should allow Google Workspace principals
   * that do not exist or are deleted.
   */
  allowUnknownGsuitePrincipals?: boolean;
}

export interface IndexItemRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  indexItemOptions?: IndexItemOptions;
  /**
   * The name of the item. Format: datasources/{source_id}/items/{item_id}
   */
  item?: Item;
  /**
   * Required. The RequestMode for this request.
   */
  mode?:  | "UNSPECIFIED" | "SYNCHRONOUS" | "ASYNCHRONOUS";
}

function serializeIndexItemRequest(data: any): IndexItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? serializeItem(data["item"]) : undefined,
  };
}

function deserializeIndexItemRequest(data: any): IndexItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializeItem(data["item"]) : undefined,
  };
}

/**
 * Request message for `InitializeCustomer` method.
 */
export interface InitializeCustomerRequest {
}

export interface InsertContent {
  /**
   * The content to be inserted.
   */
  content?: string;
  /**
   * The type of inserted content.
   */
  contentType?:  | "UNSPECIFIED_CONTENT_TYPE" | "TEXT" | "MUTABLE_HTML" | "IMMUTABLE_HTML";
  mimeType?:  | "UNSPECIFIED_EMAIL_MIME_TYPE" | "PLAIN_TEXT" | "HTML";
}

/**
 * Used to specify integer faceting options.
 */
export interface IntegerFacetingOptions {
  /**
   * Buckets for given integer values should be in strictly ascending order.
   * For example, if values supplied are (1,5,10,100), the following facet
   * buckets will be formed {<1, [1,5), [5-10), [10-100), >=100}.
   */
  integerBuckets?: bigint[];
}

function serializeIntegerFacetingOptions(data: any): IntegerFacetingOptions {
  return {
    ...data,
    integerBuckets: data["integerBuckets"] !== undefined ? data["integerBuckets"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeIntegerFacetingOptions(data: any): IntegerFacetingOptions {
  return {
    ...data,
    integerBuckets: data["integerBuckets"] !== undefined ? data["integerBuckets"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Used to provide a search operator for integer properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched.
 */
export interface IntegerOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * integer property using the greater-than operator. For example, if
   * greaterThanOperatorName is *priorityabove* and the property's name is
   * *priorityVal*, then queries like *priorityabove:<value>* show results only
   * where the value of the property named *priorityVal* is greater than
   * *<value>*. The operator name can only contain lowercase letters (a-z). The
   * maximum length is 32 characters.
   */
  greaterThanOperatorName?: string;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * integer property using the less-than operator. For example, if
   * lessThanOperatorName is *prioritybelow* and the property's name is
   * *priorityVal*, then queries like *prioritybelow:<value>* show results only
   * where the value of the property named *priorityVal* is less than *<value>*.
   * The operator name can only contain lowercase letters (a-z). The maximum
   * length is 32 characters.
   */
  lessThanOperatorName?: string;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * integer property. For example, if operatorName is *priority* and the
   * property's name is *priorityVal*, then queries like *priority:<value>* show
   * results only where the value of the property named *priorityVal* matches
   * *<value>*. By contrast, a search that uses the same *<value>* without an
   * operator returns all items where *<value>* matches the value of any String
   * properties or text within the content field for the item. The operator name
   * can only contain lowercase letters (a-z). The maximum length is 32
   * characters.
   */
  operatorName?: string;
}

/**
 * The options for integer properties.
 */
export interface IntegerPropertyOptions {
  /**
   * If set, describes integer faceting options for the given integer property.
   * The corresponding integer property should be marked isFacetable.
   */
  integerFacetingOptions?: IntegerFacetingOptions;
  /**
   * The maximum value of the property. The minimum and maximum values for the
   * property are used to rank results according to the ordered ranking.
   * Indexing requests with values greater than the maximum are accepted and
   * ranked with the same weight as items indexed with the maximum value.
   */
  maximumValue?: bigint;
  /**
   * The minimum value of the property. The minimum and maximum values for the
   * property are used to rank results according to the ordered ranking.
   * Indexing requests with values less than the minimum are accepted and ranked
   * with the same weight as items indexed with the minimum value.
   */
  minimumValue?: bigint;
  /**
   * If set, describes how the integer should be used as a search operator.
   */
  operatorOptions?: IntegerOperatorOptions;
  /**
   * Used to specify the ordered ranking for the integer. Can only be used if
   * isRepeatable is false.
   */
  orderedRanking?:  | "NO_ORDER" | "ASCENDING" | "DESCENDING";
}

function serializeIntegerPropertyOptions(data: any): IntegerPropertyOptions {
  return {
    ...data,
    integerFacetingOptions: data["integerFacetingOptions"] !== undefined ? serializeIntegerFacetingOptions(data["integerFacetingOptions"]) : undefined,
    maximumValue: data["maximumValue"] !== undefined ? String(data["maximumValue"]) : undefined,
    minimumValue: data["minimumValue"] !== undefined ? String(data["minimumValue"]) : undefined,
  };
}

function deserializeIntegerPropertyOptions(data: any): IntegerPropertyOptions {
  return {
    ...data,
    integerFacetingOptions: data["integerFacetingOptions"] !== undefined ? deserializeIntegerFacetingOptions(data["integerFacetingOptions"]) : undefined,
    maximumValue: data["maximumValue"] !== undefined ? BigInt(data["maximumValue"]) : undefined,
    minimumValue: data["minimumValue"] !== undefined ? BigInt(data["minimumValue"]) : undefined,
  };
}

/**
 * List of integer values.
 */
export interface IntegerValues {
  values?: bigint[];
}

function serializeIntegerValues(data: any): IntegerValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeIntegerValues(data: any): IntegerValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface IntegrationConfigMutation {
  /**
   * Add an app using its identifier.
   */
  addApp?: AppId;
  /**
   * Add a pinned tab using its identifier.
   */
  addPinnedItem?: PinnedItemId;
  /**
   * Remove an active app using its identifier.
   */
  removeApp?: AppId;
  /**
   * Remove an active pinned tab using its identifier.
   */
  removePinnedItem?: PinnedItemId;
}

function serializeIntegrationConfigMutation(data: any): IntegrationConfigMutation {
  return {
    ...data,
    addApp: data["addApp"] !== undefined ? serializeAppId(data["addApp"]) : undefined,
    removeApp: data["removeApp"] !== undefined ? serializeAppId(data["removeApp"]) : undefined,
  };
}

function deserializeIntegrationConfigMutation(data: any): IntegrationConfigMutation {
  return {
    ...data,
    addApp: data["addApp"] !== undefined ? deserializeAppId(data["addApp"]) : undefined,
    removeApp: data["removeApp"] !== undefined ? deserializeAppId(data["removeApp"]) : undefined,
  };
}

/**
 * Annotation metadata to display system message for integration config updated
 * event. This metadata is stored in spanner, and can be dispatched to clients
 * without any field modification or transformation.
 */
export interface IntegrationConfigUpdatedMetadata {
  /**
   * The user whose action triggered this system message.
   */
  initiatorId?: UserId;
  /**
   * A list of updates applied on the integration config.
   */
  mutations?: IntegrationConfigMutation[];
}

function serializeIntegrationConfigUpdatedMetadata(data: any): IntegrationConfigUpdatedMetadata {
  return {
    ...data,
    initiatorId: data["initiatorId"] !== undefined ? serializeUserId(data["initiatorId"]) : undefined,
    mutations: data["mutations"] !== undefined ? data["mutations"].map((item: any) => (serializeIntegrationConfigMutation(item))) : undefined,
  };
}

function deserializeIntegrationConfigUpdatedMetadata(data: any): IntegrationConfigUpdatedMetadata {
  return {
    ...data,
    initiatorId: data["initiatorId"] !== undefined ? deserializeUserId(data["initiatorId"]) : undefined,
    mutations: data["mutations"] !== undefined ? data["mutations"].map((item: any) => (deserializeIntegrationConfigMutation(item))) : undefined,
  };
}

/**
 * Represents an interaction between a user and an item.
 */
export interface Interaction {
  /**
   * The time when the user acted on the item. If multiple actions of the same
   * type exist for a single user, only the most recent action is recorded.
   */
  interactionTime?: Date;
  /**
   * The user that acted on the item.
   */
  principal?: Principal;
  type?:  | "UNSPECIFIED" | "VIEW" | "EDIT";
}

function serializeInteraction(data: any): Interaction {
  return {
    ...data,
    interactionTime: data["interactionTime"] !== undefined ? data["interactionTime"].toISOString() : undefined,
  };
}

function deserializeInteraction(data: any): Interaction {
  return {
    ...data,
    interactionTime: data["interactionTime"] !== undefined ? new Date(data["interactionTime"]) : undefined,
  };
}

/**
 * Interaction data for an annotation, which may be supplemental to the
 * metadata oneof. For example, this will contain the fully built navigation
 * target for smart chips. NEXT TAG: 2
 */
export interface InteractionData {
  /**
   * A general navigation target associated with the annotation this message is
   * contained in. For smart chips, this will be the destination of the
   * tap/click target and will be returned by the server. For scenarios where
   * the chip originated from a user-provided url, this value will be provided
   * by clients; otherwise it will be built by the corresponding metadata parts.
   */
  url?: SafeUrlProto;
}

export interface InviteAcceptedEvent {
  participantId?: StoredParticipantId[];
}

function serializeInviteAcceptedEvent(data: any): InviteAcceptedEvent {
  return {
    ...data,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (serializeStoredParticipantId(item))) : undefined,
  };
}

function deserializeInviteAcceptedEvent(data: any): InviteAcceptedEvent {
  return {
    ...data,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (deserializeStoredParticipantId(item))) : undefined,
  };
}

/**
 * Invitee information from a Dynamite invitation. See
 * go/dynamite-invitee-mgmt.
 */
export interface InviteeInfo {
  /**
   * Email as typed by the user when invited to Room or DM. This value will be
   * canonicalized and hashed before retained in storage.
   */
  email?: string;
  /**
   * Unique, immutable ID of the User.
   */
  userId?: UserId;
}

function serializeInviteeInfo(data: any): InviteeInfo {
  return {
    ...data,
    userId: data["userId"] !== undefined ? serializeUserId(data["userId"]) : undefined,
  };
}

function deserializeInviteeInfo(data: any): InviteeInfo {
  return {
    ...data,
    userId: data["userId"] !== undefined ? deserializeUserId(data["userId"]) : undefined,
  };
}

/**
 * Represents a single object that is an item in the search index, such as a
 * file, folder, or a database record.
 */
export interface Item {
  /**
   * Access control list for this item.
   */
  acl?: ItemAcl;
  /**
   * Item content to be indexed and made text searchable.
   */
  content?: ItemContent;
  /**
   * The type for this item.
   */
  itemType?:  | "UNSPECIFIED" | "CONTENT_ITEM" | "CONTAINER_ITEM" | "VIRTUAL_CONTAINER_ITEM";
  /**
   * The metadata information.
   */
  metadata?: ItemMetadata;
  /**
   * The name of the Item. Format: datasources/{source_id}/items/{item_id} This
   * is a required field. The maximum length is 1536 characters.
   */
  name?: string;
  /**
   * Additional state connector can store for this item. The maximum length is
   * 10000 bytes.
   */
  payload?: Uint8Array;
  /**
   * Queue this item belongs to. The maximum length is 100 characters.
   */
  queue?: string;
  /**
   * Status of the item. Output only field.
   */
  status?: ItemStatus;
  /**
   * The structured data for the item that should conform to a registered
   * object definition in the schema for the data source.
   */
  structuredData?: ItemStructuredData;
  /**
   * Required. The indexing system stores the version from the datasource as a
   * byte string and compares the Item version in the index to the version of
   * the queued Item using lexical ordering. Cloud Search Indexing won't index
   * or delete any queued item with a version value that is less than or equal
   * to the version of the currently indexed item. The maximum length for this
   * field is 1024 bytes. For information on how item version affects the
   * deletion process, refer to [Handle revisions after manual
   * deletes](https://developers.google.com/cloud-search/docs/guides/operations).
   */
  version?: Uint8Array;
}

function serializeItem(data: any): Item {
  return {
    ...data,
    content: data["content"] !== undefined ? serializeItemContent(data["content"]) : undefined,
    metadata: data["metadata"] !== undefined ? serializeItemMetadata(data["metadata"]) : undefined,
    payload: data["payload"] !== undefined ? encodeBase64(data["payload"]) : undefined,
    structuredData: data["structuredData"] !== undefined ? serializeItemStructuredData(data["structuredData"]) : undefined,
    version: data["version"] !== undefined ? encodeBase64(data["version"]) : undefined,
  };
}

function deserializeItem(data: any): Item {
  return {
    ...data,
    content: data["content"] !== undefined ? deserializeItemContent(data["content"]) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeItemMetadata(data["metadata"]) : undefined,
    payload: data["payload"] !== undefined ? decodeBase64(data["payload"] as string) : undefined,
    structuredData: data["structuredData"] !== undefined ? deserializeItemStructuredData(data["structuredData"]) : undefined,
    version: data["version"] !== undefined ? decodeBase64(data["version"] as string) : undefined,
  };
}

/**
 * Access control list information for the item. For more information see [Map
 * ACLs](https://developers.google.com/cloud-search/docs/guides/acls).
 */
export interface ItemAcl {
  /**
   * Sets the type of access rules to apply when an item inherits its ACL from
   * a parent. This should always be set in tandem with the inheritAclFrom
   * field. Also, when the inheritAclFrom field is set, this field should be set
   * to a valid AclInheritanceType.
   */
  aclInheritanceType?:  | "NOT_APPLICABLE" | "CHILD_OVERRIDE" | "PARENT_OVERRIDE" | "BOTH_PERMIT";
  /**
   * List of principals who are explicitly denied access to the item in search
   * results. While principals are denied access by default, use denied readers
   * to handle exceptions and override the list allowed readers. The maximum
   * number of elements is 100.
   */
  deniedReaders?: Principal[];
  /**
   * The name of the item to inherit the Access Permission List (ACL) from.
   * Note: ACL inheritance *only* provides access permissions to child items and
   * does not define structural relationships, nor does it provide convenient
   * ways to delete large groups of items. Deleting an ACL parent from the index
   * only alters the access permissions of child items that reference the parent
   * in the inheritAclFrom field. The item is still in the index, but may not
   * visible in search results. By contrast, deletion of a container item also
   * deletes all items that reference the container via the containerName field.
   * The maximum length for this field is 1536 characters.
   */
  inheritAclFrom?: string;
  /**
   * Optional. List of owners for the item. This field has no bearing on
   * document access permissions. It does, however, offer a slight ranking
   * boosts items where the querying user is an owner. The maximum number of
   * elements is 5.
   */
  owners?: Principal[];
  /**
   * List of principals who are allowed to see the item in search results.
   * Optional if inheriting permissions from another item or if the item is not
   * intended to be visible, such as virtual containers. The maximum number of
   * elements is 1000.
   */
  readers?: Principal[];
}

/**
 * Content of an item to be indexed and surfaced by Cloud Search. Only UTF-8
 * encoded strings are allowed as inlineContent. If the content is uploaded and
 * not binary, it must be UTF-8 encoded.
 */
export interface ItemContent {
  /**
   * Upload reference ID of a previously uploaded content via write method.
   */
  contentDataRef?: UploadItemRef;
  contentFormat?:  | "UNSPECIFIED" | "HTML" | "TEXT" | "RAW";
  /**
   * Hashing info calculated and provided by the API client for content. Can be
   * used with the items.push method to calculate modified state. The maximum
   * length is 2048 characters.
   */
  hash?: string;
  /**
   * Content that is supplied inlined within the update method. The maximum
   * length is 102400 bytes (100 KiB).
   */
  inlineContent?: Uint8Array;
}

function serializeItemContent(data: any): ItemContent {
  return {
    ...data,
    inlineContent: data["inlineContent"] !== undefined ? encodeBase64(data["inlineContent"]) : undefined,
  };
}

function deserializeItemContent(data: any): ItemContent {
  return {
    ...data,
    inlineContent: data["inlineContent"] !== undefined ? decodeBase64(data["inlineContent"] as string) : undefined,
  };
}

export interface ItemCountByStatus {
  /**
   * Number of items matching the status code.
   */
  count?: bigint;
  /**
   * Number of items matching the status code for which billing is done. This
   * excludes virtual container items from the total count. This count would not
   * be applicable for items with ERROR or NEW_ITEM status code.
   */
  indexedItemsCount?: bigint;
  /**
   * Status of the items.
   */
  statusCode?:  | "CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED";
}

function serializeItemCountByStatus(data: any): ItemCountByStatus {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    indexedItemsCount: data["indexedItemsCount"] !== undefined ? String(data["indexedItemsCount"]) : undefined,
  };
}

function deserializeItemCountByStatus(data: any): ItemCountByStatus {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    indexedItemsCount: data["indexedItemsCount"] !== undefined ? BigInt(data["indexedItemsCount"]) : undefined,
  };
}

/**
 * Available metadata fields for the item.
 */
export interface ItemMetadata {
  /**
   * The name of the container for this item. Deletion of the container item
   * leads to automatic deletion of this item. Note: ACLs are not inherited from
   * a container item. To provide ACL inheritance for an item, use the
   * inheritAclFrom field. The maximum length is 1536 characters.
   */
  containerName?: string;
  /**
   * The BCP-47 language code for the item, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. The maximum
   * length is 32 characters.
   */
  contentLanguage?: string;
  /**
   * A set of named attributes associated with the item. This can be used for
   * influencing the ranking of the item based on the context in the request.
   * The maximum number of elements is 10.
   */
  contextAttributes?: ContextAttribute[];
  /**
   * The time when the item was created in the source repository.
   */
  createTime?: Date;
  /**
   * Hashing value provided by the API caller. This can be used with the
   * items.push method to calculate modified state. The maximum length is 2048
   * characters.
   */
  hash?: string;
  /**
   * A list of interactions for the item. Interactions are used to improve
   * Search quality, but are not exposed to end users. The maximum number of
   * elements is 1000.
   */
  interactions?: Interaction[];
  /**
   * Additional keywords or phrases that should match the item. Used internally
   * for user generated content. The maximum number of elements is 100. The
   * maximum length is 8192 characters.
   */
  keywords?: string[];
  /**
   * The original mime-type of ItemContent.content in the source repository.
   * The maximum length is 256 characters.
   */
  mimeType?: string;
  /**
   * The type of the item. This should correspond to the name of an object
   * definition in the schema registered for the data source. For example, if
   * the schema for the data source contains an object definition with name
   * 'document', then item indexing requests for objects of that type should set
   * objectType to 'document'. The maximum length is 256 characters.
   */
  objectType?: string;
  /**
   * Additional search quality metadata of the item
   */
  searchQualityMetadata?: SearchQualityMetadata;
  /**
   * Link to the source repository serving the data. Seach results apply this
   * link to the title. Whitespace or special characters may cause Cloud Seach
   * result links to trigger a redirect notice; to avoid this, encode the URL.
   * The maximum length is 2048 characters.
   */
  sourceRepositoryUrl?: string;
  /**
   * The title of the item. If given, this will be the displayed title of the
   * Search result. The maximum length is 2048 characters.
   */
  title?: string;
  /**
   * The time when the item was last modified in the source repository.
   */
  updateTime?: Date;
}

function serializeItemMetadata(data: any): ItemMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    interactions: data["interactions"] !== undefined ? data["interactions"].map((item: any) => (serializeInteraction(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeItemMetadata(data: any): ItemMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    interactions: data["interactions"] !== undefined ? data["interactions"].map((item: any) => (deserializeInteraction(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Container for type-specific extensions of an Item. This protobuf is defined
 * in a separate file to allow types to reference/extend the message without
 * depending on other fusebox protobufs. See items.proto.
 */
export interface ItemParts {
}

/**
 * This contains item's status and any errors.
 */
export interface ItemStatus {
  /**
   * Status code.
   */
  code?:  | "CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED";
  /**
   * Error details in case the item is in ERROR state.
   */
  processingErrors?: ProcessingError[];
  /**
   * Repository error reported by connector.
   */
  repositoryErrors?: RepositoryError[];
}

/**
 * Available structured data fields for the item.
 */
export interface ItemStructuredData {
  /**
   * Hashing value provided by the API caller. This can be used with the
   * items.push method to calculate modified state. The maximum length is 2048
   * characters.
   */
  hash?: string;
  /**
   * The structured data object that should conform to a registered object
   * definition in the schema for the data source.
   */
  object?: StructuredDataObject;
}

function serializeItemStructuredData(data: any): ItemStructuredData {
  return {
    ...data,
    object: data["object"] !== undefined ? serializeStructuredDataObject(data["object"]) : undefined,
  };
}

function deserializeItemStructuredData(data: any): ItemStructuredData {
  return {
    ...data,
    object: data["object"] !== undefined ? deserializeStructuredDataObject(data["object"]) : undefined,
  };
}

/**
 * An ItemThread is an ordered list of Items. An ItemThread corresponds to a
 * "conversation" in the context of mail. An Item belongs to exactly one
 * ItemThread.
 */
export interface ItemThread {
  clusterInfo?: ClusterInfo;
  /**
   * The Items in the ItemThread. In the context of a search, the list of Items
   * may be a subset of those that logically belong to the ItemThread. The
   * details of which items are included are available in the ItemThreadView
   * returned in the overall rpc response.
   */
  item?: FuseboxItem[];
  /**
   * The server id of the last item returned in the ItemThread. This can be
   * deduced from the [item] list but is provided for convenience. When manually
   * constructing an ItemThreadViewSpec to perform operations on the ItemThread,
   * this value can be used as the [high_item_id_watermark].
   */
  lastItemId?: bigint;
  matchInfo?: FuseboxItemThreadMatchInfo;
  /**
   * A snippet summarizing the thread. This field is only populated for
   * searches.
   */
  snippet?: string;
  /**
   * The MultiKey that identifies this thread. This value never changes, i.e.
   * remains constant across modifications to the thread, including addition,
   * relabeling, or deletion of contained Items. As such, the thread key may not
   * necessarily correspond to the key of an contained Item. Legacy note: The
   * "server_id" of the thread key is equivalent to the notion of the "original
   * thread id" in the CSS API.
   */
  threadKey?: MultiKey;
  /**
   * A base64 encoded and encrypted string generated from the Gaia Id and the
   * thread id. Used to generate the permalink for this thread, exposed from
   * Gmail API.
   */
  threadLocator?: string;
  /**
   * Next available id : 10
   */
  topicState?: TopicState;
  /**
   * The latest history operation id that resulted in a mutation of any item in
   * the thread.
   */
  version?: bigint;
}

function serializeItemThread(data: any): ItemThread {
  return {
    ...data,
    item: data["item"] !== undefined ? data["item"].map((item: any) => (serializeFuseboxItem(item))) : undefined,
    lastItemId: data["lastItemId"] !== undefined ? String(data["lastItemId"]) : undefined,
    matchInfo: data["matchInfo"] !== undefined ? serializeFuseboxItemThreadMatchInfo(data["matchInfo"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? serializeMultiKey(data["threadKey"]) : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeItemThread(data: any): ItemThread {
  return {
    ...data,
    item: data["item"] !== undefined ? data["item"].map((item: any) => (deserializeFuseboxItem(item))) : undefined,
    lastItemId: data["lastItemId"] !== undefined ? BigInt(data["lastItemId"]) : undefined,
    matchInfo: data["matchInfo"] !== undefined ? deserializeFuseboxItemThreadMatchInfo(data["matchInfo"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? deserializeMultiKey(data["threadKey"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * Identifies a jobsetted server as a target for Trigger dispatch.
 */
export interface JobsettedServerSpec {
  /**
   * E.g. "gateway", "stubby" etc. Leave unset to use the default unnamed port.
   */
  portName?: string;
  /**
   * E.g. "satellite-server", "bigtop-sync", etc.
   */
  serverName?: string;
}

export interface KeyValue {
  /**
   * Formatted text supported.
   */
  bottomLabel?: string;
  button?: Button;
  /**
   * Formatted text supported and always required.
   */
  content?: string;
  contentMultiline?: boolean;
  endIcon?: IconImage;
  icon?:  | "NONE" | "AIRPLANE" | "BOOKMARK" | "BUS" | "CAR" | "CLOCK" | "CONFIRMATION_NUMBER_ICON" | "DOLLAR" | "DESCRIPTION" | "EDIT" | "EDIT_NOTE" | "EMAIL" | "EVENT_PERFORMER" | "EVENT_SEAT" | "FLIGHT_ARRIVAL" | "FLIGHT_DEPARTURE" | "HOTEL" | "HOTEL_ROOM_TYPE" | "INVITE" | "MAP_PIN" | "MEMBERSHIP" | "MULTIPLE_PEOPLE" | "OFFER" | "OPEN_IN_NEW" | "PERSON" | "PHONE" | "RESTAURANT_ICON" | "SHOPPING_CART" | "STAR" | "STORE" | "TICKET" | "TRAIN" | "VIDEO_CAMERA" | "VIDEO_PLAY";
  /**
   * The alternative text of this icon_url which will be used for
   * accessibility.
   */
  iconAltText?: string;
  iconUrl?: string;
  imageStyle?:  | "CROP_TYPE_NOT_SET" | "SQUARE" | "CIRCLE" | "RECTANGLE_CUSTOM" | "RECTANGLE_4_3";
  /**
   * Only the top/bottom label + content region is clickable.
   */
  onClick?: OnClick;
  /**
   * The optional icon to display before the text content.
   */
  startIcon?: IconImage;
  switchWidget?: SwitchWidget;
  /**
   * Formatted text supported.
   */
  topLabel?: string;
}

/**
 * A label was added to some (subset of the) messages in this thread.
 */
export interface LabelAdded {
  labelId?: string;
  labelName?: string;
  messageKeys?: MultiKey[];
  syncId?: number;
}

function serializeLabelAdded(data: any): LabelAdded {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
  };
}

function deserializeLabelAdded(data: any): LabelAdded {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
  };
}

/**
 * A label was created.
 */
export interface LabelCreated {
}

/**
 * A label was deleted.
 */
export interface LabelDeleted {
}

/**
 * A label was removed from some (subset of the) messages in this thread.
 */
export interface LabelRemoved {
  labelId?: string;
  labelName?: string;
  messageKeys?: MultiKey[];
  syncId?: number;
}

function serializeLabelRemoved(data: any): LabelRemoved {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
  };
}

function deserializeLabelRemoved(data: any): LabelRemoved {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
  };
}

/**
 * A label was renamed.
 */
export interface LabelRenamed {
  oldCanonicalName?: string;
}

export interface Labels {
  /**
   * The display name of the labels. This is populated (instead of the id) when
   * the request fetch_spec has LABEL_DISPLAY_NAMES.
   */
  displayName?: string[];
  /**
   * The ids of the labels attached to the Item, e.g. "^i", "^x_1"
   */
  id?: string[];
}

/**
 * HistoryRecord for changes associated with a label, namely: LABEL_CREATED
 * LABEL_DELETED LABEL_RENAMED LABEL_UPDATED
 */
export interface LabelUpdate {
  canonicalName?: string;
  labelCreated?: LabelCreated;
  labelDeleted?: LabelDeleted;
  labelId?: string;
  labelRenamed?: LabelRenamed;
  labelUpdated?: LabelUpdated;
  syncId?: number;
}

/**
 * A label pref was updated outside of a rename, create, or delete.
 */
export interface LabelUpdated {
}

/**
 * The language configuration for the session.
 */
export interface LanguageConfig {
  /**
   * The spoken language(s) in BCP47 language code.
   */
  spokenLanguages?: string[];
}

export interface LdapGroupProto {
  groupName?: string;
}

export interface LdapUserProto {
  userName?: string;
}

/**
 * The original UploadMetadata that this DriveMetadata was converted from.
 */
export interface LegacyUploadMetadata {
  /**
   * A unique ID generated from legacy UploadMetadata. This is used for
   * interopping URLs after uploading blob to shared drive. Links in Classic
   * might break without this. go/drive-file-attachment-interop-from-dynamite.
   */
  legacyUniqueId?: string;
  /**
   * The blob in this UploadMetadata has been uploaded to shared drive. This
   * UploadMetadata is no longer attached to a message.
   * go/shared-drive-data-migration.
   */
  uploadMetadata?: UploadMetadata;
}

function serializeLegacyUploadMetadata(data: any): LegacyUploadMetadata {
  return {
    ...data,
    uploadMetadata: data["uploadMetadata"] !== undefined ? serializeUploadMetadata(data["uploadMetadata"]) : undefined,
  };
}

function deserializeLegacyUploadMetadata(data: any): LegacyUploadMetadata {
  return {
    ...data,
    uploadMetadata: data["uploadMetadata"] !== undefined ? deserializeUploadMetadata(data["uploadMetadata"]) : undefined,
  };
}

/**
 * Link metadata, for LINK segments. Anchor text should be stored in the "text"
 * field of the Segment, which can also serve as a fallback.
 */
export interface LinkData {
  /**
   * An Attachment represents the structured entity to which we are linking. It
   * contains an Embed (apps/tacotown/proto/embeds/embed_client.proto) with
   * fields specific to the appropriate type of linked entity. For example, if
   * we are linking to a photo album, the Embed may include the album ID and
   * gaia ID of the creator. Clients that understand the Embed type within the
   * Attachment may construct and/or decorate their link appropriately e.g. to
   * make use of type-specific functionality or first-party integrations. The
   * link_target and (if appropriate) display_url fields must still be set even
   * when an Attachment is present, so that clients who do not know how to
   * interpret the Attachment can fall back to those fields, and render the
   * Segment as an ordinary web link. N.B. Even when an Attachment is present,
   * the intention of a "LINK" Segment is for the Segment to be presented inline
   * with the rest of the text of a post or comment, with a clickable link or
   * other UI suitable for inlining (though the client may modify the UI based
   * on Attachment data, e.g. to add appropriate hovers, icons, etc.). When an
   * entity is intended to be rendered separately from the main body of the
   * post/comment, a separate Attachment proto can be added outside the set of
   * Segments. N.B. Within the Attachment, fields of EmbedClientItem have their
   * own visibility annotations, which should be enforced separately from
   * Segment visibility annotations. See:
   * apps/tacotown/proto/embeds/embed_annotations.proto
   */
  attachment?: SocialCommonAttachmentAttachment;
  /**
   * The hint to use when rendering the associated attachment. Ignored if there
   * is no associated attachment.
   */
  attachmentRenderHint?:  | "ATTACHMENT_RENDER_HINT_UNKNOWN" | "ATTACHMENT_RENDER_HINT_AFTER" | "ATTACHMENT_RENDER_HINT_INTERLEAVED";
  /**
   * If we wish to show the user a different (e.g. shortened) version of the
   * URL for display purposes, then that version should be set here. If this
   * field isn't set, link_target will be used for both purposes.
   */
  displayUrl?: string;
  /**
   * link_target is the URL to navigate to when clicked. This could be the
   * original URL, or a URL signed by the GWS URL signing service.
   */
  linkTarget?: string;
  /**
   * LinkType is an optional field that provides additional information
   * regarding link target. For example, link type can be identified as the
   * SELF_LINK when the request was executed from the same link as the link
   * target.
   */
  linkType?:  | "UNKNOWN_LINK_TYPE" | "SELF_LINK";
  /**
   * Title is an optional field that provides a short string that describes the
   * link or its destination. User interfaces often use title as a tooltip or
   * for accessibility purposes. However, they are of course free to present
   * this data in any form. This field is plain text.
   */
  title?: string;
}

function serializeLinkData(data: any): LinkData {
  return {
    ...data,
    attachment: data["attachment"] !== undefined ? serializeSocialCommonAttachmentAttachment(data["attachment"]) : undefined,
  };
}

function deserializeLinkData(data: any): LinkData {
  return {
    ...data,
    attachment: data["attachment"] !== undefined ? deserializeSocialCommonAttachmentAttachment(data["attachment"]) : undefined,
  };
}

export interface ListDataSourceResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  sources?: DataSource[];
}

export interface ListItemNamesForUnmappedIdentityResponse {
  itemNames?: string[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

export interface ListItemsResponse {
  items?: Item[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListItemsResponse(data: any): ListItemsResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeItem(item))) : undefined,
  };
}

function deserializeListItemsResponse(data: any): ListItemsResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeItem(item))) : undefined,
  };
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
 * List sources response.
 */
export interface ListQuerySourcesResponse {
  nextPageToken?: string;
  sources?: QuerySource[];
}

export interface ListSearchApplicationsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  searchApplications?: SearchApplication[];
}

function serializeListSearchApplicationsResponse(data: any): ListSearchApplicationsResponse {
  return {
    ...data,
    searchApplications: data["searchApplications"] !== undefined ? data["searchApplications"].map((item: any) => (serializeSearchApplication(item))) : undefined,
  };
}

function deserializeListSearchApplicationsResponse(data: any): ListSearchApplicationsResponse {
  return {
    ...data,
    searchApplications: data["searchApplications"] !== undefined ? data["searchApplications"].map((item: any) => (deserializeSearchApplication(item))) : undefined,
  };
}

export interface ListUnmappedIdentitiesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  unmappedIdentities?: UnmappedIdentity[];
}

export interface MatchInfo {
  /**
   * Reference keys for image attachments that matches search query.
   */
  matchingImageReferenceKey?: string[];
}

/**
 * Matched range of a snippet [start, end).
 */
export interface MatchRange {
  /**
   * End of the match in the snippet.
   */
  end?: number;
  /**
   * Starting position of the match in the snippet.
   */
  start?: number;
}

/**
 * An entity from the MDB namespace that is to be interpreted as a group. If
 * using this for authorization, you should do an exact match of the peer role
 * against group_name or any of the names in the Chubby expansion of the MDB
 * group named group_name.
 */
export interface MdbGroupProto {
  groupName?: string;
}

/**
 * An entity from the MDB namespace that is to be interpreted as a user. If
 * using this for authorization, you should only do an exact match on the peer
 * role against user_name.
 */
export interface MdbUserProto {
  /**
   * Do not set this field. Contact credentials-eng@ if you believe you
   * absolutely need to use it. This is the @prod.google.com Gaia ID that
   * corresponds to the MDB user, see go/authn-merge for details. This field may
   * always be safely ignored when performing an authorization check.
   */
  gaiaId?: bigint;
  userName?: string;
}

function serializeMdbUserProto(data: any): MdbUserProto {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? String(data["gaiaId"]) : undefined,
  };
}

function deserializeMdbUserProto(data: any): MdbUserProto {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? BigInt(data["gaiaId"]) : undefined,
  };
}

/**
 * Media resource.
 */
export interface Media {
  /**
   * Name of the media resource.
   */
  resourceName?: string;
}

/**
 * A meeting space is a persistent object that is the context for one or more
 * calls. The meeting space is what makes users find each other when they want
 * to meet and to find shared resources. With two exceptions, all the fields in
 * the meeting space resource are visible publicly to any client, even anonymous
 * users. The exceptions are that * The call_info field is only visible to
 * clients that have a device (as indicated by the meeting token) in the JOINED
 * or HIDDEN state. * The meeting_alias field will only be set for users who are
 * in the same domain as the meeting space. The meeting space resource (outside
 * call_info) should only contain information necessary to join a call in the
 * meeting space, and not any other metadata about the meeting space, such as
 * what organization it belongs to or things related to ongoing calls.
 */
export interface MeetingSpace {
  /**
   * Which number classes are accepted by this meeting at the moment? When
   * there is no ongoing conference, this field may change independent of the
   * version number of the MeetingSpace. When a conference starts, this field
   * will be locked to the value at that time, and then will be unlocked again
   * at the end of the conference.
   */
  acceptedNumberClass?:  | "NUMBER_CLASS_UNSPECIFIED" | "LOW_COST" | "HIGH_COST" | "LEGACY"[];
  /**
   * Broadcast access information for this meeting space.
   */
  broadcastAccess?: BroadcastAccess;
  /**
   * Information relevant to an ongoing conference. This field will be set in
   * responses if the client requesting the meeting space has a device in one of
   * the JOINED, HIDDEN, or MISSING_PREREQUISITES states. The field will also be
   * set without a created device if the client requesting the meeting space is
   * eligible to directly create a device in the JOINED state without knocking,
   * eg a same-domain joiner. Can also only be updated by clients with a device
   * in the JOINED state.
   */
  callInfo?: CallInfo;
  /**
   * The interop gateway access information for the meeting space. A gateway
   * access can be used when joining conferences from non-Google equipment
   * through an interop gateway.
   */
  gatewayAccess?: GatewayAccess;
  /**
   * The SIP based access methods that can be used to join the conference.
   */
  gatewaySipAccess?: GatewaySipAccess[];
  /**
   * An optional alias for the meeting space. The alias can in some cases be
   * resolved to the meeting space, similar to the meeting code. The limitation
   * is that the user needs to be in the same meeting domain as the meeting
   * space.
   */
  meetingAlias?: string;
  /**
   * A meeting code is a globally unique code which points to a meeting space.
   * Note: Meeting codes may be regenerated, which will cause old meeting codes
   * to become invalid.
   */
  meetingCode?: string;
  /**
   * A unique server-generated ID for the meeting space. This is the resource
   * name of the meeting space resource and has the form `spaces/`, where is a
   * sequence of characters in the [base64url
   * set](https://tools.ietf.org/html/rfc4648#section-5), without any `=`
   * characters.
   */
  meetingSpaceId?: string;
  /**
   * A URL to identify and access the meeting space. Output only.
   */
  meetingUrl?: string;
  /**
   * Output only. A URL that clients (e.g. Calendar) can use to show the web
   * page with all join methods available for this meeting space. This link is
   * also used in iOS universal links and Android intents, used for opening the
   * "More ways to join" view in the Meet mobile apps. Example:
   * https://tel.meet/mee-ting-cod?pin=1234567891011 Here, "pin" is the
   * universal phone PIN. We include it explicitly to better support the offline
   * case on the mobile. This is set when the meeting space has either a
   * universal PIN or an interop PIN and clients who can show a "more ways to
   * join" button should show it whenever this field is set.
   */
  readonly moreJoinUrl?: string;
  /**
   * All regional phone access methods for this meeting space. Can be empty.
   */
  phoneAccess?: PhoneAccess[];
  /**
   * Settings of the meeting space.
   */
  settings?: Settings;
  /**
   * A universal phone access method for this meeting space. Can be unset.
   */
  universalPhoneAccess?: UniversalPhoneAccess;
}

function serializeMeetingSpace(data: any): MeetingSpace {
  return {
    ...data,
    callInfo: data["callInfo"] !== undefined ? serializeCallInfo(data["callInfo"]) : undefined,
  };
}

function deserializeMeetingSpace(data: any): MeetingSpace {
  return {
    ...data,
    callInfo: data["callInfo"] !== undefined ? deserializeCallInfo(data["callInfo"]) : undefined,
  };
}

export interface Member {
  roster?: Roster;
  user?: User;
}

function serializeMember(data: any): Member {
  return {
    ...data,
    user: data["user"] !== undefined ? serializeUser(data["user"]) : undefined,
  };
}

function deserializeMember(data: any): Member {
  return {
    ...data,
    user: data["user"] !== undefined ? deserializeUser(data["user"]) : undefined,
  };
}

/**
 * Eventually this can be updated to a oneOf User, Space (for nested spaces),
 * Bots or Service, as and when these use cases come up.
 */
export interface MemberId {
  /**
   * Unique, immutable ID of the Roster.
   */
  rosterId?: RosterId;
  /**
   * Unique, immutable ID of the User.
   */
  userId?: UserId;
}

function serializeMemberId(data: any): MemberId {
  return {
    ...data,
    userId: data["userId"] !== undefined ? serializeUserId(data["userId"]) : undefined,
  };
}

function deserializeMemberId(data: any): MemberId {
  return {
    ...data,
    userId: data["userId"] !== undefined ? deserializeUserId(data["userId"]) : undefined,
  };
}

/**
 * Annotation metadata to display system messages for membership changes. Next
 * Tag: 8
 */
export interface MembershipChangedMetadata {
  affectedMemberProfiles?: Member[];
  /**
   * List of users and rosters whose membership status changed.
   */
  affectedMembers?: MemberId[];
  affectedMemberships?: AffectedMembership[];
  /**
   * The user whose action triggered this system message.
   */
  initiator?: UserId;
  /**
   * Complete member profiles, when ListTopicsRequest FetchOptions.USER is set.
   * Otherwise, only the id will be filled in.
   */
  initiatorProfile?: User;
  /**
   * The type of the user who initiated this membership change.
   */
  initiatorType?:  | "INITIATOR_TYPE_UNSPECIFIED" | "INITIATOR_TYPE_END_USER" | "INITIATOR_TYPE_ADMIN";
  type?:  | "TYPE_UNSPECIFIED" | "INVITED" | "JOINED" | "ADDED" | "REMOVED" | "LEFT" | "BOT_ADDED" | "BOT_REMOVED" | "KICKED_DUE_TO_OTR_CONFLICT" | "ROLE_UPDATED" | "ROLE_TARGET_AUDIENCE_UPDATED";
}

function serializeMembershipChangedMetadata(data: any): MembershipChangedMetadata {
  return {
    ...data,
    affectedMemberProfiles: data["affectedMemberProfiles"] !== undefined ? data["affectedMemberProfiles"].map((item: any) => (serializeMember(item))) : undefined,
    affectedMembers: data["affectedMembers"] !== undefined ? data["affectedMembers"].map((item: any) => (serializeMemberId(item))) : undefined,
    affectedMemberships: data["affectedMemberships"] !== undefined ? data["affectedMemberships"].map((item: any) => (serializeAffectedMembership(item))) : undefined,
    initiator: data["initiator"] !== undefined ? serializeUserId(data["initiator"]) : undefined,
    initiatorProfile: data["initiatorProfile"] !== undefined ? serializeUser(data["initiatorProfile"]) : undefined,
  };
}

function deserializeMembershipChangedMetadata(data: any): MembershipChangedMetadata {
  return {
    ...data,
    affectedMemberProfiles: data["affectedMemberProfiles"] !== undefined ? data["affectedMemberProfiles"].map((item: any) => (deserializeMember(item))) : undefined,
    affectedMembers: data["affectedMembers"] !== undefined ? data["affectedMembers"].map((item: any) => (deserializeMemberId(item))) : undefined,
    affectedMemberships: data["affectedMemberships"] !== undefined ? data["affectedMemberships"].map((item: any) => (deserializeAffectedMembership(item))) : undefined,
    initiator: data["initiator"] !== undefined ? deserializeUserId(data["initiator"]) : undefined,
    initiatorProfile: data["initiatorProfile"] !== undefined ? deserializeUser(data["initiatorProfile"]) : undefined,
  };
}

export interface MembershipChangeEvent {
  /**
   * This should only be set when MembershipChange type is LEAVE.
   */
  leaveReason?:  | "LEAVE_REASON_UNKNOWN" | "FORCE_HISTORY_POLICY_CHANGE" | "USER_INITIATED";
  participantId?: StoredParticipantId[];
  type?:  | "JOIN" | "LEAVE";
}

function serializeMembershipChangeEvent(data: any): MembershipChangeEvent {
  return {
    ...data,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (serializeStoredParticipantId(item))) : undefined,
  };
}

function deserializeMembershipChangeEvent(data: any): MembershipChangeEvent {
  return {
    ...data,
    participantId: data["participantId"] !== undefined ? data["participantId"].map((item: any) => (deserializeStoredParticipantId(item))) : undefined,
  };
}

/**
 * This is deprecated and please use SelectionControl by setting type to
 * DROPDOWN.
 */
export interface Menu {
  items?: MenuItem[];
  /**
   * Label used to be displayed ahead of the menu. It is optional.
   */
  label?: string;
  /**
   * The name of the text field which is will be used in FormInput.
   */
  name?: string;
  /**
   * If specified, form is submitted when selection changed. If not specified,
   * developer will need to specify a separate button.
   */
  onChange?: FormAction;
}

export interface MenuItem {
  selected?: boolean;
  /**
   * The text to be displayed.
   */
  text?: string;
  /**
   * The value associated with this item which will be sent back to app
   * scripts. Client should use as a form input value.
   */
  value?: string;
}

/**
 * Message posted to a Space.
 */
export interface Message {
  /**
   * Annotations parsed and extracted from the text body.
   */
  annotations?: Annotation[];
  /**
   * Custom display profile info for apps. Leave the field empty for real
   * users.
   */
  appProfile?: AppsDynamiteSharedAppProfile;
  /**
   * Attachments parsed from incoming webhooks
   */
  attachments?: Attachment[];
  /**
   * Lightweight message attributes which values are calculated and set in the
   * servers.
   */
  attributes?: MessageAttributes;
  /**
   * Responses from bots indicating if extra auth/config is needed.
   */
  botResponses?: BotResponse[];
  /**
   * Communal labels associated with a message. These exist on the message
   * itself regardless of which user fetches them. Order of entries is arbitrary
   * and will not list duplicates of the same label_id. See
   * go/chat-labels-design for details.
   */
  communalLabels?: CommunalLabelTag[];
  readonly contentReportSummary?: ContentReportSummary;
  /**
   * Time when the Message was posted in microseconds.
   */
  createTime?: bigint;
  /**
   * ID of the User who posted the Message. This includes information to
   * identify if this was posted by an App on behalf of a user.
   */
  creatorId?: UserId;
  /**
   * Indicates who can delete the message. This field is set on the read path
   * (e.g. ListTopics) but doesn’t have any effect on the write path (e.g.
   * CreateMessageRequest).
   */
  deletableBy?:  | "PERMISSION_UNSPECIFIED" | "PERMISSION_NO_ONE" | "PERMISSION_CREATOR" | "PERMISSION_MEMBER";
  /**
   * Was this message deleted by Vault (Only used for Vault support) This is
   * false if message is live or message was deleted by user.
   */
  deletedByVault?: boolean;
  /**
   * Time when the Message was deleted in microseconds. This field is set to
   * nonzero value only for Messages deleted globally.
   */
  deleteTime?: bigint;
  /**
   * Time when the Message was per-user deleted by the message requester in
   * microseconds. This field is set to nonzero value only for Message per-user
   * deleted by the requester.
   */
  deleteTimeForRequester?: bigint;
  /**
   * Data Loss Prevention scan information for this message. Messages are
   * evaluated in the backend on create message/topic and edit message actions.
   * DEPRECATED: Use DATA_LOSS_PREVENTION Annotation.
   */
  dlpScanSummary?: DlpScanSummary;
  /**
   * Indicates who can edit the message. This field is set on the read path
   * (e.g. ListTopics) but doesn’t have any effect on the write path (e.g.
   * CreateMessageRequest).
   */
  editableBy?:  | "PERMISSION_UNSPECIFIED" | "PERMISSION_NO_ONE" | "PERMISSION_CREATOR" | "PERMISSION_MEMBER";
  /**
   * A plain-text description of the attachment, used when clients cannot
   * display formatted attachment (e.g. mobile push notifications).
   */
  fallbackText?: string;
  /**
   * ID of the resource.
   */
  id?: MessageId;
  /**
   * Whether the message is content purged. Content purged messages contain
   * only data required for tombstone (see go/chat-infinite-tombstone). This
   * field is only used by Vault to display tombstone and should only be set to
   * true if the message is a tombstone.
   */
  isContentPurged?: boolean;
  /**
   * Output only. Indicates if the message is an inline reply. Set to true only
   * if the message's ParentPath is non-NULL. Currently, only inline replies
   * have non-NULL ParentPath. See go/chat-be-inline-reply-indicator.
   */
  readonly isInlineReply?: boolean;
  /**
   * If the message was edited by a user, timestamp of the last edit, in
   * microseconds.
   */
  lastEditTime?: bigint;
  /**
   * Time when the Message text was last updated in microseconds.
   */
  lastUpdateTime?: bigint;
  /**
   * A unique id specified on the client side.
   */
  localId?: string;
  /**
   * An optional payload (restricted to 1P applications) that will be stored
   * with this message. This can only be set by the 1P API and should be used to
   * deliver additional data such a 1P sync version, 1P entity ID to the client
   * for more advanced functionality [Eg. inform Group Tasks tab of new version
   * while linking, fetch & render a live Task/Meet call tile].
   */
  messageIntegrationPayload?: AppsDynamiteSharedMessageIntegrationPayload;
  /**
   * Where the message was posted from
   */
  messageOrigin?:  | "ORIGIN_NOT_SET" | "ORIGIN_DYNAMITE" | "ORIGIN_BABEL_INTEROP_LIVE" | "ORIGIN_BABEL_INTEROP_RETRY" | "ORIGIN_BABEL" | "ORIGIN_BABEL_DUAL_WRITE" | "ORIGIN_BABEL_DUAL_WRITE_RETRY" | "ORIGIN_BACKFILL_FROM_PAPYRUS" | "ORIGIN_BACKFILL_FROM_GMAIL_ARCHIVE";
  /**
   * State of the message, indicating whether the message is visible to all
   * members in the group or is only visible to the sender only, or the
   * private_message_viewer if it is set.
   */
  messageState?:  | "PUBLIC" | "PRIVATE";
  /**
   * Indicates if this message contains any suggestions that were provided by
   * any Apps.
   */
  originAppSuggestions?: AppsDynamiteSharedOriginAppSuggestion[];
  /**
   * Personal labels associated with a message for the viewing user. Order of
   * entries is arbitrary and will not list duplicates of the same label_id. See
   * go/chat-labels-design for details. NOTE: This will be unpopulated in the
   * case of SpaceChangelog events.
   */
  personalLabels?: PersonalLabelTag[];
  /**
   * A list of per-user private information. This is deprecated, because we no
   * longer plan to support partially private messages or private messages for
   * multiple users. The message_state and private_message_viewer fields should
   * be sufficient for this infrastructure.
   */
  privateMessageInfos?: PrivateMessageInfo[];
  /**
   * Should only be set if the Message State is PRIVATE. If set, the message
   * content is only visible to this user (and any apps associated with the
   * message), as well as the message creator. If unset, a private message is
   * visible to the message creator only.
   */
  privateMessageViewer?: UserId;
  /**
   * Contains additional (currently Hangouts Classic only) properties
   * applicable to this message.
   */
  props?: MessageProps;
  /**
   * Output only. Whether this message has been quoted by another message or
   * not. Used by clients to handle message edit flows for messages that have
   * been quoted.
   */
  readonly quotedByState?:  | "QUOTED_BY_STATE_UNSPECIFIED" | "QUOTED_BY_STATE_HAS_BEEN_QUOTED" | "QUOTED_BY_STATE_HAS_NOT_BEEN_QUOTED";
  /**
   * Output only. Metadata for a message that is quoted by this message.
   */
  readonly quotedMessageMetadata?: QuotedMessageMetadata;
  /**
   * A list of user reactions to this message. Ordered by the timestamp of the
   * first reaction, ascending (oldest to newest).
   */
  reactions?: AppsDynamiteSharedReaction[];
  /**
   * Output only. Details of content reports. Set only when the request asks
   * for it.
   */
  readonly reports?: ContentReport[];
  /**
   * The retention settings of the message.
   */
  retentionSettings?: AppsDynamiteSharedRetentionSettings;
  /**
   * Used by clients to correctly log format type for message creation due to
   * complexity with client side optimistic update (see
   * go/content-metric-post-send-logging for details). Currently, only set by
   * server in the message or topic creation path.
   */
  richTextFormattingType?:  | "NONE" | "MARKDOWN" | "FORMAT_ANNOTATIONS" | "FORMAT_ANNOTATIONS_IGNORED" | "FORMAT_ANNOTATIONS_IGNORED_WITH_MARKDOWN";
  /**
   * A client-specified string that can be used to uniquely identify a message
   * in a space, in lieu of `id.message_id`.
   */
  secondaryMessageKey?: string;
  /**
   * Plaintext body of the Message.
   */
  textBody?: string;
  /**
   * Information for the stoning of a Message.
   */
  tombstoneMetadata?: TombstoneMetadata;
  /**
   * ID of the User who last updated (created/edited/deleted) the Message. This
   * includes information to identify if this was updated by an App on behalf of
   * a user.
   */
  updaterId?: UserId;
  /**
   * UploadMetadata b/36864213 is an ongoing effort to move UploadMetadata out
   * of annotations field and save it to upload_metadata field only. After the
   * migration, UploadMetadata will only be saved in this field.
   */
  uploadMetadata?: UploadMetadata[];
}

function serializeMessage(data: any): Message {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (serializeAnnotation(item))) : undefined,
    attachments: data["attachments"] !== undefined ? data["attachments"].map((item: any) => (serializeAttachment(item))) : undefined,
    botResponses: data["botResponses"] !== undefined ? data["botResponses"].map((item: any) => (serializeBotResponse(item))) : undefined,
    communalLabels: data["communalLabels"] !== undefined ? data["communalLabels"].map((item: any) => (serializeCommunalLabelTag(item))) : undefined,
    createTime: data["createTime"] !== undefined ? String(data["createTime"]) : undefined,
    creatorId: data["creatorId"] !== undefined ? serializeUserId(data["creatorId"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? String(data["deleteTime"]) : undefined,
    deleteTimeForRequester: data["deleteTimeForRequester"] !== undefined ? String(data["deleteTimeForRequester"]) : undefined,
    lastEditTime: data["lastEditTime"] !== undefined ? String(data["lastEditTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? String(data["lastUpdateTime"]) : undefined,
    messageIntegrationPayload: data["messageIntegrationPayload"] !== undefined ? serializeAppsDynamiteSharedMessageIntegrationPayload(data["messageIntegrationPayload"]) : undefined,
    originAppSuggestions: data["originAppSuggestions"] !== undefined ? data["originAppSuggestions"].map((item: any) => (serializeAppsDynamiteSharedOriginAppSuggestion(item))) : undefined,
    privateMessageInfos: data["privateMessageInfos"] !== undefined ? data["privateMessageInfos"].map((item: any) => (serializePrivateMessageInfo(item))) : undefined,
    privateMessageViewer: data["privateMessageViewer"] !== undefined ? serializeUserId(data["privateMessageViewer"]) : undefined,
    props: data["props"] !== undefined ? serializeMessageProps(data["props"]) : undefined,
    reactions: data["reactions"] !== undefined ? data["reactions"].map((item: any) => (serializeAppsDynamiteSharedReaction(item))) : undefined,
    retentionSettings: data["retentionSettings"] !== undefined ? serializeAppsDynamiteSharedRetentionSettings(data["retentionSettings"]) : undefined,
    updaterId: data["updaterId"] !== undefined ? serializeUserId(data["updaterId"]) : undefined,
    uploadMetadata: data["uploadMetadata"] !== undefined ? data["uploadMetadata"].map((item: any) => (serializeUploadMetadata(item))) : undefined,
  };
}

function deserializeMessage(data: any): Message {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (deserializeAnnotation(item))) : undefined,
    attachments: data["attachments"] !== undefined ? data["attachments"].map((item: any) => (deserializeAttachment(item))) : undefined,
    botResponses: data["botResponses"] !== undefined ? data["botResponses"].map((item: any) => (deserializeBotResponse(item))) : undefined,
    communalLabels: data["communalLabels"] !== undefined ? data["communalLabels"].map((item: any) => (deserializeCommunalLabelTag(item))) : undefined,
    createTime: data["createTime"] !== undefined ? BigInt(data["createTime"]) : undefined,
    creatorId: data["creatorId"] !== undefined ? deserializeUserId(data["creatorId"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? BigInt(data["deleteTime"]) : undefined,
    deleteTimeForRequester: data["deleteTimeForRequester"] !== undefined ? BigInt(data["deleteTimeForRequester"]) : undefined,
    lastEditTime: data["lastEditTime"] !== undefined ? BigInt(data["lastEditTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? BigInt(data["lastUpdateTime"]) : undefined,
    messageIntegrationPayload: data["messageIntegrationPayload"] !== undefined ? deserializeAppsDynamiteSharedMessageIntegrationPayload(data["messageIntegrationPayload"]) : undefined,
    originAppSuggestions: data["originAppSuggestions"] !== undefined ? data["originAppSuggestions"].map((item: any) => (deserializeAppsDynamiteSharedOriginAppSuggestion(item))) : undefined,
    privateMessageInfos: data["privateMessageInfos"] !== undefined ? data["privateMessageInfos"].map((item: any) => (deserializePrivateMessageInfo(item))) : undefined,
    privateMessageViewer: data["privateMessageViewer"] !== undefined ? deserializeUserId(data["privateMessageViewer"]) : undefined,
    props: data["props"] !== undefined ? deserializeMessageProps(data["props"]) : undefined,
    quotedMessageMetadata: data["quotedMessageMetadata"] !== undefined ? deserializeQuotedMessageMetadata(data["quotedMessageMetadata"]) : undefined,
    reactions: data["reactions"] !== undefined ? data["reactions"].map((item: any) => (deserializeAppsDynamiteSharedReaction(item))) : undefined,
    reports: data["reports"] !== undefined ? data["reports"].map((item: any) => (deserializeContentReport(item))) : undefined,
    retentionSettings: data["retentionSettings"] !== undefined ? deserializeAppsDynamiteSharedRetentionSettings(data["retentionSettings"]) : undefined,
    updaterId: data["updaterId"] !== undefined ? deserializeUserId(data["updaterId"]) : undefined,
    uploadMetadata: data["uploadMetadata"] !== undefined ? data["uploadMetadata"].map((item: any) => (deserializeUploadMetadata(item))) : undefined,
  };
}

/**
 * A message was added. Specifying id and initial labels.
 */
export interface MessageAdded {
  attributeIds?: string[];
  labelIds?: string[];
  messageKey?: MultiKey;
  /**
   * Note that there can be fewer sync ids than label ids.
   */
  syncIds?: number[];
}

function serializeMessageAdded(data: any): MessageAdded {
  return {
    ...data,
    messageKey: data["messageKey"] !== undefined ? serializeMultiKey(data["messageKey"]) : undefined,
  };
}

function deserializeMessageAdded(data: any): MessageAdded {
  return {
    ...data,
    messageKey: data["messageKey"] !== undefined ? deserializeMultiKey(data["messageKey"]) : undefined,
  };
}

/**
 * Stores tombstone message attributes:
 * go/tombstone-message-attributes-overview
 */
export interface MessageAttributes {
  /**
   * If true: message is a tombstone in the client. Default false.
   */
  isTombstone?: boolean;
}

/**
 * Some (subset of the) messages in this thread were deleted.
 */
export interface MessageDeleted {
  /**
   * Value of coproc's message delete history record extension that exports
   * /imapsync/folder attribute of deleted messages which have ^is label.
   */
  imapSyncMappings?: ImapSyncDelete[];
  messageKeys?: MultiKey[];
  /**
   * Value of coproc's message delete history record extension that exports
   * /wonder/message_mapping/{vertical} attribute of deleted messages which have
   * smartmail label (eg. ^cob_sm_invoice, etc).
   */
  wonderCardMappings?: WonderCardDelete[];
}

function serializeMessageDeleted(data: any): MessageDeleted {
  return {
    ...data,
    imapSyncMappings: data["imapSyncMappings"] !== undefined ? data["imapSyncMappings"].map((item: any) => (serializeImapSyncDelete(item))) : undefined,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
    wonderCardMappings: data["wonderCardMappings"] !== undefined ? data["wonderCardMappings"].map((item: any) => (serializeWonderCardDelete(item))) : undefined,
  };
}

function deserializeMessageDeleted(data: any): MessageDeleted {
  return {
    ...data,
    imapSyncMappings: data["imapSyncMappings"] !== undefined ? data["imapSyncMappings"].map((item: any) => (deserializeImapSyncDelete(item))) : undefined,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
    wonderCardMappings: data["wonderCardMappings"] !== undefined ? data["wonderCardMappings"].map((item: any) => (deserializeWonderCardDelete(item))) : undefined,
  };
}

/**
 * Primary key for Message resource.
 */
export interface MessageId {
  /**
   * Opaque, server-assigned ID of the Message. While this ID is guaranteed to
   * be unique within the Space, it's not guaranteed to be globally unique.
   */
  messageId?: string;
  /**
   * ID of the Message's immediate parent.
   */
  parentId?: MessageParentId;
}

export interface MessageInfo {
  /**
   * Message author’s user type (human/bot).
   */
  authorUserType?:  | "HUMAN" | "BOT";
  /**
   * The content of a matching message.
   */
  message?: Message;
  /**
   * Searcher's membership state in the space where the message is posted.
   */
  searcherMembershipState?:  | "MEMBER_UNKNOWN" | "MEMBER_INVITED" | "MEMBER_JOINED" | "MEMBER_NOT_A_MEMBER" | "MEMBER_FAILED";
}

function serializeMessageInfo(data: any): MessageInfo {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeMessageInfo(data: any): MessageInfo {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * Primary key identifying Message resource's immediate parent. For top-level
 * Messages, either topic_id or chat_id is populated. For replies, message_id is
 * populated with the topic Message's ID.
 */
export interface MessageParentId {
  /**
   * ID of the Topic this Message is posted to. NEXT TAG : 5
   */
  topicId?: TopicId;
}

/**
 * Container for storing properties applicable to messages. For now (until
 * storage consolidation is complete), it will only be used for babel props. In
 * the future it could be used to house Dynamite properties for
 * experimenting/rapid prototyping.
 */
export interface MessageProps {
  babelProps?: BabelMessageProps;
}

function serializeMessageProps(data: any): MessageProps {
  return {
    ...data,
    babelProps: data["babelProps"] !== undefined ? serializeBabelMessageProps(data["babelProps"]) : undefined,
  };
}

function deserializeMessageProps(data: any): MessageProps {
  return {
    ...data,
    babelProps: data["babelProps"] !== undefined ? deserializeBabelMessageProps(data["babelProps"]) : undefined,
  };
}

/**
 * This is proto2's version of MessageSet.
 */
export interface MessageSet {
}

/**
 * Metadata of a matched search result.
 */
export interface Metadata {
  /**
   * The creation time for this document or object in the search result.
   */
  createTime?: Date;
  /**
   * Options that specify how to display a structured data search result.
   */
  displayOptions?: ResultDisplayMetadata;
  /**
   * Indexed fields in structured data, returned as a generic named property.
   */
  fields?: NamedProperty[];
  /**
   * Mime type of the search result.
   */
  mimeType?: string;
  /**
   * Object type of the search result.
   */
  objectType?: string;
  /**
   * Owner (usually creator) of the document or object of the search result.
   */
  owner?: Person;
  /**
   * The named source for the result, such as Gmail.
   */
  source?: Source;
  /**
   * The thumbnail URL of the result.
   */
  thumbnailUrl?: string;
  /**
   * The last modified date for the object in the search result. If not set in
   * the item, the value returned here is empty. When `updateTime` is used for
   * calculating freshness and is not set, this value defaults to 2 years from
   * the current time.
   */
  updateTime?: Date;
}

function serializeMetadata(data: any): Metadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    displayOptions: data["displayOptions"] !== undefined ? serializeResultDisplayMetadata(data["displayOptions"]) : undefined,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (serializeNamedProperty(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeMetadata(data: any): Metadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    displayOptions: data["displayOptions"] !== undefined ? deserializeResultDisplayMetadata(data["displayOptions"]) : undefined,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (deserializeNamedProperty(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A metaline is a list of properties that are displayed along with the search
 * result to provide context.
 */
export interface Metaline {
  /**
   * The list of displayed properties for the metaline. The maximum number of
   * properties is 5.
   */
  properties?: DisplayedProperty[];
}

/**
 * A union-like type for identifiying an object in storage. MultiKeys contain
 * multiple key fields, each in a separate key space. At least one key field
 * must be set. More than one key field may be set as long as all key values
 * refer to the same object. All objects in storage have unique server_id keys.
 * All MultiKeys returned from storage to storage clients will always have the
 * server_id field set. When creating an object, if a MultiKey without a
 * server_id is supplied to storage, the storage system will auto-assign a
 * server ID to the new object. For all other storage requests (i.e. those not
 * creating new objects), clients may omit server_id (as long as they supply
 * another key). Instead of server ids, clients can specify string based
 * client_assigned_perm_id keys. Mail message drafts are a prime example of
 * these kinds of objects. Each time a user saves a new version of a draft, the
 * storage system needs to create a new object with the updated draft content
 * and needs to delete the object containing the old content. The new object
 * gets a new SERVER_ID but should get the same CLIENT_ASSIGNED_PERM_ID as the
 * now-deleted object containing the old content. Carrying forward the perm ID
 * allows it to be used to consistently refer to the same logical object across
 * revisions. These perm IDs save sync clients from having to deal with changing
 * object IDs. For example, assume there's a mail message in storage with
 * SERVER_ID = 123 and CLIENT_ASSIGNED_PERM_ID = "foo". The following are all
 * valid ways of addressing the object using MultiKeys: 1) MultiKey { server_id
 * = 123 } 2) MultiKey { server_id = 123, client_assigned_perm_id = "foo" } 3)
 * MultiKey { client_assigned_perm_id = "foo" } Multikeys are never serialized
 * in the storage. The individual keys are extracted and processed separately.
 * Both the integer ids as well as string ids are indexed for efficient
 * retrieval using the same fields in the backend. See go/tingle-multikeys for
 * more information on background and motivation.
 */
export interface MultiKey {
  /**
   * A client-assigned string based key.
   */
  clientAssignedPermId?: string;
  /**
   * A server-assigned ID. This ID must be used only by Gmail and is
   * constructed using millesecond ts << 20 + randomness. The ID affects the
   * sort order of the index.
   */
  serverId?: bigint;
}

function serializeMultiKey(data: any): MultiKey {
  return {
    ...data,
    serverId: data["serverId"] !== undefined ? String(data["serverId"]) : undefined,
  };
}

function deserializeMultiKey(data: any): MultiKey {
  return {
    ...data,
    serverId: data["serverId"] !== undefined ? BigInt(data["serverId"]) : undefined,
  };
}

/**
 * A person's name.
 */
export interface Name {
  /**
   * The read-only display name formatted according to the locale specified by
   * the viewer's account or the `Accept-Language` HTTP header.
   */
  displayName?: string;
}

/**
 * A typed name-value pair for structured data. The type of the value should be
 * the same as the registered type for the `name` property in the object
 * definition of `objectType`.
 */
export interface NamedProperty {
  booleanValue?: boolean;
  dateValues?: DateValues;
  doubleValues?: DoubleValues;
  enumValues?: EnumValues;
  htmlValues?: HtmlValues;
  integerValues?: IntegerValues;
  /**
   * The name of the property. This name should correspond to the name of the
   * property that was registered for object definition in the schema. The
   * maximum allowable length for this property is 256 characters.
   */
  name?: string;
  objectValues?: ObjectValues;
  textValues?: TextValues;
  timestampValues?: TimestampValues;
}

function serializeNamedProperty(data: any): NamedProperty {
  return {
    ...data,
    integerValues: data["integerValues"] !== undefined ? serializeIntegerValues(data["integerValues"]) : undefined,
    objectValues: data["objectValues"] !== undefined ? serializeObjectValues(data["objectValues"]) : undefined,
    timestampValues: data["timestampValues"] !== undefined ? serializeTimestampValues(data["timestampValues"]) : undefined,
  };
}

function deserializeNamedProperty(data: any): NamedProperty {
  return {
    ...data,
    integerValues: data["integerValues"] !== undefined ? deserializeIntegerValues(data["integerValues"]) : undefined,
    objectValues: data["objectValues"] !== undefined ? deserializeObjectValues(data["objectValues"]) : undefined,
    timestampValues: data["timestampValues"] !== undefined ? deserializeTimestampValues(data["timestampValues"]) : undefined,
  };
}

/**
 * Represents an OAuth consumer, a/k/a AuthSub target. These principals are
 * identified by domain name (e.g., example.com). Historically, Dasher domain
 * GAIA group IDs have been used instead, but that doesn't work:
 * http://go/tricky-gaia-ids
 */
export interface OAuthConsumerProto {
  domain?: string;
}

/**
 * The definition for an object within a data source.
 */
export interface ObjectDefinition {
  /**
   * The name for the object, which then defines its type. Item indexing
   * requests should set the objectType field equal to this value. For example,
   * if *name* is *Document*, then indexing requests for items of type Document
   * should set objectType equal to *Document*. Each object definition must be
   * uniquely named within a schema. The name must start with a letter and can
   * only contain letters (A-Z, a-z) or numbers (0-9). The maximum length is 256
   * characters.
   */
  name?: string;
  /**
   * The optional object-specific options.
   */
  options?: ObjectOptions;
  /**
   * The property definitions for the object. The maximum number of elements is
   * 1000.
   */
  propertyDefinitions?: PropertyDefinition[];
}

function serializeObjectDefinition(data: any): ObjectDefinition {
  return {
    ...data,
    options: data["options"] !== undefined ? serializeObjectOptions(data["options"]) : undefined,
    propertyDefinitions: data["propertyDefinitions"] !== undefined ? data["propertyDefinitions"].map((item: any) => (serializePropertyDefinition(item))) : undefined,
  };
}

function deserializeObjectDefinition(data: any): ObjectDefinition {
  return {
    ...data,
    options: data["options"] !== undefined ? deserializeObjectOptions(data["options"]) : undefined,
    propertyDefinitions: data["propertyDefinitions"] !== undefined ? data["propertyDefinitions"].map((item: any) => (deserializePropertyDefinition(item))) : undefined,
  };
}

/**
 * The display options for an object.
 */
export interface ObjectDisplayOptions {
  /**
   * Defines the properties that are displayed in the metalines of the search
   * results. The property values are displayed in the order given here. If a
   * property holds multiple values, all of the values are displayed before the
   * next properties. For this reason, it is a good practice to specify singular
   * properties before repeated properties in this list. All of the properties
   * must set is_returnable to true. The maximum number of metalines is 3.
   */
  metalines?: Metaline[];
  /**
   * The user friendly label to display in the search result to indicate the
   * type of the item. This is OPTIONAL; if not provided, an object label isn't
   * displayed on the context line of the search results. The maximum length is
   * 64 characters.
   */
  objectDisplayLabel?: string;
}

/**
 * The options for an object.
 */
export interface ObjectOptions {
  /**
   * The options that determine how the object is displayed in the Cloud Search
   * results page.
   */
  displayOptions?: ObjectDisplayOptions;
  /**
   * The freshness options for an object.
   */
  freshnessOptions?: FreshnessOptions;
  /**
   * Operators that can be used to filter suggestions. For Suggest API, only
   * operators mentioned here will be honored in the FilterOptions. Only TEXT
   * and ENUM operators are supported. NOTE: "objecttype", "type" and "mimetype"
   * are already supported. This property is to configure schema specific
   * operators. Even though this is an array, only one operator can be
   * specified. This is an array for future extensibility. Operators mapping to
   * multiple properties within the same object are not supported. If the
   * operator spans across different object types, this option has to be set
   * once for each object definition.
   */
  suggestionFilteringOperators?: string[];
}

function serializeObjectOptions(data: any): ObjectOptions {
  return {
    ...data,
    freshnessOptions: data["freshnessOptions"] !== undefined ? serializeFreshnessOptions(data["freshnessOptions"]) : undefined,
  };
}

function deserializeObjectOptions(data: any): ObjectOptions {
  return {
    ...data,
    freshnessOptions: data["freshnessOptions"] !== undefined ? deserializeFreshnessOptions(data["freshnessOptions"]) : undefined,
  };
}

/**
 * The options for object properties.
 */
export interface ObjectPropertyOptions {
  /**
   * The properties of the sub-object. These properties represent a nested
   * object. For example, if this property represents a postal address, the
   * subobjectProperties might be named *street*, *city*, and *state*. The
   * maximum number of elements is 1000.
   */
  subobjectProperties?: PropertyDefinition[];
}

function serializeObjectPropertyOptions(data: any): ObjectPropertyOptions {
  return {
    ...data,
    subobjectProperties: data["subobjectProperties"] !== undefined ? data["subobjectProperties"].map((item: any) => (serializePropertyDefinition(item))) : undefined,
  };
}

function deserializeObjectPropertyOptions(data: any): ObjectPropertyOptions {
  return {
    ...data,
    subobjectProperties: data["subobjectProperties"] !== undefined ? data["subobjectProperties"].map((item: any) => (deserializePropertyDefinition(item))) : undefined,
  };
}

/**
 * List of object values.
 */
export interface ObjectValues {
  values?: StructuredDataObject[];
}

function serializeObjectValues(data: any): ObjectValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeStructuredDataObject(item))) : undefined,
  };
}

function deserializeObjectValues(data: any): ObjectValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeStructuredDataObject(item))) : undefined,
  };
}

export interface OnClick {
  action?: FormAction;
  /**
   * This can be used as a short form for OpenLink with the default OpenAs and
   * OnClose. It may be undeprecated if this proves to be handy for developers.
   */
  link?: string;
  openLink?: OpenLink;
  /**
   * An add-on triggers this action when the form action needs to open a link.
   * This differs from the open_link above in that this needs to talk to server
   * to get the link. Thus some preparation work is required for web client to
   * do before the open link action response comes back.
   */
  openLinkAction?: FormAction;
}

export interface OpenCreatedDraftActionMarkup {
  /**
   * The ID of the newly created draft in the form "r123".
   */
  draftId?: string;
  /**
   * The server storage ID in hex format, for example,"15e9fa622ce1029d".
   */
  draftStorageId?: string;
  /**
   * The ID of the thread containing the newly created draft, for example,
   * "15e9fa622ce1029d".
   */
  draftThreadId?: string;
  /**
   * The server permanent ID for the draft's thread. This field isn't set
   * anywhere, and it's ignored when processing OpenCreatedDraftActionMarkup.
   * Supply and use draftThreadStorageId instead.
   */
  draftThreadServerPermId?: string;
}

export interface OpenLink {
  /**
   * Next available ID: 5
   */
  loadIndicator?:  | "NONE" | "SPINNER";
  onClose?:  | "NOTHING" | "RELOAD_ADD_ON";
  openAs?:  | "FULL_SIZE" | "OVERLAY";
  url?: string;
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
 * Additional options for CloudSearch#operationsLroList.
 */
export interface OperationsLroListOptions {
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

export interface OsVersion {
  majorVersion?: number;
  minorVersion?: number;
  tertiaryVersion?: number;
}

export interface OtrChatMessageEvent {
  expirationTimestampUsec?: bigint;
  kansasRowId?: string;
  kansasVersionInfo?: string;
  messageOtrStatus?:  | "OFF_THE_RECORD" | "ON_THE_RECORD";
}

function serializeOtrChatMessageEvent(data: any): OtrChatMessageEvent {
  return {
    ...data,
    expirationTimestampUsec: data["expirationTimestampUsec"] !== undefined ? String(data["expirationTimestampUsec"]) : undefined,
  };
}

function deserializeOtrChatMessageEvent(data: any): OtrChatMessageEvent {
  return {
    ...data,
    expirationTimestampUsec: data["expirationTimestampUsec"] !== undefined ? BigInt(data["expirationTimestampUsec"]) : undefined,
  };
}

export interface OtrModificationEvent {
  newOtrStatus?:  | "OFF_THE_RECORD" | "ON_THE_RECORD";
  newOtrToggle?:  | "ENABLED" | "DISABLED";
  oldOtrStatus?:  | "OFF_THE_RECORD" | "ON_THE_RECORD";
  oldOtrToggle?:  | "ENABLED" | "DISABLED";
}

/**
 * Developers register a client in Google API Console to get the deep-linking
 * feature on Google+ posts or frames about their apps. The client data is
 * stored in this proto.
 */
export interface PackagingServiceClient {
  /**
   * Android app's package name to generate the deep-link URI.
   */
  androidPackageName?: string;
  /**
   * iOS app's App Store ID to generate the App Store URL when app is not
   * installed on device.
   */
  iosAppStoreId?: string;
  /**
   * iOS app's bundle ID to generate the deep-link URI.
   */
  iosBundleId?: string;
  /**
   * Type of Google API Console client.
   */
  type?:  | "ANDROID" | "IOS";
}

/**
 * Information provided to clients so that they can show upgrade promos and
 * warnings on call ending early (for non-paying users).
 */
export interface PaygateInfo {
  /**
   * Time when client should show message that the call is ending soon.
   */
  callEndingSoonWarningTime?: Date;
  /**
   * Time when the call will end if the user does not upgrade (after in-call
   * upgrade support check has been implemented).
   */
  callEndingTime?: Date;
  /**
   * This boolean is used by clients to decide whether the user should be shown
   * promos to upgrade.
   */
  showUpgradePromos?: boolean;
}

function serializePaygateInfo(data: any): PaygateInfo {
  return {
    ...data,
    callEndingSoonWarningTime: data["callEndingSoonWarningTime"] !== undefined ? data["callEndingSoonWarningTime"].toISOString() : undefined,
    callEndingTime: data["callEndingTime"] !== undefined ? data["callEndingTime"].toISOString() : undefined,
  };
}

function deserializePaygateInfo(data: any): PaygateInfo {
  return {
    ...data,
    callEndingSoonWarningTime: data["callEndingSoonWarningTime"] !== undefined ? new Date(data["callEndingSoonWarningTime"]) : undefined,
    callEndingTime: data["callEndingTime"] !== undefined ? new Date(data["callEndingTime"]) : undefined,
  };
}

/**
 * This field contains information about the person being suggested.
 */
export interface PeopleSuggestion {
  /**
   * Suggested person. All fields of the person object might not be populated.
   */
  person?: Person;
}

/**
 * Object to represent a person.
 */
export interface Person {
  /**
   * The person's email addresses
   */
  emailAddresses?: EmailAddress[];
  /**
   * The resource name of the person to provide information about. See
   * [`People.get`](https://developers.google.com/people/api/rest/v1/people/get)
   * from the Google People API.
   */
  name?: string;
  /**
   * Obfuscated ID of a person.
   */
  obfuscatedId?: string;
  /**
   * The person's name
   */
  personNames?: Name[];
  /**
   * The person's phone numbers
   */
  phoneNumbers?: PhoneNumber[];
  /**
   * A person's read-only photo. A picture shown next to the person's name to
   * help others recognize the person in search results.
   */
  photos?: Photo[];
}

/**
 * An individual instance (or "tag") of a label configured as a personal type
 * that's associated with a message.
 */
export interface PersonalLabelTag {
  /**
   * A string ID representing the label. Possible ID values are documented at
   * go/chat-labels-howto:ids. Examples: "^t" for "Starred", "^nu" for "Nudged".
   */
  labelId?: string;
}

/**
 * Phone access contains information required to dial into a conference using a
 * regional phone number and a PIN that is specific to that phone number.
 */
export interface PhoneAccess {
  /**
   * The phone number to dial for this meeting space in INTERNATIONAL format.
   * Full phone number with a leading '+' character and whitespace separations.
   */
  formattedPhoneNumber?: string;
  /**
   * The BCP 47/LDML language code for the language associated with this phone
   * access. To be parsed by the i18n LanguageCode utility. Examples: "es-419"
   * for Latin American Spanish, "fr-CA" for Canadian French.
   */
  languageCode?: string;
  /**
   * The phone number to dial for this meeting space in E.164 format. Full
   * phone number with a leading '+' character.
   */
  phoneNumber?: string;
  /**
   * The PIN that users must enter after dialing the given number. The PIN
   * consists of only decimal digits and the length may vary.
   */
  pin?: string;
  /**
   * The CLDR/ISO 3166 region code for the country associated with this phone
   * access. To be parsed by the i18n RegionCode utility. Example: "SE" for
   * Sweden.
   */
  regionCode?: string;
}

/**
 * A person's Phone Number
 */
export interface PhoneNumber {
  /**
   * The phone number of the person.
   */
  phoneNumber?: string;
  type?:  | "OTHER" | "MOBILE" | "OFFICE";
}

/**
 * A person's photo.
 */
export interface Photo {
  /**
   * The URL of the photo.
   */
  url?: string;
}

export interface PinnedItemId {
  /**
   * Identifier for a Drive file (e.g. Docs, Sheets, Slides).
   */
  driveId?: string;
}

export interface PollItemsRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * Maximum number of items to return. The maximum value is 100 and the
   * default value is 20.
   */
  limit?: number;
  /**
   * Queue name to fetch items from. If unspecified, PollItems will fetch from
   * 'default' queue. The maximum length is 100 characters.
   */
  queue?: string;
  /**
   * Limit the items polled to the ones with these statuses.
   */
  statusCodes?:  | "CODE_UNSPECIFIED" | "ERROR" | "MODIFIED" | "NEW_ITEM" | "ACCEPTED"[];
}

export interface PollItemsResponse {
  /**
   * Set of items from the queue available for connector to process. These
   * items have the following subset of fields populated: version metadata.hash
   * structured_data.hash content.hash payload status queue
   */
  items?: Item[];
}

function serializePollItemsResponse(data: any): PollItemsResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeItem(item))) : undefined,
  };
}

function deserializePollItemsResponse(data: any): PollItemsResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeItem(item))) : undefined,
  };
}

/**
 * This message contains either the device model, or a prefix of the device
 * model (AKA a trimmed device model). The "is_trimmed" field indicates which
 * one it is.
 */
export interface PossiblyTrimmedModel {
  isTrimmed?: boolean;
  model?: string;
}

/**
 * See
 * http://s/?fileprint=//depot/google3/security/authentication/postini/auth_token.proto
 */
export interface PostiniUserProto {
  postiniUserId?: bigint;
}

function serializePostiniUserProto(data: any): PostiniUserProto {
  return {
    ...data,
    postiniUserId: data["postiniUserId"] !== undefined ? String(data["postiniUserId"]) : undefined,
  };
}

function deserializePostiniUserProto(data: any): PostiniUserProto {
  return {
    ...data,
    postiniUserId: data["postiniUserId"] !== undefined ? BigInt(data["postiniUserId"]) : undefined,
  };
}

/**
 * PREF_DELETED
 */
export interface PrefDeleted {
}

/**
 * HistoryRecord for changes associated with prefs, namely: PREF_WRITTEN
 * PREF_DELETED
 */
export interface PrefUpdate {
  /**
   * Name of the affected preference.
   */
  name?: string;
  prefDeleted?: PrefDeleted;
  prefWritten?: PrefWritten;
  preState?: FuseboxPrefUpdatePreState;
}

function serializePrefUpdate(data: any): PrefUpdate {
  return {
    ...data,
    prefWritten: data["prefWritten"] !== undefined ? serializePrefWritten(data["prefWritten"]) : undefined,
    preState: data["preState"] !== undefined ? serializeFuseboxPrefUpdatePreState(data["preState"]) : undefined,
  };
}

function deserializePrefUpdate(data: any): PrefUpdate {
  return {
    ...data,
    prefWritten: data["prefWritten"] !== undefined ? deserializePrefWritten(data["prefWritten"]) : undefined,
    preState: data["preState"] !== undefined ? deserializeFuseboxPrefUpdatePreState(data["preState"]) : undefined,
  };
}

/**
 * PREF_WRITTEN
 */
export interface PrefWritten {
  value?: Uint8Array;
}

function serializePrefWritten(data: any): PrefWritten {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializePrefWritten(data: any): PrefWritten {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * Presenter contains information about which device is currently presenting as
 * well as which device requested the presenter to be set.
 */
export interface Presenter {
  /**
   * The device resource name of the device which requested the current
   * presenter to be set. This field can not be modified by clients.
   */
  byDeviceId?: string;
  /**
   * The device resource names of other devices which can control the current
   * presentation.
   */
  copresenterDeviceIds?: string[];
  /**
   * The device resource name of the currently presenting device.
   */
  presenterDeviceId?: string;
}

/**
 * State of the thread previous to the update. This really just describes the
 * label state of all messages before the update.
 */
export interface PreState {
  labelIds?: string[];
  messageKey?: MultiKey;
  /**
   * Note that there can be fewer sync ids than label ids.
   */
  syncIds?: number[];
  threadKey?: MultiKey;
}

function serializePreState(data: any): PreState {
  return {
    ...data,
    messageKey: data["messageKey"] !== undefined ? serializeMultiKey(data["messageKey"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? serializeMultiKey(data["threadKey"]) : undefined,
  };
}

function deserializePreState(data: any): PreState {
  return {
    ...data,
    messageKey: data["messageKey"] !== undefined ? deserializeMultiKey(data["messageKey"]) : undefined,
    threadKey: data["threadKey"] !== undefined ? deserializeMultiKey(data["threadKey"]) : undefined,
  };
}

/**
 * Reference to a user, group, or domain.
 */
export interface Principal {
  /**
   * This principal is a group identified using an external identity. The name
   * field must specify the group resource name with this format:
   * identitysources/{source_id}/groups/{ID}
   */
  groupResourceName?: string;
  /**
   * This principal is a Google Workspace user, group or domain.
   */
  gsuitePrincipal?: GSuitePrincipal;
  /**
   * This principal is a user identified using an external identity. The name
   * field must specify the user resource name with this format:
   * identitysources/{source_id}/users/{ID}
   */
  userResourceName?: string;
}

/**
 * A Principal represents something to which permissions are assigned, often
 * but not always a user or group of some kind. It is most appropriate for use
 * in ACLs and authorization checks. Callers should prefer to use the wrapper
 * classes in google3/security/credentials/public/principal.h
 * google3/java/com/google/security/credentials/Principal.java
 * google3/security/credentials/go/principal.go unless direct proto access is
 * essential. If you update this protocol buffer, please update the wrapper
 * classes as well. LINT.IfChange
 */
export interface PrincipalProto {
  /**
   * scope = ALL_AUTHENTICATED_USERS
   */
  allAuthenticatedUsers?: AllAuthenticatedUsersProto;
  /**
   * scope = CAP_TOKEN_HOLDER
   */
  capTokenHolder?: CapTokenHolderProto;
  /**
   * scope = CHAT
   */
  chat?: ChatProto;
  /**
   * scope = CIRCLE
   */
  circle?: CircleProto;
  /**
   * scope = CLOUD_PRINCIPAL
   */
  cloudPrincipal?: CloudPrincipalProto;
  /**
   * scope = CONTACT_GROUP
   */
  contactGroup?: ContactGroupProto;
  /**
   * scope = EMAIL_OWNER
   */
  emailOwner?: EmailOwnerProto;
  /**
   * scope = EVENT
   */
  event?: EventProto;
  /**
   * scope = GAIA_GROUP
   */
  gaiaGroup?: GaiaGroupProto;
  /**
   * scope = GAIA_USER
   */
  gaiaUser?: GaiaUserProto;
  /**
   * scope = HOST
   */
  host?: HostProto;
  /**
   * scope = LDAP_GROUP
   */
  ldapGroup?: LdapGroupProto;
  /**
   * scope = LDAP_USER
   */
  ldapUser?: LdapUserProto;
  /**
   * scope = MDB_GROUP
   */
  mdbGroup?: MdbGroupProto;
  /**
   * scope = MDB_USER
   */
  mdbUser?: MdbUserProto;
  /**
   * scope = OAUTH_CONSUMER;
   */
  oauthConsumer?: OAuthConsumerProto;
  /**
   * scope = POSTINI_USER
   */
  postiniUser?: PostiniUserProto;
  /**
   * scope = RBAC_ROLE
   */
  rbacRole?: RbacRoleProto;
  /**
   * scope = RBAC_SUBJECT
   */
  rbacSubject?: RbacSubjectProto;
  /**
   * scope = RESOURCE_ROLE
   */
  resourceRole?: ResourceRoleProto;
  /**
   * This is only optional because required enums cannot be extended. Currently
   * required.
   */
  scope?:  | "INVALID" | "GAIA_USER" | "GAIA_GROUP" | "LDAP_USER" | "LDAP_GROUP" | "MDB_USER" | "MDB_GROUP" | "POSTINI_USER" | "CONTACT_GROUP" | "SIMPLE_SECRET_HOLDER" | "SIGNING_KEY_POSSESSOR" | "ALL_AUTHENTICATED_USERS" | "OAUTH_CONSUMER" | "HOST" | "SOCIAL_GRAPH_NODE" | "EMAIL_OWNER" | "CAP_TOKEN_HOLDER" | "CIRCLE" | "SQUARE" | "EVENT" | "RESOURCE_ROLE" | "CHAT" | "YOUTUBE_USER" | "UNUSED_ZWIEBACK_SESSION" | "ZWIEBACK_SESSION" | "RBAC_ROLE" | "RBAC_SUBJECT" | "CLOUD_PRINCIPAL";
  /**
   * scope = SIGNING_KEY_POSSESSOR
   */
  signingKeyPossessor?: SigningKeyPossessorProto;
  /**
   * scope = SIMPLE_SECRET_HOLDER
   */
  simpleSecretHolder?: SimpleSecretHolderProto;
  /**
   * scope = SOCIAL_GRAPH_NODE
   */
  socialGraphNode?: SocialGraphNodeProto;
  /**
   * scope = SQUARE
   */
  square?: SquareProto;
  /**
   * scope = YOUTUBE_USER
   */
  youtubeUser?: YoutubeUserProto;
  /**
   * scope = ZWIEBACK_SESSION
   */
  zwiebackSession?: ZwiebackSessionProto;
}

function serializePrincipalProto(data: any): PrincipalProto {
  return {
    ...data,
    capTokenHolder: data["capTokenHolder"] !== undefined ? serializeCapTokenHolderProto(data["capTokenHolder"]) : undefined,
    circle: data["circle"] !== undefined ? serializeCircleProto(data["circle"]) : undefined,
    contactGroup: data["contactGroup"] !== undefined ? serializeContactGroupProto(data["contactGroup"]) : undefined,
    gaiaGroup: data["gaiaGroup"] !== undefined ? serializeGaiaGroupProto(data["gaiaGroup"]) : undefined,
    gaiaUser: data["gaiaUser"] !== undefined ? serializeGaiaUserProto(data["gaiaUser"]) : undefined,
    mdbUser: data["mdbUser"] !== undefined ? serializeMdbUserProto(data["mdbUser"]) : undefined,
    postiniUser: data["postiniUser"] !== undefined ? serializePostiniUserProto(data["postiniUser"]) : undefined,
    signingKeyPossessor: data["signingKeyPossessor"] !== undefined ? serializeSigningKeyPossessorProto(data["signingKeyPossessor"]) : undefined,
    simpleSecretHolder: data["simpleSecretHolder"] !== undefined ? serializeSimpleSecretHolderProto(data["simpleSecretHolder"]) : undefined,
    square: data["square"] !== undefined ? serializeSquareProto(data["square"]) : undefined,
    youtubeUser: data["youtubeUser"] !== undefined ? serializeYoutubeUserProto(data["youtubeUser"]) : undefined,
    zwiebackSession: data["zwiebackSession"] !== undefined ? serializeZwiebackSessionProto(data["zwiebackSession"]) : undefined,
  };
}

function deserializePrincipalProto(data: any): PrincipalProto {
  return {
    ...data,
    capTokenHolder: data["capTokenHolder"] !== undefined ? deserializeCapTokenHolderProto(data["capTokenHolder"]) : undefined,
    circle: data["circle"] !== undefined ? deserializeCircleProto(data["circle"]) : undefined,
    contactGroup: data["contactGroup"] !== undefined ? deserializeContactGroupProto(data["contactGroup"]) : undefined,
    gaiaGroup: data["gaiaGroup"] !== undefined ? deserializeGaiaGroupProto(data["gaiaGroup"]) : undefined,
    gaiaUser: data["gaiaUser"] !== undefined ? deserializeGaiaUserProto(data["gaiaUser"]) : undefined,
    mdbUser: data["mdbUser"] !== undefined ? deserializeMdbUserProto(data["mdbUser"]) : undefined,
    postiniUser: data["postiniUser"] !== undefined ? deserializePostiniUserProto(data["postiniUser"]) : undefined,
    signingKeyPossessor: data["signingKeyPossessor"] !== undefined ? deserializeSigningKeyPossessorProto(data["signingKeyPossessor"]) : undefined,
    simpleSecretHolder: data["simpleSecretHolder"] !== undefined ? deserializeSimpleSecretHolderProto(data["simpleSecretHolder"]) : undefined,
    square: data["square"] !== undefined ? deserializeSquareProto(data["square"]) : undefined,
    youtubeUser: data["youtubeUser"] !== undefined ? deserializeYoutubeUserProto(data["youtubeUser"]) : undefined,
    zwiebackSession: data["zwiebackSession"] !== undefined ? deserializeZwiebackSessionProto(data["zwiebackSession"]) : undefined,
  };
}

/**
 * Private message information specific to a given user. DEPRECATED: Use the
 * privateMessageViewer field in CreateMessageInfo instead.
 */
export interface PrivateMessageInfo {
  /**
   * Annotations private to {@code userId}.
   */
  annotations?: Annotation[];
  /**
   * Attachments private to {@code userId}.
   */
  attachments?: Attachment[];
  contextualAddOnMarkup?: GoogleChatV1ContextualAddOnMarkup[];
  gsuiteIntegrationMetadata?: GsuiteIntegrationMetadata[];
  /**
   * Text private to {@code user_id}. Initial restriction: Only one of public
   * text or private text is rendered on the client. So if public text is set,
   * private text is ignored.
   */
  text?: string;
  /**
   * Required. The elements in this struct are visible to this user.
   */
  userId?: UserId;
}

function serializePrivateMessageInfo(data: any): PrivateMessageInfo {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (serializeAnnotation(item))) : undefined,
    attachments: data["attachments"] !== undefined ? data["attachments"].map((item: any) => (serializeAttachment(item))) : undefined,
    gsuiteIntegrationMetadata: data["gsuiteIntegrationMetadata"] !== undefined ? data["gsuiteIntegrationMetadata"].map((item: any) => (serializeGsuiteIntegrationMetadata(item))) : undefined,
    userId: data["userId"] !== undefined ? serializeUserId(data["userId"]) : undefined,
  };
}

function deserializePrivateMessageInfo(data: any): PrivateMessageInfo {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (deserializeAnnotation(item))) : undefined,
    attachments: data["attachments"] !== undefined ? data["attachments"].map((item: any) => (deserializeAttachment(item))) : undefined,
    gsuiteIntegrationMetadata: data["gsuiteIntegrationMetadata"] !== undefined ? data["gsuiteIntegrationMetadata"].map((item: any) => (deserializeGsuiteIntegrationMetadata(item))) : undefined,
    userId: data["userId"] !== undefined ? deserializeUserId(data["userId"]) : undefined,
  };
}

export interface ProcessingError {
  /**
   * Error code indicating the nature of the error.
   */
  code?:  | "PROCESSING_ERROR_CODE_UNSPECIFIED" | "MALFORMED_REQUEST" | "UNSUPPORTED_CONTENT_FORMAT" | "INDIRECT_BROKEN_ACL" | "ACL_CYCLE";
  /**
   * The description of the error.
   */
  errorMessage?: string;
  /**
   * In case the item fields are invalid, this field contains the details about
   * the validation errors.
   */
  fieldViolations?: FieldViolation[];
}

/**
 * The definition of a property within an object.
 */
export interface PropertyDefinition {
  booleanPropertyOptions?: BooleanPropertyOptions;
  datePropertyOptions?: DatePropertyOptions;
  /**
   * The options that determine how the property is displayed in the Cloud
   * Search results page if it's specified to be displayed in the object's
   * display options.
   */
  displayOptions?: PropertyDisplayOptions;
  doublePropertyOptions?: DoublePropertyOptions;
  enumPropertyOptions?: EnumPropertyOptions;
  htmlPropertyOptions?: HtmlPropertyOptions;
  integerPropertyOptions?: IntegerPropertyOptions;
  /**
   * Indicates that the property can be used for generating facets. Cannot be
   * true for properties whose type is object. IsReturnable must be true to set
   * this option. Only supported for boolean, enum, integer, and text
   * properties.
   */
  isFacetable?: boolean;
  /**
   * Indicates that multiple values are allowed for the property. For example,
   * a document only has one description but can have multiple comments. Cannot
   * be true for properties whose type is a boolean. If set to false, properties
   * that contain more than one value cause the indexing request for that item
   * to be rejected.
   */
  isRepeatable?: boolean;
  /**
   * Indicates that the property identifies data that should be returned in
   * search results via the Query API. If set to *true*, indicates that Query
   * API users can use matching property fields in results. However, storing
   * fields requires more space allocation and uses more bandwidth for search
   * queries, which impacts performance over large datasets. Set to *true* here
   * only if the field is needed for search results. Cannot be true for
   * properties whose type is an object.
   */
  isReturnable?: boolean;
  /**
   * Indicates that the property can be used for sorting. Cannot be true for
   * properties that are repeatable. Cannot be true for properties whose type is
   * object. IsReturnable must be true to set this option. Only supported for
   * boolean, date, double, integer, and timestamp properties.
   */
  isSortable?: boolean;
  /**
   * Indicates that the property can be used for generating query suggestions.
   */
  isSuggestable?: boolean;
  /**
   * Indicates that users can perform wildcard search for this property. Only
   * supported for Text properties. IsReturnable must be true to set this
   * option. In a given datasource maximum of 5 properties can be marked as
   * is_wildcard_searchable. For more details, see [Define object
   * properties](https://developers.google.com/cloud-search/docs/guides/schema-guide#properties)
   */
  isWildcardSearchable?: boolean;
  /**
   * The name of the property. Item indexing requests sent to the Indexing API
   * should set the property name equal to this value. For example, if name is
   * *subject_line*, then indexing requests for document items with subject
   * fields should set the name for that field equal to *subject_line*. Use the
   * name as the identifier for the object property. Once registered as a
   * property for an object, you cannot re-use this name for another property
   * within that object. The name must start with a letter and can only contain
   * letters (A-Z, a-z) or numbers (0-9). The maximum length is 256 characters.
   */
  name?: string;
  objectPropertyOptions?: ObjectPropertyOptions;
  textPropertyOptions?: TextPropertyOptions;
  timestampPropertyOptions?: TimestampPropertyOptions;
}

function serializePropertyDefinition(data: any): PropertyDefinition {
  return {
    ...data,
    integerPropertyOptions: data["integerPropertyOptions"] !== undefined ? serializeIntegerPropertyOptions(data["integerPropertyOptions"]) : undefined,
    objectPropertyOptions: data["objectPropertyOptions"] !== undefined ? serializeObjectPropertyOptions(data["objectPropertyOptions"]) : undefined,
  };
}

function deserializePropertyDefinition(data: any): PropertyDefinition {
  return {
    ...data,
    integerPropertyOptions: data["integerPropertyOptions"] !== undefined ? deserializeIntegerPropertyOptions(data["integerPropertyOptions"]) : undefined,
    objectPropertyOptions: data["objectPropertyOptions"] !== undefined ? deserializeObjectPropertyOptions(data["objectPropertyOptions"]) : undefined,
  };
}

/**
 * The display options for a property.
 */
export interface PropertyDisplayOptions {
  /**
   * The user friendly label for the property that is used if the property is
   * specified to be displayed in ObjectDisplayOptions. If provided, the display
   * label is shown in front of the property values when the property is part of
   * the object display options. For example, if the property value is '1', the
   * value by itself may not be useful context for the user. If the display name
   * given was 'priority', then the user sees 'priority : 1' in the search
   * results which provides clear context to search users. This is OPTIONAL; if
   * not given, only the property values are displayed. The maximum length is 64
   * characters.
   */
  displayLabel?: string;
}

/**
 * This field records where the ItemScope was retrieved, if it was created via
 * a web fetch.
 */
export interface Provenance {
  /**
   * Annotation blob from Annotation Service.
   */
  annotationBlob?: Uint8Array;
  /**
   * Canonical url of the retrieved_url, if one was resolved during retrieval,
   * for example, if a rel="canonical" link tag was provided in the retrieved
   * web page.
   */
  canonicalUrl?: string;
  /**
   * The url originally passed in the PRS request, which should be used to
   * re-discover the content. Note that this URL may be a forwarding service or
   * link shortener (bit.ly), so it should not be assumed to be canonical, but
   * should be used for navigation back to the original source of the itemscope.
   */
  inputUrl?: string;
  /**
   * Contains exact types as parsed, whether or not we recognized that type at
   * parse time. If an itemscope is created by merging SchemaOrg markup and open
   * graph markup then the first itemtype would be schemaorg type, the second
   * would be open graph and so on. example: http://schema.org/VideoObject,
   * og:video.movie Plain text; usually a URL
   */
  itemtype?: string[];
  /**
   * The server retrieved timestamp (in msec).
   */
  retrievedTimestampMsec?: bigint;
  /**
   * The final URL that was the actual source of the itemscope, after any
   * redirects.
   */
  retrievedUrl?: string;
}

function serializeProvenance(data: any): Provenance {
  return {
    ...data,
    annotationBlob: data["annotationBlob"] !== undefined ? encodeBase64(data["annotationBlob"]) : undefined,
    retrievedTimestampMsec: data["retrievedTimestampMsec"] !== undefined ? String(data["retrievedTimestampMsec"]) : undefined,
  };
}

function deserializeProvenance(data: any): Provenance {
  return {
    ...data,
    annotationBlob: data["annotationBlob"] !== undefined ? decodeBase64(data["annotationBlob"] as string) : undefined,
    retrievedTimestampMsec: data["retrievedTimestampMsec"] !== undefined ? BigInt(data["retrievedTimestampMsec"]) : undefined,
  };
}

/**
 * Represents an item to be pushed to the indexing queue.
 */
export interface PushItem {
  /**
   * Content hash of the item according to the repository. If specified, this
   * is used to determine how to modify this item's status. Setting this field
   * and the type field results in argument error. The maximum length is 2048
   * characters.
   */
  contentHash?: string;
  /**
   * The metadata hash of the item according to the repository. If specified,
   * this is used to determine how to modify this item's status. Setting this
   * field and the type field results in argument error. The maximum length is
   * 2048 characters.
   */
  metadataHash?: string;
  /**
   * Provides additional document state information for the connector, such as
   * an alternate repository ID and other metadata. The maximum length is 8192
   * bytes.
   */
  payload?: Uint8Array;
  /**
   * Queue to which this item belongs. The `default` queue is chosen if this
   * field is not specified. The maximum length is 512 characters.
   */
  queue?: string;
  /**
   * Populate this field to store Connector or repository error details. This
   * information is displayed in the Admin Console. This field may only be
   * populated when the Type is REPOSITORY_ERROR.
   */
  repositoryError?: RepositoryError;
  /**
   * Structured data hash of the item according to the repository. If
   * specified, this is used to determine how to modify this item's status.
   * Setting this field and the type field results in argument error. The
   * maximum length is 2048 characters.
   */
  structuredDataHash?: string;
  /**
   * The type of the push operation that defines the push behavior.
   */
  type?:  | "UNSPECIFIED" | "MODIFIED" | "NOT_MODIFIED" | "REPOSITORY_ERROR" | "REQUEUE";
}

function serializePushItem(data: any): PushItem {
  return {
    ...data,
    payload: data["payload"] !== undefined ? encodeBase64(data["payload"]) : undefined,
  };
}

function deserializePushItem(data: any): PushItem {
  return {
    ...data,
    payload: data["payload"] !== undefined ? decodeBase64(data["payload"] as string) : undefined,
  };
}

export interface PushItemRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * Item to push onto the queue.
   */
  item?: PushItem;
}

function serializePushItemRequest(data: any): PushItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? serializePushItem(data["item"]) : undefined,
  };
}

function deserializePushItemRequest(data: any): PushItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializePushItem(data["item"]) : undefined,
  };
}

export interface QueryCountByStatus {
  count?: bigint;
  /**
   * This represents the http status code.
   */
  statusCode?: number;
}

function serializeQueryCountByStatus(data: any): QueryCountByStatus {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeQueryCountByStatus(data: any): QueryCountByStatus {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

export interface QueryInterpretation {
  interpretationType?:  | "NONE" | "BLEND" | "REPLACE";
  /**
   * The interpretation of the query used in search. For example, queries with
   * natural language intent like "email from john" will be interpreted as
   * "from:john source:mail". This field will not be filled when the reason is
   * NOT_ENOUGH_RESULTS_FOUND_FOR_USER_QUERY.
   */
  interpretedQuery?: string;
  /**
   * The reason for interpretation of the query. This field will not be
   * UNSPECIFIED if the interpretation type is not NONE.
   */
  reason?:  | "UNSPECIFIED" | "QUERY_HAS_NATURAL_LANGUAGE_INTENT" | "NOT_ENOUGH_RESULTS_FOUND_FOR_USER_QUERY";
}

/**
 * Default options to interpret user query.
 */
export interface QueryInterpretationConfig {
  /**
   * Set this flag to disable supplemental results retrieval, setting a flag
   * here will not retrieve supplemental results for queries associated with a
   * given search application. If this flag is set to True, it will take
   * precedence over the option set at Query level. For the default value of
   * False, query level flag will set the correct interpretation for
   * supplemental results.
   */
  forceDisableSupplementalResults?: boolean;
  /**
   * Enable this flag to turn off all internal optimizations like natural
   * language (NL) interpretation of queries, supplemental results retrieval,
   * and usage of synonyms including custom ones. If this flag is set to True,
   * it will take precedence over the option set at Query level. For the default
   * value of False, query level flag will set the correct interpretation for
   * verbatim mode.
   */
  forceVerbatimMode?: boolean;
}

/**
 * Options to interpret user query.
 */
export interface QueryInterpretationOptions {
  /**
   * Flag to disable natural language (NL) interpretation of queries. Default
   * is false, Set to true to disable natural language interpretation. NL
   * interpretation only applies to predefined datasources.
   */
  disableNlInterpretation?: boolean;
  /**
   * Use this flag to disable supplemental results for a query. Supplemental
   * results setting chosen at SearchApplication level will take precedence if
   * set to True.
   */
  disableSupplementalResults?: boolean;
  /**
   * Enable this flag to turn off all internal optimizations like natural
   * language (NL) interpretation of queries, supplemental result retrieval, and
   * usage of synonyms including custom ones. Nl interpretation will be disabled
   * if either one of the two flags is true.
   */
  enableVerbatimMode?: boolean;
}

/**
 * Information relevant only to a query entry.
 */
export interface QueryItem {
  /**
   * True if the text was generated by means other than a previous user search.
   */
  isSynthetic?: boolean;
}

/**
 * The definition of a operator that can be used in a Search/Suggest request.
 */
export interface QueryOperator {
  /**
   * Display name of the operator
   */
  displayName?: string;
  /**
   * Potential list of values for the opeatror field. This field is only filled
   * when we can safely enumerate all the possible values of this operator.
   */
  enumValues?: string[];
  /**
   * Indicates the operator name that can be used to isolate the property using
   * the greater-than operator.
   */
  greaterThanOperatorName?: string;
  /**
   * Can this operator be used to get facets.
   */
  isFacetable?: boolean;
  /**
   * Indicates if multiple values can be set for this property.
   */
  isRepeatable?: boolean;
  /**
   * Will the property associated with this facet be returned as part of search
   * results.
   */
  isReturnable?: boolean;
  /**
   * Can this operator be used to sort results.
   */
  isSortable?: boolean;
  /**
   * Can get suggestions for this field.
   */
  isSuggestable?: boolean;
  /**
   * Indicates the operator name that can be used to isolate the property using
   * the less-than operator.
   */
  lessThanOperatorName?: string;
  /**
   * The name of the object corresponding to the operator. This field is only
   * filled for schema-specific operators, and is unset for common operators.
   */
  objectType?: string;
  /**
   * The name of the operator.
   */
  operatorName?: string;
  /**
   * The type of the operator.
   */
  type?:  | "UNKNOWN" | "INTEGER" | "DOUBLE" | "TIMESTAMP" | "BOOLEAN" | "ENUM" | "DATE" | "TEXT" | "HTML";
}

/**
 * List of sources that the user can search using the query API.
 */
export interface QuerySource {
  /**
   * Display name of the data source.
   */
  displayName?: string;
  /**
   * List of all operators applicable for this source.
   */
  operators?: QueryOperator[];
  /**
   * A short name or alias for the source. This value can be used with the
   * 'source' operator.
   */
  shortName?: string;
  /**
   * The name of the source
   */
  source?: Source;
}

/**
 * Additional options for CloudSearch#querySourcesList.
 */
export interface QuerySourcesListOptions {
  /**
   * Number of sources to return in the response.
   */
  pageToken?: string;
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["requestOptions.debugOptions.enableDebugging"]?: boolean;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. For
   * translations. Set this field using the language set in browser or for the
   * page. In the event that the user's language preference is known, set this
   * field to the known user language. When specified, the documents in search
   * results are biased towards the specified language. From Suggest API
   * perspective, for 3p suggest this is used as a hint while making predictions
   * to add language boosting.
   */
  ["requestOptions.languageCode"]?: string;
  /**
   * The ID generated when you create a search application using the [admin
   * console](https://support.google.com/a/answer/9043922).
   */
  ["requestOptions.searchApplicationId"]?: string;
  /**
   * Current user's time zone id, such as "America/Los_Angeles" or
   * "Australia/Sydney". These IDs are defined by [Unicode Common Locale Data
   * Repository (CLDR)](http://cldr.unicode.org/) project, and currently
   * available in the file
   * [timezone.xml](http://unicode.org/repos/cldr/trunk/common/bcp47/timezone.xml).
   * This field is used to correctly interpret date and time queries. If this
   * field is not specified, the default time zone (UTC) is used.
   */
  ["requestOptions.timeZone"]?: string;
}

/**
 * This field does not contain anything as of now and is just used as an
 * indicator that the suggest result was a phrase completion.
 */
export interface QuerySuggestion {
}

/**
 * Quote metadata: go/message-quoting-be-dd-v2. This proto is only used on the
 * read path. For the request proto, refer to `QuotedMessagePayload`. Fields are
 * either derived from storage directly from the Item this metadata belongs to,
 * or is hydrated at read time from another Item read. Note:
 * QuotedMessageMetadata proto is similar to Message proto with less field.
 * Reasons to differtiate QuotedMessageMetadata from Message are: 1. Not all
 * fields for original message is applicable for quoted message. (E.g.
 * reactions, is_inline_reply, etc.), thus separting out for confusion. 2. We
 * don't support nested message quoting. For more detailed discussion, please
 * see http://shortn/_VsSXQb2C7P. For future reference: if your new
 * feature/field will be supported in message quoting feature
 * (go/chat-quoting-prd), you will need to add that field within
 * QuotedMessageMetadata
 */
export interface QuotedMessageMetadata {
  /**
   * Output only. Snapshot of the annotations of the quoted message.
   */
  readonly annotations?: Annotation[];
  /**
   * Output only. Custom display profile info for apps. Will be empty for real
   * users.
   */
  readonly appProfile?: AppsDynamiteSharedAppProfile;
  /**
   * Output only. The bot attachment state of the quoted message. Used by
   * clients to display a bot attachment indicator in the UI.
   */
  readonly botAttachmentState?:  | "BOT_ATTACHMENT_STATE_UNSPECIFIED" | "BOT_ATTACHMENT_STATE_HAS_BOT_ATTACHMENT" | "BOT_ATTACHMENT_STATE_NO_BOT_ATTACHMENT";
  /**
   * Output only. Time when the quoted message was posted in microseconds.
   */
  readonly createTimeMicros?: bigint;
  /**
   * Output only. ID of the User who posted the quoted message. This includes
   * information to identify if the quoted message was posted by an App on
   * behalf of a user.
   */
  readonly creatorId?: UserId;
  /**
   * Output only. Time when the quoted message was last edited by a user at the
   * time when quoting action happens. Time is in microseconds.
   */
  readonly lastEditTimeMicros?: bigint;
  /**
   * The `last_update_time` of the original message when the client initiated
   * the quote creation. This is derived from the request payload passed from
   * clients. Used to fetch the quoted message contents at a specific time on
   * the read path. This field is populated from storage directly.
   */
  lastUpdateTimeWhenQuotedMicros?: bigint;
  /**
   * MessageId of the original message that is being quoted. This is derived
   * from the request payload passed from clients. This field is populated from
   * storage directly.
   */
  messageId?: MessageId;
  /**
   * Output only. The state of the quoted message. Used by clients to display
   * tombstones for quotes that reference a deleted message.
   */
  readonly messageState?:  | "MESSAGE_STATE_UNSPECIFIED" | "MESSAGE_STATE_ACTIVE" | "MESSAGE_STATE_DELETED" | "MESSAGE_STATE_OTR_EDITED";
  /**
   * Output only. The retention (OTR) settings of the quoted message.
   */
  readonly retentionSettings?: AppsDynamiteSharedRetentionSettings;
  /**
   * Output only. Snapshot of the text body of the quoted message.
   */
  readonly textBody?: string;
  /**
   * Output only. ID of the User who last updated (created/edited/deleted) the
   * quoted message at the time when quoting action happens. This includes
   * information to identify if the quoted message was posted by an App on
   * behalf of a user.
   */
  readonly updaterId?: UserId;
  /**
   * Output only. Upload metadata of the quoted message.
   */
  readonly uploadMetadata?: UploadMetadata[];
}

function serializeQuotedMessageMetadata(data: any): QuotedMessageMetadata {
  return {
    ...data,
    lastUpdateTimeWhenQuotedMicros: data["lastUpdateTimeWhenQuotedMicros"] !== undefined ? String(data["lastUpdateTimeWhenQuotedMicros"]) : undefined,
  };
}

function deserializeQuotedMessageMetadata(data: any): QuotedMessageMetadata {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (deserializeAnnotation(item))) : undefined,
    createTimeMicros: data["createTimeMicros"] !== undefined ? BigInt(data["createTimeMicros"]) : undefined,
    creatorId: data["creatorId"] !== undefined ? deserializeUserId(data["creatorId"]) : undefined,
    lastEditTimeMicros: data["lastEditTimeMicros"] !== undefined ? BigInt(data["lastEditTimeMicros"]) : undefined,
    lastUpdateTimeWhenQuotedMicros: data["lastUpdateTimeWhenQuotedMicros"] !== undefined ? BigInt(data["lastUpdateTimeWhenQuotedMicros"]) : undefined,
    retentionSettings: data["retentionSettings"] !== undefined ? deserializeAppsDynamiteSharedRetentionSettings(data["retentionSettings"]) : undefined,
    updaterId: data["updaterId"] !== undefined ? deserializeUserId(data["updaterId"]) : undefined,
    uploadMetadata: data["uploadMetadata"] !== undefined ? data["uploadMetadata"].map((item: any) => (deserializeUploadMetadata(item))) : undefined,
  };
}

/**
 * The rank contains a tuple of numbers which may be used as a general sort
 * order. The rank should be treated as an ordered set of numbers, where the
 * ordering is done in descending order of the most significant rank member. For
 * example, given the following ranks described as (primary, secondary): (1,1),
 * (1,2), (2,2) (2,1) The descending rank-order is: (2,2) > (2,1) > (1,2) >
 * (1,1)
 */
export interface Rank {
  /**
   * The primary rank is the most significant rank member. This rank element
   * should always be present. Items with higher primary rank are always
   * considered of higher rank than those of lower primary rank.
   */
  primary?: bigint;
  /**
   * The secondary rank may be used to rank items of identical primary rank.
   * This rank element should always be present.
   */
  secondary?: bigint;
}

function serializeRank(data: any): Rank {
  return {
    ...data,
    primary: data["primary"] !== undefined ? String(data["primary"]) : undefined,
    secondary: data["secondary"] !== undefined ? String(data["secondary"]) : undefined,
  };
}

function deserializeRank(data: any): Rank {
  return {
    ...data,
    primary: data["primary"] !== undefined ? BigInt(data["primary"]) : undefined,
    secondary: data["secondary"] !== undefined ? BigInt(data["secondary"]) : undefined,
  };
}

/**
 * Principal associated with a given RBAC role. This principal is used by
 * Sphinx Provisioning Service for RBAC provisionable (go/sphinx-rbacz).
 */
export interface RbacRoleProto {
  name?: string;
  objectId?: string;
  /**
   * DEPRECATED as of 01.11.2019
   */
  rbacNamespace?: string;
  /**
   * Format: "role/z?" - "role" is the Sphinx globally unique name of the
   * Sphinx role that provisions the RBAC role. - "/z?" suffix indicates which
   * Zanzibar environment stores the role membership data ("/zd": dev, "/zs":
   * staging, "/zp": prod, "/zt": local test instance). Example:
   * "mysystem_myrole/zp"
   */
  rbacRoleName?: string;
}

/**
 * Principal associated with a given RBAC subject. This principal is used by
 * Sphinx Provisioning Service for RBAC provisionable (go/sphinx-rbacz).
 */
export interface RbacSubjectProto {
  /**
   * Format "username" without "@domain", e.g., "bogdand".
   */
  username?: string;
}

/**
 * Contains information about an emoji reaction.
 */
export interface ReactionInfo {
  /**
   * Unicode string representing a single emoji.
   */
  emoji?: string;
}

export interface ReadReceiptsSettingsUpdatedMetadata {
  /**
   * The new read receipts state.
   */
  readReceiptsEnabled?: boolean;
}

export interface Recipient {
  email?: string;
}

/**
 * A recording event is something that happens to the recording in a
 * conference.
 */
export interface RecordingEvent {
  /**
   * The initiator of the latest event of the recording. It will be set for all
   * user events (`type` is 100-199) and unset for all server events (`type` is
   * 200-299).
   */
  deviceId?: string;
  /**
   * The type of event.
   */
  type?:  | "RECORDING_EVENT_UNSPECIFIED" | "USER_ACTION" | "STARTED_BY_USER" | "STOPPED_BY_USER" | "CANCELLED_BY_USER" | "CANCELLED_INITIALIZATION_FAILED" | "CANCELLED_INITIATOR_LEFT" | "ACTIVE_ABOUT_TO_STOP_TOO_LONG" | "STOPPED_TOO_LONG" | "STOPPED_ALL_DEVICES_LEFT" | "STOPPED_INTERNAL_FAILURES";
}

/**
 * This message is deprecated, please use RecordingSessionInfo instead.
 * Information about recording in the current conference.
 */
export interface RecordingInfo {
  /**
   * The latest recording event. This can be used by clients to help explain
   * what is going on, why recording stopped, etc. This will always be set if
   * there is or was an active recording, which means there can be latest event
   * when recording is INACTIVE.
   */
  latestRecordingEvent?: RecordingEvent;
  /**
   * The display name of the owner of the recording output. Email notifications
   * about uploaded recordings will also be sent to this owner.
   */
  ownerDisplayName?: string;
  /**
   * The device resource name of the producer device for the currently active
   * recording. Note that, after the producer drops/leaves the conference, this
   * field will be cleaned up by the server after a delay.
   */
  producerDeviceId?: string;
  /**
   * The application type of the current active recording.
   * `RECORDING_APPLICATION_TYPE_UNSPECIFIED` if `recording_status` is inactive.
   */
  recordingApplicationType?:  | "RECORDING_APPLICATION_TYPE_UNSPECIFIED" | "RECORDING" | "GLIVE_STREAM" | "BROADCAST";
  /**
   * An identifier for the current recording, if any. This is returned whenever
   * recording_status is either `RECORDING_STARTING` or `RECORDING_STARTED`.
   */
  recordingId?: string;
  /**
   * The current status of the recording. This can be used by clients to show a
   * recording dot or similar to indicated to the user that a recording is
   * taking place.
   */
  recordingStatus?:  | "RECORDING_UNSPECIFIED" | "RECORDING_INACTIVE" | "RECORDING_STARTING" | "RECORDING_STARTED";
}

/**
 * Information about a recording session.
 */
export interface RecordingSessionInfo {
  /**
   * Input only. Deprecated field, should not be used.
   */
  ownerEmail?: string;
  /**
   * A unique server-generated ID for the recording session.
   */
  recordingSessionId?: string;
  /**
   * Recording session's state information.
   */
  sessionStateInfo?: SessionStateInfo;
}

/**
 * All fields in this proto are now columns in spanner see
 * google3/storage/slice/production/gmail/user_data_tables.pi for documentation.
 */
export interface Reference {
  blobId?: string;
  contentType?: string;
  hash?: string;
  /**
   * LINT.IfChange
   */
  key?: string;
  /**
   * LINT.ThenChange(//depot/google3/storage/slice/production/gmail/
   * user_data_tables.pi)
   */
  name?: string;
  size?: bigint;
}

function serializeReference(data: any): Reference {
  return {
    ...data,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
  };
}

function deserializeReference(data: any): Reference {
  return {
    ...data,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
  };
}

export interface References {
  references?: Reference[];
}

function serializeReferences(data: any): References {
  return {
    ...data,
    references: data["references"] !== undefined ? data["references"].map((item: any) => (serializeReference(item))) : undefined,
  };
}

function deserializeReferences(data: any): References {
  return {
    ...data,
    references: data["references"] !== undefined ? data["references"].map((item: any) => (deserializeReference(item))) : undefined,
  };
}

export interface RenameEvent {
  newName?: string;
  originalName?: string;
}

/**
 * Errors when the connector is communicating to the source repository.
 */
export interface RepositoryError {
  /**
   * Message that describes the error. The maximum allowable length of the
   * message is 8192 characters.
   */
  errorMessage?: string;
  /**
   * Error codes. Matches the definition of HTTP status codes.
   */
  httpStatusCode?: number;
  /**
   * The type of error.
   */
  type?:  | "UNKNOWN" | "NETWORK_ERROR" | "DNS_ERROR" | "CONNECTION_ERROR" | "AUTHENTICATION_ERROR" | "AUTHORIZATION_ERROR" | "SERVER_ERROR" | "QUOTA_EXCEEDED" | "SERVICE_UNAVAILABLE" | "CLIENT_ERROR";
}

export interface RequestFileScope {
  itemId?: string;
}

export interface RequestFileScopeForActiveDocument {
}

/**
 * Shared request options for all RPC methods.
 */
export interface RequestOptions {
  /**
   * Debug options of the request
   */
  debugOptions?: DebugOptions;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. For
   * translations. Set this field using the language set in browser or for the
   * page. In the event that the user's language preference is known, set this
   * field to the known user language. When specified, the documents in search
   * results are biased towards the specified language. From Suggest API
   * perspective, for 3p suggest this is used as a hint while making predictions
   * to add language boosting.
   */
  languageCode?: string;
  /**
   * The ID generated when you create a search application using the [admin
   * console](https://support.google.com/a/answer/9043922).
   */
  searchApplicationId?: string;
  /**
   * Current user's time zone id, such as "America/Los_Angeles" or
   * "Australia/Sydney". These IDs are defined by [Unicode Common Locale Data
   * Repository (CLDR)](http://cldr.unicode.org/) project, and currently
   * available in the file
   * [timezone.xml](http://unicode.org/repos/cldr/trunk/common/bcp47/timezone.xml).
   * This field is used to correctly interpret date and time queries. If this
   * field is not specified, the default time zone (UTC) is used.
   */
  timeZone?: string;
}

/**
 * A list of capabilities that are used in this message.
 */
export interface RequiredMessageFeaturesMetadata {
  requiredFeatures?:  | "REQUIRED_FEATURE_UNSPECIFIED" | "REQUIRED_FEATURE_MESSAGE_QUOTING" | "REQUIRED_FEATURE_TOMBSTONES_IN_DMS_AND_UFRS" | "REQUIRED_FEATURE_CUSTOM_HYPERLINK" | "REQUIRED_FEATURE_SMART_CHIP"[];
}

export interface ResetSearchApplicationRequest {
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
}

/**
 * A type of sharing target that points to some resource's ACL. Used to refer
 * to the set of Principals that have the given privilege ('role_id') for the
 * given resource ('application_id', 'object_id', 'object_part'). The meaning of
 * 'role_id' is interpreted only by implementations of AclRpcService and is
 * usually dependent on 'application_id' All fields except object_part are
 * required. If present, object_part must be non-empty.
 */
export interface ResourceRoleProto {
  applicationId?: string;
  objectId?: string;
  objectPart?: string;
  roleId?: number;
}

/**
 * Debugging information about the response.
 */
export interface ResponseDebugInfo {
  /**
   * General debug info formatted for display.
   */
  formattedDebugInfo?: string;
}

/**
 * Information relevant only to a restrict entry. NextId: 12
 */
export interface RestrictItem {
  driveFollowUpRestrict?: DriveFollowUpRestrict;
  driveLocationRestrict?: DriveLocationRestrict;
  /**
   * Drive Types.
   */
  driveMimeTypeRestrict?: DriveMimeTypeRestrict;
  driveTimeSpanRestrict?: DriveTimeSpanRestrict;
  /**
   * The search restrict (e.g. "after:2017-09-11 before:2017-09-12").
   */
  searchOperator?: string;
}

/**
 * Result count information
 */
export interface ResultCounts {
  /**
   * Result count information for each source with results.
   */
  sourceResultCounts?: SourceResultCount[];
}

function serializeResultCounts(data: any): ResultCounts {
  return {
    ...data,
    sourceResultCounts: data["sourceResultCounts"] !== undefined ? data["sourceResultCounts"].map((item: any) => (serializeSourceResultCount(item))) : undefined,
  };
}

function deserializeResultCounts(data: any): ResultCounts {
  return {
    ...data,
    sourceResultCounts: data["sourceResultCounts"] !== undefined ? data["sourceResultCounts"].map((item: any) => (deserializeSourceResultCount(item))) : undefined,
  };
}

/**
 * Debugging information about the result.
 */
export interface ResultDebugInfo {
  /**
   * General debug info formatted for display.
   */
  formattedDebugInfo?: string;
}

/**
 * Display Fields for Search Results
 */
export interface ResultDisplayField {
  /**
   * The display label for the property.
   */
  label?: string;
  /**
   * The operator name of the property.
   */
  operatorName?: string;
  /**
   * The name value pair for the property.
   */
  property?: NamedProperty;
}

function serializeResultDisplayField(data: any): ResultDisplayField {
  return {
    ...data,
    property: data["property"] !== undefined ? serializeNamedProperty(data["property"]) : undefined,
  };
}

function deserializeResultDisplayField(data: any): ResultDisplayField {
  return {
    ...data,
    property: data["property"] !== undefined ? deserializeNamedProperty(data["property"]) : undefined,
  };
}

/**
 * The collection of fields that make up a displayed line
 */
export interface ResultDisplayLine {
  fields?: ResultDisplayField[];
}

function serializeResultDisplayLine(data: any): ResultDisplayLine {
  return {
    ...data,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (serializeResultDisplayField(item))) : undefined,
  };
}

function deserializeResultDisplayLine(data: any): ResultDisplayLine {
  return {
    ...data,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (deserializeResultDisplayField(item))) : undefined,
  };
}

export interface ResultDisplayMetadata {
  /**
   * The metalines content to be displayed with the result.
   */
  metalines?: ResultDisplayLine[];
  /**
   * The display label for the object.
   */
  objectTypeLabel?: string;
}

function serializeResultDisplayMetadata(data: any): ResultDisplayMetadata {
  return {
    ...data,
    metalines: data["metalines"] !== undefined ? data["metalines"].map((item: any) => (serializeResultDisplayLine(item))) : undefined,
  };
}

function deserializeResultDisplayMetadata(data: any): ResultDisplayMetadata {
  return {
    ...data,
    metalines: data["metalines"] !== undefined ? data["metalines"].map((item: any) => (deserializeResultDisplayLine(item))) : undefined,
  };
}

export interface RetrievalImportance {
  /**
   * Indicates the ranking importance given to property when it is matched
   * during retrieval. Once set, the token importance of a property cannot be
   * changed.
   */
  importance?:  | "DEFAULT" | "HIGHEST" | "HIGH" | "LOW" | "NONE";
}

export interface RoomRenameMetadata {
  newName?: string;
  /**
   * NEXT_TAG: 3
   */
  prevName?: string;
}

export interface RoomUpdatedMetadata {
  groupDetailsMetadata?: GroupDetailsUpdatedMetadata;
  groupLinkSharingEnabled?: boolean;
  /**
   * The user who initiated this room update. Complete member profiles, when
   * ListTopicsRequest FetchOptions.USER is set. Otherwise, only the id will be
   * filled in.
   */
  initiator?: User;
  /**
   * The type of the user who initiated this room update.
   */
  initiatorType?:  | "INITIATOR_TYPE_UNSPECIFIED" | "INITIATOR_TYPE_END_USER" | "INITIATOR_TYPE_ADMIN";
  /**
   * What was updated in the room.
   */
  name?: string;
  renameMetadata?: RoomRenameMetadata;
  /**
   * DEPRECATED: See GroupVisibility proto definition.
   */
  visibility?: AppsDynamiteSharedGroupVisibility;
}

function serializeRoomUpdatedMetadata(data: any): RoomUpdatedMetadata {
  return {
    ...data,
    initiator: data["initiator"] !== undefined ? serializeUser(data["initiator"]) : undefined,
  };
}

function deserializeRoomUpdatedMetadata(data: any): RoomUpdatedMetadata {
  return {
    ...data,
    initiator: data["initiator"] !== undefined ? deserializeUser(data["initiator"]) : undefined,
  };
}

/**
 * Roster profile information.
 */
export interface Roster {
  avatarUrl?: string;
  id?: RosterId;
  /**
   * Whether caller has visibility into members of the roster.
   */
  isMembershipVisibleToCaller?: boolean;
  membershipCount?: number;
  name?: string;
  /**
   * Roster gaia key, usually an email address. Set in looking up rosters
   * response.
   */
  rosterGaiaKey?: string;
  /**
   * Roster deletion state - considered active unless set to deleted
   */
  rosterState?:  | "ROSTER_STATE_UNKNOWN" | "ROSTER_ACTIVE" | "ROSTER_DELETED";
  /**
   * Roster membership count. May contain counts based on member type and
   * membership state.
   */
  segmentedMembershipCounts?: AppsDynamiteSharedSegmentedMembershipCounts;
}

/**
 * Primary key for Roster resource.
 */
export interface RosterId {
  /**
   * Opaque, server-assigned ID of the Roster.
   */
  id?: string;
}

/**
 * Options for Triggers dispatched via RPC.
 */
export interface RpcOptions {
  /**
   * The RPC's request extensions (i.e. RPC::request_extensions(), a.k.a. the
   * Stubby side channel) will be merged with the specified
   * [request_extensions]. When Triggers are batched, the RPC's request
   * extensions will be merged with all of the [request_extensions] of the
   * Triggers in the batch. Note that merging of request extensions follows
   * standard protocol buffer semantics; values of singular fields override
   * previous values, and values of repeated fields are appended (In the case of
   * Triggers, Triggers with later fire times will be merged after Triggers with
   * earlier fire times in the same batch). It is not advised to specify
   * extensions with repeated fields on batchable Triggers.
   */
  requestExtensions?: MessageSet;
}

/**
 * Message containing a string that is safe to use in URL contexts in DOM APIs
 * and HTML documents, where the URL context does not refer to a resource that
 * loads code.
 */
export interface SafeUrlProto {
  /**
   * IMPORTANT: Never set or read this field, even from tests, it is private.
   * See documentation at the top of .proto file for programming language
   * packages with which to create or read this message.
   */
  privateDoNotAccessOrElseSafeUrlWrappedValue?: string;
}

/**
 * The schema definition for a data source.
 */
export interface Schema {
  /**
   * The list of top-level objects for the data source. The maximum number of
   * elements is 10.
   */
  objectDefinitions?: ObjectDefinition[];
  /**
   * IDs of the Long Running Operations (LROs) currently running for this
   * schema. After modifying the schema, wait for operations to complete before
   * indexing additional content.
   */
  operationIds?: string[];
}

function serializeSchema(data: any): Schema {
  return {
    ...data,
    objectDefinitions: data["objectDefinitions"] !== undefined ? data["objectDefinitions"].map((item: any) => (serializeObjectDefinition(item))) : undefined,
  };
}

function deserializeSchema(data: any): Schema {
  return {
    ...data,
    objectDefinitions: data["objectDefinitions"] !== undefined ? data["objectDefinitions"].map((item: any) => (deserializeObjectDefinition(item))) : undefined,
  };
}

/**
 * Scoring configurations for a source while processing a Search or Suggest
 * request.
 */
export interface ScoringConfig {
  /**
   * Whether to use freshness as a ranking signal. By default, freshness is
   * used as a ranking signal. Note that this setting is not available in the
   * Admin UI.
   */
  disableFreshness?: boolean;
  /**
   * Whether to personalize the results. By default, personal signals will be
   * used to boost results.
   */
  disablePersonalization?: boolean;
}

/**
 * SearchApplication
 */
export interface SearchApplication {
  /**
   * Retrictions applied to the configurations. The maximum number of elements
   * is 10.
   */
  dataSourceRestrictions?: DataSourceRestriction[];
  /**
   * The default fields for returning facet results. The sources specified here
   * also have been included in data_source_restrictions above.
   */
  defaultFacetOptions?: FacetOptions[];
  /**
   * The default options for sorting the search results
   */
  defaultSortOptions?: SortOptions;
  /**
   * Display name of the Search Application. The maximum length is 300
   * characters.
   */
  displayName?: string;
  /**
   * Indicates whether audit logging is on/off for requests made for the search
   * application in query APIs.
   */
  enableAuditLog?: boolean;
  /**
   * The name of the Search Application. Format:
   * searchapplications/{application_id}.
   */
  name?: string;
  /**
   * Output only. IDs of the Long Running Operations (LROs) currently running
   * for this schema. Output only field.
   */
  readonly operationIds?: string[];
  /**
   * The default options for query interpretation
   */
  queryInterpretationConfig?: QueryInterpretationConfig;
  /**
   * With each result we should return the URI for its thumbnail (when
   * applicable)
   */
  returnResultThumbnailUrls?: boolean;
  /**
   * Configuration for ranking results.
   */
  scoringConfig?: ScoringConfig;
  /**
   * Configuration for a sources specified in data_source_restrictions.
   */
  sourceConfig?: SourceConfig[];
}

function serializeSearchApplication(data: any): SearchApplication {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (serializeDataSourceRestriction(item))) : undefined,
    defaultFacetOptions: data["defaultFacetOptions"] !== undefined ? data["defaultFacetOptions"].map((item: any) => (serializeFacetOptions(item))) : undefined,
  };
}

function deserializeSearchApplication(data: any): SearchApplication {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (deserializeDataSourceRestriction(item))) : undefined,
    defaultFacetOptions: data["defaultFacetOptions"] !== undefined ? data["defaultFacetOptions"].map((item: any) => (deserializeFacetOptions(item))) : undefined,
  };
}

/**
 * Search application level query stats per date
 */
export interface SearchApplicationQueryStats {
  /**
   * The date for which query stats were calculated. Stats calculated on the
   * next day close to midnight are returned.
   */
  date?: Date;
  queryCountByStatus?: QueryCountByStatus[];
}

function serializeSearchApplicationQueryStats(data: any): SearchApplicationQueryStats {
  return {
    ...data,
    queryCountByStatus: data["queryCountByStatus"] !== undefined ? data["queryCountByStatus"].map((item: any) => (serializeQueryCountByStatus(item))) : undefined,
  };
}

function deserializeSearchApplicationQueryStats(data: any): SearchApplicationQueryStats {
  return {
    ...data,
    queryCountByStatus: data["queryCountByStatus"] !== undefined ? data["queryCountByStatus"].map((item: any) => (deserializeQueryCountByStatus(item))) : undefined,
  };
}

export interface SearchApplicationSessionStats {
  /**
   * The date for which session stats were calculated. Stats are calculated on
   * the following day, close to midnight PST, and then returned.
   */
  date?: Date;
  /**
   * The count of search sessions on the day
   */
  searchSessionsCount?: bigint;
}

function serializeSearchApplicationSessionStats(data: any): SearchApplicationSessionStats {
  return {
    ...data,
    searchSessionsCount: data["searchSessionsCount"] !== undefined ? String(data["searchSessionsCount"]) : undefined,
  };
}

function deserializeSearchApplicationSessionStats(data: any): SearchApplicationSessionStats {
  return {
    ...data,
    searchSessionsCount: data["searchSessionsCount"] !== undefined ? BigInt(data["searchSessionsCount"]) : undefined,
  };
}

export interface SearchApplicationUserStats {
  /**
   * The date for which session stats were calculated. Stats calculated on the
   * next day close to midnight are returned.
   */
  date?: Date;
  /**
   * The count of unique active users in the past one day
   */
  oneDayActiveUsersCount?: bigint;
  /**
   * The count of unique active users in the past seven days
   */
  sevenDaysActiveUsersCount?: bigint;
  /**
   * The count of unique active users in the past thirty days
   */
  thirtyDaysActiveUsersCount?: bigint;
}

function serializeSearchApplicationUserStats(data: any): SearchApplicationUserStats {
  return {
    ...data,
    oneDayActiveUsersCount: data["oneDayActiveUsersCount"] !== undefined ? String(data["oneDayActiveUsersCount"]) : undefined,
    sevenDaysActiveUsersCount: data["sevenDaysActiveUsersCount"] !== undefined ? String(data["sevenDaysActiveUsersCount"]) : undefined,
    thirtyDaysActiveUsersCount: data["thirtyDaysActiveUsersCount"] !== undefined ? String(data["thirtyDaysActiveUsersCount"]) : undefined,
  };
}

function deserializeSearchApplicationUserStats(data: any): SearchApplicationUserStats {
  return {
    ...data,
    oneDayActiveUsersCount: data["oneDayActiveUsersCount"] !== undefined ? BigInt(data["oneDayActiveUsersCount"]) : undefined,
    sevenDaysActiveUsersCount: data["sevenDaysActiveUsersCount"] !== undefined ? BigInt(data["sevenDaysActiveUsersCount"]) : undefined,
    thirtyDaysActiveUsersCount: data["thirtyDaysActiveUsersCount"] !== undefined ? BigInt(data["thirtyDaysActiveUsersCount"]) : undefined,
  };
}

export interface SearchItemsByViewUrlRequest {
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * The next_page_token value returned from a previous request, if any.
   */
  pageToken?: string;
  /**
   * Specify the full view URL to find the corresponding item. The maximum
   * length is 2048 characters.
   */
  viewUrl?: string;
}

export interface SearchItemsByViewUrlResponse {
  items?: Item[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeSearchItemsByViewUrlResponse(data: any): SearchItemsByViewUrlResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeItem(item))) : undefined,
  };
}

function deserializeSearchItemsByViewUrlResponse(data: any): SearchItemsByViewUrlResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeItem(item))) : undefined,
  };
}

/**
 * Additional search quality metadata of the item.
 */
export interface SearchQualityMetadata {
  /**
   * An indication of the quality of the item, used to influence search
   * quality. Value should be between 0.0 (lowest quality) and 1.0 (highest
   * quality). The default value is 0.0.
   */
  quality?: number;
}

/**
 * The search API request.
 */
export interface SearchRequest {
  /**
   * Context attributes for the request which will be used to adjust ranking of
   * search results. The maximum number of elements is 10.
   */
  contextAttributes?: ContextAttribute[];
  /**
   * The sources to use for querying. If not specified, all data sources from
   * the current search application are used.
   */
  dataSourceRestrictions?: DataSourceRestriction[];
  facetOptions?: FacetOptions[];
  /**
   * Maximum number of search results to return in one page. Valid values are
   * between 1 and 100, inclusive. Default value is 10. Minimum value is 50 when
   * results beyond 2000 are requested.
   */
  pageSize?: number;
  /**
   * The raw query string. See supported search operators in the [Narrow your
   * search with
   * operators](https://support.google.com/cloudsearch/answer/6172299)
   */
  query?: string;
  /**
   * Options to interpret the user query.
   */
  queryInterpretationOptions?: QueryInterpretationOptions;
  /**
   * Request options, such as the search application and user timezone.
   */
  requestOptions?: RequestOptions;
  /**
   * The options for sorting the search results
   */
  sortOptions?: SortOptions;
  /**
   * Starting index of the results.
   */
  start?: number;
}

function serializeSearchRequest(data: any): SearchRequest {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (serializeDataSourceRestriction(item))) : undefined,
    facetOptions: data["facetOptions"] !== undefined ? data["facetOptions"].map((item: any) => (serializeFacetOptions(item))) : undefined,
  };
}

function deserializeSearchRequest(data: any): SearchRequest {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (deserializeDataSourceRestriction(item))) : undefined,
    facetOptions: data["facetOptions"] !== undefined ? data["facetOptions"].map((item: any) => (deserializeFacetOptions(item))) : undefined,
  };
}

/**
 * The search API response.
 */
export interface SearchResponse {
  /**
   * Debugging information about the response.
   */
  debugInfo?: ResponseDebugInfo;
  /**
   * Error information about the response.
   */
  errorInfo?: ErrorInfo;
  /**
   * Repeated facet results.
   */
  facetResults?: FacetResult[];
  /**
   * Whether there are more search results matching the query.
   */
  hasMoreResults?: boolean;
  /**
   * Query interpretation result for user query. Empty if query interpretation
   * is disabled.
   */
  queryInterpretation?: QueryInterpretation;
  /**
   * The estimated result count for this query.
   */
  resultCountEstimate?: bigint;
  /**
   * The exact result count for this query.
   */
  resultCountExact?: bigint;
  /**
   * Expanded result count information.
   */
  resultCounts?: ResultCounts;
  /**
   * Results from a search query.
   */
  results?: SearchResult[];
  /**
   * Suggested spelling for the query.
   */
  spellResults?: SpellResult[];
  /**
   * Structured results for the user query. These results are not counted
   * against the page_size.
   */
  structuredResults?: StructuredResult[];
}

function serializeSearchResponse(data: any): SearchResponse {
  return {
    ...data,
    facetResults: data["facetResults"] !== undefined ? data["facetResults"].map((item: any) => (serializeFacetResult(item))) : undefined,
    resultCountEstimate: data["resultCountEstimate"] !== undefined ? String(data["resultCountEstimate"]) : undefined,
    resultCountExact: data["resultCountExact"] !== undefined ? String(data["resultCountExact"]) : undefined,
    resultCounts: data["resultCounts"] !== undefined ? serializeResultCounts(data["resultCounts"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeSearchResult(item))) : undefined,
  };
}

function deserializeSearchResponse(data: any): SearchResponse {
  return {
    ...data,
    facetResults: data["facetResults"] !== undefined ? data["facetResults"].map((item: any) => (deserializeFacetResult(item))) : undefined,
    resultCountEstimate: data["resultCountEstimate"] !== undefined ? BigInt(data["resultCountEstimate"]) : undefined,
    resultCountExact: data["resultCountExact"] !== undefined ? BigInt(data["resultCountExact"]) : undefined,
    resultCounts: data["resultCounts"] !== undefined ? deserializeResultCounts(data["resultCounts"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeSearchResult(item))) : undefined,
  };
}

/**
 * Results containing indexed information for a document.
 */
export interface SearchResult {
  /**
   * If source is clustered, provide list of clustered results. There will only
   * be one level of clustered results. If current source is not enabled for
   * clustering, this field will be empty.
   */
  clusteredResults?: SearchResult[];
  /**
   * Debugging information about this search result.
   */
  debugInfo?: ResultDebugInfo;
  /**
   * Metadata of the search result.
   */
  metadata?: Metadata;
  /**
   * The concatenation of all snippets (summaries) available for this result.
   */
  snippet?: Snippet;
  /**
   * Title of the search result.
   */
  title?: string;
  /**
   * The URL of the search result. The URL contains a Google redirect to the
   * actual item. This URL is signed and shouldn't be changed.
   */
  url?: string;
}

function serializeSearchResult(data: any): SearchResult {
  return {
    ...data,
    clusteredResults: data["clusteredResults"] !== undefined ? data["clusteredResults"].map((item: any) => (serializeSearchResult(item))) : undefined,
    metadata: data["metadata"] !== undefined ? serializeMetadata(data["metadata"]) : undefined,
  };
}

function deserializeSearchResult(data: any): SearchResult {
  return {
    ...data,
    clusteredResults: data["clusteredResults"] !== undefined ? data["clusteredResults"].map((item: any) => (deserializeSearchResult(item))) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Sections are separated by a line divider. They contain a collection of
 * widgets that are rendered (vertically) in the order that they are specified.
 * Across all platforms, AddOns have a narrow fixed width, so there is currently
 * no need for layout properties (e.g. float).
 */
export interface Section {
  /**
   * Indicating whether this section is collapsable. If a section is
   * collapsable, the description must be given.
   */
  collapsable?: boolean;
  /**
   * The header of the section, text formatted supported.
   */
  description?: string;
  /**
   * The number of uncollapsable widgets. For example, when a section contains
   * 5 widgets and the num_uncollapsable_widget are set to be 2, The first 2
   * widgets will always shown and the last 3 is collapsed as default. Only when
   * collapsable is set to be true, the num_uncollapsable_widget will be taken
   * into account.
   */
  numUncollapsableWidgets?: number;
  /**
   * A section must contain at least 1 widget.
   */
  widgets?: WidgetMarkup[];
}

function serializeSection(data: any): Section {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (serializeWidgetMarkup(item))) : undefined,
  };
}

function deserializeSection(data: any): Section {
  return {
    ...data,
    widgets: data["widgets"] !== undefined ? data["widgets"].map((item: any) => (deserializeWidgetMarkup(item))) : undefined,
  };
}

export interface Segment {
  /**
   * Formatting to be applied when rendering the Segment. For all segment
   * types, this is the standard way of representing that the Segment should be
   * rendered in bold, italics, etc.
   */
  formatting?: Formatting;
  /**
   * For HASHTAG type:
   */
  hashtagData?: HashtagData;
  /**
   * Type-specific metadata. At most one of these should be populated, and the
   * one that is populated should correspond to the type of the Segment. For
   * LINK type:
   */
  linkData?: LinkData;
  /**
   * Text content of the Segment. As a general rule, this field should contain
   * the actual text that should be rendered in the UI. Thus, for a hashtag, it
   * should be "#Foo", and for a link, it should be the display text. Clients
   * that do not understand a particular segment type may use this text, along
   * with the Formatting info below, as a fallback for display. The field is not
   * required -- if all relevant information is carried in other metadata fields
   * and there is no need for a fallback, or it is not practical for a fallback
   * to be provided for any other reason, the field may be left blank. A
   * standard example would be a user reference being transmitted between server
   * layers, where a gaia-ID representation may be sufficient and there is no
   * need for a textual fallback. In such a case, it would be valid and useful -
   * though not required - for servers to compute and populate a fallback on the
   * serving path.
   */
  text?: string;
  /**
   * Type of Segment.
   */
  type?:  | "TEXT" | "LINE_BREAK" | "LINK" | "USER_MENTION" | "ALL_USER_MENTION" | "HASHTAG";
  /**
   * For USER_MENTION type:
   */
  userMentionData?: UserMentionData;
}

function serializeSegment(data: any): Segment {
  return {
    ...data,
    linkData: data["linkData"] !== undefined ? serializeLinkData(data["linkData"]) : undefined,
    userMentionData: data["userMentionData"] !== undefined ? serializeUserMentionData(data["userMentionData"]) : undefined,
  };
}

function deserializeSegment(data: any): Segment {
  return {
    ...data,
    linkData: data["linkData"] !== undefined ? deserializeLinkData(data["linkData"]) : undefined,
    userMentionData: data["userMentionData"] !== undefined ? deserializeUserMentionData(data["userMentionData"]) : undefined,
  };
}

export interface SelectionControl {
  /**
   * For radio button, at most one of the items will be selected.
   */
  items?: SelectionItem[];
  /**
   * Label used to be displayed ahead of the selection control. It is optional.
   */
  label?: string;
  /**
   * The name of the text field which is will be used in FormInput.
   */
  name?: string;
  /**
   * If specified, form is submitted when selection changed. If not specified,
   * developer will need to specify a separate button.
   */
  onChange?: FormAction;
  type?:  | "CHECK_BOX" | "RADIO_BUTTON" | "SWITCH" | "DROPDOWN";
}

export interface SelectionItem {
  /**
   * If more than one items are selected for RADIO_BUTTON and DROPDOWN, the
   * first selected item is treated as sElected and the after ones are all
   * ignored.
   */
  selected?: boolean;
  /**
   * The text to be displayed.
   */
  text?: string;
  /**
   * The value associated with this item which will be sent back to app
   * scripts. Client should use as a form input value.
   */
  value?: string;
}

export interface SessionContext {
  /**
   * Time at which this activity's session was authenticated, in seconds since
   * the epoch.
   */
  authTime?: bigint;
  /**
   * Gaia ID of the authenticated user when delegate access is active. In such
   * sessions the main gaia ID is that of the delegator, i.e. the account being
   * accessed.
   */
  delegateUserId?: bigint;
  /**
   * Device User Session ID, see go/dusi.
   */
  dusi?: string;
  /**
   * Imap session context for Bond/Gmail integration
   */
  imapSessionContext?: ImapSessionContext;
  /**
   * OAuth login ID.
   */
  oauthLoginId?: number;
  /**
   * The devconsole project ID of the developer who authenticated with OAuth.
   */
  oauthProjectId?: bigint;
}

function serializeSessionContext(data: any): SessionContext {
  return {
    ...data,
    authTime: data["authTime"] !== undefined ? String(data["authTime"]) : undefined,
    delegateUserId: data["delegateUserId"] !== undefined ? String(data["delegateUserId"]) : undefined,
    imapSessionContext: data["imapSessionContext"] !== undefined ? serializeImapSessionContext(data["imapSessionContext"]) : undefined,
    oauthProjectId: data["oauthProjectId"] !== undefined ? String(data["oauthProjectId"]) : undefined,
  };
}

function deserializeSessionContext(data: any): SessionContext {
  return {
    ...data,
    authTime: data["authTime"] !== undefined ? BigInt(data["authTime"]) : undefined,
    delegateUserId: data["delegateUserId"] !== undefined ? BigInt(data["delegateUserId"]) : undefined,
    imapSessionContext: data["imapSessionContext"] !== undefined ? deserializeImapSessionContext(data["imapSessionContext"]) : undefined,
    oauthProjectId: data["oauthProjectId"] !== undefined ? BigInt(data["oauthProjectId"]) : undefined,
  };
}

/**
 * A session event is something that happens to the streaming session in a
 * conference.
 */
export interface SessionEvent {
  /**
   * The initiator of the latest event of the streaming session. It will be set
   * for all user events (`type` is 100-199) and unset for all server
   * events(`type` is 200-299).
   */
  deviceId?: string;
  /**
   * The type of event.
   */
  type?:  | "EVENT_UNSPECIFIED" | "STARTED_BY_USER" | "STOPPED_BY_USER" | "CANCELLED_BY_USER" | "CANCELLED_INITIALIZATION_FAILED" | "CANCELLED_INITIATOR_LEFT" | "ACTIVE_ABOUT_TO_STOP_TOO_LONG" | "STOPPED_TOO_LONG" | "STOPPED_ALL_DEVICES_LEFT" | "STOPPED_INTERNAL_FAILURES";
}

/**
 * Information about the state of a (recording, broadcast, transcription...)
 * session in a conference.
 */
export interface SessionStateInfo {
  /**
   * Output only. The ack info of the session.
   */
  readonly ackInfo?: AckInfo;
  /**
   * Immutable. The language configuration used by this session. When empty,
   * captions will be disabled. It's a required field for transcription
   * sessions.
   */
  languageConfig?: LanguageConfig;
  /**
   * Output only. The device id of the actor is set if the current state is a
   * result of a user action, is empty otherwise.
   */
  readonly lastActorDeviceId?: string;
  /**
   * Output only. The max end time of the session, at this time the session
   * will be force stopped/terminated. Clients are expected to use this
   * timestamp to warn users about the force stop.
   */
  readonly maxEndTime?: Date;
  /**
   * State of the session.
   */
  sessionState?:  | "SESSION_STATE_UNSPECIFIED" | "STARTING" | "ACTIVE" | "STOPPED";
  /**
   * Output only. The reason the session was transitioned to STOPPED state.
   */
  readonly sessionStopReason?:  | "SESSION_STOP_REASON_UNSPECIFIED" | "USER_ACTION" | "STOPPED_INITIALIZATION_FAILED" | "STOPPED_TOO_LONG" | "STOPPED_ALL_DEVICES_LEFT" | "STOPPED_INTERNAL_FAILURES" | "STOPPED_YOU_TUBE_LIVE_EVENT_ENDED";
}

/**
 * Settings of a meeting space that can be edited by users with corresponding
 * manage privilege. These settings are always populated in responses.
 */
export interface Settings {
  /**
   * The access lock of the meeting space that lets hosts control who can join
   * the meeting.
   */
  accessLock?: boolean;
  /**
   * The access type of the meeting space.
   */
  accessType?:  | "ACCESS_TYPE_UNSPECIFIED" | "ACCESS_TYPE_OPEN" | "ACCESS_TYPE_TRUSTED" | "ACCESS_TYPE_RESTRICTED" | "ACCESS_TYPE_CLOSED";
  /**
   * Whether users can join before host in the conferences of this meeting
   * space.
   */
  allowJoiningBeforeHost?: boolean;
  /**
   * Whether attendance report is enabled for the meeting space.
   */
  attendanceReportEnabled?: boolean;
  /**
   * The chat lock of the meeting space that lets owner control whether the
   * participants can send chat messages.
   */
  chatLock?: boolean;
  /**
   * Whether meeting artifacts will be shared with cohosts.
   */
  cohostArtifactSharingEnabled?: boolean;
  /**
   * Whether Client-side Encryption is enabled for the meeting space.
   */
  cseEnabled?: boolean;
  /**
   * Whether the default role is viewer or not.
   */
  defaultAsViewer?: boolean;
  /**
   * Indicates whether the meeting space is moderated.
   */
  moderationEnabled?: boolean;
  /**
   * The present lock of the meeting space that lets owner control whether the
   * participants can present their screen.
   */
  presentLock?: boolean;
  /**
   * The reactions lock of the meeting space that lets owner control whether
   * the participants can send reactions.
   */
  reactionsLock?: boolean;
}

/**
 * Additional options for CloudSearch#settingsDatasourcesDelete.
 */
export interface SettingsDatasourcesDeleteOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#settingsDatasourcesGet.
 */
export interface SettingsDatasourcesGetOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#settingsDatasourcesList.
 */
export interface SettingsDatasourcesListOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Maximum number of datasources to fetch in a request. The max value is
   * 1000. The default value is 1000.
   */
  pageSize?: number;
  /**
   * Starting index of the results.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudSearch#settingsDatasourcesPatch.
 */
export interface SettingsDatasourcesPatchOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * Only applies to
   * [`settings.datasources.patch`](https://developers.google.com/cloud-search/docs/reference/rest/v1/settings.datasources/patch).
   * Update mask to control which fields to update. Example field paths: `name`,
   * `displayName`. * If `update_mask` is non-empty, then only the fields
   * specified in the `update_mask` are updated. * If you specify a field in the
   * `update_mask`, but don't specify its value in the source, that field is
   * cleared. * If the `update_mask` is not present or empty or has the value
   * `*`, then all fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeSettingsDatasourcesPatchOptions(data: any): SettingsDatasourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSettingsDatasourcesPatchOptions(data: any): SettingsDatasourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudSearch#settingsSearchapplicationsDelete.
 */
export interface SettingsSearchapplicationsDeleteOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#settingsSearchapplicationsGet.
 */
export interface SettingsSearchapplicationsGetOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
}

/**
 * Additional options for CloudSearch#settingsSearchapplicationsList.
 */
export interface SettingsSearchapplicationsListOptions {
  /**
   * If you are asked by Google to help with debugging, set this field.
   * Otherwise, ignore this field.
   */
  ["debugOptions.enableDebugging"]?: boolean;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   * The default value is 10
   */
  pageToken?: string;
}

/**
 * Additional options for CloudSearch#settingsSearchapplicationsPatch.
 */
export interface SettingsSearchapplicationsPatchOptions {
  /**
   * Only applies to
   * [`settings.searchapplications.patch`](https://developers.google.com/cloud-search/docs/reference/rest/v1/settings.searchapplications/patch).
   * Update mask to control which fields to update. Example field paths:
   * `search_application.name`, `search_application.displayName`. * If
   * `update_mask` is non-empty, then only the fields specified in the
   * `update_mask` are updated. * If you specify a field in the `update_mask`,
   * but don't specify its value in the `search_application`, then that field is
   * cleared. * If the `update_mask` is not present or empty or has the value
   * `*`, then all fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeSettingsSearchapplicationsPatchOptions(data: any): SettingsSearchapplicationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSettingsSearchapplicationsPatchOptions(data: any): SettingsSearchapplicationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudSearch#settingsSearchapplicationsUpdate.
 */
export interface SettingsSearchapplicationsUpdateOptions {
  /**
   * Only applies to
   * [`settings.searchapplications.patch`](https://developers.google.com/cloud-search/docs/reference/rest/v1/settings.searchapplications/patch).
   * Update mask to control which fields to update. Example field paths:
   * `search_application.name`, `search_application.displayName`. * If
   * `update_mask` is non-empty, then only the fields specified in the
   * `update_mask` are updated. * If you specify a field in the `update_mask`,
   * but don't specify its value in the `search_application`, then that field is
   * cleared. * If the `update_mask` is not present or empty or has the value
   * `*`, then all fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeSettingsSearchapplicationsUpdateOptions(data: any): SettingsSearchapplicationsUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSettingsSearchapplicationsUpdateOptions(data: any): SettingsSearchapplicationsUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudSearch#settingsUpdateCustomer.
 */
export interface SettingsUpdateCustomerOptions {
  /**
   * Update mask to control which fields get updated. If you specify a field in
   * the update_mask but don't specify its value here, that field will be
   * cleared. If the mask is not present or empty, all fields will be updated.
   * Currently supported field paths: vpc_settings and audit_logging_settings
   */
  updateMask?: string /* FieldMask */;
}

function serializeSettingsUpdateCustomerOptions(data: any): SettingsUpdateCustomerOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSettingsUpdateCustomerOptions(data: any): SettingsUpdateCustomerOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

export interface ShareScope {
  /**
   * If scope is DOMAIN, this field contains the dasher domain, for example
   * "google.com".
   */
  domain?: string;
  /**
   * The scope to which the content was shared.
   */
  scope?:  | "UNKNOWN" | "PRIVATE" | "LIMITED" | "EXTENDED" | "DASHER_DOMAIN" | "PUBLIC";
}

export interface SheetsClientActionMarkup {
  customFunctionReturnValueMarkup?: CustomFunctionReturnValueMarkup;
}

/**
 * Represents a principal who possesses a signing key corresponding to the
 * verification key or keyset described here.
 */
export interface SigningKeyPossessorProto {
  /**
   * This value must be from the KeyMetadata.Type enum in keymaster.proto.
   */
  keymasterKeyType?: number;
  /**
   * The actual verification key bytes corresponding to the above type.
   */
  serializedVerificationKey?: Uint8Array;
  /**
   * The binary serialized Keymaster SerializedReader of a public keyset. The
   * keyset must contain exactly one key. N.B.: If this field is populated,
   * serialized_verification_key should be set to the empty string and
   * keymaster_key_type should be set to zero.
   */
  serializedVerificationKeyset?: Uint8Array;
}

function serializeSigningKeyPossessorProto(data: any): SigningKeyPossessorProto {
  return {
    ...data,
    serializedVerificationKey: data["serializedVerificationKey"] !== undefined ? encodeBase64(data["serializedVerificationKey"]) : undefined,
    serializedVerificationKeyset: data["serializedVerificationKeyset"] !== undefined ? encodeBase64(data["serializedVerificationKeyset"]) : undefined,
  };
}

function deserializeSigningKeyPossessorProto(data: any): SigningKeyPossessorProto {
  return {
    ...data,
    serializedVerificationKey: data["serializedVerificationKey"] !== undefined ? decodeBase64(data["serializedVerificationKey"] as string) : undefined,
    serializedVerificationKeyset: data["serializedVerificationKeyset"] !== undefined ? decodeBase64(data["serializedVerificationKeyset"] as string) : undefined,
  };
}

/**
 * Represents a principal which possesses a particular, presumably secret,
 * string. Useful for things like "auth keys," used for anonymous sharing. Since
 * representing this principal with the actual secret included reveals the
 * secret, it's best if the requisite condition is enforced in some other way,
 * for example via Keystore wrapping attributes (Keystore will unwrap only if
 * the specified secret, aka "attribute", is presented). All that's stored here
 * is an identifying label.
 */
export interface SimpleSecretHolderProto {
  /**
   * A descriptive label to help identify a relevant ACL entry or otherwise
   * disambiguate this instance.
   */
  label?: SimpleSecretLabelProto;
}

function serializeSimpleSecretHolderProto(data: any): SimpleSecretHolderProto {
  return {
    ...data,
    label: data["label"] !== undefined ? serializeSimpleSecretLabelProto(data["label"]) : undefined,
  };
}

function deserializeSimpleSecretHolderProto(data: any): SimpleSecretHolderProto {
  return {
    ...data,
    label: data["label"] !== undefined ? deserializeSimpleSecretLabelProto(data["label"]) : undefined,
  };
}

/**
 * SimpleSecretProto (in authenticator.proto) and SimpleSecretHolderProto
 * (below) share the notion of a "label", which identifies a particular secret
 * without (hopefully) revealing the secret. Note that a SimpleSecretLabel only
 * disambiguates between secrets used to get access to some particular object.
 * Two different secrets that apply to two different objects could have the same
 * label. For example, in the common sharing model, each object has no more than
 * one "auth key". Therefore, the label for an auth key simply has type =
 * AUTH_KEY with no additional information. In theory, we could add some sort of
 * resource ID to SimpleSecretLabel to make it more explicit. However, in
 * practice, this is never really needed. A SimpleSecret for one object is never
 * used to authorize a request on some other object, so there is no ambiguity.
 * Also, since SimpleSecrets must obviously be unguessable, there is no risk
 * that a SimpleSecret intended for one object will accidentally grant access to
 * another.
 */
export interface SimpleSecretLabelProto {
  /**
   * ***DEPRECATED (3-Oct-2011) *** This field should be deleted when code
   * stops using CAP_TOKEN labels. Used when type = CAP_TOKEN. When a CAP_TOKEN
   * label appears in a SimpleSecretHolder Principal, |capability_id| must be
   * filled in to identify one of the capabilities on the ACL. When a CAP_TOKEN
   * label appears in a SimpleSecret Authenticator, it is NOT necessary to fill
   * in |capability_id| -- ACL Service will find the ID by searching all
   * capabilities on the ACL for one associated with the token given by the
   * SimpleSecret's secret data. If |capability_id| is specified, though, then
   * the Authenticator will only be accepted if it actually matches that
   * particular token ID.
   */
  capabilityId?: number;
  /**
   * Used when type = GENERIC_SECRET
   */
  genericLabel?: Uint8Array;
  /**
   * Used when type == INVITE.
   */
  inviteId?: bigint;
  /**
   * This is optional because required enums cannot be extended.
   */
  type?:  | "INVALID" | "AUTH_KEY" | "INVITE" | "GENERIC_SECRET" | "CAP_TOKEN" | "REKE";
}

function serializeSimpleSecretLabelProto(data: any): SimpleSecretLabelProto {
  return {
    ...data,
    genericLabel: data["genericLabel"] !== undefined ? encodeBase64(data["genericLabel"]) : undefined,
    inviteId: data["inviteId"] !== undefined ? String(data["inviteId"]) : undefined,
  };
}

function deserializeSimpleSecretLabelProto(data: any): SimpleSecretLabelProto {
  return {
    ...data,
    genericLabel: data["genericLabel"] !== undefined ? decodeBase64(data["genericLabel"] as string) : undefined,
    inviteId: data["inviteId"] !== undefined ? BigInt(data["inviteId"]) : undefined,
  };
}

/**
 * Annotation metadata for slash commands (/).
 */
export interface SlashCommandMetadata {
  /**
   * Hint string for the arguments expected by the slash command.
   */
  argumentsHint?: string;
  /**
   * Unique id for the slash command.
   */
  commandId?: bigint;
  /**
   * Name of the slash command.
   */
  commandName?: string;
  /**
   * ID of the bot which owns the slash command.
   */
  id?: UserId;
  /**
   * Whether or not this slash command should trigger a dialog.
   */
  triggersDialog?: boolean;
  type?:  | "TYPE_UNSPECIFIED" | "ADD" | "INVOKE" | "FAILED_TO_ADD";
}

function serializeSlashCommandMetadata(data: any): SlashCommandMetadata {
  return {
    ...data,
    commandId: data["commandId"] !== undefined ? String(data["commandId"]) : undefined,
    id: data["id"] !== undefined ? serializeUserId(data["id"]) : undefined,
  };
}

function deserializeSlashCommandMetadata(data: any): SlashCommandMetadata {
  return {
    ...data,
    commandId: data["commandId"] !== undefined ? BigInt(data["commandId"]) : undefined,
    id: data["id"] !== undefined ? deserializeUserId(data["id"]) : undefined,
  };
}

/**
 * Snippet of the search result, which summarizes the content of the resulting
 * page.
 */
export interface Snippet {
  /**
   * The matched ranges in the snippet.
   */
  matchRanges?: MatchRange[];
  /**
   * The snippet of the document. The snippet of the document. May contain
   * escaped HTML character that should be unescaped prior to rendering.
   */
  snippet?: string;
}

/**
 * An Attachment represents a linked entity associated with a piece of social
 * content. This may be a 1st-party or 3rd-party entity. In the Papyrus context,
 * an Attachment is part of a Cent, and sits alongside the main content of the
 * cent, which is represented as a sequence of Segments. Right now an Attachment
 * is just a wrapper around an Embed, but we provide the extra layer of
 * abstraction since, as Embeds move to separate storage in Briefcase, we may
 * want to add additional fields that are not part of the Embed proper, but that
 * (for example) relate to the usage of the linked content within the particular
 * post/cent.
 */
export interface SocialCommonAttachmentAttachment {
  /**
   * An embed represents an external entity. See go/es-embeds.
   */
  embedItem?: EmbedClientItem;
  /**
   * An id to uniquely identify an attachment when several attachments are in a
   * collection.
   */
  id?: string;
}

function serializeSocialCommonAttachmentAttachment(data: any): SocialCommonAttachmentAttachment {
  return {
    ...data,
    embedItem: data["embedItem"] !== undefined ? serializeEmbedClientItem(data["embedItem"]) : undefined,
  };
}

function deserializeSocialCommonAttachmentAttachment(data: any): SocialCommonAttachmentAttachment {
  return {
    ...data,
    embedItem: data["embedItem"] !== undefined ? deserializeEmbedClientItem(data["embedItem"]) : undefined,
  };
}

/**
 * Represents a user pseudonym. Pseudonyms are linked accounts on Google and
 * third-party services (e.g. YouTube or Twitter) and are described by a Social
 * Graph Node.
 */
export interface SocialGraphNodeProto {
  /**
   * The fields from ccc/socialgraph/socialgraphnode.proto:SgnNode that
   * uniquely identify a social graph node. The 'ident' field is not included
   * here because its value can be changed.
   */
  sgnDomain?: string;
  sgnPk?: string;
}

export interface SortOptions {
  /**
   * The name of the operator corresponding to the field to sort on. The
   * corresponding property must be marked as sortable.
   */
  operatorName?: string;
  /**
   * Ascending is the default sort order
   */
  sortOrder?:  | "ASCENDING" | "DESCENDING";
}

/**
 * Defines sources for the suggest/search APIs.
 */
export interface Source {
  /**
   * Source name for content indexed by the Indexing API.
   */
  name?: string;
  /**
   * Predefined content source for Google Apps.
   */
  predefinedSource?:  | "NONE" | "QUERY_HISTORY" | "PERSON" | "GOOGLE_DRIVE" | "GOOGLE_GMAIL" | "GOOGLE_SITES" | "GOOGLE_GROUPS" | "GOOGLE_CALENDAR" | "GOOGLE_KEEP";
}

/**
 * Configurations for a source while processing a Search or Suggest request.
 */
export interface SourceConfig {
  /**
   * The crowding configuration for the source.
   */
  crowdingConfig?: SourceCrowdingConfig;
  /**
   * The scoring configuration for the source.
   */
  scoringConfig?: SourceScoringConfig;
  /**
   * The source for which this configuration is to be used.
   */
  source?: Source;
}

/**
 * Set search results crowding limits. Crowding is a situation in which
 * multiple results from the same source or host "crowd out" other results,
 * diminishing the quality of search for users. To foster better search quality
 * and source diversity in search results, you can set a condition to reduce
 * repetitive results by source.
 */
export interface SourceCrowdingConfig {
  /**
   * Maximum number of results allowed from a datasource in a result page as
   * long as results from other sources are not exhausted. Value specified must
   * not be negative. A default value is used if this value is equal to 0. To
   * disable crowding, set the value greater than 100.
   */
  numResults?: number;
  /**
   * Maximum number of suggestions allowed from a source. No limits will be set
   * on results if this value is less than or equal to 0.
   */
  numSuggestions?: number;
}

/**
 * Per source result count information.
 */
export interface SourceResultCount {
  /**
   * Whether there are more search results for this source.
   */
  hasMoreResults?: boolean;
  /**
   * The estimated result count for this source.
   */
  resultCountEstimate?: bigint;
  /**
   * The exact result count for this source.
   */
  resultCountExact?: bigint;
  /**
   * The source the result count information is associated with.
   */
  source?: Source;
}

function serializeSourceResultCount(data: any): SourceResultCount {
  return {
    ...data,
    resultCountEstimate: data["resultCountEstimate"] !== undefined ? String(data["resultCountEstimate"]) : undefined,
    resultCountExact: data["resultCountExact"] !== undefined ? String(data["resultCountExact"]) : undefined,
  };
}

function deserializeSourceResultCount(data: any): SourceResultCount {
  return {
    ...data,
    resultCountEstimate: data["resultCountEstimate"] !== undefined ? BigInt(data["resultCountEstimate"]) : undefined,
    resultCountExact: data["resultCountExact"] !== undefined ? BigInt(data["resultCountExact"]) : undefined,
  };
}

/**
 * Set the scoring configuration. This allows modifying the ranking of results
 * for a source.
 */
export interface SourceScoringConfig {
  /**
   * Importance of the source.
   */
  sourceImportance?:  | "DEFAULT" | "LOW" | "HIGH";
}

/**
 * Primary key for Space resource.
 */
export interface SpaceId {
  /**
   * Unique, immutable ID of the Space
   */
  spaceId?: string;
}

export interface SpellResult {
  /**
   * The suggested spelling of the query.
   */
  suggestedQuery?: string;
}

/**
 * Represents the set of members (of a given type) in a Google+ Square (see
 * http://go/squares). A Square with default member_type is currently (1/2012)
 * identical to the GaiaGroup with the same ID, but that is expected to change
 * soon (see http://go/superglue). Support for this principal type is currently
 * (1/2012) incomplete -- e.g., Keystore does not support it yet (see
 * b/5703421).
 */
export interface SquareProto {
  /**
   * The type of Square members to consider, e.g. "all members" vs. "owners"
   * vs. "admins". These are defined by legacy_relation_id values in
   * social.graph.storage.EdgeTypeEnum.EdgeType enum options in
   * social/graph/storage/proto/id.proto. See square.pb (defined in
   * production/config/cdd/socialgraph/mixer_config/prod/node_type_config) for
   * all valid edge types associated with square. Currently required.
   */
  memberType?: number;
  /**
   * Currently required.
   */
  squareId?: bigint;
}

function serializeSquareProto(data: any): SquareProto {
  return {
    ...data,
    squareId: data["squareId"] !== undefined ? String(data["squareId"]) : undefined,
  };
}

function deserializeSquareProto(data: any): SquareProto {
  return {
    ...data,
    squareId: data["squareId"] !== undefined ? BigInt(data["squareId"]) : undefined,
  };
}

/**
 * Start upload file request.
 */
export interface StartUploadItemRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
}

/**
 * Additional options for CloudSearch#statsGetIndex.
 */
export interface StatsGetIndexOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsGetQuery.
 */
export interface StatsGetQueryOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsGetSearchapplication.
 */
export interface StatsGetSearchapplicationOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["endDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["endDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["endDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["startDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["startDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsGetSession.
 */
export interface StatsGetSessionOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsGetUser.
 */
export interface StatsGetUserOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsIndexDatasourcesGet.
 */
export interface StatsIndexDatasourcesGetOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsQuerySearchapplicationsGet.
 */
export interface StatsQuerySearchapplicationsGetOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsSessionSearchapplicationsGet.
 */
export interface StatsSessionSearchapplicationsGetOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
}

/**
 * Additional options for CloudSearch#statsUserSearchapplicationsGet.
 */
export interface StatsUserSearchapplicationsGetOptions {
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["fromDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["fromDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["fromDate.year"]?: number;
  /**
   * Day of month. Must be from 1 to 31 and valid for the year and month.
   */
  ["toDate.day"]?: number;
  /**
   * Month of date. Must be from 1 to 12.
   */
  ["toDate.month"]?: number;
  /**
   * Year of date. Must be from 1 to 9999.
   */
  ["toDate.year"]?: number;
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

export interface StoredParticipantId {
  gaiaId?: bigint;
}

function serializeStoredParticipantId(data: any): StoredParticipantId {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? String(data["gaiaId"]) : undefined,
  };
}

function deserializeStoredParticipantId(data: any): StoredParticipantId {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? BigInt(data["gaiaId"]) : undefined,
  };
}

/**
 * Information about a streaming session in conference.
 */
export interface StreamingSessionInfo {
  /**
   * The application type of the current streaming session.
   */
  applicationType?:  | "RECORDING_APPLICATION_TYPE_UNSPECIFIED" | "RECORDING" | "GLIVE_STREAM" | "BROADCAST";
  /**
   * The latest streaming session event. This can be used by clients to help
   * explain what is going on, why recording stopped, etc. This will always be
   * set to a valid event and consistent with the status. It can be set when
   * current session is inactive to indicate latest event that makes current
   * session to become inactive.
   */
  latestSessionEvent?: SessionEvent;
  /**
   * The display name of the owner of the recording output. It's only set when
   * there will be uploaded recordings. Currently, it's only set when
   * application type is RECORDING or GLIVE_STREAM.
   */
  ownerDisplayName?: string;
  /**
   * This is the REST name and unique identifier of this streaming session and
   * has the form `spaces//recordings/` This is returned whenever status is
   * either `STARTING` or `STARTED`.
   */
  sessionId?: string;
  /**
   * The current status of this streaming session. This can be used by clients
   * to show session status indicator and/or notification.
   */
  status?:  | "STATUS_UNSPECIFIED" | "INACTIVE" | "STARTING" | "LIVE";
  /**
   * When true, this recording may be used for training new transcription
   * models.
   */
  trainingEnabled?: boolean;
  /**
   * The policy that controls who can view the broadcast. This setting applies
   * for broadcast session.
   */
  viewerAccessPolicy?:  | "BROADCASTING_ACCESS_POLICY_UNSPECIFIED" | "ORGANIZATION" | "PUBLIC";
  /**
   * Contains information about viewers of the livestream. It is only set when
   * application type is BROADCAST.
   */
  viewerStats?: StreamViewerStats;
}

function serializeStreamingSessionInfo(data: any): StreamingSessionInfo {
  return {
    ...data,
    viewerStats: data["viewerStats"] !== undefined ? serializeStreamViewerStats(data["viewerStats"]) : undefined,
  };
}

function deserializeStreamingSessionInfo(data: any): StreamingSessionInfo {
  return {
    ...data,
    viewerStats: data["viewerStats"] !== undefined ? deserializeStreamViewerStats(data["viewerStats"]) : undefined,
  };
}

/**
 * Information about viewers of the stream.
 */
export interface StreamViewerStats {
  /**
   * The estimate of the current viewer count.
   */
  estimatedViewerCount?: bigint;
}

function serializeStreamViewerStats(data: any): StreamViewerStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? String(data["estimatedViewerCount"]) : undefined,
  };
}

function deserializeStreamViewerStats(data: any): StreamViewerStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? BigInt(data["estimatedViewerCount"]) : undefined,
  };
}

/**
 * A structured data object consisting of named properties.
 */
export interface StructuredDataObject {
  /**
   * The properties for the object. The maximum number of elements is 1000.
   */
  properties?: NamedProperty[];
}

function serializeStructuredDataObject(data: any): StructuredDataObject {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeNamedProperty(item))) : undefined,
  };
}

function deserializeStructuredDataObject(data: any): StructuredDataObject {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeNamedProperty(item))) : undefined,
  };
}

/**
 * Structured results that are returned as part of search request.
 */
export interface StructuredResult {
  /**
   * Representation of a person
   */
  person?: Person;
}

/**
 * Request of suggest API.
 */
export interface SuggestRequest {
  /**
   * The sources to use for suggestions. If not specified, the data sources are
   * taken from the current search application. NOTE: Suggestions are only
   * supported for the following sources: * Third-party data sources *
   * PredefinedSource.PERSON * PredefinedSource.GOOGLE_DRIVE
   */
  dataSourceRestrictions?: DataSourceRestriction[];
  /**
   * Partial query for which autocomplete suggestions will be shown. For
   * example, if the query is "sea", then the server might return "season",
   * "search", "seagull" and so on.
   */
  query?: string;
  /**
   * Request options, such as the search application and user timezone.
   */
  requestOptions?: RequestOptions;
}

function serializeSuggestRequest(data: any): SuggestRequest {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (serializeDataSourceRestriction(item))) : undefined,
  };
}

function deserializeSuggestRequest(data: any): SuggestRequest {
  return {
    ...data,
    dataSourceRestrictions: data["dataSourceRestrictions"] !== undefined ? data["dataSourceRestrictions"].map((item: any) => (deserializeDataSourceRestriction(item))) : undefined,
  };
}

/**
 * Response of the suggest API.
 */
export interface SuggestResponse {
  /**
   * List of suggestions.
   */
  suggestResults?: SuggestResult[];
}

/**
 * One suggestion result.
 */
export interface SuggestResult {
  /**
   * This is present when the suggestion indicates a person. It contains more
   * information about the person - like their email ID, name etc.
   */
  peopleSuggestion?: PeopleSuggestion;
  /**
   * This field will be present if the suggested query is a word/phrase
   * completion.
   */
  querySuggestion?: QuerySuggestion;
  /**
   * The source of the suggestion.
   */
  source?: Source;
  /**
   * The suggested query that will be used for search, when the user clicks on
   * the suggestion
   */
  suggestedQuery?: string;
}

/**
 * Urls with additional bot related information.
 */
export interface SupportUrls {
  /**
   * Link to the admin configuration webpage for the bot. Configured by
   * Pantheon, may be empty.
   */
  adminConfigUrl?: string;
  /**
   * Link to the deletion policy webpage for the bot. Configured by Pantheon,
   * may be empty.
   */
  deletionPolicyUrl?: string;
  /**
   * Link to GWM page of the app. May be empty.
   */
  gwmUrl?: string;
  /**
   * Link to the privacy policy webpage for the bot. May be empty.
   */
  privacyPolicyUrl?: string;
  /**
   * Link to the setup webpage for the bot. Configured by Pantheon, may be
   * empty.
   */
  setupUrl?: string;
  /**
   * Link to the support webpage for the developer of the bot. May be empty.
   */
  supportUrl?: string;
  /**
   * Link to the terms of service webpage for the bot. May be empty.
   */
  tosUrl?: string;
}

export interface SwitchWidget {
  controlType?:  | "UNSPECIFIED" | "SWITCH" | "CHECKBOX";
  /**
   * The name of the switch widget which is will be used in FormInput.
   */
  name?: string;
  onChange?: FormAction;
  selected?: boolean;
  /**
   * The value is what is passed back in apps script callback.
   */
  value?: string;
}

export interface TaskActionMarkup {
  reloadTasks?: boolean;
}

export interface TextButton {
  /**
   * The alternative text used for accessibility Next field number: 7.
   */
  altText?: string;
  /**
   * Optional color of the button's background in RAISE mode. The default is
   * the secondary color from addon's manifest.
   */
  backgroundColor?: string;
  disabled?: boolean;
  onClick?: OnClick;
  style?:  | "UNSPECIFIED" | "TEXT" | "FILLED";
  /**
   * Text color can be set via HTML markup.
   */
  text?: string;
}

export interface TextField {
  /**
   * The initial set of auto complete items without any user input.
   */
  autoComplete?: AutoComplete;
  /**
   * The refresh function which returns AutoComplete based on the user's input
   * text. If the callback is not specified, auto complete will be purely done
   * in client side based on the auto_complete items.
   */
  autoCompleteCallback?: FormAction;
  /**
   * When set to true, a user can input multiple auto-complet items.
   */
  autoCompleteMultipleSelections?: boolean;
  hintText?: string;
  /**
   * One of label or hint_text is required to be specified by the developers.
   */
  label?: string;
  maxLines?: number;
  /**
   * The name of the text field which is will be used in FormInput.
   */
  name?: string;
  onChange?: FormAction;
  type?:  | "SINGLE_LINE" | "MULTIPLE_LINE";
  /**
   * The default value when no input from user.
   */
  value?: string;
}

/**
 * This is deprecated and please use KeyValue.
 */
export interface TextKeyValue {
  key?: string;
  onClick?: OnClick;
  text?: string;
}

/**
 * Used to provide a search operator for text properties. This is optional.
 * Search operators let users restrict the query to specific fields relevant to
 * the type of item being searched.
 */
export interface TextOperatorOptions {
  /**
   * If true, the text value is tokenized as one atomic value in operator
   * searches and facet matches. For example, if the operator name is "genre"
   * and the value is "science-fiction" the query restrictions "genre:science"
   * and "genre:fiction" doesn't match the item; "genre:science-fiction" does.
   * Text value matching is case-sensitive and does not remove special
   * characters. If false, the text is tokenized. For example, if the value is
   * "science-fiction" the queries "genre:science" and "genre:fiction" matches
   * the item.
   */
  exactMatchWithOperator?: boolean;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * text property. For example, if operatorName is *subject* and the property's
   * name is *subjectLine*, then queries like *subject:<value>* show results
   * only where the value of the property named *subjectLine* matches *<value>*.
   * By contrast, a search that uses the same *<value>* without an operator
   * returns all items where *<value>* matches the value of any text properties
   * or text within the content field for the item. The operator name can only
   * contain lowercase letters (a-z). The maximum length is 32 characters.
   */
  operatorName?: string;
}

export interface TextParagraph {
  text?: string;
}

/**
 * The options for text properties.
 */
export interface TextPropertyOptions {
  /**
   * If set, describes how the property should be used as a search operator.
   */
  operatorOptions?: TextOperatorOptions;
  /**
   * Indicates the search quality importance of the tokens within the field
   * when used for retrieval.
   */
  retrievalImportance?: RetrievalImportance;
}

/**
 * List of text values.
 */
export interface TextValues {
  /**
   * The maximum allowable length for text values is 2048 characters.
   */
  values?: string[];
}

/**
 * The ThreadKey was set on some (subset of the) messages in this thread.
 */
export interface ThreadKeySet {
  /**
   * Messages on which the thread_key was changed.
   */
  messageKeys?: MultiKey[];
  /**
   * The new thread_key for this thread
   */
  newThreadKey?: MultiKey;
}

function serializeThreadKeySet(data: any): ThreadKeySet {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (serializeMultiKey(item))) : undefined,
    newThreadKey: data["newThreadKey"] !== undefined ? serializeMultiKey(data["newThreadKey"]) : undefined,
  };
}

function deserializeThreadKeySet(data: any): ThreadKeySet {
  return {
    ...data,
    messageKeys: data["messageKeys"] !== undefined ? data["messageKeys"].map((item: any) => (deserializeMultiKey(item))) : undefined,
    newThreadKey: data["newThreadKey"] !== undefined ? deserializeMultiKey(data["newThreadKey"]) : undefined,
  };
}

/**
 * HistoryRecord for changes associated with a thread, namely: MESSAGE_ADDED
 * MESSAGE_DELETED LABEL_ADDED LABEL_REMOVED ATTRIBUTE_SET ATTRIBUTE_REMOVED
 * THREAD_KEY_SET All label_ids refer to the (unchanging) value as defined by
 * the Label.id field in labels.proto. In particular, it is *not* the
 * canonical_name.
 */
export interface ThreadUpdate {
  attributeRemoved?: AttributeRemoved;
  attributeSet?: AttributeSet;
  labelAdded?: LabelAdded;
  labelRemoved?: LabelRemoved;
  /**
   * Indicates the record id of the last operation that modified this thread.
   */
  lastHistoryRecordId?: bigint;
  messageAdded?: MessageAdded;
  messageDeleted?: MessageDeleted;
  /**
   * The first non-empty thread-key on any message in the thread (including
   * deleted messages). This field has been introduced to maintain backward
   * compatibility for clients that are not subthread aware.
   */
  originalThreadKey?: MultiKey;
  /**
   * The PreStates of all messages before the transaction. These are suppressed
   * if the client requested that prestates not be included in the output of the
   * GetHistoryRequest.
   */
  preState?: PreState[];
  /**
   * Affected thread
   */
  threadKey?: MultiKey;
  threadKeySet?: ThreadKeySet;
  /**
   * Thread PLID
   */
  threadLocator?: string;
  topicStateUpdate?: TopicStateUpdate;
}

function serializeThreadUpdate(data: any): ThreadUpdate {
  return {
    ...data,
    attributeRemoved: data["attributeRemoved"] !== undefined ? serializeAttributeRemoved(data["attributeRemoved"]) : undefined,
    attributeSet: data["attributeSet"] !== undefined ? serializeAttributeSet(data["attributeSet"]) : undefined,
    labelAdded: data["labelAdded"] !== undefined ? serializeLabelAdded(data["labelAdded"]) : undefined,
    labelRemoved: data["labelRemoved"] !== undefined ? serializeLabelRemoved(data["labelRemoved"]) : undefined,
    lastHistoryRecordId: data["lastHistoryRecordId"] !== undefined ? String(data["lastHistoryRecordId"]) : undefined,
    messageAdded: data["messageAdded"] !== undefined ? serializeMessageAdded(data["messageAdded"]) : undefined,
    messageDeleted: data["messageDeleted"] !== undefined ? serializeMessageDeleted(data["messageDeleted"]) : undefined,
    originalThreadKey: data["originalThreadKey"] !== undefined ? serializeMultiKey(data["originalThreadKey"]) : undefined,
    preState: data["preState"] !== undefined ? data["preState"].map((item: any) => (serializePreState(item))) : undefined,
    threadKey: data["threadKey"] !== undefined ? serializeMultiKey(data["threadKey"]) : undefined,
    threadKeySet: data["threadKeySet"] !== undefined ? serializeThreadKeySet(data["threadKeySet"]) : undefined,
  };
}

function deserializeThreadUpdate(data: any): ThreadUpdate {
  return {
    ...data,
    attributeRemoved: data["attributeRemoved"] !== undefined ? deserializeAttributeRemoved(data["attributeRemoved"]) : undefined,
    attributeSet: data["attributeSet"] !== undefined ? deserializeAttributeSet(data["attributeSet"]) : undefined,
    labelAdded: data["labelAdded"] !== undefined ? deserializeLabelAdded(data["labelAdded"]) : undefined,
    labelRemoved: data["labelRemoved"] !== undefined ? deserializeLabelRemoved(data["labelRemoved"]) : undefined,
    lastHistoryRecordId: data["lastHistoryRecordId"] !== undefined ? BigInt(data["lastHistoryRecordId"]) : undefined,
    messageAdded: data["messageAdded"] !== undefined ? deserializeMessageAdded(data["messageAdded"]) : undefined,
    messageDeleted: data["messageDeleted"] !== undefined ? deserializeMessageDeleted(data["messageDeleted"]) : undefined,
    originalThreadKey: data["originalThreadKey"] !== undefined ? deserializeMultiKey(data["originalThreadKey"]) : undefined,
    preState: data["preState"] !== undefined ? data["preState"].map((item: any) => (deserializePreState(item))) : undefined,
    threadKey: data["threadKey"] !== undefined ? deserializeMultiKey(data["threadKey"]) : undefined,
    threadKeySet: data["threadKeySet"] !== undefined ? deserializeThreadKeySet(data["threadKeySet"]) : undefined,
  };
}

/**
 * Used to provide a search operator for timestamp properties. This is
 * optional. Search operators let users restrict the query to specific fields
 * relevant to the type of item being searched.
 */
export interface TimestampOperatorOptions {
  /**
   * Indicates the operator name required in the query in order to isolate the
   * timestamp property using the greater-than operator. For example, if
   * greaterThanOperatorName is *closedafter* and the property's name is
   * *closeDate*, then queries like *closedafter:<value>* show results only
   * where the value of the property named *closeDate* is later than *<value>*.
   * The operator name can only contain lowercase letters (a-z). The maximum
   * length is 32 characters.
   */
  greaterThanOperatorName?: string;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * timestamp property using the less-than operator. For example, if
   * lessThanOperatorName is *closedbefore* and the property's name is
   * *closeDate*, then queries like *closedbefore:<value>* show results only
   * where the value of the property named *closeDate* is earlier than
   * *<value>*. The operator name can only contain lowercase letters (a-z). The
   * maximum length is 32 characters.
   */
  lessThanOperatorName?: string;
  /**
   * Indicates the operator name required in the query in order to isolate the
   * timestamp property. For example, if operatorName is *closedon* and the
   * property's name is *closeDate*, then queries like *closedon:<value>* show
   * results only where the value of the property named *closeDate* matches
   * *<value>*. By contrast, a search that uses the same *<value>* without an
   * operator returns all items where *<value>* matches the value of any String
   * properties or text within the content field for the item. The operator name
   * can only contain lowercase letters (a-z). The maximum length is 32
   * characters.
   */
  operatorName?: string;
}

/**
 * The options for timestamp properties.
 */
export interface TimestampPropertyOptions {
  /**
   * If set, describes how the timestamp should be used as a search operator.
   */
  operatorOptions?: TimestampOperatorOptions;
}

/**
 * List of timestamp values.
 */
export interface TimestampValues {
  values?: Date[];
}

function serializeTimestampValues(data: any): TimestampValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (item.toISOString())) : undefined,
  };
}

function deserializeTimestampValues(data: any): TimestampValues {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (new Date(item))) : undefined,
  };
}

/**
 * Tombstoning is the act of leaving a contextual trace when deleting a
 * message. See more: go/tombstone-prd,
 * go/hub-dynamite-tombstones-server-design-v2.
 */
export interface TombstoneMetadata {
  /**
   * Indicates the type of Tombstone.
   */
  tombstoneType?:  | "TOMBSTONE_UNSPECIFIED" | "CREATOR" | "ROOM_OWNER" | "ADMIN" | "APP_MESSAGE_EXPIRY" | "CREATOR_VIA_APP" | "ROOM_OWNER_VIA_APP";
}

/**
 * The Toolbar markup has been deprecated. The information is now specified in
 * the manifest.
 */
export interface Toolbar {
  /**
   * Background color of the toolbar in RBG hex representation.
   */
  color?: string;
  iconUrl?: string;
  name?: string;
}

export interface TopicId {
  /**
   * The Space or DM that the topic belongs to.
   */
  groupId?: GroupId;
  /**
   * Opaque, server-assigned ID of the Topic. While this ID is guaranteed to be
   * unique within the Space, it's not guaranteed to be globally unique.
   * Internal usage: this field can be empty in the following cases: 1. To
   * create the first message in a topic. 2. To list last N messages of a Space
   * (regardless of topic).
   */
  topicId?: string;
}

/**
 * State of an topic thread as maintained within Tingle.
 */
export interface TopicState {
  /**
   * Map of label => count of topic constituent messages with label These only
   * contain counts of labels that are relevant for topic
   * normalization/denormalization. Eg. If a topic thread has 5 constituents, 4
   * of which are in inbox, this will contain ^i => 4. Some labels of interest
   * are archive, inbox, trash, spam, etc.
   */
  labelIdMessageCount?: {
    [key: string]: number
  };
  /**
   * Number of constituents for this entity.
   */
  numConstituents?: number;
}

export interface TopicStateUpdate {
  topicState?: TopicState;
}

/**
 * Storage information pertaining to the transaction with which a HistoryRecord
 * is associated.
 */
export interface TransactionContext {
  /**
   * The last HistoryRecord of the transaction. Note that this may correspond
   * to a record that is filtered by Tingle (and thus not returned to the
   * client). See http://b/9513464.
   */
  endingRecordId?: bigint;
  /**
   * The first HistoryRecord of the transaction. Note that this may be a record
   * of type INTERNAL.
   */
  startingRecordId?: bigint;
  /**
   * The microsecond timestamp of the transaction.
   */
  writeTimestampUs?: bigint;
}

function serializeTransactionContext(data: any): TransactionContext {
  return {
    ...data,
    endingRecordId: data["endingRecordId"] !== undefined ? String(data["endingRecordId"]) : undefined,
    startingRecordId: data["startingRecordId"] !== undefined ? String(data["startingRecordId"]) : undefined,
    writeTimestampUs: data["writeTimestampUs"] !== undefined ? String(data["writeTimestampUs"]) : undefined,
  };
}

function deserializeTransactionContext(data: any): TransactionContext {
  return {
    ...data,
    endingRecordId: data["endingRecordId"] !== undefined ? BigInt(data["endingRecordId"]) : undefined,
    startingRecordId: data["startingRecordId"] !== undefined ? BigInt(data["startingRecordId"]) : undefined,
    writeTimestampUs: data["writeTimestampUs"] !== undefined ? BigInt(data["writeTimestampUs"]) : undefined,
  };
}

/**
 * HistoryRecord for debug info associated with the transaction, namely:
 * TXN_DEBUG_INFO TODO(b/143845917) This is a short-term workaround for
 * unblocking fusebox writes migration. Clean up the code or land a long-term
 * solution after the rollout. go/diff-to-historyrecord
 */
export interface TransactionDebugInfo {
}

/**
 * Information about a transcription session.
 */
export interface TranscriptionSessionInfo {
  /**
   * Transcription session's state information.
   */
  sessionStateInfo?: SessionStateInfo;
  /**
   * A unique server-generated ID for the transcription session.
   */
  transcriptionSessionId?: string;
}

/**
 * Transient generic data that will not be saved on the server.
 */
export interface TransientData {
}

export interface Trigger {
  /**
   * Each dispatcher should use an enum to for the actions that it supports. If
   * a dispatcher has only one action, this does not need to be set. (It can be
   * expanded later, defining the default behaviour as type 0.) For purposes
   * such as batching, the type of a trigger is (dispatcher, action_type).
   */
  actionType?: number;
  /**
   * Maximum possible delay in micros that can be tolerated so triggers can be
   * batched, which makes processing more efficient compared to firing triggers
   * individually. Note that the actual fire time will be somewhere in the
   * timerange interval [fire_time_us, fire_time_us + batch_time_us).
   */
  batchTimeUs?: bigint;
  /**
   * Which server should interpret action_type.
   */
  dispatcher?:  | "DISPATCHER_COPROC" | "DISPATCHER_JOBSETTED_PRIMARY" | "DISPATCHER_STRATUS" | "DISPATCHER_TASKS_SERVER" | "DISPATCHER_STUBBY_DISPATCHER" | "DISPATCHER_CS";
  /**
   * Must be set for DISPATCHER_STUBBY_DISPATCHER.
   */
  dispatchId?: number;
  /**
   * Earliest time to fire at in microseconds. The actual time that the trigger
   * will fire will be in the timerange: [fire_time_us, fire_time_us +
   * batch_time_us).
   */
  fireTimeUs?: bigint;
  /**
   * Must be set for DISPATCHER_JOBSETTED_PRIMARY.
   */
  jobsettedServerSpec?: JobsettedServerSpec;
  /**
   * The trigger key, if applicable.
   */
  key?: string;
  rpcOptions?: RpcOptions;
  /**
   * The slice_fire_time_us is automatically computed and stored as part of the
   * trigger write. It represents the exact fire time at which the trigger will
   * be queued to fire and will satisfy fire_time_us < slice_fire_time_us <=
   * fire_time_us + batch_time_us Triggers have an index row in the slice
   * trigger index with the row prefix matching this time. Note that this field
   * is internal to gmail_cp and is ignored if set by external clients when
   * adding / updating triggers.
   */
  sliceFireTimeUs?: bigint;
  /**
   * Trigger action to perform. This should always be set.
   */
  triggerAction?: TriggerAction;
  /**
   * The TriggerKey will uniquely determine a trigger within a given context. A
   * context is a single message for message triggers or a single account for
   * account triggers.
   */
  triggerKey?: TriggerKey;
}

function serializeTrigger(data: any): Trigger {
  return {
    ...data,
    batchTimeUs: data["batchTimeUs"] !== undefined ? String(data["batchTimeUs"]) : undefined,
    fireTimeUs: data["fireTimeUs"] !== undefined ? String(data["fireTimeUs"]) : undefined,
    sliceFireTimeUs: data["sliceFireTimeUs"] !== undefined ? String(data["sliceFireTimeUs"]) : undefined,
    triggerAction: data["triggerAction"] !== undefined ? serializeTriggerAction(data["triggerAction"]) : undefined,
  };
}

function deserializeTrigger(data: any): Trigger {
  return {
    ...data,
    batchTimeUs: data["batchTimeUs"] !== undefined ? BigInt(data["batchTimeUs"]) : undefined,
    fireTimeUs: data["fireTimeUs"] !== undefined ? BigInt(data["fireTimeUs"]) : undefined,
    sliceFireTimeUs: data["sliceFireTimeUs"] !== undefined ? BigInt(data["sliceFireTimeUs"]) : undefined,
    triggerAction: data["triggerAction"] !== undefined ? deserializeTriggerAction(data["triggerAction"]) : undefined,
  };
}

export interface TriggerAction {
  action?:  | "ACTION_NONE" | "ACTION_DELETE" | "ACTION_CREATE_NEW_TRIGGER" | "ACTION_MESSAGE_EXPUNGE" | "ACTION_RETENTION_POLICY_UPDATE" | "ACTION_UPDATE_ICEBOX_MODEL" | "ACTION_INVOKE_CS" | "ACTION_INVOKE_STRATUS" | "ACTION_PDH_EXPUNGE" | "ACTION_QUERY_RETENTION" | "ACTION_INVOKE_JOBSETTED_PRIMARY" | "ACTION_INVOKE_TASKS_SERVER" | "ACTION_INVOKE_PUBLISHER" | "ACTION_INVOKE_OBSERVER" | "ACTION_PUSH_HISTORY_TO_PDH" | "ACTION_INVOKE_STUBBY_DISPATCHER" | "ACTION_PDH_BACKFILL" | "ACTION_MESSAGE_UNDELETE" | "ACTION_VAULT_END_USER_ACCESS" | "ACTION_INVOKE_GROUPS" | "ACTION_ACCOUNT_INITIALIZATION" | "ACTION_INVOKE_OBSERVER_WIPEOUT" | "ACTION_SERVICE_REMOVED_MESSAGE_EXPUNGE" | "ACTION_EVERCLEAR_EXPUNGE" | "ACTION_INVOKE_SMIME_CERTIFICATE_ISSUER" | "ACTION_GROUPS_QUERY_RETENTION" | "ACTION_INVOKE_SATELLITE_BACKUP" | "ACTION_INVOKE_DEBUG_LOG" | "ACTION_PREFERENCE_CLEANUP" | "ACTION_CARIBOU_DATA_RETENTION" | "ACTION_HISTORY_CLEANUP" | "ACTION_ITEM_BULK_RELABEL" | "ACTION_INVOKE_SATELLITE_IMAGE_PROCESSING" | "ACTION_CARIBOU_DATA_RETENTION_DIFF" | "ACTION_RELEVANCY_SCORE_BACKFILL" | "ACTION_PDH_PUSH_NOTIFICATION_BACKFILL" | "ACTION_AUTO_SAVE_DRAFT_EXPUNGE";
  /**
   * Clients should use extensions on the Trigger message instead.
   */
  data?: Uint8Array;
  dataInt?: bigint;
}

function serializeTriggerAction(data: any): TriggerAction {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    dataInt: data["dataInt"] !== undefined ? String(data["dataInt"]) : undefined,
  };
}

function deserializeTriggerAction(data: any): TriggerAction {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    dataInt: data["dataInt"] !== undefined ? BigInt(data["dataInt"]) : undefined,
  };
}

/**
 * A TriggerKey (type + instance_id) uniquely identifies a trigger within a
 * message for a message-trigger and within an account for an account-trigger.
 */
export interface TriggerKey {
  /**
   * Identifier to distinguish multiple Triggers of the same type (per message
   * or per account).
   */
  instanceId?: string;
  /**
   * A non-empty string that identifies the type of Trigger. Triggers of the
   * same type may be batched together. The universe of values for the type
   * field should be finite as it is used as a stats key.
   */
  type?: string;
}

export interface Triggers {
  /**
   * A list of triggers.
   */
  triggers?: Trigger[];
}

function serializeTriggers(data: any): Triggers {
  return {
    ...data,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (serializeTrigger(item))) : undefined,
  };
}

function deserializeTriggers(data: any): Triggers {
  return {
    ...data,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (deserializeTrigger(item))) : undefined,
  };
}

/**
 * Message containing a string that is safe to use in all URL contexts in DOM
 * APIs and HTML documents; even where the referred-to resource is interpreted
 * as code, e.g., as the src of a script element.
 */
export interface TrustedResourceUrlProto {
  /**
   * IMPORTANT: Never set or read this field, even from tests, it is private.
   * See documentation at the top of .proto file for programming language
   * packages with which to create or read this message.
   */
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue?: string;
}

/**
 * Next tag: 2
 */
export interface TypeInfo {
  /**
   * Contains additional video information only if document_type is VIDEO.
   */
  videoInfo?: VideoInfo;
}

/**
 * Universal phone access contains information required to dial into a
 * conference using one of a static list of phone numbers and a universal PIN.
 * The phone number list is distributed separately.
 */
export interface UniversalPhoneAccess {
  /**
   * The PIN that users must enter after dialing a universal number. The pin
   * consists of only decimal digits and the length may vary, though it
   * generally is longer than a PhoneAccess.pin.
   */
  pin?: string;
  /**
   * This field has the same contents as the MeetingSpace.more_join_url field,
   * and is included for compatibility reasons. Clients should use the other
   * field instead. This field is deprecated and will be removed.
   */
  pstnInfoUrl?: string;
}

export interface UnmappedIdentity {
  /**
   * The resource name for an external user.
   */
  externalIdentity?: Principal;
  /**
   * The resolution status for the external identity.
   */
  resolutionStatusCode?:  | "CODE_UNSPECIFIED" | "NOT_FOUND" | "IDENTITY_SOURCE_NOT_FOUND" | "IDENTITY_SOURCE_MISCONFIGURED" | "TOO_MANY_MAPPINGS_FOUND" | "INTERNAL_ERROR";
}

export interface UnreserveItemsRequest {
  /**
   * The name of connector making this call. Format:
   * datasources/{source_id}/connectors/{ID}
   */
  connectorName?: string;
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * The name of a queue to unreserve items from.
   */
  queue?: string;
}

export interface UpdateBccRecipients {
  bccRecipients?: Recipient[];
}

export interface UpdateBody {
  /**
   * A repeated field that contains a series of content to insert into the
   * draft that the user is currently editing. The content can contain HTML
   * content or plain text content.
   */
  insertContents?: InsertContent[];
  type?:  | "UNSPECIFIED_ACTION_TYPE" | "IN_PLACE_INSERT" | "INSERT_AT_START" | "INSERT_AT_END" | "REPLACE";
}

export interface UpdateCcRecipients {
  ccRecipients?: Recipient[];
}

export interface UpdateDataSourceRequest {
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  source?: DataSource;
  /**
   * Only applies to
   * [`settings.datasources.patch`](https://developers.google.com/cloud-search/docs/reference/rest/v1/settings.datasources/patch).
   * Update mask to control which fields to update. Example field paths: `name`,
   * `displayName`. * If `update_mask` is non-empty, then only the fields
   * specified in the `update_mask` are updated. * If you specify a field in the
   * `update_mask`, but don't specify its value in the source, that field is
   * cleared. * If the `update_mask` is not present or empty or has the value
   * `*`, then all fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateDataSourceRequest(data: any): UpdateDataSourceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateDataSourceRequest(data: any): UpdateDataSourceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

export interface UpdateDraftActionMarkup {
  /**
   * If set, replaces the existing Bcc recipients of the draft the user is
   * currently editing.
   */
  updateBccRecipients?: UpdateBccRecipients;
  /**
   * A field that contains a series of update actions to perform on the draft
   * body that the user is currently editing.
   */
  updateBody?: UpdateBody;
  /**
   * If set, replaces the existing Cc recipients of the draft the user is
   * currently editing.
   */
  updateCcRecipients?: UpdateCcRecipients;
  /**
   * If set, replaces the existing subject of the draft the user is currently
   * editing.
   */
  updateSubject?: UpdateSubject;
  /**
   * If set, replaces the existing To recipients of the draft the user is
   * currently editing.
   */
  updateToRecipients?: UpdateToRecipients;
}

export interface UpdateSchemaRequest {
  /**
   * Common debug options.
   */
  debugOptions?: DebugOptions;
  /**
   * The new schema for the source.
   */
  schema?: Schema;
  /**
   * If true, the schema will be checked for validity, but will not be
   * registered with the data source, even if valid.
   */
  validateOnly?: boolean;
}

function serializeUpdateSchemaRequest(data: any): UpdateSchemaRequest {
  return {
    ...data,
    schema: data["schema"] !== undefined ? serializeSchema(data["schema"]) : undefined,
  };
}

function deserializeUpdateSchemaRequest(data: any): UpdateSchemaRequest {
  return {
    ...data,
    schema: data["schema"] !== undefined ? deserializeSchema(data["schema"]) : undefined,
  };
}

export interface UpdateSubject {
  subject?: string;
}

export interface UpdateToRecipients {
  toRecipients?: Recipient[];
}

/**
 * Represents an upload session reference. This reference is created via upload
 * method. This reference is valid for 30 days after its creation. Updating of
 * item content may refer to this uploaded content via contentDataRef.
 */
export interface UploadItemRef {
  /**
   * The name of the content reference. The maximum length is 2048 characters.
   */
  name?: string;
}

/**
 * Annotation metadata for user Upload artifacts.
 */
export interface UploadMetadata {
  /**
   * Opaque token. Clients shall simply pass it back to the Backend. There is
   * no guarantee the attachment_token returned on subsequent reads is the same
   * even if nothing has changed. This field will NOT be saved into storage.
   */
  attachmentToken?: string;
  /**
   * Information about the uploaded attachment that is only used in Backend.
   * This field will NOT be sent out of Google.
   */
  backendUploadMetadata?: AppsDynamiteSharedBackendUploadMetadata;
  /**
   * The "new" secure identifier for Drive files. Should be used instead of the
   * deprecated string drive_id field above. This should only be set if the
   * upload file has been added to Drive. Note that older Drive files that do
   * not have a ResourceKey should still use this field, with the resource_key
   * field unset.
   */
  clonedAuthorizedItemId?: AuthorizedItemId;
  /**
   * DriveAction for organizing the cloned version of this upload in Drive, if
   * the file has been added to Drive. This field is not set if the file has not
   * been added to Drive. Additionally, this field is only set when part of a
   * FileResult in a ListFilesResponse.
   */
  clonedDriveAction?:  | "DRIVE_ACTION_UNSPECIFIED" | "ADD_TO_DRIVE" | "ORGANIZE" | "ADD_SHORTCUT" | "ADD_ANOTHER_SHORTCUT";
  /**
   * Reference to a Drive ID, if this upload file has been previously cloned to
   * Drive. Note: this is deprecated in favor of the AuthorizedItemId below.
   */
  clonedDriveId?: string;
  /**
   * The original file name for the content, not the full path.
   */
  contentName?: string;
  /**
   * Type is from Scotty's best_guess by default:
   * http://google3/uploader/agent/scotty_agent.proto?l=51&rcl=140889785
   */
  contentType?: string;
  /**
   * The metrics metadata of the Data Loss Prevention attachment scan.
   */
  dlpMetricsMetadata?: AppsDynamiteSharedDlpMetricsMetadata;
  /**
   * The timestamp of the most recent virus scan completed (in microseconds).
   */
  latestVirusScanTimestamp?: bigint;
  /**
   * A copy of the LocalId in Annotation. This field is supposed to be filled
   * by server only.
   */
  localId?: string;
  /**
   * Original dimension of the content. Only set for image attachments.
   */
  originalDimension?: AppsDynamiteSharedDimension;
  /**
   * Reference to a transcoded video attachment. Only set for video
   * attachments.
   */
  videoReference?: AppsDynamiteSharedVideoReference;
  /**
   * Result for a virus scan. It's duplicated in the above field
   * apps.dynamite.shared.BackendUploadMetadata
   */
  virusScanResult?:  | "UNKNOWN_VIRUS_SCAN_RESULT" | "CLEAN" | "INFECTED" | "ERROR" | "POLICY_VIOLATION";
}

function serializeUploadMetadata(data: any): UploadMetadata {
  return {
    ...data,
    backendUploadMetadata: data["backendUploadMetadata"] !== undefined ? serializeAppsDynamiteSharedBackendUploadMetadata(data["backendUploadMetadata"]) : undefined,
    latestVirusScanTimestamp: data["latestVirusScanTimestamp"] !== undefined ? String(data["latestVirusScanTimestamp"]) : undefined,
  };
}

function deserializeUploadMetadata(data: any): UploadMetadata {
  return {
    ...data,
    backendUploadMetadata: data["backendUploadMetadata"] !== undefined ? deserializeAppsDynamiteSharedBackendUploadMetadata(data["backendUploadMetadata"]) : undefined,
    latestVirusScanTimestamp: data["latestVirusScanTimestamp"] !== undefined ? BigInt(data["latestVirusScanTimestamp"]) : undefined,
  };
}

/**
 * Annotation metadata for a Weblink. In case of pasted link it can qualify to
 * be other types in addition to being a URL - like DRIVE_DOC/DRIVE_SHEET and so
 * on. The URL metadata will also be present and it's up to the client to decide
 * which metadata to render it with. These fields are filled in using page
 * render service.
 */
export interface UrlMetadata {
  /**
   * Domain for this url. If it's an IP address the address is returned.
   */
  domain?: string;
  /**
   * The signed GWS URL.
   */
  gwsUrl?: SafeUrlProto;
  /**
   * The expiration timestamp for GWS URL, only set when gws_url is set.
   */
  gwsUrlExpirationTimestamp?: bigint;
  /**
   * Dimensions of the image: height. This field is string to match with page
   * render service response. Deprecated. Use int_image_height instead.
   */
  imageHeight?: string;
  /**
   * Representative image of the website.
   */
  imageUrl?: string;
  /**
   * Dimensions of the image: width. This field is string to match with page
   * render service response. Deprecated. Use int_image_height instead.
   */
  imageWidth?: string;
  /**
   * Dimensions of the image: height.
   */
  intImageHeight?: number;
  /**
   * Dimensions of the image: width.
   */
  intImageWidth?: number;
  /**
   * Mime type of the content (Currently mapped from Page Render Service
   * ItemType) Note that this is not necessarily the mime type of the http
   * resource. For example a text/html from youtube or vimeo may actually be
   * classified as a video type. Then we shall mark it as video/* since we don't
   * know exactly what type of video it is.
   */
  mimeType?: string;
  /**
   * The stable redirect URL pointing to frontend server.
   */
  redirectUrl?: SafeUrlProto;
  /**
   * If the UrlMetadata is missing data for rendering a chip. Deprecated. Use
   * Annotation.ChipRenderType instead.
   */
  shouldNotRender?: boolean;
  /**
   * Snippet/small description of the weblink.
   */
  snippet?: string;
  /**
   * Title of the Weblink.
   */
  title?: string;
  /**
   * The original URL.
   */
  url?: SafeUrlProto;
  urlSource?:  | "URL_SOURCE_UNKNOWN" | "SERVER_SUPPLIED_POLICY_VIOLATION" | "AUTO_DETECTED_PLAIN_TEXT" | "RICH_TEXT";
}

function serializeUrlMetadata(data: any): UrlMetadata {
  return {
    ...data,
    gwsUrlExpirationTimestamp: data["gwsUrlExpirationTimestamp"] !== undefined ? String(data["gwsUrlExpirationTimestamp"]) : undefined,
  };
}

function deserializeUrlMetadata(data: any): UrlMetadata {
  return {
    ...data,
    gwsUrlExpirationTimestamp: data["gwsUrlExpirationTimestamp"] !== undefined ? BigInt(data["gwsUrlExpirationTimestamp"]) : undefined,
  };
}

/**
 * User profile information. This user is not necessarily member of a space.
 */
export interface User {
  /**
   * URL for the avatar picture of the User in dynamite
   */
  avatarUrl?: string;
  /**
   * Information about whether the user is blocked by requester and/or has
   * blocked requester.
   */
  blockRelationship?: AppsDynamiteSharedUserBlockRelationship;
  /**
   * Bot-specific profile information. Leave it empty for human users.
   */
  botInfo?: BotInfo;
  /**
   * Deleted flag, if true, means User has been soft-deleted/purged Deprecated.
   * Use user_account_state field instead.
   */
  deleted?: boolean;
  /**
   * Email ID of the user
   */
  email?: string;
  /**
   * First or given name of the user
   */
  firstName?: string;
  /**
   * Gender of the user
   */
  gender?: string;
  /**
   * UserId
   */
  id?: UserId;
  /**
   * Set to true if none of the depending services (Gaia, PeopleApi) returns
   * any info for this user.
   */
  isAnonymous?: boolean;
  /**
   * Last or family name of the user
   */
  lastName?: string;
  /**
   * Non-unique, user-defined display name of the User
   */
  name?: string;
  /**
   * Information about whether the user is a consumer user, or the GSuite
   * customer that they belong to.
   */
  organizationInfo?: AppsDynamiteSharedOrganizationInfo;
  /**
   * Phone number(s) of the user
   */
  phoneNumber?: AppsDynamiteSharedPhoneNumber[];
  /**
   * State of user's Gaia Account
   */
  userAccountState?:  | "UNKNOWN_USER_ACCOUNT_STATE" | "ENABLED" | "DISABLED" | "DELETED" | "TEMPORARY_UNAVAILABLE";
  /**
   * Visibility of user's Profile
   */
  userProfileVisibility?:  | "UNKNOWN_USER_PROFILE_VISIBILITY" | "FULL_PROFILE" | "PRIMARY_MAIL" | "INVITEE_EMAIL" | "DELETED_USER" | "UNKNOWN_USER" | "FAILURE";
}

function serializeUser(data: any): User {
  return {
    ...data,
    botInfo: data["botInfo"] !== undefined ? serializeBotInfo(data["botInfo"]) : undefined,
    id: data["id"] !== undefined ? serializeUserId(data["id"]) : undefined,
  };
}

function deserializeUser(data: any): User {
  return {
    ...data,
    botInfo: data["botInfo"] !== undefined ? deserializeBotInfo(data["botInfo"]) : undefined,
    id: data["id"] !== undefined ? deserializeUserId(data["id"]) : undefined,
  };
}

/**
 * Resource for displaying user info
 */
export interface UserDisplayInfo {
  /**
   * The avatar to show for this user
   */
  avatarUrl?: string;
  /**
   * The name to show for this user
   */
  displayName?: string;
}

/**
 * Primary key for User resource.
 */
export interface UserId {
  /**
   * Optional. Opaque, server-assigned ID of the user profile associated with
   * App/user acting on behalf of the human user. This is currently only set
   * when a 3P application is acting on the user's behalf.
   */
  actingUserId?: string;
  /**
   * Opaque, server-assigned ID of the User.
   */
  id?: string;
  /**
   * Optional. Identifier of the App involved (directly or on behalf of a human
   * creator) in creating this message. This is not set if the user posted a
   * message directly, but is used in the case of, for example, a message being
   * generated by a 1P integration based on a user action (creating an event,
   * creating a task etc). This should only be used on the BE. For clients,
   * please use the field in the FE message proto instead
   * (google3/apps/dynamite/v1/frontend/api/message.proto?q=origin_app_id).
   */
  originAppId?: AppId;
  /**
   * Clients do not need to send UserType to Backend, but Backend will always
   * send this field to clients per the following rule: 1. For HUMAN Ids, the
   * field is empty but by default .getType() will return HUMAN. 2. For BOT Ids,
   * the field is ALWAYS set to BOT.
   */
  type?:  | "HUMAN" | "BOT";
}

function serializeUserId(data: any): UserId {
  return {
    ...data,
    originAppId: data["originAppId"] !== undefined ? serializeAppId(data["originAppId"]) : undefined,
  };
}

function deserializeUserId(data: any): UserId {
  return {
    ...data,
    originAppId: data["originAppId"] !== undefined ? deserializeAppId(data["originAppId"]) : undefined,
  };
}

/**
 * Contains info regarding the updater of an Activity Feed item. Next Id: 8
 */
export interface UserInfo {
  /**
   * Avatar url of the user who triggered the Drive Notification email. This
   * field will be populated if we can extract such information from the Drive
   * Notification email. This should only be used to fetch user avatars when
   * updater_to_show_email is not populated. This field is not set for non-Drive
   * Notification items.
   */
  driveNotificationAvatarUrl?: string;
  /**
   * Describes how updater_count_to_show should be used.
   */
  updaterCountDisplayType?:  | "UPDATER_COUNT_DISPLAY_TYPE_UNSPECIFIED" | "NO_DISPLAY_COUNT" | "EXACT_COUNT" | "NONZERO_COUNT";
  /**
   * The number of updaters for clients to show depending on
   * UpdaterCountDisplayType.
   */
  updaterCountToShow?: number;
  /**
   * The email of the updater for clients to show used for Gmail items. For
   * Drive Notifications, this is the email of the user who triggered the Drive
   * Notification email. This field will be populated if we can extract such
   * information from the Drive Notification email. This is not the actual
   * sender of the email, as the sender is always
   * comments-noreply@docs.google.com.
   */
  updaterToShowEmail?: string;
  /**
   * The gaia id of the updater for clients to show used for Gmail items. If
   * the updater is an external user, the email field below should be populated.
   */
  updaterToShowGaiaId?: bigint;
  /**
   * The display name of the updater for clients to show used for Gmail items.
   * For non-Drive Notification items, this field will always be populated. If
   * the display name cannot be found for the user, the fallback string will be
   * the email address. For Drive Notification items, this is the name of the
   * user who triggered the Drive notification email. This field will be
   * populated if we can extract such information from the Drive Notification
   * email. If the name cannot be extracted, then the email will be the fallback
   * string, which is used as the display name text in the UI when needed. This
   * is not the actual sender of the email, as the sender is always
   * comments-noreply@docs.google.com.
   */
  updaterToShowName?: string;
  /**
   * The updater for clients to show used for Dynamite Chat items.
   */
  updaterToShowUserId?: UserId;
}

function serializeUserInfo(data: any): UserInfo {
  return {
    ...data,
    updaterToShowGaiaId: data["updaterToShowGaiaId"] !== undefined ? String(data["updaterToShowGaiaId"]) : undefined,
    updaterToShowUserId: data["updaterToShowUserId"] !== undefined ? serializeUserId(data["updaterToShowUserId"]) : undefined,
  };
}

function deserializeUserInfo(data: any): UserInfo {
  return {
    ...data,
    updaterToShowGaiaId: data["updaterToShowGaiaId"] !== undefined ? BigInt(data["updaterToShowGaiaId"]) : undefined,
    updaterToShowUserId: data["updaterToShowUserId"] !== undefined ? deserializeUserId(data["updaterToShowUserId"]) : undefined,
  };
}

/**
 * Person metadata, for USER_MENTION segments. Should always contain at least
 * one of user_gaia_id, user_id, email or user. The exact set of populated
 * fields may differ depending on the context and the level in the serving
 * stack; for example, emails will be elided on the viewing path. But as a
 * general rule, a proto having any one of the four is valid, subject to the
 * standard constraints of the applied annotations -- that is, communication
 * between servers and clients will ignore jspb.ignore fields, and communication
 * between servers and other servers (or between servers and storage) will
 * ignore client_only fields. For more on the annotations, see the comments in
 * social/common/segment_annotations.proto
 */
export interface UserMentionData {
  email?: string;
  /**
   * If the principal is backed by a gaia id, DO NOT use this field. Use
   * user_gaia_id/user_id fields instead.
   */
  user?: PrincipalProto;
  /**
   * An unobfuscated gaia ID:
   */
  userGaiaId?: bigint;
  /**
   * An obfuscated gaia ID:
   */
  userId?: string;
}

function serializeUserMentionData(data: any): UserMentionData {
  return {
    ...data,
    user: data["user"] !== undefined ? serializePrincipalProto(data["user"]) : undefined,
    userGaiaId: data["userGaiaId"] !== undefined ? String(data["userGaiaId"]) : undefined,
  };
}

function deserializeUserMentionData(data: any): UserMentionData {
  return {
    ...data,
    user: data["user"] !== undefined ? deserializePrincipalProto(data["user"]) : undefined,
    userGaiaId: data["userGaiaId"] !== undefined ? BigInt(data["userGaiaId"]) : undefined,
  };
}

/**
 * Annotation metadata for user mentions (+/@/-).
 */
export interface UserMentionMetadata {
  /**
   * Display name of the mentioned user. This field should remain empty when
   * clients resolve a UserMention annotation. It will be filled in when a
   * UserMention is generated by the Integration Server.
   */
  displayName?: string;
  /**
   * Gender of the mentioned user. One of "female", "male" or "other". Used for
   * choosing accurate translations for strings that contain the UserMention,
   * when these need to be constructed (e.g. task assignment update message).
   * This field should remain empty when clients resolve a UserMention. It will
   * be filled in when a UserMention is generated by the Integration Server.
   */
  gender?: string;
  /**
   * To be deprecated. Use invitee_info field instead. ID of the User
   * mentioned. This field should remain empty when type == MENTION_ALL.
   */
  id?: UserId;
  /**
   * Invitee UserId and email used when mentioned. This field should remain
   * empty when type == MENTION_ALL. Invitee_info.email is only used when a user
   * is @-mentioned with an email address, and it will be empty when clients get
   * messages from Backend.
   */
  inviteeInfo?: InviteeInfo;
  type?:  | "TYPE_UNSPECIFIED" | "INVITE" | "UNINVITE" | "MENTION" | "MENTION_ALL" | "FAILED_TO_ADD";
  /**
   * Specific reason for the user mention failing, for fine-grained processing
   * by clients (i.e. specific error message for space limit exceeded case)
   * IMPORTANT: Set this only for FAILED_TO_ADD case.
   */
  userMentionError?:  | "USER_MENTION_ERROR_UNSPECIFIED" | "MEMBERSHIP_LIMIT_EXCEEDED";
}

function serializeUserMentionMetadata(data: any): UserMentionMetadata {
  return {
    ...data,
    id: data["id"] !== undefined ? serializeUserId(data["id"]) : undefined,
    inviteeInfo: data["inviteeInfo"] !== undefined ? serializeInviteeInfo(data["inviteeInfo"]) : undefined,
  };
}

function deserializeUserMentionMetadata(data: any): UserMentionMetadata {
  return {
    ...data,
    id: data["id"] !== undefined ? deserializeUserId(data["id"]) : undefined,
    inviteeInfo: data["inviteeInfo"] !== undefined ? deserializeInviteeInfo(data["inviteeInfo"]) : undefined,
  };
}

/**
 * Definition of a single value with generic type.
 */
export interface Value {
  booleanValue?: boolean;
  dateValue?: Date;
  doubleValue?: number;
  integerValue?: bigint;
  stringValue?: string;
  timestampValue?: Date;
}

function serializeValue(data: any): Value {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? String(data["integerValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeValue(data: any): Value {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? BigInt(data["integerValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
  };
}

export interface ValueFilter {
  /**
   * The `operator_name` applied to the query, such as *price_greater_than*.
   * The filter can work against both types of filters defined in the schema for
   * your data source: 1. `operator_name`, where the query filters results by
   * the property that matches the value. 2. `greater_than_operator_name` or
   * `less_than_operator_name` in your schema. The query filters the results for
   * the property values that are greater than or less than the supplied value
   * in the query.
   */
  operatorName?: string;
  /**
   * The value to be compared with.
   */
  value?: Value;
}

function serializeValueFilter(data: any): ValueFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeValue(data["value"]) : undefined,
  };
}

function deserializeValueFilter(data: any): ValueFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeValue(data["value"]) : undefined,
  };
}

export interface VideoCallMetadata {
  /**
   * Thor meeting space.
   */
  meetingSpace?: MeetingSpace;
  /**
   * If this field is set to true, server should still contact external
   * backends to get metadata for search but clients should not render this
   * chip.
   */
  shouldNotRender?: boolean;
  /**
   * Whether this meeting space was created via Dynamite in this Dynamite
   * group.
   */
  wasCreatedInCurrentGroup?: boolean;
}

function serializeVideoCallMetadata(data: any): VideoCallMetadata {
  return {
    ...data,
    meetingSpace: data["meetingSpace"] !== undefined ? serializeMeetingSpace(data["meetingSpace"]) : undefined,
  };
}

function deserializeVideoCallMetadata(data: any): VideoCallMetadata {
  return {
    ...data,
    meetingSpace: data["meetingSpace"] !== undefined ? deserializeMeetingSpace(data["meetingSpace"]) : undefined,
  };
}

/**
 * Next tag: 2
 */
export interface VideoInfo {
  /**
   * Duration of the video in milliseconds. This field can be absent for
   * recently uploaded video or inaccurate sometimes.
   */
  duration?: number;
}

/**
 * Represents both long and short phone number that can be called or texted.
 * Short telephone numbers are used to reach local services. Short numbers and
 * their purpose differ from country to country. These numbers in US are in the
 * form of N11 which is a three-digit abbreviated dialing telephone number.
 */
export interface VoicePhoneNumber {
  /**
   * E.164 formatted full phone number with leading +. This field also
   * represents encoded form of short telephone numbers in E.164 format. e.g.
   * "911" is encoded as "+1911".
   */
  e164?: string;
  /**
   * Additional data that could be added using the libphonenumber API.
   */
  i18nData?: VoicePhoneNumberI18nData;
}

export interface VoicePhoneNumberI18nData {
  /**
   * The country calling code for this number, as defined by the ITU. For
   * example, this would be 1 for NANPA countries, and 33 for France (for more
   * info see i18n.phonenumbers.PhoneNumber.country_code).
   */
  countryCode?: number;
  /**
   * Display number formatted using the INTERNATIONAL format.
   */
  internationalNumber?: string;
  /**
   * When present, indicates the number is valid according to the
   * libphonenumber's isValidNumber API (see
   * https://code.google.com/p/libphonenumber/).
   */
  isValid?: boolean;
  /**
   * Display number formatted using the NATIONAL format.
   */
  nationalNumber?: string;
  /**
   * A region (country, territory, continent, etc), as defined by Unicode's
   * "CLDR", itself based on ISO 3166 (UN country codes). For details, see
   * https://www.corp.google.com/~engdocs/java/com/google/i18n/identifiers/RegionCode.html
   */
  regionCode?: string;
  /**
   * When set to a non-default value, indicates the validation reason that is
   * set when phone number is invalid (is_valid is false).
   */
  validationResult?:  | "UNKNOWN" | "IS_POSSIBLE" | "INVALID_COUNTRY_CODE" | "TOO_SHORT" | "TOO_LONG" | "IS_POSSIBLE_LOCAL_ONLY" | "INVALID_LENGTH";
}

export interface VPCSettings {
  /**
   * The resource name of the GCP Project to be used for VPC SC policy check.
   * VPC security settings on this project will be honored for Cloud Search APIs
   * after project_name has been updated through CustomerService. Format:
   * projects/{project_id}
   */
  project?: string;
}

/**
 * Information on a whiteboard attached to an active conference. A whiteboard
 * is a Jam document.
 */
export interface WhiteboardInfo {
  /**
   * The Cosmo Id of the whiteboard document (Jam).
   */
  id?: string;
  /**
   * Title of the whiteboard document.
   */
  title?: string;
  /**
   * The uri for whiteboard document.
   */
  uri?: string;
}

export interface WidgetMarkup {
  /**
   * buttons is also oneof data and only one of these fields should be set.
   */
  buttons?: Button[];
  dateTimePicker?: DateTimePicker;
  divider?: Divider;
  grid?: Grid;
  /**
   * The horizontal alignment of this widget.
   */
  horizontalAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "START" | "CENTER" | "END";
  image?: Image;
  imageKeyValue?: ImageKeyValue;
  keyValue?: KeyValue;
  /**
   * Input Widgets
   */
  menu?: Menu;
  selectionControl?: SelectionControl;
  textField?: TextField;
  textKeyValue?: TextKeyValue;
  /**
   * Read-only Widgets
   */
  textParagraph?: TextParagraph;
}

function serializeWidgetMarkup(data: any): WidgetMarkup {
  return {
    ...data,
    dateTimePicker: data["dateTimePicker"] !== undefined ? serializeDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

function deserializeWidgetMarkup(data: any): WidgetMarkup {
  return {
    ...data,
    dateTimePicker: data["dateTimePicker"] !== undefined ? deserializeDateTimePicker(data["dateTimePicker"]) : undefined,
  };
}

/**
 * Message delete history record extension that exports
 * /wonder/message_mapping/{vertical} attribute of deleted messages which have
 * any smartmail label (eg. ^cob_sm_invoice). go/how-dd-card-deletion
 */
export interface WonderCardDelete {
  /**
   * Contains <{@code WonderCardType} enum value, value of
   * /wonder/message_mapping/{vertical} attribute of deleted message> pairs.
   */
  messageMappings?: {
    [key: string]: WonderMessageMapping
  };
  /**
   * Message ID of the original deleted message
   */
  msgId?: bigint;
}

function serializeWonderCardDelete(data: any): WonderCardDelete {
  return {
    ...data,
    msgId: data["msgId"] !== undefined ? String(data["msgId"]) : undefined,
  };
}

function deserializeWonderCardDelete(data: any): WonderCardDelete {
  return {
    ...data,
    msgId: data["msgId"] !== undefined ? BigInt(data["msgId"]) : undefined,
  };
}

/**
 * Card mapping attached to original message as an attribute stored at
 * /wonder/message_mapping/{vertical} Next ID: 2
 */
export interface WonderMessageMapping {
  /**
   * List of wonder card (client-generated) message IDs generated based on the
   * original message.
   */
  wonderCardMessageId?: string[];
}

/**
 * A wrapper around a raw resource key. The secret should never be logged, and
 * this proto annotates those secret fields to ensure that they are not. Clients
 * are encouraged to use this proto rather than defining their own, to ensure
 * that secrets are correctly annotated.
 */
export interface WrappedResourceKey {
  /**
   * Resource key of the Drive item. This field should be unset if, depending
   * on the context, the item does not have a resource key, or if none was
   * specified. This must never be logged.
   */
  resourceKey?: string;
}

/**
 * Information about a YouTube broadcast session.
 */
export interface YouTubeBroadcastSessionInfo {
  /**
   * Current broadcast session's statistics.
   */
  broadcastStats?: YouTubeBroadcastStats;
  /**
   * YouTube broadcast session's state information.
   */
  sessionStateInfo?: SessionStateInfo;
  /**
   * A unique server-generated ID for the broadcast session.
   */
  youTubeBroadcastSessionId?: string;
  /**
   * The YouTube Live broadcast event that is being streamed to.
   */
  youTubeLiveBroadcastEvent?: YouTubeLiveBroadcastEvent;
}

function serializeYouTubeBroadcastSessionInfo(data: any): YouTubeBroadcastSessionInfo {
  return {
    ...data,
    broadcastStats: data["broadcastStats"] !== undefined ? serializeYouTubeBroadcastStats(data["broadcastStats"]) : undefined,
  };
}

function deserializeYouTubeBroadcastSessionInfo(data: any): YouTubeBroadcastSessionInfo {
  return {
    ...data,
    broadcastStats: data["broadcastStats"] !== undefined ? deserializeYouTubeBroadcastStats(data["broadcastStats"]) : undefined,
  };
}

/**
 * Statistics of the YouTube broadcast session.
 */
export interface YouTubeBroadcastStats {
  /**
   * Estimated concurrent viewer count.
   */
  estimatedViewerCount?: bigint;
}

function serializeYouTubeBroadcastStats(data: any): YouTubeBroadcastStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? String(data["estimatedViewerCount"]) : undefined,
  };
}

function deserializeYouTubeBroadcastStats(data: any): YouTubeBroadcastStats {
  return {
    ...data,
    estimatedViewerCount: data["estimatedViewerCount"] !== undefined ? BigInt(data["estimatedViewerCount"]) : undefined,
  };
}

/**
 * Information about the broadcast to YouTube.
 */
export interface YouTubeLiveBroadcastEvent {
  /**
   * Input only. If the channel_id is for a YouTube Channel owned by a Brand
   * Account, client is required to populate this field with the obfuscated gaia
   * id of the Brand account when starting the broadcast.
   */
  brandAccountGaiaId?: string;
  /**
   * Input only. The broadcast id, used to control the lifecycle of the event
   * on YouTube
   */
  broadcastId?: string;
  /**
   * YouTube Channel associated with the broadcast.
   */
  channelId?: string;
  /**
   * Output only. A URL that can be used to watch the meeting broadcast. Will
   * be populated by the backend.
   */
  readonly viewUrl?: string;
}

/**
 * Annotation metadata for YouTube artifact.
 */
export interface YoutubeMetadata {
  /**
   * YouTube resource ID of the artifact.
   */
  id?: string;
  /**
   * If this field is set to true, server should still contact external
   * backends to get metadata for search but clients should not render this
   * chip.
   */
  shouldNotRender?: boolean;
  /**
   * YouTube query parameter for timestamp. YouTube specific flag that allows
   * users to embed time token when sharing a link. This property contains
   * parsed time token in seconds.
   */
  startTime?: number;
}

export interface YoutubeUserProto {
  youtubeUserId?: bigint;
}

function serializeYoutubeUserProto(data: any): YoutubeUserProto {
  return {
    ...data,
    youtubeUserId: data["youtubeUserId"] !== undefined ? String(data["youtubeUserId"]) : undefined,
  };
}

function deserializeYoutubeUserProto(data: any): YoutubeUserProto {
  return {
    ...data,
    youtubeUserId: data["youtubeUserId"] !== undefined ? BigInt(data["youtubeUserId"]) : undefined,
  };
}

/**
 * See go/zwieback. New uses of Zwieback sessions must be approved via
 * go/zwieback-request.
 */
export interface ZwiebackSessionProto {
  zwiebackSessionId?: bigint;
}

function serializeZwiebackSessionProto(data: any): ZwiebackSessionProto {
  return {
    ...data,
    zwiebackSessionId: data["zwiebackSessionId"] !== undefined ? String(data["zwiebackSessionId"]) : undefined,
  };
}

function deserializeZwiebackSessionProto(data: any): ZwiebackSessionProto {
  return {
    ...data,
    zwiebackSessionId: data["zwiebackSessionId"] !== undefined ? BigInt(data["zwiebackSessionId"]) : undefined,
  };
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