// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Chrome Management API Client for Deno
 * =====================================
 * 
 * The Chrome Management API is a suite of services that allows Chrome administrators to view, manage and gain insights on their Chrome OS and Chrome Browser devices.
 * 
 * Docs: http://developers.google.com/chrome/management/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Chrome Management API is a suite of services that allows Chrome
 * administrators to view, manage and gain insights on their Chrome OS and
 * Chrome Browser devices.
 */
export class ChromeManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://chromemanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Get a specific app for a customer by its resource name.
   *
   * @param name Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version.
   */
  async customersAppsAndroidGet(name: string): Promise<GoogleChromeManagementV1AppDetails> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromeManagementV1AppDetails;
  }

  /**
   * Get a specific app for a customer by its resource name.
   *
   * @param name Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version.
   */
  async customersAppsChromeGet(name: string): Promise<GoogleChromeManagementV1AppDetails> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromeManagementV1AppDetails;
  }

  /**
   * Generate summary of app installation requests.
   *
   * @param customer Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersAppsCountChromeAppRequests(customer: string, opts: CustomersAppsCountChromeAppRequestsOptions = {}): Promise<GoogleChromeManagementV1CountChromeAppRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/apps:countChromeAppRequests`);
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
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
    return data as GoogleChromeManagementV1CountChromeAppRequestsResponse;
  }

  /**
   * Get a specific app for a customer by its resource name.
   *
   * @param name Required. The app for which details are being queried. Examples: "customers/my_customer/apps/chrome/gmbmikajjgmnabiglmofipeabaddhgne@2.1.2" for the Save to Google Drive Chrome extension version 2.1.2, "customers/my_customer/apps/android/com.google.android.apps.docs" for the Google Drive Android app's latest version.
   */
  async customersAppsWebGet(name: string): Promise<GoogleChromeManagementV1AppDetails> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromeManagementV1AppDetails;
  }

  /**
   * Count of Chrome Browsers that have been recently enrolled, have new policy
   * to be synced, or have no recent activity.
   *
   * @param customer Required. The customer ID or "my_customer" prefixed with "customers/".
   */
  async customersReportsCountChromeBrowsersNeedingAttention(customer: string, opts: CustomersReportsCountChromeBrowsersNeedingAttentionOptions = {}): Promise<GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countChromeBrowsersNeedingAttention`);
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse(data);
  }

  /**
   * Generate report of the number of devices expiring in each month of the
   * selected time frame. Devices are grouped by auto update expiration date and
   * model. Further information can be found
   * [here](https://support.google.com/chrome/a/answer/10564947).
   *
   * @param customer Required. The customer ID or "my_customer" prefixed with "customers/".
   */
  async customersReportsCountChromeDevicesReachingAutoExpirationDate(customer: string, opts: CustomersReportsCountChromeDevicesReachingAutoExpirationDateOptions = {}): Promise<GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countChromeDevicesReachingAutoExpirationDate`);
    if (opts.maxAueDate !== undefined) {
      url.searchParams.append("maxAueDate", String(opts.maxAueDate));
    }
    if (opts.minAueDate !== undefined) {
      url.searchParams.append("minAueDate", String(opts.minAueDate));
    }
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse(data);
  }

  /**
   * Counts of ChromeOS devices that have not synced policies or have lacked
   * user activity in the past 28 days, are out of date, or are not complaint.
   * Further information can be found here
   * https://support.google.com/chrome/a/answer/10564947
   *
   * @param customer Required. The customer ID or "my_customer" prefixed with "customers/".
   */
  async customersReportsCountChromeDevicesThatNeedAttention(customer: string, opts: CustomersReportsCountChromeDevicesThatNeedAttentionOptions = {}): Promise<GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse> {
    opts = serializeCustomersReportsCountChromeDevicesThatNeedAttentionOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countChromeDevicesThatNeedAttention`);
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse(data);
  }

  /**
   * Counts of devices with a specific hardware specification from the
   * requested hardware type (for example model name, processor type). Further
   * information can be found here
   * https://support.google.com/chrome/a/answer/10564947
   *
   * @param customer Required. The customer ID or "my_customer".
   */
  async customersReportsCountChromeHardwareFleetDevices(customer: string, opts: CustomersReportsCountChromeHardwareFleetDevicesOptions = {}): Promise<GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse> {
    opts = serializeCustomersReportsCountChromeHardwareFleetDevicesOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countChromeHardwareFleetDevices`);
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse(data);
  }

  /**
   * Generate report of installed Chrome versions.
   *
   * @param customer Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersReportsCountChromeVersions(customer: string, opts: CustomersReportsCountChromeVersionsOptions = {}): Promise<GoogleChromeManagementV1CountChromeVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countChromeVersions`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
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
    return data as GoogleChromeManagementV1CountChromeVersionsResponse;
  }

  /**
   * Generate report of app installations.
   *
   * @param customer Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersReportsCountInstalledApps(customer: string, opts: CustomersReportsCountInstalledAppsOptions = {}): Promise<GoogleChromeManagementV1CountInstalledAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countInstalledApps`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
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
    return data as GoogleChromeManagementV1CountInstalledAppsResponse;
  }

  /**
   * Get a summary of printing done by each printer.
   *
   * @param customer Required. Customer ID prefixed with "customers/" or "customers/my_customer" to use the customer associated to the account making the request.
   */
  async customersReportsCountPrintJobsByPrinter(customer: string, opts: CustomersReportsCountPrintJobsByPrinterOptions = {}): Promise<GoogleChromeManagementV1CountPrintJobsByPrinterResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countPrintJobsByPrinter`);
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
    if (opts.printerOrgUnitId !== undefined) {
      url.searchParams.append("printerOrgUnitId", String(opts.printerOrgUnitId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountPrintJobsByPrinterResponse(data);
  }

  /**
   * Get a summary of printing done by each user.
   *
   * @param customer Required. Customer ID prefixed with "customers/" or "customers/my_customer" to use the customer associated to the account making the request.
   */
  async customersReportsCountPrintJobsByUser(customer: string, opts: CustomersReportsCountPrintJobsByUserOptions = {}): Promise<GoogleChromeManagementV1CountPrintJobsByUserResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:countPrintJobsByUser`);
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
    if (opts.printerOrgUnitId !== undefined) {
      url.searchParams.append("printerOrgUnitId", String(opts.printerOrgUnitId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleChromeManagementV1CountPrintJobsByUserResponse(data);
  }

  /**
   * Generate report of devices that have a specified app installed.
   *
   * @param customer Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersReportsFindInstalledAppDevices(customer: string, opts: CustomersReportsFindInstalledAppDevicesOptions = {}): Promise<GoogleChromeManagementV1FindInstalledAppDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/reports:findInstalledAppDevices`);
    if (opts.appId !== undefined) {
      url.searchParams.append("appId", String(opts.appId));
    }
    if (opts.appType !== undefined) {
      url.searchParams.append("appType", String(opts.appType));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.orgUnitId !== undefined) {
      url.searchParams.append("orgUnitId", String(opts.orgUnitId));
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
    return data as GoogleChromeManagementV1FindInstalledAppDevicesResponse;
  }

  /**
   * Get telemetry device.
   *
   * @param name Required. Name of the `TelemetryDevice` to return.
   */
  async customersTelemetryDevicesGet(name: string, opts: CustomersTelemetryDevicesGetOptions = {}): Promise<GoogleChromeManagementV1TelemetryDevice> {
    opts = serializeCustomersTelemetryDevicesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromeManagementV1TelemetryDevice;
  }

  /**
   * List all telemetry devices.
   *
   * @param parent Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersTelemetryDevicesList(parent: string, opts: CustomersTelemetryDevicesListOptions = {}): Promise<GoogleChromeManagementV1ListTelemetryDevicesResponse> {
    opts = serializeCustomersTelemetryDevicesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/telemetry/devices`);
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
    return data as GoogleChromeManagementV1ListTelemetryDevicesResponse;
  }

  /**
   * List telemetry events.
   *
   * @param parent Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersTelemetryEventsList(parent: string, opts: CustomersTelemetryEventsListOptions = {}): Promise<GoogleChromeManagementV1ListTelemetryEventsResponse> {
    opts = serializeCustomersTelemetryEventsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/telemetry/events`);
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
    return deserializeGoogleChromeManagementV1ListTelemetryEventsResponse(data);
  }

  /**
   * Get telemetry user.
   *
   * @param name Required. Name of the `TelemetryUser` to return.
   */
  async customersTelemetryUsersGet(name: string, opts: CustomersTelemetryUsersGetOptions = {}): Promise<GoogleChromeManagementV1TelemetryUser> {
    opts = serializeCustomersTelemetryUsersGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromeManagementV1TelemetryUser;
  }

  /**
   * List all telemetry users.
   *
   * @param parent Required. Customer id or "my_customer" to use the customer associated to the account making the request.
   */
  async customersTelemetryUsersList(parent: string, opts: CustomersTelemetryUsersListOptions = {}): Promise<GoogleChromeManagementV1ListTelemetryUsersResponse> {
    opts = serializeCustomersTelemetryUsersListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/telemetry/users`);
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
    return data as GoogleChromeManagementV1ListTelemetryUsersResponse;
  }
}

/**
 * Additional options for ChromeManagement#customersAppsCountChromeAppRequests.
 */
export interface CustomersAppsCountChromeAppRequestsOptions {
  /**
   * Field used to order results. Supported fields: * request_count *
   * latest_request_time
   */
  orderBy?: string;
  /**
   * The ID of the organizational unit.
   */
  orgUnitId?: string;
  /**
   * Maximum number of results to return. Maximum and default are 50, anything
   * above will be coerced to 50.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the request to be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountChromeBrowsersNeedingAttention.
 */
export interface CustomersReportsCountChromeBrowsersNeedingAttentionOptions {
  /**
   * Optional. The ID of the organizational unit. If omitted, all data will be
   * returned.
   */
  orgUnitId?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountChromeDevicesReachingAutoExpirationDate.
 */
export interface CustomersReportsCountChromeDevicesReachingAutoExpirationDateOptions {
  /**
   * Optional. Maximum expiration date in format yyyy-mm-dd in UTC timezone. If
   * included returns all devices that have already expired and devices with
   * auto expiration date equal to or earlier than the maximum date.
   */
  maxAueDate?: string;
  /**
   * Optional. Maximum expiration date in format yyyy-mm-dd in UTC timezone. If
   * included returns all devices that have already expired and devices with
   * auto expiration date equal to or later than the minimum date.
   */
  minAueDate?: string;
  /**
   * Optional. The organizational unit ID, if omitted, will return data for all
   * organizational units.
   */
  orgUnitId?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountChromeDevicesThatNeedAttention.
 */
export interface CustomersReportsCountChromeDevicesThatNeedAttentionOptions {
  /**
   * Optional. The ID of the organizational unit. If omitted, all data will be
   * returned.
   */
  orgUnitId?: string;
  /**
   * Required. Mask of the fields that should be populated in the returned
   * report.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersReportsCountChromeDevicesThatNeedAttentionOptions(data: any): CustomersReportsCountChromeDevicesThatNeedAttentionOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersReportsCountChromeDevicesThatNeedAttentionOptions(data: any): CustomersReportsCountChromeDevicesThatNeedAttentionOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountChromeHardwareFleetDevices.
 */
export interface CustomersReportsCountChromeHardwareFleetDevicesOptions {
  /**
   * Optional. The ID of the organizational unit. If omitted, all data will be
   * returned.
   */
  orgUnitId?: string;
  /**
   * Required. Mask of the fields that should be populated in the returned
   * report.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersReportsCountChromeHardwareFleetDevicesOptions(data: any): CustomersReportsCountChromeHardwareFleetDevicesOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersReportsCountChromeHardwareFleetDevicesOptions(data: any): CustomersReportsCountChromeHardwareFleetDevicesOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for ChromeManagement#customersReportsCountChromeVersions.
 */
export interface CustomersReportsCountChromeVersionsOptions {
  /**
   * Query string to filter results, AND-separated fields in EBNF syntax. Note:
   * OR operations are not supported in this filter. Supported filter fields: *
   * last_active_date
   */
  filter?: string;
  /**
   * The ID of the organizational unit.
   */
  orgUnitId?: string;
  /**
   * Maximum number of results to return. Maximum and default are 100.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the request to be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for ChromeManagement#customersReportsCountInstalledApps.
 */
export interface CustomersReportsCountInstalledAppsOptions {
  /**
   * Query string to filter results, AND-separated fields in EBNF syntax. Note:
   * OR operations are not supported in this filter. Supported filter fields: *
   * app_name * app_type * install_type * number_of_permissions *
   * total_install_count * latest_profile_active_date * permission_name * app_id
   */
  filter?: string;
  /**
   * Field used to order results. Supported order by fields: * app_name *
   * app_type * install_type * number_of_permissions * total_install_count *
   * app_id
   */
  orderBy?: string;
  /**
   * The ID of the organizational unit.
   */
  orgUnitId?: string;
  /**
   * Maximum number of results to return. Maximum and default are 100.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the request to be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountPrintJobsByPrinter.
 */
export interface CustomersReportsCountPrintJobsByPrinterOptions {
  /**
   * Query string to filter results, AND-separated fields in EBNF syntax. Note:
   * OR operations are not supported in this filter. Note: Only >= and <=
   * comparators are supported in this filter. Supported filter fields: *
   * completion_time
   */
  filter?: string;
  /**
   * Field used to order results. If omitted, results will be ordered in
   * ascending order of the 'printer' field. Supported order_by fields: *
   * printer * job_count * device_count * user_count
   */
  orderBy?: string;
  /**
   * Maximum number of results to return. Maximum and default are 100.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the response to be returned.
   */
  pageToken?: string;
  /**
   * The ID of the organizational unit for printers. If specified, only data
   * for printers from the specified organizational unit will be returned. If
   * omitted, data for printers from all organizational units will be returned.
   */
  printerOrgUnitId?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsCountPrintJobsByUser.
 */
export interface CustomersReportsCountPrintJobsByUserOptions {
  /**
   * Query string to filter results, AND-separated fields in EBNF syntax. Note:
   * OR operations are not supported in this filter. Note: Only >= and <=
   * comparators are supported in this filter. Supported filter fields: *
   * completion_time
   */
  filter?: string;
  /**
   * Field used to order results. If omitted, results will be ordered in
   * ascending order of the 'user_email' field. Supported order_by fields: *
   * user_email * job_count * printer_count * device_count
   */
  orderBy?: string;
  /**
   * Maximum number of results to return. Maximum and default are 100.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the response to be returned.
   */
  pageToken?: string;
  /**
   * The ID of the organizational unit for printers. If specified, only print
   * jobs initiated with printers from the specified organizational unit will be
   * counted. If omitted, all print jobs will be counted.
   */
  printerOrgUnitId?: string;
}

/**
 * Additional options for
 * ChromeManagement#customersReportsFindInstalledAppDevices.
 */
export interface CustomersReportsFindInstalledAppDevicesOptions {
  /**
   * Unique identifier of the app. For Chrome apps and extensions, the
   * 32-character id (e.g. ehoadneljpdggcbbknedodolkkjodefl). For Android apps,
   * the package name (e.g. com.evernote).
   */
  appId?: string;
  /**
   * Type of the app.
   */
  appType?:  | "APP_TYPE_UNSPECIFIED" | "EXTENSION" | "APP" | "THEME" | "HOSTED_APP" | "ANDROID_APP";
  /**
   * Query string to filter results, AND-separated fields in EBNF syntax. Note:
   * OR operations are not supported in this filter. Supported filter fields: *
   * last_active_date
   */
  filter?: string;
  /**
   * Field used to order results. Supported order by fields: * machine *
   * device_id
   */
  orderBy?: string;
  /**
   * The ID of the organizational unit.
   */
  orgUnitId?: string;
  /**
   * Maximum number of results to return. Maximum and default are 100.
   */
  pageSize?: number;
  /**
   * Token to specify the page of the request to be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for ChromeManagement#customersTelemetryDevicesGet.
 */
export interface CustomersTelemetryDevicesGetOptions {
  /**
   * Required. Read mask to specify which fields to return.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersTelemetryDevicesGetOptions(data: any): CustomersTelemetryDevicesGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersTelemetryDevicesGetOptions(data: any): CustomersTelemetryDevicesGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for ChromeManagement#customersTelemetryDevicesList.
 */
export interface CustomersTelemetryDevicesListOptions {
  /**
   * Optional. Only include resources that match the filter. Supported filter
   * fields: - org_unit_id - serial_number - device_id
   */
  filter?: string;
  /**
   * Maximum number of results to return. Default value is 100. Maximum value
   * is 1000.
   */
  pageSize?: number;
  /**
   * Token to specify next page in the list.
   */
  pageToken?: string;
  /**
   * Required. Read mask to specify which fields to return.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersTelemetryDevicesListOptions(data: any): CustomersTelemetryDevicesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersTelemetryDevicesListOptions(data: any): CustomersTelemetryDevicesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for ChromeManagement#customersTelemetryEventsList.
 */
export interface CustomersTelemetryEventsListOptions {
  /**
   * Optional. Only include resources that match the filter. Supported filter
   * fields: - device_id - user_id - device_org_unit_id - user_org_unit_id -
   * timestamp - event_type The "timestamp" filter accepts either Epoch
   * milliseconds or RFC 3339 formatted time surrounded by simple double quotes.
   */
  filter?: string;
  /**
   * Optional. Maximum number of results to return. Default value is 100.
   * Maximum value is 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to specify next page in the list.
   */
  pageToken?: string;
  /**
   * Required. Read mask to specify which fields to return.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersTelemetryEventsListOptions(data: any): CustomersTelemetryEventsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersTelemetryEventsListOptions(data: any): CustomersTelemetryEventsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for ChromeManagement#customersTelemetryUsersGet.
 */
export interface CustomersTelemetryUsersGetOptions {
  /**
   * Read mask to specify which fields to return.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersTelemetryUsersGetOptions(data: any): CustomersTelemetryUsersGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersTelemetryUsersGetOptions(data: any): CustomersTelemetryUsersGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for ChromeManagement#customersTelemetryUsersList.
 */
export interface CustomersTelemetryUsersListOptions {
  /**
   * Only include resources that match the filter. Supported filter fields: -
   * user_id - user_org_unit_id
   */
  filter?: string;
  /**
   * Maximum number of results to return. Default value is 100. Maximum value
   * is 1000.
   */
  pageSize?: number;
  /**
   * Token to specify next page in the list.
   */
  pageToken?: string;
  /**
   * Read mask to specify which fields to return.
   */
  readMask?: string /* FieldMask */;
}

function serializeCustomersTelemetryUsersListOptions(data: any): CustomersTelemetryUsersListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCustomersTelemetryUsersListOptions(data: any): CustomersTelemetryUsersListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Android app information.
 */
export interface GoogleChromeManagementV1AndroidAppInfo {
  /**
   * Output only. Permissions requested by an Android app.
   */
  readonly permissions?: GoogleChromeManagementV1AndroidAppPermission[];
}

/**
 * Permission requested by an Android app.
 */
export interface GoogleChromeManagementV1AndroidAppPermission {
  /**
   * Output only. The type of the permission.
   */
  readonly type?: string;
}

/**
 * Resource representing app details.
 */
export interface GoogleChromeManagementV1AppDetails {
  /**
   * Output only. Android app information.
   */
  readonly androidAppInfo?: GoogleChromeManagementV1AndroidAppInfo;
  /**
   * Output only. Unique store identifier for the item. Examples:
   * "gmbmikajjgmnabiglmofipeabaddhgne" for the Save to Google Drive Chrome
   * extension, "com.google.android.apps.docs" for the Google Drive Android app.
   */
  readonly appId?: string;
  /**
   * Output only. Chrome Web Store app information.
   */
  readonly chromeAppInfo?: GoogleChromeManagementV1ChromeAppInfo;
  /**
   * Output only. App's description.
   */
  readonly description?: string;
  /**
   * Output only. The uri for the detail page of the item.
   */
  readonly detailUri?: string;
  /**
   * Output only. App's display name.
   */
  readonly displayName?: string;
  /**
   * Output only. First published time.
   */
  readonly firstPublishTime?: Date;
  /**
   * Output only. Home page or Website uri.
   */
  readonly homepageUri?: string;
  /**
   * Output only. A link to an image that can be used as an icon for the
   * product.
   */
  readonly iconUri?: string;
  /**
   * Output only. Indicates if the app has to be paid for OR has paid content.
   */
  readonly isPaidApp?: boolean;
  /**
   * Output only. Latest published time.
   */
  readonly latestPublishTime?: Date;
  /**
   * Output only. Format:
   * name=customers/{customer_id}/apps/{chrome|android|web}/{app_id}@{version}
   */
  readonly name?: string;
  /**
   * Output only. The URI pointing to the privacy policy of the app, if it was
   * provided by the developer. Version-specific field that will only be set
   * when the requested app version is found.
   */
  readonly privacyPolicyUri?: string;
  /**
   * Output only. The publisher of the item.
   */
  readonly publisher?: string;
  /**
   * Output only. Number of reviews received. Chrome Web Store review
   * information will always be for the latest version of an app.
   */
  readonly reviewNumber?: bigint;
  /**
   * Output only. The rating of the app (on 5 stars). Chrome Web Store review
   * information will always be for the latest version of an app.
   */
  readonly reviewRating?: number;
  /**
   * Output only. App version. A new revision is committed whenever a new
   * version of the app is published.
   */
  readonly revisionId?: string;
  /**
   * Output only. Information about a partial service error if applicable.
   */
  readonly serviceError?: GoogleRpcStatus;
  /**
   * Output only. App type.
   */
  readonly type?:  | "APP_ITEM_TYPE_UNSPECIFIED" | "CHROME" | "ANDROID" | "WEB";
}

/**
 * Status data for storage. * This field is telemetry information and this will
 * change over time as the device is utilized. * Data for this field is
 * controlled via policy:
 * [ReportDeviceAudioStatus](https://chromeenterprise.google/policies/#ReportDeviceAudioStatus)
 * * Data Collection Frequency: 10 minutes * Default Data Reporting Frequency: 3
 * hours - Policy Controlled: Yes * Cache: If the device is offline, the
 * collected data is stored locally, and will be reported when the device is
 * next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1AudioStatusReport {
  /**
   * Output only. Active input device's name.
   */
  readonly inputDevice?: string;
  /**
   * Output only. Active input device's gain in [0, 100].
   */
  readonly inputGain?: number;
  /**
   * Output only. Is active input device mute or not.
   */
  readonly inputMute?: boolean;
  /**
   * Output only. Active output device's name.
   */
  readonly outputDevice?: string;
  /**
   * Output only. Is active output device mute or not.
   */
  readonly outputMute?: boolean;
  /**
   * Output only. Active output device's volume in [0, 100].
   */
  readonly outputVolume?: number;
  /**
   * Output only. Timestamp of when the sample was collected on device.
   */
  readonly reportTime?: Date;
}

/**
 * Information about the battery. * This field provides device information,
 * which is static and will not change over time. * Data for this field is
 * controlled via policy:
 * [ReportDevicePowerStatus](https://chromeenterprise.google/policies/#ReportDevicePowerStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1BatteryInfo {
  /**
   * Output only. Design capacity (mAmpere-hours).
   */
  readonly designCapacity?: bigint;
  /**
   * Output only. Designed minimum output voltage (mV)
   */
  readonly designMinVoltage?: number;
  /**
   * Output only. The date the battery was manufactured.
   */
  readonly manufactureDate?: GoogleTypeDate;
  /**
   * Output only. Battery manufacturer.
   */
  readonly manufacturer?: string;
  /**
   * Output only. Battery serial number.
   */
  readonly serialNumber?: string;
  /**
   * Output only. Technology of the battery. Example: Li-ion
   */
  readonly technology?: string;
}

/**
 * Sampling data for battery. * This field is telemetry information and this
 * will change over time as the device is utilized. * Data for this field is
 * controlled via policy:
 * [ReportDevicePowerStatus](https://chromeenterprise.google/policies/#ReportDevicePowerStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1BatterySampleReport {
  /**
   * Output only. Battery charge percentage.
   */
  readonly chargeRate?: number;
  /**
   * Output only. Battery current (mA).
   */
  readonly current?: bigint;
  /**
   * Output only. The battery discharge rate measured in mW. Positive if the
   * battery is being discharged, negative if it's being charged.
   */
  readonly dischargeRate?: number;
  /**
   * Output only. Battery remaining capacity (mAmpere-hours).
   */
  readonly remainingCapacity?: bigint;
  /**
   * Output only. Timestamp of when the sample was collected on device
   */
  readonly reportTime?: Date;
  /**
   * Output only. Battery status read from sysfs. Example: Discharging
   */
  readonly status?: string;
  /**
   * Output only. Temperature in Celsius degrees.
   */
  readonly temperature?: number;
  /**
   * Output only. Battery voltage (millivolt).
   */
  readonly voltage?: bigint;
}

/**
 * Status data for battery. * This field is telemetry information and this will
 * change over time as the device is utilized. * Data for this field is
 * controlled via policy:
 * [ReportDevicePowerStatus](https://chromeenterprise.google/policies/#ReportDevicePowerStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1BatteryStatusReport {
  /**
   * Output only. Battery health.
   */
  readonly batteryHealth?:  | "BATTERY_HEALTH_UNSPECIFIED" | "BATTERY_HEALTH_NORMAL" | "BATTERY_REPLACE_SOON" | "BATTERY_REPLACE_NOW";
  /**
   * Output only. Cycle count.
   */
  readonly cycleCount?: number;
  /**
   * Output only. Full charge capacity (mAmpere-hours).
   */
  readonly fullChargeCapacity?: bigint;
  /**
   * Output only. Timestamp of when the sample was collected on device
   */
  readonly reportTime?: Date;
  /**
   * Output only. Sampling data for the battery sorted in a decreasing order of
   * report_time.
   */
  readonly sample?: GoogleChromeManagementV1BatterySampleReport[];
  /**
   * Output only. Battery serial number.
   */
  readonly serialNumber?: string;
}

/**
 * Boot performance report of a device. * This field is telemetry information
 * and this will change over time as the device is utilized. * Data for this
 * field is controlled via policy:
 * [ReportDeviceBootMode](https://chromeenterprise.google/policies/#ReportDeviceBootMode)
 * * Data Collection Frequency: On every boot up event * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: Yes * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1BootPerformanceReport {
  /**
   * Total time to boot up.
   */
  bootUpDuration?: number /* Duration */;
  /**
   * The timestamp when power came on.
   */
  bootUpTime?: Date;
  /**
   * Timestamp when the report was collected.
   */
  reportTime?: Date;
  /**
   * Total time since shutdown start to power off.
   */
  shutdownDuration?: number /* Duration */;
  /**
   * The shutdown reason.
   */
  shutdownReason?:  | "SHUTDOWN_REASON_UNSPECIFIED" | "USER_REQUEST" | "SYSTEM_UPDATE" | "LOW_BATTERY" | "OTHER";
  /**
   * The timestamp when shutdown.
   */
  shutdownTime?: Date;
}

function serializeGoogleChromeManagementV1BootPerformanceReport(data: any): GoogleChromeManagementV1BootPerformanceReport {
  return {
    ...data,
    bootUpDuration: data["bootUpDuration"] !== undefined ? data["bootUpDuration"] : undefined,
    bootUpTime: data["bootUpTime"] !== undefined ? data["bootUpTime"].toISOString() : undefined,
    reportTime: data["reportTime"] !== undefined ? data["reportTime"].toISOString() : undefined,
    shutdownDuration: data["shutdownDuration"] !== undefined ? data["shutdownDuration"] : undefined,
    shutdownTime: data["shutdownTime"] !== undefined ? data["shutdownTime"].toISOString() : undefined,
  };
}

function deserializeGoogleChromeManagementV1BootPerformanceReport(data: any): GoogleChromeManagementV1BootPerformanceReport {
  return {
    ...data,
    bootUpDuration: data["bootUpDuration"] !== undefined ? data["bootUpDuration"] : undefined,
    bootUpTime: data["bootUpTime"] !== undefined ? new Date(data["bootUpTime"]) : undefined,
    reportTime: data["reportTime"] !== undefined ? new Date(data["reportTime"]) : undefined,
    shutdownDuration: data["shutdownDuration"] !== undefined ? data["shutdownDuration"] : undefined,
    shutdownTime: data["shutdownTime"] !== undefined ? new Date(data["shutdownTime"]) : undefined,
  };
}

/**
 * Describes a browser version and its install count.
 */
export interface GoogleChromeManagementV1BrowserVersion {
  /**
   * Output only. The release channel of the installed browser.
   */
  readonly channel?:  | "RELEASE_CHANNEL_UNSPECIFIED" | "CANARY" | "DEV" | "BETA" | "STABLE";
  /**
   * Output only. Count grouped by device_system and major version
   */
  readonly count?: bigint;
  /**
   * Output only. Version of the system-specified operating system.
   */
  readonly deviceOsVersion?: string;
  /**
   * Output only. The device operating system.
   */
  readonly system?:  | "DEVICE_SYSTEM_UNSPECIFIED" | "SYSTEM_OTHER" | "SYSTEM_ANDROID" | "SYSTEM_IOS" | "SYSTEM_CROS" | "SYSTEM_WINDOWS" | "SYSTEM_MAC" | "SYSTEM_LINUX";
  /**
   * Output only. The full version of the installed browser.
   */
  readonly version?: string;
}

/**
 * Chrome Web Store app information.
 */
export interface GoogleChromeManagementV1ChromeAppInfo {
  /**
   * Output only. Whether the app or extension is built and maintained by
   * Google. Version-specific field that will only be set when the requested app
   * version is found.
   */
  readonly googleOwned?: boolean;
  /**
   * Output only. Whether the app or extension is in a published state in the
   * Chrome Web Store.
   */
  readonly isCwsHosted?: boolean;
  /**
   * Output only. Whether an app supports policy for extensions.
   */
  readonly isExtensionPolicySupported?: boolean;
  /**
   * Output only. Whether the app is only for Kiosk mode on ChromeOS devices
   */
  readonly isKioskOnly?: boolean;
  /**
   * Output only. Whether the app or extension is a theme.
   */
  readonly isTheme?: boolean;
  /**
   * Output only. Whether this app is enabled for Kiosk mode on ChromeOS
   * devices
   */
  readonly kioskEnabled?: boolean;
  /**
   * Output only. The minimum number of users using this app.
   */
  readonly minUserCount?: number;
  /**
   * Output only. Every custom permission requested by the app.
   * Version-specific field that will only be set when the requested app version
   * is found.
   */
  readonly permissions?: GoogleChromeManagementV1ChromeAppPermission[];
  /**
   * Output only. Every permission giving access to domains or broad host
   * patterns. ( e.g. www.google.com). This includes the matches from content
   * scripts as well as hosts in the permissions node of the manifest.
   * Version-specific field that will only be set when the requested app version
   * is found.
   */
  readonly siteAccess?: GoogleChromeManagementV1ChromeAppSiteAccess[];
  /**
   * Output only. The app developer has enabled support for their app.
   * Version-specific field that will only be set when the requested app version
   * is found.
   */
  readonly supportEnabled?: boolean;
  /**
   * Output only. Types of an item in the Chrome Web Store
   */
  readonly type?:  | "ITEM_TYPE_UNSPECIFIED" | "EXTENSION" | "OTHERS";
}

/**
 * Permission requested by a Chrome app or extension.
 */
export interface GoogleChromeManagementV1ChromeAppPermission {
  /**
   * Output only. If available, whether this permissions grants the
   * app/extension access to user data.
   */
  readonly accessUserData?: boolean;
  /**
   * Output only. If available, a URI to a page that has documentation for the
   * current permission.
   */
  readonly documentationUri?: string;
  /**
   * Output only. The type of the permission.
   */
  readonly type?: string;
}

/**
 * Details of an app installation request.
 */
export interface GoogleChromeManagementV1ChromeAppRequest {
  /**
   * Output only. Format:
   * app_details=customers/{customer_id}/apps/chrome/{app_id}
   */
  readonly appDetails?: string;
  /**
   * Output only. Unique store identifier for the app. Example:
   * "gmbmikajjgmnabiglmofipeabaddhgne" for the Save to Google Drive Chrome
   * extension.
   */
  readonly appId?: string;
  /**
   * Output only. The uri for the detail page of the item.
   */
  readonly detailUri?: string;
  /**
   * Output only. App's display name.
   */
  readonly displayName?: string;
  /**
   * Output only. A link to an image that can be used as an icon for the
   * product.
   */
  readonly iconUri?: string;
  /**
   * Output only. The timestamp of the most recently made request for this app.
   */
  readonly latestRequestTime?: Date;
  /**
   * Output only. Total count of requests for this app.
   */
  readonly requestCount?: bigint;
}

/**
 * Represent one host permission.
 */
export interface GoogleChromeManagementV1ChromeAppSiteAccess {
  /**
   * Output only. This can contain very specific hosts, or patterns like
   * "*.com" for instance.
   */
  readonly hostMatch?: string;
}

/**
 * Response containing summary of requested app installations.
 */
export interface GoogleChromeManagementV1CountChromeAppRequestsResponse {
  /**
   * Token to specify the next page in the list.
   */
  nextPageToken?: string;
  /**
   * Count of requested apps matching request.
   */
  requestedApps?: GoogleChromeManagementV1ChromeAppRequest[];
  /**
   * Total number of matching app requests.
   */
  totalSize?: number;
}

/**
 * Response containing counts for browsers that need attention.
 */
export interface GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse {
  /**
   * Number of browsers that haven’t had any recent activity
   */
  noRecentActivityCount?: bigint;
  /**
   * Number of browsers that are pending an OS update
   */
  pendingBrowserUpdateCount?: bigint;
  /**
   * Number of browsers that have been recently enrolled
   */
  recentlyEnrolledCount?: bigint;
}

function serializeGoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse(data: any): GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse {
  return {
    ...data,
    noRecentActivityCount: data["noRecentActivityCount"] !== undefined ? String(data["noRecentActivityCount"]) : undefined,
    pendingBrowserUpdateCount: data["pendingBrowserUpdateCount"] !== undefined ? String(data["pendingBrowserUpdateCount"]) : undefined,
    recentlyEnrolledCount: data["recentlyEnrolledCount"] !== undefined ? String(data["recentlyEnrolledCount"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse(data: any): GoogleChromeManagementV1CountChromeBrowsersNeedingAttentionResponse {
  return {
    ...data,
    noRecentActivityCount: data["noRecentActivityCount"] !== undefined ? BigInt(data["noRecentActivityCount"]) : undefined,
    pendingBrowserUpdateCount: data["pendingBrowserUpdateCount"] !== undefined ? BigInt(data["pendingBrowserUpdateCount"]) : undefined,
    recentlyEnrolledCount: data["recentlyEnrolledCount"] !== undefined ? BigInt(data["recentlyEnrolledCount"]) : undefined,
  };
}

/**
 * Response containing a list of devices expiring in each month of a selected
 * time frame. Counts are grouped by model and Auto Update Expiration date.
 */
export interface GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse {
  /**
   * The list of reports sorted by auto update expiration date in ascending
   * order.
   */
  deviceAueCountReports?: GoogleChromeManagementV1DeviceAueCountReport[];
}

function serializeGoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse(data: any): GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse {
  return {
    ...data,
    deviceAueCountReports: data["deviceAueCountReports"] !== undefined ? data["deviceAueCountReports"].map((item: any) => (serializeGoogleChromeManagementV1DeviceAueCountReport(item))) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse(data: any): GoogleChromeManagementV1CountChromeDevicesReachingAutoExpirationDateResponse {
  return {
    ...data,
    deviceAueCountReports: data["deviceAueCountReports"] !== undefined ? data["deviceAueCountReports"].map((item: any) => (deserializeGoogleChromeManagementV1DeviceAueCountReport(item))) : undefined,
  };
}

/**
 * Response containing counts for devices that need attention.
 */
export interface GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse {
  /**
   * Number of ChromeOS devices have not synced policies in the past 28 days.
   */
  noRecentPolicySyncCount?: bigint;
  /**
   * Number of ChromeOS devices that have not seen any user activity in the
   * past 28 days.
   */
  noRecentUserActivityCount?: bigint;
  /**
   * Number of devices whose OS version is not compliant.
   */
  osVersionNotCompliantCount?: bigint;
  /**
   * Number of devices that are pending an OS update.
   */
  pendingUpdate?: bigint;
  /**
   * Number of devices that are unable to apply a policy due to an OS version
   * mismatch.
   */
  unsupportedPolicyCount?: bigint;
}

function serializeGoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse(data: any): GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse {
  return {
    ...data,
    noRecentPolicySyncCount: data["noRecentPolicySyncCount"] !== undefined ? String(data["noRecentPolicySyncCount"]) : undefined,
    noRecentUserActivityCount: data["noRecentUserActivityCount"] !== undefined ? String(data["noRecentUserActivityCount"]) : undefined,
    osVersionNotCompliantCount: data["osVersionNotCompliantCount"] !== undefined ? String(data["osVersionNotCompliantCount"]) : undefined,
    pendingUpdate: data["pendingUpdate"] !== undefined ? String(data["pendingUpdate"]) : undefined,
    unsupportedPolicyCount: data["unsupportedPolicyCount"] !== undefined ? String(data["unsupportedPolicyCount"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse(data: any): GoogleChromeManagementV1CountChromeDevicesThatNeedAttentionResponse {
  return {
    ...data,
    noRecentPolicySyncCount: data["noRecentPolicySyncCount"] !== undefined ? BigInt(data["noRecentPolicySyncCount"]) : undefined,
    noRecentUserActivityCount: data["noRecentUserActivityCount"] !== undefined ? BigInt(data["noRecentUserActivityCount"]) : undefined,
    osVersionNotCompliantCount: data["osVersionNotCompliantCount"] !== undefined ? BigInt(data["osVersionNotCompliantCount"]) : undefined,
    pendingUpdate: data["pendingUpdate"] !== undefined ? BigInt(data["pendingUpdate"]) : undefined,
    unsupportedPolicyCount: data["unsupportedPolicyCount"] !== undefined ? BigInt(data["unsupportedPolicyCount"]) : undefined,
  };
}

/**
 * Response containing a list of devices with a specific type of hardware
 * specification from the requested hardware type.
 */
export interface GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse {
  /**
   * The DeviceHardwareCountReport for device cpu type (for example Intel(R)
   * Core(TM) i7-10610U CPU @ 1.80GHz).
   */
  cpuReports?: GoogleChromeManagementV1DeviceHardwareCountReport[];
  /**
   * The DeviceHardwareCountReport for device memory amount in gigabytes (for
   * example 16).
   */
  memoryReports?: GoogleChromeManagementV1DeviceHardwareCountReport[];
  /**
   * The DeviceHardwareCountReport for device model type (for example Acer C7
   * Chromebook).
   */
  modelReports?: GoogleChromeManagementV1DeviceHardwareCountReport[];
  /**
   * The DeviceHardwareCountReport for device storage amount in gigabytes (for
   * example 128).
   */
  storageReports?: GoogleChromeManagementV1DeviceHardwareCountReport[];
}

function serializeGoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse(data: any): GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse {
  return {
    ...data,
    cpuReports: data["cpuReports"] !== undefined ? data["cpuReports"].map((item: any) => (serializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    memoryReports: data["memoryReports"] !== undefined ? data["memoryReports"].map((item: any) => (serializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    modelReports: data["modelReports"] !== undefined ? data["modelReports"].map((item: any) => (serializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    storageReports: data["storageReports"] !== undefined ? data["storageReports"].map((item: any) => (serializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse(data: any): GoogleChromeManagementV1CountChromeHardwareFleetDevicesResponse {
  return {
    ...data,
    cpuReports: data["cpuReports"] !== undefined ? data["cpuReports"].map((item: any) => (deserializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    memoryReports: data["memoryReports"] !== undefined ? data["memoryReports"].map((item: any) => (deserializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    modelReports: data["modelReports"] !== undefined ? data["modelReports"].map((item: any) => (deserializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
    storageReports: data["storageReports"] !== undefined ? data["storageReports"].map((item: any) => (deserializeGoogleChromeManagementV1DeviceHardwareCountReport(item))) : undefined,
  };
}

/**
 * Response containing requested browser versions details and counts.
 */
export interface GoogleChromeManagementV1CountChromeVersionsResponse {
  /**
   * List of all browser versions and their install counts.
   */
  browserVersions?: GoogleChromeManagementV1BrowserVersion[];
  /**
   * Token to specify the next page of the request.
   */
  nextPageToken?: string;
  /**
   * Total number browser versions matching request.
   */
  totalSize?: number;
}

/**
 * Response containing details of queried installed apps.
 */
export interface GoogleChromeManagementV1CountInstalledAppsResponse {
  /**
   * List of installed apps matching request.
   */
  installedApps?: GoogleChromeManagementV1InstalledApp[];
  /**
   * Token to specify the next page of the request.
   */
  nextPageToken?: string;
  /**
   * Total number of installed apps matching request.
   */
  totalSize?: number;
}

/**
 * Response containing a summary printing report for each printer from the
 * specified organizational unit for the requested time interval.
 */
export interface GoogleChromeManagementV1CountPrintJobsByPrinterResponse {
  /**
   * Pagination token for requesting the next page.
   */
  nextPageToken?: string;
  /**
   * List of PrinterReports matching request.
   */
  printerReports?: GoogleChromeManagementV1PrinterReport[];
  /**
   * Total number of printers matching request.
   */
  totalSize?: bigint;
}

function serializeGoogleChromeManagementV1CountPrintJobsByPrinterResponse(data: any): GoogleChromeManagementV1CountPrintJobsByPrinterResponse {
  return {
    ...data,
    printerReports: data["printerReports"] !== undefined ? data["printerReports"].map((item: any) => (serializeGoogleChromeManagementV1PrinterReport(item))) : undefined,
    totalSize: data["totalSize"] !== undefined ? String(data["totalSize"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountPrintJobsByPrinterResponse(data: any): GoogleChromeManagementV1CountPrintJobsByPrinterResponse {
  return {
    ...data,
    printerReports: data["printerReports"] !== undefined ? data["printerReports"].map((item: any) => (deserializeGoogleChromeManagementV1PrinterReport(item))) : undefined,
    totalSize: data["totalSize"] !== undefined ? BigInt(data["totalSize"]) : undefined,
  };
}

/**
 * Response containing a summary printing report for each user that has
 * initiated a print job with a printer from the specified organizational unit
 * during the requested time interval.
 */
export interface GoogleChromeManagementV1CountPrintJobsByUserResponse {
  /**
   * Pagination token for requesting the next page.
   */
  nextPageToken?: string;
  /**
   * Total number of users matching request.
   */
  totalSize?: bigint;
  /**
   * List of UserPrintReports matching request.
   */
  userPrintReports?: GoogleChromeManagementV1UserPrintReport[];
}

function serializeGoogleChromeManagementV1CountPrintJobsByUserResponse(data: any): GoogleChromeManagementV1CountPrintJobsByUserResponse {
  return {
    ...data,
    totalSize: data["totalSize"] !== undefined ? String(data["totalSize"]) : undefined,
    userPrintReports: data["userPrintReports"] !== undefined ? data["userPrintReports"].map((item: any) => (serializeGoogleChromeManagementV1UserPrintReport(item))) : undefined,
  };
}

function deserializeGoogleChromeManagementV1CountPrintJobsByUserResponse(data: any): GoogleChromeManagementV1CountPrintJobsByUserResponse {
  return {
    ...data,
    totalSize: data["totalSize"] !== undefined ? BigInt(data["totalSize"]) : undefined,
    userPrintReports: data["userPrintReports"] !== undefined ? data["userPrintReports"].map((item: any) => (deserializeGoogleChromeManagementV1UserPrintReport(item))) : undefined,
  };
}

/**
 * CPU specifications for the device * This field provides device information,
 * which is static and will not change over time. * Data for this field is
 * controlled via policy:
 * [ReportDeviceCpuInfo](https://chromeenterprise.google/policies/#ReportDeviceCpuInfo)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1CpuInfo {
  /**
   * Output only. Architecture type for the CPU. * This field provides device
   * information, which is static and will not change over time. * Data for this
   * field is controlled via policy:
   * [ReportDeviceCpuInfo](https://chromeenterprise.google/policies/#ReportDeviceCpuInfo)
   * * Data Collection Frequency: Only at Upload * Default Data Reporting
   * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
   * offline, the collected data is stored locally, and will be reported when
   * the device is next online: No * Reported for affiliated users only: N/A
   */
  readonly architecture?:  | "ARCHITECTURE_UNSPECIFIED" | "X64";
  /**
   * Output only. Whether keylocker is configured.`TRUE` = Enabled; `FALSE` =
   * disabled. Only reported if keylockerSupported = `TRUE`.
   */
  readonly keylockerConfigured?: boolean;
  /**
   * Output only. Whether keylocker is supported.
   */
  readonly keylockerSupported?: boolean;
  /**
   * Output only. The max CPU clock speed in kHz.
   */
  readonly maxClockSpeed?: number;
  /**
   * Output only. The CPU model name. Example: Intel(R) Core(TM) i5-8250U CPU @
   * 1.60GHz
   */
  readonly model?: string;
}

/**
 * Provides information about the status of the CPU. * This field is telemetry
 * information and this will change over time as the device is utilized. * Data
 * for this field is controlled via policy:
 * [ReportDeviceCpuInfo](https://chromeenterprise.google/policies/#ReportDeviceCpuInfo)
 * * Data Collection Frequency: Every 10 minutes * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1CpuStatusReport {
  /**
   * Output only. CPU temperature sample info per CPU core in Celsius
   */
  readonly cpuTemperatureInfo?: GoogleChromeManagementV1CpuTemperatureInfo[];
  /**
   * Output only. Sample of CPU utilization (0-100 percent).
   */
  readonly cpuUtilizationPct?: number;
  /**
   * Output only. The timestamp in milliseconds representing time at which this
   * report was sampled.
   */
  readonly reportTime?: Date;
  /**
   * Output only. Frequency the report is sampled.
   */
  readonly sampleFrequency?: number /* Duration */;
}

/**
 * CPU temperature of a device. Sampled per CPU core in Celsius. * This field
 * is telemetry information and this will change over time as the device is
 * utilized. * Data for this field is controlled via policy:
 * [ReportDeviceCpuInfo](https://chromeenterprise.google/policies/#ReportDeviceCpuInfo)
 * * Data Collection Frequency: Every 10 minutes * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1CpuTemperatureInfo {
  /**
   * Output only. CPU label. Example: Core 0
   */
  readonly label?: string;
  /**
   * Output only. CPU temperature in Celsius.
   */
  readonly temperatureCelsius?: number;
}

/**
 * Describes a device reporting Chrome browser information.
 */
export interface GoogleChromeManagementV1Device {
  /**
   * Output only. The ID of the device that reported this Chrome browser
   * information.
   */
  readonly deviceId?: string;
  /**
   * Output only. The name of the machine within its local network.
   */
  readonly machine?: string;
}

/**
 * Report for CountChromeDevicesPerAueDateResponse, contains the count of
 * devices of a specific model and auto update expiration range.
 */
export interface GoogleChromeManagementV1DeviceAueCountReport {
  /**
   * Enum value of month corresponding to the auto update expiration date in
   * UTC time zone. If the device is already expired, this field is empty.
   */
  aueMonth?:  | "MONTH_UNSPECIFIED" | "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER";
  /**
   * Int value of year corresponding to the Auto Update Expiration date in UTC
   * time zone. If the device is already expired, this field is empty.
   */
  aueYear?: bigint;
  /**
   * Count of devices of this model.
   */
  count?: bigint;
  /**
   * Boolean value for whether or not the device has already expired.
   */
  expired?: boolean;
  /**
   * Public model name of the devices.
   */
  model?: string;
}

function serializeGoogleChromeManagementV1DeviceAueCountReport(data: any): GoogleChromeManagementV1DeviceAueCountReport {
  return {
    ...data,
    aueYear: data["aueYear"] !== undefined ? String(data["aueYear"]) : undefined,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1DeviceAueCountReport(data: any): GoogleChromeManagementV1DeviceAueCountReport {
  return {
    ...data,
    aueYear: data["aueYear"] !== undefined ? BigInt(data["aueYear"]) : undefined,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Report for CountChromeDevicesPerHardwareSpecResponse, contains the count of
 * devices with a unique hardware specification.
 */
export interface GoogleChromeManagementV1DeviceHardwareCountReport {
  /**
   * Public name of the hardware specification.
   */
  bucket?: string;
  /**
   * Count of devices with a unique hardware specification.
   */
  count?: bigint;
}

function serializeGoogleChromeManagementV1DeviceHardwareCountReport(data: any): GoogleChromeManagementV1DeviceHardwareCountReport {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1DeviceHardwareCountReport(data: any): GoogleChromeManagementV1DeviceHardwareCountReport {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Status of the single storage device.
 */
export interface GoogleChromeManagementV1DiskInfo {
  /**
   * Output only. Number of bytes read since last boot.
   */
  readonly bytesReadThisSession?: bigint;
  /**
   * Output only. Number of bytes written since last boot.
   */
  readonly bytesWrittenThisSession?: bigint;
  /**
   * Output only. Time spent discarding since last boot. Discarding is writing
   * to clear blocks which are no longer in use. Supported on kernels 4.18+.
   */
  readonly discardTimeThisSession?: number /* Duration */;
  /**
   * Output only. Disk health.
   */
  readonly health?: string;
  /**
   * Output only. Counts the time the disk and queue were busy, so unlike the
   * fields above, parallel requests are not counted multiple times.
   */
  readonly ioTimeThisSession?: number /* Duration */;
  /**
   * Output only. Disk manufacturer.
   */
  readonly manufacturer?: string;
  /**
   * Output only. Disk model.
   */
  readonly model?: string;
  /**
   * Output only. Time spent reading from disk since last boot.
   */
  readonly readTimeThisSession?: number /* Duration */;
  /**
   * Output only. Disk serial number.
   */
  readonly serialNumber?: string;
  /**
   * Output only. Disk size.
   */
  readonly sizeBytes?: bigint;
  /**
   * Output only. Disk type: eMMC / NVMe / ATA / SCSI.
   */
  readonly type?: string;
  /**
   * Output only. Disk volumes.
   */
  readonly volumeIds?: string[];
  /**
   * Output only. Time spent writing to disk since last boot.
   */
  readonly writeTimeThisSession?: number /* Duration */;
}

/**
 * Information of a display device.
 */
export interface GoogleChromeManagementV1DisplayDevice {
  /**
   * Output only. Display height in millimeters.
   */
  readonly displayHeightMm?: number;
  /**
   * Output only. Display device name.
   */
  readonly displayName?: string;
  /**
   * Output only. Display width in millimeters.
   */
  readonly displayWidthMm?: number;
  /**
   * Output only. Is display internal or not.
   */
  readonly internal?: boolean;
  /**
   * Output only. Three letter manufacturer ID.
   */
  readonly manufacturerId?: string;
  /**
   * Output only. Year of manufacture.
   */
  readonly manufactureYear?: number;
  /**
   * Output only. Manufacturer product code.
   */
  readonly modelId?: number;
}

/**
 * Information for a display.
 */
export interface GoogleChromeManagementV1DisplayInfo {
  /**
   * Output only. Represents the graphics card device id.
   */
  readonly deviceId?: bigint;
  /**
   * Output only. Display device name.
   */
  readonly displayName?: string;
  /**
   * Output only. Indicates if display is internal or not.
   */
  readonly isInternal?: boolean;
  /**
   * Output only. Refresh rate in Hz.
   */
  readonly refreshRate?: number;
  /**
   * Output only. Resolution height in pixels.
   */
  readonly resolutionHeight?: number;
  /**
   * Output only. Resolution width in pixels.
   */
  readonly resolutionWidth?: number;
}

/**
 * Response containing a list of devices with queried app installed.
 */
export interface GoogleChromeManagementV1FindInstalledAppDevicesResponse {
  /**
   * A list of devices which have the app installed. Sorted in ascending
   * alphabetical order on the Device.machine field.
   */
  devices?: GoogleChromeManagementV1Device[];
  /**
   * Token to specify the next page of the request.
   */
  nextPageToken?: string;
  /**
   * Total number of devices matching request.
   */
  totalSize?: number;
}

/**
 * Information of a graphics adapter (GPU).
 */
export interface GoogleChromeManagementV1GraphicsAdapterInfo {
  /**
   * Output only. Adapter name. Example: Mesa DRI Intel(R) UHD Graphics 620
   * (Kabylake GT2).
   */
  readonly adapter?: string;
  /**
   * Output only. Represents the graphics card device id.
   */
  readonly deviceId?: bigint;
  /**
   * Output only. Version of the GPU driver.
   */
  readonly driverVersion?: string;
}

/**
 * Information of the graphics subsystem. * This field provides device
 * information, which is static and will not change over time. * Data for this
 * field is controlled via policy:
 * [ReportDeviceGraphicsStatus](https://chromeenterprise.google/policies/#ReportDeviceGraphicsStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1GraphicsInfo {
  /**
   * Output only. Information about the graphics adapter (GPU).
   */
  readonly adapterInfo?: GoogleChromeManagementV1GraphicsAdapterInfo;
  /**
   * Output only. Information about the display(s) of the device.
   */
  readonly displayDevices?: GoogleChromeManagementV1DisplayDevice[];
  /**
   * Output only. Is ePrivacy screen supported or not.
   */
  readonly eprivacySupported?: boolean;
  /**
   * Output only. Information about the internal touch screen(s) of the device.
   */
  readonly touchScreenInfo?: GoogleChromeManagementV1TouchScreenInfo;
}

/**
 * Information of the graphics subsystem. * This field is telemetry information
 * and this will change over time as the device is utilized. * Data for this
 * field is controlled via policy:
 * [ReportDeviceGraphicsInfo](https://chromeenterprise.google/policies/#ReportDeviceGraphicsInfo)
 * * Data Collection Frequency: 3 hours. * Default Data Reporting Frequency: 3
 * hours - Policy Controlled: Yes * Cache: If the device is offline, the
 * collected data is stored locally, and will be reported when the device is
 * next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1GraphicsStatusReport {
  /**
   * Output only. Information about the displays for the device.
   */
  readonly displays?: GoogleChromeManagementV1DisplayInfo[];
  /**
   * Output only. Time at which the graphics data was reported.
   */
  readonly reportTime?: Date;
}

/**
 * Data that describes the result of the HTTPS latency diagnostics routine,
 * with the HTTPS requests issued to Google websites.
 */
export interface GoogleChromeManagementV1HttpsLatencyRoutineData {
  /**
   * Output only. HTTPS latency if routine succeeded or failed because of
   * HIGH_LATENCY or VERY_HIGH_LATENCY.
   */
  readonly latency?: number /* Duration */;
  /**
   * Output only. HTTPS latency routine problem if a problem occurred.
   */
  readonly problem?:  | "HTTPS_LATENCY_PROBLEM_UNSPECIFIED" | "FAILED_DNS_RESOLUTIONS" | "FAILED_HTTPS_REQUESTS" | "HIGH_LATENCY" | "VERY_HIGH_LATENCY";
}

/**
 * Describes an installed app.
 */
export interface GoogleChromeManagementV1InstalledApp {
  /**
   * Output only. Unique identifier of the app. For Chrome apps and extensions,
   * the 32-character id (e.g. ehoadneljpdggcbbknedodolkkjodefl). For Android
   * apps, the package name (e.g. com.evernote).
   */
  readonly appId?: string;
  /**
   * Output only. How the app was installed.
   */
  readonly appInstallType?:  | "APP_INSTALL_TYPE_UNSPECIFIED" | "MULTIPLE" | "NORMAL" | "ADMIN" | "DEVELOPMENT" | "SIDELOAD" | "OTHER";
  /**
   * Output only. Source of the installed app.
   */
  readonly appSource?:  | "APP_SOURCE_UNSPECIFIED" | "CHROME_WEBSTORE" | "PLAY_STORE";
  /**
   * Output only. Type of the app.
   */
  readonly appType?:  | "APP_TYPE_UNSPECIFIED" | "EXTENSION" | "APP" | "THEME" | "HOSTED_APP" | "ANDROID_APP";
  /**
   * Output only. Count of browser devices with this app installed.
   */
  readonly browserDeviceCount?: bigint;
  /**
   * Output only. Description of the installed app.
   */
  readonly description?: string;
  /**
   * Output only. Whether the app is disabled.
   */
  readonly disabled?: boolean;
  /**
   * Output only. Name of the installed app.
   */
  readonly displayName?: string;
  /**
   * Output only. Homepage uri of the installed app.
   */
  readonly homepageUri?: string;
  /**
   * Output only. Count of ChromeOS users with this app installed.
   */
  readonly osUserCount?: bigint;
  /**
   * Output only. Permissions of the installed app.
   */
  readonly permissions?: string[];
}

export interface GoogleChromeManagementV1ListTelemetryDevicesResponse {
  /**
   * Telemetry devices returned in the response.
   */
  devices?: GoogleChromeManagementV1TelemetryDevice[];
  /**
   * Token to specify next page in the list.
   */
  nextPageToken?: string;
}

/**
 * Response message for listing telemetry events for a customer.
 */
export interface GoogleChromeManagementV1ListTelemetryEventsResponse {
  /**
   * Token to specify next page in the list.
   */
  nextPageToken?: string;
  /**
   * Telemetry events returned in the response.
   */
  telemetryEvents?: GoogleChromeManagementV1TelemetryEvent[];
}

function serializeGoogleChromeManagementV1ListTelemetryEventsResponse(data: any): GoogleChromeManagementV1ListTelemetryEventsResponse {
  return {
    ...data,
    telemetryEvents: data["telemetryEvents"] !== undefined ? data["telemetryEvents"].map((item: any) => (serializeGoogleChromeManagementV1TelemetryEvent(item))) : undefined,
  };
}

function deserializeGoogleChromeManagementV1ListTelemetryEventsResponse(data: any): GoogleChromeManagementV1ListTelemetryEventsResponse {
  return {
    ...data,
    telemetryEvents: data["telemetryEvents"] !== undefined ? data["telemetryEvents"].map((item: any) => (deserializeGoogleChromeManagementV1TelemetryEvent(item))) : undefined,
  };
}

/**
 * Response message for listing telemetry users for a customer.
 */
export interface GoogleChromeManagementV1ListTelemetryUsersResponse {
  /**
   * Token to specify next page in the list.
   */
  nextPageToken?: string;
  /**
   * Telemetry users returned in the response.
   */
  telemetryUsers?: GoogleChromeManagementV1TelemetryUser[];
}

/**
 * Memory information of a device. * This field has both telemetry and device
 * information: - `totalRamBytes` - Device information - `availableRamBytes` -
 * Telemetry information - `totalMemoryEncryption` - Device information * Data
 * for this field is controlled via policy:
 * [ReportDeviceMemoryInfo](https://chromeenterprise.google/policies/#ReportDeviceMemoryInfo)
 * * Data Collection Frequency: - `totalRamBytes` - Only at upload -
 * `availableRamBytes` - Every 10 minutes - `totalMemoryEncryption` - at device
 * startup * Default Data Reporting Frequency: - `totalRamBytes` - 3 hours -
 * `availableRamBytes` - 3 hours - `totalMemoryEncryption` - at device startup -
 * Policy Controlled: Yes * Cache: If the device is offline, the collected data
 * is stored locally, and will be reported when the device is next online: only
 * for `totalMemoryEncryption` * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1MemoryInfo {
  /**
   * Output only. Amount of available RAM in bytes.
   */
  readonly availableRamBytes?: bigint;
  /**
   * Output only. Total memory encryption info for the device.
   */
  readonly totalMemoryEncryption?: GoogleChromeManagementV1TotalMemoryEncryptionInfo;
  /**
   * Output only. Total RAM in bytes.
   */
  readonly totalRamBytes?: bigint;
}

/**
 * Contains samples of memory status reports. * This field is telemetry
 * information and this will change over time as the device is utilized. * Data
 * for this field is controlled via policy:
 * [ReportDeviceMemoryInfo](https://chromeenterprise.google/policies/#ReportDeviceMemoryInfo)
 * * Data Collection Frequency: Only at upload, SystemRamFreeByes is collected
 * every 10 minutes * Default Data Reporting Frequency: Every 3 hours - Policy
 * Controlled: Yes * Cache: If the device is offline, the collected data is
 * stored locally, and will be reported when the device is next online: No *
 * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1MemoryStatusReport {
  /**
   * Output only. Number of page faults during this collection
   */
  readonly pageFaults?: number;
  /**
   * Output only. The timestamp in milliseconds representing time at which this
   * report was sampled.
   */
  readonly reportTime?: Date;
  /**
   * Output only. Frequency the report is sampled.
   */
  readonly sampleFrequency?: number /* Duration */;
  /**
   * Output only. Amount of free RAM in bytes (unreliable due to Garbage
   * Collection).
   */
  readonly systemRamFreeBytes?: bigint;
}

/**
 * Details about the network device. * This field provides device information,
 * which is static and will not change over time. * Data for this field is
 * controlled via policy:
 * [ReportNetworkDeviceConfiguration](https://chromeenterprise.google/policies/#ReportNetworkDeviceConfiguration)
 * * Data Collection Frequency: At device startup * Default Data Reporting
 * Frequency: At device startup - Policy Controlled: Yes * Cache: If the device
 * is offline, the collected data is stored locally, and will be reported when
 * the device is next online: Yes * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1NetworkDevice {
  /**
   * Output only. The integrated circuit card ID associated with the device's
   * sim card.
   */
  readonly iccid?: string;
  /**
   * Output only. IMEI (if applicable) of the corresponding network device.
   */
  readonly imei?: string;
  /**
   * Output only. MAC address (if applicable) of the corresponding network
   * device.
   */
  readonly macAddress?: string;
  /**
   * Output only. The mobile directory number associated with the device's sim
   * card.
   */
  readonly mdn?: string;
  /**
   * Output only. MEID (if applicable) of the corresponding network device.
   */
  readonly meid?: string;
  /**
   * Output only. Network device type.
   */
  readonly type?:  | "NETWORK_DEVICE_TYPE_UNSPECIFIED" | "CELLULAR_DEVICE" | "ETHERNET_DEVICE" | "WIFI_DEVICE";
}

/**
 * Network testing results to determine the health of the device's network
 * connection, for example whether the HTTPS latency is high or normal.
 */
export interface GoogleChromeManagementV1NetworkDiagnosticsReport {
  /**
   * Output only. HTTPS latency test data.
   */
  readonly httpsLatencyData?: GoogleChromeManagementV1HttpsLatencyRoutineData;
  /**
   * Output only. Timestamp of when the diagnostics were collected.
   */
  readonly reportTime?: Date;
}

/**
 * Network device information. * This field provides device information, which
 * is static and will not change over time. * Data for this field is controlled
 * via policy:
 * [ReportNetworkDeviceConfiguration](https://chromeenterprise.google/policies/#ReportNetworkDeviceConfiguration)
 * * Data Collection Frequency: At device startup * Default Data Reporting
 * Frequency: At device startup - Policy Controlled: Yes * Cache: If the device
 * is offline, the collected data is stored locally, and will be reported when
 * the device is next online: Yes * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1NetworkInfo {
  /**
   * Output only. List of network devices.
   */
  readonly networkDevices?: GoogleChromeManagementV1NetworkDevice[];
}

/**
 * State of visible/configured networks. * This field is telemetry information
 * and this will change over time as the device is utilized. * Data for this
 * field is controlled via policy:
 * [ReportNetworkStatus](https://chromeenterprise.google/policies/#ReportNetworkStatus)
 * * Data Collection Frequency: 60 minutes * Default Data Reporting Frequency: 3
 * hours - Policy Controlled: Yes * Cache: If the device is offline, the
 * collected data is stored locally, and will be reported when the device is
 * next online: Yes * Reported for affiliated users only: Yes
 */
export interface GoogleChromeManagementV1NetworkStatusReport {
  /**
   * Output only. Current connection state of the network.
   */
  readonly connectionState?:  | "NETWORK_CONNECTION_STATE_UNSPECIFIED" | "ONLINE" | "CONNECTED" | "PORTAL" | "CONNECTING" | "NOT_CONNECTED";
  /**
   * Output only. Network connection type.
   */
  readonly connectionType?:  | "NETWORK_TYPE_UNSPECIFIED" | "CELLULAR" | "ETHERNET" | "TETHER" | "VPN" | "WIFI";
  /**
   * Output only. Whether the wifi encryption key is turned off.
   */
  readonly encryptionOn?: boolean;
  /**
   * Output only. Gateway IP address.
   */
  readonly gatewayIpAddress?: string;
  /**
   * Output only. Network connection guid.
   */
  readonly guid?: string;
  /**
   * Output only. LAN IP address.
   */
  readonly lanIpAddress?: string;
  /**
   * Output only. Receiving bit rate measured in Megabits per second.
   */
  readonly receivingBitRateMbps?: bigint;
  /**
   * Output only. Time at which the network state was reported.
   */
  readonly reportTime?: Date;
  /**
   * Output only. Frequency the report is sampled.
   */
  readonly sampleFrequency?: number /* Duration */;
  /**
   * Output only. Signal strength for wireless networks measured in decibels.
   */
  readonly signalStrengthDbm?: number;
  /**
   * Output only. Transmission bit rate measured in Megabits per second.
   */
  readonly transmissionBitRateMbps?: bigint;
  /**
   * Output only. Transmission power measured in decibels.
   */
  readonly transmissionPowerDbm?: number;
  /**
   * Output only. Wifi link quality. Value ranges from [0, 70]. 0 indicates no
   * signal and 70 indicates a strong signal.
   */
  readonly wifiLinkQuality?: bigint;
  /**
   * Output only. Wifi power management enabled
   */
  readonly wifiPowerManagementEnabled?: boolean;
}

/**
 * Contains information regarding the current OS update status. * This field is
 * telemetry information and this will change over time as the device is
 * utilized. * Data for this field is controlled via policy:
 * [ReportDeviceOsUpdateStatus](https://chromeenterprise.google/policies/#ReportDeviceOsUpdateStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1OsUpdateStatus {
  /**
   * Output only. Timestamp of the last reboot.
   */
  readonly lastRebootTime?: Date;
  /**
   * Output only. Timestamp of the last update check.
   */
  readonly lastUpdateCheckTime?: Date;
  /**
   * Output only. Timestamp of the last successful update.
   */
  readonly lastUpdateTime?: Date;
  /**
   * Output only. New platform version of the os image being downloaded and
   * applied. It is only set when update status is OS_IMAGE_DOWNLOAD_IN_PROGRESS
   * or OS_UPDATE_NEED_REBOOT. Note this could be a dummy "0.0.0.0" for
   * OS_UPDATE_NEED_REBOOT status for some edge cases, e.g. update engine is
   * restarted without a reboot.
   */
  readonly newPlatformVersion?: string;
  /**
   * Output only. New requested platform version from the pending updated kiosk
   * app.
   */
  readonly newRequestedPlatformVersion?: string;
  /**
   * Output only. Current state of the os update.
   */
  readonly updateState?:  | "UPDATE_STATE_UNSPECIFIED" | "OS_IMAGE_DOWNLOAD_NOT_STARTED" | "OS_IMAGE_DOWNLOAD_IN_PROGRESS" | "OS_UPDATE_NEED_REBOOT";
}

/**
 * Peripherals report.
 */
export interface GoogleChromeManagementV1PeripheralsReport {
  /**
   * Output only. Timestamp of when the report was collected.
   */
  readonly reportTime?: Date;
  /**
   * Reports of all usb connected devices.
   */
  usbPeripheralReport?: GoogleChromeManagementV1UsbPeripheralReport[];
}

/**
 * Report for CountPrintJobsByPrinter, contains statistics on printer usage.
 * Contains the total number of print jobs initiated with this printer, the
 * number of users and the number of devices that have initiated at least one
 * print job with this printer.
 */
export interface GoogleChromeManagementV1PrinterReport {
  /**
   * Number of chrome devices that have been used to send print jobs to the
   * specified printer.
   */
  deviceCount?: bigint;
  /**
   * Number of print jobs sent to the printer.
   */
  jobCount?: bigint;
  /**
   * Printer name.
   */
  printer?: string;
  /**
   * Printer API ID.
   */
  printerId?: string;
  /**
   * Printer model.
   */
  printerModel?: string;
  /**
   * Number of users that have sent print jobs to the printer.
   */
  userCount?: bigint;
}

function serializeGoogleChromeManagementV1PrinterReport(data: any): GoogleChromeManagementV1PrinterReport {
  return {
    ...data,
    deviceCount: data["deviceCount"] !== undefined ? String(data["deviceCount"]) : undefined,
    jobCount: data["jobCount"] !== undefined ? String(data["jobCount"]) : undefined,
    userCount: data["userCount"] !== undefined ? String(data["userCount"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1PrinterReport(data: any): GoogleChromeManagementV1PrinterReport {
  return {
    ...data,
    deviceCount: data["deviceCount"] !== undefined ? BigInt(data["deviceCount"]) : undefined,
    jobCount: data["jobCount"] !== undefined ? BigInt(data["jobCount"]) : undefined,
    userCount: data["userCount"] !== undefined ? BigInt(data["userCount"]) : undefined,
  };
}

/**
 * Status data for storage. * This field is telemetry information and this will
 * change over time as the device is utilized. * Data for this field is
 * controlled via policy:
 * [ReportDeviceStorageStatus](https://chromeenterprise.google/policies/#ReportDeviceStorageStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1StorageInfo {
  /**
   * The available space for user data storage in the device in bytes.
   */
  availableDiskBytes?: bigint;
  /**
   * The total space for user data storage in the device in bytes.
   */
  totalDiskBytes?: bigint;
  /**
   * Information for disk volumes
   */
  volume?: GoogleChromeManagementV1StorageInfoDiskVolume[];
}

function serializeGoogleChromeManagementV1StorageInfo(data: any): GoogleChromeManagementV1StorageInfo {
  return {
    ...data,
    availableDiskBytes: data["availableDiskBytes"] !== undefined ? String(data["availableDiskBytes"]) : undefined,
    totalDiskBytes: data["totalDiskBytes"] !== undefined ? String(data["totalDiskBytes"]) : undefined,
    volume: data["volume"] !== undefined ? data["volume"].map((item: any) => (serializeGoogleChromeManagementV1StorageInfoDiskVolume(item))) : undefined,
  };
}

function deserializeGoogleChromeManagementV1StorageInfo(data: any): GoogleChromeManagementV1StorageInfo {
  return {
    ...data,
    availableDiskBytes: data["availableDiskBytes"] !== undefined ? BigInt(data["availableDiskBytes"]) : undefined,
    totalDiskBytes: data["totalDiskBytes"] !== undefined ? BigInt(data["totalDiskBytes"]) : undefined,
    volume: data["volume"] !== undefined ? data["volume"].map((item: any) => (deserializeGoogleChromeManagementV1StorageInfoDiskVolume(item))) : undefined,
  };
}

/**
 * Information for disk volumes
 */
export interface GoogleChromeManagementV1StorageInfoDiskVolume {
  /**
   * Free storage space in bytes.
   */
  storageFreeBytes?: bigint;
  /**
   * Total storage space in bytes.
   */
  storageTotalBytes?: bigint;
  /**
   * Disk volume id.
   */
  volumeId?: string;
}

function serializeGoogleChromeManagementV1StorageInfoDiskVolume(data: any): GoogleChromeManagementV1StorageInfoDiskVolume {
  return {
    ...data,
    storageFreeBytes: data["storageFreeBytes"] !== undefined ? String(data["storageFreeBytes"]) : undefined,
    storageTotalBytes: data["storageTotalBytes"] !== undefined ? String(data["storageTotalBytes"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1StorageInfoDiskVolume(data: any): GoogleChromeManagementV1StorageInfoDiskVolume {
  return {
    ...data,
    storageFreeBytes: data["storageFreeBytes"] !== undefined ? BigInt(data["storageFreeBytes"]) : undefined,
    storageTotalBytes: data["storageTotalBytes"] !== undefined ? BigInt(data["storageTotalBytes"]) : undefined,
  };
}

/**
 * Status data for storage. * This field is telemetry information and this will
 * change over time as the device is utilized. * Data for this field is
 * controlled via policy:
 * [ReportDeviceStorageStatus](https://chromeenterprise.google/policies/#ReportDeviceStorageStatus)
 * * Data Collection Frequency: Only at Upload * Default Data Reporting
 * Frequency: 3 hours - Policy Controlled: Yes * Cache: If the device is
 * offline, the collected data is stored locally, and will be reported when the
 * device is next online: No * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1StorageStatusReport {
  /**
   * Output only. Reports on disk.
   */
  readonly disk?: GoogleChromeManagementV1DiskInfo[];
  /**
   * Output only. Timestamp of when the sample was collected on device
   */
  readonly reportTime?: Date;
}

/**
 * `TelemetryAudioSevereUnderrunEvent` is triggered when a audio devices run
 * out of buffer data for more than 5 seconds.
 */
export interface GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent {
}

/**
 * Telemetry data collected from a managed device.
 */
export interface GoogleChromeManagementV1TelemetryDevice {
  /**
   * Output only. Audio reports collected periodically sorted in a decreasing
   * order of report_time.
   */
  readonly audioStatusReport?: GoogleChromeManagementV1AudioStatusReport[];
  /**
   * Output only. Information on battery specs for the device.
   */
  readonly batteryInfo?: GoogleChromeManagementV1BatteryInfo[];
  /**
   * Output only. Battery reports collected periodically.
   */
  readonly batteryStatusReport?: GoogleChromeManagementV1BatteryStatusReport[];
  /**
   * Output only. Boot performance reports of the device.
   */
  readonly bootPerformanceReport?: GoogleChromeManagementV1BootPerformanceReport[];
  /**
   * Output only. Information regarding CPU specs for the device.
   */
  readonly cpuInfo?: GoogleChromeManagementV1CpuInfo[];
  /**
   * Output only. CPU status reports collected periodically sorted in a
   * decreasing order of report_time.
   */
  readonly cpuStatusReport?: GoogleChromeManagementV1CpuStatusReport[];
  /**
   * Output only. Google Workspace Customer whose enterprise enrolled the
   * device.
   */
  readonly customer?: string;
  /**
   * Output only. The unique Directory API ID of the device. This value is the
   * same as the Admin Console's Directory API ID in the ChromeOS Devices tab
   */
  readonly deviceId?: string;
  /**
   * Output only. Contains information regarding Graphic peripherals for the
   * device.
   */
  readonly graphicsInfo?: GoogleChromeManagementV1GraphicsInfo;
  /**
   * Output only. Graphics reports collected periodically.
   */
  readonly graphicsStatusReport?: GoogleChromeManagementV1GraphicsStatusReport[];
  /**
   * Output only. Information regarding memory specs for the device.
   */
  readonly memoryInfo?: GoogleChromeManagementV1MemoryInfo;
  /**
   * Output only. Memory status reports collected periodically sorted
   * decreasing by report_time.
   */
  readonly memoryStatusReport?: GoogleChromeManagementV1MemoryStatusReport[];
  /**
   * Output only. Resource name of the device.
   */
  readonly name?: string;
  /**
   * Output only. Network diagnostics collected periodically.
   */
  readonly networkDiagnosticsReport?: GoogleChromeManagementV1NetworkDiagnosticsReport[];
  /**
   * Output only. Network devices information.
   */
  readonly networkInfo?: GoogleChromeManagementV1NetworkInfo;
  /**
   * Output only. Network specs collected periodically.
   */
  readonly networkStatusReport?: GoogleChromeManagementV1NetworkStatusReport[];
  /**
   * Output only. Organization unit ID of the device.
   */
  readonly orgUnitId?: string;
  /**
   * Output only. Contains relevant information regarding ChromeOS update
   * status.
   */
  readonly osUpdateStatus?: GoogleChromeManagementV1OsUpdateStatus[];
  /**
   * Output only. Peripherals reports collected periodically sorted in a
   * decreasing order of report_time.
   */
  readonly peripheralsReport?: GoogleChromeManagementV1PeripheralsReport[];
  /**
   * Output only. Device serial number. This value is the same as the Admin
   * Console's Serial Number in the ChromeOS Devices tab.
   */
  readonly serialNumber?: string;
  /**
   * Output only. Information of storage specs for the device.
   */
  readonly storageInfo?: GoogleChromeManagementV1StorageInfo;
  /**
   * Output only. Storage reports collected periodically.
   */
  readonly storageStatusReport?: GoogleChromeManagementV1StorageStatusReport[];
  /**
   * Output only. Information on Thunderbolt bus.
   */
  readonly thunderboltInfo?: GoogleChromeManagementV1ThunderboltInfo[];
}

/**
 * Information about a device associated with telemetry data.
 */
export interface GoogleChromeManagementV1TelemetryDeviceInfo {
  /**
   * Output only. The unique Directory API ID of the device. This value is the
   * same as the Admin Console's Directory API ID in the ChromeOS Devices tab.
   */
  readonly deviceId?: string;
  /**
   * Output only. Organization unit ID of the device.
   */
  readonly orgUnitId?: string;
}

/**
 * Telemetry data reported by a managed device.
 */
export interface GoogleChromeManagementV1TelemetryEvent {
  /**
   * Output only. Payload for audio severe underrun event. Present only when
   * the `event_type` field is `AUDIO_SEVERE_UNDERRUN`.
   */
  readonly audioSevereUnderrunEvent?: GoogleChromeManagementV1TelemetryAudioSevereUnderrunEvent;
  /**
   * Output only. Information about the device associated with the event.
   */
  readonly device?: GoogleChromeManagementV1TelemetryDeviceInfo;
  /**
   * The event type of the current event.
   */
  eventType?:  | "EVENT_TYPE_UNSPECIFIED" | "AUDIO_SEVERE_UNDERRUN" | "USB_ADDED" | "USB_REMOVED" | "NETWORK_HTTPS_LATENCY_CHANGE";
  /**
   * Output only. Payload for HTTPS latency change event. Present only when
   * `event_type` is `NETWORK_HTTPS_LATENCY_CHANGE`.
   */
  readonly httpsLatencyChangeEvent?: GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent;
  /**
   * Output only. Resource name of the event.
   */
  readonly name?: string;
  /**
   * Timestamp that represents when the event was reported.
   */
  reportTime?: Date;
  /**
   * Output only. Payload for usb peripherals event. Present only when the
   * `event_type` field is either `USB_ADDED` or `USB_REMOVED`.
   */
  readonly usbPeripheralsEvent?: GoogleChromeManagementV1TelemetryUsbPeripheralsEvent;
  /**
   * Output only. Information about the user associated with the event.
   */
  readonly user?: GoogleChromeManagementV1TelemetryUserInfo;
}

function serializeGoogleChromeManagementV1TelemetryEvent(data: any): GoogleChromeManagementV1TelemetryEvent {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? data["reportTime"].toISOString() : undefined,
  };
}

function deserializeGoogleChromeManagementV1TelemetryEvent(data: any): GoogleChromeManagementV1TelemetryEvent {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? new Date(data["reportTime"]) : undefined,
  };
}

/**
 * Https latency routine is run periodically and
 * `TelemetryHttpsLatencyChangeEvent` is triggered if a latency problem was
 * detected or if the device has recovered from a latency problem..
 */
export interface GoogleChromeManagementV1TelemetryHttpsLatencyChangeEvent {
  /**
   * HTTPS latency routine data that triggered the event.
   */
  httpsLatencyRoutineData?: GoogleChromeManagementV1HttpsLatencyRoutineData;
  /**
   * Current HTTPS latency state.
   */
  httpsLatencyState?:  | "HTTPS_LATENCY_STATE_UNSPECIFIED" | "RECOVERY" | "PROBLEM";
}

/**
 * `TelemetryUsbPeripheralsEvent` is triggered USB devices are either added or
 * removed.
 */
export interface GoogleChromeManagementV1TelemetryUsbPeripheralsEvent {
  /**
   * List of usb devices that were either added or removed.
   */
  usbPeripheralReport?: GoogleChromeManagementV1UsbPeripheralReport[];
}

/**
 * Telemetry data collected from a managed user.
 */
export interface GoogleChromeManagementV1TelemetryUser {
  /**
   * G Suite Customer whose enterprise enrolled the device.
   */
  customer?: string;
  /**
   * Resource name of the user.
   */
  name?: string;
  /**
   * Organization unit of the user.
   */
  orgUnitId?: string;
  /**
   * Telemetry data collected from a managed user and device.
   */
  userDevice?: GoogleChromeManagementV1TelemetryUserDevice[];
  /**
   * Email address of the user.
   */
  userEmail?: string;
  /**
   * Directory ID of the user.
   */
  userId?: string;
}

/**
 * Telemetry data collected for a managed user and device.
 */
export interface GoogleChromeManagementV1TelemetryUserDevice {
  /**
   * Output only. Audio reports collected periodically sorted in a decreasing
   * order of report_time.
   */
  readonly audioStatusReport?: GoogleChromeManagementV1AudioStatusReport[];
  /**
   * The unique Directory API ID of the device. This value is the same as the
   * Admin Console's Directory API ID in the ChromeOS Devices tab.
   */
  deviceId?: string;
  /**
   * Output only. Peripherals reports collected periodically sorted in a
   * decreasing order of report_time.
   */
  readonly peripheralsReport?: GoogleChromeManagementV1PeripheralsReport[];
}

/**
 * Information about a user associated with telemetry data.
 */
export interface GoogleChromeManagementV1TelemetryUserInfo {
  /**
   * Output only. User's email.
   */
  readonly email?: string;
  /**
   * Output only. Organization unit ID of the user.
   */
  readonly orgUnitId?: string;
}

/**
 * Thunderbolt bus info. * This field provides device information, which is
 * static and will not change over time. * Data for this field is controlled via
 * policy:
 * [ReportDeviceSecurityStatus](https://chromeenterprise.google/policies/#ReportDeviceSecurityStatus)
 * * Data Collection Frequency: At device startup * Default Data Reporting
 * Frequency: At device startup - Policy Controlled: No * Cache: If the device
 * is offline, the collected data is stored locally, and will be reported when
 * the device is next online: Yes * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1ThunderboltInfo {
  /**
   * Security level of the Thunderbolt bus.
   */
  securityLevel?:  | "THUNDERBOLT_SECURITY_LEVEL_UNSPECIFIED" | "THUNDERBOLT_SECURITY_NONE_LEVEL" | "THUNDERBOLT_SECURITY_USER_LEVEL" | "THUNDERBOLT_SECURITY_SECURE_LEVEL" | "THUNDERBOLT_SECURITY_DP_ONLY_LEVEL" | "THUNDERBOLT_SECURITY_USB_ONLY_LEVEL" | "THUNDERBOLT_SECURITY_NO_PCIE_LEVEL";
}

/**
 * Memory encryption information of a device. * This field provides device
 * information, which is static and will not change over time. * Data for this
 * field is controlled via policy:
 * [ReportDeviceMemoryInfo](https://chromeenterprise.google/policies/#ReportDeviceMemoryInfo)
 * * Data Collection Frequency: At device startup * Default Data Reporting
 * Frequency: At device startup - Policy Controlled: Yes * Cache: If the device
 * is offline, the collected data is stored locally, and will be reported when
 * the device is next online: Yes * Reported for affiliated users only: N/A
 */
export interface GoogleChromeManagementV1TotalMemoryEncryptionInfo {
  /**
   * Memory encryption algorithm.
   */
  encryptionAlgorithm?:  | "MEMORY_ENCRYPTION_ALGORITHM_UNSPECIFIED" | "MEMORY_ENCRYPTION_ALGORITHM_UNKNOWN" | "MEMORY_ENCRYPTION_ALGORITHM_AES_XTS_128" | "MEMORY_ENCRYPTION_ALGORITHM_AES_XTS_256";
  /**
   * The state of memory encryption on the device.
   */
  encryptionState?:  | "MEMORY_ENCRYPTION_STATE_UNSPECIFIED" | "MEMORY_ENCRYPTION_STATE_UNKNOWN" | "MEMORY_ENCRYPTION_STATE_DISABLED" | "MEMORY_ENCRYPTION_STATE_TME" | "MEMORY_ENCRYPTION_STATE_MKTME";
  /**
   * The length of the encryption keys.
   */
  keyLength?: bigint;
  /**
   * The maximum number of keys that can be used for encryption.
   */
  maxKeys?: bigint;
}

function serializeGoogleChromeManagementV1TotalMemoryEncryptionInfo(data: any): GoogleChromeManagementV1TotalMemoryEncryptionInfo {
  return {
    ...data,
    keyLength: data["keyLength"] !== undefined ? String(data["keyLength"]) : undefined,
    maxKeys: data["maxKeys"] !== undefined ? String(data["maxKeys"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1TotalMemoryEncryptionInfo(data: any): GoogleChromeManagementV1TotalMemoryEncryptionInfo {
  return {
    ...data,
    keyLength: data["keyLength"] !== undefined ? BigInt(data["keyLength"]) : undefined,
    maxKeys: data["maxKeys"] !== undefined ? BigInt(data["maxKeys"]) : undefined,
  };
}

/**
 * Information of an internal touch screen device.
 */
export interface GoogleChromeManagementV1TouchScreenDevice {
  /**
   * Output only. Touch screen device display name.
   */
  readonly displayName?: string;
  /**
   * Output only. Touch screen device is stylus capable or not.
   */
  readonly stylusCapable?: boolean;
  /**
   * Output only. Number of touch points supported on the device.
   */
  readonly touchPointCount?: number;
}

/**
 * Information on the device touch screen.
 */
export interface GoogleChromeManagementV1TouchScreenInfo {
  /**
   * Output only. List of the internal touch screen devices.
   */
  readonly devices?: GoogleChromeManagementV1TouchScreenDevice[];
  /**
   * Output only. Touchpad library name used by the input stack.
   */
  readonly touchpadLibrary?: string;
}

/**
 * USB connected peripheral report.
 */
export interface GoogleChromeManagementV1UsbPeripheralReport {
  /**
   * Output only. Categories the device belongs to
   * https://www.usb.org/defined-class-codes
   */
  readonly categories?: string[];
  /**
   * Output only. Class ID https://www.usb.org/defined-class-codes
   */
  readonly classId?: number;
  /**
   * Output only. Firmware version
   */
  readonly firmwareVersion?: string;
  /**
   * Output only. Device name, model name, or product name
   */
  readonly name?: string;
  /**
   * Output only. Product ID
   */
  readonly pid?: number;
  /**
   * Output only. Subclass ID https://www.usb.org/defined-class-codes
   */
  readonly subclassId?: number;
  /**
   * Output only. Vendor name
   */
  readonly vendor?: string;
  /**
   * Output only. Vendor ID
   */
  readonly vid?: number;
}

/**
 * Report for CountPrintJobsByUser, contains printing statistics for a user.
 * Contains the number of printers, the number of devices used to initiate print
 * jobs, and the number of print jobs initiated.
 */
export interface GoogleChromeManagementV1UserPrintReport {
  /**
   * Number of chrome devices that have been used to initiate print jobs by the
   * user.
   */
  deviceCount?: bigint;
  /**
   * Number of print jobs initiated by the user.
   */
  jobCount?: bigint;
  /**
   * Number of printers used by the user.
   */
  printerCount?: bigint;
  /**
   * The primary e-mail address of the user.
   */
  userEmail?: string;
  /**
   * The unique Directory API ID of the user.
   */
  userId?: string;
}

function serializeGoogleChromeManagementV1UserPrintReport(data: any): GoogleChromeManagementV1UserPrintReport {
  return {
    ...data,
    deviceCount: data["deviceCount"] !== undefined ? String(data["deviceCount"]) : undefined,
    jobCount: data["jobCount"] !== undefined ? String(data["jobCount"]) : undefined,
    printerCount: data["printerCount"] !== undefined ? String(data["printerCount"]) : undefined,
  };
}

function deserializeGoogleChromeManagementV1UserPrintReport(data: any): GoogleChromeManagementV1UserPrintReport {
  return {
    ...data,
    deviceCount: data["deviceCount"] !== undefined ? BigInt(data["deviceCount"]) : undefined,
    jobCount: data["jobCount"] !== undefined ? BigInt(data["jobCount"]) : undefined,
    printerCount: data["printerCount"] !== undefined ? BigInt(data["printerCount"]) : undefined,
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