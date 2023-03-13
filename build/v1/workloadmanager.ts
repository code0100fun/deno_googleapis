// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Workload Manager API Client for Deno
 * ====================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/workload-manager/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class WorkloadManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://workloadmanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new Evaluation in a given project and location.
   *
   * @param parent Required. The resource prefix of the evaluation location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsEvaluationsCreate(parent: string, req: Evaluation, opts: ProjectsLocationsEvaluationsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/evaluations`);
    if (opts.evaluationId !== undefined) {
      url.searchParams.append("evaluationId", String(opts.evaluationId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single Evaluation.
   *
   * @param name Required. Name of the resource
   */
  async projectsLocationsEvaluationsGet(name: string): Promise<Evaluation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Evaluation;
  }

  /**
   * Lists Evaluations in a given project and location.
   *
   * @param parent Required. Parent value for ListEvaluationsRequest
   */
  async projectsLocationsEvaluationsList(parent: string, opts: ProjectsLocationsEvaluationsListOptions = {}): Promise<ListEvaluationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/evaluations`);
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
    return data as ListEvaluationsResponse;
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
   * Write the data insights to workload manager data warehouse.
   *
   * @param location Required. The GCP location. The format is: projects/{project}/locations/{location}.
   */
  async projectsLocationsInsightsWriteInsight(location: string, req: WriteInsightRequest): Promise<WriteInsightResponse> {
    req = serializeWriteInsightRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ location }/insights:writeInsight`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WriteInsightResponse;
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
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
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
 * Message describing Evaluation object
 */
export interface Evaluation {
  /**
   * Output only. [Output only] Create time stamp
   */
  readonly createTime?: Date;
  /**
   * Description of the Evaluation
   */
  description?: string;
  /**
   * Labels as key value pairs
   */
  labels?: {
    [key: string]: string
  };
  /**
   * name of resource names have the form
   * 'projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}'
   */
  name?: string;
  /**
   * annotations as key value pairs
   */
  resourceFilter?: ResourceFilter;
  /**
   * Output only. [Output only] The updated rule ids if exist.
   */
  readonly resourceStatus?: ResourceStatus;
  /**
   * the name of the rule
   */
  ruleNames?: string[];
  /**
   * Output only. [Output only] The updated rule ids if exist.
   */
  readonly ruleVersions?: string[];
  /**
   * Output only. [Output only] Update time stamp
   */
  readonly updateTime?: Date;
}

/**
 * Message describing compute engine instance filter
 */
export interface GceInstanceFilter {
  /**
   * Service account of compute engine
   */
  serviceAccounts?: string[];
}

/**
 * A presentation of host resource usage where the workload runs.
 */
export interface Insight {
  /**
   * The insights data for sap system discovery. This is a copy of SAP System
   * proto and should get updated whenever that one changes.
   */
  sapDiscovery?: SapDiscovery;
  /**
   * The insights data for the sap workload validation.
   */
  sapValidation?: SapValidation;
  /**
   * Output only. [Output only] Create time stamp
   */
  readonly sentTime?: Date;
}

function serializeInsight(data: any): Insight {
  return {
    ...data,
    sapDiscovery: data["sapDiscovery"] !== undefined ? serializeSapDiscovery(data["sapDiscovery"]) : undefined,
  };
}

function deserializeInsight(data: any): Insight {
  return {
    ...data,
    sapDiscovery: data["sapDiscovery"] !== undefined ? deserializeSapDiscovery(data["sapDiscovery"]) : undefined,
    sentTime: data["sentTime"] !== undefined ? new Date(data["sentTime"]) : undefined,
  };
}

/**
 * Message for response to listing Evaluations
 */
export interface ListEvaluationsResponse {
  /**
   * The list of Evaluation
   */
  evaluations?: Evaluation[];
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Additional options for WorkloadManager#projectsLocationsEvaluationsCreate.
 */
export interface ProjectsLocationsEvaluationsCreateOptions {
  /**
   * Required. Id of the requesting object
   */
  evaluationId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for WorkloadManager#projectsLocationsEvaluationsList.
 */
export interface ProjectsLocationsEvaluationsListOptions {
  /**
   * Filtering results
   */
  filter?: string;
  /**
   * Hint for how to order the results
   */
  orderBy?: string;
  /**
   * Requested page size. Server may return fewer items than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return.
   */
  pageToken?: string;
}

/**
 * Additional options for WorkloadManager#projectsLocationsList.
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
 * Additional options for WorkloadManager#projectsLocationsOperationsList.
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
 * Message describing resource filters
 */
export interface ResourceFilter {
  /**
   * Filter compute engine resource
   */
  gceInstanceFilter?: GceInstanceFilter;
  /**
   * The label used for filter resource
   */
  inclusionLabels?: {
    [key: string]: string
  };
  /**
   * The id pattern for filter resource
   */
  resourceIdPatterns?: string[];
  /**
   * The scopes of evaluation resource
   */
  scopes?: string[];
}

/**
 * Message describing resource status
 */
export interface ResourceStatus {
  /**
   * the new version of rule id if exists
   */
  rulesNewerVersions?: string[];
  /**
   * State of the resource
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING";
}

/**
 * The schema of SAP system discovery data.
 */
export interface SapDiscovery {
  /**
   * An SAP system may run without an application layer.
   */
  applicationLayer?: SapDiscoveryComponent;
  /**
   * An SAP System must have a database.
   */
  databaseLayer?: SapDiscoveryComponent;
  /**
   * The metadata for SAP system discovery data.
   */
  metadata?: SapDiscoveryMetadata;
  /**
   * A combination of database SID, database instance URI and tenant DB name to
   * make a unique identifier per-system.
   */
  systemId?: string;
  /**
   * Unix timestamp this system has been updated last.
   */
  updateTime?: Date;
}

function serializeSapDiscovery(data: any): SapDiscovery {
  return {
    ...data,
    applicationLayer: data["applicationLayer"] !== undefined ? serializeSapDiscoveryComponent(data["applicationLayer"]) : undefined,
    databaseLayer: data["databaseLayer"] !== undefined ? serializeSapDiscoveryComponent(data["databaseLayer"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeSapDiscovery(data: any): SapDiscovery {
  return {
    ...data,
    applicationLayer: data["applicationLayer"] !== undefined ? deserializeSapDiscoveryComponent(data["applicationLayer"]) : undefined,
    databaseLayer: data["databaseLayer"] !== undefined ? deserializeSapDiscoveryComponent(data["databaseLayer"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Message describing the system component.
 */
export interface SapDiscoveryComponent {
  /**
   * The component is a SAP application.
   */
  applicationType?: string;
  /**
   * The component is a SAP database.
   */
  databaseType?: string;
  /**
   * Pantheon Project in which the resources reside.
   */
  hostProject?: string;
  /**
   * The resources in a component.
   */
  resources?: SapDiscoveryResource[];
  /**
   * The sap identifier, used by the SAP software and helps differentiate
   * systems for customers.
   */
  sid?: string;
}

function serializeSapDiscoveryComponent(data: any): SapDiscoveryComponent {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeSapDiscoveryResource(item))) : undefined,
  };
}

function deserializeSapDiscoveryComponent(data: any): SapDiscoveryComponent {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeSapDiscoveryResource(item))) : undefined,
  };
}

/**
 * Message describing SAP discovery system metadata
 */
export interface SapDiscoveryMetadata {
  /**
   * Customer region string for customer's use. Does not represent GCP region.
   */
  customerRegion?: string;
  /**
   * Customer defined, something like "E-commerce pre prod"
   */
  definedSystem?: string;
  /**
   * Should be "prod", "QA", "dev", "staging", etc.
   */
  environmentType?: string;
  /**
   * This sap product name
   */
  sapProduct?: string;
}

/**
 * Message describing a resource.
 */
export interface SapDiscoveryResource {
  /**
   * A list of resource URIs related to this resource.
   */
  relatedResources?: string[];
  /**
   * ComputeInstance, ComputeDisk, VPC, Bare Metal server, etc.
   */
  resourceKind?: string;
  /**
   * The type of this resource.
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "COMPUTE" | "STORAGE" | "NETWORK";
  /**
   * URI of the resource, includes project, location, and name.
   */
  resourceUri?: string;
  /**
   * Unix timestamp of when this resource last had its discovery data updated.
   */
  updateTime?: Date;
}

function serializeSapDiscoveryResource(data: any): SapDiscoveryResource {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeSapDiscoveryResource(data: any): SapDiscoveryResource {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A presentation of SAP workload insight. The schema of SAP workloads
 * validation related data.
 */
export interface SapValidation {
  /**
   * A list of SAP validation metrics data.
   */
  validationDetails?: SapValidationValidationDetail[];
}

/**
 * Message describing the SAP validation metrics.
 */
export interface SapValidationValidationDetail {
  /**
   * The pairs of metrics data: field name & field value.
   */
  details?: {
    [key: string]: string
  };
  /**
   * The SAP system that the validation data is from.
   */
  sapValidationType?:  | "SAP_VALIDATION_TYPE_UNSPECIFIED" | "SYSTEM" | "COROSYNC" | "PACEMAKER" | "HANA" | "NETWEAVER";
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
 * Request for sending the data insights.
 */
export interface WriteInsightRequest {
  /**
   * Required. The metrics data details.
   */
  insight?: Insight;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

function serializeWriteInsightRequest(data: any): WriteInsightRequest {
  return {
    ...data,
    insight: data["insight"] !== undefined ? serializeInsight(data["insight"]) : undefined,
  };
}

function deserializeWriteInsightRequest(data: any): WriteInsightRequest {
  return {
    ...data,
    insight: data["insight"] !== undefined ? deserializeInsight(data["insight"]) : undefined,
  };
}

/**
 * The response for write insights request.
 */
export interface WriteInsightResponse {
}