// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Workspace Reseller API Client for Deno
 * =============================================
 * 
 * Perform common functions that are available on the Channel Services console at scale, like placing orders and viewing customer information
 * 
 * Docs: https://developers.google.com/google-apps/reseller/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Perform common functions that are available on the Channel Services console
 * at scale, like placing orders and viewing customer information
 */
export class Reseller {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://reseller.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a customer account. Use this operation to see a customer account
   * already in your reseller management, or to see the minimal account
   * information for an existing customer that you do not manage. For more
   * information about the API response for existing customers, see [retrieving
   * a customer
   * account](/admin-sdk/reseller/v1/how-tos/manage_customers#get_customer).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   */
  async customersGet(customerId: string): Promise<Customer> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Customer;
  }

  /**
   * Orders a new customer's account. Before ordering a new customer account,
   * establish whether the customer account already exists using the
   * [`customers.get`](/admin-sdk/reseller/v1/reference/customers/get) If the
   * customer account exists as a direct Google account or as a resold customer
   * account from another reseller, use the `customerAuthToken\` as described in
   * [order a resold account for an existing
   * customer](/admin-sdk/reseller/v1/how-tos/manage_customers#create_existing_customer).
   * For more information about ordering a new customer account, see [order a
   * new customer
   * account](/admin-sdk/reseller/v1/how-tos/manage_customers#create_customer).
   * After creating a new customer account, you must provision a user as an
   * administrator. The customer's administrator is required to sign in to the
   * Admin console and sign the G Suite via Reseller agreement to activate the
   * account. Resellers are prohibited from signing the G Suite via Reseller
   * agreement on the customer's behalf. For more information, see [order a new
   * customer account](/admin-sdk/reseller/v1/how-tos/manage_customers#tos).
   *
   */
  async customersInsert(req: Customer, opts: CustomersInsertOptions = {}): Promise<Customer> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers`);
    if (opts.customerAuthToken !== undefined) {
      url.searchParams.append("customerAuthToken", String(opts.customerAuthToken));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Customer;
  }

  /**
   * Updates a customer account's settings. This method supports patch
   * semantics. You cannot update `customerType` via the Reseller API, but a
   * `"team"` customer can verify their domain and become `customerType =
   * "domain"`. For more information, see [Verify your domain to unlock
   * Essentials features](https://support.google.com/a/answer/9122284).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   */
  async customersPatch(customerId: string, req: Customer): Promise<Customer> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Customer;
  }

  /**
   * Updates a customer account's settings. You cannot update `customerType`
   * via the Reseller API, but a `"team"` customer can verify their domain and
   * become `customerType = "domain"`. For more information, see [update a
   * customer's
   * settings](/admin-sdk/reseller/v1/how-tos/manage_customers#update_customer).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   */
  async customersUpdate(customerId: string, req: Customer): Promise<Customer> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Customer;
  }

  /**
   * Returns all the details of the watch corresponding to the reseller.
   *
   */
  async resellernotifyGetwatchdetails(): Promise<ResellernotifyGetwatchdetailsResponse> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/resellernotify/getwatchdetails`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ResellernotifyGetwatchdetailsResponse;
  }

  /**
   * Registers a Reseller for receiving notifications.
   *
   */
  async resellernotifyRegister(opts: ResellernotifyRegisterOptions = {}): Promise<ResellernotifyResource> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/resellernotify/register`);
    if (opts.serviceAccountEmailAddress !== undefined) {
      url.searchParams.append("serviceAccountEmailAddress", String(opts.serviceAccountEmailAddress));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ResellernotifyResource;
  }

  /**
   * Unregisters a Reseller for receiving notifications.
   *
   */
  async resellernotifyUnregister(opts: ResellernotifyUnregisterOptions = {}): Promise<ResellernotifyResource> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/resellernotify/unregister`);
    if (opts.serviceAccountEmailAddress !== undefined) {
      url.searchParams.append("serviceAccountEmailAddress", String(opts.serviceAccountEmailAddress));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ResellernotifyResource;
  }

  /**
   * Activates a subscription previously suspended by the reseller. If you did
   * not suspend the customer subscription and it is suspended for any other
   * reason, such as for abuse or a pending ToS acceptance, this call will not
   * reactivate the customer subscription.
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsActivate(customerId: string, subscriptionId: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/activate`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeSubscription(data);
  }

  /**
   * Updates a subscription plan. Use this method to update a plan for a 30-day
   * trial or a flexible plan subscription to an annual commitment plan with
   * monthly or yearly payments. How a plan is updated differs depending on the
   * plan and the products. For more information, see the description in [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_subscription_plan).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsChangePlan(customerId: string, subscriptionId: string, req: ChangePlanRequest): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/changePlan`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Updates a user license's renewal settings. This is applicable for accounts
   * with annual commitment plans only. For more information, see the
   * description in [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_renewal).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsChangeRenewalSettings(customerId: string, subscriptionId: string, req: RenewalSettings): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/changeRenewalSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Updates a subscription's user license settings. For more information about
   * updating an annual commitment plan or a flexible plan subscription’s
   * licenses, see [Manage
   * Subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#update_subscription_seat).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsChangeSeats(customerId: string, subscriptionId: string, req: Seats): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/changeSeats`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Cancels, suspends, or transfers a subscription to direct.
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsDelete(customerId: string, subscriptionId: string, opts: SubscriptionsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }`);
    if (opts.deletionType !== undefined) {
      url.searchParams.append("deletionType", String(opts.deletionType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a specific subscription. The `subscriptionId` can be found using the
   * [Retrieve all reseller
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#get_all_subscriptions)
   * method. For more information about retrieving a specific subscription, see
   * the information descrived in [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#get_subscription).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsGet(customerId: string, subscriptionId: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscription(data);
  }

  /**
   * Creates or transfer a subscription. Create a subscription for a customer's
   * account that you ordered using the [Order a new customer
   * account](/admin-sdk/reseller/v1/reference/customers/insert.html) method.
   * For more information about creating a subscription for different payment
   * plans, see [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#create_subscription).\
   * If you did not order the customer's account using the customer insert
   * method, use the customer's `customerAuthToken` when creating a subscription
   * for that customer. If transferring a G Suite subscription with an
   * associated Google Drive or Google Vault subscription, use the [batch
   * operation](/admin-sdk/reseller/v1/how-tos/batch.html) to transfer all of
   * these subscriptions. For more information, see how to [transfer
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#transfer_a_subscription).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   */
  async subscriptionsInsert(customerId: string, req: Subscription, opts: SubscriptionsInsertOptions = {}): Promise<Subscription> {
    req = serializeSubscription(req);
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions`);
    if (opts.customerAuthToken !== undefined) {
      url.searchParams.append("customerAuthToken", String(opts.customerAuthToken));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Lists of subscriptions managed by the reseller. The list can be all
   * subscriptions, all of a customer's subscriptions, or all of a customer's
   * transferable subscriptions. Optionally, this method can filter the response
   * by a `customerNamePrefix`. For more information, see [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions).
   *
   */
  async subscriptionsList(opts: SubscriptionsListOptions = {}): Promise<Subscriptions> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/subscriptions`);
    if (opts.customerAuthToken !== undefined) {
      url.searchParams.append("customerAuthToken", String(opts.customerAuthToken));
    }
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.customerNamePrefix !== undefined) {
      url.searchParams.append("customerNamePrefix", String(opts.customerNamePrefix));
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
    return deserializeSubscriptions(data);
  }

  /**
   * Immediately move a 30-day free trial subscription to a paid service
   * subscription. This method is only applicable if a payment plan has already
   * been set up for the 30-day trial subscription. For more information, see
   * [manage
   * subscriptions](/admin-sdk/reseller/v1/how-tos/manage_subscriptions#paid_service).
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsStartPaidService(customerId: string, subscriptionId: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/startPaidService`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeSubscription(data);
  }

  /**
   * Suspends an active subscription. You can use this method to suspend a paid
   * subscription that is currently in the `ACTIVE` state. * For `FLEXIBLE`
   * subscriptions, billing is paused. * For `ANNUAL_MONTHLY_PAY` or
   * `ANNUAL_YEARLY_PAY` subscriptions: * Suspending the subscription does not
   * change the renewal date that was originally committed to. * A suspended
   * subscription does not renew. If you activate the subscription after the
   * original renewal date, a new annual subscription will be created, starting
   * on the day of activation. We strongly encourage you to suspend
   * subscriptions only for short periods of time as suspensions over 60 days
   * may result in the subscription being cancelled.
   *
   * @param customerId This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable.
   * @param subscriptionId This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method.
   */
  async subscriptionsSuspend(customerId: string, subscriptionId: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}apps/reseller/v1/customers/${ customerId }/subscriptions/${ subscriptionId }/suspend`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeSubscription(data);
  }
}

/**
 * JSON template for address of a customer.
 */
export interface Address {
  /**
   * A customer's physical address. An address can be composed of one to three
   * lines. The `addressline2` and `addressLine3` are optional.
   */
  addressLine1?: string;
  /**
   * Line 2 of the address.
   */
  addressLine2?: string;
  /**
   * Line 3 of the address.
   */
  addressLine3?: string;
  /**
   * The customer contact's name. This is required.
   */
  contactName?: string;
  /**
   * For `countryCode` information, see the ISO 3166 country code elements.
   * Verify that country is approved for resale of Google products. This
   * property is required when creating a new customer.
   */
  countryCode?: string;
  /**
   * Identifies the resource as a customer address. Value: `customers#address`
   */
  kind?: string;
  /**
   * An example of a `locality` value is the city of `San Francisco`.
   */
  locality?: string;
  /**
   * The company or company division name. This is required.
   */
  organizationName?: string;
  /**
   * A `postalCode` example is a postal zip code such as `94043`. This property
   * is required when creating a new customer.
   */
  postalCode?: string;
  /**
   * An example of a `region` value is `CA` for the state of California.
   */
  region?: string;
}

/**
 * JSON template for the ChangePlan rpc request.
 */
export interface ChangePlanRequest {
  /**
   * Google-issued code (100 char max) for discounted pricing on subscription
   * plans. Deal code must be included in `changePlan` request in order to
   * receive discounted rate. This property is optional. If a deal code has
   * already been added to a subscription, this property may be left empty and
   * the existing discounted rate will still apply (if not empty, only provide
   * the deal code that is already present on the subscription). If a deal code
   * has never been added to a subscription and this property is left blank,
   * regular pricing will apply.
   */
  dealCode?: string;
  /**
   * Identifies the resource as a subscription change plan request. Value:
   * `subscriptions#changePlanRequest`
   */
  kind?: string;
  /**
   * The `planName` property is required. This is the name of the
   * subscription's payment plan. For more information about the Google payment
   * plans, see API concepts. Possible values are: - `ANNUAL_MONTHLY_PAY` - The
   * annual commitment plan with monthly payments *Caution:
   * *`ANNUAL_MONTHLY_PAY` is returned as `ANNUAL` in all API responses. -
   * `ANNUAL_YEARLY_PAY` - The annual commitment plan with yearly payments -
   * `FLEXIBLE` - The flexible plan - `TRIAL` - The 30-day free trial plan
   */
  planName?: string;
  /**
   * This is an optional property. This purchase order (PO) information is for
   * resellers to use for their company tracking usage. If a `purchaseOrderId`
   * value is given it appears in the API responses and shows up in the invoice.
   * The property accepts up to 80 plain text characters.
   */
  purchaseOrderId?: string;
  /**
   * This is a required property. The seats property is the number of user seat
   * licenses.
   */
  seats?: Seats;
}

/**
 * When a Google customer's account is registered with a reseller, the
 * customer's subscriptions for Google services are managed by this reseller. A
 * customer is described by a primary domain name and a physical address.
 */
export interface Customer {
  /**
   * Like the "Customer email" in the reseller tools, this email is the
   * secondary contact used if something happens to the customer's service such
   * as service outage or a security issue. This property is required when
   * creating a new "domain" customer and should not use the same domain as
   * `customerDomain`. The `alternateEmail` field is not necessary to create a
   * "team" customer.
   */
  alternateEmail?: string;
  /**
   * The customer's primary domain name string. `customerDomain` is required
   * when creating a new customer. Do not include the `www` prefix in the domain
   * when adding a customer.
   */
  customerDomain?: string;
  /**
   * Whether the customer's primary domain has been verified.
   */
  customerDomainVerified?: boolean;
  /**
   * This property will always be returned in a response as the unique
   * identifier generated by Google. In a request, this property can be either
   * the primary domain or the unique identifier generated by Google.
   */
  customerId?: string;
  /**
   * Identifies the type of the customer. Acceptable values include: *
   * `domain`: Implies a domain-verified customer (default). * `team`: Implies
   * an email-verified customer. For more information, see [managed
   * teams](https://support.google.com/a/users/answer/9939479).
   */
  customerType?:  | "customerTypeUnspecified" | "domain" | "team";
  /**
   * Identifies the resource as a customer. Value: `reseller#customer`
   */
  kind?: string;
  /**
   * Customer contact phone number. Must start with "+" followed by the country
   * code. The rest of the number can be contiguous numbers or respect the phone
   * local format conventions, but it must be a real phone number and not, for
   * example, "123". This field is silently ignored if invalid.
   */
  phoneNumber?: string;
  /**
   * A customer's address information. Each field has a limit of 255 charcters.
   */
  postalAddress?: Address;
  /**
   * The first admin details of the customer, present in case of TEAM customer.
   */
  primaryAdmin?: PrimaryAdmin;
  /**
   * URL to customer's Admin console dashboard. The read-only URL is generated
   * by the API service. This is used if your client application requires the
   * customer to complete a task in the Admin console.
   */
  resourceUiUrl?: string;
}

/**
 * Additional options for Reseller#customersInsert.
 */
export interface CustomersInsertOptions {
  /**
   * The `customerAuthToken` query string is required when creating a resold
   * account that transfers a direct customer's subscription or transfers
   * another reseller customer's subscription to your reseller management. This
   * is a hexadecimal authentication token needed to complete the subscription
   * transfer. For more information, see the administrator help center.
   */
  customerAuthToken?: string;
}

/**
 * JSON template for primary admin in case of TEAM customers
 */
export interface PrimaryAdmin {
  /**
   * The business email of the primary administrator of the customer. The email
   * verification link is sent to this email address at the time of customer
   * creation. Primary administrators have access to the customer's Admin
   * Console, including the ability to invite and evict users and manage the
   * administrative needs of the customer.
   */
  primaryEmail?: string;
}

/**
 * JSON template for a subscription renewal settings.
 */
export interface RenewalSettings {
  /**
   * Identifies the resource as a subscription renewal setting. Value:
   * `subscriptions#renewalSettings`
   */
  kind?: string;
  /**
   * Renewal settings for the annual commitment plan. For more detailed
   * information, see renewal options in the administrator help center. When
   * renewing a subscription, the `renewalType` is a required property.
   */
  renewalType?: string;
}

/**
 * JSON template for resellernotify getwatchdetails response.
 */
export interface ResellernotifyGetwatchdetailsResponse {
  /**
   * List of registered service accounts.
   */
  serviceAccountEmailAddresses?: string[];
  /**
   * Topic name of the PubSub
   */
  topicName?: string;
}

/**
 * Additional options for Reseller#resellernotifyRegister.
 */
export interface ResellernotifyRegisterOptions {
  /**
   * The service account which will own the created Cloud-PubSub topic.
   */
  serviceAccountEmailAddress?: string;
}

/**
 * JSON template for resellernotify response.
 */
export interface ResellernotifyResource {
  /**
   * Topic name of the PubSub
   */
  topicName?: string;
}

/**
 * Additional options for Reseller#resellernotifyUnregister.
 */
export interface ResellernotifyUnregisterOptions {
  /**
   * The service account which owns the Cloud-PubSub topic.
   */
  serviceAccountEmailAddress?: string;
}

/**
 * JSON template for subscription seats.
 */
export interface Seats {
  /**
   * Identifies the resource as a subscription seat setting. Value:
   * `subscriptions#seats`
   */
  kind?: string;
  /**
   * Read-only field containing the current number of users that are assigned a
   * license for the product defined in `skuId`. This field's value is
   * equivalent to the numerical count of users returned by the Enterprise
   * License Manager API method:
   * [`listForProductAndSku`](/admin-sdk/licensing/v1/reference/licenseAssignments/listForProductAndSku).
   */
  licensedNumberOfSeats?: number;
  /**
   * This is a required property and is exclusive to subscriptions with
   * `FLEXIBLE` or `TRIAL` plans. This property sets the maximum number of
   * licensed users allowed on a subscription. This quantity can be increased up
   * to the maximum limit defined in the reseller's contract. The minimum
   * quantity is the current number of users in the customer account. *Note: *G
   * Suite subscriptions automatically assign a license to every user.
   */
  maximumNumberOfSeats?: number;
  /**
   * This is a required property and is exclusive to subscriptions with
   * `ANNUAL_MONTHLY_PAY` and `ANNUAL_YEARLY_PAY` plans. This property sets the
   * maximum number of licenses assignable to users on a subscription. The
   * reseller can add more licenses, but once set, the `numberOfSeats` cannot be
   * reduced until renewal. The reseller is invoiced based on the
   * `numberOfSeats` value regardless of how many of these user licenses are
   * assigned. *Note: *Google Workspace subscriptions automatically assign a
   * license to every user.
   */
  numberOfSeats?: number;
}

/**
 * JSON template for a subscription.
 */
export interface Subscription {
  /**
   * Read-only field that returns the current billing method for a
   * subscription.
   */
  billingMethod?: string;
  /**
   * The `creationTime` property is the date when subscription was created. It
   * is in milliseconds using the Epoch format. See an example Epoch converter.
   */
  creationTime?: bigint;
  /**
   * Primary domain name of the customer
   */
  customerDomain?: string;
  /**
   * This property will always be returned in a response as the unique
   * identifier generated by Google. In a request, this property can be either
   * the primary domain or the unique identifier generated by Google.
   */
  customerId?: string;
  /**
   * Google-issued code (100 char max) for discounted pricing on subscription
   * plans. Deal code must be included in `insert` requests in order to receive
   * discounted rate. This property is optional, regular pricing applies if left
   * empty.
   */
  dealCode?: string;
  /**
   * Identifies the resource as a Subscription. Value: `reseller#subscription`
   */
  kind?: string;
  /**
   * The `plan` property is required. In this version of the API, the G Suite
   * plans are the flexible plan, annual commitment plan, and the 30-day free
   * trial plan. For more information about the API"s payment plans, see the API
   * concepts.
   */
  plan?: {
    commitmentInterval?: {
      endTime?: bigint;
      startTime?: bigint;
    };
    isCommitmentPlan?: boolean;
    planName?: string;
  };
  /**
   * This is an optional property. This purchase order (PO) information is for
   * resellers to use for their company tracking usage. If a `purchaseOrderId`
   * value is given it appears in the API responses and shows up in the invoice.
   * The property accepts up to 80 plain text characters.
   */
  purchaseOrderId?: string;
  /**
   * Renewal settings for the annual commitment plan. For more detailed
   * information, see renewal options in the administrator help center.
   */
  renewalSettings?: RenewalSettings;
  /**
   * URL to customer's Subscriptions page in the Admin console. The read-only
   * URL is generated by the API service. This is used if your client
   * application requires the customer to complete a task using the
   * Subscriptions page in the Admin console.
   */
  resourceUiUrl?: string;
  /**
   * This is a required property. The number and limit of user seat licenses in
   * the plan.
   */
  seats?: Seats;
  /**
   * A required property. The `skuId` is a unique system identifier for a
   * product's SKU assigned to a customer in the subscription. For products and
   * SKUs available in this version of the API, see Product and SKU IDs.
   */
  skuId?: string;
  /**
   * Read-only external display name for a product's SKU assigned to a customer
   * in the subscription. SKU names are subject to change at Google's
   * discretion. For products and SKUs available in this version of the API, see
   * Product and SKU IDs.
   */
  skuName?: string;
  /**
   * This is an optional property.
   */
  status?: string;
  /**
   * The `subscriptionId` is the subscription identifier and is unique for each
   * customer. This is a required property. Since a `subscriptionId` changes
   * when a subscription is updated, we recommend not using this ID as a key for
   * persistent data. Use the `subscriptionId` as described in retrieve all
   * reseller subscriptions.
   */
  subscriptionId?: string;
  /**
   * Read-only field containing an enumerable of all the current suspension
   * reasons for a subscription. It is possible for a subscription to have many
   * concurrent, overlapping suspension reasons. A subscription's `STATUS` is
   * `SUSPENDED` until all pending suspensions are removed. Possible options
   * include: - `PENDING_TOS_ACCEPTANCE` - The customer has not logged in and
   * accepted the G Suite Resold Terms of Services. - `RENEWAL_WITH_TYPE_CANCEL`
   * - The customer's commitment ended and their service was cancelled at the
   * end of their term. - `RESELLER_INITIATED` - A manual suspension invoked by
   * a Reseller. - `TRIAL_ENDED` - The customer's trial expired without a plan
   * selected. - `OTHER` - The customer is suspended for an internal Google
   * reason (e.g. abuse or otherwise).
   */
  suspensionReasons?: string[];
  /**
   * Read-only transfer related information for the subscription. For more
   * information, see retrieve transferable subscriptions for a customer.
   */
  transferInfo?: {
    currentLegacySkuId?: string;
    minimumTransferableSeats?: number;
    transferabilityExpirationTime?: bigint;
  };
  /**
   * The G Suite annual commitment and flexible payment plans can be in a
   * 30-day free trial. For more information, see the API concepts.
   */
  trialSettings?: {
    isInTrial?: boolean;
    trialEndTime?: bigint;
  };
}

function serializeSubscription(data: any): Subscription {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? String(data["creationTime"]) : undefined,
    plan: data["plan"] !== undefined ? {
      ...data["plan"],
      commitmentInterval: data["plan"]["commitmentInterval"] !== undefined ? {
        ...data["plan"]["commitmentInterval"],
        endTime: data["plan"]["commitmentInterval"]["endTime"] !== undefined ? String(data["plan"]["commitmentInterval"]["endTime"]) : undefined,
        startTime: data["plan"]["commitmentInterval"]["startTime"] !== undefined ? String(data["plan"]["commitmentInterval"]["startTime"]) : undefined,
      } : undefined,
    } : undefined,
    transferInfo: data["transferInfo"] !== undefined ? {
      ...data["transferInfo"],
      transferabilityExpirationTime: data["transferInfo"]["transferabilityExpirationTime"] !== undefined ? String(data["transferInfo"]["transferabilityExpirationTime"]) : undefined,
    } : undefined,
    trialSettings: data["trialSettings"] !== undefined ? {
      ...data["trialSettings"],
      trialEndTime: data["trialSettings"]["trialEndTime"] !== undefined ? String(data["trialSettings"]["trialEndTime"]) : undefined,
    } : undefined,
  };
}

function deserializeSubscription(data: any): Subscription {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? BigInt(data["creationTime"]) : undefined,
    plan: data["plan"] !== undefined ? {
      ...data["plan"],
      commitmentInterval: data["plan"]["commitmentInterval"] !== undefined ? {
        ...data["plan"]["commitmentInterval"],
        endTime: data["plan"]["commitmentInterval"]["endTime"] !== undefined ? BigInt(data["plan"]["commitmentInterval"]["endTime"]) : undefined,
        startTime: data["plan"]["commitmentInterval"]["startTime"] !== undefined ? BigInt(data["plan"]["commitmentInterval"]["startTime"]) : undefined,
      } : undefined,
    } : undefined,
    transferInfo: data["transferInfo"] !== undefined ? {
      ...data["transferInfo"],
      transferabilityExpirationTime: data["transferInfo"]["transferabilityExpirationTime"] !== undefined ? BigInt(data["transferInfo"]["transferabilityExpirationTime"]) : undefined,
    } : undefined,
    trialSettings: data["trialSettings"] !== undefined ? {
      ...data["trialSettings"],
      trialEndTime: data["trialSettings"]["trialEndTime"] !== undefined ? BigInt(data["trialSettings"]["trialEndTime"]) : undefined,
    } : undefined,
  };
}

/**
 * A subscription manages the relationship of a Google customer's payment plan
 * with a product's SKU, user licenses, 30-day free trial status, and renewal
 * options. A primary role of a reseller is to manage the Google customer's
 * subscriptions.
 */
export interface Subscriptions {
  /**
   * Identifies the resource as a collection of subscriptions. Value:
   * reseller#subscriptions
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
  /**
   * The subscriptions in this page of results.
   */
  subscriptions?: Subscription[];
}

function serializeSubscriptions(data: any): Subscriptions {
  return {
    ...data,
    subscriptions: data["subscriptions"] !== undefined ? data["subscriptions"].map((item: any) => (serializeSubscription(item))) : undefined,
  };
}

function deserializeSubscriptions(data: any): Subscriptions {
  return {
    ...data,
    subscriptions: data["subscriptions"] !== undefined ? data["subscriptions"].map((item: any) => (deserializeSubscription(item))) : undefined,
  };
}

/**
 * Additional options for Reseller#subscriptionsDelete.
 */
export interface SubscriptionsDeleteOptions {
  /**
   * The `deletionType` query string enables the cancellation, downgrade, or
   * suspension of a subscription.
   */
  deletionType:  | "deletion_type_undefined" | "cancel" | "transfer_to_direct";
}

/**
 * Additional options for Reseller#subscriptionsInsert.
 */
export interface SubscriptionsInsertOptions {
  /**
   * The `customerAuthToken` query string is required when creating a resold
   * account that transfers a direct customer's subscription or transfers
   * another reseller customer's subscription to your reseller management. This
   * is a hexadecimal authentication token needed to complete the subscription
   * transfer. For more information, see the administrator help center.
   */
  customerAuthToken?: string;
}

/**
 * Additional options for Reseller#subscriptionsList.
 */
export interface SubscriptionsListOptions {
  /**
   * The `customerAuthToken` query string is required when creating a resold
   * account that transfers a direct customer's subscription or transfers
   * another reseller customer's subscription to your reseller management. This
   * is a hexadecimal authentication token needed to complete the subscription
   * transfer. For more information, see the administrator help center.
   */
  customerAuthToken?: string;
  /**
   * This can be either the customer's primary domain name or the customer's
   * unique identifier. If the domain name for a customer changes, the old
   * domain name cannot be used to access the customer, but the customer's
   * unique identifier (as returned by the API) can always be used. We recommend
   * storing the unique identifier in your systems where applicable.
   */
  customerId?: string;
  /**
   * When retrieving all of your subscriptions and filtering for specific
   * customers, you can enter a prefix for a customer name. Using an example
   * customer group that includes `exam.com`, `example20.com` and `example.com`:
   * - `exa` -- Returns all customer names that start with 'exa' which could
   * include `exam.com`, `example20.com`, and `example.com`. A name prefix is
   * similar to using a regular expression's asterisk, exa*. - `example` --
   * Returns `example20.com` and `example.com`.
   */
  customerNamePrefix?: string;
  /**
   * When retrieving a large list, the `maxResults` is the maximum number of
   * results per page. The `nextPageToken` value takes you to the next page. The
   * default is 20.
   */
  maxResults?: number;
  /**
   * Token to specify next page in the list
   */
  pageToken?: string;
}