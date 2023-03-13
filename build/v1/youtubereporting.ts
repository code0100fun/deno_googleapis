// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * YouTube Reporting API Client for Deno
 * =====================================
 * 
 * Schedules reporting jobs containing your YouTube Analytics data and downloads the resulting bulk data reports in the form of CSV files.
 * 
 * Docs: https://developers.google.com/youtube/reporting/v1/reports/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Schedules reporting jobs containing your YouTube Analytics data and
 * downloads the resulting bulk data reports in the form of CSV files.
 */
export class YouTubeReporting {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://youtubereporting.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a job and returns it.
   *
   */
  async jobsCreate(req: Job, opts: JobsCreateOptions = {}): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1/jobs`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Deletes a job.
   *
   * @param jobId The ID of the job to delete.
   */
  async jobsDelete(jobId: string, opts: JobsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/jobs/${ jobId }`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a job.
   *
   * @param jobId The ID of the job to retrieve.
   */
  async jobsGet(jobId: string, opts: JobsGetOptions = {}): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/jobs/${ jobId }`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * Lists jobs.
   *
   */
  async jobsList(opts: JobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/jobs`);
    if (opts.includeSystemManaged !== undefined) {
      url.searchParams.append("includeSystemManaged", String(opts.includeSystemManaged));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Gets the metadata of a specific report.
   *
   * @param jobId The ID of the job.
   * @param reportId The ID of the report to retrieve.
   */
  async jobsReportsGet(jobId: string, reportId: string, opts: JobsReportsGetOptions = {}): Promise<Report> {
    const url = new URL(`${this.#baseUrl}v1/jobs/${ jobId }/reports/${ reportId }`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReport(data);
  }

  /**
   * Lists reports created by a specific job. Returns NOT_FOUND if the job does
   * not exist.
   *
   * @param jobId The ID of the job.
   */
  async jobsReportsList(jobId: string, opts: JobsReportsListOptions = {}): Promise<ListReportsResponse> {
    opts = serializeJobsReportsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/jobs/${ jobId }/reports`);
    if (opts.createdAfter !== undefined) {
      url.searchParams.append("createdAfter", String(opts.createdAfter));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTimeAtOrAfter !== undefined) {
      url.searchParams.append("startTimeAtOrAfter", String(opts.startTimeAtOrAfter));
    }
    if (opts.startTimeBefore !== undefined) {
      url.searchParams.append("startTimeBefore", String(opts.startTimeBefore));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListReportsResponse(data);
  }

  /**
   * Method for media download. Download is supported on the URI
   * `/v1/media/{+name}?alt=media`.
   *
   * @param resourceName Name of the media that is being downloaded.
   */
  async mediaDownload(resourceName: string): Promise<GdataMedia> {
    const url = new URL(`${this.#baseUrl}v1/media/${ resourceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGdataMedia(data);
  }

  /**
   * Lists report types.
   *
   */
  async reportTypesList(opts: ReportTypesListOptions = {}): Promise<ListReportTypesResponse> {
    const url = new URL(`${this.#baseUrl}v1/reportTypes`);
    if (opts.includeSystemManaged !== undefined) {
      url.searchParams.append("includeSystemManaged", String(opts.includeSystemManaged));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
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
    return deserializeListReportTypesResponse(data);
  }
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
 * gdata
 */
export interface GdataBlobstore2Info {
  /**
   * gdata
   */
  blobGeneration?: bigint;
  /**
   * gdata
   */
  blobId?: string;
  /**
   * gdata
   */
  downloadReadHandle?: Uint8Array;
  /**
   * gdata
   */
  readToken?: string;
  /**
   * gdata
   */
  uploadMetadataContainer?: Uint8Array;
}

function serializeGdataBlobstore2Info(data: any): GdataBlobstore2Info {
  return {
    ...data,
    blobGeneration: data["blobGeneration"] !== undefined ? String(data["blobGeneration"]) : undefined,
    downloadReadHandle: data["downloadReadHandle"] !== undefined ? encodeBase64(data["downloadReadHandle"]) : undefined,
    uploadMetadataContainer: data["uploadMetadataContainer"] !== undefined ? encodeBase64(data["uploadMetadataContainer"]) : undefined,
  };
}

function deserializeGdataBlobstore2Info(data: any): GdataBlobstore2Info {
  return {
    ...data,
    blobGeneration: data["blobGeneration"] !== undefined ? BigInt(data["blobGeneration"]) : undefined,
    downloadReadHandle: data["downloadReadHandle"] !== undefined ? decodeBase64(data["downloadReadHandle"] as string) : undefined,
    uploadMetadataContainer: data["uploadMetadataContainer"] !== undefined ? decodeBase64(data["uploadMetadataContainer"] as string) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataCompositeMedia {
  /**
   * gdata
   */
  blobRef?: Uint8Array;
  /**
   * gdata
   */
  blobstore2Info?: GdataBlobstore2Info;
  /**
   * gdata
   */
  cosmoBinaryReference?: Uint8Array;
  /**
   * gdata
   */
  crc32cHash?: number;
  /**
   * gdata
   */
  inline?: Uint8Array;
  /**
   * gdata
   */
  length?: bigint;
  /**
   * gdata
   */
  md5Hash?: Uint8Array;
  /**
   * gdata
   */
  objectId?: GdataObjectId;
  /**
   * gdata
   */
  path?: string;
  /**
   * gdata
   */
  referenceType?:  | "PATH" | "BLOB_REF" | "INLINE" | "BIGSTORE_REF" | "COSMO_BINARY_REFERENCE";
  /**
   * gdata
   */
  sha1Hash?: Uint8Array;
}

function serializeGdataCompositeMedia(data: any): GdataCompositeMedia {
  return {
    ...data,
    blobRef: data["blobRef"] !== undefined ? encodeBase64(data["blobRef"]) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? serializeGdataBlobstore2Info(data["blobstore2Info"]) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? encodeBase64(data["cosmoBinaryReference"]) : undefined,
    inline: data["inline"] !== undefined ? encodeBase64(data["inline"]) : undefined,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? encodeBase64(data["md5Hash"]) : undefined,
    objectId: data["objectId"] !== undefined ? serializeGdataObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? encodeBase64(data["sha1Hash"]) : undefined,
  };
}

function deserializeGdataCompositeMedia(data: any): GdataCompositeMedia {
  return {
    ...data,
    blobRef: data["blobRef"] !== undefined ? decodeBase64(data["blobRef"] as string) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? deserializeGdataBlobstore2Info(data["blobstore2Info"]) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? decodeBase64(data["cosmoBinaryReference"] as string) : undefined,
    inline: data["inline"] !== undefined ? decodeBase64(data["inline"] as string) : undefined,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? decodeBase64(data["md5Hash"] as string) : undefined,
    objectId: data["objectId"] !== undefined ? deserializeGdataObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? decodeBase64(data["sha1Hash"] as string) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataContentTypeInfo {
  /**
   * gdata
   */
  bestGuess?: string;
  /**
   * gdata
   */
  fromBytes?: string;
  /**
   * gdata
   */
  fromFileName?: string;
  /**
   * gdata
   */
  fromHeader?: string;
  /**
   * gdata
   */
  fromUrlPath?: string;
}

/**
 * gdata
 */
export interface GdataDiffChecksumsResponse {
  /**
   * gdata
   */
  checksumsLocation?: GdataCompositeMedia;
  /**
   * gdata
   */
  chunkSizeBytes?: bigint;
  /**
   * gdata
   */
  objectLocation?: GdataCompositeMedia;
  /**
   * gdata
   */
  objectSizeBytes?: bigint;
  /**
   * gdata
   */
  objectVersion?: string;
}

function serializeGdataDiffChecksumsResponse(data: any): GdataDiffChecksumsResponse {
  return {
    ...data,
    checksumsLocation: data["checksumsLocation"] !== undefined ? serializeGdataCompositeMedia(data["checksumsLocation"]) : undefined,
    chunkSizeBytes: data["chunkSizeBytes"] !== undefined ? String(data["chunkSizeBytes"]) : undefined,
    objectLocation: data["objectLocation"] !== undefined ? serializeGdataCompositeMedia(data["objectLocation"]) : undefined,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? String(data["objectSizeBytes"]) : undefined,
  };
}

function deserializeGdataDiffChecksumsResponse(data: any): GdataDiffChecksumsResponse {
  return {
    ...data,
    checksumsLocation: data["checksumsLocation"] !== undefined ? deserializeGdataCompositeMedia(data["checksumsLocation"]) : undefined,
    chunkSizeBytes: data["chunkSizeBytes"] !== undefined ? BigInt(data["chunkSizeBytes"]) : undefined,
    objectLocation: data["objectLocation"] !== undefined ? deserializeGdataCompositeMedia(data["objectLocation"]) : undefined,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? BigInt(data["objectSizeBytes"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataDiffDownloadResponse {
  /**
   * gdata
   */
  objectLocation?: GdataCompositeMedia;
}

function serializeGdataDiffDownloadResponse(data: any): GdataDiffDownloadResponse {
  return {
    ...data,
    objectLocation: data["objectLocation"] !== undefined ? serializeGdataCompositeMedia(data["objectLocation"]) : undefined,
  };
}

function deserializeGdataDiffDownloadResponse(data: any): GdataDiffDownloadResponse {
  return {
    ...data,
    objectLocation: data["objectLocation"] !== undefined ? deserializeGdataCompositeMedia(data["objectLocation"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataDiffUploadRequest {
  /**
   * gdata
   */
  checksumsInfo?: GdataCompositeMedia;
  /**
   * gdata
   */
  objectInfo?: GdataCompositeMedia;
  /**
   * gdata
   */
  objectVersion?: string;
}

function serializeGdataDiffUploadRequest(data: any): GdataDiffUploadRequest {
  return {
    ...data,
    checksumsInfo: data["checksumsInfo"] !== undefined ? serializeGdataCompositeMedia(data["checksumsInfo"]) : undefined,
    objectInfo: data["objectInfo"] !== undefined ? serializeGdataCompositeMedia(data["objectInfo"]) : undefined,
  };
}

function deserializeGdataDiffUploadRequest(data: any): GdataDiffUploadRequest {
  return {
    ...data,
    checksumsInfo: data["checksumsInfo"] !== undefined ? deserializeGdataCompositeMedia(data["checksumsInfo"]) : undefined,
    objectInfo: data["objectInfo"] !== undefined ? deserializeGdataCompositeMedia(data["objectInfo"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataDiffUploadResponse {
  /**
   * gdata
   */
  objectVersion?: string;
  /**
   * gdata
   */
  originalObject?: GdataCompositeMedia;
}

function serializeGdataDiffUploadResponse(data: any): GdataDiffUploadResponse {
  return {
    ...data,
    originalObject: data["originalObject"] !== undefined ? serializeGdataCompositeMedia(data["originalObject"]) : undefined,
  };
}

function deserializeGdataDiffUploadResponse(data: any): GdataDiffUploadResponse {
  return {
    ...data,
    originalObject: data["originalObject"] !== undefined ? deserializeGdataCompositeMedia(data["originalObject"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataDiffVersionResponse {
  /**
   * gdata
   */
  objectSizeBytes?: bigint;
  /**
   * gdata
   */
  objectVersion?: string;
}

function serializeGdataDiffVersionResponse(data: any): GdataDiffVersionResponse {
  return {
    ...data,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? String(data["objectSizeBytes"]) : undefined,
  };
}

function deserializeGdataDiffVersionResponse(data: any): GdataDiffVersionResponse {
  return {
    ...data,
    objectSizeBytes: data["objectSizeBytes"] !== undefined ? BigInt(data["objectSizeBytes"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataDownloadParameters {
  /**
   * gdata
   */
  allowGzipCompression?: boolean;
  /**
   * gdata
   */
  ignoreRange?: boolean;
}

/**
 * gdata
 */
export interface GdataMedia {
  /**
   * gdata
   */
  algorithm?: string;
  /**
   * gdata
   */
  bigstoreObjectRef?: Uint8Array;
  /**
   * gdata
   */
  blobRef?: Uint8Array;
  /**
   * gdata
   */
  blobstore2Info?: GdataBlobstore2Info;
  /**
   * gdata
   */
  compositeMedia?: GdataCompositeMedia[];
  /**
   * gdata
   */
  contentType?: string;
  /**
   * gdata
   */
  contentTypeInfo?: GdataContentTypeInfo;
  /**
   * gdata
   */
  cosmoBinaryReference?: Uint8Array;
  /**
   * gdata
   */
  crc32cHash?: number;
  /**
   * gdata
   */
  diffChecksumsResponse?: GdataDiffChecksumsResponse;
  /**
   * gdata
   */
  diffDownloadResponse?: GdataDiffDownloadResponse;
  /**
   * gdata
   */
  diffUploadRequest?: GdataDiffUploadRequest;
  /**
   * gdata
   */
  diffUploadResponse?: GdataDiffUploadResponse;
  /**
   * gdata
   */
  diffVersionResponse?: GdataDiffVersionResponse;
  /**
   * gdata
   */
  downloadParameters?: GdataDownloadParameters;
  /**
   * gdata
   */
  filename?: string;
  /**
   * gdata
   */
  hash?: string;
  /**
   * gdata
   */
  hashVerified?: boolean;
  /**
   * gdata
   */
  inline?: Uint8Array;
  /**
   * gdata
   */
  isPotentialRetry?: boolean;
  /**
   * gdata
   */
  length?: bigint;
  /**
   * gdata
   */
  md5Hash?: Uint8Array;
  /**
   * gdata
   */
  mediaId?: Uint8Array;
  /**
   * gdata
   */
  objectId?: GdataObjectId;
  /**
   * gdata
   */
  path?: string;
  /**
   * gdata
   */
  referenceType?:  | "PATH" | "BLOB_REF" | "INLINE" | "GET_MEDIA" | "COMPOSITE_MEDIA" | "BIGSTORE_REF" | "DIFF_VERSION_RESPONSE" | "DIFF_CHECKSUMS_RESPONSE" | "DIFF_DOWNLOAD_RESPONSE" | "DIFF_UPLOAD_REQUEST" | "DIFF_UPLOAD_RESPONSE" | "COSMO_BINARY_REFERENCE" | "ARBITRARY_BYTES";
  /**
   * gdata
   */
  sha1Hash?: Uint8Array;
  /**
   * gdata
   */
  sha256Hash?: Uint8Array;
  /**
   * gdata
   */
  timestamp?: bigint;
  /**
   * gdata
   */
  token?: string;
}

function serializeGdataMedia(data: any): GdataMedia {
  return {
    ...data,
    bigstoreObjectRef: data["bigstoreObjectRef"] !== undefined ? encodeBase64(data["bigstoreObjectRef"]) : undefined,
    blobRef: data["blobRef"] !== undefined ? encodeBase64(data["blobRef"]) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? serializeGdataBlobstore2Info(data["blobstore2Info"]) : undefined,
    compositeMedia: data["compositeMedia"] !== undefined ? data["compositeMedia"].map((item: any) => (serializeGdataCompositeMedia(item))) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? encodeBase64(data["cosmoBinaryReference"]) : undefined,
    diffChecksumsResponse: data["diffChecksumsResponse"] !== undefined ? serializeGdataDiffChecksumsResponse(data["diffChecksumsResponse"]) : undefined,
    diffDownloadResponse: data["diffDownloadResponse"] !== undefined ? serializeGdataDiffDownloadResponse(data["diffDownloadResponse"]) : undefined,
    diffUploadRequest: data["diffUploadRequest"] !== undefined ? serializeGdataDiffUploadRequest(data["diffUploadRequest"]) : undefined,
    diffUploadResponse: data["diffUploadResponse"] !== undefined ? serializeGdataDiffUploadResponse(data["diffUploadResponse"]) : undefined,
    diffVersionResponse: data["diffVersionResponse"] !== undefined ? serializeGdataDiffVersionResponse(data["diffVersionResponse"]) : undefined,
    inline: data["inline"] !== undefined ? encodeBase64(data["inline"]) : undefined,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? encodeBase64(data["md5Hash"]) : undefined,
    mediaId: data["mediaId"] !== undefined ? encodeBase64(data["mediaId"]) : undefined,
    objectId: data["objectId"] !== undefined ? serializeGdataObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? encodeBase64(data["sha1Hash"]) : undefined,
    sha256Hash: data["sha256Hash"] !== undefined ? encodeBase64(data["sha256Hash"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? String(data["timestamp"]) : undefined,
  };
}

function deserializeGdataMedia(data: any): GdataMedia {
  return {
    ...data,
    bigstoreObjectRef: data["bigstoreObjectRef"] !== undefined ? decodeBase64(data["bigstoreObjectRef"] as string) : undefined,
    blobRef: data["blobRef"] !== undefined ? decodeBase64(data["blobRef"] as string) : undefined,
    blobstore2Info: data["blobstore2Info"] !== undefined ? deserializeGdataBlobstore2Info(data["blobstore2Info"]) : undefined,
    compositeMedia: data["compositeMedia"] !== undefined ? data["compositeMedia"].map((item: any) => (deserializeGdataCompositeMedia(item))) : undefined,
    cosmoBinaryReference: data["cosmoBinaryReference"] !== undefined ? decodeBase64(data["cosmoBinaryReference"] as string) : undefined,
    diffChecksumsResponse: data["diffChecksumsResponse"] !== undefined ? deserializeGdataDiffChecksumsResponse(data["diffChecksumsResponse"]) : undefined,
    diffDownloadResponse: data["diffDownloadResponse"] !== undefined ? deserializeGdataDiffDownloadResponse(data["diffDownloadResponse"]) : undefined,
    diffUploadRequest: data["diffUploadRequest"] !== undefined ? deserializeGdataDiffUploadRequest(data["diffUploadRequest"]) : undefined,
    diffUploadResponse: data["diffUploadResponse"] !== undefined ? deserializeGdataDiffUploadResponse(data["diffUploadResponse"]) : undefined,
    diffVersionResponse: data["diffVersionResponse"] !== undefined ? deserializeGdataDiffVersionResponse(data["diffVersionResponse"]) : undefined,
    inline: data["inline"] !== undefined ? decodeBase64(data["inline"] as string) : undefined,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
    md5Hash: data["md5Hash"] !== undefined ? decodeBase64(data["md5Hash"] as string) : undefined,
    mediaId: data["mediaId"] !== undefined ? decodeBase64(data["mediaId"] as string) : undefined,
    objectId: data["objectId"] !== undefined ? deserializeGdataObjectId(data["objectId"]) : undefined,
    sha1Hash: data["sha1Hash"] !== undefined ? decodeBase64(data["sha1Hash"] as string) : undefined,
    sha256Hash: data["sha256Hash"] !== undefined ? decodeBase64(data["sha256Hash"] as string) : undefined,
    timestamp: data["timestamp"] !== undefined ? BigInt(data["timestamp"]) : undefined,
  };
}

/**
 * gdata
 */
export interface GdataObjectId {
  /**
   * gdata
   */
  bucketName?: string;
  /**
   * gdata
   */
  generation?: bigint;
  /**
   * gdata
   */
  objectName?: string;
}

function serializeGdataObjectId(data: any): GdataObjectId {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeGdataObjectId(data: any): GdataObjectId {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * A job creating reports of a specific type.
 */
export interface Job {
  /**
   * The creation date/time of the job.
   */
  createTime?: Date;
  /**
   * The date/time when this job will expire/expired. After a job expired, no
   * new reports are generated.
   */
  expireTime?: Date;
  /**
   * The server-generated ID of the job (max. 40 characters).
   */
  id?: string;
  /**
   * The name of the job (max. 100 characters).
   */
  name?: string;
  /**
   * The type of reports this job creates. Corresponds to the ID of a
   * ReportType.
   */
  reportTypeId?: string;
  /**
   * True if this a system-managed job that cannot be modified by the user;
   * otherwise false.
   */
  systemManaged?: boolean;
}

function serializeJob(data: any): Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Additional options for YouTubeReporting#jobsCreate.
 */
export interface JobsCreateOptions {
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTubeReporting#jobsDelete.
 */
export interface JobsDeleteOptions {
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTubeReporting#jobsGet.
 */
export interface JobsGetOptions {
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTubeReporting#jobsList.
 */
export interface JobsListOptions {
  /**
   * If set to true, also system-managed jobs will be returned; otherwise only
   * user-created jobs will be returned. System-managed jobs can neither be
   * modified nor deleted.
   */
  includeSystemManaged?: boolean;
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
  /**
   * Requested page size. Server may return fewer jobs than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListReportTypesResponse.next_page_token returned in
   * response to the previous call to the `ListJobs` method.
   */
  pageToken?: string;
}

/**
 * Additional options for YouTubeReporting#jobsReportsGet.
 */
export interface JobsReportsGetOptions {
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTubeReporting#jobsReportsList.
 */
export interface JobsReportsListOptions {
  /**
   * If set, only reports created after the specified date/time are returned.
   */
  createdAfter?: Date;
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
  /**
   * Requested page size. Server may return fewer report types than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListReportsResponse.next_page_token returned in
   * response to the previous call to the `ListReports` method.
   */
  pageToken?: string;
  /**
   * If set, only reports whose start time is greater than or equal the
   * specified date/time are returned.
   */
  startTimeAtOrAfter?: Date;
  /**
   * If set, only reports whose start time is smaller than the specified
   * date/time are returned.
   */
  startTimeBefore?: Date;
}

function serializeJobsReportsListOptions(data: any): JobsReportsListOptions {
  return {
    ...data,
    createdAfter: data["createdAfter"] !== undefined ? data["createdAfter"].toISOString() : undefined,
    startTimeAtOrAfter: data["startTimeAtOrAfter"] !== undefined ? data["startTimeAtOrAfter"].toISOString() : undefined,
    startTimeBefore: data["startTimeBefore"] !== undefined ? data["startTimeBefore"].toISOString() : undefined,
  };
}

function deserializeJobsReportsListOptions(data: any): JobsReportsListOptions {
  return {
    ...data,
    createdAfter: data["createdAfter"] !== undefined ? new Date(data["createdAfter"]) : undefined,
    startTimeAtOrAfter: data["startTimeAtOrAfter"] !== undefined ? new Date(data["startTimeAtOrAfter"]) : undefined,
    startTimeBefore: data["startTimeBefore"] !== undefined ? new Date(data["startTimeBefore"]) : undefined,
  };
}

/**
 * Response message for ReportingService.ListJobs.
 */
export interface ListJobsResponse {
  /**
   * The list of jobs.
   */
  jobs?: Job[];
  /**
   * A token to retrieve next page of results. Pass this value in the
   * ListJobsRequest.page_token field in the subsequent call to `ListJobs`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeJob(item))) : undefined,
  };
}

function deserializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeJob(item))) : undefined,
  };
}

/**
 * Response message for ReportingService.ListReports.
 */
export interface ListReportsResponse {
  /**
   * A token to retrieve next page of results. Pass this value in the
   * ListReportsRequest.page_token field in the subsequent call to `ListReports`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of report types.
   */
  reports?: Report[];
}

function serializeListReportsResponse(data: any): ListReportsResponse {
  return {
    ...data,
    reports: data["reports"] !== undefined ? data["reports"].map((item: any) => (serializeReport(item))) : undefined,
  };
}

function deserializeListReportsResponse(data: any): ListReportsResponse {
  return {
    ...data,
    reports: data["reports"] !== undefined ? data["reports"].map((item: any) => (deserializeReport(item))) : undefined,
  };
}

/**
 * Response message for ReportingService.ListReportTypes.
 */
export interface ListReportTypesResponse {
  /**
   * A token to retrieve next page of results. Pass this value in the
   * ListReportTypesRequest.page_token field in the subsequent call to
   * `ListReportTypes` method to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of report types.
   */
  reportTypes?: ReportType[];
}

function serializeListReportTypesResponse(data: any): ListReportTypesResponse {
  return {
    ...data,
    reportTypes: data["reportTypes"] !== undefined ? data["reportTypes"].map((item: any) => (serializeReportType(item))) : undefined,
  };
}

function deserializeListReportTypesResponse(data: any): ListReportTypesResponse {
  return {
    ...data,
    reportTypes: data["reportTypes"] !== undefined ? data["reportTypes"].map((item: any) => (deserializeReportType(item))) : undefined,
  };
}

/**
 * A report's metadata including the URL from which the report itself can be
 * downloaded.
 */
export interface Report {
  /**
   * The date/time when this report was created.
   */
  createTime?: Date;
  /**
   * The URL from which the report can be downloaded (max. 1000 characters).
   */
  downloadUrl?: string;
  /**
   * The end of the time period that the report instance covers. The value is
   * exclusive.
   */
  endTime?: Date;
  /**
   * The server-generated ID of the report.
   */
  id?: string;
  /**
   * The date/time when the job this report belongs to will expire/expired.
   */
  jobExpireTime?: Date;
  /**
   * The ID of the job that created this report.
   */
  jobId?: string;
  /**
   * The start of the time period that the report instance covers. The value is
   * inclusive.
   */
  startTime?: Date;
}

function serializeReport(data: any): Report {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    jobExpireTime: data["jobExpireTime"] !== undefined ? data["jobExpireTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeReport(data: any): Report {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    jobExpireTime: data["jobExpireTime"] !== undefined ? new Date(data["jobExpireTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A report type.
 */
export interface ReportType {
  /**
   * The date/time when this report type was/will be deprecated.
   */
  deprecateTime?: Date;
  /**
   * The ID of the report type (max. 100 characters).
   */
  id?: string;
  /**
   * The name of the report type (max. 100 characters).
   */
  name?: string;
  /**
   * True if this a system-managed report type; otherwise false. Reporting jobs
   * for system-managed report types are created automatically and can thus not
   * be used in the `CreateJob` method.
   */
  systemManaged?: boolean;
}

function serializeReportType(data: any): ReportType {
  return {
    ...data,
    deprecateTime: data["deprecateTime"] !== undefined ? data["deprecateTime"].toISOString() : undefined,
  };
}

function deserializeReportType(data: any): ReportType {
  return {
    ...data,
    deprecateTime: data["deprecateTime"] !== undefined ? new Date(data["deprecateTime"]) : undefined,
  };
}

/**
 * Additional options for YouTubeReporting#reportTypesList.
 */
export interface ReportTypesListOptions {
  /**
   * If set to true, also system-managed report types will be returned;
   * otherwise only the report types that can be used to create new reporting
   * jobs will be returned.
   */
  includeSystemManaged?: boolean;
  /**
   * The content owner's external ID on which behalf the user is acting on. If
   * not set, the user is acting for himself (his own channel).
   */
  onBehalfOfContentOwner?: string;
  /**
   * Requested page size. Server may return fewer report types than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListReportTypesResponse.next_page_token returned in
   * response to the previous call to the `ListReportTypes` method.
   */
  pageToken?: string;
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
