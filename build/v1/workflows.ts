// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Workflows API Client for Deno
 * =============================
 * 
 * Manage workflow definitions. To execute workflows and manage executions, see the Workflows Executions API.
 * 
 * Docs: https://cloud.google.com/workflows
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manage workflow definitions. To execute workflows and manage executions, see
 * the Workflows Executions API.
 */
export class Workflows {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://workflows.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
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
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Creates a new workflow. If a workflow with the specified name already
   * exists in the specified project and location, the long running operation
   * returns a ALREADY_EXISTS error.
   *
   * @param parent Required. Project and location in which the workflow should be created. Format: projects/{project}/locations/{location}
   */
  async projectsLocationsWorkflowsCreate(parent: string, req: Workflow, opts: ProjectsLocationsWorkflowsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflows`);
    if (opts.workflowId !== undefined) {
      url.searchParams.append("workflowId", String(opts.workflowId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a workflow with the specified name. This method also cancels and
   * deletes all running executions of the workflow.
   *
   * @param name Required. Name of the workflow to be deleted. Format: projects/{project}/locations/{location}/workflows/{workflow}
   */
  async projectsLocationsWorkflowsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single workflow.
   *
   * @param name Required. Name of the workflow for which information should be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow}
   */
  async projectsLocationsWorkflowsGet(name: string, opts: ProjectsLocationsWorkflowsGetOptions = {}): Promise<Workflow> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.revisionId !== undefined) {
      url.searchParams.append("revisionId", String(opts.revisionId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Workflow;
  }

  /**
   * Lists workflows in a given project and location. The default order is not
   * specified.
   *
   * @param parent Required. Project and location from which the workflows should be listed. Format: projects/{project}/locations/{location}
   */
  async projectsLocationsWorkflowsList(parent: string, opts: ProjectsLocationsWorkflowsListOptions = {}): Promise<ListWorkflowsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflows`);
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
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListWorkflowsResponse;
  }

  /**
   * Updates an existing workflow. Running this method has no impact on already
   * running executions of the workflow. A new revision of the workflow might be
   * created as a result of a successful update operation. In that case, the new
   * revision is used in new workflow executions.
   *
   * @param name The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}
   */
  async projectsLocationsWorkflowsPatch(name: string, req: Workflow, opts: ProjectsLocationsWorkflowsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsWorkflowsPatchOptions(opts);
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
    return data as Operation;
  }
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
 * Response for the ListWorkflows method.
 */
export interface ListWorkflowsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The workflows that match the request.
   */
  workflows?: Workflow[];
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
 * Represents the metadata of the long-running operation.
 */
export interface OperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Additional options for Workflows#projectsLocationsList.
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
 * Additional options for Workflows#projectsLocationsOperationsList.
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
 * Additional options for Workflows#projectsLocationsWorkflowsCreate.
 */
export interface ProjectsLocationsWorkflowsCreateOptions {
  /**
   * Required. The ID of the workflow to be created. It has to fulfill the
   * following requirements: * Must contain only letters, numbers, underscores
   * and hyphens. * Must start with a letter. * Must be between 1-64 characters.
   * * Must end with a number or a letter. * Must be unique within the customer
   * project and location.
   */
  workflowId?: string;
}

/**
 * Additional options for Workflows#projectsLocationsWorkflowsGet.
 */
export interface ProjectsLocationsWorkflowsGetOptions {
  /**
   * Optional. Optional. The revision of the workflow to retrieve. If the
   * revision_id is empty, the latest revision is retrieved. The format is
   * "000001-a4d", where the first 6 characters define the zero-padded decimal
   * revision number. They are followed by a hyphen and 3 hexadecimal
   * characters. (go/wf_adr_clh_1)
   */
  revisionId?: string;
}

/**
 * Additional options for Workflows#projectsLocationsWorkflowsList.
 */
export interface ProjectsLocationsWorkflowsListOptions {
  /**
   * Filter to restrict results to specific workflows.
   */
  filter?: string;
  /**
   * Comma-separated list of fields that specify the order of the results.
   * Default sorting order for a field is ascending. To specify descending order
   * for a field, append a "desc" suffix. If not specified, the results are
   * returned in an unspecified order.
   */
  orderBy?: string;
  /**
   * Maximum number of workflows to return per call. The service might return
   * fewer than this value even if not at the end of the collection. If a value
   * is not specified, a default value of 500 is used. The maximum permitted
   * value is 1000 and values greater than 1000 are coerced down to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListWorkflows` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListWorkflows` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for Workflows#projectsLocationsWorkflowsPatch.
 */
export interface ProjectsLocationsWorkflowsPatchOptions {
  /**
   * List of fields to be updated. If not present, the entire workflow will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsWorkflowsPatchOptions(data: any): ProjectsLocationsWorkflowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsWorkflowsPatchOptions(data: any): ProjectsLocationsWorkflowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
 * Workflow program to be executed by Workflows.
 */
export interface Workflow {
  /**
   * Output only. The timestamp for when the workflow was created.
   */
  readonly createTime?: Date;
  /**
   * Description of the workflow provided by the user. Must be at most 1000
   * unicode characters long.
   */
  description?: string;
  /**
   * Labels associated with this workflow. Labels can contain at most 64
   * entries. Keys and values can be no longer than 63 characters and can only
   * contain lowercase letters, numeric characters, underscores, and dashes.
   * Label keys must start with a letter. International characters are allowed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource name of the workflow. Format:
   * projects/{project}/locations/{location}/workflows/{workflow}
   */
  name?: string;
  /**
   * Output only. The timestamp for the latest revision of the workflow's
   * creation.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. The revision of the workflow. A new revision of a workflow is
   * created as a result of updating the following properties of a workflow: -
   * Service account - Workflow code to be executed The format is "000001-a4d",
   * where the first 6 characters define the zero-padded revision ordinal
   * number. They are followed by a hyphen and 3 hexadecimal random characters.
   */
  readonly revisionId?: string;
  /**
   * The service account associated with the latest workflow version. This
   * service account represents the identity of the workflow and determines what
   * permissions the workflow has. Format:
   * projects/{project}/serviceAccounts/{account} or {account} Using `-` as a
   * wildcard for the `{project}` or not providing one at all will infer the
   * project from the account. The `{account}` value can be the `email` address
   * or the `unique_id` of the service account. If not provided, workflow will
   * use the project's default service account. Modifying this field for an
   * existing workflow results in a new workflow revision.
   */
  serviceAccount?: string;
  /**
   * Workflow code to be executed. The size limit is 128KB.
   */
  sourceContents?: string;
  /**
   * Output only. State of the workflow deployment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE";
  /**
   * Output only. The timestamp for when the workflow was last updated.
   */
  readonly updateTime?: Date;
}