// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Resource Settings API Client for Deno
 * =====================================
 * 
 * The Resource Settings API allows users to control and modify the behavior of their GCP resources (e.g., VM, firewall, Project, etc.) across the Cloud Resource Hierarchy.
 * 
 * Docs: https://cloud.google.com/resource-manager/docs/resource-settings/overview
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Resource Settings API allows users to control and modify the behavior of
 * their GCP resources (e.g., VM, firewall, Project, etc.) across the Cloud
 * Resource Hierarchy.
 */
export class ResourceSettings {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://resourcesettings.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist.
   *
   * @param name Required. The name of the setting to get. See Setting for naming requirements.
   */
  async foldersSettingsGet(name: string, opts: FoldersSettingsGetOptions = {}): Promise<GoogleCloudResourcesettingsV1Setting> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }

  /**
   * Lists all the settings that are available on the Cloud resource `parent`.
   *
   * @param parent Required. The project, folder, or organization that is the parent resource for this setting. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async foldersSettingsList(parent: string, opts: FoldersSettingsListOptions = {}): Promise<GoogleCloudResourcesettingsV1ListSettingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/settings`);
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
    return deserializeGoogleCloudResourcesettingsV1ListSettingsResponse(data);
  }

  /**
   * Updates a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.FAILED_PRECONDITION` if the
   * setting is flagged as read only. Returns a `google.rpc.Status` with
   * `google.rpc.Code.ABORTED` if the etag supplied in the request does not
   * match the persisted etag of the setting value. On success, the response
   * will contain only `name`, `local_value` and `etag`. The `metadata` and
   * `effective_value` cannot be updated through this API. Note: the supplied
   * setting will perform a full overwrite of the `local_value` field.
   *
   * @param name The resource name of the setting. Must be in one of the following forms: * `projects/{project_number}/settings/{setting_name}` * `folders/{folder_id}/settings/{setting_name}` * `organizations/{organization_id}/settings/{setting_name}` For example, "/projects/123/settings/gcp-enableMyFeature"
   */
  async foldersSettingsPatch(name: string, req: GoogleCloudResourcesettingsV1Setting): Promise<GoogleCloudResourcesettingsV1Setting> {
    req = serializeGoogleCloudResourcesettingsV1Setting(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }

  /**
   * Returns a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist.
   *
   * @param name Required. The name of the setting to get. See Setting for naming requirements.
   */
  async organizationsSettingsGet(name: string, opts: OrganizationsSettingsGetOptions = {}): Promise<GoogleCloudResourcesettingsV1Setting> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }

  /**
   * Lists all the settings that are available on the Cloud resource `parent`.
   *
   * @param parent Required. The project, folder, or organization that is the parent resource for this setting. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async organizationsSettingsList(parent: string, opts: OrganizationsSettingsListOptions = {}): Promise<GoogleCloudResourcesettingsV1ListSettingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/settings`);
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
    return deserializeGoogleCloudResourcesettingsV1ListSettingsResponse(data);
  }

  /**
   * Updates a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.FAILED_PRECONDITION` if the
   * setting is flagged as read only. Returns a `google.rpc.Status` with
   * `google.rpc.Code.ABORTED` if the etag supplied in the request does not
   * match the persisted etag of the setting value. On success, the response
   * will contain only `name`, `local_value` and `etag`. The `metadata` and
   * `effective_value` cannot be updated through this API. Note: the supplied
   * setting will perform a full overwrite of the `local_value` field.
   *
   * @param name The resource name of the setting. Must be in one of the following forms: * `projects/{project_number}/settings/{setting_name}` * `folders/{folder_id}/settings/{setting_name}` * `organizations/{organization_id}/settings/{setting_name}` For example, "/projects/123/settings/gcp-enableMyFeature"
   */
  async organizationsSettingsPatch(name: string, req: GoogleCloudResourcesettingsV1Setting): Promise<GoogleCloudResourcesettingsV1Setting> {
    req = serializeGoogleCloudResourcesettingsV1Setting(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }

  /**
   * Returns a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist.
   *
   * @param name Required. The name of the setting to get. See Setting for naming requirements.
   */
  async projectsSettingsGet(name: string, opts: ProjectsSettingsGetOptions = {}): Promise<GoogleCloudResourcesettingsV1Setting> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }

  /**
   * Lists all the settings that are available on the Cloud resource `parent`.
   *
   * @param parent Required. The project, folder, or organization that is the parent resource for this setting. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async projectsSettingsList(parent: string, opts: ProjectsSettingsListOptions = {}): Promise<GoogleCloudResourcesettingsV1ListSettingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/settings`);
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
    return deserializeGoogleCloudResourcesettingsV1ListSettingsResponse(data);
  }

  /**
   * Updates a specified setting. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the setting does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.FAILED_PRECONDITION` if the
   * setting is flagged as read only. Returns a `google.rpc.Status` with
   * `google.rpc.Code.ABORTED` if the etag supplied in the request does not
   * match the persisted etag of the setting value. On success, the response
   * will contain only `name`, `local_value` and `etag`. The `metadata` and
   * `effective_value` cannot be updated through this API. Note: the supplied
   * setting will perform a full overwrite of the `local_value` field.
   *
   * @param name The resource name of the setting. Must be in one of the following forms: * `projects/{project_number}/settings/{setting_name}` * `folders/{folder_id}/settings/{setting_name}` * `organizations/{organization_id}/settings/{setting_name}` For example, "/projects/123/settings/gcp-enableMyFeature"
   */
  async projectsSettingsPatch(name: string, req: GoogleCloudResourcesettingsV1Setting): Promise<GoogleCloudResourcesettingsV1Setting> {
    req = serializeGoogleCloudResourcesettingsV1Setting(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudResourcesettingsV1Setting(data);
  }
}

/**
 * Additional options for ResourceSettings#foldersSettingsGet.
 */
export interface FoldersSettingsGetOptions {
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}

/**
 * Additional options for ResourceSettings#foldersSettingsList.
 */
export interface FoldersSettingsListOptions {
  /**
   * Unused. The size of the page to be returned.
   */
  pageSize?: number;
  /**
   * Unused. A page token used to retrieve the next page.
   */
  pageToken?: string;
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}

/**
 * The response from ListSettings.
 */
export interface GoogleCloudResourcesettingsV1ListSettingsResponse {
  /**
   * Unused. A page token used to retrieve the next page.
   */
  nextPageToken?: string;
  /**
   * A list of settings that are available at the specified Cloud resource.
   */
  settings?: GoogleCloudResourcesettingsV1Setting[];
}

function serializeGoogleCloudResourcesettingsV1ListSettingsResponse(data: any): GoogleCloudResourcesettingsV1ListSettingsResponse {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (serializeGoogleCloudResourcesettingsV1Setting(item))) : undefined,
  };
}

function deserializeGoogleCloudResourcesettingsV1ListSettingsResponse(data: any): GoogleCloudResourcesettingsV1ListSettingsResponse {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (deserializeGoogleCloudResourcesettingsV1Setting(item))) : undefined,
  };
}

/**
 * The schema for settings.
 */
export interface GoogleCloudResourcesettingsV1Setting {
  /**
   * Output only. The effective value of the setting at the given parent
   * resource, evaluated based on the resource hierarchy The effective value
   * evaluates to one of the following options, in this order. If an option is
   * not valid or doesn't exist, then the next option is used: 1. The local
   * setting value on the given resource: Setting.local_value 2. If one of the
   * given resource's ancestors in the resource hierarchy have a local setting
   * value, the local value at the nearest such ancestor. 3. The setting's
   * default value: SettingMetadata.default_value 4. An empty value, defined as
   * a `Value` with all fields unset. The data type of Value must always be
   * consistent with the data type defined in Setting.metadata.
   */
  readonly effectiveValue?: GoogleCloudResourcesettingsV1Value;
  /**
   * A fingerprint used for optimistic concurrency. See UpdateSetting for more
   * details.
   */
  etag?: string;
  /**
   * The configured value of the setting at the given parent resource, ignoring
   * the resource hierarchy. The data type of Value must always be consistent
   * with the data type defined in Setting.metadata.
   */
  localValue?: GoogleCloudResourcesettingsV1Value;
  /**
   * Output only. Metadata about a setting which is not editable by the end
   * user.
   */
  readonly metadata?: GoogleCloudResourcesettingsV1SettingMetadata;
  /**
   * The resource name of the setting. Must be in one of the following forms: *
   * `projects/{project_number}/settings/{setting_name}` *
   * `folders/{folder_id}/settings/{setting_name}` *
   * `organizations/{organization_id}/settings/{setting_name}` For example,
   * "/projects/123/settings/gcp-enableMyFeature"
   */
  name?: string;
}

function serializeGoogleCloudResourcesettingsV1Setting(data: any): GoogleCloudResourcesettingsV1Setting {
  return {
    ...data,
    localValue: data["localValue"] !== undefined ? serializeGoogleCloudResourcesettingsV1Value(data["localValue"]) : undefined,
  };
}

function deserializeGoogleCloudResourcesettingsV1Setting(data: any): GoogleCloudResourcesettingsV1Setting {
  return {
    ...data,
    effectiveValue: data["effectiveValue"] !== undefined ? deserializeGoogleCloudResourcesettingsV1Value(data["effectiveValue"]) : undefined,
    localValue: data["localValue"] !== undefined ? deserializeGoogleCloudResourcesettingsV1Value(data["localValue"]) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeGoogleCloudResourcesettingsV1SettingMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Metadata about a setting which is not editable by the end user.
 */
export interface GoogleCloudResourcesettingsV1SettingMetadata {
  /**
   * The data type for this setting.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "BOOLEAN" | "STRING" | "STRING_SET" | "ENUM_VALUE" | "DURATION_VALUE" | "STRING_MAP";
  /**
   * The value provided by Setting.effective_value if no setting value is
   * explicitly set. Note: not all settings have a default value.
   */
  defaultValue?: GoogleCloudResourcesettingsV1Value;
  /**
   * A detailed description of what this setting does.
   */
  description?: string;
  /**
   * The human readable name for this setting.
   */
  displayName?: string;
  /**
   * A flag indicating that values of this setting cannot be modified. See
   * documentation for the specific setting for updates and reasons.
   */
  readOnly?: boolean;
}

function serializeGoogleCloudResourcesettingsV1SettingMetadata(data: any): GoogleCloudResourcesettingsV1SettingMetadata {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? serializeGoogleCloudResourcesettingsV1Value(data["defaultValue"]) : undefined,
  };
}

function deserializeGoogleCloudResourcesettingsV1SettingMetadata(data: any): GoogleCloudResourcesettingsV1SettingMetadata {
  return {
    ...data,
    defaultValue: data["defaultValue"] !== undefined ? deserializeGoogleCloudResourcesettingsV1Value(data["defaultValue"]) : undefined,
  };
}

/**
 * The data in a setting value.
 */
export interface GoogleCloudResourcesettingsV1Value {
  /**
   * Defines this value as being a boolean value.
   */
  booleanValue?: boolean;
  /**
   * Defines this value as being a Duration.
   */
  durationValue?: number /* Duration */;
  /**
   * Defines this value as being a Enum.
   */
  enumValue?: GoogleCloudResourcesettingsV1ValueEnumValue;
  /**
   * Defines this value as being a StringMap.
   */
  stringMapValue?: GoogleCloudResourcesettingsV1ValueStringMap;
  /**
   * Defines this value as being a StringSet.
   */
  stringSetValue?: GoogleCloudResourcesettingsV1ValueStringSet;
  /**
   * Defines this value as being a string value.
   */
  stringValue?: string;
}

function serializeGoogleCloudResourcesettingsV1Value(data: any): GoogleCloudResourcesettingsV1Value {
  return {
    ...data,
    durationValue: data["durationValue"] !== undefined ? data["durationValue"] : undefined,
  };
}

function deserializeGoogleCloudResourcesettingsV1Value(data: any): GoogleCloudResourcesettingsV1Value {
  return {
    ...data,
    durationValue: data["durationValue"] !== undefined ? data["durationValue"] : undefined,
  };
}

/**
 * A enum value that can hold any enum type setting values. Each enum type is
 * represented by a number, this representation is stored in the definitions.
 */
export interface GoogleCloudResourcesettingsV1ValueEnumValue {
  /**
   * The value of this enum
   */
  value?: string;
}

/**
 * A string->string map value that can hold a map of string keys to string
 * values. The maximum length of each string is 200 characters and there can be
 * a maximum of 50 key-value pairs in the map.
 */
export interface GoogleCloudResourcesettingsV1ValueStringMap {
  /**
   * The key-value pairs in the map
   */
  mappings?: {
    [key: string]: string
  };
}

/**
 * A string set value that can hold a set of strings. The maximum length of
 * each string is 200 characters and there can be a maximum of 50 strings in the
 * string set.
 */
export interface GoogleCloudResourcesettingsV1ValueStringSet {
  /**
   * The strings in the set
   */
  values?: string[];
}

/**
 * Additional options for ResourceSettings#organizationsSettingsGet.
 */
export interface OrganizationsSettingsGetOptions {
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}

/**
 * Additional options for ResourceSettings#organizationsSettingsList.
 */
export interface OrganizationsSettingsListOptions {
  /**
   * Unused. The size of the page to be returned.
   */
  pageSize?: number;
  /**
   * Unused. A page token used to retrieve the next page.
   */
  pageToken?: string;
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}

/**
 * Additional options for ResourceSettings#projectsSettingsGet.
 */
export interface ProjectsSettingsGetOptions {
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}

/**
 * Additional options for ResourceSettings#projectsSettingsList.
 */
export interface ProjectsSettingsListOptions {
  /**
   * Unused. The size of the page to be returned.
   */
  pageSize?: number;
  /**
   * Unused. A page token used to retrieve the next page.
   */
  pageToken?: string;
  /**
   * The SettingView for this request.
   */
  view?:  | "SETTING_VIEW_UNSPECIFIED" | "SETTING_VIEW_BASIC" | "SETTING_VIEW_EFFECTIVE_VALUE" | "SETTING_VIEW_LOCAL_VALUE";
}