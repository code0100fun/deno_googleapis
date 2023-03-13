// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Notifications API Client for Deno
 * =============================================
 * 
 * The My Business Notification Settings API enables managing notification settings for business accounts. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Notification Settings API enables managing notification
 * settings for business accounts. Note - If you have a quota of 0 after
 * enabling the API, please request for GBP API access.
 */
export class MyBusinessNotifications {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessnotifications.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the pubsub notification settings for the account.
   *
   * @param name Required. The resource name of the notification setting we are trying to fetch.
   */
  async accountsGetNotificationSetting(name: string): Promise<NotificationSetting> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NotificationSetting;
  }

  /**
   * Sets the pubsub notification setting for the account informing Google
   * which topic to send pubsub notifications for. Use the notification_types
   * field within notification_setting to manipulate the events an account wants
   * to subscribe to. An account will only have one notification setting
   * resource, and only one pubsub topic can be set. To delete the setting,
   * update with an empty notification_types
   *
   * @param name Required. The resource name this setting is for. This is of the form `accounts/{account_id}/notificationSetting`.
   */
  async accountsUpdateNotificationSetting(name: string, req: NotificationSetting, opts: AccountsUpdateNotificationSettingOptions = {}): Promise<NotificationSetting> {
    opts = serializeAccountsUpdateNotificationSettingOptions(opts);
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
    return data as NotificationSetting;
  }
}

/**
 * Additional options for
 * MyBusinessNotifications#accountsUpdateNotificationSetting.
 */
export interface AccountsUpdateNotificationSettingOptions {
  /**
   * Required. The specific fields that should be updated. The only editable
   * field is notification_setting.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsUpdateNotificationSettingOptions(data: any): AccountsUpdateNotificationSettingOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsUpdateNotificationSettingOptions(data: any): AccountsUpdateNotificationSettingOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A Google Pub/Sub topic where notifications can be published when a location
 * is updated or has a new review. There will be only one notification setting
 * resource per-account.
 */
export interface NotificationSetting {
  /**
   * Required. The resource name this setting is for. This is of the form
   * `accounts/{account_id}/notificationSetting`.
   */
  name?: string;
  /**
   * The types of notifications that will be sent to the Pub/Sub topic. To stop
   * receiving notifications entirely, use
   * NotificationSettings.UpdateNotificationSetting with an empty
   * notification_types or set the pubsub_topic to an empty string.
   */
  notificationTypes?:  | "NOTIFICATION_TYPE_UNSPECIFIED" | "GOOGLE_UPDATE" | "NEW_REVIEW" | "UPDATED_REVIEW" | "NEW_CUSTOMER_MEDIA" | "NEW_QUESTION" | "UPDATED_QUESTION" | "NEW_ANSWER" | "UPDATED_ANSWER" | "DUPLICATE_LOCATION" | "LOSS_OF_VOICE_OF_MERCHANT" | "VOICE_OF_MERCHANT_UPDATED"[];
  /**
   * Optional. The Google Pub/Sub topic that will receive notifications when
   * locations managed by this account are updated. If unset, no notifications
   * will be posted. The account
   * mybusiness-api-pubsub@system.gserviceaccount.com must have at least Publish
   * permissions on the Pub/Sub topic.
   */
  pubsubTopic?: string;
}