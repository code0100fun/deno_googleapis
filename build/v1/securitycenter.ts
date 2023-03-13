// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Security Command Center API Client for Deno
 * ===========================================
 * 
 * Security Command Center API provides access to temporal views of assets and findings within an organization.
 * 
 * Docs: https://cloud.google.com/security-command-center
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Security Command Center API provides access to temporal views of assets and
 * findings within an organization.
 */
export class SecurityCenter {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://securitycenter.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Filters an organization's assets and groups them by their specified
   * properties.
   *
   * @param parent Required. The name of the parent to group the assets by. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersAssetsGroup(parent: string, req: GroupAssetsRequest): Promise<GroupAssetsResponse> {
    req = serializeGroupAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupAssetsResponse(data);
  }

  /**
   * Lists an organization's assets.
   *
   * @param parent Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersAssetsList(parent: string, opts: FoldersAssetsListOptions = {}): Promise<ListAssetsResponse> {
    opts = serializeFoldersAssetsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAssetsResponse(data);
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async foldersAssetsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: FoldersAssetsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeFoldersAssetsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Creates a BigQuery export.
   *
   * @param parent Required. The name of the parent resource of the new BigQuery export. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersBigQueryExportsCreate(parent: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: FoldersBigQueryExportsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
    if (opts.bigQueryExportId !== undefined) {
      url.searchParams.append("bigQueryExportId", String(opts.bigQueryExportId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Deletes an existing BigQuery export.
   *
   * @param name Required. The name of the BigQuery export to delete. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async foldersBigQueryExportsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a BigQuery export.
   *
   * @param name Required. Name of the BigQuery export to retrieve. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async foldersBigQueryExportsGet(name: string): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Lists BigQuery exports. Note that when requesting BigQuery exports at a
   * given level all exports under that level are also returned e.g. if
   * requesting BigQuery exports under a folder, then all BigQuery exports
   * immediately under the folder plus the ones created under the projects
   * within the folder are returned.
   *
   * @param parent Required. The parent, which owns the collection of BigQuery exports. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async foldersBigQueryExportsList(parent: string, opts: FoldersBigQueryExportsListOptions = {}): Promise<ListBigQueryExportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
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
    return data as ListBigQueryExportsResponse;
  }

  /**
   * Updates a BigQuery export.
   *
   * @param name The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests.
   */
  async foldersBigQueryExportsPatch(name: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: FoldersBigQueryExportsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    opts = serializeFoldersBigQueryExportsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Kicks off an LRO to bulk mute findings for a parent based on a filter. The
   * parent can be either an organization, folder or project. The findings
   * matched by the filter will be muted after the LRO is done.
   *
   * @param parent Required. The parent, at which bulk action needs to be applied. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async foldersFindingsBulkMute(parent: string, req: BulkMuteFindingsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:bulkMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a mute config.
   *
   * @param parent Required. Resource name of the new mute configs's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersMuteConfigsCreate(parent: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: FoldersMuteConfigsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
    if (opts.muteConfigId !== undefined) {
      url.searchParams.append("muteConfigId", String(opts.muteConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Deletes an existing mute config.
   *
   * @param name Required. Name of the mute config to delete. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async foldersMuteConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a mute config.
   *
   * @param name Required. Name of the mute config to retrieve. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async foldersMuteConfigsGet(name: string): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Lists mute configs.
   *
   * @param parent Required. The parent, which owns the collection of mute configs. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async foldersMuteConfigsList(parent: string, opts: FoldersMuteConfigsListOptions = {}): Promise<ListMuteConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
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
    return data as ListMuteConfigsResponse;
  }

  /**
   * Updates a mute config.
   *
   * @param name This field will be ignored if provided on config creation. Format "organizations/{organization}/muteConfigs/{mute_config}" "folders/{folder}/muteConfigs/{mute_config}" "projects/{project}/muteConfigs/{mute_config}"
   */
  async foldersMuteConfigsPatch(name: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: FoldersMuteConfigsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    opts = serializeFoldersMuteConfigsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Creates a notification config.
   *
   * @param parent Required. Resource name of the new notification config's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersNotificationConfigsCreate(parent: string, req: NotificationConfig, opts: FoldersNotificationConfigsCreateOptions = {}): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as NotificationConfig;
  }

  /**
   * Deletes a notification config.
   *
   * @param name Required. Name of the notification config to delete. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async foldersNotificationConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a notification config.
   *
   * @param name Required. Name of the notification config to get. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async foldersNotificationConfigsGet(name: string): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NotificationConfig;
  }

  /**
   * Lists notification configs.
   *
   * @param parent Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersNotificationConfigsList(parent: string, opts: FoldersNotificationConfigsListOptions = {}): Promise<ListNotificationConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
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
    return data as ListNotificationConfigsResponse;
  }

  /**
   * Updates a notification config. The following update fields are allowed:
   * description, pubsub_topic, streaming_config.filter
   *
   * @param name The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket".
   */
  async foldersNotificationConfigsPatch(name: string, req: NotificationConfig, opts: FoldersNotificationConfigsPatchOptions = {}): Promise<NotificationConfig> {
    opts = serializeFoldersNotificationConfigsPatchOptions(opts);
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
    return data as NotificationConfig;
  }

  /**
   * Updates external system. This is for a given finding.
   *
   * @param name Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira"
   */
  async foldersSourcesFindingsExternalSystemsPatch(name: string, req: GoogleCloudSecuritycenterV1ExternalSystem, opts: FoldersSourcesFindingsExternalSystemsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1ExternalSystem> {
    req = serializeGoogleCloudSecuritycenterV1ExternalSystem(req);
    opts = serializeFoldersSourcesFindingsExternalSystemsPatchOptions(opts);
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
    return deserializeGoogleCloudSecuritycenterV1ExternalSystem(data);
  }

  /**
   * Filters an organization or source's findings and groups them by their
   * specified properties. To group across all sources provide a `-` as the
   * source id. Example: /v1/organizations/{organization_id}/sources/-/findings,
   * /v1/folders/{folder_id}/sources/-/findings,
   * /v1/projects/{project_id}/sources/-/findings
   *
   * @param parent Required. Name of the source to groupBy. Its format is "organizations/[organization_id]/sources/[source_id]", folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]. To groupBy across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-, or projects/{project_id}/sources/-
   */
  async foldersSourcesFindingsGroup(parent: string, req: GroupFindingsRequest): Promise<GroupFindingsResponse> {
    req = serializeGroupFindingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupFindingsResponse(data);
  }

  /**
   * Lists an organization or source's findings. To list across all sources
   * provide a `-` as the source id. Example:
   * /v1/organizations/{organization_id}/sources/-/findings
   *
   * @param parent Required. Name of the source the findings belong to. Its format is "organizations/[organization_id]/sources/[source_id], folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]". To list across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/- or projects/{projects_id}/sources/-
   */
  async foldersSourcesFindingsList(parent: string, opts: FoldersSourcesFindingsListOptions = {}): Promise<ListFindingsResponse> {
    opts = serializeFoldersSourcesFindingsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListFindingsResponse(data);
  }

  /**
   * Creates or updates a finding. The corresponding source must exist for a
   * finding creation to succeed.
   *
   * @param name The relative resource name of this finding. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}"
   */
  async foldersSourcesFindingsPatch(name: string, req: Finding, opts: FoldersSourcesFindingsPatchOptions = {}): Promise<Finding> {
    req = serializeFinding(req);
    opts = serializeFoldersSourcesFindingsPatchOptions(opts);
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
    return deserializeFinding(data);
  }

  /**
   * Updates the mute state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async foldersSourcesFindingsSetMute(name: string, req: SetMuteRequest): Promise<Finding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates the state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async foldersSourcesFindingsSetState(name: string, req: SetFindingStateRequest): Promise<Finding> {
    req = serializeSetFindingStateRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:setState`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async foldersSourcesFindingsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: FoldersSourcesFindingsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeFoldersSourcesFindingsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Lists all sources belonging to an organization.
   *
   * @param parent Required. Resource name of the parent of sources to list. Its format should be "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async foldersSourcesList(parent: string, opts: FoldersSourcesListOptions = {}): Promise<ListSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
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
    return data as ListSourcesResponse;
  }

  /**
   * Filters an organization's assets and groups them by their specified
   * properties.
   *
   * @param parent Required. The name of the parent to group the assets by. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsAssetsGroup(parent: string, req: GroupAssetsRequest): Promise<GroupAssetsResponse> {
    req = serializeGroupAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupAssetsResponse(data);
  }

  /**
   * Lists an organization's assets.
   *
   * @param parent Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsAssetsList(parent: string, opts: OrganizationsAssetsListOptions = {}): Promise<ListAssetsResponse> {
    opts = serializeOrganizationsAssetsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAssetsResponse(data);
  }

  /**
   * Runs asset discovery. The discovery is tracked with a long-running
   * operation. This API can only be called with limited frequency for an
   * organization. If it is called too frequently the caller will receive a
   * TOO_MANY_REQUESTS error.
   *
   * @param parent Required. Name of the organization to run asset discovery for. Its format is "organizations/[organization_id]".
   */
  async organizationsAssetsRunDiscovery(parent: string, req: RunAssetDiscoveryRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets:runDiscovery`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async organizationsAssetsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: OrganizationsAssetsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeOrganizationsAssetsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Creates a BigQuery export.
   *
   * @param parent Required. The name of the parent resource of the new BigQuery export. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsBigQueryExportsCreate(parent: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: OrganizationsBigQueryExportsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
    if (opts.bigQueryExportId !== undefined) {
      url.searchParams.append("bigQueryExportId", String(opts.bigQueryExportId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Deletes an existing BigQuery export.
   *
   * @param name Required. The name of the BigQuery export to delete. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async organizationsBigQueryExportsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a BigQuery export.
   *
   * @param name Required. Name of the BigQuery export to retrieve. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async organizationsBigQueryExportsGet(name: string): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Lists BigQuery exports. Note that when requesting BigQuery exports at a
   * given level all exports under that level are also returned e.g. if
   * requesting BigQuery exports under a folder, then all BigQuery exports
   * immediately under the folder plus the ones created under the projects
   * within the folder are returned.
   *
   * @param parent Required. The parent, which owns the collection of BigQuery exports. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async organizationsBigQueryExportsList(parent: string, opts: OrganizationsBigQueryExportsListOptions = {}): Promise<ListBigQueryExportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
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
    return data as ListBigQueryExportsResponse;
  }

  /**
   * Updates a BigQuery export.
   *
   * @param name The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests.
   */
  async organizationsBigQueryExportsPatch(name: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: OrganizationsBigQueryExportsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    opts = serializeOrganizationsBigQueryExportsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Kicks off an LRO to bulk mute findings for a parent based on a filter. The
   * parent can be either an organization, folder or project. The findings
   * matched by the filter will be muted after the LRO is done.
   *
   * @param parent Required. The parent, at which bulk action needs to be applied. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async organizationsFindingsBulkMute(parent: string, req: BulkMuteFindingsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:bulkMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the settings for an organization.
   *
   * @param name Required. Name of the organization to get organization settings for. Its format is "organizations/[organization_id]/organizationSettings".
   */
  async organizationsGetOrganizationSettings(name: string): Promise<OrganizationSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as OrganizationSettings;
  }

  /**
   * Creates a mute config.
   *
   * @param parent Required. Resource name of the new mute configs's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsMuteConfigsCreate(parent: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: OrganizationsMuteConfigsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
    if (opts.muteConfigId !== undefined) {
      url.searchParams.append("muteConfigId", String(opts.muteConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Deletes an existing mute config.
   *
   * @param name Required. Name of the mute config to delete. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async organizationsMuteConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a mute config.
   *
   * @param name Required. Name of the mute config to retrieve. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async organizationsMuteConfigsGet(name: string): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Lists mute configs.
   *
   * @param parent Required. The parent, which owns the collection of mute configs. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async organizationsMuteConfigsList(parent: string, opts: OrganizationsMuteConfigsListOptions = {}): Promise<ListMuteConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
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
    return data as ListMuteConfigsResponse;
  }

  /**
   * Updates a mute config.
   *
   * @param name This field will be ignored if provided on config creation. Format "organizations/{organization}/muteConfigs/{mute_config}" "folders/{folder}/muteConfigs/{mute_config}" "projects/{project}/muteConfigs/{mute_config}"
   */
  async organizationsMuteConfigsPatch(name: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: OrganizationsMuteConfigsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    opts = serializeOrganizationsMuteConfigsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Creates a notification config.
   *
   * @param parent Required. Resource name of the new notification config's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsNotificationConfigsCreate(parent: string, req: NotificationConfig, opts: OrganizationsNotificationConfigsCreateOptions = {}): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as NotificationConfig;
  }

  /**
   * Deletes a notification config.
   *
   * @param name Required. Name of the notification config to delete. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async organizationsNotificationConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a notification config.
   *
   * @param name Required. Name of the notification config to get. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async organizationsNotificationConfigsGet(name: string): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NotificationConfig;
  }

  /**
   * Lists notification configs.
   *
   * @param parent Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsNotificationConfigsList(parent: string, opts: OrganizationsNotificationConfigsListOptions = {}): Promise<ListNotificationConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
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
    return data as ListNotificationConfigsResponse;
  }

  /**
   * Updates a notification config. The following update fields are allowed:
   * description, pubsub_topic, streaming_config.filter
   *
   * @param name The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket".
   */
  async organizationsNotificationConfigsPatch(name: string, req: NotificationConfig, opts: OrganizationsNotificationConfigsPatchOptions = {}): Promise<NotificationConfig> {
    opts = serializeOrganizationsNotificationConfigsPatchOptions(opts);
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
    return data as NotificationConfig;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async organizationsOperationsCancel(name: string): Promise<Empty> {
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
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async organizationsOperationsDelete(name: string): Promise<Empty> {
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
  async organizationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async organizationsOperationsList(name: string, opts: OrganizationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
   * Creates a source.
   *
   * @param parent Required. Resource name of the new source's parent. Its format should be "organizations/[organization_id]".
   */
  async organizationsSourcesCreate(parent: string, req: Source): Promise<Source> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Source;
  }

  /**
   * Creates a finding. The corresponding source must exist for finding
   * creation to succeed.
   *
   * @param parent Required. Resource name of the new finding's parent. Its format should be "organizations/[organization_id]/sources/[source_id]".
   */
  async organizationsSourcesFindingsCreate(parent: string, req: Finding, opts: OrganizationsSourcesFindingsCreateOptions = {}): Promise<Finding> {
    req = serializeFinding(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings`);
    if (opts.findingId !== undefined) {
      url.searchParams.append("findingId", String(opts.findingId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates external system. This is for a given finding.
   *
   * @param name Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira"
   */
  async organizationsSourcesFindingsExternalSystemsPatch(name: string, req: GoogleCloudSecuritycenterV1ExternalSystem, opts: OrganizationsSourcesFindingsExternalSystemsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1ExternalSystem> {
    req = serializeGoogleCloudSecuritycenterV1ExternalSystem(req);
    opts = serializeOrganizationsSourcesFindingsExternalSystemsPatchOptions(opts);
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
    return deserializeGoogleCloudSecuritycenterV1ExternalSystem(data);
  }

  /**
   * Filters an organization or source's findings and groups them by their
   * specified properties. To group across all sources provide a `-` as the
   * source id. Example: /v1/organizations/{organization_id}/sources/-/findings,
   * /v1/folders/{folder_id}/sources/-/findings,
   * /v1/projects/{project_id}/sources/-/findings
   *
   * @param parent Required. Name of the source to groupBy. Its format is "organizations/[organization_id]/sources/[source_id]", folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]. To groupBy across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-, or projects/{project_id}/sources/-
   */
  async organizationsSourcesFindingsGroup(parent: string, req: GroupFindingsRequest): Promise<GroupFindingsResponse> {
    req = serializeGroupFindingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupFindingsResponse(data);
  }

  /**
   * Lists an organization or source's findings. To list across all sources
   * provide a `-` as the source id. Example:
   * /v1/organizations/{organization_id}/sources/-/findings
   *
   * @param parent Required. Name of the source the findings belong to. Its format is "organizations/[organization_id]/sources/[source_id], folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]". To list across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/- or projects/{projects_id}/sources/-
   */
  async organizationsSourcesFindingsList(parent: string, opts: OrganizationsSourcesFindingsListOptions = {}): Promise<ListFindingsResponse> {
    opts = serializeOrganizationsSourcesFindingsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListFindingsResponse(data);
  }

  /**
   * Creates or updates a finding. The corresponding source must exist for a
   * finding creation to succeed.
   *
   * @param name The relative resource name of this finding. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}"
   */
  async organizationsSourcesFindingsPatch(name: string, req: Finding, opts: OrganizationsSourcesFindingsPatchOptions = {}): Promise<Finding> {
    req = serializeFinding(req);
    opts = serializeOrganizationsSourcesFindingsPatchOptions(opts);
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
    return deserializeFinding(data);
  }

  /**
   * Updates the mute state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async organizationsSourcesFindingsSetMute(name: string, req: SetMuteRequest): Promise<Finding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates the state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async organizationsSourcesFindingsSetState(name: string, req: SetFindingStateRequest): Promise<Finding> {
    req = serializeSetFindingStateRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:setState`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async organizationsSourcesFindingsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: OrganizationsSourcesFindingsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeOrganizationsSourcesFindingsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Gets a source.
   *
   * @param name Required. Relative resource name of the source. Its format is "organizations/[organization_id]/source/[source_id]".
   */
  async organizationsSourcesGet(name: string): Promise<Source> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Source;
  }

  /**
   * Gets the access control policy on the specified Source.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsSourcesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists all sources belonging to an organization.
   *
   * @param parent Required. Resource name of the parent of sources to list. Its format should be "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async organizationsSourcesList(parent: string, opts: OrganizationsSourcesListOptions = {}): Promise<ListSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
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
    return data as ListSourcesResponse;
  }

  /**
   * Updates a source.
   *
   * @param name The relative resource name of this source. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}"
   */
  async organizationsSourcesPatch(name: string, req: Source, opts: OrganizationsSourcesPatchOptions = {}): Promise<Source> {
    opts = serializeOrganizationsSourcesPatchOptions(opts);
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
    return data as Source;
  }

  /**
   * Sets the access control policy on the specified Source.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsSourcesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns the permissions that a caller has on the specified source.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsSourcesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates an organization's settings.
   *
   * @param name The relative resource name of the settings. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/organizationSettings".
   */
  async organizationsUpdateOrganizationSettings(name: string, req: OrganizationSettings, opts: OrganizationsUpdateOrganizationSettingsOptions = {}): Promise<OrganizationSettings> {
    opts = serializeOrganizationsUpdateOrganizationSettingsOptions(opts);
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
    return data as OrganizationSettings;
  }

  /**
   * Filters an organization's assets and groups them by their specified
   * properties.
   *
   * @param parent Required. The name of the parent to group the assets by. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsAssetsGroup(parent: string, req: GroupAssetsRequest): Promise<GroupAssetsResponse> {
    req = serializeGroupAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupAssetsResponse(data);
  }

  /**
   * Lists an organization's assets.
   *
   * @param parent Required. The name of the parent resource that contains the assets. The value that you can specify on parent depends on the method in which you specify parent. You can specify one of the following values: "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsAssetsList(parent: string, opts: ProjectsAssetsListOptions = {}): Promise<ListAssetsResponse> {
    opts = serializeProjectsAssetsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAssetsResponse(data);
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async projectsAssetsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: ProjectsAssetsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeProjectsAssetsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Creates a BigQuery export.
   *
   * @param parent Required. The name of the parent resource of the new BigQuery export. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsBigQueryExportsCreate(parent: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: ProjectsBigQueryExportsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
    if (opts.bigQueryExportId !== undefined) {
      url.searchParams.append("bigQueryExportId", String(opts.bigQueryExportId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Deletes an existing BigQuery export.
   *
   * @param name Required. The name of the BigQuery export to delete. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async projectsBigQueryExportsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a BigQuery export.
   *
   * @param name Required. Name of the BigQuery export to retrieve. Its format is organizations/{organization}/bigQueryExports/{export_id}, folders/{folder}/bigQueryExports/{export_id}, or projects/{project}/bigQueryExports/{export_id}
   */
  async projectsBigQueryExportsGet(name: string): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Lists BigQuery exports. Note that when requesting BigQuery exports at a
   * given level all exports under that level are also returned e.g. if
   * requesting BigQuery exports under a folder, then all BigQuery exports
   * immediately under the folder plus the ones created under the projects
   * within the folder are returned.
   *
   * @param parent Required. The parent, which owns the collection of BigQuery exports. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async projectsBigQueryExportsList(parent: string, opts: ProjectsBigQueryExportsListOptions = {}): Promise<ListBigQueryExportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bigQueryExports`);
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
    return data as ListBigQueryExportsResponse;
  }

  /**
   * Updates a BigQuery export.
   *
   * @param name The relative resource name of this export. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name. Example format: "organizations/{organization_id}/bigQueryExports/{export_id}" Example format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format: "projects/{project_id}/bigQueryExports/{export_id}" This field is provided in responses, and is ignored when provided in create requests.
   */
  async projectsBigQueryExportsPatch(name: string, req: GoogleCloudSecuritycenterV1BigQueryExport, opts: ProjectsBigQueryExportsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1BigQueryExport> {
    opts = serializeProjectsBigQueryExportsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1BigQueryExport;
  }

  /**
   * Kicks off an LRO to bulk mute findings for a parent based on a filter. The
   * parent can be either an organization, folder or project. The findings
   * matched by the filter will be muted after the LRO is done.
   *
   * @param parent Required. The parent, at which bulk action needs to be applied. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async projectsFindingsBulkMute(parent: string, req: BulkMuteFindingsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:bulkMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a mute config.
   *
   * @param parent Required. Resource name of the new mute configs's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsMuteConfigsCreate(parent: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: ProjectsMuteConfigsCreateOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
    if (opts.muteConfigId !== undefined) {
      url.searchParams.append("muteConfigId", String(opts.muteConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Deletes an existing mute config.
   *
   * @param name Required. Name of the mute config to delete. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async projectsMuteConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a mute config.
   *
   * @param name Required. Name of the mute config to retrieve. Its format is organizations/{organization}/muteConfigs/{config_id}, folders/{folder}/muteConfigs/{config_id}, or projects/{project}/muteConfigs/{config_id}
   */
  async projectsMuteConfigsGet(name: string): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Lists mute configs.
   *
   * @param parent Required. The parent, which owns the collection of mute configs. Its format is "organizations/[organization_id]", "folders/[folder_id]", "projects/[project_id]".
   */
  async projectsMuteConfigsList(parent: string, opts: ProjectsMuteConfigsListOptions = {}): Promise<ListMuteConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/muteConfigs`);
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
    return data as ListMuteConfigsResponse;
  }

  /**
   * Updates a mute config.
   *
   * @param name This field will be ignored if provided on config creation. Format "organizations/{organization}/muteConfigs/{mute_config}" "folders/{folder}/muteConfigs/{mute_config}" "projects/{project}/muteConfigs/{mute_config}"
   */
  async projectsMuteConfigsPatch(name: string, req: GoogleCloudSecuritycenterV1MuteConfig, opts: ProjectsMuteConfigsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1MuteConfig> {
    opts = serializeProjectsMuteConfigsPatchOptions(opts);
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
    return data as GoogleCloudSecuritycenterV1MuteConfig;
  }

  /**
   * Creates a notification config.
   *
   * @param parent Required. Resource name of the new notification config's parent. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsNotificationConfigsCreate(parent: string, req: NotificationConfig, opts: ProjectsNotificationConfigsCreateOptions = {}): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as NotificationConfig;
  }

  /**
   * Deletes a notification config.
   *
   * @param name Required. Name of the notification config to delete. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async projectsNotificationConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a notification config.
   *
   * @param name Required. Name of the notification config to get. Its format is "organizations/[organization_id]/notificationConfigs/[config_id]", "folders/[folder_id]/notificationConfigs/[config_id]", or "projects/[project_id]/notificationConfigs/[config_id]".
   */
  async projectsNotificationConfigsGet(name: string): Promise<NotificationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NotificationConfig;
  }

  /**
   * Lists notification configs.
   *
   * @param parent Required. The name of the parent in which to list the notification configurations. Its format is "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsNotificationConfigsList(parent: string, opts: ProjectsNotificationConfigsListOptions = {}): Promise<ListNotificationConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notificationConfigs`);
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
    return data as ListNotificationConfigsResponse;
  }

  /**
   * Updates a notification config. The following update fields are allowed:
   * description, pubsub_topic, streaming_config.filter
   *
   * @param name The relative resource name of this notification config. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/notificationConfigs/notify_public_bucket", "folders/{folder_id}/notificationConfigs/notify_public_bucket", or "projects/{project_id}/notificationConfigs/notify_public_bucket".
   */
  async projectsNotificationConfigsPatch(name: string, req: NotificationConfig, opts: ProjectsNotificationConfigsPatchOptions = {}): Promise<NotificationConfig> {
    opts = serializeProjectsNotificationConfigsPatchOptions(opts);
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
    return data as NotificationConfig;
  }

  /**
   * Updates external system. This is for a given finding.
   *
   * @param name Full resource name of the external system, for example: "organizations/1234/sources/5678/findings/123456/externalSystems/jira", "folders/1234/sources/5678/findings/123456/externalSystems/jira", "projects/1234/sources/5678/findings/123456/externalSystems/jira"
   */
  async projectsSourcesFindingsExternalSystemsPatch(name: string, req: GoogleCloudSecuritycenterV1ExternalSystem, opts: ProjectsSourcesFindingsExternalSystemsPatchOptions = {}): Promise<GoogleCloudSecuritycenterV1ExternalSystem> {
    req = serializeGoogleCloudSecuritycenterV1ExternalSystem(req);
    opts = serializeProjectsSourcesFindingsExternalSystemsPatchOptions(opts);
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
    return deserializeGoogleCloudSecuritycenterV1ExternalSystem(data);
  }

  /**
   * Filters an organization or source's findings and groups them by their
   * specified properties. To group across all sources provide a `-` as the
   * source id. Example: /v1/organizations/{organization_id}/sources/-/findings,
   * /v1/folders/{folder_id}/sources/-/findings,
   * /v1/projects/{project_id}/sources/-/findings
   *
   * @param parent Required. Name of the source to groupBy. Its format is "organizations/[organization_id]/sources/[source_id]", folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]. To groupBy across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/-, or projects/{project_id}/sources/-
   */
  async projectsSourcesFindingsGroup(parent: string, req: GroupFindingsRequest): Promise<GroupFindingsResponse> {
    req = serializeGroupFindingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings:group`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGroupFindingsResponse(data);
  }

  /**
   * Lists an organization or source's findings. To list across all sources
   * provide a `-` as the source id. Example:
   * /v1/organizations/{organization_id}/sources/-/findings
   *
   * @param parent Required. Name of the source the findings belong to. Its format is "organizations/[organization_id]/sources/[source_id], folders/[folder_id]/sources/[source_id], or projects/[project_id]/sources/[source_id]". To list across all sources provide a source_id of `-`. For example: organizations/{organization_id}/sources/-, folders/{folder_id}/sources/- or projects/{projects_id}/sources/-
   */
  async projectsSourcesFindingsList(parent: string, opts: ProjectsSourcesFindingsListOptions = {}): Promise<ListFindingsResponse> {
    opts = serializeProjectsSourcesFindingsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/findings`);
    if (opts.compareDuration !== undefined) {
      url.searchParams.append("compareDuration", String(opts.compareDuration));
    }
    if (opts.fieldMask !== undefined) {
      url.searchParams.append("fieldMask", String(opts.fieldMask));
    }
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
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListFindingsResponse(data);
  }

  /**
   * Creates or updates a finding. The corresponding source must exist for a
   * finding creation to succeed.
   *
   * @param name The relative resource name of this finding. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}"
   */
  async projectsSourcesFindingsPatch(name: string, req: Finding, opts: ProjectsSourcesFindingsPatchOptions = {}): Promise<Finding> {
    req = serializeFinding(req);
    opts = serializeProjectsSourcesFindingsPatchOptions(opts);
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
    return deserializeFinding(data);
  }

  /**
   * Updates the mute state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async projectsSourcesFindingsSetMute(name: string, req: SetMuteRequest): Promise<Finding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates the state of a finding.
   *
   * @param name Required. The [relative resource name](https://cloud.google.com/apis/design/resource_names#relative_resource_name) of the finding. Example: "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}", "folders/{folder_id}/sources/{source_id}/findings/{finding_id}", "projects/{project_id}/sources/{source_id}/findings/{finding_id}".
   */
  async projectsSourcesFindingsSetState(name: string, req: SetFindingStateRequest): Promise<Finding> {
    req = serializeSetFindingStateRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:setState`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFinding(data);
  }

  /**
   * Updates security marks.
   *
   * @param name The relative resource name of the SecurityMarks. See: https://cloud.google.com/apis/design/resource_names#relative_resource_name Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks" "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  async projectsSourcesFindingsUpdateSecurityMarks(name: string, req: SecurityMarks, opts: ProjectsSourcesFindingsUpdateSecurityMarksOptions = {}): Promise<SecurityMarks> {
    opts = serializeProjectsSourcesFindingsUpdateSecurityMarksOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SecurityMarks;
  }

  /**
   * Lists all sources belonging to an organization.
   *
   * @param parent Required. Resource name of the parent of sources to list. Its format should be "organizations/[organization_id]", "folders/[folder_id]", or "projects/[project_id]".
   */
  async projectsSourcesList(parent: string, opts: ProjectsSourcesListOptions = {}): Promise<ListSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
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
    return data as ListSourcesResponse;
  }
}

/**
 * Represents an access event.
 */
export interface Access {
  /**
   * Caller's IP address, such as "1.1.1.1".
   */
  callerIp?: string;
  /**
   * The caller IP's geolocation, which identifies where the call came from.
   */
  callerIpGeo?: Geolocation;
  /**
   * The method that the service account called, e.g. "SetIamPolicy".
   */
  methodName?: string;
  /**
   * Associated email, such as "foo@google.com". The email address of the
   * authenticated user (or service account on behalf of third party principal)
   * making the request. For third party identity callers, the
   * `principal_subject` field is populated instead of this field. For privacy
   * reasons, the principal email address is sometimes redacted. For more
   * information, see [Caller identities in audit
   * logs](https://cloud.google.com/logging/docs/audit#user-id).
   */
  principalEmail?: string;
  /**
   * A string representing the principal_subject associated with the identity.
   * As compared to `principal_email`, supports principals that aren't
   * associated with email addresses, such as third party principals. For most
   * identities, the format will be `principal://iam.googleapis.com/{identity
   * pool name}/subjects/{subject}` except for some GKE identities
   * (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy
   * format `serviceAccount:{identity pool name}[{subject}]`
   */
  principalSubject?: string;
  /**
   * Identity delegation history of an authenticated service account that makes
   * the request. It contains information on the real authorities that try to
   * access GCP resources by delegating on a service account. When multiple
   * authorities are present, they are guaranteed to be sorted based on the
   * original ordering of the identity delegation events.
   */
  serviceAccountDelegationInfo?: ServiceAccountDelegationInfo[];
  /**
   * The name of the service account key used to create or exchange credentials
   * for authenticating the service account making the request. This is a
   * scheme-less URI full resource name. For example:
   * "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}"
   * 
   */
  serviceAccountKeyName?: string;
  /**
   * This is the API service that the service account made a call to, e.g.
   * "iam.googleapis.com"
   */
  serviceName?: string;
  /**
   * What kind of user agent is associated, for example operating system
   * shells, embedded or stand-alone applications, etc.
   */
  userAgentFamily?: string;
  /**
   * A string that represents the username of a user, user account, or other
   * entity involved in the access event. What the entity is and what its role
   * in the access event is depends on the finding that this field appears in.
   * The entity is likely not an IAM principal, but could be a user that is
   * logged into an operating system, if the finding is VM-related, or a user
   * that is logged into some type of application that is involved in the access
   * event.
   */
  userName?: string;
}

/**
 * Conveys information about a Kubernetes access review (e.g. kubectl auth
 * can-i ...) that was involved in a finding.
 */
export interface AccessReview {
  /**
   * Group is the API Group of the Resource. "*" means all.
   */
  group?: string;
  /**
   * Name is the name of the resource being requested. Empty means all.
   */
  name?: string;
  /**
   * Namespace of the action being requested. Currently, there is no
   * distinction between no namespace and all namespaces. Both are represented
   * by "" (empty).
   */
  ns?: string;
  /**
   * Resource is the optional resource type requested. "*" means all.
   */
  resource?: string;
  /**
   * Subresource is the optional subresource type.
   */
  subresource?: string;
  /**
   * Verb is a Kubernetes resource API verb, like: get, list, watch, create,
   * update, delete, proxy. "*" means all.
   */
  verb?: string;
  /**
   * Version is the API Version of the Resource. "*" means all.
   */
  version?: string;
}

/**
 * Security Command Center representation of a Google Cloud resource. The Asset
 * is a Security Command Center resource that captures information about a
 * single Google Cloud resource. All modifications to an Asset are only within
 * the context of Security Command Center and don't affect the referenced Google
 * Cloud resource.
 */
export interface Asset {
  /**
   * The canonical name of the resource. It's either
   * "organizations/{organization_id}/assets/{asset_id}",
   * "folders/{folder_id}/assets/{asset_id}" or
   * "projects/{project_number}/assets/{asset_id}", depending on the closest CRM
   * ancestor of the resource.
   */
  canonicalName?: string;
  /**
   * The time at which the asset was created in Security Command Center.
   */
  createTime?: Date;
  /**
   * Cloud IAM Policy information associated with the Google Cloud resource
   * described by the Security Command Center asset. This information is managed
   * and defined by the Google Cloud resource and cannot be modified by the
   * user.
   */
  iamPolicy?: IamPolicy;
  /**
   * The relative resource name of this asset. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example: "organizations/{organization_id}/assets/{asset_id}".
   */
  name?: string;
  /**
   * Resource managed properties. These properties are managed and defined by
   * the Google Cloud resource and cannot be modified by the user.
   */
  resourceProperties?: {
    [key: string]: any
  };
  /**
   * Security Command Center managed properties. These properties are managed
   * by Security Command Center and cannot be modified by the user.
   */
  securityCenterProperties?: SecurityCenterProperties;
  /**
   * User specified security marks. These marks are entirely managed by the
   * user and come from the SecurityMarks resource that belongs to the asset.
   */
  securityMarks?: SecurityMarks;
  /**
   * The time at which the asset was last updated or added in Cloud SCC.
   */
  updateTime?: Date;
}

function serializeAsset(data: any): Asset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAsset(data: any): Asset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The configuration used for Asset Discovery runs.
 */
export interface AssetDiscoveryConfig {
  /**
   * The folder ids to use for filtering asset discovery. It consists of only
   * digits, e.g., 756619654966.
   */
  folderIds?: string[];
  /**
   * The mode to use for filtering asset discovery.
   */
  inclusionMode?:  | "INCLUSION_MODE_UNSPECIFIED" | "INCLUDE_ONLY" | "EXCLUDE";
  /**
   * The project ids to use for filtering asset discovery.
   */
  projectIds?: string[];
}

/**
 * A finding that is associated with this node in the exposure path.
 */
export interface AssociatedFinding {
  /**
   * Canonical name of the associated findings. Example:
   * organizations/123/sources/456/findings/789
   */
  canonicalFindingName?: string;
  /**
   * The additional taxonomy group within findings from a given source.
   */
  findingCategory?: string;
  /**
   * Full resource name of the finding.
   */
  name?: string;
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
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
 * Request message for bulk findings update. Note: 1. If multiple bulk update
 * requests match the same resource, the order in which they get executed is not
 * defined. 2. Once a bulk operation is started, there is no way to stop it.
 */
export interface BulkMuteFindingsRequest {
  /**
   * Expression that identifies findings that should be updated. The expression
   * is a list of zero or more restrictions combined via logical operators `AND`
   * and `OR`. Parentheses are supported, and `OR` has higher precedence than
   * `AND`. Restrictions have the form ` ` and may have a `-` character in front
   * of them to indicate negation. The fields map to those defined in the
   * corresponding resource. The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes.
   */
  filter?: string;
  /**
   * This can be a mute configuration name or any identifier for mute/unmute of
   * findings based on the filter.
   */
  muteAnnotation?: string;
}

/**
 * Contains compliance information about a security standard indicating unmet
 * recommendations.
 */
export interface Compliance {
  /**
   * Policies within the standard/benchmark e.g. A.12.4.1
   */
  ids?: string[];
  /**
   * Refers to industry wide standards or benchmarks e.g. "cis", "pci",
   * "owasp", etc.
   */
  standard?: string;
  /**
   * Version of the standard/benchmark e.g. 1.1
   */
  version?: string;
}

/**
 * Contains information about the IP connection associated with the finding.
 */
export interface Connection {
  /**
   * Destination IP address. Not present for sockets that are listening and not
   * connected.
   */
  destinationIp?: string;
  /**
   * Destination port. Not present for sockets that are listening and not
   * connected.
   */
  destinationPort?: number;
  /**
   * IANA Internet Protocol Number such as TCP(6) and UDP(17).
   */
  protocol?:  | "PROTOCOL_UNSPECIFIED" | "ICMP" | "TCP" | "UDP" | "GRE" | "ESP";
  /**
   * Source IP address.
   */
  sourceIp?: string;
  /**
   * Source port.
   */
  sourcePort?: number;
}

/**
 * The email address of a contact.
 */
export interface Contact {
  /**
   * An email address. For example, "`person123@company.com`".
   */
  email?: string;
}

/**
 * The details pertaining to specific contacts
 */
export interface ContactDetails {
  /**
   * A list of contacts
   */
  contacts?: Contact[];
}

/**
 * Container associated with the finding.
 */
export interface Container {
  /**
   * Optional container image id, when provided by the container runtime.
   * Uniquely identifies the container image launched using a container image
   * digest.
   */
  imageId?: string;
  /**
   * Container labels, as provided by the container runtime.
   */
  labels?: Label[];
  /**
   * Container name.
   */
  name?: string;
  /**
   * Container image URI provided when configuring a pod/container. May
   * identify a container image version using mutable tags.
   */
  uri?: string;
}

/**
 * CVE stands for Common Vulnerabilities and Exposures. More information:
 * https://cve.mitre.org
 */
export interface Cve {
  /**
   * Describe Common Vulnerability Scoring System specified at
   * https://www.first.org/cvss/v3.1/specification-document
   */
  cvssv3?: Cvssv3;
  /**
   * The unique identifier for the vulnerability. e.g. CVE-2021-34527
   */
  id?: string;
  /**
   * Additional information about the CVE. e.g.
   * https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527
   */
  references?: Reference[];
  /**
   * Whether upstream fix is available for the CVE.
   */
  upstreamFixAvailable?: boolean;
}

/**
 * Common Vulnerability Scoring System version 3.
 */
export interface Cvssv3 {
  /**
   * This metric describes the conditions beyond the attacker's control that
   * must exist in order to exploit the vulnerability.
   */
  attackComplexity?:  | "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH";
  /**
   * Base Metrics Represents the intrinsic characteristics of a vulnerability
   * that are constant over time and across user environments. This metric
   * reflects the context by which vulnerability exploitation is possible.
   */
  attackVector?:  | "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL";
  /**
   * This metric measures the impact to the availability of the impacted
   * component resulting from a successfully exploited vulnerability.
   */
  availabilityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * The base score is a function of the base metric scores.
   */
  baseScore?: number;
  /**
   * This metric measures the impact to the confidentiality of the information
   * resources managed by a software component due to a successfully exploited
   * vulnerability.
   */
  confidentialityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * This metric measures the impact to integrity of a successfully exploited
   * vulnerability.
   */
  integrityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * This metric describes the level of privileges an attacker must possess
   * before successfully exploiting the vulnerability.
   */
  privilegesRequired?:  | "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH";
  /**
   * The Scope metric captures whether a vulnerability in one vulnerable
   * component impacts resources in components beyond its security scope.
   */
  scope?:  | "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED";
  /**
   * This metric captures the requirement for a human user, other than the
   * attacker, to participate in the successful compromise of the vulnerable
   * component.
   */
  userInteraction?:  | "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED";
}

/**
 * Represents database access information, such as queries. A database may be a
 * sub-resource of an instance (as in the case of CloudSQL instances or Cloud
 * Spanner instances), or the database instance itself. Some database resources
 * may not have the full resource name populated because these resource types
 * are not yet supported by Cloud Asset Inventory (e.g. CloudSQL databases). In
 * these cases only the display name will be provided.
 */
export interface Database {
  /**
   * The human readable name of the database the user connected to.
   */
  displayName?: string;
  /**
   * The target usernames/roles/groups of a SQL privilege grant (not an IAM
   * policy change).
   */
  grantees?: string[];
  /**
   * The full resource name of the database the user connected to, if it is
   * supported by CAI. (https://google.aip.dev/122#full-resource-names)
   */
  name?: string;
  /**
   * The SQL statement associated with the relevant access.
   */
  query?: string;
  /**
   * The username used to connect to the DB. This may not necessarily be an IAM
   * principal, and has no required format.
   */
  userName?: string;
}

/**
 * Memory hash detection contributing to the binary family match.
 */
export interface Detection {
  /**
   * The name of the binary associated with the memory hash signature
   * detection.
   */
  binary?: string;
  /**
   * The percentage of memory page hashes in the signature that were matched.
   */
  percentPagesMatched?: number;
}

/**
 * Represents a connection between a source node and a destination node in this
 * exposure path.
 */
export interface Edge {
  /**
   * This is the resource name of the destination node.
   */
  destination?: string;
  /**
   * This is the resource name of the source node.
   */
  source?: string;
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
 * EnvironmentVariable is a name-value pair to store environment variables for
 * Process.
 */
export interface EnvironmentVariable {
  /**
   * Environment variable name as a JSON encoded string.
   */
  name?: string;
  /**
   * Environment variable value as a JSON encoded string.
   */
  val?: string;
}

/**
 * Resource that has been exfiltrated or exfiltrated_to.
 */
export interface ExfilResource {
  /**
   * Subcomponents of the asset that is exfiltrated - these could be URIs used
   * during exfiltration, table names, databases, filenames, etc. For example,
   * multiple tables may be exfiltrated from the same CloudSQL instance, or
   * multiple files from the same Cloud Storage bucket.
   */
  components?: string[];
  /**
   * Resource's URI (https://google.aip.dev/122#full-resource-names)
   */
  name?: string;
}

/**
 * Exfiltration represents a data exfiltration attempt of one or more sources
 * to one or more targets. Sources represent the source of data that is
 * exfiltrated, and Targets represents the destination the data was copied to.
 */
export interface Exfiltration {
  /**
   * If there are multiple sources, then the data is considered "joined"
   * between them. For instance, BigQuery can join multiple tables, and each
   * table would be considered a source.
   */
  sources?: ExfilResource[];
  /**
   * If there are multiple targets, each target would get a complete copy of
   * the "joined" source data.
   */
  targets?: ExfilResource[];
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
 * File information about the related binary/library used by an executable, or
 * the script used by a script interpreter
 */
export interface File {
  /**
   * Prefix of the file contents as a JSON encoded string. (Currently only
   * populated for Malicious Script Executed findings.)
   */
  contents?: string;
  /**
   * The length in bytes of the file prefix that was hashed. If hashed_size ==
   * size, any hashes reported represent the entire file.
   */
  hashedSize?: bigint;
  /**
   * True when the hash covers only a prefix of the file.
   */
  partiallyHashed?: boolean;
  /**
   * Absolute path of the file as a JSON encoded string.
   */
  path?: string;
  /**
   * SHA256 hash of the first hashed_size bytes of the file encoded as a hex
   * string. If hashed_size == size, sha256 represents the SHA256 hash of the
   * entire file.
   */
  sha256?: string;
  /**
   * Size of the file in bytes.
   */
  size?: bigint;
}

function serializeFile(data: any): File {
  return {
    ...data,
    hashedSize: data["hashedSize"] !== undefined ? String(data["hashedSize"]) : undefined,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
  };
}

function deserializeFile(data: any): File {
  return {
    ...data,
    hashedSize: data["hashedSize"] !== undefined ? BigInt(data["hashedSize"]) : undefined,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
  };
}

/**
 * Security Command Center finding. A finding is a record of assessment data
 * like security, risk, health, or privacy, that is ingested into Security
 * Command Center for presentation, notification, analysis, policy testing, and
 * enforcement. For example, a cross-site scripting (XSS) vulnerability in an
 * App Engine application is a finding.
 */
export interface Finding {
  /**
   * Access details associated to the Finding, such as more information on the
   * caller, which method was accessed, from where, etc.
   */
  access?: Access;
  /**
   * The canonical name of the finding. It's either
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}",
   * "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or
   * "projects/{project_number}/sources/{source_id}/findings/{finding_id}",
   * depending on the closest CRM ancestor of the resource associated with the
   * finding.
   */
  canonicalName?: string;
  /**
   * The additional taxonomy group within findings from a given source. This
   * field is immutable after creation time. Example: "XSS_FLASH_INJECTION"
   */
  category?: string;
  /**
   * Contains compliance information for security standards associated to the
   * finding.
   */
  compliances?: Compliance[];
  /**
   * Contains information about the IP connection associated with the finding.
   */
  connections?: Connection[];
  /**
   * Output only. Map containing the points of contact for the given finding.
   * The key represents the type of contact, while the value contains a list of
   * all the contacts that pertain. Please refer to:
   * https://cloud.google.com/resource-manager/docs/managing-notification-contacts#notification-categories
   * { "security": { "contacts": [ { "email": "person1@company.com" }, {
   * "email": "person2@company.com" } ] } }
   */
  readonly contacts?: {
    [key: string]: ContactDetails
  };
  /**
   * Containers associated with the finding. containers provides information
   * for both Kubernetes and non-Kubernetes containers.
   */
  containers?: Container[];
  /**
   * The time at which the finding was created in Security Command Center.
   */
  createTime?: Date;
  /**
   * Database associated with the finding.
   */
  database?: Database;
  /**
   * Contains more detail about the finding.
   */
  description?: string;
  /**
   * The time the finding was first detected. If an existing finding is
   * updated, then this is the time the update occurred. For example, if the
   * finding represents an open firewall, this property captures the time the
   * detector believes the firewall became open. The accuracy is determined by
   * the detector. If the finding is later resolved, then this time reflects
   * when the finding was resolved. This must not be set to a value greater than
   * the current timestamp.
   */
  eventTime?: Date;
  /**
   * Represents exfiltration associated with the Finding.
   */
  exfiltration?: Exfiltration;
  /**
   * Output only. Third party SIEM/SOAR fields within SCC, contains external
   * system information and external system finding fields.
   */
  readonly externalSystems?: {
    [key: string]: GoogleCloudSecuritycenterV1ExternalSystem
  };
  /**
   * The URI that, if available, points to a web page outside of Security
   * Command Center where additional information about the finding can be found.
   * This field is guaranteed to be either empty or a well formed URL.
   */
  externalUri?: string;
  /**
   * File associated with the finding.
   */
  files?: File[];
  /**
   * The class of the finding.
   */
  findingClass?:  | "FINDING_CLASS_UNSPECIFIED" | "THREAT" | "VULNERABILITY" | "MISCONFIGURATION" | "OBSERVATION" | "SCC_ERROR";
  /**
   * Represents IAM bindings associated with the Finding.
   */
  iamBindings?: IamBinding[];
  /**
   * Represents what's commonly known as an Indicator of compromise (IoC) in
   * computer forensics. This is an artifact observed on a network or in an
   * operating system that, with high confidence, indicates a computer
   * intrusion. Reference: https://en.wikipedia.org/wiki/Indicator_of_compromise
   */
  indicator?: Indicator;
  /**
   * Kernel Rootkit signature.
   */
  kernelRootkit?: KernelRootkit;
  /**
   * Kubernetes resources associated with the finding.
   */
  kubernetes?: Kubernetes;
  /**
   * MITRE ATT&CK tactics and techniques related to this finding. See:
   * https://attack.mitre.org
   */
  mitreAttack?: MitreAttack;
  /**
   * Indicates the mute state of a finding (either muted, unmuted or
   * undefined). Unlike other attributes of a finding, a finding provider
   * shouldn't set the value of mute.
   */
  mute?:  | "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED";
  /**
   * First known as mute_annotation. Records additional information about the
   * mute operation e.g. mute config that muted the finding, user who muted the
   * finding, etc. Unlike other attributes of a finding, a finding provider
   * shouldn't set the value of mute.
   */
  muteInitiator?: string;
  /**
   * Output only. The most recent time this finding was muted or unmuted.
   */
  readonly muteUpdateTime?: Date;
  /**
   * The relative resource name of this finding. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example:
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}"
   */
  name?: string;
  /**
   * Next steps associate to the finding.
   */
  nextSteps?: string;
  /**
   * The relative resource name of the source the finding belongs to. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * This field is immutable after creation time. For example:
   * "organizations/{organization_id}/sources/{source_id}"
   */
  parent?: string;
  /**
   * Output only. The human readable display name of the finding source such as
   * "Event Threat Detection" or "Security Health Analytics".
   */
  readonly parentDisplayName?: string;
  /**
   * Represents operating system processes associated with the Finding.
   */
  processes?: Process[];
  /**
   * For findings on Google Cloud resources, the full resource name of the
   * Google Cloud resource this finding is for. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name When
   * the finding is for a non-Google Cloud resource, the resourceName can be a
   * customer or partner defined string. This field is immutable after creation
   * time.
   */
  resourceName?: string;
  /**
   * Output only. User specified security marks. These marks are entirely
   * managed by the user and come from the SecurityMarks resource that belongs
   * to the finding.
   */
  readonly securityMarks?: SecurityMarks;
  /**
   * The severity of the finding. This field is managed by the source that
   * writes the finding.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  /**
   * Source specific properties. These properties are managed by the source
   * that writes the finding. The key names in the source_properties map must be
   * between 1 and 255 characters, and must start with a letter and contain
   * alphanumeric characters or underscores only.
   */
  sourceProperties?: {
    [key: string]: any
  };
  /**
   * The state of the finding.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE";
  /**
   * Represents vulnerability-specific fields like CVE and CVSS scores. CVE
   * stands for Common Vulnerabilities and Exposures
   * (https://cve.mitre.org/about/)
   */
  vulnerability?: Vulnerability;
}

function serializeFinding(data: any): Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeFile(item))) : undefined,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (serializeProcess(item))) : undefined,
  };
}

function deserializeFinding(data: any): Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
    externalSystems: data["externalSystems"] !== undefined ? Object.fromEntries(Object.entries(data["externalSystems"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudSecuritycenterV1ExternalSystem(v)]))) : undefined,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeFile(item))) : undefined,
    muteUpdateTime: data["muteUpdateTime"] !== undefined ? new Date(data["muteUpdateTime"]) : undefined,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (deserializeProcess(item))) : undefined,
  };
}

/**
 * Message that contains the resource name and display name of a folder
 * resource.
 */
export interface Folder {
  /**
   * Full resource name of this folder. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resourceFolder?: string;
  /**
   * The user defined display name for this folder.
   */
  resourceFolderDisplayName?: string;
}

/**
 * Additional options for SecurityCenter#foldersAssetsList.
 */
export interface FoldersAssetsListOptions {
  /**
   * When compare_duration is set, the ListAssetsResult's "state_change"
   * attribute is updated to indicate whether the asset was added, removed, or
   * remained present during the compare_duration period of time that precedes
   * the read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence of the
   * asset at the two points in time. Intermediate state changes between the two
   * times don't affect the result. For example, the results aren't affected if
   * the asset is removed and re-created again. Possible "state_change" values
   * when compare_duration is specified: * "ADDED": indicates that the asset was
   * not present at the start of compare_duration, but present at read_time. *
   * "REMOVED": indicates that the asset was present at the start of
   * compare_duration, but not present at read_time. * "ACTIVE": indicates that
   * the asset was present at both the start and the end of the time period
   * defined by compare_duration and read_time. If compare_duration is not
   * specified, then the only possible state_change is "UNUSED", which will be
   * the state_change set for all assets present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the ListAssetsResult fields to be listed in the
   * response. An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across assets. The expression
   * is a list of zero or more restrictions combined via logical operators `AND`
   * and `OR`. Parentheses are supported, and `OR` has higher precedence than
   * `AND`. Restrictions have the form ` ` and may have a `-` character in front
   * of them to indicate negation. The fields map to those defined in the Asset
   * resource. Examples include: * name *
   * security_center_properties.resource_name * resource_properties.a_property *
   * security_marks.marks.marka The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes. The following are the allowed field and operator
   * combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage:
   * This should be milliseconds since epoch or an RFC3339 string. Examples:
   * `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` *
   * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds
   * since epoch or an RFC3339 string. Examples: `create_time =
   * "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` *
   * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` * security_marks.marks: `=`, `:` *
   * security_center_properties.resource_name: `=`, `:` *
   * security_center_properties.resource_display_name: `=`, `:` *
   * security_center_properties.resource_type: `=`, `:` *
   * security_center_properties.resource_parent: `=`, `:` *
   * security_center_properties.resource_parent_display_name: `=`, `:` *
   * security_center_properties.resource_project: `=`, `:` *
   * security_center_properties.resource_project_display_name: `=`, `:` *
   * security_center_properties.resource_owners: `=`, `:` For example,
   * `resource_properties.size = 100` is a valid filter string. Use a partial
   * match on the empty string to filter based on a property existing:
   * `resource_properties.my_property : ""` Use a negated partial match on the
   * empty string to filter based on a property not existing:
   * `-resource_properties.my_property : ""`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,resource_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,resource_properties.a_property" and "
   * name desc , resource_properties.a_property " are equivalent. The following
   * fields are supported: name update_time resource_properties
   * security_marks.marks security_center_properties.resource_name
   * security_center_properties.resource_display_name
   * security_center_properties.resource_parent
   * security_center_properties.resource_parent_display_name
   * security_center_properties.resource_project
   * security_center_properties.resource_project_display_name
   * security_center_properties.resource_type
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAssetsResponse`; indicates that this
   * is a continuation of a prior `ListAssets` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering assets. The filter is
   * limited to assets existing at the supplied time and their values are those
   * at that specific time. Absence of this field will default to the API's
   * version of NOW.
   */
  readTime?: Date;
}

function serializeFoldersAssetsListOptions(data: any): FoldersAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeFoldersAssetsListOptions(data: any): FoldersAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersAssetsUpdateSecurityMarks.
 */
export interface FoldersAssetsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersAssetsUpdateSecurityMarksOptions(data: any): FoldersAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersAssetsUpdateSecurityMarksOptions(data: any): FoldersAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersBigQueryExportsCreate.
 */
export interface FoldersBigQueryExportsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  bigQueryExportId?: string;
}

/**
 * Additional options for SecurityCenter#foldersBigQueryExportsList.
 */
export interface FoldersBigQueryExportsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBigQueryExports` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListBigQueryExports` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#foldersBigQueryExportsPatch.
 */
export interface FoldersBigQueryExportsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersBigQueryExportsPatchOptions(data: any): FoldersBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersBigQueryExportsPatchOptions(data: any): FoldersBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersMuteConfigsCreate.
 */
export interface FoldersMuteConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  muteConfigId?: string;
}

/**
 * Additional options for SecurityCenter#foldersMuteConfigsList.
 */
export interface FoldersMuteConfigsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListMuteConfigs` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListMuteConfigs` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#foldersMuteConfigsPatch.
 */
export interface FoldersMuteConfigsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersMuteConfigsPatchOptions(data: any): FoldersMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersMuteConfigsPatchOptions(data: any): FoldersMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersNotificationConfigsCreate.
 */
export interface FoldersNotificationConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must be between 1 and 128 characters and contain alphanumeric
   * characters, underscores, or hyphens only.
   */
  configId?: string;
}

/**
 * Additional options for SecurityCenter#foldersNotificationConfigsList.
 */
export interface FoldersNotificationConfigsListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListNotificationConfigsResponse`;
   * indicates that this is a continuation of a prior `ListNotificationConfigs`
   * call, and that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#foldersNotificationConfigsPatch.
 */
export interface FoldersNotificationConfigsPatchOptions {
  /**
   * The FieldMask to use when updating the notification config. If empty all
   * mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersNotificationConfigsPatchOptions(data: any): FoldersNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersNotificationConfigsPatchOptions(data: any): FoldersNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#foldersSourcesFindingsExternalSystemsPatch.
 */
export interface FoldersSourcesFindingsExternalSystemsPatchOptions {
  /**
   * The FieldMask to use when updating the external system resource. If empty
   * all mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersSourcesFindingsExternalSystemsPatchOptions(data: any): FoldersSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersSourcesFindingsExternalSystemsPatchOptions(data: any): FoldersSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersSourcesFindingsList.
 */
export interface FoldersSourcesFindingsListOptions {
  /**
   * When compare_duration is set, the ListFindingsResult's "state_change"
   * attribute is updated to indicate whether the finding had its state changed,
   * the finding's state remained unchanged, or if the finding was added in any
   * state during the compare_duration period of time that precedes the
   * read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence and
   * state of the finding at the two points in time. Intermediate state changes
   * between the two times don't affect the result. For example, the results
   * aren't affected if the finding is made inactive and then active again.
   * Possible "state_change" values when compare_duration is specified: *
   * "CHANGED": indicates that the finding was present and matched the given
   * filter at the start of compare_duration, but changed its state at
   * read_time. * "UNCHANGED": indicates that the finding was present and
   * matched the given filter at the start of compare_duration and did not
   * change state at read_time. * "ADDED": indicates that the finding did not
   * match the given filter or was not present at the start of compare_duration,
   * but was present at read_time. * "REMOVED": indicates that the finding was
   * present and matched the filter at the start of compare_duration, but did
   * not match the filter at read_time. If compare_duration is not specified,
   * then the only possible state_change is "UNUSED", which will be the
   * state_change set for all findings present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the Finding fields to be listed in the response.
   * An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across findings. The
   * expression is a list of one or more restrictions combined via logical
   * operators `AND` and `OR`. Parentheses are supported, and `OR` has higher
   * precedence than `AND`. Restrictions have the form ` ` and may have a `-`
   * character in front of them to indicate negation. Examples include: * name *
   * source_properties.a_property * security_marks.marks.marka The supported
   * operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for
   * integer values. * `:`, meaning substring matching, for strings. The
   * supported value types are: * string literals in quotes. * integer literals
   * without quotes. * boolean literals `true` and `false` without quotes. The
   * following field and operator combinations are supported: * name: `=` *
   * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category:
   * `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=`
   * Usage: This should be milliseconds since epoch or an RFC3339 string.
   * Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time =
   * 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` *
   * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` For example, `source_properties.size = 100` is a valid filter
   * string. Use a partial match on the empty string to filter based on a
   * property existing: `source_properties.my_property : ""` Use a negated
   * partial match on the empty string to filter based on a property not
   * existing: `-source_properties.my_property : ""` * resource: *
   * resource.name: `=`, `:` * resource.parent_name: `=`, `:` *
   * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` *
   * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` *
   * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`,
   * `:`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,source_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,source_properties.a_property" and "
   * name desc , source_properties.a_property " are equivalent. The following
   * fields are supported: name parent state category resource_name event_time
   * source_properties security_marks.marks
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListFindingsResponse`; indicates that this
   * is a continuation of a prior `ListFindings` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering findings. The filter is
   * limited to findings existing at the supplied time and their values are
   * those at that specific time. Absence of this field will default to the
   * API's version of NOW.
   */
  readTime?: Date;
}

function serializeFoldersSourcesFindingsListOptions(data: any): FoldersSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeFoldersSourcesFindingsListOptions(data: any): FoldersSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersSourcesFindingsPatch.
 */
export interface FoldersSourcesFindingsPatchOptions {
  /**
   * The FieldMask to use when updating the finding resource. This field should
   * not be specified when creating a finding. When updating a finding, an empty
   * mask is treated as updating all mutable fields and replacing
   * source_properties. Individual source_properties can be added/updated by
   * using "source_properties." in the field mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersSourcesFindingsPatchOptions(data: any): FoldersSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersSourcesFindingsPatchOptions(data: any): FoldersSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#foldersSourcesFindingsUpdateSecurityMarks.
 */
export interface FoldersSourcesFindingsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersSourcesFindingsUpdateSecurityMarksOptions(data: any): FoldersSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersSourcesFindingsUpdateSecurityMarksOptions(data: any): FoldersSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#foldersSourcesList.
 */
export interface FoldersSourcesListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListSourcesResponse`; indicates that this
   * is a continuation of a prior `ListSources` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Represents a geographical location for a given access.
 */
export interface Geolocation {
  /**
   * A CLDR.
   */
  regionCode?: string;
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
 * Response of asset discovery run
 */
export interface GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse {
  /**
   * The duration between asset discovery run start and end
   */
  duration?: number /* Duration */;
  /**
   * The state of an asset discovery run.
   */
  state?:  | "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED";
}

function serializeGoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1beta1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Configures how to deliver Findings to BigQuery Instance.
 */
export interface GoogleCloudSecuritycenterV1BigQueryExport {
  /**
   * Output only. The time at which the BigQuery export was created. This field
   * is set by the server and will be ignored if provided on export on creation.
   */
  readonly createTime?: Date;
  /**
   * The dataset to write findings' updates to. Its format is
   * "projects/[project_id]/datasets/[bigquery_dataset_id]". BigQuery Dataset
   * unique ID must contain only letters (a-z, A-Z), numbers (0-9), or
   * underscores (_).
   */
  dataset?: string;
  /**
   * The description of the export (max of 1024 characters).
   */
  description?: string;
  /**
   * Expression that defines the filter to apply across create/update events of
   * findings. The expression is a list of zero or more restrictions combined
   * via logical operators `AND` and `OR`. Parentheses are supported, and `OR`
   * has higher precedence than `AND`. Restrictions have the form ` ` and may
   * have a `-` character in front of them to indicate negation. The fields map
   * to those defined in the corresponding resource. The supported operators
   * are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for integer values.
   * * `:`, meaning substring matching, for strings. The supported value types
   * are: * string literals in quotes. * integer literals without quotes. *
   * boolean literals `true` and `false` without quotes.
   */
  filter?: string;
  /**
   * Output only. Email address of the user who last edited the BigQuery
   * export. This field is set by the server and will be ignored if provided on
   * export creation or update.
   */
  readonly mostRecentEditor?: string;
  /**
   * The relative resource name of this export. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name.
   * Example format:
   * "organizations/{organization_id}/bigQueryExports/{export_id}" Example
   * format: "folders/{folder_id}/bigQueryExports/{export_id}" Example format:
   * "projects/{project_id}/bigQueryExports/{export_id}" This field is provided
   * in responses, and is ignored when provided in create requests.
   */
  name?: string;
  /**
   * Output only. The service account that needs permission to create table and
   * upload data to the BigQuery dataset.
   */
  readonly principal?: string;
  /**
   * Output only. The most recent time at which the BigQuery export was
   * updated. This field is set by the server and will be ignored if provided on
   * export creation or update.
   */
  readonly updateTime?: Date;
}

/**
 * Represents a Kubernetes RoleBinding or ClusterRoleBinding.
 */
export interface GoogleCloudSecuritycenterV1Binding {
  /**
   * Name for binding.
   */
  name?: string;
  /**
   * Namespace for binding.
   */
  ns?: string;
  /**
   * The Role or ClusterRole referenced by the binding.
   */
  role?: Role;
  /**
   * Represents one or more subjects that are bound to the role. Not always
   * available for PATCH requests.
   */
  subjects?: Subject[];
}

/**
 * The response to a BulkMute request. Contains the LRO information.
 */
export interface GoogleCloudSecuritycenterV1BulkMuteFindingsResponse {
}

/**
 * A resource that is exposed as a result of a finding.
 */
export interface GoogleCloudSecuritycenterV1ExposedResource {
  /**
   * Human readable name of the resource that is exposed.
   */
  displayName?: string;
  /**
   * The ways in which this resource is exposed. Examples: Read, Write
   */
  methods?: string[];
  /**
   * Exposed Resource Name e.g.:
   * `organizations/123/attackExposureResults/456/exposedResources/789`
   */
  name?: string;
  /**
   * The name of the resource that is exposed. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resource?: string;
  /**
   * The resource type of the exposed resource. See:
   * https://cloud.google.com/asset-inventory/docs/supported-asset-types
   */
  resourceType?: string;
  /**
   * How valuable this resource is.
   */
  resourceValue?:  | "RESOURCE_VALUE_UNSPECIFIED" | "RESOURCE_VALUE_LOW" | "RESOURCE_VALUE_MEDIUM" | "RESOURCE_VALUE_HIGH";
}

/**
 * A path that an attacker could take to reach an exposed resource.
 */
export interface GoogleCloudSecuritycenterV1ExposurePath {
  /**
   * A list of the edges between nodes in this exposure path.
   */
  edges?: Edge[];
  /**
   * The leaf node of this exposure path.
   */
  exposedResource?: GoogleCloudSecuritycenterV1ExposedResource;
  /**
   * Exposure Path Name e.g.:
   * `organizations/123/attackExposureResults/456/exposurePaths/789`
   */
  name?: string;
  /**
   * A list of nodes that exist in this exposure path.
   */
  pathNodes?: PathNode[];
}

/**
 * Representation of third party SIEM/SOAR fields within SCC.
 */
export interface GoogleCloudSecuritycenterV1ExternalSystem {
  /**
   * References primary/secondary etc assignees in the external system.
   */
  assignees?: string[];
  /**
   * The most recent time when the corresponding finding's ticket/tracker was
   * updated in the external system.
   */
  externalSystemUpdateTime?: Date;
  /**
   * Identifier that's used to track the given finding in the external system.
   */
  externalUid?: string;
  /**
   * Full resource name of the external system, for example:
   * "organizations/1234/sources/5678/findings/123456/externalSystems/jira",
   * "folders/1234/sources/5678/findings/123456/externalSystems/jira",
   * "projects/1234/sources/5678/findings/123456/externalSystems/jira"
   */
  name?: string;
  /**
   * Most recent status of the corresponding finding's ticket/tracker in the
   * external system.
   */
  status?: string;
}

function serializeGoogleCloudSecuritycenterV1ExternalSystem(data: any): GoogleCloudSecuritycenterV1ExternalSystem {
  return {
    ...data,
    externalSystemUpdateTime: data["externalSystemUpdateTime"] !== undefined ? data["externalSystemUpdateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1ExternalSystem(data: any): GoogleCloudSecuritycenterV1ExternalSystem {
  return {
    ...data,
    externalSystemUpdateTime: data["externalSystemUpdateTime"] !== undefined ? new Date(data["externalSystemUpdateTime"]) : undefined,
  };
}

/**
 * A mute config is a Cloud SCC resource that contains the configuration to
 * mute create/update events of findings.
 */
export interface GoogleCloudSecuritycenterV1MuteConfig {
  /**
   * Output only. The time at which the mute config was created. This field is
   * set by the server and will be ignored if provided on config creation.
   */
  readonly createTime?: Date;
  /**
   * A description of the mute config.
   */
  description?: string;
  /**
   * The human readable name to be displayed for the mute config.
   */
  displayName?: string;
  /**
   * Required. An expression that defines the filter to apply across
   * create/update events of findings. While creating a filter string, be
   * mindful of the scope in which the mute configuration is being created.
   * E.g., If a filter contains project = X but is created under the project = Y
   * scope, it might not match any findings. The following field and operator
   * combinations are supported: * severity: `=`, `:` * category: `=`, `:` *
   * resource.name: `=`, `:` * resource.project_name: `=`, `:` *
   * resource.project_display_name: `=`, `:` * resource.folders.resource_folder:
   * `=`, `:` * resource.parent_name: `=`, `:` * resource.parent_display_name:
   * `=`, `:` * resource.type: `=`, `:` * finding_class: `=`, `:` *
   * indicator.ip_addresses: `=`, `:` * indicator.domains: `=`, `:`
   */
  filter?: string;
  /**
   * Output only. Email address of the user who last edited the mute config.
   * This field is set by the server and will be ignored if provided on config
   * creation or update.
   */
  readonly mostRecentEditor?: string;
  /**
   * This field will be ignored if provided on config creation. Format
   * "organizations/{organization}/muteConfigs/{mute_config}"
   * "folders/{folder}/muteConfigs/{mute_config}"
   * "projects/{project}/muteConfigs/{mute_config}"
   */
  name?: string;
  /**
   * Output only. The most recent time at which the mute config was updated.
   * This field is set by the server and will be ignored if provided on config
   * creation or update.
   */
  readonly updateTime?: Date;
}

/**
 * Cloud SCC's Notification
 */
export interface GoogleCloudSecuritycenterV1NotificationMessage {
  /**
   * If it's a Finding based notification config, this field will be populated.
   */
  finding?: Finding;
  /**
   * Name of the notification config that generated current notification.
   */
  notificationConfigName?: string;
  /**
   * The Cloud resource tied to this notification's Finding.
   */
  resource?: GoogleCloudSecuritycenterV1Resource;
}

function serializeGoogleCloudSecuritycenterV1NotificationMessage(data: any): GoogleCloudSecuritycenterV1NotificationMessage {
  return {
    ...data,
    finding: data["finding"] !== undefined ? serializeFinding(data["finding"]) : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1NotificationMessage(data: any): GoogleCloudSecuritycenterV1NotificationMessage {
  return {
    ...data,
    finding: data["finding"] !== undefined ? deserializeFinding(data["finding"]) : undefined,
  };
}

/**
 * Security Command Center finding. A finding is a record of assessment data
 * (security, risk, health or privacy) ingested into Security Command Center for
 * presentation, notification, analysis, policy testing, and enforcement. For
 * example, an XSS vulnerability in an App Engine application is a finding.
 */
export interface GoogleCloudSecuritycenterV1p1beta1Finding {
  /**
   * The canonical name of the finding. It's either
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}",
   * "folders/{folder_id}/sources/{source_id}/findings/{finding_id}" or
   * "projects/{project_number}/sources/{source_id}/findings/{finding_id}",
   * depending on the closest CRM ancestor of the resource associated with the
   * finding.
   */
  canonicalName?: string;
  /**
   * The additional taxonomy group within findings from a given source. This
   * field is immutable after creation time. Example: "XSS_FLASH_INJECTION"
   */
  category?: string;
  /**
   * The time at which the finding was created in Security Command Center.
   */
  createTime?: Date;
  /**
   * The time at which the event took place, or when an update to the finding
   * occurred. For example, if the finding represents an open firewall it would
   * capture the time the detector believes the firewall became open. The
   * accuracy is determined by the detector. If the finding were to be resolved
   * afterward, this time would reflect when the finding was resolved. Must not
   * be set to a value greater than the current timestamp.
   */
  eventTime?: Date;
  /**
   * The URI that, if available, points to a web page outside of Security
   * Command Center where additional information about the finding can be found.
   * This field is guaranteed to be either empty or a well formed URL.
   */
  externalUri?: string;
  /**
   * The relative resource name of this finding. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example:
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}"
   */
  name?: string;
  /**
   * The relative resource name of the source the finding belongs to. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * This field is immutable after creation time. For example:
   * "organizations/{organization_id}/sources/{source_id}"
   */
  parent?: string;
  /**
   * For findings on Google Cloud resources, the full resource name of the
   * Google Cloud resource this finding is for. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name When
   * the finding is for a non-Google Cloud resource, the resourceName can be a
   * customer or partner defined string. This field is immutable after creation
   * time.
   */
  resourceName?: string;
  /**
   * Output only. User specified security marks. These marks are entirely
   * managed by the user and come from the SecurityMarks resource that belongs
   * to the finding.
   */
  readonly securityMarks?: GoogleCloudSecuritycenterV1p1beta1SecurityMarks;
  /**
   * The severity of the finding. This field is managed by the source that
   * writes the finding.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  /**
   * Source specific properties. These properties are managed by the source
   * that writes the finding. The key names in the source_properties map must be
   * between 1 and 255 characters, and must start with a letter and contain
   * alphanumeric characters or underscores only.
   */
  sourceProperties?: {
    [key: string]: any
  };
  /**
   * The state of the finding.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE";
}

function serializeGoogleCloudSecuritycenterV1p1beta1Finding(data: any): GoogleCloudSecuritycenterV1p1beta1Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1p1beta1Finding(data: any): GoogleCloudSecuritycenterV1p1beta1Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * Message that contains the resource name and display name of a folder
 * resource.
 */
export interface GoogleCloudSecuritycenterV1p1beta1Folder {
  /**
   * Full resource name of this folder. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resourceFolder?: string;
  /**
   * The user defined display name for this folder.
   */
  resourceFolderDisplayName?: string;
}

/**
 * Security Command Center's Notification
 */
export interface GoogleCloudSecuritycenterV1p1beta1NotificationMessage {
  /**
   * If it's a Finding based notification config, this field will be populated.
   */
  finding?: GoogleCloudSecuritycenterV1p1beta1Finding;
  /**
   * Name of the notification config that generated current notification.
   */
  notificationConfigName?: string;
  /**
   * The Cloud resource tied to the notification.
   */
  resource?: GoogleCloudSecuritycenterV1p1beta1Resource;
}

function serializeGoogleCloudSecuritycenterV1p1beta1NotificationMessage(data: any): GoogleCloudSecuritycenterV1p1beta1NotificationMessage {
  return {
    ...data,
    finding: data["finding"] !== undefined ? serializeGoogleCloudSecuritycenterV1p1beta1Finding(data["finding"]) : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1p1beta1NotificationMessage(data: any): GoogleCloudSecuritycenterV1p1beta1NotificationMessage {
  return {
    ...data,
    finding: data["finding"] !== undefined ? deserializeGoogleCloudSecuritycenterV1p1beta1Finding(data["finding"]) : undefined,
  };
}

/**
 * Information related to the Google Cloud resource.
 */
export interface GoogleCloudSecuritycenterV1p1beta1Resource {
  /**
   * Output only. Contains a Folder message for each folder in the assets
   * ancestry. The first folder is the deepest nested folder, and the last
   * folder is the folder directly under the Organization.
   */
  readonly folders?: GoogleCloudSecuritycenterV1p1beta1Folder[];
  /**
   * The full resource name of the resource. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  name?: string;
  /**
   * The full resource name of resource's parent.
   */
  parent?: string;
  /**
   * The human readable name of resource's parent.
   */
  parentDisplayName?: string;
  /**
   * The full resource name of project that the resource belongs to.
   */
  project?: string;
  /**
   * The project id that the resource belongs to.
   */
  projectDisplayName?: string;
}

/**
 * Response of asset discovery run
 */
export interface GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse {
  /**
   * The duration between asset discovery run start and end
   */
  duration?: number /* Duration */;
  /**
   * The state of an asset discovery run.
   */
  state?:  | "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED";
}

function serializeGoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1p1beta1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * User specified security marks that are attached to the parent Security
 * Command Center resource. Security marks are scoped within a Security Command
 * Center organization -- they can be modified and viewed by all users who have
 * proper permissions on the organization.
 */
export interface GoogleCloudSecuritycenterV1p1beta1SecurityMarks {
  /**
   * The canonical name of the marks. Examples:
   * "organizations/{organization_id}/assets/{asset_id}/securityMarks"
   * "folders/{folder_id}/assets/{asset_id}/securityMarks"
   * "projects/{project_number}/assets/{asset_id}/securityMarks"
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks"
   * "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks"
   * "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks"
   */
  canonicalName?: string;
  /**
   * Mutable user specified security marks belonging to the parent resource.
   * Constraints are as follows: * Keys and values are treated as case
   * insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys
   * must be letters, numbers, underscores, or dashes * Values have leading and
   * trailing whitespace trimmed, remaining characters must be between 1 - 4096
   * characters (inclusive)
   */
  marks?: {
    [key: string]: string
  };
  /**
   * The relative resource name of the SecurityMarks. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks"
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  name?: string;
}

/**
 * Information related to the Google Cloud resource.
 */
export interface GoogleCloudSecuritycenterV1Resource {
  /**
   * The human readable name of the resource.
   */
  displayName?: string;
  /**
   * Output only. Contains a Folder message for each folder in the assets
   * ancestry. The first folder is the deepest nested folder, and the last
   * folder is the folder directly under the Organization.
   */
  readonly folders?: Folder[];
  /**
   * The full resource name of the resource. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  name?: string;
  /**
   * The full resource name of resource's parent.
   */
  parent?: string;
  /**
   * The human readable name of resource's parent.
   */
  parentDisplayName?: string;
  /**
   * The full resource name of project that the resource belongs to.
   */
  project?: string;
  /**
   * The project ID that the resource belongs to.
   */
  projectDisplayName?: string;
  /**
   * The full resource type of the resource.
   */
  type?: string;
}

/**
 * A resource value config is a mapping configuration of user's tag values to
 * resource values. Used by the attack path simulation.
 */
export interface GoogleCloudSecuritycenterV1ResourceValueConfig {
  /**
   * Name for the resource value config
   */
  name?: string;
  /**
   * Apply resource_value only to resources that match resource_type.
   * resource_type will be checked with "AND" of other resources. E.g.
   * "storage.googleapis.com/Bucket" with resource_value "HIGH" will apply
   * "HIGH" value only to "storage.googleapis.com/Bucket" resources.
   */
  resourceType?: string;
  /**
   * Required. Resource value level this expression represents
   */
  resourceValue?:  | "RESOURCE_VALUE_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "NONE";
  /**
   * Project or folder to scope this config to. For example, "project/456"
   * would apply this config only to resources in "project/456" scope will be
   * checked with "AND" of other resources.
   */
  scope?: string;
  /**
   * Required. Tag values combined with AND to check against. Values in the
   * form "tagValues/123" E.g. [ "tagValues/123", "tagValues/456",
   * "tagValues/789" ]
   * https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing
   */
  tagValues?: string[];
}

/**
 * Response of asset discovery run
 */
export interface GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse {
  /**
   * The duration between asset discovery run start and end
   */
  duration?: number /* Duration */;
  /**
   * The state of an asset discovery run.
   */
  state?:  | "STATE_UNSPECIFIED" | "COMPLETED" | "SUPERSEDED" | "TERMINATED";
}

function serializeGoogleCloudSecuritycenterV1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeGoogleCloudSecuritycenterV1RunAssetDiscoveryResponse(data: any): GoogleCloudSecuritycenterV1RunAssetDiscoveryResponse {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Request message for grouping by assets.
 */
export interface GroupAssetsRequest {
  /**
   * When compare_duration is set, the GroupResult's "state_change" property is
   * updated to indicate whether the asset was added, removed, or remained
   * present during the compare_duration period of time that precedes the
   * read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state change value is derived based on the presence of the
   * asset at the two points in time. Intermediate state changes between the two
   * times don't affect the result. For example, the results aren't affected if
   * the asset is removed and re-created again. Possible "state_change" values
   * when compare_duration is specified: * "ADDED": indicates that the asset was
   * not present at the start of compare_duration, but present at
   * reference_time. * "REMOVED": indicates that the asset was present at the
   * start of compare_duration, but not present at reference_time. * "ACTIVE":
   * indicates that the asset was present at both the start and the end of the
   * time period defined by compare_duration and reference_time. If
   * compare_duration is not specified, then the only possible state_change is
   * "UNUSED", which will be the state_change set for all assets present at
   * read_time. If this field is set then `state_change` must be a specified
   * field in `group_by`.
   */
  compareDuration?: number /* Duration */;
  /**
   * Expression that defines the filter to apply across assets. The expression
   * is a list of zero or more restrictions combined via logical operators `AND`
   * and `OR`. Parentheses are supported, and `OR` has higher precedence than
   * `AND`. Restrictions have the form ` ` and may have a `-` character in front
   * of them to indicate negation. The fields map to those defined in the Asset
   * resource. Examples include: * name *
   * security_center_properties.resource_name * resource_properties.a_property *
   * security_marks.marks.marka The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes. The following field and operator combinations are
   * supported: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage: This
   * should be milliseconds since epoch or an RFC3339 string. Examples:
   * `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` *
   * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds
   * since epoch or an RFC3339 string. Examples: `create_time =
   * "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` *
   * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` * security_marks.marks: `=`, `:` *
   * security_center_properties.resource_name: `=`, `:` *
   * security_center_properties.resource_display_name: `=`, `:` *
   * security_center_properties.resource_type: `=`, `:` *
   * security_center_properties.resource_parent: `=`, `:` *
   * security_center_properties.resource_parent_display_name: `=`, `:` *
   * security_center_properties.resource_project: `=`, `:` *
   * security_center_properties.resource_project_display_name: `=`, `:` *
   * security_center_properties.resource_owners: `=`, `:` For example,
   * `resource_properties.size = 100` is a valid filter string. Use a partial
   * match on the empty string to filter based on a property existing:
   * `resource_properties.my_property : ""` Use a negated partial match on the
   * empty string to filter based on a property not existing:
   * `-resource_properties.my_property : ""`
   */
  filter?: string;
  /**
   * Required. Expression that defines what assets fields to use for grouping.
   * The string value should follow SQL syntax: comma separated list of fields.
   * For example:
   * "security_center_properties.resource_project,security_center_properties.project".
   * The following fields are supported when compare_duration is not set: *
   * security_center_properties.resource_project *
   * security_center_properties.resource_project_display_name *
   * security_center_properties.resource_type *
   * security_center_properties.resource_parent *
   * security_center_properties.resource_parent_display_name The following
   * fields are supported when compare_duration is set: *
   * security_center_properties.resource_type *
   * security_center_properties.resource_project_display_name *
   * security_center_properties.resource_parent_display_name
   */
  groupBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `GroupAssetsResponse`; indicates that this
   * is a continuation of a prior `GroupAssets` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering assets. The filter is
   * limited to assets existing at the supplied time and their values are those
   * at that specific time. Absence of this field will default to the API's
   * version of NOW.
   */
  readTime?: Date;
}

function serializeGroupAssetsRequest(data: any): GroupAssetsRequest {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeGroupAssetsRequest(data: any): GroupAssetsRequest {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Response message for grouping by assets.
 */
export interface GroupAssetsResponse {
  /**
   * Group results. There exists an element for each existing unique
   * combination of property/values. The element contains a count for the number
   * of times those specific property/values appear.
   */
  groupByResults?: GroupResult[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Time used for executing the groupBy request.
   */
  readTime?: Date;
  /**
   * The total number of results matching the query.
   */
  totalSize?: number;
}

function serializeGroupAssetsResponse(data: any): GroupAssetsResponse {
  return {
    ...data,
    groupByResults: data["groupByResults"] !== undefined ? data["groupByResults"].map((item: any) => (serializeGroupResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeGroupAssetsResponse(data: any): GroupAssetsResponse {
  return {
    ...data,
    groupByResults: data["groupByResults"] !== undefined ? data["groupByResults"].map((item: any) => (deserializeGroupResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Request message for grouping by findings.
 */
export interface GroupFindingsRequest {
  /**
   * When compare_duration is set, the GroupResult's "state_change" attribute
   * is updated to indicate whether the finding had its state changed, the
   * finding's state remained unchanged, or if the finding was added during the
   * compare_duration period of time that precedes the read_time. This is the
   * time between (read_time - compare_duration) and read_time. The state_change
   * value is derived based on the presence and state of the finding at the two
   * points in time. Intermediate state changes between the two times don't
   * affect the result. For example, the results aren't affected if the finding
   * is made inactive and then active again. Possible "state_change" values when
   * compare_duration is specified: * "CHANGED": indicates that the finding was
   * present and matched the given filter at the start of compare_duration, but
   * changed its state at read_time. * "UNCHANGED": indicates that the finding
   * was present and matched the given filter at the start of compare_duration
   * and did not change state at read_time. * "ADDED": indicates that the
   * finding did not match the given filter or was not present at the start of
   * compare_duration, but was present at read_time. * "REMOVED": indicates that
   * the finding was present and matched the filter at the start of
   * compare_duration, but did not match the filter at read_time. If
   * compare_duration is not specified, then the only possible state_change is
   * "UNUSED", which will be the state_change set for all findings present at
   * read_time. If this field is set then `state_change` must be a specified
   * field in `group_by`.
   */
  compareDuration?: number /* Duration */;
  /**
   * Expression that defines the filter to apply across findings. The
   * expression is a list of one or more restrictions combined via logical
   * operators `AND` and `OR`. Parentheses are supported, and `OR` has higher
   * precedence than `AND`. Restrictions have the form ` ` and may have a `-`
   * character in front of them to indicate negation. Examples include: * name *
   * source_properties.a_property * security_marks.marks.marka The supported
   * operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for
   * integer values. * `:`, meaning substring matching, for strings. The
   * supported value types are: * string literals in quotes. * integer literals
   * without quotes. * boolean literals `true` and `false` without quotes. The
   * following field and operator combinations are supported: * name: `=` *
   * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category:
   * `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=`
   * Usage: This should be milliseconds since epoch or an RFC3339 string.
   * Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time =
   * 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` *
   * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` For example, `source_properties.size = 100` is a valid filter
   * string. Use a partial match on the empty string to filter based on a
   * property existing: `source_properties.my_property : ""` Use a negated
   * partial match on the empty string to filter based on a property not
   * existing: `-source_properties.my_property : ""` * resource: *
   * resource.name: `=`, `:` * resource.parent_name: `=`, `:` *
   * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` *
   * resource.project_display_name: `=`, `:` * resource.type: `=`, `:`
   */
  filter?: string;
  /**
   * Required. Expression that defines what assets fields to use for grouping
   * (including `state_change`). The string value should follow SQL syntax:
   * comma separated list of fields. For example: "parent,resource_name". The
   * following fields are supported: * resource_name * category * state * parent
   * * severity The following fields are supported when compare_duration is set:
   * * state_change
   */
  groupBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `GroupFindingsResponse`; indicates that
   * this is a continuation of a prior `GroupFindings` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering findings. The filter is
   * limited to findings existing at the supplied time and their values are
   * those at that specific time. Absence of this field will default to the
   * API's version of NOW.
   */
  readTime?: Date;
}

function serializeGroupFindingsRequest(data: any): GroupFindingsRequest {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeGroupFindingsRequest(data: any): GroupFindingsRequest {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Response message for group by findings.
 */
export interface GroupFindingsResponse {
  /**
   * Group results. There exists an element for each existing unique
   * combination of property/values. The element contains a count for the number
   * of times those specific property/values appear.
   */
  groupByResults?: GroupResult[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Time used for executing the groupBy request.
   */
  readTime?: Date;
  /**
   * The total number of results matching the query.
   */
  totalSize?: number;
}

function serializeGroupFindingsResponse(data: any): GroupFindingsResponse {
  return {
    ...data,
    groupByResults: data["groupByResults"] !== undefined ? data["groupByResults"].map((item: any) => (serializeGroupResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeGroupFindingsResponse(data: any): GroupFindingsResponse {
  return {
    ...data,
    groupByResults: data["groupByResults"] !== undefined ? data["groupByResults"].map((item: any) => (deserializeGroupResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Result containing the properties and count of a groupBy request.
 */
export interface GroupResult {
  /**
   * Total count of resources for the given properties.
   */
  count?: bigint;
  /**
   * Properties matching the groupBy fields in the request.
   */
  properties?: {
    [key: string]: any
  };
}

function serializeGroupResult(data: any): GroupResult {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGroupResult(data: any): GroupResult {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Represents a particular IAM binding, which captures a member's role
 * addition, removal, or state.
 */
export interface IamBinding {
  /**
   * The action that was performed on a Binding.
   */
  action?:  | "ACTION_UNSPECIFIED" | "ADD" | "REMOVE";
  /**
   * A single identity requesting access for a Cloud Platform resource, e.g.
   * "foo@google.com".
   */
  member?: string;
  /**
   * Role that is assigned to "members". For example, "roles/viewer",
   * "roles/editor", or "roles/owner".
   */
  role?: string;
}

/**
 * Cloud IAM Policy information associated with the Google Cloud resource
 * described by the Security Command Center asset. This information is managed
 * and defined by the Google Cloud resource and cannot be modified by the user.
 */
export interface IamPolicy {
  /**
   * The JSON representation of the Policy associated with the asset. See
   * https://cloud.google.com/iam/reference/rest/v1/Policy for format details.
   */
  policyBlob?: string;
}

/**
 * Represents what's commonly known as an _indicator of compromise_ (IoC) in
 * computer forensics. This is an artifact observed on a network or in an
 * operating system that, with high confidence, indicates a computer intrusion.
 * For more information, see [Indicator of
 * compromise](https://en.wikipedia.org/wiki/Indicator_of_compromise).
 */
export interface Indicator {
  /**
   * List of domains associated to the Finding.
   */
  domains?: string[];
  /**
   * The list of IP addresses that are associated with the finding.
   */
  ipAddresses?: string[];
  /**
   * The list of matched signatures indicating that the given process is
   * present in the environment.
   */
  signatures?: ProcessSignature[];
  /**
   * The list of URIs associated to the Findings.
   */
  uris?: string[];
}

/**
 * Kernel mode rootkit signatures.
 */
export interface KernelRootkit {
  /**
   * Rootkit name when available.
   */
  name?: string;
  /**
   * True when unexpected modifications of kernel code memory are present.
   */
  unexpectedCodeModification?: boolean;
  /**
   * True when `ftrace` points are present with callbacks pointing to regions
   * that are not in the expected kernel or module code range.
   */
  unexpectedFtraceHandler?: boolean;
  /**
   * True when interrupt handlers that are are not in the expected kernel or
   * module code regions are present.
   */
  unexpectedInterruptHandler?: boolean;
  /**
   * True when kernel code pages that are not in the expected kernel or module
   * code regions are present.
   */
  unexpectedKernelCodePages?: boolean;
  /**
   * True when `kprobe` points are present with callbacks pointing to regions
   * that are not in the expected kernel or module code range.
   */
  unexpectedKprobeHandler?: boolean;
  /**
   * True when unexpected processes in the scheduler run queue are present.
   * Such processes are in the run queue, but not in the process task list.
   */
  unexpectedProcessesInRunqueue?: boolean;
  /**
   * True when unexpected modifications of kernel read-only data memory are
   * present.
   */
  unexpectedReadOnlyDataModification?: boolean;
  /**
   * True when system call handlers that are are not in the expected kernel or
   * module code regions are present.
   */
  unexpectedSystemCallHandler?: boolean;
}

/**
 * Kubernetes-related attributes.
 */
export interface Kubernetes {
  /**
   * Provides information on any Kubernetes access reviews (i.e. privilege
   * checks) relevant to the finding.
   */
  accessReviews?: AccessReview[];
  /**
   * Provides Kubernetes role binding information for findings that involve
   * RoleBindings or ClusterRoleBindings.
   */
  bindings?: GoogleCloudSecuritycenterV1Binding[];
  /**
   * GKE Node Pools associated with the finding. This field will contain
   * NodePool information for each Node, when it is available.
   */
  nodePools?: NodePool[];
  /**
   * Provides Kubernetes Node information.
   */
  nodes?: Node[];
  /**
   * Kubernetes Pods associated with the finding. This field will contain Pod
   * records for each container that is owned by a Pod.
   */
  pods?: Pod[];
  /**
   * Provides Kubernetes role information for findings that involve Roles or
   * ClusterRoles.
   */
  roles?: Role[];
}

/**
 * Label represents a generic name=value label. Label has separate name and
 * value fields to support filtering with contains().
 */
export interface Label {
  /**
   * Label name.
   */
  name?: string;
  /**
   * Label value.
   */
  value?: string;
}

/**
 * Response message for listing assets.
 */
export interface ListAssetsResponse {
  /**
   * Assets matching the list request.
   */
  listAssetsResults?: ListAssetsResult[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Time used for executing the list request.
   */
  readTime?: Date;
  /**
   * The total number of assets matching the query.
   */
  totalSize?: number;
}

function serializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    listAssetsResults: data["listAssetsResults"] !== undefined ? data["listAssetsResults"].map((item: any) => (serializeListAssetsResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    listAssetsResults: data["listAssetsResults"] !== undefined ? data["listAssetsResults"].map((item: any) => (deserializeListAssetsResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Result containing the Asset and its State.
 */
export interface ListAssetsResult {
  /**
   * Asset matching the search request.
   */
  asset?: Asset;
  /**
   * State change of the asset between the points in time.
   */
  stateChange?:  | "UNUSED" | "ADDED" | "REMOVED" | "ACTIVE";
}

function serializeListAssetsResult(data: any): ListAssetsResult {
  return {
    ...data,
    asset: data["asset"] !== undefined ? serializeAsset(data["asset"]) : undefined,
  };
}

function deserializeListAssetsResult(data: any): ListAssetsResult {
  return {
    ...data,
    asset: data["asset"] !== undefined ? deserializeAsset(data["asset"]) : undefined,
  };
}

/**
 * Response message for listing BigQuery exports.
 */
export interface ListBigQueryExportsResponse {
  /**
   * The BigQuery exports from the specified parent.
   */
  bigQueryExports?: GoogleCloudSecuritycenterV1BigQueryExport[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for listing findings.
 */
export interface ListFindingsResponse {
  /**
   * Findings matching the list request.
   */
  listFindingsResults?: ListFindingsResult[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Time used for executing the list request.
   */
  readTime?: Date;
  /**
   * The total number of findings matching the query.
   */
  totalSize?: number;
}

function serializeListFindingsResponse(data: any): ListFindingsResponse {
  return {
    ...data,
    listFindingsResults: data["listFindingsResults"] !== undefined ? data["listFindingsResults"].map((item: any) => (serializeListFindingsResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeListFindingsResponse(data: any): ListFindingsResponse {
  return {
    ...data,
    listFindingsResults: data["listFindingsResults"] !== undefined ? data["listFindingsResults"].map((item: any) => (deserializeListFindingsResult(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Result containing the Finding and its StateChange.
 */
export interface ListFindingsResult {
  /**
   * Finding matching the search request.
   */
  finding?: Finding;
  /**
   * Output only. Resource that is associated with this finding.
   */
  readonly resource?: Resource;
  /**
   * State change of the finding between the points in time.
   */
  stateChange?:  | "UNUSED" | "CHANGED" | "UNCHANGED" | "ADDED" | "REMOVED";
}

function serializeListFindingsResult(data: any): ListFindingsResult {
  return {
    ...data,
    finding: data["finding"] !== undefined ? serializeFinding(data["finding"]) : undefined,
  };
}

function deserializeListFindingsResult(data: any): ListFindingsResult {
  return {
    ...data,
    finding: data["finding"] !== undefined ? deserializeFinding(data["finding"]) : undefined,
  };
}

/**
 * Response message for listing mute configs.
 */
export interface ListMuteConfigsResponse {
  /**
   * The mute configs from the specified parent.
   */
  muteConfigs?: GoogleCloudSecuritycenterV1MuteConfig[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for listing notification configs.
 */
export interface ListNotificationConfigsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Notification configs belonging to the requested parent.
   */
  notificationConfigs?: NotificationConfig[];
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
 * Response message for listing sources.
 */
export interface ListSourcesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
  /**
   * Sources belonging to the requested parent.
   */
  sources?: Source[];
}

/**
 * A signature corresponding to memory page hashes.
 */
export interface MemoryHashSignature {
  /**
   * The binary family.
   */
  binaryFamily?: string;
  /**
   * The list of memory hash detections contributing to the binary family
   * match.
   */
  detections?: Detection[];
}

/**
 * MITRE ATT&CK tactics and techniques related to this finding. See:
 * https://attack.mitre.org
 */
export interface MitreAttack {
  /**
   * Additional MITRE ATT&CK tactics related to this finding, if any.
   */
  additionalTactics?:  | "TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT"[];
  /**
   * Additional MITRE ATT&CK techniques related to this finding, if any, along
   * with any of their respective parent techniques.
   */
  additionalTechniques?:  | "TECHNIQUE_UNSPECIFIED" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "SHARED_MODULES" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "RESOURCE_HIJACKING" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "DYNAMIC_RESOLUTION" | "UNSECURED_CREDENTIALS" | "VALID_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "NETWORK_DENIAL_OF_SERVICE" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "ACCOUNT_MANIPULATION" | "SSH_AUTHORIZED_KEYS" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "STEAL_WEB_SESSION_COOKIE" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "MODIFY_AUTHENTICATION_PROCESS" | "DATA_DESTRUCTION" | "DOMAIN_POLICY_MODIFICATION" | "IMPAIR_DEFENSES" | "NETWORK_SERVICE_DISCOVERY" | "ACCESS_TOKEN_MANIPULATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "DEFAULT_ACCOUNTS"[];
  /**
   * The MITRE ATT&CK tactic most closely represented by this finding, if any.
   */
  primaryTactic?:  | "TACTIC_UNSPECIFIED" | "RECONNAISSANCE" | "RESOURCE_DEVELOPMENT" | "INITIAL_ACCESS" | "EXECUTION" | "PERSISTENCE" | "PRIVILEGE_ESCALATION" | "DEFENSE_EVASION" | "CREDENTIAL_ACCESS" | "DISCOVERY" | "LATERAL_MOVEMENT" | "COLLECTION" | "COMMAND_AND_CONTROL" | "EXFILTRATION" | "IMPACT";
  /**
   * The MITRE ATT&CK technique most closely represented by this finding, if
   * any. primary_techniques is a repeated field because there are multiple
   * levels of MITRE ATT&CK techniques. If the technique most closely
   * represented by this finding is a sub-technique (e.g. `SCANNING_IP_BLOCKS`),
   * both the sub-technique and its parent technique(s) will be listed (e.g.
   * `SCANNING_IP_BLOCKS`, `ACTIVE_SCANNING`).
   */
  primaryTechniques?:  | "TECHNIQUE_UNSPECIFIED" | "ACTIVE_SCANNING" | "SCANNING_IP_BLOCKS" | "INGRESS_TOOL_TRANSFER" | "NATIVE_API" | "SHARED_MODULES" | "COMMAND_AND_SCRIPTING_INTERPRETER" | "UNIX_SHELL" | "RESOURCE_HIJACKING" | "PROXY" | "EXTERNAL_PROXY" | "MULTI_HOP_PROXY" | "DYNAMIC_RESOLUTION" | "UNSECURED_CREDENTIALS" | "VALID_ACCOUNTS" | "LOCAL_ACCOUNTS" | "CLOUD_ACCOUNTS" | "NETWORK_DENIAL_OF_SERVICE" | "PERMISSION_GROUPS_DISCOVERY" | "CLOUD_GROUPS" | "EXFILTRATION_OVER_WEB_SERVICE" | "EXFILTRATION_TO_CLOUD_STORAGE" | "ACCOUNT_MANIPULATION" | "SSH_AUTHORIZED_KEYS" | "CREATE_OR_MODIFY_SYSTEM_PROCESS" | "STEAL_WEB_SESSION_COOKIE" | "MODIFY_CLOUD_COMPUTE_INFRASTRUCTURE" | "EXPLOIT_PUBLIC_FACING_APPLICATION" | "MODIFY_AUTHENTICATION_PROCESS" | "DATA_DESTRUCTION" | "DOMAIN_POLICY_MODIFICATION" | "IMPAIR_DEFENSES" | "NETWORK_SERVICE_DISCOVERY" | "ACCESS_TOKEN_MANIPULATION" | "ABUSE_ELEVATION_CONTROL_MECHANISM" | "DEFAULT_ACCOUNTS"[];
  /**
   * The MITRE ATT&CK version referenced by the above fields. E.g. "8".
   */
  version?: string;
}

/**
 * Kubernetes Nodes associated with the finding.
 */
export interface Node {
  /**
   * Full Resource name of the Compute Engine VM running the cluster node.
   */
  name?: string;
}

/**
 * Provides GKE Node Pool information.
 */
export interface NodePool {
  /**
   * Kubernetes Node pool name.
   */
  name?: string;
  /**
   * Nodes associated with the finding.
   */
  nodes?: Node[];
}

/**
 * Cloud Security Command Center (Cloud SCC) notification configs. A
 * notification config is a Cloud SCC resource that contains the configuration
 * to send notifications for create/update events of findings, assets and etc.
 */
export interface NotificationConfig {
  /**
   * The description of the notification config (max of 1024 characters).
   */
  description?: string;
  /**
   * The relative resource name of this notification config. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example:
   * "organizations/{organization_id}/notificationConfigs/notify_public_bucket",
   * "folders/{folder_id}/notificationConfigs/notify_public_bucket", or
   * "projects/{project_id}/notificationConfigs/notify_public_bucket".
   */
  name?: string;
  /**
   * The Pub/Sub topic to send notifications to. Its format is
   * "projects/[project_id]/topics/[topic]".
   */
  pubsubTopic?: string;
  /**
   * Output only. The service account that needs "pubsub.topics.publish"
   * permission to publish to the Pub/Sub topic.
   */
  readonly serviceAccount?: string;
  /**
   * The config for triggering streaming-based notifications.
   */
  streamingConfig?: StreamingConfig;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
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
   * that originally returns it. If you use the default HTTP mapping, the `name`
   * should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as `Delete`, the response is
   * `google.protobuf.Empty`. If the original method is standard
   * `Get`/`Create`/`Update`, the response should be the resource. For other
   * methods, the response should have the type `XxxResponse`, where `Xxx` is
   * the original method name. For example, if the original method name is
   * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Additional options for SecurityCenter#organizationsAssetsList.
 */
export interface OrganizationsAssetsListOptions {
  /**
   * When compare_duration is set, the ListAssetsResult's "state_change"
   * attribute is updated to indicate whether the asset was added, removed, or
   * remained present during the compare_duration period of time that precedes
   * the read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence of the
   * asset at the two points in time. Intermediate state changes between the two
   * times don't affect the result. For example, the results aren't affected if
   * the asset is removed and re-created again. Possible "state_change" values
   * when compare_duration is specified: * "ADDED": indicates that the asset was
   * not present at the start of compare_duration, but present at read_time. *
   * "REMOVED": indicates that the asset was present at the start of
   * compare_duration, but not present at read_time. * "ACTIVE": indicates that
   * the asset was present at both the start and the end of the time period
   * defined by compare_duration and read_time. If compare_duration is not
   * specified, then the only possible state_change is "UNUSED", which will be
   * the state_change set for all assets present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the ListAssetsResult fields to be listed in the
   * response. An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across assets. The expression
   * is a list of zero or more restrictions combined via logical operators `AND`
   * and `OR`. Parentheses are supported, and `OR` has higher precedence than
   * `AND`. Restrictions have the form ` ` and may have a `-` character in front
   * of them to indicate negation. The fields map to those defined in the Asset
   * resource. Examples include: * name *
   * security_center_properties.resource_name * resource_properties.a_property *
   * security_marks.marks.marka The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes. The following are the allowed field and operator
   * combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage:
   * This should be milliseconds since epoch or an RFC3339 string. Examples:
   * `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` *
   * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds
   * since epoch or an RFC3339 string. Examples: `create_time =
   * "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` *
   * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` * security_marks.marks: `=`, `:` *
   * security_center_properties.resource_name: `=`, `:` *
   * security_center_properties.resource_display_name: `=`, `:` *
   * security_center_properties.resource_type: `=`, `:` *
   * security_center_properties.resource_parent: `=`, `:` *
   * security_center_properties.resource_parent_display_name: `=`, `:` *
   * security_center_properties.resource_project: `=`, `:` *
   * security_center_properties.resource_project_display_name: `=`, `:` *
   * security_center_properties.resource_owners: `=`, `:` For example,
   * `resource_properties.size = 100` is a valid filter string. Use a partial
   * match on the empty string to filter based on a property existing:
   * `resource_properties.my_property : ""` Use a negated partial match on the
   * empty string to filter based on a property not existing:
   * `-resource_properties.my_property : ""`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,resource_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,resource_properties.a_property" and "
   * name desc , resource_properties.a_property " are equivalent. The following
   * fields are supported: name update_time resource_properties
   * security_marks.marks security_center_properties.resource_name
   * security_center_properties.resource_display_name
   * security_center_properties.resource_parent
   * security_center_properties.resource_parent_display_name
   * security_center_properties.resource_project
   * security_center_properties.resource_project_display_name
   * security_center_properties.resource_type
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAssetsResponse`; indicates that this
   * is a continuation of a prior `ListAssets` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering assets. The filter is
   * limited to assets existing at the supplied time and their values are those
   * at that specific time. Absence of this field will default to the API's
   * version of NOW.
   */
  readTime?: Date;
}

function serializeOrganizationsAssetsListOptions(data: any): OrganizationsAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeOrganizationsAssetsListOptions(data: any): OrganizationsAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#organizationsAssetsUpdateSecurityMarks.
 */
export interface OrganizationsAssetsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsAssetsUpdateSecurityMarksOptions(data: any): OrganizationsAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsAssetsUpdateSecurityMarksOptions(data: any): OrganizationsAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#organizationsBigQueryExportsCreate.
 */
export interface OrganizationsBigQueryExportsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  bigQueryExportId?: string;
}

/**
 * Additional options for SecurityCenter#organizationsBigQueryExportsList.
 */
export interface OrganizationsBigQueryExportsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBigQueryExports` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListBigQueryExports` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#organizationsBigQueryExportsPatch.
 */
export interface OrganizationsBigQueryExportsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsBigQueryExportsPatchOptions(data: any): OrganizationsBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsBigQueryExportsPatchOptions(data: any): OrganizationsBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * User specified settings that are attached to the Security Command Center
 * organization.
 */
export interface OrganizationSettings {
  /**
   * The configuration used for Asset Discovery runs.
   */
  assetDiscoveryConfig?: AssetDiscoveryConfig;
  /**
   * A flag that indicates if Asset Discovery should be enabled. If the flag is
   * set to `true`, then discovery of assets will occur. If it is set to `false,
   * all historical assets will remain, but discovery of future assets will not
   * occur.
   */
  enableAssetDiscovery?: boolean;
  /**
   * The relative resource name of the settings. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example: "organizations/{organization_id}/organizationSettings".
   */
  name?: string;
}

/**
 * Additional options for SecurityCenter#organizationsMuteConfigsCreate.
 */
export interface OrganizationsMuteConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  muteConfigId?: string;
}

/**
 * Additional options for SecurityCenter#organizationsMuteConfigsList.
 */
export interface OrganizationsMuteConfigsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListMuteConfigs` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListMuteConfigs` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#organizationsMuteConfigsPatch.
 */
export interface OrganizationsMuteConfigsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsMuteConfigsPatchOptions(data: any): OrganizationsMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsMuteConfigsPatchOptions(data: any): OrganizationsMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#organizationsNotificationConfigsCreate.
 */
export interface OrganizationsNotificationConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must be between 1 and 128 characters and contain alphanumeric
   * characters, underscores, or hyphens only.
   */
  configId?: string;
}

/**
 * Additional options for SecurityCenter#organizationsNotificationConfigsList.
 */
export interface OrganizationsNotificationConfigsListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListNotificationConfigsResponse`;
   * indicates that this is a continuation of a prior `ListNotificationConfigs`
   * call, and that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#organizationsNotificationConfigsPatch.
 */
export interface OrganizationsNotificationConfigsPatchOptions {
  /**
   * The FieldMask to use when updating the notification config. If empty all
   * mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsNotificationConfigsPatchOptions(data: any): OrganizationsNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsNotificationConfigsPatchOptions(data: any): OrganizationsNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#organizationsOperationsList.
 */
export interface OrganizationsOperationsListOptions {
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
 * Additional options for SecurityCenter#organizationsSourcesFindingsCreate.
 */
export interface OrganizationsSourcesFindingsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must be alphanumeric and less than or equal to 32 characters and
   * greater than 0 characters in length.
   */
  findingId?: string;
}

/**
 * Additional options for
 * SecurityCenter#organizationsSourcesFindingsExternalSystemsPatch.
 */
export interface OrganizationsSourcesFindingsExternalSystemsPatchOptions {
  /**
   * The FieldMask to use when updating the external system resource. If empty
   * all mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSourcesFindingsExternalSystemsPatchOptions(data: any): OrganizationsSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSourcesFindingsExternalSystemsPatchOptions(data: any): OrganizationsSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#organizationsSourcesFindingsList.
 */
export interface OrganizationsSourcesFindingsListOptions {
  /**
   * When compare_duration is set, the ListFindingsResult's "state_change"
   * attribute is updated to indicate whether the finding had its state changed,
   * the finding's state remained unchanged, or if the finding was added in any
   * state during the compare_duration period of time that precedes the
   * read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence and
   * state of the finding at the two points in time. Intermediate state changes
   * between the two times don't affect the result. For example, the results
   * aren't affected if the finding is made inactive and then active again.
   * Possible "state_change" values when compare_duration is specified: *
   * "CHANGED": indicates that the finding was present and matched the given
   * filter at the start of compare_duration, but changed its state at
   * read_time. * "UNCHANGED": indicates that the finding was present and
   * matched the given filter at the start of compare_duration and did not
   * change state at read_time. * "ADDED": indicates that the finding did not
   * match the given filter or was not present at the start of compare_duration,
   * but was present at read_time. * "REMOVED": indicates that the finding was
   * present and matched the filter at the start of compare_duration, but did
   * not match the filter at read_time. If compare_duration is not specified,
   * then the only possible state_change is "UNUSED", which will be the
   * state_change set for all findings present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the Finding fields to be listed in the response.
   * An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across findings. The
   * expression is a list of one or more restrictions combined via logical
   * operators `AND` and `OR`. Parentheses are supported, and `OR` has higher
   * precedence than `AND`. Restrictions have the form ` ` and may have a `-`
   * character in front of them to indicate negation. Examples include: * name *
   * source_properties.a_property * security_marks.marks.marka The supported
   * operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for
   * integer values. * `:`, meaning substring matching, for strings. The
   * supported value types are: * string literals in quotes. * integer literals
   * without quotes. * boolean literals `true` and `false` without quotes. The
   * following field and operator combinations are supported: * name: `=` *
   * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category:
   * `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=`
   * Usage: This should be milliseconds since epoch or an RFC3339 string.
   * Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time =
   * 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` *
   * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` For example, `source_properties.size = 100` is a valid filter
   * string. Use a partial match on the empty string to filter based on a
   * property existing: `source_properties.my_property : ""` Use a negated
   * partial match on the empty string to filter based on a property not
   * existing: `-source_properties.my_property : ""` * resource: *
   * resource.name: `=`, `:` * resource.parent_name: `=`, `:` *
   * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` *
   * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` *
   * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`,
   * `:`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,source_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,source_properties.a_property" and "
   * name desc , source_properties.a_property " are equivalent. The following
   * fields are supported: name parent state category resource_name event_time
   * source_properties security_marks.marks
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListFindingsResponse`; indicates that this
   * is a continuation of a prior `ListFindings` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering findings. The filter is
   * limited to findings existing at the supplied time and their values are
   * those at that specific time. Absence of this field will default to the
   * API's version of NOW.
   */
  readTime?: Date;
}

function serializeOrganizationsSourcesFindingsListOptions(data: any): OrganizationsSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeOrganizationsSourcesFindingsListOptions(data: any): OrganizationsSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for SecurityCenter#organizationsSourcesFindingsPatch.
 */
export interface OrganizationsSourcesFindingsPatchOptions {
  /**
   * The FieldMask to use when updating the finding resource. This field should
   * not be specified when creating a finding. When updating a finding, an empty
   * mask is treated as updating all mutable fields and replacing
   * source_properties. Individual source_properties can be added/updated by
   * using "source_properties." in the field mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSourcesFindingsPatchOptions(data: any): OrganizationsSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSourcesFindingsPatchOptions(data: any): OrganizationsSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#organizationsSourcesFindingsUpdateSecurityMarks.
 */
export interface OrganizationsSourcesFindingsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSourcesFindingsUpdateSecurityMarksOptions(data: any): OrganizationsSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSourcesFindingsUpdateSecurityMarksOptions(data: any): OrganizationsSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#organizationsSourcesList.
 */
export interface OrganizationsSourcesListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListSourcesResponse`; indicates that this
   * is a continuation of a prior `ListSources` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#organizationsSourcesPatch.
 */
export interface OrganizationsSourcesPatchOptions {
  /**
   * The FieldMask to use when updating the source resource. If empty all
   * mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSourcesPatchOptions(data: any): OrganizationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSourcesPatchOptions(data: any): OrganizationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#organizationsUpdateOrganizationSettings.
 */
export interface OrganizationsUpdateOrganizationSettingsOptions {
  /**
   * The FieldMask to use when updating the settings resource. If empty all
   * mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsUpdateOrganizationSettingsOptions(data: any): OrganizationsUpdateOrganizationSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsUpdateOrganizationSettingsOptions(data: any): OrganizationsUpdateOrganizationSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Represents one point that an attacker passes through in this exposure path.
 */
export interface PathNode {
  /**
   * The findings associated with this node in the exposure path.
   */
  associatedFindings?: AssociatedFinding[];
  /**
   * Human readable name of this resource.
   */
  displayName?: string;
  /**
   * The name of the resource at this point in the exposure path. The format of
   * the name is:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resource?: string;
  /**
   * The resource type of this resource. See:
   * https://cloud.google.com/asset-inventory/docs/supported-asset-types
   */
  resourceType?: string;
}

/**
 * Kubernetes Pod.
 */
export interface Pod {
  /**
   * Pod containers associated with this finding, if any.
   */
  containers?: Container[];
  /**
   * Pod labels. For Kubernetes containers, these are applied to the container.
   */
  labels?: Label[];
  /**
   * Kubernetes Pod name.
   */
  name?: string;
  /**
   * Kubernetes Pod namespace.
   */
  ns?: string;
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
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
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
 * Represents an operating system process.
 */
export interface Process {
  /**
   * Process arguments as JSON encoded strings.
   */
  args?: string[];
  /**
   * True if `args` is incomplete.
   */
  argumentsTruncated?: boolean;
  /**
   * File information for the process executable.
   */
  binary?: File;
  /**
   * Process environment variables.
   */
  envVariables?: EnvironmentVariable[];
  /**
   * True if `env_variables` is incomplete.
   */
  envVariablesTruncated?: boolean;
  /**
   * File information for libraries loaded by the process.
   */
  libraries?: File[];
  /**
   * The process name visible in utilities like `top` and `ps`; it can be
   * accessed via `/proc/[pid]/comm` and changed with `prctl(PR_SET_NAME)`.
   */
  name?: string;
  /**
   * The parent process id.
   */
  parentPid?: bigint;
  /**
   * The process id.
   */
  pid?: bigint;
  /**
   * When the process represents the invocation of a script, `binary` provides
   * information about the interpreter while `script` provides information about
   * the script file provided to the interpreter.
   */
  script?: File;
}

function serializeProcess(data: any): Process {
  return {
    ...data,
    binary: data["binary"] !== undefined ? serializeFile(data["binary"]) : undefined,
    libraries: data["libraries"] !== undefined ? data["libraries"].map((item: any) => (serializeFile(item))) : undefined,
    parentPid: data["parentPid"] !== undefined ? String(data["parentPid"]) : undefined,
    pid: data["pid"] !== undefined ? String(data["pid"]) : undefined,
    script: data["script"] !== undefined ? serializeFile(data["script"]) : undefined,
  };
}

function deserializeProcess(data: any): Process {
  return {
    ...data,
    binary: data["binary"] !== undefined ? deserializeFile(data["binary"]) : undefined,
    libraries: data["libraries"] !== undefined ? data["libraries"].map((item: any) => (deserializeFile(item))) : undefined,
    parentPid: data["parentPid"] !== undefined ? BigInt(data["parentPid"]) : undefined,
    pid: data["pid"] !== undefined ? BigInt(data["pid"]) : undefined,
    script: data["script"] !== undefined ? deserializeFile(data["script"]) : undefined,
  };
}

/**
 * Indicates what signature matched this process.
 */
export interface ProcessSignature {
  /**
   * Signature indicating that a binary family was matched.
   */
  memoryHashSignature?: MemoryHashSignature;
  /**
   * Signature indicating that a YARA rule was matched.
   */
  yaraRuleSignature?: YaraRuleSignature;
}

/**
 * Additional options for SecurityCenter#projectsAssetsList.
 */
export interface ProjectsAssetsListOptions {
  /**
   * When compare_duration is set, the ListAssetsResult's "state_change"
   * attribute is updated to indicate whether the asset was added, removed, or
   * remained present during the compare_duration period of time that precedes
   * the read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence of the
   * asset at the two points in time. Intermediate state changes between the two
   * times don't affect the result. For example, the results aren't affected if
   * the asset is removed and re-created again. Possible "state_change" values
   * when compare_duration is specified: * "ADDED": indicates that the asset was
   * not present at the start of compare_duration, but present at read_time. *
   * "REMOVED": indicates that the asset was present at the start of
   * compare_duration, but not present at read_time. * "ACTIVE": indicates that
   * the asset was present at both the start and the end of the time period
   * defined by compare_duration and read_time. If compare_duration is not
   * specified, then the only possible state_change is "UNUSED", which will be
   * the state_change set for all assets present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the ListAssetsResult fields to be listed in the
   * response. An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across assets. The expression
   * is a list of zero or more restrictions combined via logical operators `AND`
   * and `OR`. Parentheses are supported, and `OR` has higher precedence than
   * `AND`. Restrictions have the form ` ` and may have a `-` character in front
   * of them to indicate negation. The fields map to those defined in the Asset
   * resource. Examples include: * name *
   * security_center_properties.resource_name * resource_properties.a_property *
   * security_marks.marks.marka The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes. The following are the allowed field and operator
   * combinations: * name: `=` * update_time: `=`, `>`, `<`, `>=`, `<=` Usage:
   * This should be milliseconds since epoch or an RFC3339 string. Examples:
   * `update_time = "2019-06-10T16:07:18-07:00"` `update_time = 1560208038000` *
   * create_time: `=`, `>`, `<`, `>=`, `<=` Usage: This should be milliseconds
   * since epoch or an RFC3339 string. Examples: `create_time =
   * "2019-06-10T16:07:18-07:00"` `create_time = 1560208038000` *
   * iam_policy.policy_blob: `=`, `:` * resource_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` * security_marks.marks: `=`, `:` *
   * security_center_properties.resource_name: `=`, `:` *
   * security_center_properties.resource_display_name: `=`, `:` *
   * security_center_properties.resource_type: `=`, `:` *
   * security_center_properties.resource_parent: `=`, `:` *
   * security_center_properties.resource_parent_display_name: `=`, `:` *
   * security_center_properties.resource_project: `=`, `:` *
   * security_center_properties.resource_project_display_name: `=`, `:` *
   * security_center_properties.resource_owners: `=`, `:` For example,
   * `resource_properties.size = 100` is a valid filter string. Use a partial
   * match on the empty string to filter based on a property existing:
   * `resource_properties.my_property : ""` Use a negated partial match on the
   * empty string to filter based on a property not existing:
   * `-resource_properties.my_property : ""`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,resource_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,resource_properties.a_property" and "
   * name desc , resource_properties.a_property " are equivalent. The following
   * fields are supported: name update_time resource_properties
   * security_marks.marks security_center_properties.resource_name
   * security_center_properties.resource_display_name
   * security_center_properties.resource_parent
   * security_center_properties.resource_parent_display_name
   * security_center_properties.resource_project
   * security_center_properties.resource_project_display_name
   * security_center_properties.resource_type
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAssetsResponse`; indicates that this
   * is a continuation of a prior `ListAssets` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering assets. The filter is
   * limited to assets existing at the supplied time and their values are those
   * at that specific time. Absence of this field will default to the API's
   * version of NOW.
   */
  readTime?: Date;
}

function serializeProjectsAssetsListOptions(data: any): ProjectsAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeProjectsAssetsListOptions(data: any): ProjectsAssetsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsAssetsUpdateSecurityMarks.
 */
export interface ProjectsAssetsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAssetsUpdateSecurityMarksOptions(data: any): ProjectsAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAssetsUpdateSecurityMarksOptions(data: any): ProjectsAssetsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsBigQueryExportsCreate.
 */
export interface ProjectsBigQueryExportsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  bigQueryExportId?: string;
}

/**
 * Additional options for SecurityCenter#projectsBigQueryExportsList.
 */
export interface ProjectsBigQueryExportsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBigQueryExports` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListBigQueryExports` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#projectsBigQueryExportsPatch.
 */
export interface ProjectsBigQueryExportsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsBigQueryExportsPatchOptions(data: any): ProjectsBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsBigQueryExportsPatchOptions(data: any): ProjectsBigQueryExportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsMuteConfigsCreate.
 */
export interface ProjectsMuteConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must consist of lower case letters, numbers, and hyphen, with the
   * first character a letter, the last a letter or a number, and a 63 character
   * maximum.
   */
  muteConfigId?: string;
}

/**
 * Additional options for SecurityCenter#projectsMuteConfigsList.
 */
export interface ProjectsMuteConfigsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 10 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListMuteConfigs` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListMuteConfigs` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#projectsMuteConfigsPatch.
 */
export interface ProjectsMuteConfigsPatchOptions {
  /**
   * The list of fields to be updated. If empty all mutable fields will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsMuteConfigsPatchOptions(data: any): ProjectsMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsMuteConfigsPatchOptions(data: any): ProjectsMuteConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsNotificationConfigsCreate.
 */
export interface ProjectsNotificationConfigsCreateOptions {
  /**
   * Required. Unique identifier provided by the client within the parent
   * scope. It must be between 1 and 128 characters and contain alphanumeric
   * characters, underscores, or hyphens only.
   */
  configId?: string;
}

/**
 * Additional options for SecurityCenter#projectsNotificationConfigsList.
 */
export interface ProjectsNotificationConfigsListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListNotificationConfigsResponse`;
   * indicates that this is a continuation of a prior `ListNotificationConfigs`
   * call, and that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for SecurityCenter#projectsNotificationConfigsPatch.
 */
export interface ProjectsNotificationConfigsPatchOptions {
  /**
   * The FieldMask to use when updating the notification config. If empty all
   * mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsNotificationConfigsPatchOptions(data: any): ProjectsNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsNotificationConfigsPatchOptions(data: any): ProjectsNotificationConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#projectsSourcesFindingsExternalSystemsPatch.
 */
export interface ProjectsSourcesFindingsExternalSystemsPatchOptions {
  /**
   * The FieldMask to use when updating the external system resource. If empty
   * all mutable fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSourcesFindingsExternalSystemsPatchOptions(data: any): ProjectsSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSourcesFindingsExternalSystemsPatchOptions(data: any): ProjectsSourcesFindingsExternalSystemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsSourcesFindingsList.
 */
export interface ProjectsSourcesFindingsListOptions {
  /**
   * When compare_duration is set, the ListFindingsResult's "state_change"
   * attribute is updated to indicate whether the finding had its state changed,
   * the finding's state remained unchanged, or if the finding was added in any
   * state during the compare_duration period of time that precedes the
   * read_time. This is the time between (read_time - compare_duration) and
   * read_time. The state_change value is derived based on the presence and
   * state of the finding at the two points in time. Intermediate state changes
   * between the two times don't affect the result. For example, the results
   * aren't affected if the finding is made inactive and then active again.
   * Possible "state_change" values when compare_duration is specified: *
   * "CHANGED": indicates that the finding was present and matched the given
   * filter at the start of compare_duration, but changed its state at
   * read_time. * "UNCHANGED": indicates that the finding was present and
   * matched the given filter at the start of compare_duration and did not
   * change state at read_time. * "ADDED": indicates that the finding did not
   * match the given filter or was not present at the start of compare_duration,
   * but was present at read_time. * "REMOVED": indicates that the finding was
   * present and matched the filter at the start of compare_duration, but did
   * not match the filter at read_time. If compare_duration is not specified,
   * then the only possible state_change is "UNUSED", which will be the
   * state_change set for all findings present at read_time.
   */
  compareDuration?: number /* Duration */;
  /**
   * A field mask to specify the Finding fields to be listed in the response.
   * An empty field mask will list all fields.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * Expression that defines the filter to apply across findings. The
   * expression is a list of one or more restrictions combined via logical
   * operators `AND` and `OR`. Parentheses are supported, and `OR` has higher
   * precedence than `AND`. Restrictions have the form ` ` and may have a `-`
   * character in front of them to indicate negation. Examples include: * name *
   * source_properties.a_property * security_marks.marks.marka The supported
   * operators are: * `=` for all value types. * `>`, `<`, `>=`, `<=` for
   * integer values. * `:`, meaning substring matching, for strings. The
   * supported value types are: * string literals in quotes. * integer literals
   * without quotes. * boolean literals `true` and `false` without quotes. The
   * following field and operator combinations are supported: * name: `=` *
   * parent: `=`, `:` * resource_name: `=`, `:` * state: `=`, `:` * category:
   * `=`, `:` * external_uri: `=`, `:` * event_time: `=`, `>`, `<`, `>=`, `<=`
   * Usage: This should be milliseconds since epoch or an RFC3339 string.
   * Examples: `event_time = "2019-06-10T16:07:18-07:00"` `event_time =
   * 1560208038000` * severity: `=`, `:` * workflow_state: `=`, `:` *
   * security_marks.marks: `=`, `:` * source_properties: `=`, `:`, `>`, `<`,
   * `>=`, `<=` For example, `source_properties.size = 100` is a valid filter
   * string. Use a partial match on the empty string to filter based on a
   * property existing: `source_properties.my_property : ""` Use a negated
   * partial match on the empty string to filter based on a property not
   * existing: `-source_properties.my_property : ""` * resource: *
   * resource.name: `=`, `:` * resource.parent_name: `=`, `:` *
   * resource.parent_display_name: `=`, `:` * resource.project_name: `=`, `:` *
   * resource.project_display_name: `=`, `:` * resource.type: `=`, `:` *
   * resource.folders.resource_folder: `=`, `:` * resource.display_name: `=`,
   * `:`
   */
  filter?: string;
  /**
   * Expression that defines what fields and order to use for sorting. The
   * string value should follow SQL syntax: comma separated list of fields. For
   * example: "name,resource_properties.a_property". The default sorting order
   * is ascending. To specify descending order for a field, a suffix " desc"
   * should be appended to the field name. For example: "name
   * desc,source_properties.a_property". Redundant space characters in the
   * syntax are insignificant. "name desc,source_properties.a_property" and "
   * name desc , source_properties.a_property " are equivalent. The following
   * fields are supported: name parent state category resource_name event_time
   * source_properties security_marks.marks
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListFindingsResponse`; indicates that this
   * is a continuation of a prior `ListFindings` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
  /**
   * Time used as a reference point when filtering findings. The filter is
   * limited to findings existing at the supplied time and their values are
   * those at that specific time. Absence of this field will default to the
   * API's version of NOW.
   */
  readTime?: Date;
}

function serializeProjectsSourcesFindingsListOptions(data: any): ProjectsSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeProjectsSourcesFindingsListOptions(data: any): ProjectsSourcesFindingsListOptions {
  return {
    ...data,
    compareDuration: data["compareDuration"] !== undefined ? data["compareDuration"] : undefined,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsSourcesFindingsPatch.
 */
export interface ProjectsSourcesFindingsPatchOptions {
  /**
   * The FieldMask to use when updating the finding resource. This field should
   * not be specified when creating a finding. When updating a finding, an empty
   * mask is treated as updating all mutable fields and replacing
   * source_properties. Individual source_properties can be added/updated by
   * using "source_properties." in the field mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSourcesFindingsPatchOptions(data: any): ProjectsSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSourcesFindingsPatchOptions(data: any): ProjectsSourcesFindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * SecurityCenter#projectsSourcesFindingsUpdateSecurityMarks.
 */
export interface ProjectsSourcesFindingsUpdateSecurityMarksOptions {
  /**
   * The time at which the updated SecurityMarks take effect. If not set uses
   * current server time. Updates will be applied to the SecurityMarks that are
   * active immediately preceding this time. Must be earlier or equal to the
   * server time.
   */
  startTime?: Date;
  /**
   * The FieldMask to use when updating the security marks resource. The field
   * mask must not contain duplicate fields. If empty or set to "marks", all
   * marks will be replaced. Individual marks can be updated using "marks.".
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSourcesFindingsUpdateSecurityMarksOptions(data: any): ProjectsSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSourcesFindingsUpdateSecurityMarksOptions(data: any): ProjectsSourcesFindingsUpdateSecurityMarksOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for SecurityCenter#projectsSourcesList.
 */
export interface ProjectsSourcesListOptions {
  /**
   * The maximum number of results to return in a single response. Default is
   * 10, minimum is 1, maximum is 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListSourcesResponse`; indicates that this
   * is a continuation of a prior `ListSources` call, and that the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional Links
 */
export interface Reference {
  /**
   * Source of the reference e.g. NVD
   */
  source?: string;
  /**
   * Uri for the mentioned source e.g.
   * https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-34527.
   */
  uri?: string;
}

/**
 * Information related to the Google Cloud resource that is associated with
 * this finding.
 */
export interface Resource {
  /**
   * The human readable name of the resource.
   */
  displayName?: string;
  /**
   * Contains a Folder message for each folder in the assets ancestry. The
   * first folder is the deepest nested folder, and the last folder is the
   * folder directly under the Organization.
   */
  folders?: Folder[];
  /**
   * The full resource name of the resource. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  name?: string;
  /**
   * The human readable name of resource's parent.
   */
  parentDisplayName?: string;
  /**
   * The full resource name of resource's parent.
   */
  parentName?: string;
  /**
   * The project ID that the resource belongs to.
   */
  projectDisplayName?: string;
  /**
   * The full resource name of project that the resource belongs to.
   */
  projectName?: string;
  /**
   * The full resource type of the resource.
   */
  type?: string;
}

/**
 * Kubernetes Role or ClusterRole.
 */
export interface Role {
  /**
   * Role type.
   */
  kind?:  | "KIND_UNSPECIFIED" | "ROLE" | "CLUSTER_ROLE";
  /**
   * Role name.
   */
  name?: string;
  /**
   * Role namespace.
   */
  ns?: string;
}

/**
 * Request message for running asset discovery for an organization.
 */
export interface RunAssetDiscoveryRequest {
}

/**
 * Security Command Center managed properties. These properties are managed by
 * Security Command Center and cannot be modified by the user.
 */
export interface SecurityCenterProperties {
  /**
   * Contains a Folder message for each folder in the assets ancestry. The
   * first folder is the deepest nested folder, and the last folder is the
   * folder directly under the Organization.
   */
  folders?: Folder[];
  /**
   * The user defined display name for this resource.
   */
  resourceDisplayName?: string;
  /**
   * The full resource name of the Google Cloud resource this asset represents.
   * This field is immutable after create time. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resourceName?: string;
  /**
   * Owners of the Google Cloud resource.
   */
  resourceOwners?: string[];
  /**
   * The full resource name of the immediate parent of the resource. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resourceParent?: string;
  /**
   * The user defined display name for the parent of this resource.
   */
  resourceParentDisplayName?: string;
  /**
   * The full resource name of the project the resource belongs to. See:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  resourceProject?: string;
  /**
   * The user defined display name for the project of this resource.
   */
  resourceProjectDisplayName?: string;
  /**
   * The type of the Google Cloud resource. Examples include: APPLICATION,
   * PROJECT, and ORGANIZATION. This is a case insensitive field defined by
   * Security Command Center and/or the producer of the resource and is
   * immutable after create time.
   */
  resourceType?: string;
}

/**
 * User specified security marks that are attached to the parent Security
 * Command Center resource. Security marks are scoped within a Security Command
 * Center organization -- they can be modified and viewed by all users who have
 * proper permissions on the organization.
 */
export interface SecurityMarks {
  /**
   * The canonical name of the marks. Examples:
   * "organizations/{organization_id}/assets/{asset_id}/securityMarks"
   * "folders/{folder_id}/assets/{asset_id}/securityMarks"
   * "projects/{project_number}/assets/{asset_id}/securityMarks"
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks"
   * "folders/{folder_id}/sources/{source_id}/findings/{finding_id}/securityMarks"
   * "projects/{project_number}/sources/{source_id}/findings/{finding_id}/securityMarks"
   */
  canonicalName?: string;
  /**
   * Mutable user specified security marks belonging to the parent resource.
   * Constraints are as follows: * Keys and values are treated as case
   * insensitive * Keys must be between 1 - 256 characters (inclusive) * Keys
   * must be letters, numbers, underscores, or dashes * Values have leading and
   * trailing whitespace trimmed, remaining characters must be between 1 - 4096
   * characters (inclusive)
   */
  marks?: {
    [key: string]: string
  };
  /**
   * The relative resource name of the SecurityMarks. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Examples: "organizations/{organization_id}/assets/{asset_id}/securityMarks"
   * "organizations/{organization_id}/sources/{source_id}/findings/{finding_id}/securityMarks".
   */
  name?: string;
}

/**
 * Identity delegation history of an authenticated service account.
 */
export interface ServiceAccountDelegationInfo {
  /**
   * The email address of a Google account.
   */
  principalEmail?: string;
  /**
   * A string representing the principal_subject associated with the identity.
   * As compared to `principal_email`, supports principals that aren't
   * associated with email addresses, such as third party principals. For most
   * identities, the format will be `principal://iam.googleapis.com/{identity
   * pool name}/subjects/{subject}` except for some GKE identities
   * (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy
   * format `serviceAccount:{identity pool name}[{subject}]`
   */
  principalSubject?: string;
}

/**
 * Request message for updating a finding's state.
 */
export interface SetFindingStateRequest {
  /**
   * Required. The time at which the updated state takes effect.
   */
  startTime?: Date;
  /**
   * Required. The desired State of the finding.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE";
}

function serializeSetFindingStateRequest(data: any): SetFindingStateRequest {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeSetFindingStateRequest(data: any): SetFindingStateRequest {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for updating a finding's mute status.
 */
export interface SetMuteRequest {
  /**
   * Required. The desired state of the Mute.
   */
  mute?:  | "MUTE_UNSPECIFIED" | "MUTED" | "UNMUTED" | "UNDEFINED";
}

/**
 * Security Command Center finding source. A finding source is an entity or a
 * mechanism that can produce a finding. A source is like a container of
 * findings that come from the same scanner, logger, monitor, and other tools.
 */
export interface Source {
  /**
   * The canonical name of the finding. It's either
   * "organizations/{organization_id}/sources/{source_id}",
   * "folders/{folder_id}/sources/{source_id}" or
   * "projects/{project_number}/sources/{source_id}", depending on the closest
   * CRM ancestor of the resource associated with the finding.
   */
  canonicalName?: string;
  /**
   * The description of the source (max of 1024 characters). Example: "Web
   * Security Scanner is a web security scanner for common vulnerabilities in
   * App Engine applications. It can automatically scan and detect four common
   * vulnerabilities, including cross-site-scripting (XSS), Flash injection,
   * mixed content (HTTP in HTTPS), and outdated or insecure libraries."
   */
  description?: string;
  /**
   * The source's display name. A source's display name must be unique amongst
   * its siblings, for example, two sources with the same parent can't share the
   * same display name. The display name must have a length between 1 and 64
   * characters (inclusive).
   */
  displayName?: string;
  /**
   * The relative resource name of this source. See:
   * https://cloud.google.com/apis/design/resource_names#relative_resource_name
   * Example: "organizations/{organization_id}/sources/{source_id}"
   */
  name?: string;
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
 * The config for streaming-based notifications, which send each event as soon
 * as it is detected.
 */
export interface StreamingConfig {
  /**
   * Expression that defines the filter to apply across create/update events of
   * assets or findings as specified by the event type. The expression is a list
   * of zero or more restrictions combined via logical operators `AND` and `OR`.
   * Parentheses are supported, and `OR` has higher precedence than `AND`.
   * Restrictions have the form ` ` and may have a `-` character in front of
   * them to indicate negation. The fields map to those defined in the
   * corresponding resource. The supported operators are: * `=` for all value
   * types. * `>`, `<`, `>=`, `<=` for integer values. * `:`, meaning substring
   * matching, for strings. The supported value types are: * string literals in
   * quotes. * integer literals without quotes. * boolean literals `true` and
   * `false` without quotes.
   */
  filter?: string;
}

/**
 * Represents a Kubernetes Subject.
 */
export interface Subject {
  /**
   * Authentication type for subject.
   */
  kind?:  | "AUTH_TYPE_UNSPECIFIED" | "USER" | "SERVICEACCOUNT" | "GROUP";
  /**
   * Name for subject.
   */
  name?: string;
  /**
   * Namespace for subject.
   */
  ns?: string;
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
 * Refers to common vulnerability fields e.g. cve, cvss, cwe etc.
 */
export interface Vulnerability {
  /**
   * CVE stands for Common Vulnerabilities and Exposures
   * (https://cve.mitre.org/about/)
   */
  cve?: Cve;
}

/**
 * A signature corresponding to a YARA rule.
 */
export interface YaraRuleSignature {
  /**
   * The name of the YARA rule.
   */
  yaraRule?: string;
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
