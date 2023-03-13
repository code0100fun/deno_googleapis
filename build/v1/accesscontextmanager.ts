// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Access Context Manager API Client for Deno
 * ==========================================
 * 
 * An API for setting attribute based access control to requests to Google Cloud services.
 * 
 * Docs: https://cloud.google.com/access-context-manager/docs/reference/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API for setting attribute based access control to requests to Google
 * Cloud services.
 */
export class AccessContextManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://accesscontextmanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an access level. The long-running operation from this RPC has a
   * successful status after the access level propagates to long-lasting
   * storage. If access levels contain errors, an error response is returned for
   * the first error encountered.
   *
   * @param parent Required. Resource name for the access policy which owns this Access Level. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesAccessLevelsCreate(parent: string, req: AccessLevel): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/accessLevels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an access level based on the resource name. The long-running
   * operation from this RPC has a successful status after the access level has
   * been removed from long-lasting storage.
   *
   * @param name Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
   */
  async accessPoliciesAccessLevelsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets an access level based on the resource name.
   *
   * @param name Required. Resource name for the Access Level. Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
   */
  async accessPoliciesAccessLevelsGet(name: string, opts: AccessPoliciesAccessLevelsGetOptions = {}): Promise<AccessLevel> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.accessLevelFormat !== undefined) {
      url.searchParams.append("accessLevelFormat", String(opts.accessLevelFormat));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessLevel;
  }

  /**
   * Lists all access levels for an access policy.
   *
   * @param parent Required. Resource name for the access policy to list Access Levels from. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesAccessLevelsList(parent: string, opts: AccessPoliciesAccessLevelsListOptions = {}): Promise<ListAccessLevelsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/accessLevels`);
    if (opts.accessLevelFormat !== undefined) {
      url.searchParams.append("accessLevelFormat", String(opts.accessLevelFormat));
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
    return data as ListAccessLevelsResponse;
  }

  /**
   * Updates an access level. The long-running operation from this RPC has a
   * successful status after the changes to the access level propagate to
   * long-lasting storage. If access levels contain errors, an error response is
   * returned for the first error encountered.
   *
   * @param name Resource name for the `AccessLevel`. Format: `accessPolicies/{access_policy}/accessLevels/{access_level}`. The `access_level` component must begin with a letter, followed by alphanumeric characters or `_`. Its maximum length is 50 characters. After you create an `AccessLevel`, you cannot change its `name`.
   */
  async accessPoliciesAccessLevelsPatch(name: string, req: AccessLevel, opts: AccessPoliciesAccessLevelsPatchOptions = {}): Promise<Operation> {
    opts = serializeAccessPoliciesAccessLevelsPatchOptions(opts);
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
   * Replaces all existing access levels in an access policy with the access
   * levels provided. This is done atomically. The long-running operation from
   * this RPC has a successful status after all replacements propagate to
   * long-lasting storage. If the replacement contains errors, an error response
   * is returned for the first error encountered. Upon error, the replacement is
   * cancelled, and existing access levels are not affected. The
   * Operation.response field contains ReplaceAccessLevelsResponse. Removing
   * access levels contained in existing service perimeters result in an error.
   *
   * @param parent Required. Resource name for the access policy which owns these Access Levels. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesAccessLevelsReplaceAll(parent: string, req: ReplaceAccessLevelsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/accessLevels:replaceAll`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Returns the IAM permissions that the caller has on the specified Access
   * Context Manager resource. The resource can be an AccessPolicy, AccessLevel,
   * or ServicePerimeter. This method does not support other resources.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async accessPoliciesAccessLevelsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates an authorized orgs desc. The long-running operation from this RPC
   * has a successful status after the authorized orgs desc propagates to
   * long-lasting storage. If a authorized orgs desc contains errors, an error
   * response is returned for the first error encountered. The name of this
   * `AuthorizedOrgsDesc` will be assigned during creation.
   *
   * @param parent Required. Resource name for the access policy which owns this Authorized Orgs Desc. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesAuthorizedOrgsDescsCreate(parent: string, req: AuthorizedOrgsDesc): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/authorizedOrgsDescs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an authorized orgs desc based on the resource name. The
   * long-running operation from this RPC has a successful status after the
   * authorized orgs desc is removed from long-lasting storage.
   *
   * @param name Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDesc/{authorized_orgs_desc_id}`
   */
  async accessPoliciesAuthorizedOrgsDescsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets an authorized orgs desc based on the resource name.
   *
   * @param name Required. Resource name for the Authorized Orgs Desc. Format: `accessPolicies/{policy_id}/authorizedOrgsDescs/{authorized_orgs_descs_id}`
   */
  async accessPoliciesAuthorizedOrgsDescsGet(name: string): Promise<AuthorizedOrgsDesc> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AuthorizedOrgsDesc;
  }

  /**
   * Lists all authorized orgs descs for an access policy.
   *
   * @param parent Required. Resource name for the access policy to list Authorized Orgs Desc from. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesAuthorizedOrgsDescsList(parent: string, opts: AccessPoliciesAuthorizedOrgsDescsListOptions = {}): Promise<ListAuthorizedOrgsDescsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/authorizedOrgsDescs`);
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
    return data as ListAuthorizedOrgsDescsResponse;
  }

  /**
   * Updates an authorized orgs desc. The long-running operation from this RPC
   * has a successful status after the authorized orgs desc propagates to
   * long-lasting storage. If a authorized orgs desc contains errors, an error
   * response is returned for the first error encountered. Only the organization
   * list in `AuthorizedOrgsDesc` can be updated. The name, authorization_type,
   * asset_type and authorization_direction cannot be updated.
   *
   * @param name Resource name for the `AuthorizedOrgsDesc`. Format: `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`. The `authorized_orgs_desc` component must begin with a letter, followed by alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`, you cannot change its `name`.
   */
  async accessPoliciesAuthorizedOrgsDescsPatch(name: string, req: AuthorizedOrgsDesc, opts: AccessPoliciesAuthorizedOrgsDescsPatchOptions = {}): Promise<Operation> {
    opts = serializeAccessPoliciesAuthorizedOrgsDescsPatchOptions(opts);
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
   * Creates an access policy. This method fails if the organization already
   * has an access policy. The long-running operation has a successful status
   * after the access policy propagates to long-lasting storage. Syntactic and
   * basic semantic errors are returned in `metadata` as a BadRequest proto.
   *
   */
  async accessPoliciesCreate(req: AccessPolicy): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/accessPolicies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an access policy based on the resource name. The long-running
   * operation has a successful status after the access policy is removed from
   * long-lasting storage.
   *
   * @param name Required. Resource name for the access policy to delete. Format `accessPolicies/{policy_id}`
   */
  async accessPoliciesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns an access policy based on the name.
   *
   * @param name Required. Resource name for the access policy to get. Format `accessPolicies/{policy_id}`
   */
  async accessPoliciesGet(name: string): Promise<AccessPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessPolicy;
  }

  /**
   * Gets the IAM policy for the specified Access Context Manager access
   * policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async accessPoliciesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists all access policies in an organization.
   *
   */
  async accessPoliciesList(opts: AccessPoliciesListOptions = {}): Promise<ListAccessPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/accessPolicies`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAccessPoliciesResponse;
  }

  /**
   * Updates an access policy. The long-running operation from this RPC has a
   * successful status after the changes to the access policy propagate to
   * long-lasting storage.
   *
   * @param name Output only. Resource name of the `AccessPolicy`. Format: `accessPolicies/{access_policy}`
   */
  async accessPoliciesPatch(name: string, req: AccessPolicy, opts: AccessPoliciesPatchOptions = {}): Promise<Operation> {
    opts = serializeAccessPoliciesPatchOptions(opts);
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
   * Commits the dry-run specification for all the service perimeters in an
   * access policy. A commit operation on a service perimeter involves copying
   * its `spec` field to the `status` field of the service perimeter. Only
   * service perimeters with `use_explicit_dry_run_spec` field set to true are
   * affected by a commit operation. The long-running operation from this RPC
   * has a successful status after the dry-run specifications for all the
   * service perimeters have been committed. If a commit fails, it causes the
   * long-running operation to return an error response and the entire commit
   * operation is cancelled. When successful, the Operation.response field
   * contains CommitServicePerimetersResponse. The `dry_run` and the `spec`
   * fields are cleared after a successful commit operation.
   *
   * @param parent Required. Resource name for the parent Access Policy which owns all Service Perimeters in scope for the commit operation. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesServicePerimetersCommit(parent: string, req: CommitServicePerimetersRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/servicePerimeters:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a service perimeter. The long-running operation from this RPC has
   * a successful status after the service perimeter propagates to long-lasting
   * storage. If a service perimeter contains errors, an error response is
   * returned for the first error encountered.
   *
   * @param parent Required. Resource name for the access policy which owns this Service Perimeter. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesServicePerimetersCreate(parent: string, req: ServicePerimeter): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/servicePerimeters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a service perimeter based on the resource name. The long-running
   * operation from this RPC has a successful status after the service perimeter
   * is removed from long-lasting storage.
   *
   * @param name Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
   */
  async accessPoliciesServicePerimetersDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a service perimeter based on the resource name.
   *
   * @param name Required. Resource name for the Service Perimeter. Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
   */
  async accessPoliciesServicePerimetersGet(name: string): Promise<ServicePerimeter> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServicePerimeter;
  }

  /**
   * Lists all service perimeters for an access policy.
   *
   * @param parent Required. Resource name for the access policy to list Service Perimeters from. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesServicePerimetersList(parent: string, opts: AccessPoliciesServicePerimetersListOptions = {}): Promise<ListServicePerimetersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/servicePerimeters`);
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
    return data as ListServicePerimetersResponse;
  }

  /**
   * Updates a service perimeter. The long-running operation from this RPC has
   * a successful status after the service perimeter propagates to long-lasting
   * storage. If a service perimeter contains errors, an error response is
   * returned for the first error encountered.
   *
   * @param name Resource name for the `ServicePerimeter`. Format: `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The `service_perimeter` component must begin with a letter, followed by alphanumeric characters or `_`. After you create a `ServicePerimeter`, you cannot change its `name`.
   */
  async accessPoliciesServicePerimetersPatch(name: string, req: ServicePerimeter, opts: AccessPoliciesServicePerimetersPatchOptions = {}): Promise<Operation> {
    opts = serializeAccessPoliciesServicePerimetersPatchOptions(opts);
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
   * Replace all existing service perimeters in an access policy with the
   * service perimeters provided. This is done atomically. The long-running
   * operation from this RPC has a successful status after all replacements
   * propagate to long-lasting storage. Replacements containing errors result in
   * an error response for the first error encountered. Upon an error,
   * replacement are cancelled and existing service perimeters are not affected.
   * The Operation.response field contains ReplaceServicePerimetersResponse.
   *
   * @param parent Required. Resource name for the access policy which owns these Service Perimeters. Format: `accessPolicies/{policy_id}`
   */
  async accessPoliciesServicePerimetersReplaceAll(parent: string, req: ReplaceServicePerimetersRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/servicePerimeters:replaceAll`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Returns the IAM permissions that the caller has on the specified Access
   * Context Manager resource. The resource can be an AccessPolicy, AccessLevel,
   * or ServicePerimeter. This method does not support other resources.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async accessPoliciesServicePerimetersTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Sets the IAM policy for the specified Access Context Manager access
   * policy. This method replaces the existing IAM policy on the access policy.
   * The IAM policy controls the set of users who can perform specific
   * operations on the Access Context Manager access policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async accessPoliciesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns the IAM permissions that the caller has on the specified Access
   * Context Manager resource. The resource can be an AccessPolicy, AccessLevel,
   * or ServicePerimeter. This method does not support other resources.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async accessPoliciesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async operationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
  async operationsDelete(name: string): Promise<Empty> {
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
  async operationsGet(name: string): Promise<Operation> {
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
  async operationsList(name: string, opts: OperationsListOptions = {}): Promise<ListOperationsResponse> {
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
   * Creates a GcpUserAccessBinding. If the client specifies a name, the server
   * ignores it. Fails if a resource already exists with the same group_key.
   * Completion of this long-running operation does not necessarily signify that
   * the new binding is deployed onto all affected users, which may take more
   * time.
   *
   * @param parent Required. Example: "organizations/256"
   */
  async organizationsGcpUserAccessBindingsCreate(parent: string, req: GcpUserAccessBinding): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gcpUserAccessBindings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a GcpUserAccessBinding. Completion of this long-running operation
   * does not necessarily signify that the binding deletion is deployed onto all
   * affected users, which may take more time.
   *
   * @param name Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"
   */
  async organizationsGcpUserAccessBindingsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the GcpUserAccessBinding with the given name.
   *
   * @param name Required. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"
   */
  async organizationsGcpUserAccessBindingsGet(name: string): Promise<GcpUserAccessBinding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GcpUserAccessBinding;
  }

  /**
   * Lists all GcpUserAccessBindings for a Google Cloud organization.
   *
   * @param parent Required. Example: "organizations/256"
   */
  async organizationsGcpUserAccessBindingsList(parent: string, opts: OrganizationsGcpUserAccessBindingsListOptions = {}): Promise<ListGcpUserAccessBindingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gcpUserAccessBindings`);
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
    return data as ListGcpUserAccessBindingsResponse;
  }

  /**
   * Updates a GcpUserAccessBinding. Completion of this long-running operation
   * does not necessarily signify that the changed binding is deployed onto all
   * affected users, which may take more time.
   *
   * @param name Immutable. Assigned by the server during creation. The last segment has an arbitrary length and has only URI unreserved characters (as defined by [RFC 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should not be specified by the client during creation. Example: "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"
   */
  async organizationsGcpUserAccessBindingsPatch(name: string, req: GcpUserAccessBinding, opts: OrganizationsGcpUserAccessBindingsPatchOptions = {}): Promise<Operation> {
    opts = serializeOrganizationsGcpUserAccessBindingsPatchOptions(opts);
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
}

/**
 * Metadata of Access Context Manager's Long Running Operations.
 */
export interface AccessContextManagerOperationMetadata {
}

/**
 * An `AccessLevel` is a label that can be applied to requests to Google Cloud
 * services, along with a list of requirements necessary for the label to be
 * applied.
 */
export interface AccessLevel {
  /**
   * A `BasicLevel` composed of `Conditions`.
   */
  basic?: BasicLevel;
  /**
   * A `CustomLevel` written in the Common Expression Language.
   */
  custom?: CustomLevel;
  /**
   * Description of the `AccessLevel` and its use. Does not affect behavior.
   */
  description?: string;
  /**
   * Resource name for the `AccessLevel`. Format:
   * `accessPolicies/{access_policy}/accessLevels/{access_level}`. The
   * `access_level` component must begin with a letter, followed by alphanumeric
   * characters or `_`. Its maximum length is 50 characters. After you create an
   * `AccessLevel`, you cannot change its `name`.
   */
  name?: string;
  /**
   * Human readable title. Must be unique within the Policy.
   */
  title?: string;
}

/**
 * Additional options for AccessContextManager#accessPoliciesAccessLevelsGet.
 */
export interface AccessPoliciesAccessLevelsGetOptions {
  /**
   * Whether to return `BasicLevels` in the Cloud Common Expression Language
   * rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels
   * are returned as `BasicLevels` or `CustomLevels` based on how they were
   * created. If set to CEL, all Access Levels are returned as `CustomLevels`.
   * In the CEL case, `BasicLevels` are translated to equivalent `CustomLevels`.
   */
  accessLevelFormat?:  | "LEVEL_FORMAT_UNSPECIFIED" | "AS_DEFINED" | "CEL";
}

/**
 * Additional options for AccessContextManager#accessPoliciesAccessLevelsList.
 */
export interface AccessPoliciesAccessLevelsListOptions {
  /**
   * Whether to return `BasicLevels` in the Cloud Common Expression language,
   * as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning
   * `AccessLevels` in the format they were defined.
   */
  accessLevelFormat?:  | "LEVEL_FORMAT_UNSPECIFIED" | "AS_DEFINED" | "CEL";
  /**
   * Number of Access Levels to include in the list. Default 100.
   */
  pageSize?: number;
  /**
   * Next page token for the next batch of Access Level instances. Defaults to
   * the first page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AccessContextManager#accessPoliciesAccessLevelsPatch.
 */
export interface AccessPoliciesAccessLevelsPatchOptions {
  /**
   * Required. Mask to control which fields get updated. Must be non-empty.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccessPoliciesAccessLevelsPatchOptions(data: any): AccessPoliciesAccessLevelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccessPoliciesAccessLevelsPatchOptions(data: any): AccessPoliciesAccessLevelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * AccessContextManager#accessPoliciesAuthorizedOrgsDescsList.
 */
export interface AccessPoliciesAuthorizedOrgsDescsListOptions {
  /**
   * Number of Authorized Orgs Descs to include in the list. Default 100.
   */
  pageSize?: number;
  /**
   * Next page token for the next batch of Authorized Orgs Desc instances.
   * Defaults to the first page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AccessContextManager#accessPoliciesAuthorizedOrgsDescsPatch.
 */
export interface AccessPoliciesAuthorizedOrgsDescsPatchOptions {
  /**
   * Required. Mask to control which fields get updated. Must be non-empty.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccessPoliciesAuthorizedOrgsDescsPatchOptions(data: any): AccessPoliciesAuthorizedOrgsDescsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccessPoliciesAuthorizedOrgsDescsPatchOptions(data: any): AccessPoliciesAuthorizedOrgsDescsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AccessContextManager#accessPoliciesList.
 */
export interface AccessPoliciesListOptions {
  /**
   * Number of AccessPolicy instances to include in the list. Default 100.
   */
  pageSize?: number;
  /**
   * Next page token for the next batch of AccessPolicy instances. Defaults to
   * the first page of results.
   */
  pageToken?: string;
  /**
   * Required. Resource name for the container to list AccessPolicy instances
   * from. Format: `organizations/{org_id}`
   */
  parent?: string;
}

/**
 * Additional options for AccessContextManager#accessPoliciesPatch.
 */
export interface AccessPoliciesPatchOptions {
  /**
   * Required. Mask to control which fields get updated. Must be non-empty.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccessPoliciesPatchOptions(data: any): AccessPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccessPoliciesPatchOptions(data: any): AccessPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * AccessContextManager#accessPoliciesServicePerimetersList.
 */
export interface AccessPoliciesServicePerimetersListOptions {
  /**
   * Number of Service Perimeters to include in the list. Default 100.
   */
  pageSize?: number;
  /**
   * Next page token for the next batch of Service Perimeter instances.
   * Defaults to the first page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AccessContextManager#accessPoliciesServicePerimetersPatch.
 */
export interface AccessPoliciesServicePerimetersPatchOptions {
  /**
   * Required. Mask to control which fields get updated. Must be non-empty.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccessPoliciesServicePerimetersPatchOptions(data: any): AccessPoliciesServicePerimetersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccessPoliciesServicePerimetersPatchOptions(data: any): AccessPoliciesServicePerimetersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * `AccessPolicy` is a container for `AccessLevels` (which define the necessary
 * attributes to use Google Cloud services) and `ServicePerimeters` (which
 * define regions of services able to freely pass data within a perimeter). An
 * access policy is globally visible within an organization, and the
 * restrictions it specifies apply to all projects within an organization.
 */
export interface AccessPolicy {
  /**
   * Output only. An opaque identifier for the current version of the
   * `AccessPolicy`. This will always be a strongly validated etag, meaning that
   * two Access Polices will be identical if and only if their etags are
   * identical. Clients should not expect this to be in any specific format.
   */
  etag?: string;
  /**
   * Output only. Resource name of the `AccessPolicy`. Format:
   * `accessPolicies/{access_policy}`
   */
  name?: string;
  /**
   * Required. The parent of this `AccessPolicy` in the Cloud Resource
   * Hierarchy. Currently immutable once created. Format:
   * `organizations/{organization_id}`
   */
  parent?: string;
  /**
   * The scopes of a policy define which resources an ACM policy can restrict,
   * and where ACM resources can be referenced. For example, a policy with
   * scopes=["folders/123"] has the following behavior: - vpcsc perimeters can
   * only restrict projects within folders/123 - access levels can only be
   * referenced by resources within folders/123. If empty, there are no
   * limitations on which resources can be restricted by an ACM policy, and
   * there are no limitations on where ACM resources can be referenced. Only one
   * policy can include a given scope (attempting to create a second policy
   * which includes "folders/123" will result in an error). Currently, scopes
   * cannot be modified after a policy is created. Currently, policies can only
   * have a single scope. Format: list of `folders/{folder_number}` or
   * `projects/{project_number}`
   */
  scopes?: string[];
  /**
   * Required. Human readable title. Does not affect behavior.
   */
  title?: string;
}

/**
 * Identification for an API Operation.
 */
export interface ApiOperation {
  /**
   * API methods or permissions to allow. Method or permission must belong to
   * the service specified by `service_name` field. A single MethodSelector
   * entry with `*` specified for the `method` field will allow all methods AND
   * permissions for the service specified in `service_name`.
   */
  methodSelectors?: MethodSelector[];
  /**
   * The name of the API whose methods or permissions the IngressPolicy or
   * EgressPolicy want to allow. A single ApiOperation with `service_name` field
   * set to `*` will allow all methods AND permissions for all services.
   */
  serviceName?: string;
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
 * `AuthorizedOrgsDesc` contains data for an organization's authorization
 * policy.
 */
export interface AuthorizedOrgsDesc {
  /**
   * The asset type of this authorized orgs desc. Valid values are
   * `ASSET_TYPE_DEVICE`, and `ASSET_TYPE_CREDENTIAL_STRENGTH`.
   */
  assetType?:  | "ASSET_TYPE_UNSPECIFIED" | "ASSET_TYPE_DEVICE" | "ASSET_TYPE_CREDENTIAL_STRENGTH";
  /**
   * The direction of the authorization relationship between this organization
   * and the organizations listed in the `orgs` field. The valid values for this
   * field include the following: `AUTHORIZATION_DIRECTION_FROM`: Allows this
   * organization to evaluate traffic in the organizations listed in the `orgs`
   * field. `AUTHORIZATION_DIRECTION_TO`: Allows the organizations listed in the
   * `orgs` field to evaluate the traffic in this organization. For the
   * authorization relationship to take effect, all of the organizations must
   * authorize and specify the appropriate relationship direction. For example,
   * if organization A authorized organization B and C to evaluate its traffic,
   * by specifying `AUTHORIZATION_DIRECTION_TO` as the authorization direction,
   * organizations B and C must specify `AUTHORIZATION_DIRECTION_FROM` as the
   * authorization direction in their `AuthorizedOrgsDesc` resource.
   */
  authorizationDirection?:  | "AUTHORIZATION_DIRECTION_UNSPECIFIED" | "AUTHORIZATION_DIRECTION_TO" | "AUTHORIZATION_DIRECTION_FROM";
  /**
   * A granular control type for authorization levels. Valid value is
   * `AUTHORIZATION_TYPE_TRUST`.
   */
  authorizationType?:  | "AUTHORIZATION_TYPE_UNSPECIFIED" | "AUTHORIZATION_TYPE_TRUST";
  /**
   * Resource name for the `AuthorizedOrgsDesc`. Format:
   * `accessPolicies/{access_policy}/authorizedOrgsDescs/{authorized_orgs_desc}`.
   * The `authorized_orgs_desc` component must begin with a letter, followed by
   * alphanumeric characters or `_`. After you create an `AuthorizedOrgsDesc`,
   * you cannot change its `name`.
   */
  name?: string;
  /**
   * The list of organization ids in this AuthorizedOrgsDesc. Format:
   * `organizations/` Example: `organizations/123456`
   */
  orgs?: string[];
}

/**
 * `BasicLevel` is an `AccessLevel` using a set of recommended features.
 */
export interface BasicLevel {
  /**
   * How the `conditions` list should be combined to determine if a request is
   * granted this `AccessLevel`. If AND is used, each `Condition` in
   * `conditions` must be satisfied for the `AccessLevel` to be applied. If OR
   * is used, at least one `Condition` in `conditions` must be satisfied for the
   * `AccessLevel` to be applied. Default behavior is AND.
   */
  combiningFunction?:  | "AND" | "OR";
  /**
   * Required. A list of requirements for the `AccessLevel` to be granted.
   */
  conditions?: Condition[];
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
 * A request to commit dry-run specs in all Service Perimeters belonging to an
 * Access Policy.
 */
export interface CommitServicePerimetersRequest {
  /**
   * Optional. The etag for the version of the Access Policy that this commit
   * operation is to be performed on. If, at the time of commit, the etag for
   * the Access Policy stored in Access Context Manager is different from the
   * specified etag, then the commit operation will not be performed and the
   * call will fail. This field is not required. If etag is not provided, the
   * operation will be performed as if a valid etag is provided.
   */
  etag?: string;
}

/**
 * A response to CommitServicePerimetersRequest. This will be put inside of
 * Operation.response field.
 */
export interface CommitServicePerimetersResponse {
  /**
   * List of all the Service Perimeter instances in the Access Policy.
   */
  servicePerimeters?: ServicePerimeter[];
}

/**
 * A condition necessary for an `AccessLevel` to be granted. The Condition is
 * an AND over its fields. So a Condition is true if: 1) the request IP is from
 * one of the listed subnetworks AND 2) the originating device complies with the
 * listed device policy AND 3) all listed access levels are granted AND 4) the
 * request was sent at a time allowed by the DateTimeRestriction.
 */
export interface Condition {
  /**
   * Device specific restrictions, all restrictions must hold for the Condition
   * to be true. If not specified, all devices are allowed.
   */
  devicePolicy?: DevicePolicy;
  /**
   * CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for
   * a CIDR IP address block, the specified IP address portion must be properly
   * truncated (i.e. all the host bits must be zero) or the input is considered
   * malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is
   * not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas
   * "2001:db8::1/32" is not. The originating IP of a request must be in one of
   * the listed subnets in order for this Condition to be true. If empty, all IP
   * addresses are allowed.
   */
  ipSubnetworks?: string[];
  /**
   * The request must be made by one of the provided user or service accounts.
   * Groups are not supported. Syntax: `user:{emailid}`
   * `serviceAccount:{emailid}` If not specified, a request may come from any
   * user.
   */
  members?: string[];
  /**
   * Whether to negate the Condition. If true, the Condition becomes a NAND
   * over its non-empty fields, each field must be false for the Condition
   * overall to be satisfied. Defaults to false.
   */
  negate?: boolean;
  /**
   * The request must originate from one of the provided countries/regions.
   * Must be valid ISO 3166-1 alpha-2 codes.
   */
  regions?: string[];
  /**
   * A list of other access levels defined in the same `Policy`, referenced by
   * resource name. Referencing an `AccessLevel` which does not exist is an
   * error. All access levels listed must be granted for the Condition to be
   * true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"`
   */
  requiredAccessLevels?: string[];
}

/**
 * `CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language
 * to represent the necessary conditions for the level to apply to a request.
 * See CEL spec at: https://github.com/google/cel-spec
 */
export interface CustomLevel {
  /**
   * Required. A Cloud CEL expression evaluating to a boolean.
   */
  expr?: Expr;
}

/**
 * `DevicePolicy` specifies device specific restrictions necessary to acquire a
 * given access level. A `DevicePolicy` specifies requirements for requests from
 * devices to be granted access levels, it does not do any enforcement on the
 * device. `DevicePolicy` acts as an AND over all specified fields, and each
 * repeated field is an OR over its elements. Any unset fields are ignored. For
 * example, if the proto is { os_type : DESKTOP_WINDOWS, os_type :
 * DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will be
 * true for requests originating from encrypted Linux desktops and encrypted
 * Windows desktops.
 */
export interface DevicePolicy {
  /**
   * Allowed device management levels, an empty list allows all management
   * levels.
   */
  allowedDeviceManagementLevels?:  | "MANAGEMENT_UNSPECIFIED" | "NONE" | "BASIC" | "COMPLETE"[];
  /**
   * Allowed encryptions statuses, an empty list allows all statuses.
   */
  allowedEncryptionStatuses?:  | "ENCRYPTION_UNSPECIFIED" | "ENCRYPTION_UNSUPPORTED" | "UNENCRYPTED" | "ENCRYPTED"[];
  /**
   * Allowed OS versions, an empty list allows all types and all versions.
   */
  osConstraints?: OsConstraint[];
  /**
   * Whether the device needs to be approved by the customer admin.
   */
  requireAdminApproval?: boolean;
  /**
   * Whether the device needs to be corp owned.
   */
  requireCorpOwned?: boolean;
  /**
   * Whether or not screenlock is required for the DevicePolicy to be true.
   * Defaults to `false`.
   */
  requireScreenlock?: boolean;
}

/**
 * Defines the conditions under which an EgressPolicy matches a request.
 * Conditions based on information about the source of the request. Note that if
 * the destination of the request is also protected by a ServicePerimeter, then
 * that ServicePerimeter must have an IngressPolicy which allows access in order
 * for this request to succeed.
 */
export interface EgressFrom {
  /**
   * A list of identities that are allowed access through this [EgressPolicy].
   * Should be in the format of email address. The email address should
   * represent individual user or service account only.
   */
  identities?: string[];
  /**
   * Specifies the type of identities that are allowed access to outside the
   * perimeter. If left unspecified, then members of `identities` field will be
   * allowed access.
   */
  identityType?:  | "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT";
}

/**
 * Policy for egress from perimeter. EgressPolicies match requests based on
 * `egress_from` and `egress_to` stanzas. For an EgressPolicy to match, both
 * `egress_from` and `egress_to` stanzas must be matched. If an EgressPolicy
 * matches a request, the request is allowed to span the ServicePerimeter
 * boundary. For example, an EgressPolicy can be used to allow VMs on networks
 * within the ServicePerimeter to access a defined set of projects outside the
 * perimeter in certain contexts (e.g. to read data from a Cloud Storage bucket
 * or query against a BigQuery dataset). EgressPolicies are concerned with the
 * *resources* that a request relates as well as the API services and API
 * actions being used. They do not related to the direction of data movement.
 * More detailed documentation for this concept can be found in the descriptions
 * of EgressFrom and EgressTo.
 */
export interface EgressPolicy {
  /**
   * Defines conditions on the source of a request causing this EgressPolicy to
   * apply.
   */
  egressFrom?: EgressFrom;
  /**
   * Defines the conditions on the ApiOperation and destination resources that
   * cause this EgressPolicy to apply.
   */
  egressTo?: EgressTo;
}

/**
 * Defines the conditions under which an EgressPolicy matches a request.
 * Conditions are based on information about the ApiOperation intended to be
 * performed on the `resources` specified. Note that if the destination of the
 * request is also protected by a ServicePerimeter, then that ServicePerimeter
 * must have an IngressPolicy which allows access in order for this request to
 * succeed. The request must match `operations` AND `resources` fields in order
 * to be allowed egress out of the perimeter.
 */
export interface EgressTo {
  /**
   * A list of external resources that are allowed to be accessed. Only AWS and
   * Azure resources are supported. For Amazon S3, the supported format is
   * s3://BUCKET_NAME. For Azure Storage, the supported format is
   * azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches
   * if it contains an external resource in this list (Example:
   * s3://bucket/path). Currently '*' is not allowed.
   */
  externalResources?: string[];
  /**
   * A list of ApiOperations allowed to be performed by the sources specified
   * in the corresponding EgressFrom. A request matches if it uses an
   * operation/service in this list.
   */
  operations?: ApiOperation[];
  /**
   * A list of resources, currently only projects in the form `projects/`, that
   * are allowed to be accessed by sources defined in the corresponding
   * EgressFrom. A request matches if it contains a resource in this list. If
   * `*` is specified for `resources`, then this EgressTo rule will authorize
   * access to all resources outside the perimeter.
   */
  resources?: string[];
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
 * Restricts access to Cloud Console and Google Cloud APIs for a set of users
 * using Context-Aware Access.
 */
export interface GcpUserAccessBinding {
  /**
   * Required. Access level that a user must have to be granted access. Only
   * one access level is supported, not multiple. This repeated field must have
   * exactly one element. Example:
   * "accessPolicies/9522/accessLevels/device_trusted"
   */
  accessLevels?: string[];
  /**
   * Required. Immutable. Google Group id whose members are subject to this
   * binding's restrictions. See "id" in the [G Suite Directory API's Groups
   * resource]
   * (https://developers.google.com/admin-sdk/directory/v1/reference/groups#resource).
   * If a group's email address/alias is changed, this resource will continue to
   * point at the changed group. This field does not accept group email
   * addresses or aliases. Example: "01d520gv4vjcrht"
   */
  groupKey?: string;
  /**
   * Immutable. Assigned by the server during creation. The last segment has an
   * arbitrary length and has only URI unreserved characters (as defined by [RFC
   * 3986 Section 2.3](https://tools.ietf.org/html/rfc3986#section-2.3)). Should
   * not be specified by the client during creation. Example:
   * "organizations/256/gcpUserAccessBindings/b3-BhcX_Ud5N"
   */
  name?: string;
}

/**
 * Currently, a completed operation means nothing. In the future, this metadata
 * and a completed operation may indicate that the binding has taken effect and
 * is affecting access decisions for all users.
 */
export interface GcpUserAccessBindingOperationMetadata {
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
 * Defines the conditions under which an IngressPolicy matches a request.
 * Conditions are based on information about the source of the request. The
 * request must satisfy what is defined in `sources` AND identity related fields
 * in order to match.
 */
export interface IngressFrom {
  /**
   * A list of identities that are allowed access through this ingress policy.
   * Should be in the format of email address. The email address should
   * represent individual user or service account only.
   */
  identities?: string[];
  /**
   * Specifies the type of identities that are allowed access from outside the
   * perimeter. If left unspecified, then members of `identities` field will be
   * allowed access.
   */
  identityType?:  | "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT";
  /**
   * Sources that this IngressPolicy authorizes access from.
   */
  sources?: IngressSource[];
}

/**
 * Policy for ingress into ServicePerimeter. IngressPolicies match requests
 * based on `ingress_from` and `ingress_to` stanzas. For an ingress policy to
 * match, both the `ingress_from` and `ingress_to` stanzas must be matched. If
 * an IngressPolicy matches a request, the request is allowed through the
 * perimeter boundary from outside the perimeter. For example, access from the
 * internet can be allowed either based on an AccessLevel or, for traffic hosted
 * on Google Cloud, the project of the source network. For access from private
 * networks, using the project of the hosting network is required. Individual
 * ingress policies can be limited by restricting which services and/or actions
 * they match using the `ingress_to` field.
 */
export interface IngressPolicy {
  /**
   * Defines the conditions on the source of a request causing this
   * IngressPolicy to apply.
   */
  ingressFrom?: IngressFrom;
  /**
   * Defines the conditions on the ApiOperation and request destination that
   * cause this IngressPolicy to apply.
   */
  ingressTo?: IngressTo;
}

/**
 * The source that IngressPolicy authorizes access from.
 */
export interface IngressSource {
  /**
   * An AccessLevel resource name that allow resources within the
   * ServicePerimeters to be accessed from the internet. AccessLevels listed
   * must be in the same policy as this ServicePerimeter. Referencing a
   * nonexistent AccessLevel will cause an error. If no AccessLevel names are
   * listed, resources within the perimeter can only be accessed via Google
   * Cloud calls with request origins within the perimeter. Example:
   * `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is
   * specified for `access_level`, then all IngressSources will be allowed.
   */
  accessLevel?: string;
  /**
   * A Google Cloud resource that is allowed to ingress the perimeter. Requests
   * from these resources will be allowed to access perimeter data. Currently
   * only projects and VPCs are allowed. Project format:
   * `projects/{project_number}` VPC network format:
   * `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.
   * The project may be in any Google Cloud organization, not just the
   * organization that the perimeter is defined in. `*` is not allowed, the case
   * of allowing all Google Cloud resources only is not supported.
   */
  resource?: string;
}

/**
 * Defines the conditions under which an IngressPolicy matches a request.
 * Conditions are based on information about the ApiOperation intended to be
 * performed on the target resource of the request. The request must satisfy
 * what is defined in `operations` AND `resources` in order to match.
 */
export interface IngressTo {
  /**
   * A list of ApiOperations allowed to be performed by the sources specified
   * in corresponding IngressFrom in this ServicePerimeter.
   */
  operations?: ApiOperation[];
  /**
   * A list of resources, currently only projects in the form `projects/`,
   * protected by this ServicePerimeter that are allowed to be accessed by
   * sources defined in the corresponding IngressFrom. If a single `*` is
   * specified, then access to all resources inside the perimeter are allowed.
   */
  resources?: string[];
}

/**
 * A response to `ListAccessLevelsRequest`.
 */
export interface ListAccessLevelsResponse {
  /**
   * List of the Access Level instances.
   */
  accessLevels?: AccessLevel[];
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
}

/**
 * A response to `ListAccessPoliciesRequest`.
 */
export interface ListAccessPoliciesResponse {
  /**
   * List of the AccessPolicy instances.
   */
  accessPolicies?: AccessPolicy[];
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
}

/**
 * A response to `ListAuthorizedOrgsDescsRequest`.
 */
export interface ListAuthorizedOrgsDescsResponse {
  /**
   * List of all the Authorized Orgs Desc instances.
   */
  authorizedOrgsDescs?: AuthorizedOrgsDesc[];
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
}

/**
 * Response of ListGcpUserAccessBindings.
 */
export interface ListGcpUserAccessBindingsResponse {
  /**
   * GcpUserAccessBinding
   */
  gcpUserAccessBindings?: GcpUserAccessBinding[];
  /**
   * Token to get the next page of items. If blank, there are no more items.
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
 * A response to `ListServicePerimetersRequest`.
 */
export interface ListServicePerimetersResponse {
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
  /**
   * List of the Service Perimeter instances.
   */
  servicePerimeters?: ServicePerimeter[];
}

/**
 * An allowed method or permission of a service specified in ApiOperation.
 */
export interface MethodSelector {
  /**
   * Value for `method` should be a valid method name for the corresponding
   * `service_name` in ApiOperation. If `*` used as value for `method`, then ALL
   * methods and permissions are allowed.
   */
  method?: string;
  /**
   * Value for `permission` should be a valid Cloud IAM permission for the
   * corresponding `service_name` in ApiOperation.
   */
  permission?: string;
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
 * Additional options for AccessContextManager#operationsList.
 */
export interface OperationsListOptions {
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
 * AccessContextManager#organizationsGcpUserAccessBindingsList.
 */
export interface OrganizationsGcpUserAccessBindingsListOptions {
  /**
   * Optional. Maximum number of items to return. The server may return fewer
   * items. If left blank, the server may return any number of items.
   */
  pageSize?: number;
  /**
   * Optional. If left blank, returns the first page. To enumerate all items,
   * use the next_page_token from your previous list operation.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AccessContextManager#organizationsGcpUserAccessBindingsPatch.
 */
export interface OrganizationsGcpUserAccessBindingsPatchOptions {
  /**
   * Required. Only the fields specified in this mask are updated. Because name
   * and group_key cannot be changed, update_mask is required and must always
   * be: update_mask { paths: "access_levels" }
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsGcpUserAccessBindingsPatchOptions(data: any): OrganizationsGcpUserAccessBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsGcpUserAccessBindingsPatchOptions(data: any): OrganizationsGcpUserAccessBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A restriction on the OS type and version of devices making requests.
 */
export interface OsConstraint {
  /**
   * The minimum allowed OS version. If not set, any version of this OS
   * satisfies the constraint. Format: `"major.minor.patch"`. Examples:
   * `"10.5.301"`, `"9.2.1"`.
   */
  minimumVersion?: string;
  /**
   * Required. The allowed OS type.
   */
  osType?:  | "OS_UNSPECIFIED" | "DESKTOP_MAC" | "DESKTOP_WINDOWS" | "DESKTOP_LINUX" | "DESKTOP_CHROME_OS" | "ANDROID" | "IOS";
  /**
   * Only allows requests from devices with a verified Chrome OS. Verifications
   * includes requirements that the device is enterprise-managed, conformant to
   * domain policies, and the caller has permission to call the API targeted by
   * the request.
   */
  requireVerifiedChromeOs?: boolean;
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
 * A request to replace all existing Access Levels in an Access Policy with the
 * Access Levels provided. This is done atomically.
 */
export interface ReplaceAccessLevelsRequest {
  /**
   * Required. The desired Access Levels that should replace all existing
   * Access Levels in the Access Policy.
   */
  accessLevels?: AccessLevel[];
  /**
   * Optional. The etag for the version of the Access Policy that this replace
   * operation is to be performed on. If, at the time of replace, the etag for
   * the Access Policy stored in Access Context Manager is different from the
   * specified etag, then the replace operation will not be performed and the
   * call will fail. This field is not required. If etag is not provided, the
   * operation will be performed as if a valid etag is provided.
   */
  etag?: string;
}

/**
 * A response to ReplaceAccessLevelsRequest. This will be put inside of
 * Operation.response field.
 */
export interface ReplaceAccessLevelsResponse {
  /**
   * List of the Access Level instances.
   */
  accessLevels?: AccessLevel[];
}

/**
 * A request to replace all existing Service Perimeters in an Access Policy
 * with the Service Perimeters provided. This is done atomically.
 */
export interface ReplaceServicePerimetersRequest {
  /**
   * Optional. The etag for the version of the Access Policy that this replace
   * operation is to be performed on. If, at the time of replace, the etag for
   * the Access Policy stored in Access Context Manager is different from the
   * specified etag, then the replace operation will not be performed and the
   * call will fail. This field is not required. If etag is not provided, the
   * operation will be performed as if a valid etag is provided.
   */
  etag?: string;
  /**
   * Required. The desired Service Perimeters that should replace all existing
   * Service Perimeters in the Access Policy.
   */
  servicePerimeters?: ServicePerimeter[];
}

/**
 * A response to ReplaceServicePerimetersRequest. This will be put inside of
 * Operation.response field.
 */
export interface ReplaceServicePerimetersResponse {
  /**
   * List of the Service Perimeter instances.
   */
  servicePerimeters?: ServicePerimeter[];
}

/**
 * `ServicePerimeter` describes a set of Google Cloud resources which can
 * freely import and export data amongst themselves, but not export outside of
 * the `ServicePerimeter`. If a request with a source within this
 * `ServicePerimeter` has a target outside of the `ServicePerimeter`, the
 * request will be blocked. Otherwise the request is allowed. There are two
 * types of Service Perimeter - Regular and Bridge. Regular Service Perimeters
 * cannot overlap, a single Google Cloud project or VPC network can only belong
 * to a single regular Service Perimeter. Service Perimeter Bridges can contain
 * only Google Cloud projects as members, a single Google Cloud project may
 * belong to multiple Service Perimeter Bridges.
 */
export interface ServicePerimeter {
  /**
   * Description of the `ServicePerimeter` and its use. Does not affect
   * behavior.
   */
  description?: string;
  /**
   * Resource name for the `ServicePerimeter`. Format:
   * `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The
   * `service_perimeter` component must begin with a letter, followed by
   * alphanumeric characters or `_`. After you create a `ServicePerimeter`, you
   * cannot change its `name`.
   */
  name?: string;
  /**
   * Perimeter type indicator. A single project or VPC network is allowed to be
   * a member of single regular perimeter, but multiple service perimeter
   * bridges. A project cannot be a included in a perimeter bridge without being
   * included in regular perimeter. For perimeter bridges, the restricted
   * service list as well as access level lists must be empty.
   */
  perimeterType?:  | "PERIMETER_TYPE_REGULAR" | "PERIMETER_TYPE_BRIDGE";
  /**
   * Proposed (or dry run) ServicePerimeter configuration. This configuration
   * allows to specify and test ServicePerimeter configuration without enforcing
   * actual access restrictions. Only allowed to be set when the
   * "use_explicit_dry_run_spec" flag is set.
   */
  spec?: ServicePerimeterConfig;
  /**
   * Current ServicePerimeter configuration. Specifies sets of resources,
   * restricted services and access levels that determine perimeter content and
   * boundaries.
   */
  status?: ServicePerimeterConfig;
  /**
   * Human readable title. Must be unique within the Policy.
   */
  title?: string;
  /**
   * Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly
   * exists for all Service Perimeters, and that spec is identical to the status
   * for those Service Perimeters. When this flag is set, it inhibits the
   * generation of the implicit spec, thereby allowing the user to explicitly
   * provide a configuration ("spec") to use in a dry-run version of the Service
   * Perimeter. This allows the user to test changes to the enforced config
   * ("status") without actually enforcing them. This testing is done through
   * analyzing the differences between currently enforced and suggested
   * restrictions. use_explicit_dry_run_spec must bet set to True if any of the
   * fields in the spec are set to non-default values.
   */
  useExplicitDryRunSpec?: boolean;
}

/**
 * `ServicePerimeterConfig` specifies a set of Google Cloud resources that
 * describe specific Service Perimeter configuration.
 */
export interface ServicePerimeterConfig {
  /**
   * A list of `AccessLevel` resource names that allow resources within the
   * `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed
   * must be in the same policy as this `ServicePerimeter`. Referencing a
   * nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are
   * listed, resources within the perimeter can only be accessed via Google
   * Cloud calls with request origins within the perimeter. Example:
   * `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter
   * Bridge, must be empty.
   */
  accessLevels?: string[];
  /**
   * List of EgressPolicies to apply to the perimeter. A perimeter may have
   * multiple EgressPolicies, each of which is evaluated separately. Access is
   * granted if any EgressPolicy grants it. Must be empty for a perimeter
   * bridge.
   */
  egressPolicies?: EgressPolicy[];
  /**
   * List of IngressPolicies to apply to the perimeter. A perimeter may have
   * multiple IngressPolicies, each of which is evaluated separately. Access is
   * granted if any Ingress Policy grants it. Must be empty for a perimeter
   * bridge.
   */
  ingressPolicies?: IngressPolicy[];
  /**
   * A list of Google Cloud resources that are inside of the service perimeter.
   * Currently only projects and VPCs are allowed. Project format:
   * `projects/{project_number}` VPC network format:
   * `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.
   */
  resources?: string[];
  /**
   * Google Cloud services that are subject to the Service Perimeter
   * restrictions. For example, if `storage.googleapis.com` is specified, access
   * to the storage buckets inside the perimeter must meet the perimeter's
   * access restrictions.
   */
  restrictedServices?: string[];
  /**
   * Configuration for APIs allowed within Perimeter.
   */
  vpcAccessibleServices?: VpcAccessibleServices;
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
 * Specifies how APIs are allowed to communicate within the Service Perimeter.
 */
export interface VpcAccessibleServices {
  /**
   * The list of APIs usable within the Service Perimeter. Must be empty unless
   * 'enable_restriction' is True. You can specify a list of individual
   * services, as well as include the 'RESTRICTED-SERVICES' value, which
   * automatically includes all of the services protected by the perimeter.
   */
  allowedServices?: string[];
  /**
   * Whether to restrict API calls within the Service Perimeter to the list of
   * APIs specified in 'allowed_services'.
   */
  enableRestriction?: boolean;
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
