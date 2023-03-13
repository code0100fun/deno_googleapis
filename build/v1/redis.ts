// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Cloud Memorystore for Redis API Client for Deno
 * ======================================================
 * 
 * Creates and manages Redis instances on the Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/memorystore/docs/redis/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates and manages Redis instances on the Google Cloud Platform.
 */
export class Redis {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://redis.googleapis.com/") {
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
   * Creates a Redis instance based on the specified tier and memory size. By
   * default, the instance is accessible from the project's [default
   * network](https://cloud.google.com/vpc/docs/vpc). The creation is executed
   * asynchronously and callers may check the returned operation to track its
   * progress. Once the operation is completed the Redis instance will be fully
   * functional. Completed longrunning.Operation will contain the new instance
   * object in the response field. The returned operation is automatically
   * deleted after a few hours, so there is no need to call DeleteOperation.
   *
   * @param parent Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesCreate(parent: string, req: Instance, opts: ProjectsLocationsInstancesCreateOptions = {}): Promise<Operation> {
    req = serializeInstance(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
    if (opts.instanceId !== undefined) {
      url.searchParams.append("instanceId", String(opts.instanceId));
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
   * Deletes a specific Redis instance. Instance stops serving and data is
   * deleted.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Export Redis instance data into a Redis RDB format file in Cloud Storage.
   * Redis will continue serving during this operation. The returned operation
   * is automatically deleted after a few hours, so there is no need to call
   * DeleteOperation.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesExport(name: string, req: ExportInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Initiates a failover of the primary node to current replica node for a
   * specific STANDARD tier Cloud Memorystore for Redis instance.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesFailover(name: string, req: FailoverInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:failover`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific Redis instance.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesGet(name: string): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInstance(data);
  }

  /**
   * Gets the AUTH string for a Redis instance. If AUTH is not enabled for the
   * instance the response will be empty. This information is not included in
   * the details returned to GetInstance.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesGetAuthString(name: string): Promise<InstanceAuthString> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/authString`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InstanceAuthString;
  }

  /**
   * Import a Redis RDB snapshot file from Cloud Storage into a Redis instance.
   * Redis may stop serving during this operation. Instance state will be
   * IMPORTING for entire operation. When complete, the instance will contain
   * only data from the imported file. The returned operation is automatically
   * deleted after a few hours, so there is no need to call DeleteOperation.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesImport(name: string, req: ImportInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists all Redis instances owned by a project in either the specified
   * location (region) or all locations. The location should have the following
   * format: * `projects/{project_id}/locations/{location_id}` If `location_id`
   * is specified as `-` (wildcard), then all regions available to the project
   * are queried, and the results are aggregated.
   *
   * @param parent Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesList(parent: string, opts: ProjectsLocationsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
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
    return deserializeListInstancesResponse(data);
  }

  /**
   * Updates the metadata and configuration of a specific Redis instance.
   * Completed longrunning.Operation will contain the new instance object in the
   * response field. The returned operation is automatically deleted after a few
   * hours, so there is no need to call DeleteOperation.
   *
   * @param name Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.
   */
  async projectsLocationsInstancesPatch(name: string, req: Instance, opts: ProjectsLocationsInstancesPatchOptions = {}): Promise<Operation> {
    req = serializeInstance(req);
    opts = serializeProjectsLocationsInstancesPatchOptions(opts);
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

  /**
   * Reschedule maintenance for a given instance in a given project and
   * location.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesRescheduleMaintenance(name: string, req: RescheduleMaintenanceRequest): Promise<Operation> {
    req = serializeRescheduleMaintenanceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:rescheduleMaintenance`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Upgrades Redis instance to the newer Redis version specified in the
   * request.
   *
   * @param name Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesUpgrade(name: string, req: UpgradeInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:upgrade`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
  async projectsLocationsOperationsCancel(name: string): Promise<Empty> {
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * Request for Export.
 */
export interface ExportInstanceRequest {
  /**
   * Required. Specify data to be exported.
   */
  outputConfig?: OutputConfig;
}

/**
 * Request for Failover.
 */
export interface FailoverInstanceRequest {
  /**
   * Optional. Available data protection modes that the user can choose. If
   * it's unspecified, data protection mode will be LIMITED_DATA_LOSS by
   * default.
   */
  dataProtectionMode?:  | "DATA_PROTECTION_MODE_UNSPECIFIED" | "LIMITED_DATA_LOSS" | "FORCE_DATA_LOSS";
}

/**
 * The Cloud Storage location for the output content
 */
export interface GcsDestination {
  /**
   * Required. Data destination URI (e.g. 'gs://my_bucket/my_object'). Existing
   * files will be overwritten.
   */
  uri?: string;
}

/**
 * The Cloud Storage location for the input content
 */
export interface GcsSource {
  /**
   * Required. Source data URI. (e.g. 'gs://my_bucket/my_object').
   */
  uri?: string;
}

/**
 * This location metadata represents additional configuration options for a
 * given location where a Redis instance may be created. All fields are output
 * only. It is returned as content of the
 * `google.cloud.location.Location.metadata` field.
 */
export interface GoogleCloudRedisV1LocationMetadata {
  /**
   * Output only. The set of available zones in the location. The map is keyed
   * by the lowercase ID of each zone, as defined by GCE. These keys can be
   * specified in `location_id` or `alternative_location_id` fields when
   * creating a Redis instance.
   */
  readonly availableZones?: {
    [key: string]: GoogleCloudRedisV1ZoneMetadata
  };
}

/**
 * Represents the v1 metadata of the long-running operation.
 */
export interface GoogleCloudRedisV1OperationMetadata {
  /**
   * API version.
   */
  apiVersion?: string;
  /**
   * Specifies if cancellation was requested for the operation.
   */
  cancelRequested?: boolean;
  /**
   * Creation timestamp.
   */
  createTime?: Date;
  /**
   * End timestamp.
   */
  endTime?: Date;
  /**
   * Operation status details.
   */
  statusDetail?: string;
  /**
   * Operation target.
   */
  target?: string;
  /**
   * Operation verb.
   */
  verb?: string;
}

function serializeGoogleCloudRedisV1OperationMetadata(data: any): GoogleCloudRedisV1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRedisV1OperationMetadata(data: any): GoogleCloudRedisV1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Defines specific information for a particular zone. Currently empty and
 * reserved for future use only.
 */
export interface GoogleCloudRedisV1ZoneMetadata {
}

/**
 * Request for Import.
 */
export interface ImportInstanceRequest {
  /**
   * Required. Specify data to be imported.
   */
  inputConfig?: InputConfig;
}

/**
 * The input content
 */
export interface InputConfig {
  /**
   * Google Cloud Storage location where input content is located.
   */
  gcsSource?: GcsSource;
}

/**
 * A Memorystore for Redis instance.
 */
export interface Instance {
  /**
   * Optional. If specified, at least one node will be provisioned in this zone
   * in addition to the zone specified in location_id. Only applicable to
   * standard tier. If provided, it must be a different zone from the one
   * provided in [location_id]. Additional nodes beyond the first 2 will be
   * placed in zones selected by the service.
   */
  alternativeLocationId?: string;
  /**
   * Optional. Indicates whether OSS Redis AUTH is enabled for the instance. If
   * set to "true" AUTH is enabled on the instance. Default value is "false"
   * meaning AUTH is disabled.
   */
  authEnabled?: boolean;
  /**
   * Optional. The full name of the Google Compute Engine
   * [network](https://cloud.google.com/vpc/docs/vpc) to which the instance is
   * connected. If left unspecified, the `default` network will be used.
   */
  authorizedNetwork?: string;
  /**
   * Optional. The available maintenance versions that an instance could update
   * to.
   */
  availableMaintenanceVersions?: string[];
  /**
   * Optional. The network connect mode of the Redis instance. If not provided,
   * the connect mode defaults to DIRECT_PEERING.
   */
  connectMode?:  | "CONNECT_MODE_UNSPECIFIED" | "DIRECT_PEERING" | "PRIVATE_SERVICE_ACCESS";
  /**
   * Output only. The time the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The current zone where the Redis primary node is located. In
   * basic tier, this will always be the same as [location_id]. In standard
   * tier, this can be the zone of any node in the instance.
   */
  readonly currentLocationId?: string;
  /**
   * Optional. The KMS key reference that the customer provides when trying to
   * create the instance.
   */
  customerManagedKey?: string;
  /**
   * An arbitrary and optional user-provided name for the instance.
   */
  displayName?: string;
  /**
   * Output only. Hostname or IP address of the exposed Redis endpoint used by
   * clients to connect to the service.
   */
  readonly host?: string;
  /**
   * Resource labels to represent user provided metadata
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The zone where the instance will be provisioned. If not
   * provided, the service will choose a zone from the specified region for the
   * instance. For standard tier, additional nodes will be added across multiple
   * zones for protection against zonal failures. If specified, at least one
   * node will be provisioned in this zone.
   */
  locationId?: string;
  /**
   * Optional. The maintenance policy for the instance. If not provided,
   * maintenance events can be performed at any time.
   */
  maintenancePolicy?: MaintenancePolicy;
  /**
   * Output only. Date and time of upcoming maintenance events which have been
   * scheduled.
   */
  readonly maintenanceSchedule?: MaintenanceSchedule;
  /**
   * Optional. The self service update maintenance version. The version is date
   * based such as "20210712_00_00".
   */
  maintenanceVersion?: string;
  /**
   * Required. Redis memory size in GiB.
   */
  memorySizeGb?: number;
  /**
   * Required. Unique name of the resource in this scope including project and
   * location using the form:
   * `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
   * Note: Redis instances are managed and addressed at regional level so
   * location_id here refers to a GCP region; however, users may choose which
   * specific zone (or collection of zones for cross-zone instances) an instance
   * should be provisioned in. Refer to location_id and alternative_location_id
   * fields for more details.
   */
  name?: string;
  /**
   * Output only. Info per node.
   */
  readonly nodes?: NodeInfo[];
  /**
   * Optional. Persistence configuration parameters
   */
  persistenceConfig?: PersistenceConfig;
  /**
   * Output only. Cloud IAM identity used by import / export operations to
   * transfer data to/from Cloud Storage. Format is "serviceAccount:". The value
   * may change over time for a given instance so should be checked before each
   * import/export operation.
   */
  readonly persistenceIamIdentity?: string;
  /**
   * Output only. The port number of the exposed Redis endpoint.
   */
  readonly port?: number;
  /**
   * Output only. Hostname or IP address of the exposed readonly Redis
   * endpoint. Standard tier only. Targets all healthy replica nodes in
   * instance. Replication is asynchronous and replica nodes will exhibit some
   * lag behind the primary. Write requests must target 'host'.
   */
  readonly readEndpoint?: string;
  /**
   * Output only. The port number of the exposed readonly redis endpoint.
   * Standard tier only. Write requests should target 'port'.
   */
  readonly readEndpointPort?: number;
  /**
   * Optional. Read replicas mode for the instance. Defaults to
   * READ_REPLICAS_DISABLED.
   */
  readReplicasMode?:  | "READ_REPLICAS_MODE_UNSPECIFIED" | "READ_REPLICAS_DISABLED" | "READ_REPLICAS_ENABLED";
  /**
   * Optional. Redis configuration parameters, according to
   * http://redis.io/topics/config. Currently, the only supported parameters
   * are: Redis version 3.2 and newer: * maxmemory-policy *
   * notify-keyspace-events Redis version 4.0 and newer: * activedefrag *
   * lfu-decay-time * lfu-log-factor * maxmemory-gb Redis version 5.0 and newer:
   * * stream-node-max-bytes * stream-node-max-entries
   */
  redisConfigs?: {
    [key: string]: string
  };
  /**
   * Optional. The version of Redis software. If not provided, latest supported
   * version will be used. Currently, the supported values are: * `REDIS_3_2`
   * for Redis 3.2 compatibility * `REDIS_4_0` for Redis 4.0 compatibility
   * (default) * `REDIS_5_0` for Redis 5.0 compatibility * `REDIS_6_X` for Redis
   * 6.x compatibility
   */
  redisVersion?: string;
  /**
   * Optional. The number of replica nodes. The valid range for the Standard
   * Tier with read replicas enabled is [1-5] and defaults to 2. If read
   * replicas are not enabled for a Standard Tier instance, the only valid value
   * is 1 and the default is 1. The valid value for basic tier is 0 and the
   * default is also 0.
   */
  replicaCount?: number;
  /**
   * Optional. For DIRECT_PEERING mode, the CIDR range of internal addresses
   * that are reserved for this instance. Range must be unique and
   * non-overlapping with existing subnets in an authorized network. For
   * PRIVATE_SERVICE_ACCESS mode, the name of one allocated IP address ranges
   * associated with this private service access connection. If not provided,
   * the service will choose an unused /29 block, for example, 10.0.0.0/29 or
   * 192.168.0.0/29. For READ_REPLICAS_ENABLED the default block size is /28.
   */
  reservedIpRange?: string;
  /**
   * Optional. Additional IP range for node placement. Required when enabling
   * read replicas on an existing instance. For DIRECT_PEERING mode value must
   * be a CIDR range of size /28, or "auto". For PRIVATE_SERVICE_ACCESS mode
   * value must be the name of an allocated address range associated with the
   * private service access connection, or "auto".
   */
  secondaryIpRange?: string;
  /**
   * Output only. List of server CA certificates for the instance.
   */
  readonly serverCaCerts?: TlsCertificate[];
  /**
   * Output only. The current state of this instance.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "REPAIRING" | "MAINTENANCE" | "IMPORTING" | "FAILING_OVER";
  /**
   * Output only. Additional information about the current status of this
   * instance, if available.
   */
  readonly statusMessage?: string;
  /**
   * Optional. reasons that causes instance in "SUSPENDED" state.
   */
  suspensionReasons?:  | "SUSPENSION_REASON_UNSPECIFIED" | "CUSTOMER_MANAGED_KEY_ISSUE"[];
  /**
   * Required. The service tier of the instance.
   */
  tier?:  | "TIER_UNSPECIFIED" | "BASIC" | "STANDARD_HA";
  /**
   * Optional. The TLS mode of the Redis instance. If not provided, TLS is
   * disabled for the instance.
   */
  transitEncryptionMode?:  | "TRANSIT_ENCRYPTION_MODE_UNSPECIFIED" | "SERVER_AUTHENTICATION" | "DISABLED";
}

function serializeInstance(data: any): Instance {
  return {
    ...data,
    persistenceConfig: data["persistenceConfig"] !== undefined ? serializePersistenceConfig(data["persistenceConfig"]) : undefined,
  };
}

function deserializeInstance(data: any): Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    persistenceConfig: data["persistenceConfig"] !== undefined ? deserializePersistenceConfig(data["persistenceConfig"]) : undefined,
  };
}

/**
 * Instance AUTH string details.
 */
export interface InstanceAuthString {
  /**
   * AUTH string set on the instance.
   */
  authString?: string;
}

/**
 * Response for ListInstances.
 */
export interface ListInstancesResponse {
  /**
   * A list of Redis instances in the project in the specified location, or
   * across all locations. If the `location_id` in the parent field of the
   * request is "-", all regions available to the project are queried, and the
   * results aggregated. If in such an aggregated query a location is
   * unavailable, a placeholder Redis entry is included in the response with the
   * `name` field set to a value of the form
   * `projects/{project_id}/locations/{location_id}/instances/`- and the
   * `status` field set to ERROR and `status_message` field set to "location not
   * available for ListInstances".
   */
  instances?: Instance[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListInstancesResponse(data: any): ListInstancesResponse {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (serializeInstance(item))) : undefined,
  };
}

function deserializeListInstancesResponse(data: any): ListInstancesResponse {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (deserializeInstance(item))) : undefined,
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
   * Resource ID for the region. For example: "us-east1".
   */
  locationId?: string;
  /**
   * Output only. The set of available zones in the location. The map is keyed
   * by the lowercase ID of each zone, as defined by Compute Engine. These keys
   * can be specified in `location_id` or `alternative_location_id` fields when
   * creating a Redis instance.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Full resource name for the region. For example:
   * "projects/example-project/locations/us-east1".
   */
  name?: string;
}

/**
 * Maintenance policy for an instance.
 */
export interface MaintenancePolicy {
  /**
   * Output only. The time when the policy was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of what this policy is for. Create/Update methods
   * return INVALID_ARGUMENT if the length is greater than 512.
   */
  description?: string;
  /**
   * Output only. The time when the policy was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Optional. Maintenance window that is applied to resources covered by this
   * policy. Minimum 1. For the current version, the maximum number of
   * weekly_window is expected to be one.
   */
  weeklyMaintenanceWindow?: WeeklyMaintenanceWindow[];
}

/**
 * Upcoming maintenance schedule. If no maintenance is scheduled, fields are
 * not populated.
 */
export interface MaintenanceSchedule {
  /**
   * If the scheduled maintenance can be rescheduled, default is true.
   */
  canReschedule?: boolean;
  /**
   * Output only. The end time of any upcoming scheduled maintenance for this
   * instance.
   */
  readonly endTime?: Date;
  /**
   * Output only. The deadline that the maintenance schedule start time can not
   * go beyond, including reschedule.
   */
  readonly scheduleDeadlineTime?: Date;
  /**
   * Output only. The start time of any upcoming scheduled maintenance for this
   * instance.
   */
  readonly startTime?: Date;
}

/**
 * Node specific properties.
 */
export interface NodeInfo {
  /**
   * Output only. Node identifying string. e.g. 'node-0', 'node-1'
   */
  readonly id?: string;
  /**
   * Output only. Location of the node.
   */
  readonly zone?: string;
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
   * { `createTime`: The time the operation was created. `endTime`: The time
   * the operation finished running. `target`: Server-defined resource path for
   * the target of the operation. `verb`: Name of the verb executed by the
   * operation. `statusDetail`: Human-readable status of the operation, if any.
   * `cancelRequested`: Identifies whether the user has requested cancellation
   * of the operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`. `apiVersion`: API version used to start the operation. }
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
 * The output content
 */
export interface OutputConfig {
  /**
   * Google Cloud Storage destination for output content.
   */
  gcsDestination?: GcsDestination;
}

/**
 * Configuration of the persistence functionality.
 */
export interface PersistenceConfig {
  /**
   * Optional. Controls whether Persistence features are enabled. If not
   * provided, the existing value will be used.
   */
  persistenceMode?:  | "PERSISTENCE_MODE_UNSPECIFIED" | "DISABLED" | "RDB";
  /**
   * Output only. The next time that a snapshot attempt is scheduled to occur.
   */
  readonly rdbNextSnapshotTime?: Date;
  /**
   * Optional. Period between RDB snapshots. Snapshots will be attempted every
   * period starting from the provided snapshot start time. For example, a start
   * time of 01/01/2033 06:45 and SIX_HOURS snapshot period will do nothing
   * until 01/01/2033, and then trigger snapshots every day at 06:45, 12:45,
   * 18:45, and 00:45 the next day, and so on. If not provided,
   * TWENTY_FOUR_HOURS will be used as default.
   */
  rdbSnapshotPeriod?:  | "SNAPSHOT_PERIOD_UNSPECIFIED" | "ONE_HOUR" | "SIX_HOURS" | "TWELVE_HOURS" | "TWENTY_FOUR_HOURS";
  /**
   * Optional. Date and time that the first snapshot was/will be attempted, and
   * to which future snapshots will be aligned. If not provided, the current
   * time will be used.
   */
  rdbSnapshotStartTime?: Date;
}

function serializePersistenceConfig(data: any): PersistenceConfig {
  return {
    ...data,
    rdbSnapshotStartTime: data["rdbSnapshotStartTime"] !== undefined ? data["rdbSnapshotStartTime"].toISOString() : undefined,
  };
}

function deserializePersistenceConfig(data: any): PersistenceConfig {
  return {
    ...data,
    rdbNextSnapshotTime: data["rdbNextSnapshotTime"] !== undefined ? new Date(data["rdbNextSnapshotTime"]) : undefined,
    rdbSnapshotStartTime: data["rdbSnapshotStartTime"] !== undefined ? new Date(data["rdbSnapshotStartTime"]) : undefined,
  };
}

/**
 * Additional options for Redis#projectsLocationsInstancesCreate.
 */
export interface ProjectsLocationsInstancesCreateOptions {
  /**
   * Required. The logical name of the Redis instance in the customer project
   * with the following restrictions: * Must contain only lowercase letters,
   * numbers, and hyphens. * Must start with a letter. * Must be between 1-40
   * characters. * Must end with a number or a letter. * Must be unique within
   * the customer project / location
   */
  instanceId?: string;
}

/**
 * Additional options for Redis#projectsLocationsInstancesList.
 */
export interface ProjectsLocationsInstancesListOptions {
  /**
   * The maximum number of items to return. If not specified, a default value
   * of 1000 will be used by the service. Regardless of the page_size value, the
   * response may include a partial list and a caller should only rely on
   * response's `next_page_token` to determine if there are more instances left
   * to be queried.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous ListInstances
   * request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Redis#projectsLocationsInstancesPatch.
 */
export interface ProjectsLocationsInstancesPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include these
   * fields from Instance: * `displayName` * `labels` * `memorySizeGb` *
   * `redisConfig` * `replica_count`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsInstancesPatchOptions(data: any): ProjectsLocationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsInstancesPatchOptions(data: any): ProjectsLocationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Redis#projectsLocationsList.
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
 * Additional options for Redis#projectsLocationsOperationsList.
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
 * Operation metadata returned by the CLH during resource state reconciliation.
 */
export interface ReconciliationOperationMetadata {
  /**
   * DEPRECATED. Use exclusive_action instead.
   */
  deleteResource?: boolean;
  /**
   * Excluisive action returned by the CLH.
   */
  exclusiveAction?:  | "UNKNOWN_REPAIR_ACTION" | "DELETE" | "RETRY";
}

/**
 * Request for RescheduleMaintenance.
 */
export interface RescheduleMaintenanceRequest {
  /**
   * Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time
   * as well.
   */
  rescheduleType?:  | "RESCHEDULE_TYPE_UNSPECIFIED" | "IMMEDIATE" | "NEXT_AVAILABLE_WINDOW" | "SPECIFIC_TIME";
  /**
   * Optional. Timestamp when the maintenance shall be rescheduled to if
   * reschedule_type=SPECIFIC_TIME, in RFC 3339 format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  scheduleTime?: Date;
}

function serializeRescheduleMaintenanceRequest(data: any): RescheduleMaintenanceRequest {
  return {
    ...data,
    scheduleTime: data["scheduleTime"] !== undefined ? data["scheduleTime"].toISOString() : undefined,
  };
}

function deserializeRescheduleMaintenanceRequest(data: any): RescheduleMaintenanceRequest {
  return {
    ...data,
    scheduleTime: data["scheduleTime"] !== undefined ? new Date(data["scheduleTime"]) : undefined,
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
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * TlsCertificate Resource
 */
export interface TlsCertificate {
  /**
   * PEM representation.
   */
  cert?: string;
  /**
   * Output only. The time when the certificate was created in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2020-05-18T00:00:00.094Z`.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time when the certificate expires in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2020-05-18T00:00:00.094Z`.
   */
  readonly expireTime?: Date;
  /**
   * Serial number, as extracted from the certificate.
   */
  serialNumber?: string;
  /**
   * Sha1 Fingerprint of the certificate.
   */
  sha1Fingerprint?: string;
}

/**
 * Request for UpgradeInstance.
 */
export interface UpgradeInstanceRequest {
  /**
   * Required. Specifies the target version of Redis software to upgrade to.
   */
  redisVersion?: string;
}

/**
 * Time window in which disruptive maintenance updates occur. Non-disruptive
 * updates can occur inside or outside this window.
 */
export interface WeeklyMaintenanceWindow {
  /**
   * Required. The day of week that maintenance updates occur.
   */
  day?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Output only. Duration of the maintenance window. The current window is
   * fixed at 1 hour.
   */
  readonly duration?: number /* Duration */;
  /**
   * Required. Start time of the window in UTC time.
   */
  startTime?: TimeOfDay;
}