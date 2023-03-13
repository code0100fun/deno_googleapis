// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Abusive Experience Report API Client for Deno
 * =============================================
 * 
 * Views Abusive Experience Report data, and gets a list of sites that have a significant number of abusive experiences.
 * 
 * Docs: https://developers.google.com/abusive-experience-report/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Views Abusive Experience Report data, and gets a list of sites that have a
 * significant number of abusive experiences.
 */
export class AbusiveExperienceReport {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://abusiveexperiencereport.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a site's Abusive Experience Report summary.
   *
   * @param name Required. The name of the site whose summary to get, e.g. `sites/http%3A%2F%2Fwww.google.com%2F`. Format: `sites/{site}`
   */
  async sitesGet(name: string): Promise<SiteSummaryResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSiteSummaryResponse(data);
  }

  /**
   * Lists sites that are failing in the Abusive Experience Report.
   *
   */
  async violatingSitesList(): Promise<ViolatingSitesResponse> {
    const url = new URL(`${this.#baseUrl}v1/violatingSites`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeViolatingSitesResponse(data);
  }
}

/**
 * Response message for GetSiteSummary.
 */
export interface SiteSummaryResponse {
  /**
   * The site's Abusive Experience Report status.
   */
  abusiveStatus?:  | "UNKNOWN" | "PASSING" | "FAILING";
  /**
   * The time at which
   * [enforcement](https://support.google.com/webtools/answer/7538608) against
   * the site began or will begin. Not set when the filter_status is OFF.
   */
  enforcementTime?: Date;
  /**
   * The site's [enforcement
   * status](https://support.google.com/webtools/answer/7538608).
   */
  filterStatus?:  | "UNKNOWN" | "ON" | "OFF" | "PAUSED" | "PENDING";
  /**
   * The time at which the site's status last changed.
   */
  lastChangeTime?: Date;
  /**
   * A link to the full Abusive Experience Report for the site. Not set in
   * ViolatingSitesResponse. Note that you must complete the [Search Console
   * verification process](https://support.google.com/webmasters/answer/9008080)
   * for the site before you can access the full report.
   */
  reportUrl?: string;
  /**
   * The name of the reviewed site, e.g. `google.com`.
   */
  reviewedSite?: string;
  /**
   * Whether the site is currently under review.
   */
  underReview?: boolean;
}

function serializeSiteSummaryResponse(data: any): SiteSummaryResponse {
  return {
    ...data,
    enforcementTime: data["enforcementTime"] !== undefined ? data["enforcementTime"].toISOString() : undefined,
    lastChangeTime: data["lastChangeTime"] !== undefined ? data["lastChangeTime"].toISOString() : undefined,
  };
}

function deserializeSiteSummaryResponse(data: any): SiteSummaryResponse {
  return {
    ...data,
    enforcementTime: data["enforcementTime"] !== undefined ? new Date(data["enforcementTime"]) : undefined,
    lastChangeTime: data["lastChangeTime"] !== undefined ? new Date(data["lastChangeTime"]) : undefined,
  };
}

/**
 * Response message for ListViolatingSites.
 */
export interface ViolatingSitesResponse {
  /**
   * The list of violating sites.
   */
  violatingSites?: SiteSummaryResponse[];
}

function serializeViolatingSitesResponse(data: any): ViolatingSitesResponse {
  return {
    ...data,
    violatingSites: data["violatingSites"] !== undefined ? data["violatingSites"].map((item: any) => (serializeSiteSummaryResponse(item))) : undefined,
  };
}

function deserializeViolatingSitesResponse(data: any): ViolatingSitesResponse {
  return {
    ...data,
    violatingSites: data["violatingSites"] !== undefined ? data["violatingSites"].map((item: any) => (deserializeSiteSummaryResponse(item))) : undefined,
  };
}