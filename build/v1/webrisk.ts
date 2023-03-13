// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Web Risk API Client for Deno
 * ============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/web-risk/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class WebRisk {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://webrisk.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the full hashes that match the requested hash prefix. This is used
   * after a hash prefix is looked up in a threatList and there is a match. The
   * client side threatList only holds partial hashes so the client must query
   * this method to determine if there is a full hash match of a threat.
   *
   */
  async hashesSearch(opts: HashesSearchOptions = {}): Promise<GoogleCloudWebriskV1SearchHashesResponse> {
    opts = serializeHashesSearchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/hashes:search`);
    if (opts.hashPrefix !== undefined) {
      url.searchParams.append("hashPrefix", String(opts.hashPrefix));
    }
    if (opts.threatTypes !== undefined) {
      url.searchParams.append("threatTypes", String(opts.threatTypes));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudWebriskV1SearchHashesResponse(data);
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
  async projectsOperationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsOperationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Creates a Submission of a URI suspected of containing phishing content to
   * be reviewed. If the result verifies the existence of malicious phishing
   * content, the site will be added to the [Google's Social Engineering
   * lists](https://support.google.com/webmasters/answer/6350487/) in order to
   * protect users that could get exposed to this threat in the future. Only
   * allowlisted projects can use this method during Early Access. Please reach
   * out to Sales or your customer engineer to obtain access.
   *
   * @param parent Required. The name of the project that is making the submission. This string is in the format "projects/{project_number}".
   */
  async projectsSubmissionsCreate(parent: string, req: GoogleCloudWebriskV1Submission): Promise<GoogleCloudWebriskV1Submission> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/submissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudWebriskV1Submission;
  }

  /**
   * Gets the most recent threat list diffs. These diffs should be applied to a
   * local database of hashes to keep it up-to-date. If the local database is
   * empty or excessively out-of-date, a complete snapshot of the database will
   * be returned. This Method only updates a single ThreatList at a time. To
   * update multiple ThreatList databases, this method needs to be called once
   * for each list.
   *
   */
  async threatListsComputeDiff(opts: ThreatListsComputeDiffOptions = {}): Promise<GoogleCloudWebriskV1ComputeThreatListDiffResponse> {
    opts = serializeThreatListsComputeDiffOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/threatLists:computeDiff`);
    if (opts["constraints.maxDatabaseEntries"] !== undefined) {
      url.searchParams.append("constraints.maxDatabaseEntries", String(opts["constraints.maxDatabaseEntries"]));
    }
    if (opts["constraints.maxDiffEntries"] !== undefined) {
      url.searchParams.append("constraints.maxDiffEntries", String(opts["constraints.maxDiffEntries"]));
    }
    if (opts["constraints.supportedCompressions"] !== undefined) {
      url.searchParams.append("constraints.supportedCompressions", String(opts["constraints.supportedCompressions"]));
    }
    if (opts.threatType !== undefined) {
      url.searchParams.append("threatType", String(opts.threatType));
    }
    if (opts.versionToken !== undefined) {
      url.searchParams.append("versionToken", String(opts.versionToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudWebriskV1ComputeThreatListDiffResponse(data);
  }

  /**
   * This method is used to check whether a URI is on a given threatList.
   * Multiple threatLists may be searched in a single query. The response will
   * list all requested threatLists the URI was found to match. If the URI is
   * not found on any of the requested ThreatList an empty response will be
   * returned.
   *
   */
  async urisSearch(opts: UrisSearchOptions = {}): Promise<GoogleCloudWebriskV1SearchUrisResponse> {
    const url = new URL(`${this.#baseUrl}v1/uris:search`);
    if (opts.threatTypes !== undefined) {
      url.searchParams.append("threatTypes", String(opts.threatTypes));
    }
    if (opts.uri !== undefined) {
      url.searchParams.append("uri", String(opts.uri));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudWebriskV1SearchUrisResponse(data);
  }
}

export interface GoogleCloudWebriskV1ComputeThreatListDiffResponse {
  /**
   * A set of entries to add to a local threat type's list.
   */
  additions?: GoogleCloudWebriskV1ThreatEntryAdditions;
  /**
   * The expected SHA256 hash of the client state; that is, of the sorted list
   * of all hashes present in the database after applying the provided diff. If
   * the client state doesn't match the expected state, the client must discard
   * this diff and retry later.
   */
  checksum?: GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum;
  /**
   * The new opaque client version token. This should be retained by the client
   * and passed into the next call of ComputeThreatListDiff as 'version_token'.
   * A separate version token should be stored and used for each threatList.
   */
  newVersionToken?: Uint8Array;
  /**
   * The soonest the client should wait before issuing any diff request.
   * Querying sooner is unlikely to produce a meaningful diff. Waiting longer is
   * acceptable considering the use case. If this field is not set clients may
   * update as soon as they want.
   */
  recommendedNextDiff?: Date;
  /**
   * A set of entries to remove from a local threat type's list. This field may
   * be empty.
   */
  removals?: GoogleCloudWebriskV1ThreatEntryRemovals;
  /**
   * The type of response. This may indicate that an action must be taken by
   * the client when the response is received.
   */
  responseType?:  | "RESPONSE_TYPE_UNSPECIFIED" | "DIFF" | "RESET";
}

function serializeGoogleCloudWebriskV1ComputeThreatListDiffResponse(data: any): GoogleCloudWebriskV1ComputeThreatListDiffResponse {
  return {
    ...data,
    additions: data["additions"] !== undefined ? serializeGoogleCloudWebriskV1ThreatEntryAdditions(data["additions"]) : undefined,
    checksum: data["checksum"] !== undefined ? serializeGoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum(data["checksum"]) : undefined,
    newVersionToken: data["newVersionToken"] !== undefined ? encodeBase64(data["newVersionToken"]) : undefined,
    recommendedNextDiff: data["recommendedNextDiff"] !== undefined ? data["recommendedNextDiff"].toISOString() : undefined,
    removals: data["removals"] !== undefined ? serializeGoogleCloudWebriskV1ThreatEntryRemovals(data["removals"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1ComputeThreatListDiffResponse(data: any): GoogleCloudWebriskV1ComputeThreatListDiffResponse {
  return {
    ...data,
    additions: data["additions"] !== undefined ? deserializeGoogleCloudWebriskV1ThreatEntryAdditions(data["additions"]) : undefined,
    checksum: data["checksum"] !== undefined ? deserializeGoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum(data["checksum"]) : undefined,
    newVersionToken: data["newVersionToken"] !== undefined ? decodeBase64(data["newVersionToken"] as string) : undefined,
    recommendedNextDiff: data["recommendedNextDiff"] !== undefined ? new Date(data["recommendedNextDiff"]) : undefined,
    removals: data["removals"] !== undefined ? deserializeGoogleCloudWebriskV1ThreatEntryRemovals(data["removals"]) : undefined,
  };
}

/**
 * The expected state of a client's local database.
 */
export interface GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum {
  /**
   * The SHA256 hash of the client state; that is, of the sorted list of all
   * hashes present in the database.
   */
  sha256?: Uint8Array;
}

function serializeGoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum(data: any): GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? encodeBase64(data["sha256"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum(data: any): GoogleCloudWebriskV1ComputeThreatListDiffResponseChecksum {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? decodeBase64(data["sha256"] as string) : undefined,
  };
}

/**
 * The uncompressed threat entries in hash format. Hashes can be anywhere from
 * 4 to 32 bytes in size. A large majority are 4 bytes, but some hashes are
 * lengthened if they collide with the hash of a popular URI. Used for sending
 * ThreatEntryAdditons to clients that do not support compression, or when
 * sending non-4-byte hashes to clients that do support compression.
 */
export interface GoogleCloudWebriskV1RawHashes {
  /**
   * The number of bytes for each prefix encoded below. This field can be
   * anywhere from 4 (shortest prefix) to 32 (full SHA256 hash). In practice
   * this is almost always 4, except in exceptional circumstances.
   */
  prefixSize?: number;
  /**
   * The hashes, in binary format, concatenated into one long string. Hashes
   * are sorted in lexicographic order. For JSON API users, hashes are
   * base64-encoded.
   */
  rawHashes?: Uint8Array;
}

function serializeGoogleCloudWebriskV1RawHashes(data: any): GoogleCloudWebriskV1RawHashes {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? encodeBase64(data["rawHashes"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1RawHashes(data: any): GoogleCloudWebriskV1RawHashes {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? decodeBase64(data["rawHashes"] as string) : undefined,
  };
}

/**
 * A set of raw indices to remove from a local list.
 */
export interface GoogleCloudWebriskV1RawIndices {
  /**
   * The indices to remove from a lexicographically-sorted local list.
   */
  indices?: number[];
}

/**
 * The Rice-Golomb encoded data. Used for sending compressed 4-byte hashes or
 * compressed removal indices.
 */
export interface GoogleCloudWebriskV1RiceDeltaEncoding {
  /**
   * The encoded deltas that are encoded using the Golomb-Rice coder.
   */
  encodedData?: Uint8Array;
  /**
   * The number of entries that are delta encoded in the encoded data. If only
   * a single integer was encoded, this will be zero and the single value will
   * be stored in `first_value`.
   */
  entryCount?: number;
  /**
   * The offset of the first entry in the encoded data, or, if only a single
   * integer was encoded, that single integer's value. If the field is empty or
   * missing, assume zero.
   */
  firstValue?: bigint;
  /**
   * The Golomb-Rice parameter, which is a number between 2 and 28. This field
   * is missing (that is, zero) if `num_entries` is zero.
   */
  riceParameter?: number;
}

function serializeGoogleCloudWebriskV1RiceDeltaEncoding(data: any): GoogleCloudWebriskV1RiceDeltaEncoding {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? encodeBase64(data["encodedData"]) : undefined,
    firstValue: data["firstValue"] !== undefined ? String(data["firstValue"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1RiceDeltaEncoding(data: any): GoogleCloudWebriskV1RiceDeltaEncoding {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? decodeBase64(data["encodedData"] as string) : undefined,
    firstValue: data["firstValue"] !== undefined ? BigInt(data["firstValue"]) : undefined,
  };
}

export interface GoogleCloudWebriskV1SearchHashesResponse {
  /**
   * For requested entities that did not match the threat list, how long to
   * cache the response until.
   */
  negativeExpireTime?: Date;
  /**
   * The full hashes that matched the requested prefixes. The hash will be
   * populated in the key.
   */
  threats?: GoogleCloudWebriskV1SearchHashesResponseThreatHash[];
}

function serializeGoogleCloudWebriskV1SearchHashesResponse(data: any): GoogleCloudWebriskV1SearchHashesResponse {
  return {
    ...data,
    negativeExpireTime: data["negativeExpireTime"] !== undefined ? data["negativeExpireTime"].toISOString() : undefined,
    threats: data["threats"] !== undefined ? data["threats"].map((item: any) => (serializeGoogleCloudWebriskV1SearchHashesResponseThreatHash(item))) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1SearchHashesResponse(data: any): GoogleCloudWebriskV1SearchHashesResponse {
  return {
    ...data,
    negativeExpireTime: data["negativeExpireTime"] !== undefined ? new Date(data["negativeExpireTime"]) : undefined,
    threats: data["threats"] !== undefined ? data["threats"].map((item: any) => (deserializeGoogleCloudWebriskV1SearchHashesResponseThreatHash(item))) : undefined,
  };
}

/**
 * Contains threat information on a matching hash.
 */
export interface GoogleCloudWebriskV1SearchHashesResponseThreatHash {
  /**
   * The cache lifetime for the returned match. Clients must not cache this
   * response past this timestamp to avoid false positives.
   */
  expireTime?: Date;
  /**
   * A 32 byte SHA256 hash. This field is in binary format. For JSON requests,
   * hashes are base64-encoded.
   */
  hash?: Uint8Array;
  /**
   * The ThreatList this threat belongs to. This must contain at least one
   * entry.
   */
  threatTypes?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE"[];
}

function serializeGoogleCloudWebriskV1SearchHashesResponseThreatHash(data: any): GoogleCloudWebriskV1SearchHashesResponseThreatHash {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    hash: data["hash"] !== undefined ? encodeBase64(data["hash"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1SearchHashesResponseThreatHash(data: any): GoogleCloudWebriskV1SearchHashesResponseThreatHash {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    hash: data["hash"] !== undefined ? decodeBase64(data["hash"] as string) : undefined,
  };
}

export interface GoogleCloudWebriskV1SearchUrisResponse {
  /**
   * The threat list matches. This might be empty if the URI is on no list.
   */
  threat?: GoogleCloudWebriskV1SearchUrisResponseThreatUri;
}

function serializeGoogleCloudWebriskV1SearchUrisResponse(data: any): GoogleCloudWebriskV1SearchUrisResponse {
  return {
    ...data,
    threat: data["threat"] !== undefined ? serializeGoogleCloudWebriskV1SearchUrisResponseThreatUri(data["threat"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1SearchUrisResponse(data: any): GoogleCloudWebriskV1SearchUrisResponse {
  return {
    ...data,
    threat: data["threat"] !== undefined ? deserializeGoogleCloudWebriskV1SearchUrisResponseThreatUri(data["threat"]) : undefined,
  };
}

/**
 * Contains threat information on a matching uri.
 */
export interface GoogleCloudWebriskV1SearchUrisResponseThreatUri {
  /**
   * The cache lifetime for the returned match. Clients must not cache this
   * response past this timestamp to avoid false positives.
   */
  expireTime?: Date;
  /**
   * The ThreatList this threat belongs to.
   */
  threatTypes?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE"[];
}

function serializeGoogleCloudWebriskV1SearchUrisResponseThreatUri(data: any): GoogleCloudWebriskV1SearchUrisResponseThreatUri {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudWebriskV1SearchUrisResponseThreatUri(data: any): GoogleCloudWebriskV1SearchUrisResponseThreatUri {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Wraps a URI that might be displaying malicious content.
 */
export interface GoogleCloudWebriskV1Submission {
  /**
   * Required. The URI that is being reported for malicious content to be
   * analyzed.
   */
  uri?: string;
}

/**
 * Contains the set of entries to add to a local database. May contain a
 * combination of compressed and raw data in a single response.
 */
export interface GoogleCloudWebriskV1ThreatEntryAdditions {
  /**
   * The raw SHA256-formatted entries. Repeated to allow returning sets of
   * hashes with different prefix sizes.
   */
  rawHashes?: GoogleCloudWebriskV1RawHashes[];
  /**
   * The encoded 4-byte prefixes of SHA256-formatted entries, using a
   * Golomb-Rice encoding. The hashes are converted to uint32, sorted in
   * ascending order, then delta encoded and stored as encoded_data.
   */
  riceHashes?: GoogleCloudWebriskV1RiceDeltaEncoding;
}

function serializeGoogleCloudWebriskV1ThreatEntryAdditions(data: any): GoogleCloudWebriskV1ThreatEntryAdditions {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? data["rawHashes"].map((item: any) => (serializeGoogleCloudWebriskV1RawHashes(item))) : undefined,
    riceHashes: data["riceHashes"] !== undefined ? serializeGoogleCloudWebriskV1RiceDeltaEncoding(data["riceHashes"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1ThreatEntryAdditions(data: any): GoogleCloudWebriskV1ThreatEntryAdditions {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? data["rawHashes"].map((item: any) => (deserializeGoogleCloudWebriskV1RawHashes(item))) : undefined,
    riceHashes: data["riceHashes"] !== undefined ? deserializeGoogleCloudWebriskV1RiceDeltaEncoding(data["riceHashes"]) : undefined,
  };
}

/**
 * Contains the set of entries to remove from a local database.
 */
export interface GoogleCloudWebriskV1ThreatEntryRemovals {
  /**
   * The raw removal indices for a local list.
   */
  rawIndices?: GoogleCloudWebriskV1RawIndices;
  /**
   * The encoded local, lexicographically-sorted list indices, using a
   * Golomb-Rice encoding. Used for sending compressed removal indices. The
   * removal indices (uint32) are sorted in ascending order, then delta encoded
   * and stored as encoded_data.
   */
  riceIndices?: GoogleCloudWebriskV1RiceDeltaEncoding;
}

function serializeGoogleCloudWebriskV1ThreatEntryRemovals(data: any): GoogleCloudWebriskV1ThreatEntryRemovals {
  return {
    ...data,
    riceIndices: data["riceIndices"] !== undefined ? serializeGoogleCloudWebriskV1RiceDeltaEncoding(data["riceIndices"]) : undefined,
  };
}

function deserializeGoogleCloudWebriskV1ThreatEntryRemovals(data: any): GoogleCloudWebriskV1ThreatEntryRemovals {
  return {
    ...data,
    riceIndices: data["riceIndices"] !== undefined ? deserializeGoogleCloudWebriskV1RiceDeltaEncoding(data["riceIndices"]) : undefined,
  };
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface GoogleLongrunningCancelOperationRequest {
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
  /**
   * Contains a `SubmitUriMetadata` object.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Matches the `/v1/{project-name}/operations/{operation-id}` pattern.
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
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
 * Additional options for WebRisk#hashesSearch.
 */
export interface HashesSearchOptions {
  /**
   * A hash prefix, consisting of the most significant 4-32 bytes of a SHA256
   * hash. For JSON requests, this field is base64-encoded. Note that if this
   * parameter is provided by a URI, it must be encoded using the web safe
   * base64 variant (RFC 4648).
   */
  hashPrefix?: Uint8Array;
  /**
   * Required. The ThreatLists to search in. Multiple ThreatLists may be
   * specified.
   */
  threatTypes?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE";
}

function serializeHashesSearchOptions(data: any): HashesSearchOptions {
  return {
    ...data,
    hashPrefix: data["hashPrefix"] !== undefined ? encodeBase64(data["hashPrefix"]) : undefined,
  };
}

function deserializeHashesSearchOptions(data: any): HashesSearchOptions {
  return {
    ...data,
    hashPrefix: data["hashPrefix"] !== undefined ? decodeBase64(data["hashPrefix"] as string) : undefined,
  };
}

/**
 * Additional options for WebRisk#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
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
 * Additional options for WebRisk#threatListsComputeDiff.
 */
export interface ThreatListsComputeDiffOptions {
  /**
   * Sets the maximum number of entries that the client is willing to have in
   * the local database. This should be a power of 2 between 2**10 and 2**20. If
   * zero, no database size limit is set.
   */
  ["constraints.maxDatabaseEntries"]?: number;
  /**
   * The maximum size in number of entries. The diff will not contain more
   * entries than this value. This should be a power of 2 between 2**10 and
   * 2**20. If zero, no diff size limit is set.
   */
  ["constraints.maxDiffEntries"]?: number;
  /**
   * The compression types supported by the client.
   */
  ["constraints.supportedCompressions"]?:  | "COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE";
  /**
   * Required. The threat list to update. Only a single ThreatType should be
   * specified per request. If you want to handle multiple ThreatTypes, you must
   * make one request per ThreatType.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE";
  /**
   * The current version token of the client for the requested list (the client
   * version that was received from the last successful diff). If the client
   * does not have a version token (this is the first time calling
   * ComputeThreatListDiff), this may be left empty and a full database snapshot
   * will be returned.
   */
  versionToken?: Uint8Array;
}

function serializeThreatListsComputeDiffOptions(data: any): ThreatListsComputeDiffOptions {
  return {
    ...data,
    versionToken: data["versionToken"] !== undefined ? encodeBase64(data["versionToken"]) : undefined,
  };
}

function deserializeThreatListsComputeDiffOptions(data: any): ThreatListsComputeDiffOptions {
  return {
    ...data,
    versionToken: data["versionToken"] !== undefined ? decodeBase64(data["versionToken"] as string) : undefined,
  };
}

/**
 * Additional options for WebRisk#urisSearch.
 */
export interface UrisSearchOptions {
  /**
   * Required. The ThreatLists to search in. Multiple ThreatLists may be
   * specified.
   */
  threatTypes?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "SOCIAL_ENGINEERING_EXTENDED_COVERAGE";
  /**
   * Required. The URI to be checked for matches.
   */
  uri?: string;
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
