// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Groups Migration API Client for Deno
 * ====================================
 * 
 * The Groups Migration API allows domain administrators to archive emails into Google groups.
 * 
 * Docs: https://developers.google.com/google-apps/groups-migration/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Groups Migration API allows domain administrators to archive emails into
 * Google groups.
 */
export class GroupsMigration {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://groupsmigration.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Inserts a new mail into the archive of the Google group.
   *
   * @param groupId The group ID
   */
  async archiveInsert(groupId: string): Promise<Groups> {
    const url = new URL(`${this.#baseUrl}groups/v1/groups/${ groupId }/archive`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Groups;
  }
}

/**
 * JSON response template for groups migration API.
 */
export interface Groups {
  /**
   * The kind of insert resource this is.
   */
  kind?: string;
  /**
   * The status of the insert request.
   */
  responseCode?: string;
}