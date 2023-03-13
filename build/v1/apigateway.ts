// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * API Gateway API Client for Deno
 * ===============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/api-gateway/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class APIGateway {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://apigateway.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new ApiConfig in a given project and location.
   *
   * @param parent Required. Parent resource of the API Config, of the form: `projects/*\/locations/global/apis/*`
   */
  async projectsLocationsApisConfigsCreate(parent: string, req: ApigatewayApiConfig, opts: ProjectsLocationsApisConfigsCreateOptions = {}): Promise<ApigatewayOperation> {
    req = serializeApigatewayApiConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/configs`);
    if (opts.apiConfigId !== undefined) {
      url.searchParams.append("apiConfigId", String(opts.apiConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApigatewayOperation;
  }

  /**
   * Deletes a single ApiConfig.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/global/apis/*\/configs/*`
   */
  async projectsLocationsApisConfigsDelete(name: string): Promise<ApigatewayOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ApigatewayOperation;
  }

  /**
   * Gets details of a single ApiConfig.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/global/apis/*\/configs/*`
   */
  async projectsLocationsApisConfigsGet(name: string, opts: ProjectsLocationsApisConfigsGetOptions = {}): Promise<ApigatewayApiConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApigatewayApiConfig(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisConfigsGetIamPolicy(resource: string, opts: ProjectsLocationsApisConfigsGetIamPolicyOptions = {}): Promise<ApigatewayPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApigatewayPolicy(data);
  }

  /**
   * Lists ApiConfigs in a given project and location.
   *
   * @param parent Required. Parent resource of the API Config, of the form: `projects/*\/locations/global/apis/*`
   */
  async projectsLocationsApisConfigsList(parent: string, opts: ProjectsLocationsApisConfigsListOptions = {}): Promise<ApigatewayListApiConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/configs`);
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
    return deserializeApigatewayListApiConfigsResponse(data);
  }

  /**
   * Updates the parameters of a single ApiConfig.
   *
   * @param name Output only. Resource name of the API Config. Format: projects/{project}/locations/global/apis/{api}/configs/{api_config}
   */
  async projectsLocationsApisConfigsPatch(name: string, req: ApigatewayApiConfig, opts: ProjectsLocationsApisConfigsPatchOptions = {}): Promise<ApigatewayOperation> {
    req = serializeApigatewayApiConfig(req);
    opts = serializeProjectsLocationsApisConfigsPatchOptions(opts);
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
    return data as ApigatewayOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisConfigsSetIamPolicy(resource: string, req: ApigatewaySetIamPolicyRequest): Promise<ApigatewayPolicy> {
    req = serializeApigatewaySetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApigatewayPolicy(data);
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
  async projectsLocationsApisConfigsTestIamPermissions(resource: string, req: ApigatewayTestIamPermissionsRequest): Promise<ApigatewayTestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApigatewayTestIamPermissionsResponse;
  }

  /**
   * Creates a new Api in a given project and location.
   *
   * @param parent Required. Parent resource of the API, of the form: `projects/*\/locations/global`
   */
  async projectsLocationsApisCreate(parent: string, req: ApigatewayApi, opts: ProjectsLocationsApisCreateOptions = {}): Promise<ApigatewayOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
    if (opts.apiId !== undefined) {
      url.searchParams.append("apiId", String(opts.apiId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApigatewayOperation;
  }

  /**
   * Deletes a single Api.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/global/apis/*`
   */
  async projectsLocationsApisDelete(name: string): Promise<ApigatewayOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ApigatewayOperation;
  }

  /**
   * Gets details of a single Api.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/global/apis/*`
   */
  async projectsLocationsApisGet(name: string): Promise<ApigatewayApi> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApigatewayApi;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisGetIamPolicy(resource: string, opts: ProjectsLocationsApisGetIamPolicyOptions = {}): Promise<ApigatewayPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApigatewayPolicy(data);
  }

  /**
   * Lists Apis in a given project and location.
   *
   * @param parent Required. Parent resource of the API, of the form: `projects/*\/locations/global`
   */
  async projectsLocationsApisList(parent: string, opts: ProjectsLocationsApisListOptions = {}): Promise<ApigatewayListApisResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
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
    return data as ApigatewayListApisResponse;
  }

  /**
   * Updates the parameters of a single Api.
   *
   * @param name Output only. Resource name of the API. Format: projects/{project}/locations/global/apis/{api}
   */
  async projectsLocationsApisPatch(name: string, req: ApigatewayApi, opts: ProjectsLocationsApisPatchOptions = {}): Promise<ApigatewayOperation> {
    opts = serializeProjectsLocationsApisPatchOptions(opts);
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
    return data as ApigatewayOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisSetIamPolicy(resource: string, req: ApigatewaySetIamPolicyRequest): Promise<ApigatewayPolicy> {
    req = serializeApigatewaySetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApigatewayPolicy(data);
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
  async projectsLocationsApisTestIamPermissions(resource: string, req: ApigatewayTestIamPermissionsRequest): Promise<ApigatewayTestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApigatewayTestIamPermissionsResponse;
  }

  /**
   * Creates a new Gateway in a given project and location.
   *
   * @param parent Required. Parent resource of the Gateway, of the form: `projects/*\/locations/*`
   */
  async projectsLocationsGatewaysCreate(parent: string, req: ApigatewayGateway, opts: ProjectsLocationsGatewaysCreateOptions = {}): Promise<ApigatewayOperation> {
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
    return data as ApigatewayOperation;
  }

  /**
   * Deletes a single Gateway.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/*\/gateways/*`
   */
  async projectsLocationsGatewaysDelete(name: string): Promise<ApigatewayOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ApigatewayOperation;
  }

  /**
   * Gets details of a single Gateway.
   *
   * @param name Required. Resource name of the form: `projects/*\/locations/*\/gateways/*`
   */
  async projectsLocationsGatewaysGet(name: string): Promise<ApigatewayGateway> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApigatewayGateway;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGatewaysGetIamPolicy(resource: string, opts: ProjectsLocationsGatewaysGetIamPolicyOptions = {}): Promise<ApigatewayPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApigatewayPolicy(data);
  }

  /**
   * Lists Gateways in a given project and location.
   *
   * @param parent Required. Parent resource of the Gateway, of the form: `projects/*\/locations/*`
   */
  async projectsLocationsGatewaysList(parent: string, opts: ProjectsLocationsGatewaysListOptions = {}): Promise<ApigatewayListGatewaysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gateways`);
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
    return data as ApigatewayListGatewaysResponse;
  }

  /**
   * Updates the parameters of a single Gateway.
   *
   * @param name Output only. Resource name of the Gateway. Format: projects/{project}/locations/{location}/gateways/{gateway}
   */
  async projectsLocationsGatewaysPatch(name: string, req: ApigatewayGateway, opts: ProjectsLocationsGatewaysPatchOptions = {}): Promise<ApigatewayOperation> {
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
    return data as ApigatewayOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGatewaysSetIamPolicy(resource: string, req: ApigatewaySetIamPolicyRequest): Promise<ApigatewayPolicy> {
    req = serializeApigatewaySetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApigatewayPolicy(data);
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
  async projectsLocationsGatewaysTestIamPermissions(resource: string, req: ApigatewayTestIamPermissionsRequest): Promise<ApigatewayTestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApigatewayTestIamPermissionsResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<ApigatewayLocation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApigatewayLocation;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ApigatewayListLocationsResponse> {
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
    return data as ApigatewayListLocationsResponse;
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
  async projectsLocationsOperationsCancel(name: string, req: ApigatewayCancelOperationRequest): Promise<Empty> {
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
  async projectsLocationsOperationsGet(name: string): Promise<ApigatewayOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApigatewayOperation;
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ApigatewayListOperationsResponse> {
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
    return data as ApigatewayListOperationsResponse;
  }
}

/**
 * An API that can be served by one or more Gateways.
 */
export interface ApigatewayApi {
  /**
   * Output only. Created time.
   */
  readonly createTime?: Date;
  /**
   * Optional. Display name.
   */
  displayName?: string;
  /**
   * Optional. Resource labels to represent user-provided metadata. Refer to
   * cloud documentation on labels for more details.
   * https://cloud.google.com/compute/docs/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Immutable. The name of a Google Managed Service (
   * https://cloud.google.com/service-infrastructure/docs/glossary#managed). If
   * not specified, a new Service will automatically be created in the same
   * project as this API.
   */
  managedService?: string;
  /**
   * Output only. Resource name of the API. Format:
   * projects/{project}/locations/global/apis/{api}
   */
  readonly name?: string;
  /**
   * Output only. State of the API.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING";
  /**
   * Output only. Updated time.
   */
  readonly updateTime?: Date;
}

/**
 * An API Configuration is a combination of settings for both the Managed
 * Service and Gateways serving this API Config.
 */
export interface ApigatewayApiConfig {
  /**
   * Output only. Created time.
   */
  readonly createTime?: Date;
  /**
   * Optional. Display name.
   */
  displayName?: string;
  /**
   * Immutable. The Google Cloud IAM Service Account that Gateways serving this
   * config should use to authenticate to other services. This may either be the
   * Service Account's email (`{ACCOUNT_ID}@{PROJECT}.iam.gserviceaccount.com`)
   * or its full resource name (`projects/{PROJECT}/accounts/{UNIQUE_ID}`). This
   * is most often used when the service is a GCP resource such as a Cloud Run
   * Service or an IAP-secured service.
   */
  gatewayServiceAccount?: string;
  /**
   * Optional. gRPC service definition files. If specified, openapi_documents
   * must not be included.
   */
  grpcServices?: ApigatewayApiConfigGrpcServiceDefinition[];
  /**
   * Optional. Resource labels to represent user-provided metadata. Refer to
   * cloud documentation on labels for more details.
   * https://cloud.google.com/compute/docs/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Service Configuration files. At least one must be included when
   * using gRPC service definitions. See
   * https://cloud.google.com/endpoints/docs/grpc/grpc-service-config#service_configuration_overview
   * for the expected file contents. If multiple files are specified, the files
   * are merged with the following rules: * All singular scalar fields are
   * merged using "last one wins" semantics in the order of the files uploaded.
   * * Repeated fields are concatenated. * Singular embedded messages are merged
   * using these rules for nested fields.
   */
  managedServiceConfigs?: ApigatewayApiConfigFile[];
  /**
   * Output only. Resource name of the API Config. Format:
   * projects/{project}/locations/global/apis/{api}/configs/{api_config}
   */
  readonly name?: string;
  /**
   * Optional. OpenAPI specification documents. If specified, grpc_services and
   * managed_service_configs must not be included.
   */
  openapiDocuments?: ApigatewayApiConfigOpenApiDocument[];
  /**
   * Output only. The ID of the associated Service Config (
   * https://cloud.google.com/service-infrastructure/docs/glossary#config).
   */
  readonly serviceConfigId?: string;
  /**
   * Output only. State of the API Config.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING" | "ACTIVATING";
  /**
   * Output only. Updated time.
   */
  readonly updateTime?: Date;
}

function serializeApigatewayApiConfig(data: any): ApigatewayApiConfig {
  return {
    ...data,
    grpcServices: data["grpcServices"] !== undefined ? data["grpcServices"].map((item: any) => (serializeApigatewayApiConfigGrpcServiceDefinition(item))) : undefined,
    managedServiceConfigs: data["managedServiceConfigs"] !== undefined ? data["managedServiceConfigs"].map((item: any) => (serializeApigatewayApiConfigFile(item))) : undefined,
    openapiDocuments: data["openapiDocuments"] !== undefined ? data["openapiDocuments"].map((item: any) => (serializeApigatewayApiConfigOpenApiDocument(item))) : undefined,
  };
}

function deserializeApigatewayApiConfig(data: any): ApigatewayApiConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    grpcServices: data["grpcServices"] !== undefined ? data["grpcServices"].map((item: any) => (deserializeApigatewayApiConfigGrpcServiceDefinition(item))) : undefined,
    managedServiceConfigs: data["managedServiceConfigs"] !== undefined ? data["managedServiceConfigs"].map((item: any) => (deserializeApigatewayApiConfigFile(item))) : undefined,
    openapiDocuments: data["openapiDocuments"] !== undefined ? data["openapiDocuments"].map((item: any) => (deserializeApigatewayApiConfigOpenApiDocument(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A lightweight description of a file.
 */
export interface ApigatewayApiConfigFile {
  /**
   * The bytes that constitute the file.
   */
  contents?: Uint8Array;
  /**
   * The file path (full or relative path). This is typically the path of the
   * file when it is uploaded.
   */
  path?: string;
}

function serializeApigatewayApiConfigFile(data: any): ApigatewayApiConfigFile {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeApigatewayApiConfigFile(data: any): ApigatewayApiConfigFile {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
  };
}

/**
 * A gRPC service definition.
 */
export interface ApigatewayApiConfigGrpcServiceDefinition {
  /**
   * Input only. File descriptor set, generated by protoc. To generate, use
   * protoc with imports and source info included. For an example test.proto
   * file, the following command would put the value in a new file named out.pb.
   * $ protoc --include_imports --include_source_info test.proto -o out.pb
   */
  fileDescriptorSet?: ApigatewayApiConfigFile;
  /**
   * Optional. Uncompiled proto files associated with the descriptor set, used
   * for display purposes (server-side compilation is not supported). These
   * should match the inputs to 'protoc' command used to generate
   * file_descriptor_set.
   */
  source?: ApigatewayApiConfigFile[];
}

function serializeApigatewayApiConfigGrpcServiceDefinition(data: any): ApigatewayApiConfigGrpcServiceDefinition {
  return {
    ...data,
    fileDescriptorSet: data["fileDescriptorSet"] !== undefined ? serializeApigatewayApiConfigFile(data["fileDescriptorSet"]) : undefined,
    source: data["source"] !== undefined ? data["source"].map((item: any) => (serializeApigatewayApiConfigFile(item))) : undefined,
  };
}

function deserializeApigatewayApiConfigGrpcServiceDefinition(data: any): ApigatewayApiConfigGrpcServiceDefinition {
  return {
    ...data,
    fileDescriptorSet: data["fileDescriptorSet"] !== undefined ? deserializeApigatewayApiConfigFile(data["fileDescriptorSet"]) : undefined,
    source: data["source"] !== undefined ? data["source"].map((item: any) => (deserializeApigatewayApiConfigFile(item))) : undefined,
  };
}

/**
 * An OpenAPI Specification Document describing an API.
 */
export interface ApigatewayApiConfigOpenApiDocument {
  /**
   * The OpenAPI Specification document file.
   */
  document?: ApigatewayApiConfigFile;
}

function serializeApigatewayApiConfigOpenApiDocument(data: any): ApigatewayApiConfigOpenApiDocument {
  return {
    ...data,
    document: data["document"] !== undefined ? serializeApigatewayApiConfigFile(data["document"]) : undefined,
  };
}

function deserializeApigatewayApiConfigOpenApiDocument(data: any): ApigatewayApiConfigOpenApiDocument {
  return {
    ...data,
    document: data["document"] !== undefined ? deserializeApigatewayApiConfigFile(data["document"]) : undefined,
  };
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
export interface ApigatewayAuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: ApigatewayAuditLogConfig[];
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
export interface ApigatewayAuditLogConfig {
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
export interface ApigatewayBinding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: ApigatewayExpr;
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
export interface ApigatewayCancelOperationRequest {
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
export interface ApigatewayExpr {
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
 * A Gateway is an API-aware HTTP proxy. It performs API-Method and/or
 * API-Consumer specific actions based on an API Config such as authentication,
 * policy enforcement, and backend selection.
 */
export interface ApigatewayGateway {
  /**
   * Required. Resource name of the API Config for this Gateway. Format:
   * projects/{project}/locations/global/apis/{api}/configs/{apiConfig}
   */
  apiConfig?: string;
  /**
   * Output only. Created time.
   */
  readonly createTime?: Date;
  /**
   * Output only. The default API Gateway host name of the form
   * `{gateway_id}-{hash}.{region_code}.gateway.dev`.
   */
  readonly defaultHostname?: string;
  /**
   * Optional. Display name.
   */
  displayName?: string;
  /**
   * Optional. Resource labels to represent user-provided metadata. Refer to
   * cloud documentation on labels for more details.
   * https://cloud.google.com/compute/docs/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Resource name of the Gateway. Format:
   * projects/{project}/locations/{location}/gateways/{gateway}
   */
  readonly name?: string;
  /**
   * Output only. The current state of the Gateway.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING" | "UPDATING";
  /**
   * Output only. Updated time.
   */
  readonly updateTime?: Date;
}

/**
 * Response message for ApiGatewayService.ListApiConfigs
 */
export interface ApigatewayListApiConfigsResponse {
  /**
   * API Configs.
   */
  apiConfigs?: ApigatewayApiConfig[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

function serializeApigatewayListApiConfigsResponse(data: any): ApigatewayListApiConfigsResponse {
  return {
    ...data,
    apiConfigs: data["apiConfigs"] !== undefined ? data["apiConfigs"].map((item: any) => (serializeApigatewayApiConfig(item))) : undefined,
  };
}

function deserializeApigatewayListApiConfigsResponse(data: any): ApigatewayListApiConfigsResponse {
  return {
    ...data,
    apiConfigs: data["apiConfigs"] !== undefined ? data["apiConfigs"].map((item: any) => (deserializeApigatewayApiConfig(item))) : undefined,
  };
}

/**
 * Response message for ApiGatewayService.ListApis
 */
export interface ApigatewayListApisResponse {
  /**
   * APIs.
   */
  apis?: ApigatewayApi[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * Response message for ApiGatewayService.ListGateways
 */
export interface ApigatewayListGatewaysResponse {
  /**
   * Gateways.
   */
  gateways?: ApigatewayGateway[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ApigatewayListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: ApigatewayLocation[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ApigatewayListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: ApigatewayOperation[];
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface ApigatewayLocation {
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
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface ApigatewayOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: ApigatewayStatus;
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
export interface ApigatewayOperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Diagnostics generated during processing of configuration
   * source files.
   */
  readonly diagnostics?: ApigatewayOperationMetadataDiagnostic[];
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
 * Diagnostic information from configuration processing.
 */
export interface ApigatewayOperationMetadataDiagnostic {
  /**
   * Location of the diagnostic.
   */
  location?: string;
  /**
   * The diagnostic message.
   */
  message?: string;
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
export interface ApigatewayPolicy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: ApigatewayAuditConfig[];
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
  bindings?: ApigatewayBinding[];
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

function serializeApigatewayPolicy(data: any): ApigatewayPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeApigatewayPolicy(data: any): ApigatewayPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface ApigatewaySetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: ApigatewayPolicy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeApigatewaySetIamPolicyRequest(data: any): ApigatewaySetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeApigatewayPolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeApigatewaySetIamPolicyRequest(data: any): ApigatewaySetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeApigatewayPolicy(data["policy"]) : undefined,
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
export interface ApigatewayStatus {
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
export interface ApigatewayTestIamPermissionsRequest {
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
export interface ApigatewayTestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
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
 * Additional options for APIGateway#projectsLocationsApisConfigsCreate.
 */
export interface ProjectsLocationsApisConfigsCreateOptions {
  /**
   * Required. Identifier to assign to the API Config. Must be unique within
   * scope of the parent resource.
   */
  apiConfigId?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsApisConfigsGetIamPolicy.
 */
export interface ProjectsLocationsApisConfigsGetIamPolicyOptions {
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
 * Additional options for APIGateway#projectsLocationsApisConfigsGet.
 */
export interface ProjectsLocationsApisConfigsGetOptions {
  /**
   * Specifies which fields of the API Config are returned in the response.
   * Defaults to `BASIC` view.
   */
  view?:  | "CONFIG_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for APIGateway#projectsLocationsApisConfigsList.
 */
export interface ProjectsLocationsApisConfigsListOptions {
  /**
   * Filter.
   */
  filter?: string;
  /**
   * Order by parameters.
   */
  orderBy?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsApisConfigsPatch.
 */
export interface ProjectsLocationsApisConfigsPatchOptions {
  /**
   * Field mask is used to specify the fields to be overwritten in the
   * ApiConfig resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisConfigsPatchOptions(data: any): ProjectsLocationsApisConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisConfigsPatchOptions(data: any): ProjectsLocationsApisConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for APIGateway#projectsLocationsApisCreate.
 */
export interface ProjectsLocationsApisCreateOptions {
  /**
   * Required. Identifier to assign to the API. Must be unique within scope of
   * the parent resource.
   */
  apiId?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsApisGetIamPolicy.
 */
export interface ProjectsLocationsApisGetIamPolicyOptions {
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
 * Additional options for APIGateway#projectsLocationsApisList.
 */
export interface ProjectsLocationsApisListOptions {
  /**
   * Filter.
   */
  filter?: string;
  /**
   * Order by parameters.
   */
  orderBy?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsApisPatch.
 */
export interface ProjectsLocationsApisPatchOptions {
  /**
   * Field mask is used to specify the fields to be overwritten in the Api
   * resource by the update. The fields specified in the update_mask are
   * relative to the resource, not the full request. A field will be overwritten
   * if it is in the mask. If the user does not provide a mask then all fields
   * will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisPatchOptions(data: any): ProjectsLocationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisPatchOptions(data: any): ProjectsLocationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for APIGateway#projectsLocationsGatewaysCreate.
 */
export interface ProjectsLocationsGatewaysCreateOptions {
  /**
   * Required. Identifier to assign to the Gateway. Must be unique within scope
   * of the parent resource.
   */
  gatewayId?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsGatewaysGetIamPolicy.
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
 * Additional options for APIGateway#projectsLocationsGatewaysList.
 */
export interface ProjectsLocationsGatewaysListOptions {
  /**
   * Filter.
   */
  filter?: string;
  /**
   * Order by parameters.
   */
  orderBy?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
}

/**
 * Additional options for APIGateway#projectsLocationsGatewaysPatch.
 */
export interface ProjectsLocationsGatewaysPatchOptions {
  /**
   * Field mask is used to specify the fields to be overwritten in the Gateway
   * resource by the update. The fields specified in the update_mask are
   * relative to the resource, not the full request. A field will be overwritten
   * if it is in the mask. If the user does not provide a mask then all fields
   * will be overwritten.
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
 * Additional options for APIGateway#projectsLocationsList.
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
 * Additional options for APIGateway#projectsLocationsOperationsList.
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
