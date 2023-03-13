// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Cloud Support API Client for Deno
 * ========================================
 * 
 * Manages Google Cloud technical support cases for Customer Care support offerings. 
 * 
 * Docs: https://cloud.google.com/support/docs/apis
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages Google Cloud technical support cases for Customer Care support
 * offerings.
 */
export class CloudSupport {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudsupport.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Create a file attachment on a case or Cloud resource. The attachment
   * object must have the following fields set: filename.
   *
   * @param parent Required. The resource name of the case (or case parent) to which the attachment should be attached.
   */
  async attachmentsCreate(parent: string, req: CreateAttachmentRequest): Promise<Attachment> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/attachments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Attachment;
  }

  /**
   * Retrieve valid classifications to be used when creating a support case.
   * The classications are hierarchical, with each classification containing all
   * levels of the hierarchy, separated by " > ". For example "Technical Issue >
   * Compute > Compute Engine".
   *
   */
  async caseClassificationsSearch(opts: CaseClassificationsSearchOptions = {}): Promise<SearchCaseClassificationsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta/caseClassifications:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchCaseClassificationsResponse;
  }

  /**
   * Retrieve all attachments associated with a support case.
   *
   * @param parent Required. The resource name of Case object for which attachments should be listed.
   */
  async casesAttachmentsList(parent: string, opts: CasesAttachmentsListOptions = {}): Promise<ListAttachmentsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/attachments`);
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
    return data as ListAttachmentsResponse;
  }

  /**
   * Close the specified case.
   *
   * @param name Required. The fully qualified name of the case resource to be closed.
   */
  async casesClose(name: string, req: CloseCaseRequest): Promise<Case> {
    const url = new URL(`${this.#baseUrl}v2beta/${ name }:close`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Case;
  }

  /**
   * Add a new comment to the specified Case. The comment object must have the
   * following fields set: body.
   *
   * @param parent Required. The resource name of Case to which this comment should be added.
   */
  async casesCommentsCreate(parent: string, req: Comment): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/comments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Comment;
  }

  /**
   * Retrieve all Comments associated with the Case object.
   *
   * @param parent Required. The resource name of Case object for which comments should be listed.
   */
  async casesCommentsList(parent: string, opts: CasesCommentsListOptions = {}): Promise<ListCommentsResponse> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/comments`);
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
    return data as ListCommentsResponse;
  }

  /**
   * Create a new case and associate it with the given Cloud resource. The case
   * object must have the following fields set: display_name, description,
   * classification, and severity.
   *
   * @param parent Required. The name of the Cloud resource under which the case should be created.
   */
  async casesCreate(parent: string, req: Case): Promise<Case> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/cases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Case;
  }

  /**
   * Escalate a case. Escalating a case will initiate the Cloud Support
   * escalation management process. This operation is only available to certain
   * Customer Care tiers. Go to https://cloud.google.com/support and look for
   * 'Technical support escalations' in the feature list to find out which tiers
   * are able to perform escalations.
   *
   * @param name Required. The fully qualified name of the Case resource to be escalated.
   */
  async casesEscalate(name: string, req: EscalateCaseRequest): Promise<Case> {
    const url = new URL(`${this.#baseUrl}v2beta/${ name }:escalate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Case;
  }

  /**
   * Retrieve the specified case.
   *
   * @param name Required. The fully qualified name of a case to be retrieved.
   */
  async casesGet(name: string): Promise<Case> {
    const url = new URL(`${this.#baseUrl}v2beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Case;
  }

  /**
   * Retrieve all cases under the specified parent. Note: Listing cases under
   * an Organization returns only the cases directly parented by that
   * organization. To retrieve all cases under an organization, including cases
   * parented by projects under that organization, use `cases.search`.
   *
   * @param parent Required. The fully qualified name of parent resource to list cases under.
   */
  async casesList(parent: string, opts: CasesListOptions = {}): Promise<ListCasesResponse> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/cases`);
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
    return data as ListCasesResponse;
  }

  /**
   * Update the specified case. Only a subset of fields can be updated.
   *
   * @param name The resource name for the case.
   */
  async casesPatch(name: string, req: Case, opts: CasesPatchOptions = {}): Promise<Case> {
    opts = serializeCasesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Case;
  }

  /**
   * Search cases using the specified query.
   *
   */
  async casesSearch(opts: CasesSearchOptions = {}): Promise<SearchCasesResponse> {
    const url = new URL(`${this.#baseUrl}v2beta/cases:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchCasesResponse;
  }

  /**
   * Download a file attachment on a case. Note: HTTP requests must append
   * "?alt=media" to the URL.
   *
   * @param name The resource name of the attachment to be downloaded.
   */
  async mediaDownload(name: string): Promise<Media> {
    const url = new URL(`${this.#baseUrl}v2beta/${ name }:download`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMedia(data);
  }

  /**
   * Create a file attachment on a case or Cloud resource. The attachment
   * object must have the following fields set: filename.
   *
   * @param parent Required. The resource name of the case (or case parent) to which the attachment should be attached.
   */
  async mediaUpload(parent: string, req: CreateAttachmentRequest): Promise<Attachment> {
    const url = new URL(`${this.#baseUrl}v2beta/${ parent }/attachments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Attachment;
  }
}

/**
 * An object containing information about the effective user and authenticated
 * principal responsible for an action.
 */
export interface Actor {
  /**
   * The name to display for the actor. If not provided, it is inferred from
   * credentials supplied during case creation. When an email is provided, a
   * display name must also be provided. This will be obfuscated if the user is
   * a Google Support agent.
   */
  displayName?: string;
  /**
   * The email address of the actor. If not provided, it is inferred from
   * credentials supplied during case creation. If the authenticated principal
   * does not have an email address, one must be provided. When a name is
   * provided, an email must also be provided. This will be obfuscated if the
   * user is a Google Support agent.
   */
  email?: string;
  /**
   * Output only. Whether the actor is a Google support actor.
   */
  readonly googleSupport?: boolean;
}

/**
 * Represents a file attached to a support case.
 */
export interface Attachment {
  /**
   * Output only. The time at which the attachment was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user who uploaded the attachment. Note, the name and
   * email will be obfuscated if the attachment was uploaded by Google support.
   */
  readonly creator?: Actor;
  /**
   * The filename of the attachment (e.g. `"graph.jpg"`).
   */
  filename?: string;
  /**
   * Output only. The MIME type of the attachment (e.g. text/plain).
   */
  readonly mimeType?: string;
  /**
   * Output only. The resource name of the attachment.
   */
  readonly name?: string;
  /**
   * Output only. The size of the attachment in bytes.
   */
  readonly sizeBytes?: bigint;
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface Blobstore2Info {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobGeneration?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobId?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  downloadReadHandle?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  readToken?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  uploadMetadataContainer?: Uint8Array;
}

function serializeBlobstore2Info(data: any): Blobstore2Info {
  return {
    ...data,
    blobGeneration: data["blobGeneration"] !== undefined ? String(data["blobGeneration"]) : undefined,
    downloadReadHandle: data["downloadReadHandle"] !== undefined ? encodeBase64(data["downloadReadHandle"]) : undefined,
    uploadMetadataContainer: data["uploadMetadataContainer"] !== undefined ? encodeBase64(data["uploadMetadataContainer"]) : undefined,
  };
}

function deserializeBlobstore2Info(data: any): Blobstore2Info {
  return {
    ...data,
    blobGeneration: data["blobGeneration"] !== undefined ? BigInt(data["blobGeneration"]) : undefined,
    downloadReadHandle: data["downloadReadHandle"] !== undefined ? decodeBase64(data["downloadReadHandle"] as string) : undefined,
    uploadMetadataContainer: data["uploadMetadataContainer"] !== undefined ? decodeBase64(data["uploadMetadataContainer"] as string) : undefined,
  };
}

/**
 * A support case.
 */
export interface Case {
  /**
   * The issue classification applicable to this case.
   */
  classification?: CaseClassification;
  /**
   * Output only. The time this case was created.
   */
  readonly createTime?: Date;
  /**
   * The user who created the case. Note: The name and email will be obfuscated
   * if the case was created by Google Support.
   */
  creator?: Actor;
  /**
   * A broad description of the issue.
   */
  description?: string;
  /**
   * The short summary of the issue reported in this case.
   */
  displayName?: string;
  /**
   * Whether the case is currently escalated.
   */
  escalated?: boolean;
  /**
   * The language the user has requested to receive support in. This should be
   * a BCP 47 language code (e.g., `"en"`, `"zh-CN"`, `"zh-TW"`, `"ja"`,
   * `"ko"`). If no language or an unsupported language is specified, this field
   * defaults to English (en). Language selection during case creation may
   * affect your available support options. For a list of supported languages
   * and their support working hours, see:
   * https://cloud.google.com/support/docs/language-working-hours
   */
  languageCode?: string;
  /**
   * The resource name for the case.
   */
  name?: string;
  /**
   * The priority of this case. If this is set, do not set severity.
   */
  priority?:  | "PRIORITY_UNSPECIFIED" | "P0" | "P1" | "P2" | "P3" | "P4";
  /**
   * The severity of this case. Deprecated. Use priority instead.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "S0" | "S1" | "S2" | "S3" | "S4";
  /**
   * Output only. The current status of the support case.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "NEW" | "IN_PROGRESS_GOOGLE_SUPPORT" | "ACTION_REQUIRED" | "SOLUTION_PROVIDED" | "CLOSED";
  /**
   * The email addresses to receive updates on this case.
   */
  subscriberEmailAddresses?: string[];
  /**
   * Whether this case was created for internal API testing and should not be
   * acted on by the support team.
   */
  testCase?: boolean;
  /**
   * The timezone of the user who created the support case. It should be in a
   * format IANA recognizes: https://www.iana.org/time-zones. There is no
   * additional validation done by the API.
   */
  timeZone?: string;
  /**
   * Output only. The time this case was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * A classification object with a product type and value.
 */
export interface CaseClassification {
  /**
   * The display name of the classification.
   */
  displayName?: string;
  /**
   * The unique ID for a classification. Must be specified for case creation.
   * To retrieve valid classification IDs for case creation, use
   * `caseClassifications.search`.
   */
  id?: string;
}

/**
 * Additional options for CloudSupport#caseClassificationsSearch.
 */
export interface CaseClassificationsSearchOptions {
  /**
   * The maximum number of cases fetched with each request.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return. If unspecified, the
   * first page is retrieved.
   */
  pageToken?: string;
  /**
   * An expression written in the Cloud filter language. If non-empty, then
   * only cases whose fields match the filter are returned. If empty, then no
   * messages are filtered out.
   */
  query?: string;
}

/**
 * Additional options for CloudSupport#casesAttachmentsList.
 */
export interface CasesAttachmentsListOptions {
  /**
   * The maximum number of attachments fetched with each request. If not
   * provided, the default is 10. The maximum page size that will be returned is
   * 100.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return. If unspecified, the
   * first page is retrieved.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudSupport#casesCommentsList.
 */
export interface CasesCommentsListOptions {
  /**
   * The maximum number of comments fetched with each request. Defaults to 10.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return. If unspecified, the
   * first page is retrieved.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudSupport#casesList.
 */
export interface CasesListOptions {
  /**
   * An expression written in filter language. If non-empty, the query returns
   * the cases that match the filter. Else, the query doesn't filter the cases.
   * Filter expressions use the following fields with the operators equals (`=`)
   * and `AND`: - `state`: The accepted values are `OPEN` or `CLOSED`. -
   * `priority`: The accepted values are `P0`, `P1`, `P2`, `P3`, or `P4`. You
   * can specify multiple values for priority using the `OR` operator. For
   * example, `priority=P1 OR priority=P2`. - [DEPRECATED] `severity`: The
   * accepted values are `S0`, `S1`, `S2`, `S3`, or `S4`. - `creator.email`: The
   * email address of the case creator. Examples: - `state=CLOSED` - `state=OPEN
   * AND creator.email="tester@example.com"` - `state=OPEN AND (priority=P0 OR
   * priority=P1)`
   */
  filter?: string;
  /**
   * The maximum number of cases fetched with each request. Defaults to 10.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return. If unspecified, the
   * first page is retrieved.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudSupport#casesPatch.
 */
export interface CasesPatchOptions {
  /**
   * A list of attributes of the case object that should be updated as part of
   * this request. Supported values are severity, display_name, and
   * subscriber_email_addresses. If no fields are specified, all supported
   * fields are updated. WARNING: If you do not provide a field mask, then you
   * may accidentally clear some fields. For example, if you leave field mask
   * empty and do not provide a value for subscriber_email_addresses, then
   * subscriber_email_addresses is updated to empty.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCasesPatchOptions(data: any): CasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCasesPatchOptions(data: any): CasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudSupport#casesSearch.
 */
export interface CasesSearchOptions {
  /**
   * The maximum number of cases fetched with each request. The default page
   * size is 10.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return. If unspecified, the
   * first page is retrieved.
   */
  pageToken?: string;
  /**
   * An expression written in filter language. A query uses the following
   * fields with the operators equals (`=`) and `AND`: - `organization`: An
   * organization name in the form `organizations/`. - `project`: A project name
   * in the form `projects/`. - `state`: The accepted values are `OPEN` or
   * `CLOSED`. - `priority`: The accepted values are `P0`, `P1`, `P2`, `P3`, or
   * `P4`. You can specify multiple values for priority using the `OR` operator.
   * For example, `priority=P1 OR priority=P2`. - [DEPRECATED] `severity`: The
   * accepted values are `S0`, `S1`, `S2`, `S3`, or `S4`. - `creator.email`: The
   * email address of the case creator. - `billingAccount`: A billing account in
   * the form `billingAccounts/` You must specify eitehr `organization` or
   * `project`. To search across `displayName`, `description`, and comments, use
   * a global restriction with no keyword or operator. For example, `"my
   * search"`. To search only cases updated after a certain date, use
   * `update_time` retricted with that particular date, time, and timezone in
   * ISO datetime format. For example,
   * `update_time>"2020-01-01T00:00:00-05:00"`. `update_time` only supports the
   * greater than operator (`>`). Examples: -
   * `organization="organizations/123456789"` -
   * `project="projects/my-project-id"` - `project="projects/123456789"` -
   * `billing_account="billingAccounts/123456-A0B0C0-CUZ789"` -
   * `organization="organizations/123456789" AND state=CLOSED` -
   * `project="projects/my-project-id" AND creator.email="tester@example.com"` -
   * `project="projects/my-project-id" AND (priority=P0 OR priority=P1)`
   */
  query?: string;
}

/**
 * The request message for the CloseCase endpoint.
 */
export interface CloseCaseRequest {
}

/**
 * A comment associated with a support case.
 */
export interface Comment {
  /**
   * The full comment body. Maximum of 120000 characters. This can contain rich
   * text syntax.
   */
  body?: string;
  /**
   * Output only. The time when this comment was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The user or Google Support agent created this comment.
   */
  readonly creator?: Actor;
  /**
   * Output only. The resource name for the comment.
   */
  readonly name?: string;
  /**
   * Output only. An automatically generated plain text version of body with
   * all rich text syntax stripped.
   */
  readonly plainTextBody?: string;
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface CompositeMedia {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobRef?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobstore2Info?: Blobstore2Info;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  cosmoBinaryReference?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  crc32cHash?: number;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  inline?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  length?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  md5Hash?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectId?: ObjectId;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  path?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  referenceType?:  | "PATH" | "BLOB_REF" | "INLINE" | "BIGSTORE_REF" | "COSMO_BINARY_REFERENCE";
  /**
   * # gdata.* are outside protos with mising documentation
   */
  sha1Hash?: Uint8Array;
}

function serializeCompositeMedia(data: any): CompositeMedia {
  return {
    ...data,
    blobRef: data["blobRef"] !== undefined ? encodeBase64(data["blobRef"]) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? serializeBlobstore2Info(data["blobstore2Info"]) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? encodeBase64(data["cosmoBinaryReference"]) : undefined,
    inline: data["inline"] !== undefined ? encodeBase64(data["inline"]) : undefined,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? encodeBase64(data["md5Hash"]) : undefined,
    objectId: data["objectId"] !== undefined ? serializeObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? encodeBase64(data["sha1Hash"]) : undefined,
  };
}

function deserializeCompositeMedia(data: any): CompositeMedia {
  return {
    ...data,
    blobRef: data["blobRef"] !== undefined ? decodeBase64(data["blobRef"] as string) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? deserializeBlobstore2Info(data["blobstore2Info"]) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? decodeBase64(data["cosmoBinaryReference"] as string) : undefined,
    inline: data["inline"] !== undefined ? decodeBase64(data["inline"] as string) : undefined,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? decodeBase64(data["md5Hash"] as string) : undefined,
    objectId: data["objectId"] !== undefined ? deserializeObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? decodeBase64(data["sha1Hash"] as string) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface ContentTypeInfo {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  bestGuess?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  fromBytes?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  fromFileName?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  fromHeader?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  fromUrlPath?: string;
}

/**
 * The request message for the CreateAttachment endpoint.
 */
export interface CreateAttachmentRequest {
  /**
   * Required. The attachment to be created.
   */
  attachment?: Attachment;
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DiffChecksumsResponse {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  checksumsLocation?: CompositeMedia;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  chunkSizeBytes?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectLocation?: CompositeMedia;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectSizeBytes?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectVersion?: string;
}

function serializeDiffChecksumsResponse(data: any): DiffChecksumsResponse {
  return {
    ...data,
    checksumsLocation: data["checksumsLocation"] !== undefined ? serializeCompositeMedia(data["checksumsLocation"]) : undefined,
    chunkSizeBytes: data["chunkSizeBytes"] !== undefined ? String(data["chunkSizeBytes"]) : undefined,
    objectLocation: data["objectLocation"] !== undefined ? serializeCompositeMedia(data["objectLocation"]) : undefined,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? String(data["objectSizeBytes"]) : undefined,
  };
}

function deserializeDiffChecksumsResponse(data: any): DiffChecksumsResponse {
  return {
    ...data,
    checksumsLocation: data["checksumsLocation"] !== undefined ? deserializeCompositeMedia(data["checksumsLocation"]) : undefined,
    chunkSizeBytes: data["chunkSizeBytes"] !== undefined ? BigInt(data["chunkSizeBytes"]) : undefined,
    objectLocation: data["objectLocation"] !== undefined ? deserializeCompositeMedia(data["objectLocation"]) : undefined,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? BigInt(data["objectSizeBytes"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DiffDownloadResponse {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectLocation?: CompositeMedia;
}

function serializeDiffDownloadResponse(data: any): DiffDownloadResponse {
  return {
    ...data,
    objectLocation: data["objectLocation"] !== undefined ? serializeCompositeMedia(data["objectLocation"]) : undefined,
  };
}

function deserializeDiffDownloadResponse(data: any): DiffDownloadResponse {
  return {
    ...data,
    objectLocation: data["objectLocation"] !== undefined ? deserializeCompositeMedia(data["objectLocation"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DiffUploadRequest {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  checksumsInfo?: CompositeMedia;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectInfo?: CompositeMedia;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectVersion?: string;
}

function serializeDiffUploadRequest(data: any): DiffUploadRequest {
  return {
    ...data,
    checksumsInfo: data["checksumsInfo"] !== undefined ? serializeCompositeMedia(data["checksumsInfo"]) : undefined,
    objectInfo: data["objectInfo"] !== undefined ? serializeCompositeMedia(data["objectInfo"]) : undefined,
  };
}

function deserializeDiffUploadRequest(data: any): DiffUploadRequest {
  return {
    ...data,
    checksumsInfo: data["checksumsInfo"] !== undefined ? deserializeCompositeMedia(data["checksumsInfo"]) : undefined,
    objectInfo: data["objectInfo"] !== undefined ? deserializeCompositeMedia(data["objectInfo"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DiffUploadResponse {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectVersion?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  originalObject?: CompositeMedia;
}

function serializeDiffUploadResponse(data: any): DiffUploadResponse {
  return {
    ...data,
    originalObject: data["originalObject"] !== undefined ? serializeCompositeMedia(data["originalObject"]) : undefined,
  };
}

function deserializeDiffUploadResponse(data: any): DiffUploadResponse {
  return {
    ...data,
    originalObject: data["originalObject"] !== undefined ? deserializeCompositeMedia(data["originalObject"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DiffVersionResponse {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectSizeBytes?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectVersion?: string;
}

function serializeDiffVersionResponse(data: any): DiffVersionResponse {
  return {
    ...data,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? String(data["objectSizeBytes"]) : undefined,
  };
}

function deserializeDiffVersionResponse(data: any): DiffVersionResponse {
  return {
    ...data,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? BigInt(data["objectSizeBytes"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface DownloadParameters {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  allowGzipCompression?: boolean;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  ignoreRange?: boolean;
}

/**
 * The request message for the EscalateCase endpoint.
 */
export interface EscalateCaseRequest {
  /**
   * The escalation object to be sent with the escalation request.
   */
  escalation?: Escalation;
}

/**
 * An escalation of a support case.
 */
export interface Escalation {
  /**
   * Required. A free text description to accompany the `reason` field above.
   * Provides additional context on why the case is being escalated.
   */
  justification?: string;
  /**
   * Required. The reason why the Case is being escalated.
   */
  reason?:  | "REASON_UNSPECIFIED" | "RESOLUTION_TIME" | "TECHNICAL_EXPERTISE" | "BUSINESS_IMPACT";
}

/**
 * The response message for the ListAttachments endpoint.
 */
export interface ListAttachmentsResponse {
  /**
   * The list of attachments associated with the given case.
   */
  attachments?: Attachment[];
  /**
   * A token to retrieve the next page of results. This should be set in the
   * `page_token` field of subsequent `cases.attachments.list` requests. If
   * unspecified, there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * The response message for the ListCases endpoint.
 */
export interface ListCasesResponse {
  /**
   * The list of cases associated with the cloud resource, after any filters
   * have been applied.
   */
  cases?: Case[];
  /**
   * A token to retrieve the next page of results. This should be set in the
   * `page_token` field of subsequent `ListCasesRequest` message that is issued.
   * If unspecified, there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * The response message for the ListComments endpoint.
 */
export interface ListCommentsResponse {
  /**
   * The list of Comments associated with the given Case.
   */
  comments?: Comment[];
  /**
   * A token to retrieve the next page of results. This should be set in the
   * `page_token` field of subsequent `ListCommentsRequest` message that is
   * issued. If unspecified, there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface Media {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  algorithm?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  bigstoreObjectRef?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobRef?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  blobstore2Info?: Blobstore2Info;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  compositeMedia?: CompositeMedia[];
  /**
   * # gdata.* are outside protos with mising documentation
   */
  contentType?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  contentTypeInfo?: ContentTypeInfo;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  cosmoBinaryReference?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  crc32cHash?: number;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  diffChecksumsResponse?: DiffChecksumsResponse;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  diffDownloadResponse?: DiffDownloadResponse;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  diffUploadRequest?: DiffUploadRequest;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  diffUploadResponse?: DiffUploadResponse;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  diffVersionResponse?: DiffVersionResponse;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  downloadParameters?: DownloadParameters;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  filename?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  hash?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  hashVerified?: boolean;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  inline?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  isPotentialRetry?: boolean;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  length?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  md5Hash?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  mediaId?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectId?: ObjectId;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  path?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  referenceType?:  | "PATH" | "BLOB_REF" | "INLINE" | "GET_MEDIA" | "COMPOSITE_MEDIA" | "BIGSTORE_REF" | "DIFF_VERSION_RESPONSE" | "DIFF_CHECKSUMS_RESPONSE" | "DIFF_DOWNLOAD_RESPONSE" | "DIFF_UPLOAD_REQUEST" | "DIFF_UPLOAD_RESPONSE" | "COSMO_BINARY_REFERENCE" | "ARBITRARY_BYTES";
  /**
   * # gdata.* are outside protos with mising documentation
   */
  sha1Hash?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  sha256Hash?: Uint8Array;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  timestamp?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  token?: string;
}

function serializeMedia(data: any): Media {
  return {
    ...data,
    bigstoreObjectRef: data["bigstoreObjectRef"] !== undefined ? encodeBase64(data["bigstoreObjectRef"]) : undefined,
    blobRef: data["blobRef"] !== undefined ? encodeBase64(data["blobRef"]) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? serializeBlobstore2Info(data["blobstore2Info"]) : undefined,
    compositeMedia: data["compositeMedia"] !== undefined ? data["compositeMedia"].map((item: any) => (serializeCompositeMedia(item))) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? encodeBase64(data["cosmoBinaryReference"]) : undefined,
    diffChecksumsResponse: data["diffChecksumsResponse"] !== undefined ? serializeDiffChecksumsResponse(data["diffChecksumsResponse"]) : undefined,
    diffDownloadResponse: data["diffDownloadResponse"] !== undefined ? serializeDiffDownloadResponse(data["diffDownloadResponse"]) : undefined,
    diffUploadRequest: data["diffUploadRequest"] !== undefined ? serializeDiffUploadRequest(data["diffUploadRequest"]) : undefined,
    diffUploadResponse: data["diffUploadResponse"] !== undefined ? serializeDiffUploadResponse(data["diffUploadResponse"]) : undefined,
    diffVersionResponse: data["diffVersionResponse"] !== undefined ? serializeDiffVersionResponse(data["diffVersionResponse"]) : undefined,
    inline: data["inline"] !== undefined ? encodeBase64(data["inline"]) : undefined,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? encodeBase64(data["md5Hash"]) : undefined,
    mediaId: data["mediaId"] !== undefined ? encodeBase64(data["mediaId"]) : undefined,
    objectId: data["objectId"] !== undefined ? serializeObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? encodeBase64(data["sha1Hash"]) : undefined,
    sha256Hash: data["sha256Hash"] !== undefined ? encodeBase64(data["sha256Hash"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? String(data["timestamp"]) : undefined,
  };
}

function deserializeMedia(data: any): Media {
  return {
    ...data,
    bigstoreObjectRef: data["bigstoreObjectRef"] !== undefined ? decodeBase64(data["bigstoreObjectRef"] as string) : undefined,
    blobRef: data["blobRef"] !== undefined ? decodeBase64(data["blobRef"] as string) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? deserializeBlobstore2Info(data["blobstore2Info"]) : undefined,
    compositeMedia: data["compositeMedia"] !== undefined ? data["compositeMedia"].map((item: any) => (deserializeCompositeMedia(item))) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? decodeBase64(data["cosmoBinaryReference"] as string) : undefined,
    diffChecksumsResponse: data["diffChecksumsResponse"] !== undefined ? deserializeDiffChecksumsResponse(data["diffChecksumsResponse"]) : undefined,
    diffDownloadResponse: data["diffDownloadResponse"] !== undefined ? deserializeDiffDownloadResponse(data["diffDownloadResponse"]) : undefined,
    diffUploadRequest: data["diffUploadRequest"] !== undefined ? deserializeDiffUploadRequest(data["diffUploadRequest"]) : undefined,
    diffUploadResponse: data["diffUploadResponse"] !== undefined ? deserializeDiffUploadResponse(data["diffUploadResponse"]) : undefined,
    diffVersionResponse: data["diffVersionResponse"] !== undefined ? deserializeDiffVersionResponse(data["diffVersionResponse"]) : undefined,
    inline: data["inline"] !== undefined ? decodeBase64(data["inline"] as string) : undefined,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? decodeBase64(data["md5Hash"] as string) : undefined,
    mediaId: data["mediaId"] !== undefined ? decodeBase64(data["mediaId"] as string) : undefined,
    objectId: data["objectId"] !== undefined ? deserializeObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? decodeBase64(data["sha1Hash"] as string) : undefined,
    sha256Hash: data["sha256Hash"] !== undefined ? decodeBase64(data["sha256Hash"] as string) : undefined,
    timestamp: data["timestamp"] !== undefined ? BigInt(data["timestamp"]) : undefined,
  };
}

/**
 * # gdata.* are outside protos with mising documentation
 */
export interface ObjectId {
  /**
   * # gdata.* are outside protos with mising documentation
   */
  bucketName?: string;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  generation?: bigint;
  /**
   * # gdata.* are outside protos with mising documentation
   */
  objectName?: string;
}

function serializeObjectId(data: any): ObjectId {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectId(data: any): ObjectId {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * The response message for SearchCaseClassifications endpoint.
 */
export interface SearchCaseClassificationsResponse {
  /**
   * The classifications retrieved.
   */
  caseClassifications?: CaseClassification[];
  /**
   * A token to retrieve the next page of results. This should be set in the
   * `page_token` field of subsequent `SearchCaseClassificationsRequest` message
   * that is issued. If unspecified, there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * The response message for the SearchCases endpoint.
 */
export interface SearchCasesResponse {
  /**
   * The list of Case associated with the cloud resource, after any filters
   * have been applied.
   */
  cases?: Case[];
  /**
   * A token to retrieve the next page of results. This should be set in the
   * `page_token` field of subsequent `SearchCaseRequest` message that is
   * issued. If unspecified, there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * Metadata about the operation. Used to lookup the current status.
 */
export interface WorkflowOperationMetadata {
  /**
   * The namespace that the job was scheduled in. Must be included in the
   * workflow metadata so the workflow status can be retrieved.
   */
  namespace?: string;
  /**
   * The type of action the operation is classified as.
   */
  operationAction?:  | "OPERATION_ACTION_UNSPECIFIED" | "CREATE_SUPPORT_ACCOUNT" | "UPDATE_SUPPORT_ACCOUNT" | "PURCHASE_SUPPORT_ACCOUNT";
  /**
   * Which version of the workflow service this operation came from.
   */
  workflowOperationType?:  | "UNKNOWN_OPERATION_TYPE" | "WORKFLOWS_V1" | "WORKFLOWS_V2";
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
