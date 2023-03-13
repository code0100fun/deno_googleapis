// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Knowledge Graph Search API Client for Deno
 * ==========================================
 * 
 * Searches the Google Knowledge Graph for entities.
 * 
 * Docs: https://developers.google.com/knowledge-graph/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Searches the Google Knowledge Graph for entities.
 */
export class kgSearch {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://kgsearch.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Searches Knowledge Graph for entities that match the constraints. A list
   * of matched entities will be returned in response, which will be in JSON-LD
   * format and compatible with http://schema.org
   *
   */
  async entitiesSearch(opts: EntitiesSearchOptions = {}): Promise<SearchResponse> {
    const url = new URL(`${this.#baseUrl}v1/entities:search`);
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.indent !== undefined) {
      url.searchParams.append("indent", String(opts.indent));
    }
    if (opts.languages !== undefined) {
      url.searchParams.append("languages", String(opts.languages));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.prefix !== undefined) {
      url.searchParams.append("prefix", String(opts.prefix));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.types !== undefined) {
      url.searchParams.append("types", String(opts.types));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchResponse;
  }
}

/**
 * Additional options for kgSearch#entitiesSearch.
 */
export interface EntitiesSearchOptions {
  /**
   * The list of entity id to be used for search instead of query string. To
   * specify multiple ids in the HTTP request, repeat the parameter in the URL
   * as in ...?ids=A&ids=B
   */
  ids?: string;
  /**
   * Enables indenting of json results.
   */
  indent?: boolean;
  /**
   * The list of language codes (defined in ISO 693) to run the query with,
   * e.g. 'en'.
   */
  languages?: string;
  /**
   * Limits the number of entities to be returned.
   */
  limit?: number;
  /**
   * Enables prefix match against names and aliases of entities
   */
  prefix?: boolean;
  /**
   * The literal query string for search.
   */
  query?: string;
  /**
   * Restricts returned entities with these types, e.g. Person (as defined in
   * http://schema.org/Person). If multiple types are specified, returned
   * entities will contain one or more of these types.
   */
  types?: string;
}

/**
 * Response message includes the context and a list of matching results which
 * contain the detail of associated entities.
 */
export interface SearchResponse {
  /**
   * The local context applicable for the response. See more details at
   * http://www.w3.org/TR/json-ld/#context-definitions.
   */
  @context?: any;
  /**
   * The schema type of top-level JSON-LD object, e.g. ItemList.
   */
  @type?: any;
  /**
   * The item list of search results.
   */
  itemListElement?: any[];
}