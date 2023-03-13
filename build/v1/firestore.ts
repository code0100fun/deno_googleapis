// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Firestore API Client for Deno
 * ===================================
 * 
 * Accesses the NoSQL document database built for automatic scaling, high performance, and ease of application development. 
 * 
 * Docs: https://cloud.google.com/firestore
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Accesses the NoSQL document database built for automatic scaling, high
 * performance, and ease of application development.
 */
export class Firestore {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firestore.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the metadata and configuration for a Field.
   *
   * @param name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_id}`
   */
  async projectsDatabasesCollectionGroupsFieldsGet(name: string): Promise<GoogleFirestoreAdminV1Field> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirestoreAdminV1Field;
  }

  /**
   * Lists the field configuration and metadata for this database. Currently,
   * FirestoreAdmin.ListFields only supports listing fields that have been
   * explicitly overridden. To issue this query, call FirestoreAdmin.ListFields
   * with the filter set to `indexConfig.usesAncestorConfig:false` .
   *
   * @param parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
   */
  async projectsDatabasesCollectionGroupsFieldsList(parent: string, opts: ProjectsDatabasesCollectionGroupsFieldsListOptions = {}): Promise<GoogleFirestoreAdminV1ListFieldsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fields`);
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
    return data as GoogleFirestoreAdminV1ListFieldsResponse;
  }

  /**
   * Updates a field configuration. Currently, field updates apply only to
   * single field index configuration. However, calls to
   * FirestoreAdmin.UpdateField should provide a field mask to avoid changing
   * any configuration that the caller isn't aware of. The field mask should be
   * specified as: `{ paths: "index_config" }`. This call returns a
   * google.longrunning.Operation which may be used to track the status of the
   * field update. The metadata for the operation will be the type
   * FieldOperationMetadata. To configure the default field settings for the
   * database, use the special `Field` with resource name:
   * `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*`.
   *
   * @param name Required. A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths may be quoted using ` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: (Note: Comments here are written in markdown syntax, so there is an additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`*\`` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration.
   */
  async projectsDatabasesCollectionGroupsFieldsPatch(name: string, req: GoogleFirestoreAdminV1Field, opts: ProjectsDatabasesCollectionGroupsFieldsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsDatabasesCollectionGroupsFieldsPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a composite index. This returns a google.longrunning.Operation
   * which may be used to track the status of the creation. The metadata for the
   * operation will be the type IndexOperationMetadata.
   *
   * @param parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
   */
  async projectsDatabasesCollectionGroupsIndexesCreate(parent: string, req: GoogleFirestoreAdminV1Index): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/indexes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a composite index.
   *
   * @param name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
   */
  async projectsDatabasesCollectionGroupsIndexesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a composite index.
   *
   * @param name Required. A name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
   */
  async projectsDatabasesCollectionGroupsIndexesGet(name: string): Promise<GoogleFirestoreAdminV1Index> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirestoreAdminV1Index;
  }

  /**
   * Lists composite indexes.
   *
   * @param parent Required. A parent name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}`
   */
  async projectsDatabasesCollectionGroupsIndexesList(parent: string, opts: ProjectsDatabasesCollectionGroupsIndexesListOptions = {}): Promise<GoogleFirestoreAdminV1ListIndexesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/indexes`);
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
    return data as GoogleFirestoreAdminV1ListIndexesResponse;
  }

  /**
   * Create a database.
   *
   * @param parent Required. A parent name of the form `projects/{project_id}`
   */
  async projectsDatabasesCreate(parent: string, req: GoogleFirestoreAdminV1Database, opts: ProjectsDatabasesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databases`);
    if (opts.databaseId !== undefined) {
      url.searchParams.append("databaseId", String(opts.databaseId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a database.
   *
   * @param name Required. A name of the form `projects/{project_id}/databases/{database_id}`
   */
  async projectsDatabasesDelete(name: string, opts: ProjectsDatabasesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets multiple documents. Documents returned by this method are not
   * guaranteed to be returned in the same order that they were requested.
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsBatchGet(database: string, req: BatchGetDocumentsRequest): Promise<BatchGetDocumentsResponse> {
    req = serializeBatchGetDocumentsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:batchGet`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchGetDocumentsResponse(data);
  }

  /**
   * Applies a batch of write operations. The BatchWrite method does not apply
   * the write operations atomically and can apply them out of order. Method
   * does not allow more than one write per document. Each write succeeds or
   * fails independently. See the BatchWriteResponse for the success status of
   * each write. If you require an atomically applied set of writes, use Commit
   * instead.
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsBatchWrite(database: string, req: BatchWriteRequest): Promise<BatchWriteResponse> {
    req = serializeBatchWriteRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:batchWrite`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchWriteResponse(data);
  }

  /**
   * Starts a new transaction.
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsBeginTransaction(database: string, req: BeginTransactionRequest): Promise<BeginTransactionResponse> {
    req = serializeBeginTransactionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:beginTransaction`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBeginTransactionResponse(data);
  }

  /**
   * Commits a transaction, while optionally updating documents.
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsCommit(database: string, req: CommitRequest): Promise<CommitResponse> {
    req = serializeCommitRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCommitResponse(data);
  }

  /**
   * Creates a new document.
   *
   * @param collectionId Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`.
   * @param parent Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}`
   */
  async projectsDatabasesDocumentsCreateDocument(collectionId: string, parent: string, req: Document, opts: ProjectsDatabasesDocumentsCreateDocumentOptions = {}): Promise<Document> {
    req = serializeDocument(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/${ collectionId }`);
    if (opts.documentId !== undefined) {
      url.searchParams.append("documentId", String(opts.documentId));
    }
    if (opts["mask.fieldPaths"] !== undefined) {
      url.searchParams.append("mask.fieldPaths", String(opts["mask.fieldPaths"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDocument(data);
  }

  /**
   * Deletes a document.
   *
   * @param name Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  async projectsDatabasesDocumentsDelete(name: string, opts: ProjectsDatabasesDocumentsDeleteOptions = {}): Promise<Empty> {
    opts = serializeProjectsDatabasesDocumentsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts["currentDocument.exists"] !== undefined) {
      url.searchParams.append("currentDocument.exists", String(opts["currentDocument.exists"]));
    }
    if (opts["currentDocument.updateTime"] !== undefined) {
      url.searchParams.append("currentDocument.updateTime", String(opts["currentDocument.updateTime"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single document.
   *
   * @param name Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  async projectsDatabasesDocumentsGet(name: string, opts: ProjectsDatabasesDocumentsGetOptions = {}): Promise<Document> {
    opts = serializeProjectsDatabasesDocumentsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts["mask.fieldPaths"] !== undefined) {
      url.searchParams.append("mask.fieldPaths", String(opts["mask.fieldPaths"]));
    }
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    if (opts.transaction !== undefined) {
      url.searchParams.append("transaction", String(opts.transaction));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDocument(data);
  }

  /**
   * Lists documents.
   *
   * @param collectionId Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`.
   * @param parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  async projectsDatabasesDocumentsList(collectionId: string, parent: string, opts: ProjectsDatabasesDocumentsListOptions = {}): Promise<ListDocumentsResponse> {
    opts = serializeProjectsDatabasesDocumentsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/${ collectionId }`);
    if (opts["mask.fieldPaths"] !== undefined) {
      url.searchParams.append("mask.fieldPaths", String(opts["mask.fieldPaths"]));
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    if (opts.showMissing !== undefined) {
      url.searchParams.append("showMissing", String(opts.showMissing));
    }
    if (opts.transaction !== undefined) {
      url.searchParams.append("transaction", String(opts.transaction));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListDocumentsResponse(data);
  }

  /**
   * Lists all the collection IDs underneath a document.
   *
   * @param parent Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  async projectsDatabasesDocumentsListCollectionIds(parent: string, req: ListCollectionIdsRequest): Promise<ListCollectionIdsResponse> {
    req = serializeListCollectionIdsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:listCollectionIds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ListCollectionIdsResponse;
  }

  /**
   * Lists documents.
   *
   * @param collectionId Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`.
   * @param parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  async projectsDatabasesDocumentsListDocuments(collectionId: string, parent: string, opts: ProjectsDatabasesDocumentsListDocumentsOptions = {}): Promise<ListDocumentsResponse> {
    opts = serializeProjectsDatabasesDocumentsListDocumentsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/${ collectionId }`);
    if (opts["mask.fieldPaths"] !== undefined) {
      url.searchParams.append("mask.fieldPaths", String(opts["mask.fieldPaths"]));
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    if (opts.showMissing !== undefined) {
      url.searchParams.append("showMissing", String(opts.showMissing));
    }
    if (opts.transaction !== undefined) {
      url.searchParams.append("transaction", String(opts.transaction));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListDocumentsResponse(data);
  }

  /**
   * Listens to changes. This method is only available via gRPC or WebChannel
   * (not REST).
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsListen(database: string, req: ListenRequest): Promise<ListenResponse> {
    req = serializeListenRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:listen`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeListenResponse(data);
  }

  /**
   * Partitions a query by returning partition cursors that can be used to run
   * the query in parallel. The returned partition cursors are split points that
   * can be used by RunQuery as starting/end points for the query results.
   *
   * @param parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents`. Document resource names are not supported; only database resource names can be specified.
   */
  async projectsDatabasesDocumentsPartitionQuery(parent: string, req: PartitionQueryRequest): Promise<PartitionQueryResponse> {
    req = serializePartitionQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:partitionQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePartitionQueryResponse(data);
  }

  /**
   * Updates or inserts a document.
   *
   * @param name The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  async projectsDatabasesDocumentsPatch(name: string, req: Document, opts: ProjectsDatabasesDocumentsPatchOptions = {}): Promise<Document> {
    req = serializeDocument(req);
    opts = serializeProjectsDatabasesDocumentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts["currentDocument.exists"] !== undefined) {
      url.searchParams.append("currentDocument.exists", String(opts["currentDocument.exists"]));
    }
    if (opts["currentDocument.updateTime"] !== undefined) {
      url.searchParams.append("currentDocument.updateTime", String(opts["currentDocument.updateTime"]));
    }
    if (opts["mask.fieldPaths"] !== undefined) {
      url.searchParams.append("mask.fieldPaths", String(opts["mask.fieldPaths"]));
    }
    if (opts["updateMask.fieldPaths"] !== undefined) {
      url.searchParams.append("updateMask.fieldPaths", String(opts["updateMask.fieldPaths"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeDocument(data);
  }

  /**
   * Rolls back a transaction.
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesDocumentsRollback(database: string, req: RollbackRequest): Promise<Empty> {
    req = serializeRollbackRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Runs an aggregation query. Rather than producing Document results like
   * Firestore.RunQuery, this API allows running an aggregation to produce a
   * series of AggregationResult server-side. High-Level Example: ``` -- Return
   * the number of documents in table given a filter. SELECT COUNT(*) FROM (
   * SELECT * FROM k where a = true ); ```
   *
   * @param parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  async projectsDatabasesDocumentsRunAggregationQuery(parent: string, req: RunAggregationQueryRequest): Promise<RunAggregationQueryResponse> {
    req = serializeRunAggregationQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:runAggregationQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRunAggregationQueryResponse(data);
  }

  /**
   * Runs a query.
   *
   * @param parent Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  async projectsDatabasesDocumentsRunQuery(parent: string, req: RunQueryRequest): Promise<RunQueryResponse> {
    req = serializeRunQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:runQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRunQueryResponse(data);
  }

  /**
   * Streams batches of document updates and deletes, in order. This method is
   * only available via gRPC or WebChannel (not REST).
   *
   * @param database Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message.
   */
  async projectsDatabasesDocumentsWrite(database: string, req: WriteRequest): Promise<WriteResponse> {
    req = serializeWriteRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/documents:write`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWriteResponse(data);
  }

  /**
   * Exports a copy of all or a subset of documents from Google Cloud Firestore
   * to another storage system, such as Google Cloud Storage. Recent updates to
   * documents may not be reflected in the export. The export occurs in the
   * background and its progress can be monitored and managed via the Operation
   * resource that is created. The output of an export may only be used once the
   * associated operation is done. If an export operation is cancelled before
   * completion it may leave partial data behind in Google Cloud Storage. For
   * more details on export behavior and output format, refer to:
   * https://cloud.google.com/firestore/docs/manage-data/export-import
   *
   * @param name Required. Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesExportDocuments(name: string, req: GoogleFirestoreAdminV1ExportDocumentsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:exportDocuments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets information about a database.
   *
   * @param name Required. A name of the form `projects/{project_id}/databases/{database_id}`
   */
  async projectsDatabasesGet(name: string): Promise<GoogleFirestoreAdminV1Database> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirestoreAdminV1Database;
  }

  /**
   * Imports documents into Google Cloud Firestore. Existing documents with the
   * same name are overwritten. The import occurs in the background and its
   * progress can be monitored and managed via the Operation resource that is
   * created. If an ImportDocuments operation is cancelled, it is possible that
   * a subset of the data has already been imported to Cloud Firestore.
   *
   * @param name Required. Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`.
   */
  async projectsDatabasesImportDocuments(name: string, req: GoogleFirestoreAdminV1ImportDocumentsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:importDocuments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * List all the databases in the project.
   *
   * @param parent Required. A parent name of the form `projects/{project_id}`
   */
  async projectsDatabasesList(parent: string): Promise<GoogleFirestoreAdminV1ListDatabasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databases`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirestoreAdminV1ListDatabasesResponse;
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
  async projectsDatabasesOperationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<Empty> {
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
  async projectsDatabasesOperationsDelete(name: string): Promise<Empty> {
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
  async projectsDatabasesOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
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
  async projectsDatabasesOperationsList(name: string, opts: ProjectsDatabasesOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
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
   * Updates a database.
   *
   * @param name The resource name of the Database. Format: `projects/{project}/databases/{database}`
   */
  async projectsDatabasesPatch(name: string, req: GoogleFirestoreAdminV1Database, opts: ProjectsDatabasesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsDatabasesPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/locations`);
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
    return data as ListLocationsResponse;
  }
}

/**
 * Defines a aggregation that produces a single result.
 */
export interface Aggregation {
  /**
   * Optional. Optional name of the field to store the result of the
   * aggregation into. If not provided, Firestore will pick a default name
   * following the format `field_`. For example: ``` AGGREGATE COUNT_UP_TO(1) AS
   * count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3,
   * COUNT_UP_TO(4) OVER ( ... ); ``` becomes: ``` AGGREGATE COUNT_UP_TO(1) AS
   * count_up_to_1, COUNT_UP_TO(2) AS field_1, COUNT_UP_TO(3) AS count_up_to_3,
   * COUNT_UP_TO(4) AS field_2 OVER ( ... ); ``` Requires: * Must be unique
   * across all aggregation aliases. * Conform to document field name
   * limitations.
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
 * The result of a single bucket from a Firestore aggregation query. The keys
 * of `aggregate_fields` are the same for all results in an aggregation query,
 * unlike document queries which can have different fields present for each
 * result.
 */
export interface AggregationResult {
  /**
   * The result of the aggregation functions, ex: `COUNT(*) AS total_docs`. The
   * key is the alias assigned to the aggregation function on input and the size
   * of this map equals the number of aggregation functions in the query.
   */
  aggregateFields?: {
    [key: string]: Value
  };
}

function serializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    aggregateFields: data["aggregateFields"] !== undefined ? Object.fromEntries(Object.entries(data["aggregateFields"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
  };
}

function deserializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    aggregateFields: data["aggregateFields"] !== undefined ? Object.fromEntries(Object.entries(data["aggregateFields"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
  };
}

/**
 * An array value.
 */
export interface ArrayValue {
  /**
   * Values in the array.
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
 * The request for Firestore.BatchGetDocuments.
 */
export interface BatchGetDocumentsRequest {
  /**
   * The names of the documents to retrieve. In the format:
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   * The request will fail if any of the document is not a child resource of the
   * given `database`. Duplicate names will be elided.
   */
  documents?: string[];
  /**
   * The fields to return. If not set, returns all fields. If a document has a
   * field that is not present in this mask, that field will not be returned in
   * the response.
   */
  mask?: DocumentMask;
  /**
   * Starts a new transaction and reads the documents. Defaults to a read-only
   * transaction. The new transaction ID will be returned as the first response
   * in the stream.
   */
  newTransaction?: TransactionOptions;
  /**
   * Reads documents as they were at the given time. This may not be older than
   * 270 seconds.
   */
  readTime?: Date;
  /**
   * Reads documents in a transaction.
   */
  transaction?: Uint8Array;
}

function serializeBatchGetDocumentsRequest(data: any): BatchGetDocumentsRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? serializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeBatchGetDocumentsRequest(data: any): BatchGetDocumentsRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? deserializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The streamed response for Firestore.BatchGetDocuments.
 */
export interface BatchGetDocumentsResponse {
  /**
   * A document that was requested.
   */
  found?: Document;
  /**
   * A document name that was requested but does not exist. In the format:
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  missing?: string;
  /**
   * The time at which the document was read. This may be monotically
   * increasing, in this case the previous documents in the result stream are
   * guaranteed not to have changed between their read_time and this one.
   */
  readTime?: Date;
  /**
   * The transaction that was started as part of this request. Will only be set
   * in the first response, and only if BatchGetDocumentsRequest.new_transaction
   * was set in the request.
   */
  transaction?: Uint8Array;
}

function serializeBatchGetDocumentsResponse(data: any): BatchGetDocumentsResponse {
  return {
    ...data,
    found: data["found"] !== undefined ? serializeDocument(data["found"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeBatchGetDocumentsResponse(data: any): BatchGetDocumentsResponse {
  return {
    ...data,
    found: data["found"] !== undefined ? deserializeDocument(data["found"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The request for Firestore.BatchWrite.
 */
export interface BatchWriteRequest {
  /**
   * Labels associated with this batch write.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The writes to apply. Method does not apply writes atomically and does not
   * guarantee ordering. Each write succeeds or fails independently. You cannot
   * write to the same document more than once per request.
   */
  writes?: Write[];
}

function serializeBatchWriteRequest(data: any): BatchWriteRequest {
  return {
    ...data,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (serializeWrite(item))) : undefined,
  };
}

function deserializeBatchWriteRequest(data: any): BatchWriteRequest {
  return {
    ...data,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (deserializeWrite(item))) : undefined,
  };
}

/**
 * The response from Firestore.BatchWrite.
 */
export interface BatchWriteResponse {
  /**
   * The status of applying the writes. This i-th write status corresponds to
   * the i-th write in the request.
   */
  status?: Status[];
  /**
   * The result of applying the writes. This i-th write result corresponds to
   * the i-th write in the request.
   */
  writeResults?: WriteResult[];
}

function serializeBatchWriteResponse(data: any): BatchWriteResponse {
  return {
    ...data,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (serializeWriteResult(item))) : undefined,
  };
}

function deserializeBatchWriteResponse(data: any): BatchWriteResponse {
  return {
    ...data,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (deserializeWriteResult(item))) : undefined,
  };
}

/**
 * The request for Firestore.BeginTransaction.
 */
export interface BeginTransactionRequest {
  /**
   * The options for the transaction. Defaults to a read-write transaction.
   */
  options?: TransactionOptions;
}

function serializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? serializeTransactionOptions(data["options"]) : undefined,
  };
}

function deserializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? deserializeTransactionOptions(data["options"]) : undefined,
  };
}

/**
 * The response for Firestore.BeginTransaction.
 */
export interface BeginTransactionResponse {
  /**
   * The transaction that was started.
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
 * A selection of a collection, such as `messages as m1`.
 */
export interface CollectionSelector {
  /**
   * When false, selects only collections that are immediate children of the
   * `parent` specified in the containing `RunQueryRequest`. When true, selects
   * all descendant collections.
   */
  allDescendants?: boolean;
  /**
   * The collection ID. When set, selects only collections with this ID.
   */
  collectionId?: string;
}

/**
 * The request for Firestore.Commit.
 */
export interface CommitRequest {
  /**
   * If set, applies all writes in this transaction, and commits it.
   */
  transaction?: Uint8Array;
  /**
   * The writes to apply. Always executed atomically and in order.
   */
  writes?: Write[];
}

function serializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (serializeWrite(item))) : undefined,
  };
}

function deserializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (deserializeWrite(item))) : undefined,
  };
}

/**
 * The response for Firestore.Commit.
 */
export interface CommitResponse {
  /**
   * The time at which the commit occurred. Any read with an equal or greater
   * `read_time` is guaranteed to see the effects of the commit.
   */
  commitTime?: Date;
  /**
   * The result of applying the writes. This i-th write result corresponds to
   * the i-th write in the request.
   */
  writeResults?: WriteResult[];
}

function serializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? data["commitTime"].toISOString() : undefined,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (serializeWriteResult(item))) : undefined,
  };
}

function deserializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? new Date(data["commitTime"]) : undefined,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (deserializeWriteResult(item))) : undefined,
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
 * Count of documents that match the query. The `COUNT(*)` aggregation function
 * operates on the entire document so it does not require a field reference.
 */
export interface Count {
  /**
   * Optional. Optional constraint on the maximum number of documents to count.
   * This provides a way to set an upper bound on the number of documents to
   * scan, limiting latency and cost. Unspecified is interpreted as no bound.
   * High-Level Example: ``` AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT * FROM k
   * ); ``` Requires: * Must be greater than zero when present.
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
 * A position in a query result set.
 */
export interface Cursor {
  /**
   * If the position is just before or just after the given values, relative to
   * the sort order defined by the query.
   */
  before?: boolean;
  /**
   * The values that represent a position, in the order they appear in the
   * order by clause of a query. Can contain fewer values than specified in the
   * order by clause.
   */
  values?: Value[];
}

function serializeCursor(data: any): Cursor {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeValue(item))) : undefined,
  };
}

function deserializeCursor(data: any): Cursor {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeValue(item))) : undefined,
  };
}

/**
 * A Firestore document. Must not exceed 1 MiB - 4 bytes.
 */
export interface Document {
  /**
   * Output only. The time at which the document was created. This value
   * increases monotonically when a document is deleted then recreated. It can
   * also be compared to values from other documents and the `read_time` of a
   * query.
   */
  createTime?: Date;
  /**
   * The document's fields. The map keys represent field names. A simple field
   * name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`,
   * and must not start with `0` to `9`. For example, `foo_bar_17`. Field names
   * matching the regular expression `__.*__` are reserved. Reserved field names
   * are forbidden except in certain documented contexts. The map keys,
   * represented as UTF-8, must not exceed 1,500 bytes and cannot be empty.
   * Field paths may be used in other contexts to refer to structured fields
   * defined here. For `map_value`, the field path is represented by the simple
   * or quoted field names of the containing fields, delimited by `.`. For
   * example, the structured field `"foo" : { map_value: { "x&y" : {
   * string_value: "hello" }}}` would be represented by the field path
   * `foo.x&y`. Within a field path, a quoted field name starts and ends with ``
   * ` `` and may contain any character. Some characters, including `` ` ``,
   * must be escaped using a `\`. For example, `` `x&y` `` represents `x&y` and
   * `` `bak\`tik` `` represents `` bak`tik ``.
   */
  fields?: {
    [key: string]: Value
  };
  /**
   * The resource name of the document, for example
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  name?: string;
  /**
   * Output only. The time at which the document was last changed. This value
   * is initially set to the `create_time` then increases monotonically with
   * each change to the document. It can also be compared to values from other
   * documents and the `read_time` of a query.
   */
  updateTime?: Date;
}

function serializeDocument(data: any): Document {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeDocument(data: any): Document {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A Document has changed. May be the result of multiple writes, including
 * deletes, that ultimately resulted in a new value for the Document. Multiple
 * DocumentChange messages may be returned for the same logical change, if
 * multiple targets are affected.
 */
export interface DocumentChange {
  /**
   * The new state of the Document. If `mask` is set, contains only fields that
   * were updated or added.
   */
  document?: Document;
  /**
   * A set of target IDs for targets that no longer match this document.
   */
  removedTargetIds?: number[];
  /**
   * A set of target IDs of targets that match this document.
   */
  targetIds?: number[];
}

function serializeDocumentChange(data: any): DocumentChange {
  return {
    ...data,
    document: data["document"] !== undefined ? serializeDocument(data["document"]) : undefined,
  };
}

function deserializeDocumentChange(data: any): DocumentChange {
  return {
    ...data,
    document: data["document"] !== undefined ? deserializeDocument(data["document"]) : undefined,
  };
}

/**
 * A Document has been deleted. May be the result of multiple writes, including
 * updates, the last of which deleted the Document. Multiple DocumentDelete
 * messages may be returned for the same logical delete, if multiple targets are
 * affected.
 */
export interface DocumentDelete {
  /**
   * The resource name of the Document that was deleted.
   */
  document?: string;
  /**
   * The read timestamp at which the delete was observed. Greater or equal to
   * the `commit_time` of the delete.
   */
  readTime?: Date;
  /**
   * A set of target IDs for targets that previously matched this entity.
   */
  removedTargetIds?: number[];
}

function serializeDocumentDelete(data: any): DocumentDelete {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeDocumentDelete(data: any): DocumentDelete {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * A set of field paths on a document. Used to restrict a get or update
 * operation on a document to a subset of its fields. This is different from
 * standard field masks, as this is always scoped to a Document, and takes in
 * account the dynamic nature of Value.
 */
export interface DocumentMask {
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  fieldPaths?: string[];
}

/**
 * A Document has been removed from the view of the targets. Sent if the
 * document is no longer relevant to a target and is out of view. Can be sent
 * instead of a DocumentDelete or a DocumentChange if the server can not send
 * the new value of the document. Multiple DocumentRemove messages may be
 * returned for the same logical write or delete, if multiple targets are
 * affected.
 */
export interface DocumentRemove {
  /**
   * The resource name of the Document that has gone out of view.
   */
  document?: string;
  /**
   * The read timestamp at which the remove was observed. Greater or equal to
   * the `commit_time` of the change/delete/remove.
   */
  readTime?: Date;
  /**
   * A set of target IDs for targets that previously matched this document.
   */
  removedTargetIds?: number[];
}

function serializeDocumentRemove(data: any): DocumentRemove {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeDocumentRemove(data: any): DocumentRemove {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * A target specified by a set of documents names.
 */
export interface DocumentsTarget {
  /**
   * The names of the documents to retrieve. In the format:
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   * The request will fail if any of the document is not a child resource of the
   * given `database`. Duplicate names will be elided.
   */
  documents?: string[];
}

/**
 * A transformation of a document.
 */
export interface DocumentTransform {
  /**
   * The name of the document to transform.
   */
  document?: string;
  /**
   * The list of transformations to apply to the fields of the document, in
   * order. This must not be empty.
   */
  fieldTransforms?: FieldTransform[];
}

function serializeDocumentTransform(data: any): DocumentTransform {
  return {
    ...data,
    fieldTransforms: data["fieldTransforms"] !== undefined ? data["fieldTransforms"].map((item: any) => (serializeFieldTransform(item))) : undefined,
  };
}

function deserializeDocumentTransform(data: any): DocumentTransform {
  return {
    ...data,
    fieldTransforms: data["fieldTransforms"] !== undefined ? data["fieldTransforms"].map((item: any) => (deserializeFieldTransform(item))) : undefined,
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
 * A digest of all the documents that match a given target.
 */
export interface ExistenceFilter {
  /**
   * The total count of documents that match target_id. If different from the
   * count of documents in the client that match, the client must manually
   * determine which documents no longer match the target.
   */
  count?: number;
  /**
   * The target ID to which this filter applies.
   */
  targetId?: number;
}

/**
 * A filter on a specific field.
 */
export interface FieldFilter {
  /**
   * The field to filter by.
   */
  field?: FieldReference;
  /**
   * The operator to filter by.
   */
  op?:  | "OPERATOR_UNSPECIFIED" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL" | "EQUAL" | "NOT_EQUAL" | "ARRAY_CONTAINS" | "IN" | "ARRAY_CONTAINS_ANY" | "NOT_IN";
  /**
   * The value to compare to.
   */
  value?: Value;
}

function serializeFieldFilter(data: any): FieldFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeValue(data["value"]) : undefined,
  };
}

function deserializeFieldFilter(data: any): FieldFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeValue(data["value"]) : undefined,
  };
}

/**
 * A reference to a field in a document, ex: `stats.operations`.
 */
export interface FieldReference {
  /**
   * The relative path of the document being referenced. Requires: * Conform to
   * document field name limitations.
   */
  fieldPath?: string;
}

/**
 * A transformation of a field of the document.
 */
export interface FieldTransform {
  /**
   * Append the given elements in order if they are not already present in the
   * current field value. If the field is not an array, or if the field does not
   * yet exist, it is first set to the empty array. Equivalent numbers of
   * different types (e.g. 3L and 3.0) are considered equal when checking if a
   * value is missing. NaN is equal to NaN, and Null is equal to Null. If the
   * input contains multiple equivalent values, only the first will be
   * considered. The corresponding transform_result will be the null value.
   */
  appendMissingElements?: ArrayValue;
  /**
   * The path of the field. See Document.fields for the field path syntax
   * reference.
   */
  fieldPath?: string;
  /**
   * Adds the given value to the field's current value. This must be an integer
   * or a double value. If the field is not an integer or double, or if the
   * field does not yet exist, the transformation will set the field to the
   * given value. If either of the given value or the current field value are
   * doubles, both values will be interpreted as doubles. Double arithmetic and
   * representation of double values follow IEEE 754 semantics. If there is
   * positive/negative integer overflow, the field is resolved to the largest
   * magnitude positive/negative integer.
   */
  increment?: Value;
  /**
   * Sets the field to the maximum of its current value and the given value.
   * This must be an integer or a double value. If the field is not an integer
   * or double, or if the field does not yet exist, the transformation will set
   * the field to the given value. If a maximum operation is applied where the
   * field and the input value are of mixed types (that is - one is an integer
   * and one is a double) the field takes on the type of the larger operand. If
   * the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0,
   * 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero
   * input value is always the stored value. The maximum of any numeric value x
   * and NaN is NaN.
   */
  maximum?: Value;
  /**
   * Sets the field to the minimum of its current value and the given value.
   * This must be an integer or a double value. If the field is not an integer
   * or double, or if the field does not yet exist, the transformation will set
   * the field to the input value. If a minimum operation is applied where the
   * field and the input value are of mixed types (that is - one is an integer
   * and one is a double) the field takes on the type of the smaller operand. If
   * the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0,
   * 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero
   * input value is always the stored value. The minimum of any numeric value x
   * and NaN is NaN.
   */
  minimum?: Value;
  /**
   * Remove all of the given elements from the array in the field. If the field
   * is not an array, or if the field does not yet exist, it is set to the empty
   * array. Equivalent numbers of the different types (e.g. 3L and 3.0) are
   * considered equal when deciding whether an element should be removed. NaN is
   * equal to NaN, and Null is equal to Null. This will remove all equivalent
   * values if there are duplicates. The corresponding transform_result will be
   * the null value.
   */
  removeAllFromArray?: ArrayValue;
  /**
   * Sets the field to the given server value.
   */
  setToServerValue?:  | "SERVER_VALUE_UNSPECIFIED" | "REQUEST_TIME";
}

function serializeFieldTransform(data: any): FieldTransform {
  return {
    ...data,
    appendMissingElements: data["appendMissingElements"] !== undefined ? serializeArrayValue(data["appendMissingElements"]) : undefined,
    increment: data["increment"] !== undefined ? serializeValue(data["increment"]) : undefined,
    maximum: data["maximum"] !== undefined ? serializeValue(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? serializeValue(data["minimum"]) : undefined,
    removeAllFromArray: data["removeAllFromArray"] !== undefined ? serializeArrayValue(data["removeAllFromArray"]) : undefined,
  };
}

function deserializeFieldTransform(data: any): FieldTransform {
  return {
    ...data,
    appendMissingElements: data["appendMissingElements"] !== undefined ? deserializeArrayValue(data["appendMissingElements"]) : undefined,
    increment: data["increment"] !== undefined ? deserializeValue(data["increment"]) : undefined,
    maximum: data["maximum"] !== undefined ? deserializeValue(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? deserializeValue(data["minimum"]) : undefined,
    removeAllFromArray: data["removeAllFromArray"] !== undefined ? deserializeArrayValue(data["removeAllFromArray"]) : undefined,
  };
}

/**
 * A filter.
 */
export interface Filter {
  /**
   * A composite filter.
   */
  compositeFilter?: CompositeFilter;
  /**
   * A filter on a document field.
   */
  fieldFilter?: FieldFilter;
  /**
   * A filter that takes exactly one argument.
   */
  unaryFilter?: UnaryFilter;
}

function serializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? serializeCompositeFilter(data["compositeFilter"]) : undefined,
    fieldFilter: data["fieldFilter"] !== undefined ? serializeFieldFilter(data["fieldFilter"]) : undefined,
  };
}

function deserializeFilter(data: any): Filter {
  return {
    ...data,
    compositeFilter: data["compositeFilter"] !== undefined ? deserializeCompositeFilter(data["compositeFilter"]) : undefined,
    fieldFilter: data["fieldFilter"] !== undefined ? deserializeFieldFilter(data["fieldFilter"]) : undefined,
  };
}

/**
 * A Cloud Firestore Database. Currently only one database is allowed per cloud
 * project; this database must have a `database_id` of '(default)'.
 */
export interface GoogleFirestoreAdminV1Database {
  /**
   * The App Engine integration mode to use for this database.
   */
  appEngineIntegrationMode?:  | "APP_ENGINE_INTEGRATION_MODE_UNSPECIFIED" | "ENABLED" | "DISABLED";
  /**
   * The concurrency control mode to use for this database.
   */
  concurrencyMode?:  | "CONCURRENCY_MODE_UNSPECIFIED" | "OPTIMISTIC" | "PESSIMISTIC" | "OPTIMISTIC_WITH_ENTITY_GROUPS";
  /**
   * Output only. The timestamp at which this database was created.
   */
  readonly createTime?: Date;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Output only. The key_prefix for this database. This key_prefix is used, in
   * combination with the project id ("~") to construct the application id that
   * is returned from the Cloud Datastore APIs in Google App Engine first
   * generation runtimes. This value may be empty in which case the appid to use
   * for URL-encoded keys is the project_id (eg: foo instead of v~foo).
   */
  readonly keyPrefix?: string;
  /**
   * The location of the database. Available databases are listed at
   * https://cloud.google.com/firestore/docs/locations.
   */
  locationId?: string;
  /**
   * The resource name of the Database. Format:
   * `projects/{project}/databases/{database}`
   */
  name?: string;
  /**
   * The type of the database. See
   * https://cloud.google.com/datastore/docs/firestore-or-datastore for
   * information about how to choose.
   */
  type?:  | "DATABASE_TYPE_UNSPECIFIED" | "FIRESTORE_NATIVE" | "DATASTORE_MODE";
  /**
   * Output only. The system-generated UUID4 for this Database.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp at which this database was most recently
   * updated. Note this only includes updates to the database resource and not
   * data contained by the database.
   */
  readonly updateTime?: Date;
}

/**
 * Metadata for google.longrunning.Operation results from
 * FirestoreAdmin.ExportDocuments.
 */
export interface GoogleFirestoreAdminV1ExportDocumentsMetadata {
  /**
   * Which collection ids are being exported.
   */
  collectionIds?: string[];
  /**
   * The time this operation completed. Will be unset if operation still in
   * progress.
   */
  endTime?: Date;
  /**
   * Which namespace ids are being exported.
   */
  namespaceIds?: string[];
  /**
   * The state of the export operation.
   */
  operationState?:  | "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * Where the documents are being exported to.
   */
  outputUriPrefix?: string;
  /**
   * The progress, in bytes, of this operation.
   */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /**
   * The progress, in documents, of this operation.
   */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /**
   * The time this operation started.
   */
  startTime?: Date;
}

function serializeGoogleFirestoreAdminV1ExportDocumentsMetadata(data: any): GoogleFirestoreAdminV1ExportDocumentsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirestoreAdminV1ExportDocumentsMetadata(data: any): GoogleFirestoreAdminV1ExportDocumentsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The request for FirestoreAdmin.ExportDocuments.
 */
export interface GoogleFirestoreAdminV1ExportDocumentsRequest {
  /**
   * Which collection ids to export. Unspecified means all collections.
   */
  collectionIds?: string[];
  /**
   * An empty list represents all namespaces. This is the preferred usage for
   * databases that don't use namespaces. An empty string element represents the
   * default namespace. This should be used if the database has data in
   * non-default namespaces, but doesn't want to include them. Each namespace in
   * this list must be unique.
   */
  namespaceIds?: string[];
  /**
   * The output URI. Currently only supports Google Cloud Storage URIs of the
   * form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name
   * of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional
   * Google Cloud Storage namespace path. When choosing a name, be sure to
   * consider Google Cloud Storage naming guidelines:
   * https://cloud.google.com/storage/docs/naming. If the URI is a bucket
   * (without a namespace path), a prefix will be generated based on the start
   * time.
   */
  outputUriPrefix?: string;
}

/**
 * Returned in the google.longrunning.Operation response field.
 */
export interface GoogleFirestoreAdminV1ExportDocumentsResponse {
  /**
   * Location of the output files. This can be used to begin an import into
   * Cloud Firestore (this project or another project) after the operation
   * completes successfully.
   */
  outputUriPrefix?: string;
}

/**
 * Represents a single field in the database. Fields are grouped by their
 * "Collection Group", which represent all collections in the database with the
 * same id.
 */
export interface GoogleFirestoreAdminV1Field {
  /**
   * The index configuration for this field. If unset, field indexing will
   * revert to the configuration defined by the `ancestor_field`. To explicitly
   * remove all indexes for this field, specify an index config with an empty
   * list of indexes.
   */
  indexConfig?: GoogleFirestoreAdminV1IndexConfig;
  /**
   * Required. A field name of the form
   * `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`
   * A field path may be a simple field name, e.g. `address` or a path to fields
   * within map_value , e.g. `address.city`, or a special field path. The only
   * valid special field is `*`, which represents any field. Field paths may be
   * quoted using ` (backtick). The only character that needs to be escaped
   * within a quoted field path is the backtick character itself, escaped using
   * a backslash. Special characters in field paths that must be quoted include:
   * `*`, `.`, ``` (backtick), `[`, `]`, as well as any ascii symbolic
   * characters. Examples: (Note: Comments here are written in markdown syntax,
   * so there is an additional layer of backticks to represent a code block)
   * `\`address.city\`` represents a field named `address.city`, not the map key
   * `city` in the field `address`. `\`*\`` represents a field named `*`, not
   * any field. A special `Field` contains the default indexing settings for all
   * fields. This field's resource name is:
   * `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*`
   * Indexes defined on this `Field` will be applied to all fields which do not
   * have their own `Field` index configuration.
   */
  name?: string;
  /**
   * The TTL configuration for this `Field`. Setting or unsetting this will
   * enable or disable the TTL for documents that have this `Field`.
   */
  ttlConfig?: GoogleFirestoreAdminV1TtlConfig;
}

/**
 * Metadata for google.longrunning.Operation results from
 * FirestoreAdmin.UpdateField.
 */
export interface GoogleFirestoreAdminV1FieldOperationMetadata {
  /**
   * The time this operation completed. Will be unset if operation still in
   * progress.
   */
  endTime?: Date;
  /**
   * The field resource that this operation is acting on. For example:
   * `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}`
   */
  field?: string;
  /**
   * A list of IndexConfigDelta, which describe the intent of this operation.
   */
  indexConfigDeltas?: GoogleFirestoreAdminV1IndexConfigDelta[];
  /**
   * The progress, in bytes, of this operation.
   */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /**
   * The progress, in documents, of this operation.
   */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /**
   * The time this operation started.
   */
  startTime?: Date;
  /**
   * The state of the operation.
   */
  state?:  | "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * Describes the deltas of TTL configuration.
   */
  ttlConfigDelta?: GoogleFirestoreAdminV1TtlConfigDelta;
}

function serializeGoogleFirestoreAdminV1FieldOperationMetadata(data: any): GoogleFirestoreAdminV1FieldOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirestoreAdminV1FieldOperationMetadata(data: any): GoogleFirestoreAdminV1FieldOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Metadata for google.longrunning.Operation results from
 * FirestoreAdmin.ImportDocuments.
 */
export interface GoogleFirestoreAdminV1ImportDocumentsMetadata {
  /**
   * Which collection ids are being imported.
   */
  collectionIds?: string[];
  /**
   * The time this operation completed. Will be unset if operation still in
   * progress.
   */
  endTime?: Date;
  /**
   * The location of the documents being imported.
   */
  inputUriPrefix?: string;
  /**
   * Which namespace ids are being imported.
   */
  namespaceIds?: string[];
  /**
   * The state of the import operation.
   */
  operationState?:  | "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * The progress, in bytes, of this operation.
   */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /**
   * The progress, in documents, of this operation.
   */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /**
   * The time this operation started.
   */
  startTime?: Date;
}

function serializeGoogleFirestoreAdminV1ImportDocumentsMetadata(data: any): GoogleFirestoreAdminV1ImportDocumentsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirestoreAdminV1ImportDocumentsMetadata(data: any): GoogleFirestoreAdminV1ImportDocumentsMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The request for FirestoreAdmin.ImportDocuments.
 */
export interface GoogleFirestoreAdminV1ImportDocumentsRequest {
  /**
   * Which collection ids to import. Unspecified means all collections included
   * in the import.
   */
  collectionIds?: string[];
  /**
   * Location of the exported files. This must match the output_uri_prefix of
   * an ExportDocumentsResponse from an export that has completed successfully.
   * See: google.firestore.admin.v1.ExportDocumentsResponse.output_uri_prefix.
   */
  inputUriPrefix?: string;
  /**
   * An empty list represents all namespaces. This is the preferred usage for
   * databases that don't use namespaces. An empty string element represents the
   * default namespace. This should be used if the database has data in
   * non-default namespaces, but doesn't want to include them. Each namespace in
   * this list must be unique.
   */
  namespaceIds?: string[];
}

/**
 * Cloud Firestore indexes enable simple and complex queries against documents
 * in a database.
 */
export interface GoogleFirestoreAdminV1Index {
  /**
   * The API scope supported by this index.
   */
  apiScope?:  | "ANY_API" | "DATASTORE_MODE_API";
  /**
   * The fields supported by this index. For composite indexes, this requires a
   * minimum of 2 and a maximum of 100 fields. The last field entry is always
   * for the field path `__name__`. If, on creation, `__name__` was not
   * specified as the last field, it will be added automatically with the same
   * direction as that of the last field defined. If the final field in a
   * composite index is not directional, the `__name__` will be ordered
   * ASCENDING (unless explicitly specified). For single field indexes, this
   * will always be exactly one entry with a field path equal to the field path
   * of the associated field.
   */
  fields?: GoogleFirestoreAdminV1IndexField[];
  /**
   * Output only. A server defined name for this index. The form of this name
   * for composite indexes will be:
   * `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}`
   * For single field indexes, this field will be empty.
   */
  name?: string;
  /**
   * Indexes with a collection query scope specified allow queries against a
   * collection that is the child of a specific document, specified at query
   * time, and that has the same collection id. Indexes with a collection group
   * query scope specified allow queries against all collections descended from
   * a specific document, specified at query time, and that have the same
   * collection id as this index.
   */
  queryScope?:  | "QUERY_SCOPE_UNSPECIFIED" | "COLLECTION" | "COLLECTION_GROUP" | "COLLECTION_RECURSIVE";
  /**
   * Output only. The serving state of the index.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "NEEDS_REPAIR";
}

/**
 * The index configuration for this field.
 */
export interface GoogleFirestoreAdminV1IndexConfig {
  /**
   * Output only. Specifies the resource name of the `Field` from which this
   * field's index configuration is set (when `uses_ancestor_config` is true),
   * or from which it *would* be set if this field had no index configuration
   * (when `uses_ancestor_config` is false).
   */
  ancestorField?: string;
  /**
   * The indexes supported for this field.
   */
  indexes?: GoogleFirestoreAdminV1Index[];
  /**
   * Output only When true, the `Field`'s index configuration is in the process
   * of being reverted. Once complete, the index config will transition to the
   * same state as the field specified by `ancestor_field`, at which point
   * `uses_ancestor_config` will be `true` and `reverting` will be `false`.
   */
  reverting?: boolean;
  /**
   * Output only. When true, the `Field`'s index configuration is set from the
   * configuration specified by the `ancestor_field`. When false, the `Field`'s
   * index configuration is defined explicitly.
   */
  usesAncestorConfig?: boolean;
}

/**
 * Information about an index configuration change.
 */
export interface GoogleFirestoreAdminV1IndexConfigDelta {
  /**
   * Specifies how the index is changing.
   */
  changeType?:  | "CHANGE_TYPE_UNSPECIFIED" | "ADD" | "REMOVE";
  /**
   * The index being changed.
   */
  index?: GoogleFirestoreAdminV1Index;
}

/**
 * A field in an index. The field_path describes which field is indexed, the
 * value_mode describes how the field value is indexed.
 */
export interface GoogleFirestoreAdminV1IndexField {
  /**
   * Indicates that this field supports operations on `array_value`s.
   */
  arrayConfig?:  | "ARRAY_CONFIG_UNSPECIFIED" | "CONTAINS";
  /**
   * Can be __name__. For single field indexes, this must match the name of the
   * field or may be omitted.
   */
  fieldPath?: string;
  /**
   * Indicates that this field supports ordering by the specified order or
   * comparing using =, !=, <, <=, >, >=.
   */
  order?:  | "ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
}

/**
 * Metadata for google.longrunning.Operation results from
 * FirestoreAdmin.CreateIndex.
 */
export interface GoogleFirestoreAdminV1IndexOperationMetadata {
  /**
   * The time this operation completed. Will be unset if operation still in
   * progress.
   */
  endTime?: Date;
  /**
   * The index resource that this operation is acting on. For example:
   * `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}`
   */
  index?: string;
  /**
   * The progress, in bytes, of this operation.
   */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /**
   * The progress, in documents, of this operation.
   */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /**
   * The time this operation started.
   */
  startTime?: Date;
  /**
   * The state of the operation.
   */
  state?:  | "OPERATION_STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "CANCELLING" | "FINALIZING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
}

function serializeGoogleFirestoreAdminV1IndexOperationMetadata(data: any): GoogleFirestoreAdminV1IndexOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    progressBytes: data["progressBytes"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? serializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirestoreAdminV1IndexOperationMetadata(data: any): GoogleFirestoreAdminV1IndexOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    progressBytes: data["progressBytes"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressBytes"]) : undefined,
    progressDocuments: data["progressDocuments"] !== undefined ? deserializeGoogleFirestoreAdminV1Progress(data["progressDocuments"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The list of databases for a project.
 */
export interface GoogleFirestoreAdminV1ListDatabasesResponse {
  /**
   * The databases in the project.
   */
  databases?: GoogleFirestoreAdminV1Database[];
}

/**
 * The response for FirestoreAdmin.ListFields.
 */
export interface GoogleFirestoreAdminV1ListFieldsResponse {
  /**
   * The requested fields.
   */
  fields?: GoogleFirestoreAdminV1Field[];
  /**
   * A page token that may be used to request another page of results. If
   * blank, this is the last page.
   */
  nextPageToken?: string;
}

/**
 * The response for FirestoreAdmin.ListIndexes.
 */
export interface GoogleFirestoreAdminV1ListIndexesResponse {
  /**
   * The requested indexes.
   */
  indexes?: GoogleFirestoreAdminV1Index[];
  /**
   * A page token that may be used to request another page of results. If
   * blank, this is the last page.
   */
  nextPageToken?: string;
}

/**
 * The metadata message for google.cloud.location.Location.metadata.
 */
export interface GoogleFirestoreAdminV1LocationMetadata {
}

/**
 * Describes the progress of the operation. Unit of work is generic and must be
 * interpreted based on where Progress is used.
 */
export interface GoogleFirestoreAdminV1Progress {
  /**
   * The amount of work completed.
   */
  completedWork?: bigint;
  /**
   * The amount of work estimated.
   */
  estimatedWork?: bigint;
}

function serializeGoogleFirestoreAdminV1Progress(data: any): GoogleFirestoreAdminV1Progress {
  return {
    ...data,
    completedWork: data["completedWork"] !== undefined ? String(data["completedWork"]) : undefined,
    estimatedWork: data["estimatedWork"] !== undefined ? String(data["estimatedWork"]) : undefined,
  };
}

function deserializeGoogleFirestoreAdminV1Progress(data: any): GoogleFirestoreAdminV1Progress {
  return {
    ...data,
    completedWork: data["completedWork"] !== undefined ? BigInt(data["completedWork"]) : undefined,
    estimatedWork: data["estimatedWork"] !== undefined ? BigInt(data["estimatedWork"]) : undefined,
  };
}

/**
 * The TTL (time-to-live) configuration for documents that have this `Field`
 * set. Storing a timestamp value into a TTL-enabled field will be treated as
 * the document's absolute expiration time. Timestamp values in the past
 * indicate that the document is eligible for immediate expiration. Using any
 * other data type or leaving the field absent will disable expiration for the
 * individual document.
 */
export interface GoogleFirestoreAdminV1TtlConfig {
  /**
   * Output only. The state of the TTL configuration.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "NEEDS_REPAIR";
}

/**
 * Information about an TTL configuration change.
 */
export interface GoogleFirestoreAdminV1TtlConfigDelta {
  /**
   * Specifies how the TTL configuration is changing.
   */
  changeType?:  | "CHANGE_TYPE_UNSPECIFIED" | "ADD" | "REMOVE";
}

/**
 * Metadata related to the update database operation.
 */
export interface GoogleFirestoreAdminV1UpdateDatabaseMetadata {
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
 * The request for Firestore.ListCollectionIds.
 */
export interface ListCollectionIdsRequest {
  /**
   * The maximum number of results to return.
   */
  pageSize?: number;
  /**
   * A page token. Must be a value from ListCollectionIdsResponse.
   */
  pageToken?: string;
  /**
   * Reads documents as they were at the given time. This may not be older than
   * 270 seconds.
   */
  readTime?: Date;
}

function serializeListCollectionIdsRequest(data: any): ListCollectionIdsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeListCollectionIdsRequest(data: any): ListCollectionIdsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * The response from Firestore.ListCollectionIds.
 */
export interface ListCollectionIdsResponse {
  /**
   * The collection ids.
   */
  collectionIds?: string[];
  /**
   * A page token that may be used to continue the list.
   */
  nextPageToken?: string;
}

/**
 * The response for Firestore.ListDocuments.
 */
export interface ListDocumentsResponse {
  /**
   * The Documents found.
   */
  documents?: Document[];
  /**
   * A token to retrieve the next page of documents. If this field is omitted,
   * there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListDocumentsResponse(data: any): ListDocumentsResponse {
  return {
    ...data,
    documents: data["documents"] !== undefined ? data["documents"].map((item: any) => (serializeDocument(item))) : undefined,
  };
}

function deserializeListDocumentsResponse(data: any): ListDocumentsResponse {
  return {
    ...data,
    documents: data["documents"] !== undefined ? data["documents"].map((item: any) => (deserializeDocument(item))) : undefined,
  };
}

/**
 * A request for Firestore.Listen
 */
export interface ListenRequest {
  /**
   * A target to add to this stream.
   */
  addTarget?: Target;
  /**
   * Labels associated with this target change.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The ID of a target to remove from this stream.
   */
  removeTarget?: number;
}

function serializeListenRequest(data: any): ListenRequest {
  return {
    ...data,
    addTarget: data["addTarget"] !== undefined ? serializeTarget(data["addTarget"]) : undefined,
  };
}

function deserializeListenRequest(data: any): ListenRequest {
  return {
    ...data,
    addTarget: data["addTarget"] !== undefined ? deserializeTarget(data["addTarget"]) : undefined,
  };
}

/**
 * The response for Firestore.Listen.
 */
export interface ListenResponse {
  /**
   * A Document has changed.
   */
  documentChange?: DocumentChange;
  /**
   * A Document has been deleted.
   */
  documentDelete?: DocumentDelete;
  /**
   * A Document has been removed from a target (because it is no longer
   * relevant to that target).
   */
  documentRemove?: DocumentRemove;
  /**
   * A filter to apply to the set of documents previously returned for the
   * given target. Returned when documents may have been removed from the given
   * target, but the exact documents are unknown.
   */
  filter?: ExistenceFilter;
  /**
   * Targets have changed.
   */
  targetChange?: TargetChange;
}

function serializeListenResponse(data: any): ListenResponse {
  return {
    ...data,
    documentChange: data["documentChange"] !== undefined ? serializeDocumentChange(data["documentChange"]) : undefined,
    documentDelete: data["documentDelete"] !== undefined ? serializeDocumentDelete(data["documentDelete"]) : undefined,
    documentRemove: data["documentRemove"] !== undefined ? serializeDocumentRemove(data["documentRemove"]) : undefined,
    targetChange: data["targetChange"] !== undefined ? serializeTargetChange(data["targetChange"]) : undefined,
  };
}

function deserializeListenResponse(data: any): ListenResponse {
  return {
    ...data,
    documentChange: data["documentChange"] !== undefined ? deserializeDocumentChange(data["documentChange"]) : undefined,
    documentDelete: data["documentDelete"] !== undefined ? deserializeDocumentDelete(data["documentDelete"]) : undefined,
    documentRemove: data["documentRemove"] !== undefined ? deserializeDocumentRemove(data["documentRemove"]) : undefined,
    targetChange: data["targetChange"] !== undefined ? deserializeTargetChange(data["targetChange"]) : undefined,
  };
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: Location[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface Location {
  /**
   * The friendly name for this location, typically a nearby city name. For
   * example, "Tokyo".
   */
  displayName?: string;
  /**
   * Cross-service attributes for the location. For example
   * {"cloud.googleapis.com/region": "us-east1"}
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The canonical id for this location. For example: `"us-east1"`.
   */
  locationId?: string;
  /**
   * Service-specific metadata. For example the available capacity at the given
   * location.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Resource name for the location, which may vary between implementations.
   * For example: `"projects/example-project/locations/us-east1"`
   */
  name?: string;
}

/**
 * A map value.
 */
export interface MapValue {
  /**
   * The map's fields. The map keys represent field names. Field names matching
   * the regular expression `__.*__` are reserved. Reserved field names are
   * forbidden except in certain documented contexts. The map keys, represented
   * as UTF-8, must not exceed 1,500 bytes and cannot be empty.
   */
  fields?: {
    [key: string]: Value
  };
}

function serializeMapValue(data: any): MapValue {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
  };
}

function deserializeMapValue(data: any): MapValue {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
  };
}

/**
 * An order on a field.
 */
export interface Order {
  /**
   * The direction to order by. Defaults to `ASCENDING`.
   */
  direction?:  | "DIRECTION_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
  /**
   * The field to order by.
   */
  field?: FieldReference;
}

/**
 * The request for Firestore.PartitionQuery.
 */
export interface PartitionQueryRequest {
  /**
   * The maximum number of partitions to return in this call, subject to
   * `partition_count`. For example, if `partition_count` = 10 and `page_size` =
   * 8, the first call to PartitionQuery will return up to 8 partitions and a
   * `next_page_token` if more results exist. A second call to PartitionQuery
   * will return up to 2 partitions, to complete the total of 10 specified in
   * `partition_count`.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous call to
   * PartitionQuery that may be used to get an additional set of results. There
   * are no ordering guarantees between sets of results. Thus, using multiple
   * sets of results will require merging the different result sets. For
   * example, two subsequent calls using a page_token may return: * cursor B,
   * cursor M, cursor Q * cursor A, cursor U, cursor W To obtain a complete
   * result set ordered with respect to the results of the query supplied to
   * PartitionQuery, the results sets should be merged: cursor A, cursor B,
   * cursor M, cursor Q, cursor U, cursor W
   */
  pageToken?: string;
  /**
   * The desired maximum number of partition points. The partitions may be
   * returned across multiple pages of results. The number must be positive. The
   * actual number of partitions returned may be fewer. For example, this may be
   * set to one fewer than the number of parallel queries to be run, or in
   * running a data pipeline job, one fewer than the number of workers or
   * compute instances available.
   */
  partitionCount?: bigint;
  /**
   * Reads documents as they were at the given time. This may not be older than
   * 270 seconds.
   */
  readTime?: Date;
  /**
   * A structured query. Query must specify collection with all descendants and
   * be ordered by name ascending. Other filters, order bys, limits, offsets,
   * and start/end cursors are not supported.
   */
  structuredQuery?: StructuredQuery;
}

function serializePartitionQueryRequest(data: any): PartitionQueryRequest {
  return {
    ...data,
    partitionCount: data["partitionCount"] !== undefined ? String(data["partitionCount"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? serializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

function deserializePartitionQueryRequest(data: any): PartitionQueryRequest {
  return {
    ...data,
    partitionCount: data["partitionCount"] !== undefined ? BigInt(data["partitionCount"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? deserializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

/**
 * The response for Firestore.PartitionQuery.
 */
export interface PartitionQueryResponse {
  /**
   * A page token that may be used to request an additional set of results, up
   * to the number specified by `partition_count` in the PartitionQuery request.
   * If blank, there are no more results.
   */
  nextPageToken?: string;
  /**
   * Partition results. Each partition is a split point that can be used by
   * RunQuery as a starting or end point for the query results. The RunQuery
   * requests must be made with the same query supplied to this PartitionQuery
   * request. The partition cursors will be ordered according to same ordering
   * as the results of the query supplied to PartitionQuery. For example, if a
   * PartitionQuery request returns partition cursors A and B, running the
   * following three queries will return the entire result set of the original
   * query: * query, end_at A * query, start_at A, end_at B * query, start_at B
   * An empty result may indicate that the query has too few results to be
   * partitioned.
   */
  partitions?: Cursor[];
}

function serializePartitionQueryResponse(data: any): PartitionQueryResponse {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? data["partitions"].map((item: any) => (serializeCursor(item))) : undefined,
  };
}

function deserializePartitionQueryResponse(data: any): PartitionQueryResponse {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? data["partitions"].map((item: any) => (deserializeCursor(item))) : undefined,
  };
}

/**
 * A precondition on a document, used for conditional operations.
 */
export interface Precondition {
  /**
   * When set to `true`, the target document must exist. When set to `false`,
   * the target document must not exist.
   */
  exists?: boolean;
  /**
   * When set, the target document must exist and have been last updated at
   * that time. Timestamp must be microsecond aligned.
   */
  updateTime?: Date;
}

function serializePrecondition(data: any): Precondition {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializePrecondition(data: any): Precondition {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The projection of document's fields to return.
 */
export interface Projection {
  /**
   * The fields to return. If empty, all fields are returned. To only return
   * the name of the document, use `['__name__']`.
   */
  fields?: FieldReference[];
}

/**
 * Additional options for
 * Firestore#projectsDatabasesCollectionGroupsFieldsList.
 */
export interface ProjectsDatabasesCollectionGroupsFieldsListOptions {
  /**
   * The filter to apply to list results. Currently, FirestoreAdmin.ListFields
   * only supports listing fields that have been explicitly overridden. To issue
   * this query, call FirestoreAdmin.ListFields with a filter that includes
   * `indexConfig.usesAncestorConfig:false` .
   */
  filter?: string;
  /**
   * The number of results to return.
   */
  pageSize?: number;
  /**
   * A page token, returned from a previous call to FirestoreAdmin.ListFields,
   * that may be used to get the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Firestore#projectsDatabasesCollectionGroupsFieldsPatch.
 */
export interface ProjectsDatabasesCollectionGroupsFieldsPatchOptions {
  /**
   * A mask, relative to the field. If specified, only configuration specified
   * by this field_mask will be updated in the field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsDatabasesCollectionGroupsFieldsPatchOptions(data: any): ProjectsDatabasesCollectionGroupsFieldsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsDatabasesCollectionGroupsFieldsPatchOptions(data: any): ProjectsDatabasesCollectionGroupsFieldsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Firestore#projectsDatabasesCollectionGroupsIndexesList.
 */
export interface ProjectsDatabasesCollectionGroupsIndexesListOptions {
  /**
   * The filter to apply to list results.
   */
  filter?: string;
  /**
   * The number of results to return.
   */
  pageSize?: number;
  /**
   * A page token, returned from a previous call to FirestoreAdmin.ListIndexes,
   * that may be used to get the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Firestore#projectsDatabasesCreate.
 */
export interface ProjectsDatabasesCreateOptions {
  /**
   * Required. The ID to use for the database, which will become the final
   * component of the database's resource name. The value must be set to
   * "(default)".
   */
  databaseId?: string;
}

/**
 * Additional options for Firestore#projectsDatabasesDelete.
 */
export interface ProjectsDatabasesDeleteOptions {
  /**
   * If set to true and the Database is not found, the request will succeed but
   * no action will be taken.
   */
  allowMissing?: boolean;
  /**
   * The current etag of the Database. If an etag is provided and does not
   * match the current etag of the database, deletion will be blocked and a
   * FAILED_PRECONDITION error will be returned.
   */
  etag?: string;
  /**
   * If set, validate the request and preview the response, but do not actually
   * delete the database.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsCreateDocument.
 */
export interface ProjectsDatabasesDocumentsCreateDocumentOptions {
  /**
   * The client-assigned document ID to use for this document. Optional. If not
   * specified, an ID will be assigned by the service.
   */
  documentId?: string;
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["mask.fieldPaths"]?: string;
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsDelete.
 */
export interface ProjectsDatabasesDocumentsDeleteOptions {
  /**
   * When set to `true`, the target document must exist. When set to `false`,
   * the target document must not exist.
   */
  ["currentDocument.exists"]?: boolean;
  /**
   * When set, the target document must exist and have been last updated at
   * that time. Timestamp must be microsecond aligned.
   */
  ["currentDocument.updateTime"]?: Date;
}

function serializeProjectsDatabasesDocumentsDeleteOptions(data: any): ProjectsDatabasesDocumentsDeleteOptions {
  return {
    ...data,
    ["currentDocument.updateTime"]: data["currentDocument.updateTime"] !== undefined ? data["currentDocument.updateTime"].toISOString() : undefined,
  };
}

function deserializeProjectsDatabasesDocumentsDeleteOptions(data: any): ProjectsDatabasesDocumentsDeleteOptions {
  return {
    ...data,
    ["currentDocument.updateTime"]: data["currentDocument.updateTime"] !== undefined ? new Date(data["currentDocument.updateTime"]) : undefined,
  };
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsGet.
 */
export interface ProjectsDatabasesDocumentsGetOptions {
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["mask.fieldPaths"]?: string;
  /**
   * Reads the version of the document at the given time. This may not be older
   * than 270 seconds.
   */
  readTime?: Date;
  /**
   * Reads the document in a transaction.
   */
  transaction?: Uint8Array;
}

function serializeProjectsDatabasesDocumentsGetOptions(data: any): ProjectsDatabasesDocumentsGetOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeProjectsDatabasesDocumentsGetOptions(data: any): ProjectsDatabasesDocumentsGetOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsListDocuments.
 */
export interface ProjectsDatabasesDocumentsListDocumentsOptions {
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["mask.fieldPaths"]?: string;
  /**
   * Optional. The optional ordering of the documents to return. For example:
   * `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in
   * Firestore queries but in a string representation. When absent, documents
   * are ordered based on `__name__ ASC`.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of documents to return in a single response.
   * Firestore may return fewer than this value.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListDocuments` response.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters (with the exception of `page_size`) must match the values set in
   * the request that generated the page token.
   */
  pageToken?: string;
  /**
   * Perform the read at the provided time. This may not be older than 270
   * seconds.
   */
  readTime?: Date;
  /**
   * If the list should show missing documents. A document is missing if it
   * does not exist, but there are sub-documents nested underneath it. When
   * true, such missing documents will be returned with a key but will not have
   * fields, `create_time`, or `update_time` set. Requests with `show_missing`
   * may not specify `where` or `order_by`.
   */
  showMissing?: boolean;
  /**
   * Perform the read as part of an already active transaction.
   */
  transaction?: Uint8Array;
}

function serializeProjectsDatabasesDocumentsListDocumentsOptions(data: any): ProjectsDatabasesDocumentsListDocumentsOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeProjectsDatabasesDocumentsListDocumentsOptions(data: any): ProjectsDatabasesDocumentsListDocumentsOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsList.
 */
export interface ProjectsDatabasesDocumentsListOptions {
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["mask.fieldPaths"]?: string;
  /**
   * Optional. The optional ordering of the documents to return. For example:
   * `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in
   * Firestore queries but in a string representation. When absent, documents
   * are ordered based on `__name__ ASC`.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of documents to return in a single response.
   * Firestore may return fewer than this value.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListDocuments` response.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters (with the exception of `page_size`) must match the values set in
   * the request that generated the page token.
   */
  pageToken?: string;
  /**
   * Perform the read at the provided time. This may not be older than 270
   * seconds.
   */
  readTime?: Date;
  /**
   * If the list should show missing documents. A document is missing if it
   * does not exist, but there are sub-documents nested underneath it. When
   * true, such missing documents will be returned with a key but will not have
   * fields, `create_time`, or `update_time` set. Requests with `show_missing`
   * may not specify `where` or `order_by`.
   */
  showMissing?: boolean;
  /**
   * Perform the read as part of an already active transaction.
   */
  transaction?: Uint8Array;
}

function serializeProjectsDatabasesDocumentsListOptions(data: any): ProjectsDatabasesDocumentsListOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeProjectsDatabasesDocumentsListOptions(data: any): ProjectsDatabasesDocumentsListOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * Additional options for Firestore#projectsDatabasesDocumentsPatch.
 */
export interface ProjectsDatabasesDocumentsPatchOptions {
  /**
   * When set to `true`, the target document must exist. When set to `false`,
   * the target document must not exist.
   */
  ["currentDocument.exists"]?: boolean;
  /**
   * When set, the target document must exist and have been last updated at
   * that time. Timestamp must be microsecond aligned.
   */
  ["currentDocument.updateTime"]?: Date;
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["mask.fieldPaths"]?: string;
  /**
   * The list of field paths in the mask. See Document.fields for a field path
   * syntax reference.
   */
  ["updateMask.fieldPaths"]?: string;
}

function serializeProjectsDatabasesDocumentsPatchOptions(data: any): ProjectsDatabasesDocumentsPatchOptions {
  return {
    ...data,
    ["currentDocument.updateTime"]: data["currentDocument.updateTime"] !== undefined ? data["currentDocument.updateTime"].toISOString() : undefined,
  };
}

function deserializeProjectsDatabasesDocumentsPatchOptions(data: any): ProjectsDatabasesDocumentsPatchOptions {
  return {
    ...data,
    ["currentDocument.updateTime"]: data["currentDocument.updateTime"] !== undefined ? new Date(data["currentDocument.updateTime"]) : undefined,
  };
}

/**
 * Additional options for Firestore#projectsDatabasesOperationsList.
 */
export interface ProjectsDatabasesOperationsListOptions {
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
 * Additional options for Firestore#projectsDatabasesPatch.
 */
export interface ProjectsDatabasesPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsDatabasesPatchOptions(data: any): ProjectsDatabasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsDatabasesPatchOptions(data: any): ProjectsDatabasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Firestore#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the `next_page_token` field in the response.
   * Send that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * A target specified by a query.
 */
export interface QueryTarget {
  /**
   * The parent resource name. In the format:
   * `projects/{project_id}/databases/{database_id}/documents` or
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   * For example: `projects/my-project/databases/my-database/documents` or
   * `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
   */
  parent?: string;
  /**
   * A structured query.
   */
  structuredQuery?: StructuredQuery;
}

function serializeQueryTarget(data: any): QueryTarget {
  return {
    ...data,
    structuredQuery: data["structuredQuery"] !== undefined ? serializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

function deserializeQueryTarget(data: any): QueryTarget {
  return {
    ...data,
    structuredQuery: data["structuredQuery"] !== undefined ? deserializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

/**
 * Options for a transaction that can only be used to read documents.
 */
export interface ReadOnly {
  /**
   * Reads documents at the given time. This may not be older than 60 seconds.
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
 * Options for a transaction that can be used to read and write documents.
 */
export interface ReadWrite {
  /**
   * An optional transaction to retry.
   */
  retryTransaction?: Uint8Array;
}

function serializeReadWrite(data: any): ReadWrite {
  return {
    ...data,
    retryTransaction: data["retryTransaction"] !== undefined ? encodeBase64(data["retryTransaction"]) : undefined,
  };
}

function deserializeReadWrite(data: any): ReadWrite {
  return {
    ...data,
    retryTransaction: data["retryTransaction"] !== undefined ? decodeBase64(data["retryTransaction"] as string) : undefined,
  };
}

/**
 * The request for Firestore.Rollback.
 */
export interface RollbackRequest {
  /**
   * Required. The transaction to roll back.
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
 * The request for Firestore.RunAggregationQuery.
 */
export interface RunAggregationQueryRequest {
  /**
   * Starts a new transaction as part of the query, defaulting to read-only.
   * The new transaction ID will be returned as the first response in the
   * stream.
   */
  newTransaction?: TransactionOptions;
  /**
   * Executes the query at the given timestamp. Requires: * Cannot be more than
   * 270 seconds in the past.
   */
  readTime?: Date;
  /**
   * An aggregation query.
   */
  structuredAggregationQuery?: StructuredAggregationQuery;
  /**
   * Run the aggregation within an already active transaction. The value here
   * is the opaque transaction ID to execute the query in.
   */
  transaction?: Uint8Array;
}

function serializeRunAggregationQueryRequest(data: any): RunAggregationQueryRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? serializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    structuredAggregationQuery: data["structuredAggregationQuery"] !== undefined ? serializeStructuredAggregationQuery(data["structuredAggregationQuery"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunAggregationQueryRequest(data: any): RunAggregationQueryRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? deserializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    structuredAggregationQuery: data["structuredAggregationQuery"] !== undefined ? deserializeStructuredAggregationQuery(data["structuredAggregationQuery"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The response for Firestore.RunAggregationQuery.
 */
export interface RunAggregationQueryResponse {
  /**
   * The time at which the aggregate result was computed. This is always
   * monotonically increasing; in this case, the previous AggregationResult in
   * the result stream are guaranteed not to have changed between their
   * `read_time` and this one. If the query returns no results, a response with
   * `read_time` and no `result` will be sent, and this represents the time at
   * which the query was run.
   */
  readTime?: Date;
  /**
   * A single aggregation result. Not present when reporting partial progress.
   */
  result?: AggregationResult;
  /**
   * The transaction that was started as part of this request. Only present on
   * the first response when the request requested to start a new transaction.
   */
  transaction?: Uint8Array;
}

function serializeRunAggregationQueryResponse(data: any): RunAggregationQueryResponse {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    result: data["result"] !== undefined ? serializeAggregationResult(data["result"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunAggregationQueryResponse(data: any): RunAggregationQueryResponse {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    result: data["result"] !== undefined ? deserializeAggregationResult(data["result"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The request for Firestore.RunQuery.
 */
export interface RunQueryRequest {
  /**
   * Starts a new transaction and reads the documents. Defaults to a read-only
   * transaction. The new transaction ID will be returned as the first response
   * in the stream.
   */
  newTransaction?: TransactionOptions;
  /**
   * Reads documents as they were at the given time. This may not be older than
   * 270 seconds.
   */
  readTime?: Date;
  /**
   * A structured query.
   */
  structuredQuery?: StructuredQuery;
  /**
   * Run the query within an already active transaction. The value here is the
   * opaque transaction ID to execute the query in.
   */
  transaction?: Uint8Array;
}

function serializeRunQueryRequest(data: any): RunQueryRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? serializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? serializeStructuredQuery(data["structuredQuery"]) : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunQueryRequest(data: any): RunQueryRequest {
  return {
    ...data,
    newTransaction: data["newTransaction"] !== undefined ? deserializeTransactionOptions(data["newTransaction"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? deserializeStructuredQuery(data["structuredQuery"]) : undefined,
    transaction: data["transaction"] !== undefined ? decodeBase64(data["transaction"] as string) : undefined,
  };
}

/**
 * The response for Firestore.RunQuery.
 */
export interface RunQueryResponse {
  /**
   * A query result, not set when reporting partial progress.
   */
  document?: Document;
  /**
   * If present, Firestore has completely finished the request and no more
   * documents will be returned.
   */
  done?: boolean;
  /**
   * The time at which the document was read. This may be monotonically
   * increasing; in this case, the previous documents in the result stream are
   * guaranteed not to have changed between their `read_time` and this one. If
   * the query returns no results, a response with `read_time` and no `document`
   * will be sent, and this represents the time at which the query was run.
   */
  readTime?: Date;
  /**
   * The number of results that have been skipped due to an offset between the
   * last response and the current response.
   */
  skippedResults?: number;
  /**
   * The transaction that was started as part of this request. Can only be set
   * in the first response, and only if RunQueryRequest.new_transaction was set
   * in the request. If set, no other fields will be set in this response.
   */
  transaction?: Uint8Array;
}

function serializeRunQueryResponse(data: any): RunQueryResponse {
  return {
    ...data,
    document: data["document"] !== undefined ? serializeDocument(data["document"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    transaction: data["transaction"] !== undefined ? encodeBase64(data["transaction"]) : undefined,
  };
}

function deserializeRunQueryResponse(data: any): RunQueryResponse {
  return {
    ...data,
    document: data["document"] !== undefined ? deserializeDocument(data["document"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
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
 * Firestore query for running an aggregation over a StructuredQuery.
 */
export interface StructuredAggregationQuery {
  /**
   * Optional. Series of aggregations to apply over the results of the
   * `structured_query`. Requires: * A minimum of one and maximum of five
   * aggregations per query.
   */
  aggregations?: Aggregation[];
  /**
   * Nested structured query.
   */
  structuredQuery?: StructuredQuery;
}

function serializeStructuredAggregationQuery(data: any): StructuredAggregationQuery {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (serializeAggregation(item))) : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? serializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

function deserializeStructuredAggregationQuery(data: any): StructuredAggregationQuery {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (deserializeAggregation(item))) : undefined,
    structuredQuery: data["structuredQuery"] !== undefined ? deserializeStructuredQuery(data["structuredQuery"]) : undefined,
  };
}

/**
 * A Firestore query.
 */
export interface StructuredQuery {
  /**
   * A potential prefix of a position in the result set to end the query at.
   * This is similar to `START_AT` but with it controlling the end position
   * rather than the start position. Requires: * The number of values cannot be
   * greater than the number of fields specified in the `ORDER BY` clause.
   */
  endAt?: Cursor;
  /**
   * The collections to query.
   */
  from?: CollectionSelector[];
  /**
   * The maximum number of results to return. Applies after all other
   * constraints. Requires: * The value must be greater than or equal to zero if
   * specified.
   */
  limit?: number;
  /**
   * The number of documents to skip before returning the first result. This
   * applies after the constraints specified by the `WHERE`, `START AT`, & `END
   * AT` but before the `LIMIT` clause. Requires: * The value must be greater
   * than or equal to zero if specified.
   */
  offset?: number;
  /**
   * The order to apply to the query results. Firestore allows callers to
   * provide a full ordering, a partial ordering, or no ordering at all. In all
   * cases, Firestore guarantees a stable ordering through the following rules:
   * * The `order_by` is required to reference all fields used with an
   * inequality filter. * All fields that are required to be in the `order_by`
   * but are not already present are appended in lexicographical ordering of the
   * field name. * If an order on `__name__` is not specified, it is appended by
   * default. Fields are appended with the same sort direction as the last order
   * specified, or 'ASCENDING' if no order was specified. For example: * `ORDER
   * BY a` becomes `ORDER BY a ASC, __name__ ASC` * `ORDER BY a DESC` becomes
   * `ORDER BY a DESC, __name__ DESC` * `WHERE a > 1` becomes `WHERE a > 1 ORDER
   * BY a ASC, __name__ ASC` * `WHERE __name__ > ... AND a > 1` becomes `WHERE
   * __name__ > ... AND a > 1 ORDER BY a ASC, __name__ ASC`
   */
  orderBy?: Order[];
  /**
   * Optional sub-set of the fields to return. This acts as a DocumentMask over
   * the documents returned from a query. When not set, assumes that the caller
   * wants all fields returned.
   */
  select?: Projection;
  /**
   * A potential prefix of a position in the result set to start the query at.
   * The ordering of the result set is based on the `ORDER BY` clause of the
   * original query. ``` SELECT * FROM k WHERE a = 1 AND b > 2 ORDER BY b ASC,
   * __name__ ASC; ``` This query's results are ordered by `(b ASC, __name__
   * ASC)`. Cursors can reference either the full ordering or a prefix of the
   * location, though it cannot reference more fields than what are in the
   * provided `ORDER BY`. Continuing off the example above, attaching the
   * following start cursors will have varying impact: - `START BEFORE (2,
   * /k/123)`: start the query right before `a = 1 AND b > 2 AND __name__ >
   * /k/123`. - `START AFTER (10)`: start the query right after `a = 1 AND b >
   * 10`. Unlike `OFFSET` which requires scanning over the first N results to
   * skip, a start cursor allows the query to begin at a logical position. This
   * position is not required to match an actual result, it will scan forward
   * from this position to find the next document. Requires: * The number of
   * values cannot be greater than the number of fields specified in the `ORDER
   * BY` clause.
   */
  startAt?: Cursor;
  /**
   * The filter to apply.
   */
  where?: Filter;
}

function serializeStructuredQuery(data: any): StructuredQuery {
  return {
    ...data,
    endAt: data["endAt"] !== undefined ? serializeCursor(data["endAt"]) : undefined,
    startAt: data["startAt"] !== undefined ? serializeCursor(data["startAt"]) : undefined,
    where: data["where"] !== undefined ? serializeFilter(data["where"]) : undefined,
  };
}

function deserializeStructuredQuery(data: any): StructuredQuery {
  return {
    ...data,
    endAt: data["endAt"] !== undefined ? deserializeCursor(data["endAt"]) : undefined,
    startAt: data["startAt"] !== undefined ? deserializeCursor(data["startAt"]) : undefined,
    where: data["where"] !== undefined ? deserializeFilter(data["where"]) : undefined,
  };
}

/**
 * A specification of a set of documents to listen to.
 */
export interface Target {
  /**
   * A target specified by a set of document names.
   */
  documents?: DocumentsTarget;
  /**
   * If the target should be removed once it is current and consistent.
   */
  once?: boolean;
  /**
   * A target specified by a query.
   */
  query?: QueryTarget;
  /**
   * Start listening after a specific `read_time`. The client must know the
   * state of matching documents at this time.
   */
  readTime?: Date;
  /**
   * A resume token from a prior TargetChange for an identical target. Using a
   * resume token with a different target is unsupported and may fail.
   */
  resumeToken?: Uint8Array;
  /**
   * The target ID that identifies the target on the stream. Must be a positive
   * number and non-zero.
   */
  targetId?: number;
}

function serializeTarget(data: any): Target {
  return {
    ...data,
    query: data["query"] !== undefined ? serializeQueryTarget(data["query"]) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    resumeToken: data["resumeToken"] !== undefined ? encodeBase64(data["resumeToken"]) : undefined,
  };
}

function deserializeTarget(data: any): Target {
  return {
    ...data,
    query: data["query"] !== undefined ? deserializeQueryTarget(data["query"]) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? decodeBase64(data["resumeToken"] as string) : undefined,
  };
}

/**
 * Targets being watched have changed.
 */
export interface TargetChange {
  /**
   * The error that resulted in this change, if applicable.
   */
  cause?: Status;
  /**
   * The consistent `read_time` for the given `target_ids` (omitted when the
   * target_ids are not at a consistent snapshot). The stream is guaranteed to
   * send a `read_time` with `target_ids` empty whenever the entire stream
   * reaches a new consistent snapshot. ADD, CURRENT, and RESET messages are
   * guaranteed to (eventually) result in a new consistent snapshot (while
   * NO_CHANGE and REMOVE messages are not). For a given stream, `read_time` is
   * guaranteed to be monotonically increasing.
   */
  readTime?: Date;
  /**
   * A token that can be used to resume the stream for the given `target_ids`,
   * or all targets if `target_ids` is empty. Not set on every target change.
   */
  resumeToken?: Uint8Array;
  /**
   * The type of change that occurred.
   */
  targetChangeType?:  | "NO_CHANGE" | "ADD" | "REMOVE" | "CURRENT" | "RESET";
  /**
   * The target IDs of targets that have changed. If empty, the change applies
   * to all targets. The order of the target IDs is not defined.
   */
  targetIds?: number[];
}

function serializeTargetChange(data: any): TargetChange {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    resumeToken: data["resumeToken"] !== undefined ? encodeBase64(data["resumeToken"]) : undefined,
  };
}

function deserializeTargetChange(data: any): TargetChange {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? decodeBase64(data["resumeToken"] as string) : undefined,
  };
}

/**
 * Options for creating a new transaction.
 */
export interface TransactionOptions {
  /**
   * The transaction can only be used for read operations.
   */
  readOnly?: ReadOnly;
  /**
   * The transaction can be used for both read and write operations.
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
 * A filter with a single operand.
 */
export interface UnaryFilter {
  /**
   * The field to which to apply the operator.
   */
  field?: FieldReference;
  /**
   * The unary operator to apply.
   */
  op?:  | "OPERATOR_UNSPECIFIED" | "IS_NAN" | "IS_NULL" | "IS_NOT_NAN" | "IS_NOT_NULL";
}

/**
 * A message that can hold any of the supported value types.
 */
export interface Value {
  /**
   * An array value. Cannot directly contain another array value, though can
   * contain an map which contains another array.
   */
  arrayValue?: ArrayValue;
  /**
   * A boolean value.
   */
  booleanValue?: boolean;
  /**
   * A bytes value. Must not exceed 1 MiB - 89 bytes. Only the first 1,500
   * bytes are considered by queries.
   */
  bytesValue?: Uint8Array;
  /**
   * A double value.
   */
  doubleValue?: number;
  /**
   * A geo point value representing a point on the surface of Earth.
   */
  geoPointValue?: LatLng;
  /**
   * An integer value.
   */
  integerValue?: bigint;
  /**
   * A map value.
   */
  mapValue?: MapValue;
  /**
   * A null value.
   */
  nullValue?:  | "NULL_VALUE";
  /**
   * A reference to a document. For example:
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  referenceValue?: string;
  /**
   * A string value. The string, represented as UTF-8, must not exceed 1 MiB -
   * 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are
   * considered by queries.
   */
  stringValue?: string;
  /**
   * A timestamp value. Precise only to microseconds. When stored, any
   * additional precision is rounded down.
   */
  timestampValue?: Date;
}

function serializeValue(data: any): Value {
  return {
    ...data,
    arrayValue: data["arrayValue"] !== undefined ? serializeArrayValue(data["arrayValue"]) : undefined,
    bytesValue: data["bytesValue"] !== undefined ? encodeBase64(data["bytesValue"]) : undefined,
    integerValue: data["integerValue"] !== undefined ? String(data["integerValue"]) : undefined,
    mapValue: data["mapValue"] !== undefined ? serializeMapValue(data["mapValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeValue(data: any): Value {
  return {
    ...data,
    arrayValue: data["arrayValue"] !== undefined ? deserializeArrayValue(data["arrayValue"]) : undefined,
    bytesValue: data["bytesValue"] !== undefined ? decodeBase64(data["bytesValue"] as string) : undefined,
    integerValue: data["integerValue"] !== undefined ? BigInt(data["integerValue"]) : undefined,
    mapValue: data["mapValue"] !== undefined ? deserializeMapValue(data["mapValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
  };
}

/**
 * A write on a document.
 */
export interface Write {
  /**
   * An optional precondition on the document. The write will fail if this is
   * set and not met by the target document.
   */
  currentDocument?: Precondition;
  /**
   * A document name to delete. In the format:
   * `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
   */
  delete?: string;
  /**
   * Applies a transformation to a document.
   */
  transform?: DocumentTransform;
  /**
   * A document to write.
   */
  update?: Document;
  /**
   * The fields to update in this write. This field can be set only when the
   * operation is `update`. If the mask is not set for an `update` and the
   * document exists, any existing data will be overwritten. If the mask is set
   * and the document on the server has fields not covered by the mask, they are
   * left unchanged. Fields referenced in the mask, but not present in the input
   * document, are deleted from the document on the server. The field paths in
   * this mask must not contain a reserved field name.
   */
  updateMask?: DocumentMask;
  /**
   * The transforms to perform after update. This field can be set only when
   * the operation is `update`. If present, this write is equivalent to
   * performing `update` and `transform` to the same document atomically and in
   * order.
   */
  updateTransforms?: FieldTransform[];
}

function serializeWrite(data: any): Write {
  return {
    ...data,
    currentDocument: data["currentDocument"] !== undefined ? serializePrecondition(data["currentDocument"]) : undefined,
    transform: data["transform"] !== undefined ? serializeDocumentTransform(data["transform"]) : undefined,
    update: data["update"] !== undefined ? serializeDocument(data["update"]) : undefined,
    updateTransforms: data["updateTransforms"] !== undefined ? data["updateTransforms"].map((item: any) => (serializeFieldTransform(item))) : undefined,
  };
}

function deserializeWrite(data: any): Write {
  return {
    ...data,
    currentDocument: data["currentDocument"] !== undefined ? deserializePrecondition(data["currentDocument"]) : undefined,
    transform: data["transform"] !== undefined ? deserializeDocumentTransform(data["transform"]) : undefined,
    update: data["update"] !== undefined ? deserializeDocument(data["update"]) : undefined,
    updateTransforms: data["updateTransforms"] !== undefined ? data["updateTransforms"].map((item: any) => (deserializeFieldTransform(item))) : undefined,
  };
}

/**
 * The request for Firestore.Write. The first request creates a stream, or
 * resumes an existing one from a token. When creating a new stream, the server
 * replies with a response containing only an ID and a token, to use in the next
 * request. When resuming a stream, the server first streams any responses later
 * than the given token, then a response containing only an up-to-date token, to
 * use in the next request.
 */
export interface WriteRequest {
  /**
   * Labels associated with this write request.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The ID of the write stream to resume. This may only be set in the first
   * message. When left empty, a new write stream will be created.
   */
  streamId?: string;
  /**
   * A stream token that was previously sent by the server. The client should
   * set this field to the token from the most recent WriteResponse it has
   * received. This acknowledges that the client has received responses up to
   * this token. After sending this token, earlier tokens may not be used
   * anymore. The server may close the stream if there are too many
   * unacknowledged responses. Leave this field unset when creating a new
   * stream. To resume a stream at a specific point, set this field and the
   * `stream_id` field. Leave this field unset when creating a new stream.
   */
  streamToken?: Uint8Array;
  /**
   * The writes to apply. Always executed atomically and in order. This must be
   * empty on the first request. This may be empty on the last request. This
   * must not be empty on all other requests.
   */
  writes?: Write[];
}

function serializeWriteRequest(data: any): WriteRequest {
  return {
    ...data,
    streamToken: data["streamToken"] !== undefined ? encodeBase64(data["streamToken"]) : undefined,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (serializeWrite(item))) : undefined,
  };
}

function deserializeWriteRequest(data: any): WriteRequest {
  return {
    ...data,
    streamToken: data["streamToken"] !== undefined ? decodeBase64(data["streamToken"] as string) : undefined,
    writes: data["writes"] !== undefined ? data["writes"].map((item: any) => (deserializeWrite(item))) : undefined,
  };
}

/**
 * The response for Firestore.Write.
 */
export interface WriteResponse {
  /**
   * The time at which the commit occurred. Any read with an equal or greater
   * `read_time` is guaranteed to see the effects of the write.
   */
  commitTime?: Date;
  /**
   * The ID of the stream. Only set on the first message, when a new stream was
   * created.
   */
  streamId?: string;
  /**
   * A token that represents the position of this response in the stream. This
   * can be used by a client to resume the stream at this point. This field is
   * always set.
   */
  streamToken?: Uint8Array;
  /**
   * The result of applying the writes. This i-th write result corresponds to
   * the i-th write in the request.
   */
  writeResults?: WriteResult[];
}

function serializeWriteResponse(data: any): WriteResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? data["commitTime"].toISOString() : undefined,
    streamToken: data["streamToken"] !== undefined ? encodeBase64(data["streamToken"]) : undefined,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (serializeWriteResult(item))) : undefined,
  };
}

function deserializeWriteResponse(data: any): WriteResponse {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? new Date(data["commitTime"]) : undefined,
    streamToken: data["streamToken"] !== undefined ? decodeBase64(data["streamToken"] as string) : undefined,
    writeResults: data["writeResults"] !== undefined ? data["writeResults"].map((item: any) => (deserializeWriteResult(item))) : undefined,
  };
}

/**
 * The result of applying a write.
 */
export interface WriteResult {
  /**
   * The results of applying each DocumentTransform.FieldTransform, in the same
   * order.
   */
  transformResults?: Value[];
  /**
   * The last update time of the document after applying the write. Not set
   * after a `delete`. If the write did not actually change the document, this
   * will be the previous update_time.
   */
  updateTime?: Date;
}

function serializeWriteResult(data: any): WriteResult {
  return {
    ...data,
    transformResults: data["transformResults"] !== undefined ? data["transformResults"].map((item: any) => (serializeValue(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeWriteResult(data: any): WriteResult {
  return {
    ...data,
    transformResults: data["transformResults"] !== undefined ? data["transformResults"].map((item: any) => (deserializeValue(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
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
