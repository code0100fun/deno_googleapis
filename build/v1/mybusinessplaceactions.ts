// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Place Actions API Client for Deno
 * =============================================
 * 
 * The My Business Place Actions API provides an interface for managing place action links of a location on Google. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Place Actions API provides an interface for managing place
 * action links of a location on Google. Note - If you have a quota of 0 after
 * enabling the API, please request for GBP API access.
 */
export class MyBusinessPlaceActions {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessplaceactions.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a place action link associated with the specified location, and
   * returns it. The request is considered duplicate if the `parent`,
   * `place_action_link.uri` and `place_action_link.place_action_type` are the
   * same as a previous request.
   *
   * @param parent Required. The resource name of the location where to create this place action link. `locations/{location_id}`.
   */
  async locationsPlaceActionLinksCreate(parent: string, req: PlaceActionLink): Promise<PlaceActionLink> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/placeActionLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as PlaceActionLink;
  }

  /**
   * Deletes a place action link from the specified location.
   *
   * @param name Required. The resource name of the place action link to remove from the location.
   */
  async locationsPlaceActionLinksDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified place action link.
   *
   * @param name Required. The name of the place action link to fetch.
   */
  async locationsPlaceActionLinksGet(name: string): Promise<PlaceActionLink> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PlaceActionLink;
  }

  /**
   * Lists the place action links for the specified location.
   *
   * @param parent Required. The name of the location whose place action links will be listed. `locations/{location_id}`.
   */
  async locationsPlaceActionLinksList(parent: string, opts: LocationsPlaceActionLinksListOptions = {}): Promise<ListPlaceActionLinksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/placeActionLinks`);
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
    return data as ListPlaceActionLinksResponse;
  }

  /**
   * Updates the specified place action link and returns it.
   *
   * @param name Optional. The resource name, in the format `locations/{location_id}/placeActionLinks/{place_action_link_id}`. The name field will only be considered in UpdatePlaceActionLink and DeletePlaceActionLink requests for updating and deleting links respectively. However, it will be ignored in CreatePlaceActionLink request, where `place_action_link_id` will be assigned by the server on successful creation of a new link and returned as part of the response.
   */
  async locationsPlaceActionLinksPatch(name: string, req: PlaceActionLink, opts: LocationsPlaceActionLinksPatchOptions = {}): Promise<PlaceActionLink> {
    opts = serializeLocationsPlaceActionLinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as PlaceActionLink;
  }

  /**
   * Returns the list of available place action types for a location or
   * country.
   *
   */
  async placeActionTypeMetadataList(opts: PlaceActionTypeMetadataListOptions = {}): Promise<ListPlaceActionTypeMetadataResponse> {
    const url = new URL(`${this.#baseUrl}v1/placeActionTypeMetadata`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as ListPlaceActionTypeMetadataResponse;
  }
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * Response message for PlaceActions.ListPlaceActionLinks.
 */
export interface ListPlaceActionLinksResponse {
  /**
   * If there are more place action links than the requested page size, then
   * this field is populated with a token to fetch the next page of results.
   */
  nextPageToken?: string;
  /**
   * The returned list of place action links.
   */
  placeActionLinks?: PlaceActionLink[];
}

/**
 * Response message for PlaceActions.ListPlaceActionTypeMetadata.
 */
export interface ListPlaceActionTypeMetadataResponse {
  /**
   * If the number of action types exceeded the requested page size, this field
   * will be populated with a token to fetch the next page on a subsequent call
   * to `placeActionTypeMetadata.list`. If there are no more results, this field
   * will not be present in the response.
   */
  nextPageToken?: string;
  /**
   * A collection of metadata for the available place action types.
   */
  placeActionTypeMetadata?: PlaceActionTypeMetadata[];
}

/**
 * Additional options for MyBusinessPlaceActions#locationsPlaceActionLinksList.
 */
export interface LocationsPlaceActionLinksListOptions {
  /**
   * Optional. A filter constraining the place action links to return. The
   * response includes entries that match the filter. We support only the
   * following filter: 1. place_action_type=XYZ where XYZ is a valid
   * PlaceActionType.
   */
  filter?: string;
  /**
   * Optional. How many place action links to return per page. Default of 10.
   * The minimum is 1.
   */
  pageSize?: number;
  /**
   * Optional. If specified, returns the next page of place action links.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * MyBusinessPlaceActions#locationsPlaceActionLinksPatch.
 */
export interface LocationsPlaceActionLinksPatchOptions {
  /**
   * Required. The specific fields to update. The only editable fields are
   * `uri`, `place_action_type` and `is_preferred`. If the updated link already
   * exists at the same location with the same `place_action_type` and `uri`,
   * fails with an `ALREADY_EXISTS` error.
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsPlaceActionLinksPatchOptions(data: any): LocationsPlaceActionLinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsPlaceActionLinksPatchOptions(data: any): LocationsPlaceActionLinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Represents a place action link and its attributes.
 */
export interface PlaceActionLink {
  /**
   * Output only. The time when the place action link was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Indicates whether this link can be edited by the client.
   */
  readonly isEditable?: boolean;
  /**
   * Optional. Whether this link is preferred by the merchant. Only one link
   * can be marked as preferred per place action type at a location. If a future
   * request marks a different link as preferred for the same place action type,
   * then the current preferred link (if any exists) will lose its preference.
   */
  isPreferred?: boolean;
  /**
   * Optional. The resource name, in the format
   * `locations/{location_id}/placeActionLinks/{place_action_link_id}`. The name
   * field will only be considered in UpdatePlaceActionLink and
   * DeletePlaceActionLink requests for updating and deleting links
   * respectively. However, it will be ignored in CreatePlaceActionLink request,
   * where `place_action_link_id` will be assigned by the server on successful
   * creation of a new link and returned as part of the response.
   */
  name?: string;
  /**
   * Required. The type of place action that can be performed using this link.
   */
  placeActionType?:  | "PLACE_ACTION_TYPE_UNSPECIFIED" | "APPOINTMENT" | "ONLINE_APPOINTMENT" | "DINING_RESERVATION" | "FOOD_ORDERING" | "FOOD_DELIVERY" | "FOOD_TAKEOUT" | "SHOP_ONLINE";
  /**
   * Output only. Specifies the provider type.
   */
  readonly providerType?:  | "PROVIDER_TYPE_UNSPECIFIED" | "MERCHANT" | "AGGREGATOR_3P";
  /**
   * Output only. The time when the place action link was last modified.
   */
  readonly updateTime?: Date;
  /**
   * Required. The link uri. The same uri can be reused for different action
   * types across different locations. However, only one place action link is
   * allowed for each unique combination of (uri, place action type, location).
   */
  uri?: string;
}

/**
 * Metadata for supported place action types.
 */
export interface PlaceActionTypeMetadata {
  /**
   * The localized display name for the attribute, if available; otherwise, the
   * English display name.
   */
  displayName?: string;
  /**
   * The place action type.
   */
  placeActionType?:  | "PLACE_ACTION_TYPE_UNSPECIFIED" | "APPOINTMENT" | "ONLINE_APPOINTMENT" | "DINING_RESERVATION" | "FOOD_ORDERING" | "FOOD_DELIVERY" | "FOOD_TAKEOUT" | "SHOP_ONLINE";
}

/**
 * Additional options for MyBusinessPlaceActions#placeActionTypeMetadataList.
 */
export interface PlaceActionTypeMetadataListOptions {
  /**
   * Optional. A filter constraining the place action types to return metadata
   * for. The response includes entries that match the filter. We support only
   * the following filters: 1. location=XYZ where XYZ is a string indicating the
   * resource name of a location, in the format `locations/{location_id}`. 2.
   * region_code=XYZ where XYZ is a Unicode CLDR region code to find available
   * action types. If no filter is provided, all place action types are
   * returned.
   */
  filter?: string;
  /**
   * Optional. The IETF BCP-47 code of language to get display names in. If
   * this language is not available, they will be provided in English.
   */
  languageCode?: string;
  /**
   * Optional. How many action types to include per page. Default is 10,
   * minimum is 1.
   */
  pageSize?: number;
  /**
   * Optional. If specified, the next page of place action type metadata is
   * retrieved. The `pageToken` is returned when a call to
   * `placeActionTypeMetadata.list` returns more results than can fit into the
   * requested page size.
   */
  pageToken?: string;
}