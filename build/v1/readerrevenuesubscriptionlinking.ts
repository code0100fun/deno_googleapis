// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Reader Revenue Subscription Linking API Client for Deno
 * =======================================================
 * 
 * readerrevenuesubscriptionlinking.googleapis.com API.
 * 
 * Docs: https://developers.google.com/news/subscribe/subscription-linking/overview
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * readerrevenuesubscriptionlinking.googleapis.com API.
 */
export class ReaderRevenueSubscriptionLinking {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://readerrevenuesubscriptionlinking.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Removes a publication reader, effectively severing the association with a
   * Google user. If `force` is set to true, any entitlements for this reader
   * will also be deleted. (Otherwise, the request will only work if the reader
   * has no entitlements.) - If the reader does not exist, return NOT_FOUND. -
   * Return FAILED_PRECONDITION if the force field is false (or unset) and
   * entitlements are present.
   *
   * @param name Required. The resource name of the reader. Format: publications/{publication_id}/readers/{ppid}
   */
  async publicationsReadersDelete(name: string, opts: PublicationsReadersDeleteOptions = {}): Promise<DeleteReaderResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DeleteReaderResponse;
  }

  /**
   * Gets a reader of a publication. Returns NOT_FOUND if the reader does not
   * exist.
   *
   * @param name Required. The resource name of the reader. Format: publications/{publication_id}/readers/{ppid}
   */
  async publicationsReadersGet(name: string): Promise<Reader> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Reader;
  }

  /**
   * Gets the reader entitlements for a publication reader. - Returns
   * PERMISSION_DENIED if the caller does not have access. - Returns NOT_FOUND
   * if the reader does not exist.
   *
   * @param name Required. The name of the reader entitlements to retrieve. Format: publications/{publication_id}/readers/{reader_id}/entitlements
   */
  async publicationsReadersGetEntitlements(name: string): Promise<ReaderEntitlements> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReaderEntitlements(data);
  }

  /**
   * Updates the reader entitlements for a publication reader. The entire
   * reader entitlements will be overwritten by the new reader entitlements in
   * the payload, like a PUT. - Returns PERMISSION_DENIED if the caller does not
   * have access. - Returns NOT_FOUND if the reader does not exist.
   *
   * @param name Output only. The resource name of the singleton.
   */
  async publicationsReadersUpdateEntitlements(name: string, req: ReaderEntitlements, opts: PublicationsReadersUpdateEntitlementsOptions = {}): Promise<ReaderEntitlements> {
    req = serializeReaderEntitlements(req);
    opts = serializePublicationsReadersUpdateEntitlementsOptions(opts);
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
    return deserializeReaderEntitlements(data);
  }
}

/**
 * Response to deleting a reader of a publication.
 */
export interface DeleteReaderResponse {
}

/**
 * A single entitlement for a publication reader
 */
export interface Entitlement {
  /**
   * The detail field can carry a description of the SKU that corresponds to
   * what the user has been granted access to. This description, which is opaque
   * to Google, can be displayed in the Google user subscription console for
   * users who linked the subscription to a Google Account. Max 80 character
   * limit.
   */
  detail?: string;
  /**
   * Required. Expiration time of the entitlement. Entitlements that have
   * expired over 30 days will be purged. Required. LINT.IfChange(expire_time)
   * The max expire_time is 398 days from now().
   * LINT.ThenChange(//depot/google3/java/com/google/subscribewithgoogle/accountlinking/subscriptionlink/service/config/protoconf.pi:max_expiry_age)
   */
  expireTime?: Date;
  /**
   * Required. The publication's product ID that the user has access to. This
   * is the same product ID as can be found in Schema.org markup
   * (http://schema.org/productID). E.g. "dailybugle.com:basic"
   */
  productId?: string;
  /**
   * A source-specific subscription token. This is an opaque string that the
   * publisher provides to Google. This token is opaque and has no meaning to
   * Google.
   */
  subscriptionToken?: string;
}

function serializeEntitlement(data: any): Entitlement {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeEntitlement(data: any): Entitlement {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Additional options for
 * ReaderRevenueSubscriptionLinking#publicationsReadersDelete.
 */
export interface PublicationsReadersDeleteOptions {
  /**
   * If set to true, any entitlements under the reader will also be purged.
   */
  force?: boolean;
}

/**
 * Additional options for
 * ReaderRevenueSubscriptionLinking#publicationsReadersUpdateEntitlements.
 */
export interface PublicationsReadersUpdateEntitlementsOptions {
  /**
   * Optional. The list of fields to update. Defaults to all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePublicationsReadersUpdateEntitlementsOptions(data: any): PublicationsReadersUpdateEntitlementsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePublicationsReadersUpdateEntitlementsOptions(data: any): PublicationsReadersUpdateEntitlementsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A reader of a publication.
 */
export interface Reader {
  /**
   * Output only. Time the publication reader was created and associated with a
   * Google user.
   */
  readonly createTime?: Date;
  /**
   * Output only. The resource name of the reader. The last part of ppid in the
   * resource name is the publisher provided id.
   */
  readonly name?: string;
}

/**
 * A singleton containing all of a reader's entitlements for a publication.
 */
export interface ReaderEntitlements {
  /**
   * All of the entitlements for a publication reader.
   */
  entitlements?: Entitlement[];
  /**
   * Output only. The resource name of the singleton.
   */
  readonly name?: string;
}

function serializeReaderEntitlements(data: any): ReaderEntitlements {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (serializeEntitlement(item))) : undefined,
  };
}

function deserializeReaderEntitlements(data: any): ReaderEntitlements {
  return {
    ...data,
    entitlements: data["entitlements"] !== undefined ? data["entitlements"].map((item: any) => (deserializeEntitlement(item))) : undefined,
  };
}