// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Site Verification API Client for Deno
 * ============================================
 * 
 * Verifies ownership of websites or domains with Google.
 * 
 * Docs: https://developers.google.com/site-verification/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Verifies ownership of websites or domains with Google.
 */
export class SiteVerification {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/siteVerification/v1/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Relinquish ownership of a website or domain.
   *
   * @param id The id of a verified site or domain.
   */
  async webResourceDelete(id: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}webResource/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Get the most current data for a website or domain.
   *
   * @param id The id of a verified site or domain.
   */
  async webResourceGet(id: string): Promise<SiteVerificationWebResourceResource> {
    const url = new URL(`${this.#baseUrl}webResource/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SiteVerificationWebResourceResource;
  }

  /**
   * Get a verification token for placing on a website or domain.
   *
   */
  async webResourceGetToken(req: SiteVerificationWebResourceGettokenRequest): Promise<SiteVerificationWebResourceGettokenResponse> {
    const url = new URL(`${this.#baseUrl}token`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SiteVerificationWebResourceGettokenResponse;
  }

  /**
   * Attempt verification of a website or domain.
   *
   */
  async webResourceInsert(req: SiteVerificationWebResourceResource, opts: WebResourceInsertOptions = {}): Promise<SiteVerificationWebResourceResource> {
    const url = new URL(`${this.#baseUrl}webResource`);
    if (opts.verificationMethod !== undefined) {
      url.searchParams.append("verificationMethod", String(opts.verificationMethod));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SiteVerificationWebResourceResource;
  }

  /**
   * Get the list of your verified websites and domains.
   *
   */
  async webResourceList(): Promise<SiteVerificationWebResourceListResponse> {
    const url = new URL(`${this.#baseUrl}webResource`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SiteVerificationWebResourceListResponse;
  }

  /**
   * Modify the list of owners for your website or domain. This method supports
   * patch semantics.
   *
   * @param id The id of a verified site or domain.
   */
  async webResourcePatch(id: string, req: SiteVerificationWebResourceResource): Promise<SiteVerificationWebResourceResource> {
    const url = new URL(`${this.#baseUrl}webResource/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SiteVerificationWebResourceResource;
  }

  /**
   * Modify the list of owners for your website or domain.
   *
   * @param id The id of a verified site or domain.
   */
  async webResourceUpdate(id: string, req: SiteVerificationWebResourceResource): Promise<SiteVerificationWebResourceResource> {
    const url = new URL(`${this.#baseUrl}webResource/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as SiteVerificationWebResourceResource;
  }
}

export interface SiteVerificationWebResourceGettokenRequest {
  /**
   * The site for which a verification token will be generated.
   */
  site?: {
    identifier?: string;
    type?: string;
  };
  /**
   * The verification method that will be used to verify this site. For sites,
   * 'FILE' or 'META' methods may be used. For domains, only 'DNS' may be used.
   */
  verificationMethod?: string;
}

export interface SiteVerificationWebResourceGettokenResponse {
  /**
   * The verification method to use in conjunction with this token. For FILE,
   * the token should be placed in the top-level directory of the site, stored
   * inside a file of the same name. For META, the token should be placed in the
   * HEAD tag of the default page that is loaded for the site. For DNS, the
   * token should be placed in a TXT record of the domain.
   */
  method?: string;
  /**
   * The verification token. The token must be placed appropriately in order
   * for verification to succeed.
   */
  token?: string;
}

export interface SiteVerificationWebResourceListResponse {
  /**
   * The list of sites that are owned by the authenticated user.
   */
  items?: SiteVerificationWebResourceResource[];
}

export interface SiteVerificationWebResourceResource {
  /**
   * The string used to identify this site. This value should be used in the
   * "id" portion of the REST URL for the Get, Update, and Delete operations.
   */
  id?: string;
  /**
   * The email addresses of all verified owners.
   */
  owners?: string[];
  /**
   * The address and type of a site that is verified or will be verified.
   */
  site?: {
    identifier?: string;
    type?: string;
  };
}

/**
 * Additional options for SiteVerification#webResourceInsert.
 */
export interface WebResourceInsertOptions {
  /**
   * The method to use for verifying a site or domain.
   */
  verificationMethod: string;
}