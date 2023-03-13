// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Accelerated Mobile Pages (AMP) URL API Client for Deno
 * ======================================================
 * 
 * Retrieves the list of AMP URLs (and equivalent AMP Cache URLs) for a given list of public URL(s). 
 * 
 * Docs: https://developers.google.com/amp/cache/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Retrieves the list of AMP URLs (and equivalent AMP Cache URLs) for a given
 * list of public URL(s).
 */
export class AcceleratedMobilepageURL {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://acceleratedmobilepageurl.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns AMP URL(s) and equivalent [AMP Cache
   * URL(s)](/amp/cache/overview#amp-cache-url-format).
   *
   */
  async ampUrlsBatchGet(req: BatchGetAmpUrlsRequest): Promise<BatchGetAmpUrlsResponse> {
    const url = new URL(`${this.#baseUrl}v1/ampUrls:batchGet`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchGetAmpUrlsResponse;
  }
}

/**
 * AMP URL response for a requested URL.
 */
export interface AmpUrl {
  /**
   * The AMP URL pointing to the publisher's web server.
   */
  ampUrl?: string;
  /**
   * The [AMP Cache URL](/amp/cache/overview#amp-cache-url-format) pointing to
   * the cached document in the Google AMP Cache.
   */
  cdnAmpUrl?: string;
  /**
   * The original non-AMP URL.
   */
  originalUrl?: string;
}

/**
 * AMP URL Error resource for a requested URL that couldn't be found.
 */
export interface AmpUrlError {
  /**
   * The error code of an API call.
   */
  errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "INPUT_URL_NOT_FOUND" | "NO_AMP_URL" | "APPLICATION_ERROR" | "URL_IS_VALID_AMP" | "URL_IS_INVALID_AMP";
  /**
   * An optional descriptive error message.
   */
  errorMessage?: string;
  /**
   * The original non-AMP URL.
   */
  originalUrl?: string;
}

/**
 * AMP URL request for a batch of URLs.
 */
export interface BatchGetAmpUrlsRequest {
  /**
   * The lookup_strategy being requested.
   */
  lookupStrategy?:  | "FETCH_LIVE_DOC" | "IN_INDEX_DOC";
  /**
   * List of URLs to look up for the paired AMP URLs. The URLs are
   * case-sensitive. Up to 50 URLs per lookup (see [Usage
   * Limits](/amp/cache/reference/limits)).
   */
  urls?: string[];
}

/**
 * Batch AMP URL response.
 */
export interface BatchGetAmpUrlsResponse {
  /**
   * For each URL in BatchAmpUrlsRequest, the URL response. The response might
   * not be in the same order as URLs in the batch request. If
   * BatchAmpUrlsRequest contains duplicate URLs, AmpUrl is generated only once.
   */
  ampUrls?: AmpUrl[];
  /**
   * The errors for requested URLs that have no AMP URL.
   */
  urlErrors?: AmpUrlError[];
}