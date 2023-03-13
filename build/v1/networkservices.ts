// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Network Services API Client for Deno
 * ====================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/networking
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class NetworkServices {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://networkservices.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEdgeCacheKeysetsGetIamPolicy(resource: string, opts: ProjectsLocationsEdgeCacheKeysetsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsEdgeCacheKeysetsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEdgeCacheKeysetsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsEdgeCacheOriginsGetIamPolicy(resource: string, opts: ProjectsLocationsEdgeCacheOriginsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsEdgeCacheOriginsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEdgeCacheOriginsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsEdgeCacheServicesGetIamPolicy(resource: string, opts: ProjectsLocationsEdgeCacheServicesGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsEdgeCacheServicesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEdgeCacheServicesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new EndpointPolicy in a given project and location.
   *
   * @param parent Required. The parent resource of the EndpointPolicy. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsEndpointPoliciesCreate(parent: string, req: EndpointPolicy, opts: ProjectsLocationsEndpointPoliciesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpointPolicies`);
    if (opts.endpointPolicyId !== undefined) {
      url.searchParams.append("endpointPolicyId", String(opts.endpointPolicyId));
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
   * Deletes a single EndpointPolicy.
   *
   * @param name Required. A name of the EndpointPolicy to delete. Must be in the format `projects/*\/locations/global/endpointPolicies/*`.
   */
  async projectsLocationsEndpointPoliciesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single EndpointPolicy.
   *
   * @param name Required. A name of the EndpointPolicy to get. Must be in the format `projects/*\/locations/global/endpointPolicies/*`.
   */
  async projectsLocationsEndpointPoliciesGet(name: string): Promise<EndpointPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EndpointPolicy;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEndpointPoliciesGetIamPolicy(resource: string, opts: ProjectsLocationsEndpointPoliciesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists EndpointPolicies in a given project and location.
   *
   * @param parent Required. The project and location from which the EndpointPolicies should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsEndpointPoliciesList(parent: string, opts: ProjectsLocationsEndpointPoliciesListOptions = {}): Promise<ListEndpointPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpointPolicies`);
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
    return data as ListEndpointPoliciesResponse;
  }

  /**
   * Updates the parameters of a single EndpointPolicy.
   *
   * @param name Required. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/global/endpointPolicies/{endpoint_policy}`.
   */
  async projectsLocationsEndpointPoliciesPatch(name: string, req: EndpointPolicy, opts: ProjectsLocationsEndpointPoliciesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsEndpointPoliciesPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEndpointPoliciesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEndpointPoliciesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new Gateway in a given project and location.
   *
   * @param parent Required. The parent resource of the Gateway. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsGatewaysCreate(parent: string, req: Gateway, opts: ProjectsLocationsGatewaysCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gateways`);
    if (opts.gatewayId !== undefined) {
      url.searchParams.append("gatewayId", String(opts.gatewayId));
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
   * Deletes a single Gateway.
   *
   * @param name Required. A name of the Gateway to delete. Must be in the format `projects/*\/locations/*\/gateways/*`.
   */
  async projectsLocationsGatewaysDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Gateway.
   *
   * @param name Required. A name of the Gateway to get. Must be in the format `projects/*\/locations/*\/gateways/*`.
   */
  async projectsLocationsGatewaysGet(name: string): Promise<Gateway> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Gateway;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGatewaysGetIamPolicy(resource: string, opts: ProjectsLocationsGatewaysGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Gateways in a given project and location.
   *
   * @param parent Required. The project and location from which the Gateways should be listed, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsGatewaysList(parent: string, opts: ProjectsLocationsGatewaysListOptions = {}): Promise<ListGatewaysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gateways`);
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
    return data as ListGatewaysResponse;
  }

  /**
   * Updates the parameters of a single Gateway.
   *
   * @param name Required. Name of the Gateway resource. It matches pattern `projects/*\/locations/*\/gateways/`.
   */
  async projectsLocationsGatewaysPatch(name: string, req: Gateway, opts: ProjectsLocationsGatewaysPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGatewaysPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGatewaysSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGatewaysTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new GrpcRoute in a given project and location.
   *
   * @param parent Required. The parent resource of the GrpcRoute. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsGrpcRoutesCreate(parent: string, req: GrpcRoute, opts: ProjectsLocationsGrpcRoutesCreateOptions = {}): Promise<Operation> {
    req = serializeGrpcRoute(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/grpcRoutes`);
    if (opts.grpcRouteId !== undefined) {
      url.searchParams.append("grpcRouteId", String(opts.grpcRouteId));
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
   * Deletes a single GrpcRoute.
   *
   * @param name Required. A name of the GrpcRoute to delete. Must be in the format `projects/*\/locations/global/grpcRoutes/*`.
   */
  async projectsLocationsGrpcRoutesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single GrpcRoute.
   *
   * @param name Required. A name of the GrpcRoute to get. Must be in the format `projects/*\/locations/global/grpcRoutes/*`.
   */
  async projectsLocationsGrpcRoutesGet(name: string): Promise<GrpcRoute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGrpcRoute(data);
  }

  /**
   * Lists GrpcRoutes in a given project and location.
   *
   * @param parent Required. The project and location from which the GrpcRoutes should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsGrpcRoutesList(parent: string, opts: ProjectsLocationsGrpcRoutesListOptions = {}): Promise<ListGrpcRoutesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/grpcRoutes`);
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
    return deserializeListGrpcRoutesResponse(data);
  }

  /**
   * Updates the parameters of a single GrpcRoute.
   *
   * @param name Required. Name of the GrpcRoute resource. It matches pattern `projects/*\/locations/global/grpcRoutes/`
   */
  async projectsLocationsGrpcRoutesPatch(name: string, req: GrpcRoute, opts: ProjectsLocationsGrpcRoutesPatchOptions = {}): Promise<Operation> {
    req = serializeGrpcRoute(req);
    opts = serializeProjectsLocationsGrpcRoutesPatchOptions(opts);
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
   * Creates a new HttpRoute in a given project and location.
   *
   * @param parent Required. The parent resource of the HttpRoute. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsHttpRoutesCreate(parent: string, req: HttpRoute, opts: ProjectsLocationsHttpRoutesCreateOptions = {}): Promise<Operation> {
    req = serializeHttpRoute(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/httpRoutes`);
    if (opts.httpRouteId !== undefined) {
      url.searchParams.append("httpRouteId", String(opts.httpRouteId));
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
   * Deletes a single HttpRoute.
   *
   * @param name Required. A name of the HttpRoute to delete. Must be in the format `projects/*\/locations/global/httpRoutes/*`.
   */
  async projectsLocationsHttpRoutesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single HttpRoute.
   *
   * @param name Required. A name of the HttpRoute to get. Must be in the format `projects/*\/locations/global/httpRoutes/*`.
   */
  async projectsLocationsHttpRoutesGet(name: string): Promise<HttpRoute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpRoute(data);
  }

  /**
   * Lists HttpRoute in a given project and location.
   *
   * @param parent Required. The project and location from which the HttpRoutes should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsHttpRoutesList(parent: string, opts: ProjectsLocationsHttpRoutesListOptions = {}): Promise<ListHttpRoutesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/httpRoutes`);
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
    return deserializeListHttpRoutesResponse(data);
  }

  /**
   * Updates the parameters of a single HttpRoute.
   *
   * @param name Required. Name of the HttpRoute resource. It matches pattern `projects/*\/locations/global/httpRoutes/http_route_name>`.
   */
  async projectsLocationsHttpRoutesPatch(name: string, req: HttpRoute, opts: ProjectsLocationsHttpRoutesPatchOptions = {}): Promise<Operation> {
    req = serializeHttpRoute(req);
    opts = serializeProjectsLocationsHttpRoutesPatchOptions(opts);
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
   * Creates a new Mesh in a given project and location.
   *
   * @param parent Required. The parent resource of the Mesh. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsMeshesCreate(parent: string, req: Mesh, opts: ProjectsLocationsMeshesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/meshes`);
    if (opts.meshId !== undefined) {
      url.searchParams.append("meshId", String(opts.meshId));
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
   * Deletes a single Mesh.
   *
   * @param name Required. A name of the Mesh to delete. Must be in the format `projects/*\/locations/global/meshes/*`.
   */
  async projectsLocationsMeshesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Mesh.
   *
   * @param name Required. A name of the Mesh to get. Must be in the format `projects/*\/locations/global/meshes/*`.
   */
  async projectsLocationsMeshesGet(name: string): Promise<Mesh> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Mesh;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMeshesGetIamPolicy(resource: string, opts: ProjectsLocationsMeshesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Meshes in a given project and location.
   *
   * @param parent Required. The project and location from which the Meshes should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsMeshesList(parent: string, opts: ProjectsLocationsMeshesListOptions = {}): Promise<ListMeshesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/meshes`);
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
    return data as ListMeshesResponse;
  }

  /**
   * Updates the parameters of a single Mesh.
   *
   * @param name Required. Name of the Mesh resource. It matches pattern `projects/*\/locations/global/meshes/`.
   */
  async projectsLocationsMeshesPatch(name: string, req: Mesh, opts: ProjectsLocationsMeshesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsMeshesPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMeshesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMeshesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsMulticastConsumerAssociationsGetIamPolicy(resource: string, opts: ProjectsLocationsMulticastConsumerAssociationsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsMulticastConsumerAssociationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMulticastConsumerAssociationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsMulticastDomainActivationsGetIamPolicy(resource: string, opts: ProjectsLocationsMulticastDomainActivationsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsMulticastDomainActivationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMulticastDomainActivationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsMulticastDomainsGetIamPolicy(resource: string, opts: ProjectsLocationsMulticastDomainsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsMulticastDomainsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMulticastDomainsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsMulticastGroupDefinitionsGetIamPolicy(resource: string, opts: ProjectsLocationsMulticastGroupDefinitionsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsMulticastGroupDefinitionsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMulticastGroupDefinitionsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
  async projectsLocationsMulticastGroupsGetIamPolicy(resource: string, opts: ProjectsLocationsMulticastGroupsGetIamPolicyOptions = {}): Promise<Policy> {
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
  async projectsLocationsMulticastGroupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsMulticastGroupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new ServiceBinding in a given project and location.
   *
   * @param parent Required. The parent resource of the ServiceBinding. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsServiceBindingsCreate(parent: string, req: ServiceBinding, opts: ProjectsLocationsServiceBindingsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/serviceBindings`);
    if (opts.serviceBindingId !== undefined) {
      url.searchParams.append("serviceBindingId", String(opts.serviceBindingId));
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
   * Deletes a single ServiceBinding.
   *
   * @param name Required. A name of the ServiceBinding to delete. Must be in the format `projects/*\/locations/global/serviceBindings/*`.
   */
  async projectsLocationsServiceBindingsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single ServiceBinding.
   *
   * @param name Required. A name of the ServiceBinding to get. Must be in the format `projects/*\/locations/global/serviceBindings/*`.
   */
  async projectsLocationsServiceBindingsGet(name: string): Promise<ServiceBinding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServiceBinding;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceBindingsGetIamPolicy(resource: string, opts: ProjectsLocationsServiceBindingsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists ServiceBinding in a given project and location.
   *
   * @param parent Required. The project and location from which the ServiceBindings should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsServiceBindingsList(parent: string, opts: ProjectsLocationsServiceBindingsListOptions = {}): Promise<ListServiceBindingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/serviceBindings`);
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
    return data as ListServiceBindingsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServiceBindingsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsServiceBindingsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new TcpRoute in a given project and location.
   *
   * @param parent Required. The parent resource of the TcpRoute. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsTcpRoutesCreate(parent: string, req: TcpRoute, opts: ProjectsLocationsTcpRoutesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tcpRoutes`);
    if (opts.tcpRouteId !== undefined) {
      url.searchParams.append("tcpRouteId", String(opts.tcpRouteId));
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
   * Deletes a single TcpRoute.
   *
   * @param name Required. A name of the TcpRoute to delete. Must be in the format `projects/*\/locations/global/tcpRoutes/*`.
   */
  async projectsLocationsTcpRoutesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single TcpRoute.
   *
   * @param name Required. A name of the TcpRoute to get. Must be in the format `projects/*\/locations/global/tcpRoutes/*`.
   */
  async projectsLocationsTcpRoutesGet(name: string): Promise<TcpRoute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TcpRoute;
  }

  /**
   * Lists TcpRoute in a given project and location.
   *
   * @param parent Required. The project and location from which the TcpRoutes should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsTcpRoutesList(parent: string, opts: ProjectsLocationsTcpRoutesListOptions = {}): Promise<ListTcpRoutesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tcpRoutes`);
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
    return data as ListTcpRoutesResponse;
  }

  /**
   * Updates the parameters of a single TcpRoute.
   *
   * @param name Required. Name of the TcpRoute resource. It matches pattern `projects/*\/locations/global/tcpRoutes/tcp_route_name>`.
   */
  async projectsLocationsTcpRoutesPatch(name: string, req: TcpRoute, opts: ProjectsLocationsTcpRoutesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsTcpRoutesPatchOptions(opts);
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
   * Creates a new TlsRoute in a given project and location.
   *
   * @param parent Required. The parent resource of the TlsRoute. Must be in the format `projects/*\/locations/global`.
   */
  async projectsLocationsTlsRoutesCreate(parent: string, req: TlsRoute, opts: ProjectsLocationsTlsRoutesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tlsRoutes`);
    if (opts.tlsRouteId !== undefined) {
      url.searchParams.append("tlsRouteId", String(opts.tlsRouteId));
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
   * Deletes a single TlsRoute.
   *
   * @param name Required. A name of the TlsRoute to delete. Must be in the format `projects/*\/locations/global/tlsRoutes/*`.
   */
  async projectsLocationsTlsRoutesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single TlsRoute.
   *
   * @param name Required. A name of the TlsRoute to get. Must be in the format `projects/*\/locations/global/tlsRoutes/*`.
   */
  async projectsLocationsTlsRoutesGet(name: string): Promise<TlsRoute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TlsRoute;
  }

  /**
   * Lists TlsRoute in a given project and location.
   *
   * @param parent Required. The project and location from which the TlsRoutes should be listed, specified in the format `projects/*\/locations/global`.
   */
  async projectsLocationsTlsRoutesList(parent: string, opts: ProjectsLocationsTlsRoutesListOptions = {}): Promise<ListTlsRoutesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tlsRoutes`);
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
    return data as ListTlsRoutesResponse;
  }

  /**
   * Updates the parameters of a single TlsRoute.
   *
   * @param name Required. Name of the TlsRoute resource. It matches pattern `projects/*\/locations/global/tlsRoutes/tls_route_name>`.
   */
  async projectsLocationsTlsRoutesPatch(name: string, req: TlsRoute, opts: ProjectsLocationsTlsRoutesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsTlsRoutesPatchOptions(opts);
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * A definition of a matcher that selects endpoints to which the policies
 * should be applied.
 */
export interface EndpointMatcher {
  /**
   * The matcher is based on node metadata presented by xDS clients.
   */
  metadataLabelMatcher?: EndpointMatcherMetadataLabelMatcher;
}

/**
 * The matcher that is based on node metadata presented by xDS clients.
 */
export interface EndpointMatcherMetadataLabelMatcher {
  /**
   * Specifies how matching should be done. Supported values are: MATCH_ANY: At
   * least one of the Labels specified in the matcher should match the metadata
   * presented by xDS client. MATCH_ALL: The metadata presented by the xDS
   * client should contain all of the labels specified here. The selection is
   * determined based on the best match. For example, suppose there are three
   * EndpointPolicy resources P1, P2 and P3 and if P1 has a the matcher as
   * MATCH_ANY , P2 has MATCH_ALL , and P3 has MATCH_ALL . If a client with
   * label connects, the config from P1 will be selected. If a client with label
   * connects, the config from P2 will be selected. If a client with label
   * connects, the config from P3 will be selected. If there is more than one
   * best match, (for example, if a config P4 with selector exists and if a
   * client with label connects), an error will be thrown.
   */
  metadataLabelMatchCriteria?:  | "METADATA_LABEL_MATCH_CRITERIA_UNSPECIFIED" | "MATCH_ANY" | "MATCH_ALL";
  /**
   * The list of label value pairs that must match labels in the provided
   * metadata based on filterMatchCriteria This list can have at most 64
   * entries. The list can be empty if the match criteria is MATCH_ANY, to
   * specify a wildcard match (i.e this matches any client).
   */
  metadataLabels?: EndpointMatcherMetadataLabelMatcherMetadataLabels[];
}

/**
 * Defines a name-pair value for a single label.
 */
export interface EndpointMatcherMetadataLabelMatcherMetadataLabels {
  /**
   * Required. Label name presented as key in xDS Node Metadata.
   */
  labelName?: string;
  /**
   * Required. Label value presented as value corresponding to the above key,
   * in xDS Node Metadata.
   */
  labelValue?: string;
}

/**
 * EndpointPolicy is a resource that helps apply desired configuration on the
 * endpoints that match specific criteria. For example, this resource can be
 * used to apply "authentication config" an all endpoints that serve on port
 * 8080.
 */
export interface EndpointPolicy {
  /**
   * Optional. This field specifies the URL of AuthorizationPolicy resource
   * that applies authorization policies to the inbound traffic at the matched
   * endpoints. Refer to Authorization. If this field is not specified,
   * authorization is disabled(no authz checks) for this endpoint.
   */
  authorizationPolicy?: string;
  /**
   * Optional. A URL referring to a ClientTlsPolicy resource. ClientTlsPolicy
   * can be set to specify the authentication for traffic from the proxy to the
   * actual endpoints. More specifically, it is applied to the outgoing traffic
   * from the proxy to the endpoint. This is typically used for sidecar model
   * where the proxy identifies itself as endpoint to the control plane, with
   * the connection between sidecar and endpoint requiring authentication. If
   * this field is not set, authentication is disabled(open). Applicable only
   * when EndpointPolicyType is SIDECAR_PROXY.
   */
  clientTlsPolicy?: string;
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Required. A matcher that selects endpoints to which the policies should be
   * applied.
   */
  endpointMatcher?: EndpointMatcher;
  /**
   * Optional. Set of label tags associated with the EndpointPolicy resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Name of the EndpointPolicy resource. It matches pattern
   * `projects/{project}/locations/global/endpointPolicies/{endpoint_policy}`.
   */
  name?: string;
  /**
   * Optional. A URL referring to ServerTlsPolicy resource. ServerTlsPolicy is
   * used to determine the authentication policy to be applied to terminate the
   * inbound traffic at the identified backends. If this field is not set,
   * authentication is disabled(open) for this endpoint.
   */
  serverTlsPolicy?: string;
  /**
   * Optional. Port selector for the (matched) endpoints. If no port selector
   * is provided, the matched config is applied to all ports.
   */
  trafficPortSelector?: TrafficPortSelector;
  /**
   * Required. The type of endpoint policy. This is primarily used to validate
   * the configuration.
   */
  type?:  | "ENDPOINT_POLICY_TYPE_UNSPECIFIED" | "SIDECAR_PROXY" | "GRPC_SERVER";
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
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
 * Gateway represents the configuration for a proxy, typically a load balancer.
 * It captures the ip:port over which the services are exposed by the proxy,
 * along with any policy configurations. Routes have reference to to Gateways to
 * dictate how requests should be routed by this Gateway.
 */
export interface Gateway {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Set of label tags associated with the Gateway resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Name of the Gateway resource. It matches pattern
   * `projects/*\/locations/*\/gateways/`.
   */
  name?: string;
  /**
   * Required. One or more port numbers (1-65535), on which the Gateway will
   * receive traffic. The proxy binds to the specified ports. Gateways of type
   * 'SECURE_WEB_GATEWAY' are limited to 1 port. Gateways of type 'OPEN_MESH'
   * listen on 0.0.0.0 and support multiple ports.
   */
  ports?: number[];
  /**
   * Optional. Scope determines how configuration across multiple Gateway
   * instances are merged. The configuration for multiple Gateway instances with
   * the same scope will be merged as presented as a single coniguration to the
   * proxy/load balancer. Max length 64 characters. Scope should start with a
   * letter and can only have letters, numbers, hyphens.
   */
  scope?: string;
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Optional. A fully-qualified ServerTLSPolicy URL reference. Specifies how
   * TLS traffic is terminated. If empty, TLS termination is disabled.
   */
  serverTlsPolicy?: string;
  /**
   * Immutable. The type of the customer managed gateway. This field is
   * required. If unspecified, an error is returned.
   */
  type?:  | "TYPE_UNSPECIFIED" | "OPEN_MESH" | "SECURE_WEB_GATEWAY";
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
}

/**
 * GrpcRoute is the resource defining how gRPC traffic routed by a Mesh or
 * Gateway resource is routed.
 */
export interface GrpcRoute {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Gateways defines a list of gateways this GrpcRoute is attached
   * to, as one of the routing rules to route the requests served by the
   * gateway. Each gateway reference should match the pattern:
   * `projects/*\/locations/global/gateways/`
   */
  gateways?: string[];
  /**
   * Required. Service hostnames with an optional port for which this route
   * describes traffic. Format: [:] Hostname is the fully qualified domain name
   * of a network host. This matches the RFC 1123 definition of a hostname with
   * 2 notable exceptions: - IPs are not allowed. - A hostname may be prefixed
   * with a wildcard label (*.). The wildcard label must appear by itself as the
   * first label. Hostname can be "precise" which is a domain name without the
   * terminating dot of a network host (e.g. "foo.example.com") or "wildcard",
   * which is a domain name prefixed with a single wildcard label (e.g.
   * *.example.com). Note that as per RFC1035 and RFC1123, a label must consist
   * of lower case alphanumeric characters or '-', and must start and end with
   * an alphanumeric character. No other punctuation is allowed. The routes
   * associated with a Mesh or Gateway must have unique hostnames. If you
   * attempt to attach multiple routes with conflicting hostnames, the
   * configuration will be rejected. For example, while it is acceptable for
   * routes for the hostnames "*.foo.bar.com" and "*.bar.com" to be associated
   * with the same route, it is not possible to associate two routes both with
   * "*.bar.com" or both with "bar.com". If a port is specified, then gRPC
   * clients must use the channel URI with the port to match this rule (i.e.
   * "xds:///service:123"), otherwise they must supply the URI without a port
   * (i.e. "xds:///service").
   */
  hostnames?: string[];
  /**
   * Optional. Set of label tags associated with the GrpcRoute resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Meshes defines a list of meshes this GrpcRoute is attached to,
   * as one of the routing rules to route the requests served by the mesh. Each
   * mesh reference should match the pattern:
   * `projects/*\/locations/global/meshes/`
   */
  meshes?: string[];
  /**
   * Required. Name of the GrpcRoute resource. It matches pattern
   * `projects/*\/locations/global/grpcRoutes/`
   */
  name?: string;
  /**
   * Required. A list of detailed rules defining how to route traffic. Within a
   * single GrpcRoute, the GrpcRoute.RouteAction associated with the first
   * matching GrpcRoute.RouteRule will be executed. At least one rule must be
   * supplied.
   */
  rules?: GrpcRouteRouteRule[];
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
}

function serializeGrpcRoute(data: any): GrpcRoute {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeGrpcRouteRouteRule(item))) : undefined,
  };
}

function deserializeGrpcRoute(data: any): GrpcRoute {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeGrpcRouteRouteRule(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The destination to which traffic will be routed.
 */
export interface GrpcRouteDestination {
  /**
   * Required. The URL of a destination service to which to route traffic. Must
   * refer to either a BackendService or ServiceDirectoryService.
   */
  serviceName?: string;
  /**
   * Optional. Specifies the proportion of requests forwarded to the backend
   * referenced by the serviceName field. This is computed as:
   * weight/Sum(weights in this destination list). For non-zero values, there
   * may be some epsilon from the exact proportion defined here depending on the
   * precision an implementation supports. If only one serviceName is specified
   * and it has a weight greater than 0, 100% of the traffic is forwarded to
   * that backend. If weights are specified for any one service name, they need
   * to be specified for all of them. If weights are unspecified for all
   * services, then, traffic is distributed in equal proportions to all of them.
   */
  weight?: number;
}

/**
 * The specification for fault injection introduced into traffic to test the
 * resiliency of clients to destination service failure. As part of fault
 * injection, when clients send requests to a destination, delays can be
 * introduced on a percentage of requests before sending those requests to the
 * destination service. Similarly requests from clients can be aborted by for a
 * percentage of requests.
 */
export interface GrpcRouteFaultInjectionPolicy {
  /**
   * The specification for aborting to client requests.
   */
  abort?: GrpcRouteFaultInjectionPolicyAbort;
  /**
   * The specification for injecting delay to client requests.
   */
  delay?: GrpcRouteFaultInjectionPolicyDelay;
}

function serializeGrpcRouteFaultInjectionPolicy(data: any): GrpcRouteFaultInjectionPolicy {
  return {
    ...data,
    delay: data["delay"] !== undefined ? serializeGrpcRouteFaultInjectionPolicyDelay(data["delay"]) : undefined,
  };
}

function deserializeGrpcRouteFaultInjectionPolicy(data: any): GrpcRouteFaultInjectionPolicy {
  return {
    ...data,
    delay: data["delay"] !== undefined ? deserializeGrpcRouteFaultInjectionPolicyDelay(data["delay"]) : undefined,
  };
}

/**
 * Specification of how client requests are aborted as part of fault injection
 * before being sent to a destination.
 */
export interface GrpcRouteFaultInjectionPolicyAbort {
  /**
   * The HTTP status code used to abort the request. The value must be between
   * 200 and 599 inclusive.
   */
  httpStatus?: number;
  /**
   * The percentage of traffic which will be aborted. The value must be between
   * [0, 100]
   */
  percentage?: number;
}

/**
 * Specification of how client requests are delayed as part of fault injection
 * before being sent to a destination.
 */
export interface GrpcRouteFaultInjectionPolicyDelay {
  /**
   * Specify a fixed delay before forwarding the request.
   */
  fixedDelay?: number /* Duration */;
  /**
   * The percentage of traffic on which delay will be injected. The value must
   * be between [0, 100]
   */
  percentage?: number;
}

function serializeGrpcRouteFaultInjectionPolicyDelay(data: any): GrpcRouteFaultInjectionPolicyDelay {
  return {
    ...data,
    fixedDelay: data["fixedDelay"] !== undefined ? data["fixedDelay"] : undefined,
  };
}

function deserializeGrpcRouteFaultInjectionPolicyDelay(data: any): GrpcRouteFaultInjectionPolicyDelay {
  return {
    ...data,
    fixedDelay: data["fixedDelay"] !== undefined ? data["fixedDelay"] : undefined,
  };
}

/**
 * A match against a collection of headers.
 */
export interface GrpcRouteHeaderMatch {
  /**
   * Required. The key of the header.
   */
  key?: string;
  /**
   * Optional. Specifies how to match against the value of the header. If not
   * specified, a default value of EXACT is used.
   */
  type?:  | "TYPE_UNSPECIFIED" | "EXACT" | "REGULAR_EXPRESSION";
  /**
   * Required. The value of the header.
   */
  value?: string;
}

/**
 * Specifies a match against a method.
 */
export interface GrpcRouteMethodMatch {
  /**
   * Optional. Specifies that matches are case sensitive. The default value is
   * true. case_sensitive must not be used with a type of REGULAR_EXPRESSION.
   */
  caseSensitive?: boolean;
  /**
   * Required. Name of the method to match against. If unspecified, will match
   * all methods.
   */
  grpcMethod?: string;
  /**
   * Required. Name of the service to match against. If unspecified, will match
   * all services.
   */
  grpcService?: string;
  /**
   * Optional. Specifies how to match against the name. If not specified, a
   * default value of "EXACT" is used.
   */
  type?:  | "TYPE_UNSPECIFIED" | "EXACT" | "REGULAR_EXPRESSION";
}

/**
 * The specifications for retries.
 */
export interface GrpcRouteRetryPolicy {
  /**
   * Specifies the allowed number of retries. This number must be > 0. If not
   * specified, default to 1.
   */
  numRetries?: number;
  /**
   * - connect-failure: Router will retry on failures connecting to Backend
   * Services, for example due to connection timeouts. - refused-stream: Router
   * will retry if the backend service resets the stream with a REFUSED_STREAM
   * error code. This reset type indicates that it is safe to retry. -
   * cancelled: Router will retry if the gRPC status code in the response header
   * is set to cancelled - deadline-exceeded: Router will retry if the gRPC
   * status code in the response header is set to deadline-exceeded -
   * resource-exhausted: Router will retry if the gRPC status code in the
   * response header is set to resource-exhausted - unavailable: Router will
   * retry if the gRPC status code in the response header is set to unavailable
   */
  retryConditions?: string[];
}

/**
 * Specifies how to route matched traffic.
 */
export interface GrpcRouteRouteAction {
  /**
   * Optional. The destination services to which traffic should be forwarded.
   * If multiple destinations are specified, traffic will be split between
   * Backend Service(s) according to the weight field of these destinations.
   */
  destinations?: GrpcRouteDestination[];
  /**
   * Optional. The specification for fault injection introduced into traffic to
   * test the resiliency of clients to destination service failure. As part of
   * fault injection, when clients send requests to a destination, delays can be
   * introduced on a percentage of requests before sending those requests to the
   * destination service. Similarly requests from clients can be aborted by for
   * a percentage of requests. timeout and retry_policy will be ignored by
   * clients that are configured with a fault_injection_policy
   */
  faultInjectionPolicy?: GrpcRouteFaultInjectionPolicy;
  /**
   * Optional. Specifies the retry policy associated with this route.
   */
  retryPolicy?: GrpcRouteRetryPolicy;
  /**
   * Optional. Specifies the timeout for selected route. Timeout is computed
   * from the time the request has been fully processed (i.e. end of stream) up
   * until the response has been completely processed. Timeout includes all
   * retries.
   */
  timeout?: number /* Duration */;
}

function serializeGrpcRouteRouteAction(data: any): GrpcRouteRouteAction {
  return {
    ...data,
    faultInjectionPolicy: data["faultInjectionPolicy"] !== undefined ? serializeGrpcRouteFaultInjectionPolicy(data["faultInjectionPolicy"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGrpcRouteRouteAction(data: any): GrpcRouteRouteAction {
  return {
    ...data,
    faultInjectionPolicy: data["faultInjectionPolicy"] !== undefined ? deserializeGrpcRouteFaultInjectionPolicy(data["faultInjectionPolicy"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Criteria for matching traffic. A RouteMatch will be considered to match when
 * all supplied fields match.
 */
export interface GrpcRouteRouteMatch {
  /**
   * Optional. Specifies a collection of headers to match.
   */
  headers?: GrpcRouteHeaderMatch[];
  /**
   * Optional. A gRPC method to match against. If this field is empty or
   * omitted, will match all methods.
   */
  method?: GrpcRouteMethodMatch;
}

/**
 * Describes how to route traffic.
 */
export interface GrpcRouteRouteRule {
  /**
   * Required. A detailed rule defining how to route traffic. This field is
   * required.
   */
  action?: GrpcRouteRouteAction;
  /**
   * Optional. Matches define conditions used for matching the rule against
   * incoming gRPC requests. Each match is independent, i.e. this rule will be
   * matched if ANY one of the matches is satisfied. If no matches field is
   * specified, this rule will unconditionally match traffic.
   */
  matches?: GrpcRouteRouteMatch[];
}

function serializeGrpcRouteRouteRule(data: any): GrpcRouteRouteRule {
  return {
    ...data,
    action: data["action"] !== undefined ? serializeGrpcRouteRouteAction(data["action"]) : undefined,
  };
}

function deserializeGrpcRouteRouteRule(data: any): GrpcRouteRouteRule {
  return {
    ...data,
    action: data["action"] !== undefined ? deserializeGrpcRouteRouteAction(data["action"]) : undefined,
  };
}

/**
 * HttpRoute is the resource defining how HTTP traffic should be routed by a
 * Mesh or Gateway resource.
 */
export interface HttpRoute {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Gateways defines a list of gateways this HttpRoute is attached
   * to, as one of the routing rules to route the requests served by the
   * gateway. Each gateway reference should match the pattern:
   * `projects/*\/locations/global/gateways/`
   */
  gateways?: string[];
  /**
   * Required. Hostnames define a set of hosts that should match against the
   * HTTP host header to select a HttpRoute to process the request. Hostname is
   * the fully qualified domain name of a network host, as defined by RFC 1123
   * with the exception that: - IPs are not allowed. - A hostname may be
   * prefixed with a wildcard label (*.). The wildcard label must appear by
   * itself as the first label. Hostname can be "precise" which is a domain name
   * without the terminating dot of a network host (e.g. "foo.example.com") or
   * "wildcard", which is a domain name prefixed with a single wildcard label
   * (e.g. *.example.com). Note that as per RFC1035 and RFC1123, a label must
   * consist of lower case alphanumeric characters or '-', and must start and
   * end with an alphanumeric character. No other punctuation is allowed. The
   * routes associated with a Mesh or Gateways must have unique hostnames. If
   * you attempt to attach multiple routes with conflicting hostnames, the
   * configuration will be rejected. For example, while it is acceptable for
   * routes for the hostnames "*.foo.bar.com" and "*.bar.com" to be associated
   * with the same Mesh (or Gateways under the same scope), it is not possible
   * to associate two routes both with "*.bar.com" or both with "bar.com".
   */
  hostnames?: string[];
  /**
   * Optional. Set of label tags associated with the HttpRoute resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Meshes defines a list of meshes this HttpRoute is attached to,
   * as one of the routing rules to route the requests served by the mesh. Each
   * mesh reference should match the pattern:
   * `projects/*\/locations/global/meshes/` The attached Mesh should be of a
   * type SIDECAR
   */
  meshes?: string[];
  /**
   * Required. Name of the HttpRoute resource. It matches pattern
   * `projects/*\/locations/global/httpRoutes/http_route_name>`.
   */
  name?: string;
  /**
   * Required. Rules that define how traffic is routed and handled. Rules will
   * be matched sequentially based on the RouteMatch specified for the rule.
   */
  rules?: HttpRouteRouteRule[];
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
}

function serializeHttpRoute(data: any): HttpRoute {
  return {
    ...data,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeHttpRouteRouteRule(item))) : undefined,
  };
}

function deserializeHttpRoute(data: any): HttpRoute {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeHttpRouteRouteRule(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The Specification for allowing client side cross-origin requests.
 */
export interface HttpRouteCorsPolicy {
  /**
   * In response to a preflight request, setting this to true indicates that
   * the actual request can include user credentials. This translates to the
   * Access-Control-Allow-Credentials header. Default value is false.
   */
  allowCredentials?: boolean;
  /**
   * Specifies the content for Access-Control-Allow-Headers header.
   */
  allowHeaders?: string[];
  /**
   * Specifies the content for Access-Control-Allow-Methods header.
   */
  allowMethods?: string[];
  /**
   * Specifies the regular expression patterns that match allowed origins. For
   * regular expression grammar, please see
   * https://github.com/google/re2/wiki/Syntax.
   */
  allowOriginRegexes?: string[];
  /**
   * Specifies the list of origins that will be allowed to do CORS requests. An
   * origin is allowed if it matches either an item in allow_origins or an item
   * in allow_origin_regexes.
   */
  allowOrigins?: string[];
  /**
   * If true, the CORS policy is disabled. The default value is false, which
   * indicates that the CORS policy is in effect.
   */
  disabled?: boolean;
  /**
   * Specifies the content for Access-Control-Expose-Headers header.
   */
  exposeHeaders?: string[];
  /**
   * Specifies how long result of a preflight request can be cached in seconds.
   * This translates to the Access-Control-Max-Age header.
   */
  maxAge?: string;
}

/**
 * Specifications of a destination to which the request should be routed to.
 */
export interface HttpRouteDestination {
  /**
   * The URL of a BackendService to route traffic to.
   */
  serviceName?: string;
  /**
   * Specifies the proportion of requests forwarded to the backend referenced
   * by the serviceName field. This is computed as: weight/Sum(weights in this
   * destination list). For non-zero values, there may be some epsilon from the
   * exact proportion defined here depending on the precision an implementation
   * supports. If only one serviceName is specified and it has a weight greater
   * than 0, 100% of the traffic is forwarded to that backend. If weights are
   * specified for any one service name, they need to be specified for all of
   * them. If weights are unspecified for all services, then, traffic is
   * distributed in equal proportions to all of them.
   */
  weight?: number;
}

/**
 * The specification for fault injection introduced into traffic to test the
 * resiliency of clients to destination service failure. As part of fault
 * injection, when clients send requests to a destination, delays can be
 * introduced by client proxy on a percentage of requests before sending those
 * requests to the destination service. Similarly requests can be aborted by
 * client proxy for a percentage of requests.
 */
export interface HttpRouteFaultInjectionPolicy {
  /**
   * The specification for aborting to client requests.
   */
  abort?: HttpRouteFaultInjectionPolicyAbort;
  /**
   * The specification for injecting delay to client requests.
   */
  delay?: HttpRouteFaultInjectionPolicyDelay;
}

function serializeHttpRouteFaultInjectionPolicy(data: any): HttpRouteFaultInjectionPolicy {
  return {
    ...data,
    delay: data["delay"] !== undefined ? serializeHttpRouteFaultInjectionPolicyDelay(data["delay"]) : undefined,
  };
}

function deserializeHttpRouteFaultInjectionPolicy(data: any): HttpRouteFaultInjectionPolicy {
  return {
    ...data,
    delay: data["delay"] !== undefined ? deserializeHttpRouteFaultInjectionPolicyDelay(data["delay"]) : undefined,
  };
}

/**
 * Specification of how client requests are aborted as part of fault injection
 * before being sent to a destination.
 */
export interface HttpRouteFaultInjectionPolicyAbort {
  /**
   * The HTTP status code used to abort the request. The value must be between
   * 200 and 599 inclusive.
   */
  httpStatus?: number;
  /**
   * The percentage of traffic which will be aborted. The value must be between
   * [0, 100]
   */
  percentage?: number;
}

/**
 * Specification of how client requests are delayed as part of fault injection
 * before being sent to a destination.
 */
export interface HttpRouteFaultInjectionPolicyDelay {
  /**
   * Specify a fixed delay before forwarding the request.
   */
  fixedDelay?: number /* Duration */;
  /**
   * The percentage of traffic on which delay will be injected. The value must
   * be between [0, 100]
   */
  percentage?: number;
}

function serializeHttpRouteFaultInjectionPolicyDelay(data: any): HttpRouteFaultInjectionPolicyDelay {
  return {
    ...data,
    fixedDelay: data["fixedDelay"] !== undefined ? data["fixedDelay"] : undefined,
  };
}

function deserializeHttpRouteFaultInjectionPolicyDelay(data: any): HttpRouteFaultInjectionPolicyDelay {
  return {
    ...data,
    fixedDelay: data["fixedDelay"] !== undefined ? data["fixedDelay"] : undefined,
  };
}

/**
 * Specifies how to select a route rule based on HTTP request headers.
 */
export interface HttpRouteHeaderMatch {
  /**
   * The value of the header should match exactly the content of exact_match.
   */
  exactMatch?: string;
  /**
   * The name of the HTTP header to match against.
   */
  header?: string;
  /**
   * If specified, the match result will be inverted before checking. Default
   * value is set to false.
   */
  invertMatch?: boolean;
  /**
   * The value of the header must start with the contents of prefix_match.
   */
  prefixMatch?: string;
  /**
   * A header with header_name must exist. The match takes place whether or not
   * the header has a value.
   */
  presentMatch?: boolean;
  /**
   * If specified, the rule will match if the request header value is within
   * the range.
   */
  rangeMatch?: HttpRouteHeaderMatchIntegerRange;
  /**
   * The value of the header must match the regular expression specified in
   * regex_match. For regular expression grammar, please see:
   * https://github.com/google/re2/wiki/Syntax
   */
  regexMatch?: string;
  /**
   * The value of the header must end with the contents of suffix_match.
   */
  suffixMatch?: string;
}

/**
 * Represents an integer value range.
 */
export interface HttpRouteHeaderMatchIntegerRange {
  /**
   * End of the range (exclusive)
   */
  end?: number;
  /**
   * Start of the range (inclusive)
   */
  start?: number;
}

/**
 * The specification for modifying HTTP header in HTTP request and HTTP
 * response.
 */
export interface HttpRouteHeaderModifier {
  /**
   * Add the headers with given map where key is the name of the header, value
   * is the value of the header.
   */
  add?: {
    [key: string]: string
  };
  /**
   * Remove headers (matching by header names) specified in the list.
   */
  remove?: string[];
  /**
   * Completely overwrite/replace the headers with given map where key is the
   * name of the header, value is the value of the header.
   */
  set?: {
    [key: string]: string
  };
}

/**
 * Specifications to match a query parameter in the request.
 */
export interface HttpRouteQueryParameterMatch {
  /**
   * The value of the query parameter must exactly match the contents of
   * exact_match. Only one of exact_match, regex_match, or present_match must be
   * set.
   */
  exactMatch?: string;
  /**
   * Specifies that the QueryParameterMatcher matches if request contains query
   * parameter, irrespective of whether the parameter has a value or not. Only
   * one of exact_match, regex_match, or present_match must be set.
   */
  presentMatch?: boolean;
  /**
   * The name of the query parameter to match.
   */
  queryParameter?: string;
  /**
   * The value of the query parameter must match the regular expression
   * specified by regex_match. For regular expression grammar, please see
   * https://github.com/google/re2/wiki/Syntax Only one of exact_match,
   * regex_match, or present_match must be set.
   */
  regexMatch?: string;
}

/**
 * The specification for redirecting traffic.
 */
export interface HttpRouteRedirect {
  /**
   * The host that will be used in the redirect response instead of the one
   * that was supplied in the request.
   */
  hostRedirect?: string;
  /**
   * If set to true, the URL scheme in the redirected request is set to https.
   * If set to false, the URL scheme of the redirected request will remain the
   * same as that of the request. The default is set to false.
   */
  httpsRedirect?: boolean;
  /**
   * The path that will be used in the redirect response instead of the one
   * that was supplied in the request. path_redirect can not be supplied
   * together with prefix_redirect. Supply one alone or neither. If neither is
   * supplied, the path of the original request will be used for the redirect.
   */
  pathRedirect?: string;
  /**
   * The port that will be used in the redirected request instead of the one
   * that was supplied in the request.
   */
  portRedirect?: number;
  /**
   * Indicates that during redirection, the matched prefix (or path) should be
   * swapped with this value. This option allows URLs be dynamically created
   * based on the request.
   */
  prefixRewrite?: string;
  /**
   * The HTTP Status code to use for the redirect.
   */
  responseCode?:  | "RESPONSE_CODE_UNSPECIFIED" | "MOVED_PERMANENTLY_DEFAULT" | "FOUND" | "SEE_OTHER" | "TEMPORARY_REDIRECT" | "PERMANENT_REDIRECT";
  /**
   * if set to true, any accompanying query portion of the original URL is
   * removed prior to redirecting the request. If set to false, the query
   * portion of the original URL is retained. The default is set to false.
   */
  stripQuery?: boolean;
}

/**
 * Specifies the policy on how requests are shadowed to a separate mirrored
 * destination service. The proxy does not wait for responses from the shadow
 * service. Prior to sending traffic to the shadow service, the host/authority
 * header is suffixed with -shadow.
 */
export interface HttpRouteRequestMirrorPolicy {
  /**
   * The destination the requests will be mirrored to. The weight of the
   * destination will be ignored.
   */
  destination?: HttpRouteDestination;
}

/**
 * The specifications for retries.
 */
export interface HttpRouteRetryPolicy {
  /**
   * Specifies the allowed number of retries. This number must be > 0. If not
   * specified, default to 1.
   */
  numRetries?: number;
  /**
   * Specifies a non-zero timeout per retry attempt.
   */
  perTryTimeout?: number /* Duration */;
  /**
   * Specifies one or more conditions when this retry policy applies. Valid
   * values are: 5xx: Proxy will attempt a retry if the destination service
   * responds with any 5xx response code, of if the destination service does not
   * respond at all, example: disconnect, reset, read timeout, connection
   * failure and refused streams. gateway-error: Similar to 5xx, but only
   * applies to response codes 502, 503, 504. reset: Proxy will attempt a retry
   * if the destination service does not respond at all (disconnect/reset/read
   * timeout) connect-failure: Proxy will retry on failures connecting to
   * destination for example due to connection timeouts. retriable-4xx: Proxy
   * will retry fro retriable 4xx response codes. Currently the only retriable
   * error supported is 409. refused-stream: Proxy will retry if the destination
   * resets the stream with a REFUSED_STREAM error code. This reset type
   * indicates that it is safe to retry.
   */
  retryConditions?: string[];
}

function serializeHttpRouteRetryPolicy(data: any): HttpRouteRetryPolicy {
  return {
    ...data,
    perTryTimeout: data["perTryTimeout"] !== undefined ? data["perTryTimeout"] : undefined,
  };
}

function deserializeHttpRouteRetryPolicy(data: any): HttpRouteRetryPolicy {
  return {
    ...data,
    perTryTimeout: data["perTryTimeout"] !== undefined ? data["perTryTimeout"] : undefined,
  };
}

/**
 * The specifications for routing traffic and applying associated policies.
 */
export interface HttpRouteRouteAction {
  /**
   * The specification for allowing client side cross-origin requests.
   */
  corsPolicy?: HttpRouteCorsPolicy;
  /**
   * The destination to which traffic should be forwarded.
   */
  destinations?: HttpRouteDestination[];
  /**
   * The specification for fault injection introduced into traffic to test the
   * resiliency of clients to backend service failure. As part of fault
   * injection, when clients send requests to a backend service, delays can be
   * introduced on a percentage of requests before sending those requests to the
   * backend service. Similarly requests from clients can be aborted for a
   * percentage of requests. timeout and retry_policy will be ignored by clients
   * that are configured with a fault_injection_policy
   */
  faultInjectionPolicy?: HttpRouteFaultInjectionPolicy;
  /**
   * If set, the request is directed as configured by this field.
   */
  redirect?: HttpRouteRedirect;
  /**
   * The specification for modifying the headers of a matching request prior to
   * delivery of the request to the destination.
   */
  requestHeaderModifier?: HttpRouteHeaderModifier;
  /**
   * Specifies the policy on how requests intended for the routes destination
   * are shadowed to a separate mirrored destination. Proxy will not wait for
   * the shadow destination to respond before returning the response. Prior to
   * sending traffic to the shadow service, the host/authority header is
   * suffixed with -shadow.
   */
  requestMirrorPolicy?: HttpRouteRequestMirrorPolicy;
  /**
   * The specification for modifying the headers of a response prior to sending
   * the response back to the client.
   */
  responseHeaderModifier?: HttpRouteHeaderModifier;
  /**
   * Specifies the retry policy associated with this route.
   */
  retryPolicy?: HttpRouteRetryPolicy;
  /**
   * Specifies the timeout for selected route. Timeout is computed from the
   * time the request has been fully processed (i.e. end of stream) up until the
   * response has been completely processed. Timeout includes all retries.
   */
  timeout?: number /* Duration */;
  /**
   * The specification for rewrite URL before forwarding requests to the
   * destination.
   */
  urlRewrite?: HttpRouteURLRewrite;
}

function serializeHttpRouteRouteAction(data: any): HttpRouteRouteAction {
  return {
    ...data,
    faultInjectionPolicy: data["faultInjectionPolicy"] !== undefined ? serializeHttpRouteFaultInjectionPolicy(data["faultInjectionPolicy"]) : undefined,
    retryPolicy: data["retryPolicy"] !== undefined ? serializeHttpRouteRetryPolicy(data["retryPolicy"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeHttpRouteRouteAction(data: any): HttpRouteRouteAction {
  return {
    ...data,
    faultInjectionPolicy: data["faultInjectionPolicy"] !== undefined ? deserializeHttpRouteFaultInjectionPolicy(data["faultInjectionPolicy"]) : undefined,
    retryPolicy: data["retryPolicy"] !== undefined ? deserializeHttpRouteRetryPolicy(data["retryPolicy"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * RouteMatch defines specifications used to match requests. If multiple match
 * types are set, this RouteMatch will match if ALL type of matches are matched.
 */
export interface HttpRouteRouteMatch {
  /**
   * The HTTP request path value should exactly match this value. Only one of
   * full_path_match, prefix_match, or regex_match should be used.
   */
  fullPathMatch?: string;
  /**
   * Specifies a list of HTTP request headers to match against. ALL of the
   * supplied headers must be matched.
   */
  headers?: HttpRouteHeaderMatch[];
  /**
   * Specifies if prefix_match and full_path_match matches are case sensitive.
   * The default value is false.
   */
  ignoreCase?: boolean;
  /**
   * The HTTP request path value must begin with specified prefix_match.
   * prefix_match must begin with a /. Only one of full_path_match,
   * prefix_match, or regex_match should be used.
   */
  prefixMatch?: string;
  /**
   * Specifies a list of query parameters to match against. ALL of the query
   * parameters must be matched.
   */
  queryParameters?: HttpRouteQueryParameterMatch[];
  /**
   * The HTTP request path value must satisfy the regular expression specified
   * by regex_match after removing any query parameters and anchor supplied with
   * the original URL. For regular expression grammar, please see
   * https://github.com/google/re2/wiki/Syntax Only one of full_path_match,
   * prefix_match, or regex_match should be used.
   */
  regexMatch?: string;
}

/**
 * Specifies how to match traffic and how to route traffic when traffic is
 * matched.
 */
export interface HttpRouteRouteRule {
  /**
   * The detailed rule defining how to route matched traffic.
   */
  action?: HttpRouteRouteAction;
  /**
   * A list of matches define conditions used for matching the rule against
   * incoming HTTP requests. Each match is independent, i.e. this rule will be
   * matched if ANY one of the matches is satisfied. If no matches field is
   * specified, this rule will unconditionally match traffic. If a default rule
   * is desired to be configured, add a rule with no matches specified to the
   * end of the rules list.
   */
  matches?: HttpRouteRouteMatch[];
}

function serializeHttpRouteRouteRule(data: any): HttpRouteRouteRule {
  return {
    ...data,
    action: data["action"] !== undefined ? serializeHttpRouteRouteAction(data["action"]) : undefined,
  };
}

function deserializeHttpRouteRouteRule(data: any): HttpRouteRouteRule {
  return {
    ...data,
    action: data["action"] !== undefined ? deserializeHttpRouteRouteAction(data["action"]) : undefined,
  };
}

/**
 * The specification for modifying the URL of the request, prior to forwarding
 * the request to the destination.
 */
export interface HttpRouteURLRewrite {
  /**
   * Prior to forwarding the request to the selected destination, the requests
   * host header is replaced by this value.
   */
  hostRewrite?: string;
  /**
   * Prior to forwarding the request to the selected destination, the matching
   * portion of the requests path is replaced by this value.
   */
  pathPrefixRewrite?: string;
}

/**
 * Response returned by the ListEndpointPolicies method.
 */
export interface ListEndpointPoliciesResponse {
  /**
   * List of EndpointPolicy resources.
   */
  endpointPolicies?: EndpointPolicy[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
}

/**
 * Response returned by the ListGateways method.
 */
export interface ListGatewaysResponse {
  /**
   * List of Gateway resources.
   */
  gateways?: Gateway[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
}

/**
 * Response returned by the ListGrpcRoutes method.
 */
export interface ListGrpcRoutesResponse {
  /**
   * List of GrpcRoute resources.
   */
  grpcRoutes?: GrpcRoute[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
}

function serializeListGrpcRoutesResponse(data: any): ListGrpcRoutesResponse {
  return {
    ...data,
    grpcRoutes: data["grpcRoutes"] !== undefined ? data["grpcRoutes"].map((item: any) => (serializeGrpcRoute(item))) : undefined,
  };
}

function deserializeListGrpcRoutesResponse(data: any): ListGrpcRoutesResponse {
  return {
    ...data,
    grpcRoutes: data["grpcRoutes"] !== undefined ? data["grpcRoutes"].map((item: any) => (deserializeGrpcRoute(item))) : undefined,
  };
}

/**
 * Response returned by the ListHttpRoutes method.
 */
export interface ListHttpRoutesResponse {
  /**
   * List of HttpRoute resources.
   */
  httpRoutes?: HttpRoute[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
}

function serializeListHttpRoutesResponse(data: any): ListHttpRoutesResponse {
  return {
    ...data,
    httpRoutes: data["httpRoutes"] !== undefined ? data["httpRoutes"].map((item: any) => (serializeHttpRoute(item))) : undefined,
  };
}

function deserializeListHttpRoutesResponse(data: any): ListHttpRoutesResponse {
  return {
    ...data,
    httpRoutes: data["httpRoutes"] !== undefined ? data["httpRoutes"].map((item: any) => (deserializeHttpRoute(item))) : undefined,
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
 * Response returned by the ListMeshes method.
 */
export interface ListMeshesResponse {
  /**
   * List of Mesh resources.
   */
  meshes?: Mesh[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
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
 * Response returned by the ListServiceBindings method.
 */
export interface ListServiceBindingsResponse {
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * List of ServiceBinding resources.
   */
  serviceBindings?: ServiceBinding[];
}

/**
 * Response returned by the ListTcpRoutes method.
 */
export interface ListTcpRoutesResponse {
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * List of TcpRoute resources.
   */
  tcpRoutes?: TcpRoute[];
}

/**
 * Response returned by the ListTlsRoutes method.
 */
export interface ListTlsRoutesResponse {
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * List of TlsRoute resources.
   */
  tlsRoutes?: TlsRoute[];
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
 * Mesh represents a logical configuration grouping for workload to workload
 * communication within a service mesh. Routes that point to mesh dictate how
 * requests are routed within this logical mesh boundary.
 */
export interface Mesh {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. If set to a valid TCP port (1-65535), instructs the SIDECAR
   * proxy to listen on the specified port of localhost (127.0.0.1) address. The
   * SIDECAR proxy will expect all traffic to be redirected to this port
   * regardless of its actual ip:port destination. If unset, a port '15001' is
   * used as the interception port. This will is applicable only for sidecar
   * proxy deployments.
   */
  interceptionPort?: number;
  /**
   * Optional. Set of label tags associated with the Mesh resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Name of the Mesh resource. It matches pattern
   * `projects/*\/locations/global/meshes/`.
   */
  name?: string;
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
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
 * Additional options for
 * NetworkServices#projectsLocationsEdgeCacheKeysetsGetIamPolicy.
 */
export interface ProjectsLocationsEdgeCacheKeysetsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsEdgeCacheOriginsGetIamPolicy.
 */
export interface ProjectsLocationsEdgeCacheOriginsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsEdgeCacheServicesGetIamPolicy.
 */
export interface ProjectsLocationsEdgeCacheServicesGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsEndpointPoliciesCreate.
 */
export interface ProjectsLocationsEndpointPoliciesCreateOptions {
  /**
   * Required. Short name of the EndpointPolicy resource to be created. E.g.
   * "CustomECS".
   */
  endpointPolicyId?: string;
}

/**
 * Additional options for
 * NetworkServices#projectsLocationsEndpointPoliciesGetIamPolicy.
 */
export interface ProjectsLocationsEndpointPoliciesGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsEndpointPoliciesList.
 */
export interface ProjectsLocationsEndpointPoliciesListOptions {
  /**
   * Maximum number of EndpointPolicies to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListEndpointPoliciesResponse` Indicates
   * that this is a continuation of a prior `ListEndpointPolicies` call, and
   * that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * NetworkServices#projectsLocationsEndpointPoliciesPatch.
 */
export interface ProjectsLocationsEndpointPoliciesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the EndpointPolicy resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEndpointPoliciesPatchOptions(data: any): ProjectsLocationsEndpointPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEndpointPoliciesPatchOptions(data: any): ProjectsLocationsEndpointPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkServices#projectsLocationsGatewaysCreate.
 */
export interface ProjectsLocationsGatewaysCreateOptions {
  /**
   * Required. Short name of the Gateway resource to be created.
   */
  gatewayId?: string;
}

/**
 * Additional options for
 * NetworkServices#projectsLocationsGatewaysGetIamPolicy.
 */
export interface ProjectsLocationsGatewaysGetIamPolicyOptions {
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
 * Additional options for NetworkServices#projectsLocationsGatewaysList.
 */
export interface ProjectsLocationsGatewaysListOptions {
  /**
   * Maximum number of Gateways to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListGatewaysResponse` Indicates that this
   * is a continuation of a prior `ListGateways` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsGatewaysPatch.
 */
export interface ProjectsLocationsGatewaysPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the Gateway resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGatewaysPatchOptions(data: any): ProjectsLocationsGatewaysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGatewaysPatchOptions(data: any): ProjectsLocationsGatewaysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkServices#projectsLocationsGrpcRoutesCreate.
 */
export interface ProjectsLocationsGrpcRoutesCreateOptions {
  /**
   * Required. Short name of the GrpcRoute resource to be created.
   */
  grpcRouteId?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsGrpcRoutesList.
 */
export interface ProjectsLocationsGrpcRoutesListOptions {
  /**
   * Maximum number of GrpcRoutes to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListGrpcRoutesResponse` Indicates that
   * this is a continuation of a prior `ListGrpcRoutes` call, and that the
   * system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsGrpcRoutesPatch.
 */
export interface ProjectsLocationsGrpcRoutesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the GrpcRoute resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGrpcRoutesPatchOptions(data: any): ProjectsLocationsGrpcRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGrpcRoutesPatchOptions(data: any): ProjectsLocationsGrpcRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkServices#projectsLocationsHttpRoutesCreate.
 */
export interface ProjectsLocationsHttpRoutesCreateOptions {
  /**
   * Required. Short name of the HttpRoute resource to be created.
   */
  httpRouteId?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsHttpRoutesList.
 */
export interface ProjectsLocationsHttpRoutesListOptions {
  /**
   * Maximum number of HttpRoutes to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListHttpRoutesResponse` Indicates that
   * this is a continuation of a prior `ListHttpRoutes` call, and that the
   * system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsHttpRoutesPatch.
 */
export interface ProjectsLocationsHttpRoutesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the HttpRoute resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsHttpRoutesPatchOptions(data: any): ProjectsLocationsHttpRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsHttpRoutesPatchOptions(data: any): ProjectsLocationsHttpRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkServices#projectsLocationsList.
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
 * Additional options for NetworkServices#projectsLocationsMeshesCreate.
 */
export interface ProjectsLocationsMeshesCreateOptions {
  /**
   * Required. Short name of the Mesh resource to be created.
   */
  meshId?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsMeshesGetIamPolicy.
 */
export interface ProjectsLocationsMeshesGetIamPolicyOptions {
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
 * Additional options for NetworkServices#projectsLocationsMeshesList.
 */
export interface ProjectsLocationsMeshesListOptions {
  /**
   * Maximum number of Meshes to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListMeshesResponse` Indicates that this is
   * a continuation of a prior `ListMeshes` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsMeshesPatch.
 */
export interface ProjectsLocationsMeshesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the Mesh resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsMeshesPatchOptions(data: any): ProjectsLocationsMeshesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsMeshesPatchOptions(data: any): ProjectsLocationsMeshesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * NetworkServices#projectsLocationsMulticastConsumerAssociationsGetIamPolicy.
 */
export interface ProjectsLocationsMulticastConsumerAssociationsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsMulticastDomainActivationsGetIamPolicy.
 */
export interface ProjectsLocationsMulticastDomainActivationsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsMulticastDomainsGetIamPolicy.
 */
export interface ProjectsLocationsMulticastDomainsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsMulticastGroupDefinitionsGetIamPolicy.
 */
export interface ProjectsLocationsMulticastGroupDefinitionsGetIamPolicyOptions {
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
 * NetworkServices#projectsLocationsMulticastGroupsGetIamPolicy.
 */
export interface ProjectsLocationsMulticastGroupsGetIamPolicyOptions {
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
 * Additional options for NetworkServices#projectsLocationsOperationsList.
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
 * NetworkServices#projectsLocationsServiceBindingsCreate.
 */
export interface ProjectsLocationsServiceBindingsCreateOptions {
  /**
   * Required. Short name of the ServiceBinding resource to be created.
   */
  serviceBindingId?: string;
}

/**
 * Additional options for
 * NetworkServices#projectsLocationsServiceBindingsGetIamPolicy.
 */
export interface ProjectsLocationsServiceBindingsGetIamPolicyOptions {
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
 * Additional options for NetworkServices#projectsLocationsServiceBindingsList.
 */
export interface ProjectsLocationsServiceBindingsListOptions {
  /**
   * Maximum number of ServiceBindings to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListServiceBindingsResponse` Indicates
   * that this is a continuation of a prior `ListRouters` call, and that the
   * system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsTcpRoutesCreate.
 */
export interface ProjectsLocationsTcpRoutesCreateOptions {
  /**
   * Required. Short name of the TcpRoute resource to be created. E.g. TODO(Add
   * an example).
   */
  tcpRouteId?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsTcpRoutesList.
 */
export interface ProjectsLocationsTcpRoutesListOptions {
  /**
   * Maximum number of TcpRoutes to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListTcpRoutesResponse` Indicates that this
   * is a continuation of a prior `ListTcpRoutes` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsTcpRoutesPatch.
 */
export interface ProjectsLocationsTcpRoutesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the TcpRoute resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTcpRoutesPatchOptions(data: any): ProjectsLocationsTcpRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTcpRoutesPatchOptions(data: any): ProjectsLocationsTcpRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for NetworkServices#projectsLocationsTlsRoutesCreate.
 */
export interface ProjectsLocationsTlsRoutesCreateOptions {
  /**
   * Required. Short name of the TlsRoute resource to be created. E.g. TODO(Add
   * an example).
   */
  tlsRouteId?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsTlsRoutesList.
 */
export interface ProjectsLocationsTlsRoutesListOptions {
  /**
   * Maximum number of TlsRoutes to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListTlsRoutesResponse` Indicates that this
   * is a continuation of a prior `ListTlsRoutes` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for NetworkServices#projectsLocationsTlsRoutesPatch.
 */
export interface ProjectsLocationsTlsRoutesPatchOptions {
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the TlsRoute resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTlsRoutesPatchOptions(data: any): ProjectsLocationsTlsRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTlsRoutesPatchOptions(data: any): ProjectsLocationsTlsRoutesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * ServiceBinding is the resource that defines a Service Directory Service to
 * be used in a BackendService resource.
 */
export interface ServiceBinding {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Set of label tags associated with the ServiceBinding resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Name of the ServiceBinding resource. It matches pattern
   * `projects/*\/locations/global/serviceBindings/service_binding_name`.
   */
  name?: string;
  /**
   * Required. The full Service Directory Service name of the format
   * projects/*\/locations/*\/namespaces/*\/services/*
   */
  service?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
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
 * TcpRoute is the resource defining how TCP traffic should be routed by a
 * Mesh/Gateway resource.
 */
export interface TcpRoute {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Gateways defines a list of gateways this TcpRoute is attached
   * to, as one of the routing rules to route the requests served by the
   * gateway. Each gateway reference should match the pattern:
   * `projects/*\/locations/global/gateways/`
   */
  gateways?: string[];
  /**
   * Optional. Set of label tags associated with the TcpRoute resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Meshes defines a list of meshes this TcpRoute is attached to, as
   * one of the routing rules to route the requests served by the mesh. Each
   * mesh reference should match the pattern:
   * `projects/*\/locations/global/meshes/` The attached Mesh should be of a
   * type SIDECAR
   */
  meshes?: string[];
  /**
   * Required. Name of the TcpRoute resource. It matches pattern
   * `projects/*\/locations/global/tcpRoutes/tcp_route_name>`.
   */
  name?: string;
  /**
   * Required. Rules that define how traffic is routed and handled. At least
   * one RouteRule must be supplied. If there are multiple rules then the action
   * taken will be the first rule to match.
   */
  rules?: TcpRouteRouteRule[];
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
}

/**
 * The specifications for routing traffic and applying associated policies.
 */
export interface TcpRouteRouteAction {
  /**
   * Optional. The destination services to which traffic should be forwarded.
   * At least one destination service is required.
   */
  destinations?: TcpRouteRouteDestination[];
  /**
   * Optional. If true, Router will use the destination IP and port of the
   * original connection as the destination of the request. Default is false.
   */
  originalDestination?: boolean;
}

/**
 * Describe the destination for traffic to be routed to.
 */
export interface TcpRouteRouteDestination {
  /**
   * Required. The URL of a BackendService to route traffic to.
   */
  serviceName?: string;
  /**
   * Optional. Specifies the proportion of requests forwarded to the backend
   * referenced by the serviceName field. This is computed as:
   * weight/Sum(weights in this destination list). For non-zero values, there
   * may be some epsilon from the exact proportion defined here depending on the
   * precision an implementation supports. If only one serviceName is specified
   * and it has a weight greater than 0, 100% of the traffic is forwarded to
   * that backend. If weights are specified for any one service name, they need
   * to be specified for all of them. If weights are unspecified for all
   * services, then, traffic is distributed in equal proportions to all of them.
   */
  weight?: number;
}

/**
 * RouteMatch defines the predicate used to match requests to a given action.
 * Multiple match types are "OR"ed for evaluation. If no routeMatch field is
 * specified, this rule will unconditionally match traffic.
 */
export interface TcpRouteRouteMatch {
  /**
   * Required. Must be specified in the CIDR range format. A CIDR range
   * consists of an IP Address and a prefix length to construct the subnet mask.
   * By default, the prefix length is 32 (i.e. matches a single IP address).
   * Only IPV4 addresses are supported. Examples: "10.0.0.1" - matches against
   * this exact IP address. "10.0.0.0/8" - matches against any IP address within
   * the 10.0.0.0 subnet and 255.255.255.0 mask. "0.0.0.0/0" - matches against
   * any IP address'.
   */
  address?: string;
  /**
   * Required. Specifies the destination port to match against.
   */
  port?: string;
}

/**
 * Specifies how to match traffic and how to route traffic when traffic is
 * matched.
 */
export interface TcpRouteRouteRule {
  /**
   * Required. The detailed rule defining how to route matched traffic.
   */
  action?: TcpRouteRouteAction;
  /**
   * Optional. RouteMatch defines the predicate used to match requests to a
   * given action. Multiple match types are "OR"ed for evaluation. If no
   * routeMatch field is specified, this rule will unconditionally match
   * traffic.
   */
  matches?: TcpRouteRouteMatch[];
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
 * TlsRoute defines how traffic should be routed based on SNI and other
 * matching L3 attributes.
 */
export interface TlsRoute {
  /**
   * Output only. The timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A free-text description of the resource. Max length 1024
   * characters.
   */
  description?: string;
  /**
   * Optional. Gateways defines a list of gateways this TlsRoute is attached
   * to, as one of the routing rules to route the requests served by the
   * gateway. Each gateway reference should match the pattern:
   * `projects/*\/locations/global/gateways/`
   */
  gateways?: string[];
  /**
   * Optional. Meshes defines a list of meshes this TlsRoute is attached to, as
   * one of the routing rules to route the requests served by the mesh. Each
   * mesh reference should match the pattern:
   * `projects/*\/locations/global/meshes/` The attached Mesh should be of a
   * type SIDECAR
   */
  meshes?: string[];
  /**
   * Required. Name of the TlsRoute resource. It matches pattern
   * `projects/*\/locations/global/tlsRoutes/tls_route_name>`.
   */
  name?: string;
  /**
   * Required. Rules that define how traffic is routed and handled. At least
   * one RouteRule must be supplied. If there are multiple rules then the action
   * taken will be the first rule to match.
   */
  rules?: TlsRouteRouteRule[];
  /**
   * Output only. Server-defined URL of this resource
   */
  readonly selfLink?: string;
  /**
   * Output only. The timestamp when the resource was updated.
   */
  readonly updateTime?: Date;
}

/**
 * The specifications for routing traffic and applying associated policies.
 */
export interface TlsRouteRouteAction {
  /**
   * Required. The destination services to which traffic should be forwarded.
   * At least one destination service is required.
   */
  destinations?: TlsRouteRouteDestination[];
}

/**
 * Describe the destination for traffic to be routed to.
 */
export interface TlsRouteRouteDestination {
  /**
   * Required. The URL of a BackendService to route traffic to.
   */
  serviceName?: string;
  /**
   * Optional. Specifies the proportion of requests forwareded to the backend
   * referenced by the service_name field. This is computed as:
   * weight/Sum(weights in destinations) Weights in all destinations does not
   * need to sum up to 100.
   */
  weight?: number;
}

/**
 * RouteMatch defines the predicate used to match requests to a given action.
 * Multiple match types are "AND"ed for evaluation. If no routeMatch field is
 * specified, this rule will unconditionally match traffic.
 */
export interface TlsRouteRouteMatch {
  /**
   * Optional. ALPN (Application-Layer Protocol Negotiation) to match against.
   * Examples: "http/1.1", "h2". At least one of sni_host and alpn is required.
   * Up to 5 alpns across all matches can be set.
   */
  alpn?: string[];
  /**
   * Optional. SNI (server name indicator) to match against. SNI will be
   * matched against all wildcard domains, i.e. www.example.com will be first
   * matched against www.example.com, then *.example.com, then *.com. Partial
   * wildcards are not supported, and values like *w.example.com are invalid. At
   * least one of sni_host and alpn is required. Up to 5 sni hosts across all
   * matches can be set.
   */
  sniHost?: string[];
}

/**
 * Specifies how to match traffic and how to route traffic when traffic is
 * matched.
 */
export interface TlsRouteRouteRule {
  /**
   * Required. The detailed rule defining how to route matched traffic.
   */
  action?: TlsRouteRouteAction;
  /**
   * Required. RouteMatch defines the predicate used to match requests to a
   * given action. Multiple match types are "OR"ed for evaluation.
   */
  matches?: TlsRouteRouteMatch[];
}

/**
 * Specification of a port-based selector.
 */
export interface TrafficPortSelector {
  /**
   * Optional. A list of ports. Can be port numbers or port range (example,
   * [80-90] specifies all ports from 80 to 90, including 80 and 90) or named
   * ports or * to specify all ports. If the list is empty, all ports are
   * selected.
   */
  ports?: string[];
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
