// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Service Directory API Client for Deno
 * =====================================
 * 
 * Service Directory is a platform for discovering, publishing, and connecting services. 
 * 
 * Docs: https://cloud.google.com/service-directory
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Service Directory is a platform for discovering, publishing, and connecting
 * services.
 */
export class ServiceDirectory {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://servicedirectory.googleapis.com/") {
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
   * Creates a namespace, and returns the new namespace.
   *
   * @param parent Required. The resource name of the project and location the namespace will be created in.
   */
  async projectsLocationsNamespacesCreate(parent: string, req: Namespace, opts: ProjectsLocationsNamespacesCreateOptions = {}): Promise<Namespace> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/namespaces`);
    if (opts.namespaceId !== undefined) {
      url.searchParams.append("namespaceId", String(opts.namespaceId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Namespace;
  }

  /**
   * Deletes a namespace. This also deletes all services and endpoints in the
   * namespace.
   *
   * @param name Required. The name of the namespace to delete.
   */
  async projectsLocationsNamespacesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a namespace.
   *
   * @param name Required. The name of the namespace to retrieve.
   */
  async projectsLocationsNamespacesGet(name: string): Promise<Namespace> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Namespace;
  }

  /**
   * Gets the IAM Policy for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists all namespaces.
   *
   * @param parent Required. The resource name of the project and location whose namespaces you'd like to list.
   */
  async projectsLocationsNamespacesList(parent: string, opts: ProjectsLocationsNamespacesListOptions = {}): Promise<ListNamespacesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/namespaces`);
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
    return data as ListNamespacesResponse;
  }

  /**
   * Updates a namespace.
   *
   * @param name Immutable. The resource name for the namespace in the format `projects/*\/locations/*\/namespaces/*`.
   */
  async projectsLocationsNamespacesPatch(name: string, req: Namespace, opts: ProjectsLocationsNamespacesPatchOptions = {}): Promise<Namespace> {
    opts = serializeProjectsLocationsNamespacesPatchOptions(opts);
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
    return data as Namespace;
  }

  /**
   * Creates a service, and returns the new service.
   *
   * @param parent Required. The resource name of the namespace this service will belong to.
   */
  async projectsLocationsNamespacesServicesCreate(parent: string, req: Service, opts: ProjectsLocationsNamespacesServicesCreateOptions = {}): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services`);
    if (opts.serviceId !== undefined) {
      url.searchParams.append("serviceId", String(opts.serviceId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Service;
  }

  /**
   * Deletes a service. This also deletes all endpoints associated with the
   * service.
   *
   * @param name Required. The name of the service to delete.
   */
  async projectsLocationsNamespacesServicesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Creates an endpoint, and returns the new endpoint.
   *
   * @param parent Required. The resource name of the service that this endpoint provides.
   */
  async projectsLocationsNamespacesServicesEndpointsCreate(parent: string, req: Endpoint, opts: ProjectsLocationsNamespacesServicesEndpointsCreateOptions = {}): Promise<Endpoint> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpoints`);
    if (opts.endpointId !== undefined) {
      url.searchParams.append("endpointId", String(opts.endpointId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Endpoint;
  }

  /**
   * Deletes an endpoint.
   *
   * @param name Required. The name of the endpoint to delete.
   */
  async projectsLocationsNamespacesServicesEndpointsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an endpoint.
   *
   * @param name Required. The name of the endpoint to get.
   */
  async projectsLocationsNamespacesServicesEndpointsGet(name: string): Promise<Endpoint> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Endpoint;
  }

  /**
   * Lists all endpoints.
   *
   * @param parent Required. The resource name of the service whose endpoints you'd like to list.
   */
  async projectsLocationsNamespacesServicesEndpointsList(parent: string, opts: ProjectsLocationsNamespacesServicesEndpointsListOptions = {}): Promise<ListEndpointsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpoints`);
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
    return data as ListEndpointsResponse;
  }

  /**
   * Updates an endpoint.
   *
   * @param name Immutable. The resource name for the endpoint in the format `projects/*\/locations/*\/namespaces/*\/services/*\/endpoints/*`.
   */
  async projectsLocationsNamespacesServicesEndpointsPatch(name: string, req: Endpoint, opts: ProjectsLocationsNamespacesServicesEndpointsPatchOptions = {}): Promise<Endpoint> {
    opts = serializeProjectsLocationsNamespacesServicesEndpointsPatchOptions(opts);
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
    return data as Endpoint;
  }

  /**
   * Gets a service.
   *
   * @param name Required. The name of the service to get.
   */
  async projectsLocationsNamespacesServicesGet(name: string): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Service;
  }

  /**
   * Gets the IAM Policy for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesServicesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists all services belonging to a namespace.
   *
   * @param parent Required. The resource name of the namespace whose services you'd like to list.
   */
  async projectsLocationsNamespacesServicesList(parent: string, opts: ProjectsLocationsNamespacesServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services`);
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
    return data as ListServicesResponse;
  }

  /**
   * Updates a service.
   *
   * @param name Immutable. The resource name for the service in the format `projects/*\/locations/*\/namespaces/*\/services/*`.
   */
  async projectsLocationsNamespacesServicesPatch(name: string, req: Service, opts: ProjectsLocationsNamespacesServicesPatchOptions = {}): Promise<Service> {
    opts = serializeProjectsLocationsNamespacesServicesPatchOptions(opts);
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
    return data as Service;
  }

  /**
   * Returns a service and its associated endpoints. Resolving a service is not
   * considered an active developer method.
   *
   * @param name Required. The name of the service to resolve.
   */
  async projectsLocationsNamespacesServicesResolve(name: string, req: ResolveServiceRequest): Promise<ResolveServiceResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resolve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ResolveServiceResponse;
  }

  /**
   * Sets the IAM Policy for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesServicesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Tests IAM permissions for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesServicesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Sets the IAM Policy for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Tests IAM permissions for a resource (namespace or service only).
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsNamespacesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
 * An individual endpoint that provides a service. The service must already
 * exist to create an endpoint.
 */
export interface Endpoint {
  /**
   * Optional. An IPv4 or IPv6 address. Service Directory rejects bad addresses
   * like: * `8.8.8` * `8.8.8.8:53` * `test:bad:address` * `[::1]` *
   * `[::1]:8080` Limited to 45 characters.
   */
  address?: string;
  /**
   * Optional. Annotations for the endpoint. This data can be consumed by
   * service clients. Restrictions: * The entire annotations dictionary may
   * contain up to 512 characters, spread accoss all key-value pairs.
   * Annotations that go beyond this limit are rejected * Valid annotation keys
   * have two segments: an optional prefix and name, separated by a slash (/).
   * The name segment is required and must be 63 characters or less, beginning
   * and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-),
   * underscores (_), dots (.), and alphanumerics between. The prefix is
   * optional. If specified, the prefix must be a DNS subdomain: a series of DNS
   * labels separated by dots (.), not longer than 253 characters in total,
   * followed by a slash (/) Annotations that fails to meet these requirements
   * are rejected. Note: This field is equivalent to the `metadata` field in the
   * v1beta1 API. They have the same syntax and read/write to the same location
   * in Service Directory.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Immutable. The resource name for the endpoint in the format
   * `projects/*\/locations/*\/namespaces/*\/services/*\/endpoints/*`.
   */
  name?: string;
  /**
   * Immutable. The Google Compute Engine network (VPC) of the endpoint in the
   * format `projects//locations/global/networks/*`. The project must be
   * specified by project number (project id is rejected). Incorrectly formatted
   * networks are rejected, we also check to make sure that you have the
   * servicedirectory.networks.attach permission on the project specified.
   */
  network?: string;
  /**
   * Optional. Service Directory rejects values outside of `[0, 65535]`.
   */
  port?: number;
  /**
   * Output only. The globally unique identifier of the endpoint in the UUID4
   * format.
   */
  readonly uid?: string;
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
 * The response message for RegistrationService.ListEndpoints.
 */
export interface ListEndpointsResponse {
  /**
   * The list of endpoints.
   */
  endpoints?: Endpoint[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
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
 * The response message for RegistrationService.ListNamespaces.
 */
export interface ListNamespacesResponse {
  /**
   * The list of namespaces.
   */
  namespaces?: Namespace[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for RegistrationService.ListServices.
 */
export interface ListServicesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of services.
   */
  services?: Service[];
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
 * A container for services. Namespaces allow administrators to group services
 * together and define permissions for a collection of services.
 */
export interface Namespace {
  /**
   * Optional. Resource labels associated with this namespace. No more than 64
   * user labels can be associated with a given resource. Label keys and values
   * can be no longer than 63 characters.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The resource name for the namespace in the format
   * `projects/*\/locations/*\/namespaces/*`.
   */
  name?: string;
  /**
   * Output only. The globally unique identifier of the namespace in the UUID4
   * format.
   */
  readonly uid?: string;
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
 * Additional options for ServiceDirectory#projectsLocationsList.
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
 * Additional options for ServiceDirectory#projectsLocationsNamespacesCreate.
 */
export interface ProjectsLocationsNamespacesCreateOptions {
  /**
   * Required. The Resource ID must be 1-63 characters long, and comply with
   * RFC1035. Specifically, the name must be 1-63 characters long and match the
   * regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the
   * first character must be a lowercase letter, and all following characters
   * must be a dash, lowercase letter, or digit, except the last character,
   * which cannot be a dash.
   */
  namespaceId?: string;
}

/**
 * Additional options for ServiceDirectory#projectsLocationsNamespacesList.
 */
export interface ProjectsLocationsNamespacesListOptions {
  /**
   * Optional. The filter to list results by. General `filter` string syntax: `
   * ()` * `` can be `name` or `labels.` for map field * `` can be `<`, `>`,
   * `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the
   * same as `=` * `` must be the same data type as field * `` can be `AND`,
   * `OR`, `NOT` Examples of valid filters: * `labels.owner` returns namespaces
   * that have a label with the key `owner`, this is the same as `labels:owner`
   * * `labels.owner=sd` returns namespaces that have key/value `owner=sd` *
   * `name>projects/my-project/locations/us-east1/namespaces/namespace-c`
   * returns namespaces that have name that is alphabetically later than the
   * string, so "namespace-e" is returned but "namespace-a" is not *
   * `labels.owner!=sd AND labels.foo=bar` returns namespaces that have `owner`
   * in label key but value is not `sd` AND have key/value `foo=bar` *
   * `doesnotexist.foo=bar` returns an empty list. Note that namespace doesn't
   * have a field called "doesnotexist". Since the filter does not match any
   * namespaces, it returns no results For more information about filtering, see
   * [API Filtering](https://aip.dev/160).
   */
  filter?: string;
  /**
   * Optional. The order to list results by. General `order_by` string syntax:
   * ` () (,)` * `` allows value: `name` * `` ascending or descending order by
   * ``. If this is left blank, `asc` is used Note that an empty `order_by`
   * string results in default order, which is order by `name` in ascending
   * order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous List request,
   * if any.
   */
  pageToken?: string;
}

/**
 * Additional options for ServiceDirectory#projectsLocationsNamespacesPatch.
 */
export interface ProjectsLocationsNamespacesPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNamespacesPatchOptions(data: any): ProjectsLocationsNamespacesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNamespacesPatchOptions(data: any): ProjectsLocationsNamespacesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesCreate.
 */
export interface ProjectsLocationsNamespacesServicesCreateOptions {
  /**
   * Required. The Resource ID must be 1-63 characters long, and comply with
   * RFC1035. Specifically, the name must be 1-63 characters long and match the
   * regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the
   * first character must be a lowercase letter, and all following characters
   * must be a dash, lowercase letter, or digit, except the last character,
   * which cannot be a dash.
   */
  serviceId?: string;
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesEndpointsCreate.
 */
export interface ProjectsLocationsNamespacesServicesEndpointsCreateOptions {
  /**
   * Required. The Resource ID must be 1-63 characters long, and comply with
   * RFC1035. Specifically, the name must be 1-63 characters long and match the
   * regular expression `[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?` which means the
   * first character must be a lowercase letter, and all following characters
   * must be a dash, lowercase letter, or digit, except the last character,
   * which cannot be a dash.
   */
  endpointId?: string;
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesEndpointsList.
 */
export interface ProjectsLocationsNamespacesServicesEndpointsListOptions {
  /**
   * Optional. The filter to list results by. General `filter` string syntax: `
   * ()` * `` can be `name`, `address`, `port`, or `annotations.` for map field
   * * `` can be `<`, `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`,
   * and is roughly the same as `=` * `` must be the same data type as field *
   * `` can be `AND`, `OR`, `NOT` Examples of valid filters: *
   * `annotations.owner` returns endpoints that have a annotation with the key
   * `owner`, this is the same as `annotations:owner` *
   * `annotations.protocol=gRPC` returns endpoints that have key/value
   * `protocol=gRPC` * `address=192.108.1.105` returns endpoints that have this
   * address * `port>8080` returns endpoints that have port number larger than
   * 8080 *
   * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/my-service/endpoints/endpoint-c`
   * returns endpoints that have name that is alphabetically later than the
   * string, so "endpoint-e" is returned but "endpoint-a" is not *
   * `annotations.owner!=sd AND annotations.foo=bar` returns endpoints that have
   * `owner` in annotation key but value is not `sd` AND have key/value
   * `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that
   * endpoint doesn't have a field called "doesnotexist". Since the filter does
   * not match any endpoints, it returns no results For more information about
   * filtering, see [API Filtering](https://aip.dev/160).
   */
  filter?: string;
  /**
   * Optional. The order to list results by. General `order_by` string syntax:
   * ` () (,)` * `` allows values: `name`, `address`, `port` * `` ascending or
   * descending order by ``. If this is left blank, `asc` is used Note that an
   * empty `order_by` string results in default order, which is order by `name`
   * in ascending order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous List request,
   * if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesEndpointsPatch.
 */
export interface ProjectsLocationsNamespacesServicesEndpointsPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNamespacesServicesEndpointsPatchOptions(data: any): ProjectsLocationsNamespacesServicesEndpointsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNamespacesServicesEndpointsPatchOptions(data: any): ProjectsLocationsNamespacesServicesEndpointsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesList.
 */
export interface ProjectsLocationsNamespacesServicesListOptions {
  /**
   * Optional. The filter to list results by. General `filter` string syntax: `
   * ()` * `` can be `name` or `annotations.` for map field * `` can be `<`,
   * `>`, `<=`, `>=`, `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly
   * the same as `=` * `` must be the same data type as field * `` can be `AND`,
   * `OR`, `NOT` Examples of valid filters: * `annotations.owner` returns
   * services that have a annotation with the key `owner`, this is the same as
   * `annotations:owner` * `annotations.protocol=gRPC` returns services that
   * have key/value `protocol=gRPC` *
   * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/service-c`
   * returns services that have name that is alphabetically later than the
   * string, so "service-e" is returned but "service-a" is not *
   * `annotations.owner!=sd AND annotations.foo=bar` returns services that have
   * `owner` in annotation key but value is not `sd` AND have key/value
   * `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that service
   * doesn't have a field called "doesnotexist". Since the filter does not match
   * any services, it returns no results For more information about filtering,
   * see [API Filtering](https://aip.dev/160).
   */
  filter?: string;
  /**
   * Optional. The order to list results by. General `order_by` string syntax:
   * ` () (,)` * `` allows value: `name` * `` ascending or descending order by
   * ``. If this is left blank, `asc` is used Note that an empty `order_by`
   * string results in default order, which is order by `name` in ascending
   * order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous List request,
   * if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ServiceDirectory#projectsLocationsNamespacesServicesPatch.
 */
export interface ProjectsLocationsNamespacesServicesPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNamespacesServicesPatchOptions(data: any): ProjectsLocationsNamespacesServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNamespacesServicesPatchOptions(data: any): ProjectsLocationsNamespacesServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The request message for LookupService.ResolveService. Looks up a service by
 * its name, returns the service and its endpoints.
 */
export interface ResolveServiceRequest {
  /**
   * Optional. The filter applied to the endpoints of the resolved service.
   * General `filter` string syntax: ` ()` * `` can be `name`, `address`,
   * `port`, or `annotations.` for map field * `` can be `<`, `>`, `<=`, `>=`,
   * `!=`, `=`, `:`. Of which `:` means `HAS`, and is roughly the same as `=` *
   * `` must be the same data type as field * `` can be `AND`, `OR`, `NOT`
   * Examples of valid filters: * `annotations.owner` returns endpoints that
   * have a annotation with the key `owner`, this is the same as
   * `annotations:owner` * `annotations.protocol=gRPC` returns endpoints that
   * have key/value `protocol=gRPC` * `address=192.108.1.105` returns endpoints
   * that have this address * `port>8080` returns endpoints that have port
   * number larger than 8080 *
   * `name>projects/my-project/locations/us-east1/namespaces/my-namespace/services/my-service/endpoints/endpoint-c`
   * returns endpoints that have name that is alphabetically later than the
   * string, so "endpoint-e" is returned but "endpoint-a" is not *
   * `name=projects/my-project/locations/us-central1/namespaces/my-namespace/services/my-service/endpoints/ep-1`
   * returns the endpoint that has an endpoint_id equal to `ep-1` *
   * `annotations.owner!=sd AND annotations.foo=bar` returns endpoints that have
   * `owner` in annotation key but value is not `sd` AND have key/value
   * `foo=bar` * `doesnotexist.foo=bar` returns an empty list. Note that
   * endpoint doesn't have a field called "doesnotexist". Since the filter does
   * not match any endpoint, it returns no results For more information about
   * filtering, see [API Filtering](https://aip.dev/160).
   */
  endpointFilter?: string;
  /**
   * Optional. The maximum number of endpoints to return. Defaults to 25.
   * Maximum is 100. If a value less than one is specified, the Default is used.
   * If a value greater than the Maximum is specified, the Maximum is used.
   */
  maxEndpoints?: number;
}

/**
 * The response message for LookupService.ResolveService.
 */
export interface ResolveServiceResponse {
  service?: Service;
}

/**
 * An individual service. A service contains a name and optional metadata. A
 * service must exist before endpoints can be added to it.
 */
export interface Service {
  /**
   * Optional. Annotations for the service. This data can be consumed by
   * service clients. Restrictions: * The entire annotations dictionary may
   * contain up to 2000 characters, spread accoss all key-value pairs.
   * Annotations that go beyond this limit are rejected * Valid annotation keys
   * have two segments: an optional prefix and name, separated by a slash (/).
   * The name segment is required and must be 63 characters or less, beginning
   * and ending with an alphanumeric character ([a-z0-9A-Z]) with dashes (-),
   * underscores (_), dots (.), and alphanumerics between. The prefix is
   * optional. If specified, the prefix must be a DNS subdomain: a series of DNS
   * labels separated by dots (.), not longer than 253 characters in total,
   * followed by a slash (/). Annotations that fails to meet these requirements
   * are rejected Note: This field is equivalent to the `metadata` field in the
   * v1beta1 API. They have the same syntax and read/write to the same location
   * in Service Directory.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Endpoints associated with this service. Returned on
   * LookupService.ResolveService. Control plane clients should use
   * RegistrationService.ListEndpoints.
   */
  readonly endpoints?: Endpoint[];
  /**
   * Immutable. The resource name for the service in the format
   * `projects/*\/locations/*\/namespaces/*\/services/*`.
   */
  name?: string;
  /**
   * Output only. The globally unique identifier of the service in the UUID4
   * format.
   */
  readonly uid?: string;
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
