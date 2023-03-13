// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud TPU API Client for Deno
 * =============================
 * 
 * TPU API provides customers with access to Google TPU technology.
 * 
 * Docs: https://cloud.google.com/tpu/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * TPU API provides customers with access to Google TPU technology.
 */
export class TPU {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://tpu.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets AcceleratorType.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsAcceleratorTypesGet(name: string): Promise<AcceleratorType> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AcceleratorType;
  }

  /**
   * Lists accelerator types supported by this API.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsAcceleratorTypesList(parent: string, opts: ProjectsLocationsAcceleratorTypesListOptions = {}): Promise<ListAcceleratorTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/acceleratorTypes`);
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
    return data as ListAcceleratorTypesResponse;
  }

  /**
   * Generates the Cloud TPU service identity for the project.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsGenerateServiceIdentity(parent: string, req: GenerateServiceIdentityRequest): Promise<GenerateServiceIdentityResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }:generateServiceIdentity`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateServiceIdentityResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * Creates a node.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsNodesCreate(parent: string, req: Node, opts: ProjectsLocationsNodesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/nodes`);
    if (opts.nodeId !== undefined) {
      url.searchParams.append("nodeId", String(opts.nodeId));
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
   * Deletes a node.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsNodesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a node.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsNodesGet(name: string): Promise<Node> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Node;
  }

  /**
   * Retrieves the guest attributes for the node.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsNodesGetGuestAttributes(name: string, req: GetGuestAttributesRequest): Promise<GetGuestAttributesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:getGuestAttributes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetGuestAttributesResponse;
  }

  /**
   * Lists nodes.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsNodesList(parent: string, opts: ProjectsLocationsNodesListOptions = {}): Promise<ListNodesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/nodes`);
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
    return data as ListNodesResponse;
  }

  /**
   * Updates the configurations of a node.
   *
   * @param name Output only. Immutable. The name of the TPU.
   */
  async projectsLocationsNodesPatch(name: string, req: Node, opts: ProjectsLocationsNodesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsNodesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
   * Starts a node.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsNodesStart(name: string, req: StartNodeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stops a node. This operation is only available with single TPU nodes.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsNodesStop(name: string, req: StopNodeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
  async projectsLocationsOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
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
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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
   * Gets a runtime version.
   *
   * @param name Required. The resource name.
   */
  async projectsLocationsRuntimeVersionsGet(name: string): Promise<RuntimeVersion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RuntimeVersion;
  }

  /**
   * Lists runtime versions supported by this API.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsRuntimeVersionsList(parent: string, opts: ProjectsLocationsRuntimeVersionsListOptions = {}): Promise<ListRuntimeVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/runtimeVersions`);
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
    return data as ListRuntimeVersionsResponse;
  }
}

/**
 * A TPU accelerator configuration.
 */
export interface AcceleratorConfig {
  /**
   * Required. Topology of TPU in chips.
   */
  topology?: string;
  /**
   * Required. Type of TPU.
   */
  type?:  | "TYPE_UNSPECIFIED" | "V2" | "V3" | "V4";
}

/**
 * A accelerator type that a Node can be configured with.
 */
export interface AcceleratorType {
  /**
   * The accelerator config.
   */
  acceleratorConfigs?: AcceleratorConfig[];
  /**
   * The resource name.
   */
  name?: string;
  /**
   * the accelerator type.
   */
  type?: string;
}

/**
 * An access config attached to the TPU worker.
 */
export interface AccessConfig {
  /**
   * Output only. An external IP address associated with the TPU worker.
   */
  readonly externalIp?: string;
}

/**
 * A node-attached disk resource. Next ID: 8;
 */
export interface AttachedDisk {
  /**
   * The mode in which to attach this disk. If not specified, the default is
   * READ_WRITE mode. Only applicable to data_disks.
   */
  mode?:  | "DISK_MODE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY";
  /**
   * Specifies the full path to an existing disk. For example:
   * "projects/my-project/zones/us-central1-c/disks/my-disk".
   */
  sourceDisk?: string;
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
 * Request for GenerateServiceIdentity.
 */
export interface GenerateServiceIdentityRequest {
}

/**
 * Response for GenerateServiceIdentity.
 */
export interface GenerateServiceIdentityResponse {
  /**
   * ServiceIdentity that was created or retrieved.
   */
  identity?: ServiceIdentity;
}

/**
 * Request for GetGuestAttributes.
 */
export interface GetGuestAttributesRequest {
  /**
   * The guest attributes path to be queried.
   */
  queryPath?: string;
  /**
   * The 0-based worker ID. If it is empty, all workers' GuestAttributes will
   * be returned.
   */
  workerIds?: string[];
}

/**
 * Response for GetGuestAttributes.
 */
export interface GetGuestAttributesResponse {
  /**
   * The guest attributes for the TPU workers.
   */
  guestAttributes?: GuestAttributes[];
}

/**
 * A guest attributes.
 */
export interface GuestAttributes {
  /**
   * The path to be queried. This can be the default namespace ('/') or a
   * nested namespace ('/\/') or a specified key ('/\/\')
   */
  queryPath?: string;
  /**
   * The value of the requested queried path.
   */
  queryValue?: GuestAttributesValue;
}

/**
 * A guest attributes namespace/key/value entry.
 */
export interface GuestAttributesEntry {
  /**
   * Key for the guest attribute entry.
   */
  key?: string;
  /**
   * Namespace for the guest attribute entry.
   */
  namespace?: string;
  /**
   * Value for the guest attribute entry.
   */
  value?: string;
}

/**
 * Array of guest attribute namespace/key/value tuples.
 */
export interface GuestAttributesValue {
  /**
   * The list of guest attributes entries.
   */
  items?: GuestAttributesEntry[];
}

/**
 * Response for ListAcceleratorTypes.
 */
export interface ListAcceleratorTypesResponse {
  /**
   * The listed nodes.
   */
  acceleratorTypes?: AcceleratorType[];
  /**
   * The next page token or empty if none.
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
 * Response for ListNodes.
 */
export interface ListNodesResponse {
  /**
   * The next page token or empty if none.
   */
  nextPageToken?: string;
  /**
   * The listed nodes.
   */
  nodes?: Node[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * Response for ListRuntimeVersions.
 */
export interface ListRuntimeVersionsResponse {
  /**
   * The next page token or empty if none.
   */
  nextPageToken?: string;
  /**
   * The listed nodes.
   */
  runtimeVersions?: RuntimeVersion[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * Network related configurations.
 */
export interface NetworkConfig {
  /**
   * Allows the TPU node to send and receive packets with non-matching
   * destination or source IPs. This is required if you plan to use the TPU
   * workers to forward routes.
   */
  canIpForward?: boolean;
  /**
   * Indicates that external IP addresses would be associated with the TPU
   * workers. If set to false, the specified subnetwork or network should have
   * Private Google Access enabled.
   */
  enableExternalIps?: boolean;
  /**
   * The name of the network for the TPU node. It must be a preexisting Google
   * Compute Engine network. If none is provided, "default" will be used.
   */
  network?: string;
  /**
   * The name of the subnetwork for the TPU node. It must be a preexisting
   * Google Compute Engine subnetwork. If none is provided, "default" will be
   * used.
   */
  subnetwork?: string;
}

/**
 * A network endpoint over which a TPU worker can be reached.
 */
export interface NetworkEndpoint {
  /**
   * The access config for the TPU worker.
   */
  accessConfig?: AccessConfig;
  /**
   * The internal IP address of this network endpoint.
   */
  ipAddress?: string;
  /**
   * The port of this network endpoint.
   */
  port?: number;
}

/**
 * A TPU instance.
 */
export interface Node {
  /**
   * The AccleratorConfig for the TPU Node.
   */
  acceleratorConfig?: AcceleratorConfig;
  /**
   * Required. The type of hardware accelerators associated with this node.
   */
  acceleratorType?: string;
  /**
   * Output only. The API version that created this Node.
   */
  readonly apiVersion?:  | "API_VERSION_UNSPECIFIED" | "V1_ALPHA1" | "V1" | "V2_ALPHA1" | "V2";
  /**
   * The CIDR block that the TPU node will use when selecting an IP address.
   * This CIDR block must be a /29 block; the Compute Engine networks API
   * forbids a smaller block, and using a larger block would be wasteful (a node
   * can only consume one IP address). Errors will occur if the CIDR block has
   * already been used for a currently existing TPU node, the CIDR block
   * conflicts with any subnetworks in the user's provided network, or the
   * provided network is peered with another network that is using that CIDR
   * block.
   */
  cidrBlock?: string;
  /**
   * Output only. The time when the node was created.
   */
  readonly createTime?: Date;
  /**
   * The additional data disks for the Node.
   */
  dataDisks?: AttachedDisk[];
  /**
   * The user-supplied description of the TPU. Maximum of 512 characters.
   */
  description?: string;
  /**
   * The health status of the TPU node.
   */
  health?:  | "HEALTH_UNSPECIFIED" | "HEALTHY" | "TIMEOUT" | "UNHEALTHY_TENSORFLOW" | "UNHEALTHY_MAINTENANCE";
  /**
   * Output only. If this field is populated, it contains a description of why
   * the TPU Node is unhealthy.
   */
  readonly healthDescription?: string;
  /**
   * Output only. The unique identifier for the TPU Node.
   */
  readonly id?: bigint;
  /**
   * Resource labels to represent user-provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Custom metadata to apply to the TPU Node. Can set startup-script and
   * shutdown-script
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Output only. Immutable. The name of the TPU.
   */
  readonly name?: string;
  /**
   * Network configurations for the TPU node.
   */
  networkConfig?: NetworkConfig;
  /**
   * Output only. The network endpoints where TPU workers can be accessed and
   * sent work. It is recommended that runtime clients of the node reach out to
   * the 0th entry in this map first.
   */
  readonly networkEndpoints?: NetworkEndpoint[];
  /**
   * Required. The runtime version running in the Node.
   */
  runtimeVersion?: string;
  /**
   * The scheduling options for this node.
   */
  schedulingConfig?: SchedulingConfig;
  /**
   * The Google Cloud Platform Service Account to be used by the TPU node VMs.
   * If None is specified, the default compute service account will be used.
   */
  serviceAccount?: ServiceAccount;
  /**
   * Shielded Instance options.
   */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /**
   * Output only. The current state for the TPU Node.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "RESTARTING" | "REIMAGING" | "DELETING" | "REPAIRING" | "STOPPED" | "STOPPING" | "STARTING" | "PREEMPTED" | "TERMINATED" | "HIDING" | "HIDDEN" | "UNHIDING";
  /**
   * Output only. The Symptoms that have occurred to the TPU Node.
   */
  readonly symptoms?: Symptom[];
  /**
   * Tags to apply to the TPU Node. Tags are used to identify valid sources or
   * targets for network firewalls.
   */
  tags?: string[];
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
 * Metadata describing an Operation
 */
export interface OperationMetadata {
  /**
   * API version.
   */
  apiVersion?: string;
  /**
   * Specifies if cancellation was requested for the operation.
   */
  cancelRequested?: boolean;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * Human-readable status of the operation, if any.
   */
  statusDetail?: string;
  /**
   * Target of the operation - for example
   * projects/project-1/connectivityTests/test-1
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
 * Additional options for TPU#projectsLocationsAcceleratorTypesList.
 */
export interface ProjectsLocationsAcceleratorTypesListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Sort results.
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for TPU#projectsLocationsList.
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
 * Additional options for TPU#projectsLocationsNodesCreate.
 */
export interface ProjectsLocationsNodesCreateOptions {
  /**
   * The unqualified resource name.
   */
  nodeId?: string;
}

/**
 * Additional options for TPU#projectsLocationsNodesList.
 */
export interface ProjectsLocationsNodesListOptions {
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for TPU#projectsLocationsNodesPatch.
 */
export interface ProjectsLocationsNodesPatchOptions {
  /**
   * Required. Mask of fields from Node to update. Supported fields:
   * [description, tags, labels, metadata, network_config.enable_external_ips].
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNodesPatchOptions(data: any): ProjectsLocationsNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNodesPatchOptions(data: any): ProjectsLocationsNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for TPU#projectsLocationsOperationsList.
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
 * Additional options for TPU#projectsLocationsRuntimeVersionsList.
 */
export interface ProjectsLocationsRuntimeVersionsListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Sort results.
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * A runtime version that a Node can be configured with.
 */
export interface RuntimeVersion {
  /**
   * The resource name.
   */
  name?: string;
  /**
   * The runtime version.
   */
  version?: string;
}

/**
 * Sets the scheduling options for this node.
 */
export interface SchedulingConfig {
  /**
   * Defines whether the node is preemptible.
   */
  preemptible?: boolean;
  /**
   * Whether the node is created under a reservation.
   */
  reserved?: boolean;
}

/**
 * A service account.
 */
export interface ServiceAccount {
  /**
   * Email address of the service account. If empty, default Compute service
   * account will be used.
   */
  email?: string;
  /**
   * The list of scopes to be made available for this service account. If
   * empty, access to all Cloud APIs will be allowed.
   */
  scope?: string[];
}

/**
 * The per-product per-project service identity for Cloud TPU service.
 */
export interface ServiceIdentity {
  /**
   * The email address of the service identity.
   */
  email?: string;
}

/**
 * A set of Shielded Instance options.
 */
export interface ShieldedInstanceConfig {
  /**
   * Defines whether the instance has Secure Boot enabled.
   */
  enableSecureBoot?: boolean;
}

/**
 * Request for StartNode.
 */
export interface StartNodeRequest {
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
 * Request for StopNode.
 */
export interface StopNodeRequest {
}

/**
 * A Symptom instance.
 */
export interface Symptom {
  /**
   * Timestamp when the Symptom is created.
   */
  createTime?: Date;
  /**
   * Detailed information of the current Symptom.
   */
  details?: string;
  /**
   * Type of the Symptom.
   */
  symptomType?:  | "SYMPTOM_TYPE_UNSPECIFIED" | "LOW_MEMORY" | "OUT_OF_MEMORY" | "EXECUTE_TIMED_OUT" | "MESH_BUILD_FAIL" | "HBM_OUT_OF_MEMORY" | "PROJECT_ABUSE";
  /**
   * A string used to uniquely distinguish a worker within a TPU node.
   */
  workerId?: string;
}

function serializeSymptom(data: any): Symptom {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeSymptom(data: any): Symptom {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}