// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * GKE Hub API Client for Deno
 * ===========================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class GKEHub {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gkehub.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Adds a new Feature.
   *
   * @param parent Required. The parent (project and location) where the Feature will be created. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsFeaturesCreate(parent: string, req: Feature, opts: ProjectsLocationsFeaturesCreateOptions = {}): Promise<Operation> {
    req = serializeFeature(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/features`);
    if (opts.featureId !== undefined) {
      url.searchParams.append("featureId", String(opts.featureId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Removes a Feature.
   *
   * @param name Required. The Feature resource name in the format `projects/*\/locations/*\/features/*`.
   */
  async projectsLocationsFeaturesDelete(name: string, opts: ProjectsLocationsFeaturesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Feature.
   *
   * @param name Required. The Feature resource name in the format `projects/*\/locations/*\/features/*`
   */
  async projectsLocationsFeaturesGet(name: string): Promise<Feature> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFeature(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFeaturesGetIamPolicy(resource: string, opts: ProjectsLocationsFeaturesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Features in a given project and location.
   *
   * @param parent Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsFeaturesList(parent: string, opts: ProjectsLocationsFeaturesListOptions = {}): Promise<ListFeaturesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/features`);
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
    return deserializeListFeaturesResponse(data);
  }

  /**
   * Updates an existing Feature.
   *
   * @param name Required. The Feature resource name in the format `projects/*\/locations/*\/features/*`.
   */
  async projectsLocationsFeaturesPatch(name: string, req: Feature, opts: ProjectsLocationsFeaturesPatchOptions = {}): Promise<Operation> {
    req = serializeFeature(req);
    opts = serializeProjectsLocationsFeaturesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFeaturesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsFeaturesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a MembershipBinding.
   *
   * @param parent Required. The parent (project and location) where the MembershipBinding will be created. Specified in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsBindingsCreate(parent: string, req: MembershipBinding, opts: ProjectsLocationsMembershipsBindingsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bindings`);
    if (opts.membershipBindingId !== undefined) {
      url.searchParams.append("membershipBindingId", String(opts.membershipBindingId));
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
   * Deletes a MembershipBinding.
   *
   * @param name Required. The MembershipBinding resource name in the format `projects/*\/locations/*\/memberships/*\/bindings/*`.
   */
  async projectsLocationsMembershipsBindingsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns the details of a MembershipBinding.
   *
   * @param name Required. The MembershipBinding resource name in the format `projects/*\/locations/*\/memberships/*\/bindings/*`.
   */
  async projectsLocationsMembershipsBindingsGet(name: string): Promise<MembershipBinding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MembershipBinding;
  }

  /**
   * Lists MembershipBindings.
   *
   * @param parent Required. The parent Membership for which the MembershipBindings will be listed. Specified in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsBindingsList(parent: string, opts: ProjectsLocationsMembershipsBindingsListOptions = {}): Promise<ListMembershipBindingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bindings`);
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
    return data as ListMembershipBindingsResponse;
  }

  /**
   * Updates a MembershipBinding.
   *
   * @param name The resource name for the membershipbinding itself `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}`
   */
  async projectsLocationsMembershipsBindingsPatch(name: string, req: MembershipBinding, opts: ProjectsLocationsMembershipsBindingsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsMembershipsBindingsPatchOptions(opts);
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
   * Creates a new Membership. **This is currently only supported for GKE
   * clusters on Google Cloud**. To register other clusters, follow the
   * instructions at
   * https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster.
   *
   * @param parent Required. The parent (project and location) where the Memberships will be created. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsMembershipsCreate(parent: string, req: Membership, opts: ProjectsLocationsMembershipsCreateOptions = {}): Promise<Operation> {
    req = serializeMembership(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships`);
    if (opts.membershipId !== undefined) {
      url.searchParams.append("membershipId", String(opts.membershipId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Removes a Membership. **This is currently only supported for GKE clusters
   * on Google Cloud**. To unregister other clusters, follow the instructions at
   * https://cloud.google.com/anthos/multicluster-management/connect/unregistering-a-cluster.
   *
   * @param name Required. The Membership resource name in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsDelete(name: string, opts: ProjectsLocationsMembershipsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Generates the manifest for deployment of the GKE connect agent. **This
   * method is used internally by Google-provided libraries.** Most clients
   * should not need to call this method directly.
   *
   * @param name Required. The Membership resource name the Agent will associate with, in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsGenerateConnectManifest(name: string, opts: ProjectsLocationsMembershipsGenerateConnectManifestOptions = {}): Promise<GenerateConnectManifestResponse> {
    opts = serializeProjectsLocationsMembershipsGenerateConnectManifestOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }:generateConnectManifest`);
    if (opts.imagePullSecretContent !== undefined) {
      url.searchParams.append("imagePullSecretContent", String(opts.imagePullSecretContent));
    }
    if (opts.isUpgrade !== undefined) {
      url.searchParams.append("isUpgrade", String(opts.isUpgrade));
    }
    if (opts.namespace !== undefined) {
      url.searchParams.append("namespace", String(opts.namespace));
    }
    if (opts.proxy !== undefined) {
      url.searchParams.append("proxy", String(opts.proxy));
    }
    if (opts.registry !== undefined) {
      url.searchParams.append("registry", String(opts.registry));
    }
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GenerateConnectManifestResponse;
  }

  /**
   * Gets the details of a Membership.
   *
   * @param name Required. The Membership resource name in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsGet(name: string): Promise<Membership> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMembership(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMembershipsGetIamPolicy(resource: string, opts: ProjectsLocationsMembershipsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Memberships in a given project and location.
   *
   * @param parent Required. The parent (project and location) where the Memberships will be listed. Specified in the format `projects/*\/locations/*`. `projects/*\/locations/-` list memberships in all the regions.
   */
  async projectsLocationsMembershipsList(parent: string, opts: ProjectsLocationsMembershipsListOptions = {}): Promise<ListMembershipsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships`);
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
    return deserializeListMembershipsResponse(data);
  }

  /**
   * Updates an existing Membership.
   *
   * @param name Required. The Membership resource name in the format `projects/*\/locations/*\/memberships/*`.
   */
  async projectsLocationsMembershipsPatch(name: string, req: Membership, opts: ProjectsLocationsMembershipsPatchOptions = {}): Promise<Operation> {
    req = serializeMembership(req);
    opts = serializeProjectsLocationsMembershipsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMembershipsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMembershipsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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

  /**
   * Creates a Scope.
   *
   * @param parent Required. The parent (project and location) where the Scope will be created. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsScopesCreate(parent: string, req: Scope, opts: ProjectsLocationsScopesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/scopes`);
    if (opts.scopeId !== undefined) {
      url.searchParams.append("scopeId", String(opts.scopeId));
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
   * Deletes a Scope.
   *
   * @param name Required. The Scope resource name in the format `projects/*\/locations/*\/scopes/*`.
   */
  async projectsLocationsScopesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns the details of a Scope.
   *
   * @param name Required. The Scope resource name in the format `projects/*\/locations/*\/scopes/*`.
   */
  async projectsLocationsScopesGet(name: string): Promise<Scope> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Scope;
  }

  /**
   * Lists Scopes.
   *
   * @param parent Required. The parent (project and location) where the Scope will be listed. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsScopesList(parent: string, opts: ProjectsLocationsScopesListOptions = {}): Promise<ListScopesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/scopes`);
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
    return data as ListScopesResponse;
  }
}

/**
 * Spec for App Dev Experience Feature.
 */
export interface AppDevExperienceFeatureSpec {
}

/**
 * State for App Dev Exp Feature.
 */
export interface AppDevExperienceFeatureState {
  /**
   * Status of subcomponent that detects configured Service Mesh resources.
   */
  networkingInstallSucceeded?: Status;
}

/**
 * ApplianceCluster contains information specific to GDC Edge Appliance
 * Clusters.
 */
export interface ApplianceCluster {
  /**
   * Immutable. Self-link of the GCP resource for the Appliance Cluster. For
   * example:
   * //transferappliance.googleapis.com/projects/my-project/locations/us-west1-a/appliances/my-appliance
   */
  resourceLink?: string;
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
 * Authority encodes how Google will recognize identities from this Membership.
 * See the workload identity documentation for more details:
 * https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
 */
export interface Authority {
  /**
   * Output only. An identity provider that reflects the `issuer` in the
   * workload identity pool.
   */
  readonly identityProvider?: string;
  /**
   * Optional. A JSON Web Token (JWT) issuer URI. `issuer` must start with
   * `https://` and be a valid URL with length <2000 characters. If set, then
   * Google will allow valid OIDC tokens from this issuer to authenticate within
   * the workload_identity_pool. OIDC discovery will be performed on this URI to
   * validate tokens from the issuer. Clearing `issuer` disables Workload
   * Identity. `issuer` cannot be directly modified; it must be cleared (and
   * Workload Identity disabled) before using a new issuer (and re-enabling
   * Workload Identity).
   */
  issuer?: string;
  /**
   * Optional. OIDC verification keys for this Membership in JWKS format (RFC
   * 7517). When this field is set, OIDC discovery will NOT be performed on
   * `issuer`, and instead OIDC tokens will be validated using this field.
   */
  oidcJwks?: Uint8Array;
  /**
   * Output only. The name of the workload identity pool in which `issuer` will
   * be recognized. There is a single Workload Identity Pool per Hub that is
   * shared between all Memberships that belong to that Hub. For a Hub hosted in
   * {PROJECT_ID}, the workload pool format is `{PROJECT_ID}.hub.id.goog`,
   * although this is subject to change in newer versions of this API.
   */
  readonly workloadIdentityPool?: string;
}

function serializeAuthority(data: any): Authority {
  return {
    ...data,
    oidcJwks: data["oidcJwks"] !== undefined ? encodeBase64(data["oidcJwks"]) : undefined,
  };
}

function deserializeAuthority(data: any): Authority {
  return {
    ...data,
    oidcJwks: data["oidcJwks"] !== undefined ? decodeBase64(data["oidcJwks"] as string) : undefined,
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
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * CommonFeatureSpec contains Hub-wide configuration information
 */
export interface CommonFeatureSpec {
  /**
   * Appdevexperience specific spec.
   */
  appdevexperience?: AppDevExperienceFeatureSpec;
  /**
   * FleetObservability feature spec.
   */
  fleetobservability?: FleetObservabilityFeatureSpec;
  /**
   * Multicluster Ingress-specific spec.
   */
  multiclusteringress?: MultiClusterIngressFeatureSpec;
}

/**
 * CommonFeatureState contains Hub-wide Feature status information.
 */
export interface CommonFeatureState {
  /**
   * Appdevexperience specific state.
   */
  appdevexperience?: AppDevExperienceFeatureState;
  /**
   * FleetObservability feature state.
   */
  fleetobservability?: FleetObservabilityFeatureState;
  /**
   * Output only. The "running state" of the Feature in this Hub.
   */
  readonly state?: FeatureState;
}

/**
 * CommonFleetDefaultMemberConfigSpec contains default configuration
 * information for memberships of a fleet
 */
export interface CommonFleetDefaultMemberConfigSpec {
}

/**
 * Configuration for Config Sync
 */
export interface ConfigManagementConfigSync {
  /**
   * Set to true to allow the vertical scaling. Defaults to false which
   * disallows vertical scaling. This field is deprecated.
   */
  allowVerticalScale?: boolean;
  /**
   * Enables the installation of ConfigSync. If set to true, ConfigSync
   * resources will be created and the other ConfigSync fields will be applied
   * if exist. If set to false, all other ConfigSync fields will be ignored,
   * ConfigSync resources will be deleted. If omitted, ConfigSync resources will
   * be managed depends on the presence of git field.
   */
  enabled?: boolean;
  /**
   * Git repo configuration for the cluster.
   */
  git?: ConfigManagementGitConfig;
  /**
   * OCI repo configuration for the cluster
   */
  oci?: ConfigManagementOciConfig;
  /**
   * Set to true to enable the Config Sync admission webhook to prevent drifts.
   * If set to `false`, disables the Config Sync admission webhook and does not
   * prevent drifts.
   */
  preventDrift?: boolean;
  /**
   * Specifies whether the Config Sync Repo is in "hierarchical" or
   * "unstructured" mode.
   */
  sourceFormat?: string;
}

function serializeConfigManagementConfigSync(data: any): ConfigManagementConfigSync {
  return {
    ...data,
    git: data["git"] !== undefined ? serializeConfigManagementGitConfig(data["git"]) : undefined,
    oci: data["oci"] !== undefined ? serializeConfigManagementOciConfig(data["oci"]) : undefined,
  };
}

function deserializeConfigManagementConfigSync(data: any): ConfigManagementConfigSync {
  return {
    ...data,
    git: data["git"] !== undefined ? deserializeConfigManagementGitConfig(data["git"]) : undefined,
    oci: data["oci"] !== undefined ? deserializeConfigManagementOciConfig(data["oci"]) : undefined,
  };
}

/**
 * The state of ConfigSync's deployment on a cluster
 */
export interface ConfigManagementConfigSyncDeploymentState {
  /**
   * Deployment state of admission-webhook
   */
  admissionWebhook?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of the git-sync pod
   */
  gitSync?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of the importer pod
   */
  importer?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of the monitor pod
   */
  monitor?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of reconciler-manager pod
   */
  reconcilerManager?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of root-reconciler
   */
  rootReconciler?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Deployment state of the syncer pod
   */
  syncer?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
}

/**
 * State information for ConfigSync
 */
export interface ConfigManagementConfigSyncState {
  /**
   * Information about the deployment of ConfigSync, including the version of
   * the various Pods deployed
   */
  deploymentState?: ConfigManagementConfigSyncDeploymentState;
  /**
   * The state of ConfigSync's process to sync configs to a cluster
   */
  syncState?: ConfigManagementSyncState;
  /**
   * The version of ConfigSync deployed
   */
  version?: ConfigManagementConfigSyncVersion;
}

function serializeConfigManagementConfigSyncState(data: any): ConfigManagementConfigSyncState {
  return {
    ...data,
    syncState: data["syncState"] !== undefined ? serializeConfigManagementSyncState(data["syncState"]) : undefined,
  };
}

function deserializeConfigManagementConfigSyncState(data: any): ConfigManagementConfigSyncState {
  return {
    ...data,
    syncState: data["syncState"] !== undefined ? deserializeConfigManagementSyncState(data["syncState"]) : undefined,
  };
}

/**
 * Specific versioning information pertaining to ConfigSync's Pods
 */
export interface ConfigManagementConfigSyncVersion {
  /**
   * Version of the deployed admission_webhook pod
   */
  admissionWebhook?: string;
  /**
   * Version of the deployed git-sync pod
   */
  gitSync?: string;
  /**
   * Version of the deployed importer pod
   */
  importer?: string;
  /**
   * Version of the deployed monitor pod
   */
  monitor?: string;
  /**
   * Version of the deployed reconciler-manager pod
   */
  reconcilerManager?: string;
  /**
   * Version of the deployed reconciler container in root-reconciler pod
   */
  rootReconciler?: string;
  /**
   * Version of the deployed syncer pod
   */
  syncer?: string;
}

/**
 * Model for a config file in the git repo with an associated Sync error
 */
export interface ConfigManagementErrorResource {
  /**
   * Group/version/kind of the resource that is causing an error
   */
  resourceGvk?: ConfigManagementGroupVersionKind;
  /**
   * Metadata name of the resource that is causing an error
   */
  resourceName?: string;
  /**
   * Namespace of the resource that is causing an error
   */
  resourceNamespace?: string;
  /**
   * Path in the git repo of the erroneous config
   */
  sourcePath?: string;
}

/**
 * State of Policy Controller installation.
 */
export interface ConfigManagementGatekeeperDeploymentState {
  /**
   * Status of gatekeeper-audit deployment.
   */
  gatekeeperAudit?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Status of gatekeeper-controller-manager pod.
   */
  gatekeeperControllerManagerState?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Status of the pod serving the mutation webhook.
   */
  gatekeeperMutation?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
}

/**
 * Git repo configuration for a single cluster.
 */
export interface ConfigManagementGitConfig {
  /**
   * The GCP Service Account Email used for auth when secret_type is
   * gcpServiceAccount.
   */
  gcpServiceAccountEmail?: string;
  /**
   * URL for the HTTPS proxy to be used when communicating with the Git repo.
   */
  httpsProxy?: string;
  /**
   * The path within the Git repository that represents the top level of the
   * repo to sync. Default: the root directory of the repository.
   */
  policyDir?: string;
  /**
   * Type of secret configured for access to the Git repo. Must be one of ssh,
   * cookiefile, gcenode, token, gcpserviceaccount or none. The validation of
   * this is case-sensitive. Required.
   */
  secretType?: string;
  /**
   * The branch of the repository to sync from. Default: master.
   */
  syncBranch?: string;
  /**
   * The URL of the Git repository to use as the source of truth.
   */
  syncRepo?: string;
  /**
   * Git revision (tag or hash) to check out. Default HEAD.
   */
  syncRev?: string;
  /**
   * Period in seconds between consecutive syncs. Default: 15.
   */
  syncWaitSecs?: bigint;
}

function serializeConfigManagementGitConfig(data: any): ConfigManagementGitConfig {
  return {
    ...data,
    syncWaitSecs: data["syncWaitSecs"] !== undefined ? String(data["syncWaitSecs"]) : undefined,
  };
}

function deserializeConfigManagementGitConfig(data: any): ConfigManagementGitConfig {
  return {
    ...data,
    syncWaitSecs: data["syncWaitSecs"] !== undefined ? BigInt(data["syncWaitSecs"]) : undefined,
  };
}

/**
 * A Kubernetes object's GVK
 */
export interface ConfigManagementGroupVersionKind {
  /**
   * Kubernetes Group
   */
  group?: string;
  /**
   * Kubernetes Kind
   */
  kind?: string;
  /**
   * Kubernetes Version
   */
  version?: string;
}

/**
 * Configuration for Hierarchy Controller
 */
export interface ConfigManagementHierarchyControllerConfig {
  /**
   * Whether Hierarchy Controller is enabled in this cluster.
   */
  enabled?: boolean;
  /**
   * Whether hierarchical resource quota is enabled in this cluster.
   */
  enableHierarchicalResourceQuota?: boolean;
  /**
   * Whether pod tree labels are enabled in this cluster.
   */
  enablePodTreeLabels?: boolean;
}

/**
 * Deployment state for Hierarchy Controller
 */
export interface ConfigManagementHierarchyControllerDeploymentState {
  /**
   * The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1)
   */
  extension?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * The deployment state for open source HNC (e.g. v0.7.0-hc.0)
   */
  hnc?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
}

/**
 * State for Hierarchy Controller
 */
export interface ConfigManagementHierarchyControllerState {
  /**
   * The deployment state for Hierarchy Controller
   */
  state?: ConfigManagementHierarchyControllerDeploymentState;
  /**
   * The version for Hierarchy Controller
   */
  version?: ConfigManagementHierarchyControllerVersion;
}

/**
 * Version for Hierarchy Controller
 */
export interface ConfigManagementHierarchyControllerVersion {
  /**
   * Version for Hierarchy Controller extension
   */
  extension?: string;
  /**
   * Version for open source HNC
   */
  hnc?: string;
}

/**
 * Errors pertaining to the installation of ACM
 */
export interface ConfigManagementInstallError {
  /**
   * A string representing the user facing error message
   */
  errorMessage?: string;
}

/**
 * **Anthos Config Management**: Configuration for a single cluster. Intended
 * to parallel the ConfigManagement CR.
 */
export interface ConfigManagementMembershipSpec {
  /**
   * Config Sync configuration for the cluster.
   */
  configSync?: ConfigManagementConfigSync;
  /**
   * Hierarchy Controller configuration for the cluster.
   */
  hierarchyController?: ConfigManagementHierarchyControllerConfig;
  /**
   * Policy Controller configuration for the cluster.
   */
  policyController?: ConfigManagementPolicyController;
  /**
   * Version of ACM installed.
   */
  version?: string;
}

function serializeConfigManagementMembershipSpec(data: any): ConfigManagementMembershipSpec {
  return {
    ...data,
    configSync: data["configSync"] !== undefined ? serializeConfigManagementConfigSync(data["configSync"]) : undefined,
    policyController: data["policyController"] !== undefined ? serializeConfigManagementPolicyController(data["policyController"]) : undefined,
  };
}

function deserializeConfigManagementMembershipSpec(data: any): ConfigManagementMembershipSpec {
  return {
    ...data,
    configSync: data["configSync"] !== undefined ? deserializeConfigManagementConfigSync(data["configSync"]) : undefined,
    policyController: data["policyController"] !== undefined ? deserializeConfigManagementPolicyController(data["policyController"]) : undefined,
  };
}

/**
 * **Anthos Config Management**: State for a single cluster.
 */
export interface ConfigManagementMembershipState {
  /**
   * The user-defined name for the cluster used by ClusterSelectors to group
   * clusters together. This should match Membership's membership_name, unless
   * the user installed ACM on the cluster manually prior to enabling the ACM
   * hub feature. Unique within a Anthos Config Management installation.
   */
  clusterName?: string;
  /**
   * Current sync status
   */
  configSyncState?: ConfigManagementConfigSyncState;
  /**
   * Hierarchy Controller status
   */
  hierarchyControllerState?: ConfigManagementHierarchyControllerState;
  /**
   * Membership configuration in the cluster. This represents the actual state
   * in the cluster, while the MembershipSpec in the FeatureSpec represents the
   * intended state
   */
  membershipSpec?: ConfigManagementMembershipSpec;
  /**
   * Current install status of ACM's Operator
   */
  operatorState?: ConfigManagementOperatorState;
  /**
   * PolicyController status
   */
  policyControllerState?: ConfigManagementPolicyControllerState;
}

function serializeConfigManagementMembershipState(data: any): ConfigManagementMembershipState {
  return {
    ...data,
    configSyncState: data["configSyncState"] !== undefined ? serializeConfigManagementConfigSyncState(data["configSyncState"]) : undefined,
    membershipSpec: data["membershipSpec"] !== undefined ? serializeConfigManagementMembershipSpec(data["membershipSpec"]) : undefined,
  };
}

function deserializeConfigManagementMembershipState(data: any): ConfigManagementMembershipState {
  return {
    ...data,
    configSyncState: data["configSyncState"] !== undefined ? deserializeConfigManagementConfigSyncState(data["configSyncState"]) : undefined,
    membershipSpec: data["membershipSpec"] !== undefined ? deserializeConfigManagementMembershipSpec(data["membershipSpec"]) : undefined,
  };
}

/**
 * OCI repo configuration for a single cluster
 */
export interface ConfigManagementOciConfig {
  /**
   * The GCP Service Account Email used for auth when secret_type is
   * gcpServiceAccount.
   */
  gcpServiceAccountEmail?: string;
  /**
   * The absolute path of the directory that contains the local resources.
   * Default: the root directory of the image.
   */
  policyDir?: string;
  /**
   * Type of secret configured for access to the Git repo.
   */
  secretType?: string;
  /**
   * The OCI image repository URL for the package to sync from. e.g.
   * `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`.
   */
  syncRepo?: string;
  /**
   * Period in seconds between consecutive syncs. Default: 15.
   */
  syncWaitSecs?: bigint;
}

function serializeConfigManagementOciConfig(data: any): ConfigManagementOciConfig {
  return {
    ...data,
    syncWaitSecs: data["syncWaitSecs"] !== undefined ? String(data["syncWaitSecs"]) : undefined,
  };
}

function deserializeConfigManagementOciConfig(data: any): ConfigManagementOciConfig {
  return {
    ...data,
    syncWaitSecs: data["syncWaitSecs"] !== undefined ? BigInt(data["syncWaitSecs"]) : undefined,
  };
}

/**
 * State information for an ACM's Operator
 */
export interface ConfigManagementOperatorState {
  /**
   * The state of the Operator's deployment
   */
  deploymentState?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "NOT_INSTALLED" | "INSTALLED" | "ERROR";
  /**
   * Install errors.
   */
  errors?: ConfigManagementInstallError[];
  /**
   * The semenatic version number of the operator
   */
  version?: string;
}

/**
 * Configuration for Policy Controller
 */
export interface ConfigManagementPolicyController {
  /**
   * Sets the interval for Policy Controller Audit Scans (in seconds). When set
   * to 0, this disables audit functionality altogether.
   */
  auditIntervalSeconds?: bigint;
  /**
   * Enables the installation of Policy Controller. If false, the rest of
   * PolicyController fields take no effect.
   */
  enabled?: boolean;
  /**
   * The set of namespaces that are excluded from Policy Controller checks.
   * Namespaces do not need to currently exist on the cluster.
   */
  exemptableNamespaces?: string[];
  /**
   * Logs all denies and dry run failures.
   */
  logDeniesEnabled?: boolean;
  /**
   * Monitoring specifies the configuration of monitoring.
   */
  monitoring?: ConfigManagementPolicyControllerMonitoring;
  /**
   * Enable or disable mutation in policy controller. If true, mutation CRDs,
   * webhook and controller deployment will be deployed to the cluster.
   */
  mutationEnabled?: boolean;
  /**
   * Enables the ability to use Constraint Templates that reference to objects
   * other than the object currently being evaluated.
   */
  referentialRulesEnabled?: boolean;
  /**
   * Installs the default template library along with Policy Controller.
   */
  templateLibraryInstalled?: boolean;
}

function serializeConfigManagementPolicyController(data: any): ConfigManagementPolicyController {
  return {
    ...data,
    auditIntervalSeconds: data["auditIntervalSeconds"] !== undefined ? String(data["auditIntervalSeconds"]) : undefined,
  };
}

function deserializeConfigManagementPolicyController(data: any): ConfigManagementPolicyController {
  return {
    ...data,
    auditIntervalSeconds: data["auditIntervalSeconds"] !== undefined ? BigInt(data["auditIntervalSeconds"]) : undefined,
  };
}

/**
 * State for the migration of PolicyController from ACM -> PoCo Hub.
 */
export interface ConfigManagementPolicyControllerMigration {
  /**
   * Stage of the migration.
   */
  stage?:  | "STAGE_UNSPECIFIED" | "ACM_MANAGED" | "POCO_MANAGED";
}

/**
 * PolicyControllerMonitoring specifies the backends Policy Controller should
 * export metrics to. For example, to specify metrics should be exported to
 * Cloud Monitoring and Prometheus, specify backends: ["cloudmonitoring",
 * "prometheus"]
 */
export interface ConfigManagementPolicyControllerMonitoring {
  /**
   * Specifies the list of backends Policy Controller will export to. An empty
   * list would effectively disable metrics export.
   */
  backends?:  | "MONITORING_BACKEND_UNSPECIFIED" | "PROMETHEUS" | "CLOUD_MONITORING"[];
}

/**
 * State for PolicyControllerState.
 */
export interface ConfigManagementPolicyControllerState {
  /**
   * The state about the policy controller installation.
   */
  deploymentState?: ConfigManagementGatekeeperDeploymentState;
  /**
   * Record state of ACM -> PoCo Hub migration for this feature.
   */
  migration?: ConfigManagementPolicyControllerMigration;
  /**
   * The version of Gatekeeper Policy Controller deployed.
   */
  version?: ConfigManagementPolicyControllerVersion;
}

/**
 * The build version of Gatekeeper Policy Controller is using.
 */
export interface ConfigManagementPolicyControllerVersion {
  /**
   * The gatekeeper image tag that is composed of ACM version, git tag, build
   * number.
   */
  version?: string;
}

/**
 * An ACM created error representing a problem syncing configurations
 */
export interface ConfigManagementSyncError {
  /**
   * An ACM defined error code
   */
  code?: string;
  /**
   * A description of the error
   */
  errorMessage?: string;
  /**
   * A list of config(s) associated with the error, if any
   */
  errorResources?: ConfigManagementErrorResource[];
}

/**
 * State indicating an ACM's progress syncing configurations to a cluster
 */
export interface ConfigManagementSyncState {
  /**
   * Sync status code
   */
  code?:  | "SYNC_CODE_UNSPECIFIED" | "SYNCED" | "PENDING" | "ERROR" | "NOT_CONFIGURED" | "NOT_INSTALLED" | "UNAUTHORIZED" | "UNREACHABLE";
  /**
   * A list of errors resulting from problematic configs. This list will be
   * truncated after 100 errors, although it is unlikely for that many errors to
   * simultaneously exist.
   */
  errors?: ConfigManagementSyncError[];
  /**
   * Token indicating the state of the importer.
   */
  importToken?: string;
  /**
   * Deprecated: use last_sync_time instead. Timestamp of when ACM last
   * successfully synced the repo The time format is specified in
   * https://golang.org/pkg/time/#Time.String
   */
  lastSync?: string;
  /**
   * Timestamp type of when ACM last successfully synced the repo
   */
  lastSyncTime?: Date;
  /**
   * Token indicating the state of the repo.
   */
  sourceToken?: string;
  /**
   * Token indicating the state of the syncer.
   */
  syncToken?: string;
}

function serializeConfigManagementSyncState(data: any): ConfigManagementSyncState {
  return {
    ...data,
    lastSyncTime: data["lastSyncTime"] !== undefined ? data["lastSyncTime"].toISOString() : undefined,
  };
}

function deserializeConfigManagementSyncState(data: any): ConfigManagementSyncState {
  return {
    ...data,
    lastSyncTime: data["lastSyncTime"] !== undefined ? new Date(data["lastSyncTime"]) : undefined,
  };
}

/**
 * ConnectAgentResource represents a Kubernetes resource manifest for Connect
 * Agent deployment.
 */
export interface ConnectAgentResource {
  /**
   * YAML manifest of the resource.
   */
  manifest?: string;
  /**
   * Kubernetes type of the resource.
   */
  type?: TypeMeta;
}

/**
 * EdgeCluster contains information specific to Google Edge Clusters.
 */
export interface EdgeCluster {
  /**
   * Immutable. Self-link of the GCP resource for the Edge Cluster. For
   * example:
   * //edgecontainer.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster
   */
  resourceLink?: string;
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
 * Feature represents the settings and status of any Hub Feature.
 */
export interface Feature {
  /**
   * Output only. When the Feature resource was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. When the Feature resource was deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Optional. Feature configuration applicable to all memberships of the
   * fleet.
   */
  fleetDefaultMemberConfig?: CommonFleetDefaultMemberConfigSpec;
  /**
   * GCP labels for this Feature.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Membership-specific configuration for this Feature. If this
   * Feature does not support any per-Membership configuration, this field may
   * be unused. The keys indicate which Membership the configuration is for, in
   * the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the
   * project, {l} is a valid location and {m} is a valid Membership in this
   * project at that location. {p} WILL match the Feature's project. {p} will
   * always be returned as the project number, but the project ID is also
   * accepted during input. If the same Membership is specified in the map twice
   * (using the project ID form, and the project number form), exactly ONE of
   * the entries will be saved, with no guarantees as to which. For this reason,
   * it is recommended the same format be used for all entries when mutating a
   * Feature.
   */
  membershipSpecs?: {
    [key: string]: MembershipFeatureSpec
  };
  /**
   * Output only. Membership-specific Feature status. If this Feature does
   * report any per-Membership status, this field may be unused. The keys
   * indicate which Membership the state is for, in the form:
   * `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project
   * number, {l} is a valid location and {m} is a valid Membership in this
   * project at that location. {p} MUST match the Feature's project number.
   */
  readonly membershipStates?: {
    [key: string]: MembershipFeatureState
  };
  /**
   * Output only. The full, unique name of this Feature resource in the format
   * `projects/*\/locations/*\/features/*`.
   */
  readonly name?: string;
  /**
   * Output only. State of the Feature resource itself.
   */
  readonly resourceState?: FeatureResourceState;
  /**
   * Optional. Scope-specific configuration for this Feature. If this Feature
   * does not support any per-Scope configuration, this field may be unused. The
   * keys indicate which Scope the configuration is for, in the form:
   * `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is
   * a valid Scope in this project. {p} WILL match the Feature's project. {p}
   * will always be returned as the project number, but the project ID is also
   * accepted during input. If the same Scope is specified in the map twice
   * (using the project ID form, and the project number form), exactly ONE of
   * the entries will be saved, with no guarantees as to which. For this reason,
   * it is recommended the same format be used for all entries when mutating a
   * Feature.
   */
  scopeSpecs?: {
    [key: string]: ScopeFeatureSpec
  };
  /**
   * Output only. Scope-specific Feature status. If this Feature does report
   * any per-Scope status, this field may be unused. The keys indicate which
   * Scope the state is for, in the form:
   * `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is
   * a valid Scope in this project. {p} WILL match the Feature's project.
   */
  readonly scopeStates?: {
    [key: string]: ScopeFeatureState
  };
  /**
   * Optional. Hub-wide Feature configuration. If this Feature does not support
   * any Hub-wide configuration, this field may be unused.
   */
  spec?: CommonFeatureSpec;
  /**
   * Output only. The Hub-wide Feature state.
   */
  readonly state?: CommonFeatureState;
  /**
   * Output only. When the Feature resource was last updated.
   */
  readonly updateTime?: Date;
}

function serializeFeature(data: any): Feature {
  return {
    ...data,
    membershipSpecs: data["membershipSpecs"] !== undefined ? Object.fromEntries(Object.entries(data["membershipSpecs"]).map(([k, v]: [string, any]) => ([k, serializeMembershipFeatureSpec(v)]))) : undefined,
  };
}

function deserializeFeature(data: any): Feature {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    membershipSpecs: data["membershipSpecs"] !== undefined ? Object.fromEntries(Object.entries(data["membershipSpecs"]).map(([k, v]: [string, any]) => ([k, deserializeMembershipFeatureSpec(v)]))) : undefined,
    membershipStates: data["membershipStates"] !== undefined ? Object.fromEntries(Object.entries(data["membershipStates"]).map(([k, v]: [string, any]) => ([k, deserializeMembershipFeatureState(v)]))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * FeatureResourceState describes the state of a Feature *resource* in the
 * GkeHub API. See `FeatureState` for the "running state" of the Feature in the
 * Hub and across Memberships.
 */
export interface FeatureResourceState {
  /**
   * The current state of the Feature resource in the Hub API.
   */
  state?:  | "STATE_UNSPECIFIED" | "ENABLING" | "ACTIVE" | "DISABLING" | "UPDATING" | "SERVICE_UPDATING";
}

/**
 * FeatureState describes the high-level state of a Feature. It may be used to
 * describe a Feature's state at the environ-level, or per-membershop, depending
 * on the context.
 */
export interface FeatureState {
  /**
   * The high-level, machine-readable status of this Feature.
   */
  code?:  | "CODE_UNSPECIFIED" | "OK" | "WARNING" | "ERROR";
  /**
   * A human-readable description of the current status.
   */
  description?: string;
  /**
   * The time this status and any related Feature-specific details were
   * updated.
   */
  updateTime?: Date;
}

function serializeFeatureState(data: any): FeatureState {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeFeatureState(data: any): FeatureState {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * **Fleet Observability**: The Hub-wide input for the FleetObservability
 * feature.
 */
export interface FleetObservabilityFeatureSpec {
}

/**
 * **FleetObservability**: An empty state left as an example Hub-wide Feature
 * state.
 */
export interface FleetObservabilityFeatureState {
}

/**
 * **FleetObservability**: The membership-specific input for FleetObservability
 * feature.
 */
export interface FleetObservabilityMembershipSpec {
}

/**
 * **FleetObservability**: An empty state left as an example
 * membership-specific Feature state.
 */
export interface FleetObservabilityMembershipState {
}

/**
 * GenerateConnectManifestResponse contains manifest information for
 * installing/upgrading a Connect agent.
 */
export interface GenerateConnectManifestResponse {
  /**
   * The ordered list of Kubernetes resources that need to be applied to the
   * cluster for GKE Connect agent installation/upgrade.
   */
  manifest?: ConnectAgentResource[];
}

/**
 * GkeCluster contains information specific to GKE clusters.
 */
export interface GkeCluster {
  /**
   * Output only. If cluster_missing is set then it denotes that the GKE
   * cluster no longer exists in the GKE Control Plane.
   */
  readonly clusterMissing?: boolean;
  /**
   * Immutable. Self-link of the GCP resource for the GKE cluster. For example:
   * //container.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster
   * Zonal clusters are also supported.
   */
  resourceLink?: string;
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
 * Configuration of an auth method for a member/cluster. Only one
 * authentication method (e.g., OIDC and LDAP) can be set per AuthMethod.
 */
export interface IdentityServiceAuthMethod {
  /**
   * AzureAD specific Configuration.
   */
  azureadConfig?: IdentityServiceAzureADConfig;
  /**
   * GoogleConfig specific configuration
   */
  googleConfig?: IdentityServiceGoogleConfig;
  /**
   * Identifier for auth config.
   */
  name?: string;
  /**
   * OIDC specific configuration.
   */
  oidcConfig?: IdentityServiceOidcConfig;
  /**
   * Proxy server address to use for auth method.
   */
  proxy?: string;
}

/**
 * Configuration for the AzureAD Auth flow.
 */
export interface IdentityServiceAzureADConfig {
  /**
   * ID for the registered client application that makes authentication
   * requests to the Azure AD identity provider.
   */
  clientId?: string;
  /**
   * Input only. Unencrypted AzureAD client secret will be passed to the GKE
   * Hub CLH.
   */
  clientSecret?: string;
  /**
   * Output only. Encrypted AzureAD client secret.
   */
  readonly encryptedClientSecret?: Uint8Array;
  /**
   * The redirect URL that kubectl uses for authorization.
   */
  kubectlRedirectUri?: string;
  /**
   * Kind of Azure AD account to be authenticated. Supported values are or for
   * accounts belonging to a specific tenant.
   */
  tenant?: string;
}

/**
 * Configuration for the Google Plugin Auth flow.
 */
export interface IdentityServiceGoogleConfig {
  /**
   * Disable automatic configuration of Google Plugin on supported platforms.
   */
  disable?: boolean;
}

/**
 * **Anthos Identity Service**: Configuration for a single Membership.
 */
export interface IdentityServiceMembershipSpec {
  /**
   * A member may support multiple auth methods.
   */
  authMethods?: IdentityServiceAuthMethod[];
}

/**
 * **Anthos Identity Service**: State for a single Membership.
 */
export interface IdentityServiceMembershipState {
  /**
   * The reason of the failure.
   */
  failureReason?: string;
  /**
   * Installed AIS version. This is the AIS version installed on this member.
   * The values makes sense iff state is OK.
   */
  installedVersion?: string;
  /**
   * Last reconciled membership configuration
   */
  memberConfig?: IdentityServiceMembershipSpec;
  /**
   * Deployment state on this member
   */
  state?:  | "DEPLOYMENT_STATE_UNSPECIFIED" | "OK" | "ERROR";
}

/**
 * Configuration for OIDC Auth flow.
 */
export interface IdentityServiceOidcConfig {
  /**
   * PEM-encoded CA for OIDC provider.
   */
  certificateAuthorityData?: string;
  /**
   * ID for OIDC client application.
   */
  clientId?: string;
  /**
   * Input only. Unencrypted OIDC client secret will be passed to the GKE Hub
   * CLH.
   */
  clientSecret?: string;
  /**
   * Flag to denote if reverse proxy is used to connect to auth provider. This
   * flag should be set to true when provider is not reachable by Google Cloud
   * Console.
   */
  deployCloudConsoleProxy?: boolean;
  /**
   * Enable access token.
   */
  enableAccessToken?: boolean;
  /**
   * Output only. Encrypted OIDC Client secret
   */
  readonly encryptedClientSecret?: Uint8Array;
  /**
   * Comma-separated list of key-value pairs.
   */
  extraParams?: string;
  /**
   * Prefix to prepend to group name.
   */
  groupPrefix?: string;
  /**
   * Claim in OIDC ID token that holds group information.
   */
  groupsClaim?: string;
  /**
   * URI for the OIDC provider. This should point to the level below
   * .well-known/openid-configuration.
   */
  issuerUri?: string;
  /**
   * Registered redirect uri to redirect users going through OAuth flow using
   * kubectl plugin.
   */
  kubectlRedirectUri?: string;
  /**
   * Comma-separated list of identifiers.
   */
  scopes?: string;
  /**
   * Claim in OIDC ID token that holds username.
   */
  userClaim?: string;
  /**
   * Prefix to prepend to user name.
   */
  userPrefix?: string;
}

/**
 * KubernetesMetadata provides informational metadata for Memberships
 * representing Kubernetes clusters.
 */
export interface KubernetesMetadata {
  /**
   * Output only. Kubernetes API server version string as reported by
   * `/version`.
   */
  readonly kubernetesApiServerVersion?: string;
  /**
   * Output only. The total memory capacity as reported by the sum of all
   * Kubernetes nodes resources, defined in MB.
   */
  readonly memoryMb?: number;
  /**
   * Output only. Node count as reported by Kubernetes nodes resources.
   */
  readonly nodeCount?: number;
  /**
   * Output only. Node providerID as reported by the first node in the list of
   * nodes on the Kubernetes endpoint. On Kubernetes platforms that support
   * zero-node clusters (like GKE-on-GCP), the node_count will be zero and the
   * node_provider_id will be empty.
   */
  readonly nodeProviderId?: string;
  /**
   * Output only. The time at which these details were last updated. This
   * update_time is different from the Membership-level update_time since
   * EndpointDetails are updated internally for API consumers.
   */
  readonly updateTime?: Date;
  /**
   * Output only. vCPU count as reported by Kubernetes nodes resources.
   */
  readonly vcpuCount?: number;
}

/**
 * KubernetesResource contains the YAML manifests and configuration for
 * Membership Kubernetes resources in the cluster. After CreateMembership or
 * UpdateMembership, these resources should be re-applied in the cluster.
 */
export interface KubernetesResource {
  /**
   * Output only. The Kubernetes resources for installing the GKE Connect agent
   * This field is only populated in the Membership returned from a successful
   * long-running operation from CreateMembership or UpdateMembership. It is not
   * populated during normal GetMembership or ListMemberships requests. To get
   * the resource manifest after the initial registration, the caller should
   * make a UpdateMembership call with an empty field mask.
   */
  readonly connectResources?: ResourceManifest[];
  /**
   * Input only. The YAML representation of the Membership CR. This field is
   * ignored for GKE clusters where Hub can read the CR directly. Callers should
   * provide the CR that is currently present in the cluster during
   * CreateMembership or UpdateMembership, or leave this field empty if none
   * exists. The CR manifest is used to validate the cluster has not been
   * registered with another Membership.
   */
  membershipCrManifest?: string;
  /**
   * Output only. Additional Kubernetes resources that need to be applied to
   * the cluster after Membership creation, and after every update. This field
   * is only populated in the Membership returned from a successful long-running
   * operation from CreateMembership or UpdateMembership. It is not populated
   * during normal GetMembership or ListMemberships requests. To get the
   * resource manifest after the initial registration, the caller should make a
   * UpdateMembership call with an empty field mask.
   */
  readonly membershipResources?: ResourceManifest[];
  /**
   * Optional. Options for Kubernetes resource generation.
   */
  resourceOptions?: ResourceOptions;
}

/**
 * Response message for the `GkeHub.ListFeatures` method.
 */
export interface ListFeaturesResponse {
  /**
   * A token to request the next page of resources from the `ListFeatures`
   * method. The value of an empty string means that there are no more resources
   * to return.
   */
  nextPageToken?: string;
  /**
   * The list of matching Features
   */
  resources?: Feature[];
}

function serializeListFeaturesResponse(data: any): ListFeaturesResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeFeature(item))) : undefined,
  };
}

function deserializeListFeaturesResponse(data: any): ListFeaturesResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeFeature(item))) : undefined,
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
 * List of MembershipBindings.
 */
export interface ListMembershipBindingsResponse {
  /**
   * The list of membership_bindings
   */
  membershipBindings?: MembershipBinding[];
  /**
   * A token to request the next page of resources from the
   * `ListMembershipBindings` method. The value of an empty string means that
   * there are no more resources to return.
   */
  nextPageToken?: string;
}

/**
 * Response message for the `GkeHub.ListMemberships` method.
 */
export interface ListMembershipsResponse {
  /**
   * A token to request the next page of resources from the `ListMemberships`
   * method. The value of an empty string means that there are no more resources
   * to return.
   */
  nextPageToken?: string;
  /**
   * The list of matching Memberships.
   */
  resources?: Membership[];
  /**
   * List of locations that could not be reached while fetching this list.
   */
  unreachable?: string[];
}

function serializeListMembershipsResponse(data: any): ListMembershipsResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeMembership(item))) : undefined,
  };
}

function deserializeListMembershipsResponse(data: any): ListMembershipsResponse {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeMembership(item))) : undefined,
  };
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
 * List of Scopes.
 */
export interface ListScopesResponse {
  /**
   * A token to request the next page of resources from the `ListScopes`
   * method. The value of an empty string means that there are no more resources
   * to return.
   */
  nextPageToken?: string;
  /**
   * The list of Scopes
   */
  scopes?: Scope[];
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
 * Membership contains information about a member cluster.
 */
export interface Membership {
  /**
   * Optional. How to identify workloads from this Membership. See the
   * documentation on Workload Identity for more details:
   * https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
   */
  authority?: Authority;
  /**
   * Output only. When the Membership was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. When the Membership was deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Output only. Description of this membership, limited to 63 characters.
   * Must match the regex: `a-zA-Z0-9*` This field is present for legacy
   * purposes.
   */
  readonly description?: string;
  /**
   * Optional. Endpoint information to reach this member.
   */
  endpoint?: MembershipEndpoint;
  /**
   * Optional. An externally-generated and managed ID for this Membership. This
   * ID may be modified after creation, but this is not recommended. The ID must
   * match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes
   * cluster, this value should be set to the UID of the `kube-system` namespace
   * object.
   */
  externalId?: string;
  /**
   * Optional. GCP labels for this membership.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. For clusters using Connect, the timestamp of the most recent
   * connection established with Google Cloud. This time is updated every
   * several minutes, not continuously. For clusters that do not use GKE
   * Connect, or that have never connected successfully, this field will be
   * unset.
   */
  readonly lastConnectionTime?: Date;
  /**
   * Output only. The full, unique name of this Membership resource in the
   * format `projects/*\/locations/*\/memberships/{membership_id}`, set during
   * creation. `membership_id` must be a valid RFC 1123 compliant DNS label: 1.
   * At most 63 characters in length 2. It must consist of lower case
   * alphanumeric characters or `-` 3. It must start and end with an
   * alphanumeric character Which can be expressed as the regex:
   * `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters.
   */
  readonly name?: string;
  /**
   * Output only. State of the Membership resource.
   */
  readonly state?: MembershipState;
  /**
   * Output only. Google-generated UUID for this resource. This is unique
   * across all Membership resources. If a Membership resource is deleted and
   * another resource with the same name is created, it gets a different
   * unique_id.
   */
  readonly uniqueId?: string;
  /**
   * Output only. When the Membership was last updated.
   */
  readonly updateTime?: Date;
}

function serializeMembership(data: any): Membership {
  return {
    ...data,
    authority: data["authority"] !== undefined ? serializeAuthority(data["authority"]) : undefined,
  };
}

function deserializeMembership(data: any): Membership {
  return {
    ...data,
    authority: data["authority"] !== undefined ? deserializeAuthority(data["authority"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    lastConnectionTime: data["lastConnectionTime"] !== undefined ? new Date(data["lastConnectionTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * MembershipBinding is a subresource of a Membership, representing what Fleet
 * Scopes (or other, future Fleet resources) a Membership is bound to.
 */
export interface MembershipBinding {
  /**
   * Output only. When the membership binding was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. When the membership binding was deleted.
   */
  readonly deleteTime?: Date;
  /**
   * Whether the membershipbinding is Fleet-wide; true means that this
   * Membership should be bound to all Namespaces in this entire Fleet.
   */
  fleet?: boolean;
  /**
   * The resource name for the membershipbinding itself
   * `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}`
   */
  name?: string;
  /**
   * A Workspace resource name in the format
   * `projects/*\/locations/*\/scopes/*`.
   */
  scope?: string;
  /**
   * Output only. State of the membership binding resource.
   */
  readonly state?: MembershipBindingLifecycleState;
  /**
   * Output only. Google-generated UUID for this resource. This is unique
   * across all membershipbinding resources. If a membershipbinding resource is
   * deleted and another resource with the same name is created, it gets a
   * different uid.
   */
  readonly uid?: string;
  /**
   * Output only. When the membership binding was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * MembershipBindingLifecycleState describes the state of a Binding resource.
 */
export interface MembershipBindingLifecycleState {
  /**
   * Output only. The current state of the MembershipBinding resource.
   */
  readonly code?:  | "CODE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING";
}

/**
 * MembershipEndpoint contains information needed to contact a Kubernetes API,
 * endpoint and any additional Kubernetes metadata.
 */
export interface MembershipEndpoint {
  /**
   * Optional. Specific information for a GDC Edge Appliance cluster.
   */
  applianceCluster?: ApplianceCluster;
  /**
   * Optional. Specific information for a Google Edge cluster.
   */
  edgeCluster?: EdgeCluster;
  /**
   * Optional. Specific information for a GKE-on-GCP cluster.
   */
  gkeCluster?: GkeCluster;
  /**
   * Output only. Whether the lifecycle of this membership is managed by a
   * google cluster platform service.
   */
  readonly googleManaged?: boolean;
  /**
   * Output only. Useful Kubernetes-specific metadata.
   */
  readonly kubernetesMetadata?: KubernetesMetadata;
  /**
   * Optional. The in-cluster Kubernetes Resources that should be applied for a
   * correctly registered cluster, in the steady state. These resources: *
   * Ensure that the cluster is exclusively registered to one and only one Hub
   * Membership. * Propagate Workload Pool Information available in the
   * Membership Authority field. * Ensure proper initial configuration of
   * default Hub Features.
   */
  kubernetesResource?: KubernetesResource;
  /**
   * Optional. Specific information for a GKE Multi-Cloud cluster.
   */
  multiCloudCluster?: MultiCloudCluster;
  /**
   * Optional. Specific information for a GKE On-Prem cluster. An onprem
   * user-cluster who has no resourceLink is not allowed to use this field, it
   * should have a nil "type" instead.
   */
  onPremCluster?: OnPremCluster;
}

/**
 * MembershipFeatureSpec contains configuration information for a single
 * Membership.
 */
export interface MembershipFeatureSpec {
  /**
   * Config Management-specific spec.
   */
  configmanagement?: ConfigManagementMembershipSpec;
  /**
   * True if value of `feature_spec` was inherited from a fleet-level default.
   */
  fleetInherited?: boolean;
  /**
   * Fleet observability membership spec
   */
  fleetobservability?: FleetObservabilityMembershipSpec;
  /**
   * Identity Service-specific spec.
   */
  identityservice?: IdentityServiceMembershipSpec;
  /**
   * Anthos Service Mesh-specific spec
   */
  mesh?: ServiceMeshMembershipSpec;
}

function serializeMembershipFeatureSpec(data: any): MembershipFeatureSpec {
  return {
    ...data,
    configmanagement: data["configmanagement"] !== undefined ? serializeConfigManagementMembershipSpec(data["configmanagement"]) : undefined,
  };
}

function deserializeMembershipFeatureSpec(data: any): MembershipFeatureSpec {
  return {
    ...data,
    configmanagement: data["configmanagement"] !== undefined ? deserializeConfigManagementMembershipSpec(data["configmanagement"]) : undefined,
  };
}

/**
 * MembershipFeatureState contains Feature status information for a single
 * Membership.
 */
export interface MembershipFeatureState {
  /**
   * Appdevexperience specific state.
   */
  appdevexperience?: AppDevExperienceFeatureState;
  /**
   * Config Management-specific state.
   */
  configmanagement?: ConfigManagementMembershipState;
  /**
   * Fleet observability membership state.
   */
  fleetobservability?: FleetObservabilityMembershipState;
  /**
   * Identity Service-specific state.
   */
  identityservice?: IdentityServiceMembershipState;
  /**
   * Service Mesh-specific state.
   */
  servicemesh?: ServiceMeshMembershipState;
  /**
   * The high-level state of this Feature for a single membership.
   */
  state?: FeatureState;
}

function serializeMembershipFeatureState(data: any): MembershipFeatureState {
  return {
    ...data,
    configmanagement: data["configmanagement"] !== undefined ? serializeConfigManagementMembershipState(data["configmanagement"]) : undefined,
    state: data["state"] !== undefined ? serializeFeatureState(data["state"]) : undefined,
  };
}

function deserializeMembershipFeatureState(data: any): MembershipFeatureState {
  return {
    ...data,
    configmanagement: data["configmanagement"] !== undefined ? deserializeConfigManagementMembershipState(data["configmanagement"]) : undefined,
    state: data["state"] !== undefined ? deserializeFeatureState(data["state"]) : undefined,
  };
}

/**
 * MembershipState describes the state of a Membership resource.
 */
export interface MembershipState {
  /**
   * Output only. The current state of the Membership resource.
   */
  readonly code?:  | "CODE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING" | "SERVICE_UPDATING";
}

/**
 * MultiCloudCluster contains information specific to GKE Multi-Cloud clusters.
 */
export interface MultiCloudCluster {
  /**
   * Output only. If cluster_missing is set then it denotes that
   * API(gkemulticloud.googleapis.com) resource for this GKE Multi-Cloud cluster
   * no longer exists.
   */
  readonly clusterMissing?: boolean;
  /**
   * Immutable. Self-link of the GCP resource for the GKE Multi-Cloud cluster.
   * For example:
   * //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/awsClusters/my-cluster
   * //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/azureClusters/my-cluster
   * //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/attachedClusters/my-cluster
   */
  resourceLink?: string;
}

/**
 * **Multi-cluster Ingress**: The configuration for the MultiClusterIngress
 * feature.
 */
export interface MultiClusterIngressFeatureSpec {
  /**
   * Fully-qualified Membership name which hosts the MultiClusterIngress CRD.
   * Example: `projects/foo-proj/locations/global/memberships/bar`
   */
  configMembership?: string;
}

/**
 * OnPremCluster contains information specific to GKE On-Prem clusters.
 */
export interface OnPremCluster {
  /**
   * Immutable. Whether the cluster is an admin cluster.
   */
  adminCluster?: boolean;
  /**
   * Output only. If cluster_missing is set then it denotes that
   * API(gkeonprem.googleapis.com) resource for this GKE On-Prem cluster no
   * longer exists.
   */
  readonly clusterMissing?: boolean;
  /**
   * Immutable. The on prem cluster's type.
   */
  clusterType?:  | "CLUSTERTYPE_UNSPECIFIED" | "BOOTSTRAP" | "HYBRID" | "STANDALONE" | "USER";
  /**
   * Immutable. Self-link of the GCP resource for the GKE On-Prem cluster. For
   * example:
   * //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/vmwareClusters/my-cluster
   * //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/bareMetalClusters/my-cluster
   */
  resourceLink?: string;
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
 * Represents the metadata of the long-running operation.
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
 * Additional options for GKEHub#projectsLocationsFeaturesCreate.
 */
export interface ProjectsLocationsFeaturesCreateOptions {
  /**
   * The ID of the feature to create.
   */
  featureId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsFeaturesDelete.
 */
export interface ProjectsLocationsFeaturesDeleteOptions {
  /**
   * If set to true, the delete will ignore any outstanding resources for this
   * Feature (that is, `FeatureState.has_resources` is set to true). These
   * resources will NOT be cleaned up or modified in any way.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsFeaturesGetIamPolicy.
 */
export interface ProjectsLocationsFeaturesGetIamPolicyOptions {
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
 * Additional options for GKEHub#projectsLocationsFeaturesList.
 */
export interface ProjectsLocationsFeaturesListOptions {
  /**
   * Lists Features that match the filter expression, following the syntax
   * outlined in https://google.aip.dev/160. Examples: - Feature with the name
   * "servicemesh" in project "foo-proj": name =
   * "projects/foo-proj/locations/global/features/servicemesh" - Features that
   * have a label called `foo`: labels.foo:* - Features that have a label called
   * `foo` whose value is `bar`: labels.foo = bar
   */
  filter?: string;
  /**
   * One or more fields to compare and use to sort the output. See
   * https://google.aip.dev/132#ordering.
   */
  orderBy?: string;
  /**
   * When requesting a 'page' of resources, `page_size` specifies number of
   * resources to return. If unspecified or set to 0, all resources will be
   * returned.
   */
  pageSize?: number;
  /**
   * Token returned by previous call to `ListFeatures` which specifies the
   * position in the list from where to continue listing the resources.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsFeaturesPatch.
 */
export interface ProjectsLocationsFeaturesPatchOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsFeaturesPatchOptions(data: any): ProjectsLocationsFeaturesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsFeaturesPatchOptions(data: any): ProjectsLocationsFeaturesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for GKEHub#projectsLocationsList.
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
 * Additional options for GKEHub#projectsLocationsMembershipsBindingsCreate.
 */
export interface ProjectsLocationsMembershipsBindingsCreateOptions {
  /**
   * Required. The ID to use for the MembershipBinding.
   */
  membershipBindingId?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsBindingsList.
 */
export interface ProjectsLocationsMembershipsBindingsListOptions {
  /**
   * Optional. When requesting a 'page' of resources, `page_size` specifies
   * number of resources to return. If unspecified or set to 0, all resources
   * will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Token returned by previous call to `ListMembershipBindings`
   * which specifies the position in the list from where to continue listing the
   * resources.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsBindingsPatch.
 */
export interface ProjectsLocationsMembershipsBindingsPatchOptions {
  /**
   * Required. The fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsMembershipsBindingsPatchOptions(data: any): ProjectsLocationsMembershipsBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsMembershipsBindingsPatchOptions(data: any): ProjectsLocationsMembershipsBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsCreate.
 */
export interface ProjectsLocationsMembershipsCreateOptions {
  /**
   * Required. Client chosen ID for the membership. `membership_id` must be a
   * valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2.
   * It must consist of lower case alphanumeric characters or `-` 3. It must
   * start and end with an alphanumeric character Which can be expressed as the
   * regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63
   * characters.
   */
  membershipId?: string;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsDelete.
 */
export interface ProjectsLocationsMembershipsDeleteOptions {
  /**
   * Optional. If set to true, any subresource from this Membership will also
   * be deleted. Otherwise, the request will only work if the Membership has no
   * subresource.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * GKEHub#projectsLocationsMembershipsGenerateConnectManifest.
 */
export interface ProjectsLocationsMembershipsGenerateConnectManifestOptions {
  /**
   * Optional. The image pull secret content for the registry, if not public.
   */
  imagePullSecretContent?: Uint8Array;
  /**
   * Optional. If true, generate the resources for upgrade only. Some resources
   * generated only for installation (e.g. secrets) will be excluded.
   */
  isUpgrade?: boolean;
  /**
   * Optional. Namespace for GKE Connect agent resources. Defaults to
   * `gke-connect`. The Connect Agent is authorized automatically when run in
   * the default namespace. Otherwise, explicit authorization must be granted
   * with an additional IAM binding.
   */
  namespace?: string;
  /**
   * Optional. URI of a proxy if connectivity from the agent to
   * gkeconnect.googleapis.com requires the use of a proxy. Format must be in
   * the form `http(s)://{proxy_address}`, depending on the HTTP/HTTPS protocol
   * supported by the proxy. This will direct the connect agent's outbound
   * traffic through a HTTP(S) proxy.
   */
  proxy?: Uint8Array;
  /**
   * Optional. The registry to fetch the connect agent image from. Defaults to
   * gcr.io/gkeconnect.
   */
  registry?: string;
  /**
   * Optional. The Connect agent version to use. Defaults to the most current
   * version.
   */
  version?: string;
}

function serializeProjectsLocationsMembershipsGenerateConnectManifestOptions(data: any): ProjectsLocationsMembershipsGenerateConnectManifestOptions {
  return {
    ...data,
    imagePullSecretContent: data["imagePullSecretContent"] !== undefined ? encodeBase64(data["imagePullSecretContent"]) : undefined,
    proxy: data["proxy"] !== undefined ? encodeBase64(data["proxy"]) : undefined,
  };
}

function deserializeProjectsLocationsMembershipsGenerateConnectManifestOptions(data: any): ProjectsLocationsMembershipsGenerateConnectManifestOptions {
  return {
    ...data,
    imagePullSecretContent: data["imagePullSecretContent"] !== undefined ? decodeBase64(data["imagePullSecretContent"] as string) : undefined,
    proxy: data["proxy"] !== undefined ? decodeBase64(data["proxy"] as string) : undefined,
  };
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsGetIamPolicy.
 */
export interface ProjectsLocationsMembershipsGetIamPolicyOptions {
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
 * Additional options for GKEHub#projectsLocationsMembershipsList.
 */
export interface ProjectsLocationsMembershipsListOptions {
  /**
   * Optional. Lists Memberships that match the filter expression, following
   * the syntax outlined in https://google.aip.dev/160. Examples: - Name is
   * `bar` in project `foo-proj` and location `global`: name =
   * "projects/foo-proj/locations/global/membership/bar" - Memberships that have
   * a label called `foo`: labels.foo:* - Memberships that have a label called
   * `foo` whose value is `bar`: labels.foo = bar - Memberships in the CREATING
   * state: state = CREATING
   */
  filter?: string;
  /**
   * Optional. One or more fields to compare and use to sort the output. See
   * https://google.aip.dev/132#ordering.
   */
  orderBy?: string;
  /**
   * Optional. When requesting a 'page' of resources, `page_size` specifies
   * number of resources to return. If unspecified or set to 0, all resources
   * will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Token returned by previous call to `ListMemberships` which
   * specifies the position in the list from where to continue listing the
   * resources.
   */
  pageToken?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsMembershipsPatch.
 */
export interface ProjectsLocationsMembershipsPatchOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsMembershipsPatchOptions(data: any): ProjectsLocationsMembershipsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsMembershipsPatchOptions(data: any): ProjectsLocationsMembershipsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for GKEHub#projectsLocationsOperationsList.
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
 * Additional options for GKEHub#projectsLocationsScopesCreate.
 */
export interface ProjectsLocationsScopesCreateOptions {
  /**
   * Required. Client chosen ID for the Scope. `scope_id` must be a ????
   */
  scopeId?: string;
}

/**
 * Additional options for GKEHub#projectsLocationsScopesList.
 */
export interface ProjectsLocationsScopesListOptions {
  /**
   * Optional. When requesting a 'page' of resources, `page_size` specifies
   * number of resources to return. If unspecified or set to 0, all resources
   * will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Token returned by previous call to `ListScopes` which specifies
   * the position in the list from where to continue listing the resources.
   */
  pageToken?: string;
}

/**
 * ResourceManifest represents a single Kubernetes resource to be applied to
 * the cluster.
 */
export interface ResourceManifest {
  /**
   * Whether the resource provided in the manifest is `cluster_scoped`. If
   * unset, the manifest is assumed to be namespace scoped. This field is used
   * for REST mapping when applying the resource in a cluster.
   */
  clusterScoped?: boolean;
  /**
   * YAML manifest of the resource.
   */
  manifest?: string;
}

/**
 * ResourceOptions represent options for Kubernetes resource generation.
 */
export interface ResourceOptions {
  /**
   * Optional. The Connect agent version to use for connect_resources. Defaults
   * to the latest GKE Connect version. The version must be a currently
   * supported version, obsolete versions will be rejected.
   */
  connectVersion?: string;
  /**
   * Optional. Major version of the Kubernetes cluster. This is only used to
   * determine which version to use for the CustomResourceDefinition resources,
   * `apiextensions/v1beta1` or`apiextensions/v1`.
   */
  k8sVersion?: string;
  /**
   * Optional. Use `apiextensions/v1beta1` instead of `apiextensions/v1` for
   * CustomResourceDefinition resources. This option should be set for clusters
   * with Kubernetes apiserver versions <1.16.
   */
  v1beta1Crd?: boolean;
}

/**
 * Scope represents a Scope in a Fleet.
 */
export interface Scope {
  /**
   * Output only. When the scope was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. When the scope was deleted.
   */
  readonly deleteTime?: Date;
  /**
   * The resource name for the scope
   * `projects/{project}/locations/{location}/scopes/{scope}`
   */
  name?: string;
  /**
   * Output only. State of the scope resource.
   */
  readonly state?: ScopeLifecycleState;
  /**
   * Output only. Google-generated UUID for this resource. This is unique
   * across all scope resources. If a scope resource is deleted and another
   * resource with the same name is created, it gets a different uid.
   */
  readonly uid?: string;
  /**
   * Output only. When the scope was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * ScopeFeatureSpec contains feature specs for a fleet scope.
 */
export interface ScopeFeatureSpec {
}

/**
 * ScopeFeatureState contains Scope-wide Feature status information.
 */
export interface ScopeFeatureState {
  /**
   * Output only. The "running state" of the Feature in this Scope.
   */
  readonly state?: FeatureState;
}

/**
 * ScopeLifecycleState describes the state of a Scope resource.
 */
export interface ScopeLifecycleState {
  /**
   * Output only. The current state of the scope resource.
   */
  readonly code?:  | "CODE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING";
}

/**
 * Status of control plane management.
 */
export interface ServiceMeshControlPlaneManagement {
  /**
   * Explanation of state.
   */
  details?: ServiceMeshStatusDetails[];
  /**
   * LifecycleState of control plane management.
   */
  state?:  | "LIFECYCLE_STATE_UNSPECIFIED" | "DISABLED" | "FAILED_PRECONDITION" | "PROVISIONING" | "ACTIVE" | "STALLED" | "NEEDS_ATTENTION" | "DEGRADED";
}

/**
 * Status of data plane management. Only reported per-member.
 */
export interface ServiceMeshDataPlaneManagement {
  /**
   * Explanation of the status.
   */
  details?: ServiceMeshStatusDetails[];
  /**
   * Lifecycle status of data plane management.
   */
  state?:  | "LIFECYCLE_STATE_UNSPECIFIED" | "DISABLED" | "FAILED_PRECONDITION" | "PROVISIONING" | "ACTIVE" | "STALLED" | "NEEDS_ATTENTION" | "DEGRADED";
}

/**
 * **Service Mesh**: Spec for a single Membership for the servicemesh feature
 */
export interface ServiceMeshMembershipSpec {
  /**
   * Enables automatic control plane management.
   */
  controlPlane?:  | "CONTROL_PLANE_MANAGEMENT_UNSPECIFIED" | "AUTOMATIC" | "MANUAL";
  /**
   * Enables automatic Service Mesh management.
   */
  management?:  | "MANAGEMENT_UNSPECIFIED" | "MANAGEMENT_AUTOMATIC" | "MANAGEMENT_MANUAL";
}

/**
 * **Service Mesh**: State for a single Membership, as analyzed by the Service
 * Mesh Hub Controller.
 */
export interface ServiceMeshMembershipState {
  /**
   * Output only. Status of control plane management
   */
  readonly controlPlaneManagement?: ServiceMeshControlPlaneManagement;
  /**
   * Output only. Status of data plane management.
   */
  readonly dataPlaneManagement?: ServiceMeshDataPlaneManagement;
}

/**
 * Structured and human-readable details for a status.
 */
export interface ServiceMeshStatusDetails {
  /**
   * A machine-readable code that further describes a broad status.
   */
  code?: string;
  /**
   * Human-readable explanation of code.
   */
  details?: string;
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
 * Status specifies state for the subcomponent.
 */
export interface Status {
  /**
   * Code specifies AppDevExperienceFeature's subcomponent ready state.
   */
  code?:  | "CODE_UNSPECIFIED" | "OK" | "FAILED" | "UNKNOWN";
  /**
   * Description is populated if Code is Failed, explaining why it has failed.
   */
  description?: string;
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
 * TypeMeta is the type information needed for content unmarshalling of
 * Kubernetes resources in the manifest.
 */
export interface TypeMeta {
  /**
   * APIVersion of the resource (e.g. v1).
   */
  apiVersion?: string;
  /**
   * Kind of the resource (e.g. Deployment).
   */
  kind?: string;
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
