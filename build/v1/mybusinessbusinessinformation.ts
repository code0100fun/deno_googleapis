// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Business Information API Client for Deno
 * ====================================================
 * 
 * The My Business Business Information API provides an interface for managing business information. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Business Information API provides an interface for managing
 * business information. Note - If you have a quota of 0 after enabling the API,
 * please request for GBP API access.
 */
export class MyBusinessBusinessInformation {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessbusinessinformation.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new Location that will be owned by the logged in user.
   *
   * @param parent Required. The name of the account in which to create this location.
   */
  async accountsLocationsCreate(parent: string, req: Location, opts: AccountsLocationsCreateOptions = {}): Promise<Location> {
    req = serializeLocation(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/locations`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLocation(data);
  }

  /**
   * Lists the locations for the specified account.
   *
   * @param parent Required. The name of the account to fetch locations from. If the parent Account is of AccountType PERSONAL, only Locations that are directly owned by the Account are returned, otherwise it will return all accessible locations from the Account, either directly or indirectly.
   */
  async accountsLocationsList(parent: string, opts: AccountsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    opts = serializeAccountsLocationsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/locations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListLocationsResponse(data);
  }

  /**
   * Returns the list of attributes that would be available for a location with
   * the given primary category and country.
   *
   */
  async attributesList(opts: AttributesListOptions = {}): Promise<ListAttributeMetadataResponse> {
    const url = new URL(`${this.#baseUrl}v1/attributes`);
    if (opts.categoryName !== undefined) {
      url.searchParams.append("categoryName", String(opts.categoryName));
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
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    if (opts.showAll !== undefined) {
      url.searchParams.append("showAll", String(opts.showAll));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAttributeMetadataResponse;
  }

  /**
   * Returns a list of business categories for the provided language and
   * GConcept ids.
   *
   */
  async categoriesBatchGet(opts: CategoriesBatchGetOptions = {}): Promise<BatchGetCategoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/categories:batchGet`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BatchGetCategoriesResponse;
  }

  /**
   * Returns a list of business categories. Search will match the category name
   * but not the category ID. Search only matches the front of a category name
   * (that is, 'food' may return 'Food Court' but not 'Fast Food Restaurant').
   *
   */
  async categoriesList(opts: CategoriesListOptions = {}): Promise<ListCategoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/categories`);
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
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListCategoriesResponse;
  }

  /**
   * Gets the specified chain. Returns `NOT_FOUND` if the chain does not exist.
   *
   * @param name Required. The chain's resource name, in the format `chains/{chain_place_id}`.
   */
  async chainsGet(name: string): Promise<Chain> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Chain;
  }

  /**
   * Searches the chain based on chain name.
   *
   */
  async chainsSearch(opts: ChainsSearchOptions = {}): Promise<SearchChainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/chains:search`);
    if (opts.chainName !== undefined) {
      url.searchParams.append("chainName", String(opts.chainName));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchChainsResponse;
  }

  /**
   * Search all of the possible locations that are a match to the specified
   * request.
   *
   */
  async googleLocationsSearch(req: SearchGoogleLocationsRequest): Promise<SearchGoogleLocationsResponse> {
    req = serializeSearchGoogleLocationsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/googleLocations:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchGoogleLocationsResponse(data);
  }

  /**
   * Associates a location to a place ID. Any previous association is
   * overwritten. This operation is only valid if the location is unverified.
   * The association must be valid, that is, it appears in the list of
   * `SearchGoogleLocations`.
   *
   * @param name Required. The resource name of the location to associate.
   */
  async locationsAssociate(name: string, req: AssociateLocationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:associate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Gets the Google-updated version of the specified location.
   *
   * @param name Required. Google identifier for this location in the form of `locations/{location_id}/attributes`.
   */
  async locationsAttributesGetGoogleUpdated(name: string): Promise<Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getGoogleUpdated`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Attributes;
  }

  /**
   * Clears an association between a location and its place ID. This operation
   * is only valid if the location is unverified.
   *
   * @param name Required. The resource name of the location to disassociate.
   */
  async locationsClearLocationAssociation(name: string, req: ClearLocationAssociationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:clearLocationAssociation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a location. If this location cannot be deleted using the API and
   * it is marked so in the
   * `google.mybusiness.businessinformation.v1.LocationState`, use the [Google
   * Business Profile](https://business.google.com/manage/) website.
   *
   * @param name Required. The name of the location to delete.
   */
  async locationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the specified location.
   *
   * @param name Required. The name of the location to fetch.
   */
  async locationsGet(name: string, opts: LocationsGetOptions = {}): Promise<Location> {
    opts = serializeLocationsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLocation(data);
  }

  /**
   * Looks up all the attributes set for a given location.
   *
   * @param name Required. Google identifier for this location in the form of `locations/{location_id}/attributes`.
   */
  async locationsGetAttributes(name: string): Promise<Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Attributes;
  }

  /**
   * Gets the Google-updated version of the specified location.
   *
   * @param name Required. The name of the location to fetch.
   */
  async locationsGetGoogleUpdated(name: string, opts: LocationsGetGoogleUpdatedOptions = {}): Promise<GoogleUpdatedLocation> {
    opts = serializeLocationsGetGoogleUpdatedOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }:getGoogleUpdated`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleUpdatedLocation(data);
  }

  /**
   * Updates the specified location.
   *
   * @param name Google identifier for this location in the form: `locations/{location_id}`.
   */
  async locationsPatch(name: string, req: Location, opts: LocationsPatchOptions = {}): Promise<Location> {
    req = serializeLocation(req);
    opts = serializeLocationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeLocation(data);
  }

  /**
   * Update attributes for a given location.
   *
   * @param name Required. Google identifier for this location in the form of `locations/{location_id}/attributes`.
   */
  async locationsUpdateAttributes(name: string, req: Attributes, opts: LocationsUpdateAttributesOptions = {}): Promise<Attributes> {
    opts = serializeLocationsUpdateAttributesOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.attributeMask !== undefined) {
      url.searchParams.append("attributeMask", String(opts.attributeMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Attributes;
  }
}

/**
 * Additional options for
 * MyBusinessBusinessInformation#accountsLocationsCreate.
 */
export interface AccountsLocationsCreateOptions {
  /**
   * Optional. A unique request ID for the server to detect duplicated
   * requests. We recommend using UUIDs. Max length is 50 characters.
   */
  requestId?: string;
  /**
   * Optional. If true, the request is validated without actually creating the
   * location.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for MyBusinessBusinessInformation#accountsLocationsList.
 */
export interface AccountsLocationsListOptions {
  /**
   * Optional. A filter constraining the locations to return. The response
   * includes only entries that match the filter. If `filter` is empty, then
   * constraints are applied and all locations (paginated) are retrieved for the
   * requested account. For more information about valid fields and example
   * usage, see [Work with Location Data
   * Guide](https://developers.google.com/my-business/content/location-data#filter_results_when_you_list_locations).
   */
  filter?: string;
  /**
   * Optional. Sorting order for the request. Multiple fields should be
   * comma-separated, following SQL syntax. The default sorting order is
   * ascending. To specify descending order, a suffix " desc" should be added.
   * Valid fields to order_by are title and store_code. For example: "title,
   * store_code desc" or "title" or "store_code desc"
   */
  orderBy?: string;
  /**
   * Optional. How many locations to fetch per page. Default value is 10 if not
   * set. Minimum is 1, and maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If specified, it fetches the next `page` of locations. The page
   * token is returned by previous calls to `ListLocations` when there were more
   * locations than could fit in the requested page size.
   */
  pageToken?: string;
  /**
   * Required. Read mask to specify what fields will be returned in the
   * response.
   */
  readMask?: string /* FieldMask */;
}

function serializeAccountsLocationsListOptions(data: any): AccountsLocationsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeAccountsLocationsListOptions(data: any): AccountsLocationsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional information that is surfaced in AdWords.
 */
export interface AdWordsLocationExtensions {
  /**
   * Required. An alternate phone number to display on AdWords location
   * extensions instead of the location's primary phone number.
   */
  adPhone?: string;
}

/**
 * Request message for Locations.AssociateLocationRequest.
 */
export interface AssociateLocationRequest {
  /**
   * The association to establish. If not set, it indicates no match.
   */
  placeId?: string;
}

/**
 * A location attribute. Attributes provide additional information about a
 * location. The attributes that can be set on a location may vary based on the
 * properties of that location (for example, category). Available attributes are
 * determined by Google and may be added and removed without API changes.
 */
export interface Attribute {
  /**
   * Required. The resource name for this attribute.
   */
  name?: string;
  /**
   * When the attribute value type is REPEATED_ENUM, this contains the
   * attribute value, and the other values fields must be empty.
   */
  repeatedEnumValue?: RepeatedEnumAttributeValue;
  /**
   * When the attribute value type is URL, this field contains the value(s) for
   * this attribute, and the other values fields must be empty.
   */
  uriValues?: UriAttributeValue[];
  /**
   * The values for this attribute. The type of the values supplied must match
   * that expected for that attribute. This is a repeated field where multiple
   * attribute values may be provided. Attribute types only support one value.
   */
  values?: any[];
  /**
   * Output only. The type of value that this attribute contains. This should
   * be used to determine how to interpret the value.
   */
  readonly valueType?:  | "ATTRIBUTE_VALUE_TYPE_UNSPECIFIED" | "BOOL" | "ENUM" | "URL" | "REPEATED_ENUM";
}

/**
 * Metadata for an attribute. Contains display information for the attribute,
 * including a localized name and a heading for grouping related attributes
 * together.
 */
export interface AttributeMetadata {
  /**
   * If true, the attribute is deprecated and should no longer be used. If
   * deprecated, updating this attribute will not result in an error, but
   * updates will not be saved. At some point after being deprecated, the
   * attribute will be removed entirely and it will become an error.
   */
  deprecated?: boolean;
  /**
   * The localized display name for the attribute, if available; otherwise, the
   * English display name.
   */
  displayName?: string;
  /**
   * The localized display name of the group that contains this attribute, if
   * available; otherwise, the English group name. Related attributes are
   * collected into a group and should be displayed together under the heading
   * given here.
   */
  groupDisplayName?: string;
  /**
   * The unique identifier for the attribute.
   */
  parent?: string;
  /**
   * If true, the attribute supports multiple values. If false, only a single
   * value should be provided.
   */
  repeatable?: boolean;
  /**
   * For some types of attributes (for example, enums), a list of supported
   * values and corresponding display names for those values is provided.
   */
  valueMetadata?: AttributeValueMetadata[];
  /**
   * The value type for the attribute. Values set and retrieved should be
   * expected to be of this type.
   */
  valueType?:  | "ATTRIBUTE_VALUE_TYPE_UNSPECIFIED" | "BOOL" | "ENUM" | "URL" | "REPEATED_ENUM";
}

/**
 * A container for all the attributes for a given location.
 */
export interface Attributes {
  /**
   * A collection of attributes that need to be updated.
   */
  attributes?: Attribute[];
  /**
   * Required. Google identifier for this location in the form of
   * `locations/{location_id}/attributes`.
   */
  name?: string;
}

/**
 * Additional options for MyBusinessBusinessInformation#attributesList.
 */
export interface AttributesListOptions {
  /**
   * The primary category stable ID to find available attributes. Must be of
   * the format categories/{category_id}.
   */
  categoryName?: string;
  /**
   * The BCP 47 code of language to get attribute display names in. If this
   * language is not available, they will be provided in English.
   */
  languageCode?: string;
  /**
   * How many attributes to include per page. Default is 200, minimum is 1.
   */
  pageSize?: number;
  /**
   * If specified, the next page of attribute metadata is retrieved.
   */
  pageToken?: string;
  /**
   * Resource name of the location to look up available attributes. If this
   * field is set, category_name, region_code, language_code and show_all are
   * not required and must not be set.
   */
  parent?: string;
  /**
   * The ISO 3166-1 alpha-2 country code to find available attributes.
   */
  regionCode?: string;
  /**
   * Metadata for all available attributes are returned when this field is set
   * to true, disregarding parent and category_name fields. language_code and
   * region_code are required when show_all is set to true.
   */
  showAll?: boolean;
}

/**
 * Metadata for supported attribute values.
 */
export interface AttributeValueMetadata {
  /**
   * The display name for this value, localized where available; otherwise, in
   * English. The value display name is intended to be used in context with the
   * attribute display name. For example, for a "WiFi" enum attribute, this
   * could contain "Paid" to represent paid Wi-Fi.
   */
  displayName?: string;
  /**
   * The attribute value.
   */
  value?: any;
}

/**
 * Response message for BusinessCategories.BatchGetBusinessCategories.
 */
export interface BatchGetCategoriesResponse {
  /**
   * Categories that match the GConcept ids provided in the request. They will
   * not come in the same order as category ids in the request.
   */
  categories?: Category[];
}

/**
 * Represents the time periods that this location is open for business. Holds a
 * collection of TimePeriod instances.
 */
export interface BusinessHours {
  /**
   * Required. A collection of times that this location is open for business.
   * Each period represents a range of hours when the location is open during
   * the week.
   */
  periods?: TimePeriod[];
}

/**
 * A collection of categories that describes the business. During updates, both
 * fields must be set. Clients are prohibited from individually updating the
 * primary or additional categories using the update mask.
 */
export interface Categories {
  /**
   * Optional. Additional categories to describe your business. Categories help
   * your customers find accurate, specific results for services they're
   * interested in. To keep your business information accurate and live, make
   * sure that you use as few categories as possible to describe your overall
   * core business. Choose categories that are as specific as possible, but
   * representative of your main business.
   */
  additionalCategories?: Category[];
  /**
   * Required. Category that best describes the core business this location
   * engages in.
   */
  primaryCategory?: Category;
}

/**
 * Additional options for MyBusinessBusinessInformation#categoriesBatchGet.
 */
export interface CategoriesBatchGetOptions {
  /**
   * Required. The BCP 47 code of language that the category names should be
   * returned in.
   */
  languageCode?: string;
  /**
   * Required. At least one name must be set. The GConcept ids the localized
   * category names should be returned for. To return details for more than one
   * category, repeat this parameter in the request.
   */
  names?: string;
  /**
   * Optional. The ISO 3166-1 alpha-2 country code used to infer non-standard
   * language.
   */
  regionCode?: string;
  /**
   * Required. Specifies which parts to the Category resource should be
   * returned in the response.
   */
  view?:  | "CATEGORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for MyBusinessBusinessInformation#categoriesList.
 */
export interface CategoriesListOptions {
  /**
   * Optional. Filter string from user. The only field that supported is
   * `displayName`. Eg: `filter=displayName=foo`.
   */
  filter?: string;
  /**
   * Required. The BCP 47 code of language.
   */
  languageCode?: string;
  /**
   * Optional. How many categories to fetch per page. Default is 100, minimum
   * is 1, and maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If specified, the next page of categories will be fetched.
   */
  pageToken?: string;
  /**
   * Required. The ISO 3166-1 alpha-2 country code.
   */
  regionCode?: string;
  /**
   * Required. Specifies which parts to the Category resource should be
   * returned in the response.
   */
  view?:  | "CATEGORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * A category describing what this business is (not what it does). For a list
 * of valid category IDs, and the mappings to their human-readable names, see
 * `categories.list`.
 */
export interface Category {
  /**
   * Output only. The human-readable name of the category. This is set when
   * reading the location. When modifying the location, `category_id` must be
   * set.
   */
  readonly displayName?: string;
  /**
   * Output only. More hours types that are available for this business
   * category.
   */
  readonly moreHoursTypes?: MoreHoursType[];
  /**
   * Required. A stable ID (provided by Google) for this category. The value
   * must be specified when modifying the category (when creating or updating a
   * location).
   */
  name?: string;
  /**
   * Output only. A list of all the service types that are available for this
   * business category.
   */
  readonly serviceTypes?: ServiceType[];
}

/**
 * A chain is a brand that your business's locations can be affiliated with.
 */
export interface Chain {
  /**
   * Names of the chain.
   */
  chainNames?: ChainName[];
  /**
   * Number of locations that are part of this chain.
   */
  locationCount?: number;
  /**
   * Required. The chain's resource name, in the format `chains/{chain_id}`.
   */
  name?: string;
  /**
   * Websites of the chain.
   */
  websites?: ChainUri[];
}

/**
 * Name to be used when displaying the chain.
 */
export interface ChainName {
  /**
   * The display name for this chain.
   */
  displayName?: string;
  /**
   * The BCP 47 code of language of the name.
   */
  languageCode?: string;
}

/**
 * Additional options for MyBusinessBusinessInformation#chainsSearch.
 */
export interface ChainsSearchOptions {
  /**
   * Required. Search for a chain by its name. Exact/partial/fuzzy/related
   * queries are supported. Examples: "walmart", "wal-mart", "walmmmart", "沃尔玛"
   */
  chainName?: string;
  /**
   * The maximum number of matched chains to return from this query. The
   * default is 10. The maximum possible value is 500.
   */
  pageSize?: number;
}

/**
 * Url to be used when displaying the chain.
 */
export interface ChainUri {
  /**
   * The uri for this chain.
   */
  uri?: string;
}

/**
 * Request message for Locations.ClearLocationAssociationRequest.
 */
export interface ClearLocationAssociationRequest {
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface Date {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
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
 * Represents a free-form service offered by the merchant. These are services
 * that are not exposed as part of our structure service data. The merchant
 * manually enters the names for of such services via a geomerchant surface.
 */
export interface FreeFormServiceItem {
  /**
   * Required. This field represents the category name (i.e. the category's
   * stable ID). The `category` and `service_type_id` should match the possible
   * combinations provided in the `Category` message.
   */
  category?: string;
  /**
   * Required. Language-tagged labels for the item. We recommend that item
   * names be 140 characters or less, and descriptions 250 characters or less.
   * This field should only be set if the input is a custom service item.
   * Standardized service types should be updated via service_type_id.
   */
  label?: Label;
}

/**
 * Represents a Location that is present on Google. This can be a location that
 * has been claimed by the user, someone else, or could be unclaimed.
 */
export interface GoogleLocation {
  /**
   * The sparsely populated Location information. This field can be re-used in
   * CreateLocation if it is not currently claimed by a user.
   */
  location?: Location;
  /**
   * Resource name of this GoogleLocation, in the format
   * `googleLocations/{googleLocationId}`.
   */
  name?: string;
  /**
   * A URL that will redirect the user to the request admin rights UI. This
   * field is only present if the location has already been claimed by any user,
   * including the current user.
   */
  requestAdminRightsUri?: string;
}

function serializeGoogleLocation(data: any): GoogleLocation {
  return {
    ...data,
    location: data["location"] !== undefined ? serializeLocation(data["location"]) : undefined,
  };
}

function deserializeGoogleLocation(data: any): GoogleLocation {
  return {
    ...data,
    location: data["location"] !== undefined ? deserializeLocation(data["location"]) : undefined,
  };
}

/**
 * Represents a location that was modified by Google.
 */
export interface GoogleUpdatedLocation {
  /**
   * The fields that Google updated.
   */
  diffMask?: string /* FieldMask */;
  /**
   * The Google-updated version of this location.
   */
  location?: Location;
  /**
   * The fields that have pending edits that haven't yet been pushed to Maps
   * and Search.
   */
  pendingMask?: string /* FieldMask */;
}

function serializeGoogleUpdatedLocation(data: any): GoogleUpdatedLocation {
  return {
    ...data,
    diffMask: data["diffMask"] !== undefined ? data["diffMask"] : undefined,
    location: data["location"] !== undefined ? serializeLocation(data["location"]) : undefined,
    pendingMask: data["pendingMask"] !== undefined ? data["pendingMask"] : undefined,
  };
}

function deserializeGoogleUpdatedLocation(data: any): GoogleUpdatedLocation {
  return {
    ...data,
    diffMask: data["diffMask"] !== undefined ? data["diffMask"] : undefined,
    location: data["location"] !== undefined ? deserializeLocation(data["location"]) : undefined,
    pendingMask: data["pendingMask"] !== undefined ? data["pendingMask"] : undefined,
  };
}

/**
 * Label to be used when displaying the price list, section, or item.
 */
export interface Label {
  /**
   * Optional. Description of the price list, section, or item.
   */
  description?: string;
  /**
   * Required. Display name for the price list, section, or item.
   */
  displayName?: string;
  /**
   * Optional. The BCP-47 language code that these strings apply for. Only one
   * set of labels may be set per language.
   */
  languageCode?: string;
}

/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this object must conform to the WGS84 standard. Values
 * must be within normalized ranges.
 */
export interface LatLng {
  /**
   * The latitude in degrees. It must be in the range [-90.0, +90.0].
   */
  latitude?: number;
  /**
   * The longitude in degrees. It must be in the range [-180.0, +180.0].
   */
  longitude?: number;
}

/**
 * Response for AttributesService.ListAttributeMetadata.
 */
export interface ListAttributeMetadataResponse {
  /**
   * A collection of attribute metadata for the available attributes.
   */
  attributeMetadata?: AttributeMetadata[];
  /**
   * If the number of attributes exceeded the requested page size, this field
   * will be populated with a token to fetch the next page of attributes on a
   * subsequent call to `attributes.list`. If there are no more attributes, this
   * field will not be present in the response.
   */
  nextPageToken?: string;
}

/**
 * Response message for BusinessCategories.ListCategories.
 */
export interface ListCategoriesResponse {
  /**
   * The matching categories based on the requested parameters.
   */
  categories?: Category[];
  /**
   * If the number of categories exceeded the requested page size, this field
   * will be populated with a token to fetch the next page of categories on a
   * subsequent call to `ListCategories`.
   */
  nextPageToken?: string;
}

/**
 * Response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * The locations.
   */
  locations?: Location[];
  /**
   * If the number of locations exceeded the requested page size, this field is
   * populated with a token to fetch the next page of locations on a subsequent
   * call to `ListLocations`. If there are no more locations, this field is not
   * present in the response.
   */
  nextPageToken?: string;
  /**
   * The approximate number of Locations in the list irrespective of
   * pagination.
   */
  totalSize?: number;
}

function serializeListLocationsResponse(data: any): ListLocationsResponse {
  return {
    ...data,
    locations: data["locations"] !== undefined ? data["locations"].map((item: any) => (serializeLocation(item))) : undefined,
  };
}

function deserializeListLocationsResponse(data: any): ListLocationsResponse {
  return {
    ...data,
    locations: data["locations"] !== undefined ? data["locations"].map((item: any) => (deserializeLocation(item))) : undefined,
  };
}

/**
 * A location. See the [help center article]
 * (https://support.google.com/business/answer/3038177) for a detailed
 * description of these fields, or the [category
 * endpoint](/my-business/reference/rest/v4/categories) for a list of valid
 * business categories.
 */
export interface Location {
  /**
   * Optional. Additional information that is surfaced in AdWords.
   */
  adWordsLocationExtensions?: AdWordsLocationExtensions;
  /**
   * Optional. The different categories that describe the business.
   */
  categories?: Categories;
  /**
   * Optional. A collection of free-form strings to allow you to tag your
   * business. These labels are NOT user facing; only you can see them. Must be
   * between 1-255 characters per label.
   */
  labels?: string[];
  /**
   * Immutable. The language of the location. Set during creation and not
   * updateable.
   */
  languageCode?: string;
  /**
   * Optional. User-provided latitude and longitude. When creating a location,
   * this field is ignored if the provided address geocodes successfully. This
   * field is only returned on get requests if the user-provided `latlng` value
   * was accepted during create, or the `latlng` value was updated through the
   * Google Business Profile website. This field can only be updated by approved
   * clients.
   */
  latlng?: LatLng;
  /**
   * Output only. Additional non-user-editable information.
   */
  readonly metadata?: Metadata;
  /**
   * Optional. More hours for a business's different departments or specific
   * customers.
   */
  moreHours?: MoreHours[];
  /**
   * Google identifier for this location in the form:
   * `locations/{location_id}`.
   */
  name?: string;
  /**
   * Optional. A flag that indicates whether the location is currently open for
   * business.
   */
  openInfo?: OpenInfo;
  /**
   * Optional. The different phone numbers that customers can use to get in
   * touch with the business.
   */
  phoneNumbers?: PhoneNumbers;
  /**
   * Optional. Describes your business in your own voice and shares with users
   * the unique story of your business and offerings. This field is required for
   * all categories except lodging categories (e.g. hotels, motels, inns).
   */
  profile?: Profile;
  /**
   * Optional. Operating hours for the business.
   */
  regularHours?: BusinessHours;
  /**
   * Optional. All locations and chain related to this one.
   */
  relationshipData?: RelationshipData;
  /**
   * Optional. Service area businesses provide their service at the customer's
   * location. If this business is a service area business, this field describes
   * the area(s) serviced by the business.
   */
  serviceArea?: ServiceAreaBusiness;
  /**
   * Optional. List of services supported by merchants. A service can be
   * haircut, install water heater, etc. Duplicated service items will be
   * removed automatically.
   */
  serviceItems?: ServiceItem[];
  /**
   * Optional. Special hours for the business. This typically includes holiday
   * hours, and other times outside of regular operating hours. These override
   * regular business hours. This field cannot be set without regular hours.
   */
  specialHours?: SpecialHours;
  /**
   * Optional. External identifier for this location, which must be unique
   * within a given account. This is a means of associating the location with
   * your own records.
   */
  storeCode?: string;
  /**
   * Optional. A precise, accurate address to describe your business location.
   * PO boxes or mailboxes located at remote locations are not acceptable. At
   * this time, you can specify a maximum of five `address_lines` values in the
   * address. This field should only be set for businesses that have a
   * storefront. This field should not be set for locations of type
   * `CUSTOMER_LOCATION_ONLY`.
   */
  storefrontAddress?: PostalAddress;
  /**
   * Required. Location name should reflect your business's real-world name, as
   * used consistently on your storefront, website, and stationery, and as known
   * to customers. Any additional information, when relevant, can be included in
   * other fields of the resource (for example, `Address`, `Categories`). Don't
   * add unnecessary information to your name (for example, prefer "Google" over
   * "Google Inc. - Mountain View Corporate Headquarters"). Don't include
   * marketing taglines, store codes, special characters, hours or closed/open
   * status, phone numbers, website URLs, service/product information,
   * location/address or directions, or containment information (for example,
   * "Chase ATM in Duane Reade").
   */
  title?: string;
  /**
   * Optional. A URL for this business. If possible, use a URL that represents
   * this individual business location instead of a generic website/URL that
   * represents all locations, or the brand.
   */
  websiteUri?: string;
}

function serializeLocation(data: any): Location {
  return {
    ...data,
    serviceItems: data["serviceItems"] !== undefined ? data["serviceItems"].map((item: any) => (serializeServiceItem(item))) : undefined,
  };
}

function deserializeLocation(data: any): Location {
  return {
    ...data,
    serviceItems: data["serviceItems"] !== undefined ? data["serviceItems"].map((item: any) => (deserializeServiceItem(item))) : undefined,
  };
}

/**
 * Additional options for
 * MyBusinessBusinessInformation#locationsGetGoogleUpdated.
 */
export interface LocationsGetGoogleUpdatedOptions {
  /**
   * Required. Read mask to specify what fields will be returned in the
   * response.
   */
  readMask?: string /* FieldMask */;
}

function serializeLocationsGetGoogleUpdatedOptions(data: any): LocationsGetGoogleUpdatedOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeLocationsGetGoogleUpdatedOptions(data: any): LocationsGetGoogleUpdatedOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for MyBusinessBusinessInformation#locationsGet.
 */
export interface LocationsGetOptions {
  /**
   * Required. Read mask to specify what fields will be returned in the
   * response.
   */
  readMask?: string /* FieldMask */;
}

function serializeLocationsGetOptions(data: any): LocationsGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeLocationsGetOptions(data: any): LocationsGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for MyBusinessBusinessInformation#locationsPatch.
 */
export interface LocationsPatchOptions {
  /**
   * Required. The specific fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If true, the request is validated without actually updating the
   * location. When this field is set, we will only return validation errors if
   * there were any. The response will be empty if no errors were found.
   */
  validateOnly?: boolean;
}

function serializeLocationsPatchOptions(data: any): LocationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsPatchOptions(data: any): LocationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * MyBusinessBusinessInformation#locationsUpdateAttributes.
 */
export interface LocationsUpdateAttributesOptions {
  /**
   * Required. Attribute name of attributes that you'd like to update.
   * Represented by `attributes/{attribute}`. Updates: All attributes provided
   * in the attributes field that you would like to update must be set in the
   * `attribute_mask`. Attributes set in the above list but not in the
   * `attribute_mask` will be ignored. Deletes: If you'd like to delete certain
   * attributes, they must be specified in the `attribute_mask` with no matching
   * entry in the attributes list. If you'd like to delete all attributes set on
   * a location, you should look up all the applicable attributes for the
   * location and then add them to the `attribute_mask` with an empty attributes
   * field.
   */
  attributeMask?: string /* FieldMask */;
}

function serializeLocationsUpdateAttributesOptions(data: any): LocationsUpdateAttributesOptions {
  return {
    ...data,
    attributeMask: data["attributeMask"] !== undefined ? data["attributeMask"] : undefined,
  };
}

function deserializeLocationsUpdateAttributesOptions(data: any): LocationsUpdateAttributesOptions {
  return {
    ...data,
    attributeMask: data["attributeMask"] !== undefined ? data["attributeMask"] : undefined,
  };
}

/**
 * Additional non-user-editable information about the location.
 */
export interface Metadata {
  /**
   * Output only. Indicates whether the location can be deleted using the API.
   */
  readonly canDelete?: boolean;
  /**
   * Output only. Indicates if the listing is eligible for business calls.
   */
  readonly canHaveBusinessCalls?: boolean;
  /**
   * Output only. Indicates if the listing is eligible for food menu.
   */
  readonly canHaveFoodMenus?: boolean;
  /**
   * Output only. Indicates if the listing can modify the service list.
   */
  readonly canModifyServiceList?: boolean;
  /**
   * Output only. Indicates whether the location can operate on Health data.
   */
  readonly canOperateHealthData?: boolean;
  /**
   * Output only. Indicates if the listing can manage local posts.
   */
  readonly canOperateLocalPost?: boolean;
  /**
   * Output only. Indicates whether the location can operate on Lodging data.
   */
  readonly canOperateLodgingData?: boolean;
  /**
   * Output only. The location resource that this location duplicates.
   */
  readonly duplicateLocation?: string;
  /**
   * Output only. Indicates whether the place ID associated with this location
   * has updates that need to be updated or rejected by the client. If this
   * boolean is set, you should call the `getGoogleUpdated` method to lookup
   * information that's needs to be verified.
   */
  readonly hasGoogleUpdated?: boolean;
  /**
   * Output only. Indicates whether any of this Location's properties are in
   * the edit pending state.
   */
  readonly hasPendingEdits?: boolean;
  /**
   * Output only. Indicates if the listing has Voice of Merchant. If this
   * boolean is false, you should call the locations.getVoiceOfMerchantState API
   * to get details as to why they do not have Voice of Merchant.
   */
  readonly hasVoiceOfMerchant?: boolean;
  /**
   * Output only. A link to the location on Maps.
   */
  readonly mapsUri?: string;
  /**
   * Output only. A link to the page on Google Search where a customer can
   * leave a review for the location.
   */
  readonly newReviewUri?: string;
  /**
   * Output only. If this locationappears on Google Maps, this field is
   * populated with the place ID for the location. This ID can be used in
   * various Places APIs. This field can be set during Create calls, but not for
   * Update.
   */
  readonly placeId?: string;
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * The time periods during which a location is open for certain types of
 * business.
 */
export interface MoreHours {
  /**
   * Required. Type of hours. Clients should call {#link
   * businessCategories:BatchGet} to get supported hours types for categories of
   * their locations.
   */
  hoursTypeId?: string;
  /**
   * Required. A collection of times that this location is open. Each period
   * represents a range of hours when the location is open during the week.
   */
  periods?: TimePeriod[];
}

/**
 * More hours types that a business can offers, in addition to its regular
 * hours.
 */
export interface MoreHoursType {
  /**
   * Output only. The human-readable English display name for the hours type.
   */
  readonly displayName?: string;
  /**
   * Output only. A stable ID provided by Google for this hours type.
   */
  readonly hoursTypeId?: string;
  /**
   * Output only. The human-readable localized display name for the hours type.
   */
  readonly localizedDisplayName?: string;
}

/**
 * Information related to the opening state of the business.
 */
export interface OpenInfo {
  /**
   * Output only. Indicates whether this business is eligible for re-open.
   */
  readonly canReopen?: boolean;
  /**
   * Optional. The date on which the location first opened. If the exact day is
   * not known, month and year only can be provided. The date must be in the
   * past or be no more than one year in the future.
   */
  openingDate?: Date;
  /**
   * Required. Indicates whether or not the Location is currently open for
   * business. All locations are open by default, unless updated to be closed.
   */
  status?:  | "OPEN_FOR_BUSINESS_UNSPECIFIED" | "OPEN" | "CLOSED_PERMANENTLY" | "CLOSED_TEMPORARILY";
}

/**
 * A collection of phone numbers for the business. During updates, both fields
 * must be set. Clients may not update just the primary or additional phone
 * numbers using the update mask. International phone format is preferred, such
 * as "+1 415 555 0132", see more in
 * (https://developers.google.com/style/phone-numbers#international-phone-numbers).
 */
export interface PhoneNumbers {
  /**
   * Optional. Up to two phone numbers (mobile or landline, no fax) at which
   * your business can be called, in addition to your primary phone number.
   */
  additionalPhones?: string[];
  /**
   * Required. A phone number that connects to your individual business
   * location as directly as possible. Use a local phone number instead of a
   * central, call center helpline number whenever possible.
   */
  primaryPhone?: string;
}

/**
 * Defines an area that's represented by a place ID.
 */
export interface PlaceInfo {
  /**
   * Required. The ID of the place. Must correspond to a region.
   * (https://developers.google.com/places/web-service/supported_types#table3)
   */
  placeId?: string;
  /**
   * Required. The localized name of the place. For example, `Scottsdale, AZ`.
   */
  placeName?: string;
}

/**
 * Defines the union of areas represented by a set of places.
 */
export interface Places {
  /**
   * The areas represented by place IDs. Limited to a maximum of 20 places.
   */
  placeInfos?: PlaceInfo[];
}

/**
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar. It is not intended to model geographical locations (roads,
 * towns, mountains). In typical usage an address would be created via user
 * input or from importing existing data, depending on the type of process.
 * Advice on address input / editing: - Use an internationalization-ready
 * address widget such as https://github.com/google/libaddressinput) - Users
 * should not be presented with UI elements for input or editing of fields
 * outside countries where that field is used. For more guidance on how to use
 * this schema, please see: https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address.
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g. "Austin, TX"), it
   * is important that the line order is clear. The order of address lines
   * should be "envelope order" for the country/region of the address. In places
   * where this can vary (e.g. Japan), address_language is used to make it
   * explicit (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for
   * small-to-large). This way, the most specific line of an address can be
   * selected based on the language. The minimum permitted structural
   * representation of an address consists of a region_code with all remaining
   * information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic
   * reasoning could be made about any of the address components until it was at
   * least partially resolved. Creating an address only containing a region_code
   * and address_lines, and then geocoding is the recommended way to handle
   * completely unstructured addresses (as opposed to guessing which parts of
   * the address should be localities or administrative areas).
   */
  addressLines?: string[];
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region. For example, this can be a state, a
   * province, an oblast, or a prefecture. Specifically, for Spain this is the
   * province and not the autonomous community (e.g. "Barcelona" and not
   * "Catalonia"). Many countries don't use an administrative area in postal
   * addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if known).
   * This is often the UI language of the input form or is expected to match one
   * of the languages used in the address' country/region, or their
   * transliterated equivalents. This can affect formatting in certain
   * countries, but is not critical to the correctness of the data and will
   * never affect any validation or other non-formatting related operations. If
   * this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town. In regions of the world where
   * localities are not well defined or do not fit into this structure well,
   * leave locality empty and use address_lines.
   */
  locality?: string;
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?: string;
  /**
   * Optional. The recipient at the address. This field may, under certain
   * circumstances, contain multiline information. For example, it might contain
   * "care of" information.
   */
  recipients?: string[];
  /**
   * Required. CLDR region code of the country/region of the address. This is
   * never inferred and it is up to the user to ensure the value is correct. See
   * https://cldr.unicode.org/ and
   * https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which
   * is the latest revision. All new revisions **must** be backward compatible
   * with old revisions.
   */
  revision?: number;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in
   * most regions. Where it is used, the value is either a string like "CEDEX",
   * optionally followed by a number (e.g. "CEDEX 7"), or just a number alone,
   * representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?: string;
  /**
   * Optional. Sublocality of the address. For example, this can be
   * neighborhoods, boroughs, districts.
   */
  sublocality?: string;
}

/**
 * All information pertaining to the location's profile.
 */
export interface Profile {
  /**
   * Required. Description of the location in your own voice, not editable by
   * anyone else.
   */
  description?: string;
}

/**
 * Information of all parent and children locations related to this one.
 */
export interface RelationshipData {
  /**
   * The list of children locations that this location has relations with.
   */
  childrenLocations?: RelevantLocation[];
  /**
   * The resource name of the Chain that this location is member of. How to
   * find Chain ID
   */
  parentChain?: string;
  /**
   * The parent location that this location has relations with.
   */
  parentLocation?: RelevantLocation;
}

/**
 * Information about another location that is related to current one. The
 * relation can be any one of DEPARTMENT_OF or INDEPENDENT_ESTABLISHMENT_OF, and
 * the location specified here can be on either side (parent/child) of the
 * location.
 */
export interface RelevantLocation {
  /**
   * Required. Specify the location that is on the other side of the relation
   * by its placeID.
   */
  placeId?: string;
  /**
   * Required. The type of the relationship.
   */
  relationType?:  | "RELATION_TYPE_UNSPECIFIED" | "DEPARTMENT_OF" | "INDEPENDENT_ESTABLISHMENT_IN";
}

/**
 * Values for an attribute with a `value_type` of REPEATED_ENUM. This consists
 * of two lists of value IDs: those that are set (true) and those that are unset
 * (false). Values absent are considered unknown. At least one value must be
 * specified.
 */
export interface RepeatedEnumAttributeValue {
  /**
   * Enum values that are set.
   */
  setValues?: string[];
  /**
   * Enum values that are unset.
   */
  unsetValues?: string[];
}

/**
 * Response message for Locations.SearchChains.
 */
export interface SearchChainsResponse {
  /**
   * Chains that match the queried chain_display_name in SearchChainsRequest.
   * If there are no matches, this field will be empty. Results are listed in
   * order of relevance.
   */
  chains?: Chain[];
}

/**
 * Request message for GoogleLocations.SearchGoogleLocations.
 */
export interface SearchGoogleLocationsRequest {
  /**
   * Location to search for. If provided, will find locations which match the
   * provided location details.
   */
  location?: Location;
  /**
   * The number of matches to return. The default value is 3, with a maximum of
   * 10. Note that latency may increase if more are requested. There is no
   * pagination.
   */
  pageSize?: number;
  /**
   * Text query to search for. The search results from a query string will be
   * less accurate than if providing an exact location, but can provide more
   * inexact matches.
   */
  query?: string;
}

function serializeSearchGoogleLocationsRequest(data: any): SearchGoogleLocationsRequest {
  return {
    ...data,
    location: data["location"] !== undefined ? serializeLocation(data["location"]) : undefined,
  };
}

function deserializeSearchGoogleLocationsRequest(data: any): SearchGoogleLocationsRequest {
  return {
    ...data,
    location: data["location"] !== undefined ? deserializeLocation(data["location"]) : undefined,
  };
}

/**
 * Response message for GoogleLocations.SearchGoogleLocations.
 */
export interface SearchGoogleLocationsResponse {
  /**
   * A collection of GoogleLocations that are potential matches to the
   * specified request, listed in order from most to least accuracy.
   */
  googleLocations?: GoogleLocation[];
}

function serializeSearchGoogleLocationsResponse(data: any): SearchGoogleLocationsResponse {
  return {
    ...data,
    googleLocations: data["googleLocations"] !== undefined ? data["googleLocations"].map((item: any) => (serializeGoogleLocation(item))) : undefined,
  };
}

function deserializeSearchGoogleLocationsResponse(data: any): SearchGoogleLocationsResponse {
  return {
    ...data,
    googleLocations: data["googleLocations"] !== undefined ? data["googleLocations"].map((item: any) => (deserializeGoogleLocation(item))) : undefined,
  };
}

/**
 * Service area businesses provide their service at the customer's location
 * (for example, a locksmith or plumber).
 */
export interface ServiceAreaBusiness {
  /**
   * Required. Indicates the type of the service area business.
   */
  businessType?:  | "BUSINESS_TYPE_UNSPECIFIED" | "CUSTOMER_LOCATION_ONLY" | "CUSTOMER_AND_BUSINESS_LOCATION";
  /**
   * The area that this business serves defined through a set of places.
   */
  places?: Places;
  /**
   * Immutable. CLDR region code of the country/region that this service area
   * business is based in. See http://cldr.unicode.org/ and
   * http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland. This field is required for
   * CUSTOMER_LOCATION_ONLY businesses, and is ignored otherwise. The region
   * specified here can be different from regions for the areas that this
   * business serves (e.g. service area businesses that provide services in
   * regions other than the one that they are based in). If this location
   * requires verification after creation, the address provided for verification
   * purposes *must* be located within this region, and the business owner or
   * their authorized representative *must* be able to receive postal mail at
   * the provided verification address.
   */
  regionCode?: string;
}

/**
 * A message that describes a single service item. It is used to describe the
 * type of service that the merchant provides. For example, haircut can be a
 * service.
 */
export interface ServiceItem {
  /**
   * Optional. This field will be set case of free-form services data.
   */
  freeFormServiceItem?: FreeFormServiceItem;
  /**
   * Optional. Represents the monetary price of the service item. We recommend
   * that currency_code and units should be set when including a price. This
   * will be treated as a fixed price for the service item.
   */
  price?: Money;
  /**
   * Optional. This field will be set case of structured services data.
   */
  structuredServiceItem?: StructuredServiceItem;
}

function serializeServiceItem(data: any): ServiceItem {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeMoney(data["price"]) : undefined,
  };
}

function deserializeServiceItem(data: any): ServiceItem {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeMoney(data["price"]) : undefined,
  };
}

/**
 * A message describing a service type that the business offers.
 */
export interface ServiceType {
  /**
   * Output only. The human-readable display name for the service type.
   */
  readonly displayName?: string;
  /**
   * Output only. A stable ID (provided by Google) for this service type.
   */
  readonly serviceTypeId?: string;
}

/**
 * Represents a single time period when a location's operational hours differ
 * from its normal business hours. A special hour period must represent a range
 * of less than 24 hours. The `open_time` and `start_date` must predate the
 * `close_time` and `end_date`. The `close_time` and `end_date` can extend to
 * 11:59 a.m. on the day after the specified `start_date`. For example, the
 * following inputs are valid: start_date=2015-11-23, open_time=08:00,
 * close_time=18:00 start_date=2015-11-23, end_date=2015-11-23, open_time=08:00,
 * close_time=18:00 start_date=2015-11-23, end_date=2015-11-24, open_time=13:00,
 * close_time=11:59 The following inputs are not valid: start_date=2015-11-23,
 * open_time=13:00, close_time=11:59 start_date=2015-11-23, end_date=2015-11-24,
 * open_time=13:00, close_time=12:00 start_date=2015-11-23, end_date=2015-11-25,
 * open_time=08:00, close_time=18:00
 */
export interface SpecialHourPeriod {
  /**
   * Optional. If true, `end_date`, `open_time`, and `close_time` are ignored,
   * and the date specified in `start_date` is treated as the location being
   * closed for the entire day.
   */
  closed?: boolean;
  /**
   * Optional. Valid values are 00:00-24:00, where 24:00 represents midnight at
   * the end of the specified day field. Must be specified if `closed` is false.
   */
  closeTime?: TimeOfDay;
  /**
   * Optional. The calendar date this special hour period ends on. If
   * `end_date` field is not set, default to the date specified in `start_date`.
   * If set, this field must be equal to or at most 1 day after `start_date`.
   */
  endDate?: Date;
  /**
   * Optional. Valid values are 00:00-24:00 where 24:00 represents midnight at
   * the end of the specified day field. Must be specified if `closed` is false.
   */
  openTime?: TimeOfDay;
  /**
   * Required. The calendar date this special hour period starts on.
   */
  startDate?: Date;
}

/**
 * Represents a set of time periods when a location's operational hours differ
 * from its normal business hours.
 */
export interface SpecialHours {
  /**
   * Required. A list of exceptions to the business's regular hours.
   */
  specialHourPeriods?: SpecialHourPeriod[];
}

/**
 * Represents a structured service offered by the merchant. For eg:
 * toilet_installation.
 */
export interface StructuredServiceItem {
  /**
   * Optional. Description of structured service item. The character limit is
   * 300.
   */
  description?: string;
  /**
   * Required. The `service_type_id` field is a Google provided unique ID that
   * can be found in `ServiceType`. This information is provided by
   * `BatchGetCategories` rpc service.
   */
  serviceTypeId?: string;
}

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Represents a span of time that the business is open, starting on the
 * specified open day/time and closing on the specified close day/time. The
 * closing time must occur after the opening time, for example later in the same
 * day, or on a subsequent day.
 */
export interface TimePeriod {
  /**
   * Required. Indicates the day of the week this period ends on.
   */
  closeDay?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Required. Valid values are 00:00-24:00, where 24:00 represents midnight at
   * the end of the specified day field.
   */
  closeTime?: TimeOfDay;
  /**
   * Required. Indicates the day of the week this period starts on.
   */
  openDay?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Required. Valid values are 00:00-24:00, where 24:00 represents midnight at
   * the end of the specified day field.
   */
  openTime?: TimeOfDay;
}

/**
 * Values for an attribute with a `value_type` of URL.
 */
export interface UriAttributeValue {
  /**
   * Required. The proposed URI value for this attribute.
   */
  uri?: string;
}