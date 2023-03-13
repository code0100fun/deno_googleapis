// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Memorystore for Memcached API Client for Deno
 * ===================================================
 * 
 * Google Cloud Memorystore for Memcached API is used for creating and managing Memcached instances in GCP.
 * 
 * Docs: https://cloud.google.com/memorystore/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Google Cloud Memorystore for Memcached API is used for creating and managing
 * Memcached instances in GCP.
 */
export class memcache {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://memcache.googleapis.com/") {
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
   * `ApplyParameters` restarts the set of specified nodes in order to update
   * them to the current set of parameters for the Memcached Instance.
   *
   * @param name Required. Resource name of the Memcached instance for which parameter group updates should be applied.
   */
  async projectsLocationsInstancesApplyParameters(name: string, req: ApplyParametersRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:applyParameters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new Instance in a given location.
   *
   * @param parent Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region
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
   * Deletes a single Instance.
   *
   * @param name Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region
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
   * Gets details of a single Instance.
   *
   * @param name Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region
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
   * Lists Instances in a given location.
   *
   * @param parent Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region
   */
  async projectsLocationsInstancesList(parent: string, opts: ProjectsLocationsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
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
    return deserializeListInstancesResponse(data);
  }

  /**
   * Updates an existing Instance in a given project and location.
   *
   * @param name Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details.
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
   * Reschedules upcoming maintenance event.
   *
   * @param instance Required. Memcache instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region.
   */
  async projectsLocationsInstancesRescheduleMaintenance(instance: string, req: RescheduleMaintenanceRequest): Promise<Operation> {
    req = serializeRescheduleMaintenanceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ instance }:rescheduleMaintenance`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the defined Memcached parameters for an existing instance. This
   * method only stages the parameters, it must be followed by `ApplyParameters`
   * to apply the parameters to nodes of the Memcached instance.
   *
   * @param name Required. Resource name of the Memcached instance for which the parameters should be updated.
   */
  async projectsLocationsInstancesUpdateParameters(name: string, req: UpdateParametersRequest): Promise<Operation> {
    req = serializeUpdateParametersRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:updateParameters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
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
 * Request for ApplyParameters.
 */
export interface ApplyParametersRequest {
  /**
   * Whether to apply instance-level parameter group to all nodes. If set to
   * true, users are restricted from specifying individual nodes, and
   * `ApplyParameters` updates all nodes within the instance.
   */
  applyAll?: boolean;
  /**
   * Nodes to which the instance-level parameter group is applied.
   */
  nodeIds?: string[];
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Time window specified for daily operations.
 */
export interface DailyCycle {
  /**
   * Output only. Duration of the time window, set by service producer.
   */
  duration?: number /* Duration */;
  /**
   * Time within the day to start the operations.
   */
  startTime?: TimeOfDay;
}

function serializeDailyCycle(data: any): DailyCycle {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeDailyCycle(data: any): DailyCycle {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
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
export interface Date {
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
 * DenyMaintenancePeriod definition. Maintenance is forbidden within the deny
 * period. The start_date must be less than the end_date.
 */
export interface DenyMaintenancePeriod {
  /**
   * Deny period end date. This can be: * A full date, with non-zero year,
   * month and day values. * A month and day value, with a zero year. Allows
   * recurring deny periods each year. Date matching this period will have to be
   * before the end.
   */
  endDate?: Date;
  /**
   * Deny period start date. This can be: * A full date, with non-zero year,
   * month and day values. * A month and day value, with a zero year. Allows
   * recurring deny periods each year. Date matching this period will have to be
   * the same or after the start.
   */
  startDate?: Date;
  /**
   * Time in UTC when the Blackout period starts on start_date and ends on
   * end_date. This can be: * Full time. * All zeros for 00:00:00 UTC
   */
  time?: TimeOfDay;
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
 * Metadata for the given google.cloud.location.Location.
 */
export interface GoogleCloudMemcacheV1LocationMetadata {
  /**
   * Output only. The set of available zones in the location. The map is keyed
   * by the lowercase ID of each zone, as defined by GCE. These keys can be
   * specified in the `zones` field when creating a Memcached instance.
   */
  readonly availableZones?: {
    [key: string]: GoogleCloudMemcacheV1ZoneMetadata
  };
}

/**
 * Maintenance policy per instance.
 */
export interface GoogleCloudMemcacheV1MaintenancePolicy {
  /**
   * Output only. The time when the policy was created.
   */
  readonly createTime?: Date;
  /**
   * Description of what this policy is for. Create/Update methods return
   * INVALID_ARGUMENT if the length is greater than 512.
   */
  description?: string;
  /**
   * Output only. The time when the policy was updated.
   */
  readonly updateTime?: Date;
  /**
   * Required. Maintenance window that is applied to resources covered by this
   * policy. Minimum 1. For the current version, the maximum number of
   * weekly_maintenance_windows is expected to be one.
   */
  weeklyMaintenanceWindow?: WeeklyMaintenanceWindow[];
}

function serializeGoogleCloudMemcacheV1MaintenancePolicy(data: any): GoogleCloudMemcacheV1MaintenancePolicy {
  return {
    ...data,
    weeklyMaintenanceWindow: data["weeklyMaintenanceWindow"] !== undefined ? data["weeklyMaintenanceWindow"].map((item: any) => (serializeWeeklyMaintenanceWindow(item))) : undefined,
  };
}

function deserializeGoogleCloudMemcacheV1MaintenancePolicy(data: any): GoogleCloudMemcacheV1MaintenancePolicy {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    weeklyMaintenanceWindow: data["weeklyMaintenanceWindow"] !== undefined ? data["weeklyMaintenanceWindow"].map((item: any) => (deserializeWeeklyMaintenanceWindow(item))) : undefined,
  };
}

/**
 * Represents the metadata of a long-running operation.
 */
export interface GoogleCloudMemcacheV1OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. Time when the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusDetail?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

export interface GoogleCloudMemcacheV1ZoneMetadata {
}

/**
 * Instance represents the interface for SLM services to actuate the state of
 * control plane resources. Example Instance in JSON, where
 * consumer-project-number=123456, producer-project-id=cloud-sql: ```json
 * Instance: { "name":
 * "projects/123456/locations/us-east1/instances/prod-instance", "create_time":
 * { "seconds": 1526406431, }, "labels": { "env": "prod", "foo": "bar" },
 * "state": READY, "software_versions": { "software_update":
 * "cloud-sql-09-28-2018", }, "maintenance_policy_names": { "UpdatePolicy":
 * "projects/123456/locations/us-east1/maintenancePolicies/prod-update-policy",
 * } "tenant_project_id": "cloud-sql-test-tenant", "producer_metadata": {
 * "cloud-sql-tier": "basic", "cloud-sql-instance-size": "1G", },
 * "provisioned_resources": [ { "resource-type": "compute-instance",
 * "resource-url":
 * "https://www.googleapis.com/compute/v1/projects/cloud-sql/zones/us-east1-b/instances/vm-1",
 * } ], "maintenance_schedules": { "csa_rollout": { "start_time": { "seconds":
 * 1526406431, }, "end_time": { "seconds": 1535406431, }, }, "ncsa_rollout": {
 * "start_time": { "seconds": 1526406431, }, "end_time": { "seconds":
 * 1535406431, }, } }, "consumer_defined_name": "my-sql-instance1", } ```
 * LINT.IfChange
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  /**
   * consumer_defined_name is the name of the instance set by the service
   * consumers. Generally this is different from the `name` field which
   * reperesents the system-assigned id of the instance which the service
   * consumers do not recognize. This is a required field for tenants onboarding
   * to Maintenance Window notifications
   * (go/slm-rollout-maintenance-policies#prerequisites).
   */
  consumerDefinedName?: string;
  /**
   * Output only. Timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. The instance_type of this instance of format:
   * projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}.
   * Instance Type represents a high-level tier or SKU of the service that this
   * instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses
   * 'instance_type' along with 'software_versions' to determine whether
   * instance needs an update or not.
   */
  instanceType?: string;
  /**
   * Optional. Resource labels to represent user provided metadata. Each label
   * is a key-value pair, where both the key and the value are arbitrary strings
   * provided by the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The MaintenancePolicies that have been attached to the instance.
   * The key must be of the type name of the oneof policy name defined in
   * MaintenancePolicy, and the referenced policy must define the same policy
   * type. For details, please refer to go/cloud-saas-mw-ug. Should not be set
   * if maintenance_settings.maintenance_policies is set.
   */
  maintenancePolicyNames?: {
    [key: string]: string
  };
  /**
   * The MaintenanceSchedule contains the scheduling information of published
   * maintenance schedule with same key as software_versions.
   */
  maintenanceSchedules?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule
  };
  /**
   * Optional. The MaintenanceSettings associated with instance.
   */
  maintenanceSettings?: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings;
  /**
   * Unique name of the resource. It uses the form:
   * `projects/{project_number}/locations/{location_id}/instances/{instance_id}`
   * Note: This name is passed, stored and logged across the rollout system. So
   * use of consumer project_id or any other consumer PII in the name is
   * strongly discouraged for wipeout (go/wipeout) compliance. See
   * go/elysium/project_ids#storage-guidance for more details.
   */
  name?: string;
  /**
   * Optional. notification_parameter are information that service producers
   * may like to include that is not relevant to Rollout. This parameter will
   * only be passed to Gamma and Cloud Logging for notification/logging purpose.
   */
  notificationParameters?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter
  };
  /**
   * Output only. Custom string attributes used primarily to expose
   * producer-specific information in monitoring dashboards. See
   * go/get-instance-metadata.
   */
  readonly producerMetadata?: {
    [key: string]: string
  };
  /**
   * Output only. The list of data plane resources provisioned for this
   * instance, e.g. compute VMs. See go/get-instance-metadata.
   */
  readonly provisionedResources?: GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource[];
  /**
   * Link to the SLM instance template. Only populated when updating SLM
   * instances via SSA's Actuation service adaptor. Service producers with
   * custom control plane (e.g. Cloud SQL) doesn't need to populate this field.
   * Instead they should use software_versions.
   */
  slmInstanceTemplate?: string;
  /**
   * Output only. SLO metadata for instance classification in the Standardized
   * dataplane SLO platform. See go/cloud-ssa-standard-slo for feature
   * description.
   */
  readonly sloMetadata?: GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata;
  /**
   * Software versions that are used to deploy this instance. This can be
   * mutated by rollout services.
   */
  softwareVersions?: {
    [key: string]: string
  };
  /**
   * Output only. Current lifecycle state of the resource (e.g. if it's being
   * created or ready to use).
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "REPAIRING" | "DELETING" | "ERROR";
  /**
   * Output only. ID of the associated GCP tenant project. See
   * go/get-instance-metadata.
   */
  readonly tenantProjectId?: string;
  /**
   * Output only. Timestamp when the resource was last modified.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1Instance(data: any): GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  return {
    ...data,
    maintenanceSchedules: data["maintenanceSchedules"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceSchedules"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(v)]))) : undefined,
    maintenanceSettings: data["maintenanceSettings"] !== undefined ? serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data["maintenanceSettings"]) : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1Instance(data: any): GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    maintenanceSchedules: data["maintenanceSchedules"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceSchedules"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(v)]))) : undefined,
    maintenanceSettings: data["maintenanceSettings"] !== undefined ? deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data["maintenanceSettings"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Maintenance schedule which is exposed to customer and potentially end user,
 * indicating published upcoming future maintenance schedule
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  /**
   * This field is deprecated, and will be always set to true since reschedule
   * can happen multiple times now. This field should not be removed until all
   * service producers remove this for their customers.
   */
  canReschedule?: boolean;
  /**
   * The scheduled end time for the maintenance.
   */
  endTime?: Date;
  /**
   * The rollout management policy this maintenance schedule is associated
   * with. When doing reschedule update request, the reschedule should be
   * against this given policy.
   */
  rolloutManagementPolicy?: string;
  /**
   * schedule_deadline_time is the time deadline any schedule start time cannot
   * go beyond, including reschedule. It's normally the initial schedule start
   * time plus maintenance window length (1 day or 1 week). Maintenance cannot
   * be scheduled to start beyond this deadline.
   */
  scheduleDeadlineTime?: Date;
  /**
   * The scheduled start time for the maintenance.
   */
  startTime?: Date;
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? data["scheduleDeadlineTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? new Date(data["scheduleDeadlineTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Maintenance settings associated with instance. Allows service producers and
 * end users to assign settings that controls maintenance on this instance.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  /**
   * Optional. Exclude instance from maintenance. When true, rollout service
   * will not attempt maintenance on the instance. Rollout service will include
   * the instance in reported rollout progress as not attempted.
   */
  exclude?: boolean;
  /**
   * Optional. If the update call is triggered from rollback, set the value as
   * true.
   */
  isRollback?: boolean;
  /**
   * Optional. The MaintenancePolicies that have been attached to the instance.
   * The key must be of the type name of the oneof policy name defined in
   * MaintenancePolicy, and the embedded policy must define the same policy
   * type. For details, please refer to go/cloud-saas-mw-ug. Should not be set
   * if maintenance_policy_names is set. If only the name is needed, then only
   * populate MaintenancePolicy.name.
   */
  maintenancePolicies?: {
    [key: string]: MaintenancePolicy
  };
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  return {
    ...data,
    maintenancePolicies: data["maintenancePolicies"] !== undefined ? Object.fromEntries(Object.entries(data["maintenancePolicies"]).map(([k, v]: [string, any]) => ([k, serializeMaintenancePolicy(v)]))) : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  return {
    ...data,
    maintenancePolicies: data["maintenancePolicies"] !== undefined ? Object.fromEntries(Object.entries(data["maintenancePolicies"]).map(([k, v]: [string, any]) => ([k, deserializeMaintenancePolicy(v)]))) : undefined,
  };
}

/**
 * Node information for custom per-node SLO implementations. SSA does not
 * support per-node SLO, but producers can populate per-node information in
 * SloMetadata for custom precomputations. SSA Eligibility Exporter will emit
 * per-node metric based on this information.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata {
  /**
   * The location of the node, if different from instance location.
   */
  location?: string;
  /**
   * The id of the node. This should be equal to SaasInstanceNode.node_id.
   */
  nodeId?: string;
  /**
   * If present, this will override eligibility for the node coming from
   * instance or exclusions for specified SLIs.
   */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

/**
 * Contains notification related data.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter {
  /**
   * Optional. Array of string values. e.g. instance's replica information.
   */
  values?: string[];
}

/**
 * PerSliSloEligibility is a mapping from an SLI name to eligibility.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility {
  /**
   * An entry in the eligibilities map specifies an eligibility for a
   * particular SLI for the given instance. The SLI key in the name must be a
   * valid SLI name specified in the Eligibility Exporter binary flags otherwise
   * an error will be emitted by Eligibility Exporter and the oncaller will be
   * alerted. If an SLI has been defined in the binary flags but the
   * eligibilities map does not contain it, the corresponding SLI time series
   * will not be emitted by the Eligibility Exporter. This ensures a smooth
   * rollout and compatibility between the data produced by different versions
   * of the Eligibility Exporters. If eligibilities map contains a key for an
   * SLI which has not been declared in the binary flags, there will be an error
   * message emitted in the Eligibility Exporter log and the metric for the SLI
   * in question will not be emitted.
   */
  eligibilities?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility
  };
}

/**
 * Describes provisioned dataplane resources.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource {
  /**
   * Type of the resource. This can be either a GCP resource or a custom one
   * (e.g. another cloud provider's VM). For GCP compute resources use singular
   * form of the names listed in GCP compute API documentation
   * (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with
   * 'compute-', for example: 'compute-instance', 'compute-disk',
   * 'compute-autoscaler'.
   */
  resourceType?: string;
  /**
   * URL identifying the resource, e.g.
   * "https://www.googleapis.com/compute/v1/projects/...)".
   */
  resourceUrl?: string;
}

/**
 * SloEligibility is a tuple containing eligibility value: true if an instance
 * is eligible for SLO calculation or false if it should be excluded from all
 * SLO-related calculations along with a user-defined reason.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility {
  /**
   * Whether an instance is eligible or ineligible.
   */
  eligible?: boolean;
  /**
   * User-defined reason for the current value of instance eligibility.
   * Usually, this can be directly mapped to the internal state. An empty reason
   * is allowed.
   */
  reason?: string;
}

/**
 * SloMetadata contains resources required for proper SLO classification of the
 * instance.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata {
  /**
   * Optional. List of nodes. Some producers need to use per-node metadata to
   * calculate SLO. This field allows such producers to publish per-node SLO
   * meta data, which will be consumed by SSA Eligibility Exporter and published
   * in the form of per node metric to Monarch.
   */
  nodes?: GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata[];
  /**
   * Optional. Multiple per-instance SLI eligibilities which apply for
   * individual SLIs.
   */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
  /**
   * Name of the SLO tier the Instance belongs to. This name will be expected
   * to match the tiers specified in the service SLO configuration. Field is
   * mandatory and must not be empty.
   */
  tier?: string;
}

/**
 * A Memorystore for Memcached instance
 */
export interface Instance {
  /**
   * The full name of the Google Compute Engine
   * [network](/compute/docs/networks-and-firewalls#networks) to which the
   * instance is connected. If left unspecified, the `default` network will be
   * used.
   */
  authorizedNetwork?: string;
  /**
   * Output only. The time the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Endpoint for the Discovery API.
   */
  readonly discoveryEndpoint?: string;
  /**
   * User provided name for the instance, which is only used for display
   * purposes. Cannot be more than 80 characters.
   */
  displayName?: string;
  /**
   * List of messages that describe the current state of the Memcached
   * instance.
   */
  instanceMessages?: InstanceMessage[];
  /**
   * Resource labels to represent user-provided metadata. Refer to cloud
   * documentation on labels for more details.
   * https://cloud.google.com/compute/docs/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The maintenance policy for the instance. If not provided, the maintenance
   * event will be performed based on Memorystore internal rollout schedule.
   */
  maintenancePolicy?: GoogleCloudMemcacheV1MaintenancePolicy;
  /**
   * Output only. Published maintenance schedule.
   */
  readonly maintenanceSchedule?: MaintenanceSchedule;
  /**
   * Output only. The full version of memcached server running on this
   * instance. System automatically determines the full memcached version for an
   * instance based on the input MemcacheVersion. The full version format will
   * be "memcached-1.5.16".
   */
  readonly memcacheFullVersion?: string;
  /**
   * Output only. List of Memcached nodes. Refer to Node message for more
   * details.
   */
  readonly memcacheNodes?: Node[];
  /**
   * The major version of Memcached software. If not provided, latest supported
   * version will be used. Currently the latest supported major version is
   * `MEMCACHE_1_5`. The minor version will be automatically determined by our
   * system based on the latest supported minor version.
   */
  memcacheVersion?:  | "MEMCACHE_VERSION_UNSPECIFIED" | "MEMCACHE_1_5";
  /**
   * Required. Unique name of the resource in this scope including project and
   * location using the form:
   * `projects/{project_id}/locations/{location_id}/instances/{instance_id}`
   * Note: Memcached instances are managed and addressed at the regional level
   * so `location_id` here refers to a Google Cloud region; however, users may
   * choose which zones Memcached nodes should be provisioned in within an
   * instance. Refer to zones field for more details.
   */
  name?: string;
  /**
   * Required. Configuration for Memcached nodes.
   */
  nodeConfig?: NodeConfig;
  /**
   * Required. Number of nodes in the Memcached instance.
   */
  nodeCount?: number;
  /**
   * User defined parameters to apply to the memcached process on each node.
   */
  parameters?: MemcacheParameters;
  /**
   * Output only. The state of this Memcached instance.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "PERFORMING_MAINTENANCE";
  /**
   * Output only. The time the instance was updated.
   */
  readonly updateTime?: Date;
  /**
   * Zones in which Memcached nodes should be provisioned. Memcached nodes will
   * be equally distributed across these zones. If not provided, the service
   * will by default create nodes in all zones in the region for the instance.
   */
  zones?: string[];
}

function serializeInstance(data: any): Instance {
  return {
    ...data,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? serializeGoogleCloudMemcacheV1MaintenancePolicy(data["maintenancePolicy"]) : undefined,
  };
}

function deserializeInstance(data: any): Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? deserializeGoogleCloudMemcacheV1MaintenancePolicy(data["maintenancePolicy"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

export interface InstanceMessage {
  /**
   * A code that correspond to one type of user-facing message.
   */
  code?:  | "CODE_UNSPECIFIED" | "ZONE_DISTRIBUTION_UNBALANCED";
  /**
   * Message on memcached instance which will be exposed to users.
   */
  message?: string;
}

/**
 * Response for ListInstances.
 */
export interface ListInstancesResponse {
  /**
   * A list of Memcached instances in the project in the specified location, or
   * across all locations. If the `location_id` in the parent field of the
   * request is "-", all regions available to the project are queried, and the
   * results aggregated.
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
 * Metadata for the given google.cloud.location.Location.
 */
export interface LocationMetadata {
  /**
   * Output only. The set of available zones in the location. The map is keyed
   * by the lowercase ID of each zone, as defined by GCE. These keys can be
   * specified in the `zones` field when creating a Memcached instance.
   */
  readonly availableZones?: {
    [key: string]: ZoneMetadata
  };
}

/**
 * LINT.IfChange Defines policies to service maintenance events.
 */
export interface MaintenancePolicy {
  /**
   * Output only. The time when the resource was created.
   */
  createTime?: Date;
  /**
   * Optional. Description of what this policy is for. Create/Update methods
   * return INVALID_ARGUMENT if the length is greater than 512.
   */
  description?: string;
  /**
   * Optional. Resource labels to represent user provided metadata. Each label
   * is a key-value pair, where both the key and the value are arbitrary strings
   * provided by the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. MaintenancePolicy name using the form:
   * `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}`
   * where {project_id} refers to a GCP consumer project ID, {location_id}
   * refers to a GCP region/zone, {maintenance_policy_id} must be 1-63
   * characters long and match the regular expression
   * `[a-z0-9]([-a-z0-9]*[a-z0-9])?`.
   */
  name?: string;
  /**
   * Optional. The state of the policy.
   */
  state?:  | "STATE_UNSPECIFIED" | "READY" | "DELETING";
  /**
   * Maintenance policy applicable to instance update.
   */
  updatePolicy?: UpdatePolicy;
  /**
   * Output only. The time when the resource was updated.
   */
  updateTime?: Date;
}

function serializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updatePolicy: data["updatePolicy"] !== undefined ? serializeUpdatePolicy(data["updatePolicy"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updatePolicy: data["updatePolicy"] !== undefined ? deserializeUpdatePolicy(data["updatePolicy"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Upcoming maintenance schedule.
 */
export interface MaintenanceSchedule {
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
 * MaintenanceWindow definition.
 */
export interface MaintenanceWindow {
  /**
   * Daily cycle.
   */
  dailyCycle?: DailyCycle;
  /**
   * Weekly cycle.
   */
  weeklyCycle?: WeeklyCycle;
}

function serializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    dailyCycle: data["dailyCycle"] !== undefined ? serializeDailyCycle(data["dailyCycle"]) : undefined,
    weeklyCycle: data["weeklyCycle"] !== undefined ? serializeWeeklyCycle(data["weeklyCycle"]) : undefined,
  };
}

function deserializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    dailyCycle: data["dailyCycle"] !== undefined ? deserializeDailyCycle(data["dailyCycle"]) : undefined,
    weeklyCycle: data["weeklyCycle"] !== undefined ? deserializeWeeklyCycle(data["weeklyCycle"]) : undefined,
  };
}

export interface MemcacheParameters {
  /**
   * Output only. The unique ID associated with this set of parameters. Users
   * can use this id to determine if the parameters associated with the instance
   * differ from the parameters associated with the nodes. A discrepancy between
   * parameter ids can inform users that they may need to take action to apply
   * parameters on nodes.
   */
  readonly id?: string;
  /**
   * User defined set of parameters to use in the memcached process.
   */
  params?: {
    [key: string]: string
  };
}

export interface Node {
  /**
   * Output only. Hostname or IP address of the Memcached node used by the
   * clients to connect to the Memcached server on this node.
   */
  readonly host?: string;
  /**
   * Output only. Identifier of the Memcached node. The node id does not
   * include project or location like the Memcached instance name.
   */
  readonly nodeId?: string;
  /**
   * User defined parameters currently applied to the node.
   */
  parameters?: MemcacheParameters;
  /**
   * Output only. The port number of the Memcached server on this node.
   */
  readonly port?: number;
  /**
   * Output only. Current state of the Memcached node.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING";
  /**
   * Output only. Location (GCP Zone) for the Memcached node.
   */
  readonly zone?: string;
}

/**
 * Configuration for a Memcached Node.
 */
export interface NodeConfig {
  /**
   * Required. Number of cpus per Memcached node.
   */
  cpuCount?: number;
  /**
   * Required. Memory size in MiB for each Memcached node.
   */
  memorySizeMb?: number;
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
 * Represents the metadata of a long-running operation.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. Time when the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusDetail?: string;
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
 * Additional options for memcache#projectsLocationsInstancesCreate.
 */
export interface ProjectsLocationsInstancesCreateOptions {
  /**
   * Required. The logical name of the Memcached instance in the user project
   * with the following restrictions: * Must contain only lowercase letters,
   * numbers, and hyphens. * Must start with a letter. * Must be between 1-40
   * characters. * Must end with a number or a letter. * Must be unique within
   * the user project / location. If any of the above are not met, the API
   * raises an invalid argument error.
   */
  instanceId?: string;
}

/**
 * Additional options for memcache#projectsLocationsInstancesList.
 */
export interface ProjectsLocationsInstancesListOptions {
  /**
   * List filter. For example, exclude all Memcached instances with name as
   * my-instance by specifying `"name != my-instance"`.
   */
  filter?: string;
  /**
   * Sort results. Supported values are "name", "name desc" or "" (unsorted).
   */
  orderBy?: string;
  /**
   * The maximum number of items to return. If not specified, a default value
   * of 1000 will be used by the service. Regardless of the `page_size` value,
   * the response may include a partial list and a caller should only rely on
   * response's `next_page_token` to determine if there are more instances left
   * to be queried.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for memcache#projectsLocationsInstancesPatch.
 */
export interface ProjectsLocationsInstancesPatchOptions {
  /**
   * Required. Mask of fields to update. * `displayName`
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
 * Additional options for memcache#projectsLocationsList.
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
 * Additional options for memcache#projectsLocationsOperationsList.
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
 * Request for RescheduleMaintenance.
 */
export interface RescheduleMaintenanceRequest {
  /**
   * Required. If reschedule type is SPECIFIC_TIME, must set up schedule_time
   * as well.
   */
  rescheduleType?:  | "RESCHEDULE_TYPE_UNSPECIFIED" | "IMMEDIATE" | "NEXT_AVAILABLE_WINDOW" | "SPECIFIC_TIME";
  /**
   * Timestamp when the maintenance shall be rescheduled to if
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
 * Configure the schedule.
 */
export interface Schedule {
  /**
   * Allows to define schedule that runs specified day of the week.
   */
  day?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Output only. Duration of the time window, set by service producer.
   */
  duration?: number /* Duration */;
  /**
   * Time within the window to start the operations.
   */
  startTime?: TimeOfDay;
}

function serializeSchedule(data: any): Schedule {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeSchedule(data: any): Schedule {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
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
 * Request for UpdateParameters.
 */
export interface UpdateParametersRequest {
  /**
   * The parameters to apply to the instance.
   */
  parameters?: MemcacheParameters;
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateParametersRequest(data: any): UpdateParametersRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateParametersRequest(data: any): UpdateParametersRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Maintenance policy applicable to instance updates.
 */
export interface UpdatePolicy {
  /**
   * Optional. Relative scheduling channel applied to resource.
   */
  channel?:  | "UPDATE_CHANNEL_UNSPECIFIED" | "EARLIER" | "LATER" | "WEEK1" | "WEEK2" | "WEEK5";
  /**
   * Deny Maintenance Period that is applied to resource to indicate when
   * maintenance is forbidden. User can specify zero or more non-overlapping
   * deny periods. Maximum number of deny_maintenance_periods expected is one.
   */
  denyMaintenancePeriods?: DenyMaintenancePeriod[];
  /**
   * Optional. Maintenance window that is applied to resources covered by this
   * policy.
   */
  window?: MaintenanceWindow;
}

function serializeUpdatePolicy(data: any): UpdatePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? serializeMaintenanceWindow(data["window"]) : undefined,
  };
}

function deserializeUpdatePolicy(data: any): UpdatePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? deserializeMaintenanceWindow(data["window"]) : undefined,
  };
}

/**
 * Time window specified for weekly operations.
 */
export interface WeeklyCycle {
  /**
   * User can specify multiple windows in a week. Minimum of 1 window.
   */
  schedule?: Schedule[];
}

function serializeWeeklyCycle(data: any): WeeklyCycle {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? data["schedule"].map((item: any) => (serializeSchedule(item))) : undefined,
  };
}

function deserializeWeeklyCycle(data: any): WeeklyCycle {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? data["schedule"].map((item: any) => (deserializeSchedule(item))) : undefined,
  };
}

/**
 * Time window specified for weekly operations.
 */
export interface WeeklyMaintenanceWindow {
  /**
   * Required. Allows to define schedule that runs specified day of the week.
   */
  day?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Required. Duration of the time window.
   */
  duration?: number /* Duration */;
  /**
   * Required. Start time of the window in UTC.
   */
  startTime?: TimeOfDay;
}

function serializeWeeklyMaintenanceWindow(data: any): WeeklyMaintenanceWindow {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeWeeklyMaintenanceWindow(data: any): WeeklyMaintenanceWindow {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

export interface ZoneMetadata {
}