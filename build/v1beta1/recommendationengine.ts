// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Recommendations AI (Beta) Client for Deno
 * =========================================
 * 
 * Note that we now highly recommend new customers to use Retail API, which incorporates the GA version of the Recommendations AI funtionalities. To enable Retail API, please visit https://console.cloud.google.com/apis/library/retail.googleapis.com. The Recommendations AI service enables customers to build end-to-end personalized recommendation systems without requiring a high level of expertise in machine learning, recommendation system, or Google Cloud.
 * 
 * Docs: https://cloud.google.com/recommendations-ai/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Note that we now highly recommend new customers to use Retail API, which
 * incorporates the GA version of the Recommendations AI funtionalities. To
 * enable Retail API, please visit
 * https://console.cloud.google.com/apis/library/retail.googleapis.com. The
 * Recommendations AI service enables customers to build end-to-end personalized
 * recommendation systems without requiring a high level of expertise in machine
 * learning, recommendation system, or Google Cloud.
 */
export class recommendationengine {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://recommendationengine.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a catalog item.
   *
   * @param parent Required. The parent catalog resource name, such as `projects/*\/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsCatalogItemsCreate(parent: string, req: GoogleCloudRecommendationengineV1beta1CatalogItem): Promise<GoogleCloudRecommendationengineV1beta1CatalogItem> {
    req = serializeGoogleCloudRecommendationengineV1beta1CatalogItem(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/catalogItems`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(data);
  }

  /**
   * Deletes a catalog item.
   *
   * @param name Required. Full resource name of catalog item, such as `projects/*\/locations/global/catalogs/default_catalog/catalogItems/some_catalog_item_id`.
   */
  async projectsLocationsCatalogsCatalogItemsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a specific catalog item.
   *
   * @param name Required. Full resource name of catalog item, such as `projects/*\/locations/global/catalogs/default_catalog/catalogitems/some_catalog_item_id`.
   */
  async projectsLocationsCatalogsCatalogItemsGet(name: string): Promise<GoogleCloudRecommendationengineV1beta1CatalogItem> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(data);
  }

  /**
   * Bulk import of multiple catalog items. Request processing may be
   * synchronous. No partial updating supported. Non-existing items will be
   * created. Operation.response is of type ImportResponse. Note that it is
   * possible for a subset of the items to be successfully updated.
   *
   * @param parent Required. `projects/1234/locations/global/catalogs/default_catalog` If no updateMask is specified, requires catalogItems.create permission. If updateMask is specified, requires catalogItems.update permission.
   */
  async projectsLocationsCatalogsCatalogItemsImport(parent: string, req: GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/catalogItems:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of catalog items.
   *
   * @param parent Required. The parent catalog resource name, such as `projects/*\/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsCatalogItemsList(parent: string, opts: ProjectsLocationsCatalogsCatalogItemsListOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/catalogItems`);
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
    return deserializeGoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse(data);
  }

  /**
   * Updates a catalog item. Partial updating is supported. Non-existing items
   * will be created.
   *
   * @param name Required. Full resource name of catalog item, such as `projects/*\/locations/global/catalogs/default_catalog/catalogItems/some_catalog_item_id`.
   */
  async projectsLocationsCatalogsCatalogItemsPatch(name: string, req: GoogleCloudRecommendationengineV1beta1CatalogItem, opts: ProjectsLocationsCatalogsCatalogItemsPatchOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1CatalogItem> {
    req = serializeGoogleCloudRecommendationengineV1beta1CatalogItem(req);
    opts = serializeProjectsLocationsCatalogsCatalogItemsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCatalogsEventStoresOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
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
  async projectsLocationsCatalogsEventStoresOperationsList(name: string, opts: ProjectsLocationsCatalogsEventStoresOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }/operations`);
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
   * Makes a recommendation prediction. If using API Key based authentication,
   * the API Key must be registered using the PredictionApiKeyRegistry service.
   * [Learn
   * more](https://cloud.google.com/recommendations-ai/docs/setting-up#register-key).
   *
   */
  async projectsLocationsCatalogsEventStoresPlacementsPredict(name: string, req: GoogleCloudRecommendationengineV1beta1PredictRequest): Promise<GoogleCloudRecommendationengineV1beta1PredictResponse> {
    req = serializeGoogleCloudRecommendationengineV1beta1PredictRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:predict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRecommendationengineV1beta1PredictResponse;
  }

  /**
   * Register an API key for use with predict method.
   *
   * @param parent Required. The parent resource path. `projects/*\/locations/global/catalogs/default_catalog/eventStores/default_event_store`.
   */
  async projectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsCreate(parent: string, req: GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest): Promise<GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/predictionApiKeyRegistrations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration;
  }

  /**
   * Unregister an apiKey from using for predict method.
   *
   * @param name Required. The API key to unregister including full resource path. `projects/*\/locations/global/catalogs/default_catalog/eventStores/default_event_store/predictionApiKeyRegistrations/`
   */
  async projectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * List the registered apiKeys for use with predict method.
   *
   * @param parent Required. The parent placement resource name such as `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store`
   */
  async projectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsList(parent: string, opts: ProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsListOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/predictionApiKeyRegistrations`);
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
    return data as GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse;
  }

  /**
   * Writes a single user event from the browser. This uses a GET request to
   * due to browser restriction of POST-ing to a 3rd party domain. This method
   * is used only by the Recommendations AI JavaScript pixel. Users should not
   * call this method directly.
   *
   * @param parent Required. The parent eventStore name, such as `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store`.
   */
  async projectsLocationsCatalogsEventStoresUserEventsCollect(parent: string, opts: ProjectsLocationsCatalogsEventStoresUserEventsCollectOptions = {}): Promise<GoogleApiHttpBody> {
    opts = serializeProjectsLocationsCatalogsEventStoresUserEventsCollectOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents:collect`);
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
   * @param parent Required. `projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store`
   */
  async projectsLocationsCatalogsEventStoresUserEventsImport(parent: string, req: GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRecommendationengineV1beta1ImportUserEventsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of user events within a time range, with potential filtering.
   * The method does not list unjoined user events. Unjoined user event
   * definition: when a user event is ingested from Recommendations AI User
   * Event APIs, the catalog item included in the user event is connected with
   * the current catalog. If a catalog item of the ingested event is not in the
   * current catalog, it could lead to degraded model quality. This is called an
   * unjoined event.
   *
   * @param parent Required. The parent eventStore resource name, such as `projects/*\/locations/*\/catalogs/default_catalog/eventStores/default_event_store`.
   */
  async projectsLocationsCatalogsEventStoresUserEventsList(parent: string, opts: ProjectsLocationsCatalogsEventStoresUserEventsListOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1ListUserEventsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents`);
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
    return deserializeGoogleCloudRecommendationengineV1beta1ListUserEventsResponse(data);
  }

  /**
   * Deletes permanently all user events specified by the filter provided.
   * Depending on the number of events specified by the filter, this operation
   * could take hours or days to complete. To test a filter, use the list
   * command first.
   *
   * @param parent Required. The resource name of the event_store under which the events are created. The format is `projects/${projectId}/locations/global/catalogs/${catalogId}/eventStores/${eventStoreId}`
   */
  async projectsLocationsCatalogsEventStoresUserEventsPurge(parent: string, req: GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents:purge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Triggers a user event rejoin operation with latest catalog data. Events
   * will not be annotated with detailed catalog information if catalog item is
   * missing at the time the user event is ingested, and these events are stored
   * as unjoined events with a limited usage on training and serving. This API
   * can be used to trigger a 'join' operation on specified events with latest
   * version of catalog items. It can also be used to correct events joined with
   * wrong catalog items.
   *
   * @param parent Required. Full resource name of user event, such as `projects/*\/locations/*\/catalogs/default_catalog/eventStores/default_event_store`.
   */
  async projectsLocationsCatalogsEventStoresUserEventsRejoin(parent: string, req: GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents:rejoin`);
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
   * @param parent Required. The parent eventStore resource name, such as "projects/1234/locations/global/catalogs/default_catalog/eventStores/default_event_store".
   */
  async projectsLocationsCatalogsEventStoresUserEventsWrite(parent: string, req: GoogleCloudRecommendationengineV1beta1UserEvent): Promise<GoogleCloudRecommendationengineV1beta1UserEvent> {
    req = serializeGoogleCloudRecommendationengineV1beta1UserEvent(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/userEvents:write`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommendationengineV1beta1UserEvent(data);
  }

  /**
   * Lists all the catalog configurations associated with the project.
   *
   * @param parent Required. The account resource name with an associated location.
   */
  async projectsLocationsCatalogsList(parent: string, opts: ProjectsLocationsCatalogsListOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1ListCatalogsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/catalogs`);
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
    return data as GoogleCloudRecommendationengineV1beta1ListCatalogsResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCatalogsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
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
  async projectsLocationsCatalogsOperationsList(name: string, opts: ProjectsLocationsCatalogsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }/operations`);
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
   * Updates the catalog configuration.
   *
   * @param name The fully qualified resource name of the catalog.
   */
  async projectsLocationsCatalogsPatch(name: string, req: GoogleCloudRecommendationengineV1beta1Catalog, opts: ProjectsLocationsCatalogsPatchOptions = {}): Promise<GoogleCloudRecommendationengineV1beta1Catalog> {
    opts = serializeProjectsLocationsCatalogsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRecommendationengineV1beta1Catalog;
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
 * Metadata for TriggerCatalogRejoin method.
 */
export interface GoogleCloudRecommendationengineV1alphaRejoinCatalogMetadata {
}

/**
 * Response message for TriggerCatalogRejoin method.
 */
export interface GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse {
  /**
   * Number of user events that were joined with latest catalog items.
   */
  rejoinedUserEventsCount?: bigint;
}

function serializeGoogleCloudRecommendationengineV1alphaRejoinCatalogResponse(data: any): GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? String(data["rejoinedUserEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1alphaRejoinCatalogResponse(data: any): GoogleCloudRecommendationengineV1alphaRejoinCatalogResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? BigInt(data["rejoinedUserEventsCount"]) : undefined,
  };
}

/**
 * Metadata associated with a tune operation.
 */
export interface GoogleCloudRecommendationengineV1alphaTuningMetadata {
  /**
   * The resource name of the recommendation model that this tune applies to.
   * Format:
   * projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/eventStores/{event_store_id}/recommendationModels/{recommendation_model_id}
   */
  recommendationModel?: string;
}

/**
 * Response associated with a tune operation.
 */
export interface GoogleCloudRecommendationengineV1alphaTuningResponse {
}

/**
 * BigQuery source import data from.
 */
export interface GoogleCloudRecommendationengineV1beta1BigQuerySource {
  /**
   * Optional. The schema to use when parsing the data from the source.
   * Supported values for catalog imports: 1: "catalog_recommendations_ai" using
   * https://cloud.google.com/recommendations-ai/docs/upload-catalog#json
   * (Default for catalogItems.import) 2: "catalog_merchant_center" using
   * https://cloud.google.com/recommendations-ai/docs/upload-catalog#mc
   * Supported values for user event imports: 1:
   * "user_events_recommendations_ai" using
   * https://cloud.google.com/recommendations-ai/docs/manage-user-events#import
   * (Default for userEvents.import) 2. "user_events_ga360" using
   * https://support.google.com/analytics/answer/3437719?hl=en
   */
  dataSchema?: string;
  /**
   * Required. The BigQuery data set to copy the data from.
   */
  datasetId?: string;
  /**
   * Optional. Intermediate Cloud Storage directory used for the import. Can be
   * specified if one wants to have the BigQuery export to a specific Cloud
   * Storage directory.
   */
  gcsStagingDir?: string;
  /**
   * Optional. The project id (can be project # or id) that the BigQuery source
   * is in. If not specified, inherits the project id from the parent request.
   */
  projectId?: string;
  /**
   * Required. The BigQuery table to copy the data from.
   */
  tableId?: string;
}

/**
 * The catalog configuration. Next ID: 5.
 */
export interface GoogleCloudRecommendationengineV1beta1Catalog {
  /**
   * Required. The catalog item level configuration.
   */
  catalogItemLevelConfig?: GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig;
  /**
   * Required. The ID of the default event store.
   */
  defaultEventStoreId?: string;
  /**
   * Required. The catalog display name.
   */
  displayName?: string;
  /**
   * The fully qualified resource name of the catalog.
   */
  name?: string;
}

/**
 * The inline source for the input config for ImportCatalogItems method.
 */
export interface GoogleCloudRecommendationengineV1beta1CatalogInlineSource {
  /**
   * Optional. A list of catalog items to update/create. Recommended max of 10k
   * items.
   */
  catalogItems?: GoogleCloudRecommendationengineV1beta1CatalogItem[];
}

function serializeGoogleCloudRecommendationengineV1beta1CatalogInlineSource(data: any): GoogleCloudRecommendationengineV1beta1CatalogInlineSource {
  return {
    ...data,
    catalogItems: data["catalogItems"] !== undefined ? data["catalogItems"].map((item: any) => (serializeGoogleCloudRecommendationengineV1beta1CatalogItem(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1CatalogInlineSource(data: any): GoogleCloudRecommendationengineV1beta1CatalogInlineSource {
  return {
    ...data,
    catalogItems: data["catalogItems"] !== undefined ? data["catalogItems"].map((item: any) => (deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(item))) : undefined,
  };
}

/**
 * CatalogItem captures all metadata information of items to be recommended.
 */
export interface GoogleCloudRecommendationengineV1beta1CatalogItem {
  /**
   * Required. Catalog item categories. This field is repeated for supporting
   * one catalog item belonging to several parallel category hierarchies. For
   * example, if a shoes product belongs to both ["Shoes & Accessories" ->
   * "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it
   * could be represented as: "categoryHierarchies": [ { "categories": ["Shoes &
   * Accessories", "Shoes"]}, { "categories": ["Sports & Fitness", "Athletic
   * Clothing", "Shoes"] } ]
   */
  categoryHierarchies?: GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy[];
  /**
   * Optional. Catalog item description. UTF-8 encoded string with a length
   * limit of 5 KiB.
   */
  description?: string;
  /**
   * Required. Catalog item identifier. UTF-8 encoded string with a length
   * limit of 128 bytes. This id must be unique among all catalog items within
   * the same catalog. It should also be used when logging user events in order
   * for the user events to be joined with the Catalog.
   */
  id?: string;
  /**
   * Optional. Highly encouraged. Extra catalog item attributes to be included
   * in the recommendation model. For example, for retail products, this could
   * include the store name, vendor, style, color, etc. These are very strong
   * signals for recommendation model, thus we highly recommend providing the
   * item attributes here.
   */
  itemAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
  /**
   * Optional. Variant group identifier for prediction results. UTF-8 encoded
   * string with a length limit of 128 bytes. This field must be enabled before
   * it can be used. [Learn
   * more](/recommendations-ai/docs/catalog#item-group-id).
   */
  itemGroupId?: string;
  /**
   * Optional. Deprecated. The model automatically detects the text language.
   * Your catalog can include text in different languages, but duplicating
   * catalog items to provide text in multiple languages can result in degraded
   * model performance.
   */
  languageCode?: string;
  /**
   * Optional. Metadata specific to retail products.
   */
  productMetadata?: GoogleCloudRecommendationengineV1beta1ProductCatalogItem;
  /**
   * Optional. Filtering tags associated with the catalog item. Each tag should
   * be a UTF-8 encoded string with a length limit of 1 KiB. This tag can be
   * used for filtering recommendation results by passing the tag as part of the
   * predict request filter.
   */
  tags?: string[];
  /**
   * Required. Catalog item title. UTF-8 encoded string with a length limit of
   * 1 KiB.
   */
  title?: string;
}

function serializeGoogleCloudRecommendationengineV1beta1CatalogItem(data: any): GoogleCloudRecommendationengineV1beta1CatalogItem {
  return {
    ...data,
    productMetadata: data["productMetadata"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1ProductCatalogItem(data["productMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(data: any): GoogleCloudRecommendationengineV1beta1CatalogItem {
  return {
    ...data,
    productMetadata: data["productMetadata"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1ProductCatalogItem(data["productMetadata"]) : undefined,
  };
}

/**
 * Category represents catalog item category hierarchy.
 */
export interface GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy {
  /**
   * Required. Catalog item categories. Each category should be a UTF-8 encoded
   * string with a length limit of 2 KiB. Note that the order in the list
   * denotes the specificity (from least to most specific).
   */
  categories?: string[];
}

/**
 * Configures the catalog level that users send events to, and the level at
 * which predictions are made.
 */
export interface GoogleCloudRecommendationengineV1beta1CatalogItemLevelConfig {
  /**
   * Optional. Level of the catalog at which events are uploaded. See
   * https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for
   * more details.
   */
  eventItemLevel?:  | "CATALOG_ITEM_LEVEL_UNSPECIFIED" | "VARIANT" | "MASTER";
  /**
   * Optional. Level of the catalog at which predictions are made. See
   * https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for
   * more details.
   */
  predictItemLevel?:  | "CATALOG_ITEM_LEVEL_UNSPECIFIED" | "VARIANT" | "MASTER";
}

/**
 * Request message for the `CreatePredictionApiKeyRegistration` method.
 */
export interface GoogleCloudRecommendationengineV1beta1CreatePredictionApiKeyRegistrationRequest {
  /**
   * Required. The prediction API key registration.
   */
  predictionApiKeyRegistration?: GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration;
}

/**
 * User event details shared by all recommendation types.
 */
export interface GoogleCloudRecommendationengineV1beta1EventDetail {
  /**
   * Optional. Extra user event features to include in the recommendation
   * model. For product recommendation, an example of extra user information is
   * traffic_channel, i.e. how user arrives at the site. Users can arrive at the
   * site by coming to the site directly, or coming through Google search, and
   * etc.
   */
  eventAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
  /**
   * Optional. A list of identifiers for the independent experiment groups this
   * user event belongs to. This is used to distinguish between user events
   * associated with different experiment setups (e.g. using Recommendation
   * Engine system, using different recommendation models).
   */
  experimentIds?: string[];
  /**
   * Optional. A unique id of a web page view. This should be kept the same for
   * all user events triggered from the same pageview. For example, an item
   * detail page view could trigger multiple events as the user is browsing the
   * page. The `pageViewId` property should be kept the same for all these
   * events so that they can be grouped together properly. This `pageViewId`
   * will be automatically generated if using the JavaScript pixel.
   */
  pageViewId?: string;
  /**
   * Optional. Recommendation token included in the recommendation prediction
   * response. This field enables accurate attribution of recommendation model
   * performance. This token enables us to accurately attribute page view or
   * purchase back to the event and the particular predict response containing
   * this clicked/purchased item. If user clicks on product K in the
   * recommendation results, pass the `PredictResponse.recommendationToken`
   * property as a url parameter to product K's page. When recording events on
   * product K's page, log the PredictResponse.recommendation_token to this
   * field. Optional, but highly encouraged for user events that are the result
   * of a recommendation prediction query.
   */
  recommendationToken?: string;
  /**
   * Optional. The referrer url of the current page. When using the JavaScript
   * pixel, this value is filled in automatically.
   */
  referrerUri?: string;
  /**
   * Optional. Complete url (window.location.href) of the user's current page.
   * When using the JavaScript pixel, this value is filled in automatically.
   * Maximum length 5KB.
   */
  uri?: string;
}

/**
 * FeatureMap represents extra features that customers want to include in the
 * recommendation model for catalogs/user events as categorical/numerical
 * features.
 */
export interface GoogleCloudRecommendationengineV1beta1FeatureMap {
  /**
   * Categorical features that can take on one of a limited number of possible
   * values. Some examples would be the brand/maker of a product, or country of
   * a customer. Feature names and values must be UTF-8 encoded strings. For
   * example: `{ "colors": {"value": ["yellow", "green"]}, "sizes":
   * {"value":["S", "M"]}`
   */
  categoricalFeatures?: {
    [key: string]: GoogleCloudRecommendationengineV1beta1FeatureMapStringList
  };
  /**
   * Numerical features. Some examples would be the height/weight of a product,
   * or age of a customer. Feature names must be UTF-8 encoded strings. For
   * example: `{ "lengths_cm": {"value":[2.3, 15.4]}, "heights_cm":
   * {"value":[8.1, 6.4]} }`
   */
  numericalFeatures?: {
    [key: string]: GoogleCloudRecommendationengineV1beta1FeatureMapFloatList
  };
}

/**
 * A list of float features.
 */
export interface GoogleCloudRecommendationengineV1beta1FeatureMapFloatList {
  /**
   * Float feature value.
   */
  value?: number[];
}

/**
 * A list of string features.
 */
export interface GoogleCloudRecommendationengineV1beta1FeatureMapStringList {
  /**
   * String feature value with a length limit of 128 bytes.
   */
  value?: string[];
}

/**
 * Google Cloud Storage location for input content. format.
 */
export interface GoogleCloudRecommendationengineV1beta1GcsSource {
  /**
   * Required. Google Cloud Storage URIs to input files. URI can be up to 2000
   * characters long. URIs can match the full object path (for example,
   * `gs://bucket/directory/object.json`) or a pattern matching one or more
   * files, such as `gs://bucket/directory/*.json`. A request can contain at
   * most 100 files, and each file can be up to 2 GB. See [Importing catalog
   * information](/recommendations-ai/docs/upload-catalog) for the expected file
   * format and setup instructions.
   */
  inputUris?: string[];
  /**
   * Optional. The schema to use when parsing the data from the source.
   * Supported values for catalog imports: 1: "catalog_recommendations_ai" using
   * https://cloud.google.com/recommendations-ai/docs/upload-catalog#json
   * (Default for catalogItems.import) 2: "catalog_merchant_center" using
   * https://cloud.google.com/recommendations-ai/docs/upload-catalog#mc
   * Supported values for user events imports: 1:
   * "user_events_recommendations_ai" using
   * https://cloud.google.com/recommendations-ai/docs/manage-user-events#import
   * (Default for userEvents.import) 2. "user_events_ga360" using
   * https://support.google.com/analytics/answer/3437719?hl=en
   */
  jsonSchema?: string;
}

/**
 * Catalog item thumbnail/detail image.
 */
export interface GoogleCloudRecommendationengineV1beta1Image {
  /**
   * Optional. Height of the image in number of pixels.
   */
  height?: number;
  /**
   * Required. URL of the image with a length limit of 5 KiB.
   */
  uri?: string;
  /**
   * Optional. Width of the image in number of pixels.
   */
  width?: number;
}

/**
 * Request message for Import methods.
 */
export interface GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest {
  /**
   * Optional. The desired location of errors incurred during the Import.
   */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /**
   * Required. The desired input location of the data.
   */
  inputConfig?: GoogleCloudRecommendationengineV1beta1InputConfig;
  /**
   * Optional. Unique identifier provided by client, within the ancestor
   * dataset scope. Ensures idempotency and used for request deduplication.
   * Server-generated if unspecified. Up to 128 characters long. This is
   * returned as google.longrunning.Operation.name in the response.
   */
  requestId?: string;
  /**
   * Optional. Indicates which fields in the provided imported 'items' to
   * update. If not set, will by default update all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest(data: any): GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1InputConfig(data["inputConfig"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest(data: any): GoogleCloudRecommendationengineV1beta1ImportCatalogItemsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1InputConfig(data["inputConfig"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response of the ImportCatalogItemsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRecommendationengineV1beta1ImportCatalogItemsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudRecommendationengineV1beta1ImportErrorsConfig {
  /**
   * Google Cloud Storage path for import errors. This must be an empty,
   * existing Cloud Storage bucket. Import errors will be written to a file in
   * this bucket, one per line, as a JSON-encoded `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRecommendationengineV1beta1ImportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Name of the operation.
   */
  operationName?: string;
  /**
   * Id of the request / operation. This is parroting back the requestId that
   * was passed in the request.
   */
  requestId?: string;
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

function serializeGoogleCloudRecommendationengineV1beta1ImportMetadata(data: any): GoogleCloudRecommendationengineV1beta1ImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ImportMetadata(data: any): GoogleCloudRecommendationengineV1beta1ImportMetadata {
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
export interface GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest {
  /**
   * Optional. The desired location of errors incurred during the Import.
   */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /**
   * Required. The desired input location of the data.
   */
  inputConfig?: GoogleCloudRecommendationengineV1beta1InputConfig;
  /**
   * Optional. Unique identifier provided by client, within the ancestor
   * dataset scope. Ensures idempotency for expensive long running operations.
   * Server-generated if unspecified. Up to 128 characters long. This is
   * returned as google.longrunning.Operation.name in the response. Note that
   * this field must not be set if the desired input config is
   * catalog_inline_source.
   */
  requestId?: string;
}

function serializeGoogleCloudRecommendationengineV1beta1ImportUserEventsRequest(data: any): GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1InputConfig(data["inputConfig"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ImportUserEventsRequest(data: any): GoogleCloudRecommendationengineV1beta1ImportUserEventsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1InputConfig(data["inputConfig"]) : undefined,
  };
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorsConfig?: GoogleCloudRecommendationengineV1beta1ImportErrorsConfig;
  /**
   * Aggregated statistics of user event import status.
   */
  importSummary?: GoogleCloudRecommendationengineV1beta1UserEventImportSummary;
}

function serializeGoogleCloudRecommendationengineV1beta1ImportUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1UserEventImportSummary(data["importSummary"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ImportUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1ImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1UserEventImportSummary(data["importSummary"]) : undefined,
  };
}

/**
 * The input config source.
 */
export interface GoogleCloudRecommendationengineV1beta1InputConfig {
  /**
   * BigQuery input source.
   */
  bigQuerySource?: GoogleCloudRecommendationengineV1beta1BigQuerySource;
  /**
   * The Inline source for the input content for Catalog items.
   */
  catalogInlineSource?: GoogleCloudRecommendationengineV1beta1CatalogInlineSource;
  /**
   * Google Cloud Storage location for the input content.
   */
  gcsSource?: GoogleCloudRecommendationengineV1beta1GcsSource;
  /**
   * The Inline source for the input content for UserEvents.
   */
  userEventInlineSource?: GoogleCloudRecommendationengineV1beta1UserEventInlineSource;
}

function serializeGoogleCloudRecommendationengineV1beta1InputConfig(data: any): GoogleCloudRecommendationengineV1beta1InputConfig {
  return {
    ...data,
    catalogInlineSource: data["catalogInlineSource"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1CatalogInlineSource(data["catalogInlineSource"]) : undefined,
    userEventInlineSource: data["userEventInlineSource"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1UserEventInlineSource(data["userEventInlineSource"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1InputConfig(data: any): GoogleCloudRecommendationengineV1beta1InputConfig {
  return {
    ...data,
    catalogInlineSource: data["catalogInlineSource"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1CatalogInlineSource(data["catalogInlineSource"]) : undefined,
    userEventInlineSource: data["userEventInlineSource"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1UserEventInlineSource(data["userEventInlineSource"]) : undefined,
  };
}

/**
 * Response message for ListCatalogItems method.
 */
export interface GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse {
  /**
   * The catalog items.
   */
  catalogItems?: GoogleCloudRecommendationengineV1beta1CatalogItem[];
  /**
   * If empty, the list is complete. If nonempty, the token to pass to the next
   * request's ListCatalogItemRequest.page_token.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse(data: any): GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse {
  return {
    ...data,
    catalogItems: data["catalogItems"] !== undefined ? data["catalogItems"].map((item: any) => (serializeGoogleCloudRecommendationengineV1beta1CatalogItem(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse(data: any): GoogleCloudRecommendationengineV1beta1ListCatalogItemsResponse {
  return {
    ...data,
    catalogItems: data["catalogItems"] !== undefined ? data["catalogItems"].map((item: any) => (deserializeGoogleCloudRecommendationengineV1beta1CatalogItem(item))) : undefined,
  };
}

/**
 * Response for ListCatalogs method.
 */
export interface GoogleCloudRecommendationengineV1beta1ListCatalogsResponse {
  /**
   * Output only. All the customer's catalogs.
   */
  readonly catalogs?: GoogleCloudRecommendationengineV1beta1Catalog[];
  /**
   * Pagination token, if not returned indicates the last page.
   */
  nextPageToken?: string;
}

/**
 * Response message for the `ListPredictionApiKeyRegistrations`.
 */
export interface GoogleCloudRecommendationengineV1beta1ListPredictionApiKeyRegistrationsResponse {
  /**
   * If empty, the list is complete. If nonempty, pass the token to the next
   * request's `ListPredictionApiKeysRegistrationsRequest.pageToken`.
   */
  nextPageToken?: string;
  /**
   * The list of registered API keys.
   */
  predictionApiKeyRegistrations?: GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration[];
}

/**
 * Response message for ListUserEvents method.
 */
export interface GoogleCloudRecommendationengineV1beta1ListUserEventsResponse {
  /**
   * If empty, the list is complete. If nonempty, the token to pass to the next
   * request's ListUserEvents.page_token.
   */
  nextPageToken?: string;
  /**
   * The user events.
   */
  userEvents?: GoogleCloudRecommendationengineV1beta1UserEvent[];
}

function serializeGoogleCloudRecommendationengineV1beta1ListUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1ListUserEventsResponse {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (serializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ListUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1ListUserEventsResponse {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (deserializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

/**
 * Registered Api Key.
 */
export interface GoogleCloudRecommendationengineV1beta1PredictionApiKeyRegistration {
  /**
   * The API key.
   */
  apiKey?: string;
}

/**
 * Request message for Predict method. Full resource name of the format:
 * `{name=projects/*\/locations/global/catalogs/default_catalog/eventStores/default_event_store/placements/*}`
 * The id of the recommendation engine placement. This id is used to identify
 * the set of models that will be used to make the prediction. We currently
 * support three placements with the following IDs by default: // *
 * `shopping_cart`: Predicts items frequently bought together with one or more
 * catalog items in the same shopping session. Commonly displayed after
 * `add-to-cart` event, on product detail pages, or on the shopping cart page. *
 * `home_page`: Predicts the next product that a user will most likely engage
 * with or purchase based on the shopping or viewing history of the specified
 * `userId` or `visitorId`. For example - Recommendations for you. *
 * `product_detail`: Predicts the next product that a user will most likely
 * engage with or purchase. The prediction is based on the shopping or viewing
 * history of the specified `userId` or `visitorId` and its relevance to a
 * specified `CatalogItem`. Typically used on product detail pages. For example
 * - More items like this. * `recently_viewed_default`: Returns up to 75 items
 * recently viewed by the specified `userId` or `visitorId`, most recent ones
 * first. Returns nothing if neither of them has viewed any items yet. For
 * example - Recently viewed. The full list of available placements can be seen
 * at
 * https://console.cloud.google.com/recommendation/catalogs/default_catalog/placements
 */
export interface GoogleCloudRecommendationengineV1beta1PredictRequest {
  /**
   * Optional. Use dryRun mode for this prediction query. If set to true, a
   * fake model will be used that returns arbitrary catalog items. Note that the
   * dryRun mode should only be used for testing the API, or if the model is not
   * ready.
   */
  dryRun?: boolean;
  /**
   * Optional. Filter for restricting prediction results. Accepts values for
   * tags and the `filterOutOfStockItems` flag. * Tag expressions. Restricts
   * predictions to items that match all of the specified tags. Boolean
   * operators `OR` and `NOT` are supported if the expression is enclosed in
   * parentheses, and must be separated from the tag values by a space.
   * `-"tagA"` is also supported and is equivalent to `NOT "tagA"`. Tag values
   * must be double quoted UTF-8 encoded strings with a size limit of 1 KiB. *
   * filterOutOfStockItems. Restricts predictions to items that do not have a
   * stockState value of OUT_OF_STOCK. Examples: * tag=("Red" OR "Blue")
   * tag="New-Arrival" tag=(NOT "promotional") * filterOutOfStockItems
   * tag=(-"promotional") * filterOutOfStockItems If your filter blocks all
   * prediction results, nothing will be returned. If you want generic
   * (unfiltered) popular items to be returned instead, set `strictFiltering` to
   * false in `PredictRequest.params`.
   */
  filter?: string;
  /**
   * Optional. The labels for the predict request. * Label keys can contain
   * lowercase letters, digits and hyphens, must start with a letter, and must
   * end with a letter or digit. * Non-zero label values can contain lowercase
   * letters, digits and hyphens, must start with a letter, and must end with a
   * letter or digit. * No more than 64 labels can be associated with a given
   * request. See https://goo.gl/xmQnxf for more information on and examples of
   * labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Maximum number of results to return per page. Set this property
   * to the number of prediction results required. If zero, the service will
   * choose a reasonable default.
   */
  pageSize?: number;
  /**
   * Optional. The previous PredictResponse.next_page_token.
   */
  pageToken?: string;
  /**
   * Optional. Additional domain specific parameters for the predictions.
   * Allowed values: * `returnCatalogItem`: Boolean. If set to true, the
   * associated catalogItem object will be returned in the
   * `PredictResponse.PredictionResult.itemMetadata` object in the method
   * response. * `returnItemScore`: Boolean. If set to true, the prediction
   * 'score' corresponding to each returned item will be set in the `metadata`
   * field in the prediction response. The given 'score' indicates the
   * probability of an item being clicked/purchased given the user's context and
   * history. * `strictFiltering`: Boolean. True by default. If set to false,
   * the service will return generic (unfiltered) popular items instead of empty
   * if your filter blocks all prediction results. * `priceRerankLevel`: String.
   * Default empty. If set to be non-empty, then it needs to be one of
   * {'no-price-reranking', 'low-price-reranking', 'medium-price-reranking',
   * 'high-price-reranking'}. This gives request level control and adjust
   * prediction results based on product price. * `diversityLevel`: String.
   * Default empty. If set to be non-empty, then it needs to be one of
   * {'no-diversity', 'low-diversity', 'medium-diversity', 'high-diversity',
   * 'auto-diversity'}. This gives request level control and adjust prediction
   * results based on product category.
   */
  params?: {
    [key: string]: any
  };
  /**
   * Required. Context about the user, what they are looking at and what action
   * they took to trigger the predict request. Note that this user event detail
   * won't be ingested to userEvent logs. Thus, a separate userEvent write
   * request is required for event logging. Don't set UserInfo.visitor_id or
   * UserInfo.user_id to the same fixed ID for different users. If you are
   * trying to receive non-personalized recommendations (not recommended; this
   * can negatively impact model performance), instead set UserInfo.visitor_id
   * to a random unique ID and leave UserInfo.user_id unset.
   */
  userEvent?: GoogleCloudRecommendationengineV1beta1UserEvent;
}

function serializeGoogleCloudRecommendationengineV1beta1PredictRequest(data: any): GoogleCloudRecommendationengineV1beta1PredictRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? serializeGoogleCloudRecommendationengineV1beta1UserEvent(data["userEvent"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1PredictRequest(data: any): GoogleCloudRecommendationengineV1beta1PredictRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? deserializeGoogleCloudRecommendationengineV1beta1UserEvent(data["userEvent"]) : undefined,
  };
}

/**
 * Response message for predict method.
 */
export interface GoogleCloudRecommendationengineV1beta1PredictResponse {
  /**
   * True if the dryRun property was set in the request.
   */
  dryRun?: boolean;
  /**
   * IDs of items in the request that were missing from the catalog.
   */
  itemsMissingInCatalog?: string[];
  /**
   * Additional domain specific prediction response metadata.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * If empty, the list is complete. If nonempty, the token to pass to the next
   * request's PredictRequest.page_token.
   */
  nextPageToken?: string;
  /**
   * A unique recommendation token. This should be included in the user event
   * logs resulting from this recommendation, which enables accurate attribution
   * of recommendation model performance.
   */
  recommendationToken?: string;
  /**
   * A list of recommended items. The order represents the ranking (from the
   * most relevant item to the least).
   */
  results?: GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult[];
}

/**
 * PredictionResult represents the recommendation prediction results.
 */
export interface GoogleCloudRecommendationengineV1beta1PredictResponsePredictionResult {
  /**
   * ID of the recommended catalog item
   */
  id?: string;
  /**
   * Additional item metadata / annotations. Possible values: * `catalogItem`:
   * JSON representation of the catalogItem. Will be set if `returnCatalogItem`
   * is set to true in `PredictRequest.params`. * `score`: Prediction score in
   * double value. Will be set if `returnItemScore` is set to true in
   * `PredictRequest.params`.
   */
  itemMetadata?: {
    [key: string]: any
  };
}

/**
 * ProductCatalogItem captures item metadata specific to retail products.
 */
export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItem {
  /**
   * Optional. The available quantity of the item.
   */
  availableQuantity?: bigint;
  /**
   * Optional. Canonical URL directly linking to the item detail page with a
   * length limit of 5 KiB..
   */
  canonicalProductUri?: string;
  /**
   * Optional. A map to pass the costs associated with the product. For
   * example: {"manufacturing": 45.5} The profit of selling this item is
   * computed like so: * If 'exactPrice' is provided, profit = displayPrice -
   * sum(costs) * If 'priceRange' is provided, profit = minPrice - sum(costs)
   */
  costs?: {
    [key: string]: number
  };
  /**
   * Optional. Only required if the price is set. Currency code for
   * price/costs. Use three-character ISO-4217 code.
   */
  currencyCode?: string;
  /**
   * Optional. The exact product price.
   */
  exactPrice?: GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice;
  /**
   * Optional. Product images for the catalog item.
   */
  images?: GoogleCloudRecommendationengineV1beta1Image[];
  /**
   * Optional. The product price range.
   */
  priceRange?: GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange;
  /**
   * Optional. Online stock state of the catalog item. Default is `IN_STOCK`.
   */
  stockState?:  | "STOCK_STATE_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER";
}

function serializeGoogleCloudRecommendationengineV1beta1ProductCatalogItem(data: any): GoogleCloudRecommendationengineV1beta1ProductCatalogItem {
  return {
    ...data,
    availableQuantity: data["availableQuantity"] !== undefined ? String(data["availableQuantity"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1ProductCatalogItem(data: any): GoogleCloudRecommendationengineV1beta1ProductCatalogItem {
  return {
    ...data,
    availableQuantity: data["availableQuantity"] !== undefined ? BigInt(data["availableQuantity"]) : undefined,
  };
}

/**
 * Exact product price.
 */
export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItemExactPrice {
  /**
   * Optional. Display price of the product.
   */
  displayPrice?: number;
  /**
   * Optional. Price of the product without any discount. If zero, by default
   * set to be the 'displayPrice'.
   */
  originalPrice?: number;
}

/**
 * Product price range when there are a range of prices for different
 * variations of the same product.
 */
export interface GoogleCloudRecommendationengineV1beta1ProductCatalogItemPriceRange {
  /**
   * Required. The maximum product price.
   */
  max?: number;
  /**
   * Required. The minimum product price.
   */
  min?: number;
}

/**
 * Detailed product information associated with a user event.
 */
export interface GoogleCloudRecommendationengineV1beta1ProductDetail {
  /**
   * Optional. Quantity of the products in stock when a user event happens.
   * Optional. If provided, this overrides the available quantity in Catalog for
   * this event. and can only be set if `stock_status` is set to `IN_STOCK`.
   * Note that if an item is out of stock, you must set the `stock_state` field
   * to be `OUT_OF_STOCK`. Leaving this field unspecified / as zero is not
   * sufficient to mark the item out of stock.
   */
  availableQuantity?: number;
  /**
   * Optional. Currency code for price/costs. Use three-character ISO-4217
   * code. Required only if originalPrice or displayPrice is set.
   */
  currencyCode?: string;
  /**
   * Optional. Display price of the product (e.g. discounted price). If
   * provided, this will override the display price in Catalog for this product.
   */
  displayPrice?: number;
  /**
   * Required. Catalog item ID. UTF-8 encoded string with a length limit of 128
   * characters.
   */
  id?: string;
  /**
   * Optional. Extra features associated with a product in the user event.
   */
  itemAttributes?: GoogleCloudRecommendationengineV1beta1FeatureMap;
  /**
   * Optional. Original price of the product. If provided, this will override
   * the original price in Catalog for this product.
   */
  originalPrice?: number;
  /**
   * Optional. Quantity of the product associated with the user event. For
   * example, this field will be 2 if two products are added to the shopping
   * cart for `add-to-cart` event. Required for `add-to-cart`, `add-to-list`,
   * `remove-from-cart`, `checkout-start`, `purchase-complete`, `refund` event
   * types.
   */
  quantity?: number;
  /**
   * Optional. Item stock state. If provided, this overrides the stock state in
   * Catalog for items in this event.
   */
  stockState?:  | "STOCK_STATE_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER";
}

/**
 * ProductEventDetail captures user event information specific to retail
 * products.
 */
export interface GoogleCloudRecommendationengineV1beta1ProductEventDetail {
  /**
   * Optional. The id or name of the associated shopping cart. This id is used
   * to associate multiple items added or present in the cart before purchase.
   * This can only be set for `add-to-cart`, `remove-from-cart`,
   * `checkout-start`, `purchase-complete`, or `shopping-cart-page-view` events.
   */
  cartId?: string;
  /**
   * Required for `add-to-list` and `remove-from-list` events. The id or name
   * of the list that the item is being added to or removed from. Other event
   * types should not set this field.
   */
  listId?: string;
  /**
   * Required for `category-page-view` events. At least one of search_query or
   * page_categories is required for `search` events. Other event types should
   * not set this field. The categories associated with a category page.
   * Category pages include special pages such as sales or promotions. For
   * instance, a special sale page may have the category hierarchy: categories :
   * ["Sales", "2017 Black Friday Deals"].
   */
  pageCategories?: GoogleCloudRecommendationengineV1beta1CatalogItemCategoryHierarchy[];
  /**
   * The main product details related to the event. This field is required for
   * the following event types: * `add-to-cart` * `add-to-list` *
   * `checkout-start` * `detail-page-view` * `purchase-complete` * `refund` *
   * `remove-from-cart` * `remove-from-list` This field is optional for the
   * following event types: * `page-visit` * `shopping-cart-page-view` - note
   * that 'product_details' should be set for this unless the shopping cart is
   * empty. * `search` (highly encouraged) In a `search` event, this field
   * represents the products returned to the end user on the current page (the
   * end user may have not finished broswing the whole page yet). When a new
   * page is returned to the end user, after pagination/filtering/ordering even
   * for the same query, a new SEARCH event with different product_details is
   * desired. The end user may have not finished broswing the whole page yet.
   * This field is not allowed for the following event types: *
   * `category-page-view` * `home-page-view`
   */
  productDetails?: GoogleCloudRecommendationengineV1beta1ProductDetail[];
  /**
   * Optional. A transaction represents the entire purchase transaction.
   * Required for `purchase-complete` events. Optional for `checkout-start`
   * events. Other event types should not set this field.
   */
  purchaseTransaction?: GoogleCloudRecommendationengineV1beta1PurchaseTransaction;
  /**
   * At least one of search_query or page_categories is required for `search`
   * events. Other event types should not set this field. The user's search
   * query as UTF-8 encoded text with a length limit of 5 KiB.
   */
  searchQuery?: string;
}

/**
 * A transaction represents the entire purchase transaction.
 */
export interface GoogleCloudRecommendationengineV1beta1PurchaseTransaction {
  /**
   * Optional. All the costs associated with the product. These can be
   * manufacturing costs, shipping expenses not borne by the end user, or any
   * other costs. Total product cost such that profit = revenue - (sum(taxes) +
   * sum(costs)) If product_cost is not set, then profit = revenue - tax -
   * shipping - sum(CatalogItem.costs). If CatalogItem.cost is not specified for
   * one of the items, CatalogItem.cost based profit *cannot* be calculated for
   * this Transaction.
   */
  costs?: {
    [key: string]: number
  };
  /**
   * Required. Currency code. Use three-character ISO-4217 code. This field is
   * not required if the event type is `refund`.
   */
  currencyCode?: string;
  /**
   * Optional. The transaction ID with a length limit of 128 bytes.
   */
  id?: string;
  /**
   * Required. Total revenue or grand total associated with the transaction.
   * This value include shipping, tax, or other adjustments to total revenue
   * that you want to include as part of your revenue calculations. This field
   * is not required if the event type is `refund`.
   */
  revenue?: number;
  /**
   * Optional. All the taxes associated with the transaction.
   */
  taxes?: {
    [key: string]: number
  };
}

/**
 * Metadata related to the progress of the PurgeUserEvents operation. This will
 * be returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * The ID of the request / operation.
   */
  operationName?: string;
}

function serializeGoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata(data: any): GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata(data: any): GoogleCloudRecommendationengineV1beta1PurgeUserEventsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Request message for PurgeUserEvents method.
 */
export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsRequest {
  /**
   * Required. The filter string to specify the events to be deleted. Empty
   * string filter is not allowed. The eligible fields for filtering are: *
   * `eventType`: UserEvent.eventType field of type string. * `eventTime`: in
   * ISO 8601 "zulu" format. * `visitorId`: field of type string. Specifying
   * this will delete all events associated with a visitor. * `userId`: field of
   * type string. Specifying this will delete all events associated with a user.
   * Examples: * Deleting all events in a time range: `eventTime >
   * "2012-04-23T18:25:43.511Z" eventTime < "2012-04-23T18:30:43.511Z"` *
   * Deleting specific eventType in time range: `eventTime >
   * "2012-04-23T18:25:43.511Z" eventType = "detail-page-view"` * Deleting all
   * events for a specific visitor: `visitorId = "visitor1024"` The filtering
   * fields are assumed to have an implicit AND.
   */
  filter?: string;
  /**
   * Optional. The default value is false. Override this flag to true to
   * actually perform the purge. If the field is not set to true, a sampling of
   * events to be deleted will be returned.
   */
  force?: boolean;
}

/**
 * Response of the PurgeUserEventsRequest. If the long running operation is
 * successfully done, then this message is returned by the
 * google.longrunning.Operations.response field.
 */
export interface GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse {
  /**
   * The total count of events purged as a result of the operation.
   */
  purgedEventsCount?: bigint;
  /**
   * A sampling of events deleted (or will be deleted) depending on the `force`
   * property in the request. Max of 500 items will be returned.
   */
  userEventsSample?: GoogleCloudRecommendationengineV1beta1UserEvent[];
}

function serializeGoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? String(data["purgedEventsCount"]) : undefined,
    userEventsSample: data["userEventsSample"] !== undefined ? data["userEventsSample"].map((item: any) => (serializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1PurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? BigInt(data["purgedEventsCount"]) : undefined,
    userEventsSample: data["userEventsSample"] !== undefined ? data["userEventsSample"].map((item: any) => (deserializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

/**
 * Metadata for RejoinUserEvents method.
 */
export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsMetadata {
}

/**
 * Request message for CatalogRejoin method.
 */
export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsRequest {
  /**
   * Required. The type of the catalog rejoin to define the scope and range of
   * the user events to be rejoined with catalog items.
   */
  userEventRejoinScope?:  | "USER_EVENT_REJOIN_SCOPE_UNSPECIFIED" | "JOINED_EVENTS" | "UNJOINED_EVENTS";
}

/**
 * Response message for RejoinUserEvents method.
 */
export interface GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse {
  /**
   * Number of user events that were joined with latest catalog items.
   */
  rejoinedUserEventsCount?: bigint;
}

function serializeGoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? String(data["rejoinedUserEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse(data: any): GoogleCloudRecommendationengineV1beta1RejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? BigInt(data["rejoinedUserEventsCount"]) : undefined,
  };
}

/**
 * UserEvent captures all metadata information recommendation engine needs to
 * know about how end users interact with customers' website.
 */
export interface GoogleCloudRecommendationengineV1beta1UserEvent {
  /**
   * Optional. User event detailed information common across different
   * recommendation types.
   */
  eventDetail?: GoogleCloudRecommendationengineV1beta1EventDetail;
  /**
   * Optional. This field should *not* be set when using JavaScript pixel or
   * the Recommendations AI Tag. Defaults to `EVENT_SOURCE_UNSPECIFIED`.
   */
  eventSource?:  | "EVENT_SOURCE_UNSPECIFIED" | "AUTOML" | "ECOMMERCE" | "BATCH_UPLOAD";
  /**
   * Optional. Only required for ImportUserEvents method. Timestamp of user
   * event created.
   */
  eventTime?: Date;
  /**
   * Required. User event type. Allowed values are: * `add-to-cart` Products
   * being added to cart. * `add-to-list` Items being added to a list (shopping
   * list, favorites etc). * `category-page-view` Special pages such as sale or
   * promotion pages viewed. * `checkout-start` User starting a checkout
   * process. * `detail-page-view` Products detail page viewed. *
   * `home-page-view` Homepage viewed. * `page-visit` Generic page visits not
   * included in the event types above. * `purchase-complete` User finishing a
   * purchase. * `refund` Purchased items being refunded or returned. *
   * `remove-from-cart` Products being removed from cart. * `remove-from-list`
   * Items being removed from a list. * `search` Product search. *
   * `shopping-cart-page-view` User viewing a shopping cart. * `impression` List
   * of items displayed. Used by Google Tag Manager.
   */
  eventType?: string;
  /**
   * Optional. Retail product specific user event metadata. This field is
   * required for the following event types: * `add-to-cart` * `add-to-list` *
   * `category-page-view` * `checkout-start` * `detail-page-view` *
   * `purchase-complete` * `refund` * `remove-from-cart` * `remove-from-list` *
   * `search` This field is optional for the following event types: *
   * `page-visit` * `shopping-cart-page-view` - note that 'product_event_detail'
   * should be set for this unless the shopping cart is empty. This field is not
   * allowed for the following event types: * `home-page-view`
   */
  productEventDetail?: GoogleCloudRecommendationengineV1beta1ProductEventDetail;
  /**
   * Required. User information.
   */
  userInfo?: GoogleCloudRecommendationengineV1beta1UserInfo;
}

function serializeGoogleCloudRecommendationengineV1beta1UserEvent(data: any): GoogleCloudRecommendationengineV1beta1UserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1UserEvent(data: any): GoogleCloudRecommendationengineV1beta1UserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * A summary of import result. The UserEventImportSummary summarizes the import
 * status for user events.
 */
export interface GoogleCloudRecommendationengineV1beta1UserEventImportSummary {
  /**
   * Count of user events imported with complete existing catalog information.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with catalog information not found in
   * the imported catalog.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudRecommendationengineV1beta1UserEventImportSummary(data: any): GoogleCloudRecommendationengineV1beta1UserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1UserEventImportSummary(data: any): GoogleCloudRecommendationengineV1beta1UserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * The inline source for the input config for ImportUserEvents method.
 */
export interface GoogleCloudRecommendationengineV1beta1UserEventInlineSource {
  /**
   * Optional. A list of user events to import. Recommended max of 10k items.
   */
  userEvents?: GoogleCloudRecommendationengineV1beta1UserEvent[];
}

function serializeGoogleCloudRecommendationengineV1beta1UserEventInlineSource(data: any): GoogleCloudRecommendationengineV1beta1UserEventInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (serializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommendationengineV1beta1UserEventInlineSource(data: any): GoogleCloudRecommendationengineV1beta1UserEventInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (deserializeGoogleCloudRecommendationengineV1beta1UserEvent(item))) : undefined,
  };
}

/**
 * Information of end users.
 */
export interface GoogleCloudRecommendationengineV1beta1UserInfo {
  /**
   * Optional. Indicates if the request is made directly from the end user in
   * which case the user_agent and ip_address fields can be populated from the
   * HTTP request. This should *not* be set when using the javascript pixel.
   * This flag should be set only if the API request is made directly from the
   * end user such as a mobile app (and not if a gateway or a server is
   * processing and pushing the user events).
   */
  directUserRequest?: boolean;
  /**
   * Optional. IP address of the user. This could be either IPv4 (e.g.
   * 104.133.9.80) or IPv6 (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334). This
   * should *not* be set when using the javascript pixel or if
   * `direct_user_request` is set. Used to extract location information for
   * personalization.
   */
  ipAddress?: string;
  /**
   * Optional. User agent as included in the HTTP header. UTF-8 encoded string
   * with a length limit of 1 KiB. This should *not* be set when using the
   * JavaScript pixel or if `directUserRequest` is set.
   */
  userAgent?: string;
  /**
   * Optional. Unique identifier for logged-in user with a length limit of 128
   * bytes. Required only for logged-in users. Don't set for anonymous users.
   * Don't set the field to the same fixed ID for different users. This mixes
   * the event history of those users together, which results in degraded model
   * quality.
   */
  userId?: string;
  /**
   * Required. A unique identifier for tracking visitors with a length limit of
   * 128 bytes. For example, this could be implemented with an HTTP cookie,
   * which should be able to uniquely identify a visitor on a single device.
   * This unique identifier should not change if the visitor logs in or out of
   * the website. Maximum length 128 bytes. Cannot be empty. Don't set the field
   * to the same fixed ID for different users. This mixes the event history of
   * those users together, which results in degraded model quality.
   */
  visitorId?: string;
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
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsCatalogItemsList.
 */
export interface ProjectsLocationsCatalogsCatalogItemsListOptions {
  /**
   * Optional. Use of this field is not supported by version v1beta1.
   */
  filter?: string;
  /**
   * Optional. Maximum number of results to return per page. If zero, the
   * service will choose a reasonable default.
   */
  pageSize?: number;
  /**
   * Optional. The previous ListCatalogItemsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsCatalogItemsPatch.
 */
export interface ProjectsLocationsCatalogsCatalogItemsPatchOptions {
  /**
   * Optional. Indicates which fields in the provided 'item' to update. If not
   * set, will by default update all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsCatalogItemsPatchOptions(data: any): ProjectsLocationsCatalogsCatalogItemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsCatalogItemsPatchOptions(data: any): ProjectsLocationsCatalogsCatalogItemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsEventStoresOperationsList.
 */
export interface ProjectsLocationsCatalogsEventStoresOperationsListOptions {
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
 * recommendationengine#projectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsList.
 */
export interface ProjectsLocationsCatalogsEventStoresPredictionApiKeyRegistrationsListOptions {
  /**
   * Optional. Maximum number of results to return per page. If unset, the
   * service will choose a reasonable default.
   */
  pageSize?: number;
  /**
   * Optional. The previous `ListPredictionApiKeyRegistration.nextPageToken`.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsEventStoresUserEventsCollect.
 */
export interface ProjectsLocationsCatalogsEventStoresUserEventsCollectOptions {
  /**
   * Optional. The event timestamp in milliseconds. This prevents browser
   * caching of otherwise identical get requests. The name is abbreviated to
   * reduce the payload bytes.
   */
  ets?: bigint;
  /**
   * Optional. The url including cgi-parameters but excluding the hash
   * fragment. The URL must be truncated to 1.5K bytes to conservatively be
   * under the 2K bytes. This is often more useful than the referer url, because
   * many browsers only send the domain for 3rd party requests.
   */
  uri?: string;
  /**
   * Required. URL encoded UserEvent proto.
   */
  userEvent?: string;
}

function serializeProjectsLocationsCatalogsEventStoresUserEventsCollectOptions(data: any): ProjectsLocationsCatalogsEventStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? String(data["ets"]) : undefined,
  };
}

function deserializeProjectsLocationsCatalogsEventStoresUserEventsCollectOptions(data: any): ProjectsLocationsCatalogsEventStoresUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? BigInt(data["ets"]) : undefined,
  };
}

/**
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsEventStoresUserEventsList.
 */
export interface ProjectsLocationsCatalogsEventStoresUserEventsListOptions {
  /**
   * Optional. Filtering expression to specify restrictions over returned
   * events. This is a sequence of terms, where each term applies some kind of a
   * restriction to the returned user events. Use this expression to restrict
   * results to a specific time range, or filter events by eventType. eg:
   * eventTime > "2012-04-23T18:25:43.511Z" eventsMissingCatalogItems
   * eventTime<"2012-04-23T18:25:43.511Z" eventType=search We expect only 3
   * types of fields: * eventTime: this can be specified a maximum of 2 times,
   * once with a less than operator and once with a greater than operator. The
   * eventTime restrict should result in one contiguous valid eventTime range. *
   * eventType: only 1 eventType restriction can be specified. *
   * eventsMissingCatalogItems: specififying this will restrict results to
   * events for which catalog items were not found in the catalog. The default
   * behavior is to return only those events for which catalog items were found.
   * Some examples of valid filters expressions: * Example 1: eventTime >
   * "2012-04-23T18:25:43.511Z" eventTime < "2012-04-23T18:30:43.511Z" * Example
   * 2: eventTime > "2012-04-23T18:25:43.511Z" eventType = detail-page-view *
   * Example 3: eventsMissingCatalogItems eventType = search eventTime <
   * "2018-04-23T18:30:43.511Z" * Example 4: eventTime >
   * "2012-04-23T18:25:43.511Z" * Example 5: eventType = search * Example 6:
   * eventsMissingCatalogItems
   */
  filter?: string;
  /**
   * Optional. Maximum number of results to return per page. If zero, the
   * service will choose a reasonable default.
   */
  pageSize?: number;
  /**
   * Optional. The previous ListUserEventsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for recommendationengine#projectsLocationsCatalogsList.
 */
export interface ProjectsLocationsCatalogsListOptions {
  /**
   * Optional. Maximum number of results to return. If unspecified, defaults to
   * 50. Max allowed value is 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListCatalogs` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * recommendationengine#projectsLocationsCatalogsOperationsList.
 */
export interface ProjectsLocationsCatalogsOperationsListOptions {
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
 * Additional options for recommendationengine#projectsLocationsCatalogsPatch.
 */
export interface ProjectsLocationsCatalogsPatchOptions {
  /**
   * Optional. Indicates which fields in the provided 'catalog' to update. If
   * not set, will only update the catalog_item_level_config field. Currently
   * only fields that can be updated are catalog_item_level_config.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsPatchOptions(data: any): ProjectsLocationsCatalogsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsPatchOptions(data: any): ProjectsLocationsCatalogsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
