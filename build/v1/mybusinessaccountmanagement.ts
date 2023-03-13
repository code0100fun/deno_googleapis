// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Account Management API Client for Deno
 * ==================================================
 * 
 * The My Business Account Management API provides an interface for managing access to a location on Google. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Account Management API provides an interface for managing
 * access to a location on Google. Note - If you have a quota of 0 after
 * enabling the API, please request for GBP API access.
 */
export class MyBusinessAccountManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessaccountmanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Invites the specified user to become an administrator for the specified
   * account. The invitee must accept the invitation in order to be granted
   * access to the account. See AcceptInvitation to programmatically accept an
   * invitation.
   *
   * @param parent Required. The resource name of the account this admin is created for. `accounts/{account_id}`.
   */
  async accountsAdminsCreate(parent: string, req: Admin): Promise<Admin> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/admins`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Admin;
  }

  /**
   * Removes the specified admin from the specified account.
   *
   * @param name Required. The resource name of the admin to remove from the account. `accounts/{account_id}/admins/{admin_id}`.
   */
  async accountsAdminsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the admins for the specified account.
   *
   * @param parent Required. The name of the account from which to retrieve a list of admins. `accounts/{account_id}/admins`.
   */
  async accountsAdminsList(parent: string): Promise<ListAccountAdminsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/admins`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAccountAdminsResponse;
  }

  /**
   * Updates the Admin for the specified Account Admin.
   *
   * @param name Immutable. The resource name. For account admins, this is in the form: `accounts/{account_id}/admins/{admin_id}` For location admins, this is in the form: `locations/{location_id}/admins/{admin_id}` This field will be ignored if set during admin creation.
   */
  async accountsAdminsPatch(name: string, req: Admin, opts: AccountsAdminsPatchOptions = {}): Promise<Admin> {
    opts = serializeAccountsAdminsPatchOptions(opts);
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
    return data as Admin;
  }

  /**
   * Creates an account with the specified name and type under the given
   * parent. - Personal accounts and Organizations cannot be created. - User
   * Groups cannot be created with a Personal account as primary owner. -
   * Location Groups cannot be created with a primary owner of a Personal
   * account if the Personal account is in an Organization. - Location Groups
   * cannot own Location Groups.
   *
   */
  async accountsCreate(req: Account): Promise<Account> {
    const url = new URL(`${this.#baseUrl}v1/accounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Account;
  }

  /**
   * Gets the specified account. Returns `NOT_FOUND` if the account does not
   * exist or if the caller does not have access rights to it.
   *
   * @param name Required. The name of the account to fetch.
   */
  async accountsGet(name: string): Promise<Account> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Account;
  }

  /**
   * Accepts the specified invitation.
   *
   * @param name Required. The name of the invitation that is being accepted. `accounts/{account_id}/invitations/{invitation_id}`
   */
  async accountsInvitationsAccept(name: string, req: AcceptInvitationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:accept`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Declines the specified invitation.
   *
   * @param name Required. The name of the account invitation that is being declined. `accounts/{account_id}/invitations/{invitation_id}`
   */
  async accountsInvitationsDecline(name: string, req: DeclineInvitationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:decline`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Lists pending invitations for the specified account.
   *
   * @param parent Required. The name of the account from which the list of invitations is being retrieved. `accounts/{account_id}/invitations`
   */
  async accountsInvitationsList(parent: string, opts: AccountsInvitationsListOptions = {}): Promise<ListInvitationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/invitations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListInvitationsResponse;
  }

  /**
   * Lists all of the accounts for the authenticated user. This includes all
   * accounts that the user owns, as well as any accounts for which the user has
   * management rights.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<ListAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/accounts`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parentAccount !== undefined) {
      url.searchParams.append("parentAccount", String(opts.parentAccount));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAccountsResponse;
  }

  /**
   * Updates the specified business account. Personal accounts cannot be
   * updated using this method.
   *
   * @param name Immutable. The resource name, in the format `accounts/{account_id}`.
   */
  async accountsPatch(name: string, req: Account, opts: AccountsPatchOptions = {}): Promise<Account> {
    opts = serializeAccountsPatchOptions(opts);
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
    return data as Account;
  }

  /**
   * Invites the specified user to become an administrator for the specified
   * location. The invitee must accept the invitation in order to be granted
   * access to the location. See AcceptInvitation to programmatically accept an
   * invitation.
   *
   * @param parent Required. The resource name of the location this admin is created for. `locations/{location_id}/admins`.
   */
  async locationsAdminsCreate(parent: string, req: Admin): Promise<Admin> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/admins`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Admin;
  }

  /**
   * Removes the specified admin as a manager of the specified location.
   *
   * @param name Required. The resource name of the admin to remove from the location.
   */
  async locationsAdminsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists all of the admins for the specified location.
   *
   * @param parent Required. The name of the location to list admins of. `locations/{location_id}/admins`.
   */
  async locationsAdminsList(parent: string): Promise<ListLocationAdminsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/admins`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLocationAdminsResponse;
  }

  /**
   * Updates the Admin for the specified location. Only the AdminRole of the
   * Admin can be updated.
   *
   * @param name Immutable. The resource name. For account admins, this is in the form: `accounts/{account_id}/admins/{admin_id}` For location admins, this is in the form: `locations/{location_id}/admins/{admin_id}` This field will be ignored if set during admin creation.
   */
  async locationsAdminsPatch(name: string, req: Admin, opts: LocationsAdminsPatchOptions = {}): Promise<Admin> {
    opts = serializeLocationsAdminsPatchOptions(opts);
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
    return data as Admin;
  }

  /**
   * Moves a location from an account that the user owns to another account
   * that the same user administers. The user must be an owner of the account
   * the location is currently associated with and must also be at least a
   * manager of the destination account.
   *
   * @param name Required. The name of the location to transfer. `locations/{location_id}`.
   */
  async locationsTransfer(name: string, req: TransferLocationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:transfer`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }
}

/**
 * Request message for AccessControl.AcceptInvitation.
 */
export interface AcceptInvitationRequest {
}

/**
 * An account is a container for your location. If you are the only user who
 * manages locations for your business, you can use your personal Google
 * Account. To share management of locations with multiple users, [create a
 * business account]
 * (https://support.google.com/business/answer/6085339?ref_topic=6085325).
 */
export interface Account {
  /**
   * Required. The name of the account. For an account of type `PERSONAL`, this
   * is the first and last name of the user account.
   */
  accountName?: string;
  /**
   * Output only. Account reference number if provisioned.
   */
  readonly accountNumber?: string;
  /**
   * Immutable. The resource name, in the format `accounts/{account_id}`.
   */
  name?: string;
  /**
   * Output only. Additional info for an organization. This is populated only
   * for an organization account.
   */
  readonly organizationInfo?: OrganizationInfo;
  /**
   * Output only. Specifies the permission level the user has for this account.
   */
  readonly permissionLevel?:  | "PERMISSION_LEVEL_UNSPECIFIED" | "OWNER_LEVEL" | "MEMBER_LEVEL";
  /**
   * Required. Input only. The resource name of the account which will be the
   * primary owner of the account being created. It should be of the form
   * `accounts/{account_id}`.
   */
  primaryOwner?: string;
  /**
   * Output only. Specifies the AccountRole of this account.
   */
  readonly role?:  | "ACCOUNT_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER";
  /**
   * Required. Contains the type of account. Accounts of type PERSONAL and
   * ORGANIZATION cannot be created using this API.
   */
  type?:  | "ACCOUNT_TYPE_UNSPECIFIED" | "PERSONAL" | "LOCATION_GROUP" | "USER_GROUP" | "ORGANIZATION";
  /**
   * Output only. If verified, future locations that are created are
   * automatically connected to Google Maps, and have Google+ pages created,
   * without requiring moderation.
   */
  readonly verificationState?:  | "VERIFICATION_STATE_UNSPECIFIED" | "VERIFIED" | "UNVERIFIED" | "VERIFICATION_REQUESTED";
  /**
   * Output only. Indicates whether the account is vetted by Google. A vetted
   * account is able to verify locations via the VETTED_PARTNER method.
   */
  readonly vettedState?:  | "VETTED_STATE_UNSPECIFIED" | "NOT_VETTED" | "VETTED" | "INVALID";
}

/**
 * Additional options for MyBusinessAccountManagement#accountsAdminsPatch.
 */
export interface AccountsAdminsPatchOptions {
  /**
   * Required. The specific fields that should be updated. The only editable
   * field is role.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsAdminsPatchOptions(data: any): AccountsAdminsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsAdminsPatchOptions(data: any): AccountsAdminsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for MyBusinessAccountManagement#accountsInvitationsList.
 */
export interface AccountsInvitationsListOptions {
  /**
   * Optional. Filtering the response is supported via the
   * Invitation.target_type field.
   */
  filter?: string;
}

/**
 * Additional options for MyBusinessAccountManagement#accountsList.
 */
export interface AccountsListOptions {
  /**
   * Optional. A filter constraining the accounts to return. The response
   * includes only entries that match the filter. If `filter` is empty, then no
   * constraints are applied and all accounts (paginated) are retrieved for the
   * requested account. For example, a request with the filter `type=USER_GROUP`
   * will only return user groups. The `type` field is the only supported
   * filter.
   */
  filter?: string;
  /**
   * Optional. How many accounts to fetch per page. The default and maximum is
   * 20.
   */
  pageSize?: number;
  /**
   * Optional. If specified, the next page of accounts is retrieved. The
   * `pageToken` is returned when a call to `accounts.list` returns more results
   * than can fit into the requested page size.
   */
  pageToken?: string;
  /**
   * Optional. The resource name of the account for which the list of directly
   * accessible accounts is to be retrieved. This only makes sense for
   * Organizations and User Groups. If empty, will return `ListAccounts` for the
   * authenticated user. `accounts/{account_id}`.
   */
  parentAccount?: string;
}

/**
 * Additional options for MyBusinessAccountManagement#accountsPatch.
 */
export interface AccountsPatchOptions {
  /**
   * Required. The specific fields that should be updated. The only editable
   * field is `accountName`.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If true, the request is validated without actually updating the
   * account.
   */
  validateOnly?: boolean;
}

function serializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * An administrator of an Account or a location.
 */
export interface Admin {
  /**
   * Immutable. The name of the Account resource that this Admin refers to.
   * Used when calling locations.admins.create to invite a LocationGroup as an
   * admin. If both this field and `admin` are set on `CREATE` requests, this
   * field takes precedence and the email address in `admin` will be ignored.
   * Format: `accounts/{account}`.
   */
  account?: string;
  /**
   * Optional. The name of the admin. When making the initial invitation, this
   * is the invitee's email address. On `GET` calls, the user's email address is
   * returned if the invitation is still pending. Otherwise, it contains the
   * user's first and last names. This field is only needed to be set during
   * admin creation.
   */
  admin?: string;
  /**
   * Immutable. The resource name. For account admins, this is in the form:
   * `accounts/{account_id}/admins/{admin_id}` For location admins, this is in
   * the form: `locations/{location_id}/admins/{admin_id}` This field will be
   * ignored if set during admin creation.
   */
  name?: string;
  /**
   * Output only. Indicates whether this admin has a pending invitation for the
   * specified resource.
   */
  readonly pendingInvitation?: boolean;
  /**
   * Required. Specifies the role that this admin uses with the specified
   * Account or Location.
   */
  role?:  | "ADMIN_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER";
}

/**
 * Request message for AccessControl.DeclineInvitation.
 */
export interface DeclineInvitationRequest {
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
 * Represents a pending invitation.
 */
export interface Invitation {
  /**
   * Required. The resource name for the invitation.
   * `accounts/{account_id}/invitations/{invitation_id}`.
   */
  name?: string;
  /**
   * Output only. The invited role on the account.
   */
  readonly role?:  | "ADMIN_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER";
  /**
   * The sparsely populated account this invitation is for.
   */
  targetAccount?: Account;
  /**
   * The target location this invitation is for.
   */
  targetLocation?: TargetLocation;
  /**
   * Output only. Specifies which target types should appear in the response.
   */
  readonly targetType?:  | "TARGET_TYPE_UNSPECIFIED" | "ACCOUNTS_ONLY" | "LOCATIONS_ONLY";
}

/**
 * Response message for AccessControl.ListAccountAdmins.
 */
export interface ListAccountAdminsResponse {
  /**
   * A collection of Admin instances.
   */
  accountAdmins?: Admin[];
}

/**
 * Response message for Accounts.ListAccounts.
 */
export interface ListAccountsResponse {
  /**
   * A collection of accounts to which the user has access. The personal
   * account of the user doing the query will always be the first item of the
   * result, unless it is filtered out.
   */
  accounts?: Account[];
  /**
   * If the number of accounts exceeds the requested page size, this field is
   * populated with a token to fetch the next page of accounts on a subsequent
   * call to `accounts.list`. If there are no more accounts, this field is not
   * present in the response.
   */
  nextPageToken?: string;
}

/**
 * Response message for AccessControl.ListInvitations.
 */
export interface ListInvitationsResponse {
  /**
   * A collection of invitations that are pending for the account. The number
   * of invitations listed here cannot exceed 1000.
   */
  invitations?: Invitation[];
}

/**
 * Response message for AccessControl.ListLocationAdmins.
 */
export interface ListLocationAdminsResponse {
  /**
   * A collection of Admins.
   */
  admins?: Admin[];
}

/**
 * Additional options for MyBusinessAccountManagement#locationsAdminsPatch.
 */
export interface LocationsAdminsPatchOptions {
  /**
   * Required. The specific fields that should be updated. The only editable
   * field is role.
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsAdminsPatchOptions(data: any): LocationsAdminsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsAdminsPatchOptions(data: any): LocationsAdminsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional information stored for an organization.
 */
export interface OrganizationInfo {
  /**
   * Output only. The postal address for the account.
   */
  readonly address?: PostalAddress;
  /**
   * Output only. The contact number for the organization.
   */
  readonly phoneNumber?: string;
  /**
   * Output only. The registered domain for the account.
   */
  readonly registeredDomain?: string;
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
 * Represents a target location for a pending invitation.
 */
export interface TargetLocation {
  /**
   * The address of the location to which the user is invited.
   */
  address?: string;
  /**
   * The name of the location to which the user is invited.
   */
  locationName?: string;
}

/**
 * Request message for AccessControl.TransferLocation.
 */
export interface TransferLocationRequest {
  /**
   * Required. Name of the account resource to transfer the location to (for
   * example, "accounts/{account}").
   */
  destinationAccount?: string;
}