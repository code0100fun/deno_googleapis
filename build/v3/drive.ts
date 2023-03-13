// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Drive API Client for Deno
 * =========================
 * 
 * Manages files in Drive including uploading, downloading, searching, detecting changes, and updating sharing permissions.
 * 
 * Docs: https://developers.google.com/drive/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages files in Drive including uploading, downloading, searching,
 * detecting changes, and updating sharing permissions.
 */
export class Drive {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/drive/v3/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets information about the user, the user's Drive, and system
   * capabilities.
   *
   */
  async aboutGet(): Promise<About> {
    const url = new URL(`${this.#baseUrl}about`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAbout(data);
  }

  /**
   * Gets the starting pageToken for listing future changes.
   *
   */
  async changesGetStartPageToken(opts: ChangesGetStartPageTokenOptions = {}): Promise<StartPageToken> {
    const url = new URL(`${this.#baseUrl}changes/startPageToken`);
    if (opts.driveId !== undefined) {
      url.searchParams.append("driveId", String(opts.driveId));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.teamDriveId !== undefined) {
      url.searchParams.append("teamDriveId", String(opts.teamDriveId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StartPageToken;
  }

  /**
   * Lists the changes for a user or shared drive.
   *
   */
  async changesList(opts: ChangesListOptions = {}): Promise<ChangeList> {
    const url = new URL(`${this.#baseUrl}changes`);
    if (opts.driveId !== undefined) {
      url.searchParams.append("driveId", String(opts.driveId));
    }
    if (opts.includeCorpusRemovals !== undefined) {
      url.searchParams.append("includeCorpusRemovals", String(opts.includeCorpusRemovals));
    }
    if (opts.includeItemsFromAllDrives !== undefined) {
      url.searchParams.append("includeItemsFromAllDrives", String(opts.includeItemsFromAllDrives));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.includeRemoved !== undefined) {
      url.searchParams.append("includeRemoved", String(opts.includeRemoved));
    }
    if (opts.includeTeamDriveItems !== undefined) {
      url.searchParams.append("includeTeamDriveItems", String(opts.includeTeamDriveItems));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.restrictToMyDrive !== undefined) {
      url.searchParams.append("restrictToMyDrive", String(opts.restrictToMyDrive));
    }
    if (opts.spaces !== undefined) {
      url.searchParams.append("spaces", String(opts.spaces));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.teamDriveId !== undefined) {
      url.searchParams.append("teamDriveId", String(opts.teamDriveId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChangeList(data);
  }

  /**
   * Subscribes to changes for a user. To use this method, you must include the
   * pageToken query parameter.
   *
   */
  async changesWatch(req: Channel, opts: ChangesWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}changes/watch`);
    if (opts.driveId !== undefined) {
      url.searchParams.append("driveId", String(opts.driveId));
    }
    if (opts.includeCorpusRemovals !== undefined) {
      url.searchParams.append("includeCorpusRemovals", String(opts.includeCorpusRemovals));
    }
    if (opts.includeItemsFromAllDrives !== undefined) {
      url.searchParams.append("includeItemsFromAllDrives", String(opts.includeItemsFromAllDrives));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.includeRemoved !== undefined) {
      url.searchParams.append("includeRemoved", String(opts.includeRemoved));
    }
    if (opts.includeTeamDriveItems !== undefined) {
      url.searchParams.append("includeTeamDriveItems", String(opts.includeTeamDriveItems));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.restrictToMyDrive !== undefined) {
      url.searchParams.append("restrictToMyDrive", String(opts.restrictToMyDrive));
    }
    if (opts.spaces !== undefined) {
      url.searchParams.append("spaces", String(opts.spaces));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.teamDriveId !== undefined) {
      url.searchParams.append("teamDriveId", String(opts.teamDriveId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Stop watching resources through this channel
   *
   */
  async channelsStop(req: Channel): Promise<void> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}channels/stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Creates a comment on a file.
   *
   * @param fileId The ID of the file.
   */
  async commentsCreate(fileId: string, req: Comment): Promise<Comment> {
    req = serializeComment(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeComment(data);
  }

  /**
   * Deletes a comment.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   */
  async commentsDelete(commentId: string, fileId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a comment by ID.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   */
  async commentsGet(commentId: string, fileId: string, opts: CommentsGetOptions = {}): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }`);
    if (opts.includeDeleted !== undefined) {
      url.searchParams.append("includeDeleted", String(opts.includeDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeComment(data);
  }

  /**
   * Lists a file's comments.
   *
   * @param fileId The ID of the file.
   */
  async commentsList(fileId: string, opts: CommentsListOptions = {}): Promise<CommentList> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments`);
    if (opts.includeDeleted !== undefined) {
      url.searchParams.append("includeDeleted", String(opts.includeDeleted));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startModifiedTime !== undefined) {
      url.searchParams.append("startModifiedTime", String(opts.startModifiedTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCommentList(data);
  }

  /**
   * Updates a comment with patch semantics.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   */
  async commentsUpdate(commentId: string, fileId: string, req: Comment): Promise<Comment> {
    req = serializeComment(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeComment(data);
  }

  /**
   * Creates a shared drive.
   *
   */
  async drivesCreate(req: Drive, opts: DrivesCreateOptions = {}): Promise<Drive> {
    req = serializeDrive(req);
    const url = new URL(`${this.#baseUrl}drives`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDrive(data);
  }

  /**
   * Permanently deletes a shared drive for which the user is an organizer. The
   * shared drive cannot contain any untrashed items.
   *
   * @param driveId The ID of the shared drive.
   */
  async drivesDelete(driveId: string, opts: DrivesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}drives/${ driveId }`);
    if (opts.allowItemDeletion !== undefined) {
      url.searchParams.append("allowItemDeletion", String(opts.allowItemDeletion));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a shared drive's metadata by ID.
   *
   * @param driveId The ID of the shared drive.
   */
  async drivesGet(driveId: string, opts: DrivesGetOptions = {}): Promise<Drive> {
    const url = new URL(`${this.#baseUrl}drives/${ driveId }`);
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDrive(data);
  }

  /**
   * Hides a shared drive from the default view.
   *
   * @param driveId The ID of the shared drive.
   */
  async drivesHide(driveId: string): Promise<Drive> {
    const url = new URL(`${this.#baseUrl}drives/${ driveId }/hide`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeDrive(data);
  }

  /**
   * Lists the user's shared drives.
   *
   */
  async drivesList(opts: DrivesListOptions = {}): Promise<DriveList> {
    const url = new URL(`${this.#baseUrl}drives`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDriveList(data);
  }

  /**
   * Restores a shared drive to the default view.
   *
   * @param driveId The ID of the shared drive.
   */
  async drivesUnhide(driveId: string): Promise<Drive> {
    const url = new URL(`${this.#baseUrl}drives/${ driveId }/unhide`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeDrive(data);
  }

  /**
   * Updates the metadata for a shared drive.
   *
   * @param driveId The ID of the shared drive.
   */
  async drivesUpdate(driveId: string, req: Drive, opts: DrivesUpdateOptions = {}): Promise<Drive> {
    req = serializeDrive(req);
    const url = new URL(`${this.#baseUrl}drives/${ driveId }`);
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeDrive(data);
  }

  /**
   * Creates a copy of a file and applies any requested updates with patch
   * semantics. Folders cannot be copied.
   *
   * @param fileId The ID of the file.
   */
  async filesCopy(fileId: string, req: File, opts: FilesCopyOptions = {}): Promise<File> {
    req = serializeFile(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/copy`);
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    if (opts.ignoreDefaultVisibility !== undefined) {
      url.searchParams.append("ignoreDefaultVisibility", String(opts.ignoreDefaultVisibility));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.keepRevisionForever !== undefined) {
      url.searchParams.append("keepRevisionForever", String(opts.keepRevisionForever));
    }
    if (opts.ocrLanguage !== undefined) {
      url.searchParams.append("ocrLanguage", String(opts.ocrLanguage));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFile(data);
  }

  /**
   * Creates a file.
   *
   */
  async filesCreate(req: File, opts: FilesCreateOptions = {}): Promise<File> {
    req = serializeFile(req);
    const url = new URL(`${this.#baseUrl}files`);
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    if (opts.ignoreDefaultVisibility !== undefined) {
      url.searchParams.append("ignoreDefaultVisibility", String(opts.ignoreDefaultVisibility));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.keepRevisionForever !== undefined) {
      url.searchParams.append("keepRevisionForever", String(opts.keepRevisionForever));
    }
    if (opts.ocrLanguage !== undefined) {
      url.searchParams.append("ocrLanguage", String(opts.ocrLanguage));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.useContentAsIndexableText !== undefined) {
      url.searchParams.append("useContentAsIndexableText", String(opts.useContentAsIndexableText));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFile(data);
  }

  /**
   * Permanently deletes a file owned by the user without moving it to the
   * trash. If the file belongs to a shared drive the user must be an organizer
   * on the parent. If the target is a folder, all descendants owned by the user
   * are also deleted.
   *
   * @param fileId The ID of the file.
   */
  async filesDelete(fileId: string, opts: FilesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }`);
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Permanently deletes all of the user's trashed files.
   *
   */
  async filesEmptyTrash(opts: FilesEmptyTrashOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/trash`);
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Exports a Google Workspace document to the requested MIME type and returns
   * exported byte content. Note that the exported content is limited to 10MB.
   *
   * @param fileId The ID of the file.
   */
  async filesExport(fileId: string, opts: FilesExportOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/export`);
    if (opts.mimeType !== undefined) {
      url.searchParams.append("mimeType", String(opts.mimeType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
  }

  /**
   * Generates a set of file IDs which can be provided in create or copy
   * requests.
   *
   */
  async filesGenerateIds(opts: FilesGenerateIdsOptions = {}): Promise<GeneratedIds> {
    const url = new URL(`${this.#baseUrl}files/generateIds`);
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.space !== undefined) {
      url.searchParams.append("space", String(opts.space));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GeneratedIds;
  }

  /**
   * Gets a file's metadata or content by ID.
   *
   * @param fileId The ID of the file.
   */
  async filesGet(fileId: string, opts: FilesGetOptions = {}): Promise<File> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }`);
    if (opts.acknowledgeAbuse !== undefined) {
      url.searchParams.append("acknowledgeAbuse", String(opts.acknowledgeAbuse));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFile(data);
  }

  /**
   * Lists or searches files.
   *
   */
  async filesList(opts: FilesListOptions = {}): Promise<FileList> {
    const url = new URL(`${this.#baseUrl}files`);
    if (opts.corpora !== undefined) {
      url.searchParams.append("corpora", String(opts.corpora));
    }
    if (opts.corpus !== undefined) {
      url.searchParams.append("corpus", String(opts.corpus));
    }
    if (opts.driveId !== undefined) {
      url.searchParams.append("driveId", String(opts.driveId));
    }
    if (opts.includeItemsFromAllDrives !== undefined) {
      url.searchParams.append("includeItemsFromAllDrives", String(opts.includeItemsFromAllDrives));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.includeTeamDriveItems !== undefined) {
      url.searchParams.append("includeTeamDriveItems", String(opts.includeTeamDriveItems));
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
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.spaces !== undefined) {
      url.searchParams.append("spaces", String(opts.spaces));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.teamDriveId !== undefined) {
      url.searchParams.append("teamDriveId", String(opts.teamDriveId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFileList(data);
  }

  /**
   * Lists the labels on a file.
   *
   * @param fileId The ID of the file.
   */
  async filesListLabels(fileId: string, opts: FilesListLabelsOptions = {}): Promise<LabelList> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/listLabels`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLabelList(data);
  }

  /**
   * Modifies the set of labels on a file.
   *
   * @param fileId The ID of the file for which the labels are modified.
   */
  async filesModifyLabels(fileId: string, req: ModifyLabelsRequest): Promise<ModifyLabelsResponse> {
    req = serializeModifyLabelsRequest(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/modifyLabels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeModifyLabelsResponse(data);
  }

  /**
   * Updates a file's metadata and/or content. When calling this method, only
   * populate fields in the request that you want to modify. When updating
   * fields, some fields might change automatically, such as modifiedDate. This
   * method supports patch semantics.
   *
   * @param fileId The ID of the file.
   */
  async filesUpdate(fileId: string, req: File, opts: FilesUpdateOptions = {}): Promise<File> {
    req = serializeFile(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }`);
    if (opts.addParents !== undefined) {
      url.searchParams.append("addParents", String(opts.addParents));
    }
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.keepRevisionForever !== undefined) {
      url.searchParams.append("keepRevisionForever", String(opts.keepRevisionForever));
    }
    if (opts.ocrLanguage !== undefined) {
      url.searchParams.append("ocrLanguage", String(opts.ocrLanguage));
    }
    if (opts.removeParents !== undefined) {
      url.searchParams.append("removeParents", String(opts.removeParents));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.useContentAsIndexableText !== undefined) {
      url.searchParams.append("useContentAsIndexableText", String(opts.useContentAsIndexableText));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeFile(data);
  }

  /**
   * Subscribes to changes to a file. While you can establish a channel for
   * changes to a file on a shared drive, a change to a shared drive file won't
   * create a notification.
   *
   * @param fileId The ID of the file.
   */
  async filesWatch(fileId: string, req: Channel, opts: FilesWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/watch`);
    if (opts.acknowledgeAbuse !== undefined) {
      url.searchParams.append("acknowledgeAbuse", String(opts.acknowledgeAbuse));
    }
    if (opts.includeLabels !== undefined) {
      url.searchParams.append("includeLabels", String(opts.includeLabels));
    }
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Creates a permission for a file or shared drive. For more information on
   * creating permissions, see Share files, folders & drives.
   *
   * @param fileId The ID of the file or shared drive.
   */
  async permissionsCreate(fileId: string, req: Permission, opts: PermissionsCreateOptions = {}): Promise<Permission> {
    req = serializePermission(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/permissions`);
    if (opts.emailMessage !== undefined) {
      url.searchParams.append("emailMessage", String(opts.emailMessage));
    }
    if (opts.enforceSingleParent !== undefined) {
      url.searchParams.append("enforceSingleParent", String(opts.enforceSingleParent));
    }
    if (opts.moveToNewOwnersRoot !== undefined) {
      url.searchParams.append("moveToNewOwnersRoot", String(opts.moveToNewOwnersRoot));
    }
    if (opts.sendNotificationEmail !== undefined) {
      url.searchParams.append("sendNotificationEmail", String(opts.sendNotificationEmail));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.transferOwnership !== undefined) {
      url.searchParams.append("transferOwnership", String(opts.transferOwnership));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePermission(data);
  }

  /**
   * Deletes a permission.
   *
   * @param fileId The ID of the file or shared drive.
   * @param permissionId The ID of the permission.
   */
  async permissionsDelete(fileId: string, permissionId: string, opts: PermissionsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/permissions/${ permissionId }`);
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a permission by ID.
   *
   * @param fileId The ID of the file.
   * @param permissionId The ID of the permission.
   */
  async permissionsGet(fileId: string, permissionId: string, opts: PermissionsGetOptions = {}): Promise<Permission> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/permissions/${ permissionId }`);
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePermission(data);
  }

  /**
   * Lists a file's or shared drive's permissions.
   *
   * @param fileId The ID of the file or shared drive.
   */
  async permissionsList(fileId: string, opts: PermissionsListOptions = {}): Promise<PermissionList> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/permissions`);
    if (opts.includePermissionsForView !== undefined) {
      url.searchParams.append("includePermissionsForView", String(opts.includePermissionsForView));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePermissionList(data);
  }

  /**
   * Updates a permission with patch semantics.
   *
   * @param fileId The ID of the file or shared drive.
   * @param permissionId The ID of the permission.
   */
  async permissionsUpdate(fileId: string, permissionId: string, req: Permission, opts: PermissionsUpdateOptions = {}): Promise<Permission> {
    req = serializePermission(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/permissions/${ permissionId }`);
    if (opts.removeExpiration !== undefined) {
      url.searchParams.append("removeExpiration", String(opts.removeExpiration));
    }
    if (opts.supportsAllDrives !== undefined) {
      url.searchParams.append("supportsAllDrives", String(opts.supportsAllDrives));
    }
    if (opts.supportsTeamDrives !== undefined) {
      url.searchParams.append("supportsTeamDrives", String(opts.supportsTeamDrives));
    }
    if (opts.transferOwnership !== undefined) {
      url.searchParams.append("transferOwnership", String(opts.transferOwnership));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePermission(data);
  }

  /**
   * Creates a reply to a comment.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   */
  async repliesCreate(commentId: string, fileId: string, req: Reply): Promise<Reply> {
    req = serializeReply(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }/replies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReply(data);
  }

  /**
   * Deletes a reply.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   * @param replyId The ID of the reply.
   */
  async repliesDelete(commentId: string, fileId: string, replyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }/replies/${ replyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a reply by ID.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   * @param replyId The ID of the reply.
   */
  async repliesGet(commentId: string, fileId: string, replyId: string, opts: RepliesGetOptions = {}): Promise<Reply> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }/replies/${ replyId }`);
    if (opts.includeDeleted !== undefined) {
      url.searchParams.append("includeDeleted", String(opts.includeDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReply(data);
  }

  /**
   * Lists a comment's replies.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   */
  async repliesList(commentId: string, fileId: string, opts: RepliesListOptions = {}): Promise<ReplyList> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }/replies`);
    if (opts.includeDeleted !== undefined) {
      url.searchParams.append("includeDeleted", String(opts.includeDeleted));
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
    return deserializeReplyList(data);
  }

  /**
   * Updates a reply with patch semantics.
   *
   * @param commentId The ID of the comment.
   * @param fileId The ID of the file.
   * @param replyId The ID of the reply.
   */
  async repliesUpdate(commentId: string, fileId: string, replyId: string, req: Reply): Promise<Reply> {
    req = serializeReply(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/comments/${ commentId }/replies/${ replyId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeReply(data);
  }

  /**
   * Permanently deletes a file version. You can only delete revisions for
   * files with binary content in Google Drive, like images or videos. Revisions
   * for other files, like Google Docs or Sheets, and the last remaining file
   * version can't be deleted.
   *
   * @param fileId The ID of the file.
   * @param revisionId The ID of the revision.
   */
  async revisionsDelete(fileId: string, revisionId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/revisions/${ revisionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a revision's metadata or content by ID.
   *
   * @param fileId The ID of the file.
   * @param revisionId The ID of the revision.
   */
  async revisionsGet(fileId: string, revisionId: string, opts: RevisionsGetOptions = {}): Promise<Revision> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/revisions/${ revisionId }`);
    if (opts.acknowledgeAbuse !== undefined) {
      url.searchParams.append("acknowledgeAbuse", String(opts.acknowledgeAbuse));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRevision(data);
  }

  /**
   * Lists a file's revisions.
   *
   * @param fileId The ID of the file.
   */
  async revisionsList(fileId: string, opts: RevisionsListOptions = {}): Promise<RevisionList> {
    const url = new URL(`${this.#baseUrl}files/${ fileId }/revisions`);
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
    return deserializeRevisionList(data);
  }

  /**
   * Updates a revision with patch semantics.
   *
   * @param fileId The ID of the file.
   * @param revisionId The ID of the revision.
   */
  async revisionsUpdate(fileId: string, revisionId: string, req: Revision): Promise<Revision> {
    req = serializeRevision(req);
    const url = new URL(`${this.#baseUrl}files/${ fileId }/revisions/${ revisionId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRevision(data);
  }

  /**
   * Deprecated use drives.create instead.
   *
   */
  async teamdrivesCreate(req: TeamDrive, opts: TeamdrivesCreateOptions = {}): Promise<TeamDrive> {
    req = serializeTeamDrive(req);
    const url = new URL(`${this.#baseUrl}teamdrives`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTeamDrive(data);
  }

  /**
   * Deprecated use drives.delete instead.
   *
   * @param teamDriveId The ID of the Team Drive
   */
  async teamdrivesDelete(teamDriveId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}teamdrives/${ teamDriveId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Deprecated use drives.get instead.
   *
   * @param teamDriveId The ID of the Team Drive
   */
  async teamdrivesGet(teamDriveId: string, opts: TeamdrivesGetOptions = {}): Promise<TeamDrive> {
    const url = new URL(`${this.#baseUrl}teamdrives/${ teamDriveId }`);
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTeamDrive(data);
  }

  /**
   * Deprecated use drives.list instead.
   *
   */
  async teamdrivesList(opts: TeamdrivesListOptions = {}): Promise<TeamDriveList> {
    const url = new URL(`${this.#baseUrl}teamdrives`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTeamDriveList(data);
  }

  /**
   * Deprecated use drives.update instead
   *
   * @param teamDriveId The ID of the Team Drive
   */
  async teamdrivesUpdate(teamDriveId: string, req: TeamDrive, opts: TeamdrivesUpdateOptions = {}): Promise<TeamDrive> {
    req = serializeTeamDrive(req);
    const url = new URL(`${this.#baseUrl}teamdrives/${ teamDriveId }`);
    if (opts.useDomainAdminAccess !== undefined) {
      url.searchParams.append("useDomainAdminAccess", String(opts.useDomainAdminAccess));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTeamDrive(data);
  }
}

/**
 * Information about the user, the user's Drive, and system capabilities.
 */
export interface About {
  /**
   * Whether the user has installed the requesting app.
   */
  appInstalled?: boolean;
  /**
   * Whether the user can create shared drives.
   */
  canCreateDrives?: boolean;
  /**
   * Deprecated - use canCreateDrives instead.
   */
  canCreateTeamDrives?: boolean;
  /**
   * A list of themes that are supported for shared drives.
   */
  driveThemes?: {
    backgroundImageLink?: string;
    colorRgb?: string;
    id?: string;
  }[];
  /**
   * A map of source MIME type to possible targets for all supported exports.
   */
  exportFormats?: {
    [key: string]: string[]
  };
  /**
   * The currently supported folder colors as RGB hex strings.
   */
  folderColorPalette?: string[];
  /**
   * A map of source MIME type to possible targets for all supported imports.
   */
  importFormats?: {
    [key: string]: string[]
  };
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#about".
   */
  kind?: string;
  /**
   * A map of maximum import sizes by MIME type, in bytes.
   */
  maxImportSizes?: {
    [key: string]: bigint
  };
  /**
   * The maximum upload size in bytes.
   */
  maxUploadSize?: bigint;
  /**
   * The user's storage quota limits and usage. All fields are measured in
   * bytes.
   */
  storageQuota?: {
    limit?: bigint;
    usage?: bigint;
    usageInDrive?: bigint;
    usageInDriveTrash?: bigint;
  };
  /**
   * Deprecated - use driveThemes instead.
   */
  teamDriveThemes?: {
    backgroundImageLink?: string;
    colorRgb?: string;
    id?: string;
  }[];
  /**
   * The authenticated user.
   */
  user?: User;
}

function serializeAbout(data: any): About {
  return {
    ...data,
    maxImportSizes: data["maxImportSizes"] !== undefined ? Object.fromEntries(Object.entries(data["maxImportSizes"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    maxUploadSize: data["maxUploadSize"] !== undefined ? String(data["maxUploadSize"]) : undefined,
    storageQuota: data["storageQuota"] !== undefined ? {
      ...data["storageQuota"],
      limit: data["storageQuota"]["limit"] !== undefined ? String(data["storageQuota"]["limit"]) : undefined,
      usage: data["storageQuota"]["usage"] !== undefined ? String(data["storageQuota"]["usage"]) : undefined,
      usageInDrive: data["storageQuota"]["usageInDrive"] !== undefined ? String(data["storageQuota"]["usageInDrive"]) : undefined,
      usageInDriveTrash: data["storageQuota"]["usageInDriveTrash"] !== undefined ? String(data["storageQuota"]["usageInDriveTrash"]) : undefined,
    } : undefined,
  };
}

function deserializeAbout(data: any): About {
  return {
    ...data,
    maxImportSizes: data["maxImportSizes"] !== undefined ? Object.fromEntries(Object.entries(data["maxImportSizes"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    maxUploadSize: data["maxUploadSize"] !== undefined ? BigInt(data["maxUploadSize"]) : undefined,
    storageQuota: data["storageQuota"] !== undefined ? {
      ...data["storageQuota"],
      limit: data["storageQuota"]["limit"] !== undefined ? BigInt(data["storageQuota"]["limit"]) : undefined,
      usage: data["storageQuota"]["usage"] !== undefined ? BigInt(data["storageQuota"]["usage"]) : undefined,
      usageInDrive: data["storageQuota"]["usageInDrive"] !== undefined ? BigInt(data["storageQuota"]["usageInDrive"]) : undefined,
      usageInDriveTrash: data["storageQuota"]["usageInDriveTrash"] !== undefined ? BigInt(data["storageQuota"]["usageInDriveTrash"]) : undefined,
    } : undefined,
  };
}

/**
 * A change to a file or shared drive.
 */
export interface Change {
  /**
   * The type of the change. Possible values are file and drive.
   */
  changeType?: string;
  /**
   * The updated state of the shared drive. Present if the changeType is drive,
   * the user is still a member of the shared drive, and the shared drive has
   * not been deleted.
   */
  drive?: Drive;
  /**
   * The ID of the shared drive associated with this change.
   */
  driveId?: string;
  /**
   * The updated state of the file. Present if the type is file and the file
   * has not been removed from this list of changes.
   */
  file?: File;
  /**
   * The ID of the file which has changed.
   */
  fileId?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#change".
   */
  kind?: string;
  /**
   * Whether the file or shared drive has been removed from this list of
   * changes, for example by deletion or loss of access.
   */
  removed?: boolean;
  /**
   * Deprecated - use drive instead.
   */
  teamDrive?: TeamDrive;
  /**
   * Deprecated - use driveId instead.
   */
  teamDriveId?: string;
  /**
   * The time of this change (RFC 3339 date-time).
   */
  time?: Date;
  /**
   * Deprecated - use changeType instead.
   */
  type?: string;
}

function serializeChange(data: any): Change {
  return {
    ...data,
    drive: data["drive"] !== undefined ? serializeDrive(data["drive"]) : undefined,
    file: data["file"] !== undefined ? serializeFile(data["file"]) : undefined,
    teamDrive: data["teamDrive"] !== undefined ? serializeTeamDrive(data["teamDrive"]) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeChange(data: any): Change {
  return {
    ...data,
    drive: data["drive"] !== undefined ? deserializeDrive(data["drive"]) : undefined,
    file: data["file"] !== undefined ? deserializeFile(data["file"]) : undefined,
    teamDrive: data["teamDrive"] !== undefined ? deserializeTeamDrive(data["teamDrive"]) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * A list of changes for a user.
 */
export interface ChangeList {
  /**
   * The list of changes. If nextPageToken is populated, then this list may be
   * incomplete and an additional page of results should be fetched.
   */
  changes?: Change[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#changeList".
   */
  kind?: string;
  /**
   * The starting page token for future changes. This will be present only if
   * the end of the current changes list has been reached.
   */
  newStartPageToken?: string;
  /**
   * The page token for the next page of changes. This will be absent if the
   * end of the changes list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
}

function serializeChangeList(data: any): ChangeList {
  return {
    ...data,
    changes: data["changes"] !== undefined ? data["changes"].map((item: any) => (serializeChange(item))) : undefined,
  };
}

function deserializeChangeList(data: any): ChangeList {
  return {
    ...data,
    changes: data["changes"] !== undefined ? data["changes"].map((item: any) => (deserializeChange(item))) : undefined,
  };
}

/**
 * Additional options for Drive#changesGetStartPageToken.
 */
export interface ChangesGetStartPageTokenOptions {
  /**
   * The ID of the shared drive for which the starting pageToken for listing
   * future changes from that shared drive is returned.
   */
  driveId?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Deprecated use driveId instead.
   */
  teamDriveId?: string;
}

/**
 * Additional options for Drive#changesList.
 */
export interface ChangesListOptions {
  /**
   * The shared drive from which changes are returned. If specified the change
   * IDs will be reflective of the shared drive; use the combined drive ID and
   * change ID as an identifier.
   */
  driveId?: string;
  /**
   * Whether changes should include the file resource if the file is still
   * accessible by the user at the time of the request, even when a file was
   * removed from the list of changes and there will be no further change
   * entries for this file.
   */
  includeCorpusRemovals?: boolean;
  /**
   * Whether both My Drive and shared drive items should be included in
   * results.
   */
  includeItemsFromAllDrives?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether to include changes indicating that items have been removed from
   * the list of changes, for example by deletion or loss of access.
   */
  includeRemoved?: boolean;
  /**
   * Deprecated use includeItemsFromAllDrives instead.
   */
  includeTeamDriveItems?: boolean;
  /**
   * The maximum number of changes to return per page.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response or
   * to the response from the getStartPageToken method.
   */
  pageToken: string;
  /**
   * Whether to restrict the results to changes inside the My Drive hierarchy.
   * This omits changes to files such as those in the Application Data folder or
   * shared files which have not been added to My Drive.
   */
  restrictToMyDrive?: boolean;
  /**
   * A comma-separated list of spaces to query within the corpora. Supported
   * values are 'drive' and 'appDataFolder'.
   */
  spaces?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Deprecated use driveId instead.
   */
  teamDriveId?: string;
}

/**
 * Additional options for Drive#changesWatch.
 */
export interface ChangesWatchOptions {
  /**
   * The shared drive from which changes are returned. If specified the change
   * IDs will be reflective of the shared drive; use the combined drive ID and
   * change ID as an identifier.
   */
  driveId?: string;
  /**
   * Whether changes should include the file resource if the file is still
   * accessible by the user at the time of the request, even when a file was
   * removed from the list of changes and there will be no further change
   * entries for this file.
   */
  includeCorpusRemovals?: boolean;
  /**
   * Whether both My Drive and shared drive items should be included in
   * results.
   */
  includeItemsFromAllDrives?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether to include changes indicating that items have been removed from
   * the list of changes, for example by deletion or loss of access.
   */
  includeRemoved?: boolean;
  /**
   * Deprecated use includeItemsFromAllDrives instead.
   */
  includeTeamDriveItems?: boolean;
  /**
   * The maximum number of changes to return per page.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response or
   * to the response from the getStartPageToken method.
   */
  pageToken: string;
  /**
   * Whether to restrict the results to changes inside the My Drive hierarchy.
   * This omits changes to files such as those in the Application Data folder or
   * shared files which have not been added to My Drive.
   */
  restrictToMyDrive?: boolean;
  /**
   * A comma-separated list of spaces to query within the corpora. Supported
   * values are 'drive' and 'appDataFolder'.
   */
  spaces?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Deprecated use driveId instead.
   */
  teamDriveId?: string;
}

/**
 * An notification channel used to watch for resource changes.
 */
export interface Channel {
  /**
   * The address where notifications are delivered for this channel.
   */
  address?: string;
  /**
   * Date and time of notification channel expiration, expressed as a Unix
   * timestamp, in milliseconds. Optional.
   */
  expiration?: bigint;
  /**
   * A UUID or similar unique string that identifies this channel.
   */
  id?: string;
  /**
   * Identifies this as a notification channel used to watch for changes to a
   * resource, which is "api#channel".
   */
  kind?: string;
  /**
   * Additional parameters controlling delivery channel behavior. Optional.
   */
  params?: {
    [key: string]: string
  };
  /**
   * A Boolean value to indicate whether payload is wanted. Optional.
   */
  payload?: boolean;
  /**
   * An opaque ID that identifies the resource being watched on this channel.
   * Stable across different API versions.
   */
  resourceId?: string;
  /**
   * A version-specific identifier for the watched resource.
   */
  resourceUri?: string;
  /**
   * An arbitrary string delivered to the target address with each notification
   * delivered over this channel. Optional.
   */
  token?: string;
  /**
   * The type of delivery mechanism used for this channel. Valid values are
   * "web_hook" (or "webhook"). Both values refer to a channel where Http
   * requests are used to deliver messages.
   */
  type?: string;
}

function serializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? String(data["expiration"]) : undefined,
  };
}

function deserializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? BigInt(data["expiration"]) : undefined,
  };
}

/**
 * A comment on a file.
 */
export interface Comment {
  /**
   * A region of the document represented as a JSON string. For details on
   * defining anchor properties, refer to Add comments and replies.
   */
  anchor?: string;
  /**
   * The author of the comment. The author's email address and permission ID
   * will not be populated.
   */
  author?: User;
  /**
   * The plain text content of the comment. This field is used for setting the
   * content, while htmlContent should be displayed.
   */
  content?: string;
  /**
   * The time at which the comment was created (RFC 3339 date-time).
   */
  createdTime?: Date;
  /**
   * Whether the comment has been deleted. A deleted comment has no content.
   */
  deleted?: boolean;
  /**
   * The content of the comment with HTML formatting.
   */
  htmlContent?: string;
  /**
   * The ID of the comment.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#comment".
   */
  kind?: string;
  /**
   * The last time the comment or any of its replies was modified (RFC 3339
   * date-time).
   */
  modifiedTime?: Date;
  /**
   * The file content to which the comment refers, typically within the anchor
   * region. For a text file, for example, this would be the text at the
   * location of the comment.
   */
  quotedFileContent?: {
    mimeType?: string;
    value?: string;
  };
  /**
   * The full list of replies to the comment in chronological order.
   */
  replies?: Reply[];
  /**
   * Whether the comment has been resolved by one of its replies.
   */
  resolved?: boolean;
}

function serializeComment(data: any): Comment {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? data["createdTime"].toISOString() : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? data["modifiedTime"].toISOString() : undefined,
    replies: data["replies"] !== undefined ? data["replies"].map((item: any) => (serializeReply(item))) : undefined,
  };
}

function deserializeComment(data: any): Comment {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? new Date(data["createdTime"]) : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? new Date(data["modifiedTime"]) : undefined,
    replies: data["replies"] !== undefined ? data["replies"].map((item: any) => (deserializeReply(item))) : undefined,
  };
}

/**
 * A list of comments on a file.
 */
export interface CommentList {
  /**
   * The list of comments. If nextPageToken is populated, then this list may be
   * incomplete and an additional page of results should be fetched.
   */
  comments?: Comment[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#commentList".
   */
  kind?: string;
  /**
   * The page token for the next page of comments. This will be absent if the
   * end of the comments list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
}

function serializeCommentList(data: any): CommentList {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (serializeComment(item))) : undefined,
  };
}

function deserializeCommentList(data: any): CommentList {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (deserializeComment(item))) : undefined,
  };
}

/**
 * Additional options for Drive#commentsGet.
 */
export interface CommentsGetOptions {
  /**
   * Whether to return deleted comments. Deleted comments will not include
   * their original content.
   */
  includeDeleted?: boolean;
}

/**
 * Additional options for Drive#commentsList.
 */
export interface CommentsListOptions {
  /**
   * Whether to include deleted comments. Deleted comments will not include
   * their original content.
   */
  includeDeleted?: boolean;
  /**
   * The maximum number of comments to return per page.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
  /**
   * The minimum value of 'modifiedTime' for the result comments (RFC 3339
   * date-time).
   */
  startModifiedTime?: string;
}

/**
 * A restriction for accessing the content of the file.
 */
export interface ContentRestriction {
  /**
   * Whether the content of the file is read-only. If a file is read-only, a
   * new revision of the file may not be added, comments may not be added or
   * modified, and the title of the file may not be modified.
   */
  readOnly?: boolean;
  /**
   * Reason for why the content of the file is restricted. This is only mutable
   * on requests that also set readOnly=true.
   */
  reason?: string;
  /**
   * The user who set the content restriction. Only populated if readOnly is
   * true.
   */
  restrictingUser?: User;
  /**
   * The time at which the content restriction was set (formatted RFC 3339
   * timestamp). Only populated if readOnly is true.
   */
  restrictionTime?: Date;
  /**
   * The type of the content restriction. Currently the only possible value is
   * globalContentRestriction.
   */
  type?: string;
}

function serializeContentRestriction(data: any): ContentRestriction {
  return {
    ...data,
    restrictionTime: data["restrictionTime"] !== undefined ? data["restrictionTime"].toISOString() : undefined,
  };
}

function deserializeContentRestriction(data: any): ContentRestriction {
  return {
    ...data,
    restrictionTime: data["restrictionTime"] !== undefined ? new Date(data["restrictionTime"]) : undefined,
  };
}

/**
 * Representation of a shared drive.
 */
export interface Drive {
  /**
   * An image file and cropping parameters from which a background image for
   * this shared drive is set. This is a write-only field; it can only be set on
   * drive.drives.update requests that don't set themeId. When specified, all
   * fields of the backgroundImageFile must be set.
   */
  backgroundImageFile?: {
    id?: string;
    width?: number;
    xCoordinate?: number;
    yCoordinate?: number;
  };
  /**
   * A short-lived link to this shared drive's background image.
   */
  backgroundImageLink?: string;
  /**
   * Capabilities the current user has on this shared drive.
   */
  capabilities?: {
    canAddChildren?: boolean;
    canChangeCopyRequiresWriterPermissionRestriction?: boolean;
    canChangeDomainUsersOnlyRestriction?: boolean;
    canChangeDriveBackground?: boolean;
    canChangeDriveMembersOnlyRestriction?: boolean;
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
    canComment?: boolean;
    canCopy?: boolean;
    canDeleteChildren?: boolean;
    canDeleteDrive?: boolean;
    canDownload?: boolean;
    canEdit?: boolean;
    canListChildren?: boolean;
    canManageMembers?: boolean;
    canReadRevisions?: boolean;
    canRename?: boolean;
    canRenameDrive?: boolean;
    canResetDriveRestrictions?: boolean;
    canShare?: boolean;
    canTrashChildren?: boolean;
  };
  /**
   * The color of this shared drive as an RGB hex string. It can only be set on
   * drive.drives.update requests that don't set themeId.
   */
  colorRgb?: string;
  /**
   * The time at which the shared drive was created (RFC 3339 date-time).
   */
  createdTime?: Date;
  /**
   * Whether the shared drive is hidden from default view.
   */
  hidden?: boolean;
  /**
   * The ID of this shared drive which is also the ID of the top level folder
   * of this shared drive.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#drive".
   */
  kind?: string;
  /**
   * The name of this shared drive.
   */
  name?: string;
  /**
   * The organizational unit of this shared drive. This field is only populated
   * on drives.list responses when the useDomainAdminAccess parameter is set to
   * true.
   */
  orgUnitId?: string;
  /**
   * A set of restrictions that apply to this shared drive or items inside this
   * shared drive.
   */
  restrictions?: {
    adminManagedRestrictions?: boolean;
    copyRequiresWriterPermission?: boolean;
    domainUsersOnly?: boolean;
    driveMembersOnly?: boolean;
    sharingFoldersRequiresOrganizerPermission?: boolean;
  };
  /**
   * The ID of the theme from which the background image and color are set. The
   * set of possible driveThemes can be retrieved from a drive.about.get
   * response. When not specified on a drive.drives.create request, a random
   * theme is chosen from which the background image and color are set. This is
   * a write-only field; it can only be set on requests that don't set colorRgb
   * or backgroundImageFile.
   */
  themeId?: string;
}

function serializeDrive(data: any): Drive {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? data["createdTime"].toISOString() : undefined,
  };
}

function deserializeDrive(data: any): Drive {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? new Date(data["createdTime"]) : undefined,
  };
}

/**
 * A list of shared drives.
 */
export interface DriveList {
  /**
   * The list of shared drives. If nextPageToken is populated, then this list
   * may be incomplete and an additional page of results should be fetched.
   */
  drives?: Drive[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#driveList".
   */
  kind?: string;
  /**
   * The page token for the next page of shared drives. This will be absent if
   * the end of the list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
}

function serializeDriveList(data: any): DriveList {
  return {
    ...data,
    drives: data["drives"] !== undefined ? data["drives"].map((item: any) => (serializeDrive(item))) : undefined,
  };
}

function deserializeDriveList(data: any): DriveList {
  return {
    ...data,
    drives: data["drives"] !== undefined ? data["drives"].map((item: any) => (deserializeDrive(item))) : undefined,
  };
}

/**
 * Additional options for Drive#drivesCreate.
 */
export interface DrivesCreateOptions {
  /**
   * An ID, such as a random UUID, which uniquely identifies this user's
   * request for idempotent creation of a shared drive. A repeated request by
   * the same user and with the same request ID will avoid creating duplicates
   * by attempting to create the same shared drive. If the shared drive already
   * exists a 409 error will be returned.
   */
  requestId: string;
}

/**
 * Additional options for Drive#drivesDelete.
 */
export interface DrivesDeleteOptions {
  /**
   * Whether any items inside the shared drive should also be deleted. This
   * option is only supported when useDomainAdminAccess is also set to true.
   */
  allowItemDeletion?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if they are an administrator of the domain
   * to which the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#drivesGet.
 */
export interface DrivesGetOptions {
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if they are an administrator of the domain
   * to which the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#drivesList.
 */
export interface DrivesListOptions {
  /**
   * Maximum number of shared drives to return per page.
   */
  pageSize?: number;
  /**
   * Page token for shared drives.
   */
  pageToken?: string;
  /**
   * Query string for searching shared drives.
   */
  q?: string;
  /**
   * Issue the request as a domain administrator; if set to true, then all
   * shared drives of the domain in which the requester is an administrator are
   * returned.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#drivesUpdate.
 */
export interface DrivesUpdateOptions {
  /**
   * Issue the request as a domain administrator. If set to true, then the
   * requester is granted access if they're an administrator of the domain to
   * which the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * The metadata for a file.
 */
export interface File {
  /**
   * A collection of arbitrary key-value pairs which are private to the
   * requesting app. Entries with null values are cleared in update and copy
   * requests. These properties can only be retrieved using an authenticated
   * request. An authenticated request uses an access token obtained with a
   * OAuth 2 client ID. You cannot use an API key to retrieve private
   * properties.
   */
  appProperties?: {
    [key: string]: string
  };
  /**
   * Capabilities the current user has on this file. Each capability
   * corresponds to a fine-grained action that a user may take.
   */
  capabilities?: {
    canAcceptOwnership?: boolean;
    canAddChildren?: boolean;
    canAddFolderFromAnotherDrive?: boolean;
    canAddMyDriveParent?: boolean;
    canChangeCopyRequiresWriterPermission?: boolean;
    canChangeSecurityUpdateEnabled?: boolean;
    canChangeViewersCanCopyContent?: boolean;
    canComment?: boolean;
    canCopy?: boolean;
    canDelete?: boolean;
    canDeleteChildren?: boolean;
    canDownload?: boolean;
    canEdit?: boolean;
    canListChildren?: boolean;
    canModifyContent?: boolean;
    canModifyContentRestriction?: boolean;
    canModifyLabels?: boolean;
    canMoveChildrenOutOfDrive?: boolean;
    canMoveChildrenOutOfTeamDrive?: boolean;
    canMoveChildrenWithinDrive?: boolean;
    canMoveChildrenWithinTeamDrive?: boolean;
    canMoveItemIntoTeamDrive?: boolean;
    canMoveItemOutOfDrive?: boolean;
    canMoveItemOutOfTeamDrive?: boolean;
    canMoveItemWithinDrive?: boolean;
    canMoveItemWithinTeamDrive?: boolean;
    canMoveTeamDriveItem?: boolean;
    canReadDrive?: boolean;
    canReadLabels?: boolean;
    canReadRevisions?: boolean;
    canReadTeamDrive?: boolean;
    canRemoveChildren?: boolean;
    canRemoveMyDriveParent?: boolean;
    canRename?: boolean;
    canShare?: boolean;
    canTrash?: boolean;
    canTrashChildren?: boolean;
    canUntrash?: boolean;
  };
  /**
   * Additional information about the content of the file. These fields are
   * never populated in responses.
   */
  contentHints?: {
    indexableText?: string;
    thumbnail?: {
      image?: Uint8Array;
      mimeType?: string;
    };
  };
  /**
   * Restrictions for accessing the content of the file. Only populated if such
   * a restriction exists.
   */
  contentRestrictions?: ContentRestriction[];
  /**
   * Whether the options to copy, print, or download this file, should be
   * disabled for readers and commenters.
   */
  copyRequiresWriterPermission?: boolean;
  /**
   * The time at which the file was created (RFC 3339 date-time).
   */
  createdTime?: Date;
  /**
   * A short description of the file.
   */
  description?: string;
  /**
   * ID of the shared drive the file resides in. Only populated for items in
   * shared drives.
   */
  driveId?: string;
  /**
   * Whether the file has been explicitly trashed, as opposed to recursively
   * trashed from a parent folder.
   */
  explicitlyTrashed?: boolean;
  /**
   * Links for exporting Docs Editors files to specific formats.
   */
  readonly exportLinks?: {
    [key: string]: string
  };
  /**
   * The final component of fullFileExtension. This is only available for files
   * with binary content in Google Drive.
   */
  fileExtension?: string;
  /**
   * The color for a folder or shortcut to a folder as an RGB hex string. The
   * supported colors are published in the folderColorPalette field of the About
   * resource. If an unsupported color is specified, the closest color in the
   * palette will be used instead.
   */
  folderColorRgb?: string;
  /**
   * The full file extension extracted from the name field. May contain
   * multiple concatenated extensions, such as "tar.gz". This is only available
   * for files with binary content in Google Drive. This is automatically
   * updated when the name field changes, however it isn't cleared if the new
   * name does not contain a valid extension.
   */
  fullFileExtension?: string;
  /**
   * Whether there are permissions directly on this file. This field is only
   * populated for items in shared drives.
   */
  hasAugmentedPermissions?: boolean;
  /**
   * Whether this file has a thumbnail. This does not indicate whether the
   * requesting app has access to the thumbnail. To check access, look for the
   * presence of the thumbnailLink field.
   */
  hasThumbnail?: boolean;
  /**
   * The ID of the file's head revision. This is currently only available for
   * files with binary content in Google Drive.
   */
  headRevisionId?: string;
  /**
   * A static, unauthenticated link to the file's icon.
   */
  iconLink?: string;
  /**
   * The ID of the file.
   */
  id?: string;
  /**
   * Additional metadata about image media, if available.
   */
  imageMediaMetadata?: {
    aperture?: number;
    cameraMake?: string;
    cameraModel?: string;
    colorSpace?: string;
    exposureBias?: number;
    exposureMode?: string;
    exposureTime?: number;
    flashUsed?: boolean;
    focalLength?: number;
    height?: number;
    isoSpeed?: number;
    lens?: string;
    location?: {
      altitude?: number;
      latitude?: number;
      longitude?: number;
    };
    maxApertureValue?: number;
    meteringMode?: string;
    rotation?: number;
    sensor?: string;
    subjectDistance?: number;
    time?: string;
    whiteBalance?: string;
    width?: number;
  };
  /**
   * Whether the file was created or opened by the requesting app.
   */
  isAppAuthorized?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#file".
   */
  kind?: string;
  /**
   * An overview of the labels on the file.
   */
  labelInfo?: {
    labels?: Label[];
  };
  /**
   * The last user to modify the file.
   */
  lastModifyingUser?: User;
  /**
   * Contains details about the link URLs that clients are using to refer to
   * this item.
   */
  linkShareMetadata?: {
    securityUpdateEligible?: boolean;
    securityUpdateEnabled?: boolean;
  };
  /**
   * The MD5 checksum for the content of the file. This is only applicable to
   * files with binary content in Google Drive.
   */
  md5Checksum?: string;
  /**
   * The MIME type of the file. Google Drive will attempt to automatically
   * detect an appropriate value from uploaded content if no value is provided.
   * The value cannot be changed unless a new revision is uploaded. If a file is
   * created with a Google Doc MIME type, the uploaded content will be imported
   * if possible. The supported import formats are published in the About
   * resource.
   */
  mimeType?: string;
  /**
   * Whether the file has been modified by this user.
   */
  modifiedByMe?: boolean;
  /**
   * The last time the file was modified by the user (RFC 3339 date-time).
   */
  modifiedByMeTime?: Date;
  /**
   * The last time the file was modified by anyone (RFC 3339 date-time). Note
   * that setting modifiedTime will also update modifiedByMeTime for the user.
   */
  modifiedTime?: Date;
  /**
   * The name of the file. This is not necessarily unique within a folder. Note
   * that for immutable items such as the top level folders of shared drives, My
   * Drive root folder, and Application Data folder the name is constant.
   */
  name?: string;
  /**
   * The original filename of the uploaded content if available, or else the
   * original value of the name field. This is only available for files with
   * binary content in Google Drive.
   */
  originalFilename?: string;
  /**
   * Whether the user owns the file. Not populated for items in shared drives.
   */
  ownedByMe?: boolean;
  /**
   * The owner of this file. Only certain legacy files may have more than one
   * owner. This field isn't populated for items in shared drives.
   */
  owners?: User[];
  /**
   * The IDs of the parent folders which contain the file. If not specified as
   * part of a create request, the file will be placed directly in the user's My
   * Drive folder. If not specified as part of a copy request, the file will
   * inherit any discoverable parents of the source file. Update requests must
   * use the addParents and removeParents parameters to modify the parents list.
   */
  parents?: string[];
  /**
   * List of permission IDs for users with access to this file.
   */
  permissionIds?: string[];
  /**
   * The full list of permissions for the file. This is only available if the
   * requesting user can share the file. Not populated for items in shared
   * drives.
   */
  permissions?: Permission[];
  /**
   * A collection of arbitrary key-value pairs which are visible to all apps.
   * Entries with null values are cleared in update and copy requests.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The number of storage quota bytes used by the file. This includes the head
   * revision as well as previous revisions with keepForever enabled.
   */
  quotaBytesUsed?: bigint;
  /**
   * A key needed to access the item via a shared link.
   */
  resourceKey?: string;
  /**
   * The SHA1 checksum associated with this file, if available. This field is
   * only populated for files with content stored in Google Drive; it isn't
   * populated for Docs Editors or shortcut files.
   */
  sha1Checksum?: string;
  /**
   * The SHA256 checksum associated with this file, if available. This field is
   * only populated for files with content stored in Google Drive; it isn't
   * populated for Docs Editors or shortcut files.
   */
  sha256Checksum?: string;
  /**
   * Whether the file has been shared. Not populated for items in shared
   * drives.
   */
  shared?: boolean;
  /**
   * The time at which the file was shared with the user, if applicable (RFC
   * 3339 date-time).
   */
  sharedWithMeTime?: Date;
  /**
   * The user who shared the file with the requesting user, if applicable.
   */
  sharingUser?: User;
  /**
   * Shortcut file details. Only populated for shortcut files, which have the
   * mimeType field set to application/vnd.google-apps.shortcut.
   */
  shortcutDetails?: {
    targetId?: string;
    targetMimeType?: string;
    targetResourceKey?: string;
  };
  /**
   * The size of the file's content in bytes. This field is populated for files
   * with binary content stored in Google Drive and for Docs Editors files; it
   * is not populated for shortcuts or folders.
   */
  size?: bigint;
  /**
   * The list of spaces which contain the file. The currently supported values
   * are 'drive', 'appDataFolder' and 'photos'.
   */
  spaces?: string[];
  /**
   * Whether the user has starred the file.
   */
  starred?: boolean;
  /**
   * Deprecated - use driveId instead.
   */
  teamDriveId?: string;
  /**
   * A short-lived link to the file's thumbnail, if available. Typically lasts
   * on the order of hours. Only populated when the requesting app can access
   * the file's content. If the file isn't shared publicly, the URL returned in
   * Files.thumbnailLink must be fetched using a credentialed request.
   */
  thumbnailLink?: string;
  /**
   * The thumbnail version for use in thumbnail cache invalidation.
   */
  thumbnailVersion?: bigint;
  /**
   * Whether the file has been trashed, either explicitly or from a trashed
   * parent folder. Only the owner may trash a file. The trashed item is
   * excluded from all files.list responses returned for any user who does not
   * own the file. However, all users with access to the file can see the
   * trashed item metadata in an API response. All users with access can copy,
   * download, export, and share the file.
   */
  trashed?: boolean;
  /**
   * The time that the item was trashed (RFC 3339 date-time). Only populated
   * for items in shared drives.
   */
  trashedTime?: Date;
  /**
   * If the file has been explicitly trashed, the user who trashed it. Only
   * populated for items in shared drives.
   */
  trashingUser?: User;
  /**
   * A monotonically increasing version number for the file. This reflects
   * every change made to the file on the server, even those not visible to the
   * user.
   */
  version?: bigint;
  /**
   * Additional metadata about video media. This may not be available
   * immediately upon upload.
   */
  videoMediaMetadata?: {
    durationMillis?: bigint;
    height?: number;
    width?: number;
  };
  /**
   * Whether the file has been viewed by this user.
   */
  viewedByMe?: boolean;
  /**
   * The last time the file was viewed by the user (RFC 3339 date-time).
   */
  viewedByMeTime?: Date;
  /**
   * Deprecated - use copyRequiresWriterPermission instead.
   */
  viewersCanCopyContent?: boolean;
  /**
   * A link for downloading the content of the file in a browser. This is only
   * available for files with binary content in Google Drive.
   */
  webContentLink?: string;
  /**
   * A link for opening the file in a relevant Google editor or viewer in a
   * browser.
   */
  webViewLink?: string;
  /**
   * Whether users with only writer permission can modify the file's
   * permissions. Not populated for items in shared drives.
   */
  writersCanShare?: boolean;
}

function serializeFile(data: any): File {
  return {
    ...data,
    contentHints: data["contentHints"] !== undefined ? {
      ...data["contentHints"],
      thumbnail: data["contentHints"]["thumbnail"] !== undefined ? {
        ...data["contentHints"]["thumbnail"],
        image: data["contentHints"]["thumbnail"]["image"] !== undefined ? encodeBase64(data["contentHints"]["thumbnail"]["image"]) : undefined,
      } : undefined,
    } : undefined,
    contentRestrictions: data["contentRestrictions"] !== undefined ? data["contentRestrictions"].map((item: any) => (serializeContentRestriction(item))) : undefined,
    createdTime: data["createdTime"] !== undefined ? data["createdTime"].toISOString() : undefined,
    labelInfo: data["labelInfo"] !== undefined ? {
      ...data["labelInfo"],
      labels: data["labelInfo"]["labels"] !== undefined ? data["labelInfo"]["labels"].map((item: any) => (serializeLabel(item))) : undefined,
    } : undefined,
    modifiedByMeTime: data["modifiedByMeTime"] !== undefined ? data["modifiedByMeTime"].toISOString() : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? data["modifiedTime"].toISOString() : undefined,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (serializePermission(item))) : undefined,
    quotaBytesUsed: data["quotaBytesUsed"] !== undefined ? String(data["quotaBytesUsed"]) : undefined,
    sharedWithMeTime: data["sharedWithMeTime"] !== undefined ? data["sharedWithMeTime"].toISOString() : undefined,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
    thumbnailVersion: data["thumbnailVersion"] !== undefined ? String(data["thumbnailVersion"]) : undefined,
    trashedTime: data["trashedTime"] !== undefined ? data["trashedTime"].toISOString() : undefined,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
    videoMediaMetadata: data["videoMediaMetadata"] !== undefined ? {
      ...data["videoMediaMetadata"],
      durationMillis: data["videoMediaMetadata"]["durationMillis"] !== undefined ? String(data["videoMediaMetadata"]["durationMillis"]) : undefined,
    } : undefined,
    viewedByMeTime: data["viewedByMeTime"] !== undefined ? data["viewedByMeTime"].toISOString() : undefined,
  };
}

function deserializeFile(data: any): File {
  return {
    ...data,
    contentHints: data["contentHints"] !== undefined ? {
      ...data["contentHints"],
      thumbnail: data["contentHints"]["thumbnail"] !== undefined ? {
        ...data["contentHints"]["thumbnail"],
        image: data["contentHints"]["thumbnail"]["image"] !== undefined ? decodeBase64(data["contentHints"]["thumbnail"]["image"] as string) : undefined,
      } : undefined,
    } : undefined,
    contentRestrictions: data["contentRestrictions"] !== undefined ? data["contentRestrictions"].map((item: any) => (deserializeContentRestriction(item))) : undefined,
    createdTime: data["createdTime"] !== undefined ? new Date(data["createdTime"]) : undefined,
    labelInfo: data["labelInfo"] !== undefined ? {
      ...data["labelInfo"],
      labels: data["labelInfo"]["labels"] !== undefined ? data["labelInfo"]["labels"].map((item: any) => (deserializeLabel(item))) : undefined,
    } : undefined,
    modifiedByMeTime: data["modifiedByMeTime"] !== undefined ? new Date(data["modifiedByMeTime"]) : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? new Date(data["modifiedTime"]) : undefined,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (deserializePermission(item))) : undefined,
    quotaBytesUsed: data["quotaBytesUsed"] !== undefined ? BigInt(data["quotaBytesUsed"]) : undefined,
    sharedWithMeTime: data["sharedWithMeTime"] !== undefined ? new Date(data["sharedWithMeTime"]) : undefined,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
    thumbnailVersion: data["thumbnailVersion"] !== undefined ? BigInt(data["thumbnailVersion"]) : undefined,
    trashedTime: data["trashedTime"] !== undefined ? new Date(data["trashedTime"]) : undefined,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
    videoMediaMetadata: data["videoMediaMetadata"] !== undefined ? {
      ...data["videoMediaMetadata"],
      durationMillis: data["videoMediaMetadata"]["durationMillis"] !== undefined ? BigInt(data["videoMediaMetadata"]["durationMillis"]) : undefined,
    } : undefined,
    viewedByMeTime: data["viewedByMeTime"] !== undefined ? new Date(data["viewedByMeTime"]) : undefined,
  };
}

/**
 * A list of files.
 */
export interface FileList {
  /**
   * The list of files. If nextPageToken is populated, then this list may be
   * incomplete and an additional page of results should be fetched.
   */
  files?: File[];
  /**
   * Whether the search process was incomplete. If true, then some search
   * results may be missing, since all documents were not searched. This may
   * occur when searching multiple drives with the "allDrives" corpora, but all
   * corpora could not be searched. When this happens, it is suggested that
   * clients narrow their query by choosing a different corpus such as "user" or
   * "drive".
   */
  incompleteSearch?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#fileList".
   */
  kind?: string;
  /**
   * The page token for the next page of files. This will be absent if the end
   * of the files list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
}

function serializeFileList(data: any): FileList {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeFile(item))) : undefined,
  };
}

function deserializeFileList(data: any): FileList {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeFile(item))) : undefined,
  };
}

/**
 * Additional options for Drive#filesCopy.
 */
export interface FilesCopyOptions {
  /**
   * Deprecated. Copying files into multiple folders is no longer supported.
   * Use shortcuts instead.
   */
  enforceSingleParent?: boolean;
  /**
   * Whether to ignore the domain's default visibility settings for the created
   * file. Domain administrators can choose to make all uploaded files visible
   * to the domain by default; this parameter bypasses that behavior for the
   * request. Permissions are still inherited from parent folders.
   */
  ignoreDefaultVisibility?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether to set the 'keepForever' field in the new head revision. This is
   * only applicable to files with binary content in Google Drive. Only 200
   * revisions for the file can be kept forever. If the limit is reached, try
   * deleting pinned revisions.
   */
  keepRevisionForever?: boolean;
  /**
   * A language hint for OCR processing during image import (ISO 639-1 code).
   */
  ocrLanguage?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
}

/**
 * Additional options for Drive#filesCreate.
 */
export interface FilesCreateOptions {
  /**
   * Deprecated. Creating files in multiple folders is no longer supported.
   */
  enforceSingleParent?: boolean;
  /**
   * Whether to ignore the domain's default visibility settings for the created
   * file. Domain administrators can choose to make all uploaded files visible
   * to the domain by default; this parameter bypasses that behavior for the
   * request. Permissions are still inherited from parent folders.
   */
  ignoreDefaultVisibility?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether to set the 'keepForever' field in the new head revision. This is
   * only applicable to files with binary content in Google Drive. Only 200
   * revisions for the file can be kept forever. If the limit is reached, try
   * deleting pinned revisions.
   */
  keepRevisionForever?: boolean;
  /**
   * A language hint for OCR processing during image import (ISO 639-1 code).
   */
  ocrLanguage?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Whether to use the uploaded content as indexable text.
   */
  useContentAsIndexableText?: boolean;
}

/**
 * Additional options for Drive#filesDelete.
 */
export interface FilesDeleteOptions {
  /**
   * Deprecated. If an item is not in a shared drive and its last parent is
   * deleted but the item itself is not, the item will be placed under its
   * owner's root.
   */
  enforceSingleParent?: boolean;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
}

/**
 * Additional options for Drive#filesEmptyTrash.
 */
export interface FilesEmptyTrashOptions {
  /**
   * Deprecated. If an item is not in a shared drive and its last parent is
   * deleted but the item itself is not, the item will be placed under its
   * owner's root.
   */
  enforceSingleParent?: boolean;
}

/**
 * Additional options for Drive#filesExport.
 */
export interface FilesExportOptions {
  /**
   * The MIME type of the format requested for this export.
   */
  mimeType: string;
}

/**
 * Additional options for Drive#filesGenerateIds.
 */
export interface FilesGenerateIdsOptions {
  /**
   * The number of IDs to return.
   */
  count?: number;
  /**
   * The space in which the IDs can be used to create new files. Supported
   * values are 'drive' and 'appDataFolder'. (Default: 'drive')
   */
  space?: string;
  /**
   * The type of items which the IDs can be used for. Supported values are
   * 'files' and 'shortcuts'. Note that 'shortcuts' are only supported in the
   * drive 'space'. (Default: 'files')
   */
  type?: string;
}

/**
 * Additional options for Drive#filesGet.
 */
export interface FilesGetOptions {
  /**
   * Whether the user is acknowledging the risk of downloading known malware or
   * other abusive files. This is only applicable when alt=media.
   */
  acknowledgeAbuse?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
}

/**
 * Additional options for Drive#filesListLabels.
 */
export interface FilesListLabelsOptions {
  /**
   * The maximum number of labels to return per page. When not set, this
   * defaults to 100.
   */
  maxResults?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Drive#filesList.
 */
export interface FilesListOptions {
  /**
   * Groupings of files to which the query applies. Supported groupings are:
   * 'user' (files created by, opened by, or shared directly with the user),
   * 'drive' (files in the specified shared drive as indicated by the
   * 'driveId'), 'domain' (files shared to the user's domain), and 'allDrives'
   * (A combination of 'user' and 'drive' for all drives where the user is a
   * member). When able, use 'user' or 'drive', instead of 'allDrives', for
   * efficiency.
   */
  corpora?: string;
  /**
   * The source of files to list. Deprecated: use 'corpora' instead.
   */
  corpus?:  | "domain" | "user";
  /**
   * ID of the shared drive to search.
   */
  driveId?: string;
  /**
   * Whether both My Drive and shared drive items should be included in
   * results.
   */
  includeItemsFromAllDrives?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Deprecated use includeItemsFromAllDrives instead.
   */
  includeTeamDriveItems?: boolean;
  /**
   * A comma-separated list of sort keys. Valid keys are 'createdTime',
   * 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'name_natural',
   * 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', and
   * 'viewedByMeTime'. Each key sorts ascending by default, but may be reversed
   * with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime
   * desc,name. Please note that there is a current limitation for users with
   * approximately one million files in which the requested sort order is
   * ignored.
   */
  orderBy?: string;
  /**
   * The maximum number of files to return per page. Partial or empty result
   * pages are possible even before the end of the files list has been reached.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
  /**
   * A query for filtering the file results. See the "Search for Files" guide
   * for supported syntax.
   */
  q?: string;
  /**
   * A comma-separated list of spaces to query within the corpora. Supported
   * values are 'drive' and 'appDataFolder'.
   */
  spaces?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Deprecated use driveId instead.
   */
  teamDriveId?: string;
}

/**
 * Additional options for Drive#filesUpdate.
 */
export interface FilesUpdateOptions {
  /**
   * A comma-separated list of parent IDs to add.
   */
  addParents?: string;
  /**
   * Deprecated. Adding files to multiple folders is no longer supported. Use
   * shortcuts instead.
   */
  enforceSingleParent?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether to set the 'keepForever' field in the new head revision. This is
   * only applicable to files with binary content in Google Drive. Only 200
   * revisions for the file can be kept forever. If the limit is reached, try
   * deleting pinned revisions.
   */
  keepRevisionForever?: boolean;
  /**
   * A language hint for OCR processing during image import (ISO 639-1 code).
   */
  ocrLanguage?: string;
  /**
   * A comma-separated list of parent IDs to remove.
   */
  removeParents?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Whether to use the uploaded content as indexable text.
   */
  useContentAsIndexableText?: boolean;
}

/**
 * Additional options for Drive#filesWatch.
 */
export interface FilesWatchOptions {
  /**
   * Whether the user is acknowledging the risk of downloading known malware or
   * other abusive files. This is only applicable when alt=media.
   */
  acknowledgeAbuse?: boolean;
  /**
   * A comma-separated list of IDs of labels to include in the labelInfo part
   * of the response.
   */
  includeLabels?: string;
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
}

/**
 * A list of generated file IDs which can be provided in create requests.
 */
export interface GeneratedIds {
  /**
   * The IDs generated for the requesting user in the specified space.
   */
  ids?: string[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#generatedIds".
   */
  kind?: string;
  /**
   * The type of file that can be created with these IDs.
   */
  space?: string;
}

/**
 * Representation of a label and its fields.
 */
export interface Label {
  /**
   * A map of the label's fields keyed by the field ID.
   */
  fields?: {
    [key: string]: LabelField
  };
  /**
   * The ID of the label.
   */
  id?: string;
  /**
   * This is always drive#label
   */
  kind?: string;
  /**
   * The revision ID of the label.
   */
  revisionId?: string;
}

function serializeLabel(data: any): Label {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, serializeLabelField(v)]))) : undefined,
  };
}

function deserializeLabel(data: any): Label {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, deserializeLabelField(v)]))) : undefined,
  };
}

/**
 * Representation of a label field.
 */
export interface LabelField {
  /**
   * Only present if valueType is dateString. RFC 3339 formatted date:
   * YYYY-MM-DD.
   */
  dateString?: Date[];
  /**
   * The identifier of this field.
   */
  id?: string;
  /**
   * Only present if valueType is integer.
   */
  integer?: bigint[];
  /**
   * This is always drive#labelField.
   */
  kind?: string;
  /**
   * Only present if valueType is selection.
   */
  selection?: string[];
  /**
   * Only present if valueType is text.
   */
  text?: string[];
  /**
   * Only present if valueType is user.
   */
  user?: User[];
  /**
   * The field type. While new values may be supported in the future, the
   * following are currently allowed: - dateString - integer - selection - text
   * - user
   */
  valueType?: string;
}

function serializeLabelField(data: any): LabelField {
  return {
    ...data,
    dateString: data["dateString"] !== undefined ? data["dateString"].map((item: any) => (item.toISOString())) : undefined,
    integer: data["integer"] !== undefined ? data["integer"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeLabelField(data: any): LabelField {
  return {
    ...data,
    dateString: data["dateString"] !== undefined ? data["dateString"].map((item: any) => (new Date(item))) : undefined,
    integer: data["integer"] !== undefined ? data["integer"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A modification to a label's field.
 */
export interface LabelFieldModification {
  /**
   * The ID of the Field to be modified.
   */
  fieldId?: string;
  /**
   * This is always drive#labelFieldModification.
   */
  kind?: string;
  /**
   * Replaces a dateString field with these new values. The values must be
   * strings in the RFC 3339 full-date format: YYYY-MM-DD.
   */
  setDateValues?: Date[];
  /**
   * Replaces an integer field with these new values.
   */
  setIntegerValues?: bigint[];
  /**
   * Replaces a selection field with these new values.
   */
  setSelectionValues?: string[];
  /**
   * Replaces a text field with these new values.
   */
  setTextValues?: string[];
  /**
   * Replaces a user field with these new values. The values must be valid
   * email addresses.
   */
  setUserValues?: string[];
  /**
   * Unsets the values for this field.
   */
  unsetValues?: boolean;
}

function serializeLabelFieldModification(data: any): LabelFieldModification {
  return {
    ...data,
    setDateValues: data["setDateValues"] !== undefined ? data["setDateValues"].map((item: any) => (item.toISOString())) : undefined,
    setIntegerValues: data["setIntegerValues"] !== undefined ? data["setIntegerValues"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeLabelFieldModification(data: any): LabelFieldModification {
  return {
    ...data,
    setDateValues: data["setDateValues"] !== undefined ? data["setDateValues"].map((item: any) => (new Date(item))) : undefined,
    setIntegerValues: data["setIntegerValues"] !== undefined ? data["setIntegerValues"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A list of labels.
 */
export interface LabelList {
  /**
   * This is always drive#labelList
   */
  kind?: string;
  /**
   * The list of labels.
   */
  labels?: Label[];
  /**
   * The page token for the next page of labels. This field will be absent if
   * the end of the list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
}

function serializeLabelList(data: any): LabelList {
  return {
    ...data,
    labels: data["labels"] !== undefined ? data["labels"].map((item: any) => (serializeLabel(item))) : undefined,
  };
}

function deserializeLabelList(data: any): LabelList {
  return {
    ...data,
    labels: data["labels"] !== undefined ? data["labels"].map((item: any) => (deserializeLabel(item))) : undefined,
  };
}

/**
 * A modification to a label on a file. A LabelModification can be used to
 * apply a label to a file, update an existing label on a file, or remove a
 * label from a file.
 */
export interface LabelModification {
  /**
   * The list of modifications to this label's fields.
   */
  fieldModifications?: LabelFieldModification[];
  /**
   * This is always drive#labelModification.
   */
  kind?: string;
  /**
   * The ID of the label to modify.
   */
  labelId?: string;
  /**
   * If true, the label will be removed from the file.
   */
  removeLabel?: boolean;
}

function serializeLabelModification(data: any): LabelModification {
  return {
    ...data,
    fieldModifications: data["fieldModifications"] !== undefined ? data["fieldModifications"].map((item: any) => (serializeLabelFieldModification(item))) : undefined,
  };
}

function deserializeLabelModification(data: any): LabelModification {
  return {
    ...data,
    fieldModifications: data["fieldModifications"] !== undefined ? data["fieldModifications"].map((item: any) => (deserializeLabelFieldModification(item))) : undefined,
  };
}

/**
 * A request to modify the set of labels on a file. This request may contain
 * many modifications that will either all succeed or all fail transactionally.
 */
export interface ModifyLabelsRequest {
  /**
   * This is always drive#modifyLabelsRequest
   */
  kind?: string;
  /**
   * The list of modifications to apply to the labels on the file.
   */
  labelModifications?: LabelModification[];
}

function serializeModifyLabelsRequest(data: any): ModifyLabelsRequest {
  return {
    ...data,
    labelModifications: data["labelModifications"] !== undefined ? data["labelModifications"].map((item: any) => (serializeLabelModification(item))) : undefined,
  };
}

function deserializeModifyLabelsRequest(data: any): ModifyLabelsRequest {
  return {
    ...data,
    labelModifications: data["labelModifications"] !== undefined ? data["labelModifications"].map((item: any) => (deserializeLabelModification(item))) : undefined,
  };
}

/**
 * Response to a ModifyLabels request. This contains only those labels which
 * were added or updated by the request.
 */
export interface ModifyLabelsResponse {
  /**
   * This is always drive#modifyLabelsResponse
   */
  kind?: string;
  /**
   * The list of labels which were added or updated by the request.
   */
  modifiedLabels?: Label[];
}

function serializeModifyLabelsResponse(data: any): ModifyLabelsResponse {
  return {
    ...data,
    modifiedLabels: data["modifiedLabels"] !== undefined ? data["modifiedLabels"].map((item: any) => (serializeLabel(item))) : undefined,
  };
}

function deserializeModifyLabelsResponse(data: any): ModifyLabelsResponse {
  return {
    ...data,
    modifiedLabels: data["modifiedLabels"] !== undefined ? data["modifiedLabels"].map((item: any) => (deserializeLabel(item))) : undefined,
  };
}

/**
 * A permission for a file. A permission grants a user, group, domain, or the
 * world access to a file or a folder hierarchy.
 */
export interface Permission {
  /**
   * Whether the permission allows the file to be discovered through search.
   * This is only applicable for permissions of type domain or anyone.
   */
  allowFileDiscovery?: boolean;
  /**
   * Whether the account associated with this permission has been deleted. This
   * field only pertains to user and group permissions.
   */
  deleted?: boolean;
  /**
   * The "pretty" name of the value of the permission. The following is a list
   * of examples for each type of permission: - user - User's full name, as
   * defined for their Google Account, such as "Joe Smith." - group - Name of
   * the Google Group, such as "The Company Administrators." - domain - String
   * domain name, such as "your-company.com." - anyone - No displayName is
   * present.
   */
  displayName?: string;
  /**
   * The domain to which this permission refers. The following options are
   * currently allowed: - The entire domain, such as "your-company.com." - A
   * target audience, such as "ID.audience.googledomains.com."
   */
  domain?: string;
  /**
   * The email address of the user or group to which this permission refers.
   */
  emailAddress?: string;
  /**
   * The time at which this permission will expire (RFC 3339 date-time).
   * Expiration times have the following restrictions: - They cannot be set on
   * shared drive items. - They can only be set on user and group permissions. -
   * The time must be in the future. - The time cannot be more than one year in
   * the future.
   */
  expirationTime?: Date;
  /**
   * The ID of this permission. This is a unique identifier for the grantee,
   * and is published in User resources as permissionId. IDs should be treated
   * as opaque values.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#permission".
   */
  kind?: string;
  /**
   * Whether the account associated with this permission is a pending owner.
   * Only populated for user type permissions for files that aren't in a shared
   * drive.
   */
  pendingOwner?: boolean;
  /**
   * Details of whether the permissions on this shared drive item are inherited
   * or are directly on this item. This is an output-only field that's present
   * only for shared drive items.
   */
  readonly permissionDetails?: {
    inherited?: boolean;
    inheritedFrom?: string;
    permissionType?: string;
    role?: string;
  }[];
  /**
   * A link to the user's profile photo, if available.
   */
  photoLink?: string;
  /**
   * The role granted by this permission. While new values may be supported in
   * the future, the following are currently allowed: - owner - organizer -
   * fileOrganizer - writer - commenter - reader
   */
  role?: string;
  /**
   * Deprecated - use permissionDetails instead.
   */
  readonly teamDrivePermissionDetails?: {
    inherited?: boolean;
    inheritedFrom?: string;
    role?: string;
    teamDrivePermissionType?: string;
  }[];
  /**
   * The type of the grantee. Valid values are: - user - group - domain -
   * anyone When creating a permission, if type is user or group, you must
   * provide an emailAddress for the user or group. When type is domain, you
   * must provide a domain. There isn't extra information required for the
   * anyone type.
   */
  type?: string;
  /**
   * Indicates the view for this permission. Only populated for permissions
   * that belong to a view. published is the only supported value.
   */
  view?: string;
}

function serializePermission(data: any): Permission {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializePermission(data: any): Permission {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * A list of permissions for a file.
 */
export interface PermissionList {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#permissionList".
   */
  kind?: string;
  /**
   * The page token for the next page of permissions. This field will be absent
   * if the end of the permissions list has been reached. If the token is
   * rejected for any reason, it should be discarded, and pagination should be
   * restarted from the first page of results.
   */
  nextPageToken?: string;
  /**
   * The list of permissions. If nextPageToken is populated, then this list may
   * be incomplete and an additional page of results should be fetched.
   */
  permissions?: Permission[];
}

function serializePermissionList(data: any): PermissionList {
  return {
    ...data,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (serializePermission(item))) : undefined,
  };
}

function deserializePermissionList(data: any): PermissionList {
  return {
    ...data,
    permissions: data["permissions"] !== undefined ? data["permissions"].map((item: any) => (deserializePermission(item))) : undefined,
  };
}

/**
 * Additional options for Drive#permissionsCreate.
 */
export interface PermissionsCreateOptions {
  /**
   * A plain text custom message to include in the notification email.
   */
  emailMessage?: string;
  /**
   * Deprecated. See moveToNewOwnersRoot for details.
   */
  enforceSingleParent?: boolean;
  /**
   * This parameter will only take effect if the item is not in a shared drive
   * and the request is attempting to transfer the ownership of the item. If set
   * to true, the item will be moved to the new owner's My Drive root folder and
   * all prior parents removed. If set to false, parents are not changed.
   */
  moveToNewOwnersRoot?: boolean;
  /**
   * Whether to send a notification email when sharing to users or groups. This
   * defaults to true for users and groups, and is not allowed for other
   * requests. It must not be disabled for ownership transfers.
   */
  sendNotificationEmail?: boolean;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Whether to transfer ownership to the specified user and downgrade the
   * current owner to a writer. This parameter is required as an acknowledgement
   * of the side effect. File owners can only transfer ownership of files
   * existing on My Drive. Files existing in a shared drive are owned by the
   * organization that owns that shared drive. Ownership transfers are not
   * supported for files and folders in shared drives. Organizers of a shared
   * drive can move items from that shared drive into their My Drive which
   * transfers the ownership to them.
   */
  transferOwnership?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if the file ID parameter refers to a
   * shared drive and the requester is an administrator of the domain to which
   * the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#permissionsDelete.
 */
export interface PermissionsDeleteOptions {
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if the file ID parameter refers to a
   * shared drive and the requester is an administrator of the domain to which
   * the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#permissionsGet.
 */
export interface PermissionsGetOptions {
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if the file ID parameter refers to a
   * shared drive and the requester is an administrator of the domain to which
   * the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#permissionsList.
 */
export interface PermissionsListOptions {
  /**
   * Specifies which additional view's permissions to include in the response.
   * Only 'published' is supported.
   */
  includePermissionsForView?: string;
  /**
   * The maximum number of permissions to return per page. When not set for
   * files in a shared drive, at most 100 results will be returned. When not set
   * for files that are not in a shared drive, the entire list will be returned.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if the file ID parameter refers to a
   * shared drive and the requester is an administrator of the domain to which
   * the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#permissionsUpdate.
 */
export interface PermissionsUpdateOptions {
  /**
   * Whether to remove the expiration date.
   */
  removeExpiration?: boolean;
  /**
   * Whether the requesting application supports both My Drives and shared
   * drives.
   */
  supportsAllDrives?: boolean;
  /**
   * Deprecated use supportsAllDrives instead.
   */
  supportsTeamDrives?: boolean;
  /**
   * Whether to transfer ownership to the specified user and downgrade the
   * current owner to a writer. This parameter is required as an acknowledgement
   * of the side effect. File owners can only transfer ownership of files
   * existing on My Drive. Files existing in a shared drive are owned by the
   * organization that owns that shared drive. Ownership transfers are not
   * supported for files and folders in shared drives. Organizers of a shared
   * drive can move items from that shared drive into their My Drive which
   * transfers the ownership to them.
   */
  transferOwnership?: boolean;
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if the file ID parameter refers to a
   * shared drive and the requester is an administrator of the domain to which
   * the shared drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#repliesGet.
 */
export interface RepliesGetOptions {
  /**
   * Whether to return deleted replies. Deleted replies will not include their
   * original content.
   */
  includeDeleted?: boolean;
}

/**
 * Additional options for Drive#repliesList.
 */
export interface RepliesListOptions {
  /**
   * Whether to include deleted replies. Deleted replies will not include their
   * original content.
   */
  includeDeleted?: boolean;
  /**
   * The maximum number of replies to return per page.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
}

/**
 * A reply to a comment on a file.
 */
export interface Reply {
  /**
   * The action the reply performed to the parent comment. Valid values are: -
   * resolve - reopen
   */
  action?: string;
  /**
   * The author of the reply. The author's email address and permission ID will
   * not be populated.
   */
  author?: User;
  /**
   * The plain text content of the reply. This field is used for setting the
   * content, while htmlContent should be displayed. This is required on creates
   * if no action is specified.
   */
  content?: string;
  /**
   * The time at which the reply was created (RFC 3339 date-time).
   */
  createdTime?: Date;
  /**
   * Whether the reply has been deleted. A deleted reply has no content.
   */
  deleted?: boolean;
  /**
   * The content of the reply with HTML formatting.
   */
  htmlContent?: string;
  /**
   * The ID of the reply.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#reply".
   */
  kind?: string;
  /**
   * The last time the reply was modified (RFC 3339 date-time).
   */
  modifiedTime?: Date;
}

function serializeReply(data: any): Reply {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? data["createdTime"].toISOString() : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? data["modifiedTime"].toISOString() : undefined,
  };
}

function deserializeReply(data: any): Reply {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? new Date(data["createdTime"]) : undefined,
    modifiedTime: data["modifiedTime"] !== undefined ? new Date(data["modifiedTime"]) : undefined,
  };
}

/**
 * A list of replies to a comment on a file.
 */
export interface ReplyList {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#replyList".
   */
  kind?: string;
  /**
   * The page token for the next page of replies. This will be absent if the
   * end of the replies list has been reached. If the token is rejected for any
   * reason, it should be discarded, and pagination should be restarted from the
   * first page of results.
   */
  nextPageToken?: string;
  /**
   * The list of replies. If nextPageToken is populated, then this list may be
   * incomplete and an additional page of results should be fetched.
   */
  replies?: Reply[];
}

function serializeReplyList(data: any): ReplyList {
  return {
    ...data,
    replies: data["replies"] !== undefined ? data["replies"].map((item: any) => (serializeReply(item))) : undefined,
  };
}

function deserializeReplyList(data: any): ReplyList {
  return {
    ...data,
    replies: data["replies"] !== undefined ? data["replies"].map((item: any) => (deserializeReply(item))) : undefined,
  };
}

/**
 * The metadata for a revision to a file.
 */
export interface Revision {
  /**
   * Links for exporting Docs Editors files to specific formats.
   */
  exportLinks?: {
    [key: string]: string
  };
  /**
   * The ID of the revision.
   */
  id?: string;
  /**
   * Whether to keep this revision forever, even if it is no longer the head
   * revision. If not set, the revision will be automatically purged 30 days
   * after newer content is uploaded. This can be set on a maximum of 200
   * revisions for a file. This field is only applicable to files with binary
   * content in Drive.
   */
  keepForever?: boolean;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#revision".
   */
  kind?: string;
  /**
   * The last user to modify this revision.
   */
  lastModifyingUser?: User;
  /**
   * The MD5 checksum of the revision's content. This is only applicable to
   * files with binary content in Drive.
   */
  md5Checksum?: string;
  /**
   * The MIME type of the revision.
   */
  mimeType?: string;
  /**
   * The last time the revision was modified (RFC 3339 date-time).
   */
  modifiedTime?: Date;
  /**
   * The original filename used to create this revision. This is only
   * applicable to files with binary content in Drive.
   */
  originalFilename?: string;
  /**
   * Whether subsequent revisions will be automatically republished. This is
   * only applicable to Docs Editors files.
   */
  publishAuto?: boolean;
  /**
   * Whether this revision is published. This is only applicable to Docs
   * Editors files.
   */
  published?: boolean;
  /**
   * A link to the published revision. This is only populated for Google Sites
   * files.
   */
  publishedLink?: string;
  /**
   * Whether this revision is published outside the domain. This is only
   * applicable to Docs Editors files.
   */
  publishedOutsideDomain?: boolean;
  /**
   * The size of the revision's content in bytes. This is only applicable to
   * files with binary content in Drive.
   */
  size?: bigint;
}

function serializeRevision(data: any): Revision {
  return {
    ...data,
    modifiedTime: data["modifiedTime"] !== undefined ? data["modifiedTime"].toISOString() : undefined,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
  };
}

function deserializeRevision(data: any): Revision {
  return {
    ...data,
    modifiedTime: data["modifiedTime"] !== undefined ? new Date(data["modifiedTime"]) : undefined,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
  };
}

/**
 * A list of revisions of a file.
 */
export interface RevisionList {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#revisionList".
   */
  kind?: string;
  /**
   * The page token for the next page of revisions. This will be absent if the
   * end of the revisions list has been reached. If the token is rejected for
   * any reason, it should be discarded, and pagination should be restarted from
   * the first page of results.
   */
  nextPageToken?: string;
  /**
   * The list of revisions. If nextPageToken is populated, then this list may
   * be incomplete and an additional page of results should be fetched.
   */
  revisions?: Revision[];
}

function serializeRevisionList(data: any): RevisionList {
  return {
    ...data,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (serializeRevision(item))) : undefined,
  };
}

function deserializeRevisionList(data: any): RevisionList {
  return {
    ...data,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (deserializeRevision(item))) : undefined,
  };
}

/**
 * Additional options for Drive#revisionsGet.
 */
export interface RevisionsGetOptions {
  /**
   * Whether the user is acknowledging the risk of downloading known malware or
   * other abusive files. This is only applicable when alt=media.
   */
  acknowledgeAbuse?: boolean;
}

/**
 * Additional options for Drive#revisionsList.
 */
export interface RevisionsListOptions {
  /**
   * The maximum number of revisions to return per page.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of 'nextPageToken' from the previous response.
   */
  pageToken?: string;
}

export interface StartPageToken {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#startPageToken".
   */
  kind?: string;
  /**
   * The starting page token for listing changes.
   */
  startPageToken?: string;
}

/**
 * Deprecated: use the drive collection instead.
 */
export interface TeamDrive {
  /**
   * An image file and cropping parameters from which a background image for
   * this Team Drive is set. This is a write only field; it can only be set on
   * drive.teamdrives.update requests that don't set themeId. When specified,
   * all fields of the backgroundImageFile must be set.
   */
  backgroundImageFile?: {
    id?: string;
    width?: number;
    xCoordinate?: number;
    yCoordinate?: number;
  };
  /**
   * A short-lived link to this Team Drive's background image.
   */
  backgroundImageLink?: string;
  /**
   * Capabilities the current user has on this Team Drive.
   */
  capabilities?: {
    canAddChildren?: boolean;
    canChangeCopyRequiresWriterPermissionRestriction?: boolean;
    canChangeDomainUsersOnlyRestriction?: boolean;
    canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;
    canChangeTeamDriveBackground?: boolean;
    canChangeTeamMembersOnlyRestriction?: boolean;
    canComment?: boolean;
    canCopy?: boolean;
    canDeleteChildren?: boolean;
    canDeleteTeamDrive?: boolean;
    canDownload?: boolean;
    canEdit?: boolean;
    canListChildren?: boolean;
    canManageMembers?: boolean;
    canReadRevisions?: boolean;
    canRemoveChildren?: boolean;
    canRename?: boolean;
    canRenameTeamDrive?: boolean;
    canResetTeamDriveRestrictions?: boolean;
    canShare?: boolean;
    canTrashChildren?: boolean;
  };
  /**
   * The color of this Team Drive as an RGB hex string. It can only be set on a
   * drive.teamdrives.update request that does not set themeId.
   */
  colorRgb?: string;
  /**
   * The time at which the Team Drive was created (RFC 3339 date-time).
   */
  createdTime?: Date;
  /**
   * The ID of this Team Drive which is also the ID of the top level folder of
   * this Team Drive.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#teamDrive".
   */
  kind?: string;
  /**
   * The name of this Team Drive.
   */
  name?: string;
  /**
   * The organizational unit of this shared drive. This field is only populated
   * on drives.list responses when the useDomainAdminAccess parameter is set to
   * true.
   */
  orgUnitId?: string;
  /**
   * A set of restrictions that apply to this Team Drive or items inside this
   * Team Drive.
   */
  restrictions?: {
    adminManagedRestrictions?: boolean;
    copyRequiresWriterPermission?: boolean;
    domainUsersOnly?: boolean;
    sharingFoldersRequiresOrganizerPermission?: boolean;
    teamMembersOnly?: boolean;
  };
  /**
   * The ID of the theme from which the background image and color will be set.
   * The set of possible teamDriveThemes can be retrieved from a drive.about.get
   * response. When not specified on a drive.teamdrives.create request, a random
   * theme is chosen from which the background image and color are set. This is
   * a write-only field; it can only be set on requests that don't set colorRgb
   * or backgroundImageFile.
   */
  themeId?: string;
}

function serializeTeamDrive(data: any): TeamDrive {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? data["createdTime"].toISOString() : undefined,
  };
}

function deserializeTeamDrive(data: any): TeamDrive {
  return {
    ...data,
    createdTime: data["createdTime"] !== undefined ? new Date(data["createdTime"]) : undefined,
  };
}

/**
 * A list of Team Drives.
 */
export interface TeamDriveList {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#teamDriveList".
   */
  kind?: string;
  /**
   * The page token for the next page of Team Drives. This will be absent if
   * the end of the Team Drives list has been reached. If the token is rejected
   * for any reason, it should be discarded, and pagination should be restarted
   * from the first page of results.
   */
  nextPageToken?: string;
  /**
   * The list of Team Drives. If nextPageToken is populated, then this list may
   * be incomplete and an additional page of results should be fetched.
   */
  teamDrives?: TeamDrive[];
}

function serializeTeamDriveList(data: any): TeamDriveList {
  return {
    ...data,
    teamDrives: data["teamDrives"] !== undefined ? data["teamDrives"].map((item: any) => (serializeTeamDrive(item))) : undefined,
  };
}

function deserializeTeamDriveList(data: any): TeamDriveList {
  return {
    ...data,
    teamDrives: data["teamDrives"] !== undefined ? data["teamDrives"].map((item: any) => (deserializeTeamDrive(item))) : undefined,
  };
}

/**
 * Additional options for Drive#teamdrivesCreate.
 */
export interface TeamdrivesCreateOptions {
  /**
   * An ID, such as a random UUID, which uniquely identifies this user's
   * request for idempotent creation of a Team Drive. A repeated request by the
   * same user and with the same request ID will avoid creating duplicates by
   * attempting to create the same Team Drive. If the Team Drive already exists
   * a 409 error will be returned.
   */
  requestId: string;
}

/**
 * Additional options for Drive#teamdrivesGet.
 */
export interface TeamdrivesGetOptions {
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if they are an administrator of the domain
   * to which the Team Drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#teamdrivesList.
 */
export interface TeamdrivesListOptions {
  /**
   * Maximum number of Team Drives to return.
   */
  pageSize?: number;
  /**
   * Page token for Team Drives.
   */
  pageToken?: string;
  /**
   * Query string for searching Team Drives.
   */
  q?: string;
  /**
   * Issue the request as a domain administrator; if set to true, then all Team
   * Drives of the domain in which the requester is an administrator are
   * returned.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Additional options for Drive#teamdrivesUpdate.
 */
export interface TeamdrivesUpdateOptions {
  /**
   * Issue the request as a domain administrator; if set to true, then the
   * requester will be granted access if they are an administrator of the domain
   * to which the Team Drive belongs.
   */
  useDomainAdminAccess?: boolean;
}

/**
 * Information about a Drive user.
 */
export interface User {
  /**
   * A plain text displayable name for this user.
   */
  displayName?: string;
  /**
   * The email address of the user. This may not be present in certain contexts
   * if the user has not made their email address visible to the requester.
   */
  emailAddress?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "drive#user".
   */
  kind?: string;
  /**
   * Whether this user is the requesting user.
   */
  me?: boolean;
  /**
   * The user's ID as visible in Permission resources.
   */
  permissionId?: string;
  /**
   * A link to the user's profile photo, if available.
   */
  photoLink?: string;
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
