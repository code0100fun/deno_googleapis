// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Custom App Publishing API Client for Deno
 * =====================================================
 * 
 * API to create and publish custom Android apps
 * 
 * Docs: https://developers.google.com/android/work/play/custom-app-api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API to create and publish custom Android apps
 */
export class PlayCustomApp {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://playcustomapp.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new custom app.
   *
   * @param account Developer account ID.
   */
  async accountsCustomAppsCreate(account: bigint, req: CustomApp): Promise<CustomApp> {
    account = String(account);
    const url = new URL(`${this.#baseUrl}playcustomapp/v1/accounts/${ account }/customApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomApp;
  }
}

/**
 * This resource represents a custom app.
 */
export interface CustomApp {
  /**
   * Default listing language in BCP 47 format.
   */
  languageCode?: string;
  /**
   * Organizations to which the custom app should be made available. If the
   * request contains any organizations, then the app will be restricted to only
   * these organizations. To support the organization linked to the developer
   * account, the organization ID should be provided explicitly together with
   * other organizations. If no organizations are provided, then the app is only
   * available to the organization linked to the developer account.
   */
  organizations?: Organization[];
  /**
   * Output only. Package name of the created Android app. Only present in the
   * API response.
   */
  readonly packageName?: string;
  /**
   * Title for the Android app.
   */
  title?: string;
}

/**
 * Represents an organization that can access a custom app.
 */
export interface Organization {
  /**
   * Required. ID of the organization.
   */
  organizationId?: string;
  /**
   * Optional. A human-readable name of the organization, to help recognize the
   * organization.
   */
  organizationName?: string;
}