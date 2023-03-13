// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Manufacturer Center API Client for Deno
 * =======================================
 * 
 * Public API for managing Manufacturer Center related data.
 * 
 * Docs: https://developers.google.com/manufacturers/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Public API for managing Manufacturer Center related data.
 */
export class Manufacturers {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://manufacturers.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes a product certification by its name. This method can only be
   * called by certification bodies.
   *
   * @param name Required. The name of the product certification to delete. Format: accounts/{account}/languages/{language_code}/productCertifications/{id}
   */
  async accountsLanguagesProductCertificationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a product certification by its name. This method can only be called
   * by certification bodies.
   *
   * @param name Required. The name of the product certification to get. Format: accounts/{account}/languages/{language_code}/productCertifications/{id}
   */
  async accountsLanguagesProductCertificationsGet(name: string): Promise<ProductCertification> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductCertification;
  }

  /**
   * Lists product certifications from a specified certification body. This
   * method can only be called by certification bodies.
   *
   * @param parent Required. The parent, which owns this collection of product certifications. Format: accounts/{account}/languages/{language_code}
   */
  async accountsLanguagesProductCertificationsList(parent: string, opts: AccountsLanguagesProductCertificationsListOptions = {}): Promise<ListProductCertificationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/productCertifications`);
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
    return data as ListProductCertificationsResponse;
  }

  /**
   * Updates (or creates if allow_missing = true) a product certification which
   * links certifications with products. This method can only be called by
   * certification bodies.
   *
   * @param name Required. The unique name identifier of a product certification Format: accounts/{account}/languages/{language_code}/productCertifications/{id} Where `id` is a some unique identifier and `language_code` is a 2-letter ISO 639-1 code of a Shopping supported language according to https://support.google.com/merchants/answer/160637.
   */
  async accountsLanguagesProductCertificationsPatch(name: string, req: ProductCertification, opts: AccountsLanguagesProductCertificationsPatchOptions = {}): Promise<ProductCertification> {
    opts = serializeAccountsLanguagesProductCertificationsPatchOptions(opts);
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
    return data as ProductCertification;
  }

  /**
   * Deletes the product from a Manufacturer Center account.
   *
   * @param name Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id.
   * @param parent Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account.
   */
  async accountsProductsDelete(name: string, parent: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the product from a Manufacturer Center account, including product
   * issues. A recently updated product takes around 15 minutes to process.
   * Changes are only visible after it has been processed. While some issues may
   * be available once the product has been processed, other issues may take
   * days to appear.
   *
   * @param name Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id.
   * @param parent Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account.
   */
  async accountsProductsGet(name: string, parent: string, opts: AccountsProductsGetOptions = {}): Promise<Product> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products/${ name }`);
    if (opts.include !== undefined) {
      url.searchParams.append("include", String(opts.include));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProduct(data);
  }

  /**
   * Lists all the products in a Manufacturer Center account.
   *
   * @param parent Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account.
   */
  async accountsProductsList(parent: string, opts: AccountsProductsListOptions = {}): Promise<ListProductsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products`);
    if (opts.include !== undefined) {
      url.searchParams.append("include", String(opts.include));
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
    return deserializeListProductsResponse(data);
  }

  /**
   * Inserts or updates the attributes of the product in a Manufacturer Center
   * account. Creates a product with the provided attributes. If the product
   * already exists, then all attributes are replaced with the new ones. The
   * checks at upload time are minimal. All required attributes need to be
   * present for a product to be valid. Issues may show up later after the API
   * has accepted a new upload for a product and it is possible to overwrite an
   * existing valid product with an invalid product. To detect this, you should
   * retrieve the product and check it for issues once the new version is
   * available. Uploaded attributes first need to be processed before they can
   * be retrieved. Until then, new products will be unavailable, and retrieval
   * of previously uploaded products will return the original state of the
   * product.
   *
   * @param name Name in the format `{target_country}:{content_language}:{product_id}`. `target_country` - The target country of the product as a CLDR territory code (for example, US). `content_language` - The content language of the product as a two-letter ISO 639-1 language code (for example, en). `product_id` - The ID of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#id.
   * @param parent Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of the Manufacturer Center account.
   */
  async accountsProductsUpdate(name: string, parent: string, req: Attributes): Promise<Empty> {
    req = serializeAttributes(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Empty;
  }
}

/**
 * Additional options for
 * Manufacturers#accountsLanguagesProductCertificationsList.
 */
export interface AccountsLanguagesProductCertificationsListOptions {
  /**
   * Optional. The maximum number of product certifications to return. The
   * service may return fewer than this value. If unspecified, at most 50
   * product certifications will be returned. The maximum value is 1000; values
   * above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `ListProductCertifications` call. Provide this to retrieve the subsequent
   * page. When paginating, all other parameters provided to
   * `ListProductCertifications` must match the call that provided the page
   * token. Required if requesting the second or higher page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Manufacturers#accountsLanguagesProductCertificationsPatch.
 */
export interface AccountsLanguagesProductCertificationsPatchOptions {
  /**
   * Optional. The list of fields to update according to aip.dev/134. However,
   * only full update is supported as of right now. Therefore, it can be either
   * ignored or set to "*". Setting any other values will returns UNIMPLEMENTED
   * error.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsLanguagesProductCertificationsPatchOptions(data: any): AccountsLanguagesProductCertificationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsLanguagesProductCertificationsPatchOptions(data: any): AccountsLanguagesProductCertificationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Manufacturers#accountsProductsGet.
 */
export interface AccountsProductsGetOptions {
  /**
   * The information to be included in the response. Only sections listed here
   * will be returned.
   */
  include?:  | "UNKNOWN" | "ATTRIBUTES" | "ISSUES" | "DESTINATION_STATUSES";
}

/**
 * Additional options for Manufacturers#accountsProductsList.
 */
export interface AccountsProductsListOptions {
  /**
   * The information to be included in the response. Only sections listed here
   * will be returned.
   */
  include?:  | "UNKNOWN" | "ATTRIBUTES" | "ISSUES" | "DESTINATION_STATUSES";
  /**
   * Maximum number of product statuses to return in the response, used for
   * paging.
   */
  pageSize?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * Attributes of the product. For more information, see
 * https://support.google.com/manufacturers/answer/6124116.
 */
export interface Attributes {
  /**
   * The additional images of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#addlimage.
   */
  additionalImageLink?: Image[];
  /**
   * The target age group of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#agegroup.
   */
  ageGroup?: string;
  /**
   * The brand name of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#brand.
   */
  brand?: string;
  /**
   * The capacity of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#capacity.
   */
  capacity?: Capacity;
  /**
   * The color of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#color.
   */
  color?: string;
  /**
   * The count of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#count.
   */
  count?: Count;
  /**
   * The description of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#description.
   */
  description?: string;
  /**
   * The disclosure date of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#disclosure.
   */
  disclosureDate?: string;
  /**
   * A list of excluded destinations such as "ClientExport",
   * "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information,
   * see https://support.google.com/manufacturers/answer/7443550
   */
  excludedDestination?: string[];
  /**
   * The rich format description of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#featuredesc.
   */
  featureDescription?: FeatureDescription[];
  /**
   * The flavor of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#flavor.
   */
  flavor?: string;
  /**
   * The format of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#format.
   */
  format?: string;
  /**
   * The target gender of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#gender.
   */
  gender?: string;
  /**
   * Grocery Attributes. See more at
   * https://support.google.com/manufacturers/answer/12098458#grocery.
   */
  grocery?: Grocery;
  /**
   * The Global Trade Item Number (GTIN) of the product. For more information,
   * see https://support.google.com/manufacturers/answer/6124116#gtin.
   */
  gtin?: string[];
  /**
   * The image of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#image.
   */
  imageLink?: Image;
  /**
   * A list of included destinations such as "ClientExport",
   * "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information,
   * see https://support.google.com/manufacturers/answer/7443550
   */
  includedDestination?: string[];
  /**
   * The item group id of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#itemgroupid.
   */
  itemGroupId?: string;
  /**
   * The material of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#material.
   */
  material?: string;
  /**
   * The Manufacturer Part Number (MPN) of the product. For more information,
   * see https://support.google.com/manufacturers/answer/6124116#mpn.
   */
  mpn?: string;
  /**
   * Nutrition Attributes. See more at
   * https://support.google.com/manufacturers/answer/12098458#food-servings.
   */
  nutrition?: Nutrition;
  /**
   * The pattern of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#pattern.
   */
  pattern?: string;
  /**
   * The details of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#productdetail.
   */
  productDetail?: ProductDetail[];
  /**
   * The product highlights. For more information, see
   * https://support.google.com/manufacturers/answer/10066942
   */
  productHighlight?: string[];
  /**
   * The name of the group of products related to the product. For more
   * information, see
   * https://support.google.com/manufacturers/answer/6124116#productline.
   */
  productLine?: string;
  /**
   * The canonical name of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#productname.
   */
  productName?: string;
  /**
   * The URL of the detail page of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#productpage.
   */
  productPageUrl?: string;
  /**
   * The type or category of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#producttype.
   */
  productType?: string[];
  /**
   * The release date of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#release.
   */
  releaseDate?: string;
  /**
   * Rich product content. For more information, see
   * https://support.google.com/manufacturers/answer/9389865
   */
  richProductContent?: string[];
  /**
   * The scent of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#scent.
   */
  scent?: string;
  /**
   * The size of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#size.
   */
  size?: string;
  /**
   * The size system of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#sizesystem.
   */
  sizeSystem?: string;
  /**
   * The size type of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#sizetype.
   */
  sizeType?: string[];
  /**
   * The suggested retail price (MSRP) of the product. For more information,
   * see https://support.google.com/manufacturers/answer/6124116#price.
   */
  suggestedRetailPrice?: Price;
  /**
   * The target client id. Should only be used in the accounts of the data
   * partners. For more information, see
   * https://support.google.com/manufacturers/answer/10857344
   */
  targetClientId?: string;
  /**
   * The theme of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#theme.
   */
  theme?: string;
  /**
   * The title of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#title.
   */
  title?: string;
  /**
   * The videos of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#video.
   */
  videoLink?: string[];
}

function serializeAttributes(data: any): Attributes {
  return {
    ...data,
    capacity: data["capacity"] !== undefined ? serializeCapacity(data["capacity"]) : undefined,
    count: data["count"] !== undefined ? serializeCount(data["count"]) : undefined,
  };
}

function deserializeAttributes(data: any): Attributes {
  return {
    ...data,
    capacity: data["capacity"] !== undefined ? deserializeCapacity(data["capacity"]) : undefined,
    count: data["count"] !== undefined ? deserializeCount(data["count"]) : undefined,
  };
}

/**
 * The capacity of a product. For more information, see
 * https://support.google.com/manufacturers/answer/6124116#capacity.
 */
export interface Capacity {
  /**
   * The unit of the capacity, i.e., MB, GB, or TB.
   */
  unit?: string;
  /**
   * The numeric value of the capacity.
   */
  value?: bigint;
}

function serializeCapacity(data: any): Capacity {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeCapacity(data: any): Capacity {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * Description of a certification.
 */
export interface Certification {
  /**
   * Required. Name of the certification body.
   */
  authority?: string;
  /**
   * Optional. A URL link to the certification.
   */
  link?: string;
  /**
   * Optional. A URL link to the certification logo.
   */
  logo?: string;
  /**
   * Required. Name of the certification.
   */
  name?: string;
  /**
   * Optional. The expiration date (UTC).
   */
  validUntil?: string;
  /**
   * Required. A custom value of the certification.
   */
  value?: string;
}

/**
 * The number of products in a single package. For more information, see
 * https://support.google.com/manufacturers/answer/6124116#count.
 */
export interface Count {
  /**
   * The unit in which these products are counted.
   */
  unit?: string;
  /**
   * The numeric value of the number of products in a package.
   */
  value?: bigint;
}

function serializeCount(data: any): Count {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeCount(data: any): Count {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * The destination status.
 */
export interface DestinationStatus {
  /**
   * The name of the destination.
   */
  destination?: string;
  /**
   * The status of the destination.
   */
  status?:  | "UNKNOWN" | "ACTIVE" | "PENDING" | "DISAPPROVED";
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
 * A feature description of the product. For more information, see
 * https://support.google.com/manufacturers/answer/6124116#featuredesc.
 */
export interface FeatureDescription {
  /**
   * A short description of the feature.
   */
  headline?: string;
  /**
   * An optional image describing the feature.
   */
  image?: Image;
  /**
   * A detailed description of the feature.
   */
  text?: string;
}

/**
 * Combination of float amount and unit.
 */
export interface FloatUnit {
  /**
   * amount.
   */
  amount?: number;
  /**
   * unit.
   */
  unit?: string;
}

export interface Grocery {
  /**
   * Active ingredients.
   */
  activeIngredients?: string;
  /**
   * Alcohol by volume.
   */
  alcoholByVolume?: number;
  /**
   * Allergens.
   */
  allergens?: string;
  /**
   * Derived nutrition claim.
   */
  derivedNutritionClaim?: string[];
  /**
   * Directions.
   */
  directions?: string;
  /**
   * Indications.
   */
  indications?: string;
  /**
   * Ingredients.
   */
  ingredients?: string;
  /**
   * Nutrition claim.
   */
  nutritionClaim?: string[];
  /**
   * Storage instructions.
   */
  storageInstructions?: string;
}

/**
 * An image.
 */
export interface Image {
  /**
   * The URL of the image. For crawled images, this is the provided URL. For
   * uploaded images, this is a serving URL from Google if the image has been
   * processed successfully.
   */
  imageUrl?: string;
  /**
   * The status of the image. @OutputOnly
   */
  status?:  | "STATUS_UNSPECIFIED" | "PENDING_PROCESSING" | "PENDING_CRAWL" | "OK" | "ROBOTED" | "XROBOTED" | "CRAWL_ERROR" | "PROCESSING_ERROR" | "DECODING_ERROR" | "TOO_BIG" | "CRAWL_SKIPPED" | "HOSTLOADED" | "HTTP_404";
  /**
   * The type of the image, i.e., crawled or uploaded. @OutputOnly
   */
  type?:  | "TYPE_UNSPECIFIED" | "CRAWLED" | "UPLOADED";
}

/**
 * Product issue.
 */
export interface Issue {
  /**
   * If present, the attribute that triggered the issue. For more information
   * about attributes, see
   * https://support.google.com/manufacturers/answer/6124116.
   */
  attribute?: string;
  /**
   * Longer description of the issue focused on how to resolve it.
   */
  description?: string;
  /**
   * The destination this issue applies to.
   */
  destination?: string;
  /**
   * What needs to happen to resolve the issue.
   */
  resolution?:  | "RESOLUTION_UNSPECIFIED" | "USER_ACTION" | "PENDING_PROCESSING";
  /**
   * The severity of the issue.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /**
   * The timestamp when this issue appeared.
   */
  timestamp?: Date;
  /**
   * Short title describing the nature of the issue.
   */
  title?: string;
  /**
   * The server-generated type of the issue, for example,
   * “INCORRECT_TEXT_FORMATTING”, “IMAGE_NOT_SERVEABLE”, etc.
   */
  type?: string;
}

function serializeIssue(data: any): Issue {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeIssue(data: any): Issue {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Response for ListProductCertifications method.
 */
export interface ListProductCertificationsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The product certifications from the specified certification body.
   */
  productCertifications?: ProductCertification[];
}

export interface ListProductsResponse {
  /**
   * The token for the retrieval of the next page of product statuses.
   */
  nextPageToken?: string;
  /**
   * List of the products.
   */
  products?: Product[];
}

function serializeListProductsResponse(data: any): ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (serializeProduct(item))) : undefined,
  };
}

function deserializeListProductsResponse(data: any): ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (deserializeProduct(item))) : undefined,
  };
}

export interface Nutrition {
  /**
   * Added sugars.
   */
  addedSugars?: FloatUnit;
  /**
   * Added sugars daily percentage.
   */
  addedSugarsDailyPercentage?: number;
  /**
   * Calcium.
   */
  calcium?: FloatUnit;
  /**
   * Calcium daily percentage.
   */
  calciumDailyPercentage?: number;
  /**
   * Cholesterol.
   */
  cholesterol?: FloatUnit;
  /**
   * Cholesterol daily percentage.
   */
  cholesterolDailyPercentage?: number;
  /**
   * Dietary fiber.
   */
  dietaryFiber?: FloatUnit;
  /**
   * Dietary fiber daily percentage.
   */
  dietaryFiberDailyPercentage?: number;
  /**
   * Mandatory Nutrition Facts. Energy.
   */
  energy?: FloatUnit;
  /**
   * Energy from fat.
   */
  energyFromFat?: FloatUnit;
  /**
   * Folate daily percentage.
   */
  folateDailyPercentage?: number;
  /**
   * Folate folic acid.
   */
  folateFolicAcid?: FloatUnit;
  /**
   * Folate mcg DFE.
   */
  folateMcgDfe?: number;
  /**
   * Iron.
   */
  iron?: FloatUnit;
  /**
   * Iron daily percentage.
   */
  ironDailyPercentage?: number;
  /**
   * Monounsaturated fat.
   */
  monounsaturatedFat?: FloatUnit;
  /**
   * Nutrition fact measure.
   */
  nutritionFactMeasure?: string;
  /**
   * Polyols.
   */
  polyols?: FloatUnit;
  /**
   * Polyunsaturated fat.
   */
  polyunsaturatedFat?: FloatUnit;
  /**
   * Potassium.
   */
  potassium?: FloatUnit;
  /**
   * Potassium daily percentage.
   */
  potassiumDailyPercentage?: number;
  /**
   * Prepared size description.
   */
  preparedSizeDescription?: string;
  /**
   * Protein.
   */
  protein?: FloatUnit;
  /**
   * Protein daily percentage.
   */
  proteinDailyPercentage?: number;
  /**
   * Saturated fat.
   */
  saturatedFat?: FloatUnit;
  /**
   * Saturated fat daily percentage.
   */
  saturatedFatDailyPercentage?: number;
  /**
   * Food Serving Size. Serving size description.
   */
  servingSizeDescription?: string;
  /**
   * Serving size measure.
   */
  servingSizeMeasure?: FloatUnit;
  /**
   * Servings per container.
   */
  servingsPerContainer?: string;
  /**
   * Sodium.
   */
  sodium?: FloatUnit;
  /**
   * Sodium daily percentage.
   */
  sodiumDailyPercentage?: number;
  /**
   * Starch.
   */
  starch?: FloatUnit;
  /**
   * Total carbohydrate.
   */
  totalCarbohydrate?: FloatUnit;
  /**
   * Total carbohydrate daily percentage.
   */
  totalCarbohydrateDailyPercentage?: number;
  /**
   * Total fat.
   */
  totalFat?: FloatUnit;
  /**
   * Total fat daily percentage.
   */
  totalFatDailyPercentage?: number;
  /**
   * Total sugars.
   */
  totalSugars?: FloatUnit;
  /**
   * Total sugars daily percentage.
   */
  totalSugarsDailyPercentage?: number;
  /**
   * Trans fat.
   */
  transFat?: FloatUnit;
  /**
   * Trans fat daily percentage.
   */
  transFatDailyPercentage?: number;
  /**
   * Vitamin D.
   */
  vitaminD?: FloatUnit;
  /**
   * Vitamin D daily percentage.
   */
  vitaminDDailyPercentage?: number;
  /**
   * Voluntary nutrition fact.
   */
  voluntaryNutritionFact?: VoluntaryNutritionFact[];
}

/**
 * A price.
 */
export interface Price {
  /**
   * The numeric value of the price.
   */
  amount?: string;
  /**
   * The currency in which the price is denoted.
   */
  currency?: string;
}

/**
 * Product data.
 */
export interface Product {
  /**
   * Attributes of the product uploaded to the Manufacturer Center. Manually
   * edited attributes are taken into account.
   */
  attributes?: Attributes;
  /**
   * The content language of the product as a two-letter ISO 639-1 language
   * code (for example, en).
   */
  contentLanguage?: string;
  /**
   * The status of the destinations.
   */
  destinationStatuses?: DestinationStatus[];
  /**
   * A server-generated list of issues associated with the product.
   */
  issues?: Issue[];
  /**
   * Name in the format `{target_country}:{content_language}:{product_id}`.
   * `target_country` - The target country of the product as a CLDR territory
   * code (for example, US). `content_language` - The content language of the
   * product as a two-letter ISO 639-1 language code (for example, en).
   * `product_id` - The ID of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#id.
   */
  name?: string;
  /**
   * Parent ID in the format `accounts/{account_id}`. `account_id` - The ID of
   * the Manufacturer Center account.
   */
  parent?: string;
  /**
   * The ID of the product. For more information, see
   * https://support.google.com/manufacturers/answer/6124116#id.
   */
  productId?: string;
  /**
   * The target country of the product as a CLDR territory code (for example,
   * US).
   */
  targetCountry?: string;
}

function serializeProduct(data: any): Product {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? serializeAttributes(data["attributes"]) : undefined,
    issues: data["issues"] !== undefined ? data["issues"].map((item: any) => (serializeIssue(item))) : undefined,
  };
}

function deserializeProduct(data: any): Product {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? deserializeAttributes(data["attributes"]) : undefined,
    issues: data["issues"] !== undefined ? data["issues"].map((item: any) => (deserializeIssue(item))) : undefined,
  };
}

/**
 * Product certification data.
 */
export interface ProductCertification {
  /**
   * Required. This is the product's brand name. The brand is used to help
   * identify your product.
   */
  brand?: string;
  /**
   * Required. A list of certifications to link to the described product.
   */
  certification?: Certification[];
  /**
   * Optional. A 2-letter country code (ISO 3166-1 Alpha 2).
   */
  countryCode?: string[];
  /**
   * Output only. The statuses of the destinations.
   */
  readonly destinationStatuses?: DestinationStatus[];
  /**
   * Output only. A server-generated list of issues associated with the
   * product.
   */
  readonly issues?: Issue[];
  /**
   * Optional. These are the Manufacturer Part Numbers (MPN). MPNs are used to
   * uniquely identify a specific product among all products from the same
   * manufacturer
   */
  mpn?: string[];
  /**
   * Required. The unique name identifier of a product certification Format:
   * accounts/{account}/languages/{language_code}/productCertifications/{id}
   * Where `id` is a some unique identifier and `language_code` is a 2-letter
   * ISO 639-1 code of a Shopping supported language according to
   * https://support.google.com/merchants/answer/160637.
   */
  name?: string;
  /**
   * Optional. Another name for GTIN.
   */
  productCode?: string[];
  /**
   * Optional. These are your own product categorization system in your product
   * data.
   */
  productType?: string[];
  /**
   * Required. This is to clearly identify the product you are certifying.
   */
  title?: string;
}

/**
 * A product detail of the product. For more information, see
 * https://support.google.com/manufacturers/answer/6124116#productdetail.
 */
export interface ProductDetail {
  /**
   * The name of the attribute.
   */
  attributeName?: string;
  /**
   * The value of the attribute.
   */
  attributeValue?: string;
  /**
   * A short section name that can be reused between multiple product details.
   */
  sectionName?: string;
}

/**
 * Voluntary Nutrition Facts.
 */
export interface VoluntaryNutritionFact {
  /**
   * Daily percentage.
   */
  dailyPercentage?: number;
  /**
   * Name.
   */
  name?: string;
  /**
   * Value.
   */
  value?: FloatUnit;
}