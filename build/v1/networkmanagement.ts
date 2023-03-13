// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Network Management API Client for Deno
 * ======================================
 * 
 * The Network Management API provides a collection of network performance monitoring and diagnostic capabilities.
 * 
 * Docs: https://cloud.google.com/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Network Management API provides a collection of network performance
 * monitoring and diagnostic capabilities.
 */
export class NetworkManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://networkmanagement.googleapis.com/") {
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
   * Creates a new Connectivity Test. After you create a test, the reachability
   * analysis is performed as part of the long running operation, which
   * completes when the analysis completes. If the endpoint specifications in
   * `ConnectivityTest` are invalid (for example, containing non-existent
   * resources in the network, or you don't have read permissions to the network
   * configurations of listed projects), then the reachability result returns a
   * value of `UNKNOWN`. If the endpoint specifications in `ConnectivityTest`
   * are incomplete, the reachability result returns a value of AMBIGUOUS. For
   * more information, see the Connectivity Test documentation.
   *
   * @param parent Required. The parent resource of the Connectivity Test to create: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalConnectivityTestsCreate(parent: string, req: ConnectivityTest, opts: ProjectsLocationsGlobalConnectivityTestsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectivityTests`);
    if (opts.testId !== undefined) {
      url.searchParams.append("testId", String(opts.testId));
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
   * Deletes a specific `ConnectivityTest`.
   *
   * @param name Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`
   */
  async projectsLocationsGlobalConnectivityTestsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific Connectivity Test.
   *
   * @param name Required. `ConnectivityTest` resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`
   */
  async projectsLocationsGlobalConnectivityTestsGet(name: string): Promise<ConnectivityTest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ConnectivityTest;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalConnectivityTestsGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalConnectivityTestsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists all Connectivity Tests owned by a project.
   *
   * @param parent Required. The parent resource of the Connectivity Tests: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalConnectivityTestsList(parent: string, opts: ProjectsLocationsGlobalConnectivityTestsListOptions = {}): Promise<ListConnectivityTestsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectivityTests`);
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
    return data as ListConnectivityTestsResponse;
  }

  /**
   * Updates the configuration of an existing `ConnectivityTest`. After you
   * update a test, the reachability analysis is performed as part of the long
   * running operation, which completes when the analysis completes. The
   * Reachability state in the test resource is updated with the new result. If
   * the endpoint specifications in `ConnectivityTest` are invalid (for example,
   * they contain non-existent resources in the network, or the user does not
   * have read permissions to the network configurations of listed projects),
   * then the reachability result returns a value of UNKNOWN. If the endpoint
   * specifications in `ConnectivityTest` are incomplete, the reachability
   * result returns a value of `AMBIGUOUS`. See the documentation in
   * `ConnectivityTest` for for more details.
   *
   * @param name Required. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`
   */
  async projectsLocationsGlobalConnectivityTestsPatch(name: string, req: ConnectivityTest, opts: ProjectsLocationsGlobalConnectivityTestsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGlobalConnectivityTestsPatchOptions(opts);
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
   * Rerun an existing `ConnectivityTest`. After the user triggers the rerun,
   * the reachability analysis is performed as part of the long running
   * operation, which completes when the analysis completes. Even though the
   * test configuration remains the same, the reachability result may change due
   * to underlying network configuration changes. If the endpoint specifications
   * in `ConnectivityTest` become invalid (for example, specified resources are
   * deleted in the network, or you lost read permissions to the network
   * configurations of listed projects), then the reachability result returns a
   * value of `UNKNOWN`.
   *
   * @param name Required. Connectivity Test resource name using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`
   */
  async projectsLocationsGlobalConnectivityTestsRerun(name: string, req: RerunConnectivityTestRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rerun`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
  async projectsLocationsGlobalConnectivityTestsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGlobalConnectivityTestsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsGlobalOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
  async projectsLocationsGlobalOperationsDelete(name: string): Promise<Empty> {
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
  async projectsLocationsGlobalOperationsGet(name: string): Promise<Operation> {
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
  async projectsLocationsGlobalOperationsList(name: string, opts: ProjectsLocationsGlobalOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
}

/**
 * Details of the final state "abort" and associated resource.
 */
export interface AbortInfo {
  /**
   * Causes that the analysis is aborted.
   */
  cause?:  | "CAUSE_UNSPECIFIED" | "UNKNOWN_NETWORK" | "UNKNOWN_IP" | "UNKNOWN_PROJECT" | "PERMISSION_DENIED" | "NO_SOURCE_LOCATION" | "INVALID_ARGUMENT" | "NO_EXTERNAL_IP" | "UNINTENDED_DESTINATION" | "TRACE_TOO_LONG" | "INTERNAL_ERROR" | "SOURCE_ENDPOINT_NOT_FOUND" | "MISMATCHED_SOURCE_NETWORK" | "DESTINATION_ENDPOINT_NOT_FOUND" | "MISMATCHED_DESTINATION_NETWORK" | "UNSUPPORTED" | "MISMATCHED_IP_VERSION" | "GKE_KONNECTIVITY_PROXY_UNSUPPORTED";
  /**
   * List of project IDs that the user has specified in the request but does
   * not have permission to access network configs. Analysis is aborted in this
   * case with the PERMISSION_DENIED cause.
   */
  projectsMissingPermission?: string[];
  /**
   * URI of the resource that caused the abort.
   */
  resourceUri?: string;
}

/**
 * Wrapper for app engine service version attributes.
 */
export interface AppEngineVersionEndpoint {
  /**
   * An [App Engine](https://cloud.google.com/appengine) [service
   * version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions)
   * name.
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with an App Engine version.
 */
export interface AppEngineVersionInfo {
  /**
   * Name of an App Engine version.
   */
  displayName?: string;
  /**
   * App Engine execution environment for a version.
   */
  environment?: string;
  /**
   * Runtime of the App Engine version.
   */
  runtime?: string;
  /**
   * URI of an App Engine version.
   */
  uri?: string;
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
 * Wrapper for Cloud Function attributes.
 */
export interface CloudFunctionEndpoint {
  /**
   * A [Cloud Function](https://cloud.google.com/functions) name.
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with a Cloud Function.
 */
export interface CloudFunctionInfo {
  /**
   * Name of a Cloud Function.
   */
  displayName?: string;
  /**
   * Location in which the Cloud Function is deployed.
   */
  location?: string;
  /**
   * URI of a Cloud Function.
   */
  uri?: string;
  /**
   * Latest successfully deployed version id of the Cloud Function.
   */
  versionId?: bigint;
}

function serializeCloudFunctionInfo(data: any): CloudFunctionInfo {
  return {
    ...data,
    versionId: data["versionId"] !== undefined ? String(data["versionId"]) : undefined,
  };
}

function deserializeCloudFunctionInfo(data: any): CloudFunctionInfo {
  return {
    ...data,
    versionId: data["versionId"] !== undefined ? BigInt(data["versionId"]) : undefined,
  };
}

/**
 * Wrapper for Cloud Run revision attributes.
 */
export interface CloudRunRevisionEndpoint {
  /**
   * A [Cloud Run](https://cloud.google.com/run)
   * [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get)
   * URI. The format is:
   * projects/{project}/locations/{location}/revisions/{revision}
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with a Cloud Run revision.
 */
export interface CloudRunRevisionInfo {
  /**
   * Name of a Cloud Run revision.
   */
  displayName?: string;
  /**
   * Location in which this revision is deployed.
   */
  location?: string;
  /**
   * URI of Cloud Run service this revision belongs to.
   */
  serviceUri?: string;
  /**
   * URI of a Cloud Run revision.
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with a Cloud SQL instance.
 */
export interface CloudSQLInstanceInfo {
  /**
   * Name of a Cloud SQL instance.
   */
  displayName?: string;
  /**
   * External IP address of a Cloud SQL instance.
   */
  externalIp?: string;
  /**
   * Internal IP address of a Cloud SQL instance.
   */
  internalIp?: string;
  /**
   * URI of a Cloud SQL instance network or empty string if the instance does
   * not have one.
   */
  networkUri?: string;
  /**
   * Region in which the Cloud SQL instance is running.
   */
  region?: string;
  /**
   * URI of a Cloud SQL instance.
   */
  uri?: string;
}

/**
 * A Connectivity Test for a network reachability analysis.
 */
export interface ConnectivityTest {
  /**
   * Output only. The time the test was created.
   */
  readonly createTime?: Date;
  /**
   * The user-supplied description of the Connectivity Test. Maximum of 512
   * characters.
   */
  description?: string;
  /**
   * Required. Destination specification of the Connectivity Test. You can use
   * a combination of destination IP address, Compute Engine VM instance, or VPC
   * network to uniquely identify the destination location. Even if the
   * destination IP address is not unique, the source IP location is unique.
   * Usually, the analysis can infer the destination endpoint from route
   * information. If the destination you specify is a VM instance and the
   * instance has multiple network interfaces, then you must also specify either
   * a destination IP address or VPC network to identify the destination
   * interface. A reachability analysis proceeds even if the destination
   * location is ambiguous. However, the result can include endpoints that you
   * don't intend to test.
   */
  destination?: Endpoint;
  /**
   * Output only. The display name of a Connectivity Test.
   */
  readonly displayName?: string;
  /**
   * Resource labels to represent user-provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Unique name of the resource using the form:
   * `projects/{project_id}/locations/global/connectivityTests/{test_id}`
   */
  name?: string;
  /**
   * IP Protocol of the test. When not provided, "TCP" is assumed.
   */
  protocol?: string;
  /**
   * Output only. The reachability details of this test from the latest run.
   * The details are updated when creating a new test, updating an existing
   * test, or triggering a one-time rerun of an existing test.
   */
  readonly reachabilityDetails?: ReachabilityDetails;
  /**
   * Other projects that may be relevant for reachability analysis. This is
   * applicable to scenarios where a test can cross project boundaries.
   */
  relatedProjects?: string[];
  /**
   * Required. Source specification of the Connectivity Test. You can use a
   * combination of source IP address, virtual machine (VM) instance, or Compute
   * Engine network to uniquely identify the source location. Examples: If the
   * source IP address is an internal IP address within a Google Cloud Virtual
   * Private Cloud (VPC) network, then you must also specify the VPC network.
   * Otherwise, specify the VM instance, which already contains its internal IP
   * address and VPC network information. If the source of the test is within an
   * on-premises network, then you must provide the destination VPC network. If
   * the source endpoint is a Compute Engine VM instance with multiple network
   * interfaces, the instance itself is not sufficient to identify the endpoint.
   * So, you must also specify the source IP address or VPC network. A
   * reachability analysis proceeds even if the source location is ambiguous.
   * However, the test result may include endpoints that you don't intend to
   * test.
   */
  source?: Endpoint;
  /**
   * Output only. The time the test's configuration was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Details of the final state "deliver" and associated resource.
 */
export interface DeliverInfo {
  /**
   * URI of the resource that the packet is delivered to.
   */
  resourceUri?: string;
  /**
   * Target type where the packet is delivered to.
   */
  target?:  | "TARGET_UNSPECIFIED" | "INSTANCE" | "INTERNET" | "GOOGLE_API" | "GKE_MASTER" | "CLOUD_SQL_INSTANCE" | "PSC_PUBLISHED_SERVICE" | "PSC_GOOGLE_API" | "PSC_VPC_SC";
}

/**
 * Details of the final state "drop" and associated resource.
 */
export interface DropInfo {
  /**
   * Cause that the packet is dropped.
   */
  cause?:  | "CAUSE_UNSPECIFIED" | "UNKNOWN_EXTERNAL_ADDRESS" | "FOREIGN_IP_DISALLOWED" | "FIREWALL_RULE" | "NO_ROUTE" | "ROUTE_BLACKHOLE" | "ROUTE_WRONG_NETWORK" | "PRIVATE_TRAFFIC_TO_INTERNET" | "PRIVATE_GOOGLE_ACCESS_DISALLOWED" | "NO_EXTERNAL_ADDRESS" | "UNKNOWN_INTERNAL_ADDRESS" | "FORWARDING_RULE_MISMATCH" | "FORWARDING_RULE_REGION_MISMATCH" | "FORWARDING_RULE_NO_INSTANCES" | "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK" | "INSTANCE_NOT_RUNNING" | "GKE_CLUSTER_NOT_RUNNING" | "CLOUD_SQL_INSTANCE_NOT_RUNNING" | "TRAFFIC_TYPE_BLOCKED" | "GKE_MASTER_UNAUTHORIZED_ACCESS" | "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS" | "DROPPED_INSIDE_GKE_SERVICE" | "DROPPED_INSIDE_CLOUD_SQL_SERVICE" | "GOOGLE_MANAGED_SERVICE_NO_PEERING" | "GKE_PSC_ENDPOINT_MISSING" | "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS" | "GKE_CONTROL_PLANE_REGION_MISMATCH" | "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION" | "GKE_CONTROL_PLANE_NO_ROUTE" | "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC" | "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION" | "CLOUD_SQL_INSTANCE_NO_ROUTE" | "CLOUD_FUNCTION_NOT_ACTIVE" | "VPC_CONNECTOR_NOT_SET" | "VPC_CONNECTOR_NOT_RUNNING" | "PSC_CONNECTION_NOT_ACCEPTED" | "CLOUD_RUN_REVISION_NOT_READY" | "DROPPED_INSIDE_PSC_SERVICE_PRODUCER";
  /**
   * URI of the resource that caused the drop.
   */
  resourceUri?: string;
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
 * Source or destination of the Connectivity Test.
 */
export interface Endpoint {
  /**
   * An [App Engine](https://cloud.google.com/appengine) [service
   * version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions).
   */
  appEngineVersion?: AppEngineVersionEndpoint;
  /**
   * A [Cloud Function](https://cloud.google.com/functions).
   */
  cloudFunction?: CloudFunctionEndpoint;
  /**
   * A [Cloud Run](https://cloud.google.com/run)
   * [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get)
   */
  cloudRunRevision?: CloudRunRevisionEndpoint;
  /**
   * A [Cloud SQL](https://cloud.google.com/sql) instance URI.
   */
  cloudSqlInstance?: string;
  /**
   * A cluster URI for [Google Kubernetes Engine
   * master](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).
   */
  gkeMasterCluster?: string;
  /**
   * A Compute Engine instance URI.
   */
  instance?: string;
  /**
   * The IP address of the endpoint, which can be an external or internal IP.
   * An IPv6 address is only allowed when the test's destination is a [global
   * load balancer VIP](/load-balancing/docs/load-balancing-overview).
   */
  ipAddress?: string;
  /**
   * A Compute Engine network URI.
   */
  network?: string;
  /**
   * Type of the network where the endpoint is located. Applicable only to
   * source endpoint, as destination network type can be inferred from the
   * source.
   */
  networkType?:  | "NETWORK_TYPE_UNSPECIFIED" | "GCP_NETWORK" | "NON_GCP_NETWORK";
  /**
   * The IP protocol port of the endpoint. Only applicable when protocol is TCP
   * or UDP.
   */
  port?: number;
  /**
   * Project ID where the endpoint is located. The Project ID can be derived
   * from the URI if you provide a VM instance or network URI. The following are
   * two cases where you must provide the project ID: 1. Only the IP address is
   * specified, and the IP address is within a GCP project. 2. When you are
   * using Shared VPC and the IP address that you provide is from the service
   * project. In this case, the network that the IP address resides in is
   * defined in the host project.
   */
  projectId?: string;
}

/**
 * For display only. The specification of the endpoints for the test.
 * EndpointInfo is derived from source and destination Endpoint and validated by
 * the backend data plane model.
 */
export interface EndpointInfo {
  /**
   * Destination IP address.
   */
  destinationIp?: string;
  /**
   * URI of the network where this packet is sent to.
   */
  destinationNetworkUri?: string;
  /**
   * Destination port. Only valid when protocol is TCP or UDP.
   */
  destinationPort?: number;
  /**
   * IP protocol in string format, for example: "TCP", "UDP", "ICMP".
   */
  protocol?: string;
  /**
   * Source IP address.
   */
  sourceIp?: string;
  /**
   * URI of the network where this packet originates from.
   */
  sourceNetworkUri?: string;
  /**
   * Source port. Only valid when protocol is TCP or UDP.
   */
  sourcePort?: number;
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
 * For display only. Metadata associated with a VPC firewall rule, an implied
 * VPC firewall rule, or a hierarchical firewall policy rule.
 */
export interface FirewallInfo {
  /**
   * Possible values: ALLOW, DENY
   */
  action?: string;
  /**
   * Possible values: INGRESS, EGRESS
   */
  direction?: string;
  /**
   * The display name of the VPC firewall rule. This field is not applicable to
   * hierarchical firewall policy rules.
   */
  displayName?: string;
  /**
   * The firewall rule's type.
   */
  firewallRuleType?:  | "FIREWALL_RULE_TYPE_UNSPECIFIED" | "HIERARCHICAL_FIREWALL_POLICY_RULE" | "VPC_FIREWALL_RULE" | "IMPLIED_VPC_FIREWALL_RULE" | "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE" | "NETWORK_FIREWALL_POLICY_RULE";
  /**
   * The URI of the VPC network that the firewall rule is associated with. This
   * field is not applicable to hierarchical firewall policy rules.
   */
  networkUri?: string;
  /**
   * The hierarchical firewall policy that this rule is associated with. This
   * field is not applicable to VPC firewall rules.
   */
  policy?: string;
  /**
   * The priority of the firewall rule.
   */
  priority?: number;
  /**
   * The target service accounts specified by the firewall rule.
   */
  targetServiceAccounts?: string[];
  /**
   * The target tags defined by the VPC firewall rule. This field is not
   * applicable to hierarchical firewall policy rules.
   */
  targetTags?: string[];
  /**
   * The URI of the VPC firewall rule. This field is not applicable to implied
   * firewall rules or hierarchical firewall policy rules.
   */
  uri?: string;
}

/**
 * Details of the final state "forward" and associated resource.
 */
export interface ForwardInfo {
  /**
   * URI of the resource that the packet is forwarded to.
   */
  resourceUri?: string;
  /**
   * Target type where this packet is forwarded to.
   */
  target?:  | "TARGET_UNSPECIFIED" | "PEERING_VPC" | "VPN_GATEWAY" | "INTERCONNECT" | "GKE_MASTER" | "IMPORTED_CUSTOM_ROUTE_NEXT_HOP" | "CLOUD_SQL_INSTANCE" | "ANOTHER_PROJECT";
}

/**
 * For display only. Metadata associated with a Compute Engine forwarding rule.
 */
export interface ForwardingRuleInfo {
  /**
   * Name of a Compute Engine forwarding rule.
   */
  displayName?: string;
  /**
   * Port range defined in the forwarding rule that matches the test.
   */
  matchedPortRange?: string;
  /**
   * Protocol defined in the forwarding rule that matches the test.
   */
  matchedProtocol?: string;
  /**
   * Network URI. Only valid for Internal Load Balancer.
   */
  networkUri?: string;
  /**
   * Target type of the forwarding rule.
   */
  target?: string;
  /**
   * URI of a Compute Engine forwarding rule.
   */
  uri?: string;
  /**
   * VIP of the forwarding rule.
   */
  vip?: string;
}

/**
 * For display only. Metadata associated with a Google Kubernetes Engine (GKE)
 * cluster master.
 */
export interface GKEMasterInfo {
  /**
   * URI of a GKE cluster network.
   */
  clusterNetworkUri?: string;
  /**
   * URI of a GKE cluster.
   */
  clusterUri?: string;
  /**
   * External IP address of a GKE cluster master.
   */
  externalIp?: string;
  /**
   * Internal IP address of a GKE cluster master.
   */
  internalIp?: string;
}

/**
 * For display only. Metadata associated with a Compute Engine instance.
 */
export interface InstanceInfo {
  /**
   * Name of a Compute Engine instance.
   */
  displayName?: string;
  /**
   * External IP address of the network interface.
   */
  externalIp?: string;
  /**
   * Name of the network interface of a Compute Engine instance.
   */
  interface?: string;
  /**
   * Internal IP address of the network interface.
   */
  internalIp?: string;
  /**
   * Network tags configured on the instance.
   */
  networkTags?: string[];
  /**
   * URI of a Compute Engine network.
   */
  networkUri?: string;
  /**
   * Service account authorized for the instance.
   */
  serviceAccount?: string;
  /**
   * URI of a Compute Engine instance.
   */
  uri?: string;
}

/**
 * Response for the `ListConnectivityTests` method.
 */
export interface ListConnectivityTestsResponse {
  /**
   * Page token to fetch the next set of Connectivity Tests.
   */
  nextPageToken?: string;
  /**
   * List of Connectivity Tests.
   */
  resources?: ConnectivityTest[];
  /**
   * Locations that could not be reached (when querying all locations with
   * `-`).
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
 * For display only. Metadata associated with a specific load balancer backend.
 */
export interface LoadBalancerBackend {
  /**
   * Name of a Compute Engine instance or network endpoint.
   */
  displayName?: string;
  /**
   * A list of firewall rule URIs allowing probes from health check IP ranges.
   */
  healthCheckAllowingFirewallRules?: string[];
  /**
   * A list of firewall rule URIs blocking probes from health check IP ranges.
   */
  healthCheckBlockingFirewallRules?: string[];
  /**
   * State of the health check firewall configuration.
   */
  healthCheckFirewallState?:  | "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED" | "CONFIGURED" | "MISCONFIGURED";
  /**
   * URI of a Compute Engine instance or network endpoint.
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with a load balancer.
 */
export interface LoadBalancerInfo {
  /**
   * Information for the loadbalancer backends.
   */
  backends?: LoadBalancerBackend[];
  /**
   * Type of load balancer's backend configuration.
   */
  backendType?:  | "BACKEND_TYPE_UNSPECIFIED" | "BACKEND_SERVICE" | "TARGET_POOL" | "TARGET_INSTANCE";
  /**
   * Backend configuration URI.
   */
  backendUri?: string;
  /**
   * URI of the health check for the load balancer.
   */
  healthCheckUri?: string;
  /**
   * Type of the load balancer.
   */
  loadBalancerType?:  | "LOAD_BALANCER_TYPE_UNSPECIFIED" | "INTERNAL_TCP_UDP" | "NETWORK_TCP_UDP" | "HTTP_PROXY" | "TCP_PROXY" | "SSL_PROXY";
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
 * For display only. Metadata associated with a Compute Engine network.
 */
export interface NetworkInfo {
  /**
   * Name of a Compute Engine network.
   */
  displayName?: string;
  /**
   * The IP range that matches the test.
   */
  matchedIpRange?: string;
  /**
   * URI of a Compute Engine network.
   */
  uri?: string;
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
   * projects/project-1/locations/global/connectivityTests/test-1
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
 * Additional options for
 * NetworkManagement#projectsLocationsGlobalConnectivityTestsCreate.
 */
export interface ProjectsLocationsGlobalConnectivityTestsCreateOptions {
  /**
   * Required. The logical name of the Connectivity Test in your project with
   * the following restrictions: * Must contain only lowercase letters, numbers,
   * and hyphens. * Must start with a letter. * Must be between 1-40 characters.
   * * Must end with a number or a letter. * Must be unique within the customer
   * project
   */
  testId?: string;
}

/**
 * Additional options for
 * NetworkManagement#projectsLocationsGlobalConnectivityTestsGetIamPolicy.
 */
export interface ProjectsLocationsGlobalConnectivityTestsGetIamPolicyOptions {
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
 * NetworkManagement#projectsLocationsGlobalConnectivityTestsList.
 */
export interface ProjectsLocationsGlobalConnectivityTestsListOptions {
  /**
   * Lists the `ConnectivityTests` that match the filter expression. A filter
   * expression filters the resources listed in the response. The expression
   * must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`,
   * `:` are supported (colon `:` represents a HAS operator which is roughly
   * synonymous with equality). can refer to a proto or JSON field, or a
   * synthetic field. Field names can be camelCase or snake_case. Examples: -
   * Filter by name: name =
   * "projects/proj-1/locations/global/connectivityTests/test-1 - Filter by
   * labels: - Resources that have a key called `foo` labels.foo:* - Resources
   * that have a key called `foo` whose value is `bar` labels.foo = bar
   */
  filter?: string;
  /**
   * Field to use to sort the list.
   */
  orderBy?: string;
  /**
   * Number of `ConnectivityTests` to return.
   */
  pageSize?: number;
  /**
   * Page token from an earlier query, as returned in `next_page_token`.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * NetworkManagement#projectsLocationsGlobalConnectivityTestsPatch.
 */
export interface ProjectsLocationsGlobalConnectivityTestsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalConnectivityTestsPatchOptions(data: any): ProjectsLocationsGlobalConnectivityTestsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalConnectivityTestsPatchOptions(data: any): ProjectsLocationsGlobalConnectivityTestsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * NetworkManagement#projectsLocationsGlobalOperationsList.
 */
export interface ProjectsLocationsGlobalOperationsListOptions {
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
 * Additional options for NetworkManagement#projectsLocationsList.
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
 * Results of the configuration analysis from the last run of the test.
 */
export interface ReachabilityDetails {
  /**
   * The details of a failure or a cancellation of reachability analysis.
   */
  error?: Status;
  /**
   * The overall result of the test's configuration analysis.
   */
  result?:  | "RESULT_UNSPECIFIED" | "REACHABLE" | "UNREACHABLE" | "AMBIGUOUS" | "UNDETERMINED";
  /**
   * Result may contain a list of traces if a test has multiple possible paths
   * in the network, such as when destination endpoint is a load balancer with
   * multiple backends.
   */
  traces?: Trace[];
  /**
   * The time of the configuration analysis.
   */
  verifyTime?: Date;
}

function serializeReachabilityDetails(data: any): ReachabilityDetails {
  return {
    ...data,
    traces: data["traces"] !== undefined ? data["traces"].map((item: any) => (serializeTrace(item))) : undefined,
    verifyTime: data["verifyTime"] !== undefined ? data["verifyTime"].toISOString() : undefined,
  };
}

function deserializeReachabilityDetails(data: any): ReachabilityDetails {
  return {
    ...data,
    traces: data["traces"] !== undefined ? data["traces"].map((item: any) => (deserializeTrace(item))) : undefined,
    verifyTime: data["verifyTime"] !== undefined ? new Date(data["verifyTime"]) : undefined,
  };
}

/**
 * Request for the `RerunConnectivityTest` method.
 */
export interface RerunConnectivityTestRequest {
}

/**
 * For display only. Metadata associated with a Compute Engine route.
 */
export interface RouteInfo {
  /**
   * Destination IP range of the route.
   */
  destIpRange?: string;
  /**
   * Destination port ranges of the route. Policy based routes only.
   */
  destPortRanges?: string[];
  /**
   * Name of a Compute Engine route.
   */
  displayName?: string;
  /**
   * Instance tags of the route.
   */
  instanceTags?: string[];
  /**
   * URI of a Compute Engine network.
   */
  networkUri?: string;
  /**
   * Next hop of the route.
   */
  nextHop?: string;
  /**
   * Type of next hop.
   */
  nextHopType?:  | "NEXT_HOP_TYPE_UNSPECIFIED" | "NEXT_HOP_IP" | "NEXT_HOP_INSTANCE" | "NEXT_HOP_NETWORK" | "NEXT_HOP_PEERING" | "NEXT_HOP_INTERCONNECT" | "NEXT_HOP_VPN_TUNNEL" | "NEXT_HOP_VPN_GATEWAY" | "NEXT_HOP_INTERNET_GATEWAY" | "NEXT_HOP_BLACKHOLE" | "NEXT_HOP_ILB" | "NEXT_HOP_ROUTER_APPLIANCE";
  /**
   * Priority of the route.
   */
  priority?: number;
  /**
   * Protocols of the route. Policy based routes only.
   */
  protocols?: string[];
  /**
   * Type of route.
   */
  routeType?:  | "ROUTE_TYPE_UNSPECIFIED" | "SUBNET" | "STATIC" | "DYNAMIC" | "PEERING_SUBNET" | "PEERING_STATIC" | "PEERING_DYNAMIC" | "POLICY_BASED";
  /**
   * Source IP address range of the route. Policy based routes only.
   */
  srcIpRange?: string;
  /**
   * Source port ranges of the route. Policy based routes only.
   */
  srcPortRanges?: string[];
  /**
   * URI of a Compute Engine route. Dynamic route from cloud router does not
   * have a URI. Advertised route from Google Cloud VPC to on-premises network
   * also does not have a URI.
   */
  uri?: string;
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
 * A simulated forwarding path is composed of multiple steps. Each step has a
 * well-defined state and an associated configuration.
 */
export interface Step {
  /**
   * Display information of the final state "abort" and reason.
   */
  abort?: AbortInfo;
  /**
   * Display information of an App Engine service version.
   */
  appEngineVersion?: AppEngineVersionInfo;
  /**
   * This is a step that leads to the final state Drop.
   */
  causesDrop?: boolean;
  /**
   * Display information of a Cloud Function.
   */
  cloudFunction?: CloudFunctionInfo;
  /**
   * Display information of a Cloud Run revision.
   */
  cloudRunRevision?: CloudRunRevisionInfo;
  /**
   * Display information of a Cloud SQL instance.
   */
  cloudSqlInstance?: CloudSQLInstanceInfo;
  /**
   * Display information of the final state "deliver" and reason.
   */
  deliver?: DeliverInfo;
  /**
   * A description of the step. Usually this is a summary of the state.
   */
  description?: string;
  /**
   * Display information of the final state "drop" and reason.
   */
  drop?: DropInfo;
  /**
   * Display information of the source and destination under analysis. The
   * endpoint information in an intermediate state may differ with the initial
   * input, as it might be modified by state like NAT, or Connection Proxy.
   */
  endpoint?: EndpointInfo;
  /**
   * Display information of a Compute Engine firewall rule.
   */
  firewall?: FirewallInfo;
  /**
   * Display information of the final state "forward" and reason.
   */
  forward?: ForwardInfo;
  /**
   * Display information of a Compute Engine forwarding rule.
   */
  forwardingRule?: ForwardingRuleInfo;
  /**
   * Display information of a Google Kubernetes Engine cluster master.
   */
  gkeMaster?: GKEMasterInfo;
  /**
   * Display information of a Compute Engine instance.
   */
  instance?: InstanceInfo;
  /**
   * Display information of the load balancers.
   */
  loadBalancer?: LoadBalancerInfo;
  /**
   * Display information of a Google Cloud network.
   */
  network?: NetworkInfo;
  /**
   * Project ID that contains the configuration this step is validating.
   */
  projectId?: string;
  /**
   * Display information of a Compute Engine route.
   */
  route?: RouteInfo;
  /**
   * Each step is in one of the pre-defined states.
   */
  state?:  | "STATE_UNSPECIFIED" | "START_FROM_INSTANCE" | "START_FROM_INTERNET" | "START_FROM_PRIVATE_NETWORK" | "START_FROM_GKE_MASTER" | "START_FROM_CLOUD_SQL_INSTANCE" | "START_FROM_CLOUD_FUNCTION" | "START_FROM_APP_ENGINE_VERSION" | "START_FROM_CLOUD_RUN_REVISION" | "APPLY_INGRESS_FIREWALL_RULE" | "APPLY_EGRESS_FIREWALL_RULE" | "APPLY_ROUTE" | "APPLY_FORWARDING_RULE" | "SPOOFING_APPROVED" | "ARRIVE_AT_INSTANCE" | "ARRIVE_AT_INTERNAL_LOAD_BALANCER" | "ARRIVE_AT_EXTERNAL_LOAD_BALANCER" | "ARRIVE_AT_VPN_GATEWAY" | "ARRIVE_AT_VPN_TUNNEL" | "ARRIVE_AT_VPC_CONNECTOR" | "NAT" | "PROXY_CONNECTION" | "DELIVER" | "DROP" | "FORWARD" | "ABORT" | "VIEWER_PERMISSION_MISSING";
  /**
   * Display information of a VPC connector.
   */
  vpcConnector?: VpcConnectorInfo;
  /**
   * Display information of a Compute Engine VPN gateway.
   */
  vpnGateway?: VpnGatewayInfo;
  /**
   * Display information of a Compute Engine VPN tunnel.
   */
  vpnTunnel?: VpnTunnelInfo;
}

function serializeStep(data: any): Step {
  return {
    ...data,
    cloudFunction: data["cloudFunction"] !== undefined ? serializeCloudFunctionInfo(data["cloudFunction"]) : undefined,
  };
}

function deserializeStep(data: any): Step {
  return {
    ...data,
    cloudFunction: data["cloudFunction"] !== undefined ? deserializeCloudFunctionInfo(data["cloudFunction"]) : undefined,
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
 * Trace represents one simulated packet forwarding path. * Each trace contains
 * multiple ordered steps. * Each step is in a particular state with associated
 * configuration. * State is categorized as final or non-final states. * Each
 * final state has a reason associated. * Each trace must end with a final state
 * (the last step). ``` |---------------------Trace----------------------|
 * Step1(State) Step2(State) --- StepN(State(final)) ```
 */
export interface Trace {
  /**
   * Derived from the source and destination endpoints definition specified by
   * user request, and validated by the data plane model. If there are multiple
   * traces starting from different source locations, then the endpoint_info may
   * be different between traces.
   */
  endpointInfo?: EndpointInfo;
  /**
   * A trace of a test contains multiple steps from the initial state to the
   * final state (delivered, dropped, forwarded, or aborted). The steps are
   * ordered by the processing sequence within the simulated network state
   * machine. It is critical to preserve the order of the steps and avoid
   * reordering or sorting them.
   */
  steps?: Step[];
}

function serializeTrace(data: any): Trace {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeStep(item))) : undefined,
  };
}

function deserializeTrace(data: any): Trace {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeStep(item))) : undefined,
  };
}

/**
 * For display only. Metadata associated with a VPC connector.
 */
export interface VpcConnectorInfo {
  /**
   * Name of a VPC connector.
   */
  displayName?: string;
  /**
   * Location in which the VPC connector is deployed.
   */
  location?: string;
  /**
   * URI of a VPC connector.
   */
  uri?: string;
}

/**
 * For display only. Metadata associated with a Compute Engine VPN gateway.
 */
export interface VpnGatewayInfo {
  /**
   * Name of a VPN gateway.
   */
  displayName?: string;
  /**
   * IP address of the VPN gateway.
   */
  ipAddress?: string;
  /**
   * URI of a Compute Engine network where the VPN gateway is configured.
   */
  networkUri?: string;
  /**
   * Name of a Google Cloud region where this VPN gateway is configured.
   */
  region?: string;
  /**
   * URI of a VPN gateway.
   */
  uri?: string;
  /**
   * A VPN tunnel that is associated with this VPN gateway. There may be
   * multiple VPN tunnels configured on a VPN gateway, and only the one relevant
   * to the test is displayed.
   */
  vpnTunnelUri?: string;
}

/**
 * For display only. Metadata associated with a Compute Engine VPN tunnel.
 */
export interface VpnTunnelInfo {
  /**
   * Name of a VPN tunnel.
   */
  displayName?: string;
  /**
   * URI of a Compute Engine network where the VPN tunnel is configured.
   */
  networkUri?: string;
  /**
   * Name of a Google Cloud region where this VPN tunnel is configured.
   */
  region?: string;
  /**
   * URI of a VPN gateway at remote end of the tunnel.
   */
  remoteGateway?: string;
  /**
   * Remote VPN gateway's IP address.
   */
  remoteGatewayIp?: string;
  /**
   * Type of the routing policy.
   */
  routingType?:  | "ROUTING_TYPE_UNSPECIFIED" | "ROUTE_BASED" | "POLICY_BASED" | "DYNAMIC";
  /**
   * URI of the VPN gateway at local end of the tunnel.
   */
  sourceGateway?: string;
  /**
   * Local VPN gateway's IP address.
   */
  sourceGatewayIp?: string;
  /**
   * URI of a VPN tunnel.
   */
  uri?: string;
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
