// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Deployment Manager V2 API Client for Deno
 * ===============================================
 * 
 * The Google Cloud Deployment Manager v2 API provides services for configuring, deploying, and viewing Google Cloud services and APIs via templates which specify deployments of Cloud resources.
 * 
 * Docs: https://cloud.google.com/deployment-manager
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Cloud Deployment Manager v2 API provides services for
 * configuring, deploying, and viewing Google Cloud services and APIs via
 * templates which specify deployments of Cloud resources.
 */
export class DeploymentManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://deploymentmanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Cancels and removes the preview currently associated with the deployment.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsCancelPreview(deployment: string, project: string, req: DeploymentsCancelPreviewRequest): Promise<Operation> {
    req = serializeDeploymentsCancelPreviewRequest(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/cancelPreview`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Deletes a deployment and all of the resources in the deployment.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsDelete(deployment: string, project: string, opts: DeploymentsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }`);
    if (opts.deletePolicy !== undefined) {
      url.searchParams.append("deletePolicy", String(opts.deletePolicy));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Gets information about a specific deployment.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsGet(deployment: string, project: string): Promise<Deployment> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeployment(data);
  }

  /**
   * Gets the access control policy for a resource. May be empty if no such
   * policy or resource exists.
   *
   * @param project Project ID for this request.
   * @param resource Name or id of the resource for this request.
   */
  async deploymentsGetIamPolicy(project: string, resource: string, opts: DeploymentsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ resource }/getIamPolicy`);
    if (opts.optionsRequestedPolicyVersion !== undefined) {
      url.searchParams.append("optionsRequestedPolicyVersion", String(opts.optionsRequestedPolicyVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Creates a deployment and all of the resources described by the deployment
   * manifest.
   *
   * @param project The project ID for this request.
   */
  async deploymentsInsert(project: string, req: Deployment, opts: DeploymentsInsertOptions = {}): Promise<Operation> {
    req = serializeDeployment(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments`);
    if (opts.createPolicy !== undefined) {
      url.searchParams.append("createPolicy", String(opts.createPolicy));
    }
    if (opts.preview !== undefined) {
      url.searchParams.append("preview", String(opts.preview));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists all deployments for a given project.
   *
   * @param project The project ID for this request.
   */
  async deploymentsList(project: string, opts: DeploymentsListOptions = {}): Promise<DeploymentsListResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeploymentsListResponse(data);
  }

  /**
   * Patches a deployment and all of the resources described by the deployment
   * manifest.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsPatch(deployment: string, project: string, req: Deployment, opts: DeploymentsPatchOptions = {}): Promise<Operation> {
    req = serializeDeployment(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }`);
    if (opts.createPolicy !== undefined) {
      url.searchParams.append("createPolicy", String(opts.createPolicy));
    }
    if (opts.deletePolicy !== undefined) {
      url.searchParams.append("deletePolicy", String(opts.deletePolicy));
    }
    if (opts.preview !== undefined) {
      url.searchParams.append("preview", String(opts.preview));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.
   *
   * @param project Project ID for this request.
   * @param resource Name or id of the resource for this request.
   */
  async deploymentsSetIamPolicy(project: string, resource: string, req: GlobalSetPolicyRequest): Promise<Policy> {
    req = serializeGlobalSetPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ resource }/setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Stops an ongoing operation. This does not roll back any work that has
   * already been completed, but prevents any new work from being started.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsStop(deployment: string, project: string, req: DeploymentsStopRequest): Promise<Operation> {
    req = serializeDeploymentsStopRequest(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource.
   *
   * @param project Project ID for this request.
   * @param resource Name or id of the resource for this request.
   */
  async deploymentsTestIamPermissions(project: string, resource: string, req: TestPermissionsRequest): Promise<TestPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ resource }/testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestPermissionsResponse;
  }

  /**
   * Updates a deployment and all of the resources described by the deployment
   * manifest.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async deploymentsUpdate(deployment: string, project: string, req: Deployment, opts: DeploymentsUpdateOptions = {}): Promise<Operation> {
    req = serializeDeployment(req);
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }`);
    if (opts.createPolicy !== undefined) {
      url.searchParams.append("createPolicy", String(opts.createPolicy));
    }
    if (opts.deletePolicy !== undefined) {
      url.searchParams.append("deletePolicy", String(opts.deletePolicy));
    }
    if (opts.preview !== undefined) {
      url.searchParams.append("preview", String(opts.preview));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Gets information about a specific manifest.
   *
   * @param deployment The name of the deployment for this request.
   * @param manifest The name of the manifest for this request.
   * @param project The project ID for this request.
   */
  async manifestsGet(deployment: string, manifest: string, project: string): Promise<Manifest> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/manifests/${ manifest }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManifest(data);
  }

  /**
   * Lists all manifests for a given deployment.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async manifestsList(deployment: string, project: string, opts: ManifestsListOptions = {}): Promise<ManifestsListResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/manifests`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManifestsListResponse(data);
  }

  /**
   * Gets information about a specific operation.
   *
   * @param operation The name of the operation for this request.
   * @param project The project ID for this request.
   */
  async operationsGet(operation: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/operations/${ operation }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperation(data);
  }

  /**
   * Lists all operations for a project.
   *
   * @param project The project ID for this request.
   */
  async operationsList(project: string, opts: OperationsListOptions = {}): Promise<OperationsListResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/operations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperationsListResponse(data);
  }

  /**
   * Gets information about a single resource.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   * @param resource The name of the resource for this request.
   */
  async resourcesGet(deployment: string, project: string, resource: string): Promise<Resource> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/resources/${ resource }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeResource(data);
  }

  /**
   * Lists all resources in a given deployment.
   *
   * @param deployment The name of the deployment for this request.
   * @param project The project ID for this request.
   */
  async resourcesList(deployment: string, project: string, opts: ResourcesListOptions = {}): Promise<ResourcesListResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/deployments/${ deployment }/resources`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeResourcesListResponse(data);
  }

  /**
   * Lists all resource types for Deployment Manager.
   *
   * @param project The project ID for this request.
   */
  async typesList(project: string, opts: TypesListOptions = {}): Promise<TypesListResponse> {
    const url = new URL(`${this.#baseUrl}deploymentmanager/v2/projects/${ project }/global/types`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTypesListResponse(data);
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

export interface ConfigFile {
  /**
   * The contents of the file.
   */
  content?: string;
}

export interface Deployment {
  /**
   * An optional user-provided description of the deployment.
   */
  description?: string;
  /**
   * Provides a fingerprint to use in requests to modify a deployment, such as
   * `update()`, `stop()`, and `cancelPreview()` requests. A fingerprint is a
   * randomly generated value that must be provided with `update()`, `stop()`,
   * and `cancelPreview()` requests to perform optimistic locking. This ensures
   * optimistic concurrency so that only one request happens at a time. The
   * fingerprint is initially generated by Deployment Manager and changes after
   * every request to modify data. To get the latest fingerprint value, perform
   * a `get()` request to a deployment.
   */
  fingerprint?: Uint8Array;
  id?: bigint;
  /**
   * Output only. Creation timestamp in RFC3339 text format.
   */
  insertTime?: string;
  /**
   * Map of One Platform labels; provided by the client when the resource is
   * created or updated. Specifically: Label keys must be between 1 and 63
   * characters long and must conform to the following regular expression:
   * `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63
   * characters long and must conform to the regular expression
   * `([a-z]([-a-z0-9]*[a-z0-9])?)?`.
   */
  labels?: DeploymentLabelEntry[];
  /**
   * Output only. URL of the manifest representing the last manifest that was
   * successfully deployed. If no manifest has been successfully deployed, this
   * field will be absent.
   */
  manifest?: string;
  /**
   * Name of the resource; provided by the client when the resource is created.
   * The name must be 1-63 characters long, and comply with RFC1035.
   * Specifically, the name must be 1-63 characters long and match the regular
   * expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character
   * must be a lowercase letter, and all following characters must be a dash,
   * lowercase letter, or digit, except the last character, which cannot be a
   * dash.
   */
  name?: string;
  /**
   * Output only. The Operation that most recently ran, or is currently
   * running, on this deployment.
   */
  operation?: Operation;
  /**
   * Output only. Server defined URL for the resource.
   */
  selfLink?: string;
  /**
   * [Input Only] The parameters that define your deployment, including the
   * deployment configuration and relevant templates.
   */
  target?: TargetConfiguration;
  /**
   * Output only. If Deployment Manager is currently updating or previewing an
   * update to this deployment, the updated configuration appears here.
   */
  update?: DeploymentUpdate;
  /**
   * Output only. Update timestamp in RFC3339 text format.
   */
  updateTime?: string;
}

function serializeDeployment(data: any): Deployment {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? encodeBase64(data["fingerprint"]) : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    operation: data["operation"] !== undefined ? serializeOperation(data["operation"]) : undefined,
  };
}

function deserializeDeployment(data: any): Deployment {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? decodeBase64(data["fingerprint"] as string) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    operation: data["operation"] !== undefined ? deserializeOperation(data["operation"]) : undefined,
  };
}

/**
 * Label object for Deployments
 */
export interface DeploymentLabelEntry {
  /**
   * Key of the label
   */
  key?: string;
  /**
   * Value of the label
   */
  value?: string;
}

export interface DeploymentsCancelPreviewRequest {
  /**
   * Specifies a fingerprint for `cancelPreview()` requests. A fingerprint is a
   * randomly generated value that must be provided in `cancelPreview()`
   * requests to perform optimistic locking. This ensures optimistic concurrency
   * so that the deployment does not have conflicting requests (e.g. if someone
   * attempts to make a new update request while another user attempts to cancel
   * a preview, this would prevent one of the requests). The fingerprint is
   * initially generated by Deployment Manager and changes after every request
   * to modify a deployment. To get the latest fingerprint value, perform a
   * `get()` request on the deployment.
   */
  fingerprint?: Uint8Array;
}

function serializeDeploymentsCancelPreviewRequest(data: any): DeploymentsCancelPreviewRequest {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? encodeBase64(data["fingerprint"]) : undefined,
  };
}

function deserializeDeploymentsCancelPreviewRequest(data: any): DeploymentsCancelPreviewRequest {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? decodeBase64(data["fingerprint"] as string) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#deploymentsDelete.
 */
export interface DeploymentsDeleteOptions {
  /**
   * Sets the policy to use for deleting resources.
   */
  deletePolicy?:  | "DELETE" | "ABANDON";
}

/**
 * Additional options for DeploymentManager#deploymentsGetIamPolicy.
 */
export interface DeploymentsGetIamPolicyOptions {
  /**
   * Requested IAM Policy version.
   */
  optionsRequestedPolicyVersion?: number;
}

/**
 * Additional options for DeploymentManager#deploymentsInsert.
 */
export interface DeploymentsInsertOptions {
  /**
   * Sets the policy to use for creating new resources.
   */
  createPolicy?:  | "CREATE_OR_ACQUIRE" | "ACQUIRE";
  /**
   * If set to true, creates a deployment and creates "shell" resources but
   * does not actually instantiate these resources. This allows you to preview
   * what your deployment looks like. After previewing a deployment, you can
   * deploy your resources by making a request with the `update()` method or you
   * can use the `cancelPreview()` method to cancel the preview altogether. Note
   * that the deployment will still exist after you cancel the preview and you
   * must separately delete this deployment if you want to remove it.
   */
  preview?: boolean;
}

/**
 * Additional options for DeploymentManager#deploymentsList.
 */
export interface DeploymentsListOptions {
  /**
   * A filter expression that filters resources listed in the response. Most
   * Compute resources support two types of filter expressions: expressions that
   * support regular expressions and expressions that follow API improvement
   * proposal AIP-160. If you want to use AIP-160, your expression must specify
   * the field name, an operator, and the value that you want to use for
   * filtering. The value must be a string, a number, or a boolean. The operator
   * must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you
   * are filtering Compute Engine instances, you can exclude instances named
   * `example-instance` by specifying `name != example-instance`. The `:`
   * operator can be used with string fields to match substrings. For non-string
   * fields it is equivalent to the `=` operator. The `:*` comparison can be
   * used to test whether a key has been defined. For example, to find all
   * objects with `owner` label use: ``` labels.owner:* ``` You can also filter
   * nested fields. For example, you could specify `scheduling.automaticRestart
   * = false` to include instances only if they are not scheduled for automatic
   * restarts. You can use filtering on nested fields to filter based on
   * resource labels. To filter on multiple expressions, provide each separate
   * expression within parentheses. For example: ```
   * (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By
   * default, each expression is an `AND` expression. However, you can include
   * `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform =
   * "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND
   * (scheduling.automaticRestart = true) ``` If you want to use a regular
   * expression, use the `eq` (equal) or `ne` (not equal) operator against a
   * single un-parenthesized expression with or without quotes or against
   * multiple parenthesized expressions. Examples: `fieldname eq unquoted
   * literal` `fieldname eq 'single quoted literal'` `fieldname eq "double
   * quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The
   * literal value is interpreted as a regular expression using Google RE2
   * library syntax. The literal value must match the entire field. For example,
   * to filter for instances that do not end with name "instance", you would use
   * `name ne .*instance`.
   */
  filter?: string;
  /**
   * The maximum number of results per page that should be returned. If the
   * number of available results is larger than `maxResults`, Compute Engine
   * returns a `nextPageToken` that can be used to get the next page of results
   * in subsequent list requests. Acceptable values are `0` to `500`, inclusive.
   * (Default: `500`)
   */
  maxResults?: number;
  /**
   * Sorts list results by a certain order. By default, results are returned in
   * alphanumerical order based on the resource name. You can also sort results
   * in descending order based on the creation timestamp using
   * `orderBy="creationTimestamp desc"`. This sorts results based on the
   * `creationTimestamp` field in reverse chronological order (newest result
   * first). Use this to sort resources like operations so that the newest
   * operation is returned first. Currently, only sorting by `name` or
   * `creationTimestamp desc` is supported.
   */
  orderBy?: string;
  /**
   * Specifies a page token to use. Set `pageToken` to the `nextPageToken`
   * returned by a previous list request to get the next page of results.
   */
  pageToken?: string;
}

/**
 * A response containing a partial list of deployments and a page token used to
 * build the next request if the request has been truncated.
 */
export interface DeploymentsListResponse {
  /**
   * Output only. The deployments contained in this response.
   */
  deployments?: Deployment[];
  /**
   * Output only. A token used to continue a truncated list request.
   */
  nextPageToken?: string;
}

function serializeDeploymentsListResponse(data: any): DeploymentsListResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (serializeDeployment(item))) : undefined,
  };
}

function deserializeDeploymentsListResponse(data: any): DeploymentsListResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (deserializeDeployment(item))) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#deploymentsPatch.
 */
export interface DeploymentsPatchOptions {
  /**
   * Sets the policy to use for creating new resources.
   */
  createPolicy?:  | "CREATE_OR_ACQUIRE" | "ACQUIRE";
  /**
   * Sets the policy to use for deleting resources.
   */
  deletePolicy?:  | "DELETE" | "ABANDON";
  /**
   * If set to true, updates the deployment and creates and updates the "shell"
   * resources but does not actually alter or instantiate these resources. This
   * allows you to preview what your deployment will look like. You can use this
   * intent to preview how an update would affect your deployment. You must
   * provide a `target.config` with a configuration if this is set to true.
   * After previewing a deployment, you can deploy your resources by making a
   * request with the `update()` or you can `cancelPreview()` to remove the
   * preview altogether. Note that the deployment will still exist after you
   * cancel the preview and you must separately delete this deployment if you
   * want to remove it.
   */
  preview?: boolean;
}

export interface DeploymentsStopRequest {
  /**
   * Specifies a fingerprint for `stop()` requests. A fingerprint is a randomly
   * generated value that must be provided in `stop()` requests to perform
   * optimistic locking. This ensures optimistic concurrency so that the
   * deployment does not have conflicting requests (e.g. if someone attempts to
   * make a new update request while another user attempts to stop an ongoing
   * update request, this would prevent a collision). The fingerprint is
   * initially generated by Deployment Manager and changes after every request
   * to modify a deployment. To get the latest fingerprint value, perform a
   * `get()` request on the deployment.
   */
  fingerprint?: Uint8Array;
}

function serializeDeploymentsStopRequest(data: any): DeploymentsStopRequest {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? encodeBase64(data["fingerprint"]) : undefined,
  };
}

function deserializeDeploymentsStopRequest(data: any): DeploymentsStopRequest {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? decodeBase64(data["fingerprint"] as string) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#deploymentsUpdate.
 */
export interface DeploymentsUpdateOptions {
  /**
   * Sets the policy to use for creating new resources.
   */
  createPolicy?:  | "CREATE_OR_ACQUIRE" | "ACQUIRE";
  /**
   * Sets the policy to use for deleting resources.
   */
  deletePolicy?:  | "DELETE" | "ABANDON";
  /**
   * If set to true, updates the deployment and creates and updates the "shell"
   * resources but does not actually alter or instantiate these resources. This
   * allows you to preview what your deployment will look like. You can use this
   * intent to preview how an update would affect your deployment. You must
   * provide a `target.config` with a configuration if this is set to true.
   * After previewing a deployment, you can deploy your resources by making a
   * request with the `update()` or you can `cancelPreview()` to remove the
   * preview altogether. Note that the deployment will still exist after you
   * cancel the preview and you must separately delete this deployment if you
   * want to remove it.
   */
  preview?: boolean;
}

export interface DeploymentUpdate {
  /**
   * Output only. An optional user-provided description of the deployment after
   * the current update has been applied.
   */
  description?: string;
  /**
   * Map of One Platform labels; provided by the client when the resource is
   * created or updated. Specifically: Label keys must be between 1 and 63
   * characters long and must conform to the following regular expression:
   * `[a-z]([-a-z0-9]*[a-z0-9])?` Label values must be between 0 and 63
   * characters long and must conform to the regular expression
   * `([a-z]([-a-z0-9]*[a-z0-9])?)?`.
   */
  labels?: DeploymentUpdateLabelEntry[];
  /**
   * Output only. URL of the manifest representing the update configuration of
   * this deployment.
   */
  manifest?: string;
}

/**
 * Label object for DeploymentUpdate
 */
export interface DeploymentUpdateLabelEntry {
  /**
   * Key of the label
   */
  key?: string;
  /**
   * Value of the label
   */
  value?: string;
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

export interface GlobalSetPolicyRequest {
  /**
   * Flatten Policy to create a backward compatible wire-format. Deprecated.
   * Use 'policy' to specify bindings.
   */
  bindings?: Binding[];
  /**
   * Flatten Policy to create a backward compatible wire-format. Deprecated.
   * Use 'policy' to specify the etag.
   */
  etag?: Uint8Array;
  /**
   * REQUIRED: The complete policy to be applied to the 'resource'. The size of
   * the policy is limited to a few 10s of KB. An empty policy is in general a
   * valid policy but certain services (like Projects) might reject them.
   */
  policy?: Policy;
}

function serializeGlobalSetPolicyRequest(data: any): GlobalSetPolicyRequest {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeGlobalSetPolicyRequest(data: any): GlobalSetPolicyRequest {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

export interface ImportFile {
  /**
   * The contents of the file.
   */
  content?: string;
  /**
   * The name of the file.
   */
  name?: string;
}

export interface Manifest {
  /**
   * Output only. The YAML configuration for this manifest.
   */
  config?: ConfigFile;
  /**
   * Output only. The fully-expanded configuration file, including any
   * templates and references.
   */
  expandedConfig?: string;
  id?: bigint;
  /**
   * Output only. The imported files for this manifest.
   */
  imports?: ImportFile[];
  /**
   * Output only. Creation timestamp in RFC3339 text format.
   */
  insertTime?: string;
  /**
   * Output only. The YAML layout for this manifest.
   */
  layout?: string;
  /**
   * Output only. The computed size of the fully expanded manifest.
   */
  manifestSizeBytes?: bigint;
  /**
   * Output only. The size limit for expanded manifests in the project.
   */
  manifestSizeLimitBytes?: bigint;
  /**
   * Output only. The name of the manifest.
   */
  name?: string;
  /**
   * Output only. Self link for the manifest.
   */
  selfLink?: string;
}

function serializeManifest(data: any): Manifest {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    manifestSizeBytes: data["manifestSizeBytes"] !== undefined ? String(data["manifestSizeBytes"]) : undefined,
    manifestSizeLimitBytes: data["manifestSizeLimitBytes"] !== undefined ? String(data["manifestSizeLimitBytes"]) : undefined,
  };
}

function deserializeManifest(data: any): Manifest {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    manifestSizeBytes: data["manifestSizeBytes"] !== undefined ? BigInt(data["manifestSizeBytes"]) : undefined,
    manifestSizeLimitBytes: data["manifestSizeLimitBytes"] !== undefined ? BigInt(data["manifestSizeLimitBytes"]) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#manifestsList.
 */
export interface ManifestsListOptions {
  /**
   * A filter expression that filters resources listed in the response. Most
   * Compute resources support two types of filter expressions: expressions that
   * support regular expressions and expressions that follow API improvement
   * proposal AIP-160. If you want to use AIP-160, your expression must specify
   * the field name, an operator, and the value that you want to use for
   * filtering. The value must be a string, a number, or a boolean. The operator
   * must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you
   * are filtering Compute Engine instances, you can exclude instances named
   * `example-instance` by specifying `name != example-instance`. The `:`
   * operator can be used with string fields to match substrings. For non-string
   * fields it is equivalent to the `=` operator. The `:*` comparison can be
   * used to test whether a key has been defined. For example, to find all
   * objects with `owner` label use: ``` labels.owner:* ``` You can also filter
   * nested fields. For example, you could specify `scheduling.automaticRestart
   * = false` to include instances only if they are not scheduled for automatic
   * restarts. You can use filtering on nested fields to filter based on
   * resource labels. To filter on multiple expressions, provide each separate
   * expression within parentheses. For example: ```
   * (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By
   * default, each expression is an `AND` expression. However, you can include
   * `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform =
   * "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND
   * (scheduling.automaticRestart = true) ``` If you want to use a regular
   * expression, use the `eq` (equal) or `ne` (not equal) operator against a
   * single un-parenthesized expression with or without quotes or against
   * multiple parenthesized expressions. Examples: `fieldname eq unquoted
   * literal` `fieldname eq 'single quoted literal'` `fieldname eq "double
   * quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The
   * literal value is interpreted as a regular expression using Google RE2
   * library syntax. The literal value must match the entire field. For example,
   * to filter for instances that do not end with name "instance", you would use
   * `name ne .*instance`.
   */
  filter?: string;
  /**
   * The maximum number of results per page that should be returned. If the
   * number of available results is larger than `maxResults`, Compute Engine
   * returns a `nextPageToken` that can be used to get the next page of results
   * in subsequent list requests. Acceptable values are `0` to `500`, inclusive.
   * (Default: `500`)
   */
  maxResults?: number;
  /**
   * Sorts list results by a certain order. By default, results are returned in
   * alphanumerical order based on the resource name. You can also sort results
   * in descending order based on the creation timestamp using
   * `orderBy="creationTimestamp desc"`. This sorts results based on the
   * `creationTimestamp` field in reverse chronological order (newest result
   * first). Use this to sort resources like operations so that the newest
   * operation is returned first. Currently, only sorting by `name` or
   * `creationTimestamp desc` is supported.
   */
  orderBy?: string;
  /**
   * Specifies a page token to use. Set `pageToken` to the `nextPageToken`
   * returned by a previous list request to get the next page of results.
   */
  pageToken?: string;
}

/**
 * A response containing a partial list of manifests and a page token used to
 * build the next request if the request has been truncated.
 */
export interface ManifestsListResponse {
  /**
   * Output only. Manifests contained in this list response.
   */
  manifests?: Manifest[];
  /**
   * Output only. A token used to continue a truncated list request.
   */
  nextPageToken?: string;
}

function serializeManifestsListResponse(data: any): ManifestsListResponse {
  return {
    ...data,
    manifests: data["manifests"] !== undefined ? data["manifests"].map((item: any) => (serializeManifest(item))) : undefined,
  };
}

function deserializeManifestsListResponse(data: any): ManifestsListResponse {
  return {
    ...data,
    manifests: data["manifests"] !== undefined ? data["manifests"].map((item: any) => (deserializeManifest(item))) : undefined,
  };
}

/**
 * Represents an Operation resource. Google Compute Engine has three Operation
 * resources: *
 * [Global](/compute/docs/reference/rest/{$api_version}/globalOperations) *
 * [Regional](/compute/docs/reference/rest/{$api_version}/regionOperations) *
 * [Zonal](/compute/docs/reference/rest/{$api_version}/zoneOperations) You can
 * use an operation resource to manage asynchronous API requests. For more
 * information, read Handling API responses. Operations can be global, regional
 * or zonal. - For global operations, use the `globalOperations` resource. - For
 * regional operations, use the `regionOperations` resource. - For zonal
 * operations, use the `zonalOperations` resource. For more information, read
 * Global, Regional, and Zonal Resources.
 */
export interface Operation {
  /**
   * [Output Only] The value of `requestId` if you provided it in the request.
   * Not present otherwise.
   */
  clientOperationId?: string;
  /**
   * [Deprecated] This field is deprecated.
   */
  creationTimestamp?: string;
  /**
   * [Output Only] A textual description of the operation, which is set when
   * the operation is created.
   */
  description?: string;
  /**
   * [Output Only] The time that this operation was completed. This value is in
   * RFC3339 text format.
   */
  endTime?: string;
  /**
   * [Output Only] If errors are generated during processing of the operation,
   * this field will be populated.
   */
  error?: {
    errors?: {
      code?: string;
      location?: string;
      message?: string;
    }[];
  };
  /**
   * [Output Only] If the operation fails, this field contains the HTTP error
   * message that was returned, such as `NOT FOUND`.
   */
  httpErrorMessage?: string;
  /**
   * [Output Only] If the operation fails, this field contains the HTTP error
   * status code that was returned. For example, a `404` means the resource was
   * not found.
   */
  httpErrorStatusCode?: number;
  /**
   * [Output Only] The unique identifier for the operation. This identifier is
   * defined by the server.
   */
  id?: bigint;
  /**
   * [Output Only] The time that this operation was requested. This value is in
   * RFC3339 text format.
   */
  insertTime?: string;
  /**
   * [Output Only] Type of the resource. Always `compute#operation` for
   * Operation resources.
   */
  kind?: string;
  /**
   * [Output Only] Name of the operation.
   */
  name?: string;
  /**
   * [Output Only] An ID that represents a group of operations, such as when a
   * group of operations results from a `bulkInsert` API request.
   */
  operationGroupId?: string;
  /**
   * [Output Only] The type of operation, such as `insert`, `update`, or
   * `delete`, and so on.
   */
  operationType?: string;
  /**
   * [Output Only] An optional progress indicator that ranges from 0 to 100.
   * There is no requirement that this be linear or support any granularity of
   * operations. This should not be used to guess when the operation will be
   * complete. This number should monotonically increase as the operation
   * progresses.
   */
  progress?: number;
  /**
   * [Output Only] The URL of the region where the operation resides. Only
   * applicable when performing regional operations.
   */
  region?: string;
  /**
   * [Output Only] Server-defined URL for the resource.
   */
  selfLink?: string;
  /**
   * [Output Only] The time that this operation was started by the server. This
   * value is in RFC3339 text format.
   */
  startTime?: string;
  /**
   * [Output Only] The status of the operation, which can be one of the
   * following: `PENDING`, `RUNNING`, or `DONE`.
   */
  status?:  | "PENDING" | "RUNNING" | "DONE";
  /**
   * [Output Only] An optional textual description of the current status of the
   * operation.
   */
  statusMessage?: string;
  /**
   * [Output Only] The unique target ID, which identifies a specific
   * incarnation of the target resource.
   */
  targetId?: bigint;
  /**
   * [Output Only] The URL of the resource that the operation modifies. For
   * operations related to creating a snapshot, this points to the persistent
   * disk that the snapshot was created from.
   */
  targetLink?: string;
  /**
   * [Output Only] User who requested the operation, for example:
   * `user@example.com`.
   */
  user?: string;
  /**
   * [Output Only] If warning messages are generated during processing of the
   * operation, this field will be populated.
   */
  warnings?: {
    code?:  | "DEPRECATED_RESOURCE_USED" | "NO_RESULTS_ON_PAGE" | "UNREACHABLE" | "NEXT_HOP_ADDRESS_NOT_ASSIGNED" | "NEXT_HOP_INSTANCE_NOT_FOUND" | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK" | "NEXT_HOP_CANNOT_IP_FORWARD" | "NEXT_HOP_NOT_RUNNING" | "INJECTED_KERNELS_DEPRECATED" | "REQUIRED_TOS_AGREEMENT" | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE" | "RESOURCE_NOT_DELETED" | "SINGLE_INSTANCE_PROPERTY_TEMPLATE" | "NOT_CRITICAL_ERROR" | "CLEANUP_FAILED" | "FIELD_VALUE_OVERRIDEN" | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING" | "MISSING_TYPE_DEPENDENCY" | "EXTERNAL_API_WARNING" | "SCHEMA_VALIDATION_IGNORED" | "UNDECLARED_PROPERTIES" | "EXPERIMENTAL_TYPE_USED" | "DEPRECATED_TYPE_USED" | "PARTIAL_SUCCESS" | "LARGE_DEPLOYMENT_WARNING" | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE" | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB";
    data?: {
      key?: string;
      value?: string;
    }[];
    message?: string;
  }[];
  /**
   * [Output Only] The URL of the zone where the operation resides. Only
   * applicable when performing per-zone operations.
   */
  zone?: string;
}

function serializeOperation(data: any): Operation {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    targetId: data["targetId"] !== undefined ? String(data["targetId"]) : undefined,
  };
}

function deserializeOperation(data: any): Operation {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    targetId: data["targetId"] !== undefined ? BigInt(data["targetId"]) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#operationsList.
 */
export interface OperationsListOptions {
  /**
   * A filter expression that filters resources listed in the response. Most
   * Compute resources support two types of filter expressions: expressions that
   * support regular expressions and expressions that follow API improvement
   * proposal AIP-160. If you want to use AIP-160, your expression must specify
   * the field name, an operator, and the value that you want to use for
   * filtering. The value must be a string, a number, or a boolean. The operator
   * must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you
   * are filtering Compute Engine instances, you can exclude instances named
   * `example-instance` by specifying `name != example-instance`. The `:`
   * operator can be used with string fields to match substrings. For non-string
   * fields it is equivalent to the `=` operator. The `:*` comparison can be
   * used to test whether a key has been defined. For example, to find all
   * objects with `owner` label use: ``` labels.owner:* ``` You can also filter
   * nested fields. For example, you could specify `scheduling.automaticRestart
   * = false` to include instances only if they are not scheduled for automatic
   * restarts. You can use filtering on nested fields to filter based on
   * resource labels. To filter on multiple expressions, provide each separate
   * expression within parentheses. For example: ```
   * (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By
   * default, each expression is an `AND` expression. However, you can include
   * `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform =
   * "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND
   * (scheduling.automaticRestart = true) ``` If you want to use a regular
   * expression, use the `eq` (equal) or `ne` (not equal) operator against a
   * single un-parenthesized expression with or without quotes or against
   * multiple parenthesized expressions. Examples: `fieldname eq unquoted
   * literal` `fieldname eq 'single quoted literal'` `fieldname eq "double
   * quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The
   * literal value is interpreted as a regular expression using Google RE2
   * library syntax. The literal value must match the entire field. For example,
   * to filter for instances that do not end with name "instance", you would use
   * `name ne .*instance`.
   */
  filter?: string;
  /**
   * The maximum number of results per page that should be returned. If the
   * number of available results is larger than `maxResults`, Compute Engine
   * returns a `nextPageToken` that can be used to get the next page of results
   * in subsequent list requests. Acceptable values are `0` to `500`, inclusive.
   * (Default: `500`)
   */
  maxResults?: number;
  /**
   * Sorts list results by a certain order. By default, results are returned in
   * alphanumerical order based on the resource name. You can also sort results
   * in descending order based on the creation timestamp using
   * `orderBy="creationTimestamp desc"`. This sorts results based on the
   * `creationTimestamp` field in reverse chronological order (newest result
   * first). Use this to sort resources like operations so that the newest
   * operation is returned first. Currently, only sorting by `name` or
   * `creationTimestamp desc` is supported.
   */
  orderBy?: string;
  /**
   * Specifies a page token to use. Set `pageToken` to the `nextPageToken`
   * returned by a previous list request to get the next page of results.
   */
  pageToken?: string;
}

/**
 * A response containing a partial list of operations and a page token used to
 * build the next request if the request has been truncated.
 */
export interface OperationsListResponse {
  /**
   * Output only. A token used to continue a truncated list request.
   */
  nextPageToken?: string;
  /**
   * Output only. Operations contained in this list response.
   */
  operations?: Operation[];
}

function serializeOperationsListResponse(data: any): OperationsListResponse {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (serializeOperation(item))) : undefined,
  };
}

function deserializeOperationsListResponse(data: any): OperationsListResponse {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (deserializeOperation(item))) : undefined,
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

export interface Resource {
  /**
   * The Access Control Policy set on this resource.
   */
  accessControl?: ResourceAccessControl;
  /**
   * Output only. The evaluated properties of the resource with references
   * expanded. Returned as serialized YAML.
   */
  finalProperties?: string;
  id?: bigint;
  /**
   * Output only. Creation timestamp in RFC3339 text format.
   */
  insertTime?: string;
  /**
   * Output only. URL of the manifest representing the current configuration of
   * this resource.
   */
  manifest?: string;
  /**
   * Output only. The name of the resource as it appears in the YAML config.
   */
  name?: string;
  /**
   * Output only. The current properties of the resource before any references
   * have been filled in. Returned as serialized YAML.
   */
  properties?: string;
  /**
   * Output only. The type of the resource, for example `compute.v1.instance`,
   * or `cloudfunctions.v1beta1.function`.
   */
  type?: string;
  /**
   * Output only. If Deployment Manager is currently updating or previewing an
   * update to this resource, the updated configuration appears here.
   */
  update?: ResourceUpdate;
  /**
   * Output only. Update timestamp in RFC3339 text format.
   */
  updateTime?: string;
  /**
   * Output only. The URL of the actual resource.
   */
  url?: string;
  /**
   * Output only. If warning messages are generated during processing of this
   * resource, this field will be populated.
   */
  warnings?: {
    code?:  | "DEPRECATED_RESOURCE_USED" | "NO_RESULTS_ON_PAGE" | "UNREACHABLE" | "NEXT_HOP_ADDRESS_NOT_ASSIGNED" | "NEXT_HOP_INSTANCE_NOT_FOUND" | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK" | "NEXT_HOP_CANNOT_IP_FORWARD" | "NEXT_HOP_NOT_RUNNING" | "INJECTED_KERNELS_DEPRECATED" | "REQUIRED_TOS_AGREEMENT" | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE" | "RESOURCE_NOT_DELETED" | "SINGLE_INSTANCE_PROPERTY_TEMPLATE" | "NOT_CRITICAL_ERROR" | "CLEANUP_FAILED" | "FIELD_VALUE_OVERRIDEN" | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING" | "MISSING_TYPE_DEPENDENCY" | "EXTERNAL_API_WARNING" | "SCHEMA_VALIDATION_IGNORED" | "UNDECLARED_PROPERTIES" | "EXPERIMENTAL_TYPE_USED" | "DEPRECATED_TYPE_USED" | "PARTIAL_SUCCESS" | "LARGE_DEPLOYMENT_WARNING" | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE" | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB";
    data?: {
      key?: string;
      value?: string;
    }[];
    message?: string;
  }[];
}

function serializeResource(data: any): Resource {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeResource(data: any): Resource {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * The access controls set on the resource.
 */
export interface ResourceAccessControl {
  /**
   * The GCP IAM Policy to set on the resource.
   */
  gcpIamPolicy?: string;
}

/**
 * Additional options for DeploymentManager#resourcesList.
 */
export interface ResourcesListOptions {
  /**
   * A filter expression that filters resources listed in the response. Most
   * Compute resources support two types of filter expressions: expressions that
   * support regular expressions and expressions that follow API improvement
   * proposal AIP-160. If you want to use AIP-160, your expression must specify
   * the field name, an operator, and the value that you want to use for
   * filtering. The value must be a string, a number, or a boolean. The operator
   * must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you
   * are filtering Compute Engine instances, you can exclude instances named
   * `example-instance` by specifying `name != example-instance`. The `:`
   * operator can be used with string fields to match substrings. For non-string
   * fields it is equivalent to the `=` operator. The `:*` comparison can be
   * used to test whether a key has been defined. For example, to find all
   * objects with `owner` label use: ``` labels.owner:* ``` You can also filter
   * nested fields. For example, you could specify `scheduling.automaticRestart
   * = false` to include instances only if they are not scheduled for automatic
   * restarts. You can use filtering on nested fields to filter based on
   * resource labels. To filter on multiple expressions, provide each separate
   * expression within parentheses. For example: ```
   * (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By
   * default, each expression is an `AND` expression. However, you can include
   * `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform =
   * "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND
   * (scheduling.automaticRestart = true) ``` If you want to use a regular
   * expression, use the `eq` (equal) or `ne` (not equal) operator against a
   * single un-parenthesized expression with or without quotes or against
   * multiple parenthesized expressions. Examples: `fieldname eq unquoted
   * literal` `fieldname eq 'single quoted literal'` `fieldname eq "double
   * quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The
   * literal value is interpreted as a regular expression using Google RE2
   * library syntax. The literal value must match the entire field. For example,
   * to filter for instances that do not end with name "instance", you would use
   * `name ne .*instance`.
   */
  filter?: string;
  /**
   * The maximum number of results per page that should be returned. If the
   * number of available results is larger than `maxResults`, Compute Engine
   * returns a `nextPageToken` that can be used to get the next page of results
   * in subsequent list requests. Acceptable values are `0` to `500`, inclusive.
   * (Default: `500`)
   */
  maxResults?: number;
  /**
   * Sorts list results by a certain order. By default, results are returned in
   * alphanumerical order based on the resource name. You can also sort results
   * in descending order based on the creation timestamp using
   * `orderBy="creationTimestamp desc"`. This sorts results based on the
   * `creationTimestamp` field in reverse chronological order (newest result
   * first). Use this to sort resources like operations so that the newest
   * operation is returned first. Currently, only sorting by `name` or
   * `creationTimestamp desc` is supported.
   */
  orderBy?: string;
  /**
   * Specifies a page token to use. Set `pageToken` to the `nextPageToken`
   * returned by a previous list request to get the next page of results.
   */
  pageToken?: string;
}

/**
 * A response containing a partial list of resources and a page token used to
 * build the next request if the request has been truncated.
 */
export interface ResourcesListResponse {
  /**
   * A token used to continue a truncated list request.
   */
  nextPageToken?: string;
  /**
   * Resources contained in this list response.
   */
  resources?: Resource[];
}

function serializeResourcesListResponse(data: any): ResourcesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeResource(item))) : undefined,
  };
}

function deserializeResourcesListResponse(data: any): ResourcesListResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeResource(item))) : undefined,
  };
}

export interface ResourceUpdate {
  /**
   * The Access Control Policy to set on this resource after updating the
   * resource itself.
   */
  accessControl?: ResourceAccessControl;
  /**
   * Output only. If errors are generated during update of the resource, this
   * field will be populated.
   */
  error?: {
    errors?: {
      code?: string;
      location?: string;
      message?: string;
    }[];
  };
  /**
   * Output only. The expanded properties of the resource with reference values
   * expanded. Returned as serialized YAML.
   */
  finalProperties?: string;
  /**
   * Output only. The intent of the resource: `PREVIEW`, `UPDATE`, or `CANCEL`.
   */
  intent?:  | "CREATE_OR_ACQUIRE" | "DELETE" | "ACQUIRE" | "UPDATE" | "ABANDON" | "CREATE";
  /**
   * Output only. URL of the manifest representing the update configuration of
   * this resource.
   */
  manifest?: string;
  /**
   * Output only. The set of updated properties for this resource, before
   * references are expanded. Returned as serialized YAML.
   */
  properties?: string;
  /**
   * Output only. The state of the resource.
   */
  state?:  | "PENDING" | "IN_PROGRESS" | "IN_PREVIEW" | "FAILED" | "ABORTED";
  /**
   * Output only. If warning messages are generated during processing of this
   * resource, this field will be populated.
   */
  warnings?: {
    code?:  | "DEPRECATED_RESOURCE_USED" | "NO_RESULTS_ON_PAGE" | "UNREACHABLE" | "NEXT_HOP_ADDRESS_NOT_ASSIGNED" | "NEXT_HOP_INSTANCE_NOT_FOUND" | "NEXT_HOP_INSTANCE_NOT_ON_NETWORK" | "NEXT_HOP_CANNOT_IP_FORWARD" | "NEXT_HOP_NOT_RUNNING" | "INJECTED_KERNELS_DEPRECATED" | "REQUIRED_TOS_AGREEMENT" | "DISK_SIZE_LARGER_THAN_IMAGE_SIZE" | "RESOURCE_NOT_DELETED" | "SINGLE_INSTANCE_PROPERTY_TEMPLATE" | "NOT_CRITICAL_ERROR" | "CLEANUP_FAILED" | "FIELD_VALUE_OVERRIDEN" | "RESOURCE_IN_USE_BY_OTHER_RESOURCE_WARNING" | "MISSING_TYPE_DEPENDENCY" | "EXTERNAL_API_WARNING" | "SCHEMA_VALIDATION_IGNORED" | "UNDECLARED_PROPERTIES" | "EXPERIMENTAL_TYPE_USED" | "DEPRECATED_TYPE_USED" | "PARTIAL_SUCCESS" | "LARGE_DEPLOYMENT_WARNING" | "NEXT_HOP_INSTANCE_HAS_NO_IPV6_INTERFACE" | "INVALID_HEALTH_CHECK_FOR_DYNAMIC_WIEGHTED_LB";
    data?: {
      key?: string;
      value?: string;
    }[];
    message?: string;
  }[];
}

export interface TargetConfiguration {
  /**
   * The configuration to use for this deployment.
   */
  config?: ConfigFile;
  /**
   * Specifies any files to import for this configuration. This can be used to
   * import templates or other files. For example, you might import a text file
   * in order to use the file in a template.
   */
  imports?: ImportFile[];
}

export interface TestPermissionsRequest {
  /**
   * The set of permissions to check for the 'resource'. Permissions with
   * wildcards (such as '*' or 'storage.*') are not allowed.
   */
  permissions?: string[];
}

export interface TestPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * A resource type supported by Deployment Manager.
 */
export interface Type {
  id?: bigint;
  /**
   * Output only. Creation timestamp in RFC3339 text format.
   */
  insertTime?: string;
  /**
   * Name of the type.
   */
  name?: string;
  /**
   * Output only. The Operation that most recently ran, or is currently
   * running, on this type.
   */
  operation?: Operation;
  /**
   * Output only. Server defined URL for the resource.
   */
  selfLink?: string;
}

function serializeType(data: any): Type {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    operation: data["operation"] !== undefined ? serializeOperation(data["operation"]) : undefined,
  };
}

function deserializeType(data: any): Type {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    operation: data["operation"] !== undefined ? deserializeOperation(data["operation"]) : undefined,
  };
}

/**
 * Additional options for DeploymentManager#typesList.
 */
export interface TypesListOptions {
  /**
   * A filter expression that filters resources listed in the response. Most
   * Compute resources support two types of filter expressions: expressions that
   * support regular expressions and expressions that follow API improvement
   * proposal AIP-160. If you want to use AIP-160, your expression must specify
   * the field name, an operator, and the value that you want to use for
   * filtering. The value must be a string, a number, or a boolean. The operator
   * must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`. For example, if you
   * are filtering Compute Engine instances, you can exclude instances named
   * `example-instance` by specifying `name != example-instance`. The `:`
   * operator can be used with string fields to match substrings. For non-string
   * fields it is equivalent to the `=` operator. The `:*` comparison can be
   * used to test whether a key has been defined. For example, to find all
   * objects with `owner` label use: ``` labels.owner:* ``` You can also filter
   * nested fields. For example, you could specify `scheduling.automaticRestart
   * = false` to include instances only if they are not scheduled for automatic
   * restarts. You can use filtering on nested fields to filter based on
   * resource labels. To filter on multiple expressions, provide each separate
   * expression within parentheses. For example: ```
   * (scheduling.automaticRestart = true) (cpuPlatform = "Intel Skylake") ``` By
   * default, each expression is an `AND` expression. However, you can include
   * `AND` and `OR` expressions explicitly. For example: ``` (cpuPlatform =
   * "Intel Skylake") OR (cpuPlatform = "Intel Broadwell") AND
   * (scheduling.automaticRestart = true) ``` If you want to use a regular
   * expression, use the `eq` (equal) or `ne` (not equal) operator against a
   * single un-parenthesized expression with or without quotes or against
   * multiple parenthesized expressions. Examples: `fieldname eq unquoted
   * literal` `fieldname eq 'single quoted literal'` `fieldname eq "double
   * quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")` The
   * literal value is interpreted as a regular expression using Google RE2
   * library syntax. The literal value must match the entire field. For example,
   * to filter for instances that do not end with name "instance", you would use
   * `name ne .*instance`.
   */
  filter?: string;
  /**
   * The maximum number of results per page that should be returned. If the
   * number of available results is larger than `maxResults`, Compute Engine
   * returns a `nextPageToken` that can be used to get the next page of results
   * in subsequent list requests. Acceptable values are `0` to `500`, inclusive.
   * (Default: `500`)
   */
  maxResults?: number;
  /**
   * Sorts list results by a certain order. By default, results are returned in
   * alphanumerical order based on the resource name. You can also sort results
   * in descending order based on the creation timestamp using
   * `orderBy="creationTimestamp desc"`. This sorts results based on the
   * `creationTimestamp` field in reverse chronological order (newest result
   * first). Use this to sort resources like operations so that the newest
   * operation is returned first. Currently, only sorting by `name` or
   * `creationTimestamp desc` is supported.
   */
  orderBy?: string;
  /**
   * Specifies a page token to use. Set `pageToken` to the `nextPageToken`
   * returned by a previous list request to get the next page of results.
   */
  pageToken?: string;
}

/**
 * A response that returns all Types supported by Deployment Manager
 */
export interface TypesListResponse {
  /**
   * A token used to continue a truncated list request.
   */
  nextPageToken?: string;
  /**
   * Output only. A list of resource types supported by Deployment Manager.
   */
  types?: Type[];
}

function serializeTypesListResponse(data: any): TypesListResponse {
  return {
    ...data,
    types: data["types"] !== undefined ? data["types"].map((item: any) => (serializeType(item))) : undefined,
  };
}

function deserializeTypesListResponse(data: any): TypesListResponse {
  return {
    ...data,
    types: data["types"] !== undefined ? data["types"].map((item: any) => (deserializeType(item))) : undefined,
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
