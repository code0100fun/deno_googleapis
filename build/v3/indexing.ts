// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Indexing API Client for Deno
 * ============================
 * 
 * Notifies Google when your web pages change.
 * 
 * Docs: https://developers.google.com/search/apis/indexing-api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Notifies Google when your web pages change.
 */
export class Indexing {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://indexing.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets metadata about a Web Document. This method can _only_ be used to
   * query URLs that were previously seen in successful Indexing API
   * notifications. Includes the latest `UrlNotification` received via this API.
   *
   */
  async urlNotificationsGetMetadata(opts: UrlNotificationsGetMetadataOptions = {}): Promise<UrlNotificationMetadata> {
    const url = new URL(`${this.#baseUrl}v3/urlNotifications/metadata`);
    if (opts.url !== undefined) {
      url.searchParams.append("url", String(opts.url));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUrlNotificationMetadata(data);
  }

  /**
   * Notifies that a URL has been updated or deleted.
   *
   */
  async urlNotificationsPublish(req: UrlNotification): Promise<PublishUrlNotificationResponse> {
    req = serializeUrlNotification(req);
    const url = new URL(`${this.#baseUrl}v3/urlNotifications:publish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePublishUrlNotificationResponse(data);
  }
}

/**
 * Output for PublishUrlNotification
 */
export interface PublishUrlNotificationResponse {
  /**
   * Description of the notification events received for this URL.
   */
  urlNotificationMetadata?: UrlNotificationMetadata;
}

function serializePublishUrlNotificationResponse(data: any): PublishUrlNotificationResponse {
  return {
    ...data,
    urlNotificationMetadata: data["urlNotificationMetadata"] !== undefined ? serializeUrlNotificationMetadata(data["urlNotificationMetadata"]) : undefined,
  };
}

function deserializePublishUrlNotificationResponse(data: any): PublishUrlNotificationResponse {
  return {
    ...data,
    urlNotificationMetadata: data["urlNotificationMetadata"] !== undefined ? deserializeUrlNotificationMetadata(data["urlNotificationMetadata"]) : undefined,
  };
}

/**
 * `UrlNotification` is the resource used in all Indexing API calls. It
 * describes one event in the life cycle of a Web Document.
 */
export interface UrlNotification {
  /**
   * Creation timestamp for this notification. Users should _not_ specify it,
   * the field is ignored at the request time.
   */
  notifyTime?: Date;
  /**
   * The URL life cycle event that Google is being notified about.
   */
  type?:  | "URL_NOTIFICATION_TYPE_UNSPECIFIED" | "URL_UPDATED" | "URL_DELETED";
  /**
   * The object of this notification. The URL must be owned by the publisher of
   * this notification and, in case of `URL_UPDATED` notifications, it _must_ be
   * crawlable by Google.
   */
  url?: string;
}

function serializeUrlNotification(data: any): UrlNotification {
  return {
    ...data,
    notifyTime: data["notifyTime"] !== undefined ? data["notifyTime"].toISOString() : undefined,
  };
}

function deserializeUrlNotification(data: any): UrlNotification {
  return {
    ...data,
    notifyTime: data["notifyTime"] !== undefined ? new Date(data["notifyTime"]) : undefined,
  };
}

/**
 * Summary of the most recent Indexing API notifications successfully received,
 * for a given URL.
 */
export interface UrlNotificationMetadata {
  /**
   * Latest notification received with type `URL_REMOVED`.
   */
  latestRemove?: UrlNotification;
  /**
   * Latest notification received with type `URL_UPDATED`.
   */
  latestUpdate?: UrlNotification;
  /**
   * URL to which this metadata refers.
   */
  url?: string;
}

function serializeUrlNotificationMetadata(data: any): UrlNotificationMetadata {
  return {
    ...data,
    latestRemove: data["latestRemove"] !== undefined ? serializeUrlNotification(data["latestRemove"]) : undefined,
    latestUpdate: data["latestUpdate"] !== undefined ? serializeUrlNotification(data["latestUpdate"]) : undefined,
  };
}

function deserializeUrlNotificationMetadata(data: any): UrlNotificationMetadata {
  return {
    ...data,
    latestRemove: data["latestRemove"] !== undefined ? deserializeUrlNotification(data["latestRemove"]) : undefined,
    latestUpdate: data["latestUpdate"] !== undefined ? deserializeUrlNotification(data["latestUpdate"]) : undefined,
  };
}

/**
 * Additional options for Indexing#urlNotificationsGetMetadata.
 */
export interface UrlNotificationsGetMetadataOptions {
  /**
   * URL that is being queried.
   */
  url?: string;
}