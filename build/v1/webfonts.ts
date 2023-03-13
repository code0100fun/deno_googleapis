// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Web Fonts Developer API Client for Deno
 * =======================================
 * 
 * The Google Web Fonts Developer API lets you retrieve information about web fonts served by Google.
 * 
 * Docs: https://developers.google.com/fonts/docs/developer_api
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Web Fonts Developer API lets you retrieve information about web
 * fonts served by Google.
 */
export class WebFonts {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://webfonts.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves the list of fonts currently served by the Google Fonts Developer
   * API.
   *
   */
  async webfontsList(opts: WebfontsListOptions = {}): Promise<WebfontList> {
    const url = new URL(`${this.#baseUrl}v1/webfonts`);
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WebfontList;
  }
}

/**
 * Metadata describing a family of fonts.
 */
export interface Webfont {
  /**
   * The category of the font.
   */
  category?: string;
  /**
   * The name of the font.
   */
  family?: string;
  /**
   * The font files (with all supported scripts) for each one of the available
   * variants, as a key : value map.
   */
  files?: {
    [key: string]: string
  };
  /**
   * This kind represents a webfont object in the webfonts service.
   */
  kind?: string;
  /**
   * The date (format "yyyy-MM-dd") the font was modified for the last time.
   */
  lastModified?: string;
  /**
   * The scripts supported by the font.
   */
  subsets?: string[];
  /**
   * The available variants for the font.
   */
  variants?: string[];
  /**
   * The font version.
   */
  version?: string;
}

/**
 * Response containing the list of fonts currently served by the Google Fonts
 * API.
 */
export interface WebfontList {
  /**
   * The list of fonts currently served by the Google Fonts API.
   */
  items?: Webfont[];
  /**
   * This kind represents a list of webfont objects in the webfonts service.
   */
  kind?: string;
}

/**
 * Additional options for WebFonts#webfontsList.
 */
export interface WebfontsListOptions {
  /**
   * Enables sorting of the list.
   */
  sort?:  | "SORT_UNDEFINED" | "ALPHA" | "DATE" | "POPULARITY" | "STYLE" | "TRENDING";
}