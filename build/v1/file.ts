// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Filestore API Client for Deno
 * ===================================
 * 
 * The Cloud Filestore API is used for creating and managing cloud file servers.
 * 
 * Docs: https://cloud.google.com/filestore/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Cloud Filestore API is used for creating and managing cloud file
 * servers.
 */
export class file {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://file.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a backup.
   *
   * @param parent Required. The backup's project and location, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example **us-west1**.
   */
  async projectsLocationsBackupsCreate(parent: string, req: Backup, opts: ProjectsLocationsBackupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
    if (opts.backupId !== undefined) {
      url.searchParams.append("backupId", String(opts.backupId));
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
   * Deletes a backup.
   *
   * @param name Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}`
   */
  async projectsLocationsBackupsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific backup.
   *
   * @param name Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}`.
   */
  async projectsLocationsBackupsGet(name: string): Promise<Backup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Backup;
  }

  /**
   * Lists all backups in a project for either a specified location or for all
   * locations.
   *
   * @param parent Required. The project and location for which to retrieve backup information, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example **us-west1**. To retrieve backup information for all locations, use "-" for the `{location}` value.
   */
  async projectsLocationsBackupsList(parent: string, opts: ProjectsLocationsBackupsListOptions = {}): Promise<ListBackupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
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
    return data as ListBackupsResponse;
  }

  /**
   * Updates the settings of a specific backup.
   *
   * @param name Output only. The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`.
   */
  async projectsLocationsBackupsPatch(name: string, req: Backup, opts: ProjectsLocationsBackupsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsBackupsPatchOptions(opts);
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
   * Creates an instance. When creating from a backup, the capacity of the new
   * instance needs to be equal to or larger than the capacity of the backup
   * (and also equal to or larger than the minimum capacity of the tier).
   *
   * @param parent Required. The instance's project and location, in the format `projects/{project_id}/locations/{location}`. In Filestore, locations map to Google Cloud zones, for example **us-west1-b**.
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
   * Deletes an instance.
   *
   * @param name Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`
   */
  async projectsLocationsInstancesDelete(name: string, opts: ProjectsLocationsInstancesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific instance.
   *
   * @param name Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`.
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
   * Lists all instances in a project for either a specified location or for
   * all locations.
   *
   * @param parent Required. The project and location for which to retrieve instance information, in the format `projects/{project_id}/locations/{location}`. In Cloud Filestore, locations map to Google Cloud zones, for example **us-west1-b**. To retrieve instance information for all locations, use "-" for the `{location}` value.
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
   * Updates the settings of a specific instance.
   *
   * @param name Output only. The resource name of the instance, in the format `projects/{project}/locations/{location}/instances/{instance}`.
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
   * Restores an existing instance's file share from a backup. The capacity of
   * the instance needs to be equal to or larger than the capacity of the backup
   * (and also equal to or larger than the minimum capacity of the tier).
   *
   * @param name Required. The resource name of the instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`.
   */
  async projectsLocationsInstancesRestore(name: string, req: RestoreInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a snapshot.
   *
   * @param parent Required. The Filestore Instance to create the snapshots of, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`
   */
  async projectsLocationsInstancesSnapshotsCreate(parent: string, req: Snapshot, opts: ProjectsLocationsInstancesSnapshotsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/snapshots`);
    if (opts.snapshotId !== undefined) {
      url.searchParams.append("snapshotId", String(opts.snapshotId));
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
   * Deletes a snapshot.
   *
   * @param name Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}`
   */
  async projectsLocationsInstancesSnapshotsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific snapshot.
   *
   * @param name Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}`
   */
  async projectsLocationsInstancesSnapshotsGet(name: string): Promise<Snapshot> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Snapshot;
  }

  /**
   * Lists all snapshots in a project for either a specified location or for
   * all locations.
   *
   * @param parent Required. The instance for which to retrieve snapshot information, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`.
   */
  async projectsLocationsInstancesSnapshotsList(parent: string, opts: ProjectsLocationsInstancesSnapshotsListOptions = {}): Promise<ListSnapshotsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/snapshots`);
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
    return data as ListSnapshotsResponse;
  }

  /**
   * Updates the settings of a specific snapshot.
   *
   * @param name Output only. The resource name of the snapshot, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}`.
   */
  async projectsLocationsInstancesSnapshotsPatch(name: string, req: Snapshot, opts: ProjectsLocationsInstancesSnapshotsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsInstancesSnapshotsPatchOptions(opts);
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
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/locations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.includeUnrevealedLocations !== undefined) {
      url.searchParams.append("includeUnrevealedLocations", String(opts.includeUnrevealedLocations));
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
 * A Filestore backup.
 */
export interface Backup {
  /**
   * Output only. Capacity of the source file share when the backup was
   * created.
   */
  readonly capacityGb?: bigint;
  /**
   * Output only. The time when the backup was created.
   */
  readonly createTime?: Date;
  /**
   * A description of the backup with 2048 characters or less. Requests with
   * longer descriptions will be rejected.
   */
  description?: string;
  /**
   * Output only. Amount of bytes that will be downloaded if the backup is
   * restored. This may be different than storage bytes, since sequential
   * backups of the same disk will share storage.
   */
  readonly downloadBytes?: bigint;
  /**
   * Immutable. KMS key name used for data encryption.
   */
  kmsKey?: string;
  /**
   * Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the backup, in the format
   * `projects/{project_number}/locations/{location_id}/backups/{backup_id}`.
   */
  readonly name?: string;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Name of the file share in the source Filestore instance that the backup is
   * created from.
   */
  sourceFileShare?: string;
  /**
   * The resource name of the source Filestore instance, in the format
   * `projects/{project_number}/locations/{location_id}/instances/{instance_id}`,
   * used to create this backup.
   */
  sourceInstance?: string;
  /**
   * Output only. The service tier of the source Filestore instance that this
   * backup is created from.
   */
  readonly sourceInstanceTier?:  | "TIER_UNSPECIFIED" | "STANDARD" | "PREMIUM" | "BASIC_HDD" | "BASIC_SSD" | "HIGH_SCALE_SSD" | "ENTERPRISE";
  /**
   * Output only. The backup state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "FINALIZING" | "READY" | "DELETING";
  /**
   * Output only. The size of the storage used by the backup. As backups share
   * storage, this number is expected to change with backup creation/deletion.
   */
  readonly storageBytes?: bigint;
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
 * File share configuration for the instance.
 */
export interface FileShareConfig {
  /**
   * File share capacity in gigabytes (GB). Filestore defines 1 GB as 1024^3
   * bytes.
   */
  capacityGb?: bigint;
  /**
   * The name of the file share (must be 16 characters or less).
   */
  name?: string;
  /**
   * Nfs Export Options. There is a limit of 10 export options per file share.
   */
  nfsExportOptions?: NfsExportOptions[];
  /**
   * The resource name of the backup, in the format
   * `projects/{project_number}/locations/{location_id}/backups/{backup_id}`,
   * that this file share has been restored from.
   */
  sourceBackup?: string;
}

function serializeFileShareConfig(data: any): FileShareConfig {
  return {
    ...data,
    capacityGb: data["capacityGb"] !== undefined ? String(data["capacityGb"]) : undefined,
    nfsExportOptions: data["nfsExportOptions"] !== undefined ? data["nfsExportOptions"].map((item: any) => (serializeNfsExportOptions(item))) : undefined,
  };
}

function deserializeFileShareConfig(data: any): FileShareConfig {
  return {
    ...data,
    capacityGb: data["capacityGb"] !== undefined ? BigInt(data["capacityGb"]) : undefined,
    nfsExportOptions: data["nfsExportOptions"] !== undefined ? data["nfsExportOptions"].map((item: any) => (deserializeNfsExportOptions(item))) : undefined,
  };
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
 * A Filestore instance.
 */
export interface Instance {
  /**
   * Output only. The time when the instance was created.
   */
  readonly createTime?: Date;
  /**
   * The description of the instance (2048 characters or less).
   */
  description?: string;
  /**
   * Server-specified ETag for the instance resource to prevent simultaneous
   * updates from overwriting each other.
   */
  etag?: string;
  /**
   * File system shares on the instance. For this version, only a single file
   * share is supported.
   */
  fileShares?: FileShareConfig[];
  /**
   * KMS key name used for data encryption.
   */
  kmsKeyName?: string;
  /**
   * Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the instance, in the format
   * `projects/{project}/locations/{location}/instances/{instance}`.
   */
  readonly name?: string;
  /**
   * VPC networks to which the instance is connected. For this version, only a
   * single network is supported.
   */
  networks?: NetworkConfig[];
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Output only. The instance state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "REPAIRING" | "DELETING" | "ERROR" | "RESTORING" | "SUSPENDED" | "SUSPENDING" | "RESUMING";
  /**
   * Output only. Additional information about the instance state, if
   * available.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Field indicates all the reasons the instance is in
   * "SUSPENDED" state.
   */
  readonly suspensionReasons?:  | "SUSPENSION_REASON_UNSPECIFIED" | "KMS_KEY_ISSUE"[];
  /**
   * The service tier of the instance.
   */
  tier?:  | "TIER_UNSPECIFIED" | "STANDARD" | "PREMIUM" | "BASIC_HDD" | "BASIC_SSD" | "HIGH_SCALE_SSD" | "ENTERPRISE";
}

function serializeInstance(data: any): Instance {
  return {
    ...data,
    fileShares: data["fileShares"] !== undefined ? data["fileShares"].map((item: any) => (serializeFileShareConfig(item))) : undefined,
  };
}

function deserializeInstance(data: any): Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    fileShares: data["fileShares"] !== undefined ? data["fileShares"].map((item: any) => (deserializeFileShareConfig(item))) : undefined,
  };
}

/**
 * ListBackupsResponse is the result of ListBackupsRequest.
 */
export interface ListBackupsResponse {
  /**
   * A list of backups in the project for the specified location. If the
   * `{location}` value in the request is "-", the response contains a list of
   * backups from all locations. If any location is unreachable, the response
   * will only return backups in reachable locations and the "unreachable" field
   * will be populated with a list of unreachable locations.
   */
  backups?: Backup[];
  /**
   * The token you can use to retrieve the next page of results. Not returned
   * if there are no more results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * ListInstancesResponse is the result of ListInstancesRequest.
 */
export interface ListInstancesResponse {
  /**
   * A list of instances in the project for the specified location. If the
   * `{location}` value in the request is "-", the response contains a list of
   * instances from all locations. If any location is unreachable, the response
   * will only return instances in reachable locations and the "unreachable"
   * field will be populated with a list of unreachable locations.
   */
  instances?: Instance[];
  /**
   * The token you can use to retrieve the next page of results. Not returned
   * if there are no more results in the list.
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
 * ListSnapshotsResponse is the result of ListSnapshotsRequest.
 */
export interface ListSnapshotsResponse {
  /**
   * The token you can use to retrieve the next page of results. Not returned
   * if there are no more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of snapshots in the project for the specified instance.
   */
  snapshots?: Snapshot[];
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

/**
 * Network configuration for the instance.
 */
export interface NetworkConfig {
  /**
   * The network connect mode of the Filestore instance. If not provided, the
   * connect mode defaults to DIRECT_PEERING.
   */
  connectMode?:  | "CONNECT_MODE_UNSPECIFIED" | "DIRECT_PEERING" | "PRIVATE_SERVICE_ACCESS";
  /**
   * Output only. IPv4 addresses in the format
   * `{octet1}.{octet2}.{octet3}.{octet4}` or IPv6 addresses in the format
   * `{block1}:{block2}:{block3}:{block4}:{block5}:{block6}:{block7}:{block8}`.
   */
  readonly ipAddresses?: string[];
  /**
   * Internet protocol versions for which the instance has IP addresses
   * assigned. For this version, only MODE_IPV4 is supported.
   */
  modes?:  | "ADDRESS_MODE_UNSPECIFIED" | "MODE_IPV4"[];
  /**
   * The name of the Google Compute Engine [VPC
   * network](https://cloud.google.com/vpc/docs/vpc) to which the instance is
   * connected.
   */
  network?: string;
  /**
   * Optional, reserved_ip_range can have one of the following two types of
   * values. * CIDR range value when using DIRECT_PEERING connect mode. *
   * [Allocated IP address
   * range](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-internal-ip-address)
   * when using PRIVATE_SERVICE_ACCESS connect mode. When the name of an
   * allocated IP address range is specified, it must be one of the ranges
   * associated with the private service access connection. When specified as a
   * direct CIDR value, it must be a /29 CIDR block for Basic tier, a /24 CIDR
   * block for High Scale tier, or a /26 CIDR block for Enterprise tier in one
   * of the [internal IP address
   * ranges](https://www.arin.net/reference/research/statistics/address_filters/)
   * that identifies the range of IP addresses reserved for this instance. For
   * example, 10.0.0.0/29, 192.168.0.0/24 or 192.168.0.0/26, respectively. The
   * range you specify can't overlap with either existing subnets or assigned IP
   * address ranges for other Filestore instances in the selected VPC network.
   */
  reservedIpRange?: string;
}

/**
 * NFS export options specifications.
 */
export interface NfsExportOptions {
  /**
   * Either READ_ONLY, for allowing only read requests on the exported
   * directory, or READ_WRITE, for allowing both read and write requests. The
   * default is READ_WRITE.
   */
  accessMode?:  | "ACCESS_MODE_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE";
  /**
   * An integer representing the anonymous group id with a default value of
   * 65534. Anon_gid may only be set with squash_mode of ROOT_SQUASH. An error
   * will be returned if this field is specified for other squash_mode settings.
   */
  anonGid?: bigint;
  /**
   * An integer representing the anonymous user id with a default value of
   * 65534. Anon_uid may only be set with squash_mode of ROOT_SQUASH. An error
   * will be returned if this field is specified for other squash_mode settings.
   */
  anonUid?: bigint;
  /**
   * List of either an IPv4 addresses in the format
   * `{octet1}.{octet2}.{octet3}.{octet4}` or CIDR ranges in the format
   * `{octet1}.{octet2}.{octet3}.{octet4}/{mask size}` which may mount the file
   * share. Overlapping IP ranges are not allowed, both within and across
   * NfsExportOptions. An error will be returned. The limit is 64 IP
   * ranges/addresses for each FileShareConfig among all NfsExportOptions.
   */
  ipRanges?: string[];
  /**
   * Either NO_ROOT_SQUASH, for allowing root access on the exported directory,
   * or ROOT_SQUASH, for not allowing root access. The default is
   * NO_ROOT_SQUASH.
   */
  squashMode?:  | "SQUASH_MODE_UNSPECIFIED" | "NO_ROOT_SQUASH" | "ROOT_SQUASH";
}

function serializeNfsExportOptions(data: any): NfsExportOptions {
  return {
    ...data,
    anonGid: data["anonGid"] !== undefined ? String(data["anonGid"]) : undefined,
    anonUid: data["anonUid"] !== undefined ? String(data["anonUid"]) : undefined,
  };
}

function deserializeNfsExportOptions(data: any): NfsExportOptions {
  return {
    ...data,
    anonGid: data["anonGid"] !== undefined ? BigInt(data["anonGid"]) : undefined,
    anonUid: data["anonUid"] !== undefined ? BigInt(data["anonUid"]) : undefined,
  };
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
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
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
 * Additional options for file#projectsLocationsBackupsCreate.
 */
export interface ProjectsLocationsBackupsCreateOptions {
  /**
   * Required. The ID to use for the backup. The ID must be unique within the
   * specified project and location. This value must start with a lowercase
   * letter followed by up to 62 lowercase letters, numbers, or hyphens, and
   * cannot end with a hyphen. Values that do not match this pattern will
   * trigger an INVALID_ARGUMENT error.
   */
  backupId?: string;
}

/**
 * Additional options for file#projectsLocationsBackupsList.
 */
export interface ProjectsLocationsBackupsListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Sort results. Supported values are "name", "name desc" or "" (unsorted).
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value to use if there are additional results to
   * retrieve for this list request.
   */
  pageToken?: string;
}

/**
 * Additional options for file#projectsLocationsBackupsPatch.
 */
export interface ProjectsLocationsBackupsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBackupsPatchOptions(data: any): ProjectsLocationsBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBackupsPatchOptions(data: any): ProjectsLocationsBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for file#projectsLocationsInstancesCreate.
 */
export interface ProjectsLocationsInstancesCreateOptions {
  /**
   * Required. The name of the instance to create. The name must be unique for
   * the specified project and location.
   */
  instanceId?: string;
}

/**
 * Additional options for file#projectsLocationsInstancesDelete.
 */
export interface ProjectsLocationsInstancesDeleteOptions {
  /**
   * If set to true, all snapshots of the instance will also be deleted.
   * (Otherwise, the request will only work if the instance has no snapshots.)
   */
  force?: boolean;
}

/**
 * Additional options for file#projectsLocationsInstancesList.
 */
export interface ProjectsLocationsInstancesListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Sort results. Supported values are "name", "name desc" or "" (unsorted).
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value to use if there are additional results to
   * retrieve for this list request.
   */
  pageToken?: string;
}

/**
 * Additional options for file#projectsLocationsInstancesPatch.
 */
export interface ProjectsLocationsInstancesPatchOptions {
  /**
   * Mask of fields to update. At least one path must be supplied in this
   * field. The elements of the repeated paths field may only include these
   * fields: * "description" * "file_shares" * "labels"
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
 * Additional options for file#projectsLocationsInstancesSnapshotsCreate.
 */
export interface ProjectsLocationsInstancesSnapshotsCreateOptions {
  /**
   * Required. The ID to use for the snapshot. The ID must be unique within the
   * specified instance. This value must start with a lowercase letter followed
   * by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a
   * hyphen.
   */
  snapshotId?: string;
}

/**
 * Additional options for file#projectsLocationsInstancesSnapshotsList.
 */
export interface ProjectsLocationsInstancesSnapshotsListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Sort results. Supported values are "name", "name desc" or "" (unsorted).
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value to use if there are additional results to
   * retrieve for this list request.
   */
  pageToken?: string;
}

/**
 * Additional options for file#projectsLocationsInstancesSnapshotsPatch.
 */
export interface ProjectsLocationsInstancesSnapshotsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsInstancesSnapshotsPatchOptions(data: any): ProjectsLocationsInstancesSnapshotsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsInstancesSnapshotsPatchOptions(data: any): ProjectsLocationsInstancesSnapshotsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for file#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * If true, the returned list will include locations which are not yet
   * revealed.
   */
  includeUnrevealedLocations?: boolean;
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
 * Additional options for file#projectsLocationsOperationsList.
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
 * RestoreInstanceRequest restores an existing instance's file share from a
 * backup.
 */
export interface RestoreInstanceRequest {
  /**
   * Required. Name of the file share in the Filestore instance that the backup
   * is being restored to.
   */
  fileShare?: string;
  /**
   * The resource name of the backup, in the format
   * `projects/{project_number}/locations/{location_id}/backups/{backup_id}`.
   */
  sourceBackup?: string;
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
 * A Filestore snapshot.
 */
export interface Snapshot {
  /**
   * Output only. The time when the snapshot was created.
   */
  readonly createTime?: Date;
  /**
   * A description of the snapshot with 2048 characters or less. Requests with
   * longer descriptions will be rejected.
   */
  description?: string;
  /**
   * Output only. The amount of bytes needed to allocate a full copy of the
   * snapshot content
   */
  readonly filesystemUsedBytes?: bigint;
  /**
   * Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the snapshot, in the format
   * `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}`.
   */
  readonly name?: string;
  /**
   * Output only. The snapshot state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING";
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