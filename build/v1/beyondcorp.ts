// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * BeyondCorp API Client for Deno
 * ==============================
 * 
 * Beyondcorp Enterprise provides identity and context aware access controls for enterprise resources and enables zero-trust access. Using the Beyondcorp Enterprise APIs, enterprises can set up multi-cloud and on-prem connectivity solutions.
 * 
 * Docs: https://cloud.google.com/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Beyondcorp Enterprise provides identity and context aware access controls
 * for enterprise resources and enables zero-trust access. Using the Beyondcorp
 * Enterprise APIs, enterprises can set up multi-cloud and on-prem connectivity
 * solutions.
 */
export class BeyondCorp {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://beyondcorp.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new AppConnection in a given project and location.
   *
   * @param parent Required. The resource project name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppConnectionsCreate(parent: string, req: GoogleCloudBeyondcorpAppconnectionsV1AppConnection, opts: ProjectsLocationsAppConnectionsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appConnections`);
    if (opts.appConnectionId !== undefined) {
      url.searchParams.append("appConnectionId", String(opts.appConnectionId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a single AppConnection.
   *
   * @param name Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}`
   */
  async projectsLocationsAppConnectionsDelete(name: string, opts: ProjectsLocationsAppConnectionsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single AppConnection.
   *
   * @param name Required. BeyondCorp AppConnection name using the form: `projects/{project_id}/locations/{location_id}/appConnections/{app_connection_id}`
   */
  async projectsLocationsAppConnectionsGet(name: string): Promise<GoogleCloudBeyondcorpAppconnectionsV1AppConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppConnectionsGetIamPolicy(resource: string, opts: ProjectsLocationsAppConnectionsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists AppConnections in a given project and location.
   *
   * @param parent Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppConnectionsList(parent: string, opts: ProjectsLocationsAppConnectionsListOptions = {}): Promise<GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appConnections`);
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
    return data as GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse;
  }

  /**
   * Updates the parameters of a single AppConnection.
   *
   * @param name Required. Unique resource name of the AppConnection. The name is ignored when creating a AppConnection.
   */
  async projectsLocationsAppConnectionsPatch(name: string, req: GoogleCloudBeyondcorpAppconnectionsV1AppConnection, opts: ProjectsLocationsAppConnectionsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsAppConnectionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Resolves AppConnections details for a given AppConnector. An internal
   * method called by a connector to find AppConnections to connect to.
   *
   * @param parent Required. The resource name of the AppConnection location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppConnectionsResolve(parent: string, opts: ProjectsLocationsAppConnectionsResolveOptions = {}): Promise<GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appConnections:resolve`);
    if (opts.appConnectorId !== undefined) {
      url.searchParams.append("appConnectorId", String(opts.appConnectorId));
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
    return data as GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppConnectionsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
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
  async projectsLocationsAppConnectionsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a new AppConnector in a given project and location.
   *
   * @param parent Required. The resource project name of the AppConnector location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppConnectorsCreate(parent: string, req: GoogleCloudBeyondcorpAppconnectorsV1AppConnector, opts: ProjectsLocationsAppConnectorsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appConnectors`);
    if (opts.appConnectorId !== undefined) {
      url.searchParams.append("appConnectorId", String(opts.appConnectorId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a single AppConnector.
   *
   * @param name Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}`
   */
  async projectsLocationsAppConnectorsDelete(name: string, opts: ProjectsLocationsAppConnectorsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single AppConnector.
   *
   * @param name Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}`
   */
  async projectsLocationsAppConnectorsGet(name: string): Promise<GoogleCloudBeyondcorpAppconnectorsV1AppConnector> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppConnectorsGetIamPolicy(resource: string, opts: ProjectsLocationsAppConnectorsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists AppConnectors in a given project and location.
   *
   * @param parent Required. The resource name of the AppConnector location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppConnectorsList(parent: string, opts: ProjectsLocationsAppConnectorsListOptions = {}): Promise<GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appConnectors`);
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
    return deserializeGoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse(data);
  }

  /**
   * Updates the parameters of a single AppConnector.
   *
   * @param name Required. Unique resource name of the AppConnector. The name is ignored when creating a AppConnector.
   */
  async projectsLocationsAppConnectorsPatch(name: string, req: GoogleCloudBeyondcorpAppconnectorsV1AppConnector, opts: ProjectsLocationsAppConnectorsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(req);
    opts = serializeProjectsLocationsAppConnectorsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Report status for a given connector.
   *
   * @param appConnector Required. BeyondCorp Connector name using the form: `projects/{project_id}/locations/{location_id}/connectors/{connector}`
   */
  async projectsLocationsAppConnectorsReportStatus(appConnector: string, req: GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ appConnector }:reportStatus`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets instance configuration for a given AppConnector. An internal method
   * called by a AppConnector to get its container config.
   *
   * @param appConnector Required. BeyondCorp AppConnector name using the form: `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector}`
   */
  async projectsLocationsAppConnectorsResolveInstanceConfig(appConnector: string): Promise<GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ appConnector }:resolveInstanceConfig`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppConnectorsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
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
  async projectsLocationsAppConnectorsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a new AppGateway in a given project and location.
   *
   * @param parent Required. The resource project name of the AppGateway location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppGatewaysCreate(parent: string, req: AppGateway, opts: ProjectsLocationsAppGatewaysCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appGateways`);
    if (opts.appGatewayId !== undefined) {
      url.searchParams.append("appGatewayId", String(opts.appGatewayId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a single AppGateway.
   *
   * @param name Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}`
   */
  async projectsLocationsAppGatewaysDelete(name: string, opts: ProjectsLocationsAppGatewaysDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single AppGateway.
   *
   * @param name Required. BeyondCorp AppGateway name using the form: `projects/{project_id}/locations/{location_id}/appGateways/{app_gateway_id}`
   */
  async projectsLocationsAppGatewaysGet(name: string): Promise<AppGateway> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AppGateway;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppGatewaysGetIamPolicy(resource: string, opts: ProjectsLocationsAppGatewaysGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists AppGateways in a given project and location.
   *
   * @param parent Required. The resource name of the AppGateway location using the form: `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsAppGatewaysList(parent: string, opts: ProjectsLocationsAppGatewaysListOptions = {}): Promise<ListAppGatewaysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/appGateways`);
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
    return data as ListAppGatewaysResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAppGatewaysSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
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
  async projectsLocationsAppGatewaysTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a new ClientConnectorService in a given project and location.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsClientConnectorServicesCreate(parent: string, req: ClientConnectorService, opts: ProjectsLocationsClientConnectorServicesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clientConnectorServices`);
    if (opts.clientConnectorServiceId !== undefined) {
      url.searchParams.append("clientConnectorServiceId", String(opts.clientConnectorServiceId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a single ClientConnectorService.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsClientConnectorServicesDelete(name: string, opts: ProjectsLocationsClientConnectorServicesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single ClientConnectorService.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsClientConnectorServicesGet(name: string): Promise<ClientConnectorService> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ClientConnectorService;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsClientConnectorServicesGetIamPolicy(resource: string, opts: ProjectsLocationsClientConnectorServicesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists ClientConnectorServices in a given project and location.
   *
   * @param parent Required. Parent value for ListClientConnectorServicesRequest.
   */
  async projectsLocationsClientConnectorServicesList(parent: string, opts: ProjectsLocationsClientConnectorServicesListOptions = {}): Promise<ListClientConnectorServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clientConnectorServices`);
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
    return data as ListClientConnectorServicesResponse;
  }

  /**
   * Updates the parameters of a single ClientConnectorService.
   *
   * @param name Required. Name of resource. The name is ignored during creation.
   */
  async projectsLocationsClientConnectorServicesPatch(name: string, req: ClientConnectorService, opts: ProjectsLocationsClientConnectorServicesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsClientConnectorServicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsClientConnectorServicesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
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
  async projectsLocationsClientConnectorServicesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a new ClientGateway in a given project and location.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsClientGatewaysCreate(parent: string, req: ClientGateway, opts: ProjectsLocationsClientGatewaysCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clientGateways`);
    if (opts.clientGatewayId !== undefined) {
      url.searchParams.append("clientGatewayId", String(opts.clientGatewayId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a single ClientGateway.
   *
   * @param name Required. Name of the resource
   */
  async projectsLocationsClientGatewaysDelete(name: string, opts: ProjectsLocationsClientGatewaysDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets details of a single ClientGateway.
   *
   * @param name Required. Name of the resource
   */
  async projectsLocationsClientGatewaysGet(name: string): Promise<ClientGateway> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ClientGateway;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsClientGatewaysGetIamPolicy(resource: string, opts: ProjectsLocationsClientGatewaysGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists ClientGateways in a given project and location.
   *
   * @param parent Required. Parent value for ListClientGatewaysRequest.
   */
  async projectsLocationsClientGatewaysList(parent: string, opts: ProjectsLocationsClientGatewaysListOptions = {}): Promise<ListClientGatewaysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clientGateways`);
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
    return data as ListClientGatewaysResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsClientGatewaysSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
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
  async projectsLocationsClientGatewaysTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<GoogleCloudLocationLocation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudLocationLocation;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<GoogleCloudLocationListLocationsResponse> {
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
    return data as GoogleCloudLocationListLocationsResponse;
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
}

/**
 * Allocated connection of the AppGateway.
 */
export interface AllocatedConnection {
  /**
   * Required. The ingress port of an allocated connection
   */
  ingressPort?: number;
  /**
   * Required. The PSC uri of an allocated connection
   */
  pscUri?: string;
}

/**
 * A BeyondCorp AppGateway resource represents a BeyondCorp protected
 * AppGateway to a remote application. It creates all the necessary GCP
 * components needed for creating a BeyondCorp protected AppGateway. Multiple
 * connectors can be authorised for a single AppGateway.
 */
export interface AppGateway {
  /**
   * Output only. A list of connections allocated for the Gateway
   */
  readonly allocatedConnections?: AllocatedConnection[];
  /**
   * Output only. Timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. An arbitrary user-provided name for the AppGateway. Cannot
   * exceed 64 characters.
   */
  displayName?: string;
  /**
   * Required. The type of hosting used by the AppGateway.
   */
  hostType?:  | "HOST_TYPE_UNSPECIFIED" | "GCP_REGIONAL_MIG";
  /**
   * Optional. Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Unique resource name of the AppGateway. The name is ignored when
   * creating an AppGateway.
   */
  name?: string;
  /**
   * Output only. The current state of the AppGateway.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN";
  /**
   * Required. The type of network connectivity used by the AppGateway.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TCP_PROXY";
  /**
   * Output only. A unique identifier for the instance generated by the system.
   */
  readonly uid?: string;
  /**
   * Output only. Timestamp when the resource was last modified.
   */
  readonly updateTime?: Date;
  /**
   * Output only. Server-defined URI for this resource.
   */
  readonly uri?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface AppGatewayOperationMetadata {
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
 * Message describing ClientConnectorService object.
 */
export interface ClientConnectorService {
  /**
   * Output only. [Output only] Create time stamp.
   */
  readonly createTime?: Date;
  /**
   * Optional. User-provided name. The display name should follow certain
   * format. * Must be 6 to 30 characters in length. * Can only contain
   * lowercase letters, numbers, and hyphens. * Must start with a letter.
   */
  displayName?: string;
  /**
   * Required. The details of the egress settings.
   */
  egress?: Egress;
  /**
   * Required. The details of the ingress settings.
   */
  ingress?: Ingress;
  /**
   * Required. Name of resource. The name is ignored during creation.
   */
  name?: string;
  /**
   * Output only. The operational state of the ClientConnectorService.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "DELETING" | "RUNNING" | "DOWN" | "ERROR";
  /**
   * Output only. [Output only] Update time stamp.
   */
  readonly updateTime?: Date;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface ClientConnectorServiceOperationMetadata {
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
 * Message describing ClientGateway object.
 */
export interface ClientGateway {
  /**
   * Output only. The client connector service name that the client gateway is
   * associated to. Client Connector Services, named as follows:
   * `projects/{project_id}/locations/{location_id}/client_connector_services/{client_connector_service_id}`.
   */
  readonly clientConnectorService?: string;
  /**
   * Output only. [Output only] Create time stamp.
   */
  readonly createTime?: Date;
  /**
   * Output only. A unique identifier for the instance generated by the system.
   */
  readonly id?: string;
  /**
   * Required. name of resource. The name is ignored during creation.
   */
  name?: string;
  /**
   * Output only. The operational state of the gateway.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "DELETING" | "RUNNING" | "DOWN" | "ERROR";
  /**
   * Output only. [Output only] Update time stamp.
   */
  readonly updateTime?: Date;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface ClientGatewayOperationMetadata {
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
 * ConnectionConfig represents a Connection Configuration object.
 */
export interface CloudSecurityZerotrustApplinkAppConnectorProtoConnectionConfig {
  /**
   * application_endpoint is the endpoint of the application the form of
   * host:port. For example, "localhost:80".
   */
  applicationEndpoint?: string;
  /**
   * application_name represents the given name of the application the
   * connection is connecting with.
   */
  applicationName?: string;
  /**
   * gateway lists all instances running a gateway in GCP. They all connect to
   * a connector on the host.
   */
  gateway?: CloudSecurityZerotrustApplinkAppConnectorProtoGateway[];
  /**
   * name is the unique ID for each connection. TODO(b/190732451) returns
   * connection name from user-specified name in config. Now, name =
   * ${application_name}:${application_endpoint}
   */
  name?: string;
  /**
   * project represents the consumer project the connection belongs to.
   */
  project?: string;
  /**
   * tunnels_per_gateway reflects the number of tunnels between a connector and
   * a gateway.
   */
  tunnelsPerGateway?: number;
  /**
   * user_port specifies the reserved port on gateways for user connections.
   */
  userPort?: number;
}

/**
 * ConnectorDetails reflects the details of a connector.
 */
export interface CloudSecurityZerotrustApplinkAppConnectorProtoConnectorDetails {
}

/**
 * Gateway represents a GCE VM Instance endpoint for use by IAP TCP.
 */
export interface CloudSecurityZerotrustApplinkAppConnectorProtoGateway {
  /**
   * interface specifies the network interface of the gateway to connect to.
   */
  interface?: string;
  /**
   * name is the name of an instance running a gateway. It is the unique ID for
   * a gateway. All gateways under the same connection have the same prefix. It
   * is derived from the gateway URL. For example, name=${instance} assuming a
   * gateway URL.
   * https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance}
   */
  name?: string;
  /**
   * port specifies the port of the gateway for tunnel connections from the
   * connectors.
   */
  port?: number;
  /**
   * project is the tenant project the gateway belongs to. Different from the
   * project in the connection, it is a BeyondCorpAPI internally created project
   * to manage all the gateways. It is sharing the same network with the
   * consumer project user owned. It is derived from the gateway URL. For
   * example, project=${project} assuming a gateway URL.
   * https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance}
   */
  project?: string;
  /**
   * self_link is the gateway URL in the form
   * https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance}
   */
  selfLink?: string;
  /**
   * zone represents the zone the instance belongs. It is derived from the
   * gateway URL. For example, zone=${zone} assuming a gateway URL.
   * https://www.googleapis.com/compute/${version}/projects/${project}/zones/${zone}/instances/${instance}
   */
  zone?: string;
}

/**
 * LogAgentDetails reflects the details of a log agent.
 */
export interface CloudSecurityZerotrustApplinkLogagentProtoLogAgentDetails {
}

/**
 * The basic ingress config for ClientGateways.
 */
export interface Config {
  /**
   * Required. The settings used to configure basic ClientGateways.
   */
  destinationRoutes?: DestinationRoute[];
  /**
   * Required. Immutable. The transport protocol used between the client and
   * the server.
   */
  transportProtocol?:  | "TRANSPORT_PROTOCOL_UNSPECIFIED" | "TCP";
}

/**
 * The setting used to configure ClientGateways. It is adding routes to the
 * client's routing table after the connection is established.
 */
export interface DestinationRoute {
  /**
   * Required. The network address of the subnet for which the packet is routed
   * to the ClientGateway.
   */
  address?: string;
  /**
   * Required. The network mask of the subnet for which the packet is routed to
   * the ClientGateway.
   */
  netmask?: string;
}

/**
 * The details of the egress info. One of the following options should be set.
 */
export interface Egress {
  /**
   * A VPC from the consumer project.
   */
  peeredVpc?: PeeredVpc;
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
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1alphaAppConnectionOperationMetadata {
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
 * A BeyondCorp AppConnection resource represents a BeyondCorp protected
 * AppConnection to a remote application. It creates all the necessary GCP
 * components needed for creating a BeyondCorp protected AppConnection. Multiple
 * connectors can be authorised for a single AppConnection.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnection {
  /**
   * Required. Address of the remote application endpoint for the BeyondCorp
   * AppConnection.
   */
  applicationEndpoint?: GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint;
  /**
   * Optional. List of [google.cloud.beyondcorp.v1main.Connector.name] that are
   * authorised to be associated with this AppConnection.
   */
  connectors?: string[];
  /**
   * Output only. Timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. An arbitrary user-provided name for the AppConnection. Cannot
   * exceed 64 characters.
   */
  displayName?: string;
  /**
   * Optional. Gateway used by the AppConnection.
   */
  gateway?: GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway;
  /**
   * Optional. Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Unique resource name of the AppConnection. The name is ignored
   * when creating a AppConnection.
   */
  name?: string;
  /**
   * Output only. The current state of the AppConnection.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN";
  /**
   * Required. The type of network connectivity used by the AppConnection.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TCP_PROXY";
  /**
   * Output only. A unique identifier for the instance generated by the system.
   */
  readonly uid?: string;
  /**
   * Output only. Timestamp when the resource was last modified.
   */
  readonly updateTime?: Date;
}

/**
 * ApplicationEndpoint represents a remote application endpoint.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionApplicationEndpoint {
  /**
   * Required. Hostname or IP address of the remote application endpoint.
   */
  host?: string;
  /**
   * Required. Port of the remote application endpoint.
   */
  port?: number;
}

/**
 * Gateway represents a user facing component that serves as an entrance to
 * enable connectivity.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionGateway {
  /**
   * Required. AppGateway name in following format:
   * `projects/{project_id}/locations/{location_id}/appgateways/{gateway_id}`
   */
  appGateway?: string;
  /**
   * Output only. Ingress port reserved on the gateways for this AppConnection,
   * if not specified or zero, the default port is 19443.
   */
  readonly ingressPort?: number;
  /**
   * Output only. L7 private service connection for this resource.
   */
  readonly l7psc?: string;
  /**
   * Required. The type of hosting used by the gateway.
   */
  type?:  | "TYPE_UNSPECIFIED" | "GCP_REGIONAL_MIG";
  /**
   * Output only. Server-defined URI for this resource.
   */
  readonly uri?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1AppConnectionOperationMetadata {
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
 * Response message for BeyondCorp.ListAppConnections.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1ListAppConnectionsResponse {
  /**
   * A list of BeyondCorp AppConnections in the project.
   */
  appConnections?: GoogleCloudBeyondcorpAppconnectionsV1AppConnection[];
  /**
   * A token to retrieve the next page of results, or empty if there are no
   * more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for BeyondCorp.ResolveAppConnections.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponse {
  /**
   * A list of BeyondCorp AppConnections with details in the project.
   */
  appConnectionDetails?: GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails[];
  /**
   * A token to retrieve the next page of results, or empty if there are no
   * more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Details of the AppConnection.
 */
export interface GoogleCloudBeyondcorpAppconnectionsV1ResolveAppConnectionsResponseAppConnectionDetails {
  /**
   * A BeyondCorp AppConnection in the project.
   */
  appConnection?: GoogleCloudBeyondcorpAppconnectionsV1AppConnection;
  /**
   * If type=GCP_REGIONAL_MIG, contains most recent VM instances, like
   * `https://www.googleapis.com/compute/v1/projects/{project_id}/zones/{zone_id}/instances/{instance_id}`.
   */
  recentMigVms?: string[];
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1alphaAppConnectorOperationMetadata {
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
 * ContainerHealthDetails reflects the health details of a container.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1alphaContainerHealthDetails {
  /**
   * The version of the current config.
   */
  currentConfigVersion?: string;
  /**
   * The latest error message.
   */
  errorMsg?: string;
  /**
   * The version of the expected config.
   */
  expectedConfigVersion?: string;
  /**
   * The extended status. Such as ExitCode, StartedAt, FinishedAt, etc.
   */
  extendedStatus?: {
    [key: string]: string
  };
}

/**
 * RemoteAgentDetails reflects the details of a remote agent.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1alphaRemoteAgentDetails {
}

/**
 * A BeyondCorp connector resource that represents an application facing
 * component deployed proximal to and with direct access to the application
 * instances. It is used to establish connectivity between the remote enterprise
 * environment and GCP. It initiates connections to the applications and can
 * proxy the data from users over the connection.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnector {
  /**
   * Output only. Timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. An arbitrary user-provided name for the AppConnector. Cannot
   * exceed 64 characters.
   */
  displayName?: string;
  /**
   * Optional. Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Unique resource name of the AppConnector. The name is ignored
   * when creating a AppConnector.
   */
  name?: string;
  /**
   * Required. Principal information about the Identity of the AppConnector.
   */
  principalInfo?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo;
  /**
   * Optional. Resource info of the connector.
   */
  resourceInfo?: GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo;
  /**
   * Output only. The current state of the AppConnector.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "UPDATING" | "DELETING" | "DOWN";
  /**
   * Output only. A unique identifier for the instance generated by the system.
   */
  readonly uid?: string;
  /**
   * Output only. Timestamp when the resource was last modified.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(data: any): GoogleCloudBeyondcorpAppconnectorsV1AppConnector {
  return {
    ...data,
    resourceInfo: data["resourceInfo"] !== undefined ? serializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data["resourceInfo"]) : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(data: any): GoogleCloudBeyondcorpAppconnectorsV1AppConnector {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    resourceInfo: data["resourceInfo"] !== undefined ? deserializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data["resourceInfo"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * AppConnectorInstanceConfig defines the instance config of a AppConnector.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig {
  /**
   * ImageConfig defines the GCR images to run for the remote agent's control
   * plane.
   */
  imageConfig?: GoogleCloudBeyondcorpAppconnectorsV1ImageConfig;
  /**
   * The SLM instance agent configuration.
   */
  instanceConfig?: {
    [key: string]: any
  };
  /**
   * NotificationConfig defines the notification mechanism that the remote
   * instance should subscribe to in order to receive notification.
   */
  notificationConfig?: GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig;
  /**
   * Required. A monotonically increasing number generated and maintained by
   * the API provider. Every time a config changes in the backend, the
   * sequenceNumber should be bumped up to reflect the change.
   */
  sequenceNumber?: bigint;
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig(data: any): GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig {
  return {
    ...data,
    sequenceNumber: data["sequenceNumber"] !== undefined ? String(data["sequenceNumber"]) : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig(data: any): GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig {
  return {
    ...data,
    sequenceNumber: data["sequenceNumber"] !== undefined ? BigInt(data["sequenceNumber"]) : undefined,
  };
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorOperationMetadata {
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
 * PrincipalInfo represents an Identity oneof.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfo {
  /**
   * A GCP service account.
   */
  serviceAccount?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount;
}

/**
 * ServiceAccount represents a GCP service account.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1AppConnectorPrincipalInfoServiceAccount {
  /**
   * Email address of the service account.
   */
  email?: string;
}

/**
 * ContainerHealthDetails reflects the health details of a container.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ContainerHealthDetails {
  /**
   * The version of the current config.
   */
  currentConfigVersion?: string;
  /**
   * The latest error message.
   */
  errorMsg?: string;
  /**
   * The version of the expected config.
   */
  expectedConfigVersion?: string;
  /**
   * The extended status. Such as ExitCode, StartedAt, FinishedAt, etc.
   */
  extendedStatus?: {
    [key: string]: string
  };
}

/**
 * ImageConfig defines the control plane images to run.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ImageConfig {
  /**
   * The stable image that the remote agent will fallback to if the target
   * image fails. Format would be a gcr image path, e.g.:
   * gcr.io/PROJECT-ID/my-image:tag1
   */
  stableImage?: string;
  /**
   * The initial image the remote agent will attempt to run for the control
   * plane. Format would be a gcr image path, e.g.:
   * gcr.io/PROJECT-ID/my-image:tag1
   */
  targetImage?: string;
}

/**
 * Response message for BeyondCorp.ListAppConnectors.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse {
  /**
   * A list of BeyondCorp AppConnectors in the project.
   */
  appConnectors?: GoogleCloudBeyondcorpAppconnectorsV1AppConnector[];
  /**
   * A token to retrieve the next page of results, or empty if there are no
   * more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse(data: any): GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse {
  return {
    ...data,
    appConnectors: data["appConnectors"] !== undefined ? data["appConnectors"].map((item: any) => (serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(item))) : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse(data: any): GoogleCloudBeyondcorpAppconnectorsV1ListAppConnectorsResponse {
  return {
    ...data,
    appConnectors: data["appConnectors"] !== undefined ? data["appConnectors"].map((item: any) => (deserializeGoogleCloudBeyondcorpAppconnectorsV1AppConnector(item))) : undefined,
  };
}

/**
 * NotificationConfig defines the mechanisms to notify instance agent.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1NotificationConfig {
  /**
   * Cloud Pub/Sub Configuration to receive notifications.
   */
  pubsubNotification?: GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig;
}

/**
 * The configuration for Pub/Sub messaging for the AppConnector.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1NotificationConfigCloudPubSubNotificationConfig {
  /**
   * The Pub/Sub subscription the AppConnector uses to receive notifications.
   */
  pubsubSubscription?: string;
}

/**
 * RemoteAgentDetails reflects the details of a remote agent.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1RemoteAgentDetails {
}

/**
 * Request report the connector status.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Resource info of the connector.
   */
  resourceInfo?: GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest(data: any): GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest {
  return {
    ...data,
    resourceInfo: data["resourceInfo"] !== undefined ? serializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data["resourceInfo"]) : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest(data: any): GoogleCloudBeyondcorpAppconnectorsV1ReportStatusRequest {
  return {
    ...data,
    resourceInfo: data["resourceInfo"] !== undefined ? deserializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data["resourceInfo"]) : undefined,
  };
}

/**
 * Response message for BeyondCorp.ResolveInstanceConfig.
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse {
  /**
   * AppConnectorInstanceConfig.
   */
  instanceConfig?: GoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig;
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse(data: any): GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse {
  return {
    ...data,
    instanceConfig: data["instanceConfig"] !== undefined ? serializeGoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig(data["instanceConfig"]) : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse(data: any): GoogleCloudBeyondcorpAppconnectorsV1ResolveInstanceConfigResponse {
  return {
    ...data,
    instanceConfig: data["instanceConfig"] !== undefined ? deserializeGoogleCloudBeyondcorpAppconnectorsV1AppConnectorInstanceConfig(data["instanceConfig"]) : undefined,
  };
}

/**
 * ResourceInfo represents the information/status of an app connector resource.
 * Such as: - remote_agent - container - runtime - appgateway - appconnector -
 * appconnection - tunnel - logagent
 */
export interface GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo {
  /**
   * Required. Unique Id for the resource.
   */
  id?: string;
  /**
   * Specific details for the resource. This is for internal use only.
   */
  resource?: {
    [key: string]: any
  };
  /**
   * Overall health status. Overall status is derived based on the status of
   * each sub level resources.
   */
  status?:  | "HEALTH_STATUS_UNSPECIFIED" | "HEALTHY" | "UNHEALTHY" | "UNRESPONSIVE" | "DEGRADED";
  /**
   * List of Info for the sub level resources.
   */
  sub?: GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo[];
  /**
   * The timestamp to collect the info. It is suggested to be set by the
   * topmost level resource only.
   */
  time?: Date;
}

function serializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data: any): GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo {
  return {
    ...data,
    sub: data["sub"] !== undefined ? data["sub"].map((item: any) => (serializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(item))) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(data: any): GoogleCloudBeyondcorpAppconnectorsV1ResourceInfo {
  return {
    ...data,
    sub: data["sub"] !== undefined ? data["sub"].map((item: any) => (deserializeGoogleCloudBeyondcorpAppconnectorsV1ResourceInfo(item))) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpAppgatewaysV1alphaAppGatewayOperationMetadata {
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
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpClientconnectorservicesV1alphaClientConnectorServiceOperationMetadata {
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
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpClientgatewaysV1alphaClientGatewayOperationMetadata {
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
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpConnectionsV1alphaConnectionOperationMetadata {
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
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudBeyondcorpConnectorsV1alphaConnectorOperationMetadata {
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
 * ContainerHealthDetails reflects the health details of a container.
 */
export interface GoogleCloudBeyondcorpConnectorsV1alphaContainerHealthDetails {
  /**
   * The version of the current config.
   */
  currentConfigVersion?: string;
  /**
   * The latest error message.
   */
  errorMsg?: string;
  /**
   * The version of the expected config.
   */
  expectedConfigVersion?: string;
  /**
   * The extended status. Such as ExitCode, StartedAt, FinishedAt, etc.
   */
  extendedStatus?: {
    [key: string]: string
  };
}

/**
 * RemoteAgentDetails reflects the details of a remote agent.
 */
export interface GoogleCloudBeyondcorpConnectorsV1alphaRemoteAgentDetails {
}

/**
 * The response message for Locations.ListLocations.
 */
export interface GoogleCloudLocationListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: GoogleCloudLocationLocation[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface GoogleCloudLocationLocation {
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
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
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
export interface GoogleIamV1AuditLogConfig {
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
export interface GoogleIamV1Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: GoogleTypeExpr;
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
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
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
  bindings?: GoogleIamV1Binding[];
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

function serializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface GoogleIamV1SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface GoogleIamV1TestIamPermissionsRequest {
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
export interface GoogleIamV1TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
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
export interface GoogleTypeExpr {
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
 * Settings of how to connect to the ClientGateway. One of the following
 * options should be set.
 */
export interface Ingress {
  /**
   * The basic ingress config for ClientGateways.
   */
  config?: Config;
}

/**
 * Response message for BeyondCorp.ListAppGateways.
 */
export interface ListAppGatewaysResponse {
  /**
   * A list of BeyondCorp AppGateways in the project.
   */
  appGateways?: AppGateway[];
  /**
   * A token to retrieve the next page of results, or empty if there are no
   * more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Message for response to listing ClientConnectorServices.
 */
export interface ListClientConnectorServicesResponse {
  /**
   * The list of ClientConnectorService.
   */
  clientConnectorServices?: ClientConnectorService[];
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Message for response to listing ClientGateways.
 */
export interface ListClientGatewaysResponse {
  /**
   * The list of ClientGateway.
   */
  clientGateways?: ClientGateway[];
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * The peered VPC owned by the consumer project.
 */
export interface PeeredVpc {
  /**
   * Required. The name of the peered VPC owned by the consumer project.
   */
  networkVpc?: string;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectionsCreate.
 */
export interface ProjectsLocationsAppConnectionsCreateOptions {
  /**
   * Optional. User-settable AppConnection resource ID. * Must start with a
   * letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end
   * with a number or a letter.
   */
  appConnectionId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectionsDelete.
 */
export interface ProjectsLocationsAppConnectionsDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsAppConnectionsGetIamPolicy.
 */
export interface ProjectsLocationsAppConnectionsGetIamPolicyOptions {
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
 * Additional options for BeyondCorp#projectsLocationsAppConnectionsList.
 */
export interface ProjectsLocationsAppConnectionsListOptions {
  /**
   * Optional. A filter specifying constraints of a list operation.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results. See [Sorting
   * order](https://cloud.google.com/apis/design/design_patterns#sorting_order)
   * for more information.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 50 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous
   * ListAppConnectionsRequest, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectionsPatch.
 */
export interface ProjectsLocationsAppConnectionsPatchOptions {
  /**
   * Optional. If set as true, will create the resource if it is not found.
   */
  allowMissing?: boolean;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include these
   * fields from [BeyondCorp.AppConnection]: * `labels` * `display_name` *
   * `application_endpoint` * `connectors`
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsAppConnectionsPatchOptions(data: any): ProjectsLocationsAppConnectionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAppConnectionsPatchOptions(data: any): ProjectsLocationsAppConnectionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectionsResolve.
 */
export interface ProjectsLocationsAppConnectionsResolveOptions {
  /**
   * Required. BeyondCorp Connector name of the connector associated with those
   * AppConnections using the form:
   * `projects/{project_id}/locations/{location_id}/appConnectors/{app_connector_id}`
   */
  appConnectorId?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 50 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous
   * ResolveAppConnectionsResponse, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectorsCreate.
 */
export interface ProjectsLocationsAppConnectorsCreateOptions {
  /**
   * Optional. User-settable AppConnector resource ID. * Must start with a
   * letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end
   * with a number or a letter.
   */
  appConnectorId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectorsDelete.
 */
export interface ProjectsLocationsAppConnectorsDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsAppConnectorsGetIamPolicy.
 */
export interface ProjectsLocationsAppConnectorsGetIamPolicyOptions {
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
 * Additional options for BeyondCorp#projectsLocationsAppConnectorsList.
 */
export interface ProjectsLocationsAppConnectorsListOptions {
  /**
   * Optional. A filter specifying constraints of a list operation.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results. See [Sorting
   * order](https://cloud.google.com/apis/design/design_patterns#sorting_order)
   * for more information.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 50 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous
   * ListAppConnectorsRequest, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppConnectorsPatch.
 */
export interface ProjectsLocationsAppConnectorsPatchOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include these
   * fields from [BeyondCorp.AppConnector]: * `labels` * `display_name`
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsAppConnectorsPatchOptions(data: any): ProjectsLocationsAppConnectorsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAppConnectorsPatchOptions(data: any): ProjectsLocationsAppConnectorsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppGatewaysCreate.
 */
export interface ProjectsLocationsAppGatewaysCreateOptions {
  /**
   * Optional. User-settable AppGateway resource ID. * Must start with a
   * letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end
   * with a number or a letter.
   */
  appGatewayId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppGatewaysDelete.
 */
export interface ProjectsLocationsAppGatewaysDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for BeyondCorp#projectsLocationsAppGatewaysGetIamPolicy.
 */
export interface ProjectsLocationsAppGatewaysGetIamPolicyOptions {
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
 * Additional options for BeyondCorp#projectsLocationsAppGatewaysList.
 */
export interface ProjectsLocationsAppGatewaysListOptions {
  /**
   * Optional. A filter specifying constraints of a list operation.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results. See [Sorting
   * order](https://cloud.google.com/apis/design/design_patterns#sorting_order)
   * for more information.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 50 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous
   * ListAppGatewaysRequest, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsClientConnectorServicesCreate.
 */
export interface ProjectsLocationsClientConnectorServicesCreateOptions {
  /**
   * Optional. User-settable client connector service resource ID. * Must start
   * with a letter. * Must contain between 4-63 characters from `/a-z-/`. * Must
   * end with a number or a letter. A random system generated name will be
   * assigned if not specified by the user.
   */
  clientConnectorServiceId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsClientConnectorServicesDelete.
 */
export interface ProjectsLocationsClientConnectorServicesDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsClientConnectorServicesGetIamPolicy.
 */
export interface ProjectsLocationsClientConnectorServicesGetIamPolicyOptions {
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
 * BeyondCorp#projectsLocationsClientConnectorServicesList.
 */
export interface ProjectsLocationsClientConnectorServicesListOptions {
  /**
   * Optional. Filtering results.
   */
  filter?: string;
  /**
   * Optional. Hint for how to order the results.
   */
  orderBy?: string;
  /**
   * Optional. Requested page size. Server may return fewer items than
   * requested. If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results the server should return.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsClientConnectorServicesPatch.
 */
export interface ProjectsLocationsClientConnectorServicesPatchOptions {
  /**
   * Optional. If set as true, will create the resource if it is not found.
   */
  allowMissing?: boolean;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the ClientConnectorService resource by the update. The fields specified in
   * the update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten. Mutable fields: display_name,
   * ingress.config.destination_routes.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsClientConnectorServicesPatchOptions(data: any): ProjectsLocationsClientConnectorServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsClientConnectorServicesPatchOptions(data: any): ProjectsLocationsClientConnectorServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BeyondCorp#projectsLocationsClientGatewaysCreate.
 */
export interface ProjectsLocationsClientGatewaysCreateOptions {
  /**
   * Optional. User-settable client gateway resource ID. * Must start with a
   * letter. * Must contain between 4-63 characters from `/a-z-/`. * Must end
   * with a number or a letter.
   */
  clientGatewayId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for BeyondCorp#projectsLocationsClientGatewaysDelete.
 */
export interface ProjectsLocationsClientGatewaysDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validates request by executing a dry-run which would not
   * alter the resource in any way.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * BeyondCorp#projectsLocationsClientGatewaysGetIamPolicy.
 */
export interface ProjectsLocationsClientGatewaysGetIamPolicyOptions {
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
 * Additional options for BeyondCorp#projectsLocationsClientGatewaysList.
 */
export interface ProjectsLocationsClientGatewaysListOptions {
  /**
   * Optional. Filtering results.
   */
  filter?: string;
  /**
   * Optional. Hint for how to order the results.
   */
  orderBy?: string;
  /**
   * Optional. Requested page size. Server may return fewer items than
   * requested. If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results the server should return.
   */
  pageToken?: string;
}

/**
 * Additional options for BeyondCorp#projectsLocationsList.
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
 * Additional options for BeyondCorp#projectsLocationsOperationsList.
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
 * TunnelerError is an error proto for errors returned by the connection
 * manager.
 */
export interface Tunnelv1ProtoTunnelerError {
  /**
   * Original raw error
   */
  err?: string;
  /**
   * retryable isn't used for now, but we may want to reuse it in the future.
   */
  retryable?: boolean;
}

/**
 * TunnelerInfo contains metadata about tunneler launched by connection
 * manager.
 */
export interface Tunnelv1ProtoTunnelerInfo {
  /**
   * backoff_retry_count stores the number of times the tunneler has been
   * retried by tunManager for current backoff sequence. Gets reset to 0 if time
   * difference between 2 consecutive retries exceeds backoffRetryResetTime.
   */
  backoffRetryCount?: number;
  /**
   * id is the unique id of a tunneler.
   */
  id?: string;
  /**
   * latest_err stores the Error for the latest tunneler failure. Gets reset
   * everytime the tunneler is retried by tunManager.
   */
  latestErr?: Tunnelv1ProtoTunnelerError;
  /**
   * latest_retry_time stores the time when the tunneler was last restarted.
   */
  latestRetryTime?: Date;
  /**
   * total_retry_count stores the total number of times the tunneler has been
   * retried by tunManager.
   */
  totalRetryCount?: number;
}

function serializeTunnelv1ProtoTunnelerInfo(data: any): Tunnelv1ProtoTunnelerInfo {
  return {
    ...data,
    latestRetryTime: data["latestRetryTime"] !== undefined ? data["latestRetryTime"].toISOString() : undefined,
  };
}

function deserializeTunnelv1ProtoTunnelerInfo(data: any): Tunnelv1ProtoTunnelerInfo {
  return {
    ...data,
    latestRetryTime: data["latestRetryTime"] !== undefined ? new Date(data["latestRetryTime"]) : undefined,
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
