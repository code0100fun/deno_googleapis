// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase Cloud Messaging Data API Client for Deno
 * =================================================
 * 
 * Provides additional information about Firebase Cloud Messaging (FCM) message sends and deliveries.
 * 
 * Docs: https://firebase.google.com/docs/cloud-messaging
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides additional information about Firebase Cloud Messaging (FCM) message
 * sends and deliveries.
 */
export class fcmData {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://fcmdata.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * List aggregate delivery data for the given Android application.
   *
   * @param parent Required. The application for which to list delivery data. Format: `projects/{project_id}/androidApps/{app_id}`
   */
  async projectsAndroidAppsDeliveryDataList(parent: string, opts: ProjectsAndroidAppsDeliveryDataListOptions = {}): Promise<GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/deliveryData`);
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
    return deserializeGoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse(data);
  }
}

/**
 * Message delivery data for a given date, app, and analytics label
 * combination.
 */
export interface GoogleFirebaseFcmDataV1beta1AndroidDeliveryData {
  /**
   * The analytics label associated with the messages sent. All messages sent
   * without an analytics label will be grouped together in a single entry.
   */
  analyticsLabel?: string;
  /**
   * The app ID to which the messages were sent.
   */
  appId?: string;
  /**
   * The data for the specified appId, date, and analyticsLabel.
   */
  data?: GoogleFirebaseFcmDataV1beta1Data;
  /**
   * The date represented by this entry.
   */
  date?: GoogleTypeDate;
}

function serializeGoogleFirebaseFcmDataV1beta1AndroidDeliveryData(data: any): GoogleFirebaseFcmDataV1beta1AndroidDeliveryData {
  return {
    ...data,
    data: data["data"] !== undefined ? serializeGoogleFirebaseFcmDataV1beta1Data(data["data"]) : undefined,
  };
}

function deserializeGoogleFirebaseFcmDataV1beta1AndroidDeliveryData(data: any): GoogleFirebaseFcmDataV1beta1AndroidDeliveryData {
  return {
    ...data,
    data: data["data"] !== undefined ? deserializeGoogleFirebaseFcmDataV1beta1Data(data["data"]) : undefined,
  };
}

/**
 * Data detailing messaging delivery
 */
export interface GoogleFirebaseFcmDataV1beta1Data {
  /**
   * Count of messages accepted by FCM intended to Android devices. The
   * targeted device must have opted in to the collection of usage and
   * diagnostic information.
   */
  countMessagesAccepted?: bigint;
  /**
   * Additional information about delivery performance for messages that were
   * successfully delivered.
   */
  deliveryPerformancePercents?: GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents;
  /**
   * Additional general insights about message delivery.
   */
  messageInsightPercents?: GoogleFirebaseFcmDataV1beta1MessageInsightPercents;
  /**
   * Mutually exclusive breakdown of message delivery outcomes.
   */
  messageOutcomePercents?: GoogleFirebaseFcmDataV1beta1MessageOutcomePercents;
}

function serializeGoogleFirebaseFcmDataV1beta1Data(data: any): GoogleFirebaseFcmDataV1beta1Data {
  return {
    ...data,
    countMessagesAccepted: data["countMessagesAccepted"] !== undefined ? String(data["countMessagesAccepted"]) : undefined,
  };
}

function deserializeGoogleFirebaseFcmDataV1beta1Data(data: any): GoogleFirebaseFcmDataV1beta1Data {
  return {
    ...data,
    countMessagesAccepted: data["countMessagesAccepted"] !== undefined ? BigInt(data["countMessagesAccepted"]) : undefined,
  };
}

/**
 * Overview of delivery performance for messages that were successfully
 * delivered. All percentages are calculated with countMessagesAccepted as the
 * denominator. These categories are not mutually exclusive; a message can be
 * delayed for multiple reasons.
 */
export interface GoogleFirebaseFcmDataV1beta1DeliveryPerformancePercents {
  /**
   * The percentage of accepted messages that were delayed because the device
   * was in doze mode. Only [normal priority
   * messages](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)
   * should be delayed due to doze mode.
   */
  delayedDeviceDoze?: number;
  /**
   * The percentage of accepted messages that were delayed because the target
   * device was not connected at the time of sending. These messages were
   * eventually delivered when the device reconnected.
   */
  delayedDeviceOffline?: number;
  /**
   * The percentage of accepted messages that were delayed due to message
   * throttling, such as [collapsible message
   * throttling](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_throttling)
   * or [maximum message rate
   * throttling](https://firebase.google.com/docs/cloud-messaging/concept-options#device_throttling).
   */
  delayedMessageThrottled?: number;
  /**
   * The percentage of accepted messages that were delayed because the intended
   * device user-profile was
   * [stopped](https://firebase.google.com/docs/cloud-messaging/android/receive#handling_messages)
   * on the target device at the time of the send. The messages were eventually
   * delivered when the user-profile was started again.
   */
  delayedUserStopped?: number;
  /**
   * The percentage of accepted messages that were delivered to the device
   * without delay from the FCM system.
   */
  deliveredNoDelay?: number;
}

/**
 * Response message for ListAndroidDeliveryData.
 */
export interface GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse {
  /**
   * The delivery data for the provided app. There will be one entry per
   * combination of app, date, and analytics label.
   */
  androidDeliveryData?: GoogleFirebaseFcmDataV1beta1AndroidDeliveryData[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeGoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse(data: any): GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse {
  return {
    ...data,
    androidDeliveryData: data["androidDeliveryData"] !== undefined ? data["androidDeliveryData"].map((item: any) => (serializeGoogleFirebaseFcmDataV1beta1AndroidDeliveryData(item))) : undefined,
  };
}

function deserializeGoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse(data: any): GoogleFirebaseFcmDataV1beta1ListAndroidDeliveryDataResponse {
  return {
    ...data,
    androidDeliveryData: data["androidDeliveryData"] !== undefined ? data["androidDeliveryData"].map((item: any) => (deserializeGoogleFirebaseFcmDataV1beta1AndroidDeliveryData(item))) : undefined,
  };
}

/**
 * Additional information about message delivery. All percentages are
 * calculated with countMessagesAccepted as the denominator.
 */
export interface GoogleFirebaseFcmDataV1beta1MessageInsightPercents {
  /**
   * The percentage of accepted messages that had their priority lowered from
   * high to normal. See [documentation for setting message
   * priority](https://firebase.google.com/docs/cloud-messaging/android/message-priority).
   */
  priorityLowered?: number;
}

/**
 * Percentage breakdown of message delivery outcomes. These categories are
 * mutually exclusive. All percentages are calculated with countMessagesAccepted
 * as the denominator. These categories may not account for all message
 * outcomes.
 */
export interface GoogleFirebaseFcmDataV1beta1MessageOutcomePercents {
  /**
   * The percentage of all accepted messages that were successfully delivered
   * to the device.
   */
  delivered?: number;
  /**
   * The percentage of accepted messages that were dropped because the
   * application was force stopped on the device at the time of delivery and
   * retries were unsuccessful.
   */
  droppedAppForceStopped?: number;
  /**
   * The percentage of accepted messages that were dropped because the target
   * device is inactive. FCM will drop messages if the target device is deemed
   * inactive by our servers. If a device does reconnect, we call
   * [OnDeletedMessages()](https://firebase.google.com/docs/cloud-messaging/android/receive#override-ondeletedmessages)
   * in our SDK instead of delivering the messages.
   */
  droppedDeviceInactive?: number;
  /**
   * The percentage of accepted messages that were dropped due to [too many
   * undelivered non-collapsible
   * messages](https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages).
   * Specifically, each app instance can only have 100 pending messages stored
   * on our servers for a device which is disconnected. When that device
   * reconnects, those messages are delivered. When there are more than the
   * maximum pending messages, we call
   * [OnDeletedMessages()](https://firebase.google.com/docs/cloud-messaging/android/receive#override-ondeletedmessages)
   * in our SDK instead of delivering the messages.
   */
  droppedTooManyPendingMessages?: number;
  /**
   * The percentage of messages accepted on this day that were not dropped and
   * not delivered, due to the device being disconnected (as of the end of the
   * America/Los_Angeles day when the message was sent to FCM). A portion of
   * these messages will be delivered the next day when the device connects but
   * others may be destined to devices that ultimately never reconnect.
   */
  pending?: number;
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface GoogleTypeDate {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
}

/**
 * Additional options for fcmData#projectsAndroidAppsDeliveryDataList.
 */
export interface ProjectsAndroidAppsDeliveryDataListOptions {
  /**
   * The maximum number of entries to return. The service may return fewer than
   * this value. If unspecified, at most 1,000 entries will be returned. The
   * maximum value is 10,000; values above 10,000 will be capped to 10,000. This
   * default may change over time.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAndroidDeliveryDataRequest`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListAndroidDeliveryDataRequest` must match
   * the call that provided the page token.
   */
  pageToken?: string;
}