// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud IoT API Client for Deno
 * =============================
 * 
 * Registers and manages IoT (Internet of Things) devices that connect to the Google Cloud Platform. 
 * 
 * Docs: https://cloud.google.com/iot
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Registers and manages IoT (Internet of Things) devices that connect to the
 * Google Cloud Platform.
 */
export class CloudIoT {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudiot.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Associates the device with the gateway.
   *
   * @param parent Required. The name of the registry. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesBindDeviceToGateway(parent: string, req: BindDeviceToGatewayRequest): Promise<BindDeviceToGatewayResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:bindDeviceToGateway`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BindDeviceToGatewayResponse;
  }

  /**
   * Creates a device registry that contains devices.
   *
   * @param parent Required. The project and cloud region where this device registry must be created. For example, `projects/example-project/locations/us-central1`.
   */
  async projectsLocationsRegistriesCreate(parent: string, req: DeviceRegistry): Promise<DeviceRegistry> {
    req = serializeDeviceRegistry(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDeviceRegistry(data);
  }

  /**
   * Deletes a device registry configuration.
   *
   * @param name Required. The name of the device registry. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the last few versions of the device configuration in descending
   * order (i.e.: newest first).
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesConfigVersionsList(name: string, opts: ProjectsLocationsRegistriesDevicesConfigVersionsListOptions = {}): Promise<ListDeviceConfigVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/configVersions`);
    if (opts.numVersions !== undefined) {
      url.searchParams.append("numVersions", String(opts.numVersions));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListDeviceConfigVersionsResponse(data);
  }

  /**
   * Creates a device in a device registry.
   *
   * @param parent Required. The name of the device registry where this device should be created. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesDevicesCreate(parent: string, req: Device): Promise<Device> {
    req = serializeDevice(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDevice(data);
  }

  /**
   * Deletes a device.
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets details about a device.
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesGet(name: string, opts: ProjectsLocationsRegistriesDevicesGetOptions = {}): Promise<Device> {
    opts = serializeProjectsLocationsRegistriesDevicesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDevice(data);
  }

  /**
   * List devices in a device registry.
   *
   * @param parent Required. The device registry path. Required. For example, `projects/my-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesDevicesList(parent: string, opts: ProjectsLocationsRegistriesDevicesListOptions = {}): Promise<ListDevicesResponse> {
    opts = serializeProjectsLocationsRegistriesDevicesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
    if (opts.deviceIds !== undefined) {
      url.searchParams.append("deviceIds", String(opts.deviceIds));
    }
    if (opts.deviceNumIds !== undefined) {
      url.searchParams.append("deviceNumIds", String(opts.deviceNumIds));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
    if (opts["gatewayListOptions.associationsDeviceId"] !== undefined) {
      url.searchParams.append("gatewayListOptions.associationsDeviceId", String(opts["gatewayListOptions.associationsDeviceId"]));
    }
    if (opts["gatewayListOptions.associationsGatewayId"] !== undefined) {
      url.searchParams.append("gatewayListOptions.associationsGatewayId", String(opts["gatewayListOptions.associationsGatewayId"]));
    }
    if (opts["gatewayListOptions.gatewayType"] !== undefined) {
      url.searchParams.append("gatewayListOptions.gatewayType", String(opts["gatewayListOptions.gatewayType"]));
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
    return deserializeListDevicesResponse(data);
  }

  /**
   * Modifies the configuration for the device, which is eventually sent from
   * the Cloud IoT Core servers. Returns the modified configuration version and
   * its metadata.
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesModifyCloudToDeviceConfig(name: string, req: ModifyCloudToDeviceConfigRequest): Promise<DeviceConfig> {
    req = serializeModifyCloudToDeviceConfigRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:modifyCloudToDeviceConfig`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDeviceConfig(data);
  }

  /**
   * Updates a device.
   *
   * @param name The resource path name. For example, `projects/p1/locations/us-central1/registries/registry0/devices/dev0` or `projects/p1/locations/us-central1/registries/registry0/devices/{num_id}`. When `name` is populated as a response from the service, it always ends in the device numeric ID.
   */
  async projectsLocationsRegistriesDevicesPatch(name: string, req: Device, opts: ProjectsLocationsRegistriesDevicesPatchOptions = {}): Promise<Device> {
    req = serializeDevice(req);
    opts = serializeProjectsLocationsRegistriesDevicesPatchOptions(opts);
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
    return deserializeDevice(data);
  }

  /**
   * Sends a command to the specified device. In order for a device to be able
   * to receive commands, it must: 1) be connected to Cloud IoT Core using the
   * MQTT protocol, and 2) be subscribed to the group of MQTT topics specified
   * by /devices/{device-id}/commands/#. This subscription will receive commands
   * at the top-level topic /devices/{device-id}/commands as well as commands
   * for subfolders, like /devices/{device-id}/commands/subfolder. Note that
   * subscribing to specific subfolders is not supported. If the command could
   * not be delivered to the device, this method will return an error; in
   * particular, if the device is not subscribed, this method will return
   * FAILED_PRECONDITION. Otherwise, this method will return OK. If the
   * subscription is QoS 1, at least once delivery will be guaranteed; for QoS
   * 0, no acknowledgment will be expected from the device.
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesSendCommandToDevice(name: string, req: SendCommandToDeviceRequest): Promise<SendCommandToDeviceResponse> {
    req = serializeSendCommandToDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:sendCommandToDevice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SendCommandToDeviceResponse;
  }

  /**
   * Lists the last few versions of the device state in descending order (i.e.:
   * newest first).
   *
   * @param name Required. The name of the device. For example, `projects/p0/locations/us-central1/registries/registry0/devices/device0` or `projects/p0/locations/us-central1/registries/registry0/devices/{num_id}`.
   */
  async projectsLocationsRegistriesDevicesStatesList(name: string, opts: ProjectsLocationsRegistriesDevicesStatesListOptions = {}): Promise<ListDeviceStatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/states`);
    if (opts.numStates !== undefined) {
      url.searchParams.append("numStates", String(opts.numStates));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListDeviceStatesResponse(data);
  }

  /**
   * Gets a device registry configuration.
   *
   * @param name Required. The name of the device registry. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesGet(name: string): Promise<DeviceRegistry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeviceRegistry(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * List devices in a device registry.
   *
   * @param parent Required. The device registry path. Required. For example, `projects/my-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesGroupsDevicesList(parent: string, opts: ProjectsLocationsRegistriesGroupsDevicesListOptions = {}): Promise<ListDevicesResponse> {
    opts = serializeProjectsLocationsRegistriesGroupsDevicesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
    if (opts.deviceIds !== undefined) {
      url.searchParams.append("deviceIds", String(opts.deviceIds));
    }
    if (opts.deviceNumIds !== undefined) {
      url.searchParams.append("deviceNumIds", String(opts.deviceNumIds));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
    if (opts["gatewayListOptions.associationsDeviceId"] !== undefined) {
      url.searchParams.append("gatewayListOptions.associationsDeviceId", String(opts["gatewayListOptions.associationsDeviceId"]));
    }
    if (opts["gatewayListOptions.associationsGatewayId"] !== undefined) {
      url.searchParams.append("gatewayListOptions.associationsGatewayId", String(opts["gatewayListOptions.associationsGatewayId"]));
    }
    if (opts["gatewayListOptions.gatewayType"] !== undefined) {
      url.searchParams.append("gatewayListOptions.gatewayType", String(opts["gatewayListOptions.gatewayType"]));
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
    return deserializeListDevicesResponse(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesGroupsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesGroupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesGroupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Lists device registries.
   *
   * @param parent Required. The project and cloud region path. For example, `projects/example-project/locations/us-central1`.
   */
  async projectsLocationsRegistriesList(parent: string, opts: ProjectsLocationsRegistriesListOptions = {}): Promise<ListDeviceRegistriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registries`);
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
    return deserializeListDeviceRegistriesResponse(data);
  }

  /**
   * Updates a device registry configuration.
   *
   * @param name The resource path name. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesPatch(name: string, req: DeviceRegistry, opts: ProjectsLocationsRegistriesPatchOptions = {}): Promise<DeviceRegistry> {
    req = serializeDeviceRegistry(req);
    opts = serializeProjectsLocationsRegistriesPatchOptions(opts);
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
    return deserializeDeviceRegistry(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistriesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Deletes the association between the device and the gateway.
   *
   * @param parent Required. The name of the registry. For example, `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  async projectsLocationsRegistriesUnbindDeviceFromGateway(parent: string, req: UnbindDeviceFromGatewayRequest): Promise<UnbindDeviceFromGatewayResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:unbindDeviceFromGateway`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UnbindDeviceFromGatewayResponse;
  }
}

/**
 * Request for `BindDeviceToGateway`.
 */
export interface BindDeviceToGatewayRequest {
  /**
   * Required. The device to associate with the specified gateway. The value of
   * `device_id` can be either the device numeric ID or the user-defined device
   * identifier.
   */
  deviceId?: string;
  /**
   * Required. The value of `gateway_id` can be either the device numeric ID or
   * the user-defined device identifier.
   */
  gatewayId?: string;
}

/**
 * Response for `BindDeviceToGateway`.
 */
export interface BindDeviceToGatewayResponse {
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
 * The device resource.
 */
export interface Device {
  /**
   * If a device is blocked, connections or requests from this device will
   * fail. Can be used to temporarily prevent the device from connecting if, for
   * example, the sensor is generating bad data and needs maintenance.
   */
  blocked?: boolean;
  /**
   * The most recent device configuration, which is eventually sent from Cloud
   * IoT Core to the device. If not present on creation, the configuration will
   * be initialized with an empty payload and version value of `1`. To update
   * this field after creation, use the
   * `DeviceManager.ModifyCloudToDeviceConfig` method.
   */
  config?: DeviceConfig;
  /**
   * The credentials used to authenticate this device. To allow credential
   * rotation without interruption, multiple device credentials can be bound to
   * this device. No more than 3 credentials can be bound to a single device at
   * a time. When new credentials are added to a device, they are verified
   * against the registry credentials. For details, see the description of the
   * `DeviceRegistry.credentials` field.
   */
  credentials?: DeviceCredential[];
  /**
   * Gateway-related configuration and state.
   */
  gatewayConfig?: GatewayConfig;
  /**
   * The user-defined device identifier. The device ID must be unique within a
   * device registry.
   */
  id?: string;
  /**
   * [Output only] The last time a cloud-to-device config version
   * acknowledgment was received from the device. This field is only for
   * configurations sent through MQTT.
   */
  lastConfigAckTime?: Date;
  /**
   * [Output only] The last time a cloud-to-device config version was sent to
   * the device.
   */
  lastConfigSendTime?: Date;
  /**
   * [Output only] The error message of the most recent error, such as a
   * failure to publish to Cloud Pub/Sub. 'last_error_time' is the timestamp of
   * this field. If no errors have occurred, this field has an empty message and
   * the status code 0 == OK. Otherwise, this field is expected to have a status
   * code other than OK.
   */
  lastErrorStatus?: Status;
  /**
   * [Output only] The time the most recent error occurred, such as a failure
   * to publish to Cloud Pub/Sub. This field is the timestamp of
   * 'last_error_status'.
   */
  lastErrorTime?: Date;
  /**
   * [Output only] The last time a telemetry event was received. Timestamps are
   * periodically collected and written to storage; they may be stale by a few
   * minutes.
   */
  lastEventTime?: Date;
  /**
   * [Output only] The last time an MQTT `PINGREQ` was received. This field
   * applies only to devices connecting through MQTT. MQTT clients usually only
   * send `PINGREQ` messages if the connection is idle, and no other messages
   * have been sent. Timestamps are periodically collected and written to
   * storage; they may be stale by a few minutes.
   */
  lastHeartbeatTime?: Date;
  /**
   * [Output only] The last time a state event was received. Timestamps are
   * periodically collected and written to storage; they may be stale by a few
   * minutes.
   */
  lastStateTime?: Date;
  /**
   * **Beta Feature** The logging verbosity for device activity. If
   * unspecified, DeviceRegistry.log_level will be used.
   */
  logLevel?:  | "LOG_LEVEL_UNSPECIFIED" | "NONE" | "ERROR" | "INFO" | "DEBUG";
  /**
   * The metadata key-value pairs assigned to the device. This metadata is not
   * interpreted or indexed by Cloud IoT Core. It can be used to add contextual
   * information for the device. Keys must conform to the regular expression
   * a-zA-Z+ and be less than 128 bytes in length. Values are free-form strings.
   * Each value must be less than or equal to 32 KB in size. The total size of
   * all keys and values must be less than 256 KB, and the maximum number of
   * key-value pairs is 500.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The resource path name. For example,
   * `projects/p1/locations/us-central1/registries/registry0/devices/dev0` or
   * `projects/p1/locations/us-central1/registries/registry0/devices/{num_id}`.
   * When `name` is populated as a response from the service, it always ends in
   * the device numeric ID.
   */
  name?: string;
  /**
   * [Output only] A server-defined unique numeric ID for the device. This is a
   * more compact way to identify devices, and it is globally unique.
   */
  numId?: bigint;
  /**
   * [Output only] The state most recently received from the device. If no
   * state has been reported, this field is not present.
   */
  state?: DeviceState;
}

function serializeDevice(data: any): Device {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeDeviceConfig(data["config"]) : undefined,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (serializeDeviceCredential(item))) : undefined,
    gatewayConfig: data["gatewayConfig"] !== undefined ? serializeGatewayConfig(data["gatewayConfig"]) : undefined,
    lastConfigAckTime: data["lastConfigAckTime"] !== undefined ? data["lastConfigAckTime"].toISOString() : undefined,
    lastConfigSendTime: data["lastConfigSendTime"] !== undefined ? data["lastConfigSendTime"].toISOString() : undefined,
    lastErrorTime: data["lastErrorTime"] !== undefined ? data["lastErrorTime"].toISOString() : undefined,
    lastEventTime: data["lastEventTime"] !== undefined ? data["lastEventTime"].toISOString() : undefined,
    lastHeartbeatTime: data["lastHeartbeatTime"] !== undefined ? data["lastHeartbeatTime"].toISOString() : undefined,
    lastStateTime: data["lastStateTime"] !== undefined ? data["lastStateTime"].toISOString() : undefined,
    numId: data["numId"] !== undefined ? String(data["numId"]) : undefined,
    state: data["state"] !== undefined ? serializeDeviceState(data["state"]) : undefined,
  };
}

function deserializeDevice(data: any): Device {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeDeviceConfig(data["config"]) : undefined,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (deserializeDeviceCredential(item))) : undefined,
    gatewayConfig: data["gatewayConfig"] !== undefined ? deserializeGatewayConfig(data["gatewayConfig"]) : undefined,
    lastConfigAckTime: data["lastConfigAckTime"] !== undefined ? new Date(data["lastConfigAckTime"]) : undefined,
    lastConfigSendTime: data["lastConfigSendTime"] !== undefined ? new Date(data["lastConfigSendTime"]) : undefined,
    lastErrorTime: data["lastErrorTime"] !== undefined ? new Date(data["lastErrorTime"]) : undefined,
    lastEventTime: data["lastEventTime"] !== undefined ? new Date(data["lastEventTime"]) : undefined,
    lastHeartbeatTime: data["lastHeartbeatTime"] !== undefined ? new Date(data["lastHeartbeatTime"]) : undefined,
    lastStateTime: data["lastStateTime"] !== undefined ? new Date(data["lastStateTime"]) : undefined,
    numId: data["numId"] !== undefined ? BigInt(data["numId"]) : undefined,
    state: data["state"] !== undefined ? deserializeDeviceState(data["state"]) : undefined,
  };
}

/**
 * The device configuration. Eventually delivered to devices.
 */
export interface DeviceConfig {
  /**
   * The device configuration data.
   */
  binaryData?: Uint8Array;
  /**
   * [Output only] The time at which this configuration version was updated in
   * Cloud IoT Core. This timestamp is set by the server.
   */
  cloudUpdateTime?: Date;
  /**
   * [Output only] The time at which Cloud IoT Core received the acknowledgment
   * from the device, indicating that the device has received this configuration
   * version. If this field is not present, the device has not yet acknowledged
   * that it received this version. Note that when the config was sent to the
   * device, many config versions may have been available in Cloud IoT Core
   * while the device was disconnected, and on connection, only the latest
   * version is sent to the device. Some versions may never be sent to the
   * device, and therefore are never acknowledged. This timestamp is set by
   * Cloud IoT Core.
   */
  deviceAckTime?: Date;
  /**
   * [Output only] The version of this update. The version number is assigned
   * by the server, and is always greater than 0 after device creation. The
   * version must be 0 on the `CreateDevice` request if a `config` is specified;
   * the response of `CreateDevice` will always have a value of 1.
   */
  version?: bigint;
}

function serializeDeviceConfig(data: any): DeviceConfig {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? encodeBase64(data["binaryData"]) : undefined,
    cloudUpdateTime: data["cloudUpdateTime"] !== undefined ? data["cloudUpdateTime"].toISOString() : undefined,
    deviceAckTime: data["deviceAckTime"] !== undefined ? data["deviceAckTime"].toISOString() : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeDeviceConfig(data: any): DeviceConfig {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? decodeBase64(data["binaryData"] as string) : undefined,
    cloudUpdateTime: data["cloudUpdateTime"] !== undefined ? new Date(data["cloudUpdateTime"]) : undefined,
    deviceAckTime: data["deviceAckTime"] !== undefined ? new Date(data["deviceAckTime"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * A server-stored device credential used for authentication.
 */
export interface DeviceCredential {
  /**
   * [Optional] The time at which this credential becomes invalid. This
   * credential will be ignored for new client authentication requests after
   * this timestamp; however, it will not be automatically deleted.
   */
  expirationTime?: Date;
  /**
   * A public key used to verify the signature of JSON Web Tokens (JWTs). When
   * adding a new device credential, either via device creation or via
   * modifications, this public key credential may be required to be signed by
   * one of the registry level certificates. More specifically, if the registry
   * contains at least one certificate, any new device credential must be signed
   * by one of the registry certificates. As a result, when the registry
   * contains certificates, only X.509 certificates are accepted as device
   * credentials. However, if the registry does not contain a certificate,
   * self-signed certificates and public keys will be accepted. New device
   * credentials must be different from every registry-level certificate.
   */
  publicKey?: PublicKeyCredential;
}

function serializeDeviceCredential(data: any): DeviceCredential {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializeDeviceCredential(data: any): DeviceCredential {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * A container for a group of devices.
 */
export interface DeviceRegistry {
  /**
   * The credentials used to verify the device credentials. No more than 10
   * credentials can be bound to a single registry at a time. The verification
   * process occurs at the time of device creation or update. If this field is
   * empty, no verification is performed. Otherwise, the credentials of a newly
   * created device or added credentials of an updated device should be signed
   * with one of these registry credentials. Note, however, that existing
   * devices will never be affected by modifications to this list of
   * credentials: after a device has been successfully created in a registry, it
   * should be able to connect even if its registry credentials are revoked,
   * deleted, or modified.
   */
  credentials?: RegistryCredential[];
  /**
   * The configuration for notification of telemetry events received from the
   * device. All telemetry events that were successfully published by the device
   * and acknowledged by Cloud IoT Core are guaranteed to be delivered to Cloud
   * Pub/Sub. If multiple configurations match a message, only the first
   * matching configuration is used. If you try to publish a device telemetry
   * event using MQTT without specifying a Cloud Pub/Sub topic for the device's
   * registry, the connection closes automatically. If you try to do so using an
   * HTTP connection, an error is returned. Up to 10 configurations may be
   * provided.
   */
  eventNotificationConfigs?: EventNotificationConfig[];
  /**
   * The DeviceService (HTTP) configuration for this device registry.
   */
  httpConfig?: HttpConfig;
  /**
   * The identifier of this device registry. For example, `myRegistry`.
   */
  id?: string;
  /**
   * **Beta Feature** The default logging verbosity for activity from devices
   * in this registry. The verbosity level can be overridden by
   * Device.log_level.
   */
  logLevel?:  | "LOG_LEVEL_UNSPECIFIED" | "NONE" | "ERROR" | "INFO" | "DEBUG";
  /**
   * The MQTT configuration for this device registry.
   */
  mqttConfig?: MqttConfig;
  /**
   * The resource path name. For example,
   * `projects/example-project/locations/us-central1/registries/my-registry`.
   */
  name?: string;
  /**
   * The configuration for notification of new states received from the device.
   * State updates are guaranteed to be stored in the state history, but
   * notifications to Cloud Pub/Sub are not guaranteed. For example, if
   * permissions are misconfigured or the specified topic doesn't exist, no
   * notification will be published but the state will still be stored in Cloud
   * IoT Core.
   */
  stateNotificationConfig?: StateNotificationConfig;
}

function serializeDeviceRegistry(data: any): DeviceRegistry {
  return {
    ...data,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (serializeRegistryCredential(item))) : undefined,
  };
}

function deserializeDeviceRegistry(data: any): DeviceRegistry {
  return {
    ...data,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (deserializeRegistryCredential(item))) : undefined,
  };
}

/**
 * The device state, as reported by the device.
 */
export interface DeviceState {
  /**
   * The device state data.
   */
  binaryData?: Uint8Array;
  /**
   * [Output only] The time at which this state version was updated in Cloud
   * IoT Core.
   */
  updateTime?: Date;
}

function serializeDeviceState(data: any): DeviceState {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? encodeBase64(data["binaryData"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeDeviceState(data: any): DeviceState {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? decodeBase64(data["binaryData"] as string) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
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
 * The configuration for forwarding telemetry events.
 */
export interface EventNotificationConfig {
  /**
   * A Cloud Pub/Sub topic name. For example,
   * `projects/myProject/topics/deviceEvents`.
   */
  pubsubTopicName?: string;
  /**
   * If the subfolder name matches this string exactly, this configuration will
   * be used. The string must not include the leading '/' character. If empty,
   * all strings are matched. This field is used only for telemetry events;
   * subfolders are not supported for state changes.
   */
  subfolderMatches?: string;
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
 * Gateway-related configuration and state.
 */
export interface GatewayConfig {
  /**
   * Indicates how to authorize and/or authenticate devices to access the
   * gateway.
   */
  gatewayAuthMethod?:  | "GATEWAY_AUTH_METHOD_UNSPECIFIED" | "ASSOCIATION_ONLY" | "DEVICE_AUTH_TOKEN_ONLY" | "ASSOCIATION_AND_DEVICE_AUTH_TOKEN";
  /**
   * Indicates whether the device is a gateway.
   */
  gatewayType?:  | "GATEWAY_TYPE_UNSPECIFIED" | "GATEWAY" | "NON_GATEWAY";
  /**
   * [Output only] The ID of the gateway the device accessed most recently.
   */
  lastAccessedGatewayId?: string;
  /**
   * [Output only] The most recent time at which the device accessed the
   * gateway specified in `last_accessed_gateway`.
   */
  lastAccessedGatewayTime?: Date;
}

function serializeGatewayConfig(data: any): GatewayConfig {
  return {
    ...data,
    lastAccessedGatewayTime: data["lastAccessedGatewayTime"] !== undefined ? data["lastAccessedGatewayTime"].toISOString() : undefined,
  };
}

function deserializeGatewayConfig(data: any): GatewayConfig {
  return {
    ...data,
    lastAccessedGatewayTime: data["lastAccessedGatewayTime"] !== undefined ? new Date(data["lastAccessedGatewayTime"]) : undefined,
  };
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
 * The configuration of the HTTP bridge for a device registry.
 */
export interface HttpConfig {
  /**
   * If enabled, allows devices to use DeviceService via the HTTP protocol.
   * Otherwise, any requests to DeviceService will fail for this registry.
   */
  httpEnabledState?:  | "HTTP_STATE_UNSPECIFIED" | "HTTP_ENABLED" | "HTTP_DISABLED";
}

/**
 * Response for `ListDeviceConfigVersions`.
 */
export interface ListDeviceConfigVersionsResponse {
  /**
   * The device configuration for the last few versions. Versions are listed in
   * decreasing order, starting from the most recent one.
   */
  deviceConfigs?: DeviceConfig[];
}

function serializeListDeviceConfigVersionsResponse(data: any): ListDeviceConfigVersionsResponse {
  return {
    ...data,
    deviceConfigs: data["deviceConfigs"] !== undefined ? data["deviceConfigs"].map((item: any) => (serializeDeviceConfig(item))) : undefined,
  };
}

function deserializeListDeviceConfigVersionsResponse(data: any): ListDeviceConfigVersionsResponse {
  return {
    ...data,
    deviceConfigs: data["deviceConfigs"] !== undefined ? data["deviceConfigs"].map((item: any) => (deserializeDeviceConfig(item))) : undefined,
  };
}

/**
 * Response for `ListDeviceRegistries`.
 */
export interface ListDeviceRegistriesResponse {
  /**
   * The registries that matched the query.
   */
  deviceRegistries?: DeviceRegistry[];
  /**
   * If not empty, indicates that there may be more registries that match the
   * request; this value should be passed in a new
   * `ListDeviceRegistriesRequest`.
   */
  nextPageToken?: string;
}

function serializeListDeviceRegistriesResponse(data: any): ListDeviceRegistriesResponse {
  return {
    ...data,
    deviceRegistries: data["deviceRegistries"] !== undefined ? data["deviceRegistries"].map((item: any) => (serializeDeviceRegistry(item))) : undefined,
  };
}

function deserializeListDeviceRegistriesResponse(data: any): ListDeviceRegistriesResponse {
  return {
    ...data,
    deviceRegistries: data["deviceRegistries"] !== undefined ? data["deviceRegistries"].map((item: any) => (deserializeDeviceRegistry(item))) : undefined,
  };
}

/**
 * Response for `ListDevices`.
 */
export interface ListDevicesResponse {
  /**
   * The devices that match the request.
   */
  devices?: Device[];
  /**
   * If not empty, indicates that there may be more devices that match the
   * request; this value should be passed in a new `ListDevicesRequest`.
   */
  nextPageToken?: string;
}

function serializeListDevicesResponse(data: any): ListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (serializeDevice(item))) : undefined,
  };
}

function deserializeListDevicesResponse(data: any): ListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (deserializeDevice(item))) : undefined,
  };
}

/**
 * Response for `ListDeviceStates`.
 */
export interface ListDeviceStatesResponse {
  /**
   * The last few device states. States are listed in descending order of
   * server update time, starting from the most recent one.
   */
  deviceStates?: DeviceState[];
}

function serializeListDeviceStatesResponse(data: any): ListDeviceStatesResponse {
  return {
    ...data,
    deviceStates: data["deviceStates"] !== undefined ? data["deviceStates"].map((item: any) => (serializeDeviceState(item))) : undefined,
  };
}

function deserializeListDeviceStatesResponse(data: any): ListDeviceStatesResponse {
  return {
    ...data,
    deviceStates: data["deviceStates"] !== undefined ? data["deviceStates"].map((item: any) => (deserializeDeviceState(item))) : undefined,
  };
}

/**
 * Request for `ModifyCloudToDeviceConfig`.
 */
export interface ModifyCloudToDeviceConfigRequest {
  /**
   * Required. The configuration data for the device.
   */
  binaryData?: Uint8Array;
  /**
   * The version number to update. If this value is zero, it will not check the
   * version number of the server and will always update the current version;
   * otherwise, this update will fail if the version number found on the server
   * does not match this version number. This is used to support multiple
   * simultaneous updates without losing data.
   */
  versionToUpdate?: bigint;
}

function serializeModifyCloudToDeviceConfigRequest(data: any): ModifyCloudToDeviceConfigRequest {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? encodeBase64(data["binaryData"]) : undefined,
    versionToUpdate: data["versionToUpdate"] !== undefined ? String(data["versionToUpdate"]) : undefined,
  };
}

function deserializeModifyCloudToDeviceConfigRequest(data: any): ModifyCloudToDeviceConfigRequest {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? decodeBase64(data["binaryData"] as string) : undefined,
    versionToUpdate: data["versionToUpdate"] !== undefined ? BigInt(data["versionToUpdate"]) : undefined,
  };
}

/**
 * The configuration of MQTT for a device registry.
 */
export interface MqttConfig {
  /**
   * If enabled, allows connections using the MQTT protocol. Otherwise, MQTT
   * connections to this registry will fail.
   */
  mqttEnabledState?:  | "MQTT_STATE_UNSPECIFIED" | "MQTT_ENABLED" | "MQTT_DISABLED";
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
 * Additional options for
 * CloudIoT#projectsLocationsRegistriesDevicesConfigVersionsList.
 */
export interface ProjectsLocationsRegistriesDevicesConfigVersionsListOptions {
  /**
   * The number of versions to list. Versions are listed in decreasing order of
   * the version number. The maximum number of versions retained is 10. If this
   * value is zero, it will return all the versions available.
   */
  numVersions?: number;
}

/**
 * Additional options for CloudIoT#projectsLocationsRegistriesDevicesGet.
 */
export interface ProjectsLocationsRegistriesDevicesGetOptions {
  /**
   * The fields of the `Device` resource to be returned in the response. If the
   * field mask is unset or empty, all fields are returned. Fields have to be
   * provided in snake_case format, for example: `last_heartbeat_time`.
   */
  fieldMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRegistriesDevicesGetOptions(data: any): ProjectsLocationsRegistriesDevicesGetOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistriesDevicesGetOptions(data: any): ProjectsLocationsRegistriesDevicesGetOptions {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for CloudIoT#projectsLocationsRegistriesDevicesList.
 */
export interface ProjectsLocationsRegistriesDevicesListOptions {
  /**
   * A list of device string IDs. For example, `['device0', 'device12']`. If
   * empty, this field is ignored. Maximum IDs: 10,000
   */
  deviceIds?: string;
  /**
   * A list of device numeric IDs. If empty, this field is ignored. Maximum
   * IDs: 10,000.
   */
  deviceNumIds?: bigint;
  /**
   * The fields of the `Device` resource to be returned in the response. The
   * fields `id` and `num_id` are always returned, along with any other fields
   * specified in snake_case format, for example: `last_heartbeat_time`.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * If set, returns only the gateways with which the specified device is
   * associated. The device ID can be numeric (`num_id`) or the user-defined
   * string (`id`). For example, if `456` is specified, returns only the
   * gateways to which the device with `num_id` 456 is bound.
   */
  ["gatewayListOptions.associationsDeviceId"]?: string;
  /**
   * If set, only devices associated with the specified gateway are returned.
   * The gateway ID can be numeric (`num_id`) or the user-defined string (`id`).
   * For example, if `123` is specified, only devices bound to the gateway with
   * `num_id` 123 are returned.
   */
  ["gatewayListOptions.associationsGatewayId"]?: string;
  /**
   * If `GATEWAY` is specified, only gateways are returned. If `NON_GATEWAY` is
   * specified, only non-gateway devices are returned. If
   * `GATEWAY_TYPE_UNSPECIFIED` is specified, all devices are returned.
   */
  ["gatewayListOptions.gatewayType"]?:  | "GATEWAY_TYPE_UNSPECIFIED" | "GATEWAY" | "NON_GATEWAY";
  /**
   * The maximum number of devices to return in the response. If this value is
   * zero, the service will select a default size. A call may return fewer
   * objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListDevicesResponse`; indicates that this
   * is a continuation of a prior `ListDevices` call and the system should
   * return the next page of data.
   */
  pageToken?: string;
}

function serializeProjectsLocationsRegistriesDevicesListOptions(data: any): ProjectsLocationsRegistriesDevicesListOptions {
  return {
    ...data,
    deviceNumIds: data["deviceNumIds"] !== undefined ? String(data["deviceNumIds"]) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistriesDevicesListOptions(data: any): ProjectsLocationsRegistriesDevicesListOptions {
  return {
    ...data,
    deviceNumIds: data["deviceNumIds"] !== undefined ? BigInt(data["deviceNumIds"]) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for CloudIoT#projectsLocationsRegistriesDevicesPatch.
 */
export interface ProjectsLocationsRegistriesDevicesPatchOptions {
  /**
   * Required. Only updates the `device` fields indicated by this mask. The
   * field mask must not be empty, and it must not contain fields that are
   * immutable or only set by the server. Mutable top-level fields:
   * `credentials`, `blocked`, and `metadata`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRegistriesDevicesPatchOptions(data: any): ProjectsLocationsRegistriesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistriesDevicesPatchOptions(data: any): ProjectsLocationsRegistriesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CloudIoT#projectsLocationsRegistriesDevicesStatesList.
 */
export interface ProjectsLocationsRegistriesDevicesStatesListOptions {
  /**
   * The number of states to list. States are listed in descending order of
   * update time. The maximum number of states retained is 10. If this value is
   * zero, it will return all the states available.
   */
  numStates?: number;
}

/**
 * Additional options for
 * CloudIoT#projectsLocationsRegistriesGroupsDevicesList.
 */
export interface ProjectsLocationsRegistriesGroupsDevicesListOptions {
  /**
   * A list of device string IDs. For example, `['device0', 'device12']`. If
   * empty, this field is ignored. Maximum IDs: 10,000
   */
  deviceIds?: string;
  /**
   * A list of device numeric IDs. If empty, this field is ignored. Maximum
   * IDs: 10,000.
   */
  deviceNumIds?: bigint;
  /**
   * The fields of the `Device` resource to be returned in the response. The
   * fields `id` and `num_id` are always returned, along with any other fields
   * specified in snake_case format, for example: `last_heartbeat_time`.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * If set, returns only the gateways with which the specified device is
   * associated. The device ID can be numeric (`num_id`) or the user-defined
   * string (`id`). For example, if `456` is specified, returns only the
   * gateways to which the device with `num_id` 456 is bound.
   */
  ["gatewayListOptions.associationsDeviceId"]?: string;
  /**
   * If set, only devices associated with the specified gateway are returned.
   * The gateway ID can be numeric (`num_id`) or the user-defined string (`id`).
   * For example, if `123` is specified, only devices bound to the gateway with
   * `num_id` 123 are returned.
   */
  ["gatewayListOptions.associationsGatewayId"]?: string;
  /**
   * If `GATEWAY` is specified, only gateways are returned. If `NON_GATEWAY` is
   * specified, only non-gateway devices are returned. If
   * `GATEWAY_TYPE_UNSPECIFIED` is specified, all devices are returned.
   */
  ["gatewayListOptions.gatewayType"]?:  | "GATEWAY_TYPE_UNSPECIFIED" | "GATEWAY" | "NON_GATEWAY";
  /**
   * The maximum number of devices to return in the response. If this value is
   * zero, the service will select a default size. A call may return fewer
   * objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListDevicesResponse`; indicates that this
   * is a continuation of a prior `ListDevices` call and the system should
   * return the next page of data.
   */
  pageToken?: string;
}

function serializeProjectsLocationsRegistriesGroupsDevicesListOptions(data: any): ProjectsLocationsRegistriesGroupsDevicesListOptions {
  return {
    ...data,
    deviceNumIds: data["deviceNumIds"] !== undefined ? String(data["deviceNumIds"]) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistriesGroupsDevicesListOptions(data: any): ProjectsLocationsRegistriesGroupsDevicesListOptions {
  return {
    ...data,
    deviceNumIds: data["deviceNumIds"] !== undefined ? BigInt(data["deviceNumIds"]) : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * Additional options for CloudIoT#projectsLocationsRegistriesList.
 */
export interface ProjectsLocationsRegistriesListOptions {
  /**
   * The maximum number of registries to return in the response. If this value
   * is zero, the service will select a default size. A call may return fewer
   * objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListDeviceRegistriesResponse`; indicates
   * that this is a continuation of a prior `ListDeviceRegistries` call and the
   * system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIoT#projectsLocationsRegistriesPatch.
 */
export interface ProjectsLocationsRegistriesPatchOptions {
  /**
   * Required. Only updates the `device_registry` fields indicated by this
   * mask. The field mask must not be empty, and it must not contain fields that
   * are immutable or only set by the server. Mutable top-level fields:
   * `event_notification_config`, `http_config`, `mqtt_config`, and
   * `state_notification_config`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRegistriesPatchOptions(data: any): ProjectsLocationsRegistriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistriesPatchOptions(data: any): ProjectsLocationsRegistriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A public key certificate format and data.
 */
export interface PublicKeyCertificate {
  /**
   * The certificate data.
   */
  certificate?: string;
  /**
   * The certificate format.
   */
  format?:  | "UNSPECIFIED_PUBLIC_KEY_CERTIFICATE_FORMAT" | "X509_CERTIFICATE_PEM";
  /**
   * [Output only] The certificate details. Used only for X.509 certificates.
   */
  x509Details?: X509CertificateDetails;
}

function serializePublicKeyCertificate(data: any): PublicKeyCertificate {
  return {
    ...data,
    x509Details: data["x509Details"] !== undefined ? serializeX509CertificateDetails(data["x509Details"]) : undefined,
  };
}

function deserializePublicKeyCertificate(data: any): PublicKeyCertificate {
  return {
    ...data,
    x509Details: data["x509Details"] !== undefined ? deserializeX509CertificateDetails(data["x509Details"]) : undefined,
  };
}

/**
 * A public key format and data.
 */
export interface PublicKeyCredential {
  /**
   * The format of the key.
   */
  format?:  | "UNSPECIFIED_PUBLIC_KEY_FORMAT" | "RSA_PEM" | "RSA_X509_PEM" | "ES256_PEM" | "ES256_X509_PEM";
  /**
   * The key data.
   */
  key?: string;
}

/**
 * A server-stored registry credential used to validate device credentials.
 */
export interface RegistryCredential {
  /**
   * A public key certificate used to verify the device credentials.
   */
  publicKeyCertificate?: PublicKeyCertificate;
}

function serializeRegistryCredential(data: any): RegistryCredential {
  return {
    ...data,
    publicKeyCertificate: data["publicKeyCertificate"] !== undefined ? serializePublicKeyCertificate(data["publicKeyCertificate"]) : undefined,
  };
}

function deserializeRegistryCredential(data: any): RegistryCredential {
  return {
    ...data,
    publicKeyCertificate: data["publicKeyCertificate"] !== undefined ? deserializePublicKeyCertificate(data["publicKeyCertificate"]) : undefined,
  };
}

/**
 * Request for `SendCommandToDevice`.
 */
export interface SendCommandToDeviceRequest {
  /**
   * Required. The command data to send to the device.
   */
  binaryData?: Uint8Array;
  /**
   * Optional subfolder for the command. If empty, the command will be
   * delivered to the /devices/{device-id}/commands topic, otherwise it will be
   * delivered to the /devices/{device-id}/commands/{subfolder} topic.
   * Multi-level subfolders are allowed. This field must not have more than 256
   * characters, and must not contain any MQTT wildcards ("+" or "#") or null
   * characters.
   */
  subfolder?: string;
}

function serializeSendCommandToDeviceRequest(data: any): SendCommandToDeviceRequest {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? encodeBase64(data["binaryData"]) : undefined,
  };
}

function deserializeSendCommandToDeviceRequest(data: any): SendCommandToDeviceRequest {
  return {
    ...data,
    binaryData: data["binaryData"] !== undefined ? decodeBase64(data["binaryData"] as string) : undefined,
  };
}

/**
 * Response for `SendCommandToDevice`.
 */
export interface SendCommandToDeviceResponse {
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
 * The configuration for notification of new states received from the device.
 */
export interface StateNotificationConfig {
  /**
   * A Cloud Pub/Sub topic name. For example,
   * `projects/myProject/topics/deviceEvents`.
   */
  pubsubTopicName?: string;
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
 * Request for `UnbindDeviceFromGateway`.
 */
export interface UnbindDeviceFromGatewayRequest {
  /**
   * Required. The device to disassociate from the specified gateway. The value
   * of `device_id` can be either the device numeric ID or the user-defined
   * device identifier.
   */
  deviceId?: string;
  /**
   * Required. The value of `gateway_id` can be either the device numeric ID or
   * the user-defined device identifier.
   */
  gatewayId?: string;
}

/**
 * Response for `UnbindDeviceFromGateway`.
 */
export interface UnbindDeviceFromGatewayResponse {
}

/**
 * Details of an X.509 certificate. For informational purposes only.
 */
export interface X509CertificateDetails {
  /**
   * The time the certificate becomes invalid.
   */
  expiryTime?: Date;
  /**
   * The entity that signed the certificate.
   */
  issuer?: string;
  /**
   * The type of public key in the certificate.
   */
  publicKeyType?: string;
  /**
   * The algorithm used to sign the certificate.
   */
  signatureAlgorithm?: string;
  /**
   * The time the certificate becomes valid.
   */
  startTime?: Date;
  /**
   * The entity the certificate and public key belong to.
   */
  subject?: string;
}

function serializeX509CertificateDetails(data: any): X509CertificateDetails {
  return {
    ...data,
    expiryTime: data["expiryTime"] !== undefined ? data["expiryTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeX509CertificateDetails(data: any): X509CertificateDetails {
  return {
    ...data,
    expiryTime: data["expiryTime"] !== undefined ? new Date(data["expiryTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
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
