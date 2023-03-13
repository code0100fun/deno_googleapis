// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Workstations API Client for Deno
 * ======================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/workstations
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Workstations {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://workstations.googleapis.com/") {
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
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v1beta/${ name }/operations`);
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
   * Creates a new workstation cluster.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersCreate(parent: string, req: WorkstationCluster, opts: ProjectsLocationsWorkstationClustersCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstationClusters`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    if (opts.workstationClusterId !== undefined) {
      url.searchParams.append("workstationClusterId", String(opts.workstationClusterId));
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
   * Deletes the specified workstation cluster.
   *
   * @param name Required. Name of the workstation cluster to delete.
   */
  async projectsLocationsWorkstationClustersDelete(name: string, opts: ProjectsLocationsWorkstationClustersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns the requested workstation cluster.
   *
   * @param name Required. Name of the requested resource.
   */
  async projectsLocationsWorkstationClustersGet(name: string): Promise<WorkstationCluster> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WorkstationCluster;
  }

  /**
   * Returns all workstation clusters in the specified location.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersList(parent: string, opts: ProjectsLocationsWorkstationClustersListOptions = {}): Promise<ListWorkstationClustersResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstationClusters`);
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
    return data as ListWorkstationClustersResponse;
  }

  /**
   * Updates an existing workstation cluster.
   *
   * @param name Full name of this resource.
   */
  async projectsLocationsWorkstationClustersPatch(name: string, req: WorkstationCluster, opts: ProjectsLocationsWorkstationClustersPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsWorkstationClustersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Creates a new workstation configuration.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsCreate(parent: string, req: WorkstationConfig, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsCreateOptions = {}): Promise<Operation> {
    req = serializeWorkstationConfig(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstationConfigs`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    if (opts.workstationConfigId !== undefined) {
      url.searchParams.append("workstationConfigId", String(opts.workstationConfigId));
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
   * Deletes the specified workstation configuration.
   *
   * @param name Required. Name of the config to delete.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsDelete(name: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns the requested workstation configuration.
   *
   * @param name Required. Name of the requested resource.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsGet(name: string): Promise<WorkstationConfig> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWorkstationConfig(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsGetIamPolicy(resource: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:getIamPolicy`);
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
   * Returns all workstation configurations in the specified cluster.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsList(parent: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsListOptions = {}): Promise<ListWorkstationConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstationConfigs`);
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
    return deserializeListWorkstationConfigsResponse(data);
  }

  /**
   * Returns all workstation configurations in the specified cluster on which
   * the caller has the "workstations.workstation.create" permission.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsListUsable(parent: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsListUsableOptions = {}): Promise<ListUsableWorkstationConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstationConfigs:listUsable`);
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
    return deserializeListUsableWorkstationConfigsResponse(data);
  }

  /**
   * Updates an existing workstation configuration.
   *
   * @param name Full name of this resource.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsPatch(name: string, req: WorkstationConfig, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions = {}): Promise<Operation> {
    req = serializeWorkstationConfig(req);
    opts = serializeProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:setIamPolicy`);
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
  async projectsLocationsWorkstationClustersWorkstationConfigsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a new workstation.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsCreate(parent: string, req: Workstation, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstations`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    if (opts.workstationId !== undefined) {
      url.searchParams.append("workstationId", String(opts.workstationId));
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
   * Deletes the specified workstation.
   *
   * @param name Required. Name of the workstation to delete.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsDelete(name: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
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
    return data as Operation;
  }

  /**
   * Returns a short-lived credential that can be used to send authenticated
   * and authorized traffic to a workstation.
   *
   * @param workstation Required. Name of the workstation for which the access token should be generated.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGenerateAccessToken(workstation: string, req: GenerateAccessTokenRequest): Promise<GenerateAccessTokenResponse> {
    req = serializeGenerateAccessTokenRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ workstation }:generateAccessToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateAccessTokenResponse(data);
  }

  /**
   * Returns the requested workstation.
   *
   * @param name Required. Name of the requested resource.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGet(name: string): Promise<Workstation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Workstation;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGetIamPolicy(resource: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:getIamPolicy`);
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
   * Returns all Workstations using the specified config.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsList(parent: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListOptions = {}): Promise<ListWorkstationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstations`);
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
    return data as ListWorkstationsResponse;
  }

  /**
   * Returns all Workstations using the specified config on which the caller
   * has the "workstations.workstations.use" permission.
   *
   * @param parent Required. Parent resource name.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListUsable(parent: string, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListUsableOptions = {}): Promise<ListUsableWorkstationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/workstations:listUsable`);
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
    return data as ListUsableWorkstationsResponse;
  }

  /**
   * Updates an existing workstation.
   *
   * @param name Full name of this resource.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatch(name: string, req: Workstation, opts: ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Starts running a workstation so that users can connect to it.
   *
   * @param name Required. Name of the workstation to start.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsStart(name: string, req: StartWorkstationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stops running a workstation, reducing costs.
   *
   * @param name Required. Name of the workstation to stop.
   */
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsStop(name: string, req: StopWorkstationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
  async projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ resource }:testIamPermissions`);
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
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * A Docker container.
 */
export interface Container {
  /**
   * Arguments passed to the entrypoint.
   */
  args?: string[];
  /**
   * If set, overrides the default ENTRYPOINT specified by the image.
   */
  command?: string[];
  /**
   * Environment variables passed to the container.
   */
  env?: {
    [key: string]: string
  };
  /**
   * Docker image defining the container. This image must be accessible by the
   * config's service account.
   */
  image?: string;
  /**
   * If set, overrides the USER specified in the image with the given uid.
   */
  runAsUser?: number;
  /**
   * If set, overrides the default DIR specified by the image.
   */
  workingDir?: string;
}

/**
 * A customer-managed encryption key for the Compute Engine resources of this
 * workstation configuration.
 */
export interface CustomerEncryptionKey {
  /**
   * The name of the Google Cloud KMS encryption key. For example,
   * `projects/PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME`.
   */
  kmsKey?: string;
  /**
   * The service account to use with the specified KMS key. We recommend that
   * you use a separate service account and follow KMS best practices. For more
   * information, see [Separation of
   * duties](https://cloud.google.com/kms/docs/separation-of-duties) and `gcloud
   * kms keys add-iam-policy-binding`
   * [`--member`](https://cloud.google.com/sdk/gcloud/reference/kms/keys/add-iam-policy-binding#--member).
   */
  kmsKeyServiceAccount?: string;
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
 * A set of Compute Engine Confidential VM instance options.
 */
export interface GceConfidentialInstanceConfig {
  /**
   * Whether the instance has confidential compute enabled.
   */
  enableConfidentialCompute?: boolean;
}

/**
 * A runtime using a Compute Engine instance.
 */
export interface GceInstance {
  /**
   * Size of the boot disk in GB.
   */
  bootDiskSizeGb?: number;
  /**
   * A set of Compute Engine Confidential VM instance options.
   */
  confidentialInstanceConfig?: GceConfidentialInstanceConfig;
  /**
   * Whether instances have no public IP address.
   */
  disablePublicIpAddresses?: boolean;
  /**
   * The name of a Compute Engine machine type.
   */
  machineType?: string;
  /**
   * Number of instances to pool for faster workstation starup.
   */
  poolSize?: number;
  /**
   * Email address of the service account that will be used on VM instances
   * used to support this config. This service account must have permission to
   * pull the specified container image. If not set, VMs will run without a
   * service account, in which case the image must be publicly accessible.
   */
  serviceAccount?: string;
  /**
   * A set of Compute Engine Shielded instance options.
   */
  shieldedInstanceConfig?: GceShieldedInstanceConfig;
  /**
   * Network tags to add to the Compute Engine machines backing the
   * Workstations.
   */
  tags?: string[];
}

/**
 * A PersistentDirectory backed by a Compute Engine regional persistent disk.
 */
export interface GceRegionalPersistentDisk {
  /**
   * Type of the disk to use.
   */
  diskType?: string;
  /**
   * Type of file system that the disk should be formatted with. The
   * workstation image must support this file system type. Must be empty if
   * source_snapshot is set.
   */
  fsType?: string;
  /**
   * What should happen to the disk after the workstation is deleted. Defaults
   * to DELETE.
   */
  reclaimPolicy?:  | "RECLAIM_POLICY_UNSPECIFIED" | "DELETE" | "RETAIN";
  /**
   * Size of the disk in GB. Must be empty if source_snapshot is set.
   */
  sizeGb?: number;
  /**
   * Name of the snapshot to use as the source for the disk. If set, size_gb
   * and fs_type must be empty.
   */
  sourceSnapshot?: string;
}

/**
 * A set of Compute Engine Shielded instance options.
 */
export interface GceShieldedInstanceConfig {
  /**
   * Whether the instance has integrity monitoring enabled.
   */
  enableIntegrityMonitoring?: boolean;
  /**
   * Whether the instance has Secure Boot enabled.
   */
  enableSecureBoot?: boolean;
  /**
   * Whether the instance has the vTPM enabled.
   */
  enableVtpm?: boolean;
}

/**
 * Request message for GenerateAccessToken.
 */
export interface GenerateAccessTokenRequest {
  /**
   * Desired expiration time of the access token. This value must be at most 24
   * hours in the future. If a value is not specified, the token's expiration
   * time will be set to a default value of 1 hour in the future.
   */
  expireTime?: Date;
  /**
   * Desired lifetime duration of the access token. This value must be at most
   * 24 hours. If a value is not specified, the token's lifetime will be set to
   * a default value of 1 hour.
   */
  ttl?: number /* Duration */;
}

function serializeGenerateAccessTokenRequest(data: any): GenerateAccessTokenRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGenerateAccessTokenRequest(data: any): GenerateAccessTokenRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Response message for GenerateAccessToken.
 */
export interface GenerateAccessTokenResponse {
  /**
   * The generated bearer access token. To use this token, include it in an
   * Authorization header of an HTTP request sent to the associated
   * workstation's hostname, for example, `Authorization: Bearer `.
   */
  accessToken?: string;
  /**
   * Time at which the generated token will expire.
   */
  expireTime?: Date;
}

function serializeGenerateAccessTokenResponse(data: any): GenerateAccessTokenResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeGenerateAccessTokenResponse(data: any): GenerateAccessTokenResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * Runtime host for a workstation.
 */
export interface Host {
  /**
   * Specifies a Compute Engine instance as the host.
   */
  gceInstance?: GceInstance;
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
 * Response message for ListUsableWorkstationConfigs.
 */
export interface ListUsableWorkstationConfigsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The requested configs.
   */
  workstationConfigs?: WorkstationConfig[];
}

function serializeListUsableWorkstationConfigsResponse(data: any): ListUsableWorkstationConfigsResponse {
  return {
    ...data,
    workstationConfigs: data["workstationConfigs"] !== undefined ? data["workstationConfigs"].map((item: any) => (serializeWorkstationConfig(item))) : undefined,
  };
}

function deserializeListUsableWorkstationConfigsResponse(data: any): ListUsableWorkstationConfigsResponse {
  return {
    ...data,
    workstationConfigs: data["workstationConfigs"] !== undefined ? data["workstationConfigs"].map((item: any) => (deserializeWorkstationConfig(item))) : undefined,
  };
}

/**
 * Response message for ListUsableWorkstations.
 */
export interface ListUsableWorkstationsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The requested workstations.
   */
  workstations?: Workstation[];
}

/**
 * Response message for ListWorkstationClusters.
 */
export interface ListWorkstationClustersResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The requested workstation clusters.
   */
  workstationClusters?: WorkstationCluster[];
}

/**
 * Response message for ListWorkstationConfigs.
 */
export interface ListWorkstationConfigsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The requested configs.
   */
  workstationConfigs?: WorkstationConfig[];
}

function serializeListWorkstationConfigsResponse(data: any): ListWorkstationConfigsResponse {
  return {
    ...data,
    workstationConfigs: data["workstationConfigs"] !== undefined ? data["workstationConfigs"].map((item: any) => (serializeWorkstationConfig(item))) : undefined,
  };
}

function deserializeListWorkstationConfigsResponse(data: any): ListWorkstationConfigsResponse {
  return {
    ...data,
    workstationConfigs: data["workstationConfigs"] !== undefined ? data["workstationConfigs"].map((item: any) => (deserializeWorkstationConfig(item))) : undefined,
  };
}

/**
 * Response message for ListWorkstations.
 */
export interface ListWorkstationsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources.
   */
  unreachable?: string[];
  /**
   * The requested workstations.
   */
  workstations?: Workstation[];
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
 * Metadata for long-running operations.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. Time that the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time that the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation.
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
 * A directory to persist across workstation sessions.
 */
export interface PersistentDirectory {
  /**
   * A PersistentDirectory backed by a Compute Engine persistent disk.
   */
  gcePd?: GceRegionalPersistentDisk;
  /**
   * Location of this directory in the running workstation.
   */
  mountPath?: string;
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
 * Configuration options for private clusters.
 */
export interface PrivateClusterConfig {
  /**
   * Additional projects that are allowed to attach to the workstation
   * cluster's service attachment. By default, the workstation cluster's project
   * and the VPC host project (if different) are allowed.
   */
  allowedProjects?: string[];
  /**
   * Output only. Hostname for the workstation cluster. This field will be
   * populated only when private endpoint is enabled. To access workstations in
   * the cluster, create a new DNS zone mapping this domain name to an internal
   * IP address and a forwarding rule mapping that address to the service
   * attachment.
   */
  readonly clusterHostname?: string;
  /**
   * Immutable. Whether Workstations endpoint is private.
   */
  enablePrivateEndpoint?: boolean;
  /**
   * Output only. Service attachment URI for the workstation cluster. The
   * service attachemnt is created when private endpoint is enabled. To access
   * workstations in the cluster, configure access to the managed service using
   * [Private Service
   * Connect](https://cloud.google.com/vpc/docs/configure-private-service-connect-services).
   */
  readonly serviceAttachmentUri?: string;
}

/**
 * Additional options for Workstations#projectsLocationsOperationsList.
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
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersCreate.
 */
export interface ProjectsLocationsWorkstationClustersCreateOptions {
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
  /**
   * Required. ID to use for the workstation cluster.
   */
  workstationClusterId?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersDelete.
 */
export interface ProjectsLocationsWorkstationClustersDeleteOptions {
  /**
   * If set, the request will be rejected if the latest version of the
   * workstation cluster on the server does not have this etag.
   */
  etag?: string;
  /**
   * If set, any workstation configurations and workstations in the workstation
   * cluster are also deleted. Otherwise, the request only works if the
   * workstation cluster has no configurations or workstations.
   */
  force?: boolean;
  /**
   * If set, validate the request and preview the review, but do not apply it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersList.
 */
export interface ProjectsLocationsWorkstationClustersListOptions {
  /**
   * Maximum number of items to return.
   */
  pageSize?: number;
  /**
   * next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersPatch.
 */
export interface ProjectsLocationsWorkstationClustersPatchOptions {
  /**
   * If set, and the workstation cluster is not found, a new workstation
   * cluster will be created. In this situation, update_mask is ignored.
   */
  allowMissing?: boolean;
  /**
   * Required. Mask that specifies which fields in the workstation cluster
   * should be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsWorkstationClustersPatchOptions(data: any): ProjectsLocationsWorkstationClustersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsWorkstationClustersPatchOptions(data: any): ProjectsLocationsWorkstationClustersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsCreate.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsCreateOptions {
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
  /**
   * Required. ID to use for the config.
   */
  workstationConfigId?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsDelete.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsDeleteOptions {
  /**
   * If set, the request will be rejected if the latest version of the config
   * on the server does not have this etag.
   */
  etag?: string;
  /**
   * If set, any Workstations in the config will also be deleted. Otherwise,
   * the request will work only if the config has no workstations.
   */
  force?: boolean;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsGetIamPolicy.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsGetIamPolicyOptions {
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
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsList.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsListOptions {
  /**
   * Maximum number of items to return.
   */
  pageSize?: number;
  /**
   * next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsListUsable.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsListUsableOptions {
  /**
   * Maximum number of items to return.
   */
  pageSize?: number;
  /**
   * next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsPatch.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions {
  /**
   * If set, and the config is not found, a new config will be created. In this
   * situation, update_mask is ignored.
   */
  allowMissing?: boolean;
  /**
   * Required. Mask specifying which fields in the config should be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions(data: any): ProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions(data: any): ProjectsLocationsWorkstationClustersWorkstationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsCreate.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsCreateOptions {
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
  /**
   * Required. ID to use for the workstation.
   */
  workstationId?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsDelete.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsDeleteOptions {
  /**
   * If set, the request will be rejected if the latest version of the
   * workstation on the server does not have this etag.
   */
  etag?: string;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGetIamPolicy.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsGetIamPolicyOptions {
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
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsList.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListOptions {
  /**
   * Maximum number of items to return.
   */
  pageSize?: number;
  /**
   * next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListUsable.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsListUsableOptions {
  /**
   * Maximum number of items to return.
   */
  pageSize?: number;
  /**
   * next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Workstations#projectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatch.
 */
export interface ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions {
  /**
   * If set, and the config is not found, a new config will be created. In this
   * situation, update_mask is ignored.
   */
  allowMissing?: boolean;
  /**
   * Required. Mask specifying which fields in the config should be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions(data: any): ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions(data: any): ProjectsLocationsWorkstationClustersWorkstationConfigsWorkstationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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
 * Request message for StartWorkstation.
 */
export interface StartWorkstationRequest {
  /**
   * If set, the request will be rejected if the latest version of the
   * workstation on the server does not have this etag.
   */
  etag?: string;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
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
 * Request message for StopWorkstation.
 */
export interface StopWorkstationRequest {
  /**
   * If set, the request will be rejected if the latest version of the
   * workstation on the server does not have this etag.
   */
  etag?: string;
  /**
   * If set, validate the request and preview the review, but do not actually
   * apply it.
   */
  validateOnly?: boolean;
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
 * A single instance of a developer workstation with its own persistent
 * storage.
 */
export interface Workstation {
  /**
   * Client-specified annotations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Time when this resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when this resource was soft-deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Human-readable name for this resource.
   */
  displayName?: string;
  /**
   * Checksum computed by the server. May be sent on update and delete requests
   * to ensure that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Output only. Host to which clients can send HTTPS traffic that will be
   * received by the workstation. Authorized traffic will be received to the
   * workstation as HTTP on port 80. To send traffic to a different port,
   * clients may prefix the host with the destination port in the format
   * `{port}-{host}`.
   */
  readonly host?: string;
  /**
   * Client-specified labels that are applied to the resource and that are also
   * propagated to the underlying Compute Engine resources.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Full name of this resource.
   */
  name?: string;
  /**
   * Output only. Indicates whether this resource is currently being updated to
   * match its intended state.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. Current state of the workstation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "STATE_STARTING" | "STATE_RUNNING" | "STATE_STOPPING" | "STATE_STOPPED";
  /**
   * Output only. A system-assigned unique identified for this resource.
   */
  readonly uid?: string;
  /**
   * Output only. Time when this resource was most recently updated.
   */
  readonly updateTime?: Date;
}

/**
 * A grouping of workstation configurations and the associated workstations in
 * that region.
 */
export interface WorkstationCluster {
  /**
   * Client-specified annotations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Status conditions describing the current resource state.
   */
  readonly conditions?: Status[];
  /**
   * Output only. Time when this resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Whether this resource is in degraded mode, in which case it
   * may require user action to restore full functionality. Details can be found
   * in the `conditions` field.
   */
  readonly degraded?: boolean;
  /**
   * Output only. Time when this resource was soft-deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Human-readable name for this resource.
   */
  displayName?: string;
  /**
   * Checksum computed by the server. May be sent on update and delete requests
   * to ensure that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Client-specified labels that are applied to the resource and that are also
   * propagated to the underlying Compute Engine resources.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Full name of this resource.
   */
  name?: string;
  /**
   * Immutable. Name of the Compute Engine network in which instances
   * associated with this cluster will be created.
   */
  network?: string;
  /**
   * Configuration for private cluster.
   */
  privateClusterConfig?: PrivateClusterConfig;
  /**
   * Output only. Indicates whether this resource is currently being updated to
   * match its intended state.
   */
  readonly reconciling?: boolean;
  /**
   * Immutable. Name of the Compute Engine subnetwork in which instances
   * associated with this cluster will be created. Must be part of the
   * subnetwork specified for this cluster.
   */
  subnetwork?: string;
  /**
   * Output only. A system-assigned unique identified for this resource.
   */
  readonly uid?: string;
  /**
   * Output only. Time when this resource was most recently updated.
   */
  readonly updateTime?: Date;
}

/**
 * A set of configuration options describing how a workstation will be run.
 * Workstation configurations are intended to be shared across multiple
 * workstations.
 */
export interface WorkstationConfig {
  /**
   * Client-specified annotations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Status conditions describing the current resource state.
   */
  readonly conditions?: Status[];
  /**
   * Container that will be run for each workstation using this configuration
   * when that workstation is started.
   */
  container?: Container;
  /**
   * Output only. Time when this resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Whether this resource is in degraded mode, in which case it
   * may require user action to restore full functionality. Details can be found
   * in the `conditions` field.
   */
  readonly degraded?: boolean;
  /**
   * Output only. Time when this resource was soft-deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Human-readable name for this resource.
   */
  displayName?: string;
  /**
   * Encrypts resources of this workstation configuration using a
   * customer-managed encryption key. If specified, the boot disk of the Compute
   * Engine instance and the persistent disk are encrypted using this encryption
   * key. If this field is not set, the disks are encrypted using a generated
   * key. Customer-managed encryption keys do not protect disk metadata. If the
   * customer-managed encryption key is rotated, when the workstation instance
   * is stopped, the system attempts to recreate the persistent disk with the
   * new version of the key. Be sure to keep older versions of the key until the
   * persistent disk is recreated. Otherwise, data on the persistent disk will
   * be lost. If the encryption key is revoked, the workstation session will
   * automatically be stopped within 7 hours.
   */
  encryptionKey?: CustomerEncryptionKey;
  /**
   * Checksum computed by the server. May be sent on update and delete requests
   * to ensure that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Runtime host for the workstation.
   */
  host?: Host;
  /**
   * How long to wait before automatically stopping an instance that hasn't
   * received any user traffic. A value of 0 indicates that this instance should
   * never time out due to idleness. Defaults to 20 minutes.
   */
  idleTimeout?: number /* Duration */;
  /**
   * Client-specified labels that are applied to the resource and that are also
   * propagated to the underlying Compute Engine resources.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Full name of this resource.
   */
  name?: string;
  /**
   * Directories to persist across workstation sessions.
   */
  persistentDirectories?: PersistentDirectory[];
  /**
   * Output only. Indicates whether this resource is currently being updated to
   * match its intended state.
   */
  readonly reconciling?: boolean;
  /**
   * How long to wait before automatically stopping a workstation after it
   * started. A value of 0 indicates that workstations using this configuration
   * should never time out. Must be greater than 0 and less than 24 hours if
   * encryption_key is set. Defaults to 12 hours.
   */
  runningTimeout?: number /* Duration */;
  /**
   * Output only. A system-assigned unique identified for this resource.
   */
  readonly uid?: string;
  /**
   * Output only. Time when this resource was most recently updated.
   */
  readonly updateTime?: Date;
}

function serializeWorkstationConfig(data: any): WorkstationConfig {
  return {
    ...data,
    idleTimeout: data["idleTimeout"] !== undefined ? data["idleTimeout"] : undefined,
    runningTimeout: data["runningTimeout"] !== undefined ? data["runningTimeout"] : undefined,
  };
}

function deserializeWorkstationConfig(data: any): WorkstationConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    idleTimeout: data["idleTimeout"] !== undefined ? data["idleTimeout"] : undefined,
    runningTimeout: data["runningTimeout"] !== undefined ? data["runningTimeout"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
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
