// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Advisory Notifications API Client for Deno
 * ==========================================
 * 
 * An API for accessing Advisory Notifications in Google Cloud
 * 
 * Docs: https://cloud.google.com/advisory-notifications
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API for accessing Advisory Notifications in Google Cloud
 */
export class AdvisoryNotifications {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://advisorynotifications.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a notification.
   *
   * @param name Required. A name of the notification to retrieve. Format: organizations/{organization}/locations/{location}/notifications/{notification}.
   */
  async organizationsLocationsNotificationsGet(name: string, opts: OrganizationsLocationsNotificationsGetOptions = {}): Promise<GoogleCloudAdvisorynotificationsV1Notification> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudAdvisorynotificationsV1Notification(data);
  }

  /**
   * Lists notifications under a given parent.
   *
   * @param parent Required. The parent, which owns this collection of notifications. Must be of the form "organizations/{organization}/locations/{location}".
   */
  async organizationsLocationsNotificationsList(parent: string, opts: OrganizationsLocationsNotificationsListOptions = {}): Promise<GoogleCloudAdvisorynotificationsV1ListNotificationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notifications`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudAdvisorynotificationsV1ListNotificationsResponse(data);
  }
}

/**
 * Attachment with specific information about the issue.
 */
export interface GoogleCloudAdvisorynotificationsV1Attachment {
  /**
   * A CSV file attachment. Max size is 10 MB.
   */
  csv?: GoogleCloudAdvisorynotificationsV1Csv;
  /**
   * The title of the attachment.
   */
  displayName?: string;
}

/**
 * A representation of a CSV file attachment, as a list of column headers and a
 * list of data rows.
 */
export interface GoogleCloudAdvisorynotificationsV1Csv {
  /**
   * The list of data rows in a CSV file, as string arrays rather than as a
   * single comma-separated string.
   */
  dataRows?: GoogleCloudAdvisorynotificationsV1CsvCsvRow[];
  /**
   * The list of headers for data columns in a CSV file.
   */
  headers?: string[];
}

/**
 * A representation of a single data row in a CSV file.
 */
export interface GoogleCloudAdvisorynotificationsV1CsvCsvRow {
  /**
   * The data entries in a CSV file row, as a string array rather than a single
   * comma-separated string.
   */
  entries?: string[];
}

/**
 * Response of ListNotifications endpoint.
 */
export interface GoogleCloudAdvisorynotificationsV1ListNotificationsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of notifications under a given parent.
   */
  notifications?: GoogleCloudAdvisorynotificationsV1Notification[];
  /**
   * Estimation of a total number of notifications.
   */
  totalSize?: number;
}

function serializeGoogleCloudAdvisorynotificationsV1ListNotificationsResponse(data: any): GoogleCloudAdvisorynotificationsV1ListNotificationsResponse {
  return {
    ...data,
    notifications: data["notifications"] !== undefined ? data["notifications"].map((item: any) => (serializeGoogleCloudAdvisorynotificationsV1Notification(item))) : undefined,
  };
}

function deserializeGoogleCloudAdvisorynotificationsV1ListNotificationsResponse(data: any): GoogleCloudAdvisorynotificationsV1ListNotificationsResponse {
  return {
    ...data,
    notifications: data["notifications"] !== undefined ? data["notifications"].map((item: any) => (deserializeGoogleCloudAdvisorynotificationsV1Notification(item))) : undefined,
  };
}

/**
 * A message which contains notification details.
 */
export interface GoogleCloudAdvisorynotificationsV1Message {
  /**
   * The attachments to download.
   */
  attachments?: GoogleCloudAdvisorynotificationsV1Attachment[];
  /**
   * The message content.
   */
  body?: GoogleCloudAdvisorynotificationsV1MessageBody;
  /**
   * The Message creation timestamp.
   */
  createTime?: Date;
  /**
   * Time when Message was localized
   */
  localizationTime?: Date;
}

function serializeGoogleCloudAdvisorynotificationsV1Message(data: any): GoogleCloudAdvisorynotificationsV1Message {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    localizationTime: data["localizationTime"] !== undefined ? data["localizationTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudAdvisorynotificationsV1Message(data: any): GoogleCloudAdvisorynotificationsV1Message {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    localizationTime: data["localizationTime"] !== undefined ? new Date(data["localizationTime"]) : undefined,
  };
}

/**
 * A message body containing text.
 */
export interface GoogleCloudAdvisorynotificationsV1MessageBody {
  /**
   * The text content of the message body.
   */
  text?: GoogleCloudAdvisorynotificationsV1Text;
}

/**
 * A notification object for notifying customers about security and privacy
 * issues.
 */
export interface GoogleCloudAdvisorynotificationsV1Notification {
  /**
   * Output only. Time the notification was created.
   */
  readonly createTime?: Date;
  /**
   * A list of messages in the notification.
   */
  messages?: GoogleCloudAdvisorynotificationsV1Message[];
  /**
   * The resource name of the notification. Format:
   * organizations/{organization}/locations/{location}/notifications/{notification}.
   */
  name?: string;
  /**
   * The subject line of the notification.
   */
  subject?: GoogleCloudAdvisorynotificationsV1Subject;
}

function serializeGoogleCloudAdvisorynotificationsV1Notification(data: any): GoogleCloudAdvisorynotificationsV1Notification {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeGoogleCloudAdvisorynotificationsV1Message(item))) : undefined,
  };
}

function deserializeGoogleCloudAdvisorynotificationsV1Notification(data: any): GoogleCloudAdvisorynotificationsV1Notification {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeGoogleCloudAdvisorynotificationsV1Message(item))) : undefined,
  };
}

/**
 * A subject line of a notification.
 */
export interface GoogleCloudAdvisorynotificationsV1Subject {
  /**
   * The text content.
   */
  text?: GoogleCloudAdvisorynotificationsV1Text;
}

/**
 * A text object containing the English text and its localized copies.
 */
export interface GoogleCloudAdvisorynotificationsV1Text {
  /**
   * The English copy.
   */
  enText?: string;
  /**
   * Status of the localization.
   */
  localizationState?:  | "LOCALIZATION_STATE_UNSPECIFIED" | "LOCALIZATION_STATE_NOT_APPLICABLE" | "LOCALIZATION_STATE_PENDING" | "LOCALIZATION_STATE_COMPLETED";
  /**
   * The requested localized copy (if applicable).
   */
  localizedText?: string;
}

/**
 * Additional options for
 * AdvisoryNotifications#organizationsLocationsNotificationsGet.
 */
export interface OrganizationsLocationsNotificationsGetOptions {
  /**
   * ISO code for requested localization language. If unset, will be
   * interpereted as "en". If the requested language is valid, but not supported
   * for this notification, English will be returned with an "Not applicable"
   * LocalizationState. If the ISO code is invalid (i.e. not a real language),
   * this RPC will throw an error.
   */
  languageCode?: string;
}

/**
 * Additional options for
 * AdvisoryNotifications#organizationsLocationsNotificationsList.
 */
export interface OrganizationsLocationsNotificationsListOptions {
  /**
   * ISO code for requested localization language. If unset, will be
   * interpereted as "en". If the requested language is valid, but not supported
   * for this notification, English will be returned with an "Not applicable"
   * LocalizationState. If the ISO code is invalid (i.e. not a real language),
   * this RPC will throw an error.
   */
  languageCode?: string;
  /**
   * The maximum number of notifications to return. The service may return
   * fewer than this value. If unspecified or equal to 0, at most 50
   * notifications will be returned. The maximum value is 50; values above 50
   * will be coerced to 50.
   */
  pageSize?: number;
  /**
   * A page token returned from a previous request. When paginating, all other
   * parameters provided in the request must match the call that returned the
   * page token.
   */
  pageToken?: string;
  /**
   * Specifies which parts of the notification resource should be returned in
   * the response.
   */
  view?:  | "NOTIFICATION_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}