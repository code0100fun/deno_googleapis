// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Area120 Tables API Client for Deno
 * ==================================
 * 
 * 
 * 
 * Docs: https://support.google.com/area120-tables/answer/10011390
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Area120Tables {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://area120tables.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a table. Returns NOT_FOUND if the table does not exist.
   *
   * @param name Required. The name of the table to retrieve. Format: tables/{table}
   */
  async tablesGet(name: string): Promise<Table> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTable(data);
  }

  /**
   * Lists tables for the user.
   *
   */
  async tablesList(opts: TablesListOptions = {}): Promise<ListTablesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/tables`);
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
    return deserializeListTablesResponse(data);
  }

  /**
   * Creates multiple rows.
   *
   * @param parent Required. The parent table where the rows will be created. Format: tables/{table}
   */
  async tablesRowsBatchCreate(parent: string, req: BatchCreateRowsRequest): Promise<BatchCreateRowsResponse> {
    req = serializeBatchCreateRowsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/rows:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchCreateRowsResponse(data);
  }

  /**
   * Deletes multiple rows.
   *
   * @param parent Required. The parent table shared by all rows being deleted. Format: tables/{table}
   */
  async tablesRowsBatchDelete(parent: string, req: BatchDeleteRowsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/rows:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates multiple rows.
   *
   * @param parent Required. The parent table shared by all rows being updated. Format: tables/{table}
   */
  async tablesRowsBatchUpdate(parent: string, req: BatchUpdateRowsRequest): Promise<BatchUpdateRowsResponse> {
    req = serializeBatchUpdateRowsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/rows:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchUpdateRowsResponse(data);
  }

  /**
   * Creates a row.
   *
   * @param parent Required. The parent table where this row will be created. Format: tables/{table}
   */
  async tablesRowsCreate(parent: string, req: Row, opts: TablesRowsCreateOptions = {}): Promise<Row> {
    req = serializeRow(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/rows`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRow(data);
  }

  /**
   * Deletes a row.
   *
   * @param name Required. The name of the row to delete. Format: tables/{table}/rows/{row}
   */
  async tablesRowsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a row. Returns NOT_FOUND if the row does not exist in the table.
   *
   * @param name Required. The name of the row to retrieve. Format: tables/{table}/rows/{row}
   */
  async tablesRowsGet(name: string, opts: TablesRowsGetOptions = {}): Promise<Row> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRow(data);
  }

  /**
   * Lists rows in a table. Returns NOT_FOUND if the table does not exist.
   *
   * @param parent Required. The parent table. Format: tables/{table}
   */
  async tablesRowsList(parent: string, opts: TablesRowsListOptions = {}): Promise<ListRowsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/rows`);
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListRowsResponse(data);
  }

  /**
   * Updates a row.
   *
   * @param name The resource name of the row. Row names have the form `tables/{table}/rows/{row}`. The name is ignored when creating a row.
   */
  async tablesRowsPatch(name: string, req: Row, opts: TablesRowsPatchOptions = {}): Promise<Row> {
    req = serializeRow(req);
    opts = serializeTablesRowsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRow(data);
  }

  /**
   * Gets a workspace. Returns NOT_FOUND if the workspace does not exist.
   *
   * @param name Required. The name of the workspace to retrieve. Format: workspaces/{workspace}
   */
  async workspacesGet(name: string): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWorkspace(data);
  }

  /**
   * Lists workspaces for the user.
   *
   */
  async workspacesList(opts: WorkspacesListOptions = {}): Promise<ListWorkspacesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/workspaces`);
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
    return deserializeListWorkspacesResponse(data);
  }
}

/**
 * Request message for TablesService.BatchCreateRows.
 */
export interface BatchCreateRowsRequest {
  /**
   * Required. The request message specifying the rows to create. A maximum of
   * 500 rows can be created in a single batch.
   */
  requests?: CreateRowRequest[];
}

function serializeBatchCreateRowsRequest(data: any): BatchCreateRowsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeCreateRowRequest(item))) : undefined,
  };
}

function deserializeBatchCreateRowsRequest(data: any): BatchCreateRowsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeCreateRowRequest(item))) : undefined,
  };
}

/**
 * Response message for TablesService.BatchCreateRows.
 */
export interface BatchCreateRowsResponse {
  /**
   * The created rows.
   */
  rows?: Row[];
}

function serializeBatchCreateRowsResponse(data: any): BatchCreateRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeRow(item))) : undefined,
  };
}

function deserializeBatchCreateRowsResponse(data: any): BatchCreateRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeRow(item))) : undefined,
  };
}

/**
 * Request message for TablesService.BatchDeleteRows
 */
export interface BatchDeleteRowsRequest {
  /**
   * Required. The names of the rows to delete. All rows must belong to the
   * parent table or else the entire batch will fail. A maximum of 500 rows can
   * be deleted in a batch. Format: tables/{table}/rows/{row}
   */
  names?: string[];
}

/**
 * Request message for TablesService.BatchUpdateRows.
 */
export interface BatchUpdateRowsRequest {
  /**
   * Required. The request messages specifying the rows to update. A maximum of
   * 500 rows can be modified in a single batch.
   */
  requests?: UpdateRowRequest[];
}

function serializeBatchUpdateRowsRequest(data: any): BatchUpdateRowsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeUpdateRowRequest(item))) : undefined,
  };
}

function deserializeBatchUpdateRowsRequest(data: any): BatchUpdateRowsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeUpdateRowRequest(item))) : undefined,
  };
}

/**
 * Response message for TablesService.BatchUpdateRows.
 */
export interface BatchUpdateRowsResponse {
  /**
   * The updated rows.
   */
  rows?: Row[];
}

function serializeBatchUpdateRowsResponse(data: any): BatchUpdateRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeRow(item))) : undefined,
  };
}

function deserializeBatchUpdateRowsResponse(data: any): BatchUpdateRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeRow(item))) : undefined,
  };
}

/**
 * Details on a column in the table.
 */
export interface ColumnDescription {
  /**
   * Data type of the column Supported types are auto_id, boolean,
   * boolean_list, creator, create_timestamp, date, dropdown, location, integer,
   * integer_list, number, number_list, person, person_list, tags, check_list,
   * text, text_list, update_timestamp, updater, relationship,
   * file_attachment_list. These types directly map to the column types
   * supported on Tables website.
   */
  dataType?: string;
  /**
   * Optional. Additional details about a date column.
   */
  dateDetails?: DateDetails;
  /**
   * Internal id for a column.
   */
  id?: string;
  /**
   * Optional. Range of labeled values for the column. Some columns like tags
   * and drop-downs limit the values to a set of possible values. We return the
   * range of values in such cases to help clients implement better user data
   * validation.
   */
  labels?: LabeledItem[];
  /**
   * Optional. Indicates that this is a lookup column whose value is derived
   * from the relationship column specified in the details. Lookup columns can
   * not be updated directly. To change the value you must update the associated
   * relationship column.
   */
  lookupDetails?: LookupDetails;
  /**
   * Optional. Indicates whether or not multiple values are allowed for array
   * types where such a restriction is possible.
   */
  multipleValuesDisallowed?: boolean;
  /**
   * column name
   */
  name?: string;
  /**
   * Optional. Indicates that values for the column cannot be set by the user.
   */
  readonly?: boolean;
  /**
   * Optional. Additional details about a relationship column. Specified when
   * data_type is relationship.
   */
  relationshipDetails?: RelationshipDetails;
}

/**
 * Request message for TablesService.CreateRow.
 */
export interface CreateRowRequest {
  /**
   * Required. The parent table where this row will be created. Format:
   * tables/{table}
   */
  parent?: string;
  /**
   * Required. The row to create.
   */
  row?: Row;
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

function serializeCreateRowRequest(data: any): CreateRowRequest {
  return {
    ...data,
    row: data["row"] !== undefined ? serializeRow(data["row"]) : undefined,
  };
}

function deserializeCreateRowRequest(data: any): CreateRowRequest {
  return {
    ...data,
    row: data["row"] !== undefined ? deserializeRow(data["row"]) : undefined,
  };
}

/**
 * Details about a date column.
 */
export interface DateDetails {
  /**
   * Whether the date column includes time.
   */
  hasTime?: boolean;
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
 * A single item in a labeled column.
 */
export interface LabeledItem {
  /**
   * Internal id associated with the item.
   */
  id?: string;
  /**
   * Display string as entered by user.
   */
  name?: string;
}

/**
 * Response message for TablesService.ListRows.
 */
export interface ListRowsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The rows from the specified table.
   */
  rows?: Row[];
}

function serializeListRowsResponse(data: any): ListRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeRow(item))) : undefined,
  };
}

function deserializeListRowsResponse(data: any): ListRowsResponse {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeRow(item))) : undefined,
  };
}

/**
 * Response message for TablesService.ListTables.
 */
export interface ListTablesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of tables.
   */
  tables?: Table[];
}

function serializeListTablesResponse(data: any): ListTablesResponse {
  return {
    ...data,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (serializeTable(item))) : undefined,
  };
}

function deserializeListTablesResponse(data: any): ListTablesResponse {
  return {
    ...data,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (deserializeTable(item))) : undefined,
  };
}

/**
 * Response message for TablesService.ListWorkspaces.
 */
export interface ListWorkspacesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of workspaces.
   */
  workspaces?: Workspace[];
}

function serializeListWorkspacesResponse(data: any): ListWorkspacesResponse {
  return {
    ...data,
    workspaces: data["workspaces"] !== undefined ? data["workspaces"].map((item: any) => (serializeWorkspace(item))) : undefined,
  };
}

function deserializeListWorkspacesResponse(data: any): ListWorkspacesResponse {
  return {
    ...data,
    workspaces: data["workspaces"] !== undefined ? data["workspaces"].map((item: any) => (deserializeWorkspace(item))) : undefined,
  };
}

/**
 * Details about a lookup column whose value comes from the associated
 * relationship.
 */
export interface LookupDetails {
  /**
   * The name of the relationship column associated with the lookup.
   */
  relationshipColumn?: string;
  /**
   * The id of the relationship column.
   */
  relationshipColumnId?: string;
}

/**
 * Details about a relationship column.
 */
export interface RelationshipDetails {
  /**
   * The name of the table this relationship is linked to.
   */
  linkedTable?: string;
}

/**
 * A single row in a table.
 */
export interface Row {
  /**
   * Time when the row was created.
   */
  createTime?: Date;
  /**
   * The resource name of the row. Row names have the form
   * `tables/{table}/rows/{row}`. The name is ignored when creating a row.
   */
  name?: string;
  /**
   * Time when the row was last updated.
   */
  updateTime?: Date;
  /**
   * The values of the row. This is a map of column key to value. Key is user
   * entered name(default) or the internal column id based on the view in the
   * request.
   */
  values?: {
    [key: string]: any
  };
}

function serializeRow(data: any): Row {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeRow(data: any): Row {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A saved view of a table. NextId: 3
 */
export interface SavedView {
  /**
   * Internal id associated with the saved view.
   */
  id?: string;
  /**
   * Display name of the saved view.
   */
  name?: string;
}

/**
 * A single table. NextId: 8
 */
export interface Table {
  /**
   * List of columns in this table. Order of columns matches the display order.
   */
  columns?: ColumnDescription[];
  /**
   * Time when the table was created.
   */
  createTime?: Date;
  /**
   * The human readable title of the table.
   */
  displayName?: string;
  /**
   * The resource name of the table. Table names have the form
   * `tables/{table}`.
   */
  name?: string;
  /**
   * Saved views for this table.
   */
  savedViews?: SavedView[];
  /**
   * The time zone of the table. IANA Time Zone Database time zone, e.g.
   * "America/New_York".
   */
  timeZone?: string;
  /**
   * Time when the table was last updated excluding updates to individual rows
   */
  updateTime?: Date;
}

function serializeTable(data: any): Table {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeTable(data: any): Table {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for Area120Tables#tablesList.
 */
export interface TablesListOptions {
  /**
   * Optional. Sorting order for the list of tables on createTime/updateTime.
   */
  orderBy?: string;
  /**
   * The maximum number of tables to return. The service may return fewer than
   * this value. If unspecified, at most 20 tables are returned. The maximum
   * value is 100; values above 100 are coerced to 100.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListTables` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListTables` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Area120Tables#tablesRowsCreate.
 */
export interface TablesRowsCreateOptions {
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

/**
 * Additional options for Area120Tables#tablesRowsGet.
 */
export interface TablesRowsGetOptions {
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

/**
 * Additional options for Area120Tables#tablesRowsList.
 */
export interface TablesRowsListOptions {
  /**
   * Optional. Filter to only include resources matching the requirements. For
   * more information, see [Filtering list
   * results](https://support.google.com/area120-tables/answer/10503371).
   */
  filter?: string;
  /**
   * Optional. Sorting order for the list of rows on createTime/updateTime.
   */
  orderBy?: string;
  /**
   * The maximum number of rows to return. The service may return fewer than
   * this value. If unspecified, at most 50 rows are returned. The maximum value
   * is 1,000; values above 1,000 are coerced to 1,000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListRows` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListRows` must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

/**
 * Additional options for Area120Tables#tablesRowsPatch.
 */
export interface TablesRowsPatchOptions {
  /**
   * The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

function serializeTablesRowsPatchOptions(data: any): TablesRowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeTablesRowsPatchOptions(data: any): TablesRowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for TablesService.UpdateRow.
 */
export interface UpdateRowRequest {
  /**
   * Required. The row to update.
   */
  row?: Row;
  /**
   * The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Column key to use for values in the row. Defaults to user
   * entered name.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COLUMN_ID_VIEW";
}

function serializeUpdateRowRequest(data: any): UpdateRowRequest {
  return {
    ...data,
    row: data["row"] !== undefined ? serializeRow(data["row"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateRowRequest(data: any): UpdateRowRequest {
  return {
    ...data,
    row: data["row"] !== undefined ? deserializeRow(data["row"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A single workspace.
 */
export interface Workspace {
  /**
   * Time when the workspace was created.
   */
  createTime?: Date;
  /**
   * The human readable title of the workspace.
   */
  displayName?: string;
  /**
   * The resource name of the workspace. Workspace names have the form
   * `workspaces/{workspace}`.
   */
  name?: string;
  /**
   * The list of tables in the workspace.
   */
  tables?: Table[];
  /**
   * Time when the workspace was last updated.
   */
  updateTime?: Date;
}

function serializeWorkspace(data: any): Workspace {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (serializeTable(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeWorkspace(data: any): Workspace {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (deserializeTable(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for Area120Tables#workspacesList.
 */
export interface WorkspacesListOptions {
  /**
   * The maximum number of workspaces to return. The service may return fewer
   * than this value. If unspecified, at most 10 workspaces are returned. The
   * maximum value is 25; values above 25 are coerced to 25.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListWorkspaces` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListWorkspaces` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}