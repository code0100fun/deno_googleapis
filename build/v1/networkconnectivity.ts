// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Network Connectivity API Client for Deno
 * ========================================
 * 
 * This API enables connectivity with and between Google Cloud resources.
 * 
 * Docs: https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * This API enables connectivity with and between Google Cloud resources.
 */
export class NetworkConnectivity {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://networkconnectivity.googleapis.com/") {
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
   * Creates a new Network Connectivity Center hub in the specified project.
   *
   * @param parent Required. The parent resource.
   */
  async projectsLocationsGlobalHubsCreate(parent: string, req: Hub, opts: ProjectsLocationsGlobalHubsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hubs`);
    if (opts.hubId !== undefined) {
      url.searchParams.append("hubId", String(opts.hubId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a Network Connectivity Center hub.
   *
   * @param name Required. The name of the hub to delete.
   */
  async projectsLocationsGlobalHubsDelete(name: string, opts: ProjectsLocationsGlobalHubsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details about a Network Connectivity Center hub.
   *
   * @param name Required. The name of the hub resource to get.
   */
  async projectsLocationsGlobalHubsGet(name: string): Promise<Hub> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Hub;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalHubsGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalHubsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists the Network Connectivity Center hubs associated with a given
   * project.
   *
   * @param parent Required. The parent resource's name.
   */
  async projectsLocationsGlobalHubsList(parent: string, opts: ProjectsLocationsGlobalHubsListOptions = {}): Promise<ListHubsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hubs`);
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
    return data as ListHubsResponse;
  }

  /**
   * Updates the description and/or labels of a Network Connectivity Center
   * hub.
   *
   * @param name Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}`
   */
  async projectsLocationsGlobalHubsPatch(name: string, req: Hub, opts: ProjectsLocationsGlobalHubsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsGlobalHubsPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalHubsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGlobalHubsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalPolicyBasedRoutesGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalPolicyBasedRoutesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalPolicyBasedRoutesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGlobalPolicyBasedRoutesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new internal range in a given project and location.
   *
   * @param parent Required. The parent resource's name of the internal range.
   */
  async projectsLocationsInternalRangesCreate(parent: string, req: InternalRange, opts: ProjectsLocationsInternalRangesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeInternalRange(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/internalRanges`);
    if (opts.internalRangeId !== undefined) {
      url.searchParams.append("internalRangeId", String(opts.internalRangeId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a single internal range.
   *
   * @param name Required. The name of the internal range to delete.
   */
  async projectsLocationsInternalRangesDelete(name: string, opts: ProjectsLocationsInternalRangesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single internal range.
   *
   * @param name Required. Name of the InternalRange to get.
   */
  async projectsLocationsInternalRangesGet(name: string): Promise<InternalRange> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInternalRange(data);
  }

  /**
   * Lists internal ranges in a given project and location.
   *
   * @param parent Required. The parent resource's name.
   */
  async projectsLocationsInternalRangesList(parent: string, opts: ProjectsLocationsInternalRangesListOptions = {}): Promise<ListInternalRangesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/internalRanges`);
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
    return deserializeListInternalRangesResponse(data);
  }

  /**
   * Updates the parameters of a single internal range.
   *
   * @param name Immutable. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names
   */
  async projectsLocationsInternalRangesPatch(name: string, req: InternalRange, opts: ProjectsLocationsInternalRangesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeInternalRange(req);
    opts = serializeProjectsLocationsInternalRangesPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
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
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceClassesGetIamPolicy(resource: string, opts: ProjectsLocationsServiceClassesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceClassesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsServiceClassesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceConnectionMapsGetIamPolicy(resource: string, opts: ProjectsLocationsServiceConnectionMapsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceConnectionMapsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsServiceConnectionMapsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceConnectionPoliciesGetIamPolicy(resource: string, opts: ProjectsLocationsServiceConnectionPoliciesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceConnectionPoliciesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsServiceConnectionPoliciesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a Network Connectivity Center spoke.
   *
   * @param parent Required. The parent resource.
   */
  async projectsLocationsSpokesCreate(parent: string, req: Spoke, opts: ProjectsLocationsSpokesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/spokes`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.spokeId !== undefined) {
      url.searchParams.append("spokeId", String(opts.spokeId));
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
   * Deletes a Network Connectivity Center spoke.
   *
   * @param name Required. The name of the spoke to delete.
   */
  async projectsLocationsSpokesDelete(name: string, opts: ProjectsLocationsSpokesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details about a Network Connectivity Center spoke.
   *
   * @param name Required. The name of the spoke resource.
   */
  async projectsLocationsSpokesGet(name: string): Promise<Spoke> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Spoke;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsSpokesGetIamPolicy(resource: string, opts: ProjectsLocationsSpokesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists the Network Connectivity Center spokes in a specified project and
   * location.
   *
   * @param parent Required. The parent resource.
   */
  async projectsLocationsSpokesList(parent: string, opts: ProjectsLocationsSpokesListOptions = {}): Promise<ListSpokesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/spokes`);
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
    return data as ListSpokesResponse;
  }

  /**
   * Updates the parameters of a Network Connectivity Center spoke.
   *
   * @param name Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}`
   */
  async projectsLocationsSpokesPatch(name: string, req: Spoke, opts: ProjectsLocationsSpokesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsSpokesPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsSpokesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsSpokesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
 * A Network Connectivity Center hub is a global management resource to which
 * you attach spokes. A single hub can contain spokes from multiple regions.
 * However, if any of a hub's spokes use the site-to-site data transfer feature,
 * the resources associated with those spokes must all be in the same VPC
 * network. Spokes that do not use site-to-site data transfer can be associated
 * with any VPC network in your project.
 */
export interface Hub {
  /**
   * Output only. The time the hub was created.
   */
  readonly createTime?: Date;
  /**
   * An optional description of the hub.
   */
  description?: string;
  /**
   * Optional labels in key:value format. For more information about labels,
   * see [Requirements for
   * labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The name of the hub. Hub names must be unique. They use the
   * following form: `projects/{project_number}/locations/global/hubs/{hub_id}`
   */
  name?: string;
  /**
   * The VPC networks associated with this hub's spokes. This field is
   * read-only. Network Connectivity Center automatically populates it based on
   * the set of spokes attached to the hub.
   */
  routingVpcs?: RoutingVPC[];
  /**
   * Output only. The current lifecycle state of this hub.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
  /**
   * Output only. The Google-generated UUID for the hub. This value is unique
   * across all hub resources. If a hub is deleted and another with the same
   * name is created, the new hub is assigned a different unique_id.
   */
  readonly uniqueId?: string;
  /**
   * Output only. The time the hub was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * The internal range resource for IPAM operations within a VPC network. Used
 * to represent a private address range along with behavioral characterstics of
 * that range (its usage and peering behavior). Networking resources can link to
 * this range if they are created as belonging to it.
 */
export interface InternalRange {
  /**
   * Time when the internal range was created.
   */
  createTime?: Date;
  /**
   * A description of this resource.
   */
  description?: string;
  /**
   * The IP range that this internal range defines.
   */
  ipCidrRange?: string;
  /**
   * User-defined labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The name of an internal range. Format:
   * projects/{project}/locations/{location}/internalRanges/{internal_range}
   * See: https://google.aip.dev/122#fields-representing-resource-names
   */
  name?: string;
  /**
   * The URL or resource ID of the network in which to reserve the internal
   * range. The network cannot be deleted if there are any reserved internal
   * ranges referring to it. Legacy networks are not supported. This can only be
   * specified for a global internal address. Example: - URL:
   * /compute/v1/projects/{project}/global/networks/{resourceId} - ID:
   * network123
   */
  network?: string;
  /**
   * Optional. Types of resources that are allowed to overlap with the current
   * internal range.
   */
  overlaps?:  | "OVERLAP_UNSPECIFIED" | "OVERLAP_ROUTE_RANGE"[];
  /**
   * The type of peering set for this internal range.
   */
  peering?:  | "PEERING_UNSPECIFIED" | "FOR_SELF" | "FOR_PEER" | "NOT_SHARED";
  /**
   * An alternate to ip_cidr_range. Can be set when trying to create a
   * reservation that automatically finds a free range of the given size. If
   * both ip_cidr_range and prefix_length are set, there is an error if the
   * range sizes do not match. Can also be used during updates to change the
   * range size.
   */
  prefixLength?: number;
  /**
   * Optional. Can be set to narrow down or pick a different address space
   * while searching for a free range. If not set, defaults to the "10.0.0.0/8"
   * address space. This can be used to search in other rfc-1918 address spaces
   * like "172.16.0.0/12" and "192.168.0.0/16" or non-rfc-1918 address spaces
   * used in the VPC.
   */
  targetCidrRange?: string[];
  /**
   * Time when the internal range was updated.
   */
  updateTime?: Date;
  /**
   * The type of usage set for this InternalRange.
   */
  usage?:  | "USAGE_UNSPECIFIED" | "FOR_VPC" | "EXTERNAL_TO_VPC";
  /**
   * Output only. The list of resources that refer to this internal range.
   * Resources that use the internal range for their range allocation are
   * referred to as users of the range. Other resources mark themselves as users
   * while doing so by creating a reference to this internal range. Having a
   * user, based on this reference, prevents deletion of the internal range
   * referred to. Can be empty.
   */
  readonly users?: string[];
}

function serializeInternalRange(data: any): InternalRange {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeInternalRange(data: any): InternalRange {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A collection of VLAN attachment resources. These resources should be
 * redundant attachments that all advertise the same prefixes to Google Cloud.
 * Alternatively, in active/passive configurations, all attachments should be
 * capable of advertising the same prefixes.
 */
export interface LinkedInterconnectAttachments {
  /**
   * A value that controls whether site-to-site data transfer is enabled for
   * these resources. Data transfer is available only in [supported
   * locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).
   */
  siteToSiteDataTransfer?: boolean;
  /**
   * The URIs of linked interconnect attachment resources
   */
  uris?: string[];
  /**
   * Output only. The VPC network where these VLAN attachments are located.
   */
  readonly vpcNetwork?: string;
}

/**
 * A collection of router appliance instances. If you configure multiple router
 * appliance instances to receive data from the same set of sites outside of
 * Google Cloud, we recommend that you associate those instances with the same
 * spoke.
 */
export interface LinkedRouterApplianceInstances {
  /**
   * The list of router appliance instances.
   */
  instances?: RouterApplianceInstance[];
  /**
   * A value that controls whether site-to-site data transfer is enabled for
   * these resources. Data transfer is available only in [supported
   * locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).
   */
  siteToSiteDataTransfer?: boolean;
  /**
   * Output only. The VPC network where these router appliance instances are
   * located.
   */
  readonly vpcNetwork?: string;
}

/**
 * A collection of Cloud VPN tunnel resources. These resources should be
 * redundant HA VPN tunnels that all advertise the same prefixes to Google
 * Cloud. Alternatively, in a passive/active configuration, all tunnels should
 * be capable of advertising the same prefixes.
 */
export interface LinkedVpnTunnels {
  /**
   * A value that controls whether site-to-site data transfer is enabled for
   * these resources. Data transfer is available only in [supported
   * locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).
   */
  siteToSiteDataTransfer?: boolean;
  /**
   * The URIs of linked VPN tunnel resources.
   */
  uris?: string[];
  /**
   * Output only. The VPC network where these VPN tunnels are located.
   */
  readonly vpcNetwork?: string;
}

/**
 * Response for HubService.ListHubs method.
 */
export interface ListHubsResponse {
  /**
   * The requested hubs.
   */
  hubs?: Hub[];
  /**
   * The next pagination token in the List response. It should be used as
   * page_token for the following request. An empty value means no more result.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response for InternalRange.ListInternalRanges
 */
export interface ListInternalRangesResponse {
  /**
   * Internal ranges to be returned.
   */
  internalRanges?: InternalRange[];
  /**
   * The next pagination token in the List response. It should be used as
   * page_token for the following request. An empty value means no more result.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListInternalRangesResponse(data: any): ListInternalRangesResponse {
  return {
    ...data,
    internalRanges: data["internalRanges"] !== undefined ? data["internalRanges"].map((item: any) => (serializeInternalRange(item))) : undefined,
  };
}

function deserializeListInternalRangesResponse(data: any): ListInternalRangesResponse {
  return {
    ...data,
    internalRanges: data["internalRanges"] !== undefined ? data["internalRanges"].map((item: any) => (deserializeInternalRange(item))) : undefined,
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
 * The response for HubService.ListSpokes.
 */
export interface ListSpokesResponse {
  /**
   * The next pagination token in the List response. It should be used as
   * page_token for the following request. An empty value means no more result.
   */
  nextPageToken?: string;
  /**
   * The requested spokes.
   */
  spokes?: Spoke[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * Metadata about locations
 */
export interface LocationMetadata {
  /**
   * List of supported features
   */
  locationFeatures?:  | "LOCATION_FEATURE_UNSPECIFIED" | "SITE_TO_CLOUD_SPOKES" | "SITE_TO_SITE_SPOKES"[];
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
   * operation. Operations that have been cancelled successfully have
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
 * Additional options for
 * NetworkConnectivity#projectsLocationsGlobalHubsCreate.
 */
export interface ProjectsLocationsGlobalHubsCreateOptions {
  /**
   * Required. A unique identifier for the hub.
   */
  hubId?: string;
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsGlobalHubsDelete.
 */
export interface ProjectsLocationsGlobalHubsDeleteOptions {
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsGlobalHubsGetIamPolicy.
 */
export interface ProjectsLocationsGlobalHubsGetIamPolicyOptions {
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
 * Additional options for NetworkConnectivity#projectsLocationsGlobalHubsList.
 */
export interface ProjectsLocationsGlobalHubsListOptions {
  /**
   * An expression that filters the results listed in the response.
   */
  filter?: string;
  /**
   * Sort the results by a certain order.
   */
  orderBy?: string;
  /**
   * The maximum number of results per page to return.
   */
  pageSize?: number;
  /**
   * The page token.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkConnectivity#projectsLocationsGlobalHubsPatch.
 */
export interface ProjectsLocationsGlobalHubsPatchOptions {
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. In the case of an update to an existing hub, field mask is used
   * to specify the fields to be overwritten. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field is
   * overwritten if it is in the mask. If the user does not provide a mask, then
   * all fields are overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalHubsPatchOptions(data: any): ProjectsLocationsGlobalHubsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalHubsPatchOptions(data: any): ProjectsLocationsGlobalHubsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsGlobalPolicyBasedRoutesGetIamPolicy.
 */
export interface ProjectsLocationsGlobalPolicyBasedRoutesGetIamPolicyOptions {
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
 * NetworkConnectivity#projectsLocationsInternalRangesCreate.
 */
export interface ProjectsLocationsInternalRangesCreateOptions {
  /**
   * Optional. Resource ID (i.e. 'foo' in
   * '[...]/projects/p/locations/l/internalRanges/foo') See
   * https://google.aip.dev/122#resource-id-segments Unique per location.
   */
  internalRangeId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and t he
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsInternalRangesDelete.
 */
export interface ProjectsLocationsInternalRangesDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and t he
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsInternalRangesList.
 */
export interface ProjectsLocationsInternalRangesListOptions {
  /**
   * A filter expression that filters the results listed in the response.
   */
  filter?: string;
  /**
   * Sort the results by a certain order.
   */
  orderBy?: string;
  /**
   * The maximum number of results per page that should be returned.
   */
  pageSize?: number;
  /**
   * The page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsInternalRangesPatch.
 */
export interface ProjectsLocationsInternalRangesPatchOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and t he
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the InternalRange resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsInternalRangesPatchOptions(data: any): ProjectsLocationsInternalRangesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsInternalRangesPatchOptions(data: any): ProjectsLocationsInternalRangesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkConnectivity#projectsLocationsList.
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
 * Additional options for NetworkConnectivity#projectsLocationsOperationsList.
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
 * NetworkConnectivity#projectsLocationsServiceClassesGetIamPolicy.
 */
export interface ProjectsLocationsServiceClassesGetIamPolicyOptions {
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
 * NetworkConnectivity#projectsLocationsServiceConnectionMapsGetIamPolicy.
 */
export interface ProjectsLocationsServiceConnectionMapsGetIamPolicyOptions {
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
 * NetworkConnectivity#projectsLocationsServiceConnectionPoliciesGetIamPolicy.
 */
export interface ProjectsLocationsServiceConnectionPoliciesGetIamPolicyOptions {
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
 * Additional options for NetworkConnectivity#projectsLocationsSpokesCreate.
 */
export interface ProjectsLocationsSpokesCreateOptions {
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Unique id for the spoke to create.
   */
  spokeId?: string;
}

/**
 * Additional options for NetworkConnectivity#projectsLocationsSpokesDelete.
 */
export interface ProjectsLocationsSpokesDeleteOptions {
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * NetworkConnectivity#projectsLocationsSpokesGetIamPolicy.
 */
export interface ProjectsLocationsSpokesGetIamPolicyOptions {
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
 * Additional options for NetworkConnectivity#projectsLocationsSpokesList.
 */
export interface ProjectsLocationsSpokesListOptions {
  /**
   * An expression that filters the results listed in the response.
   */
  filter?: string;
  /**
   * Sort the results by a certain order.
   */
  orderBy?: string;
  /**
   * The maximum number of results to return per page.
   */
  pageSize?: number;
  /**
   * The page token.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkConnectivity#projectsLocationsSpokesPatch.
 */
export interface ProjectsLocationsSpokesPatchOptions {
  /**
   * Optional. A unique request ID (optional). If you specify this ID, you can
   * use it in cases when you need to retry your request. When you need to
   * retry, this ID lets the server know that it can ignore the request if it
   * has already been completed. The server guarantees that for at least 60
   * minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check to see whether
   * the original operation was received. If it was, the server ignores the
   * second request. This behavior prevents clients from mistakenly creating
   * duplicate commitments. The request ID must be a valid UUID, with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. In the case of an update to an existing spoke, field mask is
   * used to specify the fields to be overwritten. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field is
   * overwritten if it is in the mask. If the user does not provide a mask, then
   * all fields are overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSpokesPatchOptions(data: any): ProjectsLocationsSpokesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSpokesPatchOptions(data: any): ProjectsLocationsSpokesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A router appliance instance is a Compute Engine virtual machine (VM)
 * instance that acts as a BGP speaker. A router appliance instance is specified
 * by the URI of the VM and the internal IP address of one of the VM's network
 * interfaces.
 */
export interface RouterApplianceInstance {
  /**
   * The IP address on the VM to use for peering.
   */
  ipAddress?: string;
  /**
   * The URI of the VM.
   */
  virtualMachine?: string;
}

/**
 * RoutingVPC contains information about the VPC networks associated with the
 * spokes of a Network Connectivity Center hub.
 */
export interface RoutingVPC {
  /**
   * Output only. If true, indicates that this VPC network is currently
   * associated with spokes that use the data transfer feature (spokes where the
   * site_to_site_data_transfer field is set to true). If you create new spokes
   * that use data transfer, they must be associated with this VPC network. At
   * most, one VPC network will have this field set to true.
   */
  readonly requiredForNewSiteToSiteDataTransferSpokes?: boolean;
  /**
   * The URI of the VPC network.
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
 * A Network Connectivity Center spoke represents one or more network
 * connectivity resources. When you create a spoke, you associate it with a hub.
 * You must also identify a value for exactly one of the following fields: *
 * linked_vpn_tunnels * linked_interconnect_attachments *
 * linked_router_appliance_instances
 */
export interface Spoke {
  /**
   * Output only. The time the spoke was created.
   */
  readonly createTime?: Date;
  /**
   * An optional description of the spoke.
   */
  description?: string;
  /**
   * Immutable. The name of the hub that this spoke is attached to.
   */
  hub?: string;
  /**
   * Optional labels in key:value format. For more information about labels,
   * see [Requirements for
   * labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).
   */
  labels?: {
    [key: string]: string
  };
  /**
   * VLAN attachments that are associated with the spoke.
   */
  linkedInterconnectAttachments?: LinkedInterconnectAttachments;
  /**
   * Router appliance instances that are associated with the spoke.
   */
  linkedRouterApplianceInstances?: LinkedRouterApplianceInstances;
  /**
   * VPN tunnels that are associated with the spoke.
   */
  linkedVpnTunnels?: LinkedVpnTunnels;
  /**
   * Immutable. The name of the spoke. Spoke names must be unique. They use the
   * following form:
   * `projects/{project_number}/locations/{region}/spokes/{spoke_id}`
   */
  name?: string;
  /**
   * Output only. The current lifecycle state of this spoke.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
  /**
   * Output only. The Google-generated UUID for the spoke. This value is unique
   * across all spoke resources. If a spoke is deleted and another with the same
   * name is created, the new spoke is assigned a different unique_id.
   */
  readonly uniqueId?: string;
  /**
   * Output only. The time the spoke was last updated.
   */
  readonly updateTime?: Date;
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
