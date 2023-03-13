// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Enterprise License Manager API Client for Deno
 * ==============================================
 * 
 * The Google Enterprise License Manager API lets you manage Google Workspace and related licenses for all users of a customer that you manage.
 * 
 * Docs: https://developers.google.com/admin-sdk/licensing/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Enterprise License Manager API lets you manage Google Workspace
 * and related licenses for all users of a customer that you manage.
 */
export class licensing {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://licensing.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Revoke a license.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   * @param userId The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.
   */
  async licenseAssignmentsDelete(productId: string, skuId: string, userId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/user/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a specific user's license by product SKU.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   * @param userId The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.
   */
  async licenseAssignmentsGet(productId: string, skuId: string, userId: string): Promise<LicenseAssignment> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/user/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LicenseAssignment;
  }

  /**
   * Assign a license.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   */
  async licenseAssignmentsInsert(productId: string, skuId: string, req: LicenseAssignmentInsert): Promise<LicenseAssignment> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/user`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LicenseAssignment;
  }

  /**
   * List all users assigned licenses for a specific product SKU.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   */
  async licenseAssignmentsListForProduct(productId: string, opts: LicenseAssignmentsListForProductOptions = {}): Promise<LicenseAssignmentList> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/users`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LicenseAssignmentList;
  }

  /**
   * List all users assigned licenses for a specific product SKU.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   */
  async licenseAssignmentsListForProductAndSku(productId: string, skuId: string, opts: LicenseAssignmentsListForProductAndSkuOptions = {}): Promise<LicenseAssignmentList> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/users`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LicenseAssignmentList;
  }

  /**
   * Reassign a user's product SKU with a different SKU in the same product.
   * This method supports patch semantics.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   * @param userId The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.
   */
  async licenseAssignmentsPatch(productId: string, skuId: string, userId: string, req: LicenseAssignment): Promise<LicenseAssignment> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/user/${ userId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as LicenseAssignment;
  }

  /**
   * Reassign a user's product SKU with a different SKU in the same product.
   *
   * @param productId A product's unique identifier. For more information about products in this version of the API, see Products and SKUs.
   * @param skuId A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.
   * @param userId The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.
   */
  async licenseAssignmentsUpdate(productId: string, skuId: string, userId: string, req: LicenseAssignment): Promise<LicenseAssignment> {
    const url = new URL(`${this.#baseUrl}apps/licensing/v1/product/${ productId }/sku/${ skuId }/user/${ userId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LicenseAssignment;
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
 * Representation of a license assignment.
 */
export interface LicenseAssignment {
  /**
   * ETag of the resource.
   */
  etags?: string;
  /**
   * Identifies the resource as a LicenseAssignment, which is
   * `licensing#licenseAssignment`.
   */
  kind?: string;
  /**
   * A product's unique identifier. For more information about products in this
   * version of the API, see Product and SKU IDs.
   */
  productId?: string;
  /**
   * Display Name of the product.
   */
  productName?: string;
  /**
   * Link to this page.
   */
  selfLink?: string;
  /**
   * A product SKU's unique identifier. For more information about available
   * SKUs in this version of the API, see Products and SKUs.
   */
  skuId?: string;
  /**
   * Display Name of the sku of the product.
   */
  skuName?: string;
  /**
   * The user's current primary email address. If the user's email address
   * changes, use the new email address in your API requests. Since a `userId`
   * is subject to change, do not use a `userId` value as a key for persistent
   * data. This key could break if the current user's email address changes. If
   * the `userId` is suspended, the license status changes.
   */
  userId?: string;
}

/**
 * Representation of a license assignment.
 */
export interface LicenseAssignmentInsert {
  /**
   * Email id of the user
   */
  userId?: string;
}

export interface LicenseAssignmentList {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * The LicenseAssignments in this page of results.
   */
  items?: LicenseAssignment[];
  /**
   * Identifies the resource as a collection of LicenseAssignments.
   */
  kind?: string;
  /**
   * The token that you must submit in a subsequent request to retrieve
   * additional license results matching your query parameters. The `maxResults`
   * query string is related to the `nextPageToken` since `maxResults`
   * determines how many entries are returned on each next page.
   */
  nextPageToken?: string;
}

/**
 * Additional options for licensing#licenseAssignmentsListForProductAndSku.
 */
export interface LicenseAssignmentsListForProductAndSkuOptions {
  /**
   * The customer's unique ID as defined in the Admin console, such as
   * `C00000000`. If the customer is suspended, the server returns an error.
   */
  customerId: string;
  /**
   * The `maxResults` query string determines how many entries are returned on
   * each page of a large response. This is an optional parameter. The value
   * must be a positive number.
   */
  maxResults?: number;
  /**
   * Token to fetch the next page of data. The `maxResults` query string is
   * related to the `pageToken` since `maxResults` determines how many entries
   * are returned on each page. This is an optional query string. If not
   * specified, the server returns the first page.
   */
  pageToken?: string;
}

/**
 * Additional options for licensing#licenseAssignmentsListForProduct.
 */
export interface LicenseAssignmentsListForProductOptions {
  /**
   * The customer's unique ID as defined in the Admin console, such as
   * `C00000000`. If the customer is suspended, the server returns an error.
   */
  customerId: string;
  /**
   * The `maxResults` query string determines how many entries are returned on
   * each page of a large response. This is an optional parameter. The value
   * must be a positive number.
   */
  maxResults?: number;
  /**
   * Token to fetch the next page of data. The `maxResults` query string is
   * related to the `pageToken` since `maxResults` determines how many entries
   * are returned on each page. This is an optional query string. If not
   * specified, the server returns the first page.
   */
  pageToken?: string;
}