// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Drive Labels API Client for Deno
 * ================================
 * 
 * An API for managing Drive Labels
 * 
 * Docs: https://developers.google.com/drive/labels
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API for managing Drive Labels
 */
export class DriveLabels {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://drivelabels.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new Label.
   *
   */
  async labelsCreate(req: GoogleAppsDriveLabelsV2Label, opts: LabelsCreateOptions = {}): Promise<GoogleAppsDriveLabelsV2Label> {
    req = serializeGoogleAppsDriveLabelsV2Label(req);
    const url = new URL(`${this.#baseUrl}v2/labels`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * Permanently deletes a Label and related metadata on Drive Items. Once
   * deleted, the Label and related Drive item metadata will be deleted. Only
   * draft Labels, and disabled Labels may be deleted.
   *
   * @param name Required. Label resource name.
   */
  async labelsDelete(name: string, opts: LabelsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    if (opts["writeControl.requiredRevisionId"] !== undefined) {
      url.searchParams.append("writeControl.requiredRevisionId", String(opts["writeControl.requiredRevisionId"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Updates a single Label by applying a set of update requests resulting in a
   * new draft revision. The batch update is all-or-nothing: If any of the
   * update requests are invalid, no changes are applied. The resulting draft
   * revision must be published before the changes may be used with Drive Items.
   *
   * @param name Required. The resource name of the Label to update.
   */
  async labelsDelta(name: string, req: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequest): Promise<GoogleAppsDriveLabelsV2DeltaUpdateLabelResponse> {
    req = serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:delta`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelResponse(data);
  }

  /**
   * Disable a published Label. Disabling a Label will result in a new disabled
   * published revision based on the current published revision. If there is a
   * draft revision, a new disabled draft revision will be created based on the
   * latest draft revision. Older draft revisions will be deleted. Once
   * disabled, a label may be deleted with `DeleteLabel`.
   *
   * @param name Required. Label resource name.
   */
  async labelsDisable(name: string, req: GoogleAppsDriveLabelsV2DisableLabelRequest): Promise<GoogleAppsDriveLabelsV2Label> {
    req = serializeGoogleAppsDriveLabelsV2DisableLabelRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:disable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * Enable a disabled Label and restore it to its published state. This will
   * result in a new published revision based on the current disabled published
   * revision. If there is an existing disabled draft revision, a new revision
   * will be created based on that draft and will be enabled.
   *
   * @param name Required. Label resource name.
   */
  async labelsEnable(name: string, req: GoogleAppsDriveLabelsV2EnableLabelRequest): Promise<GoogleAppsDriveLabelsV2Label> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:enable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * Get a label by its resource name. Resource name may be any of: *
   * `labels/{id}` - See `labels/{id}@latest` * `labels/{id}@latest` - Gets the
   * latest revision of the label. * `labels/{id}@published` - Gets the current
   * published revision of the label. * `labels/{id}@{revision_id}` - Gets the
   * label at the specified revision ID.
   *
   * @param name Required. Label resource name. May be any of: * `labels/{id}` (equivalent to labels/{id}@latest) * `labels/{id}@latest` * `labels/{id}@published` * `labels/{id}@{revision_id}`
   */
  async labelsGet(name: string, opts: LabelsGetOptions = {}): Promise<GoogleAppsDriveLabelsV2Label> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * List labels.
   *
   */
  async labelsList(opts: LabelsListOptions = {}): Promise<GoogleAppsDriveLabelsV2ListLabelsResponse> {
    const url = new URL(`${this.#baseUrl}v2/labels`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.minimumRole !== undefined) {
      url.searchParams.append("minimumRole", String(opts.minimumRole));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.publishedOnly !== undefined) {
      url.searchParams.append("publishedOnly", String(opts.publishedOnly));
    }
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsDriveLabelsV2ListLabelsResponse(data);
  }

  /**
   * Lists the LabelLocks on a Label.
   *
   * @param parent Required. Label on which Locks are applied. Format: labels/{label}
   */
  async labelsLocksList(parent: string, opts: LabelsLocksListOptions = {}): Promise<GoogleAppsDriveLabelsV2ListLabelLocksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/locks`);
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
    return data as GoogleAppsDriveLabelsV2ListLabelLocksResponse;
  }

  /**
   * Deletes Label permissions. Permissions affect the Label resource as a
   * whole, are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name shared by all permissions being deleted. Format: labels/{label} If this is set, the parent field in the UpdateLabelPermissionRequest messages must either be empty or match this field.
   */
  async labelsPermissionsBatchDelete(parent: string, req: GoogleAppsDriveLabelsV2BatchDeleteLabelPermissionsRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Updates Label permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name shared by all permissions being updated. Format: labels/{label} If this is set, the parent field in the UpdateLabelPermissionRequest messages must either be empty or match this field.
   */
  async labelsPermissionsBatchUpdate(parent: string, req: GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsRequest): Promise<GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsResponse;
  }

  /**
   * Updates a Label's permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name on the Label Permission is created. Format: labels/{label}
   */
  async labelsPermissionsCreate(parent: string, req: GoogleAppsDriveLabelsV2LabelPermission, opts: LabelsPermissionsCreateOptions = {}): Promise<GoogleAppsDriveLabelsV2LabelPermission> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAppsDriveLabelsV2LabelPermission;
  }

  /**
   * Deletes a Label's permission. Permissions affect the Label resource as a
   * whole, are not revisioned, and do not require publishing.
   *
   * @param name Required. Label Permission resource name.
   */
  async labelsPermissionsDelete(name: string, opts: LabelsPermissionsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists a Label's permissions.
   *
   * @param parent Required. The parent Label resource name on which Label Permission are listed. Format: labels/{label}
   */
  async labelsPermissionsList(parent: string, opts: LabelsPermissionsListOptions = {}): Promise<GoogleAppsDriveLabelsV2ListLabelPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsDriveLabelsV2ListLabelPermissionsResponse;
  }

  /**
   * Publish all draft changes to the Label. Once published, the Label may not
   * return to its draft state. See `google.apps.drive.labels.v2.Lifecycle` for
   * more information. Publishing a Label will result in a new published
   * revision. All previous draft revisions will be deleted. Previous published
   * revisions will be kept but are subject to automated deletion as needed.
   * Once published, some changes are no longer permitted. Generally, any change
   * that would invalidate or cause new restrictions on existing metadata
   * related to the Label will be rejected. For example, the following changes
   * to a Label will be rejected after the Label is published: * The label
   * cannot be directly deleted. It must be disabled first, then deleted. *
   * Field.FieldType cannot be changed. * Changes to Field validation options
   * cannot reject something that was previously accepted. * Reducing the max
   * entries.
   *
   * @param name Required. Label resource name.
   */
  async labelsPublish(name: string, req: GoogleAppsDriveLabelsV2PublishLabelRequest): Promise<GoogleAppsDriveLabelsV2Label> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:publish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * Lists the LabelLocks on a Label.
   *
   * @param parent Required. Label on which Locks are applied. Format: labels/{label}
   */
  async labelsRevisionsLocksList(parent: string, opts: LabelsRevisionsLocksListOptions = {}): Promise<GoogleAppsDriveLabelsV2ListLabelLocksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/locks`);
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
    return data as GoogleAppsDriveLabelsV2ListLabelLocksResponse;
  }

  /**
   * Deletes Label permissions. Permissions affect the Label resource as a
   * whole, are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name shared by all permissions being deleted. Format: labels/{label} If this is set, the parent field in the UpdateLabelPermissionRequest messages must either be empty or match this field.
   */
  async labelsRevisionsPermissionsBatchDelete(parent: string, req: GoogleAppsDriveLabelsV2BatchDeleteLabelPermissionsRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Updates Label permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name shared by all permissions being updated. Format: labels/{label} If this is set, the parent field in the UpdateLabelPermissionRequest messages must either be empty or match this field.
   */
  async labelsRevisionsPermissionsBatchUpdate(parent: string, req: GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsRequest): Promise<GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsResponse;
  }

  /**
   * Updates a Label's permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name on the Label Permission is created. Format: labels/{label}
   */
  async labelsRevisionsPermissionsCreate(parent: string, req: GoogleAppsDriveLabelsV2LabelPermission, opts: LabelsRevisionsPermissionsCreateOptions = {}): Promise<GoogleAppsDriveLabelsV2LabelPermission> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAppsDriveLabelsV2LabelPermission;
  }

  /**
   * Deletes a Label's permission. Permissions affect the Label resource as a
   * whole, are not revisioned, and do not require publishing.
   *
   * @param name Required. Label Permission resource name.
   */
  async labelsRevisionsPermissionsDelete(name: string, opts: LabelsRevisionsPermissionsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists a Label's permissions.
   *
   * @param parent Required. The parent Label resource name on which Label Permission are listed. Format: labels/{label}
   */
  async labelsRevisionsPermissionsList(parent: string, opts: LabelsRevisionsPermissionsListOptions = {}): Promise<GoogleAppsDriveLabelsV2ListLabelPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsDriveLabelsV2ListLabelPermissionsResponse;
  }

  /**
   * Updates a Label's permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name.
   */
  async labelsRevisionsUpdatePermissions(parent: string, req: GoogleAppsDriveLabelsV2LabelPermission, opts: LabelsRevisionsUpdatePermissionsOptions = {}): Promise<GoogleAppsDriveLabelsV2LabelPermission> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAppsDriveLabelsV2LabelPermission;
  }

  /**
   * Updates a Label's `CopyMode`. Changes to this policy are not revisioned,
   * do not require publishing, and take effect immediately.
   *
   * @param name Required. The resource name of the Label to update.
   */
  async labelsUpdateLabelCopyMode(name: string, req: GoogleAppsDriveLabelsV2UpdateLabelCopyModeRequest): Promise<GoogleAppsDriveLabelsV2Label> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateLabelCopyMode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAppsDriveLabelsV2Label(data);
  }

  /**
   * Updates a Label's permissions. If a permission for the indicated principal
   * doesn't exist, a new Label Permission is created, otherwise the existing
   * permission is updated. Permissions affect the Label resource as a whole,
   * are not revisioned, and do not require publishing.
   *
   * @param parent Required. The parent Label resource name.
   */
  async labelsUpdatePermissions(parent: string, req: GoogleAppsDriveLabelsV2LabelPermission, opts: LabelsUpdatePermissionsOptions = {}): Promise<GoogleAppsDriveLabelsV2LabelPermission> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/permissions`);
    if (opts.useAdminAccess !== undefined) {
      url.searchParams.append("useAdminAccess", String(opts.useAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAppsDriveLabelsV2LabelPermission;
  }

  /**
   * Get the constraints on the structure of a Label; such as, the maximum
   * number of Fields allowed and maximum length of the label title.
   *
   */
  async limitsGetLabel(opts: LimitsGetLabelOptions = {}): Promise<GoogleAppsDriveLabelsV2LabelLimits> {
    const url = new URL(`${this.#baseUrl}v2/limits/label`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsDriveLabelsV2LabelLimits(data);
  }

  /**
   * Gets the user capabilities.
   *
   * @param name Required. The resource name of the user. Only "users/me/capabilities" is supported.
   */
  async usersGetCapabilities(name: string): Promise<GoogleAppsDriveLabelsV2UserCapabilities> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsDriveLabelsV2UserCapabilities;
  }
}

/**
 * The color derived from BadgeConfig and changed to the closest recommended
 * supported color.
 */
export interface GoogleAppsDriveLabelsV2BadgeColors {
  /**
   * Output only. Badge background that pairs with the foreground.
   */
  readonly backgroundColor?: GoogleTypeColor;
  /**
   * Output only. Badge foreground that pairs with the background.
   */
  readonly foregroundColor?: GoogleTypeColor;
  /**
   * Output only. Color that can be used for text without a background.
   */
  readonly soloColor?: GoogleTypeColor;
}

/**
 * Badge status of the label.
 */
export interface GoogleAppsDriveLabelsV2BadgeConfig {
  /**
   * The color of the badge. When not specified, no badge is rendered. The
   * background, foreground, and solo (light and dark mode) colors set here are
   * changed in the Drive UI into the closest recommended supported color.
   */
  color?: GoogleTypeColor;
  /**
   * Override the default global priority of this badge. When set to 0, the
   * default priority heuristic is used.
   */
  priorityOverride?: bigint;
}

function serializeGoogleAppsDriveLabelsV2BadgeConfig(data: any): GoogleAppsDriveLabelsV2BadgeConfig {
  return {
    ...data,
    priorityOverride: data["priorityOverride"] !== undefined ? String(data["priorityOverride"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2BadgeConfig(data: any): GoogleAppsDriveLabelsV2BadgeConfig {
  return {
    ...data,
    priorityOverride: data["priorityOverride"] !== undefined ? BigInt(data["priorityOverride"]) : undefined,
  };
}

/**
 * Deletes one of more Label Permissions.
 */
export interface GoogleAppsDriveLabelsV2BatchDeleteLabelPermissionsRequest {
  /**
   * Required. The request message specifying the resources to update.
   */
  requests?: GoogleAppsDriveLabelsV2DeleteLabelPermissionRequest[];
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access. If
   * this is set, the use_admin_access field in the DeleteLabelPermissionRequest
   * messages must either be empty or match this field.
   */
  useAdminAccess?: boolean;
}

/**
 * Updates one or more Label Permissions.
 */
export interface GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsRequest {
  /**
   * Required. The request message specifying the resources to update.
   */
  requests?: GoogleAppsDriveLabelsV2UpdateLabelPermissionRequest[];
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access. If
   * this is set, the use_admin_access field in the UpdateLabelPermissionRequest
   * messages must either be empty or match this field.
   */
  useAdminAccess?: boolean;
}

/**
 * Response for updating one or more Label Permissions.
 */
export interface GoogleAppsDriveLabelsV2BatchUpdateLabelPermissionsResponse {
  /**
   * Required. Permissions updated.
   */
  permissions?: GoogleAppsDriveLabelsV2LabelPermission[];
}

/**
 * Limits for date Field type.
 */
export interface GoogleAppsDriveLabelsV2DateLimits {
  /**
   * Maximum value for the date Field type.
   */
  maxValue?: GoogleTypeDate;
  /**
   * Minimum value for the date Field type.
   */
  minValue?: GoogleTypeDate;
}

/**
 * Deletes a Label Permission. Permissions affect the Label resource as a
 * whole, are not revisioned, and do not require publishing.
 */
export interface GoogleAppsDriveLabelsV2DeleteLabelPermissionRequest {
  /**
   * Required. Label Permission resource name.
   */
  name?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * The set of requests for updating aspects of a Label. If any request is not
 * valid, no requests will be applied.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequest {
  /**
   * The BCP-47 language code to use for evaluating localized Field labels when
   * `include_label_in_response` is `true`.
   */
  languageCode?: string;
  /**
   * A list of updates to apply to the Label. Requests will be applied in the
   * order they are specified.
   */
  requests?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest[];
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * When specified, only certain fields belonging to the indicated view will
   * be returned.
   */
  view?:  | "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL";
  /**
   * Provides control over how write requests are executed.
   */
  writeControl?: GoogleAppsDriveLabelsV2WriteControl;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest(item))) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest(item))) : undefined,
  };
}

/**
 * Request to create a Field within a Label.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest {
  /**
   * Required. Field to create.
   */
  field?: GoogleAppsDriveLabelsV2Field;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest {
  return {
    ...data,
    field: data["field"] !== undefined ? serializeGoogleAppsDriveLabelsV2Field(data["field"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest {
  return {
    ...data,
    field: data["field"] !== undefined ? deserializeGoogleAppsDriveLabelsV2Field(data["field"]) : undefined,
  };
}

/**
 * Request to create a Selection Choice.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest {
  /**
   * Required. The Choice to create.
   */
  choice?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoice;
  /**
   * Required. The Selection Field in which a Choice will be created.
   */
  fieldId?: string;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest {
  return {
    ...data,
    choice: data["choice"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(data["choice"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest {
  return {
    ...data,
    choice: data["choice"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(data["choice"]) : undefined,
  };
}

/**
 * Request to delete the Field.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDeleteFieldRequest {
  /**
   * Required. ID of the Field to delete.
   */
  id?: string;
}

/**
 * Request to delete a Choice.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDeleteSelectionChoiceRequest {
  /**
   * Required. The Selection Field from which a Choice will be deleted.
   */
  fieldId?: string;
  /**
   * Required. Choice to delete.
   */
  id?: string;
}

/**
 * Request to disable the Field.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest {
  /**
   * Required. Field Disabled Policy.
   */
  disabledPolicy?: GoogleAppsDriveLabelsV2LifecycleDisabledPolicy;
  /**
   * Required. Key of the Field to disable.
   */
  id?: string;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `disabled_policy` is implied and should not be specified. A single
   * `*` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to disable a Choice.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest {
  /**
   * Required. The disabled policy to update.
   */
  disabledPolicy?: GoogleAppsDriveLabelsV2LifecycleDisabledPolicy;
  /**
   * Required. The Selection Field in which a Choice will be disabled.
   */
  fieldId?: string;
  /**
   * Required. Choice to disable.
   */
  id?: string;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `disabled_policy` is implied and should not be specified. A single
   * `*` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to enable the Field.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestEnableFieldRequest {
  /**
   * Required. ID of the Field to enable.
   */
  id?: string;
}

/**
 * Request to enable a Choice.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestEnableSelectionChoiceRequest {
  /**
   * Required. The Selection Field in which a Choice will be enabled.
   */
  fieldId?: string;
  /**
   * Required. Choice to enable.
   */
  id?: string;
}

/**
 * A single kind of update to apply to a Label.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest {
  /**
   * Creates a new Field.
   */
  createField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest;
  /**
   * Creates Choice within a Selection field.
   */
  createSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest;
  /**
   * Deletes a Field from the label.
   */
  deleteField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDeleteFieldRequest;
  /**
   * Delete a Choice within a Selection Field.
   */
  deleteSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDeleteSelectionChoiceRequest;
  /**
   * Disables the Field.
   */
  disableField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest;
  /**
   * Disable a Choice within a Selection Field.
   */
  disableSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest;
  /**
   * Enables the Field.
   */
  enableField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestEnableFieldRequest;
  /**
   * Enable a Choice within a Selection Field.
   */
  enableSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestEnableSelectionChoiceRequest;
  /**
   * Updates basic properties of a Field.
   */
  updateField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest;
  /**
   * Update Field type and/or type options.
   */
  updateFieldType?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest;
  /**
   * Updates the Label properties.
   */
  updateLabel?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest;
  /**
   * Update a Choice properties within a Selection Field.
   */
  updateSelectionChoiceProperties?: GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest {
  return {
    ...data,
    createField: data["createField"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest(data["createField"]) : undefined,
    createSelectionChoice: data["createSelectionChoice"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest(data["createSelectionChoice"]) : undefined,
    disableField: data["disableField"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest(data["disableField"]) : undefined,
    disableSelectionChoice: data["disableSelectionChoice"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest(data["disableSelectionChoice"]) : undefined,
    updateField: data["updateField"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest(data["updateField"]) : undefined,
    updateFieldType: data["updateFieldType"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest(data["updateFieldType"]) : undefined,
    updateLabel: data["updateLabel"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest(data["updateLabel"]) : undefined,
    updateSelectionChoiceProperties: data["updateSelectionChoiceProperties"] !== undefined ? serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest(data["updateSelectionChoiceProperties"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestRequest {
  return {
    ...data,
    createField: data["createField"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateFieldRequest(data["createField"]) : undefined,
    createSelectionChoice: data["createSelectionChoice"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestCreateSelectionChoiceRequest(data["createSelectionChoice"]) : undefined,
    disableField: data["disableField"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableFieldRequest(data["disableField"]) : undefined,
    disableSelectionChoice: data["disableSelectionChoice"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestDisableSelectionChoiceRequest(data["disableSelectionChoice"]) : undefined,
    updateField: data["updateField"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest(data["updateField"]) : undefined,
    updateFieldType: data["updateFieldType"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest(data["updateFieldType"]) : undefined,
    updateLabel: data["updateLabel"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest(data["updateLabel"]) : undefined,
    updateSelectionChoiceProperties: data["updateSelectionChoiceProperties"] !== undefined ? deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest(data["updateSelectionChoiceProperties"]) : undefined,
  };
}

/**
 * Request to update Field properties.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest {
  /**
   * Required. The Field to update.
   */
  id?: string;
  /**
   * Required. Basic Field properties.
   */
  properties?: GoogleAppsDriveLabelsV2FieldProperties;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `properties` is implied and should not be specified. A single `*`
   * can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldPropertiesRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to change the type of a Field.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest {
  /**
   * Update field to Date.
   */
  dateOptions?: GoogleAppsDriveLabelsV2FieldDateOptions;
  /**
   * Required. The Field to update.
   */
  id?: string;
  /**
   * Update field to Integer.
   */
  integerOptions?: GoogleAppsDriveLabelsV2FieldIntegerOptions;
  /**
   * Update field to Long Text.
   */
  longTextOptions?: GoogleAppsDriveLabelsV2FieldLongTextOptions;
  /**
   * Update field to Selection.
   */
  selectionOptions?: GoogleAppsDriveLabelsV2FieldSelectionOptions;
  /**
   * Update field to Text.
   */
  textOptions?: GoogleAppsDriveLabelsV2FieldTextOptions;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root of `type_options` is implied and should not be specified. A single
   * `*` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Update field to User.
   */
  userOptions?: GoogleAppsDriveLabelsV2FieldUserOptions;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest {
  return {
    ...data,
    selectionOptions: data["selectionOptions"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data["selectionOptions"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateFieldTypeRequest {
  return {
    ...data,
    selectionOptions: data["selectionOptions"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data["selectionOptions"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Updates basic properties of a Label.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest {
  /**
   * Required. Label properties to update.
   */
  properties?: GoogleAppsDriveLabelsV2LabelProperties;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `label_properties` is implied and should not be specified. A
   * single `*` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateLabelPropertiesRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to update a Choice properties.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest {
  /**
   * Required. The Selection Field to update.
   */
  fieldId?: string;
  /**
   * Required. The Choice to update.
   */
  id?: string;
  /**
   * Required. The Choice properties to update.
   */
  properties?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `properties` is implied and should not be specified. A single `*`
   * can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest {
  return {
    ...data,
    properties: data["properties"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data["properties"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelRequestUpdateSelectionChoicePropertiesRequest {
  return {
    ...data,
    properties: data["properties"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data["properties"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response for Label update.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponse {
  /**
   * The reply of the updates. This maps 1:1 with the updates, although
   * responses to some requests may be empty.
   */
  responses?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseResponse[];
  /**
   * The label after updates were applied. This is only set if
   * [BatchUpdateLabelResponse2.include_label_in_response] is `true` and there
   * were no errors.
   */
  updatedLabel?: GoogleAppsDriveLabelsV2Label;
}

function serializeGoogleAppsDriveLabelsV2DeltaUpdateLabelResponse(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelResponse {
  return {
    ...data,
    updatedLabel: data["updatedLabel"] !== undefined ? serializeGoogleAppsDriveLabelsV2Label(data["updatedLabel"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DeltaUpdateLabelResponse(data: any): GoogleAppsDriveLabelsV2DeltaUpdateLabelResponse {
  return {
    ...data,
    updatedLabel: data["updatedLabel"] !== undefined ? deserializeGoogleAppsDriveLabelsV2Label(data["updatedLabel"]) : undefined,
  };
}

/**
 * Response following Field create.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseCreateFieldResponse {
  /**
   * The field of the created field. When left blank in a create request, a key
   * will be autogenerated and can be identified here.
   */
  id?: string;
  /**
   * The priority of the created field. The priority may change from what was
   * specified to assure contiguous priorities between fields (1-n).
   */
  priority?: number;
}

/**
 * Response following Selection Choice create.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseCreateSelectionChoiceResponse {
  /**
   * The server-generated id of the field.
   */
  fieldId?: string;
  /**
   * The server-generated ID of the created choice within the Field
   */
  id?: string;
}

/**
 * Response following Field delete.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDeleteFieldResponse {
}

/**
 * Response following Choice delete.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDeleteSelectionChoiceResponse {
}

/**
 * Response following Field disable.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDisableFieldResponse {
}

/**
 * Response following Choice disable.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDisableSelectionChoiceResponse {
}

/**
 * Response following Field enable.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseEnableFieldResponse {
}

/**
 * Response following Choice enable.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseEnableSelectionChoiceResponse {
}

/**
 * A single response from an update.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseResponse {
  /**
   * Creates a new Field.
   */
  createField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseCreateFieldResponse;
  /**
   * Creates a new selection list option to add to a Selection Field.
   */
  createSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseCreateSelectionChoiceResponse;
  /**
   * Deletes a Field from the label.
   */
  deleteField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDeleteFieldResponse;
  /**
   * Deletes a Choice from a Selection Field.
   */
  deleteSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDeleteSelectionChoiceResponse;
  /**
   * Disables Field.
   */
  disableField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDisableFieldResponse;
  /**
   * Disables a Choice within a Selection Field.
   */
  disableSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseDisableSelectionChoiceResponse;
  /**
   * Enables Field.
   */
  enableField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseEnableFieldResponse;
  /**
   * Enables a Choice within a Selection Field.
   */
  enableSelectionChoice?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseEnableSelectionChoiceResponse;
  /**
   * Updates basic properties of a Field.
   */
  updateField?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateFieldPropertiesResponse;
  /**
   * Update Field type and/or type options.
   */
  updateFieldType?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateFieldTypeResponse;
  /**
   * Updated basic properties of a Label.
   */
  updateLabel?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateLabelPropertiesResponse;
  /**
   * Updates a Choice within a Selection Field.
   */
  updateSelectionChoiceProperties?: GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse;
}

/**
 * Response following update to Field properties.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateFieldPropertiesResponse {
  /**
   * The priority of the updated field. The priority may change from what was
   * specified to assure contiguous priorities between fields (1-n).
   */
  priority?: number;
}

/**
 * Response following update to Field type.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateFieldTypeResponse {
}

/**
 * Response following update to Label properties.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateLabelPropertiesResponse {
}

/**
 * Response following update to Selection Choice properties.
 */
export interface GoogleAppsDriveLabelsV2DeltaUpdateLabelResponseUpdateSelectionChoicePropertiesResponse {
  /**
   * The priority of the updated choice. The priority may change from what was
   * specified to assure contiguous priorities between choices (1-n).
   */
  priority?: number;
}

/**
 * Request to deprecate a published Label.
 */
export interface GoogleAppsDriveLabelsV2DisableLabelRequest {
  /**
   * Disabled policy to use.
   */
  disabledPolicy?: GoogleAppsDriveLabelsV2LifecycleDisabledPolicy;
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language will be used.
   */
  languageCode?: string;
  /**
   * The fields that should be updated. At least one field must be specified.
   * The root `disabled_policy` is implied and should not be specified. A single
   * `*` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * Provides control over how write requests are executed. Defaults to unset,
   * which means last write wins.
   */
  writeControl?: GoogleAppsDriveLabelsV2WriteControl;
}

function serializeGoogleAppsDriveLabelsV2DisableLabelRequest(data: any): GoogleAppsDriveLabelsV2DisableLabelRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2DisableLabelRequest(data: any): GoogleAppsDriveLabelsV2DisableLabelRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to enable a label.
 */
export interface GoogleAppsDriveLabelsV2EnableLabelRequest {
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language will be used.
   */
  languageCode?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * Provides control over how write requests are executed. Defaults to unset,
   * which means last write wins.
   */
  writeControl?: GoogleAppsDriveLabelsV2WriteControl;
}

/**
 * Defines a field that has a display name, data type, and other configuration
 * options. This field defines the kind of metadata that may be set on a Drive
 * item.
 */
export interface GoogleAppsDriveLabelsV2Field {
  /**
   * Output only. The capabilities this user has on this field and its value
   * when the label is applied on Drive items.
   */
  readonly appliedCapabilities?: GoogleAppsDriveLabelsV2FieldAppliedCapabilities;
  /**
   * Output only. The time this field was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user who created this field.
   */
  readonly creator?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Date field options.
   */
  dateOptions?: GoogleAppsDriveLabelsV2FieldDateOptions;
  /**
   * Output only. The user who disabled this field. This value has no meaning
   * when the field is not disabled.
   */
  readonly disabler?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this field was disabled. This value has no meaning
   * when the field is not disabled.
   */
  readonly disableTime?: Date;
  /**
   * Output only. UI display hints for rendering a field.
   */
  readonly displayHints?: GoogleAppsDriveLabelsV2FieldDisplayHints;
  /**
   * Output only. The key of a field, unique within a label or library. This
   * value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`
   */
  readonly id?: string;
  /**
   * Integer field options.
   */
  integerOptions?: GoogleAppsDriveLabelsV2FieldIntegerOptions;
  /**
   * Output only. The lifecycle of this field.
   */
  readonly lifecycle?: GoogleAppsDriveLabelsV2Lifecycle;
  /**
   * Output only. The LockStatus of this field.
   */
  readonly lockStatus?: GoogleAppsDriveLabelsV2LockStatus;
  /**
   * The basic properties of the field.
   */
  properties?: GoogleAppsDriveLabelsV2FieldProperties;
  /**
   * Output only. The user who published this field. This value has no meaning
   * when the field is not published.
   */
  readonly publisher?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The key to use when constructing Drive search queries to find
   * files based on values defined for this field on files. For example,
   * "`{query_key}` > 2001-01-01".
   */
  readonly queryKey?: string;
  /**
   * Output only. The capabilities this user has when editing this field.
   */
  readonly schemaCapabilities?: GoogleAppsDriveLabelsV2FieldSchemaCapabilities;
  /**
   * Selection field options.
   */
  selectionOptions?: GoogleAppsDriveLabelsV2FieldSelectionOptions;
  /**
   * Text field options.
   */
  textOptions?: GoogleAppsDriveLabelsV2FieldTextOptions;
  /**
   * Output only. The user who modified this field.
   */
  readonly updater?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this field was updated.
   */
  readonly updateTime?: Date;
  /**
   * User field options.
   */
  userOptions?: GoogleAppsDriveLabelsV2FieldUserOptions;
}

function serializeGoogleAppsDriveLabelsV2Field(data: any): GoogleAppsDriveLabelsV2Field {
  return {
    ...data,
    selectionOptions: data["selectionOptions"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data["selectionOptions"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2Field(data: any): GoogleAppsDriveLabelsV2Field {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    disableTime: data["disableTime"] !== undefined ? new Date(data["disableTime"]) : undefined,
    selectionOptions: data["selectionOptions"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data["selectionOptions"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The capabilities related to this field on applied metadata.
 */
export interface GoogleAppsDriveLabelsV2FieldAppliedCapabilities {
  /**
   * Whether the user can read related applied metadata on items.
   */
  canRead?: boolean;
  /**
   * Whether the user can search for Drive items referencing this field.
   */
  canSearch?: boolean;
  /**
   * Whether the user can set this field on Drive items.
   */
  canWrite?: boolean;
}

/**
 * Options for the date field type.
 */
export interface GoogleAppsDriveLabelsV2FieldDateOptions {
  /**
   * Output only. ICU date format.
   */
  readonly dateFormat?: string;
  /**
   * Localized date formatting option. Field values are rendered in this format
   * according to their locale.
   */
  dateFormatType?:  | "DATE_FORMAT_UNSPECIFIED" | "LONG_DATE" | "SHORT_DATE";
  /**
   * Output only. Maximum valid value (year, month, day).
   */
  readonly maxValue?: GoogleTypeDate;
  /**
   * Output only. Minimum valid value (year, month, day).
   */
  readonly minValue?: GoogleTypeDate;
}

/**
 * UI display hints for rendering a field.
 */
export interface GoogleAppsDriveLabelsV2FieldDisplayHints {
  /**
   * Whether the field should be shown in the UI as disabled.
   */
  disabled?: boolean;
  /**
   * This field should be hidden in the search menu when searching for Drive
   * items.
   */
  hiddenInSearch?: boolean;
  /**
   * Whether the field should be shown as required in the UI.
   */
  required?: boolean;
  /**
   * This field should be shown in the apply menu when applying values to a
   * Drive item.
   */
  shownInApply?: boolean;
}

/**
 * Options for the Integer field type.
 */
export interface GoogleAppsDriveLabelsV2FieldIntegerOptions {
  /**
   * Output only. The maximum valid value for the integer field.
   */
  readonly maxValue?: bigint;
  /**
   * Output only. The minimum valid value for the integer field.
   */
  readonly minValue?: bigint;
}

/**
 * Field constants governing the structure of a Field; such as, the maximum
 * title length, minimum and maximum field values or length, etc.
 */
export interface GoogleAppsDriveLabelsV2FieldLimits {
  /**
   * Date Field limits.
   */
  dateLimits?: GoogleAppsDriveLabelsV2DateLimits;
  /**
   * Integer Field limits.
   */
  integerLimits?: GoogleAppsDriveLabelsV2IntegerLimits;
  /**
   * Long text Field limits.
   */
  longTextLimits?: GoogleAppsDriveLabelsV2LongTextLimits;
  /**
   * Limits for Field description, also called help text.
   */
  maxDescriptionLength?: number;
  /**
   * Limits for Field title.
   */
  maxDisplayNameLength?: number;
  /**
   * Max length for the id.
   */
  maxIdLength?: number;
  /**
   * Selection Field limits.
   */
  selectionLimits?: GoogleAppsDriveLabelsV2SelectionLimits;
  /**
   * The relevant limits for the specified Field.Type. Text Field limits.
   */
  textLimits?: GoogleAppsDriveLabelsV2TextLimits;
  /**
   * User Field limits.
   */
  userLimits?: GoogleAppsDriveLabelsV2UserLimits;
}

function serializeGoogleAppsDriveLabelsV2FieldLimits(data: any): GoogleAppsDriveLabelsV2FieldLimits {
  return {
    ...data,
    integerLimits: data["integerLimits"] !== undefined ? serializeGoogleAppsDriveLabelsV2IntegerLimits(data["integerLimits"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2FieldLimits(data: any): GoogleAppsDriveLabelsV2FieldLimits {
  return {
    ...data,
    integerLimits: data["integerLimits"] !== undefined ? deserializeGoogleAppsDriveLabelsV2IntegerLimits(data["integerLimits"]) : undefined,
  };
}

/**
 * Options for a multi-valued variant of an associated field type.
 */
export interface GoogleAppsDriveLabelsV2FieldListOptions {
  /**
   * Maximum number of entries permitted.
   */
  maxEntries?: number;
}

/**
 * Options the Long Text field type.
 */
export interface GoogleAppsDriveLabelsV2FieldLongTextOptions {
  /**
   * Output only. The maximum valid length of values for the text field.
   */
  readonly maxLength?: number;
  /**
   * Output only. The minimum valid length of values for the text field.
   */
  readonly minLength?: number;
}

/**
 * The basic properties of the field.
 */
export interface GoogleAppsDriveLabelsV2FieldProperties {
  /**
   * Required. The display text to show in the UI identifying this field.
   */
  displayName?: string;
  /**
   * Input only. Insert or move this field before the indicated field. If
   * empty, the field is placed at the end of the list.
   */
  insertBeforeField?: string;
  /**
   * Whether the field should be marked as required.
   */
  required?: boolean;
}

/**
 * The capabilities related to this field when editing the field.
 */
export interface GoogleAppsDriveLabelsV2FieldSchemaCapabilities {
  /**
   * Whether the user can delete this field. The user must have permission and
   * the field must be deprecated.
   */
  canDelete?: boolean;
  /**
   * Whether the user can disable this field. The user must have permission and
   * this field must not already be disabled.
   */
  canDisable?: boolean;
  /**
   * Whether the user can enable this field. The user must have permission and
   * this field must be disabled.
   */
  canEnable?: boolean;
  /**
   * Whether the user can change this field.
   */
  canUpdate?: boolean;
}

/**
 * Options for the selection field type.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptions {
  /**
   * The options available for this selection field. The list order is
   * consistent, and modified with `insert_before_choice`.
   */
  choices?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoice[];
  /**
   * When specified, indicates this field supports a list of values. Once the
   * field is published, this cannot be changed.
   */
  listOptions?: GoogleAppsDriveLabelsV2FieldListOptions;
}

function serializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptions {
  return {
    ...data,
    choices: data["choices"] !== undefined ? data["choices"].map((item: any) => (serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(item))) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2FieldSelectionOptions(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptions {
  return {
    ...data,
    choices: data["choices"] !== undefined ? data["choices"].map((item: any) => (deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(item))) : undefined,
  };
}

/**
 * Selection field choice.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptionsChoice {
  /**
   * Output only. The capabilities related to this choice on applied metadata.
   */
  readonly appliedCapabilities?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceAppliedCapabilities;
  /**
   * Output only. The time this choice was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user who created this choice.
   */
  readonly creator?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The user who disabled this choice. This value has no meaning
   * when the option is not disabled.
   */
  readonly disabler?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this choice was disabled. This value has no meaning
   * when the choice is not disabled.
   */
  readonly disableTime?: Date;
  /**
   * Output only. UI display hints for rendering a choice.
   */
  readonly displayHints?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints;
  /**
   * The unique value of the choice. This ID is autogenerated. Matches the
   * regex: `([a-zA-Z0-9_])+`.
   */
  id?: string;
  /**
   * Output only. Lifecycle of the choice.
   */
  readonly lifecycle?: GoogleAppsDriveLabelsV2Lifecycle;
  /**
   * Output only. The LockStatus of this choice.
   */
  readonly lockStatus?: GoogleAppsDriveLabelsV2LockStatus;
  /**
   * Basic properties of the choice.
   */
  properties?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties;
  /**
   * Output only. The user who published this choice. This value has no meaning
   * when the choice is not published.
   */
  readonly publisher?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this choice was published. This value has no meaning
   * when the choice is not published.
   */
  readonly publishTime?: Date;
  /**
   * Output only. The capabilities related to this option when editing the
   * option.
   */
  readonly schemaCapabilities?: GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceSchemaCapabilities;
  /**
   * Output only. The user who updated this choice last.
   */
  readonly updater?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this choice was updated last.
   */
  readonly updateTime?: Date;
}

function serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoice {
  return {
    ...data,
    properties: data["properties"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data["properties"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoice(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoice {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    disableTime: data["disableTime"] !== undefined ? new Date(data["disableTime"]) : undefined,
    displayHints: data["displayHints"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints(data["displayHints"]) : undefined,
    properties: data["properties"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data["properties"]) : undefined,
    publishTime: data["publishTime"] !== undefined ? new Date(data["publishTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The capabilities related to this choice on applied metadata.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceAppliedCapabilities {
  /**
   * Whether the user can read related applied metadata on items.
   */
  canRead?: boolean;
  /**
   * Whether the user can use this choice in search queries.
   */
  canSearch?: boolean;
  /**
   * Whether the user can select this choice on an item.
   */
  canSelect?: boolean;
}

/**
 * UI display hints for rendering an option.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints {
  /**
   * The colors to use for the badge. Changed to Google Material colors based
   * on the chosen `properties.badge_config.color`.
   */
  badgeColors?: GoogleAppsDriveLabelsV2BadgeColors;
  /**
   * The priority of this badge. Used to compare and sort between multiple
   * badges. A lower number means the badge should be shown first. When a
   * badging configuration is not present, this will be 0. Otherwise, this will
   * be set to `BadgeConfig.priority_override` or the default heuristic which
   * prefers creation date of the label, and field and option priority.
   */
  badgePriority?: bigint;
  /**
   * The dark-mode color to use for the badge. Changed to Google Material
   * colors based on the chosen `properties.badge_config.color`.
   */
  darkBadgeColors?: GoogleAppsDriveLabelsV2BadgeColors;
  /**
   * Whether the option should be shown in the UI as disabled.
   */
  disabled?: boolean;
  /**
   * This option should be hidden in the search menu when searching for Drive
   * items.
   */
  hiddenInSearch?: boolean;
  /**
   * This option should be shown in the apply menu when applying values to a
   * Drive item.
   */
  shownInApply?: boolean;
}

function serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints {
  return {
    ...data,
    badgePriority: data["badgePriority"] !== undefined ? String(data["badgePriority"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceDisplayHints {
  return {
    ...data,
    badgePriority: data["badgePriority"] !== undefined ? BigInt(data["badgePriority"]) : undefined,
  };
}

/**
 * Basic properties of the choice.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties {
  /**
   * The badge configuration for this choice. When set, the label that owns
   * this choice is considered a "badged label".
   */
  badgeConfig?: GoogleAppsDriveLabelsV2BadgeConfig;
  /**
   * The description of this label.
   */
  description?: string;
  /**
   * Required. The display text to show in the UI identifying this field.
   */
  displayName?: string;
  /**
   * Input only. Insert or move this choice before the indicated choice. If
   * empty, the choice is placed at the end of the list.
   */
  insertBeforeChoice?: string;
}

function serializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties {
  return {
    ...data,
    badgeConfig: data["badgeConfig"] !== undefined ? serializeGoogleAppsDriveLabelsV2BadgeConfig(data["badgeConfig"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties(data: any): GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceProperties {
  return {
    ...data,
    badgeConfig: data["badgeConfig"] !== undefined ? deserializeGoogleAppsDriveLabelsV2BadgeConfig(data["badgeConfig"]) : undefined,
  };
}

/**
 * The capabilities related to this choice when editing the choice.
 */
export interface GoogleAppsDriveLabelsV2FieldSelectionOptionsChoiceSchemaCapabilities {
  /**
   * Whether the user can delete this choice.
   */
  canDelete?: boolean;
  /**
   * Whether the user can disable this choice.
   */
  canDisable?: boolean;
  /**
   * Whether the user can enable this choice.
   */
  canEnable?: boolean;
  /**
   * Whether the user can update this choice.
   */
  canUpdate?: boolean;
}

/**
 * Options for the Text field type.
 */
export interface GoogleAppsDriveLabelsV2FieldTextOptions {
  /**
   * Output only. The maximum valid length of values for the text field.
   */
  readonly maxLength?: number;
  /**
   * Output only. The minimum valid length of values for the text field.
   */
  readonly minLength?: number;
}

/**
 * Options for the user field type.
 */
export interface GoogleAppsDriveLabelsV2FieldUserOptions {
  /**
   * When specified, indicates that this field supports a list of values. Once
   * the field is published, this cannot be changed.
   */
  listOptions?: GoogleAppsDriveLabelsV2FieldListOptions;
}

/**
 * Limits for integer Field type.
 */
export interface GoogleAppsDriveLabelsV2IntegerLimits {
  /**
   * Maximum value for an integer Field type.
   */
  maxValue?: bigint;
  /**
   * Minimum value for an integer Field type.
   */
  minValue?: bigint;
}

function serializeGoogleAppsDriveLabelsV2IntegerLimits(data: any): GoogleAppsDriveLabelsV2IntegerLimits {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? String(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? String(data["minValue"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2IntegerLimits(data: any): GoogleAppsDriveLabelsV2IntegerLimits {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? BigInt(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? BigInt(data["minValue"]) : undefined,
  };
}

/**
 * A label defines a taxonomy that can be applied to Drive items in order to
 * organize and search across items. Labels can be simple strings, or can
 * contain fields that describe additional metadata that can be further used to
 * organize and search Drive items.
 */
export interface GoogleAppsDriveLabelsV2Label {
  /**
   * Output only. The capabilities related to this label on applied metadata.
   */
  readonly appliedCapabilities?: GoogleAppsDriveLabelsV2LabelAppliedCapabilities;
  /**
   * Output only. Behavior of this label when it's applied to Drive items.
   */
  readonly appliedLabelPolicy?: GoogleAppsDriveLabelsV2LabelAppliedLabelPolicy;
  /**
   * Output only. The time this label was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user who created this label.
   */
  readonly creator?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The user who disabled this label. This value has no meaning
   * when the label is not disabled.
   */
  readonly disabler?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this label was disabled. This value has no meaning
   * when the label is not disabled.
   */
  readonly disableTime?: Date;
  /**
   * Output only. UI display hints for rendering the label.
   */
  readonly displayHints?: GoogleAppsDriveLabelsV2LabelDisplayHints;
  /**
   * List of fields in descending priority order.
   */
  fields?: GoogleAppsDriveLabelsV2Field[];
  /**
   * Output only. Globally unique identifier of this label. ID makes up part of
   * the label `name`, but unlike `name`, ID is consistent between revisions.
   * Matches the regex: `([a-zA-Z0-9])+`
   */
  readonly id?: string;
  /**
   * Required. The type of label.
   */
  labelType?:  | "LABEL_TYPE_UNSPECIFIED" | "SHARED" | "ADMIN";
  /**
   * Custom URL to present to users to allow them to learn more about this
   * label and how it should be used.
   */
  learnMoreUri?: string;
  /**
   * Output only. The lifecycle state of the label including whether it's
   * published, deprecated, and has draft changes.
   */
  readonly lifecycle?: GoogleAppsDriveLabelsV2Lifecycle;
  /**
   * Output only. The LockStatus of this label.
   */
  readonly lockStatus?: GoogleAppsDriveLabelsV2LockStatus;
  /**
   * Output only. Resource name of the label. Will be in the form of either:
   * `labels/{id}` or `labels/{id}@{revision_id}` depending on the request. See
   * `id` and `revision_id` below.
   */
  readonly name?: string;
  /**
   * Required. The basic properties of the label.
   */
  properties?: GoogleAppsDriveLabelsV2LabelProperties;
  /**
   * Output only. The user who published this label. This value has no meaning
   * when the label is not published.
   */
  readonly publisher?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. The time this label was published. This value has no meaning
   * when the label is not published.
   */
  readonly publishTime?: Date;
  /**
   * Output only. The time this label revision was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. The user who created this label revision.
   */
  readonly revisionCreator?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. Revision ID of the label. Revision ID might be part of the
   * label `name` depending on the request issued. A new revision is created
   * whenever revisioned properties of a label are changed. Matches the regex:
   * `([a-zA-Z0-9])+`
   */
  readonly revisionId?: string;
  /**
   * Output only. The capabilities the user has on this label.
   */
  readonly schemaCapabilities?: GoogleAppsDriveLabelsV2LabelSchemaCapabilities;
}

function serializeGoogleAppsDriveLabelsV2Label(data: any): GoogleAppsDriveLabelsV2Label {
  return {
    ...data,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (serializeGoogleAppsDriveLabelsV2Field(item))) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2Label(data: any): GoogleAppsDriveLabelsV2Label {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    disableTime: data["disableTime"] !== undefined ? new Date(data["disableTime"]) : undefined,
    displayHints: data["displayHints"] !== undefined ? deserializeGoogleAppsDriveLabelsV2LabelDisplayHints(data["displayHints"]) : undefined,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (deserializeGoogleAppsDriveLabelsV2Field(item))) : undefined,
    publishTime: data["publishTime"] !== undefined ? new Date(data["publishTime"]) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
  };
}

/**
 * The capabilities a user has on this label's applied metadata.
 */
export interface GoogleAppsDriveLabelsV2LabelAppliedCapabilities {
  /**
   * Whether the user can apply this label to items.
   */
  canApply?: boolean;
  /**
   * Whether the user can read applied metadata related to this label.
   */
  canRead?: boolean;
  /**
   * Whether the user can remove this label from items.
   */
  canRemove?: boolean;
}

/**
 * Behavior of this label when it's applied to Drive items.
 */
export interface GoogleAppsDriveLabelsV2LabelAppliedLabelPolicy {
  /**
   * Indicates how the applied label and field values should be copied when a
   * Drive item is copied.
   */
  copyMode?:  | "COPY_MODE_UNSPECIFIED" | "DO_NOT_COPY" | "ALWAYS_COPY" | "COPY_APPLIABLE";
}

/**
 * UI display hints for rendering the label.
 */
export interface GoogleAppsDriveLabelsV2LabelDisplayHints {
  /**
   * Whether the label should be shown in the UI as disabled.
   */
  disabled?: boolean;
  /**
   * This label should be hidden in the search menu when searching for Drive
   * items.
   */
  hiddenInSearch?: boolean;
  /**
   * Order to display label in a list.
   */
  priority?: bigint;
  /**
   * This label should be shown in the apply menu when applying values to a
   * Drive item.
   */
  shownInApply?: boolean;
}

function serializeGoogleAppsDriveLabelsV2LabelDisplayHints(data: any): GoogleAppsDriveLabelsV2LabelDisplayHints {
  return {
    ...data,
    priority: data["priority"] !== undefined ? String(data["priority"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2LabelDisplayHints(data: any): GoogleAppsDriveLabelsV2LabelDisplayHints {
  return {
    ...data,
    priority: data["priority"] !== undefined ? BigInt(data["priority"]) : undefined,
  };
}

/**
 * Label constraints governing the structure of a Label; such as, the maximum
 * number of Fields allowed and maximum length of the label title.
 */
export interface GoogleAppsDriveLabelsV2LabelLimits {
  /**
   * The limits for Fields.
   */
  fieldLimits?: GoogleAppsDriveLabelsV2FieldLimits;
  /**
   * The maximum number of published Fields that can be deleted.
   */
  maxDeletedFields?: number;
  /**
   * The maximum number of characters allowed for the description.
   */
  maxDescriptionLength?: number;
  /**
   * The maximum number of draft revisions that will be kept before deleting
   * old drafts.
   */
  maxDraftRevisions?: number;
  /**
   * The maximum number of Fields allowed within the label.
   */
  maxFields?: number;
  /**
   * The maximum number of characters allowed for the title.
   */
  maxTitleLength?: number;
  /**
   * Resource name.
   */
  name?: string;
}

function serializeGoogleAppsDriveLabelsV2LabelLimits(data: any): GoogleAppsDriveLabelsV2LabelLimits {
  return {
    ...data,
    fieldLimits: data["fieldLimits"] !== undefined ? serializeGoogleAppsDriveLabelsV2FieldLimits(data["fieldLimits"]) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2LabelLimits(data: any): GoogleAppsDriveLabelsV2LabelLimits {
  return {
    ...data,
    fieldLimits: data["fieldLimits"] !== undefined ? deserializeGoogleAppsDriveLabelsV2FieldLimits(data["fieldLimits"]) : undefined,
  };
}

/**
 * A Lock that can be applied to a Label, Field, or Choice.
 */
export interface GoogleAppsDriveLabelsV2LabelLock {
  /**
   * Output only. The user's capabilities on this LabelLock.
   */
  readonly capabilities?: GoogleAppsDriveLabelsV2LabelLockCapabilities;
  /**
   * The ID of the Selection Field Choice that should be locked. If present,
   * `field_id` must also be present.
   */
  choiceId?: string;
  /**
   * Output only. The time this LabelLock was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user whose credentials were used to create the LabelLock.
   * This will not be present if no user was responsible for creating the
   * LabelLock.
   */
  readonly creator?: GoogleAppsDriveLabelsV2UserInfo;
  /**
   * Output only. A timestamp indicating when this LabelLock was scheduled for
   * deletion. This will be present only if this LabelLock is in the DELETING
   * state.
   */
  readonly deleteTime?: Date;
  /**
   * The ID of the Field that should be locked. Empty if the whole Label should
   * be locked.
   */
  fieldId?: string;
  /**
   * Output only. Resource name of this LabelLock.
   */
  readonly name?: string;
  /**
   * Output only. This LabelLock's state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETING";
}

/**
 * A description of a user's capabilities on a LabelLock.
 */
export interface GoogleAppsDriveLabelsV2LabelLockCapabilities {
  /**
   * True if the user is authorized to view the policy.
   */
  canViewPolicy?: boolean;
}

/**
 * The permission that applies to a principal (user, group, audience) on a
 * label.
 */
export interface GoogleAppsDriveLabelsV2LabelPermission {
  /**
   * Audience to grant a role to. The magic value of `audiences/default` may be
   * used to apply the role to the default audience in the context of the
   * organization that owns the Label.
   */
  audience?: string;
  /**
   * Specifies the email address for a user or group pricinpal. Not populated
   * for audience principals. User and Group permissions may only be inserted
   * using email address. On update requests, if email address is specified, no
   * principal should be specified.
   */
  email?: string;
  /**
   * Group resource name.
   */
  group?: string;
  /**
   * Resource name of this permission.
   */
  name?: string;
  /**
   * Person resource name.
   */
  person?: string;
  /**
   * The role the principal should have.
   */
  role?:  | "LABEL_ROLE_UNSPECIFIED" | "READER" | "APPLIER" | "ORGANIZER" | "EDITOR";
}

/**
 * Basic properties of the label.
 */
export interface GoogleAppsDriveLabelsV2LabelProperties {
  /**
   * The description of the label.
   */
  description?: string;
  /**
   * Required. Title of the label.
   */
  title?: string;
}

/**
 * The capabilities related to this label when editing the label.
 */
export interface GoogleAppsDriveLabelsV2LabelSchemaCapabilities {
  /**
   * Whether the user can delete this label. The user must have permission and
   * the label must be disabled.
   */
  canDelete?: boolean;
  /**
   * Whether the user can disable this label. The user must have permission and
   * this label must not already be disabled.
   */
  canDisable?: boolean;
  /**
   * Whether the user can enable this label. The user must have permission and
   * this label must be disabled.
   */
  canEnable?: boolean;
  /**
   * Whether the user can change this label.
   */
  canUpdate?: boolean;
}

/**
 * The lifecycle state of an object, such as label, field, or choice. The
 * lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting
 * state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` ->
 * (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` *
 * `DISABLED` -> (Deleted) The published and disabled states have some distinct
 * characteristics: * Published—Some kinds of changes might be made to an object
 * in this state, in which case `has_unpublished_changes` will be true. Also,
 * some kinds of changes are not permitted. Generally, any change that would
 * invalidate or cause new restrictions on existing metadata related to the
 * label are rejected. * Disabled—When disabled, the configured `DisabledPolicy`
 * takes effect.
 */
export interface GoogleAppsDriveLabelsV2Lifecycle {
  /**
   * The policy that governs how to show a disabled label, field, or selection
   * choice.
   */
  disabledPolicy?: GoogleAppsDriveLabelsV2LifecycleDisabledPolicy;
  /**
   * Output only. Whether the object associated with this lifecycle has
   * unpublished changes.
   */
  readonly hasUnpublishedChanges?: boolean;
  /**
   * Output only. The state of the object associated with this lifecycle.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "UNPUBLISHED_DRAFT" | "PUBLISHED" | "DISABLED" | "DELETED";
}

/**
 * The policy that governs how to treat a disabled label, field, or selection
 * choice in different contexts.
 */
export interface GoogleAppsDriveLabelsV2LifecycleDisabledPolicy {
  /**
   * Whether to hide this disabled object in the search menu for Drive items. *
   * When `false`, the object is generally shown in the UI as disabled but it
   * appears in the search results when searching for Drive items. * When
   * `true`, the object is generally hidden in the UI when searching for Drive
   * items.
   */
  hideInSearch?: boolean;
  /**
   * Whether to show this disabled object in the apply menu on Drive items. *
   * When `true`, the object is generally shown in the UI as disabled and is
   * unselectable. * When `false`, the object is generally hidden in the UI.
   */
  showInApply?: boolean;
}

/**
 * The response to a ListLabelLocksRequest.
 */
export interface GoogleAppsDriveLabelsV2ListLabelLocksResponse {
  /**
   * LabelLocks.
   */
  labelLocks?: GoogleAppsDriveLabelsV2LabelLock[];
  /**
   * The token of the next page in the response.
   */
  nextPageToken?: string;
}

/**
 * Response for listing the permissions on a Label.
 */
export interface GoogleAppsDriveLabelsV2ListLabelPermissionsResponse {
  /**
   * Label permissions.
   */
  labelPermissions?: GoogleAppsDriveLabelsV2LabelPermission[];
  /**
   * The token of the next page in the response.
   */
  nextPageToken?: string;
}

/**
 * Response for listing Labels.
 */
export interface GoogleAppsDriveLabelsV2ListLabelsResponse {
  /**
   * Labels.
   */
  labels?: GoogleAppsDriveLabelsV2Label[];
  /**
   * The token of the next page in the response.
   */
  nextPageToken?: string;
}

function serializeGoogleAppsDriveLabelsV2ListLabelsResponse(data: any): GoogleAppsDriveLabelsV2ListLabelsResponse {
  return {
    ...data,
    labels: data["labels"] !== undefined ? data["labels"].map((item: any) => (serializeGoogleAppsDriveLabelsV2Label(item))) : undefined,
  };
}

function deserializeGoogleAppsDriveLabelsV2ListLabelsResponse(data: any): GoogleAppsDriveLabelsV2ListLabelsResponse {
  return {
    ...data,
    labels: data["labels"] !== undefined ? data["labels"].map((item: any) => (deserializeGoogleAppsDriveLabelsV2Label(item))) : undefined,
  };
}

/**
 * Limits for list-variant of a Field type.
 */
export interface GoogleAppsDriveLabelsV2ListLimits {
  /**
   * Maximum number of values allowed for the Field type.
   */
  maxEntries?: number;
}

/**
 * Contains information about whether a label component should be considered
 * locked.
 */
export interface GoogleAppsDriveLabelsV2LockStatus {
  /**
   * Output only. Indicates whether this label component is the (direct) target
   * of a LabelLock. A label component can be implicitly locked even if it's not
   * the direct target of a LabelLock, in which case this field is set to false.
   */
  readonly locked?: boolean;
}

/**
 * Limits for long text Field type.
 */
export interface GoogleAppsDriveLabelsV2LongTextLimits {
  /**
   * Maximum length allowed for a long text Field type.
   */
  maxLength?: number;
  /**
   * Minimum length allowed for a long text Field type.
   */
  minLength?: number;
}

/**
 * Request to publish a label.
 */
export interface GoogleAppsDriveLabelsV2PublishLabelRequest {
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language will be used.
   */
  languageCode?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * Provides control over how write requests are executed. Defaults to unset,
   * which means last write wins.
   */
  writeControl?: GoogleAppsDriveLabelsV2WriteControl;
}

/**
 * Limits for selection Field type.
 */
export interface GoogleAppsDriveLabelsV2SelectionLimits {
  /**
   * Limits for list-variant of a Field type.
   */
  listLimits?: GoogleAppsDriveLabelsV2ListLimits;
  /**
   * The max number of choices.
   */
  maxChoices?: number;
  /**
   * Maximum number of deleted choices.
   */
  maxDeletedChoices?: number;
  /**
   * Maximum length for display name.
   */
  maxDisplayNameLength?: number;
  /**
   * Maximum ID length for a selection options.
   */
  maxIdLength?: number;
}

/**
 * Limits for text Field type.
 */
export interface GoogleAppsDriveLabelsV2TextLimits {
  /**
   * Maximum length allowed for a text Field type.
   */
  maxLength?: number;
  /**
   * Minimum length allowed for a text Field type.
   */
  minLength?: number;
}

/**
 * Request to update the `CopyMode` of the given Label. Changes to this policy
 * are not revisioned, do not require publishing, and take effect immediately. \
 */
export interface GoogleAppsDriveLabelsV2UpdateLabelCopyModeRequest {
  /**
   * Required. Indicates how the applied Label, and Field values should be
   * copied when a Drive item is copied.
   */
  copyMode?:  | "COPY_MODE_UNSPECIFIED" | "DO_NOT_COPY" | "ALWAYS_COPY" | "COPY_APPLIABLE";
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language will be used.
   */
  languageCode?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * When specified, only certain fields belonging to the indicated view will
   * be returned.
   */
  view?:  | "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL";
}

/**
 * Updates a Label Permission. Permissions affect the Label resource as a
 * whole, are not revisioned, and do not require publishing.
 */
export interface GoogleAppsDriveLabelsV2UpdateLabelPermissionRequest {
  /**
   * Required. The permission to create or update on the Label.
   */
  labelPermission?: GoogleAppsDriveLabelsV2LabelPermission;
  /**
   * Required. The parent Label resource name.
   */
  parent?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * The capabilities of a user.
 */
export interface GoogleAppsDriveLabelsV2UserCapabilities {
  /**
   * Output only. Whether the user is allowed access to the label manager.
   */
  readonly canAccessLabelManager?: boolean;
  /**
   * Output only. Whether the user is an administrator for the shared labels
   * feature.
   */
  readonly canAdministrateLabels?: boolean;
  /**
   * Output only. Whether the user is allowed to create new admin labels.
   */
  readonly canCreateAdminLabels?: boolean;
  /**
   * Output only. Whether the user is allowed to create new shared labels.
   */
  readonly canCreateSharedLabels?: boolean;
  /**
   * Output only. Resource name for the user capabilities.
   */
  readonly name?: string;
}

/**
 * Information about a user.
 */
export interface GoogleAppsDriveLabelsV2UserInfo {
  /**
   * The identifier for this user that can be used with the People API to get
   * more information. For example, people/12345678.
   */
  person?: string;
}

/**
 * Limits for Field.Type.USER.
 */
export interface GoogleAppsDriveLabelsV2UserLimits {
  /**
   * Limits for list-variant of a Field type.
   */
  listLimits?: GoogleAppsDriveLabelsV2ListLimits;
}

/**
 * Provides control over how write requests are executed. When not specified,
 * the last write wins.
 */
export interface GoogleAppsDriveLabelsV2WriteControl {
  /**
   * The revision_id of the label that the write request will be applied to. If
   * this is not the latest revision of the label, the request will not be
   * processed and will return a 400 Bad Request error.
   */
  requiredRevisionId?: string;
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript. This reference page doesn't carry
 * information about the absolute color space that should be used to interpret
 * the RGB value (e.g. sRGB, Adobe RGB, DCI-P3, BT.2020, etc.). By default,
 * applications should assume the sRGB color space. When color equality needs to
 * be decided, implementations, unless documented otherwise, treat two colors as
 * equal if all their red, green, blue, and alpha values each differ by at most
 * 1e-5. Example (Java): import com.google.type.Color; // ... public static
 * java.awt.Color fromProto(Color protocolor) { float alpha =
 * protocolor.hasAlpha() ? protocolor.getAlpha().getValue() : 1.0; return new
 * java.awt.Color( protocolor.getRed(), protocolor.getGreen(),
 * protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color
 * color) { float red = (float) color.getRed(); float green = (float)
 * color.getGreen(); float blue = (float) color.getBlue(); float denominator =
 * 255.0; Color.Builder resultBuilder = Color .newBuilder() .setRed(red /
 * denominator) .setGreen(green / denominator) .setBlue(blue / denominator); int
 * alpha = color.getAlpha(); if (alpha != 255) { result.setAlpha( FloatValue
 * .newBuilder() .setValue(((float) alpha) / denominator) .build()); } return
 * resultBuilder.build(); } // ... Example (iOS / Obj-C): // ... static UIColor*
 * fromProto(Color* protocolor) { float red = [protocolor red]; float green =
 * [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper
 * = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper != nil) { alpha =
 * [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green
 * blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat
 * red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue
 * alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result
 * setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <=
 * 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result
 * autorelease]; return result; } // ... Example (JavaScript): // ... var
 * protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0;
 * var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0;
 * var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255);
 * var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return
 * rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value ||
 * 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(',
 * rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor =
 * function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green
 * << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 -
 * hexString.length; var resultBuilder = ['#']; for (var i = 0; i <
 * missingZeros; i++) { resultBuilder.push('0'); }
 * resultBuilder.push(hexString); return resultBuilder.join(''); }; // ...
 */
export interface GoogleTypeColor {
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation: `pixel color = alpha *
   * (this color) + (1.0 - alpha) * (background color)` This means that a value
   * of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to
   * a completely transparent color. This uses a wrapper message rather than a
   * simple float scalar so that it is possible to distinguish between a default
   * value and the value being unset. If omitted, this color object is rendered
   * as a solid color (as if the alpha value had been explicitly given a value
   * of 1.0).
   */
  alpha?: number;
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number;
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
 * Additional options for DriveLabels#labelsCreate.
 */
export interface LabelsCreateOptions {
  /**
   * The BCP-47 language code to use for evaluating localized Field labels in
   * response. When not specified, values in the default configured language
   * will be used.
   */
  languageCode?: string;
  /**
   * Set to `true` in order to use the user's admin privileges. The server will
   * verify the user is an admin before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsDelete.
 */
export interface LabelsDeleteOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * The revision_id of the label that the write request will be applied to. If
   * this is not the latest revision of the label, the request will not be
   * processed and will return a 400 Bad Request error.
   */
  ["writeControl.requiredRevisionId"]?: string;
}

/**
 * Additional options for DriveLabels#labelsGet.
 */
export interface LabelsGetOptions {
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language are used.
   */
  languageCode?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * verifies that the user is an admin for the label before allowing access.
   */
  useAdminAccess?: boolean;
  /**
   * When specified, only certain fields belonging to the indicated view are
   * returned.
   */
  view?:  | "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL";
}

/**
 * Additional options for DriveLabels#labelsList.
 */
export interface LabelsListOptions {
  /**
   * The BCP-47 language code to use for evaluating localized field labels.
   * When not specified, values in the default configured language are used.
   */
  languageCode?: string;
  /**
   * Specifies the level of access the user must have on the returned Labels.
   * The minimum role a user must have on a label. Defaults to `READER`.
   */
  minimumRole?:  | "LABEL_ROLE_UNSPECIFIED" | "READER" | "APPLIER" | "ORGANIZER" | "EDITOR";
  /**
   * Maximum number of labels to return per page. Default: 50. Max: 200.
   */
  pageSize?: number;
  /**
   * The token of the page to return.
   */
  pageToken?: string;
  /**
   * Whether to include only published labels in the results. * When `true`,
   * only the current published label revisions are returned. Disabled labels
   * are included. Returned label resource names reference the published
   * revision (`labels/{id}/{revision_id}`). * When `false`, the current label
   * revisions are returned, which might not be published. Returned label
   * resource names don't reference a specific revision (`labels/{id}`).
   */
  publishedOnly?: boolean;
  /**
   * Set to `true` in order to use the user's admin credentials. This will
   * return all Labels within the customer.
   */
  useAdminAccess?: boolean;
  /**
   * When specified, only certain fields belonging to the indicated view are
   * returned.
   */
  view?:  | "LABEL_VIEW_BASIC" | "LABEL_VIEW_FULL";
}

/**
 * Additional options for DriveLabels#labelsLocksList.
 */
export interface LabelsLocksListOptions {
  /**
   * Maximum number of Locks to return per page. Default: 100. Max: 200.
   */
  pageSize?: number;
  /**
   * The token of the page to return.
   */
  pageToken?: string;
}

/**
 * Additional options for DriveLabels#labelsPermissionsCreate.
 */
export interface LabelsPermissionsCreateOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsPermissionsDelete.
 */
export interface LabelsPermissionsDeleteOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsPermissionsList.
 */
export interface LabelsPermissionsListOptions {
  /**
   * Maximum number of permissions to return per page. Default: 50. Max: 200.
   */
  pageSize?: number;
  /**
   * The token of the page to return.
   */
  pageToken?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsRevisionsLocksList.
 */
export interface LabelsRevisionsLocksListOptions {
  /**
   * Maximum number of Locks to return per page. Default: 100. Max: 200.
   */
  pageSize?: number;
  /**
   * The token of the page to return.
   */
  pageToken?: string;
}

/**
 * Additional options for DriveLabels#labelsRevisionsPermissionsCreate.
 */
export interface LabelsRevisionsPermissionsCreateOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsRevisionsPermissionsDelete.
 */
export interface LabelsRevisionsPermissionsDeleteOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsRevisionsPermissionsList.
 */
export interface LabelsRevisionsPermissionsListOptions {
  /**
   * Maximum number of permissions to return per page. Default: 50. Max: 200.
   */
  pageSize?: number;
  /**
   * The token of the page to return.
   */
  pageToken?: string;
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsRevisionsUpdatePermissions.
 */
export interface LabelsRevisionsUpdatePermissionsOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#labelsUpdatePermissions.
 */
export interface LabelsUpdatePermissionsOptions {
  /**
   * Set to `true` in order to use the user's admin credentials. The server
   * will verify the user is an admin for the Label before allowing access.
   */
  useAdminAccess?: boolean;
}

/**
 * Additional options for DriveLabels#limitsGetLabel.
 */
export interface LimitsGetLabelOptions {
  /**
   * Required. Label revision resource name Must be: "limits/label"
   */
  name?: string;
}