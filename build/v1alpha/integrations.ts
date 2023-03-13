// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Application Integration API Client for Deno
 * ===========================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/application-integration
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Integrations {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://integrations.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Receives the auth code and auth config id to combine that with the client
   * id and secret to retrieve access tokens from the token endpoint. Returns
   * either a success or error message when it's done.
   *
   */
  async callbackGenerateToken(opts: CallbackGenerateTokenOptions = {}): Promise<GoogleCloudIntegrationsV1alphaGenerateTokenResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/callback:generateToken`);
    if (opts.code !== undefined) {
      url.searchParams.append("code", String(opts.code));
    }
    if (opts.gcpProjectId !== undefined) {
      url.searchParams.append("gcpProjectId", String(opts.gcpProjectId));
    }
    if (opts.product !== undefined) {
      url.searchParams.append("product", String(opts.product));
    }
    if (opts.redirectUri !== undefined) {
      url.searchParams.append("redirectUri", String(opts.redirectUri));
    }
    if (opts.state !== undefined) {
      url.searchParams.append("state", String(opts.state));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaGenerateTokenResponse;
  }

  /**
   * Enumerates the regions for which Connector Platform is provisioned.
   *
   */
  async connectorPlatformRegionsEnumerate(): Promise<GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/connectorPlatformRegions:enumerate`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse;
  }

  /**
   * Creates an Apps Script project.
   *
   * @param parent Required. The project that the executed integration belongs to.
   */
  async projectsLocationsAppsScriptProjectsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest): Promise<GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/appsScriptProjects`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse;
  }

  /**
   * Links a existing Apps Script project.
   *
   * @param parent Required. The project that the executed integration belongs to.
   */
  async projectsLocationsAppsScriptProjectsLink(parent: string, req: GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest): Promise<GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/appsScriptProjects:link`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse;
  }

  /**
   * Creates an auth config record. Fetch corresponding credentials for
   * specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT.
   * Encrypt the auth config with Cloud KMS and store the encrypted credentials
   * in Spanner. Returns the encrypted auth config.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsAuthConfigsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaAuthConfig, opts: ProjectsLocationsAuthConfigsCreateOptions = {}): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    req = serializeGoogleCloudIntegrationsV1alphaAuthConfig(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/authConfigs`);
    if (opts["clientCertificate.encryptedPrivateKey"] !== undefined) {
      url.searchParams.append("clientCertificate.encryptedPrivateKey", String(opts["clientCertificate.encryptedPrivateKey"]));
    }
    if (opts["clientCertificate.passphrase"] !== undefined) {
      url.searchParams.append("clientCertificate.passphrase", String(opts["clientCertificate.passphrase"]));
    }
    if (opts["clientCertificate.sslCertificate"] !== undefined) {
      url.searchParams.append("clientCertificate.sslCertificate", String(opts["clientCertificate.sslCertificate"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Deletes an auth config.
   *
   * @param name Required. The name that is associated with the AuthConfig.
   */
  async projectsLocationsAuthConfigsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a complete auth config. If the auth config doesn't exist,
   * Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config.
   *
   * @param name Required. The name that is associated with the AuthConfig.
   */
  async projectsLocationsAuthConfigsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Lists all auth configs that match the filter. Restrict to auth configs
   * belong to the current client only.
   *
   * @param parent Required. The client, which owns this collection of AuthConfigs.
   */
  async projectsLocationsAuthConfigsList(parent: string, opts: ProjectsLocationsAuthConfigsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListAuthConfigsResponse> {
    opts = serializeProjectsLocationsAuthConfigsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/authConfigs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaListAuthConfigsResponse(data);
  }

  /**
   * Updates an auth config. If credential is updated, fetch the encrypted auth
   * config from Spanner, decrypt with Cloud KMS key, update the credential
   * fields, re-encrypt with Cloud KMS key and update the Spanner record. For
   * other fields, directly update the Spanner record. Returns the encrypted
   * auth config.
   *
   * @param name Resource name of the SFDC instance projects/{project}/locations/{location}/authConfigs/{authConfig}.
   */
  async projectsLocationsAuthConfigsPatch(name: string, req: GoogleCloudIntegrationsV1alphaAuthConfig, opts: ProjectsLocationsAuthConfigsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    req = serializeGoogleCloudIntegrationsV1alphaAuthConfig(req);
    opts = serializeProjectsLocationsAuthConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts["clientCertificate.encryptedPrivateKey"] !== undefined) {
      url.searchParams.append("clientCertificate.encryptedPrivateKey", String(opts["clientCertificate.encryptedPrivateKey"]));
    }
    if (opts["clientCertificate.passphrase"] !== undefined) {
      url.searchParams.append("clientCertificate.passphrase", String(opts["clientCertificate.passphrase"]));
    }
    if (opts["clientCertificate.sslCertificate"] !== undefined) {
      url.searchParams.append("clientCertificate.sslCertificate", String(opts["clientCertificate.sslCertificate"]));
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
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Get a certificates in the specified project.
   *
   * @param name Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate}
   */
  async projectsLocationsCertificatesGet(name: string): Promise<GoogleCloudIntegrationsV1alphaCertificate> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaCertificate;
  }

  /**
   * Lists the available entities and actions associated with a Connection.
   *
   * @param name Required. ConnectionSchemaMetadata name. Format: projects/{project}/locations/{location}/connections/{connection}/connectionSchemaMetadata
   */
  async projectsLocationsConnectionsGetConnectionSchemaMetadata(name: string): Promise<GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata;
  }

  /**
   * Lists Connections in a given project and location.
   *
   * @param parent Required. Parent resource of the Connection, of the form: `projects/*\/locations/*`
   */
  async projectsLocationsConnectionsList(parent: string, opts: ProjectsLocationsConnectionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/connections`);
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
    return deserializeGoogleCloudIntegrationsV1alphaListConnectionsResponse(data);
  }

  /**
   * Lists the JSON schemas for the inputs and outputs of actions, filtered by
   * action name.
   *
   * @param parent Required. Parent resource of RuntimeActionSchema. Format: projects/{project}/locations/{location}/connections/{connection}
   */
  async projectsLocationsConnectionsRuntimeActionSchemasList(parent: string, opts: ProjectsLocationsConnectionsRuntimeActionSchemasListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/runtimeActionSchemas`);
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
    return data as GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse;
  }

  /**
   * Lists the JSON schemas for the properties of runtime entities, filtered by
   * entity name.
   *
   * @param parent Required. Parent resource of RuntimeEntitySchema. Format: projects/{project}/locations/{location}/connections/{connection}
   */
  async projectsLocationsConnectionsRuntimeEntitySchemasList(parent: string, opts: ProjectsLocationsConnectionsRuntimeEntitySchemasListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/runtimeEntitySchemas`);
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
    return data as GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse;
  }

  /**
   * Delete the selected integration and all versions inside
   *
   * @param name Required. The location resource of the request.
   */
  async projectsLocationsIntegrationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Executes integrations synchronously by passing the trigger id in the
   * request body. The request is not returned until the requested executions
   * are either fulfilled or experienced an error. If the integration name is
   * not specified (passing `-`), all of the associated integration under the
   * given trigger_id will be executed. Otherwise only the specified integration
   * for the given `trigger_id` is executed. This is helpful for execution the
   * integration from UI.
   *
   * @param name Required. The integration resource name.
   */
  async projectsLocationsIntegrationsExecute(name: string, req: GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest): Promise<GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:execute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse(data);
  }

  /**
   * Lists the results of all the integration executions. The response includes
   * the same information as the [execution
   * log](https://cloud.google.com/application-integration/docs/viewing-logs) in
   * the Integration UI.
   *
   * @param parent Required. The parent resource name of the integration execution.
   */
  async projectsLocationsIntegrationsExecutionsList(parent: string, opts: ProjectsLocationsIntegrationsExecutionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListExecutionsResponse> {
    opts = serializeProjectsLocationsIntegrationsExecutionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/executions`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["filterParams.customFilter"] !== undefined) {
      url.searchParams.append("filterParams.customFilter", String(opts["filterParams.customFilter"]));
    }
    if (opts["filterParams.endTime"] !== undefined) {
      url.searchParams.append("filterParams.endTime", String(opts["filterParams.endTime"]));
    }
    if (opts["filterParams.eventStatuses"] !== undefined) {
      url.searchParams.append("filterParams.eventStatuses", String(opts["filterParams.eventStatuses"]));
    }
    if (opts["filterParams.executionId"] !== undefined) {
      url.searchParams.append("filterParams.executionId", String(opts["filterParams.executionId"]));
    }
    if (opts["filterParams.parameterKey"] !== undefined) {
      url.searchParams.append("filterParams.parameterKey", String(opts["filterParams.parameterKey"]));
    }
    if (opts["filterParams.parameterPairKey"] !== undefined) {
      url.searchParams.append("filterParams.parameterPairKey", String(opts["filterParams.parameterPairKey"]));
    }
    if (opts["filterParams.parameterPairValue"] !== undefined) {
      url.searchParams.append("filterParams.parameterPairValue", String(opts["filterParams.parameterPairValue"]));
    }
    if (opts["filterParams.parameterType"] !== undefined) {
      url.searchParams.append("filterParams.parameterType", String(opts["filterParams.parameterType"]));
    }
    if (opts["filterParams.parameterValue"] !== undefined) {
      url.searchParams.append("filterParams.parameterValue", String(opts["filterParams.parameterValue"]));
    }
    if (opts["filterParams.startTime"] !== undefined) {
      url.searchParams.append("filterParams.startTime", String(opts["filterParams.startTime"]));
    }
    if (opts["filterParams.taskStatuses"] !== undefined) {
      url.searchParams.append("filterParams.taskStatuses", String(opts["filterParams.taskStatuses"]));
    }
    if (opts["filterParams.workflowName"] !== undefined) {
      url.searchParams.append("filterParams.workflowName", String(opts["filterParams.workflowName"]));
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
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.refreshAcl !== undefined) {
      url.searchParams.append("refreshAcl", String(opts.refreshAcl));
    }
    if (opts.truncateParams !== undefined) {
      url.searchParams.append("truncateParams", String(opts.truncateParams));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaListExecutionsResponse(data);
  }

  /**
   * * Lifts suspension for advanced suspension task. Fetch corresponding
   * suspension with provided suspension Id, resolve suspension, and set up
   * suspension result for the Suspension Task.
   *
   * @param name Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format.
   */
  async projectsLocationsIntegrationsExecutionsSuspensionsLift(name: string, req: GoogleCloudIntegrationsV1alphaLiftSuspensionRequest): Promise<GoogleCloudIntegrationsV1alphaLiftSuspensionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:lift`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;
  }

  /**
   * * Lists suspensions associated with a specific execution. Only those with
   * permissions to resolve the relevant suspensions will be able to view them.
   *
   * @param parent Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}
   */
  async projectsLocationsIntegrationsExecutionsSuspensionsList(parent: string, opts: ProjectsLocationsIntegrationsExecutionsSuspensionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSuspensionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/suspensions`);
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
    return deserializeGoogleCloudIntegrationsV1alphaListSuspensionsResponse(data);
  }

  /**
   * * Resolves (lifts/rejects) any number of suspensions. If the integration
   * is already running, only the status of the suspension is updated.
   * Otherwise, the suspended integration will begin execution again.
   *
   * @param name Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id}
   */
  async projectsLocationsIntegrationsExecutionsSuspensionsResolve(name: string, req: GoogleCloudIntegrationsV1alphaResolveSuspensionRequest): Promise<GoogleCloudIntegrationsV1alphaResolveSuspensionResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaResolveSuspensionRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:resolve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;
  }

  /**
   * Returns the list of all integrations in the specified project.
   *
   * @param parent Required. Project and location from which the integrations should be listed. Format: projects/{project}
   */
  async projectsLocationsIntegrationsList(parent: string, opts: ProjectsLocationsIntegrationsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListIntegrationsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/integrations`);
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
    return data as GoogleCloudIntegrationsV1alphaListIntegrationsResponse;
  }

  /**
   * Schedules an integration for execution by passing the trigger id and the
   * scheduled time in the request body.
   *
   * @param name The integration resource name.
   */
  async projectsLocationsIntegrationsSchedule(name: string, req: GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest): Promise<GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:schedule`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;
  }

  /**
   * Create a integration with a draft version in the specified project.
   *
   * @param parent Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration}
   */
  async projectsLocationsIntegrationsVersionsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaIntegrationVersion, opts: ProjectsLocationsIntegrationsVersionsCreateOptions = {}): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    req = serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
    if (opts.newIntegration !== undefined) {
      url.searchParams.append("newIntegration", String(opts.newIntegration));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * Soft-deletes the integration. Changes the status of the integration to
   * ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is
   * removed from this snapshot and set to the previous non-ARCHIVED snapshot.
   * The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC
   * throws an exception if the version being deleted is DRAFT, and if the
   * `locked_by` user is not the same as the user performing the Delete. Audit
   * fields updated include last_modified_timestamp, last_modified_by. Any
   * existing lock is released when Deleting a integration. Currently, there is
   * no undelete mechanism.
   *
   * @param name Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Downloads an integration. Retrieves the `IntegrationVersion` for a given
   * `integration_id` and returns the response as a string.
   *
   * @param name Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsDownload(name: string, opts: ProjectsLocationsIntegrationsVersionsDownloadOptions = {}): Promise<GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:download`);
    if (opts.fileFormat !== undefined) {
      url.searchParams.append("fileFormat", String(opts.fileFormat));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;
  }

  /**
   * Get a integration in the specified project.
   *
   * @param name Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * Returns the list of all integration versions in the specified project.
   *
   * @param parent Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". 3. projects//locations/-/integrations/- Meaning: "List versions (with filter) for a client".
   */
  async projectsLocationsIntegrationsVersionsList(parent: string, opts: ProjectsLocationsIntegrationsVersionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse> {
    opts = serializeProjectsLocationsIntegrationsVersionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    return deserializeGoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse(data);
  }

  /**
   * Update a integration with a draft version in the specified project.
   *
   * @param name Output only. Auto-generated primary key.
   */
  async projectsLocationsIntegrationsVersionsPatch(name: string, req: GoogleCloudIntegrationsV1alphaIntegrationVersion, opts: ProjectsLocationsIntegrationsVersionsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    req = serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(req);
    opts = serializeProjectsLocationsIntegrationsVersionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * This RPC throws an exception if the integration is in ARCHIVED or ACTIVE
   * state. This RPC throws an exception if the version being published is
   * DRAFT, and if the `locked_by` user is not the same as the user performing
   * the Publish. Audit fields updated include last_published_timestamp,
   * last_published_by, last_modified_timestamp, last_modified_by. Any existing
   * lock is on this integration is released.
   *
   * @param name Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsPublish(name: string, req: GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest): Promise<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:publish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;
  }

  /**
   * Clears the `locked_by` and `locked_at_timestamp`in the DRAFT version of
   * this integration. It then performs the same action as the
   * CreateDraftIntegrationVersion (i.e., copies the DRAFT version of the
   * integration as a SNAPSHOT and then creates a new DRAFT version with the
   * `locked_by` set to the `user_taking_over` and the `locked_at_timestamp` set
   * to the current timestamp). Both the `locked_by` and `user_taking_over` are
   * notified via email about the takeover. This RPC throws an exception if the
   * integration is not in DRAFT status or if the `locked_by` and
   * `locked_at_timestamp` fields are not set.The TakeoverEdit lock is treated
   * the same as an edit of the integration, and hence shares ACLs with edit.
   * Audit fields updated include last_modified_timestamp, last_modified_by.
   *
   * @param integrationVersion Required. The version to take over edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsTakeoverEditLock(integrationVersion: string, req: GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest): Promise<GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ integrationVersion }:takeoverEditLock`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaTakeoverEditLockResponse(data);
  }

  /**
   * Sets the status of the ACTIVE integration to SNAPSHOT with a new tag
   * "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and
   * "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the
   * version being snapshot is not ACTIVE. Audit fields added include action,
   * action_by, action_timestamp.
   *
   * @param name Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsIntegrationsVersionsUnpublish(name: string, req: GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:unpublish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Uploads an integration. The content can be a previously downloaded
   * integration. Performs the same function as CreateDraftIntegrationVersion,
   * but accepts input in a string format, which holds the complete
   * representation of the IntegrationVersion content.
   *
   * @param parent Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration}
   */
  async projectsLocationsIntegrationsVersionsUpload(parent: string, req: GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest): Promise<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions:upload`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse(data);
  }

  /**
   * Creates an auth config record. Fetch corresponding credentials for
   * specific auth types, e.g. access token for OAuth 2.0, JWT token for JWT.
   * Encrypt the auth config with Cloud KMS and store the encrypted credentials
   * in Spanner. Returns the encrypted auth config.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsProductsAuthConfigsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaAuthConfig, opts: ProjectsLocationsProductsAuthConfigsCreateOptions = {}): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    req = serializeGoogleCloudIntegrationsV1alphaAuthConfig(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/authConfigs`);
    if (opts["clientCertificate.encryptedPrivateKey"] !== undefined) {
      url.searchParams.append("clientCertificate.encryptedPrivateKey", String(opts["clientCertificate.encryptedPrivateKey"]));
    }
    if (opts["clientCertificate.passphrase"] !== undefined) {
      url.searchParams.append("clientCertificate.passphrase", String(opts["clientCertificate.passphrase"]));
    }
    if (opts["clientCertificate.sslCertificate"] !== undefined) {
      url.searchParams.append("clientCertificate.sslCertificate", String(opts["clientCertificate.sslCertificate"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Deletes an auth config.
   *
   * @param name Required. The name that is associated with the AuthConfig.
   */
  async projectsLocationsProductsAuthConfigsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a complete auth config. If the auth config doesn't exist,
   * Code.NOT_FOUND exception will be thrown. Returns the decrypted auth config.
   *
   * @param name Required. The name that is associated with the AuthConfig.
   */
  async projectsLocationsProductsAuthConfigsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Lists all auth configs that match the filter. Restrict to auth configs
   * belong to the current client only.
   *
   * @param parent Required. The client, which owns this collection of AuthConfigs.
   */
  async projectsLocationsProductsAuthConfigsList(parent: string, opts: ProjectsLocationsProductsAuthConfigsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListAuthConfigsResponse> {
    opts = serializeProjectsLocationsProductsAuthConfigsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/authConfigs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaListAuthConfigsResponse(data);
  }

  /**
   * Updates an auth config. If credential is updated, fetch the encrypted auth
   * config from Spanner, decrypt with Cloud KMS key, update the credential
   * fields, re-encrypt with Cloud KMS key and update the Spanner record. For
   * other fields, directly update the Spanner record. Returns the encrypted
   * auth config.
   *
   * @param name Resource name of the SFDC instance projects/{project}/locations/{location}/authConfigs/{authConfig}.
   */
  async projectsLocationsProductsAuthConfigsPatch(name: string, req: GoogleCloudIntegrationsV1alphaAuthConfig, opts: ProjectsLocationsProductsAuthConfigsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaAuthConfig> {
    req = serializeGoogleCloudIntegrationsV1alphaAuthConfig(req);
    opts = serializeProjectsLocationsProductsAuthConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts["clientCertificate.encryptedPrivateKey"] !== undefined) {
      url.searchParams.append("clientCertificate.encryptedPrivateKey", String(opts["clientCertificate.encryptedPrivateKey"]));
    }
    if (opts["clientCertificate.passphrase"] !== undefined) {
      url.searchParams.append("clientCertificate.passphrase", String(opts["clientCertificate.passphrase"]));
    }
    if (opts["clientCertificate.sslCertificate"] !== undefined) {
      url.searchParams.append("clientCertificate.sslCertificate", String(opts["clientCertificate.sslCertificate"]));
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
    return deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data);
  }

  /**
   * Creates a new certificate. The certificate will be registered to the
   * trawler service and will be encrypted using cloud KMS and stored in Spanner
   * Returns the certificate.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsProductsCertificatesCreate(parent: string, req: GoogleCloudIntegrationsV1alphaCertificate): Promise<GoogleCloudIntegrationsV1alphaCertificate> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/certificates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaCertificate;
  }

  /**
   * Delete a certificate
   *
   * @param name Required. The name that is associated with the Certificate.
   */
  async projectsLocationsProductsCertificatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Get a certificates in the specified project.
   *
   * @param name Required. The certificate to retrieve. Format: projects/{project}/locations/{location}/certificates/{certificate}
   */
  async projectsLocationsProductsCertificatesGet(name: string): Promise<GoogleCloudIntegrationsV1alphaCertificate> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaCertificate;
  }

  /**
   * List all the certificates that match the filter. Restrict to certificate
   * of current client only.
   *
   * @param parent Required. The client, which owns this collection of Certificates.
   */
  async projectsLocationsProductsCertificatesList(parent: string, opts: ProjectsLocationsProductsCertificatesListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListCertificatesResponse> {
    opts = serializeProjectsLocationsProductsCertificatesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/certificates`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaListCertificatesResponse;
  }

  /**
   * Updates the certificate by id. If new certificate file is updated, it will
   * register with the trawler service, re-encrypt with cloud KMS and update the
   * Spanner record. Other fields will directly update the Spanner record.
   * Returns the Certificate.
   *
   * @param name Output only. Auto generated primary key
   */
  async projectsLocationsProductsCertificatesPatch(name: string, req: GoogleCloudIntegrationsV1alphaCertificate, opts: ProjectsLocationsProductsCertificatesPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaCertificate> {
    opts = serializeProjectsLocationsProductsCertificatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaCertificate;
  }

  /**
   * Delete the selected integration and all versions inside
   *
   * @param name Required. The location resource of the request.
   */
  async projectsLocationsProductsIntegrationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Executes integrations synchronously by passing the trigger id in the
   * request body. The request is not returned until the requested executions
   * are either fulfilled or experienced an error. If the integration name is
   * not specified (passing `-`), all of the associated integration under the
   * given trigger_id will be executed. Otherwise only the specified integration
   * for the given `trigger_id` is executed. This is helpful for execution the
   * integration from UI.
   *
   * @param name Required. The integration resource name.
   */
  async projectsLocationsProductsIntegrationsExecute(name: string, req: GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest): Promise<GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:execute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse(data);
  }

  /**
   * Cancellation of an execution
   *
   * @param name Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id}
   */
  async projectsLocationsProductsIntegrationsExecutionsCancel(name: string, req: GoogleCloudIntegrationsV1alphaCancelExecutionRequest): Promise<GoogleCloudIntegrationsV1alphaCancelExecutionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaCancelExecutionResponse;
  }

  /**
   * Get an execution in the specified project.
   *
   * @param name Required. The execution resource name. Format: projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_id}/executions/{execution_id}
   */
  async projectsLocationsProductsIntegrationsExecutionsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaExecution> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaExecution(data);
  }

  /**
   * Lists the results of all the integration executions. The response includes
   * the same information as the [execution
   * log](https://cloud.google.com/application-integration/docs/viewing-logs) in
   * the Integration UI.
   *
   * @param parent Required. The parent resource name of the integration execution.
   */
  async projectsLocationsProductsIntegrationsExecutionsList(parent: string, opts: ProjectsLocationsProductsIntegrationsExecutionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListExecutionsResponse> {
    opts = serializeProjectsLocationsProductsIntegrationsExecutionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/executions`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["filterParams.customFilter"] !== undefined) {
      url.searchParams.append("filterParams.customFilter", String(opts["filterParams.customFilter"]));
    }
    if (opts["filterParams.endTime"] !== undefined) {
      url.searchParams.append("filterParams.endTime", String(opts["filterParams.endTime"]));
    }
    if (opts["filterParams.eventStatuses"] !== undefined) {
      url.searchParams.append("filterParams.eventStatuses", String(opts["filterParams.eventStatuses"]));
    }
    if (opts["filterParams.executionId"] !== undefined) {
      url.searchParams.append("filterParams.executionId", String(opts["filterParams.executionId"]));
    }
    if (opts["filterParams.parameterKey"] !== undefined) {
      url.searchParams.append("filterParams.parameterKey", String(opts["filterParams.parameterKey"]));
    }
    if (opts["filterParams.parameterPairKey"] !== undefined) {
      url.searchParams.append("filterParams.parameterPairKey", String(opts["filterParams.parameterPairKey"]));
    }
    if (opts["filterParams.parameterPairValue"] !== undefined) {
      url.searchParams.append("filterParams.parameterPairValue", String(opts["filterParams.parameterPairValue"]));
    }
    if (opts["filterParams.parameterType"] !== undefined) {
      url.searchParams.append("filterParams.parameterType", String(opts["filterParams.parameterType"]));
    }
    if (opts["filterParams.parameterValue"] !== undefined) {
      url.searchParams.append("filterParams.parameterValue", String(opts["filterParams.parameterValue"]));
    }
    if (opts["filterParams.startTime"] !== undefined) {
      url.searchParams.append("filterParams.startTime", String(opts["filterParams.startTime"]));
    }
    if (opts["filterParams.taskStatuses"] !== undefined) {
      url.searchParams.append("filterParams.taskStatuses", String(opts["filterParams.taskStatuses"]));
    }
    if (opts["filterParams.workflowName"] !== undefined) {
      url.searchParams.append("filterParams.workflowName", String(opts["filterParams.workflowName"]));
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
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.refreshAcl !== undefined) {
      url.searchParams.append("refreshAcl", String(opts.refreshAcl));
    }
    if (opts.truncateParams !== undefined) {
      url.searchParams.append("truncateParams", String(opts.truncateParams));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaListExecutionsResponse(data);
  }

  /**
   * * Lifts suspension for advanced suspension task. Fetch corresponding
   * suspension with provided suspension Id, resolve suspension, and set up
   * suspension result for the Suspension Task.
   *
   * @param name Required. The resource that the suspension belongs to. "projects/{project}/locations/{location}/products/{product}/integrations/{integration}/executions/{execution}/suspensions/{suspenion}" format.
   */
  async projectsLocationsProductsIntegrationsExecutionsSuspensionsLift(name: string, req: GoogleCloudIntegrationsV1alphaLiftSuspensionRequest): Promise<GoogleCloudIntegrationsV1alphaLiftSuspensionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:lift`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaLiftSuspensionResponse;
  }

  /**
   * * Lists suspensions associated with a specific execution. Only those with
   * permissions to resolve the relevant suspensions will be able to view them.
   *
   * @param parent Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}
   */
  async projectsLocationsProductsIntegrationsExecutionsSuspensionsList(parent: string, opts: ProjectsLocationsProductsIntegrationsExecutionsSuspensionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSuspensionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/suspensions`);
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
    return deserializeGoogleCloudIntegrationsV1alphaListSuspensionsResponse(data);
  }

  /**
   * * Resolves (lifts/rejects) any number of suspensions. If the integration
   * is already running, only the status of the suspension is updated.
   * Otherwise, the suspended integration will begin execution again.
   *
   * @param name Required. projects/{gcp_project_id}/locations/{location}/products/{product}/integrations/{integration_name}/executions/{execution_name}/suspensions/{suspension_id}
   */
  async projectsLocationsProductsIntegrationsExecutionsSuspensionsResolve(name: string, req: GoogleCloudIntegrationsV1alphaResolveSuspensionRequest): Promise<GoogleCloudIntegrationsV1alphaResolveSuspensionResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaResolveSuspensionRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:resolve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaResolveSuspensionResponse;
  }

  /**
   * Returns the list of all integrations in the specified project.
   *
   * @param parent Required. Project and location from which the integrations should be listed. Format: projects/{project}
   */
  async projectsLocationsProductsIntegrationsList(parent: string, opts: ProjectsLocationsProductsIntegrationsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListIntegrationsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/integrations`);
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
    return data as GoogleCloudIntegrationsV1alphaListIntegrationsResponse;
  }

  /**
   * Schedules an integration for execution by passing the trigger id and the
   * scheduled time in the request body.
   *
   * @param name The integration resource name.
   */
  async projectsLocationsProductsIntegrationsSchedule(name: string, req: GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest): Promise<GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse> {
    req = serializeGoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:schedule`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse;
  }

  /**
   * Create a integration with a draft version in the specified project.
   *
   * @param parent Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration}
   */
  async projectsLocationsProductsIntegrationsVersionsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaIntegrationVersion, opts: ProjectsLocationsProductsIntegrationsVersionsCreateOptions = {}): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    req = serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
    if (opts.newIntegration !== undefined) {
      url.searchParams.append("newIntegration", String(opts.newIntegration));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * Soft-deletes the integration. Changes the status of the integration to
   * ARCHIVED. If the integration being ARCHIVED is tagged as "HEAD", the tag is
   * removed from this snapshot and set to the previous non-ARCHIVED snapshot.
   * The PUBLISH_REQUESTED, DUE_FOR_DELETION tags are removed too. This RPC
   * throws an exception if the version being deleted is DRAFT, and if the
   * `locked_by` user is not the same as the user performing the Delete. Audit
   * fields updated include last_modified_timestamp, last_modified_by. Any
   * existing lock is released when Deleting a integration. Currently, there is
   * no undelete mechanism.
   *
   * @param name Required. The version to delete. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Downloads an integration. Retrieves the `IntegrationVersion` for a given
   * `integration_id` and returns the response as a string.
   *
   * @param name Required. The version to download. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsDownload(name: string, opts: ProjectsLocationsProductsIntegrationsVersionsDownloadOptions = {}): Promise<GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:download`);
    if (opts.fileFormat !== undefined) {
      url.searchParams.append("fileFormat", String(opts.fileFormat));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse;
  }

  /**
   * Get a integration in the specified project.
   *
   * @param name Required. The version to retrieve. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * Returns the list of all integration versions in the specified project.
   *
   * @param parent Required. The parent resource where this version will be created. Format: projects/{project}/locations/{location}/integrations/{integration} Specifically, when parent equals: 1. projects//locations//integrations/, Meaning: "List versions (with filter) for a particular integration". 2. projects//locations//integrations/- Meaning: "List versions (with filter) for a client within a particular region". 3. projects//locations/-/integrations/- Meaning: "List versions (with filter) for a client".
   */
  async projectsLocationsProductsIntegrationsVersionsList(parent: string, opts: ProjectsLocationsProductsIntegrationsVersionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse> {
    opts = serializeProjectsLocationsProductsIntegrationsVersionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    return deserializeGoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse(data);
  }

  /**
   * Update a integration with a draft version in the specified project.
   *
   * @param name Output only. Auto-generated primary key.
   */
  async projectsLocationsProductsIntegrationsVersionsPatch(name: string, req: GoogleCloudIntegrationsV1alphaIntegrationVersion, opts: ProjectsLocationsProductsIntegrationsVersionsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaIntegrationVersion> {
    req = serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(req);
    opts = serializeProjectsLocationsProductsIntegrationsVersionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data);
  }

  /**
   * This RPC throws an exception if the integration is in ARCHIVED or ACTIVE
   * state. This RPC throws an exception if the version being published is
   * DRAFT, and if the `locked_by` user is not the same as the user performing
   * the Publish. Audit fields updated include last_published_timestamp,
   * last_published_by, last_modified_timestamp, last_modified_by. Any existing
   * lock is on this integration is released.
   *
   * @param name Required. The version to publish. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsPublish(name: string, req: GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest): Promise<GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:publish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse;
  }

  /**
   * Clears the `locked_by` and `locked_at_timestamp`in the DRAFT version of
   * this integration. It then performs the same action as the
   * CreateDraftIntegrationVersion (i.e., copies the DRAFT version of the
   * integration as a SNAPSHOT and then creates a new DRAFT version with the
   * `locked_by` set to the `user_taking_over` and the `locked_at_timestamp` set
   * to the current timestamp). Both the `locked_by` and `user_taking_over` are
   * notified via email about the takeover. This RPC throws an exception if the
   * integration is not in DRAFT status or if the `locked_by` and
   * `locked_at_timestamp` fields are not set.The TakeoverEdit lock is treated
   * the same as an edit of the integration, and hence shares ACLs with edit.
   * Audit fields updated include last_modified_timestamp, last_modified_by.
   *
   * @param integrationVersion Required. The version to take over edit lock. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsTakeoverEditLock(integrationVersion: string, req: GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest): Promise<GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ integrationVersion }:takeoverEditLock`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaTakeoverEditLockResponse(data);
  }

  /**
   * Sets the status of the ACTIVE integration to SNAPSHOT with a new tag
   * "PREVIOUSLY_PUBLISHED" after validating it. The "HEAD" and
   * "PUBLISH_REQUESTED" tags do not change. This RPC throws an exception if the
   * version being snapshot is not ACTIVE. Audit fields added include action,
   * action_by, action_timestamp.
   *
   * @param name Required. The version to deactivate. Format: projects/{project}/locations/{location}/integrations/{integration}/versions/{version}
   */
  async projectsLocationsProductsIntegrationsVersionsUnpublish(name: string, req: GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }:unpublish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Uploads an integration. The content can be a previously downloaded
   * integration. Performs the same function as CreateDraftIntegrationVersion,
   * but accepts input in a string format, which holds the complete
   * representation of the IntegrationVersion content.
   *
   * @param parent Required. The version to upload. Format: projects/{project}/locations/{location}/integrations/{integration}
   */
  async projectsLocationsProductsIntegrationsVersionsUpload(parent: string, req: GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest): Promise<GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions:upload`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse(data);
  }

  /**
   * Creates an IntegrationTemplateVersion.
   *
   * @param parent Required. The parent resource where this TemplateVersion will be created. Format: projects/{project}/location/{location}/product/{product}/integrationtemplates/{integrationtemplate}
   */
  async projectsLocationsProductsIntegrationtemplatesVersionsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion): Promise<GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion> {
    req = serializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(req);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(data);
  }

  /**
   * Returns an IntegrationTemplateVersion in the specified project.
   *
   * @param name Required. The TemplateVersion to retrieve. Format: projects/{project}/locations/{location}/products/{product}/integrationtemplates/{integrationtemplate}/versions/{version}
   */
  async projectsLocationsProductsIntegrationtemplatesVersionsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(data);
  }

  /**
   * Returns the list of all IntegrationTemplateVersions in the specified
   * project.
   *
   * @param parent Required. Format: projects/{project}/location/{location}/product/{product}/integrationtemplates/{integrationtemplate}
   */
  async projectsLocationsProductsIntegrationtemplatesVersionsList(parent: string, opts: ProjectsLocationsProductsIntegrationtemplatesVersionsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/versions`);
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
    return deserializeGoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse(data);
  }

  /**
   * Creates an sfdc instance record. Store the sfdc instance in Spanner.
   * Returns the sfdc instance.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsProductsSfdcInstancesCreate(parent: string, req: GoogleCloudIntegrationsV1alphaSfdcInstance): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcInstances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Deletes an sfdc instance.
   *
   * @param name Required. The name that is associated with the SfdcInstance.
   */
  async projectsLocationsProductsSfdcInstancesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND
   * exception will be thrown.
   *
   * @param name Required. The name that is associated with the SfdcInstance.
   */
  async projectsLocationsProductsSfdcInstancesGet(name: string): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Lists all sfdc instances that match the filter. Restrict to sfdc instances
   * belonging to the current client only.
   *
   * @param parent Required. The client, which owns this collection of SfdcInstances.
   */
  async projectsLocationsProductsSfdcInstancesList(parent: string, opts: ProjectsLocationsProductsSfdcInstancesListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse> {
    opts = serializeProjectsLocationsProductsSfdcInstancesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcInstances`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;
  }

  /**
   * Updates an sfdc instance. Updates the sfdc instance in spanner. Returns
   * the sfdc instance.
   *
   * @param name Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}.
   */
  async projectsLocationsProductsSfdcInstancesPatch(name: string, req: GoogleCloudIntegrationsV1alphaSfdcInstance, opts: ProjectsLocationsProductsSfdcInstancesPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    opts = serializeProjectsLocationsProductsSfdcInstancesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns
   * the sfdc channel.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsProductsSfdcInstancesSfdcChannelsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaSfdcChannel): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcChannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }

  /**
   * Deletes an sfdc channel.
   *
   * @param name Required. The name that is associated with the SfdcChannel.
   */
  async projectsLocationsProductsSfdcInstancesSfdcChannelsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND
   * exception will be thrown.
   *
   * @param name Required. The name that is associated with the SfdcChannel.
   */
  async projectsLocationsProductsSfdcInstancesSfdcChannelsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }

  /**
   * Lists all sfdc channels that match the filter. Restrict to sfdc channels
   * belonging to the current client only.
   *
   * @param parent Required. The client, which owns this collection of SfdcChannels.
   */
  async projectsLocationsProductsSfdcInstancesSfdcChannelsList(parent: string, opts: ProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse> {
    opts = serializeProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcChannels`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;
  }

  /**
   * Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the
   * sfdc channel.
   *
   * @param name Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}.
   */
  async projectsLocationsProductsSfdcInstancesSfdcChannelsPatch(name: string, req: GoogleCloudIntegrationsV1alphaSfdcChannel, opts: ProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    opts = serializeProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }

  /**
   * Creates an sfdc instance record. Store the sfdc instance in Spanner.
   * Returns the sfdc instance.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsSfdcInstancesCreate(parent: string, req: GoogleCloudIntegrationsV1alphaSfdcInstance): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcInstances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Deletes an sfdc instance.
   *
   * @param name Required. The name that is associated with the SfdcInstance.
   */
  async projectsLocationsSfdcInstancesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an sfdc instance. If the instance doesn't exist, Code.NOT_FOUND
   * exception will be thrown.
   *
   * @param name Required. The name that is associated with the SfdcInstance.
   */
  async projectsLocationsSfdcInstancesGet(name: string): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Lists all sfdc instances that match the filter. Restrict to sfdc instances
   * belonging to the current client only.
   *
   * @param parent Required. The client, which owns this collection of SfdcInstances.
   */
  async projectsLocationsSfdcInstancesList(parent: string, opts: ProjectsLocationsSfdcInstancesListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse> {
    opts = serializeProjectsLocationsSfdcInstancesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcInstances`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse;
  }

  /**
   * Updates an sfdc instance. Updates the sfdc instance in spanner. Returns
   * the sfdc instance.
   *
   * @param name Resource name of the SFDC instance projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}.
   */
  async projectsLocationsSfdcInstancesPatch(name: string, req: GoogleCloudIntegrationsV1alphaSfdcInstance, opts: ProjectsLocationsSfdcInstancesPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaSfdcInstance> {
    opts = serializeProjectsLocationsSfdcInstancesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcInstance;
  }

  /**
   * Creates an sfdc channel record. Store the sfdc channel in Spanner. Returns
   * the sfdc channel.
   *
   * @param parent Required. "projects/{project}/locations/{location}" format.
   */
  async projectsLocationsSfdcInstancesSfdcChannelsCreate(parent: string, req: GoogleCloudIntegrationsV1alphaSfdcChannel): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcChannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }

  /**
   * Deletes an sfdc channel.
   *
   * @param name Required. The name that is associated with the SfdcChannel.
   */
  async projectsLocationsSfdcInstancesSfdcChannelsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an sfdc channel. If the channel doesn't exist, Code.NOT_FOUND
   * exception will be thrown.
   *
   * @param name Required. The name that is associated with the SfdcChannel.
   */
  async projectsLocationsSfdcInstancesSfdcChannelsGet(name: string): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }

  /**
   * Lists all sfdc channels that match the filter. Restrict to sfdc channels
   * belonging to the current client only.
   *
   * @param parent Required. The client, which owns this collection of SfdcChannels.
   */
  async projectsLocationsSfdcInstancesSfdcChannelsList(parent: string, opts: ProjectsLocationsSfdcInstancesSfdcChannelsListOptions = {}): Promise<GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse> {
    opts = serializeProjectsLocationsSfdcInstancesSfdcChannelsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ parent }/sfdcChannels`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse;
  }

  /**
   * Updates an sfdc channel. Updates the sfdc channel in spanner. Returns the
   * sfdc channel.
   *
   * @param name Resource name of the SFDC channel projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}.
   */
  async projectsLocationsSfdcInstancesSfdcChannelsPatch(name: string, req: GoogleCloudIntegrationsV1alphaSfdcChannel, opts: ProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions = {}): Promise<GoogleCloudIntegrationsV1alphaSfdcChannel> {
    opts = serializeProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudIntegrationsV1alphaSfdcChannel;
  }
}

/**
 * Additional options for Integrations#callbackGenerateToken.
 */
export interface CallbackGenerateTokenOptions {
  /**
   * The auth code for the given request
   */
  code?: string;
  /**
   * The gcp project id of the request
   */
  gcpProjectId?: string;
  /**
   * Which product sends the request
   */
  product?:  | "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY";
  /**
   * Redirect uri of the auth code request
   */
  redirectUri?: string;
  /**
   * The auth config id for the given request
   */
  state?: string;
}

/**
 * Registered ids for errors, as "oneof" enums. Each task or logical grouping
 * of tasks may share the same enum.
 */
export interface CrmlogErrorCode {
  commonErrorCode?:  | "COMMON_ERROR_CODE_UNSPECIFIED" | "INVALID_CREDENTIALS" | "REQUIRED_FIELDS_MISSING" | "INVALID_FIELDS" | "BACKEND" | "GENERAL" | "INTERNAL" | "IO_ERROR" | "NOT_FOUND" | "EVENT_BUS" | "ALREADY_EXISTS" | "CONCORD" | "CONVERSION" | "FLUME" | "PERMISSION" | "SALES_FORCE" | "SPANNER" | "UNIMPLEMENTED" | "RELTIO" | "WORKFLOW_NOT_FOUND" | "QUOTA_THROTTLED" | "QUOTA_ENQUEUED" | "INVALID_QUOTA_CONFIGURATION" | "TASK_NOT_FOUND" | "EXECUTION_TIMEOUT" | "INVALID_EVENT_EXECUTION_STATE" | "INVALID_ATTRIBUTE" | "MISSING_ATTRIBUTE" | "CLIENT_UNAUTHORIZED_FOR_WORKFLOW" | "INVALID_PARAMETER" | "MISSING_PARAMETER" | "UNAUTHROIZED_WORKFLOW_EDITOR_ACTION" | "FAILED_PRECONDITION" | "INVALID_CLIENT" | "MISSING_CLIENT" | "INVALID_WORKFLOW" | "MISSING_QUOTA_CONFIGURATION" | "UNHANDLED_TASK_ERROR" | "SCRIPT_TASK_RUNTIME_ERROR" | "RPC" | "INVALID_PROTO" | "UNHANDLED_EVENTBUS_ERROR" | "INVALID_TASK_STATE" | "TYPED_TASK_INVALID_INPUT_OPERATION" | "TYPED_TASK_INVALID_OUTPUT_OPERATION" | "VALIDATION_ERROR" | "RESUME_ERROR" | "APPS_SCRIPT_EXECUTION_ERROR" | "INVALID_VECTOR_USER" | "INFORMATICA" | "RETRYABLE_TASK_ERROR" | "INVALID_TENANT" | "WRONG_TENANT" | "INFORMATICA_BACKEND_UNAVAILABLE" | "RPC_PERMISSION_DENIED" | "SYNC_EVENTBUS_EXECUTION_TIMEOUT" | "ASYNC_EVENTBUS_EXECUTION_TIMEOUT" | "NOT_SUPPORTED_DATA_TYPE" | "UNSANITIZED_USER_INPUT" | "TRANSFORM_EXPRESSION_EVALUATION_ERROR" | "HTTP_EXCEPTION" | "EXECUTION_CANCELLED";
}

export interface EnterpriseCrmEventbusAuthconfigAuthConfigTaskParam {
  /**
   * Defines the credential types to be supported as Task may restrict specific
   * types to use, e.g. Cloud SQL Task will use username/password type only.
   */
  allowedCredentialTypes?:  | "CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN"[];
  allowedServiceAccountInContext?: boolean;
  /**
   * UUID of the AuthConfig.
   */
  authConfigId?: string;
  /**
   * A space-delimited list of requested scope permissions.
   */
  scope?: string;
  useServiceAccountInContext?: boolean;
}

/**
 * Email address along with optional name and tokens. These tokens will be
 * substituted for the variables in the form of [{var_name}], where var_name
 * could be any string of no more than 32 bytes.
 */
export interface EnterpriseCrmEventbusProtoAddress {
  /**
   * Required.
   */
  email?: string;
  name?: string;
  tokens?: EnterpriseCrmEventbusProtoToken[];
}

/**
 * Attributes are additional options that can be associated with each event
 * property. For more information, see
 */
export interface EnterpriseCrmEventbusProtoAttributes {
  /**
   * Things like URL, Email, Currency, Timestamp (rather than string, int64...)
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "EMAIL" | "URL" | "CURRENCY" | "TIMESTAMP" | "DOMAIN_NAME";
  /**
   * Used to define defaults.
   */
  defaultValue?: EnterpriseCrmEventbusProtoValueType;
  /**
   * Required for event execution. The validation will be done by the event bus
   * when the event is triggered.
   */
  isRequired?: boolean;
  /**
   * Used to indicate if a ParameterEntry should be converted to ParamIndexes
   * for ST-Spanner full-text search. DEPRECATED: use searchable.
   */
  isSearchable?: boolean;
  /**
   * See
   */
  logSettings?: EnterpriseCrmEventbusProtoLogSettings;
  searchable?:  | "UNSPECIFIED" | "YES" | "NO";
  /**
   * List of tasks that can view this property, if empty then all.
   */
  taskVisibility?: string[];
}

function serializeEnterpriseCrmEventbusProtoAttributes(data: any): EnterpriseCrmEventbusProtoAttributes {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoValueType(data["defaultValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoAttributes(data: any): EnterpriseCrmEventbusProtoAttributes {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoValueType(data["defaultValue"]) : undefined,
  };
}

/**
 * List of error enums for alerts.
 */
export interface EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList {
  enumStrings?: string[];
  filterType?:  | "DEFAULT_INCLUSIVE" | "EXCLUSIVE";
}

/**
 * The threshold value of the metric, above or below which the alert should be
 * triggered. See EventAlertConfig or TaskAlertConfig for the different alert
 * metric types in each case. For the *RATE metrics, one or both of these fields
 * may be set. Zero is the default value and can be left at that. For
 * *PERCENTILE_DURATION metrics, one or both of these fields may be set, and
 * also, the duration threshold value should be specified in the
 * threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these
 * fields should not be set at all. A different member, threshold_duration_ms,
 * must be set in the EventAlertConfig or the TaskAlertConfig.
 */
export interface EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue {
  absolute?: bigint;
  percentage?: number;
}

function serializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data: any): EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue {
  return {
    ...data,
    absolute: data["absolute"] !== undefined ? String(data["absolute"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data: any): EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue {
  return {
    ...data,
    absolute: data["absolute"] !== undefined ? BigInt(data["absolute"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoBaseFunction {
  functionName?:  | "UNSPECIFIED" | "NOW_IN_MILLIS" | "INT_LIST" | "ENVIRONMENT" | "GET_EXECUTION_ID" | "GET_INTEGRATION_NAME" | "GET_REGION" | "GET_UUID" | "GET_PROJECT_ID";
}

export interface EnterpriseCrmEventbusProtoBaseValue {
  /**
   * Start with a function that does not build on existing values. Eg.
   * CurrentTime, Min, Max, Exists, etc.
   */
  baseFunction?: EnterpriseCrmEventbusProtoFunction;
  /**
   * Start with a literal value.
   */
  literalValue?: EnterpriseCrmEventbusProtoParameterValueType;
  /**
   * Start with a reference value to dereference.
   */
  referenceValue?: string;
}

function serializeEnterpriseCrmEventbusProtoBaseValue(data: any): EnterpriseCrmEventbusProtoBaseValue {
  return {
    ...data,
    baseFunction: data["baseFunction"] !== undefined ? serializeEnterpriseCrmEventbusProtoFunction(data["baseFunction"]) : undefined,
    literalValue: data["literalValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoBaseValue(data: any): EnterpriseCrmEventbusProtoBaseValue {
  return {
    ...data,
    baseFunction: data["baseFunction"] !== undefined ? deserializeEnterpriseCrmEventbusProtoFunction(data["baseFunction"]) : undefined,
    literalValue: data["literalValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoBooleanArrayFunction {
  functionName?:  | "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER";
}

export interface EnterpriseCrmEventbusProtoBooleanFunction {
  functionName?:  | "UNSPECIFIED" | "TO_JSON" | "NOT" | "AND" | "NAND" | "OR" | "XOR" | "NOR" | "XNOR" | "TO_STRING" | "EQUALS";
}

export interface EnterpriseCrmEventbusProtoBooleanParameterArray {
  booleanValues?: boolean[];
}

export interface EnterpriseCrmEventbusProtoBuganizerNotification {
  /**
   * Whom to assign the new bug. Optional.
   */
  assigneeEmailAddress?: string;
  /**
   * ID of the buganizer component within which to create a new issue.
   * Required.
   */
  componentId?: bigint;
  /**
   * ID of the buganizer template to use. Optional.
   */
  templateId?: bigint;
  /**
   * Title of the issue to be created. Required.
   */
  title?: string;
}

function serializeEnterpriseCrmEventbusProtoBuganizerNotification(data: any): EnterpriseCrmEventbusProtoBuganizerNotification {
  return {
    ...data,
    componentId: data["componentId"] !== undefined ? String(data["componentId"]) : undefined,
    templateId: data["templateId"] !== undefined ? String(data["templateId"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoBuganizerNotification(data: any): EnterpriseCrmEventbusProtoBuganizerNotification {
  return {
    ...data,
    componentId: data["componentId"] !== undefined ? BigInt(data["componentId"]) : undefined,
    templateId: data["templateId"] !== undefined ? BigInt(data["templateId"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoCloudKmsConfig {
  /**
   * Optional. The id of GCP project where the KMS key is stored. If not
   * provided, assume the key is stored in the same GCP project defined in
   * Client (tag 14).
   */
  gcpProjectId?: string;
  /**
   * A Cloud KMS key is a named object containing one or more key versions,
   * along with metadata for the key. A key exists on exactly one key ring tied
   * to a specific location.
   */
  keyName?: string;
  /**
   * A key ring organizes keys in a specific Google Cloud location and allows
   * you to manage access control on groups of keys. A key ring's name does not
   * need to be unique across a Google Cloud project, but must be unique within
   * a given location.
   */
  keyRingName?: string;
  /**
   * Optional. Each version of a key contains key material used for encryption
   * or signing. A key's version is represented by an integer, starting at 1. To
   * decrypt data or verify a signature, you must use the same key version that
   * was used to encrypt or sign the data.
   */
  keyVersionName?: string;
  /**
   * Location name of the key ring, e.g. "us-west1".
   */
  locationName?: string;
}

/**
 * Cloud Scheduler Trigger configuration
 */
export interface EnterpriseCrmEventbusProtoCloudSchedulerConfig {
  /**
   * Required. The cron tab of cloud scheduler trigger.
   */
  cronTab?: string;
  /**
   * Optional. When the job was deleted from Pantheon UI, error_message will be
   * populated when Get/List integrations
   */
  errorMessage?: string;
  /**
   * Required. The location where associated cloud scheduler job will be
   * created
   */
  location?: string;
  /**
   * Required. Service account used by Cloud Scheduler to trigger the
   * integration at scheduled time
   */
  serviceAccountEmail?: string;
}

/**
 * This message recursively combines constituent conditions using logical AND.
 */
export interface EnterpriseCrmEventbusProtoCombinedCondition {
  /**
   * A set of individual constituent conditions.
   */
  conditions?: EnterpriseCrmEventbusProtoCondition[];
}

function serializeEnterpriseCrmEventbusProtoCombinedCondition(data: any): EnterpriseCrmEventbusProtoCombinedCondition {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (serializeEnterpriseCrmEventbusProtoCondition(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoCombinedCondition(data: any): EnterpriseCrmEventbusProtoCombinedCondition {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoCondition(item))) : undefined,
  };
}

/**
 * Condition that uses `operator` to evaluate the key against the value.
 */
export interface EnterpriseCrmEventbusProtoCondition {
  /**
   * Key that's evaluated against the `value`. Please note the data type of the
   * runtime value associated with the key should match the data type of
   * `value`, else an IllegalArgumentException is thrown.
   */
  eventPropertyKey?: string;
  /**
   * Operator used to evaluate the condition. Please note that an operator with
   * an inappropriate key/value operand will result in IllegalArgumentException,
   * e.g. CONTAINS with boolean key/value pair.
   */
  operator?:  | "UNSET" | "EQUALS" | "CONTAINS" | "LESS_THAN" | "GREATER_THAN" | "EXISTS" | "DOES_NOT_EXIST" | "IS_EMPTY" | "IS_NOT_EMPTY";
  /**
   * Value that's checked for the key.
   */
  value?: EnterpriseCrmEventbusProtoValueType;
}

function serializeEnterpriseCrmEventbusProtoCondition(data: any): EnterpriseCrmEventbusProtoCondition {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeEnterpriseCrmEventbusProtoValueType(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoCondition(data: any): EnterpriseCrmEventbusProtoCondition {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmEventbusProtoValueType(data["value"]) : undefined,
  };
}

/**
 * Contains the combined condition calculation results.
 */
export interface EnterpriseCrmEventbusProtoConditionResult {
  /**
   * the current task number.
   */
  currentTaskNumber?: string;
  /**
   * the next task number.
   */
  nextTaskNumber?: string;
  /**
   * the result comes out after evaluate the combined condition. True if
   * there's no combined condition specified.
   */
  result?: boolean;
}

export interface EnterpriseCrmEventbusProtoConnectorsConnection {
  /**
   * Connection name Format:
   * projects/{project}/locations/{location}/connections/{connection}
   */
  connectionName?: string;
  /**
   * Connector version Format:
   * projects/{project}/locations/{location}/providers/{provider}/connectors/{connector}/versions/{version}
   */
  connectorVersion?: string;
  /**
   * Service name Format:
   * projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}
   */
  serviceName?: string;
}

export interface EnterpriseCrmEventbusProtoConnectorsGenericConnectorTaskConfig {
  /**
   * User-selected connection.
   */
  connection?: EnterpriseCrmEventbusProtoConnectorsConnection;
  /**
   * Operation to perform using the configured connection.
   */
  operation?:  | "OPERATION_UNSPECIFIED" | "EXECUTE_ACTION" | "LIST_ENTITIES" | "GET_ENTITY" | "CREATE_ENTITY" | "UPDATE_ENTITY" | "DELETE_ENTITY";
}

/**
 * Represents two-dimensional positions.
 */
export interface EnterpriseCrmEventbusProtoCoordinate {
  x?: number;
  y?: number;
}

export interface EnterpriseCrmEventbusProtoCustomSuspensionRequest {
  /**
   * Request to fire an event containing the SuspensionInfo message.
   */
  postToQueueWithTriggerIdRequest?: GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest;
  /**
   * In the fired event, set the SuspensionInfo message as the value for this
   * key.
   */
  suspensionInfoEventParameterKey?: string;
}

function serializeEnterpriseCrmEventbusProtoCustomSuspensionRequest(data: any): EnterpriseCrmEventbusProtoCustomSuspensionRequest {
  return {
    ...data,
    postToQueueWithTriggerIdRequest: data["postToQueueWithTriggerIdRequest"] !== undefined ? serializeGoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest(data["postToQueueWithTriggerIdRequest"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoCustomSuspensionRequest(data: any): EnterpriseCrmEventbusProtoCustomSuspensionRequest {
  return {
    ...data,
    postToQueueWithTriggerIdRequest: data["postToQueueWithTriggerIdRequest"] !== undefined ? deserializeGoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest(data["postToQueueWithTriggerIdRequest"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoDoubleArray {
  values?: number[];
}

export interface EnterpriseCrmEventbusProtoDoubleArrayFunction {
  functionName?:  | "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "SUM" | "AVG" | "MAX" | "MIN" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER";
}

export interface EnterpriseCrmEventbusProtoDoubleFunction {
  functionName?:  | "UNSPECIFIED" | "TO_JSON" | "TO_STRING" | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE" | "EXPONENT" | "ROUND" | "FLOOR" | "CEIL" | "GREATER_THAN" | "LESS_THAN" | "EQUALS" | "GREATER_THAN_EQUALS" | "LESS_THAN_EQUALS" | "MOD";
}

export interface EnterpriseCrmEventbusProtoDoubleParameterArray {
  doubleValues?: number[];
}

/**
 * An error, warning, or information message associated with a workflow.
 */
export interface EnterpriseCrmEventbusProtoErrorDetail {
  /**
   * The associated error-code, which can be a common or internal code.
   */
  errorCode?: CrmlogErrorCode;
  /**
   * The full text of the error message, including any parameters that were
   * thrown along with the exception.
   */
  errorMessage?: string;
  /**
   * The severity of the error: ERROR|WARN|INFO.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARN" | "INFO";
  /**
   * The task try-number, in which, the error occurred. If zero, the error
   * happened at the event level.
   */
  taskNumber?: number;
}

/**
 * LINT.IfChange This message is used for storing key value pair properties for
 * each Event / Task in the EventBus.
 */
export interface EnterpriseCrmEventbusProtoEventBusProperties {
  /**
   * An unordered list of property entries.
   */
  properties?: EnterpriseCrmEventbusProtoPropertyEntry[];
}

function serializeEnterpriseCrmEventbusProtoEventBusProperties(data: any): EnterpriseCrmEventbusProtoEventBusProperties {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeEnterpriseCrmEventbusProtoPropertyEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoEventBusProperties(data: any): EnterpriseCrmEventbusProtoEventBusProperties {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoPropertyEntry(item))) : undefined,
  };
}

/**
 * Contains the details of the execution info of this event: this includes the
 * tasks execution details plus the event execution statistics. Next available
 * id: 10
 */
export interface EnterpriseCrmEventbusProtoEventExecutionDetails {
  eventAttemptStats?: EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats[];
  eventExecutionSnapshot?: EnterpriseCrmEventbusProtoEventExecutionSnapshot[];
  eventExecutionState?:  | "UNSPECIFIED" | "ON_HOLD" | "IN_PROCESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "RETRY_ON_HOLD" | "SUSPENDED";
  /**
   * Indicates the number of times the execution has restarted from the
   * beginning.
   */
  eventRetriesFromBeginningCount?: number;
  /**
   * The log file path (aka. cns address) for this event.
   */
  logFilePath?: string;
  /**
   * The network address (aka. bns address) that indicates where the event
   * executor is running.
   */
  networkAddress?: string;
  /**
   * Next scheduled execution time in case the execution status was
   * RETRY_ON_HOLD.
   */
  nextExecutionTime?: bigint;
  /**
   * Used internally and shouldn't be exposed to users. A counter for the cron
   * job to record how many times this event is in in_process state but don't
   * have a lock consecutively/
   */
  ryeLockUnheldCount?: number;
}

function serializeEnterpriseCrmEventbusProtoEventExecutionDetails(data: any): EnterpriseCrmEventbusProtoEventExecutionDetails {
  return {
    ...data,
    eventAttemptStats: data["eventAttemptStats"] !== undefined ? data["eventAttemptStats"].map((item: any) => (serializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(item))) : undefined,
    eventExecutionSnapshot: data["eventExecutionSnapshot"] !== undefined ? data["eventExecutionSnapshot"].map((item: any) => (serializeEnterpriseCrmEventbusProtoEventExecutionSnapshot(item))) : undefined,
    nextExecutionTime: data["nextExecutionTime"] !== undefined ? String(data["nextExecutionTime"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoEventExecutionDetails(data: any): EnterpriseCrmEventbusProtoEventExecutionDetails {
  return {
    ...data,
    eventAttemptStats: data["eventAttemptStats"] !== undefined ? data["eventAttemptStats"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(item))) : undefined,
    eventExecutionSnapshot: data["eventExecutionSnapshot"] !== undefined ? data["eventExecutionSnapshot"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoEventExecutionSnapshot(item))) : undefined,
    nextExecutionTime: data["nextExecutionTime"] !== undefined ? BigInt(data["nextExecutionTime"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats {
  /**
   * The end time of the event execution for current attempt.
   */
  endTime?: bigint;
  /**
   * The start time of the event execution for current attempt. This could be
   * in the future if it's been scheduled.
   */
  startTime?: bigint;
}

function serializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(data: any): EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(data: any): EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * Contains the snapshot of the event execution for a given checkpoint. Next
 * available id: 13
 */
export interface EnterpriseCrmEventbusProtoEventExecutionSnapshot {
  /**
   * Indicates "right after which checkpoint task's execution" this snapshot is
   * taken.
   */
  checkpointTaskNumber?: string;
  /**
   * All of the computed conditions that been calculated.
   */
  conditionResults?: EnterpriseCrmEventbusProtoConditionResult[];
  /**
   * The parameters in Event object that differs from last snapshot.
   */
  diffParams?: EnterpriseCrmEventbusProtoEventParameters;
  /**
   * Points to the event execution info this snapshot belongs to.
   */
  eventExecutionInfoId?: string;
  /**
   * Auto-generated. Used as primary key for EventExecutionSnapshots table.
   */
  eventExecutionSnapshotId?: string;
  eventExecutionSnapshotMetadata?: EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata;
  /**
   * The parameters in Event object.
   */
  eventParams?: EnterpriseCrmEventbusProtoEventParameters;
  /**
   * indicate whether snapshot exceeded maximum size before clean up
   */
  exceedMaxSize?: boolean;
  /**
   * Indicates when this snapshot is taken.
   */
  snapshotTime?: bigint;
  /**
   * All of the task execution details at the given point of time.
   */
  taskExecutionDetails?: EnterpriseCrmEventbusProtoTaskExecutionDetails[];
  /**
   * The task name associated with this snapshot. Could be empty.
   */
  taskName?: string;
}

function serializeEnterpriseCrmEventbusProtoEventExecutionSnapshot(data: any): EnterpriseCrmEventbusProtoEventExecutionSnapshot {
  return {
    ...data,
    diffParams: data["diffParams"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["diffParams"]) : undefined,
    eventParams: data["eventParams"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["eventParams"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? String(data["snapshotTime"]) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTaskExecutionDetails(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoEventExecutionSnapshot(data: any): EnterpriseCrmEventbusProtoEventExecutionSnapshot {
  return {
    ...data,
    diffParams: data["diffParams"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["diffParams"]) : undefined,
    eventParams: data["eventParams"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["eventParams"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? BigInt(data["snapshotTime"]) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTaskExecutionDetails(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata {
  /**
   * the event attempt number this snapshot belongs to.
   */
  eventAttemptNum?: number;
  /**
   * the task attempt number this snapshot belongs to. Could be empty.
   */
  taskAttemptNum?: number;
  /**
   * the task name associated with this snapshot. Could be empty.
   */
  taskName?: string;
  /**
   * The task number associated with this snapshot. Could be empty.
   */
  taskNumber?: string;
}

/**
 * LINT.IfChange This message is used for processing and persisting (when
 * applicable) key value pair parameters for each event in the event bus. Please
 * see
 */
export interface EnterpriseCrmEventbusProtoEventParameters {
  /**
   * Parameters are a part of Event and can be used to communicate between
   * different tasks that are part of the same integration execution.
   */
  parameters?: EnterpriseCrmEventbusProtoParameterEntry[];
}

function serializeEnterpriseCrmEventbusProtoEventParameters(data: any): EnterpriseCrmEventbusProtoEventParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeEnterpriseCrmEventbusProtoParameterEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoEventParameters(data: any): EnterpriseCrmEventbusProtoEventParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoParameterEntry(item))) : undefined,
  };
}

/**
 * Message that helps aggregate all sub-executions triggered by one execution
 * and keeps track of child-parent relationships.
 */
export interface EnterpriseCrmEventbusProtoExecutionTraceInfo {
  /**
   * Parent event execution info id that triggers the current execution through
   * SubWorkflowExecutorTask.
   */
  parentEventExecutionInfoId?: string;
  /**
   * Used to aggregate ExecutionTraceInfo.
   */
  traceId?: string;
}

/**
 * Represents external traffic type and id.
 */
export interface EnterpriseCrmEventbusProtoExternalTraffic {
  /**
   * User’s GCP project id the traffic is referring to.
   */
  gcpProjectId?: string;
  /**
   * User’s GCP project number the traffic is referring to.
   */
  gcpProjectNumber?: string;
  /**
   * Location for the user's request.
   */
  location?: string;
  /**
   * 
   * LINT.ThenChange(//depot/google3/enterprise/crm/eventbus/proto/product.proto:product,
   * //depot/google3/java/com/google/enterprise/crm/integrationplatform/api/utils/ConverterUtils.java:source_to_product)
   */
  source?:  | "SOURCE_UNSPECIFIED" | "APIGEE" | "SECURITY";
}

/**
 * Policy that defines the task retry logic and failure type. If no
 * FailurePolicy is defined for a task, all its dependent tasks will not be
 * executed (i.e, a `retry_strategy` of NONE will be applied).
 */
export interface EnterpriseCrmEventbusProtoFailurePolicy {
  /**
   * Required if retry_strategy is FIXED_INTERVAL or
   * LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the
   * initial interval for backoff.
   */
  intervalInSeconds?: bigint;
  /**
   * Required if retry_strategy is FIXED_INTERVAL or
   * LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the
   * number of times the task will be retried if failed.
   */
  maxNumRetries?: number;
  /**
   * Defines what happens to the task upon failure.
   */
  retryStrategy?:  | "UNSPECIFIED" | "IGNORE" | "NONE" | "FATAL" | "FIXED_INTERVAL" | "LINEAR_BACKOFF" | "EXPONENTIAL_BACKOFF" | "RESTART_WORKFLOW_WITH_BACKOFF";
}

function serializeEnterpriseCrmEventbusProtoFailurePolicy(data: any): EnterpriseCrmEventbusProtoFailurePolicy {
  return {
    ...data,
    intervalInSeconds: data["intervalInSeconds"] !== undefined ? String(data["intervalInSeconds"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoFailurePolicy(data: any): EnterpriseCrmEventbusProtoFailurePolicy {
  return {
    ...data,
    intervalInSeconds: data["intervalInSeconds"] !== undefined ? BigInt(data["intervalInSeconds"]) : undefined,
  };
}

/**
 * Information about the value and type of the field.
 */
export interface EnterpriseCrmEventbusProtoField {
  /**
   * By default, if the cardinality is unspecified the field is considered
   * required while mapping.
   */
  cardinality?:  | "UNSPECIFIED" | "OPTIONAL";
  /**
   * This holds the default values for the fields. This value is supplied by
   * user so may or may not contain PII or SPII data.
   */
  defaultValue?: EnterpriseCrmEventbusProtoParameterValueType;
  /**
   * Specifies the data type of the field.
   */
  fieldType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  /**
   * Optional. The fully qualified proto name (e.g.
   * enterprise.crm.storage.Account). Required for output field of type
   * PROTO_VALUE or PROTO_ARRAY. For e.g., if input field_type is BYTES and
   * output field_type is PROTO_VALUE, then fully qualified proto type url
   * should be provided to parse the input bytes. If field_type is *_ARRAY, then
   * all the converted protos are of the same type.
   */
  protoDefPath?: string;
  /**
   * This holds the reference key of the workflow or task parameter. 1. Any
   * workflow parameter, for e.g. $workflowParam1$. 2. Any task input or output
   * parameter, for e.g. $task1_param1$. 3. Any workflow or task parameters with
   * subfield references, for e.g., $task1_param1.employee.id$
   */
  referenceKey?: string;
  /**
   * This is the transform expression to fetch the input field value. for e.g.
   * $param1$.CONCAT('test'). Keep points - 1. Only input field can have a
   * transform expression. 2. If a transform expression is provided,
   * reference_key will be ignored. 3. If no value is returned after evaluation
   * of transform expression, default_value can be mapped if provided. 4. The
   * field_type should be the type of the final object returned after the
   * transform expression is evaluated. Scrubs the transform expression before
   * logging as value provided by user so may or may not contain PII or SPII
   * data.
   */
  transformExpression?: EnterpriseCrmEventbusProtoTransformExpression;
}

function serializeEnterpriseCrmEventbusProtoField(data: any): EnterpriseCrmEventbusProtoField {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
    transformExpression: data["transformExpression"] !== undefined ? serializeEnterpriseCrmEventbusProtoTransformExpression(data["transformExpression"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoField(data: any): EnterpriseCrmEventbusProtoField {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
    transformExpression: data["transformExpression"] !== undefined ? deserializeEnterpriseCrmEventbusProtoTransformExpression(data["transformExpression"]) : undefined,
  };
}

/**
 * Field Mapping Config to map multiple output fields values from input fields
 * values.
 */
export interface EnterpriseCrmEventbusProtoFieldMappingConfig {
  mappedFields?: EnterpriseCrmEventbusProtoMappedField[];
}

function serializeEnterpriseCrmEventbusProtoFieldMappingConfig(data: any): EnterpriseCrmEventbusProtoFieldMappingConfig {
  return {
    ...data,
    mappedFields: data["mappedFields"] !== undefined ? data["mappedFields"].map((item: any) => (serializeEnterpriseCrmEventbusProtoMappedField(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoFieldMappingConfig(data: any): EnterpriseCrmEventbusProtoFieldMappingConfig {
  return {
    ...data,
    mappedFields: data["mappedFields"] !== undefined ? data["mappedFields"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoMappedField(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoFunction {
  /**
   * The name of the function to perform.
   */
  functionType?: EnterpriseCrmEventbusProtoFunctionType;
  /**
   * List of parameters required for the transformation.
   */
  parameters?: EnterpriseCrmEventbusProtoTransformExpression[];
}

function serializeEnterpriseCrmEventbusProtoFunction(data: any): EnterpriseCrmEventbusProtoFunction {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTransformExpression(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoFunction(data: any): EnterpriseCrmEventbusProtoFunction {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTransformExpression(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoFunctionType {
  /**
   * LINT.IfChange
   */
  baseFunction?: EnterpriseCrmEventbusProtoBaseFunction;
  booleanArrayFunction?: EnterpriseCrmEventbusProtoBooleanArrayFunction;
  booleanFunction?: EnterpriseCrmEventbusProtoBooleanFunction;
  doubleArrayFunction?: EnterpriseCrmEventbusProtoDoubleArrayFunction;
  doubleFunction?: EnterpriseCrmEventbusProtoDoubleFunction;
  intArrayFunction?: EnterpriseCrmEventbusProtoIntArrayFunction;
  intFunction?: EnterpriseCrmEventbusProtoIntFunction;
  /**
   * 
   * LINT.ThenChange(//depot/google3/alkali/apps/integrationplatform/client/workflow_editor/utils/transform_function.ts)
   */
  jsonFunction?: EnterpriseCrmEventbusProtoJsonFunction;
  protoArrayFunction?: EnterpriseCrmEventbusProtoProtoArrayFunction;
  protoFunction?: EnterpriseCrmEventbusProtoProtoFunction;
  stringArrayFunction?: EnterpriseCrmEventbusProtoStringArrayFunction;
  stringFunction?: EnterpriseCrmEventbusProtoStringFunction;
}

export interface EnterpriseCrmEventbusProtoIntArray {
  values?: bigint[];
}

function serializeEnterpriseCrmEventbusProtoIntArray(data: any): EnterpriseCrmEventbusProtoIntArray {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoIntArray(data: any): EnterpriseCrmEventbusProtoIntArray {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoIntArrayFunction {
  functionName?:  | "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "SUM" | "AVG" | "MAX" | "MIN" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER";
}

export interface EnterpriseCrmEventbusProtoIntFunction {
  functionName?:  | "UNSPECIFIED" | "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE" | "EXPONENT" | "GREATER_THAN_EQUAL_TO" | "GREATER_THAN" | "LESS_THAN_EQUAL_TO" | "LESS_THAN" | "TO_DOUBLE" | "TO_STRING" | "EQUALS" | "TO_JSON" | "MOD" | "EPOCH_TO_HUMAN_READABLE_TIME";
}

export interface EnterpriseCrmEventbusProtoIntParameterArray {
  intValues?: bigint[];
}

function serializeEnterpriseCrmEventbusProtoIntParameterArray(data: any): EnterpriseCrmEventbusProtoIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoIntParameterArray(data: any): EnterpriseCrmEventbusProtoIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoJsonFunction {
  functionName?:  | "UNSPECIFIED" | "GET_PROPERTY" | "GET_ELEMENT" | "APPEND_ELEMENT" | "SIZE" | "SET_PROPERTY" | "FLATTEN" | "FLATTEN_ONCE" | "MERGE" | "TO_STRING" | "TO_INT" | "TO_DOUBLE" | "TO_BOOLEAN" | "TO_PROTO" | "TO_STRING_ARRAY" | "TO_INT_ARRAY" | "TO_DOUBLE_ARRAY" | "TO_PROTO_ARRAY" | "TO_BOOLEAN_ARRAY" | "REMOVE_PROPERTY" | "RESOLVE_TEMPLATE" | "EQUALS" | "FOR_EACH" | "FILTER_ELEMENTS";
}

/**
 * The LogSettings define the logging attributes for an event property. These
 * attributes are used to map the property to the parameter in the log proto.
 * Also used to define scrubbing/truncation behavior and PII information.
 */
export interface EnterpriseCrmEventbusProtoLogSettings {
  /**
   * The name of corresponding logging field of the event property. If omitted,
   * assumes the same name as the event property key.
   */
  logFieldName?: string;
  /**
   * Contains the scrubbing options, such as whether to scrub, obfuscate, etc.
   */
  sanitizeOptions?: EnterpriseCrmLoggingGwsSanitizeOptions;
  seedPeriod?:  | "SEED_PERIOD_UNSPECIFIED" | "DAY" | "WEEK" | "MONTH";
  seedScope?:  | "SEED_SCOPE_UNSPECIFIED" | "EVENT_NAME" | "TIME_PERIOD" | "PARAM_NAME";
  /**
   * Contains the field limits for shortening, such as max string length and
   * max array length.
   */
  shorteningLimits?: EnterpriseCrmLoggingGwsFieldLimits;
}

export interface EnterpriseCrmEventbusProtoLoopMetadata {
  /**
   * Starting from 1, not 0.
   */
  currentIterationCount?: bigint;
  /**
   * Needs to be set by the loop impl class before each iteration. The abstract
   * loop class will append the request and response to it. Eg. The foreach Loop
   * will clean up and set it as the current iteration element at the start of
   * each loop. The post request and response will be appended to the value once
   * they are available.
   */
  currentIterationDetail?: string;
  /**
   * Add the error message when loops fail.
   */
  errorMsg?: string;
  /**
   * Indicates where in the loop logic did it error out.
   */
  failureLocation?:  | "UNKNOWN" | "SUBWORKFLOW" | "PARAM_OVERRIDING" | "PARAM_AGGREGATING" | "SETTING_ITERATION_ELEMENT" | "GETTING_LIST_TO_ITERATE" | "CONDITION_EVALUATION" | "BUILDING_REQUEST";
}

function serializeEnterpriseCrmEventbusProtoLoopMetadata(data: any): EnterpriseCrmEventbusProtoLoopMetadata {
  return {
    ...data,
    currentIterationCount: data["currentIterationCount"] !== undefined ? String(data["currentIterationCount"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoLoopMetadata(data: any): EnterpriseCrmEventbusProtoLoopMetadata {
  return {
    ...data,
    currentIterationCount: data["currentIterationCount"] !== undefined ? BigInt(data["currentIterationCount"]) : undefined,
  };
}

/**
 * Mapped field is a pair of input field and output field.
 */
export interface EnterpriseCrmEventbusProtoMappedField {
  /**
   * The input field being mapped from.
   */
  inputField?: EnterpriseCrmEventbusProtoField;
  /**
   * The output field being mapped to.
   */
  outputField?: EnterpriseCrmEventbusProtoField;
}

function serializeEnterpriseCrmEventbusProtoMappedField(data: any): EnterpriseCrmEventbusProtoMappedField {
  return {
    ...data,
    inputField: data["inputField"] !== undefined ? serializeEnterpriseCrmEventbusProtoField(data["inputField"]) : undefined,
    outputField: data["outputField"] !== undefined ? serializeEnterpriseCrmEventbusProtoField(data["outputField"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoMappedField(data: any): EnterpriseCrmEventbusProtoMappedField {
  return {
    ...data,
    inputField: data["inputField"] !== undefined ? deserializeEnterpriseCrmEventbusProtoField(data["inputField"]) : undefined,
    outputField: data["outputField"] !== undefined ? deserializeEnterpriseCrmEventbusProtoField(data["outputField"]) : undefined,
  };
}

/**
 * The task that is next in line to be executed, if the condition specified
 * evaluated to true.
 */
export interface EnterpriseCrmEventbusProtoNextTask {
  /**
   * Combined condition for this task to become an eligible next task. Each of
   * these combined_conditions are joined with logical OR. DEPRECATED: use
   * `condition`
   */
  combinedConditions?: EnterpriseCrmEventbusProtoCombinedCondition[];
  /**
   * Standard filter expression for this task to become an eligible next task.
   */
  condition?: string;
  /**
   * User-provided description intended to give more business context about the
   * next task edge or condition.
   */
  description?: string;
  /**
   * User-provided label that is attached to this edge in the UI.
   */
  label?: string;
  /**
   * ID of the next task.
   */
  taskConfigId?: string;
  /**
   * Task number of the next task.
   */
  taskNumber?: string;
}

function serializeEnterpriseCrmEventbusProtoNextTask(data: any): EnterpriseCrmEventbusProtoNextTask {
  return {
    ...data,
    combinedConditions: data["combinedConditions"] !== undefined ? data["combinedConditions"].map((item: any) => (serializeEnterpriseCrmEventbusProtoCombinedCondition(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoNextTask(data: any): EnterpriseCrmEventbusProtoNextTask {
  return {
    ...data,
    combinedConditions: data["combinedConditions"] !== undefined ? data["combinedConditions"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoCombinedCondition(item))) : undefined,
  };
}

/**
 * The teardown task that is next in line to be executed. We support only
 * sequential execution of teardown tasks (i.e. no branching).
 */
export interface EnterpriseCrmEventbusProtoNextTeardownTask {
  /**
   * Required. Name of the next teardown task.
   */
  name?: string;
}

/**
 * Represents a node identifier (type + id). Next highest id: 3
 */
export interface EnterpriseCrmEventbusProtoNodeIdentifier {
  /**
   * Configuration of the edge.
   */
  elementIdentifier?: string;
  /**
   * Destination node where the edge ends. It can only be a task config.
   */
  elementType?:  | "UNKNOWN_TYPE" | "TASK_CONFIG" | "TRIGGER_CONFIG";
}

export interface EnterpriseCrmEventbusProtoNotification {
  buganizerNotification?: EnterpriseCrmEventbusProtoBuganizerNotification;
  emailAddress?: EnterpriseCrmEventbusProtoAddress;
  escalatorQueue?: string;
  pubsubTopic?: string;
  /**
   * If the out-of-the-box email/pubsub notifications are not suitable and
   * custom logic is required, fire a workflow containing all info needed to
   * notify users to resume execution.
   */
  request?: EnterpriseCrmEventbusProtoCustomSuspensionRequest;
}

function serializeEnterpriseCrmEventbusProtoNotification(data: any): EnterpriseCrmEventbusProtoNotification {
  return {
    ...data,
    buganizerNotification: data["buganizerNotification"] !== undefined ? serializeEnterpriseCrmEventbusProtoBuganizerNotification(data["buganizerNotification"]) : undefined,
    request: data["request"] !== undefined ? serializeEnterpriseCrmEventbusProtoCustomSuspensionRequest(data["request"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoNotification(data: any): EnterpriseCrmEventbusProtoNotification {
  return {
    ...data,
    buganizerNotification: data["buganizerNotification"] !== undefined ? deserializeEnterpriseCrmEventbusProtoBuganizerNotification(data["buganizerNotification"]) : undefined,
    request: data["request"] !== undefined ? deserializeEnterpriseCrmEventbusProtoCustomSuspensionRequest(data["request"]) : undefined,
  };
}

/**
 * Key-value pair of EventBus parameters.
 */
export interface EnterpriseCrmEventbusProtoParameterEntry {
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given fired event. These parameters must be predefined in the
   * integration definition.
   */
  key?: string;
  /**
   * Values for the defined keys. Each value can either be string, int, double
   * or any proto message.
   */
  value?: EnterpriseCrmEventbusProtoParameterValueType;
}

function serializeEnterpriseCrmEventbusProtoParameterEntry(data: any): EnterpriseCrmEventbusProtoParameterEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterValueType(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParameterEntry(data: any): EnterpriseCrmEventbusProtoParameterEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterValueType(data["value"]) : undefined,
  };
}

/**
 * A generic multi-map that holds key value pairs. They keys and values can be
 * of any type, unless specified.
 */
export interface EnterpriseCrmEventbusProtoParameterMap {
  entries?: EnterpriseCrmEventbusProtoParameterMapEntry[];
  /**
   * Option to specify key value type for all entries of the map. If provided
   * then field types for all entries must conform to this.
   */
  keyType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  valueType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
}

function serializeEnterpriseCrmEventbusProtoParameterMap(data: any): EnterpriseCrmEventbusProtoParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeEnterpriseCrmEventbusProtoParameterMapEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParameterMap(data: any): EnterpriseCrmEventbusProtoParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoParameterMapEntry(item))) : undefined,
  };
}

/**
 * Entry is a pair of key and value.
 */
export interface EnterpriseCrmEventbusProtoParameterMapEntry {
  key?: EnterpriseCrmEventbusProtoParameterMapField;
  value?: EnterpriseCrmEventbusProtoParameterMapField;
}

function serializeEnterpriseCrmEventbusProtoParameterMapEntry(data: any): EnterpriseCrmEventbusProtoParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterMapField(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParameterMapEntry(data: any): EnterpriseCrmEventbusProtoParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterMapField(data["value"]) : undefined,
  };
}

/**
 * Field represents either the key or value in an entry.
 */
export interface EnterpriseCrmEventbusProtoParameterMapField {
  /**
   * Passing a literal value.
   */
  literalValue?: EnterpriseCrmEventbusProtoParameterValueType;
  /**
   * Referencing one of the WF variables.
   */
  referenceKey?: string;
}

function serializeEnterpriseCrmEventbusProtoParameterMapField(data: any): EnterpriseCrmEventbusProtoParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParameterMapField(data: any): EnterpriseCrmEventbusProtoParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

/**
 * LINT.IfChange To support various types of parameter values. Next available
 * id: 14
 */
export interface EnterpriseCrmEventbusProtoParameterValueType {
  booleanArray?: EnterpriseCrmEventbusProtoBooleanParameterArray;
  booleanValue?: boolean;
  doubleArray?: EnterpriseCrmEventbusProtoDoubleParameterArray;
  doubleValue?: number;
  intArray?: EnterpriseCrmEventbusProtoIntParameterArray;
  intValue?: bigint;
  protoArray?: EnterpriseCrmEventbusProtoProtoParameterArray;
  protoValue?: {
    [key: string]: any
  };
  serializedObjectValue?: EnterpriseCrmEventbusProtoSerializedObjectParameter;
  stringArray?: EnterpriseCrmEventbusProtoStringParameterArray;
  stringValue?: string;
}

function serializeEnterpriseCrmEventbusProtoParameterValueType(data: any): EnterpriseCrmEventbusProtoParameterValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? serializeEnterpriseCrmEventbusProtoIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
    serializedObjectValue: data["serializedObjectValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoSerializedObjectParameter(data["serializedObjectValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParameterValueType(data: any): EnterpriseCrmEventbusProtoParameterValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? deserializeEnterpriseCrmEventbusProtoIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
    serializedObjectValue: data["serializedObjectValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSerializedObjectParameter(data["serializedObjectValue"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoParamSpecEntryConfig {
  /**
   * A short phrase to describe what this parameter contains.
   */
  descriptivePhrase?: string;
  /**
   * Detailed help text for this parameter containing information not provided
   * elsewhere. For example, instructions on how to migrate from a deprecated
   * parameter.
   */
  helpText?: string;
  /**
   * Whether the default value is hidden in the UI.
   */
  hideDefaultValue?: boolean;
  inputDisplayOption?:  | "DEFAULT" | "STRING_MULTI_LINE" | "NUMBER_SLIDER" | "BOOLEAN_TOGGLE";
  /**
   * Whether this field is hidden in the UI.
   */
  isHidden?: boolean;
  /**
   * A user-friendly label for the parameter.
   */
  label?: string;
  parameterNameOption?:  | "DEFAULT_NOT_PARAMETER_NAME" | "IS_PARAMETER_NAME" | "KEY_IS_PARAMETER_NAME" | "VALUE_IS_PARAMETER_NAME";
  /**
   * A user-friendly label for subSection under which the parameter will be
   * displayed.
   */
  subSectionLabel?: string;
  /**
   * Placeholder text which will appear in the UI input form for this
   * parameter.
   */
  uiPlaceholderText?: string;
}

export interface EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition {
  /**
   * The fully-qualified proto name. This message, for example, would be
   * "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition".
   */
  fullName?: string;
  /**
   * Path to the proto file that contains the message type's definition.
   */
  path?: string;
}

export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRule {
  doubleRange?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange;
  intRange?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange;
  stringRegex?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex;
}

function serializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRule(data: any): EnterpriseCrmEventbusProtoParamSpecEntryValidationRule {
  return {
    ...data,
    intRange: data["intRange"] !== undefined ? serializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange(data["intRange"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRule(data: any): EnterpriseCrmEventbusProtoParamSpecEntryValidationRule {
  return {
    ...data,
    intRange: data["intRange"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange(data["intRange"]) : undefined,
  };
}

/**
 * Range used to validate doubles and floats.
 */
export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleDoubleRange {
  /**
   * The inclusive maximum of the acceptable range.
   */
  max?: number;
  /**
   * The inclusive minimum of the acceptable range.
   */
  min?: number;
}

/**
 * Range used to validate longs and ints.
 */
export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange {
  /**
   * The inclusive maximum of the acceptable range.
   */
  max?: bigint;
  /**
   * The inclusive minimum of the acceptable range.
   */
  min?: bigint;
}

function serializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange(data: any): EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange {
  return {
    ...data,
    max: data["max"] !== undefined ? String(data["max"]) : undefined,
    min: data["min"] !== undefined ? String(data["min"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange(data: any): EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleIntRange {
  return {
    ...data,
    max: data["max"] !== undefined ? BigInt(data["max"]) : undefined,
    min: data["min"] !== undefined ? BigInt(data["min"]) : undefined,
  };
}

/**
 * Rule used to validate strings.
 */
export interface EnterpriseCrmEventbusProtoParamSpecEntryValidationRuleStringRegex {
  /**
   * Whether the regex matcher is applied exclusively (if true, matching values
   * will be rejected).
   */
  exclusive?: boolean;
  /**
   * The regex applied to the input value(s).
   */
  regex?: string;
}

/**
 * Key-value pair of EventBus property.
 */
export interface EnterpriseCrmEventbusProtoPropertyEntry {
  /**
   * Key is used to retrieve the corresponding property value. This should be
   * unique for a given fired event. The Tasks should be aware of the keys used
   * while firing the events for them to be able to retrieve the values.
   */
  key?: string;
  /**
   * Values for the defined keys. Each value can either be string, int, double
   * or any proto message.
   */
  value?: EnterpriseCrmEventbusProtoValueType;
}

function serializeEnterpriseCrmEventbusProtoPropertyEntry(data: any): EnterpriseCrmEventbusProtoPropertyEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeEnterpriseCrmEventbusProtoValueType(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoPropertyEntry(data: any): EnterpriseCrmEventbusProtoPropertyEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmEventbusProtoValueType(data["value"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoProtoArrayFunction {
  functionName?:  | "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER";
}

export interface EnterpriseCrmEventbusProtoProtoFunction {
  functionName?:  | "UNSPECIFIED" | "GET_STRING_SUBFIELD" | "GET_INT_SUBFIELD" | "GET_DOUBLE_SUBFIELD" | "GET_BOOLEAN_SUBFIELD" | "GET_STRING_ARRAY_SUBFIELD" | "GET_INT_ARRAY_SUBFIELD" | "GET_DOUBLE_ARRAY_SUBFIELD" | "GET_BOOLEAN_ARRAY_SUBFIELD" | "GET_PROTO_ARRAY_SUBFIELD" | "GET_PROTO_SUBFIELD" | "TO_JSON" | "GET_BYTES_SUBFIELD_AS_UTF_8_STRING" | "GET_BYTES_SUBFIELD_AS_PROTO" | "EQUALS";
}

export interface EnterpriseCrmEventbusProtoProtoParameterArray {
  protoValues?: {
    [key: string]: any
  }[];
}

export interface EnterpriseCrmEventbusProtoScatterResponse {
  /**
   * The error message of the failure if applicable.
   */
  errorMsg?: string;
  /**
   * The execution ids of each Subworkflow fired by this scatter.
   */
  executionIds?: string[];
  /**
   * If execution is sync, this is true if the execution passed and false if it
   * failed. If the execution is async, this is true if the WF was fired off
   * successfully, and false if it failed to execute. The success or failure of
   * the subworkflows executed are not captured.
   */
  isSuccessful?: boolean;
  /**
   * A list of all the response parameters in the aggregtorMap stored with the
   * remapped key.
   */
  responseParams?: EnterpriseCrmEventbusProtoParameterEntry[];
  /**
   * The element that was scattered for this execution.
   */
  scatterElement?: EnterpriseCrmEventbusProtoParameterValueType;
}

function serializeEnterpriseCrmEventbusProtoScatterResponse(data: any): EnterpriseCrmEventbusProtoScatterResponse {
  return {
    ...data,
    responseParams: data["responseParams"] !== undefined ? data["responseParams"].map((item: any) => (serializeEnterpriseCrmEventbusProtoParameterEntry(item))) : undefined,
    scatterElement: data["scatterElement"] !== undefined ? serializeEnterpriseCrmEventbusProtoParameterValueType(data["scatterElement"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoScatterResponse(data: any): EnterpriseCrmEventbusProtoScatterResponse {
  return {
    ...data,
    responseParams: data["responseParams"] !== undefined ? data["responseParams"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoParameterEntry(item))) : undefined,
    scatterElement: data["scatterElement"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParameterValueType(data["scatterElement"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoSerializedObjectParameter {
  objectValue?: Uint8Array;
}

function serializeEnterpriseCrmEventbusProtoSerializedObjectParameter(data: any): EnterpriseCrmEventbusProtoSerializedObjectParameter {
  return {
    ...data,
    objectValue: data["objectValue"] !== undefined ? encodeBase64(data["objectValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSerializedObjectParameter(data: any): EnterpriseCrmEventbusProtoSerializedObjectParameter {
  return {
    ...data,
    objectValue: data["objectValue"] !== undefined ? decodeBase64(data["objectValue"] as string) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoStringArray {
  values?: string[];
}

export interface EnterpriseCrmEventbusProtoStringArrayFunction {
  functionName?:  | "UNSPECIFIED" | "GET" | "APPEND" | "SIZE" | "TO_SET" | "APPEND_ALL" | "TO_JSON" | "SET" | "REMOVE" | "REMOVE_AT" | "CONTAINS" | "FOR_EACH" | "FILTER";
}

export interface EnterpriseCrmEventbusProtoStringFunction {
  functionName?:  | "UNSPECIFIED" | "CONCAT" | "TO_UPPERCASE" | "TO_LOWERCASE" | "CONTAINS" | "SPLIT" | "LENGTH" | "EQUALS" | "TO_INT" | "TO_DOUBLE" | "TO_BOOLEAN" | "TO_BASE_64" | "TO_JSON" | "EQUALS_IGNORE_CASE" | "REPLACE_ALL" | "SUBSTRING" | "RESOLVE_TEMPLATE";
}

export interface EnterpriseCrmEventbusProtoStringParameterArray {
  stringValues?: string[];
}

/**
 * Policy that dictates the behavior for the task after it completes
 * successfully.
 */
export interface EnterpriseCrmEventbusProtoSuccessPolicy {
  /**
   * State to which the execution snapshot status will be set if the task
   * succeeds.
   */
  finalState?:  | "UNSPECIFIED" | "SUCCEEDED" | "SUSPENDED";
}

/**
 * LINT.IfChange
 */
export interface EnterpriseCrmEventbusProtoSuspensionAuthPermissions {
  /**
   * Represents a Gaia identity for a person or service account.
   */
  gaiaIdentity?: EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity;
  googleGroup?: EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity;
  loasRole?: string;
  mdbGroup?: string;
}

function serializeEnterpriseCrmEventbusProtoSuspensionAuthPermissions(data: any): EnterpriseCrmEventbusProtoSuspensionAuthPermissions {
  return {
    ...data,
    gaiaIdentity: data["gaiaIdentity"] !== undefined ? serializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data["gaiaIdentity"]) : undefined,
    googleGroup: data["googleGroup"] !== undefined ? serializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data["googleGroup"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSuspensionAuthPermissions(data: any): EnterpriseCrmEventbusProtoSuspensionAuthPermissions {
  return {
    ...data,
    gaiaIdentity: data["gaiaIdentity"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data["gaiaIdentity"]) : undefined,
    googleGroup: data["googleGroup"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data["googleGroup"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity {
  emailAddress?: string;
  gaiaId?: bigint;
}

function serializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data: any): EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? String(data["gaiaId"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity(data: any): EnterpriseCrmEventbusProtoSuspensionAuthPermissionsGaiaIdentity {
  return {
    ...data,
    gaiaId: data["gaiaId"] !== undefined ? BigInt(data["gaiaId"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoSuspensionConfig {
  /**
   * Optional information to provide recipients of the suspension in addition
   * to the resolution URL, typically containing relevant parameter values from
   * the originating workflow.
   */
  customMessage?: string;
  notifications?: EnterpriseCrmEventbusProtoNotification[];
  /**
   * Indicates the next steps when no external actions happen on the
   * suspension.
   */
  suspensionExpiration?: EnterpriseCrmEventbusProtoSuspensionExpiration;
  /**
   * Identities able to resolve this suspension.
   */
  whoMayResolve?: EnterpriseCrmEventbusProtoSuspensionAuthPermissions[];
}

function serializeEnterpriseCrmEventbusProtoSuspensionConfig(data: any): EnterpriseCrmEventbusProtoSuspensionConfig {
  return {
    ...data,
    notifications: data["notifications"] !== undefined ? data["notifications"].map((item: any) => (serializeEnterpriseCrmEventbusProtoNotification(item))) : undefined,
    whoMayResolve: data["whoMayResolve"] !== undefined ? data["whoMayResolve"].map((item: any) => (serializeEnterpriseCrmEventbusProtoSuspensionAuthPermissions(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSuspensionConfig(data: any): EnterpriseCrmEventbusProtoSuspensionConfig {
  return {
    ...data,
    notifications: data["notifications"] !== undefined ? data["notifications"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoNotification(item))) : undefined,
    whoMayResolve: data["whoMayResolve"] !== undefined ? data["whoMayResolve"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoSuspensionAuthPermissions(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoSuspensionExpiration {
  /**
   * Milliseconds after which the suspension expires, if no action taken.
   */
  expireAfterMs?: number;
  /**
   * Whether the suspension will be REJECTED or LIFTED upon expiration.
   * REJECTED is the default behavior.
   */
  liftWhenExpired?: boolean;
  /**
   * Milliseconds after which the previous suspension action reminder, if any,
   * is sent using the selected notification option, for a suspension which is
   * still PENDING_UNSPECIFIED.
   */
  remindAfterMs?: number;
}

export interface EnterpriseCrmEventbusProtoSuspensionResolutionInfo {
  audit?: EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit;
  /**
   * The event data user sends as request.
   */
  clientId?: string;
  /**
   * KMS info, used by cmek/gmek integration
   */
  cloudKmsConfig?: EnterpriseCrmEventbusProtoCloudKmsConfig;
  /**
   * Auto-generated.
   */
  createdTimestamp?: Date;
  /**
   * Encrypted SuspensionResolutionInfo
   */
  encryptedSuspensionResolutionInfo?: Uint8Array;
  /**
   * Required. ID of the associated execution.
   */
  eventExecutionInfoId?: string;
  /**
   * The origin of the suspension for periodic notifications.
   */
  externalTraffic?: EnterpriseCrmEventbusProtoExternalTraffic;
  /**
   * Auto-generated.
   */
  lastModifiedTimestamp?: Date;
  /**
   * Which Google product the suspension belongs to. If not set, the suspension
   * belongs to Integration Platform by default.
   */
  product?:  | "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY";
  status?:  | "PENDING_UNSPECIFIED" | "REJECTED" | "LIFTED";
  suspensionConfig?: EnterpriseCrmEventbusProtoSuspensionConfig;
  /**
   * Primary key for the SuspensionResolutionInfoTable.
   */
  suspensionId?: string;
  /**
   * Required. Task number of the associated SuspensionTask.
   */
  taskNumber?: string;
  /**
   * Required. The name of the originating workflow.
   */
  workflowName?: string;
  /**
   * Wrapped dek
   */
  wrappedDek?: Uint8Array;
}

function serializeEnterpriseCrmEventbusProtoSuspensionResolutionInfo(data: any): EnterpriseCrmEventbusProtoSuspensionResolutionInfo {
  return {
    ...data,
    audit: data["audit"] !== undefined ? serializeEnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit(data["audit"]) : undefined,
    createdTimestamp: data["createdTimestamp"] !== undefined ? data["createdTimestamp"].toISOString() : undefined,
    encryptedSuspensionResolutionInfo: data["encryptedSuspensionResolutionInfo"] !== undefined ? encodeBase64(data["encryptedSuspensionResolutionInfo"]) : undefined,
    lastModifiedTimestamp: data["lastModifiedTimestamp"] !== undefined ? data["lastModifiedTimestamp"].toISOString() : undefined,
    suspensionConfig: data["suspensionConfig"] !== undefined ? serializeEnterpriseCrmEventbusProtoSuspensionConfig(data["suspensionConfig"]) : undefined,
    wrappedDek: data["wrappedDek"] !== undefined ? encodeBase64(data["wrappedDek"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSuspensionResolutionInfo(data: any): EnterpriseCrmEventbusProtoSuspensionResolutionInfo {
  return {
    ...data,
    audit: data["audit"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit(data["audit"]) : undefined,
    createdTimestamp: data["createdTimestamp"] !== undefined ? new Date(data["createdTimestamp"]) : undefined,
    encryptedSuspensionResolutionInfo: data["encryptedSuspensionResolutionInfo"] !== undefined ? decodeBase64(data["encryptedSuspensionResolutionInfo"] as string) : undefined,
    lastModifiedTimestamp: data["lastModifiedTimestamp"] !== undefined ? new Date(data["lastModifiedTimestamp"]) : undefined,
    suspensionConfig: data["suspensionConfig"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSuspensionConfig(data["suspensionConfig"]) : undefined,
    wrappedDek: data["wrappedDek"] !== undefined ? decodeBase64(data["wrappedDek"] as string) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit {
  resolvedBy?: string;
  resolvedByCpi?: string;
  timestamp?: Date;
}

function serializeEnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit(data: any): EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit(data: any): EnterpriseCrmEventbusProtoSuspensionResolutionInfoAudit {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Message to be used to configure alerting in the {@code TaskConfig} protos
 * for tasks in an event.
 */
export interface EnterpriseCrmEventbusProtoTaskAlertConfig {
  /**
   * The period over which the metric value should be aggregated and evaluated.
   * Format is , where integer should be a positive integer and unit should be
   * one of (s,m,h,d,w) meaning (second, minute, hour, day, week).
   */
  aggregationPeriod?: string;
  /**
   * Set to false by default. When set to true, the metrics are not aggregated
   * or pushed to Monarch for this workflow alert.
   */
  alertDisabled?: boolean;
  /**
   * A name to identify this alert. This will be displayed in the alert
   * subject. If set, this name should be unique in within the scope of the
   * containing workflow.
   */
  alertName?: string;
  /**
   * Client associated with this alert configuration. Must be a client enabled
   * in one of the containing workflow's triggers.
   */
  clientId?: string;
  /**
   * Should be specified only for TASK_AVERAGE_DURATION and
   * TASK_PERCENTILE_DURATION metrics. This member should be used to specify
   * what duration value the metrics should exceed for the alert to trigger.
   */
  durationThresholdMs?: bigint;
  errorEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  metricType?:  | "METRIC_TYPE_UNSPECIFIED" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION";
  /**
   * For how many contiguous aggregation periods should the expected min or max
   * be violated for the alert to be fired.
   */
  numAggregationPeriods?: number;
  /**
   * Only count final task attempts, not retries.
   */
  onlyFinalAttempt?: boolean;
  /**
   * Link to a playbook for resolving the issue that triggered this alert.
   */
  playbookUrl?: string;
  /**
   * The threshold type for which this alert is being configured. If value
   * falls below expected_min or exceeds expected_max, an alert will be fired.
   */
  thresholdType?:  | "UNSPECIFIED_THRESHOLD_TYPE" | "EXPECTED_MIN" | "EXPECTED_MAX";
  /**
   * The metric value, above or below which the alert should be triggered.
   */
  thresholdValue?: EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue;
  warningEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
}

function serializeEnterpriseCrmEventbusProtoTaskAlertConfig(data: any): EnterpriseCrmEventbusProtoTaskAlertConfig {
  return {
    ...data,
    durationThresholdMs: data["durationThresholdMs"] !== undefined ? String(data["durationThresholdMs"]) : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTaskAlertConfig(data: any): EnterpriseCrmEventbusProtoTaskAlertConfig {
  return {
    ...data,
    durationThresholdMs: data["durationThresholdMs"] !== undefined ? BigInt(data["durationThresholdMs"]) : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

/**
 * Contains the details of the execution of this task. Next available id: 11
 */
export interface EnterpriseCrmEventbusProtoTaskExecutionDetails {
  taskAttemptStats?: EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats[];
  taskExecutionState?:  | "UNSPECIFIED" | "PENDING_EXECUTION" | "IN_PROCESS" | "SUCCEED" | "FAILED" | "FATAL" | "RETRY_ON_HOLD" | "SKIPPED" | "CANCELED" | "PENDING_ROLLBACK" | "ROLLBACK_IN_PROCESS" | "ROLLEDBACK" | "SUSPENDED";
  /**
   * Pointer to the task config it used for execution.
   */
  taskNumber?: string;
}

function serializeEnterpriseCrmEventbusProtoTaskExecutionDetails(data: any): EnterpriseCrmEventbusProtoTaskExecutionDetails {
  return {
    ...data,
    taskAttemptStats: data["taskAttemptStats"] !== undefined ? data["taskAttemptStats"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTaskExecutionDetails(data: any): EnterpriseCrmEventbusProtoTaskExecutionDetails {
  return {
    ...data,
    taskAttemptStats: data["taskAttemptStats"] !== undefined ? data["taskAttemptStats"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats {
  /**
   * The end time of the task execution for current attempt.
   */
  endTime?: bigint;
  /**
   * The start time of the task execution for current attempt. This could be in
   * the future if it's been scheduled.
   */
  startTime?: bigint;
}

function serializeEnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats(data: any): EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats(data: any): EnterpriseCrmEventbusProtoTaskExecutionDetailsTaskAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * TaskMetadata are attributes that are associated to every common Task we
 * have.
 */
export interface EnterpriseCrmEventbusProtoTaskMetadata {
  /**
   * The new task name to replace the current task if it is deprecated.
   * Otherwise, it is the same as the current task name.
   */
  activeTaskName?: string;
  admins?: EnterpriseCrmEventbusProtoTaskMetadataAdmin[];
  category?:  | "UNSPECIFIED_CATEGORY" | "CUSTOM" | "FLOW_CONTROL" | "DATA_MANIPULATION" | "SCRIPTING" | "CONNECTOR" | "HIDDEN" | "CLOUD_SYSTEMS" | "CUSTOM_TASK_TEMPLATE" | "TASK_RECOMMENDATIONS";
  /**
   * The Code Search link to the Task Java file.
   */
  codeSearchLink?: string;
  /**
   * Controls whether JSON workflow parameters are validated against provided
   * schemas before and/or after this task's execution.
   */
  defaultJsonValidationOption?:  | "UNSPECIFIED_JSON_VALIDATION_OPTION" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION";
  /**
   * Contains the initial configuration of the task with default values set.
   * For now, The string should be compatible to an ASCII-proto format.
   */
  defaultSpec?: string;
  /**
   * In a few sentences, describe the purpose and usage of the task.
   */
  description?: string;
  /**
   * The string name to show on the task list on the Workflow editor screen.
   * This should be a very short, one to two words name for the task. (e.g.
   * "Send Mail")
   */
  descriptiveName?: string;
  /**
   * Snippet of markdown documentation to embed in the RHP for this task.
   */
  docMarkdown?: string;
  externalCategory?:  | "UNSPECIFIED_EXTERNAL_CATEGORY" | "CORE" | "CONNECTORS";
  /**
   * Sequence with which the task in specific category to be displayed in task
   * discovery panel for external users.
   */
  externalCategorySequence?: number;
  /**
   * External-facing documention embedded in the RHP for this task.
   */
  externalDocHtml?: string;
  /**
   * Doc link for external-facing documentation (separate from g3doc).
   */
  externalDocLink?: string;
  /**
   * DEPRECATED: Use external_doc_html.
   */
  externalDocMarkdown?: string;
  /**
   * URL to the associated G3 Doc for the task if available
   */
  g3DocLink?: string;
  /**
   * URL to gstatic image icon for this task. This icon shows up on the task
   * list panel along with the task name in the Workflow Editor screen. Use the
   * 24p, 2x, gray color icon image format.
   */
  iconLink?: string;
  /**
   * The deprecation status of the current task. Default value is false;
   */
  isDeprecated?: boolean;
  /**
   * The actual class name or the annotated name of the task. Task Author
   * should initialize this field with value from the getName() method of the
   * Task class.
   */
  name?: string;
  /**
   * External-facing documention for standalone IP in pantheon embedded in the
   * RHP for this task. Non null only if different from external_doc_html
   */
  standaloneExternalDocHtml?: string;
  /**
   * Allows author to indicate if the task is ready to use or not. If not set,
   * then it will default to INACTIVE.
   */
  status?:  | "UNSPECIFIED_STATUS" | "DEFAULT_INACTIVE" | "ACTIVE";
  system?:  | "UNSPECIFIED_SYSTEM" | "GENERIC" | "BUGANIZER" | "SALESFORCE" | "CLOUD_SQL" | "PLX" | "SHEETS" | "GOOGLE_GROUPS" | "EMAIL" | "SPANNER" | "DATA_BRIDGE";
  /**
   * A set of tags that pertain to a particular task. This can be used to
   * improve the searchability of tasks with several names ("REST Caller" vs.
   * "Call REST Endpoint") or to help users find tasks based on related words.
   */
  tags?: string[];
}

/**
 * Admins are owners of a Task, and have all permissions on a particular task
 * identified by the task name. By default, Eventbus periodically scans all task
 * metadata and syncs (adds) any new admins defined here to Zanzibar.
 */
export interface EnterpriseCrmEventbusProtoTaskMetadataAdmin {
  googleGroupEmail?: string;
  userEmail?: string;
}

/**
 * Task authors would use this type to configure the UI for a particular task
 * by specifying what UI config modules should be included to compose the UI.
 * Learn more about config module framework:
 */
export interface EnterpriseCrmEventbusProtoTaskUiConfig {
  /**
   * Configurations of included config modules.
   */
  taskUiModuleConfigs?: EnterpriseCrmEventbusProtoTaskUiModuleConfig[];
}

/**
 * Task author would use this type to configure a config module.
 */
export interface EnterpriseCrmEventbusProtoTaskUiModuleConfig {
  /**
   * ID of the config module.
   */
  moduleId?:  | "UNSPECIFIED_TASK_MODULE" | "LABEL" | "ERROR_HANDLING" | "TASK_PARAM_TABLE" | "TASK_PARAM_FORM" | "PRECONDITION" | "SCRIPT_EDITOR" | "RPC" | "TASK_SUMMARY" | "SUSPENSION" | "RPC_TYPED" | "SUB_WORKFLOW" | "APPS_SCRIPT_NAVIGATOR" | "SUB_WORKFLOW_FOR_EACH_LOOP" | "FIELD_MAPPING" | "README" | "REST_CALLER" | "SUB_WORKFLOW_SCATTER_GATHER" | "CLOUD_SQL" | "GENERIC_CONNECTOR_TASK";
}

export interface EnterpriseCrmEventbusProtoTeardown {
  /**
   * Required.
   */
  teardownTaskConfigs?: EnterpriseCrmEventbusProtoTeardownTaskConfig[];
}

function serializeEnterpriseCrmEventbusProtoTeardown(data: any): EnterpriseCrmEventbusProtoTeardown {
  return {
    ...data,
    teardownTaskConfigs: data["teardownTaskConfigs"] !== undefined ? data["teardownTaskConfigs"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTeardownTaskConfig(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTeardown(data: any): EnterpriseCrmEventbusProtoTeardown {
  return {
    ...data,
    teardownTaskConfigs: data["teardownTaskConfigs"] !== undefined ? data["teardownTaskConfigs"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTeardownTaskConfig(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoTeardownTaskConfig {
  /**
   * The creator's email address.
   */
  creatorEmail?: string;
  /**
   * Required. Unique identifier of the teardown task within this Config. We
   * use this field as the identifier to find next teardown tasks.
   */
  name?: string;
  nextTeardownTask?: EnterpriseCrmEventbusProtoNextTeardownTask;
  /**
   * The parameters the user can pass to this task.
   */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  properties?: EnterpriseCrmEventbusProtoEventBusProperties;
  /**
   * Required. Implementation class name.
   */
  teardownTaskImplementationClassName?: string;
}

function serializeEnterpriseCrmEventbusProtoTeardownTaskConfig(data: any): EnterpriseCrmEventbusProtoTeardownTaskConfig {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    properties: data["properties"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventBusProperties(data["properties"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTeardownTaskConfig(data: any): EnterpriseCrmEventbusProtoTeardownTaskConfig {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    properties: data["properties"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventBusProperties(data["properties"]) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoToken {
  name?: string;
  value?: string;
}

export interface EnterpriseCrmEventbusProtoTransformExpression {
  /**
   * Initial value upon which to perform transformations.
   */
  initialValue?: EnterpriseCrmEventbusProtoBaseValue;
  /**
   * Transformations to be applied sequentially.
   */
  transformationFunctions?: EnterpriseCrmEventbusProtoFunction[];
}

function serializeEnterpriseCrmEventbusProtoTransformExpression(data: any): EnterpriseCrmEventbusProtoTransformExpression {
  return {
    ...data,
    initialValue: data["initialValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoBaseValue(data["initialValue"]) : undefined,
    transformationFunctions: data["transformationFunctions"] !== undefined ? data["transformationFunctions"].map((item: any) => (serializeEnterpriseCrmEventbusProtoFunction(item))) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTransformExpression(data: any): EnterpriseCrmEventbusProtoTransformExpression {
  return {
    ...data,
    initialValue: data["initialValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoBaseValue(data["initialValue"]) : undefined,
    transformationFunctions: data["transformationFunctions"] !== undefined ? data["transformationFunctions"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoFunction(item))) : undefined,
  };
}

export interface EnterpriseCrmEventbusProtoTriggerCriteria {
  /**
   * Required. Standard filter expression, when true the workflow will be
   * executed. If there's no trigger_criteria_task_implementation_class_name
   * specified, the condition will be validated directly.
   */
  condition?: string;
  /**
   * Optional. To be used in TaskConfig for the implementation class.
   */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /**
   * Optional. Implementation class name. The class should implement the
   * “TypedTask” interface.
   */
  triggerCriteriaTaskImplementationClassName?: string;
}

function serializeEnterpriseCrmEventbusProtoTriggerCriteria(data: any): EnterpriseCrmEventbusProtoTriggerCriteria {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoTriggerCriteria(data: any): EnterpriseCrmEventbusProtoTriggerCriteria {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

/**
 * Used for define type for values. Currently supported value types include
 * int, string, double, array, and any proto message.
 */
export interface EnterpriseCrmEventbusProtoValueType {
  booleanValue?: boolean;
  doubleArray?: EnterpriseCrmEventbusProtoDoubleArray;
  doubleValue?: number;
  intArray?: EnterpriseCrmEventbusProtoIntArray;
  intValue?: bigint;
  protoValue?: {
    [key: string]: any
  };
  stringArray?: EnterpriseCrmEventbusProtoStringArray;
  stringValue?: string;
}

function serializeEnterpriseCrmEventbusProtoValueType(data: any): EnterpriseCrmEventbusProtoValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? serializeEnterpriseCrmEventbusProtoIntArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoValueType(data: any): EnterpriseCrmEventbusProtoValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? deserializeEnterpriseCrmEventbusProtoIntArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
  };
}

/**
 * Message to be used to configure custom alerting in the {@code EventConfig}
 * protos for an event.
 */
export interface EnterpriseCrmEventbusProtoWorkflowAlertConfig {
  /**
   * For an EXPECTED_MIN threshold, this aggregation_period must be lesser than
   * 24 hours.
   */
  aggregationPeriod?: string;
  /**
   * Set to false by default. When set to true, the metrics are not aggregated
   * or pushed to Monarch for this workflow alert.
   */
  alertDisabled?: boolean;
  /**
   * A name to identify this alert. This will be displayed in the alert
   * subject. If set, this name should be unique within the scope of the
   * workflow.
   */
  alertName?: string;
  /**
   * Client associated with this alert configuration.
   */
  clientId?: string;
  /**
   * Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION
   * metrics. This member should be used to specify what duration value the
   * metrics should exceed for the alert to trigger.
   */
  durationThresholdMs?: bigint;
  errorEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
  metricType?:  | "METRIC_TYPE_UNSPECIFIED" | "EVENT_ERROR_RATE" | "EVENT_WARNING_RATE" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "EVENT_RATE" | "EVENT_AVERAGE_DURATION" | "EVENT_PERCENTILE_DURATION" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION";
  /**
   * For how many contiguous aggregation periods should the expected min or max
   * be violated for the alert to be fired.
   */
  numAggregationPeriods?: number;
  /**
   * For either events or tasks, depending on the type of alert, count only
   * final attempts, not retries.
   */
  onlyFinalAttempt?: boolean;
  /**
   * Link to a playbook for resolving the issue that triggered this alert.
   */
  playbookUrl?: string;
  /**
   * The threshold type, whether lower(expected_min) or upper(expected_max),
   * for which this alert is being configured. If value falls below expected_min
   * or exceeds expected_max, an alert will be fired.
   */
  thresholdType?:  | "UNSPECIFIED_THRESHOLD_TYPE" | "EXPECTED_MIN" | "EXPECTED_MAX";
  /**
   * The metric value, above or below which the alert should be triggered.
   */
  thresholdValue?: EnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue;
  warningEnumList?: EnterpriseCrmEventbusProtoBaseAlertConfigErrorEnumList;
}

function serializeEnterpriseCrmEventbusProtoWorkflowAlertConfig(data: any): EnterpriseCrmEventbusProtoWorkflowAlertConfig {
  return {
    ...data,
    durationThresholdMs: data["durationThresholdMs"] !== undefined ? String(data["durationThresholdMs"]) : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? serializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmEventbusProtoWorkflowAlertConfig(data: any): EnterpriseCrmEventbusProtoWorkflowAlertConfig {
  return {
    ...data,
    durationThresholdMs: data["durationThresholdMs"] !== undefined ? BigInt(data["durationThresholdMs"]) : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? deserializeEnterpriseCrmEventbusProtoBaseAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

/**
 * Stats for the requested dimensions: QPS, duration, and error/warning rate
 */
export interface EnterpriseCrmEventbusStats {
  /**
   * Dimensions that these stats have been aggregated on.
   */
  dimensions?: EnterpriseCrmEventbusStatsDimensions;
  /**
   * Average duration in seconds.
   */
  durationInSeconds?: number;
  /**
   * Average error rate.
   */
  errorRate?: number;
  /**
   * Queries per second.
   */
  qps?: number;
  /**
   * Average warning rate.
   */
  warningRate?: number;
}

export interface EnterpriseCrmEventbusStatsDimensions {
  clientId?: string;
  /**
   * Whether to include or exclude the enums matching the regex.
   */
  enumFilterType?:  | "DEFAULT_INCLUSIVE" | "EXCLUSIVE";
  errorEnumString?: string;
  retryAttempt?:  | "UNSPECIFIED" | "FINAL" | "RETRYABLE" | "CANCELED";
  taskName?: string;
  taskNumber?: string;
  /**
   * Stats have been or will be aggregated on set fields for any
   * semantically-meaningful combination.
   */
  triggerId?: string;
  warningEnumString?: string;
  workflowId?: string;
  workflowName?: string;
}

export interface EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray {
  booleanValues?: boolean[];
}

export interface EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray {
  doubleValues?: number[];
}

/**
 * Contains the details of the execution info of this event: this includes the
 * tasks execution details plus the event execution statistics. Next available
 * id: 10
 */
export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails {
  eventAttemptStats?: EnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats[];
  /**
   * After snapshot migration, this field will no longer be populated, but old
   * execution snapshots will still be accessible.
   */
  eventExecutionSnapshot?: EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot[];
  /**
   * The execution state of this event.
   */
  eventExecutionState?:  | "UNSPECIFIED" | "ON_HOLD" | "IN_PROCESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "RETRY_ON_HOLD" | "SUSPENDED";
  /**
   * Indicates the number of times the execution has restarted from the
   * beginning.
   */
  eventRetriesFromBeginningCount?: number;
  /**
   * The log file path (aka. cns address) for this event.
   */
  logFilePath?: string;
  /**
   * The network address (aka. bns address) that indicates where the event
   * executor is running.
   */
  networkAddress?: string;
  /**
   * Next scheduled execution time in case the execution status was
   * RETRY_ON_HOLD.
   */
  nextExecutionTime?: bigint;
  /**
   * Used internally and shouldn't be exposed to users. A counter for the cron
   * job to record how many times this event is in in_process state but don't
   * have a lock consecutively/
   */
  ryeLockUnheldCount?: number;
}

function serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionDetails(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails {
  return {
    ...data,
    eventAttemptStats: data["eventAttemptStats"] !== undefined ? data["eventAttemptStats"].map((item: any) => (serializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(item))) : undefined,
    eventExecutionSnapshot: data["eventExecutionSnapshot"] !== undefined ? data["eventExecutionSnapshot"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot(item))) : undefined,
    nextExecutionTime: data["nextExecutionTime"] !== undefined ? String(data["nextExecutionTime"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionDetails(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails {
  return {
    ...data,
    eventAttemptStats: data["eventAttemptStats"] !== undefined ? data["eventAttemptStats"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoEventExecutionDetailsEventAttemptStats(item))) : undefined,
    eventExecutionSnapshot: data["eventExecutionSnapshot"] !== undefined ? data["eventExecutionSnapshot"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot(item))) : undefined,
    nextExecutionTime: data["nextExecutionTime"] !== undefined ? BigInt(data["nextExecutionTime"]) : undefined,
  };
}

/**
 * Contains all the execution details for a workflow instance. Next available
 * id: 24
 */
export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo {
  /**
   * The event data user sends as request.
   */
  clientId?: string;
  /**
   * Auto-generated.
   */
  createTime?: bigint;
  /**
   * Final error-code if event failed.
   */
  errorCode?: CrmlogErrorCode;
  /**
   * Errors, warnings, and informationals associated with the workflow/task.
   * The order in which the errors were added by the workflow/task is
   * maintained.
   */
  errors?: EnterpriseCrmEventbusProtoErrorDetail[];
  /**
   * The execution info about this event.
   */
  eventExecutionDetails?: EnterpriseCrmFrontendsEventbusProtoEventExecutionDetails;
  /**
   * Auto-generated primary key.
   */
  eventExecutionInfoId?: string;
  /**
   * Execution trace info to aggregate parent-child executions.
   */
  executionTraceInfo?: EnterpriseCrmEventbusProtoExecutionTraceInfo;
  /**
   * Auto-generated.
   */
  lastModifiedTime?: bigint;
  /**
   * The ways user posts this event.
   */
  postMethod?:  | "UNSPECIFIED" | "POST" | "POST_TO_QUEUE" | "SCHEDULE" | "POST_BY_EVENT_CONFIG_ID" | "POST_WITH_EVENT_DETAILS";
  /**
   * Which Google product the execution_info belongs to. If not set, the
   * execution_info belongs to Integration Platform by default.
   */
  product?:  | "UNSPECIFIED_PRODUCT" | "IP" | "APIGEE" | "SECURITY";
  /**
   * Optional. This is used to de-dup incoming request.
   */
  requestId?: string;
  /**
   * Event parameters come in as part of the request.
   */
  requestParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Event parameters come out as part of the response.
   */
  responseParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Workflow snapshot number.
   */
  snapshotNumber?: bigint;
  /**
   * Tenant this event is created. Used to reschedule the event to correct
   * tenant.
   */
  tenant?: string;
  /**
   * The trigger id of the workflow trigger config. If both trigger_id and
   * client_id is present, the workflow is executed from the start tasks
   * provided by the matching trigger config otherwise it is executed from the
   * default start tasks.
   */
  triggerId?: string;
  /**
   * Required. Pointer to the workflow it is executing.
   */
  workflowId?: string;
  /**
   * Name of the workflow.
   */
  workflowName?: string;
  /**
   * Time interval in seconds to schedule retry of workflow in manifold when
   * workflow is already running
   */
  workflowRetryBackoffIntervalSeconds?: bigint;
}

function serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionInfo(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? String(data["createTime"]) : undefined,
    eventExecutionDetails: data["eventExecutionDetails"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionDetails(data["eventExecutionDetails"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? String(data["lastModifiedTime"]) : undefined,
    requestParams: data["requestParams"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["requestParams"]) : undefined,
    responseParams: data["responseParams"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["responseParams"]) : undefined,
    snapshotNumber: data["snapshotNumber"] !== undefined ? String(data["snapshotNumber"]) : undefined,
    workflowRetryBackoffIntervalSeconds: data["workflowRetryBackoffIntervalSeconds"] !== undefined ? String(data["workflowRetryBackoffIntervalSeconds"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionInfo(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? BigInt(data["createTime"]) : undefined,
    eventExecutionDetails: data["eventExecutionDetails"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionDetails(data["eventExecutionDetails"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? BigInt(data["lastModifiedTime"]) : undefined,
    requestParams: data["requestParams"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["requestParams"]) : undefined,
    responseParams: data["responseParams"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["responseParams"]) : undefined,
    snapshotNumber: data["snapshotNumber"] !== undefined ? BigInt(data["snapshotNumber"]) : undefined,
    workflowRetryBackoffIntervalSeconds: data["workflowRetryBackoffIntervalSeconds"] !== undefined ? BigInt(data["workflowRetryBackoffIntervalSeconds"]) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot {
  /**
   * Indicates "right after which checkpoint task's execution" this snapshot is
   * taken.
   */
  checkpointTaskNumber?: string;
  /**
   * All of the computed conditions that been calculated.
   */
  conditionResults?: EnterpriseCrmEventbusProtoConditionResult[];
  /**
   * The parameters in Event object that differs from last snapshot.
   */
  diffParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Points to the event execution info this snapshot belongs to.
   */
  eventExecutionInfoId?: string;
  /**
   * Auto-generated. Used as primary key for EventExecutionSnapshots table.
   */
  eventExecutionSnapshotId?: string;
  eventExecutionSnapshotMetadata?: EnterpriseCrmEventbusProtoEventExecutionSnapshotEventExecutionSnapshotMetadata;
  /**
   * The parameters in Event object.
   */
  eventParams?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Indicates when this snapshot is taken.
   */
  snapshotTime?: bigint;
  /**
   * All of the task execution details at the given point of time.
   */
  taskExecutionDetails?: EnterpriseCrmEventbusProtoTaskExecutionDetails[];
  /**
   * The task name associated with this snapshot. Could be empty.
   */
  taskName?: string;
}

function serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot {
  return {
    ...data,
    diffParams: data["diffParams"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["diffParams"]) : undefined,
    eventParams: data["eventParams"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["eventParams"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? String(data["snapshotTime"]) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTaskExecutionDetails(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot(data: any): EnterpriseCrmFrontendsEventbusProtoEventExecutionSnapshot {
  return {
    ...data,
    diffParams: data["diffParams"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["diffParams"]) : undefined,
    eventParams: data["eventParams"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["eventParams"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? BigInt(data["snapshotTime"]) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTaskExecutionDetails(item))) : undefined,
  };
}

/**
 * LINT.IfChange This message is used for processing and persisting (when
 * applicable) key value pair parameters for each event in the event bus. Please
 * see
 */
export interface EnterpriseCrmFrontendsEventbusProtoEventParameters {
  /**
   * Parameters are a part of Event and can be used to communicate between
   * different tasks that are part of the same workflow execution.
   */
  parameters?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
}

function serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data: any): EnterpriseCrmFrontendsEventbusProtoEventParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data: any): EnterpriseCrmFrontendsEventbusProtoEventParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoIntParameterArray {
  intValues?: bigint[];
}

function serializeEnterpriseCrmFrontendsEventbusProtoIntParameterArray(data: any): EnterpriseCrmFrontendsEventbusProtoIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoIntParameterArray(data: any): EnterpriseCrmFrontendsEventbusProtoIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Key-value pair of EventBus parameters.
 */
export interface EnterpriseCrmFrontendsEventbusProtoParameterEntry {
  /**
   * Explicitly getting the type of the parameter.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given fired event. These parameters must be predefined in the
   * workflow definition.
   */
  key?: string;
  /**
   * Values for the defined keys. Each value can either be string, int, double
   * or any proto message.
   */
  value?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
}

function serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParameterEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParameterEntry {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["value"]) : undefined,
  };
}

/**
 * A generic multi-map that holds key value pairs. They keys and values can be
 * of any type, unless specified.
 */
export interface EnterpriseCrmFrontendsEventbusProtoParameterMap {
  entries?: EnterpriseCrmFrontendsEventbusProtoParameterMapEntry[];
  /**
   * Option to specify key value type for all entries of the map. If provided
   * then field types for all entries must conform to this.
   */
  keyType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  valueType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
}

function serializeEnterpriseCrmFrontendsEventbusProtoParameterMap(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterMapEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParameterMap(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterMapEntry(item))) : undefined,
  };
}

/**
 * Entry is a pair of key and value.
 */
export interface EnterpriseCrmFrontendsEventbusProtoParameterMapEntry {
  key?: EnterpriseCrmFrontendsEventbusProtoParameterMapField;
  value?: EnterpriseCrmFrontendsEventbusProtoParameterMapField;
}

function serializeEnterpriseCrmFrontendsEventbusProtoParameterMapEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data["value"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParameterMapEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data["value"]) : undefined,
  };
}

/**
 * Field represents either the key or value in an entry.
 */
export interface EnterpriseCrmFrontendsEventbusProtoParameterMapField {
  /**
   * Passing a literal value.
   */
  literalValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  /**
   * Referencing one of the WF variables.
   */
  referenceKey?: string;
}

function serializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParameterMapField(data: any): EnterpriseCrmFrontendsEventbusProtoParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["literalValue"]) : undefined,
  };
}

/**
 * To support various types of parameter values. Next available id: 14
 */
export interface EnterpriseCrmFrontendsEventbusProtoParameterValueType {
  booleanArray?: EnterpriseCrmFrontendsEventbusProtoBooleanParameterArray;
  booleanValue?: boolean;
  doubleArray?: EnterpriseCrmFrontendsEventbusProtoDoubleParameterArray;
  doubleValue?: number;
  intArray?: EnterpriseCrmFrontendsEventbusProtoIntParameterArray;
  intValue?: bigint;
  jsonValue?: string;
  protoArray?: EnterpriseCrmFrontendsEventbusProtoProtoParameterArray;
  protoValue?: {
    [key: string]: any
  };
  serializedObjectValue?: EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter;
  stringArray?: EnterpriseCrmFrontendsEventbusProtoStringParameterArray;
  stringValue?: string;
}

function serializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data: any): EnterpriseCrmFrontendsEventbusProtoParameterValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
    serializedObjectValue: data["serializedObjectValue"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter(data["serializedObjectValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data: any): EnterpriseCrmFrontendsEventbusProtoParameterValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
    serializedObjectValue: data["serializedObjectValue"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter(data["serializedObjectValue"]) : undefined,
  };
}

/**
 * Key-value pair of EventBus task parameters. Next id: 13
 */
export interface EnterpriseCrmFrontendsEventbusProtoParamSpecEntry {
  /**
   * The FQCN of the Java object this represents. A string, for example, would
   * be "java.lang.String". If this is "java.lang.Object", the parameter can be
   * of any type.
   */
  className?: string;
  /**
   * If it is a collection of objects, this would be the FCQN of every
   * individual element in the collection. If this is "java.lang.Object", the
   * parameter is a collection of any type.
   */
  collectionElementClassName?: string;
  /**
   * Optional fields, such as help text and other useful info.
   */
  config?: EnterpriseCrmEventbusProtoParamSpecEntryConfig;
  /**
   * The data type of the parameter.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  /**
   * Default values for the defined keys. Each value can either be string, int,
   * double or any proto message or a serialized object.
   */
  defaultValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  /**
   * If set, this entry is deprecated, so further use of this parameter should
   * be prohibited.
   */
  isDeprecated?: boolean;
  isOutput?: boolean;
  /**
   * If the data_type is JSON_VALUE, then this will define its schema.
   */
  jsonSchema?: string;
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given task. These parameters must be predefined in the
   * workflow definition.
   */
  key?: string;
  /**
   * Populated if this represents a proto or proto array.
   */
  protoDef?: EnterpriseCrmEventbusProtoParamSpecEntryProtoDefinition;
  /**
   * If set, the user must provide an input value for this parameter.
   */
  required?: boolean;
  /**
   * Rule used to validate inputs (individual values and collection elements)
   * for this parameter.
   */
  validationRule?: EnterpriseCrmEventbusProtoParamSpecEntryValidationRule;
}

function serializeEnterpriseCrmFrontendsEventbusProtoParamSpecEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParamSpecEntry {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
    validationRule: data["validationRule"] !== undefined ? serializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRule(data["validationRule"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParamSpecEntry(data: any): EnterpriseCrmFrontendsEventbusProtoParamSpecEntry {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
    validationRule: data["validationRule"] !== undefined ? deserializeEnterpriseCrmEventbusProtoParamSpecEntryValidationRule(data["validationRule"]) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage {
  parameters?: EnterpriseCrmFrontendsEventbusProtoParamSpecEntry[];
}

function serializeEnterpriseCrmFrontendsEventbusProtoParamSpecsMessage(data: any): EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParamSpecEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoParamSpecsMessage(data: any): EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParamSpecEntry(item))) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoProtoParameterArray {
  protoValues?: {
    [key: string]: any
  }[];
}

/**
 * Next available id: 4
 */
export interface EnterpriseCrmFrontendsEventbusProtoRollbackStrategy {
  /**
   * Optional. The customized parameters the user can pass to this task.
   */
  parameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Required. This is the name of the task that needs to be executed upon
   * rollback of this task.
   */
  rollbackTaskImplementationClassName?: string;
  /**
   * Required. These are the tasks numbers of the tasks whose
   * `rollback_strategy.rollback_task_implementation_class_name` needs to be
   * executed upon failure of this task.
   */
  taskNumbersToRollback?: string[];
}

function serializeEnterpriseCrmFrontendsEventbusProtoRollbackStrategy(data: any): EnterpriseCrmFrontendsEventbusProtoRollbackStrategy {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoRollbackStrategy(data: any): EnterpriseCrmFrontendsEventbusProtoRollbackStrategy {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter {
  objectValue?: Uint8Array;
}

function serializeEnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter(data: any): EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter {
  return {
    ...data,
    objectValue: data["objectValue"] !== undefined ? encodeBase64(data["objectValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter(data: any): EnterpriseCrmFrontendsEventbusProtoSerializedObjectParameter {
  return {
    ...data,
    objectValue: data["objectValue"] !== undefined ? decodeBase64(data["objectValue"] as string) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoStringParameterArray {
  stringValues?: string[];
}

/**
 * The task configuration details. This is not the implementation of Task.
 * There might be multiple TaskConfigs for the same Task.
 */
export interface EnterpriseCrmFrontendsEventbusProtoTaskConfig {
  /**
   * Alert configurations on error rate, warning rate, number of runs,
   * durations, etc.
   */
  alertConfigs?: EnterpriseCrmEventbusProtoTaskAlertConfig[];
  /**
   * Auto-generated.
   */
  createTime?: Date;
  /**
   * The creator's email address. Auto-generated from the user's email.
   */
  creatorEmail?: string;
  /**
   * User-provided description intended to give more business context about the
   * task.
   */
  description?: string;
  /**
   * If this config contains a TypedTask, allow validation to succeed if an
   * input is read from the output of another TypedTask whose output type is
   * declared as a superclass of the requested input type. For instance, if the
   * previous task declares an output of type Message, any task with this flag
   * enabled will pass validation when attempting to read any proto Message type
   * from the resultant Event parameter.
   */
  disableStrictTypeValidation?: boolean;
  /**
   * Optional Error catcher id of the error catch flow which will be executed
   * when execution error happens in the task
   */
  errorCatcherId?: string;
  externalTaskType?:  | "EXTERNAL_TASK_TYPE_UNSPECIFIED" | "NORMAL_TASK" | "ERROR_TASK";
  /**
   * Optional. Determines the number of times the task will be retried on
   * failure and with what retry strategy. This is applicable for asynchronous
   * calls to Eventbus alone (Post To Queue, Schedule etc.).
   */
  failurePolicy?: EnterpriseCrmEventbusProtoFailurePolicy;
  /**
   * The number of edges leading into this TaskConfig.
   */
  incomingEdgeCount?: number;
  /**
   * If set, overrides the option configured in the Task implementation class.
   */
  jsonValidationOption?:  | "UNSPECIFIED_JSON_VALIDATION_OPTION" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION";
  /**
   * User-provided label that is attached to this TaskConfig in the UI.
   */
  label?: string;
  /**
   * Auto-generated.
   */
  lastModifiedTime?: Date;
  /**
   * The set of tasks that are next in line to be executed as per the execution
   * graph defined for the parent event, specified by `event_config_id`. Each of
   * these next tasks are executed only if the condition associated with them
   * evaluates to true.
   */
  nextTasks?: EnterpriseCrmEventbusProtoNextTask[];
  /**
   * The policy dictating the execution of the next set of tasks for the
   * current task.
   */
  nextTasksExecutionPolicy?:  | "UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH";
  /**
   * The customized parameters the user can pass to this task.
   */
  parameters?: {
    [key: string]: EnterpriseCrmFrontendsEventbusProtoParameterEntry
  };
  /**
   * Optional. Informs the front-end application where to draw this task config
   * on the UI.
   */
  position?: EnterpriseCrmEventbusProtoCoordinate;
  /**
   * Optional. Standard filter expression evaluated before execution.
   * Independent of other conditions and tasks. Can be used to enable rollout.
   * e.g. "rollout(5)" will only allow 5% of incoming traffic to task.
   */
  precondition?: string;
  /**
   * Optional. User-provided label that is attached to precondition in the UI.
   */
  preconditionLabel?: string;
  /**
   * Optional. Contains information about what needs to be done upon failure
   * (either a permanent error or after it has been retried too many times).
   */
  rollbackStrategy?: EnterpriseCrmFrontendsEventbusProtoRollbackStrategy;
  /**
   * Determines what action to take upon successful task completion.
   */
  successPolicy?: EnterpriseCrmEventbusProtoSuccessPolicy;
  /**
   * Optional. Determines the number of times the task will be retried on
   * failure and with what retry strategy. This is applicable for synchronous
   * calls to Eventbus alone (Post).
   */
  synchronousCallFailurePolicy?: EnterpriseCrmEventbusProtoFailurePolicy;
  /**
   * Copy of the task entity that this task config is an instance of.
   */
  taskEntity?: EnterpriseCrmFrontendsEventbusProtoTaskEntity;
  /**
   * The policy dictating the execution strategy of this task.
   */
  taskExecutionStrategy?:  | "WHEN_ALL_SUCCEED" | "WHEN_ANY_SUCCEED" | "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED";
  /**
   * The name for the task.
   */
  taskName?: string;
  /**
   * REQUIRED: the identifier of this task within its parent event config,
   * specified by the client. This should be unique among all the tasks belong
   * to the same event config. We use this field as the identifier to find next
   * tasks (via field `next_tasks.task_number`).
   */
  taskNumber?: string;
  /**
   * A string template that allows user to configure task parameters (with
   * either literal default values or tokens which will be resolved at execution
   * time) for the task. It will eventually replace the old "parameters" field.
   */
  taskSpec?: string;
  /**
   * Used to define task-template name if task is of type task-template
   */
  taskTemplateName?: string;
  /**
   * Defines the type of the task
   */
  taskType?:  | "TASK" | "ASIS_TEMPLATE" | "IO_TEMPLATE";
}

function serializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(data: any): EnterpriseCrmFrontendsEventbusProtoTaskConfig {
  return {
    ...data,
    alertConfigs: data["alertConfigs"] !== undefined ? data["alertConfigs"].map((item: any) => (serializeEnterpriseCrmEventbusProtoTaskAlertConfig(item))) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failurePolicy: data["failurePolicy"] !== undefined ? serializeEnterpriseCrmEventbusProtoFailurePolicy(data["failurePolicy"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? data["lastModifiedTime"].toISOString() : undefined,
    nextTasks: data["nextTasks"] !== undefined ? data["nextTasks"].map((item: any) => (serializeEnterpriseCrmEventbusProtoNextTask(item))) : undefined,
    parameters: data["parameters"] !== undefined ? Object.fromEntries(Object.entries(data["parameters"]).map(([k, v]: [string, any]) => ([k, serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(v)]))) : undefined,
    rollbackStrategy: data["rollbackStrategy"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoRollbackStrategy(data["rollbackStrategy"]) : undefined,
    synchronousCallFailurePolicy: data["synchronousCallFailurePolicy"] !== undefined ? serializeEnterpriseCrmEventbusProtoFailurePolicy(data["synchronousCallFailurePolicy"]) : undefined,
    taskEntity: data["taskEntity"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoTaskEntity(data["taskEntity"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(data: any): EnterpriseCrmFrontendsEventbusProtoTaskConfig {
  return {
    ...data,
    alertConfigs: data["alertConfigs"] !== undefined ? data["alertConfigs"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoTaskAlertConfig(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failurePolicy: data["failurePolicy"] !== undefined ? deserializeEnterpriseCrmEventbusProtoFailurePolicy(data["failurePolicy"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? new Date(data["lastModifiedTime"]) : undefined,
    nextTasks: data["nextTasks"] !== undefined ? data["nextTasks"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoNextTask(item))) : undefined,
    parameters: data["parameters"] !== undefined ? Object.fromEntries(Object.entries(data["parameters"]).map(([k, v]: [string, any]) => ([k, deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(v)]))) : undefined,
    rollbackStrategy: data["rollbackStrategy"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoRollbackStrategy(data["rollbackStrategy"]) : undefined,
    synchronousCallFailurePolicy: data["synchronousCallFailurePolicy"] !== undefined ? deserializeEnterpriseCrmEventbusProtoFailurePolicy(data["synchronousCallFailurePolicy"]) : undefined,
    taskEntity: data["taskEntity"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoTaskEntity(data["taskEntity"]) : undefined,
  };
}

/**
 * Contains a task's metadata and associated information. Next available id: 7
 */
export interface EnterpriseCrmFrontendsEventbusProtoTaskEntity {
  /**
   * True if the task has conflict with vpcsc
   */
  disabledForVpcSc?: boolean;
  /**
   * Metadata inclueds the task name, author and so on.
   */
  metadata?: EnterpriseCrmEventbusProtoTaskMetadata;
  /**
   * Declarations for inputs/outputs for a TypedTask. This is also associated
   * with the METADATA mask.
   */
  paramSpecs?: EnterpriseCrmFrontendsEventbusProtoParamSpecsMessage;
  /**
   * Deprecated - statistics from the Monarch query.
   */
  stats?: EnterpriseCrmEventbusStats;
  /**
   * Defines the type of the task
   */
  taskType?:  | "TASK" | "ASIS_TEMPLATE" | "IO_TEMPLATE";
  /**
   * UI configuration for this task Also associated with the METADATA mask.
   */
  uiConfig?: EnterpriseCrmEventbusProtoTaskUiConfig;
}

function serializeEnterpriseCrmFrontendsEventbusProtoTaskEntity(data: any): EnterpriseCrmFrontendsEventbusProtoTaskEntity {
  return {
    ...data,
    paramSpecs: data["paramSpecs"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParamSpecsMessage(data["paramSpecs"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoTaskEntity(data: any): EnterpriseCrmFrontendsEventbusProtoTaskEntity {
  return {
    ...data,
    paramSpecs: data["paramSpecs"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParamSpecsMessage(data["paramSpecs"]) : undefined,
  };
}

/**
 * Configuration detail of a trigger. Next available id: 19
 */
export interface EnterpriseCrmFrontendsEventbusProtoTriggerConfig {
  /**
   * An alert threshold configuration for the [trigger + client + workflow]
   * tuple. If these values are not specified in the trigger config, default
   * values will be populated by the system. Note that there must be exactly one
   * alert threshold configured per [client + trigger + workflow] when
   * published.
   */
  alertConfig?: EnterpriseCrmEventbusProtoWorkflowAlertConfig[];
  cloudSchedulerConfig?: EnterpriseCrmEventbusProtoCloudSchedulerConfig;
  /**
   * User-provided description intended to give more business context about the
   * task.
   */
  description?: string;
  /**
   * Required. The list of client ids which are enabled to execute the workflow
   * using this trigger. In other words, these clients have the workflow
   * execution privledges for this trigger. For API trigger, the client id in
   * the incoming request is validated against the list of enabled clients. For
   * non-API triggers, one workflow execution is triggered on behalf of each
   * enabled client.
   */
  enabledClients?: string[];
  /**
   * Optional Error catcher id of the error catch flow which will be executed
   * when execution error happens in the task
   */
  errorCatcherId?: string;
  /**
   * The user created label for a particular trigger.
   */
  label?: string;
  /**
   * Dictates how next tasks will be executed.
   */
  nextTasksExecutionPolicy?:  | "UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH";
  /**
   * Optional. If set to true, any upcoming requests for this trigger config
   * will be paused and the executions will be resumed later when the flag is
   * reset. The workflow to which this trigger config belongs has to be in
   * ACTIVE status for the executions to be paused or resumed.
   */
  pauseWorkflowExecutions?: boolean;
  /**
   * Optional. Informs the front-end application where to draw this trigger
   * config on the UI.
   */
  position?: EnterpriseCrmEventbusProtoCoordinate;
  /**
   * Configurable properties of the trigger, not to be confused with workflow
   * parameters. E.g. "name" is a property for API triggers and "subscription"
   * is a property for Cloud Pubsub triggers.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Set of tasks numbers from where the workflow execution is started by this
   * trigger. If this is empty, then workflow is executed with default start
   * tasks. In the list of start tasks, none of two tasks can have direct
   * ancestor-descendant relationships (i.e. in a same workflow execution
   * graph).
   */
  startTasks?: EnterpriseCrmEventbusProtoNextTask[];
  /**
   * Optional. When set, Eventbus will run the task specified in the
   * trigger_criteria and validate the result using the
   * trigger_criteria.condition, and only execute the workflow when result is
   * true.
   */
  triggerCriteria?: EnterpriseCrmEventbusProtoTriggerCriteria;
  /**
   * The backend trigger ID.
   */
  triggerId?: string;
  /**
   * Required. A number to uniquely identify each trigger config within the
   * workflow on UI.
   */
  triggerNumber?: string;
  triggerType?:  | "UNKNOWN" | "CLOUD_PUBSUB" | "GOOPS" | "SFDC_SYNC" | "CRON" | "API" | "MANIFOLD_TRIGGER" | "DATALAYER_DATA_CHANGE" | "SFDC_CHANNEL" | "CLOUD_PUBSUB_EXTERNAL" | "SFDC_CDC_CHANNEL" | "SFDC_PLATFORM_EVENTS_CHANNEL" | "CLOUD_SCHEDULER";
}

function serializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(data: any): EnterpriseCrmFrontendsEventbusProtoTriggerConfig {
  return {
    ...data,
    alertConfig: data["alertConfig"] !== undefined ? data["alertConfig"].map((item: any) => (serializeEnterpriseCrmEventbusProtoWorkflowAlertConfig(item))) : undefined,
    startTasks: data["startTasks"] !== undefined ? data["startTasks"].map((item: any) => (serializeEnterpriseCrmEventbusProtoNextTask(item))) : undefined,
    triggerCriteria: data["triggerCriteria"] !== undefined ? serializeEnterpriseCrmEventbusProtoTriggerCriteria(data["triggerCriteria"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(data: any): EnterpriseCrmFrontendsEventbusProtoTriggerConfig {
  return {
    ...data,
    alertConfig: data["alertConfig"] !== undefined ? data["alertConfig"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoWorkflowAlertConfig(item))) : undefined,
    startTasks: data["startTasks"] !== undefined ? data["startTasks"].map((item: any) => (deserializeEnterpriseCrmEventbusProtoNextTask(item))) : undefined,
    triggerCriteria: data["triggerCriteria"] !== undefined ? deserializeEnterpriseCrmEventbusProtoTriggerCriteria(data["triggerCriteria"]) : undefined,
  };
}

export interface EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry {
  /**
   * Metadata information about the parameters.
   */
  attributes?: EnterpriseCrmEventbusProtoAttributes;
  /**
   * Child parameters nested within this parameter. This field only applies to
   * protobuf parameters
   */
  children?: EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry[];
  /**
   * The data type of the parameter.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "PROTO_VALUE" | "SERIALIZED_OBJECT_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "PROTO_ARRAY" | "PROTO_ENUM" | "BOOLEAN_ARRAY" | "PROTO_ENUM_ARRAY" | "BYTES" | "BYTES_ARRAY" | "NON_SERIALIZABLE_OBJECT" | "JSON_VALUE";
  /**
   * Default values for the defined keys. Each value can either be string, int,
   * double or any proto message or a serialized object.
   */
  defaultValue?: EnterpriseCrmFrontendsEventbusProtoParameterValueType;
  /**
   * Specifies the input/output type for the parameter.
   */
  inOutType?:  | "IN_OUT_TYPE_UNSPECIFIED" | "IN" | "OUT" | "IN_OUT";
  /**
   * Whether this parameter is a transient parameter.
   */
  isTransient?: boolean;
  /**
   * This schema will be used to validate runtime JSON-typed values of this
   * parameter.
   */
  jsonSchema?: string;
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given fired event. These parameters must be predefined in the
   * workflow definition.
   */
  key?: string;
  /**
   * The name (without prefix) to be displayed in the UI for this parameter.
   * E.g. if the key is "foo.bar.myName", then the name would be "myName".
   */
  name?: string;
  /**
   * The identifier of the node (TaskConfig/TriggerConfig) this parameter was
   * produced by, if it is a transient param or a copy of an input param.
   */
  producedBy?: EnterpriseCrmEventbusProtoNodeIdentifier;
  producer?: string;
  /**
   * The name of the protobuf type if the parameter has a protobuf data type.
   */
  protoDefName?: string;
  /**
   * If the data type is of type proto or proto array, this field needs to be
   * populated with the fully qualified proto name. This message, for example,
   * would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".
   */
  protoDefPath?: string;
}

function serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(data: any): EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? serializeEnterpriseCrmEventbusProtoAttributes(data["attributes"]) : undefined,
    children: data["children"] !== undefined ? data["children"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(item))) : undefined,
    defaultValue: data["defaultValue"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(data: any): EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? deserializeEnterpriseCrmEventbusProtoAttributes(data["attributes"]) : undefined,
    children: data["children"] !== undefined ? data["children"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(item))) : undefined,
    defaultValue: data["defaultValue"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoParameterValueType(data["defaultValue"]) : undefined,
  };
}

/**
 * LINT.IfChange This is the frontend version of WorkflowParameters. It's
 * exactly like the backend version except that instead of flattening protobuf
 * parameters and treating every field and subfield of a protobuf parameter as a
 * separate parameter, the fields/subfields of a protobuf parameter will be
 * nested as "children" (see 'children' field below) parameters of the parent
 * parameter. Please refer to
 * enterprise/crm/eventbus/proto/workflow_parameters.proto for more information
 * about WorkflowParameters.
 */
export interface EnterpriseCrmFrontendsEventbusProtoWorkflowParameters {
  /**
   * Parameters are a part of Event and can be used to communiticate between
   * different tasks that are part of the same workflow execution.
   */
  parameters?: EnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry[];
}

function serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data: any): EnterpriseCrmFrontendsEventbusProtoWorkflowParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(item))) : undefined,
  };
}

function deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data: any): EnterpriseCrmFrontendsEventbusProtoWorkflowParameters {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameterEntry(item))) : undefined,
  };
}

/**
 * Describes string and array limits when writing to logs. When a limit is
 * exceeded the *shortener_type* describes how to shorten the field. next_id: 6
 */
export interface EnterpriseCrmLoggingGwsFieldLimits {
  logAction?:  | "LOG_ACTION_UNSPECIFIED" | "DONT_LOG" | "LOG";
  /**
   * To which type(s) of logs the limits apply.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "GWS" | "GTS" | "ALL"[];
  /**
   * maximum array size. If the array exceds this size, the field (list) is
   * truncated.
   */
  maxArraySize?: number;
  /**
   * maximum string length. If the field exceeds this amount the field is
   * shortened.
   */
  maxStringLength?: number;
  shortenerType?:  | "SHORTENER_TYPE_UNSPECIFIED" | "SHORTEN" | "HASH" | "SHORTEN_WITH_HASH" | "SHORTEN_EMAIL" | "SHORTEN_EMAIL_WITH_HASH" | "SHORTEN_DOMAIN";
}

/**
 * Identifies whether a field contains, or may contain, PII or sensitive data,
 * and how to sanitize the field if it does. If a field's privacy type cannot be
 * determined then it is sanitized (e.g., scrubbed). The specific sanitizer
 * implementation is determined by run-time configuration and environment
 * options (e.g., prod vs. qa). next_id: 5
 */
export interface EnterpriseCrmLoggingGwsSanitizeOptions {
  /**
   * If true, the value has already been sanitized and needs no further
   * sanitization. For instance, a D3 customer id is already an obfuscated
   * entity and *might not* need further sanitization.
   */
  isAlreadySanitized?: boolean;
  /**
   * To which type(s) of logs the sanitize options apply.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "GWS" | "GTS" | "ALL"[];
  privacy?:  | "PRIVACY_TYPE_UNSPECIFIED" | "NOT_PII" | "PII" | "SPII" | "UNSURE";
  sanitizeType?:  | "SANITIZE_TYPE_UNSPECIFIED" | "SCRUB" | "ANONYMIZE" | "ANONYMIZE_LIMITED_REPEATABLE" | "OBFUSCATE" | "ENCRYPT" | "DO_NOT_SANITIZE";
}

/**
 * AuthConfig defines details of a authentication type.
 */
export interface GoogleCloudConnectorsV1AuthConfig {
  /**
   * List containing additional auth configs.
   */
  additionalVariables?: GoogleCloudConnectorsV1ConfigVariable[];
  /**
   * The type of authentication configured.
   */
  authType?:  | "AUTH_TYPE_UNSPECIFIED" | "USER_PASSWORD" | "OAUTH2_JWT_BEARER" | "OAUTH2_CLIENT_CREDENTIALS" | "SSH_PUBLIC_KEY" | "OAUTH2_AUTH_CODE_FLOW";
  /**
   * Oauth2ClientCredentials.
   */
  oauth2ClientCredentials?: GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials;
  /**
   * Oauth2JwtBearer.
   */
  oauth2JwtBearer?: GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer;
  /**
   * SSH Public Key.
   */
  sshPublicKey?: GoogleCloudConnectorsV1AuthConfigSshPublicKey;
  /**
   * UserPassword.
   */
  userPassword?: GoogleCloudConnectorsV1AuthConfigUserPassword;
}

function serializeGoogleCloudConnectorsV1AuthConfig(data: any): GoogleCloudConnectorsV1AuthConfig {
  return {
    ...data,
    additionalVariables: data["additionalVariables"] !== undefined ? data["additionalVariables"].map((item: any) => (serializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
  };
}

function deserializeGoogleCloudConnectorsV1AuthConfig(data: any): GoogleCloudConnectorsV1AuthConfig {
  return {
    ...data,
    additionalVariables: data["additionalVariables"] !== undefined ? data["additionalVariables"].map((item: any) => (deserializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
  };
}

/**
 * Parameters to support Oauth 2.0 Client Credentials Grant Authentication. See
 * https://tools.ietf.org/html/rfc6749#section-1.3.4 for more details.
 */
export interface GoogleCloudConnectorsV1AuthConfigOauth2ClientCredentials {
  /**
   * The client identifier.
   */
  clientId?: string;
  /**
   * Secret version reference containing the client secret.
   */
  clientSecret?: GoogleCloudConnectorsV1Secret;
}

/**
 * Parameters to support JSON Web Token (JWT) Profile for Oauth 2.0
 * Authorization Grant based authentication. See
 * https://tools.ietf.org/html/rfc7523 for more details.
 */
export interface GoogleCloudConnectorsV1AuthConfigOauth2JwtBearer {
  /**
   * Secret version reference containing a PKCS#8 PEM-encoded private key
   * associated with the Client Certificate. This private key will be used to
   * sign JWTs used for the jwt-bearer authorization grant. Specified in the
   * form as: `projects/*\/secrets/*\/versions/*`.
   */
  clientKey?: GoogleCloudConnectorsV1Secret;
  /**
   * JwtClaims providers fields to generate the token.
   */
  jwtClaims?: GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims;
}

/**
 * JWT claims used for the jwt-bearer authorization grant.
 */
export interface GoogleCloudConnectorsV1AuthConfigOauth2JwtBearerJwtClaims {
  /**
   * Value for the "aud" claim.
   */
  audience?: string;
  /**
   * Value for the "iss" claim.
   */
  issuer?: string;
  /**
   * Value for the "sub" claim.
   */
  subject?: string;
}

/**
 * Parameters to support Ssh public key Authentication.
 */
export interface GoogleCloudConnectorsV1AuthConfigSshPublicKey {
  /**
   * Format of SSH Client cert.
   */
  certType?: string;
  /**
   * SSH Client Cert. It should contain both public and private key.
   */
  sshClientCert?: GoogleCloudConnectorsV1Secret;
  /**
   * Password (passphrase) for ssh client certificate if it has one.
   */
  sshClientCertPass?: GoogleCloudConnectorsV1Secret;
  /**
   * The user account used to authenticate.
   */
  username?: string;
}

/**
 * Parameters to support Username and Password Authentication.
 */
export interface GoogleCloudConnectorsV1AuthConfigUserPassword {
  /**
   * Secret version reference containing the password.
   */
  password?: GoogleCloudConnectorsV1Secret;
  /**
   * Username.
   */
  username?: string;
}

/**
 * ConfigVariable represents a configuration variable present in a Connection.
 * or AuthConfig.
 */
export interface GoogleCloudConnectorsV1ConfigVariable {
  /**
   * Value is a bool.
   */
  boolValue?: boolean;
  /**
   * Value is an integer
   */
  intValue?: bigint;
  /**
   * Key of the config variable.
   */
  key?: string;
  /**
   * Value is a secret.
   */
  secretValue?: GoogleCloudConnectorsV1Secret;
  /**
   * Value is a string.
   */
  stringValue?: string;
}

function serializeGoogleCloudConnectorsV1ConfigVariable(data: any): GoogleCloudConnectorsV1ConfigVariable {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
  };
}

function deserializeGoogleCloudConnectorsV1ConfigVariable(data: any): GoogleCloudConnectorsV1ConfigVariable {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
  };
}

/**
 * Connection represents an instance of connector.
 */
export interface GoogleCloudConnectorsV1Connection {
  /**
   * Optional. Configuration for establishing the connection's authentication
   * with an external system.
   */
  authConfig?: GoogleCloudConnectorsV1AuthConfig;
  /**
   * Optional. Configuration for configuring the connection with an external
   * system.
   */
  configVariables?: GoogleCloudConnectorsV1ConfigVariable[];
  /**
   * Required. Connector version on which the connection is created. The format
   * is: projects/*\/locations/*\/providers/*\/connectors/*\/versions/* Only
   * global location is supported for ConnectorVersion resource.
   */
  connectorVersion?: string;
  /**
   * Output only. Created time.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the resource.
   */
  description?: string;
  /**
   * Optional. Configuration of the Connector's destination. Only accepted for
   * Connectors that accepts user defined destination(s).
   */
  destinationConfigs?: GoogleCloudConnectorsV1DestinationConfig[];
  /**
   * Output only. GCR location where the envoy image is stored. formatted like:
   * gcr.io/{bucketName}/{imageName}
   */
  readonly envoyImageLocation?: string;
  /**
   * Output only. GCR location where the runtime image is stored. formatted
   * like: gcr.io/{bucketName}/{imageName}
   */
  readonly imageLocation?: string;
  /**
   * Optional. Resource labels to represent user-provided metadata. Refer to
   * cloud documentation on labels for more details.
   * https://cloud.google.com/compute/docs/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Configuration that indicates whether or not the Connection can
   * be edited.
   */
  lockConfig?: GoogleCloudConnectorsV1LockConfig;
  /**
   * Output only. Resource name of the Connection. Format:
   * projects/{project}/locations/{location}/connections/{connection}
   */
  readonly name?: string;
  /**
   * Optional. Node configuration for the connection.
   */
  nodeConfig?: GoogleCloudConnectorsV1NodeConfig;
  /**
   * Optional. Service account needed for runtime plane to access GCP
   * resources.
   */
  serviceAccount?: string;
  /**
   * Output only. The name of the Service Directory service name. Used for
   * Private Harpoon to resolve the ILB address. e.g.
   * "projects/cloud-connectors-e2e-testing/locations/us-central1/namespaces/istio-system/services/istio-ingressgateway-connectors"
   */
  readonly serviceDirectory?: string;
  /**
   * Optional. Ssl config of a connection
   */
  sslConfig?: GoogleCloudConnectorsV1SslConfig;
  /**
   * Output only. Current status of the connection.
   */
  readonly status?: GoogleCloudConnectorsV1ConnectionStatus;
  /**
   * Optional. Suspended indicates if a user has suspended a connection or not.
   */
  suspended?: boolean;
  /**
   * Output only. Updated time.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudConnectorsV1Connection(data: any): GoogleCloudConnectorsV1Connection {
  return {
    ...data,
    authConfig: data["authConfig"] !== undefined ? serializeGoogleCloudConnectorsV1AuthConfig(data["authConfig"]) : undefined,
    configVariables: data["configVariables"] !== undefined ? data["configVariables"].map((item: any) => (serializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
    sslConfig: data["sslConfig"] !== undefined ? serializeGoogleCloudConnectorsV1SslConfig(data["sslConfig"]) : undefined,
  };
}

function deserializeGoogleCloudConnectorsV1Connection(data: any): GoogleCloudConnectorsV1Connection {
  return {
    ...data,
    authConfig: data["authConfig"] !== undefined ? deserializeGoogleCloudConnectorsV1AuthConfig(data["authConfig"]) : undefined,
    configVariables: data["configVariables"] !== undefined ? data["configVariables"].map((item: any) => (deserializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    sslConfig: data["sslConfig"] !== undefined ? deserializeGoogleCloudConnectorsV1SslConfig(data["sslConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * ConnectionStatus indicates the state of the connection.
 */
export interface GoogleCloudConnectorsV1ConnectionStatus {
  /**
   * Description.
   */
  description?: string;
  /**
   * State.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "INACTIVE" | "DELETING" | "UPDATING" | "ERROR" | "AUTHORIZATION_REQUIRED";
  /**
   * Status provides detailed information for the state.
   */
  status?: string;
}

export interface GoogleCloudConnectorsV1Destination {
  /**
   * For publicly routable host.
   */
  host?: string;
  /**
   * The port is the target port number that is accepted by the destination.
   */
  port?: number;
  /**
   * PSC service attachments. Format:
   * projects/*\/regions/*\/serviceAttachments/*
   */
  serviceAttachment?: string;
}

/**
 * Define the Connectors target endpoint.
 */
export interface GoogleCloudConnectorsV1DestinationConfig {
  /**
   * The destinations for the key.
   */
  destinations?: GoogleCloudConnectorsV1Destination[];
  /**
   * The key is the destination identifier that is supported by the Connector.
   */
  key?: string;
}

/**
 * Determines whether or no a connection is locked. If locked, a reason must be
 * specified.
 */
export interface GoogleCloudConnectorsV1LockConfig {
  /**
   * Indicates whether or not the connection is locked.
   */
  locked?: boolean;
  /**
   * Describes why a connection is locked.
   */
  reason?: string;
}

/**
 * Node configuration for the connection.
 */
export interface GoogleCloudConnectorsV1NodeConfig {
  /**
   * Maximum number of nodes in the runtime nodes.
   */
  maxNodeCount?: number;
  /**
   * Minimum number of nodes in the runtime nodes.
   */
  minNodeCount?: number;
}

/**
 * Secret provides a reference to entries in Secret Manager.
 */
export interface GoogleCloudConnectorsV1Secret {
  /**
   * The resource name of the secret version in the format, format as:
   * `projects/*\/secrets/*\/versions/*`.
   */
  secretVersion?: string;
}

/**
 * SSL Configuration of a connection
 */
export interface GoogleCloudConnectorsV1SslConfig {
  /**
   * Additional SSL related field values
   */
  additionalVariables?: GoogleCloudConnectorsV1ConfigVariable[];
  /**
   * Client Certificate
   */
  clientCertificate?: GoogleCloudConnectorsV1Secret;
  /**
   * Type of Client Cert (PEM/JKS/.. etc.)
   */
  clientCertType?:  | "CERT_TYPE_UNSPECIFIED" | "PEM";
  /**
   * Client Private Key
   */
  clientPrivateKey?: GoogleCloudConnectorsV1Secret;
  /**
   * Secret containing the passphrase protecting the Client Private Key
   */
  clientPrivateKeyPass?: GoogleCloudConnectorsV1Secret;
  /**
   * Private Server Certificate. Needs to be specified if trust model is
   * `PRIVATE`.
   */
  privateServerCertificate?: GoogleCloudConnectorsV1Secret;
  /**
   * Type of Server Cert (PEM/JKS/.. etc.)
   */
  serverCertType?:  | "CERT_TYPE_UNSPECIFIED" | "PEM";
  /**
   * Trust Model of the SSL connection
   */
  trustModel?:  | "PUBLIC" | "PRIVATE" | "INSECURE";
  /**
   * Controls the ssl type for the given connector version.
   */
  type?:  | "SSL_TYPE_UNSPECIFIED" | "TLS" | "MTLS";
  /**
   * Bool for enabling SSL
   */
  useSsl?: boolean;
}

function serializeGoogleCloudConnectorsV1SslConfig(data: any): GoogleCloudConnectorsV1SslConfig {
  return {
    ...data,
    additionalVariables: data["additionalVariables"] !== undefined ? data["additionalVariables"].map((item: any) => (serializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
  };
}

function deserializeGoogleCloudConnectorsV1SslConfig(data: any): GoogleCloudConnectorsV1SslConfig {
  return {
    ...data,
    additionalVariables: data["additionalVariables"] !== undefined ? data["additionalVariables"].map((item: any) => (deserializeGoogleCloudConnectorsV1ConfigVariable(item))) : undefined,
  };
}

/**
 * The access token represents the authorization of a specific application to
 * access specific parts of a user’s data.
 */
export interface GoogleCloudIntegrationsV1alphaAccessToken {
  /**
   * The access token encapsulating the security identity of a process or
   * thread.
   */
  accessToken?: string;
  /**
   * Required. The approximate time until the access token retrieved is valid.
   */
  accessTokenExpireTime?: Date;
  /**
   * If the access token will expire, use the refresh token to obtain another
   * access token.
   */
  refreshToken?: string;
  /**
   * The approximate time until the refresh token retrieved is valid.
   */
  refreshTokenExpireTime?: Date;
  /**
   * Only support "bearer" token in v1 as bearer token is the predominant type
   * used with OAuth 2.0.
   */
  tokenType?: string;
}

function serializeGoogleCloudIntegrationsV1alphaAccessToken(data: any): GoogleCloudIntegrationsV1alphaAccessToken {
  return {
    ...data,
    accessTokenExpireTime: data["accessTokenExpireTime"] !== undefined ? data["accessTokenExpireTime"].toISOString() : undefined,
    refreshTokenExpireTime: data["refreshTokenExpireTime"] !== undefined ? data["refreshTokenExpireTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaAccessToken(data: any): GoogleCloudIntegrationsV1alphaAccessToken {
  return {
    ...data,
    accessTokenExpireTime: data["accessTokenExpireTime"] !== undefined ? new Date(data["accessTokenExpireTime"]) : undefined,
    refreshTokenExpireTime: data["refreshTokenExpireTime"] !== undefined ? new Date(data["refreshTokenExpireTime"]) : undefined,
  };
}

/**
 * Status for the execution attempt.
 */
export interface GoogleCloudIntegrationsV1alphaAttemptStats {
  /**
   * The end time of the event execution for current attempt.
   */
  endTime?: Date;
  /**
   * The start time of the event execution for current attempt. This could be
   * in the future if it's been scheduled.
   */
  startTime?: Date;
}

function serializeGoogleCloudIntegrationsV1alphaAttemptStats(data: any): GoogleCloudIntegrationsV1alphaAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaAttemptStats(data: any): GoogleCloudIntegrationsV1alphaAttemptStats {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The AuthConfig resource use to hold channels and connection config data.
 */
export interface GoogleCloudIntegrationsV1alphaAuthConfig {
  /**
   * Certificate id for client certificate
   */
  certificateId?: string;
  /**
   * Output only. The timestamp when the auth config is created.
   */
  readonly createTime?: Date;
  /**
   * The creator's email address. Generated based on the End User
   * Credentials/LOAS role of the user making the call.
   */
  creatorEmail?: string;
  /**
   * Credential type of the encrypted credential.
   */
  credentialType?:  | "CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN";
  /**
   * Raw auth credentials.
   */
  decryptedCredential?: GoogleCloudIntegrationsV1alphaCredential;
  /**
   * A description of the auth config.
   */
  description?: string;
  /**
   * The name of the auth config.
   */
  displayName?: string;
  /**
   * Auth credential encrypted by Cloud KMS. Can be decrypted as Credential
   * with proper KMS key.
   */
  encryptedCredential?: Uint8Array;
  /**
   * User can define the time to receive notification after which the auth
   * config becomes invalid. Support up to 30 days. Support granularity in
   * hours.
   */
  expiryNotificationDuration?: number /* Duration */[];
  /**
   * The last modifier's email address. Generated based on the End User
   * Credentials/LOAS role of the user making the call.
   */
  lastModifierEmail?: string;
  /**
   * Resource name of the SFDC instance
   * projects/{project}/locations/{location}/authConfigs/{authConfig}.
   */
  name?: string;
  /**
   * User provided expiry time to override. For the example of Salesforce,
   * username/password credentials can be valid for 6 months depending on the
   * instance settings.
   */
  overrideValidTime?: Date;
  /**
   * The reason / details of the current status.
   */
  reason?: string;
  /**
   * The status of the auth config.
   */
  state?:  | "STATE_UNSPECIFIED" | "VALID" | "INVALID" | "SOFT_DELETED" | "EXPIRED" | "UNAUTHORIZED" | "UNSUPPORTED";
  /**
   * Output only. The timestamp when the auth config is modified.
   */
  readonly updateTime?: Date;
  /**
   * The time until the auth config is valid. Empty or max value is considered
   * the auth config won't expire.
   */
  validTime?: Date;
  /**
   * The visibility of the auth config.
   */
  visibility?:  | "AUTH_CONFIG_VISIBILITY_UNSPECIFIED" | "PRIVATE" | "CLIENT_VISIBLE";
}

function serializeGoogleCloudIntegrationsV1alphaAuthConfig(data: any): GoogleCloudIntegrationsV1alphaAuthConfig {
  return {
    ...data,
    decryptedCredential: data["decryptedCredential"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaCredential(data["decryptedCredential"]) : undefined,
    encryptedCredential: data["encryptedCredential"] !== undefined ? encodeBase64(data["encryptedCredential"]) : undefined,
    expiryNotificationDuration: data["expiryNotificationDuration"] !== undefined ? data["expiryNotificationDuration"].map((item: any) => (item)) : undefined,
    overrideValidTime: data["overrideValidTime"] !== undefined ? data["overrideValidTime"].toISOString() : undefined,
    validTime: data["validTime"] !== undefined ? data["validTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaAuthConfig(data: any): GoogleCloudIntegrationsV1alphaAuthConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    decryptedCredential: data["decryptedCredential"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaCredential(data["decryptedCredential"]) : undefined,
    encryptedCredential: data["encryptedCredential"] !== undefined ? decodeBase64(data["encryptedCredential"] as string) : undefined,
    expiryNotificationDuration: data["expiryNotificationDuration"] !== undefined ? data["expiryNotificationDuration"].map((item: any) => (item)) : undefined,
    overrideValidTime: data["overrideValidTime"] !== undefined ? new Date(data["overrideValidTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    validTime: data["validTime"] !== undefined ? new Date(data["validTime"]) : undefined,
  };
}

/**
 * The credentials to authenticate a user agent with a server that is put in
 * HTTP Authorization request header.
 */
export interface GoogleCloudIntegrationsV1alphaAuthToken {
  /**
   * The token for the auth type.
   */
  token?: string;
  /**
   * Authentication type, e.g. "Basic", "Bearer", etc.
   */
  type?: string;
}

/**
 * This message only contains a field of boolean array.
 */
export interface GoogleCloudIntegrationsV1alphaBooleanParameterArray {
  /**
   * Boolean array.
   */
  booleanValues?: boolean[];
}

/**
 * Request for cancelling an execution.
 */
export interface GoogleCloudIntegrationsV1alphaCancelExecutionRequest {
}

/**
 * Response for cancelling an execution.
 */
export interface GoogleCloudIntegrationsV1alphaCancelExecutionResponse {
  /**
   * True if cancellation performed successfully
   */
  isCanceled?: boolean;
}

/**
 * The certificate definition
 */
export interface GoogleCloudIntegrationsV1alphaCertificate {
  /**
   * Status of the certificate
   */
  certificateStatus?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "EXPIRED";
  /**
   * Immutable. Credential id that will be used to register with trawler
   * INTERNAL_ONLY
   */
  credentialId?: string;
  /**
   * Description of the certificate
   */
  description?: string;
  /**
   * Name of the certificate
   */
  displayName?: string;
  /**
   * Output only. Auto generated primary key
   */
  readonly name?: string;
  /**
   * Input only. Raw client certificate which would be registered with trawler
   */
  rawCertificate?: GoogleCloudIntegrationsV1alphaClientCertificate;
  /**
   * Immutable. Requestor ID to be used to register certificate with trawler
   */
  requestorId?: string;
  /**
   * Output only. The timestamp after which certificate will expire
   */
  readonly validEndTime?: Date;
  /**
   * Output only. The timestamp after which certificate will be valid
   */
  readonly validStartTime?: Date;
}

/**
 * Contains client certificate information
 */
export interface GoogleCloudIntegrationsV1alphaClientCertificate {
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  encryptedPrivateKey?: string;
  /**
   * 'passphrase' should be left unset if private key is not encrypted. Note
   * that 'passphrase' is not the password for web server, but an extra layer of
   * security to protected private key.
   */
  passphrase?: string;
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  sslCertificate?: string;
}

/**
 * Cloud Scheduler Trigger configuration
 */
export interface GoogleCloudIntegrationsV1alphaCloudSchedulerConfig {
  /**
   * Required. The cron tab of cloud scheduler trigger.
   */
  cronTab?: string;
  /**
   * Optional. When the job was deleted from Pantheon UI, error_message will be
   * populated when Get/List integrations
   */
  errorMessage?: string;
  /**
   * Required. The location where associated cloud scheduler job will be
   * created
   */
  location?: string;
  /**
   * Required. Service account used by Cloud Scheduler to trigger the
   * integration at scheduled time
   */
  serviceAccountEmail?: string;
}

/**
 * Metadata of runtime connection schema.
 */
export interface GoogleCloudIntegrationsV1alphaConnectionSchemaMetadata {
  /**
   * List of actions.
   */
  actions?: string[];
  /**
   * List of entity names.
   */
  entities?: string[];
}

/**
 * Configuration detail of coordinate, it used for UI
 */
export interface GoogleCloudIntegrationsV1alphaCoordinate {
  /**
   * Required. X axis of the coordinate
   */
  x?: number;
  /**
   * Required. Y axis of the coordinate
   */
  y?: number;
}

/**
 * Request for CreateAppsScriptProject rpc call.
 */
export interface GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectRequest {
  /**
   * The name of the Apps Script project to be created.
   */
  appsScriptProject?: string;
  /**
   * The auth config id necessary to fetch the necessary credentials to create
   * the project for external clients
   */
  authConfigId?: string;
}

/**
 * Response for CreateAppsScriptProject rpc call.
 */
export interface GoogleCloudIntegrationsV1alphaCreateAppsScriptProjectResponse {
  /**
   * The created AppsScriptProject ID.
   */
  projectId?: string;
}

/**
 * Defines parameters for a single, canonical credential.
 */
export interface GoogleCloudIntegrationsV1alphaCredential {
  /**
   * Auth token credential
   */
  authToken?: GoogleCloudIntegrationsV1alphaAuthToken;
  /**
   * Credential type associated with auth config.
   */
  credentialType?:  | "CREDENTIAL_TYPE_UNSPECIFIED" | "USERNAME_AND_PASSWORD" | "API_KEY" | "OAUTH2_AUTHORIZATION_CODE" | "OAUTH2_IMPLICIT" | "OAUTH2_CLIENT_CREDENTIALS" | "OAUTH2_RESOURCE_OWNER_CREDENTIALS" | "JWT" | "AUTH_TOKEN" | "SERVICE_ACCOUNT" | "CLIENT_CERTIFICATE_ONLY" | "OIDC_TOKEN";
  /**
   * JWT credential
   */
  jwt?: GoogleCloudIntegrationsV1alphaJwt;
  /**
   * The api_key and oauth2_implicit are not covered in v1 and will be picked
   * up once v1 is implemented. ApiKey api_key = 3; OAuth2 authorization code
   * credential
   */
  oauth2AuthorizationCode?: GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode;
  /**
   * OAuth2Implicit oauth2_implicit = 5; OAuth2 client credentials
   */
  oauth2ClientCredentials?: GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials;
  /**
   * OAuth2 resource owner credentials
   */
  oauth2ResourceOwnerCredentials?: GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials;
  /**
   * Google OIDC ID Token
   */
  oidcToken?: GoogleCloudIntegrationsV1alphaOidcToken;
  /**
   * Service account credential
   */
  serviceAccountCredentials?: GoogleCloudIntegrationsV1alphaServiceAccountCredentials;
  /**
   * Username and password credential
   */
  usernameAndPassword?: GoogleCloudIntegrationsV1alphaUsernameAndPassword;
}

function serializeGoogleCloudIntegrationsV1alphaCredential(data: any): GoogleCloudIntegrationsV1alphaCredential {
  return {
    ...data,
    oauth2AuthorizationCode: data["oauth2AuthorizationCode"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode(data["oauth2AuthorizationCode"]) : undefined,
    oauth2ClientCredentials: data["oauth2ClientCredentials"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaOAuth2ClientCredentials(data["oauth2ClientCredentials"]) : undefined,
    oauth2ResourceOwnerCredentials: data["oauth2ResourceOwnerCredentials"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials(data["oauth2ResourceOwnerCredentials"]) : undefined,
    oidcToken: data["oidcToken"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaOidcToken(data["oidcToken"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaCredential(data: any): GoogleCloudIntegrationsV1alphaCredential {
  return {
    ...data,
    oauth2AuthorizationCode: data["oauth2AuthorizationCode"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode(data["oauth2AuthorizationCode"]) : undefined,
    oauth2ClientCredentials: data["oauth2ClientCredentials"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaOAuth2ClientCredentials(data["oauth2ClientCredentials"]) : undefined,
    oauth2ResourceOwnerCredentials: data["oauth2ResourceOwnerCredentials"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials(data["oauth2ResourceOwnerCredentials"]) : undefined,
    oidcToken: data["oidcToken"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaOidcToken(data["oidcToken"]) : undefined,
  };
}

/**
 * This message only contains a field of double number array.
 */
export interface GoogleCloudIntegrationsV1alphaDoubleParameterArray {
  /**
   * Double number array.
   */
  doubleValues?: number[];
}

/**
 * Response for DownloadIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaDownloadIntegrationVersionResponse {
  /**
   * String representation of the integration version.
   */
  content?: string;
}

/**
 * Response containing all provisioned regions for Connector Platform.
 */
export interface GoogleCloudIntegrationsV1alphaEnumerateConnectorPlatformRegionsResponse {
  /**
   * All regions where Connector Platform is provisioned.
   */
  regions?: string[];
}

/**
 * Configuration detail of a error catch task
 */
export interface GoogleCloudIntegrationsV1alphaErrorCatcherConfig {
  /**
   * Optional. User-provided description intended to give more business context
   * about the error catcher config.
   */
  description?: string;
  /**
   * Required. An error catcher id is string representation for the error
   * catcher config. Within a workflow, error_catcher_id uniquely identifies an
   * error catcher config among all error catcher configs for the workflow
   */
  errorCatcherId?: string;
  /**
   * Required. A number to uniquely identify each error catcher config within
   * the workflow on UI.
   */
  errorCatcherNumber?: string;
  /**
   * Optional. The user created label for a particular error catcher. Optional.
   */
  label?: string;
  /**
   * Optional. Informs the front-end application where to draw this error
   * catcher config on the UI.
   */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
  /**
   * Required. The set of start tasks that are to be executed for the error
   * catch flow
   */
  startErrorTasks?: GoogleCloudIntegrationsV1alphaNextTask[];
}

/**
 * This message is used for processing and persisting (when applicable) key
 * value pair parameters for each event in the event bus.
 */
export interface GoogleCloudIntegrationsV1alphaEventParameter {
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given fired event. These parameters must be predefined in the
   * integration definition.
   */
  key?: string;
  /**
   * Values for the defined keys. Each value can either be string, int, double
   * or any proto message.
   */
  value?: GoogleCloudIntegrationsV1alphaValueType;
}

function serializeGoogleCloudIntegrationsV1alphaEventParameter(data: any): GoogleCloudIntegrationsV1alphaEventParameter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaValueType(data["value"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaEventParameter(data: any): GoogleCloudIntegrationsV1alphaEventParameter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaValueType(data["value"]) : undefined,
  };
}

/**
 * The request for executing an integration.
 */
export interface GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest {
  /**
   * Optional. Flag to determine how to should propagate errors. If this flag
   * is set to be true, it will not throw an exception. Instead, it will return
   * a {@link ExecuteIntegrationsResponse} with an execution id and error
   * messages as PostWithTriggerIdExecutionException in {@link EventParameters}.
   * The flag is set to be false by default.
   */
  doNotPropagateError?: boolean;
  /**
   * Optional. The id of the ON_HOLD execution to be resumed.
   */
  executionId?: string;
  /**
   * Optional. Input parameters used by integration execution.
   */
  inputParameters?: {
    [key: string]: GoogleCloudIntegrationsV1alphaValueType
  };
  /**
   * Optional. Parameters are a part of Event and can be used to communicate
   * between different tasks that are part of the same integration execution.
   */
  parameterEntries?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
  /**
   * Optional. Passed in as parameters to each integration execution. Redacted
   */
  parameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Optional. This is used to de-dup incoming request: if the duplicate
   * request was detected, the response from the previous execution is returned.
   */
  requestId?: string;
  /**
   * Required. Matched against all {@link TriggerConfig}s across all
   * integrations. i.e. TriggerConfig.trigger_id.equals(trigger_id). The
   * trigger_id is in the format of `api_trigger/TRIGGER_NAME`.
   */
  triggerId?: string;
}

function serializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest(data: any): GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest {
  return {
    ...data,
    inputParameters: data["inputParameters"] !== undefined ? Object.fromEntries(Object.entries(data["inputParameters"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest(data: any): GoogleCloudIntegrationsV1alphaExecuteIntegrationsRequest {
  return {
    ...data,
    inputParameters: data["inputParameters"] !== undefined ? Object.fromEntries(Object.entries(data["inputParameters"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["parameters"]) : undefined,
  };
}

/**
 * The response for executing an integration.
 */
export interface GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse {
  /**
   * Details for the integration that were executed.
   */
  eventParameters?: EnterpriseCrmFrontendsEventbusProtoEventParameters;
  /**
   * Is true if any execution in the integration failed. False otherwise.
   */
  executionFailed?: boolean;
  /**
   * The id of the execution corresponding to this run of integration.
   */
  executionId?: string;
  /**
   * OUTPUT parameters in format of Map. Where Key is the name of the
   * parameter. Note: Name of the system generated parameters are wrapped by
   * backtick(`) to distinguish them from the user defined parameters.
   */
  outputParameters?: {
    [key: string]: any
  };
  /**
   * Parameters are a part of Event and can be used to communicate between
   * different tasks that are part of the same integration execution.
   */
  parameterEntries?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
}

function serializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse(data: any): GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse {
  return {
    ...data,
    eventParameters: data["eventParameters"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["eventParameters"]) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse(data: any): GoogleCloudIntegrationsV1alphaExecuteIntegrationsResponse {
  return {
    ...data,
    eventParameters: data["eventParameters"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoEventParameters(data["eventParameters"]) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
  };
}

/**
 * The Execution resource contains detailed information of an individual
 * integration execution.
 */
export interface GoogleCloudIntegrationsV1alphaExecution {
  /**
   * Output only. Created time of the execution.
   */
  readonly createTime?: Date;
  /**
   * Direct sub executions of the following Execution.
   */
  directSubExecutions?: GoogleCloudIntegrationsV1alphaExecution[];
  /**
   * The execution info about this event.
   */
  eventExecutionDetails?: EnterpriseCrmEventbusProtoEventExecutionDetails;
  /**
   * Detailed info of this execution.
   */
  executionDetails?: GoogleCloudIntegrationsV1alphaExecutionDetails;
  /**
   * The ways user posts this event.
   */
  executionMethod?:  | "EXECUTION_METHOD_UNSPECIFIED" | "POST" | "POST_TO_QUEUE" | "SCHEDULE";
  /**
   * Auto-generated primary key.
   */
  name?: string;
  /**
   * Event parameters come in as part of the request.
   */
  requestParameters?: {
    [key: string]: GoogleCloudIntegrationsV1alphaValueType
  };
  /**
   * Event parameters come in as part of the request.
   */
  requestParams?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
  /**
   * Event parameters returned as part of the response.
   */
  responseParameters?: {
    [key: string]: GoogleCloudIntegrationsV1alphaValueType
  };
  /**
   * Event parameters come out as part of the response.
   */
  responseParams?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
  /**
   * The trigger id of the integration trigger config. If both trigger_id and
   * client_id is present, the integration is executed from the start tasks
   * provided by the matching trigger config otherwise it is executed from the
   * default start tasks.
   */
  triggerId?: string;
  /**
   * Output only. Last modified time of the execution.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudIntegrationsV1alphaExecution(data: any): GoogleCloudIntegrationsV1alphaExecution {
  return {
    ...data,
    directSubExecutions: data["directSubExecutions"] !== undefined ? data["directSubExecutions"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaExecution(item))) : undefined,
    eventExecutionDetails: data["eventExecutionDetails"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventExecutionDetails(data["eventExecutionDetails"]) : undefined,
    executionDetails: data["executionDetails"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaExecutionDetails(data["executionDetails"]) : undefined,
    requestParameters: data["requestParameters"] !== undefined ? Object.fromEntries(Object.entries(data["requestParameters"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    requestParams: data["requestParams"] !== undefined ? data["requestParams"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    responseParameters: data["responseParameters"] !== undefined ? Object.fromEntries(Object.entries(data["responseParameters"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    responseParams: data["responseParams"] !== undefined ? data["responseParams"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaExecution(data: any): GoogleCloudIntegrationsV1alphaExecution {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    directSubExecutions: data["directSubExecutions"] !== undefined ? data["directSubExecutions"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaExecution(item))) : undefined,
    eventExecutionDetails: data["eventExecutionDetails"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventExecutionDetails(data["eventExecutionDetails"]) : undefined,
    executionDetails: data["executionDetails"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaExecutionDetails(data["executionDetails"]) : undefined,
    requestParameters: data["requestParameters"] !== undefined ? Object.fromEntries(Object.entries(data["requestParameters"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    requestParams: data["requestParams"] !== undefined ? data["requestParams"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    responseParameters: data["responseParameters"] !== undefined ? Object.fromEntries(Object.entries(data["responseParameters"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    responseParams: data["responseParams"] !== undefined ? data["responseParams"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Contains the details of the execution info: this includes the tasks
 * execution details plus the event execution statistics.
 */
export interface GoogleCloudIntegrationsV1alphaExecutionDetails {
  /**
   * List of Start and end time of the execution attempts.
   */
  attemptStats?: GoogleCloudIntegrationsV1alphaAttemptStats[];
  /**
   * List of snapshots taken during the execution.
   */
  executionSnapshots?: GoogleCloudIntegrationsV1alphaExecutionSnapshot[];
  /**
   * Status of the execution.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "RETRY_ON_HOLD" | "SUSPENDED";
}

function serializeGoogleCloudIntegrationsV1alphaExecutionDetails(data: any): GoogleCloudIntegrationsV1alphaExecutionDetails {
  return {
    ...data,
    attemptStats: data["attemptStats"] !== undefined ? data["attemptStats"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaAttemptStats(item))) : undefined,
    executionSnapshots: data["executionSnapshots"] !== undefined ? data["executionSnapshots"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaExecutionSnapshot(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaExecutionDetails(data: any): GoogleCloudIntegrationsV1alphaExecutionDetails {
  return {
    ...data,
    attemptStats: data["attemptStats"] !== undefined ? data["attemptStats"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaAttemptStats(item))) : undefined,
    executionSnapshots: data["executionSnapshots"] !== undefined ? data["executionSnapshots"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaExecutionSnapshot(item))) : undefined,
  };
}

/**
 * Contains the snapshot of the execution for a given checkpoint.
 */
export interface GoogleCloudIntegrationsV1alphaExecutionSnapshot {
  /**
   * Indicates "after which checkpoint task's execution" this snapshot is
   * taken.
   */
  checkpointTaskNumber?: string;
  /**
   * Metadata of the execution snapshot.
   */
  executionSnapshotMetadata?: GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata;
  /**
   * Parameters used during the execution.
   */
  params?: {
    [key: string]: GoogleCloudIntegrationsV1alphaValueType
  };
  /**
   * All of the task execution details at the given point of time.
   */
  taskExecutionDetails?: GoogleCloudIntegrationsV1alphaTaskExecutionDetails[];
}

function serializeGoogleCloudIntegrationsV1alphaExecutionSnapshot(data: any): GoogleCloudIntegrationsV1alphaExecutionSnapshot {
  return {
    ...data,
    params: data["params"] !== undefined ? Object.fromEntries(Object.entries(data["params"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaTaskExecutionDetails(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaExecutionSnapshot(data: any): GoogleCloudIntegrationsV1alphaExecutionSnapshot {
  return {
    ...data,
    params: data["params"] !== undefined ? Object.fromEntries(Object.entries(data["params"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    taskExecutionDetails: data["taskExecutionDetails"] !== undefined ? data["taskExecutionDetails"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaTaskExecutionDetails(item))) : undefined,
  };
}

/**
 * Metadata of the execution snapshot.
 */
export interface GoogleCloudIntegrationsV1alphaExecutionSnapshotExecutionSnapshotMetadata {
  /**
   * the execution attempt number this snapshot belongs to.
   */
  executionAttempt?: number;
  /**
   * the task name associated with this snapshot.
   */
  task?: string;
  /**
   * the task attempt number this snapshot belongs to.
   */
  taskAttempt?: number;
  /**
   * The task number associated with this snapshot.
   */
  taskNumber?: string;
}

/**
 * Policy that defines the task retry logic and failure type. If no
 * FailurePolicy is defined for a task, all its dependent tasks will not be
 * executed (i.e, a `retry_strategy` of NONE will be applied).
 */
export interface GoogleCloudIntegrationsV1alphaFailurePolicy {
  /**
   * Required if retry_strategy is FIXED_INTERVAL or
   * LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the
   * initial interval in seconds for backoff.
   */
  intervalTime?: Date;
  /**
   * Required if retry_strategy is FIXED_INTERVAL or
   * LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the
   * number of times the task will be retried if failed.
   */
  maxRetries?: number;
  /**
   * Defines what happens to the task upon failure.
   */
  retryStrategy?:  | "RETRY_STRATEGY_UNSPECIFIED" | "IGNORE" | "NONE" | "FATAL" | "FIXED_INTERVAL" | "LINEAR_BACKOFF" | "EXPONENTIAL_BACKOFF" | "RESTART_INTEGRATION_WITH_BACKOFF";
}

function serializeGoogleCloudIntegrationsV1alphaFailurePolicy(data: any): GoogleCloudIntegrationsV1alphaFailurePolicy {
  return {
    ...data,
    intervalTime: data["intervalTime"] !== undefined ? data["intervalTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaFailurePolicy(data: any): GoogleCloudIntegrationsV1alphaFailurePolicy {
  return {
    ...data,
    intervalTime: data["intervalTime"] !== undefined ? new Date(data["intervalTime"]) : undefined,
  };
}

/**
 * Returns success or error message
 */
export interface GoogleCloudIntegrationsV1alphaGenerateTokenResponse {
  /**
   * The message that notifies the user if the request succeeded or not.
   */
  message?: string;
}

/**
 * The integration definition.
 */
export interface GoogleCloudIntegrationsV1alphaIntegration {
  /**
   * Required. If any integration version is published.
   */
  active?: boolean;
  /**
   * Optional.
   */
  description?: string;
  /**
   * Required. The resource name of the integration.
   */
  name?: string;
  /**
   * Output only. Auto-generated.
   */
  readonly updateTime?: Date;
}

/**
 * Message to be used to configure custom alerting in the {@code EventConfig}
 * protos for an event.
 */
export interface GoogleCloudIntegrationsV1alphaIntegrationAlertConfig {
  /**
   * The period over which the metric value should be aggregated and evaluated.
   * Format is , where integer should be a positive integer and unit should be
   * one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an
   * EXPECTED_MIN threshold, this aggregation_period must be lesser than 24
   * hours.
   */
  aggregationPeriod?: string;
  /**
   * For how many contiguous aggregation periods should the expected min or max
   * be violated for the alert to be fired.
   */
  alertThreshold?: number;
  /**
   * Set to false by default. When set to true, the metrics are not aggregated
   * or pushed to Monarch for this integration alert.
   */
  disableAlert?: boolean;
  /**
   * Name of the alert. This will be displayed in the alert subject. If set,
   * this name should be unique within the scope of the integration.
   */
  displayName?: string;
  /**
   * Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION
   * metrics. This member should be used to specify what duration value the
   * metrics should exceed for the alert to trigger.
   */
  durationThreshold?: number /* Duration */;
  /**
   * The type of metric.
   */
  metricType?:  | "METRIC_TYPE_UNSPECIFIED" | "EVENT_ERROR_RATE" | "EVENT_WARNING_RATE" | "TASK_ERROR_RATE" | "TASK_WARNING_RATE" | "TASK_RATE" | "EVENT_RATE" | "EVENT_AVERAGE_DURATION" | "EVENT_PERCENTILE_DURATION" | "TASK_AVERAGE_DURATION" | "TASK_PERCENTILE_DURATION";
  /**
   * For either events or tasks, depending on the type of alert, count only
   * final attempts, not retries.
   */
  onlyFinalAttempt?: boolean;
  /**
   * The threshold type, whether lower(expected_min) or upper(expected_max),
   * for which this alert is being configured. If value falls below expected_min
   * or exceeds expected_max, an alert will be fired.
   */
  thresholdType?:  | "THRESHOLD_TYPE_UNSPECIFIED" | "EXPECTED_MIN" | "EXPECTED_MAX";
  /**
   * The metric value, above or below which the alert should be triggered.
   */
  thresholdValue?: GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue;
}

function serializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfig(data: any): GoogleCloudIntegrationsV1alphaIntegrationAlertConfig {
  return {
    ...data,
    durationThreshold: data["durationThreshold"] !== undefined ? data["durationThreshold"] : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfig(data: any): GoogleCloudIntegrationsV1alphaIntegrationAlertConfig {
  return {
    ...data,
    durationThreshold: data["durationThreshold"] !== undefined ? data["durationThreshold"] : undefined,
    thresholdValue: data["thresholdValue"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue(data["thresholdValue"]) : undefined,
  };
}

/**
 * The threshold value of the metric, above or below which the alert should be
 * triggered. See EventAlertConfig or TaskAlertConfig for the different alert
 * metric types in each case. For the *RATE metrics, one or both of these fields
 * may be set. Zero is the default value and can be left at that. For
 * *PERCENTILE_DURATION metrics, one or both of these fields may be set, and
 * also, the duration threshold value should be specified in the
 * threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these
 * fields should not be set at all. A different member, threshold_duration_ms,
 * must be set in the EventAlertConfig or the TaskAlertConfig.
 */
export interface GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue {
  /**
   * Absolute value threshold.
   */
  absolute?: bigint;
  /**
   * Percentage threshold.
   */
  percentage?: number;
}

function serializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue(data: any): GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue {
  return {
    ...data,
    absolute: data["absolute"] !== undefined ? String(data["absolute"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue(data: any): GoogleCloudIntegrationsV1alphaIntegrationAlertConfigThresholdValue {
  return {
    ...data,
    absolute: data["absolute"] !== undefined ? BigInt(data["absolute"]) : undefined,
  };
}

/**
 * Integration Parameter is defined in the integration config and are used to
 * provide information about data types of the expected parameters and provide
 * any default values if needed. They can also be used to add custom attributes.
 * These are static in nature and should not be used for dynamic event
 * definition.
 */
export interface GoogleCloudIntegrationsV1alphaIntegrationParameter {
  /**
   * Type of the parameter.
   */
  dataType?:  | "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY";
  /**
   * Default values for the defined keys. Each value can either be string, int,
   * double or any proto message or a serialized object.
   */
  defaultValue?: GoogleCloudIntegrationsV1alphaValueType;
  /**
   * The name (without prefix) to be displayed in the UI for this parameter.
   * E.g. if the key is "foo.bar.myName", then the name would be "myName".
   */
  displayName?: string;
  /**
   * Specifies the input/output type for the parameter.
   */
  inputOutputType?:  | "IN_OUT_TYPE_UNSPECIFIED" | "IN" | "OUT" | "IN_OUT";
  /**
   * Whether this parameter is a transient parameter.
   */
  isTransient?: boolean;
  /**
   * This schema will be used to validate runtime JSON-typed values of this
   * parameter.
   */
  jsonSchema?: string;
  /**
   * Key is used to retrieve the corresponding parameter value. This should be
   * unique for a given fired event. These parameters must be predefined in the
   * integration definition.
   */
  key?: string;
  /**
   * The identifier of the node (TaskConfig/TriggerConfig) this parameter was
   * produced by, if it is a transient param or a copy of an input param.
   */
  producer?: string;
  /**
   * Searchable in the execution log or not.
   */
  searchable?: boolean;
}

function serializeGoogleCloudIntegrationsV1alphaIntegrationParameter(data: any): GoogleCloudIntegrationsV1alphaIntegrationParameter {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaValueType(data["defaultValue"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntegrationParameter(data: any): GoogleCloudIntegrationsV1alphaIntegrationParameter {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaValueType(data["defaultValue"]) : undefined,
  };
}

/**
 * IntegrationTemplateVersion definition. An IntegrationTemplateVersion
 * provides configurations required to construct an IntegrationVersion. It
 * cannot be executed directly like an Integration. Users can create
 * IntegrationTemplateVersions using Integrations. These Templates can be shared
 * by users across GCP projects.
 */
export interface GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion {
  /**
   * Output only. Auto-generated.
   */
  readonly createTime?: Date;
  /**
   * Optional. Flag to disable database persistence for execution data,
   * including event execution info, execution export info, execution metadata
   * index and execution param index.
   */
  databasePersistencePolicy?:  | "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED" | "DATABASE_PERSISTENCE_DISABLED";
  /**
   * Optional. The templateversion description. Permitted format is
   * alphanumeric with underscores and no spaces.
   */
  description?: string;
  /**
   * Optional. Error Catch Task configuration for the
   * IntegrationTemplateVersion. It's optional.
   */
  errorCatcherConfigs?: GoogleCloudIntegrationsV1alphaErrorCatcherConfig[];
  /**
   * Optional. The last modifier's email address. Generated based on the End
   * User Credentials/LOAS role of the user making the call.
   */
  lastModifierEmail?: string;
  /**
   * Output only. Auto-generated primary key. Format:
   * projects/{project}/locations/{location}/products/{product}/integrationtemplates/{integrationtemplate}/versions/{version}
   */
  readonly name?: string;
  /**
   * Optional. ID of the IntegrationVersion that was used to create this
   * IntegrationTemplateVersion
   */
  parentIntegrationVersionId?: string;
  /**
   * Output only. An increasing sequence that is set when a new snapshot is
   * created.
   */
  readonly snapshotNumber?: bigint;
  /**
   * Optional. Generated by eventbus. User should not set it as an input.
   */
  status?:  | "UNKNOWN" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT";
  /**
   * Optional. Task configuration for the IntegrationTemplateVersion. It's
   * optional, but the IntegrationTemplateVersion doesn't do anything without
   * task_configs.
   */
  taskConfigs?: EnterpriseCrmFrontendsEventbusProtoTaskConfig[];
  /**
   * Optional. Contains a graph of tasks that will be executed before putting
   * the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of
   * success or failure, similar to "finally" in code.
   */
  teardown?: EnterpriseCrmEventbusProtoTeardown;
  /**
   * Optional. Parameters that are expected to be passed to the
   * IntegrationTemplateVersion when an event is triggered. This consists of all
   * the parameters that are expected in the IntegrationTemplateVersion
   * execution. This gives the user the ability to provide default values, add
   * information like PII and also provide data types of each parameter.
   */
  templateParameters?: EnterpriseCrmFrontendsEventbusProtoWorkflowParameters;
  /**
   * Optional. Trigger configurations.
   */
  triggerConfigs?: EnterpriseCrmFrontendsEventbusProtoTriggerConfig[];
  /**
   * Output only. Auto-generated.
   */
  readonly updateTime?: Date;
  /**
   * Optional. A user-defined label that annotates an integration version.
   * Typically, this is only set when the integration version is created.
   */
  userLabel?: string;
}

function serializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(data: any): GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion {
  return {
    ...data,
    taskConfigs: data["taskConfigs"] !== undefined ? data["taskConfigs"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(item))) : undefined,
    teardown: data["teardown"] !== undefined ? serializeEnterpriseCrmEventbusProtoTeardown(data["teardown"]) : undefined,
    templateParameters: data["templateParameters"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data["templateParameters"]) : undefined,
    triggerConfigs: data["triggerConfigs"] !== undefined ? data["triggerConfigs"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(data: any): GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    snapshotNumber: data["snapshotNumber"] !== undefined ? BigInt(data["snapshotNumber"]) : undefined,
    taskConfigs: data["taskConfigs"] !== undefined ? data["taskConfigs"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(item))) : undefined,
    teardown: data["teardown"] !== undefined ? deserializeEnterpriseCrmEventbusProtoTeardown(data["teardown"]) : undefined,
    templateParameters: data["templateParameters"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data["templateParameters"]) : undefined,
    triggerConfigs: data["triggerConfigs"] !== undefined ? data["triggerConfigs"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The integration version definition.
 */
export interface GoogleCloudIntegrationsV1alphaIntegrationVersion {
  /**
   * Output only. Auto-generated.
   */
  readonly createTime?: Date;
  /**
   * Optional. Flag to disable database persistence for execution data,
   * including event execution info, execution export info, execution metadata
   * index and execution param index.
   */
  databasePersistencePolicy?:  | "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED" | "DATABASE_PERSISTENCE_DISABLED";
  /**
   * Optional. The integration description.
   */
  description?: string;
  /**
   * Optional. Error Catch Task configuration for the integration. It's
   * optional.
   */
  errorCatcherConfigs?: GoogleCloudIntegrationsV1alphaErrorCatcherConfig[];
  /**
   * Optional. Parameters that are expected to be passed to the integration
   * when an event is triggered. This consists of all the parameters that are
   * expected in the integration execution. This gives the user the ability to
   * provide default values, add information like PII and also provide data
   * types of each parameter.
   */
  integrationParameters?: GoogleCloudIntegrationsV1alphaIntegrationParameter[];
  /**
   * Optional. Parameters that are expected to be passed to the integration
   * when an event is triggered. This consists of all the parameters that are
   * expected in the integration execution. This gives the user the ability to
   * provide default values, add information like PII and also provide data
   * types of each parameter.
   */
  integrationParametersInternal?: EnterpriseCrmFrontendsEventbusProtoWorkflowParameters;
  /**
   * Optional. The last modifier's email address. Generated based on the End
   * User Credentials/LOAS role of the user making the call.
   */
  lastModifierEmail?: string;
  /**
   * Optional. The edit lock holder's email address. Generated based on the End
   * User Credentials/LOAS role of the user making the call.
   */
  lockHolder?: string;
  /**
   * Output only. Auto-generated primary key.
   */
  readonly name?: string;
  /**
   * Optional. The origin that indicates where this integration is coming from.
   */
  origin?:  | "UNSPECIFIED" | "UI" | "PIPER_V2" | "PIPER_V3" | "APPLICATION_IP_PROVISIONING";
  /**
   * Optional. The id of the template which was used to create this
   * integration_version.
   */
  parentTemplateId?: string;
  /**
   * Optional. An increasing sequence that is set when a new snapshot is
   * created. The last created snapshot can be identified by [workflow_name,
   * org_id latest(snapshot_number)]. However, last created snapshot need not be
   * same as the HEAD. So users should always use "HEAD" tag to identify the
   * head.
   */
  snapshotNumber?: bigint;
  /**
   * Output only. User should not set it as an input.
   */
  readonly state?:  | "INTEGRATION_STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT";
  /**
   * Output only. Generated by eventbus. User should not set it as an input.
   */
  readonly status?:  | "UNKNOWN" | "DRAFT" | "ACTIVE" | "ARCHIVED" | "SNAPSHOT";
  /**
   * Optional. Task configuration for the integration. It's optional, but the
   * integration doesn't do anything without task_configs.
   */
  taskConfigs?: GoogleCloudIntegrationsV1alphaTaskConfig[];
  /**
   * Optional. Task configuration for the integration. It's optional, but the
   * integration doesn't do anything without task_configs.
   */
  taskConfigsInternal?: EnterpriseCrmFrontendsEventbusProtoTaskConfig[];
  /**
   * Optional. Contains a graph of tasks that will be executed before putting
   * the event in a terminal state (SUCCEEDED/FAILED/FATAL), regardless of
   * success or failure, similar to "finally" in code.
   */
  teardown?: EnterpriseCrmEventbusProtoTeardown;
  /**
   * Optional. Trigger configurations.
   */
  triggerConfigs?: GoogleCloudIntegrationsV1alphaTriggerConfig[];
  /**
   * Optional. Trigger configurations.
   */
  triggerConfigsInternal?: EnterpriseCrmFrontendsEventbusProtoTriggerConfig[];
  /**
   * Output only. Auto-generated.
   */
  readonly updateTime?: Date;
  /**
   * Optional. A user-defined label that annotates an integration version.
   * Typically, this is only set when the integration version is created.
   */
  userLabel?: string;
}

function serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data: any): GoogleCloudIntegrationsV1alphaIntegrationVersion {
  return {
    ...data,
    integrationParameters: data["integrationParameters"] !== undefined ? data["integrationParameters"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaIntegrationParameter(item))) : undefined,
    integrationParametersInternal: data["integrationParametersInternal"] !== undefined ? serializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data["integrationParametersInternal"]) : undefined,
    snapshotNumber: data["snapshotNumber"] !== undefined ? String(data["snapshotNumber"]) : undefined,
    taskConfigs: data["taskConfigs"] !== undefined ? data["taskConfigs"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaTaskConfig(item))) : undefined,
    taskConfigsInternal: data["taskConfigsInternal"] !== undefined ? data["taskConfigsInternal"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(item))) : undefined,
    teardown: data["teardown"] !== undefined ? serializeEnterpriseCrmEventbusProtoTeardown(data["teardown"]) : undefined,
    triggerConfigs: data["triggerConfigs"] !== undefined ? data["triggerConfigs"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaTriggerConfig(item))) : undefined,
    triggerConfigsInternal: data["triggerConfigsInternal"] !== undefined ? data["triggerConfigsInternal"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data: any): GoogleCloudIntegrationsV1alphaIntegrationVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    integrationParameters: data["integrationParameters"] !== undefined ? data["integrationParameters"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaIntegrationParameter(item))) : undefined,
    integrationParametersInternal: data["integrationParametersInternal"] !== undefined ? deserializeEnterpriseCrmFrontendsEventbusProtoWorkflowParameters(data["integrationParametersInternal"]) : undefined,
    snapshotNumber: data["snapshotNumber"] !== undefined ? BigInt(data["snapshotNumber"]) : undefined,
    taskConfigs: data["taskConfigs"] !== undefined ? data["taskConfigs"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaTaskConfig(item))) : undefined,
    taskConfigsInternal: data["taskConfigsInternal"] !== undefined ? data["taskConfigsInternal"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoTaskConfig(item))) : undefined,
    teardown: data["teardown"] !== undefined ? deserializeEnterpriseCrmEventbusProtoTeardown(data["teardown"]) : undefined,
    triggerConfigs: data["triggerConfigs"] !== undefined ? data["triggerConfigs"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaTriggerConfig(item))) : undefined,
    triggerConfigsInternal: data["triggerConfigsInternal"] !== undefined ? data["triggerConfigsInternal"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoTriggerConfig(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * This message only contains a field of integer array.
 */
export interface GoogleCloudIntegrationsV1alphaIntParameterArray {
  /**
   * Integer array.
   */
  intValues?: bigint[];
}

function serializeGoogleCloudIntegrationsV1alphaIntParameterArray(data: any): GoogleCloudIntegrationsV1alphaIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaIntParameterArray(data: any): GoogleCloudIntegrationsV1alphaIntParameterArray {
  return {
    ...data,
    intValues: data["intValues"] !== undefined ? data["intValues"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Represents JSON web token(JWT), which is a compact, URL-safe means of
 * representing claims to be transferred between two parties, enabling the
 * claims to be digitally signed or integrity protected.
 */
export interface GoogleCloudIntegrationsV1alphaJwt {
  /**
   * The token calculated by the header, payload and signature.
   */
  jwt?: string;
  /**
   * Identifies which algorithm is used to generate the signature.
   */
  jwtHeader?: string;
  /**
   * Contains a set of claims. The JWT specification defines seven Registered
   * Claim Names which are the standard fields commonly included in tokens.
   * Custom claims are usually also included, depending on the purpose of the
   * token.
   */
  jwtPayload?: string;
  /**
   * User's pre-shared secret to sign the token.
   */
  secret?: string;
}

/**
 * Request for lift Suspension
 */
export interface GoogleCloudIntegrationsV1alphaLiftSuspensionRequest {
  /**
   * User passed in suspension result and will be used to control workflow
   * execution branching behavior by setting up corresponnding edge condition
   * with suspension result. For example, if you want to lift the suspension,
   * you can pass "Approved", or if you want to reject the suspension and
   * terminate workfloe execution, you can pass "Rejected" and terminate the
   * workflow execution with configuring the edge condition.
   */
  suspensionResult?: string;
}

/**
 * Response of lift Suspense
 */
export interface GoogleCloudIntegrationsV1alphaLiftSuspensionResponse {
  /**
   * Execution Id that will be returned
   */
  eventExecutionInfoId?: string;
}

/**
 * Request for LinkAppsScriptProject rpc call.
 */
export interface GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectRequest {
  /**
   * The id of the Apps Script project to be linked.
   */
  scriptId?: string;
}

/**
 * Response for LinkAppsScriptProject rpc call.
 */
export interface GoogleCloudIntegrationsV1alphaLinkAppsScriptProjectResponse {
  /**
   * The id of the linked Apps Script project.
   */
  scriptId?: string;
}

/**
 * Response to list AuthConfigs.
 */
export interface GoogleCloudIntegrationsV1alphaListAuthConfigsResponse {
  /**
   * The list of AuthConfigs retrieved.
   */
  authConfigs?: GoogleCloudIntegrationsV1alphaAuthConfig[];
  /**
   * The token used to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudIntegrationsV1alphaListAuthConfigsResponse(data: any): GoogleCloudIntegrationsV1alphaListAuthConfigsResponse {
  return {
    ...data,
    authConfigs: data["authConfigs"] !== undefined ? data["authConfigs"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaAuthConfig(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListAuthConfigsResponse(data: any): GoogleCloudIntegrationsV1alphaListAuthConfigsResponse {
  return {
    ...data,
    authConfigs: data["authConfigs"] !== undefined ? data["authConfigs"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaAuthConfig(item))) : undefined,
  };
}

/**
 * Response to list Certificates.
 */
export interface GoogleCloudIntegrationsV1alphaListCertificatesResponse {
  /**
   * The list of Certificates retrieved.
   */
  certificates?: GoogleCloudIntegrationsV1alphaCertificate[];
  /**
   * The token used to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response containing Connections listed by region.
 */
export interface GoogleCloudIntegrationsV1alphaListConnectionsResponse {
  /**
   * Connections.
   */
  connections?: GoogleCloudConnectorsV1Connection[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudIntegrationsV1alphaListConnectionsResponse(data: any): GoogleCloudIntegrationsV1alphaListConnectionsResponse {
  return {
    ...data,
    connections: data["connections"] !== undefined ? data["connections"].map((item: any) => (serializeGoogleCloudConnectorsV1Connection(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListConnectionsResponse(data: any): GoogleCloudIntegrationsV1alphaListConnectionsResponse {
  return {
    ...data,
    connections: data["connections"] !== undefined ? data["connections"].map((item: any) => (deserializeGoogleCloudConnectorsV1Connection(item))) : undefined,
  };
}

/**
 * Response for listing the integration execution data.
 */
export interface GoogleCloudIntegrationsV1alphaListExecutionsResponse {
  /**
   * Required. The detailed information of requested executions.
   */
  executionInfos?: EnterpriseCrmFrontendsEventbusProtoEventExecutionInfo[];
  /**
   * The detailed information of requested executions
   */
  executions?: GoogleCloudIntegrationsV1alphaExecution[];
  /**
   * The token used to retrieve the next page results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudIntegrationsV1alphaListExecutionsResponse(data: any): GoogleCloudIntegrationsV1alphaListExecutionsResponse {
  return {
    ...data,
    executionInfos: data["executionInfos"] !== undefined ? data["executionInfos"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoEventExecutionInfo(item))) : undefined,
    executions: data["executions"] !== undefined ? data["executions"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaExecution(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListExecutionsResponse(data: any): GoogleCloudIntegrationsV1alphaListExecutionsResponse {
  return {
    ...data,
    executionInfos: data["executionInfos"] !== undefined ? data["executionInfos"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoEventExecutionInfo(item))) : undefined,
    executions: data["executions"] !== undefined ? data["executions"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaExecution(item))) : undefined,
  };
}

/**
 * Response for ListIntegrations.
 */
export interface GoogleCloudIntegrationsV1alphaListIntegrationsResponse {
  /**
   * The integrations which match the request.
   */
  integrations?: GoogleCloudIntegrationsV1alphaIntegration[];
  /**
   * The next page token for the response.
   */
  nextPageToken?: string;
}

/**
 * Response for IntegrationTemplateVersions.ListIntegrationTemplateVersions.
 */
export interface GoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse {
  /**
   * The IntegrationTemplateVersions which match the request.
   */
  integrationTemplateVersions?: GoogleCloudIntegrationsV1alphaIntegrationTemplateVersion[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse(data: any): GoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse {
  return {
    ...data,
    integrationTemplateVersions: data["integrationTemplateVersions"] !== undefined ? data["integrationTemplateVersions"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse(data: any): GoogleCloudIntegrationsV1alphaListIntegrationTemplateVersionsResponse {
  return {
    ...data,
    integrationTemplateVersions: data["integrationTemplateVersions"] !== undefined ? data["integrationTemplateVersions"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaIntegrationTemplateVersion(item))) : undefined,
  };
}

/**
 * Response for ListIntegrationVersions.
 */
export interface GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse {
  /**
   * The integrations which match the request.
   */
  integrationVersions?: GoogleCloudIntegrationsV1alphaIntegrationVersion[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Whether the user has no permission on the version or not.
   */
  noPermission?: boolean;
}

function serializeGoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse(data: any): GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse {
  return {
    ...data,
    integrationVersions: data["integrationVersions"] !== undefined ? data["integrationVersions"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse(data: any): GoogleCloudIntegrationsV1alphaListIntegrationVersionsResponse {
  return {
    ...data,
    integrationVersions: data["integrationVersions"] !== undefined ? data["integrationVersions"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(item))) : undefined,
  };
}

/**
 * Response for listing RuntimeActionSchemas for a specific Connection.
 */
export interface GoogleCloudIntegrationsV1alphaListRuntimeActionSchemasResponse {
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Runtime action schemas.
   */
  runtimeActionSchemas?: GoogleCloudIntegrationsV1alphaRuntimeActionSchema[];
}

/**
 * Response for listing RuntimeEntitySchemas for a specific Connection.
 */
export interface GoogleCloudIntegrationsV1alphaListRuntimeEntitySchemasResponse {
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Runtime entity schemas.
   */
  runtimeEntitySchemas?: GoogleCloudIntegrationsV1alphaRuntimeEntitySchema[];
}

/**
 * Response to list SfdcChannels.
 */
export interface GoogleCloudIntegrationsV1alphaListSfdcChannelsResponse {
  /**
   * The token used to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of SfdcChannels retrieved.
   */
  sfdcChannels?: GoogleCloudIntegrationsV1alphaSfdcChannel[];
}

/**
 * Response to list SfdcInstances.
 */
export interface GoogleCloudIntegrationsV1alphaListSfdcInstancesResponse {
  /**
   * The token used to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of SfdcInstances retrieved.
   */
  sfdcInstances?: GoogleCloudIntegrationsV1alphaSfdcInstance[];
}

/**
 * Response for Suspensions.ListSuspensions.
 */
export interface GoogleCloudIntegrationsV1alphaListSuspensionsResponse {
  /**
   * Token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The suspensions for the relevant execution which the caller has
   * permissions to view and resolve.
   */
  suspensions?: GoogleCloudIntegrationsV1alphaSuspension[];
}

function serializeGoogleCloudIntegrationsV1alphaListSuspensionsResponse(data: any): GoogleCloudIntegrationsV1alphaListSuspensionsResponse {
  return {
    ...data,
    suspensions: data["suspensions"] !== undefined ? data["suspensions"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaSuspension(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaListSuspensionsResponse(data: any): GoogleCloudIntegrationsV1alphaListSuspensionsResponse {
  return {
    ...data,
    suspensions: data["suspensions"] !== undefined ? data["suspensions"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaSuspension(item))) : undefined,
  };
}

/**
 * The task that is next in line to be executed, if the condition specified
 * evaluated to true.
 */
export interface GoogleCloudIntegrationsV1alphaNextTask {
  /**
   * Standard filter expression for this task to become an eligible next task.
   */
  condition?: string;
  /**
   * User-provided description intended to give additional business context
   * about the task.
   */
  description?: string;
  /**
   * User-provided label that is attached to this edge in the UI.
   */
  displayName?: string;
  /**
   * ID of the next task.
   */
  taskConfigId?: string;
  /**
   * Task number of the next task.
   */
  taskId?: string;
}

/**
 * The OAuth Type where the client sends request with the client id and
 * requested scopes to auth endpoint. User sees a consent screen and auth code
 * is received at specified redirect url afterwards. The auth code is then
 * combined with the client id and secret and sent to the token endpoint in
 * exchange for the access and refresh token. The refresh token can be used to
 * fetch new access tokens.
 */
export interface GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode {
  /**
   * The access token received from the token endpoint.
   */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /**
   * Indicates if the user has opted in Google Reauth Policy. If opted in, the
   * refresh token will be valid for 20 hours, after which time users must
   * re-authenticate in order to obtain a new one.
   */
  applyReauthPolicy?: boolean;
  /**
   * The Auth Code that is used to initially retrieve the access token.
   */
  authCode?: string;
  /**
   * The auth url endpoint to send the auth code request to.
   */
  authEndpoint?: string;
  /**
   * The auth parameters sent along with the auth code request.
   */
  authParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /**
   * The client's id.
   */
  clientId?: string;
  /**
   * The client's secret.
   */
  clientSecret?: string;
  /**
   * Represent how to pass parameters to fetch access token
   */
  requestType?:  | "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER";
  /**
   * A space-delimited list of requested scope permissions.
   */
  scope?: string;
  /**
   * The token url endpoint to send the token request to.
   */
  tokenEndpoint?: string;
  /**
   * The token parameters sent along with the token request.
   */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
}

function serializeGoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode(data: any): GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    authParams: data["authParams"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMap(data["authParams"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode(data: any): GoogleCloudIntegrationsV1alphaOAuth2AuthorizationCode {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    authParams: data["authParams"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMap(data["authParams"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

/**
 * For client credentials grant, the client sends a POST request with
 * grant_type as 'client_credentials' to the authorization server. The
 * authorization server will respond with a JSON object containing the access
 * token.
 */
export interface GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials {
  /**
   * Access token fetched from the authorization server.
   */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /**
   * The client's ID.
   */
  clientId?: string;
  /**
   * The client's secret.
   */
  clientSecret?: string;
  /**
   * Represent how to pass parameters to fetch access token
   */
  requestType?:  | "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER";
  /**
   * A space-delimited list of requested scope permissions.
   */
  scope?: string;
  /**
   * The token endpoint is used by the client to obtain an access token by
   * presenting its authorization grant or refresh token.
   */
  tokenEndpoint?: string;
  /**
   * Token parameters for the auth request.
   */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
}

function serializeGoogleCloudIntegrationsV1alphaOAuth2ClientCredentials(data: any): GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaOAuth2ClientCredentials(data: any): GoogleCloudIntegrationsV1alphaOAuth2ClientCredentials {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

/**
 * For resource owner credentials grant, the client will ask the user for their
 * authorization credentials (ususally a username and password) and send a POST
 * request to the authorization server. The authorization server will respond
 * with a JSON object containing the access token.
 */
export interface GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials {
  /**
   * Access token fetched from the authorization server.
   */
  accessToken?: GoogleCloudIntegrationsV1alphaAccessToken;
  /**
   * The client's ID.
   */
  clientId?: string;
  /**
   * The client's secret.
   */
  clientSecret?: string;
  /**
   * The user's password.
   */
  password?: string;
  /**
   * Represent how to pass parameters to fetch access token
   */
  requestType?:  | "REQUEST_TYPE_UNSPECIFIED" | "REQUEST_BODY" | "QUERY_PARAMETERS" | "ENCODED_HEADER";
  /**
   * A space-delimited list of requested scope permissions.
   */
  scope?: string;
  /**
   * The token endpoint is used by the client to obtain an access token by
   * presenting its authorization grant or refresh token.
   */
  tokenEndpoint?: string;
  /**
   * Token parameters for the auth request.
   */
  tokenParams?: GoogleCloudIntegrationsV1alphaParameterMap;
  /**
   * The user's username.
   */
  username?: string;
}

function serializeGoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials(data: any): GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials(data: any): GoogleCloudIntegrationsV1alphaOAuth2ResourceOwnerCredentials {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaAccessToken(data["accessToken"]) : undefined,
    tokenParams: data["tokenParams"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMap(data["tokenParams"]) : undefined,
  };
}

/**
 * OIDC Token
 */
export interface GoogleCloudIntegrationsV1alphaOidcToken {
  /**
   * Audience to be used when generating OIDC token. The audience claim
   * identifies the recipients that the JWT is intended for.
   */
  audience?: string;
  /**
   * The service account email to be used as the identity for the token.
   */
  serviceAccountEmail?: string;
  /**
   * ID token obtained for the service account
   */
  token?: string;
  /**
   * The approximate time until the token retrieved is valid.
   */
  tokenExpireTime?: Date;
}

function serializeGoogleCloudIntegrationsV1alphaOidcToken(data: any): GoogleCloudIntegrationsV1alphaOidcToken {
  return {
    ...data,
    tokenExpireTime: data["tokenExpireTime"] !== undefined ? data["tokenExpireTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaOidcToken(data: any): GoogleCloudIntegrationsV1alphaOidcToken {
  return {
    ...data,
    tokenExpireTime: data["tokenExpireTime"] !== undefined ? new Date(data["tokenExpireTime"]) : undefined,
  };
}

/**
 * A generic multi-map that holds key value pairs. They keys and values can be
 * of any type, unless specified.
 */
export interface GoogleCloudIntegrationsV1alphaParameterMap {
  /**
   * A list of parameter map entries.
   */
  entries?: GoogleCloudIntegrationsV1alphaParameterMapEntry[];
  /**
   * Option to specify key type for all entries of the map. If provided then
   * field types for all entries must conform to this.
   */
  keyType?:  | "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY";
  /**
   * Option to specify value type for all entries of the map. If provided then
   * field types for all entries must conform to this.
   */
  valueType?:  | "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED" | "STRING_VALUE" | "INT_VALUE" | "DOUBLE_VALUE" | "BOOLEAN_VALUE" | "STRING_ARRAY" | "INT_ARRAY" | "DOUBLE_ARRAY" | "BOOLEAN_ARRAY" | "JSON_VALUE" | "PROTO_VALUE" | "PROTO_ARRAY";
}

function serializeGoogleCloudIntegrationsV1alphaParameterMap(data: any): GoogleCloudIntegrationsV1alphaParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaParameterMapEntry(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaParameterMap(data: any): GoogleCloudIntegrationsV1alphaParameterMap {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaParameterMapEntry(item))) : undefined,
  };
}

/**
 * Entry is a pair of key and value.
 */
export interface GoogleCloudIntegrationsV1alphaParameterMapEntry {
  /**
   * Key of the map entry.
   */
  key?: GoogleCloudIntegrationsV1alphaParameterMapField;
  /**
   * Value of the map entry.
   */
  value?: GoogleCloudIntegrationsV1alphaParameterMapField;
}

function serializeGoogleCloudIntegrationsV1alphaParameterMapEntry(data: any): GoogleCloudIntegrationsV1alphaParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaParameterMapField(data["value"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaParameterMapEntry(data: any): GoogleCloudIntegrationsV1alphaParameterMapEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMapField(data["key"]) : undefined,
    value: data["value"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaParameterMapField(data["value"]) : undefined,
  };
}

/**
 * Field represents either the key or value in an entry.
 */
export interface GoogleCloudIntegrationsV1alphaParameterMapField {
  /**
   * Passing a literal value.
   */
  literalValue?: GoogleCloudIntegrationsV1alphaValueType;
  /**
   * Referencing one of the Integration variables.
   */
  referenceKey?: string;
}

function serializeGoogleCloudIntegrationsV1alphaParameterMapField(data: any): GoogleCloudIntegrationsV1alphaParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaValueType(data["literalValue"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaParameterMapField(data: any): GoogleCloudIntegrationsV1alphaParameterMapField {
  return {
    ...data,
    literalValue: data["literalValue"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaValueType(data["literalValue"]) : undefined,
  };
}

/**
 * Request for PublishIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaPublishIntegrationVersionRequest {
}

/**
 * Response for PublishIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaPublishIntegrationVersionResponse {
}

/**
 * Request for [Suspensions.ResolveSuspensions].
 */
export interface GoogleCloudIntegrationsV1alphaResolveSuspensionRequest {
  /**
   * Suspension, containing the event_execution_info_id, task_id, and state to
   * set on the corresponding suspension record.
   */
  suspension?: GoogleCloudIntegrationsV1alphaSuspension;
}

function serializeGoogleCloudIntegrationsV1alphaResolveSuspensionRequest(data: any): GoogleCloudIntegrationsV1alphaResolveSuspensionRequest {
  return {
    ...data,
    suspension: data["suspension"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaSuspension(data["suspension"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaResolveSuspensionRequest(data: any): GoogleCloudIntegrationsV1alphaResolveSuspensionRequest {
  return {
    ...data,
    suspension: data["suspension"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaSuspension(data["suspension"]) : undefined,
  };
}

/**
 * Response for Suspensions.ResolveSuspensions.
 */
export interface GoogleCloudIntegrationsV1alphaResolveSuspensionResponse {
}

/**
 * Metadata of an action, including schemas for its inputs and outputs.
 */
export interface GoogleCloudIntegrationsV1alphaRuntimeActionSchema {
  /**
   * Name of the action.
   */
  action?: string;
  /**
   * Input parameter schema for the action.
   */
  inputSchema?: string;
  /**
   * Output parameter schema for the action.
   */
  outputSchema?: string;
}

/**
 * Metadata of an entity, including a schema for its properties.
 */
export interface GoogleCloudIntegrationsV1alphaRuntimeEntitySchema {
  /**
   * The above schema, but for an array of the associated entity.
   */
  arrayFieldSchema?: string;
  /**
   * Name of the entity.
   */
  entity?: string;
  /**
   * List of fields in the entity.
   */
  fieldSchema?: string;
}

/**
 * The request for scheduling an integration.
 */
export interface GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest {
  /**
   * Optional. Input parameters used by integration execution.
   */
  inputParameters?: {
    [key: string]: GoogleCloudIntegrationsV1alphaValueType
  };
  /**
   * Parameters are a part of Event and can be used to communicate between
   * different tasks that are part of the same integration execution.
   */
  parameterEntries?: EnterpriseCrmFrontendsEventbusProtoParameterEntry[];
  /**
   * Passed in as parameters to each integration execution.
   */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /**
   * This is used to de-dup incoming request: if the duplicate request was
   * detected, the response from the previous execution is returned.
   */
  requestId?: string;
  /**
   * The time that the integration should be executed. If the time is less or
   * equal to the current time, the integration is executed immediately.
   */
  scheduleTime?: Date;
  /**
   * Matched against all {@link TriggerConfig}s across all integrations. i.e.
   * TriggerConfig.trigger_id.equals(trigger_id)
   */
  triggerId?: string;
}

function serializeGoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest(data: any): GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest {
  return {
    ...data,
    inputParameters: data["inputParameters"] !== undefined ? Object.fromEntries(Object.entries(data["inputParameters"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (serializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? data["scheduleTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest(data: any): GoogleCloudIntegrationsV1alphaScheduleIntegrationsRequest {
  return {
    ...data,
    inputParameters: data["inputParameters"] !== undefined ? Object.fromEntries(Object.entries(data["inputParameters"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaValueType(v)]))) : undefined,
    parameterEntries: data["parameterEntries"] !== undefined ? data["parameterEntries"].map((item: any) => (deserializeEnterpriseCrmFrontendsEventbusProtoParameterEntry(item))) : undefined,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? new Date(data["scheduleTime"]) : undefined,
  };
}

/**
 * The response for executing an integration.
 */
export interface GoogleCloudIntegrationsV1alphaScheduleIntegrationsResponse {
  /**
   * The execution info id for the executed integrations.
   */
  executionInfoIds?: string[];
}

/**
 * Represents the service account which can be used to generate access token
 * for authenticating the service call.
 */
export interface GoogleCloudIntegrationsV1alphaServiceAccountCredentials {
  /**
   * A space-delimited list of requested scope permissions.
   */
  scope?: string;
  /**
   * Name of the service account that has the permission to make the request.
   */
  serviceAccount?: string;
}

/**
 * The SfdcChannel that points to a CDC or Platform Event Channel.
 */
export interface GoogleCloudIntegrationsV1alphaSfdcChannel {
  /**
   * The Channel topic defined by salesforce once an channel is opened
   */
  channelTopic?: string;
  /**
   * Output only. Time when the channel is created
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the channel was deleted. Empty if not deleted.
   */
  readonly deleteTime?: Date;
  /**
   * The description for this channel
   */
  description?: string;
  /**
   * Client level unique name/alias to easily reference a channel.
   */
  displayName?: string;
  /**
   * Indicated if a channel has any active integrations referencing it. Set to
   * false when the channel is created, and set to true if there is any
   * integration published with the channel configured in it.
   */
  isActive?: boolean;
  /**
   * Last sfdc messsage replay id for channel
   */
  lastReplayId?: string;
  /**
   * Resource name of the SFDC channel
   * projects/{project}/locations/{location}/sfdcInstances/{sfdc_instance}/sfdcChannels/{sfdc_channel}.
   */
  name?: string;
  /**
   * Output only. Time when the channel was last updated
   */
  readonly updateTime?: Date;
}

/**
 * The SfdcInstance resource use to hold channels and connection config data.
 */
export interface GoogleCloudIntegrationsV1alphaSfdcInstance {
  /**
   * A list of AuthConfigs that can be tried to open the channel to SFDC
   */
  authConfigId?: string[];
  /**
   * Output only. Time when the instance is created
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the instance was deleted. Empty if not deleted.
   */
  readonly deleteTime?: Date;
  /**
   * A description of the sfdc instance.
   */
  description?: string;
  /**
   * User selected unique name/alias to easily reference an instance.
   */
  displayName?: string;
  /**
   * Resource name of the SFDC instance
   * projects/{project}/locations/{location}/sfdcInstances/{sfdcInstance}.
   */
  name?: string;
  /**
   * URL used for API calls after authentication (the login authority is
   * configured within the referenced AuthConfig).
   */
  serviceAuthority?: string;
  /**
   * The SFDC Org Id. This is defined in salesforce.
   */
  sfdcOrgId?: string;
  /**
   * Output only. Time when the instance was last updated
   */
  readonly updateTime?: Date;
}

/**
 * This message only contains a field of string array.
 */
export interface GoogleCloudIntegrationsV1alphaStringParameterArray {
  /**
   * String array.
   */
  stringValues?: string[];
}

/**
 * Policy that dictates the behavior for the task after it completes
 * successfully.
 */
export interface GoogleCloudIntegrationsV1alphaSuccessPolicy {
  /**
   * State to which the execution snapshot status will be set if the task
   * succeeds.
   */
  finalState?:  | "FINAL_STATE_UNSPECIFIED" | "SUCCEEDED" | "SUSPENDED";
}

/**
 * A record representing a suspension.
 */
export interface GoogleCloudIntegrationsV1alphaSuspension {
  /**
   * Controls the notifications and approval permissions for this suspension.
   */
  approvalConfig?: GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig;
  /**
   * Metadata pertaining to the resolution of this suspension.
   */
  audit?: GoogleCloudIntegrationsV1alphaSuspensionAudit;
  /**
   * Output only. Auto-generated.
   */
  readonly createTime?: Date;
  /**
   * Required. ID of the associated execution.
   */
  eventExecutionInfoId?: string;
  /**
   * Required. The name of the originating integration.
   */
  integration?: string;
  /**
   * Output only. Auto-generated.
   */
  readonly lastModifyTime?: Date;
  /**
   * Resource name for suspensions suspension/{suspension_id}
   */
  name?: string;
  /**
   * Required. State of this suspension, indicating what action a resolver has
   * taken.
   */
  state?:  | "RESOLUTION_STATE_UNSPECIFIED" | "PENDING" | "REJECTED" | "LIFTED";
  /**
   * Controls the notifications and resolver permissions for this suspension.
   */
  suspensionConfig?: EnterpriseCrmEventbusProtoSuspensionConfig;
  /**
   * Required. Task id of the associated SuspensionTask.
   */
  taskId?: string;
}

function serializeGoogleCloudIntegrationsV1alphaSuspension(data: any): GoogleCloudIntegrationsV1alphaSuspension {
  return {
    ...data,
    approvalConfig: data["approvalConfig"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaSuspensionApprovalConfig(data["approvalConfig"]) : undefined,
    audit: data["audit"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaSuspensionAudit(data["audit"]) : undefined,
    suspensionConfig: data["suspensionConfig"] !== undefined ? serializeEnterpriseCrmEventbusProtoSuspensionConfig(data["suspensionConfig"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaSuspension(data: any): GoogleCloudIntegrationsV1alphaSuspension {
  return {
    ...data,
    approvalConfig: data["approvalConfig"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaSuspensionApprovalConfig(data["approvalConfig"]) : undefined,
    audit: data["audit"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaSuspensionAudit(data["audit"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastModifyTime: data["lastModifyTime"] !== undefined ? new Date(data["lastModifyTime"]) : undefined,
    suspensionConfig: data["suspensionConfig"] !== undefined ? deserializeEnterpriseCrmEventbusProtoSuspensionConfig(data["suspensionConfig"]) : undefined,
  };
}

/**
 * Configurations for approving the Suspension.
 */
export interface GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig {
  /**
   * Information to provide for recipients.
   */
  customMessage?: string;
  /**
   * Email addresses to send approval request to.
   */
  emailAddresses?: string[];
  /**
   * Indicates the next steps when no external actions happen on the
   * suspension.
   */
  expiration?: GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration;
}

function serializeGoogleCloudIntegrationsV1alphaSuspensionApprovalConfig(data: any): GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration(data["expiration"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaSuspensionApprovalConfig(data: any): GoogleCloudIntegrationsV1alphaSuspensionApprovalConfig {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration(data["expiration"]) : undefined,
  };
}

/**
 * Expiration configs for the approval request.
 */
export interface GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration {
  /**
   * Output only. Time after which the suspension expires, if no action taken.
   */
  readonly expireTime?: Date;
  /**
   * Whether the suspension will be REJECTED or LIFTED upon expiration.
   * REJECTED is the default behavior.
   */
  liftWhenExpired?: boolean;
  /**
   * Time after the previous suspension action reminder, if any, is sent using
   * the selected notification option, for a suspension which is still
   * PENDING_UNSPECIFIED.
   */
  remindTime?: Date;
}

function serializeGoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration(data: any): GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration {
  return {
    ...data,
    remindTime: data["remindTime"] !== undefined ? data["remindTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration(data: any): GoogleCloudIntegrationsV1alphaSuspensionApprovalExpiration {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    remindTime: data["remindTime"] !== undefined ? new Date(data["remindTime"]) : undefined,
  };
}

/**
 * Contains when and by whom the suspension was resolved.
 */
export interface GoogleCloudIntegrationsV1alphaSuspensionAudit {
  /**
   * Email address of the person who resolved this suspension.
   */
  resolver?: string;
  /**
   * Time at which this suspension was resolved.
   */
  resolveTime?: Date;
}

function serializeGoogleCloudIntegrationsV1alphaSuspensionAudit(data: any): GoogleCloudIntegrationsV1alphaSuspensionAudit {
  return {
    ...data,
    resolveTime: data["resolveTime"] !== undefined ? data["resolveTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaSuspensionAudit(data: any): GoogleCloudIntegrationsV1alphaSuspensionAudit {
  return {
    ...data,
    resolveTime: data["resolveTime"] !== undefined ? new Date(data["resolveTime"]) : undefined,
  };
}

/**
 * Request for TakeoverEditLock.
 */
export interface GoogleCloudIntegrationsV1alphaTakeoverEditLockRequest {
}

/**
 * Response for TakeoverEditLock.
 */
export interface GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse {
  /**
   * Version after the lock is acquired by the new user.
   */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

function serializeGoogleCloudIntegrationsV1alphaTakeoverEditLockResponse(data: any): GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse {
  return {
    ...data,
    integrationVersion: data["integrationVersion"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data["integrationVersion"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaTakeoverEditLockResponse(data: any): GoogleCloudIntegrationsV1alphaTakeoverEditLockResponse {
  return {
    ...data,
    integrationVersion: data["integrationVersion"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data["integrationVersion"]) : undefined,
  };
}

/**
 * The task configuration details. This is not the implementation of Task.
 * There might be multiple TaskConfigs for the same Task.
 */
export interface GoogleCloudIntegrationsV1alphaTaskConfig {
  /**
   * Optional. User-provided description intended to give additional business
   * context about the task.
   */
  description?: string;
  /**
   * Optional. User-provided label that is attached to this TaskConfig in the
   * UI.
   */
  displayName?: string;
  /**
   * Optional. Optional Error catcher id of the error catch flow which will be
   * executed when execution error happens in the task
   */
  errorCatcherId?: string;
  /**
   * Optional. External task type of the task
   */
  externalTaskType?:  | "EXTERNAL_TASK_TYPE_UNSPECIFIED" | "NORMAL_TASK" | "ERROR_TASK";
  /**
   * Optional. Determines the number of times the task will be retried on
   * failure and with what retry strategy. This is applicable for asynchronous
   * calls to Eventbus alone (Post To Queue, Schedule etc.).
   */
  failurePolicy?: GoogleCloudIntegrationsV1alphaFailurePolicy;
  /**
   * Optional. If set, overrides the option configured in the Task
   * implementation class.
   */
  jsonValidationOption?:  | "JSON_VALIDATION_OPTION_UNSPECIFIED" | "SKIP" | "PRE_EXECUTION" | "POST_EXECUTION" | "PRE_POST_EXECUTION";
  /**
   * Optional. The set of tasks that are next in line to be executed as per the
   * execution graph defined for the parent event, specified by
   * `event_config_id`. Each of these next tasks are executed only if the
   * condition associated with them evaluates to true.
   */
  nextTasks?: GoogleCloudIntegrationsV1alphaNextTask[];
  /**
   * Optional. The policy dictating the execution of the next set of tasks for
   * the current task.
   */
  nextTasksExecutionPolicy?:  | "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH";
  /**
   * Optional. The customized parameters the user can pass to this task.
   */
  parameters?: {
    [key: string]: GoogleCloudIntegrationsV1alphaEventParameter
  };
  /**
   * Optional. Informs the front-end application where to draw this error
   * catcher config on the UI.
   */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
  /**
   * Optional. Determines what action to take upon successful task completion.
   */
  successPolicy?: GoogleCloudIntegrationsV1alphaSuccessPolicy;
  /**
   * Optional. Determines the number of times the task will be retried on
   * failure and with what retry strategy. This is applicable for synchronous
   * calls to Eventbus alone (Post).
   */
  synchronousCallFailurePolicy?: GoogleCloudIntegrationsV1alphaFailurePolicy;
  /**
   * Optional. The name for the task.
   */
  task?: string;
  /**
   * Optional. The policy dictating the execution strategy of this task.
   */
  taskExecutionStrategy?:  | "TASK_EXECUTION_STRATEGY_UNSPECIFIED" | "WHEN_ALL_SUCCEED" | "WHEN_ANY_SUCCEED" | "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED";
  /**
   * Required. The identifier of this task within its parent event config,
   * specified by the client. This should be unique among all the tasks belong
   * to the same event config. We use this field as the identifier to find next
   * tasks (via field `next_tasks.task_id`).
   */
  taskId?: string;
  /**
   * Optional. Used to define task-template name if task is of type
   * task-template
   */
  taskTemplate?: string;
}

function serializeGoogleCloudIntegrationsV1alphaTaskConfig(data: any): GoogleCloudIntegrationsV1alphaTaskConfig {
  return {
    ...data,
    failurePolicy: data["failurePolicy"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaFailurePolicy(data["failurePolicy"]) : undefined,
    parameters: data["parameters"] !== undefined ? Object.fromEntries(Object.entries(data["parameters"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudIntegrationsV1alphaEventParameter(v)]))) : undefined,
    synchronousCallFailurePolicy: data["synchronousCallFailurePolicy"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaFailurePolicy(data["synchronousCallFailurePolicy"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaTaskConfig(data: any): GoogleCloudIntegrationsV1alphaTaskConfig {
  return {
    ...data,
    failurePolicy: data["failurePolicy"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaFailurePolicy(data["failurePolicy"]) : undefined,
    parameters: data["parameters"] !== undefined ? Object.fromEntries(Object.entries(data["parameters"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudIntegrationsV1alphaEventParameter(v)]))) : undefined,
    synchronousCallFailurePolicy: data["synchronousCallFailurePolicy"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaFailurePolicy(data["synchronousCallFailurePolicy"]) : undefined,
  };
}

/**
 * Contains the details of the execution of this task.
 */
export interface GoogleCloudIntegrationsV1alphaTaskExecutionDetails {
  /**
   * Status for the current task execution attempt.
   */
  taskAttemptStats?: GoogleCloudIntegrationsV1alphaAttemptStats[];
  /**
   * The execution state of this task.
   */
  taskExecutionState?:  | "TASK_EXECUTION_STATE_UNSPECIFIED" | "PENDING_EXECUTION" | "IN_PROCESS" | "SUCCEED" | "FAILED" | "FATAL" | "RETRY_ON_HOLD" | "SKIPPED" | "CANCELLED" | "PENDING_ROLLBACK" | "ROLLBACK_IN_PROCESS" | "ROLLEDBACK" | "SUSPENDED";
  /**
   * Pointer to the task config it used for execution.
   */
  taskNumber?: string;
}

function serializeGoogleCloudIntegrationsV1alphaTaskExecutionDetails(data: any): GoogleCloudIntegrationsV1alphaTaskExecutionDetails {
  return {
    ...data,
    taskAttemptStats: data["taskAttemptStats"] !== undefined ? data["taskAttemptStats"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaAttemptStats(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaTaskExecutionDetails(data: any): GoogleCloudIntegrationsV1alphaTaskExecutionDetails {
  return {
    ...data,
    taskAttemptStats: data["taskAttemptStats"] !== undefined ? data["taskAttemptStats"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaAttemptStats(item))) : undefined,
  };
}

/**
 * Configuration detail of a trigger.
 */
export interface GoogleCloudIntegrationsV1alphaTriggerConfig {
  /**
   * Optional. An alert threshold configuration for the [trigger + client +
   * integration] tuple. If these values are not specified in the trigger
   * config, default values will be populated by the system. Note that there
   * must be exactly one alert threshold configured per [client + trigger +
   * integration] when published.
   */
  alertConfig?: GoogleCloudIntegrationsV1alphaIntegrationAlertConfig[];
  /**
   * Optional. Cloud Scheduler Trigger related metadata
   */
  cloudSchedulerConfig?: GoogleCloudIntegrationsV1alphaCloudSchedulerConfig;
  /**
   * Optional. User-provided description intended to give additional business
   * context about the task.
   */
  description?: string;
  /**
   * Optional. Optional Error catcher id of the error catch flow which will be
   * executed when execution error happens in the task
   */
  errorCatcherId?: string;
  /**
   * Optional. The user created label for a particular trigger.
   */
  label?: string;
  /**
   * Optional. Dictates how next tasks will be executed.
   */
  nextTasksExecutionPolicy?:  | "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED" | "RUN_ALL_MATCH" | "RUN_FIRST_MATCH";
  /**
   * Optional. Informs the front-end application where to draw this error
   * catcher config on the UI.
   */
  position?: GoogleCloudIntegrationsV1alphaCoordinate;
  /**
   * Optional. Configurable properties of the trigger, not to be confused with
   * integration parameters. E.g. "name" is a property for API triggers and
   * "subscription" is a property for Pub/sub triggers.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Optional. Set of tasks numbers from where the integration execution is
   * started by this trigger. If this is empty, then integration is executed
   * with default start tasks. In the list of start tasks, none of two tasks can
   * have direct ancestor-descendant relationships (i.e. in a same integration
   * execution graph).
   */
  startTasks?: GoogleCloudIntegrationsV1alphaNextTask[];
  /**
   * Optional. The backend trigger ID.
   */
  triggerId?: string;
  /**
   * Required. A number to uniquely identify each trigger config within the
   * integration on UI.
   */
  triggerNumber?: string;
  /**
   * Optional. Type of trigger
   */
  triggerType?:  | "TRIGGER_TYPE_UNSPECIFIED" | "CRON" | "API" | "SFDC_CHANNEL" | "CLOUD_PUBSUB_EXTERNAL" | "SFDC_CDC_CHANNEL" | "CLOUD_SCHEDULER";
}

function serializeGoogleCloudIntegrationsV1alphaTriggerConfig(data: any): GoogleCloudIntegrationsV1alphaTriggerConfig {
  return {
    ...data,
    alertConfig: data["alertConfig"] !== undefined ? data["alertConfig"].map((item: any) => (serializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfig(item))) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaTriggerConfig(data: any): GoogleCloudIntegrationsV1alphaTriggerConfig {
  return {
    ...data,
    alertConfig: data["alertConfig"] !== undefined ? data["alertConfig"].map((item: any) => (deserializeGoogleCloudIntegrationsV1alphaIntegrationAlertConfig(item))) : undefined,
  };
}

/**
 * Request for UnpublishIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaUnpublishIntegrationVersionRequest {
}

/**
 * Request for UploadIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaUploadIntegrationVersionRequest {
  /**
   * The textproto of the integration_version.
   */
  content?: string;
  /**
   * File format for upload request.
   */
  fileFormat?:  | "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML";
}

/**
 * Response for UploadIntegrationVersion.
 */
export interface GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse {
  /**
   * The uploaded integration.
   */
  integrationVersion?: GoogleCloudIntegrationsV1alphaIntegrationVersion;
}

function serializeGoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse(data: any): GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse {
  return {
    ...data,
    integrationVersion: data["integrationVersion"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data["integrationVersion"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse(data: any): GoogleCloudIntegrationsV1alphaUploadIntegrationVersionResponse {
  return {
    ...data,
    integrationVersion: data["integrationVersion"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaIntegrationVersion(data["integrationVersion"]) : undefined,
  };
}

/**
 * Username and password pair.
 */
export interface GoogleCloudIntegrationsV1alphaUsernameAndPassword {
  /**
   * Password to be used
   */
  password?: string;
  /**
   * Username to be used
   */
  username?: string;
}

/**
 * The type of the parameter.
 */
export interface GoogleCloudIntegrationsV1alphaValueType {
  /**
   * Boolean Array.
   */
  booleanArray?: GoogleCloudIntegrationsV1alphaBooleanParameterArray;
  /**
   * Boolean.
   */
  booleanValue?: boolean;
  /**
   * Double Number Array.
   */
  doubleArray?: GoogleCloudIntegrationsV1alphaDoubleParameterArray;
  /**
   * Double Number.
   */
  doubleValue?: number;
  /**
   * Integer Array.
   */
  intArray?: GoogleCloudIntegrationsV1alphaIntParameterArray;
  /**
   * Integer.
   */
  intValue?: bigint;
  /**
   * Json.
   */
  jsonValue?: string;
  /**
   * String Array.
   */
  stringArray?: GoogleCloudIntegrationsV1alphaStringParameterArray;
  /**
   * String.
   */
  stringValue?: string;
}

function serializeGoogleCloudIntegrationsV1alphaValueType(data: any): GoogleCloudIntegrationsV1alphaValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? serializeGoogleCloudIntegrationsV1alphaIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
  };
}

function deserializeGoogleCloudIntegrationsV1alphaValueType(data: any): GoogleCloudIntegrationsV1alphaValueType {
  return {
    ...data,
    intArray: data["intArray"] !== undefined ? deserializeGoogleCloudIntegrationsV1alphaIntParameterArray(data["intArray"]) : undefined,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
  };
}

/**
 * Use this request to post all workflows associated with a given trigger id.
 * Next available id: 10
 */
export interface GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest {
  /**
   * Optional. If the client id is provided, then the combination of trigger id
   * and client id is matched across all the workflows. If the client id is not
   * provided, then workflows with matching trigger id are executed for each
   * client id in the {@link TriggerConfig}. For Api Trigger, the client id is
   * required and will be validated against the allowed clients.
   */
  clientId?: string;
  /**
   * Optional. Flag to determine whether clients would suppress a warning when
   * no ACTIVE workflows are not found. If this flag is set to be true, an error
   * will not be thrown if the requested trigger_id or client_id is not found in
   * any ACTIVE workflow. Otherwise, the error is always thrown. The flag is set
   * to be false by default.
   */
  ignoreErrorIfNoActiveWorkflow?: boolean;
  /**
   * Passed in as parameters to each workflow execution. Optional.
   */
  parameters?: EnterpriseCrmEventbusProtoEventParameters;
  /**
   * The request priority this request should be processed at. For internal
   * users:
   */
  priority?:  | "UNSPCIFIED" | "SHEDDABLE" | "SHEDDABLE_PLUS" | "CRITICAL" | "CRITICAL_PLUS";
  /**
   * Optional. This is used to de-dup incoming request: if the duplicate
   * request was detected, the response from the previous execution is returned.
   * Must have no more than 36 characters and contain only alphanumeric
   * characters and hyphens.
   */
  requestId?: string;
  /**
   * Optional. Time in milliseconds since epoch when the given event would be
   * scheduled.
   */
  scheduledTime?: bigint;
  /**
   * Optional. Sets test mode in {@link
   * enterprise/crm/eventbus/event_message.proto}.
   */
  testMode?: boolean;
  /**
   * Matched against all {@link TriggerConfig}s across all workflows. i.e.
   * TriggerConfig.trigger_id.equals(trigger_id) Required.
   */
  triggerId?: string;
  /**
   * Optional. If provided, the workflow_name is used to filter all the matched
   * workflows having same trigger_id+client_id. A combination of trigger_id,
   * client_id and workflow_name identifies a unique workflow.
   */
  workflowName?: string;
}

function serializeGoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest(data: any): GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? serializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? String(data["scheduledTime"]) : undefined,
  };
}

function deserializeGoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest(data: any): GoogleInternalCloudCrmEventbusV3PostToQueueWithTriggerIdRequest {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? deserializeEnterpriseCrmEventbusProtoEventParameters(data["parameters"]) : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? BigInt(data["scheduledTime"]) : undefined,
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
 * Additional options for Integrations#projectsLocationsAuthConfigsCreate.
 */
export interface ProjectsLocationsAuthConfigsCreateOptions {
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.encryptedPrivateKey"]?: string;
  /**
   * 'passphrase' should be left unset if private key is not encrypted. Note
   * that 'passphrase' is not the password for web server, but an extra layer of
   * security to protected private key.
   */
  ["clientCertificate.passphrase"]?: string;
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.sslCertificate"]?: string;
}

/**
 * Additional options for Integrations#projectsLocationsAuthConfigsList.
 */
export interface ProjectsLocationsAuthConfigsListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * AuthConfig's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAuthConfigsListOptions(data: any): ProjectsLocationsAuthConfigsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsAuthConfigsListOptions(data: any): ProjectsLocationsAuthConfigsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for Integrations#projectsLocationsAuthConfigsPatch.
 */
export interface ProjectsLocationsAuthConfigsPatchOptions {
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.encryptedPrivateKey"]?: string;
  /**
   * 'passphrase' should be left unset if private key is not encrypted. Note
   * that 'passphrase' is not the password for web server, but an extra layer of
   * security to protected private key.
   */
  ["clientCertificate.passphrase"]?: string;
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.sslCertificate"]?: string;
  /**
   * Field mask specifying the fields in the above AuthConfig that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAuthConfigsPatchOptions(data: any): ProjectsLocationsAuthConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAuthConfigsPatchOptions(data: any): ProjectsLocationsAuthConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Integrations#projectsLocationsConnectionsList.
 */
export interface ProjectsLocationsConnectionsListOptions {
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
 * Additional options for
 * Integrations#projectsLocationsConnectionsRuntimeActionSchemasList.
 */
export interface ProjectsLocationsConnectionsRuntimeActionSchemasListOptions {
  /**
   * Filter. Only the action field with literal equality operator is supported.
   */
  filter?: string;
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
 * Additional options for
 * Integrations#projectsLocationsConnectionsRuntimeEntitySchemasList.
 */
export interface ProjectsLocationsConnectionsRuntimeEntitySchemasListOptions {
  /**
   * Filter. Only the entity field with literal equality operator is supported.
   */
  filter?: string;
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
 * Additional options for
 * Integrations#projectsLocationsIntegrationsExecutionsList.
 */
export interface ProjectsLocationsIntegrationsExecutionsListOptions {
  /**
   * Optional. Standard filter field, we support filtering on following fields:
   * workflow_name: the name of the integration. CreateTimestamp: the execution
   * created time. event_execution_state: the state of the executions.
   * execution_id: the id of the execution. trigger_id: the id of the trigger.
   * parameter_type: the type of the parameters involved in the execution. All
   * fields support for EQUALS, in additional: CreateTimestamp support for
   * LESS_THAN, GREATER_THAN ParameterType support for HAS For example:
   * "parameter_type" HAS \"string\" Also supports operators like AND, OR, NOT
   * For example, trigger_id=\"id1\" AND workflow_name=\"testWorkflow\"
   */
  filter?: string;
  /**
   * Optional user-provided custom filter.
   */
  ["filterParams.customFilter"]?: string;
  /**
   * End timestamp.
   */
  ["filterParams.endTime"]?: bigint;
  /**
   * List of possible event statuses.
   */
  ["filterParams.eventStatuses"]?: string;
  /**
   * Execution id.
   */
  ["filterParams.executionId"]?: string;
  /**
   * Param key. DEPRECATED. User parameter_pair_key instead.
   */
  ["filterParams.parameterKey"]?: string;
  /**
   * Param key in the key value pair filter.
   */
  ["filterParams.parameterPairKey"]?: string;
  /**
   * Param value in the key value pair filter.
   */
  ["filterParams.parameterPairValue"]?: string;
  /**
   * Param type.
   */
  ["filterParams.parameterType"]?: string;
  /**
   * Param value. DEPRECATED. User parameter_pair_value instead.
   */
  ["filterParams.parameterValue"]?: string;
  /**
   * Start timestamp.
   */
  ["filterParams.startTime"]?: bigint;
  /**
   * List of possible task statuses.
   */
  ["filterParams.taskStatuses"]?: string;
  /**
   * Workflow name.
   */
  ["filterParams.workflowName"]?: string;
  /**
   * Optional. The results would be returned in order you specified here.
   * Currently supporting "last_modified_time" and "create_time".
   */
  orderBy?: string;
  /**
   * Optional. The size of entries in the response.
   */
  pageSize?: number;
  /**
   * Optional. The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * Optional. View mask for the response data. If set, only the field
   * specified will be returned as part of the result. If not set, all fields in
   * event execution info will be filled and returned.
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. If true, the service will use the most recent acl information to
   * list event execution infos and renew the acl cache. Note that fetching the
   * most recent acl is synchronous, so it will increase RPC call latency.
   */
  refreshAcl?: boolean;
  /**
   * Optional. If true, the service will truncate the params to only keep the
   * first 1000 characters of string params and empty the executions in order to
   * make response smaller. Only works for UI and when the params fields are not
   * filtered out.
   */
  truncateParams?: boolean;
}

function serializeProjectsLocationsIntegrationsExecutionsListOptions(data: any): ProjectsLocationsIntegrationsExecutionsListOptions {
  return {
    ...data,
    ["filterParams.endTime"]: data["filterParams.endTime"] !== undefined ? String(data["filterParams.endTime"]) : undefined,
    ["filterParams.startTime"]: data["filterParams.startTime"] !== undefined ? String(data["filterParams.startTime"]) : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsIntegrationsExecutionsListOptions(data: any): ProjectsLocationsIntegrationsExecutionsListOptions {
  return {
    ...data,
    ["filterParams.endTime"]: data["filterParams.endTime"] !== undefined ? BigInt(data["filterParams.endTime"]) : undefined,
    ["filterParams.startTime"]: data["filterParams.startTime"] !== undefined ? BigInt(data["filterParams.startTime"]) : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsIntegrationsExecutionsSuspensionsList.
 */
export interface ProjectsLocationsIntegrationsExecutionsSuspensionsListOptions {
  /**
   * Standard filter field.
   */
  filter?: string;
  /**
   * Field name to order by.
   */
  orderBy?: string;
  /**
   * Maximum number of entries in the response.
   */
  pageSize?: number;
  /**
   * Token to retrieve a specific page.
   */
  pageToken?: string;
}

/**
 * Additional options for Integrations#projectsLocationsIntegrationsList.
 */
export interface ProjectsLocationsIntegrationsListOptions {
  /**
   * Filter on fields of IntegrationVersion. Fields can be compared with
   * literal values by use of ":" (containment), "=" (equality), ">" (greater),
   * "<" (less than), >=" (greater than or equal to), "<=" (less than or equal
   * to), and "!=" (inequality) operators. Negation, conjunction, and
   * disjunction are written using NOT, AND, and OR keywords. For example,
   * organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering
   * cannot be performed on repeated fields like `task_config`.
   */
  filter?: string;
  /**
   * The results would be returned in order you specified here. Supported sort
   * keys are: Descending sort order by "last_modified_time", "created_time",
   * "snapshot_number". Ascending sort order by the integration name.
   */
  orderBy?: string;
  /**
   * The page size for the resquest.
   */
  pageSize?: number;
  /**
   * The page token for the resquest.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Integrations#projectsLocationsIntegrationsVersionsCreate.
 */
export interface ProjectsLocationsIntegrationsVersionsCreateOptions {
  /**
   * Set this flag to true, if draft version is to be created for a brand new
   * integration. False, if the request is for an existing integration. For
   * backward compatibility reasons, even if this flag is set to `false` and no
   * existing integration is found, a new draft integration will still be
   * created.
   */
  newIntegration?: boolean;
}

/**
 * Additional options for
 * Integrations#projectsLocationsIntegrationsVersionsDownload.
 */
export interface ProjectsLocationsIntegrationsVersionsDownloadOptions {
  /**
   * File format for download request.
   */
  fileFormat?:  | "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML";
}

/**
 * Additional options for
 * Integrations#projectsLocationsIntegrationsVersionsList.
 */
export interface ProjectsLocationsIntegrationsVersionsListOptions {
  /**
   * The field mask which specifies the particular data to be returned.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Filter on fields of IntegrationVersion. Fields can be compared with
   * literal values by use of ":" (containment), "=" (equality), ">" (greater),
   * "<" (less than), >=" (greater than or equal to), "<=" (less than or equal
   * to), and "!=" (inequality) operators. Negation, conjunction, and
   * disjunction are written using NOT, AND, and OR keywords. For example,
   * organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering
   * cannot be performed on repeated fields like `task_config`.
   */
  filter?: string;
  /**
   * The results would be returned in order you specified here. Currently
   * supported sort keys are: Descending sort order for "last_modified_time",
   * "created_time", "snapshot_number" Ascending sort order for "name".
   */
  orderBy?: string;
  /**
   * The maximum number of versions to return. The service may return fewer
   * than this value. If unspecified, at most 50 versions will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListIntegrationVersions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListIntegrationVersions` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

function serializeProjectsLocationsIntegrationsVersionsListOptions(data: any): ProjectsLocationsIntegrationsVersionsListOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsLocationsIntegrationsVersionsListOptions(data: any): ProjectsLocationsIntegrationsVersionsListOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsIntegrationsVersionsPatch.
 */
export interface ProjectsLocationsIntegrationsVersionsPatchOptions {
  /**
   * Field mask specifying the fields in the above integration that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsIntegrationsVersionsPatchOptions(data: any): ProjectsLocationsIntegrationsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsIntegrationsVersionsPatchOptions(data: any): ProjectsLocationsIntegrationsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsAuthConfigsCreate.
 */
export interface ProjectsLocationsProductsAuthConfigsCreateOptions {
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.encryptedPrivateKey"]?: string;
  /**
   * 'passphrase' should be left unset if private key is not encrypted. Note
   * that 'passphrase' is not the password for web server, but an extra layer of
   * security to protected private key.
   */
  ["clientCertificate.passphrase"]?: string;
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.sslCertificate"]?: string;
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsAuthConfigsList.
 */
export interface ProjectsLocationsProductsAuthConfigsListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * AuthConfig's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsAuthConfigsListOptions(data: any): ProjectsLocationsProductsAuthConfigsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsAuthConfigsListOptions(data: any): ProjectsLocationsProductsAuthConfigsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsAuthConfigsPatch.
 */
export interface ProjectsLocationsProductsAuthConfigsPatchOptions {
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.encryptedPrivateKey"]?: string;
  /**
   * 'passphrase' should be left unset if private key is not encrypted. Note
   * that 'passphrase' is not the password for web server, but an extra layer of
   * security to protected private key.
   */
  ["clientCertificate.passphrase"]?: string;
  /**
   * The ssl certificate encoded in PEM format. This string must include the
   * begin header and end footer lines. For example, -----BEGIN CERTIFICATE-----
   * MIICTTCCAbagAwIBAgIJAPT0tSKNxan/MA0GCSqGSIb3DQEBCwUAMCoxFzAVBgNV
   * BAoTDkdvb2dsZSBURVNUSU5HMQ8wDQYDVQQDEwZ0ZXN0Q0EwHhcNMTUwMTAxMDAw
   * MDAwWhcNMjUwMTAxMDAwMDAwWjAuMRcwFQYDVQQKEw5Hb29nbGUgVEVTVElORzET
   * MBEGA1UEAwwKam9lQGJhbmFuYTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA
   * vDYFgMgxi5W488d9J7UpCInl0NXmZQpJDEHE4hvkaRlH7pnC71H0DLt0/3zATRP1
   * JzY2+eqBmbGl4/sgZKYv8UrLnNyQNUTsNx1iZAfPUflf5FwgVsai8BM0pUciq1NB
   * xD429VFcrGZNucvFLh72RuRFIKH8WUpiK/iZNFkWhZ0CAwEAAaN3MHUwDgYDVR0P
   * AQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAMBgNVHRMB
   * Af8EAjAAMBkGA1UdDgQSBBCVgnFBCWgL/iwCqnGrhTPQMBsGA1UdIwQUMBKAEKey
   * Um2o4k2WiEVA0ldQvNYwDQYJKoZIhvcNAQELBQADgYEAYK986R4E3L1v+Q6esBtW
   * JrUwA9UmJRSQr0N5w3o9XzarU37/bkjOP0Fw0k/A6Vv1n3vlciYfBFaBIam1qRHr
   * 5dMsYf4CZS6w50r7hyzqyrwDoyNxkLnd2PdcHT/sym1QmflsjEs7pejtnohO6N2H
   * wQW6M0H7Zt8claGRla4fKkg= -----END CERTIFICATE-----
   */
  ["clientCertificate.sslCertificate"]?: string;
  /**
   * Field mask specifying the fields in the above AuthConfig that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsAuthConfigsPatchOptions(data: any): ProjectsLocationsProductsAuthConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsAuthConfigsPatchOptions(data: any): ProjectsLocationsProductsAuthConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsCertificatesList.
 */
export interface ProjectsLocationsProductsCertificatesListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * Certificate's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsCertificatesListOptions(data: any): ProjectsLocationsProductsCertificatesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsCertificatesListOptions(data: any): ProjectsLocationsProductsCertificatesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsCertificatesPatch.
 */
export interface ProjectsLocationsProductsCertificatesPatchOptions {
  /**
   * Field mask specifying the fields in the above Certificate that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsCertificatesPatchOptions(data: any): ProjectsLocationsProductsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsCertificatesPatchOptions(data: any): ProjectsLocationsProductsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsExecutionsList.
 */
export interface ProjectsLocationsProductsIntegrationsExecutionsListOptions {
  /**
   * Optional. Standard filter field, we support filtering on following fields:
   * workflow_name: the name of the integration. CreateTimestamp: the execution
   * created time. event_execution_state: the state of the executions.
   * execution_id: the id of the execution. trigger_id: the id of the trigger.
   * parameter_type: the type of the parameters involved in the execution. All
   * fields support for EQUALS, in additional: CreateTimestamp support for
   * LESS_THAN, GREATER_THAN ParameterType support for HAS For example:
   * "parameter_type" HAS \"string\" Also supports operators like AND, OR, NOT
   * For example, trigger_id=\"id1\" AND workflow_name=\"testWorkflow\"
   */
  filter?: string;
  /**
   * Optional user-provided custom filter.
   */
  ["filterParams.customFilter"]?: string;
  /**
   * End timestamp.
   */
  ["filterParams.endTime"]?: bigint;
  /**
   * List of possible event statuses.
   */
  ["filterParams.eventStatuses"]?: string;
  /**
   * Execution id.
   */
  ["filterParams.executionId"]?: string;
  /**
   * Param key. DEPRECATED. User parameter_pair_key instead.
   */
  ["filterParams.parameterKey"]?: string;
  /**
   * Param key in the key value pair filter.
   */
  ["filterParams.parameterPairKey"]?: string;
  /**
   * Param value in the key value pair filter.
   */
  ["filterParams.parameterPairValue"]?: string;
  /**
   * Param type.
   */
  ["filterParams.parameterType"]?: string;
  /**
   * Param value. DEPRECATED. User parameter_pair_value instead.
   */
  ["filterParams.parameterValue"]?: string;
  /**
   * Start timestamp.
   */
  ["filterParams.startTime"]?: bigint;
  /**
   * List of possible task statuses.
   */
  ["filterParams.taskStatuses"]?: string;
  /**
   * Workflow name.
   */
  ["filterParams.workflowName"]?: string;
  /**
   * Optional. The results would be returned in order you specified here.
   * Currently supporting "last_modified_time" and "create_time".
   */
  orderBy?: string;
  /**
   * Optional. The size of entries in the response.
   */
  pageSize?: number;
  /**
   * Optional. The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * Optional. View mask for the response data. If set, only the field
   * specified will be returned as part of the result. If not set, all fields in
   * event execution info will be filled and returned.
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. If true, the service will use the most recent acl information to
   * list event execution infos and renew the acl cache. Note that fetching the
   * most recent acl is synchronous, so it will increase RPC call latency.
   */
  refreshAcl?: boolean;
  /**
   * Optional. If true, the service will truncate the params to only keep the
   * first 1000 characters of string params and empty the executions in order to
   * make response smaller. Only works for UI and when the params fields are not
   * filtered out.
   */
  truncateParams?: boolean;
}

function serializeProjectsLocationsProductsIntegrationsExecutionsListOptions(data: any): ProjectsLocationsProductsIntegrationsExecutionsListOptions {
  return {
    ...data,
    ["filterParams.endTime"]: data["filterParams.endTime"] !== undefined ? String(data["filterParams.endTime"]) : undefined,
    ["filterParams.startTime"]: data["filterParams.startTime"] !== undefined ? String(data["filterParams.startTime"]) : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsIntegrationsExecutionsListOptions(data: any): ProjectsLocationsProductsIntegrationsExecutionsListOptions {
  return {
    ...data,
    ["filterParams.endTime"]: data["filterParams.endTime"] !== undefined ? BigInt(data["filterParams.endTime"]) : undefined,
    ["filterParams.startTime"]: data["filterParams.startTime"] !== undefined ? BigInt(data["filterParams.startTime"]) : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsExecutionsSuspensionsList.
 */
export interface ProjectsLocationsProductsIntegrationsExecutionsSuspensionsListOptions {
  /**
   * Standard filter field.
   */
  filter?: string;
  /**
   * Field name to order by.
   */
  orderBy?: string;
  /**
   * Maximum number of entries in the response.
   */
  pageSize?: number;
  /**
   * Token to retrieve a specific page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsList.
 */
export interface ProjectsLocationsProductsIntegrationsListOptions {
  /**
   * Filter on fields of IntegrationVersion. Fields can be compared with
   * literal values by use of ":" (containment), "=" (equality), ">" (greater),
   * "<" (less than), >=" (greater than or equal to), "<=" (less than or equal
   * to), and "!=" (inequality) operators. Negation, conjunction, and
   * disjunction are written using NOT, AND, and OR keywords. For example,
   * organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering
   * cannot be performed on repeated fields like `task_config`.
   */
  filter?: string;
  /**
   * The results would be returned in order you specified here. Supported sort
   * keys are: Descending sort order by "last_modified_time", "created_time",
   * "snapshot_number". Ascending sort order by the integration name.
   */
  orderBy?: string;
  /**
   * The page size for the resquest.
   */
  pageSize?: number;
  /**
   * The page token for the resquest.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsVersionsCreate.
 */
export interface ProjectsLocationsProductsIntegrationsVersionsCreateOptions {
  /**
   * Set this flag to true, if draft version is to be created for a brand new
   * integration. False, if the request is for an existing integration. For
   * backward compatibility reasons, even if this flag is set to `false` and no
   * existing integration is found, a new draft integration will still be
   * created.
   */
  newIntegration?: boolean;
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsVersionsDownload.
 */
export interface ProjectsLocationsProductsIntegrationsVersionsDownloadOptions {
  /**
   * File format for download request.
   */
  fileFormat?:  | "FILE_FORMAT_UNSPECIFIED" | "JSON" | "YAML";
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsVersionsList.
 */
export interface ProjectsLocationsProductsIntegrationsVersionsListOptions {
  /**
   * The field mask which specifies the particular data to be returned.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Filter on fields of IntegrationVersion. Fields can be compared with
   * literal values by use of ":" (containment), "=" (equality), ">" (greater),
   * "<" (less than), >=" (greater than or equal to), "<=" (less than or equal
   * to), and "!=" (inequality) operators. Negation, conjunction, and
   * disjunction are written using NOT, AND, and OR keywords. For example,
   * organization_id=\"1\" AND state=ACTIVE AND description:"test". Filtering
   * cannot be performed on repeated fields like `task_config`.
   */
  filter?: string;
  /**
   * The results would be returned in order you specified here. Currently
   * supported sort keys are: Descending sort order for "last_modified_time",
   * "created_time", "snapshot_number" Ascending sort order for "name".
   */
  orderBy?: string;
  /**
   * The maximum number of versions to return. The service may return fewer
   * than this value. If unspecified, at most 50 versions will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListIntegrationVersions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListIntegrationVersions` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

function serializeProjectsLocationsProductsIntegrationsVersionsListOptions(data: any): ProjectsLocationsProductsIntegrationsVersionsListOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsIntegrationsVersionsListOptions(data: any): ProjectsLocationsProductsIntegrationsVersionsListOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationsVersionsPatch.
 */
export interface ProjectsLocationsProductsIntegrationsVersionsPatchOptions {
  /**
   * Field mask specifying the fields in the above integration that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsIntegrationsVersionsPatchOptions(data: any): ProjectsLocationsProductsIntegrationsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsIntegrationsVersionsPatchOptions(data: any): ProjectsLocationsProductsIntegrationsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsIntegrationtemplatesVersionsList.
 */
export interface ProjectsLocationsProductsIntegrationtemplatesVersionsListOptions {
  /**
   * Filter syntax: defined in the EBNF grammar.
   */
  filter?: string;
  /**
   * The maximum number of IntegrationTemplateVersions to return. The service
   * may return fewer than this value. If unspecified, at most 50 versions will
   * be returned. The maximum value is 1000; values above 1000 will be coerced
   * to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListIntegrationTemplateVersions`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListIntegrationTemplateVersions` must match
   * the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsSfdcInstancesList.
 */
export interface ProjectsLocationsProductsSfdcInstancesListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * SfdcInstance's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsSfdcInstancesListOptions(data: any): ProjectsLocationsProductsSfdcInstancesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsSfdcInstancesListOptions(data: any): ProjectsLocationsProductsSfdcInstancesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsSfdcInstancesPatch.
 */
export interface ProjectsLocationsProductsSfdcInstancesPatchOptions {
  /**
   * Field mask specifying the fields in the above SfdcInstance that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsSfdcInstancesPatchOptions(data: any): ProjectsLocationsProductsSfdcInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsSfdcInstancesPatchOptions(data: any): ProjectsLocationsProductsSfdcInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsSfdcInstancesSfdcChannelsList.
 */
export interface ProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * SfdcChannel's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions(data: any): ProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions(data: any): ProjectsLocationsProductsSfdcInstancesSfdcChannelsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsProductsSfdcInstancesSfdcChannelsPatch.
 */
export interface ProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions {
  /**
   * Field mask specifying the fields in the above SfdcChannel that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions(data: any): ProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions(data: any): ProjectsLocationsProductsSfdcInstancesSfdcChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Integrations#projectsLocationsSfdcInstancesList.
 */
export interface ProjectsLocationsSfdcInstancesListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * SfdcInstance's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSfdcInstancesListOptions(data: any): ProjectsLocationsSfdcInstancesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsSfdcInstancesListOptions(data: any): ProjectsLocationsSfdcInstancesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for Integrations#projectsLocationsSfdcInstancesPatch.
 */
export interface ProjectsLocationsSfdcInstancesPatchOptions {
  /**
   * Field mask specifying the fields in the above SfdcInstance that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSfdcInstancesPatchOptions(data: any): ProjectsLocationsSfdcInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSfdcInstancesPatchOptions(data: any): ProjectsLocationsSfdcInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsSfdcInstancesSfdcChannelsList.
 */
export interface ProjectsLocationsSfdcInstancesSfdcChannelsListOptions {
  /**
   * Filtering as supported in
   * https://developers.google.com/authorized-buyers/apis/guides/v2/list-filters.
   */
  filter?: string;
  /**
   * The size of entries in the response. If unspecified, defaults to 100.
   */
  pageSize?: number;
  /**
   * The token returned in the previous response.
   */
  pageToken?: string;
  /**
   * The mask which specifies fields that need to be returned in the
   * SfdcChannel's response.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSfdcInstancesSfdcChannelsListOptions(data: any): ProjectsLocationsSfdcInstancesSfdcChannelsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsSfdcInstancesSfdcChannelsListOptions(data: any): ProjectsLocationsSfdcInstancesSfdcChannelsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Integrations#projectsLocationsSfdcInstancesSfdcChannelsPatch.
 */
export interface ProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions {
  /**
   * Field mask specifying the fields in the above SfdcChannel that have been
   * modified and need to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions(data: any): ProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions(data: any): ProjectsLocationsSfdcInstancesSfdcChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
