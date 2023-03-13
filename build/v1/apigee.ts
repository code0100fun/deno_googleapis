// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Apigee API Client for Deno
 * ==========================
 * 
 * Use the Apigee API to programmatically develop and manage APIs with a set of RESTful operations. Develop and secure API proxies, deploy and undeploy API proxy revisions, monitor APIs, configure environments, manage users, and more. Note: This product is available as a free trial for a time period of 60 days.
 * 
 * Docs: https://cloud.google.com/apigee-api-management/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Use the Apigee API to programmatically develop and manage APIs with a set of
 * RESTful operations. Develop and secure API proxies, deploy and undeploy API
 * proxy revisions, monitor APIs, configure environments, manage users, and
 * more. Note: This product is available as a free trial for a time period of 60
 * days.
 */
export class Apigee {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://apigee.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists hybrid services and its trusted issuers service account ids. This
   * api is authenticated and unauthorized(allow all the users) and used by
   * runtime authn-authz service to query control plane's issuer service account
   * ids.
   *
   * @param name Required. Must be of the form `hybrid/issuers`.
   */
  async hybridIssuersList(name: string): Promise<GoogleCloudApigeeV1ListHybridIssuersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListHybridIssuersResponse;
  }

  /**
   * Create a Datastore for an org
   *
   * @param parent Required. The parent organization name. Must be of the form `organizations/{org}`.
   */
  async organizationsAnalyticsDatastoresCreate(parent: string, req: GoogleCloudApigeeV1Datastore): Promise<GoogleCloudApigeeV1Datastore> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analytics/datastores`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Datastore;
  }

  /**
   * Delete a Datastore from an org.
   *
   * @param name Required. Resource name of the Datastore to be deleted. Must be of the form `organizations/{org}/analytics/datastores/{datastoreId}`
   */
  async organizationsAnalyticsDatastoresDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Get a Datastore
   *
   * @param name Required. Resource name of the Datastore to be get. Must be of the form `organizations/{org}/analytics/datastores/{datastoreId}`
   */
  async organizationsAnalyticsDatastoresGet(name: string): Promise<GoogleCloudApigeeV1Datastore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Datastore;
  }

  /**
   * List Datastores
   *
   * @param parent Required. The parent organization name. Must be of the form `organizations/{org}`.
   */
  async organizationsAnalyticsDatastoresList(parent: string, opts: OrganizationsAnalyticsDatastoresListOptions = {}): Promise<GoogleCloudApigeeV1ListDatastoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analytics/datastores`);
    if (opts.targetType !== undefined) {
      url.searchParams.append("targetType", String(opts.targetType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListDatastoresResponse;
  }

  /**
   * Test if Datastore configuration is correct. This includes checking if
   * credentials provided by customer have required permissions in target
   * destination storage
   *
   * @param parent Required. The parent organization name Must be of the form `organizations/{org}`
   */
  async organizationsAnalyticsDatastoresTest(parent: string, req: GoogleCloudApigeeV1Datastore): Promise<GoogleCloudApigeeV1TestDatastoreResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analytics/datastores:test`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1TestDatastoreResponse;
  }

  /**
   * Update a Datastore
   *
   * @param name Required. The resource name of datastore to be updated. Must be of the form `organizations/{org}/analytics/datastores/{datastoreId}`
   */
  async organizationsAnalyticsDatastoresUpdate(name: string, req: GoogleCloudApigeeV1Datastore): Promise<GoogleCloudApigeeV1Datastore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1Datastore;
  }

  /**
   * Updates or creates API product attributes. This API **replaces** the
   * current list of attributes with the attributes specified in the request
   * body. In this way, you can update existing attributes, add new attributes,
   * or delete existing attributes by omitting them from the request body.
   * **Note**: OAuth access tokens and Key Management Service (KMS) entities
   * (apps, developers, and API products) are cached for 180 seconds (current
   * default). Any custom attributes associated with entities also get cached
   * for at least 180 seconds after entity is accessed during runtime. In this
   * case, the `ExpiresIn` element on the OAuthV2 policy won't be able to expire
   * an access token in less than 180 seconds.
   *
   * @param name Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsAttributes(name: string, req: GoogleCloudApigeeV1Attributes): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/attributes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Deletes an API product attribute.
   *
   * @param name Required. Name of the API product attribute. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}/attributes/{attribute}`
   */
  async organizationsApiproductsAttributesDelete(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Gets the value of an API product attribute.
   *
   * @param name Required. Name of the API product attribute. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}/attributes/{attribute}`
   */
  async organizationsApiproductsAttributesGet(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Lists all API product attributes.
   *
   * @param parent Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsAttributesList(parent: string): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Updates the value of an API product attribute. **Note**: OAuth access
   * tokens and Key Management Service (KMS) entities (apps, developers, and API
   * products) are cached for 180 seconds (current default). Any custom
   * attributes associated with entities also get cached for at least 180
   * seconds after entity is accessed during runtime. In this case, the
   * `ExpiresIn` element on the OAuthV2 policy won't be able to expire an access
   * token in less than 180 seconds.
   *
   * @param name Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsAttributesUpdateApiProductAttribute(name: string, req: GoogleCloudApigeeV1Attribute): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Creates an API product in an organization. You create API products after
   * you have proxied backend services using API proxies. An API product is a
   * collection of API resources combined with quota settings and metadata that
   * you can use to deliver customized and productized API bundles to your
   * developer community. This metadata can include: - Scope - Environments -
   * API proxies - Extensible profile API products enable you repackage APIs on
   * the fly, without having to do any additional coding or configuration.
   * Apigee recommends that you start with a simple API product including only
   * required elements. You then provision credentials to apps to enable them to
   * start testing your APIs. After you have authentication and authorization
   * working against a simple API product, you can iterate to create
   * finer-grained API products, defining different sets of API resources for
   * each API product. **WARNING:** - If you don't specify an API proxy in the
   * request body, *any* app associated with the product can make calls to *any*
   * API in your entire organization. - If you don't specify an environment in
   * the request body, the product allows access to all environments. For more
   * information, see What is an API product?
   *
   * @param parent Required. Name of the organization in which the API product will be created. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsApiproductsCreate(parent: string, req: GoogleCloudApigeeV1ApiProduct): Promise<GoogleCloudApigeeV1ApiProduct> {
    req = serializeGoogleCloudApigeeV1ApiProduct(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apiproducts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiProduct(data);
  }

  /**
   * Deletes an API product from an organization. Deleting an API product
   * causes app requests to the resource URIs defined in the API product to
   * fail. Ensure that you create a new API product to serve existing apps,
   * unless your intention is to disable access to the resources defined in the
   * API product. The API product name required in the request URL is the
   * internal name of the product, not the display name. While they may be the
   * same, it depends on whether the API product was created via the UI or the
   * API. View the list of API products to verify the internal name.
   *
   * @param name Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsDelete(name: string): Promise<GoogleCloudApigeeV1ApiProduct> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1ApiProduct(data);
  }

  /**
   * Gets configuration details for an API product. The API product name
   * required in the request URL is the internal name of the product, not the
   * display name. While they may be the same, it depends on whether the API
   * product was created via the UI or the API. View the list of API products to
   * verify the internal name.
   *
   * @param name Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsGet(name: string): Promise<GoogleCloudApigeeV1ApiProduct> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ApiProduct(data);
  }

  /**
   * Lists all API product names for an organization. Filter the list by
   * passing an `attributename` and `attibutevalue`. The maximum number of API
   * products returned is 1000. You can paginate the list of API products
   * returned using the `startKey` and `count` query parameters.
   *
   * @param parent Required. Name of the organization. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsApiproductsList(parent: string, opts: OrganizationsApiproductsListOptions = {}): Promise<GoogleCloudApigeeV1ListApiProductsResponse> {
    opts = serializeOrganizationsApiproductsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apiproducts`);
    if (opts.attributename !== undefined) {
      url.searchParams.append("attributename", String(opts.attributename));
    }
    if (opts.attributevalue !== undefined) {
      url.searchParams.append("attributevalue", String(opts.attributevalue));
    }
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListApiProductsResponse(data);
  }

  /**
   * Create a rate plan that is associated with an API product in an
   * organization. Using rate plans, API product owners can monetize their API
   * products by configuring one or more of the following: - Billing frequency -
   * Initial setup fees for using an API product - Payment funding model
   * (postpaid only) - Fixed recurring or consumption-based charges for using an
   * API product - Revenue sharing with developer partners An API product can
   * have multiple rate plans associated with it but *only one* rate plan can be
   * active at any point of time. **Note: From the developer's perspective, they
   * purchase API products not rate plans.
   *
   * @param parent Required. Name of the API product that is associated with the rate plan. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsRateplansCreate(parent: string, req: GoogleCloudApigeeV1RatePlan): Promise<GoogleCloudApigeeV1RatePlan> {
    req = serializeGoogleCloudApigeeV1RatePlan(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/rateplans`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1RatePlan(data);
  }

  /**
   * Deletes a rate plan.
   *
   * @param name Required. ID of the rate plan. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}/rateplans/{rateplan}`
   */
  async organizationsApiproductsRateplansDelete(name: string): Promise<GoogleCloudApigeeV1RatePlan> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1RatePlan(data);
  }

  /**
   * Gets the details of a rate plan.
   *
   * @param name Required. Name of the rate plan. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}/rateplans/{rateplan}`
   */
  async organizationsApiproductsRateplansGet(name: string): Promise<GoogleCloudApigeeV1RatePlan> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1RatePlan(data);
  }

  /**
   * Lists all the rate plans for an API product.
   *
   * @param parent Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}` Use `organizations/{org}/apiproducts/-` to return rate plans for all API products within the organization.
   */
  async organizationsApiproductsRateplansList(parent: string, opts: OrganizationsApiproductsRateplansListOptions = {}): Promise<GoogleCloudApigeeV1ListRatePlansResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/rateplans`);
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    if (opts.state !== undefined) {
      url.searchParams.append("state", String(opts.state));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListRatePlansResponse(data);
  }

  /**
   * Updates an existing rate plan.
   *
   * @param name Required. Name of the rate plan. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}/rateplans/{rateplan}`
   */
  async organizationsApiproductsRateplansUpdate(name: string, req: GoogleCloudApigeeV1RatePlan): Promise<GoogleCloudApigeeV1RatePlan> {
    req = serializeGoogleCloudApigeeV1RatePlan(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1RatePlan(data);
  }

  /**
   * Updates an existing API product. You must include all required values,
   * whether or not you are updating them, as well as any optional values that
   * you are updating. The API product name required in the request URL is the
   * internal name of the product, not the display name. While they may be the
   * same, it depends on whether the API product was created via UI or API. View
   * the list of API products to identify their internal names.
   *
   * @param name Required. Name of the API product. Use the following structure in your request: `organizations/{org}/apiproducts/{apiproduct}`
   */
  async organizationsApiproductsUpdate(name: string, req: GoogleCloudApigeeV1ApiProduct): Promise<GoogleCloudApigeeV1ApiProduct> {
    req = serializeGoogleCloudApigeeV1ApiProduct(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiProduct(data);
  }

  /**
   * Creates an API proxy. The API proxy created will not be accessible at
   * runtime until it is deployed to an environment. Create a new API proxy by
   * setting the `name` query parameter to the name of the API proxy. Import an
   * API proxy configuration bundle stored in zip format on your local machine
   * to your organization by doing the following: * Set the `name` query
   * parameter to the name of the API proxy. * Set the `action` query parameter
   * to `import`. * Set the `Content-Type` header to `multipart/form-data`. *
   * Pass as a file the name of API proxy configuration bundle stored in zip
   * format on your local machine using the `file` form field. **Note**: To
   * validate the API proxy configuration bundle only without importing it, set
   * the `action` query parameter to `validate`. When importing an API proxy
   * configuration bundle, if the API proxy does not exist, it will be created.
   * If the API proxy exists, then a new revision is created. Invalid API proxy
   * configurations are rejected, and a list of validation errors is returned to
   * the client.
   *
   * @param parent Required. Name of the organization in the following format: `organizations/{org}`
   */
  async organizationsApisCreate(parent: string, req: GoogleApiHttpBody, opts: OrganizationsApisCreateOptions = {}): Promise<GoogleCloudApigeeV1ApiProxyRevision> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.validate !== undefined) {
      url.searchParams.append("validate", String(opts.validate));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiProxyRevision(data);
  }

  /**
   * Deletes an API proxy and all associated endpoints, policies, resources,
   * and revisions. The API proxy must be undeployed before you can delete it.
   *
   * @param name Required. Name of the API proxy in the following format: `organizations/{org}/apis/{api}`
   */
  async organizationsApisDelete(name: string): Promise<GoogleCloudApigeeV1ApiProxy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1ApiProxy;
  }

  /**
   * Lists all deployments of an API proxy.
   *
   * @param parent Required. Name of the API proxy for which to return deployment information in the following format: `organizations/{org}/apis/{api}`
   */
  async organizationsApisDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Gets an API proxy including a list of existing revisions.
   *
   * @param name Required. Name of the API proxy in the following format: `organizations/{org}/apis/{api}`
   */
  async organizationsApisGet(name: string): Promise<GoogleCloudApigeeV1ApiProxy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ApiProxy;
  }

  /**
   * Creates a key value map in an API proxy.
   *
   * @param parent Required. Name of the environment in which to create the key value map. Use the following structure in your request: `organizations/{org}/apis/{api}`
   */
  async organizationsApisKeyvaluemapsCreate(parent: string, req: GoogleCloudApigeeV1KeyValueMap): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keyvaluemaps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Deletes a key value map from an API proxy.
   *
   * @param name Required. Name of the key value map. Use the following structure in your request: `organizations/{org}/apis/{api}/keyvaluemaps/{keyvaluemap}`
   */
  async organizationsApisKeyvaluemapsDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Creates key value entries in a key value map scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to create the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsApisKeyvaluemapsEntriesCreate(parent: string, req: GoogleCloudApigeeV1KeyValueEntry): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Deletes a key value entry from a key value map scoped to an organization,
   * environment, or API proxy. **Notes:** * After you delete the key value
   * entry, the policy consuming the entry will continue to function with its
   * cached values for a few minutes. This is expected behavior. * Supported for
   * Apigee hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to delete the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsApisKeyvaluemapsEntriesDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Get the key value entry value for a key value map scoped to an
   * organization, environment, or API proxy. **Note**: Supported for Apigee
   * hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to fetch the key value map entry/value. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsApisKeyvaluemapsEntriesGet(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Lists key value entries for key values maps scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to list key value maps. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsApisKeyvaluemapsEntriesList(parent: string, opts: OrganizationsApisKeyvaluemapsEntriesListOptions = {}): Promise<GoogleCloudApigeeV1ListKeyValueEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
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
    return data as GoogleCloudApigeeV1ListKeyValueEntriesResponse;
  }

  /**
   * Lists the names of all API proxies in an organization. The names returned
   * correspond to the names defined in the configuration files for each API
   * proxy.
   *
   * @param parent Required. Name of the organization in the following format: `organizations/{org}`
   */
  async organizationsApisList(parent: string, opts: OrganizationsApisListOptions = {}): Promise<GoogleCloudApigeeV1ListApiProxiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
    if (opts.includeMetaData !== undefined) {
      url.searchParams.append("includeMetaData", String(opts.includeMetaData));
    }
    if (opts.includeRevisions !== undefined) {
      url.searchParams.append("includeRevisions", String(opts.includeRevisions));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListApiProxiesResponse;
  }

  /**
   * Updates an existing API proxy.
   *
   * @param name Required. API proxy to update in the following format: `organizations/{org}/apis/{api}`
   */
  async organizationsApisPatch(name: string, req: GoogleCloudApigeeV1ApiProxy, opts: OrganizationsApisPatchOptions = {}): Promise<GoogleCloudApigeeV1ApiProxy> {
    opts = serializeOrganizationsApisPatchOptions(opts);
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
    return data as GoogleCloudApigeeV1ApiProxy;
  }

  /**
   * Deletes an API proxy revision and all policies, resources, endpoints, and
   * revisions associated with it. The API proxy revision must be undeployed
   * before you can delete it.
   *
   * @param name Required. API proxy revision in the following format: `organizations/{org}/apis/{api}/revisions/{rev}`
   */
  async organizationsApisRevisionsDelete(name: string): Promise<GoogleCloudApigeeV1ApiProxyRevision> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1ApiProxyRevision(data);
  }

  /**
   * Lists all deployments of an API proxy revision.
   *
   * @param parent Required. Name of the API proxy revision for which to return deployment information in the following format: `organizations/{org}/apis/{api}/revisions/{rev}`.
   */
  async organizationsApisRevisionsDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Gets an API proxy revision. To download the API proxy configuration bundle
   * for the specified revision as a zip file, set the `format` query parameter
   * to `bundle`. If you are using curl, specify `-o filename.zip` to save the
   * output to a file; otherwise, it displays to `stdout`. Then, develop the API
   * proxy configuration locally and upload the updated API proxy configuration
   * revision, as described in [updateApiProxyRevision](updateApiProxyRevision).
   *
   * @param name Required. API proxy revision in the following format: `organizations/{org}/apis/{api}/revisions/{rev}`
   */
  async organizationsApisRevisionsGet(name: string, opts: OrganizationsApisRevisionsGetOptions = {}): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Updates an existing API proxy revision by uploading the API proxy
   * configuration bundle as a zip file from your local machine. You can update
   * only API proxy revisions that have never been deployed. After deployment,
   * an API proxy revision becomes immutable, even if it is undeployed. Set the
   * `Content-Type` header to either `multipart/form-data` or
   * `application/octet-stream`.
   *
   * @param name Required. API proxy revision to update in the following format: `organizations/{org}/apis/{api}/revisions/{rev}`
   */
  async organizationsApisRevisionsUpdateApiProxyRevision(name: string, req: GoogleApiHttpBody, opts: OrganizationsApisRevisionsUpdateApiProxyRevisionOptions = {}): Promise<GoogleCloudApigeeV1ApiProxyRevision> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.validate !== undefined) {
      url.searchParams.append("validate", String(opts.validate));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiProxyRevision(data);
  }

  /**
   * Gets the app profile for the specified app ID.
   *
   * @param name Required. App ID in the following format: `organizations/{org}/apps/{app}`
   */
  async organizationsAppsGet(name: string): Promise<GoogleCloudApigeeV1App> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1App(data);
  }

  /**
   * Lists IDs of apps within an organization that have the specified app
   * status (approved or revoked) or are of the specified app type (developer or
   * company).
   *
   * @param parent Required. Resource path of the parent in the following format: `organizations/{org}`
   */
  async organizationsAppsList(parent: string, opts: OrganizationsAppsListOptions = {}): Promise<GoogleCloudApigeeV1ListAppsResponse> {
    opts = serializeOrganizationsAppsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps`);
    if (opts.apiProduct !== undefined) {
      url.searchParams.append("apiProduct", String(opts.apiProduct));
    }
    if (opts.apptype !== undefined) {
      url.searchParams.append("apptype", String(opts.apptype));
    }
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.includeCred !== undefined) {
      url.searchParams.append("includeCred", String(opts.includeCred));
    }
    if (opts.keyStatus !== undefined) {
      url.searchParams.append("keyStatus", String(opts.keyStatus));
    }
    if (opts.rows !== undefined) {
      url.searchParams.append("rows", String(opts.rows));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListAppsResponse(data);
  }

  /**
   * Creates an Apigee organization. See [Create an Apigee
   * organization](https://cloud.google.com/apigee/docs/api-platform/get-started/create-org).
   *
   */
  async organizationsCreate(req: GoogleCloudApigeeV1Organization, opts: OrganizationsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/organizations`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a new data collector.
   *
   * @param parent Required. Name of the organization in which to create the data collector in the following format: `organizations/{org}`.
   */
  async organizationsDatacollectorsCreate(parent: string, req: GoogleCloudApigeeV1DataCollector, opts: OrganizationsDatacollectorsCreateOptions = {}): Promise<GoogleCloudApigeeV1DataCollector> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datacollectors`);
    if (opts.dataCollectorId !== undefined) {
      url.searchParams.append("dataCollectorId", String(opts.dataCollectorId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1DataCollector;
  }

  /**
   * Deletes a data collector.
   *
   * @param name Required. Name of the data collector in the following format: `organizations/{org}/datacollectors/{data_collector_id}`.
   */
  async organizationsDatacollectorsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a data collector.
   *
   * @param name Required. Name of the data collector in the following format: `organizations/{org}/datacollectors/{data_collector_id}`.
   */
  async organizationsDatacollectorsGet(name: string): Promise<GoogleCloudApigeeV1DataCollector> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1DataCollector;
  }

  /**
   * Lists all data collectors.
   *
   * @param parent Required. Name of the organization for which to list data collectors in the following format: `organizations/{org}`.
   */
  async organizationsDatacollectorsList(parent: string, opts: OrganizationsDatacollectorsListOptions = {}): Promise<GoogleCloudApigeeV1ListDataCollectorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datacollectors`);
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
    return data as GoogleCloudApigeeV1ListDataCollectorsResponse;
  }

  /**
   * Updates a data collector.
   *
   * @param name Required. Name of the data collector in the following format: `organizations/{org}/datacollectors/{data_collector_id}`.
   */
  async organizationsDatacollectorsPatch(name: string, req: GoogleCloudApigeeV1DataCollector, opts: OrganizationsDatacollectorsPatchOptions = {}): Promise<GoogleCloudApigeeV1DataCollector> {
    opts = serializeOrganizationsDatacollectorsPatchOptions(opts);
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
    return data as GoogleCloudApigeeV1DataCollector;
  }

  /**
   * Delete an Apigee organization. For organizations with BillingType
   * EVALUATION, an immediate deletion is performed. For paid organizations, a
   * soft-deletion is performed. The organization can be restored within the
   * soft-deletion period which can be controlled using the retention field in
   * the request.
   *
   * @param name Required. Name of the organization. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsDelete(name: string, opts: OrganizationsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.retention !== undefined) {
      url.searchParams.append("retention", String(opts.retention));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists all deployments of API proxies or shared flows.
   *
   * @param parent Required. Name of the organization for which to return deployment information in the following format: `organizations/{org}`
   */
  async organizationsDeploymentsList(parent: string, opts: OrganizationsDeploymentsListOptions = {}): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    if (opts.sharedFlows !== undefined) {
      url.searchParams.append("sharedFlows", String(opts.sharedFlows));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Updates attributes for a developer app. This API replaces the current
   * attributes with those specified in the request.
   *
   * @param name Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsAttributes(name: string, req: GoogleCloudApigeeV1Attributes): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/attributes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Deletes a developer app attribute.
   *
   * @param name Required. Name of the developer app attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/attributes/{attribute}`
   */
  async organizationsDevelopersAppsAttributesDelete(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Returns a developer app attribute.
   *
   * @param name Required. Name of the developer app attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/attributes/{attribute}`
   */
  async organizationsDevelopersAppsAttributesGet(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Returns a list of all developer app attributes.
   *
   * @param parent Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsAttributesList(parent: string): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Updates a developer app attribute. **Note**: OAuth access tokens and Key
   * Management Service (KMS) entities (apps, developers, and API products) are
   * cached for 180 seconds (current default). Any custom attributes associated
   * with these entities are cached for at least 180 seconds after the entity is
   * accessed at runtime. Therefore, an `ExpiresIn` element on the OAuthV2
   * policy won't be able to expire an access token in less than 180 seconds.
   *
   * @param name Required. Name of the developer app attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/attributes/{attribute}`
   */
  async organizationsDevelopersAppsAttributesUpdateDeveloperAppAttribute(name: string, req: GoogleCloudApigeeV1Attribute): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Creates an app associated with a developer. This API associates the
   * developer app with the specified API product and auto-generates an API key
   * for the app to use in calls to API proxies inside that API product. The
   * `name` is the unique ID of the app that you can use in API calls. The
   * `DisplayName` (set as an attribute) appears in the UI. If you don't set the
   * `DisplayName` attribute, the `name` appears in the UI.
   *
   * @param parent Required. Name of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersAppsCreate(parent: string, req: GoogleCloudApigeeV1DeveloperApp): Promise<GoogleCloudApigeeV1DeveloperApp> {
    req = serializeGoogleCloudApigeeV1DeveloperApp(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperApp(data);
  }

  /**
   * Deletes a developer app. **Note**: The delete operation is asynchronous.
   * The developer app is deleted immediately, but its associated resources,
   * such as app keys or access tokens, may take anywhere from a few seconds to
   * a few minutes to be deleted.
   *
   * @param name Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsDelete(name: string): Promise<GoogleCloudApigeeV1DeveloperApp> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1DeveloperApp(data);
  }

  /**
   * Manages access to a developer app by enabling you to: * Approve or revoke
   * a developer app * Generate a new consumer key and secret for a developer
   * app To approve or revoke a developer app, set the `action` query parameter
   * to `approve` or `revoke`, respectively, and the `Content-Type` header to
   * `application/octet-stream`. If a developer app is revoked, none of its API
   * keys are valid for API calls even though the keys are still approved. If
   * successful, the API call returns the following HTTP status code: `204 No
   * Content` To generate a new consumer key and secret for a developer app,
   * pass the new key/secret details. Rather than replace an existing key, this
   * API generates a new key. In this case, multiple key pairs may be associated
   * with a single developer app. Each key pair has an independent status
   * (`approve` or `revoke`) and expiration time. Any approved, non-expired key
   * can be used in an API call. For example, if you're using API key rotation,
   * you can generate new keys with expiration times that overlap keys that are
   * going to expire. You might also generate a new consumer key/secret if the
   * security of the original key/secret is compromised. The `keyExpiresIn`
   * property defines the expiration time for the API key in milliseconds. If
   * you don't set this property or set it to `-1`, the API key never expires.
   * **Notes**: * When generating a new key/secret, this API replaces the
   * existing attributes, notes, and callback URLs with those specified in the
   * request. Include or exclude any existing information that you want to
   * retain or delete, respectively. * To migrate existing consumer keys and
   * secrets to hybrid from another system, see the CreateDeveloperAppKey API.
   *
   * @param name Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsGenerateKeyPairOrUpdateDeveloperAppStatus(name: string, req: GoogleCloudApigeeV1DeveloperApp, opts: OrganizationsDevelopersAppsGenerateKeyPairOrUpdateDeveloperAppStatusOptions = {}): Promise<GoogleCloudApigeeV1DeveloperApp> {
    req = serializeGoogleCloudApigeeV1DeveloperApp(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperApp(data);
  }

  /**
   * Returns the details for a developer app.
   *
   * @param name Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsGet(name: string, opts: OrganizationsDevelopersAppsGetOptions = {}): Promise<GoogleCloudApigeeV1DeveloperApp> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.entity !== undefined) {
      url.searchParams.append("entity", String(opts.entity));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1DeveloperApp(data);
  }

  /**
   * Removes an API product from an app's consumer key. After the API product
   * is removed, the app cannot access the API resources defined in that API
   * product. **Note**: The consumer key is not removed, only its association
   * with the API product.
   *
   * @param name Name of the API product in the developer app key in the following format: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}/apiproducts/{apiproduct}`
   */
  async organizationsDevelopersAppsKeysApiproductsDelete(name: string): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Approves or revokes the consumer key for an API product. After a consumer
   * key is approved, the app can use it to access APIs. A consumer key that is
   * revoked or pending cannot be used to access an API. Any access tokens
   * associated with a revoked consumer key will remain active. However, Apigee
   * checks the status of the consumer key and if set to `revoked` will not
   * allow access to the API.
   *
   * @param name Name of the API product in the developer app key in the following format: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}/apiproducts/{apiproduct}`
   */
  async organizationsDevelopersAppsKeysApiproductsUpdateDeveloperAppKeyApiProduct(name: string, opts: OrganizationsDevelopersAppsKeysApiproductsUpdateDeveloperAppKeyApiProductOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a custom consumer key and secret for a developer app. This is
   * particularly useful if you want to migrate existing consumer keys and
   * secrets to Apigee from another system. Consumer keys and secrets can
   * contain letters, numbers, underscores, and hyphens. No other special
   * characters are allowed. To avoid service disruptions, a consumer key and
   * secret should not exceed 2 KBs each. **Note**: When creating the consumer
   * key and secret, an association to API products will not be made. Therefore,
   * you should not specify the associated API products in your request.
   * Instead, use the UpdateDeveloperAppKey API to make the association after
   * the consumer key and secret are created. If a consumer key and secret
   * already exist, you can keep them or delete them using the
   * DeleteDeveloperAppKey API.
   *
   * @param parent Parent of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps`
   */
  async organizationsDevelopersAppsKeysCreate(parent: string, req: GoogleCloudApigeeV1DeveloperAppKey): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    req = serializeGoogleCloudApigeeV1DeveloperAppKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Creates a custom consumer key and secret for a developer app. This is
   * particularly useful if you want to migrate existing consumer keys and
   * secrets to Apigee from another system. Consumer keys and secrets can
   * contain letters, numbers, underscores, and hyphens. No other special
   * characters are allowed. To avoid service disruptions, a consumer key and
   * secret should not exceed 2 KBs each. **Note**: When creating the consumer
   * key and secret, an association to API products will not be made. Therefore,
   * you should not specify the associated API products in your request.
   * Instead, use the UpdateDeveloperAppKey API to make the association after
   * the consumer key and secret are created. If a consumer key and secret
   * already exist, you can keep them or delete them using the
   * DeleteDeveloperAppKey API.
   *
   * @param parent Parent of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps`
   */
  async organizationsDevelopersAppsKeysCreateCreate(parent: string, req: GoogleCloudApigeeV1DeveloperAppKey): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    req = serializeGoogleCloudApigeeV1DeveloperAppKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keys/create`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Deletes an app's consumer key and removes all API products associated with
   * the app. After the consumer key is deleted, it cannot be used to access any
   * APIs. **Note**: After you delete a consumer key, you may want to: 1. Create
   * a new consumer key and secret for the developer app using the
   * CreateDeveloperAppKey API, and subsequently add an API product to the key
   * using the UpdateDeveloperAppKey API. 2. Delete the developer app, if it is
   * no longer required.
   *
   * @param name Name of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}`
   */
  async organizationsDevelopersAppsKeysDelete(name: string): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Gets details for a consumer key for a developer app, including the key and
   * secret value, associated API products, and other information.
   *
   * @param name Name of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}`
   */
  async organizationsDevelopersAppsKeysGet(name: string): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Updates the scope of an app. This API replaces the existing scopes with
   * those specified in the request. Include or exclude any existing scopes that
   * you want to retain or delete, respectively. The specified scopes must
   * already be defined for the API products associated with the app. This API
   * sets the `scopes` element under the `apiProducts` element in the attributes
   * of the app.
   *
   * @param name Name of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}`
   */
  async organizationsDevelopersAppsKeysReplaceDeveloperAppKey(name: string, req: GoogleCloudApigeeV1DeveloperAppKey): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    req = serializeGoogleCloudApigeeV1DeveloperAppKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Adds an API product to a developer app key, enabling the app that holds
   * the key to access the API resources bundled in the API product. In
   * addition, you can add attributes to a developer app key. This API replaces
   * the existing attributes with those specified in the request. Include or
   * exclude any existing attributes that you want to retain or delete,
   * respectively. You can use the same key to access all API products
   * associated with the app.
   *
   * @param name Name of the developer app key. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}/keys/{key}`
   */
  async organizationsDevelopersAppsKeysUpdateDeveloperAppKey(name: string, req: GoogleCloudApigeeV1DeveloperAppKey, opts: OrganizationsDevelopersAppsKeysUpdateDeveloperAppKeyOptions = {}): Promise<GoogleCloudApigeeV1DeveloperAppKey> {
    req = serializeGoogleCloudApigeeV1DeveloperAppKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperAppKey(data);
  }

  /**
   * Lists all apps created by a developer in an Apigee organization.
   * Optionally, you can request an expanded view of the developer apps. A
   * maximum of 100 developer apps are returned per API call. You can paginate
   * the list of deveoper apps returned using the `startKey` and `count` query
   * parameters.
   *
   * @param parent Required. Name of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersAppsList(parent: string, opts: OrganizationsDevelopersAppsListOptions = {}): Promise<GoogleCloudApigeeV1ListDeveloperAppsResponse> {
    opts = serializeOrganizationsDevelopersAppsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps`);
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    if (opts.shallowExpand !== undefined) {
      url.searchParams.append("shallowExpand", String(opts.shallowExpand));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeveloperAppsResponse(data);
  }

  /**
   * Updates the details for a developer app. In addition, you can add an API
   * product to a developer app and automatically generate an API key for the
   * app to use when calling APIs in the API product. If you want to use an
   * existing API key for the API product, add the API product to the API key
   * using the UpdateDeveloperAppKey API. Using this API, you cannot update the
   * following: * App name as it is the primary key used to identify the app and
   * cannot be changed. * Scopes associated with the app. Instead, use the
   * ReplaceDeveloperAppKey API. This API replaces the existing attributes with
   * those specified in the request. Include or exclude any existing attributes
   * that you want to retain or delete, respectively.
   *
   * @param name Required. Name of the developer app. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/apps/{app}`
   */
  async organizationsDevelopersAppsUpdate(name: string, req: GoogleCloudApigeeV1DeveloperApp): Promise<GoogleCloudApigeeV1DeveloperApp> {
    req = serializeGoogleCloudApigeeV1DeveloperApp(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperApp(data);
  }

  /**
   * Updates developer attributes. This API replaces the existing attributes
   * with those specified in the request. Add new attributes, and include or
   * exclude any existing attributes that you want to retain or remove,
   * respectively. The custom attribute limit is 18. **Note**: OAuth access
   * tokens and Key Management Service (KMS) entities (apps, developers, and API
   * products) are cached for 180 seconds (default). Any custom attributes
   * associated with these entities are cached for at least 180 seconds after
   * the entity is accessed at runtime. Therefore, an `ExpiresIn` element on the
   * OAuthV2 policy won't be able to expire an access token in less than 180
   * seconds.
   *
   * @param parent Required. Email address of the developer for which attributes are being updated. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersAttributes(parent: string, req: GoogleCloudApigeeV1Attributes): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Deletes a developer attribute.
   *
   * @param name Required. Name of the developer attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/attributes/{attribute}`
   */
  async organizationsDevelopersAttributesDelete(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Returns the value of the specified developer attribute.
   *
   * @param name Required. Name of the developer attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/attributes/{attribute}`
   */
  async organizationsDevelopersAttributesGet(name: string): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Returns a list of all developer attributes.
   *
   * @param parent Required. Email address of the developer for which attributes are being listed. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersAttributesList(parent: string): Promise<GoogleCloudApigeeV1Attributes> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Attributes;
  }

  /**
   * Updates a developer attribute. **Note**: OAuth access tokens and Key
   * Management Service (KMS) entities (apps, developers, and API products) are
   * cached for 180 seconds (default). Any custom attributes associated with
   * these entities are cached for at least 180 seconds after the entity is
   * accessed at runtime. Therefore, an `ExpiresIn` element on the OAuthV2
   * policy won't be able to expire an access token in less than 180 seconds.
   *
   * @param name Required. Name of the developer attribute. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/attributes/{attribute}`
   */
  async organizationsDevelopersAttributesUpdateDeveloperAttribute(name: string, req: GoogleCloudApigeeV1Attribute): Promise<GoogleCloudApigeeV1Attribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Attribute;
  }

  /**
   * Adjust the prepaid balance for the developer. This API will be used in
   * scenarios where the developer has been under-charged or over-charged.
   *
   * @param name Required. Account balance for the developer. Use the following structure in your request: `organizations/{org}/developers/{developer}/balance`
   */
  async organizationsDevelopersBalanceAdjust(name: string, req: GoogleCloudApigeeV1AdjustDeveloperBalanceRequest): Promise<GoogleCloudApigeeV1DeveloperBalance> {
    req = serializeGoogleCloudApigeeV1AdjustDeveloperBalanceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:adjust`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1DeveloperBalance;
  }

  /**
   * Credits the account balance for the developer.
   *
   * @param name Required. Account balance for the developer. Use the following structure in your request: `organizations/{org}/developers/{developer}/balance`
   */
  async organizationsDevelopersBalanceCredit(name: string, req: GoogleCloudApigeeV1CreditDeveloperBalanceRequest): Promise<GoogleCloudApigeeV1DeveloperBalance> {
    req = serializeGoogleCloudApigeeV1CreditDeveloperBalanceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:credit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1DeveloperBalance;
  }

  /**
   * Creates a developer. Once created, the developer can register an app and
   * obtain an API key. At creation time, a developer is set as `active`. To
   * change the developer status, use the SetDeveloperStatus API.
   *
   * @param parent Required. Name of the Apigee organization in which the developer is created. Use the following structure in your request: `organizations/{org}`.
   */
  async organizationsDevelopersCreate(parent: string, req: GoogleCloudApigeeV1Developer): Promise<GoogleCloudApigeeV1Developer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/developers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Developer;
  }

  /**
   * Deletes a developer. All apps and API keys associated with the developer
   * are also removed. **Warning**: This API will permanently delete the
   * developer and related artifacts. To avoid permanently deleting developers
   * and their artifacts, set the developer status to `inactive` using the
   * SetDeveloperStatus API. **Note**: The delete operation is asynchronous. The
   * developer app is deleted immediately, but its associated resources, such as
   * apps and API keys, may take anywhere from a few seconds to a few minutes to
   * be deleted.
   *
   * @param name Required. Email address of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersDelete(name: string): Promise<GoogleCloudApigeeV1Developer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Developer;
  }

  /**
   * Returns the developer details, including the developer's name, email
   * address, apps, and other information. **Note**: The response includes only
   * the first 100 developer apps.
   *
   * @param name Required. Email address of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersGet(name: string, opts: OrganizationsDevelopersGetOptions = {}): Promise<GoogleCloudApigeeV1Developer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Developer;
  }

  /**
   * Gets the account balance for the developer.
   *
   * @param name Required. Account balance for the developer. Use the following structure in your request: `organizations/{org}/developers/{developer}/balance`
   */
  async organizationsDevelopersGetBalance(name: string): Promise<GoogleCloudApigeeV1DeveloperBalance> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1DeveloperBalance;
  }

  /**
   * Gets the monetization configuration for the developer.
   *
   * @param name Required. Monetization configuration for the developer. Use the following structure in your request: `organizations/{org}/developers/{developer}/monetizationConfig`
   */
  async organizationsDevelopersGetMonetizationConfig(name: string): Promise<GoogleCloudApigeeV1DeveloperMonetizationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1DeveloperMonetizationConfig;
  }

  /**
   * Lists all developers in an organization by email address. By default, the
   * response does not include company developers. Set the `includeCompany`
   * query parameter to `true` to include company developers. **Note**: A
   * maximum of 1000 developers are returned in the response. You paginate the
   * list of developers returned using the `startKey` and `count` query
   * parameters.
   *
   * @param parent Required. Name of the Apigee organization. Use the following structure in your request: `organizations/{org}`.
   */
  async organizationsDevelopersList(parent: string, opts: OrganizationsDevelopersListOptions = {}): Promise<GoogleCloudApigeeV1ListOfDevelopersResponse> {
    opts = serializeOrganizationsDevelopersListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/developers`);
    if (opts.app !== undefined) {
      url.searchParams.append("app", String(opts.app));
    }
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.includeCompany !== undefined) {
      url.searchParams.append("includeCompany", String(opts.includeCompany));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListOfDevelopersResponse;
  }

  /**
   * Sets the status of a developer. A developer is `active` by default. If you
   * set a developer's status to `inactive`, the API keys assigned to the
   * developer apps are no longer valid even though the API keys are set to
   * `approved`. Inactive developers can still sign in to the developer portal
   * and create apps; however, any new API keys generated during app creation
   * won't work. To set the status of a developer, set the `action` query
   * parameter to `active` or `inactive`, and the `Content-Type` header to
   * `application/octet-stream`. If successful, the API call returns the
   * following HTTP status code: `204 No Content`
   *
   * @param name Required. Name of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_id}`
   */
  async organizationsDevelopersSetDeveloperStatus(name: string, opts: OrganizationsDevelopersSetDeveloperStatusOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a subscription to an API product.
   *
   * @param parent Required. Email address of the developer that is purchasing a subscription to the API product. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersSubscriptionsCreate(parent: string, req: GoogleCloudApigeeV1DeveloperSubscription): Promise<GoogleCloudApigeeV1DeveloperSubscription> {
    req = serializeGoogleCloudApigeeV1DeveloperSubscription(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/subscriptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperSubscription(data);
  }

  /**
   * Expires an API product subscription immediately.
   *
   * @param name Required. Name of the API product subscription. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/subscriptions/{subscription}`
   */
  async organizationsDevelopersSubscriptionsExpire(name: string, req: GoogleCloudApigeeV1ExpireDeveloperSubscriptionRequest): Promise<GoogleCloudApigeeV1DeveloperSubscription> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:expire`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DeveloperSubscription(data);
  }

  /**
   * Gets details for an API product subscription.
   *
   * @param name Required. Name of the API product subscription. Use the following structure in your request: `organizations/{org}/developers/{developer_email}/subscriptions/{subscription}`
   */
  async organizationsDevelopersSubscriptionsGet(name: string): Promise<GoogleCloudApigeeV1DeveloperSubscription> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1DeveloperSubscription(data);
  }

  /**
   * Lists all API product subscriptions for a developer.
   *
   * @param parent Required. Email address of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersSubscriptionsList(parent: string, opts: OrganizationsDevelopersSubscriptionsListOptions = {}): Promise<GoogleCloudApigeeV1ListDeveloperSubscriptionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/subscriptions`);
    if (opts.count !== undefined) {
      url.searchParams.append("count", String(opts.count));
    }
    if (opts.startKey !== undefined) {
      url.searchParams.append("startKey", String(opts.startKey));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeveloperSubscriptionsResponse(data);
  }

  /**
   * Updates a developer. This API replaces the existing developer details with
   * those specified in the request. Include or exclude any existing details
   * that you want to retain or delete, respectively. The custom attribute limit
   * is 18. **Note**: OAuth access tokens and Key Management Service (KMS)
   * entities (apps, developers, and API products) are cached for 180 seconds
   * (current default). Any custom attributes associated with these entities are
   * cached for at least 180 seconds after the entity is accessed at runtime.
   * Therefore, an `ExpiresIn` element on the OAuthV2 policy won't be able to
   * expire an access token in less than 180 seconds.
   *
   * @param name Required. Email address of the developer. Use the following structure in your request: `organizations/{org}/developers/{developer_email}`
   */
  async organizationsDevelopersUpdate(name: string, req: GoogleCloudApigeeV1Developer): Promise<GoogleCloudApigeeV1Developer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1Developer;
  }

  /**
   * Updates the monetization configuration for the developer.
   *
   * @param name Required. Monetization configuration for the developer. Use the following structure in your request: `organizations/{org}/developers/{developer}/monetizationConfig`
   */
  async organizationsDevelopersUpdateMonetizationConfig(name: string, req: GoogleCloudApigeeV1DeveloperMonetizationConfig): Promise<GoogleCloudApigeeV1DeveloperMonetizationConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1DeveloperMonetizationConfig;
  }

  /**
   * Creates an endpoint attachment. **Note:** Not supported for Apigee hybrid.
   *
   * @param parent Required. Organization the endpoint attachment will be created in.
   */
  async organizationsEndpointAttachmentsCreate(parent: string, req: GoogleCloudApigeeV1EndpointAttachment, opts: OrganizationsEndpointAttachmentsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpointAttachments`);
    if (opts.endpointAttachmentId !== undefined) {
      url.searchParams.append("endpointAttachmentId", String(opts.endpointAttachmentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an endpoint attachment.
   *
   * @param name Required. Name of the endpoint attachment. Use the following structure in your request: `organizations/{org}/endpointAttachments/{endpoint_attachment}`
   */
  async organizationsEndpointAttachmentsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the endpoint attachment.
   *
   * @param name Required. Name of the endpoint attachment. Use the following structure in your request: `organizations/{org}/endpointAttachments/{endpoint_attachment}`
   */
  async organizationsEndpointAttachmentsGet(name: string): Promise<GoogleCloudApigeeV1EndpointAttachment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1EndpointAttachment;
  }

  /**
   * Lists the endpoint attachments in an organization.
   *
   * @param parent Required. Name of the organization for which to list endpoint attachments. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsEndpointAttachmentsList(parent: string, opts: OrganizationsEndpointAttachmentsListOptions = {}): Promise<GoogleCloudApigeeV1ListEndpointAttachmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/endpointAttachments`);
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
    return data as GoogleCloudApigeeV1ListEndpointAttachmentsResponse;
  }

  /**
   * Creates a new attachment of an environment to an environment group.
   *
   * @param parent Required. EnvironmentGroup under which to create the attachment in the following format: `organizations/{org}/envgroups/{envgroup}`.
   */
  async organizationsEnvgroupsAttachmentsCreate(parent: string, req: GoogleCloudApigeeV1EnvironmentGroupAttachment): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attachments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an environment group attachment.
   *
   * @param name Required. Name of the environment group attachment to delete in the following format: `organizations/{org}/envgroups/{envgroup}/attachments/{attachment}`.
   */
  async organizationsEnvgroupsAttachmentsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an environment group attachment.
   *
   * @param name Required. Name of the environment group attachment in the following format: `organizations/{org}/envgroups/{envgroup}/attachments/{attachment}`
   */
  async organizationsEnvgroupsAttachmentsGet(name: string): Promise<GoogleCloudApigeeV1EnvironmentGroupAttachment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1EnvironmentGroupAttachment;
  }

  /**
   * Lists all attachments of an environment group.
   *
   * @param parent Required. Name of the environment group in the following format: `organizations/{org}/envgroups/{envgroup}`.
   */
  async organizationsEnvgroupsAttachmentsList(parent: string, opts: OrganizationsEnvgroupsAttachmentsListOptions = {}): Promise<GoogleCloudApigeeV1ListEnvironmentGroupAttachmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attachments`);
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
    return data as GoogleCloudApigeeV1ListEnvironmentGroupAttachmentsResponse;
  }

  /**
   * Creates a new environment group.
   *
   * @param parent Required. Name of the organization in which to create the environment group in the following format: `organizations/{org}`.
   */
  async organizationsEnvgroupsCreate(parent: string, req: GoogleCloudApigeeV1EnvironmentGroup, opts: OrganizationsEnvgroupsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/envgroups`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an environment group.
   *
   * @param name Required. Name of the environment group in the following format: `organizations/{org}/envgroups/{envgroup}`.
   */
  async organizationsEnvgroupsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an environment group.
   *
   * @param name Required. Name of the environment group in the following format: `organizations/{org}/envgroups/{envgroup}`.
   */
  async organizationsEnvgroupsGet(name: string): Promise<GoogleCloudApigeeV1EnvironmentGroup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1EnvironmentGroup;
  }

  /**
   * Gets the deployed ingress configuration for an environment group.
   *
   * @param name Required. Name of the deployed configuration for the environment group in the following format: 'organizations/{org}/envgroups/{envgroup}/deployedIngressConfig'.
   */
  async organizationsEnvgroupsGetDeployedIngressConfig(name: string, opts: OrganizationsEnvgroupsGetDeployedIngressConfigOptions = {}): Promise<GoogleCloudApigeeV1EnvironmentGroupConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1EnvironmentGroupConfig(data);
  }

  /**
   * Lists all environment groups.
   *
   * @param parent Required. Name of the organization for which to list environment groups in the following format: `organizations/{org}`.
   */
  async organizationsEnvgroupsList(parent: string, opts: OrganizationsEnvgroupsListOptions = {}): Promise<GoogleCloudApigeeV1ListEnvironmentGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/envgroups`);
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
    return data as GoogleCloudApigeeV1ListEnvironmentGroupsResponse;
  }

  /**
   * Updates an environment group.
   *
   * @param name Required. Name of the environment group to update in the format: `organizations/{org}/envgroups/{envgroup}.
   */
  async organizationsEnvgroupsPatch(name: string, req: GoogleCloudApigeeV1EnvironmentGroup, opts: OrganizationsEnvgroupsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeOrganizationsEnvgroupsPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of metrics and dimensions that can be used to create analytics
   * queries and reports. Each schema element contains the name of the field,
   * its associated type, and a flag indicating whether it is a standard or
   * custom field.
   *
   * @param name Required. Path to the schema. Use the following structure in your request: `organizations/{org}/environments/{env}/analytics/admin/schemav2`.
   */
  async organizationsEnvironmentsAnalyticsAdminGetSchemav2(name: string, opts: OrganizationsEnvironmentsAnalyticsAdminGetSchemav2Options = {}): Promise<GoogleCloudApigeeV1Schema> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.disableCache !== undefined) {
      url.searchParams.append("disableCache", String(opts.disableCache));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Schema;
  }

  /**
   * Submit a data export job to be processed in the background. If the request
   * is successful, the API returns a 201 status, a URI that can be used to
   * retrieve the status of the export job, and the `state` value of "enqueued".
   *
   * @param parent Required. Names of the parent organization and environment. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsAnalyticsExportsCreate(parent: string, req: GoogleCloudApigeeV1ExportRequest): Promise<GoogleCloudApigeeV1Export> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analytics/exports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Export;
  }

  /**
   * Gets the details and status of an analytics export job. If the export job
   * is still in progress, its `state` is set to "running". After the export job
   * has completed successfully, its `state` is set to "completed". If the
   * export job fails, its `state` is set to `failed`.
   *
   * @param name Required. Resource name of the export to get.
   */
  async organizationsEnvironmentsAnalyticsExportsGet(name: string): Promise<GoogleCloudApigeeV1Export> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Export;
  }

  /**
   * Lists the details and status of all analytics export jobs belonging to the
   * parent organization and environment.
   *
   * @param parent Required. Names of the parent organization and environment. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsAnalyticsExportsList(parent: string): Promise<GoogleCloudApigeeV1ListExportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analytics/exports`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListExportsResponse;
  }

  /**
   * Lists all deployments of an API proxy in an environment.
   *
   * @param parent Required. Name representing an API proxy in an environment in the following format: `organizations/{org}/environments/{env}/apis/{api}`
   */
  async organizationsEnvironmentsApisDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Creates a debug session for a deployed API Proxy revision.
   *
   * @param parent Required. The resource name of the API Proxy revision deployment for which to create the DebugSession. Must be of the form `organizations/{organization}/environments/{environment}/apis/{api}/revisions/{revision}`.
   */
  async organizationsEnvironmentsApisRevisionsDebugsessionsCreate(parent: string, req: GoogleCloudApigeeV1DebugSession, opts: OrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions = {}): Promise<GoogleCloudApigeeV1DebugSession> {
    req = serializeGoogleCloudApigeeV1DebugSession(req);
    opts = serializeOrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/debugsessions`);
    if (opts.timeout !== undefined) {
      url.searchParams.append("timeout", String(opts.timeout));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1DebugSession(data);
  }

  /**
   * Gets the debug data from a transaction.
   *
   * @param name Required. The name of the debug session transaction. Must be of the form: `organizations/{organization}/environments/{environment}/apis/{api}/revisions/{revision}/debugsessions/{session}/data/{transaction}`.
   */
  async organizationsEnvironmentsApisRevisionsDebugsessionsDataGet(name: string): Promise<GoogleCloudApigeeV1DebugSessionTransaction> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1DebugSessionTransaction;
  }

  /**
   * Deletes the data from a debug session. This does not cancel the debug
   * session or prevent further data from being collected if the session is
   * still active in runtime pods.
   *
   * @param name Required. The name of the debug session to delete. Must be of the form: `organizations/{organization}/environments/{environment}/apis/{api}/revisions/{revision}/debugsessions/{debugsession}`.
   */
  async organizationsEnvironmentsApisRevisionsDebugsessionsDeleteData(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/data`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves a debug session.
   *
   * @param name Required. The name of the debug session to retrieve. Must be of the form: `organizations/{organization}/environments/{environment}/apis/{api}/revisions/{revision}/debugsessions/{session}`.
   */
  async organizationsEnvironmentsApisRevisionsDebugsessionsGet(name: string): Promise<GoogleCloudApigeeV1DebugSession> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1DebugSession(data);
  }

  /**
   * Lists debug sessions that are currently active in the given API Proxy
   * revision.
   *
   * @param parent Required. The name of the API Proxy revision deployment for which to list debug sessions. Must be of the form: `organizations/{organization}/environments/{environment}/apis/{api}/revisions/{revision}`.
   */
  async organizationsEnvironmentsApisRevisionsDebugsessionsList(parent: string, opts: OrganizationsEnvironmentsApisRevisionsDebugsessionsListOptions = {}): Promise<GoogleCloudApigeeV1ListDebugSessionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/debugsessions`);
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
    return deserializeGoogleCloudApigeeV1ListDebugSessionsResponse(data);
  }

  /**
   * Deploys a revision of an API proxy. If another revision of the same API
   * proxy revision is currently deployed, set the `override` parameter to
   * `true` to have this revision replace the currently deployed revision. You
   * cannot invoke an API proxy until it has been deployed to an environment.
   * After you deploy an API proxy revision, you cannot edit it. To edit the API
   * proxy, you must create and deploy a new revision. For a request path
   * `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}/deployments`,
   * two permissions are required: * `apigee.deployments.create` on the resource
   * `organizations/{org}/environments/{env}` * `apigee.proxyrevisions.deploy`
   * on the resource `organizations/{org}/apis/{api}/revisions/{rev}`
   *
   * @param name Required. Name of the API proxy revision deployment in the following format: `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}`
   */
  async organizationsEnvironmentsApisRevisionsDeploy(name: string, opts: OrganizationsEnvironmentsApisRevisionsDeployOptions = {}): Promise<GoogleCloudApigeeV1Deployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    if (opts.override !== undefined) {
      url.searchParams.append("override", String(opts.override));
    }
    if (opts.sequencedRollout !== undefined) {
      url.searchParams.append("sequencedRollout", String(opts.sequencedRollout));
    }
    if (opts.serviceAccount !== undefined) {
      url.searchParams.append("serviceAccount", String(opts.serviceAccount));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeGoogleCloudApigeeV1Deployment(data);
  }

  /**
   * Generates a report for a dry run analysis of a DeployApiProxy request
   * without committing the deployment. In addition to the standard validations
   * performed when adding deployments, additional analysis will be done to
   * detect possible traffic routing changes that would result from this
   * deployment being created. Any potential routing conflicts or unsafe changes
   * will be reported in the response. This routing analysis is not performed
   * for a non-dry-run DeployApiProxy request. For a request path
   * `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}/deployments:generateDeployChangeReport`,
   * two permissions are required: * `apigee.deployments.create` on the resource
   * `organizations/{org}/environments/{env}` * `apigee.proxyrevisions.deploy`
   * on the resource `organizations/{org}/apis/{api}/revisions/{rev}`
   *
   * @param name Name of the API proxy revision deployment in the following format: `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}`
   */
  async organizationsEnvironmentsApisRevisionsDeploymentsGenerateDeployChangeReport(name: string, opts: OrganizationsEnvironmentsApisRevisionsDeploymentsGenerateDeployChangeReportOptions = {}): Promise<GoogleCloudApigeeV1DeploymentChangeReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments:generateDeployChangeReport`);
    if (opts.override !== undefined) {
      url.searchParams.append("override", String(opts.override));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleCloudApigeeV1DeploymentChangeReport;
  }

  /**
   * Generates a report for a dry run analysis of an UndeployApiProxy request
   * without committing the undeploy. In addition to the standard validations
   * performed when removing deployments, additional analysis will be done to
   * detect possible traffic routing changes that would result from this
   * deployment being removed. Any potential routing conflicts or unsafe changes
   * will be reported in the response. This routing analysis is not performed
   * for a non-dry-run UndeployApiProxy request. For a request path
   * `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}/deployments:generateUndeployChangeReport`,
   * two permissions are required: * `apigee.deployments.delete` on the resource
   * `organizations/{org}/environments/{env}` * `apigee.proxyrevisions.undeploy`
   * on the resource `organizations/{org}/apis/{api}/revisions/{rev}`
   *
   * @param name Name of the API proxy revision deployment in the following format: `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}`
   */
  async organizationsEnvironmentsApisRevisionsDeploymentsGenerateUndeployChangeReport(name: string): Promise<GoogleCloudApigeeV1DeploymentChangeReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments:generateUndeployChangeReport`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleCloudApigeeV1DeploymentChangeReport;
  }

  /**
   * Gets the deployment of an API proxy revision and actual state reported by
   * runtime pods.
   *
   * @param name Required. Name representing an API proxy revision in an environment in the following format: `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}`
   */
  async organizationsEnvironmentsApisRevisionsGetDeployments(name: string): Promise<GoogleCloudApigeeV1Deployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1Deployment(data);
  }

  /**
   * Undeploys an API proxy revision from an environment. For a request path
   * `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}/deployments`,
   * two permissions are required: * `apigee.deployments.delete` on the resource
   * `organizations/{org}/environments/{env}` * `apigee.proxyrevisions.undeploy`
   * on the resource `organizations/{org}/apis/{api}/revisions/{rev}`
   *
   * @param name Required. Name of the API proxy revision deployment in the following format: `organizations/{org}/environments/{env}/apis/{api}/revisions/{rev}`
   */
  async organizationsEnvironmentsApisRevisionsUndeploy(name: string, opts: OrganizationsEnvironmentsApisRevisionsUndeployOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    if (opts.sequencedRollout !== undefined) {
      url.searchParams.append("sequencedRollout", String(opts.sequencedRollout));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a new ArchiveDeployment.
   *
   * @param parent Required. The Environment this Archive Deployment will be created in.
   */
  async organizationsEnvironmentsArchiveDeploymentsCreate(parent: string, req: GoogleCloudApigeeV1ArchiveDeployment): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/archiveDeployments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an archive deployment.
   *
   * @param name Required. Name of the Archive Deployment in the following format: `organizations/{org}/environments/{env}/archiveDeployments/{id}`.
   */
  async organizationsEnvironmentsArchiveDeploymentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Generates a signed URL for downloading the original zip file used to
   * create an Archive Deployment. The URL is only valid for a limited period
   * and should be used within minutes after generation. Each call returns a new
   * upload URL.
   *
   * @param name Required. The name of the Archive Deployment you want to download.
   */
  async organizationsEnvironmentsArchiveDeploymentsGenerateDownloadUrl(name: string, req: GoogleCloudApigeeV1GenerateDownloadUrlRequest): Promise<GoogleCloudApigeeV1GenerateDownloadUrlResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:generateDownloadUrl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1GenerateDownloadUrlResponse;
  }

  /**
   * Generates a signed URL for uploading an Archive zip file to Google Cloud
   * Storage. Once the upload is complete, the signed URL should be passed to
   * CreateArchiveDeployment. When uploading to the generated signed URL, please
   * follow these restrictions: * Source file type should be a zip file. *
   * Source file size should not exceed 1GB limit. * No credentials should be
   * attached - the signed URLs provide access to the target bucket using
   * internal service identity; if credentials were attached, the identity from
   * the credentials would be used, but that identity does not have permissions
   * to upload files to the URL. When making a HTTP PUT request, these two
   * headers need to be specified: * `content-type: application/zip` *
   * `x-goog-content-length-range: 0,1073741824` And this header SHOULD NOT be
   * specified: * `Authorization: Bearer YOUR_TOKEN`
   *
   * @param parent Required. The organization and environment to upload to.
   */
  async organizationsEnvironmentsArchiveDeploymentsGenerateUploadUrl(parent: string, req: GoogleCloudApigeeV1GenerateUploadUrlRequest): Promise<GoogleCloudApigeeV1GenerateUploadUrlResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/archiveDeployments:generateUploadUrl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1GenerateUploadUrlResponse;
  }

  /**
   * Gets the specified ArchiveDeployment.
   *
   * @param name Required. Name of the Archive Deployment in the following format: `organizations/{org}/environments/{env}/archiveDeployments/{id}`.
   */
  async organizationsEnvironmentsArchiveDeploymentsGet(name: string): Promise<GoogleCloudApigeeV1ArchiveDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ArchiveDeployment;
  }

  /**
   * Lists the ArchiveDeployments in the specified Environment.
   *
   * @param parent Required. Name of the Environment for which to list Archive Deployments in the format: `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsArchiveDeploymentsList(parent: string, opts: OrganizationsEnvironmentsArchiveDeploymentsListOptions = {}): Promise<GoogleCloudApigeeV1ListArchiveDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/archiveDeployments`);
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
    return data as GoogleCloudApigeeV1ListArchiveDeploymentsResponse;
  }

  /**
   * Updates an existing ArchiveDeployment. Labels can modified but most of the
   * other fields are not modifiable.
   *
   * @param name Name of the Archive Deployment in the following format: `organizations/{org}/environments/{env}/archiveDeployments/{id}`.
   */
  async organizationsEnvironmentsArchiveDeploymentsPatch(name: string, req: GoogleCloudApigeeV1ArchiveDeployment, opts: OrganizationsEnvironmentsArchiveDeploymentsPatchOptions = {}): Promise<GoogleCloudApigeeV1ArchiveDeployment> {
    opts = serializeOrganizationsEnvironmentsArchiveDeploymentsPatchOptions(opts);
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
    return data as GoogleCloudApigeeV1ArchiveDeployment;
  }

  /**
   * Deletes a cache.
   *
   * @param name Required. Cache resource name of the form: `organizations/{organization_id}/environments/{environment_id}/caches/{cache_id}`
   */
  async organizationsEnvironmentsCachesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates an environment in an organization.
   *
   * @param parent Required. Name of the organization in which the environment will be created. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsEnvironmentsCreate(parent: string, req: GoogleCloudApigeeV1Environment, opts: OrganizationsEnvironmentsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudApigeeV1Environment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an environment from an organization. **Warning: You must delete
   * all key value maps and key value entries before you delete an
   * environment.** Otherwise, if you re-create the environment the key value
   * map entry operations will encounter encryption/decryption discrepancies.
   *
   * @param name Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists all deployments of API proxies or shared flows in an environment.
   *
   * @param parent Required. Name of the environment for which to return deployment information in the following format: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsDeploymentsList(parent: string, opts: OrganizationsEnvironmentsDeploymentsListOptions = {}): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    if (opts.sharedFlows !== undefined) {
      url.searchParams.append("sharedFlows", String(opts.sharedFlows));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Attaches a shared flow to a flow hook.
   *
   * @param name Required. Name of the flow hook to which the shared flow should be attached in the following format: `organizations/{org}/environments/{env}/flowhooks/{flowhook}`
   */
  async organizationsEnvironmentsFlowhooksAttachSharedFlowToFlowHook(name: string, req: GoogleCloudApigeeV1FlowHook): Promise<GoogleCloudApigeeV1FlowHook> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1FlowHook;
  }

  /**
   * Detaches a shared flow from a flow hook.
   *
   * @param name Required. Name of the flow hook to detach in the following format: `organizations/{org}/environments/{env}/flowhooks/{flowhook}`
   */
  async organizationsEnvironmentsFlowhooksDetachSharedFlowFromFlowHook(name: string): Promise<GoogleCloudApigeeV1FlowHook> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1FlowHook;
  }

  /**
   * Returns the name of the shared flow attached to the specified flow hook.
   * If there's no shared flow attached to the flow hook, the API does not
   * return an error; it simply does not return a name in the response.
   *
   * @param name Required. Name of the flow hook in the following format: `organizations/{org}/environments/{env}/flowhooks/{flowhook}`
   */
  async organizationsEnvironmentsFlowhooksGet(name: string): Promise<GoogleCloudApigeeV1FlowHook> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1FlowHook;
  }

  /**
   * Gets environment details.
   *
   * @param name Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsGet(name: string): Promise<GoogleCloudApigeeV1Environment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1Environment(data);
  }

  /**
   * Gets the API Security runtime configuration for an environment. This named
   * ApiSecurityRuntimeConfig to prevent conflicts with ApiSecurityConfig from
   * addon config.
   *
   * @param name Required. Name of the environment API Security Runtime configuration resource. Use the following structure in your request: `organizations/{org}/environments/{env}/apiSecurityRuntimeConfig`
   */
  async organizationsEnvironmentsGetApiSecurityRuntimeConfig(name: string): Promise<GoogleCloudApigeeV1ApiSecurityRuntimeConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ApiSecurityRuntimeConfig(data);
  }

  /**
   * Gets the debug mask singleton resource for an environment.
   *
   * @param name Required. Name of the debug mask. Use the following structure in your request: `organizations/{org}/environments/{env}/debugmask`.
   */
  async organizationsEnvironmentsGetDebugmask(name: string): Promise<GoogleCloudApigeeV1DebugMask> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1DebugMask;
  }

  /**
   * Gets the deployed configuration for an environment.
   *
   * @param name Required. Name of the environment deployed configuration resource. Use the following structure in your request: `organizations/{org}/environments/{env}/deployedConfig`
   */
  async organizationsEnvironmentsGetDeployedConfig(name: string): Promise<GoogleCloudApigeeV1EnvironmentConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1EnvironmentConfig(data);
  }

  /**
   * Gets the IAM policy on an environment. For more information, see [Manage
   * users, roles, and permissions using the
   * API](https://cloud.google.com/apigee/docs/api-platform/system-administration/manage-users-roles).
   * You must have the `apigee.environments.getIamPolicy` permission to call
   * this API.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsEnvironmentsGetIamPolicy(resource: string, opts: OrganizationsEnvironmentsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Get distributed trace configuration in an environment.
   *
   * @param name Required. Name of the trace configuration. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig".
   */
  async organizationsEnvironmentsGetTraceConfig(name: string): Promise<GoogleCloudApigeeV1TraceConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1TraceConfig;
  }

  /**
   * Creates an alias from a key/certificate pair. The structure of the request
   * is controlled by the `format` query parameter: - `keycertfile` - Separate
   * PEM-encoded key and certificate files are uploaded. Set `Content-Type:
   * multipart/form-data` and include the `keyFile`, `certFile`, and `password`
   * (if keys are encrypted) fields in the request body. If uploading to a
   * truststore, omit `keyFile`. - `pkcs12` - A PKCS12 file is uploaded. Set
   * `Content-Type: multipart/form-data`, provide the file in the `file` field,
   * and include the `password` field if the file is encrypted in the request
   * body. - `selfsignedcert` - A new private key and certificate are generated.
   * Set `Content-Type: application/json` and include CertificateGenerationSpec
   * in the request body.
   *
   * @param parent Required. Name of the keystore. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}`.
   */
  async organizationsEnvironmentsKeystoresAliasesCreate(parent: string, req: GoogleApiHttpBody, opts: OrganizationsEnvironmentsKeystoresAliasesCreateOptions = {}): Promise<GoogleCloudApigeeV1Alias> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/aliases`);
    if (opts._password !== undefined) {
      url.searchParams.append("_password", String(opts._password));
    }
    if (opts.alias !== undefined) {
      url.searchParams.append("alias", String(opts.alias));
    }
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    if (opts.ignoreExpiryValidation !== undefined) {
      url.searchParams.append("ignoreExpiryValidation", String(opts.ignoreExpiryValidation));
    }
    if (opts.ignoreNewlineValidation !== undefined) {
      url.searchParams.append("ignoreNewlineValidation", String(opts.ignoreNewlineValidation));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1Alias(data);
  }

  /**
   * Generates a PKCS #10 Certificate Signing Request for the private key in an
   * alias.
   *
   * @param name Required. Name of the alias. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`.
   */
  async organizationsEnvironmentsKeystoresAliasesCsr(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/csr`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Deletes an alias.
   *
   * @param name Required. Name of the alias. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`.
   */
  async organizationsEnvironmentsKeystoresAliasesDelete(name: string): Promise<GoogleCloudApigeeV1Alias> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1Alias(data);
  }

  /**
   * Gets an alias.
   *
   * @param name Required. Name of the alias. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`.
   */
  async organizationsEnvironmentsKeystoresAliasesGet(name: string): Promise<GoogleCloudApigeeV1Alias> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1Alias(data);
  }

  /**
   * Gets the certificate from an alias in PEM-encoded form.
   *
   * @param name Required. Name of the alias. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`.
   */
  async organizationsEnvironmentsKeystoresAliasesGetCertificate(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/certificate`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Updates the certificate in an alias.
   *
   * @param name Required. Name of the alias. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`
   */
  async organizationsEnvironmentsKeystoresAliasesUpdate(name: string, req: GoogleApiHttpBody, opts: OrganizationsEnvironmentsKeystoresAliasesUpdateOptions = {}): Promise<GoogleCloudApigeeV1Alias> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.ignoreExpiryValidation !== undefined) {
      url.searchParams.append("ignoreExpiryValidation", String(opts.ignoreExpiryValidation));
    }
    if (opts.ignoreNewlineValidation !== undefined) {
      url.searchParams.append("ignoreNewlineValidation", String(opts.ignoreNewlineValidation));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1Alias(data);
  }

  /**
   * Creates a keystore or truststore. - Keystore: Contains certificates and
   * their associated keys. - Truststore: Contains trusted certificates used to
   * validate a server's certificate. These certificates are typically
   * self-signed certificates or certificates that are not signed by a trusted
   * CA.
   *
   * @param parent Required. Name of the environment in which to create the keystore. Use the following format in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsKeystoresCreate(parent: string, req: GoogleCloudApigeeV1Keystore, opts: OrganizationsEnvironmentsKeystoresCreateOptions = {}): Promise<GoogleCloudApigeeV1Keystore> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keystores`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Keystore;
  }

  /**
   * Deletes a keystore or truststore.
   *
   * @param name Required. Name of the keystore. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}`
   */
  async organizationsEnvironmentsKeystoresDelete(name: string): Promise<GoogleCloudApigeeV1Keystore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Keystore;
  }

  /**
   * Gets a keystore or truststore.
   *
   * @param name Required. Name of the keystore. Use the following format in your request: `organizations/{org}/environments/{env}/keystores/{keystore}`.
   */
  async organizationsEnvironmentsKeystoresGet(name: string): Promise<GoogleCloudApigeeV1Keystore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Keystore;
  }

  /**
   * Creates a key value map in an environment.
   *
   * @param parent Required. Name of the environment in which to create the key value map. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsKeyvaluemapsCreate(parent: string, req: GoogleCloudApigeeV1KeyValueMap): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keyvaluemaps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Deletes a key value map from an environment.
   *
   * @param name Required. Name of the key value map. Use the following structure in your request: `organizations/{org}/environments/{env}/keyvaluemaps/{keyvaluemap}`
   */
  async organizationsEnvironmentsKeyvaluemapsDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Creates key value entries in a key value map scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to create the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsEnvironmentsKeyvaluemapsEntriesCreate(parent: string, req: GoogleCloudApigeeV1KeyValueEntry): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Deletes a key value entry from a key value map scoped to an organization,
   * environment, or API proxy. **Notes:** * After you delete the key value
   * entry, the policy consuming the entry will continue to function with its
   * cached values for a few minutes. This is expected behavior. * Supported for
   * Apigee hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to delete the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsEnvironmentsKeyvaluemapsEntriesDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Get the key value entry value for a key value map scoped to an
   * organization, environment, or API proxy. **Note**: Supported for Apigee
   * hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to fetch the key value map entry/value. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsEnvironmentsKeyvaluemapsEntriesGet(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Lists key value entries for key values maps scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to list key value maps. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsEnvironmentsKeyvaluemapsEntriesList(parent: string, opts: OrganizationsEnvironmentsKeyvaluemapsEntriesListOptions = {}): Promise<GoogleCloudApigeeV1ListKeyValueEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
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
    return data as GoogleCloudApigeeV1ListKeyValueEntriesResponse;
  }

  /**
   * Updates properties for an Apigee environment with patch semantics using a
   * field mask. **Note:** Not supported for Apigee hybrid.
   *
   * @param name Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{environment}`.
   */
  async organizationsEnvironmentsModifyEnvironment(name: string, req: GoogleCloudApigeeV1Environment, opts: OrganizationsEnvironmentsModifyEnvironmentOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudApigeeV1Environment(req);
    opts = serializeOrganizationsEnvironmentsModifyEnvironmentOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Similar to GetStats except that the response is less verbose.
   *
   * @param name Required. Resource name for which the interactive query will be executed. Use the following format in your request: `organizations/{org}/environments/{env}/optimizedStats/{dimensions}` Dimensions let you view metrics in meaningful groupings, such as `apiproxy`, `target_host`. The value of `dimensions` should be a comma-separated list as shown below: `organizations/{org}/environments/{env}/optimizedStats/apiproxy,request_verb`
   */
  async organizationsEnvironmentsOptimizedStatsGet(name: string, opts: OrganizationsEnvironmentsOptimizedStatsGetOptions = {}): Promise<GoogleCloudApigeeV1OptimizedStats> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.accuracy !== undefined) {
      url.searchParams.append("accuracy", String(opts.accuracy));
    }
    if (opts.aggTable !== undefined) {
      url.searchParams.append("aggTable", String(opts.aggTable));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
    }
    if (opts.realtime !== undefined) {
      url.searchParams.append("realtime", String(opts.realtime));
    }
    if (opts.select !== undefined) {
      url.searchParams.append("select", String(opts.select));
    }
    if (opts.sonar !== undefined) {
      url.searchParams.append("sonar", String(opts.sonar));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.sortby !== undefined) {
      url.searchParams.append("sortby", String(opts.sortby));
    }
    if (opts.timeRange !== undefined) {
      url.searchParams.append("timeRange", String(opts.timeRange));
    }
    if (opts.timeUnit !== undefined) {
      url.searchParams.append("timeUnit", String(opts.timeUnit));
    }
    if (opts.topk !== undefined) {
      url.searchParams.append("topk", String(opts.topk));
    }
    if (opts.tsAscending !== undefined) {
      url.searchParams.append("tsAscending", String(opts.tsAscending));
    }
    if (opts.tzo !== undefined) {
      url.searchParams.append("tzo", String(opts.tzo));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1OptimizedStats(data);
  }

  /**
   * Submit a query to be processed in the background. If the submission of the
   * query succeeds, the API returns a 201 status and an ID that refer to the
   * query. In addition to the HTTP status 201, the `state` of "enqueued" means
   * that the request succeeded.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsQueriesCreate(parent: string, req: GoogleCloudApigeeV1Query): Promise<GoogleCloudApigeeV1AsyncQuery> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/queries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1AsyncQuery(data);
  }

  /**
   * Get query status If the query is still in progress, the `state` is set to
   * "running" After the query has completed successfully, `state` is set to
   * "completed"
   *
   * @param name Required. Name of the asynchronous query to get. Must be of the form `organizations/{org}/environments/{env}/queries/{queryId}`.
   */
  async organizationsEnvironmentsQueriesGet(name: string): Promise<GoogleCloudApigeeV1AsyncQuery> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1AsyncQuery(data);
  }

  /**
   * After the query is completed, use this API to retrieve the results. If the
   * request succeeds, and there is a non-zero result set, the result is
   * downloaded to the client as a zipped JSON file. The name of the downloaded
   * file will be: OfflineQueryResult-.zip Example:
   * `OfflineQueryResult-9cfc0d85-0f30-46d6-ae6f-318d0cb961bd.zip`
   *
   * @param name Required. Name of the asynchronous query result to get. Must be of the form `organizations/{org}/environments/{env}/queries/{queryId}/result`.
   */
  async organizationsEnvironmentsQueriesGetResult(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * After the query is completed, use this API to retrieve the results. If the
   * request succeeds, and there is a non-zero result set, the result is sent to
   * the client as a list of urls to JSON files.
   *
   * @param name Required. Name of the asynchronous query result to get. Must be of the form `organizations/{org}/environments/{env}/queries/{queryId}/resulturl`.
   */
  async organizationsEnvironmentsQueriesGetResulturl(name: string): Promise<GoogleCloudApigeeV1GetAsyncQueryResultUrlResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponse(data);
  }

  /**
   * Return a list of Asynchronous Queries
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsQueriesList(parent: string, opts: OrganizationsEnvironmentsQueriesListOptions = {}): Promise<GoogleCloudApigeeV1ListAsyncQueriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/queries`);
    if (opts.dataset !== undefined) {
      url.searchParams.append("dataset", String(opts.dataset));
    }
    if (opts.from !== undefined) {
      url.searchParams.append("from", String(opts.from));
    }
    if (opts.inclQueriesWithoutReport !== undefined) {
      url.searchParams.append("inclQueriesWithoutReport", String(opts.inclQueriesWithoutReport));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.submittedBy !== undefined) {
      url.searchParams.append("submittedBy", String(opts.submittedBy));
    }
    if (opts.to !== undefined) {
      url.searchParams.append("to", String(opts.to));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListAsyncQueriesResponse(data);
  }

  /**
   * Creates a Reference in the specified environment.
   *
   * @param parent Required. The parent environment name under which the Reference will be created. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsReferencesCreate(parent: string, req: GoogleCloudApigeeV1Reference): Promise<GoogleCloudApigeeV1Reference> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/references`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1Reference;
  }

  /**
   * Deletes a Reference from an environment. Returns the deleted Reference
   * resource.
   *
   * @param name Required. The name of the Reference to delete. Must be of the form `organizations/{org}/environments/{env}/references/{ref}`.
   */
  async organizationsEnvironmentsReferencesDelete(name: string): Promise<GoogleCloudApigeeV1Reference> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1Reference;
  }

  /**
   * Gets a Reference resource.
   *
   * @param name Required. The name of the Reference to get. Must be of the form `organizations/{org}/environments/{env}/references/{ref}`.
   */
  async organizationsEnvironmentsReferencesGet(name: string): Promise<GoogleCloudApigeeV1Reference> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Reference;
  }

  /**
   * Updates an existing Reference. Note that this operation has PUT semantics;
   * it will replace the entirety of the existing Reference with the resource in
   * the request body.
   *
   * @param name Required. The name of the Reference to update. Must be of the form `organizations/{org}/environments/{env}/references/{ref}`.
   */
  async organizationsEnvironmentsReferencesUpdate(name: string, req: GoogleCloudApigeeV1Reference): Promise<GoogleCloudApigeeV1Reference> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1Reference;
  }

  /**
   * Creates a resource file. Specify the `Content-Type` as
   * `application/octet-stream` or `multipart/form-data`. For more information
   * about resource files, see [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param parent Required. Name of the environment in which to create the resource file in the following format: `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsResourcefilesCreate(parent: string, req: GoogleApiHttpBody, opts: OrganizationsEnvironmentsResourcefilesCreateOptions = {}): Promise<GoogleCloudApigeeV1ResourceFile> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1ResourceFile;
  }

  /**
   * Deletes a resource file. For more information about resource files, see
   * [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param name Required. ID of the resource file to delete. Must match the regular expression: [a-zA-Z0-9:/\\!@#$%^&{}\[\]()+\-=,.~'` ]{1,255}
   * @param parent Required. Name of the environment in the following format: `organizations/{org}/environments/{env}`.
   * @param type Required. Resource file type. {{ resource_file_type }}
   */
  async organizationsEnvironmentsResourcefilesDelete(name: string, parent: string, type: string): Promise<GoogleCloudApigeeV1ResourceFile> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles/${ type }/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1ResourceFile;
  }

  /**
   * Gets the contents of a resource file. For more information about resource
   * files, see [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param name Required. ID of the resource file. Must match the regular expression: [a-zA-Z0-9:/\\!@#$%^&{}\[\]()+\-=,.~'` ]{1,255}
   * @param parent Required. Name of the environment in the following format: `organizations/{org}/environments/{env}`.
   * @param type Required. Resource file type. {{ resource_file_type }}
   */
  async organizationsEnvironmentsResourcefilesGet(name: string, parent: string, type: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles/${ type }/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Lists all resource files, optionally filtering by type. For more
   * information about resource files, see [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param parent Required. Name of the environment in which to list resource files in the following format: `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsResourcefilesList(parent: string, opts: OrganizationsEnvironmentsResourcefilesListOptions = {}): Promise<GoogleCloudApigeeV1ListEnvironmentResourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles`);
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListEnvironmentResourcesResponse;
  }

  /**
   * Lists all resource files, optionally filtering by type. For more
   * information about resource files, see [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param parent Required. Name of the environment in which to list resource files in the following format: `organizations/{org}/environments/{env}`.
   * @param type Optional. Type of resource files to list. {{ resource_file_type }}
   */
  async organizationsEnvironmentsResourcefilesListEnvironmentResources(parent: string, type: string): Promise<GoogleCloudApigeeV1ListEnvironmentResourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles/${ type }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListEnvironmentResourcesResponse;
  }

  /**
   * Updates a resource file. Specify the `Content-Type` as
   * `application/octet-stream` or `multipart/form-data`. For more information
   * about resource files, see [Resource
   * files](https://cloud.google.com/apigee/docs/api-platform/develop/resource-files).
   *
   * @param name Required. ID of the resource file to update. Must match the regular expression: [a-zA-Z0-9:/\\!@#$%^&{}\[\]()+\-=,.~'` ]{1,255}
   * @param parent Required. Name of the environment in the following format: `organizations/{org}/environments/{env}`.
   * @param type Required. Resource file type. {{ resource_file_type }}
   */
  async organizationsEnvironmentsResourcefilesUpdate(name: string, parent: string, type: string, req: GoogleApiHttpBody): Promise<GoogleCloudApigeeV1ResourceFile> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/resourcefiles/${ type }/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1ResourceFile;
  }

  /**
   * GetSecurityIncident gets the specified security incident. Returns
   * NOT_FOUND if security incident is not present for the specified
   * organization and environment.
   *
   * @param name Required. Security incident in the following format: `organizations/{org}/environments/{environment}/securityIncidents/{incident}'. Example: organizations/testOrg/environments/testEnv/securityIncidents/1234-4567-890-111
   */
  async organizationsEnvironmentsSecurityIncidentsGet(name: string): Promise<GoogleCloudApigeeV1SecurityIncident> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SecurityIncident(data);
  }

  /**
   * ListSecurityIncidents lists all the security incident associated with the
   * environment.
   *
   * @param parent Required. For a specific organization, list of all the security incidents. Format: `organizations/{org}/environments/{environment}`
   */
  async organizationsEnvironmentsSecurityIncidentsList(parent: string, opts: OrganizationsEnvironmentsSecurityIncidentsListOptions = {}): Promise<GoogleCloudApigeeV1ListSecurityIncidentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/securityIncidents`);
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
    return deserializeGoogleCloudApigeeV1ListSecurityIncidentsResponse(data);
  }

  /**
   * Submit a report request to be processed in the background. If the
   * submission succeeds, the API returns a 200 status and an ID that refer to
   * the report request. In addition to the HTTP status 200, the `state` of
   * "enqueued" means that the request succeeded.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsSecurityReportsCreate(parent: string, req: GoogleCloudApigeeV1SecurityReportQuery): Promise<GoogleCloudApigeeV1SecurityReport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/securityReports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SecurityReport(data);
  }

  /**
   * Get security report status If the query is still in progress, the `state`
   * is set to "running" After the query has completed successfully, `state` is
   * set to "completed"
   *
   * @param name Required. Name of the security report to get. Must be of the form `organizations/{org}/environments/{env}/securityReports/{reportId}`.
   */
  async organizationsEnvironmentsSecurityReportsGet(name: string): Promise<GoogleCloudApigeeV1SecurityReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SecurityReport(data);
  }

  /**
   * After the query is completed, use this API to retrieve the results as
   * file. If the request succeeds, and there is a non-zero result set, the
   * result is downloaded to the client as a zipped JSON file. The name of the
   * downloaded file will be: OfflineQueryResult-.zip Example:
   * `OfflineQueryResult-9cfc0d85-0f30-46d6-ae6f-318d0cb961bd.zip`
   *
   * @param name Required. Name of the security report result to get. Must be of the form `organizations/{org}/environments/{env}/securityReports/{reportId}/result`.
   */
  async organizationsEnvironmentsSecurityReportsGetResult(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * After the query is completed, use this API to view the query result when
   * result size is small.
   *
   * @param name Required. Name of the security report result view to get. Must be of the form `organizations/{org}/environments/{env}/securityReports/{reportId}/resultView`.
   */
  async organizationsEnvironmentsSecurityReportsGetResultView(name: string): Promise<GoogleCloudApigeeV1SecurityReportResultView> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SecurityReportResultView(data);
  }

  /**
   * Return a list of Security Reports
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsSecurityReportsList(parent: string, opts: OrganizationsEnvironmentsSecurityReportsListOptions = {}): Promise<GoogleCloudApigeeV1ListSecurityReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/securityReports`);
    if (opts.dataset !== undefined) {
      url.searchParams.append("dataset", String(opts.dataset));
    }
    if (opts.from !== undefined) {
      url.searchParams.append("from", String(opts.from));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.submittedBy !== undefined) {
      url.searchParams.append("submittedBy", String(opts.submittedBy));
    }
    if (opts.to !== undefined) {
      url.searchParams.append("to", String(opts.to));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListSecurityReportsResponse(data);
  }

  /**
   * Retrieve security statistics as tabular rows.
   *
   * @param orgenv Required. Should be of the form organizations//environments/.
   */
  async organizationsEnvironmentsSecurityStatsQueryTabularStats(orgenv: string, req: GoogleCloudApigeeV1QueryTabularStatsRequest): Promise<GoogleCloudApigeeV1QueryTabularStatsResponse> {
    req = serializeGoogleCloudApigeeV1QueryTabularStatsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ orgenv }/securityStats:queryTabularStats`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1QueryTabularStatsResponse;
  }

  /**
   * Retrieve security statistics as a collection of time series.
   *
   * @param orgenv Required. Should be of the form organizations//environments/.
   */
  async organizationsEnvironmentsSecurityStatsQueryTimeSeriesStats(orgenv: string, req: GoogleCloudApigeeV1QueryTimeSeriesStatsRequest): Promise<GoogleCloudApigeeV1QueryTimeSeriesStatsResponse> {
    req = serializeGoogleCloudApigeeV1QueryTimeSeriesStatsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ orgenv }/securityStats:queryTimeSeriesStats`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1QueryTimeSeriesStatsResponse;
  }

  /**
   * Sets the IAM policy on an environment, if the policy already exists it
   * will be replaced. For more information, see [Manage users, roles, and
   * permissions using the
   * API](https://cloud.google.com/apigee/docs/api-platform/system-administration/manage-users-roles).
   * You must have the `apigee.environments.setIamPolicy` permission to call
   * this API.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsEnvironmentsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists all deployments of a shared flow in an environment.
   *
   * @param parent Required. Name representing a shared flow in an environment in the following format: `organizations/{org}/environments/{env}/sharedflows/{sharedflow}`
   */
  async organizationsEnvironmentsSharedflowsDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Deploys a revision of a shared flow. If another revision of the same
   * shared flow is currently deployed, set the `override` parameter to `true`
   * to have this revision replace the currently deployed revision. You cannot
   * use a shared flow until it has been deployed to an environment. For a
   * request path
   * `organizations/{org}/environments/{env}/sharedflows/{sf}/revisions/{rev}/deployments`,
   * two permissions are required: * `apigee.deployments.create` on the resource
   * `organizations/{org}/environments/{env}` *
   * `apigee.sharedflowrevisions.deploy` on the resource
   * `organizations/{org}/sharedflows/{sf}/revisions/{rev}`
   *
   * @param name Required. Name of the shared flow revision to deploy in the following format: `organizations/{org}/environments/{env}/sharedflows/{sharedflow}/revisions/{rev}`
   */
  async organizationsEnvironmentsSharedflowsRevisionsDeploy(name: string, opts: OrganizationsEnvironmentsSharedflowsRevisionsDeployOptions = {}): Promise<GoogleCloudApigeeV1Deployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    if (opts.override !== undefined) {
      url.searchParams.append("override", String(opts.override));
    }
    if (opts.serviceAccount !== undefined) {
      url.searchParams.append("serviceAccount", String(opts.serviceAccount));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeGoogleCloudApigeeV1Deployment(data);
  }

  /**
   * Gets the deployment of a shared flow revision and actual state reported by
   * runtime pods.
   *
   * @param name Required. Name representing a shared flow in an environment in the following format: `organizations/{org}/environments/{env}/sharedflows/{sharedflow}/revisions/{rev}`
   */
  async organizationsEnvironmentsSharedflowsRevisionsGetDeployments(name: string): Promise<GoogleCloudApigeeV1Deployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1Deployment(data);
  }

  /**
   * Undeploys a shared flow revision from an environment. For a request path
   * `organizations/{org}/environments/{env}/sharedflows/{sf}/revisions/{rev}/deployments`,
   * two permissions are required: * `apigee.deployments.delete` on the resource
   * `organizations/{org}/environments/{env}` *
   * `apigee.sharedflowrevisions.undeploy` on the resource
   * `organizations/{org}/sharedflows/{sf}/revisions/{rev}`
   *
   * @param name Required. Name of the shared flow revision to undeploy in the following format: `organizations/{org}/environments/{env}/sharedflows/{sharedflow}/revisions/{rev}`
   */
  async organizationsEnvironmentsSharedflowsRevisionsUndeploy(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieve metrics grouped by dimensions. The types of metrics you can
   * retrieve include traffic, message counts, API call latency, response size,
   * and cache hits and counts. Dimensions let you view metrics in meaningful
   * groups. You can optionally pass dimensions as path parameters to the
   * `stats` API. If dimensions are not specified, the metrics are computed on
   * the entire set of data for the given time range.
   *
   * @param name Required. Resource name for which the interactive query will be executed. Use the following format in your request: `organizations/{org}/environments/{env}/stats/{dimensions}` Dimensions let you view metrics in meaningful groupings, such as `apiproxy` or `target_host`. The value of dimensions should be a comma-separated list, as shown below: `organizations/{org}/environments/{env}/stats/apiproxy,request_verb`
   */
  async organizationsEnvironmentsStatsGet(name: string, opts: OrganizationsEnvironmentsStatsGetOptions = {}): Promise<GoogleCloudApigeeV1Stats> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.accuracy !== undefined) {
      url.searchParams.append("accuracy", String(opts.accuracy));
    }
    if (opts.aggTable !== undefined) {
      url.searchParams.append("aggTable", String(opts.aggTable));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
    }
    if (opts.realtime !== undefined) {
      url.searchParams.append("realtime", String(opts.realtime));
    }
    if (opts.select !== undefined) {
      url.searchParams.append("select", String(opts.select));
    }
    if (opts.sonar !== undefined) {
      url.searchParams.append("sonar", String(opts.sonar));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.sortby !== undefined) {
      url.searchParams.append("sortby", String(opts.sortby));
    }
    if (opts.timeRange !== undefined) {
      url.searchParams.append("timeRange", String(opts.timeRange));
    }
    if (opts.timeUnit !== undefined) {
      url.searchParams.append("timeUnit", String(opts.timeUnit));
    }
    if (opts.topk !== undefined) {
      url.searchParams.append("topk", String(opts.topk));
    }
    if (opts.tsAscending !== undefined) {
      url.searchParams.append("tsAscending", String(opts.tsAscending));
    }
    if (opts.tzo !== undefined) {
      url.searchParams.append("tzo", String(opts.tzo));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Stats;
  }

  /**
   * Creates a subscription for the environment's Pub/Sub topic. The server
   * will assign a random name for this subscription. The "name" and
   * "push_config" must *not* be specified.
   *
   * @param parent Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsSubscribe(parent: string): Promise<GoogleCloudApigeeV1Subscription> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:subscribe`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleCloudApigeeV1Subscription;
  }

  /**
   * Creates a TargetServer in the specified environment.
   *
   * @param parent Required. The parent environment name under which the TargetServer will be created. Must be of the form `organizations/{org}/environments/{env}`.
   */
  async organizationsEnvironmentsTargetserversCreate(parent: string, req: GoogleCloudApigeeV1TargetServer, opts: OrganizationsEnvironmentsTargetserversCreateOptions = {}): Promise<GoogleCloudApigeeV1TargetServer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/targetservers`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1TargetServer;
  }

  /**
   * Deletes a TargetServer from an environment. Returns the deleted
   * TargetServer resource.
   *
   * @param name Required. The name of the TargetServer to delete. Must be of the form `organizations/{org}/environments/{env}/targetservers/{target_server_id}`.
   */
  async organizationsEnvironmentsTargetserversDelete(name: string): Promise<GoogleCloudApigeeV1TargetServer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1TargetServer;
  }

  /**
   * Gets a TargetServer resource.
   *
   * @param name Required. The name of the TargetServer to get. Must be of the form `organizations/{org}/environments/{env}/targetservers/{target_server_id}`.
   */
  async organizationsEnvironmentsTargetserversGet(name: string): Promise<GoogleCloudApigeeV1TargetServer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1TargetServer;
  }

  /**
   * Updates an existing TargetServer. Note that this operation has PUT
   * semantics; it will replace the entirety of the existing TargetServer with
   * the resource in the request body.
   *
   * @param name Required. The name of the TargetServer to replace. Must be of the form `organizations/{org}/environments/{env}/targetservers/{target_server_id}`.
   */
  async organizationsEnvironmentsTargetserversUpdate(name: string, req: GoogleCloudApigeeV1TargetServer): Promise<GoogleCloudApigeeV1TargetServer> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1TargetServer;
  }

  /**
   * Tests the permissions of a user on an environment, and returns a subset of
   * permissions that the user has on the environment. If the environment does
   * not exist, an empty permission set is returned (a NOT_FOUND error is not
   * returned).
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsEnvironmentsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a trace configuration override. The response contains a
   * system-generated UUID, that can be used to view, update, or delete the
   * configuration override. Use the List API to view the existing trace
   * configuration overrides.
   *
   * @param parent Required. Parent resource of the trace configuration override. Use the following structure in your request. "organizations/*\/environments/*\/traceConfig".
   */
  async organizationsEnvironmentsTraceConfigOverridesCreate(parent: string, req: GoogleCloudApigeeV1TraceConfigOverride): Promise<GoogleCloudApigeeV1TraceConfigOverride> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/overrides`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1TraceConfigOverride;
  }

  /**
   * Deletes a distributed trace configuration override.
   *
   * @param name Required. Name of the trace configuration override. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig/overrides/*".
   */
  async organizationsEnvironmentsTraceConfigOverridesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a trace configuration override.
   *
   * @param name Required. Name of the trace configuration override. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig/overrides/*".
   */
  async organizationsEnvironmentsTraceConfigOverridesGet(name: string): Promise<GoogleCloudApigeeV1TraceConfigOverride> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1TraceConfigOverride;
  }

  /**
   * Lists all of the distributed trace configuration overrides in an
   * environment.
   *
   * @param parent Required. Parent resource of the trace configuration override. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig".
   */
  async organizationsEnvironmentsTraceConfigOverridesList(parent: string, opts: OrganizationsEnvironmentsTraceConfigOverridesListOptions = {}): Promise<GoogleCloudApigeeV1ListTraceConfigOverridesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/overrides`);
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
    return data as GoogleCloudApigeeV1ListTraceConfigOverridesResponse;
  }

  /**
   * Updates a distributed trace configuration override. Note that the repeated
   * fields have replace semantics when included in the field mask and that they
   * will be overwritten by the value of the fields in the request body.
   *
   * @param name Required. Name of the trace configuration override. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig/overrides/*".
   */
  async organizationsEnvironmentsTraceConfigOverridesPatch(name: string, req: GoogleCloudApigeeV1TraceConfigOverride, opts: OrganizationsEnvironmentsTraceConfigOverridesPatchOptions = {}): Promise<GoogleCloudApigeeV1TraceConfigOverride> {
    opts = serializeOrganizationsEnvironmentsTraceConfigOverridesPatchOptions(opts);
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
    return data as GoogleCloudApigeeV1TraceConfigOverride;
  }

  /**
   * Deletes a subscription for the environment's Pub/Sub topic.
   *
   * @param parent Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsUnsubscribe(parent: string, req: GoogleCloudApigeeV1Subscription): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:unsubscribe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Updates an existing environment. When updating properties, you must pass
   * all existing properties to the API, even if they are not being changed. If
   * you omit properties from the payload, the properties are removed. To get
   * the current list of properties for the environment, use the [Get
   * Environment API](get). **Note**: Both `PUT` and `POST` methods are
   * supported for updating an existing environment.
   *
   * @param name Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsUpdate(name: string, req: GoogleCloudApigeeV1Environment): Promise<GoogleCloudApigeeV1Environment> {
    req = serializeGoogleCloudApigeeV1Environment(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoogleCloudApigeeV1Environment(data);
  }

  /**
   * Updates the debug mask singleton resource for an environment.
   *
   * @param name Name of the debug mask.
   */
  async organizationsEnvironmentsUpdateDebugmask(name: string, req: GoogleCloudApigeeV1DebugMask, opts: OrganizationsEnvironmentsUpdateDebugmaskOptions = {}): Promise<GoogleCloudApigeeV1DebugMask> {
    opts = serializeOrganizationsEnvironmentsUpdateDebugmaskOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.replaceRepeatedFields !== undefined) {
      url.searchParams.append("replaceRepeatedFields", String(opts.replaceRepeatedFields));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudApigeeV1DebugMask;
  }

  /**
   * Updates an existing environment. When updating properties, you must pass
   * all existing properties to the API, even if they are not being changed. If
   * you omit properties from the payload, the properties are removed. To get
   * the current list of properties for the environment, use the [Get
   * Environment API](get). **Note**: Both `PUT` and `POST` methods are
   * supported for updating an existing environment.
   *
   * @param name Required. Name of the environment. Use the following structure in your request: `organizations/{org}/environments/{env}`
   */
  async organizationsEnvironmentsUpdateEnvironment(name: string, req: GoogleCloudApigeeV1Environment): Promise<GoogleCloudApigeeV1Environment> {
    req = serializeGoogleCloudApigeeV1Environment(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1Environment(data);
  }

  /**
   * Updates the trace configurations in an environment. Note that the repeated
   * fields have replace semantics when included in the field mask and that they
   * will be overwritten by the value of the fields in the request body.
   *
   * @param name Required. Name of the trace configuration. Use the following structure in your request: "organizations/*\/environments/*\/traceConfig".
   */
  async organizationsEnvironmentsUpdateTraceConfig(name: string, req: GoogleCloudApigeeV1TraceConfig, opts: OrganizationsEnvironmentsUpdateTraceConfigOptions = {}): Promise<GoogleCloudApigeeV1TraceConfig> {
    opts = serializeOrganizationsEnvironmentsUpdateTraceConfigOptions(opts);
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
    return data as GoogleCloudApigeeV1TraceConfig;
  }

  /**
   * Gets the profile for an Apigee organization. See [Understanding
   * organizations](https://cloud.google.com/apigee/docs/api-platform/fundamentals/organization-structure).
   *
   * @param name Required. Apigee organization name in the following format: `organizations/{org}`
   */
  async organizationsGet(name: string): Promise<GoogleCloudApigeeV1Organization> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Organization;
  }

  /**
   * Gets the deployed ingress configuration for an organization.
   *
   * @param name Required. Name of the deployed configuration for the organization in the following format: 'organizations/{org}/deployedIngressConfig'.
   */
  async organizationsGetDeployedIngressConfig(name: string, opts: OrganizationsGetDeployedIngressConfigOptions = {}): Promise<GoogleCloudApigeeV1IngressConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1IngressConfig(data);
  }

  /**
   * Gets the project ID and region for an Apigee organization.
   *
   * @param name Required. Apigee organization name in the following format: `organizations/{org}`
   */
  async organizationsGetProjectMapping(name: string): Promise<GoogleCloudApigeeV1OrganizationProjectMapping> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getProjectMapping`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1OrganizationProjectMapping;
  }

  /**
   * Get runtime config for an organization.
   *
   * @param name Required. Name of the runtime config for the organization in the following format: 'organizations/{org}/runtimeConfig'.
   */
  async organizationsGetRuntimeConfig(name: string): Promise<GoogleCloudApigeeV1RuntimeConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1RuntimeConfig;
  }

  /**
   * Lists the service accounts with the permissions required to allow the
   * Synchronizer to download environment data from the control plane. An ETag
   * is returned in the response to `getSyncAuthorization`. Pass that ETag when
   * calling [setSyncAuthorization](setSyncAuthorization) to ensure that you are
   * updating the correct version. If you don't pass the ETag in the call to
   * `setSyncAuthorization`, then the existing authorization is overwritten
   * indiscriminately. For more information, see [Configure the
   * Synchronizer](https://cloud.google.com/apigee/docs/hybrid/latest/synchronizer-access).
   * **Note**: Available to Apigee hybrid only.
   *
   * @param name Required. Name of the Apigee organization. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsGetSyncAuthorization(name: string, req: GoogleCloudApigeeV1GetSyncAuthorizationRequest): Promise<GoogleCloudApigeeV1SyncAuthorization> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getSyncAuthorization`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SyncAuthorization(data);
  }

  /**
   * Submit a query at host level to be processed in the background. If the
   * submission of the query succeeds, the API returns a 201 status and an ID
   * that refer to the query. In addition to the HTTP status 201, the `state` of
   * "enqueued" means that the request succeeded.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}`.
   */
  async organizationsHostQueriesCreate(parent: string, req: GoogleCloudApigeeV1Query): Promise<GoogleCloudApigeeV1AsyncQuery> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hostQueries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1AsyncQuery(data);
  }

  /**
   * Get status of a query submitted at host level. If the query is still in
   * progress, the `state` is set to "running" After the query has completed
   * successfully, `state` is set to "completed"
   *
   * @param name Required. Name of the asynchronous query to get. Must be of the form `organizations/{org}/queries/{queryId}`.
   */
  async organizationsHostQueriesGet(name: string): Promise<GoogleCloudApigeeV1AsyncQuery> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1AsyncQuery(data);
  }

  /**
   * After the query is completed, use this API to retrieve the results. If the
   * request succeeds, and there is a non-zero result set, the result is
   * downloaded to the client as a zipped JSON file. The name of the downloaded
   * file will be: OfflineQueryResult-.zip Example:
   * `OfflineQueryResult-9cfc0d85-0f30-46d6-ae6f-318d0cb961bd.zip`
   *
   * @param name Required. Name of the asynchronous query result to get. Must be of the form `organizations/{org}/queries/{queryId}/result`.
   */
  async organizationsHostQueriesGetResult(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  async organizationsHostQueriesGetResultView(name: string): Promise<GoogleCloudApigeeV1AsyncQueryResultView> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1AsyncQueryResultView;
  }

  /**
   * Return a list of Asynchronous Queries at host level.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}`.
   */
  async organizationsHostQueriesList(parent: string, opts: OrganizationsHostQueriesListOptions = {}): Promise<GoogleCloudApigeeV1ListAsyncQueriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hostQueries`);
    if (opts.dataset !== undefined) {
      url.searchParams.append("dataset", String(opts.dataset));
    }
    if (opts.envgroupHostname !== undefined) {
      url.searchParams.append("envgroupHostname", String(opts.envgroupHostname));
    }
    if (opts.from !== undefined) {
      url.searchParams.append("from", String(opts.from));
    }
    if (opts.inclQueriesWithoutReport !== undefined) {
      url.searchParams.append("inclQueriesWithoutReport", String(opts.inclQueriesWithoutReport));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.submittedBy !== undefined) {
      url.searchParams.append("submittedBy", String(opts.submittedBy));
    }
    if (opts.to !== undefined) {
      url.searchParams.append("to", String(opts.to));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListAsyncQueriesResponse(data);
  }

  /**
   * Submit a query at host level to be processed in the background. If the
   * submission of the query succeeds, the API returns a 201 status and an ID
   * that refer to the query. In addition to the HTTP status 201, the `state` of
   * "enqueued" means that the request succeeded.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}`.
   */
  async organizationsHostSecurityReportsCreate(parent: string, req: GoogleCloudApigeeV1SecurityReportQuery): Promise<GoogleCloudApigeeV1SecurityReport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hostSecurityReports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SecurityReport(data);
  }

  /**
   * Get status of a query submitted at host level. If the query is still in
   * progress, the `state` is set to "running" After the query has completed
   * successfully, `state` is set to "completed"
   *
   * @param name Required. Name of the security report to get. Must be of the form `organizations/{org}/securityReports/{reportId}`.
   */
  async organizationsHostSecurityReportsGet(name: string): Promise<GoogleCloudApigeeV1SecurityReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SecurityReport(data);
  }

  /**
   * After the query is completed, use this API to retrieve the results. If the
   * request succeeds, and there is a non-zero result set, the result is
   * downloaded to the client as a zipped JSON file. The name of the downloaded
   * file will be: OfflineQueryResult-.zip Example:
   * `OfflineQueryResult-9cfc0d85-0f30-46d6-ae6f-318d0cb961bd.zip`
   *
   * @param name Required. Name of the security report result to get. Must be of the form `organizations/{org}/securityReports/{reportId}/result`.
   */
  async organizationsHostSecurityReportsGetResult(name: string): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * After the query is completed, use this API to view the query result when
   * result size is small.
   *
   * @param name Required. Name of the security report result view to get. Must be of the form `organizations/{org}/securityReports/{reportId}/resultView`.
   */
  async organizationsHostSecurityReportsGetResultView(name: string): Promise<GoogleCloudApigeeV1SecurityReportResultView> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SecurityReportResultView(data);
  }

  /**
   * Return a list of Security Reports at host level.
   *
   * @param parent Required. The parent resource name. Must be of the form `organizations/{org}`.
   */
  async organizationsHostSecurityReportsList(parent: string, opts: OrganizationsHostSecurityReportsListOptions = {}): Promise<GoogleCloudApigeeV1ListSecurityReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hostSecurityReports`);
    if (opts.dataset !== undefined) {
      url.searchParams.append("dataset", String(opts.dataset));
    }
    if (opts.envgroupHostname !== undefined) {
      url.searchParams.append("envgroupHostname", String(opts.envgroupHostname));
    }
    if (opts.from !== undefined) {
      url.searchParams.append("from", String(opts.from));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.submittedBy !== undefined) {
      url.searchParams.append("submittedBy", String(opts.submittedBy));
    }
    if (opts.to !== undefined) {
      url.searchParams.append("to", String(opts.to));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListSecurityReportsResponse(data);
  }

  /**
   * Retrieve metrics grouped by dimensions in host level. The types of metrics
   * you can retrieve include traffic, message counts, API call latency,
   * response size, and cache hits and counts. Dimensions let you view metrics
   * in meaningful groups. You can optionally pass dimensions as path parameters
   * to the `stats` API. If dimensions are not specified, the metrics are
   * computed on the entire set of data for the given time range.
   *
   * @param name Required. Resource name for which the interactive query will be executed. Use the following format in your request: `organizations/{org}/hostStats/{dimensions}` Dimensions let you view metrics in meaningful groupings, such as `apiproxy`, `target_host`. The value of dimensions should be a comma-separated list as shown below `organizations/{org}/hostStats/apiproxy,request_verb`
   */
  async organizationsHostStatsGet(name: string, opts: OrganizationsHostStatsGetOptions = {}): Promise<GoogleCloudApigeeV1Stats> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.accuracy !== undefined) {
      url.searchParams.append("accuracy", String(opts.accuracy));
    }
    if (opts.envgroupHostname !== undefined) {
      url.searchParams.append("envgroupHostname", String(opts.envgroupHostname));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
    }
    if (opts.realtime !== undefined) {
      url.searchParams.append("realtime", String(opts.realtime));
    }
    if (opts.select !== undefined) {
      url.searchParams.append("select", String(opts.select));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.sortby !== undefined) {
      url.searchParams.append("sortby", String(opts.sortby));
    }
    if (opts.timeRange !== undefined) {
      url.searchParams.append("timeRange", String(opts.timeRange));
    }
    if (opts.timeUnit !== undefined) {
      url.searchParams.append("timeUnit", String(opts.timeUnit));
    }
    if (opts.topk !== undefined) {
      url.searchParams.append("topk", String(opts.topk));
    }
    if (opts.tsAscending !== undefined) {
      url.searchParams.append("tsAscending", String(opts.tsAscending));
    }
    if (opts.tzo !== undefined) {
      url.searchParams.append("tzo", String(opts.tzo));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Stats;
  }

  /**
   * Creates a new attachment of an environment to an instance. **Note:** Not
   * supported for Apigee hybrid.
   *
   * @param parent Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`.
   */
  async organizationsInstancesAttachmentsCreate(parent: string, req: GoogleCloudApigeeV1InstanceAttachment): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attachments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an attachment. **Note:** Not supported for Apigee hybrid.
   *
   * @param name Required. Name of the attachment. Use the following structure in your request: `organizations/{org}/instances/{instance}/attachments/{attachment}`.
   */
  async organizationsInstancesAttachmentsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an attachment. **Note:** Not supported for Apigee hybrid.
   *
   * @param name Required. Name of the attachment. Use the following structure in your request: `organizations/{org}/instances/{instance}/attachments/{attachment}`
   */
  async organizationsInstancesAttachmentsGet(name: string): Promise<GoogleCloudApigeeV1InstanceAttachment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1InstanceAttachment;
  }

  /**
   * Lists all attachments to an instance. **Note:** Not supported for Apigee
   * hybrid.
   *
   * @param parent Required. Name of the organization. Use the following structure in your request: `organizations/{org}/instances/{instance}`
   */
  async organizationsInstancesAttachmentsList(parent: string, opts: OrganizationsInstancesAttachmentsListOptions = {}): Promise<GoogleCloudApigeeV1ListInstanceAttachmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attachments`);
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
    return data as GoogleCloudApigeeV1ListInstanceAttachmentsResponse;
  }

  /**
   * Creates a new canary evaluation for an organization.
   *
   * @param parent Required. Name of the organization. Use the following structure in your request: `organizations/{org}/instances/{instance}`.
   */
  async organizationsInstancesCanaryevaluationsCreate(parent: string, req: GoogleCloudApigeeV1CanaryEvaluation): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudApigeeV1CanaryEvaluation(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/canaryevaluations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a CanaryEvaluation for an organization.
   *
   * @param name Required. Name of the CanaryEvaluation. Use the following structure in your request: `organizations/{org}/instances/*\/canaryevaluations/{evaluation}`
   */
  async organizationsInstancesCanaryevaluationsGet(name: string): Promise<GoogleCloudApigeeV1CanaryEvaluation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1CanaryEvaluation(data);
  }

  /**
   * Creates an Apigee runtime instance. The instance is accessible from the
   * authorized network configured on the organization. **Note:** Not supported
   * for Apigee hybrid.
   *
   * @param parent Required. Name of the organization. Use the following structure in your request: `organizations/{org}`.
   */
  async organizationsInstancesCreate(parent: string, req: GoogleCloudApigeeV1Instance): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an Apigee runtime instance. The instance stops serving requests
   * and the runtime data is deleted. **Note:** Not supported for Apigee hybrid.
   *
   * @param name Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`.
   */
  async organizationsInstancesDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the details for an Apigee runtime instance. **Note:** Not supported
   * for Apigee hybrid.
   *
   * @param name Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`.
   */
  async organizationsInstancesGet(name: string): Promise<GoogleCloudApigeeV1Instance> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1Instance;
  }

  /**
   * Lists all Apigee runtime instances for the organization. **Note:** Not
   * supported for Apigee hybrid.
   *
   * @param parent Required. Name of the organization. Use the following structure in your request: `organizations/{org}`.
   */
  async organizationsInstancesList(parent: string, opts: OrganizationsInstancesListOptions = {}): Promise<GoogleCloudApigeeV1ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
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
    return data as GoogleCloudApigeeV1ListInstancesResponse;
  }

  /**
   * Activates the NAT address. The Apigee instance can now use this for
   * Internet egress traffic. **Note:** Not supported for Apigee hybrid.
   *
   * @param name Required. Name of the nat address. Use the following structure in your request: `organizations/{org}/instances/{instances}/natAddresses/{nataddress}``
   */
  async organizationsInstancesNatAddressesActivate(name: string, req: GoogleCloudApigeeV1ActivateNatAddressRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a NAT address. The address is created in the RESERVED state and a
   * static external IP address will be provisioned. At this time, the instance
   * will not use this IP address for Internet egress traffic. The address can
   * be activated for use once any required firewall IP whitelisting has been
   * completed. **Note:** Not supported for Apigee hybrid.
   *
   * @param parent Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`
   */
  async organizationsInstancesNatAddressesCreate(parent: string, req: GoogleCloudApigeeV1NatAddress): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/natAddresses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes the NAT address. Connections that are actively using the address
   * are drained before it is removed. **Note:** Not supported for Apigee
   * hybrid.
   *
   * @param name Required. Name of the nat address. Use the following structure in your request: `organizations/{org}/instances/{instances}/natAddresses/{nataddress}``
   */
  async organizationsInstancesNatAddressesDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the details of a NAT address. **Note:** Not supported for Apigee
   * hybrid.
   *
   * @param name Required. Name of the nat address. Use the following structure in your request: `organizations/{org}/instances/{instances}/natAddresses/{nataddress}`
   */
  async organizationsInstancesNatAddressesGet(name: string): Promise<GoogleCloudApigeeV1NatAddress> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1NatAddress;
  }

  /**
   * Lists the NAT addresses for an Apigee instance. **Note:** Not supported
   * for Apigee hybrid.
   *
   * @param parent Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`
   */
  async organizationsInstancesNatAddressesList(parent: string, opts: OrganizationsInstancesNatAddressesListOptions = {}): Promise<GoogleCloudApigeeV1ListNatAddressesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/natAddresses`);
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
    return data as GoogleCloudApigeeV1ListNatAddressesResponse;
  }

  /**
   * Updates an Apigee runtime instance. You can update the fields described in
   * NodeConfig. No other fields will be updated. **Note:** Not supported for
   * Apigee hybrid.
   *
   * @param name Required. Name of the instance. Use the following structure in your request: `organizations/{org}/instances/{instance}`.
   */
  async organizationsInstancesPatch(name: string, req: GoogleCloudApigeeV1Instance, opts: OrganizationsInstancesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeOrganizationsInstancesPatchOptions(opts);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Reports the latest status for a runtime instance.
   *
   * @param instance The name of the instance reporting this status. For SaaS the request will be rejected if no instance exists under this name. Format is organizations/{org}/instances/{instance}
   */
  async organizationsInstancesReportStatus(instance: string, req: GoogleCloudApigeeV1ReportInstanceStatusRequest): Promise<GoogleCloudApigeeV1ReportInstanceStatusResponse> {
    req = serializeGoogleCloudApigeeV1ReportInstanceStatusRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ instance }:reportStatus`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1ReportInstanceStatusResponse;
  }

  /**
   * Creates a key value map in an organization.
   *
   * @param parent Required. Name of the organization in which to create the key value map file. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsKeyvaluemapsCreate(parent: string, req: GoogleCloudApigeeV1KeyValueMap): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keyvaluemaps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Deletes a key value map from an organization.
   *
   * @param name Required. Name of the key value map. Use the following structure in your request: `organizations/{org}/keyvaluemaps/{keyvaluemap}`
   */
  async organizationsKeyvaluemapsDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueMap> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueMap;
  }

  /**
   * Creates key value entries in a key value map scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to create the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsKeyvaluemapsEntriesCreate(parent: string, req: GoogleCloudApigeeV1KeyValueEntry): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Deletes a key value entry from a key value map scoped to an organization,
   * environment, or API proxy. **Notes:** * After you delete the key value
   * entry, the policy consuming the entry will continue to function with its
   * cached values for a few minutes. This is expected behavior. * Supported for
   * Apigee hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to delete the key value map entry. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsKeyvaluemapsEntriesDelete(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Get the key value entry value for a key value map scoped to an
   * organization, environment, or API proxy. **Note**: Supported for Apigee
   * hybrid 1.8.x and higher.
   *
   * @param name Required. Scope as indicated by the URI in which to fetch the key value map entry/value. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}/entries/{entry}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}/entries/{entry}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}/entries/{entry}`.
   */
  async organizationsKeyvaluemapsEntriesGet(name: string): Promise<GoogleCloudApigeeV1KeyValueEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1KeyValueEntry;
  }

  /**
   * Lists key value entries for key values maps scoped to an organization,
   * environment, or API proxy. **Note**: Supported for Apigee hybrid 1.8.x and
   * higher.
   *
   * @param parent Required. Scope as indicated by the URI in which to list key value maps. Use **one** of the following structures in your request: * `organizations/{organization}/apis/{api}/keyvaluemaps/{keyvaluemap}`. * `organizations/{organization}/environments/{environment}/keyvaluemaps/{keyvaluemap}` * `organizations/{organization}/keyvaluemaps/{keyvaluemap}`.
   */
  async organizationsKeyvaluemapsEntriesList(parent: string, opts: OrganizationsKeyvaluemapsEntriesListOptions = {}): Promise<GoogleCloudApigeeV1ListKeyValueEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
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
    return data as GoogleCloudApigeeV1ListKeyValueEntriesResponse;
  }

  /**
   * Lists the Apigee organizations and associated Google Cloud projects that
   * you have permission to access. See [Understanding
   * organizations](https://cloud.google.com/apigee/docs/api-platform/fundamentals/organization-structure).
   *
   * @param parent Required. Use the following structure in your request: `organizations`
   */
  async organizationsList(parent: string): Promise<GoogleCloudApigeeV1ListOrganizationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListOrganizationsResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async organizationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the
   * `name` binding allows API services to override the binding to use different
   * resource name schemes, such as `users/*\/operations`. To override the
   * binding, API services can add a binding such as
   * `"/v1/{name=users/*}/operations"` to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async organizationsOperationsList(name: string, opts: OrganizationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Similar to GetHostStats except that the response is less verbose.
   *
   * @param name Required. Resource name for which the interactive query will be executed. Use the following format in your request: `organizations/{organization_id}/optimizedHostStats/{dimensions}` Dimensions let you view metrics in meaningful groupings, such as `apiproxy`, `target_host`. The value of dimensions should be a comma-separated list as shown below: `organizations/{org}/optimizedHostStats/apiproxy,request_verb`
   */
  async organizationsOptimizedHostStatsGet(name: string, opts: OrganizationsOptimizedHostStatsGetOptions = {}): Promise<GoogleCloudApigeeV1OptimizedStats> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.accuracy !== undefined) {
      url.searchParams.append("accuracy", String(opts.accuracy));
    }
    if (opts.envgroupHostname !== undefined) {
      url.searchParams.append("envgroupHostname", String(opts.envgroupHostname));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.limit !== undefined) {
      url.searchParams.append("limit", String(opts.limit));
    }
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
    }
    if (opts.realtime !== undefined) {
      url.searchParams.append("realtime", String(opts.realtime));
    }
    if (opts.select !== undefined) {
      url.searchParams.append("select", String(opts.select));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.sortby !== undefined) {
      url.searchParams.append("sortby", String(opts.sortby));
    }
    if (opts.timeRange !== undefined) {
      url.searchParams.append("timeRange", String(opts.timeRange));
    }
    if (opts.timeUnit !== undefined) {
      url.searchParams.append("timeUnit", String(opts.timeUnit));
    }
    if (opts.topk !== undefined) {
      url.searchParams.append("topk", String(opts.topk));
    }
    if (opts.tsAscending !== undefined) {
      url.searchParams.append("tsAscending", String(opts.tsAscending));
    }
    if (opts.tzo !== undefined) {
      url.searchParams.append("tzo", String(opts.tzo));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1OptimizedStats(data);
  }

  /**
   * Creates a Custom Report for an Organization. A Custom Report provides
   * Apigee Customers to create custom dashboards in addition to the standard
   * dashboards which are provided. The Custom Report in its simplest form
   * contains specifications about metrics, dimensions and filters. It is
   * important to note that the custom report by itself does not provide an
   * executable entity. The Edge UI converts the custom report definition into
   * an analytics query and displays the result in a chart.
   *
   * @param parent Required. The parent organization name under which the Custom Report will be created. Must be of the form: `organizations/{organization_id}/reports`
   */
  async organizationsReportsCreate(parent: string, req: GoogleCloudApigeeV1CustomReport): Promise<GoogleCloudApigeeV1CustomReport> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudApigeeV1CustomReport;
  }

  /**
   * Deletes an existing custom report definition
   *
   * @param name Required. Custom Report name of the form: `organizations/{organization_id}/reports/{report_name}`
   */
  async organizationsReportsDelete(name: string): Promise<GoogleCloudApigeeV1DeleteCustomReportResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1DeleteCustomReportResponse;
  }

  /**
   * Retrieve a custom report definition.
   *
   * @param name Required. Custom Report name of the form: `organizations/{organization_id}/reports/{report_name}`
   */
  async organizationsReportsGet(name: string): Promise<GoogleCloudApigeeV1CustomReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1CustomReport;
  }

  /**
   * Return a list of Custom Reports
   *
   * @param parent Required. The parent organization name under which the API product will be listed `organizations/{organization_id}/reports`
   */
  async organizationsReportsList(parent: string, opts: OrganizationsReportsListOptions = {}): Promise<GoogleCloudApigeeV1ListCustomReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reports`);
    if (opts.expand !== undefined) {
      url.searchParams.append("expand", String(opts.expand));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1ListCustomReportsResponse;
  }

  /**
   * Update an existing custom report definition
   *
   * @param name Required. Custom Report name of the form: `organizations/{organization_id}/reports/{report_name}`
   */
  async organizationsReportsUpdate(name: string, req: GoogleCloudApigeeV1CustomReport): Promise<GoogleCloudApigeeV1CustomReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1CustomReport;
  }

  /**
   * ComputeEnvironmentScores calculates scores for requested time range for
   * the specified security profile and environment.
   *
   * @param profileEnvironment Required. Name of organization and environment and profile id for which score needs to be computed. Format: organizations/{org}/securityProfiles/{profile}/environments/{env}
   */
  async organizationsSecurityProfilesEnvironmentsComputeEnvironmentScores(profileEnvironment: string, req: GoogleCloudApigeeV1ComputeEnvironmentScoresRequest): Promise<GoogleCloudApigeeV1ComputeEnvironmentScoresResponse> {
    req = serializeGoogleCloudApigeeV1ComputeEnvironmentScoresRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ profileEnvironment }:computeEnvironmentScores`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1ComputeEnvironmentScoresResponse(data);
  }

  /**
   * CreateSecurityProfileEnvironmentAssociation creates profile environment
   * association i.e. attaches environment to security profile.
   *
   * @param parent Required. Name of organization and security profile ID. Format: organizations/{org}/securityProfiles/{profile}
   */
  async organizationsSecurityProfilesEnvironmentsCreate(parent: string, req: GoogleCloudApigeeV1SecurityProfileEnvironmentAssociation): Promise<GoogleCloudApigeeV1SecurityProfileEnvironmentAssociation> {
    req = serializeGoogleCloudApigeeV1SecurityProfileEnvironmentAssociation(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SecurityProfileEnvironmentAssociation(data);
  }

  /**
   * DeleteSecurityProfileEnvironmentAssociation removes profile environment
   * association i.e. detaches environment from security profile.
   *
   * @param name Required. The name of the environment attachment to delete. Format: organizations/{org}/securityProfiles/{profile}/environments/{env}
   */
  async organizationsSecurityProfilesEnvironmentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * GetSecurityProfile gets the specified security profile. Returns NOT_FOUND
   * if security profile is not present for the specified organization.
   *
   * @param name Required. Security profile in the following format: `organizations/{org}/securityProfiles/{profile}'. Profile may optionally contain revision ID. If revision ID is not provided, the response will contain latest revision by default. Example: organizations/testOrg/securityProfiles/testProfile@5
   */
  async organizationsSecurityProfilesGet(name: string): Promise<GoogleCloudApigeeV1SecurityProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudApigeeV1SecurityProfile;
  }

  /**
   * ListSecurityProfiles lists all the security profiles associated with the
   * org including attached and unattached profiles.
   *
   * @param parent Required. For a specific organization, list of all the security profiles. Format: `organizations/{org}`
   */
  async organizationsSecurityProfilesList(parent: string, opts: OrganizationsSecurityProfilesListOptions = {}): Promise<GoogleCloudApigeeV1ListSecurityProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/securityProfiles`);
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
    return data as GoogleCloudApigeeV1ListSecurityProfilesResponse;
  }

  /**
   * ListSecurityProfileRevisions lists all the revisions of the security
   * profile.
   *
   * @param name Required. For a specific profile, list all the revisions. Format: `organizations/{org}/securityProfiles/{profile}`
   */
  async organizationsSecurityProfilesListRevisions(name: string, opts: OrganizationsSecurityProfilesListRevisionsOptions = {}): Promise<GoogleCloudApigeeV1ListSecurityProfileRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:listRevisions`);
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
    return data as GoogleCloudApigeeV1ListSecurityProfileRevisionsResponse;
  }

  /**
   * Configures the add-ons for the Apigee organization. The existing add-on
   * configuration will be fully replaced.
   *
   * @param org Required. Name of the organization. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsSetAddons(org: string, req: GoogleCloudApigeeV1SetAddonsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ org }:setAddons`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the permissions required to allow the Synchronizer to download
   * environment data from the control plane. You must call this API to enable
   * proper functioning of hybrid. Pass the ETag when calling
   * `setSyncAuthorization` to ensure that you are updating the correct version.
   * To get an ETag, call [getSyncAuthorization](getSyncAuthorization). If you
   * don't pass the ETag in the call to `setSyncAuthorization`, then the
   * existing authorization is overwritten indiscriminately. For more
   * information, see [Configure the
   * Synchronizer](https://cloud.google.com/apigee/docs/hybrid/latest/synchronizer-access).
   * **Note**: Available to Apigee hybrid only.
   *
   * @param name Required. Name of the Apigee organization. Use the following structure in your request: `organizations/{org}`
   */
  async organizationsSetSyncAuthorization(name: string, req: GoogleCloudApigeeV1SyncAuthorization): Promise<GoogleCloudApigeeV1SyncAuthorization> {
    req = serializeGoogleCloudApigeeV1SyncAuthorization(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:setSyncAuthorization`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SyncAuthorization(data);
  }

  /**
   * Uploads a ZIP-formatted shared flow configuration bundle to an
   * organization. If the shared flow already exists, this creates a new
   * revision of it. If the shared flow does not exist, this creates it. Once
   * imported, the shared flow revision must be deployed before it can be
   * accessed at runtime. The size limit of a shared flow bundle is 15 MB.
   *
   * @param parent Required. The name of the parent organization under which to create the shared flow. Must be of the form: `organizations/{organization_id}`
   */
  async organizationsSharedflowsCreate(parent: string, req: GoogleApiHttpBody, opts: OrganizationsSharedflowsCreateOptions = {}): Promise<GoogleCloudApigeeV1SharedFlowRevision> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sharedflows`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SharedFlowRevision(data);
  }

  /**
   * Deletes a shared flow and all it's revisions. The shared flow must be
   * undeployed before you can delete it.
   *
   * @param name Required. shared flow name of the form: `organizations/{organization_id}/sharedflows/{shared_flow_id}`
   */
  async organizationsSharedflowsDelete(name: string): Promise<GoogleCloudApigeeV1SharedFlow> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1SharedFlow(data);
  }

  /**
   * Lists all deployments of a shared flow.
   *
   * @param parent Required. Name of the shared flow for which to return deployment information in the following format: `organizations/{org}/sharedflows/{sharedflow}`
   */
  async organizationsSharedflowsDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Gets a shared flow by name, including a list of its revisions.
   *
   * @param name Required. The name of the shared flow to get. Must be of the form: `organizations/{organization_id}/sharedflows/{shared_flow_id}`
   */
  async organizationsSharedflowsGet(name: string): Promise<GoogleCloudApigeeV1SharedFlow> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1SharedFlow(data);
  }

  /**
   * Lists all shared flows in the organization.
   *
   * @param parent Required. The name of the parent organization under which to get shared flows. Must be of the form: `organizations/{organization_id}`
   */
  async organizationsSharedflowsList(parent: string, opts: OrganizationsSharedflowsListOptions = {}): Promise<GoogleCloudApigeeV1ListSharedFlowsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sharedflows`);
    if (opts.includeMetaData !== undefined) {
      url.searchParams.append("includeMetaData", String(opts.includeMetaData));
    }
    if (opts.includeRevisions !== undefined) {
      url.searchParams.append("includeRevisions", String(opts.includeRevisions));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListSharedFlowsResponse(data);
  }

  /**
   * Deletes a shared flow and all associated policies, resources, and
   * revisions. You must undeploy the shared flow before deleting it.
   *
   * @param name Required. The name of the shared flow revision to delete. Must be of the form: `organizations/{organization_id}/sharedflows/{shared_flow_id}/revisions/{revision_id}`
   */
  async organizationsSharedflowsRevisionsDelete(name: string): Promise<GoogleCloudApigeeV1SharedFlowRevision> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeGoogleCloudApigeeV1SharedFlowRevision(data);
  }

  /**
   * Lists all deployments of a shared flow revision.
   *
   * @param parent Required. Name of the API proxy revision for which to return deployment information in the following format: `organizations/{org}/sharedflows/{sharedflow}/revisions/{rev}`.
   */
  async organizationsSharedflowsRevisionsDeploymentsList(parent: string): Promise<GoogleCloudApigeeV1ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data);
  }

  /**
   * Gets a revision of a shared flow. To download the shared flow
   * configuration bundle for the specified revision as a zip file, set the
   * `format` query parameter to `bundle`. If you are using curl, specify `-o
   * filename.zip` to save the output to a file; otherwise, it displays to
   * `stdout`. Then, develop the shared flow configuration locally and upload
   * the updated sharedFlow configuration revision, as described in
   * [updateSharedFlowRevision](updateSharedFlowRevision).
   *
   * @param name Required. The name of the shared flow revision to get. Must be of the form: `organizations/{organization_id}/sharedflows/{shared_flow_id}/revisions/{revision_id}`
   */
  async organizationsSharedflowsRevisionsGet(name: string, opts: OrganizationsSharedflowsRevisionsGetOptions = {}): Promise<GoogleApiHttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Updates a shared flow revision. This operation is only allowed on
   * revisions which have never been deployed. After deployment a revision
   * becomes immutable, even if it becomes undeployed. The payload is a
   * ZIP-formatted shared flow. Content type must be either multipart/form-data
   * or application/octet-stream.
   *
   * @param name Required. The name of the shared flow revision to update. Must be of the form: `organizations/{organization_id}/sharedflows/{shared_flow_id}/revisions/{revision_id}`
   */
  async organizationsSharedflowsRevisionsUpdateSharedFlowRevision(name: string, req: GoogleApiHttpBody, opts: OrganizationsSharedflowsRevisionsUpdateSharedFlowRevisionOptions = {}): Promise<GoogleCloudApigeeV1SharedFlowRevision> {
    req = serializeGoogleApiHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.validate !== undefined) {
      url.searchParams.append("validate", String(opts.validate));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1SharedFlowRevision(data);
  }

  /**
   * Creates a new category on the portal.
   *
   * @param parent Required. Name of the portal. Use the following structure in your request: `organizations/{org}/sites/{site}`
   */
  async organizationsSitesApicategoriesCreate(parent: string, req: GoogleCloudApigeeV1ApiCategoryData): Promise<GoogleCloudApigeeV1ApiCategory> {
    req = serializeGoogleCloudApigeeV1ApiCategoryData(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apicategories`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiCategory(data);
  }

  /**
   * Deletes a category from the portal.
   *
   * @param name Required. Name of the category. Use the following structure in your request: `organizations/{org}/sites/{site}/apicategories/{apicategory}`
   */
  async organizationsSitesApicategoriesDelete(name: string): Promise<GoogleCloudApigeeV1ApiResponseWrapper> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleCloudApigeeV1ApiResponseWrapper;
  }

  /**
   * Gets a category on the portal.
   *
   * @param name Required. Name of the category. Use the following structure in your request: `organizations/{org}/sites/{site}/apicategories/{apicategory}`
   */
  async organizationsSitesApicategoriesGet(name: string): Promise<GoogleCloudApigeeV1ApiCategory> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ApiCategory(data);
  }

  /**
   * Lists the categories on the portal.
   *
   * @param parent Required. Name of the portal. Use the following structure in your request: `organizations/{org}/sites/{site}`
   */
  async organizationsSitesApicategoriesList(parent: string): Promise<GoogleCloudApigeeV1ListApiCategoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apicategories`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudApigeeV1ListApiCategoriesResponse(data);
  }

  /**
   * Updates a category on the portal.
   *
   * @param name Required. Name of the category. Use the following structure in your request: `organizations/{org}/sites/{site}/apicategories/{apicategory}`
   */
  async organizationsSitesApicategoriesPatch(name: string, req: GoogleCloudApigeeV1ApiCategoryData): Promise<GoogleCloudApigeeV1ApiCategory> {
    req = serializeGoogleCloudApigeeV1ApiCategoryData(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudApigeeV1ApiCategory(data);
  }

  /**
   * Updates the properties for an Apigee organization. No other fields in the
   * organization profile will be updated.
   *
   * @param name Required. Apigee organization name in the following format: `organizations/{org}`
   */
  async organizationsUpdate(name: string, req: GoogleCloudApigeeV1Organization): Promise<GoogleCloudApigeeV1Organization> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudApigeeV1Organization;
  }

  /**
   * Provisions a new Apigee organization with a functioning runtime. This is
   * the standard way to create trial organizations for a free Apigee trial.
   *
   * @param project Required. Name of the GCP project with which to associate the Apigee organization.
   */
  async projectsProvisionOrganization(project: string, req: GoogleCloudApigeeV1ProvisionOrganizationRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ project }:provisionOrganization`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }
}

/**
 * Describes why a bundle is invalid. Intended for use in error details.
 */
export interface EdgeConfigstoreBundleBadBundle {
  /**
   * Describes all precondition violations.
   */
  violations?: EdgeConfigstoreBundleBadBundleViolation[];
}

/**
 * A message type used to describe a single bundle validation error.
 */
export interface EdgeConfigstoreBundleBadBundleViolation {
  /**
   * A description of why the bundle is invalid and how to fix it.
   */
  description?: string;
  /**
   * The filename (including relative path from the bundle root) in which the
   * error occurred.
   */
  filename?: string;
}

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or an
 * HTML page. This message can be used both in streaming and non-streaming API
 * methods in the request as well as the response. It can be used as a top-level
 * request field, which is convenient if one wants to extract parameters from
 * either the URL or HTTP template into the request fields and also want access
 * to the raw HTTP body. Example: message GetResourceRequest { // A unique
 * request id. string request_id = 1; // The raw HTTP body is bound to this
 * field. google.api.HttpBody http_body = 2; } service ResourceService { rpc
 * GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc
 * UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); }
 * Example with streaming methods: service CaldavService { rpc
 * GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody);
 * rpc UpdateCalendar(stream google.api.HttpBody) returns (stream
 * google.api.HttpBody); } Use of this type only changes how the request and
 * response bodies are handled, all other features will continue to work
 * unchanged.
 */
export interface GoogleApiHttpBody {
  /**
   * The HTTP Content-Type header value specifying the content type of the
   * body.
   */
  contentType?: string;
  /**
   * The HTTP request/response body as raw binary.
   */
  data?: Uint8Array;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   */
  extensions?: {
    [key: string]: any
  }[];
}

function serializeGoogleApiHttpBody(data: any): GoogleApiHttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleApiHttpBody(data: any): GoogleApiHttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

export interface GoogleCloudApigeeV1Access {
  Get?: GoogleCloudApigeeV1AccessGet;
  Remove?: GoogleCloudApigeeV1AccessRemove;
  Set?: GoogleCloudApigeeV1AccessSet;
}

/**
 * Get action. For example, "Get" : { "name" : "target.name", "value" :
 * "default" }
 */
export interface GoogleCloudApigeeV1AccessGet {
  name?: string;
  value?: string;
}

/**
 * Remove action. For example, "Remove" : { "name" : "target.name", "success" :
 * true }
 */
export interface GoogleCloudApigeeV1AccessRemove {
  name?: string;
  success?: boolean;
}

/**
 * Set action. For example, "Set" : { "name" : "target.name", "success" : true,
 * "value" : "default" }
 */
export interface GoogleCloudApigeeV1AccessSet {
  name?: string;
  success?: boolean;
  value?: string;
}

/**
 * Request for ActivateNatAddressRequest. Activate the nat address request.
 */
export interface GoogleCloudApigeeV1ActivateNatAddressRequest {
}

/**
 * Add-on configurations for the Apigee organization.
 */
export interface GoogleCloudApigeeV1AddonsConfig {
  /**
   * Configuration for the Advanced API Ops add-on.
   */
  advancedApiOpsConfig?: GoogleCloudApigeeV1AdvancedApiOpsConfig;
  /**
   * Configuration for the API Security add-on.
   */
  apiSecurityConfig?: GoogleCloudApigeeV1ApiSecurityConfig;
  /**
   * Configuration for the Connectors Platform add-on.
   */
  connectorsPlatformConfig?: GoogleCloudApigeeV1ConnectorsPlatformConfig;
  /**
   * Configuration for the Integration add-on.
   */
  integrationConfig?: GoogleCloudApigeeV1IntegrationConfig;
  /**
   * Configuration for the Monetization add-on.
   */
  monetizationConfig?: GoogleCloudApigeeV1MonetizationConfig;
}

/**
 * Request for AdjustDeveloperBalance.
 */
export interface GoogleCloudApigeeV1AdjustDeveloperBalanceRequest {
  /**
   * * A positive value of `adjustment` means that that the API provider wants
   * to adjust the balance for an under-charged developer i.e. the balance of
   * the developer will decrease. * A negative value of `adjustment` means that
   * that the API provider wants to adjust the balance for an over-charged
   * developer i.e. the balance of the developer will increase.
   */
  adjustment?: GoogleTypeMoney;
}

function serializeGoogleCloudApigeeV1AdjustDeveloperBalanceRequest(data: any): GoogleCloudApigeeV1AdjustDeveloperBalanceRequest {
  return {
    ...data,
    adjustment: data["adjustment"] !== undefined ? serializeGoogleTypeMoney(data["adjustment"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1AdjustDeveloperBalanceRequest(data: any): GoogleCloudApigeeV1AdjustDeveloperBalanceRequest {
  return {
    ...data,
    adjustment: data["adjustment"] !== undefined ? deserializeGoogleTypeMoney(data["adjustment"]) : undefined,
  };
}

/**
 * Configuration for the Advanced API Ops add-on.
 */
export interface GoogleCloudApigeeV1AdvancedApiOpsConfig {
  /**
   * Flag that specifies whether the Advanced API Ops add-on is enabled.
   */
  enabled?: boolean;
}

/**
 * Reference to a certificate or key/certificate pair.
 */
export interface GoogleCloudApigeeV1Alias {
  /**
   * Resource ID for this alias. Values must match the regular expression
   * `[^/]{1,255}`.
   */
  alias?: string;
  /**
   * Chain of certificates under this alias.
   */
  certsInfo?: GoogleCloudApigeeV1Certificate;
  /**
   * Type of alias.
   */
  type?:  | "ALIAS_TYPE_UNSPECIFIED" | "CERT" | "KEY_CERT";
}

function serializeGoogleCloudApigeeV1Alias(data: any): GoogleCloudApigeeV1Alias {
  return {
    ...data,
    certsInfo: data["certsInfo"] !== undefined ? serializeGoogleCloudApigeeV1Certificate(data["certsInfo"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Alias(data: any): GoogleCloudApigeeV1Alias {
  return {
    ...data,
    certsInfo: data["certsInfo"] !== undefined ? deserializeGoogleCloudApigeeV1Certificate(data["certsInfo"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1AliasRevisionConfig {
  /**
   * Location of the alias file. For example, a Google Cloud Storage URI.
   */
  location?: string;
  /**
   * Name of the alias revision included in the keystore in the following
   * format:
   * `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}/revisions/{rev}`
   */
  name?: string;
  type?:  | "ALIAS_TYPE_UNSPECIFIED" | "CERT" | "KEY_CERT";
}

/**
 * the Api category resource wrapped with response status, error_code etc.
 */
export interface GoogleCloudApigeeV1ApiCategory {
  /**
   * Details of category.
   */
  data?: GoogleCloudApigeeV1ApiCategoryData;
  /**
   * ID that can be used to find errors in the log files.
   */
  errorCode?: string;
  /**
   * Description of the operation.
   */
  message?: string;
  /**
   * ID that can be used to find request details in the log files.
   */
  requestId?: string;
  /**
   * Status of the operation.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1ApiCategory(data: any): GoogleCloudApigeeV1ApiCategory {
  return {
    ...data,
    data: data["data"] !== undefined ? serializeGoogleCloudApigeeV1ApiCategoryData(data["data"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ApiCategory(data: any): GoogleCloudApigeeV1ApiCategory {
  return {
    ...data,
    data: data["data"] !== undefined ? deserializeGoogleCloudApigeeV1ApiCategoryData(data["data"]) : undefined,
  };
}

/**
 * the Api category resource.
 */
export interface GoogleCloudApigeeV1ApiCategoryData {
  /**
   * ID of the category (a UUID).
   */
  id?: string;
  /**
   * Name of the category.
   */
  name?: string;
  /**
   * Name of the portal.
   */
  siteId?: string;
  /**
   * Time the category was last modified in milliseconds since epoch.
   */
  updateTime?: bigint;
}

function serializeGoogleCloudApigeeV1ApiCategoryData(data: any): GoogleCloudApigeeV1ApiCategoryData {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? String(data["updateTime"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ApiCategoryData(data: any): GoogleCloudApigeeV1ApiCategoryData {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? BigInt(data["updateTime"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1ApiProduct {
  /**
   * Comma-separated list of API resources to be bundled in the API product. By
   * default, the resource paths are mapped from the `proxy.pathsuffix`
   * variable. The proxy path suffix is defined as the URI fragment following
   * the ProxyEndpoint base path. For example, if the `apiResources` element is
   * defined to be `/forecastrss` and the base path defined for the API proxy is
   * `/weather`, then only requests to `/weather/forecastrss` are permitted by
   * the API product. You can select a specific path, or you can select all
   * subpaths with the following wildcard: - `/**`: Indicates that all sub-URIs
   * are included. - `/*` : Indicates that only URIs one level down are
   * included. By default, / supports the same resources as /** as well as the
   * base path defined by the API proxy. For example, if the base path of the
   * API proxy is `/v1/weatherapikey`, then the API product supports requests to
   * `/v1/weatherapikey` and to any sub-URIs, such as
   * `/v1/weatherapikey/forecastrss`, `/v1/weatherapikey/region/CA`, and so on.
   * For more information, see Managing API products.
   */
  apiResources?: string[];
  /**
   * Flag that specifies how API keys are approved to access the APIs defined
   * by the API product. If set to `manual`, the consumer key is generated and
   * returned in "pending" state. In this case, the API keys won't work until
   * they have been explicitly approved. If set to `auto`, the consumer key is
   * generated and returned in "approved" state and can be used immediately.
   * **Note:** Typically, `auto` is used to provide access to free or trial API
   * products that provide limited quota or capabilities.
   */
  approvalType?: string;
  /**
   * Array of attributes that may be used to extend the default API product
   * profile with customer-specific metadata. You can specify a maximum of 18
   * attributes. Use this property to specify the access level of the API
   * product as either `public`, `private`, or `internal`. Only products marked
   * `public` are available to developers in the Apigee developer portal. For
   * example, you can set a product to `internal` while it is in development and
   * then change access to `public` when it is ready to release on the portal.
   * API products marked as `private` do not appear on the portal, but can be
   * accessed by external developers.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Response only. Creation time of this environment as milliseconds since
   * epoch.
   */
  createdAt?: bigint;
  /**
   * Description of the API product. Include key information about the API
   * product that is not captured by other fields.
   */
  description?: string;
  /**
   * Name displayed in the UI or developer portal to developers registering for
   * API access.
   */
  displayName?: string;
  /**
   * Comma-separated list of environment names to which the API product is
   * bound. Requests to environments that are not listed are rejected. By
   * specifying one or more environments, you can bind the resources listed in
   * the API product to a specific environment, preventing developers from
   * accessing those resources through API proxies deployed in another
   * environment. This setting is used, for example, to prevent resources
   * associated with API proxies in `prod` from being accessed by API proxies
   * deployed in `test`.
   */
  environments?: string[];
  /**
   * Configuration used to group Apigee proxies or remote services with graphQL
   * operation name, graphQL operation type and quotas. This grouping allows us
   * to precisely set quota for a particular combination of graphQL name and
   * operation type for a particular proxy request. If graphQL name is not set,
   * this would imply quota will be applied on all graphQL requests matching the
   * operation type.
   */
  graphqlOperationGroup?: GoogleCloudApigeeV1GraphQLOperationGroup;
  /**
   * Response only. Modified time of this environment as milliseconds since
   * epoch.
   */
  lastModifiedAt?: bigint;
  /**
   * Internal name of the API product. Characters you can use in the name are
   * restricted to: `A-Z0-9._\-$ %`. **Note:** The internal name cannot be
   * edited when updating the API product.
   */
  name?: string;
  /**
   * Configuration used to group Apigee proxies or remote services with
   * resources, method types, and quotas. The resource refers to the resource
   * URI (excluding the base path). With this grouping, the API product creator
   * is able to fine-tune and give precise control over which REST methods have
   * access to specific resources and how many calls can be made (using the
   * `quota` setting). **Note:** The `api_resources` setting cannot be specified
   * for both the API product and operation group; otherwise the call will fail.
   */
  operationGroup?: GoogleCloudApigeeV1OperationGroup;
  /**
   * Comma-separated list of API proxy names to which this API product is
   * bound. By specifying API proxies, you can associate resources in the API
   * product with specific API proxies, preventing developers from accessing
   * those resources through other API proxies. Apigee rejects requests to API
   * proxies that are not listed. **Note:** The API proxy names must already
   * exist in the specified environment as they will be validated upon creation.
   */
  proxies?: string[];
  /**
   * Number of request messages permitted per app by this API product for the
   * specified `quotaInterval` and `quotaTimeUnit`. For example, a `quota` of
   * 50, for a `quotaInterval` of 12 and a `quotaTimeUnit` of hours means 50
   * requests are allowed every 12 hours.
   */
  quota?: string;
  /**
   * Scope of the quota decides how the quota counter gets applied and evaluate
   * for quota violation. If the Scope is set as PROXY, then all the operations
   * defined for the APIproduct that are associated with the same proxy will
   * share the same quota counter set at the APIproduct level, making it a
   * global counter at a proxy level. If the Scope is set as OPERATION, then
   * each operations get the counter set at the API product dedicated, making it
   * a local counter. Note that, the QuotaCounterScope applies only when an
   * operation does not have dedicated quota set for itself.
   */
  quotaCounterScope?:  | "QUOTA_COUNTER_SCOPE_UNSPECIFIED" | "PROXY" | "OPERATION";
  /**
   * Time interval over which the number of request messages is calculated.
   */
  quotaInterval?: string;
  /**
   * Time unit defined for the `quotaInterval`. Valid values include `minute`,
   * `hour`, `day`, or `month`.
   */
  quotaTimeUnit?: string;
  /**
   * Comma-separated list of OAuth scopes that are validated at runtime. Apigee
   * validates that the scopes in any access token presented match the scopes
   * defined in the OAuth policy associated with the API product.
   */
  scopes?: string[];
}

function serializeGoogleCloudApigeeV1ApiProduct(data: any): GoogleCloudApigeeV1ApiProduct {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? String(data["lastModifiedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ApiProduct(data: any): GoogleCloudApigeeV1ApiProduct {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1ApiProductRef {
  /**
   * Name of the API product.
   */
  apiproduct?: string;
  /**
   * Status of the API product. Valid values are `approved` or `revoked`.
   */
  status?: string;
}

/**
 * Metadata describing the API proxy
 */
export interface GoogleCloudApigeeV1ApiProxy {
  /**
   * Output only. The type of the API proxy.
   */
  readonly apiProxyType?:  | "API_PROXY_TYPE_UNSPECIFIED" | "PROGRAMMABLE" | "CONFIGURABLE";
  /**
   * User labels applied to this API Proxy.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The id of the most recently created revision for this api
   * proxy.
   */
  readonly latestRevisionId?: string;
  /**
   * Output only. Metadata describing the API proxy.
   */
  readonly metaData?: GoogleCloudApigeeV1EntityMetadata;
  /**
   * Output only. Name of the API proxy.
   */
  readonly name?: string;
  /**
   * Output only. Whether this proxy is read-only. A read-only proxy cannot
   * have new revisions created through calls to CreateApiProxyRevision. A proxy
   * is read-only if it was generated by an archive.
   */
  readonly readOnly?: boolean;
  /**
   * Output only. List of revisions defined for the API proxy.
   */
  readonly revision?: string[];
}

/**
 * API proxy revision.
 */
export interface GoogleCloudApigeeV1ApiProxyRevision {
  /**
   * Output only. The archive that generated this proxy revision. This field is
   * only present on proxy revisions that were generated by an archive. Proxies
   * generated by archives cannot be updated, deleted, or deployed to other
   * environments. Format:
   * `organizations/*\/environments/*\/archiveDeployments/*`
   */
  readonly archive?: string;
  /**
   * Base URL of the API proxy.
   */
  basepaths?: string[];
  /**
   * Version of the API proxy configuration schema to which the API proxy
   * conforms. Currently, the only supported value is 4.0
   * (`majorVersion.minorVersion`). This setting may be used in the future to
   * track the evolution of the API proxy format.
   */
  configurationVersion?: GoogleCloudApigeeV1ConfigVersion;
  /**
   * Revision number, app name, and organization for the API proxy.
   */
  contextInfo?: string;
  /**
   * Time that the API proxy revision was created in milliseconds since epoch.
   */
  createdAt?: bigint;
  /**
   * Description of the API proxy revision.
   */
  description?: string;
  /**
   * Human-readable name of the API proxy.
   */
  displayName?: string;
  /**
   * Metadata describing the API proxy revision as a key-value map.
   */
  entityMetaDataAsProperties?: {
    [key: string]: string
  };
  /**
   * List of IntegrationEndpoints in the '/integration-endpoints' directory of
   * the API proxy. This is a 'manifest' setting designed to provide visibility
   * into the contents of the API proxy.
   */
  integrationEndpoints?: string[];
  /**
   * Time that the API proxy revision was last modified in milliseconds since
   * epoch.
   */
  lastModifiedAt?: bigint;
  /**
   * Name of the API proxy.
   */
  name?: string;
  /**
   * List of policy names included in the API proxy revision..
   */
  policies?: string[];
  /**
   * List of proxy names included in the API proxy revision.
   */
  proxies?: string[];
  /**
   * List of ProxyEndpoints in the `/proxies` directory of the API proxy.
   * Typically, this element is included only when the API proxy was created
   * using the Edge UI. This is a 'manifest' setting designed to provide
   * visibility into the contents of the API proxy.
   */
  proxyEndpoints?: string[];
  /**
   * List of resource files included in the API proxy revision.
   */
  resourceFiles?: GoogleCloudApigeeV1ResourceFiles;
  /**
   * List of the resources included in the API proxy revision formatted as
   * "{type}://{name}".
   */
  resources?: string[];
  /**
   * API proxy revision.
   */
  revision?: string;
  /**
   * List of the shared flows included in the API proxy revision.
   */
  sharedFlows?: string[];
  /**
   * OpenAPI Specification that is associated with the API proxy. The value is
   * set to a URL or to a path in the specification store.
   */
  spec?: string;
  /**
   * List of TargetEndpoints in the `/targets` directory of the API proxy.
   * Typically, this element is included only when the API proxy was created
   * using the Edge UI. This is a 'manifest' setting designed to provide
   * visibility into the contents of the API proxy.
   */
  targetEndpoints?: string[];
  /**
   * List of the targets included in the API proxy revision.
   */
  targets?: string[];
  /**
   * List of TargetServers referenced in any TargetEndpoint in the API proxy.
   * Typically, you will see this element only when the API proxy was created
   * using the Edge UI. This is a 'manifest' setting designed to provide
   * visibility into the contents of the API proxy.
   */
  targetServers?: string[];
  /**
   * List of the teams included in the API proxy revision.
   */
  teams?: string[];
  /**
   * Type. Set to `Application`. Maintained for compatibility with the Apigee
   * Edge API.
   */
  type?: string;
}

function serializeGoogleCloudApigeeV1ApiProxyRevision(data: any): GoogleCloudApigeeV1ApiProxyRevision {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? String(data["lastModifiedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ApiProxyRevision(data: any): GoogleCloudApigeeV1ApiProxyRevision {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1ApiResponseWrapper {
  /**
   * ID that can be used to find errors in the log files.
   */
  errorCode?: string;
  /**
   * Description of the operation.
   */
  message?: string;
  /**
   * ID that can be used to find request details in the log files.
   */
  requestId?: string;
  /**
   * Status of the operation.
   */
  status?: string;
}

/**
 * Configurations of the API Security add-on.
 */
export interface GoogleCloudApigeeV1ApiSecurityConfig {
  /**
   * Flag that specifies whether the API security add-on is enabled.
   */
  enabled?: boolean;
  /**
   * Output only. Time at which the API Security add-on expires in in
   * milliseconds since epoch. If unspecified, the add-on will never expire.
   */
  readonly expiresAt?: bigint;
}

/**
 * Response for
 * GetApiSecurityRuntimeConfig[EnvironmentService.GetApiSecurityRuntimeConfig].
 */
export interface GoogleCloudApigeeV1ApiSecurityRuntimeConfig {
  /**
   * A list of up to 5 Cloud Storage Blobs that contain SecurityActions.
   */
  location?: string[];
  /**
   * Name of the environment API Security Runtime configuration resource.
   * Format: `organizations/{org}/environments/{env}/apiSecurityRuntimeConfig`
   */
  name?: string;
  /**
   * Revision ID of the API Security Runtime configuration. The higher the
   * value, the more recently the configuration was deployed.
   */
  revisionId?: bigint;
  /**
   * Unique ID for the API Security Runtime configuration. The ID will only
   * change if the environment is deleted and recreated.
   */
  uid?: string;
  /**
   * Time that the API Security Runtime configuration was updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudApigeeV1ApiSecurityRuntimeConfig(data: any): GoogleCloudApigeeV1ApiSecurityRuntimeConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? String(data["revisionId"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ApiSecurityRuntimeConfig(data: any): GoogleCloudApigeeV1ApiSecurityRuntimeConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? BigInt(data["revisionId"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1App {
  /**
   * List of API products associated with the app.
   */
  apiProducts?: GoogleCloudApigeeV1ApiProductRef[];
  /**
   * ID of the app.
   */
  appId?: string;
  /**
   * List of attributes.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Callback URL used by OAuth 2.0 authorization servers to communicate
   * authorization codes back to apps.
   */
  callbackUrl?: string;
  /**
   * Name of the company that owns the app.
   */
  companyName?: string;
  /**
   * Output only. Unix time when the app was created.
   */
  readonly createdAt?: bigint;
  /**
   * Output only. Set of credentials for the app. Credentials are API
   * key/secret pairs associated with API products.
   */
  readonly credentials?: GoogleCloudApigeeV1Credential[];
  /**
   * ID of the developer.
   */
  developerId?: string;
  /**
   * Duration, in milliseconds, of the consumer key that will be generated for
   * the app. The default value, -1, indicates an infinite validity period. Once
   * set, the expiration can't be updated. json key: keyExpiresIn
   */
  keyExpiresIn?: bigint;
  /**
   * Output only. Last modified time as milliseconds since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Name of the app.
   */
  name?: string;
  /**
   * Scopes to apply to the app. The specified scope names must already exist
   * on the API product that you associate with the app.
   */
  scopes?: string[];
  /**
   * Status of the credential.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1App(data: any): GoogleCloudApigeeV1App {
  return {
    ...data,
    keyExpiresIn: data["keyExpiresIn"] !== undefined ? String(data["keyExpiresIn"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1App(data: any): GoogleCloudApigeeV1App {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (deserializeGoogleCloudApigeeV1Credential(item))) : undefined,
    keyExpiresIn: data["keyExpiresIn"] !== undefined ? BigInt(data["keyExpiresIn"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

/**
 * Archive Deployment information.
 */
export interface GoogleCloudApigeeV1ArchiveDeployment {
  /**
   * Output only. The time at which the Archive Deployment was created in
   * milliseconds since the epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Input only. The Google Cloud Storage signed URL returned from
   * GenerateUploadUrl and used to upload the Archive zip file.
   */
  gcsUri?: string;
  /**
   * User-supplied key-value pairs used to organize ArchiveDeployments. Label
   * keys must be between 1 and 63 characters long, have a UTF-8 encoding of
   * maximum 128 bytes, and must conform to the following PCRE regular
   * expression: \p{Ll}\p{Lo}{0,62} Label values must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a
   * given store.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Name of the Archive Deployment in the following format:
   * `organizations/{org}/environments/{env}/archiveDeployments/{id}`.
   */
  name?: string;
  /**
   * Output only. A reference to the LRO that created this Archive Deployment
   * in the following format: `organizations/{org}/operations/{id}`
   */
  readonly operation?: string;
  /**
   * Output only. The time at which the Archive Deployment was updated in
   * milliseconds since the epoch.
   */
  readonly updatedAt?: bigint;
}

export interface GoogleCloudApigeeV1AsyncQuery {
  /**
   * Creation time of the query.
   */
  created?: string;
  /**
   * Hostname is available only when query is executed at host level.
   */
  envgroupHostname?: string;
  /**
   * Error is set when query fails.
   */
  error?: string;
  /**
   * ExecutionTime is available only after the query is completed.
   */
  executionTime?: string;
  /**
   * Asynchronous Query Name.
   */
  name?: string;
  /**
   * Contains information like metrics, dimenstions etc of the AsyncQuery.
   */
  queryParams?: GoogleCloudApigeeV1QueryMetadata;
  /**
   * Asynchronous Report ID.
   */
  reportDefinitionId?: string;
  /**
   * Result is available only after the query is completed.
   */
  result?: GoogleCloudApigeeV1AsyncQueryResult;
  /**
   * ResultFileSize is available only after the query is completed.
   */
  resultFileSize?: string;
  /**
   * ResultRows is available only after the query is completed.
   */
  resultRows?: bigint;
  /**
   * Self link of the query. Example:
   * `/organizations/myorg/environments/myenv/queries/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd`
   * or following format if query is running at host level:
   * `/organizations/myorg/hostQueries/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd`
   */
  self?: string;
  /**
   * Query state could be "enqueued", "running", "completed", "failed".
   */
  state?: string;
  /**
   * Last updated timestamp for the query.
   */
  updated?: string;
}

function serializeGoogleCloudApigeeV1AsyncQuery(data: any): GoogleCloudApigeeV1AsyncQuery {
  return {
    ...data,
    resultRows: data["resultRows"] !== undefined ? String(data["resultRows"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1AsyncQuery(data: any): GoogleCloudApigeeV1AsyncQuery {
  return {
    ...data,
    resultRows: data["resultRows"] !== undefined ? BigInt(data["resultRows"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1AsyncQueryResult {
  /**
   * Query result will be unaccessable after this time.
   */
  expires?: string;
  /**
   * Self link of the query results. Example:
   * `/organizations/myorg/environments/myenv/queries/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd/result`
   * or following format if query is running at host level:
   * `/organizations/myorg/hostQueries/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd/result`
   */
  self?: string;
}

export interface GoogleCloudApigeeV1AsyncQueryResultView {
  /**
   * Error code when there is a failure.
   */
  code?: number;
  /**
   * Error message when there is a failure.
   */
  error?: string;
  /**
   * Metadata contains information like metrics, dimenstions etc of the
   * AsyncQuery.
   */
  metadata?: GoogleCloudApigeeV1QueryMetadata;
  /**
   * Rows of query result. Each row is a JSON object. Example:
   * {sum(message_count): 1, developer_app: "(not set)",…}
   */
  rows?: any[];
  /**
   * State of retrieving ResultView.
   */
  state?: string;
}

/**
 * Key-value pair to store extra metadata.
 */
export interface GoogleCloudApigeeV1Attribute {
  /**
   * API key of the attribute.
   */
  name?: string;
  /**
   * Value of the attribute.
   */
  value?: string;
}

export interface GoogleCloudApigeeV1Attributes {
  /**
   * List of attributes.
   */
  attribute?: GoogleCloudApigeeV1Attribute[];
}

/**
 * CanaryEvaluation represents the canary analysis between two versions of the
 * runtime that is serving requests.
 */
export interface GoogleCloudApigeeV1CanaryEvaluation {
  /**
   * Required. The stable version that is serving requests.
   */
  control?: string;
  /**
   * Output only. Create time of the canary evaluation.
   */
  readonly createTime?: Date;
  /**
   * Required. End time for the evaluation's analysis.
   */
  endTime?: Date;
  /**
   * Required. Labels used to filter the metrics used for a canary evaluation.
   */
  metricLabels?: GoogleCloudApigeeV1CanaryEvaluationMetricLabels;
  /**
   * Output only. Name of the canary evalution.
   */
  readonly name?: string;
  /**
   * Required. Start time for the canary evaluation's analysis.
   */
  startTime?: Date;
  /**
   * Output only. The current state of the canary evaluation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED";
  /**
   * Required. The newer version that is serving requests.
   */
  treatment?: string;
  /**
   * Output only. The resulting verdict of the canary evaluations: NONE, PASS,
   * or FAIL.
   */
  readonly verdict?:  | "VERDICT_UNSPECIFIED" | "NONE" | "FAIL" | "PASS";
}

function serializeGoogleCloudApigeeV1CanaryEvaluation(data: any): GoogleCloudApigeeV1CanaryEvaluation {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1CanaryEvaluation(data: any): GoogleCloudApigeeV1CanaryEvaluation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Labels that can be used to filter Apigee metrics.
 */
export interface GoogleCloudApigeeV1CanaryEvaluationMetricLabels {
  /**
   * The environment ID associated with the metrics.
   */
  env?: string;
  /**
   * Required. The instance ID associated with the metrics. In Apigee Hybrid,
   * the value is configured during installation.
   */
  instance_id?: string;
  /**
   * Required. The location associated with the metrics.
   */
  location?: string;
}

export interface GoogleCloudApigeeV1Certificate {
  /**
   * Chain of certificates under this name.
   */
  certInfo?: GoogleCloudApigeeV1CertInfo[];
}

function serializeGoogleCloudApigeeV1Certificate(data: any): GoogleCloudApigeeV1Certificate {
  return {
    ...data,
    certInfo: data["certInfo"] !== undefined ? data["certInfo"].map((item: any) => (serializeGoogleCloudApigeeV1CertInfo(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Certificate(data: any): GoogleCloudApigeeV1Certificate {
  return {
    ...data,
    certInfo: data["certInfo"] !== undefined ? data["certInfo"].map((item: any) => (deserializeGoogleCloudApigeeV1CertInfo(item))) : undefined,
  };
}

/**
 * X.509 certificate as defined in RFC 5280.
 */
export interface GoogleCloudApigeeV1CertInfo {
  /**
   * X.509 basic constraints extension.
   */
  basicConstraints?: string;
  /**
   * X.509 `notAfter` validity period in milliseconds since epoch.
   */
  expiryDate?: bigint;
  /**
   * X.509 issuer.
   */
  issuer?: string;
  /**
   * Flag that specifies whether the certificate is valid. Flag is set to `Yes`
   * if the certificate is valid, `No` if expired, or `Not yet` if not yet
   * valid.
   */
  isValid?: string;
  /**
   * Public key component of the X.509 subject public key info.
   */
  publicKey?: string;
  /**
   * X.509 serial number.
   */
  serialNumber?: string;
  /**
   * X.509 signatureAlgorithm.
   */
  sigAlgName?: string;
  /**
   * X.509 subject.
   */
  subject?: string;
  /**
   * X.509 subject alternative names (SANs) extension.
   */
  subjectAlternativeNames?: string[];
  /**
   * X.509 `notBefore` validity period in milliseconds since epoch.
   */
  validFrom?: bigint;
  /**
   * X.509 version.
   */
  version?: number;
}

function serializeGoogleCloudApigeeV1CertInfo(data: any): GoogleCloudApigeeV1CertInfo {
  return {
    ...data,
    expiryDate: data["expiryDate"] !== undefined ? String(data["expiryDate"]) : undefined,
    validFrom: data["validFrom"] !== undefined ? String(data["validFrom"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1CertInfo(data: any): GoogleCloudApigeeV1CertInfo {
  return {
    ...data,
    expiryDate: data["expiryDate"] !== undefined ? BigInt(data["expiryDate"]) : undefined,
    validFrom: data["validFrom"] !== undefined ? BigInt(data["validFrom"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1CommonNameConfig {
  matchWildCards?: boolean;
  name?: string;
}

/**
 * Request for ComputeEnvironmentScores.
 */
export interface GoogleCloudApigeeV1ComputeEnvironmentScoresRequest {
  /**
   * Optional. Filters are used to filter scored components. Return all the
   * components if no filter is mentioned. Example: [{ "scorePath":
   * "/org@myorg/envgroup@myenvgroup/env@myenv/proxies/proxy@myproxy/source" },
   * { "scorePath":
   * "/org@myorg/envgroup@myenvgroup/env@myenv/proxies/proxy@myproxy/target", }]
   * This will return components with path:
   * "/org@myorg/envgroup@myenvgroup/env@myenv/proxies/proxy@myproxy/source" OR
   * "/org@myorg/envgroup@myenvgroup/env@myenv/proxies/proxy@myproxy/target"
   */
  filters?: GoogleCloudApigeeV1ComputeEnvironmentScoresRequestFilter[];
  /**
   * Optional. The maximum number of subcomponents to be returned in a single
   * page. The service may return fewer than this value. If unspecified, at most
   * 100 subcomponents will be returned in a single page.
   */
  pageSize?: number;
  /**
   * Optional. A token that can be sent as `page_token` to retrieve the next
   * page. If this field is omitted, there are no subsequent pages.
   */
  pageToken?: string;
  /**
   * Required. Time range for score calculation. At most 14 days of scores will
   * be returned.
   */
  timeRange?: GoogleTypeInterval;
}

function serializeGoogleCloudApigeeV1ComputeEnvironmentScoresRequest(data: any): GoogleCloudApigeeV1ComputeEnvironmentScoresRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? serializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ComputeEnvironmentScoresRequest(data: any): GoogleCloudApigeeV1ComputeEnvironmentScoresRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? deserializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

/**
 * Filter scores by component path. Used custom filter instead of AIP-160 as
 * the use cases are highly constrained and predictable.
 */
export interface GoogleCloudApigeeV1ComputeEnvironmentScoresRequestFilter {
  /**
   * Optional. Return scores for this component. Example:
   * "/org@myorg/envgroup@myenvgroup/env@myenv/proxies/proxy@myproxy/source"
   */
  scorePath?: string;
}

/**
 * Response for ComputeEnvironmentScores.
 */
export interface GoogleCloudApigeeV1ComputeEnvironmentScoresResponse {
  /**
   * A page token, received from a previous `ComputeScore` call. Provide this
   * to retrieve the subsequent page.
   */
  nextPageToken?: string;
  /**
   * List of scores. One score per day.
   */
  scores?: GoogleCloudApigeeV1Score[];
}

function serializeGoogleCloudApigeeV1ComputeEnvironmentScoresResponse(data: any): GoogleCloudApigeeV1ComputeEnvironmentScoresResponse {
  return {
    ...data,
    scores: data["scores"] !== undefined ? data["scores"].map((item: any) => (serializeGoogleCloudApigeeV1Score(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ComputeEnvironmentScoresResponse(data: any): GoogleCloudApigeeV1ComputeEnvironmentScoresResponse {
  return {
    ...data,
    scores: data["scores"] !== undefined ? data["scores"].map((item: any) => (deserializeGoogleCloudApigeeV1Score(item))) : undefined,
  };
}

/**
 * Version of the API proxy configuration schema. Currently, only 4.0 is
 * supported.
 */
export interface GoogleCloudApigeeV1ConfigVersion {
  /**
   * Major version of the API proxy configuration schema.
   */
  majorVersion?: number;
  /**
   * Minor version of the API proxy configuration schema.
   */
  minorVersion?: number;
}

/**
 * Configuration for the Connectors Platform add-on.
 */
export interface GoogleCloudApigeeV1ConnectorsPlatformConfig {
  /**
   * Flag that specifies whether the Connectors Platform add-on is enabled.
   */
  enabled?: boolean;
  /**
   * Output only. Time at which the Connectors Platform add-on expires in
   * milliseconds since epoch. If unspecified, the add-on will never expire.
   */
  readonly expiresAt?: bigint;
}

export interface GoogleCloudApigeeV1Credential {
  /**
   * List of API products this credential can be used for.
   */
  apiProducts?: GoogleCloudApigeeV1ApiProductRef[];
  /**
   * List of attributes associated with this credential.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Consumer key.
   */
  consumerKey?: string;
  /**
   * Secret key.
   */
  consumerSecret?: string;
  /**
   * Time the credential will expire in milliseconds since epoch.
   */
  expiresAt?: bigint;
  /**
   * Time the credential was issued in milliseconds since epoch.
   */
  issuedAt?: bigint;
  /**
   * List of scopes to apply to the app. Specified scopes must already exist on
   * the API product that you associate with the app.
   */
  scopes?: string[];
  /**
   * Status of the credential. Valid values include `approved` or `revoked`.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1Credential(data: any): GoogleCloudApigeeV1Credential {
  return {
    ...data,
    expiresAt: data["expiresAt"] !== undefined ? String(data["expiresAt"]) : undefined,
    issuedAt: data["issuedAt"] !== undefined ? String(data["issuedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Credential(data: any): GoogleCloudApigeeV1Credential {
  return {
    ...data,
    expiresAt: data["expiresAt"] !== undefined ? BigInt(data["expiresAt"]) : undefined,
    issuedAt: data["issuedAt"] !== undefined ? BigInt(data["issuedAt"]) : undefined,
  };
}

/**
 * Request for CreditDeveloperBalance.
 */
export interface GoogleCloudApigeeV1CreditDeveloperBalanceRequest {
  /**
   * The amount of money to be credited. The wallet corresponding to the
   * currency specified within `transaction_amount` will be updated. For
   * example, if you specified `currency_code` within `transaction_amount` as
   * "USD", then the amount would be added to the wallet which has the "USD"
   * currency or if no such wallet exists, a new wallet will be created with the
   * "USD" currency.
   */
  transactionAmount?: GoogleTypeMoney;
  /**
   * Each transaction_id uniquely identifies a credit balance request. If
   * multiple requests are received with the same transaction_id, only one of
   * them will be considered.
   */
  transactionId?: string;
}

function serializeGoogleCloudApigeeV1CreditDeveloperBalanceRequest(data: any): GoogleCloudApigeeV1CreditDeveloperBalanceRequest {
  return {
    ...data,
    transactionAmount: data["transactionAmount"] !== undefined ? serializeGoogleTypeMoney(data["transactionAmount"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1CreditDeveloperBalanceRequest(data: any): GoogleCloudApigeeV1CreditDeveloperBalanceRequest {
  return {
    ...data,
    transactionAmount: data["transactionAmount"] !== undefined ? deserializeGoogleTypeMoney(data["transactionAmount"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1CustomReport {
  /**
   * This field contains the chart type for the report
   */
  chartType?: string;
  /**
   * Legacy field: not used. This field contains a list of comments associated
   * with custom report
   */
  comments?: string[];
  /**
   * Output only. Unix time when the app was created json key: createdAt
   */
  readonly createdAt?: bigint;
  /**
   * This contains the list of dimensions for the report
   */
  dimensions?: string[];
  /**
   * This is the display name for the report
   */
  displayName?: string;
  /**
   * Output only. Environment name
   */
  readonly environment?: string;
  /**
   * This field contains the filter expression
   */
  filter?: string;
  /**
   * Legacy field: not used. Contains the from time for the report
   */
  fromTime?: string;
  /**
   * Output only. Modified time of this entity as milliseconds since epoch.
   * json key: lastModifiedAt
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Output only. Last viewed time of this entity as milliseconds since epoch
   */
  readonly lastViewedAt?: bigint;
  /**
   * Legacy field: not used This field contains the limit for the result
   * retrieved
   */
  limit?: string;
  /**
   * Required. This contains the list of metrics
   */
  metrics?: GoogleCloudApigeeV1CustomReportMetric[];
  /**
   * Required. Unique identifier for the report T his is a legacy field used to
   * encode custom report unique id
   */
  name?: string;
  /**
   * Legacy field: not used. This field contains the offset for the data
   */
  offset?: string;
  /**
   * Output only. Organization name
   */
  readonly organization?: string;
  /**
   * This field contains report properties such as ui metadata etc.
   */
  properties?: GoogleCloudApigeeV1ReportProperty[];
  /**
   * Legacy field: not used much. Contains the list of sort by columns
   */
  sortByCols?: string[];
  /**
   * Legacy field: not used much. Contains the sort order for the sort columns
   */
  sortOrder?: string;
  /**
   * Legacy field: not used. This field contains a list of tags associated with
   * custom report
   */
  tags?: string[];
  /**
   * This field contains the time unit of aggregation for the report
   */
  timeUnit?: string;
  /**
   * Legacy field: not used. This field contains the top k parameter value for
   * restricting the result
   */
  topk?: string;
  /**
   * Legacy field: not used. Contains the end time for the report
   */
  toTime?: string;
}

/**
 * This encapsulates a metric property of the form sum(message_count) where
 * name is message_count and function is sum
 */
export interface GoogleCloudApigeeV1CustomReportMetric {
  /**
   * aggregate function
   */
  function?: string;
  /**
   * name of the metric
   */
  name?: string;
}

/**
 * Data collector configuration.
 */
export interface GoogleCloudApigeeV1DataCollector {
  /**
   * Output only. The time at which the data collector was created in
   * milliseconds since the epoch.
   */
  readonly createdAt?: bigint;
  /**
   * A description of the data collector.
   */
  description?: string;
  /**
   * Output only. The time at which the Data Collector was last updated in
   * milliseconds since the epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * ID of the data collector. Must begin with `dc_`.
   */
  name?: string;
  /**
   * Immutable. The type of data this data collector will collect.
   */
  type?:  | "TYPE_UNSPECIFIED" | "INTEGER" | "FLOAT" | "STRING" | "BOOLEAN" | "DATETIME";
}

/**
 * Data collector and its configuration.
 */
export interface GoogleCloudApigeeV1DataCollectorConfig {
  /**
   * Name of the data collector in the following format:
   * `organizations/{org}/datacollectors/{datacollector}`
   */
  name?: string;
  /**
   * Data type accepted by the data collector.
   */
  type?:  | "TYPE_UNSPECIFIED" | "INTEGER" | "FLOAT" | "STRING" | "BOOLEAN" | "DATETIME";
}

/**
 * The data store defines the connection to export data repository (Cloud
 * Storage, BigQuery), including the credentials used to access the data
 * repository.
 */
export interface GoogleCloudApigeeV1Datastore {
  /**
   * Output only. Datastore create time, in milliseconds since the epoch of
   * 1970-01-01T00:00:00Z
   */
  readonly createTime?: bigint;
  /**
   * Datastore Configurations.
   */
  datastoreConfig?: GoogleCloudApigeeV1DatastoreConfig;
  /**
   * Required. Display name in UI
   */
  displayName?: string;
  /**
   * Output only. Datastore last update time, in milliseconds since the epoch
   * of 1970-01-01T00:00:00Z
   */
  readonly lastUpdateTime?: bigint;
  /**
   * Output only. Organization that the datastore belongs to
   */
  readonly org?: string;
  /**
   * Output only. Resource link of Datastore. Example:
   * `/organizations/{org}/analytics/datastores/{uuid}`
   */
  readonly self?: string;
  /**
   * Destination storage type. Supported types `gcs` or `bigquery`.
   */
  targetType?: string;
}

/**
 * Configuration detail for datastore
 */
export interface GoogleCloudApigeeV1DatastoreConfig {
  /**
   * Name of the Cloud Storage bucket. Required for `gcs` target_type.
   */
  bucketName?: string;
  /**
   * BigQuery dataset name Required for `bigquery` target_type.
   */
  datasetName?: string;
  /**
   * Path of Cloud Storage bucket Required for `gcs` target_type.
   */
  path?: string;
  /**
   * Required. GCP project in which the datastore exists
   */
  projectId?: string;
  /**
   * Prefix of BigQuery table Required for `bigquery` target_type.
   */
  tablePrefix?: string;
}

/**
 * Date range of the data to export.
 */
export interface GoogleCloudApigeeV1DateRange {
  /**
   * Required. End date (exclusive) of the data to export in the format
   * `yyyy-mm-dd`. The date range ends at 00:00:00 UTC on the end date- which
   * will not be in the output.
   */
  end?: string;
  /**
   * Required. Start date of the data to export in the format `yyyy-mm-dd`. The
   * date range begins at 00:00:00 UTC on the start date.
   */
  start?: string;
}

export interface GoogleCloudApigeeV1DebugMask {
  /**
   * List of JSON paths that specify the JSON elements to be filtered from JSON
   * payloads in error flows.
   */
  faultJSONPaths?: string[];
  /**
   * List of XPaths that specify the XML elements to be filtered from XML
   * payloads in error flows.
   */
  faultXPaths?: string[];
  /**
   * Name of the debug mask.
   */
  name?: string;
  /**
   * Map of namespaces to URIs.
   */
  namespaces?: {
    [key: string]: string
  };
  /**
   * List of JSON paths that specify the JSON elements to be filtered from JSON
   * request message payloads.
   */
  requestJSONPaths?: string[];
  /**
   * List of XPaths that specify the XML elements to be filtered from XML
   * request message payloads.
   */
  requestXPaths?: string[];
  /**
   * List of JSON paths that specify the JSON elements to be filtered from JSON
   * response message payloads.
   */
  responseJSONPaths?: string[];
  /**
   * List of XPaths that specify the XML elements to be filtered from XML
   * response message payloads.
   */
  responseXPaths?: string[];
  /**
   * List of variables that should be masked from the debug output.
   */
  variables?: string[];
}

export interface GoogleCloudApigeeV1DebugSession {
  /**
   * Optional. The number of request to be traced. Min = 1, Max = 15, Default =
   * 10.
   */
  count?: number;
  /**
   * Output only. The first transaction creation timestamp, recorded by UAP.
   */
  readonly createTime?: Date;
  /**
   * Optional. A conditional statement which is evaluated against the request
   * message to determine if it should be traced. Syntax matches that of on API
   * Proxy bundle flow Condition.
   */
  filter?: string;
  /**
   * A unique ID for this DebugSession.
   */
  name?: string;
  /**
   * Optional. The time in seconds after which this DebugSession should end.
   * This value will override the value in query param, if both are provided.
   */
  timeout?: bigint;
  /**
   * Optional. The maximum number of bytes captured from the response payload.
   * Min = 0, Max = 5120, Default = 5120.
   */
  tracesize?: number;
  /**
   * Optional. The length of time, in seconds, that this debug session is
   * valid, starting from when it's received in the control plane. Min = 1, Max
   * = 15, Default = 10.
   */
  validity?: number;
}

function serializeGoogleCloudApigeeV1DebugSession(data: any): GoogleCloudApigeeV1DebugSession {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? String(data["timeout"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DebugSession(data: any): GoogleCloudApigeeV1DebugSession {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    timeout: data["timeout"] !== undefined ? BigInt(data["timeout"]) : undefined,
  };
}

/**
 * A transaction contains all of the debug information of the entire message
 * flow of an API call processed by the runtime plane. The information is
 * collected and recorded at critical points of the message flow in the runtime
 * apiproxy.
 */
export interface GoogleCloudApigeeV1DebugSessionTransaction {
  /**
   * Flag indicating whether a transaction is completed or not
   */
  completed?: boolean;
  /**
   * List of debug data collected by runtime plane at various defined points in
   * the flow.
   */
  point?: GoogleCloudApigeeV1Point[];
}

export interface GoogleCloudApigeeV1DeleteCustomReportResponse {
  /**
   * The response contains only a message field.
   */
  message?: string;
}

export interface GoogleCloudApigeeV1Deployment {
  /**
   * API proxy.
   */
  apiProxy?: string;
  /**
   * Time the API proxy was marked `deployed` in the control plane in
   * millisconds since epoch.
   */
  deployStartTime?: bigint;
  /**
   * Environment.
   */
  environment?: string;
  /**
   * Errors reported for this deployment. Populated only when state == ERROR.
   * **Note**: This field is displayed only when viewing deployment status.
   */
  errors?: GoogleRpcStatus[];
  /**
   * Status reported by each runtime instance. **Note**: This field is
   * displayed only when viewing deployment status.
   */
  instances?: GoogleCloudApigeeV1InstanceDeploymentStatus[];
  /**
   * Status reported by runtime pods. **Note**: **This field is deprecated**.
   * Runtime versions 1.3 and above report instance level status rather than pod
   * status.
   */
  pods?: GoogleCloudApigeeV1PodStatus[];
  /**
   * API proxy revision.
   */
  revision?: string;
  /**
   * Conflicts in the desired state routing configuration. The presence of
   * conflicts does not cause the state to be `ERROR`, but it will mean that
   * some of the deployment's base paths are not routed to its environment. If
   * the conflicts change, the state will transition to `PROGRESSING` until the
   * latest configuration is rolled out to all instances. **Note**: This field
   * is displayed only when viewing deployment status.
   */
  routeConflicts?: GoogleCloudApigeeV1DeploymentChangeReportRoutingConflict[];
  /**
   * The full resource name of Cloud IAM Service Account that this deployment
   * is using, eg, `projects/-/serviceAccounts/{email}`.
   */
  serviceAccount?: string;
  /**
   * Current state of the deployment. **Note**: This field is displayed only
   * when viewing deployment status.
   */
  state?:  | "RUNTIME_STATE_UNSPECIFIED" | "READY" | "PROGRESSING" | "ERROR";
}

function serializeGoogleCloudApigeeV1Deployment(data: any): GoogleCloudApigeeV1Deployment {
  return {
    ...data,
    deployStartTime: data["deployStartTime"] !== undefined ? String(data["deployStartTime"]) : undefined,
    pods: data["pods"] !== undefined ? data["pods"].map((item: any) => (serializeGoogleCloudApigeeV1PodStatus(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Deployment(data: any): GoogleCloudApigeeV1Deployment {
  return {
    ...data,
    deployStartTime: data["deployStartTime"] !== undefined ? BigInt(data["deployStartTime"]) : undefined,
    pods: data["pods"] !== undefined ? data["pods"].map((item: any) => (deserializeGoogleCloudApigeeV1PodStatus(item))) : undefined,
  };
}

/**
 * Response for GenerateDeployChangeReport and GenerateUndeployChangeReport.
 * This report contains any validation failures that would cause the deployment
 * to be rejected, as well changes and conflicts in routing that may occur due
 * to the new deployment. The existence of a routing warning does not
 * necessarily imply that the deployment request is bad, if the desired state of
 * the deployment request is to effect a routing change. The primary purposes of
 * the routing messages are: 1) To inform users of routing changes that may have
 * an effect on traffic currently being routed to other existing deployments. 2)
 * To warn users if some base path in the proxy will not receive traffic due to
 * an existing deployment having already claimed that base path. The presence of
 * routing conflicts/changes will not cause non-dry-run
 * DeployApiProxy/UndeployApiProxy requests to be rejected.
 */
export interface GoogleCloudApigeeV1DeploymentChangeReport {
  /**
   * All routing changes that may result from a deployment request.
   */
  routingChanges?: GoogleCloudApigeeV1DeploymentChangeReportRoutingChange[];
  /**
   * All base path conflicts detected for a deployment request.
   */
  routingConflicts?: GoogleCloudApigeeV1DeploymentChangeReportRoutingConflict[];
  /**
   * Validation errors that would cause the deployment change request to be
   * rejected.
   */
  validationErrors?: GoogleRpcPreconditionFailure;
}

/**
 * Describes a potential routing change that may occur as a result of some
 * deployment operation.
 */
export interface GoogleCloudApigeeV1DeploymentChangeReportRoutingChange {
  /**
   * Human-readable description of this routing change.
   */
  description?: string;
  /**
   * Name of the environment group affected by this routing change.
   */
  environmentGroup?: string;
  /**
   * Base path/deployment that may stop receiving some traffic.
   */
  fromDeployment?: GoogleCloudApigeeV1DeploymentChangeReportRoutingDeployment;
  /**
   * Set to `true` if using sequenced rollout would make this routing change
   * safer. **Note**: This does not necessarily imply that automated sequenced
   * rollout mode is supported for the operation.
   */
  shouldSequenceRollout?: boolean;
  /**
   * Base path/deployment that may start receiving that traffic. May be null if
   * no deployment is able to receive the traffic.
   */
  toDeployment?: GoogleCloudApigeeV1DeploymentChangeReportRoutingDeployment;
}

/**
 * Describes a routing conflict that may cause a deployment not to receive
 * traffic at some base path.
 */
export interface GoogleCloudApigeeV1DeploymentChangeReportRoutingConflict {
  /**
   * Existing base path/deployment causing the conflict.
   */
  conflictingDeployment?: GoogleCloudApigeeV1DeploymentChangeReportRoutingDeployment;
  /**
   * Human-readable description of this conflict.
   */
  description?: string;
  /**
   * Name of the environment group in which this conflict exists.
   */
  environmentGroup?: string;
}

/**
 * Tuple representing a base path and the deployment containing it.
 */
export interface GoogleCloudApigeeV1DeploymentChangeReportRoutingDeployment {
  /**
   * Name of the deployed API proxy revision containing the base path.
   */
  apiProxy?: string;
  /**
   * Base path receiving traffic.
   */
  basepath?: string;
  /**
   * Name of the environment in which the proxy is deployed.
   */
  environment?: string;
  /**
   * Name of the deployed API proxy revision containing the base path.
   */
  revision?: string;
}

/**
 * NEXT ID: 11
 */
export interface GoogleCloudApigeeV1DeploymentConfig {
  /**
   * Additional key-value metadata for the deployment.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * Base path where the application will be hosted. Defaults to "/".
   */
  basePath?: string;
  /**
   * The list of deployment groups in which this proxy should be deployed. Not
   * currently populated for shared flows.
   */
  deploymentGroups?: string[];
  /**
   * A mapping from basepaths to proxy endpoint names in this proxy. Not
   * populated for shared flows.
   */
  endpoints?: {
    [key: string]: string
  };
  /**
   * Location of the API proxy bundle as a URI.
   */
  location?: string;
  /**
   * Name of the API or shared flow revision to be deployed in the following
   * format: `organizations/{org}/apis/{api}/revisions/{rev}` or
   * `organizations/{org}/sharedflows/{sharedflow}/revisions/{rev}`
   */
  name?: string;
  /**
   * Unique ID of the API proxy revision.
   */
  proxyUid?: string;
  /**
   * The service account identity associated with this deployment. If
   * non-empty, will be in the following format:
   * `projects/-/serviceAccounts/{account_email}`
   */
  serviceAccount?: string;
  /**
   * Unique ID. The ID will only change if the deployment is deleted and
   * recreated.
   */
  uid?: string;
}

/**
 * DeploymentGroupConfig represents a deployment group that should be present
 * in a particular environment.
 */
export interface GoogleCloudApigeeV1DeploymentGroupConfig {
  /**
   * Name of the deployment group in the following format:
   * `organizations/{org}/environments/{env}/deploymentGroups/{group}`.
   */
  name?: string;
  /**
   * Revision number which can be used by the runtime to detect if the
   * deployment group has changed between two versions.
   */
  revisionId?: bigint;
  /**
   * Unique ID. The ID will only change if the deployment group is deleted and
   * recreated.
   */
  uid?: string;
}

function serializeGoogleCloudApigeeV1DeploymentGroupConfig(data: any): GoogleCloudApigeeV1DeploymentGroupConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? String(data["revisionId"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DeploymentGroupConfig(data: any): GoogleCloudApigeeV1DeploymentGroupConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? BigInt(data["revisionId"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1Developer {
  /**
   * Access type.
   */
  accessType?: string;
  /**
   * Developer app family.
   */
  appFamily?: string;
  /**
   * List of apps associated with the developer.
   */
  apps?: string[];
  /**
   * Optional. Developer attributes (name/value pairs). The custom attribute
   * limit is 18.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * List of companies associated with the developer.
   */
  companies?: string[];
  /**
   * Output only. Time at which the developer was created in milliseconds since
   * epoch.
   */
  readonly createdAt?: bigint;
  /**
   * ID of the developer. **Note**: IDs are generated internally by Apigee and
   * are not guaranteed to stay the same over time.
   */
  developerId?: string;
  /**
   * Required. Email address of the developer. This value is used to uniquely
   * identify the developer in Apigee hybrid. Note that the email address has to
   * be in lowercase only.
   */
  email?: string;
  /**
   * Required. First name of the developer.
   */
  firstName?: string;
  /**
   * Output only. Time at which the developer was last modified in milliseconds
   * since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Required. Last name of the developer.
   */
  lastName?: string;
  /**
   * Output only. Name of the Apigee organization in which the developer
   * resides.
   */
  readonly organizationName?: string;
  /**
   * Output only. Status of the developer. Valid values are `active` and
   * `inactive`.
   */
  readonly status?: string;
  /**
   * Required. User name of the developer. Not used by Apigee hybrid.
   */
  userName?: string;
}

export interface GoogleCloudApigeeV1DeveloperApp {
  /**
   * List of API products associated with the developer app.
   */
  apiProducts?: string[];
  /**
   * Developer app family.
   */
  appFamily?: string;
  /**
   * ID of the developer app.
   */
  appId?: string;
  /**
   * List of attributes for the developer app.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Callback URL used by OAuth 2.0 authorization servers to communicate
   * authorization codes back to developer apps.
   */
  callbackUrl?: string;
  /**
   * Output only. Time the developer app was created in milliseconds since
   * epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Output only. Set of credentials for the developer app consisting of the
   * consumer key/secret pairs associated with the API products.
   */
  readonly credentials?: GoogleCloudApigeeV1Credential[];
  /**
   * ID of the developer.
   */
  developerId?: string;
  /**
   * Expiration time, in milliseconds, for the consumer key that is generated
   * for the developer app. If not set or left to the default value of `-1`, the
   * API key never expires. The expiration time can't be updated after it is
   * set.
   */
  keyExpiresIn?: bigint;
  /**
   * Output only. Time the developer app was modified in milliseconds since
   * epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Name of the developer app.
   */
  name?: string;
  /**
   * Scopes to apply to the developer app. The specified scopes must already
   * exist for the API product that you associate with the developer app.
   */
  scopes?: string[];
  /**
   * Status of the credential. Valid values include `approved` or `revoked`.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1DeveloperApp(data: any): GoogleCloudApigeeV1DeveloperApp {
  return {
    ...data,
    keyExpiresIn: data["keyExpiresIn"] !== undefined ? String(data["keyExpiresIn"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DeveloperApp(data: any): GoogleCloudApigeeV1DeveloperApp {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    credentials: data["credentials"] !== undefined ? data["credentials"].map((item: any) => (deserializeGoogleCloudApigeeV1Credential(item))) : undefined,
    keyExpiresIn: data["keyExpiresIn"] !== undefined ? BigInt(data["keyExpiresIn"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1DeveloperAppKey {
  /**
   * List of API products for which the credential can be used. **Note**: Do
   * not specify the list of API products when creating a consumer key and
   * secret for a developer app. Instead, use the UpdateDeveloperAppKey API to
   * make the association after the consumer key and secret are created.
   */
  apiProducts?: any[];
  /**
   * List of attributes associated with the credential.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Consumer key.
   */
  consumerKey?: string;
  /**
   * Secret key.
   */
  consumerSecret?: string;
  /**
   * Time the developer app expires in milliseconds since epoch.
   */
  expiresAt?: bigint;
  /**
   * Input only. Expiration time, in seconds, for the consumer key. If not set
   * or left to the default value of `-1`, the API key never expires. The
   * expiration time can't be updated after it is set.
   */
  expiresInSeconds?: bigint;
  /**
   * Time the developer app was created in milliseconds since epoch.
   */
  issuedAt?: bigint;
  /**
   * Scopes to apply to the app. The specified scope names must already be
   * defined for the API product that you associate with the app.
   */
  scopes?: string[];
  /**
   * Status of the credential. Valid values include `approved` or `revoked`.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1DeveloperAppKey(data: any): GoogleCloudApigeeV1DeveloperAppKey {
  return {
    ...data,
    expiresAt: data["expiresAt"] !== undefined ? String(data["expiresAt"]) : undefined,
    expiresInSeconds: data["expiresInSeconds"] !== undefined ? String(data["expiresInSeconds"]) : undefined,
    issuedAt: data["issuedAt"] !== undefined ? String(data["issuedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DeveloperAppKey(data: any): GoogleCloudApigeeV1DeveloperAppKey {
  return {
    ...data,
    expiresAt: data["expiresAt"] !== undefined ? BigInt(data["expiresAt"]) : undefined,
    expiresInSeconds: data["expiresInSeconds"] !== undefined ? BigInt(data["expiresInSeconds"]) : undefined,
    issuedAt: data["issuedAt"] !== undefined ? BigInt(data["issuedAt"]) : undefined,
  };
}

/**
 * Account balance for the developer.
 */
export interface GoogleCloudApigeeV1DeveloperBalance {
  /**
   * Output only. List of all wallets. Each individual wallet stores the
   * account balance for a particular currency.
   */
  readonly wallets?: GoogleCloudApigeeV1DeveloperBalanceWallet[];
}

/**
 * Wallet used to manage an account balance for a particular currency.
 */
export interface GoogleCloudApigeeV1DeveloperBalanceWallet {
  /**
   * Current remaining balance of the developer for a particular currency.
   */
  balance?: GoogleTypeMoney;
  /**
   * Output only. Time at which the developer last added credit to the account
   * in milliseconds since epoch.
   */
  readonly lastCreditTime?: bigint;
}

function serializeGoogleCloudApigeeV1DeveloperBalanceWallet(data: any): GoogleCloudApigeeV1DeveloperBalanceWallet {
  return {
    ...data,
    balance: data["balance"] !== undefined ? serializeGoogleTypeMoney(data["balance"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DeveloperBalanceWallet(data: any): GoogleCloudApigeeV1DeveloperBalanceWallet {
  return {
    ...data,
    balance: data["balance"] !== undefined ? deserializeGoogleTypeMoney(data["balance"]) : undefined,
    lastCreditTime: data["lastCreditTime"] !== undefined ? BigInt(data["lastCreditTime"]) : undefined,
  };
}

/**
 * Monetization configuration for the developer.
 */
export interface GoogleCloudApigeeV1DeveloperMonetizationConfig {
  /**
   * Billing type.
   */
  billingType?:  | "BILLING_TYPE_UNSPECIFIED" | "PREPAID" | "POSTPAID";
}

/**
 * Structure of a DeveloperSubscription.
 */
export interface GoogleCloudApigeeV1DeveloperSubscription {
  /**
   * Name of the API product for which the developer is purchasing a
   * subscription.
   */
  apiproduct?: string;
  /**
   * Output only. Time when the API product subscription was created in
   * milliseconds since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Time when the API product subscription ends in milliseconds since epoch.
   */
  endTime?: bigint;
  /**
   * Output only. Time when the API product subscription was last modified in
   * milliseconds since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Output only. Name of the API product subscription.
   */
  readonly name?: string;
  /**
   * Time when the API product subscription starts in milliseconds since epoch.
   */
  startTime?: bigint;
}

function serializeGoogleCloudApigeeV1DeveloperSubscription(data: any): GoogleCloudApigeeV1DeveloperSubscription {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1DeveloperSubscription(data: any): GoogleCloudApigeeV1DeveloperSubscription {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * Encapsulates a metric grouped by dimension.
 */
export interface GoogleCloudApigeeV1DimensionMetric {
  /**
   * List of metrics.
   */
  metrics?: GoogleCloudApigeeV1Metric[];
  /**
   * Name of the dimension.
   */
  name?: string;
}

/**
 * Apigee endpoint attachment. For more information, see [Southbound networking
 * patterns]
 * (https://cloud.google.com/apigee/docs/api-platform/architecture/southbound-networking-patterns-endpoints).
 */
export interface GoogleCloudApigeeV1EndpointAttachment {
  /**
   * Output only. State of the endpoint attachment connection to the service
   * attachment.
   */
  readonly connectionState?:  | "CONNECTION_STATE_UNSPECIFIED" | "UNAVAILABLE" | "PENDING" | "ACCEPTED" | "REJECTED" | "CLOSED" | "FROZEN" | "NEEDS_ATTENTION";
  /**
   * Output only. Host that can be used in either the HTTP target endpoint
   * directly or as the host in target server.
   */
  readonly host?: string;
  /**
   * Required. Location of the endpoint attachment.
   */
  location?: string;
  /**
   * Name of the endpoint attachment. Use the following structure in your
   * request: `organizations/{org}/endpointAttachments/{endpoint_attachment}`
   */
  name?: string;
  /**
   * Format: projects/*\/regions/*\/serviceAttachments/*
   */
  serviceAttachment?: string;
  /**
   * Output only. State of the endpoint attachment. Values other than `ACTIVE`
   * mean the resource is not ready to use.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
}

/**
 * EndpointChainingRule specifies the proxies contained in a particular
 * deployment group, so that other deployment groups can find them in chaining
 * calls.
 */
export interface GoogleCloudApigeeV1EndpointChainingRule {
  /**
   * The deployment group to target for cross-shard chaining calls to these
   * proxies.
   */
  deploymentGroup?: string;
  /**
   * List of proxy ids which may be found in the given deployment group.
   */
  proxyIds?: string[];
}

/**
 * Metadata common to many entities in this API.
 */
export interface GoogleCloudApigeeV1EntityMetadata {
  /**
   * Time at which the API proxy was created, in milliseconds since epoch.
   */
  createdAt?: bigint;
  /**
   * Time at which the API proxy was most recently modified, in milliseconds
   * since epoch.
   */
  lastModifiedAt?: bigint;
  /**
   * The type of entity described
   */
  subType?: string;
}

function serializeGoogleCloudApigeeV1EntityMetadata(data: any): GoogleCloudApigeeV1EntityMetadata {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? String(data["lastModifiedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1EntityMetadata(data: any): GoogleCloudApigeeV1EntityMetadata {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1Environment {
  /**
   * Optional. API Proxy type supported by the environment. The type can be set
   * when creating the Environment and cannot be changed.
   */
  apiProxyType?:  | "API_PROXY_TYPE_UNSPECIFIED" | "PROGRAMMABLE" | "CONFIGURABLE";
  /**
   * Output only. Creation time of this environment as milliseconds since
   * epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Optional. Deployment type supported by the environment. The deployment
   * type can be set when creating the environment and cannot be changed. When
   * you enable archive deployment, you will be **prevented from performing** a
   * [subset of
   * actions](/apigee/docs/api-platform/local-development/overview#prevented-actions)
   * within the environment, including: * Managing the deployment of API proxy
   * or shared flow revisions * Creating, updating, or deleting resource files *
   * Creating, updating, or deleting target servers
   */
  deploymentType?:  | "DEPLOYMENT_TYPE_UNSPECIFIED" | "PROXY" | "ARCHIVE";
  /**
   * Optional. Description of the environment.
   */
  description?: string;
  /**
   * Optional. Display name for this environment.
   */
  displayName?: string;
  /**
   * Optional. Url of the forward proxy to be applied to the runtime instances
   * in this environment. Must be in the format of {scheme}://{hostname}:{port}.
   * Note that scheme must be one of "http" or "https", and port must be
   * supplied.
   */
  forwardProxyUri?: string;
  /**
   * Output only. Last modification time of this environment as milliseconds
   * since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Required. Name of the environment. Values must match the regular
   * expression `^[.\\p{Alnum}-_]{1,255}$`
   */
  name?: string;
  /**
   * Optional. NodeConfig of the environment.
   */
  nodeConfig?: GoogleCloudApigeeV1NodeConfig;
  /**
   * Optional. Key-value pairs that may be used for customizing the
   * environment.
   */
  properties?: GoogleCloudApigeeV1Properties;
  /**
   * Output only. State of the environment. Values other than ACTIVE means the
   * resource is not ready to use.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
}

function serializeGoogleCloudApigeeV1Environment(data: any): GoogleCloudApigeeV1Environment {
  return {
    ...data,
    nodeConfig: data["nodeConfig"] !== undefined ? serializeGoogleCloudApigeeV1NodeConfig(data["nodeConfig"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Environment(data: any): GoogleCloudApigeeV1Environment {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
    nodeConfig: data["nodeConfig"] !== undefined ? deserializeGoogleCloudApigeeV1NodeConfig(data["nodeConfig"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1EnvironmentConfig {
  /**
   * The location for the config blob of API Runtime Control, aka Envoy
   * Adapter, for op-based authentication as a URI, e.g. a Cloud Storage URI.
   * This is only used by Envoy-based gateways.
   */
  arcConfigLocation?: string;
  /**
   * Time that the environment configuration was created.
   */
  createTime?: Date;
  /**
   * List of data collectors used by the deployments in the environment.
   */
  dataCollectors?: GoogleCloudApigeeV1DataCollectorConfig[];
  /**
   * Debug mask that applies to all deployments in the environment.
   */
  debugMask?: GoogleCloudApigeeV1DebugMask;
  /**
   * List of deployment groups in the environment.
   */
  deploymentGroups?: GoogleCloudApigeeV1DeploymentGroupConfig[];
  /**
   * List of deployments in the environment.
   */
  deployments?: GoogleCloudApigeeV1DeploymentConfig[];
  /**
   * Revision ID for environment-scoped resources (e.g. target servers,
   * keystores) in this config. This ID will increment any time a resource not
   * scoped to a deployment group changes.
   */
  envScopedRevisionId?: bigint;
  /**
   * Feature flags inherited from the organization and environment.
   */
  featureFlags?: {
    [key: string]: string
  };
  /**
   * List of flow hooks in the environment.
   */
  flowhooks?: GoogleCloudApigeeV1FlowHookConfig[];
  /**
   * The forward proxy's url to be used by the runtime. When set, runtime will
   * send requests to the target via the given forward proxy. This is only used
   * by programmable gateways.
   */
  forwardProxyUri?: string;
  /**
   * The location for the gateway config blob as a URI, e.g. a Cloud Storage
   * URI. This is only used by Envoy-based gateways.
   */
  gatewayConfigLocation?: string;
  /**
   * List of keystores in the environment.
   */
  keystores?: GoogleCloudApigeeV1KeystoreConfig[];
  /**
   * Name of the environment configuration in the following format:
   * `organizations/{org}/environments/{env}/configs/{config}`
   */
  name?: string;
  /**
   * Used by the Control plane to add context information to help detect the
   * source of the document during diagnostics and debugging.
   */
  provider?: string;
  /**
   * Name of the PubSub topic for the environment.
   */
  pubsubTopic?: string;
  /**
   * List of resource references in the environment.
   */
  resourceReferences?: GoogleCloudApigeeV1ReferenceConfig[];
  /**
   * List of resource versions in the environment.
   */
  resources?: GoogleCloudApigeeV1ResourceConfig[];
  /**
   * Revision ID of the environment configuration. The higher the value, the
   * more recently the configuration was deployed.
   */
  revisionId?: bigint;
  /**
   * DEPRECATED: Use revision_id.
   */
  sequenceNumber?: bigint;
  /**
   * List of target servers in the environment. Disabled target servers are not
   * displayed.
   */
  targets?: GoogleCloudApigeeV1TargetServerConfig[];
  /**
   * Trace configurations. Contains config for the environment and config
   * overrides for specific API proxies.
   */
  traceConfig?: GoogleCloudApigeeV1RuntimeTraceConfig;
  /**
   * Unique ID for the environment configuration. The ID will only change if
   * the environment is deleted and recreated.
   */
  uid?: string;
}

function serializeGoogleCloudApigeeV1EnvironmentConfig(data: any): GoogleCloudApigeeV1EnvironmentConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    deploymentGroups: data["deploymentGroups"] !== undefined ? data["deploymentGroups"].map((item: any) => (serializeGoogleCloudApigeeV1DeploymentGroupConfig(item))) : undefined,
    envScopedRevisionId: data["envScopedRevisionId"] !== undefined ? String(data["envScopedRevisionId"]) : undefined,
    revisionId: data["revisionId"] !== undefined ? String(data["revisionId"]) : undefined,
    sequenceNumber: data["sequenceNumber"] !== undefined ? String(data["sequenceNumber"]) : undefined,
    traceConfig: data["traceConfig"] !== undefined ? serializeGoogleCloudApigeeV1RuntimeTraceConfig(data["traceConfig"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1EnvironmentConfig(data: any): GoogleCloudApigeeV1EnvironmentConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deploymentGroups: data["deploymentGroups"] !== undefined ? data["deploymentGroups"].map((item: any) => (deserializeGoogleCloudApigeeV1DeploymentGroupConfig(item))) : undefined,
    envScopedRevisionId: data["envScopedRevisionId"] !== undefined ? BigInt(data["envScopedRevisionId"]) : undefined,
    revisionId: data["revisionId"] !== undefined ? BigInt(data["revisionId"]) : undefined,
    sequenceNumber: data["sequenceNumber"] !== undefined ? BigInt(data["sequenceNumber"]) : undefined,
    traceConfig: data["traceConfig"] !== undefined ? deserializeGoogleCloudApigeeV1RuntimeTraceConfig(data["traceConfig"]) : undefined,
  };
}

/**
 * EnvironmentGroup configuration. An environment group is used to group one or
 * more Apigee environments under a single host name.
 */
export interface GoogleCloudApigeeV1EnvironmentGroup {
  /**
   * Output only. The time at which the environment group was created as
   * milliseconds since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Required. Host names for this environment group.
   */
  hostnames?: string[];
  /**
   * Output only. The time at which the environment group was last updated as
   * milliseconds since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * ID of the environment group.
   */
  name?: string;
  /**
   * Output only. State of the environment group. Values other than ACTIVE
   * means the resource is not ready to use.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
}

/**
 * EnvironmentGroupAttachment is a resource which defines an attachment of an
 * environment to an environment group.
 */
export interface GoogleCloudApigeeV1EnvironmentGroupAttachment {
  /**
   * Output only. The time at which the environment group attachment was
   * created as milliseconds since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Required. ID of the attached environment.
   */
  environment?: string;
  /**
   * Output only. ID of the environment group.
   */
  readonly environmentGroupId?: string;
  /**
   * ID of the environment group attachment.
   */
  name?: string;
}

/**
 * EnvironmentGroupConfig is a revisioned snapshot of an EnvironmentGroup and
 * its associated routing rules.
 */
export interface GoogleCloudApigeeV1EnvironmentGroupConfig {
  /**
   * A list of proxies in each deployment group for proxy chaining calls.
   */
  endpointChainingRules?: GoogleCloudApigeeV1EndpointChainingRule[];
  /**
   * Host names for the environment group.
   */
  hostnames?: string[];
  /**
   * When this message appears in the top-level IngressConfig, this field will
   * be populated in lieu of the inlined routing_rules and hostnames fields.
   * Some URL for downloading the full EnvironmentGroupConfig for this group.
   */
  location?: string;
  /**
   * Name of the environment group in the following format:
   * `organizations/{org}/envgroups/{envgroup}`.
   */
  name?: string;
  /**
   * Revision id that defines the ordering of the EnvironmentGroupConfig
   * resource. The higher the revision, the more recently the configuration was
   * deployed.
   */
  revisionId?: bigint;
  /**
   * Ordered list of routing rules defining how traffic to this environment
   * group's hostnames should be routed to different environments.
   */
  routingRules?: GoogleCloudApigeeV1RoutingRule[];
  /**
   * A unique id for the environment group config that will only change if the
   * environment group is deleted and recreated.
   */
  uid?: string;
}

function serializeGoogleCloudApigeeV1EnvironmentGroupConfig(data: any): GoogleCloudApigeeV1EnvironmentGroupConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? String(data["revisionId"]) : undefined,
    routingRules: data["routingRules"] !== undefined ? data["routingRules"].map((item: any) => (serializeGoogleCloudApigeeV1RoutingRule(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1EnvironmentGroupConfig(data: any): GoogleCloudApigeeV1EnvironmentGroupConfig {
  return {
    ...data,
    revisionId: data["revisionId"] !== undefined ? BigInt(data["revisionId"]) : undefined,
    routingRules: data["routingRules"] !== undefined ? data["routingRules"].map((item: any) => (deserializeGoogleCloudApigeeV1RoutingRule(item))) : undefined,
  };
}

/**
 * Request for ExpireDeveloperSubscription.
 */
export interface GoogleCloudApigeeV1ExpireDeveloperSubscriptionRequest {
}

/**
 * Details of an export job.
 */
export interface GoogleCloudApigeeV1Export {
  /**
   * Output only. Time the export job was created.
   */
  readonly created?: string;
  /**
   * Name of the datastore that is the destination of the export job
   * [datastore]
   */
  datastoreName?: string;
  /**
   * Description of the export job.
   */
  description?: string;
  /**
   * Output only. Error is set when export fails
   */
  readonly error?: string;
  /**
   * Output only. Execution time for this export job. If the job is still in
   * progress, it will be set to the amount of time that has elapsed
   * since`created`, in seconds. Else, it will set to (`updated` - `created`),
   * in seconds.
   */
  readonly executionTime?: string;
  /**
   * Display name of the export job.
   */
  name?: string;
  /**
   * Output only. Self link of the export job. A URI that can be used to
   * retrieve the status of an export job. Example:
   * `/organizations/myorg/environments/myenv/analytics/exports/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd`
   */
  readonly self?: string;
  /**
   * Output only. Status of the export job. Valid values include `enqueued`,
   * `running`, `completed`, and `failed`.
   */
  readonly state?: string;
  /**
   * Output only. Time the export job was last updated.
   */
  readonly updated?: string;
}

/**
 * Request body for [CreateExportRequest]
 */
export interface GoogleCloudApigeeV1ExportRequest {
  /**
   * Optional. Delimiter used in the CSV file, if `outputFormat` is set to
   * `csv`. Defaults to the `,` (comma) character. Supported delimiter
   * characters include comma (`,`), pipe (`|`), and tab (`\t`).
   */
  csvDelimiter?: string;
  /**
   * Required. Name of the preconfigured datastore.
   */
  datastoreName?: string;
  /**
   * Required. Date range of the data to export.
   */
  dateRange?: GoogleCloudApigeeV1DateRange;
  /**
   * Optional. Description of the export job.
   */
  description?: string;
  /**
   * Required. Display name of the export job.
   */
  name?: string;
  /**
   * Optional. Output format of the export. Valid values include: `csv` or
   * `json`. Defaults to `json`. Note: Configure the delimiter for CSV output
   * using the `csvDelimiter` property.
   */
  outputFormat?: string;
}

export interface GoogleCloudApigeeV1FlowHook {
  /**
   * Optional. Flag that specifies whether execution should continue if the
   * flow hook throws an exception. Set to `true` to continue execution. Set to
   * `false` to stop execution if the flow hook throws an exception. Defaults to
   * `true`.
   */
  continueOnError?: boolean;
  /**
   * Description of the flow hook.
   */
  description?: string;
  /**
   * Output only. Where in the API call flow the flow hook is invoked. Must be
   * one of `PreProxyFlowHook`, `PostProxyFlowHook`, `PreTargetFlowHook`, or
   * `PostTargetFlowHook`.
   */
  readonly flowHookPoint?: string;
  /**
   * Shared flow attached to this flow hook, or empty if there is none
   * attached.
   */
  sharedFlow?: string;
}

export interface GoogleCloudApigeeV1FlowHookConfig {
  /**
   * Flag that specifies whether the flow should abort after an error in the
   * flow hook. Defaults to `true` (continue on error).
   */
  continueOnError?: boolean;
  /**
   * Name of the flow hook in the following format:
   * `organizations/{org}/environments/{env}/flowhooks/{point}`. Valid `point`
   * values include: `PreProxyFlowHook`, `PostProxyFlowHook`,
   * `PreTargetFlowHook`, and `PostTargetFlowHook`
   */
  name?: string;
  /**
   * Name of the shared flow to invoke in the following format:
   * `organizations/{org}/sharedflows/{sharedflow}`
   */
  sharedFlowName?: string;
}

/**
 * Request for GenerateDownloadUrl method.
 */
export interface GoogleCloudApigeeV1GenerateDownloadUrlRequest {
}

/**
 * Response for GenerateDownloadUrl method.
 */
export interface GoogleCloudApigeeV1GenerateDownloadUrlResponse {
  /**
   * The Google Cloud Storage signed URL that can be used to download the
   * Archive zip file.
   */
  downloadUri?: string;
}

/**
 * Request for GenerateUploadUrl method.
 */
export interface GoogleCloudApigeeV1GenerateUploadUrlRequest {
}

/**
 * Response for GenerateUploadUrl method.
 */
export interface GoogleCloudApigeeV1GenerateUploadUrlResponse {
  /**
   * The Google Cloud Storage signed URL that can be used to upload a new
   * Archive zip file.
   */
  uploadUri?: string;
}

/**
 * The response for GetAsyncQueryResultUrl
 */
export interface GoogleCloudApigeeV1GetAsyncQueryResultUrlResponse {
  /**
   * The list of Signed URLs generated by the CreateAsyncQuery request
   */
  urls?: GoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo[];
}

function serializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponse(data: any): GoogleCloudApigeeV1GetAsyncQueryResultUrlResponse {
  return {
    ...data,
    urls: data["urls"] !== undefined ? data["urls"].map((item: any) => (serializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponse(data: any): GoogleCloudApigeeV1GetAsyncQueryResultUrlResponse {
  return {
    ...data,
    urls: data["urls"] !== undefined ? data["urls"].map((item: any) => (deserializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo(item))) : undefined,
  };
}

/**
 * A Signed URL and the relevant metadata associated with it.
 */
export interface GoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo {
  /**
   * The MD5 Hash of the JSON data
   */
  md5?: string;
  /**
   * The size of the returned file in bytes
   */
  sizeBytes?: bigint;
  /**
   * The signed URL of the JSON data. Will be of the form
   * `https://storage.googleapis.com/example-bucket/cat.jpeg?X-Goog-Algorithm=
   * GOOG4-RSA-SHA256&X-Goog-Credential=example%40example-project.iam.gserviceaccount
   * .com%2F20181026%2Fus-central1%2Fstorage%2Fgoog4_request&X-Goog-Date=20181026T18
   * 1309Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=247a2aa45f16
   * 9edf4d187d54e7cc46e4731b1e6273242c4f4c39a1d2507a0e58706e25e3a85a7dbb891d62afa849
   * 6def8e260c1db863d9ace85ff0a184b894b117fe46d1225c82f2aa19efd52cf21d3e2022b3b868dc
   * c1aca2741951ed5bf3bb25a34f5e9316a2841e8ff4c530b22ceaa1c5ce09c7cbb5732631510c2058
   * 0e61723f5594de3aea497f195456a2ff2bdd0d13bad47289d8611b6f9cfeef0c46c91a455b94e90a
   * 66924f722292d21e24d31dcfb38ce0c0f353ffa5a9756fc2a9f2b40bc2113206a81e324fc4fd6823
   * a29163fa845c8ae7eca1fcf6e5bb48b3200983c56c5ca81fffb151cca7402beddfc4a76b13344703
   * 2ea7abedc098d2eb14a7`
   */
  uri?: string;
}

function serializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo(data: any): GoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo {
  return {
    ...data,
    sizeBytes: data["sizeBytes"] !== undefined ? String(data["sizeBytes"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo(data: any): GoogleCloudApigeeV1GetAsyncQueryResultUrlResponseURLInfo {
  return {
    ...data,
    sizeBytes: data["sizeBytes"] !== undefined ? BigInt(data["sizeBytes"]) : undefined,
  };
}

/**
 * Request for GetSyncAuthorization.
 */
export interface GoogleCloudApigeeV1GetSyncAuthorizationRequest {
}

/**
 * Represents the pairing of GraphQL operation types and the GraphQL operation
 * name.
 */
export interface GoogleCloudApigeeV1GraphQLOperation {
  /**
   * GraphQL operation name. The name and operation type will be used to apply
   * quotas. If no name is specified, the quota will be applied to all GraphQL
   * operations irrespective of their operation names in the payload.
   */
  operation?: string;
  /**
   * Required. GraphQL operation types. Valid values include `query` or
   * `mutation`. **Note**: Apigee does not currently support `subscription`
   * types.
   */
  operationTypes?: string[];
}

/**
 * Binds the resources in a proxy or remote service with the GraphQL operation
 * and its associated quota enforcement.
 */
export interface GoogleCloudApigeeV1GraphQLOperationConfig {
  /**
   * Required. Name of the API proxy endpoint or remote service with which the
   * GraphQL operation and quota are associated.
   */
  apiSource?: string;
  /**
   * Custom attributes associated with the operation.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * Required. List of GraphQL name/operation type pairs for the proxy or
   * remote service to which quota will be applied. If only operation types are
   * specified, the quota will be applied to all GraphQL requests irrespective
   * of the GraphQL name. **Note**: Currently, you can specify only a single
   * GraphQLOperation. Specifying more than one will cause the operation to
   * fail.
   */
  operations?: GoogleCloudApigeeV1GraphQLOperation[];
  /**
   * Quota parameters to be enforced for the resources, methods, and API source
   * combination. If none are specified, quota enforcement will not be done.
   */
  quota?: GoogleCloudApigeeV1Quota;
}

/**
 * List of graphQL operation configuration details associated with Apigee API
 * proxies or remote services. Remote services are non-Apigee proxies, such as
 * Istio-Envoy.
 */
export interface GoogleCloudApigeeV1GraphQLOperationGroup {
  /**
   * Required. List of operation configurations for either Apigee API proxies
   * or other remote services that are associated with this API product.
   */
  operationConfigs?: GoogleCloudApigeeV1GraphQLOperationConfig[];
  /**
   * Flag that specifies whether the configuration is for Apigee API proxy or a
   * remote service. Valid values include `proxy` or `remoteservice`. Defaults
   * to `proxy`. Set to `proxy` when Apigee API proxies are associated with the
   * API product. Set to `remoteservice` when non-Apigee proxies like
   * Istio-Envoy are associated with the API product.
   */
  operationConfigType?: string;
}

export interface GoogleCloudApigeeV1IngressConfig {
  /**
   * List of environment groups in the organization.
   */
  environmentGroups?: GoogleCloudApigeeV1EnvironmentGroupConfig[];
  /**
   * Name of the resource in the following format:
   * `organizations/{org}/deployedIngressConfig`.
   */
  name?: string;
  /**
   * Time at which the IngressConfig revision was created.
   */
  revisionCreateTime?: Date;
  /**
   * Revision id that defines the ordering on IngressConfig resources. The
   * higher the revision, the more recently the configuration was deployed.
   */
  revisionId?: bigint;
  /**
   * A unique id for the ingress config that will only change if the
   * organization is deleted and recreated.
   */
  uid?: string;
}

function serializeGoogleCloudApigeeV1IngressConfig(data: any): GoogleCloudApigeeV1IngressConfig {
  return {
    ...data,
    environmentGroups: data["environmentGroups"] !== undefined ? data["environmentGroups"].map((item: any) => (serializeGoogleCloudApigeeV1EnvironmentGroupConfig(item))) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? data["revisionCreateTime"].toISOString() : undefined,
    revisionId: data["revisionId"] !== undefined ? String(data["revisionId"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1IngressConfig(data: any): GoogleCloudApigeeV1IngressConfig {
  return {
    ...data,
    environmentGroups: data["environmentGroups"] !== undefined ? data["environmentGroups"].map((item: any) => (deserializeGoogleCloudApigeeV1EnvironmentGroupConfig(item))) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
    revisionId: data["revisionId"] !== undefined ? BigInt(data["revisionId"]) : undefined,
  };
}

/**
 * Apigee runtime instance.
 */
export interface GoogleCloudApigeeV1Instance {
  /**
   * Optional. Customer accept list represents the list of projects (id/number)
   * on customer side that can privately connect to the service attachment. It
   * is an optional field which the customers can provide during the instance
   * creation. By default, the customer project associated with the Apigee
   * organization will be included to the list.
   */
  consumerAcceptList?: string[];
  /**
   * Output only. Time the instance was created in milliseconds since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Optional. Description of the instance.
   */
  description?: string;
  /**
   * Customer Managed Encryption Key (CMEK) used for disk and volume
   * encryption. Required for Apigee paid subscriptions only. Use the following
   * format:
   * `projects/([^/]+)/locations/([^/]+)/keyRings/([^/]+)/cryptoKeys/([^/]+)`
   */
  diskEncryptionKeyName?: string;
  /**
   * Optional. Display name for the instance.
   */
  displayName?: string;
  /**
   * Output only. Internal hostname or IP address of the Apigee endpoint used
   * by clients to connect to the service.
   */
  readonly host?: string;
  /**
   * Optional. Comma-separated list of CIDR blocks of length 22 and/or 28 used
   * to create the Apigee instance. Providing CIDR ranges is optional. You can
   * provide just /22 or /28 or both (or neither). Ranges you provide should be
   * freely available as part of a larger named range you have allocated to the
   * Service Networking peering. If this parameter is not provided, Apigee
   * automatically requests an available /22 and /28 CIDR block from Service
   * Networking. Use the /22 CIDR block for configuring your firewall needs to
   * allow traffic from Apigee. Input formats: `a.b.c.d/22` or `e.f.g.h/28` or
   * `a.b.c.d/22,e.f.g.h/28`
   */
  ipRange?: string;
  /**
   * Output only. Time the instance was last modified in milliseconds since
   * epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Required. Compute Engine location where the instance resides.
   */
  location?: string;
  /**
   * Required. Resource ID of the instance. Values must match the regular
   * expression `^a-z{0,30}[a-z\d]$`.
   */
  name?: string;
  /**
   * Optional. Size of the CIDR block range that will be reserved by the
   * instance. PAID organizations support `SLASH_16` to `SLASH_20` and defaults
   * to `SLASH_16`. Evaluation organizations support only `SLASH_23`.
   */
  peeringCidrRange?:  | "CIDR_RANGE_UNSPECIFIED" | "SLASH_16" | "SLASH_17" | "SLASH_18" | "SLASH_19" | "SLASH_20" | "SLASH_22" | "SLASH_23";
  /**
   * Output only. Port number of the exposed Apigee endpoint.
   */
  readonly port?: string;
  /**
   * Output only. Version of the runtime system running in the instance. The
   * runtime system is the set of components that serve the API Proxy traffic in
   * your Environments.
   */
  readonly runtimeVersion?: string;
  /**
   * Output only. Resource name of the service attachment created for the
   * instance in the format: `projects/*\/regions/*\/serviceAttachments/*`
   * Apigee customers can privately forward traffic to this service attachment
   * using the PSC endpoints.
   */
  readonly serviceAttachment?: string;
  /**
   * Output only. State of the instance. Values other than `ACTIVE` means the
   * resource is not ready to use.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
}

/**
 * InstanceAttachment represents the installation of an environment onto an
 * instance.
 */
export interface GoogleCloudApigeeV1InstanceAttachment {
  /**
   * Output only. Time the attachment was created in milliseconds since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * ID of the attached environment.
   */
  environment?: string;
  /**
   * Output only. ID of the attachment.
   */
  readonly name?: string;
}

/**
 * The status of a deployment as reported by a single instance.
 */
export interface GoogleCloudApigeeV1InstanceDeploymentStatus {
  /**
   * Revisions currently deployed in MPs.
   */
  deployedRevisions?: GoogleCloudApigeeV1InstanceDeploymentStatusDeployedRevision[];
  /**
   * Current routes deployed in the ingress routing table. A route which is
   * missing will appear in `missing_routes`.
   */
  deployedRoutes?: GoogleCloudApigeeV1InstanceDeploymentStatusDeployedRoute[];
  /**
   * ID of the instance reporting the status.
   */
  instance?: string;
}

/**
 * Revisions deployed in the MPs.
 */
export interface GoogleCloudApigeeV1InstanceDeploymentStatusDeployedRevision {
  /**
   * Percentage of MP replicas reporting this revision.
   */
  percentage?: number;
  /**
   * API proxy revision reported as deployed.
   */
  revision?: string;
}

/**
 * Route deployed in the ingress routing table.
 */
export interface GoogleCloudApigeeV1InstanceDeploymentStatusDeployedRoute {
  /**
   * Base path in the routing table.
   */
  basepath?: string;
  /**
   * Environment group where this route is installed.
   */
  envgroup?: string;
  /**
   * Destination environment. This will be empty if the route is not yet
   * reported.
   */
  environment?: string;
  /**
   * Percentage of ingress replicas reporting this route.
   */
  percentage?: number;
}

/**
 * Configuration for the Integration add-on.
 */
export interface GoogleCloudApigeeV1IntegrationConfig {
  /**
   * Flag that specifies whether the Integration add-on is enabled.
   */
  enabled?: boolean;
}

export interface GoogleCloudApigeeV1KeyAliasReference {
  /**
   * Alias ID. Must exist in the keystore referred to by the reference.
   */
  aliasId?: string;
  /**
   * Reference name in the following format:
   * `organizations/{org}/environments/{env}/references/{reference}`
   */
  reference?: string;
}

/**
 * Datastore for Certificates and Aliases.
 */
export interface GoogleCloudApigeeV1Keystore {
  /**
   * Output only. Aliases in this keystore.
   */
  readonly aliases?: string[];
  /**
   * Required. Resource ID for this keystore. Values must match the regular
   * expression `[\w[:space:].-]{1,255}`.
   */
  name?: string;
}

export interface GoogleCloudApigeeV1KeystoreConfig {
  /**
   * Aliases in the keystore.
   */
  aliases?: GoogleCloudApigeeV1AliasRevisionConfig[];
  /**
   * Resource name in the following format:
   * `organizations/{org}/environments/{env}/keystores/{keystore}`
   */
  name?: string;
}

/**
 * Key value map pair where the value represents the data associated with the
 * corresponding key. **Note**: Supported for Apigee hybrid 1.8.x and higher.
 */
export interface GoogleCloudApigeeV1KeyValueEntry {
  /**
   * Resource URI that can be used to identify the scope of the key value map
   * entries.
   */
  name?: string;
  /**
   * Required. Data or payload that is being retrieved and associated with the
   * unique key.
   */
  value?: string;
}

/**
 * Collection of key/value string pairs.
 */
export interface GoogleCloudApigeeV1KeyValueMap {
  /**
   * Optional. Flag that specifies whether entry values will be encrypted. You
   * must set this value to `true`. Apigee X and hybrid do not support
   * unencrytped key value maps.
   */
  encrypted?: boolean;
  /**
   * Required. ID of the key value map.
   */
  name?: string;
}

/**
 * the response for ListApiCategoriesRequest.
 */
export interface GoogleCloudApigeeV1ListApiCategoriesResponse {
  /**
   * Details of categories.
   */
  data?: GoogleCloudApigeeV1ApiCategoryData[];
  /**
   * ID that can be used to find errors in the log files.
   */
  errorCode?: string;
  /**
   * Description of the operation.
   */
  message?: string;
  /**
   * ID that can be used to find request details in the log files.
   */
  requestId?: string;
  /**
   * Status of the operation.
   */
  status?: string;
}

function serializeGoogleCloudApigeeV1ListApiCategoriesResponse(data: any): GoogleCloudApigeeV1ListApiCategoriesResponse {
  return {
    ...data,
    data: data["data"] !== undefined ? data["data"].map((item: any) => (serializeGoogleCloudApigeeV1ApiCategoryData(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListApiCategoriesResponse(data: any): GoogleCloudApigeeV1ListApiCategoriesResponse {
  return {
    ...data,
    data: data["data"] !== undefined ? data["data"].map((item: any) => (deserializeGoogleCloudApigeeV1ApiCategoryData(item))) : undefined,
  };
}

export interface GoogleCloudApigeeV1ListApiProductsResponse {
  /**
   * Lists all API product names defined for an organization.
   */
  apiProduct?: GoogleCloudApigeeV1ApiProduct[];
}

function serializeGoogleCloudApigeeV1ListApiProductsResponse(data: any): GoogleCloudApigeeV1ListApiProductsResponse {
  return {
    ...data,
    apiProduct: data["apiProduct"] !== undefined ? data["apiProduct"].map((item: any) => (serializeGoogleCloudApigeeV1ApiProduct(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListApiProductsResponse(data: any): GoogleCloudApigeeV1ListApiProductsResponse {
  return {
    ...data,
    apiProduct: data["apiProduct"] !== undefined ? data["apiProduct"].map((item: any) => (deserializeGoogleCloudApigeeV1ApiProduct(item))) : undefined,
  };
}

/**
 * To change this message, in the same CL add a change log in
 * go/changing-api-proto-breaks-ui
 */
export interface GoogleCloudApigeeV1ListApiProxiesResponse {
  proxies?: GoogleCloudApigeeV1ApiProxy[];
}

export interface GoogleCloudApigeeV1ListAppsResponse {
  app?: GoogleCloudApigeeV1App[];
}

function serializeGoogleCloudApigeeV1ListAppsResponse(data: any): GoogleCloudApigeeV1ListAppsResponse {
  return {
    ...data,
    app: data["app"] !== undefined ? data["app"].map((item: any) => (serializeGoogleCloudApigeeV1App(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListAppsResponse(data: any): GoogleCloudApigeeV1ListAppsResponse {
  return {
    ...data,
    app: data["app"] !== undefined ? data["app"].map((item: any) => (deserializeGoogleCloudApigeeV1App(item))) : undefined,
  };
}

/**
 * Response for ListArchiveDeployments method.
 */
export interface GoogleCloudApigeeV1ListArchiveDeploymentsResponse {
  /**
   * Archive Deployments in the specified environment.
   */
  archiveDeployments?: GoogleCloudApigeeV1ArchiveDeployment[];
  /**
   * Page token that you can include in a ListArchiveDeployments request to
   * retrieve the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * The response for ListAsyncQueries.
 */
export interface GoogleCloudApigeeV1ListAsyncQueriesResponse {
  /**
   * The asynchronous queries belong to requested resource name.
   */
  queries?: GoogleCloudApigeeV1AsyncQuery[];
}

function serializeGoogleCloudApigeeV1ListAsyncQueriesResponse(data: any): GoogleCloudApigeeV1ListAsyncQueriesResponse {
  return {
    ...data,
    queries: data["queries"] !== undefined ? data["queries"].map((item: any) => (serializeGoogleCloudApigeeV1AsyncQuery(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListAsyncQueriesResponse(data: any): GoogleCloudApigeeV1ListAsyncQueriesResponse {
  return {
    ...data,
    queries: data["queries"] !== undefined ? data["queries"].map((item: any) => (deserializeGoogleCloudApigeeV1AsyncQuery(item))) : undefined,
  };
}

/**
 * This message encapsulates a list of custom report definitions
 */
export interface GoogleCloudApigeeV1ListCustomReportsResponse {
  qualifier?: GoogleCloudApigeeV1CustomReport[];
}

/**
 * Response for ListDataCollectors.
 */
export interface GoogleCloudApigeeV1ListDataCollectorsResponse {
  /**
   * Data collectors in the specified organization.
   */
  dataCollectors?: GoogleCloudApigeeV1DataCollector[];
  /**
   * Page token that you can include in a ListDataCollectors request to
   * retrieve the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * The response for ListDatastores
 */
export interface GoogleCloudApigeeV1ListDatastoresResponse {
  /**
   * A list of datastores
   */
  datastores?: GoogleCloudApigeeV1Datastore[];
}

export interface GoogleCloudApigeeV1ListDebugSessionsResponse {
  /**
   * Page token that you can include in a ListDebugSessionsRequest to retrieve
   * the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
  /**
   * Session info that includes debug session ID and the first transaction
   * creation timestamp.
   */
  sessions?: GoogleCloudApigeeV1Session[];
}

function serializeGoogleCloudApigeeV1ListDebugSessionsResponse(data: any): GoogleCloudApigeeV1ListDebugSessionsResponse {
  return {
    ...data,
    sessions: data["sessions"] !== undefined ? data["sessions"].map((item: any) => (serializeGoogleCloudApigeeV1Session(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListDebugSessionsResponse(data: any): GoogleCloudApigeeV1ListDebugSessionsResponse {
  return {
    ...data,
    sessions: data["sessions"] !== undefined ? data["sessions"].map((item: any) => (deserializeGoogleCloudApigeeV1Session(item))) : undefined,
  };
}

export interface GoogleCloudApigeeV1ListDeploymentsResponse {
  /**
   * List of deployments.
   */
  deployments?: GoogleCloudApigeeV1Deployment[];
}

function serializeGoogleCloudApigeeV1ListDeploymentsResponse(data: any): GoogleCloudApigeeV1ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (serializeGoogleCloudApigeeV1Deployment(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListDeploymentsResponse(data: any): GoogleCloudApigeeV1ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (deserializeGoogleCloudApigeeV1Deployment(item))) : undefined,
  };
}

export interface GoogleCloudApigeeV1ListDeveloperAppsResponse {
  /**
   * List of developer apps and their credentials.
   */
  app?: GoogleCloudApigeeV1DeveloperApp[];
}

function serializeGoogleCloudApigeeV1ListDeveloperAppsResponse(data: any): GoogleCloudApigeeV1ListDeveloperAppsResponse {
  return {
    ...data,
    app: data["app"] !== undefined ? data["app"].map((item: any) => (serializeGoogleCloudApigeeV1DeveloperApp(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListDeveloperAppsResponse(data: any): GoogleCloudApigeeV1ListDeveloperAppsResponse {
  return {
    ...data,
    app: data["app"] !== undefined ? data["app"].map((item: any) => (deserializeGoogleCloudApigeeV1DeveloperApp(item))) : undefined,
  };
}

/**
 * Response for ListDeveloperSubscriptions.
 */
export interface GoogleCloudApigeeV1ListDeveloperSubscriptionsResponse {
  /**
   * List of all subscriptions.
   */
  developerSubscriptions?: GoogleCloudApigeeV1DeveloperSubscription[];
  /**
   * Value that can be sent as `startKey` to retrieve the next page of content.
   * If this field is omitted, there are no subsequent pages.
   */
  nextStartKey?: string;
}

function serializeGoogleCloudApigeeV1ListDeveloperSubscriptionsResponse(data: any): GoogleCloudApigeeV1ListDeveloperSubscriptionsResponse {
  return {
    ...data,
    developerSubscriptions: data["developerSubscriptions"] !== undefined ? data["developerSubscriptions"].map((item: any) => (serializeGoogleCloudApigeeV1DeveloperSubscription(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListDeveloperSubscriptionsResponse(data: any): GoogleCloudApigeeV1ListDeveloperSubscriptionsResponse {
  return {
    ...data,
    developerSubscriptions: data["developerSubscriptions"] !== undefined ? data["developerSubscriptions"].map((item: any) => (deserializeGoogleCloudApigeeV1DeveloperSubscription(item))) : undefined,
  };
}

/**
 * Response for ListEndpointAttachments method.
 */
export interface GoogleCloudApigeeV1ListEndpointAttachmentsResponse {
  /**
   * Endpoint attachments in the specified organization.
   */
  endpointAttachments?: GoogleCloudApigeeV1EndpointAttachment[];
  /**
   * Page token that you can include in an `ListEndpointAttachments` request to
   * retrieve the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * Response for ListEnvironmentGroupAttachments.
 */
export interface GoogleCloudApigeeV1ListEnvironmentGroupAttachmentsResponse {
  /**
   * EnvironmentGroupAttachments for the specified environment group.
   */
  environmentGroupAttachments?: GoogleCloudApigeeV1EnvironmentGroupAttachment[];
  /**
   * Page token that you can include in a ListEnvironmentGroupAttachments
   * request to retrieve the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * Response for ListEnvironmentGroups.
 */
export interface GoogleCloudApigeeV1ListEnvironmentGroupsResponse {
  /**
   * EnvironmentGroups in the specified organization.
   */
  environmentGroups?: GoogleCloudApigeeV1EnvironmentGroup[];
  /**
   * Page token that you can include in a ListEnvironmentGroups request to
   * retrieve the next page. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * Response for ListEnvironmentResources
 */
export interface GoogleCloudApigeeV1ListEnvironmentResourcesResponse {
  /**
   * List of resources files.
   */
  resourceFile?: GoogleCloudApigeeV1ResourceFile[];
}

/**
 * The response for ListExports
 */
export interface GoogleCloudApigeeV1ListExportsResponse {
  /**
   * Details of the export jobs.
   */
  exports?: GoogleCloudApigeeV1Export[];
}

export interface GoogleCloudApigeeV1ListHybridIssuersResponse {
  /**
   * Lists of hybrid services and its trusted issuer email ids.
   */
  issuers?: GoogleCloudApigeeV1ServiceIssuersMapping[];
}

/**
 * Response for ListInstanceAttachments.
 */
export interface GoogleCloudApigeeV1ListInstanceAttachmentsResponse {
  /**
   * Attachments for the instance.
   */
  attachments?: GoogleCloudApigeeV1InstanceAttachment[];
  /**
   * Page token that you can include in a ListInstanceAttachments request to
   * retrieve the next page of content. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * Response for ListInstances.
 */
export interface GoogleCloudApigeeV1ListInstancesResponse {
  /**
   * Instances in the specified organization.
   */
  instances?: GoogleCloudApigeeV1Instance[];
  /**
   * Page token that you can include in a ListInstance request to retrieve the
   * next page of content. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

/**
 * The request structure for listing key value map keys and its corresponding
 * values.
 */
export interface GoogleCloudApigeeV1ListKeyValueEntriesResponse {
  /**
   * One or more key value map keys and values.
   */
  keyValueEntries?: GoogleCloudApigeeV1KeyValueEntry[];
  /**
   * Token that can be sent as `next_page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response for ListNatAddresses.
 */
export interface GoogleCloudApigeeV1ListNatAddressesResponse {
  /**
   * List of NAT Addresses for the instance.
   */
  natAddresses?: GoogleCloudApigeeV1NatAddress[];
  /**
   * Page token that you can include in a ListNatAddresses request to retrieve
   * the next page of content. If omitted, no subsequent pages exist.
   */
  nextPageToken?: string;
}

export interface GoogleCloudApigeeV1ListOfDevelopersResponse {
  /**
   * List of developers.
   */
  developer?: GoogleCloudApigeeV1Developer[];
}

export interface GoogleCloudApigeeV1ListOrganizationsResponse {
  /**
   * List of Apigee organizations and associated Google Cloud projects.
   */
  organizations?: GoogleCloudApigeeV1OrganizationProjectMapping[];
}

/**
 * Response for ListRatePlans.
 */
export interface GoogleCloudApigeeV1ListRatePlansResponse {
  /**
   * Value that can be sent as `startKey` to retrieve the next page of content.
   * If this field is omitted, there are no subsequent pages.
   */
  nextStartKey?: string;
  /**
   * List of rate plans in an organization.
   */
  ratePlans?: GoogleCloudApigeeV1RatePlan[];
}

function serializeGoogleCloudApigeeV1ListRatePlansResponse(data: any): GoogleCloudApigeeV1ListRatePlansResponse {
  return {
    ...data,
    ratePlans: data["ratePlans"] !== undefined ? data["ratePlans"].map((item: any) => (serializeGoogleCloudApigeeV1RatePlan(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListRatePlansResponse(data: any): GoogleCloudApigeeV1ListRatePlansResponse {
  return {
    ...data,
    ratePlans: data["ratePlans"] !== undefined ? data["ratePlans"].map((item: any) => (deserializeGoogleCloudApigeeV1RatePlan(item))) : undefined,
  };
}

/**
 * Response for ListSecurityIncidents.
 */
export interface GoogleCloudApigeeV1ListSecurityIncidentsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of security incidents in the organization
   */
  securityIncidents?: GoogleCloudApigeeV1SecurityIncident[];
}

function serializeGoogleCloudApigeeV1ListSecurityIncidentsResponse(data: any): GoogleCloudApigeeV1ListSecurityIncidentsResponse {
  return {
    ...data,
    securityIncidents: data["securityIncidents"] !== undefined ? data["securityIncidents"].map((item: any) => (serializeGoogleCloudApigeeV1SecurityIncident(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListSecurityIncidentsResponse(data: any): GoogleCloudApigeeV1ListSecurityIncidentsResponse {
  return {
    ...data,
    securityIncidents: data["securityIncidents"] !== undefined ? data["securityIncidents"].map((item: any) => (deserializeGoogleCloudApigeeV1SecurityIncident(item))) : undefined,
  };
}

/**
 * Response for ListSecurityProfileRevisions.
 */
export interface GoogleCloudApigeeV1ListSecurityProfileRevisionsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of security profile revisions. The revisions may be attached or
   * unattached to any environment.
   */
  securityProfiles?: GoogleCloudApigeeV1SecurityProfile[];
}

/**
 * Response for ListSecurityProfiles.
 */
export interface GoogleCloudApigeeV1ListSecurityProfilesResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of security profiles in the organization. The profiles may be
   * attached or unattached to any environment. This will return latest revision
   * of each profile.
   */
  securityProfiles?: GoogleCloudApigeeV1SecurityProfile[];
}

/**
 * The response for SecurityReports.
 */
export interface GoogleCloudApigeeV1ListSecurityReportsResponse {
  /**
   * If the number of security reports exceeded the page size requested, the
   * token can be used to fetch the next page in a subsequent call. If the
   * response is the last page and there are no more reports to return this
   * field is left empty.
   */
  nextPageToken?: string;
  /**
   * The security reports belong to requested resource name.
   */
  securityReports?: GoogleCloudApigeeV1SecurityReport[];
}

function serializeGoogleCloudApigeeV1ListSecurityReportsResponse(data: any): GoogleCloudApigeeV1ListSecurityReportsResponse {
  return {
    ...data,
    securityReports: data["securityReports"] !== undefined ? data["securityReports"].map((item: any) => (serializeGoogleCloudApigeeV1SecurityReport(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListSecurityReportsResponse(data: any): GoogleCloudApigeeV1ListSecurityReportsResponse {
  return {
    ...data,
    securityReports: data["securityReports"] !== undefined ? data["securityReports"].map((item: any) => (deserializeGoogleCloudApigeeV1SecurityReport(item))) : undefined,
  };
}

/**
 * To change this message, in the same CL add a change log in
 * go/changing-api-proto-breaks-ui
 */
export interface GoogleCloudApigeeV1ListSharedFlowsResponse {
  sharedFlows?: GoogleCloudApigeeV1SharedFlow[];
}

function serializeGoogleCloudApigeeV1ListSharedFlowsResponse(data: any): GoogleCloudApigeeV1ListSharedFlowsResponse {
  return {
    ...data,
    sharedFlows: data["sharedFlows"] !== undefined ? data["sharedFlows"].map((item: any) => (serializeGoogleCloudApigeeV1SharedFlow(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ListSharedFlowsResponse(data: any): GoogleCloudApigeeV1ListSharedFlowsResponse {
  return {
    ...data,
    sharedFlows: data["sharedFlows"] !== undefined ? data["sharedFlows"].map((item: any) => (deserializeGoogleCloudApigeeV1SharedFlow(item))) : undefined,
  };
}

/**
 * Response for ListTraceConfigOverrides.
 */
export interface GoogleCloudApigeeV1ListTraceConfigOverridesResponse {
  /**
   * Token value that can be passed as `page_token` to retrieve the next page
   * of content.
   */
  nextPageToken?: string;
  /**
   * List all trace configuration overrides in an environment.
   */
  traceConfigOverrides?: GoogleCloudApigeeV1TraceConfigOverride[];
}

/**
 * Encapsulates additional information about query execution.
 */
export interface GoogleCloudApigeeV1Metadata {
  /**
   * List of error messages as strings.
   */
  errors?: string[];
  /**
   * List of additional information such as data source, if result was
   * truncated. For example: ``` "notices": [ "Source:Postgres", "PG
   * Host:uappg0rw.e2e.apigeeks.net", "query served
   * by:4b64601e-40de-4eb1-bfb9-eeee7ac929ed", "Table used:
   * edge.api.uapgroup2.agg_api" ]```
   */
  notices?: string[];
}

/**
 * Encapsulates the metric data point. For example: ```{ "name":
 * "sum(message_count)", "values" : [ { "timestamp": 1549004400000, "value":
 * "39.0" }, { "timestamp" : 1548997200000, "value" : "0.0" } ] }``` or ```{
 * "name": "sum(message_count)", "values" : ["39.0"] }```
 */
export interface GoogleCloudApigeeV1Metric {
  /**
   * Metric name.
   */
  name?: string;
  /**
   * List of metric values. Possible value formats include: `"values":["39.0"]`
   * or `"values":[ { "value": "39.0", "timestamp": 1232434354} ]`
   */
  values?: any[];
}

/**
 * The optionally aggregated metric to query with its ordering.
 */
export interface GoogleCloudApigeeV1MetricAggregation {
  /**
   * Aggregation function associated with the metric.
   */
  aggregation?:  | "AGGREGATION_FUNCTION_UNSPECIFIED" | "AVG" | "SUM" | "MIN" | "MAX" | "COUNT_DISTINCT";
  /**
   * Name of the metric
   */
  name?: string;
  /**
   * Ordering for this aggregation in the result. For time series this is
   * ignored since the ordering of points depends only on the timestamp, not the
   * values.
   */
  order?:  | "ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
}

/**
 * Configuration for the Monetization add-on.
 */
export interface GoogleCloudApigeeV1MonetizationConfig {
  /**
   * Flag that specifies whether the Monetization add-on is enabled.
   */
  enabled?: boolean;
}

/**
 * Apigee NAT(network address translation) address. A NAT address is a static
 * external IP address used for Internet egress traffic.
 */
export interface GoogleCloudApigeeV1NatAddress {
  /**
   * Output only. The static IPV4 address.
   */
  readonly ipAddress?: string;
  /**
   * Required. Resource ID of the NAT address.
   */
  name?: string;
  /**
   * Output only. State of the nat address.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "RESERVED" | "ACTIVE" | "DELETING";
}

/**
 * NodeConfig for setting the min/max number of nodes associated with the
 * environment.
 */
export interface GoogleCloudApigeeV1NodeConfig {
  /**
   * Output only. The current total number of gateway nodes that each
   * environment currently has across all instances.
   */
  readonly currentAggregateNodeCount?: bigint;
  /**
   * Optional. The maximum total number of gateway nodes that the is reserved
   * for all instances that has the specified environment. If not specified, the
   * default is determined by the recommended maximum number of nodes for that
   * gateway.
   */
  maxNodeCount?: bigint;
  /**
   * Optional. The minimum total number of gateway nodes that the is reserved
   * for all instances that has the specified environment. If not specified, the
   * default is determined by the recommended minimum number of nodes for that
   * gateway.
   */
  minNodeCount?: bigint;
}

function serializeGoogleCloudApigeeV1NodeConfig(data: any): GoogleCloudApigeeV1NodeConfig {
  return {
    ...data,
    maxNodeCount: data["maxNodeCount"] !== undefined ? String(data["maxNodeCount"]) : undefined,
    minNodeCount: data["minNodeCount"] !== undefined ? String(data["minNodeCount"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1NodeConfig(data: any): GoogleCloudApigeeV1NodeConfig {
  return {
    ...data,
    currentAggregateNodeCount: data["currentAggregateNodeCount"] !== undefined ? BigInt(data["currentAggregateNodeCount"]) : undefined,
    maxNodeCount: data["maxNodeCount"] !== undefined ? BigInt(data["maxNodeCount"]) : undefined,
    minNodeCount: data["minNodeCount"] !== undefined ? BigInt(data["minNodeCount"]) : undefined,
  };
}

/**
 * Represents the pairing of REST resource path and the actions (verbs) allowed
 * on the resource path.
 */
export interface GoogleCloudApigeeV1Operation {
  /**
   * methods refers to the REST verbs as in
   * https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html. When none
   * specified, all verb types are allowed.
   */
  methods?: string[];
  /**
   * Required. REST resource path associated with the API proxy or remote
   * service.
   */
  resource?: string;
}

/**
 * Binds the resources in an API proxy or remote service with the allowed REST
 * methods and associated quota enforcement.
 */
export interface GoogleCloudApigeeV1OperationConfig {
  /**
   * Required. Name of the API proxy or remote service with which the
   * resources, methods, and quota are associated.
   */
  apiSource?: string;
  /**
   * Custom attributes associated with the operation.
   */
  attributes?: GoogleCloudApigeeV1Attribute[];
  /**
   * List of resource/method pairs for the API proxy or remote service to which
   * quota will applied. **Note**: Currently, you can specify only a single
   * resource/method pair. The call will fail if more than one resource/method
   * pair is provided.
   */
  operations?: GoogleCloudApigeeV1Operation[];
  /**
   * Quota parameters to be enforced for the resources, methods, and API source
   * combination. If none are specified, quota enforcement will not be done.
   */
  quota?: GoogleCloudApigeeV1Quota;
}

/**
 * List of operation configuration details associated with Apigee API proxies
 * or remote services. Remote services are non-Apigee proxies, such as
 * Istio-Envoy.
 */
export interface GoogleCloudApigeeV1OperationGroup {
  /**
   * Required. List of operation configurations for either Apigee API proxies
   * or other remote services that are associated with this API product.
   */
  operationConfigs?: GoogleCloudApigeeV1OperationConfig[];
  /**
   * Flag that specifes whether the configuration is for Apigee API proxy or a
   * remote service. Valid values include `proxy` or `remoteservice`. Defaults
   * to `proxy`. Set to `proxy` when Apigee API proxies are associated with the
   * API product. Set to `remoteservice` when non-Apigee proxies like
   * Istio-Envoy are associated with the API product.
   */
  operationConfigType?: string;
}

/**
 * Metadata describing an Operation.
 */
export interface GoogleCloudApigeeV1OperationMetadata {
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "INSERT" | "DELETE" | "UPDATE";
  /**
   * Progress of the operation.
   */
  progress?: GoogleCloudApigeeV1OperationMetadataProgress;
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
  /**
   * Name of the resource for which the operation is operating on.
   */
  targetResourceName?: string;
  /**
   * Warnings encountered while executing the operation.
   */
  warnings?: string[];
}

/**
 * Information about operation progress.
 */
export interface GoogleCloudApigeeV1OperationMetadataProgress {
  /**
   * Description of the operation's progress.
   */
  description?: string;
  /**
   * The additional details of the progress.
   */
  details?: {
    [key: string]: any
  };
  /**
   * The percentage of the operation progress.
   */
  percentDone?: number;
  /**
   * State of the operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "FINISHED";
}

export interface GoogleCloudApigeeV1OptimizedStats {
  /**
   * Wraps the `stats` response for JavaScript Optimized Scenario with a
   * response key. For example: ```{ "Response": { "TimeUnit": [], "metaData": {
   * "errors": [], "notices": [ "Source:Postgres", "Table used:
   * edge.api.aaxgroup001.agg_api", "PG
   * Host:ruappg08-ro.production.apigeeks.net", "query served
   * by:80c4ebca-6a10-4a2e-8faf-c60c1ee306ca" ] }, "resultTruncated": false,
   * "stats": { "data": [ { "identifier": { "names": [ "apiproxy" ], "values": [
   * "sirjee" ] }, "metric": [ { "env": "prod", "name": "sum(message_count)",
   * "values": [ 36.0 ] }, { "env": "prod", "name": "sum(is_error)", "values": [
   * 36.0 ] } ] } ] } } }```
   */
  Response?: GoogleCloudApigeeV1OptimizedStatsResponse;
}

function serializeGoogleCloudApigeeV1OptimizedStats(data: any): GoogleCloudApigeeV1OptimizedStats {
  return {
    ...data,
    Response: data["Response"] !== undefined ? serializeGoogleCloudApigeeV1OptimizedStatsResponse(data["Response"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1OptimizedStats(data: any): GoogleCloudApigeeV1OptimizedStats {
  return {
    ...data,
    Response: data["Response"] !== undefined ? deserializeGoogleCloudApigeeV1OptimizedStatsResponse(data["Response"]) : undefined,
  };
}

/**
 * Encapsulates a data node as represented below: ``` { "identifier": {
 * "names": [ "apiproxy" ], "values": [ "sirjee" ] }, "metric": [ { "env":
 * "prod", "name": "sum(message_count)", "values": [ 36.0 ] } ] }``` or ``` {
 * "env": "prod", "name": "sum(message_count)", "values": [ 36.0 ] }```
 * Depending on whether a dimension is present in the query or not the data node
 * type can be a simple metric value or dimension identifier with list of
 * metrics.
 */
export interface GoogleCloudApigeeV1OptimizedStatsNode {
  data?: any[];
}

/**
 * Encapsulates a response format for JavaScript Optimized Scenario.
 */
export interface GoogleCloudApigeeV1OptimizedStatsResponse {
  /**
   * Metadata information about the query executed.
   */
  metaData?: GoogleCloudApigeeV1Metadata;
  /**
   * Boolean flag that indicates whether the results were truncated based on
   * the limit parameter.
   */
  resultTruncated?: boolean;
  /**
   * `stats` results.
   */
  stats?: GoogleCloudApigeeV1OptimizedStatsNode;
  /**
   * List of time unit values. Time unit refers to an epoch timestamp value.
   */
  TimeUnit?: bigint[];
}

function serializeGoogleCloudApigeeV1OptimizedStatsResponse(data: any): GoogleCloudApigeeV1OptimizedStatsResponse {
  return {
    ...data,
    TimeUnit: data["TimeUnit"] !== undefined ? data["TimeUnit"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1OptimizedStatsResponse(data: any): GoogleCloudApigeeV1OptimizedStatsResponse {
  return {
    ...data,
    TimeUnit: data["TimeUnit"] !== undefined ? data["TimeUnit"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface GoogleCloudApigeeV1Organization {
  /**
   * Addon configurations of the Apigee organization.
   */
  addonsConfig?: GoogleCloudApigeeV1AddonsConfig;
  /**
   * Required. DEPRECATED: This field will be deprecated once Apigee supports
   * DRZ. Primary Google Cloud region for analytics data storage. For valid
   * values, see [Create an Apigee
   * organization](https://cloud.google.com/apigee/docs/api-platform/get-started/create-org).
   */
  analyticsRegion?: string;
  /**
   * Output only. Apigee Project ID associated with the organization. Use this
   * project to allowlist Apigee in the Service Attachment when using private
   * service connect with Apigee.
   */
  readonly apigeeProjectId?: string;
  /**
   * Not used by Apigee.
   */
  attributes?: string[];
  /**
   * Compute Engine network used for Service Networking to be peered with
   * Apigee runtime instances. See [Getting started with the Service Networking
   * API](https://cloud.google.com/service-infrastructure/docs/service-networking/getting-started).
   * Valid only when [RuntimeType](#RuntimeType) is set to `CLOUD`. The value
   * must be set before the creation of a runtime instance and can be updated
   * only when there are no runtime instances. For example: `default`. Apigee
   * also supports shared VPC (that is, the host network project is not the same
   * as the one that is peering with Apigee). See [Shared VPC
   * overview](https://cloud.google.com/vpc/docs/shared-vpc). To use a shared
   * VPC network, use the following format:
   * `projects/{host-project-id}/{region}/networks/{network-name}`. For example:
   * `projects/my-sharedvpc-host/global/networks/mynetwork` **Note:** Not
   * supported for Apigee hybrid.
   */
  authorizedNetwork?: string;
  /**
   * Billing type of the Apigee organization. See [Apigee
   * pricing](https://cloud.google.com/apigee/pricing).
   */
  billingType?:  | "BILLING_TYPE_UNSPECIFIED" | "SUBSCRIPTION" | "EVALUATION" | "PAYG";
  /**
   * Output only. Base64-encoded public certificate for the root CA of the
   * Apigee organization. Valid only when [RuntimeType](#RuntimeType) is
   * `CLOUD`.
   */
  readonly caCertificate?: Uint8Array;
  /**
   * Output only. Time that the Apigee organization was created in milliseconds
   * since epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Not used by Apigee.
   */
  customerName?: string;
  /**
   * Description of the Apigee organization.
   */
  description?: string;
  /**
   * Display name for the Apigee organization. Unused, but reserved for future
   * use.
   */
  displayName?: string;
  /**
   * Output only. List of environments in the Apigee organization.
   */
  readonly environments?: string[];
  /**
   * Output only. Time that the Apigee organization is scheduled for deletion.
   */
  readonly expiresAt?: bigint;
  /**
   * Output only. Time that the Apigee organization was last modified in
   * milliseconds since epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Output only. Name of the Apigee organization.
   */
  readonly name?: string;
  /**
   * Configuration for the Portals settings.
   */
  portalDisabled?: boolean;
  /**
   * Output only. Project ID associated with the Apigee organization.
   */
  readonly projectId?: string;
  /**
   * Properties defined in the Apigee organization profile.
   */
  properties?: GoogleCloudApigeeV1Properties;
  /**
   * Cloud KMS key name used for encrypting the data that is stored and
   * replicated across runtime instances. Update is not allowed after the
   * organization is created. Required when [RuntimeType](#RuntimeType) is
   * `CLOUD`. If not specified when [RuntimeType](#RuntimeType) is `TRIAL`, a
   * Google-Managed encryption key will be used. For example:
   * "projects/foo/locations/us/keyRings/bar/cryptoKeys/baz". **Note:** Not
   * supported for Apigee hybrid.
   */
  runtimeDatabaseEncryptionKeyName?: string;
  /**
   * Required. Runtime type of the Apigee organization based on the Apigee
   * subscription purchased.
   */
  runtimeType?:  | "RUNTIME_TYPE_UNSPECIFIED" | "CLOUD" | "HYBRID";
  /**
   * Output only. State of the organization. Values other than ACTIVE means the
   * resource is not ready to use.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
  /**
   * Output only. DEPRECATED: This will eventually be replaced by BillingType.
   * Subscription type of the Apigee organization. Valid values include trial
   * (free, limited, and for evaluation purposes only) or paid (full
   * subscription has been purchased). See [Apigee
   * pricing](https://cloud.google.com/apigee/pricing/).
   */
  readonly subscriptionType?:  | "SUBSCRIPTION_TYPE_UNSPECIFIED" | "PAID" | "TRIAL";
  /**
   * Not used by Apigee.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_TRIAL" | "TYPE_PAID" | "TYPE_INTERNAL";
}

export interface GoogleCloudApigeeV1OrganizationProjectMapping {
  /**
   * Output only. The Google Cloud region where control plane data is located.
   * For more information, see https://cloud.google.com/about/locations/.
   */
  readonly location?: string;
  /**
   * Name of the Apigee organization.
   */
  organization?: string;
  /**
   * Google Cloud project associated with the Apigee organization
   */
  projectId?: string;
  /**
   * DEPRECATED: Use `project_id`. An Apigee Organization is mapped to a single
   * project.
   */
  projectIds?: string[];
}

export interface GoogleCloudApigeeV1PodStatus {
  /**
   * Version of the application running in the pod.
   */
  appVersion?: string;
  /**
   * Status of the deployment. Valid values include: - `deployed`: Successful.
   * - `error` : Failed. - `pending` : Pod has not yet reported on the
   * deployment.
   */
  deploymentStatus?: string;
  /**
   * Time the deployment status was reported in milliseconds since epoch.
   */
  deploymentStatusTime?: bigint;
  /**
   * Time the proxy was deployed in milliseconds since epoch.
   */
  deploymentTime?: bigint;
  /**
   * Name of the pod which is reporting the status.
   */
  podName?: string;
  /**
   * Overall status of the pod (not this specific deployment). Valid values
   * include: - `active`: Up to date. - `stale` : Recently out of date. Pods
   * that have not reported status in a long time are excluded from the output.
   */
  podStatus?: string;
  /**
   * Time the pod status was reported in milliseconds since epoch.
   */
  podStatusTime?: bigint;
  /**
   * Code associated with the deployment status.
   */
  statusCode?: string;
  /**
   * Human-readable message associated with the status code.
   */
  statusCodeDetails?: string;
}

function serializeGoogleCloudApigeeV1PodStatus(data: any): GoogleCloudApigeeV1PodStatus {
  return {
    ...data,
    deploymentStatusTime: data["deploymentStatusTime"] !== undefined ? String(data["deploymentStatusTime"]) : undefined,
    deploymentTime: data["deploymentTime"] !== undefined ? String(data["deploymentTime"]) : undefined,
    podStatusTime: data["podStatusTime"] !== undefined ? String(data["podStatusTime"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1PodStatus(data: any): GoogleCloudApigeeV1PodStatus {
  return {
    ...data,
    deploymentStatusTime: data["deploymentStatusTime"] !== undefined ? BigInt(data["deploymentStatusTime"]) : undefined,
    deploymentTime: data["deploymentTime"] !== undefined ? BigInt(data["deploymentTime"]) : undefined,
    podStatusTime: data["podStatusTime"] !== undefined ? BigInt(data["podStatusTime"]) : undefined,
  };
}

/**
 * Point is a group of information collected by runtime plane at critical
 * points of the message flow of the processed API request. This is a list of
 * supported point IDs, categorized to three major buckets. For each category,
 * debug points that we are currently supporting are listed below: - Flow status
 * debug points: StateChange FlowInfo Condition Execution DebugMask Error - Flow
 * control debug points: FlowCallout Paused Resumed FlowReturn BreakFlow Error -
 * Runtime debug points: ScriptExecutor FlowCalloutStepDefinition CustomTarget
 * StepDefinition Oauth2ServicePoint RaiseFault NodeJS The detail information of
 * the given debug point is stored in a list of results.
 */
export interface GoogleCloudApigeeV1Point {
  /**
   * Name of a step in the transaction.
   */
  id?: string;
  /**
   * List of results extracted from a given debug point.
   */
  results?: GoogleCloudApigeeV1Result[];
}

/**
 * Message for compatibility with legacy Edge specification for Java Properties
 * object in JSON.
 */
export interface GoogleCloudApigeeV1Properties {
  /**
   * List of all properties in the object
   */
  property?: GoogleCloudApigeeV1Property[];
}

/**
 * A single property entry in the Properties message.
 */
export interface GoogleCloudApigeeV1Property {
  /**
   * The property key
   */
  name?: string;
  /**
   * The property value
   */
  value?: string;
}

/**
 * Request for ProvisionOrganization.
 */
export interface GoogleCloudApigeeV1ProvisionOrganizationRequest {
  /**
   * Primary Cloud Platform region for analytics data storage. For valid
   * values, see [Create an
   * organization](https://cloud.google.com/apigee/docs/hybrid/latest/precog-provision).
   * Defaults to `us-west1`.
   */
  analyticsRegion?: string;
  /**
   * Name of the customer project's VPC network. If provided, the network needs
   * to be peered through Service Networking. If none is provided, the
   * organization will have access only to the public internet.
   */
  authorizedNetwork?: string;
  /**
   * Cloud Platform location for the runtime instance. Defaults to zone
   * `us-west1-a`. If a region is provided, `EVAL` organizations will use the
   * region for automatically selecting a zone for the runtime instance.
   */
  runtimeLocation?: string;
}

export interface GoogleCloudApigeeV1Query {
  /**
   * Delimiter used in the CSV file, if `outputFormat` is set to `csv`.
   * Defaults to the `,` (comma) character. Supported delimiter characters
   * include comma (`,`), pipe (`|`), and tab (`\t`).
   */
  csvDelimiter?: string;
  /**
   * A list of dimensions.
   * https://docs.apigee.com/api-platform/analytics/analytics-reference#dimensions
   */
  dimensions?: string[];
  /**
   * Hostname needs to be specified if query intends to run at host level. This
   * field is only allowed when query is submitted by CreateHostAsyncQuery where
   * analytics data will be grouped by organization and hostname.
   */
  envgroupHostname?: string;
  /**
   * Boolean expression that can be used to filter data. Filter expressions can
   * be combined using AND/OR terms and should be fully parenthesized to avoid
   * ambiguity. See Analytics metrics, dimensions, and filters reference
   * https://docs.apigee.com/api-platform/analytics/analytics-reference for more
   * information on the fields available to filter on. For more information on
   * the tokens that you use to build filter expressions, see Filter expression
   * syntax.
   * https://docs.apigee.com/api-platform/analytics/asynch-reports-api#filter-expression-syntax
   */
  filter?: string;
  /**
   * Time unit used to group the result set. Valid values include: second,
   * minute, hour, day, week, or month. If a query includes groupByTimeUnit,
   * then the result is an aggregation based on the specified time unit and the
   * resultant timestamp does not include milliseconds precision. If a query
   * omits groupByTimeUnit, then the resultant timestamp includes milliseconds
   * precision.
   */
  groupByTimeUnit?: string;
  /**
   * Maximum number of rows that can be returned in the result.
   */
  limit?: number;
  /**
   * A list of Metrics.
   */
  metrics?: GoogleCloudApigeeV1QueryMetric[];
  /**
   * Asynchronous Query Name.
   */
  name?: string;
  /**
   * Valid values include: `csv` or `json`. Defaults to `json`. Note: Configure
   * the delimiter for CSV output using the csvDelimiter property.
   */
  outputFormat?: string;
  /**
   * Asynchronous Report ID.
   */
  reportDefinitionId?: string;
  /**
   * Required. Time range for the query. Can use the following predefined
   * strings to specify the time range: `last60minutes` `last24hours`
   * `last7days` Or, specify the timeRange as a structure describing start and
   * end timestamps in the ISO format: yyyy-mm-ddThh:mm:ssZ. Example:
   * "timeRange": { "start": "2018-07-29T00:13:00Z", "end":
   * "2018-08-01T00:18:00Z" }
   */
  timeRange?: any;
}

export interface GoogleCloudApigeeV1QueryMetadata {
  /**
   * Dimensions of the AsyncQuery.
   */
  dimensions?: string[];
  /**
   * End timestamp of the query range.
   */
  endTimestamp?: string;
  /**
   * Metrics of the AsyncQuery. Example:
   * ["name:message_count,func:sum,alias:sum_message_count"]
   */
  metrics?: string[];
  /**
   * Output format.
   */
  outputFormat?: string;
  /**
   * Start timestamp of the query range.
   */
  startTimestamp?: string;
  /**
   * Query GroupBy time unit.
   */
  timeUnit?: string;
}

/**
 * More info about Metric:
 * https://docs.apigee.com/api-platform/analytics/analytics-reference#metrics
 */
export interface GoogleCloudApigeeV1QueryMetric {
  /**
   * Alias for the metric. Alias will be used to replace metric name in query
   * results.
   */
  alias?: string;
  /**
   * Aggregation function: avg, min, max, or sum.
   */
  function?: string;
  /**
   * Required. Metric name.
   */
  name?: string;
  /**
   * One of `+`, `-`, `/`, `%`, `*`.
   */
  operator?: string;
  /**
   * Operand value should be provided when operator is set.
   */
  value?: string;
}

/**
 * Request payload representing the query to be run for fetching security
 * statistics as rows.
 */
export interface GoogleCloudApigeeV1QueryTabularStatsRequest {
  /**
   * Required. List of dimension names to group the aggregations by.
   */
  dimensions?: string[];
  /**
   * Filter further on specific dimension values. Follows the same grammar as
   * custom report's filter expressions. Example, apiproxy eq 'foobar'.
   * https://cloud.google.com/apigee/docs/api-platform/analytics/analytics-reference#filters
   */
  filter?: string;
  /**
   * Required. List of metrics and their aggregations.
   */
  metrics?: GoogleCloudApigeeV1MetricAggregation[];
  /**
   * Page size represents the number of rows.
   */
  pageSize?: number;
  /**
   * Identifies a sequence of rows.
   */
  pageToken?: string;
  /**
   * Time range for the stats.
   */
  timeRange?: GoogleTypeInterval;
}

function serializeGoogleCloudApigeeV1QueryTabularStatsRequest(data: any): GoogleCloudApigeeV1QueryTabularStatsRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? serializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1QueryTabularStatsRequest(data: any): GoogleCloudApigeeV1QueryTabularStatsRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? deserializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

/**
 * Encapsulates two kinds of stats that are results of the dimensions and
 * aggregations requested. - Tabular rows. - Time series data. Example of
 * tabular rows, Represents security stats results as a row of flat values.
 */
export interface GoogleCloudApigeeV1QueryTabularStatsResponse {
  /**
   * Column names corresponding to the same order as the inner values in the
   * stats field.
   */
  columns?: string[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Resultant rows from the executed query.
   */
  values?: any[][];
}

/**
 * QueryTimeSeriesStatsRequest represents a query that returns a collection of
 * time series sequences grouped by their values.
 */
export interface GoogleCloudApigeeV1QueryTimeSeriesStatsRequest {
  /**
   * List of dimension names to group the aggregations by. If no dimensions are
   * passed, a single trend line representing the requested metric aggregations
   * grouped by environment is returned.
   */
  dimensions?: string[];
  /**
   * Filter further on specific dimension values. Follows the same grammar as
   * custom report's filter expressions. Example, apiproxy eq 'foobar'.
   * https://cloud.google.com/apigee/docs/api-platform/analytics/analytics-reference#filters
   */
  filter?: string;
  /**
   * Required. List of metrics and their aggregations.
   */
  metrics?: GoogleCloudApigeeV1MetricAggregation[];
  /**
   * Page size represents the number of time series sequences, one per unique
   * set of dimensions and their values.
   */
  pageSize?: number;
  /**
   * Page token stands for a specific collection of time series sequences.
   */
  pageToken?: string;
  /**
   * Required. Time range for the stats.
   */
  timeRange?: GoogleTypeInterval;
  /**
   * Order the sequences in increasing or decreasing order of timestamps.
   * Default is descending order of timestamps (latest first).
   */
  timestampOrder?:  | "ORDER_UNSPECIFIED" | "ASCENDING" | "DESCENDING";
  /**
   * Time buckets to group the stats by.
   */
  windowSize?:  | "WINDOW_SIZE_UNSPECIFIED" | "MINUTE" | "HOUR" | "DAY" | "MONTH";
}

function serializeGoogleCloudApigeeV1QueryTimeSeriesStatsRequest(data: any): GoogleCloudApigeeV1QueryTimeSeriesStatsRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? serializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1QueryTimeSeriesStatsRequest(data: any): GoogleCloudApigeeV1QueryTimeSeriesStatsRequest {
  return {
    ...data,
    timeRange: data["timeRange"] !== undefined ? deserializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

/**
 * Represents security stats result as a collection of time series sequences.
 */
export interface GoogleCloudApigeeV1QueryTimeSeriesStatsResponse {
  /**
   * Column names corresponding to the same order as the inner values in the
   * stats field.
   */
  columns?: string[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Results of the query returned as a JSON array.
   */
  values?: GoogleCloudApigeeV1QueryTimeSeriesStatsResponseSequence[];
}

/**
 * A sequence of time series.
 */
export interface GoogleCloudApigeeV1QueryTimeSeriesStatsResponseSequence {
  /**
   * Map of dimensions and their values that uniquely identifies a time series
   * sequence.
   */
  dimensions?: {
    [key: string]: string
  };
  /**
   * List of points. First value of each inner list is a timestamp.
   */
  points?: any[][];
}

/**
 * Quota contains the essential parameters needed that can be applied on the
 * resources, methods, API source combination associated with this API product.
 * While Quota is optional, setting it prevents requests from exceeding the
 * provisioned parameters.
 */
export interface GoogleCloudApigeeV1Quota {
  /**
   * Required. Time interval over which the number of request messages is
   * calculated.
   */
  interval?: string;
  /**
   * Required. Upper limit allowed for the time interval and time unit
   * specified. Requests exceeding this limit will be rejected.
   */
  limit?: string;
  /**
   * Time unit defined for the `interval`. Valid values include `minute`,
   * `hour`, `day`, or `month`. If `limit` and `interval` are valid, the default
   * value is `hour`; otherwise, the default is null.
   */
  timeUnit?: string;
}

/**
 * Rate plan details.
 */
export interface GoogleCloudApigeeV1RatePlan {
  /**
   * Name of the API product that the rate plan is associated with.
   */
  apiproduct?: string;
  /**
   * Frequency at which the customer will be billed.
   */
  billingPeriod?:  | "BILLING_PERIOD_UNSPECIFIED" | "WEEKLY" | "MONTHLY";
  /**
   * API call volume ranges and the fees charged when the total number of API
   * calls is within a given range. The method used to calculate the final fee
   * depends on the selected pricing model. For example, if the pricing model is
   * `STAIRSTEP` and the ranges are defined as follows: ``` { "start": 1, "end":
   * 100, "fee": 75 }, { "start": 101, "end": 200, "fee": 100 }, } ``` Then the
   * following fees would be charged based on the total number of API calls
   * (assuming the currency selected is `USD`): * 1 call costs $75 * 50 calls
   * cost $75 * 150 calls cost $100 The number of API calls cannot exceed 200.
   */
  consumptionPricingRates?: GoogleCloudApigeeV1RateRange[];
  /**
   * Pricing model used for consumption-based charges.
   */
  consumptionPricingType?:  | "CONSUMPTION_PRICING_TYPE_UNSPECIFIED" | "FIXED_PER_UNIT" | "BANDED" | "TIERED" | "STAIRSTEP";
  /**
   * Output only. Time that the rate plan was created in milliseconds since
   * epoch.
   */
  readonly createdAt?: bigint;
  /**
   * Currency to be used for billing. Consists of a three-letter code as
   * defined by the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) standard.
   */
  currencyCode?: string;
  /**
   * Description of the rate plan.
   */
  description?: string;
  /**
   * Display name of the rate plan.
   */
  displayName?: string;
  /**
   * Time when the rate plan will expire in milliseconds since epoch. Set to 0
   * or `null` to indicate that the rate plan should never expire.
   */
  endTime?: bigint;
  /**
   * Frequency at which the fixed fee is charged.
   */
  fixedFeeFrequency?: number;
  /**
   * Fixed amount that is charged at a defined interval and billed in advance
   * of use of the API product. The fee will be prorated for the first billing
   * period.
   */
  fixedRecurringFee?: GoogleTypeMoney;
  /**
   * Output only. Time the rate plan was last modified in milliseconds since
   * epoch.
   */
  readonly lastModifiedAt?: bigint;
  /**
   * Output only. Name of the rate plan.
   */
  readonly name?: string;
  /**
   * DEPRECATED: This field is no longer supported and will eventually be
   * removed when Apigee Hybrid 1.5/1.6 is no longer supported. Instead, use the
   * `billingType` field inside `DeveloperMonetizationConfig` resource. Flag
   * that specifies the billing account type, prepaid or postpaid.
   */
  paymentFundingModel?:  | "PAYMENT_FUNDING_MODEL_UNSPECIFIED" | "PREPAID" | "POSTPAID";
  /**
   * Details of the revenue sharing model.
   */
  revenueShareRates?: GoogleCloudApigeeV1RevenueShareRange[];
  /**
   * Method used to calculate the revenue that is shared with developers.
   */
  revenueShareType?:  | "REVENUE_SHARE_TYPE_UNSPECIFIED" | "FIXED" | "VOLUME_BANDED";
  /**
   * Initial, one-time fee paid when purchasing the API product.
   */
  setupFee?: GoogleTypeMoney;
  /**
   * Time when the rate plan becomes active in milliseconds since epoch.
   */
  startTime?: bigint;
  /**
   * Current state of the rate plan (draft or published).
   */
  state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "PUBLISHED";
}

function serializeGoogleCloudApigeeV1RatePlan(data: any): GoogleCloudApigeeV1RatePlan {
  return {
    ...data,
    consumptionPricingRates: data["consumptionPricingRates"] !== undefined ? data["consumptionPricingRates"].map((item: any) => (serializeGoogleCloudApigeeV1RateRange(item))) : undefined,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    fixedRecurringFee: data["fixedRecurringFee"] !== undefined ? serializeGoogleTypeMoney(data["fixedRecurringFee"]) : undefined,
    revenueShareRates: data["revenueShareRates"] !== undefined ? data["revenueShareRates"].map((item: any) => (serializeGoogleCloudApigeeV1RevenueShareRange(item))) : undefined,
    setupFee: data["setupFee"] !== undefined ? serializeGoogleTypeMoney(data["setupFee"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RatePlan(data: any): GoogleCloudApigeeV1RatePlan {
  return {
    ...data,
    consumptionPricingRates: data["consumptionPricingRates"] !== undefined ? data["consumptionPricingRates"].map((item: any) => (deserializeGoogleCloudApigeeV1RateRange(item))) : undefined,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    fixedRecurringFee: data["fixedRecurringFee"] !== undefined ? deserializeGoogleTypeMoney(data["fixedRecurringFee"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
    revenueShareRates: data["revenueShareRates"] !== undefined ? data["revenueShareRates"].map((item: any) => (deserializeGoogleCloudApigeeV1RevenueShareRange(item))) : undefined,
    setupFee: data["setupFee"] !== undefined ? deserializeGoogleTypeMoney(data["setupFee"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * API call volume range and the fees charged when the total number of API
 * calls is within the range.
 */
export interface GoogleCloudApigeeV1RateRange {
  /**
   * Ending value of the range. Set to 0 or `null` for the last range of
   * values.
   */
  end?: bigint;
  /**
   * Fee to charge when total number of API calls falls within this range.
   */
  fee?: GoogleTypeMoney;
  /**
   * Starting value of the range. Set to 0 or `null` for the initial range of
   * values.
   */
  start?: bigint;
}

function serializeGoogleCloudApigeeV1RateRange(data: any): GoogleCloudApigeeV1RateRange {
  return {
    ...data,
    end: data["end"] !== undefined ? String(data["end"]) : undefined,
    fee: data["fee"] !== undefined ? serializeGoogleTypeMoney(data["fee"]) : undefined,
    start: data["start"] !== undefined ? String(data["start"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RateRange(data: any): GoogleCloudApigeeV1RateRange {
  return {
    ...data,
    end: data["end"] !== undefined ? BigInt(data["end"]) : undefined,
    fee: data["fee"] !== undefined ? deserializeGoogleTypeMoney(data["fee"]) : undefined,
    start: data["start"] !== undefined ? BigInt(data["start"]) : undefined,
  };
}

/**
 * A Reference configuration. References must refer to a keystore that also
 * exists in the parent environment.
 */
export interface GoogleCloudApigeeV1Reference {
  /**
   * Optional. A human-readable description of this reference.
   */
  description?: string;
  /**
   * Required. The resource id of this reference. Values must match the regular
   * expression [\w\s\-.]+.
   */
  name?: string;
  /**
   * Required. The id of the resource to which this reference refers. Must be
   * the id of a resource that exists in the parent environment and is of the
   * given resource_type.
   */
  refers?: string;
  /**
   * The type of resource referred to by this reference. Valid values are
   * 'KeyStore' or 'TrustStore'.
   */
  resourceType?: string;
}

export interface GoogleCloudApigeeV1ReferenceConfig {
  /**
   * Name of the reference in the following format:
   * `organizations/{org}/environments/{env}/references/{reference}`
   */
  name?: string;
  /**
   * Name of the referenced resource in the following format:
   * `organizations/{org}/environments/{env}/keystores/{keystore}` Only
   * references to keystore resources are supported.
   */
  resourceName?: string;
}

/**
 * Request for ReportInstanceStatus.
 */
export interface GoogleCloudApigeeV1ReportInstanceStatusRequest {
  /**
   * A unique ID for the instance which is guaranteed to be unique in case the
   * user installs multiple hybrid runtimes with the same instance ID.
   */
  instanceUid?: string;
  /**
   * The time the report was generated in the runtime. Used to prevent an old
   * status from overwriting a newer one. An instance should space out it's
   * status reports so that clock skew does not play a factor.
   */
  reportTime?: Date;
  /**
   * Status for config resources
   */
  resources?: GoogleCloudApigeeV1ResourceStatus[];
}

function serializeGoogleCloudApigeeV1ReportInstanceStatusRequest(data: any): GoogleCloudApigeeV1ReportInstanceStatusRequest {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? data["reportTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ReportInstanceStatusRequest(data: any): GoogleCloudApigeeV1ReportInstanceStatusRequest {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? new Date(data["reportTime"]) : undefined,
  };
}

/**
 * Placeholder for future enhancements to status reporting protocol
 */
export interface GoogleCloudApigeeV1ReportInstanceStatusResponse {
}

export interface GoogleCloudApigeeV1ReportProperty {
  /**
   * name of the property
   */
  property?: string;
  /**
   * property values
   */
  value?: GoogleCloudApigeeV1Attribute[];
}

export interface GoogleCloudApigeeV1ResourceConfig {
  /**
   * Location of the resource as a URI.
   */
  location?: string;
  /**
   * Resource name in the following format:
   * `organizations/{org}/environments/{env}/resourcefiles/{type}/{file}/revisions/{rev}`
   * Only environment-scoped resource files are supported.
   */
  name?: string;
}

/**
 * Metadata about a resource file.
 */
export interface GoogleCloudApigeeV1ResourceFile {
  /**
   * ID of the resource file.
   */
  name?: string;
  /**
   * Resource file type. {{ resource_file_type }}
   */
  type?: string;
}

/**
 * List of resource files.
 */
export interface GoogleCloudApigeeV1ResourceFiles {
  /**
   * List of resource files.
   */
  resourceFile?: GoogleCloudApigeeV1ResourceFile[];
}

/**
 * The status of a resource loaded in the runtime.
 */
export interface GoogleCloudApigeeV1ResourceStatus {
  /**
   * The resource name. Currently only two resources are supported:
   * EnvironmentGroup - organizations/{org}/envgroups/{envgroup}
   * EnvironmentConfig -
   * organizations/{org}/environments/{environment}/deployedConfig
   */
  resource?: string;
  /**
   * Revisions of the resource currently deployed in the instance.
   */
  revisions?: GoogleCloudApigeeV1RevisionStatus[];
  /**
   * The total number of replicas that should have this resource.
   */
  totalReplicas?: number;
  /**
   * The uid of the resource. In the unexpected case that the instance has
   * multiple uids for the same name, they should be reported under separate
   * ResourceStatuses.
   */
  uid?: string;
}

/**
 * Result is short for "action result", could be different types identified by
 * "action_result" field. Supported types: 1. DebugInfo : generic debug info
 * collected by runtime recorded as a list of properties. For example, the
 * contents could be virtual host info, state change result, or execution
 * metadata. Required fields : properties, timestamp 2. RequestMessage:
 * information of a http request. Contains headers, request URI and http methods
 * type.Required fields : headers, uri, verb 3. ResponseMessage: information of
 * a http response. Contains headers, reason phrase and http status code.
 * Required fields : headers, reasonPhrase, statusCode 4. ErrorMessage:
 * information of a http error message. Contains detail error message, reason
 * phrase and status code. Required fields : content, headers, reasonPhrase,
 * statusCode 5. VariableAccess: a list of variable access actions, can be Get,
 * Set and Remove. Required fields : accessList
 */
export interface GoogleCloudApigeeV1Result {
  /**
   * A list of variable access actions agaist the api proxy. Supported values:
   * Get, Set, Remove.
   */
  accessList?: GoogleCloudApigeeV1Access[];
  /**
   * Type of the action result. Can be one of the five: DebugInfo,
   * RequestMessage, ResponseMessage, ErrorMessage, VariableAccess
   */
  ActionResult?: string;
  /**
   * Error message content. for example, "content" :
   * "{\"fault\":{\"faultstring\":\"API timed
   * out\",\"detail\":{\"errorcode\":\"flow.APITimedOut\"}}}"
   */
  content?: string;
  /**
   * A list of HTTP headers. for example, '"headers" : [ { "name" :
   * "Content-Length", "value" : "83" }, { "name" : "Content-Type", "value" :
   * "application/json" } ]'
   */
  headers?: GoogleCloudApigeeV1Property[];
  /**
   * Name value pairs used for DebugInfo ActionResult.
   */
  properties?: GoogleCloudApigeeV1Properties;
  /**
   * HTTP response phrase
   */
  reasonPhrase?: string;
  /**
   * HTTP response code
   */
  statusCode?: string;
  /**
   * Timestamp of when the result is recorded. Its format is dd-mm-yy
   * hh:mm:ss:xxx. For example, `"timestamp" : "12-08-19 00:31:59:960"`
   */
  timestamp?: string;
  /**
   * The relative path of the api proxy. for example, `"uRI" : "/iloveapis"`
   */
  uRI?: string;
  /**
   * HTTP method verb
   */
  verb?: string;
}

/**
 * API call volume range and the percentage of revenue to share with the
 * developer when the total number of API calls is within the range.
 */
export interface GoogleCloudApigeeV1RevenueShareRange {
  /**
   * Ending value of the range. Set to 0 or `null` for the last range of
   * values.
   */
  end?: bigint;
  /**
   * Percentage of the revenue to be shared with the developer. For example, to
   * share 21 percent of the total revenue with the developer, set this value to
   * 21. Specify a decimal number with a maximum of two digits following the
   * decimal point.
   */
  sharePercentage?: number;
  /**
   * Starting value of the range. Set to 0 or `null` for the initial range of
   * values.
   */
  start?: bigint;
}

function serializeGoogleCloudApigeeV1RevenueShareRange(data: any): GoogleCloudApigeeV1RevenueShareRange {
  return {
    ...data,
    end: data["end"] !== undefined ? String(data["end"]) : undefined,
    start: data["start"] !== undefined ? String(data["start"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RevenueShareRange(data: any): GoogleCloudApigeeV1RevenueShareRange {
  return {
    ...data,
    end: data["end"] !== undefined ? BigInt(data["end"]) : undefined,
    start: data["start"] !== undefined ? BigInt(data["start"]) : undefined,
  };
}

/**
 * The status of a specific resource revision.
 */
export interface GoogleCloudApigeeV1RevisionStatus {
  /**
   * Errors reported when attempting to load this revision.
   */
  errors?: GoogleCloudApigeeV1UpdateError[];
  /**
   * The json content of the resource revision. Large specs should be sent
   * individually via the spec field to avoid hitting request size limits.
   */
  jsonSpec?: string;
  /**
   * The number of replicas that have successfully loaded this revision.
   */
  replicas?: number;
  /**
   * The revision of the resource.
   */
  revisionId?: string;
}

export interface GoogleCloudApigeeV1RoutingRule {
  /**
   * URI path prefix used to route to the specified environment. May contain
   * one or more wildcards. For example, path segments consisting of a single
   * `*` character will match any string.
   */
  basepath?: string;
  /**
   * Name of a deployment group in an environment bound to the environment
   * group in the following format:
   * `organizations/{org}/environment/{env}/deploymentGroups/{group}` Only one
   * of environment or deployment_group will be set.
   */
  deploymentGroup?: string;
  /**
   * The env group config revision_id when this rule was added or last updated.
   * This value is set when the rule is created and will only update if the the
   * environment_id changes. It is used to determine if the runtime is up to
   * date with respect to this rule. This field is omitted from the
   * IngressConfig unless the GetDeployedIngressConfig API is called with
   * view=FULL.
   */
  envGroupRevision?: bigint;
  /**
   * Name of an environment bound to the environment group in the following
   * format: `organizations/{org}/environments/{env}`. Only one of environment
   * or deployment_group will be set.
   */
  environment?: string;
  /**
   * Conflicting targets, which will be resource names specifying either
   * deployment groups or environments.
   */
  otherTargets?: string[];
  /**
   * The resource name of the proxy revision that is receiving this basepath in
   * the following format: `organizations/{org}/apis/{api}/revisions/{rev}`.
   * This field is omitted from the IngressConfig unless the
   * GetDeployedIngressConfig API is called with view=FULL.
   */
  receiver?: string;
  /**
   * The unix timestamp when this rule was updated. This is updated whenever
   * env_group_revision is updated. This field is omitted from the IngressConfig
   * unless the GetDeployedIngressConfig API is called with view=FULL.
   */
  updateTime?: Date;
}

function serializeGoogleCloudApigeeV1RoutingRule(data: any): GoogleCloudApigeeV1RoutingRule {
  return {
    ...data,
    envGroupRevision: data["envGroupRevision"] !== undefined ? String(data["envGroupRevision"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RoutingRule(data: any): GoogleCloudApigeeV1RoutingRule {
  return {
    ...data,
    envGroupRevision: data["envGroupRevision"] !== undefined ? BigInt(data["envGroupRevision"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Runtime configuration for the organization. Response for GetRuntimeConfig.
 */
export interface GoogleCloudApigeeV1RuntimeConfig {
  /**
   * Cloud Storage bucket used for uploading Analytics records.
   */
  analyticsBucket?: string;
  /**
   * Name of the resource in the following format:
   * `organizations/{org}/runtimeConfig`.
   */
  name?: string;
  /**
   * Output only. Tenant project ID associated with the Apigee organization.
   * The tenant project is used to host Google-managed resources that are
   * dedicated to this Apigee organization. Clients have limited access to
   * resources within the tenant project used to support Apigee runtime
   * instances. Access to the tenant project is managed using
   * SetSyncAuthorization. It can be empty if the tenant project hasn't been
   * created yet.
   */
  readonly tenantProjectId?: string;
  /**
   * Cloud Storage bucket used for uploading Trace records.
   */
  traceBucket?: string;
}

/**
 * NEXT ID: 8 RuntimeTraceConfig defines the configurations for distributed
 * trace in an environment.
 */
export interface GoogleCloudApigeeV1RuntimeTraceConfig {
  /**
   * Endpoint of the exporter.
   */
  endpoint?: string;
  /**
   * Exporter that is used to view the distributed trace captured using
   * OpenCensus. An exporter sends traces to any backend that is capable of
   * consuming them. Recorded spans can be exported by registered exporters.
   */
  exporter?:  | "EXPORTER_UNSPECIFIED" | "JAEGER" | "CLOUD_TRACE";
  /**
   * Name of the trace config in the following format:
   * `organizations/{org}/environment/{env}/traceConfig`
   */
  name?: string;
  /**
   * List of trace configuration overrides for spicific API proxies.
   */
  overrides?: GoogleCloudApigeeV1RuntimeTraceConfigOverride[];
  /**
   * The timestamp that the revision was created or updated.
   */
  revisionCreateTime?: Date;
  /**
   * Revision number which can be used by the runtime to detect if the trace
   * config has changed between two versions.
   */
  revisionId?: string;
  /**
   * Trace configuration for all API proxies in an environment.
   */
  samplingConfig?: GoogleCloudApigeeV1RuntimeTraceSamplingConfig;
}

function serializeGoogleCloudApigeeV1RuntimeTraceConfig(data: any): GoogleCloudApigeeV1RuntimeTraceConfig {
  return {
    ...data,
    overrides: data["overrides"] !== undefined ? data["overrides"].map((item: any) => (serializeGoogleCloudApigeeV1RuntimeTraceConfigOverride(item))) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? data["revisionCreateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RuntimeTraceConfig(data: any): GoogleCloudApigeeV1RuntimeTraceConfig {
  return {
    ...data,
    overrides: data["overrides"] !== undefined ? data["overrides"].map((item: any) => (deserializeGoogleCloudApigeeV1RuntimeTraceConfigOverride(item))) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
  };
}

/**
 * NEXT ID: 7 Trace configuration override for a specific API proxy in an
 * environment.
 */
export interface GoogleCloudApigeeV1RuntimeTraceConfigOverride {
  /**
   * Name of the API proxy that will have its trace configuration overridden
   * following format: `organizations/{org}/apis/{api}`
   */
  apiProxy?: string;
  /**
   * Name of the trace config override in the following format:
   * `organizations/{org}/environment/{env}/traceConfig/overrides/{override}`
   */
  name?: string;
  /**
   * The timestamp that the revision was created or updated.
   */
  revisionCreateTime?: Date;
  /**
   * Revision number which can be used by the runtime to detect if the trace
   * config override has changed between two versions.
   */
  revisionId?: string;
  /**
   * Trace configuration override for a specific API proxy in an environment.
   */
  samplingConfig?: GoogleCloudApigeeV1RuntimeTraceSamplingConfig;
  /**
   * Unique ID for the configuration override. The ID will only change if the
   * override is deleted and recreated. Corresponds to name's "override" field.
   */
  uid?: string;
}

function serializeGoogleCloudApigeeV1RuntimeTraceConfigOverride(data: any): GoogleCloudApigeeV1RuntimeTraceConfigOverride {
  return {
    ...data,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? data["revisionCreateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1RuntimeTraceConfigOverride(data: any): GoogleCloudApigeeV1RuntimeTraceConfigOverride {
  return {
    ...data,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
  };
}

/**
 * NEXT ID: 3 RuntimeTraceSamplingConfig represents the detail settings of
 * distributed tracing. Only the fields that are defined in the distributed
 * trace configuration can be overridden using the distribute trace
 * configuration override APIs.
 */
export interface GoogleCloudApigeeV1RuntimeTraceSamplingConfig {
  /**
   * Sampler of distributed tracing. OFF is the default value.
   */
  sampler?:  | "SAMPLER_UNSPECIFIED" | "OFF" | "PROBABILITY";
  /**
   * Field sampling rate. This value is only applicable when using the
   * PROBABILITY sampler. The supported values are > 0 and <= 0.5.
   */
  samplingRate?: number;
}

/**
 * Response for Schema call
 */
export interface GoogleCloudApigeeV1Schema {
  /**
   * List of schema fields grouped as dimensions.
   */
  dimensions?: GoogleCloudApigeeV1SchemaSchemaElement[];
  /**
   * Additional metadata associated with schema. This is a legacy field and
   * usually consists of an empty array of strings.
   */
  meta?: string[];
  /**
   * List of schema fields grouped as dimensions that can be used with an
   * aggregate function such as `sum`, `avg`, `min`, and `max`.
   */
  metrics?: GoogleCloudApigeeV1SchemaSchemaElement[];
}

/**
 * Message type for the schema element
 */
export interface GoogleCloudApigeeV1SchemaSchemaElement {
  /**
   * Name of the field.
   */
  name?: string;
  /**
   * Properties for the schema field. For example: { "createTime":
   * "2016-02-26T10:23:09.592Z", "custom": "false", "type": "string" }
   */
  properties?: GoogleCloudApigeeV1SchemaSchemaProperty;
}

/**
 * Properties for the schema field.
 */
export interface GoogleCloudApigeeV1SchemaSchemaProperty {
  /**
   * Time the field was created in RFC3339 string form. For example:
   * `2016-02-26T10:23:09.592Z`.
   */
  createTime?: string;
  /**
   * Flag that specifies whether the field is standard in the dataset or a
   * custom field created by the customer. `true` indicates that it is a custom
   * field.
   */
  custom?: string;
  /**
   * Data type of the field.
   */
  type?: string;
}

/**
 * Represents Security Score.
 */
export interface GoogleCloudApigeeV1Score {
  /**
   * Component containing score, recommendations and actions.
   */
  component?: GoogleCloudApigeeV1ScoreComponent;
  /**
   * List of all the drilldown score components.
   */
  subcomponents?: GoogleCloudApigeeV1ScoreComponent[];
  /**
   * Start and end time for the score.
   */
  timeRange?: GoogleTypeInterval;
}

function serializeGoogleCloudApigeeV1Score(data: any): GoogleCloudApigeeV1Score {
  return {
    ...data,
    component: data["component"] !== undefined ? serializeGoogleCloudApigeeV1ScoreComponent(data["component"]) : undefined,
    subcomponents: data["subcomponents"] !== undefined ? data["subcomponents"].map((item: any) => (serializeGoogleCloudApigeeV1ScoreComponent(item))) : undefined,
    timeRange: data["timeRange"] !== undefined ? serializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Score(data: any): GoogleCloudApigeeV1Score {
  return {
    ...data,
    component: data["component"] !== undefined ? deserializeGoogleCloudApigeeV1ScoreComponent(data["component"]) : undefined,
    subcomponents: data["subcomponents"] !== undefined ? data["subcomponents"].map((item: any) => (deserializeGoogleCloudApigeeV1ScoreComponent(item))) : undefined,
    timeRange: data["timeRange"] !== undefined ? deserializeGoogleTypeInterval(data["timeRange"]) : undefined,
  };
}

/**
 * Component is an individual security element that is scored.
 */
export interface GoogleCloudApigeeV1ScoreComponent {
  /**
   * Time when score was calculated.
   */
  calculateTime?: Date;
  /**
   * Time in the requested time period when data was last captured to compute
   * the score.
   */
  dataCaptureTime?: Date;
  /**
   * List of paths for next components.
   */
  drilldownPaths?: string[];
  /**
   * List of recommendations to improve API security.
   */
  recommendations?: GoogleCloudApigeeV1ScoreComponentRecommendation[];
  /**
   * Score for the component.
   */
  score?: number;
  /**
   * Path of the component. Example:
   * /org@myorg/envgroup@myenvgroup/proxies/proxy@myproxy
   */
  scorePath?: string;
}

function serializeGoogleCloudApigeeV1ScoreComponent(data: any): GoogleCloudApigeeV1ScoreComponent {
  return {
    ...data,
    calculateTime: data["calculateTime"] !== undefined ? data["calculateTime"].toISOString() : undefined,
    dataCaptureTime: data["dataCaptureTime"] !== undefined ? data["dataCaptureTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1ScoreComponent(data: any): GoogleCloudApigeeV1ScoreComponent {
  return {
    ...data,
    calculateTime: data["calculateTime"] !== undefined ? new Date(data["calculateTime"]) : undefined,
    dataCaptureTime: data["dataCaptureTime"] !== undefined ? new Date(data["dataCaptureTime"]) : undefined,
  };
}

/**
 * Recommendation based on security concerns and score.
 */
export interface GoogleCloudApigeeV1ScoreComponentRecommendation {
  /**
   * Actions for the recommendation to improve the security score.
   */
  actions?: GoogleCloudApigeeV1ScoreComponentRecommendationAction[];
  /**
   * Description of the recommendation.
   */
  description?: string;
  /**
   * Potential impact of this recommendation on the overall score. This denotes
   * how important this recommendation is to improve the score.
   */
  impact?: number;
  /**
   * Title represents recommendation title.
   */
  title?: string;
}

/**
 * Action to improve security score.
 */
export interface GoogleCloudApigeeV1ScoreComponentRecommendationAction {
  /**
   * Action context for the action.
   */
  actionContext?: GoogleCloudApigeeV1ScoreComponentRecommendationActionActionContext;
  /**
   * Description of the action.
   */
  description?: string;
}

/**
 * Action context are all the relevant details for the action.
 */
export interface GoogleCloudApigeeV1ScoreComponentRecommendationActionActionContext {
  /**
   * Documentation link for the action.
   */
  documentationLink?: string;
}

/**
 * Represents an SecurityIncident resource.
 */
export interface GoogleCloudApigeeV1SecurityIncident {
  /**
   * Output only. Detection types which are part of the incident. Examples:
   * Flooder, OAuth Abuser, Static Content Scraper, Anomaly Detection.
   */
  readonly detectionTypes?: string[];
  /**
   * Display name of the security incident.
   */
  displayName?: string;
  /**
   * Output only. The time when events associated with the incident were first
   * detected.
   */
  readonly firstDetectedTime?: Date;
  /**
   * Output only. The time when events associated with the incident were last
   * detected.
   */
  readonly lastDetectedTime?: Date;
  /**
   * Immutable. Name of the security incident resource. Format:
   * organizations/{org}/environments/{environment}/securityIncidents/{incident}
   * Example:
   * organizations/apigee-org/environments/dev/securityIncidents/1234-5678-9101-1111
   */
  name?: string;
  /**
   * Output only. Risk level of the incident.
   */
  readonly riskLevel?:  | "RISK_LEVEL_UNSPECIFIED" | "LOW" | "MODERATE" | "SEVERE";
  /**
   * Total traffic detected as part of the incident.
   */
  trafficCount?: bigint;
}

function serializeGoogleCloudApigeeV1SecurityIncident(data: any): GoogleCloudApigeeV1SecurityIncident {
  return {
    ...data,
    trafficCount: data["trafficCount"] !== undefined ? String(data["trafficCount"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SecurityIncident(data: any): GoogleCloudApigeeV1SecurityIncident {
  return {
    ...data,
    firstDetectedTime: data["firstDetectedTime"] !== undefined ? new Date(data["firstDetectedTime"]) : undefined,
    lastDetectedTime: data["lastDetectedTime"] !== undefined ? new Date(data["lastDetectedTime"]) : undefined,
    trafficCount: data["trafficCount"] !== undefined ? BigInt(data["trafficCount"]) : undefined,
  };
}

/**
 * Represents a SecurityProfile resource.
 */
export interface GoogleCloudApigeeV1SecurityProfile {
  /**
   * Display name of the security profile.
   */
  displayName?: string;
  /**
   * List of environments attached to security profile.
   */
  environments?: GoogleCloudApigeeV1SecurityProfileEnvironment[];
  /**
   * Output only. Maximum security score that can be generated by this profile.
   */
  readonly maxScore?: number;
  /**
   * Output only. Minimum security score that can be generated by this profile.
   */
  readonly minScore?: number;
  /**
   * Immutable. Name of the security profile resource. Format:
   * organizations/{org}/securityProfiles/{profile}
   */
  name?: string;
  /**
   * Output only. The time when revision was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. Revision ID of the security profile.
   */
  readonly revisionId?: bigint;
  /**
   * Output only. The time when revision was published. Once published, the
   * security profile revision cannot be updated further and can be attached to
   * environments.
   */
  readonly revisionPublishTime?: Date;
  /**
   * Output only. The time when revision was updated.
   */
  readonly revisionUpdateTime?: Date;
  /**
   * List of profile scoring configs in this revision.
   */
  scoringConfigs?: GoogleCloudApigeeV1SecurityProfileScoringConfig[];
}

/**
 * Environment information of attached environments. Scoring an environment is
 * enabled only if it is attached to a security profile.
 */
export interface GoogleCloudApigeeV1SecurityProfileEnvironment {
  /**
   * Output only. Time at which environment was attached to the security
   * profile.
   */
  readonly attachTime?: Date;
  /**
   * Output only. Name of the environment.
   */
  readonly environment?: string;
}

/**
 * Represents a SecurityProfileEnvironmentAssociation resource.
 */
export interface GoogleCloudApigeeV1SecurityProfileEnvironmentAssociation {
  /**
   * Output only. The time when environment was attached to the security
   * profile.
   */
  readonly attachTime?: Date;
  /**
   * Immutable. Name of the profile-environment association resource. Format:
   * organizations/{org}/securityProfiles/{profile}/environments/{env}
   */
  name?: string;
  /**
   * Revision ID of the security profile.
   */
  securityProfileRevisionId?: bigint;
}

function serializeGoogleCloudApigeeV1SecurityProfileEnvironmentAssociation(data: any): GoogleCloudApigeeV1SecurityProfileEnvironmentAssociation {
  return {
    ...data,
    securityProfileRevisionId: data["securityProfileRevisionId"] !== undefined ? String(data["securityProfileRevisionId"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SecurityProfileEnvironmentAssociation(data: any): GoogleCloudApigeeV1SecurityProfileEnvironmentAssociation {
  return {
    ...data,
    attachTime: data["attachTime"] !== undefined ? new Date(data["attachTime"]) : undefined,
    securityProfileRevisionId: data["securityProfileRevisionId"] !== undefined ? BigInt(data["securityProfileRevisionId"]) : undefined,
  };
}

/**
 * Security configurations to manage scoring.
 */
export interface GoogleCloudApigeeV1SecurityProfileScoringConfig {
  /**
   * Description of the config.
   */
  description?: string;
  /**
   * Path of the component config used for scoring.
   */
  scorePath?: string;
  /**
   * Title of the config.
   */
  title?: string;
}

/**
 * SecurityReport saves all the information about the created security report.
 */
export interface GoogleCloudApigeeV1SecurityReport {
  /**
   * Creation time of the query.
   */
  created?: string;
  /**
   * Display Name specified by the user.
   */
  displayName?: string;
  /**
   * Hostname is available only when query is executed at host level.
   */
  envgroupHostname?: string;
  /**
   * Error is set when query fails.
   */
  error?: string;
  /**
   * ExecutionTime is available only after the query is completed.
   */
  executionTime?: string;
  /**
   * Contains information like metrics, dimenstions etc of the Security Report.
   */
  queryParams?: GoogleCloudApigeeV1SecurityReportMetadata;
  /**
   * Report Definition ID.
   */
  reportDefinitionId?: string;
  /**
   * Result is available only after the query is completed.
   */
  result?: GoogleCloudApigeeV1SecurityReportResultMetadata;
  /**
   * ResultFileSize is available only after the query is completed.
   */
  resultFileSize?: string;
  /**
   * ResultRows is available only after the query is completed.
   */
  resultRows?: bigint;
  /**
   * Self link of the query. Example:
   * `/organizations/myorg/environments/myenv/securityReports/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd`
   * or following format if query is running at host level:
   * `/organizations/myorg/hostSecurityReports/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd`
   */
  self?: string;
  /**
   * Query state could be "enqueued", "running", "completed", "expired" and
   * "failed".
   */
  state?: string;
  /**
   * Output only. Last updated timestamp for the query.
   */
  readonly updated?: string;
}

function serializeGoogleCloudApigeeV1SecurityReport(data: any): GoogleCloudApigeeV1SecurityReport {
  return {
    ...data,
    queryParams: data["queryParams"] !== undefined ? serializeGoogleCloudApigeeV1SecurityReportMetadata(data["queryParams"]) : undefined,
    resultRows: data["resultRows"] !== undefined ? String(data["resultRows"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SecurityReport(data: any): GoogleCloudApigeeV1SecurityReport {
  return {
    ...data,
    queryParams: data["queryParams"] !== undefined ? deserializeGoogleCloudApigeeV1SecurityReportMetadata(data["queryParams"]) : undefined,
    resultRows: data["resultRows"] !== undefined ? BigInt(data["resultRows"]) : undefined,
  };
}

/**
 * Metadata for the security report.
 */
export interface GoogleCloudApigeeV1SecurityReportMetadata {
  /**
   * Dimensions of the SecurityReport.
   */
  dimensions?: string[];
  /**
   * End timestamp of the query range.
   */
  endTimestamp?: Date;
  /**
   * Metrics of the SecurityReport. Example:
   * ["name:bot_count,func:sum,alias:sum_bot_count"]
   */
  metrics?: string[];
  /**
   * MIME type / Output format.
   */
  mimeType?: string;
  /**
   * Start timestamp of the query range.
   */
  startTimestamp?: Date;
  /**
   * Query GroupBy time unit. Example: "seconds", "minute", "hour"
   */
  timeUnit?: string;
}

function serializeGoogleCloudApigeeV1SecurityReportMetadata(data: any): GoogleCloudApigeeV1SecurityReportMetadata {
  return {
    ...data,
    endTimestamp: data["endTimestamp"] !== undefined ? data["endTimestamp"].toISOString() : undefined,
    startTimestamp: data["startTimestamp"] !== undefined ? data["startTimestamp"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SecurityReportMetadata(data: any): GoogleCloudApigeeV1SecurityReportMetadata {
  return {
    ...data,
    endTimestamp: data["endTimestamp"] !== undefined ? new Date(data["endTimestamp"]) : undefined,
    startTimestamp: data["startTimestamp"] !== undefined ? new Date(data["startTimestamp"]) : undefined,
  };
}

/**
 * Body structure when user makes a request to create a security report.
 */
export interface GoogleCloudApigeeV1SecurityReportQuery {
  /**
   * Delimiter used in the CSV file, if `outputFormat` is set to `csv`.
   * Defaults to the `,` (comma) character. Supported delimiter characters
   * include comma (`,`), pipe (`|`), and tab (`\t`).
   */
  csvDelimiter?: string;
  /**
   * A list of dimensions.
   * https://docs.apigee.com/api-platform/analytics/analytics-reference#dimensions
   */
  dimensions?: string[];
  /**
   * Security Report display name which users can specify.
   */
  displayName?: string;
  /**
   * Hostname needs to be specified if query intends to run at host level. This
   * field is only allowed when query is submitted by CreateHostSecurityReport
   * where analytics data will be grouped by organization and hostname.
   */
  envgroupHostname?: string;
  /**
   * Boolean expression that can be used to filter data. Filter expressions can
   * be combined using AND/OR terms and should be fully parenthesized to avoid
   * ambiguity. See Analytics metrics, dimensions, and filters reference
   * https://docs.apigee.com/api-platform/analytics/analytics-reference for more
   * information on the fields available to filter on. For more information on
   * the tokens that you use to build filter expressions, see Filter expression
   * syntax.
   * https://docs.apigee.com/api-platform/analytics/asynch-reports-api#filter-expression-syntax
   */
  filter?: string;
  /**
   * Time unit used to group the result set. Valid values include: second,
   * minute, hour, day, week, or month. If a query includes groupByTimeUnit,
   * then the result is an aggregation based on the specified time unit and the
   * resultant timestamp does not include milliseconds precision. If a query
   * omits groupByTimeUnit, then the resultant timestamp includes milliseconds
   * precision.
   */
  groupByTimeUnit?: string;
  /**
   * Maximum number of rows that can be returned in the result.
   */
  limit?: number;
  /**
   * A list of Metrics.
   */
  metrics?: GoogleCloudApigeeV1SecurityReportQueryMetric[];
  /**
   * Valid values include: `csv` or `json`. Defaults to `json`. Note: Configure
   * the delimiter for CSV output using the csvDelimiter property.
   */
  mimeType?: string;
  /**
   * Report Definition ID.
   */
  reportDefinitionId?: string;
  /**
   * Required. Time range for the query. Can use the following predefined
   * strings to specify the time range: `last60minutes` `last24hours`
   * `last7days` Or, specify the timeRange as a structure describing start and
   * end timestamps in the ISO format: yyyy-mm-ddThh:mm:ssZ. Example:
   * "timeRange": { "start": "2018-07-29T00:13:00Z", "end":
   * "2018-08-01T00:18:00Z" }
   */
  timeRange?: any;
}

/**
 * Metric of the Query
 */
export interface GoogleCloudApigeeV1SecurityReportQueryMetric {
  /**
   * Aggregation function: avg, min, max, or sum.
   */
  aggregationFunction?: string;
  /**
   * Alias for the metric. Alias will be used to replace metric name in query
   * results.
   */
  alias?: string;
  /**
   * Required. Metric name.
   */
  name?: string;
  /**
   * One of `+`, `-`, `/`, `%`, `*`.
   */
  operator?: string;
  /**
   * Operand value should be provided when operator is set.
   */
  value?: string;
}

/**
 * Contains informations about the security report results.
 */
export interface GoogleCloudApigeeV1SecurityReportResultMetadata {
  /**
   * Output only. Expire_time is set to 7 days after report creation. Query
   * result will be unaccessable after this time. Example:
   * "2021-05-04T13:38:52-07:00"
   */
  readonly expires?: string;
  /**
   * Self link of the query results. Example:
   * `/organizations/myorg/environments/myenv/securityReports/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd/result`
   * or following format if query is running at host level:
   * `/organizations/myorg/hostSecurityReports/9cfc0d85-0f30-46d6-ae6f-318d0cb961bd/result`
   */
  self?: string;
}

/**
 * The response for security report result view APIs.
 */
export interface GoogleCloudApigeeV1SecurityReportResultView {
  /**
   * Error code when there is a failure.
   */
  code?: number;
  /**
   * Error message when there is a failure.
   */
  error?: string;
  /**
   * Metadata contains information like metrics, dimenstions etc of the
   * security report.
   */
  metadata?: GoogleCloudApigeeV1SecurityReportMetadata;
  /**
   * Rows of security report result. Each row is a JSON object. Example:
   * {sum(message_count): 1, developer_app: "(not set)",…}
   */
  rows?: any[];
  /**
   * State of retrieving ResultView.
   */
  state?: string;
}

function serializeGoogleCloudApigeeV1SecurityReportResultView(data: any): GoogleCloudApigeeV1SecurityReportResultView {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeGoogleCloudApigeeV1SecurityReportMetadata(data["metadata"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SecurityReportResultView(data: any): GoogleCloudApigeeV1SecurityReportResultView {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeGoogleCloudApigeeV1SecurityReportMetadata(data["metadata"]) : undefined,
  };
}

export interface GoogleCloudApigeeV1ServiceIssuersMapping {
  /**
   * List of trusted issuer email ids.
   */
  emailIds?: string[];
  /**
   * String indicating the Apigee service name.
   */
  service?: string;
}

/**
 * Session carries the debug session id and its creation time.
 */
export interface GoogleCloudApigeeV1Session {
  /**
   * The debug session ID.
   */
  id?: string;
  /**
   * The first transaction creation timestamp in millisecond, recorded by UAP.
   */
  timestampMs?: bigint;
}

function serializeGoogleCloudApigeeV1Session(data: any): GoogleCloudApigeeV1Session {
  return {
    ...data,
    timestampMs: data["timestampMs"] !== undefined ? String(data["timestampMs"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1Session(data: any): GoogleCloudApigeeV1Session {
  return {
    ...data,
    timestampMs: data["timestampMs"] !== undefined ? BigInt(data["timestampMs"]) : undefined,
  };
}

/**
 * Request for SetAddons.
 */
export interface GoogleCloudApigeeV1SetAddonsRequest {
  /**
   * Required. Add-on configurations.
   */
  addonsConfig?: GoogleCloudApigeeV1AddonsConfig;
}

/**
 * The metadata describing a shared flow
 */
export interface GoogleCloudApigeeV1SharedFlow {
  /**
   * The id of the most recently created revision for this shared flow.
   */
  latestRevisionId?: string;
  /**
   * Metadata describing the shared flow.
   */
  metaData?: GoogleCloudApigeeV1EntityMetadata;
  /**
   * The ID of the shared flow.
   */
  name?: string;
  /**
   * A list of revisions of this shared flow.
   */
  revision?: string[];
}

function serializeGoogleCloudApigeeV1SharedFlow(data: any): GoogleCloudApigeeV1SharedFlow {
  return {
    ...data,
    metaData: data["metaData"] !== undefined ? serializeGoogleCloudApigeeV1EntityMetadata(data["metaData"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SharedFlow(data: any): GoogleCloudApigeeV1SharedFlow {
  return {
    ...data,
    metaData: data["metaData"] !== undefined ? deserializeGoogleCloudApigeeV1EntityMetadata(data["metaData"]) : undefined,
  };
}

/**
 * The metadata describing a shared flow revision.
 */
export interface GoogleCloudApigeeV1SharedFlowRevision {
  /**
   * The version of the configuration schema to which this shared flow
   * conforms. The only supported value currently is majorVersion 4 and
   * minorVersion 0. This setting may be used in the future to enable evolution
   * of the shared flow format.
   */
  configurationVersion?: GoogleCloudApigeeV1ConfigVersion;
  /**
   * A textual description of the shared flow revision.
   */
  contextInfo?: string;
  /**
   * Time at which this shared flow revision was created, in milliseconds since
   * epoch.
   */
  createdAt?: bigint;
  /**
   * Description of the shared flow revision.
   */
  description?: string;
  /**
   * The human readable name of this shared flow.
   */
  displayName?: string;
  /**
   * A Key-Value map of metadata about this shared flow revision.
   */
  entityMetaDataAsProperties?: {
    [key: string]: string
  };
  /**
   * Time at which this shared flow revision was most recently modified, in
   * milliseconds since epoch.
   */
  lastModifiedAt?: bigint;
  /**
   * The resource ID of the parent shared flow.
   */
  name?: string;
  /**
   * A list of policy names included in this shared flow revision.
   */
  policies?: string[];
  /**
   * The resource files included in this shared flow revision.
   */
  resourceFiles?: GoogleCloudApigeeV1ResourceFiles;
  /**
   * A list of the resources included in this shared flow revision formatted as
   * "{type}://{name}".
   */
  resources?: string[];
  /**
   * The resource ID of this revision.
   */
  revision?: string;
  /**
   * A list of the shared flow names included in this shared flow revision.
   */
  sharedFlows?: string[];
  /**
   * The string "Application"
   */
  type?: string;
}

function serializeGoogleCloudApigeeV1SharedFlowRevision(data: any): GoogleCloudApigeeV1SharedFlowRevision {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? String(data["lastModifiedAt"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SharedFlowRevision(data: any): GoogleCloudApigeeV1SharedFlowRevision {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastModifiedAt: data["lastModifiedAt"] !== undefined ? BigInt(data["lastModifiedAt"]) : undefined,
  };
}

/**
 * Encapsulates a `stats` response.
 */
export interface GoogleCloudApigeeV1Stats {
  /**
   * List of query results on the environment level.
   */
  environments?: GoogleCloudApigeeV1StatsEnvironmentStats[];
  /**
   * List of query results grouped by host.
   */
  hosts?: GoogleCloudApigeeV1StatsHostStats[];
  /**
   * Metadata information.
   */
  metaData?: GoogleCloudApigeeV1Metadata;
}

/**
 * Encapsulates the environment wrapper: ``` "environments": [ { "metrics": [ {
 * "name": "sum(message_count)", "values": [ "2.52056245E8" ] } ], "name":
 * "prod" } ]```
 */
export interface GoogleCloudApigeeV1StatsEnvironmentStats {
  /**
   * List of metrics grouped under dimensions.
   */
  dimensions?: GoogleCloudApigeeV1DimensionMetric[];
  /**
   * In the final response, only one of the following fields will be present
   * based on the dimensions provided. If no dimensions are provided, then only
   * top-level metrics is provided. If dimensions are included, then there will
   * be a top-level dimensions field under environments which will contain
   * metrics values and the dimension name. Example: ``` "environments": [ {
   * "dimensions": [ { "metrics": [ { "name": "sum(message_count)", "values": [
   * "2.14049521E8" ] } ], "name": "nit_proxy" } ], "name": "prod" } ]``` or
   * ```"environments": [ { "metrics": [ { "name": "sum(message_count)",
   * "values": [ "2.19026331E8" ] } ], "name": "prod" } ]``` List of metric
   * values.
   */
  metrics?: GoogleCloudApigeeV1Metric[];
  /**
   * Name of the environment.
   */
  name?: string;
}

/**
 * Encapsulates the hostname wrapper: ``` "hosts": [ { "metrics": [ { "name":
 * "sum(message_count)", "values": [ "2.52056245E8" ] } ], "name": "example.com"
 * } ]```
 */
export interface GoogleCloudApigeeV1StatsHostStats {
  /**
   * List of metrics grouped under dimensions.
   */
  dimensions?: GoogleCloudApigeeV1DimensionMetric[];
  /**
   * In the final response, only one of the following fields will be present
   * based on the dimensions provided. If no dimensions are provided, then only
   * the top-level metrics are provided. If dimensions are included, then there
   * will be a top-level dimensions field under hostnames which will contain
   * metrics values and the dimension name. Example: ``` "hosts": [ {
   * "dimensions": [ { "metrics": [ { "name": "sum(message_count)", "values": [
   * "2.14049521E8" ] } ], "name": "nit_proxy" } ], "name": "example.com" } ]```
   * OR ```"hosts": [ { "metrics": [ { "name": "sum(message_count)", "values": [
   * "2.19026331E8" ] } ], "name": "example.com" } ]``` List of metric values.
   */
  metrics?: GoogleCloudApigeeV1Metric[];
  /**
   * Hostname used in query.
   */
  name?: string;
}

/**
 * Pub/Sub subscription of an environment.
 */
export interface GoogleCloudApigeeV1Subscription {
  /**
   * Full name of the Pub/Sub subcription. Use the following structure in your
   * request: `subscription "projects/foo/subscription/bar"`
   */
  name?: string;
}

export interface GoogleCloudApigeeV1SyncAuthorization {
  /**
   * Entity tag (ETag) used for optimistic concurrency control as a way to help
   * prevent simultaneous updates from overwriting each other. For example, when
   * you call [getSyncAuthorization](organizations/getSyncAuthorization) an ETag
   * is returned in the response. Pass that ETag when calling the
   * [setSyncAuthorization](organizations/setSyncAuthorization) to ensure that
   * you are updating the correct version. If you don't pass the ETag in the
   * call to `setSyncAuthorization`, then the existing authorization is
   * overwritten indiscriminately. **Note**: We strongly recommend that you use
   * the ETag in the read-modify-write cycle to avoid race conditions.
   */
  etag?: Uint8Array;
  /**
   * Required. Array of service accounts to grant access to control plane
   * resources, each specified using the following format: `serviceAccount:`
   * service-account-name. The service-account-name is formatted like an email
   * address. For example:
   * `my-synchronizer-manager-service_account@my_project_id.iam.gserviceaccount.com`
   * You might specify multiple service accounts, for example, if you have
   * multiple environments and wish to assign a unique service account to each
   * one. The service accounts must have **Apigee Synchronizer Manager** role.
   * See also [Create service
   * accounts](https://cloud.google.com/apigee/docs/hybrid/latest/sa-about#create-the-service-accounts).
   */
  identities?: string[];
}

function serializeGoogleCloudApigeeV1SyncAuthorization(data: any): GoogleCloudApigeeV1SyncAuthorization {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleCloudApigeeV1SyncAuthorization(data: any): GoogleCloudApigeeV1SyncAuthorization {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * TargetServer configuration. TargetServers are used to decouple a proxy
 * TargetEndpoint HTTPTargetConnections from concrete URLs for backend services.
 */
export interface GoogleCloudApigeeV1TargetServer {
  /**
   * Optional. A human-readable description of this TargetServer.
   */
  description?: string;
  /**
   * Required. The host name this target connects to. Value must be a valid
   * hostname as described by RFC-1123.
   */
  host?: string;
  /**
   * Optional. Enabling/disabling a TargetServer is useful when TargetServers
   * are used in load balancing configurations, and one or more TargetServers
   * need to taken out of rotation periodically. Defaults to true.
   */
  isEnabled?: boolean;
  /**
   * Required. The resource id of this target server. Values must match the
   * regular expression
   */
  name?: string;
  /**
   * Required. The port number this target connects to on the given host. Value
   * must be between 1 and 65535, inclusive.
   */
  port?: number;
  /**
   * Immutable. The protocol used by this TargetServer.
   */
  protocol?:  | "PROTOCOL_UNSPECIFIED" | "HTTP" | "GRPC";
  /**
   * Optional. Specifies TLS configuration info for this TargetServer. The JSON
   * name is `sSLInfo` for legacy/backwards compatibility reasons -- Edge
   * originally supported SSL, and the name is still used for TLS configuration.
   */
  sSLInfo?: GoogleCloudApigeeV1TlsInfo;
}

export interface GoogleCloudApigeeV1TargetServerConfig {
  /**
   * Whether the target server is enabled. An empty/omitted value for this
   * field should be interpreted as true.
   */
  enabled?: boolean;
  /**
   * Host name of the target server.
   */
  host?: string;
  /**
   * Target server revision name in the following format:
   * `organizations/{org}/environments/{env}/targetservers/{targetserver}/revisions/{rev}`
   */
  name?: string;
  /**
   * Port number for the target server.
   */
  port?: number;
  /**
   * The protocol used by this target server.
   */
  protocol?:  | "PROTOCOL_UNSPECIFIED" | "HTTP" | "GRPC";
  /**
   * TLS settings for the target server.
   */
  tlsInfo?: GoogleCloudApigeeV1TlsInfoConfig;
}

/**
 * The response for TestDatastore
 */
export interface GoogleCloudApigeeV1TestDatastoreResponse {
  /**
   * Output only. Error message of test connection failure
   */
  readonly error?: string;
  /**
   * Output only. It could be `completed` or `failed`
   */
  readonly state?: string;
}

/**
 * TLS configuration information for virtual hosts and TargetServers.
 */
export interface GoogleCloudApigeeV1TlsInfo {
  /**
   * The SSL/TLS cipher suites to be used. For programmable proxies, it must be
   * one of the cipher suite names listed in:
   * http://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#ciphersuites.
   * For configurable proxies, it must follow the configuration specified in:
   * https://commondatastorage.googleapis.com/chromium-boringssl-docs/ssl.h.html#Cipher-suite-configuration.
   * This setting has no effect for configurable proxies when negotiating TLS
   * 1.3.
   */
  ciphers?: string[];
  /**
   * Optional. Enables two-way TLS.
   */
  clientAuthEnabled?: boolean;
  /**
   * The TLS Common Name of the certificate.
   */
  commonName?: GoogleCloudApigeeV1TlsInfoCommonName;
  /**
   * Required. Enables TLS. If false, neither one-way nor two-way TLS will be
   * enabled.
   */
  enabled?: boolean;
  /**
   * If true, Edge ignores TLS certificate errors. Valid when configuring TLS
   * for target servers and target endpoints, and when configuring virtual hosts
   * that use 2-way TLS. When used with a target endpoint/target server, if the
   * backend system uses SNI and returns a cert with a subject Distinguished
   * Name (DN) that does not match the hostname, there is no way to ignore the
   * error and the connection fails.
   */
  ignoreValidationErrors?: boolean;
  /**
   * Required if `client_auth_enabled` is true. The resource ID for the alias
   * containing the private key and cert.
   */
  keyAlias?: string;
  /**
   * Required if `client_auth_enabled` is true. The resource ID of the
   * keystore.
   */
  keyStore?: string;
  /**
   * The TLS versioins to be used.
   */
  protocols?: string[];
  /**
   * The resource ID of the truststore.
   */
  trustStore?: string;
}

export interface GoogleCloudApigeeV1TlsInfoCommonName {
  /**
   * The TLS Common Name string of the certificate.
   */
  value?: string;
  /**
   * Indicates whether the cert should be matched against as a wildcard cert.
   */
  wildcardMatch?: boolean;
}

export interface GoogleCloudApigeeV1TlsInfoConfig {
  /**
   * List of ciphers that are granted access.
   */
  ciphers?: string[];
  /**
   * Flag that specifies whether client-side authentication is enabled for the
   * target server. Enables two-way TLS.
   */
  clientAuthEnabled?: boolean;
  /**
   * Common name to validate the target server against.
   */
  commonName?: GoogleCloudApigeeV1CommonNameConfig;
  /**
   * Flag that specifies whether one-way TLS is enabled. Set to `true` to
   * enable one-way TLS.
   */
  enabled?: boolean;
  /**
   * Flag that specifies whether to ignore TLS certificate validation errors.
   * Set to `true` to ignore errors.
   */
  ignoreValidationErrors?: boolean;
  /**
   * Name of the alias used for client-side authentication in the following
   * format:
   * `organizations/{org}/environments/{env}/keystores/{keystore}/aliases/{alias}`
   */
  keyAlias?: string;
  /**
   * Reference name and alias pair to use for client-side authentication.
   */
  keyAliasReference?: GoogleCloudApigeeV1KeyAliasReference;
  /**
   * List of TLS protocols that are granted access.
   */
  protocols?: string[];
  /**
   * Name of the keystore or keystore reference containing trusted certificates
   * for the server in the following format:
   * `organizations/{org}/environments/{env}/keystores/{keystore}` or
   * `organizations/{org}/environments/{env}/references/{reference}`
   */
  trustStore?: string;
}

/**
 * TraceConfig defines the configurations in an environment of distributed
 * trace.
 */
export interface GoogleCloudApigeeV1TraceConfig {
  /**
   * Required. Endpoint of the exporter.
   */
  endpoint?: string;
  /**
   * Required. Exporter that is used to view the distributed trace captured
   * using OpenCensus. An exporter sends traces to any backend that is capable
   * of consuming them. Recorded spans can be exported by registered exporters.
   */
  exporter?:  | "EXPORTER_UNSPECIFIED" | "JAEGER" | "CLOUD_TRACE";
  /**
   * Distributed trace configuration for all API proxies in an environment. You
   * can also override the configuration for a specific API proxy using the
   * distributed trace configuration overrides API.
   */
  samplingConfig?: GoogleCloudApigeeV1TraceSamplingConfig;
}

/**
 * A representation of a configuration override.
 */
export interface GoogleCloudApigeeV1TraceConfigOverride {
  /**
   * ID of the API proxy that will have its trace configuration overridden.
   */
  apiProxy?: string;
  /**
   * ID of the trace configuration override specified as a system-generated
   * UUID.
   */
  name?: string;
  /**
   * Trace configuration to override.
   */
  samplingConfig?: GoogleCloudApigeeV1TraceSamplingConfig;
}

/**
 * TraceSamplingConfig represents the detail settings of distributed tracing.
 * Only the fields that are defined in the distributed trace configuration can
 * be overridden using the distribute trace configuration override APIs.
 */
export interface GoogleCloudApigeeV1TraceSamplingConfig {
  /**
   * Sampler of distributed tracing. OFF is the default value.
   */
  sampler?:  | "SAMPLER_UNSPECIFIED" | "OFF" | "PROBABILITY";
  /**
   * Field sampling rate. This value is only applicable when using the
   * PROBABILITY sampler. The supported values are > 0 and <= 0.5.
   */
  samplingRate?: number;
}

/**
 * Details on why a resource update failed in the runtime.
 */
export interface GoogleCloudApigeeV1UpdateError {
  /**
   * Status code.
   */
  code?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
  /**
   * User-friendly error message.
   */
  message?: string;
  /**
   * The sub resource specific to this error (e.g. a proxy deployed within the
   * EnvironmentConfig). If empty the error refers to the top level resource.
   */
  resource?: string;
  /**
   * A string that uniquely identifies the type of error. This provides a more
   * reliable means to deduplicate errors across revisions and instances.
   */
  type?: string;
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface GoogleIamV1AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface GoogleIamV1Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: GoogleTypeExpr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: GoogleIamV1Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version?: number;
}

function serializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface GoogleIamV1SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface GoogleIamV1TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface GoogleIamV1TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
  /**
   * Service-specific metadata associated with the operation. It typically
   * contains progress information and common metadata such as create time. Some
   * services might not provide such metadata. Any method that returns a
   * long-running operation should document the metadata type, if any.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The server-assigned name, which is only unique within the same service
   * that originally returns it. If you use the default HTTP mapping, the `name`
   * should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as `Delete`, the response is
   * `google.protobuf.Empty`. If the original method is standard
   * `Get`/`Create`/`Update`, the response should be the resource. For other
   * methods, the response should have the type `XxxResponse`, where `Xxx` is
   * the original method name. For example, if the original method name is
   * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * Describes what preconditions have failed. For example, if an RPC failed
 * because it required the Terms of Service to be acknowledged, it could list
 * the terms of service violation in the PreconditionFailure message.
 */
export interface GoogleRpcPreconditionFailure {
  /**
   * Describes all precondition violations.
   */
  violations?: GoogleRpcPreconditionFailureViolation[];
}

/**
 * A message type used to describe a single precondition failure.
 */
export interface GoogleRpcPreconditionFailureViolation {
  /**
   * A description of how the precondition failed. Developers can use this
   * description to understand how to fix the failure. For example: "Terms of
   * service not accepted".
   */
  description?: string;
  /**
   * The subject, relative to the type, that failed. For example,
   * "google.com/cloud" relative to the "TOS" type would indicate which terms of
   * service is being referenced.
   */
  subject?: string;
  /**
   * The type of PreconditionFailure. We recommend using a service-specific
   * enum type to define the supported precondition violation subjects. For
   * example, "TOS" for "Terms of Service violation".
   */
  type?: string;
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
  /**
   * The status code, which should be an enum value of google.rpc.Code.
   */
  code?: number;
  /**
   * A list of messages that carry the error details. There is a common set of
   * message types for APIs to use.
   */
  details?: {
    [key: string]: any
  }[];
  /**
   * A developer-facing error message, which should be in English. Any
   * user-facing error message should be localized and sent in the
   * google.rpc.Status.details field, or localized by the client.
   */
  message?: string;
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface GoogleTypeExpr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive). The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time). When
 * both start and end are unspecified, the interval matches any time.
 */
export interface GoogleTypeInterval {
  /**
   * Optional. Exclusive end of the interval. If specified, a Timestamp
   * matching this interval will have to be before the end.
   */
  endTime?: Date;
  /**
   * Optional. Inclusive start of the interval. If specified, a Timestamp
   * matching this interval will have to be the same or after the start.
   */
  startTime?: Date;
}

function serializeGoogleTypeInterval(data: any): GoogleTypeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleTypeInterval(data: any): GoogleTypeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Represents an amount of money with its currency type.
 */
export interface GoogleTypeMoney {
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

function serializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsAnalyticsDatastoresList.
 */
export interface OrganizationsAnalyticsDatastoresListOptions {
  /**
   * Optional. TargetType is used to fetch all Datastores that match the type
   */
  targetType?: string;
}

/**
 * Additional options for Apigee#organizationsApiproductsList.
 */
export interface OrganizationsApiproductsListOptions {
  /**
   * Name of the attribute used to filter the search.
   */
  attributename?: string;
  /**
   * Value of the attribute used to filter the search.
   */
  attributevalue?: string;
  /**
   * Enter the number of API products you want returned in the API call. The
   * limit is 1000.
   */
  count?: bigint;
  /**
   * Flag that specifies whether to expand the results. Set to `true` to get
   * expanded details about each API.
   */
  expand?: boolean;
  /**
   * Gets a list of API products starting with a specific API product in the
   * list. For example, if you're returning 50 API products at a time (using the
   * `count` query parameter), you can view products 50-99 by entering the name
   * of the 50th API product in the first API (without using `startKey`).
   * Product name is case sensitive.
   */
  startKey?: string;
}

function serializeOrganizationsApiproductsListOptions(data: any): OrganizationsApiproductsListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeOrganizationsApiproductsListOptions(data: any): OrganizationsApiproductsListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsApiproductsRateplansList.
 */
export interface OrganizationsApiproductsRateplansListOptions {
  /**
   * Number of rate plans to return in the API call. Use with the `startKey`
   * parameter to provide more targeted filtering. The maximum limit is 1000.
   * Defaults to 100.
   */
  count?: number;
  /**
   * Flag that specifies whether to expand the results. Set to `true` to get
   * expanded details about each API. Defaults to `false`.
   */
  expand?: boolean;
  /**
   * Name of the attribute used for sorting. Valid values include: * `name`:
   * Name of the rate plan. * `state`: State of the rate plan (`DRAFT`,
   * `PUBLISHED`). * `startTime`: Time when the rate plan becomes active. *
   * `endTime`: Time when the rate plan expires. **Note**: Not supported by
   * Apigee at this time.
   */
  orderBy?: string;
  /**
   * Name of the rate plan from which to start displaying the list of rate
   * plans. If omitted, the list starts from the first item. For example, to
   * view the rate plans from 51-150, set the value of `startKey` to the name of
   * the 51st rate plan and set the value of `count` to 100.
   */
  startKey?: string;
  /**
   * State of the rate plans (`DRAFT`, `PUBLISHED`) that you want to display.
   */
  state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "PUBLISHED";
}

/**
 * Additional options for Apigee#organizationsApisCreate.
 */
export interface OrganizationsApisCreateOptions {
  /**
   * Action to perform when importing an API proxy configuration bundle. Set
   * this parameter to one of the following values: * `import` to import the API
   * proxy configuration bundle. * `validate` to validate the API proxy
   * configuration bundle without importing it.
   */
  action?: string;
  /**
   * Name of the API proxy. Restrict the characters used to: A-Za-z0-9._-
   */
  name?: string;
  /**
   * Ignored. All uploads are validated regardless of the value of this field.
   * Maintained for compatibility with Apigee Edge API.
   */
  validate?: boolean;
}

/**
 * Additional options for Apigee#organizationsApisKeyvaluemapsEntriesList.
 */
export interface OrganizationsApisKeyvaluemapsEntriesListOptions {
  /**
   * Optional. Maximum number of key value entries to return. If unspecified,
   * at most 100 entries will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Page token. If provides, must be a valid key value entry
   * returned from a previous call that can be used to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsApisList.
 */
export interface OrganizationsApisListOptions {
  /**
   * Flag that specifies whether to include API proxy metadata in the response.
   */
  includeMetaData?: boolean;
  /**
   * Flag that specifies whether to include a list of revisions in the
   * response.
   */
  includeRevisions?: boolean;
}

/**
 * Additional options for Apigee#organizationsApisPatch.
 */
export interface OrganizationsApisPatchOptions {
  /**
   * Required. The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsApisPatchOptions(data: any): OrganizationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsApisPatchOptions(data: any): OrganizationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsApisRevisionsGet.
 */
export interface OrganizationsApisRevisionsGetOptions {
  /**
   * Format used when downloading the API proxy configuration revision. Set to
   * `bundle` to download the API proxy configuration revision as a zip file.
   */
  format?: string;
}

/**
 * Additional options for
 * Apigee#organizationsApisRevisionsUpdateApiProxyRevision.
 */
export interface OrganizationsApisRevisionsUpdateApiProxyRevisionOptions {
  /**
   * Ignored. All uploads are validated regardless of the value of this field.
   * Maintained for compatibility with Apigee Edge API.
   */
  validate?: boolean;
}

/**
 * Additional options for Apigee#organizationsAppsList.
 */
export interface OrganizationsAppsListOptions {
  /**
   * API product.
   */
  apiProduct?: string;
  /**
   * Optional. Filter by the type of the app. Valid values are `company` or
   * `developer`. Defaults to `developer`.
   */
  apptype?: string;
  /**
   * Optional. Flag that specifies whether to return an expanded list of apps
   * for the organization. Defaults to `false`.
   */
  expand?: boolean;
  /**
   * Optional. Comma-separated list of app IDs on which to filter.
   */
  ids?: string;
  /**
   * Optional. Flag that specifies whether to include credentials in the
   * response.
   */
  includeCred?: boolean;
  /**
   * Optional. Key status of the app. Valid values include `approved` or
   * `revoked`. Defaults to `approved`.
   */
  keyStatus?: string;
  /**
   * Optional. Maximum number of app IDs to return. Defaults to 10000.
   */
  rows?: bigint;
  /**
   * Returns the list of apps starting from the specified app ID.
   */
  startKey?: string;
  /**
   * Optional. Filter by the status of the app. Valid values are `approved` or
   * `revoked`. Defaults to `approved`.
   */
  status?: string;
}

function serializeOrganizationsAppsListOptions(data: any): OrganizationsAppsListOptions {
  return {
    ...data,
    rows: data["rows"] !== undefined ? String(data["rows"]) : undefined,
  };
}

function deserializeOrganizationsAppsListOptions(data: any): OrganizationsAppsListOptions {
  return {
    ...data,
    rows: data["rows"] !== undefined ? BigInt(data["rows"]) : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsCreate.
 */
export interface OrganizationsCreateOptions {
  /**
   * Required. Name of the Google Cloud project in which to associate the
   * Apigee organization. Pass the information as a query parameter using the
   * following structure in your request: `projects/`
   */
  parent?: string;
}

/**
 * Additional options for Apigee#organizationsDatacollectorsCreate.
 */
export interface OrganizationsDatacollectorsCreateOptions {
  /**
   * ID of the data collector. Overrides any ID in the data collector resource.
   * Must be a string beginning with `dc_` that contains only letters, numbers,
   * and underscores.
   */
  dataCollectorId?: string;
}

/**
 * Additional options for Apigee#organizationsDatacollectorsList.
 */
export interface OrganizationsDatacollectorsListOptions {
  /**
   * Maximum number of data collectors to return. The page size defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned from a previous ListDataCollectors call, that you can
   * use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsDatacollectorsPatch.
 */
export interface OrganizationsDatacollectorsPatchOptions {
  /**
   * List of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsDatacollectorsPatchOptions(data: any): OrganizationsDatacollectorsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsDatacollectorsPatchOptions(data: any): OrganizationsDatacollectorsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsDelete.
 */
export interface OrganizationsDeleteOptions {
  /**
   * Optional. This setting is applicable only for organizations that are
   * soft-deleted (i.e., BillingType is not EVALUATION). It controls how long
   * Organization data will be retained after the initial delete operation
   * completes. During this period, the Organization may be restored to its last
   * known state. After this period, the Organization will no longer be able to
   * be restored.
   */
  retention?:  | "DELETION_RETENTION_UNSPECIFIED" | "MINIMUM";
}

/**
 * Additional options for Apigee#organizationsDeploymentsList.
 */
export interface OrganizationsDeploymentsListOptions {
  /**
   * Optional. Flag that specifies whether to return shared flow or API proxy
   * deployments. Set to `true` to return shared flow deployments; set to
   * `false` to return API proxy deployments. Defaults to `false`.
   */
  sharedFlows?: boolean;
}

/**
 * Additional options for
 * Apigee#organizationsDevelopersAppsGenerateKeyPairOrUpdateDeveloperAppStatus.
 */
export interface OrganizationsDevelopersAppsGenerateKeyPairOrUpdateDeveloperAppStatusOptions {
  /**
   * Action. Valid values are `approve` or `revoke`.
   */
  action?: string;
}

/**
 * Additional options for Apigee#organizationsDevelopersAppsGet.
 */
export interface OrganizationsDevelopersAppsGetOptions {
  /**
   * **Note**: Must be used in conjunction with the `query` parameter. Set to
   * `apiresources` to return the number of API resources that have been
   * approved for access by a developer app in the specified Apigee
   * organization.
   */
  entity?: string;
  /**
   * **Note**: Must be used in conjunction with the `entity` parameter. Set to
   * `count` to return the number of API resources that have been approved for
   * access by a developer app in the specified Apigee organization.
   */
  query?: string;
}

/**
 * Additional options for
 * Apigee#organizationsDevelopersAppsKeysApiproductsUpdateDeveloperAppKeyApiProduct.
 */
export interface OrganizationsDevelopersAppsKeysApiproductsUpdateDeveloperAppKeyApiProductOptions {
  /**
   * Approve or revoke the consumer key by setting this value to `approve` or
   * `revoke`, respectively.
   */
  action?: string;
}

/**
 * Additional options for
 * Apigee#organizationsDevelopersAppsKeysUpdateDeveloperAppKey.
 */
export interface OrganizationsDevelopersAppsKeysUpdateDeveloperAppKeyOptions {
  /**
   * Approve or revoke the consumer key by setting this value to `approve` or
   * `revoke`, respectively. The `Content-Type` header must be set to
   * `application/octet-stream`.
   */
  action?: string;
}

/**
 * Additional options for Apigee#organizationsDevelopersAppsList.
 */
export interface OrganizationsDevelopersAppsListOptions {
  /**
   * Number of developer apps to return in the API call. Use with the
   * `startKey` parameter to provide more targeted filtering. The limit is 1000.
   */
  count?: bigint;
  /**
   * Optional. Specifies whether to expand the results. Set to `true` to expand
   * the results. This query parameter is not valid if you use the `count` or
   * `startKey` query parameters.
   */
  expand?: boolean;
  /**
   * Optional. Specifies whether to expand the results in shallow mode. Set to
   * `true` to expand the results in shallow mode.
   */
  shallowExpand?: boolean;
  /**
   * **Note**: Must be used in conjunction with the `count` parameter. Name of
   * the developer app from which to start displaying the list of developer
   * apps. For example, if you're returning 50 developer apps at a time (using
   * the `count` query parameter), you can view developer apps 50-99 by entering
   * the name of the 50th developer app. The developer app name is case
   * sensitive.
   */
  startKey?: string;
}

function serializeOrganizationsDevelopersAppsListOptions(data: any): OrganizationsDevelopersAppsListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeOrganizationsDevelopersAppsListOptions(data: any): OrganizationsDevelopersAppsListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsDevelopersGet.
 */
export interface OrganizationsDevelopersGetOptions {
  /**
   * Status of the developer. Valid values are `active` or `inactive`.
   */
  action?: string;
}

/**
 * Additional options for Apigee#organizationsDevelopersList.
 */
export interface OrganizationsDevelopersListOptions {
  /**
   * Optional. List only Developers that are associated with the app. Note that
   * start_key, count are not applicable for this filter criteria.
   */
  app?: string;
  /**
   * Optional. Number of developers to return in the API call. Use with the
   * `startKey` parameter to provide more targeted filtering. The limit is 1000.
   */
  count?: bigint;
  /**
   * Specifies whether to expand the results. Set to `true` to expand the
   * results. This query parameter is not valid if you use the `count` or
   * `startKey` query parameters.
   */
  expand?: boolean;
  /**
   * Optional. List of IDs to include, separated by commas.
   */
  ids?: string;
  /**
   * Flag that specifies whether to include company details in the response.
   */
  includeCompany?: boolean;
  /**
   * **Note**: Must be used in conjunction with the `count` parameter. Email
   * address of the developer from which to start displaying the list of
   * developers. For example, if the an unfiltered list returns: ```
   * westley@example.com fezzik@example.com buttercup@example.com ``` and your
   * `startKey` is `fezzik@example.com`, the list returned will be ```
   * fezzik@example.com buttercup@example.com ```
   */
  startKey?: string;
}

function serializeOrganizationsDevelopersListOptions(data: any): OrganizationsDevelopersListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeOrganizationsDevelopersListOptions(data: any): OrganizationsDevelopersListOptions {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsDevelopersSetDeveloperStatus.
 */
export interface OrganizationsDevelopersSetDeveloperStatusOptions {
  /**
   * Status of the developer. Valid values are `active` and `inactive`.
   */
  action?: string;
}

/**
 * Additional options for Apigee#organizationsDevelopersSubscriptionsList.
 */
export interface OrganizationsDevelopersSubscriptionsListOptions {
  /**
   * Number of API product subscriptions to return in the API call. Use with
   * `startKey` to provide more targeted filtering. Defaults to 100. The maximum
   * limit is 1000.
   */
  count?: number;
  /**
   * Name of the API product subscription from which to start displaying the
   * list of subscriptions. If omitted, the list starts from the first item. For
   * example, to view the API product subscriptions from 51-150, set the value
   * of `startKey` to the name of the 51st subscription and set the value of
   * `count` to 100.
   */
  startKey?: string;
}

/**
 * Additional options for Apigee#organizationsEndpointAttachmentsCreate.
 */
export interface OrganizationsEndpointAttachmentsCreateOptions {
  /**
   * ID to use for the endpoint attachment. ID must start with a lowercase
   * letter followed by up to 31 lowercase letters, numbers, or hyphens, and
   * cannot end with a hyphen. The minimum length is 2.
   */
  endpointAttachmentId?: string;
}

/**
 * Additional options for Apigee#organizationsEndpointAttachmentsList.
 */
export interface OrganizationsEndpointAttachmentsListOptions {
  /**
   * Optional. Maximum number of endpoint attachments to return. If
   * unspecified, at most 25 attachments will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Page token, returned from a previous `ListEndpointAttachments`
   * call, that you can use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsEnvgroupsAttachmentsList.
 */
export interface OrganizationsEnvgroupsAttachmentsListOptions {
  /**
   * Maximum number of environment group attachments to return. The page size
   * defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned by a previous ListEnvironmentGroupAttachments call,
   * that you can use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsEnvgroupsCreate.
 */
export interface OrganizationsEnvgroupsCreateOptions {
  /**
   * ID of the environment group. Overrides any ID in the environment_group
   * resource.
   */
  name?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvgroupsGetDeployedIngressConfig.
 */
export interface OrganizationsEnvgroupsGetDeployedIngressConfigOptions {
  /**
   * When set to FULL, additional details about the specific deployments
   * receiving traffic will be included in the IngressConfig response's
   * RoutingRules.
   */
  view?:  | "INGRESS_CONFIG_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Apigee#organizationsEnvgroupsList.
 */
export interface OrganizationsEnvgroupsListOptions {
  /**
   * Maximum number of environment groups to return. The page size defaults to
   * 25.
   */
  pageSize?: number;
  /**
   * Page token, returned from a previous ListEnvironmentGroups call, that you
   * can use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsEnvgroupsPatch.
 */
export interface OrganizationsEnvgroupsPatchOptions {
  /**
   * List of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvgroupsPatchOptions(data: any): OrganizationsEnvgroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvgroupsPatchOptions(data: any): OrganizationsEnvgroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsAnalyticsAdminGetSchemav2.
 */
export interface OrganizationsEnvironmentsAnalyticsAdminGetSchemav2Options {
  /**
   * Flag that specifies whether the schema is be read from the database or
   * cache. Set to `true` to read the schema from the database. Defaults to
   * cache.
   */
  disableCache?: boolean;
  /**
   * Required. Name of the dataset for which you want to retrieve the schema.
   * For example: `fact` or `agg_cus1`
   */
  type?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsApisRevisionsDebugsessionsCreate.
 */
export interface OrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions {
  /**
   * Optional. The time in seconds after which this DebugSession should end. A
   * timeout specified in DebugSession will overwrite this value.
   */
  timeout?: bigint;
}

function serializeOrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions(data: any): OrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? String(data["timeout"]) : undefined,
  };
}

function deserializeOrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions(data: any): OrganizationsEnvironmentsApisRevisionsDebugsessionsCreateOptions {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? BigInt(data["timeout"]) : undefined,
  };
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsApisRevisionsDebugsessionsList.
 */
export interface OrganizationsEnvironmentsApisRevisionsDebugsessionsListOptions {
  /**
   * Maximum number of debug sessions to return. The page size defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned from a previous ListDebugSessions call, that you can
   * use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsApisRevisionsDeploymentsGenerateDeployChangeReport.
 */
export interface OrganizationsEnvironmentsApisRevisionsDeploymentsGenerateDeployChangeReportOptions {
  /**
   * Flag that specifies whether to force the deployment of the new revision
   * over the currently deployed revision by overriding conflict checks.
   */
  override?: boolean;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsApisRevisionsDeploy.
 */
export interface OrganizationsEnvironmentsApisRevisionsDeployOptions {
  /**
   * Flag that specifies whether the new deployment replaces other deployed
   * revisions of the API proxy in the environment. Set `override` to `true` to
   * replace other deployed revisions. By default, `override` is `false` and the
   * deployment is rejected if other revisions of the API proxy are deployed in
   * the environment.
   */
  override?: boolean;
  /**
   * Flag that specifies whether to enable sequenced rollout. If set to `true`,
   * the routing rules for this deployment and the environment changes to add
   * the deployment will be rolled out in a safe order. This reduces the risk of
   * downtime that could be caused by changing the environment group's routing
   * before the new destination for the affected traffic is ready to receive it.
   * This should only be necessary if the new deployment will be capturing
   * traffic from another environment under a shared environment group or if
   * traffic will be rerouted to a different environment due to a base path
   * removal. The [GenerateDeployChangeReport API](GenerateDeployChangeReport)
   * may be used to examine routing changes before issuing the deployment
   * request, and its response will indicate if a sequenced rollout is
   * recommended for the deployment.
   */
  sequencedRollout?: boolean;
  /**
   * Google Cloud IAM service account. The service account represents the
   * identity of the deployed proxy, and determines what permissions it has. The
   * format must be `{ACCOUNT_ID}@{PROJECT}.iam.gserviceaccount.com`.
   */
  serviceAccount?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsApisRevisionsUndeploy.
 */
export interface OrganizationsEnvironmentsApisRevisionsUndeployOptions {
  /**
   * Flag that specifies whether to enable sequenced rollout. If set to `true`,
   * the environment group routing rules corresponding to this deployment will
   * be removed before removing the deployment from the runtime. This is likely
   * to be a rare use case; it is only needed when the intended effect of
   * undeploying this proxy is to cause the traffic it currently handles to be
   * rerouted to some other existing proxy in the environment group. The
   * [GenerateUndeployChangeReport API](GenerateUndeployChangeReport) may be
   * used to examine routing changes before issuing the undeployment request,
   * and its response will indicate if a sequenced rollout is recommended for
   * the undeployment.
   */
  sequencedRollout?: boolean;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsArchiveDeploymentsList.
 */
export interface OrganizationsEnvironmentsArchiveDeploymentsListOptions {
  /**
   * Optional. An optional query used to return a subset of Archive Deployments
   * using the semantics defined in https://google.aip.dev/160.
   */
  filter?: string;
  /**
   * Optional. Maximum number of Archive Deployments to return. If unspecified,
   * at most 25 deployments will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Page token, returned from a previous ListArchiveDeployments
   * call, that you can use to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsArchiveDeploymentsPatch.
 */
export interface OrganizationsEnvironmentsArchiveDeploymentsPatchOptions {
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvironmentsArchiveDeploymentsPatchOptions(data: any): OrganizationsEnvironmentsArchiveDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvironmentsArchiveDeploymentsPatchOptions(data: any): OrganizationsEnvironmentsArchiveDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsEnvironmentsCreate.
 */
export interface OrganizationsEnvironmentsCreateOptions {
  /**
   * Optional. Name of the environment.
   */
  name?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsDeploymentsList.
 */
export interface OrganizationsEnvironmentsDeploymentsListOptions {
  /**
   * Optional. Flag that specifies whether to return shared flow or API proxy
   * deployments. Set to `true` to return shared flow deployments; set to
   * `false` to return API proxy deployments. Defaults to `false`.
   */
  sharedFlows?: boolean;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsGetIamPolicy.
 */
export interface OrganizationsEnvironmentsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsKeystoresAliasesCreate.
 */
export interface OrganizationsEnvironmentsKeystoresAliasesCreateOptions {
  /**
   * DEPRECATED: For improved security, specify the password in the request
   * body instead of using the query parameter. To specify the password in the
   * request body, set `Content-type: multipart/form-data` part with name
   * `password`. Password for the private key file, if required.
   */
  _password?: string;
  /**
   * Alias for the key/certificate pair. Values must match the regular
   * expression `[\w\s-.]{1,255}`. This must be provided for all formats except
   * `selfsignedcert`; self-signed certs may specify the alias in either this
   * parameter or the JSON body.
   */
  alias?: string;
  /**
   * Required. Format of the data. Valid values include: `selfsignedcert`,
   * `keycertfile`, or `pkcs12`
   */
  format?: string;
  /**
   * Flag that specifies whether to ignore expiry validation. If set to `true`,
   * no expiry validation will be performed.
   */
  ignoreExpiryValidation?: boolean;
  /**
   * Flag that specifies whether to ignore newline validation. If set to
   * `true`, no error is thrown when the file contains a certificate chain with
   * no newline between each certificate. Defaults to `false`.
   */
  ignoreNewlineValidation?: boolean;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsKeystoresAliasesUpdate.
 */
export interface OrganizationsEnvironmentsKeystoresAliasesUpdateOptions {
  /**
   * Required. Flag that specifies whether to ignore expiry validation. If set
   * to `true`, no expiry validation will be performed.
   */
  ignoreExpiryValidation?: boolean;
  /**
   * Flag that specifies whether to ignore newline validation. If set to
   * `true`, no error is thrown when the file contains a certificate chain with
   * no newline between each certificate. Defaults to `false`.
   */
  ignoreNewlineValidation?: boolean;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsKeystoresCreate.
 */
export interface OrganizationsEnvironmentsKeystoresCreateOptions {
  /**
   * Optional. Name of the keystore. Overrides the value in Keystore.
   */
  name?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsKeyvaluemapsEntriesList.
 */
export interface OrganizationsEnvironmentsKeyvaluemapsEntriesListOptions {
  /**
   * Optional. Maximum number of key value entries to return. If unspecified,
   * at most 100 entries will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Page token. If provides, must be a valid key value entry
   * returned from a previous call that can be used to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsModifyEnvironment.
 */
export interface OrganizationsEnvironmentsModifyEnvironmentOptions {
  /**
   * List of fields to be updated. Fields that can be updated: node_config.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvironmentsModifyEnvironmentOptions(data: any): OrganizationsEnvironmentsModifyEnvironmentOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvironmentsModifyEnvironmentOptions(data: any): OrganizationsEnvironmentsModifyEnvironmentOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsEnvironmentsOptimizedStatsGet.
 */
export interface OrganizationsEnvironmentsOptimizedStatsGetOptions {
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  accuracy?: string;
  /**
   * Table name used to query custom aggregate tables. If this parameter is
   * skipped, then Apigee will try to retrieve the data from fact tables which
   * will be expensive.
   */
  aggTable?: string;
  /**
   * Filter that enables you to drill-down on specific dimension values.
   */
  filter?: string;
  /**
   * Maximum number of result items to return. The default and maximum value
   * that can be returned is 14400.
   */
  limit?: string;
  /**
   * Offset value. Use `offset` with `limit` to enable pagination of results.
   * For example, to display results 11-20, set limit to `10` and offset to
   * `10`.
   */
  offset?: string;
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  realtime?: boolean;
  /**
   * Required. Comma-separated list of metrics. For example:
   * `sum(message_count),sum(error_count)`
   */
  select?: string;
  /**
   * Routes the query to API Monitoring for the last hour.
   */
  sonar?: boolean;
  /**
   * Flag that specifies whether the sort order should be ascending or
   * descending. Valid values include `DESC` and `ASC`.
   */
  sort?: string;
  /**
   * Comma-separated list of columns to sort the final result.
   */
  sortby?: string;
  /**
   * Required. Time interval for the interactive query. Time range is specified
   * in GMT as `start~end`. For example: `04/15/2017 00:00~05/15/2017 23:59`
   */
  timeRange?: string;
  /**
   * Granularity of metrics returned. Valid values include: `second`, `minute`,
   * `hour`, `day`, `week`, or `month`.
   */
  timeUnit?: string;
  /**
   * Top number of results to return. For example, to return the top 5 results,
   * set `topk=5`.
   */
  topk?: string;
  /**
   * Flag that specifies whether to list timestamps in ascending (`true`) or
   * descending (`false`) order. Apigee recommends setting this value to `true`
   * if you are using `sortby` with `sort=DESC`.
   */
  tsAscending?: boolean;
  /**
   * Timezone offset value.
   */
  tzo?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsQueriesList.
 */
export interface OrganizationsEnvironmentsQueriesListOptions {
  /**
   * Filter response list by dataset. Example: `api`, `mint`
   */
  dataset?: string;
  /**
   * Filter response list by returning asynchronous queries that created after
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:15:30Z'.
   */
  from?: string;
  /**
   * Flag to include asynchronous queries that don't have a report denifition.
   */
  inclQueriesWithoutReport?: string;
  /**
   * Filter response list by asynchronous query status.
   */
  status?: string;
  /**
   * Filter response list by user who submitted queries.
   */
  submittedBy?: string;
  /**
   * Filter response list by returning asynchronous queries that created before
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:16:30Z'.
   */
  to?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsResourcefilesCreate.
 */
export interface OrganizationsEnvironmentsResourcefilesCreateOptions {
  /**
   * Required. Name of the resource file. Must match the regular expression:
   * [a-zA-Z0-9:/\\!@#$%^&{}\[\]()+\-=,.~'` ]{1,255}
   */
  name?: string;
  /**
   * Required. Resource file type. {{ resource_file_type }}
   */
  type?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsResourcefilesList.
 */
export interface OrganizationsEnvironmentsResourcefilesListOptions {
  /**
   * Optional. Type of resource files to list. {{ resource_file_type }}
   */
  type?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsSecurityIncidentsList.
 */
export interface OrganizationsEnvironmentsSecurityIncidentsListOptions {
  /**
   * The filter expression to be used to get the list of security incidents,
   * where filtering can be done on API Proxies. Example: filter = "api_proxy =
   * /", "first_detected_time >", "last_detected_time <"
   */
  filter?: string;
  /**
   * The maximum number of incidents to return. The service may return fewer
   * than this value. If unspecified, at most 50 incidents will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSecurityIncident` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsSecurityReportsList.
 */
export interface OrganizationsEnvironmentsSecurityReportsListOptions {
  /**
   * Filter response list by dataset. Example: `api`, `mint`
   */
  dataset?: string;
  /**
   * Filter response list by returning security reports that created after this
   * date time. Time must be in ISO date-time format like
   * '2011-12-03T10:15:30Z'.
   */
  from?: string;
  /**
   * The maximum number of security report to return in the list response.
   */
  pageSize?: number;
  /**
   * Token returned from the previous list response to fetch the next page.
   */
  pageToken?: string;
  /**
   * Filter response list by security reports status.
   */
  status?: string;
  /**
   * Filter response list by user who submitted queries.
   */
  submittedBy?: string;
  /**
   * Filter response list by returning security reports that created before
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:16:30Z'.
   */
  to?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsSharedflowsRevisionsDeploy.
 */
export interface OrganizationsEnvironmentsSharedflowsRevisionsDeployOptions {
  /**
   * Flag that specifies whether the new deployment replaces other deployed
   * revisions of the shared flow in the environment. Set `override` to `true`
   * to replace other deployed revisions. By default, `override` is `false` and
   * the deployment is rejected if other revisions of the shared flow are
   * deployed in the environment.
   */
  override?: boolean;
  /**
   * Google Cloud IAM service account. The service account represents the
   * identity of the deployed proxy, and determines what permissions it has. The
   * format must be `{ACCOUNT_ID}@{PROJECT}.iam.gserviceaccount.com`.
   */
  serviceAccount?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsStatsGet.
 */
export interface OrganizationsEnvironmentsStatsGetOptions {
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  accuracy?: string;
  /**
   * Table name used to query custom aggregate tables. If this parameter is
   * skipped, then Apigee will try to retrieve the data from fact tables which
   * will be expensive.
   */
  aggTable?: string;
  /**
   * Filter that enables you to drill down on specific dimension values.
   */
  filter?: string;
  /**
   * Maximum number of result items to return. The default and maximum value
   * that can be returned is 14400.
   */
  limit?: string;
  /**
   * Offset value. Use `offset` with `limit` to enable pagination of results.
   * For example, to display results 11-20, set limit to `10` and offset to
   * `10`.
   */
  offset?: string;
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  realtime?: boolean;
  /**
   * Comma-separated list of metrics. For example:
   * `sum(message_count),sum(error_count)`
   */
  select?: string;
  /**
   * Routes the query to API Monitoring for the last hour.
   */
  sonar?: boolean;
  /**
   * Flag that specifies whether the sort order should be ascending or
   * descending. Valid values include: `DESC` and `ASC`.
   */
  sort?: string;
  /**
   * Comma-separated list of columns to sort the final result.
   */
  sortby?: string;
  /**
   * Time interval for the interactive query. Time range is specified in GMT as
   * `start~end`. For example: `04/15/2017 00:00~05/15/2017 23:59`
   */
  timeRange?: string;
  /**
   * Granularity of metrics returned. Valid values include: `second`, `minute`,
   * `hour`, `day`, `week`, or` month`.
   */
  timeUnit?: string;
  /**
   * Top number of results to return. For example, to return the top 5 results,
   * set `topk=5`.
   */
  topk?: string;
  /**
   * Flag that specifies whether to list timestamps in ascending (`true`) or
   * descending (`false`) order. Apigee recommends that you set this value to
   * `true` if you are using `sortby` with `sort=DESC`.
   */
  tsAscending?: boolean;
  /**
   * Timezone offset value.
   */
  tzo?: string;
}

/**
 * Additional options for Apigee#organizationsEnvironmentsTargetserversCreate.
 */
export interface OrganizationsEnvironmentsTargetserversCreateOptions {
  /**
   * Optional. The ID to give the TargetServer. This will overwrite the value
   * in TargetServer.
   */
  name?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsTraceConfigOverridesList.
 */
export interface OrganizationsEnvironmentsTraceConfigOverridesListOptions {
  /**
   * Maximum number of trace configuration overrides to return. If not
   * specified, the maximum number returned is 25. The maximum number cannot
   * exceed 100.
   */
  pageSize?: number;
  /**
   * A page token, returned from a previous `ListTraceConfigOverrides` call.
   * Token value that can be used to retrieve the subsequent page. When
   * paginating, all other parameters provided to `ListTraceConfigOverrides`
   * must match those specified in the call to obtain the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Apigee#organizationsEnvironmentsTraceConfigOverridesPatch.
 */
export interface OrganizationsEnvironmentsTraceConfigOverridesPatchOptions {
  /**
   * List of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvironmentsTraceConfigOverridesPatchOptions(data: any): OrganizationsEnvironmentsTraceConfigOverridesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvironmentsTraceConfigOverridesPatchOptions(data: any): OrganizationsEnvironmentsTraceConfigOverridesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsEnvironmentsUpdateDebugmask.
 */
export interface OrganizationsEnvironmentsUpdateDebugmaskOptions {
  /**
   * Boolean flag that specifies whether to replace existing values in the
   * debug mask when doing an update. Set to true to replace existing values.
   * The default behavior is to append the values (false).
   */
  replaceRepeatedFields?: boolean;
  /**
   * Field debug mask to support partial updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvironmentsUpdateDebugmaskOptions(data: any): OrganizationsEnvironmentsUpdateDebugmaskOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvironmentsUpdateDebugmaskOptions(data: any): OrganizationsEnvironmentsUpdateDebugmaskOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsEnvironmentsUpdateTraceConfig.
 */
export interface OrganizationsEnvironmentsUpdateTraceConfigOptions {
  /**
   * List of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsEnvironmentsUpdateTraceConfigOptions(data: any): OrganizationsEnvironmentsUpdateTraceConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsEnvironmentsUpdateTraceConfigOptions(data: any): OrganizationsEnvironmentsUpdateTraceConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsGetDeployedIngressConfig.
 */
export interface OrganizationsGetDeployedIngressConfigOptions {
  /**
   * When set to FULL, additional details about the specific deployments
   * receiving traffic will be included in the IngressConfig response's
   * RoutingRules.
   */
  view?:  | "INGRESS_CONFIG_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Apigee#organizationsHostQueriesList.
 */
export interface OrganizationsHostQueriesListOptions {
  /**
   * Filter response list by dataset. Example: `api`, `mint`
   */
  dataset?: string;
  /**
   * Required. Filter response list by hostname.
   */
  envgroupHostname?: string;
  /**
   * Filter response list by returning asynchronous queries that created after
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:15:30Z'.
   */
  from?: string;
  /**
   * Flag to include asynchronous queries that don't have a report denifition.
   */
  inclQueriesWithoutReport?: string;
  /**
   * Filter response list by asynchronous query status.
   */
  status?: string;
  /**
   * Filter response list by user who submitted queries.
   */
  submittedBy?: string;
  /**
   * Filter response list by returning asynchronous queries that created before
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:16:30Z'.
   */
  to?: string;
}

/**
 * Additional options for Apigee#organizationsHostSecurityReportsList.
 */
export interface OrganizationsHostSecurityReportsListOptions {
  /**
   * Filter response list by dataset. Example: `api`, `mint`
   */
  dataset?: string;
  /**
   * Required. Filter response list by hostname.
   */
  envgroupHostname?: string;
  /**
   * Filter response list by returning security reports that created after this
   * date time. Time must be in ISO date-time format like
   * '2011-12-03T10:15:30Z'.
   */
  from?: string;
  /**
   * The maximum number of security report to return in the list response.
   */
  pageSize?: number;
  /**
   * Token returned from the previous list response to fetch the next page.
   */
  pageToken?: string;
  /**
   * Filter response list by security report status.
   */
  status?: string;
  /**
   * Filter response list by user who submitted queries.
   */
  submittedBy?: string;
  /**
   * Filter response list by returning security reports that created before
   * this date time. Time must be in ISO date-time format like
   * '2011-12-03T10:16:30Z'.
   */
  to?: string;
}

/**
 * Additional options for Apigee#organizationsHostStatsGet.
 */
export interface OrganizationsHostStatsGetOptions {
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  accuracy?: string;
  /**
   * Required. Hostname for which the interactive query will be executed.
   */
  envgroupHostname?: string;
  /**
   * Flag that enables drill-down on specific dimension values.
   */
  filter?: string;
  /**
   * Maximum number of result items to return. The default and maximum value
   * that can be returned is 14400.
   */
  limit?: string;
  /**
   * Offset value. Use `offset` with `limit` to enable pagination of results.
   * For example, to display results 11-20, set limit to `10` and offset to
   * `10`.
   */
  offset?: string;
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  realtime?: boolean;
  /**
   * Comma-separated list of metrics. For example:
   * `sum(message_count),sum(error_count)`
   */
  select?: string;
  /**
   * Flag that specifies if the sort order should be ascending or descending.
   * Valid values are `DESC` and `ASC`.
   */
  sort?: string;
  /**
   * Comma-separated list of columns to sort the final result.
   */
  sortby?: string;
  /**
   * Time interval for the interactive query. Time range is specified in GMT as
   * `start~end`. For example: `04/15/2017 00:00~05/15/2017 23:59`
   */
  timeRange?: string;
  /**
   * Granularity of metrics returned. Valid values include: `second`, `minute`,
   * `hour`, `day`, `week`, or `month`.
   */
  timeUnit?: string;
  /**
   * Top number of results to return. For example, to return the top 5 results,
   * set `topk=5`.
   */
  topk?: string;
  /**
   * Flag that specifies whether to list timestamps in ascending (`true`) or
   * descending (`false`) order. Apigee recommends that you set this value to
   * `true` if you are using `sortby` with `sort=DESC`.
   */
  tsAscending?: boolean;
  /**
   * Timezone offset value.
   */
  tzo?: string;
}

/**
 * Additional options for Apigee#organizationsInstancesAttachmentsList.
 */
export interface OrganizationsInstancesAttachmentsListOptions {
  /**
   * Maximum number of instance attachments to return. Defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned by a previous ListInstanceAttachments call, that you
   * can use to retrieve the next page of content.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsInstancesList.
 */
export interface OrganizationsInstancesListOptions {
  /**
   * Maximum number of instances to return. Defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned from a previous ListInstances call, that you can use
   * to retrieve the next page of content.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsInstancesNatAddressesList.
 */
export interface OrganizationsInstancesNatAddressesListOptions {
  /**
   * Maximum number of natAddresses to return. Defaults to 25.
   */
  pageSize?: number;
  /**
   * Page token, returned from a previous ListNatAddresses call, that you can
   * use to retrieve the next page of content.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsInstancesPatch.
 */
export interface OrganizationsInstancesPatchOptions {
  /**
   * List of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsInstancesPatchOptions(data: any): OrganizationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsInstancesPatchOptions(data: any): OrganizationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Apigee#organizationsKeyvaluemapsEntriesList.
 */
export interface OrganizationsKeyvaluemapsEntriesListOptions {
  /**
   * Optional. Maximum number of key value entries to return. If unspecified,
   * at most 100 entries will be returned.
   */
  pageSize?: number;
  /**
   * Optional. Page token. If provides, must be a valid key value entry
   * returned from a previous call that can be used to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsOperationsList.
 */
export interface OrganizationsOperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsOptimizedHostStatsGet.
 */
export interface OrganizationsOptimizedHostStatsGetOptions {
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  accuracy?: string;
  /**
   * Required. Hostname for which the interactive query will be executed.
   */
  envgroupHostname?: string;
  /**
   * Filter that enables you to drill-down on specific dimension values.
   */
  filter?: string;
  /**
   * Maximum number of result items to return. The default and maximum value
   * that can be returned is 14400.
   */
  limit?: string;
  /**
   * Offset value. Use `offset` with `limit` to enable pagination of results.
   * For example, to display results 11-20, set limit to `10` and offset to
   * `10`.
   */
  offset?: string;
  /**
   * No longer used by Apigee. Supported for backwards compatibility.
   */
  realtime?: boolean;
  /**
   * Required. Comma-separated list of metrics. For example:
   * `sum(message_count),sum(error_count)`
   */
  select?: string;
  /**
   * Flag that specifies whether the sort order should be ascending or
   * descending. Valid values include `DESC` and `ASC`.
   */
  sort?: string;
  /**
   * Comma-separated list of columns used to sort the final result.
   */
  sortby?: string;
  /**
   * Required. Time interval for the interactive query. Time range is specified
   * in GMT as `start~end`. For example: `04/15/2017 00:00~05/15/2017 23:59`.
   */
  timeRange?: string;
  /**
   * Granularity of metrics returned. Valid values include: `second`, `minute`,
   * `hour`, `day`, `week`, or `month`.
   */
  timeUnit?: string;
  /**
   * Top number of results to return. For example, to return the top 5 results,
   * set `topk=5`.
   */
  topk?: string;
  /**
   * Flag that specifies whether to list timestamps in ascending (`true`) or
   * descending (`false`) order. Apigee recommends that you set this value to
   * `true` if you are using `sortby` with `sort=DESC`.
   */
  tsAscending?: boolean;
  /**
   * Timezone offset value.
   */
  tzo?: string;
}

/**
 * Additional options for Apigee#organizationsReportsList.
 */
export interface OrganizationsReportsListOptions {
  /**
   * Set to 'true' to get expanded details about each custom report.
   */
  expand?: boolean;
}

/**
 * Additional options for Apigee#organizationsSecurityProfilesList.
 */
export interface OrganizationsSecurityProfilesListOptions {
  /**
   * The maximum number of profiles to return. The service may return fewer
   * than this value. If unspecified, at most 50 profiles will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSecurityProfiles` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsSecurityProfilesListRevisions.
 */
export interface OrganizationsSecurityProfilesListRevisionsOptions {
  /**
   * The maximum number of profile revisions to return. The service may return
   * fewer than this value. If unspecified, at most 50 revisions will be
   * returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSecurityProfileRevisions`
   * call. Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Apigee#organizationsSharedflowsCreate.
 */
export interface OrganizationsSharedflowsCreateOptions {
  /**
   * Required. Must be set to either `import` or `validate`.
   */
  action?: string;
  /**
   * Required. The name to give the shared flow
   */
  name?: string;
}

/**
 * Additional options for Apigee#organizationsSharedflowsList.
 */
export interface OrganizationsSharedflowsListOptions {
  /**
   * Indicates whether to include shared flow metadata in the response.
   */
  includeMetaData?: boolean;
  /**
   * Indicates whether to include a list of revisions in the response.
   */
  includeRevisions?: boolean;
}

/**
 * Additional options for Apigee#organizationsSharedflowsRevisionsGet.
 */
export interface OrganizationsSharedflowsRevisionsGetOptions {
  /**
   * Specify `bundle` to export the contents of the shared flow bundle.
   * Otherwise, the bundle metadata is returned.
   */
  format?: string;
}

/**
 * Additional options for
 * Apigee#organizationsSharedflowsRevisionsUpdateSharedFlowRevision.
 */
export interface OrganizationsSharedflowsRevisionsUpdateSharedFlowRevisionOptions {
  /**
   * Ignored. All uploads are validated regardless of the value of this field.
   * It is kept for compatibility with existing APIs. Must be `true` or `false`
   * if provided.
   */
  validate?: boolean;
}

function decodeBase64(b64: string): Uint8Array {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

const base64abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
function encodeBase64(uint8: Uint8Array): string {
  let result = "", i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }
  return result;
}
