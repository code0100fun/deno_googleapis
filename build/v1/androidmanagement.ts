// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Android Management API Client for Deno
 * ======================================
 * 
 * The Android Management API provides remote enterprise management of Android devices and apps.
 * 
 * Docs: https://developers.google.com/android/management
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Android Management API provides remote enterprise management of Android
 * devices and apps.
 */
export class AndroidManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://androidmanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets info about an application.
   *
   * @param name The name of the application in the form enterprises/{enterpriseId}/applications/{package_name}.
   */
  async enterprisesApplicationsGet(name: string, opts: EnterprisesApplicationsGetOptions = {}): Promise<Application> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Application;
  }

  /**
   * Creates an enterprise. This is the last step in the enterprise signup
   * flow. See also: SigninDetail
   *
   */
  async enterprisesCreate(req: Enterprise, opts: EnterprisesCreateOptions = {}): Promise<Enterprise> {
    const url = new URL(`${this.#baseUrl}v1/enterprises`);
    if (opts.agreementAccepted !== undefined) {
      url.searchParams.append("agreementAccepted", String(opts.agreementAccepted));
    }
    if (opts.enterpriseToken !== undefined) {
      url.searchParams.append("enterpriseToken", String(opts.enterpriseToken));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.signupUrlName !== undefined) {
      url.searchParams.append("signupUrlName", String(opts.signupUrlName));
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
   * Deletes an enterprise. Only available for EMM-managed enterprises.
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Deletes a device. This operation wipes the device. Deleted devices do not
   * show up in enterprises.devices.list calls and a 404 is returned from
   * enterprises.devices.get.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   */
  async enterprisesDevicesDelete(name: string, opts: EnterprisesDevicesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.wipeDataFlags !== undefined) {
      url.searchParams.append("wipeDataFlags", String(opts.wipeDataFlags));
    }
    if (opts.wipeReasonMessage !== undefined) {
      url.searchParams.append("wipeReasonMessage", String(opts.wipeReasonMessage));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a device. Deleted devices will respond with a 404 error.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   */
  async enterprisesDevicesGet(name: string): Promise<Device> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDevice(data);
  }

  /**
   * Issues a command to a device. The Operation resource returned contains a
   * Command in its metadata field. Use the get operation method to get the
   * status of the command.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   */
  async enterprisesDevicesIssueCommand(name: string, req: Command): Promise<Operation> {
    req = serializeCommand(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:issueCommand`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists devices for a given enterprise. Deleted devices are not returned in
   * the response.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesDevicesList(parent: string, opts: EnterprisesDevicesListOptions = {}): Promise<ListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
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
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async enterprisesDevicesOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async enterprisesDevicesOperationsDelete(name: string): Promise<Empty> {
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
  async enterprisesDevicesOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name
   * binding allows API services to override the binding to use different
   * resource name schemes, such as users/*\/operations. To override the
   * binding, API services can add a binding such as
   * "/v1/{name=users/*}/operations" to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async enterprisesDevicesOperationsList(name: string, opts: EnterprisesDevicesOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as ListOperationsResponse;
  }

  /**
   * Updates a device.
   *
   * @param name The name of the device in the form enterprises/{enterpriseId}/devices/{deviceId}.
   */
  async enterprisesDevicesPatch(name: string, req: Device, opts: EnterprisesDevicesPatchOptions = {}): Promise<Device> {
    req = serializeDevice(req);
    opts = serializeEnterprisesDevicesPatchOptions(opts);
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
   * Creates an enrollment token for a given enterprise. It's up to the
   * caller's responsibility to manage the lifecycle of newly created tokens and
   * deleting them when they're not intended to be used anymore. Once an
   * enrollment token has been created, it's not possible to retrieve the
   * token's content anymore using AM API. It is recommended for EMMs to
   * securely store the token if it's intended to be reused.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesEnrollmentTokensCreate(parent: string, req: EnrollmentToken): Promise<EnrollmentToken> {
    req = serializeEnrollmentToken(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/enrollmentTokens`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEnrollmentToken(data);
  }

  /**
   * Deletes an enrollment token. This operation invalidates the token,
   * preventing its future use.
   *
   * @param name The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}.
   */
  async enterprisesEnrollmentTokensDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an active, unexpired enrollment token. Only a partial view of
   * EnrollmentToken is returned: all the fields but name and
   * expiration_timestamp are empty. This method is meant to help manage active
   * enrollment tokens lifecycle. For security reasons, it's recommended to
   * delete active enrollment tokens as soon as they're not intended to be used
   * anymore.
   *
   * @param name Required. The name of the enrollment token in the form enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}.
   */
  async enterprisesEnrollmentTokensGet(name: string): Promise<EnrollmentToken> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEnrollmentToken(data);
  }

  /**
   * Lists active, unexpired enrollment tokens for a given enterprise. The list
   * items contain only a partial view of EnrollmentToken: all the fields but
   * name and expiration_timestamp are empty. This method is meant to help
   * manage active enrollment tokens lifecycle. For security reasons, it's
   * recommended to delete active enrollment tokens as soon as they're not
   * intended to be used anymore.
   *
   * @param parent Required. The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesEnrollmentTokensList(parent: string, opts: EnterprisesEnrollmentTokensListOptions = {}): Promise<ListEnrollmentTokensResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/enrollmentTokens`);
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
    return deserializeListEnrollmentTokensResponse(data);
  }

  /**
   * Gets an enterprise.
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesGet(name: string): Promise<Enterprise> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Enterprise;
  }

  /**
   * Lists EMM-managed enterprises. Only BASIC fields are returned.
   *
   */
  async enterprisesList(opts: EnterprisesListOptions = {}): Promise<ListEnterprisesResponse> {
    const url = new URL(`${this.#baseUrl}v1/enterprises`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListEnterprisesResponse;
  }

  /**
   * Updates an enterprise. See also: SigninDetail
   *
   * @param name The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesPatch(name: string, req: Enterprise, opts: EnterprisesPatchOptions = {}): Promise<Enterprise> {
    opts = serializeEnterprisesPatchOptions(opts);
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
    return data as Enterprise;
  }

  /**
   * Deletes a policy. This operation is only permitted if no devices are
   * currently referencing the policy.
   *
   * @param name The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   */
  async enterprisesPoliciesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a policy.
   *
   * @param name The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   */
  async enterprisesPoliciesGet(name: string): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists policies for a given enterprise.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesPoliciesList(parent: string, opts: EnterprisesPoliciesListOptions = {}): Promise<ListPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/policies`);
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
    return deserializeListPoliciesResponse(data);
  }

  /**
   * Updates or creates a policy.
   *
   * @param name The name of the policy in the form enterprises/{enterpriseId}/policies/{policyId}.
   */
  async enterprisesPoliciesPatch(name: string, req: Policy, opts: EnterprisesPoliciesPatchOptions = {}): Promise<Policy> {
    req = serializePolicy(req);
    opts = serializeEnterprisesPoliciesPatchOptions(opts);
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
    return deserializePolicy(data);
  }

  /**
   * Creates a web app.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesWebAppsCreate(parent: string, req: WebApp): Promise<WebApp> {
    req = serializeWebApp(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/webApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWebApp(data);
  }

  /**
   * Deletes a web app.
   *
   * @param name The name of the web app in the form enterprises/{enterpriseId}/webApps/{packageName}.
   */
  async enterprisesWebAppsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a web app.
   *
   * @param name The name of the web app in the form enterprises/{enterpriseId}/webApp/{packageName}.
   */
  async enterprisesWebAppsGet(name: string): Promise<WebApp> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWebApp(data);
  }

  /**
   * Lists web apps for a given enterprise.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesWebAppsList(parent: string, opts: EnterprisesWebAppsListOptions = {}): Promise<ListWebAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/webApps`);
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
    return deserializeListWebAppsResponse(data);
  }

  /**
   * Updates a web app.
   *
   * @param name The name of the web app in the form enterprises/{enterpriseId}/webApps/{packageName}.
   */
  async enterprisesWebAppsPatch(name: string, req: WebApp, opts: EnterprisesWebAppsPatchOptions = {}): Promise<WebApp> {
    req = serializeWebApp(req);
    opts = serializeEnterprisesWebAppsPatchOptions(opts);
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
    return deserializeWebApp(data);
  }

  /**
   * Creates a web token to access an embeddable managed Google Play web UI for
   * a given enterprise.
   *
   * @param parent The name of the enterprise in the form enterprises/{enterpriseId}.
   */
  async enterprisesWebTokensCreate(parent: string, req: WebToken): Promise<WebToken> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/webTokens`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WebToken;
  }

  /**
   * Creates an enterprise signup URL.
   *
   */
  async signupUrlsCreate(opts: SignupUrlsCreateOptions = {}): Promise<SignupUrl> {
    const url = new URL(`${this.#baseUrl}v1/signupUrls`);
    if (opts.callbackUrl !== undefined) {
      url.searchParams.append("callbackUrl", String(opts.callbackUrl));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as SignupUrl;
  }
}

/**
 * A shell command was issued over ADB via “adb shell command”.
 */
export interface AdbShellCommandEvent {
  /**
   * Shell command that was issued over ADB via "adb shell command". Redacted
   * to empty string on organization-owned managed profile devices.
   */
  shellCmd?: string;
}

/**
 * An ADB interactive shell was opened via “adb shell”. Intentionally empty.
 */
export interface AdbShellInteractiveEvent {
}

/**
 * Security policies set to secure values by default. To maintain the security
 * posture of a device, we don't recommend overriding any of the default values.
 */
export interface AdvancedSecurityOverrides {
  /**
   * Controls Common Criteria Mode—security standards defined in the Common
   * Criteria for Information Technology Security Evaluation
   * (https://www.commoncriteriaportal.org/) (CC). Enabling Common Criteria Mode
   * increases certain security components on a device, including AES-GCM
   * encryption of Bluetooth Long Term Keys, and Wi-Fi configuration
   * stores.Warning: Common Criteria Mode enforces a strict security model
   * typically only required for IT products used in national security systems
   * and other highly sensitive organizations. Standard device use may be
   * affected. Only enabled if required.
   */
  commonCriteriaMode?:  | "COMMON_CRITERIA_MODE_UNSPECIFIED" | "COMMON_CRITERIA_MODE_DISABLED" | "COMMON_CRITERIA_MODE_ENABLED";
  /**
   * Controls access to developer settings: developer options and safe boot.
   * Replaces safeBootDisabled (deprecated) and debuggingFeaturesAllowed
   * (deprecated).
   */
  developerSettings?:  | "DEVELOPER_SETTINGS_UNSPECIFIED" | "DEVELOPER_SETTINGS_DISABLED" | "DEVELOPER_SETTINGS_ALLOWED";
  /**
   * Whether Google Play Protect verification
   * (https://support.google.com/accounts/answer/2812853) is enforced. Replaces
   * ensureVerifyAppsEnabled (deprecated).
   */
  googlePlayProtectVerifyApps?:  | "GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED" | "VERIFY_APPS_ENFORCED" | "VERIFY_APPS_USER_CHOICE";
  /**
   * Personal apps that can read work profile notifications using a
   * NotificationListenerService
   * (https://developer.android.com/reference/android/service/notification/NotificationListenerService).
   * By default, no personal apps (aside from system apps) can read work
   * notifications. Each value in the list must be a package name.
   */
  personalAppsThatCanReadWorkNotifications?: string[];
  /**
   * The policy for untrusted apps (apps from unknown sources) enforced on the
   * device. Replaces install_unknown_sources_allowed (deprecated).
   */
  untrustedAppsPolicy?:  | "UNTRUSTED_APPS_POLICY_UNSPECIFIED" | "DISALLOW_INSTALL" | "ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY" | "ALLOW_INSTALL_DEVICE_WIDE";
}

/**
 * Configuration for an always-on VPN connection.
 */
export interface AlwaysOnVpnPackage {
  /**
   * Disallows networking when the VPN is not connected.
   */
  lockdownEnabled?: boolean;
  /**
   * The package name of the VPN app.
   */
  packageName?: string;
}

/**
 * A compliance rule condition which is satisfied if the Android Framework API
 * level on the device doesn't meet a minimum requirement. There can only be one
 * rule with this type of condition per policy.
 */
export interface ApiLevelCondition {
  /**
   * The minimum desired Android Framework API level. If the device doesn't
   * meet the minimum requirement, this condition is satisfied. Must be greater
   * than zero.
   */
  minApiLevel?: number;
}

/**
 * Information about an app.
 */
export interface Application {
  /**
   * Whether this app is free, free with in-app purchases, or paid. If the
   * pricing is unspecified, this means the app is not generally available
   * anymore (even though it might still be available to people who own it).
   */
  appPricing?:  | "APP_PRICING_UNSPECIFIED" | "FREE" | "FREE_WITH_IN_APP_PURCHASE" | "PAID";
  /**
   * Application tracks visible to the enterprise.
   */
  appTracks?: AppTrackInfo[];
  /**
   * Versions currently available for this app.
   */
  appVersions?: AppVersion[];
  /**
   * The name of the author of the apps (for example, the app developer).
   */
  author?: string;
  /**
   * The countries which this app is available in as per ISO 3166-1 alpha-2.
   */
  availableCountries?: string[];
  /**
   * The app category (e.g. RACING, SOCIAL, etc.)
   */
  category?: string;
  /**
   * The content rating for this app.
   */
  contentRating?:  | "CONTENT_RATING_UNSPECIFIED" | "THREE_YEARS" | "SEVEN_YEARS" | "TWELVE_YEARS" | "SIXTEEN_YEARS" | "EIGHTEEN_YEARS";
  /**
   * The localized promotional description, if available.
   */
  description?: string;
  /**
   * How and to whom the package is made available.
   */
  distributionChannel?:  | "DISTRIBUTION_CHANNEL_UNSPECIFIED" | "PUBLIC_GOOGLE_HOSTED" | "PRIVATE_GOOGLE_HOSTED" | "PRIVATE_SELF_HOSTED";
  /**
   * Noteworthy features (if any) of this app.
   */
  features?:  | "APP_FEATURE_UNSPECIFIED" | "VPN_APP"[];
  /**
   * Full app description, if available.
   */
  fullDescription?: string;
  /**
   * A link to an image that can be used as an icon for the app. This image is
   * suitable for use up to a pixel size of 512 x 512.
   */
  iconUrl?: string;
  /**
   * The set of managed properties available to be pre-configured for the app.
   */
  managedProperties?: ManagedProperty[];
  /**
   * The minimum Android SDK necessary to run the app.
   */
  minAndroidSdkVersion?: number;
  /**
   * The name of the app in the form
   * enterprises/{enterprise}/applications/{package_name}.
   */
  name?: string;
  /**
   * The permissions required by the app.
   */
  permissions?: ApplicationPermission[];
  /**
   * A link to the (consumer) Google Play details page for the app.
   */
  playStoreUrl?: string;
  /**
   * A localised description of the recent changes made to the app.
   */
  recentChanges?: string;
  /**
   * A list of screenshot links representing the app.
   */
  screenshotUrls?: string[];
  /**
   * A link to a smaller image that can be used as an icon for the app. This
   * image is suitable for use up to a pixel size of 128 x 128.
   */
  smallIconUrl?: string;
  /**
   * The title of the app. Localized.
   */
  title?: string;
  /**
   * Output only. The approximate time (within 7 days) the app was last
   * published.
   */
  readonly updateTime?: Date;
}

/**
 * An app-related event.
 */
export interface ApplicationEvent {
  /**
   * The creation time of the event.
   */
  createTime?: Date;
  /**
   * App event type.
   */
  eventType?:  | "APPLICATION_EVENT_TYPE_UNSPECIFIED" | "INSTALLED" | "CHANGED" | "DATA_CLEARED" | "REMOVED" | "REPLACED" | "RESTARTED" | "PINNED" | "UNPINNED";
}

function serializeApplicationEvent(data: any): ApplicationEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeApplicationEvent(data: any): ApplicationEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * A permission required by the app.
 */
export interface ApplicationPermission {
  /**
   * A longer description of the permission, providing more detail on what it
   * affects. Localized.
   */
  description?: string;
  /**
   * The name of the permission. Localized.
   */
  name?: string;
  /**
   * An opaque string uniquely identifying the permission. Not localized.
   */
  permissionId?: string;
}

/**
 * Policy for an individual app.
 */
export interface ApplicationPolicy {
  /**
   * List of the app’s track IDs that a device belonging to the enterprise can
   * access. If the list contains multiple track IDs, devices receive the latest
   * version among all accessible tracks. If the list contains no track IDs,
   * devices only have access to the app’s production track. More details about
   * each track are available in AppTrackInfo.
   */
  accessibleTrackIds?: string[];
  /**
   * Specifies whether the app is allowed networking when the VPN is not
   * connected and alwaysOnVpnPackage.lockdownEnabled is enabled. If set to
   * VPN_LOCKDOWN_ENFORCED, the app is not allowed networking, and if set to
   * VPN_LOCKDOWN_EXEMPTION, the app is allowed networking. Only supported on
   * devices running Android 10 and above. If this is not supported by the
   * device, the device will contain a NonComplianceDetail with
   * non_compliance_reason set to API_LEVEL and a fieldPath. If this is not
   * applicable to the app, the device will contain a NonComplianceDetail with
   * non_compliance_reason set to UNSUPPORTED and a fieldPath. The fieldPath is
   * set to applications[i].alwaysOnVpnLockdownExemption, where i is the index
   * of the package in the applications policy.
   */
  alwaysOnVpnLockdownExemption?:  | "ALWAYS_ON_VPN_LOCKDOWN_EXEMPTION_UNSPECIFIED" | "VPN_LOCKDOWN_ENFORCED" | "VPN_LOCKDOWN_EXEMPTION";
  /**
   * Controls the auto-update mode for the app.
   */
  autoUpdateMode?:  | "AUTO_UPDATE_MODE_UNSPECIFIED" | "AUTO_UPDATE_DEFAULT" | "AUTO_UPDATE_POSTPONED" | "AUTO_UPDATE_HIGH_PRIORITY";
  /**
   * Controls whether the app can communicate with itself across a device’s
   * work and personal profiles, subject to user consent.
   */
  connectedWorkAndPersonalApp?:  | "CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED" | "CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED" | "CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED";
  /**
   * The default policy for all permissions requested by the app. If specified,
   * this overrides the policy-level default_permission_policy which applies to
   * all apps. It does not override the permission_grants which applies to all
   * apps.
   */
  defaultPermissionPolicy?:  | "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY";
  /**
   * The scopes delegated to the app from Android Device Policy.
   */
  delegatedScopes?:  | "DELEGATED_SCOPE_UNSPECIFIED" | "CERT_INSTALL" | "MANAGED_CONFIGURATIONS" | "BLOCK_UNINSTALL" | "PERMISSION_GRANT" | "PACKAGE_ACCESS" | "ENABLE_SYSTEM_APP" | "NETWORK_ACTIVITY_LOGS" | "SECURITY_LOGS"[];
  /**
   * Whether the app is disabled. When disabled, the app data is still
   * preserved.
   */
  disabled?: boolean;
  /**
   * Configuration to enable this app as an extension app, with the capability
   * of interacting with Android Device Policy offline.This field can be set for
   * at most one app.
   */
  extensionConfig?: ExtensionConfig;
  /**
   * The type of installation to perform.
   */
  installType?:  | "INSTALL_TYPE_UNSPECIFIED" | "PREINSTALLED" | "FORCE_INSTALLED" | "BLOCKED" | "AVAILABLE" | "REQUIRED_FOR_SETUP" | "KIOSK";
  /**
   * Whether the app is allowed to lock itself in full-screen mode. DEPRECATED.
   * Use InstallType KIOSK or kioskCustomLauncherEnabled to configure a
   * dedicated device.
   */
  lockTaskAllowed?: boolean;
  /**
   * Managed configuration applied to the app. The format for the configuration
   * is dictated by the ManagedProperty values supported by the app. Each field
   * name in the managed configuration must match the key field of the
   * ManagedProperty. The field value must be compatible with the type of the
   * ManagedProperty: *type* *JSON value* BOOL true or false STRING string
   * INTEGER number CHOICE string MULTISELECT array of strings HIDDEN string
   * BUNDLE_ARRAY array of objects
   */
  managedConfiguration?: {
    [key: string]: any
  };
  /**
   * The managed configurations template for the app, saved from the managed
   * configurations iframe. This field is ignored if managed_configuration is
   * set.
   */
  managedConfigurationTemplate?: ManagedConfigurationTemplate;
  /**
   * The minimum version of the app that runs on the device. If set, the device
   * attempts to update the app to at least this version code. If the app is not
   * up-to-date, the device will contain a NonComplianceDetail with
   * non_compliance_reason set to APP_NOT_UPDATED. The app must already be
   * published to Google Play with a version code greater than or equal to this
   * value. At most 20 apps may specify a minimum version code per policy.
   */
  minimumVersionCode?: number;
  /**
   * The package name of the app. For example, com.google.android.youtube for
   * the YouTube app.
   */
  packageName?: string;
  /**
   * Explicit permission grants or denials for the app. These values override
   * the default_permission_policy and permission_grants which apply to all
   * apps.
   */
  permissionGrants?: PermissionGrant[];
  /**
   * Specifies whether the app installed in the work profile is allowed to add
   * widgets to the home screen.
   */
  workProfileWidgets?:  | "WORK_PROFILE_WIDGETS_UNSPECIFIED" | "WORK_PROFILE_WIDGETS_ALLOWED" | "WORK_PROFILE_WIDGETS_DISALLOWED";
}

/**
 * Information reported about an installed app.
 */
export interface ApplicationReport {
  /**
   * The source of the package.
   */
  applicationSource?:  | "APPLICATION_SOURCE_UNSPECIFIED" | "SYSTEM_APP_FACTORY_VERSION" | "SYSTEM_APP_UPDATED_VERSION" | "INSTALLED_FROM_PLAY_STORE";
  /**
   * The display name of the app.
   */
  displayName?: string;
  /**
   * The list of app events which have occurred in the last 30 hours.
   */
  events?: ApplicationEvent[];
  /**
   * The package name of the app that installed this app.
   */
  installerPackageName?: string;
  /**
   * List of keyed app states reported by the app.
   */
  keyedAppStates?: KeyedAppState[];
  /**
   * Package name of the app.
   */
  packageName?: string;
  /**
   * The SHA-256 hash of the app's APK file, which can be used to verify the
   * app hasn't been modified. Each byte of the hash value is represented as a
   * two-digit hexadecimal number.
   */
  packageSha256Hash?: string;
  /**
   * The SHA-1 hash of each android.content.pm.Signature
   * (https://developer.android.com/reference/android/content/pm/Signature.html)
   * associated with the app package. Each byte of each hash value is
   * represented as a two-digit hexadecimal number.
   */
  signingKeyCertFingerprints?: string[];
  /**
   * Application state.
   */
  state?:  | "APPLICATION_STATE_UNSPECIFIED" | "REMOVED" | "INSTALLED";
  /**
   * The app version code, which can be used to determine whether one version
   * is more recent than another.
   */
  versionCode?: number;
  /**
   * The app version as displayed to the user.
   */
  versionName?: string;
}

function serializeApplicationReport(data: any): ApplicationReport {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (serializeApplicationEvent(item))) : undefined,
    keyedAppStates: data["keyedAppStates"] !== undefined ? data["keyedAppStates"].map((item: any) => (serializeKeyedAppState(item))) : undefined,
  };
}

function deserializeApplicationReport(data: any): ApplicationReport {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (deserializeApplicationEvent(item))) : undefined,
    keyedAppStates: data["keyedAppStates"] !== undefined ? data["keyedAppStates"].map((item: any) => (deserializeKeyedAppState(item))) : undefined,
  };
}

/**
 * Settings controlling the behavior of application reports.
 */
export interface ApplicationReportingSettings {
  /**
   * Whether removed apps are included in application reports.
   */
  includeRemovedApps?: boolean;
}

/**
 * Information about a process. It contains process name, start time, app Uid,
 * app Pid, seinfo tag, hash of the base APK.
 */
export interface AppProcessInfo {
  /**
   * SHA-256 hash of the base APK, in hexadecimal format.
   */
  apkSha256Hash?: string;
  /**
   * Package names of all packages that are associated with the particular user
   * ID. In most cases, this will be a single package name, the package that has
   * been assigned that user ID. If multiple application share a UID then all
   * packages sharing UID will be included.
   */
  packageNames?: string[];
  /**
   * Process ID.
   */
  pid?: number;
  /**
   * Process name.
   */
  processName?: string;
  /**
   * SELinux policy info.
   */
  seinfo?: string;
  /**
   * Process start time.
   */
  startTime?: Date;
  /**
   * UID of the package.
   */
  uid?: number;
}

function serializeAppProcessInfo(data: any): AppProcessInfo {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeAppProcessInfo(data: any): AppProcessInfo {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * An app process was started. This is available device-wide on fully managed
 * devices and within the work profile on organization-owned devices with a work
 * profile.
 */
export interface AppProcessStartEvent {
  /**
   * Information about a process.
   */
  processInfo?: AppProcessInfo;
}

function serializeAppProcessStartEvent(data: any): AppProcessStartEvent {
  return {
    ...data,
    processInfo: data["processInfo"] !== undefined ? serializeAppProcessInfo(data["processInfo"]) : undefined,
  };
}

function deserializeAppProcessStartEvent(data: any): AppProcessStartEvent {
  return {
    ...data,
    processInfo: data["processInfo"] !== undefined ? deserializeAppProcessInfo(data["processInfo"]) : undefined,
  };
}

/**
 * Id to name association of a app track.
 */
export interface AppTrackInfo {
  /**
   * The track name associated with the trackId, set in the Play Console. The
   * name is modifiable from Play Console.
   */
  trackAlias?: string;
  /**
   * The unmodifiable unique track identifier, taken from the releaseTrackId in
   * the URL of the Play Console page that displays the app’s track information.
   */
  trackId?: string;
}

/**
 * This represents a single version of the app.
 */
export interface AppVersion {
  /**
   * If the value is True, it indicates that this version is a production
   * track.
   */
  production?: boolean;
  /**
   * Track identifiers that the app version is published in. This does not
   * include the production track (see production instead).
   */
  trackIds?: string[];
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
 * Batched event logs of events from the device.
 */
export interface BatchUsageLogEvents {
  /**
   * The name of the device in the form
   * ‘enterprises/{enterpriseId}/devices/{deviceId}’
   */
  device?: string;
  /**
   * The device timestamp when the batch of events were collected from the
   * device.
   */
  retrievalTime?: Date;
  /**
   * The list of UsageLogEvent that were reported by the device, sorted
   * chronologically by the event time.
   */
  usageLogEvents?: UsageLogEvent[];
  /**
   * The resource name of the user that owns this device in the form
   * ‘enterprises/{enterpriseId}/users/{userId}’.
   */
  user?: string;
}

function serializeBatchUsageLogEvents(data: any): BatchUsageLogEvents {
  return {
    ...data,
    retrievalTime: data["retrievalTime"] !== undefined ? data["retrievalTime"].toISOString() : undefined,
    usageLogEvents: data["usageLogEvents"] !== undefined ? data["usageLogEvents"].map((item: any) => (serializeUsageLogEvent(item))) : undefined,
  };
}

function deserializeBatchUsageLogEvents(data: any): BatchUsageLogEvents {
  return {
    ...data,
    retrievalTime: data["retrievalTime"] !== undefined ? new Date(data["retrievalTime"]) : undefined,
    usageLogEvents: data["usageLogEvents"] !== undefined ? data["usageLogEvents"].map((item: any) => (deserializeUsageLogEvent(item))) : undefined,
  };
}

/**
 * An action to block access to apps and data on a fully managed device or in a
 * work profile. This action also triggers a device or work profile to displays
 * a user-facing notification with information (where possible) on how to
 * correct the compliance issue. Note: wipeAction must also be specified.
 */
export interface BlockAction {
  /**
   * Number of days the policy is non-compliant before the device or work
   * profile is blocked. To block access immediately, set to 0. blockAfterDays
   * must be less than wipeAfterDays.
   */
  blockAfterDays?: number;
  /**
   * Specifies the scope of this BlockAction. Only applicable to devices that
   * are company-owned.
   */
  blockScope?:  | "BLOCK_SCOPE_UNSPECIFIED" | "BLOCK_SCOPE_WORK_PROFILE" | "BLOCK_SCOPE_DEVICE";
}

/**
 * A new root certificate was installed into the system's trusted credential
 * storage. This is available device-wide on fully managed devices and within
 * the work profile on organization-owned devices with a work profile.
 */
export interface CertAuthorityInstalledEvent {
  /**
   * Subject of the certificate.
   */
  certificate?: string;
  /**
   * Whether the installation event succeeded.
   */
  success?: boolean;
  /**
   * The user in which the certificate install event happened. Only available
   * for devices running Android 11 and above.
   */
  userId?: number;
}

/**
 * A root certificate was removed from the system's trusted credential storage.
 * This is available device-wide on fully managed devices and within the work
 * profile on organization-owned devices with a work profile.
 */
export interface CertAuthorityRemovedEvent {
  /**
   * Subject of the certificate.
   */
  certificate?: string;
  /**
   * Whether the removal succeeded.
   */
  success?: boolean;
  /**
   * The user in which the certificate removal event occurred. Only available
   * for devices running Android 11 and above.
   */
  userId?: number;
}

/**
 * An X.509v3 certificate failed to validate, currently this validation is
 * performed on the Wi-FI access point and failure may be due to a mismatch upon
 * server certificate validation. However it may in the future include other
 * validation events of an X.509v3 certificate.
 */
export interface CertValidationFailureEvent {
  /**
   * The reason why certification validation failed.
   */
  failureReason?: string;
}

/**
 * Controls apps' access to private keys. The rule determines which private
 * key, if any, Android Device Policy grants to the specified app. Access is
 * granted either when the app calls KeyChain.choosePrivateKeyAlias
 * (https://developer.android.com/reference/android/security/KeyChain#choosePrivateKeyAlias%28android.app.Activity,%20android.security.KeyChainAliasCallback,%20java.lang.String[],%20java.security.Principal[],%20java.lang.String,%20int,%20java.lang.String%29)
 * (or any overloads) to request a private key alias for a given URL, or for
 * rules that are not URL-specific (that is, if urlPattern is not set, or set to
 * the empty string or .*) on Android 11 and above, directly so that the app can
 * call KeyChain.getPrivateKey
 * (https://developer.android.com/reference/android/security/KeyChain#getPrivateKey%28android.content.Context,%20java.lang.String%29),
 * without first having to call KeyChain.choosePrivateKeyAlias.When an app calls
 * KeyChain.choosePrivateKeyAlias if more than one choosePrivateKeyRules
 * matches, the last matching rule defines which key alias to return.
 */
export interface ChoosePrivateKeyRule {
  /**
   * The package names to which this rule applies. The hash of the signing
   * certificate for each app is verified against the hash provided by Play. If
   * no package names are specified, then the alias is provided to all apps that
   * call KeyChain.choosePrivateKeyAlias
   * (https://developer.android.com/reference/android/security/KeyChain#choosePrivateKeyAlias%28android.app.Activity,%20android.security.KeyChainAliasCallback,%20java.lang.String[],%20java.security.Principal[],%20java.lang.String,%20int,%20java.lang.String%29)
   * or any overloads (but not without calling KeyChain.choosePrivateKeyAlias,
   * even on Android 11 and above). Any app with the same Android UID as a
   * package specified here will have access when they call
   * KeyChain.choosePrivateKeyAlias.
   */
  packageNames?: string[];
  /**
   * The alias of the private key to be used.
   */
  privateKeyAlias?: string;
  /**
   * The URL pattern to match against the URL of the request. If not set or
   * empty, it matches all URLs. This uses the regular expression syntax of
   * java.util.regex.Pattern.
   */
  urlPattern?: string;
}

/**
 * Parameters associated with the CLEAR_APP_DATA command to clear the data of
 * specified apps from the device.
 */
export interface ClearAppsDataParams {
  /**
   * The package names of the apps whose data will be cleared when the command
   * is executed.
   */
  packageNames?: string[];
}

/**
 * Status of the CLEAR_APP_DATA command to clear the data of specified apps
 * from the device.
 */
export interface ClearAppsDataStatus {
  /**
   * The per-app results, a mapping from package names to the respective
   * clearing result.
   */
  results?: {
    [key: string]: PerAppResult
  };
}

/**
 * A command.
 */
export interface Command {
  /**
   * Parameters for the CLEAR_APP_DATA command to clear the data of specified
   * apps from the device. See ClearAppsDataParams. If this is set, then it is
   * suggested that type should not be set. In this case, the server
   * automatically sets it to CLEAR_APP_DATA. It is also acceptable to
   * explicitly set type to CLEAR_APP_DATA.
   */
  clearAppsDataParams?: ClearAppsDataParams;
  /**
   * Output only. Status of the CLEAR_APP_DATA command to clear the data of
   * specified apps from the device. See ClearAppsDataStatus.
   */
  readonly clearAppsDataStatus?: ClearAppsDataStatus;
  /**
   * The timestamp at which the command was created. The timestamp is
   * automatically generated by the server.
   */
  createTime?: Date;
  /**
   * The duration for which the command is valid. The command will expire if
   * not executed by the device during this time. The default duration if
   * unspecified is ten minutes. There is no maximum duration.
   */
  duration?: number /* Duration */;
  /**
   * If the command failed, an error code explaining the failure. This is not
   * set when the command is cancelled by the caller.
   */
  errorCode?:  | "COMMAND_ERROR_CODE_UNSPECIFIED" | "UNKNOWN" | "API_LEVEL" | "MANAGEMENT_MODE" | "INVALID_VALUE" | "UNSUPPORTED";
  /**
   * For commands of type RESET_PASSWORD, optionally specifies the new
   * password.
   */
  newPassword?: string;
  /**
   * For commands of type RESET_PASSWORD, optionally specifies flags.
   */
  resetPasswordFlags?:  | "RESET_PASSWORD_FLAG_UNSPECIFIED" | "REQUIRE_ENTRY" | "DO_NOT_ASK_CREDENTIALS_ON_BOOT" | "LOCK_NOW"[];
  /**
   * The type of the command.
   */
  type?:  | "COMMAND_TYPE_UNSPECIFIED" | "LOCK" | "RESET_PASSWORD" | "REBOOT" | "RELINQUISH_OWNERSHIP" | "CLEAR_APP_DATA";
  /**
   * The resource name of the user that owns the device in the form
   * enterprises/{enterpriseId}/users/{userId}. This is automatically generated
   * by the server based on the device the command is sent to.
   */
  userName?: string;
}

function serializeCommand(data: any): Command {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeCommand(data: any): Command {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Information about Common Criteria Mode—security standards defined in the
 * Common Criteria for Information Technology Security Evaluation
 * (https://www.commoncriteriaportal.org/) (CC).This information is only
 * available if statusReportingSettings.commonCriteriaModeEnabled is true in the
 * device's policy.
 */
export interface CommonCriteriaModeInfo {
  /**
   * Whether Common Criteria Mode is enabled.
   */
  commonCriteriaModeStatus?:  | "COMMON_CRITERIA_MODE_STATUS_UNKNOWN" | "COMMON_CRITERIA_MODE_DISABLED" | "COMMON_CRITERIA_MODE_ENABLED";
}

/**
 * A rule declaring which mitigating actions to take when a device is not
 * compliant with its policy. For every rule, there is always an implicit
 * mitigating action to set policy_compliant to false for the Device resource,
 * and display a message on the device indicating that the device is not
 * compliant with its policy. Other mitigating actions may optionally be taken
 * as well, depending on the field values in the rule.
 */
export interface ComplianceRule {
  /**
   * A condition which is satisfied if the Android Framework API level on the
   * device doesn't meet a minimum requirement.
   */
  apiLevelCondition?: ApiLevelCondition;
  /**
   * If set to true, the rule includes a mitigating action to disable apps so
   * that the device is effectively disabled, but app data is preserved. If the
   * device is running an app in locked task mode, the app will be closed and a
   * UI showing the reason for non-compliance will be displayed.
   */
  disableApps?: boolean;
  /**
   * A condition which is satisfied if there exists any matching
   * NonComplianceDetail for the device.
   */
  nonComplianceDetailCondition?: NonComplianceDetailCondition;
  /**
   * If set, the rule includes a mitigating action to disable apps specified in
   * the list, but app data is preserved.
   */
  packageNamesToDisable?: string[];
}

/**
 * A TCP connect event was initiated through the standard network stack.
 */
export interface ConnectEvent {
  /**
   * The destination IP address of the connect call.
   */
  destinationIpAddress?: string;
  /**
   * The destination port of the connect call.
   */
  destinationPort?: number;
  /**
   * The package name of the UID that performed the connect call.
   */
  packageName?: string;
}

/**
 * Contact details for managed Google Play enterprises.
 */
export interface ContactInfo {
  /**
   * Email address for a point of contact, which will be used to send important
   * announcements related to managed Google Play.
   */
  contactEmail?: string;
  /**
   * The email of the data protection officer. The email is validated but not
   * verified.
   */
  dataProtectionOfficerEmail?: string;
  /**
   * The name of the data protection officer.
   */
  dataProtectionOfficerName?: string;
  /**
   * The phone number of the data protection officer The phone number is
   * validated but not verified.
   */
  dataProtectionOfficerPhone?: string;
  /**
   * The email of the EU representative. The email is validated but not
   * verified.
   */
  euRepresentativeEmail?: string;
  /**
   * The name of the EU representative.
   */
  euRepresentativeName?: string;
  /**
   * The phone number of the EU representative. The phone number is validated
   * but not verified.
   */
  euRepresentativePhone?: string;
}

/**
 * This feature is not generally available.
 */
export interface ContentProviderEndpoint {
  /**
   * This feature is not generally available.
   */
  packageName?: string;
  /**
   * Required. This feature is not generally available.
   */
  signingCertsSha256?: string[];
  /**
   * This feature is not generally available.
   */
  uri?: string;
}

/**
 * Cross-profile policies applied on the device.
 */
export interface CrossProfilePolicies {
  /**
   * Whether text copied from one profile (personal or work) can be pasted in
   * the other profile.
   */
  crossProfileCopyPaste?:  | "CROSS_PROFILE_COPY_PASTE_UNSPECIFIED" | "COPY_FROM_WORK_TO_PERSONAL_DISALLOWED" | "CROSS_PROFILE_COPY_PASTE_ALLOWED";
  /**
   * Whether data from one profile (personal or work) can be shared with apps
   * in the other profile. Specifically controls simple data sharing via
   * intents. Management of other cross-profile communication channels, such as
   * contact search, copy/paste, or connected work & personal apps, are
   * configured separately.
   */
  crossProfileDataSharing?:  | "CROSS_PROFILE_DATA_SHARING_UNSPECIFIED" | "CROSS_PROFILE_DATA_SHARING_DISALLOWED" | "DATA_SHARING_FROM_WORK_TO_PERSONAL_DISALLOWED" | "CROSS_PROFILE_DATA_SHARING_ALLOWED";
  /**
   * Whether contacts stored in the work profile can be shown in personal
   * profile contact searches and incoming calls.
   */
  showWorkContactsInPersonalProfile?:  | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_UNSPECIFIED" | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED" | "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_ALLOWED";
  /**
   * Specifies the default behaviour for work profile widgets. If the policy
   * does not specify work_profile_widgets for a specific application, it will
   * behave according to the value specified here.
   */
  workProfileWidgetsDefault?:  | "WORK_PROFILE_WIDGETS_DEFAULT_UNSPECIFIED" | "WORK_PROFILE_WIDGETS_DEFAULT_ALLOWED" | "WORK_PROFILE_WIDGETS_DEFAULT_DISALLOWED";
}

/**
 * Validates whether Android’s built-in cryptographic library (BoringSSL) is
 * valid. Should always succeed on device boot, if it fails, the device should
 * be considered untrusted.
 */
export interface CryptoSelfTestCompletedEvent {
  /**
   * Whether the test succeeded.
   */
  success?: boolean;
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: A full date, with non-zero year, month, and day values. A month
 * and day, with a zero year (for example, an anniversary). A year on its own,
 * with a zero month and a zero day. A year and month, with a zero day (for
 * example, a credit card expiration date).Related types: google.type.TimeOfDay
 * google.type.DateTime google.protobuf.Timestamp
 */
export interface Date {
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
 * A device owned by an enterprise. Unless otherwise noted, all fields are
 * read-only and can't be modified by enterprises.devices.patch.
 */
export interface Device {
  /**
   * The API level of the Android platform version running on the device.
   */
  apiLevel?: number;
  /**
   * Reports for apps installed on the device. This information is only
   * available when application_reports_enabled is true in the device's policy.
   */
  applicationReports?: ApplicationReport[];
  /**
   * The password requirements currently applied to the device. The applied
   * requirements may be slightly different from those specified in
   * passwordPolicies in some cases. fieldPath is set based on passwordPolicies.
   */
  appliedPasswordPolicies?: PasswordRequirements[];
  /**
   * The name of the policy currently applied to the device.
   */
  appliedPolicyName?: string;
  /**
   * The version of the policy currently applied to the device.
   */
  appliedPolicyVersion?: bigint;
  /**
   * The state currently applied to the device.
   */
  appliedState?:  | "DEVICE_STATE_UNSPECIFIED" | "ACTIVE" | "DISABLED" | "DELETED" | "PROVISIONING";
  /**
   * Information about Common Criteria Mode—security standards defined in the
   * Common Criteria for Information Technology Security Evaluation
   * (https://www.commoncriteriaportal.org/) (CC).This information is only
   * available if statusReportingSettings.commonCriteriaModeEnabled is true in
   * the device's policy.
   */
  commonCriteriaModeInfo?: CommonCriteriaModeInfo;
  /**
   * Device settings information. This information is only available if
   * deviceSettingsEnabled is true in the device's policy.
   */
  deviceSettings?: DeviceSettings;
  /**
   * If the device state is DISABLED, an optional message that is displayed on
   * the device indicating the reason the device is disabled. This field can be
   * modified by a patch request.
   */
  disabledReason?: UserFacingMessage;
  /**
   * Detailed information about displays on the device. This information is
   * only available if displayInfoEnabled is true in the device's policy.
   */
  displays?: Display[];
  /**
   * The time of device enrollment.
   */
  enrollmentTime?: Date;
  /**
   * If the device was enrolled with an enrollment token with additional data
   * provided, this field contains that data.
   */
  enrollmentTokenData?: string;
  /**
   * If the device was enrolled with an enrollment token, this field contains
   * the name of the token.
   */
  enrollmentTokenName?: string;
  /**
   * Detailed information about the device hardware.
   */
  hardwareInfo?: HardwareInfo;
  /**
   * Hardware status samples in chronological order. This information is only
   * available if hardwareStatusEnabled is true in the device's policy.
   */
  hardwareStatusSamples?: HardwareStatus[];
  /**
   * Deprecated.
   */
  lastPolicyComplianceReportTime?: Date;
  /**
   * The last time the device fetched its policy.
   */
  lastPolicySyncTime?: Date;
  /**
   * The last time the device sent a status report.
   */
  lastStatusReportTime?: Date;
  /**
   * The type of management mode Android Device Policy takes on the device.
   * This influences which policy settings are supported.
   */
  managementMode?:  | "MANAGEMENT_MODE_UNSPECIFIED" | "DEVICE_OWNER" | "PROFILE_OWNER";
  /**
   * Events related to memory and storage measurements in chronological order.
   * This information is only available if memoryInfoEnabled is true in the
   * device's policy.
   */
  memoryEvents?: MemoryEvent[];
  /**
   * Memory information: contains information about device memory and storage.
   */
  memoryInfo?: MemoryInfo;
  /**
   * The name of the device in the form
   * enterprises/{enterpriseId}/devices/{deviceId}.
   */
  name?: string;
  /**
   * Device network information. This information is only available if
   * networkInfoEnabled is true in the device's policy.
   */
  networkInfo?: NetworkInfo;
  /**
   * Details about policy settings that the device is not compliant with.
   */
  nonComplianceDetails?: NonComplianceDetail[];
  /**
   * Ownership of the managed device.
   */
  ownership?:  | "OWNERSHIP_UNSPECIFIED" | "COMPANY_OWNED" | "PERSONALLY_OWNED";
  /**
   * Whether the device is compliant with its policy.
   */
  policyCompliant?: boolean;
  /**
   * The name of the policy applied to the device, in the form
   * enterprises/{enterpriseId}/policies/{policyId}. If not specified, the
   * policy_name for the device's user is applied. This field can be modified by
   * a patch request. You can specify only the policyId when calling
   * enterprises.devices.patch, as long as the policyId doesn’t contain any
   * slashes. The rest of the policy name is inferred.
   */
  policyName?: string;
  /**
   * Power management events on the device in chronological order. This
   * information is only available if powerManagementEventsEnabled is true in
   * the device's policy.
   */
  powerManagementEvents?: PowerManagementEvent[];
  /**
   * If the same physical device has been enrolled multiple times, this field
   * contains its previous device names. The serial number is used as the unique
   * identifier to determine if the same physical device has enrolled
   * previously. The names are in chronological order.
   */
  previousDeviceNames?: string[];
  /**
   * Device's security posture value that reflects how secure the device is.
   */
  securityPosture?: SecurityPosture;
  /**
   * Detailed information about the device software. This information is only
   * available if softwareInfoEnabled is true in the device's policy.
   */
  softwareInfo?: SoftwareInfo;
  /**
   * The state to be applied to the device. This field can be modified by a
   * patch request. Note that when calling enterprises.devices.patch, ACTIVE and
   * DISABLED are the only allowable values. To enter the device into a DELETED
   * state, call enterprises.devices.delete.
   */
  state?:  | "DEVICE_STATE_UNSPECIFIED" | "ACTIVE" | "DISABLED" | "DELETED" | "PROVISIONING";
  /**
   * Map of selected system properties name and value related to the device.
   * This information is only available if systemPropertiesEnabled is true in
   * the device's policy.
   */
  systemProperties?: {
    [key: string]: string
  };
  /**
   * The user who owns the device.
   */
  user?: User;
  /**
   * The resource name of the user that owns this device in the form
   * enterprises/{enterpriseId}/users/{userId}.
   */
  userName?: string;
}

function serializeDevice(data: any): Device {
  return {
    ...data,
    applicationReports: data["applicationReports"] !== undefined ? data["applicationReports"].map((item: any) => (serializeApplicationReport(item))) : undefined,
    appliedPasswordPolicies: data["appliedPasswordPolicies"] !== undefined ? data["appliedPasswordPolicies"].map((item: any) => (serializePasswordRequirements(item))) : undefined,
    appliedPolicyVersion: data["appliedPolicyVersion"] !== undefined ? String(data["appliedPolicyVersion"]) : undefined,
    enrollmentTime: data["enrollmentTime"] !== undefined ? data["enrollmentTime"].toISOString() : undefined,
    hardwareStatusSamples: data["hardwareStatusSamples"] !== undefined ? data["hardwareStatusSamples"].map((item: any) => (serializeHardwareStatus(item))) : undefined,
    lastPolicyComplianceReportTime: data["lastPolicyComplianceReportTime"] !== undefined ? data["lastPolicyComplianceReportTime"].toISOString() : undefined,
    lastPolicySyncTime: data["lastPolicySyncTime"] !== undefined ? data["lastPolicySyncTime"].toISOString() : undefined,
    lastStatusReportTime: data["lastStatusReportTime"] !== undefined ? data["lastStatusReportTime"].toISOString() : undefined,
    memoryEvents: data["memoryEvents"] !== undefined ? data["memoryEvents"].map((item: any) => (serializeMemoryEvent(item))) : undefined,
    memoryInfo: data["memoryInfo"] !== undefined ? serializeMemoryInfo(data["memoryInfo"]) : undefined,
    powerManagementEvents: data["powerManagementEvents"] !== undefined ? data["powerManagementEvents"].map((item: any) => (serializePowerManagementEvent(item))) : undefined,
    softwareInfo: data["softwareInfo"] !== undefined ? serializeSoftwareInfo(data["softwareInfo"]) : undefined,
  };
}

function deserializeDevice(data: any): Device {
  return {
    ...data,
    applicationReports: data["applicationReports"] !== undefined ? data["applicationReports"].map((item: any) => (deserializeApplicationReport(item))) : undefined,
    appliedPasswordPolicies: data["appliedPasswordPolicies"] !== undefined ? data["appliedPasswordPolicies"].map((item: any) => (deserializePasswordRequirements(item))) : undefined,
    appliedPolicyVersion: data["appliedPolicyVersion"] !== undefined ? BigInt(data["appliedPolicyVersion"]) : undefined,
    enrollmentTime: data["enrollmentTime"] !== undefined ? new Date(data["enrollmentTime"]) : undefined,
    hardwareStatusSamples: data["hardwareStatusSamples"] !== undefined ? data["hardwareStatusSamples"].map((item: any) => (deserializeHardwareStatus(item))) : undefined,
    lastPolicyComplianceReportTime: data["lastPolicyComplianceReportTime"] !== undefined ? new Date(data["lastPolicyComplianceReportTime"]) : undefined,
    lastPolicySyncTime: data["lastPolicySyncTime"] !== undefined ? new Date(data["lastPolicySyncTime"]) : undefined,
    lastStatusReportTime: data["lastStatusReportTime"] !== undefined ? new Date(data["lastStatusReportTime"]) : undefined,
    memoryEvents: data["memoryEvents"] !== undefined ? data["memoryEvents"].map((item: any) => (deserializeMemoryEvent(item))) : undefined,
    memoryInfo: data["memoryInfo"] !== undefined ? deserializeMemoryInfo(data["memoryInfo"]) : undefined,
    powerManagementEvents: data["powerManagementEvents"] !== undefined ? data["powerManagementEvents"].map((item: any) => (deserializePowerManagementEvent(item))) : undefined,
    softwareInfo: data["softwareInfo"] !== undefined ? deserializeSoftwareInfo(data["softwareInfo"]) : undefined,
  };
}

/**
 * Information about security related device settings on device.
 */
export interface DeviceSettings {
  /**
   * Whether ADB (https://developer.android.com/studio/command-line/adb.html)
   * is enabled on the device.
   */
  adbEnabled?: boolean;
  /**
   * Whether developer mode is enabled on the device.
   */
  developmentSettingsEnabled?: boolean;
  /**
   * Encryption status from DevicePolicyManager.
   */
  encryptionStatus?:  | "ENCRYPTION_STATUS_UNSPECIFIED" | "UNSUPPORTED" | "INACTIVE" | "ACTIVATING" | "ACTIVE" | "ACTIVE_DEFAULT_KEY" | "ACTIVE_PER_USER";
  /**
   * Whether the device is secured with PIN/password.
   */
  isDeviceSecure?: boolean;
  /**
   * Whether the storage encryption is enabled.
   */
  isEncrypted?: boolean;
  /**
   * Whether installing apps from unknown sources is enabled.
   */
  unknownSourcesEnabled?: boolean;
  /**
   * Whether Google Play Protect verification
   * (https://support.google.com/accounts/answer/2812853) is enforced on the
   * device.
   */
  verifyAppsEnabled?: boolean;
}

/**
 * Device display information.
 */
export interface Display {
  /**
   * Display density expressed as dots-per-inch.
   */
  density?: number;
  /**
   * Unique display id.
   */
  displayId?: number;
  /**
   * Display height in pixels.
   */
  height?: number;
  /**
   * Name of the display.
   */
  name?: string;
  /**
   * Refresh rate of the display in frames per second.
   */
  refreshRate?: number;
  /**
   * State of the display.
   */
  state?:  | "DISPLAY_STATE_UNSPECIFIED" | "OFF" | "ON" | "DOZE" | "SUSPENDED";
  /**
   * Display width in pixels.
   */
  width?: number;
}

/**
 * A DNS lookup event was initiated through the standard network stack.
 */
export interface DnsEvent {
  /**
   * The hostname that was looked up.
   */
  hostname?: string;
  /**
   * The (possibly truncated) list of the IP addresses returned for DNS lookup
   * (max 10 IPv4 or IPv6 addresses).
   */
  ipAddresses?: string[];
  /**
   * The package name of the UID that performed the DNS lookup.
   */
  packageName?: string;
  /**
   * The number of IP addresses returned from the DNS lookup event. May be
   * higher than the amount of ip_addresses if there were too many addresses to
   * log.
   */
  totalIpAddressesReturned?: bigint;
}

function serializeDnsEvent(data: any): DnsEvent {
  return {
    ...data,
    totalIpAddressesReturned: data["totalIpAddressesReturned"] !== undefined ? String(data["totalIpAddressesReturned"]) : undefined,
  };
}

function deserializeDnsEvent(data: any): DnsEvent {
  return {
    ...data,
    totalIpAddressesReturned: data["totalIpAddressesReturned"] !== undefined ? BigInt(data["totalIpAddressesReturned"]) : undefined,
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
 * An enrollment token.
 */
export interface EnrollmentToken {
  /**
   * Optional, arbitrary data associated with the enrollment token. This could
   * contain, for example, the ID of an org unit the device is assigned to after
   * enrollment. After a device enrolls with the token, this data will be
   * exposed in the enrollment_token_data field of the Device resource. The data
   * must be 1024 characters or less; otherwise, the creation request will fail.
   */
  additionalData?: string;
  /**
   * Controls whether personal usage is allowed on a device provisioned with
   * this enrollment token.For company-owned devices: Enabling personal usage
   * allows the user to set up a work profile on the device. Disabling personal
   * usage requires the user provision the device as a fully managed device.For
   * personally-owned devices: Enabling personal usage allows the user to set up
   * a work profile on the device. Disabling personal usage will prevent the
   * device from provisioning. Personal usage cannot be disabled on
   * personally-owned device.
   */
  allowPersonalUsage?:  | "ALLOW_PERSONAL_USAGE_UNSPECIFIED" | "PERSONAL_USAGE_ALLOWED" | "PERSONAL_USAGE_DISALLOWED";
  /**
   * The length of time the enrollment token is valid, ranging from 1 minute to
   * Durations.MAX_VALUE
   * (https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/util/Durations.html#MAX_VALUE),
   * approximately 10,000 years. If not specified, the default duration is 1
   * hour. Please note that if requested duration causes the resulting
   * expiration_timestamp to exceed Timestamps.MAX_VALUE
   * (https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/util/Timestamps.html#MAX_VALUE),
   * then expiration_timestamp is coerced to Timestamps.MAX_VALUE.
   */
  duration?: number /* Duration */;
  /**
   * The expiration time of the token. This is a read-only field generated by
   * the server.
   */
  expirationTimestamp?: Date;
  /**
   * The name of the enrollment token, which is generated by the server during
   * creation, in the form
   * enterprises/{enterpriseId}/enrollmentTokens/{enrollmentTokenId}.
   */
  name?: string;
  /**
   * Whether the enrollment token is for one time use only. If the flag is set
   * to true, only one device can use it for registration.
   */
  oneTimeOnly?: boolean;
  /**
   * The name of the policy initially applied to the enrolled device, in the
   * form enterprises/{enterpriseId}/policies/{policyId}. If not specified, the
   * policy_name for the device’s user is applied. If user_name is also not
   * specified, enterprises/{enterpriseId}/policies/default is applied by
   * default. When updating this field, you can specify only the policyId as
   * long as the policyId doesn’t contain any slashes. The rest of the policy
   * name will be inferred.
   */
  policyName?: string;
  /**
   * A JSON string whose UTF-8 representation can be used to generate a QR code
   * to enroll a device with this enrollment token. To enroll a device using
   * NFC, the NFC record must contain a serialized java.util.Properties
   * representation of the properties in the JSON.
   */
  qrCode?: string;
  /**
   * The user associated with this enrollment token. If it's specified when the
   * enrollment token is created and the user does not exist, the user will be
   * created. This field must not contain personally identifiable information.
   * Only the account_identifier field needs to be set.
   */
  user?: User;
  /**
   * The token value that's passed to the device and authorizes the device to
   * enroll. This is a read-only field generated by the server.
   */
  value?: string;
}

function serializeEnrollmentToken(data: any): EnrollmentToken {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    expirationTimestamp: data["expirationTimestamp"] !== undefined ? data["expirationTimestamp"].toISOString() : undefined,
  };
}

function deserializeEnrollmentToken(data: any): EnrollmentToken {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    expirationTimestamp: data["expirationTimestamp"] !== undefined ? new Date(data["expirationTimestamp"]) : undefined,
  };
}

/**
 * The configuration applied to an enterprise.
 */
export interface Enterprise {
  /**
   * Deprecated and unused.
   */
  appAutoApprovalEnabled?: boolean;
  /**
   * The enterprise contact info of an EMM-managed enterprise.
   */
  contactInfo?: ContactInfo;
  /**
   * The types of Google Pub/Sub notifications enabled for the enterprise.
   */
  enabledNotificationTypes?:  | "NOTIFICATION_TYPE_UNSPECIFIED" | "ENROLLMENT" | "COMPLIANCE_REPORT" | "STATUS_REPORT" | "COMMAND" | "USAGE_LOGS"[];
  /**
   * The name of the enterprise displayed to users. This field has a maximum
   * length of 100 characters.
   */
  enterpriseDisplayName?: string;
  /**
   * An image displayed as a logo during device provisioning. Supported types
   * are: image/bmp, image/gif, image/x-ico, image/jpeg, image/png, image/webp,
   * image/vnd.wap.wbmp, image/x-adobe-dng.
   */
  logo?: ExternalData;
  /**
   * The name of the enterprise which is generated by the server during
   * creation, in the form enterprises/{enterpriseId}.
   */
  name?: string;
  /**
   * A color in RGB format that indicates the predominant color to display in
   * the device management app UI. The color components are stored as follows:
   * (red << 16) | (green << 8) | blue, where the value of each component is
   * between 0 and 255, inclusive.
   */
  primaryColor?: number;
  /**
   * The topic which Pub/Sub notifications are published to, in the form
   * projects/{project}/topics/{topic}. This field is only required if Pub/Sub
   * notifications are enabled.
   */
  pubsubTopic?: string;
  /**
   * Sign-in details of the enterprise.
   */
  signinDetails?: SigninDetail[];
  /**
   * Terms and conditions that must be accepted when provisioning a device for
   * this enterprise. A page of terms is generated for each value in this list.
   */
  termsAndConditions?: TermsAndConditions[];
}

/**
 * Additional options for AndroidManagement#enterprisesApplicationsGet.
 */
export interface EnterprisesApplicationsGetOptions {
  /**
   * The preferred language for localized application info, as a BCP47 tag
   * (e.g. "en-US", "de"). If not specified the default language of the
   * application will be used.
   */
  languageCode?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesCreate.
 */
export interface EnterprisesCreateOptions {
  /**
   * Whether the enterprise admin has seen and agreed to the managed Google
   * Play Agreement (https://www.android.com/enterprise/terms/). Do not set this
   * field for any customer-managed enterprise
   * (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises).
   * Set this to field to true for all EMM-managed enterprises
   * (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).
   */
  agreementAccepted?: boolean;
  /**
   * The enterprise token appended to the callback URL. Set this when creating
   * a customer-managed enterprise
   * (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises)
   * and not when creating a deprecated EMM-managed enterprise
   * (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).
   */
  enterpriseToken?: string;
  /**
   * The ID of the Google Cloud Platform project which will own the enterprise.
   */
  projectId?: string;
  /**
   * The name of the SignupUrl used to sign up for the enterprise. Set this
   * when creating a customer-managed enterprise
   * (https://developers.google.com/android/management/create-enterprise#customer-managed_enterprises)
   * and not when creating a deprecated EMM-managed enterprise
   * (https://developers.google.com/android/management/create-enterprise#emm-managed_enterprises).
   */
  signupUrlName?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesDevicesDelete.
 */
export interface EnterprisesDevicesDeleteOptions {
  /**
   * Optional flags that control the device wiping behavior.
   */
  wipeDataFlags?:  | "WIPE_DATA_FLAG_UNSPECIFIED" | "PRESERVE_RESET_PROTECTION_DATA" | "WIPE_EXTERNAL_STORAGE";
  /**
   * Optional. A short message displayed to the user before wiping the work
   * profile on personal devices. This has no effect on company owned devices.
   * The maximum message length is 200 characters.
   */
  wipeReasonMessage?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesDevicesList.
 */
export interface EnterprisesDevicesListOptions {
  /**
   * The requested page size. The actual page size may be fixed to a min or max
   * value.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesDevicesOperationsList.
 */
export interface EnterprisesDevicesOperationsListOptions {
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
 * Additional options for AndroidManagement#enterprisesDevicesPatch.
 */
export interface EnterprisesDevicesPatchOptions {
  /**
   * The field mask indicating the fields to update. If not set, all modifiable
   * fields will be modified.
   */
  updateMask?: string /* FieldMask */;
}

function serializeEnterprisesDevicesPatchOptions(data: any): EnterprisesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeEnterprisesDevicesPatchOptions(data: any): EnterprisesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AndroidManagement#enterprisesEnrollmentTokensList.
 */
export interface EnterprisesEnrollmentTokensListOptions {
  /**
   * The requested page size. The service may return fewer than this value. If
   * unspecified, at most 10 items will be returned. The maximum value is 100;
   * values above 100 will be coerced to 100.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesList.
 */
export interface EnterprisesListOptions {
  /**
   * The requested page size. The actual page size may be fixed to a min or max
   * value.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
  /**
   * Required. The Cloud project ID of the EMM managing the enterprises.
   */
  projectId?: string;
  /**
   * Specifies which Enterprise fields to return. This method only supports
   * BASIC.
   */
  view?:  | "ENTERPRISE_VIEW_UNSPECIFIED" | "BASIC";
}

/**
 * Additional options for AndroidManagement#enterprisesPatch.
 */
export interface EnterprisesPatchOptions {
  /**
   * The field mask indicating the fields to update. If not set, all modifiable
   * fields will be modified.
   */
  updateMask?: string /* FieldMask */;
}

function serializeEnterprisesPatchOptions(data: any): EnterprisesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeEnterprisesPatchOptions(data: any): EnterprisesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AndroidManagement#enterprisesPoliciesList.
 */
export interface EnterprisesPoliciesListOptions {
  /**
   * The requested page size. The actual page size may be fixed to a min or max
   * value.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesPoliciesPatch.
 */
export interface EnterprisesPoliciesPatchOptions {
  /**
   * The field mask indicating the fields to update. If not set, all modifiable
   * fields will be modified.
   */
  updateMask?: string /* FieldMask */;
}

function serializeEnterprisesPoliciesPatchOptions(data: any): EnterprisesPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeEnterprisesPoliciesPatchOptions(data: any): EnterprisesPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AndroidManagement#enterprisesWebAppsList.
 */
export interface EnterprisesWebAppsListOptions {
  /**
   * The requested page size. This is a hint and the actual page size in the
   * response may be different.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for AndroidManagement#enterprisesWebAppsPatch.
 */
export interface EnterprisesWebAppsPatchOptions {
  /**
   * The field mask indicating the fields to update. If not set, all modifiable
   * fields will be modified.
   */
  updateMask?: string /* FieldMask */;
}

function serializeEnterprisesWebAppsPatchOptions(data: any): EnterprisesWebAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeEnterprisesWebAppsPatchOptions(data: any): EnterprisesWebAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Configuration to enable an app as an extension app, with the capability of
 * interacting with Android Device Policy offline. For Android versions 13 and
 * above, extension apps are exempt from battery restrictions so will not be
 * placed into the restricted App Standby Bucket
 * (https://developer.android.com/topic/performance/appstandby#restricted-bucket).
 * Extensions apps are also protected against users clearing their data or
 * force-closing the application, although admins can continue to use the clear
 * app data command
 * (https://developer.android.com/management/reference/rest/v1/enterprises.devices/issueCommand#CommandType)
 * on extension apps if needed for Android 13 and above.
 */
export interface ExtensionConfig {
  /**
   * Fully qualified class name of the receiver service class for Android
   * Device Policy to notify the extension app of any local command status
   * updates.
   */
  notificationReceiver?: string;
  /**
   * Hex-encoded SHA-256 hash of the signing certificate of the extension app.
   * Only hexadecimal string representations of 64 characters are valid.If not
   * specified, the signature for the corresponding package name is obtained
   * from the Play Store instead.If this list is empty, the signature of the
   * extension app on the device must match the signature obtained from the Play
   * Store for the app to be able to communicate with Android Device Policy.If
   * this list is not empty, the signature of the extension app on the device
   * must match one of the entries in this list for the app to be able to
   * communicate with Android Device Policy.In production use cases, it is
   * recommended to leave this empty.
   */
  signingKeyFingerprintsSha256?: string[];
}

/**
 * Data hosted at an external location. The data is to be downloaded by Android
 * Device Policy and verified against the hash.
 */
export interface ExternalData {
  /**
   * The base-64 encoded SHA-256 hash of the content hosted at url. If the
   * content doesn't match this hash, Android Device Policy won't use the data.
   */
  sha256Hash?: string;
  /**
   * The absolute URL to the data, which must use either the http or https
   * scheme. Android Device Policy doesn't provide any credentials in the GET
   * request, so the URL must be publicly accessible. Including a long, random
   * component in the URL may be used to prevent attackers from discovering the
   * URL.
   */
  url?: string;
}

/**
 * A file was downloaded from the device.
 */
export interface FilePulledEvent {
  /**
   * The path of the file being pulled.
   */
  filePath?: string;
}

/**
 * A file was uploaded onto the device.
 */
export interface FilePushedEvent {
  /**
   * The path of the file being pushed.
   */
  filePath?: string;
}

/**
 * A system freeze period. When a device’s clock is within the freeze period,
 * all incoming system updates (including security patches) are blocked and
 * won’t be installed. When a device is outside the freeze period, normal update
 * behavior applies. Leap years are ignored in freeze period calculations, in
 * particular: * If Feb. 29th is set as the start or end date of a freeze
 * period, the freeze period will start or end on Feb. 28th instead. * When a
 * device’s system clock reads Feb. 29th, it’s treated as Feb. 28th. * When
 * calculating the number of days in a freeze period or the time between two
 * freeze periods, Feb. 29th is ignored and not counted as a day.Note: For
 * Freeze Periods to take effect, SystemUpdateType cannot be specified as
 * SYSTEM_UPDATE_TYPE_UNSPECIFIED, because freeze periods require a defined
 * policy to be specified.
 */
export interface FreezePeriod {
  /**
   * The end date (inclusive) of the freeze period. Must be no later than 90
   * days from the start date. If the end date is earlier than the start date,
   * the freeze period is considered wrapping year-end. Note: year must not be
   * set. For example, {"month": 1,"date": 30}.
   */
  endDate?: Date;
  /**
   * The start date (inclusive) of the freeze period. Note: year must not be
   * set. For example, {"month": 1,"date": 30}.
   */
  startDate?: Date;
}

/**
 * Information about device hardware. The fields related to temperature
 * thresholds are only available if hardwareStatusEnabled is true in the
 * device's policy.
 */
export interface HardwareInfo {
  /**
   * Battery shutdown temperature thresholds in Celsius for each battery on the
   * device.
   */
  batteryShutdownTemperatures?: number[];
  /**
   * Battery throttling temperature thresholds in Celsius for each battery on
   * the device.
   */
  batteryThrottlingTemperatures?: number[];
  /**
   * Brand of the device. For example, Google.
   */
  brand?: string;
  /**
   * CPU shutdown temperature thresholds in Celsius for each CPU on the device.
   */
  cpuShutdownTemperatures?: number[];
  /**
   * CPU throttling temperature thresholds in Celsius for each CPU on the
   * device.
   */
  cpuThrottlingTemperatures?: number[];
  /**
   * Baseband version. For example, MDM9625_104662.22.05.34p.
   */
  deviceBasebandVersion?: string;
  /**
   * Output only. ID that uniquely identifies a personally-owned device in a
   * particular organization. On the same physical device when enrolled with the
   * same organization, this ID persists across setups and even factory resets.
   * This ID is available on personally-owned devices with a work profile on
   * devices running Android 12 and above.
   */
  readonly enterpriseSpecificId?: string;
  /**
   * GPU shutdown temperature thresholds in Celsius for each GPU on the device.
   */
  gpuShutdownTemperatures?: number[];
  /**
   * GPU throttling temperature thresholds in Celsius for each GPU on the
   * device.
   */
  gpuThrottlingTemperatures?: number[];
  /**
   * Name of the hardware. For example, Angler.
   */
  hardware?: string;
  /**
   * Manufacturer. For example, Motorola.
   */
  manufacturer?: string;
  /**
   * The model of the device. For example, Asus Nexus 7.
   */
  model?: string;
  /**
   * The device serial number.
   */
  serialNumber?: string;
  /**
   * Device skin shutdown temperature thresholds in Celsius.
   */
  skinShutdownTemperatures?: number[];
  /**
   * Device skin throttling temperature thresholds in Celsius.
   */
  skinThrottlingTemperatures?: number[];
}

/**
 * Hardware status. Temperatures may be compared to the temperature thresholds
 * available in hardwareInfo to determine hardware health.
 */
export interface HardwareStatus {
  /**
   * Current battery temperatures in Celsius for each battery on the device.
   */
  batteryTemperatures?: number[];
  /**
   * Current CPU temperatures in Celsius for each CPU on the device.
   */
  cpuTemperatures?: number[];
  /**
   * CPU usages in percentage for each core available on the device. Usage is 0
   * for each unplugged core. Empty array implies that CPU usage is not
   * supported in the system.
   */
  cpuUsages?: number[];
  /**
   * The time the measurements were taken.
   */
  createTime?: Date;
  /**
   * Fan speeds in RPM for each fan on the device. Empty array means that there
   * are no fans or fan speed is not supported on the system.
   */
  fanSpeeds?: number[];
  /**
   * Current GPU temperatures in Celsius for each GPU on the device.
   */
  gpuTemperatures?: number[];
  /**
   * Current device skin temperatures in Celsius.
   */
  skinTemperatures?: number[];
}

function serializeHardwareStatus(data: any): HardwareStatus {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeHardwareStatus(data: any): HardwareStatus {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response on issuing a command. This is currently empty as a placeholder.
 */
export interface IssueCommandResponse {
}

/**
 * A cryptographic key including user installed, admin installed and system
 * maintained private key is removed from the device either by the user or
 * management. This is available device-wide on fully managed devices and within
 * the work profile on organization-owned devices with a work profile.
 */
export interface KeyDestructionEvent {
  /**
   * UID of the application which owns the key.
   */
  applicationUid?: number;
  /**
   * Alias of the key.
   */
  keyAlias?: string;
  /**
   * Whether the operation was successful.
   */
  success?: boolean;
}

/**
 * Keyed app state reported by the app.
 */
export interface KeyedAppState {
  /**
   * The creation time of the app state on the device.
   */
  createTime?: Date;
  /**
   * Optionally, a machine-readable value to be read by the EMM. For example,
   * setting values that the admin can choose to query against in the EMM
   * console (e.g. “notify me if the battery_warning data < 10”).
   */
  data?: string;
  /**
   * The key for the app state. Acts as a point of reference for what the app
   * is providing state for. For example, when providing managed configuration
   * feedback, this key could be the managed configuration key.
   */
  key?: string;
  /**
   * The time the app state was most recently updated.
   */
  lastUpdateTime?: Date;
  /**
   * Optionally, a free-form message string to explain the app state. If the
   * state was triggered by a particular value (e.g. a managed configuration
   * value), it should be included in the message.
   */
  message?: string;
  /**
   * The severity of the app state.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "INFO" | "ERROR";
}

function serializeKeyedAppState(data: any): KeyedAppState {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
  };
}

function deserializeKeyedAppState(data: any): KeyedAppState {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
  };
}

/**
 * A cryptographic key including user installed, admin installed and system
 * maintained private key is installed on the device either by the user or
 * management.This is available device-wide on fully managed devices and within
 * the work profile on organization-owned devices with a work profile.
 */
export interface KeyGeneratedEvent {
  /**
   * UID of the application which generated the key.
   */
  applicationUid?: number;
  /**
   * Alias of the key.
   */
  keyAlias?: string;
  /**
   * Whether the operation was successful.
   */
  success?: boolean;
}

/**
 * An attempt was made to unlock the device.
 */
export interface KeyguardDismissAuthAttemptEvent {
  /**
   * Whether a strong form of authentication (password, PIN, or pattern) was
   * used to unlock device.
   */
  strongAuthMethodUsed?: boolean;
  /**
   * Whether the unlock attempt was successful.
   */
  success?: boolean;
}

/**
 * The keyguard was dismissed. Intentionally empty.
 */
export interface KeyguardDismissedEvent {
}

/**
 * The device was locked either by user or timeout. Intentionally empty.
 */
export interface KeyguardSecuredEvent {
}

/**
 * A cryptographic key including user installed, admin installed and system
 * maintained private key is imported on the device either by the user or
 * management. This is available device-wide on fully managed devices and within
 * the work profile on organization-owned devices with a work profile.
 */
export interface KeyImportEvent {
  /**
   * UID of the application which imported the key
   */
  applicationUid?: number;
  /**
   * Alias of the key.
   */
  keyAlias?: string;
  /**
   * Whether the operation was successful.
   */
  success?: boolean;
}

/**
 * A cryptographic key including user installed, admin installed and system
 * maintained private key is determined to be corrupted due to storage
 * corruption, hardware failure or some OS issue. This is available device-wide
 * on fully managed devices and within the work profile on organization-owned
 * devices with a work profile.
 */
export interface KeyIntegrityViolationEvent {
  /**
   * UID of the application which owns the key
   */
  applicationUid?: number;
  /**
   * Alias of the key.
   */
  keyAlias?: string;
}

/**
 * Settings controlling the behavior of a device in kiosk mode. To enable kiosk
 * mode, set kioskCustomLauncherEnabled to true or specify an app in the policy
 * with installType KIOSK.
 */
export interface KioskCustomization {
  /**
   * Specifies whether the Settings app is allowed in kiosk mode.
   */
  deviceSettings?:  | "DEVICE_SETTINGS_UNSPECIFIED" | "SETTINGS_ACCESS_ALLOWED" | "SETTINGS_ACCESS_BLOCKED";
  /**
   * Sets the behavior of a device in kiosk mode when a user presses and holds
   * (long-presses) the Power button.
   */
  powerButtonActions?:  | "POWER_BUTTON_ACTIONS_UNSPECIFIED" | "POWER_BUTTON_AVAILABLE" | "POWER_BUTTON_BLOCKED";
  /**
   * Specifies whether system info and notifications are disabled in kiosk
   * mode.
   */
  statusBar?:  | "STATUS_BAR_UNSPECIFIED" | "NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED" | "NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED" | "SYSTEM_INFO_ONLY";
  /**
   * Specifies whether system error dialogs for crashed or unresponsive apps
   * are blocked in kiosk mode. When blocked, the system will force-stop the app
   * as if the user chooses the "close app" option on the UI.
   */
  systemErrorWarnings?:  | "SYSTEM_ERROR_WARNINGS_UNSPECIFIED" | "ERROR_AND_WARNINGS_ENABLED" | "ERROR_AND_WARNINGS_MUTED";
  /**
   * Specifies which navigation features are enabled (e.g. Home, Overview
   * buttons) in kiosk mode.
   */
  systemNavigation?:  | "SYSTEM_NAVIGATION_UNSPECIFIED" | "NAVIGATION_ENABLED" | "NAVIGATION_DISABLED" | "HOME_BUTTON_ONLY";
}

/**
 * An action to launch an app.
 */
export interface LaunchAppAction {
  /**
   * Package name of app to be launched
   */
  packageName?: string;
}

/**
 * Response to a request to list devices for a given enterprise.
 */
export interface ListDevicesResponse {
  /**
   * The list of devices.
   */
  devices?: Device[];
  /**
   * If there are more results, a token to retrieve next page of results.
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
 * Response to a request to list enrollment tokens for a given enterprise.
 */
export interface ListEnrollmentTokensResponse {
  /**
   * The list of enrollment tokens.
   */
  enrollmentTokens?: EnrollmentToken[];
  /**
   * If there are more results, a token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeListEnrollmentTokensResponse(data: any): ListEnrollmentTokensResponse {
  return {
    ...data,
    enrollmentTokens: data["enrollmentTokens"] !== undefined ? data["enrollmentTokens"].map((item: any) => (serializeEnrollmentToken(item))) : undefined,
  };
}

function deserializeListEnrollmentTokensResponse(data: any): ListEnrollmentTokensResponse {
  return {
    ...data,
    enrollmentTokens: data["enrollmentTokens"] !== undefined ? data["enrollmentTokens"].map((item: any) => (deserializeEnrollmentToken(item))) : undefined,
  };
}

/**
 * Response to a request to list enterprises.
 */
export interface ListEnterprisesResponse {
  /**
   * The list of enterprises.
   */
  enterprises?: Enterprise[];
  /**
   * If there are more results, a token to retrieve next page of results.
   */
  nextPageToken?: string;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * Response to a request to list policies for a given enterprise.
 */
export interface ListPoliciesResponse {
  /**
   * If there are more results, a token to retrieve next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of policies.
   */
  policies?: Policy[];
}

function serializeListPoliciesResponse(data: any): ListPoliciesResponse {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (serializePolicy(item))) : undefined,
  };
}

function deserializeListPoliciesResponse(data: any): ListPoliciesResponse {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (deserializePolicy(item))) : undefined,
  };
}

/**
 * Response to a request to list web apps for a given enterprise.
 */
export interface ListWebAppsResponse {
  /**
   * If there are more results, a token to retrieve next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of web apps.
   */
  webApps?: WebApp[];
}

function serializeListWebAppsResponse(data: any): ListWebAppsResponse {
  return {
    ...data,
    webApps: data["webApps"] !== undefined ? data["webApps"].map((item: any) => (serializeWebApp(item))) : undefined,
  };
}

function deserializeListWebAppsResponse(data: any): ListWebAppsResponse {
  return {
    ...data,
    webApps: data["webApps"] !== undefined ? data["webApps"].map((item: any) => (deserializeWebApp(item))) : undefined,
  };
}

/**
 * The usageLog buffer on the device has reached 90% of its capacity, therefore
 * older events may be dropped. Intentionally empty.
 */
export interface LogBufferSizeCriticalEvent {
}

/**
 * usageLog policy has been enabled. Intentionally empty.
 */
export interface LoggingStartedEvent {
}

/**
 * usageLog policy has been disabled. Intentionally empty.
 */
export interface LoggingStoppedEvent {
}

/**
 * The managed configurations template for the app, saved from the managed
 * configurations iframe.
 */
export interface ManagedConfigurationTemplate {
  /**
   * Optional, a map containing configuration variables defined for the
   * configuration.
   */
  configurationVariables?: {
    [key: string]: string
  };
  /**
   * The ID of the managed configurations template.
   */
  templateId?: string;
}

/**
 * Managed property.
 */
export interface ManagedProperty {
  /**
   * The default value of the property. BUNDLE_ARRAY properties don't have a
   * default value.
   */
  defaultValue?: any;
  /**
   * A longer description of the property, providing more detail of what it
   * affects. Localized.
   */
  description?: string;
  /**
   * For CHOICE or MULTISELECT properties, the list of possible entries.
   */
  entries?: ManagedPropertyEntry[];
  /**
   * The unique key that the app uses to identify the property, e.g.
   * "com.google.android.gm.fieldname".
   */
  key?: string;
  /**
   * For BUNDLE_ARRAY properties, the list of nested properties. A BUNDLE_ARRAY
   * property is at most two levels deep.
   */
  nestedProperties?: ManagedProperty[];
  /**
   * The name of the property. Localized.
   */
  title?: string;
  /**
   * The type of the property.
   */
  type?:  | "MANAGED_PROPERTY_TYPE_UNSPECIFIED" | "BOOL" | "STRING" | "INTEGER" | "CHOICE" | "MULTISELECT" | "HIDDEN" | "BUNDLE" | "BUNDLE_ARRAY";
}

/**
 * An entry of a managed property.
 */
export interface ManagedPropertyEntry {
  /**
   * The human-readable name of the value. Localized.
   */
  name?: string;
  /**
   * The machine-readable value of the entry, which should be used in the
   * configuration. Not localized.
   */
  value?: string;
}

/**
 * Removable media was mounted.
 */
export interface MediaMountEvent {
  /**
   * Mount point.
   */
  mountPoint?: string;
  /**
   * Volume label. Redacted to empty string on organization-owned managed
   * profile devices.
   */
  volumeLabel?: string;
}

/**
 * Removable media was unmounted.
 */
export interface MediaUnmountEvent {
  /**
   * Mount point.
   */
  mountPoint?: string;
  /**
   * Volume label. Redacted to empty string on organization-owned managed
   * profile devices.
   */
  volumeLabel?: string;
}

/**
 * An event related to memory and storage measurements.
 */
export interface MemoryEvent {
  /**
   * The number of free bytes in the medium, or for EXTERNAL_STORAGE_DETECTED,
   * the total capacity in bytes of the storage medium.
   */
  byteCount?: bigint;
  /**
   * The creation time of the event.
   */
  createTime?: Date;
  /**
   * Event type.
   */
  eventType?:  | "MEMORY_EVENT_TYPE_UNSPECIFIED" | "RAM_MEASURED" | "INTERNAL_STORAGE_MEASURED" | "EXTERNAL_STORAGE_DETECTED" | "EXTERNAL_STORAGE_REMOVED" | "EXTERNAL_STORAGE_MEASURED";
}

function serializeMemoryEvent(data: any): MemoryEvent {
  return {
    ...data,
    byteCount: data["byteCount"] !== undefined ? String(data["byteCount"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeMemoryEvent(data: any): MemoryEvent {
  return {
    ...data,
    byteCount: data["byteCount"] !== undefined ? BigInt(data["byteCount"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Information about device memory and storage.
 */
export interface MemoryInfo {
  /**
   * Total internal storage on device in bytes.
   */
  totalInternalStorage?: bigint;
  /**
   * Total RAM on device in bytes.
   */
  totalRam?: bigint;
}

function serializeMemoryInfo(data: any): MemoryInfo {
  return {
    ...data,
    totalInternalStorage: data["totalInternalStorage"] !== undefined ? String(data["totalInternalStorage"]) : undefined,
    totalRam: data["totalRam"] !== undefined ? String(data["totalRam"]) : undefined,
  };
}

function deserializeMemoryInfo(data: any): MemoryInfo {
  return {
    ...data,
    totalInternalStorage: data["totalInternalStorage"] !== undefined ? BigInt(data["totalInternalStorage"]) : undefined,
    totalRam: data["totalRam"] !== undefined ? BigInt(data["totalRam"]) : undefined,
  };
}

/**
 * Device network info.
 */
export interface NetworkInfo {
  /**
   * IMEI number of the GSM device. For example, A1000031212.
   */
  imei?: string;
  /**
   * MEID number of the CDMA device. For example, A00000292788E1.
   */
  meid?: string;
  /**
   * Alphabetic name of current registered operator. For example, Vodafone.
   */
  networkOperatorName?: string;
  /**
   * Provides telephony information associated with each SIM card on the
   * device. Only supported on fully managed devices starting from Android API
   * level 23.
   */
  telephonyInfos?: TelephonyInfo[];
  /**
   * Wi-Fi MAC address of the device. For example, 7c:11:11:11:11:11.
   */
  wifiMacAddress?: string;
}

/**
 * Provides detail about non-compliance with a policy setting.
 */
export interface NonComplianceDetail {
  /**
   * If the policy setting could not be applied, the current value of the
   * setting on the device.
   */
  currentValue?: any;
  /**
   * For settings with nested fields, if a particular nested field is out of
   * compliance, this specifies the full path to the offending field. The path
   * is formatted in the same way the policy JSON field would be referenced in
   * JavaScript, that is: 1) For object-typed fields, the field name is followed
   * by a dot then by a subfield name. 2) For array-typed fields, the field name
   * is followed by the array index enclosed in brackets. For example, to
   * indicate a problem with the url field in the externalData field in the 3rd
   * application, the path would be applications[2].externalData.url
   */
  fieldPath?: string;
  /**
   * If package_name is set and the non-compliance reason is APP_NOT_INSTALLED
   * or APP_NOT_UPDATED, the detailed reason the app can't be installed or
   * updated.
   */
  installationFailureReason?:  | "INSTALLATION_FAILURE_REASON_UNSPECIFIED" | "INSTALLATION_FAILURE_REASON_UNKNOWN" | "IN_PROGRESS" | "NOT_FOUND" | "NOT_COMPATIBLE_WITH_DEVICE" | "NOT_APPROVED" | "PERMISSIONS_NOT_ACCEPTED" | "NOT_AVAILABLE_IN_COUNTRY" | "NO_LICENSES_REMAINING" | "NOT_ENROLLED" | "USER_INVALID";
  /**
   * The reason the device is not in compliance with the setting.
   */
  nonComplianceReason?:  | "NON_COMPLIANCE_REASON_UNSPECIFIED" | "API_LEVEL" | "MANAGEMENT_MODE" | "USER_ACTION" | "INVALID_VALUE" | "APP_NOT_INSTALLED" | "UNSUPPORTED" | "APP_INSTALLED" | "PENDING" | "APP_INCOMPATIBLE" | "APP_NOT_UPDATED";
  /**
   * The package name indicating which app is out of compliance, if applicable.
   */
  packageName?: string;
  /**
   * The name of the policy setting. This is the JSON field name of a top-level
   * Policy field.
   */
  settingName?: string;
  /**
   * Additional context for specific_non_compliance_reason.
   */
  specificNonComplianceContext?: SpecificNonComplianceContext;
  /**
   * The policy-specific reason the device is not in compliance with the
   * setting.
   */
  specificNonComplianceReason?:  | "SPECIFIC_NON_COMPLIANCE_REASON_UNSPECIFIED" | "PASSWORD_POLICIES_USER_CREDENTIALS_CONFIRMATION_REQUIRED" | "PASSWORD_POLICIES_PASSWORD_EXPIRED" | "PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT" | "ONC_WIFI_INVALID_VALUE" | "ONC_WIFI_API_LEVEL";
}

/**
 * A compliance rule condition which is satisfied if there exists any matching
 * NonComplianceDetail for the device. A NonComplianceDetail matches a
 * NonComplianceDetailCondition if all the fields which are set within the
 * NonComplianceDetailCondition match the corresponding NonComplianceDetail
 * fields.
 */
export interface NonComplianceDetailCondition {
  /**
   * The reason the device is not in compliance with the setting. If not set,
   * then this condition matches any reason.
   */
  nonComplianceReason?:  | "NON_COMPLIANCE_REASON_UNSPECIFIED" | "API_LEVEL" | "MANAGEMENT_MODE" | "USER_ACTION" | "INVALID_VALUE" | "APP_NOT_INSTALLED" | "UNSUPPORTED" | "APP_INSTALLED" | "PENDING" | "APP_INCOMPATIBLE" | "APP_NOT_UPDATED";
  /**
   * The package name of the app that's out of compliance. If not set, then
   * this condition matches any package name.
   */
  packageName?: string;
  /**
   * The name of the policy setting. This is the JSON field name of a top-level
   * Policy field. If not set, then this condition matches any setting name.
   */
  settingName?: string;
}

/**
 * This feature is not generally available.
 */
export interface OncCertificateProvider {
  /**
   * This feature is not generally available.
   */
  certificateReferences?: string[];
  /**
   * This feature is not generally available.
   */
  contentProviderEndpoint?: ContentProviderEndpoint;
}

/**
 * Additional context for non-compliance related to Wi-Fi configuration.
 */
export interface OncWifiContext {
  /**
   * The GUID of non-compliant Wi-Fi configuration.
   */
  wifiGuid?: string;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: Status;
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
   * that originally returns it. If you use the default HTTP mapping, the name
   * should be a resource name ending with operations/{unique_id}.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as Delete, the response is
   * google.protobuf.Empty. If the original method is standard
   * Get/Create/Update, the response should be the resource. For other methods,
   * the response should have the type XxxResponse, where Xxx is the original
   * method name. For example, if the original method name is TakeSnapshot(),
   * the inferred response type is TakeSnapshotResponse.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Device was shutdown. Intentionally empty.
 */
export interface OsShutdownEvent {
}

/**
 * Device was started.
 */
export interface OsStartupEvent {
  /**
   * Verified Boot state.
   */
  verifiedBootState?:  | "VERIFIED_BOOT_STATE_UNSPECIFIED" | "GREEN" | "YELLOW" | "ORANGE";
  /**
   * dm-verity mode.
   */
  verityMode?:  | "DM_VERITY_MODE_UNSPECIFIED" | "ENFORCING" | "IO_ERROR" | "DISABLED";
}

/**
 * A list of package names.
 */
export interface PackageNameList {
  /**
   * A list of package names.
   */
  packageNames?: string[];
}

/**
 * Additional context for non-compliance related to password policies.
 */
export interface PasswordPoliciesContext {
  /**
   * The scope of non-compliant password.
   */
  passwordPolicyScope?:  | "SCOPE_UNSPECIFIED" | "SCOPE_DEVICE" | "SCOPE_PROFILE";
}

/**
 * Requirements for the password used to unlock a device.
 */
export interface PasswordRequirements {
  /**
   * Number of incorrect device-unlock passwords that can be entered before a
   * device is wiped. A value of 0 means there is no restriction.
   */
  maximumFailedPasswordsForWipe?: number;
  /**
   * Password expiration timeout.
   */
  passwordExpirationTimeout?: number /* Duration */;
  /**
   * The length of the password history. After setting this field, the user
   * won't be able to enter a new password that is the same as any password in
   * the history. A value of 0 means there is no restriction.
   */
  passwordHistoryLength?: number;
  /**
   * The minimum allowed password length. A value of 0 means there is no
   * restriction. Only enforced when password_quality is NUMERIC,
   * NUMERIC_COMPLEX, ALPHABETIC, ALPHANUMERIC, or COMPLEX.
   */
  passwordMinimumLength?: number;
  /**
   * Minimum number of letters required in the password. Only enforced when
   * password_quality is COMPLEX.
   */
  passwordMinimumLetters?: number;
  /**
   * Minimum number of lower case letters required in the password. Only
   * enforced when password_quality is COMPLEX.
   */
  passwordMinimumLowerCase?: number;
  /**
   * Minimum number of non-letter characters (numerical digits or symbols)
   * required in the password. Only enforced when password_quality is COMPLEX.
   */
  passwordMinimumNonLetter?: number;
  /**
   * Minimum number of numerical digits required in the password. Only enforced
   * when password_quality is COMPLEX.
   */
  passwordMinimumNumeric?: number;
  /**
   * Minimum number of symbols required in the password. Only enforced when
   * password_quality is COMPLEX.
   */
  passwordMinimumSymbols?: number;
  /**
   * Minimum number of upper case letters required in the password. Only
   * enforced when password_quality is COMPLEX.
   */
  passwordMinimumUpperCase?: number;
  /**
   * The required password quality.
   */
  passwordQuality?:  | "PASSWORD_QUALITY_UNSPECIFIED" | "BIOMETRIC_WEAK" | "SOMETHING" | "NUMERIC" | "NUMERIC_COMPLEX" | "ALPHABETIC" | "ALPHANUMERIC" | "COMPLEX" | "COMPLEXITY_LOW" | "COMPLEXITY_MEDIUM" | "COMPLEXITY_HIGH";
  /**
   * The scope that the password requirement applies to.
   */
  passwordScope?:  | "SCOPE_UNSPECIFIED" | "SCOPE_DEVICE" | "SCOPE_PROFILE";
  /**
   * The length of time after a device or work profile is unlocked using a
   * strong form of authentication (password, PIN, pattern) that it can be
   * unlocked using any other authentication method (e.g. fingerprint, trust
   * agents, face). After the specified time period elapses, only strong forms
   * of authentication can be used to unlock the device or work profile.
   */
  requirePasswordUnlock?:  | "REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED" | "USE_DEFAULT_DEVICE_TIMEOUT" | "REQUIRE_EVERY_DAY";
  /**
   * Controls whether a unified lock is allowed for the device and the work
   * profile, on devices running Android 9 and above with a work profile. This
   * can be set only if password_scope is set to SCOPE_PROFILE, the policy will
   * be rejected otherwise. If user has not set a separate work lock and this
   * field is set to REQUIRE_SEPARATE_WORK_LOCK, a NonComplianceDetail is
   * reported with nonComplianceReason set to USER_ACTION.
   */
  unifiedLockSettings?:  | "UNIFIED_LOCK_SETTINGS_UNSPECIFIED" | "ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK" | "REQUIRE_SEPARATE_WORK_LOCK";
}

function serializePasswordRequirements(data: any): PasswordRequirements {
  return {
    ...data,
    passwordExpirationTimeout: data["passwordExpirationTimeout"] !== undefined ? data["passwordExpirationTimeout"] : undefined,
  };
}

function deserializePasswordRequirements(data: any): PasswordRequirements {
  return {
    ...data,
    passwordExpirationTimeout: data["passwordExpirationTimeout"] !== undefined ? data["passwordExpirationTimeout"] : undefined,
  };
}

/**
 * The result of an attempt to clear the data of a single app.
 */
export interface PerAppResult {
  /**
   * The result of an attempt to clear the data of a single app.
   */
  clearingResult?:  | "CLEARING_RESULT_UNSPECIFIED" | "SUCCESS" | "APP_NOT_FOUND" | "APP_PROTECTED" | "API_LEVEL";
}

/**
 * Configuration for an Android permission and its grant state.
 */
export interface PermissionGrant {
  /**
   * The Android permission or group, e.g. android.permission.READ_CALENDAR or
   * android.permission_group.CALENDAR.
   */
  permission?: string;
  /**
   * The policy for granting the permission.
   */
  policy?:  | "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY";
}

/**
 * A default activity for handling intents that match a particular intent
 * filter. Note: To set up a kiosk, use InstallType to KIOSK rather than use
 * persistent preferred activities.
 */
export interface PersistentPreferredActivity {
  /**
   * The intent actions to match in the filter. If any actions are included in
   * the filter, then an intent's action must be one of those values for it to
   * match. If no actions are included, the intent action is ignored.
   */
  actions?: string[];
  /**
   * The intent categories to match in the filter. An intent includes the
   * categories that it requires, all of which must be included in the filter in
   * order to match. In other words, adding a category to the filter has no
   * impact on matching unless that category is specified in the intent.
   */
  categories?: string[];
  /**
   * The activity that should be the default intent handler. This should be an
   * Android component name, e.g. com.android.enterprise.app/.MainActivity.
   * Alternatively, the value may be the package name of an app, which causes
   * Android Device Policy to choose an appropriate activity from the app to
   * handle the intent.
   */
  receiverActivity?: string;
}

/**
 * Policies for apps in the personal profile of a company-owned device with a
 * work profile.
 */
export interface PersonalApplicationPolicy {
  /**
   * The type of installation to perform.
   */
  installType?:  | "INSTALL_TYPE_UNSPECIFIED" | "BLOCKED" | "AVAILABLE";
  /**
   * The package name of the application.
   */
  packageName?: string;
}

/**
 * Policies controlling personal usage on a company-owned device with a work
 * profile.
 */
export interface PersonalUsagePolicies {
  /**
   * Account types that can't be managed by the user.
   */
  accountTypesWithManagementDisabled?: string[];
  /**
   * If true, the camera is disabled on the personal profile.
   */
  cameraDisabled?: boolean;
  /**
   * Controls how long the work profile can stay off. The duration must be at
   * least 3 days.
   */
  maxDaysWithWorkOff?: number;
  /**
   * Policy applied to applications in the personal profile.
   */
  personalApplications?: PersonalApplicationPolicy[];
  /**
   * Used together with personalApplications to control how apps in the
   * personal profile are allowed or blocked.
   */
  personalPlayStoreMode?:  | "PLAY_STORE_MODE_UNSPECIFIED" | "BLACKLIST" | "BLOCKLIST" | "ALLOWLIST";
  /**
   * If true, screen capture is disabled for all users.
   */
  screenCaptureDisabled?: boolean;
}

/**
 * A policy resource represents a group of settings that govern the behavior of
 * a managed device and the apps installed on it.
 */
export interface Policy {
  /**
   * Account types that can't be managed by the user.
   */
  accountTypesWithManagementDisabled?: string[];
  /**
   * Whether adding new users and profiles is disabled.
   */
  addUserDisabled?: boolean;
  /**
   * Whether adjusting the master volume is disabled. Also mutes the device.
   */
  adjustVolumeDisabled?: boolean;
  /**
   * Security policies set to secure values by default. To maintain the
   * security posture of a device, we don't recommend overriding any of the
   * default values.
   */
  advancedSecurityOverrides?: AdvancedSecurityOverrides;
  /**
   * Configuration for an always-on VPN connection. Use with
   * vpn_config_disabled to prevent modification of this setting.
   */
  alwaysOnVpnPackage?: AlwaysOnVpnPackage;
  /**
   * The app tracks for Android Device Policy the device can access. The device
   * receives the latest version among all accessible tracks. If no tracks are
   * specified, then the device only uses the production track.
   */
  androidDevicePolicyTracks?:  | "APP_TRACK_UNSPECIFIED" | "PRODUCTION" | "BETA"[];
  /**
   * Deprecated. Use autoUpdateMode instead.When autoUpdateMode is set to
   * AUTO_UPDATE_POSTPONED or AUTO_UPDATE_HIGH_PRIORITY, this field has no
   * effect.The app auto update policy, which controls when automatic app
   * updates can be applied.
   */
  appAutoUpdatePolicy?:  | "APP_AUTO_UPDATE_POLICY_UNSPECIFIED" | "CHOICE_TO_THE_USER" | "NEVER" | "WIFI_ONLY" | "ALWAYS";
  /**
   * Policy applied to apps.
   */
  applications?: ApplicationPolicy[];
  /**
   * Whether auto date, time, and time zone are enabled on a company-owned
   * device. If this is set, then autoTimeRequired is ignored.
   */
  autoDateAndTimeZone?:  | "AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED" | "AUTO_DATE_AND_TIME_ZONE_USER_CHOICE" | "AUTO_DATE_AND_TIME_ZONE_ENFORCED";
  /**
   * Whether auto time is required, which prevents the user from manually
   * setting the date and time. If autoDateAndTimeZone is set, this field is
   * ignored.
   */
  autoTimeRequired?: boolean;
  /**
   * Whether applications other than the ones configured in applications are
   * blocked from being installed. When set, applications that were installed
   * under a previous policy but no longer appear in the policy are
   * automatically uninstalled.
   */
  blockApplicationsEnabled?: boolean;
  /**
   * Whether configuring bluetooth is disabled.
   */
  bluetoothConfigDisabled?: boolean;
  /**
   * Whether bluetooth contact sharing is disabled.
   */
  bluetoothContactSharingDisabled?: boolean;
  /**
   * Whether bluetooth is disabled. Prefer this setting over
   * bluetooth_config_disabled because bluetooth_config_disabled can be bypassed
   * by the user.
   */
  bluetoothDisabled?: boolean;
  /**
   * Controls the use of the camera and whether the user has access to the
   * camera access toggle.
   */
  cameraAccess?:  | "CAMERA_ACCESS_UNSPECIFIED" | "CAMERA_ACCESS_USER_CHOICE" | "CAMERA_ACCESS_DISABLED" | "CAMERA_ACCESS_ENFORCED";
  /**
   * If camera_access is set to any value other than CAMERA_ACCESS_UNSPECIFIED,
   * this has no effect. Otherwise this field controls whether cameras are
   * disabled: If true, all cameras are disabled, otherwise they are available.
   * For fully managed devices this field applies for all apps on the device.
   * For work profiles, this field applies only to apps in the work profile, and
   * the camera access of apps outside the work profile is unaffected.
   */
  cameraDisabled?: boolean;
  /**
   * Whether configuring cell broadcast is disabled.
   */
  cellBroadcastsConfigDisabled?: boolean;
  /**
   * Rules for determining apps' access to private keys. See
   * ChoosePrivateKeyRule for details.
   */
  choosePrivateKeyRules?: ChoosePrivateKeyRule[];
  /**
   * Rules declaring which mitigating actions to take when a device is not
   * compliant with its policy. When the conditions for multiple rules are
   * satisfied, all of the mitigating actions for the rules are taken. There is
   * a maximum limit of 100 rules. Use policy enforcement rules instead.
   */
  complianceRules?: ComplianceRule[];
  /**
   * Whether creating windows besides app windows is disabled.
   */
  createWindowsDisabled?: boolean;
  /**
   * Whether configuring user credentials is disabled.
   */
  credentialsConfigDisabled?: boolean;
  /**
   * Cross-profile policies applied on the device.
   */
  crossProfilePolicies?: CrossProfilePolicies;
  /**
   * Whether roaming data services are disabled.
   */
  dataRoamingDisabled?: boolean;
  /**
   * Whether the user is allowed to enable debugging features.
   */
  debuggingFeaturesAllowed?: boolean;
  /**
   * The default permission policy for runtime permission requests.
   */
  defaultPermissionPolicy?:  | "PERMISSION_POLICY_UNSPECIFIED" | "PROMPT" | "GRANT" | "DENY";
  /**
   * The device owner information to be shown on the lock screen.
   */
  deviceOwnerLockScreenInfo?: UserFacingMessage;
  /**
   * Whether encryption is enabled
   */
  encryptionPolicy?:  | "ENCRYPTION_POLICY_UNSPECIFIED" | "ENABLED_WITHOUT_PASSWORD" | "ENABLED_WITH_PASSWORD";
  /**
   * Whether app verification is force-enabled.
   */
  ensureVerifyAppsEnabled?: boolean;
  /**
   * Whether factory resetting from settings is disabled.
   */
  factoryResetDisabled?: boolean;
  /**
   * Email addresses of device administrators for factory reset protection.
   * When the device is factory reset, it will require one of these admins to
   * log in with the Google account email and password to unlock the device. If
   * no admins are specified, the device won't provide factory reset protection.
   */
  frpAdminEmails?: string[];
  /**
   * Whether the user is allowed to have fun. Controls whether the Easter egg
   * game in Settings is disabled.
   */
  funDisabled?: boolean;
  /**
   * Whether user installation of apps is disabled.
   */
  installAppsDisabled?: boolean;
  /**
   * This field has no effect.
   */
  installUnknownSourcesAllowed?: boolean;
  /**
   * If true, this disables the Lock Screen
   * (https://source.android.com/docs/core/display/multi_display/lock-screen)
   * for primary and/or secondary displays.
   */
  keyguardDisabled?: boolean;
  /**
   * Disabled keyguard customizations, such as widgets.
   */
  keyguardDisabledFeatures?:  | "KEYGUARD_DISABLED_FEATURE_UNSPECIFIED" | "CAMERA" | "NOTIFICATIONS" | "UNREDACTED_NOTIFICATIONS" | "TRUST_AGENTS" | "DISABLE_FINGERPRINT" | "DISABLE_REMOTE_INPUT" | "FACE" | "IRIS" | "BIOMETRICS" | "ALL_FEATURES"[];
  /**
   * Settings controlling the behavior of a device in kiosk mode. To enable
   * kiosk mode, set kioskCustomLauncherEnabled to true or specify an app in the
   * policy with installType KIOSK.
   */
  kioskCustomization?: KioskCustomization;
  /**
   * Whether the kiosk custom launcher is enabled. This replaces the home
   * screen with a launcher that locks down the device to the apps installed via
   * the applications setting. Apps appear on a single page in alphabetical
   * order. Use kioskCustomization to further configure the kiosk device
   * behavior.
   */
  kioskCustomLauncherEnabled?: boolean;
  /**
   * The degree of location detection enabled.
   */
  locationMode?:  | "LOCATION_MODE_UNSPECIFIED" | "HIGH_ACCURACY" | "SENSORS_ONLY" | "BATTERY_SAVING" | "OFF" | "LOCATION_USER_CHOICE" | "LOCATION_ENFORCED" | "LOCATION_DISABLED";
  /**
   * A message displayed to the user in the device administators settings
   * screen.
   */
  longSupportMessage?: UserFacingMessage;
  /**
   * Maximum time in milliseconds for user activity until the device locks. A
   * value of 0 means there is no restriction.
   */
  maximumTimeToLock?: bigint;
  /**
   * Controls the use of the microphone and whether the user has access to the
   * microphone access toggle. This applies only on fully managed devices.
   */
  microphoneAccess?:  | "MICROPHONE_ACCESS_UNSPECIFIED" | "MICROPHONE_ACCESS_USER_CHOICE" | "MICROPHONE_ACCESS_DISABLED" | "MICROPHONE_ACCESS_ENFORCED";
  /**
   * The minimum allowed Android API level.
   */
  minimumApiLevel?: number;
  /**
   * Whether configuring mobile networks is disabled.
   */
  mobileNetworksConfigDisabled?: boolean;
  /**
   * Whether adding or removing accounts is disabled.
   */
  modifyAccountsDisabled?: boolean;
  /**
   * Whether the user mounting physical external media is disabled.
   */
  mountPhysicalMediaDisabled?: boolean;
  /**
   * The name of the policy in the form
   * enterprises/{enterpriseId}/policies/{policyId}.
   */
  name?: string;
  /**
   * Whether the network escape hatch is enabled. If a network connection can't
   * be made at boot time, the escape hatch prompts the user to temporarily
   * connect to a network in order to refresh the device policy. After applying
   * policy, the temporary network will be forgotten and the device will
   * continue booting. This prevents being unable to connect to a network if
   * there is no suitable network in the last policy and the device boots into
   * an app in lock task mode, or the user is otherwise unable to reach device
   * settings.Note: Setting wifiConfigDisabled to true will override this
   * setting under specific circumstances. Please see wifiConfigDisabled for
   * further details.
   */
  networkEscapeHatchEnabled?: boolean;
  /**
   * Whether resetting network settings is disabled.
   */
  networkResetDisabled?: boolean;
  /**
   * This feature is not generally available.
   */
  oncCertificateProviders?: OncCertificateProvider[];
  /**
   * Network configuration for the device. See configure networks for more
   * information.
   */
  openNetworkConfiguration?: {
    [key: string]: any
  };
  /**
   * Whether using NFC to beam data from apps is disabled.
   */
  outgoingBeamDisabled?: boolean;
  /**
   * Whether outgoing calls are disabled.
   */
  outgoingCallsDisabled?: boolean;
  /**
   * Password requirement policies. Different policies can be set for work
   * profile or fully managed devices by setting the password_scope field in the
   * policy.
   */
  passwordPolicies?: PasswordRequirements[];
  /**
   * Password requirements. The field
   * password_requirements.require_password_unlock must not be set. DEPRECATED -
   * Use passwordPolicies.Note:Complexity-based values of PasswordQuality, that
   * is, COMPLEXITY_LOW, COMPLEXITY_MEDIUM, and COMPLEXITY_HIGH, cannot be used
   * here. unified_lock_settings cannot be used here.
   */
  passwordRequirements?: PasswordRequirements;
  /**
   * Explicit permission or group grants or denials for all apps. These values
   * override the default_permission_policy.
   */
  permissionGrants?: PermissionGrant[];
  /**
   * Specifies permitted accessibility services. If the field is not set, any
   * accessibility service can be used. If the field is set, only the
   * accessibility services in this list and the system's built-in accessibility
   * service can be used. In particular, if the field is set to empty, only the
   * system's built-in accessibility servicess can be used. This can be set on
   * fully managed devices and on work profiles. When applied to a work profile,
   * this affects both the personal profile and the work profile.
   */
  permittedAccessibilityServices?: PackageNameList;
  /**
   * If present, only the input methods provided by packages in this list are
   * permitted. If this field is present, but the list is empty, then only
   * system input methods are permitted.
   */
  permittedInputMethods?: PackageNameList;
  /**
   * Default intent handler activities.
   */
  persistentPreferredActivities?: PersistentPreferredActivity[];
  /**
   * Policies managing personal usage on a company-owned device.
   */
  personalUsagePolicies?: PersonalUsagePolicies;
  /**
   * This mode controls which apps are available to the user in the Play Store
   * and the behavior on the device when apps are removed from the policy.
   */
  playStoreMode?:  | "PLAY_STORE_MODE_UNSPECIFIED" | "WHITELIST" | "BLACKLIST";
  /**
   * Rules that define the behavior when a particular policy can not be applied
   * on device
   */
  policyEnforcementRules?: PolicyEnforcementRule[];
  /**
   * Controls whether preferential network service is enabled on the work
   * profile. For example, an organization may have an agreement with a carrier
   * that all of the work data from its employees' devices will be sent via a
   * network service dedicated for enterprise use. An example of a supported
   * preferential network service is the enterprise slice on 5G networks. This
   * has no effect on fully managed devices.
   */
  preferentialNetworkService?:  | "PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED" | "PREFERENTIAL_NETWORK_SERVICE_DISABLED" | "PREFERENTIAL_NETWORK_SERVICE_ENABLED";
  /**
   * Allows showing UI on a device for a user to choose a private key alias if
   * there are no matching rules in ChoosePrivateKeyRules. For devices below
   * Android P, setting this may leave enterprise keys vulnerable.
   */
  privateKeySelectionEnabled?: boolean;
  /**
   * The network-independent global HTTP proxy. Typically proxies should be
   * configured per-network in open_network_configuration. However for unusual
   * configurations like general internal filtering a global HTTP proxy may be
   * useful. If the proxy is not accessible, network access may break. The
   * global proxy is only a recommendation and some apps may ignore it.
   */
  recommendedGlobalProxy?: ProxyInfo;
  /**
   * Whether removing other users is disabled.
   */
  removeUserDisabled?: boolean;
  /**
   * Whether rebooting the device into safe boot is disabled.
   */
  safeBootDisabled?: boolean;
  /**
   * Whether screen capture is disabled.
   */
  screenCaptureDisabled?: boolean;
  /**
   * Action to take during the setup process. At most one action may be
   * specified.
   */
  setupActions?: SetupAction[];
  /**
   * Whether changing the user icon is disabled.
   */
  setUserIconDisabled?: boolean;
  /**
   * Whether changing the wallpaper is disabled.
   */
  setWallpaperDisabled?: boolean;
  /**
   * Whether location sharing is disabled. share_location_disabled is supported
   * for both fully managed devices and personally owned work profiles.
   */
  shareLocationDisabled?: boolean;
  /**
   * A message displayed to the user in the settings screen wherever
   * functionality has been disabled by the admin. If the message is longer than
   * 200 characters it may be truncated.
   */
  shortSupportMessage?: UserFacingMessage;
  /**
   * Flag to skip hints on the first use. Enterprise admin can enable the
   * system recommendation for apps to skip their user tutorial and other
   * introductory hints on first start-up.
   */
  skipFirstUseHintsEnabled?: boolean;
  /**
   * Whether sending and receiving SMS messages is disabled.
   */
  smsDisabled?: boolean;
  /**
   * Whether the status bar is disabled. This disables notifications, quick
   * settings, and other screen overlays that allow escape from full-screen
   * mode. DEPRECATED. To disable the status bar on a kiosk device, use
   * InstallType KIOSK or kioskCustomLauncherEnabled.
   */
  statusBarDisabled?: boolean;
  /**
   * Status reporting settings
   */
  statusReportingSettings?: StatusReportingSettings;
  /**
   * The battery plugged in modes for which the device stays on. When using
   * this setting, it is recommended to clear maximum_time_to_lock so that the
   * device doesn't lock itself while it stays on.
   */
  stayOnPluggedModes?:  | "BATTERY_PLUGGED_MODE_UNSPECIFIED" | "AC" | "USB" | "WIRELESS"[];
  /**
   * The system update policy, which controls how OS updates are applied. If
   * the update type is WINDOWED, the update window will automatically apply to
   * Play app updates as well.
   */
  systemUpdate?: SystemUpdate;
  /**
   * Whether configuring tethering and portable hotspots is disabled.
   */
  tetheringConfigDisabled?: boolean;
  /**
   * Whether user uninstallation of applications is disabled. This prevents
   * apps from being uninstalled, even those removed using applications
   */
  uninstallAppsDisabled?: boolean;
  /**
   * If microphone_access is set to any value other than
   * MICROPHONE_ACCESS_UNSPECIFIED, this has no effect. Otherwise this field
   * controls whether microphones are disabled: If true, all microphones are
   * disabled, otherwise they are available. This is available only on fully
   * managed devices.
   */
  unmuteMicrophoneDisabled?: boolean;
  /**
   * Configuration of device activity logging.
   */
  usageLog?: UsageLog;
  /**
   * Whether transferring files over USB is disabled. This is supported only on
   * company-owned devices.
   */
  usbFileTransferDisabled?: boolean;
  /**
   * Whether USB storage is enabled. Deprecated.
   */
  usbMassStorageEnabled?: boolean;
  /**
   * The version of the policy. This is a read-only field. The version is
   * incremented each time the policy is updated.
   */
  version?: bigint;
  /**
   * Whether configuring VPN is disabled.
   */
  vpnConfigDisabled?: boolean;
  /**
   * Whether configuring Wi-Fi access points is disabled. Note: If a network
   * connection can't be made at boot time and configuring Wi-Fi is disabled
   * then network escape hatch will be shown in order to refresh the device
   * policy (see networkEscapeHatchEnabled).
   */
  wifiConfigDisabled?: boolean;
  /**
   * DEPRECATED - Use wifi_config_disabled.
   */
  wifiConfigsLockdownEnabled?: boolean;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    maximumTimeToLock: data["maximumTimeToLock"] !== undefined ? String(data["maximumTimeToLock"]) : undefined,
    passwordPolicies: data["passwordPolicies"] !== undefined ? data["passwordPolicies"].map((item: any) => (serializePasswordRequirements(item))) : undefined,
    passwordRequirements: data["passwordRequirements"] !== undefined ? serializePasswordRequirements(data["passwordRequirements"]) : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    maximumTimeToLock: data["maximumTimeToLock"] !== undefined ? BigInt(data["maximumTimeToLock"]) : undefined,
    passwordPolicies: data["passwordPolicies"] !== undefined ? data["passwordPolicies"].map((item: any) => (deserializePasswordRequirements(item))) : undefined,
    passwordRequirements: data["passwordRequirements"] !== undefined ? deserializePasswordRequirements(data["passwordRequirements"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * A rule that defines the actions to take if a device or work profile is not
 * compliant with the policy specified in settingName.
 */
export interface PolicyEnforcementRule {
  /**
   * An action to block access to apps and data on a company owned device or in
   * a work profile. This action also triggers a user-facing notification with
   * information (where possible) on how to correct the compliance issue. Note:
   * wipeAction must also be specified.
   */
  blockAction?: BlockAction;
  /**
   * The top-level policy to enforce. For example, applications or
   * passwordPolicies.
   */
  settingName?: string;
  /**
   * An action to reset a company owned device or delete a work profile. Note:
   * blockAction must also be specified.
   */
  wipeAction?: WipeAction;
}

/**
 * Additional details regarding the security posture of the device.
 */
export interface PostureDetail {
  /**
   * Corresponding admin-facing advice to mitigate this security risk and
   * improve the security posture of the device.
   */
  advice?: UserFacingMessage[];
  /**
   * A specific security risk that negatively affects the security posture of
   * the device.
   */
  securityRisk?:  | "SECURITY_RISK_UNSPECIFIED" | "UNKNOWN_OS" | "COMPROMISED_OS" | "HARDWARE_BACKED_EVALUATION_FAILED";
}

/**
 * A power management event.
 */
export interface PowerManagementEvent {
  /**
   * For BATTERY_LEVEL_COLLECTED events, the battery level as a percentage.
   */
  batteryLevel?: number;
  /**
   * The creation time of the event.
   */
  createTime?: Date;
  /**
   * Event type.
   */
  eventType?:  | "POWER_MANAGEMENT_EVENT_TYPE_UNSPECIFIED" | "BATTERY_LEVEL_COLLECTED" | "POWER_CONNECTED" | "POWER_DISCONNECTED" | "BATTERY_LOW" | "BATTERY_OKAY" | "BOOT_COMPLETED" | "SHUTDOWN";
}

function serializePowerManagementEvent(data: any): PowerManagementEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializePowerManagementEvent(data: any): PowerManagementEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Configuration info for an HTTP proxy. For a direct proxy, set the host,
 * port, and excluded_hosts fields. For a PAC script proxy, set the pac_uri
 * field.
 */
export interface ProxyInfo {
  /**
   * For a direct proxy, the hosts for which the proxy is bypassed. The host
   * names may contain wildcards such as *.example.com.
   */
  excludedHosts?: string[];
  /**
   * The host of the direct proxy.
   */
  host?: string;
  /**
   * The URI of the PAC script used to configure the proxy.
   */
  pacUri?: string;
  /**
   * The port of the direct proxy.
   */
  port?: number;
}

/**
 * The device or profile has been remotely locked via the LOCK command.
 */
export interface RemoteLockEvent {
  /**
   * Package name of the admin app requesting the change.
   */
  adminPackageName?: string;
  /**
   * User ID of the admin app from the which the change was requested.
   */
  adminUserId?: number;
  /**
   * User ID in which the change was requested in.
   */
  targetUserId?: number;
}

/**
 * The security posture of the device, as determined by the current device
 * state and the policies applied.
 */
export interface SecurityPosture {
  /**
   * Device's security posture value.
   */
  devicePosture?:  | "POSTURE_UNSPECIFIED" | "SECURE" | "AT_RISK" | "POTENTIALLY_COMPROMISED";
  /**
   * Additional details regarding the security posture of the device.
   */
  postureDetails?: PostureDetail[];
}

/**
 * An action executed during setup.
 */
export interface SetupAction {
  /**
   * Description of this action.
   */
  description?: UserFacingMessage;
  /**
   * An action to launch an app. The app will be launched with an intent
   * containing an extra with key
   * com.google.android.apps.work.clouddpc.EXTRA_LAUNCHED_AS_SETUP_ACTION set to
   * the boolean value true to indicate that this is a setup action flow. If
   * SetupAction references an app, the corresponding installType in the
   * application policy must be set as REQUIRED_FOR_SETUP or said setup will
   * fail.
   */
  launchApp?: LaunchAppAction;
  /**
   * Title of this action.
   */
  title?: UserFacingMessage;
}

/**
 * A resource containing sign in details for an enterprise.
 */
export interface SigninDetail {
  /**
   * Controls whether personal usage is allowed on a device provisioned with
   * this enrollment token.For company-owned devices: Enabling personal usage
   * allows the user to set up a work profile on the device. Disabling personal
   * usage requires the user provision the device as a fully managed device.For
   * personally-owned devices: Enabling personal usage allows the user to set up
   * a work profile on the device. Disabling personal usage will prevent the
   * device from provisioning. Personal usage cannot be disabled on
   * personally-owned device.
   */
  allowPersonalUsage?:  | "ALLOW_PERSONAL_USAGE_UNSPECIFIED" | "PERSONAL_USAGE_ALLOWED" | "PERSONAL_USAGE_DISALLOWED";
  /**
   * A JSON string whose UTF-8 representation can be used to generate a QR code
   * to enroll a device with this enrollment token. To enroll a device using
   * NFC, the NFC record must contain a serialized java.util.Properties
   * representation of the properties in the JSON. This is a read-only field
   * generated by the server.
   */
  qrCode?: string;
  /**
   * An enterprise wide enrollment token used to trigger custom sign-in flow.
   * This is a read-only field generated by the server.
   */
  signinEnrollmentToken?: string;
  /**
   * Sign-in URL for authentication when device is provisioned with a sign-in
   * enrollment token. The sign-in endpoint should finish authentication flow
   * with a URL in the form of https://enterprise.google.com/android/enroll?et=
   * for a successful login, or
   * https://enterprise.google.com/android/enroll/invalid for a failed login.
   */
  signinUrl?: string;
}

/**
 * An enterprise signup URL.
 */
export interface SignupUrl {
  /**
   * The name of the resource. Use this value in the signupUrl field when
   * calling enterprises.create to complete the enterprise signup flow.
   */
  name?: string;
  /**
   * A URL where an enterprise admin can register their enterprise. The page
   * can't be rendered in an iframe.
   */
  url?: string;
}

/**
 * Additional options for AndroidManagement#signupUrlsCreate.
 */
export interface SignupUrlsCreateOptions {
  /**
   * The callback URL that the admin will be redirected to after successfully
   * creating an enterprise. Before redirecting there the system will add a
   * query parameter to this URL named enterpriseToken which will contain an
   * opaque token to be used for the create enterprise request. The URL will be
   * parsed then reformatted in order to add the enterpriseToken parameter, so
   * there may be some minor formatting changes.
   */
  callbackUrl?: string;
  /**
   * The ID of the Google Cloud Platform project which will own the enterprise.
   */
  projectId?: string;
}

/**
 * Information about device software.
 */
export interface SoftwareInfo {
  /**
   * Android build ID string meant for displaying to the user. For example,
   * shamu-userdebug 6.0.1 MOB30I 2756745 dev-keys.
   */
  androidBuildNumber?: string;
  /**
   * Build time.
   */
  androidBuildTime?: Date;
  /**
   * The Android Device Policy app version code.
   */
  androidDevicePolicyVersionCode?: number;
  /**
   * The Android Device Policy app version as displayed to the user.
   */
  androidDevicePolicyVersionName?: string;
  /**
   * The user-visible Android version string. For example, 6.0.1.
   */
  androidVersion?: string;
  /**
   * The system bootloader version number, e.g. 0.6.7.
   */
  bootloaderVersion?: string;
  /**
   * SHA-256 hash of android.content.pm.Signature
   * (https://developer.android.com/reference/android/content/pm/Signature.html)
   * associated with the system package, which can be used to verify that the
   * system build hasn't been modified.
   */
  deviceBuildSignature?: string;
  /**
   * Kernel version, for example, 2.6.32.9-g103d848.
   */
  deviceKernelVersion?: string;
  /**
   * An IETF BCP 47 language code for the primary locale on the device.
   */
  primaryLanguageCode?: string;
  /**
   * Security patch level, e.g. 2016-05-01.
   */
  securityPatchLevel?: string;
  /**
   * Information about a potential pending system update.
   */
  systemUpdateInfo?: SystemUpdateInfo;
}

function serializeSoftwareInfo(data: any): SoftwareInfo {
  return {
    ...data,
    androidBuildTime: data["androidBuildTime"] !== undefined ? data["androidBuildTime"].toISOString() : undefined,
    systemUpdateInfo: data["systemUpdateInfo"] !== undefined ? serializeSystemUpdateInfo(data["systemUpdateInfo"]) : undefined,
  };
}

function deserializeSoftwareInfo(data: any): SoftwareInfo {
  return {
    ...data,
    androidBuildTime: data["androidBuildTime"] !== undefined ? new Date(data["androidBuildTime"]) : undefined,
    systemUpdateInfo: data["systemUpdateInfo"] !== undefined ? deserializeSystemUpdateInfo(data["systemUpdateInfo"]) : undefined,
  };
}

/**
 * Additional context for SpecificNonComplianceReason.
 */
export interface SpecificNonComplianceContext {
  /**
   * Additional context for non-compliance related to Wi-Fi configuration. See
   * ONC_WIFI_INVALID_VALUE and ONC_WIFI_API_LEVEL
   */
  oncWifiContext?: OncWifiContext;
  /**
   * Additional context for non-compliance related to password policies. See
   * PASSWORD_POLICIES_PASSWORD_EXPIRED and
   * PASSWORD_POLICIES_PASSWORD_NOT_SUFFICIENT.
   */
  passwordPoliciesContext?: PasswordPoliciesContext;
}

/**
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
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
 * Settings controlling the behavior of status reports.
 */
export interface StatusReportingSettings {
  /**
   * Application reporting settings. Only applicable if
   * application_reports_enabled is true.
   */
  applicationReportingSettings?: ApplicationReportingSettings;
  /**
   * Whether app reports are enabled.
   */
  applicationReportsEnabled?: boolean;
  /**
   * Whether Common Criteria Mode reporting is enabled.
   */
  commonCriteriaModeEnabled?: boolean;
  /**
   * Whether device settings reporting is enabled.
   */
  deviceSettingsEnabled?: boolean;
  /**
   * Whether displays reporting is enabled. Report data is not available for
   * personally owned devices with work profiles.
   */
  displayInfoEnabled?: boolean;
  /**
   * Whether hardware status reporting is enabled. Report data is not available
   * for personally owned devices with work profiles.
   */
  hardwareStatusEnabled?: boolean;
  /**
   * Whether memory event reporting is enabled.
   */
  memoryInfoEnabled?: boolean;
  /**
   * Whether network info reporting is enabled.
   */
  networkInfoEnabled?: boolean;
  /**
   * Whether power management event reporting is enabled. Report data is not
   * available for personally owned devices with work profiles.
   */
  powerManagementEventsEnabled?: boolean;
  /**
   * Whether software info reporting is enabled.
   */
  softwareInfoEnabled?: boolean;
  /**
   * Whether system properties reporting is enabled.
   */
  systemPropertiesEnabled?: boolean;
}

/**
 * Configuration for managing system updates
 */
export interface SystemUpdate {
  /**
   * If the type is WINDOWED, the end of the maintenance window, measured as
   * the number of minutes after midnight in device's local time. This value
   * must be between 0 and 1439, inclusive. If this value is less than
   * start_minutes, then the maintenance window spans midnight. If the
   * maintenance window specified is smaller than 30 minutes, the actual window
   * is extended to 30 minutes beyond the start time.
   */
  endMinutes?: number;
  /**
   * An annually repeating time period in which over-the-air (OTA) system
   * updates are postponed to freeze the OS version running on a device. To
   * prevent freezing the device indefinitely, each freeze period must be
   * separated by at least 60 days.
   */
  freezePeriods?: FreezePeriod[];
  /**
   * If the type is WINDOWED, the start of the maintenance window, measured as
   * the number of minutes after midnight in the device's local time. This value
   * must be between 0 and 1439, inclusive.
   */
  startMinutes?: number;
  /**
   * The type of system update to configure.
   */
  type?:  | "SYSTEM_UPDATE_TYPE_UNSPECIFIED" | "AUTOMATIC" | "WINDOWED" | "POSTPONE";
}

/**
 * Information about a potential pending system update.
 */
export interface SystemUpdateInfo {
  /**
   * The time when the update was first available. A zero value indicates that
   * this field is not set. This field is set only if an update is available
   * (that is, updateStatus is neither UPDATE_STATUS_UNKNOWN nor UP_TO_DATE).
   */
  updateReceivedTime?: Date;
  /**
   * The status of an update: whether an update exists and what type it is.
   */
  updateStatus?:  | "UPDATE_STATUS_UNKNOWN" | "UP_TO_DATE" | "UNKNOWN_UPDATE_AVAILABLE" | "SECURITY_UPDATE_AVAILABLE" | "OS_UPDATE_AVAILABLE";
}

function serializeSystemUpdateInfo(data: any): SystemUpdateInfo {
  return {
    ...data,
    updateReceivedTime: data["updateReceivedTime"] !== undefined ? data["updateReceivedTime"].toISOString() : undefined,
  };
}

function deserializeSystemUpdateInfo(data: any): SystemUpdateInfo {
  return {
    ...data,
    updateReceivedTime: data["updateReceivedTime"] !== undefined ? new Date(data["updateReceivedTime"]) : undefined,
  };
}

/**
 * Telephony information associated with a given SIM card on the device. Only
 * supported on fully managed devices starting from Android API level 23.
 */
export interface TelephonyInfo {
  /**
   * The carrier name associated with this SIM card.
   */
  carrierName?: string;
  /**
   * The phone number associated with this SIM card.
   */
  phoneNumber?: string;
}

/**
 * A terms and conditions page to be accepted during provisioning.
 */
export interface TermsAndConditions {
  /**
   * A well-formatted HTML string. It will be parsed on the client with
   * android.text.Html#fromHtml.
   */
  content?: UserFacingMessage;
  /**
   * A short header which appears above the HTML content.
   */
  header?: UserFacingMessage;
}

/**
 * Controls types of device activity logs collected from the device and
 * reported via Pub/Sub notification
 * (https://developers.google.com/android/management/notifications).
 */
export interface UsageLog {
  /**
   * Specifies which log types are enabled. Note that users will receive
   * on-device messaging when usage logging is enabled.
   */
  enabledLogTypes?:  | "LOG_TYPE_UNSPECIFIED" | "SECURITY_LOGS" | "NETWORK_ACTIVITY_LOGS"[];
  /**
   * Specifies which of the enabled log types can be uploaded over mobile data.
   * By default logs are queued for upload when the device connects to WiFi.
   */
  uploadOnCellularAllowed?:  | "LOG_TYPE_UNSPECIFIED" | "SECURITY_LOGS" | "NETWORK_ACTIVITY_LOGS"[];
}

/**
 * An event logged on the device.
 */
export interface UsageLogEvent {
  /**
   * A shell command was issued over ADB via “adb shell command”. Part of
   * SECURITY_LOGS.
   */
  adbShellCommandEvent?: AdbShellCommandEvent;
  /**
   * An ADB interactive shell was opened via “adb shell”. Part of
   * SECURITY_LOGS.
   */
  adbShellInteractiveEvent?: AdbShellInteractiveEvent;
  /**
   * An app process was started. Part of SECURITY_LOGS.
   */
  appProcessStartEvent?: AppProcessStartEvent;
  /**
   * A new root certificate was installed into the system's trusted credential
   * storage. Part of SECURITY_LOGS.
   */
  certAuthorityInstalledEvent?: CertAuthorityInstalledEvent;
  /**
   * A root certificate was removed from the system's trusted credential
   * storage. Part of SECURITY_LOGS.
   */
  certAuthorityRemovedEvent?: CertAuthorityRemovedEvent;
  /**
   * An X.509v3 certificate failed to validate, currently this validation is
   * performed on the Wi-FI access point and failure may be due to a mismatch
   * upon server certificate validation. However it may in the future include
   * other validation events of an X.509v3 certificate. Part of SECURITY_LOGS.
   */
  certValidationFailureEvent?: CertValidationFailureEvent;
  /**
   * A TCP connect event was initiated through the standard network stack. Part
   * of NETWORK_ACTIVITY_LOGS.
   */
  connectEvent?: ConnectEvent;
  /**
   * Validates whether Android’s built-in cryptographic library (BoringSSL) is
   * valid. Should always succeed on device boot, if it fails, the device should
   * be considered untrusted. Part of SECURITY_LOGS.
   */
  cryptoSelfTestCompletedEvent?: CryptoSelfTestCompletedEvent;
  /**
   * A DNS lookup event was initiated through the standard network stack. Part
   * of NETWORK_ACTIVITY_LOGS.
   */
  dnsEvent?: DnsEvent;
  /**
   * Unique id of the event.
   */
  eventId?: bigint;
  /**
   * Device timestamp when the event was logged.
   */
  eventTime?: Date;
  /**
   * The particular usage log event type that was reported on the device. Use
   * this to determine which event field to access.
   */
  eventType?:  | "EVENT_TYPE_UNSPECIFIED" | "ADB_SHELL_COMMAND" | "ADB_SHELL_INTERACTIVE" | "APP_PROCESS_START" | "KEYGUARD_DISMISSED" | "KEYGUARD_DISMISS_AUTH_ATTEMPT" | "KEYGUARD_SECURED" | "FILE_PULLED" | "FILE_PUSHED" | "CERT_AUTHORITY_INSTALLED" | "CERT_AUTHORITY_REMOVED" | "CERT_VALIDATION_FAILURE" | "CRYPTO_SELF_TEST_COMPLETED" | "KEY_DESTRUCTION" | "KEY_GENERATED" | "KEY_IMPORT" | "KEY_INTEGRITY_VIOLATION" | "LOGGING_STARTED" | "LOGGING_STOPPED" | "LOG_BUFFER_SIZE_CRITICAL" | "MEDIA_MOUNT" | "MEDIA_UNMOUNT" | "OS_SHUTDOWN" | "OS_STARTUP" | "REMOTE_LOCK" | "WIPE_FAILURE" | "CONNECT" | "DNS";
  /**
   * A file was downloaded from the device. Part of SECURITY_LOGS.
   */
  filePulledEvent?: FilePulledEvent;
  /**
   * A file was uploaded onto the device. Part of SECURITY_LOGS.
   */
  filePushedEvent?: FilePushedEvent;
  /**
   * A cryptographic key including user installed, admin installed and system
   * maintained private key is removed from the device either by the user or
   * management. Part of SECURITY_LOGS.
   */
  keyDestructionEvent?: KeyDestructionEvent;
  /**
   * A cryptographic key including user installed, admin installed and system
   * maintained private key is installed on the device either by the user or
   * management. Part of SECURITY_LOGS.
   */
  keyGeneratedEvent?: KeyGeneratedEvent;
  /**
   * An attempt was made to unlock the device. Part of SECURITY_LOGS.
   */
  keyguardDismissAuthAttemptEvent?: KeyguardDismissAuthAttemptEvent;
  /**
   * The keyguard was dismissed. Part of SECURITY_LOGS.
   */
  keyguardDismissedEvent?: KeyguardDismissedEvent;
  /**
   * The device was locked either by user or timeout. Part of SECURITY_LOGS.
   */
  keyguardSecuredEvent?: KeyguardSecuredEvent;
  /**
   * A cryptographic key including user installed, admin installed and system
   * maintained private key is imported on the device either by the user or
   * management. Part of SECURITY_LOGS.
   */
  keyImportEvent?: KeyImportEvent;
  /**
   * A cryptographic key including user installed, admin installed and system
   * maintained private key is determined to be corrupted due to storage
   * corruption, hardware failure or some OS issue. Part of SECURITY_LOGS.
   */
  keyIntegrityViolationEvent?: KeyIntegrityViolationEvent;
  /**
   * The audit log buffer has reached 90% of its capacity, therefore older
   * events may be dropped. Part of SECURITY_LOGS.
   */
  logBufferSizeCriticalEvent?: LogBufferSizeCriticalEvent;
  /**
   * usageLog policy has been enabled. Part of SECURITY_LOGS.
   */
  loggingStartedEvent?: LoggingStartedEvent;
  /**
   * usageLog policy has been disabled. Part of SECURITY_LOGS.
   */
  loggingStoppedEvent?: LoggingStoppedEvent;
  /**
   * Removable media was mounted. Part of SECURITY_LOGS.
   */
  mediaMountEvent?: MediaMountEvent;
  /**
   * Removable media was unmounted. Part of SECURITY_LOGS.
   */
  mediaUnmountEvent?: MediaUnmountEvent;
  /**
   * Device was shutdown. Part of SECURITY_LOGS.
   */
  osShutdownEvent?: OsShutdownEvent;
  /**
   * Device was started. Part of SECURITY_LOGS.
   */
  osStartupEvent?: OsStartupEvent;
  /**
   * The device or profile has been remotely locked via the LOCK command. Part
   * of SECURITY_LOGS.
   */
  remoteLockEvent?: RemoteLockEvent;
  /**
   * The work profile or company-owned device failed to wipe when requested.
   * This could be user initiated or admin initiated e.g. delete was received.
   * Part of SECURITY_LOGS.
   */
  wipeFailureEvent?: WipeFailureEvent;
}

function serializeUsageLogEvent(data: any): UsageLogEvent {
  return {
    ...data,
    appProcessStartEvent: data["appProcessStartEvent"] !== undefined ? serializeAppProcessStartEvent(data["appProcessStartEvent"]) : undefined,
    dnsEvent: data["dnsEvent"] !== undefined ? serializeDnsEvent(data["dnsEvent"]) : undefined,
    eventId: data["eventId"] !== undefined ? String(data["eventId"]) : undefined,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeUsageLogEvent(data: any): UsageLogEvent {
  return {
    ...data,
    appProcessStartEvent: data["appProcessStartEvent"] !== undefined ? deserializeAppProcessStartEvent(data["appProcessStartEvent"]) : undefined,
    dnsEvent: data["dnsEvent"] !== undefined ? deserializeDnsEvent(data["dnsEvent"]) : undefined,
    eventId: data["eventId"] !== undefined ? BigInt(data["eventId"]) : undefined,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * A user belonging to an enterprise.
 */
export interface User {
  /**
   * A unique identifier you create for this user, such as user342 or
   * asset#44418. This field must be set when the user is created and can't be
   * updated. This field must not contain personally identifiable information
   * (PII). This identifier must be 1024 characters or less; otherwise, the
   * update policy request will fail.
   */
  accountIdentifier?: string;
}

/**
 * Provides a user-facing message with locale info. The maximum message length
 * is 4096 characters.
 */
export interface UserFacingMessage {
  /**
   * The default message displayed if no localized message is specified or the
   * user's locale doesn't match with any of the localized messages. A default
   * message must be provided if any localized messages are provided.
   */
  defaultMessage?: string;
  /**
   * A map containing pairs, where locale is a well-formed BCP 47 language
   * (https://www.w3.org/International/articles/language-tags/) code, such as
   * en-US, es-ES, or fr.
   */
  localizedMessages?: {
    [key: string]: string
  };
}

/**
 * A web app.
 */
export interface WebApp {
  /**
   * The display mode of the web app.
   */
  displayMode?:  | "DISPLAY_MODE_UNSPECIFIED" | "MINIMAL_UI" | "STANDALONE" | "FULL_SCREEN";
  /**
   * A list of icons for the web app. Must have at least one element.
   */
  icons?: WebAppIcon[];
  /**
   * The name of the web app, which is generated by the server during creation
   * in the form enterprises/{enterpriseId}/webApps/{packageName}.
   */
  name?: string;
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
   * The current version of the app.Note that the version can automatically
   * increase during the lifetime of the web app, while Google does internal
   * housekeeping to keep the web app up-to-date.
   */
  versionCode?: bigint;
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
 * An icon for a web app. Supported formats are: png, jpg and webp.
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

/**
 * A web token used to access the managed Google Play iframe.
 */
export interface WebToken {
  /**
   * The features to enable. Use this if you want to control exactly which
   * feature(s) will be activated; leave empty to allow all
   * features.Restrictions / things to note: - If no features are listed here,
   * all features are enabled — this is the default behavior where you give
   * access to all features to your admins. - This must not contain any
   * FEATURE_UNSPECIFIED values. - Repeated values are ignored
   */
  enabledFeatures?:  | "FEATURE_UNSPECIFIED" | "PLAY_SEARCH" | "PRIVATE_APPS" | "WEB_APPS" | "STORE_BUILDER" | "MANAGED_CONFIGURATIONS" | "ZERO_TOUCH_CUSTOMER_MANAGEMENT"[];
  /**
   * The name of the web token, which is generated by the server during
   * creation in the form enterprises/{enterpriseId}/webTokens/{webTokenId}.
   */
  name?: string;
  /**
   * The URL of the parent frame hosting the iframe with the embedded UI. To
   * prevent XSS, the iframe may not be hosted at other URLs. The URL must use
   * the https scheme.
   */
  parentFrameUrl?: string;
  /**
   * Permissions available to an admin in the embedded UI. An admin must have
   * all of these permissions in order to view the UI. This field is deprecated.
   */
  permissions?:  | "WEB_TOKEN_PERMISSION_UNSPECIFIED" | "APPROVE_APPS"[];
  /**
   * The token value which is used in the hosting page to generate the iframe
   * with the embedded UI. This is a read-only field generated by the server.
   */
  value?: string;
}

/**
 * An action to reset a company owned device or delete a work profile. Note:
 * blockAction must also be specified.
 */
export interface WipeAction {
  /**
   * Whether the factory-reset protection data is preserved on the device. This
   * setting doesn’t apply to work profiles.
   */
  preserveFrp?: boolean;
  /**
   * Number of days the policy is non-compliant before the device or work
   * profile is wiped. wipeAfterDays must be greater than blockAfterDays.
   */
  wipeAfterDays?: number;
}

/**
 * The work profile or company-owned device failed to wipe when requested. This
 * could be user initiated or admin initiated e.g. delete was received.
 * Intentionally empty.
 */
export interface WipeFailureEvent {
}