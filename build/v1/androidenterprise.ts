// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play EMM API Client for Deno
 * ===================================
 * 
 * Manages the deployment of apps to Android Enterprise devices.
 * 
 * Docs: https://developers.google.com/android/work/play/emm-api
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages the deployment of apps to Android Enterprise devices.
 */
export class androidenterprise {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://androidenterprise.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Uploads a report containing any changes in app states on the device since
   * the last report was generated. You can call this method up to 3 times every
   * 24 hours for a given device. If you exceed the quota, then the Google Play
   * EMM API returns HTTP 429 Too Many Requests.
   *
   * @param deviceId The ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesForceReportUpload(deviceId: string, enterpriseId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/forceReportUpload`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Retrieves the details of a device.
   *
   * @param deviceId The ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesGet(deviceId: string, enterpriseId: string, userId: string): Promise<Device> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDevice(data);
  }

  /**
   * Retrieves whether a device's access to Google services is enabled or
   * disabled. The device state takes effect only if enforcing EMM policies on
   * Android devices is enabled in the Google Admin Console. Otherwise, the
   * device state is ignored and all devices are allowed access to Google
   * services. This is only supported for Google-managed users.
   *
   * @param deviceId The ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesGetState(deviceId: string, enterpriseId: string, userId: string): Promise<DeviceState> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/state`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DeviceState;
  }

  /**
   * Retrieves the IDs of all of a user's devices.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesList(enterpriseId: string, userId: string): Promise<DevicesListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDevicesListResponse(data);
  }

  /**
   * Sets whether a device's access to Google services is enabled or disabled.
   * The device state takes effect only if enforcing EMM policies on Android
   * devices is enabled in the Google Admin Console. Otherwise, the device state
   * is ignored and all devices are allowed access to Google services. This is
   * only supported for Google-managed users.
   *
   * @param deviceId The ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesSetState(deviceId: string, enterpriseId: string, userId: string, req: DeviceState): Promise<DeviceState> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/state`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as DeviceState;
  }

  /**
   * Updates the device policy. To ensure the policy is properly enforced, you
   * need to prevent unmanaged accounts from accessing Google Play by setting
   * the allowed_accounts in the managed configuration for the Google Play
   * package. See restrict accounts in Google Play. When provisioning a new
   * device, you should set the device policy using this method before adding
   * the managed Google Play Account to the device, otherwise the policy will
   * not be applied for a short period of time after adding the account to the
   * device.
   *
   * @param deviceId The ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async devicesUpdate(deviceId: string, enterpriseId: string, userId: string, req: Device, opts: DevicesUpdateOptions = {}): Promise<Device> {
    req = serializeDevice(req);
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeDevice(data);
  }

  /**
   * Acknowledges notifications that were received from
   * Enterprises.PullNotificationSet to prevent subsequent calls from returning
   * the same notifications.
   *
   */
  async enterprisesAcknowledgeNotificationSet(opts: EnterprisesAcknowledgeNotificationSetOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/acknowledgeNotificationSet`);
    if (opts.notificationSetId !== undefined) {
      url.searchParams.append("notificationSetId", String(opts.notificationSetId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Completes the signup flow, by specifying the Completion token and
   * Enterprise token. This request must not be called multiple times for a
   * given Enterprise Token.
   *
   */
  async enterprisesCompleteSignup(opts: EnterprisesCompleteSignupOptions = {}): Promise<Enterprise> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/completeSignup`);
    if (opts.completionToken !== undefined) {
      url.searchParams.append("completionToken", String(opts.completionToken));
    }
    if (opts.enterpriseToken !== undefined) {
      url.searchParams.append("enterpriseToken", String(opts.enterpriseToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Enterprise;
  }

  /**
   * Returns a token for device enrollment. The DPC can encode this token
   * within the QR/NFC/zero-touch enrollment payload or fetch it before calling
   * the on-device API to authenticate the user. The token can be generated for
   * each device or reused across multiple devices.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesCreateEnrollmentToken(enterpriseId: string, opts: EnterprisesCreateEnrollmentTokenOptions = {}): Promise<CreateEnrollmentTokenResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/createEnrollmentToken`);
    if (opts.deviceType !== undefined) {
      url.searchParams.append("deviceType", String(opts.deviceType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as CreateEnrollmentTokenResponse;
  }

  /**
   * Returns a unique token to access an embeddable UI. To generate a web UI,
   * pass the generated token into the managed Google Play javascript API. Each
   * token may only be used to start one UI session. See the javascript API
   * documentation for further information.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesCreateWebToken(enterpriseId: string, req: AdministratorWebTokenSpec): Promise<AdministratorWebToken> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/createWebToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AdministratorWebToken;
  }

  /**
   * Enrolls an enterprise with the calling EMM.
   *
   */
  async enterprisesEnroll(req: Enterprise, opts: EnterprisesEnrollOptions = {}): Promise<Enterprise> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/enroll`);
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Enterprise;
  }

  /**
   * Generates a sign-up URL.
   *
   */
  async enterprisesGenerateSignupUrl(opts: EnterprisesGenerateSignupUrlOptions = {}): Promise<SignupInfo> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/signupUrl`);
    if (opts.callbackUrl !== undefined) {
      url.searchParams.append("callbackUrl", String(opts.callbackUrl));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as SignupInfo;
  }

  /**
   * Retrieves the name and domain of an enterprise.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesGet(enterpriseId: string): Promise<Enterprise> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Enterprise;
  }

  /**
   * Returns a service account and credentials. The service account can be
   * bound to the enterprise by calling setAccount. The service account is
   * unique to this enterprise and EMM, and will be deleted if the enterprise is
   * unbound. The credentials contain private key data and are not stored
   * server-side. This method can only be called after calling
   * Enterprises.Enroll or Enterprises.CompleteSignup, and before
   * Enterprises.SetAccount; at other times it will return an error. Subsequent
   * calls after the first will generate a new, unique set of credentials, and
   * invalidate the previously generated credentials. Once the service account
   * is bound to the enterprise, it can be managed using the serviceAccountKeys
   * resource.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesGetServiceAccount(enterpriseId: string, opts: EnterprisesGetServiceAccountOptions = {}): Promise<ServiceAccount> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/serviceAccount`);
    if (opts.keyType !== undefined) {
      url.searchParams.append("keyType", String(opts.keyType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServiceAccount;
  }

  /**
   * Returns the store layout for the enterprise. If the store layout has not
   * been set, returns "basic" as the store layout type and no homepage.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesGetStoreLayout(enterpriseId: string): Promise<StoreLayout> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StoreLayout;
  }

  /**
   * Looks up an enterprise by domain name. This is only supported for
   * enterprises created via the Google-initiated creation flow. Lookup of the
   * id is not needed for enterprises created via the EMM-initiated flow since
   * the EMM learns the enterprise ID in the callback specified in the
   * Enterprises.generateSignupUrl call.
   *
   */
  async enterprisesList(opts: EnterprisesListOptions = {}): Promise<EnterprisesListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises`);
    if (opts.domain !== undefined) {
      url.searchParams.append("domain", String(opts.domain));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EnterprisesListResponse;
  }

  /**
   * Pulls and returns a notification set for the enterprises associated with
   * the service account authenticated for the request. The notification set may
   * be empty if no notification are pending. A notification set returned needs
   * to be acknowledged within 20 seconds by calling
   * Enterprises.AcknowledgeNotificationSet, unless the notification set is
   * empty. Notifications that are not acknowledged within the 20 seconds will
   * eventually be included again in the response to another PullNotificationSet
   * request, and those that are never acknowledged will ultimately be deleted
   * according to the Google Cloud Platform Pub/Sub system policy. Multiple
   * requests might be performed concurrently to retrieve notifications, in
   * which case the pending notifications (if any) will be split among each
   * caller, if any are pending. If no notifications are present, an empty
   * notification list is returned. Subsequent requests may return more
   * notifications once they become available.
   *
   */
  async enterprisesPullNotificationSet(opts: EnterprisesPullNotificationSetOptions = {}): Promise<NotificationSet> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/pullNotificationSet`);
    if (opts.requestMode !== undefined) {
      url.searchParams.append("requestMode", String(opts.requestMode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeNotificationSet(data);
  }

  /**
   * Sends a test notification to validate the EMM integration with the Google
   * Cloud Pub/Sub service for this enterprise.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesSendTestPushNotification(enterpriseId: string): Promise<EnterprisesSendTestPushNotificationResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/sendTestPushNotification`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as EnterprisesSendTestPushNotificationResponse;
  }

  /**
   * Sets the account that will be used to authenticate to the API as the
   * enterprise.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesSetAccount(enterpriseId: string, req: EnterpriseAccount): Promise<EnterpriseAccount> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/account`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as EnterpriseAccount;
  }

  /**
   * Sets the store layout for the enterprise. By default, storeLayoutType is
   * set to "basic" and the basic store layout is enabled. The basic layout only
   * contains apps approved by the admin, and that have been added to the
   * available product set for a user (using the setAvailableProductSet call).
   * Apps on the page are sorted in order of their product ID value. If you
   * create a custom store layout (by setting storeLayoutType = "custom" and
   * setting a homepage), the basic store layout is disabled.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesSetStoreLayout(enterpriseId: string, req: StoreLayout): Promise<StoreLayout> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as StoreLayout;
  }

  /**
   * Unenrolls an enterprise from the calling EMM.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async enterprisesUnenroll(enterpriseId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/unenroll`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Removes an entitlement to an app for a user. **Note:** This item has been
   * deprecated. New integrations cannot use this method and can refer to our
   * new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param entitlementId The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async entitlementsDelete(enterpriseId: string, entitlementId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/entitlements/${ entitlementId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of an entitlement. **Note:** This item has been
   * deprecated. New integrations cannot use this method and can refer to our
   * new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param entitlementId The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async entitlementsGet(enterpriseId: string, entitlementId: string, userId: string): Promise<Entitlement> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/entitlements/${ entitlementId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Entitlement;
  }

  /**
   * Lists all entitlements for the specified user. Only the ID is set.
   * **Note:** This item has been deprecated. New integrations cannot use this
   * method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async entitlementsList(enterpriseId: string, userId: string): Promise<EntitlementsListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/entitlements`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntitlementsListResponse;
  }

  /**
   * Adds or updates an entitlement to an app for a user. **Note:** This item
   * has been deprecated. New integrations cannot use this method and can refer
   * to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param entitlementId The ID of the entitlement (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async entitlementsUpdate(enterpriseId: string, entitlementId: string, userId: string, req: Entitlement, opts: EntitlementsUpdateOptions = {}): Promise<Entitlement> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/entitlements/${ entitlementId }`);
    if (opts.install !== undefined) {
      url.searchParams.append("install", String(opts.install));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Entitlement;
  }

  /**
   * Retrieves details of an enterprise's group license for a product.
   * **Note:** This item has been deprecated. New integrations cannot use this
   * method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param groupLicenseId The ID of the product the group license is for, e.g. "app:com.google.android.gm".
   */
  async grouplicensesGet(enterpriseId: string, groupLicenseId: string): Promise<GroupLicense> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/groupLicenses/${ groupLicenseId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GroupLicense;
  }

  /**
   * Retrieves IDs of all products for which the enterprise has a group
   * license. **Note:** This item has been deprecated. New integrations cannot
   * use this method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async grouplicensesList(enterpriseId: string): Promise<GroupLicensesListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/groupLicenses`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GroupLicensesListResponse;
  }

  /**
   * Retrieves the IDs of the users who have been granted entitlements under
   * the license. **Note:** This item has been deprecated. New integrations
   * cannot use this method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param groupLicenseId The ID of the product the group license is for, e.g. "app:com.google.android.gm".
   */
  async grouplicenseusersList(enterpriseId: string, groupLicenseId: string): Promise<GroupLicenseUsersListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/groupLicenses/${ groupLicenseId }/users`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GroupLicenseUsersListResponse;
  }

  /**
   * Requests to remove an app from a device. A call to get or list will still
   * show the app as installed on the device until it is actually removed.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param installId The ID of the product represented by the install, e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async installsDelete(deviceId: string, enterpriseId: string, installId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/installs/${ installId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of an installation of an app on a device.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param installId The ID of the product represented by the install, e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async installsGet(deviceId: string, enterpriseId: string, installId: string, userId: string): Promise<Install> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/installs/${ installId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Install;
  }

  /**
   * Retrieves the details of all apps installed on the specified device.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async installsList(deviceId: string, enterpriseId: string, userId: string): Promise<InstallsListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/installs`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InstallsListResponse;
  }

  /**
   * Requests to install the latest version of an app to a device. If the app
   * is already installed, then it is updated to the latest version if
   * necessary.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param installId The ID of the product represented by the install, e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async installsUpdate(deviceId: string, enterpriseId: string, installId: string, userId: string, req: Install): Promise<Install> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/installs/${ installId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Install;
  }

  /**
   * Removes a per-device managed configuration for an app for the specified
   * device.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForDeviceId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsfordeviceDelete(deviceId: string, enterpriseId: string, managedConfigurationForDeviceId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/managedConfigurationsForDevice/${ managedConfigurationForDeviceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of a per-device managed configuration.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForDeviceId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsfordeviceGet(deviceId: string, enterpriseId: string, managedConfigurationForDeviceId: string, userId: string): Promise<ManagedConfiguration> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/managedConfigurationsForDevice/${ managedConfigurationForDeviceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ManagedConfiguration;
  }

  /**
   * Lists all the per-device managed configurations for the specified device.
   * Only the ID is set.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async managedconfigurationsfordeviceList(deviceId: string, enterpriseId: string, userId: string): Promise<ManagedConfigurationsForDeviceListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/managedConfigurationsForDevice`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ManagedConfigurationsForDeviceListResponse;
  }

  /**
   * Adds or updates a per-device managed configuration for an app for the
   * specified device.
   *
   * @param deviceId The Android ID of the device.
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForDeviceId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsfordeviceUpdate(deviceId: string, enterpriseId: string, managedConfigurationForDeviceId: string, userId: string, req: ManagedConfiguration): Promise<ManagedConfiguration> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/devices/${ deviceId }/managedConfigurationsForDevice/${ managedConfigurationForDeviceId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ManagedConfiguration;
  }

  /**
   * Removes a per-user managed configuration for an app for the specified
   * user.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForUserId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsforuserDelete(enterpriseId: string, managedConfigurationForUserId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/managedConfigurationsForUser/${ managedConfigurationForUserId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of a per-user managed configuration for an app for the
   * specified user.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForUserId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsforuserGet(enterpriseId: string, managedConfigurationForUserId: string, userId: string): Promise<ManagedConfiguration> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/managedConfigurationsForUser/${ managedConfigurationForUserId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ManagedConfiguration;
  }

  /**
   * Lists all the per-user managed configurations for the specified user. Only
   * the ID is set.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async managedconfigurationsforuserList(enterpriseId: string, userId: string): Promise<ManagedConfigurationsForUserListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/managedConfigurationsForUser`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ManagedConfigurationsForUserListResponse;
  }

  /**
   * Adds or updates the managed configuration settings for an app for the
   * specified user. If you support the Managed configurations iframe, you can
   * apply managed configurations to a user by specifying an mcmId and its
   * associated configuration variables (if any) in the request. Alternatively,
   * all EMMs can apply managed configurations by passing a list of managed
   * properties.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param managedConfigurationForUserId The ID of the managed configuration (a product ID), e.g. "app:com.google.android.gm".
   * @param userId The ID of the user.
   */
  async managedconfigurationsforuserUpdate(enterpriseId: string, managedConfigurationForUserId: string, userId: string, req: ManagedConfiguration): Promise<ManagedConfiguration> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/managedConfigurationsForUser/${ managedConfigurationForUserId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ManagedConfiguration;
  }

  /**
   * Lists all the managed configurations settings for the specified app.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product for which the managed configurations settings applies to.
   */
  async managedconfigurationssettingsList(enterpriseId: string, productId: string): Promise<ManagedConfigurationsSettingsListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/managedConfigurationsSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManagedConfigurationsSettingsListResponse(data);
  }

  /**
   * Retrieves details of an Android app permission for display to an
   * enterprise admin.
   *
   * @param permissionId The ID of the permission.
   */
  async permissionsGet(permissionId: string, opts: PermissionsGetOptions = {}): Promise<Permission> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/permissions/${ permissionId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Permission;
  }

  /**
   * Approves the specified product and the relevant app permissions, if any.
   * The maximum number of products that you can approve per enterprise customer
   * is 1,000. To learn how to use managed Google Play to design and create a
   * store layout to display approved products to your users, see Store Layout
   * Design. **Note:** This item has been deprecated. New integrations cannot
   * use this method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product.
   */
  async productsApprove(enterpriseId: string, productId: string, req: ProductsApproveRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Generates a URL that can be rendered in an iframe to display the
   * permissions (if any) of a product. An enterprise admin must view these
   * permissions and accept them on behalf of their organization in order to
   * approve that product. Admins should accept the displayed permissions by
   * interacting with a separate UI element in the EMM console, which in turn
   * should trigger the use of this URL as the approvalUrlInfo.approvalUrl
   * property in a Products.approve call to approve the product. This URL can
   * only be used to display permissions for up to 1 day. **Note:** This item
   * has been deprecated. New integrations cannot use this method and can refer
   * to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product.
   */
  async productsGenerateApprovalUrl(enterpriseId: string, productId: string, opts: ProductsGenerateApprovalUrlOptions = {}): Promise<ProductsGenerateApprovalUrlResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/generateApprovalUrl`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ProductsGenerateApprovalUrlResponse;
  }

  /**
   * Retrieves details of a product for display to an enterprise admin.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product, e.g. "app:com.google.android.gm".
   */
  async productsGet(enterpriseId: string, productId: string, opts: ProductsGetOptions = {}): Promise<Product> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProduct(data);
  }

  /**
   * Retrieves the schema that defines the configurable properties for this
   * product. All products have a schema, but this schema may be empty if no
   * managed configurations have been defined. This schema can be used to
   * populate a UI that allows an admin to configure the product. To apply a
   * managed configuration based on the schema obtained using this API, see
   * Managed Configurations through Play.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product.
   */
  async productsGetAppRestrictionsSchema(enterpriseId: string, productId: string, opts: ProductsGetAppRestrictionsSchemaOptions = {}): Promise<AppRestrictionsSchema> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/appRestrictionsSchema`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AppRestrictionsSchema;
  }

  /**
   * Retrieves the Android app permissions required by this app.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product.
   */
  async productsGetPermissions(enterpriseId: string, productId: string): Promise<ProductPermissions> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/permissions`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductPermissions;
  }

  /**
   * Finds approved products that match a query, or all approved products if
   * there is no query. **Note:** This item has been deprecated. New
   * integrations cannot use this method and can refer to our new
   * recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async productsList(enterpriseId: string, opts: ProductsListOptions = {}): Promise<ProductsListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products`);
    if (opts.approved !== undefined) {
      url.searchParams.append("approved", String(opts.approved));
    }
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProductsListResponse(data);
  }

  /**
   * Unapproves the specified product (and the relevant app permissions, if
   * any) **Note:** This item has been deprecated. New integrations cannot use
   * this method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param productId The ID of the product.
   */
  async productsUnapprove(enterpriseId: string, productId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/products/${ productId }/unapprove`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Removes and invalidates the specified credentials for the service account
   * associated with this enterprise. The calling service account must have been
   * retrieved by calling Enterprises.GetServiceAccount and must have been set
   * as the enterprise service account by calling Enterprises.SetAccount.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param keyId The ID of the key.
   */
  async serviceaccountkeysDelete(enterpriseId: string, keyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/serviceAccountKeys/${ keyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Generates new credentials for the service account associated with this
   * enterprise. The calling service account must have been retrieved by calling
   * Enterprises.GetServiceAccount and must have been set as the enterprise
   * service account by calling Enterprises.SetAccount. Only the type of the key
   * should be populated in the resource to be inserted.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async serviceaccountkeysInsert(enterpriseId: string, req: ServiceAccountKey): Promise<ServiceAccountKey> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/serviceAccountKeys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ServiceAccountKey;
  }

  /**
   * Lists all active credentials for the service account associated with this
   * enterprise. Only the ID and key type are returned. The calling service
   * account must have been retrieved by calling Enterprises.GetServiceAccount
   * and must have been set as the enterprise service account by calling
   * Enterprises.SetAccount.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async serviceaccountkeysList(enterpriseId: string): Promise<ServiceAccountKeysListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/serviceAccountKeys`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServiceAccountKeysListResponse;
  }

  /**
   * Deletes a cluster.
   *
   * @param clusterId The ID of the cluster.
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutclustersDelete(clusterId: string, enterpriseId: string, pageId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }/clusters/${ clusterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of a cluster.
   *
   * @param clusterId The ID of the cluster.
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutclustersGet(clusterId: string, enterpriseId: string, pageId: string): Promise<StoreCluster> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }/clusters/${ clusterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StoreCluster;
  }

  /**
   * Inserts a new cluster in a page.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutclustersInsert(enterpriseId: string, pageId: string, req: StoreCluster): Promise<StoreCluster> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }/clusters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as StoreCluster;
  }

  /**
   * Retrieves the details of all clusters on the specified page.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutclustersList(enterpriseId: string, pageId: string): Promise<StoreLayoutClustersListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }/clusters`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StoreLayoutClustersListResponse;
  }

  /**
   * Updates a cluster.
   *
   * @param clusterId The ID of the cluster.
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutclustersUpdate(clusterId: string, enterpriseId: string, pageId: string, req: StoreCluster): Promise<StoreCluster> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }/clusters/${ clusterId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as StoreCluster;
  }

  /**
   * Deletes a store page.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutpagesDelete(enterpriseId: string, pageId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves details of a store page.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutpagesGet(enterpriseId: string, pageId: string): Promise<StorePage> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StorePage;
  }

  /**
   * Inserts a new store page.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async storelayoutpagesInsert(enterpriseId: string, req: StorePage): Promise<StorePage> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as StorePage;
  }

  /**
   * Retrieves the details of all pages in the store.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async storelayoutpagesList(enterpriseId: string): Promise<StoreLayoutPagesListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StoreLayoutPagesListResponse;
  }

  /**
   * Updates the content of a store page.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param pageId The ID of the page.
   */
  async storelayoutpagesUpdate(enterpriseId: string, pageId: string, req: StorePage): Promise<StorePage> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/storeLayout/pages/${ pageId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as StorePage;
  }

  /**
   * Deleted an EMM-managed user.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersDelete(enterpriseId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Generates an authentication token which the device policy client can use
   * to provision the given EMM-managed user account on a device. The generated
   * token is single-use and expires after a few minutes. You can provision a
   * maximum of 10 devices per user. This call only works with EMM-managed
   * accounts.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersGenerateAuthenticationToken(enterpriseId: string, userId: string): Promise<AuthenticationToken> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/authenticationToken`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AuthenticationToken;
  }

  /**
   * Retrieves a user's details.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersGet(enterpriseId: string, userId: string): Promise<User> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as User;
  }

  /**
   * Retrieves the set of products a user is entitled to access. **Note:** This
   * item has been deprecated. New integrations cannot use this method and can
   * refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersGetAvailableProductSet(enterpriseId: string, userId: string): Promise<ProductSet> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/availableProductSet`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductSet;
  }

  /**
   * Creates a new EMM-managed user. The Users resource passed in the body of
   * the request should include an accountIdentifier and an accountType. If a
   * corresponding user already exists with the same account identifier, the
   * user will be updated with the resource. In this case only the displayName
   * field can be changed.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async usersInsert(enterpriseId: string, req: User): Promise<User> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as User;
  }

  /**
   * Looks up a user by primary email address. This is only supported for
   * Google-managed users. Lookup of the id is not needed for EMM-managed users
   * because the id is already returned in the result of the Users.insert call.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async usersList(enterpriseId: string, opts: UsersListOptions = {}): Promise<UsersListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users`);
    if (opts.email !== undefined) {
      url.searchParams.append("email", String(opts.email));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UsersListResponse;
  }

  /**
   * Revokes access to all devices currently provisioned to the user. The user
   * will no longer be able to use the managed Play store on any of their
   * managed devices. This call only works with EMM-managed accounts.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersRevokeDeviceAccess(enterpriseId: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/deviceAccess`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Modifies the set of products that a user is entitled to access (referred
   * to as *whitelisted* products). Only products that are approved or products
   * that were previously approved (products with revoked approval) can be
   * whitelisted. **Note:** This item has been deprecated. New integrations
   * cannot use this method and can refer to our new recommendations.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersSetAvailableProductSet(enterpriseId: string, userId: string, req: ProductSet): Promise<ProductSet> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }/availableProductSet`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ProductSet;
  }

  /**
   * Updates the details of an EMM-managed user. Can be used with EMM-managed
   * users only (not Google managed users). Pass the new details in the Users
   * resource in the request body. Only the displayName field can be changed.
   * Other fields must either be unset or have the currently active value.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param userId The ID of the user.
   */
  async usersUpdate(enterpriseId: string, userId: string, req: User): Promise<User> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/users/${ userId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as User;
  }

  /**
   * Deletes an existing web app.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param webAppId The ID of the web app.
   */
  async webappsDelete(enterpriseId: string, webAppId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/webApps/${ webAppId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets an existing web app.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param webAppId The ID of the web app.
   */
  async webappsGet(enterpriseId: string, webAppId: string): Promise<WebApp> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/webApps/${ webAppId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWebApp(data);
  }

  /**
   * Creates a new web app for the enterprise.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async webappsInsert(enterpriseId: string, req: WebApp): Promise<WebApp> {
    req = serializeWebApp(req);
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/webApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWebApp(data);
  }

  /**
   * Retrieves the details of all web apps for a given enterprise.
   *
   * @param enterpriseId The ID of the enterprise.
   */
  async webappsList(enterpriseId: string): Promise<WebAppsListResponse> {
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/webApps`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWebAppsListResponse(data);
  }

  /**
   * Updates an existing web app.
   *
   * @param enterpriseId The ID of the enterprise.
   * @param webAppId The ID of the web app.
   */
  async webappsUpdate(enterpriseId: string, webAppId: string, req: WebApp): Promise<WebApp> {
    req = serializeWebApp(req);
    const url = new URL(`${this.#baseUrl}androidenterprise/v1/enterprises/${ enterpriseId }/webApps/${ webAppId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeWebApp(data);
  }
}

/**
 * This represents an enterprise admin who can manage the enterprise in the
 * managed Google Play store.
 */
export interface Administrator {
  /**
   * The admin's email address.
   */
  email?: string;
}

/**
 * A token authorizing an admin to access an iframe.
 */
export interface AdministratorWebToken {
  /**
   * An opaque token to be passed to the Play front-end to generate an iframe.
   */
  token?: string;
}

/**
 * Specification for a token used to generate iframes. The token specifies what
 * data the admin is allowed to modify and the URI the iframe is allowed to
 * communiate with.
 */
export interface AdministratorWebTokenSpec {
  /**
   * Options for displaying the Managed Configuration page.
   */
  managedConfigurations?: AdministratorWebTokenSpecManagedConfigurations;
  /**
   * The URI of the parent frame hosting the iframe. To prevent XSS, the iframe
   * may not be hosted at other URIs. This URI must be https. Use whitespaces to
   * separate multiple parent URIs.
   */
  parent?: string;
  /**
   * Deprecated. Use PlaySearch.approveApps.
   */
  permission?:  | "unknown" | "approveApps" | "manageMcm"[];
  /**
   * Options for displaying the managed Play Search apps page.
   */
  playSearch?: AdministratorWebTokenSpecPlaySearch;
  /**
   * Options for displaying the Private Apps page.
   */
  privateApps?: AdministratorWebTokenSpecPrivateApps;
  /**
   * Options for displaying the Organize apps page.
   */
  storeBuilder?: AdministratorWebTokenSpecStoreBuilder;
  /**
   * Options for displaying the Web Apps page.
   */
  webApps?: AdministratorWebTokenSpecWebApps;
  /**
   * Options for displaying the Zero Touch page.
   */
  zeroTouch?: AdministratorWebTokenSpecZeroTouch;
}

export interface AdministratorWebTokenSpecManagedConfigurations {
  /**
   * Whether the Managed Configuration page is displayed. Default is true.
   */
  enabled?: boolean;
}

export interface AdministratorWebTokenSpecPlaySearch {
  /**
   * Allow access to the iframe in approve mode. Default is false.
   */
  approveApps?: boolean;
  /**
   * Whether the managed Play Search apps page is displayed. Default is true.
   */
  enabled?: boolean;
}

export interface AdministratorWebTokenSpecPrivateApps {
  /**
   * Whether the Private Apps page is displayed. Default is true.
   */
  enabled?: boolean;
}

export interface AdministratorWebTokenSpecStoreBuilder {
  /**
   * Whether the Organize apps page is displayed. Default is true.
   */
  enabled?: boolean;
}

export interface AdministratorWebTokenSpecWebApps {
  /**
   * Whether the Web Apps page is displayed. Default is true.
   */
  enabled?: boolean;
}

export interface AdministratorWebTokenSpecZeroTouch {
  /**
   * Whether zero-touch embedded UI is usable with this token. If enabled, the
   * admin can link zero-touch customers to this enterprise.
   */
  enabled?: boolean;
}

/**
 * Represents the list of app restrictions available to be pre-configured for
 * the product.
 */
export interface AppRestrictionsSchema {
  /**
   * Deprecated.
   */
  kind?: string;
  /**
   * The set of restrictions that make up this schema.
   */
  restrictions?: AppRestrictionsSchemaRestriction[];
}

/**
 * An event generated when a new app version is uploaded to Google Play and its
 * app restrictions schema changed. To fetch the app restrictions schema for an
 * app, use Products.getAppRestrictionsSchema on the EMM API.
 */
export interface AppRestrictionsSchemaChangeEvent {
  /**
   * The id of the product (e.g. "app:com.google.android.gm") for which the app
   * restriction schema changed. This field will always be present.
   */
  productId?: string;
}

/**
 * A restriction in the App Restriction Schema represents a piece of
 * configuration that may be pre-applied.
 */
export interface AppRestrictionsSchemaRestriction {
  /**
   * The default value of the restriction. bundle and bundleArray restrictions
   * never have a default value.
   */
  defaultValue?: AppRestrictionsSchemaRestrictionRestrictionValue;
  /**
   * A longer description of the restriction, giving more detail of what it
   * affects.
   */
  description?: string;
  /**
   * For choice or multiselect restrictions, the list of possible entries'
   * human-readable names.
   */
  entry?: string[];
  /**
   * For choice or multiselect restrictions, the list of possible entries'
   * machine-readable values. These values should be used in the configuration,
   * either as a single string value for a choice restriction or in a
   * stringArray for a multiselect restriction.
   */
  entryValue?: string[];
  /**
   * The unique key that the product uses to identify the restriction, e.g.
   * "com.google.android.gm.fieldname".
   */
  key?: string;
  /**
   * For bundle or bundleArray restrictions, the list of nested restrictions. A
   * bundle restriction is always nested within a bundleArray restriction, and a
   * bundleArray restriction is at most two levels deep.
   */
  nestedRestriction?: AppRestrictionsSchemaRestriction[];
  /**
   * The type of the restriction.
   */
  restrictionType?:  | "bool" | "string" | "integer" | "choice" | "multiselect" | "hidden" | "bundle" | "bundleArray";
  /**
   * The name of the restriction.
   */
  title?: string;
}

/**
 * A typed value for the restriction.
 */
export interface AppRestrictionsSchemaRestrictionRestrictionValue {
  /**
   * The type of the value being provided.
   */
  type?:  | "bool" | "string" | "integer" | "choice" | "multiselect" | "hidden" | "bundle" | "bundleArray";
  /**
   * The boolean value - this will only be present if type is bool.
   */
  valueBool?: boolean;
  /**
   * The integer value - this will only be present if type is integer.
   */
  valueInteger?: number;
  /**
   * The list of string values - this will only be present if type is
   * multiselect.
   */
  valueMultiselect?: string[];
  /**
   * The string value - this will be present for types string, choice and
   * hidden.
   */
  valueString?: string;
}

/**
 * Information on an approval URL.
 */
export interface ApprovalUrlInfo {
  /**
   * A URL that displays a product's permissions and that can also be used to
   * approve the product with the Products.approve call.
   */
  approvalUrl?: string;
}

/**
 * List of states set by the app.
 */
export interface AppState {
  /**
   * List of keyed app states. This field will always be present.
   */
  keyedAppState?: KeyedAppState[];
  /**
   * The package name of the app. This field will always be present.
   */
  packageName?: string;
}

function serializeAppState(data: any): AppState {
  return {
    ...data,
    keyedAppState: data["keyedAppState"] !== undefined ? data["keyedAppState"].map((item: any) => (serializeKeyedAppState(item))) : undefined,
  };
}

function deserializeAppState(data: any): AppState {
  return {
    ...data,
    keyedAppState: data["keyedAppState"] !== undefined ? data["keyedAppState"].map((item: any) => (deserializeKeyedAppState(item))) : undefined,
  };
}

/**
 * An event generated when a new version of an app is uploaded to Google Play.
 * Notifications are sent for new public versions only: alpha, beta, or canary
 * versions do not generate this event. To fetch up-to-date version history for
 * an app, use Products.Get on the EMM API.
 */
export interface AppUpdateEvent {
  /**
   * The id of the product (e.g. "app:com.google.android.gm") that was updated.
   * This field will always be present.
   */
  productId?: string;
}

/**
 * This represents a single version of the app.
 */
export interface AppVersion {
  /**
   * True if this version is a production APK.
   */
  isProduction?: boolean;
  /**
   * Deprecated, use trackId instead.
   */
  track?:  | "appTrackUnspecified" | "production" | "beta" | "alpha";
  /**
   * Track ids that the app version is published in. Replaces the track field
   * (deprecated), but doesn't include the production track (see isProduction
   * instead).
   */
  trackId?: string[];
  /**
   * Unique increasing identifier for the app version.
   */
  versionCode?: number;
  /**
   * The string used in the Play store by the app developer to identify the
   * version. The string is not necessarily unique or localized (for example,
   * the string could be "1.4").
   */
  versionString?: string;
}

/**
 * An AuthenticationToken is used by the EMM's device policy client on a device
 * to provision the given EMM-managed user on that device.
 */
export interface AuthenticationToken {
  /**
   * The authentication token to be passed to the device policy client on the
   * device where it can be used to provision the account for which this token
   * was generated.
   */
  token?: string;
}

/**
 * The auto-install constraint. Defines a set of restrictions for installation.
 * At least one of the fields must be set.
 */
export interface AutoInstallConstraint {
  /**
   * Charging state constraint.
   */
  chargingStateConstraint?:  | "chargingStateConstraintUnspecified" | "chargingNotRequired" | "chargingRequired";
  /**
   * Device idle state constraint.
   */
  deviceIdleStateConstraint?:  | "deviceIdleStateConstraintUnspecified" | "deviceIdleNotRequired" | "deviceIdleRequired";
  /**
   * Network type constraint.
   */
  networkTypeConstraint?:  | "networkTypeConstraintUnspecified" | "anyNetwork" | "unmeteredNetwork";
}

export interface AutoInstallPolicy {
  /**
   * The constraints for auto-installing the app. You can specify a maximum of
   * one constraint.
   */
  autoInstallConstraint?: AutoInstallConstraint[];
  /**
   * The auto-install mode. If unset defaults to "doNotAutoInstall".
   */
  autoInstallMode?:  | "autoInstallModeUnspecified" | "doNotAutoInstall" | "autoInstallOnce" | "forceAutoInstall";
  /**
   * The priority of the install, as an unsigned integer. A lower number means
   * higher priority.
   */
  autoInstallPriority?: number;
  /**
   * The minimum version of the app. If a lower version of the app is
   * installed, then the app will be auto-updated according to the auto-install
   * constraints, instead of waiting for the regular auto-update. You can set a
   * minimum version code for at most 20 apps per device.
   */
  minimumVersionCode?: number;
}

/**
 * A configuration variables resource contains the managed configuration
 * settings ID to be applied to a single user, as well as the variable set that
 * is attributed to the user. The variable set will be used to replace
 * placeholders in the managed configuration settings.
 */
export interface ConfigurationVariables {
  /**
   * The ID of the managed configurations settings.
   */
  mcmId?: string;
  /**
   * The variable set that is attributed to the user.
   */
  variableSet?: VariableSet[];
}

/**
 * Response message for create enrollment token.
 */
export interface CreateEnrollmentTokenResponse {
  /**
   * Enrollment token.
   */
  enrollmentToken?: string;
}

/**
 * A Devices resource represents a mobile device managed by the EMM and
 * belonging to a specific enterprise user.
 */
export interface Device {
  /**
   * The Google Play Services Android ID for the device encoded as a lowercase
   * hex string. For example, "123456789abcdef0".
   */
  androidId?: string;
  /**
   * The internal hardware codename of the device. This comes from
   * android.os.Build.DEVICE. (field named "device" per
   * logs/wireless/android/android_checkin.proto)
   */
  device?: string;
  /**
   * The build fingerprint of the device if known.
   */
  latestBuildFingerprint?: string;
  /**
   * The manufacturer of the device. This comes from
   * android.os.Build.MANUFACTURER.
   */
  maker?: string;
  /**
   * Identifies the extent to which the device is controlled by a managed
   * Google Play EMM in various deployment configurations. Possible values
   * include: - "managedDevice", a device that has the EMM's device policy
   * controller (DPC) as the device owner. - "managedProfile", a device that has
   * a profile managed by the DPC (DPC is profile owner) in addition to a
   * separate, personal profile that is unavailable to the DPC. -
   * "containerApp", no longer used (deprecated). - "unmanagedProfile", a device
   * that has been allowed (by the domain's admin, using the Admin Console to
   * enable the privilege) to use managed Google Play, but the profile is itself
   * not owned by a DPC.
   */
  managementType?:  | "managedDevice" | "managedProfile" | "containerApp" | "unmanagedProfile";
  /**
   * The model name of the device. This comes from android.os.Build.MODEL.
   */
  model?: string;
  /**
   * The policy enforced on the device.
   */
  policy?: Policy;
  /**
   * The product name of the device. This comes from android.os.Build.PRODUCT.
   */
  product?: string;
  /**
   * The device report updated with the latest app states.
   */
  report?: DeviceReport;
  /**
   * Retail brand for the device, if set. See
   * https://developer.android.com/reference/android/os/Build.html#BRAND
   */
  retailBrand?: string;
  /**
   * API compatibility version.
   */
  sdkVersion?: number;
}

function serializeDevice(data: any): Device {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    report: data["report"] !== undefined ? serializeDeviceReport(data["report"]) : undefined,
  };
}

function deserializeDevice(data: any): Device {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    report: data["report"] !== undefined ? deserializeDeviceReport(data["report"]) : undefined,
  };
}

/**
 * Device report updated with the latest app states for managed apps on the
 * device.
 */
export interface DeviceReport {
  /**
   * List of app states set by managed apps on the device. App states are
   * defined by the app's developers. This field will always be present.
   */
  appState?: AppState[];
  /**
   * The timestamp of the last report update in milliseconds since epoch. This
   * field will always be present.
   */
  lastUpdatedTimestampMillis?: bigint;
}

function serializeDeviceReport(data: any): DeviceReport {
  return {
    ...data,
    appState: data["appState"] !== undefined ? data["appState"].map((item: any) => (serializeAppState(item))) : undefined,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? String(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

function deserializeDeviceReport(data: any): DeviceReport {
  return {
    ...data,
    appState: data["appState"] !== undefined ? data["appState"].map((item: any) => (deserializeAppState(item))) : undefined,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? BigInt(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

/**
 * An event generated when an updated device report is available.
 */
export interface DeviceReportUpdateEvent {
  /**
   * The Android ID of the device. This field will always be present.
   */
  deviceId?: string;
  /**
   * The device report updated with the latest app states. This field will
   * always be present.
   */
  report?: DeviceReport;
  /**
   * The ID of the user. This field will always be present.
   */
  userId?: string;
}

function serializeDeviceReportUpdateEvent(data: any): DeviceReportUpdateEvent {
  return {
    ...data,
    report: data["report"] !== undefined ? serializeDeviceReport(data["report"]) : undefined,
  };
}

function deserializeDeviceReportUpdateEvent(data: any): DeviceReportUpdateEvent {
  return {
    ...data,
    report: data["report"] !== undefined ? deserializeDeviceReport(data["report"]) : undefined,
  };
}

export interface DevicesListResponse {
  /**
   * A managed device.
   */
  device?: Device[];
}

function serializeDevicesListResponse(data: any): DevicesListResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? data["device"].map((item: any) => (serializeDevice(item))) : undefined,
  };
}

function deserializeDevicesListResponse(data: any): DevicesListResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? data["device"].map((item: any) => (deserializeDevice(item))) : undefined,
  };
}

/**
 * The state of a user's device, as accessed by the getState and setState
 * methods on device resources.
 */
export interface DeviceState {
  /**
   * The state of the Google account on the device. "enabled" indicates that
   * the Google account on the device can be used to access Google services
   * (including Google Play), while "disabled" means that it cannot. A new
   * device is initially in the "disabled" state.
   */
  accountState?:  | "enabled" | "disabled";
}

/**
 * Additional options for androidenterprise#devicesUpdate.
 */
export interface DevicesUpdateOptions {
  /**
   * Mask that identifies which fields to update. If not set, all modifiable
   * fields will be modified. When set in a query parameter, this field should
   * be specified as updateMask=<field1>,<field2>,...
   */
  updateMask?: string;
}

/**
 * An Enterprises resource represents the binding between an EMM and a specific
 * organization. That binding can be instantiated in one of two different ways
 * using this API as follows: - For Google managed domain customers, the process
 * involves using Enterprises.enroll and Enterprises.setAccount (in conjunction
 * with artifacts obtained from the Admin console and the Google API Console)
 * and submitted to the EMM through a more-or-less manual process. - For managed
 * Google Play Accounts customers, the process involves using
 * Enterprises.generateSignupUrl and Enterprises.completeSignup in conjunction
 * with the managed Google Play sign-up UI (Google-provided mechanism) to create
 * the binding without manual steps. As an EMM, you can support either or both
 * approaches in your EMM console. See Create an Enterprise for details.
 */
export interface Enterprise {
  /**
   * Admins of the enterprise. This is only supported for enterprises created
   * via the EMM-initiated flow.
   */
  administrator?: Administrator[];
  /**
   * Output only. Settings for Google-provided user authentication.
   */
  readonly googleAuthenticationSettings?: GoogleAuthenticationSettings;
  /**
   * The unique ID for the enterprise.
   */
  id?: string;
  /**
   * The name of the enterprise, for example, "Example, Inc".
   */
  name?: string;
  /**
   * The enterprise's primary domain, such as "example.com".
   */
  primaryDomain?: string;
}

/**
 * A service account that can be used to authenticate as the enterprise to API
 * calls that require such authentication.
 */
export interface EnterpriseAccount {
  /**
   * The email address of the service account.
   */
  accountEmail?: string;
}

/**
 * An authentication URL configuration for the authenticator app of an identity
 * provider.
 */
export interface EnterpriseAuthenticationAppLinkConfig {
  /**
   * An authentication url.
   */
  uri?: string;
}

/**
 * Additional options for
 * androidenterprise#enterprisesAcknowledgeNotificationSet.
 */
export interface EnterprisesAcknowledgeNotificationSetOptions {
  /**
   * The notification set ID as returned by Enterprises.PullNotificationSet.
   * This must be provided.
   */
  notificationSetId?: string;
}

/**
 * Additional options for androidenterprise#enterprisesCompleteSignup.
 */
export interface EnterprisesCompleteSignupOptions {
  /**
   * The Completion token initially returned by GenerateSignupUrl.
   */
  completionToken?: string;
  /**
   * The Enterprise token appended to the Callback URL.
   */
  enterpriseToken?: string;
}

/**
 * Additional options for androidenterprise#enterprisesCreateEnrollmentToken.
 */
export interface EnterprisesCreateEnrollmentTokenOptions {
  /**
   * Whether it’s a dedicated device or a knowledge worker device.
   */
  deviceType?:  | "unknown" | "dedicatedDevice" | "knowledgeWorker";
}

/**
 * Additional options for androidenterprise#enterprisesEnroll.
 */
export interface EnterprisesEnrollOptions {
  /**
   * Required. The token provided by the enterprise to register the EMM.
   */
  token: string;
}

/**
 * Additional options for androidenterprise#enterprisesGenerateSignupUrl.
 */
export interface EnterprisesGenerateSignupUrlOptions {
  /**
   * The callback URL to which the Admin will be redirected after successfully
   * creating an enterprise. Before redirecting there the system will add a
   * single query parameter to this URL named "enterpriseToken" which will
   * contain an opaque token to be used for the CompleteSignup request. Beware
   * that this means that the URL will be parsed, the parameter added and then a
   * new URL formatted, i.e. there may be some minor formatting changes and,
   * more importantly, the URL must be well-formed so that it can be parsed.
   */
  callbackUrl?: string;
}

/**
 * Additional options for androidenterprise#enterprisesGetServiceAccount.
 */
export interface EnterprisesGetServiceAccountOptions {
  /**
   * The type of credential to return with the service account. Required.
   */
  keyType?:  | "googleCredentials" | "pkcs12";
}

/**
 * Additional options for androidenterprise#enterprisesList.
 */
export interface EnterprisesListOptions {
  /**
   * Required. The exact primary domain name of the enterprise to look up.
   */
  domain: string;
}

export interface EnterprisesListResponse {
  /**
   * An enterprise.
   */
  enterprise?: Enterprise[];
}

/**
 * Additional options for androidenterprise#enterprisesPullNotificationSet.
 */
export interface EnterprisesPullNotificationSetOptions {
  /**
   * The request mode for pulling notifications. Specifying
   * waitForNotifications will cause the request to block and wait until one or
   * more notifications are present, or return an empty notification list if no
   * notifications are present after some time. Specifying returnImmediately
   * will cause the request to immediately return the pending notifications, or
   * an empty list if no notifications are present. If omitted, defaults to
   * waitForNotifications.
   */
  requestMode?:  | "waitForNotifications" | "returnImmediately";
}

export interface EnterprisesSendTestPushNotificationResponse {
  /**
   * The message ID of the test push notification that was sent.
   */
  messageId?: string;
  /**
   * The name of the Cloud Pub/Sub topic to which notifications for this
   * enterprise's enrolled account will be sent.
   */
  topicName?: string;
}

/**
 * The presence of an Entitlements resource indicates that a user has the right
 * to use a particular app. Entitlements are user specific, not device specific.
 * This allows a user with an entitlement to an app to install the app on all
 * their devices. It's also possible for a user to hold an entitlement to an app
 * without installing the app on any device. The API can be used to create an
 * entitlement. As an option, you can also use the API to trigger the
 * installation of an app on all a user's managed devices at the same time the
 * entitlement is created. If the app is free, creating the entitlement also
 * creates a group license for that app. For paid apps, creating the entitlement
 * consumes one license, and that license remains consumed until the entitlement
 * is removed. If the enterprise hasn't purchased enough licenses, then no
 * entitlement is created and the installation fails. An entitlement is also not
 * created for an app if the app requires permissions that the enterprise hasn't
 * accepted. If an entitlement is deleted, the app may be uninstalled from a
 * user's device. As a best practice, uninstall the app by calling
 * Installs.delete() before deleting the entitlement. Entitlements for apps that
 * a user pays for on an unmanaged profile have "userPurchase" as the
 * entitlement reason. These entitlements cannot be removed via the API.
 */
export interface Entitlement {
  /**
   * The ID of the product that the entitlement is for. For example,
   * "app:com.google.android.gm".
   */
  productId?: string;
  /**
   * The reason for the entitlement. For example, "free" for free apps. This
   * property is temporary: it will be replaced by the acquisition kind field of
   * group licenses.
   */
  reason?:  | "free" | "groupLicense" | "userPurchase";
}

export interface EntitlementsListResponse {
  /**
   * An entitlement of a user to a product (e.g. an app). For example, a free
   * app that they have installed, or a paid app that they have been allocated a
   * license to.
   */
  entitlement?: Entitlement[];
}

/**
 * Additional options for androidenterprise#entitlementsUpdate.
 */
export interface EntitlementsUpdateOptions {
  /**
   * Set to true to also install the product on all the user's devices where
   * possible. Failure to install on one or more devices will not prevent this
   * operation from returning successfully, as long as the entitlement was
   * successfully assigned to the user.
   */
  install?: boolean;
}

/**
 * Contains settings for Google-provided user authentication.
 */
export interface GoogleAuthenticationSettings {
  /**
   * Whether dedicated devices are allowed.
   */
  dedicatedDevicesAllowed?:  | "dedicatedDevicesAllowedUnspecified" | "disallowed" | "allowed";
  /**
   * Whether Google authentication is required.
   */
  googleAuthenticationRequired?:  | "googleAuthenticationRequiredUnspecified" | "notRequired" | "required";
}

/**
 * Group license objects allow you to keep track of licenses (called
 * entitlements) for both free and paid apps. For a free app, a group license is
 * created when an enterprise admin first approves the product in Google Play or
 * when the first entitlement for the product is created for a user via the API.
 * For a paid app, a group license object is only created when an enterprise
 * admin purchases the product in Google Play for the first time. Use the API to
 * query group licenses. A Grouplicenses resource includes the total number of
 * licenses purchased (paid apps only) and the total number of licenses
 * currently in use. In other words, the total number of Entitlements that exist
 * for the product. Only one group license object is created per product and
 * group license objects are never deleted. If a product is unapproved, its
 * group license remains. This allows enterprise admins to keep track of any
 * remaining entitlements for the product.
 */
export interface GroupLicense {
  /**
   * How this group license was acquired. "bulkPurchase" means that this
   * Grouplicenses resource was created because the enterprise purchased
   * licenses for this product; otherwise, the value is "free" (for free
   * products).
   */
  acquisitionKind?:  | "free" | "bulkPurchase";
  /**
   * Whether the product to which this group license relates is currently
   * approved by the enterprise. Products are approved when a group license is
   * first created, but this approval may be revoked by an enterprise admin via
   * Google Play. Unapproved products will not be visible to end users in
   * collections, and new entitlements to them should not normally be created.
   */
  approval?:  | "approved" | "unapproved";
  /**
   * The total number of provisioned licenses for this product. Returned by
   * read operations, but ignored in write operations.
   */
  numProvisioned?: number;
  /**
   * The number of purchased licenses (possibly in multiple purchases). If this
   * field is omitted, then there is no limit on the number of licenses that can
   * be provisioned (for example, if the acquisition kind is "free").
   */
  numPurchased?: number;
  /**
   * The permission approval status of the product. This field is only set if
   * the product is approved. Possible states are: - "currentApproved", the
   * current set of permissions is approved, but additional permissions will
   * require the administrator to reapprove the product (If the product was
   * approved without specifying the approved permissions setting, then this is
   * the default behavior.), - "needsReapproval", the product has unapproved
   * permissions. No additional product licenses can be assigned until the
   * product is reapproved, - "allCurrentAndFutureApproved", the current
   * permissions are approved and any future permission updates will be
   * automatically approved without administrator review.
   */
  permissions?:  | "currentApproved" | "needsReapproval" | "allCurrentAndFutureApproved";
  /**
   * The ID of the product that the license is for. For example,
   * "app:com.google.android.gm".
   */
  productId?: string;
}

export interface GroupLicensesListResponse {
  /**
   * A group license for a product approved for use in the enterprise.
   */
  groupLicense?: GroupLicense[];
}

export interface GroupLicenseUsersListResponse {
  /**
   * A user of an enterprise.
   */
  user?: User[];
}

/**
 * The existence of an Installs resource indicates that an app is installed on
 * a particular device (or that an install is pending). The API can be used to
 * create an install resource using the update method. This triggers the actual
 * install of the app on the device. If the user does not already have an
 * entitlement for the app, then an attempt is made to create one. If this fails
 * (for example, because the app is not free and there is no available license),
 * then the creation of the install fails. The API can also be used to update an
 * installed app. If the update method is used on an existing install, then the
 * app will be updated to the latest available version. Note that it is not
 * possible to force the installation of a specific version of an app: the
 * version code is read-only. If a user installs an app themselves (as permitted
 * by the enterprise), then again an install resource and possibly an
 * entitlement resource are automatically created. The API can also be used to
 * delete an install resource, which triggers the removal of the app from the
 * device. Note that deleting an install does not automatically remove the
 * corresponding entitlement, even if there are no remaining installs. The
 * install resource will also be deleted if the user uninstalls the app
 * themselves.
 */
export interface Install {
  /**
   * Install state. The state "installPending" means that an install request
   * has recently been made and download to the device is in progress. The state
   * "installed" means that the app has been installed. This field is read-only.
   */
  installState?:  | "installed" | "installPending";
  /**
   * The ID of the product that the install is for. For example,
   * "app:com.google.android.gm".
   */
  productId?: string;
  /**
   * The version of the installed product. Guaranteed to be set only if the
   * install state is "installed".
   */
  versionCode?: number;
}

/**
 * An event generated when an app installation failed on a device
 */
export interface InstallFailureEvent {
  /**
   * The Android ID of the device. This field will always be present.
   */
  deviceId?: string;
  /**
   * Additional details on the failure if applicable.
   */
  failureDetails?: string;
  /**
   * The reason for the installation failure. This field will always be
   * present.
   */
  failureReason?:  | "unknown" | "timeout";
  /**
   * The id of the product (e.g. "app:com.google.android.gm") for which the
   * install failure event occured. This field will always be present.
   */
  productId?: string;
  /**
   * The ID of the user. This field will always be present.
   */
  userId?: string;
}

export interface InstallsListResponse {
  /**
   * An installation of an app for a user on a specific device. The existence
   * of an install implies that the user must have an entitlement to the app.
   */
  install?: Install[];
}

/**
 * Represents a keyed app state containing a key, timestamp, severity level,
 * optional description, and optional data.
 */
export interface KeyedAppState {
  /**
   * Additional field intended for machine-readable data. For example, a number
   * or JSON object. To prevent XSS, we recommend removing any HTML from the
   * data before displaying it.
   */
  data?: string;
  /**
   * Key indicating what the app is providing a state for. The content of the
   * key is set by the app's developer. To prevent XSS, we recommend removing
   * any HTML from the key before displaying it. This field will always be
   * present.
   */
  key?: string;
  /**
   * Free-form, human-readable message describing the app state. For example,
   * an error message. To prevent XSS, we recommend removing any HTML from the
   * message before displaying it.
   */
  message?: string;
  /**
   * Severity of the app state. This field will always be present.
   */
  severity?:  | "severityUnknown" | "severityInfo" | "severityError";
  /**
   * Timestamp of when the app set the state in milliseconds since epoch. This
   * field will always be present.
   */
  stateTimestampMillis?: bigint;
}

function serializeKeyedAppState(data: any): KeyedAppState {
  return {
    ...data,
    stateTimestampMillis: data["stateTimestampMillis"] !== undefined ? String(data["stateTimestampMillis"]) : undefined,
  };
}

function deserializeKeyedAppState(data: any): KeyedAppState {
  return {
    ...data,
    stateTimestampMillis: data["stateTimestampMillis"] !== undefined ? BigInt(data["stateTimestampMillis"]) : undefined,
  };
}

/**
 * A localized string with its locale.
 */
export interface LocalizedText {
  /**
   * The BCP47 tag for a locale. (e.g. "en-US", "de").
   */
  locale?: string;
  /**
   * The text localized in the associated locale.
   */
  text?: string;
}

/**
 * Maintenance window for managed Google Play Accounts. This allows Play store
 * to update the apps on the foreground in the designated window.
 */
export interface MaintenanceWindow {
  /**
   * Duration of the maintenance window, in milliseconds. The duration must be
   * between 30 minutes and 24 hours (inclusive).
   */
  durationMs?: bigint;
  /**
   * Start time of the maintenance window, in milliseconds after midnight on
   * the device. Windows can span midnight.
   */
  startTimeAfterMidnightMs?: bigint;
}

function serializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    durationMs: data["durationMs"] !== undefined ? String(data["durationMs"]) : undefined,
    startTimeAfterMidnightMs: data["startTimeAfterMidnightMs"] !== undefined ? String(data["startTimeAfterMidnightMs"]) : undefined,
  };
}

function deserializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    durationMs: data["durationMs"] !== undefined ? BigInt(data["durationMs"]) : undefined,
    startTimeAfterMidnightMs: data["startTimeAfterMidnightMs"] !== undefined ? BigInt(data["startTimeAfterMidnightMs"]) : undefined,
  };
}

/**
 * A managed configuration resource contains the set of managed properties
 * defined by the app developer in the app's managed configurations schema, as
 * well as any configuration variables defined for the user.
 */
export interface ManagedConfiguration {
  /**
   * Contains the ID of the managed configuration profile and the set of
   * configuration variables (if any) defined for the user.
   */
  configurationVariables?: ConfigurationVariables;
  /**
   * Deprecated.
   */
  kind?: string;
  /**
   * The set of managed properties for this configuration.
   */
  managedProperty?: ManagedProperty[];
  /**
   * The ID of the product that the managed configuration is for, e.g.
   * "app:com.google.android.gm".
   */
  productId?: string;
}

export interface ManagedConfigurationsForDeviceListResponse {
  /**
   * A managed configuration for an app on a specific device.
   */
  managedConfigurationForDevice?: ManagedConfiguration[];
}

export interface ManagedConfigurationsForUserListResponse {
  /**
   * A managed configuration for an app for a specific user.
   */
  managedConfigurationForUser?: ManagedConfiguration[];
}

/**
 * A managed configurations settings resource contains the set of managed
 * properties that have been configured for an Android app to be applied to a
 * set of users. The app's developer would have defined configurable properties
 * in the managed configurations schema.
 */
export interface ManagedConfigurationsSettings {
  /**
   * The last updated time of the managed configuration settings in
   * milliseconds since 1970-01-01T00:00:00Z.
   */
  lastUpdatedTimestampMillis?: bigint;
  /**
   * The ID of the managed configurations settings.
   */
  mcmId?: string;
  /**
   * The name of the managed configurations settings.
   */
  name?: string;
}

function serializeManagedConfigurationsSettings(data: any): ManagedConfigurationsSettings {
  return {
    ...data,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? String(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

function deserializeManagedConfigurationsSettings(data: any): ManagedConfigurationsSettings {
  return {
    ...data,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? BigInt(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

export interface ManagedConfigurationsSettingsListResponse {
  /**
   * A managed configurations settings for an app that may be assigned to a
   * group of users in an enterprise.
   */
  managedConfigurationsSettings?: ManagedConfigurationsSettings[];
}

function serializeManagedConfigurationsSettingsListResponse(data: any): ManagedConfigurationsSettingsListResponse {
  return {
    ...data,
    managedConfigurationsSettings: data["managedConfigurationsSettings"] !== undefined ? data["managedConfigurationsSettings"].map((item: any) => (serializeManagedConfigurationsSettings(item))) : undefined,
  };
}

function deserializeManagedConfigurationsSettingsListResponse(data: any): ManagedConfigurationsSettingsListResponse {
  return {
    ...data,
    managedConfigurationsSettings: data["managedConfigurationsSettings"] !== undefined ? data["managedConfigurationsSettings"].map((item: any) => (deserializeManagedConfigurationsSettings(item))) : undefined,
  };
}

/**
 * A managed property of a managed configuration. The property must match one
 * of the properties in the app restrictions schema of the product. Exactly one
 * of the value fields must be populated, and it must match the property's type
 * in the app restrictions schema.
 */
export interface ManagedProperty {
  /**
   * The unique key that identifies the property.
   */
  key?: string;
  /**
   * The boolean value - this will only be present if type of the property is
   * bool.
   */
  valueBool?: boolean;
  /**
   * The bundle of managed properties - this will only be present if type of
   * the property is bundle.
   */
  valueBundle?: ManagedPropertyBundle;
  /**
   * The list of bundles of properties - this will only be present if type of
   * the property is bundle_array.
   */
  valueBundleArray?: ManagedPropertyBundle[];
  /**
   * The integer value - this will only be present if type of the property is
   * integer.
   */
  valueInteger?: number;
  /**
   * The string value - this will only be present if type of the property is
   * string, choice or hidden.
   */
  valueString?: string;
  /**
   * The list of string values - this will only be present if type of the
   * property is multiselect.
   */
  valueStringArray?: string[];
}

/**
 * A bundle of managed properties.
 */
export interface ManagedPropertyBundle {
  /**
   * The list of managed properties.
   */
  managedProperty?: ManagedProperty[];
}

/**
 * An event generated when a new device is ready to be managed.
 */
export interface NewDeviceEvent {
  /**
   * The Android ID of the device. This field will always be present.
   */
  deviceId?: string;
  /**
   * Policy app on the device.
   */
  dpcPackageName?: string;
  /**
   * Identifies the extent to which the device is controlled by an Android EMM
   * in various deployment configurations. Possible values include: -
   * "managedDevice", a device where the DPC is set as device owner, -
   * "managedProfile", a device where the DPC is set as profile owner.
   */
  managementType?:  | "managedDevice" | "managedProfile";
  /**
   * The ID of the user. This field will always be present.
   */
  userId?: string;
}

/**
 * An event generated when new permissions are added to an app.
 */
export interface NewPermissionsEvent {
  /**
   * The set of permissions that the enterprise admin has already approved for
   * this application. Use Permissions.Get on the EMM API to retrieve details
   * about these permissions.
   */
  approvedPermissions?: string[];
  /**
   * The id of the product (e.g. "app:com.google.android.gm") for which new
   * permissions were added. This field will always be present.
   */
  productId?: string;
  /**
   * The set of permissions that the app is currently requesting. Use
   * Permissions.Get on the EMM API to retrieve details about these permissions.
   */
  requestedPermissions?: string[];
}

/**
 * A notification of one event relating to an enterprise.
 */
export interface Notification {
  /**
   * Notifications about new app restrictions schema changes.
   */
  appRestrictionsSchemaChangeEvent?: AppRestrictionsSchemaChangeEvent;
  /**
   * Notifications about app updates.
   */
  appUpdateEvent?: AppUpdateEvent;
  /**
   * Notifications about device report updates.
   */
  deviceReportUpdateEvent?: DeviceReportUpdateEvent;
  /**
   * The ID of the enterprise for which the notification is sent. This will
   * always be present.
   */
  enterpriseId?: string;
  /**
   * Notifications about an app installation failure.
   */
  installFailureEvent?: InstallFailureEvent;
  /**
   * Notifications about new devices.
   */
  newDeviceEvent?: NewDeviceEvent;
  /**
   * Notifications about new app permissions.
   */
  newPermissionsEvent?: NewPermissionsEvent;
  /**
   * Type of the notification.
   */
  notificationType?:  | "unknown" | "testNotification" | "productApproval" | "installFailure" | "appUpdate" | "newPermissions" | "appRestricionsSchemaChange" | "productAvailabilityChange" | "newDevice" | "deviceReportUpdate";
  /**
   * Notifications about changes to a product's approval status.
   */
  productApprovalEvent?: ProductApprovalEvent;
  /**
   * Notifications about product availability changes.
   */
  productAvailabilityChangeEvent?: ProductAvailabilityChangeEvent;
  /**
   * The time when the notification was published in milliseconds since
   * 1970-01-01T00:00:00Z. This will always be present.
   */
  timestampMillis?: bigint;
}

function serializeNotification(data: any): Notification {
  return {
    ...data,
    deviceReportUpdateEvent: data["deviceReportUpdateEvent"] !== undefined ? serializeDeviceReportUpdateEvent(data["deviceReportUpdateEvent"]) : undefined,
    timestampMillis: data["timestampMillis"] !== undefined ? String(data["timestampMillis"]) : undefined,
  };
}

function deserializeNotification(data: any): Notification {
  return {
    ...data,
    deviceReportUpdateEvent: data["deviceReportUpdateEvent"] !== undefined ? deserializeDeviceReportUpdateEvent(data["deviceReportUpdateEvent"]) : undefined,
    timestampMillis: data["timestampMillis"] !== undefined ? BigInt(data["timestampMillis"]) : undefined,
  };
}

/**
 * A resource returned by the PullNotificationSet API, which contains a
 * collection of notifications for enterprises associated with the service
 * account authenticated for the request.
 */
export interface NotificationSet {
  /**
   * The notifications received, or empty if no notifications are present.
   */
  notification?: Notification[];
  /**
   * The notification set ID, required to mark the notification as received
   * with the Enterprises.AcknowledgeNotification API. This will be omitted if
   * no notifications are present.
   */
  notificationSetId?: string;
}

function serializeNotificationSet(data: any): NotificationSet {
  return {
    ...data,
    notification: data["notification"] !== undefined ? data["notification"].map((item: any) => (serializeNotification(item))) : undefined,
  };
}

function deserializeNotificationSet(data: any): NotificationSet {
  return {
    ...data,
    notification: data["notification"] !== undefined ? data["notification"].map((item: any) => (deserializeNotification(item))) : undefined,
  };
}

/**
 * Information about the current page. List operations that supports paging
 * return only one "page" of results. This protocol buffer message describes the
 * page that has been returned.
 */
export interface PageInfo {
  /**
   * Maximum number of results returned in one page. ! The number of results
   * included in the API response.
   */
  resultPerPage?: number;
  /**
   * Index of the first result returned in the current page.
   */
  startIndex?: number;
  /**
   * Total number of results available on the backend ! The total number of
   * results in the result set.
   */
  totalResults?: number;
}

/**
 * A Permissions resource represents some extra capability, to be granted to an
 * Android app, which requires explicit consent. An enterprise admin must
 * consent to these permissions on behalf of their users before an entitlement
 * for the app can be created. The permissions collection is read-only. The
 * information provided for each permission (localized name and description) is
 * intended to be used in the MDM user interface when obtaining consent from the
 * enterprise.
 */
export interface Permission {
  /**
   * A longer description of the Permissions resource, giving more details of
   * what it affects.
   */
  description?: string;
  /**
   * The name of the permission.
   */
  name?: string;
  /**
   * An opaque string uniquely identifying the permission.
   */
  permissionId?: string;
}

/**
 * Additional options for androidenterprise#permissionsGet.
 */
export interface PermissionsGetOptions {
  /**
   * The BCP47 tag for the user's preferred language (e.g. "en-US", "de")
   */
  language?: string;
}

/**
 * The device policy for a given managed device.
 */
export interface Policy {
  /**
   * Recommended alternative: autoUpdateMode which is set per app, provides
   * greater flexibility around update frequency. When autoUpdateMode is set to
   * AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, this field has no
   * effect. "choiceToTheUser" allows the device's user to configure the app
   * update policy. "always" enables auto updates. "never" disables auto
   * updates. "wifiOnly" enables auto updates only when the device is connected
   * to wifi.
   */
  autoUpdatePolicy?:  | "autoUpdatePolicyUnspecified" | "choiceToTheUser" | "never" | "wifiOnly" | "always";
  /**
   * Whether the device reports app states to the EMM. The default value is
   * "deviceReportDisabled".
   */
  deviceReportPolicy?:  | "deviceReportPolicyUnspecified" | "deviceReportDisabled" | "deviceReportEnabled";
  /**
   * The maintenance window defining when apps running in the foreground should
   * be updated.
   */
  maintenanceWindow?: MaintenanceWindow;
  /**
   * The availability granted to the device for the specified products. "all"
   * gives the device access to all products, regardless of approval status.
   * "all" does not enable automatic visibility of "alpha" or "beta" tracks.
   * "whitelist" grants the device access the products specified in
   * productPolicy[]. Only products that are approved or products that were
   * previously approved (products with revoked approval) by the enterprise can
   * be whitelisted. If no value is provided, the availability set at the user
   * level is applied by default.
   */
  productAvailabilityPolicy?:  | "productAvailabilityPolicyUnspecified" | "whitelist" | "all";
  /**
   * The list of product policies. The productAvailabilityPolicy needs to be
   * set to WHITELIST or ALL for the product policies to be applied.
   */
  productPolicy?: ProductPolicy[];
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    maintenanceWindow: data["maintenanceWindow"] !== undefined ? serializeMaintenanceWindow(data["maintenanceWindow"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    maintenanceWindow: data["maintenanceWindow"] !== undefined ? deserializeMaintenanceWindow(data["maintenanceWindow"]) : undefined,
  };
}

/**
 * A Products resource represents an app in the Google Play store that is
 * available to at least some users in the enterprise. (Some apps are restricted
 * to a single enterprise, and no information about them is made available
 * outside that enterprise.) The information provided for each product
 * (localized name, icon, link to the full Google Play details page) is intended
 * to allow a basic representation of the product within an EMM user interface.
 */
export interface Product {
  /**
   * The app restriction schema
   */
  appRestrictionsSchema?: AppRestrictionsSchema;
  /**
   * The tracks visible to the enterprise.
   */
  appTracks?: TrackInfo[];
  /**
   * App versions currently available for this product.
   */
  appVersion?: AppVersion[];
  /**
   * The name of the author of the product (for example, the app developer).
   */
  authorName?: string;
  /**
   * The countries which this app is available in.
   */
  availableCountries?: string[];
  /**
   * Deprecated, use appTracks instead.
   */
  availableTracks?:  | "appTrackUnspecified" | "production" | "beta" | "alpha"[];
  /**
   * The app category (e.g. RACING, SOCIAL, etc.)
   */
  category?: string;
  /**
   * The content rating for this app.
   */
  contentRating?:  | "ratingUnknown" | "all" | "preTeen" | "teen" | "mature";
  /**
   * The localized promotional description, if available.
   */
  description?: string;
  /**
   * A link to the (consumer) Google Play details page for the product.
   */
  detailsUrl?: string;
  /**
   * How and to whom the package is made available. The value
   * publicGoogleHosted means that the package is available through the Play
   * store and not restricted to a specific enterprise. The value
   * privateGoogleHosted means that the package is a private app (restricted to
   * an enterprise) but hosted by Google. The value privateSelfHosted means that
   * the package is a private app (restricted to an enterprise) and is privately
   * hosted.
   */
  distributionChannel?:  | "publicGoogleHosted" | "privateGoogleHosted" | "privateSelfHosted";
  /**
   * Noteworthy features (if any) of this product.
   */
  features?:  | "featureUnknown" | "vpnApp"[];
  /**
   * A link to an image that can be used as an icon for the product. This image
   * is suitable for use at up to 512px x 512px.
   */
  iconUrl?: string;
  /**
   * The approximate time (within 7 days) the app was last published, expressed
   * in milliseconds since epoch.
   */
  lastUpdatedTimestampMillis?: bigint;
  /**
   * The minimum Android SDK necessary to run the app.
   */
  minAndroidSdkVersion?: number;
  /**
   * A list of permissions required by the app.
   */
  permissions?: ProductPermission[];
  /**
   * A string of the form *app:<package name>*. For example,
   * app:com.google.android.gm represents the Gmail app.
   */
  productId?: string;
  /**
   * Whether this product is free, free with in-app purchases, or paid. If the
   * pricing is unknown, this means the product is not generally available
   * anymore (even though it might still be available to people who own it).
   */
  productPricing?:  | "unknown" | "free" | "freeWithInAppPurchase" | "paid";
  /**
   * A description of the recent changes made to the app.
   */
  recentChanges?: string;
  /**
   * Deprecated.
   */
  requiresContainerApp?: boolean;
  /**
   * A list of screenshot links representing the app.
   */
  screenshotUrls?: string[];
  /**
   * The certificate used to sign this product.
   */
  signingCertificate?: ProductSigningCertificate;
  /**
   * A link to a smaller image that can be used as an icon for the product.
   * This image is suitable for use at up to 128px x 128px.
   */
  smallIconUrl?: string;
  /**
   * The name of the product.
   */
  title?: string;
  /**
   * A link to the managed Google Play details page for the product, for use by
   * an Enterprise admin.
   */
  workDetailsUrl?: string;
}

function serializeProduct(data: any): Product {
  return {
    ...data,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? String(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

function deserializeProduct(data: any): Product {
  return {
    ...data,
    lastUpdatedTimestampMillis: data["lastUpdatedTimestampMillis"] !== undefined ? BigInt(data["lastUpdatedTimestampMillis"]) : undefined,
  };
}

/**
 * An event generated when a product's approval status is changed.
 */
export interface ProductApprovalEvent {
  /**
   * Whether the product was approved or unapproved. This field will always be
   * present.
   */
  approved?:  | "unknown" | "approved" | "unapproved";
  /**
   * The id of the product (e.g. "app:com.google.android.gm") for which the
   * approval status has changed. This field will always be present.
   */
  productId?: string;
}

/**
 * An event generated whenever a product's availability changes.
 */
export interface ProductAvailabilityChangeEvent {
  /**
   * The new state of the product. This field will always be present.
   */
  availabilityStatus?:  | "unknown" | "available" | "removed" | "unpublished";
  /**
   * The id of the product (e.g. "app:com.google.android.gm") for which the
   * product availability changed. This field will always be present.
   */
  productId?: string;
}

/**
 * A product permissions resource represents the set of permissions required by
 * a specific app and whether or not they have been accepted by an enterprise
 * admin. The API can be used to read the set of permissions, and also to update
 * the set to indicate that permissions have been accepted.
 */
export interface ProductPermission {
  /**
   * An opaque string uniquely identifying the permission.
   */
  permissionId?: string;
  /**
   * Whether the permission has been accepted or not.
   */
  state?:  | "required" | "accepted";
}

/**
 * Information about the permissions required by a specific app and whether
 * they have been accepted by the enterprise.
 */
export interface ProductPermissions {
  /**
   * The permissions required by the app.
   */
  permission?: ProductPermission[];
  /**
   * The ID of the app that the permissions relate to, e.g.
   * "app:com.google.android.gm".
   */
  productId?: string;
}

/**
 * The policy for a product.
 */
export interface ProductPolicy {
  /**
   * The auto-install policy for the product.
   */
  autoInstallPolicy?: AutoInstallPolicy;
  /**
   * The auto-update mode for the product.
   */
  autoUpdateMode?:  | "autoUpdateModeUnspecified" | "autoUpdateDefault" | "autoUpdatePostponed" | "autoUpdateHighPriority";
  /**
   * An authentication URL configuration for the authenticator app of an
   * identity provider. This helps to launch the identity provider's
   * authenticator app during the authentication happening in a private app
   * using Android WebView. Authenticator app should already be the [default
   * handler](https://developer.android.com/training/app-links/verify-site-associations)
   * for the authentication url on the device.
   */
  enterpriseAuthenticationAppLinkConfigs?: EnterpriseAuthenticationAppLinkConfig[];
  /**
   * The managed configuration for the product.
   */
  managedConfiguration?: ManagedConfiguration;
  /**
   * The ID of the product. For example, "app:com.google.android.gm".
   */
  productId?: string;
  /**
   * Grants the device visibility to the specified product release track(s),
   * identified by trackIds. The list of release tracks of a product can be
   * obtained by calling Products.Get.
   */
  trackIds?: string[];
  /**
   * Deprecated. Use trackIds instead.
   */
  tracks?:  | "appTrackUnspecified" | "production" | "beta" | "alpha"[];
}

export interface ProductsApproveRequest {
  /**
   * The approval URL that was shown to the user. Only the permissions shown to
   * the user with that URL will be accepted, which may not be the product's
   * entire set of permissions. For example, the URL may only display new
   * permissions from an update after the product was approved, or not include
   * new permissions if the product was updated since the URL was generated.
   */
  approvalUrlInfo?: ApprovalUrlInfo;
  /**
   * Sets how new permission requests for the product are handled.
   * "allPermissions" automatically approves all current and future permissions
   * for the product. "currentPermissionsOnly" approves the current set of
   * permissions for the product, but any future permissions added through
   * updates will require manual reapproval. If not specified, only the current
   * set of permissions will be approved.
   */
  approvedPermissions?:  | "currentPermissionsOnly" | "allPermissions";
}

/**
 * A set of products.
 */
export interface ProductSet {
  /**
   * The list of product IDs making up the set of products.
   */
  productId?: string[];
  /**
   * The interpretation of this product set. "unknown" should never be sent and
   * is ignored if received. "whitelist" means that the user is entitled to
   * access the product set. "includeAll" means that all products are
   * accessible, including products that are approved, products with revoked
   * approval, and products that have never been approved. "allApproved" means
   * that the user is entitled to access all products that are approved for the
   * enterprise. If the value is "allApproved" or "includeAll", the productId
   * field is ignored. If no value is provided, it is interpreted as "whitelist"
   * for backwards compatibility. Further "allApproved" or "includeAll" does not
   * enable automatic visibility of "alpha" or "beta" tracks for Android app.
   * Use ProductVisibility to enable "alpha" or "beta" tracks per user.
   */
  productSetBehavior?:  | "unknown" | "whitelist" | "includeAll" | "allApproved";
  /**
   * Additional list of product IDs making up the product set. Unlike the
   * productID array, in this list It's possible to specify which tracks (alpha,
   * beta, production) of a product are visible to the user. See
   * ProductVisibility and its fields for more information. Specifying the same
   * product ID both here and in the productId array is not allowed and it will
   * result in an error.
   */
  productVisibility?: ProductVisibility[];
}

/**
 * Additional options for androidenterprise#productsGenerateApprovalUrl.
 */
export interface ProductsGenerateApprovalUrlOptions {
  /**
   * The BCP 47 language code used for permission names and descriptions in the
   * returned iframe, for instance "en-US".
   */
  languageCode?: string;
}

export interface ProductsGenerateApprovalUrlResponse {
  /**
   * A URL that can be rendered in an iframe to display the permissions (if
   * any) of a product. This URL can be used to approve the product only once
   * and only within 24 hours of being generated, using the Products.approve
   * call. If the product is currently unapproved and has no permissions, this
   * URL will point to an empty page. If the product is currently approved, a
   * URL will only be generated if that product has added permissions since it
   * was last approved, and the URL will only display those new permissions that
   * have not yet been accepted.
   */
  url?: string;
}

/**
 * Additional options for androidenterprise#productsGetAppRestrictionsSchema.
 */
export interface ProductsGetAppRestrictionsSchemaOptions {
  /**
   * The BCP47 tag for the user's preferred language (e.g. "en-US", "de").
   */
  language?: string;
}

/**
 * Additional options for androidenterprise#productsGet.
 */
export interface ProductsGetOptions {
  /**
   * The BCP47 tag for the user's preferred language (e.g. "en-US", "de").
   */
  language?: string;
}

export interface ProductSigningCertificate {
  /**
   * The base64 urlsafe encoded SHA1 hash of the certificate. (This field is
   * deprecated in favor of SHA2-256. It should not be used and may be removed
   * at any time.)
   */
  certificateHashSha1?: string;
  /**
   * The base64 urlsafe encoded SHA2-256 hash of the certificate.
   */
  certificateHashSha256?: string;
}

/**
 * Additional options for androidenterprise#productsList.
 */
export interface ProductsListOptions {
  /**
   * Specifies whether to search among all products (false) or among only
   * products that have been approved (true). Only "true" is supported, and
   * should be specified.
   */
  approved?: boolean;
  /**
   * The BCP47 tag for the user's preferred language (e.g. "en-US", "de").
   * Results are returned in the language best matching the preferred language.
   */
  language?: string;
  /**
   * Defines how many results the list operation should return. The default
   * number depends on the resource collection.
   */
  maxResults?: number;
  /**
   * The search query as typed in the Google Play store search box. If omitted,
   * all approved apps will be returned (using the pagination parameters),
   * including apps that are not available in the store (e.g. unpublished apps).
   */
  query?: string;
  /**
   * Defines the token of the page to return, usually taken from
   * TokenPagination. This can only be used if token paging is enabled.
   */
  token?: string;
}

export interface ProductsListResponse {
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * Information about a product (e.g. an app) in the Google Play store, for
   * display to an enterprise admin.
   */
  product?: Product[];
  /**
   * Pagination information for token pagination.
   */
  tokenPagination?: TokenPagination;
}

function serializeProductsListResponse(data: any): ProductsListResponse {
  return {
    ...data,
    product: data["product"] !== undefined ? data["product"].map((item: any) => (serializeProduct(item))) : undefined,
  };
}

function deserializeProductsListResponse(data: any): ProductsListResponse {
  return {
    ...data,
    product: data["product"] !== undefined ? data["product"].map((item: any) => (deserializeProduct(item))) : undefined,
  };
}

/**
 * A product to be made visible to a user.
 */
export interface ProductVisibility {
  /**
   * The product ID to make visible to the user. Required for each item in the
   * productVisibility list.
   */
  productId?: string;
  /**
   * Grants the user visibility to the specified product track(s), identified
   * by trackIds.
   */
  trackIds?: string[];
  /**
   * Deprecated. Use trackIds instead.
   */
  tracks?:  | "appTrackUnspecified" | "production" | "beta" | "alpha"[];
}

/**
 * A service account identity, including the name and credentials that can be
 * used to authenticate as the service account.
 */
export interface ServiceAccount {
  /**
   * Credentials that can be used to authenticate as this ServiceAccount.
   */
  key?: ServiceAccountKey;
  /**
   * The account name of the service account, in the form of an email address.
   * Assigned by the server.
   */
  name?: string;
}

/**
 * Credentials that can be used to authenticate as a service account.
 */
export interface ServiceAccountKey {
  /**
   * The body of the private key credentials file, in string format. This is
   * only populated when the ServiceAccountKey is created, and is not stored by
   * Google.
   */
  data?: string;
  /**
   * An opaque, unique identifier for this ServiceAccountKey. Assigned by the
   * server.
   */
  id?: string;
  /**
   * Public key data for the credentials file. This is an X.509 cert. If you
   * are using the googleCredentials key type, this is identical to the cert
   * that can be retrieved by using the X.509 cert url inside of the credentials
   * file.
   */
  publicData?: string;
  /**
   * The file format of the generated key data.
   */
  type?:  | "googleCredentials" | "pkcs12";
}

export interface ServiceAccountKeysListResponse {
  /**
   * The service account credentials.
   */
  serviceAccountKey?: ServiceAccountKey[];
}

/**
 * A resource returned by the GenerateSignupUrl API, which contains the Signup
 * URL and Completion Token.
 */
export interface SignupInfo {
  /**
   * An opaque token that will be required, along with the Enterprise Token,
   * for obtaining the enterprise resource from CompleteSignup.
   */
  completionToken?: string;
  /**
   * Deprecated.
   */
  kind?: string;
  /**
   * A URL under which the Admin can sign up for an enterprise. The page
   * pointed to cannot be rendered in an iframe.
   */
  url?: string;
}

/**
 * Definition of a managed Google Play store cluster, a list of products
 * displayed as part of a store page.
 */
export interface StoreCluster {
  /**
   * Unique ID of this cluster. Assigned by the server. Immutable once
   * assigned.
   */
  id?: string;
  /**
   * Ordered list of localized strings giving the name of this page. The text
   * displayed is the one that best matches the user locale, or the first entry
   * if there is no good match. There needs to be at least one entry.
   */
  name?: LocalizedText[];
  /**
   * String (US-ASCII only) used to determine order of this cluster within the
   * parent page's elements. Page elements are sorted in lexicographic order of
   * this field. Duplicated values are allowed, but ordering between elements
   * with duplicate order is undefined. The value of this field is never visible
   * to a user, it is used solely for the purpose of defining an ordering.
   * Maximum length is 256 characters.
   */
  orderInPage?: string;
  /**
   * List of products in the order they are displayed in the cluster. There
   * should not be duplicates within a cluster.
   */
  productId?: string[];
}

/**
 * General setting for the managed Google Play store layout, currently only
 * specifying the page to display the first time the store is opened.
 */
export interface StoreLayout {
  /**
   * The ID of the store page to be used as the homepage. The homepage is the
   * first page shown in the managed Google Play Store. Not specifying a
   * homepage is equivalent to setting the store layout type to "basic".
   */
  homepageId?: string;
  /**
   * The store layout type. By default, this value is set to "basic" if the
   * homepageId field is not set, and to "custom" otherwise. If set to "basic",
   * the layout will consist of all approved apps that have been whitelisted for
   * the user.
   */
  storeLayoutType?:  | "unknown" | "basic" | "custom";
}

export interface StoreLayoutClustersListResponse {
  /**
   * A store cluster of an enterprise.
   */
  cluster?: StoreCluster[];
}

export interface StoreLayoutPagesListResponse {
  /**
   * A store page of an enterprise.
   */
  page?: StorePage[];
}

/**
 * Definition of a managed Google Play store page, made of a localized name and
 * links to other pages. A page also contains clusters defined as a
 * subcollection.
 */
export interface StorePage {
  /**
   * Unique ID of this page. Assigned by the server. Immutable once assigned.
   */
  id?: string;
  /**
   * Ordered list of pages a user should be able to reach from this page. The
   * list can't include this page. It is recommended that the basic pages are
   * created first, before adding the links between pages. The API doesn't
   * verify that the pages exist or the pages are reachable.
   */
  link?: string[];
  /**
   * Ordered list of localized strings giving the name of this page. The text
   * displayed is the one that best matches the user locale, or the first entry
   * if there is no good match. There needs to be at least one entry.
   */
  name?: LocalizedText[];
}

/**
 * Pagination information returned by a List operation when token pagination is
 * enabled. List operations that supports paging return only one "page" of
 * results. This protocol buffer message describes the page that has been
 * returned. When using token pagination, clients should use the next/previous
 * token to get another page of the result. The presence or absence of
 * next/previous token indicates whether a next/previous page is available and
 * provides a mean of accessing this page. ListRequest.page_token should be set
 * to either next_page_token or previous_page_token to access another page.
 */
export interface TokenPagination {
  /**
   * Tokens to pass to the standard list field 'page_token'. Whenever
   * available, tokens are preferred over manipulating start_index.
   */
  nextPageToken?: string;
  previousPageToken?: string;
}

/**
 * Id to name association of a track.
 */
export interface TrackInfo {
  /**
   * A modifiable name for a track. This is the visible name in the play
   * developer console.
   */
  trackAlias?: string;
  /**
   * Unmodifiable, unique track identifier. This identifier is the
   * releaseTrackId in the url of the play developer console page that displays
   * the track information.
   */
  trackId?: string;
}

/**
 * A Users resource represents an account associated with an enterprise. The
 * account may be specific to a device or to an individual user (who can then
 * use the account across multiple devices). The account may provide access to
 * managed Google Play only, or to other Google services, depending on the
 * identity model: - The Google managed domain identity model requires
 * synchronization to Google account sources (via primaryEmail). - The managed
 * Google Play Accounts identity model provides a dynamic means for enterprises
 * to create user or device accounts as needed. These accounts provide access to
 * managed Google Play.
 */
export interface User {
  /**
   * A unique identifier you create for this user, such as "user342" or
   * "asset#44418". Do not use personally identifiable information (PII) for
   * this property. Must always be set for EMM-managed users. Not set for
   * Google-managed users.
   */
  accountIdentifier?: string;
  /**
   * The type of account that this user represents. A userAccount can be
   * installed on multiple devices, but a deviceAccount is specific to a single
   * device. An EMM-managed user (emmManaged) can be either type (userAccount,
   * deviceAccount), but a Google-managed user (googleManaged) is always a
   * userAccount.
   */
  accountType?:  | "deviceAccount" | "userAccount";
  /**
   * The name that will appear in user interfaces. Setting this property is
   * optional when creating EMM-managed users. If you do set this property, use
   * something generic about the organization (such as "Example, Inc.") or your
   * name (as EMM). Not used for Google-managed user accounts. @mutable
   * androidenterprise.users.update
   */
  displayName?: string;
  /**
   * The unique ID for the user.
   */
  id?: string;
  /**
   * The entity that manages the user. With googleManaged users, the source of
   * truth is Google so EMMs have to make sure a Google Account exists for the
   * user. With emmManaged users, the EMM is in charge.
   */
  managementType?:  | "googleManaged" | "emmManaged";
  /**
   * The user's primary email address, for example, "jsmith@example.com". Will
   * always be set for Google managed users and not set for EMM managed users.
   */
  primaryEmail?: string;
}

/**
 * Additional options for androidenterprise#usersList.
 */
export interface UsersListOptions {
  /**
   * Required. The exact primary email address of the user to look up.
   */
  email: string;
}

export interface UsersListResponse {
  /**
   * A user of an enterprise.
   */
  user?: User[];
}

/**
 * A variable set is a key-value pair of EMM-provided placeholders and its
 * corresponding value, which is attributed to a user. For example, $FIRSTNAME
 * could be a placeholder, and its value could be Alice. Placeholders should
 * start with a '$' sign and should be alphanumeric only.
 */
export interface VariableSet {
  /**
   * The placeholder string; defined by EMM.
   */
  placeholder?: string;
  /**
   * The value of the placeholder, specific to the user.
   */
  userValue?: string;
}

/**
 * A WebApps resource represents a web app created for an enterprise. Web apps
 * are published to managed Google Play and can be distributed like other
 * Android apps. On a user's device, a web app opens its specified URL.
 */
export interface WebApp {
  /**
   * The display mode of the web app. Possible values include: - "minimalUi",
   * the device's status bar, navigation bar, the app's URL, and a refresh
   * button are visible when the app is open. For HTTP URLs, you can only select
   * this option. - "standalone", the device's status bar and navigation bar are
   * visible when the app is open. - "fullScreen", the app opens in full screen
   * mode, hiding the device's status and navigation bars. All browser UI
   * elements, page URL, system status bar and back button are not visible, and
   * the web app takes up the entirety of the available display area.
   */
  displayMode?:  | "displayModeUnspecified" | "minimalUi" | "standalone" | "fullScreen";
  /**
   * A list of icons representing this website. If absent, a default icon (for
   * create) or the current icon (for update) will be used.
   */
  icons?: WebAppIcon[];
  /**
   * A flag whether the app has been published to the Play store yet.
   */
  isPublished?: boolean;
  /**
   * The start URL, i.e. the URL that should load when the user opens the
   * application.
   */
  startUrl?: string;
  /**
   * The title of the web app as displayed to the user (e.g., amongst a list of
   * other applications, or as a label for an icon).
   */
  title?: string;
  /**
   * The current version of the app. Note that the version can automatically
   * increase during the lifetime of the web app, while Google does internal
   * housekeeping to keep the web app up-to-date.
   */
  versionCode?: bigint;
  /**
   * The ID of the application. A string of the form "app:<package name>" where
   * the package name always starts with the prefix
   * "com.google.enterprise.webapp." followed by a random id.
   */
  webAppId?: string;
}

function serializeWebApp(data: any): WebApp {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? String(data["versionCode"]) : undefined,
  };
}

function deserializeWebApp(data: any): WebApp {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? BigInt(data["versionCode"]) : undefined,
  };
}

/**
 * Icon for a web app.
 */
export interface WebAppIcon {
  /**
   * The actual bytes of the image in a base64url encoded string (c.f. RFC4648,
   * section 5 "Base 64 Encoding with URL and Filename Safe Alphabet"). - The
   * image type can be png or jpg. - The image should ideally be square. - The
   * image should ideally have a size of 512x512.
   */
  imageData?: string;
}

export interface WebAppsListResponse {
  /**
   * The manifest describing a web app.
   */
  webApp?: WebApp[];
}

function serializeWebAppsListResponse(data: any): WebAppsListResponse {
  return {
    ...data,
    webApp: data["webApp"] !== undefined ? data["webApp"].map((item: any) => (serializeWebApp(item))) : undefined,
  };
}

function deserializeWebAppsListResponse(data: any): WebAppsListResponse {
  return {
    ...data,
    webApp: data["webApp"] !== undefined ? data["webApp"].map((item: any) => (deserializeWebApp(item))) : undefined,
  };
}