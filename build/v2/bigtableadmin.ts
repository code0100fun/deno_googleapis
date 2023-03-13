// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Bigtable Admin API Client for Deno
 * ========================================
 * 
 * Administer your Cloud Bigtable tables and instances.
 * 
 * Docs: https://cloud.google.com/bigtable/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Administer your Cloud Bigtable tables and instances.
 */
export class BigtableAdmin {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://bigtableadmin.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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
  async operationsCancel(name: string): Promise<Empty> {
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
  async operationsDelete(name: string): Promise<Empty> {
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
  async operationsGet(name: string): Promise<Operation> {
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
  async operationsProjectsOperationsList(name: string, opts: OperationsProjectsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
   * Creates an app profile within an instance.
   *
   * @param parent Required. The unique name of the instance in which to create the new app profile. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesAppProfilesCreate(parent: string, req: AppProfile, opts: ProjectsInstancesAppProfilesCreateOptions = {}): Promise<AppProfile> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/appProfiles`);
    if (opts.appProfileId !== undefined) {
      url.searchParams.append("appProfileId", String(opts.appProfileId));
    }
    if (opts.ignoreWarnings !== undefined) {
      url.searchParams.append("ignoreWarnings", String(opts.ignoreWarnings));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AppProfile;
  }

  /**
   * Deletes an app profile from an instance.
   *
   * @param name Required. The unique name of the app profile to be deleted. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`.
   */
  async projectsInstancesAppProfilesDelete(name: string, opts: ProjectsInstancesAppProfilesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.ignoreWarnings !== undefined) {
      url.searchParams.append("ignoreWarnings", String(opts.ignoreWarnings));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about an app profile.
   *
   * @param name Required. The unique name of the requested app profile. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`.
   */
  async projectsInstancesAppProfilesGet(name: string): Promise<AppProfile> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AppProfile;
  }

  /**
   * Lists information about app profiles in an instance.
   *
   * @param parent Required. The unique name of the instance for which a list of app profiles is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list AppProfiles for all Instances in a project, e.g., `projects/myproject/instances/-`.
   */
  async projectsInstancesAppProfilesList(parent: string, opts: ProjectsInstancesAppProfilesListOptions = {}): Promise<ListAppProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/appProfiles`);
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
    return data as ListAppProfilesResponse;
  }

  /**
   * Updates an app profile within an instance.
   *
   * @param name The unique name of the app profile. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`.
   */
  async projectsInstancesAppProfilesPatch(name: string, req: AppProfile, opts: ProjectsInstancesAppProfilesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsInstancesAppProfilesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.ignoreWarnings !== undefined) {
      url.searchParams.append("ignoreWarnings", String(opts.ignoreWarnings));
    }
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
   * Copy a Cloud Bigtable backup to a new backup in the destination cluster
   * located in the destination instance and project.
   *
   * @param parent Required. The name of the destination cluster that will contain the backup copy. The cluster must already exists. Values are of the form: `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersBackupsCopy(parent: string, req: CopyBackupRequest): Promise<Operation> {
    req = serializeCopyBackupRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/backups:copy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts creating a new Cloud Bigtable Backup. The returned backup
   * long-running operation can be used to track creation of the backup. The
   * metadata field type is CreateBackupMetadata. The response field type is
   * Backup, if successful. Cancelling the returned operation will stop the
   * creation and delete the backup.
   *
   * @param parent Required. This must be one of the clusters in the instance in which this table is located. The backup will be stored in this cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersBackupsCreate(parent: string, req: Backup, opts: ProjectsInstancesClustersBackupsCreateOptions = {}): Promise<Operation> {
    req = serializeBackup(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/backups`);
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
   * Deletes a pending or completed Cloud Bigtable backup.
   *
   * @param name Required. Name of the backup to delete. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`.
   */
  async projectsInstancesClustersBackupsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets metadata on a pending or completed Cloud Bigtable Backup.
   *
   * @param name Required. Name of the backup. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`.
   */
  async projectsInstancesClustersBackupsGet(name: string): Promise<Backup> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBackup(data);
  }

  /**
   * Gets the access control policy for a Table resource. Returns an empty
   * policy if the resource exists but does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesClustersBackupsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists Cloud Bigtable backups. Returns both completed and pending backups.
   *
   * @param parent Required. The cluster to list backups from. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. Use `{cluster} = '-'` to list backups for all clusters in an instance, e.g., `projects/{project}/instances/{instance}/clusters/-`.
   */
  async projectsInstancesClustersBackupsList(parent: string, opts: ProjectsInstancesClustersBackupsListOptions = {}): Promise<ListBackupsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/backups`);
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
    return deserializeListBackupsResponse(data);
  }

  /**
   * Updates a pending or completed Cloud Bigtable Backup.
   *
   * @param name A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/ backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50 characters in length. The backup is stored in the cluster identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersBackupsPatch(name: string, req: Backup, opts: ProjectsInstancesClustersBackupsPatchOptions = {}): Promise<Backup> {
    req = serializeBackup(req);
    opts = serializeProjectsInstancesClustersBackupsPatchOptions(opts);
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
    return deserializeBackup(data);
  }

  /**
   * Sets the access control policy on a Table resource. Replaces any existing
   * policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesClustersBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that the caller has on the specified table resource.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesClustersBackupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a cluster within an instance. Note that exactly one of
   * Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config
   * can be set. If serve_nodes is set to non-zero, then the cluster is manually
   * scaled. If cluster_config.cluster_autoscaling_config is non-empty, then
   * autoscaling is enabled.
   *
   * @param parent Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesClustersCreate(parent: string, req: Cluster, opts: ProjectsInstancesClustersCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/clusters`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
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
   * Deletes a cluster from an instance.
   *
   * @param name Required. The unique name of the cluster to be deleted. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about a cluster.
   *
   * @param name Required. The unique name of the requested cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersGet(name: string): Promise<Cluster> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Cluster;
  }

  /**
   * Lists hot tablets in a cluster, within the time range provided. Hot
   * tablets are ordered based on CPU usage.
   *
   * @param parent Required. The cluster name to list hot tablets. Value is in the following form: `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  async projectsInstancesClustersHotTabletsList(parent: string, opts: ProjectsInstancesClustersHotTabletsListOptions = {}): Promise<ListHotTabletsResponse> {
    opts = serializeProjectsInstancesClustersHotTabletsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/hotTablets`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListHotTabletsResponse;
  }

  /**
   * Lists information about clusters in an instance.
   *
   * @param parent Required. The unique name of the instance for which a list of clusters is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list Clusters for all Instances in a project, e.g., `projects/myproject/instances/-`.
   */
  async projectsInstancesClustersList(parent: string, opts: ProjectsInstancesClustersListOptions = {}): Promise<ListClustersResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/clusters`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListClustersResponse;
  }

  /**
   * Partially updates a cluster within a project. This method is the preferred
   * way to update a Cluster. To enable and update autoscaling, set
   * cluster_config.cluster_autoscaling_config. When autoscaling is enabled,
   * serve_nodes is treated as an OUTPUT_ONLY field, meaning that updates to it
   * are ignored. Note that an update cannot simultaneously set serve_nodes to
   * non-zero and cluster_config.cluster_autoscaling_config to non-empty, and
   * also specify both in the update_mask. To disable autoscaling, clear
   * cluster_config.cluster_autoscaling_config, and explicitly set a serve_node
   * count via the update_mask.
   *
   * @param name The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`.
   */
  async projectsInstancesClustersPartialUpdateCluster(name: string, req: Cluster, opts: ProjectsInstancesClustersPartialUpdateClusterOptions = {}): Promise<Operation> {
    opts = serializeProjectsInstancesClustersPartialUpdateClusterOptions(opts);
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
   * Updates a cluster within an instance. Note that UpdateCluster does not
   * support updating cluster_config.cluster_autoscaling_config. In order to
   * update it, you must use PartialUpdateCluster.
   *
   * @param name The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`.
   */
  async projectsInstancesClustersUpdate(name: string, req: Cluster): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Create an instance within a project. Note that exactly one of
   * Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config
   * can be set. If serve_nodes is set to non-zero, then the cluster is manually
   * scaled. If cluster_config.cluster_autoscaling_config is non-empty, then
   * autoscaling is enabled.
   *
   * @param parent Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`.
   */
  async projectsInstancesCreate(parent: string, req: CreateInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/instances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Delete an instance from a project.
   *
   * @param name Required. The unique name of the instance to be deleted. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about an instance.
   *
   * @param name Required. The unique name of the requested instance. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesGet(name: string): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Instance;
  }

  /**
   * Gets the access control policy for an instance resource. Returns an empty
   * policy if an instance exists but does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists information about instances in a project.
   *
   * @param parent Required. The unique name of the project for which a list of instances is requested. Values are of the form `projects/{project}`.
   */
  async projectsInstancesList(parent: string, opts: ProjectsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/instances`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListInstancesResponse;
  }

  /**
   * Partially updates an instance within a project. This method can modify all
   * fields of an Instance and is the preferred way to update an Instance.
   *
   * @param name The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.
   */
  async projectsInstancesPartialUpdateInstance(name: string, req: Instance, opts: ProjectsInstancesPartialUpdateInstanceOptions = {}): Promise<Operation> {
    opts = serializeProjectsInstancesPartialUpdateInstanceOptions(opts);
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
   * Sets the access control policy on an instance resource. Replaces any
   * existing policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Checks replication consistency based on a consistency token, that is, if
   * replication has caught up based on the conditions specified in the token
   * and the check request.
   *
   * @param name Required. The unique name of the Table for which to check replication consistency. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesCheckConsistency(name: string, req: CheckConsistencyRequest): Promise<CheckConsistencyResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:checkConsistency`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckConsistencyResponse;
  }

  /**
   * Creates a new table in the specified instance. The table can be created
   * with a full set of initial column families, specified in the request.
   *
   * @param parent Required. The unique name of the instance in which to create the table. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesTablesCreate(parent: string, req: CreateTableRequest): Promise<Table> {
    req = serializeCreateTableRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/tables`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTable(data);
  }

  /**
   * Permanently deletes a specified table and all of its data.
   *
   * @param name Required. The unique name of the table to be deleted. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Permanently drop/delete a row range from a specified table. The request
   * can specify whether to delete all rows in a table, or only those that match
   * a particular prefix.
   *
   * @param name Required. The unique name of the table on which to drop a range of rows. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesDropRowRange(name: string, req: DropRowRangeRequest): Promise<Empty> {
    req = serializeDropRowRangeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:dropRowRange`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Generates a consistency token for a Table, which can be used in
   * CheckConsistency to check whether mutations to the table that finished
   * before this call started have been replicated. The tokens will be available
   * for 90 days.
   *
   * @param name Required. The unique name of the Table for which to create a consistency token. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesGenerateConsistencyToken(name: string, req: GenerateConsistencyTokenRequest): Promise<GenerateConsistencyTokenResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:generateConsistencyToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateConsistencyTokenResponse;
  }

  /**
   * Gets metadata information about the specified table.
   *
   * @param name Required. The unique name of the requested table. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesGet(name: string, opts: ProjectsInstancesTablesGetOptions = {}): Promise<Table> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTable(data);
  }

  /**
   * Gets the access control policy for a Table resource. Returns an empty
   * policy if the resource exists but does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesTablesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all tables served from a specified instance.
   *
   * @param parent Required. The unique name of the instance for which tables should be listed. Values are of the form `projects/{project}/instances/{instance}`.
   */
  async projectsInstancesTablesList(parent: string, opts: ProjectsInstancesTablesListOptions = {}): Promise<ListTablesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/tables`);
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
    return deserializeListTablesResponse(data);
  }

  /**
   * Performs a series of column family modifications on the specified table.
   * Either all or none of the modifications will occur before this method
   * returns, but data requests received prior to that point may see a table
   * where only some modifications have taken effect.
   *
   * @param name Required. The unique name of the table whose families should be modified. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesModifyColumnFamilies(name: string, req: ModifyColumnFamiliesRequest): Promise<Table> {
    req = serializeModifyColumnFamiliesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:modifyColumnFamilies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTable(data);
  }

  /**
   * Updates a specified table.
   *
   * @param name The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`
   */
  async projectsInstancesTablesPatch(name: string, req: Table, opts: ProjectsInstancesTablesPatchOptions = {}): Promise<Operation> {
    req = serializeTable(req);
    opts = serializeProjectsInstancesTablesPatchOptions(opts);
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
   * Create a new table by restoring from a completed backup. The returned
   * table long-running operation can be used to track the progress of the
   * operation, and to cancel it. The metadata field type is
   * RestoreTableMetadata. The response type is Table, if successful.
   *
   * @param parent Required. The name of the instance in which to create the restored table. Values are of the form `projects//instances/`.
   */
  async projectsInstancesTablesRestore(parent: string, req: RestoreTableRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/tables:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the access control policy on a Table resource. Replaces any existing
   * policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesTablesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that the caller has on the specified table resource.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesTablesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Restores a specified table which was accidentally deleted.
   *
   * @param name Required. The unique name of the table to be restored. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`.
   */
  async projectsInstancesTablesUndelete(name: string, req: UndeleteTableRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Returns permissions that the caller has on the specified instance
   * resource.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsInstancesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Updates an instance within a project. This method updates only the display
   * name and type for an Instance. To update other Instance properties, such as
   * labels, use PartialUpdateInstance.
   *
   * @param name The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.
   */
  async projectsInstancesUpdate(name: string, req: Instance): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Instance;
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
}

/**
 * A configuration object describing how Cloud Bigtable should treat traffic
 * from a particular end user application.
 */
export interface AppProfile {
  /**
   * Long form description of the use case for this AppProfile.
   */
  description?: string;
  /**
   * Strongly validated etag for optimistic concurrency control. Preserve the
   * value returned from `GetAppProfile` when calling `UpdateAppProfile` to fail
   * the request if there has been a modification in the mean time. The
   * `update_mask` of the request need not include `etag` for this protection to
   * apply. See [Wikipedia](https://en.wikipedia.org/wiki/HTTP_ETag) and [RFC
   * 7232](https://tools.ietf.org/html/rfc7232#section-2.3) for more details.
   */
  etag?: string;
  /**
   * Use a multi-cluster routing policy.
   */
  multiClusterRoutingUseAny?: MultiClusterRoutingUseAny;
  /**
   * The unique name of the app profile. Values are of the form
   * `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`.
   */
  name?: string;
  /**
   * Use a single-cluster routing policy.
   */
  singleClusterRouting?: SingleClusterRouting;
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
 * Limits for the number of nodes a Cluster can autoscale up/down to.
 */
export interface AutoscalingLimits {
  /**
   * Required. Maximum number of nodes to scale up to.
   */
  maxServeNodes?: number;
  /**
   * Required. Minimum number of nodes to scale down to.
   */
  minServeNodes?: number;
}

/**
 * The Autoscaling targets for a Cluster. These determine the recommended
 * nodes.
 */
export interface AutoscalingTargets {
  /**
   * The cpu utilization that the Autoscaler should be trying to achieve. This
   * number is on a scale from 0 (no utilization) to 100 (total utilization),
   * and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT
   * error.
   */
  cpuUtilizationPercent?: number;
  /**
   * The storage utilization that the Autoscaler should be trying to achieve.
   * This number is limited between 2560 (2.5TiB) and 5120 (5TiB) for a SSD
   * cluster and between 8192 (8TiB) and 16384 (16TiB) for an HDD cluster,
   * otherwise it will return INVALID_ARGUMENT error. If this value is set to 0,
   * it will be treated as if it were set to the default value: 2560 for SSD,
   * 8192 for HDD.
   */
  storageUtilizationGibPerNode?: number;
}

/**
 * A backup of a Cloud Bigtable table.
 */
export interface Backup {
  /**
   * Output only. The encryption information for the backup.
   */
  readonly encryptionInfo?: EncryptionInfo;
  /**
   * Output only. `end_time` is the time that the backup was finished. The row
   * data in the backup will be no newer than this timestamp.
   */
  readonly endTime?: Date;
  /**
   * Required. The expiration time of the backup, with microseconds granularity
   * that must be at least 6 hours and at most 30 days from the time the request
   * is received. Once the `expire_time` has passed, Cloud Bigtable will delete
   * the backup and free the resources used by the backup.
   */
  expireTime?: Date;
  /**
   * A globally unique identifier for the backup which cannot be changed.
   * Values are of the form
   * `projects/{project}/instances/{instance}/clusters/{cluster}/
   * backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50
   * characters in length. The backup is stored in the cluster identified by the
   * prefix of the backup name of the form
   * `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  name?: string;
  /**
   * Output only. Size of the backup in bytes.
   */
  readonly sizeBytes?: bigint;
  /**
   * Output only. Name of the backup from which this backup was copied. If a
   * backup is not created by copying a backup, this field will be empty. Values
   * are of the form: projects//instances//backups/.
   */
  readonly sourceBackup?: string;
  /**
   * Required. Immutable. Name of the table from which this backup was created.
   * This needs to be in the same instance as the backup. Values are of the form
   * `projects/{project}/instances/{instance}/tables/{source_table}`.
   */
  sourceTable?: string;
  /**
   * Output only. `start_time` is the time that the backup was started (i.e.
   * approximately the time the CreateBackup request is received). The row data
   * in this backup will be no older than this timestamp.
   */
  readonly startTime?: Date;
  /**
   * Output only. The current state of the backup.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY";
}

function serializeBackup(data: any): Backup {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeBackup(data: any): Backup {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    sizeBytes: data["sizeBytes"] !== undefined ? BigInt(data["sizeBytes"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Information about a backup.
 */
export interface BackupInfo {
  /**
   * Output only. Name of the backup.
   */
  readonly backup?: string;
  /**
   * Output only. This time that the backup was finished. Row data in the
   * backup will be no newer than this timestamp.
   */
  readonly endTime?: Date;
  /**
   * Output only. Name of the backup from which this backup was copied. If a
   * backup is not created by copying a backup, this field will be empty. Values
   * are of the form: projects//instances//backups/.
   */
  readonly sourceBackup?: string;
  /**
   * Output only. Name of the table the backup was created from.
   */
  readonly sourceTable?: string;
  /**
   * Output only. The time that the backup was started. Row data in the backup
   * will be no older than this timestamp.
   */
  readonly startTime?: Date;
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
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
 */
export interface CheckConsistencyRequest {
  /**
   * Required. The token created using GenerateConsistencyToken for the Table.
   */
  consistencyToken?: string;
}

/**
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
 */
export interface CheckConsistencyResponse {
  /**
   * True only if the token is consistent. A token is consistent if replication
   * has caught up with the restrictions specified in the request.
   */
  consistent?: boolean;
}

/**
 * A resizable group of nodes in a particular cloud location, capable of
 * serving all Tables in the parent Instance.
 */
export interface Cluster {
  /**
   * Configuration for this cluster.
   */
  clusterConfig?: ClusterConfig;
  /**
   * Immutable. The type of storage used by this cluster to serve its parent
   * instance's tables, unless explicitly overridden.
   */
  defaultStorageType?:  | "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD";
  /**
   * Immutable. The encryption configuration for CMEK-protected clusters.
   */
  encryptionConfig?: EncryptionConfig;
  /**
   * Immutable. The location where this cluster's nodes and storage reside. For
   * best performance, clients should be located as close as possible to this
   * cluster. Currently only zones are supported, so values should be of the
   * form `projects/{project}/locations/{zone}`.
   */
  location?: string;
  /**
   * The unique name of the cluster. Values are of the form
   * `projects/{project}/instances/{instance}/clusters/a-z*`.
   */
  name?: string;
  /**
   * The number of nodes allocated to this cluster. More nodes enable higher
   * throughput and more consistent performance.
   */
  serveNodes?: number;
  /**
   * Output only. The current state of the cluster.
   */
  readonly state?:  | "STATE_NOT_KNOWN" | "READY" | "CREATING" | "RESIZING" | "DISABLED";
}

/**
 * Autoscaling config for a cluster.
 */
export interface ClusterAutoscalingConfig {
  /**
   * Required. Autoscaling limits for this cluster.
   */
  autoscalingLimits?: AutoscalingLimits;
  /**
   * Required. Autoscaling targets for this cluster.
   */
  autoscalingTargets?: AutoscalingTargets;
}

/**
 * Configuration for a cluster.
 */
export interface ClusterConfig {
  /**
   * Autoscaling configuration for this cluster.
   */
  clusterAutoscalingConfig?: ClusterAutoscalingConfig;
}

/**
 * The state of a table's data in a particular cluster.
 */
export interface ClusterState {
  /**
   * Output only. The encryption information for the table in this cluster. If
   * the encryption key protecting this resource is customer managed, then its
   * version can be rotated in Cloud Key Management Service (Cloud KMS). The
   * primary version of the key and its status will be reflected here when
   * changes propagate from Cloud KMS.
   */
  readonly encryptionInfo?: EncryptionInfo[];
  /**
   * Output only. The state of replication for the table in this cluster.
   */
  readonly replicationState?:  | "STATE_NOT_KNOWN" | "INITIALIZING" | "PLANNED_MAINTENANCE" | "UNPLANNED_MAINTENANCE" | "READY" | "READY_OPTIMIZING";
}

/**
 * A set of columns within a table which share a common configuration.
 */
export interface ColumnFamily {
  /**
   * Garbage collection rule specified as a protobuf. Must serialize to at most
   * 500 bytes. NOTE: Garbage collection executes opportunistically in the
   * background, and so it's possible for reads to return a cell even if it
   * matches the active GC expression for its family.
   */
  gcRule?: GcRule;
  /**
   * Only available with STATS_VIEW, this includes summary statistics about
   * column family contents. For statistics over an entire table, see TableStats
   * above.
   */
  stats?: ColumnFamilyStats;
}

function serializeColumnFamily(data: any): ColumnFamily {
  return {
    ...data,
    gcRule: data["gcRule"] !== undefined ? serializeGcRule(data["gcRule"]) : undefined,
    stats: data["stats"] !== undefined ? serializeColumnFamilyStats(data["stats"]) : undefined,
  };
}

function deserializeColumnFamily(data: any): ColumnFamily {
  return {
    ...data,
    gcRule: data["gcRule"] !== undefined ? deserializeGcRule(data["gcRule"]) : undefined,
    stats: data["stats"] !== undefined ? deserializeColumnFamilyStats(data["stats"]) : undefined,
  };
}

/**
 * Approximate statistics related to a single column family within a table.
 * This information may change rapidly, interpreting these values at a point in
 * time may already preset out-of-date information. Everything below is
 * approximate, unless otherwise specified.
 */
export interface ColumnFamilyStats {
  /**
   * How many cells are present per column qualifier in this column family,
   * averaged over all rows containing any column in the column family. e.g. For
   * column family "family" in a table with 3 rows: * A row with 3 cells in
   * "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A
   * row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells
   * in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in
   * "other:col" (0 columns in "family", "family" not present) would report (3 +
   * 8 + 0)/(1 + 2 + 0) = 3.66 in this field.
   */
  averageCellsPerColumn?: number;
  /**
   * How many column qualifiers are present in this column family, averaged
   * over all rows in the table. e.g. For column family "family" in a table with
   * 3 rows: * A row with cells in "family:col" and "other:col" (1 column in
   * "family") * A row with cells in "family:col", "family:other_col", and
   * "other:data" (2 columns in "family") * A row with cells in "other:col" (0
   * columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5
   * in this field.
   */
  averageColumnsPerRow?: number;
  /**
   * How much space the data in the column family occupies. This is roughly how
   * many bytes would be needed to read the contents of the entire column family
   * (e.g. by streaming all contents out).
   */
  logicalDataBytes?: bigint;
}

function serializeColumnFamilyStats(data: any): ColumnFamilyStats {
  return {
    ...data,
    logicalDataBytes: data["logicalDataBytes"] !== undefined ? String(data["logicalDataBytes"]) : undefined,
  };
}

function deserializeColumnFamilyStats(data: any): ColumnFamilyStats {
  return {
    ...data,
    logicalDataBytes: data["logicalDataBytes"] !== undefined ? BigInt(data["logicalDataBytes"]) : undefined,
  };
}

/**
 * Metadata type for the google.longrunning.Operation returned by CopyBackup.
 */
export interface CopyBackupMetadata {
  /**
   * The name of the backup being created through the copy operation. Values
   * are of the form `projects//instances//clusters//backups/`.
   */
  name?: string;
  /**
   * The progress of the CopyBackup operation.
   */
  progress?: OperationProgress;
  /**
   * Information about the source backup that is being copied from.
   */
  sourceBackupInfo?: BackupInfo;
}

function serializeCopyBackupMetadata(data: any): CopyBackupMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeCopyBackupMetadata(data: any): CopyBackupMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for CopyBackup.
 */
export interface CopyBackupRequest {
  /**
   * Required. The id of the new backup. The `backup_id` along with `parent`
   * are combined as {parent}/backups/{backup_id} to create the full backup
   * name, of the form:
   * `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`.
   * This string must be between 1 and 50 characters in length and match the
   * regex _a-zA-Z0-9*.
   */
  backupId?: string;
  /**
   * Required. Required. The expiration time of the copied backup with
   * microsecond granularity that must be at least 6 hours and at most 30 days
   * from the time the request is received. Once the `expire_time` has passed,
   * Cloud Bigtable will delete the backup and free the resources used by the
   * backup.
   */
  expireTime?: Date;
  /**
   * Required. The source backup to be copied from. The source backup needs to
   * be in READY state for it to be copied. Copying a copied backup is not
   * allowed. Once CopyBackup is in progress, the source backup cannot be
   * deleted or cleaned up on expiration until CopyBackup is finished. Values
   * are of the form: `projects//instances//clusters//backups/`.
   */
  sourceBackup?: string;
}

function serializeCopyBackupRequest(data: any): CopyBackupRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeCopyBackupRequest(data: any): CopyBackupRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Metadata type for the operation returned by CreateBackup.
 */
export interface CreateBackupMetadata {
  /**
   * If set, the time at which this operation finished or was cancelled.
   */
  endTime?: Date;
  /**
   * The name of the backup being created.
   */
  name?: string;
  /**
   * The name of the table the backup is created from.
   */
  sourceTable?: string;
  /**
   * The time at which this operation started.
   */
  startTime?: Date;
}

function serializeCreateBackupMetadata(data: any): CreateBackupMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCreateBackupMetadata(data: any): CreateBackupMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The metadata for the Operation returned by CreateCluster.
 */
export interface CreateClusterMetadata {
  /**
   * The time at which the operation failed or was completed successfully.
   */
  finishTime?: Date;
  /**
   * The request that prompted the initiation of this CreateCluster operation.
   */
  originalRequest?: CreateClusterRequest;
  /**
   * The time at which the original request was received.
   */
  requestTime?: Date;
  /**
   * Keys: the full `name` of each table that existed in the instance when
   * CreateCluster was first called, i.e. `projects//instances//tables/`. Any
   * table added to the instance by a later API call will be created in the new
   * cluster by that API call, not this one. Values: information on how much of
   * a table's data has been copied to the newly-created cluster so far.
   */
  tables?: {
    [key: string]: TableProgress
  };
}

function serializeCreateClusterMetadata(data: any): CreateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
    tables: data["tables"] !== undefined ? Object.fromEntries(Object.entries(data["tables"]).map(([k, v]: [string, any]) => ([k, serializeTableProgress(v)]))) : undefined,
  };
}

function deserializeCreateClusterMetadata(data: any): CreateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
    tables: data["tables"] !== undefined ? Object.fromEntries(Object.entries(data["tables"]).map(([k, v]: [string, any]) => ([k, deserializeTableProgress(v)]))) : undefined,
  };
}

/**
 * Request message for BigtableInstanceAdmin.CreateCluster.
 */
export interface CreateClusterRequest {
  /**
   * Required. The cluster to be created. Fields marked `OutputOnly` must be
   * left blank.
   */
  cluster?: Cluster;
  /**
   * Required. The ID to be used when referring to the new cluster within its
   * instance, e.g., just `mycluster` rather than
   * `projects/myproject/instances/myinstance/clusters/mycluster`.
   */
  clusterId?: string;
  /**
   * Required. The unique name of the instance in which to create the new
   * cluster. Values are of the form `projects/{project}/instances/{instance}`.
   */
  parent?: string;
}

/**
 * The metadata for the Operation returned by CreateInstance.
 */
export interface CreateInstanceMetadata {
  /**
   * The time at which the operation failed or was completed successfully.
   */
  finishTime?: Date;
  /**
   * The request that prompted the initiation of this CreateInstance operation.
   */
  originalRequest?: CreateInstanceRequest;
  /**
   * The time at which the original request was received.
   */
  requestTime?: Date;
}

function serializeCreateInstanceMetadata(data: any): CreateInstanceMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
  };
}

function deserializeCreateInstanceMetadata(data: any): CreateInstanceMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
  };
}

/**
 * Request message for BigtableInstanceAdmin.CreateInstance.
 */
export interface CreateInstanceRequest {
  /**
   * Required. The clusters to be created within the instance, mapped by
   * desired cluster ID, e.g., just `mycluster` rather than
   * `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked
   * `OutputOnly` must be left blank.
   */
  clusters?: {
    [key: string]: Cluster
  };
  /**
   * Required. The instance to create. Fields marked `OutputOnly` must be left
   * blank.
   */
  instance?: Instance;
  /**
   * Required. The ID to be used when referring to the new instance within its
   * project, e.g., just `myinstance` rather than
   * `projects/myproject/instances/myinstance`.
   */
  instanceId?: string;
  /**
   * Required. The unique name of the project in which to create the new
   * instance. Values are of the form `projects/{project}`.
   */
  parent?: string;
}

/**
 * Request message for google.bigtable.admin.v2.BigtableTableAdmin.CreateTable
 */
export interface CreateTableRequest {
  /**
   * The optional list of row keys that will be used to initially split the
   * table into several tablets (tablets are similar to HBase regions). Given
   * two split keys, `s1` and `s2`, three tablets will be created, spanning the
   * key ranges: `[, s1), [s1, s2), [s2, )`. Example: * Row keys := `["a",
   * "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` *
   * initial_split_keys := `["apple", "customer_1", "customer_2", "other"]` *
   * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple,
   * customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2)
   * => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` -
   * Tablet 5 `[other, ) => {"other", "zz"}.`
   */
  initialSplits?: Split[];
  /**
   * Required. The Table to create.
   */
  table?: Table;
  /**
   * Required. The name by which the new table should be referred to within the
   * parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`.
   * Maximum 50 characters.
   */
  tableId?: string;
}

function serializeCreateTableRequest(data: any): CreateTableRequest {
  return {
    ...data,
    initialSplits: data["initialSplits"] !== undefined ? data["initialSplits"].map((item: any) => (serializeSplit(item))) : undefined,
    table: data["table"] !== undefined ? serializeTable(data["table"]) : undefined,
  };
}

function deserializeCreateTableRequest(data: any): CreateTableRequest {
  return {
    ...data,
    initialSplits: data["initialSplits"] !== undefined ? data["initialSplits"].map((item: any) => (deserializeSplit(item))) : undefined,
    table: data["table"] !== undefined ? deserializeTable(data["table"]) : undefined,
  };
}

/**
 * Request message for google.bigtable.admin.v2.BigtableTableAdmin.DropRowRange
 */
export interface DropRowRangeRequest {
  /**
   * Delete all rows in the table. Setting this to false is a no-op.
   */
  deleteAllDataFromTable?: boolean;
  /**
   * Delete all rows that start with this row key prefix. Prefix cannot be zero
   * length.
   */
  rowKeyPrefix?: Uint8Array;
}

function serializeDropRowRangeRequest(data: any): DropRowRangeRequest {
  return {
    ...data,
    rowKeyPrefix: data["rowKeyPrefix"] !== undefined ? encodeBase64(data["rowKeyPrefix"]) : undefined,
  };
}

function deserializeDropRowRangeRequest(data: any): DropRowRangeRequest {
  return {
    ...data,
    rowKeyPrefix: data["rowKeyPrefix"] !== undefined ? decodeBase64(data["rowKeyPrefix"] as string) : undefined,
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
 * Cloud Key Management Service (Cloud KMS) settings for a CMEK-protected
 * cluster.
 */
export interface EncryptionConfig {
  /**
   * Describes the Cloud KMS encryption key that will be used to protect the
   * destination Bigtable cluster. The requirements for this key are: 1) The
   * Cloud Bigtable service account associated with the project that contains
   * this cluster must be granted the `cloudkms.cryptoKeyEncrypterDecrypter`
   * role on the CMEK key. 2) Only regional keys can be used and the region of
   * the CMEK key must match the region of the cluster. Values are of the form
   * `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}`
   */
  kmsKeyName?: string;
}

/**
 * Encryption information for a given resource. If this resource is protected
 * with customer managed encryption, the in-use Cloud Key Management Service
 * (Cloud KMS) key version is specified along with its status.
 */
export interface EncryptionInfo {
  /**
   * Output only. The status of encrypt/decrypt calls on underlying data for
   * this resource. Regardless of status, the existing data is always encrypted
   * at rest.
   */
  readonly encryptionStatus?: Status;
  /**
   * Output only. The type of encryption used to protect this resource.
   */
  readonly encryptionType?:  | "ENCRYPTION_TYPE_UNSPECIFIED" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION";
  /**
   * Output only. The version of the Cloud KMS key specified in the parent
   * cluster that is in use for the data underlying this table.
   */
  readonly kmsKeyVersion?: string;
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
 * Rule for determining which cells to delete during garbage collection.
 */
export interface GcRule {
  /**
   * Delete cells that would be deleted by every nested rule.
   */
  intersection?: Intersection;
  /**
   * Delete cells in a column older than the given age. Values must be at least
   * one millisecond, and will be truncated to microsecond granularity.
   */
  maxAge?: number /* Duration */;
  /**
   * Delete all cells in a column except the most recent N.
   */
  maxNumVersions?: number;
  /**
   * Delete cells that would be deleted by any nested rule.
   */
  union?: Union;
}

function serializeGcRule(data: any): GcRule {
  return {
    ...data,
    intersection: data["intersection"] !== undefined ? serializeIntersection(data["intersection"]) : undefined,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
    union: data["union"] !== undefined ? serializeUnion(data["union"]) : undefined,
  };
}

function deserializeGcRule(data: any): GcRule {
  return {
    ...data,
    intersection: data["intersection"] !== undefined ? deserializeIntersection(data["intersection"]) : undefined,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
    union: data["union"] !== undefined ? deserializeUnion(data["union"]) : undefined,
  };
}

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
 */
export interface GenerateConsistencyTokenRequest {
}

/**
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
 */
export interface GenerateConsistencyTokenResponse {
  /**
   * The generated consistency token.
   */
  consistencyToken?: string;
}

/**
 * Request message for `GetIamPolicy` method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
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
  requestedPolicyVersion?: number;
}

/**
 * A tablet is a defined by a start and end key and is explained in
 * https://cloud.google.com/bigtable/docs/overview#architecture and
 * https://cloud.google.com/bigtable/docs/performance#optimization. A Hot tablet
 * is a tablet that exhibits high average cpu usage during the time interval
 * from start time to end time.
 */
export interface HotTablet {
  /**
   * Tablet End Key (inclusive).
   */
  endKey?: string;
  /**
   * Output only. The end time of the hot tablet.
   */
  readonly endTime?: Date;
  /**
   * The unique name of the hot tablet. Values are of the form
   * `projects/{project}/instances/{instance}/clusters/{cluster}/hotTablets/[a-zA-Z0-9_-]*`.
   */
  name?: string;
  /**
   * Output only. The average CPU usage spent by a node on this tablet over the
   * start_time to end_time time range. The percentage is the amount of CPU used
   * by the node to serve the tablet, from 0% (tablet was not interacted with)
   * to 100% (the node spent all cycles serving the hot tablet).
   */
  readonly nodeCpuUsagePercent?: number;
  /**
   * Tablet Start Key (inclusive).
   */
  startKey?: string;
  /**
   * Output only. The start time of the hot tablet.
   */
  readonly startTime?: Date;
  /**
   * Name of the table that contains the tablet. Values are of the form
   * `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`.
   */
  tableName?: string;
}

/**
 * A collection of Bigtable Tables and the resources that serve them. All
 * tables in an instance are served from all Clusters in the instance.
 */
export interface Instance {
  /**
   * Output only. A commit timestamp representing when this Instance was
   * created. For instances created before this field was added (August 2021),
   * this value is `seconds: 0, nanos: 1`.
   */
  readonly createTime?: Date;
  /**
   * Required. The descriptive name for this instance as it appears in UIs. Can
   * be changed at any time, but should be kept globally unique to avoid
   * confusion.
   */
  displayName?: string;
  /**
   * Labels are a flexible and lightweight mechanism for organizing cloud
   * resources into groups that reflect a customer's organizational needs and
   * deployment strategies. They can be used to filter resources and aggregate
   * metrics. * Label keys must be between 1 and 63 characters long and must
   * conform to the regular expression: `\p{Ll}\p{Lo}{0,62}`. * Label values
   * must be between 0 and 63 characters long and must conform to the regular
   * expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`. * No more than 64 labels can be
   * associated with a given resource. * Keys and values must both be under 128
   * bytes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The unique name of the instance. Values are of the form
   * `projects/{project}/instances/a-z+[a-z0-9]`.
   */
  name?: string;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Output only. The current state of the instance.
   */
  readonly state?:  | "STATE_NOT_KNOWN" | "READY" | "CREATING";
  /**
   * The type of the instance. Defaults to `PRODUCTION`.
   */
  type?:  | "TYPE_UNSPECIFIED" | "PRODUCTION" | "DEVELOPMENT";
}

/**
 * A GcRule which deletes cells matching all of the given rules.
 */
export interface Intersection {
  /**
   * Only delete cells which would be deleted by every element of `rules`.
   */
  rules?: GcRule[];
}

function serializeIntersection(data: any): Intersection {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeGcRule(item))) : undefined,
  };
}

function deserializeIntersection(data: any): Intersection {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeGcRule(item))) : undefined,
  };
}

/**
 * Response message for BigtableInstanceAdmin.ListAppProfiles.
 */
export interface ListAppProfilesResponse {
  /**
   * The list of requested app profiles.
   */
  appProfiles?: AppProfile[];
  /**
   * Locations from which AppProfile information could not be retrieved, due to
   * an outage or some other transient condition. AppProfiles from these
   * locations may be missing from `app_profiles`. Values are of the form
   * `projects//locations/`
   */
  failedLocations?: string[];
  /**
   * Set if not all app profiles could be returned in a single response. Pass
   * this value to `page_token` in another request to get the next page of
   * results.
   */
  nextPageToken?: string;
}

/**
 * The response for ListBackups.
 */
export interface ListBackupsResponse {
  /**
   * The list of matching backups.
   */
  backups?: Backup[];
  /**
   * `next_page_token` can be sent in a subsequent ListBackups call to fetch
   * more of the matching backups.
   */
  nextPageToken?: string;
}

function serializeListBackupsResponse(data: any): ListBackupsResponse {
  return {
    ...data,
    backups: data["backups"] !== undefined ? data["backups"].map((item: any) => (serializeBackup(item))) : undefined,
  };
}

function deserializeListBackupsResponse(data: any): ListBackupsResponse {
  return {
    ...data,
    backups: data["backups"] !== undefined ? data["backups"].map((item: any) => (deserializeBackup(item))) : undefined,
  };
}

/**
 * Response message for BigtableInstanceAdmin.ListClusters.
 */
export interface ListClustersResponse {
  /**
   * The list of requested clusters.
   */
  clusters?: Cluster[];
  /**
   * Locations from which Cluster information could not be retrieved, due to an
   * outage or some other transient condition. Clusters from these locations may
   * be missing from `clusters`, or may only have partial information returned.
   * Values are of the form `projects//locations/`
   */
  failedLocations?: string[];
  /**
   * DEPRECATED: This field is unused and ignored.
   */
  nextPageToken?: string;
}

/**
 * Response message for BigtableInstanceAdmin.ListHotTablets.
 */
export interface ListHotTabletsResponse {
  /**
   * List of hot tablets in the tables of the requested cluster that fall
   * within the requested time range. Hot tablets are ordered by node cpu usage
   * percent. If there are multiple hot tablets that correspond to the same
   * tablet within a 15-minute interval, only the hot tablet with the highest
   * node cpu usage will be included in the response.
   */
  hotTablets?: HotTablet[];
  /**
   * Set if not all hot tablets could be returned in a single response. Pass
   * this value to `page_token` in another request to get the next page of
   * results.
   */
  nextPageToken?: string;
}

/**
 * Response message for BigtableInstanceAdmin.ListInstances.
 */
export interface ListInstancesResponse {
  /**
   * Locations from which Instance information could not be retrieved, due to
   * an outage or some other transient condition. Instances whose Clusters are
   * all in one of the failed locations may be missing from `instances`, and
   * Instances with at least one Cluster in a failed location may only have
   * partial information returned. Values are of the form `projects//locations/`
   */
  failedLocations?: string[];
  /**
   * The list of requested instances.
   */
  instances?: Instance[];
  /**
   * DEPRECATED: This field is unused and ignored.
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
 * Response message for google.bigtable.admin.v2.BigtableTableAdmin.ListTables
 */
export interface ListTablesResponse {
  /**
   * Set if not all tables could be returned in a single response. Pass this
   * value to `page_token` in another request to get the next page of results.
   */
  nextPageToken?: string;
  /**
   * The tables present in the requested instance.
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
 * A create, update, or delete of a particular column family.
 */
export interface Modification {
  /**
   * Create a new column family with the specified schema, or fail if one
   * already exists with the given ID.
   */
  create?: ColumnFamily;
  /**
   * Drop (delete) the column family with the given ID, or fail if no such
   * family exists.
   */
  drop?: boolean;
  /**
   * The ID of the column family to be modified.
   */
  id?: string;
  /**
   * Update an existing column family to the specified schema, or fail if no
   * column family exists with the given ID.
   */
  update?: ColumnFamily;
}

function serializeModification(data: any): Modification {
  return {
    ...data,
    create: data["create"] !== undefined ? serializeColumnFamily(data["create"]) : undefined,
    update: data["update"] !== undefined ? serializeColumnFamily(data["update"]) : undefined,
  };
}

function deserializeModification(data: any): Modification {
  return {
    ...data,
    create: data["create"] !== undefined ? deserializeColumnFamily(data["create"]) : undefined,
    update: data["update"] !== undefined ? deserializeColumnFamily(data["update"]) : undefined,
  };
}

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ModifyColumnFamilies
 */
export interface ModifyColumnFamiliesRequest {
  /**
   * Required. Modifications to be atomically applied to the specified table's
   * families. Entries are applied in order, meaning that earlier modifications
   * can be masked by later ones (in the case of repeated updates to the same
   * family, for example).
   */
  modifications?: Modification[];
}

function serializeModifyColumnFamiliesRequest(data: any): ModifyColumnFamiliesRequest {
  return {
    ...data,
    modifications: data["modifications"] !== undefined ? data["modifications"].map((item: any) => (serializeModification(item))) : undefined,
  };
}

function deserializeModifyColumnFamiliesRequest(data: any): ModifyColumnFamiliesRequest {
  return {
    ...data,
    modifications: data["modifications"] !== undefined ? data["modifications"].map((item: any) => (deserializeModification(item))) : undefined,
  };
}

/**
 * Read/write requests are routed to the nearest cluster in the instance, and
 * will fail over to the nearest cluster that is available in the event of
 * transient errors or delays. Clusters in a region are considered equidistant.
 * Choosing this option sacrifices read-your-writes consistency to improve
 * availability.
 */
export interface MultiClusterRoutingUseAny {
  /**
   * The set of clusters to route to. The order is ignored; clusters will be
   * tried in order of distance. If left empty, all clusters are eligible.
   */
  clusterIds?: string[];
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
 * Encapsulates progress related information for a Cloud Bigtable long running
 * operation.
 */
export interface OperationProgress {
  /**
   * If set, the time at which this operation failed or was completed
   * successfully.
   */
  endTime?: Date;
  /**
   * Percent completion of the operation. Values are between 0 and 100
   * inclusive.
   */
  progressPercent?: number;
  /**
   * Time the request was received.
   */
  startTime?: Date;
}

function serializeOperationProgress(data: any): OperationProgress {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeOperationProgress(data: any): OperationProgress {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#operationsProjectsOperationsList.
 */
export interface OperationsProjectsOperationsListOptions {
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
 * Metadata type for the long-running operation used to track the progress of
 * optimizations performed on a newly restored table. This long-running
 * operation is automatically created by the system after the successful
 * completion of a table restore, and cannot be cancelled.
 */
export interface OptimizeRestoredTableMetadata {
  /**
   * Name of the restored table being optimized.
   */
  name?: string;
  /**
   * The progress of the post-restore optimizations.
   */
  progress?: OperationProgress;
}

function serializeOptimizeRestoredTableMetadata(data: any): OptimizeRestoredTableMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeOptimizeRestoredTableMetadata(data: any): OptimizeRestoredTableMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The metadata for the Operation returned by PartialUpdateCluster.
 */
export interface PartialUpdateClusterMetadata {
  /**
   * The time at which the operation failed or was completed successfully.
   */
  finishTime?: Date;
  /**
   * The original request for PartialUpdateCluster.
   */
  originalRequest?: PartialUpdateClusterRequest;
  /**
   * The time at which the original request was received.
   */
  requestTime?: Date;
}

function serializePartialUpdateClusterMetadata(data: any): PartialUpdateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    originalRequest: data["originalRequest"] !== undefined ? serializePartialUpdateClusterRequest(data["originalRequest"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
  };
}

function deserializePartialUpdateClusterMetadata(data: any): PartialUpdateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    originalRequest: data["originalRequest"] !== undefined ? deserializePartialUpdateClusterRequest(data["originalRequest"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
  };
}

/**
 * Request message for BigtableInstanceAdmin.PartialUpdateCluster.
 */
export interface PartialUpdateClusterRequest {
  /**
   * Required. The Cluster which contains the partial updates to be applied,
   * subject to the update_mask.
   */
  cluster?: Cluster;
  /**
   * Required. The subset of Cluster fields which should be replaced.
   */
  updateMask?: string /* FieldMask */;
}

function serializePartialUpdateClusterRequest(data: any): PartialUpdateClusterRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePartialUpdateClusterRequest(data: any): PartialUpdateClusterRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for BigtableInstanceAdmin.PartialUpdateInstance.
 */
export interface PartialUpdateInstanceRequest {
  /**
   * Required. The Instance which will (partially) replace the current value.
   */
  instance?: Instance;
  /**
   * Required. The subset of Instance fields which should be replaced. Must be
   * explicitly set.
   */
  updateMask?: string /* FieldMask */;
}

function serializePartialUpdateInstanceRequest(data: any): PartialUpdateInstanceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePartialUpdateInstanceRequest(data: any): PartialUpdateInstanceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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
 * Additional options for BigtableAdmin#projectsInstancesAppProfilesCreate.
 */
export interface ProjectsInstancesAppProfilesCreateOptions {
  /**
   * Required. The ID to be used when referring to the new app profile within
   * its instance, e.g., just `myprofile` rather than
   * `projects/myproject/instances/myinstance/appProfiles/myprofile`.
   */
  appProfileId?: string;
  /**
   * If true, ignore safety checks when creating the app profile.
   */
  ignoreWarnings?: boolean;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesAppProfilesDelete.
 */
export interface ProjectsInstancesAppProfilesDeleteOptions {
  /**
   * Required. If true, ignore safety checks when deleting the app profile.
   */
  ignoreWarnings?: boolean;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesAppProfilesList.
 */
export interface ProjectsInstancesAppProfilesListOptions {
  /**
   * Maximum number of results per page. A page_size of zero lets the server
   * choose the number of items to return. A page_size which is strictly
   * positive will return at most that many items. A negative page_size will
   * cause an error. Following the first request, subsequent paginated calls are
   * not required to pass a page_size. If a page_size is set in subsequent
   * calls, it must match the page_size given in the first request.
   */
  pageSize?: number;
  /**
   * The value of `next_page_token` returned by a previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesAppProfilesPatch.
 */
export interface ProjectsInstancesAppProfilesPatchOptions {
  /**
   * If true, ignore safety checks when updating the app profile.
   */
  ignoreWarnings?: boolean;
  /**
   * Required. The subset of app profile fields which should be replaced. If
   * unset, all fields will be replaced.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesAppProfilesPatchOptions(data: any): ProjectsInstancesAppProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesAppProfilesPatchOptions(data: any): ProjectsInstancesAppProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsInstancesClustersBackupsCreate.
 */
export interface ProjectsInstancesClustersBackupsCreateOptions {
  /**
   * Required. The id of the backup to be created. The `backup_id` along with
   * the parent `parent` are combined as {parent}/backups/{backup_id} to create
   * the full backup name, of the form:
   * `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`.
   * This string must be between 1 and 50 characters in length and match the
   * regex _a-zA-Z0-9*.
   */
  backupId?: string;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesClustersBackupsList.
 */
export interface ProjectsInstancesClustersBackupsListOptions {
  /**
   * A filter expression that filters backups listed in the response. The
   * expression must specify the field name, a comparison operator, and the
   * value that you want to use for filtering. The value must be a string, a
   * number, or a boolean. The comparison operator must be <, >, <=, >=, !=, =,
   * or :. Colon ':' represents a HAS operator which is roughly synonymous with
   * equality. Filter rules are case insensitive. The fields eligible for
   * filtering are: * `name` * `source_table` * `state` * `start_time` (and
   * values are of the format YYYY-MM-DDTHH:MM:SSZ) * `end_time` (and values are
   * of the format YYYY-MM-DDTHH:MM:SSZ) * `expire_time` (and values are of the
   * format YYYY-MM-DDTHH:MM:SSZ) * `size_bytes` To filter on multiple
   * expressions, provide each separate expression within parentheses. By
   * default, each expression is an AND expression. However, you can include
   * AND, OR, and NOT expressions explicitly. Some examples of using filters
   * are: * `name:"exact"` --> The backup's name is the string "exact". *
   * `name:howl` --> The backup's name contains the string "howl". *
   * `source_table:prod` --> The source_table's name contains the string "prod".
   * * `state:CREATING` --> The backup is pending creation. * `state:READY` -->
   * The backup is fully created and ready for use. * `(name:howl) AND
   * (start_time < \"2018-03-28T14:50:00Z\")` --> The backup name contains the
   * string "howl" and start_time of the backup is before 2018-03-28T14:50:00Z.
   * * `size_bytes > 10000000000` --> The backup's size is greater than 10GB
   */
  filter?: string;
  /**
   * An expression for specifying the sort order of the results of the request.
   * The string value should specify one or more fields in Backup. The full
   * syntax is described at https://aip.dev/132#ordering. Fields supported are:
   * * name * source_table * expire_time * start_time * end_time * size_bytes *
   * state For example, "start_time". The default sorting order is ascending. To
   * specify descending order for the field, a suffix " desc" should be appended
   * to the field name. For example, "start_time desc". Redundant space
   * characters in the syntax are insigificant. If order_by is empty, results
   * will be sorted by `start_time` in descending order starting from the most
   * recently created backup.
   */
  orderBy?: string;
  /**
   * Number of backups to be returned in the response. If 0 or less, defaults
   * to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListBackupsResponse to the same `parent` and with the same
   * `filter`.
   */
  pageToken?: string;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesClustersBackupsPatch.
 */
export interface ProjectsInstancesClustersBackupsPatchOptions {
  /**
   * Required. A mask specifying which fields (e.g. `expire_time`) in the
   * Backup resource should be updated. This mask is relative to the Backup
   * resource, not to the request message. The field mask must always be
   * specified; this prevents any future fields from being erased accidentally
   * by clients that do not know about them.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesClustersBackupsPatchOptions(data: any): ProjectsInstancesClustersBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesClustersBackupsPatchOptions(data: any): ProjectsInstancesClustersBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsInstancesClustersCreate.
 */
export interface ProjectsInstancesClustersCreateOptions {
  /**
   * Required. The ID to be used when referring to the new cluster within its
   * instance, e.g., just `mycluster` rather than
   * `projects/myproject/instances/myinstance/clusters/mycluster`.
   */
  clusterId?: string;
}

/**
 * Additional options for
 * BigtableAdmin#projectsInstancesClustersHotTabletsList.
 */
export interface ProjectsInstancesClustersHotTabletsListOptions {
  /**
   * The end time to list hot tablets.
   */
  endTime?: Date;
  /**
   * Maximum number of results per page. A page_size that is empty or zero lets
   * the server choose the number of items to return. A page_size which is
   * strictly positive will return at most that many items. A negative page_size
   * will cause an error. Following the first request, subsequent paginated
   * calls do not need a page_size field. If a page_size is set in subsequent
   * calls, it must match the page_size given in the first request.
   */
  pageSize?: number;
  /**
   * The value of `next_page_token` returned by a previous call.
   */
  pageToken?: string;
  /**
   * The start time to list hot tablets. The hot tablets in the response will
   * have start times between the requested start time and end time. Start time
   * defaults to Now if it is unset, and end time defaults to Now - 24 hours if
   * it is unset. The start time should be less than the end time, and the
   * maximum allowed time range between start time and end time is 48 hours.
   * Start time and end time should have values between Now and Now - 14 days.
   */
  startTime?: Date;
}

function serializeProjectsInstancesClustersHotTabletsListOptions(data: any): ProjectsInstancesClustersHotTabletsListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsInstancesClustersHotTabletsListOptions(data: any): ProjectsInstancesClustersHotTabletsListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsInstancesClustersList.
 */
export interface ProjectsInstancesClustersListOptions {
  /**
   * DEPRECATED: This field is unused and ignored.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigtableAdmin#projectsInstancesClustersPartialUpdateCluster.
 */
export interface ProjectsInstancesClustersPartialUpdateClusterOptions {
  /**
   * Required. The subset of Cluster fields which should be replaced.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesClustersPartialUpdateClusterOptions(data: any): ProjectsInstancesClustersPartialUpdateClusterOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesClustersPartialUpdateClusterOptions(data: any): ProjectsInstancesClustersPartialUpdateClusterOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsInstancesList.
 */
export interface ProjectsInstancesListOptions {
  /**
   * DEPRECATED: This field is unused and ignored.
   */
  pageToken?: string;
}

/**
 * Additional options for BigtableAdmin#projectsInstancesPartialUpdateInstance.
 */
export interface ProjectsInstancesPartialUpdateInstanceOptions {
  /**
   * Required. The subset of Instance fields which should be replaced. Must be
   * explicitly set.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesPartialUpdateInstanceOptions(data: any): ProjectsInstancesPartialUpdateInstanceOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesPartialUpdateInstanceOptions(data: any): ProjectsInstancesPartialUpdateInstanceOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsInstancesTablesGet.
 */
export interface ProjectsInstancesTablesGetOptions {
  /**
   * The view to be applied to the returned table's fields. Defaults to
   * `SCHEMA_VIEW` if unspecified.
   */
  view?:  | "VIEW_UNSPECIFIED" | "NAME_ONLY" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "ENCRYPTION_VIEW" | "STATS_VIEW" | "FULL";
}

/**
 * Additional options for BigtableAdmin#projectsInstancesTablesList.
 */
export interface ProjectsInstancesTablesListOptions {
  /**
   * Maximum number of results per page. A page_size of zero lets the server
   * choose the number of items to return. A page_size which is strictly
   * positive will return at most that many items. A negative page_size will
   * cause an error. Following the first request, subsequent paginated calls are
   * not required to pass a page_size. If a page_size is set in subsequent
   * calls, it must match the page_size given in the first request.
   */
  pageSize?: number;
  /**
   * The value of `next_page_token` returned by a previous call.
   */
  pageToken?: string;
  /**
   * The view to be applied to the returned tables' fields. Only NAME_ONLY view
   * (default), REPLICATION_VIEW and ENCRYPTION_VIEW are supported.
   */
  view?:  | "VIEW_UNSPECIFIED" | "NAME_ONLY" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "ENCRYPTION_VIEW" | "STATS_VIEW" | "FULL";
}

/**
 * Additional options for BigtableAdmin#projectsInstancesTablesPatch.
 */
export interface ProjectsInstancesTablesPatchOptions {
  /**
   * Required. The list of fields to update. A mask specifying which fields
   * (e.g. `change_stream_config`) in the `table` field should be updated. This
   * mask is relative to the `table` field, not to the request message. The
   * wildcard (*) path is currently not supported. Currently UpdateTable is only
   * supported for the following fields: * `change_stream_config` *
   * `change_stream_config.retention_period` * `deletion_protection` If
   * `column_families` is set in `update_mask`, it will return an UNIMPLEMENTED
   * error.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesTablesPatchOptions(data: any): ProjectsInstancesTablesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesTablesPatchOptions(data: any): ProjectsInstancesTablesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigtableAdmin#projectsLocationsList.
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
 * Information about a table restore.
 */
export interface RestoreInfo {
  /**
   * Information about the backup used to restore the table. The backup may no
   * longer exist.
   */
  backupInfo?: BackupInfo;
  /**
   * The type of the restore source.
   */
  sourceType?:  | "RESTORE_SOURCE_TYPE_UNSPECIFIED" | "BACKUP";
}

/**
 * Metadata type for the long-running operation returned by RestoreTable.
 */
export interface RestoreTableMetadata {
  backupInfo?: BackupInfo;
  /**
   * Name of the table being created and restored to.
   */
  name?: string;
  /**
   * If exists, the name of the long-running operation that will be used to
   * track the post-restore optimization process to optimize the performance of
   * the restored table. The metadata type of the long-running operation is
   * OptimizeRestoreTableMetadata. The response type is Empty. This long-running
   * operation may be automatically created by the system if applicable after
   * the RestoreTable long-running operation completes successfully. This
   * operation may not be created if the table is already optimized or the
   * restore was not successful.
   */
  optimizeTableOperationName?: string;
  /**
   * The progress of the RestoreTable operation.
   */
  progress?: OperationProgress;
  /**
   * The type of the restore source.
   */
  sourceType?:  | "RESTORE_SOURCE_TYPE_UNSPECIFIED" | "BACKUP";
}

function serializeRestoreTableMetadata(data: any): RestoreTableMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeRestoreTableMetadata(data: any): RestoreTableMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for RestoreTable.
 */
export interface RestoreTableRequest {
  /**
   * Name of the backup from which to restore. Values are of the form
   * `projects//instances//clusters//backups/`.
   */
  backup?: string;
  /**
   * Required. The id of the table to create and restore to. This table must
   * not already exist. The `table_id` appended to `parent` forms the full table
   * name of the form `projects//instances//tables/`.
   */
  tableId?: string;
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
 * Unconditionally routes all read/write requests to a specific cluster. This
 * option preserves read-your-writes consistency but does not improve
 * availability.
 */
export interface SingleClusterRouting {
  /**
   * Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are
   * allowed by this app profile. It is unsafe to send these requests to the
   * same table/row/column in multiple clusters.
   */
  allowTransactionalWrites?: boolean;
  /**
   * The cluster to which read/write requests should be routed.
   */
  clusterId?: string;
}

/**
 * An initial split point for a newly created table.
 */
export interface Split {
  /**
   * Row key to use as an initial tablet boundary.
   */
  key?: Uint8Array;
}

function serializeSplit(data: any): Split {
  return {
    ...data,
    key: data["key"] !== undefined ? encodeBase64(data["key"]) : undefined,
  };
}

function deserializeSplit(data: any): Split {
  return {
    ...data,
    key: data["key"] !== undefined ? decodeBase64(data["key"] as string) : undefined,
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
 * A collection of user data indexed by row, column, and timestamp. Each table
 * is served using the resources of its parent cluster.
 */
export interface Table {
  /**
   * Output only. Map from cluster ID to per-cluster table state. If it could
   * not be determined whether or not the table has data in a particular cluster
   * (for example, if its zone is unavailable), then there will be an entry for
   * the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`,
   * `ENCRYPTION_VIEW`, `FULL`
   */
  readonly clusterStates?: {
    [key: string]: ClusterState
  };
  /**
   * The column families configured for this table, mapped by column family ID.
   * Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL`
   */
  columnFamilies?: {
    [key: string]: ColumnFamily
  };
  /**
   * Set to true to make the table protected against data loss. i.e. deleting
   * the following resources through Admin APIs are prohibited: * The table. *
   * The column families in the table. * The instance containing the table. Note
   * one can still delete the data stored in the table through Data APIs.
   */
  deletionProtection?: boolean;
  /**
   * Immutable. The granularity (i.e. `MILLIS`) at which timestamps are stored
   * in this table. Timestamps not matching the granularity will be rejected. If
   * unspecified at creation time, the value will be set to `MILLIS`. Views:
   * `SCHEMA_VIEW`, `FULL`.
   */
  granularity?:  | "TIMESTAMP_GRANULARITY_UNSPECIFIED" | "MILLIS";
  /**
   * The unique name of the table. Values are of the form
   * `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views:
   * `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL`
   */
  name?: string;
  /**
   * Output only. If this table was restored from another data source (e.g. a
   * backup), this field will be populated with information about the restore.
   */
  readonly restoreInfo?: RestoreInfo;
  /**
   * Only available with STATS_VIEW, this includes summary statistics about the
   * entire table contents. For statistics about a specific column family, see
   * ColumnFamilyStats in the mapped ColumnFamily collection above.
   */
  stats?: TableStats;
}

function serializeTable(data: any): Table {
  return {
    ...data,
    columnFamilies: data["columnFamilies"] !== undefined ? Object.fromEntries(Object.entries(data["columnFamilies"]).map(([k, v]: [string, any]) => ([k, serializeColumnFamily(v)]))) : undefined,
    stats: data["stats"] !== undefined ? serializeTableStats(data["stats"]) : undefined,
  };
}

function deserializeTable(data: any): Table {
  return {
    ...data,
    columnFamilies: data["columnFamilies"] !== undefined ? Object.fromEntries(Object.entries(data["columnFamilies"]).map(([k, v]: [string, any]) => ([k, deserializeColumnFamily(v)]))) : undefined,
    stats: data["stats"] !== undefined ? deserializeTableStats(data["stats"]) : undefined,
  };
}

/**
 * Progress info for copying a table's data to the new cluster.
 */
export interface TableProgress {
  /**
   * Estimate of the number of bytes copied so far for this table. This will
   * eventually reach 'estimated_size_bytes' unless the table copy is CANCELLED.
   */
  estimatedCopiedBytes?: bigint;
  /**
   * Estimate of the size of the table to be copied.
   */
  estimatedSizeBytes?: bigint;
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "COPYING" | "COMPLETED" | "CANCELLED";
}

function serializeTableProgress(data: any): TableProgress {
  return {
    ...data,
    estimatedCopiedBytes: data["estimatedCopiedBytes"] !== undefined ? String(data["estimatedCopiedBytes"]) : undefined,
    estimatedSizeBytes: data["estimatedSizeBytes"] !== undefined ? String(data["estimatedSizeBytes"]) : undefined,
  };
}

function deserializeTableProgress(data: any): TableProgress {
  return {
    ...data,
    estimatedCopiedBytes: data["estimatedCopiedBytes"] !== undefined ? BigInt(data["estimatedCopiedBytes"]) : undefined,
    estimatedSizeBytes: data["estimatedSizeBytes"] !== undefined ? BigInt(data["estimatedSizeBytes"]) : undefined,
  };
}

/**
 * Approximate statistics related to a table. These statistics are calculated
 * infrequently, while simultaneously, data in the table can change rapidly.
 * Thus the values reported here (e.g. row count) are very likely out-of date,
 * even the instant they are received in this API. Thus, only treat these values
 * as approximate. IMPORTANT: Everything below is approximate, unless otherwise
 * specified.
 */
export interface TableStats {
  /**
   * How many cells are present per column (column family, column qualifier)
   * combinations, averaged over all columns in all rows in the table. e.g. A
   * table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in
   * "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7
   * cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3
   * columns) would report (4 + 15)/(2 + 3) = 3.8 in this field.
   */
  averageCellsPerColumn?: number;
  /**
   * How many (column family, column qualifier) combinations are present per
   * row in the table, averaged over all rows in the table. e.g. A table with 2
   * rows: * A row with cells in "family:col" and "other:col" (2 distinct
   * columns) * A row with cells in "family:col", "family:other_col", and
   * "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this
   * field.
   */
  averageColumnsPerRow?: number;
  /**
   * This is roughly how many bytes would be needed to read the entire table
   * (e.g. by streaming all contents out).
   */
  logicalDataBytes?: bigint;
  /**
   * How many rows are in the table.
   */
  rowCount?: bigint;
}

function serializeTableStats(data: any): TableStats {
  return {
    ...data,
    logicalDataBytes: data["logicalDataBytes"] !== undefined ? String(data["logicalDataBytes"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeTableStats(data: any): TableStats {
  return {
    ...data,
    logicalDataBytes: data["logicalDataBytes"] !== undefined ? BigInt(data["logicalDataBytes"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
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
 * Metadata type for the operation returned by
 * google.bigtable.admin.v2.BigtableTableAdmin.UndeleteTable.
 */
export interface UndeleteTableMetadata {
  /**
   * If set, the time at which this operation finished or was cancelled.
   */
  endTime?: Date;
  /**
   * The name of the table being restored.
   */
  name?: string;
  /**
   * The time at which this operation started.
   */
  startTime?: Date;
}

function serializeUndeleteTableMetadata(data: any): UndeleteTableMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeUndeleteTableMetadata(data: any): UndeleteTableMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.UndeleteTable
 */
export interface UndeleteTableRequest {
}

/**
 * A GcRule which deletes cells matching any of the given rules.
 */
export interface Union {
  /**
   * Delete cells which would be deleted by any element of `rules`.
   */
  rules?: GcRule[];
}

function serializeUnion(data: any): Union {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeGcRule(item))) : undefined,
  };
}

function deserializeUnion(data: any): Union {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeGcRule(item))) : undefined,
  };
}

/**
 * The metadata for the Operation returned by UpdateAppProfile.
 */
export interface UpdateAppProfileMetadata {
}

/**
 * The metadata for the Operation returned by UpdateCluster.
 */
export interface UpdateClusterMetadata {
  /**
   * The time at which the operation failed or was completed successfully.
   */
  finishTime?: Date;
  /**
   * The request that prompted the initiation of this UpdateCluster operation.
   */
  originalRequest?: Cluster;
  /**
   * The time at which the original request was received.
   */
  requestTime?: Date;
}

function serializeUpdateClusterMetadata(data: any): UpdateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
  };
}

function deserializeUpdateClusterMetadata(data: any): UpdateClusterMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
  };
}

/**
 * The metadata for the Operation returned by UpdateInstance.
 */
export interface UpdateInstanceMetadata {
  /**
   * The time at which the operation failed or was completed successfully.
   */
  finishTime?: Date;
  /**
   * The request that prompted the initiation of this UpdateInstance operation.
   */
  originalRequest?: PartialUpdateInstanceRequest;
  /**
   * The time at which the original request was received.
   */
  requestTime?: Date;
}

function serializeUpdateInstanceMetadata(data: any): UpdateInstanceMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    originalRequest: data["originalRequest"] !== undefined ? serializePartialUpdateInstanceRequest(data["originalRequest"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
  };
}

function deserializeUpdateInstanceMetadata(data: any): UpdateInstanceMetadata {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    originalRequest: data["originalRequest"] !== undefined ? deserializePartialUpdateInstanceRequest(data["originalRequest"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
  };
}

/**
 * Metadata type for the operation returned by UpdateTable.
 */
export interface UpdateTableMetadata {
  /**
   * If set, the time at which this operation finished or was canceled.
   */
  endTime?: Date;
  /**
   * The name of the table being updated.
   */
  name?: string;
  /**
   * The time at which this operation started.
   */
  startTime?: Date;
}

function serializeUpdateTableMetadata(data: any): UpdateTableMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeUpdateTableMetadata(data: any): UpdateTableMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
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
