// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Safe Browsing API Client for Deno
 * =================================
 * 
 * Enables client applications to check web resources (most commonly URLs) against Google-generated lists of unsafe web resources. The Safe Browsing APIs are for non-commercial use only. If you need to use APIs to detect malicious URLs for commercial purposes – meaning “for sale or revenue-generating purposes” – please refer to the Web Risk API.
 * 
 * Docs: https://developers.google.com/safe-browsing/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Enables client applications to check web resources (most commonly URLs)
 * against Google-generated lists of unsafe web resources. The Safe Browsing
 * APIs are for non-commercial use only. If you need to use APIs to detect
 * malicious URLs for commercial purposes – meaning “for sale or
 * revenue-generating purposes” – please refer to the Web Risk API.
 */
export class SafeBrowsing {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://safebrowsing.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  async encodedFullHashesGet(encodedRequest: Uint8Array, opts: EncodedFullHashesGetOptions = {}): Promise<GoogleSecuritySafebrowsingV4FindFullHashesResponse> {
    encodedRequest = encodeBase64(encodedRequest);
    const url = new URL(`${this.#baseUrl}v4/encodedFullHashes/${ encodedRequest }`);
    if (opts.clientId !== undefined) {
      url.searchParams.append("clientId", String(opts.clientId));
    }
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleSecuritySafebrowsingV4FindFullHashesResponse(data);
  }

  async encodedUpdatesGet(encodedRequest: Uint8Array, opts: EncodedUpdatesGetOptions = {}): Promise<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse> {
    encodedRequest = encodeBase64(encodedRequest);
    const url = new URL(`${this.#baseUrl}v4/encodedUpdates/${ encodedRequest }`);
    if (opts.clientId !== undefined) {
      url.searchParams.append("clientId", String(opts.clientId));
    }
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse(data);
  }

  /**
   * Finds the full hashes that match the requested hash prefixes.
   *
   */
  async fullHashesFind(req: GoogleSecuritySafebrowsingV4FindFullHashesRequest): Promise<GoogleSecuritySafebrowsingV4FindFullHashesResponse> {
    req = serializeGoogleSecuritySafebrowsingV4FindFullHashesRequest(req);
    const url = new URL(`${this.#baseUrl}v4/fullHashes:find`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleSecuritySafebrowsingV4FindFullHashesResponse(data);
  }

  /**
   * Reports a Safe Browsing threat list hit to Google. Only projects with
   * TRUSTED_REPORTER visibility can use this method.
   *
   */
  async threatHitsCreate(req: GoogleSecuritySafebrowsingV4ThreatHit): Promise<GoogleProtobufEmpty> {
    req = serializeGoogleSecuritySafebrowsingV4ThreatHit(req);
    const url = new URL(`${this.#baseUrl}v4/threatHits`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists the Safe Browsing threat lists available for download.
   *
   */
  async threatListsList(): Promise<GoogleSecuritySafebrowsingV4ListThreatListsResponse> {
    const url = new URL(`${this.#baseUrl}v4/threatLists`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleSecuritySafebrowsingV4ListThreatListsResponse;
  }

  /**
   * Fetches the most recent threat list updates. A client can request updates
   * for multiple lists at once.
   *
   */
  async threatListUpdatesFetch(req: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest): Promise<GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse> {
    req = serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest(req);
    const url = new URL(`${this.#baseUrl}v4/threatListUpdates:fetch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse(data);
  }

  /**
   * Finds the threat entries that match the Safe Browsing lists.
   *
   */
  async threatMatchesFind(req: GoogleSecuritySafebrowsingV4FindThreatMatchesRequest): Promise<GoogleSecuritySafebrowsingV4FindThreatMatchesResponse> {
    req = serializeGoogleSecuritySafebrowsingV4FindThreatMatchesRequest(req);
    const url = new URL(`${this.#baseUrl}v4/threatMatches:find`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleSecuritySafebrowsingV4FindThreatMatchesResponse(data);
  }
}

/**
 * Additional options for SafeBrowsing#encodedFullHashesGet.
 */
export interface EncodedFullHashesGetOptions {
  /**
   * A client ID that (hopefully) uniquely identifies the client implementation
   * of the Safe Browsing API.
   */
  clientId?: string;
  /**
   * The version of the client implementation.
   */
  clientVersion?: string;
}

/**
 * Additional options for SafeBrowsing#encodedUpdatesGet.
 */
export interface EncodedUpdatesGetOptions {
  /**
   * A client ID that uniquely identifies the client implementation of the Safe
   * Browsing API.
   */
  clientId?: string;
  /**
   * The version of the client implementation.
   */
  clientVersion?: string;
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
 * The expected state of a client's local database.
 */
export interface GoogleSecuritySafebrowsingV4Checksum {
  /**
   * The SHA256 hash of the client state; that is, of the sorted list of all
   * hashes present in the database.
   */
  sha256?: Uint8Array;
}

function serializeGoogleSecuritySafebrowsingV4Checksum(data: any): GoogleSecuritySafebrowsingV4Checksum {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? encodeBase64(data["sha256"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4Checksum(data: any): GoogleSecuritySafebrowsingV4Checksum {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? decodeBase64(data["sha256"] as string) : undefined,
  };
}

/**
 * The client metadata associated with Safe Browsing API requests.
 */
export interface GoogleSecuritySafebrowsingV4ClientInfo {
  /**
   * A client ID that (hopefully) uniquely identifies the client implementation
   * of the Safe Browsing API.
   */
  clientId?: string;
  /**
   * The version of the client implementation.
   */
  clientVersion?: string;
}

/**
 * Describes a Safe Browsing API update request. Clients can request updates
 * for multiple lists in a single request. The server may not respond to all
 * requests, if the server has no updates for that list. NOTE: Field index 2 is
 * unused. NEXT: 5
 */
export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest {
  /**
   * The client metadata.
   */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /**
   * The requested threat list updates.
   */
  listUpdateRequests?: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest[];
}

function serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest {
  return {
    ...data,
    listUpdateRequests: data["listUpdateRequests"] !== undefined ? data["listUpdateRequests"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest(item))) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequest {
  return {
    ...data,
    listUpdateRequests: data["listUpdateRequests"] !== undefined ? data["listUpdateRequests"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest(item))) : undefined,
  };
}

/**
 * A single list update request.
 */
export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest {
  /**
   * The constraints associated with this request.
   */
  constraints?: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints;
  /**
   * The type of platform at risk by entries present in the list.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME";
  /**
   * The current state of the client for the requested list (the encrypted
   * client state that was received from the last successful list update).
   */
  state?: Uint8Array;
  /**
   * The types of entries present in the list.
   */
  threatEntryType?:  | "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT";
  /**
   * The type of threat posed by entries present in the list.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS";
}

function serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest {
  return {
    ...data,
    state: data["state"] !== undefined ? encodeBase64(data["state"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequest {
  return {
    ...data,
    state: data["state"] !== undefined ? decodeBase64(data["state"] as string) : undefined,
  };
}

/**
 * The constraints for this update.
 */
export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesRequestListUpdateRequestConstraints {
  /**
   * A client's physical location, expressed as a ISO 31166-1 alpha-2 region
   * code.
   */
  deviceLocation?: string;
  /**
   * Requests the lists for a specific language. Expects ISO 639 alpha-2
   * format.
   */
  language?: string;
  /**
   * Sets the maximum number of entries that the client is willing to have in
   * the local database for the specified list. This should be a power of 2
   * between 2**10 and 2**20. If zero, no database size limit is set.
   */
  maxDatabaseEntries?: number;
  /**
   * The maximum size in number of entries. The update will not contain more
   * entries than this value. This should be a power of 2 between 2**10 and
   * 2**20. If zero, no update size limit is set.
   */
  maxUpdateEntries?: number;
  /**
   * Requests the list for a specific geographic location. If not set the
   * server may pick that value based on the user's IP address. Expects ISO
   * 3166-1 alpha-2 format.
   */
  region?: string;
  /**
   * The compression types supported by the client.
   */
  supportedCompressions?:  | "COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE"[];
}

export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse {
  /**
   * The list updates requested by the clients. The number of responses here
   * may be less than the number of requests sent by clients. This is the case,
   * for example, if the server has no updates for a particular list.
   */
  listUpdateResponses?: GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse[];
  /**
   * The minimum duration the client must wait before issuing any update
   * request. If this field is not set clients may update as soon as they want.
   */
  minimumWaitDuration?: number /* Duration */;
}

function serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse {
  return {
    ...data,
    listUpdateResponses: data["listUpdateResponses"] !== undefined ? data["listUpdateResponses"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse(item))) : undefined,
    minimumWaitDuration: data["minimumWaitDuration"] !== undefined ? data["minimumWaitDuration"] : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponse {
  return {
    ...data,
    listUpdateResponses: data["listUpdateResponses"] !== undefined ? data["listUpdateResponses"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse(item))) : undefined,
    minimumWaitDuration: data["minimumWaitDuration"] !== undefined ? data["minimumWaitDuration"] : undefined,
  };
}

/**
 * An update to an individual list.
 */
export interface GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse {
  /**
   * A set of entries to add to a local threat type's list. Repeated to allow
   * for a combination of compressed and raw data to be sent in a single
   * response.
   */
  additions?: GoogleSecuritySafebrowsingV4ThreatEntrySet[];
  /**
   * The expected SHA256 hash of the client state; that is, of the sorted list
   * of all hashes present in the database after applying the provided update.
   * If the client state doesn't match the expected state, the client must
   * disregard this update and retry later.
   */
  checksum?: GoogleSecuritySafebrowsingV4Checksum;
  /**
   * The new client state, in encrypted format. Opaque to clients.
   */
  newClientState?: Uint8Array;
  /**
   * The platform type for which data is returned.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME";
  /**
   * A set of entries to remove from a local threat type's list. In practice,
   * this field is empty or contains exactly one ThreatEntrySet.
   */
  removals?: GoogleSecuritySafebrowsingV4ThreatEntrySet[];
  /**
   * The type of response. This may indicate that an action is required by the
   * client when the response is received.
   */
  responseType?:  | "RESPONSE_TYPE_UNSPECIFIED" | "PARTIAL_UPDATE" | "FULL_UPDATE";
  /**
   * The format of the threats.
   */
  threatEntryType?:  | "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT";
  /**
   * The threat type for which data is returned.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS";
}

function serializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse {
  return {
    ...data,
    additions: data["additions"] !== undefined ? data["additions"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatEntrySet(item))) : undefined,
    checksum: data["checksum"] !== undefined ? serializeGoogleSecuritySafebrowsingV4Checksum(data["checksum"]) : undefined,
    newClientState: data["newClientState"] !== undefined ? encodeBase64(data["newClientState"]) : undefined,
    removals: data["removals"] !== undefined ? data["removals"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatEntrySet(item))) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse(data: any): GoogleSecuritySafebrowsingV4FetchThreatListUpdatesResponseListUpdateResponse {
  return {
    ...data,
    additions: data["additions"] !== undefined ? data["additions"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatEntrySet(item))) : undefined,
    checksum: data["checksum"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4Checksum(data["checksum"]) : undefined,
    newClientState: data["newClientState"] !== undefined ? decodeBase64(data["newClientState"] as string) : undefined,
    removals: data["removals"] !== undefined ? data["removals"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatEntrySet(item))) : undefined,
  };
}

/**
 * Request to return full hashes matched by the provided hash prefixes.
 */
export interface GoogleSecuritySafebrowsingV4FindFullHashesRequest {
  /**
   * Client metadata associated with callers of higher-level APIs built on top
   * of the client's implementation.
   */
  apiClient?: GoogleSecuritySafebrowsingV4ClientInfo;
  /**
   * The client metadata.
   */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /**
   * The current client states for each of the client's local threat lists.
   */
  clientStates?: Uint8Array[];
  /**
   * The lists and hashes to be checked.
   */
  threatInfo?: GoogleSecuritySafebrowsingV4ThreatInfo;
}

function serializeGoogleSecuritySafebrowsingV4FindFullHashesRequest(data: any): GoogleSecuritySafebrowsingV4FindFullHashesRequest {
  return {
    ...data,
    clientStates: data["clientStates"] !== undefined ? data["clientStates"].map((item: any) => (encodeBase64(item))) : undefined,
    threatInfo: data["threatInfo"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatInfo(data["threatInfo"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FindFullHashesRequest(data: any): GoogleSecuritySafebrowsingV4FindFullHashesRequest {
  return {
    ...data,
    clientStates: data["clientStates"] !== undefined ? data["clientStates"].map((item: any) => (decodeBase64(item as string))) : undefined,
    threatInfo: data["threatInfo"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatInfo(data["threatInfo"]) : undefined,
  };
}

export interface GoogleSecuritySafebrowsingV4FindFullHashesResponse {
  /**
   * The full hashes that matched the requested prefixes.
   */
  matches?: GoogleSecuritySafebrowsingV4ThreatMatch[];
  /**
   * The minimum duration the client must wait before issuing any find hashes
   * request. If this field is not set, clients can issue a request as soon as
   * they want.
   */
  minimumWaitDuration?: number /* Duration */;
  /**
   * For requested entities that did not match the threat list, how long to
   * cache the response.
   */
  negativeCacheDuration?: number /* Duration */;
}

function serializeGoogleSecuritySafebrowsingV4FindFullHashesResponse(data: any): GoogleSecuritySafebrowsingV4FindFullHashesResponse {
  return {
    ...data,
    matches: data["matches"] !== undefined ? data["matches"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatMatch(item))) : undefined,
    minimumWaitDuration: data["minimumWaitDuration"] !== undefined ? data["minimumWaitDuration"] : undefined,
    negativeCacheDuration: data["negativeCacheDuration"] !== undefined ? data["negativeCacheDuration"] : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FindFullHashesResponse(data: any): GoogleSecuritySafebrowsingV4FindFullHashesResponse {
  return {
    ...data,
    matches: data["matches"] !== undefined ? data["matches"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatMatch(item))) : undefined,
    minimumWaitDuration: data["minimumWaitDuration"] !== undefined ? data["minimumWaitDuration"] : undefined,
    negativeCacheDuration: data["negativeCacheDuration"] !== undefined ? data["negativeCacheDuration"] : undefined,
  };
}

/**
 * Request to check entries against lists.
 */
export interface GoogleSecuritySafebrowsingV4FindThreatMatchesRequest {
  /**
   * The client metadata.
   */
  client?: GoogleSecuritySafebrowsingV4ClientInfo;
  /**
   * The lists and entries to be checked for matches.
   */
  threatInfo?: GoogleSecuritySafebrowsingV4ThreatInfo;
}

function serializeGoogleSecuritySafebrowsingV4FindThreatMatchesRequest(data: any): GoogleSecuritySafebrowsingV4FindThreatMatchesRequest {
  return {
    ...data,
    threatInfo: data["threatInfo"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatInfo(data["threatInfo"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FindThreatMatchesRequest(data: any): GoogleSecuritySafebrowsingV4FindThreatMatchesRequest {
  return {
    ...data,
    threatInfo: data["threatInfo"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatInfo(data["threatInfo"]) : undefined,
  };
}

export interface GoogleSecuritySafebrowsingV4FindThreatMatchesResponse {
  /**
   * The threat list matches.
   */
  matches?: GoogleSecuritySafebrowsingV4ThreatMatch[];
}

function serializeGoogleSecuritySafebrowsingV4FindThreatMatchesResponse(data: any): GoogleSecuritySafebrowsingV4FindThreatMatchesResponse {
  return {
    ...data,
    matches: data["matches"] !== undefined ? data["matches"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatMatch(item))) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4FindThreatMatchesResponse(data: any): GoogleSecuritySafebrowsingV4FindThreatMatchesResponse {
  return {
    ...data,
    matches: data["matches"] !== undefined ? data["matches"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatMatch(item))) : undefined,
  };
}

export interface GoogleSecuritySafebrowsingV4ListThreatListsResponse {
  /**
   * The lists available for download by the client.
   */
  threatLists?: GoogleSecuritySafebrowsingV4ThreatListDescriptor[];
}

/**
 * The uncompressed threat entries in hash format of a particular prefix
 * length. Hashes can be anywhere from 4 to 32 bytes in size. A large majority
 * are 4 bytes, but some hashes are lengthened if they collide with the hash of
 * a popular URL. Used for sending ThreatEntrySet to clients that do not support
 * compression, or when sending non-4-byte hashes to clients that do support
 * compression.
 */
export interface GoogleSecuritySafebrowsingV4RawHashes {
  /**
   * The number of bytes for each prefix encoded below. This field can be
   * anywhere from 4 (shortest prefix) to 32 (full SHA256 hash).
   */
  prefixSize?: number;
  /**
   * The hashes, in binary format, concatenated into one long string. Hashes
   * are sorted in lexicographic order. For JSON API users, hashes are
   * base64-encoded.
   */
  rawHashes?: Uint8Array;
}

function serializeGoogleSecuritySafebrowsingV4RawHashes(data: any): GoogleSecuritySafebrowsingV4RawHashes {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? encodeBase64(data["rawHashes"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4RawHashes(data: any): GoogleSecuritySafebrowsingV4RawHashes {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? decodeBase64(data["rawHashes"] as string) : undefined,
  };
}

/**
 * A set of raw indices to remove from a local list.
 */
export interface GoogleSecuritySafebrowsingV4RawIndices {
  /**
   * The indices to remove from a lexicographically-sorted local list.
   */
  indices?: number[];
}

/**
 * The Rice-Golomb encoded data. Used for sending compressed 4-byte hashes or
 * compressed removal indices.
 */
export interface GoogleSecuritySafebrowsingV4RiceDeltaEncoding {
  /**
   * The encoded deltas that are encoded using the Golomb-Rice coder.
   */
  encodedData?: Uint8Array;
  /**
   * The offset of the first entry in the encoded data, or, if only a single
   * integer was encoded, that single integer's value. If the field is empty or
   * missing, assume zero.
   */
  firstValue?: bigint;
  /**
   * The number of entries that are delta encoded in the encoded data. If only
   * a single integer was encoded, this will be zero and the single value will
   * be stored in `first_value`.
   */
  numEntries?: number;
  /**
   * The Golomb-Rice parameter, which is a number between 2 and 28. This field
   * is missing (that is, zero) if `num_entries` is zero.
   */
  riceParameter?: number;
}

function serializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data: any): GoogleSecuritySafebrowsingV4RiceDeltaEncoding {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? encodeBase64(data["encodedData"]) : undefined,
    firstValue: data["firstValue"] !== undefined ? String(data["firstValue"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data: any): GoogleSecuritySafebrowsingV4RiceDeltaEncoding {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? decodeBase64(data["encodedData"] as string) : undefined,
    firstValue: data["firstValue"] !== undefined ? BigInt(data["firstValue"]) : undefined,
  };
}

/**
 * An individual threat; for example, a malicious URL or its hash
 * representation. Only one of these fields should be set.
 */
export interface GoogleSecuritySafebrowsingV4ThreatEntry {
  /**
   * The digest of an executable in SHA256 format. The API supports both binary
   * and hex digests. For JSON requests, digests are base64-encoded.
   */
  digest?: Uint8Array;
  /**
   * A hash prefix, consisting of the most significant 4-32 bytes of a SHA256
   * hash. This field is in binary format. For JSON requests, hashes are
   * base64-encoded.
   */
  hash?: Uint8Array;
  /**
   * A URL.
   */
  url?: string;
}

function serializeGoogleSecuritySafebrowsingV4ThreatEntry(data: any): GoogleSecuritySafebrowsingV4ThreatEntry {
  return {
    ...data,
    digest: data["digest"] !== undefined ? encodeBase64(data["digest"]) : undefined,
    hash: data["hash"] !== undefined ? encodeBase64(data["hash"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatEntry(data: any): GoogleSecuritySafebrowsingV4ThreatEntry {
  return {
    ...data,
    digest: data["digest"] !== undefined ? decodeBase64(data["digest"] as string) : undefined,
    hash: data["hash"] !== undefined ? decodeBase64(data["hash"] as string) : undefined,
  };
}

/**
 * The metadata associated with a specific threat entry. The client is expected
 * to know the metadata key/value pairs associated with each threat type.
 */
export interface GoogleSecuritySafebrowsingV4ThreatEntryMetadata {
  /**
   * The metadata entries.
   */
  entries?: GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry[];
}

function serializeGoogleSecuritySafebrowsingV4ThreatEntryMetadata(data: any): GoogleSecuritySafebrowsingV4ThreatEntryMetadata {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry(item))) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatEntryMetadata(data: any): GoogleSecuritySafebrowsingV4ThreatEntryMetadata {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry(item))) : undefined,
  };
}

/**
 * A single metadata entry.
 */
export interface GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry {
  /**
   * The metadata entry key. For JSON requests, the key is base64-encoded.
   */
  key?: Uint8Array;
  /**
   * The metadata entry value. For JSON requests, the value is base64-encoded.
   */
  value?: Uint8Array;
}

function serializeGoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry(data: any): GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? encodeBase64(data["key"]) : undefined,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry(data: any): GoogleSecuritySafebrowsingV4ThreatEntryMetadataMetadataEntry {
  return {
    ...data,
    key: data["key"] !== undefined ? decodeBase64(data["key"] as string) : undefined,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * A set of threats that should be added or removed from a client's local
 * database.
 */
export interface GoogleSecuritySafebrowsingV4ThreatEntrySet {
  /**
   * The compression type for the entries in this set.
   */
  compressionType?:  | "COMPRESSION_TYPE_UNSPECIFIED" | "RAW" | "RICE";
  /**
   * The raw SHA256-formatted entries.
   */
  rawHashes?: GoogleSecuritySafebrowsingV4RawHashes;
  /**
   * The raw removal indices for a local list.
   */
  rawIndices?: GoogleSecuritySafebrowsingV4RawIndices;
  /**
   * The encoded 4-byte prefixes of SHA256-formatted entries, using a
   * Golomb-Rice encoding. The hashes are converted to uint32, sorted in
   * ascending order, then delta encoded and stored as encoded_data.
   */
  riceHashes?: GoogleSecuritySafebrowsingV4RiceDeltaEncoding;
  /**
   * The encoded local, lexicographically-sorted list indices, using a
   * Golomb-Rice encoding. Used for sending compressed removal indices. The
   * removal indices (uint32) are sorted in ascending order, then delta encoded
   * and stored as encoded_data.
   */
  riceIndices?: GoogleSecuritySafebrowsingV4RiceDeltaEncoding;
}

function serializeGoogleSecuritySafebrowsingV4ThreatEntrySet(data: any): GoogleSecuritySafebrowsingV4ThreatEntrySet {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? serializeGoogleSecuritySafebrowsingV4RawHashes(data["rawHashes"]) : undefined,
    riceHashes: data["riceHashes"] !== undefined ? serializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data["riceHashes"]) : undefined,
    riceIndices: data["riceIndices"] !== undefined ? serializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data["riceIndices"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatEntrySet(data: any): GoogleSecuritySafebrowsingV4ThreatEntrySet {
  return {
    ...data,
    rawHashes: data["rawHashes"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4RawHashes(data["rawHashes"]) : undefined,
    riceHashes: data["riceHashes"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data["riceHashes"]) : undefined,
    riceIndices: data["riceIndices"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4RiceDeltaEncoding(data["riceIndices"]) : undefined,
  };
}

export interface GoogleSecuritySafebrowsingV4ThreatHit {
  /**
   * Client-reported identification.
   */
  clientInfo?: GoogleSecuritySafebrowsingV4ClientInfo;
  /**
   * The threat entry responsible for the hit. Full hash should be reported for
   * hash-based hits.
   */
  entry?: GoogleSecuritySafebrowsingV4ThreatEntry;
  /**
   * The platform type reported.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME";
  /**
   * The resources related to the threat hit.
   */
  resources?: GoogleSecuritySafebrowsingV4ThreatHitThreatSource[];
  /**
   * The threat type reported.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS";
  /**
   * Details about the user that encountered the threat.
   */
  userInfo?: GoogleSecuritySafebrowsingV4ThreatHitUserInfo;
}

function serializeGoogleSecuritySafebrowsingV4ThreatHit(data: any): GoogleSecuritySafebrowsingV4ThreatHit {
  return {
    ...data,
    entry: data["entry"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatEntry(data["entry"]) : undefined,
    userInfo: data["userInfo"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatHitUserInfo(data["userInfo"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatHit(data: any): GoogleSecuritySafebrowsingV4ThreatHit {
  return {
    ...data,
    entry: data["entry"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatEntry(data["entry"]) : undefined,
    userInfo: data["userInfo"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatHitUserInfo(data["userInfo"]) : undefined,
  };
}

/**
 * A single resource related to a threat hit.
 */
export interface GoogleSecuritySafebrowsingV4ThreatHitThreatSource {
  /**
   * Referrer of the resource. Only set if the referrer is available.
   */
  referrer?: string;
  /**
   * The remote IP of the resource in ASCII format. Either IPv4 or IPv6.
   */
  remoteIp?: string;
  /**
   * The type of source reported.
   */
  type?:  | "THREAT_SOURCE_TYPE_UNSPECIFIED" | "MATCHING_URL" | "TAB_URL" | "TAB_REDIRECT" | "TAB_RESOURCE";
  /**
   * The URL of the resource.
   */
  url?: string;
}

/**
 * Details about the user that encountered the threat.
 */
export interface GoogleSecuritySafebrowsingV4ThreatHitUserInfo {
  /**
   * The UN M.49 region code associated with the user's location.
   */
  regionCode?: string;
  /**
   * Unique user identifier defined by the client.
   */
  userId?: Uint8Array;
}

function serializeGoogleSecuritySafebrowsingV4ThreatHitUserInfo(data: any): GoogleSecuritySafebrowsingV4ThreatHitUserInfo {
  return {
    ...data,
    userId: data["userId"] !== undefined ? encodeBase64(data["userId"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatHitUserInfo(data: any): GoogleSecuritySafebrowsingV4ThreatHitUserInfo {
  return {
    ...data,
    userId: data["userId"] !== undefined ? decodeBase64(data["userId"] as string) : undefined,
  };
}

/**
 * The information regarding one or more threats that a client submits when
 * checking for matches in threat lists.
 */
export interface GoogleSecuritySafebrowsingV4ThreatInfo {
  /**
   * The platform types to be checked.
   */
  platformTypes?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME"[];
  /**
   * The threat entries to be checked.
   */
  threatEntries?: GoogleSecuritySafebrowsingV4ThreatEntry[];
  /**
   * The entry types to be checked.
   */
  threatEntryTypes?:  | "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT"[];
  /**
   * The threat types to be checked.
   */
  threatTypes?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS"[];
}

function serializeGoogleSecuritySafebrowsingV4ThreatInfo(data: any): GoogleSecuritySafebrowsingV4ThreatInfo {
  return {
    ...data,
    threatEntries: data["threatEntries"] !== undefined ? data["threatEntries"].map((item: any) => (serializeGoogleSecuritySafebrowsingV4ThreatEntry(item))) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatInfo(data: any): GoogleSecuritySafebrowsingV4ThreatInfo {
  return {
    ...data,
    threatEntries: data["threatEntries"] !== undefined ? data["threatEntries"].map((item: any) => (deserializeGoogleSecuritySafebrowsingV4ThreatEntry(item))) : undefined,
  };
}

/**
 * Describes an individual threat list. A list is defined by three parameters:
 * the type of threat posed, the type of platform targeted by the threat, and
 * the type of entries in the list.
 */
export interface GoogleSecuritySafebrowsingV4ThreatListDescriptor {
  /**
   * The platform type targeted by the list's entries.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME";
  /**
   * The entry types contained in the list.
   */
  threatEntryType?:  | "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT";
  /**
   * The threat type posed by the list's entries.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS";
}

/**
 * A match when checking a threat entry in the Safe Browsing threat lists.
 */
export interface GoogleSecuritySafebrowsingV4ThreatMatch {
  /**
   * The cache lifetime for the returned match. Clients must not cache this
   * response for more than this duration to avoid false positives.
   */
  cacheDuration?: number /* Duration */;
  /**
   * The platform type matching this threat.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WINDOWS" | "LINUX" | "ANDROID" | "OSX" | "IOS" | "ANY_PLATFORM" | "ALL_PLATFORMS" | "CHROME";
  /**
   * The threat matching this threat.
   */
  threat?: GoogleSecuritySafebrowsingV4ThreatEntry;
  /**
   * Optional metadata associated with this threat.
   */
  threatEntryMetadata?: GoogleSecuritySafebrowsingV4ThreatEntryMetadata;
  /**
   * The threat entry type matching this threat.
   */
  threatEntryType?:  | "THREAT_ENTRY_TYPE_UNSPECIFIED" | "URL" | "EXECUTABLE" | "IP_RANGE" | "CHROME_EXTENSION" | "FILENAME" | "CERT";
  /**
   * The threat type matching this threat.
   */
  threatType?:  | "THREAT_TYPE_UNSPECIFIED" | "MALWARE" | "SOCIAL_ENGINEERING" | "UNWANTED_SOFTWARE" | "POTENTIALLY_HARMFUL_APPLICATION" | "SOCIAL_ENGINEERING_INTERNAL" | "API_ABUSE" | "MALICIOUS_BINARY" | "CSD_WHITELIST" | "CSD_DOWNLOAD_WHITELIST" | "CLIENT_INCIDENT" | "CLIENT_INCIDENT_WHITELIST" | "APK_MALWARE_OFFLINE" | "SUBRESOURCE_FILTER" | "SUSPICIOUS" | "TRICK_TO_BILL" | "HIGH_CONFIDENCE_ALLOWLIST" | "ACCURACY_TIPS";
}

function serializeGoogleSecuritySafebrowsingV4ThreatMatch(data: any): GoogleSecuritySafebrowsingV4ThreatMatch {
  return {
    ...data,
    cacheDuration: data["cacheDuration"] !== undefined ? data["cacheDuration"] : undefined,
    threat: data["threat"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatEntry(data["threat"]) : undefined,
    threatEntryMetadata: data["threatEntryMetadata"] !== undefined ? serializeGoogleSecuritySafebrowsingV4ThreatEntryMetadata(data["threatEntryMetadata"]) : undefined,
  };
}

function deserializeGoogleSecuritySafebrowsingV4ThreatMatch(data: any): GoogleSecuritySafebrowsingV4ThreatMatch {
  return {
    ...data,
    cacheDuration: data["cacheDuration"] !== undefined ? data["cacheDuration"] : undefined,
    threat: data["threat"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatEntry(data["threat"]) : undefined,
    threatEntryMetadata: data["threatEntryMetadata"] !== undefined ? deserializeGoogleSecuritySafebrowsingV4ThreatEntryMetadata(data["threatEntryMetadata"]) : undefined,
  };
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
