// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * HomeGraph API Client for Deno
 * =============================
 * 
 * 
 * 
 * Docs: https://developers.home.google.com/cloud-to-cloud/get-started
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class HomeGraph {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://homegraph.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Unlinks the given third-party user from your smart home Action. All data
   * related to this user will be deleted. For more details on how users link
   * their accounts, see [fulfillment and
   * authentication](https://developers.home.google.com/cloud-to-cloud/primer/fulfillment).
   * The third-party user's identity is passed in via the `agent_user_id` (see
   * DeleteAgentUserRequest). This request must be authorized using service
   * account credentials from your Actions console project.
   *
   * @param agentUserId Required. Third-party user ID.
   */
  async agentUsersDelete(agentUserId: string, opts: AgentUsersDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ agentUserId }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the current states in Home Graph for the given set of the third-party
   * user's devices. The third-party user's identity is passed in via the
   * `agent_user_id` (see QueryRequest). This request must be authorized using
   * service account credentials from your Actions console project.
   *
   */
  async devicesQuery(req: QueryRequest): Promise<QueryResponse> {
    const url = new URL(`${this.#baseUrl}v1/devices:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as QueryResponse;
  }

  /**
   * Reports device state and optionally sends device notifications. Called by
   * your smart home Action when the state of a third-party device changes or
   * you need to send a notification about the device. See [Implement Report
   * State](https://developers.home.google.com/cloud-to-cloud/integration/report-state)
   * for more information. This method updates the device state according to its
   * declared
   * [traits](https://developers.home.google.com/cloud-to-cloud/primer/device-types-and-traits).
   * Publishing a new state value outside of these traits will result in an
   * `INVALID_ARGUMENT` error response. The third-party user's identity is
   * passed in via the `agent_user_id` (see ReportStateAndNotificationRequest).
   * This request must be authorized using service account credentials from your
   * Actions console project.
   *
   */
  async devicesReportStateAndNotification(req: ReportStateAndNotificationRequest): Promise<ReportStateAndNotificationResponse> {
    const url = new URL(`${this.#baseUrl}v1/devices:reportStateAndNotification`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReportStateAndNotificationResponse;
  }

  /**
   * Requests Google to send an `action.devices.SYNC`
   * [intent](https://developers.home.google.com/cloud-to-cloud/intents/sync) to
   * your smart home Action to update device metadata for the given user. The
   * third-party user's identity is passed via the `agent_user_id` (see
   * RequestSyncDevicesRequest). This request must be authorized using service
   * account credentials from your Actions console project.
   *
   */
  async devicesRequestSync(req: RequestSyncDevicesRequest): Promise<RequestSyncDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/devices:requestSync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RequestSyncDevicesResponse;
  }

  /**
   * Gets all the devices associated with the given third-party user. The
   * third-party user's identity is passed in via the `agent_user_id` (see
   * SyncRequest). This request must be authorized using service account
   * credentials from your Actions console project.
   *
   */
  async devicesSync(req: SyncRequest): Promise<SyncResponse> {
    const url = new URL(`${this.#baseUrl}v1/devices:sync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SyncResponse;
  }
}

/**
 * Third-party device ID for one device.
 */
export interface AgentDeviceId {
  /**
   * Third-party device ID.
   */
  id?: string;
}

/**
 * Alternate third-party device ID.
 */
export interface AgentOtherDeviceId {
  /**
   * Project ID for your smart home Action.
   */
  agentId?: string;
  /**
   * Unique third-party device ID.
   */
  deviceId?: string;
}

/**
 * Additional options for HomeGraph#agentUsersDelete.
 */
export interface AgentUsersDeleteOptions {
  /**
   * Request ID used for debugging.
   */
  requestId?: string;
}

/**
 * Third-party device definition.
 */
export interface Device {
  /**
   * Attributes for the traits supported by the device.
   */
  attributes?: {
    [key: string]: any
  };
  /**
   * Custom device attributes stored in Home Graph and provided to your smart
   * home Action in each
   * [QUERY](https://developers.home.google.com/cloud-to-cloud/intents/query)
   * and
   * [EXECUTE](https://developers.home.google.com/cloud-to-cloud/intents/execute)
   * intent. Data in this object has a few constraints: No sensitive
   * information, including but not limited to Personally Identifiable
   * Information.
   */
  customData?: {
    [key: string]: any
  };
  /**
   * Device manufacturer, model, hardware version, and software version.
   */
  deviceInfo?: DeviceInfo;
  /**
   * Third-party device ID.
   */
  id?: string;
  /**
   * Names given to this device by your smart home Action.
   */
  name?: DeviceNames;
  /**
   * Indicates whether your smart home Action will report notifications to
   * Google for this device via ReportStateAndNotification. If your smart home
   * Action enables users to control device notifications, you should update
   * this field and call RequestSyncDevices.
   */
  notificationSupportedByAgent?: boolean;
  /**
   * Alternate IDs associated with this device. This is used to identify cloud
   * synced devices enabled for [local
   * fulfillment](https://developers.home.google.com/local-home/overview).
   */
  otherDeviceIds?: AgentOtherDeviceId[];
  /**
   * Suggested name for the room where this device is installed. Google
   * attempts to use this value during user setup.
   */
  roomHint?: string;
  /**
   * Suggested name for the structure where this device is installed. Google
   * attempts to use this value during user setup.
   */
  structureHint?: string;
  /**
   * Traits supported by the device. See [device
   * traits](https://developers.home.google.com/cloud-to-cloud/traits).
   */
  traits?: string[];
  /**
   * Hardware type of the device. See [device
   * types](https://developers.home.google.com/cloud-to-cloud/guides).
   */
  type?: string;
  /**
   * Indicates whether your smart home Action will report state of this device
   * to Google via ReportStateAndNotification.
   */
  willReportState?: boolean;
}

/**
 * Device information.
 */
export interface DeviceInfo {
  /**
   * Device hardware version.
   */
  hwVersion?: string;
  /**
   * Device manufacturer.
   */
  manufacturer?: string;
  /**
   * Device model.
   */
  model?: string;
  /**
   * Device software version.
   */
  swVersion?: string;
}

/**
 * Identifiers used to describe the device.
 */
export interface DeviceNames {
  /**
   * List of names provided by the manufacturer rather than the user, such as
   * serial numbers, SKUs, etc.
   */
  defaultNames?: string[];
  /**
   * Primary name of the device, generally provided by the user.
   */
  name?: string;
  /**
   * Additional names provided by the user for the device.
   */
  nicknames?: string[];
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
 * Request type for the
 * [`Query`](#google.home.graph.v1.HomeGraphApiService.Query) call.
 */
export interface QueryRequest {
  /**
   * Required. Third-party user ID.
   */
  agentUserId?: string;
  /**
   * Required. Inputs containing third-party device IDs for which to get the
   * device states.
   */
  inputs?: QueryRequestInput[];
  /**
   * Request ID used for debugging.
   */
  requestId?: string;
}

/**
 * Device ID inputs to QueryRequest.
 */
export interface QueryRequestInput {
  /**
   * Payload containing third-party device IDs.
   */
  payload?: QueryRequestPayload;
}

/**
 * Payload containing device IDs.
 */
export interface QueryRequestPayload {
  /**
   * Third-party device IDs for which to get the device states.
   */
  devices?: AgentDeviceId[];
}

/**
 * Response type for the
 * [`Query`](#google.home.graph.v1.HomeGraphApiService.Query) call. This should
 * follow the same format as the Google smart home `action.devices.QUERY`
 * [response](https://developers.home.google.com/cloud-to-cloud/intents/query).
 * Example: ```json { "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
 * "payload": { "devices": { "123": { "on": true, "online": true }, "456": {
 * "on": true, "online": true, "brightness": 80, "color": { "name": "cerulean",
 * "spectrumRGB": 31655 } } } } } ```
 */
export interface QueryResponse {
  /**
   * Device states for the devices given in the request.
   */
  payload?: QueryResponsePayload;
  /**
   * Request ID used for debugging. Copied from the request.
   */
  requestId?: string;
}

/**
 * Payload containing device states information.
 */
export interface QueryResponsePayload {
  /**
   * States of the devices. Map of third-party device ID to struct of device
   * states.
   */
  devices?: {
    [key: string]: {
      [key: string]: any
    }
  };
}

/**
 * The states and notifications specific to a device.
 */
export interface ReportStateAndNotificationDevice {
  /**
   * Notifications metadata for devices. See the **Device NOTIFICATIONS**
   * section of the individual trait [reference
   * guides](https://developers.home.google.com/cloud-to-cloud/traits).
   */
  notifications?: {
    [key: string]: any
  };
  /**
   * States of devices to update. See the **Device STATES** section of the
   * individual trait [reference
   * guides](https://developers.home.google.com/cloud-to-cloud/traits).
   */
  states?: {
    [key: string]: any
  };
}

/**
 * Request type for the
 * [`ReportStateAndNotification`](#google.home.graph.v1.HomeGraphApiService.ReportStateAndNotification)
 * call. It may include states, notifications, or both. States and notifications
 * are defined per `device_id` (for example, "123" and "456" in the following
 * example). Example: ```json { "requestId":
 * "ff36a3cc-ec34-11e6-b1a0-64510650abcf", "agentUserId": "1234", "payload": {
 * "devices": { "states": { "123": { "on": true }, "456": { "on": true,
 * "brightness": 10 } }, } } } ```
 */
export interface ReportStateAndNotificationRequest {
  /**
   * Required. Third-party user ID.
   */
  agentUserId?: string;
  /**
   * Unique identifier per event (for example, a doorbell press).
   */
  eventId?: string;
  /**
   * Deprecated.
   */
  followUpToken?: string;
  /**
   * Required. State of devices to update and notification metadata for
   * devices.
   */
  payload?: StateAndNotificationPayload;
  /**
   * Request ID used for debugging.
   */
  requestId?: string;
}

/**
 * Response type for the
 * [`ReportStateAndNotification`](#google.home.graph.v1.HomeGraphApiService.ReportStateAndNotification)
 * call.
 */
export interface ReportStateAndNotificationResponse {
  /**
   * Request ID copied from ReportStateAndNotificationRequest.
   */
  requestId?: string;
}

/**
 * Request type for the
 * [`RequestSyncDevices`](#google.home.graph.v1.HomeGraphApiService.RequestSyncDevices)
 * call.
 */
export interface RequestSyncDevicesRequest {
  /**
   * Required. Third-party user ID.
   */
  agentUserId?: string;
  /**
   * Optional. If set, the request will be added to a queue and a response will
   * be returned immediately. This enables concurrent requests for the given
   * `agent_user_id`, but the caller will not receive any error responses.
   */
  async?: boolean;
}

/**
 * Response type for the
 * [`RequestSyncDevices`](#google.home.graph.v1.HomeGraphApiService.RequestSyncDevices)
 * call. Intentionally empty upon success. An HTTP response code is returned
 * with more details upon failure.
 */
export interface RequestSyncDevicesResponse {
}

/**
 * Payload containing the state and notification information for devices.
 */
export interface StateAndNotificationPayload {
  /**
   * The devices for updating state and sending notifications.
   */
  devices?: ReportStateAndNotificationDevice;
}

/**
 * Request type for the
 * [`Sync`](#google.home.graph.v1.HomeGraphApiService.Sync) call.
 */
export interface SyncRequest {
  /**
   * Required. Third-party user ID.
   */
  agentUserId?: string;
  /**
   * Request ID used for debugging.
   */
  requestId?: string;
}

/**
 * Response type for the
 * [`Sync`](#google.home.graph.v1.HomeGraphApiService.Sync) call. This should
 * follow the same format as the Google smart home `action.devices.SYNC`
 * [response](https://developers.home.google.com/cloud-to-cloud/intents/sync).
 * Example: ```json { "requestId": "ff36a3cc-ec34-11e6-b1a0-64510650abcf",
 * "payload": { "agentUserId": "1836.15267389", "devices": [{ "id": "123",
 * "type": "action.devices.types.OUTLET", "traits": [
 * "action.devices.traits.OnOff" ], "name": { "defaultNames": ["My Outlet
 * 1234"], "name": "Night light", "nicknames": ["wall plug"] },
 * "willReportState": false, "deviceInfo": { "manufacturer": "lights-out-inc",
 * "model": "hs1234", "hwVersion": "3.2", "swVersion": "11.4" }, "customData": {
 * "fooValue": 74, "barValue": true, "bazValue": "foo" } }] } } ```
 */
export interface SyncResponse {
  /**
   * Devices associated with the third-party user.
   */
  payload?: SyncResponsePayload;
  /**
   * Request ID used for debugging. Copied from the request.
   */
  requestId?: string;
}

/**
 * Payload containing device information.
 */
export interface SyncResponsePayload {
  /**
   * Third-party user ID
   */
  agentUserId?: string;
  /**
   * Devices associated with the third-party user.
   */
  devices?: Device[];
}