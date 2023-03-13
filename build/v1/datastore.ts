// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Datastore API Client for Deno
 * ===================================
 * 
 * Accesses the schemaless NoSQL database to provide fully managed, robust, scalable storage for your application. 
 * 
 * Docs: https://cloud.google.com/datastore/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Accesses the schemaless NoSQL database to provide fully managed, robust,
 * scalable storage for your application.
 */
export class Datastore {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datastore.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Allocates IDs for the given keys, which is useful for referencing an
   * entity before it is inserted.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsAllocateIds(projectId: string, req: AllocateIdsRequest): Promise<AllocateIdsResponse> {
    req = serializeAllocateIdsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:allocateIds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAllocateIdsResponse(data);
  }

  /**
   * Begins a new transaction.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsBeginTransaction(projectId: string, req: BeginTransactionRequest): Promise<BeginTransactionResponse> {
    req = serializeBeginTransactionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:beginTransaction`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBeginTransactionResponse(data);
  }

  /**
   * Commits a transaction, optionally creating, deleting or modifying some
   * entities.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsCommit(projectId: string, req: CommitRequest): Promise<CommitResponse> {
    req = serializeCommitRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCommitResponse(data);
  }

  /**
   * Exports a copy of all or a subset of entities from Google Cloud Datastore
   * to another storage system, such as Google Cloud Storage. Recent updates to
   * entities may not be reflected in the export. The export occurs in the
   * background and its progress can be monitored and managed via the Operation
   * resource that is created. The output of an export may only be used once the
   * associated operation is done. If an export operation is cancelled before
   * completion it may leave partial data behind in Google Cloud Storage.
   *
   * @param projectId Required. Project ID against which to make the request.
   */
  async projectsExport(projectId: string, req: GoogleDatastoreAdminV1ExportEntitiesRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Imports entities into Google Cloud Datastore. Existing entities with the
   * same key are overwritten. The import occurs in the background and its
   * progress can be monitored and managed via the Operation resource that is
   * created. If an ImportEntities operation is cancelled, it is possible that a
   * subset of the data has already been imported to Cloud Datastore.
   *
   * @param projectId Required. Project ID against which to make the request.
   */
  async projectsImport(projectId: string, req: GoogleDatastoreAdminV1ImportEntitiesRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates the specified index. A newly created index's initial state is
   * `CREATING`. On completion of the returned google.longrunning.Operation, the
   * state will be `READY`. If the index already exists, the call will return an
   * `ALREADY_EXISTS` status. During index creation, the process could result in
   * an error, in which case the index will move to the `ERROR` state. The
   * process can be recovered by fixing the data that caused the error, removing
   * the index with delete, then re-creating the index with create. Indexes with
   * a single property cannot be created.
   *
   * @param projectId Project ID against which to make the request.
   */
  async projectsIndexesCreate(projectId: string, req: GoogleDatastoreAdminV1Index): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/indexes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an existing index. An index can only be deleted if it is in a
   * `READY` or `ERROR` state. On successful execution of the request, the index
   * will be in a `DELETING` state. And on completion of the returned
   * google.longrunning.Operation, the index will be removed. During index
   * deletion, the process could result in an error, in which case the index
   * will move to the `ERROR` state. The process can be recovered by fixing the
   * data that caused the error, followed by calling delete again.
   *
   * @param indexId The resource ID of the index to delete.
   * @param projectId Project ID against which to make the request.
   */
  async projectsIndexesDelete(indexId: string, projectId: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/indexes/${ indexId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an index.
   *
   * @param indexId The resource ID of the index to get.
   * @param projectId Project ID against which to make the request.
   */
  async projectsIndexesGet(indexId: string, projectId: string): Promise<GoogleDatastoreAdminV1Index> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/indexes/${ indexId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleDatastoreAdminV1Index;
  }

  /**
   * Lists the indexes that match the specified filters. Datastore uses an
   * eventually consistent query to fetch the list of indexes and may
   * occasionally return stale results.
   *
   * @param projectId Project ID against which to make the request.
   */
  async projectsIndexesList(projectId: string, opts: ProjectsIndexesListOptions = {}): Promise<GoogleDatastoreAdminV1ListIndexesResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/indexes`);
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
    return data as GoogleDatastoreAdminV1ListIndexesResponse;
  }

  /**
   * Looks up entities by key.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsLookup(projectId: string, req: LookupRequest): Promise<LookupResponse> {
    req = serializeLookupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:lookup`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLookupResponse(data);
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
  async projectsOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
  async projectsOperationsDelete(name: string): Promise<Empty> {
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
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
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
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
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
   * Prevents the supplied keys' IDs from being auto-allocated by Cloud
   * Datastore.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsReserveIds(projectId: string, req: ReserveIdsRequest): Promise<ReserveIdsResponse> {
    req = serializeReserveIdsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:reserveIds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReserveIdsResponse;
  }

  /**
   * Rolls back a transaction.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsRollback(projectId: string, req: RollbackRequest): Promise<RollbackResponse> {
    req = serializeRollbackRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RollbackResponse;
  }

  /**
   * Runs an aggregation query.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsRunAggregationQuery(projectId: string, req: RunAggregationQueryRequest): Promise<RunAggregationQueryResponse> {
    req = serializeRunAggregationQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:runAggregationQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRunAggregationQueryResponse(data);
  }

  /**
   * Queries for entities.
   *
   * @param projectId Required. The ID of the project against which to make the request.
   */
  async projectsRunQuery(projectId: string, req: RunQueryRequest): Promise<RunQueryResponse> {
    req = serializeRunQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }:runQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRunQueryResponse(data);
  }
}

/**
 * Defines a aggregation that produces a single result.
 */
export interface Aggregation {
  /**
   * Optional. Optional name of the property to store the result of the
   * aggregation. If not provided, Datastore will pick a default name following
   * the format `property_`. For example: ``` AGGREGATE COUNT_UP_TO(1) AS
   * count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3,
   * COUNT_UP_TO(4) OVER ( ... ); ``` becomes: ``` AGGREGATE COUNT_UP_TO(1) AS
   * count_up_to_1, COUNT_UP_TO(2) AS property_1, COUNT_UP_TO(3) AS
   * count_up_to_3, COUNT_UP_TO(4) AS property_2 OVER ( ... ); ``` Requires: *
   * Must be unique across all aggregation aliases. * Conform to entity property
   * name limitations.
   */
  alias?: string;
  /**
   * Count aggregator.
   */
  count?: Count;
}

function serializeAggregation(data: any): Aggregation {
  return {
    ...data,
    count: data["count"] !== undefined ? serializeCount(data["count"]) : undefined,
  };
}

function deserializeAggregation(data: any): Aggregation {
  return {
    ...data,
    count: data["count"] !== undefined ? deserializeCount(data["count"]) : undefined,
  };
}

/**
 * Datastore query for running an aggregation over a Query.
 */
export interface AggregationQuery {
  /**
   * Optional. Series of aggregations to apply over the results of the
   * `nested_query`. Requires: * A minimum of one and maximum of five
   * aggregations per query.
   */
  aggregations?: Aggregation[];
  /**
   * Nested query for aggregation
   */
  nestedQuery?: Query;
}

function serializeAggregationQuery(data: any): AggregationQuery {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (serializeAggregation(item))) : undefined,
    nestedQuery: data["nestedQuery"] !== undefined ? serializeQuery(data["nestedQuery"]) : undefined,
  };
}

function deserializeAggregationQuery(data: any): AggregationQuery {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (deserializeAggregation(item))) : undefined,
    nestedQuery: data["nestedQuery"] !== undefined ? deserializeQuery(data["nestedQuery"]) : undefined,
  };
}

/**
 * The result of a single bucket from a Datastore aggregation query. The keys
 * of `aggregate_properties` are the same for all results in an aggregation
 * query, unlike entity queries which can have different fields present for each
 * result.
 */
export interface AggregationResult {
  /**
   * The result of the aggregation functions, ex: `COUNT(*) AS total_entities`.
   * The key is the alias assigned to the aggregation function on input and the
   * size of this map equals the number of aggregation functions in the query.
   */
  aggregateProperties?: {
    [key: string]: Value
  };
}

function serializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    aggregateProperties: data["aggregateProperties"] !== undefined ? Object.fromEntries(Object.entries(data["aggregateProperties"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
  };
}

function deserializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    aggregateProperties: data["aggregateProperties"] !== undefined ? Object.fromEntries(Object.entries(data["aggregateProperties"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
  };
}

/**
 * A batch of aggregation results produced by an aggregation query.
 */
export interface AggregationResultBatch {
  /**
   * The aggregation results for this batch.
   */
  aggregationResults?: AggregationResult[];
  /**
   * The state of the query after the current batch. Only COUNT(*) aggregations
   * are supported in the initial launch. Therefore, expected result type is
   * limited to `NO_MORE_RESULTS`.
   */
  moreResults?:  | "MORE_RESULTS_TYPE_UNSPECIFIED" | "NOT_FINISHED" | "MORE_RESULTS_AFTER_LIMIT" | "MORE_RESULTS_AFTER_CURSOR" | "NO_MORE_RESULTS";
  /**
   * Read timestamp this batch was returned from. In a single transaction,
   * subsequent query result batches for the same query can have a greater
   * timestamp. Each batch's read timestamp is valid for all preceding batches.
   */
  readTime?: Date;
}

function serializeAggregationResultBatch(data: any): AggregationResultBatch {
  return {
    ...data,
    aggregationResults: data["aggregationResults"] !== undefined ? data["aggregationResults"].map((item: any) => (serializeAggregationResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeAggregationResultBatch(data: any): AggregationResultBatch {
  return {
    ...data,
    aggregationResults: data["aggregationResults"] !== undefined ? data["aggregationResults"].map((item: any) => (deserializeAggregationResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * The request for Datastore.AllocateIds.
 */
export interface AllocateIdsRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * Required. A list of keys with incomplete key paths for which to allocate
   * IDs. No key may be reserved/read-only.
   */
  keys?: Key[];
}

function serializeAllocateIdsRequest(data: any): AllocateIdsRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (serializeKey(item))) : undefined,
  };
}

function deserializeAllocateIdsRequest(data: any): AllocateIdsRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (deserializeKey(item))) : undefined,
  };
}

/**
 * The response for Datastore.AllocateIds.
 */
export interface AllocateIdsResponse {
  /**
   * The keys specified in the request (in the same order), each with its key
   * path completed with a newly allocated ID.
   */
  keys?: Key[];
}

function serializeAllocateIdsResponse(data: any): AllocateIdsResponse {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (serializeKey(item))) : undefined,
  };
}

function deserializeAllocateIdsResponse(data: any): AllocateIdsResponse {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (deserializeKey(item))) : undefined,
  };
}

/**
 * An array value.
 */
export interface ArrayValue {
  /**
   * Values in the array. The order of values in an array is preserved as long
   * as all values have identical settings for 'exclude_from_indexes'.
   */
  values?: Value[];
}

function serializeArrayValue(data: any): ArrayValue {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeValue(item))) : undefined,
  };
}

function deserializeArrayValue(data: any): ArrayValue {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeValue(item))) : undefined,
  };
}

/**
 * The request for Datastore.BeginTransaction.
 */
export interface BeginTransactionRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * Options for a new transaction.
   */
  transactionOptions?: TransactionOptions;
}

function serializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    transactionOptions: data["transactionOptions"] !== undefined ? serializeTransactionOptions(data["transactionOptions"]) : undefined,
  };
}

function deserializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    transactionOptions: data["transactionOptions"] !== undefined ? deserializeTransactionOptions(data["transactionOptions"]) : undefined,
  };
}

/**
 * The response for Datastore.BeginTransaction.
 */
export interface BeginTransactionResponse {
  /**
   * The transaction identifier (always present).
   */
  transaction?: Uint8Array;
}

function serializeBeginTransactionResponse(data: any): BeginTransactionResponse {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeBeginTransactionResponse(data: any): BeginTransactionResponse {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The request for Datastore.Commit.
 */
export interface CommitRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * The type of commit to perform. Defaults to `TRANSACTIONAL`.
   */
  mode?:  | "MODE_UNSPECIFIED" | "TRANSACTIONAL" | "NON_TRANSACTIONAL";
  /**
   * The mutations to perform. When mode is `TRANSACTIONAL`, mutations
   * affecting a single entity are applied in order. The following sequences of
   * mutations affecting a single entity are not permitted in a single `Commit`
   * request: - `insert` followed by `insert` - `update` followed by `insert` -
   * `upsert` followed by `insert` - `delete` followed by `update` When mode is
   * `NON_TRANSACTIONAL`, no two mutations may affect a single entity.
   */
  mutations?: Mutation[];
  /**
   * Options for beginning a new transaction for this request. The transaction
   * is committed when the request completes. If specified,
   * TransactionOptions.mode must be TransactionOptions.ReadWrite.
   */
  singleUseTransaction?: TransactionOptions;
  /**
   * The identifier of the transaction associated with the commit. A
   * transaction identifier is returned by a call to Datastore.BeginTransaction.
   */
  transaction?: Uint8Array;
}

function serializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    mutations: data["mutations"] !== undefined ? data["mutations"].map((item: any) => (serializeMutation(item))) : undefined,
    singleUseTransaction: data["singleUseTransaction"] !== undefined ? serializeTransactionOptions(data["singleUseTransaction"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    mutations: data["mutations"] !== undefined ? data["mutations"].map((item: any) => (deserializeMutation(item))) : undefined,
    singleUseTransaction: data["singleUseTransaction"] !== undefined ? deserializeTransactionOptions(data["singleUseTransaction"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The response for Datastore.Commit.
 */
export interface CommitResponse {
  /**
   * The transaction commit timestamp. Not set for non-transactional commits.
   */
  commitTime?: Date;
  /**
   * The number of index entries updated during the commit, or zero if none
   * were updated.
   */
  indexUpdates?: number;
  /**
   * The result of performing the mutations. The i-th mutation result
   * corresponds to the i-th mutation in the request.
   */
  mutationResults?: MutationResult[];
}

function serializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? data["commitTime"].toISOString() : undefined,
    mutationResults: data["mutationResults"] !== undefined ? data["mutationResults"].map((item: any) => (serializeMutationResult(item))) : undefined,
  };
}

function deserializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? new Date(data["commitTime"]) : undefined,
    mutationResults: data["mutationResults"] !== undefined ? data["mutationResults"].map((item: any) => (deserializeMutationResult(item))) : undefined,
  };
}

/**
 * A filter that merges multiple other filters using the given operator.
 */
export interface CompositeFilter {
  /**
   * The list of filters to combine. Requires: * At least one filter is
   * present.
   */
  filters?: Filter[];
  /**
   * The operator for combining multiple filters.
   */
  op?:  | "OPERATOR_UNSPECIFIED" | "AND" | "OR";
}

function serializeCompositeFilter(data: any): CompositeFilter {
  return {
    ...data,
    filters: data["filters"] !== undefined ? data["filters"].map((item: any) => (serializeFilter(item))) : undefined,
  };
}

function deserializeCompositeFilter(data: any): CompositeFilter {
  return {
    ...data,
    filters: data["filters"] !== undefined ? data["filters"].map((item: any) => (deserializeFilter(item))) : undefined,
  };
}

/**
 * Count of entities that match the query. The `COUNT(*)` aggregation function
 * operates on the entire entity so it does not require a field reference.
 */
export interface Count {
  /**
   * Optional. Optional constraint on the maximum number of entities to count.
   * This provides a way to set an upper bound on the number of entities to
   * scan, limiting latency and cost. Unspecified is interpreted as no bound. If
   * a zero value is provided, a count result of zero should always be expected.
   * High-Level Example: ``` AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT * FROM k
   * ); ``` Requires: * Must be non-negative when present.
   */
  upTo?: bigint;
}

function serializeCount(data: any): Count {
  return {
    ...data,
    upTo: data["upTo"] !== undefined ? String(data["upTo"]) : undefined,
  };
}

function deserializeCount(data: any): Count {
  return {
    ...data,
    upTo: data["upTo"] !== undefined ? BigInt(data["upTo"]) : undefined,
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
 * A Datastore data object. An entity is limited to 1 megabyte when stored.
 * That _roughly_ corresponds to a limit of 1 megabyte for the serialized form
 * of this message.
 */
export interface Entity {
  /**
   * The entity's key. An entity must have a key, unless otherwise documented
   * (for example, an entity in `Value.entity_value` may have no key). An
   * entity's kind is its key path's last element's kind, or null if it has no
   * key.
   */
  key?: Key;
  /**
   * The entity's properties. The map's keys are property names. A property
   * name matching regex `__.*__` is reserved. A reserved property name is
   * forbidden in certain documented contexts. The name must not contain more
   * than 500 characters. The name cannot be `""`.
   */
  properties?: {
    [key: string]: Value
  };
}

function serializeEntity(data: any): Entity {
  return {
    ...data,
    key: data["key"] !== undefined ? serializeKey(data["key"]) : undefined,
    properties: data["properties"] !== undefined ? Object.fromEntries(Object.entries(data["properties"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
  };
}

function deserializeEntity(data: any): Entity {
  return {
    ...data,
    key: data["key"] !== undefined ? deserializeKey(data["key"]) : undefined,
    properties: data["properties"] !== undefined ? Object.fromEntries(Object.entries(data["properties"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
  };
}

/**
 * The result of fetching an entity from Datastore.
 */
export interface EntityResult {
  /**
   * The time at which the entity was created. This field is set for `FULL`
   * entity results. If this entity is missing, this field will not be set.
   */
  createTime?: Date;
  /**
   * A cursor that points to the position after the result entity. Set only
   * when the `EntityResult` is part of a `QueryResultBatch` message.
   */
  cursor?: Uint8Array;
  /**
   * The resulting entity.
   */
  entity?: Entity;
  /**
   * The time at which the entity was last changed. This field is set for
   * `FULL` entity results. If this entity is missing, this field will not be
   * set.
   */
  updateTime?: Date;
  /**
   * The version of the entity, a strictly positive number that monotonically
   * increases with changes to the entity. This field is set for `FULL` entity
   * results. For missing entities in `LookupResponse`, this is the version of
   * the snapshot that was used to look up the entity, and it is always set
   * except for eventually consistent reads.
   */
  version?: bigint;
}

function serializeEntityResult(data: any): EntityResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    cursor: data["cursor"] !== undefined ? encodeBase64(data["cursor"]) : undefined,
    entity: data["entity"] !== undefined ? serializeEntity(data["entity"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeEntityResult(data: any): EntityResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    cursor: data["cursor"] !== undefined ? decodeBase64(data["cursor"] as string) : undefined,
    entity: data["entity"] !== undefined ? deserializeEntity(data["entity"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * A holder for any type of filter.
 */
export interface Filter {
  /**
   * A composite filter.
   */
  compositeFilter?: CompositeFilter;
  /**
   * A filter on a property.
   */
  propertyFilter?: PropertyFilter;
}

function serializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? serializeCompositeFilter(data["compositeFilter"]) : undefined,
    propertyFilter: data["propertyFilter"] !== undefined ? serializePropertyFilter(data["propertyFilter"]) : undefined,
  };
}

function deserializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? deserializeCompositeFilter(data["compositeFilter"]) : undefined,
    propertyFilter: data["propertyFilter"] !== undefined ? deserializePropertyFilter(data["propertyFilter"]) : undefined,
  };
}

/**
 * Metadata common to all Datastore Admin operations.
 */
export interface GoogleDatastoreAdminV1beta1CommonMetadata {
  /**
   * The time the operation ended, either successfully or otherwise.
   */
  endTime?: Date;
  /**
   * The client-assigned labels which were provided when the operation was
   * created. May also include additional labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The type of the operation. Can be used as a filter in
   * ListOperationsRequest.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "EXPORT_ENTITIES" | "IMPORT_ENTITIES";
  /**
   * The time that work began on the operation.
   */
  startTime?: Date;
  /**
   * The current state of the Operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
}

function serializeGoogleDatastoreAdminV1beta1CommonMetadata(data: any): GoogleDatastoreAdminV1beta1CommonMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1beta1CommonMetadata(data: any): GoogleDatastoreAdminV1beta1CommonMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Identifies a subset of entities in a project. This is specified as
 * combinations of kinds and namespaces (either or both of which may be all, as
 * described in the following examples). Example usage: Entire project:
 * kinds=[], namespace_ids=[] Kinds Foo and Bar in all namespaces: kinds=['Foo',
 * 'Bar'], namespace_ids=[] Kinds Foo and Bar only in the default namespace:
 * kinds=['Foo', 'Bar'], namespace_ids=[''] Kinds Foo and Bar in both the
 * default and Baz namespaces: kinds=['Foo', 'Bar'], namespace_ids=['', 'Baz']
 * The entire Baz namespace: kinds=[], namespace_ids=['Baz']
 */
export interface GoogleDatastoreAdminV1beta1EntityFilter {
  /**
   * If empty, then this represents all kinds.
   */
  kinds?: string[];
  /**
   * An empty list represents all namespaces. This is the preferred usage for
   * projects that don't use namespaces. An empty string element represents the
   * default namespace. This should be used if the project has data in
   * non-default namespaces, but doesn't want to include them. Each namespace in
   * this list must be unique.
   */
  namespaceIds?: string[];
}

/**
 * Metadata for ExportEntities operations.
 */
export interface GoogleDatastoreAdminV1beta1ExportEntitiesMetadata {
  /**
   * Metadata common to all Datastore Admin operations.
   */
  common?: GoogleDatastoreAdminV1beta1CommonMetadata;
  /**
   * Description of which entities are being exported.
   */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
  /**
   * Location for the export metadata and data files. This will be the same
   * value as the
   * google.datastore.admin.v1beta1.ExportEntitiesRequest.output_url_prefix
   * field. The final output location is provided in
   * google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url.
   */
  outputUrlPrefix?: string;
  /**
   * An estimate of the number of bytes processed.
   */
  progressBytes?: GoogleDatastoreAdminV1beta1Progress;
  /**
   * An estimate of the number of entities processed.
   */
  progressEntities?: GoogleDatastoreAdminV1beta1Progress;
}

function serializeGoogleDatastoreAdminV1beta1ExportEntitiesMetadata(data: any): GoogleDatastoreAdminV1beta1ExportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? serializeGoogleDatastoreAdminV1beta1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleDatastoreAdminV1beta1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? serializeGoogleDatastoreAdminV1beta1Progress(data["progressEntities"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1beta1ExportEntitiesMetadata(data: any): GoogleDatastoreAdminV1beta1ExportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1Progress(data["progressEntities"]) : undefined,
  };
}

/**
 * The response for
 * google.datastore.admin.v1beta1.DatastoreAdmin.ExportEntities.
 */
export interface GoogleDatastoreAdminV1beta1ExportEntitiesResponse {
  /**
   * Location of the output metadata file. This can be used to begin an import
   * into Cloud Datastore (this project or another project). See
   * google.datastore.admin.v1beta1.ImportEntitiesRequest.input_url. Only
   * present if the operation completed successfully.
   */
  outputUrl?: string;
}

/**
 * Metadata for ImportEntities operations.
 */
export interface GoogleDatastoreAdminV1beta1ImportEntitiesMetadata {
  /**
   * Metadata common to all Datastore Admin operations.
   */
  common?: GoogleDatastoreAdminV1beta1CommonMetadata;
  /**
   * Description of which entities are being imported.
   */
  entityFilter?: GoogleDatastoreAdminV1beta1EntityFilter;
  /**
   * The location of the import metadata file. This will be the same value as
   * the google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url field.
   */
  inputUrl?: string;
  /**
   * An estimate of the number of bytes processed.
   */
  progressBytes?: GoogleDatastoreAdminV1beta1Progress;
  /**
   * An estimate of the number of entities processed.
   */
  progressEntities?: GoogleDatastoreAdminV1beta1Progress;
}

function serializeGoogleDatastoreAdminV1beta1ImportEntitiesMetadata(data: any): GoogleDatastoreAdminV1beta1ImportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? serializeGoogleDatastoreAdminV1beta1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleDatastoreAdminV1beta1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? serializeGoogleDatastoreAdminV1beta1Progress(data["progressEntities"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1beta1ImportEntitiesMetadata(data: any): GoogleDatastoreAdminV1beta1ImportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? deserializeGoogleDatastoreAdminV1beta1Progress(data["progressEntities"]) : undefined,
  };
}

/**
 * Measures the progress of a particular metric.
 */
export interface GoogleDatastoreAdminV1beta1Progress {
  /**
   * The amount of work that has been completed. Note that this may be greater
   * than work_estimated.
   */
  workCompleted?: bigint;
  /**
   * An estimate of how much work needs to be performed. May be zero if the
   * work estimate is unavailable.
   */
  workEstimated?: bigint;
}

function serializeGoogleDatastoreAdminV1beta1Progress(data: any): GoogleDatastoreAdminV1beta1Progress {
  return {
    ...data,
    workCompleted: data["workCompleted"] !== undefined ? String(data["workCompleted"]) : undefined,
    workEstimated: data["workEstimated"] !== undefined ? String(data["workEstimated"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1beta1Progress(data: any): GoogleDatastoreAdminV1beta1Progress {
  return {
    ...data,
    workCompleted: data["workCompleted"] !== undefined ? BigInt(data["workCompleted"]) : undefined,
    workEstimated: data["workEstimated"] !== undefined ? BigInt(data["workEstimated"]) : undefined,
  };
}

/**
 * Metadata common to all Datastore Admin operations.
 */
export interface GoogleDatastoreAdminV1CommonMetadata {
  /**
   * The time the operation ended, either successfully or otherwise.
   */
  endTime?: Date;
  /**
   * The client-assigned labels which were provided when the operation was
   * created. May also include additional labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The type of the operation. Can be used as a filter in
   * ListOperationsRequest.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "EXPORT_ENTITIES" | "IMPORT_ENTITIES" | "CREATE_INDEX" | "DELETE_INDEX";
  /**
   * The time that work began on the operation.
   */
  startTime?: Date;
  /**
   * The current state of the Operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
}

function serializeGoogleDatastoreAdminV1CommonMetadata(data: any): GoogleDatastoreAdminV1CommonMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1CommonMetadata(data: any): GoogleDatastoreAdminV1CommonMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Metadata for Datastore to Firestore migration operations. The
 * DatastoreFirestoreMigration operation is not started by the end-user via an
 * explicit "creation" method. This is an intentional deviation from the LRO
 * design pattern. This singleton resource can be accessed at:
 * "projects/{project_id}/operations/datastore-firestore-migration"
 */
export interface GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata {
  /**
   * The current state of migration from Cloud Datastore to Cloud Firestore in
   * Datastore mode.
   */
  migrationState?:  | "MIGRATION_STATE_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETE";
  /**
   * The current step of migration from Cloud Datastore to Cloud Firestore in
   * Datastore mode.
   */
  migrationStep?:  | "MIGRATION_STEP_UNSPECIFIED" | "PREPARE" | "START" | "APPLY_WRITES_SYNCHRONOUSLY" | "COPY_AND_VERIFY" | "REDIRECT_EVENTUALLY_CONSISTENT_READS" | "REDIRECT_STRONGLY_CONSISTENT_READS" | "REDIRECT_WRITES";
}

/**
 * Identifies a subset of entities in a project. This is specified as
 * combinations of kinds and namespaces (either or both of which may be all, as
 * described in the following examples). Example usage: Entire project:
 * kinds=[], namespace_ids=[] Kinds Foo and Bar in all namespaces: kinds=['Foo',
 * 'Bar'], namespace_ids=[] Kinds Foo and Bar only in the default namespace:
 * kinds=['Foo', 'Bar'], namespace_ids=[''] Kinds Foo and Bar in both the
 * default and Baz namespaces: kinds=['Foo', 'Bar'], namespace_ids=['', 'Baz']
 * The entire Baz namespace: kinds=[], namespace_ids=['Baz']
 */
export interface GoogleDatastoreAdminV1EntityFilter {
  /**
   * If empty, then this represents all kinds.
   */
  kinds?: string[];
  /**
   * An empty list represents all namespaces. This is the preferred usage for
   * projects that don't use namespaces. An empty string element represents the
   * default namespace. This should be used if the project has data in
   * non-default namespaces, but doesn't want to include them. Each namespace in
   * this list must be unique.
   */
  namespaceIds?: string[];
}

/**
 * Metadata for ExportEntities operations.
 */
export interface GoogleDatastoreAdminV1ExportEntitiesMetadata {
  /**
   * Metadata common to all Datastore Admin operations.
   */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /**
   * Description of which entities are being exported.
   */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /**
   * Location for the export metadata and data files. This will be the same
   * value as the
   * google.datastore.admin.v1.ExportEntitiesRequest.output_url_prefix field.
   * The final output location is provided in
   * google.datastore.admin.v1.ExportEntitiesResponse.output_url.
   */
  outputUrlPrefix?: string;
  /**
   * An estimate of the number of bytes processed.
   */
  progressBytes?: GoogleDatastoreAdminV1Progress;
  /**
   * An estimate of the number of entities processed.
   */
  progressEntities?: GoogleDatastoreAdminV1Progress;
}

function serializeGoogleDatastoreAdminV1ExportEntitiesMetadata(data: any): GoogleDatastoreAdminV1ExportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? serializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleDatastoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? serializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1ExportEntitiesMetadata(data: any): GoogleDatastoreAdminV1ExportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? deserializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleDatastoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? deserializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

/**
 * The request for google.datastore.admin.v1.DatastoreAdmin.ExportEntities.
 */
export interface GoogleDatastoreAdminV1ExportEntitiesRequest {
  /**
   * Description of what data from the project is included in the export.
   */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /**
   * Client-assigned labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Location for the export metadata and data files. The full
   * resource URL of the external storage location. Currently, only Google Cloud
   * Storage is supported. So output_url_prefix should be of the form:
   * `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the
   * Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud Storage
   * namespace path (this is not a Cloud Datastore namespace). For more
   * information about Cloud Storage namespace paths, see [Object name
   * considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   * The resulting files will be nested deeper than the specified URL prefix.
   * The final output URL will be provided in the
   * google.datastore.admin.v1.ExportEntitiesResponse.output_url field. That
   * value should be used for subsequent ImportEntities operations. By nesting
   * the data files deeper, the same Cloud Storage bucket can be used in
   * multiple ExportEntities operations without conflict.
   */
  outputUrlPrefix?: string;
}

/**
 * The response for google.datastore.admin.v1.DatastoreAdmin.ExportEntities.
 */
export interface GoogleDatastoreAdminV1ExportEntitiesResponse {
  /**
   * Location of the output metadata file. This can be used to begin an import
   * into Cloud Datastore (this project or another project). See
   * google.datastore.admin.v1.ImportEntitiesRequest.input_url. Only present if
   * the operation completed successfully.
   */
  outputUrl?: string;
}

/**
 * Metadata for ImportEntities operations.
 */
export interface GoogleDatastoreAdminV1ImportEntitiesMetadata {
  /**
   * Metadata common to all Datastore Admin operations.
   */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /**
   * Description of which entities are being imported.
   */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /**
   * The location of the import metadata file. This will be the same value as
   * the google.datastore.admin.v1.ExportEntitiesResponse.output_url field.
   */
  inputUrl?: string;
  /**
   * An estimate of the number of bytes processed.
   */
  progressBytes?: GoogleDatastoreAdminV1Progress;
  /**
   * An estimate of the number of entities processed.
   */
  progressEntities?: GoogleDatastoreAdminV1Progress;
}

function serializeGoogleDatastoreAdminV1ImportEntitiesMetadata(data: any): GoogleDatastoreAdminV1ImportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? serializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleDatastoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? serializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1ImportEntitiesMetadata(data: any): GoogleDatastoreAdminV1ImportEntitiesMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? deserializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleDatastoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? deserializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

/**
 * The request for google.datastore.admin.v1.DatastoreAdmin.ImportEntities.
 */
export interface GoogleDatastoreAdminV1ImportEntitiesRequest {
  /**
   * Optionally specify which kinds/namespaces are to be imported. If provided,
   * the list must be a subset of the EntityFilter used in creating the export,
   * otherwise a FAILED_PRECONDITION error will be returned. If no filter is
   * specified then all entities from the export are imported.
   */
  entityFilter?: GoogleDatastoreAdminV1EntityFilter;
  /**
   * Required. The full resource URL of the external storage location.
   * Currently, only Google Cloud Storage is supported. So input_url should be
   * of the form:
   * `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where
   * `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is
   * an optional Cloud Storage namespace path (this is not a Cloud Datastore
   * namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written
   * by the ExportEntities operation. For more information about Cloud Storage
   * namespace paths, see [Object name
   * considerations](https://cloud.google.com/storage/docs/naming#object-considerations).
   * For more information, see
   * google.datastore.admin.v1.ExportEntitiesResponse.output_url.
   */
  inputUrl?: string;
  /**
   * Client-assigned labels.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * Datastore composite index definition.
 */
export interface GoogleDatastoreAdminV1Index {
  /**
   * Required. The index's ancestor mode. Must not be
   * ANCESTOR_MODE_UNSPECIFIED.
   */
  ancestor?:  | "ANCESTOR_MODE_UNSPECIFIED" | "NONE" | "ALL_ANCESTORS";
  /**
   * Output only. The resource ID of the index.
   */
  readonly indexId?: string;
  /**
   * Required. The entity kind to which this index applies.
   */
  kind?: string;
  /**
   * Output only. Project ID.
   */
  readonly projectId?: string;
  /**
   * Required. An ordered sequence of property names and their index
   * attributes. Requires: * A maximum of 100 properties.
   */
  properties?: GoogleDatastoreAdminV1IndexedProperty[];
  /**
   * Output only. The state of the index.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "ERROR";
}

/**
 * A property of an index.
 */
export interface GoogleDatastoreAdminV1IndexedProperty {
  /**
   * Required. The indexed property's direction. Must not be
   * DIRECTION_UNSPECIFIED.
   */
  direction?:  | "DIRECTION_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
  /**
   * Required. The property name to index.
   */
  name?: string;
}

/**
 * Metadata for Index operations.
 */
export interface GoogleDatastoreAdminV1IndexOperationMetadata {
  /**
   * Metadata common to all Datastore Admin operations.
   */
  common?: GoogleDatastoreAdminV1CommonMetadata;
  /**
   * The index resource ID that this operation is acting on.
   */
  indexId?: string;
  /**
   * An estimate of the number of entities processed.
   */
  progressEntities?: GoogleDatastoreAdminV1Progress;
}

function serializeGoogleDatastoreAdminV1IndexOperationMetadata(data: any): GoogleDatastoreAdminV1IndexOperationMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? serializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? serializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1IndexOperationMetadata(data: any): GoogleDatastoreAdminV1IndexOperationMetadata {
  return {
    ...data,
    common: data["common"] !== undefined ? deserializeGoogleDatastoreAdminV1CommonMetadata(data["common"]) : undefined,
    progressEntities: data["progressEntities"] !== undefined ? deserializeGoogleDatastoreAdminV1Progress(data["progressEntities"]) : undefined,
  };
}

/**
 * The response for google.datastore.admin.v1.DatastoreAdmin.ListIndexes.
 */
export interface GoogleDatastoreAdminV1ListIndexesResponse {
  /**
   * The indexes.
   */
  indexes?: GoogleDatastoreAdminV1Index[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * An event signifying the start of a new step in a [migration from Cloud
 * Datastore to Cloud Firestore in Datastore
 * mode](https://cloud.google.com/datastore/docs/upgrade-to-firestore).
 */
export interface GoogleDatastoreAdminV1MigrationProgressEvent {
  /**
   * Details for the `PREPARE` step.
   */
  prepareStepDetails?: GoogleDatastoreAdminV1PrepareStepDetails;
  /**
   * Details for the `REDIRECT_WRITES` step.
   */
  redirectWritesStepDetails?: GoogleDatastoreAdminV1RedirectWritesStepDetails;
  /**
   * The step that is starting. An event with step set to `START` indicates
   * that the migration has been reverted back to the initial pre-migration
   * state.
   */
  step?:  | "MIGRATION_STEP_UNSPECIFIED" | "PREPARE" | "START" | "APPLY_WRITES_SYNCHRONOUSLY" | "COPY_AND_VERIFY" | "REDIRECT_EVENTUALLY_CONSISTENT_READS" | "REDIRECT_STRONGLY_CONSISTENT_READS" | "REDIRECT_WRITES";
}

/**
 * An event signifying a change in state of a [migration from Cloud Datastore
 * to Cloud Firestore in Datastore
 * mode](https://cloud.google.com/datastore/docs/upgrade-to-firestore).
 */
export interface GoogleDatastoreAdminV1MigrationStateEvent {
  /**
   * The new state of the migration.
   */
  state?:  | "MIGRATION_STATE_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETE";
}

/**
 * Details for the `PREPARE` step.
 */
export interface GoogleDatastoreAdminV1PrepareStepDetails {
  /**
   * The concurrency mode this database will use when it reaches the
   * `REDIRECT_WRITES` step.
   */
  concurrencyMode?:  | "CONCURRENCY_MODE_UNSPECIFIED" | "PESSIMISTIC" | "OPTIMISTIC" | "OPTIMISTIC_WITH_ENTITY_GROUPS";
}

/**
 * Measures the progress of a particular metric.
 */
export interface GoogleDatastoreAdminV1Progress {
  /**
   * The amount of work that has been completed. Note that this may be greater
   * than work_estimated.
   */
  workCompleted?: bigint;
  /**
   * An estimate of how much work needs to be performed. May be zero if the
   * work estimate is unavailable.
   */
  workEstimated?: bigint;
}

function serializeGoogleDatastoreAdminV1Progress(data: any): GoogleDatastoreAdminV1Progress {
  return {
    ...data,
    workCompleted: data["workCompleted"] !== undefined ? String(data["workCompleted"]) : undefined,
    workEstimated: data["workEstimated"] !== undefined ? String(data["workEstimated"]) : undefined,
  };
}

function deserializeGoogleDatastoreAdminV1Progress(data: any): GoogleDatastoreAdminV1Progress {
  return {
    ...data,
    workCompleted: data["workCompleted"] !== undefined ? BigInt(data["workCompleted"]) : undefined,
    workEstimated: data["workEstimated"] !== undefined ? BigInt(data["workEstimated"]) : undefined,
  };
}

/**
 * Details for the `REDIRECT_WRITES` step.
 */
export interface GoogleDatastoreAdminV1RedirectWritesStepDetails {
  /**
   * Ths concurrency mode for this database.
   */
  concurrencyMode?:  | "CONCURRENCY_MODE_UNSPECIFIED" | "PESSIMISTIC" | "OPTIMISTIC" | "OPTIMISTIC_WITH_ENTITY_GROUPS";
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
 * A [GQL
 * query](https://cloud.google.com/datastore/docs/apis/gql/gql_reference).
 */
export interface GqlQuery {
  /**
   * When false, the query string must not contain any literals and instead
   * must bind all values. For example, `SELECT * FROM Kind WHERE a = 'string
   * literal'` is not allowed, while `SELECT * FROM Kind WHERE a = @value` is.
   */
  allowLiterals?: boolean;
  /**
   * For each non-reserved named binding site in the query string, there must
   * be a named parameter with that name, but not necessarily the inverse. Key
   * must match regex `A-Za-z_$*`, must not match regex `__.*__`, and must not
   * be `""`.
   */
  namedBindings?: {
    [key: string]: GqlQueryParameter
  };
  /**
   * Numbered binding site @1 references the first numbered parameter,
   * effectively using 1-based indexing, rather than the usual 0. For each
   * binding site numbered i in `query_string`, there must be an i-th numbered
   * parameter. The inverse must also be true.
   */
  positionalBindings?: GqlQueryParameter[];
  /**
   * A string of the format described
   * [here](https://cloud.google.com/datastore/docs/apis/gql/gql_reference).
   */
  queryString?: string;
}

function serializeGqlQuery(data: any): GqlQuery {
  return {
    ...data,
    namedBindings: data["namedBindings"] !== undefined ? Object.fromEntries(Object.entries(data["namedBindings"]).map(([k, v]: [string, any]) => ([k, serializeGqlQueryParameter(v)]))) : undefined,
    positionalBindings: data["positionalBindings"] !== undefined ? data["positionalBindings"].map((item: any) => (serializeGqlQueryParameter(item))) : undefined,
  };
}

function deserializeGqlQuery(data: any): GqlQuery {
  return {
    ...data,
    namedBindings: data["namedBindings"] !== undefined ? Object.fromEntries(Object.entries(data["namedBindings"]).map(([k, v]: [string, any]) => ([k, deserializeGqlQueryParameter(v)]))) : undefined,
    positionalBindings: data["positionalBindings"] !== undefined ? data["positionalBindings"].map((item: any) => (deserializeGqlQueryParameter(item))) : undefined,
  };
}

/**
 * A binding parameter for a GQL query.
 */
export interface GqlQueryParameter {
  /**
   * A query cursor. Query cursors are returned in query result batches.
   */
  cursor?: Uint8Array;
  /**
   * A value parameter.
   */
  value?: Value;
}

function serializeGqlQueryParameter(data: any): GqlQueryParameter {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? encodeBase64(data["cursor"]) : undefined,
    value: data["value"] !== undefined ? serializeValue(data["value"]) : undefined,
  };
}

function deserializeGqlQueryParameter(data: any): GqlQueryParameter {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? decodeBase64(data["cursor"] as string) : undefined,
    value: data["value"] !== undefined ? deserializeValue(data["value"]) : undefined,
  };
}

/**
 * A unique identifier for an entity. If a key's partition ID or any of its
 * path kinds or names are reserved/read-only, the key is reserved/read-only. A
 * reserved/read-only key is forbidden in certain documented contexts.
 */
export interface Key {
  /**
   * Entities are partitioned into subsets, currently identified by a project
   * ID and namespace ID. Queries are scoped to a single partition.
   */
  partitionId?: PartitionId;
  /**
   * The entity path. An entity path consists of one or more elements composed
   * of a kind and a string or numerical identifier, which identify entities.
   * The first element identifies a _root entity_, the second element identifies
   * a _child_ of the root entity, the third element identifies a child of the
   * second entity, and so forth. The entities identified by all prefixes of the
   * path are called the element's _ancestors_. An entity path is always fully
   * complete: *all* of the entity's ancestors are required to be in the path
   * along with the entity identifier itself. The only exception is that in some
   * documented cases, the identifier in the last path element (for the entity)
   * itself may be omitted. For example, the last path element of the key of
   * `Mutation.insert` may have no identifier. A path can never be empty, and a
   * path can have at most 100 elements.
   */
  path?: PathElement[];
}

function serializeKey(data: any): Key {
  return {
    ...data,
    path: data["path"] !== undefined ? data["path"].map((item: any) => (serializePathElement(item))) : undefined,
  };
}

function deserializeKey(data: any): Key {
  return {
    ...data,
    path: data["path"] !== undefined ? data["path"].map((item: any) => (deserializePathElement(item))) : undefined,
  };
}

/**
 * A representation of a kind.
 */
export interface KindExpression {
  /**
   * The name of the kind.
   */
  name?: string;
}

/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this object must conform to the WGS84 standard. Values
 * must be within normalized ranges.
 */
export interface LatLng {
  /**
   * The latitude in degrees. It must be in the range [-90.0, +90.0].
   */
  latitude?: number;
  /**
   * The longitude in degrees. It must be in the range [-180.0, +180.0].
   */
  longitude?: number;
}

/**
 * The request for Datastore.Lookup.
 */
export interface LookupRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * Required. Keys of entities to look up.
   */
  keys?: Key[];
  /**
   * The options for this lookup request.
   */
  readOptions?: ReadOptions;
}

function serializeLookupRequest(data: any): LookupRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (serializeKey(item))) : undefined,
    readOptions: data["readOptions"] !== undefined ? serializeReadOptions(data["readOptions"]) : undefined,
  };
}

function deserializeLookupRequest(data: any): LookupRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (deserializeKey(item))) : undefined,
    readOptions: data["readOptions"] !== undefined ? deserializeReadOptions(data["readOptions"]) : undefined,
  };
}

/**
 * The response for Datastore.Lookup.
 */
export interface LookupResponse {
  /**
   * A list of keys that were not looked up due to resource constraints. The
   * order of results in this field is undefined and has no relation to the
   * order of the keys in the input.
   */
  deferred?: Key[];
  /**
   * Entities found as `ResultType.FULL` entities. The order of results in this
   * field is undefined and has no relation to the order of the keys in the
   * input.
   */
  found?: EntityResult[];
  /**
   * Entities not found as `ResultType.KEY_ONLY` entities. The order of results
   * in this field is undefined and has no relation to the order of the keys in
   * the input.
   */
  missing?: EntityResult[];
  /**
   * The time at which these entities were read or found missing.
   */
  readTime?: Date;
  /**
   * The identifier of the transaction that was started as part of this Lookup
   * request. Set only when ReadOptions.new_transaction was set in
   * LookupRequest.read_options.
   */
  transaction?: Uint8Array;
}

function serializeLookupResponse(data: any): LookupResponse {
  return {
    ...data,
    deferred: data["deferred"] !== undefined ? data["deferred"].map((item: any) => (serializeKey(item))) : undefined,
    found: data["found"] !== undefined ? data["found"].map((item: any) => (serializeEntityResult(item))) : undefined,
    missing: data["missing"] !== undefined ? data["missing"].map((item: any) => (serializeEntityResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeLookupResponse(data: any): LookupResponse {
  return {
    ...data,
    deferred: data["deferred"] !== undefined ? data["deferred"].map((item: any) => (deserializeKey(item))) : undefined,
    found: data["found"] !== undefined ? data["found"].map((item: any) => (deserializeEntityResult(item))) : undefined,
    missing: data["missing"] !== undefined ? data["missing"].map((item: any) => (deserializeEntityResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * A mutation to apply to an entity.
 */
export interface Mutation {
  /**
   * The version of the entity that this mutation is being applied to. If this
   * does not match the current version on the server, the mutation conflicts.
   */
  baseVersion?: bigint;
  /**
   * The key of the entity to delete. The entity may or may not already exist.
   * Must have a complete key path and must not be reserved/read-only.
   */
  delete?: Key;
  /**
   * The entity to insert. The entity must not already exist. The entity key's
   * final path element may be incomplete.
   */
  insert?: Entity;
  /**
   * The entity to update. The entity must already exist. Must have a complete
   * key path.
   */
  update?: Entity;
  /**
   * The update time of the entity that this mutation is being applied to. If
   * this does not match the current update time on the server, the mutation
   * conflicts.
   */
  updateTime?: Date;
  /**
   * The entity to upsert. The entity may or may not already exist. The entity
   * key's final path element may be incomplete.
   */
  upsert?: Entity;
}

function serializeMutation(data: any): Mutation {
  return {
    ...data,
    baseVersion: data["baseVersion"] !== undefined ? String(data["baseVersion"]) : undefined,
    delete: data["delete"] !== undefined ? serializeKey(data["delete"]) : undefined,
    insert: data["insert"] !== undefined ? serializeEntity(data["insert"]) : undefined,
    update: data["update"] !== undefined ? serializeEntity(data["update"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    upsert: data["upsert"] !== undefined ? serializeEntity(data["upsert"]) : undefined,
  };
}

function deserializeMutation(data: any): Mutation {
  return {
    ...data,
    baseVersion: data["baseVersion"] !== undefined ? BigInt(data["baseVersion"]) : undefined,
    delete: data["delete"] !== undefined ? deserializeKey(data["delete"]) : undefined,
    insert: data["insert"] !== undefined ? deserializeEntity(data["insert"]) : undefined,
    update: data["update"] !== undefined ? deserializeEntity(data["update"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    upsert: data["upsert"] !== undefined ? deserializeEntity(data["upsert"]) : undefined,
  };
}

/**
 * The result of applying a mutation.
 */
export interface MutationResult {
  /**
   * Whether a conflict was detected for this mutation. Always false when a
   * conflict detection strategy field is not set in the mutation.
   */
  conflictDetected?: boolean;
  /**
   * The create time of the entity. This field will not be set after a
   * 'delete'.
   */
  createTime?: Date;
  /**
   * The automatically allocated key. Set only when the mutation allocated a
   * key.
   */
  key?: Key;
  /**
   * The update time of the entity on the server after processing the mutation.
   * If the mutation doesn't change anything on the server, then the timestamp
   * will be the update timestamp of the current entity. This field will not be
   * set after a 'delete'.
   */
  updateTime?: Date;
  /**
   * The version of the entity on the server after processing the mutation. If
   * the mutation doesn't change anything on the server, then the version will
   * be the version of the current entity or, if no entity is present, a version
   * that is strictly greater than the version of any previous entity and less
   * than the version of any possible future entity.
   */
  version?: bigint;
}

function serializeMutationResult(data: any): MutationResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    key: data["key"] !== undefined ? serializeKey(data["key"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeMutationResult(data: any): MutationResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    key: data["key"] !== undefined ? deserializeKey(data["key"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * A partition ID identifies a grouping of entities. The grouping is always by
 * project and namespace, however the namespace ID may be empty. A partition ID
 * contains several dimensions: project ID and namespace ID. Partition
 * dimensions: - May be `""`. - Must be valid UTF-8 bytes. - Must have values
 * that match regex `[A-Za-z\d\.\-_]{1,100}` If the value of any dimension
 * matches regex `__.*__`, the partition is reserved/read-only. A
 * reserved/read-only partition ID is forbidden in certain documented contexts.
 * Foreign partition IDs (in which the project ID does not match the context
 * project ID ) are discouraged. Reads and writes of foreign partition IDs may
 * fail if the project is not in an active state.
 */
export interface PartitionId {
  /**
   * If not empty, the ID of the database to which the entities belong.
   */
  databaseId?: string;
  /**
   * If not empty, the ID of the namespace to which the entities belong.
   */
  namespaceId?: string;
  /**
   * The ID of the project to which the entities belong.
   */
  projectId?: string;
}

/**
 * A (kind, ID/name) pair used to construct a key path. If either name or ID is
 * set, the element is complete. If neither is set, the element is incomplete.
 */
export interface PathElement {
  /**
   * The auto-allocated ID of the entity. Never equal to zero. Values less than
   * zero are discouraged and may not be supported in the future.
   */
  id?: bigint;
  /**
   * The kind of the entity. A kind matching regex `__.*__` is
   * reserved/read-only. A kind must not contain more than 1500 bytes when UTF-8
   * encoded. Cannot be `""`. Must be valid UTF-8 bytes. Legacy values that are
   * not valid UTF-8 are encoded as `__bytes__` where `` is the base-64 encoding
   * of the bytes.
   */
  kind?: string;
  /**
   * The name of the entity. A name matching regex `__.*__` is
   * reserved/read-only. A name must not be more than 1500 bytes when UTF-8
   * encoded. Cannot be `""`. Must be valid UTF-8 bytes. Legacy values that are
   * not valid UTF-8 are encoded as `__bytes__` where `` is the base-64 encoding
   * of the bytes.
   */
  name?: string;
}

function serializePathElement(data: any): PathElement {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializePathElement(data: any): PathElement {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * A representation of a property in a projection.
 */
export interface Projection {
  /**
   * The property to project.
   */
  property?: PropertyReference;
}

/**
 * Additional options for Datastore#projectsIndexesList.
 */
export interface ProjectsIndexesListOptions {
  filter?: string;
  /**
   * The maximum number of items to return. If zero, then all results will be
   * returned.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastore#projectsOperationsList.
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

/**
 * A filter on a specific property.
 */
export interface PropertyFilter {
  /**
   * The operator to filter by.
   */
  op?:  | "OPERATOR_UNSPECIFIED" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | "EQUAL" | "IN" | "NOT_EQUAL" | "HAS_ANCESTOR" | "NOT_IN";
  /**
   * The property to filter by.
   */
  property?: PropertyReference;
  /**
   * The value to compare the property to.
   */
  value?: Value;
}

function serializePropertyFilter(data: any): PropertyFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeValue(data["value"]) : undefined,
  };
}

function deserializePropertyFilter(data: any): PropertyFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeValue(data["value"]) : undefined,
  };
}

/**
 * The desired order for a specific property.
 */
export interface PropertyOrder {
  /**
   * The direction to order by. Defaults to `ASCENDING`.
   */
  direction?:  | "DIRECTION_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
  /**
   * The property to order by.
   */
  property?: PropertyReference;
}

/**
 * A reference to a property relative to the kind expressions.
 */
export interface PropertyReference {
  /**
   * The name of the property. If name includes "."s, it may be interpreted as
   * a property name path.
   */
  name?: string;
}

/**
 * A query for entities.
 */
export interface Query {
  /**
   * The properties to make distinct. The query results will contain the first
   * result for each distinct combination of values for the given properties (if
   * empty, all results are returned).
   */
  distinctOn?: PropertyReference[];
  /**
   * An ending point for the query results. Query cursors are returned in query
   * result batches and [can only be used to limit the same
   * query](https://cloud.google.com/datastore/docs/concepts/queries#cursors_limits_and_offsets).
   */
  endCursor?: Uint8Array;
  /**
   * The filter to apply.
   */
  filter?: Filter;
  /**
   * The kinds to query (if empty, returns entities of all kinds). Currently at
   * most 1 kind may be specified.
   */
  kind?: KindExpression[];
  /**
   * The maximum number of results to return. Applies after all other
   * constraints. Optional. Unspecified is interpreted as no limit. Must be >= 0
   * if specified.
   */
  limit?: number;
  /**
   * The number of results to skip. Applies before limit, but after all other
   * constraints. Optional. Must be >= 0 if specified.
   */
  offset?: number;
  /**
   * The order to apply to the query results (if empty, order is unspecified).
   */
  order?: PropertyOrder[];
  /**
   * The projection to return. Defaults to returning all properties.
   */
  projection?: Projection[];
  /**
   * A starting point for the query results. Query cursors are returned in
   * query result batches and [can only be used to continue the same
   * query](https://cloud.google.com/datastore/docs/concepts/queries#cursors_limits_and_offsets).
   */
  startCursor?: Uint8Array;
}

function serializeQuery(data: any): Query {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? encodeBase64(data["endCursor"]) : undefined,
    filter: data["filter"] !== undefined ? serializeFilter(data["filter"]) : undefined,
    startCursor: data["startCursor"] !== undefined ? encodeBase64(data["startCursor"]) : undefined,
  };
}

function deserializeQuery(data: any): Query {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? decodeBase64(data["endCursor"] as string) : undefined,
    filter: data["filter"] !== undefined ? deserializeFilter(data["filter"]) : undefined,
    startCursor: data["startCursor"] !== undefined ? decodeBase64(data["startCursor"] as string) : undefined,
  };
}

/**
 * A batch of results produced by a query.
 */
export interface QueryResultBatch {
  /**
   * A cursor that points to the position after the last result in the batch.
   */
  endCursor?: Uint8Array;
  /**
   * The results for this batch.
   */
  entityResults?: EntityResult[];
  /**
   * The result type for every entity in `entity_results`.
   */
  entityResultType?:  | "RESULT_TYPE_UNSPECIFIED" | "FULL" | "PROJECTION" | "KEY_ONLY";
  /**
   * The state of the query after the current batch.
   */
  moreResults?:  | "MORE_RESULTS_TYPE_UNSPECIFIED" | "NOT_FINISHED" | "MORE_RESULTS_AFTER_LIMIT" | "MORE_RESULTS_AFTER_CURSOR" | "NO_MORE_RESULTS";
  /**
   * Read timestamp this batch was returned from. This applies to the range of
   * results from the query's `start_cursor` (or the beginning of the query if
   * no cursor was given) to this batch's `end_cursor` (not the query's
   * `end_cursor`). In a single transaction, subsequent query result batches for
   * the same query can have a greater timestamp. Each batch's read timestamp is
   * valid for all preceding batches. This value will not be set for eventually
   * consistent queries in Cloud Datastore.
   */
  readTime?: Date;
  /**
   * A cursor that points to the position after the last skipped result. Will
   * be set when `skipped_results` != 0.
   */
  skippedCursor?: Uint8Array;
  /**
   * The number of results skipped, typically because of an offset.
   */
  skippedResults?: number;
  /**
   * The version number of the snapshot this batch was returned from. This
   * applies to the range of results from the query's `start_cursor` (or the
   * beginning of the query if no cursor was given) to this batch's `end_cursor`
   * (not the query's `end_cursor`). In a single transaction, subsequent query
   * result batches for the same query can have a greater snapshot version
   * number. Each batch's snapshot version is valid for all preceding batches.
   * The value will be zero for eventually consistent queries.
   */
  snapshotVersion?: bigint;
}

function serializeQueryResultBatch(data: any): QueryResultBatch {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? encodeBase64(data["endCursor"]) : undefined,
    entityResults: data["entityResults"] !== undefined ? data["entityResults"].map((item: any) => (serializeEntityResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    skippedCursor: data["skippedCursor"] !== undefined ? encodeBase64(data["skippedCursor"]) : undefined,
    snapshotVersion: data["snapshotVersion"] !== undefined ? String(data["snapshotVersion"]) : undefined,
  };
}

function deserializeQueryResultBatch(data: any): QueryResultBatch {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? decodeBase64(data["endCursor"] as string) : undefined,
    entityResults: data["entityResults"] !== undefined ? data["entityResults"].map((item: any) => (deserializeEntityResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    skippedCursor: data["skippedCursor"] !== undefined ? decodeBase64(data["skippedCursor"] as string) : undefined,
    snapshotVersion: data["snapshotVersion"] !== undefined ? BigInt(data["snapshotVersion"]) : undefined,
  };
}

/**
 * Options specific to read-only transactions.
 */
export interface ReadOnly {
  /**
   * Reads entities at the given time. This may not be older than 60 seconds.
   */
  readTime?: Date;
}

function serializeReadOnly(data: any): ReadOnly {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeReadOnly(data: any): ReadOnly {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * The options shared by read requests.
 */
export interface ReadOptions {
  /**
   * Options for beginning a new transaction for this request. The new
   * transaction identifier will be returned in the corresponding response as
   * either LookupResponse.transaction or RunQueryResponse.transaction.
   */
  newTransaction?: TransactionOptions;
  /**
   * The non-transactional read consistency to use.
   */
  readConsistency?:  | "READ_CONSISTENCY_UNSPECIFIED" | "STRONG" | "EVENTUAL";
  /**
   * Reads entities as they were at the given time. This may not be older than
   * 270 seconds. This value is only supported for Cloud Firestore in Datastore
   * mode.
   */
  readTime?: Date;
  /**
   * The identifier of the transaction in which to read. A transaction
   * identifier is returned by a call to Datastore.BeginTransaction.
   */
  transaction?: Uint8Array;
}

function serializeReadOptions(data: any): ReadOptions {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? serializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeReadOptions(data: any): ReadOptions {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? deserializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * Options specific to read / write transactions.
 */
export interface ReadWrite {
  /**
   * The transaction identifier of the transaction being retried.
   */
  previousTransaction?: Uint8Array;
}

function serializeReadWrite(data: any): ReadWrite {
  return {
    ...data,
    previousTransaction: data["previousTransaction"] !== undefined ? encodeBase64(data["previousTransaction"]) : undefined,
  };
}

function deserializeReadWrite(data: any): ReadWrite {
  return {
    ...data,
    previousTransaction: data["previousTransaction"] !== undefined ? decodeBase64(data["previousTransaction"] as string) : undefined,
  };
}

/**
 * The request for Datastore.ReserveIds.
 */
export interface ReserveIdsRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * Required. A list of keys with complete key paths whose numeric IDs should
   * not be auto-allocated.
   */
  keys?: Key[];
}

function serializeReserveIdsRequest(data: any): ReserveIdsRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (serializeKey(item))) : undefined,
  };
}

function deserializeReserveIdsRequest(data: any): ReserveIdsRequest {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (deserializeKey(item))) : undefined,
  };
}

/**
 * The response for Datastore.ReserveIds.
 */
export interface ReserveIdsResponse {
}

/**
 * The request for Datastore.Rollback.
 */
export interface RollbackRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * Required. The transaction identifier, returned by a call to
   * Datastore.BeginTransaction.
   */
  transaction?: Uint8Array;
}

function serializeRollbackRequest(data: any): RollbackRequest {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRollbackRequest(data: any): RollbackRequest {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The response for Datastore.Rollback. (an empty message).
 */
export interface RollbackResponse {
}

/**
 * The request for Datastore.RunAggregationQuery.
 */
export interface RunAggregationQueryRequest {
  /**
   * The query to run.
   */
  aggregationQuery?: AggregationQuery;
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * The GQL query to run. This query must be an aggregation query.
   */
  gqlQuery?: GqlQuery;
  /**
   * Entities are partitioned into subsets, identified by a partition ID.
   * Queries are scoped to a single partition. This partition ID is normalized
   * with the standard default context partition ID.
   */
  partitionId?: PartitionId;
  /**
   * The options for this query.
   */
  readOptions?: ReadOptions;
}

function serializeRunAggregationQueryRequest(data: any): RunAggregationQueryRequest {
  return {
    ...data,
    aggregationQuery: data["aggregationQuery"] !== undefined ? serializeAggregationQuery(data["aggregationQuery"]) : undefined,
    gqlQuery: data["gqlQuery"] !== undefined ? serializeGqlQuery(data["gqlQuery"]) : undefined,
    readOptions: data["readOptions"] !== undefined ? serializeReadOptions(data["readOptions"]) : undefined,
  };
}

function deserializeRunAggregationQueryRequest(data: any): RunAggregationQueryRequest {
  return {
    ...data,
    aggregationQuery: data["aggregationQuery"] !== undefined ? deserializeAggregationQuery(data["aggregationQuery"]) : undefined,
    gqlQuery: data["gqlQuery"] !== undefined ? deserializeGqlQuery(data["gqlQuery"]) : undefined,
    readOptions: data["readOptions"] !== undefined ? deserializeReadOptions(data["readOptions"]) : undefined,
  };
}

/**
 * The response for Datastore.RunAggregationQuery.
 */
export interface RunAggregationQueryResponse {
  /**
   * A batch of aggregation results. Always present.
   */
  batch?: AggregationResultBatch;
  /**
   * The parsed form of the `GqlQuery` from the request, if it was set.
   */
  query?: AggregationQuery;
  /**
   * The identifier of the transaction that was started as part of this
   * RunAggregationQuery request. Set only when ReadOptions.new_transaction was
   * set in RunAggregationQueryRequest.read_options.
   */
  transaction?: Uint8Array;
}

function serializeRunAggregationQueryResponse(data: any): RunAggregationQueryResponse {
  return {
    ...data,
    batch: data["batch"] !== undefined ? serializeAggregationResultBatch(data["batch"]) : undefined,
    query: data["query"] !== undefined ? serializeAggregationQuery(data["query"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunAggregationQueryResponse(data: any): RunAggregationQueryResponse {
  return {
    ...data,
    batch: data["batch"] !== undefined ? deserializeAggregationResultBatch(data["batch"]) : undefined,
    query: data["query"] !== undefined ? deserializeAggregationQuery(data["query"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The request for Datastore.RunQuery.
 */
export interface RunQueryRequest {
  /**
   * The ID of the database against which to make the request. '(default)' is
   * not allowed; please use empty string '' to refer the default database.
   */
  databaseId?: string;
  /**
   * The GQL query to run. This query must be a non-aggregation query.
   */
  gqlQuery?: GqlQuery;
  /**
   * Entities are partitioned into subsets, identified by a partition ID.
   * Queries are scoped to a single partition. This partition ID is normalized
   * with the standard default context partition ID.
   */
  partitionId?: PartitionId;
  /**
   * The query to run.
   */
  query?: Query;
  /**
   * The options for this query.
   */
  readOptions?: ReadOptions;
}

function serializeRunQueryRequest(data: any): RunQueryRequest {
  return {
    ...data,
    gqlQuery: data["gqlQuery"] !== undefined ? serializeGqlQuery(data["gqlQuery"]) : undefined,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
    readOptions: data["readOptions"] !== undefined ? serializeReadOptions(data["readOptions"]) : undefined,
  };
}

function deserializeRunQueryRequest(data: any): RunQueryRequest {
  return {
    ...data,
    gqlQuery: data["gqlQuery"] !== undefined ? deserializeGqlQuery(data["gqlQuery"]) : undefined,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
    readOptions: data["readOptions"] !== undefined ? deserializeReadOptions(data["readOptions"]) : undefined,
  };
}

/**
 * The response for Datastore.RunQuery.
 */
export interface RunQueryResponse {
  /**
   * A batch of query results (always present).
   */
  batch?: QueryResultBatch;
  /**
   * The parsed form of the `GqlQuery` from the request, if it was set.
   */
  query?: Query;
  /**
   * The identifier of the transaction that was started as part of this
   * RunQuery request. Set only when ReadOptions.new_transaction was set in
   * RunQueryRequest.read_options.
   */
  transaction?: Uint8Array;
}

function serializeRunQueryResponse(data: any): RunQueryResponse {
  return {
    ...data,
    batch: data["batch"] !== undefined ? serializeQueryResultBatch(data["batch"]) : undefined,
    query: data["query"] !== undefined ? serializeQuery(data["query"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunQueryResponse(data: any): RunQueryResponse {
  return {
    ...data,
    batch: data["batch"] !== undefined ? deserializeQueryResultBatch(data["batch"]) : undefined,
    query: data["query"] !== undefined ? deserializeQuery(data["query"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
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
 * Options for beginning a new transaction. Transactions can be created
 * explicitly with calls to Datastore.BeginTransaction or implicitly by setting
 * ReadOptions.new_transaction in read requests.
 */
export interface TransactionOptions {
  /**
   * The transaction should only allow reads.
   */
  readOnly?: ReadOnly;
  /**
   * The transaction should allow both reads and writes.
   */
  readWrite?: ReadWrite;
}

function serializeTransactionOptions(data: any): TransactionOptions {
  return {
    ...data,
    readOnly: data["readOnly"] !== undefined ? serializeReadOnly(data["readOnly"]) : undefined,
    readWrite: data["readWrite"] !== undefined ? serializeReadWrite(data["readWrite"]) : undefined,
  };
}

function deserializeTransactionOptions(data: any): TransactionOptions {
  return {
    ...data,
    readOnly: data["readOnly"] !== undefined ? deserializeReadOnly(data["readOnly"]) : undefined,
    readWrite: data["readWrite"] !== undefined ? deserializeReadWrite(data["readWrite"]) : undefined,
  };
}

/**
 * A message that can hold any of the supported value types and associated
 * metadata.
 */
export interface Value {
  /**
   * An array value. Cannot contain another array value. A `Value` instance
   * that sets field `array_value` must not set fields `meaning` or
   * `exclude_from_indexes`.
   */
  arrayValue?: ArrayValue;
  /**
   * A blob value. May have at most 1,000,000 bytes. When
   * `exclude_from_indexes` is false, may have at most 1500 bytes. In JSON
   * requests, must be base64-encoded.
   */
  blobValue?: Uint8Array;
  /**
   * A boolean value.
   */
  booleanValue?: boolean;
  /**
   * A double value.
   */
  doubleValue?: number;
  /**
   * An entity value. - May have no key. - May have a key with an incomplete
   * key path. - May have a reserved/read-only key.
   */
  entityValue?: Entity;
  /**
   * If the value should be excluded from all indexes including those defined
   * explicitly.
   */
  excludeFromIndexes?: boolean;
  /**
   * A geo point value representing a point on the surface of Earth.
   */
  geoPointValue?: LatLng;
  /**
   * An integer value.
   */
  integerValue?: bigint;
  /**
   * A key value.
   */
  keyValue?: Key;
  /**
   * The `meaning` field should only be populated for backwards compatibility.
   */
  meaning?: number;
  /**
   * A null value.
   */
  nullValue?:  | "NULL_VALUE";
  /**
   * A UTF-8 encoded string value. When `exclude_from_indexes` is false (it is
   * indexed) , may have at most 1500 bytes. Otherwise, may be set to at most
   * 1,000,000 bytes.
   */
  stringValue?: string;
  /**
   * A timestamp value. When stored in the Datastore, precise only to
   * microseconds; any additional precision is rounded down.
   */
  timestampValue?: Date;
}

function serializeValue(data: any): Value {
  return {
    ...data,
    arrayValue: data["arrayValue"] !== undefined ? serializeArrayValue(data["arrayValue"]) : undefined,
    blobValue: data["blobValue"] !== undefined ? encodeBase64(data["blobValue"]) : undefined,
    entityValue: data["entityValue"] !== undefined ? serializeEntity(data["entityValue"]) : undefined,
    integerValue: data["integerValue"] !== undefined ? String(data["integerValue"]) : undefined,
    keyValue: data["keyValue"] !== undefined ? serializeKey(data["keyValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeValue(data: any): Value {
  return {
    ...data,
    arrayValue: data["arrayValue"] !== undefined ? deserializeArrayValue(data["arrayValue"]) : undefined,
    blobValue: data["blobValue"] !== undefined ? decodeBase64(data["blobValue"] as string) : undefined,
    entityValue: data["entityValue"] !== undefined ? deserializeEntity(data["entityValue"]) : undefined,
    integerValue: data["integerValue"] !== undefined ? BigInt(data["integerValue"]) : undefined,
    keyValue: data["keyValue"] !== undefined ? deserializeKey(data["keyValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
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
