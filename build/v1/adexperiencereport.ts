// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Ad Experience Report API Client for Deno
 * ========================================
 * 
 * Views Ad Experience Report data, and gets a list of sites that have a significant number of annoying ads.
 * 
 * Docs: https://developers.google.com/ad-experience-report/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Views Ad Experience Report data, and gets a list of sites that have a
 * significant number of annoying ads.
 */
export class AdExperienceReport {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://adexperiencereport.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a site's Ad Experience Report summary.
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
   * Lists sites that are failing in the Ad Experience Report on at least one
   * platform.
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
 * A site's Ad Experience Report summary on a single platform.
 */
export interface PlatformSummary {
  /**
   * The site's Ad Experience Report status on this platform.
   */
  betterAdsStatus?:  | "UNKNOWN" | "PASSING" | "WARNING" | "FAILING";
  /**
   * The time at which
   * [enforcement](https://support.google.com/webtools/answer/7308033) against
   * the site began or will begin on this platform. Not set when the
   * filter_status is OFF.
   */
  enforcementTime?: Date;
  /**
   * The site's [enforcement
   * status](https://support.google.com/webtools/answer/7308033) on this
   * platform.
   */
  filterStatus?:  | "UNKNOWN" | "ON" | "OFF" | "PAUSED" | "PENDING";
  /**
   * The time at which the site's status last changed on this platform.
   */
  lastChangeTime?: Date;
  /**
   * The site's regions on this platform. No longer populated, because there is
   * no longer any semantic difference between sites in different regions.
   */
  region?:  | "REGION_UNKNOWN" | "REGION_A" | "REGION_B" | "REGION_C"[];
  /**
   * A link to the full Ad Experience Report for the site on this platform..
   * Not set in ViolatingSitesResponse. Note that you must complete the [Search
   * Console verification
   * process](https://support.google.com/webmasters/answer/9008080) for the site
   * before you can access the full report.
   */
  reportUrl?: string;
  /**
   * Whether the site is currently under review on this platform.
   */
  underReview?: boolean;
}

function serializePlatformSummary(data: any): PlatformSummary {
  return {
    ...data,
    enforcementTime: data["enforcementTime"] !== undefined ? data["enforcementTime"].toISOString() : undefined,
    lastChangeTime: data["lastChangeTime"] !== undefined ? data["lastChangeTime"].toISOString() : undefined,
  };
}

function deserializePlatformSummary(data: any): PlatformSummary {
  return {
    ...data,
    enforcementTime: data["enforcementTime"] !== undefined ? new Date(data["enforcementTime"]) : undefined,
    lastChangeTime: data["lastChangeTime"] !== undefined ? new Date(data["lastChangeTime"]) : undefined,
  };
}

/**
 * Response message for GetSiteSummary.
 */
export interface SiteSummaryResponse {
  /**
   * The site's Ad Experience Report summary on desktop.
   */
  desktopSummary?: PlatformSummary;
  /**
   * The site's Ad Experience Report summary on mobile.
   */
  mobileSummary?: PlatformSummary;
  /**
   * The name of the reviewed site, e.g. `google.com`.
   */
  reviewedSite?: string;
}

function serializeSiteSummaryResponse(data: any): SiteSummaryResponse {
  return {
    ...data,
    desktopSummary: data["desktopSummary"] !== undefined ? serializePlatformSummary(data["desktopSummary"]) : undefined,
    mobileSummary: data["mobileSummary"] !== undefined ? serializePlatformSummary(data["mobileSummary"]) : undefined,
  };
}

function deserializeSiteSummaryResponse(data: any): SiteSummaryResponse {
  return {
    ...data,
    desktopSummary: data["desktopSummary"] !== undefined ? deserializePlatformSummary(data["desktopSummary"]) : undefined,
    mobileSummary: data["mobileSummary"] !== undefined ? deserializePlatformSummary(data["mobileSummary"]) : undefined,
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