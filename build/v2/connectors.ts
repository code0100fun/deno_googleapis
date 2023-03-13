// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Connectors API Client for Deno
 * ==============================
 * 
 * Enables users to create and manage connections to Google Cloud services and third-party business applications using the Connectors interface.
 * 
 * Docs: https://cloud.google.com/apigee/docs/api-platform/connectors/about-connectors
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Enables users to create and manage connections to Google Cloud services and
 * third-party business applications using the Connectors interface.
 */
export class Connectors {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://connectors.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Executes an action with the name specified in the request. The input
   * parameters for executing the action are passed through the body of the
   * ExecuteAction request.
   *
   * @param name Required. Resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}/actions/{action}
   */
  async projectsLocationsConnectionsActionsExecute(name: string, req: ExecuteActionRequest): Promise<ExecuteActionResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:execute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ExecuteActionResponse;
  }

  /**
   * Gets the schema of all the actions supported by the connector.
   *
   * @param parent Required. Parent resource name of the Action. Format: projects/{project}/locations/{location}/connections/{connection}
   */
  async projectsLocationsConnectionsActionsList(parent: string, opts: ProjectsLocationsConnectionsActionsListOptions = {}): Promise<ListActionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/actions`);
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
    return data as ListActionsResponse;
  }

  /**
   * Creates a new entity row of the specified entity type in the external
   * system. The field values for creating the row are contained in the body of
   * the request. The response message contains a `Entity` message object
   * returned as a response by the external system.
   *
   * @param parent Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesCreate(parent: string, req: Entity): Promise<Entity> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/entities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Entity;
  }

  /**
   * Deletes an existing entity row matching the entity type and entity id
   * specified in the request.
   *
   * @param name Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Deletes entities based on conditions specified in the request and not on
   * entity id.
   *
   * @param entityType Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesDeleteEntitiesWithConditions(entityType: string, opts: ProjectsLocationsConnectionsEntityTypesEntitiesDeleteEntitiesWithConditionsOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ entityType }/entities:deleteEntitiesWithConditions`);
    if (opts.conditions !== undefined) {
      url.searchParams.append("conditions", String(opts.conditions));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Gets a single entity row matching the entity type and entity id specified
   * in the request.
   *
   * @param name Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesGet(name: string): Promise<Entity> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Entity;
  }

  /**
   * Lists entity rows of a particular entity type contained in the request.
   * Note: 1. Currently, only max of one 'sort_by' column is supported. 2. If no
   * 'sort_by' column is provided, the primary key of the table is used. If zero
   * or more than one primary key is available, we default to the unpaginated
   * list entities logic which only returns the first page. 3. The values of the
   * 'sort_by' columns must uniquely identify an entity row, otherwise undefined
   * behaviors may be observed during pagination. 4. Since transactions are not
   * supported, any updates, inserts or deletes during pagination can lead to
   * stale data being returned or other unexpected behaviors.
   *
   * @param parent Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesList(parent: string, opts: ProjectsLocationsConnectionsEntityTypesEntitiesListOptions = {}): Promise<ListEntitiesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/entities`);
    if (opts.conditions !== undefined) {
      url.searchParams.append("conditions", String(opts.conditions));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortBy !== undefined) {
      url.searchParams.append("sortBy", String(opts.sortBy));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListEntitiesResponse;
  }

  /**
   * Updates an existing entity row matching the entity type and entity id
   * specified in the request. The fields in the entity row that need to be
   * modified are contained in the body of the request. All unspecified fields
   * are left unchanged. The response message contains a `Entity` message object
   * returned as a response by the external system.
   *
   * @param name Output only. Resource name of the Entity. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesPatch(name: string, req: Entity): Promise<Entity> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Entity;
  }

  /**
   * Updates entities based on conditions specified in the request and not on
   * entity id.
   *
   * @param entityType Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}
   */
  async projectsLocationsConnectionsEntityTypesEntitiesUpdateEntitiesWithConditions(entityType: string, req: Entity, opts: ProjectsLocationsConnectionsEntityTypesEntitiesUpdateEntitiesWithConditionsOptions = {}): Promise<UpdateEntitiesWithConditionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ entityType }/entities:updateEntitiesWithConditions`);
    if (opts.conditions !== undefined) {
      url.searchParams.append("conditions", String(opts.conditions));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UpdateEntitiesWithConditionsResponse;
  }

  /**
   * Lists metadata related to all entity types present in the external system.
   *
   * @param parent Required. Resource name of the Entity Type. Format: projects/{project}/locations/{location}/connections/{connection}
   */
  async projectsLocationsConnectionsEntityTypesList(parent: string, opts: ProjectsLocationsConnectionsEntityTypesListOptions = {}): Promise<ListEntityTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/entityTypes`);
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
    return data as ListEntityTypesResponse;
  }

  /**
   * Executes a SQL statement specified in the body of the request. An example
   * of this SQL statement in the case of Salesforce connector would be 'select
   * * from Account a, Order o where a.Id = o.AccountId'.
   *
   * @param connection Required. Resource name of the Connection. Format: projects/{project}/locations/{location}/connections/{connection}
   */
  async projectsLocationsConnectionsExecuteSqlQuery(connection: string, req: ExecuteSqlQueryRequest): Promise<ExecuteSqlQueryResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ connection }:executeSqlQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ExecuteSqlQueryResponse;
  }
}

/**
 * Action message contains metadata information about a single action present
 * in the external system.
 */
export interface Action {
  /**
   * List containing input parameter metadata.
   */
  inputParameters?: InputParameter[];
  /**
   * Name of the action.
   */
  name?: string;
  /**
   * List containing the metadata of result fields.
   */
  resultMetadata?: ResultMetadata[];
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
 * 'Entity row'/ 'Entity' refers to a single row of an entity type.
 */
export interface Entity {
  /**
   * Fields of the entity. The key is name of the field and the value contains
   * the applicable `google.protobuf.Value` entry for this field.
   */
  fields?: {
    [key: string]: any
  };
  /**
   * Output only. Resource name of the Entity. Format:
   * projects/{project}/locations/{location}/connections/{connection}/entityTypes/{type}/entities/{id}
   */
  readonly name?: string;
}

/**
 * EntityType message contains metadata information about a single entity type
 * present in the external system.
 */
export interface EntityType {
  /**
   * List containing metadata information about each field of the entity type.
   */
  fields?: Field[];
  /**
   * The name of the entity type.
   */
  name?: string;
}

/**
 * Request message for ActionService.ExecuteAction
 */
export interface ExecuteActionRequest {
  /**
   * Parameters for executing the action. The parameters can be key/value pairs
   * or nested structs.
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * Response message for ActionService.ExecuteAction
 */
export interface ExecuteActionResponse {
  /**
   * In the case of successful invocation of the specified action, the results
   * Struct contains values based on the response of the action invoked. 1. If
   * the action execution produces any entities as a result, they are returned
   * as an array of Structs with the 'key' being the field name and the 'value'
   * being the value of that field in each result row. { 'results': [{'key':
   * 'value'}, ...] }
   */
  results?: {
    [key: string]: any
  }[];
}

/**
 * An execute sql query request containing the query and the connection to
 * execute it on.
 */
export interface ExecuteSqlQueryRequest {
  /**
   * Required. SQL statement passed by clients like Integration Platform, the
   * query is passed as-is to the driver used for interfacing with external
   * systems.
   */
  query?: Query;
}

/**
 * A response returned by the connection after executing the sql query.
 */
export interface ExecuteSqlQueryResponse {
  /**
   * In the case of successful execution of the query the response contains
   * results returned by the external system. For example, the result rows of
   * the query are contained in the 'results' Struct list - "results": [ {
   * "field1": "val1", "field2": "val2",.. },.. ] Each Struct row can contain
   * fields any type of like nested Structs or lists.
   */
  results?: {
    [key: string]: any
  }[];
}

/**
 * Message contains EntityType's Field metadata.
 */
export interface Field {
  /**
   * The following map contains fields that are not explicitly mentioned
   * above,this give connectors the flexibility to add new metadata fields.
   */
  additionalDetails?: {
    [key: string]: any
  };
  /**
   * The data type of the Field.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE";
  /**
   * The following field specifies the default value of the Field provided by
   * the external system if a value is not provided.
   */
  defaultValue?: any;
  /**
   * A brief description of the Field.
   */
  description?: string;
  /**
   * The following boolean field specifies if the current Field acts as a
   * primary key or id if the parent is of type entity.
   */
  key?: boolean;
  /**
   * Name of the Field.
   */
  name?: string;
  /**
   * Specifies whether a null value is allowed.
   */
  nullable?: boolean;
  /**
   * Reference captures the association between two different entity types.
   * Value links to the reference of another entity type.
   */
  reference?: Reference;
}

/**
 * Input Parameter message contains metadata about the parameters required for
 * executing an Action.
 */
export interface InputParameter {
  /**
   * The data type of the Parameter
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE";
  /**
   * The following field specifies the default value of the Parameter provided
   * by the external system if a value is not provided.
   */
  defaultValue?: any;
  /**
   * A brief description of the Parameter.
   */
  description?: string;
  /**
   * Name of the Parameter.
   */
  name?: string;
  /**
   * Specifies whether a null value is allowed.
   */
  nullable?: boolean;
}

/**
 * Response message for ActionService.ListActions
 */
export interface ListActionsResponse {
  /**
   * List of action metadata.
   */
  actions?: Action[];
  /**
   * Next page token if more actions available.
   */
  nextPageToken?: string;
  /**
   * List of actions which contain unsupported Datatypes. Check datatype.proto
   * for more information.
   */
  unsupportedActionNames?: string[];
}

/**
 * Response message for EntityService.ListEntities
 */
export interface ListEntitiesResponse {
  /**
   * List containing entity rows.
   */
  entities?: Entity[];
  /**
   * Next page token if more records are available.
   */
  nextPageToken?: string;
}

/**
 * Response message for EntityService.ListEntityTypes
 */
export interface ListEntityTypesResponse {
  /**
   * Next page token if more entity types available.
   */
  nextPageToken?: string;
  /**
   * List of metadata related to all entity types.
   */
  types?: EntityType[];
  /**
   * List of entity type names which contain unsupported Datatypes. Check
   * datatype.proto for more information.
   */
  unsupportedTypeNames?: string[];
}

/**
 * Additional options for Connectors#projectsLocationsConnectionsActionsList.
 */
export interface ProjectsLocationsConnectionsActionsListOptions {
  /**
   * Number of Actions to return. Defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, return from a previous ListActions call, that can be used
   * retrieve the next page of content. If unspecified, the request returns the
   * first page of actions.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Connectors#projectsLocationsConnectionsEntityTypesEntitiesDeleteEntitiesWithConditions.
 */
export interface ProjectsLocationsConnectionsEntityTypesEntitiesDeleteEntitiesWithConditionsOptions {
  /**
   * Required. Conditions to be used when deleting entities. From a proto
   * standpoint, There are no restrictions on what can be passed using this
   * field. The connector documentation should have information about what
   * format of filters/conditions are supported. Note: If this conditions field
   * is left empty, an exception is thrown. We don't want to consider 'empty
   * conditions' to be a match-all case. Connector developers can determine and
   * document what a match-all case constraint would be.
   */
  conditions?: string;
}

/**
 * Additional options for
 * Connectors#projectsLocationsConnectionsEntityTypesEntitiesList.
 */
export interface ProjectsLocationsConnectionsEntityTypesEntitiesListOptions {
  /**
   * Conditions to be used when listing entities. From a proto standpoint,
   * There are no restrictions on what can be passed using this field. The
   * connector documentation should have information about what format of
   * filters/conditions are supported.
   */
  conditions?: string;
  /**
   * Number of entity rows to return. Defaults page size = 25. Max page size =
   * 200.
   */
  pageSize?: number;
  /**
   * Page token value if available from a previous request.
   */
  pageToken?: string;
  /**
   * List of 'sort_by' columns to use when returning the results.
   */
  sortBy?: string;
}

/**
 * Additional options for
 * Connectors#projectsLocationsConnectionsEntityTypesEntitiesUpdateEntitiesWithConditions.
 */
export interface ProjectsLocationsConnectionsEntityTypesEntitiesUpdateEntitiesWithConditionsOptions {
  /**
   * Required. Conditions to be used when updating entities. From a proto
   * standpoint, There are no restrictions on what can be passed using this
   * field. The connector documentation should have information about what
   * format of filters/conditions are supported. Note: If this conditions field
   * is left empty, an exception is thrown. We don't want to consider 'empty
   * conditions' to be a match-all case. Connector developers can determine and
   * document what a match-all case constraint would be.
   */
  conditions?: string;
}

/**
 * Additional options for
 * Connectors#projectsLocationsConnectionsEntityTypesList.
 */
export interface ProjectsLocationsConnectionsEntityTypesListOptions {
  /**
   * Number of entity types to return. Defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, return from a previous ListEntityTypes call, that can be used
   * retrieve the next page of content. If unspecified, the request returns the
   * first page of entity types.
   */
  pageToken?: string;
}

/**
 * A wrapper around the SQL query statement. This is needed so that the JSON
 * representation of ExecuteSqlQueryRequest has the following format:
 * `{"query":"select *"}`.
 */
export interface Query {
  /**
   * Required. Sql query to execute.
   */
  query?: string;
}

export interface Reference {
  /**
   * Name of the reference field.
   */
  name?: string;
  /**
   * Name of reference entity type.
   */
  type?: string;
}

/**
 * Result Metadata message contains metadata about the result returned after
 * executing an Action.
 */
export interface ResultMetadata {
  /**
   * The data type of the metadata field
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "INT" | "SMALLINT" | "DOUBLE" | "DATE" | "DATETIME" | "TIME" | "STRING" | "LONG" | "BOOLEAN" | "DECIMAL" | "UUID" | "BLOB" | "BIT" | "TINYINT" | "INTEGER" | "BIGINT" | "FLOAT" | "REAL" | "NUMERIC" | "CHAR" | "VARCHAR" | "LONGVARCHAR" | "TIMESTAMP" | "NCHAR" | "NVARCHAR" | "LONGNVARCHAR" | "NULL" | "OTHER" | "JAVA_OBJECT" | "DISTINCT" | "STRUCT" | "ARRAY" | "CLOB" | "REF" | "DATALINK" | "ROWID" | "BINARY" | "VARBINARY" | "LONGVARBINARY" | "NCLOB" | "SQLXML" | "REF_CURSOR" | "TIME_WITH_TIMEZONE" | "TIMESTAMP_WITH_TIMEZONE";
  /**
   * A brief description of the metadata field.
   */
  description?: string;
  /**
   * Name of the metadata field.
   */
  name?: string;
}

/**
 * Response message for EntityService.UpdateEntitiesWithConditions
 */
export interface UpdateEntitiesWithConditionsResponse {
  /**
   * Response returned by the external system.
   */
  response?: {
    [key: string]: any
  };
}