// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Keep API Client for Deno
 * ===============================
 * 
 * The Google Keep API is used in an enterprise environment to manage Google Keep content and resolve issues identified by cloud security software.
 * 
 * Docs: https://developers.google.com/keep/api
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Keep API is used in an enterprise environment to manage Google
 * Keep content and resolve issues identified by cloud security software.
 */
export class Keep {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://keep.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets an attachment. To download attachment media via REST requires the
   * alt=media query parameter. Returns a 400 bad request error if attachment
   * media is not available in the requested MIME type.
   *
   * @param name Required. The name of the attachment.
   */
  async mediaDownload(name: string, opts: MediaDownloadOptions = {}): Promise<Attachment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.mimeType !== undefined) {
      url.searchParams.append("mimeType", String(opts.mimeType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Attachment;
  }

  /**
   * Creates a new note.
   *
   */
  async notesCreate(req: Note): Promise<Note> {
    const url = new URL(`${this.#baseUrl}v1/notes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Note;
  }

  /**
   * Deletes a note. Caller must have the `OWNER` role on the note to delete.
   * Deleting a note removes the resource immediately and cannot be undone. Any
   * collaborators will lose access to the note.
   *
   * @param name Required. Name of the note to delete.
   */
  async notesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a note.
   *
   * @param name Required. Name of the resource.
   */
  async notesGet(name: string): Promise<Note> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Note;
  }

  /**
   * Lists notes. Every list call returns a page of results with `page_size` as
   * the upper bound of returned items. A `page_size` of zero allows the server
   * to choose the upper bound. The ListNotesResponse contains at most
   * `page_size` entries. If there are more things left to list, it provides a
   * `next_page_token` value. (Page tokens are opaque values.) To get the next
   * page of results, copy the result's `next_page_token` into the next
   * request's `page_token`. Repeat until the `next_page_token` returned with a
   * page of results is empty. ListNotes return consistent results in the face
   * of concurrent changes, or signals that it cannot with an ABORTED error.
   *
   */
  async notesList(opts: NotesListOptions = {}): Promise<ListNotesResponse> {
    const url = new URL(`${this.#baseUrl}v1/notes`);
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
    return data as ListNotesResponse;
  }

  /**
   * Creates one or more permissions on the note. Only permissions with the
   * `WRITER` role may be created. If adding any permission fails, then the
   * entire request fails and no changes are made.
   *
   * @param parent The parent resource shared by all Permissions being created. Format: `notes/{note}` If this is set, the parent field in the CreatePermission messages must either be empty or match this field.
   */
  async notesPermissionsBatchCreate(parent: string, req: BatchCreatePermissionsRequest): Promise<BatchCreatePermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/permissions:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchCreatePermissionsResponse;
  }

  /**
   * Deletes one or more permissions on the note. The specified entities will
   * immediately lose access. A permission with the `OWNER` role can't be
   * removed. If removing a permission fails, then the entire request fails and
   * no changes are made. Returns a 400 bad request error if a specified
   * permission does not exist on the note.
   *
   * @param parent The parent resource shared by all permissions being deleted. Format: `notes/{note}` If this is set, the parent of all of the permissions specified in the DeletePermissionRequest messages must match this field.
   */
  async notesPermissionsBatchDelete(parent: string, req: BatchDeletePermissionsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/permissions:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }
}

/**
 * An attachment to a note.
 */
export interface Attachment {
  /**
   * The MIME types (IANA media types) in which the attachment is available.
   */
  mimeType?: string[];
  /**
   * The resource name;
   */
  name?: string;
}

/**
 * The request to add one or more permissions on the note. Currently, only the
 * `WRITER` role may be specified. If adding a permission fails, then the entire
 * request fails and no changes are made.
 */
export interface BatchCreatePermissionsRequest {
  /**
   * The request message specifying the resources to create.
   */
  requests?: CreatePermissionRequest[];
}

/**
 * The response for creating permissions on a note.
 */
export interface BatchCreatePermissionsResponse {
  /**
   * Permissions created.
   */
  permissions?: Permission[];
}

/**
 * The request to remove one or more permissions from a note. A permission with
 * the `OWNER` role can't be removed. If removing a permission fails, then the
 * entire request fails and no changes are made. Returns a 400 bad request error
 * if a specified permission does not exist on the note.
 */
export interface BatchDeletePermissionsRequest {
  /**
   * Required. The names of the permissions to delete. Format:
   * `notes/{note}/permissions/{permission}`
   */
  names?: string[];
}

/**
 * The request to add a single permission on the note.
 */
export interface CreatePermissionRequest {
  /**
   * Required. The parent note where this permission will be created. Format:
   * `notes/{note}`
   */
  parent?: string;
  /**
   * Required. The permission to create. One of Permission.email, User.email or
   * Group.email must be supplied.
   */
  permission?: Permission;
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
 * Describes a single Google Family.
 */
export interface Family {
}

/**
 * Describes a single Group.
 */
export interface Group {
  /**
   * The group email.
   */
  email?: string;
}

/**
 * The list of items for a single list note.
 */
export interface ListContent {
  /**
   * The items in the list. The number of items must be less than 1,000.
   */
  listItems?: ListItem[];
}

/**
 * A single list item in a note's list.
 */
export interface ListItem {
  /**
   * Whether this item has been checked off or not.
   */
  checked?: boolean;
  /**
   * If set, list of list items nested under this list item. Only one level of
   * nesting is allowed.
   */
  childListItems?: ListItem[];
  /**
   * The text of this item. Length must be less than 1,000 characters.
   */
  text?: TextContent;
}

/**
 * The response when listing a page of notes.
 */
export interface ListNotesResponse {
  /**
   * Next page's `page_token` field.
   */
  nextPageToken?: string;
  /**
   * A page of notes.
   */
  notes?: Note[];
}

/**
 * Additional options for Keep#mediaDownload.
 */
export interface MediaDownloadOptions {
  /**
   * The IANA MIME type format requested. The requested MIME type must be one
   * specified in the attachment.mime_type. Required when downloading attachment
   * media and ignored otherwise.
   */
  mimeType?: string;
}

/**
 * A single note.
 */
export interface Note {
  /**
   * Output only. The attachments attached to this note.
   */
  readonly attachments?: Attachment[];
  /**
   * The body of the note.
   */
  body?: Section;
  /**
   * Output only. When this note was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The resource name of this note. See general note on
   * identifiers in KeepService.
   */
  readonly name?: string;
  /**
   * Output only. The list of permissions set on the note. Contains at least
   * one entry for the note owner.
   */
  readonly permissions?: Permission[];
  /**
   * The title of the note. Length must be less than 1,000 characters.
   */
  title?: string;
  /**
   * Output only. `true` if this note has been trashed. If trashed, the note is
   * eventually deleted.
   */
  readonly trashed?: boolean;
  /**
   * Output only. When this note was trashed. If `trashed`, the note is
   * eventually deleted. If the note is not trashed, this field is not set (and
   * the trashed field is `false`).
   */
  readonly trashTime?: Date;
  /**
   * Output only. When this note was last modified.
   */
  readonly updateTime?: Date;
}

/**
 * Additional options for Keep#notesList.
 */
export interface NotesListOptions {
  /**
   * Filter for list results. If no filter is supplied, the `trashed` filter is
   * applied by default. Valid fields to filter by are: `create_time`,
   * `update_time`, `trash_time`, and `trashed`. Filter syntax follows the
   * [Google AIP filtering spec](https://aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return.
   */
  pageSize?: number;
  /**
   * The previous page's `next_page_token` field.
   */
  pageToken?: string;
}

/**
 * A single permission on the note. Associates a `member` with a `role`.
 */
export interface Permission {
  /**
   * Output only. Whether this member has been deleted. If the member is
   * recovered, this value is set to false and the recovered member retains the
   * role on the note.
   */
  readonly deleted?: boolean;
  /**
   * The email associated with the member. If set on create, the `email` field
   * in the `User` or `Group` message must either be empty or match this field.
   * On read, may be unset if the member does not have an associated email.
   */
  email?: string;
  /**
   * Output only. The Google Family to which this role applies.
   */
  readonly family?: Family;
  /**
   * Output only. The group to which this role applies.
   */
  readonly group?: Group;
  /**
   * Output only. The resource name.
   */
  readonly name?: string;
  /**
   * The role granted by this permission. The role determines the entity’s
   * ability to read, write, and share notes.
   */
  role?:  | "ROLE_UNSPECIFIED" | "OWNER" | "WRITER";
  /**
   * Output only. The user to whom this role applies.
   */
  readonly user?: User;
}

/**
 * The content of the note.
 */
export interface Section {
  /**
   * Used if this section's content is a list.
   */
  list?: ListContent;
  /**
   * Used if this section's content is a block of text. The length of the text
   * content must be less than 20,000 characters.
   */
  text?: TextContent;
}

/**
 * The block of text for a single text section or list item.
 */
export interface TextContent {
  /**
   * The text of the note. The limits on this vary with the specific field
   * using this type.
   */
  text?: string;
}

/**
 * Describes a single user.
 */
export interface User {
  /**
   * The user's email.
   */
  email?: string;
}