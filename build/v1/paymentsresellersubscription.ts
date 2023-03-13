// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Payments Reseller Subscription API Client for Deno
 * ==================================================
 * 
 * 
 * 
 * Docs: https://developers.google.com/payments/reseller/subscription/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class PaymentsResellerSubscription {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://paymentsresellersubscription.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * To retrieve the products that can be resold by the partner. It should be
   * autenticated with a service account.
   *
   * @param parent Required. The parent, the partner that can resell. Format: partners/{partner}
   */
  async partnersProductsList(parent: string, opts: PartnersProductsListOptions = {}): Promise<GoogleCloudPaymentsResellerSubscriptionV1ListProductsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products`);
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
    return data as GoogleCloudPaymentsResellerSubscriptionV1ListProductsResponse;
  }

  /**
   * To find eligible promotions for the current user. The API requires user
   * authorization via OAuth. The user is inferred from the authenticated OAuth
   * credential.
   *
   * @param parent Required. The parent, the partner that can resell. Format: partners/{partner}
   */
  async partnersPromotionsFindEligible(parent: string, req: GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsRequest): Promise<GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/promotions:findEligible`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse(data);
  }

  /**
   * To retrieve the promotions, such as free trial, that can be used by the
   * partner. It should be autenticated with a service account.
   *
   * @param parent Required. The parent, the partner that can resell. Format: partners/{partner}
   */
  async partnersPromotionsList(parent: string, opts: PartnersPromotionsListOptions = {}): Promise<GoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/promotions`);
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
    return deserializeGoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse(data);
  }

  /**
   * Used by partners to cancel a subscription service either immediately or by
   * the end of the current billing cycle for their customers. It should be
   * called directly by the partner using service accounts.
   *
   * @param name Required. The name of the subscription resource to be cancelled. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}"
   */
  async partnersSubscriptionsCancel(name: string, req: GoogleCloudPaymentsResellerSubscriptionV1CancelSubscriptionRequest): Promise<GoogleCloudPaymentsResellerSubscriptionV1CancelSubscriptionResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1CancelSubscriptionResponse;
  }

  /**
   * Used by partners to create a subscription for their customers. The created
   * subscription is associated with the end user inferred from the end user
   * credentials. This API must be authorized by the end user using OAuth.
   *
   * @param parent Required. The parent resource name, which is the identifier of the partner. It will have the format of "partners/{partner_id}".
   */
  async partnersSubscriptionsCreate(parent: string, req: GoogleCloudPaymentsResellerSubscriptionV1Subscription, opts: PartnersSubscriptionsCreateOptions = {}): Promise<GoogleCloudPaymentsResellerSubscriptionV1Subscription> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/subscriptions`);
    if (opts.subscriptionId !== undefined) {
      url.searchParams.append("subscriptionId", String(opts.subscriptionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1Subscription;
  }

  /**
   * Used by partners to entitle a previously provisioned subscription to the
   * current end user. The end user identity is inferred from the authorized
   * credential of the request. This API must be authorized by the end user
   * using OAuth.
   *
   * @param name Required. The name of the subscription resource that is entitled to the current end user. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}"
   */
  async partnersSubscriptionsEntitle(name: string, req: GoogleCloudPaymentsResellerSubscriptionV1EntitleSubscriptionRequest): Promise<GoogleCloudPaymentsResellerSubscriptionV1EntitleSubscriptionResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:entitle`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1EntitleSubscriptionResponse;
  }

  /**
   * [Deprecated] New partners should be on auto-extend by default. Used by
   * partners to extend a subscription service for their customers on an ongoing
   * basis for the subscription to remain active and renewable. It should be
   * called directly by the partner using service accounts.
   *
   * @param name Required. The name of the subscription resource to be extended. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}".
   */
  async partnersSubscriptionsExtend(name: string, req: GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionRequest): Promise<GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:extend`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse(data);
  }

  /**
   * Used by partners to get a subscription by id. It should be called directly
   * by the partner using service accounts.
   *
   * @param name Required. The name of the subscription resource to retrieve. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}"
   */
  async partnersSubscriptionsGet(name: string): Promise<GoogleCloudPaymentsResellerSubscriptionV1Subscription> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1Subscription;
  }

  /**
   * Used by partners to provision a subscription for their customers. This
   * creates a subscription without associating it with the end user account.
   * EntitleSubscription must be called separately using OAuth in order for the
   * end user account to be associated with the subscription. It should be
   * called directly by the partner using service accounts.
   *
   * @param parent Required. The parent resource name, which is the identifier of the partner. It will have the format of "partners/{partner_id}".
   */
  async partnersSubscriptionsProvision(parent: string, req: GoogleCloudPaymentsResellerSubscriptionV1Subscription, opts: PartnersSubscriptionsProvisionOptions = {}): Promise<GoogleCloudPaymentsResellerSubscriptionV1Subscription> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/subscriptions:provision`);
    if (opts.subscriptionId !== undefined) {
      url.searchParams.append("subscriptionId", String(opts.subscriptionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1Subscription;
  }

  /**
   * Used by partners to revoke the pending cancellation of a subscription,
   * which is currently in `STATE_CANCEL_AT_END_OF_CYCLE` state. If the
   * subscription is already cancelled, the request will fail. It should be
   * called directly by the partner using service accounts.
   *
   * @param name Required. The name of the subscription resource whose pending cancellation needs to be undone. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}"
   */
  async partnersSubscriptionsUndoCancel(name: string, req: GoogleCloudPaymentsResellerSubscriptionV1UndoCancelSubscriptionRequest): Promise<GoogleCloudPaymentsResellerSubscriptionV1UndoCancelSubscriptionResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:undoCancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudPaymentsResellerSubscriptionV1UndoCancelSubscriptionResponse;
  }
}

/**
 * Describes the amount unit including the currency code.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Amount {
  /**
   * Required. Amount in micros (1_000_000 micros = 1 currency unit)
   */
  amountMicros?: bigint;
  /**
   * Required. Currency codes in accordance with [ISO-4217 Currency Codes]
   * (https://en.wikipedia.org/wiki/ISO_4217). For example, USD.
   */
  currencyCode?: string;
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1Amount(data: any): GoogleCloudPaymentsResellerSubscriptionV1Amount {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1Amount(data: any): GoogleCloudPaymentsResellerSubscriptionV1Amount {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
  };
}

export interface GoogleCloudPaymentsResellerSubscriptionV1CancelSubscriptionRequest {
  /**
   * Optional. If true, Google will cancel the subscription immediately, and
   * may or may not (based on the contract) issue a prorated refund for the
   * remainder of the billing cycle. Otherwise, Google defers the cancelation at
   * renewal_time, and will not issue a refund.
   */
  cancelImmediately?: boolean;
  /**
   * Specifies the reason for the cancellation.
   */
  cancellationReason?:  | "CANCELLATION_REASON_UNSPECIFIED" | "CANCELLATION_REASON_FRAUD" | "CANCELLATION_REASON_REMORSE" | "CANCELLATION_REASON_ACCIDENTAL_PURCHASE" | "CANCELLATION_REASON_PAST_DUE" | "CANCELLATION_REASON_ACCOUNT_CLOSED" | "CANCELLATION_REASON_UPGRADE_DOWNGRADE" | "CANCELLATION_REASON_USER_DELINQUENCY" | "CANCELLATION_REASON_OTHER";
}

export interface GoogleCloudPaymentsResellerSubscriptionV1CancelSubscriptionResponse {
  /**
   * The cancelled subscription resource.
   */
  subscription?: GoogleCloudPaymentsResellerSubscriptionV1Subscription;
}

/**
 * Describes the length of a period of a time.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Duration {
  /**
   * number of duration units to be included.
   */
  count?: number;
  /**
   * The unit used for the duration
   */
  unit?:  | "UNIT_UNSPECIFIED" | "MONTH" | "DAY";
}

/**
 * Partner request for entitling the previously provisioned subscription to an
 * end user. The end user identity is inferred from the request OAuth context.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1EntitleSubscriptionRequest {
}

export interface GoogleCloudPaymentsResellerSubscriptionV1EntitleSubscriptionResponse {
  /**
   * The subscription that has user linked to it.
   */
  subscription?: GoogleCloudPaymentsResellerSubscriptionV1Subscription;
}

/**
 * Request message for extending a Subscription resource. A new recurrence will
 * be made based on the subscription schedule defined by the original product.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionRequest {
  /**
   * Required. Specifies details of the extension. Currently, the duration of
   * the extension must be exactly one billing cycle of the original
   * subscription.
   */
  extension?: GoogleCloudPaymentsResellerSubscriptionV1Extension;
  /**
   * Required. Restricted to 36 ASCII characters. A random UUID is recommended.
   * The idempotency key for the request. The ID generation logic is controlled
   * by the partner. request_id should be the same as on retries of the same
   * request. A different request_id must be used for a extension of a different
   * cycle. A random UUID is recommended.
   */
  requestId?: string;
}

export interface GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse {
  /**
   * The time at which the subscription is expected to be extended, in ISO 8061
   * format. UTC timezone. Example, "cycleEndTime":"2019-08-31T17:28:54.564Z"
   */
  cycleEndTime?: Date;
  /**
   * End of the free trial period, in ISO 8061 format. UTC timezone. Example,
   * "freeTrialEndTime":"2019-08-31T17:28:54.564Z" This time will be set the
   * same as initial subscription creation time if no free trial period is
   * offered to the partner.
   */
  freeTrialEndTime?: Date;
  /**
   * Output only. The time at which the subscription is expected to be renewed
   * by Google - a new charge will be incurred and the service entitlement will
   * be renewed. A non-immediate cancellation will take place at this time too,
   * before which, the service entitlement for the end user will remain valid.
   * UTC timezone in ISO 8061 format. For example: "2019-08-31T17:28:54.564Z"
   */
  readonly renewalTime?: Date;
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse {
  return {
    ...data,
    cycleEndTime: data["cycleEndTime"] !== undefined ? data["cycleEndTime"].toISOString() : undefined,
    freeTrialEndTime: data["freeTrialEndTime"] !== undefined ? data["freeTrialEndTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1ExtendSubscriptionResponse {
  return {
    ...data,
    cycleEndTime: data["cycleEndTime"] !== undefined ? new Date(data["cycleEndTime"]) : undefined,
    freeTrialEndTime: data["freeTrialEndTime"] !== undefined ? new Date(data["freeTrialEndTime"]) : undefined,
    renewalTime: data["renewalTime"] !== undefined ? new Date(data["renewalTime"]) : undefined,
  };
}

/**
 * Describes the details of an extension request.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Extension {
  /**
   * Specifies the period of access the subscription should grant.
   */
  duration?: GoogleCloudPaymentsResellerSubscriptionV1Duration;
  /**
   * Required. Identifier of the end-user in partner’s system.
   */
  partnerUserToken?: string;
}

export interface GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsRequest {
  /**
   * Optional. Specifies the filters for the promotion results. The syntax is
   * defined in https://google.aip.dev/160 with the following caveats: - Only
   * the following features are supported: - Logical operator `AND` - Comparison
   * operator `=` (no wildcards `*`) - Traversal operator `.` - Has operator `:`
   * (no wildcards `*`) - Only the following fields are supported: -
   * `applicableProducts` - `regionCodes` -
   * `youtubePayload.partnerEligibilityId` - `youtubePayload.postalCode` -
   * Unless explicitly mentioned above, other features are not supported.
   * Example: `applicableProducts:partners/partner1/products/product1 AND
   * regionCodes:US AND youtubePayload.postalCode=94043 AND
   * youtubePayload.partnerEligibilityId=eligibility-id`
   */
  filter?: string;
  /**
   * Optional. The maximum number of promotions to return. The service may
   * return fewer than this value. If unspecified, at most 50 products will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListPromotions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListPromotions` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Response containing the found promotions for the current user.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The promotions for the current user.
   */
  promotions?: GoogleCloudPaymentsResellerSubscriptionV1Promotion[];
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse {
  return {
    ...data,
    promotions: data["promotions"] !== undefined ? data["promotions"].map((item: any) => (serializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(item))) : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1FindEligiblePromotionsResponse {
  return {
    ...data,
    promotions: data["promotions"] !== undefined ? data["promotions"].map((item: any) => (deserializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(item))) : undefined,
  };
}

/**
 * Payload specific to Google One products.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1GoogleOnePayload {
  /**
   * Campaign attributed to sales of this subscription.
   */
  campaigns?: string[];
  /**
   * The type of offering the subscription was sold by the partner. e.g. VAS.
   */
  offering?:  | "OFFERING_UNSPECIFIED" | "OFFERING_VAS_BUNDLE" | "OFFERING_VAS_STANDALONE" | "OFFERING_HARD_BUNDLE" | "OFFERING_SOFT_BUNDLE";
  /**
   * The type of sales channel through which the subscription was sold.
   */
  salesChannel?:  | "CHANNEL_UNSPECIFIED" | "CHANNEL_RETAIL" | "CHANNEL_ONLINE_WEB" | "CHANNEL_ONLINE_ANDROID_APP" | "CHANNEL_ONLINE_IOS_APP";
  /**
   * The identifier for the partner store where the subscription was sold.
   */
  storeId?: string;
}

export interface GoogleCloudPaymentsResellerSubscriptionV1ListProductsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The products for the specified partner.
   */
  products?: GoogleCloudPaymentsResellerSubscriptionV1Product[];
}

export interface GoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is empty, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The promotions for the specified partner.
   */
  promotions?: GoogleCloudPaymentsResellerSubscriptionV1Promotion[];
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse {
  return {
    ...data,
    promotions: data["promotions"] !== undefined ? data["promotions"].map((item: any) => (serializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(item))) : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse(data: any): GoogleCloudPaymentsResellerSubscriptionV1ListPromotionsResponse {
  return {
    ...data,
    promotions: data["promotions"] !== undefined ? data["promotions"].map((item: any) => (deserializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(item))) : undefined,
  };
}

/**
 * Describes a location of an end user.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Location {
  /**
   * The postal code this location refers to. Ex. "94043"
   */
  postalCode?: string;
  /**
   * 2-letter ISO region code for current content region. Ex. “US” Please
   * refers to: https://en.wikipedia.org/wiki/ISO_3166-1
   */
  regionCode?: string;
}

/**
 * A Product resource that defines a subscription service that can be resold.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Product {
  /**
   * Output only. Response only. Resource name of the product. It will have the
   * format of "partners/{partner_id}/products/{product_id}"
   */
  readonly name?: string;
  /**
   * Output only. Price configs for the product in the available regions.
   */
  readonly priceConfigs?: GoogleCloudPaymentsResellerSubscriptionV1ProductPriceConfig[];
  /**
   * Output only. 2-letter ISO region code where the product is available in.
   * Ex. "US" Please refers to: https://en.wikipedia.org/wiki/ISO_3166-1
   */
  readonly regionCodes?: string[];
  /**
   * Output only. Specifies the length of the billing cycle of the
   * subscription.
   */
  readonly subscriptionBillingCycleDuration?: GoogleCloudPaymentsResellerSubscriptionV1Duration;
  /**
   * Output only. Localized human readable name of the product.
   */
  readonly titles?: GoogleTypeLocalizedText[];
}

/**
 * Specifies product specific payload.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1ProductPayload {
  /**
   * Payload specific to Google One products.
   */
  googleOnePayload?: GoogleCloudPaymentsResellerSubscriptionV1GoogleOnePayload;
  /**
   * Payload specific to Youtube products.
   */
  youtubePayload?: GoogleCloudPaymentsResellerSubscriptionV1YoutubePayload;
}

/**
 * Configs the prices in an available region.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1ProductPriceConfig {
  /**
   * Output only. The price in the region.
   */
  readonly amount?: GoogleCloudPaymentsResellerSubscriptionV1Amount;
  /**
   * Output only. 2-letter ISO region code where the product is available in.
   * Ex. "US".
   */
  readonly regionCode?: string;
}

/**
 * A Promotion resource that defines a promotion for a subscription that can be
 * resold.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Promotion {
  /**
   * Output only. The product ids this promotion can be applied to.
   */
  readonly applicableProducts?: string[];
  /**
   * Optional. Specifies the end time (exclusive) of the period that the
   * promotion is available in. If unset, the promotion is available
   * indefinitely.
   */
  endTime?: Date;
  /**
   * Optional. Specifies the duration of the free trial of the subscription
   * when promotion_type is PROMOTION_TYPE_FREE_TRIAL
   */
  freeTrialDuration?: GoogleCloudPaymentsResellerSubscriptionV1Duration;
  /**
   * Optional. Specifies the introductory pricing details when the
   * promotion_type is PROMOTION_TYPE_INTRODUCTORY_PRICING.
   */
  introductoryPricingDetails?: GoogleCloudPaymentsResellerSubscriptionV1PromotionIntroductoryPricingDetails;
  /**
   * Output only. Response only. Resource name of the subscription promotion.
   * It will have the format of "partners/{partner_id}/promotion/{promotion_id}"
   */
  readonly name?: string;
  /**
   * Output only. Output Only. Specifies the type of the promotion.
   */
  readonly promotionType?:  | "PROMOTION_TYPE_UNSPECIFIED" | "PROMOTION_TYPE_FREE_TRIAL" | "PROMOTION_TYPE_INTRODUCTORY_PRICING";
  /**
   * Output only. 2-letter ISO region code where the promotion is available in.
   * Ex. "US" Please refers to: https://en.wikipedia.org/wiki/ISO_3166-1
   */
  readonly regionCodes?: string[];
  /**
   * Optional. Specifies the start time (inclusive) of the period that the
   * promotion is available in.
   */
  startTime?: Date;
  /**
   * Output only. Localized human readable name of the promotion.
   */
  readonly titles?: GoogleTypeLocalizedText[];
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(data: any): GoogleCloudPaymentsResellerSubscriptionV1Promotion {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1Promotion(data: any): GoogleCloudPaymentsResellerSubscriptionV1Promotion {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The details of a introductory pricing promotion.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1PromotionIntroductoryPricingDetails {
  /**
   * Specifies the introductory pricing periods.
   */
  introductoryPricingSpecs?: GoogleCloudPaymentsResellerSubscriptionV1PromotionIntroductoryPricingDetailsIntroductoryPricingSpec[];
}

/**
 * The duration of an introductory pricing promotion.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1PromotionIntroductoryPricingDetailsIntroductoryPricingSpec {
  /**
   * Output only. The discount amount. The value is positive.
   */
  readonly discountAmount?: GoogleCloudPaymentsResellerSubscriptionV1Amount;
  /**
   * Output only. The discount percentage in micros. For example, 50,000
   * represents 5%.
   */
  readonly discountRatioMicros?: bigint;
  /**
   * Output only. Output Only. The duration of an introductory offer in billing
   * cycles.
   */
  readonly recurrenceCount?: number;
  /**
   * Output only. 2-letter ISO region code where the product is available in.
   * Ex. "US".
   */
  readonly regionCode?: string;
}

/**
 * A description of what time period or moment in time the product or service
 * is being delivered over.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1ServicePeriod {
  /**
   * Optional. The end time of the service period. Time is exclusive.
   */
  endTime?: Date;
  /**
   * Required. The start time of the service period. Time is inclusive.
   */
  startTime?: Date;
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1ServicePeriod(data: any): GoogleCloudPaymentsResellerSubscriptionV1ServicePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1ServicePeriod(data: any): GoogleCloudPaymentsResellerSubscriptionV1ServicePeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A Subscription resource managed by 3P Partners.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1Subscription {
  /**
   * Output only. Describes the details of a cancelled subscription. Only
   * applicable to subscription of state `STATE_CANCELLED`.
   */
  readonly cancellationDetails?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionCancellationDetails;
  /**
   * Output only. System generated timestamp when the subscription is created.
   * UTC timezone.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time at which the subscription is expected to be
   * extended, in ISO 8061 format. UTC timezone. For example:
   * "2019-08-31T17:28:54.564Z"
   */
  readonly cycleEndTime?: Date;
  /**
   * Output only. Indicates if the subscription is entitled to the end user.
   */
  readonly endUserEntitled?: boolean;
  /**
   * Output only. End of the free trial period, in ISO 8061 format. For
   * example, "2019-08-31T17:28:54.564Z". It will be set the same as createTime
   * if no free trial promotion is specified.
   */
  readonly freeTrialEndTime?: Date;
  /**
   * Required. The line items of the subscription.
   */
  lineItems?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItem[];
  /**
   * Optional. Resource name of the subscription. It will have the format of
   * "partners/{partner_id}/subscriptions/{subscription_id}". This is available
   * for authorizeAddon, but otherwise is response only.
   */
  name?: string;
  /**
   * Required. Identifier of the end-user in partner’s system. The value is
   * restricted to 63 ASCII characters at the maximum.
   */
  partnerUserToken?: string;
  /**
   * Output only. Describes the processing state of the subscription. See more
   * details at [the lifecycle of a
   * subscription](/payments/reseller/subscription/reference/index/Receive.Notifications#payments-subscription-lifecycle).
   */
  readonly processingState?:  | "PROCESSING_STATE_UNSPECIFIED" | "PROCESSING_STATE_CANCELLING" | "PROCESSING_STATE_RECURRING";
  /**
   * Required. Deprecated: consider using `line_items` as the input. Required.
   * Resource name that identifies the purchased products. The format will be
   * 'partners/{partner_id}/products/{product_id}'.
   */
  products?: string[];
  /**
   * Optional. Deprecated: consider using the top-level `promotion_specs` as
   * the input. Optional. Resource name that identifies one or more promotions
   * that can be applied on the product. A typical promotion for a subscription
   * is Free trial. The format will be
   * 'partners/{partner_id}/promotions/{promotion_id}'.
   */
  promotions?: string[];
  /**
   * Optional. Subscription-level promotions. Only free trial is supported on
   * this level. It determines the first renewal time of the subscription to be
   * the end of the free trial period. Specify the promotion resource name only
   * when used as input.
   */
  promotionSpecs?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionPromotionSpec[];
  /**
   * Output only. The place where partners should redirect the end-user to
   * after creation. This field might also be populated when creation failed.
   * However, Partners should always prepare a default URL to redirect the user
   * in case this field is empty.
   */
  readonly redirectUri?: string;
  /**
   * Output only. The time at which the subscription is expected to be renewed
   * by Google - a new charge will be incurred and the service entitlement will
   * be renewed. A non-immediate cancellation will take place at this time too,
   * before which, the service entitlement for the end user will remain valid.
   * UTC timezone in ISO 8061 format. For example: "2019-08-31T17:28:54.564Z"
   */
  readonly renewalTime?: Date;
  /**
   * Required. The location that the service is provided as indicated by the
   * partner.
   */
  serviceLocation?: GoogleCloudPaymentsResellerSubscriptionV1Location;
  /**
   * Output only. Describes the state of the subscription. See more details at
   * [the lifecycle of a
   * subscription](/payments/reseller/subscription/reference/index/Receive.Notifications#payments-subscription-lifecycle).
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "STATE_CREATED" | "STATE_ACTIVE" | "STATE_CANCELLED" | "STATE_IN_GRACE_PERIOD" | "STATE_CANCEL_AT_END_OF_CYCLE" | "STATE_SUSPENDED";
  /**
   * Output only. System generated timestamp when the subscription is most
   * recently updated. UTC timezone.
   */
  readonly updateTime?: Date;
  /**
   * Optional. Details about the previous subscription that this new
   * subscription upgrades/downgrades from. Only populated if this subscription
   * is an upgrade/downgrade from another subscription.
   */
  upgradeDowngradeDetails?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionUpgradeDowngradeDetails;
}

/**
 * Describes the details of a cancelled or cancelling subscription.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1SubscriptionCancellationDetails {
  /**
   * The reason of the cancellation.
   */
  reason?:  | "CANCELLATION_REASON_UNSPECIFIED" | "CANCELLATION_REASON_FRAUD" | "CANCELLATION_REASON_REMORSE" | "CANCELLATION_REASON_ACCIDENTAL_PURCHASE" | "CANCELLATION_REASON_PAST_DUE" | "CANCELLATION_REASON_ACCOUNT_CLOSED" | "CANCELLATION_REASON_UPGRADE_DOWNGRADE" | "CANCELLATION_REASON_USER_DELINQUENCY" | "CANCELLATION_REASON_OTHER";
}

/**
 * Individual line item definition of a subscription.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItem {
  /**
   * Output only. The price of the product/service in this line item. The
   * amount could be the wholesale price, or it can include a cost of sale based
   * on the contract.
   */
  readonly amount?: GoogleCloudPaymentsResellerSubscriptionV1Amount;
  /**
   * Output only. Description of this line item.
   */
  readonly description?: string;
  /**
   * Output only. The free trial end time will be populated after the line item
   * is successfully processed. End time of the line item free trial period, in
   * ISO 8061 format. For example, "2019-08-31T17:28:54.564Z". It will be set
   * the same as createTime if no free trial promotion is specified.
   */
  readonly lineItemFreeTrialEndTime?: Date;
  /**
   * Optional. The promotions applied on the line item. It can be: - a free
   * trial promotion, which overrides the subscription-level free trial
   * promotion. - an introductory pricing promotion. When used as input in
   * Create or Provision API, specify its resource name only.
   */
  lineItemPromotionSpecs?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionPromotionSpec[];
  /**
   * Output only. Details only set for a ONE_TIME recurrence line item.
   */
  readonly oneTimeRecurrenceDetails?: GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails;
  /**
   * Required. Product resource name that identifies one the line item The
   * format is 'partners/{partner_id}/products/{product_id}'.
   */
  product?: string;
  /**
   * Optional. Product specific payload for this line item.
   */
  productPayload?: GoogleCloudPaymentsResellerSubscriptionV1ProductPayload;
  /**
   * Output only. The recurrence type of the line item.
   */
  readonly recurrenceType?:  | "LINE_ITEM_RECURRENCE_TYPE_UNSPECIFIED" | "LINE_ITEM_RECURRENCE_TYPE_PERIODIC" | "LINE_ITEM_RECURRENCE_TYPE_ONE_TIME";
  /**
   * Output only. The state of the line item.
   */
  readonly state?:  | "LINE_ITEM_STATE_UNSPECIFIED" | "LINE_ITEM_STATE_ACTIVE" | "LINE_ITEM_STATE_INACTIVE" | "LINE_ITEM_STATE_NEW" | "LINE_ITEM_STATE_ACTIVATING" | "LINE_ITEM_STATE_DEACTIVATING" | "LINE_ITEM_STATE_WAITING_TO_DEACTIVATE";
}

/**
 * Details for a ONE_TIME recurrence line item.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails {
  /**
   * The service period of the ONE_TIME line item.
   */
  servicePeriod?: GoogleCloudPaymentsResellerSubscriptionV1ServicePeriod;
}

function serializeGoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails(data: any): GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails {
  return {
    ...data,
    servicePeriod: data["servicePeriod"] !== undefined ? serializeGoogleCloudPaymentsResellerSubscriptionV1ServicePeriod(data["servicePeriod"]) : undefined,
  };
}

function deserializeGoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails(data: any): GoogleCloudPaymentsResellerSubscriptionV1SubscriptionLineItemOneTimeRecurrenceDetails {
  return {
    ...data,
    servicePeriod: data["servicePeriod"] !== undefined ? deserializeGoogleCloudPaymentsResellerSubscriptionV1ServicePeriod(data["servicePeriod"]) : undefined,
  };
}

/**
 * Describes the spec for one promotion.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1SubscriptionPromotionSpec {
  /**
   * Output only. The duration of the free trial if the promotion is of type
   * FREE_TRIAL.
   */
  readonly freeTrialDuration?: GoogleCloudPaymentsResellerSubscriptionV1Duration;
  /**
   * Output only. The details of the introductory pricing spec if the promotion
   * is of type INTRODUCTORY_PRICING.
   */
  readonly introductoryPricingDetails?: GoogleCloudPaymentsResellerSubscriptionV1PromotionIntroductoryPricingDetails;
  /**
   * Required. Promotion resource name that identifies a promotion. The format
   * is 'partners/{partner_id}/promotions/{promotion_id}'.
   */
  promotion?: string;
  /**
   * Output only. The type of the promotion for the spec.
   */
  readonly type?:  | "PROMOTION_TYPE_UNSPECIFIED" | "PROMOTION_TYPE_FREE_TRIAL" | "PROMOTION_TYPE_INTRODUCTORY_PRICING";
}

/**
 * Details about the previous subscription that this new subscription
 * upgrades/downgrades from.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1SubscriptionUpgradeDowngradeDetails {
  /**
   * Required. Specifies the billing cycle spec for the new upgraded/downgraded
   * subscription.
   */
  billingCycleSpec?:  | "BILLING_CYCLE_SPEC_UNSPECIFIED" | "BILLING_CYCLE_SPEC_ALIGN_WITH_PREVIOUS_SUBSCRIPTION" | "BILLING_CYCLE_SPEC_START_IMMEDIATELY";
  /**
   * Required. The previous subscription id to be replaced. This is not the
   * full resource name, use the subscription_id segment only.
   */
  previousSubscriptionId?: string;
}

/**
 * Request to revoke a cancellation request.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1UndoCancelSubscriptionRequest {
}

/**
 * Response that contains the updated subscription resource.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1UndoCancelSubscriptionResponse {
  /**
   * The updated subscription resource.
   */
  subscription?: GoogleCloudPaymentsResellerSubscriptionV1Subscription;
}

/**
 * Payload specific to Youtube products.
 */
export interface GoogleCloudPaymentsResellerSubscriptionV1YoutubePayload {
  /**
   * The list of eligibility_ids which are applicable for the line item.
   */
  partnerEligibilityIds?: string[];
}

/**
 * Localized variant of a text in a particular language.
 */
export interface GoogleTypeLocalizedText {
  /**
   * The text's BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Localized string in the language corresponding to `language_code' below.
   */
  text?: string;
}

/**
 * Additional options for PaymentsResellerSubscription#partnersProductsList.
 */
export interface PartnersProductsListOptions {
  /**
   * Optional. Specifies the filters for the product results. The syntax is
   * defined in https://google.aip.dev/160 with the following caveats: - Only
   * the following features are supported: - Logical operator `AND` - Comparison
   * operator `=` (no wildcards `*`) - Traversal operator `.` - Has operator `:`
   * (no wildcards `*`) - Only the following fields are supported: -
   * `regionCodes` - `youtubePayload.partnerEligibilityId` -
   * `youtubePayload.postalCode` - Unless explicitly mentioned above, other
   * features are not supported. Example: `regionCodes:US AND
   * youtubePayload.postalCode=94043 AND
   * youtubePayload.partnerEligibilityId=eligibility-id`
   */
  filter?: string;
  /**
   * Optional. The maximum number of products to return. The service may return
   * fewer than this value. If unspecified, at most 50 products will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListProducts` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListProducts` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for PaymentsResellerSubscription#partnersPromotionsList.
 */
export interface PartnersPromotionsListOptions {
  /**
   * Optional. Specifies the filters for the promotion results. The syntax is
   * defined in https://google.aip.dev/160 with the following caveats: - Only
   * the following features are supported: - Logical operator `AND` - Comparison
   * operator `=` (no wildcards `*`) - Traversal operator `.` - Has operator `:`
   * (no wildcards `*`) - Only the following fields are supported: -
   * `applicableProducts` - `regionCodes` -
   * `youtubePayload.partnerEligibilityId` - `youtubePayload.postalCode` -
   * Unless explicitly mentioned above, other features are not supported.
   * Example: `applicableProducts:partners/partner1/products/product1 AND
   * regionCodes:US AND youtubePayload.postalCode=94043 AND
   * youtubePayload.partnerEligibilityId=eligibility-id`
   */
  filter?: string;
  /**
   * Optional. The maximum number of promotions to return. The service may
   * return fewer than this value. If unspecified, at most 50 products will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListPromotions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListPromotions` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * PaymentsResellerSubscription#partnersSubscriptionsCreate.
 */
export interface PartnersSubscriptionsCreateOptions {
  /**
   * Required. Identifies the subscription resource on the Partner side. The
   * value is restricted to 63 ASCII characters at the maximum. If a
   * subscription was previously created with the same subscription_id, we will
   * directly return that one.
   */
  subscriptionId?: string;
}

/**
 * Additional options for
 * PaymentsResellerSubscription#partnersSubscriptionsProvision.
 */
export interface PartnersSubscriptionsProvisionOptions {
  /**
   * Required. Identifies the subscription resource on the Partner side. The
   * value is restricted to 63 ASCII characters at the maximum. If a
   * subscription was previously created with the same subscription_id, we will
   * directly return that one.
   */
  subscriptionId?: string;
}