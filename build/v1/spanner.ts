// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Spanner API Client for Deno
 * =================================
 * 
 * Cloud Spanner is a managed, mission-critical, globally consistent and scalable relational database service.
 * 
 * Docs: https://cloud.google.com/spanner/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Cloud Spanner is a managed, mission-critical, globally consistent and
 * scalable relational database service.
 */
export class Spanner {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://spanner.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists the user-managed instance config long-running operations in the
   * given project. An instance config operation has a name of the form
   * `projects//instanceConfigs//operations/`. The long-running operation
   * metadata field type `metadata.type_url` describes the type of the metadata.
   * Operations returned include those that have completed/failed/canceled
   * within the last 7 days, and pending operations. Operations returned are
   * ordered by `operation.metadata.value.start_time` in descending order
   * starting from the most recently started operation.
   *
   * @param parent Required. The project of the instance config operations. Values are of the form `projects/`.
   */
  async projectsInstanceConfigOperationsList(parent: string, opts: ProjectsInstanceConfigOperationsListOptions = {}): Promise<ListInstanceConfigOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instanceConfigOperations`);
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
    return data as ListInstanceConfigOperationsResponse;
  }

  /**
   * Creates an instance config and begins preparing it to be used. The
   * returned long-running operation can be used to track the progress of
   * preparing the new instance config. The instance config name is assigned by
   * the caller. If the named instance config already exists,
   * `CreateInstanceConfig` returns `ALREADY_EXISTS`. Immediately after the
   * request returns: * The instance config is readable via the API, with all
   * requested attributes. The instance config's reconciling field is set to
   * true. Its state is `CREATING`. While the operation is pending: * Cancelling
   * the operation renders the instance config immediately unreadable via the
   * API. * Except for deleting the creating resource, all other attempts to
   * modify the instance config are rejected. Upon completion of the returned
   * operation: * Instances can be created using the instance configuration. *
   * The instance config's reconciling field becomes false. Its state becomes
   * `READY`. The returned long-running operation will have a name of the format
   * `/operations/` and can be used to track creation of the instance config.
   * The metadata field type is CreateInstanceConfigMetadata. The response field
   * type is InstanceConfig, if successful. Authorization requires
   * `spanner.instanceConfigs.create` permission on the resource parent.
   *
   * @param parent Required. The name of the project in which to create the instance config. Values are of the form `projects/`.
   */
  async projectsInstanceConfigsCreate(parent: string, req: CreateInstanceConfigRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instanceConfigs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the instance config. Deletion is only allowed when no instances
   * are using the configuration. If any instances are using the config, returns
   * `FAILED_PRECONDITION`. Only user managed configurations can be deleted.
   * Authorization requires `spanner.instanceConfigs.delete` permission on the
   * resource name.
   *
   * @param name Required. The name of the instance configuration to be deleted. Values are of the form `projects//instanceConfigs/`
   */
  async projectsInstanceConfigsDelete(name: string, opts: ProjectsInstanceConfigsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about a particular instance configuration.
   *
   * @param name Required. The name of the requested instance configuration. Values are of the form `projects//instanceConfigs/`.
   */
  async projectsInstanceConfigsGet(name: string): Promise<InstanceConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InstanceConfig;
  }

  /**
   * Lists the supported instance configurations for a given project.
   *
   * @param parent Required. The name of the project for which a list of supported instance configurations is requested. Values are of the form `projects/`.
   */
  async projectsInstanceConfigsList(parent: string, opts: ProjectsInstanceConfigsListOptions = {}): Promise<ListInstanceConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instanceConfigs`);
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
    return data as ListInstanceConfigsResponse;
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
  async projectsInstanceConfigsOperationsCancel(name: string): Promise<Empty> {
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
  async projectsInstanceConfigsOperationsDelete(name: string): Promise<Empty> {
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
  async projectsInstanceConfigsOperationsGet(name: string): Promise<Operation> {
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
  async projectsInstanceConfigsOperationsList(name: string, opts: ProjectsInstanceConfigsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Updates an instance config. The returned long-running operation can be
   * used to track the progress of updating the instance. If the named instance
   * config does not exist, returns `NOT_FOUND`. Only user managed
   * configurations can be updated. Immediately after the request returns: * The
   * instance config's reconciling field is set to true. While the operation is
   * pending: * Cancelling the operation sets its metadata's cancel_time. The
   * operation is guaranteed to succeed at undoing all changes, after which
   * point it terminates with a `CANCELLED` status. * All other attempts to
   * modify the instance config are rejected. * Reading the instance config via
   * the API continues to give the pre-request values. Upon completion of the
   * returned operation: * Creating instances using the instance configuration
   * uses the new values. * The instance config's new values are readable via
   * the API. * The instance config's reconciling field becomes false. The
   * returned long-running operation will have a name of the format
   * `/operations/` and can be used to track the instance config modification.
   * The metadata field type is UpdateInstanceConfigMetadata. The response field
   * type is InstanceConfig, if successful. Authorization requires
   * `spanner.instanceConfigs.update` permission on the resource name.
   *
   * @param name A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`.
   */
  async projectsInstanceConfigsPatch(name: string, req: UpdateInstanceConfigRequest): Promise<Operation> {
    req = serializeUpdateInstanceConfigRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the backup long-running operations in the given instance. A backup
   * operation has a name of the form
   * `projects//instances//backups//operations/`. The long-running operation
   * metadata field type `metadata.type_url` describes the type of the metadata.
   * Operations returned include those that have completed/failed/canceled
   * within the last 7 days, and pending operations. Operations returned are
   * ordered by `operation.metadata.value.progress.start_time` in descending
   * order starting from the most recently started operation.
   *
   * @param parent Required. The instance of the backup operations. Values are of the form `projects//instances/`.
   */
  async projectsInstancesBackupOperationsList(parent: string, opts: ProjectsInstancesBackupOperationsListOptions = {}): Promise<ListBackupOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backupOperations`);
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
    return data as ListBackupOperationsResponse;
  }

  /**
   * Starts copying a Cloud Spanner Backup. The returned backup long-running
   * operation will have a name of the format
   * `projects//instances//backups//operations/` and can be used to track
   * copying of the backup. The operation is associated with the destination
   * backup. The metadata field type is CopyBackupMetadata. The response field
   * type is Backup, if successful. Cancelling the returned operation will stop
   * the copying and delete the destination backup. Concurrent CopyBackup
   * requests can run on the same source backup.
   *
   * @param parent Required. The name of the destination instance that will contain the backup copy. Values are of the form: `projects//instances/`.
   */
  async projectsInstancesBackupsCopy(parent: string, req: CopyBackupRequest): Promise<Operation> {
    req = serializeCopyBackupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups:copy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts creating a new Cloud Spanner Backup. The returned backup
   * long-running operation will have a name of the format
   * `projects//instances//backups//operations/` and can be used to track
   * creation of the backup. The metadata field type is CreateBackupMetadata.
   * The response field type is Backup, if successful. Cancelling the returned
   * operation will stop the creation and delete the backup. There can be only
   * one pending backup creation per database. Backup creation of different
   * databases can run concurrently.
   *
   * @param parent Required. The name of the instance in which the backup will be created. This must be the same instance that contains the database the backup will be created from. The backup will be stored in the location(s) specified in the instance configuration of this instance. Values are of the form `projects//instances/`.
   */
  async projectsInstancesBackupsCreate(parent: string, req: Backup, opts: ProjectsInstancesBackupsCreateOptions = {}): Promise<Operation> {
    req = serializeBackup(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
    if (opts.backupId !== undefined) {
      url.searchParams.append("backupId", String(opts.backupId));
    }
    if (opts["encryptionConfig.encryptionType"] !== undefined) {
      url.searchParams.append("encryptionConfig.encryptionType", String(opts["encryptionConfig.encryptionType"]));
    }
    if (opts["encryptionConfig.kmsKeyName"] !== undefined) {
      url.searchParams.append("encryptionConfig.kmsKeyName", String(opts["encryptionConfig.kmsKeyName"]));
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
   * Deletes a pending or completed Backup.
   *
   * @param name Required. Name of the backup to delete. Values are of the form `projects//instances//backups/`.
   */
  async projectsInstancesBackupsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets metadata on a pending or completed Backup.
   *
   * @param name Required. Name of the backup. Values are of the form `projects//instances//backups/`.
   */
  async projectsInstancesBackupsGet(name: string): Promise<Backup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBackup(data);
  }

  /**
   * Gets the access control policy for a database or backup resource. Returns
   * an empty policy if a database or backup exists but does not have a policy
   * set. Authorization requires `spanner.databases.getIamPolicy` permission on
   * resource. For backups, authorization requires
   * `spanner.backups.getIamPolicy` permission on resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesBackupsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists completed and pending backups. Backups returned are ordered by
   * `create_time` in descending order, starting from the most recent
   * `create_time`.
   *
   * @param parent Required. The instance to list backups from. Values are of the form `projects//instances/`.
   */
  async projectsInstancesBackupsList(parent: string, opts: ProjectsInstancesBackupsListOptions = {}): Promise<ListBackupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
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
    return deserializeListBackupsResponse(data);
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
  async projectsInstancesBackupsOperationsCancel(name: string): Promise<Empty> {
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
  async projectsInstancesBackupsOperationsDelete(name: string): Promise<Empty> {
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
  async projectsInstancesBackupsOperationsGet(name: string): Promise<Operation> {
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
  async projectsInstancesBackupsOperationsList(name: string, opts: ProjectsInstancesBackupsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Updates a pending or completed Backup.
   *
   * @param name Output only for the CreateBackup operation. Required for the UpdateBackup operation. A globally unique identifier for the backup which cannot be changed. Values are of the form `projects//instances//backups/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. The backup is stored in the location(s) specified in the instance configuration of the instance containing the backup, identified by the prefix of the backup name of the form `projects//instances/`.
   */
  async projectsInstancesBackupsPatch(name: string, req: Backup, opts: ProjectsInstancesBackupsPatchOptions = {}): Promise<Backup> {
    req = serializeBackup(req);
    opts = serializeProjectsInstancesBackupsPatchOptions(opts);
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
    return deserializeBackup(data);
  }

  /**
   * Sets the access control policy on a database or backup resource. Replaces
   * any existing policy. Authorization requires
   * `spanner.databases.setIamPolicy` permission on resource. For backups,
   * authorization requires `spanner.backups.setIamPolicy` permission on
   * resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources.
   */
  async projectsInstancesBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns permissions that the caller has on the specified database or
   * backup resource. Attempting this RPC on a non-existent Cloud Spanner
   * database will result in a NOT_FOUND error if the user has
   * `spanner.databases.list` permission on the containing Cloud Spanner
   * instance. Otherwise returns an empty set of permissions. Calling this
   * method on a backup that does not exist will result in a NOT_FOUND error if
   * the user has `spanner.backups.list` permission on the containing instance.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesBackupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates an instance and begins preparing it to begin serving. The returned
   * long-running operation can be used to track the progress of preparing the
   * new instance. The instance name is assigned by the caller. If the named
   * instance already exists, `CreateInstance` returns `ALREADY_EXISTS`.
   * Immediately upon completion of this request: * The instance is readable via
   * the API, with all requested attributes but no allocated resources. Its
   * state is `CREATING`. Until completion of the returned operation: *
   * Cancelling the operation renders the instance immediately unreadable via
   * the API. * The instance can be deleted. * All other attempts to modify the
   * instance are rejected. Upon completion of the returned operation: * Billing
   * for all successfully-allocated resources begins (some types may have lower
   * than the requested levels). * Databases can be created in the instance. *
   * The instance's allocated resource levels are readable via the API. * The
   * instance's state becomes `READY`. The returned long-running operation will
   * have a name of the format `/operations/` and can be used to track creation
   * of the instance. The metadata field type is CreateInstanceMetadata. The
   * response field type is Instance, if successful.
   *
   * @param parent Required. The name of the project in which to create the instance. Values are of the form `projects/`.
   */
  async projectsInstancesCreate(parent: string, req: CreateInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists database longrunning-operations. A database operation has a name of
   * the form `projects//instances//databases//operations/`. The long-running
   * operation metadata field type `metadata.type_url` describes the type of the
   * metadata. Operations returned include those that have
   * completed/failed/canceled within the last 7 days, and pending operations.
   *
   * @param parent Required. The instance of the database operations. Values are of the form `projects//instances/`.
   */
  async projectsInstancesDatabaseOperationsList(parent: string, opts: ProjectsInstancesDatabaseOperationsListOptions = {}): Promise<ListDatabaseOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databaseOperations`);
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
    return data as ListDatabaseOperationsResponse;
  }

  /**
   * Creates a new Cloud Spanner database and starts to prepare it for serving.
   * The returned long-running operation will have a name of the format
   * `/operations/` and can be used to track preparation of the database. The
   * metadata field type is CreateDatabaseMetadata. The response field type is
   * Database, if successful.
   *
   * @param parent Required. The name of the instance that will serve the new database. Values are of the form `projects//instances/`.
   */
  async projectsInstancesDatabasesCreate(parent: string, req: CreateDatabaseRequest): Promise<Operation> {
    req = serializeCreateDatabaseRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists Cloud Spanner database roles.
   *
   * @param parent Required. The database whose roles should be listed. Values are of the form `projects//instances//databases/`.
   */
  async projectsInstancesDatabasesDatabaseRolesList(parent: string, opts: ProjectsInstancesDatabasesDatabaseRolesListOptions = {}): Promise<ListDatabaseRolesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databaseRoles`);
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
    return data as ListDatabaseRolesResponse;
  }

  /**
   * Returns permissions that the caller has on the specified database or
   * backup resource. Attempting this RPC on a non-existent Cloud Spanner
   * database will result in a NOT_FOUND error if the user has
   * `spanner.databases.list` permission on the containing Cloud Spanner
   * instance. Otherwise returns an empty set of permissions. Calling this
   * method on a backup that does not exist will result in a NOT_FOUND error if
   * the user has `spanner.backups.list` permission on the containing instance.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesDatabasesDatabaseRolesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Drops (aka deletes) a Cloud Spanner database. Completed backups for the
   * database will be retained according to their `expire_time`. Note: Cloud
   * Spanner might continue to accept requests for a few seconds after the
   * database has been deleted.
   *
   * @param database Required. The database to be dropped.
   */
  async projectsInstancesDatabasesDropDatabase(database: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ database }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the state of a Cloud Spanner database.
   *
   * @param name Required. The name of the requested database. Values are of the form `projects//instances//databases/`.
   */
  async projectsInstancesDatabasesGet(name: string): Promise<Database> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Database;
  }

  /**
   * Returns the schema of a Cloud Spanner database as a list of formatted DDL
   * statements. This method does not show pending schema updates, those may be
   * queried using the Operations API.
   *
   * @param database Required. The database whose schema we wish to get. Values are of the form `projects//instances//databases/`
   */
  async projectsInstancesDatabasesGetDdl(database: string): Promise<GetDatabaseDdlResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ database }/ddl`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetDatabaseDdlResponse(data);
  }

  /**
   * Gets the access control policy for a database or backup resource. Returns
   * an empty policy if a database or backup exists but does not have a policy
   * set. Authorization requires `spanner.databases.getIamPolicy` permission on
   * resource. For backups, authorization requires
   * `spanner.backups.getIamPolicy` permission on resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesDatabasesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Request a specific scan with Database-specific data for Cloud Key
   * Visualizer.
   *
   * @param name Required. The unique name of the scan containing the requested information, specific to the Database service implementing this interface.
   */
  async projectsInstancesDatabasesGetScans(name: string, opts: ProjectsInstancesDatabasesGetScansOptions = {}): Promise<Scan> {
    opts = serializeProjectsInstancesDatabasesGetScansOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }/scans`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeScan(data);
  }

  /**
   * Lists Cloud Spanner databases.
   *
   * @param parent Required. The instance whose databases should be listed. Values are of the form `projects//instances/`.
   */
  async projectsInstancesDatabasesList(parent: string, opts: ProjectsInstancesDatabasesListOptions = {}): Promise<ListDatabasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databases`);
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
    return data as ListDatabasesResponse;
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
  async projectsInstancesDatabasesOperationsCancel(name: string): Promise<Empty> {
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
  async projectsInstancesDatabasesOperationsDelete(name: string): Promise<Empty> {
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
  async projectsInstancesDatabasesOperationsGet(name: string): Promise<Operation> {
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
  async projectsInstancesDatabasesOperationsList(name: string, opts: ProjectsInstancesDatabasesOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Create a new database by restoring from a completed backup. The new
   * database must be in the same project and in an instance with the same
   * instance configuration as the instance containing the backup. The returned
   * database long-running operation has a name of the format
   * `projects//instances//databases//operations/`, and can be used to track the
   * progress of the operation, and to cancel it. The metadata field type is
   * RestoreDatabaseMetadata. The response type is Database, if successful.
   * Cancelling the returned operation will stop the restore and delete the
   * database. There can be only one database being restored into an instance at
   * a time. Once the restore operation completes, a new restore operation can
   * be initiated, without waiting for the optimize operation associated with
   * the first restore to complete.
   *
   * @param parent Required. The name of the instance in which to create the restored database. This instance must be in the same project and have the same instance configuration as the instance containing the source backup. Values are of the form `projects//instances/`.
   */
  async projectsInstancesDatabasesRestore(parent: string, req: RestoreDatabaseRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/databases:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates multiple new sessions. This API can be used to initialize a
   * session cache on the clients. See https://goo.gl/TgSFN2 for best practices
   * on session cache management.
   *
   * @param database Required. The database in which the new sessions are created.
   */
  async projectsInstancesDatabasesSessionsBatchCreate(database: string, req: BatchCreateSessionsRequest): Promise<BatchCreateSessionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ database }/sessions:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchCreateSessionsResponse;
  }

  /**
   * Begins a new transaction. This step can often be skipped: Read, ExecuteSql
   * and Commit can begin a new transaction as a side-effect.
   *
   * @param session Required. The session in which the transaction runs.
   */
  async projectsInstancesDatabasesSessionsBeginTransaction(session: string, req: BeginTransactionRequest): Promise<Transaction> {
    req = serializeBeginTransactionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:beginTransaction`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTransaction(data);
  }

  /**
   * Commits a transaction. The request includes the mutations to be applied to
   * rows in the database. `Commit` might return an `ABORTED` error. This can
   * occur at any time; commonly, the cause is conflicts with concurrent
   * transactions. However, it can also happen for a variety of other reasons.
   * If `Commit` returns `ABORTED`, the caller should re-attempt the transaction
   * from the beginning, re-using the same session. On very rare occasions,
   * `Commit` might return `UNKNOWN`. This can happen, for example, if the
   * client job experiences a 1+ hour networking failure. At that point, Cloud
   * Spanner has lost track of the transaction outcome and we recommend that you
   * perform another read from the database to see the state of things as they
   * are now.
   *
   * @param session Required. The session in which the transaction to be committed is running.
   */
  async projectsInstancesDatabasesSessionsCommit(session: string, req: CommitRequest): Promise<CommitResponse> {
    req = serializeCommitRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCommitResponse(data);
  }

  /**
   * Creates a new session. A session can be used to perform transactions that
   * read and/or modify data in a Cloud Spanner database. Sessions are meant to
   * be reused for many consecutive transactions. Sessions can only execute one
   * transaction at a time. To execute multiple concurrent read-write/write-only
   * transactions, create multiple sessions. Note that standalone reads and
   * queries use a transaction internally, and count toward the one transaction
   * limit. Active sessions use additional server resources, so it is a good
   * idea to delete idle and unneeded sessions. Aside from explicit deletes,
   * Cloud Spanner may delete sessions for which no operations are sent for more
   * than an hour. If a session is deleted, requests to it return `NOT_FOUND`.
   * Idle sessions can be kept alive by sending a trivial SQL query
   * periodically, e.g., `"SELECT 1"`.
   *
   * @param database Required. The database in which the new session is created.
   */
  async projectsInstancesDatabasesSessionsCreate(database: string, req: CreateSessionRequest): Promise<Session> {
    const url = new URL(`${this.#baseUrl}v1/${ database }/sessions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Session;
  }

  /**
   * Ends a session, releasing server resources associated with it. This will
   * asynchronously trigger cancellation of any operations that are running with
   * this session.
   *
   * @param name Required. The name of the session to delete.
   */
  async projectsInstancesDatabasesSessionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Executes a batch of SQL DML statements. This method allows many statements
   * to be run with lower latency than submitting them sequentially with
   * ExecuteSql. Statements are executed in sequential order. A request can
   * succeed even if a statement fails. The ExecuteBatchDmlResponse.status field
   * in the response provides information about the statement that failed.
   * Clients must inspect this field to determine whether an error occurred.
   * Execution stops after the first failed statement; the remaining statements
   * are not executed.
   *
   * @param session Required. The session in which the DML statements should be performed.
   */
  async projectsInstancesDatabasesSessionsExecuteBatchDml(session: string, req: ExecuteBatchDmlRequest): Promise<ExecuteBatchDmlResponse> {
    req = serializeExecuteBatchDmlRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:executeBatchDml`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeExecuteBatchDmlResponse(data);
  }

  /**
   * Executes an SQL statement, returning all results in a single reply. This
   * method cannot be used to return a result set larger than 10 MiB; if the
   * query yields more data than that, the query fails with a
   * `FAILED_PRECONDITION` error. Operations inside read-write transactions
   * might return `ABORTED`. If this occurs, the application should restart the
   * transaction from the beginning. See Transaction for more details. Larger
   * result sets can be fetched in streaming fashion by calling
   * ExecuteStreamingSql instead.
   *
   * @param session Required. The session in which the SQL query should be performed.
   */
  async projectsInstancesDatabasesSessionsExecuteSql(session: string, req: ExecuteSqlRequest): Promise<ResultSet> {
    req = serializeExecuteSqlRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:executeSql`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeResultSet(data);
  }

  /**
   * Like ExecuteSql, except returns the result set as a stream. Unlike
   * ExecuteSql, there is no limit on the size of the returned result set.
   * However, no individual row in the result set can exceed 100 MiB, and no
   * column value can exceed 10 MiB.
   *
   * @param session Required. The session in which the SQL query should be performed.
   */
  async projectsInstancesDatabasesSessionsExecuteStreamingSql(session: string, req: ExecuteSqlRequest): Promise<PartialResultSet> {
    req = serializeExecuteSqlRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:executeStreamingSql`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePartialResultSet(data);
  }

  /**
   * Gets a session. Returns `NOT_FOUND` if the session does not exist. This is
   * mainly useful for determining whether a session is still alive.
   *
   * @param name Required. The name of the session to retrieve.
   */
  async projectsInstancesDatabasesSessionsGet(name: string): Promise<Session> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Session;
  }

  /**
   * Lists all sessions in a given database.
   *
   * @param database Required. The database in which to list sessions.
   */
  async projectsInstancesDatabasesSessionsList(database: string, opts: ProjectsInstancesDatabasesSessionsListOptions = {}): Promise<ListSessionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ database }/sessions`);
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
    return data as ListSessionsResponse;
  }

  /**
   * Creates a set of partition tokens that can be used to execute a query
   * operation in parallel. Each of the returned partition tokens can be used by
   * ExecuteStreamingSql to specify a subset of the query result to read. The
   * same session and read-only transaction must be used by the
   * PartitionQueryRequest used to create the partition tokens and the
   * ExecuteSqlRequests that use the partition tokens. Partition tokens become
   * invalid when the session used to create them is deleted, is idle for too
   * long, begins a new transaction, or becomes too old. When any of these
   * happen, it is not possible to resume the query, and the whole operation
   * must be restarted from the beginning.
   *
   * @param session Required. The session used to create the partitions.
   */
  async projectsInstancesDatabasesSessionsPartitionQuery(session: string, req: PartitionQueryRequest): Promise<PartitionResponse> {
    req = serializePartitionQueryRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:partitionQuery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePartitionResponse(data);
  }

  /**
   * Creates a set of partition tokens that can be used to execute a read
   * operation in parallel. Each of the returned partition tokens can be used by
   * StreamingRead to specify a subset of the read result to read. The same
   * session and read-only transaction must be used by the PartitionReadRequest
   * used to create the partition tokens and the ReadRequests that use the
   * partition tokens. There are no ordering guarantees on rows returned among
   * the returned partition tokens, or even within each individual StreamingRead
   * call issued with a partition_token. Partition tokens become invalid when
   * the session used to create them is deleted, is idle for too long, begins a
   * new transaction, or becomes too old. When any of these happen, it is not
   * possible to resume the read, and the whole operation must be restarted from
   * the beginning.
   *
   * @param session Required. The session used to create the partitions.
   */
  async projectsInstancesDatabasesSessionsPartitionRead(session: string, req: PartitionReadRequest): Promise<PartitionResponse> {
    req = serializePartitionReadRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:partitionRead`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePartitionResponse(data);
  }

  /**
   * Reads rows from the database using key lookups and scans, as a simple
   * key/value style alternative to ExecuteSql. This method cannot be used to
   * return a result set larger than 10 MiB; if the read matches more data than
   * that, the read fails with a `FAILED_PRECONDITION` error. Reads inside
   * read-write transactions might return `ABORTED`. If this occurs, the
   * application should restart the transaction from the beginning. See
   * Transaction for more details. Larger result sets can be yielded in
   * streaming fashion by calling StreamingRead instead.
   *
   * @param session Required. The session in which the read should be performed.
   */
  async projectsInstancesDatabasesSessionsRead(session: string, req: ReadRequest): Promise<ResultSet> {
    req = serializeReadRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:read`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeResultSet(data);
  }

  /**
   * Rolls back a transaction, releasing any locks it holds. It is a good idea
   * to call this for any transaction that includes one or more Read or
   * ExecuteSql requests and ultimately decides not to commit. `Rollback`
   * returns `OK` if it successfully aborts the transaction, the transaction was
   * already aborted, or the transaction is not found. `Rollback` never returns
   * `ABORTED`.
   *
   * @param session Required. The session in which the transaction to roll back is running.
   */
  async projectsInstancesDatabasesSessionsRollback(session: string, req: RollbackRequest): Promise<Empty> {
    req = serializeRollbackRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Like Read, except returns the result set as a stream. Unlike Read, there
   * is no limit on the size of the returned result set. However, no individual
   * row in the result set can exceed 100 MiB, and no column value can exceed 10
   * MiB.
   *
   * @param session Required. The session in which the read should be performed.
   */
  async projectsInstancesDatabasesSessionsStreamingRead(session: string, req: ReadRequest): Promise<PartialResultSet> {
    req = serializeReadRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ session }:streamingRead`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePartialResultSet(data);
  }

  /**
   * Sets the access control policy on a database or backup resource. Replaces
   * any existing policy. Authorization requires
   * `spanner.databases.setIamPolicy` permission on resource. For backups,
   * authorization requires `spanner.backups.setIamPolicy` permission on
   * resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources.
   */
  async projectsInstancesDatabasesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns permissions that the caller has on the specified database or
   * backup resource. Attempting this RPC on a non-existent Cloud Spanner
   * database will result in a NOT_FOUND error if the user has
   * `spanner.databases.list` permission on the containing Cloud Spanner
   * instance. Otherwise returns an empty set of permissions. Calling this
   * method on a backup that does not exist will result in a NOT_FOUND error if
   * the user has `spanner.backups.list` permission on the containing instance.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesDatabasesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates the schema of a Cloud Spanner database by
   * creating/altering/dropping tables, columns, indexes, etc. The returned
   * long-running operation will have a name of the format `/operations/` and
   * can be used to track execution of the schema change(s). The metadata field
   * type is UpdateDatabaseDdlMetadata. The operation has no response.
   *
   * @param database Required. The database to update.
   */
  async projectsInstancesDatabasesUpdateDdl(database: string, req: UpdateDatabaseDdlRequest): Promise<Operation> {
    req = serializeUpdateDatabaseDdlRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ database }/ddl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an instance. Immediately upon completion of the request: * Billing
   * ceases for all of the instance's reserved resources. Soon afterward: * The
   * instance and *all of its databases* immediately and irrevocably disappear
   * from the API. All data in the databases is permanently deleted.
   *
   * @param name Required. The name of the instance to be deleted. Values are of the form `projects//instances/`
   */
  async projectsInstancesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information about a particular instance.
   *
   * @param name Required. The name of the requested instance. Values are of the form `projects//instances/`.
   */
  async projectsInstancesGet(name: string, opts: ProjectsInstancesGetOptions = {}): Promise<Instance> {
    opts = serializeProjectsInstancesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Instance;
  }

  /**
   * Gets the access control policy for an instance resource. Returns an empty
   * policy if an instance exists but does not have a policy set. Authorization
   * requires `spanner.instances.getIamPolicy` on resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all instances in the given project.
   *
   * @param parent Required. The name of the project for which a list of instances is requested. Values are of the form `projects/`.
   */
  async projectsInstancesList(parent: string, opts: ProjectsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    opts = serializeProjectsInstancesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.instanceDeadline !== undefined) {
      url.searchParams.append("instanceDeadline", String(opts.instanceDeadline));
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
    return data as ListInstancesResponse;
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
  async projectsInstancesOperationsCancel(name: string): Promise<Empty> {
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
  async projectsInstancesOperationsDelete(name: string): Promise<Empty> {
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
  async projectsInstancesOperationsGet(name: string): Promise<Operation> {
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
  async projectsInstancesOperationsList(name: string, opts: ProjectsInstancesOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Updates an instance, and begins allocating or releasing resources as
   * requested. The returned long-running operation can be used to track the
   * progress of updating the instance. If the named instance does not exist,
   * returns `NOT_FOUND`. Immediately upon completion of this request: * For
   * resource types for which a decrease in the instance's allocation has been
   * requested, billing is based on the newly-requested level. Until completion
   * of the returned operation: * Cancelling the operation sets its metadata's
   * cancel_time, and begins restoring resources to their pre-request values.
   * The operation is guaranteed to succeed at undoing all resource changes,
   * after which point it terminates with a `CANCELLED` status. * All other
   * attempts to modify the instance are rejected. * Reading the instance via
   * the API continues to give the pre-request resource levels. Upon completion
   * of the returned operation: * Billing begins for all successfully-allocated
   * resources (some types may have lower than the requested levels). * All
   * newly-reserved resources are available for serving the instance's tables. *
   * The instance's new resource levels are readable via the API. The returned
   * long-running operation will have a name of the format `/operations/` and
   * can be used to track the instance modification. The metadata field type is
   * UpdateInstanceMetadata. The response field type is Instance, if successful.
   * Authorization requires `spanner.instances.update` permission on the
   * resource name.
   *
   * @param name Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length.
   */
  async projectsInstancesPatch(name: string, req: UpdateInstanceRequest): Promise<Operation> {
    req = serializeUpdateInstanceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * existing policy. Authorization requires `spanner.instances.setIamPolicy` on
   * resource.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which the policy is being set. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for databases resources.
   */
  async projectsInstancesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns permissions that the caller has on the specified instance
   * resource. Attempting this RPC on a non-existent Cloud Spanner instance
   * resource will result in a NOT_FOUND error if the user has
   * `spanner.instances.list` permission on the containing Google Cloud Project.
   * Otherwise returns an empty set of permissions.
   *
   * @param resource REQUIRED: The Cloud Spanner resource for which permissions are being tested. The format is `projects//instances/` for instance resources and `projects//instances//databases/` for database resources.
   */
  async projectsInstancesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Return available scans given a Database-specific resource name.
   *
   * @param parent Required. The unique name of the parent resource, specific to the Database service implementing this interface.
   */
  async scansList(parent: string, opts: ScansListOptions = {}): Promise<ListScansResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeListScansResponse(data);
  }
}

/**
 * A backup of a Cloud Spanner database.
 */
export interface Backup {
  /**
   * Output only. The time the CreateBackup request is received. If the request
   * does not specify `version_time`, the `version_time` of the backup will be
   * equivalent to the `create_time`.
   */
  readonly createTime?: Date;
  /**
   * Required for the CreateBackup operation. Name of the database from which
   * this backup was created. This needs to be in the same instance as the
   * backup. Values are of the form `projects//instances//databases/`.
   */
  database?: string;
  /**
   * Output only. The database dialect information for the backup.
   */
  readonly databaseDialect?:  | "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL";
  /**
   * Output only. The encryption information for the backup.
   */
  readonly encryptionInfo?: EncryptionInfo;
  /**
   * Required for the CreateBackup operation. The expiration time of the
   * backup, with microseconds granularity that must be at least 6 hours and at
   * most 366 days from the time the CreateBackup request is processed. Once the
   * `expire_time` has passed, the backup is eligible to be automatically
   * deleted by Cloud Spanner to free the resources used by the backup.
   */
  expireTime?: Date;
  /**
   * Output only. The max allowed expiration time of the backup, with
   * microseconds granularity. A backup's expiration time can be configured in
   * multiple APIs: CreateBackup, UpdateBackup, CopyBackup. When updating or
   * copying an existing backup, the expiration time specified must be less than
   * `Backup.max_expire_time`.
   */
  readonly maxExpireTime?: Date;
  /**
   * Output only for the CreateBackup operation. Required for the UpdateBackup
   * operation. A globally unique identifier for the backup which cannot be
   * changed. Values are of the form `projects//instances//backups/a-z*[a-z0-9]`
   * The final segment of the name must be between 2 and 60 characters in
   * length. The backup is stored in the location(s) specified in the instance
   * configuration of the instance containing the backup, identified by the
   * prefix of the backup name of the form `projects//instances/`.
   */
  name?: string;
  /**
   * Output only. The names of the destination backups being created by copying
   * this source backup. The backup names are of the form
   * `projects//instances//backups/`. Referencing backups may exist in different
   * instances. The existence of any referencing backup prevents the backup from
   * being deleted. When the copy operation is done (either successfully
   * completed or cancelled or the destination backup is deleted), the reference
   * to the backup is removed.
   */
  readonly referencingBackups?: string[];
  /**
   * Output only. The names of the restored databases that reference the
   * backup. The database names are of the form
   * `projects//instances//databases/`. Referencing databases may exist in
   * different instances. The existence of any referencing database prevents the
   * backup from being deleted. When a restored database from the backup enters
   * the `READY` state, the reference to the backup is removed.
   */
  readonly referencingDatabases?: string[];
  /**
   * Output only. Size of the backup in bytes.
   */
  readonly sizeBytes?: bigint;
  /**
   * Output only. The current state of the backup.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY";
  /**
   * The backup will contain an externally consistent copy of the database at
   * the timestamp specified by `version_time`. If `version_time` is not
   * specified, the system will set `version_time` to the `create_time` of the
   * backup.
   */
  versionTime?: Date;
}

function serializeBackup(data: any): Backup {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    versionTime: data["versionTime"] !== undefined ? data["versionTime"].toISOString() : undefined,
  };
}

function deserializeBackup(data: any): Backup {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    maxExpireTime: data["maxExpireTime"] !== undefined ? new Date(data["maxExpireTime"]) : undefined,
    sizeBytes: data["sizeBytes"] !== undefined ? BigInt(data["sizeBytes"]) : undefined,
    versionTime: data["versionTime"] !== undefined ? new Date(data["versionTime"]) : undefined,
  };
}

/**
 * Information about a backup.
 */
export interface BackupInfo {
  /**
   * Name of the backup.
   */
  backup?: string;
  /**
   * The time the CreateBackup request was received.
   */
  createTime?: Date;
  /**
   * Name of the database the backup was created from.
   */
  sourceDatabase?: string;
  /**
   * The backup contains an externally consistent copy of `source_database` at
   * the timestamp specified by `version_time`. If the CreateBackup request did
   * not specify `version_time`, the `version_time` of the backup is equivalent
   * to the `create_time`.
   */
  versionTime?: Date;
}

function serializeBackupInfo(data: any): BackupInfo {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    versionTime: data["versionTime"] !== undefined ? data["versionTime"].toISOString() : undefined,
  };
}

function deserializeBackupInfo(data: any): BackupInfo {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    versionTime: data["versionTime"] !== undefined ? new Date(data["versionTime"]) : undefined,
  };
}

/**
 * The request for BatchCreateSessions.
 */
export interface BatchCreateSessionsRequest {
  /**
   * Required. The number of sessions to be created in this batch call. The API
   * may return fewer than the requested number of sessions. If a specific
   * number of sessions are desired, the client can make additional calls to
   * BatchCreateSessions (adjusting session_count as necessary).
   */
  sessionCount?: number;
  /**
   * Parameters to be applied to each created session.
   */
  sessionTemplate?: Session;
}

/**
 * The response for BatchCreateSessions.
 */
export interface BatchCreateSessionsResponse {
  /**
   * The freshly created sessions.
   */
  session?: Session[];
}

/**
 * The request for BeginTransaction.
 */
export interface BeginTransactionRequest {
  /**
   * Required. Options for the new transaction.
   */
  options?: TransactionOptions;
  /**
   * Common options for this request. Priority is ignored for this request.
   * Setting the priority in this request_options struct will not do anything.
   * To set the priority for a transaction, set it on the reads and writes that
   * are part of this transaction instead.
   */
  requestOptions?: RequestOptions;
}

function serializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? serializeTransactionOptions(data["options"]) : undefined,
  };
}

function deserializeBeginTransactionRequest(data: any): BeginTransactionRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? deserializeTransactionOptions(data["options"]) : undefined,
  };
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
 * Metadata associated with a parent-child relationship appearing in a
 * PlanNode.
 */
export interface ChildLink {
  /**
   * The node to which the link points.
   */
  childIndex?: number;
  /**
   * The type of the link. For example, in Hash Joins this could be used to
   * distinguish between the build child and the probe child, or in the case of
   * the child being an output variable, to represent the tag associated with
   * the output variable.
   */
  type?: string;
  /**
   * Only present if the child node is SCALAR and corresponds to an output
   * variable of the parent node. The field carries the name of the output
   * variable. For example, a `TableScan` operator that reads rows from a table
   * will have child links to the `SCALAR` nodes representing the output
   * variables created for each column that is read by the operator. The
   * corresponding `variable` fields will be set to the variable names assigned
   * to the columns.
   */
  variable?: string;
}

/**
 * The request for Commit.
 */
export interface CommitRequest {
  /**
   * The mutations to be executed when this transaction commits. All mutations
   * are applied atomically, in the order they appear in this list.
   */
  mutations?: Mutation[];
  /**
   * Common options for this request.
   */
  requestOptions?: RequestOptions;
  /**
   * If `true`, then statistics related to the transaction will be included in
   * the CommitResponse. Default value is `false`.
   */
  returnCommitStats?: boolean;
  /**
   * Execute mutations in a temporary transaction. Note that unlike commit of a
   * previously-started transaction, commit with a temporary transaction is
   * non-idempotent. That is, if the `CommitRequest` is sent to Cloud Spanner
   * more than once (for instance, due to retries in the application, or in the
   * transport library), it is possible that the mutations are executed more
   * than once. If this is undesirable, use BeginTransaction and Commit instead.
   */
  singleUseTransaction?: TransactionOptions;
  /**
   * Commit a previously-started transaction.
   */
  transactionId?: Uint8Array;
}

function serializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    singleUseTransaction: data["singleUseTransaction"] !== undefined ? serializeTransactionOptions(data["singleUseTransaction"]) : undefined,
    transactionId: data["transactionId"] !== undefined ? encodeBase64(data["transactionId"]) : undefined,
  };
}

function deserializeCommitRequest(data: any): CommitRequest {
  return {
    ...data,
    singleUseTransaction: data["singleUseTransaction"] !== undefined ? deserializeTransactionOptions(data["singleUseTransaction"]) : undefined,
    transactionId: data["transactionId"] !== undefined ? decodeBase64(data["transactionId"] as string) : undefined,
  };
}

/**
 * The response for Commit.
 */
export interface CommitResponse {
  /**
   * The statistics about this Commit. Not returned by default. For more
   * information, see CommitRequest.return_commit_stats.
   */
  commitStats?: CommitStats;
  /**
   * The Cloud Spanner timestamp at which the transaction committed.
   */
  commitTimestamp?: Date;
}

function serializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitStats: data["commitStats"] !== undefined ? serializeCommitStats(data["commitStats"]) : undefined,
    commitTimestamp: data["commitTimestamp"] !== undefined ? data["commitTimestamp"].toISOString() : undefined,
  };
}

function deserializeCommitResponse(data: any): CommitResponse {
  return {
    ...data,
    commitStats: data["commitStats"] !== undefined ? deserializeCommitStats(data["commitStats"]) : undefined,
    commitTimestamp: data["commitTimestamp"] !== undefined ? new Date(data["commitTimestamp"]) : undefined,
  };
}

/**
 * Additional statistics about a commit.
 */
export interface CommitStats {
  /**
   * The total number of mutations for the transaction. Knowing the
   * `mutation_count` value can help you maximize the number of mutations in a
   * transaction and minimize the number of API round trips. You can also
   * monitor this value to prevent transactions from exceeding the system
   * [limit](https://cloud.google.com/spanner/quotas#limits_for_creating_reading_updating_and_deleting_data).
   * If the number of mutations exceeds the limit, the server returns
   * [INVALID_ARGUMENT](https://cloud.google.com/spanner/docs/reference/rest/v1/Code#ENUM_VALUES.INVALID_ARGUMENT).
   */
  mutationCount?: bigint;
}

function serializeCommitStats(data: any): CommitStats {
  return {
    ...data,
    mutationCount: data["mutationCount"] !== undefined ? String(data["mutationCount"]) : undefined,
  };
}

function deserializeCommitStats(data: any): CommitStats {
  return {
    ...data,
    mutationCount: data["mutationCount"] !== undefined ? BigInt(data["mutationCount"]) : undefined,
  };
}

/**
 * A message representing context for a KeyRangeInfo, including a label, value,
 * unit, and severity.
 */
export interface ContextValue {
  /**
   * The label for the context value. e.g. "latency".
   */
  label?: LocalizedString;
  /**
   * The severity of this context.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | "FATAL";
  /**
   * The unit of the context value.
   */
  unit?: string;
  /**
   * The value for the context.
   */
  value?: number;
}

/**
 * Encryption configuration for the copied backup.
 */
export interface CopyBackupEncryptionConfig {
  /**
   * Required. The encryption type of the backup.
   */
  encryptionType?:  | "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION";
  /**
   * Optional. The Cloud KMS key that will be used to protect the backup. This
   * field should be set only when encryption_type is
   * `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form
   * `projects//locations//keyRings//cryptoKeys/`.
   */
  kmsKeyName?: string;
}

/**
 * Metadata type for the operation returned by CopyBackup.
 */
export interface CopyBackupMetadata {
  /**
   * The time at which cancellation of CopyBackup operation was received.
   * Operations.CancelOperation starts asynchronous cancellation on a
   * long-running operation. The server makes a best effort to cancel the
   * operation, but success is not guaranteed. Clients can use
   * Operations.GetOperation or other methods to check whether the cancellation
   * succeeded or whether the operation completed despite cancellation. On
   * successful cancellation, the operation is not deleted; instead, it becomes
   * an operation with an Operation.error value with a google.rpc.Status.code of
   * 1, corresponding to `Code.CANCELLED`.
   */
  cancelTime?: Date;
  /**
   * The name of the backup being created through the copy operation. Values
   * are of the form `projects//instances//backups/`.
   */
  name?: string;
  /**
   * The progress of the CopyBackup operation.
   */
  progress?: OperationProgress;
  /**
   * The name of the source backup that is being copied. Values are of the form
   * `projects//instances//backups/`.
   */
  sourceBackup?: string;
}

function serializeCopyBackupMetadata(data: any): CopyBackupMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeCopyBackupMetadata(data: any): CopyBackupMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for CopyBackup.
 */
export interface CopyBackupRequest {
  /**
   * Required. The id of the backup copy. The `backup_id` appended to `parent`
   * forms the full backup_uri of the form `projects//instances//backups/`.
   */
  backupId?: string;
  /**
   * Optional. The encryption configuration used to encrypt the backup. If this
   * field is not specified, the backup will use the same encryption
   * configuration as the source backup by default, namely encryption_type =
   * `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`.
   */
  encryptionConfig?: CopyBackupEncryptionConfig;
  /**
   * Required. The expiration time of the backup in microsecond granularity.
   * The expiration time must be at least 6 hours and at most 366 days from the
   * `create_time` of the source backup. Once the `expire_time` has passed, the
   * backup is eligible to be automatically deleted by Cloud Spanner to free the
   * resources used by the backup.
   */
  expireTime?: Date;
  /**
   * Required. The source backup to be copied. The source backup needs to be in
   * READY state for it to be copied. Once CopyBackup is in progress, the source
   * backup cannot be deleted or cleaned up on expiration until CopyBackup is
   * finished. Values are of the form: `projects//instances//backups/`.
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
   * The time at which cancellation of this operation was received.
   * Operations.CancelOperation starts asynchronous cancellation on a
   * long-running operation. The server makes a best effort to cancel the
   * operation, but success is not guaranteed. Clients can use
   * Operations.GetOperation or other methods to check whether the cancellation
   * succeeded or whether the operation completed despite cancellation. On
   * successful cancellation, the operation is not deleted; instead, it becomes
   * an operation with an Operation.error value with a google.rpc.Status.code of
   * 1, corresponding to `Code.CANCELLED`.
   */
  cancelTime?: Date;
  /**
   * The name of the database the backup is created from.
   */
  database?: string;
  /**
   * The name of the backup being created.
   */
  name?: string;
  /**
   * The progress of the CreateBackup operation.
   */
  progress?: OperationProgress;
}

function serializeCreateBackupMetadata(data: any): CreateBackupMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeCreateBackupMetadata(data: any): CreateBackupMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * Metadata type for the operation returned by CreateDatabase.
 */
export interface CreateDatabaseMetadata {
  /**
   * The database being created.
   */
  database?: string;
}

/**
 * The request for CreateDatabase.
 */
export interface CreateDatabaseRequest {
  /**
   * Required. A `CREATE DATABASE` statement, which specifies the ID of the new
   * database. The database ID must conform to the regular expression
   * `a-z*[a-z0-9]` and be between 2 and 30 characters in length. If the
   * database ID is a reserved word or if it contains a hyphen, the database ID
   * must be enclosed in backticks (`` ` ``).
   */
  createStatement?: string;
  /**
   * Optional. The dialect of the Cloud Spanner Database.
   */
  databaseDialect?:  | "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL";
  /**
   * Optional. The encryption configuration for the database. If this field is
   * not specified, Cloud Spanner will encrypt/decrypt all data at rest using
   * Google default encryption.
   */
  encryptionConfig?: EncryptionConfig;
  /**
   * Optional. A list of DDL statements to run inside the newly created
   * database. Statements can create tables, indexes, etc. These statements
   * execute atomically with the creation of the database: if there is an error
   * in any statement, the database is not created.
   */
  extraStatements?: string[];
  /**
   * Optional. Proto descriptors used by CREATE/ALTER PROTO BUNDLE statements
   * in 'extra_statements' above. Contains a protobuf-serialized
   * [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
   * To generate it, [install](https://grpc.io/docs/protoc-installation/) and
   * run `protoc` with --include_imports and --descriptor_set_out. For example,
   * to generate for moon/shot/app.proto, run """ $protoc --proto_path=/app_path
   * --proto_path=/lib_path \ --include_imports \
   * --descriptor_set_out=descriptors.data \ moon/shot/app.proto """ For more
   * details, see protobuffer [self
   * description](https://developers.google.com/protocol-buffers/docs/techniques#self-description).
   */
  protoDescriptors?: Uint8Array;
}

function serializeCreateDatabaseRequest(data: any): CreateDatabaseRequest {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? encodeBase64(data["protoDescriptors"]) : undefined,
  };
}

function deserializeCreateDatabaseRequest(data: any): CreateDatabaseRequest {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? decodeBase64(data["protoDescriptors"] as string) : undefined,
  };
}

/**
 * Metadata type for the operation returned by CreateInstanceConfig.
 */
export interface CreateInstanceConfigMetadata {
  /**
   * The time at which this operation was cancelled.
   */
  cancelTime?: Date;
  /**
   * The target instance config end state.
   */
  instanceConfig?: InstanceConfig;
  /**
   * The progress of the CreateInstanceConfig operation.
   */
  progress?: InstanceOperationProgress;
}

function serializeCreateInstanceConfigMetadata(data: any): CreateInstanceConfigMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    progress: data["progress"] !== undefined ? serializeInstanceOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeCreateInstanceConfigMetadata(data: any): CreateInstanceConfigMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    progress: data["progress"] !== undefined ? deserializeInstanceOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for CreateInstanceConfigRequest.
 */
export interface CreateInstanceConfigRequest {
  /**
   * Required. The InstanceConfig proto of the configuration to create.
   * instance_config.name must be `/instanceConfigs/`.
   * instance_config.base_config must be a Google managed configuration name,
   * e.g. /instanceConfigs/us-east1, /instanceConfigs/nam3.
   */
  instanceConfig?: InstanceConfig;
  /**
   * Required. The ID of the instance config to create. Valid identifiers are
   * of the form `custom-[-a-z0-9]*[a-z0-9]` and must be between 2 and 64
   * characters in length. The `custom-` prefix is required to avoid name
   * conflicts with Google managed configurations.
   */
  instanceConfigId?: string;
  /**
   * An option to validate, but not actually execute, a request, and provide
   * the same response.
   */
  validateOnly?: boolean;
}

/**
 * Metadata type for the operation returned by CreateInstance.
 */
export interface CreateInstanceMetadata {
  /**
   * The time at which this operation was cancelled. If set, this operation is
   * in the process of undoing itself (which is guaranteed to succeed) and
   * cannot be cancelled again.
   */
  cancelTime?: Date;
  /**
   * The time at which this operation failed or was completed successfully.
   */
  endTime?: Date;
  /**
   * The instance being created.
   */
  instance?: Instance;
  /**
   * The time at which the CreateInstance request was received.
   */
  startTime?: Date;
}

function serializeCreateInstanceMetadata(data: any): CreateInstanceMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCreateInstanceMetadata(data: any): CreateInstanceMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The request for CreateInstance.
 */
export interface CreateInstanceRequest {
  /**
   * Required. The instance to create. The name may be omitted, but if
   * specified must be `/instances/`.
   */
  instance?: Instance;
  /**
   * Required. The ID of the instance to create. Valid identifiers are of the
   * form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length.
   */
  instanceId?: string;
}

/**
 * The request for CreateSession.
 */
export interface CreateSessionRequest {
  /**
   * Required. The session to create.
   */
  session?: Session;
}

/**
 * A Cloud Spanner database.
 */
export interface Database {
  /**
   * Output only. If exists, the time at which the database creation started.
   */
  readonly createTime?: Date;
  /**
   * Output only. The dialect of the Cloud Spanner Database.
   */
  readonly databaseDialect?:  | "DATABASE_DIALECT_UNSPECIFIED" | "GOOGLE_STANDARD_SQL" | "POSTGRESQL";
  /**
   * Output only. The read-write region which contains the database's leader
   * replicas. This is the same as the value of default_leader database option
   * set using DatabaseAdmin.CreateDatabase or DatabaseAdmin.UpdateDatabaseDdl.
   * If not explicitly set, this is empty.
   */
  readonly defaultLeader?: string;
  /**
   * Output only. Earliest timestamp at which older versions of the data can be
   * read. This value is continuously updated by Cloud Spanner and becomes stale
   * the moment it is queried. If you are using this value to recover data, make
   * sure to account for the time from the moment when the value is queried to
   * the moment when you initiate the recovery.
   */
  readonly earliestVersionTime?: Date;
  /**
   * Output only. For databases that are using customer managed encryption,
   * this field contains the encryption configuration for the database. For
   * databases that are using Google default or other types of encryption, this
   * field is empty.
   */
  readonly encryptionConfig?: EncryptionConfig;
  /**
   * Output only. For databases that are using customer managed encryption,
   * this field contains the encryption information for the database, such as
   * all Cloud KMS key versions that are in use. The `encryption_status' field
   * inside of each `EncryptionInfo` is not populated. For databases that are
   * using Google default or other types of encryption, this field is empty.
   * This field is propagated lazily from the backend. There might be a delay
   * from when a key version is being used and when it appears in this field.
   */
  readonly encryptionInfo?: EncryptionInfo[];
  /**
   * Required. The name of the database. Values are of the form
   * `projects//instances//databases/`, where `` is as specified in the `CREATE
   * DATABASE` statement. This name can be passed to other API methods to
   * identify the database.
   */
  name?: string;
  /**
   * Output only. Applicable only for restored databases. Contains information
   * about the restore source.
   */
  readonly restoreInfo?: RestoreInfo;
  /**
   * Output only. The current database state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "READY_OPTIMIZING";
  /**
   * Output only. The period in which Cloud Spanner retains all versions of
   * data for the database. This is the same as the value of
   * version_retention_period database option set using UpdateDatabaseDdl.
   * Defaults to 1 hour, if not set.
   */
  readonly versionRetentionPeriod?: string;
}

/**
 * A Cloud Spanner database role.
 */
export interface DatabaseRole {
  /**
   * Required. The name of the database role. Values are of the form
   * `projects//instances//databases//databaseRoles/` where `` is as specified
   * in the `CREATE ROLE` DDL statement.
   */
  name?: string;
}

/**
 * Arguments to delete operations.
 */
export interface Delete {
  /**
   * Required. The primary keys of the rows within table to delete. The primary
   * keys must be specified in the order in which they appear in the `PRIMARY
   * KEY()` clause of the table's equivalent DDL statement (the DDL statement
   * used to create the table). Delete is idempotent. The transaction will
   * succeed even if some or all rows do not exist.
   */
  keySet?: KeySet;
  /**
   * Required. The table whose rows will be deleted.
   */
  table?: string;
}

/**
 * A message representing a derived metric.
 */
export interface DerivedMetric {
  /**
   * The name of the denominator metric. e.g. "rows".
   */
  denominator?: LocalizedString;
  /**
   * The name of the numerator metric. e.g. "latency".
   */
  numerator?: LocalizedString;
}

/**
 * A message representing the key visualizer diagnostic messages.
 */
export interface DiagnosticMessage {
  /**
   * Information about this diagnostic information.
   */
  info?: LocalizedString;
  /**
   * The metric.
   */
  metric?: LocalizedString;
  /**
   * Whether this message is specific only for the current metric. By default
   * Diagnostics are shown for all metrics, regardless which metric is the
   * currently selected metric in the UI. However occasionally a metric will
   * generate so many messages that the resulting visual clutter becomes
   * overwhelming. In this case setting this to true, will show the diagnostic
   * messages for that metric only if it is the currently selected metric.
   */
  metricSpecific?: boolean;
  /**
   * The severity of the diagnostic message.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | "FATAL";
  /**
   * The short message.
   */
  shortMessage?: LocalizedString;
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
 * Encryption configuration for a Cloud Spanner database.
 */
export interface EncryptionConfig {
  /**
   * The Cloud KMS key to be used for encrypting and decrypting the database.
   * Values are of the form `projects//locations//keyRings//cryptoKeys/`.
   */
  kmsKeyName?: string;
}

/**
 * Encryption information for a Cloud Spanner database or backup.
 */
export interface EncryptionInfo {
  /**
   * Output only. If present, the status of a recent encrypt/decrypt call on
   * underlying data for this database or backup. Regardless of status, data is
   * always encrypted at rest.
   */
  readonly encryptionStatus?: Status;
  /**
   * Output only. The type of encryption.
   */
  readonly encryptionType?:  | "TYPE_UNSPECIFIED" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION";
  /**
   * Output only. A Cloud KMS key version that is being used to protect the
   * database or backup.
   */
  readonly kmsKeyVersion?: string;
}

/**
 * The request for ExecuteBatchDml.
 */
export interface ExecuteBatchDmlRequest {
  /**
   * Common options for this request.
   */
  requestOptions?: RequestOptions;
  /**
   * Required. A per-transaction sequence number used to identify this request.
   * This field makes each request idempotent such that if the request is
   * received multiple times, at most one will succeed. The sequence number must
   * be monotonically increasing within the transaction. If a request arrives
   * for the first time with an out-of-order sequence number, the transaction
   * may be aborted. Replays of previously handled requests will yield the same
   * response as the first execution.
   */
  seqno?: bigint;
  /**
   * Required. The list of statements to execute in this batch. Statements are
   * executed serially, such that the effects of statement `i` are visible to
   * statement `i+1`. Each statement must be a DML statement. Execution stops at
   * the first failed statement; the remaining statements are not executed.
   * Callers must provide at least one statement.
   */
  statements?: Statement[];
  /**
   * Required. The transaction to use. Must be a read-write transaction. To
   * protect against replays, single-use transactions are not supported. The
   * caller must either supply an existing transaction ID or begin a new
   * transaction.
   */
  transaction?: TransactionSelector;
}

function serializeExecuteBatchDmlRequest(data: any): ExecuteBatchDmlRequest {
  return {
    ...data,
    seqno: data["seqno"] !== undefined ? String(data["seqno"]) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransactionSelector(data["transaction"]) : undefined,
  };
}

function deserializeExecuteBatchDmlRequest(data: any): ExecuteBatchDmlRequest {
  return {
    ...data,
    seqno: data["seqno"] !== undefined ? BigInt(data["seqno"]) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransactionSelector(data["transaction"]) : undefined,
  };
}

/**
 * The response for ExecuteBatchDml. Contains a list of ResultSet messages, one
 * for each DML statement that has successfully executed, in the same order as
 * the statements in the request. If a statement fails, the status in the
 * response body identifies the cause of the failure. To check for DML
 * statements that failed, use the following approach: 1. Check the status in
 * the response message. The google.rpc.Code enum value `OK` indicates that all
 * statements were executed successfully. 2. If the status was not `OK`, check
 * the number of result sets in the response. If the response contains `N`
 * ResultSet messages, then statement `N+1` in the request failed. Example 1: *
 * Request: 5 DML statements, all executed successfully. * Response: 5 ResultSet
 * messages, with the status `OK`. Example 2: * Request: 5 DML statements. The
 * third statement has a syntax error. * Response: 2 ResultSet messages, and a
 * syntax error (`INVALID_ARGUMENT`) status. The number of ResultSet messages
 * indicates that the third statement failed, and the fourth and fifth
 * statements were not executed.
 */
export interface ExecuteBatchDmlResponse {
  /**
   * One ResultSet for each statement in the request that ran successfully, in
   * the same order as the statements in the request. Each ResultSet does not
   * contain any rows. The ResultSetStats in each ResultSet contain the number
   * of rows modified by the statement. Only the first ResultSet in the response
   * contains valid ResultSetMetadata.
   */
  resultSets?: ResultSet[];
  /**
   * If all DML statements are executed successfully, the status is `OK`.
   * Otherwise, the error status of the first failed statement.
   */
  status?: Status;
}

function serializeExecuteBatchDmlResponse(data: any): ExecuteBatchDmlResponse {
  return {
    ...data,
    resultSets: data["resultSets"] !== undefined ? data["resultSets"].map((item: any) => (serializeResultSet(item))) : undefined,
  };
}

function deserializeExecuteBatchDmlResponse(data: any): ExecuteBatchDmlResponse {
  return {
    ...data,
    resultSets: data["resultSets"] !== undefined ? data["resultSets"].map((item: any) => (deserializeResultSet(item))) : undefined,
  };
}

/**
 * The request for ExecuteSql and ExecuteStreamingSql.
 */
export interface ExecuteSqlRequest {
  /**
   * Parameter names and values that bind to placeholders in the SQL string. A
   * parameter placeholder consists of the `@` character followed by the
   * parameter name (for example, `@firstName`). Parameter names must conform to
   * the naming requirements of identifiers as specified at
   * https://cloud.google.com/spanner/docs/lexical#identifiers. Parameters can
   * appear anywhere that a literal value is expected. The same parameter name
   * can be used more than once, for example: `"WHERE id > @msg_id AND id <
   * @msg_id + 100"` It is an error to execute a SQL statement with unbound
   * parameters.
   */
  params?: {
    [key: string]: any
  };
  /**
   * It is not always possible for Cloud Spanner to infer the right SQL type
   * from a JSON value. For example, values of type `BYTES` and values of type
   * `STRING` both appear in params as JSON strings. In these cases,
   * `param_types` can be used to specify the exact SQL type for some or all of
   * the SQL statement parameters. See the definition of Type for more
   * information about SQL types.
   */
  paramTypes?: {
    [key: string]: Type
  };
  /**
   * If present, results will be restricted to the specified partition
   * previously created using PartitionQuery(). There must be an exact match for
   * the values of fields common to this message and the PartitionQueryRequest
   * message used to create this partition_token.
   */
  partitionToken?: Uint8Array;
  /**
   * Used to control the amount of debugging information returned in
   * ResultSetStats. If partition_token is set, query_mode can only be set to
   * QueryMode.NORMAL.
   */
  queryMode?:  | "NORMAL" | "PLAN" | "PROFILE";
  /**
   * Query optimizer configuration to use for the given query.
   */
  queryOptions?: QueryOptions;
  /**
   * Common options for this request.
   */
  requestOptions?: RequestOptions;
  /**
   * If this request is resuming a previously interrupted SQL statement
   * execution, `resume_token` should be copied from the last PartialResultSet
   * yielded before the interruption. Doing this enables the new SQL statement
   * execution to resume where the last one left off. The rest of the request
   * parameters must exactly match the request that yielded this token.
   */
  resumeToken?: Uint8Array;
  /**
   * A per-transaction sequence number used to identify this request. This
   * field makes each request idempotent such that if the request is received
   * multiple times, at most one will succeed. The sequence number must be
   * monotonically increasing within the transaction. If a request arrives for
   * the first time with an out-of-order sequence number, the transaction may be
   * aborted. Replays of previously handled requests will yield the same
   * response as the first execution. Required for DML statements. Ignored for
   * queries.
   */
  seqno?: bigint;
  /**
   * Required. The SQL string.
   */
  sql?: string;
  /**
   * The transaction to use. For queries, if none is provided, the default is a
   * temporary read-only transaction with strong concurrency. Standard DML
   * statements require a read-write transaction. To protect against replays,
   * single-use transactions are not supported. The caller must either supply an
   * existing transaction ID or begin a new transaction. Partitioned DML
   * requires an existing Partitioned DML transaction ID.
   */
  transaction?: TransactionSelector;
}

function serializeExecuteSqlRequest(data: any): ExecuteSqlRequest {
  return {
    ...data,
    partitionToken: data["partitionToken"] !== undefined ? encodeBase64(data["partitionToken"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? encodeBase64(data["resumeToken"]) : undefined,
    seqno: data["seqno"] !== undefined ? String(data["seqno"]) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransactionSelector(data["transaction"]) : undefined,
  };
}

function deserializeExecuteSqlRequest(data: any): ExecuteSqlRequest {
  return {
    ...data,
    partitionToken: data["partitionToken"] !== undefined ? decodeBase64(data["partitionToken"] as string) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? decodeBase64(data["resumeToken"] as string) : undefined,
    seqno: data["seqno"] !== undefined ? BigInt(data["seqno"]) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransactionSelector(data["transaction"]) : undefined,
  };
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
 * Message representing a single field of a struct.
 */
export interface Field {
  /**
   * The name of the field. For reads, this is the column name. For SQL
   * queries, it is the column alias (e.g., `"Word"` in the query `"SELECT
   * 'hello' AS Word"`), or the column name (e.g., `"ColName"` in the query
   * `"SELECT ColName FROM Table"`). Some columns might have an empty name
   * (e.g., `"SELECT UPPER(ColName)"`). Note that a query result can contain
   * multiple fields with the same name.
   */
  name?: string;
  /**
   * The type of the field.
   */
  type?: Type;
}

/**
 * Free instance specific metadata that is kept even after an instance has been
 * upgraded for tracking purposes.
 */
export interface FreeInstanceMetadata {
  /**
   * Specifies the expiration behavior of a free instance. The default of
   * ExpireBehavior is `REMOVE_AFTER_GRACE_PERIOD`. This can be modified during
   * or after creation, and before expiration.
   */
  expireBehavior?:  | "EXPIRE_BEHAVIOR_UNSPECIFIED" | "FREE_TO_PROVISIONED" | "REMOVE_AFTER_GRACE_PERIOD";
  /**
   * Output only. Timestamp after which the instance will either be upgraded or
   * scheduled for deletion after a grace period. ExpireBehavior is used to
   * choose between upgrading or scheduling the free instance for deletion. This
   * timestamp is set during the creation of a free instance.
   */
  readonly expireTime?: Date;
  /**
   * Output only. If present, the timestamp at which the free instance was
   * upgraded to a provisioned instance.
   */
  readonly upgradeTime?: Date;
}

/**
 * The response for GetDatabaseDdl.
 */
export interface GetDatabaseDdlResponse {
  /**
   * Proto descriptors stored in the database. Contains a protobuf-serialized
   * [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
   * For more details, see protobuffer [self
   * description](https://developers.google.com/protocol-buffers/docs/techniques#self-description).
   */
  protoDescriptors?: Uint8Array;
  /**
   * A list of formatted DDL statements defining the schema of the database
   * specified in the request.
   */
  statements?: string[];
}

function serializeGetDatabaseDdlResponse(data: any): GetDatabaseDdlResponse {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? encodeBase64(data["protoDescriptors"]) : undefined,
  };
}

function deserializeGetDatabaseDdlResponse(data: any): GetDatabaseDdlResponse {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? decodeBase64(data["protoDescriptors"] as string) : undefined,
  };
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
 * A message representing a (sparse) collection of hot keys for specific key
 * buckets.
 */
export interface IndexedHotKey {
  /**
   * A (sparse) mapping from key bucket index to the index of the specific hot
   * row key for that key bucket. The index of the hot row key can be translated
   * to the actual row key via the ScanData.VisualizationData.indexed_keys
   * repeated field.
   */
  sparseHotKeys?: {
    [key: string]: number
  };
}

/**
 * A message representing a (sparse) collection of KeyRangeInfos for specific
 * key buckets.
 */
export interface IndexedKeyRangeInfos {
  /**
   * A (sparse) mapping from key bucket index to the KeyRangeInfos for that key
   * bucket.
   */
  keyRangeInfos?: {
    [key: string]: KeyRangeInfos
  };
}

function serializeIndexedKeyRangeInfos(data: any): IndexedKeyRangeInfos {
  return {
    ...data,
    keyRangeInfos: data["keyRangeInfos"] !== undefined ? Object.fromEntries(Object.entries(data["keyRangeInfos"]).map(([k, v]: [string, any]) => ([k, serializeKeyRangeInfos(v)]))) : undefined,
  };
}

function deserializeIndexedKeyRangeInfos(data: any): IndexedKeyRangeInfos {
  return {
    ...data,
    keyRangeInfos: data["keyRangeInfos"] !== undefined ? Object.fromEntries(Object.entries(data["keyRangeInfos"]).map(([k, v]: [string, any]) => ([k, deserializeKeyRangeInfos(v)]))) : undefined,
  };
}

/**
 * An isolated set of Cloud Spanner resources on which databases can be hosted.
 */
export interface Instance {
  /**
   * Required. The name of the instance's configuration. Values are of the form
   * `projects//instanceConfigs/`. See also InstanceConfig and
   * ListInstanceConfigs.
   */
  config?: string;
  /**
   * Output only. The time at which the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Required. The descriptive name for this instance as it appears in UIs.
   * Must be unique per project and between 4 and 30 characters in length.
   */
  displayName?: string;
  /**
   * Deprecated. This field is not populated.
   */
  endpointUris?: string[];
  /**
   * Free instance metadata. Only populated for free instances.
   */
  freeInstanceMetadata?: FreeInstanceMetadata;
  /**
   * The `InstanceType` of the current instance.
   */
  instanceType?:  | "INSTANCE_TYPE_UNSPECIFIED" | "PROVISIONED" | "FREE_INSTANCE";
  /**
   * Cloud Labels are a flexible and lightweight mechanism for organizing cloud
   * resources into groups that reflect a customer's organizational needs and
   * deployment strategies. Cloud Labels can be used to filter collections of
   * resources. They can be used to control how resource metrics are aggregated.
   * And they can be used as arguments to policy management rules (e.g. route,
   * firewall, load balancing, etc.). * Label keys must be between 1 and 63
   * characters long and must conform to the following regular expression:
   * `a-z{0,62}`. * Label values must be between 0 and 63 characters long and
   * must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than
   * 64 labels can be associated with a given resource. See
   * https://goo.gl/xmQnxf for more information on and examples of labels. If
   * you plan to use labels in your own code, please note that additional
   * characters may be allowed in the future. And so you are advised to use an
   * internal label representation, such as JSON, which doesn't rely upon
   * specific characters being disallowed. For example, representing labels as
   * the string: name + "_" + value would prove problematic if we were to allow
   * "_" in a future release.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. A unique identifier for the instance, which cannot be changed
   * after the instance is created. Values are of the form
   * `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be
   * between 2 and 64 characters in length.
   */
  name?: string;
  /**
   * The number of nodes allocated to this instance. At most one of either
   * node_count or processing_units should be present in the message. This may
   * be zero in API responses for instances that are not yet in state `READY`.
   * See [the
   * documentation](https://cloud.google.com/spanner/docs/compute-capacity) for
   * more information about nodes and processing units.
   */
  nodeCount?: number;
  /**
   * The number of processing units allocated to this instance. At most one of
   * processing_units or node_count should be present in the message. This may
   * be zero in API responses for instances that are not yet in state `READY`.
   * See [the
   * documentation](https://cloud.google.com/spanner/docs/compute-capacity) for
   * more information about nodes and processing units.
   */
  processingUnits?: number;
  /**
   * Output only. The current instance state. For CreateInstance, the state
   * must be either omitted or set to `CREATING`. For UpdateInstance, the state
   * must be either omitted or set to `READY`.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY";
  /**
   * Output only. The time at which the instance was most recently updated.
   */
  readonly updateTime?: Date;
}

/**
 * A possible configuration for a Cloud Spanner instance. Configurations define
 * the geographic placement of nodes and their replication.
 */
export interface InstanceConfig {
  /**
   * Base configuration name, e.g. projects//instanceConfigs/nam3, based on
   * which this configuration is created. Only set for user managed
   * configurations. `base_config` must refer to a configuration of type
   * GOOGLE_MANAGED in the same project as this configuration.
   */
  baseConfig?: string;
  /**
   * Output only. Whether this instance config is a Google or User Managed
   * Configuration.
   */
  readonly configType?:  | "TYPE_UNSPECIFIED" | "GOOGLE_MANAGED" | "USER_MANAGED";
  /**
   * The name of this instance configuration as it appears in UIs.
   */
  displayName?: string;
  /**
   * etag is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a instance config from overwriting each other. It
   * is strongly suggested that systems make use of the etag in the
   * read-modify-write cycle to perform instance config updates in order to
   * avoid race conditions: An etag is returned in the response which contains
   * instance configs, and systems are expected to put that etag in the request
   * to update instance config to ensure that their change will be applied to
   * the same version of the instance config. If no etag is provided in the call
   * to update instance config, then the existing instance config is overwritten
   * blindly.
   */
  etag?: string;
  /**
   * Output only. Describes whether free instances are available to be created
   * in this instance config.
   */
  readonly freeInstanceAvailability?:  | "FREE_INSTANCE_AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "UNSUPPORTED" | "DISABLED" | "QUOTA_EXCEEDED";
  /**
   * Cloud Labels are a flexible and lightweight mechanism for organizing cloud
   * resources into groups that reflect a customer's organizational needs and
   * deployment strategies. Cloud Labels can be used to filter collections of
   * resources. They can be used to control how resource metrics are aggregated.
   * And they can be used as arguments to policy management rules (e.g. route,
   * firewall, load balancing, etc.). * Label keys must be between 1 and 63
   * characters long and must conform to the following regular expression:
   * `a-z{0,62}`. * Label values must be between 0 and 63 characters long and
   * must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than
   * 64 labels can be associated with a given resource. See
   * https://goo.gl/xmQnxf for more information on and examples of labels. If
   * you plan to use labels in your own code, please note that additional
   * characters may be allowed in the future. Therefore, you are advised to use
   * an internal label representation, such as JSON, which doesn't rely upon
   * specific characters being disallowed. For example, representing labels as
   * the string: name + "_" + value would prove problematic if we were to allow
   * "_" in a future release.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Allowed values of the "default_leader" schema option for databases in
   * instances that use this instance configuration.
   */
  leaderOptions?: string[];
  /**
   * A unique identifier for the instance configuration. Values are of the form
   * `projects//instanceConfigs/a-z*`.
   */
  name?: string;
  /**
   * Output only. The available optional replicas to choose from for user
   * managed configurations. Populated for Google managed configurations.
   */
  readonly optionalReplicas?: ReplicaInfo[];
  /**
   * Output only. If true, the instance config is being created or updated. If
   * false, there are no ongoing operations for the instance config.
   */
  readonly reconciling?: boolean;
  /**
   * The geographic placement of nodes in this instance configuration and their
   * replication properties.
   */
  replicas?: ReplicaInfo[];
  /**
   * Output only. The current instance config state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY";
}

/**
 * Encapsulates progress related information for a Cloud Spanner long running
 * instance operations.
 */
export interface InstanceOperationProgress {
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

function serializeInstanceOperationProgress(data: any): InstanceOperationProgress {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeInstanceOperationProgress(data: any): InstanceOperationProgress {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * KeyRange represents a range of rows in a table or index. A range has a start
 * key and an end key. These keys can be open or closed, indicating if the range
 * includes rows with that key. Keys are represented by lists, where the ith
 * value in the list corresponds to the ith component of the table or index
 * primary key. Individual values are encoded as described here. For example,
 * consider the following table definition: CREATE TABLE UserEvents ( UserName
 * STRING(MAX), EventDate STRING(10) ) PRIMARY KEY(UserName, EventDate); The
 * following keys name rows in this table: "Bob", "2014-09-23" Since the
 * `UserEvents` table's `PRIMARY KEY` clause names two columns, each
 * `UserEvents` key has two elements; the first is the `UserName`, and the
 * second is the `EventDate`. Key ranges with multiple components are
 * interpreted lexicographically by component using the table or index key's
 * declared sort order. For example, the following range returns all events for
 * user `"Bob"` that occurred in the year 2015: "start_closed": ["Bob",
 * "2015-01-01"] "end_closed": ["Bob", "2015-12-31"] Start and end keys can omit
 * trailing key components. This affects the inclusion and exclusion of rows
 * that exactly match the provided key components: if the key is closed, then
 * rows that exactly match the provided components are included; if the key is
 * open, then rows that exactly match are not included. For example, the
 * following range includes all events for `"Bob"` that occurred during and
 * after the year 2000: "start_closed": ["Bob", "2000-01-01"] "end_closed":
 * ["Bob"] The next example retrieves all events for `"Bob"`: "start_closed":
 * ["Bob"] "end_closed": ["Bob"] To retrieve events before the year 2000:
 * "start_closed": ["Bob"] "end_open": ["Bob", "2000-01-01"] The following range
 * includes all rows in the table: "start_closed": [] "end_closed": [] This
 * range returns all users whose `UserName` begins with any character from A to
 * C: "start_closed": ["A"] "end_open": ["D"] This range returns all users whose
 * `UserName` begins with B: "start_closed": ["B"] "end_open": ["C"] Key ranges
 * honor column sort order. For example, suppose a table is defined as follows:
 * CREATE TABLE DescendingSortedTable { Key INT64, ... ) PRIMARY KEY(Key DESC);
 * The following range retrieves all rows with key values between 1 and 100
 * inclusive: "start_closed": ["100"] "end_closed": ["1"] Note that 100 is
 * passed as the start, and 1 is passed as the end, because `Key` is a
 * descending column in the schema.
 */
export interface KeyRange {
  /**
   * If the end is closed, then the range includes all rows whose first
   * `len(end_closed)` key columns exactly match `end_closed`.
   */
  endClosed?: any[];
  /**
   * If the end is open, then the range excludes rows whose first
   * `len(end_open)` key columns exactly match `end_open`.
   */
  endOpen?: any[];
  /**
   * If the start is closed, then the range includes all rows whose first
   * `len(start_closed)` key columns exactly match `start_closed`.
   */
  startClosed?: any[];
  /**
   * If the start is open, then the range excludes rows whose first
   * `len(start_open)` key columns exactly match `start_open`.
   */
  startOpen?: any[];
}

/**
 * A message representing information for a key range (possibly one key).
 */
export interface KeyRangeInfo {
  /**
   * The list of context values for this key range.
   */
  contextValues?: ContextValue[];
  /**
   * The index of the end key in indexed_keys.
   */
  endKeyIndex?: number;
  /**
   * Information about this key range, for all metrics.
   */
  info?: LocalizedString;
  /**
   * The number of keys this range covers.
   */
  keysCount?: bigint;
  /**
   * The name of the metric. e.g. "latency".
   */
  metric?: LocalizedString;
  /**
   * The index of the start key in indexed_keys.
   */
  startKeyIndex?: number;
  /**
   * The time offset. This is the time since the start of the time interval.
   */
  timeOffset?: number /* Duration */;
  /**
   * The unit of the metric. This is an unstructured field and will be mapped
   * as is to the user.
   */
  unit?: LocalizedString;
  /**
   * The value of the metric.
   */
  value?: number;
}

function serializeKeyRangeInfo(data: any): KeyRangeInfo {
  return {
    ...data,
    keysCount: data["keysCount"] !== undefined ? String(data["keysCount"]) : undefined,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeKeyRangeInfo(data: any): KeyRangeInfo {
  return {
    ...data,
    keysCount: data["keysCount"] !== undefined ? BigInt(data["keysCount"]) : undefined,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A message representing a list of specific information for multiple key
 * ranges.
 */
export interface KeyRangeInfos {
  /**
   * The list individual KeyRangeInfos.
   */
  infos?: KeyRangeInfo[];
  /**
   * The total size of the list of all KeyRangeInfos. This may be larger than
   * the number of repeated messages above. If that is the case, this number may
   * be used to determine how many are not being shown.
   */
  totalSize?: number;
}

function serializeKeyRangeInfos(data: any): KeyRangeInfos {
  return {
    ...data,
    infos: data["infos"] !== undefined ? data["infos"].map((item: any) => (serializeKeyRangeInfo(item))) : undefined,
  };
}

function deserializeKeyRangeInfos(data: any): KeyRangeInfos {
  return {
    ...data,
    infos: data["infos"] !== undefined ? data["infos"].map((item: any) => (deserializeKeyRangeInfo(item))) : undefined,
  };
}

/**
 * `KeySet` defines a collection of Cloud Spanner keys and/or key ranges. All
 * the keys are expected to be in the same table or index. The keys need not be
 * sorted in any particular way. If the same key is specified multiple times in
 * the set (for example if two ranges, two keys, or a key and a range overlap),
 * Cloud Spanner behaves as if the key were only specified once.
 */
export interface KeySet {
  /**
   * For convenience `all` can be set to `true` to indicate that this `KeySet`
   * matches all keys in the table or index. Note that any keys specified in
   * `keys` or `ranges` are only yielded once.
   */
  all?: boolean;
  /**
   * A list of specific keys. Entries in `keys` should have exactly as many
   * elements as there are columns in the primary or index key with which this
   * `KeySet` is used. Individual key values are encoded as described here.
   */
  keys?: any[][];
  /**
   * A list of key ranges. See KeyRange for more information about key range
   * specifications.
   */
  ranges?: KeyRange[];
}

/**
 * The response for ListBackupOperations.
 */
export interface ListBackupOperationsResponse {
  /**
   * `next_page_token` can be sent in a subsequent ListBackupOperations call to
   * fetch more of the matching metadata.
   */
  nextPageToken?: string;
  /**
   * The list of matching backup long-running operations. Each operation's name
   * will be prefixed by the backup's name. The operation's metadata field type
   * `metadata.type_url` describes the type of the metadata. Operations returned
   * include those that are pending or have completed/failed/canceled within the
   * last 7 days. Operations returned are ordered by
   * `operation.metadata.value.progress.start_time` in descending order starting
   * from the most recently started operation.
   */
  operations?: Operation[];
}

/**
 * The response for ListBackups.
 */
export interface ListBackupsResponse {
  /**
   * The list of matching backups. Backups returned are ordered by
   * `create_time` in descending order, starting from the most recent
   * `create_time`.
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
 * The response for ListDatabaseOperations.
 */
export interface ListDatabaseOperationsResponse {
  /**
   * `next_page_token` can be sent in a subsequent ListDatabaseOperations call
   * to fetch more of the matching metadata.
   */
  nextPageToken?: string;
  /**
   * The list of matching database long-running operations. Each operation's
   * name will be prefixed by the database's name. The operation's metadata
   * field type `metadata.type_url` describes the type of the metadata.
   */
  operations?: Operation[];
}

/**
 * The response for ListDatabaseRoles.
 */
export interface ListDatabaseRolesResponse {
  /**
   * Database roles that matched the request.
   */
  databaseRoles?: DatabaseRole[];
  /**
   * `next_page_token` can be sent in a subsequent ListDatabaseRoles call to
   * fetch more of the matching roles.
   */
  nextPageToken?: string;
}

/**
 * The response for ListDatabases.
 */
export interface ListDatabasesResponse {
  /**
   * Databases that matched the request.
   */
  databases?: Database[];
  /**
   * `next_page_token` can be sent in a subsequent ListDatabases call to fetch
   * more of the matching databases.
   */
  nextPageToken?: string;
}

/**
 * The response for ListInstanceConfigOperations.
 */
export interface ListInstanceConfigOperationsResponse {
  /**
   * `next_page_token` can be sent in a subsequent ListInstanceConfigOperations
   * call to fetch more of the matching metadata.
   */
  nextPageToken?: string;
  /**
   * The list of matching instance config long-running operations. Each
   * operation's name will be prefixed by the instance config's name. The
   * operation's metadata field type `metadata.type_url` describes the type of
   * the metadata.
   */
  operations?: Operation[];
}

/**
 * The response for ListInstanceConfigs.
 */
export interface ListInstanceConfigsResponse {
  /**
   * The list of requested instance configurations.
   */
  instanceConfigs?: InstanceConfig[];
  /**
   * `next_page_token` can be sent in a subsequent ListInstanceConfigs call to
   * fetch more of the matching instance configurations.
   */
  nextPageToken?: string;
}

/**
 * The response for ListInstances.
 */
export interface ListInstancesResponse {
  /**
   * The list of requested instances.
   */
  instances?: Instance[];
  /**
   * `next_page_token` can be sent in a subsequent ListInstances call to fetch
   * more of the matching instances.
   */
  nextPageToken?: string;
  /**
   * The list of unreachable instances. It includes the names of instances
   * whose metadata could not be retrieved within instance_deadline.
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
 * Response method from the ListScans method.
 */
export interface ListScansResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Available scans based on the list query parameters.
   */
  scans?: Scan[];
}

function serializeListScansResponse(data: any): ListScansResponse {
  return {
    ...data,
    scans: data["scans"] !== undefined ? data["scans"].map((item: any) => (serializeScan(item))) : undefined,
  };
}

function deserializeListScansResponse(data: any): ListScansResponse {
  return {
    ...data,
    scans: data["scans"] !== undefined ? data["scans"].map((item: any) => (deserializeScan(item))) : undefined,
  };
}

/**
 * The response for ListSessions.
 */
export interface ListSessionsResponse {
  /**
   * `next_page_token` can be sent in a subsequent ListSessions call to fetch
   * more of the matching sessions.
   */
  nextPageToken?: string;
  /**
   * The list of requested sessions.
   */
  sessions?: Session[];
}

/**
 * A message representing a user-facing string whose value may need to be
 * translated before being displayed.
 */
export interface LocalizedString {
  /**
   * A map of arguments used when creating the localized message. Keys
   * represent parameter names which may be used by the localized version when
   * substituting dynamic values.
   */
  args?: {
    [key: string]: string
  };
  /**
   * The canonical English version of this message. If no token is provided or
   * the front-end has no message associated with the token, this text will be
   * displayed as-is.
   */
  message?: string;
  /**
   * The token identifying the message, e.g. 'METRIC_READ_CPU'. This should be
   * unique within the service.
   */
  token?: string;
}

/**
 * A message representing the actual monitoring data, values for each key
 * bucket over time, of a metric.
 */
export interface Metric {
  /**
   * The aggregation function used to aggregate each key bucket
   */
  aggregation?:  | "AGGREGATION_UNSPECIFIED" | "MAX" | "SUM";
  /**
   * The category of the metric, e.g. "Activity", "Alerts", "Reads", etc.
   */
  category?: LocalizedString;
  /**
   * The references to numerator and denominator metrics for a derived metric.
   */
  derived?: DerivedMetric;
  /**
   * The displayed label of the metric.
   */
  displayLabel?: LocalizedString;
  /**
   * Whether the metric has any non-zero data.
   */
  hasNonzeroData?: boolean;
  /**
   * The value that is considered hot for the metric. On a per metric basis
   * hotness signals high utilization and something that might potentially be a
   * cause for concern by the end user. hot_value is used to calibrate and scale
   * visual color scales.
   */
  hotValue?: number;
  /**
   * The (sparse) mapping from time index to an IndexedHotKey message,
   * representing those time intervals for which there are hot keys.
   */
  indexedHotKeys?: {
    [key: string]: IndexedHotKey
  };
  /**
   * The (sparse) mapping from time interval index to an IndexedKeyRangeInfos
   * message, representing those time intervals for which there are
   * informational messages concerning key ranges.
   */
  indexedKeyRangeInfos?: {
    [key: string]: IndexedKeyRangeInfos
  };
  /**
   * Information about the metric.
   */
  info?: LocalizedString;
  /**
   * The data for the metric as a matrix.
   */
  matrix?: MetricMatrix;
  /**
   * The unit of the metric.
   */
  unit?: LocalizedString;
  /**
   * Whether the metric is visible to the end user.
   */
  visible?: boolean;
}

function serializeMetric(data: any): Metric {
  return {
    ...data,
    indexedKeyRangeInfos: data["indexedKeyRangeInfos"] !== undefined ? Object.fromEntries(Object.entries(data["indexedKeyRangeInfos"]).map(([k, v]: [string, any]) => ([k, serializeIndexedKeyRangeInfos(v)]))) : undefined,
  };
}

function deserializeMetric(data: any): Metric {
  return {
    ...data,
    indexedKeyRangeInfos: data["indexedKeyRangeInfos"] !== undefined ? Object.fromEntries(Object.entries(data["indexedKeyRangeInfos"]).map(([k, v]: [string, any]) => ([k, deserializeIndexedKeyRangeInfos(v)]))) : undefined,
  };
}

/**
 * A message representing a matrix of floats.
 */
export interface MetricMatrix {
  /**
   * The rows of the matrix.
   */
  rows?: MetricMatrixRow[];
}

/**
 * A message representing a row of a matrix of floats.
 */
export interface MetricMatrixRow {
  /**
   * The columns of the row.
   */
  cols?: number[];
}

/**
 * A modification to one or more Cloud Spanner rows. Mutations can be applied
 * to a Cloud Spanner database by sending them in a Commit call.
 */
export interface Mutation {
  /**
   * Delete rows from a table. Succeeds whether or not the named rows were
   * present.
   */
  delete?: Delete;
  /**
   * Insert new rows in a table. If any of the rows already exist, the write or
   * transaction fails with error `ALREADY_EXISTS`.
   */
  insert?: Write;
  /**
   * Like insert, except that if the row already exists, then its column values
   * are overwritten with the ones provided. Any column values not explicitly
   * written are preserved. When using insert_or_update, just as when using
   * insert, all `NOT NULL` columns in the table must be given a value. This
   * holds true even when the row already exists and will therefore actually be
   * updated.
   */
  insertOrUpdate?: Write;
  /**
   * Like insert, except that if the row already exists, it is deleted, and the
   * column values provided are inserted instead. Unlike insert_or_update, this
   * means any values not explicitly written become `NULL`. In an interleaved
   * table, if you create the child table with the `ON DELETE CASCADE`
   * annotation, then replacing a parent row also deletes the child rows.
   * Otherwise, you must delete the child rows before you replace the parent
   * row.
   */
  replace?: Write;
  /**
   * Update existing rows in a table. If any of the rows does not already
   * exist, the transaction fails with error `NOT_FOUND`.
   */
  update?: Write;
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
 * Encapsulates progress related information for a Cloud Spanner long running
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
 * Metadata type for the long-running operation used to track the progress of
 * optimizations performed on a newly restored database. This long-running
 * operation is automatically created by the system after the successful
 * completion of a database restore, and cannot be cancelled.
 */
export interface OptimizeRestoredDatabaseMetadata {
  /**
   * Name of the restored database being optimized.
   */
  name?: string;
  /**
   * The progress of the post-restore optimizations.
   */
  progress?: OperationProgress;
}

function serializeOptimizeRestoredDatabaseMetadata(data: any): OptimizeRestoredDatabaseMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeOptimizeRestoredDatabaseMetadata(data: any): OptimizeRestoredDatabaseMetadata {
  return {
    ...data,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * Partial results from a streaming read or SQL query. Streaming reads and SQL
 * queries better tolerate large result sets, large rows, and large values, but
 * are a little trickier to consume.
 */
export interface PartialResultSet {
  /**
   * If true, then the final value in values is chunked, and must be combined
   * with more values from subsequent `PartialResultSet`s to obtain a complete
   * field value.
   */
  chunkedValue?: boolean;
  /**
   * Metadata about the result set, such as row type information. Only present
   * in the first response.
   */
  metadata?: ResultSetMetadata;
  /**
   * Streaming calls might be interrupted for a variety of reasons, such as TCP
   * connection loss. If this occurs, the stream of results can be resumed by
   * re-sending the original request and including `resume_token`. Note that
   * executing any other transaction in the same session invalidates the token.
   */
  resumeToken?: Uint8Array;
  /**
   * Query plan and execution statistics for the statement that produced this
   * streaming result set. These can be requested by setting
   * ExecuteSqlRequest.query_mode and are sent only once with the last response
   * in the stream. This field will also be present in the last response for DML
   * statements.
   */
  stats?: ResultSetStats;
  /**
   * A streamed result set consists of a stream of values, which might be split
   * into many `PartialResultSet` messages to accommodate large rows and/or
   * large values. Every N complete values defines a row, where N is equal to
   * the number of entries in metadata.row_type.fields. Most values are encoded
   * based on type as described here. It is possible that the last value in
   * values is "chunked", meaning that the rest of the value is sent in
   * subsequent `PartialResultSet`(s). This is denoted by the chunked_value
   * field. Two or more chunked values can be merged to form a complete value as
   * follows: * `bool/number/null`: cannot be chunked * `string`: concatenate
   * the strings * `list`: concatenate the lists. If the last element in a list
   * is a `string`, `list`, or `object`, merge it with the first element in the
   * next list by applying these rules recursively. * `object`: concatenate the
   * (field name, field value) pairs. If a field name is duplicated, then apply
   * these rules recursively to merge the field values. Some examples of
   * merging: # Strings are concatenated. "foo", "bar" => "foobar" # Lists of
   * non-strings are concatenated. [2, 3], [4] => [2, 3, 4] # Lists are
   * concatenated, but the last and first elements are merged # because they are
   * strings. ["a", "b"], ["c", "d"] => ["a", "bc", "d"] # Lists are
   * concatenated, but the last and first elements are merged # because they are
   * lists. Recursively, the last and first elements # of the inner lists are
   * merged because they are strings. ["a", ["b", "c"]], [["d"], "e"] => ["a",
   * ["b", "cd"], "e"] # Non-overlapping object fields are combined. {"a": "1"},
   * {"b": "2"} => {"a": "1", "b": 2"} # Overlapping object fields are merged.
   * {"a": "1"}, {"a": "2"} => {"a": "12"} # Examples of merging objects
   * containing lists of strings. {"a": ["1"]}, {"a": ["2"]} => {"a": ["12"]}
   * For a more complete example, suppose a streaming SQL query is yielding a
   * result set whose rows contain a single string field. The following
   * `PartialResultSet`s might be yielded: { "metadata": { ... } "values":
   * ["Hello", "W"] "chunked_value": true "resume_token": "Af65..." } {
   * "values": ["orl"] "chunked_value": true } { "values": ["d"] "resume_token":
   * "Zx1B..." } This sequence of `PartialResultSet`s encodes two rows, one
   * containing the field value `"Hello"`, and a second containing the field
   * value `"World" = "W" + "orl" + "d"`. Not all `PartialResultSet`s contain a
   * `resume_token`. Execution can only be resumed from a previously yielded
   * `resume_token`. For the above sequence of `PartialResultSet`s, resuming the
   * query with `"resume_token": "Af65..."` will yield results from the
   * `PartialResultSet` with value `["orl"]`.
   */
  values?: any[];
}

function serializePartialResultSet(data: any): PartialResultSet {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeResultSetMetadata(data["metadata"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? encodeBase64(data["resumeToken"]) : undefined,
    stats: data["stats"] !== undefined ? serializeResultSetStats(data["stats"]) : undefined,
  };
}

function deserializePartialResultSet(data: any): PartialResultSet {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeResultSetMetadata(data["metadata"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? decodeBase64(data["resumeToken"] as string) : undefined,
    stats: data["stats"] !== undefined ? deserializeResultSetStats(data["stats"]) : undefined,
  };
}

/**
 * Information returned for each partition returned in a PartitionResponse.
 */
export interface Partition {
  /**
   * This token can be passed to Read, StreamingRead, ExecuteSql, or
   * ExecuteStreamingSql requests to restrict the results to those identified by
   * this partition token.
   */
  partitionToken?: Uint8Array;
}

function serializePartition(data: any): Partition {
  return {
    ...data,
    partitionToken: data["partitionToken"] !== undefined ? encodeBase64(data["partitionToken"]) : undefined,
  };
}

function deserializePartition(data: any): Partition {
  return {
    ...data,
    partitionToken: data["partitionToken"] !== undefined ? decodeBase64(data["partitionToken"] as string) : undefined,
  };
}

/**
 * Message type to initiate a Partitioned DML transaction.
 */
export interface PartitionedDml {
}

/**
 * Options for a PartitionQueryRequest and PartitionReadRequest.
 */
export interface PartitionOptions {
  /**
   * **Note:** This hint is currently ignored by PartitionQuery and
   * PartitionRead requests. The desired maximum number of partitions to return.
   * For example, this may be set to the number of workers available. The
   * default for this option is currently 10,000. The maximum value is currently
   * 200,000. This is only a hint. The actual number of partitions returned may
   * be smaller or larger than this maximum count request.
   */
  maxPartitions?: bigint;
  /**
   * **Note:** This hint is currently ignored by PartitionQuery and
   * PartitionRead requests. The desired data size for each partition generated.
   * The default for this option is currently 1 GiB. This is only a hint. The
   * actual size of each partition may be smaller or larger than this size
   * request.
   */
  partitionSizeBytes?: bigint;
}

function serializePartitionOptions(data: any): PartitionOptions {
  return {
    ...data,
    maxPartitions: data["maxPartitions"] !== undefined ? String(data["maxPartitions"]) : undefined,
    partitionSizeBytes: data["partitionSizeBytes"] !== undefined ? String(data["partitionSizeBytes"]) : undefined,
  };
}

function deserializePartitionOptions(data: any): PartitionOptions {
  return {
    ...data,
    maxPartitions: data["maxPartitions"] !== undefined ? BigInt(data["maxPartitions"]) : undefined,
    partitionSizeBytes: data["partitionSizeBytes"] !== undefined ? BigInt(data["partitionSizeBytes"]) : undefined,
  };
}

/**
 * The request for PartitionQuery
 */
export interface PartitionQueryRequest {
  /**
   * Parameter names and values that bind to placeholders in the SQL string. A
   * parameter placeholder consists of the `@` character followed by the
   * parameter name (for example, `@firstName`). Parameter names can contain
   * letters, numbers, and underscores. Parameters can appear anywhere that a
   * literal value is expected. The same parameter name can be used more than
   * once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It is an
   * error to execute a SQL statement with unbound parameters.
   */
  params?: {
    [key: string]: any
  };
  /**
   * It is not always possible for Cloud Spanner to infer the right SQL type
   * from a JSON value. For example, values of type `BYTES` and values of type
   * `STRING` both appear in params as JSON strings. In these cases,
   * `param_types` can be used to specify the exact SQL type for some or all of
   * the SQL query parameters. See the definition of Type for more information
   * about SQL types.
   */
  paramTypes?: {
    [key: string]: Type
  };
  /**
   * Additional options that affect how many partitions are created.
   */
  partitionOptions?: PartitionOptions;
  /**
   * Required. The query request to generate partitions for. The request will
   * fail if the query is not root partitionable. The query plan of a root
   * partitionable query has a single distributed union operator. A distributed
   * union operator conceptually divides one or more tables into multiple
   * splits, remotely evaluates a subquery independently on each split, and then
   * unions all results. This must not contain DML commands, such as INSERT,
   * UPDATE, or DELETE. Use ExecuteStreamingSql with a PartitionedDml
   * transaction for large, partition-friendly DML operations.
   */
  sql?: string;
  /**
   * Read only snapshot transactions are supported, read/write and single use
   * transactions are not.
   */
  transaction?: TransactionSelector;
}

function serializePartitionQueryRequest(data: any): PartitionQueryRequest {
  return {
    ...data,
    partitionOptions: data["partitionOptions"] !== undefined ? serializePartitionOptions(data["partitionOptions"]) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransactionSelector(data["transaction"]) : undefined,
  };
}

function deserializePartitionQueryRequest(data: any): PartitionQueryRequest {
  return {
    ...data,
    partitionOptions: data["partitionOptions"] !== undefined ? deserializePartitionOptions(data["partitionOptions"]) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransactionSelector(data["transaction"]) : undefined,
  };
}

/**
 * The request for PartitionRead
 */
export interface PartitionReadRequest {
  /**
   * The columns of table to be returned for each row matching this request.
   */
  columns?: string[];
  /**
   * If non-empty, the name of an index on table. This index is used instead of
   * the table primary key when interpreting key_set and sorting result rows.
   * See key_set for further information.
   */
  index?: string;
  /**
   * Required. `key_set` identifies the rows to be yielded. `key_set` names the
   * primary keys of the rows in table to be yielded, unless index is present.
   * If index is present, then key_set instead names index keys in index. It is
   * not an error for the `key_set` to name rows that do not exist in the
   * database. Read yields nothing for nonexistent rows.
   */
  keySet?: KeySet;
  /**
   * Additional options that affect how many partitions are created.
   */
  partitionOptions?: PartitionOptions;
  /**
   * Required. The name of the table in the database to be read.
   */
  table?: string;
  /**
   * Read only snapshot transactions are supported, read/write and single use
   * transactions are not.
   */
  transaction?: TransactionSelector;
}

function serializePartitionReadRequest(data: any): PartitionReadRequest {
  return {
    ...data,
    partitionOptions: data["partitionOptions"] !== undefined ? serializePartitionOptions(data["partitionOptions"]) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransactionSelector(data["transaction"]) : undefined,
  };
}

function deserializePartitionReadRequest(data: any): PartitionReadRequest {
  return {
    ...data,
    partitionOptions: data["partitionOptions"] !== undefined ? deserializePartitionOptions(data["partitionOptions"]) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransactionSelector(data["transaction"]) : undefined,
  };
}

/**
 * The response for PartitionQuery or PartitionRead
 */
export interface PartitionResponse {
  /**
   * Partitions created by this request.
   */
  partitions?: Partition[];
  /**
   * Transaction created by this request.
   */
  transaction?: Transaction;
}

function serializePartitionResponse(data: any): PartitionResponse {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? data["partitions"].map((item: any) => (serializePartition(item))) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransaction(data["transaction"]) : undefined,
  };
}

function deserializePartitionResponse(data: any): PartitionResponse {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? data["partitions"].map((item: any) => (deserializePartition(item))) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransaction(data["transaction"]) : undefined,
  };
}

/**
 * Node information for nodes appearing in a QueryPlan.plan_nodes.
 */
export interface PlanNode {
  /**
   * List of child node `index`es and their relationship to this parent.
   */
  childLinks?: ChildLink[];
  /**
   * The display name for the node.
   */
  displayName?: string;
  /**
   * The execution statistics associated with the node, contained in a group of
   * key-value pairs. Only present if the plan was returned as a result of a
   * profile query. For example, number of executions, number of rows/time per
   * execution etc.
   */
  executionStats?: {
    [key: string]: any
  };
  /**
   * The `PlanNode`'s index in node list.
   */
  index?: number;
  /**
   * Used to determine the type of node. May be needed for visualizing
   * different kinds of nodes differently. For example, If the node is a SCALAR
   * node, it will have a condensed representation which can be used to directly
   * embed a description of the node in its parent.
   */
  kind?:  | "KIND_UNSPECIFIED" | "RELATIONAL" | "SCALAR";
  /**
   * Attributes relevant to the node contained in a group of key-value pairs.
   * For example, a Parameter Reference node could have the following
   * information in its metadata: { "parameter_reference": "param1",
   * "parameter_type": "array" }
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Condensed representation for SCALAR nodes.
   */
  shortRepresentation?: ShortRepresentation;
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
 * A message representing a key prefix node in the key prefix hierarchy. for
 * eg. Bigtable keyspaces are lexicographically ordered mappings of keys to
 * values. Keys often have a shared prefix structure where users use the keys to
 * organize data. Eg ///employee In this case Keysight will possibly use one
 * node for a company and reuse it for all employees that fall under the
 * company. Doing so improves legibility in the UI.
 */
export interface PrefixNode {
  /**
   * Whether this corresponds to a data_source name.
   */
  dataSourceNode?: boolean;
  /**
   * The depth in the prefix hierarchy.
   */
  depth?: number;
  /**
   * The index of the end key bucket of the range that this node spans.
   */
  endIndex?: number;
  /**
   * The index of the start key bucket of the range that this node spans.
   */
  startIndex?: number;
  /**
   * The string represented by the prefix node.
   */
  word?: string;
}

/**
 * Additional options for Spanner#projectsInstanceConfigOperationsList.
 */
export interface ProjectsInstanceConfigOperationsListOptions {
  /**
   * An expression that filters the list of returned operations. A filter
   * expression consists of a field name, a comparison operator, and a value for
   * filtering. The value must be a string, a number, or a boolean. The
   * comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or
   * `:`. Colon `:` is the contains operator. Filter rules are not case
   * sensitive. The following fields in the Operation are eligible for
   * filtering: * `name` - The name of the long-running operation * `done` -
   * False if the operation is in progress, else true. * `metadata.@type` - the
   * type of metadata. For example, the type string for
   * CreateInstanceConfigMetadata is
   * `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstanceConfigMetadata`.
   * * `metadata.` - any field in metadata.value. `metadata.@type` must be
   * specified first, if filtering on metadata fields. * `error` - Error
   * associated with the long-running operation. * `response.@type` - the type
   * of response. * `response.` - any field in response.value. You can combine
   * multiple expressions by enclosing each expression in parentheses. By
   * default, expressions are combined with AND logic. However, you can specify
   * AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` -
   * The operation is complete. * `(metadata.@type=` \
   * `type.googleapis.com/google.spanner.admin.instance.v1.CreateInstanceConfigMetadata)
   * AND` \ `(metadata.instance_config.name:custom-config) AND` \
   * `(metadata.progress.start_time < \"2021-03-28T14:50:00Z\") AND` \
   * `(error:*)` - Return operations where: * The operation's metadata type is
   * CreateInstanceConfigMetadata. * The instance config name contains
   * "custom-config". * The operation started before 2021-03-28T14:50:00Z. * The
   * operation resulted in an error.
   */
  filter?: string;
  /**
   * Number of operations to be returned in the response. If 0 or less,
   * defaults to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListInstanceConfigOperationsResponse to the same `parent` and with
   * the same `filter`.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstanceConfigsDelete.
 */
export interface ProjectsInstanceConfigsDeleteOptions {
  /**
   * Used for optimistic concurrency control as a way to help prevent
   * simultaneous deletes of an instance config from overwriting each other. If
   * not empty, the API only deletes the instance config when the etag provided
   * matches the current status of the requested instance config. Otherwise,
   * deletes the instance config without checking the current status of the
   * requested instance config.
   */
  etag?: string;
  /**
   * An option to validate, but not actually execute, a request, and provide
   * the same response.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Spanner#projectsInstanceConfigsList.
 */
export interface ProjectsInstanceConfigsListOptions {
  /**
   * Number of instance configurations to be returned in the response. If 0 or
   * less, defaults to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListInstanceConfigsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstanceConfigsOperationsList.
 */
export interface ProjectsInstanceConfigsOperationsListOptions {
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
 * Additional options for Spanner#projectsInstancesBackupOperationsList.
 */
export interface ProjectsInstancesBackupOperationsListOptions {
  /**
   * An expression that filters the list of returned backup operations. A
   * filter expression consists of a field name, a comparison operator, and a
   * value for filtering. The value must be a string, a number, or a boolean.
   * The comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or
   * `:`. Colon `:` is the contains operator. Filter rules are not case
   * sensitive. The following fields in the operation are eligible for
   * filtering: * `name` - The name of the long-running operation * `done` -
   * False if the operation is in progress, else true. * `metadata.@type` - the
   * type of metadata. For example, the type string for CreateBackupMetadata is
   * `type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata`.
   * * `metadata.` - any field in metadata.value. `metadata.@type` must be
   * specified first if filtering on metadata fields. * `error` - Error
   * associated with the long-running operation. * `response.@type` - the type
   * of response. * `response.` - any field in response.value. You can combine
   * multiple expressions by enclosing each expression in parentheses. By
   * default, expressions are combined with AND logic, but you can specify AND,
   * OR, and NOT logic explicitly. Here are a few examples: * `done:true` - The
   * operation is complete. *
   * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata)
   * AND` \ `metadata.database:prod` - Returns operations where: * The
   * operation's metadata type is CreateBackupMetadata. * The source database
   * name of backup contains the string "prod". *
   * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata)
   * AND` \ `(metadata.name:howl) AND` \ `(metadata.progress.start_time <
   * \"2018-03-28T14:50:00Z\") AND` \ `(error:*)` - Returns operations where: *
   * The operation's metadata type is CreateBackupMetadata. * The backup name
   * contains the string "howl". * The operation started before
   * 2018-03-28T14:50:00Z. * The operation resulted in an error. *
   * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CopyBackupMetadata)
   * AND` \ `(metadata.source_backup:test) AND` \ `(metadata.progress.start_time
   * < \"2022-01-18T14:50:00Z\") AND` \ `(error:*)` - Returns operations where:
   * * The operation's metadata type is CopyBackupMetadata. * The source backup
   * name contains the string "test". * The operation started before
   * 2022-01-18T14:50:00Z. * The operation resulted in an error. *
   * `((metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CreateBackupMetadata)
   * AND` \ `(metadata.database:test_db)) OR` \
   * `((metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.CopyBackupMetadata)
   * AND` \ `(metadata.source_backup:test_bkp)) AND` \ `(error:*)` - Returns
   * operations where: * The operation's metadata matches either of criteria: *
   * The operation's metadata type is CreateBackupMetadata AND the source
   * database name of the backup contains the string "test_db" * The operation's
   * metadata type is CopyBackupMetadata AND the source backup name contains the
   * string "test_bkp" * The operation resulted in an error.
   */
  filter?: string;
  /**
   * Number of operations to be returned in the response. If 0 or less,
   * defaults to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListBackupOperationsResponse to the same `parent` and with the
   * same `filter`.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstancesBackupsCreate.
 */
export interface ProjectsInstancesBackupsCreateOptions {
  /**
   * Required. The id of the backup to be created. The `backup_id` appended to
   * `parent` forms the full backup name of the form
   * `projects//instances//backups/`.
   */
  backupId?: string;
  /**
   * Required. The encryption type of the backup.
   */
  ["encryptionConfig.encryptionType"]?:  | "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_DATABASE_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION";
  /**
   * Optional. The Cloud KMS key that will be used to protect the backup. This
   * field should be set only when encryption_type is
   * `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form
   * `projects//locations//keyRings//cryptoKeys/`.
   */
  ["encryptionConfig.kmsKeyName"]?: string;
}

/**
 * Additional options for Spanner#projectsInstancesBackupsList.
 */
export interface ProjectsInstancesBackupsListOptions {
  /**
   * An expression that filters the list of returned backups. A filter
   * expression consists of a field name, a comparison operator, and a value for
   * filtering. The value must be a string, a number, or a boolean. The
   * comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or
   * `:`. Colon `:` is the contains operator. Filter rules are not case
   * sensitive. The following fields in the Backup are eligible for filtering: *
   * `name` * `database` * `state` * `create_time` (and values are of the format
   * YYYY-MM-DDTHH:MM:SSZ) * `expire_time` (and values are of the format
   * YYYY-MM-DDTHH:MM:SSZ) * `version_time` (and values are of the format
   * YYYY-MM-DDTHH:MM:SSZ) * `size_bytes` You can combine multiple expressions
   * by enclosing each expression in parentheses. By default, expressions are
   * combined with AND logic, but you can specify AND, OR, and NOT logic
   * explicitly. Here are a few examples: * `name:Howl` - The backup's name
   * contains the string "howl". * `database:prod` - The database's name
   * contains the string "prod". * `state:CREATING` - The backup is pending
   * creation. * `state:READY` - The backup is fully created and ready for use.
   * * `(name:howl) AND (create_time < \"2018-03-28T14:50:00Z\")` - The backup
   * name contains the string "howl" and `create_time` of the backup is before
   * 2018-03-28T14:50:00Z. * `expire_time < \"2018-03-28T14:50:00Z\"` - The
   * backup `expire_time` is before 2018-03-28T14:50:00Z. * `size_bytes >
   * 10000000000` - The backup's size is greater than 10GB
   */
  filter?: string;
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
 * Additional options for Spanner#projectsInstancesBackupsOperationsList.
 */
export interface ProjectsInstancesBackupsOperationsListOptions {
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
 * Additional options for Spanner#projectsInstancesBackupsPatch.
 */
export interface ProjectsInstancesBackupsPatchOptions {
  /**
   * Required. A mask specifying which fields (e.g. `expire_time`) in the
   * Backup resource should be updated. This mask is relative to the Backup
   * resource, not to the request message. The field mask must always be
   * specified; this prevents any future fields from being erased accidentally
   * by clients that do not know about them.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsInstancesBackupsPatchOptions(data: any): ProjectsInstancesBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsInstancesBackupsPatchOptions(data: any): ProjectsInstancesBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Spanner#projectsInstancesDatabaseOperationsList.
 */
export interface ProjectsInstancesDatabaseOperationsListOptions {
  /**
   * An expression that filters the list of returned operations. A filter
   * expression consists of a field name, a comparison operator, and a value for
   * filtering. The value must be a string, a number, or a boolean. The
   * comparison operator must be one of: `<`, `>`, `<=`, `>=`, `!=`, `=`, or
   * `:`. Colon `:` is the contains operator. Filter rules are not case
   * sensitive. The following fields in the Operation are eligible for
   * filtering: * `name` - The name of the long-running operation * `done` -
   * False if the operation is in progress, else true. * `metadata.@type` - the
   * type of metadata. For example, the type string for RestoreDatabaseMetadata
   * is
   * `type.googleapis.com/google.spanner.admin.database.v1.RestoreDatabaseMetadata`.
   * * `metadata.` - any field in metadata.value. `metadata.@type` must be
   * specified first, if filtering on metadata fields. * `error` - Error
   * associated with the long-running operation. * `response.@type` - the type
   * of response. * `response.` - any field in response.value. You can combine
   * multiple expressions by enclosing each expression in parentheses. By
   * default, expressions are combined with AND logic. However, you can specify
   * AND, OR, and NOT logic explicitly. Here are a few examples: * `done:true` -
   * The operation is complete. *
   * `(metadata.@type=type.googleapis.com/google.spanner.admin.database.v1.RestoreDatabaseMetadata)
   * AND` \ `(metadata.source_type:BACKUP) AND` \
   * `(metadata.backup_info.backup:backup_howl) AND` \
   * `(metadata.name:restored_howl) AND` \ `(metadata.progress.start_time <
   * \"2018-03-28T14:50:00Z\") AND` \ `(error:*)` - Return operations where: *
   * The operation's metadata type is RestoreDatabaseMetadata. * The database is
   * restored from a backup. * The backup name contains "backup_howl". * The
   * restored database's name contains "restored_howl". * The operation started
   * before 2018-03-28T14:50:00Z. * The operation resulted in an error.
   */
  filter?: string;
  /**
   * Number of operations to be returned in the response. If 0 or less,
   * defaults to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListDatabaseOperationsResponse to the same `parent` and with the
   * same `filter`.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstancesDatabasesDatabaseRolesList.
 */
export interface ProjectsInstancesDatabasesDatabaseRolesListOptions {
  /**
   * Number of database roles to be returned in the response. If 0 or less,
   * defaults to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListDatabaseRolesResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstancesDatabasesGetScans.
 */
export interface ProjectsInstancesDatabasesGetScansOptions {
  /**
   * The upper bound for the time range to retrieve Scan data for.
   */
  endTime?: Date;
  /**
   * These fields restrict the Database-specific information returned in the
   * `Scan.data` field. If a `View` is provided that does not include the
   * `Scan.data` field, these are ignored. This range of time must be entirely
   * contained within the defined time range of the targeted scan. The lower
   * bound for the time range to retrieve Scan data for.
   */
  startTime?: Date;
  /**
   * Specifies which parts of the Scan should be returned in the response.
   * Note, if left unspecified, the FULL view is assumed.
   */
  view?:  | "VIEW_UNSPECIFIED" | "SUMMARY" | "FULL";
}

function serializeProjectsInstancesDatabasesGetScansOptions(data: any): ProjectsInstancesDatabasesGetScansOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsInstancesDatabasesGetScansOptions(data: any): ProjectsInstancesDatabasesGetScansOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Spanner#projectsInstancesDatabasesList.
 */
export interface ProjectsInstancesDatabasesListOptions {
  /**
   * Number of databases to be returned in the response. If 0 or less, defaults
   * to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListDatabasesResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstancesDatabasesOperationsList.
 */
export interface ProjectsInstancesDatabasesOperationsListOptions {
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
 * Additional options for Spanner#projectsInstancesDatabasesSessionsList.
 */
export interface ProjectsInstancesDatabasesSessionsListOptions {
  /**
   * An expression for filtering the results of the request. Filter rules are
   * case insensitive. The fields eligible for filtering are: * `labels.key`
   * where key is the name of a label Some examples of using filters are: *
   * `labels.env:*` --> The session has the label "env". * `labels.env:dev` -->
   * The session has the label "env" and the value of the label contains the
   * string "dev".
   */
  filter?: string;
  /**
   * Number of sessions to be returned in the response. If 0 or less, defaults
   * to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListSessionsResponse.
   */
  pageToken?: string;
}

/**
 * Additional options for Spanner#projectsInstancesGet.
 */
export interface ProjectsInstancesGetOptions {
  /**
   * If field_mask is present, specifies the subset of Instance fields that
   * should be returned. If absent, all Instance fields are returned.
   */
  fieldMask?: string /* FieldMask */;
}

function serializeProjectsInstancesGetOptions(data: any): ProjectsInstancesGetOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsInstancesGetOptions(data: any): ProjectsInstancesGetOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for Spanner#projectsInstancesList.
 */
export interface ProjectsInstancesListOptions {
  /**
   * An expression for filtering the results of the request. Filter rules are
   * case insensitive. The fields eligible for filtering are: * `name` *
   * `display_name` * `labels.key` where key is the name of a label Some
   * examples of using filters are: * `name:*` --> The instance has a name. *
   * `name:Howl` --> The instance's name contains the string "howl". *
   * `name:HOWL` --> Equivalent to above. * `NAME:howl` --> Equivalent to above.
   * * `labels.env:*` --> The instance has the label "env". * `labels.env:dev`
   * --> The instance has the label "env" and the value of the label contains
   * the string "dev". * `name:howl labels.env:dev` --> The instance's name
   * contains "howl" and it has the label "env" with its value containing "dev".
   */
  filter?: string;
  /**
   * Deadline used while retrieving metadata for instances. Instances whose
   * metadata cannot be retrieved within this deadline will be added to
   * unreachable in ListInstancesResponse.
   */
  instanceDeadline?: Date;
  /**
   * Number of instances to be returned in the response. If 0 or less, defaults
   * to the server's maximum allowed page size.
   */
  pageSize?: number;
  /**
   * If non-empty, `page_token` should contain a next_page_token from a
   * previous ListInstancesResponse.
   */
  pageToken?: string;
}

function serializeProjectsInstancesListOptions(data: any): ProjectsInstancesListOptions {
  return {
    ...data,
    instanceDeadline: data["instanceDeadline"] !== undefined ? data["instanceDeadline"].toISOString() : undefined,
  };
}

function deserializeProjectsInstancesListOptions(data: any): ProjectsInstancesListOptions {
  return {
    ...data,
    instanceDeadline: data["instanceDeadline"] !== undefined ? new Date(data["instanceDeadline"]) : undefined,
  };
}

/**
 * Additional options for Spanner#projectsInstancesOperationsList.
 */
export interface ProjectsInstancesOperationsListOptions {
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
 * Query optimizer configuration.
 */
export interface QueryOptions {
  /**
   * An option to control the selection of optimizer statistics package. This
   * parameter allows individual queries to use a different query optimizer
   * statistics package. Specifying `latest` as a value instructs Cloud Spanner
   * to use the latest generated statistics package. If not specified, Cloud
   * Spanner uses the statistics package set at the database level options, or
   * the latest package if the database option is not set. The statistics
   * package requested by the query has to be exempt from garbage collection.
   * This can be achieved with the following DDL statement: ``` ALTER STATISTICS
   * SET OPTIONS (allow_gc=false) ``` The list of available statistics packages
   * can be queried from `INFORMATION_SCHEMA.SPANNER_STATISTICS`. Executing a
   * SQL statement with an invalid optimizer statistics package or with a
   * statistics package that allows garbage collection fails with an
   * `INVALID_ARGUMENT` error.
   */
  optimizerStatisticsPackage?: string;
  /**
   * An option to control the selection of optimizer version. This parameter
   * allows individual queries to pick different query optimizer versions.
   * Specifying `latest` as a value instructs Cloud Spanner to use the latest
   * supported query optimizer version. If not specified, Cloud Spanner uses the
   * optimizer version set at the database level options. Any other positive
   * integer (from the list of supported optimizer versions) overrides the
   * default optimizer version for query execution. The list of supported
   * optimizer versions can be queried from
   * SPANNER_SYS.SUPPORTED_OPTIMIZER_VERSIONS. Executing a SQL statement with an
   * invalid optimizer version fails with an `INVALID_ARGUMENT` error. See
   * https://cloud.google.com/spanner/docs/query-optimizer/manage-query-optimizer
   * for more information on managing the query optimizer. The
   * `optimizer_version` statement hint has precedence over this setting.
   */
  optimizerVersion?: string;
}

/**
 * Contains an ordered list of nodes appearing in the query plan.
 */
export interface QueryPlan {
  /**
   * The nodes in the query plan. Plan nodes are returned in pre-order starting
   * with the plan root. Each PlanNode's `id` corresponds to its index in
   * `plan_nodes`.
   */
  planNodes?: PlanNode[];
}

/**
 * Message type to initiate a read-only transaction.
 */
export interface ReadOnly {
  /**
   * Executes all reads at a timestamp that is `exact_staleness` old. The
   * timestamp is chosen soon after the read is started. Guarantees that all
   * writes that have committed more than the specified number of seconds ago
   * are visible. Because Cloud Spanner chooses the exact timestamp, this mode
   * works even if the client's local clock is substantially skewed from Cloud
   * Spanner commit timestamps. Useful for reading at nearby replicas without
   * the distributed timestamp negotiation overhead of `max_staleness`.
   */
  exactStaleness?: number /* Duration */;
  /**
   * Read data at a timestamp >= `NOW - max_staleness` seconds. Guarantees that
   * all writes that have committed more than the specified number of seconds
   * ago are visible. Because Cloud Spanner chooses the exact timestamp, this
   * mode works even if the client's local clock is substantially skewed from
   * Cloud Spanner commit timestamps. Useful for reading the freshest data
   * available at a nearby replica, while bounding the possible staleness if the
   * local replica has fallen behind. Note that this option can only be used in
   * single-use transactions.
   */
  maxStaleness?: number /* Duration */;
  /**
   * Executes all reads at a timestamp >= `min_read_timestamp`. This is useful
   * for requesting fresher data than some previous read, or data that is fresh
   * enough to observe the effects of some previously committed transaction
   * whose timestamp is known. Note that this option can only be used in
   * single-use transactions. A timestamp in RFC3339 UTC \"Zulu\" format,
   * accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`.
   */
  minReadTimestamp?: Date;
  /**
   * Executes all reads at the given timestamp. Unlike other modes, reads at a
   * specific timestamp are repeatable; the same read at the same timestamp
   * always returns the same data. If the timestamp is in the future, the read
   * will block until the specified timestamp, modulo the read's deadline.
   * Useful for large scale consistent reads such as mapreduces, or for
   * coordinating many reads against a consistent snapshot of the data. A
   * timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example:
   * `"2014-10-02T15:01:23.045123456Z"`.
   */
  readTimestamp?: Date;
  /**
   * If true, the Cloud Spanner-selected read timestamp is included in the
   * Transaction message that describes the transaction.
   */
  returnReadTimestamp?: boolean;
  /**
   * Read at a timestamp where all previously committed transactions are
   * visible.
   */
  strong?: boolean;
}

function serializeReadOnly(data: any): ReadOnly {
  return {
    ...data,
    exactStaleness: data["exactStaleness"] !== undefined ? data["exactStaleness"] : undefined,
    maxStaleness: data["maxStaleness"] !== undefined ? data["maxStaleness"] : undefined,
    minReadTimestamp: data["minReadTimestamp"] !== undefined ? data["minReadTimestamp"].toISOString() : undefined,
    readTimestamp: data["readTimestamp"] !== undefined ? data["readTimestamp"].toISOString() : undefined,
  };
}

function deserializeReadOnly(data: any): ReadOnly {
  return {
    ...data,
    exactStaleness: data["exactStaleness"] !== undefined ? data["exactStaleness"] : undefined,
    maxStaleness: data["maxStaleness"] !== undefined ? data["maxStaleness"] : undefined,
    minReadTimestamp: data["minReadTimestamp"] !== undefined ? new Date(data["minReadTimestamp"]) : undefined,
    readTimestamp: data["readTimestamp"] !== undefined ? new Date(data["readTimestamp"]) : undefined,
  };
}

/**
 * The request for Read and StreamingRead.
 */
export interface ReadRequest {
  /**
   * Required. The columns of table to be returned for each row matching this
   * request.
   */
  columns?: string[];
  /**
   * If non-empty, the name of an index on table. This index is used instead of
   * the table primary key when interpreting key_set and sorting result rows.
   * See key_set for further information.
   */
  index?: string;
  /**
   * Required. `key_set` identifies the rows to be yielded. `key_set` names the
   * primary keys of the rows in table to be yielded, unless index is present.
   * If index is present, then key_set instead names index keys in index. If the
   * partition_token field is empty, rows are yielded in table primary key order
   * (if index is empty) or index key order (if index is non-empty). If the
   * partition_token field is not empty, rows will be yielded in an unspecified
   * order. It is not an error for the `key_set` to name rows that do not exist
   * in the database. Read yields nothing for nonexistent rows.
   */
  keySet?: KeySet;
  /**
   * If greater than zero, only the first `limit` rows are yielded. If `limit`
   * is zero, the default is no limit. A limit cannot be specified if
   * `partition_token` is set.
   */
  limit?: bigint;
  /**
   * If present, results will be restricted to the specified partition
   * previously created using PartitionRead(). There must be an exact match for
   * the values of fields common to this message and the PartitionReadRequest
   * message used to create this partition_token.
   */
  partitionToken?: Uint8Array;
  /**
   * Common options for this request.
   */
  requestOptions?: RequestOptions;
  /**
   * If this request is resuming a previously interrupted read, `resume_token`
   * should be copied from the last PartialResultSet yielded before the
   * interruption. Doing this enables the new read to resume where the last read
   * left off. The rest of the request parameters must exactly match the request
   * that yielded this token.
   */
  resumeToken?: Uint8Array;
  /**
   * Required. The name of the table in the database to be read.
   */
  table?: string;
  /**
   * The transaction to use. If none is provided, the default is a temporary
   * read-only transaction with strong concurrency.
   */
  transaction?: TransactionSelector;
}

function serializeReadRequest(data: any): ReadRequest {
  return {
    ...data,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
    partitionToken: data["partitionToken"] !== undefined ? encodeBase64(data["partitionToken"]) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? encodeBase64(data["resumeToken"]) : undefined,
    transaction: data["transaction"] !== undefined ? serializeTransactionSelector(data["transaction"]) : undefined,
  };
}

function deserializeReadRequest(data: any): ReadRequest {
  return {
    ...data,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
    partitionToken: data["partitionToken"] !== undefined ? decodeBase64(data["partitionToken"] as string) : undefined,
    resumeToken: data["resumeToken"] !== undefined ? decodeBase64(data["resumeToken"] as string) : undefined,
    transaction: data["transaction"] !== undefined ? deserializeTransactionSelector(data["transaction"]) : undefined,
  };
}

/**
 * Message type to initiate a read-write transaction. Currently this
 * transaction type has no options.
 */
export interface ReadWrite {
  /**
   * Read lock mode for the transaction.
   */
  readLockMode?:  | "READ_LOCK_MODE_UNSPECIFIED" | "PESSIMISTIC" | "OPTIMISTIC";
}

export interface ReplicaInfo {
  /**
   * If true, this location is designated as the default leader location where
   * leader replicas are placed. See the [region types
   * documentation](https://cloud.google.com/spanner/docs/instances#region_types)
   * for more details.
   */
  defaultLeaderLocation?: boolean;
  /**
   * The location of the serving resources, e.g. "us-central1".
   */
  location?: string;
  /**
   * The type of replica.
   */
  type?:  | "TYPE_UNSPECIFIED" | "READ_WRITE" | "READ_ONLY" | "WITNESS";
}

/**
 * Common request options for various APIs.
 */
export interface RequestOptions {
  /**
   * Priority for the request.
   */
  priority?:  | "PRIORITY_UNSPECIFIED" | "PRIORITY_LOW" | "PRIORITY_MEDIUM" | "PRIORITY_HIGH";
  /**
   * A per-request tag which can be applied to queries or reads, used for
   * statistics collection. Both request_tag and transaction_tag can be
   * specified for a read or query that belongs to a transaction. This field is
   * ignored for requests where it's not applicable (e.g. CommitRequest). Legal
   * characters for `request_tag` values are all printable characters (ASCII 32
   * - 126) and the length of a request_tag is limited to 50 characters. Values
   * that exceed this limit are truncated. Any leading underscore (_) characters
   * will be removed from the string.
   */
  requestTag?: string;
  /**
   * A tag used for statistics collection about this transaction. Both
   * request_tag and transaction_tag can be specified for a read or query that
   * belongs to a transaction. The value of transaction_tag should be the same
   * for all requests belonging to the same transaction. If this request doesn't
   * belong to any transaction, transaction_tag will be ignored. Legal
   * characters for `transaction_tag` values are all printable characters (ASCII
   * 32 - 126) and the length of a transaction_tag is limited to 50 characters.
   * Values that exceed this limit are truncated. Any leading underscore (_)
   * characters will be removed from the string.
   */
  transactionTag?: string;
}

/**
 * Encryption configuration for the restored database.
 */
export interface RestoreDatabaseEncryptionConfig {
  /**
   * Required. The encryption type of the restored database.
   */
  encryptionType?:  | "ENCRYPTION_TYPE_UNSPECIFIED" | "USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION";
  /**
   * Optional. The Cloud KMS key that will be used to encrypt/decrypt the
   * restored database. This field should be set only when encryption_type is
   * `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form
   * `projects//locations//keyRings//cryptoKeys/`.
   */
  kmsKeyName?: string;
}

/**
 * Metadata type for the long-running operation returned by RestoreDatabase.
 */
export interface RestoreDatabaseMetadata {
  /**
   * Information about the backup used to restore the database.
   */
  backupInfo?: BackupInfo;
  /**
   * The time at which cancellation of this operation was received.
   * Operations.CancelOperation starts asynchronous cancellation on a
   * long-running operation. The server makes a best effort to cancel the
   * operation, but success is not guaranteed. Clients can use
   * Operations.GetOperation or other methods to check whether the cancellation
   * succeeded or whether the operation completed despite cancellation. On
   * successful cancellation, the operation is not deleted; instead, it becomes
   * an operation with an Operation.error value with a google.rpc.Status.code of
   * 1, corresponding to `Code.CANCELLED`.
   */
  cancelTime?: Date;
  /**
   * Name of the database being created and restored to.
   */
  name?: string;
  /**
   * If exists, the name of the long-running operation that will be used to
   * track the post-restore optimization process to optimize the performance of
   * the restored database, and remove the dependency on the restore source. The
   * name is of the form `projects//instances//databases//operations/` where the
   * is the name of database being created and restored to. The metadata type of
   * the long-running operation is OptimizeRestoredDatabaseMetadata. This
   * long-running operation will be automatically created by the system after
   * the RestoreDatabase long-running operation completes successfully. This
   * operation will not be created if the restore was not successful.
   */
  optimizeDatabaseOperationName?: string;
  /**
   * The progress of the RestoreDatabase operation.
   */
  progress?: OperationProgress;
  /**
   * The type of the restore source.
   */
  sourceType?:  | "TYPE_UNSPECIFIED" | "BACKUP";
}

function serializeRestoreDatabaseMetadata(data: any): RestoreDatabaseMetadata {
  return {
    ...data,
    backupInfo: data["backupInfo"] !== undefined ? serializeBackupInfo(data["backupInfo"]) : undefined,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    progress: data["progress"] !== undefined ? serializeOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeRestoreDatabaseMetadata(data: any): RestoreDatabaseMetadata {
  return {
    ...data,
    backupInfo: data["backupInfo"] !== undefined ? deserializeBackupInfo(data["backupInfo"]) : undefined,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    progress: data["progress"] !== undefined ? deserializeOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for RestoreDatabase.
 */
export interface RestoreDatabaseRequest {
  /**
   * Name of the backup from which to restore. Values are of the form
   * `projects//instances//backups/`.
   */
  backup?: string;
  /**
   * Required. The id of the database to create and restore to. This database
   * must not already exist. The `database_id` appended to `parent` forms the
   * full database name of the form `projects//instances//databases/`.
   */
  databaseId?: string;
  /**
   * Optional. An encryption configuration describing the encryption type and
   * key resources in Cloud KMS used to encrypt/decrypt the database to restore
   * to. If this field is not specified, the restored database will use the same
   * encryption configuration as the backup by default, namely encryption_type =
   * `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`.
   */
  encryptionConfig?: RestoreDatabaseEncryptionConfig;
}

/**
 * Information about the database restore.
 */
export interface RestoreInfo {
  /**
   * Information about the backup used to restore the database. The backup may
   * no longer exist.
   */
  backupInfo?: BackupInfo;
  /**
   * The type of the restore source.
   */
  sourceType?:  | "TYPE_UNSPECIFIED" | "BACKUP";
}

function serializeRestoreInfo(data: any): RestoreInfo {
  return {
    ...data,
    backupInfo: data["backupInfo"] !== undefined ? serializeBackupInfo(data["backupInfo"]) : undefined,
  };
}

function deserializeRestoreInfo(data: any): RestoreInfo {
  return {
    ...data,
    backupInfo: data["backupInfo"] !== undefined ? deserializeBackupInfo(data["backupInfo"]) : undefined,
  };
}

/**
 * Results from Read or ExecuteSql.
 */
export interface ResultSet {
  /**
   * Metadata about the result set, such as row type information.
   */
  metadata?: ResultSetMetadata;
  /**
   * Each element in `rows` is a row whose format is defined by
   * metadata.row_type. The ith element in each row matches the ith field in
   * metadata.row_type. Elements are encoded based on type as described here.
   */
  rows?: any[][];
  /**
   * Query plan and execution statistics for the SQL statement that produced
   * this result set. These can be requested by setting
   * ExecuteSqlRequest.query_mode. DML statements always produce stats
   * containing the number of rows modified, unless executed using the
   * ExecuteSqlRequest.QueryMode.PLAN ExecuteSqlRequest.query_mode. Other fields
   * may or may not be populated, based on the ExecuteSqlRequest.query_mode.
   */
  stats?: ResultSetStats;
}

function serializeResultSet(data: any): ResultSet {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeResultSetMetadata(data["metadata"]) : undefined,
    stats: data["stats"] !== undefined ? serializeResultSetStats(data["stats"]) : undefined,
  };
}

function deserializeResultSet(data: any): ResultSet {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeResultSetMetadata(data["metadata"]) : undefined,
    stats: data["stats"] !== undefined ? deserializeResultSetStats(data["stats"]) : undefined,
  };
}

/**
 * Metadata about a ResultSet or PartialResultSet.
 */
export interface ResultSetMetadata {
  /**
   * Indicates the field names and types for the rows in the result set. For
   * example, a SQL query like `"SELECT UserId, UserName FROM Users"` could
   * return a `row_type` value like: "fields": [ { "name": "UserId", "type": {
   * "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" } },
   * ]
   */
  rowType?: StructType;
  /**
   * If the read or SQL query began a transaction as a side-effect, the
   * information about the new transaction is yielded here.
   */
  transaction?: Transaction;
  /**
   * A SQL query can be parameterized. In PLAN mode, these parameters can be
   * undeclared. This indicates the field names and types for those undeclared
   * parameters in the SQL query. For example, a SQL query like `"SELECT * FROM
   * Users where UserId = @userId and UserName = @userName "` could return a
   * `undeclared_parameters` value like: "fields": [ { "name": "UserId", "type":
   * { "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" }
   * }, ]
   */
  undeclaredParameters?: StructType;
}

function serializeResultSetMetadata(data: any): ResultSetMetadata {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? serializeTransaction(data["transaction"]) : undefined,
  };
}

function deserializeResultSetMetadata(data: any): ResultSetMetadata {
  return {
    ...data,
    transaction: data["transaction"] !== undefined ? deserializeTransaction(data["transaction"]) : undefined,
  };
}

/**
 * Additional statistics about a ResultSet or PartialResultSet.
 */
export interface ResultSetStats {
  /**
   * QueryPlan for the query associated with this result.
   */
  queryPlan?: QueryPlan;
  /**
   * Aggregated statistics from the execution of the query. Only present when
   * the query is profiled. For example, a query could return the statistics as
   * follows: { "rows_returned": "3", "elapsed_time": "1.22 secs", "cpu_time":
   * "1.19 secs" }
   */
  queryStats?: {
    [key: string]: any
  };
  /**
   * Standard DML returns an exact count of rows that were modified.
   */
  rowCountExact?: bigint;
  /**
   * Partitioned DML does not offer exactly-once semantics, so it returns a
   * lower bound of the rows modified.
   */
  rowCountLowerBound?: bigint;
}

function serializeResultSetStats(data: any): ResultSetStats {
  return {
    ...data,
    rowCountExact: data["rowCountExact"] !== undefined ? String(data["rowCountExact"]) : undefined,
    rowCountLowerBound: data["rowCountLowerBound"] !== undefined ? String(data["rowCountLowerBound"]) : undefined,
  };
}

function deserializeResultSetStats(data: any): ResultSetStats {
  return {
    ...data,
    rowCountExact: data["rowCountExact"] !== undefined ? BigInt(data["rowCountExact"]) : undefined,
    rowCountLowerBound: data["rowCountLowerBound"] !== undefined ? BigInt(data["rowCountLowerBound"]) : undefined,
  };
}

/**
 * The request for Rollback.
 */
export interface RollbackRequest {
  /**
   * Required. The transaction to roll back.
   */
  transactionId?: Uint8Array;
}

function serializeRollbackRequest(data: any): RollbackRequest {
  return {
    ...data,
    transactionId: data["transactionId"] !== undefined ? encodeBase64(data["transactionId"]) : undefined,
  };
}

function deserializeRollbackRequest(data: any): RollbackRequest {
  return {
    ...data,
    transactionId: data["transactionId"] !== undefined ? decodeBase64(data["transactionId"] as string) : undefined,
  };
}

/**
 * Scan is a structure which describes Cloud Key Visualizer scan information.
 */
export interface Scan {
  /**
   * Additional information provided by the implementer.
   */
  details?: {
    [key: string]: any
  };
  /**
   * The upper bound for when the scan is defined.
   */
  endTime?: Date;
  /**
   * The unique name of the scan, specific to the Database service implementing
   * this interface.
   */
  name?: string;
  /**
   * Output only. Cloud Key Visualizer scan data. Note, this field is not
   * available to the ListScans method.
   */
  readonly scanData?: ScanData;
  /**
   * A range of time (inclusive) for when the scan is defined. The lower bound
   * for when the scan is defined.
   */
  startTime?: Date;
}

function serializeScan(data: any): Scan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeScan(data: any): Scan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    scanData: data["scanData"] !== undefined ? deserializeScanData(data["scanData"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * ScanData contains Cloud Key Visualizer scan data used by the caller to
 * construct a visualization.
 */
export interface ScanData {
  /**
   * Cloud Key Visualizer scan data. The range of time this information covers
   * is captured via the above time range fields. Note, this field is not
   * available to the ListScans method.
   */
  data?: VisualizationData;
  /**
   * The upper bound for when the contained data is defined.
   */
  endTime?: Date;
  /**
   * A range of time (inclusive) for when the contained data is defined. The
   * lower bound for when the contained data is defined.
   */
  startTime?: Date;
}

function serializeScanData(data: any): ScanData {
  return {
    ...data,
    data: data["data"] !== undefined ? serializeVisualizationData(data["data"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeScanData(data: any): ScanData {
  return {
    ...data,
    data: data["data"] !== undefined ? deserializeVisualizationData(data["data"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Spanner#scansList.
 */
export interface ScansListOptions {
  /**
   * A filter expression to restrict the results based on information present
   * in the available Scan collection. The filter applies to all fields within
   * the Scan message except for `data`.
   */
  filter?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
  /**
   * Specifies which parts of the Scan should be returned in the response.
   * Note, only the SUMMARY view (the default) is currently supported for
   * ListScans.
   */
  view?:  | "VIEW_UNSPECIFIED" | "SUMMARY" | "FULL";
}

/**
 * A session in the Cloud Spanner API.
 */
export interface Session {
  /**
   * Output only. The approximate timestamp when the session is last used. It
   * is typically earlier than the actual last use time.
   */
  readonly approximateLastUseTime?: Date;
  /**
   * Output only. The timestamp when the session is created.
   */
  readonly createTime?: Date;
  /**
   * The database role which created this session.
   */
  creatorRole?: string;
  /**
   * The labels for the session. * Label keys must be between 1 and 63
   * characters long and must conform to the following regular expression:
   * `[a-z]([-a-z0-9]*[a-z0-9])?`. * Label values must be between 0 and 63
   * characters long and must conform to the regular expression
   * `([a-z]([-a-z0-9]*[a-z0-9])?)?`. * No more than 64 labels can be associated
   * with a given session. See https://goo.gl/xmQnxf for more information on and
   * examples of labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The name of the session. This is always system-assigned.
   */
  readonly name?: string;
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
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * Condensed representation of a node and its subtree. Only present for
 * `SCALAR` PlanNode(s).
 */
export interface ShortRepresentation {
  /**
   * A string representation of the expression subtree rooted at this node.
   */
  description?: string;
  /**
   * A mapping of (subquery variable name) -> (subquery node id) for cases
   * where the `description` string of this node references a `SCALAR` subquery
   * contained in the expression subtree rooted at this node. The referenced
   * `SCALAR` subquery may not necessarily be a direct child of this node.
   */
  subqueries?: {
    [key: string]: number
  };
}

/**
 * A single DML statement.
 */
export interface Statement {
  /**
   * Parameter names and values that bind to placeholders in the DML string. A
   * parameter placeholder consists of the `@` character followed by the
   * parameter name (for example, `@firstName`). Parameter names can contain
   * letters, numbers, and underscores. Parameters can appear anywhere that a
   * literal value is expected. The same parameter name can be used more than
   * once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It is an
   * error to execute a SQL statement with unbound parameters.
   */
  params?: {
    [key: string]: any
  };
  /**
   * It is not always possible for Cloud Spanner to infer the right SQL type
   * from a JSON value. For example, values of type `BYTES` and values of type
   * `STRING` both appear in params as JSON strings. In these cases,
   * `param_types` can be used to specify the exact SQL type for some or all of
   * the SQL statement parameters. See the definition of Type for more
   * information about SQL types.
   */
  paramTypes?: {
    [key: string]: Type
  };
  /**
   * Required. The DML string.
   */
  sql?: string;
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
 * `StructType` defines the fields of a STRUCT type.
 */
export interface StructType {
  /**
   * The list of fields that make up this struct. Order is significant, because
   * values of this struct type are represented as lists, where the order of
   * field values matches the order of fields in the StructType. In turn, the
   * order of fields matches the order of columns in a read request, or the
   * order of fields in the `SELECT` clause of a query.
   */
  fields?: Field[];
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * REQUIRED: The set of permissions to check for 'resource'. Permissions with
   * wildcards (such as '*', 'spanner.*', 'spanner.instances.*') are not
   * allowed.
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
 * A transaction.
 */
export interface Transaction {
  /**
   * `id` may be used to identify the transaction in subsequent Read,
   * ExecuteSql, Commit, or Rollback calls. Single-use read-only transactions do
   * not have IDs, because single-use transactions do not support multiple
   * requests.
   */
  id?: Uint8Array;
  /**
   * For snapshot read-only transactions, the read timestamp chosen for the
   * transaction. Not returned by default: see
   * TransactionOptions.ReadOnly.return_read_timestamp. A timestamp in RFC3339
   * UTC \"Zulu\" format, accurate to nanoseconds. Example:
   * `"2014-10-02T15:01:23.045123456Z"`.
   */
  readTimestamp?: Date;
}

function serializeTransaction(data: any): Transaction {
  return {
    ...data,
    id: data["id"] !== undefined ? encodeBase64(data["id"]) : undefined,
    readTimestamp: data["readTimestamp"] !== undefined ? data["readTimestamp"].toISOString() : undefined,
  };
}

function deserializeTransaction(data: any): Transaction {
  return {
    ...data,
    id: data["id"] !== undefined ? decodeBase64(data["id"] as string) : undefined,
    readTimestamp: data["readTimestamp"] !== undefined ? new Date(data["readTimestamp"]) : undefined,
  };
}

/**
 * Transactions: Each session can have at most one active transaction at a time
 * (note that standalone reads and queries use a transaction internally and do
 * count towards the one transaction limit). After the active transaction is
 * completed, the session can immediately be re-used for the next transaction.
 * It is not necessary to create a new session for each transaction. Transaction
 * modes: Cloud Spanner supports three transaction modes: 1. Locking read-write.
 * This type of transaction is the only way to write data into Cloud Spanner.
 * These transactions rely on pessimistic locking and, if necessary, two-phase
 * commit. Locking read-write transactions may abort, requiring the application
 * to retry. 2. Snapshot read-only. Snapshot read-only transactions provide
 * guaranteed consistency across several reads, but do not allow writes.
 * Snapshot read-only transactions can be configured to read at timestamps in
 * the past, or configured to perform a strong read (where Spanner will select a
 * timestamp such that the read is guaranteed to see the effects of all
 * transactions that have committed before the start of the read). Snapshot
 * read-only transactions do not need to be committed. Queries on change streams
 * must be performed with the snapshot read-only transaction mode, specifying a
 * strong read. Please see TransactionOptions.ReadOnly.strong for more details.
 * 3. Partitioned DML. This type of transaction is used to execute a single
 * Partitioned DML statement. Partitioned DML partitions the key space and runs
 * the DML statement over each partition in parallel using separate, internal
 * transactions that commit independently. Partitioned DML transactions do not
 * need to be committed. For transactions that only read, snapshot read-only
 * transactions provide simpler semantics and are almost always faster. In
 * particular, read-only transactions do not take locks, so they do not conflict
 * with read-write transactions. As a consequence of not taking locks, they also
 * do not abort, so retry loops are not needed. Transactions may only read-write
 * data in a single database. They may, however, read-write data in different
 * tables within that database. Locking read-write transactions: Locking
 * transactions may be used to atomically read-modify-write data anywhere in a
 * database. This type of transaction is externally consistent. Clients should
 * attempt to minimize the amount of time a transaction is active. Faster
 * transactions commit with higher probability and cause less contention. Cloud
 * Spanner attempts to keep read locks active as long as the transaction
 * continues to do reads, and the transaction has not been terminated by Commit
 * or Rollback. Long periods of inactivity at the client may cause Cloud Spanner
 * to release a transaction's locks and abort it. Conceptually, a read-write
 * transaction consists of zero or more reads or SQL statements followed by
 * Commit. At any time before Commit, the client can send a Rollback request to
 * abort the transaction. Semantics: Cloud Spanner can commit the transaction if
 * all read locks it acquired are still valid at commit time, and it is able to
 * acquire write locks for all writes. Cloud Spanner can abort the transaction
 * for any reason. If a commit attempt returns `ABORTED`, Cloud Spanner
 * guarantees that the transaction has not modified any user data in Cloud
 * Spanner. Unless the transaction commits, Cloud Spanner makes no guarantees
 * about how long the transaction's locks were held for. It is an error to use
 * Cloud Spanner locks for any sort of mutual exclusion other than between Cloud
 * Spanner transactions themselves. Retrying aborted transactions: When a
 * transaction aborts, the application can choose to retry the whole transaction
 * again. To maximize the chances of successfully committing the retry, the
 * client should execute the retry in the same session as the original attempt.
 * The original session's lock priority increases with each consecutive abort,
 * meaning that each attempt has a slightly better chance of success than the
 * previous. Under some circumstances (for example, many transactions attempting
 * to modify the same row(s)), a transaction can abort many times in a short
 * period before successfully committing. Thus, it is not a good idea to cap the
 * number of retries a transaction can attempt; instead, it is better to limit
 * the total amount of time spent retrying. Idle transactions: A transaction is
 * considered idle if it has no outstanding reads or SQL queries and has not
 * started a read or SQL query within the last 10 seconds. Idle transactions can
 * be aborted by Cloud Spanner so that they don't hold on to locks indefinitely.
 * If an idle transaction is aborted, the commit will fail with error `ABORTED`.
 * If this behavior is undesirable, periodically executing a simple SQL query in
 * the transaction (for example, `SELECT 1`) prevents the transaction from
 * becoming idle. Snapshot read-only transactions: Snapshot read-only
 * transactions provides a simpler method than locking read-write transactions
 * for doing several consistent reads. However, this type of transaction does
 * not support writes. Snapshot transactions do not take locks. Instead, they
 * work by choosing a Cloud Spanner timestamp, then executing all reads at that
 * timestamp. Since they do not acquire locks, they do not block concurrent
 * read-write transactions. Unlike locking read-write transactions, snapshot
 * read-only transactions never abort. They can fail if the chosen read
 * timestamp is garbage collected; however, the default garbage collection
 * policy is generous enough that most applications do not need to worry about
 * this in practice. Snapshot read-only transactions do not need to call Commit
 * or Rollback (and in fact are not permitted to do so). To execute a snapshot
 * transaction, the client specifies a timestamp bound, which tells Cloud
 * Spanner how to choose a read timestamp. The types of timestamp bound are: -
 * Strong (the default). - Bounded staleness. - Exact staleness. If the Cloud
 * Spanner database to be read is geographically distributed, stale read-only
 * transactions can execute more quickly than strong or read-write transactions,
 * because they are able to execute far from the leader replica. Each type of
 * timestamp bound is discussed in detail below. Strong: Strong reads are
 * guaranteed to see the effects of all transactions that have committed before
 * the start of the read. Furthermore, all rows yielded by a single read are
 * consistent with each other -- if any part of the read observes a transaction,
 * all parts of the read see the transaction. Strong reads are not repeatable:
 * two consecutive strong read-only transactions might return inconsistent
 * results if there are concurrent writes. If consistency across reads is
 * required, the reads should be executed within a transaction or at an exact
 * read timestamp. Queries on change streams (see below for more details) must
 * also specify the strong read timestamp bound. See
 * TransactionOptions.ReadOnly.strong. Exact staleness: These timestamp bounds
 * execute reads at a user-specified timestamp. Reads at a timestamp are
 * guaranteed to see a consistent prefix of the global transaction history: they
 * observe modifications done by all transactions with a commit timestamp less
 * than or equal to the read timestamp, and observe none of the modifications
 * done by transactions with a larger commit timestamp. They will block until
 * all conflicting transactions that may be assigned commit timestamps <= the
 * read timestamp have finished. The timestamp can either be expressed as an
 * absolute Cloud Spanner commit timestamp or a staleness relative to the
 * current time. These modes do not require a "negotiation phase" to pick a
 * timestamp. As a result, they execute slightly faster than the equivalent
 * boundedly stale concurrency modes. On the other hand, boundedly stale reads
 * usually return fresher results. See
 * TransactionOptions.ReadOnly.read_timestamp and
 * TransactionOptions.ReadOnly.exact_staleness. Bounded staleness: Bounded
 * staleness modes allow Cloud Spanner to pick the read timestamp, subject to a
 * user-provided staleness bound. Cloud Spanner chooses the newest timestamp
 * within the staleness bound that allows execution of the reads at the closest
 * available replica without blocking. All rows yielded are consistent with each
 * other -- if any part of the read observes a transaction, all parts of the
 * read see the transaction. Boundedly stale reads are not repeatable: two stale
 * reads, even if they use the same staleness bound, can execute at different
 * timestamps and thus return inconsistent results. Boundedly stale reads
 * execute in two phases: the first phase negotiates a timestamp among all
 * replicas needed to serve the read. In the second phase, reads are executed at
 * the negotiated timestamp. As a result of the two phase execution, bounded
 * staleness reads are usually a little slower than comparable exact staleness
 * reads. However, they are typically able to return fresher results, and are
 * more likely to execute at the closest replica. Because the timestamp
 * negotiation requires up-front knowledge of which rows will be read, it can
 * only be used with single-use read-only transactions. See
 * TransactionOptions.ReadOnly.max_staleness and
 * TransactionOptions.ReadOnly.min_read_timestamp. Old read timestamps and
 * garbage collection: Cloud Spanner continuously garbage collects deleted and
 * overwritten data in the background to reclaim storage space. This process is
 * known as "version GC". By default, version GC reclaims versions after they
 * are one hour old. Because of this, Cloud Spanner cannot perform reads at read
 * timestamps more than one hour in the past. This restriction also applies to
 * in-progress reads and/or SQL queries whose timestamp become too old while
 * executing. Reads and SQL queries with too-old read timestamps fail with the
 * error `FAILED_PRECONDITION`. You can configure and extend the
 * `VERSION_RETENTION_PERIOD` of a database up to a period as long as one week,
 * which allows Cloud Spanner to perform reads up to one week in the past.
 * Querying change Streams: A Change Stream is a schema object that can be
 * configured to watch data changes on the entire database, a set of tables, or
 * a set of columns in a database. When a change stream is created, Spanner
 * automatically defines a corresponding SQL Table-Valued Function (TVF) that
 * can be used to query the change records in the associated change stream using
 * the ExecuteStreamingSql API. The name of the TVF for a change stream is
 * generated from the name of the change stream: READ_. All queries on change
 * stream TVFs must be executed using the ExecuteStreamingSql API with a
 * single-use read-only transaction with a strong read-only timestamp_bound. The
 * change stream TVF allows users to specify the start_timestamp and
 * end_timestamp for the time range of interest. All change records within the
 * retention period is accessible using the strong read-only timestamp_bound.
 * All other TransactionOptions are invalid for change stream queries. In
 * addition, if TransactionOptions.read_only.return_read_timestamp is set to
 * true, a special value of 2^63 - 2 will be returned in the Transaction message
 * that describes the transaction, instead of a valid read timestamp. This
 * special value should be discarded and not used for any subsequent queries.
 * Please see https://cloud.google.com/spanner/docs/change-streams for more
 * details on how to query the change stream TVFs. Partitioned DML transactions:
 * Partitioned DML transactions are used to execute DML statements with a
 * different execution strategy that provides different, and often better,
 * scalability properties for large, table-wide operations than DML in a
 * ReadWrite transaction. Smaller scoped statements, such as an OLTP workload,
 * should prefer using ReadWrite transactions. Partitioned DML partitions the
 * keyspace and runs the DML statement on each partition in separate, internal
 * transactions. These transactions commit automatically when complete, and run
 * independently from one another. To reduce lock contention, this execution
 * strategy only acquires read locks on rows that match the WHERE clause of the
 * statement. Additionally, the smaller per-partition transactions hold locks
 * for less time. That said, Partitioned DML is not a drop-in replacement for
 * standard DML used in ReadWrite transactions. - The DML statement must be
 * fully-partitionable. Specifically, the statement must be expressible as the
 * union of many statements which each access only a single row of the table. -
 * The statement is not applied atomically to all rows of the table. Rather, the
 * statement is applied atomically to partitions of the table, in independent
 * transactions. Secondary index rows are updated atomically with the base table
 * rows. - Partitioned DML does not guarantee exactly-once execution semantics
 * against a partition. The statement will be applied at least once to each
 * partition. It is strongly recommended that the DML statement should be
 * idempotent to avoid unexpected results. For instance, it is potentially
 * dangerous to run a statement such as `UPDATE table SET column = column + 1`
 * as it could be run multiple times against some rows. - The partitions are
 * committed automatically - there is no support for Commit or Rollback. If the
 * call returns an error, or if the client issuing the ExecuteSql call dies, it
 * is possible that some rows had the statement executed on them successfully.
 * It is also possible that statement was never executed against other rows. -
 * Partitioned DML transactions may only contain the execution of a single DML
 * statement via ExecuteSql or ExecuteStreamingSql. - If any error is
 * encountered during the execution of the partitioned DML operation (for
 * instance, a UNIQUE INDEX violation, division by zero, or a value that cannot
 * be stored due to schema constraints), then the operation is stopped at that
 * point and an error is returned. It is possible that at this point, some
 * partitions have been committed (or even committed multiple times), and other
 * partitions have not been run at all. Given the above, Partitioned DML is good
 * fit for large, database-wide, operations that are idempotent, such as
 * deleting old rows from a very large table.
 */
export interface TransactionOptions {
  /**
   * Partitioned DML transaction. Authorization to begin a Partitioned DML
   * transaction requires `spanner.databases.beginPartitionedDmlTransaction`
   * permission on the `session` resource.
   */
  partitionedDml?: PartitionedDml;
  /**
   * Transaction will not write. Authorization to begin a read-only transaction
   * requires `spanner.databases.beginReadOnlyTransaction` permission on the
   * `session` resource.
   */
  readOnly?: ReadOnly;
  /**
   * Transaction may write. Authorization to begin a read-write transaction
   * requires `spanner.databases.beginOrRollbackReadWriteTransaction` permission
   * on the `session` resource.
   */
  readWrite?: ReadWrite;
}

function serializeTransactionOptions(data: any): TransactionOptions {
  return {
    ...data,
    readOnly: data["readOnly"] !== undefined ? serializeReadOnly(data["readOnly"]) : undefined,
  };
}

function deserializeTransactionOptions(data: any): TransactionOptions {
  return {
    ...data,
    readOnly: data["readOnly"] !== undefined ? deserializeReadOnly(data["readOnly"]) : undefined,
  };
}

/**
 * This message is used to select the transaction in which a Read or ExecuteSql
 * call runs. See TransactionOptions for more information about transactions.
 */
export interface TransactionSelector {
  /**
   * Begin a new transaction and execute this read or SQL query in it. The
   * transaction ID of the new transaction is returned in
   * ResultSetMetadata.transaction, which is a Transaction.
   */
  begin?: TransactionOptions;
  /**
   * Execute the read or SQL query in a previously-started transaction.
   */
  id?: Uint8Array;
  /**
   * Execute the read or SQL query in a temporary transaction. This is the most
   * efficient way to execute a transaction that consists of a single SQL query.
   */
  singleUse?: TransactionOptions;
}

function serializeTransactionSelector(data: any): TransactionSelector {
  return {
    ...data,
    begin: data["begin"] !== undefined ? serializeTransactionOptions(data["begin"]) : undefined,
    id: data["id"] !== undefined ? encodeBase64(data["id"]) : undefined,
    singleUse: data["singleUse"] !== undefined ? serializeTransactionOptions(data["singleUse"]) : undefined,
  };
}

function deserializeTransactionSelector(data: any): TransactionSelector {
  return {
    ...data,
    begin: data["begin"] !== undefined ? deserializeTransactionOptions(data["begin"]) : undefined,
    id: data["id"] !== undefined ? decodeBase64(data["id"] as string) : undefined,
    singleUse: data["singleUse"] !== undefined ? deserializeTransactionOptions(data["singleUse"]) : undefined,
  };
}

/**
 * `Type` indicates the type of a Cloud Spanner value, as might be stored in a
 * table cell or returned from an SQL query.
 */
export interface Type {
  /**
   * If code == ARRAY, then `array_element_type` is the type of the array
   * elements.
   */
  arrayElementType?: Type;
  /**
   * Required. The TypeCode for this type.
   */
  code?:  | "TYPE_CODE_UNSPECIFIED" | "BOOL" | "INT64" | "FLOAT64" | "TIMESTAMP" | "DATE" | "STRING" | "BYTES" | "ARRAY" | "STRUCT" | "NUMERIC" | "JSON" | "PROTO" | "ENUM";
  /**
   * If code == PROTO or code == ENUM, then `proto_type_fqn` is the fully
   * qualified name of the proto type representing the proto/enum definition.
   */
  protoTypeFqn?: string;
  /**
   * If code == STRUCT, then `struct_type` provides type information for the
   * struct's fields.
   */
  structType?: StructType;
  /**
   * The TypeAnnotationCode that disambiguates SQL type that Spanner will use
   * to represent values of this type during query processing. This is necessary
   * for some type codes because a single TypeCode can be mapped to different
   * SQL types depending on the SQL dialect. type_annotation typically is not
   * needed to process the content of a value (it doesn't affect serialization)
   * and clients can ignore it on the read path.
   */
  typeAnnotation?:  | "TYPE_ANNOTATION_CODE_UNSPECIFIED" | "PG_NUMERIC" | "PG_JSONB";
}

/**
 * Metadata type for the operation returned by UpdateDatabaseDdl.
 */
export interface UpdateDatabaseDdlMetadata {
  /**
   * Reports the commit timestamps of all statements that have succeeded so
   * far, where `commit_timestamps[i]` is the commit timestamp for the statement
   * `statements[i]`.
   */
  commitTimestamps?: Date[];
  /**
   * The database being modified.
   */
  database?: string;
  /**
   * The progress of the UpdateDatabaseDdl operations. Currently, only index
   * creation statements will have a continuously updating progress. For
   * non-index creation statements, `progress[i]` will have start time and end
   * time populated with commit timestamp of operation, as well as a progress of
   * 100% once the operation has completed. `progress[i]` is the operation
   * progress for `statements[i]`.
   */
  progress?: OperationProgress[];
  /**
   * For an update this list contains all the statements. For an individual
   * statement, this list contains only that statement.
   */
  statements?: string[];
  /**
   * Output only. When true, indicates that the operation is throttled e.g due
   * to resource constraints. When resources become available the operation will
   * resume and this field will be false again.
   */
  readonly throttled?: boolean;
}

function serializeUpdateDatabaseDdlMetadata(data: any): UpdateDatabaseDdlMetadata {
  return {
    ...data,
    commitTimestamps: data["commitTimestamps"] !== undefined ? data["commitTimestamps"].map((item: any) => (item.toISOString())) : undefined,
    progress: data["progress"] !== undefined ? data["progress"].map((item: any) => (serializeOperationProgress(item))) : undefined,
  };
}

function deserializeUpdateDatabaseDdlMetadata(data: any): UpdateDatabaseDdlMetadata {
  return {
    ...data,
    commitTimestamps: data["commitTimestamps"] !== undefined ? data["commitTimestamps"].map((item: any) => (new Date(item))) : undefined,
    progress: data["progress"] !== undefined ? data["progress"].map((item: any) => (deserializeOperationProgress(item))) : undefined,
  };
}

/**
 * Enqueues the given DDL statements to be applied, in order but not
 * necessarily all at once, to the database schema at some point (or points) in
 * the future. The server checks that the statements are executable
 * (syntactically valid, name tables that exist, etc.) before enqueueing them,
 * but they may still fail upon later execution (e.g., if a statement from
 * another batch of statements is applied first and it conflicts in some way, or
 * if there is some data-related problem like a `NULL` value in a column to
 * which `NOT NULL` would be added). If a statement fails, all subsequent
 * statements in the batch are automatically cancelled. Each batch of statements
 * is assigned a name which can be used with the Operations API to monitor
 * progress. See the operation_id field for more details.
 */
export interface UpdateDatabaseDdlRequest {
  /**
   * If empty, the new update request is assigned an automatically-generated
   * operation ID. Otherwise, `operation_id` is used to construct the name of
   * the resulting Operation. Specifying an explicit operation ID simplifies
   * determining whether the statements were executed in the event that the
   * UpdateDatabaseDdl call is replayed, or the return value is otherwise lost:
   * the database and `operation_id` fields can be combined to form the name of
   * the resulting longrunning.Operation: `/operations/`. `operation_id` should
   * be unique within the database, and must be a valid identifier: `a-z*`. Note
   * that automatically-generated operation IDs always begin with an underscore.
   * If the named operation already exists, UpdateDatabaseDdl returns
   * `ALREADY_EXISTS`.
   */
  operationId?: string;
  /**
   * Optional. Proto descriptors used by CREATE/ALTER PROTO BUNDLE statements.
   * Contains a protobuf-serialized
   * [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto).
   * To generate it, [install](https://grpc.io/docs/protoc-installation/) and
   * run `protoc` with --include_imports and --descriptor_set_out. For example,
   * to generate for moon/shot/app.proto, run """ $protoc --proto_path=/app_path
   * --proto_path=/lib_path \ --include_imports \
   * --descriptor_set_out=descriptors.data \ moon/shot/app.proto """ For more
   * details, see protobuffer [self
   * description](https://developers.google.com/protocol-buffers/docs/techniques#self-description).
   */
  protoDescriptors?: Uint8Array;
  /**
   * Required. DDL statements to be applied to the database.
   */
  statements?: string[];
}

function serializeUpdateDatabaseDdlRequest(data: any): UpdateDatabaseDdlRequest {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? encodeBase64(data["protoDescriptors"]) : undefined,
  };
}

function deserializeUpdateDatabaseDdlRequest(data: any): UpdateDatabaseDdlRequest {
  return {
    ...data,
    protoDescriptors: data["protoDescriptors"] !== undefined ? decodeBase64(data["protoDescriptors"] as string) : undefined,
  };
}

/**
 * Metadata type for the operation returned by UpdateInstanceConfig.
 */
export interface UpdateInstanceConfigMetadata {
  /**
   * The time at which this operation was cancelled.
   */
  cancelTime?: Date;
  /**
   * The desired instance config after updating.
   */
  instanceConfig?: InstanceConfig;
  /**
   * The progress of the UpdateInstanceConfig operation.
   */
  progress?: InstanceOperationProgress;
}

function serializeUpdateInstanceConfigMetadata(data: any): UpdateInstanceConfigMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    progress: data["progress"] !== undefined ? serializeInstanceOperationProgress(data["progress"]) : undefined,
  };
}

function deserializeUpdateInstanceConfigMetadata(data: any): UpdateInstanceConfigMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    progress: data["progress"] !== undefined ? deserializeInstanceOperationProgress(data["progress"]) : undefined,
  };
}

/**
 * The request for UpdateInstanceConfigRequest.
 */
export interface UpdateInstanceConfigRequest {
  /**
   * Required. The user instance config to update, which must always include
   * the instance config name. Otherwise, only fields mentioned in update_mask
   * need be included. To prevent conflicts of concurrent updates, etag can be
   * used.
   */
  instanceConfig?: InstanceConfig;
  /**
   * Required. A mask specifying which fields in InstanceConfig should be
   * updated. The field mask must always be specified; this prevents any future
   * fields in InstanceConfig from being erased accidentally by clients that do
   * not know about them. Only display_name and labels can be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * An option to validate, but not actually execute, a request, and provide
   * the same response.
   */
  validateOnly?: boolean;
}

function serializeUpdateInstanceConfigRequest(data: any): UpdateInstanceConfigRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateInstanceConfigRequest(data: any): UpdateInstanceConfigRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Metadata type for the operation returned by UpdateInstance.
 */
export interface UpdateInstanceMetadata {
  /**
   * The time at which this operation was cancelled. If set, this operation is
   * in the process of undoing itself (which is guaranteed to succeed) and
   * cannot be cancelled again.
   */
  cancelTime?: Date;
  /**
   * The time at which this operation failed or was completed successfully.
   */
  endTime?: Date;
  /**
   * The desired end state of the update.
   */
  instance?: Instance;
  /**
   * The time at which UpdateInstance request was received.
   */
  startTime?: Date;
}

function serializeUpdateInstanceMetadata(data: any): UpdateInstanceMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeUpdateInstanceMetadata(data: any): UpdateInstanceMetadata {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The request for UpdateInstance.
 */
export interface UpdateInstanceRequest {
  /**
   * Required. A mask specifying which fields in Instance should be updated.
   * The field mask must always be specified; this prevents any future fields in
   * Instance from being erased accidentally by clients that do not know about
   * them.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Required. The instance to update, which must always include the instance
   * name. Otherwise, only fields mentioned in field_mask need be included.
   */
  instance?: Instance;
}

function serializeUpdateInstanceRequest(data: any): UpdateInstanceRequest {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeUpdateInstanceRequest(data: any): UpdateInstanceRequest {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

export interface VisualizationData {
  /**
   * The token signifying the end of a data_source.
   */
  dataSourceEndToken?: string;
  /**
   * The token delimiting a datasource name from the rest of a key in a
   * data_source.
   */
  dataSourceSeparatorToken?: string;
  /**
   * The list of messages (info, alerts, ...)
   */
  diagnosticMessages?: DiagnosticMessage[];
  /**
   * We discretize the entire keyspace into buckets. Assuming each bucket has
   * an inclusive keyrange and covers keys from k(i) ... k(n). In this case k(n)
   * would be an end key for a given range. end_key_string is the collection of
   * all such end keys
   */
  endKeyStrings?: string[];
  /**
   * Whether this scan contains PII.
   */
  hasPii?: boolean;
  /**
   * Keys of key ranges that contribute significantly to a given metric Can be
   * thought of as heavy hitters.
   */
  indexedKeys?: string[];
  /**
   * The token delimiting the key prefixes.
   */
  keySeparator?: string;
  /**
   * The unit for the key: e.g. 'key' or 'chunk'.
   */
  keyUnit?:  | "KEY_UNIT_UNSPECIFIED" | "KEY" | "CHUNK";
  /**
   * The list of data objects for each metric.
   */
  metrics?: Metric[];
  /**
   * The list of extracted key prefix nodes used in the key prefix hierarchy.
   */
  prefixNodes?: PrefixNode[];
}

function serializeVisualizationData(data: any): VisualizationData {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetric(item))) : undefined,
  };
}

function deserializeVisualizationData(data: any): VisualizationData {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetric(item))) : undefined,
  };
}

/**
 * Arguments to insert, update, insert_or_update, and replace operations.
 */
export interface Write {
  /**
   * The names of the columns in table to be written. The list of columns must
   * contain enough columns to allow Cloud Spanner to derive values for all
   * primary key columns in the row(s) to be modified.
   */
  columns?: string[];
  /**
   * Required. The table whose rows will be written.
   */
  table?: string;
  /**
   * The values to be written. `values` can contain more than one list of
   * values. If it does, then multiple rows are written, one for each entry in
   * `values`. Each list in `values` must have exactly as many entries as there
   * are entries in columns above. Sending multiple lists is equivalent to
   * sending multiple `Mutation`s, each containing one `values` entry and
   * repeating table and columns. Individual values in each list are encoded as
   * described here.
   */
  values?: any[][];
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
