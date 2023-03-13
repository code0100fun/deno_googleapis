// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Discovery Engine API Client for Deno
 * ====================================
 * 
 * Discovery Engine API.
 * 
 * Docs: https://cloud.google.com/discovery-engine/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Discovery Engine API.
 */
export class DiscoveryEngine {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://discoveryengine.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a Document.
   *
   * @param parent Required. The parent resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsCreate(parent: string, req: GoogleCloudDiscoveryengineV1betaDocument, opts: ProjectsLocationsCollectionsDataStoresBranchesDocumentsCreateOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents`);
    if (opts.documentId !== undefined) {
      url.searchParams.append("documentId", String(opts.documentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Deletes a Document.
   *
   * @param name Required. Full resource name of Document, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document}`. If the caller does not have permission to delete the Document, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the Document to delete does not exist, a NOT_FOUND error is returned.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a Document.
   *
   * @param name Required. Full resource name of Document, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document}`. If the caller does not have permission to access the Document, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the requested Document does not exist, a NOT_FOUND error is returned.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsGet(name: string): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Bulk import of multiple Documents. Request processing may be synchronous.
   * Non-existing items will be created. Note: It is possible for a subset of
   * the Documents to be successfully updated.
   *
   * @param parent Required. The parent branch resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`. Requires create/update permission.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsImport(parent: string, req: GoogleCloudDiscoveryengineV1betaImportDocumentsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of Documents.
   *
   * @param parent Required. The parent branch resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`. Use `default_branch` as the branch ID, to list documents under the default branch. If the caller does not have permission to list Documentss under this branch, regardless of whether or not this branch exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsList(parent: string, opts: ProjectsLocationsCollectionsDataStoresBranchesDocumentsListOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaListDocumentsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents`);
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
    return data as GoogleCloudDiscoveryengineV1betaListDocumentsResponse;
  }

  /**
   * Updates a Document.
   *
   * @param name Immutable. The full resource name of the document. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.
   */
  async projectsLocationsCollectionsDataStoresBranchesDocumentsPatch(name: string, req: GoogleCloudDiscoveryengineV1betaDocument, opts: ProjectsLocationsCollectionsDataStoresBranchesDocumentsPatchOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCollectionsDataStoresBranchesOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsCollectionsDataStoresBranchesOperationsList(name: string, opts: ProjectsLocationsCollectionsDataStoresBranchesOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCollectionsDataStoresModelsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsCollectionsDataStoresModelsOperationsList(name: string, opts: ProjectsLocationsCollectionsDataStoresModelsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCollectionsDataStoresOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsCollectionsDataStoresOperationsList(name: string, opts: ProjectsLocationsCollectionsDataStoresOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Makes a recommendation, which requires a contextual user event.
   *
   * @param servingConfig Required. Full resource name of the format: projects/*\/locations/global/collections/*\/dataStores/*\/servingConfigs/* Before you can request recommendations from your model, you must create at least one serving config for it.
   */
  async projectsLocationsCollectionsDataStoresServingConfigsRecommend(servingConfig: string, req: GoogleCloudDiscoveryengineV1betaRecommendRequest): Promise<GoogleCloudDiscoveryengineV1betaRecommendResponse> {
    req = serializeGoogleCloudDiscoveryengineV1betaRecommendRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ servingConfig }:recommend`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaRecommendResponse;
  }

  /**
   * Writes a single user event from the browser. This uses a GET request to
   * due to browser restriction of POST-ing to a 3rd party domain. This method
   * is used only by the Discovery Engine API JavaScript pixel and Google Tag
   * Manager. Users should not call this method directly.
   *
   * @param parent Required. The parent DataStore resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`.
   */
  async projectsLocationsCollectionsDataStoresUserEventsCollect(parent: string, opts: ProjectsLocationsCollectionsDataStoresUserEventsCollectOptions = {}): Promise<GoogleApiHttpBody> {
    opts = serializeProjectsLocationsCollectionsDataStoresUserEventsCollectOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:collect`);
    if (opts.ets !== undefined) {
      url.searchParams.append("ets", String(opts.ets));
    }
    if (opts.uri !== undefined) {
      url.searchParams.append("uri", String(opts.uri));
    }
    if (opts.userEvent !== undefined) {
      url.searchParams.append("userEvent", String(opts.userEvent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Bulk import of User events. Request processing might be synchronous.
   * Events that already exist are skipped. Use this method for backfilling
   * historical user events. Operation.response is of type ImportResponse. Note
   * that it is possible for a subset of the items to be successfully inserted.
   * Operation.metadata is of type ImportMetadata.
   *
   * @param parent Required. Parent DataStore resource name, of the form `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`
   */
  async projectsLocationsCollectionsDataStoresUserEventsImport(parent: string, req: GoogleCloudDiscoveryengineV1betaImportUserEventsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Writes a single user event.
   *
   * @param parent Required. The parent DataStore resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`.
   */
  async projectsLocationsCollectionsDataStoresUserEventsWrite(parent: string, req: GoogleCloudDiscoveryengineV1betaUserEvent): Promise<GoogleCloudDiscoveryengineV1betaUserEvent> {
    req = serializeGoogleCloudDiscoveryengineV1betaUserEvent(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:write`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDiscoveryengineV1betaUserEvent(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCollectionsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsCollectionsOperationsList(name: string, opts: ProjectsLocationsCollectionsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Creates a Document.
   *
   * @param parent Required. The parent resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`.
   */
  async projectsLocationsDataStoresBranchesDocumentsCreate(parent: string, req: GoogleCloudDiscoveryengineV1betaDocument, opts: ProjectsLocationsDataStoresBranchesDocumentsCreateOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents`);
    if (opts.documentId !== undefined) {
      url.searchParams.append("documentId", String(opts.documentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Deletes a Document.
   *
   * @param name Required. Full resource name of Document, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document}`. If the caller does not have permission to delete the Document, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the Document to delete does not exist, a NOT_FOUND error is returned.
   */
  async projectsLocationsDataStoresBranchesDocumentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a Document.
   *
   * @param name Required. Full resource name of Document, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document}`. If the caller does not have permission to access the Document, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the requested Document does not exist, a NOT_FOUND error is returned.
   */
  async projectsLocationsDataStoresBranchesDocumentsGet(name: string): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Bulk import of multiple Documents. Request processing may be synchronous.
   * Non-existing items will be created. Note: It is possible for a subset of
   * the Documents to be successfully updated.
   *
   * @param parent Required. The parent branch resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`. Requires create/update permission.
   */
  async projectsLocationsDataStoresBranchesDocumentsImport(parent: string, req: GoogleCloudDiscoveryengineV1betaImportDocumentsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of Documents.
   *
   * @param parent Required. The parent branch resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}`. Use `default_branch` as the branch ID, to list documents under the default branch. If the caller does not have permission to list Documentss under this branch, regardless of whether or not this branch exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsDataStoresBranchesDocumentsList(parent: string, opts: ProjectsLocationsDataStoresBranchesDocumentsListOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaListDocumentsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/documents`);
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
    return data as GoogleCloudDiscoveryengineV1betaListDocumentsResponse;
  }

  /**
   * Updates a Document.
   *
   * @param name Immutable. The full resource name of the document. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document_id}`. This field must be a UTF-8 encoded string with a length limit of 1024 characters.
   */
  async projectsLocationsDataStoresBranchesDocumentsPatch(name: string, req: GoogleCloudDiscoveryengineV1betaDocument, opts: ProjectsLocationsDataStoresBranchesDocumentsPatchOptions = {}): Promise<GoogleCloudDiscoveryengineV1betaDocument> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaDocument;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsDataStoresBranchesOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsDataStoresBranchesOperationsList(name: string, opts: ProjectsLocationsDataStoresBranchesOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsDataStoresModelsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsDataStoresModelsOperationsList(name: string, opts: ProjectsLocationsDataStoresModelsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsDataStoresOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsDataStoresOperationsList(name: string, opts: ProjectsLocationsDataStoresOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Makes a recommendation, which requires a contextual user event.
   *
   * @param servingConfig Required. Full resource name of the format: projects/*\/locations/global/collections/*\/dataStores/*\/servingConfigs/* Before you can request recommendations from your model, you must create at least one serving config for it.
   */
  async projectsLocationsDataStoresServingConfigsRecommend(servingConfig: string, req: GoogleCloudDiscoveryengineV1betaRecommendRequest): Promise<GoogleCloudDiscoveryengineV1betaRecommendResponse> {
    req = serializeGoogleCloudDiscoveryengineV1betaRecommendRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ servingConfig }:recommend`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDiscoveryengineV1betaRecommendResponse;
  }

  /**
   * Writes a single user event from the browser. This uses a GET request to
   * due to browser restriction of POST-ing to a 3rd party domain. This method
   * is used only by the Discovery Engine API JavaScript pixel and Google Tag
   * Manager. Users should not call this method directly.
   *
   * @param parent Required. The parent DataStore resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`.
   */
  async projectsLocationsDataStoresUserEventsCollect(parent: string, opts: ProjectsLocationsDataStoresUserEventsCollectOptions = {}): Promise<GoogleApiHttpBody> {
    opts = serializeProjectsLocationsDataStoresUserEventsCollectOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:collect`);
    if (opts.ets !== undefined) {
      url.searchParams.append("ets", String(opts.ets));
    }
    if (opts.uri !== undefined) {
      url.searchParams.append("uri", String(opts.uri));
    }
    if (opts.userEvent !== undefined) {
      url.searchParams.append("userEvent", String(opts.userEvent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Bulk import of User events. Request processing might be synchronous.
   * Events that already exist are skipped. Use this method for backfilling
   * historical user events. Operation.response is of type ImportResponse. Note
   * that it is possible for a subset of the items to be successfully inserted.
   * Operation.metadata is of type ImportMetadata.
   *
   * @param parent Required. Parent DataStore resource name, of the form `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`
   */
  async projectsLocationsDataStoresUserEventsImport(parent: string, req: GoogleCloudDiscoveryengineV1betaImportUserEventsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Writes a single user event.
   *
   * @param parent Required. The parent DataStore resource name, such as `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}`.
   */
  async projectsLocationsDataStoresUserEventsWrite(parent: string, req: GoogleCloudDiscoveryengineV1betaUserEvent): Promise<GoogleCloudDiscoveryengineV1betaUserEvent> {
    req = serializeGoogleCloudDiscoveryengineV1betaUserEvent(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/userEvents:write`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDiscoveryengineV1betaUserEvent(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
export interface GoogleApiHttpBody {
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

function serializeGoogleApiHttpBody(data: any): GoogleApiHttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleApiHttpBody(data: any): GoogleApiHttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * A description of the context in which an error occurred.
 */
export interface GoogleCloudDiscoveryengineLoggingErrorContext {
  /**
   * The HTTP request which was processed when the error was triggered.
   */
  httpRequest?: GoogleCloudDiscoveryengineLoggingHttpRequestContext;
  /**
   * The location in the source code where the decision was made to report the
   * error, usually the place where it was logged.
   */
  reportLocation?: GoogleCloudDiscoveryengineLoggingSourceLocation;
}

/**
 * An error log which is reported to the Error Reporting system.
 */
export interface GoogleCloudDiscoveryengineLoggingErrorLog {
  /**
   * A description of the context in which the error occurred.
   */
  context?: GoogleCloudDiscoveryengineLoggingErrorContext;
  /**
   * The error payload that is populated on LRO import APIs.
   */
  importPayload?: GoogleCloudDiscoveryengineLoggingImportErrorContext;
  /**
   * A message describing the error.
   */
  message?: string;
  /**
   * The service context in which this error has occurred.
   */
  serviceContext?: GoogleCloudDiscoveryengineLoggingServiceContext;
  /**
   * The RPC status associated with the error log.
   */
  status?: GoogleRpcStatus;
}

/**
 * HTTP request data that is related to a reported error.
 */
export interface GoogleCloudDiscoveryengineLoggingHttpRequestContext {
  /**
   * The HTTP response status code for the request.
   */
  responseStatusCode?: number;
}

/**
 * The error payload that is populated on LRO import APIs, including the
 * following: *
 * `google.cloud.discoveryengine.v1alpha.DocumentService.ImportDocuments` *
 * `google.cloud.discoveryengine.v1alpha.UserEventService.ImportUserEvents`
 */
export interface GoogleCloudDiscoveryengineLoggingImportErrorContext {
  /**
   * The detailed content which caused the error on importing a document.
   */
  document?: string;
  /**
   * Google Cloud Storage file path of the import source. Can be set for batch
   * operation error.
   */
  gcsPath?: string;
  /**
   * Line number of the content in file. Should be empty for permission or
   * batch operation error.
   */
  lineNumber?: string;
  /**
   * The operation resource name of the LRO.
   */
  operation?: string;
  /**
   * The detailed content which caused the error on importing a user event.
   */
  userEvent?: string;
}

/**
 * Describes a running service that sends errors.
 */
export interface GoogleCloudDiscoveryengineLoggingServiceContext {
  /**
   * An identifier of the service—for example,
   * `discoveryengine.googleapis.com`.
   */
  service?: string;
}

/**
 * Indicates a location in the source code of the service for which errors are
 * reported.
 */
export interface GoogleCloudDiscoveryengineLoggingSourceLocation {
  /**
   * Human-readable name of a function or method—for example,
   * `google.cloud.discoveryengine.v1alpha.RecommendationService.Recommend`.
   */
  functionName?: string;
}

/**
 * Defines circumstances to be checked before allowing a behavior
 */
export interface GoogleCloudDiscoveryengineV1alphaCondition {
  /**
   * Optional. Range of time(s) specifying when condition is active. Maximum of
   * 10 time ranges.
   */
  activeTimeRange?: GoogleCloudDiscoveryengineV1alphaConditionTimeRange[];
  /**
   * Optional. Search only A list of terms to match the query on. Maximum of 10
   * query terms.
   */
  queryTerms?: GoogleCloudDiscoveryengineV1alphaConditionQueryTerm[];
}

function serializeGoogleCloudDiscoveryengineV1alphaCondition(data: any): GoogleCloudDiscoveryengineV1alphaCondition {
  return {
    ...data,
    activeTimeRange: data["activeTimeRange"] !== undefined ? data["activeTimeRange"].map((item: any) => (serializeGoogleCloudDiscoveryengineV1alphaConditionTimeRange(item))) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaCondition(data: any): GoogleCloudDiscoveryengineV1alphaCondition {
  return {
    ...data,
    activeTimeRange: data["activeTimeRange"] !== undefined ? data["activeTimeRange"].map((item: any) => (deserializeGoogleCloudDiscoveryengineV1alphaConditionTimeRange(item))) : undefined,
  };
}

/**
 * Matcher for search request query
 */
export interface GoogleCloudDiscoveryengineV1alphaConditionQueryTerm {
  /**
   * Whether the search query needs to exactly match the query term.
   */
  fullMatch?: boolean;
  /**
   * The specific query value to match against Must be lowercase, must be
   * UTF-8. Can have at most 3 space separated terms if full_match is true.
   * Cannot be an empty string. Maximum length of 5000 characters.
   */
  value?: string;
}

/**
 * Used for time-dependent conditions.
 */
export interface GoogleCloudDiscoveryengineV1alphaConditionTimeRange {
  /**
   * End of time range. Range is inclusive. Must be in the future.
   */
  endTime?: Date;
  /**
   * Start of time range. Range is inclusive.
   */
  startTime?: Date;
}

function serializeGoogleCloudDiscoveryengineV1alphaConditionTimeRange(data: any): GoogleCloudDiscoveryengineV1alphaConditionTimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaConditionTimeRange(data: any): GoogleCloudDiscoveryengineV1alphaConditionTimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Defines a conditioned behavior to employ during serving. Must be attached to
 * a [ServingConfig] to be considered at serving time. Permitted actions
 * dependent on Solution Type.
 */
export interface GoogleCloudDiscoveryengineV1alphaControl {
  /**
   * Output only. List of all [ServingConfig] ids this control is attached to.
   * May take up to 10 minutes to update after changes.
   */
  readonly associatedServingConfigIds?: string[];
  /**
   * Defines a boost-type control
   */
  boostAction?: GoogleCloudDiscoveryengineV1alphaControlBoostAction;
  /**
   * Determines when the associated action will trigger. Omit to always apply
   * the action. Currently only a single condition may be specified. Otherwise
   * an INVALID ARGUMENT error is thrown.
   */
  conditions?: GoogleCloudDiscoveryengineV1alphaCondition[];
  /**
   * Required. Human readable name. The identifier used in UI views. Must be
   * UTF-8 encoded string. Length limit is 128 characters. Otherwise an INVALID
   * ARGUMENT error is thrown.
   */
  displayName?: string;
  /**
   * Defines a filter-type control Currently not supported by Recommendation
   */
  filterAction?: GoogleCloudDiscoveryengineV1alphaControlFilterAction;
  /**
   * Immutable. Fully qualified name
   * `projects/*\/locations/global/dataStore/*\/controls/*`
   */
  name?: string;
  /**
   * Required. What solution the control belongs to. Must be compatible with
   * vertical of resource. Otherwise an INVALID ARGUMENT error is thrown.
   */
  solutionType?:  | "SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH";
  /**
   * Specifies the use case for the control. Affects what condition fields can
   * be set. Only applies to SOLUTION_TYPE_SEARCH. Currently only allow one use
   * case per control. Must be set when solution_type is
   * SolutionType.SOLUTION_TYPE_SEARCH.
   */
  useCases?:  | "SEARCH_USE_CASE_UNSPECIFIED" | "SEARCH_USE_CASE_SEARCH" | "SEARCH_USE_CASE_BROWSE"[];
}

function serializeGoogleCloudDiscoveryengineV1alphaControl(data: any): GoogleCloudDiscoveryengineV1alphaControl {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (serializeGoogleCloudDiscoveryengineV1alphaCondition(item))) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaControl(data: any): GoogleCloudDiscoveryengineV1alphaControl {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGoogleCloudDiscoveryengineV1alphaCondition(item))) : undefined,
  };
}

/**
 * Adjusts order of products in returned list.
 */
export interface GoogleCloudDiscoveryengineV1alphaControlBoostAction {
  /**
   * Required. Strength of the boost, which should be in [-1, 1]. Negative
   * boost means demotion. Default is 0.0 (No-op).
   */
  boost?: number;
  /**
   * Required. Specifies which products to apply the boost to. If no filter is
   * provided all products will be boosted (No-op). Syntax documentation:
   * https://cloud.google.com/retail/docs/filter-and-order Maximum length is
   * 5000 characters. Otherwise an INVALID ARGUMENT error is thrown.
   */
  filter?: string;
}

/**
 * Specified which products may be included in results. Uses same filter as
 * boost.
 */
export interface GoogleCloudDiscoveryengineV1alphaControlFilterAction {
  /**
   * Required. A filter to apply on the matching condition results. Required
   * Syntax documentation: https://cloud.google.com/retail/docs/filter-and-order
   * Maximum length is 5000 characters. Otherwise an INVALID ARGUMENT error is
   * thrown.
   */
  filter?: string;
}

/**
 * Metadata related to the progress of the ImportDocuments operation. This will
 * be returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudDiscoveryengineV1alphaImportDocumentsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDiscoveryengineV1alphaImportDocumentsMetadata(data: any): GoogleCloudDiscoveryengineV1alphaImportDocumentsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaImportDocumentsMetadata(data: any): GoogleCloudDiscoveryengineV1alphaImportDocumentsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ImportDocumentsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudDiscoveryengineV1alphaImportDocumentsResponse {
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1alphaImportErrorConfig;
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudDiscoveryengineV1alphaImportErrorConfig {
  /**
   * Cloud Storage prefix for import errors. This must be an empty, existing
   * Cloud Storage directory. Import errors will be written to sharded files in
   * this directory, one per line, as a JSON-encoded `google.rpc.Status`
   * message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudDiscoveryengineV1alphaImportUserEventsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDiscoveryengineV1alphaImportUserEventsMetadata(data: any): GoogleCloudDiscoveryengineV1alphaImportUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaImportUserEventsMetadata(data: any): GoogleCloudDiscoveryengineV1alphaImportUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudDiscoveryengineV1alphaImportUserEventsResponse {
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1alphaImportErrorConfig;
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Count of user events imported with complete existing Documents.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with Document information not found in
   * the existing Branch.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudDiscoveryengineV1alphaImportUserEventsResponse(data: any): GoogleCloudDiscoveryengineV1alphaImportUserEventsResponse {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1alphaImportUserEventsResponse(data: any): GoogleCloudDiscoveryengineV1alphaImportUserEventsResponse {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * BigQuery source import data from.
 */
export interface GoogleCloudDiscoveryengineV1betaBigQuerySource {
  /**
   * The schema to use when parsing the data from the source. Supported values
   * for imports: * `user_event` (default): One JSON UserEvent per line. *
   * `document` (default): One JSON Document per line. Each document must have a
   * valid document.id.
   */
  dataSchema?: string;
  /**
   * Required. The BigQuery data set to copy the data from with a length limit
   * of 1,024 characters.
   */
  datasetId?: string;
  /**
   * Intermediate Cloud Storage directory used for the import with a length
   * limit of 2,000 characters. Can be specified if one wants to have the
   * BigQuery export to a specific Cloud Storage directory.
   */
  gcsStagingDir?: string;
  /**
   * BigQuery time partitioned table's _PARTITIONDATE in YYYY-MM-DD format.
   */
  partitionDate?: GoogleTypeDate;
  /**
   * The project ID (can be project # or ID) that the BigQuery source is in
   * with a length limit of 128 characters. If not specified, inherits the
   * project ID from the parent request.
   */
  projectId?: string;
  /**
   * Required. The BigQuery table to copy the data from with a length limit of
   * 1,024 characters.
   */
  tableId?: string;
}

/**
 * Detailed completion information including completion attribution token and
 * clicked completion info.
 */
export interface GoogleCloudDiscoveryengineV1betaCompletionInfo {
  /**
   * End user selected CompleteQueryResponse.CompletionResult.suggestion
   * position, starting from 0.
   */
  selectedPosition?: number;
  /**
   * End user selected CompleteQueryResponse.CompletionResult.suggestion.
   */
  selectedSuggestion?: string;
}

/**
 * A custom attribute that is not explicitly modeled in a resource, e.g.
 * UserEvent.
 */
export interface GoogleCloudDiscoveryengineV1betaCustomAttribute {
  /**
   * The numerical values of this custom attribute. For example, `[2.3, 15.4]`
   * when the key is "lengths_cm". Exactly one of text or numbers should be set.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  numbers?: number[];
  /**
   * The textual values of this custom attribute. For example, `["yellow",
   * "green"]` when the key is "color". Empty string is not allowed. Otherwise,
   * an INVALID_ARGUMENT error is returned. Exactly one of text or numbers
   * should be set. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  text?: string[];
}

/**
 * Document captures all raw metadata information of items to be recommended or
 * searched.
 */
export interface GoogleCloudDiscoveryengineV1betaDocument {
  /**
   * Immutable. The identifier of the document. Id should conform to
   * [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length
   * limit of 63 characters.
   */
  id?: string;
  /**
   * The JSON string representation of the document. It should conform to the
   * registered schema or an INVALID_ARGUMENT error is thrown.
   */
  jsonData?: string;
  /**
   * Immutable. The full resource name of the document. Format:
   * `projects/{project}/locations/{location}/collections/{collection}/dataStores/{data_store}/branches/{branch}/documents/{document_id}`.
   * This field must be a UTF-8 encoded string with a length limit of 1024
   * characters.
   */
  name?: string;
  /**
   * The identifier of the parent document. Currently supports at most two
   * level document hierarchy. Id should conform to
   * [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length
   * limit of 63 characters.
   */
  parentDocumentId?: string;
  /**
   * Required. The identifier of the schema located in the same data store.
   */
  schemaId?: string;
  /**
   * The structured JSON data for the document. It should conform to the
   * registered schema or an INVALID_ARGUMENT error is thrown.
   */
  structData?: {
    [key: string]: any
  };
}

/**
 * Detailed document information associated with a user event.
 */
export interface GoogleCloudDiscoveryengineV1betaDocumentInfo {
  /**
   * Required. The Document resource ID.
   */
  id?: string;
  /**
   * Required. The Document resource full name, of the form:
   * projects/{project\_id}/locations/{location}/collections/{collection\_id}/dataStores/{data\_store\_id}/branches/{branch\_id}/documents/{document\_id}
   */
  name?: string;
  /**
   * The promotion IDs associated with this Document. Currently, this field is
   * restricted to at most one ID.
   */
  promotionIds?: string[];
  /**
   * Quantity of the Document associated with the user event. Defaults to 1.
   * For example, this field will be 2 if two quantities of the same Document
   * are involved in a `add-to-cart` event. Required for events of the following
   * event types: * `add-to-cart` * `purchase`
   */
  quantity?: number;
}

/**
 * Cloud Storage location for input content.
 */
export interface GoogleCloudDiscoveryengineV1betaGcsSource {
  /**
   * The schema to use when parsing the data from the source. Supported values
   * for imports: * `user_event` (default): One JSON UserEvent per line. *
   * `document` (default): One JSON Document per line. Each document must have a
   * valid Document.id.
   */
  dataSchema?: string;
  /**
   * Required. Cloud Storage URIs to input files. URI can be up to 2000
   * characters long. URIs can match the full object path (for example,
   * `gs://bucket/directory/object.json`) or a pattern matching one or more
   * files, such as `gs://bucket/directory/*.json`. A request can contain at
   * most 100 files, and each file can be up to 2 GB.
   */
  inputUris?: string[];
}

/**
 * Metadata related to the progress of the ImportDocuments operation. This will
 * be returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudDiscoveryengineV1betaImportDocumentsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDiscoveryengineV1betaImportDocumentsMetadata(data: any): GoogleCloudDiscoveryengineV1betaImportDocumentsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaImportDocumentsMetadata(data: any): GoogleCloudDiscoveryengineV1betaImportDocumentsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request message for Import methods.
 */
export interface GoogleCloudDiscoveryengineV1betaImportDocumentsRequest {
  /**
   * BigQuery input source.
   */
  bigquerySource?: GoogleCloudDiscoveryengineV1betaBigQuerySource;
  /**
   * The desired location of errors incurred during the Import.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1betaImportErrorConfig;
  /**
   * Cloud Storage location for the input content.
   */
  gcsSource?: GoogleCloudDiscoveryengineV1betaGcsSource;
  /**
   * The Inline source for the input content for documents.
   */
  inlineSource?: GoogleCloudDiscoveryengineV1betaImportDocumentsRequestInlineSource;
  /**
   * The mode of reconciliation between existing documents and the documents to
   * be imported. Defaults to ReconciliationMode.INCREMENTAL.
   */
  reconciliationMode?:  | "RECONCILIATION_MODE_UNSPECIFIED" | "INCREMENTAL" | "FULL";
}

/**
 * The inline source for the input config for ImportDocuments method.
 */
export interface GoogleCloudDiscoveryengineV1betaImportDocumentsRequestInlineSource {
  /**
   * Required. A list of documents to update/create. Each document must have a
   * valid Document.id. Recommended max of 100 items.
   */
  documents?: GoogleCloudDiscoveryengineV1betaDocument[];
}

/**
 * Response of the ImportDocumentsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudDiscoveryengineV1betaImportDocumentsResponse {
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1betaImportErrorConfig;
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudDiscoveryengineV1betaImportErrorConfig {
  /**
   * Cloud Storage prefix for import errors. This must be an empty, existing
   * Cloud Storage directory. Import errors will be written to sharded files in
   * this directory, one per line, as a JSON-encoded `google.rpc.Status`
   * message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudDiscoveryengineV1betaImportUserEventsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDiscoveryengineV1betaImportUserEventsMetadata(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaImportUserEventsMetadata(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request message for the ImportUserEvents request.
 */
export interface GoogleCloudDiscoveryengineV1betaImportUserEventsRequest {
  /**
   * Required. BigQuery input source.
   */
  bigquerySource?: GoogleCloudDiscoveryengineV1betaBigQuerySource;
  /**
   * The desired location of errors incurred during the Import. Cannot be set
   * for inline user event imports.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1betaImportErrorConfig;
  /**
   * Required. Cloud Storage location for the input content.
   */
  gcsSource?: GoogleCloudDiscoveryengineV1betaGcsSource;
  /**
   * Required. The Inline source for the input content for UserEvents.
   */
  inlineSource?: GoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource;
}

function serializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequest(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsRequest {
  return {
    ...data,
    inlineSource: data["inlineSource"] !== undefined ? serializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource(data["inlineSource"]) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequest(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsRequest {
  return {
    ...data,
    inlineSource: data["inlineSource"] !== undefined ? deserializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource(data["inlineSource"]) : undefined,
  };
}

/**
 * The inline source for the input config for ImportUserEvents method.
 */
export interface GoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource {
  /**
   * Required. A list of user events to import. Recommended max of 10k items.
   */
  userEvents?: GoogleCloudDiscoveryengineV1betaUserEvent[];
}

function serializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (serializeGoogleCloudDiscoveryengineV1betaUserEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsRequestInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (deserializeGoogleCloudDiscoveryengineV1betaUserEvent(item))) : undefined,
  };
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudDiscoveryengineV1betaImportUserEventsResponse {
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorConfig?: GoogleCloudDiscoveryengineV1betaImportErrorConfig;
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Count of user events imported with complete existing Documents.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with Document information not found in
   * the existing Branch.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudDiscoveryengineV1betaImportUserEventsResponse(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsResponse {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaImportUserEventsResponse(data: any): GoogleCloudDiscoveryengineV1betaImportUserEventsResponse {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * Response message for DocumentService.ListDocuments method.
 */
export interface GoogleCloudDiscoveryengineV1betaListDocumentsResponse {
  /**
   * The Documents.
   */
  documents?: GoogleCloudDiscoveryengineV1betaDocument[];
  /**
   * A token that can be sent as ListDocumentsRequest.page_token to retrieve
   * the next page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Media-specific user event information.
 */
export interface GoogleCloudDiscoveryengineV1betaMediaInfo {
  /**
   * The media progress time in seconds, if applicable. For example, if the end
   * user has finished 90 seconds of a playback video, then
   * MediaInfo.media_progress_duration.seconds should be set to 90.
   */
  mediaProgressDuration?: number /* Duration */;
  /**
   * Media progress should be computed using only the media_progress_duration
   * relative to the media total length. This value must be between [0, 1.0]
   * inclusive. If this is not a playback or the progress cannot be computed
   * (e.g. ongoing livestream), this field should be unset.
   */
  mediaProgressPercentage?: number;
}

function serializeGoogleCloudDiscoveryengineV1betaMediaInfo(data: any): GoogleCloudDiscoveryengineV1betaMediaInfo {
  return {
    ...data,
    mediaProgressDuration: data["mediaProgressDuration"] !== undefined ? data["mediaProgressDuration"] : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaMediaInfo(data: any): GoogleCloudDiscoveryengineV1betaMediaInfo {
  return {
    ...data,
    mediaProgressDuration: data["mediaProgressDuration"] !== undefined ? data["mediaProgressDuration"] : undefined,
  };
}

/**
 * Detailed page information.
 */
export interface GoogleCloudDiscoveryengineV1betaPageInfo {
  /**
   * The most specific category associated with a category page. To represent
   * full path of category, use '>' sign to separate different hierarchies. If
   * '>' is part of the category name, please replace it with other
   * character(s). Category pages include special pages such as sales or
   * promotions. For instance, a special sale page may have the category
   * hierarchy: "pageCategory" : "Sales > 2017 Black Friday Deals". Required for
   * `view-category-page` events. Other event types should not set this field.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  pageCategory?: string;
  /**
   * A unique ID of a web page view. This should be kept the same for all user
   * events triggered from the same pageview. For example, an item detail page
   * view could trigger multiple events as the user is browsing the page. The
   * `pageViewId` property should be kept the same for all these events so that
   * they can be grouped together properly. When using the client side event
   * reporting with JavaScript pixel and Google Tag Manager, this value is
   * filled in automatically.
   */
  pageviewId?: string;
  /**
   * The referrer URL of the current page. When using the client side event
   * reporting with JavaScript pixel and Google Tag Manager, this value is
   * filled in automatically. However, some browser privacy restrictions may
   * cause this field to be empty.
   */
  referrerUri?: string;
  /**
   * Complete URL (window.location.href) of the user's current page. When using
   * the client side event reporting with JavaScript pixel and Google Tag
   * Manager, this value is filled in automatically. Maximum length 5,000
   * characters.
   */
  uri?: string;
}

/**
 * Detailed panel information associated with a user event.
 */
export interface GoogleCloudDiscoveryengineV1betaPanelInfo {
  /**
   * The display name of the panel.
   */
  displayName?: string;
  /**
   * Required. The panel ID.
   */
  panelId?: string;
  /**
   * The ordered position of the panel, if shown to the user with other panels.
   * If set, then total_panels must also be set.
   */
  panelPosition?: number;
  /**
   * The total number of panels, including this one, shown to the user. Must be
   * set if panel_position is set.
   */
  totalPanels?: number;
}

/**
 * Request message for Recommend method.
 */
export interface GoogleCloudDiscoveryengineV1betaRecommendRequest {
  /**
   * Filter for restricting recommendation results with a length limit of 5,000
   * characters. Currently, only filter expressions on the `filter_tags`
   * attribute is supported. Examples: * (filter_tags: ANY("Red", "Blue") OR
   * filter_tags: ANY("Hot", "Cold")) * (filter_tags: ANY("Red", "Blue")) AND
   * NOT (filter_tags: ANY("Green")) If your filter blocks all results, the API
   * will return generic (unfiltered) popular Documents. If you only want
   * results strictly matching the filters, set `strictFiltering` to True in
   * RecommendRequest.params to receive empty results instead. Note that the API
   * will never return Documents with storageStatus of "EXPIRED" or "DELETED"
   * regardless of filter choices.
   */
  filter?: string;
  /**
   * Maximum number of results to return. Set this property to the number of
   * recommendation results needed. If zero, the service will choose a
   * reasonable default. The maximum allowed value is 100. Values above 100 will
   * be coerced to 100.
   */
  pageSize?: number;
  /**
   * Additional domain specific parameters for the recommendations. Allowed
   * values: * `returnDocument`: Boolean. If set to true, the associated
   * Document object will be returned in RecommendResponse.results.document. *
   * `returnScore`: Boolean. If set to true, the recommendation 'score'
   * corresponding to each returned Document will be set in
   * RecommendResponse.results.metadata. The given 'score' indicates the
   * probability of a Document conversion given the user's context and history.
   * * `strictFiltering`: Boolean. True by default. If set to false, the service
   * will return generic (unfiltered) popular Documents instead of empty if your
   * filter blocks all recommendation results. * `diversityLevel`: String.
   * Default empty. If set to be non-empty, then it needs to be one of: *
   * 'no-diversity' * 'low-diversity' * 'medium-diversity' * 'high-diversity' *
   * 'auto-diversity' This gives request-level control and adjusts
   * recommendation results based on Document category.
   */
  params?: {
    [key: string]: any
  };
  /**
   * Required. Context about the user, what they are looking at and what action
   * they took to trigger the Recommend request. Note that this user event
   * detail won't be ingested to userEvent logs. Thus, a separate userEvent
   * write request is required for event logging. Don't set
   * UserEvent.user_pseudo_id or UserEvent.user_info.user_id to the same fixed
   * ID for different users. If you are trying to receive non-personalized
   * recommendations (not recommended; this can negatively impact model
   * performance), instead set UserEvent.user_pseudo_id to a random unique ID
   * and leave UserEvent.user_info.user_id unset.
   */
  userEvent?: GoogleCloudDiscoveryengineV1betaUserEvent;
  /**
   * The user labels applied to a resource must meet the following
   * requirements: * Each resource can have multiple labels, up to a maximum of
   * 64. * Each label must be a key-value pair. * Keys have a minimum length of
   * 1 character and a maximum length of 63 characters and cannot be empty.
   * Values can be empty and have a maximum length of 63 characters. * Keys and
   * values can contain only lowercase letters, numeric characters, underscores,
   * and dashes. All characters must use UTF-8 encoding, and international
   * characters are allowed. * The key portion of a label must be unique.
   * However, you can use the same key with multiple resources. * Keys must
   * start with a lowercase letter or international character. See [Requirements
   * for
   * labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements)
   * for more details.
   */
  userLabels?: {
    [key: string]: string
  };
  /**
   * Use validate only mode for this recommendation query. If set to true, a
   * fake model will be used that returns arbitrary Document IDs. Note that the
   * validate only mode should only be used for testing the API, or if the model
   * is not ready.
   */
  validateOnly?: boolean;
}

function serializeGoogleCloudDiscoveryengineV1betaRecommendRequest(data: any): GoogleCloudDiscoveryengineV1betaRecommendRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? serializeGoogleCloudDiscoveryengineV1betaUserEvent(data["userEvent"]) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaRecommendRequest(data: any): GoogleCloudDiscoveryengineV1betaRecommendRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? deserializeGoogleCloudDiscoveryengineV1betaUserEvent(data["userEvent"]) : undefined,
  };
}

/**
 * Response message for Recommend method.
 */
export interface GoogleCloudDiscoveryengineV1betaRecommendResponse {
  /**
   * A unique attribution token. This should be included in the UserEvent logs
   * resulting from this recommendation, which enables accurate attribution of
   * recommendation model performance.
   */
  attributionToken?: string;
  /**
   * IDs of documents in the request that were missing from the default Branch
   * associated with the requested ServingConfig.
   */
  missingIds?: string[];
  /**
   * A list of recommended Documents. The order represents the ranking (from
   * the most relevant Document to the least).
   */
  results?: GoogleCloudDiscoveryengineV1betaRecommendResponseRecommendationResult[];
  /**
   * True if RecommendRequest.validate_only was set.
   */
  validateOnly?: boolean;
}

/**
 * RecommendationResult represents a generic recommendation result with
 * associated metadata.
 */
export interface GoogleCloudDiscoveryengineV1betaRecommendResponseRecommendationResult {
  /**
   * Set if `returnDocument` is set to true in RecommendRequest.params.
   */
  document?: GoogleCloudDiscoveryengineV1betaDocument;
  /**
   * Resource ID of the recommended Document.
   */
  id?: string;
  /**
   * Additional Document metadata / annotations. Possible values: * `score`:
   * Recommendation score in double value. Is set if `returnScore` is set to
   * true in RecommendRequest.params.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * Detailed search information.
 */
export interface GoogleCloudDiscoveryengineV1betaSearchInfo {
  /**
   * An integer that specifies the current offset for pagination (the 0-indexed
   * starting location, amongst the products deemed by the API as relevant). See
   * SearchRequest.offset for definition. If this field is negative, an
   * INVALID_ARGUMENT is returned. This can only be set for `search` events.
   * Other event types should not set this field. Otherwise, an INVALID_ARGUMENT
   * error is returned.
   */
  offset?: number;
  /**
   * The order in which products are returned, if applicable. See
   * SearchRequest.order_by for definition and syntax. The value must be a UTF-8
   * encoded string with a length limit of 1,000 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. This can only be set for `search`
   * events. Other event types should not set this field. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  orderBy?: string;
  /**
   * The user's search query. See SearchRequest.query for definition. The value
   * must be a UTF-8 encoded string with a length limit of 5,000 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned. At least one of
   * search_query or page_categories is required for `search` events. Other
   * event types should not set this field. Otherwise, an INVALID_ARGUMENT error
   * is returned.
   */
  searchQuery?: string;
}

/**
 * A transaction represents the entire purchase transaction.
 */
export interface GoogleCloudDiscoveryengineV1betaTransactionInfo {
  /**
   * All the costs associated with the products. These can be manufacturing
   * costs, shipping expenses not borne by the end user, or any other costs,
   * such that: * Profit = value - tax - cost
   */
  cost?: number;
  /**
   * Required. Currency code. Use three-character ISO-4217 code.
   */
  currency?: string;
  /**
   * The total discount(s) value applied to this transaction. This figure
   * should be excluded from TransactionInfo.value For example, if a user paid
   * TransactionInfo.value amount, then nominal (pre-discount) value of the
   * transaction is the sum of TransactionInfo.value and
   * TransactionInfo.discount_value This means that profit is calculated the
   * same way, regardless of the discount value, and that
   * TransactionInfo.discount_value can be larger than TransactionInfo.value: *
   * Profit = value - tax - cost
   */
  discountValue?: number;
  /**
   * All the taxes associated with the transaction.
   */
  tax?: number;
  /**
   * The transaction ID with a length limit of 128 characters.
   */
  transactionId?: string;
  /**
   * Required. Total non-zero value associated with the transaction. This value
   * may include shipping, tax, or other adjustments to the total value that you
   * want to include.
   */
  value?: number;
}

/**
 * UserEvent captures all metadata information Discovery Engine API needs to
 * know about how end users interact with customers' website.
 */
export interface GoogleCloudDiscoveryengineV1betaUserEvent {
  /**
   * Extra user event features to include in the recommendation model. These
   * attributes must NOT contain data that needs to be parsed or processed
   * further, e.g. JSON or other encodings. If you provide custom attributes for
   * ingested user events, also include them in the user events that you
   * associate with prediction requests. Custom attribute formatting must be
   * consistent between imported events and events provided with prediction
   * requests. This lets the Discovery Engine API use those custom attributes
   * when training models and serving predictions, which helps improve
   * recommendation quality. This field needs to pass all below criteria,
   * otherwise an INVALID_ARGUMENT error is returned: * The key must be a UTF-8
   * encoded string with a length limit of 5,000 characters. * For text
   * attributes, at most 400 values are allowed. Empty values are not allowed.
   * Each value must be a UTF-8 encoded string with a length limit of 256
   * characters. * For number attributes, at most 400 values are allowed. For
   * product recommendations, an example of extra user information is
   * traffic_channel, which is how a user arrives at the site. Users can arrive
   * at the site by coming to the site directly, coming through Google search,
   * or in other ways.
   */
  attributes?: {
    [key: string]: GoogleCloudDiscoveryengineV1betaCustomAttribute
  };
  /**
   * Token to attribute an API response to user action(s) to trigger the event.
   * Highly recommended for user events that are the result of
   * PredictionService.Predict. This field enables accurate attribution of
   * recommendation model performance. The value must be one of: *
   * PredictResponse.attribution_token for events that are the result of
   * PredictionService.Predict. * SearchResponse.attribution_token for events
   * that are the result of SearchService.Search. *
   * CompleteQueryResponse.attribution_token for events that are the result of
   * SearchService.CompleteQuery. This token enables us to accurately attribute
   * page view or conversion completion back to the event and the particular
   * predict response containing this clicked/purchased product. If user clicks
   * on product K in the recommendation results, pass
   * PredictResponse.attribution_token as a URL parameter to product K's page.
   * When recording events on product K's page, log the
   * PredictResponse.attribution_token to this field.
   */
  attributionToken?: string;
  /**
   * CompleteQuery API details related to the event. This field should be set
   * for `search` event when autocomplete function is enabled and the user
   * clicks a suggestion for search.
   */
  completionInfo?: GoogleCloudDiscoveryengineV1betaCompletionInfo;
  /**
   * Should set to true if the request is made directly from the end user, in
   * which case the UserEvent.user_info.user_agent can be populated from the
   * HTTP request. This flag should be set only if the API request is made
   * directly from the end user such as a mobile app (and not if a gateway or a
   * server is processing and pushing the user events). This should not be set
   * when using the JavaScript tag in UserEventService.CollectUserEvent.
   */
  directUserRequest?: boolean;
  /**
   * List of Documents associated with this user event. This field is optional
   * except for the following event types: * `view-item` * `add-to-cart` *
   * `purchase` * `media-play` * `media-complete` In a `search` event, this
   * field represents the documents returned to the end user on the current page
   * (the end user may have not finished browsing the whole page yet). When a
   * new page is returned to the end user, after pagination/filtering/ordering
   * even for the same query, a new `search` event with different
   * UserEvent.documents is desired.
   */
  documents?: GoogleCloudDiscoveryengineV1betaDocumentInfo[];
  /**
   * Only required for UserEventService.ImportUserEvents method. Timestamp of
   * when the user event happened.
   */
  eventTime?: Date;
  /**
   * Required. User event type. Allowed values are: Generic values: * `search`:
   * Search for Documents. * `view-item`: Detailed page view of a Document. *
   * `view-item-list`: View of a panel or ordered list of Documents. *
   * `view-home-page`: View of the home page. * `view-category-page`: View of a
   * category page, e.g. Home > Men > Jeans Retail-related values: *
   * `add-to-cart`: Add an item(s) to cart, e.g. in Retail online shopping *
   * `purchase`: Purchase an item(s) Media-related values: * `media-play`:
   * Start/resume watching a video, playing a song, etc. * `media-complete`:
   * Finished or stopped midway through a video, song, etc.
   */
  eventType?: string;
  /**
   * The filter syntax consists of an expression language for constructing a
   * predicate from one or more fields of the documents being filtered. One
   * example is for `search` events, the associated SearchService.SearchRequest
   * may contain a filter expression in SearchService.SearchRequest.filter
   * conforming to https://google.aip.dev/160#filtering. Similarly, for
   * `view-item-list` events that are generated from a
   * PredictionService.PredictRequest, this field may be populated directly from
   * PredictionService.PredictRequest.filter conforming to
   * https://google.aip.dev/160#filtering. The value must be a UTF-8 encoded
   * string with a length limit of 1,000 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  filter?: string;
  /**
   * Media-specific info.
   */
  mediaInfo?: GoogleCloudDiscoveryengineV1betaMediaInfo;
  /**
   * Page metadata such as categories and other critical information for
   * certain event types such as `view-category-page`.
   */
  pageInfo?: GoogleCloudDiscoveryengineV1betaPageInfo;
  /**
   * Panel metadata associated with this user event.
   */
  panel?: GoogleCloudDiscoveryengineV1betaPanelInfo;
  /**
   * The promotion IDs if this is an event associated with promotions.
   * Currently, this field is restricted to at most one ID.
   */
  promotionIds?: string[];
  /**
   * Search API details related to the event. This field should be set for
   * `search` event.
   */
  searchInfo?: GoogleCloudDiscoveryengineV1betaSearchInfo;
  /**
   * A unique identifier for tracking a visitor session with a length limit of
   * 128 bytes. A session is an aggregation of an end user behavior in a time
   * span. A general guideline to populate the session_id: 1. If user has no
   * activity for 30 min, a new session_id should be assigned. 2. The session_id
   * should be unique across users, suggest use uuid or add
   * UserEvent.user_pseudo_id as prefix.
   */
  sessionId?: string;
  /**
   * A list of identifiers for the independent experiment groups this user
   * event belongs to. This is used to distinguish between user events
   * associated with different experiment setups on the customer end.
   */
  tagIds?: string[];
  /**
   * The transaction metadata (if any) associated with this user event.
   */
  transactionInfo?: GoogleCloudDiscoveryengineV1betaTransactionInfo;
  /**
   * Information about the end user.
   */
  userInfo?: GoogleCloudDiscoveryengineV1betaUserInfo;
  /**
   * Required. A unique identifier for tracking visitors. For example, this
   * could be implemented with an HTTP cookie, which should be able to uniquely
   * identify a visitor on a single device. This unique identifier should not
   * change if the visitor log in/out of the website. Do not set the field to
   * the same fixed ID for different users. This mixes the event history of
   * those users together, which results in degraded model quality. The field
   * must be a UTF-8 encoded string with a length limit of 128 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned. The field should not
   * contain PII or user-data. We recommend to use Google Analytics [Client
   * ID](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId)
   * for this field.
   */
  userPseudoId?: string;
}

function serializeGoogleCloudDiscoveryengineV1betaUserEvent(data: any): GoogleCloudDiscoveryengineV1betaUserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
    mediaInfo: data["mediaInfo"] !== undefined ? serializeGoogleCloudDiscoveryengineV1betaMediaInfo(data["mediaInfo"]) : undefined,
  };
}

function deserializeGoogleCloudDiscoveryengineV1betaUserEvent(data: any): GoogleCloudDiscoveryengineV1betaUserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
    mediaInfo: data["mediaInfo"] !== undefined ? deserializeGoogleCloudDiscoveryengineV1betaMediaInfo(data["mediaInfo"]) : undefined,
  };
}

/**
 * Information of an end user.
 */
export interface GoogleCloudDiscoveryengineV1betaUserInfo {
  /**
   * User agent as included in the HTTP header. Required for getting
   * SearchResponse.sponsored_results. The field must be a UTF-8 encoded string
   * with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT
   * error is returned. This should not be set when using the client side event
   * reporting with GTM or JavaScript tag in UserEventService.CollectUserEvent
   * or if direct_user_request is set.
   */
  userAgent?: string;
  /**
   * Highly recommended for logged-in users. Unique identifier for logged-in
   * user, such as a user name. Don't set for anonymous users. Always use a
   * hashed value for this ID. Don't set the field to the same fixed ID for
   * different users. This mixes the event history of those users together,
   * which results in degraded model quality. The field must be a UTF-8 encoded
   * string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  userId?: string;
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresBranchesDocumentsCreate.
 */
export interface ProjectsLocationsCollectionsDataStoresBranchesDocumentsCreateOptions {
  /**
   * Required. The ID to use for the Document, which will become the final
   * component of the Document.name. If the caller does not have permission to
   * create the Document, regardless of whether or not it exists, a
   * PERMISSION_DENIED error is returned. This field must be unique among all
   * Documents with the same parent. Otherwise, an ALREADY_EXISTS error is
   * returned. This field must conform to
   * [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length
   * limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  documentId?: string;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresBranchesDocumentsList.
 */
export interface ProjectsLocationsCollectionsDataStoresBranchesDocumentsListOptions {
  /**
   * Maximum number of Documents to return. If unspecified, defaults to 100.
   * The maximum allowed value is 1000. Values above 1000 will be coerced to
   * 1000. If this field is negative, an INVALID_ARGUMENT error is returned.
   */
  pageSize?: number;
  /**
   * A page token ListDocumentsResponse.next_page_token, received from a
   * previous DocumentService.ListDocuments call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * DocumentService.ListDocuments must match the call that provided the page
   * token. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresBranchesDocumentsPatch.
 */
export interface ProjectsLocationsCollectionsDataStoresBranchesDocumentsPatchOptions {
  /**
   * If set to true, and the Document is not found, a new Document will be
   * created.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresBranchesOperationsList.
 */
export interface ProjectsLocationsCollectionsDataStoresBranchesOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresModelsOperationsList.
 */
export interface ProjectsLocationsCollectionsDataStoresModelsOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresOperationsList.
 */
export interface ProjectsLocationsCollectionsDataStoresOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsDataStoresUserEventsCollect.
 */
export interface ProjectsLocationsCollectionsDataStoresUserEventsCollectOptions {
  /**
   * The event timestamp in milliseconds. This prevents browser caching of
   * otherwise identical get requests. The name is abbreviated to reduce the
   * payload bytes.
   */
  ets?: bigint;
  /**
   * The URL including cgi-parameters but excluding the hash fragment with a
   * length limit of 5,000 characters. This is often more useful than the
   * referer URL, because many browsers only send the domain for 3rd party
   * requests.
   */
  uri?: string;
  /**
   * Required. URL encoded UserEvent proto with a length limit of 2,000,000
   * characters.
   */
  userEvent?: string;
}

function serializeProjectsLocationsCollectionsDataStoresUserEventsCollectOptions(data: any): ProjectsLocationsCollectionsDataStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? String(data["ets"]) : undefined,
  };
}

function deserializeProjectsLocationsCollectionsDataStoresUserEventsCollectOptions(data: any): ProjectsLocationsCollectionsDataStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? BigInt(data["ets"]) : undefined,
  };
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsCollectionsOperationsList.
 */
export interface ProjectsLocationsCollectionsOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresBranchesDocumentsCreate.
 */
export interface ProjectsLocationsDataStoresBranchesDocumentsCreateOptions {
  /**
   * Required. The ID to use for the Document, which will become the final
   * component of the Document.name. If the caller does not have permission to
   * create the Document, regardless of whether or not it exists, a
   * PERMISSION_DENIED error is returned. This field must be unique among all
   * Documents with the same parent. Otherwise, an ALREADY_EXISTS error is
   * returned. This field must conform to
   * [RFC-1034](https://tools.ietf.org/html/rfc1034) standard with a length
   * limit of 63 characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  documentId?: string;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresBranchesDocumentsList.
 */
export interface ProjectsLocationsDataStoresBranchesDocumentsListOptions {
  /**
   * Maximum number of Documents to return. If unspecified, defaults to 100.
   * The maximum allowed value is 1000. Values above 1000 will be coerced to
   * 1000. If this field is negative, an INVALID_ARGUMENT error is returned.
   */
  pageSize?: number;
  /**
   * A page token ListDocumentsResponse.next_page_token, received from a
   * previous DocumentService.ListDocuments call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * DocumentService.ListDocuments must match the call that provided the page
   * token. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresBranchesDocumentsPatch.
 */
export interface ProjectsLocationsDataStoresBranchesDocumentsPatchOptions {
  /**
   * If set to true, and the Document is not found, a new Document will be
   * created.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresBranchesOperationsList.
 */
export interface ProjectsLocationsDataStoresBranchesOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresModelsOperationsList.
 */
export interface ProjectsLocationsDataStoresModelsOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresOperationsList.
 */
export interface ProjectsLocationsDataStoresOperationsListOptions {
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
 * Additional options for
 * DiscoveryEngine#projectsLocationsDataStoresUserEventsCollect.
 */
export interface ProjectsLocationsDataStoresUserEventsCollectOptions {
  /**
   * The event timestamp in milliseconds. This prevents browser caching of
   * otherwise identical get requests. The name is abbreviated to reduce the
   * payload bytes.
   */
  ets?: bigint;
  /**
   * The URL including cgi-parameters but excluding the hash fragment with a
   * length limit of 5,000 characters. This is often more useful than the
   * referer URL, because many browsers only send the domain for 3rd party
   * requests.
   */
  uri?: string;
  /**
   * Required. URL encoded UserEvent proto with a length limit of 2,000,000
   * characters.
   */
  userEvent?: string;
}

function serializeProjectsLocationsDataStoresUserEventsCollectOptions(data: any): ProjectsLocationsDataStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? String(data["ets"]) : undefined,
  };
}

function deserializeProjectsLocationsDataStoresUserEventsCollectOptions(data: any): ProjectsLocationsDataStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? BigInt(data["ets"]) : undefined,
  };
}

/**
 * Additional options for DiscoveryEngine#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
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
 * Additional options for DiscoveryEngine#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
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
