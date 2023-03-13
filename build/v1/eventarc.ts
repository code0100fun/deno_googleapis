// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Eventarc API Client for Deno
 * ============================
 * 
 * Build event-driven applications on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/eventarc
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Build event-driven applications on Google Cloud Platform.
 */
export class Eventarc {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://eventarc.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Create a new ChannelConnection in a particular project and location.
   *
   * @param parent Required. The parent collection in which to add this channel connection.
   */
  async projectsLocationsChannelConnectionsCreate(parent: string, req: ChannelConnection, opts: ProjectsLocationsChannelConnectionsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelConnections`);
    if (opts.channelConnectionId !== undefined) {
      url.searchParams.append("channelConnectionId", String(opts.channelConnectionId));
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
   * Delete a single ChannelConnection.
   *
   * @param name Required. The name of the channel connection to delete.
   */
  async projectsLocationsChannelConnectionsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Get a single ChannelConnection.
   *
   * @param name Required. The name of the channel connection to get.
   */
  async projectsLocationsChannelConnectionsGet(name: string): Promise<ChannelConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ChannelConnection;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsChannelConnectionsGetIamPolicy(resource: string, opts: ProjectsLocationsChannelConnectionsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * List channel connections.
   *
   * @param parent Required. The parent collection from which to list channel connections.
   */
  async projectsLocationsChannelConnectionsList(parent: string, opts: ProjectsLocationsChannelConnectionsListOptions = {}): Promise<ListChannelConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channelConnections`);
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
    return data as ListChannelConnectionsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsChannelConnectionsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsChannelConnectionsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Create a new channel in a particular project and location.
   *
   * @param parent Required. The parent collection in which to add this channel.
   */
  async projectsLocationsChannelsCreate(parent: string, req: Channel, opts: ProjectsLocationsChannelsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channels`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
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
   * Delete a single channel.
   *
   * @param name Required. The name of the channel to be deleted.
   */
  async projectsLocationsChannelsDelete(name: string, opts: ProjectsLocationsChannelsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Get a single Channel.
   *
   * @param name Required. The name of the channel to get.
   */
  async projectsLocationsChannelsGet(name: string): Promise<Channel> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Channel;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsChannelsGetIamPolicy(resource: string, opts: ProjectsLocationsChannelsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * List channels.
   *
   * @param parent Required. The parent collection to list channels on.
   */
  async projectsLocationsChannelsList(parent: string, opts: ProjectsLocationsChannelsListOptions = {}): Promise<ListChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channels`);
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
    return data as ListChannelsResponse;
  }

  /**
   * Update a single channel.
   *
   * @param name Required. The resource name of the channel. Must be unique within the location on the project and must be in `projects/{project}/locations/{location}/channels/{channel_id}` format.
   */
  async projectsLocationsChannelsPatch(name: string, req: Channel, opts: ProjectsLocationsChannelsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
  async projectsLocationsChannelsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsChannelsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Get a GoogleChannelConfig
   *
   * @param name Required. The name of the config to get.
   */
  async projectsLocationsGetGoogleChannelConfig(name: string): Promise<GoogleChannelConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChannelConfig;
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
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
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
   * Get a single Provider.
   *
   * @param name Required. The name of the provider to get.
   */
  async projectsLocationsProvidersGet(name: string): Promise<Provider> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Provider;
  }

  /**
   * List providers.
   *
   * @param parent Required. The parent of the provider to get.
   */
  async projectsLocationsProvidersList(parent: string, opts: ProjectsLocationsProvidersListOptions = {}): Promise<ListProvidersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/providers`);
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
    return data as ListProvidersResponse;
  }

  /**
   * Create a new trigger in a particular project and location.
   *
   * @param parent Required. The parent collection in which to add this trigger.
   */
  async projectsLocationsTriggersCreate(parent: string, req: Trigger, opts: ProjectsLocationsTriggersCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/triggers`);
    if (opts.triggerId !== undefined) {
      url.searchParams.append("triggerId", String(opts.triggerId));
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
   * Delete a single trigger.
   *
   * @param name Required. The name of the trigger to be deleted.
   */
  async projectsLocationsTriggersDelete(name: string, opts: ProjectsLocationsTriggersDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
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
   * Get a single trigger.
   *
   * @param name Required. The name of the trigger to get.
   */
  async projectsLocationsTriggersGet(name: string): Promise<Trigger> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Trigger;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTriggersGetIamPolicy(resource: string, opts: ProjectsLocationsTriggersGetIamPolicyOptions = {}): Promise<Policy> {
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
   * List triggers.
   *
   * @param parent Required. The parent collection to list triggers on.
   */
  async projectsLocationsTriggersList(parent: string, opts: ProjectsLocationsTriggersListOptions = {}): Promise<ListTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/triggers`);
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
    return data as ListTriggersResponse;
  }

  /**
   * Update a single trigger.
   *
   * @param name Required. The resource name of the trigger. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/triggers/{trigger}` format.
   */
  async projectsLocationsTriggersPatch(name: string, req: Trigger, opts: ProjectsLocationsTriggersPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsTriggersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
  async projectsLocationsTriggersSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsTriggersTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Update a single GoogleChannelConfig
   *
   * @param name Required. The resource name of the config. Must be in the format of, `projects/{project}/locations/{location}/googleChannelConfig`.
   */
  async projectsLocationsUpdateGoogleChannelConfig(name: string, req: GoogleChannelConfig, opts: ProjectsLocationsUpdateGoogleChannelConfigOptions = {}): Promise<GoogleChannelConfig> {
    opts = serializeProjectsLocationsUpdateGoogleChannelConfigOptions(opts);
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
    return data as GoogleChannelConfig;
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
 * A representation of the Channel resource. A Channel is a resource on which
 * event providers publish their events. The published events are delivered
 * through the transport associated with the channel. Note that a channel is
 * associated with exactly one event provider.
 */
export interface Channel {
  /**
   * Output only. The activation token for the channel. The token must be used
   * by the provider to register the channel for publishing.
   */
  readonly activationToken?: string;
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Optional. Resource name of a KMS crypto key (managed by the user) used to
   * encrypt/decrypt their event data. It must match the pattern
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`.
   */
  cryptoKeyName?: string;
  /**
   * Required. The resource name of the channel. Must be unique within the
   * location on the project and must be in
   * `projects/{project}/locations/{location}/channels/{channel_id}` format.
   */
  name?: string;
  /**
   * The name of the event provider (e.g. Eventarc SaaS partner) associated
   * with the channel. This provider will be granted permissions to publish
   * events to the channel. Format:
   * `projects/{project}/locations/{location}/providers/{provider_id}`.
   */
  provider?: string;
  /**
   * Output only. The name of the Pub/Sub topic created and managed by Eventarc
   * system as a transport for the event delivery. Format:
   * `projects/{project}/topics/{topic_id}`.
   */
  readonly pubsubTopic?: string;
  /**
   * Output only. The state of a Channel.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "INACTIVE";
  /**
   * Output only. Server assigned unique identifier for the channel. The value
   * is a UUID4 string and guaranteed to remain unchanged until the resource is
   * deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
}

/**
 * A representation of the ChannelConnection resource. A ChannelConnection is a
 * resource which event providers create during the activation process to
 * establish a connection between the provider and the subscriber channel.
 */
export interface ChannelConnection {
  /**
   * Input only. Activation token for the channel. The token will be used
   * during the creation of ChannelConnection to bind the channel with the
   * provider project. This field will not be stored in the provider resource.
   */
  activationToken?: string;
  /**
   * Required. The name of the connected subscriber Channel. This is a weak
   * reference to avoid cross project and cross accounts references. This must
   * be in `projects/{project}/location/{location}/channels/{channel_id}`
   * format.
   */
  channel?: string;
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Required. The name of the connection.
   */
  name?: string;
  /**
   * Output only. Server assigned ID of the resource. The server guarantees
   * uniqueness and immutability until deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
}

/**
 * Represents a Cloud Run destination.
 */
export interface CloudRun {
  /**
   * Optional. The relative path on the Cloud Run service the events should be
   * sent to. The value must conform to the definition of a URI path segment
   * (section 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".
   */
  path?: string;
  /**
   * Required. The region the Cloud Run service is deployed in.
   */
  region?: string;
  /**
   * Required. The name of the Cloud Run service being addressed. See
   * https://cloud.google.com/run/docs/reference/rest/v1/namespaces.services.
   * Only services located in the same project as the trigger object can be
   * addressed.
   */
  service?: string;
}

/**
 * Represents a target of an invocation over HTTP.
 */
export interface Destination {
  /**
   * The Cloud Function resource name. Only Cloud Functions V2 is supported.
   * Format: `projects/{project}/locations/{location}/functions/{function}` This
   * is a read-only field. Creating Cloud Functions V2 triggers is only
   * supported via the Cloud Functions product. An error will be returned if the
   * user sets this value.
   */
  cloudFunction?: string;
  /**
   * Cloud Run fully-managed resource that receives the events. The resource
   * should be in the same project as the trigger.
   */
  cloudRun?: CloudRun;
  /**
   * A GKE service capable of receiving events. The service should be running
   * in the same project as the trigger.
   */
  gke?: GKE;
  /**
   * The resource name of the Workflow whose Executions are triggered by the
   * events. The Workflow resource should be deployed in the same project as the
   * trigger. Format:
   * `projects/{project}/locations/{location}/workflows/{workflow}`
   */
  workflow?: string;
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
 * Filters events based on exact matches on the CloudEvents attributes.
 */
export interface EventFilter {
  /**
   * Required. The name of a CloudEvents attribute. Currently, only a subset of
   * attributes are supported for filtering. All triggers MUST provide a filter
   * for the 'type' attribute.
   */
  attribute?: string;
  /**
   * Optional. The operator used for matching the events with the value of the
   * filter. If not specified, only events that have an exact key-value pair
   * specified in the filter are matched. The only allowed value is
   * `match-path-pattern`.
   */
  operator?: string;
  /**
   * Required. The value for the attribute.
   */
  value?: string;
}

/**
 * A representation of the event type resource.
 */
export interface EventType {
  /**
   * Output only. Human friendly description of what the event type is about.
   * For example "Bucket created in Cloud Storage".
   */
  readonly description?: string;
  /**
   * Output only. URI for the event schema. For example
   * "https://github.com/googleapis/google-cloudevents/blob/master/proto/google/events/cloud/storage/v1/events.proto"
   */
  readonly eventSchemaUri?: string;
  /**
   * Output only. Filtering attributes for the event type.
   */
  readonly filteringAttributes?: FilteringAttribute[];
  /**
   * Output only. The full name of the event type (for example,
   * "google.cloud.storage.object.v1.finalized"). In the form of
   * {provider-specific-prefix}.{resource}.{version}.{verb}. Types MUST be
   * versioned and event schemas are guaranteed to remain backward compatible
   * within one version. Note that event type versions and API versions do not
   * need to match.
   */
  readonly type?: string;
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
 * A representation of the FilteringAttribute resource. Filtering attributes
 * are per event type.
 */
export interface FilteringAttribute {
  /**
   * Output only. Attribute used for filtering the event type.
   */
  readonly attribute?: string;
  /**
   * Output only. Description of the purpose of the attribute.
   */
  readonly description?: string;
  /**
   * Output only. If true, the attribute accepts matching expressions in the
   * Eventarc PathPattern format.
   */
  readonly pathPatternSupported?: boolean;
  /**
   * Output only. If true, the triggers for this provider should always specify
   * a filter on these attributes. Trigger creation will fail otherwise.
   */
  readonly required?: boolean;
}

/**
 * Represents a GKE destination.
 */
export interface GKE {
  /**
   * Required. The name of the cluster the GKE service is running in. The
   * cluster must be running in the same project as the trigger being created.
   */
  cluster?: string;
  /**
   * Required. The name of the Google Compute Engine in which the cluster
   * resides, which can either be compute zone (for example, us-central1-a) for
   * the zonal clusters or region (for example, us-central1) for regional
   * clusters.
   */
  location?: string;
  /**
   * Required. The namespace the GKE service is running in.
   */
  namespace?: string;
  /**
   * Optional. The relative path on the GKE service the events should be sent
   * to. The value must conform to the definition of a URI path segment (section
   * 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".
   */
  path?: string;
  /**
   * Required. Name of the GKE service.
   */
  service?: string;
}

/**
 * A GoogleChannelConfig is a resource that stores the custom settings
 * respected by Eventarc first-party triggers in the matching region. Once
 * configured, first-party event data will be protected using the specified
 * custom managed encryption key instead of Google-managed encryption keys.
 */
export interface GoogleChannelConfig {
  /**
   * Optional. Resource name of a KMS crypto key (managed by the user) used to
   * encrypt/decrypt their event data. It must match the pattern
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`.
   */
  cryptoKeyName?: string;
  /**
   * Required. The resource name of the config. Must be in the format of,
   * `projects/{project}/locations/{location}/googleChannelConfig`.
   */
  name?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
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
 * The response message for the `ListChannelConnections` method.
 */
export interface ListChannelConnectionsResponse {
  /**
   * The requested channel connections, up to the number specified in
   * `page_size`.
   */
  channelConnections?: ChannelConnection[];
  /**
   * A page token that can be sent to `ListChannelConnections` to request the
   * next page. If this is empty, then there are no more pages.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources, if any.
   */
  unreachable?: string[];
}

/**
 * The response message for the `ListChannels` method.
 */
export interface ListChannelsResponse {
  /**
   * The requested channels, up to the number specified in `page_size`.
   */
  channels?: Channel[];
  /**
   * A page token that can be sent to `ListChannels` to request the next page.
   * If this is empty, then there are no more pages.
   */
  nextPageToken?: string;
  /**
   * Unreachable resources, if any.
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
 * The response message for the `ListProviders` method.
 */
export interface ListProvidersResponse {
  /**
   * A page token that can be sent to `ListProviders` to request the next page.
   * If this is empty, then there are no more pages.
   */
  nextPageToken?: string;
  /**
   * The requested providers, up to the number specified in `page_size`.
   */
  providers?: Provider[];
  /**
   * Unreachable resources, if any.
   */
  unreachable?: string[];
}

/**
 * The response message for the `ListTriggers` method.
 */
export interface ListTriggersResponse {
  /**
   * A page token that can be sent to `ListTriggers` to request the next page.
   * If this is empty, then there are no more pages.
   */
  nextPageToken?: string;
  /**
   * The requested triggers, up to the number specified in `page_size`.
   */
  triggers?: Trigger[];
  /**
   * Unreachable resources, if any.
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
 * Additional options for Eventarc#projectsLocationsChannelConnectionsCreate.
 */
export interface ProjectsLocationsChannelConnectionsCreateOptions {
  /**
   * Required. The user-provided ID to be assigned to the channel connection.
   */
  channelConnectionId?: string;
}

/**
 * Additional options for
 * Eventarc#projectsLocationsChannelConnectionsGetIamPolicy.
 */
export interface ProjectsLocationsChannelConnectionsGetIamPolicyOptions {
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
 * Additional options for Eventarc#projectsLocationsChannelConnectionsList.
 */
export interface ProjectsLocationsChannelConnectionsListOptions {
  /**
   * The maximum number of channel connections to return on each page. Note:
   * The service may send fewer responses.
   */
  pageSize?: number;
  /**
   * The page token; provide the value from the `next_page_token` field in a
   * previous `ListChannelConnections` call to retrieve the subsequent page.
   * When paginating, all other parameters provided to `ListChannelConnetions`
   * match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Eventarc#projectsLocationsChannelsCreate.
 */
export interface ProjectsLocationsChannelsCreateOptions {
  /**
   * Required. The user-provided ID to be assigned to the channel.
   */
  channelId?: string;
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Eventarc#projectsLocationsChannelsDelete.
 */
export interface ProjectsLocationsChannelsDeleteOptions {
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Eventarc#projectsLocationsChannelsGetIamPolicy.
 */
export interface ProjectsLocationsChannelsGetIamPolicyOptions {
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
 * Additional options for Eventarc#projectsLocationsChannelsList.
 */
export interface ProjectsLocationsChannelsListOptions {
  /**
   * The sorting order of the resources returned. Value should be a
   * comma-separated list of fields. The default sorting order is ascending. To
   * specify descending order for a field, append a `desc` suffix; for example:
   * `name desc, channel_id`.
   */
  orderBy?: string;
  /**
   * The maximum number of channels to return on each page. Note: The service
   * may send fewer.
   */
  pageSize?: number;
  /**
   * The page token; provide the value from the `next_page_token` field in a
   * previous `ListChannels` call to retrieve the subsequent page. When
   * paginating, all other parameters provided to `ListChannels` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Eventarc#projectsLocationsChannelsPatch.
 */
export interface ProjectsLocationsChannelsPatchOptions {
  /**
   * The fields to be updated; only fields explicitly provided are updated. If
   * no field mask is provided, all provided fields in the request are updated.
   * To update all fields, provide a field mask of "*".
   */
  updateMask?: string /* FieldMask */;
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsChannelsPatchOptions(data: any): ProjectsLocationsChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsChannelsPatchOptions(data: any): ProjectsLocationsChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Eventarc#projectsLocationsList.
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
 * Additional options for Eventarc#projectsLocationsOperationsList.
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
 * Additional options for Eventarc#projectsLocationsProvidersList.
 */
export interface ProjectsLocationsProvidersListOptions {
  /**
   * The filter field that the list request will filter on.
   */
  filter?: string;
  /**
   * The sorting order of the resources returned. Value should be a
   * comma-separated list of fields. The default sorting oder is ascending. To
   * specify descending order for a field, append a `desc` suffix; for example:
   * `name desc, _id`.
   */
  orderBy?: string;
  /**
   * The maximum number of providers to return on each page.
   */
  pageSize?: number;
  /**
   * The page token; provide the value from the `next_page_token` field in a
   * previous `ListProviders` call to retrieve the subsequent page. When
   * paginating, all other parameters provided to `ListProviders` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Eventarc#projectsLocationsTriggersCreate.
 */
export interface ProjectsLocationsTriggersCreateOptions {
  /**
   * Required. The user-provided ID to be assigned to the trigger.
   */
  triggerId?: string;
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Eventarc#projectsLocationsTriggersDelete.
 */
export interface ProjectsLocationsTriggersDeleteOptions {
  /**
   * If set to true, and the trigger is not found, the request will succeed but
   * no action will be taken on the server.
   */
  allowMissing?: boolean;
  /**
   * If provided, the trigger will only be deleted if the etag matches the
   * current etag on the resource.
   */
  etag?: string;
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Eventarc#projectsLocationsTriggersGetIamPolicy.
 */
export interface ProjectsLocationsTriggersGetIamPolicyOptions {
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
 * Additional options for Eventarc#projectsLocationsTriggersList.
 */
export interface ProjectsLocationsTriggersListOptions {
  /**
   * Filter field. Used to filter the Triggers to be listed. Possible filters
   * are described in https://google.aip.dev/160. For example, using
   * "?filter=destination:gke" would list only Triggers with a gke destination.
   */
  filter?: string;
  /**
   * The sorting order of the resources returned. Value should be a
   * comma-separated list of fields. The default sorting order is ascending. To
   * specify descending order for a field, append a `desc` suffix; for example:
   * `name desc, trigger_id`.
   */
  orderBy?: string;
  /**
   * The maximum number of triggers to return on each page. Note: The service
   * may send fewer.
   */
  pageSize?: number;
  /**
   * The page token; provide the value from the `next_page_token` field in a
   * previous `ListTriggers` call to retrieve the subsequent page. When
   * paginating, all other parameters provided to `ListTriggers` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Eventarc#projectsLocationsTriggersPatch.
 */
export interface ProjectsLocationsTriggersPatchOptions {
  /**
   * If set to true, and the trigger is not found, a new trigger will be
   * created. In this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * The fields to be updated; only fields explicitly provided are updated. If
   * no field mask is provided, all provided fields in the request are updated.
   * To update all fields, provide a field mask of "*".
   */
  updateMask?: string /* FieldMask */;
  /**
   * Required. If set, validate the request and preview the review, but do not
   * post it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsTriggersPatchOptions(data: any): ProjectsLocationsTriggersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTriggersPatchOptions(data: any): ProjectsLocationsTriggersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Eventarc#projectsLocationsUpdateGoogleChannelConfig.
 */
export interface ProjectsLocationsUpdateGoogleChannelConfigOptions {
  /**
   * The fields to be updated; only fields explicitly provided are updated. If
   * no field mask is provided, all provided fields in the request are updated.
   * To update all fields, provide a field mask of "*".
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsUpdateGoogleChannelConfigOptions(data: any): ProjectsLocationsUpdateGoogleChannelConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsUpdateGoogleChannelConfigOptions(data: any): ProjectsLocationsUpdateGoogleChannelConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A representation of the Provider resource.
 */
export interface Provider {
  /**
   * Output only. Human friendly name for the Provider. For example "Cloud
   * Storage".
   */
  readonly displayName?: string;
  /**
   * Output only. Event types for this provider.
   */
  readonly eventTypes?: EventType[];
  /**
   * Output only. In
   * `projects/{project}/locations/{location}/providers/{provider_id}` format.
   */
  readonly name?: string;
}

/**
 * Represents a Pub/Sub transport.
 */
export interface Pubsub {
  /**
   * Output only. The name of the Pub/Sub subscription created and managed by
   * Eventarc as a transport for the event delivery. Format:
   * `projects/{PROJECT_ID}/subscriptions/{SUBSCRIPTION_NAME}`.
   */
  readonly subscription?: string;
  /**
   * Optional. The name of the Pub/Sub topic created and managed by Eventarc as
   * a transport for the event delivery. Format:
   * `projects/{PROJECT_ID}/topics/{TOPIC_NAME}`. You can set an existing topic
   * for triggers of the type `google.cloud.pubsub.topic.v1.messagePublished`.
   * The topic you provide here is not deleted by Eventarc at trigger deletion.
   */
  topic?: string;
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
 * A condition that is part of the trigger state computation.
 */
export interface StateCondition {
  /**
   * The canonical code of the condition.
   */
  code?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
  /**
   * Human-readable message.
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
 * Represents the transport intermediaries created for the trigger to deliver
 * events.
 */
export interface Transport {
  /**
   * The Pub/Sub topic and subscription used by Eventarc as a transport
   * intermediary.
   */
  pubsub?: Pubsub;
}

/**
 * A representation of the trigger resource.
 */
export interface Trigger {
  /**
   * Optional. The name of the channel associated with the trigger in
   * `projects/{project}/locations/{location}/channels/{channel}` format. You
   * must provide a channel to receive events from Eventarc SaaS partners.
   */
  channel?: string;
  /**
   * Output only. The reason(s) why a trigger is in FAILED state.
   */
  readonly conditions?: {
    [key: string]: StateCondition
  };
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Required. Destination specifies where the events should be sent to.
   */
  destination?: Destination;
  /**
   * Output only. This checksum is computed by the server based on the value of
   * other fields, and might be sent only on create requests to ensure that the
   * client has an up-to-date value before proceeding.
   */
  readonly etag?: string;
  /**
   * Required. Unordered list. The list of filters that applies to event
   * attributes. Only events that match all the provided filters are sent to the
   * destination.
   */
  eventFilters?: EventFilter[];
  /**
   * Optional. User labels attached to the triggers that can be used to group
   * resources.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The resource name of the trigger. Must be unique within the
   * location of the project and must be in
   * `projects/{project}/locations/{location}/triggers/{trigger}` format.
   */
  name?: string;
  /**
   * Optional. The IAM service account email associated with the trigger. The
   * service account represents the identity of the trigger. The principal who
   * calls this API must have the `iam.serviceAccounts.actAs` permission in the
   * service account. See
   * https://cloud.google.com/iam/docs/understanding-service-accounts?hl=en#sa_common
   * for more information. For Cloud Run destinations, this service account is
   * used to generate identity tokens when invoking the service. See
   * https://cloud.google.com/run/docs/triggering/pubsub-push#create-service-account
   * for information on how to invoke authenticated Cloud Run services. To
   * create Audit Log triggers, the service account should also have the
   * `roles/eventarc.eventReceiver` IAM role.
   */
  serviceAccount?: string;
  /**
   * Optional. To deliver messages, Eventarc might use other Google Cloud
   * products as a transport intermediary. This field contains a reference to
   * that transport intermediary. This information can be used for debugging
   * purposes.
   */
  transport?: Transport;
  /**
   * Output only. Server-assigned unique identifier for the trigger. The value
   * is a UUID4 string and guaranteed to remain unchanged until the resource is
   * deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
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
