// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Verifications API Client for Deno
 * =============================================
 * 
 * The My Business Verifications API provides an interface for taking verifications related actions for locations.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Verifications API provides an interface for taking
 * verifications related actions for locations.
 */
export class MyBusinessVerifications {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessverifications.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Reports all eligible verification options for a location in a specific
   * language.
   *
   * @param location Required. The location to verify.
   */
  async locationsFetchVerificationOptions(location: string, req: FetchVerificationOptionsRequest): Promise<FetchVerificationOptionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }:fetchVerificationOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as FetchVerificationOptionsResponse;
  }

  /**
   * Gets the VoiceOfMerchant state.
   *
   * @param name Required. Resource name of the location.
   */
  async locationsGetVoiceOfMerchantState(name: string): Promise<VoiceOfMerchantState> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/VoiceOfMerchantState`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VoiceOfMerchantState;
  }

  /**
   * Completes a `PENDING` verification. It is only necessary for non `AUTO`
   * verification methods. `AUTO` verification request is instantly `VERIFIED`
   * upon creation.
   *
   * @param name Required. Resource name of the verification to complete.
   */
  async locationsVerificationsComplete(name: string, req: CompleteVerificationRequest): Promise<CompleteVerificationResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:complete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCompleteVerificationResponse(data);
  }

  /**
   * List verifications of a location, ordered by create time.
   *
   * @param parent Required. Resource name of the location that verification requests belong to.
   */
  async locationsVerificationsList(parent: string, opts: LocationsVerificationsListOptions = {}): Promise<ListVerificationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/verifications`);
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
    return deserializeListVerificationsResponse(data);
  }

  /**
   * Starts the verification process for a location.
   *
   * @param name Required. Resource name of the location to verify.
   */
  async locationsVerify(name: string, req: VerifyLocationRequest): Promise<VerifyLocationResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:verify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVerifyLocationResponse(data);
  }

  /**
   * Generates a token for the provided location data as a vetted
   * [partner](https://support.google.com/business/answer/7674102). Throws
   * PERMISSION_DENIED if the caller is not a vetted partner account. Throws
   * FAILED_PRECONDITION if the caller's VettedStatus is INVALID.
   *
   */
  async verificationTokensGenerate(req: GenerateVerificationTokenRequest): Promise<GenerateVerificationTokenResponse> {
    const url = new URL(`${this.#baseUrl}v1/verificationTokens:generate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateVerificationTokenResponse;
  }
}

/**
 * Display data for verifications through postcard.
 */
export interface AddressVerificationData {
  /**
   * Address that a postcard can be sent to.
   */
  address?: PostalAddress;
  /**
   * Merchant's business name.
   */
  business?: string;
  /**
   * Expected number of days it takes to deliver a postcard to the address's
   * region.
   */
  expectedDeliveryDaysRegion?: number;
}

/**
 * Request message for Verifications.CompleteVerificationAction.
 */
export interface CompleteVerificationRequest {
  /**
   * Required. PIN code received by the merchant to complete the verification.
   */
  pin?: string;
}

/**
 * Response message for Verifications.CompleteVerificationAction.
 */
export interface CompleteVerificationResponse {
  /**
   * The completed verification.
   */
  verification?: Verification;
}

function serializeCompleteVerificationResponse(data: any): CompleteVerificationResponse {
  return {
    ...data,
    verification: data["verification"] !== undefined ? serializeVerification(data["verification"]) : undefined,
  };
}

function deserializeCompleteVerificationResponse(data: any): CompleteVerificationResponse {
  return {
    ...data,
    verification: data["verification"] !== undefined ? deserializeVerification(data["verification"]) : undefined,
  };
}

/**
 * Indicates that the location fails to comply with our
 * [guidelines](https://support.google.com/business/answer/3038177).
 */
export interface ComplyWithGuidelines {
  /**
   * The reason why the location is being recommended to comply with
   * guidelines.
   */
  recommendationReason?:  | "RECOMMENDATION_REASON_UNSPECIFIED" | "BUSINESS_LOCATION_SUSPENDED" | "BUSINESS_LOCATION_DISABLED";
}

/**
 * Display data for verifications through email.
 */
export interface EmailVerificationData {
  /**
   * Domain name in the email address. e.g. "gmail.com" in foo@gmail.com
   */
  domain?: string;
  /**
   * Whether client is allowed to provide a different user name.
   */
  isUserNameEditable?: boolean;
  /**
   * User name in the email address. e.g. "foo" in foo@gmail.com
   */
  user?: string;
}

/**
 * Request message for Verifications.FetchVerificationOptions.
 */
export interface FetchVerificationOptionsRequest {
  /**
   * Optional. Extra context information for the verification of service
   * businesses. Can only be applied to the locations whose business type is
   * CUSTOMER_LOCATION_ONLY. Specifying an accurate address could enable more
   * options. INVALID_ARGUMENT will be thrown if it is set for other business
   * types of locations.
   */
  context?: ServiceBusinessContext;
  /**
   * Required. The BCP 47 language code representing the language that is to be
   * used for the verification process. Available options vary by language.
   */
  languageCode?: string;
}

/**
 * Response message for Verifications.FetchVerificationOptions.
 */
export interface FetchVerificationOptionsResponse {
  /**
   * The available verification options.
   */
  options?: VerificationOption[];
}

/**
 * Request message for Verifications.GenerateVerificationToken.
 */
export interface GenerateVerificationTokenRequest {
  /**
   * Required. The target location. Note: The location information should
   * exactly match the target Location, otherwise the generated verification
   * token won't be able to verify the target Location.
   */
  location?: Location;
}

/**
 * Response message for Verifications.GenerateVerificationToken.
 */
export interface GenerateVerificationTokenResponse {
  /**
   * The generated token to verify the location.
   */
  token?: VerificationToken;
}

/**
 * Response message for Verifications.ListVerifications.
 */
export interface ListVerificationsResponse {
  /**
   * If the number of verifications exceeded the requested page size, this
   * field will be populated with a token to fetch the next page of verification
   * on a subsequent call. If there are no more attributes, this field will not
   * be present in the response.
   */
  nextPageToken?: string;
  /**
   * List of the verifications.
   */
  verifications?: Verification[];
}

function serializeListVerificationsResponse(data: any): ListVerificationsResponse {
  return {
    ...data,
    verifications: data["verifications"] !== undefined ? data["verifications"].map((item: any) => (serializeVerification(item))) : undefined,
  };
}

function deserializeListVerificationsResponse(data: any): ListVerificationsResponse {
  return {
    ...data,
    verifications: data["verifications"] !== undefined ? data["verifications"].map((item: any) => (deserializeVerification(item))) : undefined,
  };
}

/**
 * A subset of location info. See the [help center article]
 * (https://support.google.com/business/answer/3038177) for a detailed
 * description of these fields, or the [category
 * endpoint](/my-business/reference/rest/v4/categories) for a list of valid
 * business categories.
 */
export interface Location {
  /**
   * Required. A precise, accurate address to describe your business location.
   * PO boxes or mailboxes located at remote locations are not acceptable. At
   * this time, you can specify a maximum of five `address_lines` values in the
   * address.
   */
  address?: PostalAddress;
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
  name?: string;
  /**
   * Required. Id of the category that best describes the core business this
   * location engages in. e.g. gcid:bakery.
   */
  primaryCategoryId?: string;
  /**
   * Optional. A phone number that connects to your individual business
   * location as directly as possible. Use a local phone number instead of a
   * central, call center helpline number whenever possible.
   */
  primaryPhone?: string;
  /**
   * Optional. A URL for this business. If possible, use a URL that represents
   * this individual business location instead of a generic website/URL that
   * represents all locations, or the brand.
   */
  websiteUri?: string;
}

/**
 * Additional options for MyBusinessVerifications#locationsVerificationsList.
 */
export interface LocationsVerificationsListOptions {
  /**
   * How many verification to include per page. Minimum is 1, and the default
   * and maximum page size is 100.
   */
  pageSize?: number;
  /**
   * If specified, returns the next page of verifications.
   */
  pageToken?: string;
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
 * Indicates that the location duplicates another location that is in good
 * standing.
 */
export interface ResolveOwnershipConflict {
}

/**
 * Additional data for service business verification.
 */
export interface ServiceBusinessContext {
  /**
   * The verification address of the location. It is used to either enable more
   * verification options or send a postcard.
   */
  address?: PostalAddress;
}

/**
 * A verification represents a verification attempt on a location.
 */
export interface Verification {
  /**
   * Optional. Response announcement set only if the method is VETTED_PARTNER.
   */
  announcement?: string;
  /**
   * The timestamp when the verification is requested.
   */
  createTime?: Date;
  /**
   * The method of the verification.
   */
  method?:  | "VERIFICATION_METHOD_UNSPECIFIED" | "ADDRESS" | "EMAIL" | "PHONE_CALL" | "SMS" | "AUTO" | "VETTED_PARTNER";
  /**
   * Resource name of the verification.
   */
  name?: string;
  /**
   * The state of the verification.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "COMPLETED" | "FAILED";
}

function serializeVerification(data: any): Verification {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeVerification(data: any): Verification {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The verification option represents how to verify the location (indicated by
 * verification method) and where the verification will be sent to (indicated by
 * display data).
 */
export interface VerificationOption {
  /**
   * Set only if the method is MAIL.
   */
  addressData?: AddressVerificationData;
  /**
   * Set only if the method is VETTED_PARTNER.
   */
  announcement?: string;
  /**
   * Set only if the method is EMAIL.
   */
  emailData?: EmailVerificationData;
  /**
   * Set only if the method is PHONE_CALL or SMS. Phone number that the PIN
   * will be sent to.
   */
  phoneNumber?: string;
  /**
   * Method to verify the location.
   */
  verificationMethod?:  | "VERIFICATION_METHOD_UNSPECIFIED" | "ADDRESS" | "EMAIL" | "PHONE_CALL" | "SMS" | "AUTO" | "VETTED_PARTNER";
}

/**
 * Token generated by a vetted
 * [partner](https://support.google.com/business/answer/7674102).
 */
export interface VerificationToken {
  /**
   * The token string.
   */
  tokenString?: string;
}

/**
 * Indicates that the location requires verification. Contains information
 * about the current verification actions performed on the location.
 */
export interface Verify {
  /**
   * Indicates whether a verification process has already started, and can be
   * completed by the location.
   */
  hasPendingVerification?: boolean;
}

/**
 * Request message for Verifications.VerifyLocation.
 */
export interface VerifyLocationRequest {
  /**
   * Optional. Extra context information for the verification of service
   * businesses. It is only required for the locations whose business type is
   * CUSTOMER_LOCATION_ONLY. For ADDRESS verification, the address will be used
   * to send out postcard. For other methods, it should be the same as the one
   * that is passed to GetVerificationOptions. INVALID_ARGUMENT will be thrown
   * if it is set for other types of business locations.
   */
  context?: ServiceBusinessContext;
  /**
   * Optional. The input for EMAIL method. Email address where the PIN should
   * be sent to. An email address is accepted only if it is one of the addresses
   * provided by FetchVerificationOptions. If the EmailVerificationData has
   * is_user_name_editable set to true, the client may specify a different user
   * name (local-part) but must match the domain name.
   */
  emailAddress?: string;
  /**
   * Optional. The BCP 47 language code representing the language that is to be
   * used for the verification process.
   */
  languageCode?: string;
  /**
   * Optional. The input for ADDRESS method. Contact name the mail should be
   * sent to.
   */
  mailerContact?: string;
  /**
   * Required. Verification method.
   */
  method?:  | "VERIFICATION_METHOD_UNSPECIFIED" | "ADDRESS" | "EMAIL" | "PHONE_CALL" | "SMS" | "AUTO" | "VETTED_PARTNER";
  /**
   * Optional. The input for PHONE_CALL/SMS method The phone number that should
   * be called or be sent SMS to. It must be one of the phone numbers in the
   * eligible options.
   */
  phoneNumber?: string;
  /**
   * Optional. The input for VETTED_PARTNER method available to select
   * [partners.](https://support.google.com/business/answer/7674102) The input
   * is not needed for a vetted account. Token that is associated to the
   * location. Token that is associated to the location.
   */
  token?: VerificationToken;
}

/**
 * Response message for Verifications.VerifyLocation.
 */
export interface VerifyLocationResponse {
  /**
   * The created verification request.
   */
  verification?: Verification;
}

function serializeVerifyLocationResponse(data: any): VerifyLocationResponse {
  return {
    ...data,
    verification: data["verification"] !== undefined ? serializeVerification(data["verification"]) : undefined,
  };
}

function deserializeVerifyLocationResponse(data: any): VerifyLocationResponse {
  return {
    ...data,
    verification: data["verification"] !== undefined ? deserializeVerification(data["verification"]) : undefined,
  };
}

/**
 * Response message for VoiceOfMerchant.GetVoiceOfMerchantState.
 */
export interface VoiceOfMerchantState {
  /**
   * The location fails to comply with our
   * [guidelines](https://support.google.com/business/answer/3038177) and
   * requires additional steps for reinstatement. To fix this issue, consult the
   * [Help Center Article](https://support.google.com/business/answer/4569145).
   */
  complyWithGuidelines?: ComplyWithGuidelines;
  /**
   * Indicates whether the location has the authority (ownership) over the
   * business on Google. If true, another location cannot take over and become
   * the dominant listing on Maps. However, edits will not become live unless
   * Voice of Merchant is gained (i.e. has_voice_of_merchant is true).
   */
  hasBusinessAuthority?: boolean;
  /**
   * Indicates whether the location is in good standing and has control over
   * the business on Google. Any edits made to the location will propagate to
   * Maps after passing the review phase.
   */
  hasVoiceOfMerchant?: boolean;
  /**
   * This location duplicates another location that is in good standing. If you
   * have access to the location in good standing, use that location's id to
   * perform operations. Otherwise, request access from the current owner.
   */
  resolveOwnershipConflict?: ResolveOwnershipConflict;
  /**
   * Start or continue the verification process.
   */
  verify?: Verify;
  /**
   * Wait to gain Voice of Merchant. The location is under review for quality
   * purposes.
   */
  waitForVoiceOfMerchant?: WaitForVoiceOfMerchant;
}

/**
 * Indicates that the location will gain voice of merchant after passing
 * review.
 */
export interface WaitForVoiceOfMerchant {
}