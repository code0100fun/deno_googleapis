// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Backup for GKE API Client for Deno
 * ==================================
 * 
 * Backup for GKE is a managed Kubernetes workload backup and restore service for GKE clusters.
 * 
 * Docs: https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Backup for GKE is a managed Kubernetes workload backup and restore service
 * for GKE clusters.
 */
export class GKEBackup {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gkebackup.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a Backup for the given BackupPlan.
   *
   * @param parent Required. The BackupPlan within which to create the Backup. Format: `projects/*\/locations/*\/backupPlans/*`
   */
  async projectsLocationsBackupPlansBackupsCreate(parent: string, req: Backup, opts: ProjectsLocationsBackupPlansBackupsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an existing Backup.
   *
   * @param name Required. Name of the Backup resource. Format: `projects/*\/locations/*\/backupPlans/*\/backups/*`
   */
  async projectsLocationsBackupPlansBackupsDelete(name: string, opts: ProjectsLocationsBackupPlansBackupsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieve the details of a single Backup.
   *
   * @param name Required. Full name of the Backup resource. Format: `projects/*\/locations/*\/backupPlans/*\/backups/*`
   */
  async projectsLocationsBackupPlansBackupsGet(name: string): Promise<Backup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Backup;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsGetIamPolicy(resource: string, opts: ProjectsLocationsBackupPlansBackupsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the Backups for a given BackupPlan.
   *
   * @param parent Required. The BackupPlan that contains the Backups to list. Format: `projects/*\/locations/*\/backupPlans/*`
   */
  async projectsLocationsBackupPlansBackupsList(parent: string, opts: ProjectsLocationsBackupPlansBackupsListOptions = {}): Promise<ListBackupsResponse> {
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
   * Update a Backup.
   *
   * @param name Output only. The fully qualified name of the Backup. `projects/*\/locations/*\/backupPlans/*\/backups/*`
   */
  async projectsLocationsBackupPlansBackupsPatch(name: string, req: Backup, opts: ProjectsLocationsBackupPlansBackupsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsBackupPlansBackupsPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Retrieve the details of a single VolumeBackup.
   *
   * @param name Required. Full name of the VolumeBackup resource. Format: `projects/*\/locations/*\/backupPlans/*\/backups/*\/volumeBackups/*`
   */
  async projectsLocationsBackupPlansBackupsVolumeBackupsGet(name: string): Promise<VolumeBackup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VolumeBackup;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsVolumeBackupsGetIamPolicy(resource: string, opts: ProjectsLocationsBackupPlansBackupsVolumeBackupsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the VolumeBackups for a given Backup.
   *
   * @param parent Required. The Backup that contains the VolumeBackups to list. Format: `projects/*\/locations/*\/backupPlans/*\/backups/*`
   */
  async projectsLocationsBackupPlansBackupsVolumeBackupsList(parent: string, opts: ProjectsLocationsBackupPlansBackupsVolumeBackupsListOptions = {}): Promise<ListVolumeBackupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/volumeBackups`);
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
    return data as ListVolumeBackupsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsVolumeBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansBackupsVolumeBackupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a new BackupPlan in a given location.
   *
   * @param parent Required. The location within which to create the BackupPlan. Format: `projects/*\/locations/*`
   */
  async projectsLocationsBackupPlansCreate(parent: string, req: BackupPlan, opts: ProjectsLocationsBackupPlansCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backupPlans`);
    if (opts.backupPlanId !== undefined) {
      url.searchParams.append("backupPlanId", String(opts.backupPlanId));
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
   * Deletes an existing BackupPlan.
   *
   * @param name Required. Fully qualified BackupPlan name. Format: `projects/*\/locations/*\/backupPlans/*`
   */
  async projectsLocationsBackupPlansDelete(name: string, opts: ProjectsLocationsBackupPlansDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieve the details of a single BackupPlan.
   *
   * @param name Required. Fully qualified BackupPlan name. Format: `projects/*\/locations/*\/backupPlans/*`
   */
  async projectsLocationsBackupPlansGet(name: string): Promise<BackupPlan> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BackupPlan;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansGetIamPolicy(resource: string, opts: ProjectsLocationsBackupPlansGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists BackupPlans in a given location.
   *
   * @param parent Required. The location that contains the BackupPlans to list. Format: `projects/*\/locations/*`
   */
  async projectsLocationsBackupPlansList(parent: string, opts: ProjectsLocationsBackupPlansListOptions = {}): Promise<ListBackupPlansResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backupPlans`);
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
    return data as ListBackupPlansResponse;
  }

  /**
   * Update a BackupPlan.
   *
   * @param name Output only. The full name of the BackupPlan resource. Format: `projects/*\/locations/*\/backupPlans/*`
   */
  async projectsLocationsBackupPlansPatch(name: string, req: BackupPlan, opts: ProjectsLocationsBackupPlansPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsBackupPlansPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsBackupPlansTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsDeleteOperations(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
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
  async projectsLocationsOperationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<Empty> {
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
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
   * Creates a new RestorePlan in a given location.
   *
   * @param parent Required. The location within which to create the RestorePlan. Format: `projects/*\/locations/*`
   */
  async projectsLocationsRestorePlansCreate(parent: string, req: RestorePlan, opts: ProjectsLocationsRestorePlansCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/restorePlans`);
    if (opts.restorePlanId !== undefined) {
      url.searchParams.append("restorePlanId", String(opts.restorePlanId));
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
   * Deletes an existing RestorePlan.
   *
   * @param name Required. Fully qualified RestorePlan name. Format: `projects/*\/locations/*\/restorePlans/*`
   */
  async projectsLocationsRestorePlansDelete(name: string, opts: ProjectsLocationsRestorePlansDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieve the details of a single RestorePlan.
   *
   * @param name Required. Fully qualified RestorePlan name. Format: `projects/*\/locations/*\/restorePlans/*`
   */
  async projectsLocationsRestorePlansGet(name: string): Promise<RestorePlan> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RestorePlan;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansGetIamPolicy(resource: string, opts: ProjectsLocationsRestorePlansGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists RestorePlans in a given location.
   *
   * @param parent Required. The location that contains the RestorePlans to list. Format: `projects/*\/locations/*`
   */
  async projectsLocationsRestorePlansList(parent: string, opts: ProjectsLocationsRestorePlansListOptions = {}): Promise<ListRestorePlansResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/restorePlans`);
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
    return data as ListRestorePlansResponse;
  }

  /**
   * Update a RestorePlan.
   *
   * @param name Output only. The full name of the RestorePlan resource. Format: `projects/*\/locations/*\/restorePlans/*`.
   */
  async projectsLocationsRestorePlansPatch(name: string, req: RestorePlan, opts: ProjectsLocationsRestorePlansPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsRestorePlansPatchOptions(opts);
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
   * Creates a new Restore for the given RestorePlan.
   *
   * @param parent Required. The RestorePlan within which to create the Restore. Format: `projects/*\/locations/*\/restorePlans/*`
   */
  async projectsLocationsRestorePlansRestoresCreate(parent: string, req: Restore, opts: ProjectsLocationsRestorePlansRestoresCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/restores`);
    if (opts.restoreId !== undefined) {
      url.searchParams.append("restoreId", String(opts.restoreId));
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
   * Deletes an existing Restore.
   *
   * @param name Required. Full name of the Restore Format: `projects/*\/locations/*\/restorePlans/*\/restores/*`
   */
  async projectsLocationsRestorePlansRestoresDelete(name: string, opts: ProjectsLocationsRestorePlansRestoresDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves the details of a single Restore.
   *
   * @param name Required. Name of the restore resource. Format: `projects/*\/locations/*\/restorePlans/*\/restores/*`
   */
  async projectsLocationsRestorePlansRestoresGet(name: string): Promise<Restore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Restore;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresGetIamPolicy(resource: string, opts: ProjectsLocationsRestorePlansRestoresGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the Restores for a given RestorePlan.
   *
   * @param parent Required. The RestorePlan that contains the Restores to list. Format: `projects/*\/locations/*\/restorePlans/*`
   */
  async projectsLocationsRestorePlansRestoresList(parent: string, opts: ProjectsLocationsRestorePlansRestoresListOptions = {}): Promise<ListRestoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/restores`);
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
    return data as ListRestoresResponse;
  }

  /**
   * Update a Restore.
   *
   * @param name Output only. The full name of the Restore resource. Format: `projects/*\/locations/*\/restorePlans/*\/restores/*`
   */
  async projectsLocationsRestorePlansRestoresPatch(name: string, req: Restore, opts: ProjectsLocationsRestorePlansRestoresPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsRestorePlansRestoresPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Retrieve the details of a single VolumeRestore.
   *
   * @param name Required. Full name of the VolumeRestore resource. Format: `projects/*\/locations/*\/restorePlans/*\/restores/*\/volumeRestores/*`
   */
  async projectsLocationsRestorePlansRestoresVolumeRestoresGet(name: string): Promise<VolumeRestore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VolumeRestore;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresVolumeRestoresGetIamPolicy(resource: string, opts: ProjectsLocationsRestorePlansRestoresVolumeRestoresGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the VolumeRestores for a given Restore.
   *
   * @param parent Required. The Restore that contains the VolumeRestores to list. Format: `projects/*\/locations/*\/restorePlans/*\/restores/*`
   */
  async projectsLocationsRestorePlansRestoresVolumeRestoresList(parent: string, opts: ProjectsLocationsRestorePlansRestoresVolumeRestoresListOptions = {}): Promise<ListVolumeRestoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/volumeRestores`);
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
    return data as ListVolumeRestoresResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresVolumeRestoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansRestoresVolumeRestoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRestorePlansTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * Represents a request to perform a single point-in-time capture of some
 * portion of the state of a GKE cluster, the record of the backup operation
 * itself, and an anchor for the underlying artifacts that comprise the Backup
 * (the config backup and VolumeBackups). Next id: 28
 */
export interface Backup {
  /**
   * Output only. If True, all namespaces were included in the Backup.
   */
  readonly allNamespaces?: boolean;
  /**
   * Output only. Information about the GKE cluster from which this Backup was
   * created.
   */
  readonly clusterMetadata?: ClusterMetadata;
  /**
   * Output only. Completion time of the Backup
   */
  readonly completeTime?: Date;
  /**
   * Output only. The size of the config backup in bytes.
   */
  readonly configBackupSizeBytes?: bigint;
  /**
   * Output only. Whether or not the Backup contains Kubernetes Secrets.
   * Controlled by the parent BackupPlan's include_secrets value.
   */
  readonly containsSecrets?: boolean;
  /**
   * Output only. Whether or not the Backup contains volume data. Controlled by
   * the parent BackupPlan's include_volume_data value.
   */
  readonly containsVolumeData?: boolean;
  /**
   * Output only. The timestamp when this Backup resource was created.
   */
  readonly createTime?: Date;
  /**
   * Minimum age for this Backup (in days). If this field is set to a non-zero
   * value, the Backup will be "locked" against deletion (either manual or
   * automatic deletion) for the number of days provided (measured from the
   * creation time of the Backup). MUST be an integer value between 0-90
   * (inclusive). Defaults to parent BackupPlan's backup_delete_lock_days
   * setting and may only be increased (either at creation time or in a
   * subsequent update).
   */
  deleteLockDays?: number;
  /**
   * Output only. The time at which an existing delete lock will expire for
   * this backup (calculated from create_time + delete_lock_days).
   */
  readonly deleteLockExpireTime?: Date;
  /**
   * User specified descriptive string for this Backup.
   */
  description?: string;
  /**
   * Output only. The customer managed encryption key that was used to encrypt
   * the Backup's artifacts. Inherited from the parent BackupPlan's
   * encryption_key value.
   */
  readonly encryptionKey?: EncryptionKey;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a backup from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform backup updates in order to avoid race
   * conditions: An `etag` is returned in the response to `GetBackup`, and
   * systems are expected to put that etag in the request to `UpdateBackup` or
   * `DeleteBackup` to ensure that their change will be applied to the same
   * version of the resource.
   */
  readonly etag?: string;
  /**
   * A set of custom labels supplied by user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. This flag indicates whether this Backup resource was created
   * manually by a user or via a schedule in the BackupPlan. A value of True
   * means that the Backup was created manually.
   */
  readonly manual?: boolean;
  /**
   * Output only. The fully qualified name of the Backup.
   * `projects/*\/locations/*\/backupPlans/*\/backups/*`
   */
  readonly name?: string;
  /**
   * Output only. The total number of Kubernetes Pods contained in the Backup.
   */
  readonly podCount?: number;
  /**
   * Output only. The total number of Kubernetes resources included in the
   * Backup.
   */
  readonly resourceCount?: number;
  /**
   * The age (in days) after which this Backup will be automatically deleted.
   * Must be an integer value >= 0: - If 0, no automatic deletion will occur for
   * this Backup. - If not 0, this must be >= delete_lock_days and <= 365. Once
   * a Backup is created, this value may only be increased. Defaults to the
   * parent BackupPlan's backup_retain_days value.
   */
  retainDays?: number;
  /**
   * Output only. The time at which this Backup will be automatically deleted
   * (calculated from create_time + retain_days).
   */
  readonly retainExpireTime?: Date;
  /**
   * Output only. If set, the list of ProtectedApplications whose resources
   * were included in the Backup.
   */
  readonly selectedApplications?: NamespacedNames;
  /**
   * Output only. If set, the list of namespaces that were included in the
   * Backup.
   */
  readonly selectedNamespaces?: Namespaces;
  /**
   * Output only. The total size of the Backup in bytes = config backup size +
   * sum(volume backup sizes)
   */
  readonly sizeBytes?: bigint;
  /**
   * Output only. Current state of the Backup
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "DELETING";
  /**
   * Output only. Human-readable description of why the backup is in the
   * current `state`.
   */
  readonly stateReason?: string;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID4](https://en.wikipedia.org/wiki/Universally_unique_identifier)
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this Backup resource was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The total number of volume backups contained in the Backup.
   */
  readonly volumeCount?: number;
}

/**
 * BackupConfig defines the configuration of Backups created via this
 * BackupPlan.
 */
export interface BackupConfig {
  /**
   * If True, include all namespaced resources
   */
  allNamespaces?: boolean;
  /**
   * This defines a customer managed encryption key that will be used to
   * encrypt the "config" portion (the Kubernetes resources) of Backups created
   * via this plan. Default (empty): Config backup artifacts will not be
   * encrypted.
   */
  encryptionKey?: EncryptionKey;
  /**
   * This flag specifies whether Kubernetes Secret resources should be included
   * when they fall into the scope of Backups. Default: False
   */
  includeSecrets?: boolean;
  /**
   * This flag specifies whether volume data should be backed up when PVCs are
   * included in the scope of a Backup. Default: False
   */
  includeVolumeData?: boolean;
  /**
   * If set, include just the resources referenced by the listed
   * ProtectedApplications.
   */
  selectedApplications?: NamespacedNames;
  /**
   * If set, include just the resources in the listed namespaces.
   */
  selectedNamespaces?: Namespaces;
}

/**
 * Defines the configuration and scheduling for a "line" of Backups.
 */
export interface BackupPlan {
  /**
   * Defines the configuration of Backups created via this BackupPlan.
   */
  backupConfig?: BackupConfig;
  /**
   * Defines a schedule for automatic Backup creation via this BackupPlan.
   */
  backupSchedule?: Schedule;
  /**
   * Required. Immutable. The source cluster from which Backups will be created
   * via this BackupPlan. Valid formats: - `projects/*\/locations/*\/clusters/*`
   * - `projects/*\/zones/*\/clusters/*`
   */
  cluster?: string;
  /**
   * Output only. The timestamp when this BackupPlan resource was created.
   */
  readonly createTime?: Date;
  /**
   * This flag indicates whether this BackupPlan has been deactivated. Setting
   * this field to True locks the BackupPlan such that no further updates will
   * be allowed (except deletes), including the deactivated field itself. It
   * also prevents any new Backups from being created via this BackupPlan
   * (including scheduled Backups). Default: False
   */
  deactivated?: boolean;
  /**
   * User specified descriptive string for this BackupPlan.
   */
  description?: string;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a backup plan from overwriting each
   * other. It is strongly suggested that systems make use of the 'etag' in the
   * read-modify-write cycle to perform BackupPlan updates in order to avoid
   * race conditions: An `etag` is returned in the response to `GetBackupPlan`,
   * and systems are expected to put that etag in the request to
   * `UpdateBackupPlan` or `DeleteBackupPlan` to ensure that their change will
   * be applied to the same version of the resource.
   */
  readonly etag?: string;
  /**
   * A set of custom labels supplied by user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The full name of the BackupPlan resource. Format:
   * `projects/*\/locations/*\/backupPlans/*`
   */
  readonly name?: string;
  /**
   * Output only. The number of Kubernetes Pods backed up in the last
   * successful Backup created via this BackupPlan.
   */
  readonly protectedPodCount?: number;
  /**
   * RetentionPolicy governs lifecycle of Backups created under this plan.
   */
  retentionPolicy?: RetentionPolicy;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this BackupPlan resource was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * Information about the GKE cluster from which this Backup was created.
 */
export interface ClusterMetadata {
  /**
   * Anthos version
   */
  anthosVersion?: string;
  /**
   * A list of the Backup for GKE CRD versions found in the cluster.
   */
  backupCrdVersions?: {
    [key: string]: string
  };
  /**
   * The source cluster from which this Backup was created. Valid formats: -
   * `projects/*\/locations/*\/clusters/*` - `projects/*\/zones/*\/clusters/*`
   * This is inherited from the parent BackupPlan's cluster field.
   */
  cluster?: string;
  /**
   * GKE version
   */
  gkeVersion?: string;
  /**
   * The Kubernetes server version of the source cluster.
   */
  k8sVersion?: string;
}

/**
 * Defines the scope of cluster-scoped resources to restore. Some group kinds
 * are not reasonable choices for a restore, and will cause an error if selected
 * here. Any scope selection that would restore "all valid" resources
 * automatically excludes these group kinds. - gkebackup.gke.io/BackupJob -
 * gkebackup.gke.io/RestoreJob - metrics.k8s.io/NodeMetrics -
 * migration.k8s.io/StorageState - migration.k8s.io/StorageVersionMigration -
 * Node - snapshot.storage.k8s.io/VolumeSnapshotContent - storage.k8s.io/CSINode
 * Some group kinds are driven by restore configuration elsewhere, and will
 * cause an error if selected here. - Namespace - PersistentVolume
 */
export interface ClusterResourceRestoreScope {
  /**
   * A list of cluster-scoped resource group kinds to restore from the backup.
   * If specified, only the selected resources will be restored. Mutually
   * exclusive to any other field in the message.
   */
  selectedGroupKinds?: GroupKind[];
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
 * Defined a customer managed encryption key that will be used to encrypt
 * Backup artifacts.
 */
export interface EncryptionKey {
  /**
   * Google Cloud KMS encryption key. Format:
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`
   */
  gcpKmsEncryptionKey?: string;
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface Expr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
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
  error?: GoogleRpcStatus;
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
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
 * This is a direct map to the Kubernetes GroupKind type
 * [GroupKind](https://godoc.org/k8s.io/apimachinery/pkg/runtime/schema#GroupKind)
 * and is used for identifying specific "types" of resources to restore.
 */
export interface GroupKind {
  /**
   * API group string of a Kubernetes resource, e.g. "apiextensions.k8s.io",
   * "storage.k8s.io", etc. Note: use empty string for core API group
   */
  resourceGroup?: string;
  /**
   * Kind of a Kubernetes resource, e.g. "CustomResourceDefinition",
   * "StorageClass", etc.
   */
  resourceKind?: string;
}

/**
 * Response message for ListBackupPlans.
 */
export interface ListBackupPlansResponse {
  /**
   * The list of BackupPlans matching the given criteria.
   */
  backupPlans?: BackupPlan[];
  /**
   * A token which may be sent as page_token in a subsequent `ListBackupPlans`
   * call to retrieve the next page of results. If this field is omitted or
   * empty, then there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for ListBackups.
 */
export interface ListBackupsResponse {
  /**
   * The list of Backups matching the given criteria.
   */
  backups?: Backup[];
  /**
   * A token which may be sent as page_token in a subsequent `ListBackups` call
   * to retrieve the next page of results. If this field is omitted or empty,
   * then there are no more results to return.
   */
  nextPageToken?: string;
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
 * Response message for ListRestorePlans.
 */
export interface ListRestorePlansResponse {
  /**
   * A token which may be sent as page_token in a subsequent `ListRestorePlans`
   * call to retrieve the next page of results. If this field is omitted or
   * empty, then there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * The list of RestorePlans matching the given criteria.
   */
  restorePlans?: RestorePlan[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for ListRestores.
 */
export interface ListRestoresResponse {
  /**
   * A token which may be sent as page_token in a subsequent `ListRestores`
   * call to retrieve the next page of results. If this field is omitted or
   * empty, then there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * The list of Restores matching the given criteria.
   */
  restores?: Restore[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for ListVolumeBackups.
 */
export interface ListVolumeBackupsResponse {
  /**
   * A token which may be sent as page_token in a subsequent
   * `ListVolumeBackups` call to retrieve the next page of results. If this
   * field is omitted or empty, then there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * The list of VolumeBackups matching the given criteria.
   */
  volumeBackups?: VolumeBackup[];
}

/**
 * Response message for ListVolumeRestores.
 */
export interface ListVolumeRestoresResponse {
  /**
   * A token which may be sent as page_token in a subsequent
   * `ListVolumeRestores` call to retrieve the next page of results. If this
   * field is omitted or empty, then there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * The list of VolumeRestores matching the given criteria.
   */
  volumeRestores?: VolumeRestore[];
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
 * A reference to a namespaced resource in Kubernetes.
 */
export interface NamespacedName {
  /**
   * The name of the Kubernetes resource.
   */
  name?: string;
  /**
   * The Namespace of the Kubernetes resource.
   */
  namespace?: string;
}

/**
 * A list of namespaced Kubernetes resources.
 */
export interface NamespacedNames {
  /**
   * A list of namespaced Kubernetes resources.
   */
  namespacedNames?: NamespacedName[];
}

/**
 * A list of Kubernetes Namespaces
 */
export interface Namespaces {
  /**
   * A list of Kubernetes Namespaces
   */
  namespaces?: string[];
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
   * operation. Operations that have successfully been cancelled have
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
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version?: number;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansBackupsCreate.
 */
export interface ProjectsLocationsBackupPlansBackupsCreateOptions {
  /**
   * The client-provided short name for the Backup resource. This name must: -
   * be between 1 and 63 characters long (inclusive) - consist of only
   * lower-case ASCII letters, numbers, and dashes - start with a lower-case
   * letter - end with a lower-case letter or number - be unique within the set
   * of Backups in this BackupPlan
   */
  backupId?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansBackupsDelete.
 */
export interface ProjectsLocationsBackupPlansBackupsDeleteOptions {
  /**
   * If provided, this value must match the current value of the target
   * Backup's etag field or the request is rejected.
   */
  etag?: string;
  /**
   * If set to true, any VolumeBackups below this Backup will also be deleted.
   * Otherwise, the request will only succeed if the Backup has no
   * VolumeBackups.
   */
  force?: boolean;
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsBackupPlansBackupsGetIamPolicy.
 */
export interface ProjectsLocationsBackupPlansBackupsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansBackupsList.
 */
export interface ProjectsLocationsBackupPlansBackupsListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListBackups` call.
   * Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to `ListBackups`
   * must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansBackupsPatch.
 */
export interface ProjectsLocationsBackupPlansBackupsPatchOptions {
  /**
   * This is used to specify the fields to be overwritten in the Backup
   * targeted for update. The values for each of these updated fields will be
   * taken from the `backup_plan` provided with this request. Field names are
   * relative to the root of the resource. If no `update_mask` is provided, all
   * fields in `backup` will be written to the target Backup resource. Note that
   * OUTPUT_ONLY and IMMUTABLE fields in `backup` are ignored and are not used
   * to update the target Backup.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBackupPlansBackupsPatchOptions(data: any): ProjectsLocationsBackupPlansBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBackupPlansBackupsPatchOptions(data: any): ProjectsLocationsBackupPlansBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsBackupPlansBackupsVolumeBackupsGetIamPolicy.
 */
export interface ProjectsLocationsBackupPlansBackupsVolumeBackupsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsBackupPlansBackupsVolumeBackupsList.
 */
export interface ProjectsLocationsBackupPlansBackupsVolumeBackupsListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListVolumeBackups`
   * call. Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to
   * `ListVolumeBackups` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansCreate.
 */
export interface ProjectsLocationsBackupPlansCreateOptions {
  /**
   * Required. The client-provided short name for the BackupPlan resource. This
   * name must: - be between 1 and 63 characters long (inclusive) - consist of
   * only lower-case ASCII letters, numbers, and dashes - start with a
   * lower-case letter - end with a lower-case letter or number - be unique
   * within the set of BackupPlans in this location
   */
  backupPlanId?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansDelete.
 */
export interface ProjectsLocationsBackupPlansDeleteOptions {
  /**
   * If provided, this value must match the current value of the target
   * BackupPlan's etag field or the request is rejected.
   */
  etag?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansGetIamPolicy.
 */
export interface ProjectsLocationsBackupPlansGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansList.
 */
export interface ProjectsLocationsBackupPlansListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListBackupPlans`
   * call. Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to
   * `ListBackupPlans` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsBackupPlansPatch.
 */
export interface ProjectsLocationsBackupPlansPatchOptions {
  /**
   * This is used to specify the fields to be overwritten in the BackupPlan
   * targeted for update. The values for each of these updated fields will be
   * taken from the `backup_plan` provided with this request. Field names are
   * relative to the root of the resource (e.g., `description`,
   * `backup_config.include_volume_data`, etc.) If no `update_mask` is provided,
   * all fields in `backup_plan` will be written to the target BackupPlan
   * resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup_plan` are
   * ignored and are not used to update the target BackupPlan.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBackupPlansPatchOptions(data: any): ProjectsLocationsBackupPlansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBackupPlansPatchOptions(data: any): ProjectsLocationsBackupPlansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for GKEBackup#projectsLocationsList.
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
 * Additional options for GKEBackup#projectsLocationsOperationsList.
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
 * Additional options for GKEBackup#projectsLocationsRestorePlansCreate.
 */
export interface ProjectsLocationsRestorePlansCreateOptions {
  /**
   * Required. The client-provided short name for the RestorePlan resource.
   * This name must: - be between 1 and 63 characters long (inclusive) - consist
   * of only lower-case ASCII letters, numbers, and dashes - start with a
   * lower-case letter - end with a lower-case letter or number - be unique
   * within the set of RestorePlans in this location
   */
  restorePlanId?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansDelete.
 */
export interface ProjectsLocationsRestorePlansDeleteOptions {
  /**
   * If provided, this value must match the current value of the target
   * RestorePlan's etag field or the request is rejected.
   */
  etag?: string;
  /**
   * If set to true, any Restores below this RestorePlan will also be deleted.
   * Otherwise, the request will only succeed if the RestorePlan has no
   * Restores.
   */
  force?: boolean;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansGetIamPolicy.
 */
export interface ProjectsLocationsRestorePlansGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansList.
 */
export interface ProjectsLocationsRestorePlansListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListRestorePlans`
   * call. Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to
   * `ListRestorePlans` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansPatch.
 */
export interface ProjectsLocationsRestorePlansPatchOptions {
  /**
   * This is used to specify the fields to be overwritten in the RestorePlan
   * targeted for update. The values for each of these updated fields will be
   * taken from the `restore_plan` provided with this request. Field names are
   * relative to the root of the resource. If no `update_mask` is provided, all
   * fields in `restore_plan` will be written to the target RestorePlan
   * resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore_plan` are
   * ignored and are not used to update the target RestorePlan.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRestorePlansPatchOptions(data: any): ProjectsLocationsRestorePlansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRestorePlansPatchOptions(data: any): ProjectsLocationsRestorePlansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsRestorePlansRestoresCreate.
 */
export interface ProjectsLocationsRestorePlansRestoresCreateOptions {
  /**
   * Required. The client-provided short name for the Restore resource. This
   * name must: - be between 1 and 63 characters long (inclusive) - consist of
   * only lower-case ASCII letters, numbers, and dashes - start with a
   * lower-case letter - end with a lower-case letter or number - be unique
   * within the set of Restores in this RestorePlan.
   */
  restoreId?: string;
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsRestorePlansRestoresDelete.
 */
export interface ProjectsLocationsRestorePlansRestoresDeleteOptions {
  /**
   * If provided, this value must match the current value of the target
   * Restore's etag field or the request is rejected.
   */
  etag?: string;
  /**
   * If set to true, any VolumeRestores below this restore will also be
   * deleted. Otherwise, the request will only succeed if the restore has no
   * VolumeRestores.
   */
  force?: boolean;
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsRestorePlansRestoresGetIamPolicy.
 */
export interface ProjectsLocationsRestorePlansRestoresGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansRestoresList.
 */
export interface ProjectsLocationsRestorePlansRestoresListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListRestores` call.
   * Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to `ListRestores`
   * must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEBackup#projectsLocationsRestorePlansRestoresPatch.
 */
export interface ProjectsLocationsRestorePlansRestoresPatchOptions {
  /**
   * This is used to specify the fields to be overwritten in the Restore
   * targeted for update. The values for each of these updated fields will be
   * taken from the `restore` provided with this request. Field names are
   * relative to the root of the resource. If no `update_mask` is provided, all
   * fields in `restore` will be written to the target Restore resource. Note
   * that OUTPUT_ONLY and IMMUTABLE fields in `restore` are ignored and are not
   * used to update the target Restore.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRestorePlansRestoresPatchOptions(data: any): ProjectsLocationsRestorePlansRestoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRestorePlansRestoresPatchOptions(data: any): ProjectsLocationsRestorePlansRestoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsRestorePlansRestoresVolumeRestoresGetIamPolicy.
 */
export interface ProjectsLocationsRestorePlansRestoresVolumeRestoresGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for
 * GKEBackup#projectsLocationsRestorePlansRestoresVolumeRestoresList.
 */
export interface ProjectsLocationsRestorePlansRestoresVolumeRestoresListOptions {
  /**
   * Field match expression used to filter the results.
   */
  filter?: string;
  /**
   * Field by which to sort the results.
   */
  orderBy?: string;
  /**
   * The target number of results to return in a single response. If not
   * specified, a default value will be chosen by the service. Note that the
   * response may inclue a partial list and a caller should only rely on the
   * response's next_page_token to determine if there are more instances left to
   * be queried.
   */
  pageSize?: number;
  /**
   * The value of next_page_token received from a previous `ListVolumeRestores`
   * call. Provide this to retrieve the subsequent page in a multi-page list of
   * results. When paginating, all other parameters provided to
   * `ListVolumeRestores` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Represents both a request to Restore some portion of a Backup into a target
 * GKE cluster and a record of the restore operation itself. Next id: 18
 */
export interface Restore {
  /**
   * Required. Immutable. A reference to the Backup used as the source from
   * which this Restore will restore. Note that this Backup must be a
   * sub-resource of the RestorePlan's backup_plan. Format:
   * `projects/*\/locations/*\/backupPlans/*\/backups/*`.
   */
  backup?: string;
  /**
   * Output only. The target cluster into which this Restore will restore data.
   * Valid formats: - `projects/*\/locations/*\/clusters/*` -
   * `projects/*\/zones/*\/clusters/*` Inherited from parent RestorePlan's
   * cluster value.
   */
  readonly cluster?: string;
  /**
   * Output only. Timestamp of when the restore operation completed.
   */
  readonly completeTime?: Date;
  /**
   * Output only. The timestamp when this Restore resource was created.
   */
  readonly createTime?: Date;
  /**
   * User specified descriptive string for this Restore.
   */
  description?: string;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a restore from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform restore updates in order to avoid race
   * conditions: An `etag` is returned in the response to `GetRestore`, and
   * systems are expected to put that etag in the request to `UpdateRestore` or
   * `DeleteRestore` to ensure that their change will be applied to the same
   * version of the resource.
   */
  readonly etag?: string;
  /**
   * A set of custom labels supplied by user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The full name of the Restore resource. Format:
   * `projects/*\/locations/*\/restorePlans/*\/restores/*`
   */
  readonly name?: string;
  /**
   * Output only. Number of resources excluded during the restore execution.
   */
  readonly resourcesExcludedCount?: number;
  /**
   * Output only. Number of resources that failed to be restored during the
   * restore execution.
   */
  readonly resourcesFailedCount?: number;
  /**
   * Output only. Number of resources restored during the restore execution.
   */
  readonly resourcesRestoredCount?: number;
  /**
   * Output only. Configuration of the Restore. Inherited from parent
   * RestorePlan's restore_config.
   */
  readonly restoreConfig?: RestoreConfig;
  /**
   * Output only. The current state of the Restore.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "DELETING";
  /**
   * Output only. Human-readable description of why the Restore is in its
   * current state.
   */
  readonly stateReason?: string;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this Restore resource was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. Number of volumes restored during the restore execution.
   */
  readonly volumesRestoredCount?: number;
}

/**
 * Configuration of a restore. Next id: 12
 */
export interface RestoreConfig {
  /**
   * Restore all namespaced resources in the Backup if set to "True".
   * Specifying this field to "False" is an error.
   */
  allNamespaces?: boolean;
  /**
   * Defines the behavior for handling the situation where cluster-scoped
   * resources being restored already exist in the target cluster. This MUST be
   * set to a value other than CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED if
   * cluster_resource_restore_scope is not empty.
   */
  clusterResourceConflictPolicy?:  | "CLUSTER_RESOURCE_CONFLICT_POLICY_UNSPECIFIED" | "USE_EXISTING_VERSION" | "USE_BACKUP_VERSION";
  /**
   * Identifies the cluster-scoped resources to restore from the Backup. Not
   * specifying it means NO cluster resource will be restored.
   */
  clusterResourceRestoreScope?: ClusterResourceRestoreScope;
  /**
   * Defines the behavior for handling the situation where sets of namespaced
   * resources being restored already exist in the target cluster. This MUST be
   * set to a value other than NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED.
   */
  namespacedResourceRestoreMode?:  | "NAMESPACED_RESOURCE_RESTORE_MODE_UNSPECIFIED" | "DELETE_AND_RESTORE" | "FAIL_ON_CONFLICT";
  /**
   * A list of selected ProtectedApplications to restore. The listed
   * ProtectedApplications and all the resources to which they refer will be
   * restored.
   */
  selectedApplications?: NamespacedNames;
  /**
   * A list of selected Namespaces to restore from the Backup. The listed
   * Namespaces and all resources contained in them will be restored.
   */
  selectedNamespaces?: Namespaces;
  /**
   * A list of transformation rules to be applied against Kubernetes resources
   * as they are selected for restoration from a Backup. Rules are executed in
   * order defined - this order matters, as changes made by a rule may impact
   * the filtering logic of subsequent rules. An empty list means no
   * substitution will occur.
   */
  substitutionRules?: SubstitutionRule[];
  /**
   * Specifies the mechanism to be used to restore volume data. Default:
   * VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED (will be treated as
   * NO_VOLUME_DATA_RESTORATION).
   */
  volumeDataRestorePolicy?:  | "VOLUME_DATA_RESTORE_POLICY_UNSPECIFIED" | "RESTORE_VOLUME_DATA_FROM_BACKUP" | "REUSE_VOLUME_HANDLE_FROM_BACKUP" | "NO_VOLUME_DATA_RESTORATION";
}

/**
 * The configuration of a potential series of Restore operations to be
 * performed against Backups belong to a particular BackupPlan. Next id: 13
 */
export interface RestorePlan {
  /**
   * Required. Immutable. A reference to the BackupPlan from which Backups may
   * be used as the source for Restores created via this RestorePlan. Format:
   * `projects/*\/locations/*\/backupPlans/*`.
   */
  backupPlan?: string;
  /**
   * Required. Immutable. The target cluster into which Restores created via
   * this RestorePlan will restore data. NOTE: the cluster's region must be the
   * same as the RestorePlan. Valid formats: -
   * `projects/*\/locations/*\/clusters/*` - `projects/*\/zones/*\/clusters/*`
   */
  cluster?: string;
  /**
   * Output only. The timestamp when this RestorePlan resource was created.
   */
  readonly createTime?: Date;
  /**
   * User specified descriptive string for this RestorePlan.
   */
  description?: string;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a restore from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform restore updates in order to avoid race
   * conditions: An `etag` is returned in the response to `GetRestorePlan`, and
   * systems are expected to put that etag in the request to `UpdateRestorePlan`
   * or `DeleteRestorePlan` to ensure that their change will be applied to the
   * same version of the resource.
   */
  readonly etag?: string;
  /**
   * A set of custom labels supplied by user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The full name of the RestorePlan resource. Format:
   * `projects/*\/locations/*\/restorePlans/*`.
   */
  readonly name?: string;
  /**
   * Required. Configuration of Restores created via this RestorePlan.
   */
  restoreConfig?: RestoreConfig;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this RestorePlan resource was last
   * updated.
   */
  readonly updateTime?: Date;
}

/**
 * RetentionPolicy defines a Backup retention policy for a BackupPlan.
 */
export interface RetentionPolicy {
  /**
   * Minimum age for Backups created via this BackupPlan (in days). This field
   * MUST be an integer value between 0-90 (inclusive). A Backup created under
   * this BackupPlan will NOT be deletable until it reaches Backup's
   * (create_time + backup_delete_lock_days). Updating this field of a
   * BackupPlan does NOT affect existing Backups under it. Backups created AFTER
   * a successful update will inherit the new value. Default: 0 (no delete
   * blocking)
   */
  backupDeleteLockDays?: number;
  /**
   * The default maximum age of a Backup created via this BackupPlan. This
   * field MUST be an integer value >= 0 and <= 365. If specified, a Backup
   * created under this BackupPlan will be automatically deleted after its age
   * reaches (create_time + backup_retain_days). If not specified, Backups
   * created under this BackupPlan will NOT be subject to automatic deletion.
   * Updating this field does NOT affect existing Backups under it. Backups
   * created AFTER a successful update will automatically pick up the new value.
   * NOTE: backup_retain_days must be >= backup_delete_lock_days. If
   * cron_schedule is defined, then this must be <= 360 * the creation interval.
   * Default: 0 (no automatic deletion)
   */
  backupRetainDays?: number;
  /**
   * This flag denotes whether the retention policy of this BackupPlan is
   * locked. If set to True, no further update is allowed on this policy,
   * including the `locked` field itself. Default: False
   */
  locked?: boolean;
}

/**
 * Schedule defines scheduling parameters for automatically creating Backups
 * via this BackupPlan.
 */
export interface Schedule {
  /**
   * A standard [cron](https://wikipedia.com/wiki/cron) string that defines a
   * repeating schedule for creating Backups via this BackupPlan. If this is
   * defined, then backup_retain_days must also be defined. Default (empty): no
   * automatic backup creation will occur.
   */
  cronSchedule?: string;
  /**
   * This flag denotes whether automatic Backup creation is paused for this
   * BackupPlan. Default: False
   */
  paused?: boolean;
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A transformation rule to be applied against Kubernetes resources as they are
 * selected for restoration from a Backup. A rule contains both filtering logic
 * (which resources are subject to substitution) and substitution logic.
 */
export interface SubstitutionRule {
  /**
   * This is the new value to set for any fields that pass the filtering and
   * selection criteria. To remove a value from a Kubernetes resource, either
   * leave this field unspecified, or set it to the empty string ("").
   */
  newValue?: string;
  /**
   * (Filtering parameter) This is a [regular expression]
   * (https://en.wikipedia.org/wiki/Regular_expression) that is compared against
   * the fields matched by the target_json_path expression (and must also have
   * passed the previous filters). Substitution will not be performed against
   * fields whose value does not match this expression. If this field is NOT
   * specified, then ALL fields matched by the target_json_path expression will
   * undergo substitution. Note that an empty (e.g., "", rather than
   * unspecified) value for this field will only match empty fields.
   */
  originalValuePattern?: string;
  /**
   * (Filtering parameter) Any resource subject to substitution must belong to
   * one of the listed "types". If this field is not provided, no type filtering
   * will be performed (all resources of all types matching previous filtering
   * parameters will be candidates for substitution).
   */
  targetGroupKinds?: GroupKind[];
  /**
   * Required. This is a [JSONPath]
   * (https://kubernetes.io/docs/reference/kubectl/jsonpath/) expression that
   * matches specific fields of candidate resources and it operates as both a
   * filtering parameter (resources that are not matched with this expression
   * will not be candidates for substitution) as well as a field identifier
   * (identifies exactly which fields out of the candidate resources will be
   * modified).
   */
  targetJsonPath?: string;
  /**
   * (Filtering parameter) Any resource subject to substitution must be
   * contained within one of the listed Kubernetes Namespace in the Backup. If
   * this field is not provided, no namespace filtering will be performed (all
   * resources in all Namespaces, including all cluster-scoped resources, will
   * be candidates for substitution). To mix cluster-scoped and namespaced
   * resources in the same rule, use an empty string ("") as one of the target
   * namespaces.
   */
  targetNamespaces?: string[];
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * Represents the backup of a specific persistent volume as a component of a
 * Backup - both the record of the operation and a pointer to the underlying
 * storage-specific artifacts. Next id: 14
 */
export interface VolumeBackup {
  /**
   * Output only. The timestamp when the associated underlying volume backup
   * operation completed.
   */
  readonly completeTime?: Date;
  /**
   * Output only. The timestamp when this VolumeBackup resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The minimum size of the disk to which this VolumeBackup can
   * be restored.
   */
  readonly diskSizeBytes?: bigint;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a volume backup from overwriting each
   * other. It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform volume backup updates in order to avoid
   * race conditions.
   */
  readonly etag?: string;
  /**
   * Output only. The format used for the volume backup.
   */
  readonly format?:  | "VOLUME_BACKUP_FORMAT_UNSPECIFIED" | "GCE_PERSISTENT_DISK";
  /**
   * Output only. The full name of the VolumeBackup resource. Format:
   * `projects/*\/locations/*\/backupPlans/*\/backups/*\/volumeBackups/*`.
   */
  readonly name?: string;
  /**
   * Output only. A reference to the source Kubernetes PVC from which this
   * VolumeBackup was created.
   */
  readonly sourcePvc?: NamespacedName;
  /**
   * Output only. The current state of this VolumeBackup.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "SNAPSHOTTING" | "UPLOADING" | "SUCCEEDED" | "FAILED" | "DELETING";
  /**
   * Output only. A human readable message explaining why the VolumeBackup is
   * in its current state.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The aggregate size of the underlying artifacts associated
   * with this VolumeBackup in the backup storage. This may change over time
   * when multiple backups of the same volume share the same backup storage
   * location. In particular, this is likely to increase in size when the
   * immediately preceding backup of the same volume is deleted.
   */
  readonly storageBytes?: bigint;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this VolumeBackup resource was last
   * updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. A storage system-specific opaque handle to the underlying
   * volume backup.
   */
  readonly volumeBackupHandle?: string;
}

/**
 * Represents the operation of restoring a volume from a VolumeBackup. Next id:
 * 13
 */
export interface VolumeRestore {
  /**
   * Output only. The timestamp when the associated underlying volume
   * restoration completed.
   */
  readonly completeTime?: Date;
  /**
   * Output only. The timestamp when this VolumeRestore resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of a volume restore from overwriting each
   * other. It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform volume restore updates in order to avoid
   * race conditions.
   */
  readonly etag?: string;
  /**
   * Output only. Full name of the VolumeRestore resource. Format:
   * `projects/*\/locations/*\/restorePlans/*\/restores/*\/volumeRestores/*`
   */
  readonly name?: string;
  /**
   * Output only. The current state of this VolumeRestore.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "RESTORING" | "SUCCEEDED" | "FAILED" | "DELETING";
  /**
   * Output only. A human readable message explaining why the VolumeRestore is
   * in its current state.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The reference to the target Kubernetes PVC to be restored.
   */
  readonly targetPvc?: NamespacedName;
  /**
   * Output only. Server generated global unique identifier of
   * [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) format.
   */
  readonly uid?: string;
  /**
   * Output only. The timestamp when this VolumeRestore resource was last
   * updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The full name of the VolumeBackup from which the volume will
   * be restored. Format:
   * `projects/*\/locations/*\/backupPlans/*\/backups/*\/volumeBackups/*`.
   */
  readonly volumeBackup?: string;
  /**
   * Output only. A storage system-specific opaque handler to the underlying
   * volume created for the target PVC from the volume backup.
   */
  readonly volumeHandle?: string;
  /**
   * Output only. The type of volume provisioned
   */
  readonly volumeType?:  | "VOLUME_TYPE_UNSPECIFIED" | "GCE_PERSISTENT_DISK";
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
